// OSM önbelleğinden (tools/cache) ızgara rasterlarını üretir → src/data/world.bin + meta.json
// Çalıştır: npm run bake   (yalnız veri yeniden üretilecekse; çalışma zamanında ağ gerekmez)
import fs from 'node:fs';
import { llToCell, W, H } from '../src/geo.js';
import { writePNG } from './png.mjs';

const rd = (n) => JSON.parse(fs.readFileSync(`cache/${n}.json`, 'utf8'));
const N = W * H;
const cellsOf = (geom) => geom.map((p) => llToCell(p.lat, p.lon));

// ---------- 1) kara/deniz: kıyı çizgisi + taşkın dolgusu ----------
const wall = new Uint8Array(N);
function segLine(a, b, arr, val = 1) {
  const n = Math.ceil(Math.max(Math.abs(b[0] - a[0]), Math.abs(b[1] - a[1])) * 3) + 1;
  for (let i = 0; i <= n; i++) { const t = i / n; const x = Math.floor(a[0] + (b[0] - a[0]) * t), y = Math.floor(a[1] + (b[1] - a[1]) * t); if (x >= 0 && y >= 0 && x < W && y < H) arr[y * W + x] = val; }
}
for (const e of rd('coast').elements) { const c = cellsOf(e.geometry); for (let i = 0; i + 1 < c.length; i++) segLine(c[i], c[i + 1], wall); }
const water = new Uint8Array(N);
const seeds = [[40.685, -74.030], [40.735, -74.020], [40.745, -73.964], [40.7195, -73.9715], [40.78, -73.935], [40.665, -74.05]];
{
  const st = [];
  for (const s of seeds) { const [x, y] = llToCell(...s).map(Math.floor); if (x >= 0 && y >= 0 && x < W && y < H) st.push(y * W + x); }
  while (st.length) {
    const i = st.pop(); if (i < 0 || i >= N || water[i] || wall[i]) continue; water[i] = 1;
    const x = i % W, y = (i / W) | 0;
    if (x > 0) st.push(i - 1); if (x < W - 1) st.push(i + 1); if (y > 0) st.push(i - W); if (y < H - 1) st.push(i + W);
  }
}
const land = new Uint8Array(N); for (let i = 0; i < N; i++) land[i] = water[i] ? 0 : 1;

// ---------- yardımcılar: çokgen dolgusu (çift-tek kuralı) ----------
function polyFill(rings, cb) {
  let minx = 1e9, maxx = -1e9, miny = 1e9, maxy = -1e9;
  for (const r of rings) for (const p of r) { minx = Math.min(minx, p[0]); maxx = Math.max(maxx, p[0]); miny = Math.min(miny, p[1]); maxy = Math.max(maxy, p[1]); }
  const x0 = Math.max(0, Math.floor(minx)), x1 = Math.min(W - 1, Math.floor(maxx)), y0 = Math.max(0, Math.floor(miny)), y1 = Math.min(H - 1, Math.floor(maxy));
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) cb(x, y, inside(rings, x + 0.5, y + 0.5));
}
function inside(rings, px, py) {
  let c = false;
  for (const r of rings) for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
    const a = r[i], b = r[j];
    if ((a[1] > py) !== (b[1] > py) && px < (b[0] - a[0]) * (py - a[1]) / (b[1] - a[1]) + a[0]) c = !c;
  }
  return c;
}
const area = (r) => { let s = 0; for (let i = 0, j = r.length - 1; i < r.length; j = i++) s += (r[j][0] + r[i][0]) * (r[j][1] - r[i][1]); return Math.abs(s / 2); };
function ringsOf(e) { // way veya relation → halka listesi
  if (e.type === 'way') return e.geometry ? [cellsOf(e.geometry)] : [];
  const out = []; for (const m of e.members || []) if (m.geometry && (m.role === 'outer' || m.role === 'inner')) out.push(cellsOf(m.geometry)); return out;
}

