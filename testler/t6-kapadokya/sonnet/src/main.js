import * as THREE from 'three';
import { U } from './glsl.js';
import { Terrain } from './terrain.js';
import { createSky, updateAtmosphere, atmos } from './sky.js';
import { createPost } from './post.js';
import { WORLD, HALF, POIS, SPAWN } from './config.js';
import { placeChimneys, stampShadow, buildChimneyMeshes, chimneyCollider } from './chimneys.js';
import { Balloons, buildFieldProps } from './balloons.js';
import { buildDecals, buildTown, buildTrees, cullByDistance } from './props.js';
import { SpatialHash } from './util.js';
import { Tour, CAPTIONS } from './tour.js';
import { Player } from './player.js';
import { Sound } from './audio.js';
import { UI, buildMapCanvas } from './ui.js';
import { createFar } from './far.js';
import { createBirds } from './birds.js';

const params = new URLSearchParams(location.search);
const DEV = params.has('dev');
const $ = (s) => document.querySelector(s);
const canvas = $('#c');

// ---------------------------------------------------------------- renderer
let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance', stencil: false });
  if (!renderer.capabilities.isWebGL2) throw new Error('webgl2');
} catch (e) {
  document.querySelector('#loader .status').textContent = 'Bu tarayıcı WebGL 2 desteklemiyor';
  document.querySelector('#loader .sub').textContent = 'Lütfen güncel Chrome, Edge, Firefox veya Safari kullanın ve donanım hızlandırmayı açın.';
  throw e;
}
let pixelRatio = Math.min(window.devicePixelRatio || 1, 1.6);
renderer.setPixelRatio(pixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(62, window.innerWidth / window.innerHeight, 0.4, 130000);
camera.position.set(SPAWN.x, 150, SPAWN.z);
scene.add(createSky());
const terrain = new Terrain(renderer, scene);
const post = createPost(renderer, scene, camera);
post.composer.setPixelRatio(pixelRatio);
post.composer.setSize(window.innerWidth, window.innerHeight);
const ui = new UI();
const sound = new Sound();

// ---------------------------------------------------------------- durum
const S = {
  state: 'loading', hour: 5.3, flow: false, photo: false, map: false, locked: false, active: false,
  tourT: 0, fade: 0, transition: 0, discCheck: 0, hudTick: 0, frame: 0,
  balloons: null, tour: null, player: null, cull: [], mapCanvas: null, selfBurnT: 0, lastYaw: 0, rollLook: 0,
};

// toz zerrecikleri (gün doğumu ışığında süzülür)
function createMotes() {
  const N = 1400; const pos = new Float32Array(N * 3); const seed = new Float32Array(N);
  for (let i = 0; i < N; i++) { pos[i * 3] = Math.random() * 90; pos[i * 3 + 1] = Math.random() * 90; pos[i * 3 + 2] = Math.random() * 90; seed[i] = Math.random(); }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
  g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e6);
  const m = new THREE.ShaderMaterial({
    uniforms: { uTime: U.uTime, uLightColor: U.uLightColor, uLightDir: U.uLightDir, uVis: { value: 1 } },
    vertexShader: `
      attribute float aSeed; uniform float uTime; varying float vA; uniform float uVis;
      void main(){
        vec3 p = position + vec3(sin(uTime*0.2+aSeed*30.0), uTime*0.15*(0.4+aSeed) , cos(uTime*0.17+aSeed*20.0))*3.0;
        vec3 rel = mod(p - cameraPosition + 45.0, 90.0) - 45.0;
        vec4 mv = viewMatrix * vec4(cameraPosition + rel, 1.0);
        float d = length(rel);
        vA = smoothstep(45.0, 20.0, d) * smoothstep(1.0, 4.0, d) * (0.4 + 0.6*aSeed) * uVis;
        gl_PointSize = (1.2 + 2.6*aSeed) * (1.0 + 90.0/(d+6.0)) ;
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      uniform vec3 uLightColor; varying float vA;
      void main(){ vec2 c = gl_PointCoord-0.5; float r = length(c); float a = smoothstep(0.5,0.0,r); gl_FragColor = vec4(uLightColor*0.35*vec3(1.0,0.9,0.75), a*a*vA*0.5); }`,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  });
  const pts = new THREE.Points(g, m); pts.frustumCulled = false; pts.renderOrder = 3;
  scene.add(pts);
  return pts;
}

