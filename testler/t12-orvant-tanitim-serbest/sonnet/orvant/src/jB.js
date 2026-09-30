/* ===== SAHNE B — logo ===== */
(function(){
const B=S.B;
gsap.set("#b-halo",{opacity:0});
gsap.set("#b-tag1 .in,#b-tag2 .in",{yPercent:112});
gsap.set("#b-word .ch>span",{yPercent:112});
gsap.set("#mk-core,#mk-orb",{scale:0,svgOrigin:"0 0"});
gsap.set("#b-corner-l,#b-corner-r",{opacity:0});
gsap.set("#b-lockup",{x:330});
gsap.set("#b-rings .r",{opacity:0,scale:.2,svgOrigin:"0 0"});
tl.fromTo("#flash",{opacity:.95},{opacity:0,duration:.6,ease:"power2.out",immediateRender:false},B);
tl.fromTo("#b-halo",{opacity:0,scale:.5},{opacity:1,scale:1,duration:2.2,ease:"expo.out"},B);
$$("#b-rings .r").forEach((c,i)=>{
  tl.fromTo(c,{opacity:.9,scale:.25},{opacity:0,scale:3.4+i*.6,duration:1.9+i*.2,ease:"expo.out"},B+.02+i*.13);
});
tl.to("#mk-out",{strokeDashoffset:0,duration:1.05,ease:"power3.inOut"},B+.12);
tl.to("#mk-core",{scale:1,duration:.7,ease:"back.out(2.6)"},B+.8);
tl.to("#mk-orb",{scale:1,duration:.7,ease:"back.out(2.2)"},B+.95);
tl.to("#mk-orb",{rotation:720,svgOrigin:"0 0",duration:6.6,ease:"power1.inOut"},B+.95);
tl.fromTo("#mk-in",{opacity:0,rotation:0,svgOrigin:"0 0"},{opacity:1,rotation:-360,svgOrigin:"0 0",duration:6.5,ease:"none"},B+1.0);
tl.to("#b-lockup",{x:0,duration:1.3,ease:"expo.inOut"},B+.9);
tl.to("#b-word .ch>span",{yPercent:0,duration:1.0,ease:"expo.out",stagger:.075},B+1.0);
tl.to("#b-corner-l,#b-corner-r",{opacity:1,duration:.7,ease:"none"},B+1.6);
mi("#b-tag1",B+2.3,{d:1.0});mi("#b-tag2",B+3.2,{d:.9});
tl.fromTo("#b-cam",{scale:1},{scale:1.07,duration:7.0,ease:"power1.inOut",transformOrigin:"50% 46%"},B+.2);
tl.to("#b-cam",{opacity:0,duration:.55,ease:"power2.in"},B+7.3);
})();
