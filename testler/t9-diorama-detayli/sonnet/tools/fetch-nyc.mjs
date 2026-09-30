// NYC Building Footprints (height_roof: fit) → cache/nyc.json
import fs from 'node:fs';
const box = '40.655, -74.082, 40.822, -73.905';
const all = [];
for (let off = 0; ; off += 40000) {
  const u = new URL('https://data.cityofnewyork.us/resource/5zhs-2jue.json');
  u.searchParams.set('$select', 'height_roof,the_geom');
  u.searchParams.set('$where', `within_box(the_geom, ${box})`);
  u.searchParams.set('$order', 'bin');
  u.searchParams.set('$limit', '40000'); u.searchParams.set('$offset', String(off));
  let rows;
  for (let a = 0; a < 5; a++) { try { const r = await fetch(u, { signal: AbortSignal.timeout(170000) }); rows = await r.json(); if (Array.isArray(rows)) break; } catch (e) { console.log('retry', String(e).slice(0, 100)); } }
  if (!Array.isArray(rows)) throw new Error('nyc fetch failed');
  console.log('page', off, rows.length);
  for (const r of rows) all.push([parseFloat(r.height_roof) || 0, r.the_geom?.coordinates]);
  if (rows.length < 40000) break;
}
fs.writeFileSync('cache/nyc.json', JSON.stringify(all));
console.log('total', all.length);
