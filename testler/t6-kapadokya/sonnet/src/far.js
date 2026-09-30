import * as THREE from 'three';
import { U, NOISE, ATMOS } from './glsl.js';

// Sonsuz ufuk: platoyu, tepecikleri ve uzaktaki Erciyes / Hasan Dağı'nı sürdürür
const VERT = /* glsl */ `
${NOISE}
varying vec3 vWorld;
float plateauBase(vec2 p){ return 150. + 16.*gfbm(p*0.0007 + vec2(11.,4.), 3); }
float mountain(vec2 p, vec2 c, float R, float H){
  float d = length(p - c);
  float k = clamp(1. - d / R, 0., 1.);
  float rid = 0.85 + 0.3*gfbm(p*0.00035 + c*0.001, 4);
  float crater = 1. - 0.22*smoothstep(0.08, 0.0, k) ;
  return H * pow(k, 1.25) * rid * crater;
}
float farH(vec2 p){
  float r = length(p);
  float base = plateauBase(p) + 14.*gfbm(p*0.0016, 3);
  float hills = smoothstep(2300., 9000., r) * (260.*gfbm(p*0.00045 + 3., 5) + 90.*gfbm(p*0.002, 3));
  float far = smoothstep(9000., 24000., r);
  float ridges = far * 420. * (1. - abs(gnoise(p*0.00016 + 7.)));
  float m = mountain(p, vec2(26500., 7400.), 11500., 3700.) + mountain(p, vec2(-27500., 19500.), 9500., 2600.) + mountain(p, vec2(-9000., -32000.), 8500., 1200.);
  return base + hills + ridges + m;
}
attribute float aSkirt;
void main(){
  vec4 wp = modelMatrix * vec4(position, 1.0);
  wp.y = farH(wp.xz) - aSkirt * 60.0;
  vWorld = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`;
const FRAG = /* glsl */ `
${NOISE}
${ATMOS}
varying vec3 vWorld;
void main(){
  vec3 wp = vWorld;
  vec3 N = normalize(cross(dFdx(wp), dFdy(wp)));
  if (N.y < 0.0) N = -N;
  float rel = wp.y - 165.0;
  float n1 = gnoise(wp.xz*0.0009), n2 = vnoise(wp.xz*0.004);
  vec3 steppe = mix(vec3(0.30,0.25,0.15), vec3(0.36,0.31,0.19), n1*0.5+0.5);
  vec3 rock = mix(vec3(0.27,0.21,0.19), vec3(0.34,0.27,0.24), n2);
  vec3 col = mix(steppe, rock, smoothstep(250.0, 900.0, rel));
  float snow = smoothstep(1000.0, 1350.0, rel + 340.0*gnoise(wp.xz*0.0006) + 220.0*(1.0 - N.y));
  col = mix(col, vec3(0.85,0.87,0.92), snow);
  // dağ yamaçlarında dere çizgileri
  col *= 0.85 + 0.3*vnoise(wp.xz*vec2(0.0016,0.0016) + vec2(0.0, wp.y*0.002));
  float NdL = max(dot(N, uLightDir), 0.0);
  vec3 lit = col * (uLightColor*NdL + mix(uAmbGround, uAmbSky, N.y*0.5+0.5));
  gl_FragColor = vec4(applyFogS(lit, wp, 0.3), 1.0);
}
`;

function ringGeometry(cell, N, hole) {
  const n = 2 * N; const pos = [], idx = [];
  const vi = (i, j) => j * (n + 1) + i;
  for (let j = 0; j <= n; j++) for (let i = 0; i <= n; i++) pos.push((i - N) * cell, 0, (j - N) * cell);
  const hc = hole / cell;      // deliğin yarı genişliği hücre cinsinden
  for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
    const ci = i - N + 0.5, cj = j - N + 0.5;
    if (Math.abs(ci) < hc && Math.abs(cj) < hc) continue;
    const a = vi(i, j), b = vi(i + 1, j), c = vi(i, j + 1), d = vi(i + 1, j + 1);
    idx.push(a, c, b, b, c, d);
  }
  // eteklerle çatlakları kapat: delik çevresi ve dış kenar
  const skirt = new Array(pos.length / 3).fill(0);
  const addSkirt = (list) => {
    const base = pos.length / 3;
    for (const v of list) { pos.push(pos[v * 3], 0, pos[v * 3 + 2]); skirt.push(1); }
    for (let k = 0; k < list.length - 1; k++) {
      const a = list[k], b = list[k + 1], a2 = base + k, b2 = base + k + 1;
      idx.push(a, a2, b, b, a2, b2, a, b, a2, b, b2, a2);
    }
  };
  const holeI = Math.round(N - hole / cell);       // delik sınır indisi (alt/sol)
  const holeJ = Math.round(N + hole / cell);
  const line = (fixed, isX, from, to) => { const l = []; for (let t = from; t <= to; t++) l.push(isX ? vi(t, fixed) : vi(fixed, t)); return l; };
  addSkirt(line(holeI, true, holeI, holeJ)); addSkirt(line(holeJ, true, holeI, holeJ));
  addSkirt(line(holeI, false, holeI, holeJ)); addSkirt(line(holeJ, false, holeI, holeJ));
  addSkirt(line(0, true, 0, n)); addSkirt(line(n, true, 0, n)); addSkirt(line(0, false, 0, n)); addSkirt(line(n, false, 0, n));
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('aSkirt', new THREE.Float32BufferAttribute(skirt, 1));
  g.setIndex(idx);
  g.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 500, 0), N * cell * 1.5);
  return g;
}

export function createFar(scene) {
  const mat = new THREE.ShaderMaterial({ uniforms: { ...U }, vertexShader: VERT, fragmentShader: FRAG });
  const group = new THREE.Group();
  const a = new THREE.Mesh(ringGeometry(128, 72, 2048), mat);
  const b = new THREE.Mesh(ringGeometry(512, 88, 9216), mat);
  a.frustumCulled = false; b.frustumCulled = false;
  group.add(a, b); scene.add(group);
  return group;
}
