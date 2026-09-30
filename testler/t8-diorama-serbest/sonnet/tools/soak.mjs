import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/chromium', headless: 'new', args: ['--no-sandbox', '--ignore-gpu-blocklist', '--enable-gpu', '--use-angle=gl', '--allow-file-access-from-files', '--window-size=1600,900'] });
const p = await b.newPage(); await p.setViewport({ width: 1600, height: 900 });
const errs = []; p.on('console', m => { const t = m.text(); if (m.type() === 'error' || m.type() === 'warning') errs.push(t); }); p.on('pageerror', e => errs.push('PAGEERR ' + e.message));
await p.goto('file:///home/forn/sonnet-vs-astra/t8-diorama-serbest/sonnet/index.html?tour&loop&fps'); await p.waitForFunction('window.__ready', { timeout: 60000 });
let mn = 999; for (let i = 0; i < 12; i++) { await new Promise(r => setTimeout(r, 8000)); const f = await p.evaluate('window.__fps'); mn = Math.min(mn, f); }
console.log('min fps over 96s:', mn); console.log('mem', JSON.stringify(await p.evaluate('performance.memory ? {used: Math.round(performance.memory.usedJSHeapSize/1e6)} : null')));
console.log('errors/warnings:', errs.length, [...new Set(errs)].slice(0, 6));
await p.keyboard.press('p'); await new Promise(r => setTimeout(r, 1500));
await b.close();
