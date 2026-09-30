/* ===== global ===== */
(function(){
// slow grid travel
tl.fromTo("#bg .grid",{backgroundPosition:"0px 0px"},{backgroundPosition:"-1500px -300px",duration:S.END,ease:"none"},0);
tl.fromTo("#bg .grid2",{backgroundPosition:"0px 0px"},{backgroundPosition:"-600px -120px",duration:S.END,ease:"none"},0);
// grain jitter + timecode via proxy
const P={t:0};
const tc=$("#hud-tc");
tl.to(P,{t:S.END,duration:S.END,ease:"none",onUpdate(){
  const f=Math.floor(P.t*12);
  const g=$("#fx .grain");g.style.transform=`translate(${Math.floor(hash(f)*64)}px,${Math.floor(hash(f+99)*64)}px)`;
  const s=Math.floor(P.t);tc.textContent=String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0");
}},0);
// HUD
const tk=$("#hud .hb");
Object.values(S).forEach(v=>{if(v>0&&v<S.END){const b=document.createElement("b");b.style.left=(v/S.END*100)+"%";tk.appendChild(b);}});
tl.fromTo("#hud",{opacity:0},{opacity:1,duration:.6,ease:"none",immediateRender:false},S.C+.6);
tl.fromTo("#hud-prog",{scaleX:0},{scaleX:1,duration:S.END,ease:"none"},0);
tl.to("#hud",{opacity:0,duration:.4,ease:"none"},S.H+5.8);
// geçişler
wipe(S.C,"r");wipe(S.D,"u");wipe(S.E,"l");wipe(S.F,"r");wipe(S.G,"u");wipe(S.H,"l");
// arka plan ışığı — sahneye göre kayar
tl.to("#bg .glow",{x:0,y:-40,duration:1,ease:"none"},0);
tl.set("#bg .glow",{opacity:.35},0);
tl.to("#bg .glow",{opacity:.9,duration:.5,ease:"power2.out"},S.B);
tl.to("#bg .glow",{x:-420,y:-140,duration:1.6,ease:"power2.inOut"},S.C);
tl.to("#bg .glow",{x:380,y:-60,duration:1.6,ease:"power2.inOut"},S.D);
tl.to("#bg .glow",{x:0,y:80,duration:1.6,ease:"power2.inOut"},S.E);
tl.to("#bg .glow",{x:-200,y:-160,duration:1.6,ease:"power2.inOut"},S.F);
tl.to("#bg .glow",{x:200,y:60,duration:1.6,ease:"power2.inOut"},S.G);
tl.to("#bg .glow",{x:0,y:-60,duration:1.6,ease:"power2.inOut"},S.H);
window.__timelines["main"]=tl;
})();
