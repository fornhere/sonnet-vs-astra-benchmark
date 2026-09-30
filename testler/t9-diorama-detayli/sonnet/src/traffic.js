// Canlılık: ızgarada taksiler/araçlar, Staten Island feribotu, Hudson/East River tekneleri, kuş sürüleri, voxel bulutlar
import * as THREE from 'three';
import { Palette, VoxelGrid, meshGrid, meshBoxes, KIND } from './voxel.js';
import { W, H, llToCell } from './geo.js';
import { GROUND } from './world.js';
import { hash2, mulberry32, SEED } from './rng.js';

const TAU = Math.PI * 2;
const DIRS = [[1, 0], [0, 1], [-1, 0], [0, -1]];

function palette() {
  const P = new Palette();
  ['white:0xffffff', 'dark:0x2a2d33', 'glass:0x1d2733', 'ferryO:0xf08a1c', 'hullDk:0x2a3442', 'cab:0xf2f2ee', 'red:0xc8382e', 'sail:0xf5f3ec', 'wood:0x8b6a45', 'blue:0x2e5f9a', 'black:0x1b1c20', 'green:0x2f7a4a', 'lampW:0xfff2c8', 'cloud:0xffffff', 'yellow:0xf4c20d', 'stack:0xc93a2a'].forEach((s) => { const [n, c] = s.split(':'); P.add(n, parseInt(c), n === 'lampW' ? { kind: KIND.LAMP } : {}); });
  return P;
}
const mk = (P, dims, fill, size, origin) => { const g = new VoxelGrid(...dims); fill(g, (n) => P.id(n)); return meshGrid(g, P, { size, origin, skipBottom: true }); };

