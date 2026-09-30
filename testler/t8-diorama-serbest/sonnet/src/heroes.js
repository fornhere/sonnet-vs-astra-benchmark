import * as THREE from 'three';
import { M } from './palette.js';
import { H, GROUND, K } from './world.js';
import { placeModel, footprintAt, buildEmpireState, buildChrysler, buildOneWTC, buildLiberty, buildVessel } from './hero.js';
import { D } from './dims.js';
import { buildBridge } from './bridges.js';

export function landmarkWorld(pts, k) { const p = pts[k]; return [p[0], D - p[1]]; }

function clearOwn(world, fp) {
  const { W, vox, kind, hgt, bid } = world;
  for (let z = fp.z0; z < fp.z1; z++) for (let x = fp.x0; x < fp.x1; x++) { const c = z * W + x; if (kind[c] === K.BLD && bid[c] === fp.bid) { const b = H * (x + W * z); for (let y = GROUND; y < H; y++) vox[b + y] = 0; hgt[c] = 0; } }
}
// şehir grid'i üzerinde hero yerleştir (mesh oluşturmadan önce çağır)
export function prepareHeroes(world, pts) {
  const out = [];
  const use = (key, build, tag) => { const [x, z] = landmarkWorld(pts, key); const fp = footprintAt(world, x, z); clearOwn(world, fp); out.push({ key, build, fp, tag, x, z }); };
  use('esb', buildEmpireState, 'esb'); use('chrysler', buildChrysler, 'chrysler'); use('wtc', buildOneWTC, 'wtc');
  // Times Meydanı panoları
  { const [tx, tz] = landmarkWorld(pts, 'timessq'); const { W, vox, kind, hgt } = world;
    for (let z = Math.floor(tz) - 8; z <= Math.floor(tz) + 6; z++) for (let x = Math.floor(tx) - 6; x <= Math.floor(tx) + 6; x++) { const c = z * W + x; if (kind[c] !== K.BLD) continue; const b = H * (x + W * z); const hh = hgt[c];
      for (let y = GROUND + 2; y < GROUND + Math.min(hh, 12); y++) if (vox[b + y] && ((x * 7 + z * 13 + y) % 5) !== 0) vox[b + y] = M.TIMES; } }
  // Liberty Adası: heykelin çevresindeki ham bina hacimlerini temizle
  { const [lx, lz] = landmarkWorld(pts, 'liberty'); const { W, vox, kind, hgt } = world; for (let z = Math.floor(lz) - 6; z <= Math.floor(lz) + 6; z++) for (let x = Math.floor(lx) - 6; x <= Math.floor(lx) + 6; x++) { if (Math.hypot(x - lx, z - lz) > 6.5) continue; const c = z * W + x; if (kind[c] === K.BLD) { const b = H * (x + W * z); for (let y = GROUND; y < H; y++) vox[b + y] = 0; hgt[c] = 0; } } }
  // Flatiron
  { const [fx, fz] = landmarkWorld(pts, 'flatiron'); const fp = footprintAt(world, fx, fz); const { W, vox, kind, bid } = world;
    for (let z = fp.z0; z < fp.z1; z++) for (let x = fp.x0; x < fp.x1; x++) { const c = z * W + x; if (kind[c] === K.BLD && bid[c] === fp.bid) { const b = H * (x + W * z); for (let y = GROUND; y < H; y++) if (vox[b + y]) vox[b + y] = M.CREAM; } } }
  return out;
}
export function placeHeroModels(list, mats, parent, pts, extra = {}) {
  for (const h of list) { const m = h.build(); const sc = m.scale; const cxm = m.W / 2 * sc, czm = m.D / 2 * sc; placeModel(m, mats, parent, h.fp.cx - cxm, GROUND, h.fp.cz - czm); }
  const [lx, lz] = landmarkWorld(pts, 'liberty'); { const m = buildLiberty(); placeModel(m, mats, parent, lx - m.W / 2 * m.scale, GROUND, lz - m.D / 2 * m.scale); }
  const [vx, vz] = landmarkWorld(pts, 'vessel'); { const m = buildVessel(); placeModel(m, mats, parent, vx - m.W / 2 * m.scale, GROUND, vz - m.D / 2 * m.scale); }
}

export function placeBridges(world, pts, mats, parent) {
  const P = (fx, fn) => [fx, D - fn];
  const out = [];
  out.push(buildBridge(world, { name: 'Brooklyn Köprüsü', type: 'brooklyn', A: P(283, 254), B: P(374, 226), deckW: 8, deckY: 13.4 }, parent, mats));
  out.push(buildBridge(world, { name: 'Manhattan Köprüsü', type: 'steelsusp', A: landmarkWorld(pts, 'mbr_m'), B: landmarkWorld(pts, 'mbr_b'), deckW: 9, deckY: 13.8 }, parent, mats));
  out.push(buildBridge(world, { name: 'Williamsburg Köprüsü', type: 'steelsusp', A: P(345, 340), B: P(404, 350), deckW: 9, deckY: 14 }, parent, mats));
  out.push(buildBridge(world, { name: 'Queensboro Köprüsü', type: 'cantilever', A: P(303, 658), B: P(404, 656), deckW: 9, deckY: 13.2 }, parent, mats));
  return out;
}
