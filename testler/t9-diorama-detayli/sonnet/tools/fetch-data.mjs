import fs from 'node:fs';
import { overpass } from './overpass.mjs';
const LAT = [40.655, 40.700, 40.745, 40.785, 40.822], LON = [-74.082, -74.03, -73.98, -73.905];
const tiles = [];
for (let i = 0; i < LAT.length - 1; i++) for (let j = 0; j < LON.length - 1; j++) tiles.push([LAT[i], LON[j], LAT[i + 1], LON[j + 1]]);
const merge = (name, list) => { const seen = new Map(); for (const j of list) for (const e of j.elements) seen.set(e.type + e.id, e); fs.writeFileSync(`cache/${name}.json`, JSON.stringify({ elements: [...seen.values()] })); console.log('merged', name, seen.size); };
const all = [LAT[0], LON[0], LAT.at(-1), LON.at(-1)].join(',');
// parklar + su + iskele: tek istek
const misc = await overpass('misc', `[out:json][timeout:170];(
  way["leisure"~"^(park|garden|pitch|playground|recreation_ground|common|golf_course|stadium)$"](${all});
  relation["leisure"~"^(park|garden|recreation_ground|common)$"](${all});
  way["landuse"~"^(grass|forest|recreation_ground|cemetery|village_green|meadow)$"](${all});
  way["natural"~"^(wood|scrub|grassland|water|wetland)$"](${all});
  relation["natural"~"^(water|wood)$"](${all});
  way["man_made"~"^(pier|breakwater|groyne)$"](${all});
);out geom tags;`);
for (const kind of ['roads', 'buildings']) {
  const parts = [];
  for (let t = 0; t < tiles.length; t++) {
    const bb = tiles[t].join(',');
    const q = kind === 'roads'
      ? `[out:json][timeout:170];way["highway"~"^(motorway|trunk|primary|secondary|tertiary|residential|unclassified|living_street|motorway_link|trunk_link|primary_link|secondary_link|tertiary_link|pedestrian)$"](${bb});out geom tags;`
      : `[out:json][timeout:170];(way["building"](${bb});way["building:part"](${bb}););out geom tags;`;
    parts.push(await overpass(`${kind}_${t}`, q));
  }
  merge(kind, parts);
}
console.log('done');
