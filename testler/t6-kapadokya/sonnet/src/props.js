import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { WORLD, POIS } from './config.js';
import { U, NOISE, ATMOS, HEIGHT_FN, SHADOW_FN } from './glsl.js';
import { rng, fbm2, smooth, CellGrid, SpatialHash } from './util.js';

const P = (id) => POIS.find(p => p.id === id);

// genel: hücre başına InstancedMesh üret
function buildCells({ items, geometry, material, size = WORLD, cells = 8, matrixOf, attr, attrSize = 4, group, maxDist }) {
  const grid = new CellGrid(size, cells);
  for (const it of items) grid.add(it.x, it.z, it);
  const meshes = [];
  for (let k = 0; k < grid.items.length; k++) {
    const sub = grid.items[k]; if (!sub.length) continue;
    const g = new THREE.InstancedBufferGeometry();
    g.index = geometry.index; g.attributes = { ...geometry.attributes }; g.boundingSphere = geometry.boundingSphere;
    const mesh = new THREE.InstancedMesh(g, material, sub.length);
    const arr = new Float32Array(sub.length * attrSize);
    const m = new THREE.Matrix4();
    sub.forEach((it, i) => { matrixOf(it, m); mesh.setMatrixAt(i, m); attr(it, arr, i * attrSize); });
    g.setAttribute('aInst', new THREE.InstancedBufferAttribute(arr, attrSize));
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
    const [cx, cz] = grid.center(k);
    mesh.userData.cx = cx; mesh.userData.cz = cz; mesh.userData.maxDist = maxDist;
    group.add(mesh); meshes.push(mesh);
  }
  return meshes;
}

// ------------------------------------------------------------------
// Kaya oyuk kapı/pencere ve güvercinlik delikleri (yamaçlara yapışık kartlar)
// ------------------------------------------------------------------
const DECAL_VERT = /* glsl */ `
attribute vec4 aInst;
varying vec2 vUv; varying vec4 vInst; varying vec3 vWorld; varying vec3 vN;
void main(){
  mat4 M = modelMatrix * instanceMatrix;
  vec3 nz = normalize(M[2].xyz);
  vec4 wp = M * vec4(position, 1.0);
  float d = length(wp.xyz - cameraPosition);
  wp.xyz += nz * (0.10 + 0.0028*d);
  vUv = uv; vInst = aInst; vWorld = wp.xyz; vN = nz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`;
const DECAL_FRAG = /* glsl */ `
${NOISE}
${ATMOS}
${HEIGHT_FN}
${SHADOW_FN}
varying vec2 vUv; varying vec4 vInst; varying vec3 vWorld; varying vec3 vN;
float archSDF(vec2 p, float w, float h){
  float rr = w*0.5; vec2 q = vec2(abs(p.x), p.y);
  float rect = max(q.x - rr, max(-q.y, q.y - (h - rr)));
  float circ = length(vec2(q.x, q.y - (h - rr))) - rr;
  return q.y > h - rr ? circ : rect;
}
void main(){
  int type = int(vInst.x + 0.5);
  vec2 p = vUv - vec2(0.5, 0.06);
  float sd;
  float lipW = 0.1;
  if (type == 0) { sd = archSDF(p, 0.56, 0.78); }
  else if (type == 1) { vec2 q = abs(vUv - 0.5) - vec2(0.27); sd = max(q.x, q.y); lipW = 0.07; }
  else { sd = archSDF(p, 0.66, 0.9); lipW = 0.12; }
  float outer = sd - lipW;
  if (outer > 0.0) discard;
  vec3 N = normalize(vN);
  float NdL = max(dot(N, uLightDir), 0.0);
  float dist = length(vWorld - cameraPosition);
  float sh = 1.0;
  if (NdL > 0.0 && dist < 2500.0) sh = sunShadow(vWorld + N*0.7, 1.8);
  vec3 amb = mix(uAmbGround, uAmbSky, N.y*0.5+0.5);
  vec3 stone = vec3(0.56,0.45,0.33) * (0.85 + 0.3*hash12(vec2(vInst.y*91.0, 3.0)));
  float lipA = smoothstep(0.0, -0.03, sd);          // içeride
  vec3 col = stone * (uLightColor*NdL*sh + amb);
  // iç: koyu, alt kısımda hafif ışık
  float depth = smoothstep(0.0, 0.5, vUv.y + 0.1);
  vec3 hole = vec3(0.018,0.013,0.011) + vec3(0.06,0.04,0.025) * (uLightColor*0.1 + amb*0.6) * (1.0 - depth) * (type == 1 ? 0.0 : 1.0) * NdL * sh;
  // kenarlık daha açık (oyma bilezik) ve dış yumuşak kenar: gölgeli kaya karışımı
  float edgeFade = smoothstep(0.0, -0.05, outer);
  col = mix(col, hole, step(sd, 0.0));
  gl_FragColor = vec4(applyFog(col, vWorld), 1.0);
  // dış bilezik terrain'e karışsın: kenarda koyulaş
  if (sd > 0.0) gl_FragColor.rgb = mix(gl_FragColor.rgb, applyFog(col*0.55, vWorld), smoothstep(0.0, lipW, sd));
}`;

