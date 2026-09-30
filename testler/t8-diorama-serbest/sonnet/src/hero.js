import * as THREE from 'three';
import { M } from './palette.js';
import { computeTops, meshChunk } from './mesher.js';
import { makeChunkMesh } from './voxmat.js';
import { GROUND, K } from './world.js';

// Alt-voxel modeli: kahraman yapılar / köprüler için ince çözünürlük (scale < 1)
export class Model {
  constructor(nx, ny, nz, scale = 0.5) { this.W = nx; this.H = ny; this.D = nz; this.scale = scale; this.vox = new Uint8Array(nx * ny * nz); this.ground = -1; this.kind = null; this.bid = null; }
  set(x, y, z, m) { x = Math.round(x); y = Math.round(y); z = Math.round(z); if (x < 0 || y < 0 || z < 0 || x >= this.W || y >= this.H || z >= this.D) return; this.vox[y + this.H * (x + this.W * z)] = m; }
  get(x, y, z) { if (x < 0 || y < 0 || z < 0 || x >= this.W || y >= this.H || z >= this.D) return 0; return this.vox[y + this.H * (x + this.W * z)]; }
  box(x0, y0, z0, x1, y1, z1, m) { x0 = Math.round(x0); y0 = Math.round(y0); z0 = Math.round(z0); x1 = Math.round(x1); y1 = Math.round(y1); z1 = Math.round(z1); for (let x = x0; x < x1; x++) for (let z = z0; z < z1; z++) for (let y = y0; y < y1; y++) this.set(x, y, z, m); }
  // merkez (cx,cz), genişlik w (x), derinlik d (z)
  slab(cx, cz, w, d, y0, y1, m) { const x0 = Math.round(cx - w / 2), z0 = Math.round(cz - d / 2); this.box(x0, y0, z0, x0 + w, y1, z0 + d, m); }
  cyl(cx, cz, r, y0, y1, m) { for (let x = Math.floor(cx - r); x <= Math.ceil(cx + r); x++) for (let z = Math.floor(cz - r); z <= Math.ceil(cz + r); z++) if ((x + 0.5 - cx) ** 2 + (z + 0.5 - cz) ** 2 <= r * r) for (let y = y0; y < y1; y++) this.set(x, y, z, m); }
  mesh(mats) {
    const top = computeTops(this); const ch = meshChunk(this, 0, 0, top, true);
    if (!ch.n) return null; ch.ymax = this.H; const m = makeChunkMesh(ch, mats.bq, mats.mat, mats.dmat);
    m.scale.setScalar(this.scale); return m;
  }
}
export function placeModel(model, mats, parent, x, y, z, rotY = 0) {
  const m = model.mesh(mats); if (!m) return null;
  m.position.set(x, y, z); m.rotation.y = rotY; m.updateMatrix(); m.matrixAutoUpdate = false; m.frustumCulled = true;
  // sınırlar yerel: makeChunkMesh sınırlarını x0..x1 ile kurdu (tam model) — yeterli
  parent.add(m); return m;
}
// şehir ızgarasında bina temizle (hero'nun altındaki ham hacimler)
export function clearRect(world, x0, x1, z0, z1) {
  const { W, D, H, vox, kind, hgt } = world;
  for (let z = Math.max(0, z0); z < Math.min(D, z1); z++) for (let x = Math.max(0, x0); x < Math.min(W, x1); x++) {
    const c = z * W + x; const b = H * (x + W * z); for (let y = GROUND; y < H; y++) vox[b + y] = 0; if (kind[c] === K.BLD) hgt[c] = 0; }
}
// koordinat noktasındaki binanın izini bul
export function footprintAt(world, wx, wz) {
  const { W, D, kind, bid } = world; const x = Math.floor(wx), z = Math.floor(wz);
  let best = 0, bx = x, bz = z; // en yakın bina hücresini ara
  for (let r = 0; r <= 4 && !best; r++) for (let dz = -r; dz <= r; dz++) for (let dx = -r; dx <= r; dx++) { const xx = x + dx, zz = z + dz; if (xx < 0 || zz < 0 || xx >= W || zz >= D) continue; if (kind[zz * W + xx] === K.BLD) { best = bid[zz * W + xx]; bx = xx; bz = zz; } }
  if (!best) return { x0: x, x1: x + 1, z0: z, z1: z + 1, cx: wx, cz: wz, bid: 0 };
  let x0 = bx, x1 = bx, z0 = bz, z1 = bz; const st = [[bx, bz]]; const seen = new Set([bz * W + bx]);
  while (st.length) { const [px, pz] = st.pop(); for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const xx = px + dx, zz = pz + dz; if (xx < 0 || zz < 0 || xx >= W || zz >= D) continue; const c = zz * W + xx; if (seen.has(c) || kind[c] !== K.BLD || bid[c] !== best) continue; seen.add(c); st.push([xx, zz]); x0 = Math.min(x0, xx); x1 = Math.max(x1, xx); z0 = Math.min(z0, zz); z1 = Math.max(z1, zz); } }
  return { x0, x1: x1 + 1, z0, z1: z1 + 1, cx: (x0 + x1 + 1) / 2, cz: (z0 + z1 + 1) / 2, bid: best };
}

