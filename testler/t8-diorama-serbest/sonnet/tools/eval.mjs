import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/chromium', headless: 'new', args: ['--no-sandbox', '--ignore-gpu-blocklist', '--enable-gpu', '--use-angle=gl', '--allow-file-access-from-files'] });
const p = await b.newPage(); p.on('console', m => console.log('[c]', m.text())); p.on('pageerror', e => console.log('[pageerror]', e.message));
await p.goto('file:///home/forn/sonnet-vs-astra/t8-diorama-serbest/sonnet/index.html'); await p.waitForFunction('window.__ready', { timeout: 60000 });
console.log(JSON.stringify(await p.evaluate(process.argv[2])));
await b.close();
