import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox','--disable-dev-shm-usage'],env:{...process.env,TMPDIR:path.resolve('calisma')}});
const page=await browser.newPage({viewport:{width:1400,height:1000},deviceScaleFactor:1});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('file://'+path.resolve('rapor.html'));await page.evaluate(()=>document.fonts.ready);
for(let i=1;i<=7;i++){await page.locator('#s'+i).screenshot({path:`calisma/rapor-${i}.png`});}
const boxes=await page.locator('.page').evaluateAll(nodes=>nodes.map(n=>({id:n.id,height:n.clientHeight,scroll:n.scrollHeight,footer:n.querySelector('footer').getBoundingClientRect().top-n.getBoundingClientRect().top,last:n.querySelector('footer').previousElementSibling.getBoundingClientRect().bottom-n.getBoundingClientRect().top})));
await page.locator('#commission').fill('0');await page.locator('#commission').dispatchEvent('input');const zero=await page.locator('#stress-result').textContent();
await page.locator('#commission').fill('20');await page.locator('#commission').dispatchEvent('input');const twenty=await page.locator('#stress-result').textContent();
await page.locator('#commission').fill('10');await page.locator('#commission').dispatchEvent('input');
await page.pdf({path:'rapor.pdf',format:'A4',landscape:true,printBackground:true,preferCSSPageSize:true});
await page.setViewportSize({width:390,height:844});await page.screenshot({path:'calisma/mobil.png',fullPage:true});
const mobile=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));
await fs.writeFile('calisma/tarayici-kontrol.json',JSON.stringify({errors,boxes,zero,twenty,mobile},null,2));
console.log({errors,boxes,zero,twenty,mobile});await browser.close();
