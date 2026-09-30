/* ===== SAHNE A — acı ===== */
(function(){
const A=S.A;
gsap.set("#a-cam .idx,#a-cam .rule,#a-cam .tag",{opacity:0});
gsap.set(".a-cnt b:not(:first-child)",{yPercent:100});
gsap.set("#a-top,#a-loop,#a-cap",{opacity:0});
tl.fromTo("#a-cam",{opacity:0},{opacity:1,duration:.5,ease:"none"},0);
tl.to("#a-top,#a-loop",{opacity:1,duration:.6,ease:"none"},.2);
const rows=$$(".a-row");
rows.forEach((r,i)=>{
  const t=.5+.5*i;
  tl.fromTo($(".in",r),{yPercent:112},{yPercent:0,duration:.75,ease:"expo.out"},t);
  tl.fromTo($(".idx",r),{opacity:0,x:-20},{opacity:1,x:0,duration:.5},t);
  tl.fromTo($(".rule",r),{scaleX:0,opacity:1},{scaleX:1,duration:1.0,ease:"expo.out"},t+.08);
  tl.fromTo($(".tag",r),{opacity:0,x:30},{opacity:1,x:0,duration:.5},t+.15);
});
tl.to("#a-cap",{opacity:1,duration:.6,ease:"none"},2.5);
// operatör döngüsü — 10 vuruş
const cnt=$$(".a-cnt b");
tl.to(rows.map(r=>$(".txt",r)),{opacity:.32,duration:.25,ease:"none"},2.45);
tl.to("#a-ptr",{opacity:1,duration:.15,ease:"none"},2.45);
for(let k=0;k<10;k++){
  const t=2.5+.25*k,ri=k%4,pr=(k+3)%4;
  tl.set("#a-ptr",{y:ri*150},t);
  tl.to($(".txt",rows[ri]),{opacity:1,duration:.06,ease:"none"},t);
  if(k>0)tl.to($(".txt",rows[pr]),{opacity:.32,duration:.1,ease:"none"},t);
  tl.fromTo(rows[ri],{x:0},{x:16,duration:.07,ease:"power2.out",yoyo:true,repeat:1},t);
  tl.fromTo("#a-ptr",{scaleY:1.0},{scaleY:1.0,duration:.01},t);
}
tl.to(cnt[0],{yPercent:-100,duration:.25,ease:"power3.inOut"},3.5);tl.to(cnt[1],{yPercent:0,duration:.25,ease:"power3.inOut"},3.5);
tl.to(cnt[1],{yPercent:-100,duration:.25,ease:"power3.inOut"},4.5);tl.to(cnt[2],{yPercent:0,duration:.25,ease:"power3.inOut"},4.5);
// donma — sessizlik
tl.to("#a-ptr",{opacity:0,duration:.2,ease:"none"},4.95);
tl.to(rows.map(r=>$(".txt",r)),{opacity:.7,duration:.3,ease:"none"},4.95);
tl.to("#a-cam",{scale:1.035,duration:.55,ease:"power1.in",transformOrigin:"50% 50%"},4.95);
// üstü çiz
rows.forEach((r,i)=>{tl.to($(".strike",r),{scaleX:1,duration:.16,ease:"power4.out"},5.5+i*.07);});
tl.to(rows.map(r=>$(".txt",r)),{opacity:.22,duration:.3,ease:"none"},5.5);
shake(5.5,12,6);
tl.to("#a-cam",{scale:1,duration:.01},5.5);
rows.forEach((r,i)=>{tl.to(r,{opacity:0,y:-24,duration:.5,ease:"power2.in"},5.95+i*.06);});
tl.to("#a-top,#a-loop,#a-cap",{opacity:0,duration:.4,ease:"none"},5.9);
// soru
mi("#a-q .q1",6.05,{d:.9});mi("#a-q .q2",6.45,{d:1.0});
tl.fromTo("#a-q",{scale:.94},{scale:1.04,duration:1.95,ease:"power1.inOut"},6.05);
tl.to("#a-q",{opacity:0,duration:.2,ease:"power2.in"},7.8);
})();
