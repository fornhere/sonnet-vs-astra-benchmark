const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const S=CUES.S;
const tl=gsap.timeline({paused:true,defaults:{ease:"power3.out"}});
const NS="http://www.w3.org/2000/svg";
// seeded rng (deterministic)
let _seed=1337; const rnd=()=>{_seed=(_seed*16807)%2147483647;return (_seed-1)/2147483646;};
const hash=n=>{let x=Math.sin(n*127.1+311.7)*43758.5453;return x-Math.floor(x);};
// mask reveal helper: .in inside .mask
function mi(sel,t,o={}){const d=o.d??.9;tl.fromTo($$(sel+" .in"),{yPercent:o.from??112},{yPercent:0,duration:d,ease:o.ease??"expo.out",stagger:o.s??0},t);}
function mo(sel,t,o={}){tl.to($$(sel+" .in"),{yPercent:o.to??-112,duration:o.d??.5,ease:o.ease??"power3.in",stagger:o.s??0},t);}
// camera shake on #stage
function shake(t,a=14,n=7){const y=[];for(let i=0;i<n;i++){const k=1-i/n;tl.to("#stage",{x:(hash(t*10+i)-.5)*2*a*k,y:(hash(t*10+i+40)-.5)*2*a*k,duration:.045,ease:"none"},t+i*.045);}tl.to("#stage",{x:0,y:0,duration:.06,ease:"none"},t+n*.045);}
// wipe: dark slab with accent leading strip. dir: 'r' (L->R), 'l' (R->L), 'u' (B->T)
const WIPES=$("#wipes");
function wipe(t,dir="r",col="var(--acc)",dur=.75,id){
  const s=document.createElement("div");s.className="slab "+(dir==="u"?"slabV":"");
  s.style.cssText=dir==="u"?`left:0;right:0;top:0;height:3400px;width:auto;background:#090a0d`:`background:#090a0d`;
  const st=document.createElement("i");
  st.style.cssText=dir==="r"?`position:absolute;top:0;bottom:0;right:-380px;width:380px;background:${col}`:dir==="l"?`position:absolute;top:0;bottom:0;left:-380px;width:380px;background:${col}`:`position:absolute;left:0;right:0;top:-380px;height:380px;background:${col}`;
  s.appendChild(st);WIPES.appendChild(s);
  // centre of cover at t
  if(dir==="r"){tl.fromTo(s,{x:-3400-400},{x:1920+400,duration:dur*1.12,ease:"power2.inOut"},t-dur*.56);}
  if(dir==="l"){s.style.left="auto";s.style.right="0";tl.fromTo(s,{x:3400+400},{x:-1920-400,duration:dur*1.12,ease:"power2.inOut"},t-dur*.56);}
  if(dir==="u"){tl.fromTo(s,{y:1080+380},{y:-3400-400,duration:dur*1.12,ease:"power2.inOut"},t-dur*.56);}
}
