// Fırtına şiddeti + saat -> renkler, sis, rüzgâr, ışıklar; ayrıca yansıma küpü.
import * as THREE from 'three';
import { U } from './uniforms.js';
import { state } from './state.js';
import { Q } from './config.js';
import { waveState } from './waves.js';
import { smoothstep, lerp, clamp } from './util/rng.js';

const KEYS = [
  { d: 0.0, z: [0.004, 0.008, 0.022], h: [0.020, 0.030, 0.058] },
  { d: 0.5, z: [0.010, 0.022, 0.062], h: [0.060, 0.090, 0.150] },
  { d: 0.8, z: [0.022, 0.042, 0.120], h: [0.300, 0.135, 0.105] },
  { d: 1.0, z: [0.060, 0.105, 0.230], h: [0.680, 0.320, 0.150] },
];
const _c1 = new THREE.Color(), _c2 = new THREE.Color();

function keyColor(d, field, out) {
  d = clamp(d, 0, 1);
  for (let i = 0; i < KEYS.length - 1; i++) {
    const a = KEYS[i], b = KEYS[i + 1];
    if (d <= b.d) {
      const t = (d - a.d) / (b.d - a.d);
      const s = t * t * (3 - 2 * t);
      out.setRGB(lerp(a[field][0], b[field][0], s), lerp(a[field][1], b[field][1], s), lerp(a[field][2], b[field][2], s));
      return out;
    }
  }
  const l = KEYS[KEYS.length - 1][field];
  return out.setRGB(l[0], l[1], l[2]);
}

export class Environment {
  constructor(renderer, scene) {
    this.renderer = renderer;
    this.scene = scene;
    scene.fog = new THREE.FogExp2(0x101820, 0.0008);

    // Işıklar
    this.hemi = new THREE.HemisphereLight(0x2a3a66, 0x06080c, 0.6);
    this.moon = new THREE.DirectionalLight(0x8fa6ff, 0.4);
    this.sun = new THREE.DirectionalLight(0xff9a5a, 0);
    this.flashLight = new THREE.DirectionalLight(0xbcd0ff, 0);
    this.flashHemi = new THREE.HemisphereLight(0xaac0ff, 0x404870, 0);
    scene.add(this.hemi, this.moon, this.sun, this.flashLight, this.flashHemi);

    // Dinamik gökyüzü küpü (deniz yansıması + kubbe/pencere)
    this.cubeRT = new THREE.WebGLCubeRenderTarget(Q.cubeRes, {
      type: THREE.HalfFloatType, generateMipmaps: true, minFilter: THREE.LinearMipmapLinearFilter,
    });
    this.cube = new THREE.CubeCamera(1, 30000, this.cubeRT);
    this.cube.layers.set(1);
    this.cube.position.set(0, 3, 0);
    scene.add(this.cube);
    this.frame = 0;
    this.gustPhase = 0;
  }

