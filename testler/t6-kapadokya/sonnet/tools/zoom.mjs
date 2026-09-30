import puppeteer from 'puppeteer-core';
import fs from 'fs';
const [,, out, cx, cz, span = '1200'] = process.argv;
const browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium', headless: 'new', args: ['--no-sandbox', '--use-angle=gl', '--ignore-gpu-blocklist'] });
const page = await browser.newPage();
await page.goto('file://' + process.cwd() + '/index.html?dev=1');
await page.waitForFunction('window.__ready === true', { timeout: 120000 });
const url = await page.evaluate(([cx, cz, span]) => {
  const t = __k.terrain, N = 2048, S = 1000; const c = document.createElement('canvas'); c.width = c.height = S; const g = c.getContext('2d');
  const im = g.createImageData(S, S);
  for (let j = 0; j < S; j++) for (let i = 0; i < S; i++) {
    const x = cx + (i / S - 0.5) * span, z = cz + (j / S - 0.5) * span;
    const h = t.heightAt(x, z); const n = t.normalAt(x, z); const l = Math.max(0, n.x * -0.6 + n.y * 0.6 + n.z * -0.5);
    const gr = t.greenAt(x, z);
    let v = 0.3 + 0.9 * l; const hh = 0.6 + h / 400;
    let R = 200 * v * hh, G = 160 * v * hh, B = 120 * v * hh;
    if (gr > 0.4) { R *= 0.6; G *= 1.1; }
    const o = (j * S + i) * 4; im.data[o] = R; im.data[o + 1] = G; im.data[o + 2] = B; im.data[o + 3] = 255;
  }
  g.putImageData(im, 0, 0);
  g.fillStyle = 'rgba(255,255,255,.9)'; g.strokeStyle = '#000';
  for (const ch of __k.chimneys) { const px = (ch.x - cx) / span * S + S / 2, pz = (ch.z - cz) / span * S + S / 2; if (px < 0 || pz < 0 || px > S || pz > S) continue; g.fillStyle = ch.type === 2 ? '#7cf' : ch.type === 1 ? '#fff' : '#fd6'; g.fillRect(px - 1.5, pz - 1.5, 3, 3); }
  g.font = '12px sans-serif'; g.fillStyle = '#000'; g.strokeStyle = 'rgba(0,0,0,.4)';
  const step = span > 800 ? 100 : 50;
  for (let v = Math.ceil((cx - span / 2) / step) * step; v < cx + span / 2; v += step) { const p = (v - cx) / span * S + S / 2; g.beginPath(); g.moveTo(p, 0); g.lineTo(p, S); g.stroke(); g.fillText(v, p + 2, 12); }
  for (let v = Math.ceil((cz - span / 2) / step) * step; v < cz + span / 2; v += step) { const p = (v - cz) / span * S + S / 2; g.beginPath(); g.moveTo(0, p); g.lineTo(S, p); g.stroke(); g.fillText(v, 2, p - 2); }
  return c.toDataURL('image/png');
}, [+cx, +cz, +span]);
fs.writeFileSync(out, Buffer.from(url.split(',')[1], 'base64'));
await browser.close();
