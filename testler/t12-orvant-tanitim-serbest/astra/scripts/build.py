from pathlib import Path
import json
P=Path('film'); (P/'assets').mkdir(exist_ok=True)
css='''
@font-face{font-family:Manrope;src:url('assets/Manrope.ttf');font-weight:200 800}
@font-face{font-family:Mono;src:url('assets/Mono.ttf');font-weight:400}
:root{--bg:#111510;--fg:#f0f0e6;--acid:#cefa69;--muted:#adb4a6}
*{box-sizing:border-box}html,body{margin:0;width:100%;height:100%;background:var(--bg);color:var(--fg);font-family:Manrope,sans-serif}#root{width:100%;height:100%;position:relative;overflow:hidden}.clip,.scene{position:absolute;inset:0;width:100%;height:100%;overflow:hidden}.scene{background:var(--bg)}
.canvas{position:absolute;inset:0;width:1920px;height:1080px;pointer-events:none}.top{position:absolute;left:100px;right:100px;top:63px;display:flex;justify-content:space-between;align-items:center;font:22px Mono,monospace;letter-spacing:2px;color:var(--muted)}.brand{color:var(--fg);font:800 28px Manrope;letter-spacing:-1px}.brand:before{content:'';display:inline-block;width:17px;height:17px;margin-right:13px;border:4px solid var(--acid);border-radius:50%}.bottom{position:absolute;left:100px;right:100px;bottom:56px;display:flex;align-items:center;justify-content:space-between;font:20px Mono;letter-spacing:1px;color:var(--muted)}.bottom:before{content:'';position:absolute;top:-25px;left:0;right:0;height:1px;background:#3c4335}.eyebrow{font:22px Mono;letter-spacing:3px;color:var(--acid);text-transform:uppercase}.headline{font-weight:650;font-size:112px;line-height:1.08;letter-spacing:-6px;margin:0}.muted{color:var(--muted)}.acid{color:var(--acid)}.copy{font-size:32px;line-height:1.5;letter-spacing:-.7px}.mask{overflow:hidden;padding-bottom:14px}.pill{display:inline-flex;gap:12px;align-items:center;border:1px solid #566345;padding:12px 20px;border-radius:40px;font:20px Mono;color:var(--acid)}.dot{width:8px;height:8px;border-radius:50%;background:var(--acid)}.rule{height:2px;background:#49533c;transform-origin:left}.small{font:22px Mono;color:var(--muted);line-height:1.6}.fullsvg{position:absolute;inset:0;width:1920px;height:1080px;overflow:visible}.line{stroke:#566345;fill:none;stroke-width:2}.bright{stroke:var(--acid);fill:none;stroke-width:3}.tag{font:21px Mono;letter-spacing:1px;color:var(--muted)}
'''
(P/'assets/style.css').write_text(css)
art=r'''
window.ORV={};
ORV.draw=function(canvas,time,variant){
 const ctx=canvas.getContext('2d'), W=1920,H=1080;ctx.clearRect(0,0,W,H);
 // Fine architectural field, deterministic and slowly advancing.
 ctx.strokeStyle='#263020';ctx.lineWidth=1;
 for(let x=100;x<1920;x+=120){ctx.beginPath();ctx.moveTo(x,145);ctx.lineTo(x,950);ctx.stroke()}
 for(let y=190;y<980;y+=120){ctx.beginPath();ctx.moveTo(90,y);ctx.lineTo(1840,y);ctx.stroke()}
 ctx.fillStyle='#687354';for(let i=0;i<54;i++){let x=100+(i*337%1730),y=165+(i*193%760);ctx.globalAlpha=.14+.14*Math.sin(time*.6+i);ctx.fillRect(x,y,2,2)}ctx.globalAlpha=1;
 if(variant==='network'){
  const cx=1370,cy=545;ctx.save();ctx.translate(cx,cy);
  for(let j=0;j<3;j++){ctx.beginPath();ctx.ellipse(0,0,170+j*94,170+j*94,0,0,Math.PI*2);ctx.strokeStyle='#3b4630';ctx.stroke()}
  for(let i=0;i<28;i++){let a=i*2.39996+time*.07,r=160+(i%4)*63,x=Math.cos(a)*r,y=Math.sin(a)*r;
   ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(0,0);ctx.strokeStyle=i%4===0?'#829d4a':'#465438';ctx.globalAlpha=.24;ctx.stroke();ctx.globalAlpha=1;
   ctx.fillStyle=i%4===0?'#cefa69':'#6d7a5c';ctx.fillRect(x-3,y-3,6,6);
   let p=(time*.32+i*.13)%1;ctx.fillStyle='#cefa69';ctx.beginPath();ctx.arc(x*(1-p),y*(1-p),2.7,0,Math.PI*2);ctx.fill();
  }
  ctx.fillStyle='#111510';ctx.beginPath();ctx.arc(0,0,94,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#cefa69';ctx.lineWidth=2;ctx.stroke();
  ctx.strokeStyle='#f0f0e6';ctx.lineWidth=3;ctx.beginPath();ctx.arc(0,-20,17,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.arc(0,36,35,Math.PI,0);ctx.stroke();ctx.restore();return;
 }
 if(!['hero','close'].includes(variant))return;
 const cx=variant==='hero'?1390:1430,cy=variant==='hero'?525:520;
 const t=time*.18, size=variant==='hero'?1.12:.91;
 const ax=.9+.12*Math.sin(t),ay=t*.45+.3;
 function rot(x,y,z){let y1=y*Math.cos(ax)-z*Math.sin(ax),z1=y*Math.sin(ax)+z*Math.cos(ax);return [x*Math.cos(ay)+z1*Math.sin(ay),y1,-x*Math.sin(ay)+z1*Math.cos(ay)]}
 function point(u,v){const R=240,r=77;let p=rot((R+r*Math.cos(v))*Math.cos(u),(R+r*Math.cos(v))*Math.sin(u),r*Math.sin(v));let s=1000/(1000-p[2]);return [cx+p[0]*s*size,cy+p[1]*s*size,p[2]]}
 const polys=[],N=100,M=26;
 for(let i=0;i<N;i++){let u=i/N*Math.PI*2;for(let j=0;j<M;j++){
 // Narrow incision between curved lamellae.
 let v=j/M*Math.PI*2;let p=[point(u,v),point(u+Math.PI*2/N*.95,v),point(u+Math.PI*2/N*.95,v+Math.PI*2/M*.87),point(u,v+Math.PI*2/M*.87)];
 let n=rot(Math.cos(v)*Math.cos(u),Math.cos(v)*Math.sin(u),Math.sin(v));let light=Math.max(0,n[0]*-.35+n[1]*-.65+n[2]*.75);let spec=Math.pow(Math.max(0,n[2]*.95-n[1]*.3),15);let c=.17+light*.67+spec*.8;
 polys.push({p,z:p.reduce((a,q)=>a+q[2],0)/4,c});
 }}
 polys.sort((a,b)=>a.z-b.z);
 for(const q of polys){ctx.fillStyle=`rgb(${Math.min(240,Math.round(206*q.c))},${Math.min(255,Math.round(250*q.c))},${Math.min(185,Math.round(105*q.c))})`;ctx.beginPath();q.p.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.closePath();ctx.fill()}
 ctx.strokeStyle='#6e8545';ctx.lineWidth=1;
 ctx.beginPath();ctx.ellipse(cx,cy+26,460,170,-.22,0,Math.PI*2);ctx.stroke();
 for(let i=0;i<3;i++){let a=time*.23+i*2.094;let x=Math.cos(a)*460,y=Math.sin(a)*170;ctx.fillStyle='#cefa69';ctx.beginPath();ctx.arc(cx+x*Math.cos(-.22)-y*Math.sin(-.22),cy+26+x*Math.sin(-.22)+y*Math.cos(-.22),5,0,6.283);ctx.fill()}
};
'''
(P/'assets/art.js').write_text(art)
scenes=[]
def scene(id,dur,title,body,js,variant='field',extra=''):
 common=f'''<canvas id="{id}-art" class="canvas" width="1920" height="1080" data-layout-ignore></canvas><div class="top"><div class="brand">orvant</div><div>{title}</div></div><div class="bottom"><span>OTONOM ORKESTRASYON</span><span>{id[-1]} / 6</span></div>'''
 anim=f'''const tl=gsap.timeline({{paused:true}});const clock={{t:0}};tl.to(clock,{{t:{dur},duration:{dur},ease:'none',onUpdate:()=>ORV.draw(document.getElementById('{id}-art'),clock.t,'{variant}')}},0);ORV.draw(document.getElementById('{id}-art'),0,'{variant}');'''
 if id=='s1':
  js += "\ntl.fromTo('#s1-l1',{y:0},{y:-14,duration:2.2,repeat:1,yoyo:true,ease:'sine.inOut'},2.3);tl.fromTo('#s1-l3',{y:0},{y:12,duration:2,repeat:1,yoyo:true,ease:'sine.inOut'},2.7);"
 if id=='s3':
  js += "\n['#s3-one','#s3-two','#s3-three'].forEach((q,i)=>{tl.fromTo(q,{borderColor:'#64764d',backgroundColor:'#171e13'},{borderColor:'#cefa69',backgroundColor:'#26351b',duration:.45,repeat:1,yoyo:true},2.3+i*1.75)});"
 if id=='s4':
  js += "\ntl.fromTo('#s4-worker',{x:0},{x:80,duration:1.3,ease:'power2.inOut',immediateRender:false},2.4);tl.fromTo('#s4-scan',{y:0,opacity:0},{y:278,opacity:1,duration:1.05,repeat:4,ease:'power1.inOut'},2);"
 script=f"(function(){{{anim}\n{js}\nwindow.__timelines['{id}']=tl;}})();"
 s=f'<template><style>{extra}</style><div id="{id}" class="scene" data-composition-id="{id}" data-width="1920" data-height="1080" data-duration="{dur}">{common}{body}</div><script>{script}</script></template>'
 (P/f'compositions/{id}.html').write_text(s)
 scenes.append((id,dur,s,script,common+body,extra))
