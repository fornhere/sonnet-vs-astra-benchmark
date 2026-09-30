import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const $ = (s, base = document) => base.querySelector(s);
const $$ = (s, base = document) => [...base.querySelectorAll(s)];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reducedMotion) document.documentElement.classList.add('js-motion');
const colors = {
  sand: {name: 'Kum', shell: '#a2937c', ring: '#bbaa8d', cloth: '#8b887e', trim: '#514d41'},
  night: {name: 'Gece', shell: '#424b44', ring: '#687267', cloth: '#899188', trim: '#242c26'},
  copper: {name: 'Bakır', shell: '#b56e50', ring: '#d19a73', cloth: '#b3a594', trim: '#663e2c'}
};
let chosenColor = 'sand';
let models = [];
let mainRenderer, configRenderer, mainScene, configScene, mainCamera, configCamera;
let mainProduct, configProduct, environment, configEnvironment, mainShadow;
let viewport = {width:innerWidth, height:innerHeight};
let scrollYTarget = window.scrollY;
let scrollPosition = scrollYTarget;
let dirty = true;
let configVisible = false;
let webglOK = false;
let chapterRects = [];
let dragAngle = 0, configAngle = -.42, configPitch = -.08;
let renderedFrames = 0;
const story = $('#story');
const stage = $('#stage');
const bg = $('.stage-background');
const tmpColor = new THREE.Color();
const bgColors = [new THREE.Color('#efede7'),new THREE.Color('#e7e8df'),new THREE.Color('#222d22')];
const mix = THREE.MathUtils.lerp;
const clamp = THREE.MathUtils.clamp;
const smooth = t => t*t*(3-2*t);

