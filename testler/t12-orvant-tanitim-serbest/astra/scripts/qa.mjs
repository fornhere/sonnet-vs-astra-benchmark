import puppeteer from '../.npm-cache/_npx/702923228c2ce1e6/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js';
const browser=await puppeteer.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox','--disable-dev-shm-usage'],userDataDir:process.cwd()+'/qa/chrome'});
const page=await browser.newPage();await page.setViewport({width:1920,height:1080,deviceScaleFactor:1});page.on('pageerror',e=>console.error(e.message));await page.goto('http://127.0.0.1:8765/player.html',{waitUntil:'networkidle0'});await page.evaluate(()=>document.fonts.ready);await page.evaluate(()=>document.getElementById('play').style.display='none');
for(const t of [1.5,5.5,10.5,20.5,29.5,40.5,45.5,49.5]){await page.evaluate(t=>window.seek(t),t);await page.screenshot({path:`qa/frame-${t}.png`});}
console.log(await page.evaluate(()=>({fonts:document.fonts.status,timelines:Object.keys(window.__timelines),duration:window.SCENES.reduce((x,s)=>x+s[1],0)})));
await browser.close();
