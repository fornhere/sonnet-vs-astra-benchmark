import puppeteer from 'puppeteer-core';
const [,, url, out, w='1600', h='900', wait='4000', js=''] = process.argv;
const b = await puppeteer.launch({ executablePath: '/usr/bin/chromium', headless: 'new', args: ['--no-sandbox', '--ignore-gpu-blocklist', '--enable-gpu', '--use-angle=gl', '--enable-webgl', '--allow-file-access-from-files', `--window-size=${w},${h}`] });
const p = await b.newPage(); await p.setViewport({ width: +w, height: +h });
p.on('console', m => console.log('[console]', m.text())); p.on('pageerror', e => console.log('[pageerror]', e.message));
await p.goto(url, { waitUntil: 'load' });
await new Promise(r => setTimeout(r, +wait));
if (js) { await p.evaluate(js); await new Promise(r => setTimeout(r, 1500)); }
await p.screenshot({ path: out });
await b.close();