// ---------------------------------------------------------------- yükleme
const nextFrame = () => new Promise(r => requestAnimationFrame(() => r()));
async function boot() {
  const _T = performance.now(); const lap = (n) => { if (DEV) console.log('BOOT', n, Math.round(performance.now() - _T)); };
  ui.progress(0.04, 'Vadiler oluşturuluyor');
  await nextFrame(); await nextFrame();
  await terrain.generate((f) => ui.progress(0.04 + 0.18 * f));
  lap('gen'); ui.progress(0.22, 'Peribacaları dikiliyor'); await nextFrame();
  const chimneys = placeChimneys(terrain, scene);
  const sh = stampShadow(terrain, chimneys);
  lap('chimneys+stamp'); ui.progress(0.34, 'Işık ve gölge hesaplanıyor'); await nextFrame();
  terrain.buildTextures(sh);
  terrain.buildChunks();
  lap('textures+chunks'); ui.progress(0.48, 'Kaya evleri oyuluyor'); await nextFrame();
  createFar(scene);
  const chm = buildChimneyMeshes(chimneys, scene);
  const chHash = chimneyCollider(chimneys);
  const decals = buildDecals(terrain, scene);
  lap('chimney meshes+decals'); ui.progress(0.62, 'Kasaba ve bahçeler kuruluyor'); await nextFrame();
  const town = buildTown(terrain, scene);
  const trees = buildTrees(terrain, scene, chHash);
  const houseHash = new SpatialHash(24);
  for (const h of town.houses) if (!h.annex) houseHash.add(h.x, h.z, Math.max(h.w, h.d) * 0.62, null);
  chm.meshes.forEach(m => m.userData.maxDist = 2900);
  S.cull = [...chm.meshes, ...decals.meshes, ...town.meshes, ...trees.meshes];
  lap('town+trees'); ui.progress(0.78, 'Balonlar şişiriliyor'); await nextFrame();
  S.balloons = new Balloons(scene, terrain);
  S.balloons.update(0.01);
  buildFieldProps(scene, terrain);
  S.motes = createMotes();
  createBirds(scene, terrain);
  S.tour = new Tour(terrain, S.balloons);
  S.player = new Player(camera, terrain, [chHash, houseHash]);
  S.mapCanvas = buildMapCanvas(terrain, 1024);
  lap('balloons+map'); ui.progress(0.9, 'Gökyüzü boyanıyor'); await nextFrame();
  Object.assign(window.__k, { chimneys, decals, town, trees, chm, houseHash, chHash });
  // ısınma: shader derleme ve ilk kareler
  camera.position.set(-300, 90, -800); camera.lookAt(-230, 40, -985);
  updateAtmosphere(5.4); S.hour = 5.4;
  renderer.compile(scene, camera);
  for (let i = 0; i < 3; i++) { frameOnce(0.016); await nextFrame(); }
  lap('warm'); ui.progress(1, 'Hazır');
  window.__ready = true;
  if (DEV) { ui.hideLoader(); startExplore(null, true); }
  else ui.ready();
}

