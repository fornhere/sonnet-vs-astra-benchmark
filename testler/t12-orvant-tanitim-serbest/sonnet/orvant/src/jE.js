/* ===== SAHNE E — S3 yürütücü ===== */
(function(){
const E=S.E;
gsap.set("#e-cam",{opacity:0});
// başlangıç konumları
const Q=[[150,450],[150,530],[150,610],[150,690]];
const TILE=[[500,498],[654,498],[500,718],[654,718]];
["k1","k2","k3","k4"].forEach((id,i)=>gsap.set("#"+id,{x:Q[i][0],y:Q[i][1],opacity:0}));
gsap.set(".ln",{strokeDasharray:1,strokeDashoffset:1});
gsap.set(".etile,#e-gate,#e-merge",{opacity:0});
gsap.set(".etile .es b",{opacity:0,y:14});gsap.set("#e-t1 .es b:first-child,#e-t2 .es b:first-child",{opacity:1,y:0});
gsap.set("#e-gate .gv b",{opacity:0});gsap.set("#e-gate .gv .v0",{opacity:1});
gsap.set(".epk",{opacity:0,x:810,y:503});gsap.set("#p2",{x:810,y:723});
gsap.set(".epk .claim",{opacity:0,scale:.6,transformOrigin:"50% 100%"});
gsap.set("#e-cap1 .in,#e-cap2 .in",{yPercent:112});gsap.set("#e-log,#e-logl",{opacity:0});
tl.fromTo("#e-cam",{opacity:0},{opacity:1,duration:.3,ease:"none"},E+.05);
tl.fromTo("#e-tag",{opacity:0,x:30},{opacity:1,x:0,duration:.6},E+.4);
mi("#e-head",E+.4,{d:1.0,s:.12});
tl.fromTo(".e-col",{opacity:0,y:12},{opacity:1,y:0,duration:.6,stagger:.1},E+.9);
tl.fromTo(".etile",{opacity:0,y:40},{opacity:1,y:0,duration:.8,ease:"expo.out",stagger:.14},E+1.0);
tl.fromTo("#e-gate",{opacity:0,scale:.92,transformOrigin:"50% 50%"},{opacity:1,scale:1,duration:.9,ease:"expo.out"},E+1.15);
tl.fromTo("#e-merge",{opacity:0,y:40},{opacity:1,y:0,duration:.8,ease:"expo.out"},E+1.35);
tl.to(".ln",{strokeDashoffset:0,duration:.8,ease:"power2.inOut",stagger:.08},E+1.5);
tl.to(["#k1","#k2","#k3","#k4"],{opacity:1,duration:.4,stagger:.08},E+1.3);
tl.to("#e-qz",{opacity:1,duration:.5,ease:"none"},E+3.0);
// görevler ajanlara
["k1","k2","k3","k4"].forEach((id,i)=>tl.to("#"+id,{x:TILE[i][0],y:TILE[i][1],duration:.7,ease:"expo.inOut"},E+2.0+i*.1));
// çalışıyor
const st=(t,i,to,from)=>{const b=$$(`#e-t${i} .es b`);tl.to(b[from],{opacity:0,y:-14,duration:.15,ease:"none"},t);tl.fromTo(b[to],{opacity:0,y:14},{opacity:1,y:0,duration:.2,ease:"power3.out"},t+.05);};
st(E+2.5,1,1,0);st(E+2.5,2,1,0);
tl.fromTo("#e-t1 .ebar i",{scaleX:0},{scaleX:1,duration:1.2,ease:"power1.inOut"},E+2.55);
tl.fromTo("#e-t2 .ebar i",{scaleX:0},{scaleX:1,duration:1.45,ease:"power1.inOut"},E+2.55);
// Claude tamamlandı
st(E+3.75,1,2,1);
tl.to("#p1",{opacity:1,duration:.15,ease:"none"},E+3.8);
tl.to("#p1 .claim",{opacity:1,scale:1,duration:.4,ease:"back.out(2.4)"},E+3.85);
tl.to("#p1",{x:1030,y:605,duration:.8,ease:"power3.inOut"},E+4.15);
// Codex tamamlandı
st(E+4.0,2,2,1);
tl.to("#p2",{opacity:1,duration:.15,ease:"none"},E+4.05);
tl.to("#p2 .claim",{opacity:1,scale:1,duration:.4,ease:"back.out(2.4)"},E+4.1);
tl.to("#p2",{x:930,y:700,duration:.6,ease:"power3.out"},E+4.4);   // kapı önünde bekler
// kapı — Claude'u denetle
const rows=$$("#e-gate .grow");
const scanPass=(t,d)=>{tl.fromTo("#e-gate .scan",{opacity:1,y:0},{y:400,duration:d,ease:"power1.inOut"},t);tl.to("#e-gate .scan",{opacity:0,duration:.12,ease:"none"},t+d);};
const tick=(i,t,ok)=>{const r=rows[i];tl.to($("u",r),{opacity:0,duration:.05,ease:"none"},t);tl.to($(ok?".ok":".no",r),{opacity:1,duration:.05,ease:"none"},t);tl.fromTo($(ok?".ok":".no",r),{scale:.3,transformOrigin:"50% 50%"},{scale:1,duration:.3,ease:"back.out(3)"},t);tl.to($("span",r),{color:ok?"#7dffb0":"#ff5a1f",duration:.1,ease:"none"},t);};
tl.to("#e-gate .scan",{opacity:0},E+4.9);
scanPass(E+5.0,1.0);
tick(0,E+5.2,true);tick(1,E+5.5,true);tick(2,E+5.8,true);
tl.to("#e-gate .gv .v0",{opacity:0,duration:.05,ease:"none"},E+6.05);
tl.to("#e-gate .gv .v1",{opacity:1,duration:.05,ease:"none"},E+6.05);
tl.fromTo("#e-gate",{boxShadow:"0 30px 80px rgba(0,0,0,.55),0 0 0 0 rgba(125,255,176,0)"},{boxShadow:"0 30px 80px rgba(0,0,0,.55),0 0 90px 10px rgba(125,255,176,.45)",duration:.25,ease:"power2.out",yoyo:true,repeat:1},E+6.05);
// Claude -> birleştir
tl.to("#p1",{x:1530,y:505,duration:.7,ease:"power3.inOut"},E+6.3);
tl.to("#p1 .claim",{opacity:0,duration:.15,ease:"none"},E+6.2);
tl.to("#p1",{opacity:0,duration:.1,ease:"none"},E+7.0);
tl.to($$("#e-merge .ms")[0],{backgroundColor:"#7dffb0",borderColor:"#7dffb0",borderStyle:"solid",color:"#07080a",duration:.15,ease:"none"},E+6.95);
tl.to($$("#e-merge .ms svg")[0],{opacity:1,duration:.05,ease:"none"},E+7.0);
tl.fromTo($$("#e-merge .ms")[0],{scale:1},{scale:1.06,duration:.12,yoyo:true,repeat:1},E+6.95);
// gate sıfırla, Codex girer
rows.forEach((r,i)=>{tl.to($$(".ok,.no",r),{opacity:0,duration:.1,ease:"none"},E+6.6);tl.to($("u",r),{opacity:1,duration:.1,ease:"none"},E+6.6);tl.to($("span",r),{color:"#8b8f98",duration:.1,ease:"none"},E+6.6);});
tl.to("#e-gate .gv .v1",{opacity:0,duration:.05,ease:"none"},E+6.6);tl.to("#e-gate .gv .v0",{opacity:1,duration:.05,ease:"none"},E+6.6);
tl.to("#p2",{x:1030,y:605,duration:.5,ease:"power3.inOut"},E+6.6);
scanPass(E+7.1,1.0);
tick(0,E+7.3,true);tick(1,E+7.6,true);tick(2,E+7.9,false);
tl.to("#e-gate .gv .v0",{opacity:0,duration:.05,ease:"none"},E+8.15);
tl.to("#e-gate .gv .v2",{opacity:1,duration:.05,ease:"none"},E+8.15);
tl.fromTo("#e-gate",{boxShadow:"0 30px 80px rgba(0,0,0,.55),0 0 0 0 rgba(255,90,31,0)"},{boxShadow:"0 30px 80px rgba(0,0,0,.55),0 0 110px 16px rgba(255,90,31,.6)",duration:.22,ease:"power2.out",yoyo:true,repeat:1},E+8.15);
shake(E+8.15,14,7);
// red — geri fırlar, iddia çizilir
tl.to("#p2 .claim",{color:"#ff5a1f",textDecoration:"line-through",duration:.05,ease:"none"},E+8.15);
tl.to("#p2",{x:930,y:770,rotation:-6,duration:.35,ease:"power4.out"},E+8.2);
tl.to("#p2",{x:810,y:723,rotation:0,duration:.6,ease:"power3.inOut"},E+8.6);
tl.to("#p2",{opacity:0,duration:.15,ease:"none"},E+9.15);
mi("#e-cap1",E+8.4,{d:.9});
// düzeltme
st(E+9.0,2,3,2);
tl.fromTo("#e-t2 .ebar i",{scaleX:0},{scaleX:1,duration:1.0,ease:"power1.inOut",immediateRender:false},E+9.05);
tl.to("#e-t2 .es b:nth-child(4)",{opacity:0,duration:.1},E+10.05);tl.to("#e-t2 .es b:nth-child(3)",{opacity:1,y:0,duration:.2},E+10.1);
mo("#e-cap1",E+9.9,{d:.4});
tl.set("#p2 .claim",{color:"#efebe2",textDecoration:"none"},E+10.05);
tl.set("#p2",{x:810,y:723,opacity:1},E+10.1);
tl.to("#p2",{x:1030,y:605,duration:.7,ease:"power3.inOut"},E+10.2);
rows.forEach((r,i)=>{tl.to($$(".ok,.no",r),{opacity:0,duration:.1,ease:"none"},E+10.0);tl.to($("u",r),{opacity:1,duration:.1,ease:"none"},E+10.0);tl.to($("span",r),{color:"#8b8f98",duration:.1,ease:"none"},E+10.0);});
tl.to("#e-gate .gv .v2",{opacity:0,duration:.05,ease:"none"},E+10.0);tl.to("#e-gate .gv .v0",{opacity:1,duration:.05,ease:"none"},E+10.0);
scanPass(E+10.85,.8);
tick(0,E+11.0,true);tick(1,E+11.2,true);tick(2,E+11.4,true);
tl.to("#e-gate .gv .v0",{opacity:0,duration:.05,ease:"none"},E+11.6);
tl.to("#e-gate .gv .v1",{opacity:1,duration:.05,ease:"none"},E+11.6);
tl.fromTo("#e-gate",{boxShadow:"0 30px 80px rgba(0,0,0,.55),0 0 0 0 rgba(125,255,176,0)"},{boxShadow:"0 30px 80px rgba(0,0,0,.55),0 0 90px 10px rgba(125,255,176,.45)",duration:.25,ease:"power2.out",yoyo:true,repeat:1},E+11.6);
tl.to("#p2 .claim",{opacity:0,duration:.15,ease:"none"},E+11.75);
tl.to("#p2",{x:1530,y:591,duration:.7,ease:"power3.inOut"},E+11.8);
tl.to("#p2",{opacity:0,duration:.1,ease:"none"},E+12.5);
tl.to($$("#e-merge .ms")[1],{backgroundColor:"#7dffb0",borderColor:"#7dffb0",borderStyle:"solid",color:"#07080a",duration:.15,ease:"none"},E+12.45);
tl.to($$("#e-merge .ms svg")[1],{opacity:1,duration:.05,ease:"none"},E+12.5);
tl.fromTo($$("#e-merge .ms")[1],{scale:1},{scale:1.06,duration:.12,yoyo:true,repeat:1},E+12.45);
tl.to("#e-merge .mo",{backgroundColor:"#7dffb0",borderColor:"#7dffb0",color:"#07080a",duration:.2,ease:"none"},E+12.75);
tl.fromTo("#e-merge",{boxShadow:"0 30px 80px rgba(0,0,0,.55),0 0 0 0 rgba(125,255,176,0)"},{boxShadow:"0 30px 80px rgba(0,0,0,.55),0 0 100px 12px rgba(125,255,176,.5)",duration:.3,ease:"power2.out",yoyo:true,repeat:1},E+12.75);
mi("#e-cap2",E+12.3,{d:.9});
tl.to("#e-cam",{opacity:0,duration:.25,ease:"power2.in"},E+13.85);

// olay günlüğü
(function(){
tl.to("#e-log,#e-logl",{opacity:1,duration:.6,ease:"none"},E+1.5);
const EV=[[2.1, "G01 G02", "CLAUDE'a atandı", ""], [2.3, "G03 G04", "CODEX'e atandı", ""], [3.85, "CLAUDE", "“tamamlandı”", ""], [4.1, "CODEX", "“tamamlandı”", ""], [5.0, "KAPI", "denetliyor · CLAUDE", ""], [6.05, "KAPI", "CLAUDE → KABUL", "ok"], [7.1, "KAPI", "denetliyor · CODEX", ""], [8.15, "KAPI", "CODEX → RED", "no"], [9.0, "CODEX", "düzeltiyor", ""], [10.85, "KAPI", "denetliyor · CODEX", ""], [11.6, "KAPI", "CODEX → KABUL", "ok"], [12.6, "BİRLEŞTİR", "tamam · çıktı birleşti", "ok"]];
const box=$("#e-log");
EV.forEach((e,i)=>{const d=document.createElement("div");d.className="lg "+e[3];d.innerHTML='<b>'+e[1]+'</b><span>'+e[2]+'</span>';d.style.opacity=0;box.appendChild(d);});
const L=$$("#e-log .lg");
EV.forEach((e,i)=>{
  const t=E+e[0];
  L.forEach((d,j)=>{
    if(j>i)return;
    const slot=4-(i-j);
    if(j===i)tl.fromTo(d,{opacity:0,y:slot*38+14},{opacity:1,y:slot*38,duration:.28,ease:"power3.out"},t);
    else tl.to(d,{y:slot*38,opacity:slot<0?0:(slot===0?.3:(slot===1?.5:1)) ,duration:.28,ease:"power3.out"},t);
  });
});
})();
})();
