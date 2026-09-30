// kullanım: node tools/shot.mjs debug '<js ifadesi>' out.png [w h]
import puppeteer from 'puppeteer-core';
import path from 'node:path';
const [,, mode, expr, out, W='1600', H='900'] = process.argv;
const root = path.resolve(new URL('..', import.meta.url).pathname);
const browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium', headless: 'new',
  args: ['--no-sandbox','--use-angle=gl','--ignore-gpu-blocklist','--enable-webgl', `--window-size=${W},${H}`] });
const page = await browser.newPage();
await page.setViewport({ width: +W, height: +H, deviceScaleFactor: 1 });
page.on('console', m => console.log('[console]', m.text()));
page.on('pageerror', e => console.log('[pageerror]', e.message));
await page.goto('file://' + root + '/' + (mode === 'debug' ? 'debug.html' : 'index.html'));
if (mode === 'debug') { await page.waitForFunction('window.__ready', { timeout: 20000 }); }
else await new Promise(r => setTimeout(r, 2500));
const r = await page.evaluate(expr);
if (r) console.log('result:', JSON.stringify(r));
await new Promise(r => setTimeout(r, 300));
await page.screenshot({ path: path.join(root, out) });
await browser.close();
