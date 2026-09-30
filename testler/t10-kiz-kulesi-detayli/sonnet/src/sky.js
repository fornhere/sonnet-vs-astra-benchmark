// Gökyüzü kubbesi (gradyan, yıldız, ay, fırtına bulutları, şimşek aydınlatması)
// ve rüzgârla akan alçak bulut / sis katmanları.
import * as THREE from 'three';
import { U } from './uniforms.js';
import { COMMON_UNIFORMS, NOISE, BEAM } from './shaders/chunks.js';
import { Q } from './config.js';

const SKY_VERT = /* glsl */`
varying vec3 vDir;
void main(){
  vDir = position;
  vec4 p = projectionMatrix * mat4(mat3(viewMatrix)) * vec4(position, 1.0);
  gl_Position = p.xyww; // en arkada
}
`;

const SKY_FRAG = /* glsl */`
${COMMON_UNIFORMS}
${NOISE}
uniform vec3 uFlashDir2;
uniform float uCloudOct;
varying vec3 vDir;

float starField(vec3 d){
  vec2 uv = vec2(atan(d.z, d.x), asin(clamp(d.y, -1.0, 1.0)));
  uv *= vec2(1400.0 / 6.2831853, 1400.0 / 6.2831853);
  vec2 id = floor(uv);
  vec2 f = fract(uv) - 0.5;
  float h = hash21(id);
  vec2 o = (hash22(id + 7.0) - 0.5) * 0.7;
  float r = length(f - o);
  float bright = step(0.978, h) * (0.35 + 0.65 * hash21(id + 3.0));
  float tw = 0.75 + 0.25 * sin(uTime * (1.0 + 3.0 * hash21(id + 5.0)) + h * 40.0);
  return bright * tw * smoothstep(0.24, 0.0, r);
}

void main(){
  vec3 d = normalize(vDir);
  float y = d.y;
  float ay = max(y, 0.0);

  // temel gradyan
  vec3 col = mix(uHorizon, uZenith, pow(ay, 0.42));
  if (y < 0.0) col = uHorizon;

  // şafak: güneşin doğduğu yön (doğu)
  float sd = max(dot(d, normalize(uSunDir)), 0.0);
  float horizonBand = exp(-ay * 6.0);
  col += uSunColor * uSunAmt * (0.42 * pow(sd, 3.0) * horizonBand + 0.30 * pow(sd, 12.0) + 0.9 * pow(sd, 140.0));

  // yıldızlar (bulut arkasında kalır)
  float clearSky = 1.0 - smoothstep(0.2, 0.8, uCover);
  vec3 stars = vec3(0.75, 0.82, 1.0) * starField(d) * smoothstep(0.02, 0.3, y) * (1.0 - uDay * 1.1) * 1.4 * (0.05 + 0.95 * clearSky);

  // ay
  float md = dot(d, normalize(uMoonDir));
  vec3 moon = vec3(0.0);
  if (uMoonAmt > 0.001) {
    float disc = smoothstep(0.99972, 0.99982, md);
    // kraterli görünüm
    float cr = fbmN(d.xz * 260.0 + d.y * 90.0, 3);
    moon = vec3(0.95, 0.96, 1.0) * disc * (0.7 + 0.5 * cr) * 3.0;
    moon += vec3(0.4, 0.5, 0.75) * (pow(max(md, 0.0), 300.0) * 0.5 + pow(max(md, 0.0), 40.0) * 0.06);
    moon *= uMoonAmt * smoothstep(0.0, 0.05, y);
  }

  // ---- bulutlar ----
  vec2 cp = d.xz / (ay + 0.16);
  vec2 wind = uWind * uTime * 0.0011;
  int oct = int(uCloudOct);
  float base = fbmN(cp * 0.30 + wind, oct);
  float det = fbmN(cp * 1.15 + wind * 2.2 + base * 1.6, oct);
  float dens = base * 0.62 + det * 0.5;
  float thr = 1.12 - uCover * 0.88;
  float a = smoothstep(thr - 0.06, thr + 0.16, dens);
  // yatay bulut yapısı ufka yaklaştıkça yoğunlaşsın (bulut duvarı)
  a = clamp(a + (1.0 - smoothstep(0.0, 0.22, ay)) * uCover * 0.5, 0.0, 1.0);
  // ışık tarafına küçük kayma ile gölgelendirme
  vec2 toL = normalize(uSunDir.xz + 1e-3) * 0.35;
  float dl = fbmN(cp * 0.30 + wind + toL, oct);
  float lit = clamp(0.55 + (base - dl) * 3.2, 0.0, 1.0);
  float thick = smoothstep(thr, thr + 0.5, dens);
  vec3 cDark = vec3(0.008, 0.010, 0.016) + uHorizon * 0.10;
  vec3 cLit = vec3(0.055, 0.062, 0.085) + uHorizon * 0.45 + uZenith * 0.5;
  vec3 cloud = mix(cDark, cLit, lit * (1.0 - 0.55 * thick));
  // şafak/ay gümüşü kenar
  cloud += uSunColor * uSunAmt * (pow(sd, 4.0) * lit * 0.5 + pow(sd, 18.0) * 0.45) * (0.4 + 0.6 * (1.0 - thick));
  cloud += vec3(0.5, 0.6, 0.9) * uMoonAmt * (pow(max(md, 0.0), 12.0) * 0.16 + pow(max(md, 0.0), 5.0) * 0.05) * (1.0 - thick * 0.75) * (1.0 - uStorm * 0.35);
  // şimşek: bulutun içten aydınlanması
  float fd = max(dot(d, normalize(uFlashDir)), 0.0);
  float glow = pow(fd, 5.0) * uFlashGlow;
  vec3 flashCol = vec3(0.62, 0.72, 1.0);
  float inner = (0.3 + 0.7 * (1.0 - thick * 0.5)) * (0.4 + 0.6 * lit);
  cloud += flashCol * uFlash * (0.10 + 0.32 * inner) * (0.5 + 1.8 * glow);
  // gökyüzü boşluğu da parlar
  col += flashCol * uFlash * (0.2 + 1.2 * glow) * 0.14;

  vec3 sky = col + stars * (1.0 - a) + moon * (1.0 - a * 0.94);
  vec3 fin = mix(sky, cloud, a * smoothstep(-0.02, 0.06, y));
  // ufuk hattını sise karıştır
  fin = mix(uFogColor, fin, smoothstep(-0.005, 0.07, y) * 0.9 + 0.1 * step(0.0, y));
  if (y < 0.0) fin = uFogColor;
  gl_FragColor = vec4(fin, 1.0);
}
`;

