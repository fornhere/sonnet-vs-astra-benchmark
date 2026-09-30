// Deniz: polar ağ + Gerstner dalgaları (vertex), piksel başına analitik normal,
// fresnel yansıma (dinamik gökyüzü küpü), köpük (Jacobian + kayalık SDF'i),
// fener hüzmesi ve ışık kaynaklarının parıltısı.
import * as THREE from 'three';
import { U } from './uniforms.js';
import { COMMON_UNIFORMS, NOISE, BEAM } from './shaders/chunks.js';
import { WAVE_GLSL, NW, WAVES } from './waves.js';
import { makeSeaNoise } from './util/textures.js';
import { bakeSDF, ISLET } from './islet.js';
import { Q } from './config.js';

const W0 = WAVES[0];
// Adaya çarpan ana dalganın fazı (0..1): tırmanma ve köpük bununla senkron
const PULSE_GLSL = `
float rockPulse(vec2 p0){
  float s = 0.5 + 0.5 * sin(dot(p0, vec2(${W0.dx.toFixed(5)}, ${W0.dz.toFixed(5)})) * ${W0.k.toFixed(6)} - uWaveTime * ${W0.w.toFixed(5)} + 1.1);
  return s * s;
}
`;

const VERT = /* glsl */`
${COMMON_UNIFORMS}
${WAVE_GLSL}
${PULSE_GLSL}
varying vec3 vWorld;      // yer değiştirmiş dünya konumu
varying vec2 vP0;         // ilk (yer değiştirmemiş) xz
varying float vDist;
uniform sampler2D uSdf;
uniform vec4 uSdfInfo;    // merkez.xy, yarı boyut, -
uniform float uRunup;

float sdfAt(vec2 p){
  vec2 uv = (p - uSdfInfo.xy) / (uSdfInfo.z * 2.0) + 0.5;
  if (uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0) return 60.0;
  return texture2D(uSdf, uv).r;
}

void main(){
  vec2 p0 = position.xz;
  vec3 d = gerstnerDisp(p0);
  vec3 wp = vec3(p0.x + d.x, d.y, p0.y + d.z);
  // Adaya çarpan dalganın yükselmesi (tırmanma): dalga geçtikçe suyun duvara vurması
  float sd = sdfAt(wp.xz);
  float near = 1.0 - smoothstep(0.5, 11.0, sd);
  float pulse = rockPulse(p0);
  wp.y += uRunup * near * (0.2 + 0.8 * pulse) * 1.35;
  vP0 = p0;
  vWorld = wp;
  vDist = length(wp - uCamPos);
  gl_Position = projectionMatrix * viewMatrix * vec4(wp, 1.0);
}
`;

