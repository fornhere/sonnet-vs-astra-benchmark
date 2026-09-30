import fs from 'fs';
import { W, D, toVox, V } from './frame.mjs';
import { SS, FW, FD, landMask, bresenham } from './bake1.mjs';
import { writePNG } from './png.mjs';
const EX = V / 9.5;   // dikey abartı: 1 voxel yükseklik = 9.5 m
const hash = n => { n = (n ^ 61) ^ (n >>> 16); n = (n + (n << 3)) | 0; n ^= n >>> 4; n = Math.imul(n, 0x27d4eb2d); n ^= n >>> 15; return (n >>> 0) / 4294967296; };

// ---- yardımcı: çokgen doldurma (even-odd) ince ızgarada
function fillRings(rings, cb) {
  let ymin = 1e9, ymax = -1e9; const edges = [];
  for (const r of rings) for (let i = 0; i < r.length; i++) { const a = r[i], b = r[(i + 1) % r.length]; if (a[1] === b[1]) continue; edges.push(a[1] < b[1] ? [a[0], a[1], b[0], b[1]] : [b[0], b[1], a[0], a[1]]); ymin = Math.min(ymin, a[1]); ymax = Math.max(ymax, a[1]); }
  ymin = Math.max(0, Math.floor(ymin)); ymax = Math.min(FD - 1, Math.ceil(ymax));
  for (let y = ymin; y <= ymax; y++) { const yc = y + 0.5; const xs = [];
    for (const e of edges) if (yc >= e[1] && yc < e[3]) xs.push(e[0] + (yc - e[1]) / (e[3] - e[1]) * (e[2] - e[0]));
    xs.sort((a, b) => a - b);
    for (let k = 0; k + 1 < xs.length; k += 2) { const x0 = Math.max(0, Math.ceil(xs[k] - 0.5)), x1 = Math.min(FW - 1, Math.floor(xs[k + 1] - 0.5)); for (let x = x0; x <= x1; x++) cb(x, y); } }
}
const toFine = pts => pts.map(p => { const [a, b] = toVox(p[0], p[1]); return [a * SS, b * SS]; });
const inGrid = rings => rings.some(r => r.some(p => p[0] > -50 && p[0] < FW + 50 && p[1] > -50 && p[1] < FD + 50));

// ---- kara maskesi
const fineLand = landMask();
// ---- binalar (NYC)
const bidF = new Int32Array(FW * FD); const bHt = [0], bYear = [0], bCode = [0];
function addBuilding(rings, hM, year, code) {
  const id = bHt.length; bHt.push(hM); bYear.push(year); bCode.push(code);
  const fr = rings.map(toFine); if (!inGrid(fr)) { bHt.pop(); bYear.pop(); bCode.pop(); return; }
  fillRings(fr, (x, y) => { const i = y * FW + x; const o = bidF[i]; if (!o || bHt[o] < hM) bidF[i] = id; });
}
{ const B = JSON.parse(fs.readFileSync('data/raw/nyc_buildings.json'));
  for (const b of B) { if (!b.the_geom) continue; const h = (+b.height_roof || 0) * 0.3048; const code = +b.feature_code || 2100;
    for (const poly of b.the_geom.coordinates) addBuilding(poly, h, +b.construction_year || 0, code); } }
// ---- NJ (OSM)
const njMaxLon = -74.0;
{ const J = JSON.parse(fs.readFileSync('data/raw/nj_buildings.json')).elements;
  for (const w of J) { if (!w.geometry || w.geometry.length < 4) continue; const lon0 = w.geometry[0].lon; if (lon0 > -74.0075) continue; // yalnız Hudson'ın batısı
    const t = w.tags || {}; let h = parseFloat(t.height) || (parseFloat(t['building:levels']) || 0) * 3.4 || 0;
    if (!h) { const l = t.building; h = (l === 'house' || l === 'detached' || l === 'residential') ? 9 : (l === 'apartments' || l === 'commercial' || l === 'office') ? 22 : 11; }
    addBuilding([w.geometry.map(p => [p.lon, p.lat])], h, +t['start_date'] || 0, 2100); } }
console.error('buildings', bHt.length);

