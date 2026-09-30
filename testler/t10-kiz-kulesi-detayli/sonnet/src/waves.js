// Gerstner dalga tanımı: aynı tablo hem GLSL hem CPU tarafında kullanılır
// (gemi, kamera, sıçrama parçacıkları deniz yüzeyiyle birebir uyumlu olsun diye).
import * as THREE from 'three';

// Dalganın gittiği yön (lodos: güneybatıdan kuzeydoğuya)
export const WAVE_DIR = new THREE.Vector2(0.7071, -0.7071);
export const T_SCALE = 0.8;
const G = 9.81;

// [yön sapması (derece), dalga boyu (m), genlik oranı]
const DEFS = [
  [0, 72, 1.0],
  [16, 44, 0.75],
  [-24, 27, 0.5],
  [38, 16, 0.3],
  [-52, 9, 0.17],
  [66, 5, 0.09],
  [-12, 2.7, 0.05],
];
export const NW = DEFS.length;

export const WAVES = DEFS.map(([deg, L, ar]) => {
  const a = Math.atan2(WAVE_DIR.y, WAVE_DIR.x) + THREE.MathUtils.degToRad(deg);
  const k = (2 * Math.PI) / L;
  return { dx: Math.cos(a), dz: Math.sin(a), L, k, w: Math.sqrt(G * k), ar };
});

// Dinamik parametreler (environment.js her karede günceller)
export const waveState = { amp: 0.4, steep: 0.6, time: 0 };

export const WAVE_GLSL = /* glsl */`
#define NW ${NW}
const vec4 WV[NW] = vec4[NW](
${WAVES.map((w) => `  vec4(${w.dx.toFixed(5)}, ${w.dz.toFixed(5)}, ${w.k.toFixed(6)}, ${w.ar.toFixed(4)})`).join(',\n')}
);
const float WW[NW] = float[NW](${WAVES.map((w) => w.w.toFixed(5)).join(', ')});
uniform float uAmp;
uniform float uSteep;
uniform float uWaveTime;

// Yatay kayma + yükseklik
vec3 gerstnerDisp(vec2 p){
  vec3 d = vec3(0.0);
  for (int i = 0; i < NW; i++) {
    float k = WV[i].z, a = WV[i].w * uAmp;
    float Q = min(1.0, uSteep / (float(NW) * k * a + 1e-4));
    float f = k * dot(WV[i].xy, p) - WW[i] * uWaveTime;
    float c = cos(f), s = sin(f);
    d.x += Q * a * WV[i].x * c;
    d.z += Q * a * WV[i].y * c;
    d.y += a * s;
  }
  return d;
}
`;

function Qof(i) {
  const w = WAVES[i], a = w.ar * waveState.amp;
  return Math.min(1, waveState.steep / (NW * w.k * a + 1e-4));
}

function disp(px, pz, t, out) {
  let dx = 0, dz = 0, dy = 0;
  for (let i = 0; i < NW; i++) {
    const w = WAVES[i], a = w.ar * waveState.amp;
    const Q = Qof(i);
    const f = w.k * (w.dx * px + w.dz * pz) - w.w * t;
    const c = Math.cos(f);
    dx += Q * a * w.dx * c; dz += Q * a * w.dz * c; dy += a * Math.sin(f);
  }
  out.x = dx; out.y = dy; out.z = dz;
  return out;
}

const _d = new THREE.Vector3();
// Dünya koordinatındaki (x,z) noktasında su yüksekliği
export function heightAt(x, z, timeSec) {
  const t = timeSec * T_SCALE;
  let px = x, pz = z;
  for (let it = 0; it < 3; it++) {
    disp(px, pz, t, _d);
    px = x - _d.x; pz = z - _d.z;
  }
  return _d.y;
}
