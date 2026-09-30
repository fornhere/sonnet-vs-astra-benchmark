
window.ORV={};
ORV.draw=function(canvas,time,variant){
 const ctx=canvas.getContext('2d'), W=1920,H=1080;ctx.clearRect(0,0,W,H);
 // Fine architectural field, deterministic and slowly advancing.
 ctx.strokeStyle='#263020';ctx.lineWidth=1;
 for(let x=100;x<1920;x+=120){ctx.beginPath();ctx.moveTo(x,145);ctx.lineTo(x,950);ctx.stroke()}
 for(let y=190;y<980;y+=120){ctx.beginPath();ctx.moveTo(90,y);ctx.lineTo(1840,y);ctx.stroke()}
 ctx.fillStyle='#687354';for(let i=0;i<54;i++){let x=100+(i*337%1730),y=165+(i*193%760);ctx.globalAlpha=.14+.14*Math.sin(time*.6+i);ctx.fillRect(x,y,2,2)}ctx.globalAlpha=1;
 if(variant==='network'){
  const cx=1370,cy=545;ctx.save();ctx.translate(cx,cy);
  for(let j=0;j<3;j++){ctx.beginPath();ctx.ellipse(0,0,170+j*94,170+j*94,0,0,Math.PI*2);ctx.strokeStyle='#3b4630';ctx.stroke()}
  for(let i=0;i<28;i++){let a=i*2.39996+time*.07,r=160+(i%4)*63,x=Math.cos(a)*r,y=Math.sin(a)*r;
   ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(0,0);ctx.strokeStyle=i%4===0?'#829d4a':'#465438';ctx.globalAlpha=.24;ctx.stroke();ctx.globalAlpha=1;
   ctx.fillStyle=i%4===0?'#cefa69':'#6d7a5c';ctx.fillRect(x-3,y-3,6,6);
   let p=(time*.32+i*.13)%1;ctx.fillStyle='#cefa69';ctx.beginPath();ctx.arc(x*(1-p),y*(1-p),2.7,0,Math.PI*2);ctx.fill();
  }
  ctx.fillStyle='#111510';ctx.beginPath();ctx.arc(0,0,94,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#cefa69';ctx.lineWidth=2;ctx.stroke();
  ctx.strokeStyle='#f0f0e6';ctx.lineWidth=3;ctx.beginPath();ctx.arc(0,-20,17,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.arc(0,36,35,Math.PI,0);ctx.stroke();ctx.restore();return;
 }
 if(!['hero','close'].includes(variant))return;
 const cx=variant==='hero'?1390:1430,cy=variant==='hero'?525:520;
 const t=time*.18, size=variant==='hero'?1.12:.91;
 const ax=.9+.12*Math.sin(t),ay=t*.45+.3;
 function rot(x,y,z){let y1=y*Math.cos(ax)-z*Math.sin(ax),z1=y*Math.sin(ax)+z*Math.cos(ax);return [x*Math.cos(ay)+z1*Math.sin(ay),y1,-x*Math.sin(ay)+z1*Math.cos(ay)]}
 function point(u,v){const R=240,r=77;let p=rot((R+r*Math.cos(v))*Math.cos(u),(R+r*Math.cos(v))*Math.sin(u),r*Math.sin(v));let s=1000/(1000-p[2]);return [cx+p[0]*s*size,cy+p[1]*s*size,p[2]]}
 const polys=[],N=100,M=26;
 for(let i=0;i<N;i++){let u=i/N*Math.PI*2;for(let j=0;j<M;j++){
 // Narrow incision between curved lamellae.
 let v=j/M*Math.PI*2;let p=[point(u,v),point(u+Math.PI*2/N*.95,v),point(u+Math.PI*2/N*.95,v+Math.PI*2/M*.87),point(u,v+Math.PI*2/M*.87)];
 let n=rot(Math.cos(v)*Math.cos(u),Math.cos(v)*Math.sin(u),Math.sin(v));let light=Math.max(0,n[0]*-.35+n[1]*-.65+n[2]*.75);let spec=Math.pow(Math.max(0,n[2]*.95-n[1]*.3),15);let c=.17+light*.67+spec*.8;
 polys.push({p,z:p.reduce((a,q)=>a+q[2],0)/4,c});
 }}
 polys.sort((a,b)=>a.z-b.z);
 for(const q of polys){ctx.fillStyle=`rgb(${Math.min(240,Math.round(206*q.c))},${Math.min(255,Math.round(250*q.c))},${Math.min(185,Math.round(105*q.c))})`;ctx.beginPath();q.p.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.closePath();ctx.fill()}
 ctx.strokeStyle='#6e8545';ctx.lineWidth=1;
 ctx.beginPath();ctx.ellipse(cx,cy+26,460,170,-.22,0,Math.PI*2);ctx.stroke();
 for(let i=0;i<3;i++){let a=time*.23+i*2.094;let x=Math.cos(a)*460,y=Math.sin(a)*170;ctx.fillStyle='#cefa69';ctx.beginPath();ctx.arc(cx+x*Math.cos(-.22)-y*Math.sin(-.22),cy+26+x*Math.sin(-.22)+y*Math.cos(-.22),5,0,6.283);ctx.fill()}
};
