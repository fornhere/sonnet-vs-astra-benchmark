// Headless Chromium (gerçek GPU) ile ekran görüntüsü alır.
// Kullanım: node tools/shot.mjs <outDir> "<isim>:<kamera_t>[:storm[:day[:bekleme_sn[:extra]]]]" ...
import puppeteer from 'puppeteer-core';
import path from 'node:path';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';

const out = process.argv[2] || 'onizleme';
const specs = process.argv.slice(3);
fs.mkdirSync(out, { recursive: true });
const root = path.resolve('.');
const url0 = process.env.URL || pathToFileURL(path.join(root, 'index.html')).href;

const browser = await puppeteer.launch({
  executablePath: '/usr/bin/chromium', headless: true,
  args: ['--no-sandbox', '--use-angle=vulkan', '--enable-features=Vulkan', '--ignore-gpu-blocklist', '--enable-gpu-rasterization',
    '--autoplay-policy=no-user-gesture-required', '--window-size=1920,1080', '--allow-file-access-from-files'],
  defaultViewport: { width: 1920, height: 1080, deviceScaleFactor: 1 },
});
const page = await browser.newPage();
const errors = [];
page.on('console', (m) => { if (['error', 'warning'].includes(m.type())) errors.push(`[${m.type()}] ${m.text()}`); });
page.on('pageerror', (e) => errors.push('[pageerror] ' + e.message));

for (const spec of specs) {
  const [name, t, storm, day, wait, extra] = spec.split(':');
  const q = new URLSearchParams({ ui: '0', adapt: '0', hold: '1', t: t ?? '0' });
  if (storm !== undefined && storm !== '') q.set('storm', storm);
  if (day !== undefined && day !== '') q.set('day', day);
  if (extra) for (const kv of extra.split(',')) { const [k, v] = kv.split('='); q.set(k, v); }
  let cam = null; if (q.has('cam')) { cam = q.get('cam'); q.delete('cam'); }
  const url = url0 + '?' + q.toString();
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForFunction(() => window.__kiz, { timeout: 30000 }).catch(() => {});
  if (cam) { const c = cam.split('/').map(Number); await page.evaluate((c) => { const k = window.__kiz; k.rig.setMode('free'); k.camera.position.set(c[0], c[1], c[2]); k.rig.controls.target.set(c[3], c[4], c[5]); if (c[6]) { k.camera.fov = c[6]; k.camera.updateProjectionMatrix(); } k.rig.controls.update(); }, c); }
  await new Promise((r) => setTimeout(r, Number(wait || 4) * 1000));
  if (process.env.STRIKE) { await page.evaluate((h) => { window.__kiz.strike({ manual: true }); window.__kiz.lightning.hold = h; }, Number(process.env.STRIKE_T || 0.05)); await new Promise((r) => setTimeout(r, 400)); }
  const file = path.join(out, name + '.png');
  await page.screenshot({ path: file, type: 'png' });
  const info = await page.evaluate(() => window.__kiz ? ({ fps: window.__kiz.fpsLog.slice(-4), camT: window.__kiz.state.camTime.toFixed(1) }) : 'KIZ YOK').catch((e) => e.message);
  console.log(name, 'ok', JSON.stringify(info));
}
console.log('KONSOL HATALARI:', errors.length);
errors.slice(0, 30).forEach((e) => console.log(e));
await browser.close();
