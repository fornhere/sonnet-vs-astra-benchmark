import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { S, STATUE_Y, A, rt } from './shape.js';
import { loadStatueGeometries } from './statueLoader.js';

export const monumentUniforms = { uNight: { value: 0 } };

// ---------- stainless steel with panel seams ----------
export function makeSteel() {
  const m = new THREE.MeshStandardMaterial({ color: 0xdedfe0, metalness: 1.0, roughness: 0.34, envMapIntensity: 1.1 });
  m.onBeforeCompile = (sh) => {
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vOP; varying vec3 vON;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvOP = position; vON = normal;');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', `#include <common>
varying vec3 vOP; varying vec3 vON;
float hh(vec2 p){ vec3 p3 = fract(vec3(p.xyx)*.1031); p3 += dot(p3,p3.yzx+33.33); return fract((p3.x+p3.y)*p3.z); }
vec2 panel(vec2 uv, vec2 sz){
  float row = floor(uv.y/sz.y);
  uv.x += mod(row,2.0)*sz.x*0.5;
  vec2 id = floor(uv/sz); vec2 f = fract(uv/sz);
  vec2 e = min(f,1.0-f)*sz;
  float w = max(fwidth(uv.x), fwidth(uv.y))*1.2 + 0.02;
  float line = 1.0 - smoothstep(0.02, w+0.03, min(e.x,e.y));
  return vec2(line, hh(id));
}
`)
      .replace('#include <color_fragment>', `#include <color_fragment>
      vec3 aw = pow(abs(normalize(vON)), vec3(5.0)); aw /= (aw.x+aw.y+aw.z);
      vec2 pa = panel(vOP.zy*vec2(1.0,1.0), vec2(7.0,2.6));
      vec2 pb = panel(vOP.xz, vec2(7.0,2.6));
      vec2 pc = panel(vOP.xy, vec2(7.0,2.6));
      float seam = pa.x*aw.x + pb.x*aw.y + pc.x*aw.z;
      float pid = pa.y*aw.x + pb.y*aw.y + pc.y*aw.z;
      diffuseColor.rgb *= (1.0 - 0.20*seam) * (0.965 + 0.07*pid);`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
      roughnessFactor = clamp(roughnessFactor + seam*0.30 + (pid-0.5)*0.07, 0.06, 1.0);`);
  };
  return m;
}

const gold = () => new THREE.MeshStandardMaterial({ color: 0xffd067, metalness: 0.9, roughness: 0.22, emissive: 0xb86a08, emissiveIntensity: 0.55, envMapIntensity: 1.7 });

function taperTube(curve, r0, r1, segs = 48, radial = 8) {
  const pts = curve.getPoints(segs), pos = [], idx = [];
  const fr = curve.computeFrenetFrames(segs, false);
  for (let i = 0; i <= segs; i++) {
    const t = i / segs, r = r0 + (r1 - r0) * t;
    for (let j = 0; j < radial; j++) {
      const a = (j / radial) * Math.PI * 2;
      const n = fr.normals[i].clone().multiplyScalar(Math.cos(a)).add(fr.binormals[i].clone().multiplyScalar(Math.sin(a)));
      pos.push(pts[i].x + n.x * r, pts[i].y + n.y * r, pts[i].z + n.z * r);
    }
  }
  for (let i = 0; i < segs; i++) for (let j = 0; j < radial; j++) {
    const a = i * radial + j, b = i * radial + (j + 1) % radial, c = a + radial, d = b + radial;
    idx.push(a, c, b, b, c, d);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setIndex(idx); g.computeVertexNormals();
  return g;
}

export async function buildMonument() {
  const root = new THREE.Group();
  const statue = new THREE.Group();
  statue.position.y = STATUE_Y;
  root.add(statue);
  const steel = makeSteel();
  const geos = await loadStatueGeometries();
  for (const g of geos.slice(0, 3)) { const m = new THREE.Mesh(g, steel); m.castShadow = true; m.receiveShadow = true; statue.add(m); }

  // reins (left hand -> bit) & whip (right hand)
  const w = (a) => { a = rt(a); return new THREE.Vector3(a[0] * S, a[1] * S, a[2] * S); };
  const wh = (a) => new THREE.Vector3(a[0] * S, a[1] * S, a[2] * S);
  const reinCurve = new THREE.CatmullRomCurve3([w([0.50, 1.97, -0.22]), wh([0.85, 1.72, -0.16]), wh([1.15, 1.60, -0.10]), wh([1.34, 1.585, -0.05])]);
  const rein = new THREE.Mesh(taperTube(reinCurve, 0.09, 0.06, 40, 6), steel); rein.castShadow = true; statue.add(rein);
  const whipCurve = new THREE.CatmullRomCurve3([w([0.50, 2.02, 0.35]), w([0.62, 2.14, 0.40]), w([0.78, 2.26, 0.45]), w([0.95, 2.29, 0.49]), w([1.08, 2.22, 0.52]), w([1.15, 2.08, 0.53])]);
  const whip = new THREE.Mesh(taperTube(whipCurve, 0.3, 0.07, 60, 10), gold()); whip.castShadow = true; statue.add(whip);
  // knot / tassel at the grip
  const tassel = new THREE.Mesh(new THREE.SphereGeometry(0.33, 14, 14), gold()); tassel.position.copy(w([0.53, 2.03, 0.352])); statue.add(tassel);

  // ---------- pedestal building ----------
  const stone = new THREE.MeshStandardMaterial({ color: 0xcfc6b6, roughness: 0.78, metalness: 0.0 });
  const darkStone = new THREE.MeshStandardMaterial({ color: 0x6d675e, roughness: 0.85 });
  const glass = new THREE.MeshStandardMaterial({ color: 0x0e1a24, roughness: 0.08, metalness: 0.8, emissive: 0xffb45a, emissiveIntensity: 0, envMapIntensity: 1.2 });
  const glassMat = glass;
  // glow band on glass at night
  glassMat.onBeforeCompile = (sh) => {
    sh.uniforms.uNight = monumentUniforms.uNight;
    sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vGP;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvGP = position;');
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nvarying vec3 vGP; uniform float uNight;')
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
      { float a = atan(vGP.z, vGP.x); float win = step(0.35, fract(a*36.0/6.2831853 + 0.5)) * step(fract(a*36.0/6.2831853 + 0.5), 0.95);
        float band = smoothstep(0.5, 1.5, vGP.y) * (1.0 - smoothstep(6.8, 7.4, vGP.y));
        totalEmissiveRadiance += vec3(1.0,0.66,0.34) * win * band * uNight * 2.2; }`);
  };
  const base = new THREE.Group(); root.add(base);
  const add = (geo, mat, x = 0, y = 0, z = 0, cast = true) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = cast; m.receiveShadow = true; base.add(m); return m; };
  // ring steps
  const radii = [40, 37.8, 35.6, 33.4, 31.2];
  radii.forEach((r, i) => add(new THREE.CylinderGeometry(r, r + 0.2, 0.26, 96), i % 2 ? stone : darkStone, 0, 0.13 + i * 0.24, 0, false).scale.set(1, 1, 1));
  const y0 = 1.3;
  // drum / glass wall
  add(new THREE.CylinderGeometry(27.0, 27.0, 8.3, 96, 1, true), glass, 0, y0 + 4.15);
  add(new THREE.CylinderGeometry(27.0, 27.0, 0.6, 96), darkStone, 0, y0 + 0.3);
  // columns
  const colGeo = new THREE.CylinderGeometry(0.85, 0.95, 8.4, 20);
  const capGeo = new THREE.CylinderGeometry(1.25, 1.1, 0.5, 20), baseGeo = new THREE.CylinderGeometry(1.15, 1.3, 0.5, 20);
  const cols = new THREE.InstancedMesh(colGeo, stone, 36), caps = new THREE.InstancedMesh(capGeo, stone, 36), bases = new THREE.InstancedMesh(baseGeo, stone, 36);
  const mm = new THREE.Matrix4();
  for (let i = 0; i < 36; i++) {
    const a = (i / 36) * Math.PI * 2, x = Math.cos(a) * 29.2, z = Math.sin(a) * 29.2;
    cols.setMatrixAt(i, mm.makeTranslation(x, y0 + 4.2, z)); caps.setMatrixAt(i, mm.makeTranslation(x, y0 + 8.65, z)); bases.setMatrixAt(i, mm.makeTranslation(x, y0 + 0.25, z));
  }
  for (const m of [cols, caps, bases]) { m.castShadow = true; m.receiveShadow = true; base.add(m); }
  // roof slab with parapet
  add(new THREE.CylinderGeometry(31.4, 31.4, 1.1, 96), stone, 0, y0 + 9.3);
  add(new THREE.CylinderGeometry(31.9, 31.9, 0.35, 96), darkStone, 0, y0 + 8.75);
  const parapet = add(new THREE.TorusGeometry(31.3, 0.3, 8, 128), stone, 0, y0 + 10.05, 0);
  parapet.rotation.x = Math.PI / 2;
  // roof deck disc + inner plinth for the horse
  add(new THREE.CylinderGeometry(30.2, 30.2, 0.2, 96), new THREE.MeshStandardMaterial({ color: 0x8a8378, roughness: 0.7 }), 0, y0 + 9.75);
  const plinth = add(new THREE.CylinderGeometry(24.0, 25.0, 0.4, 96), new THREE.MeshStandardMaterial({ color: 0x9a9385, roughness: 0.6, metalness: 0.15 }), 0, y0 + 9.95);
  // grand staircase facing east
  for (let i = 0; i < 8; i++) add(new THREE.BoxGeometry(2.4, 0.3 + i * 0.16, 26 - i * 0.6), stone, 41.4 + i * 2.3 - 0.0, (0.3 + i * 0.16) / 2 - 0.0, 0, false);
  // flagpole ring on roof edge
  const pole = new THREE.CylinderGeometry(0.06, 0.09, 8, 6), flagGeo = new THREE.PlaneGeometry(1.9, 1.05, 8, 1);
  const poles = new THREE.InstancedMesh(pole, new THREE.MeshStandardMaterial({ color: 0xc9ccd2, metalness: 1, roughness: 0.3 }), 18);
  const flags = [];
  const flagMat = new THREE.MeshStandardMaterial({ color: 0x2a55b0, side: THREE.DoubleSide, roughness: 0.8 });
  for (let i = 0; i < 18; i++) {
    const a = (i / 18) * Math.PI * 2 + 0.05, x = Math.cos(a) * 30.6, z = Math.sin(a) * 30.6;
    poles.setMatrixAt(i, mm.makeTranslation(x, y0 + 10.3 + 4, z));
    const f = new THREE.Mesh(flagGeo, i % 3 === 0 ? new THREE.MeshStandardMaterial({ color: 0xcf2027, side: THREE.DoubleSide, roughness: 0.8 }) : flagMat);
    f.position.set(x, y0 + 10.3 + 7.0, z); f.rotation.y = -a + Math.PI / 2 * 0; f.userData.a = a; f.userData.i = i; base.add(f); flags.push(f);
  }
  base.add(poles);

  // lamp posts around plaza
  const lampG = new THREE.CylinderGeometry(0.1, 0.14, 7, 6), headG = new THREE.SphereGeometry(0.45, 10, 8);
  const lampPost = new THREE.InstancedMesh(lampG, darkStone, 28), lampHead = new THREE.InstancedMesh(headG, new THREE.MeshBasicMaterial({ color: new THREE.Color(1.0, 0.75, 0.4).multiplyScalar(0.25) }), 28);
  for (let i = 0; i < 28; i++) {
    const a = (i / 28) * Math.PI * 2, x = Math.cos(a) * 55, z = Math.sin(a) * 55;
    lampPost.setMatrixAt(i, mm.makeTranslation(x, 3.5, z)); lampHead.setMatrixAt(i, mm.makeTranslation(x, 7.2, z));
  }
  root.add(lampPost, lampHead);

  // ---------- night uplights ----------
  const spots = [];
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 + 0.3;
    const s = new THREE.SpotLight(0xffd7a0, 0, 160, 0.42, 0.7, 1.2);
    s.position.set(Math.cos(a) * 34, y0 + 10.6, Math.sin(a) * 34);
    s.target.position.set(Math.cos(a) * 3, 30, Math.sin(a) * 3);
    root.add(s, s.target); spots.push(s);
  }
  // lamp head glow reference for night
  const update = (t, night) => {
    monumentUniforms.uNight.value = night;
    lampHead.material.color.setRGB(1.0, 0.75, 0.4).multiplyScalar(0.25 + night * 2.2);
    for (const s of spots) s.intensity = night * 130;
    for (const f of flags) {
      const p = f.geometry.attributes.position; const a0 = f.userData.a;
      if (!f.userData.orig) f.userData.orig = p.array.slice();
      const o = f.userData.orig;
      for (let i = 0; i < p.count; i++) {
        const u = (o[i * 3] + 0.95) / 1.9;
        p.array[i * 3 + 2] = Math.sin(t * 3.2 - u * 5 + f.userData.i) * 0.28 * u;
      }
      p.needsUpdate = true;
    }
    whip.material.emissiveIntensity = 0.5 + 0.15 * Math.sin(t * 2.0);
  };
  for (const f of flags) { f.geometry = f.geometry.clone(); f.rotation.y = -f.userData.a; f.position.x += 1.3 * Math.sin(f.userData.a) * -1; f.position.z += 1.3 * Math.cos(f.userData.a); }
  return { root, statue, update, steel, whip, spots, herdGeo: geos[3] };
}
