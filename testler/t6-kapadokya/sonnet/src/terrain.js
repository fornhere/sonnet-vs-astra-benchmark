import * as THREE from 'three';
import { WORLD, RES, CELL, HALF, POIS } from './config.js';
import { U, NOISE, ATMOS, HEIGHT_FN, SHADOW_FN } from './glsl.js';

// ------------------------------------------------------------------
// GPU üretim geçişi: yükseklik, yeşillik maskesi, bölge tonu
// ------------------------------------------------------------------
const GEN_FRAG = /* glsl */ `
precision highp float;
uniform vec3 uTown, uUch, uField;
${NOISE}
float plateauBase(vec2 p){ return 150. + 16.*gfbm(p*0.0007 + vec2(11.,4.), 3); }

float cones(vec2 p, float cell){
  vec2 g = floor(p/cell); float best = 0.;
  for(int dx=-1; dx<=1; dx++) for(int dy=-1; dy<=1; dy++){
    vec2 c = g + vec2(float(dx), float(dy));
    vec2 o = hash22(c);
    vec2 cp = (c + o) * cell;
    float r = cell*(0.34 + 0.26*hash12(c+7.));
    float k = clamp(1. - length(p-cp)/r, 0., 1.);
    best = max(best, pow(k, 1.35) * (0.45 + 0.55*hash12(c+3.)));
  }
  return best;
}
float smin(float a, float b, float k){ float h = clamp(0.5+0.5*(b-a)/k, 0., 1.); return mix(b,a,h) - k*h*(1.-h); }

float prof(float s){ return mix(s, smoothstep(0.22, 0.78, s), 0.72); }
void terrainAll(vec2 p, out float H, out float green, out float region){
  vec2 wv = vec2(gfbm(p*0.0011+vec2(3.7,1.3),3), gfbm(p*0.0011+vec2(8.1,5.2),3));
  vec2 q = p + wv*430.;
  float n1 = gfbm(q*0.00078+vec2(2.,7.), 4);
  float d1 = abs(n1);
  float w1 = 0.12 + 0.06*(gnoise(q*0.0007)*0.5+0.5);
  float wall1 = smoothstep(0.03, w1, d1);
  float n2 = gfbm(q*0.0021+vec2(40.,3.), 3);
  float d2 = abs(n2);
  float wall2 = smoothstep(0.018, 0.085, d2);
  float n3 = gfbm(q*0.0052+vec2(9.,31.), 3);
  float d3 = abs(n3);
  float wall3 = smoothstep(0.014, 0.075, d3);

  float plat = plateauBase(p) + 14.*gfbm(p*0.0016, 3);
  float floorH = 26. + 7.*gfbm(p*0.004, 2);
  float s1 = prof(wall1), s2 = prof(wall2), s3 = prof(wall3);
  float h1 = mix(floorH, plat, s1);
  float h2 = mix(plat - 78., plat, s2);
  float h3 = mix(plat - 34., plat, s3);
  float H0 = smin(smin(h1, h2, 10.), h3, 7.);

  float z1 = smoothstep(0.02, 0.3, s1) * (1. - smoothstep(0.8, 0.99, s1));
  float z2 = smoothstep(0.02, 0.3, s2) * (1. - smoothstep(0.8, 0.99, s2));
  float z3 = smoothstep(0.02, 0.3, s3) * (1. - smoothstep(0.8, 0.99, s3));
  float wz = max(z1, max(z2*0.9, z3*0.7));

  float ridge = 1. - abs(gnoise(p*0.030 + vec2(5.,2.)));
  float ridge2 = 1. - abs(gnoise(p*0.075 + vec2(1.,8.)));
  H0 += wz * (ridge*ridge*7.0 + ridge2*ridge2*2.6 - 4.);
  float cn = cones(p + wv*40., 52.);
  float cn2 = cones(p*1.7 + 30., 26.);
  float cn3 = cones(p*0.5 + 11., 96.);
  float t1 = smoothstep(0.08, 0.5, s1) * (1. - smoothstep(0.55, 0.97, s1));
  float t2 = smoothstep(0.08, 0.5, s2) * (1. - smoothstep(0.6, 0.97, s2));
  float talus = max(t1, t2*0.85);
  H0 += talus * (cn*15. + cn2*4.5);
  // plato üstünde tüf tümsekleri
  float top = smoothstep(0.85, 1.0, min(s1, min(s2, s3)));
  H0 += top * cn3 * 20.;

  float stp = 6.0 + 2.*gnoise(p*0.004);
  float tt = H0 / stp;
  float terr = (floor(tt) + smoothstep(0.55, 1.0, fract(tt))) * stp;
  H0 = mix(H0, terr, 0.32 * wz);
  // her yerde: tümsekler ve sığ oyuntular
  float hum = gfbm(p*0.011 + vec2(31.,7.), 4);
  float gul = 1. - abs(gnoise(p*0.017 + vec2(2.,19.)));
  H0 += (1.0 - 0.6*wz) * (hum*7.5 + gul*gul*3.5 - 1.8);
  H0 += (1.0 - wz) * cones(p*0.9 + 70., 38.) * 6.0;

  // ilgi noktası şekilleri
  // Uçhisar kaya kütlesi
  float du = length(p - uUch.xy) + 26.*gnoise(p*0.018) + 10.*gnoise(p*0.05);
  float uMass = 1. - smoothstep(uUch.z*0.3, uUch.z*0.75, du);
  float ru = 0.6 + 0.6*(gfbm(p*0.011, 4)+0.5);
  float crag = 1. - abs(gnoise(p*0.035 + 3.));
  H0 = mix(H0, max(H0, plat) + 96.*pow(uMass, 0.6)*ru + crag*crag*24.*uMass, smoothstep(0.0, 0.3, uMass));
  // Göreme kasabası: kaba bir yamaç terası
  float dt = length(p - uTown.xy);
  float tMask = 1. - smoothstep(uTown.z*0.55, uTown.z*1.35, dt);
  float townH = 62. - 0.055*(p.x - uTown.x) - 0.02*(p.y - uTown.y) + 3.*gnoise(p*0.02);
  H0 = mix(H0, townH, tMask*0.96);
  // balon alanı: geniş düz vadi tabanı
  float dfld = length(p - uField.xy);
  float fMask = 1. - smoothstep(uField.z*0.5, uField.z*1.5, dfld);
  H0 = mix(H0, 46. + 2.*gnoise(p*0.01), fMask);

  // dünya kenarına doğru yayla
  float edge = smoothstep(1500., 1980., max(abs(p.x), abs(p.y)));
  H0 = mix(H0, plat, edge);

  // yeşil: vadi tabanı ve kasaba çevresi
  float fl = 1. - smoothstep(0.03, 0.15, d1);
  fl *= (1. - s1);
  float gr = smoothstep(0.2, 0.8, fl) * smoothstep(-0.15, 0.25, gfbm(p*0.006+4., 3));
  gr = max(gr, tMask*0.35*smoothstep(-0.1,0.3,gnoise(p*0.03)));
  green = clamp(gr, 0., 1.) * (1.-edge);
  region = clamp(0.5 + 0.9*gfbm(p*0.0005 + vec2(21.,13.), 3), 0., 1.);
  H = H0;
}

void main(){
  vec2 p = (gl_FragCoord.xy / ${RES}.0 - 0.5) * ${WORLD}.0;
  float H, g, r;
  terrainAll(p, H, g, r);
  float x = floor(clamp((H + 64.) / 512., 0., 1.) * 65535. + 0.5);
  float hi = floor(x / 256.);
  float lo = x - hi * 256.;
  gl_FragColor = vec4(hi, lo, floor(g*255.+0.5), floor(r*255.+0.5)) / 255.;
}
`;

