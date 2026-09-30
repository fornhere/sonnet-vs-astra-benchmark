// Voxel çekirdeği: palet, yoğun ızgara, greedy meshing (AO'lu) ve "model" çizim yardımcıları.
import * as THREE from 'three';

export const hex = (h) => [(h >> 16) & 255, (h >> 8) & 255, h & 255];

// Vertex `aInfo.x` = madde türü (shader'daki kind)
export const KIND = {
  PLAIN: 0, WINDOWS: 1, SIGN: 2, POND: 3, LAMP: 4, METAL: 5, GLASS: 6, ROAD: 7, WATERSIDE: 8, GRASS: 9, CANVAS: 10, WOOD: 11, UPLIT: 12, ICE: 13, LITWIN: 14, FLOOD: 15,
};

export class Palette {
  constructor() { this.list = [null]; this.byName = new Map(); }
  add(name, c, o = {}) {
    if (this.byName.has(name)) return this.byName.get(name);
    const id = this.list.length; if (id > 255) throw new Error('palet dolu');
    const rgb = typeof c === 'number' ? hex(c) : c;
    this.list.push({ c: rgb, kind: o.kind ?? 0, wx: o.wx ?? 0, wy: o.wy ?? 0, noTop: !!o.noTop, noBottom: !!o.noBottom, snow: o.snow ?? 1, name });
    this.byName.set(name, id); return id;
  }
  id(name) { const v = this.byName.get(name); if (!v) throw new Error('palet yok: ' + name); return v; }
}

export class VoxelGrid {
  constructor(nx, ny, nz) { this.nx = nx; this.ny = ny; this.nz = nz; this.data = new Uint8Array(nx * ny * nz); }
  idx(x, y, z) { return x + this.nx * (z + this.nz * y); }
  get(x, y, z) { return (x < 0 || y < 0 || z < 0 || x >= this.nx || y >= this.ny || z >= this.nz) ? 0 : this.data[x + this.nx * (z + this.nz * y)]; }
  set(x, y, z, v) { if (x < 0 || y < 0 || z < 0 || x >= this.nx || y >= this.ny || z >= this.nz) return; this.data[x + this.nx * (z + this.nz * y)] = v; }
  // --- çizim yardımcıları (tam sayı hücre koordinatları) ---
  box(x0, y0, z0, x1, y1, z1, v) { for (let y = y0; y < y1; y++) for (let z = z0; z < z1; z++) for (let x = x0; x < x1; x++) this.set(x, y, z, v); }
  // Dikey silindir/elips: merkez (cx,cz), yarıçap rx,rz
  cyl(cx, cz, rx, rz, y0, y1, v, rz2) { rz = rz ?? rx; for (let y = y0; y < y1; y++) for (let z = Math.floor(cz - rz); z <= Math.ceil(cz + rz); z++) for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++) { const dx = (x + 0.5 - cx) / rx, dz = (z + 0.5 - cz) / rz; if (dx * dx + dz * dz <= 1) this.set(x, y, z, v); } }
  ellipsoid(cx, cy, cz, rx, ry, rz, v) { for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++) for (let z = Math.floor(cz - rz); z <= Math.ceil(cz + rz); z++) for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++) { const dx = (x + 0.5 - cx) / rx, dy = (y + 0.5 - cy) / ry, dz = (z + 0.5 - cz) / rz; if (dx * dx + dy * dy + dz * dz <= 1) this.set(x, y, z, v); } }
  // Kalınlıklı 3B çizgi
  line(x0, y0, z0, x1, y1, z1, v, r = 0) {
    const n = Math.ceil(Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0), Math.abs(z1 - z0)) * 1.5) + 1;
    for (let i = 0; i <= n; i++) { const t = i / n; const x = Math.floor(x0 + (x1 - x0) * t), y = Math.floor(y0 + (y1 - y0) * t), z = Math.floor(z0 + (z1 - z0) * t); if (r <= 0) this.set(x, y, z, v); else this.box(x - r, y - r, z - r, x + r + 1, y + r + 1, z + r + 1, v); }
  }
}

// ---------- büyüyen tampon ----------
class Grow {
  constructor(Type, n = 1 << 16) { this.Type = Type; this.a = new Type(n); this.n = 0; }
  push(v) { if (this.n >= this.a.length) { const b = new this.Type(this.a.length * 2); b.set(this.a); this.a = b; } this.a[this.n++] = v; }
  done() { return this.a.subarray(0, this.n); }
}

