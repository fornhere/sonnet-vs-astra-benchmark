// Martılar: tek InstancedMesh, kanat çırpma vertex shader'da; fener ışığında ve şimşekte parlarlar.
import * as THREE from 'three';
import { U } from './uniforms.js';
import { COMMON_UNIFORMS, BEAM } from './shaders/chunks.js';
import { Q } from './config.js';
import { heightAt } from './waves.js';
import { mulberry32 } from './util/rng.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

function gullGeometry() {
  const parts = [];
  const gray = [0.60, 0.64, 0.70], white = [0.93, 0.94, 0.97], black = [0.10, 0.11, 0.13], yellow = [0.95, 0.72, 0.15];
  const colorize = (g, fn) => {
    const p = g.attributes.position, n = g.attributes.normal;
    const col = new Float32Array(p.count * 3);
    for (let i = 0; i < p.count; i++) {
      const c = fn(p.getX(i), p.getY(i), p.getZ(i), n.getY(i));
      col[i * 3] = c[0]; col[i * 3 + 1] = c[1]; col[i * 3 + 2] = c[2];
    }
    g.setAttribute('aColor', new THREE.BufferAttribute(col, 3));
    return g;
  };
  // gövde: iğ şeklinde (x ekseni boyunca)
  const prof = [];
  for (let i = 0; i <= 10; i++) {
    const t = i / 10;
    prof.push(new THREE.Vector2(0.001 + 0.078 * Math.pow(Math.sin(Math.PI * Math.min(0.98, t * 0.96 + 0.02)), 0.75), -0.30 + t * 0.62));
  }
  let body = new THREE.LatheGeometry(prof, 8);
  body.rotateZ(-Math.PI / 2);      // uzunluk +x
  body.scale(1, 0.85, 1);
  body = body.toNonIndexed(); body.deleteAttribute('uv'); body.computeVertexNormals();
  parts.push(colorize(body, (x, y, z, ny) => (ny > 0.15 ? gray : white)));
  // kafa + gaga
  let head = new THREE.SphereGeometry(0.052, 8, 6); head.translate(0.345, 0.026, 0);
  head = head.toNonIndexed(); head.deleteAttribute('uv');
  parts.push(colorize(head, () => white));
  let beak = new THREE.ConeGeometry(0.02, 0.085, 5); beak.rotateZ(-Math.PI / 2); beak.translate(0.43, 0.012, 0);
  beak = beak.toNonIndexed(); beak.deleteAttribute('uv');
  parts.push(colorize(beak, () => yellow));
  // kuyruk
  const tailPos = [-0.28, 0.01, 0.0, -0.50, 0.005, 0.09, -0.50, 0.005, -0.09];
  let tail = new THREE.BufferGeometry(); tail.setAttribute('position', new THREE.Float32BufferAttribute(tailPos, 3)); tail.computeVertexNormals();
  parts.push(colorize(tail, () => white));
  // kanatlar: 3 kesitli, hafif "M" kıvrımı
  const secs = [ // [z, leX, teX, y]
    [0.00, 0.11, -0.13, 0.02],
    [0.24, 0.10, -0.15, 0.06],
    [0.46, 0.05, -0.17, 0.10],
    [0.64, -0.06, -0.20, 0.10],
  ];
  const tip = [-0.20, 0.09, 0.76];
  for (const s of [1, -1]) {
    const pos = [];
    const push = (...v) => pos.push(...v);
    for (let i = 0; i < secs.length - 1; i++) {
      const A = secs[i], B = secs[i + 1];
      const a0 = [A[1], A[3], A[0] * s], a1 = [A[2], A[3] - 0.01, A[0] * s];
      const b0 = [B[1], B[3], B[0] * s], b1 = [B[2], B[3] - 0.01, B[0] * s];
      if (s > 0) { push(...a0, ...a1, ...b0, ...a1, ...b1, ...b0); } else { push(...a0, ...b0, ...a1, ...a1, ...b0, ...b1); }
    }
    const L = secs[secs.length - 1];
    const l0 = [L[1], L[3], L[0] * s], l1 = [L[2], L[3] - 0.01, L[0] * s], tp = [tip[0], tip[1], tip[2] * s];
    if (s > 0) push(...l0, ...l1, ...tp); else push(...l0, ...tp, ...l1);
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.computeVertexNormals();
    parts.push(colorize(g, (x, y, z) => {
      const az = Math.abs(z);
      return az > 0.55 ? black : (az > 0.46 ? [0.32, 0.34, 0.38] : gray);
    }));
  }
  return mergeGeometries(parts);
}