// ---------------------------------------------------------------- akış
function startTour() {
  sound.start();
  S.balloons.reset(); S.balloons.update(0.01, null);
  ui.hideLoader();
  S.state = 'intro'; S.tourT = 0; S.transition = 0;
  ui.showHUD(false); ui.tourUI(true);
  ui.el.pause.classList.add('hidden');
  document.body.classList.remove('photo');
  S.active = false;
  post.grade.uniforms.uFade.value = 1;
  ui.capIdx = -1;
}
function startExplore(fromCam, quick) {
  S.state = 'explore'; ui.tourUI(false);
  const p = S.player;
  if (fromCam) p.setFromCamera(camera.position, S.tour.look); else { p.place(SPAWN.x, SPAWN.z, 1.8, -0.06); S.hour = Math.max(S.hour, 6.9); }
  ui.showHUD(true); ui.showHint();
  post.grade.uniforms.uFade.value = 0;
  S.flow = false; ui.el.bFlow.classList.remove('on');
  S.active = true; S.wasLocked = false;
  if (fromCam === null && !quick) sound.start();
}
function showPause(on) { ui.el.pause.classList.toggle('hidden', !on); }

function endTourTo(skipped) {
  if (S.state !== 'intro') return;
  if (skipped) {
    S.state = 'trans'; S.transition = 0; S.transDir = 1;
  } else startExplore(true);
}

// ---------------------------------------------------------------- girdi
function tryLock() {
  if (canvas.requestPointerLock) { const r = canvas.requestPointerLock(); if (r && r.catch) r.catch(() => {}); }
}
document.addEventListener('pointerlockchange', () => {
  S.locked = document.pointerLockElement === canvas;
  if (S.state !== 'explore') return;
  if (S.locked) { S.active = true; S.wasLocked = true; showPause(false); }
  else if (S.wasLocked && !S.touch && !S.map) { S.active = false; showPause(true); S.wasLocked = false; }
});
ui.el.pause.addEventListener('click', () => { S.active = true; showPause(false); tryLock(); canvas.focus(); sound.start(); });
canvas.addEventListener('click', () => { if (S.state === 'explore' && !S.locked && S.active && !S.touch) tryLock(); });
document.addEventListener('mousemove', (e) => {
  if (S.state !== 'explore' || !S.active) return;
  if (S.locked || (e.buttons & 1)) { S.player.look.dx += e.movementX * 0.0022; S.player.look.dy += e.movementY * 0.0022; }
});
window.addEventListener('keydown', (e) => {
  if (e.target && e.target.tagName === 'INPUT' && e.code !== 'Escape') return;
  if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) e.preventDefault();
  if (S.state === 'intro') { if (['Space', 'Escape', 'Enter'].includes(e.code)) endTourTo(true); return; }
  if (S.state !== 'explore') return;
  if (e.repeat) return;
  S.player.keys.add(e.code);
  switch (e.code) {
    case 'KeyF': S.player.toggleFly(); ui.showHint(); break;
    case 'KeyT': toggleFlow(); break;
    case 'KeyM': toggleMap(); break;
    case 'KeyP': togglePhoto(); break;
    case 'KeyN': toggleSound(); break;
    case 'KeyO': S.capture = true; break;
    case 'KeyH': if (document.exitPointerLock) document.exitPointerLock(); S.active = false; showPause(true); break;
    case 'BracketRight': S.hour = (S.hour + 0.5) % 24; break;
    case 'BracketLeft': S.hour = (S.hour + 23.5) % 24; break;
  }
});
window.addEventListener('keyup', (e) => { if (S.player) S.player.keys.delete(e.code); });
window.addEventListener('blur', () => { if (S.player) S.player.keys.clear(); });
function toggleFlow() { S.flow = !S.flow; ui.el.bFlow.classList.toggle('on', S.flow); }
function toggleMap() { S.map = !S.map; ui.el.bigmap.classList.toggle('hidden', !S.map); ui.el.bMap.classList.toggle('on', S.map); if (S.map && document.exitPointerLock) document.exitPointerLock(); if (!S.map && S.state === 'explore') { S.active = true; showPause(false); } }
function togglePhoto() { S.photo = !S.photo; document.body.classList.toggle('photo', S.photo); ui.el.bPhoto.classList.toggle('on', S.photo); }
function toggleSound() { sound.muted = !sound.muted; sound.setMuted(sound.muted); ui.el.bSound.classList.toggle('on', sound.muted); ui.el.bSound.style.opacity = sound.muted ? 0.5 : 1; }

