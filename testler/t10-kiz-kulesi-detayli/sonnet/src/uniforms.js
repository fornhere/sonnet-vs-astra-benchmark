// Tüm modüllerin paylaştığı uniform nesneleri (referansla paylaşılır)
import * as THREE from 'three';

const u = (v) => ({ value: v });

export const U = {
  uTime: u(0),
  uStorm: u(0.75),
  uDay: u(0),
  uFlash: u(0),               // şimşek parlaklığı (0..~3)
  uFlashDir: u(new THREE.Vector3(0, 1, 0)), // gökyüzünde çakmanın yönü
  uFlashGlow: u(0),           // yerel bulut parlaması
  uZenith: u(new THREE.Color(0.01, 0.015, 0.03)),
  uHorizon: u(new THREE.Color(0.03, 0.05, 0.09)),
  uFogColor: u(new THREE.Color(0.03, 0.05, 0.09)),
  uFogDensity: u(0.0008),
  uSunDir: u(new THREE.Vector3(1, -0.3, -0.2).normalize()),
  uSunColor: u(new THREE.Color(1, 0.5, 0.3)),
  uSunAmt: u(0),
  uMoonDir: u(new THREE.Vector3(0.93, 0.21, -0.30).normalize()),
  uMoonAmt: u(1),
  uCover: u(0.8),
  uWind: u(new THREE.Vector2(6, -6)),  // m/s (doğu, güney)
  uCamPos: u(new THREE.Vector3()),
  uLanternPos: u(new THREE.Vector3(0, 20, 0)),
  uBeamDir1: u(new THREE.Vector3(1, -0.02, 0)),
  uBeamDir2: u(new THREE.Vector3(-1, -0.02, 0)),
  uBeamAmt: u(1),
  uBeamHalf: u(0.05),
  uBeamAtten: u(0.0006),
  uRes: u(new THREE.Vector2(1920, 1080)),
  uNightLights: u(1),         // şehir ışıklarının şiddeti
  uAmbient: u(new THREE.Color(0.1, 0.12, 0.2)),
};

// Ortak GLSL bildirimleri (ShaderMaterial'lara eklenir)
export const GLSL_COMMON_UNIFORMS = /* glsl */`
uniform float uTime, uStorm, uDay, uFlash, uFlashGlow, uSunAmt, uMoonAmt, uCover, uFogDensity;
uniform float uBeamAmt, uBeamHalf, uBeamAtten, uNightLights;
uniform vec3 uFlashDir, uZenith, uHorizon, uFogColor, uSunDir, uSunColor, uMoonDir, uCamPos, uLanternPos, uBeamDir1, uBeamDir2, uAmbient;
uniform vec2 uWind, uRes;
`;

export function sharedUniforms(extra = {}) {
  return Object.assign({}, U, extra);
}
