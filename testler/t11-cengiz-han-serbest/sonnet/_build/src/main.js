import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { makeSkyMaterial, applySky } from './sky.js';
import { buildTerrain, buildRiver, buildGrass, terrainUniforms, grassUniforms } from './terrain.js';
import { buildMonument } from './monument.js';
import { buildWorld } from './world.js';
import { makePost } from './post.js';
import { KEYS, DURATION, CHAPTERS, chapterAt, sample, VIEWS } from './tour.js';
import { T } from './i18n.js';
import { makeAudio } from './audio.js';

const q = new URLSearchParams(location.search);
const $ = (id) => document.getElementById(id);
const state = { mode: 'boot', t: 0, paused: false, lang: (navigator.language || 'tr').startsWith('tr') ? 'tr' : 'en', hour: 7.3, sound: false, dbg: q.has('t') || q.has('view') || q.has('cam') };

// ---------- renderer ----------
const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance', preserveDrawingBuffer: q.has('shot') });
let pr = Math.min(window.devicePixelRatio || 1, 2);
renderer.setPixelRatio(pr);
renderer.setSize(innerWidth, innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
$('stage').appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(35, innerWidth / innerHeight, 0.6, 60000);
camera.position.set(-300, 30, 100);

// ---------- sky, env, lights ----------
const skyMat = makeSkyMaterial();
const skyGeo = new THREE.SphereGeometry(10, 24, 12);
const sky = new THREE.Mesh(skyGeo, skyMat); sky.frustumCulled = false; sky.renderOrder = -1000; scene.add(sky);
const envScene = new THREE.Scene(); const envSky = new THREE.Mesh(skyGeo, skyMat); envSky.frustumCulled = false; envScene.add(envSky);
const pmrem = new THREE.PMREMGenerator(renderer);
let envRT = null, lastEnvT = -10;
scene.fog = new THREE.FogExp2(0x9fb3c8, 0.0001);

const sun = new THREE.DirectionalLight(0xffffff, 3);
sun.castShadow = true;
sun.shadow.mapSize.set(4096, 4096);
const sc = sun.shadow.camera; sc.left = -62; sc.right = 62; sc.top = 62; sc.bottom = -62; sc.near = 10; sc.far = 1600;
sun.shadow.bias = -0.00015; sun.shadow.normalBias = 0.25; sun.shadow.radius = 1.5;
scene.add(sun, sun.target);
sun.target.position.set(0, 26, 0);
const hemi = new THREE.HemisphereLight(0xaac0ff, 0x3a3020, 0.0); scene.add(hemi);

// ---------- world ----------
const terrain = buildTerrain(); scene.add(terrain);
const river = buildRiver(); scene.add(river);
const grass = buildGrass(360000); scene.add(grass);
let monument = null, world = null;

// ---------- post ----------
const post = makePost(renderer, scene, camera);

// ---------- controls ----------
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; controls.dampingFactor = 0.06; controls.minDistance = 4; controls.maxDistance = 2500; controls.maxPolarAngle = Math.PI * 0.497;
controls.enabled = false; controls.rotateSpeed = 0.55; controls.zoomSpeed = 0.8; controls.target.set(0, 30, 0);

// ---------- time-of-day ----------
const tmpC = new THREE.Color();
let skyInfo = { e: 1 };
function updateSky(hour, time) {
  const info = applySky(skyMat, hour, time, 0.42 + 0.12 * Math.sin(hour * 0.7));
  skyInfo = info; const e = info.e;
  const u = skyMat.uniforms;
  const dayF = THREE.MathUtils.smoothstep(e, -0.06, 0.12), moonF = THREE.MathUtils.smoothstep(-e, 0.1, 0.3);
  const useSun = e > -0.07;
  const dir = useSun ? info.sun : info.moon;
  sun.position.copy(sun.target.position).addScaledVector(dir, 800);
  const sunCol = u.uSunCol.value;
  if (useSun) { sun.color.copy(sunCol).lerp(tmpC.set(1, 1, 1), THREE.MathUtils.smoothstep(e, 0.1, 0.6) * 0.6); sun.intensity = 3.4 * dayF * (0.55 + 0.45 * Math.min(1, e * 3 + 0.2)); }
  else { sun.color.setRGB(0.42, 0.55, 1.0); sun.intensity = 1.1 * moonF; }
  const night = 1 - THREE.MathUtils.smoothstep(e, -0.16, 0.06);
  scene.environmentIntensity = 0.55 + 0.6 * dayF;
  hemi.intensity = 0.0;
  // fog
  const mist = 1 - THREE.MathUtils.smoothstep(hour, 5.8, 7.8);
  const fogC = u.uHorizon.value;
  scene.fog.color.copy(fogC).multiplyScalar(0.92);
  scene.fog.density = 0.000045 + mist * 0.00022 + night * 0.00005;
  renderer.toneMappingExposure = 0.92 + night * 0.55 + (1 - dayF) * 0.15;
  post.bloom.strength = 0.22 + night * 0.12;
  terrainUniforms.uNight.value = night;
  return night;
}
function refreshEnv(force) {
  if (!force && performance.now() - lastEnvT < 300) return;
  lastEnvT = performance.now();
  const rt = pmrem.fromScene(envScene, 0, 0.1, 100, { size: 128 });
  scene.environment = rt.texture;
  if (envRT) envRT.dispose();
  envRT = rt;
}

// ---------- tour ----------
const cur = { pos: new THREE.Vector3(), tgt: new THREE.Vector3(), fov: 35, hour: 7 };
let flyTween = null;
function applyCam(c, roll = 0) {
  camera.position.copy(c.pos); camera.lookAt(c.tgt);
  if (camera.fov !== c.fov) { camera.fov = c.fov; camera.updateProjectionMatrix(); }
}

// ---------- UI ----------
const ui = {
  intro: $('intro'), hud: $('hud'), chapter: $('chapter'), tl: $('tl'), tlFill: $('tlfill'), bars: $('bars'), explore: $('explore'), end: $('endcard'), fade: $('fade'),
};
function applyLang() {
  const L = T[state.lang];
  document.documentElement.lang = state.lang;
  document.querySelectorAll('[data-i]').forEach((el) => { const v = L[el.dataset.i]; if (typeof v === 'string') el.textContent = v; });
  $('lang').textContent = L.lang;
  const vb = $('views'); vb.innerHTML = '';
  for (const k of Object.keys(VIEWS)) { const b = document.createElement('button'); b.textContent = L.v[k]; b.onclick = () => flyTo(k); vb.appendChild(b); }
  lastChapter = null;
}
let lastChapter = null;
function showChapter(c, t) {
  const L = T[state.lang];
  if (lastChapter !== c.id) {
    lastChapter = c.id;
    const [title, text, stats] = L.ch[c.id];
    ui.chapter.classList.remove('on');
    void ui.chapter.offsetWidth;
    $('c-num').textContent = c.num; $('c-title').textContent = title; $('c-text').textContent = text;
    $('c-stats').innerHTML = stats.map(([n, l]) => `<div><b>${n}</b><span>${l}</span></div>`).join('');
    ui.chapter.classList.add('on');
  }
  const idx = CHAPTERS.indexOf(c); const next = CHAPTERS[idx + 1]; const end = next ? next.t : DURATION;
  ui.chapter.classList.toggle('out', t > end - 1.2 && next !== undefined);
}
function buildTimeline() {
  ui.tl.querySelectorAll('.tick').forEach((n) => n.remove());
  CHAPTERS.forEach((c) => {
    const d = document.createElement('div'); d.className = 'tick'; d.style.left = (c.t / DURATION * 100) + '%';
    d.dataset.n = c.num; d.title = T[state.lang].ch[c.id][0];
    d.onclick = (e) => { e.stopPropagation(); seekTour(c.t); };
    ui.tl.appendChild(d);
  });
}
function seekTour(t) { if (state.mode === 'explore') startTour(t); else { state.t = t; lastChapter = null; } }

function startTour(t0 = 0) {
  state.mode = 'tour'; state.t = t0; state.paused = false; lastChapter = null;
  controls.enabled = false;
  document.body.dataset.mode = 'tour'; ui.end.classList.remove('on');
  $('pp').textContent = '❚❚';
}
function startExplore() {
  state.mode = 'explore'; document.body.dataset.mode = 'explore';
  controls.target.copy(cur.tgt.lengthSq() > 1 ? cur.tgt : new THREE.Vector3(0, 30, 0));
  const d = camera.position.distanceTo(controls.target);
  if (d > 2400) camera.position.lerp(controls.target, 0.5);
  controls.enabled = true; ui.end.classList.remove('on');
  $('hourr').value = state.hour;
}
function flyTo(k) {
  const v = VIEWS[k];
  flyTween = { t: 0, p0: camera.position.clone(), q0: controls.target.clone(), p1: new THREE.Vector3(...v.p), q1: new THREE.Vector3(...v.q), f0: camera.fov, f1: v.fov };
}

async function boot() {
  applyLang(); buildTimeline();
  const bar = $('loadbar');
  const step = async (p, f) => { bar.style.width = p + '%'; await new Promise((r) => setTimeout(r, 30)); await f?.(); };
  await step(8);
  monument = await buildMonument(); scene.add(monument.root);
  await step(55);
  world = buildWorld(scene, monument);
  await step(85);
  updateSky(state.hour, 0); refreshEnv(true);
  renderer.compile(scene, camera);
  await step(100);
  $('intro').classList.add('ready');
  window.__ready = true;
  if (q.has('t')) { state.mode = 'tour'; state.t = +q.get('t'); state.paused = true; document.body.dataset.mode = 'tour'; ui.intro.classList.add('gone'); ui.fade.style.opacity = 0; }
  else if (q.has('view') || q.has('cam')) {
    state.mode = 'explore'; document.body.dataset.mode = 'explore'; ui.intro.classList.add('gone'); ui.fade.style.opacity = 0;
    if (q.has('view')) { const v = VIEWS[q.get('view')]; camera.position.set(...v.p); controls.target.set(...v.q); camera.fov = v.fov; camera.updateProjectionMatrix(); }
    if (q.has('cam')) { const a = q.get('cam').split(',').map(Number); camera.position.set(a[0], a[1], a[2]); controls.target.set(a[3], a[4], a[5]); if (a[6]) { camera.fov = a[6]; camera.updateProjectionMatrix(); } }
    state.hour = +(q.get('hour') || 9); controls.enabled = false;
  } else { state.mode = 'idle'; document.body.dataset.mode = 'idle'; ui.fade.style.opacity = 0; }
  if (q.has('hour')) state.hour = +q.get('hour');
}

$('btn-begin').onclick = () => { ui.fade.style.opacity = 1; setTimeout(() => { ui.intro.classList.add('gone'); startTour(0); setTimeout(() => (ui.fade.style.opacity = 0), 250); audio.start(); }, 900); };
$('btn-explore').onclick = () => { ui.intro.classList.add('gone'); startExplore(); state.hour = 9.3; audio.start(); };
$('pp').onclick = () => { state.paused = !state.paused; $('pp').textContent = state.paused ? '▶' : '❚❚'; };
$('lang').onclick = () => { state.lang = state.lang === 'tr' ? 'en' : 'tr'; applyLang(); buildTimeline(); };
$('snd').onclick = () => { const on = audio.toggle(); $('snd').classList.toggle('off', !on); };
$('skip').onclick = () => startExplore();
$('replay').onclick = () => startTour(0);
$('end-explore').onclick = () => startExplore();
$('to-tour').onclick = () => startTour(0);
$('hourr').oninput = (e) => { state.hour = +e.target.value; };
$('tl').onclick = (e) => { const r = $('tl').getBoundingClientRect(); seekTour(((e.clientX - r.left) / r.width) * DURATION); };
addEventListener('keydown', (e) => {
  if (e.code === 'Space' && state.mode === 'tour') { e.preventDefault(); $('pp').click(); }
  if (e.key === 'f') document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.();
});
addEventListener('resize', () => {
  renderer.setSize(innerWidth, innerHeight); post.composer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); post.grade.uniforms.uAspect.value = camera.aspect;
});
post.grade.uniforms.uAspect.value = camera.aspect;

