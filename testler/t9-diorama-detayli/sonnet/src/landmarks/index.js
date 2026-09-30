// Simgeler: konumlandırma, mesh üretimi, tanım/Türkçe bilgi kartları, kamera uçuş noktaları
import * as THREE from 'three';
import { meshGrid } from '../voxel.js';
import { makeLandmarkPalette } from './util.js';
import { empireState, chrysler, oneWTC, flatiron, rockefeller } from './towers.js';
import { statueOfLiberty, grandCentral, rockPlaza, timesSquare } from './civic.js';
import { suspensionBridge } from './bridge.js';
import { W, H, llToCell } from '../geo.js';

const centroid = (ring) => [ring.reduce((s, p) => s + p[0], 0) / ring.length, ring.reduce((s, p) => s + p[1], 0) / ring.length];
const BASE_Y = 1; // kara üst yüzeyi (dünya y)

export const LANDMARKS = [
  { key: 'liberty', name: 'Özgürlük Heykeli', info: 'Fransa\'nın 1886\'da armağan ettiği bakır heykel; Liberty Adası\'nda, New York Limanı\'na gelenleri meşalesiyle karşılar.' },
  { key: 'wtc', name: 'One World Trade Center', info: '541 m ile Batı Yarımküre\'nin en yüksek gökdeleni; 11 Eylül anıtının hemen yanında, Aşağı Manhattan\'ın tepesinde parlar.' },
  { key: 'brooklyn', name: 'Brooklyn Köprüsü', info: '1883\'te açılan, çelik telli ilk büyük asma köprü; granit gotik kuleleri ve yelpaze gibi açılan halatlarıyla East River\'ı geçer.' },
  { key: 'flatiron', name: 'Flatiron Binası', info: '1902\'de 5. Cadde ile Broadway\'in kesiştiği köşede yükselen, ütüyü andıran üçgen planlı ilk çelik iskeletli gökdelenlerden.' },
  { key: 'esb', name: 'Empire State Building', info: '1931\'de tamamlanan 443 m\'lik Art Deco gökdelen; 102 katıyla kırk yıl boyunca dünyanın en yüksek binasıydı.' },
  { key: 'times', name: 'Times Square', info: 'Broadway ile 7. Cadde\'nin kesiştiği, gece gündüz yanan dev LED panolarıyla \'dünyanın kavşağı\' denen meydan.' },
  { key: 'gct', name: 'Grand Central Terminal', info: '1913\'te açılan Beaux-Arts tren garı; yıldızlı tavanlı ana holü ve bakır mansard çatısıyla Midtown\'un simgesi.' },
  { key: 'chrysler', name: 'Chrysler Building', info: '1930\'da tamamlanan Art Deco gökdelen; paslanmaz çelik, güneş ışını desenli kademeli tacı ve iğnesiyle tanınır.' },
  { key: 'rock', name: 'Rockefeller Center', info: '30 Rockefeller Plaza\'nın Art Deco kulesi ve çevresindeki kompleks; kış aylarındaki buz pisti ve dev Noel ağacıyla ünlü.' },
  { key: 'park', name: 'Central Park', info: 'Manhattan\'ın ortasında 341 hektarlık kentsel park; rezervuar, göl, geniş çayırlar ve binlerce ağaçla şehrin yeşil kalbi.' },
];

