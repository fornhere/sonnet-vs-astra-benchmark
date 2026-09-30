/* ===== SAHNE H — kapanış ===== */
(function(){
const H=S.H;
// zaman çizelgesi içeriği
const LW=1640-100-40; // lane genişliği
const rul=$("#h-ruler");
for(let i=0;i<=40;i++){const b=document.createElement("b");b.style.left=(i*LW/40)+"px";if(i%5===0){b.className="m";const s=document.createElement("span");s.style.left=(i*LW/40)+"px";s.textContent="00:"+String(i*3/5|0).padStart(2,"0");rul.appendChild(s);}rul.appendChild(b);}
const cols={a:"#ff5a1f",b:"#efebe2",c:"#7dffb0",d:"#8ea4ff"};
const v1=[[0,.15,"a","GİRİŞ"],[.155,.10,"b","KESİM"],[.26,.20,"c","ANLATIM"],[.465,.13,"d","B-ROLL"],[.6,.17,"a","DEMO"],[.775,.22,"b","KAPANIŞ"]];
const v2=[[.06,.15,"c","BAŞLIK"],[.34,.12,"d","ALTYAZI"],[.63,.20,"a","GRAFİK"]];
const clips=[];
const mk=(host,arr)=>arr.forEach(([x,w,c,n])=>{const d=document.createElement("div");d.className="cl";d.style.left=(x*LW)+"px";d.style.width=(w*LW-6)+"px";d.style.borderColor=cols[c];d.innerHTML=`<div class="th"></div><div class="bar" style="background:${cols[c]}"></div><div class="nm">${n}</div>`;host.appendChild(d);clips.push({el:d,x:x+w/2});});
mk($("#h-v1"),v1);mk($("#h-v2"),v2);
const a1=$("#h-a1");const wv=[];
for(let i=0;i<150;i++){const d=document.createElement("div");d.className="wv";const env=.35+.65*Math.abs(Math.sin(i*.21)*Math.cos(i*.07));const h=8+(hash(i*3.1)*.7+.3)*env*70;d.style.left=(i*LW/150)+"px";d.style.height=h+"px";a1.appendChild(d);wv.push({el:d,x:i/150});}
gsap.set("#h-cam",{opacity:0});
gsap.set("#h-p2,#h-p3",{opacity:0});
gsap.set("#h-nle",{opacity:0,y:60});
gsap.set("#h-tag",{opacity:0});
gsap.set("#h-p2 .in,#h-tg .in",{yPercent:112});
gsap.set("#h-word .ch>span",{yPercent:112});
gsap.set("#hk-core,#hk-orb",{scale:0,svgOrigin:"0 0"});
gsap.set("#h-st",{opacity:0,y:20});gsap.set("#h-halo",{opacity:0});
gsap.set("#h-lock",{x:330});gsap.set("#h-st",{xPercent:-50});
tl.fromTo("#h-cam",{opacity:0},{opacity:1,duration:.3,ease:"none"},H+.05);
tl.fromTo("#h-tag",{opacity:0,x:30},{opacity:1,x:0,duration:.6},H+.4);
mi("#h-head",H+.4,{d:1.0,s:.12});
tl.fromTo("#h-nle",{opacity:0,y:60},{opacity:1,y:0,duration:1.0,ease:"expo.out",immediateRender:false},H+.9);
// oynatma başlığı
const T0=H+1.5,SW=2.3;
tl.fromTo("#h-ph",{x:0},{x:LW,duration:SW,ease:"power1.inOut",immediateRender:false},T0);
clips.forEach(c=>{const t=T0+SW*(c.x-.02);tl.to(c.el,{opacity:1,borderStyle:"solid",duration:.2,ease:"none"},Math.max(T0,t));});
wv.forEach(w=>{const t=T0+SW*w.x;tl.to(w.el,{opacity:.95,duration:.1,ease:"none"},t);});
// 3.6 çıkış, soru cümlesi
tl.to("#h-p1",{opacity:0,y:-30,duration:.45,ease:"power3.in"},H+3.75);
tl.set("#h-p2",{opacity:1},H+4.0);
mi("#h-p2 .l1",H+4.1,{d:.9});mi("#h-p2 .l2",H+4.4,{d:1.0});
tl.fromTo("#h-p2",{scale:.95},{scale:1.03,duration:2.0,ease:"power1.inOut",immediateRender:false},H+4.1);
tl.to("#h-p2",{opacity:0,duration:.25,ease:"power2.in"},H+5.9);
// final logo
tl.set("#h-p3",{opacity:1},H+6.1);
tl.fromTo("#h-halo",{opacity:0,scale:.6},{opacity:1,scale:1,duration:2.2,ease:"expo.out",immediateRender:false},H+6.1);
tl.to("#hk-out",{strokeDashoffset:0,duration:1.0,ease:"power3.inOut"},H+6.15);
tl.to("#hk-core",{scale:1,duration:.7,ease:"back.out(2.6)"},H+6.8);
tl.to("#hk-orb",{scale:1,duration:.7,ease:"back.out(2.2)"},H+6.9);
tl.to("#hk-orb",{rotation:540,svgOrigin:"0 0",duration:3.7,ease:"power1.out"},H+6.9);
tl.fromTo("#hk-in",{opacity:0,rotation:0,svgOrigin:"0 0"},{opacity:1,rotation:-300,svgOrigin:"0 0",duration:3.8,ease:"none",immediateRender:false},H+7.0);
tl.to("#h-lock",{x:0,duration:1.3,ease:"expo.inOut"},H+6.8);
tl.to("#h-word .ch>span",{yPercent:0,duration:1.0,ease:"expo.out",stagger:.075},H+6.9);
mi("#h-tg",H+7.9,{d:1.0});
tl.fromTo("#h-st",{opacity:0,y:20},{opacity:1,y:0,duration:.8,ease:"expo.out",immediateRender:false},H+8.5);
tl.fromTo("#h-p3",{scale:1},{scale:1.04,duration:3.9,ease:"power1.inOut",transformOrigin:"50% 46%",immediateRender:false},H+6.1);
tl.to("#h-cam",{opacity:0,duration:.6,ease:"power2.in"},H+9.4);
})();
