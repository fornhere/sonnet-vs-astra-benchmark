// Arazi: kaide kesiti (kaya/toprak/su katmanları), kıyı, yollar, parklar, gölet, iskele + binaların voxel sütunları.
import * as THREE from 'three';
import { VoxelGrid, meshGrid } from './voxel.js';
import { W, H } from './geo.js';
import { D, GROUND } from './world.js';
import { fbm, hash2, SEED } from './rng.js';
import { MAX_H } from './buildings.js';

export function buildTerrain(world, P, bld, material) {
  const { land, road, park, wdist, ldist } = world;
  const NY = D + 1 + MAX_H + 1;
  const g = new VoxelGrid(W, NY, H);
  const id = (n) => P.id(n);
  const rock = ['rock0', 'rock1', 'rock2', 'bedrock'].map(id), clay = ['clay', 'clay2', 'soil'].map(id);
  const topY = new Uint8Array(W * H);   // yüzey üst yi (üzerindeki ilk boş voxel indeksi)
  const grassP = ['grass0', 'grass1', 'grass2'].map(id);
  const asphalt = id('asphalt'), asphalt2 = id('asphalt2'), highway = id('highway'), walk = id('walk'), walk2 = id('walk2'), quay = id('quay'), plaza = id('plaza');
  const pond = id('pond'), pier = id('pier'), forest = id('forest'), watercol = id('watercol');
  const topsoil = id('topsoil'), silt = id('silt'), gravel = id('gravel');
  for (let r = 0; r < H; r++) for (let c = 0; c < W; c++) {
    const i = r * W + c;
    const n1 = fbm(c * 0.06, r * 0.06, SEED + 11), n2 = fbm(c * 0.13 + 50, r * 0.13, SEED + 12);
    const isLand = land[i] === 1 && park[i] !== 4;
    const isPier = park[i] === 4;
    if (!isLand) {
      // deniz (ya da iskele altı): kaya + silt + su sütunu
      const dw = Math.min(4, 1 + Math.floor(wdist[i] / 3));
      const sb = D - dw;                       // katı yükseklik (voxel sayısı)
      const rt = Math.min(sb - 1, 2 + Math.floor(n1 * 2.5));
      for (let y = 0; y < sb; y++) g.set(c, y, r, y < rt ? rock[(y + (n2 > 0.5 ? 1 : 0)) % 3] : (y === sb - 1 ? silt : (y < sb - 2 ? gravel : silt)));
      for (let y = sb; y < D; y++) g.set(c, y, r, watercol);
      if (isPier) { g.set(c, D, r, pier); topY[i] = D + 1; }
      else topY[i] = 0;
      continue;
    }
    // kara sütunu
    const rockTop = 3 + Math.floor(n1 * 3);
    for (let y = 0; y < D; y++) {
      let v;
      if (y < rockTop) v = rock[(y + (n2 > 0.55 ? 1 : 0) + (n1 > 0.6 ? 2 : 0)) % 4];
      else if (y < rockTop + 2) v = (y + (n2 > 0.5 ? 1 : 0)) % 2 ? gravel : clay[1];
      else if (y < D - 2) v = clay[(y + (n2 > 0.5 ? 1 : 0)) % 3];
      else v = topsoil;
      g.set(c, y, r, v);
    }
    let surf;
    const pk = park[i];
    if (pk === 3) { g.set(c, D - 1, r, pond); topY[i] = D; continue; }
    if (world.clear[i] === 3) surf = grassP[1];
    else if (road[i]) surf = road[i] === 3 ? highway : (hash2(c >> 1, r >> 1, SEED) > 0.5 ? asphalt : asphalt2);
    else if (pk === 1) surf = grassP[Math.floor(fbm(c * 0.11, r * 0.11, SEED + 5) * 3.4) % 3];
    else if (pk === 2) surf = forest;
    else if (bld.hv[i]) surf = walk;
    else if (world.clear[i] === 2) surf = plaza;
    else surf = (c + r) % 5 === 0 ? walk2 : (hash2(c, r, SEED) > 0.55 ? walk : walk2);
    if (ldist[i] === 1 && !road[i] && pk !== 1 && pk !== 2) surf = quay;
    g.set(c, D, r, surf);
    let top = D + 1;
    if ((pk === 1 || pk === 2) && !road[i]) {
      const hill = fbm(c * 0.085, r * 0.085, SEED + 9);
      const extra = hill > 0.66 ? 2 : hill > 0.57 ? 1 : 0;
      for (let k = 0; k < extra; k++) { g.set(c, D + 1 + k, r, pk === 2 ? forest : surf); top++; }
    }
    const h = bld.hv[i];
    if (h && !road[i]) {
      const wallId = bld.wall[i];
      const ledId = bld.sign[i] ? id('ledwall') : 0;
      for (let k = 0; k < h; k++) g.set(c, D + 1 + k, r, k === h - 1 ? bld.roof[i] : (ledId && k >= 1 ? ledId : wallId));
      top = D + 1 + h;
    }
    topY[i] = top;
  }
  const t0 = performance.now();
  const res = meshGrid(g, P, { origin: [0, -D, 0], size: 1, skipBottom: true });
  res.geometry.name = 'city';
  const mesh = new THREE.Mesh(res.geometry, material);
  mesh.castShadow = true; mesh.receiveShadow = true; mesh.name = 'city';
  return { mesh, faces: res.faces, quads: res.quads, byDir: res.byDir, topY, grid: g, meshMs: performance.now() - t0 };
}
