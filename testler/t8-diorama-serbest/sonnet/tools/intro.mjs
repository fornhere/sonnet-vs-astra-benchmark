import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/chromium', headless: 'new', args: ['--no-sandbox', '--ignore-gpu-blocklist', '--enable-gpu', '--use-angle=gl', '--allow-file-access-from-files', '--window-size=1600,900'] });
const p = await b.newPage(); await p.setViewport({ width: 1600, height: 900 });
p.on('console', m => { const t = m.text(); if (!/PCFSoft/.test(t)) console.log('[c]', t); }); p.on('pageerror', e => console.log('[pageerror]', e.message));
const t0 = Date.now(); await p.goto('file:///home/forn/sonnet-vs-astra/t8-diorama-serbest/sonnet/index.html', { waitUntil: 'domcontentloaded' });
const times = [0.3, 1.0, 2.2, 4.0, 6.5, 9.5]; let i = 0;
for (const t of times) { const wait = t * 1000 - (Date.now() - t0); if (wait > 0) await new Promise(r => setTimeout(r, wait)); await p.screenshot({ path: `/tmp/i_${i++}.png` }); }
await b.close();
