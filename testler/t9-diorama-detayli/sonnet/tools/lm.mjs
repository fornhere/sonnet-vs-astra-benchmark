// node tools/lm.mjs <outdir> key1,key2,... [time] [weather] [w h]  — her simge için ekran görüntüsü (jump)
import puppeteer from 'puppeteer-core';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import fs from 'node:fs';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const [outdir, keysArg = 'overview', time = '0.66', wx = 'clear', w = '1600', h = '900', suffix = '', ui = '1', names = ''] = process.argv.slice(2);
fs.mkdirSync(outdir, { recursive: true });
const browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium', headless: 'new', args: ['--no-sandbox', '--use-gl=angle', '--use-angle=vulkan', '--enable-features=Vulkan', '--ignore-gpu-blocklist', '--allow-file-access-from-files'], defaultViewport: { width: +w, height: +h } });
const page = await browser.newPage(); const errs = [];
page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errs.push(m.type() + ': ' + m.text()); });
page.on('pageerror', (e) => errs.push('pageerror: ' + e.message));
await page.goto(pathToFileURL(path.join(root, 'index.html')).href + suffix);
await page.waitForFunction('window.__ready === true', { timeout: 180000 });
await page.evaluate(`window.__dio.setTime(${time}); window.__dio.setWeather('${wx}'); if(${ui}!==1) document.body.classList.add('photo');`);
const keys = keysArg.split(','); const nm = names ? names.split(',') : keys;
for (let i = 0; i < keys.length; i++) {
  const k = keys[i];
  await page.evaluate(`window.__dio.jump(${k === 'overview' ? 'null' : `'${k}'`})`);
  await new Promise((r) => setTimeout(r, +(process.env.WAIT || (wx === 'snow' ? 6000 : 2200))));
  await page.screenshot({ path: path.join(outdir, `${nm[i]}.png`) });
}
console.log(errs.join('\n') || 'no console errors');
await browser.close();
