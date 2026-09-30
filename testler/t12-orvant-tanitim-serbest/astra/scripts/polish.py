from pathlib import Path
p=Path('scripts/build.py');s=p.read_text()
s=s.replace("script=f\"(function(){{{anim}\\n{js}\\nwindow.__timelines['{id}']=tl;}})();\"",'''if id=='s1':
  js += "\\ntl.fromTo('#s1-l1',{y:0},{y:-14,duration:2.2,repeat:1,yoyo:true,ease:'sine.inOut'},2.3);tl.fromTo('#s1-l3',{y:0},{y:12,duration:2,repeat:1,yoyo:true,ease:'sine.inOut'},2.7);"
 if id=='s3':
  js += "\\n['#s3-one','#s3-two','#s3-three'].forEach((q,i)=>{tl.fromTo(q,{borderColor:'#64764d',backgroundColor:'#171e13'},{borderColor:'#cefa69',backgroundColor:'#26351b',duration:.45,repeat:1,yoyo:true},2.3+i*1.75)});"
 if id=='s4':
  js += "\\ntl.fromTo('#s4-worker',{x:0},{x:80,duration:1.3,ease:'power2.inOut',immediateRender:false},2.4);tl.fromTo('#s4-scan',{y:0,opacity:0},{y:278,opacity:1,duration:1.05,repeat:4,ease:'power1.inOut'},2);"
 script=f"(function(){{{anim}\\n{js}\\nwindow.__timelines['{id}']=tl;}})();"''')
s=s.replace('<div style="position:absolute;top:22px;bottom:22px;left:48px;width:2px;background:#cefa69"></div></div>', '<div style="position:absolute;top:22px;bottom:22px;left:48px;width:2px;background:#cefa69"></div><div id="s4-scan" style="position:absolute;left:10px;right:10px;top:23px;height:3px;background:#cefa69;box-shadow:0 0 15px #cefa69"></div></div>')
s=s.replace("master='''const tl=gsap.timeline({paused:true});tl.fromTo('#progress',{scaleX:0},{scaleX:1,duration:52,ease:'none'},0);window.__timelines['main']=tl;'''",'''wipes=''; wipejs=''
for wi,cut in enumerate([7,13,23,32,43]):
 for k,col in enumerate(['#cefa69','#eef0e4']):
  ident=f'wipe-{wi}-{k}'
  wipes+=f'<div id="{ident}" style="position:absolute;inset:0;background:{col};z-index:{100+k};pointer-events:none" data-layout-ignore></div>'
  wipejs+=f"tl.fromTo('#{ident}',{{x:-1920}},{{x:0,duration:.28,ease:'power3.inOut'}},{cut-.39+k*.055});tl.to('#{ident}',{{x:1920,duration:.33,ease:'power3.inOut'}},{cut+.01+k*.045});"
master="const tl=gsap.timeline({paused:true});tl.fromTo('#progress',{scaleX:0},{scaleX:1,duration:52,ease:'none'},0);"+wipejs+"window.__timelines['main']=tl;"''')
s=s.replace("progress='<div id=", "progress=wipes+'<div id=")
p.write_text(s)
