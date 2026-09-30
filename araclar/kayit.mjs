// Tarafsız A/B kaydı: iki modelin sayfası aynı tarayıcı, aynı pencere, aynı senaryo ile kaydedilir.
// Kullanım: node kayit.mjs <index.html> <çıktı-adı> scroll|akici|tur|etkilesim <saniye>
import { chromium } from '/home/forn/oyun-gelistirme/node_modules/playwright/index.mjs';
import { renameSync, mkdirSync } from 'node:fs';
const [, , sayfa, ad, mod, sn] = process.argv; const S = Number(sn) * 1000;
mkdirSync('ham', { recursive: true });
const b = await chromium.launch({ executablePath: '/usr/bin/chromium', headless: true,
  args: ['--ignore-gpu-blocklist', '--enable-gpu', '--use-angle=vulkan', '--enable-features=Vulkan', '--autoplay-policy=no-user-gesture-required'] });
const ctx = await b.newContext({ viewport: { width: 1920, height: 1080 }, recordVideo: { dir: 'ham', size: { width: 1920, height: 1080 } } });
const p = await ctx.newPage();
await p.goto('file://' + sayfa); await p.waitForTimeout(4000);
if (mod === 'scroll') {
  const h = await p.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  const adim = 60, bekle = S / adim;
  for (let i = 1; i <= adim; i++) { await p.mouse.move(960, 540); await p.mouse.wheel(0, h / adim); await p.waitForTimeout(bekle); }
} else if (mod === 'akici') {
  // Kesintisiz kaydırma: sayfanın tamamı S sürede, ~30 ms'de bir küçük tekerlek adımıyla (büyük sıçrama yok; iki modele aynı)
  const h = await p.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  const adim = Math.round(S / 30); await p.mouse.move(960, 540);
  const t0 = Date.now();
  for (let i = 1; i <= adim; i++) { await p.mouse.wheel(0, h / adim); const hedef = t0 + i * 30; const k = hedef - Date.now(); if (k > 0) await p.waitForTimeout(k); }
  await p.waitForTimeout(2000);
} else if (mod === 'etkilesim') {
  // Tarafsız genel etkileşim: ortaya bir tık, 8 sn izle, yavaş sürükleyerek döndür, yakınlaş, 1-4 tuşları, kalan süre izle
  const bas = p.getByRole('button', { name: /yolculu|başlat|başla|begin|start/i }).first();
  if (await bas.count() && await bas.isVisible().catch(() => false)) { await bas.click(); console.log('başlat düğmesi tıklandı'); }
  else await p.mouse.click(960, 540);
  await p.waitForTimeout(8000);
  await p.mouse.move(700, 540); await p.mouse.down();
  for (let i = 0; i < 60; i++) { await p.mouse.move(700 + i * 9, 540 + Math.sin(i / 10) * 20); await p.waitForTimeout(200); }
  await p.mouse.up(); await p.mouse.move(960, 540);
  for (let i = 0; i < 5; i++) { await p.mouse.wheel(0, -240); await p.waitForTimeout(500); }
  for (const k of ['1', '2', '3', '4']) { await p.keyboard.press(k); await p.waitForTimeout(4000); }
  await p.waitForTimeout(Math.max(0, S - 8000 - 12000 - 2500 - 16000));
} else {
  // tur: yalnız açık bir 'başlat' düğmesi varsa bas (keşif/atla düğmelerine basma; tur otomatikse dokunma)
  const d = p.getByRole('button', { name: /yolculuğa başla/i }).first();
  try { await d.waitFor({ state: 'visible', timeout: 15000 }); await d.click(); console.log('tıklandı: Yolculuğa başla'); }
  catch { console.log('başlat düğmesi yok, tur otomatik varsayıldı'); }
  await p.waitForTimeout(S);
}
await ctx.close(); const v = await p.video().path(); await b.close();
renameSync(v, `ham/${ad}.webm`); console.log('kaydedildi', `ham/${ad}.webm`);