// ---- OSM: parklar, göletler, iskeleler
const P = JSON.parse(fs.readFileSync('data/raw/parks.json')).elements;
function joinRings(ways) { // uçları birleştir
  const segs = ways.filter(w => w.length > 1).map(w => w.slice()); const rings = [];
  while (segs.length) { let cur = segs.pop(); let grew = true;
    while (grew && (cur[0].lat !== cur.at(-1).lat || cur[0].lon !== cur.at(-1).lon)) { grew = false;
      for (let i = 0; i < segs.length; i++) { const s = segs[i]; const eq = (a, b) => a.lat === b.lat && a.lon === b.lon;
        if (eq(cur.at(-1), s[0])) { cur = cur.concat(s.slice(1)); segs.splice(i, 1); grew = true; break }
        if (eq(cur.at(-1), s.at(-1))) { cur = cur.concat(s.slice().reverse().slice(1)); segs.splice(i, 1); grew = true; break }
        if (eq(cur[0], s.at(-1))) { cur = s.concat(cur.slice(1)); segs.splice(i, 1); grew = true; break }
        if (eq(cur[0], s[0])) { cur = s.slice().reverse().concat(cur.slice(1)); segs.splice(i, 1); grew = true; break } } }
    rings.push(cur); }
  return rings;
}
const green = new Uint8Array(FW * FD), pond = new Uint8Array(FW * FD), pier = new Uint8Array(FW * FD);
function ringsOf(e) {
  if (e.type === 'way') return e.geometry ? [e.geometry] : [];
  const ws = (e.members || []).filter(m => m.type === 'way' && m.geometry && (m.role === 'outer' || m.role === 'inner' || m.role === '')).map(m => m.geometry);
  return joinRings(ws);
}
function classify(t) {
  if (t.man_made === 'pier' || t.man_made === 'breakwater') return 'pier';
  if (t.natural === 'water' || t.waterway === 'riverbank') return t.water === 'river' || t.name === 'Hudson River' ? 'skip' : 'pond';
  if (t.leisure === 'pitch' || t.leisure === 'track') return 'pitch';
  if (t.leisure === 'playground') return 'lawn';
  if (t.natural === 'wood' || t.landuse === 'forest') return 'wood';
  if (t.leisure || t.landuse === 'grass' || t.landuse === 'cemetery' || t.landuse === 'meadow' || t.landuse === 'village_green' || t.landuse === 'recreation_ground' || t.natural === 'scrub' || t.natural === 'grassland' || t.natural === 'wetland') return 'lawn';
  return 'skip';
}
const GV = { lawn: 1, wood: 2, pitch: 3 };
// önce çim (küçükten büyüğe değil; sonra tahta/pitch üstüne)
const order = ['lawn', 'wood', 'pitch', 'pond', 'pier'];
const items = { lawn: [], wood: [], pitch: [], pond: [], pier: [] };
for (const e of P) { const c = classify(e.tags || {}); if (c === 'skip') continue; items[c].push(e); }
for (const c of order) for (const e of items[c]) {
  const rr = ringsOf(e); if (!rr.length) continue;
  const fr = rr.map(r => toFine(r.map(p => [p.lon, p.lat]))); if (!inGrid(fr)) continue;
  const closed = rr.filter(r => r.length > 3 && r[0].lat === r.at(-1).lat && r[0].lon === r.at(-1).lon);
  if (c === 'pier' && closed.length === 0) { // açık iskele = kalın çizgi
    for (const r of fr) for (let i = 1; i < r.length; i++) for (let o = -2; o <= 2; o++) bresenham(pier, r[i - 1][0] + o, r[i - 1][1], r[i][0] + o, r[i][1]); continue; }
  const fc = fr.filter((r, i) => rr[i] && rr[i][0].lat === rr[i].at(-1).lat && rr[i][0].lon === rr[i].at(-1).lon);
  const layer = c === 'pond' ? pond : c === 'pier' ? pier : green;
  const val = c === 'pond' || c === 'pier' ? 1 : GV[c];
  if (c === 'pond' || c === 'pier' || e.type === 'way') fillRings(fc, (x, y) => { layer[y * FW + x] = val; });
  else { // relation: even-odd, ama önce geçici katman
    const tmp = new Uint8Array(FW * FD); const idx = []; fillRings(fc, (x, y) => { const i = y * FW + x; tmp[i] ^= 1; idx.push(i); });
    for (const i of idx) if (tmp[i]) { layer[i] = val; tmp[i] = 0; } }
}
console.error('osm ok');

