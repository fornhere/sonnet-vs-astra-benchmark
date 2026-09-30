import * as THREE from 'three';
import { WORLD, RES, CELL, HALF, POIS } from './config.js';
import { U, NOISE, ATMOS, HEIGHT_FN, SHADOW_FN } from './glsl.js';
import { TUFF_FN } from './terrain.js';
import { rng, noise2, noise3, fbm2, smooth, CellGrid, SpatialHash } from './util.js';

// ---- profil noktaları (yarıçap, yükseklik), yükseklik 0..1 ----
const PROFILES = [
  { // 0: şapkalı klasik peribacası
    pts: [[0.64, 0], [0.55, 0.035], [0.40, 0.14], [0.29, 0.32], [0.225, 0.52], [0.195, 0.70], [0.175, 0.775], [0.20, 0.808], [0.34, 0.822], [0.385, 0.85], [0.365, 0.895], [0.29, 0.945], [0.15, 0.985], [0, 1]],
    capY: 0.81, r: 0.385,
  },
  { // 1: sivri, şapkasız iğne
    pts: [[0.70, 0], [0.54, 0.06], [0.37, 0.22], [0.27, 0.45], [0.19, 0.68], [0.125, 0.86], [0.065, 0.955], [0, 1]],
    capY: 2, r: 0.7,
  },
  { // 2: mantar / deve kaya (kalın başlıklı)
    pts: [[0.74, 0], [0.56, 0.05], [0.37, 0.19], [0.31, 0.40], [0.30, 0.56], [0.33, 0.64], [0.46, 0.685], [0.58, 0.72], [0.60, 0.79], [0.52, 0.90], [0.32, 0.968], [0, 1]],
    capY: 0.66, r: 0.74,
  },
  { // 3: yuvarlak tepeli geniş tüf konisi
    pts: [[0.95, 0], [0.80, 0.05], [0.58, 0.20], [0.42, 0.44], [0.31, 0.66], [0.20, 0.85], [0.09, 0.96], [0, 1]],
    capY: 2, r: 0.95,
  },
];

function catmull(p0, p1, p2, p3, t) {
  const t2 = t * t, t3 = t2 * t;
  return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
}
function sampleProfile(prof, u) {
  const P = prof.pts, n = P.length - 1;
  const f = Math.min(Math.max(u, 0), 1) * n;
  const i = Math.min(Math.floor(f), n - 1), t = f - i;
  const g = (k) => P[Math.min(Math.max(k, 0), n)];
  return [catmull(g(i - 1)[0], g(i)[0], g(i + 1)[0], g(i + 2)[0], t), catmull(g(i - 1)[1], g(i)[1], g(i + 1)[1], g(i + 2)[1], t)];
}

function chimneyPos(prof, u, th, seed, out) {
  let [r0, y] = sampleProfile(prof, u);
  const cx = Math.cos(th), sz = Math.sin(th);
  const cap = y > prof.capY;
  const n1 = noise3(cx * 1.4 + seed, y * 2.6, sz * 1.4 + seed * 0.7);
  const fl = noise3(cx * 5.0 + seed * 3, y * 0.9, sz * 5.0 + seed);
  const n3 = noise3(cx * 3.0 + seed * 5, y * 7.0, sz * 3.0);
  let k = 1 + 0.20 * (n1 - 0.5) * 2 + (cap ? 0.05 : 0.10) * (fl - 0.5) * 2 + 0.035 * (n3 - 0.5) * 2;
  // gövdenin altı hafif düzensiz genişler
  k *= 1 + 0.10 * (1 - smooth(0, 0.22, y)) * (n1 - 0.5);
  const r = Math.max(0, r0) * k;
  out[0] = r * cx; out[1] = y + (cap ? 0 : 0.02 * (fl - 0.5) * 0); out[2] = r * sz;
  return out;
}

