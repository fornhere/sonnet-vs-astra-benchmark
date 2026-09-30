import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { M } from './palette.js';
import { GROUND, K, WATER_Y, H } from './world.js';
import { Model, placeModel } from './hero.js';
import { voxUniforms } from './voxmat.js';
import { hash3, hash1 } from './util.js';
import { W, D } from './dims.js';

// ---------- TRAFİK ----------
export function createTraffic(world, scene) {
  const { kind } = world; const runs = [];
  const isRoad = (x, z) => x >= 0 && z >= 0 && x < W && z < D && kind[z * W + x] === K.ROAD;
  // N-S (z boyunca) şeritler
  for (let x = 1; x < W - 1; x++) { let z = 0; while (z < D) { if (isRoad(x, z)) { let z1 = z; while (z1 < D && isRoad(x, z1)) z1++; if (z1 - z >= 14) runs.push({ axis: 'z', fixed: x, a: z, b: z1, dir: hash3(x, 1, 1, 3) < 0.5 ? 1 : -1 }); z = z1; } else z++; } }
  for (let z = 1; z < D - 1; z++) { let x = 0; while (x < W) { if (isRoad(x, z)) { let x1 = x; while (x1 < W && isRoad(x1, z)) x1++; if (x1 - x >= 14) runs.push({ axis: 'x', fixed: z, a: x, b: x1, dir: hash3(z, 2, 2, 3) < 0.5 ? 1 : -1 }); x = x1; } else x++; } }
  const cars = [];
  for (const r of runs) { const len = r.b - r.a; const n = Math.round(len * 0.16); for (let i = 0; i < n; i++) { const h = hash3(r.fixed, i, r.a, 11); cars.push({ r, u: (i + hash3(i, r.a, 5, 2)) / n * len, sp: 1.1 + h * 1.3, c: h }); } }
  const N = Math.min(cars.length, 14000);
  const geo = new THREE.BoxGeometry(1, 1, 1);
  const mat = new THREE.MeshStandardMaterial({ roughness: 0.5, metalness: 0.2 });
  const glow = { value: 0 };
  mat.onBeforeCompile = (sh) => { sh.uniforms.uCarGlow = glow; sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nuniform float uCarGlow;').replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\ntotalEmissiveRadiance += vColor.rgb * uCarGlow;'); };
  const mesh = new THREE.InstancedMesh(geo, mat, N); mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage); mesh.castShadow = false; mesh.frustumCulled = false;
  const palette = [0xf5c518, 0xf5c518, 0xf5c518, 0xf5c518, 0xf2f2ee, 0x1c1e22, 0x8e939a, 0xc0392b, 0x2a5d9f, 0xb9bec6, 0x2f3a3d];
  const col = new THREE.Color(); for (let i = 0; i < N; i++) { col.setHex(palette[Math.floor(cars[i].c * 977) % palette.length]); mesh.setColorAt(i, col); }
  mesh.instanceColor.needsUpdate = true; scene.add(mesh);
  const arr = mesh.instanceMatrix.array; let last = 0;
  function update(t, night) {
    glow.value = night * 0.9; const dt = Math.min(0.05, t - last); last = t;
    for (let i = 0; i < N; i++) { const c = cars[i]; const r = c.r; const len = r.b - r.a; c.u += c.sp * dt * 0.75 * r.dir; if (c.u >= len) c.u -= len; else if (c.u < 0) c.u += len;
      const pos = r.a + c.u + 0.5; const lane = 0.5 + 0.17 * r.dir * (r.axis === 'z' ? 1 : -1);
      let x, z, sx, sz; if (r.axis === 'z') { x = r.fixed + lane; z = pos; sx = 0.24; sz = 0.5; } else { x = pos; z = r.fixed + lane; sx = 0.5; sz = 0.24; }
      const o = i * 16; arr[o] = sx; arr[o + 1] = 0; arr[o + 2] = 0; arr[o + 3] = 0; arr[o + 4] = 0; arr[o + 5] = 0.2; arr[o + 6] = 0; arr[o + 7] = 0; arr[o + 8] = 0; arr[o + 9] = 0; arr[o + 10] = sz; arr[o + 11] = 0; arr[o + 12] = x; arr[o + 13] = GROUND + 0.12; arr[o + 14] = z; arr[o + 15] = 1; }
    mesh.instanceMatrix.needsUpdate = true;
  }
  return { mesh, update, count: N };
}

