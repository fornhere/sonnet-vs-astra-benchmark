import * as THREE from 'three';
import { OrbitControls } from './vendor/OrbitControls.js';

// Every block is local, deterministic geometry. No remote map, imagery or runtime service.
const $ = s => document.querySelector(s);
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
let seed = 198104;
const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
const rand = (a,b) => a + random()*(b-a);
const choose = a => a[Math.floor(random()*a.length)];
const scene = new THREE.Scene();
scene.background = new THREE.Color('#eeeae2');
const host = $('#scene');
let renderer;
try {
  renderer = new THREE.WebGLRenderer({antialias:true,alpha:false,preserveDrawingBuffer:true,powerPreference:'high-performance'});
} catch (error) {
  $('#loading').innerHTML = '<div class="loading-cube">B</div><span>This little world needs WebGL.</span><small>ENABLE HARDWARE ACCELERATION IN YOUR BROWSER, THEN RELOAD.</small>';
  throw error;
}
const gl=renderer.getContext();const rendererInfo=gl.getExtension('WEBGL_debug_renderer_info');
const softwareRenderer=!!rendererInfo&&/swiftshader|llvmpipe|software/i.test(gl.getParameter(rendererInfo.UNMASKED_RENDERER_WEBGL));
let sceneDirty=true;
renderer.setPixelRatio(Math.min(devicePixelRatio,softwareRenderer?1:2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.autoUpdate=false;renderer.shadowMap.needsUpdate=true;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
renderer.setClearColor('#eeeae2');
host.appendChild(renderer.domElement);
renderer.domElement.setAttribute('aria-label','Manhattan diorama: drag to turn, scroll to zoom, right-drag to pan');
const camera = new THREE.OrthographicCamera(-90,90,70,-70,.1,800);
camera.position.set(100,115,128);
const controls = new OrbitControls(camera,renderer.domElement);
controls.target.set(0,1,0);
controls.enableDamping=!softwareRenderer; controls.dampingFactor=.07;
controls.minPolarAngle=.16; controls.maxPolarAngle=Math.PI/2.22;
controls.minZoom=.68; controls.maxZoom=6;
controls.enablePan=true; controls.screenSpacePanning=true; controls.rotateSpeed=.55; controls.zoomSpeed=.7;
controls.autoRotateSpeed=.45;controls.update();
const hemi = new THREE.HemisphereLight('#fff6da','#8d9588',2.55);scene.add(hemi);
const sun = new THREE.DirectionalLight('#ffe4ba',3.7);sun.position.set(-45,85,35);sun.castShadow=true;
sun.shadow.mapSize.set(softwareRenderer?2048:4096,softwareRenderer?2048:4096);Object.assign(sun.shadow.camera,{left:-90,right:90,top:100,bottom:-95,near:1,far:240});
sun.shadow.normalBias=.13;sun.shadow.bias=-.0003;sun.shadow.radius=3;scene.add(sun);
const fill = new THREE.DirectionalLight('#d7e8e5',1.15);fill.position.set(45,35,-70);scene.add(fill);
const tableMat = new THREE.MeshBasicMaterial({color:'#eeeae2',toneMapped:false});
const table = new THREE.Mesh(new THREE.PlaneGeometry(2000,2000),tableMat);table.rotation.x=-Math.PI/2;table.position.y=-6.2;scene.add(table);
const contactShadow=new THREE.Mesh(new THREE.PlaneGeometry(2000,2000),new THREE.ShadowMaterial({opacity:.18}));contactShadow.rotation.x=-Math.PI/2;contactShadow.position.y=-6.18;contactShadow.receiveShadow=true;scene.add(contactShadow);
const city = new THREE.Group();scene.add(city);
const boxGeometry = new THREE.BoxGeometry(1,1,1);
const solidMat = new THREE.MeshStandardMaterial({roughness:.86,metalness:.02});
const foliageMat = new THREE.MeshStandardMaterial({roughness:1});
const windowMat = new THREE.MeshStandardMaterial({roughness:.45,metalness:.1,emissive:'#ffd298',emissiveIntensity:.12});
const roadMat = new THREE.MeshStandardMaterial({roughness:1});
const darkWindowMat=new THREE.MeshStandardMaterial({roughness:.5,metalness:.1});
const buckets = {solid:[],foliage:[],windows:[],darkWindows:[],roads:[]};
const count={buildings:0,trees:0};
function box(x,y,z,w,h,d,color,bucket='solid') { if(w<=0||h<=0||d<=0)return; const ob={x,y,z,w,h,d,color};if(bucket==='windows' && Math.abs(Math.sin(x*13.37+y*42.19+z*8.43))>.73)bucket='darkWindows';buckets[bucket].push(ob);return ob; }
function roundedShape(w,d,r){const s=new THREE.Shape();s.moveTo(-w/2+r,-d/2);s.lineTo(w/2-r,-d/2);s.quadraticCurveTo(w/2,-d/2,w/2,-d/2+r);s.lineTo(w/2,d/2-r);s.quadraticCurveTo(w/2,d/2,w/2-r,d/2);s.lineTo(-w/2+r,d/2);s.quadraticCurveTo(-w/2,d/2,-w/2,d/2-r);s.lineTo(-w/2,-d/2+r);s.quadraticCurveTo(-w/2,-d/2,-w/2+r,-d/2);return s;}
function slab(w,d,h,y,color,r=1.5){const geo=new THREE.ExtrudeGeometry(roundedShape(w,d,r),{depth:h,bevelEnabled:false,steps:1,curveSegments:8});geo.rotateX(-Math.PI/2);const m=new THREE.Mesh(geo,new THREE.MeshStandardMaterial({color,roughness:.8}));m.position.y=y;m.receiveShadow=true;m.castShadow=true;city.add(m);return m;}
for(const x of [-32,32])for(const z of [-54,54])box(x,-5.65,z,3.5,1.1,3.5,'#695640');
slab(78,126,3.4,-5.1,'#786047',2);
slab(78.2,126.2,.34,-1.73,'#d3b78c',2);
slab(77.4,125.4,.55,-1.43,'#d9d9bb',1.7);
const water=slab(76.9,124.9,.13,-.9,'#719d9d',1.5);
water.material.roughness=.42;water.material.metalness=.16;
// A thin end-grain inlay gives the miniature a physical, crafted plinth.
box(0,-3.5,63.025,68,.06,.06,'#aa8963');box(39.03,-3.5,0,.05,.06,114,'#aa8963');
function canvasText(text,w=1024,h=128,font='500 55px "DM Sans", sans-serif',color='#eee2c2'){
 const c=document.createElement('canvas');c.width=w;c.height=h;const ctx=c.getContext('2d');ctx.fillStyle=color;ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=font;ctx.fillText(text,w/2,h/2);const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;return tex;
}
const plaque=new THREE.Mesh(new THREE.PlaneGeometry(21,2.5),new THREE.MeshBasicMaterial({map:canvasText('M A N H A T T A N'),transparent:true,depthWrite:false}));plaque.position.set(-6,-3.1,63.09);city.add(plaque);
box(-23,-3.1,63.045,3,1.65,.12,'#b59c71');
const noPlate=new THREE.Mesh(new THREE.PlaneGeometry(2.4,1.2),new THREE.MeshBasicMaterial({map:canvasText('01',128,80,'500 50px sans-serif','#4d513f'),transparent:true}));noPlate.position.set(-23,-3.1,63.12);city.add(noPlate);
// Quantized banks preserve the angular, carved-block coastline.
const banks=[[-56,-2,6],[-51,-7,10],[-42,-10,13],[-32,-12,16],[-18,-13,17],[-5,-14,17],[9,-14,16],[22,-13,15],[34,-12,14],[42,-11,12],[48,-10,9],[53,-8,5],[57,-4,0]];
function bounds(z){for(let i=0;i<banks.length-1;i++){let a=banks[i],b=banks[i+1];if(z>=a[0]&&z<=b[0]){let t=(z-a[0])/(b[0]-a[0]);return[a[1]+(b[1]-a[1])*t,a[2]+(b[2]-a[2])*t];}}return[0,0];}
function land(x,z,margin=0){if(z < -56+margin || z > 57-margin)return false;const [a,b]=bounds(z);return x>=a+margin&&x<=b-margin;}
function park(x,z){return x>=-7.1&&x<=5.1&&z>=-31.8&&z<=-2.0;}
const landColors=['#b9bba0','#c0c1a7','#bfc0a5','#c4c4aa'];
for(let z=-56;z<=57;z++)for(let x=-15;x<=18;x++)if(land(x,z)){
 box(x,-.02,z,1,.95,1,choose(['#979d80','#a0a588','#adb095']));
 box(x,.51,z,1,.17,1,choose(landColors),'roads');
}
// Waterfront promenades and long piers on the Hudson.
for(let z=-47;z<47;z+=1){let [l,r]=bounds(z);box(Math.ceil(l)+.17,.64,z,.52,.14,1,'#d1cbb0','roads');box(Math.floor(r)-.1,.64,z,.5,.14,1,'#d1cbb0','roads');}
for(let z=-26;z<42;z+=6){let l=Math.ceil(bounds(z)[0]);box(l-2.5,.05,z,5,.45,1.35,'#bbb495');box(l-2.5,.31,z,4.9,.07,1.25,'#d4caac','roads');for(let a=0;a<4;a++)box(l-4+a,.36,z,.05,.08,1.24,'#ada586','roads');}
// East bank: deliberately lower and quieter to frame Manhattan's skyline.
for(let z=-50;z<58;z++)for(let x=26;x<38;x++){
 let edge=25+Math.floor(Math.sin(z*.075)*2.2);if(x<edge)continue;
 box(x,-.02,z,1,.96,1,'#a7ae91');box(x,.51,z,1,.17,1,'#b7bca2','roads');
}
for(let z=-48;z<56;z+=4.2){box(31.5,.62,z,12,.045,.52,'#909a8b','roads');for(let x=27;x<37;x+=3.7)box(x,.62,z,0.55,.05,4.4,'#909a8b','roads');}
// A sliver of New Jersey, across a wider Hudson.
for(let z=-53;z<48;z++)for(let x=-37;x<-29;x++){box(x,-.04,z,1,.9,1,'#aeb49b');box(x,.49,z,1,.14,1,'#bcc1a8','roads');}
for(let z=-48;z<46;z+=5)box(-33,.58,z,8,.06,.7,'#929d8d','roads');
for(let x=-12;x<=16;x+=4)for(let z=-54;z<55;z++)if(land(x,z,.6)&&!park(x,z))box(x,.62,z,.64,.055,1.02,'#838c7e','roads');
for(let z=-50;z<=54;z+=4)for(let x=-14;x<=17;x++)if(land(x,z,.5)&&!park(x,z))box(x,.623,z,1.02,.055,.59,'#899080','roads');
// Painted crossings, centre dashes and the occasional yellow cab.
for(let z=-46;z<=50;z+=4)for(let x=-12;x<=12;x+=4)if(land(x,z,1.1)&&!park(x,z)){
 for(let k=-2;k<=2;k++){box(x+k*.13,.658,z+.54,.065,.018,.25,'#d9d7ba','roads');box(x+.56,.659,z+k*.13,.26,.017,.065,'#d9d7ba','roads');}
 if(random()<.5)box(x,.66,z+1.6,.045,.016,.45,'#d5c499','roads');
}
// Broadway follows its own diagonal through the orthogonal grid.
for(let z=-44;z<44;z+=.5){let x=4.1-(z+44)*.155;if(land(x,z,1)&&!park(x,z))box(x,.655,z,.71,.045,.6,'#8c9480','roads');}
const palette=['#c9c2a3','#dbd2b4','#b8b9a5','#d5cdb2','#b3b9aa','#abb5ad','#d8ccb0','#cbb99a','#b5a68c','#a5b1a7','#d7d1b9'];
function building(x,z,w,d,h,color,kind='normal'){
 const ground=.73;count.buildings++;
 box(x,.67,z,w+.24,.2,d+.24,'#cbc7af');
 box(x,ground+h/2,z,w,h,d,color);
 box(x,ground+.12,z,w+.08,.24,d+.08,'#9d9f8c');
 box(x,ground+h-.1,z,w+.13,.2,d+.13,color);
 // Recessed roof, parapets and miniature rooftop machinery.
 box(x,ground+h+.08,z,w*.81,.13,d*.83,'#9eaa9e');
 if(h>3&&w>1.1){box(x+w*.18,ground+h+.26,z-d*.15,w*.3,.34,d*.3,'#bfc2ad');if(random()<.3)box(x-w*.2,ground+h+.32,z+d*.17,.32,.52,.4,'#8f9a8e');}
 let rows=Math.min(22,Math.floor((h-.8)/.78)),cols=Math.max(1,Math.floor(w/.59)),sides=Math.max(1,Math.floor(d/.62));
 if(kind==='back')rows=Math.min(4,rows);
 for(let j=0;j<rows;j++){
  const y=ground+.7+j*.78;
  for(let c=0;c<cols;c++){let xx=x+(c-(cols-1)/2)*.53;const col=random()<.3?'#cfc395':'#697f79';box(xx,y,z+d/2+.012,.2,.28,.023,col,'windows');box(xx,y,z-d/2-.012,.2,.28,.023,col,'windows');}
  for(let c=0;c<sides;c++){let zz=z+(c-(sides-1)/2)*.53;const col=random()<.3?'#cec799':'#74877c';box(x+w/2+.012,y,zz,.023,.28,.2,col,'windows');box(x-w/2-.012,y,zz,.023,.28,.2,col,'windows');}
 }
 if(h>6&&random()<.32){ // NYC's familiar little wooden water tanks.
  let yy=ground+h;box(x-w*.16,yy+.38,z,.48,.63,.48,'#826d52');box(x-w*.16,yy+.74,z,.6,.12,.6,'#a8956e');
 }
}
const landmarks={
 park:{name:'Central Park',category:'A LITTLE ROOM TO BREATHE',title:'The city’s green heart.',description:'An 843-acre pause in the middle of Manhattan. Meadows, winding paths, and a skyline peeking through the trees.',detail:'843 ACRES OF POSSIBILITY',pos:new THREE.Vector3(-1,2.8,-17),target:new THREE.Vector3(-1,0,-17),zoom:2.55,index:1},
 empire:{name:'Empire State',category:'MIDTOWN / FIFTH AVENUE',title:'A very tall New York story.',description:'The Empire State Building has watched over the avenues since 1931. An Art Deco landmark, one little setback at a time.',detail:'102 FLOORS · EST. 1931',pos:new THREE.Vector3(-2,23,16),target:new THREE.Vector3(-1,5,11),zoom:2.8,index:2},
 chrysler:{name:'Chrysler Building',category:'MIDTOWN / LEXINGTON AVENUE',title:'A crown above the city.',description:'A silver spire, a stack of sunbursts, and a little automotive ambition. The Chrysler Building makes the skyline unmistakable.',detail:'ART DECO · EST. 1930',pos:new THREE.Vector3(9,19,7),target:new THREE.Vector3(7,5,6),zoom:3.05,index:3},
 flatiron:{name:'Flatiron',category:'WHERE BROADWAY MEETS FIFTH',title:'A beautiful wrong angle.',description:'At the meeting of Broadway and Fifth Avenue, a slender wedge of limestone turns an awkward corner into a city icon.',detail:'FIFTH & BROADWAY · EST. 1902',pos:new THREE.Vector3(-3,9,29),target:new THREE.Vector3(-3,1,29),zoom:3.4,index:4},
 downtown:{name:'One World Trade',category:'DOWNTOWN / LOWER MANHATTAN',title:'The skyline starts here.',description:'At the southern end of the island, old streets meet a new skyline. One World Trade Center rises above the harbor.',detail:'1,776 FEET ABOVE NEW YORK',pos:new THREE.Vector3(-5,26,44),target:new THREE.Vector3(-2,5,43),zoom:2.75,index:5},
 bridge:{name:'Brooklyn Bridge',category:'ACROSS THE EAST RIVER',title:'Two boroughs. One icon.',description:'Stone towers and a web of cables have connected Manhattan and Brooklyn since 1883. Take the scenic way across.',detail:'EAST RIVER · EST. 1883',pos:new THREE.Vector3(20,6.8,39),target:new THREE.Vector3(18,1.5,40),zoom:3.15,index:6}
};
function reserved(x,z){return (Math.abs(x+2)<2.2&&Math.abs(z-16)<2.3)||(Math.abs(x-9)<2&&Math.abs(z-7)<2)||(Math.abs(x+5)<2.5&&Math.abs(z-44)<2.4)||(Math.abs(x+3)<2&&Math.abs(z-29)<2.4)||(Math.abs(x+6)<3&&Math.abs(z-49)<2.4);}
// Each city block is split into different parcels, rather than one repeated tower.
for(let z=-52;z<55;z+=4)for(let x=-14;x<17;x+=4){
 const cx=x+2,cz=z+2;if(!land(cx,cz,1.8)||park(cx,cz))continue;
 const skyline=Math.exp(-Math.pow((cz-9)/13,2)),downtown=Math.exp(-Math.pow((cz-45)/8,2));
 const hbase=1.4+skyline*8+downtown*7;
 const parcels=random()<.38?[[0,0,2.95,2.95]]:[[-.78,0,1.35,2.9],[.79,-.75,1.35,1.35],[.79,.78,1.35,1.35]];
 for(const [dx,dz,w,d] of parcels){let xx=cx+dx,zz=cz+dz;if(reserved(xx,zz)||park(xx,zz)||Math.abs(xx-(4.1-(zz+44)*.155))<.5)continue;
 let h=hbase*rand(.55,1.45),col=choose(palette);if(cz>23&&cz<39){h=rand(1.4,4.2);col=choose(['#a6886a','#baa084','#b39d7c','#c4b699','#a69c80']);}
 building(xx,zz,w,d,h,col);
 if(h>8&&w>2){box(xx,.73+h+.7,zz,w*.7,1.4,d*.72,col);box(xx,.73+h+1.55,zz,w*.45,.35,d*.49,'#bdc0ad');}
 }
}
for(let z=-47;z<55;z+=4.2)for(let x=28.1;x<37;x+=3.7)if(random()<.85){building(x,z+1.8,rand(1.6,2.6),rand(1.7,2.6),rand(1.1,4.6),choose(['#b1baa8','#c3c8b4','#bcc1ac','#c5c6ad']),'back');}
for(let z=-45;z<46;z+=5)for(let x=-35;x<-30;x+=3.4)building(x,z+2,2.3,2.7,rand(1.3,5.7),choose(['#bdc2ac','#c5c8b4','#aab5a5']),'back');
// Empire State: stepped limestone crown, vertical piers, and its mooring mast.
function tier(x,z,y,w,d,h,c){box(x,y+h/2,z,w,h,d,c);return y+h;}
let y=.75;y=tier(-2,16,y,3.4,3.45,2.3,'#cfc3a1');y=tier(-2,16,y,2.9,2.9,8.5,'#d5c8a8');y=tier(-2,16,y,2.25,2.3,4.2,'#ddd1af');y=tier(-2,16,y,1.6,1.7,2.2,'#d2c8a6');y=tier(-2,16,y,.9,1,1.8,'#dcd0b0');y=tier(-2,16,y,.45,.48,1.45,'#adbaa9');tier(-2,16,y,.13,.13,2.4,'#d6d7c0');
for(let a=-1;a<=1;a++) {box(-2+a*.71,6.9,17.465,.13,7.4,.055,'#b6b69c');box(-.535,6.9,16+a*.71,.055,7.4,.13,'#b6b69c');}
for(let k=0;k<20;k++)for(let a=-1;a<=1;a++){let yy=1.6+k*.74;if(yy<11.2){box(-2+a*.7,yy,17.46,.25,.28,.025,'#7c8e83','windows');box(-.535,yy,16+a*.7,.025,.28,.25,'#82958a','windows');}else{box(-2+a*.54,yy,17.16,.23,.27,.025,'#82958a','windows');box(-.86,yy,16+a*.54,.025,.27,.23,'#82958a','windows');}}
// Chrysler's distinct, stacked silver crown.
y=.76;y=tier(9,7,y,2.8,2.7,2.2,'#bcba9f');y=tier(9,7,y,2.2,2.25,9,'#c6c8b0');y=tier(9,7,y,1.7,1.8,2.1,'#d6d8be');
for(let i=0;i<5;i++)y=tier(9,7,y,1.75-i*.28,1.75-i*.28,.65,'#b8c9bb');tier(9,7,y,.11,.11,2.2,'#d9dfcc');
for(let k=0;k<14;k++)for(let a=-1;a<=1;a++){box(9+a*.55,1.8+k*.7,8.14,.23,.31,.025,'#7e9388','windows');box(10.12,1.8+k*.7,7+a*.55,.025,.31,.23,'#7e9388','windows');}
// One World Trade, a voxel interpretation of the tapering glass prism.
y=.73;y=tier(-5,44,y,3.4,3.5,1.5,'#a8b5ab');
for(let i=0;i<13;i++){
 let w=3.02-i*.092;let h=1.38;y=tier(-5,44,y,w,w,h,i%2?'#8ca8a6':'#9cb9b6');
 for(let a=-1;a<=1;a++){box(-5+a*.64,y-.64,44+w/2+.015,.28,1.08,.02,'#789a99','windows');box(-5+w/2+.015,y-.64,44+a*.64,.02,1.08,.28,'#789a99','windows');}
}y=tier(-5,44,y,1.46,1.46,.44,'#bbc8bc');tier(-5,44,y,.12,.12,5.5,'#cad2bb');
// Twin memorial pools in a quiet, tree-lined plaza.
box(-5.7,.71,49.1,5.4,.12,3.5,'#c6c7b0');for(const x of [-7.1,-4.3]){box(x,.78,49.1,1.65,.14,1.65,'#4e625b');box(x,.86,49.1,1.23,.03,1.23,'#729190');box(x,.88,49.1,.66,.03,.66,'#334c4c');}
// Flatiron gets a genuinely triangular footprint, expressed as stepped blocks.
for(let i=0;i<9;i++){let z=27.5+i*.37,w=.25+i*.25;box(-3,4.01,z,w,6.4,.38,'#cbb899');box(-3,7.27,z,w+.06,.2,.4,'#e1d0aa');for(let j=0;j<7;j++){box(-3+w/2+.01,1.4+j*.78,z,.025,.28,.16,'#7e8e77','windows');box(-3-w/2-.01,1.4+j*.78,z,.025,.28,.16,'#7e8e77','windows');}}
// Central Park: lawns, reservoir, ponds, footpaths, ball fields, and dense trees.
box(-1,.7,-17,12.2,.24,30,'#83986a');
for(let z=-31;z<-2;z++)for(let x=-6;x<5;x++)box(x,.835,z,.99,.045,.99,choose(['#95a873','#9daf7b','#8fa36b','#9cae76']),'roads');
function pathPoint(x,z,w=.48){box(x,.877,z,w,.046,.67,'#c3b990','roads');}
for(let z=-31;z<-2;z+=.45){pathPoint(-5.9,z,.5);pathPoint(4,z,.5);pathPoint(-1.6+Math.sin(z*.29)*1.45,z,.55);}
for(let z of [-28,-19,-11,-4])for(let x=-6;x<5;x+=.45)pathPoint(x,z+Math.sin(x*.7)*.43,.58);
function pond(cx,cz,rx,rz){for(let x=cx-rx;x<=cx+rx;x+=.55)for(let z=cz-rz;z<=cz+rz;z+=.55)if(((x-cx)/rx)**2+((z-cz)/rz)**2<1){box(x,.9,z,.55,.045,.55,'#709795','roads');if(random()<.13)box(x,.93,z,.22,.015,.045,'#a5b7a1','roads');}}
pond(.0,-25.6,3.1,3.5);pond(-3.2,-8.9,1.9,1.55);pond(1.3,-13.2,1.4,2.2);
box(-1.3,.89,-18.4,3.15,.05,4.05,'#b2bd86','roads'); // great lawn
for(let x of [1.2,2.1,3])for(let z of [-5.8,-4.55]){box(x,.9,z,.7,.025,1.05,'#b8a67c','roads');box(x,.92,z,.035,.01,.95,'#ddd1a4','roads');}
function tree(x,z,size=1,y=.75){count.trees++;const h=rand(.5,.8)*size;box(x,y+h/2,z,.12*size,h,.12*size,'#776c47','foliage');const green=choose(['#617c50','#728a54','#839863','#547447','#8d9c62']);box(x,y+h+.23*size,z,.67*size,.75*size,.69*size,green,'foliage');box(x-.04*size,y+h+.72*size,z-.02*size,.43*size,.28*size,.44*size,green,'foliage');}
for(let i=0;i<580;i++){let x=rand(-6.7,4.7),z=rand(-31.5,-2.2);if((x/3.5)**2+((z+25.6)/4)**2<1)continue;if(((x+3.2)/2.2)**2+((z+8.9)/1.9)**2<1)continue;if(((x-1.3)/1.6)**2+((z+13.2)/2.5)**2<1)continue;if(Math.abs(x+1.3)<1.8&&Math.abs(z+18.4)<2.2)continue;if(x>.8&&z>-6.6)continue;if(Math.abs(x-(-1.6+Math.sin(z*.29)*1.45))<.4)continue;tree(x,z,rand(.55,1.0),.85);}
for(let z=-49;z<52;z+=2.1){const[l,r]=bounds(z);tree(Math.ceil(l)+.7,z,rand(.52,.85));if(z<37)tree(Math.floor(r)-.7,z,rand(.55,.8));}
for(let i=0;i<155;i++){let z=rand(-46,51),x=choose([-11.3,-7.3,.7,8.7,12.7]);if(land(x,z,1.5)&&!park(x,z)&&!reserved(x,z))tree(x,z,.52);}
for(let z=-49;z<56;z+=2){tree(25.6+Math.floor(Math.sin(z*.075)*2.2),z,.8);tree(-29.5,z,.8);}
// Battery Park's miniature harbor gardens.
for(let i=0;i<45;i++){let z=rand(52,56),x=rand(-7,1);if(land(x,z,1))tree(x,z,rand(.6,1.0));}
// Bridges: stone towers, suspended road decks, and finely stepped cable curves.
function barBetween(a,b,width,color){const vec=new THREE.Vector3().subVectors(b,a);const length=vec.length();const mid=a.clone().add(b).multiplyScalar(.5);const q=new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,0,1),vec.normalize());const item=box(mid.x,mid.y,mid.z,width,width,length,color);item.q=q;}
function bridge(z,x0,x1,towers,color,name){
 const deckY=2.35,mid=(x0+x1)/2;box(mid,deckY,z,x1-x0,.42,1.65,'#a9a890');box(mid,deckY+.24,z,x1-x0,.07,1.23,'#7c897d');
 for(let x=x0;x<x1;x+=.9)box(x,deckY+.29,z,.35,.025,.045,'#d5ccb0','roads');
 for(const edge of [-.83,.83]){
  box(mid,deckY+.49,z+edge,x1-x0,.12,.09,color);
  for(const tx of towers){box(tx,1.9,z+edge,.8,5.5,.48,color);box(tx,5.01,z,.93,.4,2.15,color);box(tx,4.2,z,.9,.32,2.08,color);box(tx,5.35,z+edge,1.06,.32,.74,color);}
  const anchors=[x0,...towers,x1];for(let j=0;j<anchors.length-1;j++){
   const a=anchors[j],b=anchors[j+1],left=j===0?2.8:5.5,right=j===anchors.length-2?2.8:5.5;
   let prev=null;
   for(let x=a;x<=b+.01;x+=.32){let t=(x-a)/(b-a),y=left+(right-left)*t-Math.sin(t*Math.PI)*1.8;const pt=new THREE.Vector3(x,y,z+edge);if(prev)barBetween(prev,pt,.07,color);prev=pt;if(Math.round((x-a)/.32)%3===0)box(x,(y+deckY+.4)/2,z+edge,.035,Math.max(.01,y-deckY-.4),.035,color);}
  }
 }
}
bridge(39,10,30,[16,24],'#b9ad8b','Brooklyn');bridge(30,13,31,[18,26],'#84958d','Manhattan');bridge(0,16,31,[20,27],'#a3aa92','Queensboro');
// Harbor details: tiny boats, ferries, wakes and Liberty's familiar green silhouette.
const boatGroups=[];
function boat(x,z,scale=1,rot=0){const g=new THREE.Group();const add=(w,h,d,y,col)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),new THREE.MeshStandardMaterial({color:col,roughness:.7}));m.position.y=y;m.castShadow=true;g.add(m);};add(.65*scale,.28*scale,1.8*scale,0,'#e9d8b1');add(.46*scale,.22*scale,1.02*scale,.24*scale,'#fff1cf');add(.4*scale,.17*scale,.43*scale,.42*scale,'#739b98');add(.05,.5*scale,.05,.62*scale,'#d0c7a5');g.position.set(x,-.62,z);g.rotation.y=rot;city.add(g);boatGroups.push({g,z,x,phase:random()*6,rot});
 for(let k=0;k<3;k++){const wake=new THREE.Mesh(new THREE.PlaneGeometry((.4+k*.18)*scale,.08),new THREE.MeshBasicMaterial({color:'#bdd1bd',transparent:true,opacity:.36-k*.08,depthWrite:false}));wake.rotation.x=-Math.PI/2;wake.position.set(0,-.11,(1.25+k*.6)*scale);g.add(wake);}}
