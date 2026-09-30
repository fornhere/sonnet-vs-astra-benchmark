import * as THREE from 'three';

const vs = /* glsl */`
varying vec3 vDir;
void main(){
  vDir = position;
  vec4 p = projectionMatrix * vec4(mat3(modelViewMatrix) * position, 1.0);
  gl_Position = p.xyww;
}`;

const fs = /* glsl */`
precision highp float;
varying vec3 vDir;
uniform vec3 uSun, uMoon, uZenith, uHorizon, uSunCol, uGround, uCloudLit, uCloudDark;
uniform float uTime, uStars, uCloud, uSunI, uMoonI;
float hash13(vec3 p){ p = fract(p*0.1031); p += dot(p, p.zyx+31.32); return fract((p.x+p.y)*p.z); }
vec3 hash33(vec3 p){ p = fract(p*vec3(.1031,.1030,.0973)); p += dot(p,p.yxz+33.33); return fract((p.xxy+p.yxx)*p.zyx); }
float hash12(vec2 p){ vec3 p3 = fract(vec3(p.xyx)*.1031); p3 += dot(p3,p3.yzx+33.33); return fract((p3.x+p3.y)*p3.z); }
float vn(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
  return mix(mix(hash12(i),hash12(i+vec2(1,0)),f.x), mix(hash12(i+vec2(0,1)),hash12(i+vec2(1,1)),f.x), f.y); }
float fbm(vec2 p){ float a=.5, s=0.; for(int i=0;i<5;i++){ s+=a*vn(p); p=p*2.03+vec2(17.,3.); a*=.5;} return s; }
float vn3(vec3 p){ vec3 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
  float a=hash13(i), b=hash13(i+vec3(1,0,0)), c=hash13(i+vec3(0,1,0)), d=hash13(i+vec3(1,1,0));
  float e=hash13(i+vec3(0,0,1)), g=hash13(i+vec3(1,0,1)), h=hash13(i+vec3(0,1,1)), k=hash13(i+vec3(1,1,1));
  return mix(mix(mix(a,b,f.x),mix(c,d,f.x),f.y), mix(mix(e,g,f.x),mix(h,k,f.x),f.y), f.z); }

void main(){
  vec3 d = normalize(vDir);
  float h = d.y;
  float t = pow(clamp(h,0.,1.), 0.42);
  vec3 sky = mix(uHorizon, uZenith, t);
  float sd = max(dot(d,uSun),0.);
  float sunUp = smoothstep(-0.12, 0.05, uSun.y);
  // sun glow, aureole, disc
  vec3 glow = uSunCol * (0.22*pow(sd,4.) + 0.55*pow(sd,32.) + 1.2*pow(sd,400.));
  glow += uSunCol * 0.5 * pow(sd,2.) * exp(-abs(h)*5.5);
  sky += glow * sunUp;
  float disc = smoothstep(0.99985, 0.99992, dot(d,uSun));
  sky += uSunCol * disc * 60.0 * sunUp;

  // twilight arch opposite the sun
  float anti = max(dot(normalize(vec3(d.x,0.,d.z)), normalize(vec3(-uSun.x,0.,-uSun.z)+1e-4)),0.);
  sky += vec3(0.35,0.18,0.28) * pow(anti,3.) * exp(-abs(h)*7.) * smoothstep(0.25,0.0,abs(uSun.y-0.02)) * 0.25;

  // stars + milky way
  if (uStars > 0.01 && h > -0.05){
    vec3 sp = d*220.; vec3 id = floor(sp); vec3 fr = fract(sp)-0.5;
    float rnd = hash13(id);
    vec3 off = (hash33(id)-0.5)*0.7;
    float s = smoothstep(0.11, 0.0, length(fr-off)) * step(0.93, rnd);
    float tw = 0.75 + 0.25*sin(uTime*2.0 + rnd*300.);
    vec3 starCol = mix(vec3(0.7,0.8,1.0), vec3(1.0,0.85,0.7), hash13(id+7.));
    vec3 st = starCol * s * tw * (rnd-0.9) * 60.;
    vec3 mwN = normalize(vec3(0.35,0.55,0.75));
    float band = exp(-pow(dot(d,mwN)*5.5, 2.));
    float mw = band * (0.35 + 0.65*vn3(d*9.)) * (0.6+0.4*vn3(d*31.));
    vec3 mwc = mix(vec3(0.20,0.24,0.36), vec3(0.55,0.42,0.36), vn3(d*5.+3.)) * mw * 0.35;
    sky += (st + mwc) * uStars * smoothstep(-0.02,0.25,h);
  }
  // moon
  float md = dot(d,uMoon);
  if (uMoonI > 0.01){
    float m = smoothstep(0.99992, 0.99996, md);
    vec3 mc = vec3(0.9,0.93,1.0) * (0.75 + 0.35*vn3(d*180.));
    sky += mc * m * 4.0 * uMoonI;
    sky += vec3(0.45,0.55,0.8) * (pow(max(md,0.),300.)*0.7 + pow(max(md,0.),20.)*0.06) * uMoonI;
  }
  // clouds
  if (h > 0.0){
    vec2 cp = d.xz / (h*0.9 + 0.12) * 0.55 + vec2(uTime*0.006, uTime*0.003);
    float n = fbm(cp*1.3);
    float cov = smoothstep(1.0-uCloud, 1.0-uCloud+0.28, n);
    float n2 = fbm(cp*1.3 + uSun.xz*0.10);
    float lit = clamp(0.55 + (n - n2)*5.0, 0.0, 1.0);
    float fade = smoothstep(0.0, 0.22, h) ;
    vec3 cc = mix(uCloudDark, uCloudLit, lit);
    cc += uSunCol * pow(sd,6.) * 0.35 * sunUp * (1.0-cov*0.4);
    sky = mix(sky, cc, cov*fade*0.92);
  }
  // below horizon
  if (h < 0.0){
    vec3 hz = mix(uHorizon, uGround, 0.55);
    sky = mix(uHorizon*0.92, uGround, smoothstep(0.0, -0.22, h));
  }
  gl_FragColor = vec4(sky, 1.0);
}`;