export function buildDecals(terrain, scene) {
  const rnd = rng(4242);
  const hash = new SpatialHash(6);
  const items = [];
  const tmp = new THREE.Vector3();
  const uch = P('uchisar'), gv = P('guvercinlik'), town = P('goreme'), fld = P('balon');
  const trySite = (x, z, type, bias) => {
    if (Math.abs(x) > 1750 || Math.abs(z) > 1750) return false;
    const n = terrain.normalAt(x, z, tmp);
    const slope = 1 - n.y;
    if (slope < 0.28) return false;
    if (hash.anyWithin(x, z, type === 1 ? 1.4 : 2.4)) return false;
    const w = type === 1 ? 0.7 + rnd() * 0.5 : type === 2 ? 2.6 + rnd() * 1.2 : 1.2 + rnd() * 0.9;
    const h = type === 1 ? w : type === 2 ? w * 1.5 : w * (1.4 + 0.3 * rnd());
    const y = terrain.heightAt(x, z);
    items.push({ x, z, y, nx: n.x, ny: n.y, nz: n.z, w: w * 1.6, h: h * 1.6, type, seed: rnd() });
    hash.add(x, z, type === 1 ? 0.9 : 1.6, null);
    return true;
  };
  const clusterAt = (cx, cz, R, count, typeFn) => {
    let placed = 0;
    for (let k = 0; k < count * 9 && placed < count; k++) {
      const a = rnd() * Math.PI * 2, d = Math.sqrt(rnd()) * R;
      if (trySite(cx + Math.cos(a) * d, cz + Math.sin(a) * d, typeFn(), 0)) placed++;
    }
    return placed;
  };
  // Uçhisar: kaya kütlesinin çevresinde çok yoğun
  for (let c = 0; c < 26; c++) {
    const a = rnd() * Math.PI * 2, d = 20 + rnd() * uch.r * 0.5;
    clusterAt(uch.x + Math.cos(a) * d, uch.z + Math.sin(a) * d, 40, 26, () => rnd() < 0.12 ? 2 : 0);
  }
  // Güvercinlik: küçük kare delikler
  for (let c = 0; c < 24; c++) {
    const a = rnd() * Math.PI * 2, d = rnd() * gv.r;
    clusterAt(gv.x + Math.cos(a) * d, gv.z + Math.sin(a) * d, 32, 30, () => rnd() < 0.8 ? 1 : 0);
  }
  // her yerde dağınık kaya evleri
  for (let c = 0; c < 130; c++) {
    const x = (rnd() * 2 - 1) * 1700, z = (rnd() * 2 - 1) * 1700;
    if (Math.hypot(x - fld.x, z - fld.z) < fld.r) continue;
    clusterAt(x, z, 30, 10, () => rnd() < 0.08 ? 2 : rnd() < 0.2 ? 1 : 0);
  }
  const geo = new THREE.PlaneGeometry(1, 1);
  geo.translate(0, 0.5, 0);
  geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0.5, 0), 1.5);
  const mat = new THREE.ShaderMaterial({ uniforms: { ...U }, vertexShader: DECAL_VERT, fragmentShader: DECAL_FRAG, side: THREE.DoubleSide });
  const group = new THREE.Group();
  const nz = new THREE.Vector3(), nx = new THREE.Vector3(), ny = new THREE.Vector3(), up = new THREE.Vector3(0, 1, 0);
  const meshes = buildCells({
    items, geometry: geo, material: mat, group, maxDist: 2600,
    matrixOf: (it, m) => {
      nz.set(it.nx, it.ny, it.nz).normalize();
      nx.crossVectors(up, nz).normalize();
      ny.crossVectors(nz, nx).normalize();
      m.makeBasis(nx.clone().multiplyScalar(it.w), ny.clone().multiplyScalar(it.h), nz.clone());
      m.setPosition(it.x, it.y - it.h * 0.42, it.z);
    },
    attr: (it, a, o) => { a[o] = it.type; a[o + 1] = it.seed; a[o + 2] = 0; a[o + 3] = 0; },
  });
  scene.add(group);
  return { group, meshes, count: items.length };
}