boat(-21,30,1.5,Math.PI);boat(21,18,1.2,0);boat(-22,-18,.95,Math.PI);boat(21,-34,1.4,0);boat(7,58,.85,-Math.PI/3);
box(-18,-.3,53,3.2,.65,3.1,'#a5ab87');box(-18,.23,53,2.2,.45,2.2,'#b2b18d');box(-18,.88,53,.93,.9,1,'#c6bea1');box(-18,2,53,.6,1.35,.58,'#7fa58a');box(-18,2.82,53,.44,.34,.42,'#7fa58a');box(-18.45,3.05,53,.17,1.04,.16,'#7fa58a');box(-18.45,3.7,53,.22,.27,.22,'#d1be83');box(-17.68,2.08,53,.27,.43,.28,'#7fa58a');
// Water glints are individual pixels, calm rather than noisy.
for(let i=0;i<620;i++){let x=rand(-37,37),z=rand(-61,61);if(land(x,z,.0)||x>25||x<-29)continue;box(x,-.745,z,rand(.16,.65),.012,.045,choose(['#8badab','#9ab7af','#7fa8a4']),'roads');}
// Yellow taxis, buses, and shop awnings give close-up views a human scale.
const carColors=['#dab04c','#e9bc4f','#e5cc8a','#d4d1b9','#a0b3ae','#ddad4b'];
for(let i=0;i<190;i++){
 const x=choose([-12,-8,-4,0,4,8,12])+choose([-.17,.17]),z=rand(-47,51);if(!land(x,z,1)||park(x,z)||reserved(x,z))continue;
 const color=choose(carColors);box(x,.81,z,.27,.25,.58,color);box(x,1,z-.03,.23,.14,.31,'#809895');box(x,.89,z+.28,.19,.09,.04,'#dfd7a1');
}
for(let z=25;z<42;z+=4)for(let x=-10;x<14;x+=4)if(land(x,z,2))box(x,.98,z+.55,.95,.14,.43,choose(['#b27353','#7f936b','#dcc28d']));
// Lamp beads glow gently after sunset.
const lampMat=new THREE.MeshStandardMaterial({color:'#efe3ae',emissive:'#ffd58a',emissiveIntensity:.1});
const lamps=[];for(let z=-45;z<52;z+=4)for(let x=-11.5;x<15;x+=8)if(land(x,z,1)&&!park(x,z)){
 box(x,1.22,z,.05,1.1,.05,'#858c73');lamps.push([x,1.79,z]);
}
const lm=new THREE.InstancedMesh(new THREE.BoxGeometry(.12,.13,.12),lampMat,lamps.length);const dummy=new THREE.Object3D();lamps.forEach((p,i)=>{dummy.position.set(...p);dummy.updateMatrix();lm.setMatrixAt(i,dummy.matrix);});city.add(lm);
// Small warm halos are confined to the physical lamps, not the whole scene.
const glowCanvas=document.createElement('canvas');glowCanvas.width=32;glowCanvas.height=32;const glowCtx=glowCanvas.getContext('2d');const glowGradient=glowCtx.createRadialGradient(16,16,0,16,16,16);glowGradient.addColorStop(0,'rgba(255,227,160,1)');glowGradient.addColorStop(.23,'rgba(255,194,100,.55)');glowGradient.addColorStop(1,'rgba(255,166,66,0)');glowCtx.fillStyle=glowGradient;glowCtx.fillRect(0,0,32,32);
const glowTexture=new THREE.CanvasTexture(glowCanvas);const glowPositions=[];lamps.forEach(p=>glowPositions.push(...p));for(let z=-48;z<53;z+=3.5){let[l,r]=bounds(z);glowPositions.push(Math.ceil(l)+.25,.87,z);glowPositions.push(Math.floor(r)-.25,.87,z);}
const glowGeometry=new THREE.BufferGeometry();glowGeometry.setAttribute('position',new THREE.Float32BufferAttribute(glowPositions,3));const glowMaterial=new THREE.PointsMaterial({map:glowTexture,color:'#ffd1a1',size:7,sizeAttenuation:false,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,opacity:0});city.add(new THREE.Points(glowGeometry,glowMaterial));
// Flush the voxel batches: tens of thousands of blocks, just a handful of draw calls.
windowMat.side=THREE.DoubleSide;darkWindowMat.side=THREE.DoubleSide;
const windowGeometry=new THREE.PlaneGeometry(1,1);
const mats={solid:solidMat,foliage:foliageMat,windows:windowMat,darkWindows:darkWindowMat,roads:roadMat};
const color=new THREE.Color();
for(const[key,items]of Object.entries(buckets)){
 const isWindow=key==='windows'||key==='darkWindows';
 const mesh=new THREE.InstancedMesh(isWindow?windowGeometry:boxGeometry,mats[key],items.length);mesh.name=key;
 items.forEach((b,i)=>{dummy.position.set(b.x,b.y,b.z);dummy.scale.set(b.w,b.h,b.d);dummy.rotation.set(0,0,0);if(b.q)dummy.quaternion.copy(b.q);if(isWindow){if(b.w<.05){dummy.scale.set(b.d,b.h,1);dummy.rotation.y=Math.PI/2;}else dummy.scale.set(b.w,b.h,1);}dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix);mesh.setColorAt(i,color.set(b.color));});
 mesh.castShadow=key==='solid'||key==='foliage';mesh.receiveShadow=key!=='windows'&&key!=='darkWindows';mesh.instanceMatrix.needsUpdate=true;mesh.instanceColor.needsUpdate=true;mesh.computeBoundingSphere();city.add(mesh);
}

