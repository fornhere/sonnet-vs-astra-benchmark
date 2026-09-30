// İstanbul: Üsküdar (doğu kıyısı, Kız Kulesi'nin hemen arkası) ve Sarayburnu / Sultanahmet
// silueti (kuzeybatı). Karanlıkta ışık noktaları, camiler ve minareler; şimşekte belirir.
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { U } from './uniforms.js';
import { COMMON_UNIFORMS, NOISE } from './shaders/chunks.js';
import { Q } from './config.js';
import { mulberry32, fbm2, smoothstep, clamp } from './util/rng.js';

const SHORE_X = 258;

function shoreX(z) { return SHORE_X + 16 * Math.sin(z * 0.0042) + 9 * Math.sin(z * 0.0113 + 1.3); }

export function uskudarHeight(x, z) {
  const x0 = shoreX(z);
  const d = x - x0;
  if (d < 0) return -6;
  const emb = 3.4;
  const hills = 130 * Math.pow(smoothstep(30, 950, d), 1.1) * (0.65 + 0.7 * fbm2(x * 0.0016, z * 0.0016, 4, 7));
  const detail = 9 * (fbm2(x * 0.011, z * 0.011, 3, 3) - 0.5);
  return emb + hills + detail * smoothstep(20, 200, d) + (d < 10 ? -1.2 * (1 - d / 10) : 0);
}

// ---- Cami ve minare kurucusu ----
function minaret(x, z, h, base, out) {
  const parts = [];
  const sq = new THREE.BoxGeometry(base * 1.7, h * 0.11, base * 1.7); sq.translate(0, h * 0.055, 0); parts.push(sq);
  const shaft = new THREE.CylinderGeometry(base * 0.62, base * 0.78, h * 0.6, 14); shaft.translate(0, h * 0.11 + h * 0.3, 0); parts.push(shaft);
  const bal = new THREE.CylinderGeometry(base * 1.25, base * 1.0, h * 0.045, 14); bal.translate(0, h * 0.68, 0); parts.push(bal);
  const rail = new THREE.CylinderGeometry(base * 1.25, base * 1.25, h * 0.028, 14, 1, true); rail.translate(0, h * 0.7, 0); parts.push(rail);
  const shaft2 = new THREE.CylinderGeometry(base * 0.5, base * 0.6, h * 0.16, 14); shaft2.translate(0, h * 0.78, 0); parts.push(shaft2);
  const cone = new THREE.ConeGeometry(base * 0.62, h * 0.2, 14); cone.translate(0, h * 0.9, 0); parts.push(cone);
  const spire = new THREE.CylinderGeometry(base * 0.04, base * 0.06, h * 0.08, 5); spire.translate(0, h * 1.03, 0); parts.push(spire);
  const g = mergeGeometries(parts.map((p) => p.toNonIndexed()));
  g.translate(x, 0, z);
  out.push(g);
}

function dome(x, y, z, r, out, squash = 0.85) {
  const g = new THREE.SphereGeometry(r, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2);
  g.scale(1, squash, 1);
  g.translate(x, y, z);
  out.push(g.toNonIndexed());
}