// Alçak bulut / sis levhaları (dünya koordinatlı fbm; paralaks verir)
const LOW_VERT = /* glsl */`
varying vec3 vWorld;
void main(){
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`;
const LOW_FRAG = /* glsl */`
${COMMON_UNIFORMS}
${NOISE}
${BEAM}
uniform float uLayerH, uScale, uSpeed, uAlpha, uSeed, uThickness;
uniform vec3 uTint;
uniform int uOct;
varying vec3 vWorld;
void main(){
  vec3 toP = vWorld - uCamPos;
  float dist = length(toP);
  // hareket: rüzgâr yönünde akış
  vec2 wp = vWorld.xz * uScale + uWind * uTime * uSpeed * 0.02 + vec2(uSeed * 13.1, uSeed * 7.7);
  float n = fbmN(wp, uOct);
  float n2 = fbmN(wp * 2.7 + n * 1.5 + uTime * 0.01, uOct);
  float dens = n * 0.7 + n2 * 0.45;
  float a = smoothstep(0.42 + (1.0 - uStorm) * 0.16, 0.9, dens) * uAlpha * (0.3 + 0.7 * uStorm);
  // yakın ve uzak yumuşatma
  a *= smoothstep(20.0, 140.0, dist) * (1.0 - smoothstep(2200.0, 5200.0, dist));
  float dy = abs(uCamPos.y - uLayerH);
  a *= smoothstep(0.0, uThickness, dy);
  // aydınlatma
  float bl = beamLit(vWorld);
  vec3 lightCol = uTint * (0.35 + 1.6 * length(uAmbient)) + uHorizon * 0.55;
  lightCol += vec3(0.55, 0.65, 1.0) * uFlash * 1.5;
  lightCol += vec3(1.0, 0.86, 0.6) * bl * 14.0;
  lightCol += uSunColor * uSunAmt * 0.8;
  vec3 col = mix(lightCol, uFogColor, 1.0 - exp(-pow(dist * uFogDensity * 0.6, 1.4)) * 0.85);
  gl_FragColor = vec4(col, a);
}
`;

export class Sky {
  constructor() {
    const geo = new THREE.SphereGeometry(1, 48, 32);
    this.skyMat = new THREE.ShaderMaterial({
      uniforms: { ...U, uFlashDir2: { value: new THREE.Vector3() }, uCloudOct: { value: Q.cloudOct } },
      vertexShader: SKY_VERT, fragmentShader: SKY_FRAG,
      side: THREE.BackSide, depthWrite: false, depthTest: false,
    });
    this.dome = new THREE.Mesh(geo, this.skyMat);
    this.dome.frustumCulled = false;
    this.dome.renderOrder = -1000;
    this.dome.scale.setScalar(1000);
    this.dome.layers.enable(1);
    this.dome.name = 'sky';

    // Alçak bulut / sis levhaları
    this.low = new THREE.Group();
    const cfgs = [
      { h: 4.5, scale: 0.010, speed: 0.55, alpha: 0.32, thick: 3.0, tint: [0.32, 0.36, 0.42], seed: 1 },
      { h: 15, scale: 0.0075, speed: 0.8, alpha: 0.30, thick: 6.0, tint: [0.3, 0.34, 0.4], seed: 2 },
      { h: 70, scale: 0.0042, speed: 1.4, alpha: 0.62, thick: 25, tint: [0.16, 0.18, 0.23], seed: 3 },
      { h: 135, scale: 0.0031, speed: 1.9, alpha: 0.7, thick: 30, tint: [0.14, 0.16, 0.21], seed: 4 },
      { h: 230, scale: 0.0022, speed: 2.4, alpha: 0.75, thick: 40, tint: [0.12, 0.14, 0.19], seed: 5 },
    ].slice(0, Q.lowClouds);
    this.layers = [];
    for (const c of cfgs) {
      const mat = new THREE.ShaderMaterial({
        uniforms: {
          ...U, uLayerH: { value: c.h }, uScale: { value: c.scale }, uSpeed: { value: c.speed },
          uAlpha: { value: c.alpha }, uSeed: { value: c.seed }, uThickness: { value: c.thick },
          uTint: { value: new THREE.Color(...c.tint) }, uOct: { value: Q.cloudOct >= 5 ? 4 : 3 },
        },
        vertexShader: LOW_VERT, fragmentShader: LOW_FRAG,
        transparent: true, depthWrite: false, side: THREE.DoubleSide,
      });
      const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 1, 1).rotateX(-Math.PI / 2), mat);
      m.scale.setScalar(9000);
      m.position.y = c.h;
      m.renderOrder = 3;
      m.frustumCulled = false;
      this.low.add(m);
      this.layers.push(m);
    }
  }

  update(camPos) {
    this.dome.position.copy(camPos);
    for (const m of this.layers) { m.position.x = camPos.x; m.position.z = camPos.z; }
  }
}