ui.el.bStart.addEventListener('click', startTour);
ui.el.bFree.addEventListener('click', () => { sound.start(); ui.hideLoader(); S.hour = 6.9; startExplore(null, false); });
ui.el.skip.addEventListener('click', () => endTourTo(true));
ui.el.bFlow.addEventListener('click', toggleFlow);
ui.el.bFly.addEventListener('click', () => { if (S.player) S.player.toggleFly(); canvas.focus(); });
ui.el.bMap.addEventListener('click', toggleMap);
ui.el.bigmap.addEventListener('click', toggleMap);
ui.el.bPhoto.addEventListener('click', togglePhoto);
ui.el.bSound.addEventListener('click', toggleSound);
ui.el.bFull.addEventListener('click', () => { if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen && document.documentElement.requestFullscreen(); });
ui.el.bTour.addEventListener('click', () => { if (document.exitPointerLock) document.exitPointerLock(); startTour(); });
ui.el.tod.addEventListener('input', () => { S.hour = parseFloat(ui.el.tod.value); S.flow = false; ui.el.bFlow.classList.remove('on'); });
document.querySelectorAll('.ibtn').forEach(b => b.addEventListener('pointerdown', (e) => e.stopPropagation()));

// dokunmatik
(function touchSetup() {
  const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window && navigator.maxTouchPoints > 1;
  if (!isTouch) return;
  S.touch = true;
  ui.el.touch.classList.remove('hidden');
  const mk = (el, cb) => {
    let id = null, cx = 0, cy = 0; const knob = el.querySelector('i');
    el.addEventListener('pointerdown', (e) => { id = e.pointerId; el.setPointerCapture(id); const r = el.getBoundingClientRect(); cx = r.left + r.width / 2; cy = r.top + r.height / 2; });
    el.addEventListener('pointermove', (e) => { if (e.pointerId !== id) return; let dx = (e.clientX - cx) / 55, dy = (e.clientY - cy) / 55; const l = Math.hypot(dx, dy); if (l > 1) { dx /= l; dy /= l; } knob.style.transform = `translate(${dx * 40}px,${dy * 40}px)`; cb(dx, dy); });
    const end = (e) => { if (e.pointerId !== id) return; id = null; knob.style.transform = ''; cb(0, 0); };
    el.addEventListener('pointerup', end); el.addEventListener('pointercancel', end);
  };
  mk($('#stickL'), (x, y) => { if (S.player) { S.player.joy.mx = x; S.player.joy.mz = y; } });
  let lx = 0, ly = 0;
  mk($('#stickR'), (x, y) => { lx = x; ly = y; });
  S.touchLook = () => [lx, ly];
  ui.el.pause.addEventListener('click', () => { S.active = true; });
})();

