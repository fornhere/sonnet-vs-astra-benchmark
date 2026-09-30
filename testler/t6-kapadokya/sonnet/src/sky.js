import * as THREE from 'three';
import { U, NOISE, ATMOS } from './glsl.js';

const C = (r, g, b) => new THREE.Color(r, g, b);
// [güneş yüksekliği°, zirve, ufuk, parıltı, ışık, ortam-gök, ortam-zemin, sis, vadi sisi, pozlama]
const KEYS = [
  [-20, C(.002,.004,.014), C(.010,.016,.040), C(0,0,0), C(0,0,0), C(.012,.018,.048), C(.008,.008,.014), .00005, .5, 2.1],
  [-10, C(.010,.028,.10), C(.10,.11,.24), C(.25,.10,.10), C(0,0,0), C(.032,.052,.13), C(.030,.025,.040), .00008, .9, 1.6],
  [-5,  C(.06,.12,.30), C(.55,.38,.50), C(.9,.32,.20), C(.03,.012,.008), C(.075,.10,.20), C(.06,.045,.05), .00010, 1.0, 1.25],
  [-1.5,C(.11,.22,.48), C(.95,.58,.42), C(2.4,.95,.35), C(1.3,.44,.16), C(.16,.19,.30), C(.12,.08,.07), .00011, 1.0, 1.0],
  [3,   C(.17,.31,.58), C(1.05,.72,.52), C(2.6,1.25,.5), C(3.7,1.9,.85), C(.24,.28,.40), C(.17,.12,.09), .00012, .85, .86],
  [10,  C(.20,.36,.68), C(.90,.80,.72), C(1.6,1.0,.5), C(4.5,3.3,2.2), C(.32,.40,.55), C(.22,.17,.12), .00013, .4, .74],
  [25,  C(.15,.32,.72), C(.68,.78,.92), C(.8,.6,.35), C(5.0,4.2,3.4), C(.36,.46,.66), C(.26,.21,.16), .00014, 0, .64],
  [65,  C(.10,.27,.68), C(.60,.74,.92), C(.3,.25,.2), C(5.3,4.8,4.2), C(.34,.46,.70), C(.28,.23,.18), .00014, 0, .6],
];

const tmp = new THREE.Color();
function lerpKeys(e) {
  let i = 0;
  while (i < KEYS.length - 2 && e > KEYS[i + 1][0]) i++;
  const a = KEYS[i], b = KEYS[i + 1];
  const t = THREE.MathUtils.clamp((e - a[0]) / (b[0] - a[0]), 0, 1);
  const s = t * t * (3 - 2 * t) * 0.35 + t * 0.65;
  return { a, b, t: s };
}

export const MOON_DIR = new THREE.Vector3(-0.6, 0.55, 0.4).normalize();
export function sunElevationDeg(hour) { return 64 * Math.sin(2 * Math.PI * (hour - 6) / 24) + 1.5; }
export function sunAzimuthRad(hour) { return THREE.MathUtils.degToRad(72 + (hour - 6) * 15.5); }

export const atmos = { exposure: 0.8, elev: 30, hour: 8, moon: 0 };

export function updateAtmosphere(hour) {
  const el = sunElevationDeg(hour), az = sunAzimuthRad(hour);
  const er = THREE.MathUtils.degToRad(el);
  U.uSunDir.value.set(Math.cos(er) * Math.sin(az), Math.sin(er), -Math.cos(er) * Math.cos(az)).normalize();
  const { a, b, t } = lerpKeys(el);
  const L = (idx, out) => out.copy(a[idx]).lerp(b[idx], t);
  L(1, U.uSkyTop.value); L(2, U.uSkyHor.value); L(3, U.uSkyGlow.value);
  L(4, U.uLightColor.value); L(5, U.uAmbSky.value); L(6, U.uAmbGround.value);
  U.uLightColor.value.multiplyScalar(0.52);
  U.uFogDensity.value = a[7] + (b[7] - a[7]) * t;
  U.uMist.value = a[8] + (b[8] - a[8]) * t;
  atmos.exposure = a[9] + (b[9] - a[9]) * t;
  atmos.elev = el; atmos.hour = hour;
  // ay ışığı
  const moon = THREE.MathUtils.smoothstep(-el, 2, 9);
  atmos.moon = moon;
  U.uLightColor.value.r += 0.13 * moon; U.uLightColor.value.g += 0.19 * moon; U.uLightColor.value.b += 0.34 * moon;
  U.uAmbSky.value.r += 0.02 * moon; U.uAmbSky.value.g += 0.035 * moon; U.uAmbSky.value.b += 0.075 * moon;
  const s = THREE.MathUtils.smoothstep(el, -6, -2);
  U.uLightDir.value.copy(MOON_DIR).lerp(U.uSunDir.value, s).normalize();
  U.uNight.value = THREE.MathUtils.smoothstep(-el, -3, 6);
}

