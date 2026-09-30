import * as THREE from 'three';

// ---------- CPU noise / height ----------
function hash2(ix, iz) {
  let h = Math.imul(ix, 374761393) + Math.imul(iz, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}
function vnoise(x, z) {
  const ix = Math.floor(x), iz = Math.floor(z), fx = x - ix, fz = z - iz;
  const u = fx * fx * (3 - 2 * fx), v = fz * fz * (3 - 2 * fz);
  const a = hash2(ix, iz), b = hash2(ix + 1, iz), c = hash2(ix, iz + 1), d = hash2(ix + 1, iz + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function fbm(x, z, o = 4) { let a = 0.5, s = 0; for (let i = 0; i < o; i++) { s += a * vnoise(x, z); x = x * 2.03 + 17; z = z * 2.03 + 3; a *= 0.5; } return s; }
const ss = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

export const riverZ = (x) => 820 + 130 * Math.sin(x * 0.0016 + 0.6) + 55 * Math.sin(x * 0.0051 + 2.0);
const RIVER_W = 62;

export function terrainH(x, z) {
  const r = Math.hypot(x, z);
  let h = 0;
  h += (fbm(x * 0.004, z * 0.004, 3) - 0.5) * 16 * ss(70, 520, r);
  h += (fbm(x * 0.0009 + 10, z * 0.0009, 3) - 0.5) * 120 * ss(500, 3200, r);
  const dirBias = 1 + 0.7 * Math.max(0, (-z * 0.6 + x * 0.55) / Math.max(r, 1));
  const rf = fbm(x * 0.00042 + 40, z * 0.00042, 4) * 2 - 1;
  const ridged = 1 - Math.sqrt(rf * rf + 0.045);
  h += Math.pow(ridged, 1.5) * 1250 * ss(2600, 9500, r) * dirBias * (0.55 + fbm(x * 0.0002, z * 0.0002 + 9, 2));
  const d = Math.abs(z - riverZ(x));
  const bank = 1 - ss(RIVER_W * 0.7, RIVER_W + 130, d);
  const chan = 1 - ss(RIVER_W * 0.5, RIVER_W * 0.95, d);
  h = h * (1 - bank * 0.85) - chan * 4.5;
  return h;
}


// ---------- ground data textures (height + base colour) over +-512 m ----------
const GT = 512, GR = 512;
export const groundHeightTex = (() => {
  const d = new Float32Array(GT * GT);
  for (let j = 0; j < GT; j++) for (let i = 0; i < GT; i++) {
    const x = ((i + 0.5) / GT) * 2 * GR - GR, z = ((j + 0.5) / GT) * 2 * GR - GR;
    d[j * GT + i] = terrainH(x, z);
  }
  const t = new THREE.DataTexture(d, GT, GT, THREE.RedFormat, THREE.FloatType);
  t.minFilter = t.magFilter = THREE.NearestFilter; t.needsUpdate = true; return t;
})();
export const groundColorTex = (() => {
  const d = new Uint8Array(GT * GT * 4);
  const enc = (v) => Math.round(255 * Math.pow(Math.min(1, Math.max(0, v)), 1 / 2.2));
  for (let j = 0; j < GT; j++) for (let i = 0; i < GT; i++) {
    const x = ((i + 0.5) / GT) * 2 * GR - GR, z = ((j + 0.5) / GT) * 2 * GR - GR;
    const n1 = fbm(x * 0.0035, z * 0.0035, 4), n2 = fbm(x * 0.03, z * 0.03, 3), dry = fbm(x * 0.0011 + 7, z * 0.0011, 3);
    let t = ss(0.12, 0.6, n1);
    const dr = ss(0.55, 0.9, dry) * 0.55;
    let r = 0.13 + t * 0.34, g = 0.19 + t * 0.17, b = 0.065 + t * 0.05;
    r += (0.50 - r) * dr; g += (0.42 - g) * dr; b += (0.22 - b) * dr;
    const m = 0.80 + 0.35 * n2;
    const k = (j * GT + i) * 4; d[k] = enc(r * m); d[k + 1] = enc(g * m); d[k + 2] = enc(b * m); d[k + 3] = 255;
  }
  const t = new THREE.DataTexture(d, GT, GT, THREE.RGBAFormat, THREE.UnsignedByteType);
  t.colorSpace = THREE.SRGBColorSpace; t.minFilter = THREE.LinearMipmapLinearFilter; t.magFilter = THREE.LinearFilter; t.generateMipmaps = true; t.needsUpdate = true; return t;
})();

// ---------- terrain mesh (polar) ----------
const terrainMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.96, metalness: 0 });
export const terrainUniforms = { uTime: { value: 0 }, uNight: { value: 0 } };

terrainMat.onBeforeCompile = (sh) => {
  sh.uniforms.uNight = terrainUniforms.uNight; sh.uniforms.uGround = { value: groundColorTex };
  sh.vertexShader = sh.vertexShader
    .replace('#include <common>', '#include <common>\nvarying vec3 vWP;')
    .replace('#include <begin_vertex>', '#include <begin_vertex>\nvWP = (modelMatrix * vec4(position,1.0)).xyz;');
  sh.fragmentShader = sh.fragmentShader
    .replace('#include <common>', `#include <common>
varying vec3 vWP;
uniform float uNight; uniform sampler2D uGround;
float h21(vec2 p){ vec3 p3 = fract(vec3(p.xyx)*.1031); p3 += dot(p3,p3.yzx+33.33); return fract((p3.x+p3.y)*p3.z); }
float vn(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
  return mix(mix(h21(i),h21(i+vec2(1,0)),f.x), mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x), f.y); }
float fbm(vec2 p){ float a=.5,s=0.; for(int i=0;i<5;i++){ s+=a*vn(p); p=p*2.03+vec2(17.,3.); a*=.5;} return s; }
`)
    .replace('#include <color_fragment>', `#include <color_fragment>
{
  vec2 p = vWP.xz; float r = length(p);
  float n1 = fbm(p*0.0035), n2 = fbm(p*0.03 + 5.), n3 = vn(p*0.9), n4 = vn(p*4.0);
  vec3 green = vec3(0.13,0.19,0.065), gold = vec3(0.42,0.34,0.14), dry = vec3(0.50,0.42,0.22);
  vec3 c = mix(green, gold, smoothstep(0.25,0.75,n1));
  c = mix(c, dry, smoothstep(0.55,0.9,fbm(p*0.0011+7.))*0.55);
  c *= 0.78 + 0.34*n2 + 0.28*(fbm(p*0.009+3.)-0.5) + 0.22*(fbm(vec2(p.x*0.004, p.y*0.06)+9.)-0.5);
  vec3 gc = texture2D(uGround, (p + 512.0)/1024.0).rgb;
  c = mix(c, gc, 1.0 - smoothstep(380., 500., max(abs(p.x), abs(p.y))));
  c *= 1.0 + 0.18*(n3-0.5) + 0.12*(n4-0.5);
  // slopes & altitude: forest, rock
  float alt = vWP.y;
  float forest = smoothstep(60., 220., alt) * (1.0 - smoothstep(520., 800., alt)) * smoothstep(0.35,0.6,fbm(p*0.0018+30.));
  c = mix(c, vec3(0.045,0.085,0.055)*(0.7+0.6*n2), forest*0.8);
  float rock = smoothstep(480., 900., alt + 260.*(n1-0.5));
  c = mix(c, vec3(0.30,0.28,0.26)*(0.7+0.5*n2), rock);
  c = mix(c, vec3(0.75,0.77,0.82), smoothstep(1000., 1250., alt + 120.*(n2-0.5))*0.9);
  // river banks
  float wet = smoothstep(3.0, -3.5, alt);
  c = mix(c, vec3(0.22,0.19,0.12), wet*0.85);
  // plaza / roads
  float pav = 1.0 - smoothstep(58., 62., r);
  vec2 g = fract(p/3.0); float ln = smoothstep(0.035,0.0,min(min(g.x,1.-g.x),min(g.y,1.-g.y)));
  vec3 stone = vec3(0.50,0.47,0.42) * (0.88+0.22*h21(floor(p/3.0))) * (1.0-0.28*ln);
  float ring = smoothstep(0.6,0.0,abs(r-48.0)-0.5) + smoothstep(0.6,0.0,abs(r-53.0)-0.3);
  stone = mix(stone, vec3(0.16,0.15,0.14), clamp(ring,0.,1.)*0.85);
  float fade = 1.0 - smoothstep(60., 78., r + 6.0*(n2-0.5));
  vec3 gravel = mix(c, vec3(0.42,0.38,0.31)*(0.85+0.3*n3), 0.55*fade);
  c = mix(gravel, stone, pav);
  diffuseColor.rgb = c;
}`);
};

export function buildTerrain() {
  const R = 16000, NR = 240, NS = 400;
  const pos = new Float32Array((NR + 1) * NS * 3 + 3);
  let k = 0;
  pos[k++] = 0; pos[k++] = terrainH(0, 0); pos[k++] = 0;
  for (let i = 1; i <= NR; i++) {
    const u = i / NR, r = R * u * u * u + 4 * u;
    for (let j = 0; j < NS; j++) {
      const a = (j / NS) * Math.PI * 2;
      const x = Math.cos(a) * r, z = Math.sin(a) * r;
      pos[k++] = x; pos[k++] = terrainH(x, z); pos[k++] = z;
    }
  }
  const idx = [];
  for (let j = 0; j < NS; j++) idx.push(0, 1 + ((j + 1) % NS), 1 + j);
  for (let i = 1; i < NR; i++) {
    const a = 1 + (i - 1) * NS, b = 1 + i * NS;
    for (let j = 0; j < NS; j++) {
      const j1 = (j + 1) % NS;
      idx.push(a + j, a + j1, b + j, a + j1, b + j1, b + j);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  const m = new THREE.Mesh(g, terrainMat);
  m.receiveShadow = true; m.frustumCulled = false;
  return m;
}

export const grassUniforms = { uTime: { value: 0 } };
// ---------- river ----------
export function buildRiver() {
  const N = 220, X0 = -9000, X1 = 9000;
  const pos = [], idx = [], uv = [];
  for (let i = 0; i <= N; i++) {
    const x = X0 + (X1 - X0) * i / N, z = riverZ(x);
    const dz = (riverZ(x + 5) - z) / 5, l = Math.hypot(1, dz);
    const nx = -dz / l, nz = 1 / l, w = RIVER_W * 0.95;
    pos.push(x + nx * w, -1.1, z + nz * w, x - nx * w, -1.1, z - nz * w);
    uv.push(0, i / 4, 1, i / 4);
    if (i < N) { const a = i * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx); g.computeVertexNormals();
  const mat = new THREE.MeshStandardMaterial({ color: 0x27495a, roughness: 0.03, metalness: 0.0, envMapIntensity: 1.6 });
  mat.onBeforeCompile = (sh) => {
    sh.uniforms.uTime = grassUniforms.uTime;
    sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vRP;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvRP = (modelMatrix*vec4(position,1.0)).xyz;');
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nvarying vec3 vRP; uniform float uTime;')
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
      normal = normalize(normal + 0.05*vec3(sin(vRP.x*0.9+uTime*1.3)*cos(vRP.z*1.3-uTime), 0.0, sin(vRP.z*1.1+vRP.x*0.4+uTime*1.1)));`);
  };
  const m = new THREE.Mesh(g, mat);
  m.frustumCulled = false;
  return m;
}

// ---------- grass (camera-following, wrapped) ----------
export function buildGrass(count = 420000, L = 96) {
  const H = 1;
  const posArr = [], nrm = [];
  const w0 = 0.05;
  const quad = [[-w0, 0], [w0, 0], [-w0 * 0.55, 0.55], [w0, 0], [w0 * 0.55, 0.55], [-w0 * 0.55, 0.55]];
  for (const [x, y] of quad) { posArr.push(x, y, 0); nrm.push(0, 1, 0.35); }
  for (const [x, y] of [[-w0 * 0.55, 0.55], [w0 * 0.55, 0.55], [0, H]]) { posArr.push(x, y, 0); nrm.push(0, 1, 0.35); }
  const geo = new THREE.InstancedBufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(posArr, 3));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(nrm, 3));
  const off = new Float32Array(count * 4);
  let seed = 987654321; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < count; i++) { off[i * 4] = rnd() * L; off[i * 4 + 1] = rnd() * L; off[i * 4 + 2] = rnd() * Math.PI * 2; off[i * 4 + 3] = rnd(); }
  geo.setAttribute('aOff', new THREE.InstancedBufferAttribute(off, 4));
  geo.instanceCount = count;
  const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.85, side: THREE.DoubleSide });
  mat.onBeforeCompile = (sh) => {
    sh.uniforms.uTime = grassUniforms.uTime; sh.uniforms.uHT = { value: groundHeightTex }; sh.uniforms.uGC = { value: groundColorTex };
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', `#include <common>
        attribute vec4 aOff; uniform float uTime; uniform sampler2D uHT; uniform sampler2D uGC;
        varying float vH; varying vec3 vGrassCol;
        float gH(vec2 p){ vec2 q = clamp(p, 0.0, 510.0); vec2 f = fract(q); ivec2 i = ivec2(floor(q));
          float a = texelFetch(uHT, i, 0).r, b = texelFetch(uHT, i+ivec2(1,0), 0).r, c = texelFetch(uHT, i+ivec2(0,1), 0).r, d = texelFetch(uHT, i+ivec2(1,1), 0).r;
          return mix(mix(a,b,f.x), mix(c,d,f.x), f.y); }`)
      .replace('#include <beginnormal_vertex>', `#include <beginnormal_vertex>`)
      .replace('#include <begin_vertex>', `
        vec3 transformed = position;
        vec2 cam = cameraPosition.xz;
        vec2 loc = mod(aOff.xy - cam + ${(L / 2).toFixed(1)}, ${L.toFixed(1)}) - ${(L / 2).toFixed(1)};
        vec2 wxz = cam + loc;
        float gh = gH(wxz * 0.5 + 255.5);   // ground texture is 2 m/texel
        float dcam = length(loc);
        float fade = 1.0 - smoothstep(${(L * 0.30).toFixed(1)}, ${(L * 0.49).toFixed(1)}, dcam);
        fade *= smoothstep(60.0, 70.0, length(wxz));
        fade *= 1.0 - smoothstep(14.0, 48.0, cameraPosition.y - gh);
        fade *= 1.0 - step(500.0, max(abs(wxz.x), abs(wxz.y)));
        float hh = (0.20 + aOff.w * 0.42) * fade;
        vH = position.y;
        float wind = sin(uTime*1.6 + wxz.x*0.045 + wxz.y*0.037) + 0.5*sin(uTime*3.1 + wxz.x*0.21 + wxz.y*0.17);
        float gust = sin(uTime*0.55 + wxz.x*0.006 - wxz.y*0.004);
        float bend = position.y*position.y;
        transformed.y *= hh;
        float sw = (wind*0.10 + gust*0.16) * bend * hh * 1.3;
        transformed.x += sw; transformed.z += sw*0.35 + bend*(aOff.w-0.5)*0.25*hh;
        transformed.x *= (1.0 + aOff.w*0.8) * fade;
        float cs = cos(aOff.z), sn = sin(aOff.z);
        transformed.xz = vec2(cs*transformed.x - sn*transformed.z, sn*transformed.x + cs*transformed.z);
        transformed += vec3(wxz.x, gh - 0.02, wxz.y);
        vGrassCol = texture2D(uGC, (wxz + 512.0)/1024.0).rgb;
        vGrassCol *= 0.75 + 0.5*aOff.w;
      `)
      .replace('#include <project_vertex>', `
        vec4 mvPosition = vec4( transformed, 1.0 );
        mvPosition = modelViewMatrix * mvPosition;
        gl_Position = projectionMatrix * mvPosition;`)
      .replace('#include <worldpos_vertex>', `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
        vec4 worldPosition = modelMatrix * vec4( transformed, 1.0 );
      #endif`);
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying float vH; varying vec3 vGrassCol;')
      .replace('#include <color_fragment>', `#include <color_fragment>
        diffuseColor.rgb = vGrassCol * mix(0.55, 1.35, vH);`);
  };
  const mesh = new THREE.Mesh(geo, mat);
  mesh.receiveShadow = true; mesh.frustumCulled = false;
  return mesh;
}