// ---- voxel sınıflandırma
const KIND = { water: 0, road: 1, bld: 2, park: 3, pier: 4, pond: 5 };
const kind = new Uint8Array(W * D), hgt = new Uint8Array(W * D), pal = new Uint8Array(W * D), sty = new Uint8Array(W * D), bidV = new Int32Array(W * D);
for (let y = 0; y < D; y++) for (let x = 0; x < W; x++) {
  let land = 0, bc = 0, gc = 0, pc = 0, pr = 0; const cnt = {}; let maxH = 0, maxId = 0, gv = [0, 0, 0, 0];
  for (let j = 0; j < SS; j++) for (let i = 0; i < SS; i++) { const fi = (y * SS + j) * FW + x * SS + i; land += fineLand[fi]; if (bidF[fi]) { bc++; if (bHt[bidF[fi]] >= maxH) { maxH = bHt[bidF[fi]]; maxId = bidF[fi] } } if (green[fi]) { gc++; gv[green[fi]]++ } if (pond[fi]) pc++; if (pier[fi]) pr++; }
  const o = y * W + x; const n = SS * SS;
  const isLand = land >= n / 2 || (bc >= n * 0.6);
  if (!isLand) { if (pr >= n * 0.3 && pc < n / 2) { kind[o] = KIND.pier; } else kind[o] = KIND.water; if (bc >= n * 0.5 && !isLand) { } continue; }
  if (bc >= n * 0.42 && maxH > 2.5) { kind[o] = KIND.bld; bidV[o] = maxId; hgt[o] = Math.min(250, Math.max(2, Math.round(maxH / 9.5 * (V / 15.98)))); continue; }
  if (pc >= n * 0.5) { kind[o] = KIND.pond; continue; }
  if (gc >= n * 0.5) { kind[o] = KIND.park; pal[o] = gv[2] > gv[1] && gv[2] > gv[3] ? 1 : gv[3] > gv[1] ? 2 : 0; continue; }
  kind[o] = KIND.road;
}
// bina renkleri/stilleri
for (let o = 0; o < W * D; o++) if (kind[o] === KIND.bld) { const id = bidV[o]; const hM = bHt[id], yr = bYear[id]; const r = hash(id * 7 + 3);
  let s; const r2 = hash(id * 5 + 11);
  if (hM > 55 && (yr >= 1950 || yr === 0)) s = r2 < 0.72 ? 1 : 4;
  else if (yr && yr < 1940 && hM < 45) s = r2 < 0.72 ? 2 : (r2 < 0.9 ? 3 : 4);
  else if (yr && yr < 1950 && hM >= 45) s = r2 < 0.75 ? 3 : 2;
  else if (hM < 14 && r < 0.3) s = 5;
  else if (hM >= 30 && r2 < 0.28) s = 1;
  else s = r2 < 0.5 ? 4 : (r2 < 0.85 ? 2 : 3);
  sty[o] = s; pal[o] = Math.floor(hash(id * 13 + 1) * 8); }
fs.writeFileSync('data/grid.bin', Buffer.concat([kind, hgt, pal, sty].map(a => Buffer.from(a.buffer))));
fs.writeFileSync('data/bid.bin', Buffer.from(bidV.buffer));
fs.writeFileSync('data/bmeta.json', JSON.stringify({ ht: bHt, yr: bYear }));
// debug PNG
const img = new Uint8Array(W * D * 3);
for (let y = 0; y < D; y++) for (let x = 0; x < W; x++) { const o = y * W + x, p = ((D - 1 - y) * W + x) * 3; const k = kind[o]; let c = [30, 70, 140];
  if (k === 1) c = [90, 90, 96]; else if (k === 2) { const h = hgt[o]; const t = Math.min(1, h / 45); c = [Math.round(120 + 135 * t), Math.round(100 + 60 * (1 - t)), Math.round(90 - 40 * t)]; } else if (k === 3) c = [60, 150, 70]; else if (k === 4) c = [150, 110, 70]; else if (k === 5) c = [90, 170, 220];
  img[p] = c[0]; img[p + 1] = c[1]; img[p + 2] = c[2]; }
writePNG('data/grid.png', W, D, img); console.error('baked');
