import * as THREE from 'three';
import { STATUE_Y, S } from './shape.js';

const D = Math.PI / 180;
// orbit helper: azimuth from +x (east) towards +z (south), degrees
const orb = (az, r, y, cx = 0, cz = 0) => [cx + Math.cos(az * D) * r, y, cz + Math.sin(az * D) * r];
const face = [4.4, 47, 0];
const mid = [0, STATUE_Y + 18, 0];

// t, position, target, fov, hour
export const KEYS = [
  { t: 0,   p: orb(182, 1150, 20),   q: [0, 38, 0],        fov: 24, h: 5.72 },
  { t: 8,   p: orb(184, 780, 12, 0, 20),   q: [0, 40, 0],  fov: 26, h: 5.98 },
  { t: 15,  p: orb(190, 330, 5, 0, 20),    q: [0, 40, 0],  fov: 34, h: 6.25 },
  { t: 22,  p: orb(150, 118, 12),    q: [-2, 26, 0],       fov: 44, h: 6.8 },
  { t: 30,  p: orb(100, 92, 32),     q: [0, 30, 0],        fov: 40, h: 7.5 },
  { t: 37,  p: orb(52, 76, 50),      q: [4, 42, 0],        fov: 34, h: 8.3 },
  { t: 45,  p: [38, 49, 16],         q: [4.4, 47, 0],     fov: 27, h: 9.2 },
  { t: 52,  p: [20, 46, 38],         q: [11, 44, 5],     fov: 32, h: 10.1 },
  { t: 59,  p: [25, 47, 27],         q: [13, 42.8, 7],   fov: 19, h: 11.0 },
  { t: 65,  p: [46, 46, 24],         q: [15, 40, 0],       fov: 40, h: 12.0 },
  { t: 73,  p: [12.5, 43.2, -1.6],   q: [500, 36, 140],    fov: 64, h: 13.3 },
  { t: 81,  p: orb(60, 170, 78),     q: [0, 30, 0],        fov: 36, h: 15.4 },
  { t: 91,  p: orb(-8, 150, 44),     q: [0, 36, 0],        fov: 34, h: 17.55 },
  { t: 99,  p: orb(-52, 190, 52),    q: [0, 36, 0],        fov: 32, h: 18.7 },
  { t: 107, p: orb(-90, 300, 66),    q: [0, 38, 0],        fov: 30, h: 20.4 },
  { t: 116, p: orb(-118, 520, 110),  q: [0, 40, 0],        fov: 30, h: 21.8 },
];
export const DURATION = KEYS[KEYS.length - 1].t;

export const CHAPTERS = [
  { t: 0,  id: 'steppe', num: '01' },
  { t: 15, id: 'scale',  num: '02' },
  { t: 37, id: 'gaze',   num: '03' },
  { t: 49, id: 'whip',   num: '04' },
  { t: 63, id: 'deck',   num: '05' },
  { t: 79, id: 'dusk',   num: '06' },
];
export const chapterAt = (t) => { let c = CHAPTERS[0]; for (const x of CHAPTERS) if (t >= x.t) c = x; return c; };

function hermite(a, b, ma, mb, u, dt) {
  const u2 = u * u, u3 = u2 * u;
  return (2 * u3 - 3 * u2 + 1) * a + (u3 - 2 * u2 + u) * dt * ma + (-2 * u3 + 3 * u2) * b + (u3 - u2) * dt * mb;
}
function tangent(i, get) {
  const n = KEYS.length;
  if (i <= 0 || i >= n - 1) return 0;
  return (get(KEYS[i + 1]) - get(KEYS[i - 1])) / (KEYS[i + 1].t - KEYS[i - 1].t);
}
function chan(t, get) {
  t = Math.min(Math.max(t, 0), DURATION);
  let i = 0; while (i < KEYS.length - 2 && t > KEYS[i + 1].t) i++;
  const k0 = KEYS[i], k1 = KEYS[i + 1], dt = k1.t - k0.t, u = (t - k0.t) / dt;
  return hermite(get(k0), get(k1), tangent(i, get), tangent(i + 1, get), u, dt);
}
export function sample(t, out) {
  for (let a = 0; a < 3; a++) {
    out.pos[['x', 'y', 'z'][a]] = chan(t, (k) => k.p[a]);
    out.tgt[['x', 'y', 'z'][a]] = chan(t, (k) => k.q[a]);
  }
  out.fov = chan(t, (k) => k.fov);
  out.hour = chan(t, (k) => k.h);
  return out;
}

// explore-mode quick views
export const VIEWS = {
  overview: { p: orb(-38, 210, 75), q: [0, 30, 0], fov: 40 },
  face:     { p: orb(28, 34, 48),  q: face, fov: 30 },
  whip:     { p: [20, 46, 34], q: [12, 43, 6], fov: 26 },
  columns:  { p: orb(70, 62, 9), q: [0, 14, 0], fov: 50 },
  head:     { p: [12.5, 43.2, -1.6], q: [500, 36, 140], fov: 64 },
  side:     { p: orb(90, 130, 34), q: [0, 30, 0], fov: 36 },
};
