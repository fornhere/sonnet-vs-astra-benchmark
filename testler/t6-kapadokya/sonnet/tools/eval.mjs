import puppeteer from 'puppeteer-core';
const [,, js] = process.argv;
const browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium', headless: 'new', args: ['--no-sandbox', '--use-angle=gl', '--ignore-gpu-blocklist'] });
const page = await browser.newPage();
page.on('pageerror', e => console.log('[pageerror]', e.message));
await page.goto('file://' + process.cwd() + '/index.html?dev=1');
await page.waitForFunction('window.__ready === true', { timeout: 120000 });
console.log(JSON.stringify(await page.evaluate(js)));
await browser.close();
