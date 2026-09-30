// Sayfada JS çalıştırıp sonucu yazdırır: node tools/eval.mjs "<query>" "<js>"
import puppeteer from 'puppeteer-core';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const q = process.argv[2] || 'ui=0&adapt=0&nostrike=1';
const js = process.argv[3];
const browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium', headless: true,
  args: ['--no-sandbox', '--use-angle=vulkan', '--enable-features=Vulkan', '--ignore-gpu-blocklist', '--window-size=1920,1080', '--allow-file-access-from-files'],
  defaultViewport: { width: 1920, height: 1080 } });
const page = await browser.newPage();
page.on('console', (m) => console.log('[console]', m.text()));
page.on('pageerror', (e) => console.log('[pageerror]', e.message));
await page.goto(pathToFileURL(path.resolve('index.html')).href + '?' + q, { waitUntil: 'load' });
await page.waitForFunction(() => window.__kiz, { timeout: 30000 });
await new Promise((r) => setTimeout(r, 2500));
const r = await page.evaluate(js);
console.log(JSON.stringify(r, null, 1));
await browser.close();
