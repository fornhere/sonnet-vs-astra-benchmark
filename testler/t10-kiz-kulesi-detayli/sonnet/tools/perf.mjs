// Tam 60 sn'lik kamera döngüsü boyunca fps ölçümü.
// node tools/perf.mjs "<query>" <saniye> [novsync]
import puppeteer from 'puppeteer-core';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const q = process.argv[2] || 'adapt=0&nostrike=0';
const secs = Number(process.argv[3] || 62);
const novsync = process.argv[4] === 'novsync';
const args = ['--no-sandbox', '--use-angle=vulkan', '--enable-features=Vulkan', '--ignore-gpu-blocklist', '--window-size=1920,1080', '--allow-file-access-from-files'];
if (novsync) args.push('--disable-gpu-vsync', '--disable-frame-rate-limit');
const browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium', headless: process.env.HEADED ? false : true, args, defaultViewport: process.env.HEADED ? null : { width: 1920, height: 1080 } });
const page = await browser.newPage();
const errs = [];
page.on('console', (m) => { if (['error', 'warning'].includes(m.type())) errs.push(m.type() + ': ' + m.text()); });
page.on('pageerror', (e) => errs.push('pageerror: ' + e.message));
await page.goto(pathToFileURL(path.resolve('index.html')).href + '?ui=0&' + q, { waitUntil: 'load' });
await page.waitForFunction(() => window.__kiz, { timeout: 30000 });
// kare süresi örneği (her kare)
await page.evaluate(() => {
  window.__ft = []; let last = performance.now();
  window.__hit = [];
  const loop = () => { const n = performance.now(); const d = n - last; window.__ft.push(d); if (d > 24) window.__hit.push([Math.round(window.__kiz.state.camTime * 10) / 10, Math.round(d), window.__kiz.lightning.active ? 'L' : '']); last = n; requestAnimationFrame(loop); };
  requestAnimationFrame(loop);
});
await new Promise((r) => setTimeout(r, 2000));
await page.evaluate(() => { window.__ft.length = 0; window.__hit.length = 0; });
await new Promise((r) => setTimeout(r, secs * 1000));
const r = await page.evaluate(() => {
  const a = window.__ft.slice().sort((x, y) => x - y);
  const avg = a.reduce((s, v) => s + v, 0) / a.length;
  const pct = (p) => a[Math.min(a.length - 1, Math.floor(a.length * p))];
  return { frames: a.length, avgFps: 1000 / avg, avgMs: avg, p50ms: pct(0.5), p95ms: pct(0.95), p99ms: pct(0.99), maxMs: a[a.length - 1], minFps: 1000 / a[a.length - 1], scale: window.__kiz.scale(), res: [window.__kiz.renderer.domElement.width, window.__kiz.renderer.domElement.height], gpu: (() => { const g = window.__kiz.gpuLog.map((x) => x[1]).sort((a, b) => a - b); if (!g.length) return null; return { n: g.length, avg: g.reduce((s, v) => s + v, 0) / g.length, p50: g[Math.floor(g.length * .5)], p95: g[Math.floor(g.length * .95)], p99: g[Math.floor(g.length * .99)], max: g[g.length - 1] }; })(), gpuBySec: (() => { const b = {}; for (const [t, ms] of window.__kiz.gpuLog) { const k = Math.floor(t / 5) * 5; (b[k] = b[k] || []).push(ms); } return Object.fromEntries(Object.entries(b).map(([k, v]) => [k, +(v.reduce((s, x) => s + x, 0) / v.length).toFixed(2) + '/' + Math.max(...v).toFixed(1)])); })(), cpu: (() => { const g = window.__kiz.cpuLog.map((x) => x[1]).sort((a, b) => a - b); if (!g.length) return null; return { avg: g.reduce((s, v) => s + v, 0) / g.length, p50: g[Math.floor(g.length * .5)], p95: g[Math.floor(g.length * .95)], p99: g[Math.floor(g.length * .99)], max: g[g.length - 1] }; })(), sect: (() => { const s = window.__kiz.sect; return s[5] ? ['cam+light', 'env', 'updates', 'cube', 'post'].map((n, i) => n + ':' + (s[i] / s[5]).toFixed(2)) : null; })(), strikes: window.__kiz.lightning.count, hits: window.__hit.slice(0, 60), camT: window.__kiz.state.camTime };
});
console.log(JSON.stringify(r));
console.log('HATALAR', errs.length, errs.slice(0, 5));
await browser.close();
