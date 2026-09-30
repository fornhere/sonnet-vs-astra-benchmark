import * as THREE from 'three';
import { U, NOISE, ATMOS, SHADOW_FN, HEIGHT_FN } from './glsl.js';
import { rng } from './util.js';
import { POIS } from './config.js';

const COUNT = 24;          // dünyadaki balonlar
const TOTAL = COUNT + 1;   // + oyuncunun kendi balonu

const PALETTE = [
  [0.85, 0.03, 0.03], [0.95, 0.30, 0.03], [0.98, 0.68, 0.05], [0.03, 0.55, 0.55], [0.04, 0.16, 0.70],
  [0.75, 0.05, 0.42], [0.10, 0.60, 0.14], [0.92, 0.90, 0.85], [0.02, 0.02, 0.03], [0.55, 0.10, 0.65], [0.90, 0.45, 0.60], [0.10, 0.35, 0.85],
];

function envelopeGeometry(S, R) {
  const pts = [[0.24, 0], [0.30, 0.025], [0.50, 0.11], [0.76, 0.27], [0.94, 0.44], [1.0, 0.57], [0.95, 0.71], [0.78, 0.86], [0.47, 0.96], [0, 1.0]];
  const cm = (p0, p1, p2, p3, t) => 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t + (-p0 + 3 * p1 - 3 * p2 + p3) * t * t * t);
  const n = pts.length - 1;
  const samp = (u) => {
    const f = u * n, i = Math.min(Math.floor(f), n - 1), t = f - i;
    const g = (k) => pts[Math.min(Math.max(k, 0), n)];
    return [cm(g(i - 1)[0], g(i)[0], g(i + 1)[0], g(i + 2)[0], t), cm(g(i - 1)[1], g(i)[1], g(i + 1)[1], g(i + 2)[1], t)];
  };
  const pos = [], nor = [], uv = [], idx = [];
  const rows = [];
  for (let j = 0; j <= R; j++) rows.push(samp(j / R));
  for (let j = 0; j <= R; j++) {
    const [r, y] = rows[j];
    const j0 = Math.max(j - 1, 0), j1 = Math.min(j + 1, R);
    const dr = rows[j1][0] - rows[j0][0], dy = rows[j1][1] - rows[j0][1];
    for (let i = 0; i <= S; i++) {
      const th = i / S * Math.PI * 2, c = Math.cos(th), s = Math.sin(th);
      // gore çıkıntısı: her panel hafif şişkin
      const gs = (i / S) * 24;
      const bulge = 1 + 0.018 * Math.sin(gs * Math.PI * 2 - Math.PI / 2 + Math.PI) * 0;
      pos.push(r * c * bulge, y, r * s * bulge);
      // yüzey normali (profilin dik yönü)
      let nr = dy, ny = -dr; const l = Math.hypot(nr, ny) || 1; nr /= l; ny /= l;
      if (j === R) { nor.push(0, 1, 0); } else nor.push(nr * c, ny, nr * s);
      uv.push(i / S, j / R);
    }
  }
  for (let j = 0; j < R; j++) for (let i = 0; i < S; i++) {
    const a = j * (S + 1) + i, b = a + 1, c = a + S + 1, d = c + 1;
    idx.push(a, c, b, b, c, d);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  // yön kontrolü
  const p = g.attributes.position, nn = g.attributes.normal;
  const v = (k) => new THREE.Vector3(p.getX(k), p.getY(k), p.getZ(k));
  const gn = new THREE.Vector3().crossVectors(v(idx[1]).sub(v(idx[0])), v(idx[2]).sub(v(idx[0])));
  if (gn.dot(new THREE.Vector3(nn.getX(idx[0]), nn.getY(idx[0]), nn.getZ(idx[0]))) < 0) {
    for (let k = 0; k < idx.length; k += 3) { const t = idx[k + 1]; idx[k + 1] = idx[k + 2]; idx[k + 2] = t; }
    g.setIndex(idx);
  }
  g.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0.5, 0), 1.2);
  return g;
}

