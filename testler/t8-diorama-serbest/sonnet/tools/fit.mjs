import fs from 'fs';
const B = JSON.parse(fs.readFileSync('data/raw/nyc_buildings.json'));
const LON0=-74.0170, LAT0=40.7033, MX=111320*Math.cos(LAT0*Math.PI/180), MY=110950;
const pts=[];
for (const b of B){ const g=b.the_geom; if(!g) continue; const r=g.coordinates[0][0]; let sx=0,sy=0; for(const p of r){sx+=p[0];sy+=p[1]} sx/=r.length;sy/=r.length;
  if (sy>40.742 && sy<40.797 && sx>-74.012 && sx<-73.95) pts.push([(sx-LON0)*MX,(sy-LAT0)*MY, +b.height_roof||0]); }
console.log('pts',pts.length);
function score(angDeg,pitch,axis){ const a=angDeg*Math.PI/180; const bins=new Float64Array(40); 
  for(const [x,y] of pts){ const e=x*Math.cos(a)-y*Math.sin(a), n=x*Math.sin(a)+y*Math.cos(a); if(e<-1700||e>1100) continue; const v=axis==='n'?n:e; let f=((v%pitch)+pitch)%pitch/pitch; bins[Math.floor(f*40)]++; }
  let mx=0,mn=1e9,sum=0; for(const b of bins){sum+=b; mx=Math.max(mx,b); mn=Math.min(mn,b)} return [ (mx-mn)/(sum/40), bins]; }
let best=[0];
for(let ang=28.0; ang<=30.2; ang+=0.05){ for(let p=79.0;p<=82.0;p+=0.1){ const [s]=score(ang,p,'n'); if(s>best[0]) best=[s,ang,p]; } }
console.log('best',best);
const [s,bins]=score(best[1],best[2],'n'); console.log(Array.from(bins).map(x=>x|0).join(' '));
// ince ayar: sokak vadisinin derinliği
function score2(angDeg,pitch){ const a=angDeg*Math.PI/180; const NB=80; const bins=new Float64Array(NB);
  for(const [x,y] of pts){ const e=x*Math.cos(a)-y*Math.sin(a), n=x*Math.sin(a)+y*Math.cos(a); if(e<-1700||e>1100) continue; let f=((n%pitch)+pitch)%pitch/pitch; bins[Math.floor(f*NB)]++; }
  let mn=1e9,mi=0,sum=0; bins.forEach((b,i)=>{sum+=b; if(b<mn){mn=b;mi=i}}); return [1-mn/(sum/NB), mi/NB]; }
let b2=[0];
for(let ang=28.7; ang<=29.2; ang+=0.02) for(let p=79.2;p<=80.4;p+=0.02){ const [s,ph]=score2(ang,p); if(s>b2[0]) b2=[s,ang,p,ph]; }
console.log('fine',b2);
