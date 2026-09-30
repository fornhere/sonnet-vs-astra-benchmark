import puppeteer from 'puppeteer-core';
// kullanım: node tools/shots.mjs out_prefix "js1" "js2" ...   (her js sonrası 4 sn bekler, ekran görüntüsü alır)
const [,, prefix, ...jss] = process.argv;
const b = await puppeteer.launch({ executablePath: '/usr/bin/chromium', headless: 'new', args: ['--no-sandbox', '--ignore-gpu-blocklist', '--enable-gpu', '--use-angle=gl', '--allow-file-access-from-files', '--window-size=1600,900'] });
const p = await b.newPage(); await p.setViewport({ width: 1600, height: 900 });
p.on('console', m => { const t = m.text(); if (!/PCFSoft/.test(t)) console.log('[console]', t); }); p.on('pageerror', e => console.log('[pageerror]', e.message));
await p.goto('file:///home/forn/sonnet-vs-astra/t8-diorama-serbest/sonnet/index.html'); await p.waitForFunction('window.__ready', { timeout: 60000 });
await new Promise(r => setTimeout(r, 7000));
let i = 0; for (const js of jss) { await p.evaluate(js); await new Promise(r => setTimeout(r, 4200)); await p.screenshot({ path: `${prefix}${i}.png` }); console.log('fps', await p.evaluate('window.__fps')); i++; }
await b.close();