// ---------- 2) park / su / iskele ----------
const park = new Uint8Array(N); // 1 çim, 2 orman, 3 gölet/göl, 4 iskele
const misc = rd('misc').elements;
let nPark = 0, nPond = 0, nPier = 0;
for (const e of misc) {
  const t = e.tags || {}; const rings = ringsOf(e); if (!rings.length) continue;
  const isWater = t.natural === 'water' || t.natural === 'wetland';
  const isWood = t.natural === 'wood' || t.landuse === 'forest' || t.natural === 'scrub';
  const isPier = t.man_made === 'pier' || t.man_made === 'breakwater' || t.man_made === 'groyne';
  if (isPier) {
    nPier++;
    for (const r of rings) {
      const closed = r.length > 3 && Math.hypot(r[0][0] - r.at(-1)[0], r[0][1] - r.at(-1)[1]) < 0.01;
      if (closed && area(r) > 0.5) polyFill([r], (x, y, ins) => { if (ins) park[y * W + x] = 4; });
      else for (let i = 0; i + 1 < r.length; i++) segLine(r[i], r[i + 1], park, 4);
    }
    continue;
  }
  const big = rings.reduce((s, r) => s + area(r), 0);
  if (isWater) { if (big > 6000) continue; nPond++; polyFill(rings, (x, y, ins) => { if (ins && land[y * W + x]) park[y * W + x] = 3; }); continue; }
  nPark++;
  polyFill(rings, (x, y, ins) => { if (ins && land[y * W + x] && park[y * W + x] !== 3) park[y * W + x] = isWood ? 2 : Math.max(park[y * W + x], 1); });
}
// iskeleler: yalnızca denize komşu olanlar (parkların içindeki yapay çizgiler elenir), sonra kara say
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
  const i = y * W + x; if (park[i] !== 4) continue; let near = false;
  for (let dy = -2; dy <= 2 && !near; dy++) for (let dx = -2; dx <= 2; dx++) { const X = x + dx, Y = y + dy; if (X >= 0 && Y >= 0 && X < W && Y < H && !land[Y * W + X]) { near = true; break; } }
  if (!near) park[i] = 0;
}
for (let i = 0; i < N; i++) if (park[i] === 4) land[i] = 1;
console.log('park', nPark, 'pond', nPond, 'pier', nPier);

// ---------- 3) yollar ----------
const road = new Uint8Array(N); // 1 sokak, 2 cadde/iri, 3 otoyol
const bridges = [];
const BR_NAMES = /Brooklyn Bridge|Manhattan Bridge|Williamsburg Bridge|Queensboro|Ed Koch|59th Street Bridge/;
for (const e of rd('roads').elements) {
  const t = e.tags || {}; const h = t.highway; if (!e.geometry) continue;
  if (t.tunnel && t.tunnel !== 'no') continue;
  const c = cellsOf(e.geometry);
  if (t.bridge && t.bridge !== 'no' && BR_NAMES.test((t.name || '') + ' ' + (t.ref || ''))) { bridges.push({ name: t.name || '', hw: h, pts: c.map((p) => [+p[0].toFixed(2), +p[1].toFixed(2)]) }); continue; }
  const cls = /motorway|trunk/.test(h) ? 3 : /^(primary)/.test(h) ? 2 : /^(secondary)/.test(h) ? 2 : 1;
  const wide = cls >= 2;
  for (let i = 0; i + 1 < c.length; i++) {
    const a = c[i], b = c[i + 1]; const dx = b[0] - a[0], dy = b[1] - a[1];
    const n = Math.ceil(Math.hypot(dx, dy) * 4) + 1; let px = -1, py = -1;
    for (let k = 0; k <= n; k++) {
      const x = a[0] + dx * k / n, y = a[1] + dy * k / n; const cx = Math.floor(x), cy = Math.floor(y);
      const put = (X, Y) => { if (X < 0 || Y < 0 || X >= W || Y >= H) return; const j = Y * W + X; if (!land[j] && park[j] !== 4) return; if (road[j] < cls) road[j] = cls; };
      put(cx, cy);
      if (px >= 0 && cx !== px && cy !== py) { put(cx, py); }
      if (wide) { if (Math.abs(dx) > Math.abs(dy)) put(cx, (y - cy) > 0.5 ? cy + 1 : cy - 1); else put((x - cx) > 0.5 ? cx + 1 : cx - 1, cy); }
      px = cx; py = cy;
    }
  }
}
console.log('bridges', bridges.length);