// ---------------------------------------------------------------- döngü
const clock = new THREE.Timer();
let fpsAcc = 0, fpsN = 0, adaptCool = 4;
const tmpV = new THREE.Vector3();
function frameOnce(dt) {
  S.frame++;
  U.uTime.value += dt;
  const T = U.uTime.value;
  const cam = camera;

  if (S.state === 'intro') {
    const tour = S.tour;
    S.tourT += dt;
    if (S.tourT >= tour.total) { endTourTo(false); }
    else {
      const s = tour.sample(S.tourT);
      cam.position.copy(s.pos);
      // bakış yönü + hafif banking + el titremesi
      cam.up.set(0, 1, 0);
      cam.lookAt(s.look);
      const yawNow = Math.atan2(-(s.look.x - s.pos.x), -(s.look.z - s.pos.z));
      let dy = yawNow - S.lastYaw; if (dy > Math.PI) dy -= 2 * Math.PI; if (dy < -Math.PI) dy += 2 * Math.PI;
      S.rollLook += ((-dy / Math.max(dt, 1e-3)) * 0.35 - S.rollLook) * Math.min(1, dt * 2);
      S.lastYaw = yawNow;
      cam.rotateZ(THREE.MathUtils.clamp(S.rollLook, -0.07, 0.07));
      cam.rotateX(Math.sin(T * 0.7) * 0.0012); cam.rotateY(Math.sin(T * 0.53 + 1) * 0.0012);
      if (Math.abs(cam.fov - s.fov) > 0.01) { cam.fov = s.fov; cam.updateProjectionMatrix(); }
      S.hour = s.hour;
      S.fade = s.fade;
      if (S.tourT < 1.2) S.fade = Math.max(S.fade, 1 - S.tourT / 1.2);
      ui.updateCaptions(S.tourT, CAPTIONS);
      ui.tourProgress(S.tourT / tour.total);
      post.grade.uniforms.uFade.value = S.fade;
    }
  } else if (S.state === 'trans') {
    S.transition += dt / 0.7;
    post.grade.uniforms.uFade.value = Math.min(1, S.transition);
    if (S.transition >= 1) {
      startExplore(null, false);
      post.grade.uniforms.uFade.value = 1; S.fadeIn = 1;
    }
  } else if (S.state === 'explore') {
    const p = S.player;
    if (S.fadeIn > 0) { S.fadeIn = Math.max(0, S.fadeIn - dt / 0.9); post.grade.uniforms.uFade.value = S.fadeIn; }
    if (S.touch && S.touchLook && S.active) { const [lx, ly] = S.touchLook(); p.look.dx += lx * dt * 2.2; p.look.dy += ly * dt * 1.6; }
    if (!S.active) { p.keys.clear(); p.joy.mx = p.joy.mz = 0; }
    p.update(S.active ? dt : 0);
    const fovT = p.mode === 'walk' ? (p.sprint && p.speed > 6 ? 72 : 66) : 70 + Math.min(10, p.speed * 0.12);
    cam.fov += (fovT - cam.fov) * Math.min(1, dt * 4); cam.updateProjectionMatrix();
    if (S.flow) S.hour = (S.hour + dt * 0.12) % 24;
    // brülör sesi/ışıltısı: yükselirken
    if (p.mode !== 'walk' && p.burn) { S.selfBurnT -= dt; if (S.selfBurnT <= 0) { S.selfBurnT = 2.6; sound.burner(0.35); } } else S.selfBurnT = 0;
  }

  updateAtmosphere(S.hour);
  renderer.toneMappingExposure = atmos.exposure * (S.state === 'explore' ? 1 : 1);
  if (terrain.chunks) terrain.updateLod(cam);
  if (S.balloons) {
    const pl = S.player; const pb = S.pb || (S.pb = { s: 0, x: 0, y: 0, z: 0, yaw: 0, flame: 0 });
    const flying = S.state === 'explore' && pl && pl.mode !== 'walk';
    pb.s += ((flying ? 1 : 0) - pb.s) * Math.min(1, dt * (flying ? 0.9 : 2.5));
    if (pl) { pb.x = pl.pos.x; pb.y = cam.position.y; pb.z = pl.pos.z; pb.yaw = pl.yaw; }
    pb.flame += (((flying && pl.burn) ? 1 : 0) - pb.flame) * Math.min(1, dt * ((flying && pl.burn) ? 9 : 3));
    S.balloons.update(S.state === 'loading' ? 0 : dt, pb);
  }
  if (S.cull.length) cullByDistance(S.cull, cam);
  post.grade.uniforms.uTime.value = T;
  post.grade.uniforms.uAspect.value = cam.aspect;
  post.bloom.strength = 0.26 + 0.22 * Math.max(0, 1 - Math.abs(atmos.elev - 2) / 14) + (atmos.elev < -4 ? 0.12 : 0);
  if (S.motes) S.motes.material.uniforms.uVis.value = THREE.MathUtils.clamp((atmos.elev + 4) / 12, 0, 1) * (S.state === 'intro' ? 0.7 : 1);

  // HUD
  if (S.state === 'explore') {
    const p = S.player;
    const agl = p.pos.y - terrain.heightAt(p.pos.x, p.pos.z);
    S.hudTick += dt;
    if (S.frame % 2 === 0) { ui.drawCompass(p.yaw, p.pos); ui.drawMini(S.mapCanvas, p.pos, p.yaw); }
    if (S.map) ui.drawBigMap(S.mapCanvas, p.pos, p.yaw);
    if (S.hudTick > 0.2) {
      S.hudTick = 0;
      const near = ui.checkDiscovery(p.pos, sound);
      ui.updatePlace(near, p.pos, p.mode === 'walk' ? p.pos.y - terrain.heightAt(p.pos.x, p.pos.z) : agl, p.mode === 'walk' ? 'walk' : 'fly', terrain);
      ui.setClock(S.hour);
      ui.el.lockhint.classList.toggle('hidden', S.locked || S.touch || !S.active || S.photo || S.map);
      ui.updateGoal(p.pos);
      ui.el.alt.innerHTML = p.mode === 'walk' ? '' : 'Yükseklik <b>' + Math.round(agl) + ' m</b>';
    }
    sound.update(dt, { agl, speed: p.speed, walking: p.walking && S.active, sprint: p.sprint, night: U.uNight.value, elev: atmos.elev, balloons: S.balloons && S.balloons.items, pos: p.pos, yaw: p.yaw, selfBurn: p.mode !== 'walk' && p.burn });
  } else if (S.state === 'intro') {
    sound.update(dt, { agl: cam.position.y - terrain.heightAt(cam.position.x, cam.position.z), speed: 8, walking: false, night: U.uNight.value, elev: atmos.elev, balloons: S.balloons.items, pos: cam.position, yaw: 0 });
  }
}