// ---------- SU KULELERİ ----------
export function createWaterTanks(world, scene) {
  const { W: WW, D: DD, kind, hgt, bid, sty, H: HH } = world; const spots = []; const seen = new Set();
  for (let z = 0; z < DD; z++) for (let x = 0; x < WW; x++) { const c = z * WW + x; if (kind[c] !== K.BLD) continue; const h = hgt[c]; if (h < 3 || h > 18) continue; const b = bid[c]; if (seen.has(b)) continue;
    if (hash1(b, 21) > 0.55) continue; if (sty[c] === 1) continue; seen.add(b); spots.push([x + 0.5 + (hash3(x, 1, z, 2) - 0.5) * 0.3, GROUND + h, z + 0.5 + (hash3(x, 3, z, 4) - 0.5) * 0.3, hash3(x, 2, z, 8)]); }
  const cyl = new THREE.CylinderGeometry(0.2, 0.2, 0.42, 8); cyl.translate(0, 0.21 + 0.28, 0);
  const cone = new THREE.ConeGeometry(0.24, 0.16, 8); cone.translate(0, 0.42 + 0.28 + 0.08, 0);
  const legs = new THREE.CylinderGeometry(0.13, 0.15, 0.28, 6); legs.translate(0, 0.14, 0);
  const geo = mergeGeometries([cyl, cone, legs]);
  const mesh = new THREE.InstancedMesh(geo, new THREE.MeshStandardMaterial({ color: 0x9a6f45, roughness: 0.9 }), spots.length); mesh.castShadow = true; mesh.receiveShadow = true;
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), p = new THREE.Vector3(); const col = new THREE.Color();
  spots.forEach((sp, i) => { const k = 0.8 + sp[3] * 0.5; p.set(sp[0], sp[1], sp[2]); s.set(k, k, k); m4.compose(p, q, s); mesh.setMatrixAt(i, m4); col.setHex(sp[3] < 0.5 ? 0x9a6f45 : 0x7f5a3a); mesh.setColorAt(i, col); });
  scene.add(mesh); return mesh;
}

