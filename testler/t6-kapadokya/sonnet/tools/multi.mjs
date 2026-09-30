import puppeteer from 'puppeteer-core';
// kullanım: node tools/multi.mjs onek 'x,y,z,tx,ty,tz,h,fov' ...   (y mutlak)
const [,, prefix, ...poses] = process.argv;
const W = 960, Hh = 540;
const browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium', headless: 'new', args: ['--no-sandbox', '--use-angle=gl', '--ignore-gpu-blocklist', `--window-size=${W},${Hh}`] });
const page = await browser.newPage(); await page.setViewport({ width: W, height: Hh });
page.on('pageerror', e => console.log('[pageerror]', e.message));
await page.goto('file://' + process.cwd() + '/index.html?dev=1');
await page.waitForFunction('window.__ready === true', { timeout: 120000 });
await page.evaluate(() => { document.body.classList.add('photo'); document.querySelector('#loader').style.display = 'none'; document.querySelector('#pause').classList.add('hidden'); document.querySelector('#hud').style.display='none'; });
let i = 0;
for (const p of poses) {
  const v = p.split(',').map(Number);
  // y değerleri zemine göre: ay,ly ekle
  await page.evaluate((v) => { const g = (x, z) => __k.terrain.heightAt(x, z); __k.set(v[0], g(v[0], v[2]) + v[1], v[2], v[3], g(v[3], v[5]) + v[4], v[5], v[6], v[7]); }, v);
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: `${prefix}_${i}.png` }); i++;
}
await browser.close();
