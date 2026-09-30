import fs from 'fs';
import { corners } from './frame.mjs';
const c = corners(150); c.push(c[0]);
const wkt = 'MULTIPOLYGON (((' + c.map(([lo, la]) => `${lo} ${la}`).join(', ') + ')))';
const base = 'https://data.cityofnewyork.us/resource/5zhs-2jue.json';
let all = [], off = 0; const L = 25000;
for (;;) {
  const q = new URLSearchParams({ '$select': 'the_geom,height_roof,construction_year,feature_code,ground_elevation', '$where': `within_polygon(the_geom, '${wkt}')`, '$limit': L, '$offset': off, '$order': 'objectid' });
  const r = await fetch(base + '?' + q); if (!r.ok) { console.error(r.status, await r.text()); process.exit(1); }
  const j = await r.json(); all.push(...j); console.error('got', all.length);
  if (j.length < L) break; off += L;
}
fs.writeFileSync('data/raw/nyc_buildings.json', JSON.stringify(all));
console.error('done', all.length);
