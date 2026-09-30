// Rüzgârla eğilen, kamera etrafında dünyaya sabitlenmiş yağmur çizgileri.
// Şimşekte ve fener hüzmesinde parlarlar.
import * as THREE from 'three';
import { U } from './uniforms.js';
import { COMMON_UNIFORMS, BEAM } from './shaders/chunks.js';
import { Q } from './config.js';
import { mulberry32 } from './util/rng.js';

const VERT = /* glsl */`
${COMMON_UNIFORMS}
${BEAM}
attribute vec3 aSeed;       // 0..1
uniform vec3 uBox;
uniform vec3 uVel;          // damla hızı (m/s)
uniform float uLen;         // çizgi uzunluğu (s cinsinden hız çarpanı)
uniform float uWidth;
uniform float uPx;
uniform float uIntensity;
uniform float uOpacity;
varying vec2 vUv;
varying float vAlpha;
varying vec3 vLight;
void main(){
  vec3 vel = uVel * (0.85 + 0.3 * aSeed.x);
  vec3 c = uCamPos;
  // dünyaya sabit dönen kutu: konum = box * fract(seed + vel*t/box - c/box)
  vec3 q = fract(aSeed + vel * uTime / uBox - c / uBox);
  vec3 head = c + (q - 0.5) * uBox;
  // kutu kenarında sönme
  vec3 e = abs(q - 0.5) * 2.0;
  float edge = 1.0 - smoothstep(0.75, 1.0, max(max(e.x, e.y), e.z));
  vec3 tail = head - normalize(vel) * uLen * (0.7 + 0.6 * aSeed.z);
  vec4 vh = viewMatrix * vec4(head, 1.0);
  vec4 vt = viewMatrix * vec4(tail, 1.0);
  vec2 d = vh.xy / max(-vh.z, 0.1) - vt.xy / max(-vt.z, 0.1);
  d = length(d) < 1e-7 ? vec2(0.0, 1.0) : normalize(d);
  vec2 n = vec2(-d.y, d.x);
  vec4 vp = mix(vt, vh, position.y);
  float depth = max(-vp.z, 0.5);
  float wpx = uPx * depth * 1.15;
  float w = max(uWidth, wpx);
  vp.xy += n * position.x * w;
  vUv = vec2(position.x, position.y);
  // ince çizgilerin enerjisini koru
  float thin = min(1.0, uWidth / wpx);
  vAlpha = edge * thin * uOpacity * (0.6 + 0.4 * aSeed.z) * smoothstep(0.6, 3.0, depth);
  // aydınlatma: ortam + şimşek + fener hüzmesi
  float bl = beamLit(head);
  float towerNear = exp(-length(head.xz) * 0.022) * exp(-max(head.y - 26.0, 0.0) * 0.03);
  vLight = (vec3(0.34, 0.42, 0.58) * (0.5 + 0.5 * uStorm) + uHorizon * 2.4 + uAmbient * 2.0) * uIntensity
         + vec3(0.7, 0.8, 1.0) * uFlash * 2.6
         + vec3(1.0, 0.88, 0.62) * bl * 9.0
         + vec3(1.0, 0.68, 0.38) * towerNear * 0.55
         + uSunColor * uSunAmt * 0.35;
  gl_Position = projectionMatrix * vp;
}
`;
const FRAG = /* glsl */`
${COMMON_UNIFORMS}
varying vec2 vUv;
varying float vAlpha;
varying vec3 vLight;
void main(){
  float across = 1.0 - abs(vUv.x);
  float along = smoothstep(0.0, 0.25, vUv.y) * (1.0 - smoothstep(0.85, 1.0, vUv.y) * 0.4);
  float a = across * across * along * vAlpha;
  if (a < 0.002) discard;
  gl_FragColor = vec4(vLight, a);
}
`;

export class Rain {
  constructor(scene) {
    this.group = new THREE.Group();
    this.layers = [];
    this.addLayer(Q.rainNear, new THREE.Vector3(46, 34, 46), 0.009, 0.9, 0.40);
    this.addLayer(Q.rainFar, new THREE.Vector3(240, 110, 240), 0.028, 3.0, 0.20);
    scene.add(this.group);
  }

  addLayer(count, box, width, len, opacity) {
    const rnd = mulberry32(count + 9);
    const geo = new THREE.InstancedBufferGeometry();
    // quad: x (yan) -1..1, y (uç) 0..1
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([-1, 0, 0, 1, 0, 0, -1, 1, 0, 1, 1, 0]), 3));
    geo.setIndex([0, 1, 2, 1, 3, 2]);
    const seeds = new Float32Array(count * 3);
    for (let i = 0; i < seeds.length; i++) seeds[i] = rnd();
    geo.setAttribute('aSeed', new THREE.InstancedBufferAttribute(seeds, 3));
    geo.instanceCount = count;
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        ...U,
        uBox: { value: box }, uVel: { value: new THREE.Vector3(6, -9, -6) },
        uLen: { value: len }, uWidth: { value: width }, uPx: { value: 0.001 },
        uIntensity: { value: 1 }, uOpacity: { value: opacity },
      },
      vertexShader: VERT, fragmentShader: FRAG,
      transparent: true, depthWrite: false, blending: THREE.NormalBlending, side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.frustumCulled = false;
    mesh.renderOrder = 8;
    this.group.add(mesh);
    this.layers.push({ mesh, mat, count, opacity });
  }

  update(state, camera) {
    const s = state.stormSmooth, rain = state.rain;
    const wind = state.wind;
    // damla hızı: dikey ~ 9-11 m/s, yatay rüzgârın bir kısmı
    const vx = 0.7071 * wind * 0.55, vz = -0.7071 * wind * 0.55;
    const px = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2) / (state.renderH || 1080);
    for (const L of this.layers) {
      const u = L.mat.uniforms;
      u.uVel.value.set(vx, -(9.5 + 3 * s), vz);
      u.uPx.value = px;
      u.uOpacity.value = L.opacity * rain;
      // yoğunluk: rain 0..1 -> kullanılan örnek sayısı
      L.mesh.geometry.instanceCount = Math.floor(L.count * Math.min(1, 0.06 + rain * 1.0));
      L.mesh.visible = rain > 0.01;
    }
  }
}
