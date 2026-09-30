// Overpass yardımcısı: aynalar arasında dener, sonucu tools/cache/ altına yazar.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url));
const MIRRORS = [
  'https://overpass.openstreetmap.fr/api/interpreter',
  'https://maps.mail.ru/osm/tools/overpass/api/interpreter',
  'https://overpass-api.de/api/interpreter',
];
export async function overpass(name, query, { force = false } = {}) {
  const file = path.join(here, 'cache', name + '.json');
  if (!force && fs.existsSync(file)) return JSON.parse(fs.readFileSync(file, 'utf8'));
  let lastErr;
  for (let round = 0; round < 3; round++) {
    for (const url of MIRRORS) {
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'content-type': 'application/x-www-form-urlencoded', 'user-agent': 'ny-diorama-builder/1.0' },
          body: 'data=' + encodeURIComponent(query),
          signal: AbortSignal.timeout(170000),
        });
        const txt = await res.text();
        if (!res.ok || txt.trimStart().startsWith('<')) throw new Error(url + ' -> ' + res.status + ' ' + txt.slice(0, 120));
        const json = JSON.parse(txt);
        fs.writeFileSync(file, JSON.stringify(json));
        console.log('ok', name, (txt.length / 1e6).toFixed(2) + 'MB', 'via', url);
        return json;
      } catch (e) { lastErr = e; console.log('retry', name, String(e).slice(0, 160)); }
    }
  }
  throw lastErr;
}
