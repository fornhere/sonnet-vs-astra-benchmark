/* ===== SAHNE F — ilkeler ===== */
(function(){
const F=S.F;
gsap.set("#f-cam",{opacity:0});
gsap.set(".fc",{opacity:0,y:80});
gsap.set("#f1-chk",{strokeDasharray:1,strokeDashoffset:1});
gsap.set("#f3-ar",{strokeDasharray:1,strokeDashoffset:1});
gsap.set(".f3b",{scaleY:0,transformOrigin:"50% 100%"});
gsap.set("#f2-sh",{y:-26,transformOrigin:"50% 50%"});
gsap.set("#f4-beam",{rotation:-16,svgOrigin:"100 52"});
gsap.set("#f1-scan",{y:0,opacity:0});
tl.fromTo("#f-cam",{opacity:0},{opacity:1,duration:.3,ease:"none"},F+.05);
tl.fromTo("#f-tag",{opacity:0,x:30},{opacity:1,x:0,duration:.6},F+.4);
mi("#f-head",F+.4,{d:1.0,s:.12});
$$(".fc").forEach((c,i)=>{
  const t=F+1.0+i*.42;
  tl.to(c,{opacity:1,y:0,duration:.9,ease:"expo.out"},t);
});
// ikon animasyonları
let t0=F+1.25;
tl.to("#f1-scan",{opacity:1,duration:.05},t0);tl.fromTo("#f1-scan",{y:0},{y:124,duration:.7,ease:"power1.inOut",immediateRender:false},t0);tl.to("#f1-scan",{opacity:0,duration:.1},t0+.7);
tl.to("#f1-chk",{strokeDashoffset:0,duration:.45,ease:"power2.out"},t0+.6);
t0=F+1.7;
tl.to("#f2-sh",{y:0,duration:.35,ease:"bounce.out"},t0+.35);
t0=F+2.15;
tl.to(".f3b",{scaleY:1,duration:.6,ease:"back.out(1.6)",stagger:.1},t0);
tl.to("#f3-ar",{strokeDashoffset:0,duration:.7,ease:"power2.inOut"},t0+.3);
t0=F+2.6;
tl.to("#f4-beam",{rotation:0,duration:1.1,ease:"elastic.out(1,.35)"},t0);
// vurgu — hepsi sırayla parlar
$$(".fc").forEach((c,i)=>{tl.to(c,{borderColor:"rgba(255,90,31,.7)",duration:.2,ease:"none"},F+3.7+i*.32);tl.to(c,{borderColor:"rgba(239,235,226,.18)",duration:.4,ease:"none"},F+3.95+i*.32);});
tl.fromTo("#f-cam",{scale:1},{scale:1.03,duration:5.6,ease:"none",transformOrigin:"50% 50%"},F+.2);
tl.to("#f-cam",{opacity:0,duration:.25,ease:"power2.in"},F+5.85);
})();
