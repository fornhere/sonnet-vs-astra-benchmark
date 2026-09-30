// kullanım: node tools/pageshot.mjs out_prefix W H scrollPx1 scrollPx2 ...   (px veya "s3:0.5" biçimi: sahne:ilerleme)
import puppeteer from 'puppeteer-core';
import path from 'node:path';
const [,, prefix, W, H, ...poss] = process.argv;
const root = path.resolve(new URL('..', import.meta.url).pathname);
const browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium', headless: 'new',
  args: ['--no-sandbox','--use-angle=gl','--ignore-gpu-blocklist','--enable-webgl', `--window-size=${W},${H}`] });
const page = await browser.newPage();
await page.setViewport({ width: +W, height: +H, deviceScaleFactor: 1 });
page.on('console', m => console.log('[console]', m.text()));
page.on('pageerror', e => console.log('[pageerror]', e.message));
await page.goto('file://' + root + '/index.html');
await new Promise(r => setTimeout(r, 3500));
for (const spec of poss) {
  let px;
  if (spec.startsWith('s')) {
    const [id, p] = spec.slice(1).split(':');
    px = await page.evaluate((id, p) => { const el = id === 'x' ? document.getElementById('specs') : document.getElementById('s' + id); const top = el.getBoundingClientRect().top + scrollY; return top + (+p) * (el.offsetHeight - innerHeight); }, id, p);
  } else px = +spec;
  await page.evaluate((px) => { scrollTo(0, px); }, px);
  await new Promise(r => setTimeout(r, 200));
  await page.evaluate(() => window.__m.settle());
  await new Promise(r => setTimeout(r, 1500));
  const f = path.join(root, 'shots', `${prefix}_${spec.replace(/[:.]/g,'_')}.png`);
  await page.screenshot({ path: f });
  console.log('saved', f);
}
await browser.close();