/** Klasik Osmanlı külliyesi: büyük kubbe + yarım kubbeler + minareler + avlu */
function mosque({ x, z, y = 0, r = 10, minarets = 2, mh = 40, rot = 0, halfDomes = 4, court = true, scaleY = 1 }) {
  const parts = [];
  const body = new THREE.BoxGeometry(r * 2.1, r * 1.0, r * 2.1); body.translate(0, r * 0.5, 0); parts.push(body.toNonIndexed());
  const drum = new THREE.CylinderGeometry(r * 0.98, r * 1.02, r * 0.36, 24); drum.translate(0, r * 1.18, 0); parts.push(drum.toNonIndexed());
  dome(0, r * 1.36, 0, r, parts, 0.92);
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  for (let i = 0; i < Math.min(halfDomes, 4); i++) {
    const [dx, dz] = dirs[i];
    const hd = new THREE.SphereGeometry(r * 0.62, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2);
    hd.scale(1, 0.85, 1); hd.translate(dx * r * 1.35, r * 0.95, dz * r * 1.35); parts.push(hd.toNonIndexed());
  }
  // köşe küçük kubbeler
  for (const [dx, dz] of [[1, 1], [-1, 1], [1, -1], [-1, -1]]) {
    const sd = new THREE.SphereGeometry(r * 0.26, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2);
    sd.translate(dx * r * 0.95, r * 1.0, dz * r * 0.95); parts.push(sd.toNonIndexed());
  }
  if (court) {
    const c = new THREE.BoxGeometry(r * 1.9, r * 0.32, r * 1.5); c.translate(0, r * 0.16, r * 2.2); parts.push(c.toNonIndexed());
    for (const dx of [-0.8, -0.4, 0, 0.4, 0.8]) {
      const cd = new THREE.SphereGeometry(r * 0.22, 8, 5, 0, Math.PI * 2, 0, Math.PI / 2); cd.translate(dx * r * 0.9, r * 0.32, r * 2.2); parts.push(cd.toNonIndexed());
    }
  }
  const mins = [];
  const mpos = minarets === 1 ? [[r * 1.15, r * 1.6]] : minarets === 2 ? [[-r * 1.1, r * 1.05], [r * 1.1, r * 1.05]]
    : minarets === 4 ? [[-r * 1.2, -r * 1.2], [r * 1.2, -r * 1.2], [-r * 1.2, r * 1.2], [r * 1.2, r * 1.2]]
    : [[-r * 1.2, -r * 1.2], [r * 1.2, -r * 1.2], [-r * 1.2, r * 1.2], [r * 1.2, r * 1.2], [-r * 1.0, r * 2.9], [r * 1.0, r * 2.9]];
  mpos.forEach((p, i) => minaret(p[0], p[1], mh * (minarets === 6 && i >= 4 ? 0.78 : 1), Math.max(0.9, r * 0.11), mins));
  const g = mergeGeometries([...parts, ...mins.map((m) => m.index ? m.toNonIndexed() : m)]);
  g.scale(1, scaleY, 1);
  g.rotateY(rot);
  g.translate(x, y, z);
  return g;
}

function terrainPatch(x0, x1, z0, z1, nx, nz, heightFn, colorFn) {
  const g = new THREE.PlaneGeometry(x1 - x0, z1 - z0, nx, nz);
  g.rotateX(-Math.PI / 2);
  g.translate((x0 + x1) / 2, 0, (z0 + z1) / 2);
  const p = g.attributes.position;
  const col = new Float32Array(p.count * 3);
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), z = p.getZ(i);
    const h = heightFn(x, z);
    p.setY(i, h);
    const c = colorFn(x, z, h);
    col[i * 3] = c[0]; col[i * 3 + 1] = c[1]; col[i * 3 + 2] = c[2];
  }
  g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  g.computeVertexNormals();
  return g;
}

const LIGHT_VERT = /* glsl */`
attribute vec3 aColor;
attribute vec2 aSp;   // boyut(m), faz
uniform float uTime, uNightLights, uFogDensity, uPxScale, uStorm, uDay;
varying vec3 vColor;
void main(){
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  float depth = max(-mv.z, 1.0);
  float px = aSp.x * uPxScale / depth;
  float size = clamp(px, 1.6, 18.0);
  gl_PointSize = size;
  float fl = 0.88 + 0.12 * sin(uTime * (1.5 + aSp.y * 4.0) + aSp.y * 60.0);
  float fog = exp(-pow(depth * uFogDensity * 0.85, 1.5));
  // küçük noktalarda enerji koru; yakında çok parlamasın
  float e = min(1.0, px / 1.6);
  vColor = aColor * fl * uNightLights * fog * (0.45 + 0.55 * e) * (1.0 - 0.3 * uStorm);
  gl_Position = projectionMatrix * mv;
}
`;
const LIGHT_FRAG = /* glsl */`
varying vec3 vColor;
void main(){
  vec2 c = gl_PointCoord - 0.5;
  float r = length(c) * 2.0;
  float a = pow(clamp(1.0 - r, 0.0, 1.0), 1.6);
  if (a < 0.01) discard;
  gl_FragColor = vec4(vColor * a, 1.0);
}
`;


