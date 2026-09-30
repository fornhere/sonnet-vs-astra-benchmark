import { shoot } from './shot.mjs';
const R='/home/forn/sonnet-vs-astra/tb-banner-seti/sonnet';
const S=['300x250','336x280','728x90','970x250','300x600','160x600','320x50'];
await shoot(S.map(s=>{const [w,h]=s.split('x').map(Number);return {html:`${R}/html5/${s}/index.html`,png:`${R}/png/2x/${s}.png`,w,h,dpr:2,t:9000}}));
// önizleme kontrol
await shoot([{html:`${R}/onizleme.html`,png:`${R}/_tmp/onizleme.png`,w:1600,h:1400,t:9000}]);
