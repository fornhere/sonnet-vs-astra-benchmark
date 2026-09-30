import puppeteer from 'puppeteer-core';
const url = process.argv[2], out = process.argv[3], w=+process.argv[4]||1280, h=+process.argv[5]||720;
const b = await puppeteer.launch({executablePath:'/usr/bin/chromium',headless:'new',args:['--no-sandbox','--use-gl=angle','--use-angle=vulkan','--enable-features=Vulkan','--ignore-gpu-blocklist','--enable-unsafe-webgpu',`--window-size=${w},${h}`]});
const p = await b.newPage(); await p.setViewport({width:w,height:h});
const seen=new Set();p.on('console',m=>{const t=m.text().slice(0,300);if(!seen.has(t)&&seen.size<12){seen.add(t);console.log('[c]',t)}}); p.on('pageerror',e=>console.log('[err]',e.message));
await p.goto(url); 
try{ await p.waitForFunction('window.__ready===true',{timeout:120000}); }catch(e){console.log('timeout')}
await new Promise(r=>setTimeout(r,+process.argv[6]||1500));
await p.screenshot({path:out}); await b.close();
