import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/chromium', headless: 'new', args: ['--no-sandbox', '--ignore-gpu-blocklist', '--enable-gpu', '--use-angle=gl', '--allow-file-access-from-files', '--window-size=1600,900'] });
const p = await b.newPage(); await p.setViewport({ width: 1600, height: 900 });
p.on('pageerror', e => console.log('[pageerror]', e.message));
await p.goto('file:///home/forn/sonnet-vs-astra/t8-diorama-serbest/sonnet/index.html'); await p.waitForFunction('window.__ready', { timeout: 60000 });
await new Promise(r => setTimeout(r, 7500));
await p.keyboard.press('t');
const step = +process.argv[2] || 5; const n = +process.argv[3] || 11;
for (let i = 0; i < n; i++) { await new Promise(r => setTimeout(r, step * 1000)); await p.screenshot({ path: `/tmp/t_${String(i).padStart(2, '0')}.png` }); console.log(i, 'fps', await p.evaluate('window.__fps'), 'tour', await p.evaluate('!!window.__cam.rig.tour')); }
await b.close();