/**
 * Greedy meshing. opts: { origin:[x,y,z] (dünya), size, skipBottom, noAO, aoStrength }
 * dönüş: { geometry, faces (greedy öncesi görünür yüz), quads }
 */
export function meshGrid(grid, palette, opts = {}) {
  const size = opts.size ?? 1; const [ox, oy, oz] = opts.origin ?? [0, 0, 0];
  const dims = [grid.nx, grid.ny, grid.nz];
  const stride = [1, grid.nx * grid.nz, grid.nx];
  const data = grid.data;
  const pos = new Grow(Float32Array), nor = new Grow(Int8Array), col = new Grow(Uint8Array), inf = new Grow(Uint8Array), idxs = new Grow(Uint32Array);
  let faces = 0, quads = 0, vcount = 0; const byDir = [0, 0, 0, 0, 0, 0];
  const pl = palette.list;
  const cellSize100 = Math.round(size * 100);
  const aoStrength = opts.aoStrength ?? 0.22;
  const useAO = opts.noAO !== true;
  const q = [0, 0, 0], p = [0, 0, 0];
  const mask = new Int32Array(Math.max(dims[0] * dims[1], dims[1] * dims[2], dims[0] * dims[2]));
  const sol = (x, y, z) => (x < 0 || y < 0 || z < 0 || x >= dims[0] || y >= dims[1] || z >= dims[2]) ? 0 : (data[x * stride[0] + y * stride[1] + z * stride[2]] !== 0 ? 1 : 0);
  const t3 = [0, 0, 0];
  const solidOff = (ex, d, u, v, qu, qv, ou, ov) => { t3[d] = ex; t3[u] = qu + ou; t3[v] = qv + ov; return sol(t3[0], t3[1], t3[2]); };
  for (let d = 0; d < 3; d++) {
    const u = (d + 1) % 3, v = (d + 2) % 3; const du = dims[u], dv = dims[v];
    const sd = stride[d], su_ = stride[u], sv_ = stride[v];
    for (q[d] = -1; q[d] < dims[d]; q[d]++) {
      let n = 0, any = false;
      const hasA = q[d] >= 0, hasB = q[d] < dims[d] - 1;
      const rowBase = q[d] * sd;
      for (let j = 0; j < dv; j++) {
        let idx = rowBase + j * sv_;
        for (let i = 0; i < du; i++, n++, idx += su_) {
          const a = hasA ? data[idx] : 0;
          const b = hasB ? data[idx + sd] : 0;
          let m = 0;
          if ((a !== 0) !== (b !== 0)) {
            const front = a !== 0; const pid = front ? a : b; const P = pl[pid];
            let skip = false;
            if (d === 1) { if (front ? P.noTop : (P.noBottom || opts.skipBottom)) skip = true; }
            if (!skip) {
              let ao = 0xff;
              if (useAO) {
                ao = 0; const ex = front ? q[d] + 1 : q[d];
                for (let c = 0; c < 4; c++) {
                  const su = (c & 1) ? 1 : -1, sv = (c & 2) ? 1 : -1;
                  const s1 = solidOff(ex, d, u, v, i, j, su, 0), s2 = solidOff(ex, d, u, v, i, j, 0, sv), cr = solidOff(ex, d, u, v, i, j, su, sv);
                  ao |= ((s1 && s2) ? 0 : 3 - (s1 + s2 + cr)) << (c * 2);
                }
              }
              m = (pid | (ao << 8) | ((front ? 1 : 0) << 16)) + 1; any = true; faces++; byDir[d * 2 + (front ? 1 : 0)]++;
            }
          }
          mask[n] = m;
        }
      }
      if (!any) continue;
      n = 0;
      for (let j = 0; j < dv; j++) {
        for (let i = 0; i < du;) {
          const m = mask[n + i]; if (!m) { i++; continue; }
          const ao = ((m - 1) >> 8) & 255;
          const uniform = ao === 0xff || ((ao & 3) === ((ao >> 2) & 3) && (ao & 3) === ((ao >> 4) & 3) && (ao & 3) === ((ao >> 6) & 3));
          let w = 1, h = 1;
          if (uniform) {
            while (i + w < du && mask[n + i + w] === m) w++;
            outer: for (; j + h < dv; h++) { for (let k = 0; k < w; k++) if (mask[n + k + i + h * du] !== m) break outer; }
          }
          for (let l = 0; l < h; l++) for (let k = 0; k < w; k++) mask[n + i + k + l * du] = 0;
          const pid = (m - 1) & 255, front = ((m - 1) >> 16) & 1; const P = pl[pid];
          const plane = q[d] + 1;
          const cu = [0, w, w, 0], cv = [0, 0, h, h];
          const aoIdx = [0, 1, 3, 2];
          const aos = [0, 0, 0, 0];
          for (let c = 0; c < 4; c++) aos[c] = (ao >> (aoIdx[c] * 2)) & 3;
          const nx_ = d === 0 ? (front ? 127 : -127) : 0, ny_ = d === 1 ? (front ? 127 : -127) : 0, nz_ = d === 2 ? (front ? 127 : -127) : 0;
          const base = vcount;
          for (let c = 0; c < 4; c++) {
            p[d] = plane; p[u] = i + cu[c]; p[v] = j + cv[c];
            pos.push(ox + p[0] * size); pos.push(oy + p[1] * size); pos.push(oz + p[2] * size);
            nor.push(nx_); nor.push(ny_); nor.push(nz_); nor.push(0);
            const av = 1 - (3 - aos[c]) * aoStrength;
            col.push(P.c[0]); col.push(P.c[1]); col.push(P.c[2]); col.push(Math.round(av * 255));
            inf.push(P.kind); inf.push(P.wx); inf.push(P.wy); inf.push(cellSize100);
          }
          vcount += 4; quads++;
          const flip = (aos[0] + aos[2] < aos[1] + aos[3]);
          const tri = front ? (flip ? [1, 2, 3, 1, 3, 0] : [0, 1, 2, 0, 2, 3]) : (flip ? [1, 3, 2, 1, 0, 3] : [0, 2, 1, 0, 3, 2]);
          for (const t of tri) idxs.push(base + t);
          i += w;
        }
        n += du;
      }
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos.done(), 3));
  g.setAttribute('normal', new THREE.BufferAttribute(nor.done(), 4, true));
  g.setAttribute('aCol', new THREE.BufferAttribute(col.done(), 4, true));
  g.setAttribute('aInfo', new THREE.BufferAttribute(inf.done(), 4, false));
  g.setIndex(new THREE.BufferAttribute(idxs.done(), 1));
  g.computeBoundingSphere(); g.computeBoundingBox();
  return { geometry: g, faces, quads, byDir };
}

