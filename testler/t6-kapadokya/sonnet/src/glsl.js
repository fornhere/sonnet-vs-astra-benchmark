// Ortak GLSL parçaları: gürültü, gökyüzü rengi, yükseklik sisi, gölge ışını
import * as THREE from 'three';
import { WORLD, RES } from './config.js';

// Bütün malzemelerin paylaştığı uniform nesnesi (referans paylaşılır)
export const U = {
  uTime: { value: 0 },
  uSunDir: { value: new THREE.Vector3(0, 1, 0) },
  uLightDir: { value: new THREE.Vector3(0, 1, 0) },
  uLightColor: { value: new THREE.Color(1, 1, 1) },
  uSkyTop: { value: new THREE.Color() },
  uSkyHor: { value: new THREE.Color() },
  uSkyGlow: { value: new THREE.Color() },
  uAmbSky: { value: new THREE.Color() },
  uAmbGround: { value: new THREE.Color() },
  uFogDensity: { value: 0.0001 },
  uFogFall: { value: 0.004 },
  uFogBase: { value: 0 },
  uMist: { value: 0 },
  uNight: { value: 0 },
  uHeight: { value: null },
  uNorm: { value: null },
  uShadowH: { value: null },
  uWorld: { value: new THREE.Vector2(WORLD, RES) },
  uBalloons: { value: Array.from({ length: 24 }, () => new THREE.Vector4(0, -9999, 0, 0)) },
};

export const NOISE = /* glsl */ `
float hash12(vec2 p){ vec3 p3 = fract(vec3(p.xyx)*.1031); p3 += dot(p3,p3.yzx+33.33); return fract((p3.x+p3.y)*p3.z); }
float hash13(vec3 p3){ p3 = fract(p3*.1031); p3 += dot(p3,p3.zyx+31.32); return fract((p3.x+p3.y)*p3.z); }
vec2 hash22(vec2 p){ vec3 p3 = fract(vec3(p.xyx)*vec3(.1031,.1030,.0973)); p3 += dot(p3,p3.yzx+33.33); return fract((p3.xx+p3.yz)*p3.zy); }
float vnoise(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
  return mix(mix(hash12(i),hash12(i+vec2(1,0)),f.x), mix(hash12(i+vec2(0,1)),hash12(i+vec2(1,1)),f.x), f.y); }
float vnoise3(vec3 p){ vec3 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
  float a=hash13(i), b=hash13(i+vec3(1,0,0)), c=hash13(i+vec3(0,1,0)), d=hash13(i+vec3(1,1,0));
  float e=hash13(i+vec3(0,0,1)), g=hash13(i+vec3(1,0,1)), h=hash13(i+vec3(0,1,1)), k=hash13(i+vec3(1,1,1));
  return mix(mix(mix(a,b,f.x),mix(c,d,f.x),f.y), mix(mix(e,g,f.x),mix(h,k,f.x),f.y), f.z); }
float gnoise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  vec2 u=f*f*f*(f*(f*6.-15.)+10.);
  vec2 ga=hash22(i)*2.-1., gb=hash22(i+vec2(1,0))*2.-1., gc=hash22(i+vec2(0,1))*2.-1., gd=hash22(i+vec2(1,1))*2.-1.;
  float va=dot(ga,f), vb=dot(gb,f-vec2(1,0)), vc=dot(gc,f-vec2(0,1)), vd=dot(gd,f-vec2(1,1));
  return 1.45*mix(mix(va,vb,u.x), mix(vc,vd,u.x), u.y);
}
float gfbm(vec2 p, int oct){
  float a=.5, s=0.; mat2 R=mat2(0.8,-0.6,0.6,0.8);
  for(int i=0;i<6;i++){ if(i>=oct) break; s+=a*gnoise(p); p=R*p*2.03+vec2(17.,9.); a*=.5; }
  return s;
}
`;

