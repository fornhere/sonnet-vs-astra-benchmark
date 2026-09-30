// Prosedürel dokular (canvas / DataTexture). Dış dosya yok.
import * as THREE from 'three';
import { pfbm, pnoise, mulberry32, clamp } from './rng.js';

function canvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  return c;
}

function toTex(c, srgb = true) {
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 8;
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.needsUpdate = true;
  return t;
}

// Krem/ocre kesme taş (ashlar) duvar dokusu + kabartma haritası
export function makeStone(size = 1024, seed = 7, opts = {}) {
  const rnd = mulberry32(seed);
  const base = opts.base || [196, 178, 142];
  const cv = canvas(size, size), bv = canvas(size, size);
  const g = cv.getContext('2d'), gb = bv.getContext('2d');
  g.fillStyle = `rgb(${base})`; g.fillRect(0, 0, size, size);
  gb.fillStyle = '#9a9a9a'; gb.fillRect(0, 0, size, size);
  const rows = opts.rows || 14;
  const rowH = size / rows;
  for (let r = 0; r < rows; r++) {
    let x = -rnd() * 200;
    const y = r * rowH;
    const h = rowH;
    while (x < size) {
      const w = 95 + rnd() * 110;
      const tint = (rnd() - 0.5) * 46;
      const warm = (rnd() - 0.5) * 12;
      g.fillStyle = `rgb(${base[0] + tint + warm},${base[1] + tint},${base[2] + tint - warm})`;
      g.fillRect(x, y, w, h);
      const bh = 150 + rnd() * 60;
      gb.fillStyle = `rgb(${bh},${bh},${bh})`;
      gb.fillRect(x, y, w, h);
      // derz (harç)
      g.fillStyle = 'rgba(52,44,34,0.92)';
      g.fillRect(x, y, w, 5);
      g.fillRect(x, y, 5, h);
      gb.fillStyle = '#202020';
      gb.fillRect(x, y, w, 4);
      gb.fillRect(x, y, 4, h);
      x += w;
    }
  }
  // gürültü, yosun/kir lekesi, yağmur izleri
  const id = g.getImageData(0, 0, size, size), bd = gb.getImageData(0, 0, size, size);
  const per = 8;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;
      const n1 = pfbm(x / size * per * 2, y / size * per * 2, per * 2, 4, 3);
      const n2 = pnoise(x / size * 64, y / size * 4, 64, 4, 9); // dikey yağmur izi
      const stain = clamp((n2 - 0.6) * 1.6, 0, 1) * clamp(n1 * 1.2 - 0.2, 0, 1);
      const k = 0.78 + n1 * 0.4 - stain * 0.42;
      id.data[i] *= k; id.data[i + 1] *= k * (1 - stain * 0.02); id.data[i + 2] *= k * (1 + stain * 0.03);
      const bk = 0.75 + n1 * 0.5;
      bd.data[i] *= bk; bd.data[i + 1] *= bk; bd.data[i + 2] *= bk;
    }
  }
  g.putImageData(id, 0, 0); gb.putImageData(bd, 0, 0);
  return { map: toTex(cv), bump: toTex(bv, false) };
}

// Islak, koyu, yosunlu kaya dokusu
export function makeRock(size = 1024, seed = 21) {
  const cv = canvas(size, size), bv = canvas(size, size);
  const g = cv.getContext('2d'), gb = bv.getContext('2d');
  const id = g.createImageData(size, size), bd = gb.createImageData(size, size);
  const per = 6;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / size * per, v = y / size * per;
      const n = pfbm(u, v, per, 6, seed);
      const ridge = 1 - Math.abs(pfbm(u * 1.7, v * 1.7, per * 1.7 | 0 || per, 4, seed + 5) - 0.5) * 2; // çatlaklar
      const crack = Math.pow(clamp(ridge, 0, 1), 6);
      const moss = clamp((pfbm(u * 0.8, v * 0.8, per, 3, seed + 9) - 0.55) * 3, 0, 1);
      let r = 92 + n * 92, gg = 88 + n * 86, b = 84 + n * 80;
      r = r * (1 - moss * 0.35) + 20 * moss;
      gg = gg * (1 - moss * 0.1) + 38 * moss;
      b = b * (1 - moss * 0.4) + 12 * moss;
      const cr = 1 - crack * 0.6;
      const i = (y * size + x) * 4;
      id.data[i] = r * cr; id.data[i + 1] = gg * cr; id.data[i + 2] = b * cr; id.data[i + 3] = 255;
      const h = (n * 0.8 + 0.2) * 255 * (1 - crack * 0.5);
      bd.data[i] = bd.data[i + 1] = bd.data[i + 2] = h; bd.data[i + 3] = 255;
    }
  }
  g.putImageData(id, 0, 0); gb.putImageData(bd, 0, 0);
  return { map: toTex(cv), bump: toTex(bv, false) };
}