// ------------------------------------------------------------------
// Göreme kasabası: taş evler, cami ve minare
// ------------------------------------------------------------------
const HOUSE_VERT = /* glsl */ `
attribute vec4 aInst;   // x: temel derinliği, y: pencere var mı, z: ton, w: tohum
varying vec3 vWorld; varying vec3 vN; varying vec3 vLocal; varying vec3 vNl; varying vec4 vInst; varying vec2 vEdge;
void main(){
  mat4 M = modelMatrix * instanceMatrix;
  vec4 wp = M * vec4(position, 1.0);
  vec3 s = vec3(length(M[0].xyz), length(M[1].xyz), length(M[2].xyz));
  vN = normalize(mat3(M) * (normal / (s*s)));
  vWorld = wp.xyz; vNl = normal; vLocal = position * s; vInst = aInst;
  vec2 ed = (vec2(0.5) - abs(position.xz)) * s.xz; vEdge = ed;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`;
const HOUSE_FRAG = /* glsl */ `
${NOISE}
${ATMOS}
${HEIGHT_FN}
${SHADOW_FN}
varying vec3 vWorld; varying vec3 vN; varying vec3 vLocal; varying vec3 vNl; varying vec4 vInst; varying vec2 vEdge;
float archSDF(vec2 p, float w, float h){
  float rr = w*0.5; vec2 q = vec2(abs(p.x), p.y);
  float rect = max(q.x - rr, max(-q.y, q.y - (h - rr)));
  float circ = length(vec2(q.x, q.y - (h - rr))) - rr;
  return q.y > h - rr ? circ : rect;
}
void main(){
  vec3 N = normalize(vN);
  vec3 wp = vWorld;
  float dist = length(wp - cameraPosition);
  float y = vLocal.y - vInst.x;         // zeminden yükseklik
  float hv = fract(vInst.w*7.31);
  vec3 tone = mix(vec3(0.50,0.36,0.24), vec3(0.66,0.53,0.38), vInst.z);
  if (hv > 0.82) tone = vec3(0.70,0.63,0.50);            // badanalı
  else if (hv < 0.12) tone = vec3(0.55,0.34,0.24);       // kiremit/kızıl taş
  vec3 col = tone;
  bool roof = vNl.y > 0.5;
  vec3 emis = vec3(0.0);
  if (roof) {
    col = vec3(0.36,0.28,0.20) * (0.8 + 0.4*vnoise(wp.xz*1.3));
    float ed = min(vEdge.x, vEdge.y);
    col = mix(tone*1.05, col, smoothstep(0.28, 0.42, ed));          // parapet
    col *= 0.75 + 0.25*smoothstep(0.0, 0.12, ed);
    vec2 rc = floor(wp.xz*0.35);
    if (hash12(rc) > 0.9) col *= 0.7;
  } else {
    // taş dizileri
    float row = floor(y/0.42);
    float u = abs(vNl.x) > 0.5 ? vLocal.z : vLocal.x;
    float bl = fract((u + row*0.47)/0.85);
    float mortar = smoothstep(0.0, 0.05, bl) * smoothstep(0.0, 0.06, fract(y/0.42));
    col *= 0.86 + 0.14*mortar;
    col *= 0.88 + 0.24*hash12(vec2(floor((u + row*0.47)/0.85), row));
    col *= 0.85 + 0.3*vnoise(vec2(u*1.7+row*3.1, y*3.0));
    if (vInst.y > 0.5) {
      float uu = u + vInst.w*13.0;
      vec2 cs = vec2(3.1, 3.3);
      vec2 cp = vec2(uu, y - 0.35) / cs;
      vec2 ci = floor(cp), cf = fract(cp);
      float hh = hash12(ci + vInst.w*31.0);
      float floorNo = ci.y;
      if (y > 0.8 && hh < 0.82) {
        vec2 lp = (cf - vec2(0.5, 0.28)) * cs;
        float sdw = archSDF(lp, 0.92, 1.35);
        float inside = 1.0 - smoothstep(-0.02, 0.04, sdw);
        float lit = step(0.42, hash12(ci + 5.0 + vInst.w*7.0)) * uNight;
        vec3 glass = mix(vec3(0.03,0.04,0.05), vec3(1.0,0.55,0.20)*3.4, lit);
        float frame = (1.0 - smoothstep(0.0, 0.14, sdw)) * (1.0 - inside);
        vec3 wood = mix(vec3(0.10,0.06,0.04), vec3(0.16,0.10,0.06), hash12(ci+2.0));
        // panjurlar: pencerenin iki yanında renkli ahşap
        float shut = smoothstep(0.55, 0.5, abs(lp.x)) * smoothstep(0.42, 0.5, abs(lp.x)) * step(-0.05, lp.y) * step(lp.y, 1.2) * step(0.6, hash12(ci+9.0));
        vec3 shutCol = mix(vec3(0.10,0.28,0.30), vec3(0.32,0.16,0.08), step(0.5, hash12(ci+4.0)));
        col = mix(col, wood, frame*0.9);
        col = mix(col, shutCol*0.7, shut*(1.0-inside)*0.9);
        col = mix(col, vec3(0.0), inside);
        emis = glass * inside;
      }
    }
  }
  float NdL = max(dot(N, uLightDir), 0.0);
  float sh = 1.0;
  if (NdL > 0.0 && dist < 3000.0) sh = sunShadow(wp + N*0.5, 2.5);
  float bs = balloonShadow(wp);
  float ao = mix(0.6, 1.0, smoothstep(0.0, 1.6, y));
  vec3 amb = mix(uAmbGround, uAmbSky, N.y*0.5+0.5) * ao;
  vec3 lit = col * (uLightColor*NdL*sh*bs + amb) + emis;
  gl_FragColor = vec4(applyFog(lit, wp), 1.0);
}`;