// ---------- Kahramanlar ----------
export function buildEmpireState() {
  const m = new Model(26, 100, 12, 0.5); const cx = 13, cz = 6; const B = M.LIMESTONE;
  const tiers = [[24, 10, 0, 5], [16, 8, 5, 18], [14, 7, 18, 30], [12, 6, 30, 44], [10, 5, 44, 62], [6, 4, 62, 74]];
  for (const [w, d, y0, y1] of tiers) m.slab(cx, cz, w, d, y0, y1, B);
  m.slab(cx, cz, 4, 3, 74, 80, M.ESBTOP); m.slab(cx, cz, 2, 2, 80, 88, M.ESBTOP); m.slab(cx, cz, 1, 1, 88, 100, M.SPIRE);
  // yan kanatlar (30. cadde tarafı gölgelik) küçük detay
  m.slab(cx, cz, 18, 10, 5, 8, B);
  return m;
}
export function buildChrysler() {
  const m = new Model(10, 76, 10, 0.5); const c = 5;
  m.slab(c, c, 8, 8, 0, 36, M.BRICKGRAY); m.slab(c, c, 6, 6, 36, 46, M.BRICKGRAY);
  // taç: pürüzsüz çelik halkalar (art deco güneş ışınları)
  const rings = [[6, 46], [6, 48], [5, 50], [4, 52], [4, 54], [3, 56], [2, 58], [2, 60]];
  for (const [w, y] of rings) m.slab(c, c, w, w, y, y + 2, M.CROWN);
  m.slab(c, c, 1, 1, 62, 76, M.CROWN);
  // köşe kartalları
  for (const [dx, dz] of [[-4, -4], [3, -4], [-4, 3], [3, 3]]) m.set(c + dx, 34, c + dz, M.CROWN);
  return m;
}
export function buildOneWTC() {
  const m = new Model(10, 120, 10, 0.5); const c = 5;
  m.slab(c, c, 8, 8, 0, 8, M.GLASS_WTC);
  m.slab(c, c, 8, 8, 8, 40, M.GLASS_WTC);
  // pahlı köşeler
  const chamfer = (y0, y1, w, cut, mat) => { m.slab(c, c, w, w, y0, y1, mat); const h = w / 2; for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) for (let i = 0; i < cut; i++) for (let j = 0; j < cut - i; j++) for (let y = y0; y < y1; y++) { const x = sx < 0 ? c - h + i : c + h - 1 - i, z = sz < 0 ? c - h + j : c + h - 1 - j; m.set(x, y, z, 0); } };
  chamfer(40, 64, 8, 2, M.GLASS_WTC); chamfer(64, 88, 8, 3, M.GLASS_WTC);
  m.slab(c, c, 4, 4, 88, 92, M.GLASS_WTC); m.slab(c, c, 2, 2, 92, 104, M.SPIRE); m.slab(c, c, 1, 1, 104, 120, M.SPIRE);
  return m;
}
export function buildLiberty() {
  const m = new Model(34, 64, 34, 0.25); const c = 17;
  // Fort Wood yıldız temeli
  for (let x = 0; x < 34; x++) for (let z = 0; z < 34; z++) { const dx = x + 0.5 - c, dz = z + 0.5 - c; const r = Math.hypot(dx, dz), a = Math.atan2(dz, dx); const star = 11.6 + 3.2 * Math.cos(a * 11 + 0.3); if (r < star) for (let y = 0; y < 3; y++) m.set(x, y, z, M.STARFORT); }
  for (let x = 0; x < 34; x++) for (let z = 0; z < 34; z++) { const dx = x + 0.5 - c, dz = z + 0.5 - c; if (Math.hypot(dx, dz) < 9.4) m.set(x, 3, z, M.GRASS); }
  // kaide
  m.slab(c, c, 10, 10, 3, 8, M.GRANITE); m.slab(c, c, 8, 8, 8, 13, M.GRANITE); m.slab(c, c, 10, 10, 13, 14, M.GRANITE); m.slab(c, c, 6, 6, 14, 15, M.GRANITE);
  // heykel
  m.slab(c, c, 4, 4, 15, 22, M.COPPER); m.slab(c, c, 3, 3, 22, 27, M.COPPER); m.slab(c, c, 2, 2, 27, 30, M.COPPER);
  m.slab(c, c, 2, 2, 30, 32, M.COPPER);
  // taç ışınları
  for (const [dx, dz] of [[-2, 0], [1, 0], [-1, -2], [-1, 1], [-2, -1], [1, 1], [1, -1], [-2, 1]]) m.set(c + dx, 32, c + dz, M.COPPER);
  m.set(c - 3, 32, c - 1, M.COPPER); m.set(c + 2, 32, c - 1, M.COPPER); m.set(c - 1, 33, c - 1, M.COPPER);
  // kalkan kolu yukarıda, meşale
  m.box(c + 1, 24, c - 1, c + 3, 36, c, M.COPPER); m.box(c + 2, 36, c - 2, c + 4, 38, c + 1, M.GOLD); m.box(c + 2, 38, c - 1, c + 4, 41, c, M.FLAME);
  m.box(c - 3, 23, c - 1, c - 2, 27, c + 1, M.COPPER);
  return m;
}
export function buildVessel() {
  const m = new Model(24, 56, 24, 0.25); const c = 12;
  for (let y = 0; y < 56; y++) { const t = y / 55; const r = 3 + 8.5 * t * (1 - 0.15 * t); m.cyl(c, c, r, y, y + 1, (y % 4 === 0) ? M.STEEL : M.VESSEL); }
  return m;
}