const _f32 = new Float32Array(1), _u32 = new Uint32Array(_f32.buffer);
const FLUTE_FRAG = /* glsl */ `
precision highp float;
uniform sampler2D uSrc;
${NOISE}
float hdec(ivec2 c){ c = clamp(c, ivec2(0), ivec2(${RES-1})); vec4 t = texelFetch(uSrc, c, 0)*255.; return ((t.r*256.+t.g)/65535.)*512.-64.; }
void main(){
  ivec2 c = ivec2(gl_FragCoord.xy);
  vec4 t = texelFetch(uSrc, c, 0)*255.;
  float h = ((t.r*256.+t.g)/65535.)*512.-64.;
  float step_ = 3.;
  float hx = (hdec(c+ivec2(3,0)) - hdec(c-ivec2(3,0))) / (2.*step_*${WORLD/RES}.);
  float hz = (hdec(c+ivec2(0,3)) - hdec(c-ivec2(0,3))) / (2.*step_*${WORLD/RES}.);
  vec2 g = vec2(hx, hz);
  float sl = length(g);
  vec2 dir = g / max(sl, 1e-4);
  vec2 tn = vec2(-dir.y, dir.x);
  vec2 p = (gl_FragCoord.xy / ${RES}.0 - 0.5) * ${WORLD}.0;
  float across = dot(p, tn), along = dot(p, dir);
  float f1 = 1. - abs(gnoise(vec2(across*0.12, along*0.018) + 3.));
  float f2 = 1. - abs(gnoise(vec2(across*0.31, along*0.05) + 11.));
  float f3 = gnoise(vec2(across*0.7, along*0.11) + 5.);
  float amp = smoothstep(0.42, 1.2, sl);
  float H = h + amp * (f1*f1*5.2 + f2*f2*1.8 + f3*0.5 - 3.4);
  float x = floor(clamp((H + 64.) / 512., 0., 1.) * 65535. + 0.5);
  float hi = floor(x / 256.);
  float lo = x - hi * 256.;
  gl_FragColor = vec4(hi, lo, t.b, t.a) / 255.;
}
`;