// gökyüzü + sis (her malzeme için)
export const ATMOS = /* glsl */ `
uniform float uTime;
uniform vec3 uSunDir, uLightDir, uLightColor, uSkyTop, uSkyHor, uSkyGlow, uAmbSky, uAmbGround;
uniform float uFogDensity, uFogFall, uFogBase, uMist, uNight;

vec3 skyColorG(vec3 d, float gs){
  float y = max(d.y, 0.0);
  float sd = max(dot(d, uSunDir), 0.0);
  vec3 col = mix(uSkyHor, uSkyTop, pow(y, 0.42));
  float g = pow(sd, 5.0) * exp(-y*2.6);
  col += uSkyGlow * g * gs * 0.8;
  col += uSkyGlow * 0.3 * pow(sd, 1.5) * exp(-y*6.0) * gs;
  return col;
}
vec3 skyColor(vec3 d){ return skyColorG(d, 1.0); }

vec3 applyFogS(vec3 col, vec3 wp, float fs){
  vec3 v = wp - cameraPosition; float dist = length(v); vec3 dir = v / max(dist, 0.001);
  float ya = cameraPosition.y, dy = wp.y - ya;
  float k = uFogFall;
  float base = uFogDensity * fs * exp(-k*(ya - uFogBase));
  float kd = k*dy;
  float od = (abs(kd) > 0.0005) ? base * dist * (1.0 - exp(-kd)) / kd : base * dist;
  // vadi sisi: ince, alçak, yoğun tabaka
  float km = 0.085;
  float mBase = uMist * 0.0036 * exp(-km*(ya - 50.0));
  float kmd = km*dy;
  float om = (abs(kmd) > 0.0005) ? mBase * dist * (1.0 - exp(-kmd)) / kmd : mBase * dist;
  vec3 fdir = normalize(vec3(dir.x, 0.0, dir.z) + vec3(0.0001));
  vec3 fogCol = skyColorG(fdir, 0.42);
  float f = 1.0 - exp(-max(od, 0.0));
  vec3 outc = mix(col, fogCol, f);
  float fm = 1.0 - exp(-max(om, 0.0));
  vec3 mistCol = mix(fogCol, uLightColor*0.10 + uAmbSky*0.9, 0.35);
  outc = mix(outc, mistCol, fm);
  if (fs < 0.99) { float ff = smoothstep(26000.0, 46000.0, dist); outc = mix(outc, fogCol, ff); }
  return outc;
}
vec3 applyFog(vec3 col, vec3 wp){ return applyFogS(col, wp, 1.0); }
`;

// yükseklik dokusundan örnekleme (R32F, elle çift doğrusal)
export const HEIGHT_FN = /* glsl */ `
uniform sampler2D uHeight;
uniform vec2 uWorld;
float heightAt(vec2 xz){
  vec2 t = (xz + uWorld.x*0.5) / uWorld.x * uWorld.y - 0.5;
  vec2 i = floor(t); vec2 f = t - i;
  int mx = int(uWorld.y) - 1;
  ivec2 a = clamp(ivec2(i), ivec2(0), ivec2(mx));
  ivec2 b = clamp(ivec2(i) + ivec2(1), ivec2(0), ivec2(mx));
  float h00 = texelFetch(uHeight, ivec2(a.x, a.y), 0).r;
  float h10 = texelFetch(uHeight, ivec2(b.x, a.y), 0).r;
  float h01 = texelFetch(uHeight, ivec2(a.x, b.y), 0).r;
  float h11 = texelFetch(uHeight, ivec2(b.x, b.y), 0).r;
  return mix(mix(h00, h10, f.x), mix(h01, h11, f.x), f.y);
}
`;

// gölge/AO ışını: yükseklik + nesne dokusu üzerinden
export const SHADOW_FN = /* glsl */ `
uniform sampler2D uShadowH;
uniform sampler2D uNorm;
uniform vec4 uBalloons[24];
vec2 wuv(vec2 xz){ return xz / uWorld.x + 0.5; }
float shadowH(vec2 xz){ return texture2D(uShadowH, wuv(xz)).r; }

float sunShadow(vec3 p, float t0){
  vec3 L = uLightDir;
  if (L.y < 0.005) return 0.0;
  float half_ = uWorld.x*0.5;
  float res = 1.0;
  float t = t0;
  for (int i = 0; i < 46; i++) {
    vec3 q = p + L*t;
    if (abs(q.x) > half_ || abs(q.z) > half_ || q.y > 420.0) break;
    float h = shadowH(q.xz);
    res = min(res, clamp(10.0*(q.y - h)/t + 0.15, 0.0, 1.0));
    if (res < 0.01) break;
    t += 2.0 + t*0.105;
  }
  return res*res*(3.0-2.0*res);
}

float balloonShadow(vec3 p){
  float s = 1.0;
  vec3 L = uLightDir;
  if (L.y < 0.03) return 1.0;
  for (int i = 0; i < 24; i++) {
    vec4 b = uBalloons[i];
    if (b.w <= 0.0) continue;
    vec3 d = b.xyz - p;
    float tt = dot(d, L);
    if (tt < 0.0) continue;
    vec3 c = d - L*tt;
    float dist = length(c);
    float rr = b.w;
    s *= mix(0.55, 1.0, smoothstep(rr*0.55, rr*1.15, dist));
  }
  return s;
}

float terrainAO(vec3 p, vec3 n){
  vec3 d = normalize(n + vec3(0.0, 0.8, 0.0));
  float occ = 0.0;
  for (int i = 1; i <= 6; i++) {
    float t = float(i*i) * 1.7;
    vec3 q = p + d*t;
    float h = shadowH(q.xz);
    occ += clamp((h - q.y) / t, 0.0, 1.0) * (1.6 / float(i));
  }
  return clamp(1.0 - occ*0.33, 0.25, 1.0);
}
`;
