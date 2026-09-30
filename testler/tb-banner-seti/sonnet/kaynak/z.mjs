import { shoot } from './shot.mjs';
const R='/home/forn/sonnet-vs-astra/tb-banner-seti/sonnet';
await shoot([{html:`${R}/html5/320x50/index.html`,png:`${R}/_tmp/z320.png`,w:320,h:50,dpr:4,t:9000},{html:`${R}/html5/728x90/index.html`,png:`${R}/_tmp/z728.png`,w:728,h:90,dpr:2,t:9000}]);
