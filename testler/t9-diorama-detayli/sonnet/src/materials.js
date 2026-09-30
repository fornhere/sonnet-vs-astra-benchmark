// Voxel malzemesi: MeshStandardMaterial + onBeforeCompile ile pencere/tabela/voxel-kenarı/kar/gece emisyonu.
import * as THREE from 'three';

// Tüm malzemelerin paylaştığı uniform'lar (lighting/weather modülleri günceller)
export const U = {
  uTime: { value: 0 },
  uNight: { value: 0 },
  uSnow: { value: 0 },
  uSkyCol: { value: new THREE.Color(0.5, 0.6, 0.8) },
  uSunCol: { value: new THREE.Color(1, 0.9, 0.7) },
  uSunDir: { value: new THREE.Vector3(0.5, 0.7, 0.3) },
  uQuality: { value: 1 },
  uWind: { value: 1 },
};

const GLSL_COMMON = /* glsl */`
uniform float uTime, uNight, uSnow, uQuality, uWind;
uniform vec3 uSkyCol, uSunCol, uSunDir;
varying vec3 vObjPos; varying vec3 vObjNormal; varying vec3 vWorldNormal; varying vec4 vInfo; varying vec4 vCol4;
float h11(float p){ p = fract(p*.1031); p *= p+33.33; p *= p+p; return fract(p); }
float h12(vec2 p){ vec3 p3 = fract(vec3(p.xyx)*.1031); p3 += dot(p3,p3.yzx+33.33); return fract((p3.x+p3.y)*p3.z); }
float h13(vec3 p3){ p3 = fract(p3*.1031); p3 += dot(p3,p3.zyx+31.32); return fract((p3.x+p3.y)*p3.z); }
vec3 ledPal(float k){ k = fract(k)*6.0; if(k<1.0) return vec3(1.0,0.12,0.35); if(k<2.0) return vec3(0.1,0.85,1.0); if(k<3.0) return vec3(1.0,0.85,0.1); if(k<4.0) return vec3(0.35,1.0,0.35); if(k<5.0) return vec3(0.75,0.3,1.0); return vec3(1.0,0.97,0.9); }
`;

export function makeVoxelMaterial(opts = {}) {
  const m = new THREE.MeshStandardMaterial({ roughness: 0.9, metalness: 0.0 });
  m.userData.opts = opts;
  m.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, U);
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', `#include <common>
attribute vec4 aCol; attribute vec4 aInfo;
${GLSL_COMMON.replace('varying vec4 vCol4;', '')}
varying vec4 vCol4;`)
      .replace('#include <begin_vertex>', `#include <begin_vertex>
vObjPos = position; vObjNormal = normal;
vInfo = aInfo;
vec3 lin = pow(aCol.rgb, vec3(2.2));
#ifdef USE_INSTANCING_COLOR
lin *= instanceColor.rgb;
#endif
vCol4 = vec4(lin, aCol.a);
${opts.sway ? `
float swPh = instanceMatrix[3].x*0.71 + instanceMatrix[3].z*0.53;
float swAmt = smoothstep(0.2, 1.4, position.y) * 0.07 * uWind;
transformed.x += sin(uTime*1.7 + swPh + position.y*2.0) * swAmt;
transformed.z += cos(uTime*1.3 + swPh*1.3 + position.y*1.7) * swAmt * 0.8;
` : ''}`)
      .replace('#include <worldpos_vertex>', `#include <worldpos_vertex>
vWorldNormal = normalize(mat3(modelMatrix) * normal);`);

    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', `#include <common>
${GLSL_COMMON}`)
      .replace('#include <color_fragment>', `#include <color_fragment>