const SKY_VERT = /* glsl */ `
varying vec3 vDir;
void main(){
  vDir = position;
  vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  gl_Position = p.xyww;
}
`;
const SKY_FRAG = /* glsl */ `
${NOISE}
${ATMOS}
uniform vec3 uMoonDir;
uniform float uMoon;
varying vec3 vDir;

float cloudField(vec2 p){
  float f = gfbm(p, 5);
  return f;
}

void main(){
  vec3 d = normalize(vDir);
  vec3 col = skyColor(d);
  float sd = dot(d, uSunDir);
  // güneş diski ve ışıması
  float vis = smoothstep(-0.05, 0.02, uSunDir.y);
  vec3 sunCol = uLightColor * 0.9 + uSkyGlow*0.4;
  float disc = smoothstep(0.99992, 0.99998, sd);
  col += sunCol * disc * 30.0 * vis;
  col += sunCol * (pow(max(sd,0.0), 400.0)*0.9 + pow(max(sd,0.0), 60.0)*0.12) * vis;

  // yıldızlar
  float nightAmt = uNight;
  if (nightAmt > 0.01 && d.y > 0.0) {
    vec2 uv = vec2(atan(d.z, d.x), asin(clamp(d.y,-1.,1.))) * 95.0;
    vec2 cell = floor(uv), fr = fract(uv) - 0.5;
    float h = hash12(cell);
    float st = step(0.965, h);
    vec2 o = (hash22(cell+3.1) - 0.5) * 0.5;
    float r = length(fr - o);
    float tw = 0.7 + 0.3*sin(uTime*(1.0+h*5.0) + h*40.0);
    col += vec3(0.85,0.9,1.0) * st * smoothstep(0.16, 0.0, r) * (0.5 + 1.8*hash12(cell+9.0)) * tw * nightAmt * smoothstep(0.0, 0.25, d.y);
    // Samanyolu benzeri hafif bulut
    float band = exp(-pow(dot(d, normalize(vec3(0.3,0.5,-0.8))) * 4.0, 2.0));
    col += vec3(0.05,0.06,0.09) * band * (0.4+0.6*vnoise(uv*0.15)) * nightAmt;
  }
  // ay
  if (uMoon > 0.01) {
    float md = dot(d, uMoonDir);
    float mdisc = smoothstep(0.99955, 0.99972, md);
    col += vec3(0.85,0.9,1.0) * mdisc * 3.5 * uMoon;
    col += vec3(0.25,0.32,0.5) * (pow(max(md,0.0), 80.0)*0.6 + pow(max(md,0.0),8.0)*0.06) * uMoon;
  }

  // bulutlar
  if (d.y > 0.005) {
    vec2 uv = d.xz / (d.y + 0.08) * 0.55 + vec2(uTime*0.004, uTime*0.0015) + vec2(3.0, 7.0);
    float f = cloudField(uv);
    float dens = smoothstep(0.02, 0.42, f);
    // güneşe doğru ikinci örnek: öz gölge
    vec2 sdir = normalize(uSunDir.xz + 0.0001) * 0.045 / max(uSunDir.y + 0.25, 0.25);
    float f2 = cloudField(uv + sdir);
    float shade = clamp((f - f2)*4.0 + 0.55, 0.0, 1.0);
    vec3 lit = uLightColor * 0.16 + uSkyGlow * 0.35 * (0.5 + 0.5*max(sd,0.0)) ;
    vec3 dark = uAmbSky * 1.2 + uSkyHor * 0.25;
    vec3 ccol = mix(dark, lit + dark*0.6, shade);
    ccol += uSkyGlow * pow(max(sd, 0.0), 8.0) * 0.5 * (1.0 - dens*0.5);
    float fadeH = smoothstep(0.005, 0.20, d.y);
    // ince sirrus
    float ci = smoothstep(0.1, 0.5, gfbm(vec2(uv.x*0.5, uv.y*2.8) + 4.0, 4)) * 0.35;
    float alpha = clamp(dens*0.9 + ci*(1.0-dens), 0.0, 1.0) * fadeH;
    col = mix(col, ccol, alpha);
  }
  gl_FragColor = vec4(col, 1.0);
}
`;

export function createSky() {
  const geo = new THREE.SphereGeometry(1, 48, 32);
  const mat = new THREE.ShaderMaterial({
    uniforms: { ...U, uMoonDir: { value: MOON_DIR }, uMoon: { value: 0 } },
    vertexShader: SKY_VERT, fragmentShader: SKY_FRAG,
    side: THREE.BackSide, depthWrite: false, depthTest: false,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.scale.setScalar(90000);
  mesh.frustumCulled = false; mesh.renderOrder = -100;
  mesh.onBeforeRender = (r, s, cam) => { mesh.position.copy(cam.position); mat.uniforms.uMoon.value = atmos.moon; };
  return mesh;
}
