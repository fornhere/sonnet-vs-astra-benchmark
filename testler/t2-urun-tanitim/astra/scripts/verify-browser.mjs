import puppeteer from '../.cache/npm/_npx/702923228c2ce1e6/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js';
import path from 'node:path';
import fs from 'node:fs/promises';
const browser=await puppeteer.launch({executablePath:'/usr/bin/chromium',headless:true,userDataDir:path.resolve('.cache/verify-browser'),args:['--no-sandbox','--disable-gpu','--autoplay-policy=no-user-gesture-required']});
try {
const page=await browser.newPage();await page.setViewport({width:1440,height:1080,deviceScaleFactor:1});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('file://'+path.resolve('izleme.html'),{waitUntil:'load'});
await page.waitForFunction(()=>document.querySelector('video').readyState>=1);
await page.evaluate(async()=>{let v=document.querySelector('video');v.muted=true;await v.play();v.pause();v.currentTime=33;await new Promise(r=>v.addEventListener('seeked',r,{once:true}));});
await page.screenshot({path:'qa/browser-playback.png'});
const result=await page.evaluate(()=>{let v=document.querySelector('video');return{duration:v.duration,width:v.videoWidth,height:v.videoHeight,currentTime:v.currentTime,readyState:v.readyState,error:v.error?.message??null}});
result.pageErrors=errors;await fs.writeFile('qa/browser-playback.json',JSON.stringify(result,null,2));console.log(result);
} finally {await browser.close()}
