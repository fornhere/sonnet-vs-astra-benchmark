const {chromium}=require('playwright');
const assert=require('node:assert/strict');const fs=require('fs');const path=require('path');
process.env.TMPDIR=path.resolve('.t');fs.mkdirSync(process.env.TMPDIR,{recursive:true});
let base=process.env.AURE_URL;let server;
const checks=[];const pass=(name)=>{checks.push(name);console.log('PASS '+name);};
(async()=>{
 if(!base){
  server=require('node:http').createServer((req,res)=>{
   const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
   const file=path.resolve('.','.'+(pathname==='/'?'/index.html':pathname));
   if(!file.startsWith(process.cwd()+path.sep)){res.writeHead(403);res.end();return;}
   fs.readFile(file,(err,data)=>{if(err){res.writeHead(404);res.end();return;}const ext=path.extname(file);res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'application/javascript','.css':'text/css','.ttf':'font/ttf','.svg':'image/svg+xml','.jpg':'image/jpeg','.png':'image/png'})[ext]||'application/octet-stream');res.end(data);});
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));base='http://127.0.0.1:'+server.address().port;
 }
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox','--enable-webgl','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 try{
 const context=await browser.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:1,reducedMotion:'reduce'});
 const page=await context.newPage();const errors=[],missing=[],external=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)missing.push(r.url());});page.on('request',r=>{if(!r.url().startsWith(base)&&!r.url().startsWith('data:'))external.push(r.url());});
 page.setDefaultTimeout(120000);await page.goto(base);await page.waitForFunction(()=>window.aure?.webgl,{timeout:60000});await page.waitForTimeout(500);
 assert.equal(await page.title(),'aure 01 — Sesin saf hâli.');pass('3D initializes with local assets');
 await page.screenshot({path:'qa/desktop-hero.png'});
 await page.locator('.swatch[data-color=copper]').click();assert.equal(await page.evaluate(()=>aure.color),'copper');assert.equal(await page.locator('[data-color="copper"][aria-pressed="true"]').count(),2);pass('Both color selectors stay synchronized');
 await page.locator('.swatch[data-color=sand]').click();
 async function jump(id,offset=0){await page.evaluate(({id,offset})=>{document.documentElement.style.scrollBehavior='auto';scrollTo(0,document.getElementById(id).getBoundingClientRect().top+scrollY+offset)}, {id,offset});await page.waitForTimeout(650);}
 await jump('tasarim');await page.screenshot({path:'qa/desktop-tasarim.png'});
 await jump('akustik');await page.screenshot({path:'qa/desktop-akustik.png'});
 const color=await page.locator('.stage-background').evaluate(el=>getComputedStyle(el).backgroundColor);assert.notEqual(color,'rgb(239, 237, 231)');pass('Scroll changes product scene and background');
 await page.locator('#sound-toggle').click();assert.equal(await page.evaluate(()=>aure.audio),true);assert.equal(await page.locator('#sound-toggle').getAttribute('aria-pressed'),'true');await page.locator('#sound-toggle').click();assert.equal(await page.evaluate(()=>aure.audio),false);pass('User-initiated audio starts and stops');
 await jump('hayatin-icinde');await page.screenshot({path:'qa/desktop-hayatin-icinde.png'});
 await jump('sana-ait');await page.locator('.color-option[data-color=night]').click();await page.screenshot({path:'qa/desktop-night.png'});
 const before=await page.locator('#config-scene').screenshot();await page.locator('#config-scene').focus();await page.keyboard.press('ArrowRight');await page.keyboard.press('ArrowRight');const after=await page.locator('#config-scene').screenshot();assert(!before.equals(after));await page.locator('#reset-view').click();pass('3D product can rotate with keyboard and reset');
 await page.locator('#reserve-button').click();assert(await page.locator('#reserve-dialog').evaluate(el=>el.open));await page.keyboard.press('Escape');assert.equal(await page.locator('#reserve-dialog').evaluate(el=>el.open),false);pass('Dialog supports Escape and focus restoration');
 await page.locator('#reserve-button').click();await page.locator('#reserve-form button[type=submit]').click();assert.equal(await page.locator('#reserve-form-view').isVisible(),true);await page.locator('#name').fill('Deniz');await page.locator('#email').fill('deniz@example.com');await page.locator('[name=consent]').check();await page.locator('#reserve-form button[type=submit]').click();assert(await page.locator('#reserve-success').isVisible());let record=await page.evaluate(()=>JSON.parse(localStorage.getItem('aure-demo-reservation')));assert.equal(record.name,'Deniz');assert.equal(record.color,'night');await page.screenshot({path:'qa/reservation-success.png'});await page.locator('#reserve-success [data-close]').click();pass('Form validates, stores chosen color locally, confirms success');
 await page.locator('.color-option[data-color=sand]').click();await jump('sana-ait');await page.screenshot({path:'qa/desktop-sana-ait.png'});
 await page.locator('.spec-list summary').first().click();assert(await page.locator('.spec-list details').first().evaluate(el=>el.open));pass('Technical specification accordions work');
 await page.locator('#privacy-button').click();await page.locator('#clear-data').click();assert.equal(await page.evaluate(()=>localStorage.getItem('aure-demo-reservation')),null);await page.keyboard.press('Escape');pass('Privacy control deletes the local demo record');
 for(const width of [320,390,768,1024,1440]){
  await page.setViewportSize({width,height:width<=390?844:900});await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(450);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Overflow at ${width}`);
  if(width===768){await page.screenshot({path:'qa/tablet-hero.png'});await jump('tasarim');await page.screenshot({path:'qa/tablet-tasarim.png'});}
  if(width===390){await page.screenshot({path:'qa/mobile-hero.png'});for(const id of ['tasarim','akustik','sana-ait']){await jump(id);await page.screenshot({path:`qa/mobile-${id}.png`});}}
 }
 pass('No horizontal overflow at 320, 390, 768, 1024 and 1440 pixels');
 await page.setViewportSize({width:1440,height:900});await page.goto('file://'+path.resolve('index.html'));await page.waitForFunction(()=>window.aure?.webgl,{timeout:60000});assert.equal((await page.locator('h1').innerText()).replace(/\s+/g,' ').trim(),'Sesin saf hâli.');pass('index.html opens directly via file:// without a server');
 assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);assert.deepEqual(external.filter(x=>!x.startsWith('file:')),[]);pass('No JavaScript errors, failed assets or external runtime requests');
 fs.writeFileSync('qa/results.json',JSON.stringify({passed:true,checks,errors,missing},null,2));
 }finally{await browser.close();server?.close();}
})().catch(e=>{console.error(e);process.exit(1)});
