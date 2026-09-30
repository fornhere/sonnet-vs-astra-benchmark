import puppeteer from 'puppeteer-core';
const root='/home/forn/sonnet-vs-astra/t4-lansman-sayfasi/sonnet';
const browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium', headless: 'new', args: ['--no-sandbox','--use-angle=gl','--ignore-gpu-blocklist','--window-size=1600,900'] });
const page = await browser.newPage(); await page.setViewport({width:1600,height:900});
const errs=[]; page.on('pageerror', e => errs.push(e.message)); page.on('console', m => { if (m.type()==='error'||m.type()==='warning') errs.push(m.text()); });
await page.goto('file://'+root+'/index.html'); await new Promise(r=>setTimeout(r,4000));
const goto = async (id,p)=>{ await page.evaluate((id,p)=>{ const el=document.getElementById(id); const top=el.getBoundingClientRect().top+scrollY; scrollTo(0, top+p*(el.offsetHeight-innerHeight)); },id,p); await new Promise(r=>setTimeout(r,200)); await page.evaluate(()=>window.__m.settle()); await new Promise(r=>setTimeout(r,1200)); };
// FPS ölç
await goto('s1',0.2);
const fps = await page.evaluate(()=>new Promise(res=>{ let n=0; const t0=performance.now(); const f=()=>{ n++; if(performance.now()-t0>2000) res(n/2); else requestAnimationFrame(f); }; requestAnimationFrame(f); }));
console.log('fps(headless, 1600x900):', fps);
// finiş: kırmızı-bakır
await goto('s5',0.85);
await page.click('#swatches .sw:nth-child(3)');
await new Promise(r=>setTimeout(r,2200));
await page.screenshot({path: root+'/shots/i_finish3.png'});
await page.click('#swatches .sw:nth-child(2)');
await new Promise(r=>setTimeout(r,2200));
await page.screenshot({path: root+'/shots/i_finish2.png'});
// şehir
await goto('s4',0.6);
await page.evaluate(()=>{ [...document.querySelectorAll('#cities .chip')].find(b=>b.textContent==='Van').click(); });
await new Promise(r=>setTimeout(r,1500));
await page.screenshot({path: root+'/shots/i_city.png'});
// sipariş
await page.evaluate(()=>document.querySelector('.nav [data-order]').click());
await new Promise(r=>setTimeout(r,900));
await page.screenshot({path: root+'/shots/i_dialog.png'});
await page.type('#ord-mail','deneme@ornek.com');
await page.click('#ordform button[type=submit]');
await new Promise(r=>setTimeout(r,800));
await page.screenshot({path: root+'/shots/i_done.png'});
console.log('errors:', errs);
await browser.close();
