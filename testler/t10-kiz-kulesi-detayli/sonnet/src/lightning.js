// Şimşek: rastgele zamanlama, çatallı yıldırım (kamera yönelimli şerit geometri),
// ekranı ve sahneyi aydınlatan flaş, 1-3 sn gecikmeli gök gürültüsü olayı.
import * as THREE from 'three';
import { U } from './uniforms.js';
import { state } from './state.js';
import { mulberry32, clamp, lerp } from './util/rng.js';
import { RNG_SEED, params } from './config.js';

const MAX_SEG = 1600;

const VERT = /* glsl */`
attribute vec3 aA;
attribute vec3 aB;
attribute vec2 aCorner;   // x: yan (-1,1), y: uç (0,1)
attribute vec3 aInfo;     // x: seviye parlaklığı, y: sıra (0..1), z: piksel genişliği
uniform float uPx;
uniform float uProgress;
varying float vSide;
varying float vLevel;
varying float vAlong;
void main(){
  vec4 va = viewMatrix * vec4(aA, 1.0);
  vec4 vb = viewMatrix * vec4(aB, 1.0);
  vec4 vp = mix(va, vb, aCorner.y);
  vec2 d = vb.xy / max(-vb.z, 1.0) - va.xy / max(-va.z, 1.0);
  d = length(d) < 1e-6 ? vec2(0.0, 1.0) : normalize(d);
  vec2 n = vec2(-d.y, d.x);
  float w = aInfo.z * uPx * max(-vp.z, 1.0);
  vec2 ext = d * w * 0.55 * (aCorner.y * 2.0 - 1.0);
  vp.xy += n * aCorner.x * w + ext;
  vSide = aCorner.x;
  vLevel = aInfo.x;
  // çıkış sırasına göre ilerleme (yıldırım yukarıdan aşağı çakar)
  vAlong = step(aInfo.y, uProgress);
  gl_Position = projectionMatrix * vp;
}
`;
const FRAG = /* glsl */`
uniform float uBoltI;
varying float vSide;
varying float vLevel;
varying float vAlong;
void main(){
  if (vAlong < 0.5) discard;
  float p = abs(vSide);
  float core = exp(-p * p * 26.0);
  float glow = exp(-p * 2.6) * 0.30;
  vec3 col = mix(vec3(0.45, 0.58, 1.0), vec3(1.0, 0.97, 0.95), core);
  gl_FragColor = vec4(col * (core * 2.4 + glow * 0.8) * uBoltI * vLevel, 1.0);
}
`;

