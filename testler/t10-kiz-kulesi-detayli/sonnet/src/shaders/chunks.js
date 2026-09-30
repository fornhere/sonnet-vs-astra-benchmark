import { GLSL_COMMON_UNIFORMS } from '../uniforms.js';

export const COMMON_UNIFORMS = GLSL_COMMON_UNIFORMS;

export const NOISE = /* glsl */`
float hash21(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float hash11(float p){ p = fract(p * .1031); p *= p + 33.33; p *= p + p; return fract(p); }
vec2 hash22(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973)); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.xx + p3.yz) * p3.zy); }
float vnoise(vec2 p){
  vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
  return mix(mix(hash21(i), hash21(i+vec2(1.,0.)), f.x), mix(hash21(i+vec2(0.,1.)), hash21(i+vec2(1.,1.)), f.x), f.y);
}
float fbmN(vec2 p, int oct){
  float a = 0.5, s = 0.0, n = 0.0;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for(int i = 0; i < 6; i++){
    if(i >= oct) break;
    s += a * vnoise(p); n += a; p = m * p; a *= 0.5;
  }
  return s / n;
}
`;

// Fener hüzmesinin herhangi bir noktayı aydınlatma miktarı (deniz, bulut, yağmur, kule)
export const BEAM = /* glsl */`
float coneLit(vec3 P, vec3 dir){
  vec3 r = P - uLanternPos;
  float s = dot(r, dir);
  if (s < 4.0) return 0.0;
  float perp = length(r - dir * s);
  float rad = 1.0 + s * uBeamHalf;
  float k = 1.0 - smoothstep(0.0, 1.0, perp / rad);
  return k * k * exp(-s * uBeamAtten) * smoothstep(4.0, 40.0, s) * (1.0 / (1.0 + s * 0.0028));
}
float beamLit(vec3 P){ return uBeamAmt * (coneLit(P, uBeamDir1) + 0.55 * coneLit(P, uBeamDir2)); }
`;

export const FOG_APPLY = /* glsl */`
vec3 applyFog(vec3 col, float dist){
  float f = 1.0 - exp(-pow(dist * uFogDensity, 1.6));
  return mix(col, uFogColor, clamp(f, 0.0, 1.0));
}
`;
