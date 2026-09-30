import * as THREE from 'three';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import { W, D } from './dims.js';
import { WATER_Y } from './world.js';
import { voxUniforms } from './voxmat.js';
import { clamp, smooth } from './util.js';

const C = (h) => new THREE.Color(h);
// Gün döngüsü anahtar kareleri (saat, renkler, yoğunluklar)
const KEYS = [
  { t: 0,    key: C('#7f9fe8'), keyI: 0.8, hemiS: C('#2a3f74'), hemiG: C('#182033'), hemiI: 0.8, zen: C('#04060f'), hor: C('#0e1830'), night: 1.0, expo: 1.15, bloom: 0.5, water: C('#0a1d33'), waterS: C('#1a4358') },
  { t: 4.8,  key: C('#7f9fe8'), keyI: 0.8, hemiS: C('#2a3f74'), hemiG: C('#182033'), hemiI: 0.8, zen: C('#05081a'), hor: C('#16223f'), night: 1.0, expo: 1.15, bloom: 0.5, water: C('#0a1d33'), waterS: C('#1a4358') },
  { t: 5.9,  key: C('#ff9d66'), keyI: 2.2, hemiS: C('#7a80b4'), hemiG: C('#5a4a48'), hemiI: 1.25, zen: C('#2a3a70'), hor: C('#ff9b6a'), night: 0.55, expo: 1.1, bloom: 0.7, water: C('#1b3350'), waterS: C('#4a6a7a') },
  { t: 6.9,  key: C('#ffc088'), keyI: 3.2, hemiS: C('#a5b8e0'), hemiG: C('#7d6f60'), hemiI: 1.3, zen: C('#5a85c8'), hor: C('#ffd2a8'), night: 0.05, expo: 1.05, bloom: 0.45, water: C('#1f4a6d'), waterS: C('#4aa0b0') },
  { t: 9.5,  key: C('#fff3e0'), keyI: 3.8, hemiS: C('#c2dcff'), hemiG: C('#8d806c'), hemiI: 1.3, zen: C('#4d84d6'), hor: C('#d4e5f5'), night: 0, expo: 1.1, bloom: 0.3, water: C('#154a72'), waterS: C('#4bb3c0') },
  { t: 14,   key: C('#fff1dc'), keyI: 3.9, hemiS: C('#c2dcff'), hemiG: C('#8d806c'), hemiI: 1.3, zen: C('#4a80d2'), hor: C('#d2e3f4'), night: 0, expo: 1.1, bloom: 0.3, water: C('#154a72'), waterS: C('#4bb3c0') },
  { t: 17.2, key: C('#ffd9a8'), keyI: 4.0, hemiS: C('#c8d6f0'), hemiG: C('#8d7a64'), hemiI: 1.5, zen: C('#4a76c0'), hor: C('#ffdcb0'), night: 0, expo: 1.02, bloom: 0.4, water: C('#1d557e'), waterS: C('#56b6bd') },
  { t: 18.2, key: C('#ffab5c'), keyI: 3.0, hemiS: C('#b5b8e8'), hemiG: C('#7a5f55'), hemiI: 1.25, zen: C('#3f5fa8'), hor: C('#ffba7c'), night: 0.15, expo: 1.05, bloom: 0.55, water: C('#1f4a70'), waterS: C('#6aa6b0') },
  { t: 18.9, key: C('#ff7a3e'), keyI: 2.0, hemiS: C('#9a8ccc'), hemiG: C('#5a4550'), hemiI: 1.25, zen: C('#2c3a78'), hor: C('#ff7f52'), night: 0.55, expo: 1.1, bloom: 0.8, water: C('#1c3358'), waterS: C('#7a6a90') },
  { t: 19.7, key: C('#8fa8f0'), keyI: 1.25, hemiS: C('#4a5590'), hemiG: C('#2a2438'), hemiI: 1.05, zen: C('#101a3e'), hor: C('#6a4a7c'), night: 0.92, expo: 1.15, bloom: 0.55, water: C('#0e2340'), waterS: C('#2a4a6a') },
  { t: 21,   key: C('#7f9fe8'), keyI: 0.8, hemiS: C('#2a3f74'), hemiG: C('#182033'), hemiI: 0.8, zen: C('#04060f'), hor: C('#0e1830'), night: 1.0, expo: 1.15, bloom: 0.5, water: C('#0a1d33'), waterS: C('#1a4358') },
  { t: 24,   key: C('#7f9fe8'), keyI: 0.8, hemiS: C('#2a3f74'), hemiG: C('#182033'), hemiI: 0.8, zen: C('#04060f'), hor: C('#0e1830'), night: 1.0, expo: 1.15, bloom: 0.5, water: C('#0a1d33'), waterS: C('#1a4358') },
];
const SUN_OFFSET = 29 * Math.PI / 180;    // harita dönüklüğü
function sample(t) {
  let i = 0; while (i < KEYS.length - 2 && t >= KEYS[i + 1].t) i++;
  const a = KEYS[i], b = KEYS[i + 1]; const k = smooth(0, 1, (t - a.t) / (b.t - a.t));
  const out = {};
  for (const p of Object.keys(a)) { if (p === 't') continue; const va = a[p], vb = b[p]; out[p] = va.isColor ? va.clone().lerp(vb, k) : va + (vb - va) * k; }
  return out;
}
export function sunDirFor(t) {
  const elev = 50 * Math.sin(Math.PI * (t - 6.2) / 12.4) * Math.PI / 180; // gündüz 6.2..18.6
  const az = (90 + (t - 6.2) / 12.4 * 180) * Math.PI / 180 - SUN_OFFSET;        // doğudan güneye, batıya
  return { elev, dir: new THREE.Vector3(Math.sin(az) * Math.cos(elev), Math.sin(elev), -Math.cos(az) * Math.cos(elev)).normalize() };
}
const moonDir = new THREE.Vector3(Math.sin(4.1 - SUN_OFFSET) * 0.72, 0.62, -Math.cos(4.1 - SUN_OFFSET) * 0.72).normalize();