export function toHalf(v) {
  _f32[0] = v; const x = _u32[0];
  const s = (x >>> 16) & 0x8000; const e = ((x >>> 23) & 0xff) - 112; const m = x & 0x7fffff;
  if (e <= 0) return s;
  if (e >= 31) return s | 0x7bff;
  return s | (e << 10) | (m >>> 13);
}

export class Terrain {
  constructor(renderer, scene) {
    this.renderer = renderer; this.scene = scene;
    this.H = null;          // Float32Array RES*RES yükseklik
    this.SH = null;         // gölge yüksekliği (nesneler dahil)
    this.G = null; this.R = null;  // yeşil, bölge
    this.NX = null; this.NZ = null;
  }

  async generate(onProgress) {
    const r = this.renderer;
    const mkRT = () => new THREE.WebGLRenderTarget(RES, RES, {
      type: THREE.UnsignedByteType, format: THREE.RGBAFormat,
      minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter,
      depthBuffer: false, stencilBuffer: false,
    });
    const rtA = mkRT(), rtB = mkRT();
    const P = (n) => POIS.find(p => p.id === n);
    const town = P('goreme'), uch = P('uchisar'), fld = P('balon');
    const vs = 'void main(){ gl_Position = vec4(position.xy, 0., 1.); }';
    const mat1 = new THREE.ShaderMaterial({
      vertexShader: vs, fragmentShader: GEN_FRAG,
      uniforms: {
        uTown: { value: new THREE.Vector3(town.x, town.z, town.r) },
        uUch: { value: new THREE.Vector3(uch.x, uch.z, uch.r) },
        uField: { value: new THREE.Vector3(fld.x, fld.z, fld.r) },
      },
      depthTest: false, depthWrite: false,
    });
    const mat2 = new THREE.ShaderMaterial({ vertexShader: vs, fragmentShader: FLUTE_FRAG, uniforms: { uSrc: { value: rtA.texture } }, depthTest: false, depthWrite: false });
    const tri = new THREE.BufferGeometry();
    tri.setAttribute('position', new THREE.Float32BufferAttribute([-1, -1, 0, 3, -1, 0, -1, 3, 0], 3));
    const quad = new THREE.Mesh(tri, mat1); quad.frustumCulled = false;
    const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const sc = new THREE.Scene(); sc.add(quad);
    const prev = r.getRenderTarget(); const gl = r.getContext();
    const STRIP = 64;
    const n = RES * RES;
    this.H = new Float32Array(n); this.G = new Float32Array(n); this.R = new Float32Array(n);
    const sub = new Uint8Array(RES * STRIP * 4);
    r.autoClear = false;
    const run = async (rt, readback, base) => {
      r.setRenderTarget(rt); rt.scissorTest = true;
      for (let y = 0; y < RES; y += STRIP) {
        rt.scissor.set(0, y, RES, STRIP); rt.viewport.set(0, 0, RES, RES);
        r.render(sc, cam);
        if (readback) {
          r.readRenderTargetPixels(rt, 0, y, RES, STRIP, sub);
          for (let k = 0; k < RES * STRIP; k++) {
            const o = y * RES + k;
            this.H[o] = ((sub[k * 4] * 256 + sub[k * 4 + 1]) / 65535) * 512 - 64;
            this.G[o] = sub[k * 4 + 2] / 255; this.R[o] = sub[k * 4 + 3] / 255;
          }
        } else gl.finish();
        if (onProgress) onProgress(base + 0.5 * y / RES);
        await new Promise(res => setTimeout(res, 0));
      }
      rt.scissorTest = false;
    };
    await run(rtA, false, 0);
    quad.material = mat2;
    await run(rtB, true, 0.5);
    r.autoClear = true;
    r.setRenderTarget(prev);
    rtA.dispose(); rtB.dispose(); mat1.dispose(); mat2.dispose(); tri.dispose();
    this.computeNormals();
  }

