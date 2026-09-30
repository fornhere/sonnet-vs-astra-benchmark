import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {EffectComposer} from 'three/addons/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/addons/postprocessing/RenderPass.js';
import {UnrealBloomPass} from 'three/addons/postprocessing/UnrealBloomPass.js';
import {OutputPass} from 'three/addons/postprocessing/OutputPass.js';
import {createMonument} from './monument.js';
import {createWorld} from './world.js';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const mobile=()=>innerWidth<=700;
let renderer;
try{renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance',preserveDrawingBuffer:true});}catch(e){$('#loading').hidden=true;$('#error').hidden=false;throw e;}
renderer.setPixelRatio(Math.min(devicePixelRatio,mobile()?1.6:1.8));renderer.setSize(innerWidth,innerHeight);renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.shadowMap.autoUpdate=false;renderer.shadowMap.needsUpdate=true;$('#canvas-wrap').appendChild(renderer.domElement);renderer.domElement.setAttribute('aria-label','Üç boyutlu anıt — sürükleyerek döndürün, kaydırarak yakınlaşın');
const debugGL=renderer.getContext(),debugExt=debugGL.getExtension('WEBGL_debug_renderer_info');const software=debugExt&&/swiftshader|llvmpipe/i.test(debugGL.getParameter(debugExt.UNMASKED_RENDERER_WEBGL));if(software)renderer.setPixelRatio(Math.min(devicePixelRatio,1));
const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(42,innerWidth/innerHeight,.2,2800);
const controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.dampingFactor=.065;controls.minDistance=24;controls.maxDistance=220;controls.minPolarAngle=.15;controls.maxPolarAngle=Math.PI*.49;controls.enablePan=false;controls.rotateSpeed=.45;controls.zoomSpeed=.7;controls.target.set(0,24,0);
const world=createWorld(scene,renderer);const monument=createMonument();scene.add(monument);
renderer.info.autoReset=false;const composer=new EffectComposer(renderer);composer.addPass(new RenderPass(scene,camera));const bloom=new UnrealBloomPass(new THREE.Vector2(innerWidth,innerHeight),.16,.6,1.25);if(!software)composer.addPass(bloom);composer.addPass(new OutputPass());
let chapter=0,exploring=false,touring=false,tourTime=0,tourStarted=0,transition=null,last=performance.now(),elapsed=0,lightCurrent=.34,lightTarget=.34,uiHidden=false,detailEnabled=false,offsetCurrent=mobile()?.13:.17;
const views=[
 {position:[91,34,67],target:[0,24,0],mobile:[112,54,138],fov:42},
 {position:[47,36,54],target:[0,33,0],mobile:[64,42,82],fov:40},
 {position:[-60,72,63],target:[0,20,0],mobile:[-92,90,105],fov:44}
];
const texts=[
 {kicker:'SONSUZ GÖĞÜN ALTINDA',title:'Cengiz<br><em>Han.</em>',copy:'Bir adam. Bir imparatorluk.<br>Bozkırın sessizliğinde yükselen bir efsane.',note:'40 metre. Tek bir ufuk.'},
 {kicker:'ÇELİĞE İŞLENEN BİR MİRAS',title:'Zamana<br><em>meydan.</em>',copy:'250 ton çelikte bir gökyüzü.<br>Her yansımada başka bir hikâye.',note:'Göğe yükselen bir hafıza.'},
 {kicker:'UFUKLARIN ÖTESİNDE',title:'Sonsuz<br><em>bozkır.</em>',copy:'Rüzgârın çizdiği yollar.<br>Ve hiçbir yere sığmayan bir ufuk.',note:'Tsonjin Boldog · Moğolistan'}
];
function setText(i){chapter=i;const t=texts[i];$('#chapter-kicker').textContent=t.kicker;$('#hero-title').innerHTML=t.title;$('#hero-copy').innerHTML=t.copy;$('#scene-note').textContent=t.note;$$('.chapter').forEach((b,k)=>{b.classList.toggle('active',k===i);b.setAttribute('aria-pressed',String(k===i));});}
function setCameraImmediate(i){const v=views[i];camera.position.set(...(mobile()?v.mobile:v.position));controls.target.set(...v.target);camera.fov=v.fov;camera.updateProjectionMatrix();controls.update();}
function goTo(i,{stop=true}={}){if(stop)stopTour();setText(i);exploring=false;document.body.classList.remove('exploring');$('#detail-card').hidden=true;const v=views[i];transition={from:camera.position.clone(),to:new THREE.Vector3(...(mobile()?v.mobile:v.position)),fromTarget:controls.target.clone(),toTarget:new THREE.Vector3(...v.target),fromFov:camera.fov,toFov:v.fov,time:0,duration:reduced?.01:2.8};}
setCameraImmediate(0);
function toast(message){$('#toast').textContent=message;$('#toast').classList.add('visible');clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('#toast').classList.remove('visible'),2800);}
function updateTourButton(){$('#journey-label').textContent=touring?'Yolculuğu durdur':'Yolculuğu başlat';$('.play-ring svg').innerHTML=touring?'<path d="M6 5h3v10H6zm6 0h3v10h-3z"/>':'<path d="m8 5 7 5-7 5Z"/>';document.body.classList.toggle('touring',touring);}
function stopTour(){touring=false;updateTourButton();$('.duration').textContent='01:00';}
$('#journey-btn').addEventListener('click',()=>{if(touring){stopTour();toast('Yolculuk durduruldu');return;}touring=true;tourTime=0;tourStarted=performance.now();goTo(0,{stop:false});detailEnabled=false;$('#hotspots').hidden=true;$('#details-btn').setAttribute('aria-pressed','false');updateTourButton();toast('60 saniyelik yolculuk · Sürükleyerek kontrolü al');});
$$('.chapter').forEach(b=>b.addEventListener('click',()=>goTo(Number(b.dataset.chapter))));
controls.addEventListener('start',()=>{stopTour();transition=null;if(!exploring){exploring=true;document.body.classList.add('exploring');}});
$('#time-slider').addEventListener('input',e=>{lightTarget=Number(e.target.value)/100;$('#light-label').textContent=lightTarget<.2?'ŞAFAK':lightTarget<.53?'ALTIN SAAT':lightTarget<.82?'MAVİ SAAT':'GECE';});
const points={crown:new THREE.Vector3(0,46.1,-1),horse:new THREE.Vector3(1.5,33,10),base:new THREE.Vector3(13,5,13)};
const details={crown:{n:'01',title:'Hanın bakışı',copy:'Heykel doğuya, Cengiz Han’ın doğduğu topraklara bakar. Geleneksel başlık, kaftan ve elindeki kırbaç, figürün siluetini tanımlar.'},horse:{n:'02',title:'Bozkırın yoldaşı',copy:'At, Moğol bozkırının yaşamıyla ayrılmaz bir bağ taşır. Gerçek anıtta ziyaretçiler atın başındaki seyir terasına çıkabilir.'},base:{n:'03',title:'Otuz altı han',copy:'10 metre yüksekliğindeki dairesel ziyaretçi merkezini çevreleyen 36 sütun, Cengiz Han’dan Ligden Han’a uzanan hanları temsil eder.'}};
$('#details-btn').addEventListener('click',()=>{detailEnabled=!detailEnabled;$('#hotspots').hidden=!detailEnabled;$('#details-btn').setAttribute('aria-pressed',String(detailEnabled));if(!detailEnabled)$('#detail-card').hidden=true;else{stopTour();toast('Anıt üzerindeki numaralara dokun');}});
$$('.hotspot').forEach(b=>b.addEventListener('click',()=>{const d=details[b.dataset.point];$('#detail-no').textContent=d.n+' / ANITIN İZLERİ';$('#detail-title').textContent=d.title;$('#detail-copy').textContent=d.copy;$('#detail-card').hidden=false;}));$('#close-detail').onclick=()=>$('#detail-card').hidden=true;
let returnFocus=null;
function showAbout(){stopTour();returnFocus=document.activeElement;$('#about-panel').hidden=false;$('#about-backdrop').hidden=false;$('#close-about').focus({preventScroll:true});}
function closeAbout(){$('#about-panel').hidden=true;$('#about-backdrop').hidden=true;returnFocus?.focus({preventScroll:true});}
$('#about-btn').onclick=showAbout;$('#close-about').onclick=closeAbout;$('#about-backdrop').onclick=closeAbout;
$('#about-panel').addEventListener('keydown',e=>{if(e.key!=='Tab')return;let elems=$$('#about-panel button, #about-panel a');let first=elems[0],last=elems.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}});
function toggleUI(){uiHidden=!uiHidden;document.body.classList.toggle('clean',uiHidden);$('#restore-ui').hidden=!uiHidden;}
$('#hide-ui-btn').onclick=toggleUI;$('#restore-ui').onclick=toggleUI;
$('#fullscreen-btn').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{toast('Bu tarayıcı tam ekranı desteklemiyor');}};
document.addEventListener('fullscreenchange',()=>$('#fullscreen-btn').setAttribute('aria-label',document.fullscreenElement?'Tam ekrandan çık':'Tam ekran'));
window.addEventListener('keydown',e=>{if(e.target instanceof HTMLInputElement)return;if(e.key==='Escape'){if(!$('#about-panel').hidden)closeAbout();$('#detail-card').hidden=true;if(uiHidden)toggleUI();stopTour();}if(!$('#about-panel').hidden)return;if(e.key.toLowerCase()==='h')toggleUI();if(['1','2','3'].includes(e.key))goTo(Number(e.key)-1);});
// All audio is generated locally. User interaction is required before playback.
let audioCtx=null,audioGain=null,soundOn=false;
function startSound(){if(!audioCtx){audioCtx=new(window.AudioContext||window.webkitAudioContext)();audioGain=audioCtx.createGain();audioGain.gain.value=0;audioGain.connect(audioCtx.destination);let length=audioCtx.sampleRate*6,b=audioCtx.createBuffer(2,length,audioCtx.sampleRate);for(let ch=0;ch<2;ch++){let arr=b.getChannelData(ch),last=0;for(let i=0;i<length;i++){last=(last+Math.random()*.04-.02)/1.02;arr[i]=last*4;}}let source=audioCtx.createBufferSource();source.buffer=b;source.loop=true;const filter=audioCtx.createBiquadFilter();filter.type='lowpass';filter.frequency.value=650;source.connect(filter);filter.connect(audioGain);source.start();[73.42,110,146.83,220.2].forEach((f,i)=>{let o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type='sine';o.frequency.value=f;g.gain.value=i===0?.09:.024;o.connect(g);g.connect(audioGain);o.start();let lfo=audioCtx.createOscillator(),lg=audioCtx.createGain();lfo.frequency.value=.08+i*.027;lg.gain.value=.009;lfo.connect(lg);lg.connect(g.gain);lfo.start();});}audioCtx.resume();audioGain.gain.setTargetAtTime(.48,audioCtx.currentTime,1.2);}
$('#sound-btn').onclick=()=>{try{soundOn=!soundOn;if(soundOn)startSound();else audioGain?.gain.setTargetAtTime(0,audioCtx.currentTime,.6);$('#sound-btn').classList.toggle('muted',!soundOn);$('#sound-btn').setAttribute('aria-pressed',String(soundOn));$('#sound-btn').setAttribute('aria-label',soundOn?'Bozkır sesini kapat':'Bozkır sesini aç');toast(soundOn?'Rüzgâr ve bozkır · Kulaklıkla dinle':'Ses kapalı');}catch{soundOn=false;toast('Ses bu tarayıcıda başlatılamadı');}};
let hiddenAt=0;document.addEventListener('visibilitychange',()=>{if(document.hidden){hiddenAt=performance.now();audioCtx?.suspend();}else{last=performance.now();if(touring)tourStarted+=last-hiddenAt;if(soundOn)audioCtx?.resume();}});
function resize(){renderer.setPixelRatio(Math.min(devicePixelRatio,mobile()?1.6:1.8));renderer.setSize(innerWidth,innerHeight);composer.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();if(!exploring&&!touring)goTo(chapter);}
window.addEventListener('resize',resize);
function frame(now){requestAnimationFrame(frame);if(document.hidden)return;let dt=Math.min((now-last)/1000,.25);last=now;elapsed+=dt;
 if(touring){tourTime=(now-tourStarted)/1000;let next=Math.min(2,Math.floor(tourTime/20));if(next!==chapter)goTo(next,{stop:false});$('#tour-progress i').style.width=Math.min(tourTime/60*100,100)+'%';let remaining=Math.max(0,60-Math.floor(tourTime));$('.duration').textContent=`${String(Math.floor(remaining/60)).padStart(2,'0')}:${String(remaining%60).padStart(2,'0')}`;if(tourTime>=60){stopTour();toast('Yolculuk tamamlandı · Şimdi kendi ufkunu keşfet');}}
 if(transition){let t=transition; t.time+=dt;let p=Math.min(t.time/t.duration,1),s=p*p*(3-2*p);camera.position.lerpVectors(t.from,t.to,s);controls.target.lerpVectors(t.fromTarget,t.toTarget,s);camera.fov=THREE.MathUtils.lerp(t.fromFov,t.toFov,s);if(p>=1)transition=null;}
 else if(touring){let p=tourTime%20/20;const v=views[chapter];let base=new THREE.Vector3(...(mobile()?v.mobile:v.position)),tar=new THREE.Vector3(...v.target);base.sub(tar).applyAxisAngle(new THREE.Vector3(0,1,0),(p-.5)*.38).multiplyScalar(1-p*.07).add(tar);camera.position.lerp(base,.04);controls.target.lerp(tar,.04);}

 else if(!exploring&&!reduced&&!detailEnabled){const v=views[chapter],target=new THREE.Vector3(...(mobile()?v.mobile:v.position));target.x+=Math.sin(elapsed*.075)*2;target.y+=Math.sin(elapsed*.09)*.6;camera.position.lerp(target,.006);}
 let off=(exploring||uiHidden)?0:(mobile()?.17:.16);offsetCurrent=THREE.MathUtils.lerp(offsetCurrent,off,1-Math.exp(-dt*2.5));camera.setViewOffset(innerWidth,innerHeight,-innerWidth*offsetCurrent,0,innerWidth,innerHeight);camera.updateProjectionMatrix();controls.update();
 lightCurrent=THREE.MathUtils.lerp(lightCurrent,lightTarget,1-Math.exp(-dt*2));world.setLight(lightCurrent);world.update(reduced?0:elapsed);
 if(detailEnabled){$$('.hotspot').forEach(b=>{let p=points[b.dataset.point].clone().project(camera),visible=p.z<1&&Math.abs(p.x)<.93&&Math.abs(p.y)<.78;b.style.left=(p.x*.5+.5)*innerWidth+'px';b.style.top=(-p.y*.5+.5)*innerHeight+'px';b.style.visibility=visible?'visible':'hidden';});}
 renderer.info.reset();composer.render();
}
renderer.compile(scene,camera);requestAnimationFrame(frame);setTimeout(()=>{$('#loading').classList.add('loaded');},650);
renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();$('#error').hidden=false;});
// Read-only diagnostics aid repeatable QA without changing the experience.
window.__experience={get state(){return{chapter,touring,exploring,light:lightCurrent,meshes:renderer.info.render.calls,triangles:renderer.info.render.triangles};},scene,camera,renderer};