function buildGeometry(prof, seed, S, R) {
  const pos = [], nor = [], uv = [], cap = [], idx = [];
  const p = [0, 0, 0], a = [0, 0, 0], b = [0, 0, 0];
  const eu = 1 / (R * 6), et = 0.01;
  for (let j = 0; j <= R; j++) {
    const u = j / R;
    for (let i = 0; i <= S; i++) {
      const th = (i / S) * Math.PI * 2;
      chimneyPos(prof, u, th, seed, p);
      pos.push(p[0], p[1], p[2]);
      const u1 = Math.min(1, u + eu), u0 = Math.max(0, u - eu);
      chimneyPos(prof, u1, th, seed, a); const ax = a[0], ay = a[1], az = a[2];
      chimneyPos(prof, u0, th, seed, a);
      const dux = ax - a[0], duy = ay - a[1], duz = az - a[2];
      chimneyPos(prof, u, th + et, seed, a); const tx = a[0], ty = a[1], tz = a[2];
      chimneyPos(prof, u, th - et, seed, b);
      const dtx = tx - b[0], dty = ty - b[1], dtz = tz - b[2];
      // n = dP/du x dP/dtheta
      let nx = duy * dtz - duz * dty, ny = duz * dtx - dux * dtz, nz = dux * dty - duy * dtx;
      let l = Math.hypot(nx, ny, nz) || 1;
      if (j === R) { nx = 0; ny = 1; nz = 0; l = 1; }
      nor.push(nx / l, ny / l, nz / l);
      uv.push(i / S, u);
      cap.push(p[1] > prof.capY ? 1 : 0);
    }
  }
  for (let j = 0; j < R; j++) for (let i = 0; i < S; i++) {
    const a0 = j * (S + 1) + i, b0 = a0 + 1, c0 = a0 + S + 1, d0 = c0 + 1;
    idx.push(a0, b0, c0, b0, d0, c0);
  }
  // sarım yönünü doğrula
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  g.setAttribute('aUV', new THREE.Float32BufferAttribute(uv, 2));
  g.setAttribute('aCap', new THREE.Float32BufferAttribute(cap, 1));
  g.setIndex(idx);
  // test: ilk üçgenin geometrik normali vertex normalı ile aynı yönde mi
  const i0 = idx[0], i1 = idx[1], i2 = idx[2];
  const v0 = new THREE.Vector3(pos[i0 * 3], pos[i0 * 3 + 1], pos[i0 * 3 + 2]);
  const v1 = new THREE.Vector3(pos[i1 * 3], pos[i1 * 3 + 1], pos[i1 * 3 + 2]);
  const v2 = new THREE.Vector3(pos[i2 * 3], pos[i2 * 3 + 1], pos[i2 * 3 + 2]);
  const gn = new THREE.Vector3().crossVectors(v1.clone().sub(v0), v2.clone().sub(v0));
  const vn = new THREE.Vector3(nor[i0 * 3], nor[i0 * 3 + 1], nor[i0 * 3 + 2]);
  if (gn.dot(vn) < 0) {
    for (let k = 0; k < idx.length; k += 3) { const t = idx[k + 1]; idx[k + 1] = idx[k + 2]; idx[k + 2] = t; }
    g.setIndex(idx);
  }
  g.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0.5, 0), 1.3);
  return g;
}

// yarıçaptan tepe yüksekliği tablosu (gölge damgası için)
function buildTopLUT(prof) {
  const K = 24, lut = new Float32Array(K + 1);
  const steps = 400;
  for (let k = 0; k <= K; k++) lut[k] = -1;
  for (let s = 0; s <= steps; s++) {
    const [r, y] = sampleProfile(prof, s / steps);
    const bin = Math.floor((Math.max(r, 0) / prof.r) * K);
    for (let k = 0; k <= Math.min(bin, K); k++) lut[k] = Math.max(lut[k], y);
  }
  return lut;
}

const CH_VERT = /* glsl */ `
attribute vec2 aUV; attribute float aCap; attribute vec4 aInst;
varying vec3 vWorld; varying vec3 vN; varying vec2 vUV; varying float vCap; varying vec4 vInst; varying vec3 vLocal;
void main(){
  mat4 M = modelMatrix * instanceMatrix;
  vec4 wp = M * vec4(position, 1.0);
  vec3 s = vec3(length(M[0].xyz), length(M[1].xyz), length(M[2].xyz));
  vN = normalize(mat3(M) * (normal / (s*s)));
  vWorld = wp.xyz; vUV = aUV; vCap = aCap; vInst = aInst;
  vLocal = position * s;
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`;