  computeNormals() {
    const N = RES, H = this.H;
    this.NX = new Float32Array(N * N); this.NZ = new Float32Array(N * N);
    for (let j = 0; j < N; j++) {
      const j0 = Math.max(j - 1, 0), j1 = Math.min(j + 1, N - 1);
      for (let i = 0; i < N; i++) {
        const i0 = Math.max(i - 1, 0), i1 = Math.min(i + 1, N - 1);
        const dx = (H[j * N + i1] - H[j * N + i0]) / ((i1 - i0) * CELL);
        const dz = (H[j1 * N + i] - H[j0 * N + i]) / ((j1 - j0) * CELL);
        const inv = 1 / Math.sqrt(dx * dx + 1 + dz * dz);
        this.NX[j * N + i] = -dx * inv; this.NZ[j * N + i] = -dz * inv;
      }
    }
  }

  // ---- CPU örnekleme ----
  _idx(x, z) {
    const tx = (x + HALF) / CELL - 0.5, tz = (z + HALF) / CELL - 0.5;
    const ix = Math.floor(tx), iz = Math.floor(tz);
    return [ix, iz, tx - ix, tz - iz];
  }
  _bil(A, x, z) {
    let [ix, iz, fx, fz] = this._idx(x, z);
    const M = RES - 1;
    const x0 = Math.min(Math.max(ix, 0), M), x1 = Math.min(Math.max(ix + 1, 0), M);
    const z0 = Math.min(Math.max(iz, 0), M), z1 = Math.min(Math.max(iz + 1, 0), M);
    const a = A[z0 * RES + x0], b = A[z0 * RES + x1], c = A[z1 * RES + x0], d = A[z1 * RES + x1];
    return (a + (b - a) * fx) * (1 - fz) + (c + (d - c) * fx) * fz;
  }
  heightAt(x, z) { return this._bil(this.H, x, z); }
  greenAt(x, z) { return this._bil(this.G, x, z); }
  regionAt(x, z) { return this._bil(this.R, x, z); }
  normalAt(x, z, out = new THREE.Vector3()) {
    const nx = this._bil(this.NX, x, z), nz = this._bil(this.NZ, x, z);
    const ny = Math.sqrt(Math.max(0, 1 - nx * nx - nz * nz));
    return out.set(nx, ny, nz);
  }
  slopeAt(x, z) { return 1 - this.normalAt(x, z, _tv).y; }

