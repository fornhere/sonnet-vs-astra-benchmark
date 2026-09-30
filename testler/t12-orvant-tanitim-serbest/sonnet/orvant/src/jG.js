/* ===== SAHNE G — yol haritası ===== */
(function(){
const G=S.G;
const N=[["S1","Karşılama","İstekten onaylı sözleşme"],["S2","Mimar","Sözleşmeden görev grafiği"],["S3","Yürütücü","Ajanlara verir, kapıdan geçirir"],["S4","Onarım","Başarısızlığı sınıflar, kendini onarır"],["S5","Gelişim","Yöntemini kanıtla geliştirir"],["S6","Operatör","Sonunda kendi operatörü olur"]];
const host=$("#g-nodes");
N.forEach((n,i)=>{
  const d=document.createElement("div");d.className="gn "+(i<3?"on":"off");d.style.left=(50+i*304)+"px";d.style.top="470px";
  d.innerHTML=`<div class="c">${n[0]}</div><div class="nm">${n[1]}</div><div class="st">${i<3?"ÇALIŞIYOR":"HEDEF"}</div><div class="ds">${n[2]}</div>`;
  host.appendChild(d);
});
const nodes=$$(".gn");
gsap.set("#g-cam",{opacity:0});
gsap.set("#g-l0",{opacity:0});
gsap.set("#g-l1",{strokeDasharray:1,strokeDashoffset:1});
gsap.set(nodes,{opacity:0,y:40});
gsap.set("#g-meter",{opacity:0,y:40});
tl.fromTo("#g-cam",{opacity:0},{opacity:1,duration:.3,ease:"none"},G+.05);
tl.fromTo("#g-tag",{opacity:0,x:30},{opacity:1,x:0,duration:.6},G+.4);
mi("#g-head",G+.4,{d:1.0,s:.12});
tl.to("#g-l0",{opacity:1,duration:.6,ease:"none"},G+1.0);
tl.to("#g-l1",{strokeDashoffset:0,duration:1.6,ease:"power2.inOut"},G+1.3);
nodes.forEach((n,i)=>{
  tl.to(n,{opacity:1,y:0,duration:.8,ease:"expo.out"},G+1.2+i*.34);
  if(i<3)tl.fromTo($(".c",n),{scale:.4},{scale:1,duration:.6,ease:"back.out(2.4)"},G+1.2+i*.34);
});
// şimdi işareti S3'te
gsap.set("#g-now",{x:728});
tl.set("#g-now",{left:0,top:392},0);
tl.fromTo("#g-now",{opacity:0,yPercent:40},{opacity:1,yPercent:0,duration:.6,ease:"back.out(2)"},G+3.0);
tl.to("#g-now",{scale:1.06,duration:.5,ease:"sine.inOut",yoyo:true,repeat:3,transformOrigin:"50% 50%"},G+3.6);
// pay çubuğu
tl.fromTo("#g-meter",{opacity:0,y:40},{opacity:1,y:0,duration:.9,ease:"expo.out",immediateRender:false},G+4.2);
tl.fromTo("#g-fill",{width:"8%"},{width:"58%",duration:2.6,ease:"power2.inOut",immediateRender:false},G+4.8);
tl.fromTo("#g-cur",{x:0.08*1594},{x:0.58*1594,duration:2.6,ease:"power2.inOut",immediateRender:false},G+4.8);
tl.to("#g-nodes",{opacity:.35,duration:.6,ease:"none"},G+4.4);
tl.to("#g-now",{opacity:0,duration:.3,ease:"none"},G+4.4);
tl.to("#g-cam",{opacity:0,duration:.25,ease:"power2.in"},G+7.85);
})();
