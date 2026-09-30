// Node 22+ yerleşik WebSocket API ile çevrimdışı tarayıcı kontrolü.
import { spawn } from 'node:child_process';
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
const root=resolve(import.meta.dirname,'..');
const profile=resolve(root,'kontrol/chromium-qa');
await mkdir(profile,{recursive:true});
await rm(resolve(profile,'DevToolsActivePort'),{force:true});
const proc=spawn('chromium',['--headless','--no-sandbox','--disable-gpu','--disable-dev-shm-usage','--remote-debugging-port=0',`--user-data-dir=${profile}`,'about:blank'],{stdio:'ignore'});
const pause=ms=>new Promise(r=>setTimeout(r,ms));
let ws;
try{
  let port;
  for(let i=0;i<70;i++){try{port=(await readFile(resolve(profile,'DevToolsActivePort'),'utf8')).split('\n')[0];if(port)break;}catch{}await pause(100);}
  if(!port)throw Error('Chromium debug portu açılmadı.');
  const targets=await (await fetch(`http://127.0.0.1:${port}/json`)).json();
  ws=new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);
  await new Promise((res,rej)=>{ws.onopen=res;ws.onerror=rej;});
  let id=0;const pending=new Map();
  ws.onmessage=e=>{const o=JSON.parse(e.data);if(o.id){const p=pending.get(o.id);pending.delete(o.id);o.error?p.reject(o.error):p.resolve(o.result);}};
  const send=(method,params={})=>new Promise((resolve,reject)=>{const n=++id;pending.set(n,{resolve,reject});ws.send(JSON.stringify({id:n,method,params}));});
  const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride',{width:1600,height:900,deviceScaleFactor:1,mobile:false});
  await send('Page.navigate',{url:pathToFileURL(resolve(root,'sunum.html')).href});
  for(let i=0;i<40;i++){if(await evaluate('document.readyState==="complete" && !!document.querySelector(".slide.active")'))break;await pause(100);}
  await evaluate('document.fonts.ready.then(()=>true)');
  const checks=[];
  for(let i=0;i<12;i++){
    const actual=await evaluate('document.querySelector(".slide.active").id');
    if(actual!==`s${i+1}`)throw Error(`Gezinme hatası: ${actual}`);
    const overflow=await evaluate(`(()=>{const s=document.querySelector('.slide.active');const sr=s.getBoundingClientRect();return [...s.querySelectorAll('h1,h2,h3,p,footer,td,th,.eyebrow,.measure,.exit')].flatMap(e=>{const r=e.getBoundingClientRect();return r.left<sr.left-1||r.right>sr.right+1||r.top<sr.top-1||r.bottom>sr.bottom+1?[e.textContent]:[]})})()`);
    if(overflow.length)throw Error(`Taşma ${i+1}: ${overflow}`);
    checks.push({slide:i+1,navigation:'ok',bounds:'ok'});
    if(i===3){const img=await send('Page.captureScreenshot',{format:'png'});await writeFile(resolve(root,'kontrol/tarayici-04.png'),Buffer.from(img.data,'base64'));}
    await send('Input.dispatchKeyEvent',{type:'keyDown',key:'ArrowRight',code:'ArrowRight',windowsVirtualKeyCode:39});
  }
  await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Home',code:'Home',windowsVirtualKeyCode:36});
  if(await evaluate('location.hash')!=='#s1')throw Error('Home tuşu başarısız.');
  await send('Input.dispatchKeyEvent',{type:'keyDown',key:'End',code:'End',windowsVirtualKeyCode:35});
  if(await evaluate('location.hash')!=='#s12')throw Error('End tuşu başarısız.');
  await writeFile(resolve(root,'kontrol/tarayici-kontrol.json'),JSON.stringify({slides:checks,homeEnd:'ok',externalAssets:await evaluate('[...document.querySelectorAll("img[src],link[href],script[src]")].map(e=>e.src||e.href).filter(s=>/^https?:/.test(s))')},null,2));
  console.log('12 slayt: metin sınırları ve klavye gezinmesi doğrulandı. Dış ağ varlığı yok.');
}finally{if(ws)ws.close();proc.kill();}
