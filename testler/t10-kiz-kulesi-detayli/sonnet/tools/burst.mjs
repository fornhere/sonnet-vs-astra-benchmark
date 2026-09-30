// Sıçrama parçacıklarını yakalamak için belirli kamerada art arda kare alır.
import puppeteer from 'puppeteer-core';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const out = process.argv[2]; const cam = process.argv[3].split('/').map(Number); const n = Number(process.argv[4] || 10); const gap = Number(process.argv[5] || 1300);
const browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium', headless: true,
  args: ['--no-sandbox', '--use-angle=vulkan', '--enable-features=Vulkan', '--ignore-gpu-blocklist', '--window-size=1920,1080', '--allow-file-access-from-files'],
  defaultViewport: { width: 1920, height: 1080 } });
const page = await browser.newPage();
await page.goto(pathToFileURL(path.resolve('index.html')).href + '?ui=0&adapt=0&nostrike=1&storm=1&hold=1', { waitUntil: 'load' });
await page.waitForFunction(() => window.__kiz, { timeout: 30000 });
await page.evaluate((c) => { const k = window.__kiz; k.rig.setMode('free'); k.camera.position.set(c[0], c[1], c[2]); k.rig.controls.target.set(c[3], c[4], c[5]); k.camera.fov = c[6] || 45; k.camera.updateProjectionMatrix(); k.rig.controls.update(); }, cam);
for (let i = 0; i < n; i++) {
  await new Promise((r) => setTimeout(r, gap));
  const alive = await page.evaluate(() => { const d = window.__kiz.spray.data; let a = 0; for (let j = 0; j < d.length; j += 4) if (d[j] >= 0) a++; return a; });
  await page.screenshot({ path: `${out}/burst_${i}.png` });
  console.log(i, 'aktif parçacık', alive);
}
await browser.close();