const ENV_VERT = /* glsl */ `
attribute vec4 aA; attribute vec4 aB; attribute vec4 aC;
varying vec3 vWorld; varying vec3 vN; varying vec2 vUV; varying vec4 vA; varying vec4 vB; varying vec4 vC;
void main(){
  mat4 M = modelMatrix * instanceMatrix;
  vec4 wp = M * vec4(position, 1.0);
  vN = normalize(mat3(M) * normal);
  vWorld = wp.xyz; vUV = uv; vA = aA; vB = aB; vC = aC;
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`;
const ENV_FRAG = /* glsl */ `
${NOISE}
${ATMOS}
${HEIGHT_FN}
${SHADOW_FN}
varying vec3 vWorld; varying vec3 vN; varying vec2 vUV; varying vec4 vA; varying vec4 vB; varying vec4 vC;
void main(){
  vec3 N = normalize(vN);
  if (!gl_FrontFacing) N = -N;
  vec3 V = normalize(cameraPosition - vWorld);
  float gore = vUV.x * 24.0;
  float gi = floor(gore), gf = fract(gore);
  float y = vUV.y;
  int pat = int(vA.w + 0.5);
  vec3 c1 = vA.rgb, c2 = vB.rgb, c3 = vC.rgb;
  vec3 col = c1;
  float par = mod(gi, 2.0);
  if (pat == 0) { col = par < 0.5 ? c1 : c2; }
  else if (pat == 1) { float b = floor(y*7.0); col = mod(b, 2.0) < 0.5 ? c1 : c2; if (y > 0.86) col = c3; }
  else if (pat == 2) { float m = mod(gi, 3.0); col = m < 0.5 ? c1 : (m < 1.5 ? c2 : c3); }
  else if (pat == 3) { float z = mod(gi + floor(y*9.0), 2.0); col = z < 0.5 ? c1 : c2; }
  else if (pat == 4) { col = c1; if (y > 0.30 && y < 0.40) col = c2; if (y > 0.62 && y < 0.70) col = c3; if (y > 0.9) col = c2; }
  else { float w = abs(fract(gore*0.5) - 0.5); col = (w + 0.3*sin(y*12.0)) < 0.25 ? c2 : c1; if (y < 0.16) col = c3; }
  // etek
  if (y < 0.055) col = mix(vec3(0.02), c3, 0.35);
  // dikişler
  float seam = smoothstep(0.0, 0.05, gf) * smoothstep(1.0, 0.95, gf);
  col *= 0.8 + 0.2*seam;
  float ring = smoothstep(0.0, 0.03, abs(fract(y*9.0)-0.0));
  col *= 0.94 + 0.06*ring;
  col *= 0.92 + 0.16*vnoise(vec2(gore*3.0, y*40.0));

  float NdL = max(dot(N, uLightDir), 0.0);
  float wrap = max((dot(N, uLightDir) + 0.35)/1.35, 0.0);
  float bs = 1.0;
  float sh = 1.0;
  float dist = length(vWorld - cameraPosition);
  // terrain onu gölgeleyebilir (vadi duvarı vs.)
  if (NdL > 0.0 && dist < 3000.0) sh = sunShadow(vWorld + N*0.5, 3.0);
  // kumaş ışık geçirgenliği (arka aydınlatma)
  float back = pow(max(dot(-N, uLightDir), 0.0), 1.2) * max(dot(V, -uLightDir)*0.5+0.5, 0.0);
  vec3 trans = col * uLightColor * back * 1.0 * sh;
  vec3 amb = mix(uAmbGround, uAmbSky, N.y*0.5+0.5);
  vec3 lit = col * (uLightColor * wrap * sh + amb) + trans;
  // parlaklık
  vec3 H = normalize(uLightDir + V);
  lit += uLightColor * pow(max(dot(N,H),0.0), 40.0) * 0.06 * sh;
  // brülör ışıması (alt yarıda içten aydınlanma)
  float flame = vC.w;
  float lowMask = smoothstep(0.62, 0.05, y);
  float inner = (0.35*uNight + 0.12 + flame*1.2) * lowMask;
  lit += col * vec3(2.2,1.0,0.35) * inner * (0.6 + 0.4*flame);
  if (!gl_FrontFacing) lit *= 0.42;
  gl_FragColor = vec4(applyFog(lit, vWorld), 1.0);
}
`;

const BASKET_VERT = /* glsl */ `
varying vec3 vWorld; varying vec3 vN; varying vec3 vL;
void main(){
  mat4 M = modelMatrix * instanceMatrix;
  vec4 wp = M * vec4(position, 1.0);
  vN = normalize(mat3(M) * normal); vWorld = wp.xyz; vL = position;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`;