scene('s1',7,'01 — OPERATÖR YÜKÜ', '''
<div style="position:absolute;left:100px;top:235px;width:1050px"><div class="eyebrow" id="s1-kicker">YAPAY ZEKÂ KODLAMA AJANLARI</div><div class="mask" style="margin-top:35px"><h1 id="s1-a" class="headline">Ajanlar<br>çalışıyor.</h1></div><div class="mask" style="margin-top:40px"><div id="s1-b" style="font-size:70px;line-height:1.12;letter-spacing:-3px">Operatör hâlâ<br><span class="acid">sensin.</span></div></div></div>
<div id="s1-l1" class="task" style="left:1160px;top:210px">01 <span>İş tanımı</span></div><div id="s1-l2" class="task" style="left:1460px;top:363px">02 <span>Model seçimi</span></div><div id="s1-l3" class="task" style="left:1090px;top:715px">03 <span>Doğrulama</span></div><div id="s1-l4" class="task" style="left:1450px;top:805px">04 <span>Hata teşhisi</span></div>
<div id="s1-person" class="tag" style="position:absolute;left:1310px;top:670px">OPERATÖR</div>
''', '''
tl.fromTo('#s1-kicker',{opacity:0,x:-30},{opacity:1,x:0,duration:.6},.15);
tl.fromTo('#s1-a',{y:250},{y:0,duration:.9,ease:'power4.out'},.3);
tl.fromTo('#s1-b',{y:210},{y:0,duration:.85,ease:'power4.out'},2.5);
['#s1-l1','#s1-l2','#s1-l3','#s1-l4'].forEach((q,i)=>{tl.fromTo(q,{opacity:0,scale:.85,y:20},{opacity:1,scale:1,y:0,duration:.5,ease:'back.out(1.5)'},.8+i*.55)});
tl.fromTo('#s1-person',{opacity:0},{opacity:1,duration:.6},2);
tl.to('#s1-art',{scale:1.035,duration:6.7,ease:'none'},.2);
''','network', '.task{position:absolute;border:1px solid #5b664d;background:#1b2118;padding:20px 25px;font:20px Mono;color:#cefa69;border-radius:6px;box-shadow:0 18px 35px #05070588}.task span{color:#f0f0e6;margin-left:15px;font:500 28px Manrope}')
scene('s2',6,'02 — YENİ BİR KATMAN','''
<div style="position:absolute;left:100px;top:260px;width:1000px"><div id="s2-pre" class="eyebrow">TANIŞTIRALIM</div><div class="mask" style="margin-top:20px"><div id="s2-name" style="font-size:216px;line-height:1.2;font-weight:800;letter-spacing:-15px">orvant<span class="acid">.</span></div></div><div class="mask"><div id="s2-line" style="font-size:58px;letter-spacing:-2px;margin-top:15px">Operatörü devralmak için.</div></div><div id="s2-sub" class="copy muted" style="max-width:710px;margin-top:40px">Yapay zekâ ajanları için<br>kendi başına çalışan orkestrasyon sistemi.</div></div><div id="s2-note" class="pill" style="position:absolute;left:1230px;top:858px"><span class="dot"></span>GELİŞTİRME AŞAMASINDA</div>
''','''
tl.fromTo('#s2-art',{scale:1.4,opacity:0},{scale:1,opacity:1,duration:1.5,ease:'power3.out'},0);
tl.fromTo('#s2-pre',{opacity:0},{opacity:1,duration:.4},.15);
tl.fromTo('#s2-name',{y:270,rotation:4},{y:0,rotation:0,duration:1,ease:'power4.out'},.2);
tl.fromTo('#s2-line',{y:100},{y:0,duration:.7,ease:'power3.out'},1.1);
tl.fromTo('#s2-sub',{x:-40,opacity:0},{x:0,opacity:1,duration:.6},1.6);
tl.fromTo('#s2-note',{y:30,opacity:0},{y:0,opacity:1,duration:.6},2.2);
''','hero')
scene('s3',10,'03 — BUGÜN ÇALIŞAN SİSTEM','''
<div style="position:absolute;left:100px;top:190px"><div class="eyebrow" id="s3-eye">S1 → S2 → S3</div><h1 id="s3-title" class="headline" style="font-size:96px;margin-top:24px">Tek cümleden<br>görev akışına.</h1></div><div id="s3-input" class="pill" style="position:absolute;right:110px;top:240px;font:26px Manrope;padding:23px 32px">“Videolarımı kurgulayan bir uygulama.”</div>
<svg class="fullsvg" data-layout-ignore><path class="line" d="M 170 610 H 1750"/><path id="s3-flow" class="bright" d="M 170 610 H 1750" pathLength="1"/></svg>
<div class="stage" id="s3-one" style="left:100px"><div class="stage-id">S1 <span>KARŞILAMA</span></div><div class="stage-name">Niyeti netleştir.</div><div class="stage-body">Karar haritası ve sorular.<br>Onaylı bir sözleşme.</div><div class="stage-bottom">İSTEK → SÖZLEŞME</div></div>
<div class="stage" id="s3-two" style="left:695px"><div class="stage-id">S2 <span>MİMAR</span></div><div class="stage-name">İşi yapılandır.</div><div class="stage-body">Görev grafiği.<br>Gereken yetki istekleri.</div><div class="stage-bottom">SÖZLEŞME → PLAN</div></div>
<div class="stage" id="s3-three" style="left:1290px"><div class="stage-id">S3 <span>YÜRÜTÜCÜ</span></div><div class="stage-name">Çalıştır. Doğrula.</div><div class="stage-body">Ajanlara dağıt.<br>Bağımsız kapıdan geçir. Birleştir.</div><div class="stage-bottom">PLAN → DOĞRULANMIŞ ÇIKTI</div></div>
''','''
tl.fromTo('#s3-title',{opacity:0,x:-80},{opacity:1,x:0,duration:.8,ease:'power4.out'},.15);
tl.fromTo('#s3-eye',{opacity:0},{opacity:1,duration:.4},.1);
tl.fromTo('#s3-input',{y:-35,opacity:0},{y:0,opacity:1,duration:.7,ease:'power3.out'},.6);
['#s3-one','#s3-two','#s3-three'].forEach((q,i)=>{tl.fromTo(q,{y:90,opacity:0,rotation:3},{y:0,opacity:1,rotation:0,duration:.8,ease:'power3.out'},1.4+i*1.75);tl.fromTo(q+' .stage-bottom',{opacity:.3},{opacity:1,duration:.7},2.1+i*1.75)});
tl.fromTo('#s3-flow',{strokeDasharray:1,strokeDashoffset:1},{strokeDashoffset:0,duration:5.2,ease:'none'},1.5);
''','field','.stage{position:absolute;top:530px;width:530px;height:350px;border:1px solid #64764d;background:#171e13;border-radius:12px;padding:32px 30px}.stage-id{font:30px Mono;color:#cefa69;display:flex;gap:26px;align-items:center}.stage-id span{font:20px Mono;letter-spacing:2px;color:#adb4a6}.stage-name{font-size:38px;font-weight:650;letter-spacing:-1.5px;margin-top:32px}.stage-body{font-size:27px;color:#adb4a6;line-height:1.55;margin-top:17px}.stage-bottom{font:18px Mono;color:#cefa69;margin-top:26px}')
scene('s4',9,'04 — KANIT KAPISI','''
<div style="position:absolute;left:100px;top:180px;width:1200px"><div id="s4-eye" class="eyebrow">KANITSIZ “BİTTİ” YOK</div><div class="mask" style="margin-top:35px"><h1 id="s4-title" class="headline" style="font-size:105px">“Bitti.”<br>bir kanıt değil.</h1></div></div>
<div id="s4-worker" style="position:absolute;left:150px;top:605px;width:430px;height:194px;padding:31px;border:1px solid #657054;border-radius:10px;background:#1b2117"><div class="tag">İŞÇİ AJAN</div><div style="font-size:43px;margin-top:18px;letter-spacing:-2px">Tamamlandı.</div><div style="font:18px Mono;color:#adb4a6;margin-top:12px">ÖZ BİLDİRİM</div></div>
<svg class="fullsvg" data-layout-ignore><path class="line" d="M 600 700 H 1240"/><path id="s4-pass" class="bright" d="M 600 700 H 1210" pathLength="1"/><path id="s4-check" d="M 1268 705 L 1295 732 L 1345 674" class="bright" stroke-width="8" pathLength="1"/></svg>
<div id="s4-gate" style="position:absolute;left:880px;top:505px;width:102px;height:330px;border:2px solid #cefa69;border-radius:50px;background:#cefa6910;box-shadow:0 0 80px #aadd4430"><div style="position:absolute;top:22px;bottom:22px;left:48px;width:2px;background:#cefa69"></div><div id="s4-scan" style="position:absolute;left:10px;right:10px;top:23px;height:3px;background:#cefa69;box-shadow:0 0 15px #cefa69"></div></div>
<div id="s4-verdict" style="position:absolute;left:1250px;top:478px;width:560px"><div class="eyebrow">KABUL KARARI</div><div style="font-size:58px;font-weight:650;line-height:1.17;letter-spacing:-2.6px;margin-top:25px">Bağımsız kapı<br>karar verir.</div><div class="copy muted" style="margin-top:100px;font-size:27px">İşçinin beyanı, kabul değildir.</div></div>
<div id="s4-lock" class="pill" style="position:absolute;left:1040px;top:260px;font-size:23px;border-color:#536444"><svg width="25" height="27" viewBox="0 0 25 27"><path d="M6 11V7a6.5 6.5 0 0 1 13 0v4M3 11h19v14H3z" fill="none" stroke="#cefa69" stroke-width="2"/></svg>Yetkiler varsayılan olarak kapalı.</div>
''','''
tl.fromTo('#s4-title',{y:250},{y:0,duration:.8,ease:'power4.out'},.1);
tl.fromTo('#s4-eye',{opacity:0},{opacity:1,duration:.5},.1);
tl.fromTo('#s4-worker',{x:-100,opacity:0},{x:0,opacity:1,duration:.7,ease:'power3.out'},1.1);
tl.fromTo('#s4-gate',{scaleY:0},{scaleY:1,duration:.8,ease:'power3.inOut'},1.8);
tl.fromTo('#s4-pass',{strokeDasharray:1,strokeDashoffset:1},{strokeDashoffset:0,duration:1.7,ease:'power2.inOut'},2.3);
tl.fromTo('#s4-verdict',{opacity:0,x:45},{opacity:1,x:0,duration:.7},3.4);
tl.fromTo('#s4-check',{strokeDasharray:1,strokeDashoffset:1},{strokeDashoffset:0,duration:.5},4.2);
tl.fromTo('#s4-lock',{opacity:0,y:-30},{opacity:1,y:0,duration:.7,ease:'power3.out'},5.4);
''')
scene('s5',11,'05 — GELİŞİM YOLU','''
<div style="position:absolute;left:100px;top:192px;width:760px"><div id="s5-eye" class="eyebrow">GELİŞTİRME AŞAMASINDA</div><h1 id="s5-title" class="headline" style="font-size:99px;margin-top:30px">Bir sonraki<br>eşik: kendi<br><span class="acid">operatörü.</span></h1><div id="s5-now" class="pill" style="margin-top:43px;font-size:24px"><span class="dot"></span>BUGÜN: S1–S3 ÇALIŞIYOR</div><div id="s5-metric" style="margin-top:52px;border-top:1px solid #61704e;padding-top:25px;width:645px"><div class="tag">İLERLEME ÖLÇÜSÜ / OPERATÖR PAYI</div><div class="copy muted" style="font-size:28px;margin-top:12px">Operatör işlerinin ne kadarını<br>Orvant, ne kadarını insan yapıyor?</div></div></div>
<div style="position:absolute;left:975px;top:216px;width:835px"><div class="tag" id="s5-road">YOL HARİTASI / HEDEF</div>
<div id="s5-r1" class="road"><div class="road-n">S4</div><div><div class="road-title">Kendi onarımı.</div><div class="road-sub">Başarısızlığı sınıflayıp onarmak.</div></div><span class="target">HEDEF</span></div>
<div id="s5-r2" class="road"><div class="road-n">S5</div><div><div class="road-title">Kanıtla gelişim.</div><div class="road-sub">Yöntemi gerçek koşularda iyileştirmek.</div></div><span class="target">HEDEF</span></div>
<div id="s5-r3" class="road"><div class="road-n">S6</div><div><div class="road-title">Kendi operatörü.</div><div class="road-sub">Operatörlük işini devralmak.</div></div><span class="target">HEDEF</span></div>
</div>
''','''
tl.fromTo('#s5-title',{x:-100,opacity:0},{x:0,opacity:1,duration:.85,ease:'power4.out'},.1);
tl.fromTo('#s5-eye,#s5-road',{opacity:0},{opacity:1,duration:.5},.2);
tl.fromTo('#s5-now',{scale:.9,opacity:0},{scale:1,opacity:1,duration:.6,ease:'back.out(1.3)'},.8);
['#s5-r1','#s5-r2','#s5-r3'].forEach((q,i)=>tl.fromTo(q,{x:150,opacity:0},{x:0,opacity:1,duration:.85,ease:'power3.out'},1.3+i*1.8));
tl.fromTo('#s5-metric',{y:30,opacity:0},{y:0,opacity:1,duration:.8},6.5);
''','field','.road{height:197px;border-bottom:1px dashed #667253;display:flex;align-items:center;gap:30px;position:relative}.road-n{font:46px Mono;color:#cefa69;width:90px}.road-title{font-size:42px;font-weight:600;letter-spacing:-1.8px}.road-sub{font-size:26px;color:#adb4a6;margin-top:14px}.target{position:absolute;right:0;top:25px;font:16px Mono;color:#adb4a6;letter-spacing:2px}')
scene('s6',9,'06 — GERÇEK İŞLE GELİŞİR','''
<div id="s6-project" style="position:absolute;left:100px;top:235px;width:1060px"><div class="eyebrow">İLK GERÇEK PROJE</div><div style="font-size:80px;font-weight:650;line-height:1.15;letter-spacing:-4px;margin-top:30px">Yapay zekâ destekli<br>video kurgu uygulaması.</div><div class="copy muted" style="margin-top:40px">Uygulama geliştikçe Orvant da gelişir.</div><div class="timeline-art" style="margin-top:55px;display:flex;gap:8px"><i style="width:160px"></i><i style="width:280px"></i><i style="width:110px"></i><i style="width:220px"></i></div></div>
<div id="s6-final" style="position:absolute;left:100px;top:230px;width:1120px"><div style="font-size:217px;font-weight:800;line-height:1.2;letter-spacing:-15px">orvant<span class="acid">.</span></div><div style="font-size:68px;letter-spacing:-3px;line-height:1.2;margin-top:18px">Daha az operatör işi.<br><span class="acid">Daha çok ilerleme.</span></div><div class="pill" style="margin-top:50px"><span class="dot"></span>S1–S3 ÇALIŞIYOR · S4–S6 HEDEF</div></div>
<div id="s6-status" class="small" style="position:absolute;right:110px;top:875px">GELİŞTİRME AŞAMASINDA</div>
''','''
tl.fromTo('#s6-project',{opacity:0,x:-60},{opacity:1,x:0,duration:.7,ease:'power3.out'},.1);
tl.fromTo('.timeline-art i',{scaleX:0},{scaleX:1,stagger:.12,duration:.7,ease:'power3.out'},.7);
tl.fromTo('#s6-project',{y:0,opacity:1},{y:-70,opacity:0,duration:.45,ease:'power3.in',immediateRender:false},3.65);
tl.fromTo('#s6-final',{y:170,opacity:0},{y:0,opacity:1,duration:.85,ease:'power4.out'},4.05);
tl.fromTo('#s6-art',{opacity:.25,scale:.8},{opacity:1,scale:1,duration:1.5,ease:'power3.out'},3.75);
tl.fromTo('#s6-status',{opacity:0},{opacity:1,duration:.7},4.5);
''','close','.timeline-art i{display:block;height:34px;background:#cefa69;border-radius:4px;transform-origin:left}.timeline-art i:nth-child(2n){background:#718546}')
# Master: the same background and persistent chapter ruler unify scene cuts.
start=0;hosts=[]
for i,(sid,dur,*_) in enumerate(scenes):
 hosts.append(f'<div id="host-{sid}" class="clip" data-composition-id="{sid}" data-composition-src="compositions/{sid}.html" data-start="{start}" data-duration="{dur}" data-track-index="{i+1}" data-width="1920" data-height="1080"></div>');start+=dur
