import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const items=JSON.parse(await fs.readFile(path.join(root,'kaynak/manifest.json'),'utf8'));
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox','--disable-gpu']});
const errors=[];const network=[];const results=[];
for (const item of items.filter(i=>i.animated)) {
 const page=await browser.newPage({viewport:{width:item.width,height:item.height},deviceScaleFactor:1});
 page.on('pageerror',e=>errors.push(e.message));
 page.on('request',r=>{if(!r.url().startsWith('http://127.0.0.1:18973/')&&!r.url().startsWith('data:'))network.push(r.url())});
 await page.goto(`http://127.0.0.1:18973/html5/${item.size}/index.html`);
 for (const time of [0,650,1800,6800,14000]) {
  await page.evaluate(t=>{document.getAnimations().forEach(a=>{a.pause();a.currentTime=t})},time);
  await page.screenshot({path:path.join(root,'kontrol',`${item.size}-${time}ms.png`)});
 }
 const metrics=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,scrollHeight:document.documentElement.scrollHeight,adSize:document.querySelector('meta[name="ad.size"]').content,exit:document.querySelector('a').href,animations:document.getAnimations().map(a=>({duration:a.effect.getComputedTiming().endTime,currentTime:a.currentTime}))}));
 await page.emulateMedia({reducedMotion:'reduce'});
 const reduced=await page.evaluate(()=>document.getAnimations().length);
 results.push({size:item.size,bytes:(await fs.stat(path.join(root,'html5',item.size,'index.html'))).size,...metrics,reducedMotionAnimationCount:reduced});
 await page.close();
}
for(const width of [1440,390]){
 const page=await browser.newPage({viewport:{width,height:1000},deviceScaleFactor:1});
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:18973/onizleme.html');
 await page.screenshot({path:path.join(root,'kontrol',`onizleme-${width}.png`),fullPage:true});
 const before=await page.evaluate(()=>({pageWidth:document.documentElement.scrollWidth,viewport:innerWidth,cards:document.querySelectorAll('.card').length,images:[...document.images].every(i=>i.complete&&i.naturalWidth>0)}));
 await page.locator('#allMotion').click();
 await page.waitForTimeout(2100);
 const after=await page.evaluate(()=>({playing:document.querySelectorAll('.card.playing').length,frames:[...document.querySelectorAll('.playing iframe')].map(f=>({width:f.getBoundingClientRect().width,parent:f.parentElement.clientWidth,loaded:!!f.contentDocument?.querySelector('svg')}))}));
 await page.screenshot({path:path.join(root,'kontrol',`onizleme-hareket-${width}.png`),fullPage:true});
 await page.locator('#allMotion').click();
 results.push({previewWidth:width,before,after,stopped:await page.locator('.card.playing').count()});await page.close();
}
await browser.close();
await fs.writeFile(path.join(root,'kontrol','tarayici-raporu.json'),JSON.stringify({errors,externalRequests:network,results},null,2));
console.log(JSON.stringify({errors,externalRequests:network,results},null,2));
if(errors.length||network.length)process.exit(1);
