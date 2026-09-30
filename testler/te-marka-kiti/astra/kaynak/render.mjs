import { chromium } from '../.build/node_modules/playwright-core/index.mjs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const browser = await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--font-render-hinting=none'], env:{...process.env,TMPDIR:path.join(root,'.build/tmp')}});
const page = await browser.newPage({viewport:{width:1512,height:1060},deviceScaleFactor:1});
const issues=[];
page.on('pageerror',e=>issues.push(String(e)));
await page.goto(pathToFileURL(path.join(root,'kilavuz.html')).href,{waitUntil:'networkidle'});
await page.evaluate(()=>document.fonts.ready);
await page.screenshot({path:path.join(root,'kontrol/tarayici-masaustu.png')});
const images = await page.locator('img').evaluateAll(imgs=>imgs.map(i=>({src:i.getAttribute('src'),ok:i.complete&&i.naturalWidth>0})));
const sheets=page.locator('.sheet');
const count=await sheets.count();
if(count!==16 || images.some(i=>!i.ok) || issues.length) throw new Error('Guide validation failed');
for(let i=0;i<count;i++){
 await sheets.nth(i).screenshot({path:path.join(root,`kontrol/sayfa-${String(i+1).padStart(2,'0')}.png`)});
}
await page.emulateMedia({media:'print'});
// The PDF travels independently. Do not embed machine-specific file URLs.
await page.locator('a[href]').evaluateAll(links=>links.forEach(a=>{if(!a.getAttribute('href').startsWith('#'))a.removeAttribute('href')}));
await page.pdf({path:path.join(root,'kilavuz.pdf'),preferCSSPageSize:true,printBackground:true,displayHeaderFooter:false,tagged:true,outline:true});
await page.emulateMedia({media:'screen'});
await page.setViewportSize({width:390,height:844});
await page.goto(pathToFileURL(path.join(root,'kilavuz.html')).href,{waitUntil:'networkidle'});
await page.screenshot({path:path.join(root,'kontrol/tarayici-mobil.png')});
const mobile=await page.evaluate(()=>({width:innerWidth,documentWidth:document.documentElement.scrollWidth}));
fs.writeFileSync(path.join(root,'kontrol/tarayici-kontrol.json'),JSON.stringify({issues,images,mobile},null,2));
await page.setViewportSize({width:1080,height:1350});
await page.goto(pathToFileURL(path.join(root,'uygulamalar/demini-al-sosyal-1080x1350.svg')).href);
await page.screenshot({path:path.join(root,'uygulamalar/demini-al-sosyal-1080x1350.png')});
await browser.close();
console.log(JSON.stringify({pdf:'kilavuz.pdf',pages:count,issues,brokenImages:images.filter(x=>!x.ok),mobile}));
