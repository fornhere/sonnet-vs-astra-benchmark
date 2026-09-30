import fs from 'node:fs';
import zlib from 'node:zlib';
import { S } from '../src/shape.js';
import { buildScenes } from './statue.mjs';

const scenes = buildScenes();
const F = (sc, k = S) => (x, y, z) => sc.f(x / k, y / k, z / k) * k;

function surfaceNets(f, box, h) {
  const [x0, y0, z0, x1, y1, z1] = box;
  const nx = Math.ceil((x1 - x0) / h) + 1, ny = Math.ceil((y1 - y0) / h) + 1, nz = Math.ceil((z1 - z0) / h) + 1;
  const field = new Float32Array(nx * ny * nz);
  const idx = (i, j, k) => i + nx * (j + ny * k);
  const B = 8;
  for (let bk = 0; bk < nz; bk += B) for (let bj = 0; bj < ny; bj += B) for (let bi = 0; bi < nx; bi += B) {
    const ei = Math.min(bi + B, nx), ej = Math.min(bj + B, ny), ek = Math.min(bk + B, nz);
    const cx = x0 + (bi + ei - 1) * 0.5 * h, cy = y0 + (bj + ej - 1) * 0.5 * h, cz = z0 + (bk + ek - 1) * 0.5 * h;
    const dc = f(cx, cy, cz);
    if (Math.abs(dc) > B * h * 0.9 * 1.8) {
      for (let k = bk; k < ek; k++) for (let j = bj; j < ej; j++) for (let i = bi; i < ei; i++) field[idx(i, j, k)] = dc;
    } else {
      for (let k = bk; k < ek; k++) for (let j = bj; j < ej; j++) for (let i = bi; i < ei; i++)
        field[idx(i, j, k)] = f(x0 + i * h, y0 + j * h, z0 + k * h);
    }
  }
  const cellVert = new Int32Array(nx * ny * nz).fill(-1);
  const verts = [];
  const cornerOff = [[0,0,0],[1,0,0],[0,1,0],[1,1,0],[0,0,1],[1,0,1],[0,1,1],[1,1,1]];
  const edges = [[0,1],[2,3],[4,5],[6,7],[0,2],[1,3],[4,6],[5,7],[0,4],[1,5],[2,6],[3,7]];
  const cv = new Float32Array(8);
  for (let k = 0; k < nz - 1; k++) for (let j = 0; j < ny - 1; j++) for (let i = 0; i < nx - 1; i++) {
    let mask = 0;
    for (let c = 0; c < 8; c++) { const o = cornerOff[c]; const v = field[idx(i + o[0], j + o[1], k + o[2])]; cv[c] = v; if (v < 0) mask |= 1 << c; }
    if (mask === 0 || mask === 255) continue;
    let sx = 0, sy = 0, sz = 0, n = 0;
    for (const [a, b] of edges) {
      if ((cv[a] < 0) === (cv[b] < 0)) continue;
      const t = cv[a] / (cv[a] - cv[b]);
      const oa = cornerOff[a], ob = cornerOff[b];
      sx += oa[0] + (ob[0] - oa[0]) * t; sy += oa[1] + (ob[1] - oa[1]) * t; sz += oa[2] + (ob[2] - oa[2]) * t; n++;
    }
    cellVert[idx(i, j, k)] = verts.length / 3;
    verts.push(x0 + (i + sx / n) * h, y0 + (j + sy / n) * h, z0 + (k + sz / n) * h);
  }
  const tris = [];
  const quad = (a, b, c, d, flip) => {
    if (a < 0 || b < 0 || c < 0 || d < 0) return;
    if (flip) tris.push(a, c, b, a, d, c); else tris.push(a, b, c, a, c, d);
  };
  for (let k = 1; k < nz - 1; k++) for (let j = 1; j < ny - 1; j++) for (let i = 1; i < nx - 1; i++) {
    const v0 = field[idx(i, j, k)] < 0;
    // x edge
    if (v0 !== (field[idx(i + 1, j, k)] < 0)) quad(cellVert[idx(i, j - 1, k - 1)], cellVert[idx(i, j, k - 1)], cellVert[idx(i, j, k)], cellVert[idx(i, j - 1, k)], !v0);
    if (v0 !== (field[idx(i, j + 1, k)] < 0)) quad(cellVert[idx(i - 1, j, k - 1)], cellVert[idx(i - 1, j, k)], cellVert[idx(i, j, k)], cellVert[idx(i, j, k - 1)], !v0);
    if (v0 !== (field[idx(i, j, k + 1)] < 0)) quad(cellVert[idx(i - 1, j - 1, k)], cellVert[idx(i, j - 1, k)], cellVert[idx(i, j, k)], cellVert[idx(i - 1, j, k)], !v0);
  }
  return { verts: Float32Array.from(verts), tris: Uint32Array.from(tris) };
}