export const env = {
  uniforms: {
    uSunDir: { value: new THREE.Vector3(0, 1, 0) }, uMoonDir: { value: moonDir.clone() }, uSunCol: { value: new THREE.Color(1, 1, 1) },
    uZen: { value: new THREE.Color() }, uHor: { value: new THREE.Color() }, uNight: voxUniforms.uNight, uTime: voxUniforms.uTime,
    uDeep: { value: new THREE.Color() }, uShallow: { value: new THREE.Color() }, uSkyW: { value: new THREE.Color() }, uCamPos: { value: new THREE.Vector3() }, uLightK: { value: 1 },
  },
  state: null,
};

export function createSky(scene) {
  const g = new THREE.SphereGeometry(1, 48, 24);
  const m = new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, depthTest: false, fog: false, uniforms: env.uniforms,
    vertexShader: `varying vec3 vD; void main(){ vD = position; vec4 p = modelViewMatrix * vec4(position,1.0); gl_Position = projectionMatrix * p; gl_Position.z = gl_Position.w * 0.9999; }`,
    fragmentShader: `uniform vec3 uZen; uniform vec3 uHor; uniform vec3 uSunDir; uniform vec3 uMoonDir; uniform vec3 uSunCol; uniform float uNight; uniform float uTime; varying vec3 vD;
      float h31(vec3 p){ p = fract(p*0.3183099+vec3(.1,.2,.3)); p*=17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
      void main(){ vec3 d = normalize(vD); float e = d.y;
        vec3 col = mix(uHor, uZen, pow(clamp(e,0.0,1.0), 0.55));
        col = mix(col, uHor*0.55, smoothstep(0.0,-0.25,e));
        float sd = max(dot(d, uSunDir), 0.0);
        col += uSunCol * (pow(sd, 6.0)*0.16 + pow(sd, 400.0)*2.5) * (1.0 - uNight*0.9);
        float md = max(dot(d, uMoonDir), 0.0);
        col += vec3(0.75,0.82,1.0) * (pow(md, 800.0)*3.0 + pow(md, 30.0)*0.06) * uNight;
        // yıldızlar
        vec3 sp = d*220.0; vec3 ci = floor(sp); float hs = h31(ci); float st = step(0.9965, hs) * smoothstep(0.0, 0.25, e) * (0.6 + 0.4*sin(uTime*2.0 + hs*80.0));
        col += vec3(0.9,0.95,1.0) * st * uNight * 1.6;
        gl_FragColor = vec4(col, 1.0); }`,
  });
  const mesh = new THREE.Mesh(g, m); mesh.scale.setScalar(6000); mesh.renderOrder = -10; mesh.frustumCulled = false; scene.add(mesh);
  return mesh;
}