// ---------- TEKNELER ----------
function ferryModel(hullMat, cabinMat, big = 1) {
  const L = 26 * big, Wd = 7 * big, m = new Model(L + 2, 22, Wd + 2, 0.25);
  m.box(1, 0, 1, L + 1, 3, Wd + 1, hullMat); m.box(3, 0, 1, L - 1, 3, 1, hullMat);
  for (let x = 4; x < L - 2; x++) for (let z = 2; z < Wd; z++) m.set(x, 3, z, M.WHITEBOAT);
  m.box(6, 3, 2, L - 4, 8, Wd, M.WHITEBOAT); m.box(8, 8, 3, L - 8, 11, Wd - 1, cabinMat);
  m.box(L - 12, 11, 3, L - 8, 15, Wd - 2, M.WHITEBOAT); m.box(L - 15, 8, 3, L - 12, 15, Wd - 1, M.REDBOAT);
  return m;
}
function sailModel() { const m = new Model(14, 30, 6, 0.25); m.box(1, 0, 1, 13, 2, 5, M.WHITEBOAT); m.box(2, 2, 2, 12, 3, 4, M.WOOD); for (let y = 3; y < 28; y++) { const w = Math.max(0, Math.round(10 * (1 - (y - 3) / 25))); for (let x = 3; x < 3 + w; x++) m.set(x, y, 3, M.WHITE); m.set(3, y, 3, M.CABLE); } return m; }
function cargoModel() { const m = new Model(80, 28, 16, 0.25); m.box(2, 0, 2, 78, 5, 14, M.BLACKGLASS); m.box(2, 5, 3, 78, 6, 13, M.REDBOAT); m.box(62, 6, 3, 78, 16, 13, M.WHITEBOAT); m.box(70, 16, 5, 76, 22, 11, M.WHITEBOAT); const cc = [M.REDBOAT, M.STEELBLUE, M.TERRACOTTA, M.GRANITE, M.COPPER, M.TAXI]; for (let x = 6; x < 60; x += 6) for (let z = 3; z < 13; z += 3) { const hh = 3 + ((x * 3 + z * 5) % 3); for (let y = 6; y < 6 + hh * 2; y++) for (let dx = 0; dx < 5; dx++) for (let dz = 0; dz < 2; dz++) m.set(x + dx, y, z + dz, cc[(x + z * 7 + Math.floor(y / 2)) % cc.length]); } return m; }
function tugModel() { const m = new Model(18, 14, 8, 0.25); m.box(1, 0, 1, 17, 3, 7, M.REDBOAT); m.box(4, 3, 2, 12, 7, 6, M.WHITEBOAT); m.box(6, 7, 3, 10, 10, 5, M.WHITEBOAT); m.box(8, 10, 3, 10, 13, 5, M.BLACKGLASS); return m; }

