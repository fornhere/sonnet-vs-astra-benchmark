// Kız Kulesi · Fırtınalı Gece — giriş noktası, sahne kurulumu ve ana döngü
import * as THREE from 'three';
import { params, Q, QUALITY, LOOP } from './config.js';
import { state } from './state.js';
import { U } from './uniforms.js';
import { Environment } from './environment.js';
import { Sky } from './sky.js';
import { Sea } from './sea.js';
import { buildTower } from './tower.js';
import { Lighthouse } from './lighthouse.js';
import { Rain } from './rain.js';
import { Lightning } from './lightning.js';
import { Spray } from './spray.js';
import { City } from './city.js';
import { Ship } from './ship.js';
import { Birds } from './birds.js';
import { CameraRig, sampleCinematic } from './cameraRig.js';
import { AudioEngine } from './audio.js';
import { Post } from './post.js';
import { UI } from './ui.js';
import { heightAt } from './waves.js';

let ui;
function boot() {
const bootT0 = performance.now();
try {
  ui = new UI({
    strike: () => lightning && lightning.strike({ manual: true }),
    camToggle: () => { rig.setMode(state.camMode === 'free' ? 'cinematic' : 'free'); ui.updateCamButtons(); },
    camCinematic: () => { rig.setMode('cinematic'); ui.updateCamButtons(); ui.toast('Sinematik kameraya dönülüyor'); },
    sound: () => toggleSound(),
    download: () => downloadPNG(),
  });

  const canvas = document.getElementById('c');
  const renderer = new THREE.WebGLRenderer({
    canvas, antialias: false, powerPreference: 'high-performance', alpha: false, stencil: false,
  });
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = Number(params.get('exp')) || 1.15;
  renderer.setClearColor(0x05070c, 1);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, innerWidth / innerHeight, 0.4, 16000);
  camera.position.set(-262, 31, 84);

  // --- Dünya ---
  const env = new Environment(renderer, scene);
  const sky = new Sky();
  scene.add(sky.dome, sky.low);
  const tower = buildTower();
  scene.add(tower.group);
  tower.leadMat.envMap = env.cubeRT.texture;
  const sea = new Sea(env.cubeRT.texture);
  sea.mesh.name = 'deniz';
  scene.add(sea.mesh);
  const lighthouse = new Lighthouse(scene, tower);
  const rain = new Rain(scene);
  const lightning = new Lightning(scene, camera);
  const spray = new Spray(scene);
  const city = new City(scene);
  const ship = new Ship(scene);
  const birds = new Birds(scene);
  const rig = new CameraRig(camera, canvas);
  const post = new Post(renderer, scene, camera);
  const audio = new AudioEngine();

  state.lampWorld = tower.lampWorld;
  U.uLanternPos.value.copy(tower.lanternPos);
  lightning.onThunder = (info) => audio.thunder(info);
  ui.updateCamButtons();

  // --- Boyutlandırma ve dinamik çözünürlük ---
  let scale = 1;
  const adaptive = params.get('adapt') !== '0' && QUALITY === 'high';
  function basePR() { return Math.min(window.devicePixelRatio || 1, Q.maxDpr) * Q.renderScale; }
  function resize() {
    const w = innerWidth, h = innerHeight;
    const pr = basePR() * scale;
    renderer.setPixelRatio(pr);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    post.setSize(w, h, pr);
    state.renderH = Math.round(h * pr);
    U.uRes.value.set(w * pr, h * pr);
  }
  addEventListener('resize', resize);
  resize();

  // --- Ses ---
  async function toggleSound() {
    if (!state.soundOn) {
      try {
        await audio.enable();
        state.soundOn = true;
        ui.setSound(true); ui.toast('Ses açık — fırtına şiddetiyle birlikte değişir');
      } catch (e) { ui.toast('Ses başlatılamadı: ' + e.message); }
    } else {
      audio.disable(); state.soundOn = false; ui.setSound(false); ui.toast('Ses kapalı');
    }
  }

  // --- Fotoğraf ---
  function downloadPNG() {
    const pr0 = renderer.getPixelRatio();
    const target = Math.min(3840 / innerWidth, pr0 * 1.6);
    renderer.setPixelRatio(target);
    renderer.setSize(innerWidth, innerHeight, false);
    post.setSize(innerWidth, innerHeight, target);
    state.renderH = Math.round(innerHeight * target);
    post.render(0.0001);
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url; a.download = `kiz-kulesi-${Date.now()}.png`;
    document.body.appendChild(a); a.click(); a.remove();
    resize();
    ui.toast('PNG indirildi');
  }

  // --- Ana döngü ---
  let lastT = performance.now();
  let acc = 0, frames = 0, fpsLast = performance.now();
  let slowStreak = 0, fastStreak = 0;
  const fpsLog = [];
  let ema = 16.7;
  const paused = params.get('pause') === '1';
  const syncGpu = params.get('sync') === '1';   // ölçüm: GPU'yu her karede bekle

  function frame() {
    requestAnimationFrame(frame);
    const nowT = performance.now();
    const cpu0 = nowT;
    const rawDt = Math.min((nowT - lastT) / 1000, 0.1);
    lastT = nowT;
    const dt = paused ? 0 : rawDt;
    state.dt = dt;
    state.time += dt;
    const time = state.time + 40;   // dalgalar t=0'da düz başlamasın

    renderer.toneMappingExposure = (Number(params.get('exp')) || 1.15) * (1 - 0.2 * state.daySmooth);
    const P0 = performance.now();
    rig.update(dt, time);
    camera.updateMatrixWorld();
    U.uCamPos.value.copy(camera.position);
    lightning.update(dt, camera);
    const P1 = performance.now();
    env.update(dt, time);
    const P2 = performance.now();
    sky.update(camera.position);
    ship.update(dt, time);
    sea.update(state, time, ship);
    tower.update(time, state.wind, state.stormSmooth);
    tower.flicker(time);
    lighthouse.update(dt, time, camera, state);
    rain.update(state, camera);
    spray.update(dt, time, state);
    birds.update(dt, time, state.stormSmooth, camera.position);
    city.update(camera, state.renderH, state.daySmooth);
    audio.setStorm(state.stormSmooth, state.wind);
    audio.update();
    ui.setChapter(rig.chapter);
    ui.updateCamButtons();

    const P3 = performance.now();
    const gq = gpuBegin();
    city.setPxScale(Q.cubeRes / 2);
    env.renderCube();
    city.setPxScale(state.renderH / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2)));
    const P4 = performance.now();
    post.render(dt);
    const P5 = performance.now();
    if (tExt) { sect[0] += P1 - P0; sect[1] += P2 - P1; sect[2] += P3 - P2; sect[3] += P4 - P3; sect[4] += P5 - P4; sect[5]++; }
    gpuEnd(gq); gpuPoll();
    if (tExt) cpuLog.push([state.camTime, performance.now() - cpu0]);
    if (syncGpu) renderer.getContext().finish();

    // fps ölçümü
    frames++;
    ema += (rawDt * 1000 - ema) * 0.05;
    const now = performance.now();
    if (now - fpsLast >= 500) {
      const fps = frames * 1000 / (now - fpsLast);
      frames = 0; fpsLast = now;
      fpsLog.push(fps); if (fpsLog.length > 600) fpsLog.shift();
      ui.setFps(fps, 1000 / fps, `${Math.round(renderer.domElement.width)}×${Math.round(renderer.domElement.height)} · ${QUALITY}`);
      if (adaptive) {
        if (fps < 54) { slowStreak++; fastStreak = 0; } else if (fps > 59 && scale < 1) { fastStreak++; slowStreak = 0; } else { slowStreak = fastStreak = 0; }
        if (slowStreak >= 2 && scale > 0.5) { scale = Math.max(0.5, scale * 0.9); resize(); slowStreak = 0; }
        if (fastStreak >= 8) { scale = Math.min(1, scale * 1.06); resize(); fastStreak = 0; }
      }
    }
  }

  // GPU süre ölçümü (yalnız ?gpu=1): EXT_disjoint_timer_query_webgl2
  const glc = renderer.getContext();
  const tExt = params.get('gpu') === '1' ? glc.getExtension('EXT_disjoint_timer_query_webgl2') : null;
  const gpuPending = [], gpuLog = [], cpuLog = [], sect = [0, 0, 0, 0, 0, 0];
  function gpuBegin() { if (!tExt) return null; const q = glc.createQuery(); glc.beginQuery(tExt.TIME_ELAPSED_EXT, q); return q; }
  function gpuEnd(q) { if (q) { glc.endQuery(tExt.TIME_ELAPSED_EXT); gpuPending.push([q, state.camTime]); } }
  function gpuPoll() {
    while (gpuPending.length) {
      const [q, ct] = gpuPending[0];
      if (!glc.getQueryParameter(q, glc.QUERY_RESULT_AVAILABLE)) break;
      const dis = glc.getParameter(tExt.GPU_DISJOINT_EXT);
      const ns = glc.getQueryParameter(q, glc.QUERY_RESULT);
      gpuPending.shift(); glc.deleteQuery(q);
      if (!dis) gpuLog.push([ct, ns / 1e6]);
    }
  }

  // Hata ayıklama / test API'si
  window.__kiz = {
    state, U, camera, renderer, scene, lightning, rig, audio, tower, sea, ship, sky, rain, city, spray, birds, post, env,
    fpsLog, gpuLog, cpuLog, sect, scale: () => scale,
    seekCam(t, hold = true) { state.camTime = t; state.camHold = hold; },
    setStorm(v) { state.storm = v; state.stormSmooth = v; ui.storm.value = v; ui.refresh(); },
    setDay(v) { state.day = v; state.daySmooth = v; ui.day.value = v; ui.refresh(); },
    strike(o) { lightning.strike(o || { manual: true }); },
    heightAt, sampleCinematic,
    setSize(w, h) { /* headless ölçüm için */ resize(); },
  };
  if (params.has('t')) { state.camTime = Number(params.get('t')); }
  if (params.get('hold') === '1') state.camHold = true;

  // Tüm shader'ları baştan derle (ilk şimşek / ilk kare takılması olmasın)
  try { renderer.compile(scene, camera); env.renderCube(); post.render(0.001); } catch (e) { console.warn('ısınma', e); }
  window.__kiz.bootMs = performance.now() - bootT0;
  document.getElementById('loading')?.remove();
  requestAnimationFrame(frame);
} catch (e) {
  console.error(e && e.stack ? e.stack : e);
  if (ui) ui.error('Sahne başlatılamadı: ' + e.message + '\n(WebGL2 destekli bir tarayıcı gerekir)');
  else document.body.textContent = 'Başlatılamadı: ' + e.message;
}
}

// Yükleniyor yazısı boyansın diye ağır başlatmayı bir sonraki karede yap
requestAnimationFrame(() => setTimeout(boot, 30));
