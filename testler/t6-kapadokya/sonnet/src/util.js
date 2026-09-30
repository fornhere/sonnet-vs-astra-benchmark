// küçük yardımcılar: tohumlu rastgele, JS gürültüsü, hücreli örnek yerleştirme
import * as THREE from 'three';

export function rng(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function ihash(x, y, z) {
  let h = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263) + Math.imul(z | 0, 2147483647 & 1274126177);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}
const fade = (t) => t * t * (3 - 2 * t);
export function noise3(x, y, z) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  const xf = fade(x - xi), yf = fade(y - yi), zf = fade(z - zi);
  const l = (a, b, t) => a + (b - a) * t;
  return l(
    l(l(ihash(xi, yi, zi), ihash(xi + 1, yi, zi), xf), l(ihash(xi, yi + 1, zi), ihash(xi + 1, yi + 1, zi), xf), yf),
    l(l(ihash(xi, yi, zi + 1), ihash(xi + 1, yi, zi + 1), xf), l(ihash(xi, yi + 1, zi + 1), ihash(xi + 1, yi + 1, zi + 1), xf), yf),
    zf);
}
export function noise2(x, y) { return noise3(x, y, 0.37); }
export function fbm2(x, y, o = 4) { let a = 0.5, s = 0; for (let i = 0; i < o; i++) { s += a * noise2(x, y); x = x * 2.03 + 11; y = y * 2.03 + 7; a *= 0.5; } return s / 0.9375; }

export const smooth = (a, b, x) => { const t = Math.min(Math.max((x - a) / (b - a), 0), 1); return t * t * (3 - 2 * t); };

// Dünya XZ düzleminde hücrelere bölünmüş örnekleme (kırpma ve mesafe gizleme için)
export class CellGrid {
  constructor(size, cells) { this.size = size; this.n = cells; this.cell = size / cells; this.items = Array.from({ length: cells * cells }, () => []); }
  idx(x, z) {
    const i = Math.min(this.n - 1, Math.max(0, Math.floor((x + this.size / 2) / this.cell)));
    const j = Math.min(this.n - 1, Math.max(0, Math.floor((z + this.size / 2) / this.cell)));
    return j * this.n + i;
  }
  add(x, z, item) { this.items[this.idx(x, z)].push(item); }
  center(k) { const i = k % this.n, j = Math.floor(k / this.n); return [-this.size / 2 + (i + 0.5) * this.cell, -this.size / 2 + (j + 0.5) * this.cell]; }
}

// hızlı 2D uzamsal karma (çarpışma / aralık)
export class SpatialHash {
  constructor(cell = 24) { this.c = cell; this.m = new Map(); }
  key(i, j) { return i * 73856093 ^ j * 19349663; }
  add(x, z, r, data) {
    const i = Math.floor(x / this.c), j = Math.floor(z / this.c);
    const k = this.key(i, j); let a = this.m.get(k); if (!a) { a = []; this.m.set(k, a); }
    a.push({ x, z, r, data });
  }
  query(x, z, rad, cb) {
    const i0 = Math.floor((x - rad) / this.c), i1 = Math.floor((x + rad) / this.c);
    const j0 = Math.floor((z - rad) / this.c), j1 = Math.floor((z + rad) / this.c);
    for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) {
      const a = this.m.get(this.key(i, j)); if (a) for (const o of a) cb(o);
    }
  }
  anyWithin(x, z, r) {
    let hit = false;
    this.query(x, z, r + 12, (o) => { const dx = o.x - x, dz = o.z - z; const rr = o.r + r; if (dx * dx + dz * dz < rr * rr) hit = true; });
    return hit;
  }
}

export const V3 = THREE.Vector3;
