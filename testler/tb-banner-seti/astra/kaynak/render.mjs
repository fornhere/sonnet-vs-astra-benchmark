import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const manifest = JSON.parse(await fs.readFile(path.join(root,'kaynak/manifest.json'),'utf8'));
const browser = await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox','--disable-gpu','--allow-file-access-from-files']});
for (const item of manifest) {
 const page = await browser.newPage({viewport:{width:item.width,height:item.height},deviceScaleFactor:1});
 const svg = await fs.readFile(path.join(root,'kaynak/svg',item.size+'.svg'),'utf8');
 await page.setContent('<html><head><style>html,body{margin:0;overflow:hidden}svg{display:block}</style></head><body>'+svg+'</body></html>');
 await page.screenshot({path:path.join(root,'png',item.size+'.png')});
 await page.close();
}
await browser.close();
console.log('10 PNG rendered at exact native dimensions.');