const FRAG = /* glsl */`
${COMMON_UNIFORMS}
${WAVE_GLSL}
${PULSE_GLSL}
${NOISE}
${BEAM}
varying vec3 vWorld;
varying vec2 vP0;
varying float vDist;
uniform samplerCube uEnv;
uniform sampler2D uNoise;
uniform sampler2D uSdf;
uniform vec4 uSdfInfo;
uniform vec3 uLights[3];     // ek ışık konumları (gemi, iskele fenerleri)
uniform vec3 uLightCol[3];
uniform float uRain;
uniform float uWaveTimeRaw;
uniform int uOct;

float sdfAt(vec2 p){
  vec2 uv = (p - uSdfInfo.xy) / (uSdfInfo.z * 2.0) + 0.5;
  if (uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0) return 60.0;
  return texture2D(uSdf, uv).r;
}

// Yağmur damlası halkaları
vec2 rippleNormal(vec2 p, float t){
  vec2 n = vec2(0.0);
  for (int layer = 0; layer < 2; layer++) {
    vec2 q = p * (layer == 0 ? 1.7 : 3.1);
    vec2 id = floor(q);
    vec2 f = fract(q) - 0.5;
    float h = hash21(id + float(layer) * 17.0);
    float ph = fract(t * (0.6 + h * 0.5) + h * 7.0);
    vec2 c = (hash22(id + 3.0) - 0.5) * 0.3;
    vec2 dv = f - c;
    float r = length(dv);
    float ring = sin((r - ph * 0.22) * 90.0) * exp(-abs(r - ph * 0.22) * 40.0) * (1.0 - ph) * step(h, 0.55);
    n += normalize(dv + 1e-4) * ring * 0.5;
  }
  return n;
}

void main(){
  vec3 P = vWorld;
  vec3 toCam = uCamPos - P;
  float dist = length(toCam);
  vec3 V = toCam / dist;

  // ---- Gerstner normali (LOD'lu) + Jacobian ----
  float footprint = dist * 0.0011 + 0.02;
  float Sxx = 0.0, Szz = 0.0, Sxz = 0.0;
  vec3 N = vec3(0.0, 1.0, 0.0);
  float crest = 0.0;
  for (int i = 0; i < NW; i++) {
    float k = WV[i].z;
    float L = 6.2831853 / k;
    float lod = clamp(L / (footprint * 7.0) - 1.0, 0.0, 1.0);
    float a = WV[i].w * uAmp * lod;
    float Qi = min(1.0, uSteep / (float(NW) * k * (WV[i].w * uAmp) + 1e-4));
    float f = k * dot(WV[i].xy, vP0) - WW[i] * uWaveTime;
    float c = cos(f), s = sin(f);
    N.x -= WV[i].x * k * a * c;
    N.z -= WV[i].y * k * a * c;
    N.y -= Qi * k * a * s;
    Sxx += Qi * k * a * WV[i].x * WV[i].x * s;
    Szz += Qi * k * a * WV[i].y * WV[i].y * s;
    Sxz += Qi * k * a * WV[i].x * WV[i].y * s;
    crest += a * s;
  }
  float J = (1.0 - Sxx) * (1.0 - Szz) - Sxz * Sxz;

  // ---- ince detay normali (kaydırmalı iki katman) ----
  float detailAmt = 1.0 - smoothstep(30.0, 160.0, dist);
  vec2 w1 = vWorld.xz * 0.09 + vec2(uTime * 0.021, uTime * -0.033) * (0.6 + uStorm);
  vec2 w2 = vWorld.xz * 0.31 + vec2(uTime * -0.05, uTime * 0.043) * (0.6 + uStorm);
  vec2 w3 = vWorld.xz * 1.1 + vec2(uTime * 0.11, uTime * 0.07);
  vec4 t1 = texture2D(uNoise, w1);
  vec4 t2 = texture2D(uNoise, w2);
  vec4 t3 = texture2D(uNoise, w3);
  t3.rg = mix(vec2(0.5), t3.rg, detailAmt);
  float detailFade = 1.0 - smoothstep(60.0, 420.0, dist);
  vec2 dn = ((t1.rg - 0.5) * 0.9 + (t2.rg - 0.5) * 1.2 + (t3.rg - 0.5) * 0.9 * detailFade) * (0.12 + 0.46 * uStorm);
  N.xz += dn * (0.35 + 0.65 * detailFade);
  #ifdef RIPPLES
  if (uRain > 0.05 && dist < 90.0) {
    N.xz += rippleNormal(vWorld.xz, uTime) * uRain * 0.45 * (1.0 - dist / 90.0);
  }
  #endif
  N = normalize(N);
  // uzakta normal düzleşsin (parıltı gürültüsünü kes)
  N = normalize(mix(N, vec3(0.0, 1.0, 0.0), smoothstep(500.0, 3500.0, dist) * 0.65));

  // ---- Fresnel yansıma ----
  float ndv = max(dot(N, V), 0.0);
  float fres = 0.02 + 0.98 * pow(1.0 - ndv, 5.0);
  vec3 R = reflect(-V, N);
  R.y = abs(R.y) + 0.0005;
  vec3 refl = textureCube(uEnv, R, 0.6 + 1.8 * uStorm).rgb;

  // ---- Suyun kendi rengi (ışığa bağlı) ----
  vec3 skyAmb = mix(uHorizon, uZenith, 0.5);
  vec3 deep = vec3(0.004, 0.018, 0.028);
  vec3 turq = vec3(0.02, 0.10, 0.11);
  float heightN = clamp(crest / (uAmp * 1.8 + 0.001) * 0.5 + 0.5, 0.0, 1.0);
  vec3 body = mix(deep, turq, pow(heightN, 2.2) * (0.35 + 0.65 * uStorm));
  body *= (0.25 + 2.4 * length(skyAmb)) * (0.55 + 0.6 * heightN);
  body += uFogColor * 0.05 + vec3(0.9, 0.5, 0.25) * 0.03 * exp(-length(vWorld.xz - vec2(-2.0, 2.0)) * 0.08);
  body *= 1.0 + uFlash * 1.4;

  // ---- Köpük ----
  float sdfV = sdfAt(vWorld.xz);
  float noiseF = t1.a * 0.55 + t2.a * 0.45;
  float foam = smoothstep(0.66, 0.16, J) * (0.35 + 0.65 * noiseF);
  foam += smoothstep(uAmp * 1.1, uAmp * 2.0 + 0.001, crest) * smoothstep(0.42, 0.72, noiseF) * 0.9;
  // kayalıkta: dalga vurdukça köpük halkası
  float pulse = rockPulse(vP0);
  float rockFoam = (1.0 - smoothstep(0.0, 2.2 + 5.5 * pulse, sdfV + (noiseF - 0.5) * 2.5)) * (0.5 + 0.5 * pulse) * (0.25 + 0.75 * uStorm);
  rockFoam += (1.0 - smoothstep(0.0, 11.0, sdfV)) * smoothstep(0.35, 0.8, noiseF) * uStorm * 0.55;
  // kıyı (Üsküdar) köpüğü
  float shore = vWorld.x - (255.0 + (noiseF - 0.5) * 4.0);
  float shoreFoam = (1.0 - smoothstep(0.0, 7.0, abs(shore))) * (0.4 + 0.6 * noiseF) * uStorm;
  rockFoam *= 0.35 + 0.9 * smoothstep(0.25, 0.75, noiseF);
  foam = clamp(foam * (0.30 + 1.15 * uStorm) + rockFoam + shoreFoam, 0.0, 0.88);
  foam *= smoothstep(0.30, 0.62, noiseF + foam * 0.35);

  // ---- Hüzme ve ışık kaynakları ----
  float bl = beamLit(vWorld);
  vec3 col = mix(body, refl, fres);
  vec3 beamCol = vec3(1.0, 0.9, 0.7);

  // parıltı: fener ve diğer ışıkların yansıması
  vec3 spec = vec3(0.0);
  vec3 Ldir = normalize(uLanternPos - vWorld);
  vec3 H = normalize(V + Ldir);
  float sp = pow(max(dot(N, H), 0.0), 220.0 + 600.0 * (1.0 - uStorm));
  spec += beamCol * sp * bl * 15.0;
  for (int i = 0; i < 3; i++) {
    vec3 Ld = uLights[i] - vWorld;
    float dl = length(Ld);
    Ld /= dl;
    vec3 Hh = normalize(V + Ld);
    float s2 = pow(max(dot(N, Hh), 0.0), 380.0);
    spec += uLightCol[i] * s2 * (1.0 / (1.0 + dl * 0.02)) * 3.0;
    // geniş hare
    spec += uLightCol[i] * pow(max(dot(N, Hh), 0.0), 40.0) * 0.06 * (1.0 / (1.0 + dl * 0.03));
  }
  col += spec * (0.35 + 0.65 * fres + 0.4);
  // hüzmenin suyu aydınlatması (dağınık)
  col += beamCol * bl * (0.03 + 0.55 * foam + 0.03 * heightN);

  // köpük rengi: ortam + şimşek + hüzme
  vec3 foamLit = (vec3(0.55, 0.64, 0.78) * (0.05 + 0.6 * length(skyAmb)) * (0.7 + 0.6 * t2.a) + uFlash * vec3(0.7, 0.8, 1.0) * 0.55 + beamCol * bl * 1.3 + vec3(1.0, 0.7, 0.4) * 0.03);
  foamLit += uAmbient * 0.3 + vec3(1.0, 0.68, 0.40) * 0.16 * exp(-length(vWorld.xz - vec2(-2.0, 2.0)) * 0.12);
  col = mix(col, foamLit, foam * 0.92);

  // uzak sis
  float f = 1.0 - exp(-pow(dist * uFogDensity, 1.5));
  col = mix(col, uFogColor, clamp(f, 0.0, 1.0));
  gl_FragColor = vec4(col, 1.0);
}
`;

