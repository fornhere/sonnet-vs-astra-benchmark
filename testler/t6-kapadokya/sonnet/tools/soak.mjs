import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium', headless: 'new', args: ['--no-sandbox', '--use-angle=gl', '--ignore-gpu-blocklist', '--window-size=1280,720'] });
const page = await browser.newPage(); await page.setViewport({ width: 1280, height: 720 });
let errs = 0;
page.on('console', m => { const t = m.text(); if (m.type() === 'error' || /warn/i.test(m.type())) { if (!/GL Driver|deprecated/.test(t)) { errs++; console.log('[' + m.type() + ']', t.slice(0, 200)); } } });
page.on('pageerror', e => { errs++; console.log('[pageerror]', e.message); });
await page.goto('file://' + process.cwd() + '/index.html');
await page.waitForFunction(() => document.querySelector('#bFree') && !document.querySelector('#bFree').classList.contains('hidden'), { timeout: 180000 });
await page.click('#bFree');
await new Promise(r => setTimeout(r, 1500));
await page.mouse.click(640, 360);
const keys = ['KeyW', 'KeyA', 'KeyS', 'KeyD', 'Space', 'ShiftLeft'];
const t0 = Date.now();
let n = 0;
while (Date.now() - t0 < 45000) {
  const k = keys[Math.floor(Math.random() * keys.length)];
  await page.keyboard.down(k); await new Promise(r => setTimeout(r, 200 + Math.random() * 600)); await page.keyboard.up(k);
  if (n % 9 === 0) await page.keyboard.press('KeyF');
  if (n % 13 === 0) await page.keyboard.press('KeyT');
  if (n % 17 === 0) { await page.keyboard.press('KeyM'); await new Promise(r => setTimeout(r, 300)); await page.keyboard.press('KeyM'); }
  n++;
}
const info = await page.evaluate(() => ({ pos: __k.S.player.pos, hour: __k.S.hour, mem: performance.memory && Math.round(performance.memory.usedJSHeapSize / 1e6), geos: __k.renderer.info.memory.geometries, tex: __k.renderer.info.memory.textures, pr: __k.renderer.getPixelRatio(), disc: [...__k.ui.disc] }));
console.log(JSON.stringify(info), 'errors:', errs);
await browser.close();
