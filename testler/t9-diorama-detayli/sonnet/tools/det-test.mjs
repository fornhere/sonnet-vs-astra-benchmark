// Determinizm + ses testi
import puppeteer from 'puppeteer-core';
import path from 'node:path'; import { fileURLToPath, pathToFileURL } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium', headless: 'new', args: ['--no-sandbox', '--use-gl=angle', '--use-angle=vulkan', '--enable-features=Vulkan', '--ignore-gpu-blocklist', '--allow-file-access-from-files', '--autoplay-policy=no-user-gesture-required'], defaultViewport: { width: 1280, height: 720 } });
const sums = [];
for (let i = 0; i < 2; i++) {
  const page = await browser.newPage(); await page.goto(pathToFileURL(path.join(root, 'index.html')).href); await page.waitForFunction('window.__ready === true', { timeout: 120000 });
  const info = await page.evaluate('window.__info()'); sums.push(info.checksum); console.log('yükleme', i + 1, info.checksum, 'üretilen görünür yüz (statik):', info.staticVoxelFaces, 'toplam:', info.totalVisibleFaces, 'draw calls/kare:', info.drawCalls, 'üçgen:', info.tris);
  if (i === 0) {
    await page.evaluate("window.__audio.toggle()"); await new Promise((r) => setTimeout(r, 800));
    const rms = await page.evaluate(async () => { const a = window.__audio; const an = a.ctx.createAnalyser(); an.fftSize = 2048; a.master.connect(an); await new Promise((r) => setTimeout(r, 1500)); const buf = new Float32Array(an.fftSize); an.getFloatTimeDomainData(buf); let s = 0, nan = 0; for (const v of buf) { if (Number.isNaN(v)) nan++; s += v * v; } return { rms: Math.sqrt(s / buf.length), nan, state: a.ctx.state }; });
    console.log('ses RMS', JSON.stringify(rms));
    await page.evaluate("window.__audio.toggle()");
  }
  await page.close();
}
console.log(sums[0] === sums[1] ? 'DETERMINISTIK: iki açılış aynı' : 'FARKLI!');
await browser.close();