export function createTable(scene, shadowCatcher = true) {
  const grp = new THREE.Group();
  // koyu mat masa yüzeyi (ince gren)
  const cv = document.createElement('canvas'); cv.width = 512; cv.height = 512; const cx = cv.getContext('2d');
  cx.fillStyle = '#566173'; cx.fillRect(0, 0, 512, 512);
  const id = cx.getImageData(0, 0, 512, 512); for (let i = 0; i < id.data.length; i += 4) { const n = (Math.random() - 0.5) * 9; id.data[i] += n; id.data[i + 1] += n; id.data[i + 2] += n * 1.1; } cx.putImageData(id, 0, 0);
  const tex = new THREE.CanvasTexture(cv); tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(200, 200); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8;
  const tm = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.62, metalness: 0.0, color: 0xffffff });
  const table = new THREE.Mesh(new THREE.CircleGeometry(4200, 96), tm); table.rotation.x = -Math.PI / 2; table.position.set(W / 2, -9, D / 2); table.receiveShadow = true; grp.add(table);
  // kaide / ahşap kaide plinth
  const PW = W + 30, PD = D + 30;
  const cv2 = document.createElement('canvas'); cv2.width = 512; cv2.height = 512; const c2 = cv2.getContext('2d'); c2.fillStyle = '#3b271a'; c2.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 500; i++) { c2.strokeStyle = `rgba(${Math.random() < 0.5 ? '15,8,3' : '120,80,45'},${Math.random() * 0.12})`; c2.lineWidth = 0.5 + Math.random() * 1.6; const y = Math.random() * 512; c2.beginPath(); c2.moveTo(0, y); c2.lineTo(512, y + (Math.random() - 0.5) * 8); c2.stroke(); }
  const t2 = new THREE.CanvasTexture(cv2); t2.wrapS = t2.wrapT = THREE.RepeatWrapping; t2.colorSpace = THREE.SRGBColorSpace; t2.repeat.set(10, 1);
  const pm = new THREE.MeshStandardMaterial({ map: t2, roughness: 0.42, metalness: 0.05 });
  const plinth = new THREE.Mesh(new THREE.BoxGeometry(PW, 9, PD), pm); plinth.position.set(W / 2, -4.5, D / 2); plinth.castShadow = true; plinth.receiveShadow = true; grp.add(plinth);
  // pirinç çerçeve şeridi
  const brass = new THREE.MeshStandardMaterial({ color: 0xc9a24c, roughness: 0.28, metalness: 0.9 });
  const bt = 1.1, bh = 0.5;
  const mk = (w, d, x, z) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, bh, d), brass); m.position.set(x, bh / 2, z); m.receiveShadow = true; grp.add(m); };
  mk(W + 2 * bt, bt, W / 2, -bt / 2); mk(W + 2 * bt, bt, W / 2, D + bt / 2); mk(bt, D, -bt / 2, D / 2); mk(bt, D, W + bt / 2, D / 2);
  // plaka
  const pc = document.createElement('canvas'); pc.width = 2048; pc.height = 128; const p2 = pc.getContext('2d');
  p2.fillStyle = '#17110c'; p2.fillRect(0, 0, 2048, 128);
  p2.strokeStyle = '#b8923f'; p2.lineWidth = 3; p2.strokeRect(6, 6, 2036, 116);
  p2.fillStyle = '#e8c874'; p2.textBaseline = 'middle'; p2.textAlign = 'center';
  p2.font = '600 62px "Georgia", serif'; p2.fillText('M  A  N  H  A  T  T  A  N', 1024, 50);
  p2.font = '400 26px "Georgia", serif'; p2.fillStyle = '#c9a85c'; p2.fillText('NEW YORK CITY  ·  40.7128° N  74.0060° W  ·  1 BLOK ≈ 16 METRE  ·  GERÇEK BİNA VERİSİ', 1024, 100);
  const ptex = new THREE.CanvasTexture(pc); ptex.colorSpace = THREE.SRGBColorSpace; ptex.anisotropy = 8;
  const plate = new THREE.Mesh(new THREE.PlaneGeometry(190, 190 * 128 / 2048), new THREE.MeshStandardMaterial({ map: ptex, roughness: 0.4, metalness: 0.6, emissive: 0xffffff, emissiveMap: ptex, emissiveIntensity: 0.06 }));
  plate.position.set(W / 2, -4.6, D + 15.05); grp.add(plate);
  scene.add(grp); return { grp, table, plinth };
}

