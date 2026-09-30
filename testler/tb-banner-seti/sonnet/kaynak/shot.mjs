// Ekran görüntüsü aracı: node shot.mjs <html> <png> <w> <h> [t_ms]
import { createRequire } from 'module';
const require = createRequire('/home/forn/Projects/sinek-beyni/web/node_modules/');
const { chromium } = require('playwright-core');
export async function shoot(jobs) {
  const b = await chromium.launch({ executablePath: '/usr/bin/chromium', args: ['--no-sandbox','--force-color-profile=srgb'] });
  for (const j of jobs) {
    const p = await b.newPage({ viewport: { width: j.w, height: j.h }, deviceScaleFactor: j.dpr || 1 });
    await p.goto('file://' + j.html);
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(150);
    await p.evaluate((t) => { document.getAnimations().forEach(a => { a.pause(); a.currentTime = t; }); }, j.t ?? 9000);
    await p.waitForTimeout(120);
    await p.screenshot({ path: j.png, clip: { x: 0, y: 0, width: j.w, height: j.h } });
    await p.close();
  }
  await b.close();
}
if (process.argv[1].endsWith('shot.mjs')) {
  const [,, html, png, w, h, t] = process.argv;
  await shoot([{ html, png, w: +w, h: +h, t: t ? +t : 9000 }]);
}
