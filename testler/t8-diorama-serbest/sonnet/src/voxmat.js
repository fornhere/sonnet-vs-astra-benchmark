import * as THREE from 'three';

export const voxUniforms = {
  uNight: { value: 0 }, uSnow: { value: 0 }, uTime: { value: 0 }, uSkyCol: { value: new THREE.Color(0.5, 0.65, 0.9) }, uSunCol: { value: new THREE.Color(1, 1, 1) },
};

const VERT_PARS = /* glsl */`
attribute vec4 aPos; attribute vec4 aCol; attribute vec4 aMeta;
varying vec2 vUvF; varying vec3 vColV; flat varying vec4 vMetaF; flat varying vec4 vAOF; flat varying float vDirF;
const vec3 FN[6] = vec3[6](vec3(1,0,0),vec3(-1,0,0),vec3(0,1,0),vec3(0,-1,0),vec3(0,0,1),vec3(0,0,-1));
const vec3 FT1[6] = vec3[6](vec3(0,1,0),vec3(0,0,1),vec3(0,0,1),vec3(1,0,0),vec3(1,0,0),vec3(0,1,0));
const vec3 FT2[6] = vec3[6](vec3(0,0,1),vec3(0,1,0),vec3(1,0,0),vec3(0,0,1),vec3(0,1,0),vec3(1,0,0));
const vec3 FO[6] = vec3[6](vec3(1,0,0),vec3(0,0,0),vec3(0,1,0),vec3(0,0,0),vec3(0,0,1),vec3(0,0,0));
`;
const VERT_BEGIN = /* glsl */`
int dI = int(aPos.w + 0.5);
vec3 transformed = aPos.xyz + FO[dI] + FT1[dI] * position.x + FT2[dI] * position.y;
`;
const VERT_VARY = /* glsl */`
vUvF = position.xy; vDirF = float(dI); vColV = aCol.rgb / 255.0; vMetaF = aMeta;
{ float ap = aCol.w; float a0 = mod(ap, 4.0); ap = floor(ap / 4.0); float a1 = mod(ap, 4.0); ap = floor(ap / 4.0); float a2 = mod(ap, 4.0); ap = floor(ap / 4.0); float a3 = mod(ap, 4.0); vAOF = vec4(a0, a1, a2, a3) / 3.0; }
`;