export function createWater(scene, world) {
  const { W, D, shore, kind } = world;
  const data = new Uint8Array(W * D * 4);
  for (let c = 0; c < W * D; c++) { const k = kind[c]; let r = 0, gch = 0;
    if (k === 0 || k === 4) r = Math.min(255, Math.round(shore[c] * 12)); else if (k === 5) { r = 34; gch = 255; }
    data[c * 4] = r; data[c * 4 + 1] = gch; data[c * 4 + 3] = 255; }
  const tex = new THREE.DataTexture(data, W, D, THREE.RGBAFormat); tex.magFilter = THREE.LinearFilter; tex.minFilter = THREE.LinearFilter; tex.needsUpdate = true;
  const u = { ...env.uniforms, uShore: { value: tex }, uSize: { value: new THREE.Vector2(W, D) }, uUseRefl: { value: 1 } };
  const vert = `uniform mat4 textureMatrix; varying vec4 vUvR; varying vec3 vW; void main(){ vUvR = textureMatrix * vec4(position,1.0); vec4 wp = modelMatrix * vec4(position,1.0); vW = wp.xyz; gl_Position = projectionMatrix * viewMatrix * wp; }`;
  const frag = `uniform vec3 color; uniform sampler2D tDiffuse; uniform float uUseRefl; varying vec4 vUvR;
      uniform sampler2D uShore; uniform vec2 uSize; uniform vec3 uSunDir; uniform vec3 uMoonDir; uniform vec3 uSunCol; uniform vec3 uZen; uniform vec3 uHor; uniform vec3 uDeep; uniform vec3 uShallow; uniform float uTime; uniform float uNight; uniform vec3 uCamPos; uniform float uLightK; varying vec3 vW;
      float h21(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233)))*43758.5453); }
      float vn(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f); return mix(mix(h21(i),h21(i+vec2(1,0)),f.x), mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x), f.y); }
      vec2 h22(vec2 p){ p = vec2(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3))); return -1.0 + 2.0*fract(sin(p)*43758.5453123); }
      float gn(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*f*(f*(f*6.0-15.0)+10.0);
        return mix(mix(dot(h22(i),f), dot(h22(i+vec2(1,0)),f-vec2(1,0)),u.x), mix(dot(h22(i+vec2(0,1)),f-vec2(0,1)), dot(h22(i+vec2(1,1)),f-vec2(1,1)),u.x),u.y); }
      float hf(vec2 p, float t){ mat2 R = mat2(0.8,-0.6,0.6,0.8); float h = gn(p*0.42 + vec2(t*0.22,t*0.13)); vec2 q = R*p*2.1; h += gn(q*0.42 + vec2(-t*0.3,t*0.18))*0.5; q = R*q*2.0; h += gn(q*0.42 + vec2(t*0.55,-t*0.35))*0.25; return h; }
      void main(){
        vec2 uv = vW.xz / uSize; vec4 s = texture2D(uShore, uv); float dist = s.r * 255.0 / 12.0; float pond = s.g;
        float t = uTime; vec2 p = vW.xz;
        float calm = mix(1.0, 0.35, pond);
        vec2 g; { float e = 0.16; g = vec2(hf(p+vec2(e,0.0),t) - hf(p-vec2(e,0.0),t), hf(p+vec2(0.0,e),t) - hf(p-vec2(0.0,e),t)) * 1.6; }
        vec3 N = normalize(vec3(-g.x*calm, 1.0, -g.y*calm));
        vec3 V = normalize(uCamPos - vW); float ndv = max(dot(N,V), 0.0);
        float F = 0.26 + 0.74*pow(1.0-ndv, 2.6);
        float deepf = smoothstep(0.0, 9.0, dist);
        vec3 base = mix(uShallow, uDeep, deepf);
        vec3 R = reflect(-V, N);
        vec3 sky = mix(uHor, uZen, pow(clamp(R.y,0.0,1.0),0.5));
        vec4 rp = vUvR; rp.xy += (g * 0.9 * calm) * rp.w * 0.035;
        vec3 rr = texture2DProj(tDiffuse, rp).rgb * 0.36 + texture2DProj(tDiffuse, rp + vec4(0.0035, 0.0, 0.0, 0.0) * rp.w).rgb * 0.16 + texture2DProj(tDiffuse, rp - vec4(0.0035, 0.0, 0.0, 0.0) * rp.w).rgb * 0.16 + texture2DProj(tDiffuse, rp + vec4(0.0, 0.0045, 0.0, 0.0) * rp.w).rgb * 0.16 + texture2DProj(tDiffuse, rp - vec4(0.0, 0.0045, 0.0, 0.0) * rp.w).rgb * 0.16; rr = rr / (1.0 + 0.55 * max(rr.r, max(rr.g, rr.b))) * 1.55; vec3 rc = mix(sky, rr, uUseRefl);
        vec3 col = mix(base, rc, clamp(F * (0.64 - 0.25*pond), 0.0, 0.8));
        col *= 0.90 + 0.22 * clamp(dot(N, normalize(uSunDir)), 0.0, 1.0);
        float sp = pow(max(dot(R, normalize(uSunDir)),0.0), 260.0) * step(-0.05, uSunDir.y);
        float mp = pow(max(dot(R, uMoonDir),0.0), 300.0) * uNight;
        col += uSunCol * sp * 1.6 * (1.0-uNight) + vec3(0.7,0.8,1.0)*mp*1.5;
        float wob = 0.5+0.5*sin(t*1.4 + p.x*0.8 + p.y*0.6 + vn(p*1.7)*6.0);
        float foam = smoothstep(1.55 + 0.3*wob, 0.9, dist) * (1.0-pond*0.7);
        float foam2 = smoothstep(0.62, 0.5, abs(dist - (2.3 + 0.5*sin(t*0.9+p.x*0.5)))) * 0.25 * (1.0-pond) * (1.0-deepf);
        col = mix(col, vec3(0.92,0.97,1.0)*mix(1.0,0.35,uNight), clamp(foam*0.75+foam2, 0.0, 0.85));
        float tw = vn(p*3.0 + vec2(t*0.9, -t*0.4));
        col += vec3(1.0,0.66,0.34) * uNight * smoothstep(5.0,0.5,dist) * pow(tw,3.0) * 0.4 * (1.0-pond) * (1.0 - uUseRefl*0.5);
        float alpha = mix(0.50, 0.94, deepf); alpha = mix(alpha, 0.8, pond); alpha = clamp(alpha + F*0.25 + foam*0.4, 0.0, 0.98);
        gl_FragColor = vec4(col * uLightK, alpha);
      }`;
  const rw = Math.min(1600, Math.max(640, Math.round(innerWidth * 0.5 * Math.min(devicePixelRatio || 1, 2)))), rh = Math.min(1000, Math.max(360, Math.round(innerHeight * 0.5 * Math.min(devicePixelRatio || 1, 2))));
  const mesh = new Reflector(new THREE.PlaneGeometry(W, D, 1, 1), { textureWidth: rw, textureHeight: rh, clipBias: 0.02, multisample: 0, shader: { name: 'NYWater', uniforms: { color: { value: null }, tDiffuse: { value: null }, textureMatrix: { value: null } }, vertexShader: vert, fragmentShader: frag } });
  for (const k of Object.keys(u)) mesh.material.uniforms[k] = u[k];
  mesh.material.transparent = true; mesh.material.depthWrite = false; mesh.rotation.x = -Math.PI / 2; mesh.position.set(W / 2, WATER_Y, D / 2); mesh.renderOrder = 5; scene.add(mesh);
  const mat = mesh.material;
  // yan duvarlar
  const wallMat = new THREE.ShaderMaterial({ transparent: true, depthWrite: false, side: THREE.DoubleSide, uniforms: { ...env.uniforms },
    vertexShader: `varying vec3 vW; void main(){ vec4 wp = modelMatrix * vec4(position,1.0); vW = wp.xyz; gl_Position = projectionMatrix * viewMatrix * wp; }`,
    fragmentShader: `uniform vec3 uDeep; uniform vec3 uShallow; uniform float uLightK; uniform float uNight; varying vec3 vW;
      void main(){ float k = clamp((vW.y - 2.0) / (${WATER_Y.toFixed(2)} - 2.0), 0.0, 1.0); vec3 c = mix(uDeep*0.55, uShallow*0.9, pow(k, 1.6)); c += vec3(0.9,1.0,1.0) * smoothstep(0.93, 1.0, k) * 0.5 * (1.0-uNight*0.6);
        gl_FragColor = vec4(c * uLightK, mix(0.93, 0.78, k));
      }` });
  const wh = WATER_Y - 2.0; const inset = 0.03;
  const mkWall = (w, x, z, ry) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, wh), wallMat); m.position.set(x, 2.0 + wh / 2, z); m.rotation.y = ry; m.renderOrder = 6; scene.add(m); };
  const walls = []; const mkWall2 = (...a) => { const before = scene.children.length; mkWall(...a); walls.push(scene.children[scene.children.length - 1]); };
  mkWall2(W, W / 2, D - inset, 0); mkWall2(W, W / 2, inset, Math.PI); mkWall2(D, inset, D / 2, -Math.PI / 2); mkWall2(D, W - inset, D / 2, Math.PI / 2);
  const orig = mesh.onBeforeRender; let on = true;
  mesh.onBeforeRender = function (r, sc, cam) { if (!on) return; walls.forEach(w => w.visible = false); orig.call(this, r, sc, cam); walls.forEach(w => w.visible = true); };
  const api = { mesh, mat, setReflection(v) { on = v; u.uUseRefl.value = v ? 1 : 0; }, resize(w, h, pr) { const tw = Math.min(1600, Math.max(640, Math.round(w * 0.5 * pr))), th = Math.min(1000, Math.max(360, Math.round(h * 0.5 * pr))); mesh.getRenderTarget().setSize(tw, th); } };
  return api;
}

