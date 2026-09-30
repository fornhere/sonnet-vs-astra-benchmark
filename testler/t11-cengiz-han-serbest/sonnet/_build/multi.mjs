import puppeteer from 'puppeteer-core';
// usage: node multi.mjs "<url query>" outprefix t1 t2 ...  (tour times) ; or cam=... lists separated by '|' prefixed with 'c:'
const [,, query, prefix, ...ts] = process.argv;
const w=+process.env.W||1280,h=+process.env.H||720;
const b = await puppeteer.launch({executablePath:'/usr/bin/chromium',headless:'new',args:['--no-sandbox','--use-gl=angle','--use-angle=vulkan','--enable-features=Vulkan','--ignore-gpu-blocklist',`--window-size=${w},${h}`]});
const p = await b.newPage(); await p.setViewport({width:w,height:h});
const seen=new Set();p.on('console',m=>{const t=m.text().slice(0,300);if(!seen.has(t)&&seen.size<12&&!t.includes('Clock')){seen.add(t);console.log('[c]',t)}});
p.on('pageerror',e=>console.log('[err]',e.message));
await p.goto('file://'+process.cwd()+'/../index.html?'+query);
await p.waitForFunction('window.__ready===true',{timeout:120000}); await p.evaluate(()=>{document.getElementById('intro').style.display='none';document.getElementById('fade').style.display='none'}); await new Promise(r=>setTimeout(r,1200));
for (const t of ts){
  if (t.startsWith('c:')) { const a=t.slice(2).split(','); await p.evaluate((a)=>{const d=window.__dbg; d.state.mode='explore'; document.body.dataset.mode='explore'; d.camera.position.set(+a[0],+a[1],+a[2]); d.controls.target.set(+a[3],+a[4],+a[5]); d.camera.fov=+a[6]||35; d.camera.updateProjectionMatrix(); d.camera.lookAt(+a[3],+a[4],+a[5]); d.state.hour=+a[7]; d.state.dbgLook=true;},a); }
  else await p.evaluate((t)=>{window.__dbg.state.t=t; window.__dbg.state.paused=true; window.__dbg.state.mode='tour';},+t);
  const f0 = await p.evaluate('window.__frames'); await p.waitForFunction(`window.__frames>${f0+3}`);
  await new Promise(r=>setTimeout(r,400));
  await p.screenshot({path:`shots/${prefix}_${t.replace(/[^a-z0-9.]/gi,'_')}.png`});
}
await b.close();
