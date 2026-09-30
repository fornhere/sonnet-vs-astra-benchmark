import fs from 'fs';
import { W, D, toVox } from './frame.mjs';
import { writePNG } from './png.mjs';
export const SS = 4, FW = W * SS, FD = D * SS;
export function bresenham(bar, x0, y0, x1, y1) {
  x0 = Math.round(x0); y0 = Math.round(y0); x1 = Math.round(x1); y1 = Math.round(y1);
  const dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0), sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1; let err = dx + dy;
  for (let guard = 0; guard < 100000; guard++) {
    if (x0 >= 0 && x0 < FW && y0 >= 0 && y0 < FD) bar[y0 * FW + x0] = 1;
    if (x0 === x1 && y0 === y1) break; const e2 = 2 * err;
    if (e2 >= dy) { err += dy; x0 += sx } if (e2 <= dx) { err += dx; y0 += sy }
  }
}
export function landMask() {
  const coast = JSON.parse(fs.readFileSync('data/raw/coast.json')).elements;
  const bar = new Uint8Array(FW * FD);
  for (const w of coast) { const g = w.geometry.map(p => toVox(p.lon, p.lat).map(v => v * SS)); for (let i = 1; i < g.length; i++) bresenham(bar, g[i - 1][0], g[i - 1][1], g[i][0], g[i][1]); }
  const water = new Uint8Array(FW * FD); const stack = [];
  const seeds = [[-74.020, 40.735], [-73.960, 40.745], [-74.030, 40.680], [-73.935, 40.800], [-74.035, 40.62]];
  for (const [lo, la] of seeds) { const [fx, fn] = toVox(lo, la).map(v => Math.round(v * SS)); if (fx >= 0 && fx < FW && fn >= 0 && fn < FD && !bar[fn * FW + fx]) { stack.push(fn * FW + fx); water[fn * FW + fx] = 1; } else console.error('seed out', lo, la, fx, fn); }
  while (stack.length) { const p = stack.pop(); const x = p % FW, y = (p / FW) | 0;
    if (x > 0 && !water[p - 1] && !bar[p - 1]) { water[p - 1] = 1; stack.push(p - 1) }
    if (x < FW - 1 && !water[p + 1] && !bar[p + 1]) { water[p + 1] = 1; stack.push(p + 1) }
    if (y > 0 && !water[p - FW] && !bar[p - FW]) { water[p - FW] = 1; stack.push(p - FW) }
    if (y < FD - 1 && !water[p + FW] && !bar[p + FW]) { water[p + FW] = 1; stack.push(p + FW) } }
  const fineLand = new Uint8Array(FW * FD); for (let i = 0; i < fineLand.length; i++) fineLand[i] = water[i] ? 0 : 1;
  return fineLand;
}
if (process.argv[1].endsWith('bake1.mjs')) {
  const fl = landMask(); const img = new Uint8Array(W * D * 3);
  for (let y = 0; y < D; y++) for (let x = 0; x < W; x++) { let c = 0; for (let j = 0; j < SS; j++) for (let i = 0; i < SS; i++) c += fl[(y * SS + j) * FW + x * SS + i]; const land = c >= SS * SS / 2; const o = ((D - 1 - y) * W + x) * 3; img[o] = land ? 200 : 40; img[o + 1] = land ? 190 : 90; img[o + 2] = land ? 160 : 160; }
  writePNG('data/mask.png', W, D, img); console.error('ok');
}
