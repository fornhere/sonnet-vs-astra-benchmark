import fs from 'node:fs/promises';
const tabs=await(await fetch('http://127.0.0.1:19233/json')).json();
const target=tabs.find(x=>x.type==='page'&&x.url.includes('onizleme.html'));
const ws=new WebSocket(target.webSocketDebuggerUrl);await new Promise(r=>ws.addEventListener('open',r,{once:true}));
let seq=0;const pending=new Map();ws.addEventListener('message',e=>{const m=JSON.parse(e.data);if(m.id){pending.get(m.id)?.(m);pending.delete(m.id);}});
function send(method,params={}){return new Promise(resolve=>{const id=++seq;pending.set(id,resolve);ws.send(JSON.stringify({id,method,params}));});}
await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1050,deviceScaleFactor:1,mobile:false});
const result=await send('Runtime.evaluate',{expression:`(async()=>{const v=document.querySelector('video');v.muted=true;if(v.readyState<2)await new Promise(r=>v.addEventListener('loadeddata',r,{once:true}));const seek=new Promise(r=>v.addEventListener('seeked',r,{once:true}));v.currentTime=6;await seek;await new Promise(r=>setTimeout(r,400));return {duration:v.duration,width:v.videoWidth,height:v.videoHeight,time:v.currentTime,decoded:v.getVideoPlaybackQuality().totalVideoFrames,error:v.error};})()`,awaitPromise:true,returnByValue:true});
const report=result.result?.result?.value??result;console.log(JSON.stringify(report));await fs.writeFile('onizleme/tarayici-kontrol.json',JSON.stringify(report,null,2));
const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});await fs.writeFile('onizleme/video-tarayici.png',Buffer.from(shot.result.data,'base64'));
await send('Browser.close');ws.close();