  // ---- dokular ----
  buildTextures(shadowH) {
    const N = RES;
    // yükseklik (R32F)
    const th = new THREE.DataTexture(this.H, N, N, THREE.RedFormat, THREE.FloatType);
    th.minFilter = th.magFilter = THREE.NearestFilter;
    th.generateMipmaps = false; th.needsUpdate = true;
    // normal + öznitelik (RGBA16F)
    const nd = new Uint16Array(N * N * 4);
    for (let i = 0; i < N * N; i++) {
      nd[i * 4] = toHalf(this.NX[i]); nd[i * 4 + 1] = toHalf(this.NZ[i]);
      nd[i * 4 + 2] = toHalf(this.G[i]); nd[i * 4 + 3] = toHalf(this.R[i]);
    }
    const tn = new THREE.DataTexture(nd, N, N, THREE.RGBAFormat, THREE.HalfFloatType);
    tn.minFilter = tn.magFilter = THREE.LinearFilter; tn.generateMipmaps = false;
    tn.wrapS = tn.wrapT = THREE.ClampToEdgeWrapping; tn.needsUpdate = true;
    this.texH = th; this.texN = tn;
    U.uHeight.value = th; U.uNorm.value = tn;
    this.updateShadowTexture(shadowH || this.H);
  }
  updateShadowTexture(arr) {
    const N = RES;
    const sd = new Uint16Array(N * N);
    for (let i = 0; i < N * N; i++) sd[i] = toHalf(arr[i]);
    if (this.texS) this.texS.dispose();
    const ts = new THREE.DataTexture(sd, N, N, THREE.RedFormat, THREE.HalfFloatType);
    ts.minFilter = ts.magFilter = THREE.LinearFilter; ts.generateMipmaps = false; ts.needsUpdate = true;
    this.texS = ts; U.uShadowH.value = ts;
  }

  // ---- parçalı arazi ağı ----
  buildChunks() {
    const CH = 128, NC = WORLD / CH;
    const lods = [64, 32, 16, 8].map(n => makeChunkGeometry(CH, n));
    this.lodGeos = lods;
    this.material = new THREE.ShaderMaterial({
      uniforms: { ...U },
      vertexShader: TERRAIN_VERT,
      fragmentShader: TERRAIN_FRAG,
    });
    this.chunks = [];
    const group = new THREE.Group();
    for (let j = 0; j < NC; j++) for (let i = 0; i < NC; i++) {
      const cx = -HALF + (i + 0.5) * CH, cz = -HALF + (j + 0.5) * CH;
      const m = new THREE.Mesh(lods[3], this.material);
      m.position.set(cx, 0, cz); m.updateMatrix(); m.matrixAutoUpdate = false;
      m.frustumCulled = true; m.userData.lod = 3; m.userData.cx = cx; m.userData.cz = cz;
      group.add(m); this.chunks.push(m);
    }
    this.group = group; this.scene.add(group);
  }
  updateLod(cam) {
    const px = cam.position.x, pz = cam.position.z;
    for (const m of this.chunks) {
      const dx = m.userData.cx - px, dz = m.userData.cz - pz;
      const d = Math.sqrt(dx * dx + dz * dz);
      const cur = m.userData.lod;
      const h = 12; // histerezis
      let want = d < 250 ? 0 : d < 620 ? 1 : d < 1300 ? 2 : 3;
      if (want !== cur) {
        const lim = [250, 620, 1300];
        // sınırdan yeterince uzaklaşmadıkça değiştirme
        const b = lim[Math.min(want, cur) ];
        if (Math.abs(d - b) < h) want = cur;
      }
      if (want !== cur) { m.geometry = this.lodGeos[want]; m.userData.lod = want; }
    }
  }
}
const _tv = new THREE.Vector3();

