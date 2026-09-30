// Kayalığa çarpan dalgalardan sıçrayan su damlaları ve sis. CPU'da balistik simülasyon,
// GPU'da billboard çizimi. Tetikleme, deniz shader'ındaki dalga fazıyla aynı formülü kullanır.
import * as THREE from 'three';
import { U } from './uniforms.js';
import { COMMON_UNIFORMS, BEAM } from './shaders/chunks.js';
import { Q } from './config.js';
import { WAVES, T_SCALE, heightAt } from './waves.js';
import { footprintPoints, ISLET } from './islet.js';
import { mulberry32 } from './util/rng.js';
import { DIM } from './tower.js';

const VERT = /* glsl */`
${COMMON_UNIFORMS}
${BEAM}
attribute vec3 aPos;
attribute vec4 aData;   // yaş, ömür, boyut, tür (0 damla, 1 sis)
attribute vec3 aVel;
varying vec2 vUv;
varying float vA;
varying vec3 vLight;
varying float vType;
void main(){
  float age = aData.x, life = aData.y;
  float t = age / max(life, 0.01);
  float alive = step(0.0, age) * step(age, life);
  float grow = mix(1.0, 3.2, aData.w) * (0.35 + 0.65 * sqrt(clamp(t, 0.0, 1.0)));
  float size = aData.z * grow * alive;
  vec4 vp = viewMatrix * vec4(aPos, 1.0);
  vec3 vv = mat3(viewMatrix) * aVel;
  float spd = length(vv.xy);
  vec2 dir = spd > 0.01 ? vv.xy / spd : vec2(0.0, 1.0);
  float stretch = 1.0 + (1.0 - aData.w) * min(spd * 0.22, 3.2);
  vec2 q = position.xy;
  vp.xy += (dir * q.y * stretch + vec2(-dir.y, dir.x) * q.x) * size;
  vUv = position.xy;
  vType = aData.w;
  float fade = (1.0 - t) * smoothstep(0.0, 0.06, t);
  vA = fade * mix(0.85, 0.15, aData.w) * alive;
  float bl = beamLit(aPos);
  vLight = (uAmbient * 2.6 + uHorizon * 0.9 + vec3(0.03, 0.035, 0.045))
         + vec3(0.7, 0.8, 1.0) * uFlash * 2.4
         + vec3(1.0, 0.88, 0.62) * bl * 10.0
         + vec3(1.0, 0.68, 0.40) * 0.85 * exp(-length(aPos - vec3(0.0, 7.0, 0.0)) * 0.045);
  gl_Position = projectionMatrix * vp;
}
`;
const FRAG = /* glsl */`
varying vec2 vUv;
varying float vA;
varying vec3 vLight;
varying float vType;
void main(){
  float r = length(vUv) * 2.0;
  float soft = smoothstep(1.0, 0.25, r);
  float a = soft * vA;
  if (a < 0.003) discard;
  gl_FragColor = vec4(vLight, a);
}
`;

const W0 = WAVES[0];
function rockPulse(x, z, t) {
  const s = 0.5 + 0.5 * Math.sin((x * W0.dx + z * W0.dz) * W0.k - t * T_SCALE * W0.w + 1.1);
  return s * s;
}

