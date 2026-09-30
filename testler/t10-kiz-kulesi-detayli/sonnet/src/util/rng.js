// Tohumlu rastgele sayı üreteci + periyodik değer gürültüsü (doku üretimi için)
export function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function ihash(x, y, s) {
  let h = Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(s, 2147483647);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

const smooth = (t) => t * t * (3 - 2 * t);

// px, py periyot -> döşenebilir doku
export function pnoise(x, y, px, py, seed = 0) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = smooth(x - xi), yf = smooth(y - yi);
  const x0 = ((xi % px) + px) % px, x1 = (x0 + 1) % px;
  const y0 = ((yi % py) + py) % py, y1 = (y0 + 1) % py;
  const a = ihash(x0, y0, seed), b = ihash(x1, y0, seed);
  const c = ihash(x0, y1, seed), d = ihash(x1, y1, seed);
  return a + (b - a) * xf + (c - a) * yf + (a - b - c + d) * xf * yf;
}

export function pfbm(x, y, period, octaves = 5, seed = 0, gain = 0.5) {
  let s = 0, a = 0.5, f = 1, n = 0;
  for (let i = 0; i < octaves; i++) {
    s += a * pnoise(x * f, y * f, period * f, period * f, seed + i * 17);
    n += a; a *= gain; f *= 2;
  }
  return s / n;
}

// Geometri için sıradan (periyodik olmayan) gürültü
export function noise2(x, y, seed = 0) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = smooth(x - xi), yf = smooth(y - yi);
  const a = ihash(xi, yi, seed), b = ihash(xi + 1, yi, seed);
  const c = ihash(xi, yi + 1, seed), d = ihash(xi + 1, yi + 1, seed);
  return a + (b - a) * xf + (c - a) * yf + (a - b - c + d) * xf * yf;
}

export function fbm2(x, y, oct = 4, seed = 0) {
  let s = 0, a = 0.5, n = 0;
  for (let i = 0; i < oct; i++) {
    s += a * noise2(x, y, seed + i * 31); n += a;
    x = x * 2.03 + 11.7; y = y * 2.03 + 3.1; a *= 0.5;
  }
  return s / n;
}

export const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const smoothstep = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