export function makeSkyMaterial() {
  return new THREE.ShaderMaterial({
    vertexShader: vs, fragmentShader: fs, side: THREE.BackSide, depthWrite: false, depthTest: false, fog: false,
    uniforms: {
      uSun: { value: new THREE.Vector3(0, 1, 0) }, uMoon: { value: new THREE.Vector3(0, -1, 0) },
      uZenith: { value: new THREE.Color() }, uHorizon: { value: new THREE.Color() }, uSunCol: { value: new THREE.Color() },
      uGround: { value: new THREE.Color() }, uCloudLit: { value: new THREE.Color() }, uCloudDark: { value: new THREE.Color() },
      uTime: { value: 0 }, uStars: { value: 0 }, uCloud: { value: 0.5 }, uSunI: { value: 1 }, uMoonI: { value: 0 },
    },
  });
}

const c = (r, g, b) => new THREE.Color().setRGB(r, g, b, THREE.SRGBColorSpace);
// palette keyed by sun elevation sine
const KEYS = [
  { e: -0.30, zen: c(0.010, 0.016, 0.050), hor: c(0.030, 0.045, 0.100), sun: c(0.0, 0.0, 0.0), gnd: c(0.02, 0.03, 0.05), cl: c(0.06, 0.08, 0.14), cd: c(0.02, 0.03, 0.06) },
  { e: -0.12, zen: c(0.03, 0.06, 0.18), hor: c(0.20, 0.20, 0.36), sun: c(0.9, 0.35, 0.2), gnd: c(0.06, 0.06, 0.09), cl: c(0.42, 0.34, 0.50), cd: c(0.10, 0.10, 0.20) },
  { e: -0.03, zen: c(0.10, 0.18, 0.42), hor: c(0.85, 0.48, 0.40), sun: c(1.0, 0.42, 0.18), gnd: c(0.22, 0.14, 0.12), cl: c(1.0, 0.62, 0.46), cd: c(0.28, 0.22, 0.34) },
  { e: 0.05, zen: c(0.20, 0.36, 0.66), hor: c(0.98, 0.66, 0.42), sun: c(1.0, 0.55, 0.24), gnd: c(0.36, 0.26, 0.16), cl: c(1.0, 0.78, 0.58), cd: c(0.42, 0.38, 0.46) },
  { e: 0.25, zen: c(0.14, 0.34, 0.78), hor: c(0.82, 0.78, 0.70), sun: c(1.0, 0.78, 0.50), gnd: c(0.44, 0.36, 0.24), cl: c(1.0, 0.94, 0.84), cd: c(0.55, 0.60, 0.72) },
  { e: 0.70, zen: c(0.08, 0.28, 0.82), hor: c(0.55, 0.75, 0.96), sun: c(1.0, 0.95, 0.86), gnd: c(0.50, 0.46, 0.30), cl: c(1.0, 1.0, 1.0), cd: c(0.60, 0.68, 0.82) },
];
const tmp = new THREE.Color();
function lerpKey(e, prop, out) {
  if (e <= KEYS[0].e) return out.copy(KEYS[0][prop]);
  for (let i = 0; i < KEYS.length - 1; i++) {
    if (e <= KEYS[i + 1].e) {
      const u = (e - KEYS[i].e) / (KEYS[i + 1].e - KEYS[i].e);
      const s = u * u * (3 - 2 * u);
      return out.copy(KEYS[i][prop]).lerp(KEYS[i + 1][prop], s);
    }
  }
  return out.copy(KEYS[KEYS.length - 1][prop]);
}

export function sunDirection(hour, out = new THREE.Vector3()) {
  const th = ((hour - 6) / 12) * Math.PI;   // 0 at sunrise (east), PI at sunset (west)
  out.set(Math.cos(th), Math.sin(th) * 0.86, Math.sin(th) * 0.42 + 0.0);
  // sun below horizon keeps circling
  return out.normalize();
}

export function applySky(mat, hour, time, cloud = 0.5) {
  const u = mat.uniforms;
  const sun = sunDirection(hour, u.uSun.value);
  u.uMoon.value.set(-sun.x * 0.9, -sun.y, -sun.z * 0.9 + 0.2).normalize();
  const e = sun.y;
  lerpKey(e, 'zen', u.uZenith.value); lerpKey(e, 'hor', u.uHorizon.value); lerpKey(e, 'sun', u.uSunCol.value);
  lerpKey(e, 'gnd', u.uGround.value); lerpKey(e, 'cl', u.uCloudLit.value); lerpKey(e, 'cd', u.uCloudDark.value);
  u.uTime.value = time; u.uCloud.value = cloud;
  u.uStars.value = THREE.MathUtils.smoothstep(-e, 0.02, 0.22);
  u.uMoonI.value = THREE.MathUtils.smoothstep(-e, 0.0, 0.2);
  return { e, sun: u.uSun.value, moon: u.uMoon.value };
}