export class Lightning {
  constructor(scene, camera) {
    this.camera = camera;
    this.rng = mulberry32(RNG_SEED * 7 + 3);
    this.onThunder = null;

    const geo = new THREE.BufferGeometry();
    this.aA = new Float32Array(MAX_SEG * 4 * 3);
    this.aB = new Float32Array(MAX_SEG * 4 * 3);
    this.aCorner = new Float32Array(MAX_SEG * 4 * 2);
    this.aInfo = new Float32Array(MAX_SEG * 4 * 3);
    const idx = new Uint32Array(MAX_SEG * 6);
    for (let s = 0; s < MAX_SEG; s++) {
      const v = s * 4;
      // köşeler: (-1,0) (1,0) (-1,1) (1,1)
      this.aCorner.set([-1, 0, 1, 0, -1, 1, 1, 1], s * 8);
      idx.set([v, v + 1, v + 2, v + 1, v + 3, v + 2], s * 6);
    }
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(MAX_SEG * 4 * 3), 3));
    geo.setAttribute('aA', new THREE.BufferAttribute(this.aA, 3).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute('aB', new THREE.BufferAttribute(this.aB, 3).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute('aCorner', new THREE.BufferAttribute(this.aCorner, 2));
    geo.setAttribute('aInfo', new THREE.BufferAttribute(this.aInfo, 3).setUsage(THREE.DynamicDrawUsage));
    geo.setIndex(new THREE.BufferAttribute(idx, 1));
    geo.setDrawRange(0, 0);
    this.geo = geo;
    this.uniforms = { uPx: { value: 0.001 }, uProgress: { value: 1 }, uBoltI: { value: 0 } };
    const mat = new THREE.ShaderMaterial({
      uniforms: this.uniforms, vertexShader: VERT, fragmentShader: FRAG,
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: true, fog: false, side: THREE.DoubleSide,
    });
    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 6;
    this.mesh.layers.enable(1);
    this.mesh.visible = true;   // boş çizim aralığıyla bile shader baştan derlensin
    scene.add(this.mesh);

    this.t = 0;              // vuruştan beri geçen süre
    this.hold = null;        // hata ayıklama: t'yi sabitle
    this.active = false;
    this.strokes = [];
    this.peak = 1;
    this.visibleBolt = true;
    this.nextIn = params4start();
    this.queue = [];
    this.count = 0;
  }

  // Yıldırım yolu: ortanokta kaydırmalı ana kanal + dallar
  buildBolt(top, ground) {
    const rng = this.rng;
    const segs = [];
    const pushSegs = (a, b, level, depth, disp, o0, o1, bright, width) => {
      if (depth === 0) { segs.push({ a, b, o0, o1, bright, width }); return [a, b]; }
      const dir = b.clone().sub(a);
      const m = a.clone().lerp(b, 0.42 + rng() * 0.16);
      const perp = new THREE.Vector3(rng() - 0.5, (rng() - 0.5) * 0.35, rng() - 0.5).cross(dir);
      if (perp.lengthSq() < 1e-6) perp.set(1, 0, 0);
      perp.normalize();
      m.addScaledVector(perp, (rng() - 0.5) * 2 * disp);
      const om = (o0 + o1) / 2;
      return [...pushSegs(a, m, level, depth - 1, disp * 0.56, o0, om, bright, width), ...pushSegs(m, b, level, depth - 1, disp * 0.56, om, o1, bright, width)];
    };
    const len = top.distanceTo(ground);
    const mainPts = pushSegs(top, ground, 0, 7, len * 0.085, 0, 1, 1.0, 6.5);
    // Ana kanaldan dallar
    const uniq = mainPts.filter((p, i) => i % 2 === 0);
    const branches = 5 + Math.floor(rng() * 6);
    const spawn = (start, dirBase, order, level, blen) => {
      const dir = dirBase.clone();
      const end = start.clone().addScaledVector(dir, blen);
      const pts = pushSegs(start, end, level, level === 1 ? 5 : 4, blen * 0.12, order, Math.min(1, order + blen / len * 0.9), level === 1 ? 0.6 : 0.36, level === 1 ? 4.0 : 2.6);
      return pts;
    };
    for (let i = 0; i < branches; i++) {
      const k = 2 + Math.floor(rng() * (uniq.length - 4));
      const start = uniq[k];
      const order = clamp((start.y - ground.y) / (top.y - ground.y), 0, 1);
      const ord = 1 - order;
      const down = new THREE.Vector3((rng() - 0.5) * 1.6, -(0.15 + rng() * 0.7), (rng() - 0.5) * 1.6).normalize();
      const blen = len * (0.10 + rng() * 0.28);
      const pts = spawn(start, down, ord, 1, blen);
      // ikincil dallar
      if (rng() < 0.7) {
        const j = 2 + Math.floor(rng() * Math.max(1, pts.length - 4));
        const s2 = pts[Math.min(j, pts.length - 1)];
        const d2 = new THREE.Vector3((rng() - 0.5) * 2, -(0.05 + rng() * 0.5), (rng() - 0.5) * 2).normalize();
        spawn(s2, d2, Math.min(1, ord + 0.1), 2, blen * (0.3 + rng() * 0.4));
      }
    }
    // Bulut altında yatay sürünen kollar
    const crawl = 1 + Math.floor(rng() * 3);
    for (let i = 0; i < crawl; i++) {
      const k = Math.floor(rng() * 6);
      const start = uniq[k];
      const dirH = new THREE.Vector3((rng() - 0.5) * 2, (rng() - 0.5) * 0.08, (rng() - 0.5) * 2).normalize();
      spawn(start, dirH, clamp(k / uniq.length, 0, 1), 1, len * (0.25 + rng() * 0.4));
    }
    return segs;
  }

  writeBolt(segs) {
    const n = Math.min(segs.length, MAX_SEG);
    for (let i = 0; i < n; i++) {
      const s = segs[i];
      for (let c = 0; c < 4; c++) {
        const o = (i * 4 + c) * 3;
        this.aA[o] = s.a.x; this.aA[o + 1] = s.a.y; this.aA[o + 2] = s.a.z;
        this.aB[o] = s.b.x; this.aB[o + 1] = s.b.y; this.aB[o + 2] = s.b.z;
        this.aInfo[o] = s.bright; this.aInfo[o + 1] = c < 2 ? s.o0 : s.o1; this.aInfo[o + 2] = s.width;
      }
    }
    this.geo.attributes.aA.needsUpdate = true;
    this.geo.attributes.aB.needsUpdate = true;
    this.geo.attributes.aInfo.needsUpdate = true;
    this.geo.setDrawRange(0, n * 6);
  }

  /** @param {{manual?:boolean, sheet?:boolean}} o */
  strike(o = {}) {
    const rng = this.rng;
    const cam = this.camera;
    const fwd = new THREE.Vector3(); cam.getWorldDirection(fwd); fwd.y = 0;
    if (fwd.lengthSq() < 1e-4) fwd.set(1, 0, 0);
    fwd.normalize();
    const az = (rng() - 0.5) * (o.manual ? 0.5 : 0.8) + (o.manual ? 0 : (rng() < 0.5 ? 0.12 : -0.12));
    const cs = Math.cos(az), sn = Math.sin(az);
    const dirH = new THREE.Vector3(fwd.x * cs - fwd.z * sn, 0, fwd.x * sn + fwd.z * cs);
    const dist = 700 + rng() * 320;
    const G = cam.position.clone().addScaledVector(dirH, dist); G.y = rng() < 0.7 ? 0 : 4 + rng() * 30;
    const cloudH = 95 + rng() * 75;
    const T = G.clone(); T.y = cloudH; T.x += (rng() - 0.5) * 240; T.z += (rng() - 0.5) * 240;

    this.visibleBolt = !o.sheet;
    if (this.visibleBolt) {
      const segs = this.buildBolt(T, G);
      this.writeBolt(segs);
    } else {
      this.geo.setDrawRange(0, 0);
    }
    // flaş yönü: bulutun içinden
    const fd = T.clone().sub(cam.position).normalize();
    U.uFlashDir.value.copy(fd);
    // vuruş profili: birkaç darbe
    const near = 1 - clamp((dist - 700) / 320, 0, 1);
    this.peak = 0.85 + near * 0.9 + rng() * 0.3;
    const nStrokes = 3 + Math.floor(rng() * 3);
    this.strokes = [];
    let t0 = 0;
    for (let i = 0; i < nStrokes; i++) {
      this.strokes.push({ t0, a: i === 0 ? 1 : 0.45 + rng() * 0.6, tau: 0.05 + rng() * 0.06 });
      t0 += 0.06 + rng() * 0.16;
    }
    this.t = 0;
    this.active = true;
    this.uniforms.uProgress.value = 0;
    this.dist = dist;
    this.count++;
    const delay = Math.max(1.0, Math.min(3.0, dist / 343));
    if (this.onThunder) this.onThunder({ delay, distance: dist, loudness: clamp(0.35 + near * 0.65, 0, 1), sheet: !!o.sheet });
  }

  update(dt, camera) {
    const st = state;
    // otomatik zamanlama
    const s = st.stormSmooth;
    if (s > 0.22) {
      this.nextIn -= dt;
      if (this.nextIn <= 0) {
        const mean = lerp(24, 5.5, (s - 0.22) / 0.78);
        this.nextIn = clamp(-Math.log(1 - this.rng()) * mean, 2.5, mean * 2.6);
        this.strike({ sheet: this.rng() < 0.25 });
        if (this.rng() < 0.28) this.queue.push(0.7 + this.rng() * 0.9);
      }
    }
    for (let i = this.queue.length - 1; i >= 0; i--) {
      this.queue[i] -= dt;
      if (this.queue[i] <= 0) { this.queue.splice(i, 1); this.strike({}); }
    }

    // flaş zarfı
    let f = 0;
    if (this.active) {
      this.t = this.hold !== null ? this.hold : this.t + dt;
      for (const k of this.strokes) {
        const dtk = this.t - k.t0;
        if (dtk >= 0) f += k.a * Math.exp(-dtk / k.tau) * (dtk < 0.012 ? dtk / 0.012 : 1);
      }
      const tail = 0.18 * Math.exp(-this.t / 0.5); // bulut ışıma kuyruğu
      f = Math.min(1.35, (f + tail) * this.peak);
      this.uniforms.uProgress.value = clamp(this.t / 0.075, 0, 1.2);
      this.uniforms.uBoltI.value = this.visibleBolt ? clamp(f * 1.2, 0, 3) : 0;
      if (this.t > 1.2) { this.active = false; this.geo.setDrawRange(0, 0); f = 0; }
    }
    U.uFlash.value = f;
    U.uFlashGlow.value = f;
    // piksel -> görünüm birimi katsayısı
    const h = state.renderH || 1080;
    this.uniforms.uPx.value = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2) / h;
    this.flash = f;
  }
}

function params4start() { return params.get('nostrike') === '1' ? 1e9 : 4.2; }