function makeChunkGeometry(size, n) {
  const step = size / n;
  const pos = [], skirt = [], idx = [];
  const vi = (i, j) => j * (n + 1) + i;
  for (let j = 0; j <= n; j++) for (let i = 0; i <= n; i++) {
    pos.push(-size / 2 + i * step, 0, -size / 2 + j * step); skirt.push(0);
  }
  for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
    const a = vi(i, j), b = vi(i + 1, j), c = vi(i, j + 1), d = vi(i + 1, j + 1);
    // üstten bakınca saat yönünün tersi (normal +y)
    idx.push(a, c, b, b, c, d);
  }
  // etekler
  const addSkirt = (list) => {
    const base = pos.length / 3;
    for (const v of list) { pos.push(pos[v * 3], 0, pos[v * 3 + 2]); skirt.push(1); }
    for (let k = 0; k < list.length - 1; k++) {
      const a = list[k], b = list[k + 1], a2 = base + k, b2 = base + k + 1;
      idx.push(a, a2, b, b, a2, b2, a, b, a2, b, b2, a2); // çift yüzlü
    }
  };
  const top = [], bot = [], lef = [], rig = [];
  for (let i = 0; i <= n; i++) { top.push(vi(i, 0)); bot.push(vi(i, n)); }
  for (let j = 0; j <= n; j++) { lef.push(vi(0, j)); rig.push(vi(n, j)); }
  addSkirt(top); addSkirt(bot); addSkirt(lef); addSkirt(rig);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('aSkirt', new THREE.Float32BufferAttribute(skirt, 1));
  g.setIndex(idx);
  g.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 150, 0), 330);
  g.boundingBox = new THREE.Box3(new THREE.Vector3(-size / 2, 0, -size / 2), new THREE.Vector3(size / 2, 320, size / 2));
  return g;
}

const TERRAIN_VERT = /* glsl */ `
${HEIGHT_FN}
attribute float aSkirt;
varying vec3 vWorld;
void main(){
  vec4 wp = modelMatrix * vec4(position.x, 0.0, position.z, 1.0);
  float h = heightAt(wp.xz);
  wp.y = h - aSkirt*36.0;
  vWorld = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`;

// dolgu: tüf renk paleti ve arazi gölgelendirici
export const TUFF_FN = /* glsl */ `
vec3 strataColor(float h, float region){
  vec3 sand  = vec3(0.47,0.35,0.24);
  vec3 white = vec3(0.64,0.55,0.43);
  vec3 pink  = vec3(0.54,0.33,0.26);
  vec3 rose  = vec3(0.48,0.26,0.22);
  vec3 rust  = vec3(0.40,0.23,0.13);
  vec3 ash   = vec3(0.33,0.28,0.25);
  vec3 col = mix(sand, white, smoothstep(0.0, 1.0, h));
  float pk = smoothstep(0.32, 0.72, region) * step(0.45, fract(h*7.3));
  col = mix(col, mix(pink, rose, fract(h*3.7)), pk*0.85);
  col = mix(col, rust, smoothstep(0.72, 0.95, region) * step(0.55, fract(h*5.1)) * 0.9);
  col = mix(col, ash, step(0.94, fract(h*11.7))*0.45);
  return col;
}
`;

