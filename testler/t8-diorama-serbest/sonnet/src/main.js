import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { decodeGrid, buildWorld } from './world.js';
import { computeTops, meshChunk, CS } from './mesher.js';
import { createSky, createTable, createWater, applyTime, env } from './env.js';
import { createPost } from './post.js';
import { createTraffic, createWaterTanks, createBoats, createClouds, createHelicopter, createSnow } from './life.js';
import { prepareHeroes, placeHeroModels, placeBridges } from './heroes.js';
import { createVoxelMaterial, createDepthMaterial, makeChunkMesh, baseQuad, voxUniforms } from './voxmat.js';
import { createCameraRig } from './cam.js';
import { buildInfo, viewToCam } from './info.js';
import { buildTour } from './tour.js';
import { initUI } from './ui.js';
import { W, D } from './dims.js';

import { K } from './world.js';
const $ = (s) => document.querySelector(s);
function findStreetView(world, pts) {
  const { W, D, kind } = world; const tx = pts.timessq[0], tz = D - pts.timessq[1]; let best = null;
  for (let z = Math.floor(tz) - 30; z < Math.floor(tz) + 30; z++) for (let x = Math.floor(tx) - 14; x < Math.floor(tx) + 14; x++) { let run = 0; while (run < 30 && kind[(z - run) * W + x] === K.ROAD) run++; if (run >= 18 && kind[z * W + x - 1] === K.BLD && kind[z * W + x + 1] === K.BLD) { const d = Math.hypot(x - tx, z - tz); if (!best || d < best.d) best = { d, x, z }; } }
  if (!best) return { ty: 11.5, pos: [tx, tz], az: 8, el: 7, dist: 40 };
  return { cam: [best.x + 0.5, 11.9, best.z + 0.5], tgt: [best.x + 0.5, 13.2, best.z - 14] };
}
const tick = () => new Promise(r => setTimeout(r, 16));
async function stage(msg, p) { $('#lmsg').textContent = msg; $('#lbar').style.width = (p * 100) + '%'; await tick(); }
async function inflate(b64) {
  const bin = atob(b64); const u8 = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
  const s = new Blob([u8]).stream().pipeThrough(new DecompressionStream('deflate')); return new Uint8Array(await new Response(s).arrayBuffer());
}
const canvas = $('#c');
let renderer;
try { renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance' }); }
catch (e) { $('#lmsg').textContent = 'WebGL2 gerekli — lütfen güncel bir tarayıcı kullanın.'; throw e; }
let PR = Math.min(devicePixelRatio || 1, 2); const PR_MAX = PR;
renderer.setPixelRatio(PR); renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
const scene = new THREE.Scene(); scene.fog = new THREE.Fog(0x9fb4c8, 900, 4200);
const camera = new THREE.PerspectiveCamera(35, innerWidth / innerHeight, 0.5, 9000);
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true; controls.dampingFactor = 0.08; controls.screenSpacePanning = false; controls.minDistance = 8; controls.maxDistance = 2200; controls.maxPolarAngle = 1.5; controls.rotateSpeed = 0.7; controls.zoomSpeed = 0.9;
const sun = new THREE.DirectionalLight(0xfff1dd, 3.0); sun.castShadow = true; sun.shadow.mapSize.set(4096, 4096); sun.shadow.bias = -0.0003; sun.shadow.normalBias = 0.04;
scene.add(sun, sun.target); const hemi = new THREE.HemisphereLight(0xbfd8ff, 0x8a7a66, 1.1); scene.add(hemi);
const sky = createSky(scene);
const ctx = { sun, hemi, scene, renderer, sunDir: new THREE.Vector3(0, 1, 0), state: null };
const Q = new URLSearchParams(location.search); let timeH = Q.has('t') ? parseFloat(Q.get('t')) || 15.6 : 15.6; let timeTween = null;
const setTime = (t) => { timeH = ((t % 24) + 24) % 24; applyTime(timeH, ctx); };
const post = createPost(renderer, scene, camera);
const hooks = { getTime: () => timeH, setTime, onTourStart: null, onTourEnd: null, onTourCaption: null };
const rig = createCameraRig(camera, controls, canvas, hooks);

function fitShadow() {
  const dist = camera.position.distanceTo(controls.target); const R = THREE.MathUtils.clamp(dist * 0.62, 70, 640);
  const sc = sun.shadow.camera; sc.left = -R; sc.right = R; sc.top = R; sc.bottom = -R; sc.near = 10; sc.far = 2800; sc.updateProjectionMatrix();
  const tgt = controls.target.clone(); const texel = 2 * R / 4096;
  const dir = ctx.sunDir; const up = Math.abs(dir.y) > 0.95 ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 1, 0);
  const rx = new THREE.Vector3().crossVectors(up, dir).normalize(), ry = new THREE.Vector3().crossVectors(dir, rx).normalize();
  const px = Math.round(tgt.dot(rx) / texel) * texel, py = Math.round(tgt.dot(ry) / texel) * texel, pz = tgt.dot(dir);
  const snapped = rx.multiplyScalar(px).add(ry.multiplyScalar(py)).add(dir.clone().multiplyScalar(pz));
  sun.target.position.copy(snapped); sun.position.copy(snapped).add(dir.clone().multiplyScalar(1400)); sun.target.updateMatrixWorld();
}