export function buildTown(terrain, scene) {
  const rnd = rng(9090);
  const town = P('goreme');
  const houses = [];
  const hash = new SpatialHash(12);
  const tmp = new THREE.Vector3();
  for (let n = 0; n < 4000 && houses.length < 150; n++) {
    const a = rnd() * Math.PI * 2, d = Math.sqrt(rnd()) * town.r * 0.95;
    const x = town.x + Math.cos(a) * d, z = town.z + Math.sin(a) * d;
    const nn = terrain.normalAt(x, z, tmp);
    if (1 - nn.y > 0.10) continue;
    const w = 5.5 + rnd() * 5, dd = 5.5 + rnd() * 4.5;
    const rad = Math.max(w, dd) * 0.72;
    if (hash.anyWithin(x, z, rad)) continue;
    // sırt boyunca hizala
    const yaw = Math.atan2(nn.x, nn.z) + (rnd() - 0.5) * 0.35 + (rnd() < 0.5 ? 0 : Math.PI / 2);
    // dört köşedeki en düşük zemin
    let ymin = 1e9, ymax = -1e9;
    for (const [sx, sz] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) {
      const cx = Math.cos(yaw), sy = Math.sin(yaw);
      const lx = sx * w * 0.5, lz = sz * dd * 0.5;
      const yy = terrain.heightAt(x + lx * cx + lz * sy, z - lx * sy + lz * cx);
      ymin = Math.min(ymin, yy); ymax = Math.max(ymax, yy);
    }
    if (ymax - ymin > 3.2) continue;
    const floors = rnd() < 0.55 ? 1 : 2;
    const h = floors * 3.3 + 0.4 + rnd() * 0.8;
    const hh = h + (ymax - ymin);
    houses.push({ x, z, y0: ymin - 0.4, w, d: dd, h: hh, yaw, tone: rnd(), seed: rnd() });
    hash.add(x, z, rad, null);
    // üst kat / ek oda
    if (rnd() < 0.6) {
      const w2 = w * (0.45 + rnd() * 0.25), d2 = dd * (0.45 + rnd() * 0.3);
      const ox = (rnd() - 0.5) * (w - w2), oz = (rnd() - 0.5) * (dd - d2);
      const cy = Math.cos(yaw), sy = Math.sin(yaw);
      houses.push({ x: x + ox * cy + oz * sy, z: z - ox * sy + oz * cy, y0: ymin - 0.4 + hh - 0.05, w: w2, d: d2, h: 3.0 + rnd() * 0.8, yaw, tone: rnd(), seed: rnd(), annex: true });
    }
  }
  const geo = new THREE.BoxGeometry(1, 1, 1); geo.translate(0, 0.5, 0);
  geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0.5, 0), 1.0);
  const mat = new THREE.ShaderMaterial({ uniforms: { ...U }, vertexShader: HOUSE_VERT, fragmentShader: HOUSE_FRAG });
  const group = new THREE.Group();
  const q = new THREE.Quaternion(), ax = new THREE.Vector3(0, 1, 0), pos = new THREE.Vector3(), scl = new THREE.Vector3();
  const meshes = buildCells({
    items: houses, geometry: geo, material: mat, group, cells: 8, maxDist: 3400,
    matrixOf: (it, m) => { q.setFromAxisAngle(ax, it.yaw); pos.set(it.x, it.y0, it.z); scl.set(it.w, it.h, it.d); m.compose(pos, q, scl); },
    attr: (it, a, o) => { a[o] = it.annex ? 0.0 : 0.4; a[o + 1] = 1; a[o + 2] = it.tone; a[o + 3] = it.seed; },
  });
  // cami + minare: kasabanın en düz yeri
  let best = null, bs = 1e9;
  for (let n = 0; n < 600; n++) {
    const a = rnd() * Math.PI * 2, d = Math.sqrt(rnd()) * town.r * 0.55;
    const x = town.x + Math.cos(a) * d, z = town.z + Math.sin(a) * d;
    if (hash.anyWithin(x, z, 16)) continue;
    const s = 1 - terrain.normalAt(x, z, tmp).y;
    if (s < bs) { bs = s; best = [x, z]; }
  }
  if (best) {
    const [mx, mz] = best;
    const gy = terrain.heightAt(mx, mz);
    const stoneMat = new THREE.ShaderMaterial({ uniforms: { ...U }, vertexShader: HOUSE_VERT, fragmentShader: HOUSE_FRAG });
    const mk = (geoP, sx, sy, sz, x, y, z, tone, win = 0) => {
      const g = new THREE.InstancedBufferGeometry(); g.index = geoP.index; g.attributes = { ...geoP.attributes };
      g.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 60);
      g.setAttribute('aInst', new THREE.InstancedBufferAttribute(new Float32Array([0, win, tone, 0.3]), 4));
      const im = new THREE.InstancedMesh(g, stoneMat, 1);
      im.setMatrixAt(0, new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), new THREE.Quaternion(), new THREE.Vector3(sx, sy, sz)));
      im.computeBoundingSphere(); group.add(im);
      return im;
    };
    const box = new THREE.BoxGeometry(1, 1, 1); box.translate(0, 0.5, 0);
    const cyl = new THREE.CylinderGeometry(1, 1, 1, 20, 1); cyl.translate(0, 0.5, 0);
    const cone = new THREE.ConeGeometry(1, 1, 20, 1); cone.translate(0, 0.5, 0);
    const dome = new THREE.SphereGeometry(1, 24, 10, 0, Math.PI * 2, 0, Math.PI / 2);
    mk(box, 15, 8.5, 12, mx, gy - 1, mz, 0.9, 1);
    mk(dome, 5.2, 4.2, 5.2, mx, gy + 7.5, mz, 0.95);
    mk(cyl, 5.3, 1.0, 5.3, mx, gy + 7.4, mz, 0.9);
    const tx = mx + 10.5, tz = mz + 7;
    const ty = terrain.heightAt(tx, tz);
    mk(cyl, 1.1, 26, 1.1, tx, ty - 1, tz, 0.97);
    mk(cyl, 1.7, 0.55, 1.7, tx, ty + 18.5, tz, 0.9);
    mk(cone, 1.35, 6.5, 1.35, tx, ty + 25, tz, 0.7);
    window.__mosque = { x: mx, z: mz, y: gy, tx, tz, ty };
  }
  scene.add(group);
  return { group, meshes, houses, count: houses.length };
}