export class Spray {
  constructor(scene) {
    const N = Q.sprayMax;
    this.N = N;
    this.pos = new Float32Array(N * 3);
    this.vel = new Float32Array(N * 3);
    this.data = new Float32Array(N * 4);
    for (let i = 0; i < N; i++) this.data[i * 4] = -1;
    this.head = 0;
    this.rnd = mulberry32(99);

    const geo = new THREE.InstancedBufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([-0.5, -0.5, 0, 0.5, -0.5, 0, -0.5, 0.5, 0, 0.5, 0.5, 0]), 3));
    geo.setIndex([0, 1, 2, 1, 3, 2]);
    this.aPos = new THREE.InstancedBufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage);
    this.aData = new THREE.InstancedBufferAttribute(this.data, 4).setUsage(THREE.DynamicDrawUsage);
    geo.setAttribute('aPos', this.aPos);
    geo.setAttribute('aData', this.aData);
    this.aVel = new THREE.InstancedBufferAttribute(this.vel, 3).setUsage(THREE.DynamicDrawUsage);
    geo.setAttribute('aVel', this.aVel);
    geo.instanceCount = N;
    const mat = new THREE.ShaderMaterial({
      uniforms: { ...U }, vertexShader: VERT, fragmentShader: FRAG,
      transparent: true, depthWrite: false,
    });
    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 9;
    scene.add(this.mesh);

    // çevre örnek noktaları (kaya su hattı) ve dışa bakan normaller
    const pts = footprintPoints(1.07, 44);
    this.pts = pts.map((p, i, arr) => {
      const q = arr[(i + 1) % arr.length], o = arr[(i - 1 + arr.length) % arr.length];
      let nx = q.y - o.y, nz = -(q.x - o.x);
      const l = Math.hypot(nx, nz) || 1; nx /= l; nz /= l;
      if (nx * (p.x - ISLET.center.x) + nz * (p.y - ISLET.center.y) < 0) { nx = -nx; nz = -nz; }
      // dalga yönüne (kuzeydoğu) ters bakan yüzler çarpma alır
      const exposure = Math.max(0, -(nx * 0.7071 + nz * -0.7071));
      return { x: p.x, z: p.y, nx, nz, exposure, last: 0 };
    });
  }

  emit(x, y, z, vx, vy, vz, life, size, type) {
    const i = this.head; this.head = (this.head + 1) % this.N;
    this.pos[i * 3] = x; this.pos[i * 3 + 1] = y; this.pos[i * 3 + 2] = z;
    this.vel[i * 3] = vx; this.vel[i * 3 + 1] = vy; this.vel[i * 3 + 2] = vz;
    this.data[i * 4] = 0; this.data[i * 4 + 1] = life; this.data[i * 4 + 2] = size; this.data[i * 4 + 3] = type;
  }

  burst(p, energy, storm) {
    const r = this.rnd;
    const n = Math.floor((40 + energy * 150) * (0.4 + 0.6 * storm));
    const y0 = Math.max(0.8, DIM.platformY * 0.35);
    for (let i = 0; i < n; i++) {
      const sp = (1.5 + r() * 4.5) * (0.6 + energy);
      const up = (5 + r() * 10.5) * (0.55 + 0.75 * energy);
      const spread = (r() - 0.5) * 3.5;
      const tx = -p.nz, tz = p.nx;
      this.emit(
        p.x + p.nx * (0.3 + r()) + tx * (r() - 0.5) * 3, y0 + r() * 1.2, p.z + p.nz * (0.3 + r()) + tz * (r() - 0.5) * 3,
        p.nx * sp + tx * spread, up, p.nz * sp + tz * spread,
        1.0 + r() * 1.7, 0.05 + r() * r() * r() * 0.55 + r() * 0.06, 0);
    }
    // sis bulutu
    const m = Math.floor(2 + energy * 5);
    for (let i = 0; i < m; i++) {
      this.emit(p.x + p.nx * r() * 2, y0 + 0.5 + r() * 2.5, p.z + p.nz * r() * 2,
        p.nx * (1 + r() * 2), 1.5 + r() * 3, p.nz * (1 + r() * 2), 1.6 + r() * 1.8, 1.0 + r() * 1.2, 1);
    }
  }

  update(dt, time, state) {
    const storm = state.stormSmooth;
    // tetikleme
    if (storm > 0.06) {
      for (const p of this.pts) {
        if (p.exposure < 0.08) continue;
        const pulse = rockPulse(p.x, p.z, time);
        if (pulse > 0.68 && p.last <= 0.68) {
          const e = p.exposure * (0.35 + 0.65 * pulse);
          if (this.rnd() < 0.3 + 0.7 * storm) this.burst(p, e * (0.4 + 0.9 * storm), storm);
        }
        p.last = pulse;
      }
    }
    // benzetim
    const wind = state.wind;
    const wx = 0.7071 * wind, wz = -0.7071 * wind;
    const N = this.N, d = this.data;
    for (let i = 0; i < N; i++) {
      const a = d[i * 4];
      if (a < 0) continue;
      const life = d[i * 4 + 1];
      const na = a + dt;
      if (na > life) { d[i * 4] = -1; continue; }
      d[i * 4] = na;
      const type = d[i * 4 + 3];
      const k = type > 0.5 ? 0.9 : 0.15;   // sis rüzgâra kapılır
      this.vel[i * 3] += (wx - this.vel[i * 3]) * k * dt;
      this.vel[i * 3 + 2] += (wz - this.vel[i * 3 + 2]) * k * dt;
      this.vel[i * 3 + 1] -= (type > 0.5 ? 0.6 : 9.8) * dt;
      this.pos[i * 3] += this.vel[i * 3] * dt;
      this.pos[i * 3 + 1] += this.vel[i * 3 + 1] * dt;
      this.pos[i * 3 + 2] += this.vel[i * 3 + 2] * dt;
      // suya düşünce yok ol
      if (type < 0.5 && this.pos[i * 3 + 1] < heightAt(this.pos[i * 3], this.pos[i * 3 + 2], time) && this.vel[i * 3 + 1] < 0) d[i * 4] = -1;
    }
    this.aPos.needsUpdate = true;
    this.aData.needsUpdate = true;
    this.aVel.needsUpdate = true;
  }
}
