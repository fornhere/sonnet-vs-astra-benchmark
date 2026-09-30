const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
process.env.TMPDIR=path.resolve('.t');fs.mkdirSync(process.env.TMPDIR,{recursive:true});
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox','--enable-webgl','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 const page=await browser.newPage({viewport:{width:1200,height:900},reducedMotion:'reduce'});
 page.setDefaultTimeout(120000);await page.goto('http://localhost:4187/?capture');await page.waitForFunction(()=>window.aure?.webgl,{timeout:60000});
 for(const color of ['sand','night','copper']){
  await page.locator(`.swatch[data-color=${color}]`).click();
  const data=await page.evaluate(()=>aure.captureProduct());fs.writeFileSync(`assets/product-${color}.png`,Buffer.from(data.split(',')[1],'base64'));console.log('Saved '+color);
 }
 await browser.close();
})();