// The UI and camera share a single selected place state.
let selected=null,showLabels=true,transition=null,toastTimer;
const labelRoot=$('#scene-labels');
for(const[id,p]of Object.entries(landmarks)){
 const el=document.createElement('button');el.className='landmark-pin';el.innerHTML='<span class="pin-dot"></span>'+p.name;el.setAttribute('aria-label','Explore '+p.name);el.addEventListener('click',()=>goTo(id));labelRoot.appendChild(el);p.el=el;
}
function toast(message){$('#toast').textContent=message;$('#toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),3000);}
function animateTo(target,zoom,overview=false){
 const direction=new THREE.Vector3(100,115,128).normalize().multiplyScalar(200);
 transition={start:performance.now(),duration:reducedMotion?1:softwareRenderer?500:1450,fromTarget:controls.target.clone(),toTarget:target.clone(),fromPos:camera.position.clone(),toPos:target.clone().add(direction),fromZoom:camera.zoom,toZoom:zoom};
 controls.autoRotate=false;$('#orbit-button').classList.remove('active');$('#orbit-button').setAttribute('aria-label','Start slow orbit');
}
function goTo(id){
 const p=landmarks[id];selected=id;document.body.classList.add('focused');
 animateTo(p.target,p.zoom);
 $('#place-category').textContent=p.category;$('#place-count').textContent=String(p.index).padStart(2,'0')+' / 06';$('#place-title').textContent=p.title;$('#place-description').textContent=p.description;$('#place-detail').innerHTML='<i></i>'+p.detail;
 $('#place-go').setAttribute('aria-label','Visit next landmark');$('#view-status').textContent=p.name.toUpperCase();$('#scale-label').textContent='A CLOSER LOOK';
 document.querySelectorAll('[data-place]').forEach(b=>b.classList.toggle('active',b.dataset.place===id));
 Object.entries(landmarks).forEach(([k,v])=>v.el.classList.toggle('selected',k===id));
 $('.water-label.label-hudson').style.opacity=0;$('.water-label.label-east').style.opacity=0;
}
function reset(){selected=null;document.body.classList.remove('focused');animateTo(new THREE.Vector3(0,1,0),1,true);$('#place-category').textContent='THE BIG PICTURE';$('#place-count').textContent='01 / 06';$('#place-title').textContent='One island. A thousand stories.';$('#place-description').textContent='Follow the avenues, find a familiar skyline, or get happily lost between the blocks.';$('#place-detail').innerHTML='<i></i>MADE TO BE EXPLORED';$('#place-go').setAttribute('aria-label','Visit Central Park');$('#view-status').textContent='THE WHOLE ISLAND';$('#scale-label').textContent='A NEW PERSPECTIVE';document.querySelectorAll('[data-place],.landmark-pin').forEach(b=>b.classList.remove('active','selected'));$('.label-hudson').style.opacity=.45;$('.label-east').style.opacity=.45;}
controls.addEventListener('change',()=>{sceneDirty=true;});
controls.addEventListener('start',()=>{transition=null;controls.autoRotate=false;$('#orbit-button').classList.remove('active');});
$('#explore-button').addEventListener('click',()=>goTo('park'));
$('#place-go').addEventListener('click',()=>{const ids=Object.keys(landmarks);goTo(ids[(ids.indexOf(selected)+1)%ids.length]);});
$('.brand').addEventListener('click',e=>{e.preventDefault();reset();});$('#reset-view').addEventListener('click',reset);
document.querySelectorAll('[data-place]').forEach(b=>b.addEventListener('click',()=>goTo(b.dataset.place)));
function zoomBy(mult){sceneDirty=true;transition=null;camera.zoom=THREE.MathUtils.clamp(camera.zoom*mult,controls.minZoom,controls.maxZoom);camera.updateProjectionMatrix();}
$('#zoom-in').addEventListener('click',()=>zoomBy(1.25));$('#zoom-out').addEventListener('click',()=>zoomBy(.8));
function toggleOrbit(){transition=null;controls.autoRotate=!controls.autoRotate;$('#orbit-button').classList.toggle('active',controls.autoRotate);$('#orbit-button').setAttribute('aria-label',controls.autoRotate?'Stop slow orbit':'Start slow orbit');toast(controls.autoRotate?'Taking the scenic route. Drag to take over.':'Your city. Your pace.');}
$('#orbit-button').addEventListener('click',toggleOrbit);
$('#labels-button').addEventListener('click',()=>{showLabels=!showLabels;$('#labels-button').innerHTML=(showLabels?'Hide':'Show')+' landmarks <span>◉</span>';$('#labels-button').setAttribute('aria-pressed',showLabels);});
const guide=$('#guide');$('#guide-button').addEventListener('click',()=>guide.showModal());$('.modal-close').addEventListener('click',()=>guide.close());guide.addEventListener('click',e=>{if(e.target===guide){const r=guide.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)guide.close();}});
document.addEventListener('keydown',e=>{if(guide.open||['INPUT','TEXTAREA'].includes(document.activeElement.tagName))return;if(e.code==='Space'&&document.activeElement.tagName==='BUTTON')return;if(e.key==='+'||e.key==='='){e.preventDefault();zoomBy(1.2);}if(e.key==='-'){e.preventDefault();zoomBy(1/1.2);}if(e.key==='Home'){e.preventDefault();reset();}if(e.code==='Space'){e.preventDefault();toggleOrbit();}});
const dayBg=new THREE.Color('#eeeae2'),nightBg=new THREE.Color('#18262e');
const sunDay=new THREE.Color('#fff0d6'),sunGold=new THREE.Color('#ffc47d'),sunNight=new THREE.Color('#9ebbd5');
function mood(value){sceneDirty=true;renderer.shadowMap.needsUpdate=true;const t=value/100,n=THREE.MathUtils.smoothstep(t,.48,.96);scene.background.copy(dayBg).lerp(nightBg,n);tableMat.color.copy(scene.background);hemi.intensity=THREE.MathUtils.lerp(1.75,.86,n);sun.intensity=THREE.MathUtils.lerp(2.8,.55,n);fill.intensity=THREE.MathUtils.lerp(1.05,1.2,n);sun.color.copy(t<.5?sunDay:sunGold).lerp(t<.5?sunGold:sunNight,t<.5?t*2:(t-.5)*2);sun.position.set(-45,85-t*34,35);contactShadow.material.opacity=.18+n*.08;windowMat.emissiveIntensity=.03+Math.pow(n,1.5)*1.9;lampMat.emissiveIntensity=.1+n*7;glowMaterial.opacity=n*.74;water.material.color.set('#5087a1').lerp(new THREE.Color('#39616d'),n*.65);renderer.toneMappingExposure=1.08-n*.03;document.body.classList.toggle('night',t>.73);$('#time-label').textContent=t<.22?'DAYLIGHT':t<.53?'GOLDEN HOUR':t<.78?'BLUE HOUR':'CITY LIGHTS';}
$('#time-slider').addEventListener('input',e=>mood(Number(e.target.value)));mood(38);
// User-initiated, locally synthesized ambience: river air, distant city and a ferry bell.
let audioCtx,ambientGain,audioOn=false,audioTimer;
function toggleSound(){
 if(!audioCtx){audioCtx=new(window.AudioContext||window.webkitAudioContext)();ambientGain=audioCtx.createGain();ambientGain.gain.value=0;ambientGain.connect(audioCtx.destination);const buf=audioCtx.createBuffer(1,audioCtx.sampleRate*4,audioCtx.sampleRate);const data=buf.getChannelData(0);let last=0;for(let i=0;i<data.length;i++){const white=Math.random()*2-1;last=(last+.018*white)/1.018;data[i]=last*3.6;}const noise=audioCtx.createBufferSource();noise.buffer=buf;noise.loop=true;const filter=audioCtx.createBiquadFilter();filter.type='lowpass';filter.frequency.value=550;noise.connect(filter);filter.connect(ambientGain);noise.start();
 const rumble=audioCtx.createOscillator();rumble.type='sine';rumble.frequency.value=68;const gain=audioCtx.createGain();gain.gain.value=.035;rumble.connect(gain);gain.connect(ambientGain);rumble.start();
 }
 audioCtx.resume();audioOn=!audioOn;ambientGain.gain.setTargetAtTime(audioOn?.36:0,audioCtx.currentTime,.6);$('#sound-button').classList.toggle('active',audioOn);$('#sound-button').setAttribute('aria-label',audioOn?'Turn off ambient city sound':'Turn on ambient city sound');toast(audioOn?'A little river air. A little city hum.':'City ambience off.');clearInterval(audioTimer);if(audioOn)audioTimer=setInterval(()=>{if(!audioOn||document.hidden)return;const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type='sine';o.frequency.value=174;o.connect(g);g.connect(ambientGain);const t=audioCtx.currentTime;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.10,t+.4);g.gain.exponentialRampToValueAtTime(.001,t+2.7);o.start(t);o.stop(t+3);},17000);
}
$('#sound-button').addEventListener('click',toggleSound);
$('#capture-button').addEventListener('click',()=>{
 renderer.render(scene,camera);const c=document.createElement('canvas');c.width=1920;c.height=1280;const ctx=c.getContext('2d');ctx.fillStyle=document.body.classList.contains('night')?'#18262e':'#eeeae2';ctx.fillRect(0,0,c.width,c.height);
 const source=renderer.domElement,ratio=Math.min(1810/source.width,1090/source.height),w=source.width*ratio,h=source.height*ratio;ctx.drawImage(source,(1920-w)/2,(1150-h)/2,w,h);ctx.fillStyle=document.body.classList.contains('night')?'#e8e6d8':'#344737';ctx.font='48px "DM Serif Display", Georgia';ctx.fillText('A little New York.',80,1190);ctx.font='15px "DM Sans", sans-serif';ctx.fillText('BOROUGH / VOL. 001',80,1226);ctx.textAlign='right';ctx.fillText(selected?landmarks[selected].name.toUpperCase():'MANHATTAN, NEW YORK',1840,1200);
 c.toBlob(blob=>{if(!blob){toast('Could not save this view. Please try again.');return;}const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='borough-manhattan-postcard.png';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('A little New York, to keep. Postcard saved.');},'image/png');
});
function resize(){sceneDirty=true;const w=host.clientWidth,h=host.clientHeight;renderer.setSize(w,h);const aspect=w/h;let frustum=137;if(w<600)frustum=Math.max(150,146/aspect);camera.left=-frustum*aspect/2;camera.right=frustum*aspect/2;camera.top=frustum/2;camera.bottom=-frustum/2;camera.updateProjectionMatrix();}window.addEventListener('resize',resize);resize();
const projected=new THREE.Vector3();let firstFrame=true,frame=0;const clock=new THREE.Clock();
function render(){requestAnimationFrame(render);if(document.hidden)return;const delta=Math.min(clock.getDelta(),.05),now=performance.now();
 if(transition){sceneDirty=true;let t=Math.min(1,(now-transition.start)/transition.duration);t=t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;controls.target.lerpVectors(transition.fromTarget,transition.toTarget,t);camera.position.lerpVectors(transition.fromPos,transition.toPos,t);camera.zoom=THREE.MathUtils.lerp(transition.fromZoom,transition.toZoom,t);camera.updateProjectionMatrix();if(t>=1)transition=null;}
 controls.update(delta);
 const bounded=controls.target.clone();bounded.x=THREE.MathUtils.clamp(bounded.x,-47,47);bounded.z=THREE.MathUtils.clamp(bounded.z,-68,68);bounded.y=THREE.MathUtils.clamp(bounded.y,-2,28);if(!bounded.equals(controls.target)){camera.position.add(bounded.clone().sub(controls.target));controls.target.copy(bounded);}
 camera.updateMatrixWorld();
 if(!reducedMotion&&!softwareRenderer)for(const boat of boatGroups){boat.g.position.z=boat.z+Math.sin(now*.00009+boat.phase)*1.6;boat.g.position.y=-.62+Math.sin(now*.001+boat.phase)*.015;}
 if(frame++%2===0){document.body.classList.toggle('close-view',camera.zoom>1.18);const rect=host.getBoundingClientRect();for(const[id,p]of Object.entries(landmarks)){
 projected.copy(p.pos).project(camera);const x=(projected.x*.5+.5)*rect.width+rect.left,y=(-projected.y*.5+.5)*rect.height+rect.top;
 const hidden=!showLabels||(innerWidth<800&&camera.zoom<1.45&&['empire','flatiron','chrysler'].includes(id))||(id==='chrysler'&&camera.zoom<1.45)||projected.z<-1||projected.z>1||x<310&&innerWidth>800||y<90||y>innerHeight-160||x>innerWidth-75||x<25||(camera.zoom>1.65&&selected&&selected!==id&&p.target.distanceTo(controls.target)>24);
 p.el.classList.toggle('hidden',hidden);p.el.tabIndex=hidden?-1:0;p.el.setAttribute('aria-hidden',String(hidden));p.el.style.left=x+'px';p.el.style.top=(y-17)+'px';
 }
 $('#compass-needle').style.transform=`rotate(${-controls.getAzimuthalAngle()*180/Math.PI}deg)`;
 }
 if(sceneDirty||(!softwareRenderer&&!reducedMotion)){renderer.render(scene,camera);sceneDirty=false;}if(firstFrame){firstFrame=false;setTimeout(()=>$('#loading').classList.add('loaded'),400);}
}
render();
// Small, read-only diagnostics for local verification.
window.__borough={softwareRenderer,scene,camera,controls,renderer,landmarks,counts:count,goTo,reset,mood,get selected(){return selected}};