// Planlama: bina temizleme maskesi (world.clear: 1=boş, 2=plaza) + yerleşim bilgisi
export function planLandmarks(world) {
  const F = world.meta.footprints; const pos = {};
  pos.esb = centroid(F.esb.ring); pos.chrysler = centroid(F.chrysler.ring); pos.wtc = centroid(F.wtc.ring); pos.flatiron = centroid(F.flatiron.ring);
  pos.gct = centroid(F.gct.ring); pos.liberty = centroid(F.liberty.ring); pos.times = llToCell(40.7580, -73.9855); pos.rock = llToCell(40.7587, -73.9787);
  // Köprü OSM'de kapalı alan: en uzak iki uç ve çevresi ortalanarak eksen bulunur
  const R = F.brooklynMain.ring; let bi = 0, bj = 1, bd = -1;
  for (let i = 0; i < R.length; i++) for (let j = i + 1; j < R.length; j++) { const d = Math.hypot(R[i][0] - R[j][0], R[i][1] - R[j][1]); if (d > bd) { bd = d; bi = i; bj = j; } }
  const endAvg = (c) => { const near = R.filter((p) => Math.hypot(p[0] - c[0], p[1] - c[1]) < 2.5); return [near.reduce((s, p) => s + p[0], 0) / near.length, near.reduce((s, p) => s + p[1], 0) / near.length]; };
  let a = endAvg(R[bi]), b = endAvg(R[bj]); if (a[0] > b[0]) [a, b] = [b, a];
  pos.bkA = a; pos.bkB = b;
  const clr = (cx, cz, hw, hd, v = 1) => { for (let z = Math.floor(cz - hd); z <= Math.ceil(cz + hd); z++) for (let x = Math.floor(cx - hw); x <= Math.ceil(cx + hw); x++) if (x >= 0 && z >= 0 && x < W && z < H) world.clear[z * W + x] = Math.max(world.clear[z * W + x], v); };
  clr(...pos.flatiron, 2.4, 3.3, 2); clr(...pos.esb, 5.4, 2.7, 2); clr(...pos.chrysler, 2.9, 2.9, 2); clr(...pos.wtc, 2.7, 2.7, 2); clr(pos.wtc[0] + 4.5, pos.wtc[1] + 3, 3, 4, 2);
  clr(...pos.gct, 4.6, 3.9, 2); clr(pos.rock[0] + 0.3, pos.rock[1], 2.4, 1.8, 2); clr(pos.rock[0] + 4.2, pos.rock[1] + 0.2, 2.4, 1.6, 2);
  // Liberty Adası: çim + yol yok
  for (let z = Math.floor(pos.liberty[1] - 9); z <= Math.ceil(pos.liberty[1] + 9); z++) for (let x = Math.floor(pos.liberty[0] - 9); x <= Math.ceil(pos.liberty[0] + 9); x++) { if (x < 0 || z < 0 || x >= W || z >= H) continue; const i = z * W + x; if (world.land[i] && Math.hypot(x - pos.liberty[0], z - pos.liberty[1]) < 8.5) { world.clear[i] = 3; if (world.road[i]) world.road[i] = 0; } }
  // köprü koridoru
  const n = 120; for (let i = 0; i <= n; i++) { const t = i / n; const x = a[0] + (b[0] - a[0]) * t, z = a[1] + (b[1] - a[1]) * t; clr(x, z, 1.3, 1.3, 1); }
  return pos;
}

export function buildLandmarks(world, bld, material, pos) {
  const P = makeLandmarkPalette(); const group = new THREE.Group(); group.name = 'landmarks';
  const F = world.meta.footprints; const items = {};
  let faces = 0, quads = 0;
  const add = (key, res, cx, cz, { rotY = 0, s, y = BASE_Y } = {}) => {
    const m = res.m; const out = meshGrid(m.g, P, { size: m.s, origin: [-m.nx * m.s / 2, 0, -m.nz * m.s / 2], skipBottom: false });
    const mesh = new THREE.Mesh(out.geometry, material); mesh.castShadow = true; mesh.receiveShadow = true; mesh.name = 'lm-' + key;
    mesh.position.set(cx, y, cz); mesh.rotation.y = rotY; group.add(mesh); faces += out.faces; quads += out.quads;
    items[key] = { mesh, faces: out.faces, size: [m.nx * m.s, m.ny * m.s, m.nz * m.s] };
    return mesh;
  };
  add('esb', empireState(P), ...pos.esb); add('chrysler', chrysler(P), ...pos.chrysler); add('wtc', oneWTC(P), ...pos.wtc);
  // Flatiron: OSM halkasını merkeze göre kaydır
  const fr = F.flatiron.ring.map(([x, z]) => [x - pos.flatiron[0], z - pos.flatiron[1]]);
  add('flatiron', flatiron(P, fr), ...pos.flatiron);
  add('gct', grandCentral(P), ...pos.gct); const rk = rockefeller(P); add('rock', rk, pos.rock[0] - 0.5, pos.rock[1]);
  add('rockplaza', rockPlaza(P), pos.rock[0] + 4.2, pos.rock[1] + 0.2);
  const liberty = statueOfLiberty(P); add('liberty', liberty, ...pos.liberty, { rotY: liberty.rotY });
  const hAt = (x, z) => (x < 0 || z < 0 || x >= W || z >= H ? 0 : bld.hv[z * W + x]) + 1;
  add('times', timesSquare(P, hAt, ...pos.times), ...pos.times);
  // Brooklyn Köprüsü
  { const a = pos.bkA, b = pos.bkB; const L = Math.hypot(b[0] - a[0], b[1] - a[1]); const ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
    // su kesişimi: eksen boyunca deniz hücrelerinin ilk/son indeksi
    let wa = null, wb = null; for (let i = 0; i <= 400; i++) { const t = i / 400; const x = Math.floor(a[0] + (b[0] - a[0]) * t), z = Math.floor(a[1] + (b[1] - a[1]) * t); const water = !world.land[z * W + x]; if (water) { if (wa === null) wa = t * L; wb = t * L; } }
    if (wa === null) { wa = L * 0.3; wb = L * 0.7; }
    const res = suspensionBridge(P, { L, waterA: wa - L / 2, waterB: wb - L / 2, style: 'stone' });
    const mesh = add('brooklyn', res, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2, { rotY: -ang });
    items.brooklyn.axis = { a, b, ang, L, towers: res.towers };
  }
  return { group, items, faces, quads, palette: P };
}
