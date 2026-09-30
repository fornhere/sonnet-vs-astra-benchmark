// Ön izleme görüntülerini üretir: node tools/onizleme.mjs  → onizleme/*.png  (1920x1080, headless Chromium + GPU)
import puppeteer from 'puppeteer-core';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'onizleme'); fs.mkdirSync(out, { recursive: true });
const browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium', headless: 'new', args: ['--no-sandbox', '--use-gl=angle', '--use-angle=vulkan', '--enable-features=Vulkan', '--ignore-gpu-blocklist', '--allow-file-access-from-files', '--window-size=1920,1080'], defaultViewport: { width: 1920, height: 1080 } });
const page = await browser.newPage(); const errs = [];
page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errs.push(m.type() + ': ' + m.text()); }); page.on('pageerror', (e) => errs.push('pageerror: ' + e.message));
await page.goto(pathToFileURL(path.join(root, 'index.html')).href);
await page.waitForFunction('window.__ready === true', { timeout: 180000 });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const shot = async (name, { key = null, t = 0.66, wx = 'clear', ui = true, wait = 2400, pose = null } = {}) => {
  await page.evaluate(`(()=>{const d=window.__dio; d.setTime(${t}); d.setWeather('${wx}'); d.jump(${key ? `'${key}'` : 'null'}); document.body.classList.toggle('photo', ${!ui}); ${pose ? `Object.assign(d.rig.cur, ${JSON.stringify(pose)}); Object.assign(d.rig.goal, d.rig.cur);` : ''} })()`);
  await sleep(wx === 'snow' ? 7000 : wait);
  await page.screenshot({ path: path.join(out, name + '.png') }); console.log('✓', name);
};
await shot('00-genel-bakis-gun-batimi', {});
const L = ['liberty:ozgurluk-heykeli', 'wtc:one-world-trade-center', 'brooklyn:brooklyn-koprusu', 'flatiron:flatiron', 'esb:empire-state-building', 'times:times-square', 'gct:grand-central', 'chrysler:chrysler-building', 'rock:rockefeller-center', 'park:central-park'];
L.forEach(() => 0);
for (let i = 0; i < L.length; i++) { const [k, n] = L[i].split(':'); await shot(`${String(i + 1).padStart(2, '0')}-${n}`, { key: k }); }
await shot('11-gece-genel-bakis', { t: 1.0 });
await shot('12-gece-times-square', { key: 'times', t: 1.0 });
await shot('13-gece-brooklyn-koprusu', { key: 'brooklyn', t: 1.0 });
await shot('14-gece-empire-chrysler', { key: 'chrysler', t: 1.0 });
await shot('15-gece-ozgurluk-heykeli', { key: 'liberty', t: 1.0 });
await shot('20-karli-genel-bakis', { wx: 'snow' });
await shot('21-karli-empire-state', { key: 'esb', wx: 'snow' });
await shot('22-karli-gece-central-park', { key: 'park', wx: 'snow', t: 1.0 });
await shot('30-sisli-genel-bakis', { wx: 'fog', t: 0.33 });
await shot('31-safak-genel-bakis', { t: 0.0, ui: false });
await shot('32-ogle-genel-bakis', { t: 0.33, ui: false });
await shot('33-ust-gorunum-midtown-sokak-izgarasi', { t: 0.33, ui: false, pose: { tx: 100, ty: 2, tz: 330, az: 0, pol: 0.32, rad: 240 } });
await shot('34-kaide-plakasi-ve-kesit', { t: 0.66, ui: false, pose: { tx: -8, ty: -4, tz: 500, az: -1.35, pol: 1.32, rad: 130 } });
await shot('35-fotograf-modu', { key: 'wtc', ui: false });
console.log(errs.join('\n') || 'no console errors');
await browser.close();