/**
 * Elle kutu birleştirme (ağaç, araç gibi örneklenen küçük nesneler için): her kutu 5 yüz (alt yüz yok).
 * parts: [{ p:[x,y,z] (taban merkezi), s:[w,h,d], pal:id, ao?:0..1 }]
 */
export function meshBoxes(parts, palette, cell = 0.1) {
  const pos = [], nor = [], col = [], inf = [], idx = [];
  const faces = [ // normal, 4 köşe (birim küpte, taban merkezli)
    [[0, 1, 0], [[-1, 1, -1], [-1, 1, 1], [1, 1, 1], [1, 1, -1]], 1],
    [[1, 0, 0], [[1, 0, -1], [1, 1, -1], [1, 1, 1], [1, 0, 1]], 0.86],
    [[-1, 0, 0], [[-1, 0, 1], [-1, 1, 1], [-1, 1, -1], [-1, 0, -1]], 0.8],
    [[0, 0, 1], [[1, 0, 1], [1, 1, 1], [-1, 1, 1], [-1, 0, 1]], 0.92],
    [[0, 0, -1], [[-1, 0, -1], [-1, 1, -1], [1, 1, -1], [1, 0, -1]], 0.84],
  ];
  let v = 0;
  for (const part of parts) {
    const P = palette.list[part.pal]; const [px, py, pz] = part.p, [w, h, d] = part.s;
    for (const [n, cs, sh] of faces) {
      for (const c of cs) {
        pos.push(px + c[0] * w / 2, py + c[1] * h, pz + c[2] * d / 2); nor.push(n[0] * 127, n[1] * 127, n[2] * 127, 0);
        col.push(P.c[0], P.c[1], P.c[2], Math.round(255 * (part.ao ?? 1) * (0.9 + 0.1 * sh))); inf.push(P.kind, P.wx, P.wy, Math.round((part.cell ?? cell) * 100));
      }
      idx.push(v, v + 1, v + 2, v, v + 2, v + 3); v += 4;
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.BufferAttribute(new Int8Array(nor), 4, true));
  g.setAttribute('aCol', new THREE.BufferAttribute(new Uint8Array(col), 4, true));
  g.setAttribute('aInfo', new THREE.BufferAttribute(new Uint8Array(inf), 4, false));
  g.setIndex(idx); g.computeBoundingSphere();
  return { geometry: g, faces: parts.length * 5 };
}
