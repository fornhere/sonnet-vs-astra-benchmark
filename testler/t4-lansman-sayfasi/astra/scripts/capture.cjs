const {chromium}=require('playwright');
process.env.TMPDIR=require('path').resolve('.t');require('fs').mkdirSync(process.env.TMPDIR,{recursive:true});
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox','--enable-webgl','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1,reducedMotion:"reduce"});
 page.on('pageerror',e=>console.log('PAGE ERROR',e.message));page.on('console',m=>{if(m.type()==='warning'||m.type()==='error')console.log(m.type(),m.text())});
 page.setDefaultTimeout(120000);await page.goto('http://localhost:4187');await page.waitForFunction(()=>window.aure?.webgl,{timeout:30000});await page.waitForTimeout(2200);
 await page.screenshot({path:'qa/desktop-hero.png'});
 console.log(await page.evaluate(()=>({webgl:aure.webgl,frames:aure.frames,width:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight,sections:[...document.querySelectorAll('.chapter')].map(e=>({id:e.id,y:e.offsetTop,height:e.offsetHeight}))})));
 for(const id of ['tasarim','akustik','hayatin-icinde','sana-ait']){
  await page.evaluate(id=>{document.documentElement.style.scrollBehavior='auto';window.scrollTo(0,document.getElementById(id).getBoundingClientRect().top+window.scrollY)},id);await page.waitForTimeout(2200);await page.screenshot({path:`qa/desktop-${id}.png`});
 }
 await page.setViewportSize({width:390,height:844});await page.evaluate(()=>window.scrollTo(0,0));await page.waitForTimeout(2200);await page.screenshot({path:'qa/mobile-hero.png'});
 for(const id of ['tasarim','akustik','sana-ait']){
  await page.evaluate(id=>window.scrollTo(0,document.getElementById(id).getBoundingClientRect().top+window.scrollY),id);await page.waitForTimeout(2200);await page.screenshot({path:`qa/mobile-${id}.png`});
 }
 await browser.close();
})();