function refine(f, mesh, h) {
  const v = mesh.verts, n = v.length / 3;
  const nrm = new Float32Array(v.length);
  const e = h * 0.3;
  const grad = (x, y, z) => [f(x + e, y, z) - f(x - e, y, z), f(x, y + e, z) - f(x, y - e, z), f(x, y, z + e) - f(x, y, z - e)].map((q) => q / (2 * e));
  for (let i = 0; i < n; i++) {
    let x = v[3 * i], y = v[3 * i + 1], z = v[3 * i + 2];
    for (let it = 0; it < 2; it++) {
      const d = f(x, y, z); const g = grad(x, y, z); const gl = g[0] * g[0] + g[1] * g[1] + g[2] * g[2] || 1;
      const st = Math.max(-h, Math.min(h, d));
      x -= st * g[0] / gl; y -= st * g[1] / gl; z -= st * g[2] / gl;
    }
    const g = grad(x, y, z); const l = Math.hypot(...g) || 1;
    v[3 * i] = x; v[3 * i + 1] = y; v[3 * i + 2] = z;
    nrm[3 * i] = g[0] / l; nrm[3 * i + 1] = g[1] / l; nrm[3 * i + 2] = g[2] / l;
  }
  mesh.nrm = nrm;
}

function pack(mesh, box) {
  const n = mesh.verts.length / 3;
  let mn = [1e9, 1e9, 1e9], mx = [-1e9, -1e9, -1e9];
  for (let i = 0; i < n; i++) for (let a = 0; a < 3; a++) { mn[a] = Math.min(mn[a], mesh.verts[3 * i + a]); mx[a] = Math.max(mx[a], mesh.verts[3 * i + a]); }
  const pos = new Uint16Array(n * 3), nr = new Int8Array(n * 3);
  for (let i = 0; i < n; i++) for (let a = 0; a < 3; a++) {
    pos[3 * i + a] = Math.round((mesh.verts[3 * i + a] - mn[a]) / (mx[a] - mn[a] + 1e-9) * 65535);
    nr[3 * i + a] = Math.round(mesh.nrm[3 * i + a] * 127);
  }
  return { n, mn, mx, pos, nr, idx: mesh.tris };
}

const jobs = [
  ['body', [-21, -0.6, -10, 21.5, 41.8, 10], 0.22],
  ['horseHead', [13.0, 19.5, -3.2, 20.2, 30.0, 3.2], 0.07],
  ['riderHead', [0.6, 30.0, -3.4, 6.8, 41.6, 3.4], 0.055],
  ['herd', [-1.35, -0.05, -0.5, 1.55, 2.25, 0.5], 0.04, 1],
];
const packs = [];
for (const [name, box, h, k] of jobs) {
  const t0 = Date.now();
  const f = F(scenes[name], k || S);
  const m = surfaceNets(f, box, h);
  refine(f, m, h);
  const p = pack(m, box);
  console.log(name, 'verts', p.n, 'tris', p.idx.length / 3, 'ms', Date.now() - t0, 'bbox', p.mn.map((v) => v.toFixed(1)), p.mx.map((v) => v.toFixed(1)));
  packs.push({ name, ...p });
}
// binary: [count u32][for each: n u32, ni u32, mn f32x3, mx f32x3, pos u16*3n, nr i8*3n, idx u32*ni]
const chunks = [];
const hdr = Buffer.alloc(4); hdr.writeUInt32LE(packs.length); chunks.push(hdr);
for (const p of packs) {
  const h = Buffer.alloc(8 + 24); h.writeUInt32LE(p.n, 0); h.writeUInt32LE(p.idx.length, 4);
  p.mn.forEach((v, i) => h.writeFloatLE(v, 8 + 4 * i)); p.mx.forEach((v, i) => h.writeFloatLE(v, 20 + 4 * i));
  chunks.push(h, Buffer.from(p.pos.buffer), Buffer.from(p.nr.buffer));
  // pad to 4
  const pad = (4 - ((p.n * 6 + p.n * 3) % 4)) % 4; chunks.push(Buffer.alloc(pad));
  chunks.push(Buffer.from(p.idx.buffer));
}
const bin = Buffer.concat(chunks);
const gz = zlib.gzipSync(bin, { level: 9 });
console.log('raw', bin.length, 'gz', gz.length);
fs.writeFileSync('src/statueData.js', `export default "${gz.toString('base64')}";\n`);
