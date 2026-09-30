// Gün döngüsü: güneş/ay, gökyüzü kubbesi, sis, hemisfer ışığı, pozlama. Kaydırıcı 0..1: şafak → öğlen → gün batımı → gece.
import * as THREE from 'three';
import { U } from './materials.js';
import { W, H } from './geo.js';

const C = (h) => new THREE.Color(h);
const A = 29 * Math.PI / 180; // ızgara, gerçek kuzeyden 29° doğuya dönük
const KEYS = [
  { s: 0.00, elev: 7, az: 100, sun: C('#ffb27a'), sunI: 2.6, zen: C('#4f66a6'), hor: C('#ffc59a'), glow: C('#ff9a6a'), fog: C('#e9b9a2'), hemiS: C('#8f9fcb'), hemiG: C('#6d5b53'), hemiI: 0.85, exp: 0.95, night: 0.30, star: 0.15, env: 0.35 },
  { s: 0.33, elev: 62, az: 178, sun: C('#fff1da'), sunI: 3.5, zen: C('#3b7bd0'), hor: C('#c2dcf3'), glow: C('#ffe7bd'), fog: C('#c9dcef'), hemiS: C('#aacbf3'), hemiG: C('#7b7160'), hemiI: 1.9, exp: 1.0, night: 0.0, star: 0.0, env: 0.5 },
  { s: 0.66, elev: 13, az: 250, sun: C('#ffa458'), sunI: 3.5, zen: C('#3f5b9c'), hor: C('#ffa070'), glow: C('#ff8a4a'), fog: C('#e8a082'), hemiS: C('#a596c4'), hemiG: C('#5c4539'), hemiI: 1.55, exp: 1.05, night: 0.55, star: 0.2, env: 0.35 },
  { s: 1.00, elev: -26, az: 292, sun: C('#ff5a30'), sunI: 0.0, zen: C('#050a1e'), hor: C('#17264d'), glow: C('#3a2a5a'), fog: C('#0e1834'), hemiS: C('#3a5290'), hemiG: C('#15121a'), hemiI: 0.3, exp: 1.3, night: 1.0, star: 1.0, env: 0.035 },
];
const ss = (t) => t * t * (3 - 2 * t);

