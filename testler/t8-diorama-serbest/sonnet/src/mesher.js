import { MATS, ROOFS, M } from './palette.js';
import { hash3, hash1, hex } from './util.js';
import { H as H0, GROUND, K } from './world.js';

export const CS = 32;
const DIRS = [
  { n: [1, 0, 0], t1: [0, 1, 0], t2: [0, 0, 1] },
  { n: [-1, 0, 0], t1: [0, 0, 1], t2: [0, 1, 0] },
  { n: [0, 1, 0], t1: [0, 0, 1], t2: [1, 0, 0] },
  { n: [0, -1, 0], t1: [1, 0, 0], t2: [0, 0, 1] },
  { n: [0, 0, 1], t1: [1, 0, 0], t2: [0, 1, 0] },
  { n: [0, 0, -1], t1: [0, 1, 0], t2: [1, 0, 0] },
];
const ROOFC = ROOFS.map(hex);
class Buf {
  constructor() { this.n = 0; this.cap = 4096; this.pos = new Uint16Array(this.cap * 4); this.col = new Uint8Array(this.cap * 4); this.meta = new Uint8Array(this.cap * 4); }
  grow() { this.cap *= 2; const p = new Uint16Array(this.cap * 4); p.set(this.pos); this.pos = p; const c = new Uint8Array(this.cap * 4); c.set(this.col); this.col = c; const m = new Uint8Array(this.cap * 4); m.set(this.meta); this.meta = m; }
  push(x, y, z, d, r, g, b, ao, s, h, dens, fl) {
    if (this.n >= this.cap) this.grow(); const i = this.n * 4; this.n++;
    this.pos[i] = x; this.pos[i + 1] = y; this.pos[i + 2] = z; this.pos[i + 3] = d; this.col[i] = r; this.col[i + 1] = g; this.col[i + 2] = b; this.col[i + 3] = ao;
    this.meta[i] = s; this.meta[i + 1] = h; this.meta[i + 2] = dens; this.meta[i + 3] = fl;
  }
}
export function computeTops(w) {
  const { W, D, vox } = w; const H = w.H || H0; const top = new Uint8Array(W * D);
  for (let c = 0; c < W * D; c++) { const b = c * H; let y = H - 1; while (y >= 0 && !vox[b + y]) y--; top[c] = y + 1; }
  return top;
}
export function meshChunk(w, cx, cz, top, full = false) {
  const { W, D, vox, kind, bid } = w; const buf = new Buf(); const H = w.H || H0; const GR = w.ground === undefined ? GROUND : w.ground;
  const x0 = full ? 0 : cx * CS, x1 = full ? W : Math.min(W, x0 + CS), z0 = full ? 0 : cz * CS, z1 = full ? D : Math.min(D, z0 + CS);
  const solid = (x, y, z) => (x < 0 || x >= W || z < 0 || z >= D || y < 0 || y >= H) ? 0 : (vox[y + H * (x + W * z)] ? 1 : 0);
  let ymax = 0;
  for (let z = z0; z < z1; z++) for (let x = x0; x < x1; x++) {
    const c = z * W + x, tp = top[c]; if (!tp) continue; if (tp > ymax) ymax = tp; const b = H * (x + W * z);
    const bidc = bid ? bid[c] : 0; const roofRnd = hash1(bidc, 3);
    for (let y = 0; y < tp; y++) {
      const m = vox[b + y]; if (!m) continue; const mat = MATS[m]; if (!mat) continue;
      for (let d = 0; d < 6; d++) {
        const D0 = DIRS[d]; const nx = x + D0.n[0], ny = y + D0.n[1], nz = z + D0.n[2];
        if (d === 3 && y === 0) continue;
        if (solid(nx, ny, nz)) continue;
        // AO
        let ao = 0;
        for (let k = 0; k < 4; k++) {
          const s1 = (k & 1) * 2 - 1, s2 = (k >> 1) * 2 - 1;
          const ax = nx + D0.t1[0] * s1, ay = ny + D0.t1[1] * s1, az = nz + D0.t1[2] * s1;
          const bx = nx + D0.t2[0] * s2, by = ny + D0.t2[1] * s2, bz = nz + D0.t2[2] * s2;
          const a1 = solid(ax, ay, az), a2 = solid(bx, by, bz), a3 = solid(ax + D0.t2[0] * s2, ay + D0.t2[1] * s2, az + D0.t2[2] * s2);
          const v = (a1 && a2) ? 0 : 3 - (a1 + a2 + a3); ao |= v << (2 * k);
        }
        const isTop = d === 2; const isBld = mat.roof === true;
        let col = isTop ? mat.top : mat.side;
        if (isBld && isTop) { const rc = ROOFC[Math.floor(roofRnd * 8) % 8]; col = rc; }
        const j = 1 + (hash3(x, y, z, d) - 0.5) * 2 * mat.jit;
        const r = Math.min(255, col[0] * j), g = Math.min(255, col[1] * j), bl = Math.min(255, col[2] * j);
        // stil
        let st = 0, fl = 0;
        if (isBld) st = mat.win;
        else if (mat.win === 10 || mat.win === 11) st = isTop ? mat.win : 0;
        else st = mat.win;
        const dens = isBld ? 90 + Math.floor(hash1(bidc, 8) * 150) : (mat.win === 6 || mat.win === 7 ? 215 : 0);
        if (d < 2 || d > 3) { if (y === GR && (isBld || mat.win === 7)) fl |= 1; }
        if (st === 10) { // yol işaretleri
          const rd = (xx, zz) => kind && xx >= 0 && xx < W && zz >= 0 && zz < D ? kind[zz * W + xx] : -1;
          const kL = rd(x - 1, z), kR = rd(x + 1, z), kU = rd(x, z - 1), kD = rd(x, z + 1);
          const isR = k => k === K.ROAD;
          if (isR(kL) && isR(kR)) fl |= 1; if (isR(kU) && isR(kD)) fl |= 2;
          if (kL === K.BLD) fl |= 4; if (kR === K.BLD) fl |= 8; if (kU === K.BLD) fl |= 16; if (kD === K.BLD) fl |= 32;
        }
        buf.push(x, y, z, d, r, g, bl, ao, st, Math.floor(hash3(x, y, z, 40 + d) * 255), dens, fl);
      }
    }
  }
  return { cx, cz, n: buf.n, pos: buf.pos.subarray(0, buf.n * 4), col: buf.col.subarray(0, buf.n * 4), meta: buf.meta.subarray(0, buf.n * 4), x0, x1, z0, z1, ymax };
}
export function meshWorld(w) {
  const top = computeTops(w); const chunks = []; let total = 0;
  for (let cz = 0; cz < Math.ceil(w.D / CS); cz++) for (let cx = 0; cx < Math.ceil(w.W / CS); cx++) { const ch = meshChunk(w, cx, cz, top); if (ch.n) { chunks.push(ch); total += ch.n; } }
  return { chunks, totalFaces: total, top };
}