// ------------------------------------------------------------------
// Ağaçlar: kavaklar, meyve bahçeleri, çalılar
// ------------------------------------------------------------------
function blob(rad, sx, sy, sz, ox, oy, oz, seed) {
  const g = new THREE.IcosahedronGeometry(rad, 3);
  const p = g.attributes.position; const v = new THREE.Vector3();
  const nrm = new Float32Array(p.count * 3);
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    const n = fbm2(v.x * 2.2 + seed, v.y * 2.2 + v.z * 1.3, 3);
    v.multiplyScalar(0.80 + 0.42 * n);
    p.setXYZ(i, v.x * sx + ox, v.y * sy + oy, v.z * sz + oz);
    const nn = new THREE.Vector3(v.x / sx, v.y / sy, v.z / sz).normalize();
    nrm[i * 3] = nn.x; nrm[i * 3 + 1] = nn.y; nrm[i * 3 + 2] = nn.z;
  }
  g.setAttribute('normal', new THREE.BufferAttribute(nrm, 3));
  const part = new Float32Array(p.count).fill(1);
  g.setAttribute('aPart', new THREE.BufferAttribute(part, 1));
  return g;
}
function trunk(h, r) {
  const g = new THREE.CylinderGeometry(r * 0.7, r, h, 5, 1); g.translate(0, h / 2, 0);
  g.setAttribute('aPart', new THREE.BufferAttribute(new Float32Array(g.attributes.position.count).fill(0), 1));
  return g;
}
function dropIndex(g) { return g.index ? g.toNonIndexed() : g; }

