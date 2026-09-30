import puppeteer from 'puppeteer-core';
import fs from 'fs';
const out = process.argv[2] || 'shots/map.png';
const browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium', headless: 'new', args: ['--no-sandbox', '--use-angle=gl', '--ignore-gpu-blocklist'] });
const page = await browser.newPage();
page.on('pageerror', e => console.log('[pageerror]', e.message));
await page.goto('file://' + process.cwd() + '/index.html?dev=1');
await page.waitForFunction('window.__ready === true', { timeout: 120000 });
const url = await page.evaluate(() => {
  const t = window.__k.terrain, N = 2048, S = 1024, st = N / S;
  const c = document.createElement('canvas'); c.width = c.height = S; const g = c.getContext('2d');
  const im = g.createImageData(S, S);
  const P = window.__k.pois || [];
  for (let j = 0; j < S; j++) for (let i = 0; i < S; i++) {
    const ii = i * st, jj = j * st, k = jj * N + ii;
    const h = t.H[k]; const nx = t.NX[k], nz = t.NZ[k]; const ny = Math.sqrt(Math.max(0, 1 - nx * nx - nz * nz));
    const l = Math.max(0, nx * -0.6 + ny * 0.6 + nz * -0.5) ;
    const g0 = t.G[k], r = t.R[k];
    let R = 150 + 100 * l * (0.5 + h / 250), G = 120 + 90 * l * (0.5 + h / 250), B = 95 + 70 * l;
    R = R * (0.75 + 0.5 * (h / 250)); G = G * (0.75 + 0.5 * (h / 250)); B = B * (0.75 + 0.5 * (h / 250));
    if (g0 > 0.4) { G += 50; R -= 30; }
    const o = (j * S + i) * 4; im.data[o] = R; im.data[o + 1] = G; im.data[o + 2] = B; im.data[o + 3] = 255;
  }
  g.putImageData(im, 0, 0);
  g.strokeStyle = 'rgba(0,0,0,.35)'; g.fillStyle = '#000'; g.font = '12px sans-serif';
  for (let v = -2000; v <= 2000; v += 500) { const p = (v + 2048) / 4096 * S; g.beginPath(); g.moveTo(p, 0); g.lineTo(p, S); g.moveTo(0, p); g.lineTo(S, p); g.stroke(); g.fillText(v, p + 2, 12); g.fillText(v, 2, p - 2); }
  for (const p of window.__k.POIS) { const x = (p.x + 2048) / 4096 * S, z = (p.z + 2048) / 4096 * S; g.beginPath(); g.arc(x, z, 6, 0, 7); g.fillStyle = 'red'; g.fill(); g.fillStyle = '#000'; g.font = 'bold 13px sans-serif'; g.fillText(p.name, x + 8, z + 4); }
  return c.toDataURL('image/png');
});
fs.writeFileSync(out, Buffer.from(url.split(',')[1], 'base64'));
await browser.close();