export class Sea {
  constructor(envCube) {
    this.noise = makeSeaNoise(384);
    const sdf = bakeSDF(160, 46);
    this.sdf = sdf;
    const geo = this.buildGeometry(Q.seaRadial, Q.seaAngular);
    this.uniforms = {
      ...U,
      uAmp: { value: 0.5 }, uSteep: { value: 0.6 }, uWaveTime: { value: 0 }, uWaveTimeRaw: { value: 0 },
      uEnv: { value: envCube }, uNoise: { value: this.noise },
      uSdf: { value: sdf.tex },
      uSdfInfo: { value: new THREE.Vector4(sdf.center.x, sdf.center.y, sdf.half, 0) },
      uRunup: { value: 0.5 }, uRain: { value: 0.5 },
      uLights: { value: [new THREE.Vector3(9999, 30, 9999), new THREE.Vector3(0, 3, 0), new THREE.Vector3(0, 3, 0)] },
      uLightCol: { value: [new THREE.Color(0, 0, 0), new THREE.Color(1, 0.6, 0.3), new THREE.Color(1, 0.6, 0.3)] },
      uOct: { value: Q.seaOct },
    };
    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms, vertexShader: VERT, fragmentShader: FRAG,
      defines: Q.ripples ? { RIPPLES: 1 } : {},
    });
    this.mesh = new THREE.Mesh(geo, this.material);
    this.mesh.frustumCulled = false;
    this.mesh.name = 'sea';
  }

  // Merkezde çok sık, uzağa doğru geometrik seyrekleşen polar ağ
  buildGeometry(nr, na) {
    const R = 9000, a = 6.0;
    const pos = new Float32Array((nr + 1) * (na + 1) * 3);
    let o = 0;
    for (let j = 0; j <= nr; j++) {
      const t = j / nr;
      const r = 1.5 + R * (Math.exp(a * t) - 1) / (Math.exp(a) - 1);
      for (let i = 0; i <= na; i++) {
        const th = (i / na) * Math.PI * 2;
        pos[o++] = Math.cos(th) * r; pos[o++] = 0; pos[o++] = Math.sin(th) * r;
      }
    }
    const idx = [];
    for (let j = 0; j < nr; j++) for (let i = 0; i < na; i++) {
      const p = j * (na + 1) + i, q = p + 1, r2 = p + na + 1, s = r2 + 1;
      idx.push(p, q, r2, q, s, r2);
    }
    // merkez boşluğunu kapat
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setIndex(idx);
    return g;
  }

  update(state, time, ship) {
    const u = this.uniforms;
    u.uAmp.value = state.wave.amp;
    u.uSteep.value = state.wave.steep;
    u.uWaveTime.value = time * state.waveTimeScale;
    u.uRunup.value = state.storm * 0.9 + 0.05;
    u.uRain.value = state.rain;
    if (ship) {
      u.uLights.value[0].copy(ship.lightPos);
      u.uLightCol.value[0].setRGB(1.0, 0.85, 0.55).multiplyScalar(0.9);
    }
    for (let i = 0; i < state.lampWorld.length && i < 2; i++) {
      u.uLights.value[i + 1].copy(state.lampWorld[i]);
      u.uLightCol.value[i + 1].setRGB(1.0, 0.6, 0.28).multiplyScalar(0.7);
    }
  }
}
