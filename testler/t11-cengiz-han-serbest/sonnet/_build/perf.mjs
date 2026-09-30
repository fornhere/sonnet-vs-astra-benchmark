import puppeteer from 'puppeteer-core';
const w=+process.env.W||1920,h=+process.env.H||1080;
const b = await puppeteer.launch({executablePath:'/usr/bin/chromium',headless:'new',args:['--no-sandbox','--use-gl=angle','--use-angle=vulkan','--enable-features=Vulkan','--ignore-gpu-blocklist',`--window-size=${w},${h}`]});
const p = await b.newPage(); await p.setViewport({width:w,height:h,deviceScaleFactor:1});
p.on('pageerror',e=>console.log('[err]',e.message));
await p.goto('file://'+process.cwd()+'/../index.html?t=1');
await p.waitForFunction('window.__ready===true',{timeout:120000});
for (const t of [3,20,45,70,88,104]) {
  await p.evaluate((t)=>{const d=window.__dbg; d.state.t=t; d.state.paused=false; d.state.mode='tour'; d.state.dbg=true},t);
  await new Promise(r=>setTimeout(r,800));
  const f0=await p.evaluate('window.__frames'); const t0=Date.now();
  await new Promise(r=>setTimeout(r,4000));
  const f1=await p.evaluate('window.__frames'); console.log('t',t,'fps',((f1-f0)/((Date.now()-t0)/1000)).toFixed(1));
}
await b.close();
