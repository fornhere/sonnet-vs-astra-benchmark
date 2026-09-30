import puppeteer from 'puppeteer-core';
// node tools/scout.mjs onek mod cx cz r hour [tx tz tagl d0 d1]
const [,, prefix, mode, cx, cz, r, hour, tx = 0, tz = 0, tagl = 20, d0 = 120, d1 = 300] = process.argv;
const W = 960, Hh = 540;
const browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium', headless: 'new', args: ['--no-sandbox', '--use-angle=gl', '--ignore-gpu-blocklist', `--window-size=${W},${Hh}`] });
const page = await browser.newPage(); await page.setViewport({ width: W, height: Hh });
page.on('pageerror', e => console.log('[pageerror]', e.message));
await page.goto('file://' + process.cwd() + '/index.html?dev=1');
await page.waitForFunction('window.__ready === true', { timeout: 120000 });
await page.evaluate(() => { document.body.classList.add('photo'); document.querySelector('#loader').style.display = 'none'; document.querySelector('#pause').classList.add('hidden'); document.querySelector('#hud').style.display='none'; });
const cands = await page.evaluate(({ mode, cx, cz, r, hour, tx, tz, tagl, d0, d1 }) => {
  const T = __k.terrain, chs = __k.chimneys;
  let seed = 12345; const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  const cell = 60; const grid = new Map();
  for (const c of chs) { const k = Math.floor(c.x / cell) + ',' + Math.floor(c.z / cell); if (!grid.has(k)) grid.set(k, []); grid.get(k).push(c); }
  const nearCh = (x, z, rad, cb) => { for (let i = Math.floor((x - rad) / cell); i <= Math.floor((x + rad) / cell); i++) for (let j = Math.floor((z - rad) / cell); j <= Math.floor((z + rad) / cell); j++) { const a = grid.get(i + ',' + j); if (a) for (const c of a) cb(c); } };
  const blocked = (x, y, z) => { if (y < T.heightAt(x, z) + 0.5) return true; let hit = false; nearCh(x, z, 30, (c) => { const dx = x - c.x, dz = z - c.z; const rr = c.Rs * 0.5; if (dx * dx + dz * dz < rr * rr && y < c.y0 + c.H) hit = true; }); return hit; };
  const sunAz = ((72 + (hour - 6) * 15.5) * Math.PI / 180);
  const sx = Math.sin(sunAz), sz = -Math.cos(sunAz);
  const out = [];
  for (let n = 0; n < 900; n++) {
    let px, pz, agl, lx, ly, lz;
    if (mode === 'area') {
      const a = rnd() * 6.283, d = Math.sqrt(rnd()) * r; px = cx + Math.cos(a) * d; pz = cz + Math.sin(a) * d; agl = 3 + rnd() * 45;
      const yaw = rnd() * 6.283, dist = 80 + rnd() * 160; lx = px + Math.cos(yaw) * dist; lz = pz + Math.sin(yaw) * dist; ly = T.heightAt(lx, lz) + 10 + rnd() * 30;
    } else {
      const a = rnd() * 6.283, d = +d0 + rnd() * (+d1 - +d0); px = +tx + Math.cos(a) * d; pz = +tz + Math.sin(a) * d; agl = 4 + rnd() * 70; lx = +tx; lz = +tz; ly = T.heightAt(lx, lz) + +tagl;
    }
    if (Math.abs(px) > 1700 || Math.abs(pz) > 1700) continue;
    const py = T.heightAt(px, pz) + agl;
    let bad = false; nearCh(px, pz, 9, (c) => { if (Math.hypot(px - c.x, pz - c.z) < c.Rs * 0.9 + 5 && py < c.y0 + c.H * 1.1) bad = true; });
    if (bad) continue;
    const dx = lx - px, dy = ly - py, dz = lz - pz; const L = Math.hypot(dx, dy, dz); const ux = dx / L, uy = dy / L, uz = dz / L;
    if (Math.abs(uy) > 0.45) continue;
    // ışınlar
    let open = 0, minCenter = 1e9;
    for (let k = -3; k <= 3; k++) {
      const ang = k * 0.13; const cs = Math.cos(ang), sn = Math.sin(ang);
      const rx = ux * cs - uz * sn, rz = ux * sn + uz * cs;
      let t = 3, hitT = 260;
      for (; t < 260; t += 5) { if (blocked(px + rx * t, py + uy * t, pz + rz * t)) { hitT = t; break; } }
      if (k === 0) minCenter = hitT;
      open += hitT;
    }
    if (mode === 'area' && minCenter < 30) continue;
    if (mode === 'target') { let t = 3; let los = true; for (; t < L - 8; t += 4) if (blocked(px + ux * t, py + uy * t, pz + uz * t)) { los = false; break; } if (!los) continue; }
    let cnt = 0; nearCh(px + ux * 110, pz + uz * 110, 150, (c) => { const ddx = c.x - px, ddz = c.z - pz, dd = Math.hypot(ddx, ddz); if (dd < 25 || dd > 260) return; const cosA = (ddx * ux + ddz * uz) / (dd * Math.hypot(ux, uz)); if (cosA > 0.9) cnt++; });
    const sunDot = ux * sx + uz * sz; // +: güneşe bakıyor
    const score = open / 7 / 260 * 30 + Math.min(cnt, 30) * (mode === 'area' ? 1.6 : 0.3) - Math.abs(sunDot + 0.35) * 8 - Math.abs(agl - 18) * 0.05;
    out.push({ px: +px.toFixed(0), py: +agl.toFixed(0), pz: +pz.toFixed(0), lx: +lx.toFixed(0), ly: +(ly - T.heightAt(lx, lz)).toFixed(0), lz: +lz.toFixed(0), score: +score.toFixed(1), cnt, sunDot: +sunDot.toFixed(2) });
  }
  out.sort((a, b) => b.score - a.score);
  // çeşitlilik: birbirine 60 m'den yakın olanları at
  const pick = [];
  for (const c of out) { if (pick.every(p => Math.hypot(p.px - c.px, p.pz - c.pz) > 70)) pick.push(c); if (pick.length >= 8) break; }
  return pick;
}, { mode, cx: +cx, cz: +cz, r: +r, hour: +hour, tx: +tx, tz: +tz, tagl: +tagl, d0: +d0, d1: +d1 });
console.log(cands.map((c, i) => i + ': ' + JSON.stringify(c)).join('\n'));
let i = 0;
for (const c of cands) {
  await page.evaluate((c, hour) => { const g = (x, z) => __k.terrain.heightAt(x, z); __k.set(c.px, g(c.px, c.pz) + c.py, c.pz, c.lx, g(c.lx, c.lz) + c.ly, c.lz, hour, 55); }, c, +hour);
  await new Promise(r => setTimeout(r, 900));
  await page.screenshot({ path: `${prefix}_${i}.png` }); i++;
}
await browser.close();