function frame() {
  requestAnimationFrame(frame);
  if (!terrain.chunks || !S.player) return;
  clock.update();
  const dt = Math.min(clock.getDelta(), 0.08);
  frameOnce(dt);
  post.composer.render(dt);
  if (S.capture) { S.capture = false; canvas.toBlob((b) => { if (!b) return; const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'kapadokya-' + Date.now() + '.png'; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); }, 'image/png'); }
  // uyarlanabilir çözünürlük
  fpsAcc += dt; fpsN++;
  if (fpsN >= 45) {
    const avg = fpsAcc / fpsN; fpsAcc = 0; fpsN = 0; adaptCool -= 1;
    if (adaptCool <= 0) {
      let nr = pixelRatio;
      if (avg > 0.026 && pixelRatio > 0.55) nr = Math.max(0.55, pixelRatio * 0.85);
      else if (avg < 0.0155 && pixelRatio < Math.min(window.devicePixelRatio || 1, 1.6)) nr = Math.min(Math.min(window.devicePixelRatio || 1, 1.6), pixelRatio * 1.1);
      if (Math.abs(nr - pixelRatio) > 0.01) { pixelRatio = nr; renderer.setPixelRatio(nr); post.composer.setPixelRatio(nr); post.composer.setSize(window.innerWidth, window.innerHeight); adaptCool = 3; }
    }
  }
}

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix();
  post.composer.setSize(window.innerWidth, window.innerHeight);
});
canvas.addEventListener('webglcontextlost', (e) => e.preventDefault());

// geliştirici erişimi
window.__k = {
  renderer, scene, camera, terrain, U, post, POIS, S, ui, sound,
  set(x, y, z, tx, ty, tz, h, fov) { camera.position.set(x, y, z); camera.lookAt(tx, ty, tz); if (h !== undefined) S.hour = h; if (fov) { camera.fov = fov; camera.updateProjectionMatrix(); } S.state = 'dev'; },
  setHour(h) { S.hour = h; },
  tourAt(t) {
    const s = S.tour.sample(t); camera.position.copy(s.pos); camera.up.set(0, 1, 0); camera.lookAt(s.look);
    camera.fov = s.fov; camera.updateProjectionMatrix(); S.hour = s.hour; S.state = 'dev'; post.grade.uniforms.uFade.value = 0; return s.shot;
  },
  startTour, startExplore,
};
requestAnimationFrame(frame);
boot();
