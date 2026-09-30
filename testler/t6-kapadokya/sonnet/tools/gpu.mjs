import puppeteer from 'puppeteer-core';
const [,, pose = "__k.set(482,60,-850, 466,40,-629, 6.5, 60)"] = process.argv;
const browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium', headless: 'new', args: ['--no-sandbox', '--use-angle=gl', '--ignore-gpu-blocklist', '--window-size=1920,1080'] });
const page = await browser.newPage(); await page.setViewport({ width: 1920, height: 1080 });
page.on('pageerror', e => console.log('[pageerror]', e.message));
await page.goto('file://' + process.cwd() + '/index.html?dev=1');
await page.waitForFunction('window.__ready === true', { timeout: 120000 });
const cfgs = {
  base: '',
  'terrain off': '__k.terrain.group.visible=false',
  'chimneys off': '__k.chm.group.visible=false',
  'trees off': '__k.trees.group.visible=false',
  'town+decals off': '__k.town.group.visible=false; __k.decals.group.visible=false',
};
for (const [name, js] of Object.entries(cfgs)) {
  const r = await page.evaluate(async ([pose, js, name]) => {
    // hepsini aç
    __k.scene.traverse(o => { if (o.isMesh || o.isGroup || o.isPoints) o.visible = true; });
    __k.renderer.setPixelRatio(1); __k.post.composer.setPixelRatio(1); __k.post.composer.setSize(1920, 1080);
    eval(pose); __k.S.state = 'dev';
    eval(js);
    const gl = __k.renderer.getContext();
    // asenkron döngüyü durdur: kendi döngümüz
    const times = [];
    for (let i = 0; i < 40; i++) { const t0 = performance.now(); __k.post.composer.render(0.016); gl.finish(); times.push(performance.now() - t0); await new Promise(r => setTimeout(r, 0)); }
    times.splice(0, 8); times.sort((a, b) => a - b);
    return { median: times[Math.floor(times.length / 2)].toFixed(1) };
  }, [pose, js, name]);
  console.log(name, JSON.stringify(r));
}
await browser.close();