const audio = makeAudio();

// ---------- main loop ----------
const clock = new THREE.Clock();
let time = 0, fpsAcc = 0, fpsN = 0, lastFpsCheck = 0;
const sunScreen = new THREE.Vector3();
function frame() {
  requestAnimationFrame(frame);
  if (!monument) return;
  const dt = Math.min(clock.getDelta(), 0.1); time += dt;

  if (state.mode === 'tour') {
    if (!state.paused) state.t += dt;
    if (state.t >= DURATION) { state.t = DURATION; if (!ui.end.classList.contains('on')) ui.end.classList.add('on'); document.body.classList.add('ended'); } else document.body.classList.remove('ended');
    sample(state.t, cur);
    state.hour = cur.hour;
    // subtle handheld drift
    const s = 0.5;
    cur.pos.x += Math.sin(time * 0.53) * 0.25 * s; cur.pos.y += Math.sin(time * 0.71 + 1) * 0.18 * s;
    applyCam(cur);
    showChapter(chapterAt(state.t), state.t);
    ui.tlFill.style.width = (state.t / DURATION * 100) + '%';
  } else if (state.mode === 'idle') {
    // title-screen slow orbit
    const a = 0.6 + time * 0.035;
    camera.position.set(Math.cos(a) * 200, 40 + Math.sin(time * 0.2) * 4, Math.sin(a) * 200);
    camera.fov = 34; camera.updateProjectionMatrix();
    controls.target.set(0, 58, 0); camera.lookAt(0, 58, 0);
    state.hour = 6.55;
  } else if (state.mode === 'explore') {
    if (flyTween) {
      flyTween.t += dt / 2.4; const u = Math.min(1, flyTween.t); const e = u * u * (3 - 2 * u);
      camera.position.lerpVectors(flyTween.p0, flyTween.p1, e); controls.target.lerpVectors(flyTween.q0, flyTween.q1, e);
      camera.fov = flyTween.f0 + (flyTween.f1 - flyTween.f0) * e; camera.updateProjectionMatrix();
      if (u >= 1) flyTween = null;
    }
    controls.update();
    cur.tgt.copy(controls.target);
  }
  if (q.has('cam') || q.has('view')) camera.lookAt(controls.target);

  const night = updateSky(state.hour, time);
  refreshEnv(false);
  sky.position.copy(camera.position);
  grassUniforms.uTime.value = time;
  monument.update(time, night);
  world.update(time, dt, night, camera, skyInfo);
  audio.update(night, state.mode === 'tour' ? chapterAt(state.t).id : 'explore', dt);

  // shafts
  const g = post.grade.uniforms;
  sunScreen.copy(skyInfo.sun).multiplyScalar(1000).add(camera.position).project(camera);
  const inFront = sunScreen.z < 1 && skyInfo.sun.dot(camera.getWorldDirection(new THREE.Vector3())) > 0.05;
  g.uSun.value.set(sunScreen.x * 0.5 + 0.5, sunScreen.y * 0.5 + 0.5);
  g.uShaft.value = inFront ? 0.85 * THREE.MathUtils.smoothstep(skyInfo.e, -0.05, 0.12) * (1 - THREE.MathUtils.smoothstep(skyInfo.e, 0.35, 0.7)) : 0;
  g.uTime.value = time;
  g.uWarm.value = 0.6 * (1 - THREE.MathUtils.smoothstep(skyInfo.e, 0.1, 0.5));

  post.composer.render();
  window.__frames = (window.__frames || 0) + 1;

  // adaptive resolution
  fpsAcc += dt; fpsN++;
  if (time - lastFpsCheck > 2.5 && !state.dbg) {
    const fps = fpsN / fpsAcc; fpsAcc = 0; fpsN = 0; lastFpsCheck = time;
    let np = pr;
    if (fps < 38 && pr > 0.75) np = Math.max(0.75, pr - 0.25);
    else if (fps > 58 && pr < Math.min(devicePixelRatio || 1, 2)) np = Math.min(Math.min(devicePixelRatio || 1, 2), pr + 0.25);
    if (np !== pr) { pr = np; renderer.setPixelRatio(pr); post.composer.setPixelRatio(pr); post.composer.setSize(innerWidth, innerHeight); }
  }
}
boot().then(() => { clock.start(); frame(); });
window.__dbg = { state, camera, controls, sample: (t) => sample(t, cur) };