// Zaman uygulayıcı
export function applyTime(t, ctx) {
  const s = sample(t); env.state = s;
  const { elev, dir } = sunDirFor(t);
  const useSun = elev > -0.05;
  const kdir = useSun ? dir : env.uniforms.uMoonDir.value;
  const dayFade = smooth(-0.06, 0.06, elev);
  const keyI = useSun ? s.keyI * (0.15 + 0.85 * smooth(-0.05, 0.12, elev)) : s.keyI * 0.9;
  ctx.sun.color.copy(s.key); ctx.sun.intensity = keyI; ctx.sunDir.copy(kdir);
  ctx.hemi.color.copy(s.hemiS); ctx.hemi.groundColor.copy(s.hemiG); ctx.hemi.intensity = s.hemiI;
  env.uniforms.uSunDir.value.copy(dir); env.uniforms.uSunCol.value.copy(s.key);
  env.uniforms.uZen.value.copy(s.zen); env.uniforms.uHor.value.copy(s.hor);
  env.uniforms.uDeep.value.copy(s.water); env.uniforms.uShallow.value.copy(s.waterS);
  voxUniforms.uNight.value = s.night; voxUniforms.uSkyCol.value.copy(s.hor).lerp(s.zen, 0.5);
  const sn = voxUniforms.uSnow.value; if (sn > 0.001) { const gray = new THREE.Color(0.62, 0.66, 0.72); s.hor.lerp(gray, 0.55 * sn); s.zen.lerp(gray.clone().multiplyScalar(0.8), 0.6 * sn); s.hemiS.lerp(new THREE.Color(0.75, 0.8, 0.9), 0.5 * sn); ctx.sun.intensity *= (1 - 0.35 * sn); env.uniforms.uHor.value.copy(s.hor); env.uniforms.uZen.value.copy(s.zen); }
  const fogc = s.hor.clone(); { const hsl = {}; fogc.getHSL(hsl); fogc.setHSL(hsl.h, hsl.s * 0.55, hsl.l * 0.74); } ctx.scene.fog.color.copy(fogc); ctx.scene.background = fogc;
  env.uniforms.uLightK.value = 0.55 + 0.45 * (1 - s.night);
  ctx.renderer.toneMappingExposure = s.expo; ctx.state = s;
  return s;
}