export function createBoats(world, scene, mats, pts) {
  const boats = []; const { kind, W: WW } = world; const isW = (x, z) => { const k = kind[Math.floor(z) * WW + Math.floor(x)]; return k === K.WATER; };
  // orta hat çıkar (Hudson / Doğu Nehri)
  const centerline = (x0, x1, z) => { let best = null; let x = x0; while (x < x1) { if (isW(x, z)) { let e = x; while (e < x1 && isW(e, z)) e++; if (!best || e - x > best[1] - best[0]) best = [x, e]; x = e; } else x++; } return best ? (best[0] + best[1]) / 2 : null; };
  const line = (x0, x1, za, zb, step = 12) => { const out = []; for (let z = za; z <= zb; z += step) { const c = centerline(x0, x1, z); if (c !== null) out.push([c, z]); } return out; };
  const hud = line(20, 230, 300, 880); const east = line(250, 400, 420, 700);
  const harbor = (() => { const P = (k) => [pts[k][0], D - pts[k][1]]; const b = P('battery'), l = P('liberty'), e = P('ellis'), g = P('governors'); const near = (p, tx, tz) => { for (let r = 0; r < 14; r++) for (let a = 0; a < 16; a++) { const x = p[0] + Math.cos(a / 16 * 6.283) * r, z = p[1] + Math.sin(a / 16 * 6.283) * r; if (isW(x, z) && isW(x + 1, z) && isW(x, z + 1) && isW(x - 1, z) && isW(x, z - 1)) return [x, z]; } return p; };
    return { liberty: [near([b[0] - 6, b[1] + 8]), near([l[0] + 9, l[1] - 4]), near([e[0] + 6, e[1] + 6]), near([b[0] - 6, b[1] + 8])], gov: [near([b[0] + 3, b[1] + 6]), near([g[0] - 2, g[1] - 9])], g: P('governors') }; })();
  const mk = (model, path, speed, opts = {}) => { const mesh = model.mesh(mats); if (!mesh) return; mesh.matrixAutoUpdate = false; mesh.castShadow = true; scene.add(mesh);
    const wake = new THREE.Mesh(wakeGeo(), wakeMat); wake.renderOrder = 4; scene.add(wake); wake.scale.set(opts.wake || 1, 1, opts.wake || 1);
    boats.push({ model, mesh, wake, path, speed, s: opts.s0 || 0, loop: opts.loop, off: opts.off || 0 }); };
  const wakeGeo = () => { const g = new THREE.BufferGeometry(); const v = new Float32Array([0, 0, -0.6, -9, 0, -2.4, -9, 0, 2.4, 0, 0, 0.6, 0, 0, -0.6, -9, 0, 2.4]); g.setAttribute('position', new THREE.BufferAttribute(v, 3)); g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array([0, 0.5, 1, 0, 1, 1, 0, 0.5, 0, 0.5, 1, 1]), 2)); g.setIndex([0, 1, 2, 0, 2, 3]); return g; };
  const wakeMat = new THREE.ShaderMaterial({ transparent: true, depthWrite: false, uniforms: { uNight: voxUniforms.uNight }, vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: 'varying vec2 vUv; uniform float uNight; void main(){ float a = (1.0 - vUv.x) * smoothstep(0.0, 0.25, vUv.x) * (1.0 - abs(vUv.y - 0.5) * 1.4); a = clamp(a,0.0,1.0); gl_FragColor = vec4(vec3(0.95,0.98,1.0) * mix(1.0, 0.35, uNight), a * 0.45); }' });
  // hatlar
  const cum = (p) => { let s = 0; const c = [0]; for (let i = 1; i < p.length; i++) { s += Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]); c.push(s); } return c; };
  const paths = [];
  if (hud.length > 4) { paths.push(hud); }
  const ferryA = ferryModel(M.ORANGE_FERRY, M.BLACKGLASS), ferryB = ferryModel(M.STEELBLUE, M.BLACKGLASS), ferryC = ferryModel(M.REDBOAT, M.BLACKGLASS);
  if (hud.length > 4) { const off = (p, o) => p.map(q => [q[0] + o, q[1]]);
    mk(ferryB, off(hud, -6), 1.5, { s0: 30, wake: 1 }); mk(ferryA, off(hud, 8), 1.3, { s0: 200, wake: 1 }); mk(tugModel(), off(hud, 14), 0.9, { s0: 400, wake: 0.7 }); mk(ferryC, off(hud, -14), 1.7, { s0: 120, wake: 1 });
    mk(cargoModel(), off(hud.slice(0, Math.floor(hud.length * 0.5)), 0), 0.7, { s0: 40, wake: 1.4 }); }
  if (east.length > 3) { mk(ferryB, east, 1.4, { s0: 10 }); mk(tugModel(), east.map(q => [q[0] + 4, q[1]]), 1.0, { s0: 100, wake: 0.7 }); }
  mk(ferryA, harbor.liberty, 1.6, { loop: true }); mk(ferryC, harbor.gov, 1.2, {});
  for (let i = 0; i < 6; i++) { const cx = harbor.g[0] + 10 + i * 5, cz = harbor.g[1] + 26 + (i % 3) * 12; const pth = []; for (let a = 0; a < 12; a++) { const t = a / 12 * 6.283; pth.push([cx + Math.cos(t) * (6 + i), cz + Math.sin(t) * (5 + i)]); } pth.push(pth[0]); if (pth.every(p => isW(p[0], p[1]))) mk(sailModel(), pth, 0.6 + i * 0.05, { loop: true, s0: i * 10, wake: 0.35 }); }
  const tmp = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3(), pos = new THREE.Vector3(), ax = new THREE.Vector3(0, 1, 0);
  let last = 0;
  function update(t) { const dt = Math.min(0.05, t - last); last = t;
    for (const b of boats) { if (!b.cum) { b.cum = cum(b.path); b.total = b.cum[b.cum.length - 1]; b.dir = 1; }
      b.s += b.speed * dt * b.dir; if (b.loop) { b.s = (b.s + b.total) % b.total; } else { if (b.s > b.total) { b.s = b.total; b.dir = -1; } if (b.s < 0) { b.s = 0; b.dir = 1; } }
      let i = 1; while (i < b.cum.length - 1 && b.cum[i] < b.s) i++; const f = (b.s - b.cum[i - 1]) / Math.max(1e-6, b.cum[i] - b.cum[i - 1]); const p0 = b.path[i - 1], p1 = b.path[i];
      const x = p0[0] + (p1[0] - p0[0]) * f, z = p0[1] + (p1[1] - p0[1]) * f; let ang = Math.atan2(-(p1[1] - p0[1]), p1[0] - p0[0]); if (b.dir < 0 && !b.loop) ang += Math.PI;
      // gövde merkezi düzeltmesi
      const m = b.model; const cx = m.W / 2 * m.scale, cz = m.D / 2 * m.scale; q.setFromAxisAngle(ax, ang); pos.set(x, WATER_Y - 0.35 + Math.sin(t * 1.3 + b.total) * 0.03, z);
      const off = new THREE.Vector3(-cx, 0, -cz).applyQuaternion(q); b.mesh.position.copy(pos).add(off); b.mesh.quaternion.copy(q); b.mesh.updateMatrix();
      b.wake.position.set(x, WATER_Y + 0.03, z); b.wake.rotation.y = ang; b.wake.updateMatrix(); }
  }
  return { boats, update };
}