const BLD_VERT = /* glsl */`
varying vec3 vWorld;
varying vec3 vN;
varying vec3 vCol;
void main(){
  mat4 M = modelMatrix * instanceMatrix;
  vec4 wp = M * vec4(position, 1.0);
  vWorld = wp.xyz;
  vN = normalize(mat3(modelMatrix) * normalize(mat3(instanceMatrix) * normal));
  #ifdef USE_INSTANCING_COLOR
    vCol = instanceColor;
  #else
    vCol = vec3(0.08);
  #endif
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`;
const BLD_FRAG = /* glsl */`
${COMMON_UNIFORMS}
${NOISE}
varying vec3 vWorld;
varying vec3 vN;
varying vec3 vCol;
void main(){
  vec3 N = normalize(vN);
  float dist = length(vWorld - uCamPos);
  float side = 1.0 - step(0.6, abs(N.y));
  // cephe koordinatı (yüze göre yatay eksen)
  vec2 fc = vec2(dot(vWorld.xz, vec2(-N.z, N.x)), vWorld.y);
  vec2 cs = vec2(3.6, 3.3);
  vec2 cell = floor(fc / cs);
  vec2 f = fract(fc / cs);
  float win = step(0.22, f.x) * step(f.x, 0.72) * step(0.28, f.y) * step(f.y, 0.78) * side;
  float wfade = 1.0 - smoothstep(380.0, 1100.0, dist);
  float r = hash21(cell * 1.37 + floor(vWorld.x * 0.071 + vWorld.z * 0.093) * 3.1);
  float litP = mix(0.30, 0.10, smoothstep(0.0, 1.0, uDay)) * uNightLights;
  float lit = step(1.0 - litP, r) * win * wfade;
  vec3 warm = mix(vec3(2.4, 1.45, 0.62), vec3(1.5, 1.7, 2.1), step(0.9, fract(r * 13.7)));
  // ışıklandırma
  vec3 ambient = uAmbient * 2.0 + vec3(0.010, 0.012, 0.016);
  vec3 flash = vec3(0.62, 0.74, 1.0) * uFlash * (0.7 + 0.5 * N.y);
  vec3 sun = uSunColor * uSunAmt * max(dot(N, normalize(uSunDir)), 0.0) * 0.9;
  vec3 moon = vec3(0.4, 0.5, 0.8) * uMoonAmt * max(dot(N, normalize(uMoonDir)), 0.0) * 0.06;
  vec3 base = vCol * (ambient + flash + sun + moon);
  // cam: koyu, gökyüzünü hafif yansıtır
  base = mix(base, base * 0.45 + uHorizon * 0.10 + flash * 0.25, win * wfade * (1.0 - lit));
  vec3 col = base + warm * lit * (0.55 + 0.6 * hash21(cell + 9.0));
  float f2 = 1.0 - exp(-pow(dist * uFogDensity, 1.6));
  col = mix(col, uFogColor, clamp(f2, 0.0, 1.0));
  gl_FragColor = vec4(col, 1.0);
}
`;

function houseGeometry() {
  const body = new THREE.BoxGeometry(1, 1, 1); body.translate(0, 0.5, 0);
  body.deleteAttribute('uv');
  return body.toNonIndexed();
}

function buildingMaterial() {
  return new THREE.ShaderMaterial({ uniforms: { ...U }, vertexShader: BLD_VERT, fragmentShader: BLD_FRAG });
}

