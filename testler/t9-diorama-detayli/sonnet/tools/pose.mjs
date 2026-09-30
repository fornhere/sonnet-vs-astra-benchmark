// node tools/pose.mjs out.png tx tz az pol rad [t] [weather] [w h]
import { execFileSync } from 'node:child_process';
const [out, tx, tz, az, pol, rad, t = '0.66', wx = 'clear', w = '1600', h = '900'] = process.argv.slice(2);
const js = `(()=>{const d=window.__dio; d.rig.tourOn=false; Object.assign(d.rig.cur,{tx:${tx},tz:${tz},ty:6,az:${az},pol:${pol},rad:${rad}}); Object.assign(d.rig.goal,d.rig.cur); d.setTime&&d.setTime(${t}); d.setWeather&&d.setWeather('${wx}'); })()`;
console.log(execFileSync('node', ['tools/shot.mjs', out, js, w, h], { encoding: 'utf8' }));