// ---------- BULUTLAR ----------
export function createClouds(scene) {
  const grp = new THREE.Group(); const clouds = [];
  const box = new THREE.BoxGeometry(1, 1, 1);
  for (let c = 0; c < 7; c++) { const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, emissive: 0x20222a, depthWrite: true });
    const n = 10 + Math.floor(hash1(c, 5) * 8); const mesh = new THREE.InstancedMesh(box, mat, n); const m4 = new THREE.Matrix4();
    for (let i = 0; i < n; i++) { const a = hash3(c, i, 1, 2), b = hash3(c, i, 2, 3), d = hash3(c, i, 3, 4); const gx = Math.round((a - 0.5) * 6), gz = Math.round((d - 0.5) * 3); const lift = 1 - (Math.abs(gx) / 4 + Math.abs(gz) / 3) * 0.6; const sy = 4 + b * 4 * Math.max(0.3, lift);
      m4.compose(new THREE.Vector3(gx * 6.5, sy / 2, gz * 6.5), new THREE.Quaternion(), new THREE.Vector3(7 + a * 6, sy, 7 + d * 6)); mesh.setMatrixAt(i, m4); }
    mesh.castShadow = true; mesh.frustumCulled = false; mesh.position.set(hash1(c, 1) * (W + 600) - 300, 140 + hash1(c, 2) * 40, hash1(c, 3) * (D + 200) - 100);
    grp.add(mesh); clouds.push({ mesh, mat, sp: 2.0 + hash1(c, 4) * 2.2 }); }
  scene.add(grp);
  function update(dt, cam, dayK, tint, farK = 0) { for (const c of clouds) { c.mesh.position.x += c.sp * dt; if (c.mesh.position.x > W + 340) c.mesh.position.x = -340;
      const d = c.mesh.position.distanceTo(cam.position); const k = Math.min(1, Math.max(0, (d - 90) / 200)) * (1 - farK);
      c.mat.color.copy(tint); c.mat.emissive.copy(tint).multiplyScalar(0.12);
      if (k > 0.03) { c.mesh.scale.setScalar(0.001 + k); c.mat.colorWrite = true; } else { c.mesh.scale.setScalar(1); c.mat.colorWrite = false; } } }
  return { grp, update, clouds };
}

