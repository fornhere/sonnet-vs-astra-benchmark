// Headless Chromium ile ekran görüntüsü: node tools/shot.mjs out.png "<js>" [w h] [url-suffix]
import puppeteer from 'puppeteer-core';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const [out, js = '', w = '1600', h = '900', suffix = ''] = process.argv.slice(2);
const browser = await puppeteer.launch({
  executablePath: '/usr/bin/chromium', headless: 'new',
  args: ['--no-sandbox', '--use-gl=angle', '--use-angle=vulkan', '--enable-features=Vulkan', '--ignore-gpu-blocklist', '--enable-gpu-rasterization', '--enable-unsafe-swiftshader', `--window-size=${w},${h}`, '--allow-file-access-from-files'],
  defaultViewport: { width: +w, height: +h },
});
const page = await browser.newPage();
const errs = [];
page.on('console', (m) => { const t = m.text(); if (m.type() === 'error' || m.type() === 'warning' || t.startsWith('[dio]')) errs.push(m.type() + ': ' + t); });
page.on('pageerror', (e) => errs.push('pageerror: ' + e.message));
await page.goto(pathToFileURL(path.join(root, 'index.html')).href + suffix, { waitUntil: 'load' });
await page.waitForFunction('window.__ready === true', { timeout: 120000 }).catch(() => errs.push('TIMEOUT waiting __ready'));
if (js) await page.evaluate(js);
await new Promise((r) => setTimeout(r, +(process.env.WAIT || 1500)));
await page.screenshot({ path: out });
const info = await page.evaluate('window.__info ? JSON.stringify(window.__info()) : ""');
console.log(info);
console.log(errs.join('\n') || 'no console errors');
await browser.close();