head=f'''<meta charset="utf-8"><title>Orvant — Operatörün ötesi</title><style>{css}</style><script src="assets/gsap.min.js"></script><script src="assets/art.js"></script>'''
wipes=''; wipejs=''
for wi,cut in enumerate([7,13,23,32,43]):
 for k,col in enumerate(['#cefa69','#eef0e4']):
  ident=f'wipe-{wi}-{k}'
  wipes+=f'<div id="{ident}" style="position:absolute;inset:0;background:{col};z-index:{100+k};pointer-events:none" data-layout-ignore></div>'
  wipejs+=f"tl.fromTo('#{ident}',{{x:-1920}},{{x:0,duration:.28,ease:'power3.inOut'}},{cut-.39+k*.055});tl.to('#{ident}',{{x:1920,duration:.33,ease:'power3.inOut'}},{cut+.01+k*.045});"
master="const tl=gsap.timeline({paused:true});tl.fromTo('#progress',{scaleX:0},{scaleX:1,duration:52,ease:'none'},0);"+wipejs+"window.__timelines['main']=tl;"
progress=wipes+'<div id="progress" style="position:absolute;bottom:0;left:0;height:5px;width:1920px;transform-origin:left;background:#cefa69;z-index:200" data-layout-ignore></div>'
(P/'index.html').write_text(f'<!doctype html><html lang="tr"><head>{head}</head><body><div id="root" data-composition-id="main" data-width="1920" data-height="1080" data-duration="52">'+''.join(hosts)+progress+'<audio id="soundtrack" src="assets/soundtrack.wav" data-start="0" data-duration="52" data-track-index="9"></audio></div><script>'+master+'</script></body></html>')
# Self-contained local player, also used for exact-time browser QA.
standalone=''.join(f'<style>{ex}</style><section id="{sid}" class="scene" style="display:none">{body}</section>' for sid,dur,s,script,body,ex in scenes)
scripts=''.join(f'<script>{scr}</script>' for sid,dur,s,scr,body,ex in scenes)
seekjs='''window.seek=function(t){t=Math.max(0,Math.min(51.999,t));let start=0;for(const [id,d] of window.SCENES){document.getElementById(id).style.display=(t>=start&&t<start+d)?'block':'none';window.__timelines[id].time(Math.max(0,Math.min(d,t-start)),false);start+=d;}window.__timelines.main.time(t,false);window.currentTime=t;};seek(0);'''
preview=f'<!doctype html><html lang="tr"><head>{head}<style>body{{overflow:hidden}}#root{{width:1920px;height:1080px;transform-origin:top left}}#play{{position:fixed;right:20px;bottom:18px;z-index:999;background:#cefa69;color:#111510;border:0;padding:12px 24px;border-radius:40px;font:16px Manrope;cursor:pointer}}</style></head><body><div id="root">{standalone}{progress}</div><audio id="soundtrack" src="assets/soundtrack.wav"></audio><button id="play">▶ Filmi oynat</button><script>window.__timelines={{}};window.SCENES={json.dumps([(s[0],s[1]) for s in scenes])};</script>{scripts}<script>{master}{seekjs}function fit(){{document.getElementById("root").style.transform=`scale(${{Math.min(innerWidth/1920,innerHeight/1080)}})`}}fit();onresize=fit;let playing=false;let base=0;const a=document.getElementById("soundtrack");document.getElementById("play").onclick=()=>{{playing=!playing;if(playing){{a.currentTime=window.currentTime||0;a.play();}}else a.pause();document.getElementById("play").textContent=playing?"Ⅱ Duraklat":"▶ Filmi oynat"}};function frame(){{if(playing){{seek(a.currentTime);if(a.ended){{playing=false;seek(0)}}}}requestAnimationFrame(frame)}}requestAnimationFrame(frame);</script></body></html>'
(P/'player.html').write_text(preview)
print('Built',len(scenes),'scenes;',start,'seconds')
