import { shoot } from './shot.mjs';
const ROOT='/home/forn/sonnet-vs-astra/tb-banner-seti/sonnet';
const [size, ...ts] = process.argv.slice(2); const [w,h]=size.split('x').map(Number);
await shoot(ts.map(t=>({html:`${ROOT}/html5/${size}/index.html`,png:`${ROOT}/_tmp/f_${size}_${t}.png`,w,h,t:+t})));