  update(dt, time) {
    const s = state;
    // yumuşatma
    s.stormSmooth += (s.storm - s.stormSmooth) * Math.min(1, dt * 1.6);
    s.daySmooth += (s.day - s.daySmooth) * Math.min(1, dt * 1.6);
    const storm = s.stormSmooth, day = s.daySmooth;

    U.uTime.value = time;
    U.uStorm.value = storm;
    U.uDay.value = day;

    // Rüzgâr ve hamleler
    const base = lerp(2.0, 26, Math.pow(storm, 0.9));
    s.gust = 0.5 + 0.5 * Math.sin(time * 0.37) * Math.sin(time * 0.91 + 1.3) + 0.25 * Math.sin(time * 2.3);
    s.wind = base * (0.8 + 0.4 * s.gust);
    U.uWind.value.set(0.7071 * s.wind, -0.7071 * s.wind);
    s.rain = clamp((storm - 0.12) / 0.75, 0, 1);

    // Dalgalar
    waveState.amp = lerp(0.05, 1.12, Math.pow(storm, 1.3)) * (0.95 + 0.1 * s.gust);
    waveState.steep = lerp(0.45, 1.0, storm);
    s.wave.amp = waveState.amp; s.wave.steep = waveState.steep;

    // Gökyüzü renkleri
    keyColor(day, 'z', U.uZenith.value);
    keyColor(day, 'h', U.uHorizon.value);
    const zen = U.uZenith.value, hor = U.uHorizon.value;
    // fırtınada çöl: griye çek, karart
    for (const [c, dk] of [[zen, 0.42], [hor, 0.72]]) {
      const lum = c.r * 0.3 + c.g * 0.5 + c.b * 0.2;
      const gray = _c1.setRGB(lum * 0.9, lum * 1.05, lum * 1.3);
      c.lerp(gray, storm * (0.55 - 0.25 * day));
      c.multiplyScalar(1 - dk * storm * 0.5);
    }
    U.uFogColor.value.copy(hor).multiplyScalar(0.92);
    const fl0 = U.uFlash.value;
    U.uFogColor.value.r += 0.03 * fl0; U.uFogColor.value.g += 0.042 * fl0; U.uFogColor.value.b += 0.075 * fl0;
    U.uFogDensity.value = lerp(0.00022, 0.00115, Math.pow(storm, 0.8));

    // Güneş (doğu) ve ay
    const el = THREE.MathUtils.degToRad(lerp(-34, 4, smoothstep(0.3, 1.0, day)));
    U.uSunDir.value.set(Math.cos(el) * 0.94, Math.sin(el), -Math.cos(el) * 0.34).normalize();
    U.uSunAmt.value = smoothstep(0.4, 1.0, day) * (1 - 0.3 * storm);
    U.uSunColor.value.setRGB(1.0, 0.56 + 0.1 * day, 0.30 + 0.1 * day);
    U.uMoonAmt.value = (1 - smoothstep(0.35, 0.85, day)) * (1 - 0.15 * storm);
    U.uCover.value = lerp(0.34, 0.9, Math.pow(storm, 0.75));
    U.uNightLights.value = 1 - smoothstep(0.65, 1.0, day) * 0.75;

    // Şimşek parlaması
    const fl = U.uFlash.value;

    // Three.js ışıkları
    const skyMix = _c2.copy(hor).lerp(zen, 0.55);
    U.uAmbient.value.copy(skyMix);
    this.hemi.color.copy(zen).lerp(hor, 0.3).multiplyScalar(1.4).addScalar(0.03);
    this.hemi.groundColor.copy(hor).multiplyScalar(0.25).addScalar(0.012);
    this.hemi.intensity = 1.0 + day * 1.6;
    this.scene.fog.color.copy(U.uFogColor.value);
    this.scene.fog.density = U.uFogDensity.value;

    const md = U.uMoonDir.value;
    this.moon.position.copy(md).multiplyScalar(300);
    this.moon.intensity = (0.55 * U.uMoonAmt.value) * (1 - 0.65 * storm);
    this.moon.color.setRGB(0.55, 0.68, 1.0);

    this.sun.position.copy(U.uSunDir.value).multiplyScalar(300);
    this.sun.intensity = smoothstep(0.55, 1.0, day) * 2.4 * (1 - 0.6 * storm);
    this.sun.color.copy(U.uSunColor.value);

    this.flashLight.position.copy(U.uFlashDir.value).multiplyScalar(300); this.flashLight.position.y += 200;
    this.flashLight.intensity = fl * 5.0;
    this.flashHemi.intensity = fl * 3.2;

  }

  // Yansıma küpü: tüm sahne güncellendikten sonra, ana çizimden hemen önce
  renderCube() {
    this.frame++;
    if (this.frame % Q.envEvery === 0 || U.uFlash.value > 0.05) {
      this.cube.update(this.renderer, this.scene);
    }
  }
}