export class Lighting {
  constructor(scene, renderer) {
    this.scene = scene; this.renderer = renderer;
    this.s = 0.66; this.weather = 'clear'; this.weatherK = { fog: 0, snow: 0 };
    this.sunDir = new THREE.Vector3(); this.k = {};
    // ışıklar
    this.hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 1); scene.add(this.hemi);
    this.sun = new THREE.DirectionalLight(0xffffff, 3); this.sun.castShadow = true; scene.add(this.sun); scene.add(this.sun.target);
    this.moon = new THREE.DirectionalLight(0x8fa8ff, 0.5); scene.add(this.moon); scene.add(this.moon.target);
    this.fill = new THREE.DirectionalLight(0xffffff, 0.0); scene.add(this.fill);
    scene.fog = new THREE.FogExp2(0xffffff, 0.00014);
    // gökyüzü kubbesi
    const geo = new THREE.SphereGeometry(9000, 48, 24);
    this.skyU = { uZen: { value: new THREE.Color() }, uHor: { value: new THREE.Color() }, uGlow: { value: new THREE.Color() }, uSunDir: { value: this.sunDir }, uSunCol: { value: new THREE.Color() }, uStar: { value: 0 }, uFogCol: { value: new THREE.Color() }, uMist: { value: 0 }, uTime: U.uTime };
    this.sky = new THREE.Mesh(geo, new THREE.ShaderMaterial({
      uniforms: this.skyU, side: THREE.BackSide, depthWrite: false, fog: false,
      vertexShader: `varying vec3 vDir; void main(){ vDir = normalize(position); vec4 p = modelViewMatrix*vec4(position,1.0); gl_Position = projectionMatrix*p; gl_Position.z = gl_Position.w*0.99999; }`,
      fragmentShader: `varying vec3 vDir; uniform vec3 uZen,uHor,uGlow,uSunDir,uSunCol,uFogCol; uniform float uStar,uMist,uTime;
        float h13(vec3 p3){ p3 = fract(p3*.1031); p3 += dot(p3,p3.zyx+31.32); return fract((p3.x+p3.y)*p3.z); }
        void main(){
          vec3 d = normalize(vDir); float y = d.y;
          float hh = clamp(y,0.0,1.0);
          vec3 col = mix(uHor, uZen, pow(hh, 0.45));
          float sd = max(dot(d, normalize(uSunDir)), 0.0);
          float az = pow(sd, 6.0);
          col += uGlow * az * 0.55 * (1.0 - smoothstep(0.0, 0.6, hh));
          col += uGlow * pow(sd, 40.0) * 0.5;
          col += uSunCol * smoothstep(0.9985, 0.9995, sd) * 4.0 * step(0.0, uSunDir.y + 0.05);
          // yatay şerit
          col = mix(col, uHor * 1.05, exp(-abs(y) * 9.0) * 0.35);
          if (y < 0.0) col = mix(col, uFogCol, smoothstep(0.0, -0.15, y));
          // yıldızlar
          if (uStar > 0.01 && y > 0.02) { vec3 g = floor(d * 260.0); float st = step(0.9972, h13(g)); float tw = 0.6 + 0.4 * sin(uTime * 2.0 + h13(g + 3.0) * 30.0); col += vec3(st * tw * uStar * (0.5 + 0.8 * h13(g + 1.0))) * smoothstep(0.02, 0.25, y); }
          col = mix(col, uFogCol, uMist);
          gl_FragColor = vec4(col, 1.0);
        }`,
    }));
    this.sky.frustumCulled = false; this.sky.userData.noAO = true; this.sky.renderOrder = -10; scene.add(this.sky);
    this._mist = 0;
    this.apply(true);
  }
  setTime(s) { this.s = Math.min(1, Math.max(0, s)); this.apply(); }
  setWeather(w) { this.weather = w; }
  blend() {
    const s = this.s; let i = 0; while (i < KEYS.length - 2 && s > KEYS[i + 1].s) i++;
    const a = KEYS[i], b = KEYS[i + 1]; const t = ss(Math.min(1, Math.max(0, (s - a.s) / (b.s - a.s))));
    const L = (x, y) => x + (y - x) * t, LC = (x, y) => x.clone().lerp(y, t);
    return { elev: L(a.elev, b.elev), az: L(a.az, b.az), sun: LC(a.sun, b.sun), sunI: L(a.sunI, b.sunI), zen: LC(a.zen, b.zen), hor: LC(a.hor, b.hor), glow: LC(a.glow, b.glow), fog: LC(a.fog, b.fog), hemiS: LC(a.hemiS, b.hemiS), hemiG: LC(a.hemiG, b.hemiG), hemiI: L(a.hemiI, b.hemiI), exp: L(a.exp, b.exp), night: L(a.night, b.night), star: L(a.star, b.star), env: L(a.env, b.env) };
  }
  apply(first) {
    const k = this.blend(); this.k = k;
    const wf = this.weatherK;
    const elev = k.elev * Math.PI / 180, b = (k.az - 29) * Math.PI / 180;
    this.sunDir.set(Math.cos(elev) * Math.sin(b), Math.sin(elev), -Math.cos(elev) * Math.cos(b)).normalize();
    // hava durumu: sis/kar güneşi söndürür, gökyüzünü gri-beyaza çeker
    const gray = Math.max(wf.fog * 0.75, wf.snow * 0.85);
    const lum = (c) => c.r * 0.3 + c.g * 0.59 + c.b * 0.11;
    const grayOf = (c, m) => { const l = lum(c); return c.clone().lerp(new THREE.Color(l * 1.05 + 0.04, l * 1.06 + 0.045, l * 1.1 + 0.06), m); };
    const zen = grayOf(k.zen, gray), hor = grayOf(k.hor, gray), fog = grayOf(k.fog, gray), glow = grayOf(k.glow, gray * 0.9);
    const dayAmt = Math.min(1, Math.max(0, (k.elev + 4) / 10));
    const sunI = k.sunI * (1 - 0.86 * wf.fog) * (1 - 0.9 * wf.snow) * dayAmt;
    this.sun.color.copy(k.sun); this.sun.intensity = sunI;
    this.sun.position.copy(this.sunDir).multiplyScalar(1200).add(new THREE.Vector3(W / 2, 0, H / 2));
    this.sun.target.position.set(W / 2, 0, H / 2);
    this.moon.position.set(W / 2 - 500, 700, H / 2 + 400); this.moon.target.position.set(W / 2, 0, H / 2);
    const nightAmt = Math.min(1, Math.max(0, (k.night - 0.35) / 0.65));
    this.moon.intensity = 0.42 * nightAmt * (1 - 0.5 * wf.fog);
    this.hemi.color.copy(k.hemiS).lerp(new THREE.Color(0.75, 0.78, 0.85), gray * 0.6); this.hemi.groundColor.copy(k.hemiG);
    this.hemi.intensity = k.hemiI * (1 + 0.25 * gray);
    this.scene.fog.color.copy(fog);
    this.scene.fog.density = 0.00013 + wf.fog * 0.0028 + wf.snow * 0.0006;
    this.renderer.toneMappingExposure = k.exp;
    this.scene.environmentIntensity = k.env;
    this.skyU.uZen.value.copy(zen); this.skyU.uHor.value.copy(hor); this.skyU.uGlow.value.copy(glow);
    this.skyU.uSunCol.value.copy(k.sun); this.skyU.uStar.value = k.star * (1 - wf.fog) * (1 - wf.snow); this.skyU.uFogCol.value.copy(fog);
    this.skyU.uMist.value = Math.min(0.92, wf.fog * 0.85 + wf.snow * 0.55);
    U.uNight.value = k.night * (1 - 0.15 * wf.fog);
    U.uSkyCol.value.copy(hor.clone().lerp(zen, 0.4)); U.uSunCol.value.copy(k.sun); U.uSunDir.value.copy(this.sunDir);
  }
  // Gölge kamerası: sahneyi kapsayacak şekilde
  setupShadow(q) {
    const s = this.sun; const size = q === 'low' ? 2048 : 4096;
    s.shadow.mapSize.set(size, size);
    const R = Math.hypot(W, H) * 0.5 * 0.93;
    Object.assign(s.shadow.camera, { left: -R, right: R, top: R, bottom: -R, near: 100, far: 2600 });
    s.shadow.bias = -0.0006; s.shadow.normalBias = 0.35; s.shadow.camera.updateProjectionMatrix();
  }
  update(t, cam) {
    this.sky.position.copy(cam.position);
    // gölge kamerası hizası: güneş yönüne göre
    this.sun.shadow.camera.updateMatrixWorld();
  }
  get night() { return this.k.night ?? 0; }
}
