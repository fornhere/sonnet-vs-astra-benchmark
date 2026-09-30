const {chromium}=require('playwright');const fs=require('fs');const path=require('path');const assert=require('node:assert/strict');
process.env.TMPDIR=path.resolve('.t');
(async()=>{const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox','--disable-webgl'],headless:true});try{
 const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});const failed=[];page.on('requestfailed',r=>failed.push(r.url()));
 await page.goto('file://'+path.resolve('index.html'));await page.waitForFunction(()=>document.documentElement.classList.contains('webgl-unavailable'));await page.evaluate(()=>document.fonts.ready);
 assert(await page.evaluate(()=>document.fonts.check('500 16px Manrope')));assert(await page.evaluate(()=>document.fonts.check('italic 16px "Instrument Serif"')));
 assert(await page.locator('.scene-fallback').evaluate(el=>el.complete&&el.naturalWidth===1000));
 await page.locator('.swatch[data-color=copper]').click();await page.waitForFunction(()=>document.querySelector('.scene-fallback').complete);assert((await page.locator('.scene-fallback').getAttribute('src')).includes('copper'));await page.screenshot({path:'qa/mobile-fallback.png'});
 await page.locator('.header-order').click();await page.locator('.color-option[data-color=night]').click();assert((await page.locator('#config-scene').evaluate(el=>getComputedStyle(el).backgroundImage)).includes('night'));
 assert.deepEqual(failed,[]);fs.writeFileSync('qa/fallback-results.json',JSON.stringify({passed:true,checks:['Local fonts work over file://','WebGL-free page displays product images','Fallback images respond to color selection','All assets load offline without failed requests']},null,2));console.log('PASS offline fonts, WebGL fallback, fallback colors and local assets');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exit(1)});