const TREE_VERT = /* glsl */ `
attribute vec4 aInst; attribute float aPart;
varying vec3 vWorld; varying vec3 vN; varying vec4 vInst; varying float vPart; varying float vH;
uniform float uTime;
void main(){
  mat4 M = modelMatrix * instanceMatrix;
  vec4 wp = M * vec4(position, 1.0);
  float sway = sin(uTime*1.5 + wp.x*0.21 + wp.z*0.17) * 0.045 * max(position.y, 0.0);
  wp.x += sway; wp.z += sway*0.6;
  vN = normalize(mat3(M) * normal);
  vWorld = wp.xyz; vInst = aInst; vPart = aPart; vH = position.y;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`;
const TREE_FRAG = /* glsl */ `
${NOISE}
${ATMOS}
${HEIGHT_FN}
${SHADOW_FN}
varying vec3 vWorld; varying vec3 vN; varying vec4 vInst; varying float vPart; varying float vH;
void main(){
  vec3 N = normalize(vN);
  float dist = length(vWorld - cameraPosition);
  vec3 V = normalize(cameraPosition - vWorld);
  vec3 dark = vec3(0.045,0.10,0.03), mid = vec3(0.10,0.17,0.04), yel = vec3(0.30,0.28,0.06);
  float t = vInst.y;
  vec3 leaf = t < 0.6 ? mix(dark, mid, t/0.6) : mix(mid, yel, (t-0.6)/0.4);
  float cl = vnoise3(vWorld*vec3(2.6,2.2,2.6)) * 0.6 + vnoise3(vWorld*vec3(7.0,6.0,7.0)) * 0.4;
  leaf *= 0.45 + 1.0*cl;
  leaf = mix(leaf, leaf*vec3(1.5,1.4,0.9), smoothstep(0.55,0.9,cl)*0.6);
  vec3 col = vPart < 0.5 ? vec3(0.16,0.11,0.08) : leaf;
  float NdL = max(dot(N, uLightDir), 0.0);
  float wrap = max((dot(N, uLightDir)+0.4)/1.4, 0.0);
  float sh = 1.0;
  if (NdL > 0.0 && dist < 900.0) sh = sunShadow(vWorld + N*0.4, 1.2);
  else if (dist >= 900.0) sh = 1.0;
  float back = pow(max(dot(-V, uLightDir), 0.0), 3.0) * 0.5;
  float ao = 0.55 + 0.45*smoothstep(0.0, 1.2, vH * 0.5 + 0.2);
  vec3 amb = mix(uAmbGround, uAmbSky, N.y*0.5+0.5) * ao;
  vec3 lit = col * (uLightColor*wrap*sh + amb) + leaf*uLightColor*back*sh*vec3(1.0,1.1,0.4)*0.7;
  gl_FragColor = vec4(applyFog(lit, vWorld), 1.0);
}`;

