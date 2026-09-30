import puppeteer from 'puppeteer-core';
// kullanım: node tools/tour.mjs onek t1,t2,t3 [W H]
const [,, prefix, times, W = '960', Hh = '540'] = process.argv;
const browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium', headless: 'new', args: ['--no-sandbox', '--use-angle=gl', '--ignore-gpu-blocklist', `--window-size=${W},${Hh}`] });
const page = await browser.newPage(); await page.setViewport({ width: +W, height: +Hh });
page.on('console', m => { const t = m.text(); if (!/GL Driver|Clock|CONTEXT|Context/.test(t)) console.log('[page]', t); });
page.on('pageerror', e => console.log('[pageerror]', e.message));
await page.goto('file://' + process.cwd() + '/index.html?dev=1');
await page.waitForFunction('window.__ready === true', { timeout: 120000 }); await page.evaluate(() => { document.body.classList.add('photo'); document.querySelector('#loader').style.display = 'none'; document.querySelector('#pause').classList.add('hidden'); });
for (const t of times.split(',')) {
  const shot = await page.evaluate((t) => __k.tourAt(+t), t);
  await new Promise(r => setTimeout(r, 900));
  await page.screenshot({ path: `${prefix}_${String(t).padStart(2, '0')}.png` });
  console.log('t=' + t, shot);
}
await browser.close();