const CH_FRAG = /* glsl */ `
${NOISE}
${ATMOS}
${HEIGHT_FN}
${SHADOW_FN}
${TUFF_FN}
varying vec3 vWorld; varying vec3 vN; varying vec2 vUV; varying float vCap; varying vec4 vInst; varying vec3 vLocal;

float archSDF(vec2 p, float w, float h){
  // p: merkez tabanda, y yukarı. Dikdörtgen + yarım daire
  float rr = w*0.5;
  vec2 q = vec2(abs(p.x), p.y);
  float rect = max(q.x - rr, max(-q.y, q.y - (h - rr)));
  float circ = length(vec2(q.x, q.y - (h - rr))) - rr;
  return q.y > h - rr ? circ : rect;
}

void main(){
  vec3 wp = vWorld;
  vec3 N = normalize(vN);
  float dist = length(wp - cameraPosition);
  float y = vUV.y;
  float region = vInst.w;

  // --- yüzey detayı ---
  float e = 0.22;
  vec3 lp = vLocal;
  float f0 = vnoise3(lp*vec3(1.6,0.35,1.6))*0.6 + vnoise3(lp*vec3(5.0,1.0,5.0))*0.4;
  float dfade = 1.0 - smoothstep(60.0, 300.0, dist);
  if (dfade > 0.0) {
    float fx = vnoise3((lp+vec3(e,0,0))*vec3(1.6,0.35,1.6))*0.6 + vnoise3((lp+vec3(e,0,0))*vec3(5.0,1.0,5.0))*0.4;
    float fy = vnoise3((lp+vec3(0,e,0))*vec3(1.6,0.35,1.6))*0.6 + vnoise3((lp+vec3(0,e,0))*vec3(5.0,1.0,5.0))*0.4;
    float fz = vnoise3((lp+vec3(0,0,e))*vec3(1.6,0.35,1.6))*0.6 + vnoise3((lp+vec3(0,0,e))*vec3(5.0,1.0,5.0))*0.4;
    vec3 g = vec3(fx-f0, fy-f0, fz-f0)/e;
    g -= N*dot(g,N);
    N = normalize(N - g*0.35*dfade);
  }

  // --- albedo: dünya yüksekliğine göre tüf katmanları ---
  float warp = gnoise(wp.xz*0.006)*3.0;
  float bp = (wp.y + warp) / 3.3;
  float bi = floor(bp), bf = fract(bp);
  float rg = floor(region*4.0);
  vec3 c1 = strataColor(hash12(vec2(bi, rg)), region);
  vec3 c2 = strataColor(hash12(vec2(bi+1.0, rg)), region);
  vec3 col = mix(c1, c2, smoothstep(0.78, 1.0, bf));
  col *= 0.80 + 0.28*vInst.y;
  col *= mix(vec3(1.0), vec3(1.06,0.94,0.86), vInst.x);
  float streak = vnoise3(vec3(lp.x*2.4, lp.y*0.3, lp.z*2.4));
  col *= 0.8 + 0.36*streak;
  col *= 0.85 + 0.3*f0;
  // başlık: koyu bazalt/ignimbrit
  float capMask = smoothstep(0.35, 0.65, vCap) ;
  vec3 capCol = vec3(0.14,0.10,0.08) * (0.7 + 0.8*vnoise3(lp*vec3(3.0,3.0,3.0)));
  capCol = mix(capCol, vec3(0.26,0.19,0.14), 0.5*vnoise3(lp*1.3));
  col = mix(col, capCol, capMask);
  // dipte toprakla karış
  vec3 soil = vec3(0.34,0.26,0.18);
  col = mix(soil, col, smoothstep(0.0, 0.11, y));

  // --- kaya evleri / pencereler ---
  if (vInst.z > 0.5 && vCap < 0.5 && y > 0.05 && y < 0.72 && dist < 700.0) {
    float th = atan(lp.z, lp.x);
    float rad = max(length(lp.xz), 0.4);
    float arc = th * rad;
    vec2 cellSz = vec2(2.4, 3.2);
    vec2 cp = vec2(arc, lp.y + 0.7*sin(th*3.0)) / cellSz;
    vec2 ci = floor(cp), cf = fract(cp);
    float hh = hash12(ci + floor(vInst.x*97.0));
    if (hh < 0.22 * vInst.z) {
      vec2 lpx = (cf - vec2(0.5, 0.12)) * cellSz;
      float w = 0.85 + 0.5*hash12(ci+3.0), h = 1.2 + 0.9*hash12(ci+7.0);
      float sd = archSDF(lpx, w, h);
      float inside = 1.0 - smoothstep(-0.02, 0.05, sd);
      float lip = (1.0 - smoothstep(0.0, 0.16, sd)) * (1.0 - inside);
      vec3 hole = vec3(0.012,0.009,0.008) + vec3(0.04,0.03,0.02)*smoothstep(0.5,-0.4,lpx.y)*0.4;
      col = mix(col, col*1.12 + 0.02, lip*0.55);
      col = mix(col, hole, inside);
      N = normalize(mix(N, normalize(N + vec3(0,0.0,0)), 0.0));
    }
  }

  // --- ışık ---
  float NdL = max(dot(N, uLightDir), 0.0);
  float sh = 1.0;
  if (NdL > 0.0 && dist < 4200.0) sh = sunShadow(wp + N*0.4, 5.5);
  float bs = balloonShadow(wp);
  float ao = mix(0.55, 1.0, smoothstep(0.0, 0.2, y));
  ao *= 1.0 - 0.35*smoothstep(0.65, 0.83, y) * (1.0 - vCap) * 0.0;
  vec3 amb = mix(uAmbGround, uAmbSky, N.y*0.5+0.5) * ao;
  vec3 bounce = uLightColor * 0.05 * ao * vec3(1.0,0.62,0.4) * (1.0 - N.y);
  vec3 lit = col * (uLightColor*NdL*sh*bs + amb + bounce);
  gl_FragColor = vec4(applyFog(lit, wp), 1.0);
}
`;

