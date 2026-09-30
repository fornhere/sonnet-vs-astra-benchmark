import fs from 'fs';
const UA = 'manhattan-voxel-diorama-benchmark/1.0';
async function q(name, body) {
  if (fs.existsSync(`data/raw/${name}.json`)) { console.error('skip', name); return; }
  for (let t = 0; t < 4; t++) {
    const r = await fetch('https://overpass-api.de/api/interpreter', { method: 'POST', headers: { 'User-Agent': UA, 'Content-Type': 'application/x-www-form-urlencoded' }, body: 'data=' + encodeURIComponent(body) });
    if (r.ok) { const txt = await r.text(); fs.writeFileSync(`data/raw/${name}.json`, txt); console.error(name, txt.length); return; }
    console.error(name, 'HTTP', r.status); await new Promise(r => setTimeout(r, 8000));
  }
}
const BB = '40.60,-74.13,40.93,-73.85';
await q('coast', `[out:json][timeout:180];way["natural"="coastline"](${BB});out geom;`);
await q('parks', `[out:json][timeout:240];(
 way["leisure"~"^(park|garden|pitch|playground|recreation_ground|nature_reserve|golf_course|dog_park|stadium|track)$"](${BB});
 relation["leisure"~"^(park|garden|nature_reserve|recreation_ground)$"](${BB});
 way["landuse"~"^(grass|recreation_ground|cemetery|forest|meadow|village_green|greenfield|railway)$"](${BB});
 relation["landuse"~"^(grass|cemetery|forest|recreation_ground)$"](${BB});
 way["natural"~"^(wood|scrub|grassland|wetland|water|beach)$"](${BB});
 relation["natural"~"^(water|wood)$"](${BB});
 way["waterway"="riverbank"](${BB});
 way["man_made"~"^(pier|breakwater)$"](${BB});
 way["leisure"="marina"](${BB});
);out geom;`);
await q('bridges', `[out:json][timeout:180];(
 way["bridge"~"yes|viaduct|suspension|cantilever"]["highway"~"^(motorway|trunk|primary|secondary|tertiary)$"](${BB});
 way["bridge"~"yes|viaduct"]["railway"~"^(rail|subway)$"](${BB});
);out geom tags;`);
await q('nj_buildings', `[out:json][timeout:240];way["building"](40.65,-74.13,40.80,-74.01);out geom tags;`);
await q('highline', `[out:json][timeout:60];(way["name"="High Line"](40.70,-74.03,40.78,-73.98);way["highway"="motorway"]["name"~"Franklin|FDR|West Side"](40.70,-74.03,40.85,-73.92););out geom;`);