export class Traffic {
  constructor(world, material, quality, topY) {
    this.world = world; this.material = material; this.quality = quality; this.group = new THREE.Group(); this.group.name = 'live';
    this.P = palette(); this.faces = 0; this.rng = mulberry32(SEED ^ 0x1234);
    this.buildCars(); this.buildFerry(); this.buildBoats(); this.buildBirds(); this.buildClouds();
  }
  // ---------- araçlar ----------
  buildCars() {
    const { road } = this.world; const P = this.P;
    const car = meshBoxes([{ p: [0, 0, 0], s: [0.4, 0.1, 0.2], pal: P.id('white'), cell: 0.1 }, { p: [-0.03, 0.1, 0], s: [0.22, 0.09, 0.17], pal: P.id('glass'), cell: 0.1 }], P);
    this.faces += 0; this.carFaces = car.faces;
    const nCars = this.quality === 'low' ? 450 : 950;
    this.cars = []; const cells = []; for (let i = 0; i < W * H; i++) if (road[i] && road[i] < 3) cells.push(i);
    const cellsHw = []; for (let i = 0; i < W * H; i++) if (road[i] === 3) cellsHw.push(i);
    for (let n = 0; n < nCars; n++) {
      const hw = n % 9 === 0 && cellsHw.length; const arr = hw ? cellsHw : cells; const i = arr[Math.floor(this.rng() * arr.length)];
      const c = i % W, r = (i / W) | 0; const opts = []; for (let d = 0; d < 4; d++) { const nx = c + DIRS[d][0], nz = r + DIRS[d][1]; if (nx >= 0 && nz >= 0 && nx < W && nz < H && road[nz * W + nx]) opts.push(d); }
      if (!opts.length) { n--; continue; }
      const taxi = !hw && this.rng() < 0.55;
      this.cars.push({ c, r, d: opts[Math.floor(this.rng() * opts.length)], s: this.rng(), v: (hw ? 1.6 : 0.65) + this.rng() * 0.7, lane: 0.16 + this.rng() * 0.05, taxi, hw });
    }
    const mesh = new THREE.InstancedMesh(car.geometry, this.material, this.cars.length); mesh.frustumCulled = false; mesh.castShadow = true; mesh.receiveShadow = false; mesh.name = 'cars';
    const paints = ['#c8382e', '#2e5f9a', '#e8e8e4', '#2a2d33', '#7d8791', '#3f7f5a', '#b98a3d', '#5d4a8a'];
    const col = new THREE.Color();
    this.cars.forEach((cr, i) => { col.set(cr.taxi ? '#f4b800' : paints[Math.floor(this.rng() * paints.length)]); mesh.setColorAt(i, col); });
    this.carMesh = mesh; this._sc = new THREE.Vector3(1.25, 1.25, 1.25); this.group.add(mesh); this._m = new THREE.Matrix4(); this._q = new THREE.Quaternion(); this._v = new THREE.Vector3(); this._s = new THREE.Vector3(1, 1, 1);
    this.faces += car.faces * this.cars.length;
  }
  stepCars(dt) {
    const { road } = this.world; const m = this._m, q = this._q, v = this._v, s1 = this._s; const up = new THREE.Vector3(0, 1, 0);
    for (let i = 0; i < this.cars.length; i++) {
      const cr = this.cars[i]; cr.s += cr.v * dt;
      while (cr.s >= 1) {
        cr.s -= 1; cr.c += DIRS[cr.d][0]; cr.r += DIRS[cr.d][1];
        // sonraki yön: düz git (ağırlık 7), sağ/sol (1), U dönüşü yalnızca çıkmazda
        const cand = [], wts = [];
        for (const dd of [0, 1, 3, 2]) { const d = (cr.d + dd) % 4; const nx = cr.c + DIRS[d][0], nz = cr.r + DIRS[d][1]; if (nx < 0 || nz < 0 || nx >= W || nz >= H || !road[nz * W + nx]) continue; if (dd === 2) continue; cand.push(d); wts.push(dd === 0 ? 7 : 1.3); }
        if (!cand.length) { cr.d = (cr.d + 2) % 4; continue; }
        let t = this.rng() * wts.reduce((a, b) => a + b, 0), k = 0; while (k < wts.length - 1 && t > wts[k]) { t -= wts[k]; k++; } cr.d = cand[k];
      }
      const [dx, dz] = DIRS[cr.d]; const x = cr.c + 0.5 + dx * cr.s + (-dz) * cr.lane, z = cr.r + 0.5 + dz * cr.s + dx * cr.lane;
      q.setFromAxisAngle(up, Math.atan2(-dz, dx)); v.set(x, GROUND + 0.02, z); m.compose(v, q, this._sc); this.carMesh.setMatrixAt(i, m);
    }
    this.carMesh.instanceMatrix.needsUpdate = true;
  }
  // ---------- yol izleyiciler (su üzerindeki tekneler) ----------
  snap(x, z) { // en yakın derin su hücresi
    const { land, wdist } = this.world; let best = null;
    for (let r = 0; r < 60 && !best; r++) for (let dz = -r; dz <= r && !best; dz++) for (let dx = -r; dx <= r; dx++) { if (Math.max(Math.abs(dx), Math.abs(dz)) !== r) continue; const X = Math.round(x + dx), Z = Math.round(z + dz); if (X < 2 || Z < 2 || X >= W - 2 || Z >= H - 2) continue; if (!land[Z * W + X] && wdist[Z * W + X] >= 4) { best = [X + 0.5, Z + 0.5]; break; } }
    return best || [x, z];
  }
  makePath(lls) { const pts = lls.map(([la, lo]) => { const [x, z] = llToCell(la, lo); return this.snap(x, z); }); let L = 0; const cum = [0]; for (let i = 1; i < pts.length; i++) { L += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); cum.push(L); } return { pts, cum, L }; }
  at(path, s) { const { pts, cum } = path; let i = 1; while (i < pts.length - 1 && cum[i] < s) i++; const t = (s - cum[i - 1]) / Math.max(1e-6, cum[i] - cum[i - 1]); const a = pts[i - 1], b = pts[i]; return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, Math.atan2(-(b[1] - a[1]), b[0] - a[0])]; }
  buildFerry() {
    const P = this.P;
    const ferry = mk(P, [17, 6, 5], (g, id) => {
      g.box(1, 0, 0, 16, 1, 5, id('hullDk')); g.box(0, 1, 1, 17, 2, 4, id('ferryO')); g.box(2, 2, 0, 15, 3, 5, id('ferryO'));
      g.box(3, 3, 1, 14, 4, 4, id('cab')); g.box(6, 4, 1, 11, 5, 4, id('cab')); g.box(7, 5, 2, 10, 6, 3, id('dark'));
      g.box(0, 2, 2, 2, 3, 3, id('ferryO')); g.box(15, 2, 2, 17, 3, 3, id('ferryO')); g.box(3, 3, 1, 14, 4, 2, id('glass')); g.box(3, 3, 3, 14, 4, 4, id('glass'));
      g.box(5, 5, 2, 6, 6, 3, id('yellow')); g.box(11, 5, 2, 12, 6, 3, id('yellow'));
    }, 0.16, [-1.36, 0, -0.4]);
    const mesh = new THREE.Mesh(ferry.geometry, this.material); mesh.castShadow = true; mesh.name = 'ferry'; mesh.scale.setScalar(1.45); mesh.add(this.wakeMesh(3.2, 1.2)); this.group.add(mesh); this.ferry = { mesh, faces: ferry.faces };
    this.faces += ferry.faces;
    // Whitehall → güneye (Staten Island yönü); harita dışına taşan rota diorama kenarında geri döner (çift uçlu feribot)
    const A = llToCell(40.7013, -74.0128), B = llToCell(40.6437, -74.0735); const dx = B[0] - A[0], dz = B[1] - A[1]; const len = Math.hypot(dx, dz);
    // hedef: haritanın güney kenarından 12 hücre içeride
    const tEnd = Math.min(1, (H - 14 - A[1]) / dz); const path = { pts: [this.snap(A[0] + 2, A[1] + 6), this.snap(A[0] + dx * tEnd * 0.5, A[1] + dz * tEnd * 0.5), this.snap(A[0] + dx * tEnd * 0.95, A[1] + dz * tEnd * 0.95 - 0)], cum: [0] };
    for (let i = 1; i < path.pts.length; i++) path.cum.push(path.cum[i - 1] + Math.hypot(path.pts[i][0] - path.pts[i - 1][0], path.pts[i][1] - path.pts[i - 1][1])); path.L = path.cum.at(-1);
    this.ferryPath = path; this.ferryS = 0; this.ferryDir = 1; this.ferryHold = 0; this.ferryFlip = 0; this.ferryYaw = 0;
  }
  wakeMesh(len, w) {
    if (!this._wakeTex) { const c = document.createElement('canvas'); c.width = 256; c.height = 64; const g = c.getContext('2d'); const gr = g.createLinearGradient(256, 0, 0, 0); gr.addColorStop(0, 'rgba(255,255,255,0.85)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.beginPath(); g.moveTo(256, 32); g.lineTo(0, 0); g.lineTo(0, 64); g.closePath(); g.fill(); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; this._wakeTex = t; }
    const m = new THREE.Mesh(new THREE.PlaneGeometry(len, w), new THREE.MeshBasicMaterial({ map: this._wakeTex, transparent: true, depthWrite: false, opacity: 0.8, fog: true }));
    m.rotation.x = -Math.PI / 2; m.position.set(-len / 2 - 0.1, 0.05, 0); m.userData.noAO = true; m.renderOrder = 1; return m;
  }
  buildBoats() {
    const P = this.P; this.boats = [];
    const sail = mk(P, [7, 9, 3], (g, id) => { g.box(0, 0, 1, 7, 1, 2, id('white')); g.box(2, 1, 1, 3, 9, 2, id('wood')); for (let y = 1; y < 8; y++) g.box(3, y, 1, 3 + Math.max(1, 5 - Math.floor(y * 0.55)), y + 1, 2, id('sail')); g.box(0, 1, 1, 2, 2, 2, id('sail')); }, 0.12, [-0.42, 0, -0.18]);
    const tug = mk(P, [9, 5, 4], (g, id) => { g.box(0, 0, 0, 9, 1, 4, id('hullDk')); g.box(0, 1, 0, 9, 2, 4, id('red')); g.box(2, 2, 0, 7, 3, 4, id('cab')); g.box(3, 3, 1, 6, 4, 3, id('cab')); g.box(4, 4, 1, 5, 5, 2, id('stack')); g.box(3, 2, 0, 6, 3, 1, id('glass')); }, 0.13, [-0.58, 0, -0.26]);
    const barge = mk(P, [14, 3, 5], (g, id) => { g.box(0, 0, 0, 14, 1, 5, id('dark')); g.box(1, 1, 1, 13, 2, 4, id('wood')); g.box(2, 2, 1, 6, 3, 4, id('blue')); g.box(7, 2, 1, 12, 3, 4, id('green')); }, 0.15, [-1.05, 0, -0.37]);
    const cruise = mk(P, [12, 4, 4], (g, id) => { g.box(0, 0, 0, 12, 1, 4, id('white')); g.box(1, 1, 0, 11, 2, 4, id('cab')); g.box(2, 2, 0, 10, 3, 4, id('glass')); g.box(3, 3, 0, 9, 4, 4, id('white')); }, 0.13, [-0.78, 0, -0.26]);
    const defs = [
      ['sail', sail, [[40.690, -74.030], [40.700, -74.035], [40.715, -74.028], [40.735, -74.020]], 0.55], ['sail', sail, [[40.683, -74.015], [40.689, -74.006], [40.698, -74.001]], 0.5],
      ['tug', tug, [[40.672, -74.045], [40.700, -74.028], [40.735, -74.021], [40.770, -74.008]], 0.7], ['barge', barge, [[40.766, -74.004], [40.745, -74.014], [40.72, -74.02], [40.70, -74.027]], 0.35],
      ['cruise', cruise, [[40.7055, -74.012], [40.735, -74.017], [40.7615, -74.005], [40.7025, -74.015]], 0.6], ['tug', tug, [[40.7075, -73.9745], [40.7195, -73.967], [40.7365, -73.9615], [40.75, -73.9585]], 0.6],
      ['cruise', cruise, [[40.7025, -73.995], [40.712, -73.9835], [40.7215, -73.9725], [40.7335, -73.9645]], 0.55], ['sail', sail, [[40.6935, -74.005], [40.688, -74.0075], [40.694, -74.011]], 0.4],
      ['barge', barge, [[40.7505, -73.955], [40.765, -73.945], [40.78, -73.935]], 0.3],
    ];
    for (const [type, geo, lls, sp] of defs) {
      const mesh = new THREE.Mesh(geo.geometry, this.material); mesh.castShadow = true; mesh.name = 'boat-' + type; mesh.scale.setScalar(1.5); mesh.add(this.wakeMesh(type === 'barge' ? 1.6 : 1.4, type === 'sail' ? 0.34 : 0.55)); this.group.add(mesh); this.faces += geo.faces;
      const path = this.makePath(lls); if (path.L < 3) { mesh.visible = false; continue; }
      this.boats.push({ mesh, path, s: this.rng() * path.L, dir: this.rng() < 0.5 ? 1 : -1, sp, yaw: 0, hold: 0, bob: this.rng() * 6 });
    }
  }
  stepBoats(dt, t) {
    for (const b of this.boats) {
      if (b.hold > 0) { b.hold -= dt; b.turn = Math.min(1, (b.turn || 0) + dt / 2.2); } else { b.s += b.dir * b.sp * dt; b.turn = 0; if (b.s <= 0 || b.s >= b.path.L) { b.s = Math.max(0, Math.min(b.path.L, b.s)); b.dir *= -1; b.hold = 2.2; b.turn = 0; b.flipFrom = b.yaw; } }
      const [x, z, yaw] = this.at(b.path, b.s); const target = b.dir > 0 ? yaw : yaw + Math.PI;
      let dy = target - b.yaw; dy = Math.atan2(Math.sin(dy), Math.cos(dy)); b.yaw += dy * Math.min(1, dt * 2.5);
      b.mesh.position.set(x, -0.02 + Math.sin(t * 1.3 + b.bob) * 0.02, z); b.mesh.rotation.set(Math.sin(t * 0.9 + b.bob) * 0.02, b.yaw, Math.sin(t * 1.1 + b.bob) * 0.015);
    }
    // feribot: çift uçlu; uçlarda bekleyip ters yöne devam
    const f = this.ferry, p = this.ferryPath;
    if (this.ferryHold > 0) this.ferryHold -= dt; else { this.ferryS += this.ferryDir * 1.35 * dt; if (this.ferryS >= p.L || this.ferryS <= 0) { this.ferryS = Math.max(0, Math.min(p.L, this.ferryS)); this.ferryDir *= -1; this.ferryHold = 5; } }
    const [x, z, yaw] = this.at(p, this.ferryS); this.ferryYaw += (yaw - this.ferryYaw) * Math.min(1, dt * 3);
    f.mesh.position.set(x, -0.02 + Math.sin(t * 1.1) * 0.015, z); f.mesh.rotation.set(0, this.ferryYaw, Math.sin(t * 0.8) * 0.01);
  }
  // ---------- kuşlar ----------
  buildBirds() {
    const P = this.P; const wing = mk(P, [3, 1, 1], (g, id) => g.box(0, 0, 0, 3, 1, 1, id('dark')), 0.055, [0, 0, -0.028]);
    const nFlock = this.quality === 'low' ? 4 : 7, per = this.quality === 'low' ? 8 : 12; this.flocks = [];
    this.birdMesh = new THREE.InstancedMesh(wing.geometry, this.material, nFlock * per * 2); this.birdMesh.frustumCulled = false; this.birdMesh.castShadow = false; this.birdMesh.name = 'birds';
    const rng = mulberry32(SEED + 555);
    for (let f = 0; f < nFlock; f++) this.flocks.push({ ax: 30 + rng() * (W - 60), az: 40 + rng() * (H - 80), rx: 15 + rng() * 60, rz: 40 + rng() * 140, sp: (0.05 + rng() * 0.05) * (rng() < 0.5 ? 1 : -1), ph: rng() * TAU, y: 34 + rng() * 30, birds: Array.from({ length: per }, () => ({ ox: (rng() - 0.5) * 7, oy: (rng() - 0.5) * 3, oz: (rng() - 0.5) * 7, ph: rng() * TAU, fs: 5 + rng() * 3 })) });
    this.faces += wing.faces * nFlock * per * 2; this.group.add(this.birdMesh);
    this._bm = new THREE.Matrix4(); this._bq = new THREE.Quaternion(); this._be = new THREE.Euler(); this._bv = new THREE.Vector3();
  }
  stepBirds(t) {
    let k = 0; const m = this._bm, q = this._bq, v = this._bv, sc = this._s; const qy = new THREE.Quaternion(), qz = new THREE.Quaternion(); const ay = new THREE.Vector3(0, 1, 0), az = new THREE.Vector3(0, 0, 1);
    for (const f of this.flocks) {
      const a = f.ph + t * f.sp; const cx = f.ax + Math.sin(a) * f.rx, cz = f.az + Math.cos(a * 0.7) * f.rz;
      const dx = Math.cos(a) * f.rx * f.sp, dz = -Math.sin(a * 0.7) * 0.7 * f.rz * f.sp; const yaw = Math.atan2(-dz, dx);
      const c = Math.cos(yaw), s = Math.sin(yaw);
      for (const b of f.birds) {
        const flap = Math.sin(t * b.fs + b.ph) * 0.65; const y = f.y + b.oy + Math.sin(t * 0.4 + b.ph) * 0.8;
        const px = cx + b.ox * c - b.oz * s, pz = cz + b.ox * s + b.oz * c;
        for (const side of [1, -1]) {
          qy.setFromAxisAngle(ay, yaw + Math.PI / 2 + (side === 1 ? 0 : Math.PI)); qz.setFromAxisAngle(az, flap); q.copy(qy).multiply(qz);
          v.set(px, y + Math.abs(flap) * 0.05, pz); m.compose(v, q, sc); this.birdMesh.setMatrixAt(k++, m);
        }
      }
    }
    this.birdMesh.instanceMatrix.needsUpdate = true;
  }
  // ---------- bulutlar ----------
  buildClouds() {
    const P = this.P; const rng = mulberry32(SEED + 9001); const shapes = [];
    for (let v = 0; v < 4; v++) { const g = new VoxelGrid(12, 4, 7); const n = 8 + Math.floor(rng() * 8); for (let i = 0; i < n; i++) { const x = 1 + Math.floor(rng() * 8), z = 1 + Math.floor(rng() * 4), w = 2 + Math.floor(rng() * 3), d = 2 + Math.floor(rng() * 2), y = rng() < 0.7 ? 0 : 1; g.box(x, y, z, Math.min(12, x + w), y + 1 + (rng() < 0.4 ? 1 : 0), Math.min(7, z + d), P.id('cloud')); } shapes.push(meshGrid(g, P, { size: 1.6, origin: [-9.6, 0, -5.6], skipBottom: false, noAO: false })); }
    this.cloudMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, emissive: 0x000000, transparent: true, opacity: 0.82, flatShading: true });
    this.clouds = [];
    const nC = this.quality === 'low' ? 5 : 8;
    for (let i = 0; i < nC; i++) {
      const sh = shapes[i % shapes.length]; const mesh = new THREE.Mesh(sh.geometry, this.cloudMat); const sc = 1.8 + rng() * 1.8; mesh.scale.set(sc * 1.3, sc * 0.7, sc);
      mesh.position.set(rng() * W * 1.2 - W * 0.1, 170 + rng() * 60, rng() * H * 0.95 + H * 0.02); mesh.castShadow = false; mesh.receiveShadow = false; mesh.name = 'cloud'; mesh.userData.speed = 1.4 + rng() * 1.6; mesh.userData.noAO = true;
      this.group.add(mesh); this.clouds.push(mesh); this.faces += sh.faces;
    }
  }
  stepClouds(dt, cam) { for (const c of this.clouds) { c.position.x += c.userData.speed * dt; if (c.position.x > W * 1.25) c.position.x = -W * 0.3; c.visible = !cam || c.position.distanceTo(cam.position) > 70; } }
  setSky(dayAmt, warm, night) { // bulut rengi
    const c = this.cloudMat.color; c.setRGB(0.27, 0.28, 0.31).lerp(new THREE.Color(0.3, 0.2, 0.17), warm * 0.8).lerp(new THREE.Color(0.06, 0.08, 0.14), night); this.cloudMat.emissive.copy(c).multiplyScalar(0.06 * (1 - night));
  }
  update(dt, t, cam) { this.stepCars(dt); this.stepBoats(dt, t); this.stepBirds(t); this.stepClouds(dt, cam); }
}
