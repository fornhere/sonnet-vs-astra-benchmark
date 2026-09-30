import {test,expect} from '@playwright/test';
import {pathToFileURL} from 'node:url';
import path from 'node:path';
const local=pathToFileURL(path.resolve('index.html')).href;
const ready=async page=>{await page.goto(local);await expect(page.locator('.loading')).toHaveClass(/loaded/);await page.waitForFunction(()=>getComputedStyle(document.getElementById('loading')).opacity==='0');await page.evaluate(()=>document.fonts.ready);};
test('offline desktop: landmarks, lighting, camera, notes and postcard',async({page})=>{
 const errors=[],remote=[];page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(/^https?:/.test(r.url()))remote.push(r.url());});
 await ready(page);await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:'screenshots/01-overview.png'});
 await page.locator('[data-place="park"]').click();await expect(page.locator('#place-title')).toHaveText('The city’s green heart.');await expect.poll(()=>page.evaluate(()=>window.__borough.camera.zoom)).toBeCloseTo(2.55,1);await page.screenshot({path:'screenshots/02-park.png'});
 await page.locator('#time-slider').fill('100');await expect(page.locator('body')).toHaveClass(/night/);await expect(page.locator('#time-label')).toHaveText('CITY LIGHTS');
 await page.locator('[data-place="empire"]').click();await expect.poll(()=>page.evaluate(()=>window.__borough.camera.zoom)).toBeCloseTo(2.8,1);await page.screenshot({path:'screenshots/03-night.png'});
 await page.locator('#labels-button').click();await expect(page.locator('.landmark-pin:not(.hidden)')).toHaveCount(0);await page.locator('#labels-button').click();
 await page.locator('#reset-view').click();await expect.poll(()=>page.evaluate(()=>window.__borough.camera.zoom)).toBeCloseTo(1,2);
 await page.screenshot({path:'screenshots/06-night-overview.png'});
 const position=await page.evaluate(()=>window.__borough.camera.position.toArray());await page.mouse.move(900,490);await page.mouse.down();await page.mouse.move(1080,510,{steps:4});await page.mouse.up();await expect.poll(()=>page.evaluate(()=>window.__borough.camera.position.toArray())).not.toEqual(position);
 await page.locator('#zoom-in').click();await expect.poll(()=>page.evaluate(()=>window.__borough.camera.zoom)).toBeGreaterThan(1.2);
 await page.locator('#orbit-button').click();await expect(page.locator('#orbit-button')).toHaveClass(/active/);await page.locator('#orbit-button').click();
 await page.locator('#sound-button').click();await expect(page.locator('#sound-button')).toHaveClass(/active/);await page.locator('#sound-button').click();
 await page.locator('#guide-button').click();await expect(page.locator('#guide')).toBeVisible();await page.keyboard.press('Escape');await expect(page.locator('#guide')).not.toBeVisible();
 await page.locator('#reset-view').click();await page.locator('#time-slider').fill('38');await expect.poll(()=>page.evaluate(()=>window.__borough.camera.zoom)).toBeCloseTo(1,2);
 const dl=page.waitForEvent('download');await page.locator('#capture-button').click();const download=await dl;await download.saveAs('screenshots/07-postcard.png');expect(download.suggestedFilename()).toBe('borough-manhattan-postcard.png');
 await page.locator('[data-place="bridge"]').click();await expect.poll(()=>page.evaluate(()=>window.__borough.camera.zoom)).toBeCloseTo(3.15,1);await expect(page.locator('#toast')).not.toHaveClass(/visible/);await page.screenshot({path:'screenshots/08-bridge.png'});
 console.log('Scene diagnostics:',await page.evaluate(()=>({counts:window.__borough.counts,render:window.__borough.renderer.info.render})));
 expect(errors).toEqual([]);expect(remote).toEqual([]);
});
test('mobile: the complete island, landmark information and touch layout',async({browser})=>{
 const context=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true});const page=await context.newPage();await ready(page);await page.screenshot({path:'screenshots/04-mobile.png'});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBe(390);
 await page.locator('[data-place="downtown"]').tap();await expect(page.locator('.place-card')).toBeVisible();await expect(page.locator('#place-title')).toHaveText('The skyline starts here.');await expect.poll(()=>page.evaluate(()=>window.__borough.camera.zoom)).toBeCloseTo(2.75,1);await page.screenshot({path:'screenshots/05-mobile-detail.png'});
 await page.locator('#reset-view').tap();await expect(page.locator('.intro')).toBeVisible();await context.close();
});
test('standard laptop viewport and keyboard navigation',async({page})=>{
 await page.setViewportSize({width:1366,height:768});await ready(page);await page.screenshot({path:'screenshots/09-laptop.png'});
 await page.keyboard.press('+');await expect.poll(()=>page.evaluate(()=>window.__borough.camera.zoom)).toBeGreaterThan(1.1);await page.keyboard.press('Home');await expect.poll(()=>page.evaluate(()=>window.__borough.camera.zoom)).toBeCloseTo(1,2);
 await page.keyboard.press('Space');await expect(page.locator('#orbit-button')).toHaveClass(/active/);await page.keyboard.press('Space');await expect(page.locator('#orbit-button')).not.toHaveClass(/active/);
});