const BASKET_FRAG = /* glsl */ `
${NOISE}
${ATMOS}
varying vec3 vWorld; varying vec3 vN; varying vec3 vL;
void main(){
  vec3 N = normalize(vN);
  float weave = 0.75 + 0.25*step(0.5, fract(vL.y*9.0 + floor(vL.x*8.0+vL.z*8.0)*0.5));
  vec3 col = vec3(0.30,0.18,0.09)*weave;
  float NdL = max(dot(N, uLightDir), 0.0);
  vec3 lit = col*(uLightColor*NdL*0.9 + mix(uAmbGround,uAmbSky,N.y*0.5+0.5));
  gl_FragColor = vec4(applyFog(lit, vWorld), 1.0);
}`;

const FLAME_VERT = /* glsl */ `
attribute vec4 aF; // xyz konum, w şiddet
varying vec2 vUv; varying float vI;
void main(){
  vUv = uv; vI = aF.w;
  vec4 mv = viewMatrix * vec4(aF.xyz, 1.0);
  float s = (2.0 + 9.0*aF.w);
  mv.xy += position.xy * s;
  gl_Position = projectionMatrix * mv;
}`;
const FLAME_FRAG = /* glsl */ `
varying vec2 vUv; varying float vI;
void main(){
  vec2 p = vUv - 0.5;
  float d = length(p*vec2(1.3, 0.8));
  float core = smoothstep(0.5, 0.0, d);
  float tip = smoothstep(0.5, -0.1, p.y*1.0 + d*0.6);
  float a = core*core*vI * 1.6;
  gl_FragColor = vec4(vec3(1.8,0.85,0.25)*a*3.0, a);
}`;