export class City {
  constructor(scene) {
    this.group = new THREE.Group();
    const rnd = mulberry32(1071);
    const landMat = new THREE.MeshLambertMaterial({ vertexColors: true });
    const bldMat = buildingMaterial();
    const mosqueMat = new THREE.MeshLambertMaterial({ color: 0x8d93a0, emissive: new THREE.Color(0.05, 0.036, 0.022) });
    this.mosqueMat = mosqueMat;
    this.bldMat = bldMat;

    // ---------- Üsküdar ----------
    const land = terrainPatch(shoreX(0) - 30, 2600, -3200, 3200, 90, 220, uskudarHeight,
      (x, z, h) => {
        const n = fbm2(x * 0.02, z * 0.02, 3, 2);
        return [0.05 + n * 0.05, 0.06 + n * 0.055, 0.055 + n * 0.05];
      });
    const landMesh = new THREE.Mesh(land, landMat);
    landMesh.name = 'uskudar-arazi';
    this.group.add(landMesh);

    // binalar
    const nB = Q.cityBuildings;
    const box = houseGeometry();
    const inst = new THREE.InstancedMesh(box, bldMat, Math.floor(nB * 1.4));
    let instN = 0;
    const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3(), ps = new THREE.Vector3(), colr = new THREE.Color();
    const lightPts = [], lightCols = [], lightSz = [];
    const pushLight = (x, y, z, c, s) => { lightPts.push(x, y, z); lightCols.push(c[0], c[1], c[2]); lightSz.push(s, rnd()); };
    const warm = [[2.6, 1.6, 0.7], [2.2, 1.3, 0.55], [2.0, 1.7, 1.0], [1.7, 2.0, 2.4], [2.5, 0.9, 0.4]];
    for (let i = 0; i < nB; i++) {
      const dNear = Math.pow(rnd(), 1.9);
      const x = shoreX(0) + 34 + dNear * 1150;
      const z = (rnd() - 0.5) * 3000 * (0.55 + 0.45 * (1 - dNear));
      const h = uskudarHeight(x, z);
      const big = 1 - dNear;
      const w = 6 + rnd() * 9, d = 6 + rnd() * 9, ht = 5 + rnd() * (7 + 20 * big * rnd());
      q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), 0.32 + (rnd() < 0.5 ? 0.02 : -0.03) + (rnd() - 0.5) * 0.15);
      ps.set(x, h - 0.5, z); sc.set(w, ht, d);
      m4.compose(ps, q, sc);
      inst.setMatrixAt(instN, m4);
      const t = 0.05 + rnd() * 0.06;
      inst.setColorAt(instN, colr.setRGB(t * 1.05, t, t * 0.95 + rnd() * 0.02));
      instN++;
      if (rnd() < 0.4) { // çatı katı / kule
        ps.set(x + (rnd() - 0.5) * w * 0.3, h - 0.5 + ht, z + (rnd() - 0.5) * d * 0.3);
        sc.set(w * (0.35 + rnd() * 0.4), 2.2 + rnd() * 3.5, d * (0.35 + rnd() * 0.4));
        inst.setMatrixAt(instN, m4.compose(ps, q, sc));
        inst.setColorAt(instN, colr.setRGB(t * 0.9, t * 0.9, t * 0.9));
        instN++;
      }
      // pencere ışıkları
      const nl = Math.floor(rnd() * 4) + (big > 0.5 ? 1 : 0);
      for (let k = 0; k < nl && lightPts.length / 3 < Q.cityLights; k++) {
        if (rnd() < 0.3) continue;
        const side = rnd() < 0.5 ? -1 : 1;
        const lx = (rnd() - 0.5) * w, ly = 2 + rnd() * (ht - 3);
        const v = new THREE.Vector3(lx, ly, side * d * 0.5 + 0.2).applyQuaternion(q);
        const c = warm[Math.floor(rnd() * warm.length)];
        pushLight(x + v.x, h - 0.5 + v.y, z + v.z, c.map((a) => a * (0.9 + rnd() * 0.7)), 0.9 + rnd() * 0.9);
      }
    }
    inst.count = instN;
    inst.instanceMatrix.needsUpdate = true;
    if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
    inst.frustumCulled = false;
    inst.name = 'uskudar-binalar';
    this.group.add(inst);

    // sahil yolu lambaları (suda uzun yansıma bırakır)
    for (let z = -1500; z <= 1500; z += 11) {
      const x = shoreX(z) + 7 + (rnd() - 0.5) * 2;
      pushLight(x, uskudarHeight(x, z) + 5.5, z, [4.2, 2.4, 1.0], 1.6);
    }
    // sahil yolu üstü: ikinci sıra (yamaç sokakları)
    for (let i = 0; i < 260; i++) {
      const x = shoreX(0) + 60 + rnd() * 500, z = (rnd() - 0.5) * 2600;
      pushLight(x, uskudarHeight(x, z) + 5, z, [3.0, 1.9, 0.9], 1.4);
    }

    // Camiler
    const mosqueGeos = [];
    const sx = shoreX(0);
    // Şemsi Paşa (küçük, denize kıyı, minaresi tek)
    mosqueGeos.push(mosque({ x: sx + 14, z: 22, y: 3.0, r: 3.6, minarets: 1, mh: 17, rot: 0.3, halfDomes: 0, court: true }));
    // Mihrimah Sultan (iskele camii)
    mosqueGeos.push(mosque({ x: sx + 88, z: -128, y: uskudarHeight(sx + 88, -128), r: 10.5, minarets: 2, mh: 44, rot: 0.32, halfDomes: 4 }));
    // Yeni Valide
    mosqueGeos.push(mosque({ x: sx + 104, z: 150, y: uskudarHeight(sx + 104, 150), r: 9.5, minarets: 2, mh: 40, rot: 0.3, halfDomes: 3 }));
    // Tepedeki camiler
    for (const [dx, zz, r, mh, n] of [[430, -360, 9, 38, 2], [610, 330, 10, 42, 2], [820, -40, 8.5, 36, 2], [300, 470, 7.5, 32, 1], [520, -700, 8, 34, 2]]) {
      const x = sx + dx;
      mosqueGeos.push(mosque({ x, z: zz, y: uskudarHeight(x, zz) - 1, r, minarets: n, mh, rot: 0.3, halfDomes: 2 }));
    }
    // Selimiye Kışlası benzeri (güneyde büyük yapı, köşe kuleleri)
    {
      const parts = [];
      const bx = sx + 300, bz = 1350, by = uskudarHeight(bx, bz);
      const b = new THREE.BoxGeometry(220, 26, 220); b.translate(0, 13, 0); parts.push(b.toNonIndexed());
      for (const [dx, dz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
        const t = new THREE.CylinderGeometry(9, 10, 44, 14); t.translate(dx * 110, 22, dz * 110); parts.push(t.toNonIndexed());
        const c = new THREE.ConeGeometry(11, 14, 14); c.translate(dx * 110, 51, dz * 110); parts.push(c.toNonIndexed());
      }
      const g = mergeGeometries(parts); g.translate(bx, by - 2, bz); mosqueGeos.push(g);
    }
    const mosqueMesh = new THREE.Mesh(mergeGeometries(mosqueGeos.map((g) => (g.index ? g.toNonIndexed() : g))), mosqueMat);
    mosqueMesh.name = 'uskudar-camiler';
    this.group.add(mosqueMesh);
    // camilerin minare ışıkları (mahya benzeri) ve aydınlatma noktaları
    for (const [dx, zz, top] of [[88, -128, 46], [104, 150, 42]]) {
      pushLight(sx + dx, top, zz, [4.5, 3.8, 2.6], 1.8);
    }

    // ---------- Sarayburnu / Tarihi Yarımada (kuzeybatı) ----------
    const old = new THREE.Group();
    const OC = new THREE.Vector3(-1330, 0, -520);       // Sarayburnu ucu (batı-kuzeybatı)
    const facing = Math.atan2(-OC.z, -OC.x);            // kuleye bakan yön
    old.position.copy(OC);
    old.rotation.y = -facing + Math.PI / 2;             // yerel +z -> kuleye doğru
    old.scale.setScalar(1.3);                            // sinematik sıkıştırma: siluet okunabilsin
    // yerel: u = x (sağ), v = z (kule yönü, deniz), tepe -z yönünde yükselir
    const oldHeight = (u, v) => {
      const coast = 40 * Math.sin(u * 0.004) - 60 * Math.exp(-Math.pow((u - 30) / 200, 2)) * -1; // uç çıkıntısı
      const d = -(v - coast);   // karaya doğru mesafe
      if (d < 0) return -6;
      const golden = -Math.exp(-Math.pow((u - 330) / 90, 2)) * 60 * smoothstep(0, 120, d); // Haliç
      return 3 + 48 * smoothstep(20, 520, d) * (0.75 + 0.45 * fbm2(u * 0.004, v * 0.004, 3, 11)) + golden * 0.0;
    };
    const oldLand = terrainPatch(-1400, 1400, -1200, 300, 90, 70, oldHeight, (u, v, h) => {
      const n = fbm2(u * 0.02, v * 0.02, 3, 2); return [0.045 + n * 0.04, 0.05 + n * 0.04, 0.05 + n * 0.04];
    });
    old.add(new THREE.Mesh(oldLand, landMat));
    // eski şehir binaları
    const nOld = Math.floor(Q.cityBuildings * 0.6);
    const oi = new THREE.InstancedMesh(box, bldMat, nOld);
    const oldLights = [];
    for (let i = 0; i < nOld; i++) {
      const u = (rnd() - 0.5) * 2100 + 150, v = -(rnd() * rnd()) * 800 + 40;
      const h = oldHeight(u, v);
      if (h < 0) { oi.setMatrixAt(i, m4.makeScale(0, 0, 0)); continue; }
      const w = 7 + rnd() * 11, d = 7 + rnd() * 11, ht = 6 + rnd() * 11;
      ps.set(u, h - 0.5, v); sc.set(w, ht, d); q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), (rnd() - 0.5) * 0.5);
      oi.setMatrixAt(i, m4.compose(ps, q, sc));
      const t = 0.045 + rnd() * 0.05;
      oi.setColorAt(i, colr.setRGB(t, t * 1.02, t * 1.08));
      if (rnd() < 0.7 && oldLights.length / 3 < Q.cityLights * 0.6) {
        oldLights.push(u + (rnd() - 0.5) * w, h + 2 + rnd() * (ht - 2), v + d * 0.5);
      }
    }
    oi.frustumCulled = false;
    old.add(oi);
    // Anıtlar: Ayasofya, Sultanahmet, Süleymaniye, Topkapı köşkleri, Galata Kulesi
    const om = [];
    const hAt = (u, v) => oldHeight(u, v);
    const Y = 1.25; // dikey abartı: silüetler seçilebilsin
    om.push(mosque({ x: -150, z: -330, y: hAt(-150, -330), r: 16, minarets: 4, mh: 58, rot: 0.15, halfDomes: 2, court: false, scaleY: Y }));   // Ayasofya
    om.push(mosque({ x: -340, z: -380, y: hAt(-340, -380), r: 13, minarets: 6, mh: 62, rot: 0.1, halfDomes: 4, court: true, scaleY: Y }));    // Sultanahmet
    om.push(mosque({ x: 210, z: -470, y: hAt(210, -470), r: 14, minarets: 4, mh: 60, rot: 0.2, halfDomes: 2, court: true, scaleY: Y }));      // Süleymaniye
    om.push(mosque({ x: 420, z: -520, y: hAt(420, -520), r: 8, minarets: 2, mh: 36, rot: 0.1, halfDomes: 2, scaleY: Y }));
    om.push(mosque({ x: -520, z: -300, y: hAt(-520, -300), r: 7, minarets: 2, mh: 32, rot: 0.1, halfDomes: 2, scaleY: Y }));
    // Topkapı: küçük kubbeli köşkler, kuleler, surlar
    {
      const parts = [];
      for (let i = 0; i < 16; i++) {
        const u = -30 + rnd() * 240, v = -70 - rnd() * 180;
        const s = 5 + rnd() * 8;
        const b = new THREE.BoxGeometry(s * 1.6, s, s * 1.4); b.translate(0, s / 2, 0); b.translate(u, hAt(u, v), v); parts.push(b.toNonIndexed());
        const dm = new THREE.SphereGeometry(s * 0.6, 10, 6, 0, 6.29, 0, 1.57); dm.translate(u, hAt(u, v) + s, v); parts.push(dm.toNonIndexed());
      }
      for (const [u, v, hh] of [[60, -40, 30], [150, -110, 34]]) {
        const t = new THREE.CylinderGeometry(4, 5, hh, 10); t.translate(u, hAt(u, v) + hh / 2, v); parts.push(t.toNonIndexed());
        const c = new THREE.ConeGeometry(5.6, 10, 10); c.translate(u, hAt(u, v) + hh + 5, v); parts.push(c.toNonIndexed());
      }
      // Sarayburnu sur çizgisi
      const wall = new THREE.BoxGeometry(520, 9, 4); wall.translate(90, 5, -20); wall.translate(0, hAt(90, -20), 0); parts.push(wall.toNonIndexed());
      om.push(mergeGeometries(parts));
    }
    // Galata Kulesi (Haliç'in karşısı)
    {
      const gu = 640, gv = -560, gy = hAt(gu, gv) + 22;
      const t = new THREE.CylinderGeometry(7.5, 8.6, 58, 20); t.translate(gu, gy + 29, gv);
      const c = new THREE.CylinderGeometry(9.5, 7.5, 6, 20); c.translate(gu, gy + 60, gv);
      const cone = new THREE.ConeGeometry(9, 19, 20); cone.translate(gu, gy + 72, gv);
      om.push(mergeGeometries([t.toNonIndexed(), c.toNonIndexed(), cone.toNonIndexed()]));
    }
    const oldMon = new THREE.Mesh(mergeGeometries(om.map((g) => (g.index ? g.toNonIndexed() : g))), mosqueMat);
    old.add(oldMon);
    // eski şehir ışıkları
    const oldLightArr = [];
    for (let i = 0; i < oldLights.length; i += 3) {
      const c = warm[Math.floor(rnd() * warm.length)];
      oldLightArr.push({ p: new THREE.Vector3(oldLights[i], oldLights[i + 1], oldLights[i + 2]), c: c.map((a) => a * 1.1), s: 1.3 + rnd() * 1.0 });
    }
    old.updateMatrixWorld(true);
    for (const l of oldLightArr) {
      const w = l.p.clone().applyMatrix4(old.matrixWorld);
      pushLight(w.x, w.y, w.z, l.c, l.s);
    }
    // Sultanahmet ve Ayasofya kubbelerinin projektör ışığı (parıltı noktaları)
    for (const [u, v, r] of [[-150, -330, 16], [-340, -380, 13], [210, -470, 14]]) {
      const w = new THREE.Vector3(u, hAt(u, v) + r * 1.5, v).applyMatrix4(old.matrixWorld);
      pushLight(w.x, w.y, w.z, [3.6, 2.6, 1.6], 8);
    }
    // Galata Kulesi'nin ışığı
    {
      const w = new THREE.Vector3(640, hAt(640, -560) + 22 + 62, -560).applyMatrix4(old.matrixWorld);
      pushLight(w.x, w.y, w.z, [3.6, 2.9, 1.9], 6);
    }
    this.group.add(old);
    this.old = old;

    // ---------- Işık noktaları ----------
    const n = lightPts.length / 3;
    const lgeo = new THREE.BufferGeometry();
    lgeo.setAttribute('position', new THREE.Float32BufferAttribute(lightPts, 3));
    lgeo.setAttribute('aColor', new THREE.Float32BufferAttribute(lightCols, 3));
    lgeo.setAttribute('aSp', new THREE.Float32BufferAttribute(lightSz, 2));
    this.lightMat = new THREE.ShaderMaterial({
      uniforms: { ...U, uPxScale: { value: 800 } },
      vertexShader: LIGHT_VERT, fragmentShader: LIGHT_FRAG,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    const lights = new THREE.Points(lgeo, this.lightMat);
    lights.frustumCulled = false;
    lights.renderOrder = 4;
    lights.name = 'sehir-isiklari';
    this.group.add(lights);
    this.lightCount = n;

    // yansıma küpü için tümünü görünür yap
    this.group.traverse((o) => o.layers.enable(1));
    scene.add(this.group);
  }

  setPxScale(v) { this.lightMat.uniforms.uPxScale.value = v; }

  update(camera, renderH, day) {
    this.lightMat.uniforms.uPxScale.value = renderH / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2));
    // mahalle ışıkları şafakta söner, cami aydınlatması sürer
    this.mosqueMat.emissive.setRGB(0.05 * (1 - 0.6 * day), 0.036 * (1 - 0.6 * day), 0.022 * (1 - 0.6 * day));
  }
}
