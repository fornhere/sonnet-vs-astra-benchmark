import puppeteer from 'puppeteer-core';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium', headless: true,
  args: ['--no-sandbox', '--use-angle=vulkan', '--enable-features=Vulkan', '--ignore-gpu-blocklist', '--window-size=1920,1080', '--allow-file-access-from-files', '--autoplay-policy=no-user-gesture-required'],
  defaultViewport: { width: 1920, height: 1080 } });
const page = await browser.newPage();
const errs = [];
page.on('console', (m) => { if (['error','warning'].includes(m.type())) errs.push(m.type()+': '+m.text()); });
page.on('pageerror', (e) => errs.push('pageerror: ' + e.message));
await page.goto(pathToFileURL(path.resolve('index.html')).href + '?t=26&nostrike=1&adapt=0', { waitUntil: 'load' });
await page.waitForFunction(() => window.__kiz, { timeout: 30000 });
await new Promise((r) => setTimeout(r, 2500));
await page.screenshot({ path: process.argv[2] + '/ui_intro.png' });
await new Promise((r) => setTimeout(r, 5000));
await page.screenshot({ path: process.argv[2] + '/ui_panel.png' });
// serbest kamera: sürükle
await page.mouse.move(900, 500); await page.mouse.down(); await page.mouse.move(700, 430, { steps: 12 }); await page.mouse.up();
await page.mouse.wheel({ deltaY: -600 });
await new Promise((r) => setTimeout(r, 1800));
await page.screenshot({ path: process.argv[2] + '/ui_free.png' });
console.log('mode', await page.evaluate(() => window.__kiz.state.camMode));
// sinematiğe dön
await page.click('#bBack');
await new Promise((r) => setTimeout(r, 2500));
console.log('mode after back', await page.evaluate(() => window.__kiz.state.camMode));
// ses aç
await page.click('#bSound');
await new Promise((r) => setTimeout(r, 1500));
console.log('audio', await page.evaluate(() => ({ on: window.__kiz.state.soundOn, st: window.__kiz.audio.ctx && window.__kiz.audio.ctx.state })));
// fotoğraf modu
await page.click('#bPhoto');
await new Promise((r) => setTimeout(r, 800));
await page.screenshot({ path: process.argv[2] + '/ui_photo.png' });
console.log('photo hidden ui', await page.evaluate(() => document.body.classList.contains('ui-hidden')));
// PNG indirme testi
const dl = await page.evaluate(() => { let called = false; const orig = HTMLAnchorElement.prototype.click; HTMLAnchorElement.prototype.click = function () { called = this.download + ' ' + this.href.slice(0, 30); }; document.getElementById('pDl').click(); HTMLAnchorElement.prototype.click = orig; return called; });
console.log('download', dl);
console.log('ERRORS', errs);
await browser.close();