export class Balloons {
  constructor(scene, terrain) {
    this.scene = scene; this.terrain = terrain;
    const rnd = rng(77);
    this.items = [];
    const S = 32, R = 26;
    const geo = envelopeGeometry(S, R);
    const g = new THREE.InstancedBufferGeometry();
    g.index = geo.index; g.attributes = { ...geo.attributes }; g.boundingSphere = geo.boundingSphere;
    const A = new Float32Array(TOTAL * 4), B = new Float32Array(TOTAL * 4), Cc = new Float32Array(TOTAL * 4);
    this.aC = new THREE.InstancedBufferAttribute(Cc, 4);
    g.setAttribute('aA', new THREE.InstancedBufferAttribute(A, 4));
    g.setAttribute('aB', new THREE.InstancedBufferAttribute(B, 4));
    g.setAttribute('aC', this.aC);
    this.env = new THREE.InstancedMesh(g, new THREE.ShaderMaterial({ uniforms: { ...U }, vertexShader: ENV_VERT, fragmentShader: ENV_FRAG, side: THREE.DoubleSide }), TOTAL);
    this.env.frustumCulled = false;
    this.env.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    // sepet
    const bg = new THREE.BoxGeometry(1, 1, 1);
    this.basket = new THREE.InstancedMesh(bg, new THREE.ShaderMaterial({ uniforms: { ...U }, vertexShader: BASKET_VERT, fragmentShader: BASKET_FRAG }), TOTAL);
    this.basket.frustumCulled = false; this.basket.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    // alev
    const fg = new THREE.InstancedBufferGeometry();
    const qg = new THREE.PlaneGeometry(1, 1);
    fg.index = qg.index; fg.attributes = { ...qg.attributes };
    this.fArr = new Float32Array(TOTAL * 4);
    this.fAttr = new THREE.InstancedBufferAttribute(this.fArr, 4); this.fAttr.setUsage(THREE.DynamicDrawUsage);
    fg.setAttribute('aF', this.fAttr);
    fg.instanceCount = TOTAL;
    this.flame = new THREE.Mesh(fg, new THREE.ShaderMaterial({ vertexShader: FLAME_VERT, fragmentShader: FLAME_FRAG, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    this.flame.frustumCulled = false; this.flame.renderOrder = 5;
    // kablolar
    this.cableGeo = new THREE.BufferGeometry();
    this.cablePos = new Float32Array(COUNT * 8 * 2 * 3);
    this.cableGeo.setAttribute('position', new THREE.BufferAttribute(this.cablePos, 3).setUsage(THREE.DynamicDrawUsage));
    this.cables = new THREE.LineSegments(this.cableGeo, new THREE.LineBasicMaterial({ color: 0x1a1410, transparent: true, opacity: 0.55, fog: false }));
    this.cables.frustumCulled = false;

    const fieldPoi = POIS.find(p => p.id === 'balon');
    for (let i = 0; i < COUNT; i++) {
      const pa = PALETTE[Math.floor(rnd() * PALETTE.length)];
      let pb = PALETTE[Math.floor(rnd() * PALETTE.length)];
      let pc = PALETTE[Math.floor(rnd() * PALETTE.length)];
      if (pb === pa) pb = PALETTE[(PALETTE.indexOf(pa) + 3) % PALETTE.length];
      if (pc === pa || pc === pb) pc = PALETTE[8];
      const pat = Math.floor(rnd() * 6);
      A.set([...pa, pat], i * 4); B.set([...pb, 0], i * 4); Cc.set([...pc, 0], i * 4);
      const size = 0.75 + rnd() * 0.5;
      const launch = i < 7; // alanda kalkış hazırlığı yapanlar
      const LAUNCH = [[-12, -8, 6], [34, -42, 12], [-48, -46, 18], [16, 30, 10], [66, 4, 24], [-74, 22, 14], [-30, 62, 30]];
      const it = {
        i, size: launch ? 0.95 + rnd() * 0.25 : size,
        launch,
        x: launch ? fieldPoi.x + LAUNCH[i][0] : (rnd() * 2 - 1) * 1300,
        z: launch ? fieldPoi.z + LAUNCH[i][1] : (rnd() * 2 - 1) * 1300,
        agl: launch ? LAUNCH[i][2] : 55 + Math.pow(rnd(), 0.8) * 320,
        targetAgl: 60 + rnd() * 260,
        phase: rnd() * 6.28, meander: 0.4 + rnd() * 0.8,
        burnT: rnd() * 8, burnPeriod: launch ? 3.2 + rnd() * 2.5 : 5 + rnd() * 6, burnLen: 1.2 + rnd() * 1.3,
        flame: 0, y: 0, rise: launch,
      };
      this.items.push(it);
    }
    A.set([0.86, 0.05, 0.04, 0], COUNT * 4); B.set([0.95, 0.93, 0.88, 0], COUNT * 4); Cc.set([0.03, 0.03, 0.04, 0], COUNT * 4);
    this.env.geometry.attributes.aA.needsUpdate = true; this.env.geometry.attributes.aB.needsUpdate = true;
    scene.add(this.env, this.basket, this.flame, this.cables);
    this.time = 0;
    this.initial = this.items.map(it => ({ ...it }));
    this.m = new THREE.Matrix4(); this.q = new THREE.Quaternion(); this.p = new THREE.Vector3(); this.s = new THREE.Vector3();
  }

  reset() {
    this.items.forEach((it, i) => Object.assign(it, this.initial[i]));
    this.time = 0;
  }

  update(dt, pb) {
    this.time += dt;
    const T = this.time, tr = this.terrain;
    const wind = this._wind || (this._wind = new THREE.Vector3(2.4, 0, 0.9));
    const up = this._up || (this._up = new THREE.Vector3(0, 1, 0));
    const bal = U.uBalloons.value;
    for (const it of this.items) {
      // yükselme
      if (it.rise) { it.agl += (it.targetAgl - it.agl) * Math.min(1, dt * 0.012) + dt * 0.7; if (Math.abs(it.agl - it.targetAgl) < 3) it.rise = false; }
      const alt = 1 + it.agl / 400;
      const wf = it.launch ? Math.min(1, Math.max(0, (it.agl - 40) / 90)) : 1;   // kalkışta neredeyse yerinde
      it.x += (wind.x * alt + Math.sin(T * 0.05 * it.meander + it.phase) * 0.9) * dt * wf;
      it.z += (wind.z * alt + Math.cos(T * 0.043 * it.meander + it.phase) * 0.8) * dt * wf;
      if (it.x > 1500) { it.x = -1500; } if (it.z > 1500) { it.z = -1500; } if (it.x < -1600) it.x = 1500; if (it.z < -1600) it.z = 1500;
      const gnd = tr.heightAt(it.x, it.z);
      const bob = Math.sin(T * 0.3 + it.phase) * 1.2;
      const hoverMin = 3.5;
      const targetY = gnd + Math.max(it.agl, hoverMin) + bob;
      if (it.y === 0) it.y = targetY; else it.y += (targetY - it.y) * Math.min(1, dt * 1.5);
      // brülör
      it.burnT += dt;
      const ph = it.burnT % it.burnPeriod;
      const target = ph < it.burnLen ? 1 : 0;
      it.flame += (target - it.flame) * Math.min(1, dt * (target ? 8 : 3));
      if (target && it.rise) { it.agl += dt * 1.6; }
      const sc = 11 * it.size;                     // zarf yarıçapı ~ 11 m
      const envH = 24 * it.size;
      const yaw = T * 0.02 * it.meander + it.phase;
      this.q.setFromAxisAngle(up, yaw);
      const bx = it.x, bz = it.z, by = it.y;
      // zarfın ağzı sepetin ~ 4.3 m üstünde
      this.p.set(bx, by + 4.0 * it.size, bz); this.s.set(sc, envH, sc);
      this.m.compose(this.p, this.q, this.s); this.env.setMatrixAt(it.i, this.m);
      this.p.set(bx, by, bz); this.s.set(1.6 * it.size, 1.1 * it.size, 1.6 * it.size);
      this.m.compose(this.p, this.q, this.s); this.basket.setMatrixAt(it.i, this.m);
      this.aC.setW(it.i, it.flame);
      this.fArr[it.i * 4] = bx; this.fArr[it.i * 4 + 1] = by + 3.0 * it.size; this.fArr[it.i * 4 + 2] = bz;
      this.fArr[it.i * 4 + 3] = it.flame * (0.75 + 0.25 * Math.sin(T * 40 + it.phase * 9));
      // kablolar
      for (let k = 0; k < 8; k++) {
        const a = k / 8 * Math.PI * 2 + yaw;
        const o = (it.i * 8 + k) * 6;
        this.cablePos[o] = bx + Math.cos(a) * 0.75 * it.size; this.cablePos[o + 1] = by + 1.05 * it.size; this.cablePos[o + 2] = bz + Math.sin(a) * 0.75 * it.size;
        this.cablePos[o + 3] = bx + Math.cos(a) * 2.6 * it.size; this.cablePos[o + 4] = by + 4.2 * it.size; this.cablePos[o + 5] = bz + Math.sin(a) * 2.6 * it.size;
      }
      bal[it.i].set(bx, by + envH * 0.5 + 4 * it.size, bz, sc * 0.95);
    }
    // oyuncunun balonu (balon modunda üstünde şişer)
    {
      const i = COUNT;
      if (pb && pb.s > 0.03) {
        const size = 1.1 * pb.s;
        const by = pb.y - 1.65;
        this.q.setFromAxisAngle(up, pb.yaw || 0);
        this.p.set(pb.x, by + 4.0 * size, pb.z); this.s.set(11 * size, 24 * size, 11 * size);
        this.m.compose(this.p, this.q, this.s); this.env.setMatrixAt(i, this.m);
        this.fArr[i * 4] = pb.x; this.fArr[i * 4 + 1] = by + 3.2 * size + 1.2 * pb.s; this.fArr[i * 4 + 2] = pb.z; this.fArr[i * 4 + 3] = pb.flame * 0.22;
        this.aC.setW(i, pb.flame * 0.35);
      } else {
        this.p.set(0, -9999, 0); this.s.set(0.001, 0.001, 0.001); this.m.compose(this.p, this.q, this.s); this.env.setMatrixAt(i, this.m);
        this.fArr[i * 4 + 3] = 0;
      }
      this.p.set(0, -9999, 0); this.s.set(0.001, 0.001, 0.001); this.m.compose(this.p, this.q, this.s); this.basket.setMatrixAt(i, this.m);
    }
    this.env.instanceMatrix.needsUpdate = true; this.basket.instanceMatrix.needsUpdate = true;
    this.aC.needsUpdate = true; this.fAttr.needsUpdate = true;
    this.cableGeo.attributes.position.needsUpdate = true;
  }

  nearest(pos) {
    let best = null, bd = 1e9;
    for (const it of this.items) { const d = Math.hypot(it.x - pos.x, it.y - pos.y, it.z - pos.z); if (d < bd) { bd = d; best = it; } }
    return { it: best, d: bd };
  }
}


// Kalkış alanında yerde yatan söngün balonlar ve destek araçları
const VEH_VERT = /* glsl */ `
attribute vec4 aInst;
varying vec3 vWorld; varying vec3 vN; varying vec4 vI;
void main(){
  mat4 M = modelMatrix * instanceMatrix;
  vec3 sc = vec3(length(M[0].xyz), length(M[1].xyz), length(M[2].xyz));
  vec4 wp = M * vec4(position, 1.0);
  vN = normalize(mat3(M) * (normal / (sc*sc))); vWorld = wp.xyz; vI = aInst;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`;
const VEH_FRAG = /* glsl */ `
${NOISE}
${ATMOS}
varying vec3 vWorld; varying vec3 vN; varying vec4 vI;
void main(){
  vec3 N = normalize(vN);
  vec3 col = vI.rgb;
  float NdL = max(dot(N, uLightDir), 0.0);
  vec3 lit = col * (uLightColor*NdL*0.9 + mix(uAmbGround, uAmbSky, N.y*0.5+0.5));
  // sürücü kabini için ön cam ve far parıltısı (gece)
  lit += vec3(1.0,0.85,0.55) * uNight * 0.6 * step(0.985, fract(vI.a*7.0)) ;
  gl_FragColor = vec4(applyFog(lit, vWorld), 1.0);
}`;

export function buildFieldProps(scene, terrain) {
  const field = POIS.find(p => p.id === 'balon');
  const rnd = rng(31);
  const group = new THREE.Group();
  // yatan zarflar
  const S = 28, R = 20;
  const geo = envelopeGeometry(S, R);
  const n = 6;
  const g = new THREE.InstancedBufferGeometry();
  g.index = geo.index; g.attributes = { ...geo.attributes }; g.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 60);
  const A = new Float32Array(n * 4), B = new Float32Array(n * 4), C = new Float32Array(n * 4);
  for (let i = 0; i < n; i++) {
    const pa = PALETTE[Math.floor(rnd() * PALETTE.length)], pb = PALETTE[Math.floor(rnd() * PALETTE.length)], pc = PALETTE[8];
    A.set([...pa, Math.floor(rnd() * 6)], i * 4); B.set([...pb, 0], i * 4); C.set([...pc, 0], i * 4);
  }
  g.setAttribute('aA', new THREE.InstancedBufferAttribute(A, 4)); g.setAttribute('aB', new THREE.InstancedBufferAttribute(B, 4)); g.setAttribute('aC', new THREE.InstancedBufferAttribute(C, 4));
  const m = new THREE.InstancedMesh(g, new THREE.ShaderMaterial({ uniforms: { ...U }, vertexShader: ENV_VERT, fragmentShader: ENV_FRAG }), n);
  const spots = [[95, 40], [120, -20], [70, 95], [-110, 60], [-135, -30], [-60, 120]];
  const mat4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), pos = new THREE.Vector3(), scl = new THREE.Vector3();
  for (let i = 0; i < n; i++) {
    const [ox, oz] = spots[i]; const x = field.x + ox, z = field.z + oz;
    const y = terrain.heightAt(x, z);
    const yaw = rnd() * 6.28;
    q.setFromEuler(e.set(0, yaw, 0)).multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2));
    pos.set(x, y + 1.3, z); scl.set(4.2, 22 + rnd() * 5, 8.5 + rnd() * 2);
    mat4.compose(pos, q, scl); m.setMatrixAt(i, mat4);
  }
  m.frustumCulled = false; group.add(m);
  // araçlar
  const bg = new THREE.BoxGeometry(1, 1, 1); bg.translate(0, 0.5, 0);
  const nv = 9; const bgeo = new THREE.InstancedBufferGeometry(); bgeo.index = bg.index; bgeo.attributes = { ...bg.attributes }; bgeo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 1, 0), 6);
  const I = new Float32Array(nv * 4);
  const vm = new THREE.InstancedMesh(bgeo, new THREE.ShaderMaterial({ uniforms: { ...U }, vertexShader: VEH_VERT, fragmentShader: VEH_FRAG }), nv);
  const cols = [[0.75, 0.75, 0.72], [0.15, 0.25, 0.5], [0.6, 0.12, 0.1], [0.85, 0.82, 0.7], [0.2, 0.2, 0.22]];
  for (let i = 0; i < nv; i++) {
    const a = rnd() * 6.28, d = 70 + rnd() * 110; const x = field.x + Math.cos(a) * d, z = field.z + Math.sin(a) * d;
    const y = terrain.heightAt(x, z); const yaw = rnd() * 6.28;
    q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), yaw); pos.set(x, y - 0.1, z);
    const trailer = rnd() < 0.5; scl.set(2.1, trailer ? 2.4 : 1.9, trailer ? 6.0 : 4.6);
    mat4.compose(pos, q, scl); vm.setMatrixAt(i, mat4);
    const c = cols[Math.floor(rnd() * cols.length)]; I.set([...c, rnd()], i * 4);
  }
  bgeo.setAttribute('aInst', new THREE.InstancedBufferAttribute(I, 4));
  vm.frustumCulled = false; group.add(vm);
  scene.add(group);
  return group;
}