const TERRAIN_FRAG = /* glsl */ `
${NOISE}
${ATMOS}
${HEIGHT_FN}
${SHADOW_FN}
${TUFF_FN}
varying vec3 vWorld;

float detailN(vec3 p){ return vnoise3(p*vec3(1.3,0.55,1.3))*0.6 + vnoise3(p*vec3(4.1,1.6,4.1))*0.4; }

void main(){
  vec3 wp = vWorld;
  vec4 nt = texture2D(uNorm, wuv(wp.xz));
  vec3 N = normalize(vec3(nt.x, sqrt(max(0.0, 1.0 - nt.x*nt.x - nt.y*nt.y)), nt.y));
  float green = nt.z, region = nt.w;
  float dist = length(wp - cameraPosition);

  // ince ayrıntı normali (yakın mesafe)
  float dfade = 1.0 - smoothstep(120.0, 520.0, dist);
  if (dfade > 0.0) {
    float e = 0.35;
    float f0 = detailN(wp);
    vec3 g = vec3(detailN(wp+vec3(e,0,0)) - f0, detailN(wp+vec3(0,e,0)) - f0, detailN(wp+vec3(0,0,e)) - f0) / e;
    g -= N * dot(g, N);
    N = normalize(N - g * 0.32 * dfade);
  }
  float slope = 1.0 - N.y;

  // ---- albedo ----
  float warp = gnoise(wp.xz*0.006)*3.0 + gnoise(vec2(wp.x*0.4+wp.z*0.4, wp.y)*0.04)*1.2;
  float bp = (wp.y + warp) / 3.3;
  float bi = floor(bp), bf = fract(bp);
  float rg = floor(region*4.0);
  // katman kenarlarında sert/yumuşak tüf basamakları: üst kenar yukarı, alt kenar aşağı bakar
  float wallW = smoothstep(0.2, 0.5, slope);
  float ledgeUp = smoothstep(0.80, 1.0, bf), ledgeDn = 1.0 - smoothstep(0.0, 0.14, bf);
  N = normalize(N + vec3(0.0, (ledgeUp*0.9 - ledgeDn*0.55) * wallW * (1.0 - smoothstep(60.0, 500.0, dist)), 0.0));
  vec3 c1 = strataColor(hash12(vec2(bi, rg)), region);
  vec3 c2 = strataColor(hash12(vec2(bi+1.0, rg)), region);
  vec3 rock = mix(c1, c2, smoothstep(0.78, 1.0, bf));
  rock = mix(rock, (c1+c2)*0.5, smoothstep(250.0, 1500.0, dist)*0.6);
  float streak = vnoise3(vec3(wp.x*0.9, wp.y*0.35, wp.z*0.9));
  float mott = vnoise3(wp*vec3(3.2,1.4,3.2));
  rock *= 0.82 + 0.34*streak;
  rock *= 0.9 + 0.2*mott;

  // toprak: büyük ölçekli renk yamaları + kuru ot
  float patchA = vnoise(wp.xz*0.011), patchB = vnoise(wp.xz*0.047 + 9.0), fineS = vnoise(wp.xz*0.6);
  vec3 soilA = vec3(0.30,0.22,0.15), soilB = vec3(0.38,0.29,0.19), soilC = vec3(0.27,0.24,0.20), soilD = vec3(0.36,0.25,0.18);
  vec3 soil = mix(soilA, soilB, patchA);
  soil = mix(soil, soilC, smoothstep(0.55, 0.85, patchB)*0.7);
  soil = mix(soil, soilD, smoothstep(0.5, 0.2, patchA)*0.5*smoothstep(0.3,0.7,region));
  soil *= 0.85 + 0.3*fineS;
  soil = mix(soil, rock*0.62, 0.30 + 0.3*vnoise(wp.xz*0.013));
  float wall = smoothstep(0.16, 0.42, slope + (vnoise3(wp*0.8)-0.5)*0.12);
  vec3 col = mix(soil, rock, wall);
  // kuru ot ve çalı kümeleri
  float tuft = smoothstep(0.58, 0.85, vnoise(wp.xz*0.32 + patchA*4.0)) * (1.0 - wall) * smoothstep(0.35, 0.6, patchB);
  col = mix(col, vec3(0.34,0.30,0.11)*(0.7+0.6*fineS), tuft*0.55);
  float scrub = smoothstep(0.7, 0.86, vnoise(wp.xz*2.7)) * (1.0 - wall) * smoothstep(0.3,0.6,patchA);
  col = mix(col, vec3(0.10,0.11,0.05), scrub*0.55);

  // bağ, bahçe ve tarlalar
  float gmask = smoothstep(0.28, 0.6, green) * (1.0 - smoothstep(0.12, 0.3, slope));
  if (gmask > 0.0) {
    vec2 cell = floor(wp.xz / 46.0);
    float ang = hash12(cell) * 3.14159;
    vec2 dir = vec2(cos(ang), sin(ang));
    float rows = 0.5 + 0.5*sin(dot(wp.xz, dir) * 2.1);
    float kind = hash12(cell + 9.0);
    rows = smoothstep(0.25, 0.85, rows);
    vec3 vine = mix(vec3(0.07,0.12,0.03), vec3(0.24,0.27,0.07), rows);
    vec3 crop = mix(vec3(0.28,0.24,0.08), vec3(0.37,0.31,0.12), rows);
    vec3 orch = mix(vec3(0.07,0.14,0.04), vec3(0.14,0.20,0.06), vnoise(wp.xz*0.5));
    vec3 fld = kind < 0.4 ? vine : kind < 0.72 ? crop : orch;
    fld *= 0.85 + 0.3*vnoise(wp.xz*0.35);
    col = mix(col, fld, gmask);
  }

  // ---- yakın alan: çakıl, taş ve toprak dokusu ----
  float nd = 1.0 - smoothstep(8.0, 75.0, dist);
  if (nd > 0.0) {
    vec2 q = wp.xz * 2.6; vec2 ci = floor(q); vec2 cf = fract(q) - 0.5;
    float rn = hash12(ci); vec2 off = (hash22(ci + 3.0) - 0.5) * 0.45;
    float rr = length(cf - off); float rad = 0.10 + 0.17*rn;
    float peb = smoothstep(rad, rad*0.55, rr) * step(0.5, hash12(ci + 7.0)) * (1.0 - wall);
    vec2 pd = (cf - off) / max(rr, 0.02);
    N = normalize(N + vec3(pd.x, 0.0, pd.y) * peb * 0.55 * nd);
    col *= mix(1.0, 0.55 + 0.9*hash12(ci+11.0), peb*nd);
    float grain = vnoise(wp.xz*17.0) - 0.5, grain2 = vnoise(wp.xz*45.0) - 0.5;
    col *= 1.0 + (grain*0.45 + grain2*0.3) * nd;
    // yüksek frekanslı çıkıntı
    float b0 = vnoise(wp.xz*6.0), bx = vnoise((wp.xz+vec2(0.06,0.0))*6.0), bz = vnoise((wp.xz+vec2(0.0,0.06))*6.0);
    N = normalize(N + vec3(b0-bx, 0.0, b0-bz) * 0.9 * nd * nd);
  }

  // ---- ışık ----
  float NdL = max(dot(N, uLightDir), 0.0);
  float sh = 1.0;
  if (NdL > 0.0 && dist < 5200.0) sh = sunShadow(wp + N*0.6, 1.5);
  float bs = balloonShadow(wp);
  float ao = terrainAO(wp + N*0.4, N);
  vec3 amb = mix(uAmbGround, uAmbSky, N.y*0.5 + 0.5) * ao;
  // duvardan yansıyan sıcak ışık
  vec3 bounce = uLightColor * 0.05 * ao * (1.0 - N.y) * vec3(1.0, 0.6, 0.4);
  vec3 lit = col * (uLightColor * NdL * sh * bs + amb + bounce);
  vec3 outc = applyFog(lit, wp);
  gl_FragColor = vec4(outc, 1.0);
}
`;