// ---------- 4) binalar (NYC Building Footprints: gerçek çatı yükseklikleri; NJ için OSM) ----------
const bh = new Uint8Array(N);       // yükseklik (metre/3), 0 = yok
const hMax = new Float32Array(N), src = new Uint8Array(N);
let nb = 0;
function rasterBuilding(ring, h, tag) {
  let minx = 1e9, maxx = -1e9, miny = 1e9, maxy = -1e9; for (const p of ring) { minx = Math.min(minx, p[0]); maxx = Math.max(maxx, p[0]); miny = Math.min(miny, p[1]); maxy = Math.max(maxy, p[1]); }
  if (maxx < 0 || maxy < 0 || minx >= W || miny >= H) return;
  nb++;
  const x0 = Math.max(0, Math.floor(minx)), x1 = Math.min(W - 1, Math.floor(maxx)), y0 = Math.max(0, Math.floor(miny)), y1 = Math.min(H - 1, Math.floor(maxy));
  const rings = [ring];
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    let c = 0; for (let sy = 0; sy < 3; sy++) for (let sx = 0; sx < 3; sx++) if (inside(rings, x + (sx + 0.5) / 3, y + (sy + 0.5) / 3)) c++;
    if (!c) continue; const i = y * W + x;
    if (c >= 3 || (c >= 2 && h > 80)) { if (h > hMax[i]) { hMax[i] = h; src[i] = tag; } }
  }
}
const nyc = JSON.parse(fs.readFileSync('cache/nyc.json', 'utf8'));
for (const [hft, mp] of nyc) {
  if (!mp) continue; const h = hft > 3 ? hft * 0.3048 : 9;
  for (const poly of mp) rasterBuilding(poly[0].map(([lon, lat]) => llToCell(lat, lon)), h, 1);
}
const num = (s) => { if (s == null) return NaN; const m = String(s).match(/-?[\d.]+/); if (!m) return NaN; let v = parseFloat(m[0]); if (/ft|'/.test(String(s))) v *= 0.3048; return v; };
let nOsm = 0;
const nycNear = new Uint8Array(N);
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (src[y * W + x] === 1) for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) { const X = x + dx, Y = y + dy; if (X >= 0 && Y >= 0 && X < W && Y < H) nycNear[Y * W + X] = 1; }
for (const e of rd('buildings').elements) { // NYC dışı (New Jersey) için OSM; ikisi çakışırsa büyük olan
  if (!e.geometry || e.geometry.length < 4) continue; const t = e.tags || {};
  let h = num(t.height); if (isNaN(h)) h = num(t['building:height']);
  if (isNaN(h)) { const lv = num(t['building:levels']); if (!isNaN(lv)) h = lv * 3.6 + 2; }
  const minh = num(t.min_height); if (!isNaN(minh) && minh > 0.5 * (isNaN(h) ? 20 : h)) continue;
  const ring = cellsOf(e.geometry);
  const cx = ring.reduce((s, p) => s + p[0], 0) / ring.length, cy = ring.reduce((s, p) => s + p[1], 0) / ring.length;
  const ci = Math.floor(cy) * W + Math.floor(cx);
  const inNYC = ci >= 0 && ci < N && nycNear[ci] === 1;
  if (inNYC && isNaN(h)) continue;         // NYC verisi zaten var
  if (isNaN(h)) h = 14 + ((ring.length * 7) % 9);
  if (!inNYC) { nOsm++; rasterBuilding(ring, h, 2); } else if (h > 100 && h > hMax[ci] * 1.2) rasterBuilding(ring, h, 2); // süper yüksek kuleler (WTC vb.)
}
for (let i = 0; i < N; i++) if (hMax[i] > 0 && land[i]) bh[i] = Math.min(255, Math.max(1, Math.round(hMax[i] / 3)));
console.log('buildings', nb, 'osm-only', nOsm, 'cells', bh.reduce((s, v) => s + (v > 0), 0), 'max', bh.reduce((m, v) => Math.max(m, v), 0) * 3, 'm');

// ---------- 5) simge meta (OSM'den) ----------
const named = rd('named').elements;
const cen = (e) => { const g = e.geometry; let a = 0, b = 0; for (const p of g) { a += p.lat; b += p.lon; } return [a / g.length, b / g.length]; };
const meta = { W, H, bridges, footprints: {} };
const pick = (name, id) => { const e = named.find((x) => x.id === id); if (!e) return; const c = cellsOf(e.geometry); meta.footprints[name] = { ring: c.map((p) => [+p[0].toFixed(2), +p[1].toFixed(2)]), ll: cen(e), h: e.tags?.height || null }; };
pick('esb', 34633854); pick('chrysler', 42500770); pick('wtc', 713565776); pick('flatiron', 264768896); pick('gct', 265947358); pick('liberty', 32965412); pick('brooklynMain', 375157262);

// ---------- yaz ----------
const out = Buffer.concat([land, road, bh, park].map((a) => Buffer.from(a.buffer)));
fs.writeFileSync('../src/data/world.bin', out);
fs.writeFileSync('../src/data/meta.json', JSON.stringify(meta));
console.log('world.bin', (out.length / 1e6).toFixed(2), 'MB');
// önizleme
const img = new Uint8Array(N * 3);
for (let i = 0; i < N; i++) {
  let c = [30, 70, 130];
  if (land[i]) { c = [190, 180, 150]; if (park[i] === 1) c = [90, 160, 70]; if (park[i] === 2) c = [40, 110, 50]; if (park[i] === 3) c = [70, 120, 200]; if (park[i] === 4) c = [150, 110, 70]; if (bh[i]) { const g = Math.min(255, 90 + bh[i] * 1.5); c = [g, g * 0.85, g * 0.7]; } if (road[i]) c = road[i] === 3 ? [230, 120, 60] : road[i] === 2 ? [60, 60, 70] : [110, 110, 120]; }
  img.set(c, i * 3);
}
writePNG('bake-preview.png', W, H, img);