export function makeChimneyMaterial() {
  return new THREE.ShaderMaterial({ uniforms: { ...U }, vertexShader: CH_VERT, fragmentShader: CH_FRAG });
}

// ------------------------------------------------------------------
// Yerleştirme
// ------------------------------------------------------------------
export function placeChimneys(terrain, scene) {
  const rnd = rng(20260929);
  const hash = new SpatialHash(20);
  const list = [];
  const P = (id) => POIS.find(p => p.id === id);
  const town = P('goreme'), fld = P('balon'), uch = P('uchisar');
  const boosts = POIS.filter(p => p.kind === 'valley');
  const tmpN = new THREE.Vector3();

  const kindWeights = (poi) => {
    if (!poi) return [0.36, 0.34, 0.14, 0.16];
    if (poi.id === 'ask') return [0.24, 0.60, 0.05, 0.11];
    if (poi.id === 'devrent') return [0.22, 0.08, 0.55, 0.15];
    if (poi.id === 'pasabag') return [0.70, 0.12, 0.05, 0.13];
    if (poi.id === 'guvercinlik') return [0.26, 0.48, 0.13, 0.13];
    return [0.36, 0.34, 0.14, 0.16];
  };
  const pickType = (w, r) => r < w[0] ? 0 : r < w[0] + w[1] ? 1 : r < w[0] + w[1] + w[2] ? 2 : 3;

  const tryPlace = (x, z, type, H, forced) => {
    if (Math.abs(x) > 1780 || Math.abs(z) > 1780) return false;
    const prof = PROFILES[type];
    const Rs = H * (type === 3 ? 0.62 : type === 2 ? 0.40 : type === 1 ? 0.30 : 0.33) * (0.85 + 0.35 * rnd());
    const baseR = prof.pts[0][0] * Rs;
    const capR = prof.r * Rs;
    if (hash.anyWithin(x, z, Math.max(baseR, capR) * 0.85)) return false;
    // taban altındaki en düşük zemin
    let ymin = 1e9, ymax = -1e9;
    for (let k = 0; k < 8; k++) {
      const a = k / 8 * Math.PI * 2;
      const hh = terrain.heightAt(x + Math.cos(a) * baseR * 0.85, z + Math.sin(a) * baseR * 0.85);
      ymin = Math.min(ymin, hh); ymax = Math.max(ymax, hh);
    }
    if (!forced && ymax - ymin > baseR * 1.7) return false;   // çok dik
    const y0 = ymin - 0.15 - Math.min(ymax - ymin, 3) * 0.05;
    const yaw = rnd() * Math.PI * 2;
    const lean = (rnd() - 0.5) * 0.09;
    const leanDir = rnd() * Math.PI * 2;
    const region = terrain.regionAt(x, z);
    list.push({ x, z, y0, type, H, Rs, yaw, lean, leanDir, seed: rnd(), tone: rnd(), region, dwell: (rnd() < 0.34 && H > 11) ? 0.6 + rnd() * 0.6 : 0 });
    hash.add(x, z, Math.max(baseR * 0.9, capR * 0.75), null);
    return true;
  };

  const target = 3200;   // ana yerleşim hedefi; gruplar ayrıca eklenir
  const CAND = 500000;
  for (let n = 0; n < CAND && list.length < target; n++) {
    const x = (rnd() * 2 - 1) * 1740, z = (rnd() * 2 - 1) * 1740;
    const nn = terrain.normalAt(x, z, tmpN);
    const slope = 1 - nn.y;
    const green = terrain.greenAt(x, z);
    // kasaba ve balon alanında yok
    if (Math.hypot(x - town.x, z - town.z) < town.r * 0.7) continue;
    if (Math.hypot(x - fld.x, z - fld.z) < fld.r * 0.9) continue;
    let s = Math.max(smooth(0.04, 0.16, slope), 0.28 * smooth(0.0, 0.05, slope + 0.02)) * (1 - smooth(0.4, 0.62, slope));
    // vadi tabanı: yeşil alan az
    s *= 1 - 0.85 * smooth(0.35, 0.8, green);
    let boost = 1, poi = null;
    for (const b of boosts) { const d = Math.hypot(x - b.x, z - b.z); if (d < b.r * 1.15) { const w = 1 - d / (b.r * 1.15); if (w * 6 > boost) { boost = 1 + w * 7; poi = b; } } }
    const patch = smooth(0.38, 0.72, fbm2(x * 0.0042 + 3, z * 0.0042 + 9, 3));
    const uD = Math.hypot(x - uch.x, z - uch.z);
    if (uD < 150) continue;
    if (poi) s = Math.max(s, 0.25 * smooth(0.0, 0.08, slope) * (1 - smooth(0.4, 0.62, slope)) * (1 - green * 0.9)); // POI'de düz zeminde de
    const p = s * (0.18 + patch * 0.95) * boost * 0.22;
    if (rnd() > p) continue;
    const w = kindWeights(poi);
    const type = pickType(w, rnd());
    let H = type === 1 ? 7 + Math.pow(rnd(), 1.4) * 20 : type === 2 ? 5 + rnd() * 10 : type === 3 ? 5 + rnd() * 9 : 6 + Math.pow(rnd(), 1.3) * 17;
    if (poi && poi.id === 'ask') H *= 1.25;
    if (poi && poi.id === 'devrent') H *= 0.9;
    // güneş yönüne doğru değil; küçük gruplar
    if (tryPlace(x, z, type, H, false)) {
      const grp = poi ? (rnd() < 0.55 ? 3 : 1) : (rnd() < 0.3 ? 2 : 0);
      for (let g = 0; g < grp; g++) {
        const a = rnd() * Math.PI * 2, d = H * (0.28 + 0.35 * rnd()) + 4;
        const t2 = poi && poi.id === 'pasabag' ? 0 : (rnd() < 0.6 ? type : (rnd() < 0.5 ? 0 : 1));
        tryPlace(x + Math.cos(a) * d, z + Math.sin(a) * d, t2, H * (0.45 + 0.5 * rnd()), false);
      }
    }
  }
  // serbest gruplar: her yerde küçük peribacası koruları
  const groveSeeds = [];
  for (let g = 0; g < 110; g++) groveSeeds.push([(rnd() * 2 - 1) * 1650, (rnd() * 2 - 1) * 1650]);
  groveSeeds.push([150, 300], [-40, 240], [260, 330], [90, 420], [-150, 520], [-260, 470]);
  for (const [gx, gz] of groveSeeds) {
    if (Math.hypot(gx - town.x, gz - town.z) < town.r * 0.85) continue;
    if (Math.hypot(gx - fld.x, gz - fld.z) < fld.r) continue;
    if (Math.hypot(gx - uch.x, gz - uch.z) < 190) continue;
    if (terrain.greenAt(gx, gz) > 0.55) continue;
    if (terrain.slopeAt(gx, gz) > 0.4) continue;
    const kind = rnd();
    const n = 5 + Math.floor(rnd() * 16), R = 22 + rnd() * 46;
    const poi = boosts.find(b => Math.hypot(gx - b.x, gz - b.z) < b.r * 1.1) || null;
    const w = kindWeights(poi);
    for (let k = 0; k < n * 4 && k < n * 4; k++) {
      const a = rnd() * Math.PI * 2, d = Math.sqrt(rnd()) * R;
      const x = gx + Math.cos(a) * d, z = gz + Math.sin(a) * d;
      const type = pickType(w, rnd());
      const Hh = (type === 1 ? 6 + Math.pow(rnd(), 1.4) * 17 : type === 2 ? 4.5 + rnd() * 9 : type === 3 ? 4 + rnd() * 8 : 5.5 + Math.pow(rnd(), 1.3) * 14) * (0.55 + 0.8 * (1 - d / R));
      tryPlace(x, z, type, Hh, false);
    }
  }
  return list;
}