(async () => {
  await stage('Şehir verisi çözülüyor…', 0.08);
  const bytes = await inflate(window.NYGRID);
  await stage('Bina izleri yükseltiliyor…', 0.22);
  const g = decodeGrid(bytes, W, D); const world = buildWorld(g);
  await stage('Kahraman yapılar yerleştiriliyor…', 0.42);
  const pts = window.NYDATA.pts, nb = window.NYDATA.nb;
  const heroes = prepareHeroes(world, pts);
  const mat = createVoxelMaterial(), dmat = createDepthMaterial(), bq = baseQuad(); const mats = { bq, mat, dmat };
  const top = computeTops(world); const group = new THREE.Group(); scene.add(group);
  await stage('Voxeller örülüyor…', 0.55);
  const nCz = Math.ceil(D / CS), nCx = Math.ceil(W / CS);
  for (let cz = 0; cz < nCz; cz++) { for (let cx = 0; cx < nCx; cx++) { const ch = meshChunk(world, cx, cz, top); if (ch.n) group.add(makeChunkMesh(ch, bq, mat, dmat)); } if (cz % 6 === 0) await stage('Voxeller örülüyor…', 0.55 + 0.25 * cz / nCz); }
  await stage('Köprüler, tekneler, trafik…', 0.82);
  placeHeroModels(heroes, mats, group, pts);
  placeBridges(world, pts, mats, group);
  createTable(scene); const water = createWater(scene, world);
  const traffic = createTraffic(world, scene); createWaterTanks(world, scene);
  const boats = createBoats(world, scene, mats, pts);
  const clouds = createClouds(scene); const heli = createHelicopter(scene, mats, [pts.esb[0], D - pts.esb[1]]);
  const snow = createSnow(scene); let snowT = 0, snowOn = false;
  const info = buildInfo(pts, nb); info.views.street = findStreetView(world, pts); const tourStops = buildTour(info);
  setTime(timeH);
  await stage('Işıklar yakılıyor…', 0.95);
  const vis = { traffic: true, clouds: true };
  const api = { hooks, setTime, getTime: () => timeH,
    tweenTime: (to) => { let d = to - timeH; if (d > 12) d -= 24; if (d < -12) d += 24; timeTween = { from: timeH, d, t: 0 }; },
    toggles: { traffic: (on) => { vis.traffic = on; traffic.mesh.visible = on; boats.boats.forEach(b => { b.mesh.visible = on; b.wake.visible = on; }); heli.mesh.visible = on; }, clouds: (on) => { vis.clouds = on; clouds.grp.visible = on; }, tilt: (on) => { post.tilt = on ? 1 : 0; }, snow: (on) => { snowOn = on; }, bloom: (on) => { post.bloom.enabled = on; } } };
  const ui = initUI({ camera, controls, canvas, rig, info, tourStops, api });
  // açılış: yüksekten süzül
  const ov = (() => { let v = info.views.overview; const asp = innerWidth / innerHeight; if (asp < 1.0) v = { ...v, dist: v.dist * Math.min(2.4, 1.0 / Math.max(0.45, asp) * 0.72), az: 0, el: 46 }; return viewToCam(v, THREE); })(); const startPos = ov.pos.clone().multiplyScalar(0.4).add(new THREE.Vector3(0, 900, 0)); rig.set(startPos, ov.target);
  window.__ready = true; window.__cam = { water, camera, controls, setTime, post, rig, info, world, THREE, ui, scene };
  document.body.classList.add('ready'); $('#loader').classList.add('hide');
  setTimeout(() => { rig.flyTo(ov.pos, ov.target, 5.5, { bump: 0.05 }); }, 500);
  if (Q.has('snow')) document.querySelector('.sw[data-t=snow]').click();
  if (Q.has('clean')) $('#ui').style.opacity = '0';
  if (Q.has('tour')) setTimeout(() => { if (!rig.tour) document.getElementById('tourbtn').click(); }, 6500);
  if (Q.has('loop')) { const prev = hooks.onTourEnd; hooks.onTourEnd = () => { prev && prev(); setTimeout(() => document.getElementById('tourbtn').click(), 2500); }; }
  // döngü
  let idleT = 0; ['pointerdown', 'wheel', 'keydown', 'touchstart'].forEach(ev => addEventListener(ev, () => { idleT = 0; controls.autoRotate = false; }, { passive: true }));
  let shot = false; window.__shot = () => { shot = true; };
  let fc = 0, ft = performance.now(), last = performance.now() / 1000, slow = 0, fast = 0;
  const showFps = /[?&]fps/.test(location.search);
  const loop = () => {
    requestAnimationFrame(loop); const now = performance.now() / 1000; const dt = Math.min(0.1, now - last); last = now; fc++;
    if (performance.now() - ft > 1000) { const fps = fc; window.__fps = fps; fc = 0; ft = performance.now(); if (showFps) $('#fps').textContent = fps + ' fps · PR ' + PR.toFixed(2);
      if (now > 12) { if (fps < 34) { slow++; fast = 0; } else if (fps > 57) { fast++; slow = 0; } else { slow = 0; fast = 0; }
        if (slow >= 3 && PR <= 0.8 && fps < 28) { if (sun.castShadow) { sun.castShadow = false; } else if (water.mesh.visible && !water.off) { water.off = true; water.setReflection(false); } else if (post.bloom.enabled) { post.bloom.enabled = false; } else { post.tilt = 0; } slow = 0; }
        if (slow >= 2 && PR > 0.8) { PR = Math.max(0.75, PR - 0.25); renderer.setPixelRatio(PR); post.setSize(innerWidth, innerHeight, PR); slow = 0; }
        if (fast >= 8 && PR < PR_MAX) { PR = Math.min(PR_MAX, PR + 0.25); renderer.setPixelRatio(PR); post.setSize(innerWidth, innerHeight, PR); fast = 0; } } }
    if (timeTween) { timeTween.t += dt / 2.0; const u = Math.min(1, timeTween.t); const e = u * u * (3 - 2 * u); setTime(timeTween.from + timeTween.d * e); if (u >= 1) timeTween = null; }
    { const tgt = snowOn ? 1 : 0; if (Math.abs(snowT - tgt) > 0.001) { snowT += Math.sign(tgt - snowT) * Math.min(Math.abs(tgt - snowT), dt / 3.5); voxUniforms.uSnow.value = snowT; setTime(timeH); snow.pts.visible = snowT > 0.01; } snow.u.uAmt.value = snowT; snow.u.uPx.value = PR; snow.u.uCenter.value.set(camera.position.x + (controls.target.x - camera.position.x) * 0.4, 0, camera.position.z + (controls.target.z - camera.position.z) * 0.4); snow.u.uSpan.value = THREE.MathUtils.clamp(camera.position.distanceTo(controls.target) * 0.9, 90, 700); }
    idleT += dt; if (idleT > 22 && !rig.tour && !rig.anim && !controls.autoRotate) { controls.autoRotate = true; controls.autoRotateSpeed = 0.45; }
    voxUniforms.uTime.value = now; rig.update(dt); controls.update();
    if (camera.position.y < 11.6) camera.position.y = 11.6;
    sky.position.copy(camera.position); env.uniforms.uCamPos.value.copy(camera.position); fitShadow();
    ui.update(dt, innerWidth, innerHeight, timeH);
    if (vis.traffic) { traffic.update(now, ctx.state.night); boats.update(now); heli.update(now); }
    if (vis.clouds) clouds.update(dt, camera, 1 - ctx.state.night, new THREE.Color().copy(ctx.state.hor).lerp(new THREE.Color(1, 1, 1), 0.6).multiplyScalar(0.55 + 0.45 * (1 - ctx.state.night)), THREE.MathUtils.smoothstep(camera.position.distanceTo(controls.target), 520, 820));
    { const cd = camera.position.distanceTo(controls.target); post.tiltK = THREE.MathUtils.smoothstep(cd, 40, 380); }
    post.bloom.strength = ctx.state.bloom; post.update(now); post.composer.render();
    if (shot) { shot = false; canvas.toBlob((b) => { const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'manhattan-diorama.png'; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); }, 'image/png'); }
  };
  loop();
})().catch(e => { console.error(e); $('#lmsg').textContent = 'Hata: ' + e.message; });
addEventListener('resize', () => { if (window.__cam && window.__cam.water) window.__cam.water.resize(innerWidth, innerHeight, PR); renderer.setSize(innerWidth, innerHeight); post.setSize(innerWidth, innerHeight, PR); camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); });
