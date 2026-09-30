import * as THREE from 'three';
import { U, NOISE, ATMOS } from './glsl.js';
import { rng } from './util.js';
import { POIS } from './config.js';

// Vadinin üzerinde daire çizen güvercin sürüleri (konum tamamen köşe gölgelendiricide)
const VERT = /* glsl */ `
attribute float aTip;
attribute vec4 aB;   // merkez x, merkez z, yarıçap, işaretli hız (m/s)
attribute vec4 aC;   // faz, merkez y, boyut, kanat hızı
uniform float uTime;
varying vec3 vWorld; varying float vShade;
void main(){
  float dirS = aB.w < 0.0 ? -1.0 : 1.0;
  float rad = aB.z * (1.0 + 0.18*sin(uTime*0.13 + aC.x*2.0));
  float ang = aC.x + uTime * aB.w / aB.z;
  vec3 center = vec3(aB.x, aC.y + sin(uTime*0.27 + aC.x*3.0)*3.5, aB.y);
  vec3 pos = center + vec3(cos(ang), 0.0, sin(ang)) * rad;
  vec3 fwd = normalize(vec3(-sin(ang), 0.0, cos(ang)) * dirS);
  vec3 right = vec3(-fwd.z, 0.0, fwd.x);
  vec3 loc = position * aC.z;
  float flap = sin(uTime*aC.w + aC.x*17.0);
  loc.y += aTip * flap * 0.55 * aC.z;
  loc.z += abs(aTip) * (0.15 + 0.12*flap) * aC.z;
  vec3 wp = pos + right * loc.x + vec3(0.0,1.0,0.0) * loc.y + fwd * (-loc.z);
  wp.y += sin(ang*3.0 + aC.x)*0.6;
  vWorld = wp;
  vShade = 0.65 + 0.35*flap*aTip + 0.1;
  gl_Position = projectionMatrix * viewMatrix * vec4(wp, 1.0);
}
`;
const FRAG = /* glsl */ `
${NOISE}
${ATMOS}
varying vec3 vWorld; varying float vShade;
void main(){
  vec3 col = vec3(0.86,0.85,0.84) * clamp(vShade, 0.4, 1.1);
  vec3 lit = col * (uLightColor*0.45 + mix(uAmbGround, uAmbSky, 0.7));
  gl_FragColor = vec4(applyFog(lit, vWorld), 1.0);
}
`;

export function createBirds(scene, terrain) {
  const rnd = rng(555);
  const flocks = [];
  const add = (id, n, count) => {
    const p = POIS.find(q => q.id === id);
    for (let k = 0; k < n; k++) {
      const a = rnd() * 6.28, d = rnd() * p.r * 0.7;
      const cx = p.x + Math.cos(a) * d, cz = p.z + Math.sin(a) * d;
      flocks.push({ cx, cz, cy: terrain.heightAt(cx, cz) + 26 + rnd() * 40, r: 50 + rnd() * 110, sp: (rnd() < 0.5 ? -1 : 1) * (8 + rnd() * 5), count });
    }
  };
  add('guvercinlik', 4, 22); add('goreme', 2, 16); add('ask', 1, 14); add('devrent', 1, 14); add('pasabag', 1, 14); add('gul', 1, 14); add('uchisar', 1, 16);
  const total = flocks.reduce((s, f) => s + f.count, 0);
  const g = new THREE.InstancedBufferGeometry();
  const pos = new Float32Array([0, 0, -0.5, -1.0, 0, 0.05, 0, 0, 0.45, 0, 0, -0.5, 0, 0, 0.45, 1.0, 0, 0.05]);
  const tip = new Float32Array([0, -1, 0, 0, 0, 1]);
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('aTip', new THREE.BufferAttribute(tip, 1));
  const B = new Float32Array(total * 4), C = new Float32Array(total * 4);
  let i = 0;
  for (const f of flocks) for (let k = 0; k < f.count; k++, i++) {
    const ph = rnd() * 6.28;
    B.set([f.cx + (rnd() - 0.5) * 30, f.cz + (rnd() - 0.5) * 30, f.r * (0.85 + rnd() * 0.3), f.sp * (0.9 + rnd() * 0.2)], i * 4);
    C.set([ph + k * 0.11, f.cy + (rnd() - 0.5) * 14, 0.55 + rnd() * 0.25, 9 + rnd() * 4], i * 4);
  }
  g.setAttribute('aB', new THREE.InstancedBufferAttribute(B, 4));
  g.setAttribute('aC', new THREE.InstancedBufferAttribute(C, 4));
  g.instanceCount = total;
  const mat = new THREE.ShaderMaterial({ uniforms: { ...U }, vertexShader: VERT, fragmentShader: FRAG, side: THREE.DoubleSide });
  const mesh = new THREE.Mesh(g, mat); mesh.frustumCulled = false;
  scene.add(mesh);
  return mesh;
}