// gölge yükseklik haritasına peribacalarını damgala
export function stampShadow(terrain, list) {
  const SH = new Float32Array(terrain.H); // kopya
  const luts = PROFILES.map(buildTopLUT);
  for (const c of list) {
    const prof = PROFILES[c.type], lut = luts[c.type];
    const R = prof.r * c.Rs * 1.02;
    const i0 = Math.floor((c.x - R + HALF) / CELL), i1 = Math.ceil((c.x + R + HALF) / CELL);
    const j0 = Math.floor((c.z - R + HALF) / CELL), j1 = Math.ceil((c.z + R + HALF) / CELL);
    for (let j = j0; j <= j1; j++) {
      if (j < 0 || j >= RES) continue;
      for (let i = i0; i <= i1; i++) {
        if (i < 0 || i >= RES) continue;
        const wx = -HALF + (i + 0.5) * CELL, wz = -HALF + (j + 0.5) * CELL;
        const rr = Math.hypot(wx - c.x, wz - c.z) / c.Rs / prof.r;
        if (rr > 1) continue;
        const yl = lut[Math.min(24, Math.floor(rr * 24))];
        if (yl < 0) continue;
        const top = c.y0 + yl * c.H;
        const k = j * RES + i;
        if (top > SH[k]) SH[k] = top;
      }
    }
  }
  return SH;
}