// All materials, meshes and illumination are authored locally; no 3D asset requests.
function makeTexture(size, draw) {
  const canvas = document.createElement('canvas'); canvas.width = canvas.height = size;
  draw(canvas.getContext('2d'), size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}
let seed = 21;
function rand(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;}
const fabricMap = makeTexture(1024, (ctx, s) => {
  ctx.fillStyle='#333630';ctx.fillRect(0,0,s,s);
  for(let y=0;y<s;y+=5){
    for(let x=0;x<s;x+=5){
      const ox = x+(y%10===0?0:2.5);
      ctx.fillStyle='#151912';ctx.beginPath();ctx.ellipse(ox,y,1.45,1.9,-.3,0,Math.PI*2);ctx.fill();
      const n=48+Math.floor(rand()*28);ctx.strokeStyle=`rgb(${n},${n},${n-4})`;ctx.lineWidth=.7;
      ctx.beginPath();ctx.moveTo(ox-2,y+1.5);ctx.quadraticCurveTo(ox,y-3,ox+2.8,y-1);ctx.stroke();
      ctx.fillStyle='#939387';ctx.globalAlpha=.35;ctx.fillRect(ox+.7,y-2,1,.7);ctx.globalAlpha=1;
    }
  }
});
const metalMap = makeTexture(256,(ctx,s)=>{
  const d=ctx.createImageData(s,s);
  for(let i=0;i<d.data.length;i+=4){const n=185+Math.floor(rand()*40);d.data[i]=d.data[i+1]=d.data[i+2]=n;d.data[i+3]=255;}
  ctx.putImageData(d,0,0);
});
metalMap.wrapS=metalMap.wrapT=THREE.RepeatWrapping;metalMap.repeat.set(4,2);
const shadowMap = makeTexture(128,(ctx,s)=>{const g=ctx.createRadialGradient(s/2,s/2,0,s/2,s/2,s/2);g.addColorStop(0,'rgba(24,31,18,0.48)');g.addColorStop(.3,'rgba(24,31,18,0.27)');g.addColorStop(.65,'rgba(24,31,18,0.07)');g.addColorStop(1,'rgba(24,31,18,0)');ctx.fillStyle=g;ctx.fillRect(0,0,s,s);});
function domedDisk(radius, centerZ, bulge, segments=160, rings=20) {
  const verts=[],uvs=[],indices=[];
  for(let i=0;i<=rings;i++){
    const r=radius*i/rings;
    for(let j=0;j<=segments;j++){
      const a=j/segments*Math.PI*2,x=Math.cos(a)*r,y=Math.sin(a)*r;
      verts.push(x,y,centerZ+bulge*(1-(r/radius)**2));uvs.push(x/(radius*2)+.5,y/(radius*2)+.5);
      if(i<rings && j<segments){const c=i*(segments+1)+j;indices.push(c,c+1,c+segments+1,c+1,c+segments+2,c+segments+1);}
    }
  }
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));g.setIndex(indices);g.computeVertexNormals();return g;
}
function lathe(profile, material) {
  const curve=new THREE.SplineCurve(profile.map(p=>new THREE.Vector2(...p)));
  const points=curve.getPoints(120).map(p=>new THREE.Vector2(Math.max(0,p.x),p.y));
  const geo=new THREE.LatheGeometry(points,128);geo.rotateX(Math.PI/2);
  return new THREE.Mesh(geo,material);
}
function ring(radius,tube,z,material){const mesh=new THREE.Mesh(new THREE.TorusGeometry(radius,tube,12,160),material);mesh.position.z=z;return mesh;}
function labelTexture(text,color='#ddd1b7',size=70){return makeTexture(512,(ctx,s)=>{ctx.clearRect(0,0,s,s);ctx.fillStyle=color;ctx.font=`500 ${size}px Manrope, sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,s/2,s/2);});}
function createProduct() {
  const root=new THREE.Group();
  const core=new THREE.Group();root.add(core);
  const shellMaterial=new THREE.MeshPhysicalMaterial({color:colors.sand.shell,metalness:.78,roughness:.45,clearcoat:.12,clearcoatRoughness:.5,roughnessMap:metalMap});
  const ringMaterial=new THREE.MeshStandardMaterial({color:colors.sand.ring,metalness:.86,roughness:.27});
  const trimMaterial=new THREE.MeshStandardMaterial({color:colors.sand.trim,metalness:.68,roughness:.44});
  const clothMaterial=new THREE.MeshStandardMaterial({color:colors.sand.cloth,map:fabricMap,roughness:1,bumpMap:fabricMap,bumpScale:.012,metalness:.04,side:THREE.DoubleSide});
  const darkMaterial=new THREE.MeshStandardMaterial({color:'#232822',roughness:.7,metalness:.15});
  const blackMetal=new THREE.MeshStandardMaterial({color:'#30362e',roughness:.37,metalness:.7});
  const orangeMaterial=new THREE.MeshStandardMaterial({color:'#d98442',roughness:.4,metalness:.45});
  const shellGroup=new THREE.Group();core.add(shellGroup);
  const shell=lathe([[0,-1.03],[.4,-1.02],[.85,-.9],[1.26,-.68],[1.59,-.36],[1.79,.06],[1.85,.36],[1.81,.55],[1.74,.67],[1.68,.7],[1.63,.65],[1.65,.49],[1.6,.25],[1.46,-.06],[1.2,-.38],[.7,-.61],[0,-.69]],shellMaterial);
  shellGroup.add(shell);
  // Precisely cut front edge and rear seam.
  shellGroup.add(ring(1.707,.028,.682,ringMaterial));
  const rearRing=ring(1.365,.012,-.61,trimMaterial);shellGroup.add(rearRing);
  // Touch surface at the upper edge, with a subtle amber status light.
  const touch=new THREE.Mesh(new THREE.CapsuleGeometry(.065,.40,6,20),trimMaterial);
  touch.rotation.z=Math.PI/2;touch.position.set(0,1.783,.17);touch.scale.set(1,.95,.24);shellGroup.add(touch);
  const status=new THREE.Mesh(new THREE.CapsuleGeometry(.016,.11,5,12),new THREE.MeshStandardMaterial({color:'#edb26b',emissive:'#c6662c',emissiveIntensity:.6}));
  status.rotation.z=Math.PI/2;status.position.set(0,1.80,.26);shellGroup.add(status);
  // Ports and regulatory plaque reveal themselves when the shell rotates.
  const port=new THREE.Mesh(new THREE.BoxGeometry(.31,.09,.025),darkMaterial);port.position.set(0,-.85,-.91);shellGroup.add(port);
  const portInset=new THREE.Mesh(new THREE.BoxGeometry(.17,.018,.028),ringMaterial);portInset.position.copy(port.position);portInset.position.z-=.014;shellGroup.add(portInset);
  const backLabel=new THREE.Mesh(new THREE.PlaneGeometry(.7,.7),new THREE.MeshBasicMaterial({map:labelTexture('aure 01','#6d6e61',42),transparent:true,depthWrite:false}));backLabel.position.set(0,-.4,-1.007);backLabel.rotation.y=Math.PI;shellGroup.add(backLabel);
  // Removable acoustic fabric face.
  const faceGroup=new THREE.Group();core.add(faceGroup);
  const cloth=new THREE.Mesh(domedDisk(1.625,.64,.07),clothMaterial);faceGroup.add(cloth);
  faceGroup.add(ring(1.632,.035,.646,trimMaterial));
  faceGroup.add(ring(1.642,.014,.676,ringMaterial));
  const logo=new THREE.Mesh(new THREE.PlaneGeometry(.89,.89),new THREE.MeshBasicMaterial({map:labelTexture('aure','#dad1b9',70),transparent:true,depthWrite:false}));
  logo.position.set(0,-1.12,.691);faceGroup.add(logo);
  const led=new THREE.Mesh(new THREE.SphereGeometry(.018,12,8),new THREE.MeshBasicMaterial({color:'#d3a975'}));led.position.set(0,-1.36,.669);faceGroup.add(led);
  // Internal driver: machined baffle, rubber suspension, cone, copper voice coil.
  const driverGroup=new THREE.Group();core.add(driverGroup);
  const chassis=new THREE.Mesh(new THREE.CylinderGeometry(1.51,1.51,.16,96),blackMetal);chassis.rotation.x=Math.PI/2;chassis.position.z=.36;driverGroup.add(chassis);
  driverGroup.add(ring(1.41,.025,.47,ringMaterial));
  for(let i=0;i<6;i++){
    const a=i*Math.PI/3+.3;
    const screw=new THREE.Mesh(new THREE.CylinderGeometry(.046,.046,.02,12),trimMaterial);screw.rotation.x=Math.PI/2;screw.position.set(Math.sin(a)*1.34,Math.cos(a)*1.34,.455);driverGroup.add(screw);
    const slot=new THREE.Mesh(new THREE.BoxGeometry(.043,.006,.005),darkMaterial);slot.position.set(screw.position.x,screw.position.y,.468);slot.rotation.z=a;driverGroup.add(slot);
  }
  const woofer=lathe([[0,.57],[.24,.56],[.41,.43],[.72,.23],[.86,.31],[.94,.45],[1.01,.49],[1.09,.43],[1.14,.37],[1.17,.45]],darkMaterial);woofer.position.y=-.19;driverGroup.add(woofer);
  driverGroup.add(ring(1.17,.033,.455,blackMetal));
  const dust=new THREE.Mesh(new THREE.SphereGeometry(.33,48,32),blackMetal);dust.scale.z=.4;dust.position.set(0,-.19,.53);driverGroup.add(dust);
  const tweeter=new THREE.Mesh(new THREE.SphereGeometry(.24,48,24),orangeMaterial);tweeter.scale.z=.48;tweeter.position.set(0,1.03,.48);driverGroup.add(tweeter);
  const magnet=new THREE.Mesh(new THREE.CylinderGeometry(.65,.65,.52,64),blackMetal);magnet.rotation.x=Math.PI/2;magnet.position.z=-.03;driverGroup.add(magnet);
  driverGroup.add(ring(.66,.07,.02,orangeMaterial));
  // Low sculpted pedestal with non-slip bottom.
  const baseGroup=new THREE.Group();root.add(baseGroup);
  const base=new THREE.Mesh(new THREE.CylinderGeometry(.84,1.00,.16,96),shellMaterial);base.scale.z=.82;base.position.set(0,-1.94,-.16);baseGroup.add(base);
  const foot=new THREE.Mesh(new THREE.CylinderGeometry(.96,.96,.036,96),trimMaterial);foot.scale.z=.83;foot.position.set(0,-2.035,-.16);baseGroup.add(foot);
  const neck=new THREE.Mesh(new THREE.CylinderGeometry(.44,.60,.45,64),shellMaterial);neck.scale.z=.72;neck.position.set(0,-1.73,-.20);baseGroup.add(neck);
  const model={root,core,shellGroup,faceGroup,driverGroup,baseGroup,shellMaterial,ringMaterial,clothMaterial,trimMaterial};
  models.push(model);return model;
}
function setupScene(container) {
  const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'high-performance'});
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));renderer.setClearColor(0x000000,0);
  renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
  const scene=new THREE.Scene();
  const pmrem=new THREE.PMREMGenerator(renderer);const room=new RoomEnvironment();
  const env=pmrem.fromScene(room,.04,.1,100,{size:128});scene.environment=env.texture;scene.environmentIntensity=.85;room.dispose();pmrem.dispose();
  const ambient=new THREE.HemisphereLight('#fff9e8','#6d725c',1.7);scene.add(ambient);
  const key=new THREE.DirectionalLight('#fff9e9',3.1);key.position.set(-3,6,5);scene.add(key);
  const fill=new THREE.DirectionalLight('#e2e9e1',.9);fill.position.set(6,1,4);scene.add(fill);
  const back=new THREE.DirectionalLight('#fff1d4',2.3);back.position.set(1,4,-4);scene.add(back);
  const camera=new THREE.PerspectiveCamera(32,1,.1,80);camera.position.set(0,.9,15);camera.lookAt(0,0,0);
  container.appendChild(renderer.domElement);
  renderer.domElement.setAttribute('aria-hidden','true');
  return {renderer,scene,camera,env};
}
function addShadow(scene){const mesh=new THREE.Mesh(new THREE.PlaneGeometry(6.6,4.6),new THREE.MeshBasicMaterial({map:shadowMap,transparent:true,depthWrite:false,opacity:.7}));mesh.rotation.x=-Math.PI/2;mesh.position.set(0,-2.065,0);scene.add(mesh);return mesh;}
async function initialize3D(){
  try{
    await document.fonts.ready;
    const a=setupScene($('#scene'));mainRenderer=a.renderer;mainScene=a.scene;mainCamera=a.camera;environment=a.env;
    mainProduct=createProduct();mainScene.add(mainProduct.root);mainShadow=addShadow(mainScene);
    webglOK=true;resize();renderMain(0);document.documentElement.classList.add('webgl-ready');
    mainRenderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();document.documentElement.classList.remove('webgl-ready');document.documentElement.classList.add('webgl-unavailable');});
    requestAnimationFrame(animate);
    if(configVisible)initializeConfig3D();
  }catch(error){console.warn('3D görünüm kullanılamıyor:',error.message);document.documentElement.classList.add('webgl-unavailable');}
}
function initializeConfig3D(){
  if(!webglOK||configRenderer)return;
  try{
    const b=setupScene($('#config-scene'));configRenderer=b.renderer;configScene=b.scene;configCamera=b.camera;configEnvironment=b.env;
    configProduct=createProduct();configScene.add(configProduct.root);addShadow(configScene);
    configCamera.position.set(0,.9,12.9);configCamera.lookAt(0,-.12,0);
    const c=colors[chosenColor];configProduct.shellMaterial.color.set(c.shell);configProduct.ringMaterial.color.set(c.ring);configProduct.clothMaterial.color.set(c.cloth);configProduct.trimMaterial.color.set(c.trim);
    resize();renderConfig();document.documentElement.classList.add('config-webgl-ready');
    configRenderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();document.documentElement.classList.remove('config-webgl-ready');});
  }catch(error){console.warn('Ürün inceleme görsel modda açıldı:',error.message);}
}
function getBounds(){chapterRects=$$('.chapter').map(el=>({top:el.offsetTop,height:el.offsetHeight}));}
function resize(){
  viewport={width:innerWidth,height:stage.clientHeight};
  getBounds();
  if(!webglOK)return;
  mainRenderer.setSize(viewport.width,viewport.height);mainCamera.aspect=viewport.width/viewport.height;mainCamera.updateProjectionMatrix();
  if(configRenderer){const el=$('#config-scene');configRenderer.setSize(el.clientWidth,el.clientHeight);configCamera.aspect=el.clientWidth/el.clientHeight;
  configCamera.position.z=el.clientWidth<500?13.5:12.4;configCamera.updateProjectionMatrix();renderConfig();}dirty=true;
}
function chapterState(y){
  const mobile=viewport.width<=760;
  // Motion keys are tied to measured content positions, including short screens.
  const keys=mobile?[
    {at:0,x:0,y:-1.38,scale:.85,ry:-.59,rx:-.06,rz:-.11,explode:0,bg:0},
    {at:chapterRects[1].top,x:0,y:-1.55,scale:.78,ry:1.03,rx:.06,rz:.05,explode:0,bg:1},
    {at:chapterRects[2].top,x:.0,y:-1.60,scale:.66,ry:-.82,rx:.03,rz:-.05,explode:.72,bg:2},
    {at:chapterRects[2].top+chapterRects[2].height*.48,x:0,y:-1.4,scale:.64,ry:-.95,rx:.08,rz:-.06,explode:1,bg:2}
  ]:[
    {at:0,x:2.35,y:.05,scale:1.08,ry:-.64,rx:-.06,rz:-.115,explode:0,bg:0},
    {at:chapterRects[1].top-viewport.height*.05,x:-2.55,y:0,scale:1.15,ry:.90,rx:.05,rz:.075,explode:0,bg:1},
    {at:chapterRects[2].top-viewport.height*.05,x:2.25,y:.08,scale:.92,ry:-.9,rx:.035,rz:-.045,explode:.76,bg:2},
    {at:chapterRects[2].top+chapterRects[2].height*.45,x:2.25,y:.13,scale:.89,ry:-1.05,rx:.09,rz:-.06,explode:1,bg:2}
  ];
  let from=keys[0],to=keys[0],t=0;
  for(let i=0;i<keys.length-1;i++){if(y>=keys[i].at){from=keys[i];to=keys[i+1];t=clamp((y-from.at)/(to.at-from.at),0,1);}}
  const eased=smooth(t),s={};for(const key of ['x','y','scale','ry','rx','rz','explode'])s[key]=mix(from[key],to[key],eased);
  // On smaller screens account for perspective width, preserving the full object.
  if(mobile){const viewWidth=2*Math.tan(THREE.MathUtils.degToRad(16))*15*mainCamera.aspect;s.scale*=Math.min(1,viewWidth/4.9);}
  else if(viewport.width/viewport.height<1.4){s.x*=.83;s.scale*=.89;}
  s.bg=tmpColor.copy(bgColors[from.bg]).lerp(bgColors[to.bg],eased);s.progress=clamp(y/(keys[3].at||1),0,1);return s;
}
function setExplosion(model,amount){
  model.faceGroup.position.z=amount*2.45;
  model.driverGroup.position.z=amount*.28;
  model.shellGroup.position.z=-amount*1.5;
  model.baseGroup.position.z=-amount*1.5;
  model.driverGroup.visible=amount>.02;
}
function renderMain(time){
  if(!webglOK||chapterRects.length<3)return;
  const s=chapterState(scrollPosition);
  const floatOffset=0;
  mainProduct.root.position.set(s.x,s.y+floatOffset,0);mainProduct.root.scale.setScalar(s.scale);
  mainProduct.root.rotation.set(s.rx,s.ry+dragAngle,s.rz);
  setExplosion(mainProduct,s.explode);
  mainShadow.position.x=s.x;mainShadow.position.y=s.y-2.12*s.scale;mainShadow.scale.setScalar(s.scale);mainShadow.material.opacity=1-s.explode*.7;
  bg.style.backgroundColor='#'+s.bg.getHexString();
  $('.orbit-word').style.opacity=String(1-clamp(scrollPosition/(viewport.height*.6),0,1));
  $('#chapter-progress').style.height=(s.progress*100)+'%';$('#chapter-number').textContent=scrollPosition<chapterRects[1].top*.65?'01':scrollPosition<chapterRects[2].top-viewport.height*.35?'02':'03';
  mainRenderer.render(mainScene,mainCamera);renderedFrames++;
}
function renderConfig(){if(!webglOK||!configRenderer)return;configProduct.root.rotation.set(configPitch,configAngle,-.055);configProduct.driverGroup.visible=false;configRenderer.render(configScene,configCamera);}
let lastTime=0;
function animate(time){
  requestAnimationFrame(animate);
  if(document.hidden)return;
  if(time-lastTime<16)return;
  lastTime=time;
  const delta=scrollYTarget-scrollPosition;
  if(Math.abs(delta)>.2)dirty=true;scrollPosition=scrollYTarget;
  const mainVisible=scrollYTarget<story.offsetHeight;
  if(mainVisible && dirty)renderMain(time);
  if(configVisible && dirty)renderConfig();
  dirty=false;
}
function selectColor(key){
  if(!colors[key])return;
  chosenColor=key;
  $('.scene-fallback').src=`assets/product-${key}.png`;
  document.documentElement.style.setProperty('--fallback-image',`url(assets/product-${key}.png)`);
  for(const model of models){model.shellMaterial.color.set(colors[key].shell);model.ringMaterial.color.set(colors[key].ring);model.clothMaterial.color.set(colors[key].cloth);model.trimMaterial.color.set(colors[key].trim);}
  $$('[data-color]').forEach(btn=>{const selected=btn.dataset.color===key;btn.classList.toggle('selected',selected);btn.setAttribute('aria-pressed',String(selected));});
  $$('[data-color-name]').forEach(el=>el.textContent=colors[key].name);
  $('#color-announcement').textContent=`${colors[key].name} rengi seçildi.`;
  $('#config-scene').setAttribute('aria-label',`${colors[key].name} renginde aure 01. Döndürmek için sürükleyin veya sağ ve sol ok tuşlarını kullanın.`);
  renderConfig();dirty=true;
}
$$('[data-color]').forEach(btn=>btn.addEventListener('click',()=>selectColor(btn.dataset.color)));
function bindDrag(el,config=false){
  let startX=0,startY=0,baseAngle=0,basePitch=0,active=false,axis=null;
  el.addEventListener('pointerdown',e=>{if(e.button!==0)return;startX=e.clientX;startY=e.clientY;baseAngle=config?configAngle:dragAngle;basePitch=configPitch;active=true;axis=null;el.setPointerCapture(e.pointerId);});
  el.addEventListener('pointermove',e=>{if(!active)return;const dx=e.clientX-startX,dy=e.clientY-startY;if(!axis&&Math.abs(dx)+Math.abs(dy)>8)axis=Math.abs(dx)>Math.abs(dy)?'x':'y';if(e.pointerType==='touch'&&axis!=='x')return;
    if(config){configAngle=baseAngle+dx*.009;configPitch=clamp(basePitch+dy*.003,-.4,.4);renderConfig();}else{dragAngle=baseAngle+dx*.008;dirty=true;}
  });
  const end=()=>{active=false;};el.addEventListener('pointerup',end);el.addEventListener('pointercancel',end);
}
bindDrag($('#hero-drag'));bindDrag($('#config-scene'),true);
$('#config-scene').addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Home'].includes(e.key)){e.preventDefault();if(e.key==='Home'){configAngle=-.42;configPitch=-.08;}else configAngle+=e.key==='ArrowRight'?.18:-.18;renderConfig();}});
$('#reset-view').addEventListener('click',()=>{configAngle=-.42;configPitch=-.08;renderConfig();});
function updateHeader(){const y=window.scrollY;$('#header').classList.toggle('is-scrolled',y>65);$('#header').classList.toggle('on-dark',y>chapterRects[2].top-100&&y<story.offsetHeight-80);}
window.addEventListener('scroll',()=>{scrollYTarget=window.scrollY;dirty=true;updateHeader();},{passive:true});
window.addEventListener('resize',resize);
new ResizeObserver(()=>{getBounds();dirty=true;}).observe(story);
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target);}}),{threshold:.12});
$$('.reveal').forEach(el=>observer.observe(el));
new IntersectionObserver(entries=>{configVisible=entries[0].isIntersecting;if(configVisible){initializeConfig3D();renderConfig();}},{rootMargin:'150px'}).observe($('#config-scene'));

// Optional original ambient sketch, synthesized only after an explicit tap.
const soundBars=$('.sound-bars');
for(let i=0;i<67;i++){const bar=document.createElement('i');bar.style.setProperty('--h',`${5+Math.abs(Math.sin(i*.67))*Math.sin(i/67*Math.PI)*28}px`);bar.style.setProperty('--d',`${(i%7)*.11}s`);soundBars.appendChild(bar);}
let audioCtx,master,audioNodes=[],audioPlaying=false,audioTimer;
function stopAudio(){
  if(audioCtx&&master){master.gain.cancelScheduledValues(audioCtx.currentTime);master.gain.setTargetAtTime(0,audioCtx.currentTime,.12);const old=audioNodes;setTimeout(()=>old.forEach(n=>{try{n.stop();n.disconnect();}catch{}}),600);audioNodes=[];}
  clearTimeout(audioTimer);audioPlaying=false;document.body.classList.remove('audio-playing');$('#sound-toggle').setAttribute('aria-pressed','false');$('.sound-state').textContent='SESİ AÇ';
}
async function toggleAudio(){
  if(audioPlaying){stopAudio();return;}
  try{
    audioCtx??=new (window.AudioContext||window.webkitAudioContext)();await audioCtx.resume();
    master=audioCtx.createGain();master.gain.value=0;master.connect(audioCtx.destination);master.gain.linearRampToValueAtTime(.16,audioCtx.currentTime+1.2);
    const freqs=[130.8128,196,261.6256,329.6276,391.9954];
    freqs.forEach((f,i)=>{const o=audioCtx.createOscillator(),g=audioCtx.createGain(),p=audioCtx.createStereoPanner();o.type='sine';o.frequency.value=f;o.detune.value=(i-2)*2;g.gain.value=i===0?.45:.13;p.pan.value=(i-2)*.3;o.connect(g);g.connect(p);p.connect(master);o.start();audioNodes.push(o);
      const lfo=audioCtx.createOscillator(),lg=audioCtx.createGain();lfo.frequency.value=.1+i*.035;lg.gain.value=.035;lfo.connect(lg);lg.connect(g.gain);lfo.start();audioNodes.push(lfo);
    });
    audioPlaying=true;document.body.classList.add('audio-playing');$('#sound-toggle').setAttribute('aria-pressed','true');$('.sound-state').textContent='DURDUR';audioTimer=setTimeout(stopAudio,35000);
  }catch{$('.audio-note').textContent='Ses bu tarayıcıda kullanılamıyor.';}
}
$('#sound-toggle').addEventListener('click',toggleAudio);
document.addEventListener('visibilitychange',()=>{if(document.hidden&&audioPlaying)stopAudio();});
new IntersectionObserver(entries=>{if(!entries[0].isIntersecting&&audioPlaying)stopAudio();},{threshold:0}).observe($('#akustik'));

// Reservation is deliberately local: a complete, honest prototype flow.
let modalTrigger=null;
function openDialog(dialog,trigger){modalTrigger=trigger;if(audioPlaying)stopAudio();dialog.showModal();document.body.classList.add('modal-open');}
function closeDialog(dialog){dialog.close();}
$$('dialog').forEach(dialog=>{
  dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');modalTrigger?.focus();});
  dialog.addEventListener('click',e=>{if(e.target===dialog){const rect=dialog.getBoundingClientRect();if(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom)closeDialog(dialog);}});
  $$('[data-close]',dialog).forEach(btn=>btn.addEventListener('click',()=>closeDialog(dialog)));
});
$('#reserve-button').addEventListener('click',e=>{$('#reserve-form-view').hidden=false;$('#reserve-success').hidden=true;openDialog($('#reserve-dialog'),e.currentTarget);});
$('#reserve-form').addEventListener('submit',e=>{
  e.preventDefault();if(!e.target.reportValidity())return;
  const form=new FormData(e.target);const record={name:String(form.get('name')).trim(),email:String(form.get('email')).trim(),color:chosenColor,createdAt:new Date().toISOString()};
  if(!record.name){$('#name').setCustomValidity('Lütfen adını yaz.');$('#name').reportValidity();return;}
  let saved=true;try{localStorage.setItem('aure-demo-reservation',JSON.stringify(record));}catch{saved=false;}
  $('#success-message').textContent=`${record.name}, ${colors[chosenColor].name.toLocaleLowerCase('tr')} rengindeki aure 01 için demo kaydın hazır.`;
  $('.success-note').textContent=saved?'Demo kaydın bu tarayıcıya kaydedildi. E-posta gönderilmedi.':'Tarayıcı depolaması kapalı. Demo tamamlandı; bilgilerin saklanmadı ve e-posta gönderilmedi.';
  $('#reserve-form-view').hidden=true;$('#reserve-success').hidden=false;$('#reserve-success [data-close]').focus();e.target.reset();
});
$('#name').addEventListener('input',e=>e.target.setCustomValidity(''));
$('#privacy-button').addEventListener('click',e=>{$('#privacy-status').textContent='';openDialog($('#privacy-dialog'),e.currentTarget);});
$('#clear-data').addEventListener('click',()=>{try{localStorage.removeItem('aure-demo-reservation');$('#privacy-status').textContent='Bu tarayıcıdaki demo kayıt bilgileri silindi.';}catch{$('#privacy-status').textContent='Tarayıcı depolamasına erişilemiyor; saklanmış bir kayıt bulunamadı.';}});
getBounds();initialize3D();
// Read-only inspection hook for deterministic QA screenshots.
window.aure={get color(){return chosenColor},get frames(){return renderedFrames},get webgl(){return webglOK},get scroll(){return scrollPosition},get audio(){return audioPlaying},resetView:()=>{$('#reset-view').click();}};

if(new URLSearchParams(location.search).has('capture')) window.aure.captureProduct=()=>{
  initializeConfig3D();
  const oldSize=new THREE.Vector2();configRenderer.getSize(oldSize);
  const oldAspect=configCamera.aspect,oldZ=configCamera.position.z;
  configRenderer.setPixelRatio(1);configRenderer.setSize(1000,1000);configCamera.aspect=1;configCamera.position.z=10.8;configCamera.updateProjectionMatrix();
  configRenderer.render(configScene,configCamera);const result=configRenderer.domElement.toDataURL('image/png');
  configRenderer.setSize(oldSize.x,oldSize.y);configCamera.aspect=oldAspect;configCamera.position.z=oldZ;configCamera.updateProjectionMatrix();renderConfig();return result;
};