export function buildTrees(terrain, scene, chimHash) {
  const rnd = rng(31337);
  const items = [];
  const town = P('goreme');
  const tmp = new THREE.Vector3();
  const hash = new SpatialHash(6);
  for (let n = 0; n < 260000 && items.length < 6200; n++) {
    const x = (rnd() * 2 - 1) * 1750, z = (rnd() * 2 - 1) * 1750;
    const green = terrain.greenAt(x, z);
    const inTown = Math.hypot(x - town.x, z - town.z) < town.r;
    if (green < 0.42 && !(inTown && rnd() < 0.35)) continue;
    const nn = terrain.normalAt(x, z, tmp);
    if (1 - nn.y > 0.14) continue;
    // meyve bahçesi/bağ deseni: hücre bazlı yoğunluk
    const cell = Math.floor(x / 46) * 131 + Math.floor(z / 46);
    const ch = Math.abs(Math.sin(cell * 12.9898) * 43758.5453) % 1;
    if (ch < 0.45 && !inTown) continue;    // bağlar (ağaçsız)
    const poplar = ch > 0.85 || rnd() < 0.18;
    const r = poplar ? 1.4 : 2.6;
    if (hash.anyWithin(x, z, r)) continue;
    if (chimHash && chimHash.anyWithin(x, z, 3)) continue;
    const s = poplar ? 0.8 + rnd() * 0.6 : 0.65 + rnd() * 0.75;
    items.push({ x, z, y: terrain.heightAt(x, z) - 0.15, poplar, s, yaw: rnd() * 6.28, tone: rnd(), seed: rnd() });
    hash.add(x, z, r, null);
  }
  // geometri: yuvarlak ağaç + kavak
  const round = mergeGeometries([trunk(2.2, 0.16), blob(1, 1.7, 1.45, 1.7, 0, 3.4, 0, 1.3), blob(1, 1.1, 0.9, 1.1, 0.9, 2.6, 0.3, 5.1)].map(dropIndex));
  const pop = mergeGeometries([trunk(2.0, 0.14), blob(1, 0.72, 4.7, 0.72, 0, 5.0, 0, 8.7)].map(dropIndex));
  round.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 3, 0), 6);
  pop.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 5, 0), 11);
  const mat = new THREE.ShaderMaterial({ uniforms: { ...U }, vertexShader: TREE_VERT, fragmentShader: TREE_FRAG });
  const group = new THREE.Group();
  const q = new THREE.Quaternion(), ax = new THREE.Vector3(0, 1, 0), pos = new THREE.Vector3(), scl = new THREE.Vector3();
  const common = {
    material: mat, group, cells: 8, maxDist: 2200,
    matrixOf: (it, m) => { q.setFromAxisAngle(ax, it.yaw); pos.set(it.x, it.y, it.z); scl.setScalar(it.s); m.compose(pos, q, scl); },
    attr: (it, a, o) => { a[o] = 0; a[o + 1] = it.tone; a[o + 2] = 0; a[o + 3] = it.seed; },
  };
  const m1 = buildCells({ ...common, items: items.filter(i => !i.poplar), geometry: round });
  const m2 = buildCells({ ...common, items: items.filter(i => i.poplar), geometry: pop });
  scene.add(group);
  return { group, meshes: [...m1, ...m2], items };
}

// mesafe kırpma (hücre başına)
export function cullByDistance(meshes, cam) {
  const px = cam.position.x, pz = cam.position.z;
  for (const m of meshes) {
    const d = Math.hypot(m.userData.cx - px, m.userData.cz - pz);
    m.visible = d < (m.userData.maxDist || 3000) + 350;
  }
}
