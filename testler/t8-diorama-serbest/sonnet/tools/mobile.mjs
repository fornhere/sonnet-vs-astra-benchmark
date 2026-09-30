import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/chromium', headless: 'new', args: ['--no-sandbox', '--ignore-gpu-blocklist', '--enable-gpu', '--use-angle=gl', '--allow-file-access-from-files'] });
const p = await b.newPage(); await p.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
p.on('pageerror', e => console.log('[pageerror]', e.message));
await p.goto('file:///home/forn/sonnet-vs-astra/t8-diorama-serbest/sonnet/index.html'); await p.waitForFunction('window.__ready', { timeout: 60000 });
await new Promise(r => setTimeout(r, 9000)); await p.screenshot({ path: '/tmp/mob.png' }); console.log('fps', await p.evaluate('window.__fps'));
await b.close();