// ---------- HELİKOPTER ----------
export function createHelicopter(scene, mats, center) {
  const m = new Model(22, 14, 8, 0.25); m.box(4, 3, 2, 14, 8, 6, M.REDBOAT); m.box(12, 4, 2, 15, 8, 6, M.BLACKGLASS); m.box(14, 5, 3, 21, 7, 5, M.REDBOAT); m.box(20, 5, 3, 22, 10, 5, M.REDBOAT); m.box(6, 1, 1, 13, 2, 2, M.WHITEBOAT); m.box(6, 1, 6, 13, 2, 7, M.WHITEBOAT); m.box(8, 8, 3, 10, 10, 5, M.WHITEBOAT);
  const mesh = m.mesh(mats); mesh.matrixAutoUpdate = true; scene.add(mesh);
  const rotor = new THREE.Mesh(new THREE.BoxGeometry(9, 0.05, 0.25), new THREE.MeshStandardMaterial({ color: 0x222222 })); rotor.position.set(9 * 0.25 + 0.25, 10.2 * 0.25, 4 * 0.25); mesh.add(rotor);
  const rotor2 = rotor.clone(); rotor2.rotation.y = Math.PI / 2; rotor.add(rotor2);
  const light = new THREE.Mesh(new THREE.SphereGeometry(0.14, 6, 6), new THREE.MeshBasicMaterial({ color: 0xff2020 })); light.position.set(11.5 * 0.25 - 4, 3.5 * 0.25, 4 * 0.25); mesh.add(light);
  function update(t) { const R = 70, a = t * 0.14; const x = center[0] + Math.cos(a) * R * 1.3, z = center[1] + Math.sin(a) * R; mesh.position.set(x, 56 + Math.sin(t * 0.5) * 3, z); mesh.rotation.y = -a + Math.PI; mesh.rotation.z = 0.12; rotor.rotation.y = t * 40; light.visible = (t % 1) < 0.3; }
  return { mesh, update };
}

// ---------- KAR ----------
export function createSnow(scene) {
  const N = 14000; const g = new THREE.BufferGeometry(); const pos = new Float32Array(N * 3); const seed = new Float32Array(N);
  for (let i = 0; i < N; i++) { pos[i * 3] = (hash3(i, 1, 1, 1) - 0.5) * 2; pos[i * 3 + 1] = hash3(i, 2, 1, 1); pos[i * 3 + 2] = (hash3(i, 3, 1, 1) - 0.5) * 2; seed[i] = hash3(i, 4, 1, 1); }
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
  const u = { uTime: voxUniforms.uTime, uCenter: { value: new THREE.Vector3() }, uSpan: { value: 260 }, uAmt: { value: 0 }, uPx: { value: 1 }, uNight: voxUniforms.uNight };
  const m = new THREE.ShaderMaterial({ transparent: true, depthWrite: false, uniforms: u,
    vertexShader: `attribute float aSeed; uniform float uTime; uniform vec3 uCenter; uniform float uSpan; uniform float uAmt; uniform float uPx; varying float vA;
      void main(){ vec3 p = position; float sp = 6.0 + aSeed * 7.0; float y = fract(p.y - uTime * sp / (uSpan * 0.9)); 
        vec3 w = vec3(p.x * uSpan + sin(uTime * 0.7 + aSeed * 40.0) * 3.0 + uTime * 2.5, y * uSpan * 0.9, p.z * uSpan + cos(uTime * 0.6 + aSeed * 30.0) * 3.0);
        w.x = mod(w.x + uSpan, 2.0 * uSpan) - uSpan; w += vec3(uCenter.x, 0.0, uCenter.z);
        vec4 mv = viewMatrix * vec4(w, 1.0); gl_Position = projectionMatrix * mv; float d = -mv.z;
        gl_PointSize = clamp((1.6 + aSeed * 2.2) * uPx * 260.0 / max(d, 8.0), 1.0, 9.0 * uPx); vA = uAmt * smoothstep(3.0, 30.0, d) * (1.0 - smoothstep(uSpan * 0.9, uSpan * 1.3, d)); }`,
    fragmentShader: `varying float vA; uniform float uNight; void main(){ vec2 c = gl_PointCoord - 0.5; float r = length(c); float a = smoothstep(0.5, 0.05, r) * vA * 0.9; gl_FragColor = vec4(mix(vec3(1.0), vec3(0.75,0.82,1.0), uNight), a); }` });
  const pts = new THREE.Points(g, m); pts.frustumCulled = false; pts.renderOrder = 8; pts.visible = false; scene.add(pts);
  return { pts, u };
}
