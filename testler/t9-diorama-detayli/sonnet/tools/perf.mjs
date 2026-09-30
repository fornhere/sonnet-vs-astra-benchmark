// node tools/perf.mjs [suffix]  — 1920x1080, vsync/limiter kapalı, çeşitli sahnelerde ortalama fps
import puppeteer from 'puppeteer-core';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const suffix = process.argv[2] || '';
const browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium', headless: 'new', args: ['--no-sandbox', '--use-gl=angle', '--use-angle=vulkan', '--enable-features=Vulkan', '--ignore-gpu-blocklist', '--disable-frame-rate-limit', '--disable-gpu-vsync', '--allow-file-access-from-files', '--window-size=1920,1080'], defaultViewport: { width: 1920, height: 1080 } });
const page = await browser.newPage(); const errs = [];
page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errs.push(m.text()); }); page.on('pageerror', (e) => errs.push(e.message));
const t0 = Date.now();
await page.goto(pathToFileURL(path.join(root, 'index.html')).href + suffix);
await page.waitForFunction('window.__ready === true', { timeout: 180000 });
console.log('yükleme+üretim süresi (ms):', Date.now() - t0);
const scenes = [['genel bakış, gün batımı', 'null', 0.66, 'clear'], ['Midtown yakın plan', "'esb'", 0.66, 'clear'], ['Times Square, gece', "'times'", 1.0, 'clear'], ['genel bakış, karlı', 'null', 0.66, 'snow'], ['genel bakış, sisli', 'null', 0.33, 'fog'], ['Özgürlük Heykeli', "'liberty'", 0.33, 'clear']];
const out = [];
for (const [name, key, t, wx] of scenes) {
  await page.evaluate(`window.__dio.setTime(${t}); window.__dio.setWeather('${wx}'); window.__dio.jump(${key});`);
  await new Promise((r) => setTimeout(r, wx === 'snow' ? 4000 : 1500));
  const r = await page.evaluate(() => new Promise((res) => { const f0 = window.__frames, t0 = performance.now(); const ts = []; let last = performance.now(); const tick = () => { const n = performance.now(); ts.push(n - last); last = n; if (n - t0 < 5000) requestAnimationFrame(tick); else { ts.sort((a, b) => a - b); const avg = ts.reduce((a, b) => a + b, 0) / ts.length; res({ frames: ts.length, avgMs: avg, fps: 1000 / avg, p99Ms: ts[Math.floor(ts.length * 0.99)], minFps: 1000 / ts[ts.length - 1] }); } }; requestAnimationFrame(tick); }));
  const info = await page.evaluate('JSON.stringify({calls: window.__dio.renderer.info.render.calls, tris: window.__dio.renderer.info.render.triangles})');
  out.push({ name, ...r, info }); console.log(name.padEnd(28), r.fps.toFixed(0).padStart(4), 'fps  avg', r.avgMs.toFixed(2), 'ms  p99', r.p99Ms.toFixed(2), 'ms', info);
}
console.log(errs.join('\n') || 'no console errors');
await browser.close();
