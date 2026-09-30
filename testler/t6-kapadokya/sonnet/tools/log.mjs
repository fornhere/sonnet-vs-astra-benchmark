import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium', headless: 'new', args: ['--no-sandbox', '--use-angle=gl', '--ignore-gpu-blocklist'] });
const page = await browser.newPage();
page.on('console', m => { console.log('[c]', m.text().slice(0, 400)); });
page.on('pageerror', e => console.log('[pageerror]', e.message));
await page.goto('file://' + process.cwd() + '/index.html');
for (let i = 0; i < 40; i++) { await new Promise(r => setTimeout(r, 500)); const s = await page.evaluate(() => document.querySelector('#loader .status').textContent); console.log(i, s); if (s === 'Hazır') break; }
await browser.close();
