import { shoot } from './shot.mjs';
import fs from 'fs';
const ROOT = '/home/forn/sonnet-vs-astra/tb-banner-seti/sonnet';
const only = process.argv[2]; const t = process.argv[3] ? +process.argv[3] : 9000; const out = process.argv[4] || 'png';
const sizes = fs.readdirSync(`${ROOT}/html5`).filter(d => /^\d+x\d+$/.test(d) && (!only || only === 'all' || only === d));
fs.mkdirSync(`${ROOT}/${out}`, { recursive: true });
await shoot(sizes.map(s => { const [w, h] = s.split('x').map(Number); return { html: `${ROOT}/html5/${s}/index.html`, png: `${ROOT}/${out}/${s}.png`, w, h, t }; }));
console.log('ok', sizes.join(' '));
