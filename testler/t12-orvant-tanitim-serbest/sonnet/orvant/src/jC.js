/* ===== SAHNE C — S1 karşılama ===== */
(function(){
const C=S.C;
tl.fromTo("#c-cam",{opacity:0},{opacity:1,duration:.3,ease:"none"},C+.05);
tl.fromTo("#c-tag",{opacity:0,x:30},{opacity:1,x:0,duration:.6},C+.4);
mi("#c-head",C+.4,{d:1.0,s:.12});
gsap.set("#c-map,#c-q",{opacity:0});
gsap.set("#c-edges path",{strokeDasharray:1,strokeDashoffset:1});
gsap.set(".c-br,#c-root",{opacity:0,scale:.6,transformOrigin:"50% 50%"});
gsap.set(".lf",{opacity:0,scaleX:.2,transformOrigin:"0% 50%"});
gsap.set(".qc",{opacity:0,y:30});
// pill
tl.fromTo("#c-pill",{opacity:0,y:60,scale:.96},{opacity:1,y:0,scale:1,duration:.9,ease:"expo.out"},C+.75);
// yazma (46 karakter)
const N=$("#c-type").textContent.length;
$("#c-type").style.setProperty("--n",N);
tl.to("#c-type",{width:N+"ch",duration:N*.046,ease:`steps(${N})`},C+1.3);
tl.fromTo("#c-type",{borderRightColor:"#ff5a1f"},{borderRightColor:"#ff5a1f",duration:.01},C+1.3);
// gönder
tl.to(".pill-go",{scale:.86,duration:.08,ease:"power2.in",transformOrigin:"50% 50%"},C+3.45);
tl.to(".pill-go",{scale:1,duration:.4,ease:"back.out(3)"},C+3.53);
tl.to("#c-pill",{x:880,y:-390,scale:.4634,duration:.95,ease:"expo.inOut"},C+3.6);
tl.to("#c-pill .pill-go",{opacity:0,duration:.2,ease:"none"},C+3.7);
tl.to("#c-type",{borderRightColor:"rgba(255,90,31,0)",duration:.05},C+3.75);
// paneller
tl.fromTo("#c-map",{opacity:0,y:60,scale:.97},{opacity:1,y:0,scale:1,duration:.9,ease:"expo.out"},C+3.9);
tl.fromTo("#c-q",{opacity:0,y:60,scale:.97},{opacity:1,y:0,scale:1,duration:.9,ease:"expo.out"},C+4.05);
tl.to("#c-root",{opacity:1,scale:1,duration:.6,ease:"back.out(2)"},C+4.15);
$$("#c-edges path").forEach((p,i)=>{
  const lvl=i<4?0:1; const t=C+4.4+(lvl?0.5:0)+(lvl?(i-4)*.045:i*.08);
  tl.to(p,{strokeDashoffset:0,duration:.55,ease:"power2.inOut"},t);
});
$$(".c-br").forEach((g,i)=>tl.to(g,{opacity:1,scale:1,duration:.55,ease:"back.out(2.2)"},C+4.55+i*.08));
tl.to(".lf",{opacity:1,scaleX:1,duration:.5,ease:"power3.out",stagger:.045},C+5.0);
$$(".qc").forEach((q,i)=>tl.to(q,{opacity:1,y:0,duration:.7,ease:"expo.out"},C+4.4+i*.28));
// cevaplar
const ans=[C+5.55,C+5.95,C+6.35];
$$(".qc").forEach((q,i)=>{
  const chip=$$(".chips b",q)[i===1?0:0];
  tl.to(chip,{backgroundColor:"#ff5a1f",color:"#07080a",borderColor:"#ff5a1f",duration:.18,ease:"power2.out"},ans[i]);
  tl.fromTo(chip,{scale:1},{scale:1.09,duration:.12,yoyo:true,repeat:1,ease:"power2.out"},ans[i]);
  tl.to(q,{borderColor:"rgba(255,90,31,.55)",duration:.2,ease:"none"},ans[i]);
  tl.to($$(".lf")[i*2],{fill:"#ff5a1f",duration:.15,ease:"none"},ans[i]+.1);
  tl.to($$(".lf")[i*2+1],{fill:"#ff5a1f",duration:.15,ease:"none"},ans[i]+.2);
});
// çökme -> sözleşme
tl.to("#c-map",{x:400,scale:.72,opacity:0,duration:.6,ease:"power3.in"},C+7.0);
tl.to("#c-q",{x:-400,scale:.72,opacity:0,duration:.6,ease:"power3.in"},C+7.0);
tl.fromTo("#c-doc",{opacity:0,y:80,scale:.9},{opacity:1,y:0,scale:1,duration:.8,ease:"expo.out"},C+7.4);
$$("#c-doc .dr").forEach((r,i)=>{
  tl.fromTo($(".db",r),{scaleX:0},{scaleX:1,duration:.5,ease:"power3.out"},C+7.65+i*.16);
  tl.to($(".ck svg",r),{opacity:1,duration:.05,ease:"none"},C+7.95+i*.16);
  tl.fromTo($(".ck",r),{backgroundColor:"rgba(125,255,176,0)"},{backgroundColor:"#7dffb0",duration:.2,ease:"none"},C+7.95+i*.16);
});
tl.fromTo("#c-stamp",{opacity:0,scale:2.6,rotation:-22},{opacity:.95,scale:1,rotation:-9,duration:.28,ease:"power4.in"},C+8.1);
shake(C+8.38,16,7);
tl.fromTo("#c-doc",{scale:1},{scale:1.03,duration:.1,yoyo:true,repeat:1},C+8.38);
tl.to("#c-cam",{opacity:0,duration:.25,ease:"power2.in"},C+9.85);
})();
