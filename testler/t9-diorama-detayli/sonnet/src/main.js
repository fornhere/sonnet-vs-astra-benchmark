// New York (Manhattan) voxel diorama — ana giriş. Sıra: veri → binalar → arazi → simgeler → canlılık → ışık/son işlem → arayüz.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { W, H } from './geo.js';
import { loadWorld, D } from './world.js';
import { makeCityPalette } from './palette.js';
import { buildBuildings } from './buildings.js';
import { buildTerrain } from './terrain.js';
import { makeVoxelMaterial, U } from './materials.js';
import { Lighting } from './lighting.js';
import { buildWater } from './water.js';
import { buildBase, buildTable } from './diorama.js';
import { CameraRig, OVERVIEW } from './camera.js';
import { Post } from './post.js';
import { planLandmarks, buildLandmarks, LANDMARKS } from './landmarks/index.js';
import { buildTrees, buildLamps } from './nature.js';
import { Traffic } from './traffic.js';
import { Weather } from './weather.js';
import { UI } from './ui.js';
import { CityAudio } from './audio.js';

const qs = new URLSearchParams(location.search);
const QUALITY = qs.get('q') === 'low' ? 'low' : 'high';
const step = (t, f) => { const el = document.getElementById('ld-step'); if (el) el.textContent = t; const b = document.getElementById('ld-fill'); if (b) b.style.width = (f * 100) + '%'; return new Promise((r) => requestAnimationFrame(() => setTimeout(r, 0))); };