const FRAG_PARS = /* glsl */`
uniform float uNight; uniform float uSnow; uniform float uTime; uniform vec3 uSkyCol; uniform vec3 uSunCol;
varying vec2 vUvF; varying vec3 vColV; flat varying vec4 vMetaF; flat varying vec4 vAOF; flat varying float vDirF;
float h21(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
void winParams(float st, out vec2 grid, out vec2 gsz, out float strength) {
  grid = vec2(4.0, 2.0); gsz = vec2(0.88, 0.62); strength = 0.85;
  if (st < 1.5) { grid = vec2(4.0, 2.0); gsz = vec2(0.90, 0.60); strength = 0.88; }
  else if (st < 2.5) { grid = vec2(3.0, 2.0); gsz = vec2(0.52, 0.56); strength = 0.92; }
  else if (st < 3.5) { grid = vec2(4.0, 2.0); gsz = vec2(0.46, 0.62); strength = 0.9; }
  else if (st < 4.5) { grid = vec2(2.0, 2.0); gsz = vec2(0.84, 0.50); strength = 0.85; }
  else if (st < 5.5) { grid = vec2(3.0, 1.0); gsz = vec2(0.62, 0.46); strength = 0.85; }
  else if (st < 6.5) { grid = vec2(6.0, 3.0); gsz = vec2(0.90, 0.80); strength = 0.9; }
  else { grid = vec2(3.0, 2.0); gsz = vec2(0.5, 0.64); strength = 0.9; }
}
`;
const FRAG_COLOR = /* glsl */`
#include <color_fragment>
vec3 voxEmis = vec3(0.0); float voxGlass = 0.0; float voxAO = 1.0;
{
  float st = floor(vMetaF.x + 0.5); float hsh = vMetaF.y / 255.0; float dens = vMetaF.z / 255.0; int fl = int(vMetaF.w + 0.5);
  int dI = int(vDirF + 0.5);
  vec3 alb = pow(vColV, vec3(2.2));
  vec2 uv = vUvF; vec2 fwv = fwidth(uv); float fw = max(fwv.x, fwv.y);
  float nearK = 1.0 - smoothstep(0.05, 0.28, fw);
  float aoB = mix(mix(vAOF.x, vAOF.y, uv.x), mix(vAOF.z, vAOF.w, uv.x), uv.y);
  voxAO = 0.40 + 0.60 * aoB;
  float ed = min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y));
  alb *= mix(1.0 - 0.13 * nearK, 1.0, smoothstep(0.0, 0.06, ed));
  alb *= 1.0 + (h21(floor(uv * 3.0) + hsh * 57.0) - 0.5) * 0.07 * nearK;
  bool side = (dI < 2 || dI > 3);
  vec2 hv = (dI == 0 || dI == 5) ? vec2(uv.y, uv.x) : uv;
  if (side && st > 0.5 && st < 7.5) {
    vec2 grid, gsz; float strength; winParams(st, grid, gsz, strength);
    bool ground = (fl & 1) != 0;
    if (ground) { grid = vec2(2.0, 1.0); gsz = vec2(0.86, 0.62); }
    vec2 g = hv * grid; vec2 cell = floor(g); vec2 f = fract(g); vec2 q = abs(f - 0.5) * 2.0;
    vec2 aa = max(fwidth(g), vec2(0.0001));
    float mx = 1.0 - smoothstep(gsz.x - aa.x, gsz.x + aa.x, q.x);
    float my = 1.0 - smoothstep(gsz.y - aa.y, gsz.y + aa.y, q.y);
    float m = mx * my;
    float far = smoothstep(0.35, 0.95, max(aa.x, aa.y)); m = mix(m, gsz.x * gsz.y, far);
    float hc = h21(cell + vec2(hsh * 91.0, hsh * 47.0 + float(dI)));
    vec3 gl = mix(vec3(0.020, 0.032, 0.05), uSkyCol * 0.42, 0.20 + 0.55 * hc);
    if (st > 5.5 && st < 6.5) gl = mix(vec3(0.02, 0.04, 0.07), uSkyCol * 0.65, 0.25 + 0.5 * hv.y);
    float sat = strength * (ground ? 0.95 : 1.0);
    alb = mix(alb, gl, m * sat);
    voxGlass = m * sat * (1.0 - far * 0.6);
    float litP = dens * 0.5 + (ground ? 0.28 : 0.0);
    float lit = step(hc, litP);
    vec3 wc = mix(vec3(1.0, 0.76, 0.42), vec3(0.72, 0.86, 1.0), step(0.84, h21(cell * 1.7 + 3.0 + hsh)));
    voxEmis += wc * lit * m * uNight * (0.8 + hc * 0.8) * (ground ? 1.2 : 1.0);
  } else if (side && st > 7.5 && st < 8.5) {
    vec2 g = hv * vec2(2.0, 3.0); vec2 cell = floor(g); vec2 f = fract(g); float hc = h21(cell + hsh * 13.0);
    vec3 neon = 0.5 + 0.5 * cos(6.2831 * (hc + vec3(0.0, 0.33, 0.67)) + uTime * (0.4 + hc));
    float pane = smoothstep(0.06, 0.1, f.x) * smoothstep(0.06, 0.1, f.y) * (1.0 - smoothstep(0.9, 0.94, f.x)) * (1.0 - smoothstep(0.9, 0.94, f.y));
    alb = mix(alb, neon * 0.6, pane * 0.8);
    voxEmis += neon * pane * (0.8 + 1.6 * uNight);
  } else if (st > 0.5 && st < 7.5 && dI == 2) {
    float rr = h21(floor(uv * 3.0) + hsh * 31.0);
    if (rr > 0.86) alb *= 0.7; else if (rr < 0.05) alb *= 1.3;
  }
  if (st > 9.5 && st < 10.5 && dI == 2) { // yol
    float u = uv.x, v = uv.y; float sw = 0.0;
    if ((fl & 4) != 0) sw = max(sw, 1.0 - smoothstep(0.12, 0.2, v));
    if ((fl & 8) != 0) sw = max(sw, smoothstep(0.8, 0.88, v));
    if ((fl & 16) != 0) sw = max(sw, 1.0 - smoothstep(0.12, 0.2, u));
    if ((fl & 32) != 0) sw = max(sw, smoothstep(0.8, 0.88, u));
    alb = mix(alb, vec3(0.40, 0.39, 0.36), sw * mix(0.45, 1.0, nearK));
    bool rx = (fl & 1) != 0, rz = (fl & 2) != 0;
    if (rz && !rx) { float ln = 1.0 - smoothstep(0.018, 0.045, abs(v - 0.5)); float dsh = step(0.5, fract(u * 2.0)); alb = mix(alb, vec3(0.75, 0.6, 0.2), ln * dsh * nearK); }
    if (rx && !rz) { float ln = 1.0 - smoothstep(0.018, 0.045, abs(u - 0.5)); float dsh = step(0.5, fract(v * 2.0)); alb = mix(alb, vec3(0.75, 0.6, 0.2), ln * dsh * nearK); }
    float lamp = 0.0;
    if ((fl & 4) != 0) lamp = max(lamp, smoothstep(0.12, 0.0, length(uv - vec2(0.5, 0.13))));
    if ((fl & 8) != 0) lamp = max(lamp, smoothstep(0.12, 0.0, length(uv - vec2(0.5, 0.87))));
    if ((fl & 16) != 0) lamp = max(lamp, smoothstep(0.12, 0.0, length(uv - vec2(0.13, 0.5))));
    if ((fl & 32) != 0) lamp = max(lamp, smoothstep(0.12, 0.0, length(uv - vec2(0.87, 0.5))));
    voxEmis += vec3(1.0, 0.62, 0.28) * uNight * (0.035 + 0.03 * sw + lamp * 1.5);
  }
  if (st > 10.5 && st < 11.5 && dI == 2) alb *= 1.0 + (h21(floor(uv * 4.0) + hsh * 9.0) - 0.5) * 0.14 * nearK;
  if (st > 8.5 && st < 9.5) { float lf = h21(floor(uv * 4.0) + hsh * 71.0); alb *= mix(1.0, 0.8 + 0.4 * lf, 0.4 + 0.6 * nearK); }
  if (st > 11.5 && st < 12.5) { alb *= 0.9 + 0.1 * step(0.5, fract(hv.y * 2.0)); }
  if (st > 12.5 && st < 13.5) { voxEmis += alb * (0.25 + 0.95 * uNight); }
  if (st > 13.5) { voxEmis += alb * 0.55 * uNight * (0.5 + 0.5 * hv.y); }
  if (uSnow > 0.001 && dI == 2 && st < 9.5 || (uSnow > 0.001 && dI == 2 && st > 10.5 && st < 11.5)) { float sn = smoothstep(0.0, 1.0, uSnow) * (0.86 + 0.14 * h21(floor(uv * 3.0) + hsh * 17.0)); alb = mix(alb, vec3(0.80, 0.86, 0.95), sn * (st > 9.5 && st < 10.5 ? 0.55 : 0.95)); }
  else if (uSnow > 0.001 && dI == 2 && st > 8.5 && st < 9.5) { alb = mix(alb, vec3(0.75, 0.82, 0.9), uSnow * 0.8); }
  else if (uSnow > 0.001 && side && ((st > 0.5 && st < 7.5) || st < 0.5)) { float lip = smoothstep(0.90, 0.98, hv.y); alb = mix(alb, vec3(0.8, 0.86, 0.95), uSnow * lip * 0.9 * nearK); }
  diffuseColor.rgb = alb;
}
`;