// Hücre başına örneklenmiş mesh'ler
export function buildChimneyMeshes(list, scene) {
  const mat = makeChimneyMaterial();
  const geos = PROFILES.map((p, i) => buildGeometry(p, 3.7 + i * 5.1, 22, 20));
  const grid = new CellGrid(WORLD, 8);
  for (const c of list) grid.add(c.x, c.z, c);
  const group = new THREE.Group();
  const meshes = [];
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), qa = new THREE.Quaternion(), e = new THREE.Euler();
  const pos = new THREE.Vector3(), scl = new THREE.Vector3(), axis = new THREE.Vector3();
  for (let k = 0; k < grid.items.length; k++) {
    const items = grid.items[k]; if (!items.length) continue;
    for (let t = 0; t < PROFILES.length; t++) {
      const sub = items.filter(c => c.type === t); if (!sub.length) continue;
      const base = geos[t];
      const g = new THREE.InstancedBufferGeometry();
      g.index = base.index; g.attributes = { ...base.attributes };
      g.boundingSphere = base.boundingSphere;
      const inst = new Float32Array(sub.length * 4);
      const mesh = new THREE.InstancedMesh(g, mat, sub.length);
      sub.forEach((c, i) => {
        q.setFromAxisAngle(axis.set(0, 1, 0), c.yaw);
        qa.setFromAxisAngle(axis.set(Math.cos(c.leanDir), 0, Math.sin(c.leanDir)).cross(new THREE.Vector3(0, 1, 0)).normalize(), c.lean);
        q.premultiply(qa);
        pos.set(c.x, c.y0, c.z);
        scl.set(c.Rs, c.H, c.Rs);
        m4.compose(pos, q, scl);
        mesh.setMatrixAt(i, m4);
        inst[i * 4] = c.seed; inst[i * 4 + 1] = c.tone; inst[i * 4 + 2] = c.dwell; inst[i * 4 + 3] = c.region;
      });
      g.setAttribute('aInst', new THREE.InstancedBufferAttribute(inst, 4));
      mesh.instanceMatrix.needsUpdate = true;
      mesh.computeBoundingSphere();
      mesh.frustumCulled = true;
      const [cx, cz] = grid.center(k);
      mesh.userData.cx = cx; mesh.userData.cz = cz;
      group.add(mesh); meshes.push(mesh);
    }
  }
  scene.add(group);
  return { group, meshes, geos };
}

export function chimneyCollider(list) {
  const h = new SpatialHash(24);
  for (const c of list) {
    const prof = PROFILES[c.type];
    h.add(c.x, c.z, prof.pts[0][0] * c.Rs * 0.75, c);
  }
  return h;
}
