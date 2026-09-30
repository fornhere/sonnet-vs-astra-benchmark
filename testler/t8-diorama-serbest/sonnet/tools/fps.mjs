import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/chromium', headless: 'new', args: ['--no-sandbox', '--ignore-gpu-blocklist', '--enable-gpu', '--use-angle=gl', '--allow-file-access-from-files', '--window-size=1600,900'] });
const p = await b.newPage(); await p.setViewport({ width: 1600, height: 900 });
p.on('pageerror', e => console.log('[pageerror]', e.message));
const t0 = Date.now();
await p.goto('file:///home/forn/sonnet-vs-astra/t8-diorama-serbest/sonnet/index.html'); await p.waitForFunction('window.__ready', { timeout: 60000 }); console.log('ready in', Date.now() - t0, 'ms');
await new Promise(r => setTimeout(r, 3500)); console.log('fps default', await p.evaluate('window.__fps'));
await p.evaluate(process.argv[2] || '0'); await new Promise(r => setTimeout(r, 3500)); console.log('fps view2', await p.evaluate('window.__fps'));
await b.close();