async function boot() {
  const canvas = document.getElementById('gl');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, QUALITY === 'low' ? 1 : 1.5));
  renderer.setSize(innerWidth, innerHeight, false); renderer.info.autoReset = false;
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(27, innerWidth / innerHeight, 3, 30000);
  const rig = new CameraRig(camera, canvas);
  const lighting = new Lighting(scene, renderer); lighting.setupShadow(QUALITY);
  const pmrem = new THREE.PMREMGenerator(renderer); scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  await step('Veriler çözülüyor…', 0.05);
  const world = loadWorld();
  const P = makeCityPalette();
  const lmPos = planLandmarks(world);
  await step('Binalar yükseltiliyor…', 0.2);
  const bld = buildBuildings(world, P, { sign: [lmPos.times[0], lmPos.times[1], 8.5], halo: [[lmPos.times[0], lmPos.times[1] + 1, 4.2, 0.55], [lmPos.gct[0], lmPos.gct[1], 12, 0.25], [lmPos.flatiron[0], lmPos.flatiron[1], 7, 0.22], [lmPos.rock[0] + 1, lmPos.rock[1], 8.5, 0.2], [lmPos.chrysler[0], lmPos.chrysler[1], 4.2, 0.6], [lmPos.esb[0], lmPos.esb[1], 4.5, 0.6]] });
  const material = makeVoxelMaterial(); const swayMat = makeVoxelMaterial({ sway: true });
  await step('Arazi ve kaide kesiti örülüyor…', 0.4);
  const terrain = buildTerrain(world, P, bld, material); scene.add(terrain.mesh);
  await step('Simgeler kuruluyor…', 0.6);
  const lm = buildLandmarks(world, bld, material, lmPos); scene.add(lm.group);
  const water = buildWater(world); scene.add(water.mesh);
  const base = buildBase(); scene.add(base); scene.add(buildTable());
  await step('Ağaçlar, trafik, tekneler…', 0.75);
  const trees = buildTrees(world, terrain.topY, swayMat, QUALITY); scene.add(trees.mesh);
  const lamps = buildLamps(world, QUALITY); scene.add(lamps.mesh);
  const traffic = new Traffic(world, material, QUALITY, terrain.topY); scene.add(traffic.group);
  const weather = new Weather(lighting, QUALITY); scene.add(weather.mesh);
  await step('Işık ve son işlem derleniyor…', 0.9);
  const post = new Post(renderer, scene, camera, QUALITY);

  // ---- simge yerleşimi, kamera uçuş noktaları, seçim kutuları ----
  const G = (cell, y = 0) => new THREE.Vector3(cell[0], y, cell[1]);
  const P2 = lmPos;
  const parkC = [W * 0.455, 0]; // Central Park merkezi (aşağıda hücreden)
  const focus = {
    liberty: { t: [P2.liberty[0], 7.5, P2.liberty[1]], az: 0.85, pol: 1.22, rad: 40 },
    wtc: { t: [P2.wtc[0], 24, P2.wtc[1]], az: 0.5, pol: 1.25, rad: 92 },
    brooklyn: { t: [(P2.bkA[0] + P2.bkB[0]) / 2, 4, (P2.bkA[1] + P2.bkB[1]) / 2], az: -0.35, pol: 1.15, rad: 88 },
    flatiron: { t: [P2.flatiron[0], 4.5, P2.flatiron[1]], az: 2.75, pol: 1.02, rad: 30 },
    esb: { t: [P2.esb[0], 21, P2.esb[1]], az: -1.15, pol: 1.3, rad: 92 },
    times: { t: [P2.times[0], 4, P2.times[1] + 1.5], az: 0.25, pol: 0.72, rad: 62 },
    gct: { t: [P2.gct[0], 3.5, P2.gct[1] + 1], az: 0.2, pol: 1.0, rad: 50 },
    chrysler: { t: [P2.chrysler[0], 16, P2.chrysler[1]], az: 0.75, pol: 1.28, rad: 70 },
    rock: { t: [P2.rock[0] - 0.5, 12, P2.rock[1]], az: 0.95, pol: 0.88, rad: 62 },
    park: { t: [world.meta.footprints ? 106 : 106, 0, 118], az: -0.35, pol: 0.95, rad: 210 },
  };
  { // Central Park merkezi: park hücrelerinin ağırlık merkezi (Manhattan bileşeni, r<170)
    let sx = 0, sz = 0, n = 0; for (let r = 0; r < 170; r++) for (let c = 0; c < W; c++) if (world.park[r * W + c] >= 1 && world.park[r * W + c] <= 3 && world.isMan[r * W + c]) { sx += c; sz += r; n++; }
    if (n) focus.park.t = [sx / n, 0, sz / n];
  }
  const anchors = {
    liberty: G(P2.liberty, 14), wtc: G(P2.wtc, 54), brooklyn: G([(P2.bkA[0] + P2.bkB[0]) / 2, (P2.bkA[1] + P2.bkB[1]) / 2], 11), flatiron: G(P2.flatiron, 10),
    esb: G(P2.esb, 44), times: G(P2.times, 12), gct: G(P2.gct, 7), chrysler: G(P2.chrysler, 33), rock: G(P2.rock, 27), park: G(focus.park.t, 4),
  };
  const proxies = []; const mkProxy = (key, size, center, rotY = 0) => { const m = new THREE.Mesh(new THREE.BoxGeometry(...size), new THREE.MeshBasicMaterial({ visible: false })); m.position.set(...center); m.rotation.y = rotY; m.userData.key = key; scene.add(m); proxies.push(m); m.updateMatrixWorld(); };
  mkProxy('liberty', [7, 17, 7], [P2.liberty[0], 9, P2.liberty[1]]);
  mkProxy('wtc', [5, 56, 5], [P2.wtc[0], 28, P2.wtc[1]]); mkProxy('flatiron', [4, 12, 7], [P2.flatiron[0], 6, P2.flatiron[1]]);
  mkProxy('esb', [11, 46, 6], [P2.esb[0], 23, P2.esb[1]]); mkProxy('chrysler', [6, 34, 6], [P2.chrysler[0], 17, P2.chrysler[1]]);
  mkProxy('gct', [8, 8, 7], [P2.gct[0], 4, P2.gct[1]]); mkProxy('rock', [6, 28, 5], [P2.rock[0] - 0.5, 14, P2.rock[1]]); mkProxy('times', [14, 14, 14], [P2.times[0], 7, P2.times[1]]);
  { const a = lm.items.brooklyn.axis; mkProxy('brooklyn', [a.L, 11, 6], [(a.a[0] + a.b[0]) / 2, 5.5, (a.a[1] + a.b[1]) / 2], -a.ang); }
  { const pk = focus.park.t; mkProxy('park', [64, 4, 150], [pk[0], 2, pk[1]]); }
  const poseOf = (k, dur) => { const f = focus[k]; return { tx: f.t[0], ty: f.t[1], tz: f.t[2], az: f.az, pol: f.pol, rad: f.rad, dur, label: k }; };

  const audio = new CityAudio(); window.__audio = audio;
  let selected = null, hovered = null, cardTimer = 0, tourOn = true;
  const ui = new UI({
    landmarks: LANDMARKS,
    onFly: (k) => { select(k); },
    onOverview: () => { select(null); },
    onTime: (s) => lighting.setTime(s),
    onWeather: (w) => weather.set(w),
    onAudio: () => audio.toggle(),
    onTour: () => { tourOn = !tourOn; rig.tourOn = tourOn; if (!tourOn) rig.stopTour?.(); return tourOn; },
    onPhoto: () => {},
    onSnap: () => snap(),
  });
  function select(k) {
    selected = k; ui.setSelected(k); ui.setCard(null); clearTimeout(cardTimer);
    if (!k) rig.flyTo({ ...OVERVIEW }, 1.5); else { rig.flyTo(poseOf(k), 1.5); cardTimer = setTimeout(() => ui.setCard(k), 1250); }
  }
  rig.tourPoses = [
    { ...OVERVIEW, az: -0.5, pol: 1.05, rad: 860, dur: 10, label: 'overview' },
    poseOf('liberty', 9), poseOf('wtc', 8), poseOf('brooklyn', 8), poseOf('flatiron', 7), poseOf('esb', 8), poseOf('times', 8), poseOf('gct', 7), poseOf('chrysler', 8), poseOf('rock', 7), poseOf('park', 10),
    { ...OVERVIEW, az: 0.7, pol: 0.9, rad: 900, dur: 12, label: 'overview' },
  ];
  rig.onTourChange = (on) => ui.setTourVisible(on);
  rig.onTourStep = (p) => { const k = LANDMARKS.find((l) => l.key === p.label)?.key || null; selected = k; ui.setSelected(k); ui.setCard(k); };
  rig.onInput = () => {};
  // her türlü girdi turu durdurur / boşta sayacını sıfırlar
  ['pointerdown', 'wheel', 'touchstart'].forEach((ev) => window.addEventListener(ev, () => rig.input(), { capture: true, passive: true }));
  window.addEventListener('keydown', () => rig.touch(), { capture: true });
  let lastMove = [0, 0]; window.addEventListener('pointermove', (e) => { if (Math.abs(e.clientX - lastMove[0]) + Math.abs(e.clientY - lastMove[1]) > 4) { lastMove = [e.clientX, e.clientY]; rig.touch(); } }, { passive: true });

  // ---- fare ile üzerine gelme / tıklama seçimi ----
  const ray = new THREE.Raycaster(); const mouse = new THREE.Vector2(); let mdown = null;
  canvas.addEventListener('pointerdown', (e) => { mdown = [e.clientX, e.clientY]; });
  const pick = (e) => { mouse.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1); ray.setFromCamera(mouse, camera); const h = ray.intersectObjects(proxies, false)[0]; return h ? h.object.userData.key : null; };
  canvas.addEventListener('pointermove', (e) => { if (e.buttons) { hovered = null; return; } hovered = pick(e); canvas.style.cursor = hovered ? 'pointer' : ''; });
  canvas.addEventListener('pointerup', (e) => { if (mdown && Math.abs(e.clientX - mdown[0]) + Math.abs(e.clientY - mdown[1]) < 5) { const k = pick(e); if (k) select(k); } mdown = null; });
  canvas.addEventListener('pointerleave', () => { hovered = null; });

  function snap() {
    post.render(0, performance.now() / 1000);
    renderer.domElement.toBlob((b) => { const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'new-york-diorama.png'; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); ui.toast('PNG indirildi'); }, 'image/png');
  }

  // ---- ilk derleme ve sahne gösterimi ----
  const stats = () => ({
    quality: QUALITY, grid: [W, H], cityFaces: terrain.faces, cityQuads: terrain.quads, landmarkFaces: lm.faces, landmarkQuads: lm.quads,
    treeInstances: trees.count, treeFaces: trees.faces, carFaces: traffic.faces, snowFaces: weather.faces,
    staticVoxelFaces: terrain.faces + lm.faces, dynamicPropFaces: trees.faces + traffic.faces, totalVisibleFaces: terrain.faces + lm.faces + trees.faces + traffic.faces, drawCalls: renderer.info.render.calls, tris: renderer.info.render.triangles, fps: ui.fps, cars: traffic.cars.length,
    landmarkFacesBy: Object.fromEntries(Object.entries(lm.items).map(([k, v]) => [k, v.faces])), lamps: lamps.count,
  });
  const checksum = () => { let h = 2166136261 >>> 0; const p = terrain.mesh.geometry.attributes.position.array; for (let i = 0; i < p.length; i += 97) h = Math.imul(h ^ Math.round(p[i] * 8), 16777619) >>> 0; const q = lm.group.children.map((c) => c.geometry.attributes.position.count).join(','); for (const ch of q) h = Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0; return h.toString(16) + ':' + p.length + ':' + trees.count + ':' + traffic.cars.length; };
  window.__info = () => ({ ...stats(), checksum: checksum() });
  const jump = (k) => { selected = k; ui.setSelected(k); rig.tourOn = false; rig.stopTour(); const p = k ? poseOf(k) : { ...OVERVIEW }; Object.assign(rig.cur, k ? { tx: p.tx, ty: p.ty, tz: p.tz, az: p.az, pol: p.pol, rad: p.rad } : p); Object.assign(rig.goal, rig.cur); rig.flight = null; ui.setCard(k); };
  window.__dio = { bld, jump, scene, camera, rig, lighting, renderer, terrain, water, post, traffic, weather, ui, lm, THREE, focus, select, setTime: (s) => { lighting.setTime(s); ui.sl.value = s * 1000; ui.setThumb(); }, setWeather: (w) => { weather.set(w); document.querySelectorAll('#wx .btn').forEach((b) => b.classList.toggle('on', b.dataset.w === w)); }, world, lmPos, stats, trees };

  await step('Hazır', 1);
  renderer.compile(scene, camera);
  lighting.setTime(0.66);
  let last = performance.now(); let frames = 0;
  const v3 = new THREE.Vector3();
  function frame(now) {
    const dt = Math.min(0.1, (now - last) / 1000); last = now; const t = now / 1000; U.uTime.value = t;
    renderer.info.reset(); rig.update(dt); lighting.update(t, camera);
    water.mat.uniforms.uCam.value.copy(camera.position);
    lamps.mat.uniforms.uPx.value = renderer.domElement.height / 900;
    traffic.update(dt, t, camera);
    { const k = lighting.k; traffic.setSky(0, Math.max(0, 1 - Math.abs(lighting.s - 0.66) * 6) + Math.max(0, 1 - lighting.s * 5) * 0.6, Math.min(1, Math.max(0, (k.night - 0.4) / 0.6))); }
    weather.update(dt, t, v3.set(rig.cur.tx, rig.cur.ty, rig.cur.tz), rig.cur.rad);
    // tilt-shift: yakınlaşınca hafifler, uzakta güçlenir
    const rad = rig.cur.rad; const amt = 0.35 + 0.65 * Math.min(1, Math.max(0, (rad - 30) / 900));
    post.setTilt({ focus: 0.5, band: 0.13 + 0.05 * (1 - Math.min(1, rad / 500)), amount: amt });
    post.render(dt, t);
    ui.frame(dt * 1000);
    const cd = LANDMARKS.map((l) => camera.position.distanceTo(anchors[l.key]));
    ui.updateLabels(camera, LANDMARKS.map((l) => anchors[l.key]), cd, hovered);
    if ((frames++ & 31) === 0) { audio.setState({ night: lighting.k.night, snow: weather.target.snow, fog: weather.target.fog, zoom: 1 - Math.min(1, rig.cur.rad / 900) }); }
    window.__frames = frames; requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  window.addEventListener('resize', () => { renderer.setSize(innerWidth, innerHeight, false); post.setSize(renderer.domElement.width, renderer.domElement.height); camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); });
  const ld = document.getElementById('loader'); ld.style.opacity = 0; ld.style.pointerEvents = 'none'; setTimeout(() => { ld.style.display = 'none'; }, 900);
  window.__ready = true;
  console.log('[dio] hazır', JSON.stringify(stats()));
}
boot().catch((e) => { console.error(e); const s = document.getElementById('ld-step'); if (s) s.textContent = 'Hata: ' + e.message; });