// Kurşun kubbe: dikey kenet dikişleri + oksit lekeleri
export function makeLead(size = 512) {
  const cv = canvas(size, size), g = cv.getContext('2d');
  const id = g.createImageData(size, size);
  const seams = 24;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const n = pfbm(x / size * 12, y / size * 12, 12, 5, 44);
      const sx = (x / size * seams) % 1;
      const seam = sx < 0.045 ? 1 : 0;
      const band = ((y / size * 10) % 1) < 0.02 ? 1 : 0;
      let v = 78 + n * 42 - seam * 34 + (sx > 0.045 && sx < 0.09 ? 14 : 0) - band * 16;
      const i = (y * size + x) * 4;
      id.data[i] = v * 0.86; id.data[i + 1] = v * 0.94; id.data[i + 2] = v * 1.02 + 6; id.data[i + 3] = 255;
    }
  }
  g.putImageData(id, 0, 0);
  const t = toTex(cv); return t;
}

// Kaldırım / teras taşı (kare plaka)
export function makePaving(size = 512) {
  const cv = canvas(size, size), g = cv.getContext('2d');
  const rnd = mulberry32(5);
  g.fillStyle = '#8b8677'; g.fillRect(0, 0, size, size);
  const n = 8, s = size / n;
  for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
    const t = (rnd() - 0.5) * 30;
    g.fillStyle = `rgb(${140 + t},${134 + t},${118 + t})`;
    g.fillRect(i * s + 2, j * s + 2, s - 4, s - 4);
  }
  const id = g.getImageData(0, 0, size, size);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const k = 0.7 + pfbm(x / size * 16, y / size * 16, 16, 4, 71) * 0.6;
    const i = (y * size + x) * 4; id.data[i] *= k; id.data[i + 1] *= k; id.data[i + 2] *= k;
  }
  g.putImageData(id, 0, 0);
  return toTex(cv);
}

// Deniz: RG = türev (normal), B = yükseklik, A = köpük gürültüsü. Döşenebilir.
export function makeSeaNoise(size = 512) {
  const data = new Uint8Array(size * size * 4);
  const per = 8;
  const H = new Float32Array(size * size);
  const F = new Float32Array(size * size);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const u = x / size * per, v = y / size * per;
    // keskin tepeli (ridged) dalgacıklar
    const a = pfbm(u, v, per, 5, 101);
    const r = 1 - Math.abs(a - 0.5) * 2;
    H[y * size + x] = r * 0.65 + pfbm(u * 2, v * 2, per * 2, 3, 55) * 0.35;
    F[y * size + x] = pfbm(u * 2, v * 2, per * 2, 5, 909);
  }
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const i = y * size + x;
    const hx = H[y * size + ((x + 1) % size)] - H[y * size + ((x - 1 + size) % size)];
    const hy = H[((y + 1) % size) * size + x] - H[((y - 1 + size) % size) * size + x];
    data[i * 4] = clamp(128 + hx * 400, 0, 255);
    data[i * 4 + 1] = clamp(128 + hy * 400, 0, 255);
    data[i * 4 + 2] = clamp(H[i] * 255, 0, 255);
    data[i * 4 + 3] = clamp(F[i] * 255, 0, 255);
  }
  const t = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.minFilter = THREE.LinearMipmapLinearFilter; t.magFilter = THREE.LinearFilter;
  t.generateMipmaps = true; t.anisotropy = 8;
  t.needsUpdate = true;
  return t;
}

export function makeGlow(size = 128, inner = 0.0) {
  const cv = canvas(size, size), g = cv.getContext('2d');
  const gr = g.createRadialGradient(size / 2, size / 2, size * inner, size / 2, size / 2, size / 2);
  gr.addColorStop(0, 'rgba(255,255,255,1)');
  gr.addColorStop(0.15, 'rgba(255,255,255,0.55)');
  gr.addColorStop(0.4, 'rgba(255,255,255,0.14)');
  gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.fillRect(0, 0, size, size);
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; return t;
}

export function makeFlag() {
  const w = 384, h = 256;
  const cv = canvas(w, h), g = cv.getContext('2d');
  g.fillStyle = '#c4121f'; g.fillRect(0, 0, w, h);
  g.fillStyle = '#fff';
  g.beginPath(); g.arc(h * 0.5 + 10, h / 2, h * 0.25, 0, Math.PI * 2); g.fill();
  g.fillStyle = '#c4121f';
  g.beginPath(); g.arc(h * 0.5 + 24, h / 2, h * 0.2, 0, Math.PI * 2); g.fill();
  // yıldız
  g.fillStyle = '#fff'; g.beginPath();
  const cx = h * 0.5 + 118, cy = h / 2, R = h * 0.115;
  for (let i = 0; i < 5; i++) {
    const a = -Math.PI / 2 + i * 4 * Math.PI / 5;
    const x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R;
    i ? g.lineTo(x, y) : g.moveTo(x, y);
  }
  g.closePath(); g.fill();
  return toTex(cv);
}

// Çatı kiremiti
export function makeTiles(size = 256) {
  const cv = canvas(size, size), g = cv.getContext('2d');
  const rnd = mulberry32(88);
  g.fillStyle = '#5a3a30'; g.fillRect(0, 0, size, size);
  const rows = 16, cols = 12, rh = size / rows, cw = size / cols;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const t = (rnd() - 0.5) * 40;
    g.fillStyle = `rgb(${112 + t},${64 + t * 0.6},${48 + t * 0.5})`;
    g.fillRect(c * cw + (r % 2) * cw / 2, r * rh, cw - 1.5, rh - 1.5);
    g.fillRect(c * cw + (r % 2) * cw / 2 - cw, r * rh, cw - 1.5, rh - 1.5);
  }
  return toTex(cv);
}
