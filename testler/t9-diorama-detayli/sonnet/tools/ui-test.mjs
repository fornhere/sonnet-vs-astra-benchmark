// Arayüz davranış testi (headless Chromium): KEŞFET paneli, 1–9 tuşları, etiket, kart, zaman/hava, fotoğraf modu, boşta tur
import puppeteer from 'puppeteer-core';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const shotDir = process.argv[2] || '/tmp/shots/ui';
import fs from 'node:fs'; fs.mkdirSync(shotDir, { recursive: true });
const browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium', headless: 'new', args: ['--no-sandbox', '--use-gl=angle', '--use-angle=vulkan', '--enable-features=Vulkan', '--ignore-gpu-blocklist', '--allow-file-access-from-files'], defaultViewport: { width: 1600, height: 900 } });
const page = await browser.newPage(); const errs = []; const res = {};
page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errs.push(m.text()); }); page.on('pageerror', (e) => errs.push(e.message));
await page.goto(pathToFileURL(path.join(root, 'index.html')).href);
await page.waitForFunction('window.__ready === true', { timeout: 180000 });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const cam = () => page.evaluate('JSON.stringify(window.__dio.rig.cur)').then(JSON.parse);
const dist = (a, b) => Math.hypot(a.tx - b[0], a.tz - b[2]);
await sleep(800);
// 1) satıra tıkla → uçuş (1.5 sn) + kart
const row = await page.$('.row[data-k="esb"]'); await row.click(); await sleep(400);
res.flightStarted = await page.evaluate('!!window.__dio.rig.flight');
await sleep(1500);
let c = await cam(); const f = await page.evaluate('window.__dio.focus.esb.t');
res.esbArrived = dist(c, f) < 2; res.cardVisible = await page.evaluate("document.getElementById('card').classList.contains('show') && document.getElementById('cardt').textContent");
await page.screenshot({ path: shotDir + '/1-esb-click.png' });
// 2) 1–9 tuşları
for (const k of ['1', '3', '9', '0']) { await page.keyboard.press(k); await sleep(1900); c = await cam(); const key = await page.evaluate("document.querySelector('.row.on')?.dataset.k"); res['key' + k] = key; }
await page.screenshot({ path: shotDir + '/2-key0-park.png' });
// 3) Esc → genel bakış
await page.keyboard.press('Escape'); await sleep(1900); c = await cam(); res.escOverview = Math.abs(c.rad - 800) < 3; res.escCardHidden = !(await page.evaluate("document.getElementById('card').classList.contains('show')"));
// 4) üzerine gelince etiket
await page.evaluate("window.__dio.jump('wtc')"); await sleep(600);
const p = await page.evaluate(() => { const d = window.__dio; const v = new d.THREE.Vector3(d.focus.wtc.t[0], 26, d.focus.wtc.t[2]).project(d.camera); return [(v.x * 0.5 + 0.5) * innerWidth, (-v.y * 0.5 + 0.5) * innerHeight]; });
await page.mouse.move(p[0] + 1, p[1] + 1); await page.mouse.move(p[0], p[1]); await sleep(400);
res.hoverTip = await page.evaluate("document.getElementById('tip').classList.contains('show') && document.getElementById('tip').textContent");
await page.screenshot({ path: shotDir + '/3-hover.png' });
// 5) fotoğraf modu
await page.click('#bPhoto'); await sleep(600); res.photoHidesUI = await page.evaluate("getComputedStyle(document.querySelector('.panel')).opacity === '0'");
await page.screenshot({ path: shotDir + '/4-photo.png' });
const dl = await page.evaluate(() => new Promise((r) => { const orig = HTMLAnchorElement.prototype.click; HTMLAnchorElement.prototype.click = function () { r(this.download + ' ' + this.href.slice(0, 20)); HTMLAnchorElement.prototype.click = orig; }; document.getElementById('pSave').click(); }));
res.pngDownload = dl; await page.keyboard.press('Escape'); await sleep(400); res.photoExit = await page.evaluate("!document.body.classList.contains('photo')");
// 6) zaman + hava
await page.evaluate("document.getElementById('tslider').value = 1000; document.getElementById('tslider').dispatchEvent(new Event('input'))"); await sleep(500);
res.nightUniform = await page.evaluate('window.__dio.lighting.k.night');
await page.click('#wx .btn[data-w="snow"]'); await sleep(3500); res.snowVisible = await page.evaluate('window.__dio.weather.mesh.visible');
await page.screenshot({ path: shotDir + '/5-night-snow.png' });
await page.click('#wx .btn[data-w="clear"]'); await page.evaluate("document.getElementById('tslider').value = 660; document.getElementById('tslider').dispatchEvent(new Event('input'))");
// 7) boşta 20 sn → tur, girdi → durur
await page.evaluate("window.__dio.jump(null)"); await page.evaluate("window.__dio.rig.tourOn = true"); await page.mouse.move(5, 5);
const t0 = Date.now(); let tourAt = null;
while (Date.now() - t0 < 26000) { await sleep(500); if (await page.evaluate('!!window.__dio.rig.tour')) { tourAt = (Date.now() - t0) / 1000; break; } }
res.tourStartedAfterSec = tourAt; await sleep(2500); await page.screenshot({ path: shotDir + '/6-tour.png' });
await page.keyboard.press('a'); await sleep(300); res.tourStoppedOnKey = await page.evaluate('!window.__dio.rig.tour');
console.log(JSON.stringify(res, null, 1)); console.log(errs.join('\n') || 'no console errors');
await browser.close();