const VERT = /* glsl */`
${COMMON_UNIFORMS}
${BEAM}
attribute vec3 aColor;
attribute vec2 aInst;   // faz, çırpma hızı
varying vec3 vCol;
varying float vFog;
void main(){
  vec3 p = position;
  float f = abs(p.z);
  float flap = sin(uTime * aInst.y + aInst.x);
  p.y += flap * f * f * 0.62 - 0.05 * f * f * (1.0 - flap);
  p.x -= abs(flap) * f * 0.05;
  vec4 wp = modelMatrix * instanceMatrix * vec4(p, 1.0);
  vec3 nw = normalize(mat3(modelMatrix) * mat3(instanceMatrix) * normal);
  float shade = 0.62 + 0.38 * nw.y;
  vec4 mv = viewMatrix * wp;
  float dist = length(mv.xyz);
  vFog = exp(-pow(dist * uFogDensity, 1.5));
  float bl = beamLit(wp.xyz);
  vec3 near = vec3(1.0, 0.7, 0.42) * 0.55 * exp(-length(wp.xyz - vec3(0.0, 15.0, 0.0)) * 0.05);
  vCol = aColor * shade * (uAmbient * 2.0 + vec3(0.012, 0.014, 0.02) + vec3(0.7, 0.8, 1.0) * uFlash * 1.6 + vec3(1.0, 0.9, 0.72) * bl * 12.0 + near + uSunColor * uSunAmt * 0.5);
  gl_Position = projectionMatrix * mv;
}
`;
const FRAG = /* glsl */`
${COMMON_UNIFORMS}
varying vec3 vCol;
varying float vFog;
void main(){
  gl_FragColor = vec4(mix(uFogColor, vCol, vFog), 1.0);
}
`;

export class Birds {
  constructor(scene) {
    const n = Q.birds;
    this.n = n;
    const geo = gullGeometry();
    const inst = new Float32Array(n * 2);
    this.rnd = mulberry32(555);
    this.cfg = [];
    for (let i = 0; i < n; i++) {
      const r = this.rnd;
      const near = i < n * 0.6;
      this.cfg.push({
        cx: (r() - 0.5) * 14, cz: (r() - 0.5) * 14,
        y0: near ? 16 + r() * 26 : 6 + r() * 12,
        Rx: near ? 20 + r() * 40 : 60 + r() * 140, Rz: near ? 16 + r() * 34 : 50 + r() * 110,
        w: (near ? 0.22 : 0.12) * (r() < 0.5 ? 1 : -1) * (0.7 + r() * 0.6),
        ph: r() * 6.28, bob: r() * 6, bobAmp: 1 + r() * 3, size: 0.95 + r() * 0.45, near,
      });
      inst[i * 2] = r() * 6.28; inst[i * 2 + 1] = 7 + r() * 5;
    }
    geo.setAttribute('aInst', new THREE.InstancedBufferAttribute(inst, 2));
    const mat = new THREE.ShaderMaterial({ uniforms: { ...U }, vertexShader: VERT, fragmentShader: FRAG, side: THREE.DoubleSide });
    this.mesh = new THREE.InstancedMesh(geo, mat, n);
    this.mesh.frustumCulled = false;
    this.mesh.layers.disableAll(); this.mesh.layers.enable(0);
    scene.add(this.mesh);
    this._m = new THREE.Matrix4(); this._q = new THREE.Quaternion(); this._e = new THREE.Euler();
    this._p = new THREE.Vector3(); this._p2 = new THREE.Vector3(); this._s = new THREE.Vector3();
  }

  posAt(c, t, storm, out) {
    const th = c.ph + c.w * t * (0.8 + storm * 0.9);
    const drift = storm * 6;
    out.set(
      c.cx + Math.cos(th) * c.Rx + Math.sin(t * 0.31 + c.bob) * 3 + drift * 0.2,
      c.y0 + Math.sin(t * 0.5 + c.bob) * c.bobAmp + Math.sin(t * 1.9 + c.ph) * 0.6,
      c.cz + Math.sin(th) * c.Rz);
    if (!c.near) out.y = Math.max(out.y, heightAt(out.x, out.z, t) + 2.5);
    return out;
  }

  update(dt, t, storm, camPos) {
    const p = this._p, p2 = this._p2;
    for (let i = 0; i < this.n; i++) {
      const c = this.cfg[i];
      this.posAt(c, t, storm, p);
      this.posAt(c, t + 0.15, storm, p2);
      if (camPos) { // kameraya çok yaklaşan martıyı kenara it
        for (const q of [p, p2]) {
          const dx = q.x - camPos.x, dy = q.y - camPos.y, dz = q.z - camPos.z;
          const d = Math.hypot(dx, dy, dz);
          if (d < 22) { const k = (22 - d) / Math.max(d, 0.01); q.x += dx * k; q.y += dy * k; q.z += dz * k; }
        }
      }
      const vx = p2.x - p.x, vy = p2.y - p.y, vz = p2.z - p.z;
      const yaw = Math.atan2(-vz, vx);
      const pitch = Math.atan2(vy, Math.hypot(vx, vz));
      // viraj yönüne yatış
      const bank = -Math.sign(c.w) * (0.45 + storm * 0.25);
      this._e.set(bank, yaw, pitch, 'YZX');
      this._q.setFromEuler(this._e);
      this._s.setScalar(c.size);
      this._m.compose(p, this._q, this._s);
      this.mesh.setMatrixAt(i, this._m);
    }
    this.mesh.instanceMatrix.needsUpdate = true;
  }
}
