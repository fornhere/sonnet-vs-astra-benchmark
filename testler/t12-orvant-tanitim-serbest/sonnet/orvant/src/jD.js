/* ===== SAHNE D — S2 mimar ===== */
(function(){
const D=S.D;
gsap.set("#d-cam",{opacity:0});
gsap.set(".de",{strokeDasharray:1,strokeDashoffset:1});
gsap.set(".df",{strokeDasharray:"0.1 0.9",strokeDashoffset:0.1,opacity:0});
gsap.set(".dn",{opacity:0,scale:.7,transformOrigin:"50% 50%"});
gsap.set(".dn .lo",{opacity:0});
gsap.set("#d-graph,#d-perm,#d-chip",{opacity:0});
gsap.set(".pr",{opacity:0,x:40});
tl.fromTo("#d-cam",{opacity:0},{opacity:1,duration:.3,ease:"none"},D+.05);
tl.fromTo("#d-tag",{opacity:0,x:30},{opacity:1,x:0,duration:.6},D+.4);
mi("#d-head",D+.4,{d:1.0,s:.12});
tl.fromTo("#d-chip",{opacity:0,x:80,rotation:3},{opacity:1,x:0,rotation:0,duration:.9,ease:"expo.out"},D+.55);
tl.fromTo("#d-graph",{opacity:0,y:70,rotateY:-34,rotateX:10},{opacity:1,y:0,rotateY:-13,rotateX:4,duration:1.4,ease:"expo.out"},D+.9);
tl.to("#d-graph",{rotateY:-4,rotateX:1.5,duration:5.6,ease:"power1.inOut"},D+2.3);
// düğümler & kenarlar
const lv={G1:0,G2:1,G3:1,G4:2,G5:2,G6:2,G7:3};
$$(".dn").forEach((g,i)=>{const t=D+1.5+lv[g.dataset.k]*.42+(i%3)*.06;tl.to(g,{opacity:1,scale:1,duration:.55,ease:"back.out(2.2)"},t);});
$$(".de").forEach((p,i)=>{const src=[0,0,1,1,1,1,2,2,2][i];tl.to(p,{strokeDashoffset:0,duration:.6,ease:"power2.inOut"},D+1.7+src*.42+(i%2)*.06);});
// yetki kartı
tl.fromTo("#d-perm",{opacity:0,x:70,y:0},{opacity:1,x:0,duration:1,ease:"expo.out"},D+1.4);
$$(".pr").forEach((r,i)=>tl.to(r,{opacity:1,x:0,duration:.7,ease:"expo.out"},D+2.2+i*.28));
// onaylar (2/3)
const ap=[D+4.6,D+5.3];
[0,1].forEach(i=>{
  const r=$$(".pr")[i],t=ap[i],node=$(`.dn[data-k="${i===0?"G5":"G6"}"]`);
  // toggle sırası: Depoya yazma(G03), Ağ erişimi(G05); Paket kurulumu(G06) kapalı kalır
  const nd=$(`.dn[data-k="${i===0?"G3":"G5"}"]`);
  tl.to($(".tg",r),{backgroundColor:"#7dffb0",borderColor:"#7dffb0",duration:.2,ease:"none"},t);
  tl.to($(".tg i",r),{x:48,backgroundColor:"#07080a",duration:.28,ease:"back.out(2)"},t);
  tl.to(r,{borderColor:"rgba(125,255,176,.55)",duration:.2,ease:"none"},t);
  tl.to($(".lk",nd),{opacity:0,scale:.4,transformOrigin:"50% 50%",duration:.15,ease:"none"},t+.05);
  tl.to($(".lo",nd),{opacity:1,duration:.1,ease:"none"},t+.1);
  tl.fromTo($("rect",nd),{strokeWidth:2},{stroke:"#7dffb0",strokeWidth:4,duration:.25,ease:"power2.out"},t+.05);
});
// üçüncüsü kapalı kalır
const r3=$$(".pr")[2];
tl.to(r3,{opacity:.45,duration:.4,ease:"none"},D+5.9);
// akış
tl.to(".df",{opacity:1,duration:.05,ease:"none"},D+6.1);
tl.to(".df",{strokeDashoffset:-0.9,duration:1.0,ease:"power1.inOut",stagger:.05},D+6.1);
tl.to(".df",{opacity:0,duration:.1,ease:"none"},D+7.3);
tl.to("#d-cam",{opacity:0,duration:.25,ease:"power2.in"},D+7.85);
})();