function patchStandard(shader) {
  Object.assign(shader.uniforms, voxUniforms);
  shader.vertexShader = shader.vertexShader
    .replace('#include <common>', '#include <common>\n' + VERT_PARS)
    .replace('#include <beginnormal_vertex>', 'int dI0 = int(aPos.w + 0.5); vec3 objectNormal = FN[dI0];')
    .replace('#include <begin_vertex>', VERT_BEGIN + VERT_VARY);
  shader.fragmentShader = shader.fragmentShader
    .replace('#include <common>', '#include <common>\n' + FRAG_PARS)
    .replace('#include <color_fragment>', FRAG_COLOR)
    .replace('#include <roughnessmap_fragment>', '#include <roughnessmap_fragment>\nroughnessFactor = mix(roughnessFactor, 0.16, voxGlass);')
    .replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\ntotalEmissiveRadiance += voxEmis;')
    .replace('#include <aomap_fragment>', 'reflectedLight.indirectDiffuse *= voxAO; reflectedLight.directDiffuse *= mix(1.0, voxAO, 0.45); reflectedLight.indirectSpecular *= mix(1.0, voxAO, 0.8);');
}
export function createVoxelMaterial() {
  const m = new THREE.MeshStandardMaterial({ roughness: 0.88, metalness: 0.0 });
  m.onBeforeCompile = patchStandard; m.customProgramCacheKey = () => 'vox';
  return m;
}
export function createDepthMaterial() {
  const m = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking });
  m.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nattribute vec4 aPos;\nconst vec3 FT1[6] = vec3[6](vec3(0,1,0),vec3(0,0,1),vec3(0,0,1),vec3(1,0,0),vec3(1,0,0),vec3(0,1,0));\nconst vec3 FT2[6] = vec3[6](vec3(0,0,1),vec3(0,1,0),vec3(1,0,0),vec3(0,0,1),vec3(0,1,0),vec3(1,0,0));\nconst vec3 FO[6] = vec3[6](vec3(1,0,0),vec3(0,0,0),vec3(0,1,0),vec3(0,0,0),vec3(0,0,1),vec3(0,0,0));')
      .replace('#include <begin_vertex>', 'int dI = int(aPos.w + 0.5); vec3 transformed = aPos.xyz + FO[dI] + FT1[dI] * position.x + FT2[dI] * position.y;');
  };
  m.customProgramCacheKey = () => 'voxdepth';
  return m;
}
export function makeChunkMesh(ch, base, mat, depthMat) {
  const g = new THREE.InstancedBufferGeometry();
  g.index = base.index; g.setAttribute('position', base.getAttribute('position'));
  g.setAttribute('aPos', new THREE.InstancedBufferAttribute(new Uint16Array(ch.pos), 4));
  g.setAttribute('aCol', new THREE.InstancedBufferAttribute(new Uint8Array(ch.col), 4));
  g.setAttribute('aMeta', new THREE.InstancedBufferAttribute(new Uint8Array(ch.meta), 4));
  g.instanceCount = ch.n;
  const cx = (ch.x0 + ch.x1) / 2, cz = (ch.z0 + ch.z1) / 2, cy = ch.ymax / 2;
  g.boundingSphere = new THREE.Sphere(new THREE.Vector3(cx, cy, cz), Math.hypot((ch.x1 - ch.x0) / 2, ch.ymax / 2, (ch.z1 - ch.z0) / 2) + 1);
  g.boundingBox = new THREE.Box3(new THREE.Vector3(ch.x0, 0, ch.z0), new THREE.Vector3(ch.x1, ch.ymax, ch.z1));
  const mesh = new THREE.Mesh(g, mat); mesh.customDepthMaterial = depthMat; mesh.castShadow = true; mesh.receiveShadow = true; mesh.matrixAutoUpdate = false;
  return mesh;
}
export function baseQuad() {
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0]), 3));
  g.setIndex([0, 1, 2, 2, 1, 3]); return g;
}
