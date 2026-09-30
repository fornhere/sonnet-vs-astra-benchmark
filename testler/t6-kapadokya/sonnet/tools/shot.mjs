import puppeteer from 'puppeteer-core';
import fs from 'fs';
// kullanım: node tools/shot.mjs cikti.png '<js ifadesi>' [genişlik yükseklik] [bekleme ms]
const [,, out, js = '', W = '1280', Hh = '720', wait = '1500'] = process.argv;
const browser = await puppeteer.launch({
  executablePath: '/usr/bin/chromium', headless: 'new',
  args: ['--no-sandbox', '--use-angle=gl', '--ignore-gpu-blocklist', `--window-size=${W},${Hh}`, '--autoplay-policy=no-user-gesture-required'],
});
const page = await browser.newPage();
await page.setViewport({ width: +W, height: +Hh });
page.on('console', m => console.log('[page]', m.text()));
page.on('pageerror', e => console.log('[pageerror]', e.message));
await page.goto('file://' + process.cwd() + '/index.html?dev=1', { waitUntil: 'load' });
await page.waitForFunction('window.__ready === true', { timeout: 120000 });
if (js) await page.evaluate(js);
await new Promise(r => setTimeout(r, +wait));
await page.screenshot({ path: out });
const info = await page.evaluate(() => { const gl = window.__k.renderer.getContext(); const e = gl.getExtension('WEBGL_debug_renderer_info'); return e ? gl.getParameter(e.UNMASKED_RENDERER_WEBGL) : 'n/a'; });
console.log('GL:', info);
await browser.close();