vec3 ON = normalize(vObjNormal);
vec3 WN = normalize(vWorldNormal);
float kind = vInfo.x;
float vsz = max(vInfo.w * 0.01, 0.001);
vec3 cellP = vObjPos / vsz;
vec3 vox = floor(cellP - ON * 0.5 + 0.0009);
float vh = h13(vox);
vec3 baseCol = vCol4.rgb * vCol4.a * vCol4.a;
// voxel başına ince ton farkı + grid kenar çizgisi
float shadeVar = 0.93 + 0.14 * vh;
if (kind > 8.5 && kind < 9.5) shadeVar = 0.82 + 0.36 * vh;           // çim
vec3 tang = vec3(1.0) - abs(ON);
vec3 fr = fract(cellP + 0.0001); vec3 ed = min(fr, 1.0 - fr);
float eMin = 1.0;
if (tang.x > 0.5) eMin = min(eMin, ed.x); if (tang.y > 0.5) eMin = min(eMin, ed.y); if (tang.z > 0.5) eMin = min(eMin, ed.z);
float fw = length(fwidth(cellP));
float edgeK = smoothstep(0.0, 0.06 + fw * 0.6, eMin);
float edgeFade = 1.0 - smoothstep(0.18, 0.5, fw);
shadeVar *= mix(1.0, mix(0.8, 1.0, edgeK), edgeFade);
diffuseColor.rgb = baseCol * shadeVar;
float emitK = 0.0; vec3 emitC = vec3(0.0);
float rough = 0.9; float snowK = 1.0;
bool sideFace = abs(ON.y) < 0.5;
float isWin = 0.0;
if ((kind > 0.5 && kind < 1.5) || (kind > 5.5 && kind < 6.5)) {
  if (sideFace) {
    float s = abs(ON.x) > 0.5 ? cellP.z : cellP.x;
    float wx = max(vInfo.y, 1.0), wy = max(vInfo.z * 0.25, 1.0);
    vec2 wc = vec2(s * wx, cellP.y * wy);
    vec2 id = floor(wc), f = fract(wc);
    bool glass = kind > 5.5;
    vec2 lo = glass ? vec2(0.06, 0.08) : vec2(0.2, 0.24), hi = glass ? vec2(0.94, 0.92) : vec2(0.8, 0.76);
    vec2 fwc = fwidth(wc);
    vec2 aa = fwc * 0.75;
    float mx = smoothstep(lo.x - aa.x, lo.x + aa.x, f.x) * (1.0 - smoothstep(hi.x - aa.x, hi.x + aa.x, f.x));
    float my = smoothstep(lo.y - aa.y, lo.y + aa.y, f.y) * (1.0 - smoothstep(hi.y - aa.y, hi.y + aa.y, f.y));
    float cover = (hi.x - lo.x) * (hi.y - lo.y);
    float fade = smoothstep(0.35, 0.9, max(fwc.x, fwc.y));
    float mask = mix(mx * my, cover, fade);
    float bid = h11(dot(floor(vec3(vCol4.rgb * 97.0)), vec3(1.0, 7.0, 13.0)));
    float r = h13(vec3(id, vox.x * 3.1 + vox.z * 5.7 + floor(vox.y * 0.5)));
    float r2 = h13(vec3(id.yx + 7.0, vox.x + vox.z * 2.0));
    vec3 glassC = vec3(0.045, 0.075, 0.115) + uSkyCol * 0.16;
    float sunRef = pow(max(dot(WN, normalize(vec3(uSunDir.x, 0.0, uSunDir.z) + 1e-4)), 0.0), 3.0);
    glassC += uSunCol * sunRef * 0.22 * (1.0 - uNight);
    glassC *= 0.7 + 0.6 * r2;
    diffuseColor.rgb = mix(diffuseColor.rgb, glassC, mask * (glass ? 0.92 : 0.85));
    isWin = mask;
    float litP = (0.16 + 0.42 * bid) * smoothstep(0.25, 0.9, uNight);
    float lit = mix(step(r, litP), litP, fade);
    vec3 warm = mix(vec3(1.0, 0.72, 0.38), vec3(1.0, 0.86, 0.6), r2);
    vec3 cool = vec3(0.7, 0.85, 1.0);
    emitC = (r2 > 0.92 ? cool : warm) * (0.6 + 0.6 * r2);
    emitK = mask * lit * uNight;
    rough = mix(0.9, 0.22, mask);
  }
} else if (kind > 1.5 && kind < 2.5) {           // LED tabela
  vec2 sc; float pn;
  if (sideFace) { sc = vec2((abs(ON.x) > 0.5 ? cellP.z : cellP.x) * 0.85, cellP.y * 0.9); } else { sc = cellP.xz * 0.85; }
  vec2 id = floor(sc), f = fract(sc);
  float hh = h12(id + vox.xz * 3.7 + vox.y);
  float t = uTime * (0.16 + 0.22 * hh) + hh * 40.0;
  float k0 = floor(t), kf = fract(t);
  vec3 c0 = ledPal(h12(id + k0 * 1.7 + vox.xz)), c1 = ledPal(h12(id + (k0 + 1.0) * 1.7 + vox.xz));
  vec3 led = mix(c0, c1, smoothstep(0.75, 1.0, kf));
  float bars = 0.68 + 0.32 * sin(sc.y * 14.0 + uTime * (2.0 + hh * 4.0) + hh * 20.0);
  float scroll = 0.75 + 0.25 * step(0.5, fract(sc.x * 0.5 - uTime * 0.35 * (hh > 0.5 ? 1.0 : -1.0)));
  float border = step(0.08, f.x) * step(f.x, 0.92) * step(0.1, f.y) * step(f.y, 0.9);
  vec2 fwc = fwidth(sc); float fade = smoothstep(0.4, 1.0, max(fwc.x, fwc.y));
  float m = mix(border, 0.8, fade);
  diffuseColor.rgb = mix(diffuseColor.rgb * 0.5, led * 0.5, m);
  emitC = pow(led, vec3(1.35)) * bars * scroll * (0.7 + 1.1 * uNight);
  emitK = m * (sideFace ? 1.0 : 0.35);
  rough = 0.4;
} else if (kind > 2.5 && kind < 3.5) {            // gölet / su
  float w = sin(cellP.x * 1.7 + uTime * 0.9) * sin(cellP.z * 1.3 - uTime * 0.7);
  diffuseColor.rgb *= 0.92 + 0.12 * w;
  rough = 0.12; snowK = 0.3;
  emitC = uSkyCol * 0.35; emitK = 0.5 * (1.0 - uNight * 0.6);
} else if (kind > 3.5 && kind < 4.5) {            // kendinden ışıklı
  emitC = vCol4.rgb * (0.5 + 3.2 * uNight); emitK = 1.0; rough = 0.5;
} else if (kind > 4.5 && kind < 5.5) {            // paslanmaz çelik
  rough = 0.3; emitC = vCol4.rgb * 0.7; emitK = smoothstep(0.3, 0.9, uNight);
  diffuseColor.rgb *= 1.0 + 0.25 * sin(cellP.y * 9.0) * 0.5;
} else if (kind > 6.5 && kind < 7.5) {            // asfalt
  snowK = 0.55; rough = 0.95;
} else if (kind > 7.5 && kind < 8.5) {            // su yan yüzü (kesit)
  float dy = clamp((vObjPos.y + 5.2) / 5.4, 0.0, 1.0);
  vec3 deep = vec3(0.02, 0.10, 0.20), shallow = vec3(0.10, 0.48, 0.58);
  vec3 wc2 = mix(deep, shallow, pow(dy, 1.6));
  wc2 += 0.05 * sin(vObjPos.x * 3.0 + vObjPos.z * 3.0 + vObjPos.y * 8.0);
  diffuseColor.rgb = wc2; rough = 0.2; snowK = 0.0;
  emitC = wc2 * 0.9; emitK = 0.5;
} else if (kind > 9.5 && kind < 10.5) {           // yapraklar
  diffuseColor.rgb *= 0.85 + 0.3 * h13(vox + 3.0);
} else if (kind > 11.5 && kind < 12.5) {          // gece aydınlatmalı (taç, iğne)
  emitC = vCol4.rgb * 1.5 * (0.85 + 0.15 * sin(uTime * 1.5 + vObjPos.y * 3.0)); emitK = smoothstep(0.3, 0.9, uNight); if (vCol4.r < 0.2) emitC = vec3(2.0, 1.35, 0.7) * (vCol4.r < 0.06 ? 0.2 : 0.075) * (0.85 + 0.15 * sin(uTime * 1.2 + vObjPos.x * 2.0)); rough = 0.4;
} else if (kind > 14.5 && kind < 15.5) {          // gece projektör ışığı (heykel, kule taşı)
  emitC = vCol4.rgb * 0.26; emitK = smoothstep(0.3, 0.9, uNight); rough = 0.7;
} else if (kind > 13.5 && kind < 14.5) {          // koyu cam; gece içeriden sıcak ışık (Chrysler üçgen pencereleri)
  emitC = vec3(1.0, 0.78, 0.42) * 2.4; emitK = smoothstep(0.3, 0.85, uNight); rough = 0.25;
} else if (kind > 12.5 && kind < 13.5) {          // buz pisti
  rough = 0.08; snowK = 0.0; emitC = uSkyCol * 0.25; emitK = 0.6 * (1.0 - uNight);
} else if (kind > 10.5 && kind < 11.5) {          // ahşap iskele
  float pl = fract((sideFace ? cellP.y : cellP.z) * 2.0);
  diffuseColor.rgb *= 0.85 + 0.15 * step(0.12, pl);
}
// kar örtüsü
if (uSnow > 0.001 && snowK > 0.0) {
  float up = smoothstep(0.55, 0.9, WN.y);
  float nz = h13(floor(cellP * 2.0) + 5.0);
  float sn = uSnow * snowK * (up * smoothstep(0.05, 0.4, uSnow * 1.2 - nz * 0.35 + 0.15) + (1.0 - up) * 0.16 * step(nz, uSnow * 0.8) * (sideFace ? 1.0 : 0.0));
  sn = clamp(sn, 0.0, 1.0);
  diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.86, 0.9, 0.97), sn);
  emitK *= 1.0 - sn; rough = mix(rough, 0.85, sn);
}
`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
roughnessFactor = rough;`)
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
totalEmissiveRadiance += emitC * emitK;`);
  };
  m.customProgramCacheKey = () => 'voxel' + (opts.sway ? 'S' : '');
  return m;
}
