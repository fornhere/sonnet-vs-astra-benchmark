// Ağaçlar (rüzgârda hafif sallanan, örnekli voxel ağaçlar) ve gece sokak lambaları (nokta ışıklar)
import * as THREE from 'three';
import { Palette, meshBoxes, KIND } from './voxel.js';
import { W, H } from './geo.js';
import { GROUND, D } from './world.js';
import { hash2, mulberry32, SEED } from './rng.js';
import { U } from './materials.js';

function treeGeometry() {
  const P = new Palette();
  const trunk = P.add('trunk', 0x6a4a2e), leaf = P.add('leaf', 0xffffff, { kind: KIND.CANVAS });
  return meshBoxes([{ p: [0, 0, 0], s: [0.16, 0.24, 0.16], pal: trunk, cell: 0.16 }, { p: [0, 0.2, 0], s: [0.56, 0.5, 0.56], pal: leaf, cell: 0.28 }], P);
}

export function buildTrees(world, topY, swayMaterial, quality) {
  const { park, road } = world; const { geometry, faces: perTree } = treeGeometry();
  const list = [];
  const dens = quality === 'low' ? 0.6 : 1;
  for (let r = 0; r < H; r++) for (let c = 0; c < W; c++) {
    const i = r * W + c; const pk = park[i]; if (!(pk === 1 || pk === 2) || road[i]) continue;
    const n = pk === 2 ? (hash2(c, r, SEED + 3) < 0.7 * dens ? 1 : 0) : (hash2(c, r, SEED + 4) < 0.21 * dens ? 1 : 0);
    for (let k = 0; k < n; k++) {
      const x = c + 0.15 + hash2(c, r, SEED + 5 + k) * 0.7, z = r + 0.15 + hash2(c, r, SEED + 9 + k) * 0.7;
      list.push([x, topY[i] - D, z, 0.75 + hash2(c, r, SEED + 21) * 0.7, hash2(c, r, SEED + 33)]);
    }
  }
  // Liberty/Governors/piyade: küçük ekstra ağaç yok. Yalnızca park hücreleri.
  const mesh = new THREE.InstancedMesh(geometry, swayMaterial, list.length);
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3(), col = new THREE.Color();
  const greens = ['#5f9d45', '#4f8f3d', '#78ab4a', '#3f7f38', '#86b04e', '#5b9a55'];
  list.forEach(([x, y, z, s, rr], i) => {
    q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), rr * 6.28); sc.set(s, s * (0.9 + rr * 0.4), s);
    m4.compose(new THREE.Vector3(x, y, z), q, sc); mesh.setMatrixAt(i, m4);
    let hx = greens[Math.floor(rr * greens.length) % greens.length];
    if (rr > 0.93) hx = '#d98c2f'; else if (rr > 0.88) hx = '#c9b23c';         // birkaç sonbahar ağacı
    col.set(hx); mesh.setColorAt(i, col);
  });
  mesh.castShadow = true; mesh.receiveShadow = true; mesh.frustumCulled = false; mesh.name = 'trees';
  return { mesh, count: list.length, faces: list.length * perTree, perTree };
}

// Sokak lambaları: yol hücrelerinin kenarında, nokta sprite (gece parlar)
export function buildLamps(world, quality) {
  const { road, land, bh } = world; const pts = [];
  for (let r = 1; r < H - 1; r++) for (let c = 1; c < W - 1; c++) {
    const i = r * W + c; if (!road[i] || road[i] === 3) continue;
    if ((c * 7 + r * 13 + (hash2(c, r, SEED + 40) < 0.5 ? 1 : 0)) % 3 !== 0) continue;
    // sağ/sol kenar: komşu yol olmayan yönde
    const opts = [];
    if (!road[i - 1]) opts.push([0.08, 0.5]); if (!road[i + 1]) opts.push([0.92, 0.5]); if (!road[i - W]) opts.push([0.5, 0.08]); if (!road[i + W]) opts.push([0.5, 0.92]);
    if (!opts.length) continue; const o = opts[Math.floor(hash2(c, r, SEED + 41) * opts.length)];
    pts.push(c + o[0], GROUND + 0.34, r + o[1]);
  }
  if (quality === 'low') { const a = []; for (let i = 0; i < pts.length; i += 6) a.push(pts[i], pts[i + 1], pts[i + 2]); pts.length = 0; pts.push(...a); }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
  const m = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { uNight: U.uNight, uPx: { value: 1 }, uScale: { value: 1 } },
    vertexShader: `uniform float uNight, uPx; varying float vA; void main(){ vec4 mv = modelViewMatrix*vec4(position,1.0); gl_Position = projectionMatrix*mv; float d = -mv.z; gl_PointSize = clamp(uPx*(46.0/ d)*14.0, 1.5, 22.0); vA = smoothstep(0.25,0.7,uNight); }`,
    fragmentShader: `varying float vA; void main(){ vec2 p = gl_PointCoord-0.5; float d = max(abs(p.x),abs(p.y)); float a = smoothstep(0.5,0.0,d); a = a*a; vec3 c = vec3(1.0,0.78,0.42)*(0.9+ a*1.6); gl_FragColor = vec4(c*a*vA, a*vA); }`,
  });
  const pointsObj = new THREE.Points(g, m); pointsObj.frustumCulled = false; pointsObj.name = 'lamps'; pointsObj.userData.noAO = true;
  return { mesh: pointsObj, count: pts.length / 3, mat: m };
}
