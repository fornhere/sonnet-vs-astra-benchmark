import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
export { THREE };
let seed=28631;
export function rand(){seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;}
const fract=x=>x-Math.floor(x),mix=(a,b,t)=>a+(b-a)*t;
function hash(x,z){return fract(Math.sin(x*127.1+z*311.7)*43758.5453);}
function noise(x,z){let ix=Math.floor(x),iz=Math.floor(z),fx=x-ix,fz=z-iz;fx=fx*fx*(3-2*fx);fz=fz*fz*(3-2*fz);return mix(mix(hash(ix,iz),hash(ix+1,iz),fx),mix(hash(ix,iz+1),hash(ix+1,iz+1),fx),fz);}
function fbm(x,z){return noise(x,z)*.55+noise(x*2.03,z*2.03)*.27+noise(x*4.12,z*4.12)*.12+noise(x*8.23,z*8.23)*.06;}
export const pathX=z=>Math.sin(z*.014)*28+15;
export function height(x,z){
 const rolling=fbm(x*.012,z*.012)*13+noise(x*.04,z*.04)*1.3;
 const left=Math.exp(-Math.pow((x+245+Math.sin(z*.009)*45)/100,2));
 const right=Math.exp(-Math.pow((x-245-Math.cos(z*.012)*35)/110,2));
 const rear=Math.exp(-Math.pow((z+345)/145,2));
 const ridges=28+52*Math.pow(1-Math.abs(noise(x*.018,z*.023)*2-1),2)+fbm(x*.048,z*.025)*18;
 return rolling+(left+right)*ridges+rear*(55+70*fbm(x*.018,z*.016))+Math.pow(Math.max(0,Math.abs(x)-430)/190,1.5)*22;
}
export function createWorld(canvas){
 const compact=matchMedia('(pointer: coarse)').matches;
 const renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance',preserveDrawingBuffer:true});
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));renderer.setSize(innerWidth,innerHeight);
 renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;
 renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
 const scene=new THREE.Scene();scene.fog=new THREE.FogExp2('#c5ada0',.00155);
 const camera=new THREE.PerspectiveCamera(53,innerWidth/innerHeight,.4,2500);camera.position.set(130,72,190);
 const ambient=new THREE.HemisphereLight('#b8d4ee','#756054',1.75);scene.add(ambient);
 const sun=new THREE.DirectionalLight('#ffcea0',4.1);sun.position.set(-260,190,-280);sun.castShadow=true;
 sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-310,right:310,top:310,bottom:-310,near:10,far:900});sun.shadow.bias=-.0005;sun.shadow.normalBias=1.4;sun.shadow.radius=3;scene.add(sun);
 const skyUniforms={top:{value:new THREE.Color('#417d96')},horizon:{value:new THREE.Color('#edb69b')},bottom:{value:new THREE.Color('#cba68e')},sunDir:{value:new THREE.Vector3(-.6,.23,-.9).normalize()},sunColor:{value:new THREE.Color('#ffe7ac')}};
 const sky=new THREE.Mesh(new THREE.SphereGeometry(1600,40,24),new THREE.ShaderMaterial({side:THREE.BackSide,depthWrite:false,uniforms:skyUniforms,vertexShader:`varying vec3 vDir;void main(){vDir=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,fragmentShader:`varying vec3 vDir;uniform vec3 top,horizon,bottom,sunDir,sunColor;void main(){vec3 d=normalize(vDir);float h=max(d.y,0.);vec3 col=mix(horizon,top,pow(smoothstep(0.,.48,h),.48));col=mix(bottom,col,smoothstep(-.15,.015,d.y));float sd=max(dot(d,sunDir),0.);col+=sunColor*(pow(sd,10.)*.13+pow(sd,140.)*.24);col=mix(col,sunColor*1.35,smoothstep(.99955,.9998,sd));float wisps=sin(d.x*31.+d.y*160.+sin(d.z*37.)*2.)*sin(d.z*43.+d.x*71.);float cloud=smoothstep(.45,.95,wisps)*smoothstep(.04,.22,d.y)*(1.-smoothstep(.22,.55,d.y));col=mix(col,horizon,cloud*.085);gl_FragColor=vec4(col,1.);#include <tonemapping_fragment>\n#include <colorspace_fragment>}`.replace(';#include',';\n#include')}));scene.add(sky);
 // Shared linear noise texture keeps fine sandstone detail inexpensive, including on integrated GPUs.
 const savedSeed=seed;const noisePixels=new Uint8Array(128*128*4);for(let i=0;i<noisePixels.length;i+=4){noisePixels[i]=rand()*255;noisePixels[i+1]=rand()*255;noisePixels[i+2]=rand()*255;noisePixels[i+3]=255;}
 seed=savedSeed;const rockNoise=new THREE.DataTexture(noisePixels,128,128,THREE.RGBAFormat);rockNoise.wrapS=rockNoise.wrapT=THREE.RepeatWrapping;rockNoise.magFilter=THREE.LinearFilter;rockNoise.minFilter=THREE.LinearMipmapLinearFilter;rockNoise.generateMipmaps=true;rockNoise.needsUpdate=true;
 function rockMat(color){const m=new THREE.MeshStandardMaterial({color,roughness:1,vertexColors:true});m.onBeforeCompile=shader=>{shader.uniforms.rockNoise={value:rockNoise};shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vRock;').replace('#include <begin_vertex>','#include <begin_vertex>\nvRock=(modelMatrix*vec4(position,1.)).xyz;');shader.fragmentShader=shader.fragmentShader.replace('#include <common>',`#include <common>
varying vec3 vRock;
uniform sampler2D rockNoise;
float rNoise(vec3 p){return texture2D(rockNoise,p.xy/128.).r*.55+texture2D(rockNoise,p.zy/128.).g*.45;}`);shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
float broad=rNoise(vRock*.14);float grit=rNoise(vRock*4.1);float strata=sin(vRock.y*2.7+broad*4.);float fine=sin(vRock.y*17.+rNoise(vRock*.7)*3.);diffuseColor.rgb*=.81+broad*.22+grit*.13+strata*.042+fine*.026;`);
 shader.fragmentShader=shader.fragmentShader.replace('#include <normal_fragment_begin>',`#include <normal_fragment_begin>
 float relief=rNoise(vRock*1.9)*.026+rNoise(vRock*.45)*.065+sin(vRock.y*4.2+rNoise(vRock*.11)*3.)*.008;
 vec3 dpX=dFdx(-vViewPosition),dpY=dFdy(-vViewPosition);vec3 rX=cross(dpY,normal),rY=cross(normal,dpX);float det=dot(dpX,rX);vec3 grad=sign(det)*(dFdx(relief)*rX+dFdy(relief)*rY);normal=normalize(abs(det)*normal-grad);`);
 };return m;}
 const rock=rockMat('#ddc2a0'),terrainMat=rockMat('#ceb390');
 const terrainGeo=new THREE.PlaneGeometry(1800,1800,compact?170:280,compact?170:280);terrainGeo.rotateX(-Math.PI/2);
 const ps=terrainGeo.attributes.position,colors=[];const c=new THREE.Color();
 for(let i=0;i<ps.count;i++){const x=ps.getX(i),z=ps.getZ(i),y=height(x,z);ps.setY(i,y);const n=fbm(x*.028,z*.028);c.set('#d5b38e');c.lerp(new THREE.Color('#a88c72'),n*.8);if(x>130)c.lerp(new THREE.Color('#b78371'),.24);colors.push(c.r,c.g,c.b);}
 terrainGeo.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));terrainGeo.computeVertexNormals();const terrain=new THREE.Mesh(terrainGeo,terrainMat);terrain.receiveShadow=true;scene.add(terrain);
 // A seeded, individually eroded surface: each chimney has a fluted body and an asymmetric crown.
 const colliders=[],rocks=[];
 function spire(x,z,h,r,type=0,special=0){
 const radial=compact?20:32,levels=compact?25:38,verts=[],cols=[],inds=[];const phase=rand()*6.28,base=height(x,z)-.8,lean=(rand()-.5)*r*.65;
 for(let j=0;j<=levels;j++){const t=j/levels;let profile;
 if(type===1){
 const keys=[[0,1],[.12,.82],[.32,.55],[.55,.35],[.69,.29],[.74,.34],[.79,.49],[.85,.5],[.91,.4],[.97,.21],[1,.008]];
 for(let n=1;n<keys.length;n++)if(t<=keys[n][0]){let u=(t-keys[n-1][0])/(keys[n][0]-keys[n-1][0]);u=u*u*(3-2*u);profile=mix(keys[n-1][1],keys[n][1],u);break;}
 }else if(type===2){profile=(.96-.42*t)*(t>.77?Math.pow(Math.max(.001,(1-t)/.23),.28):1);}
 else profile=.003+Math.pow(1-t,1.27)*.91+Math.exp(-Math.pow((t-.79)/.13,2))*.085;
 for(let k=0;k<=radial;k++){const a=k/radial*Math.PI*2;const flute=1+Math.sin(a*7+phase+t*1.8)*(.06+.09*(1-t))+Math.sin(a*13+phase+t*5)*.04;const broad=1+Math.sin(a*3+phase+t*2)*.12+Math.sin(a*5-phase+t*3)*.045;const rr=r*profile*flute*broad;const xx=x+Math.cos(a)*rr+lean*t*t,zz=z+Math.sin(a)*rr+(Math.sin(t*3+phase)-Math.sin(phase))*r*.075;const yy=base+t*h+(height(xx,zz)-base-1)*Math.pow(1-t,4)+Math.sin(a*3+phase+t*4)*r*.055*Math.sin(t*Math.PI)+(type===2?Math.sin(a*7+phase)*h*.025*t:0);verts.push(xx,yy,zz);
 const shade=.90+noise(t*7,phase)*.15;const rc=new THREE.Color(type===1&&t>.75?'#bda68c':'#e3c9ac');if(special)rc.lerp(new THREE.Color('#bf8c77'),special);rc.multiplyScalar(shade*(.8+.2*Math.min(1,t*5)));cols.push(rc.r,rc.g,rc.b);
 if(j<levels&&k<radial){const i=j*(radial+1)+k;inds.push(i,i+radial+1,i+1,i+1,i+radial+1,i+radial+2);}}
 }
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));g.setAttribute('color',new THREE.Float32BufferAttribute(cols,3));g.setIndex(inds);g.computeVertexNormals();rocks.push(g);colliders.push({x,z,r:r*.78,h:base+h});return {x,z,r,h,base,phase,lean};
 }
 for(let i=0;i<280;i++){const x=(rand()-.5)*520,z=(rand()-.5)*560-80;if(Math.abs(x-pathX(z))<18||Math.hypot(x+130,z+140)<60||height(x,z)>68)continue;const n=rand();spire(x,z,12+n*27,4.8+n*7,rand()>.63?1:0,x>110?.33:0);}
 // Landmark groups intentionally composed around the central valley.
 const heroSp=[];for(const [x,z,h,r,t] of [[-50,22,42,12,1],[-77,2,49,13,1],[-95,38,35,12,0],[77,-55,43,12,1],[99,-73,51,15,1],[113,-44,31,11,0],[55,98,32,12,0],[-37,99,26,11,1],[155,128,46,18,0]])heroSp.push(spire(x,z,h,r,t));
 // Uçhisar: a connected inhabited tuff outcrop with many dark, recessed cave apertures.
 const castle=spire(-142,-163,72,34,2);spire(-163,-157,56,24,2);spire(-126,-155,53,22,2);spire(-143,-161,82,13,2);
 const rockMesh=new THREE.Mesh(mergeGeometries(rocks),rock);rockMesh.castShadow=true;rockMesh.receiveShadow=true;scene.add(rockMesh);rocks.forEach(g=>g.dispose());
 const darkMat=new THREE.MeshStandardMaterial({color:'#392d24',roughness:1});const caveGeos=[];
 function cave(x,y,z,w,h,angle=0){const shape=new THREE.Shape();shape.moveTo(-w/2,0);shape.lineTo(w/2,0);shape.lineTo(w/2,h*.63);shape.quadraticCurveTo(w*.45,h,-.03,h);shape.quadraticCurveTo(-w*.5,h,-w/2,h*.66);shape.lineTo(-w/2,0);const geo=new THREE.ShapeGeometry(shape,8);geo.rotateY(angle);geo.translate(x,y,z);caveGeos.push(geo);}
 for(let i=0;i<68;i++){const t=.12+rand()*.61,a=rand()*6.28;const rr=34*(.96-.42*t);const b=Math.PI/2-a,flute=1+Math.sin(b*7+castle.phase+t*1.8)*(.06+.09*(1-t))+Math.sin(b*13+castle.phase+t*5)*.04,broad=1+Math.sin(b*3+castle.phase+t*2)*.12+Math.sin(b*5-castle.phase+t*3)*.045;
 const x=-142+Math.sin(a)*(rr*flute*broad+.12)+castle.lean*t*t,z=-163+Math.cos(a)*(rr*flute*broad+.12)+(Math.sin(t*3+castle.phase)-Math.sin(castle.phase))*34*.075;
 const y=castle.base+t*72+(height(x,z)-castle.base-1)*Math.pow(1-t,4)+Math.sin(b*3+castle.phase+t*4)*34*.055*Math.sin(t*Math.PI)+Math.sin(b*7+castle.phase)*72*.025*t;cave(x,y,z,1.4+rand()*1.2,2+rand()*1.7,a);}
 for(const sp of heroSp.slice(0,5)){const t=.12,rr=sp.r*(.25+.76*Math.pow(1-t/.77,1.8));cave(sp.x,sp.base+sp.h*t,sp.z+rr+.1,1.7,2.7);}
 if(caveGeos.length){const caves=new THREE.Mesh(mergeGeometries(caveGeos),darkMat);scene.add(caves);}
 // Earth paths follow the actual heightfield, and remain navigable at ground level.
 function trail(fn,start,end,width,steps=260){const v=[],ix=[],uv=[];for(let i=0;i<=steps;i++){const t=start+(end-start)*i/steps;const p=fn(t),next=fn(t+.01);let dx=next[0]-p[0],dz=next[1]-p[1],l=Math.hypot(dx,dz);dx/=l;dz/=l;for(const sign of [-1,1]){const w=width*(.85+noise(t*.08,12)*.3);const x=p[0]+dz*w*sign,z=p[1]-dx*w*sign;v.push(x,height(x,z)+.20,z);uv.push(sign===-1?0:1,i/steps);}if(i<steps){const j=i*2;ix.push(j,j+2,j+1,j+1,j+2,j+3);}}
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(v,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(ix);g.computeVertexNormals();const mat=new THREE.MeshStandardMaterial({color:'#927656',roughness:1,polygonOffset:true,polygonOffsetFactor:-1,transparent:true,depthWrite:false});mat.onBeforeCompile=shader=>{shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nvarying vec2 vPathUV;varying vec3 vPathPos;').replace('#include <begin_vertex>','#include <begin_vertex>\nvPathUV=uv;vPathPos=position;');shader.fragmentShader=shader.fragmentShader.replace('#include <common>','#include <common>\nvarying vec2 vPathUV;varying vec3 vPathPos;').replace('#include <color_fragment>',`#include <color_fragment>
 float grit=fract(sin(dot(floor(vPathPos.xz*8.),vec2(12.9898,78.233)))*43758.5453);float edge=smoothstep(0.,.22,vPathUV.x)*(1.-smoothstep(.78,1.,vPathUV.x));diffuseColor.a*=edge*(.77+grit*.2);diffuseColor.rgb*=.88+grit*.2;`);};const m=new THREE.Mesh(g,mat);m.receiveShadow=true;scene.add(m);}
 trail(z=>[pathX(z),z],-330,450,2.8);trail(t=>[pathX(-110)-t*155,-110-Math.sin(t*2)*45],0,1,2);trail(t=>[18+t*170,40+t*100+Math.sin(t*4)*15],0,1,1.7);
 const houses=[],roofs=[],windows=[];const box=new THREE.BoxGeometry(1,1,1),dummy=new THREE.Object3D();
 function boxPart(target,x,y,z,sx,sy,sz,ry=0){const g=box.clone();dummy.position.set(x,y,z);dummy.rotation.set(0,ry,0);dummy.scale.set(sx,sy,sz);dummy.updateMatrix();g.applyMatrix4(dummy.matrix);target.push(g);}
 for(let i=0;i<90;i++){const a=rand()*Math.PI*2,rad=24+rand()*50;const x=-143+Math.sin(a)*rad,z=-152+Math.cos(a)*rad;if(z< -181||Math.hypot(x+142,z+163)<27)continue;const w=4+rand()*4,d=5+rand()*5,h=3+rand()*4,y=height(x,z),ry=(rand()-.5)*.4;const foundation=Math.min(height(x-w*.7,z-d*.7),height(x+w*.7,z-d*.7),height(x-w*.7,z+d*.7),height(x+w*.7,z+d*.7),y)-1;boxPart(houses,x,(foundation+y+h)/2,z,w,y+h-foundation,d,ry);boxPart(roofs,x,y+h+.18,z,w+.4,.36,d+.4,ry);colliders.push({x,z,r:Math.max(w,d)*.56,h:y+h});
 for(let j=0;j<2;j++){boxPart(windows,x-w*.24+j*w*.48,y+h*.6,z+d*.501,.72,1.35,.055,ry);}boxPart(windows,x,y+1,z+d*.504,1.1,2,.06,ry);
 if(rand()>.5){boxPart(houses,x+w*.12,y+h+1.4,z-d*.1,w*.6,2.8,d*.6,ry);boxPart(roofs,x+w*.12,y+h+2.9,z-d*.1,w*.6+.25,.3,d*.6+.25,ry);}}
 for(const [geos,col] of [[houses,'#ccb394'],[roofs,'#b39a7c'],[windows,'#51473b']]){const m=new THREE.Mesh(mergeGeometries(geos),new THREE.MeshStandardMaterial({color:col,roughness:1}));m.castShadow=true;m.receiveShadow=true;scene.add(m);}
 // Sparse steppe vegetation and stones, instanced to keep the valley inexpensive to explore.
 const shrubs=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1,1),new THREE.MeshStandardMaterial({color:'#75764b',roughness:1,flatShading:true}),1100);const stones=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1,0),new THREE.MeshStandardMaterial({color:'#ae9777',roughness:1,flatShading:true}),900);
 for(let i=0;i<1100;i++){const x=(rand()-.5)*700,z=(rand()-.5)*780;const s=.35+rand()*.85;dummy.position.set(x,height(x,z)+s*.23,z);dummy.scale.set(s,s*.4,s*.75);dummy.rotation.set(rand(),rand()*6,rand());dummy.updateMatrix();shrubs.setMatrixAt(i,dummy.matrix);shrubs.setColorAt(i,new THREE.Color().setHSL(.12+rand()*.08,.16+rand()*.15,.25+rand()*.13));}
 for(let i=0;i<900;i++){const x=(rand()-.5)*640,z=(rand()-.5)*620,s=.25+rand()*.85;dummy.position.set(x,height(x,z)+s*.3,z);dummy.scale.set(s,s*.6,s*.7);dummy.rotation.set(rand(),rand()*6,rand());dummy.updateMatrix();stones.setMatrixAt(i,dummy.matrix);}
 shrubs.receiveShadow=true;stones.receiveShadow=true;scene.add(shrubs,stones);
 // Tall cypresses lend a human scale to the cave village.
 const treeTrunks=[],treeTops=[];for(let i=0;i<35;i++){const x=-185+rand()*105,z=-100+rand()*70,h=4+rand()*6;const trunk=new THREE.CylinderGeometry(.16,.22,h*.6,5);trunk.translate(x,height(x,z)+h*.3,z);treeTrunks.push(trunk);const top=new THREE.SphereGeometry(1,7,9);top.scale(.8,h*.55,.8);top.translate(x,height(x,z)+h*.62,z);treeTops.push(top);}
 for(const [geos,color] of [[treeTrunks,'#675440'],[treeTops,'#424d34']]){const m=new THREE.Mesh(mergeGeometries(geos),new THREE.MeshStandardMaterial({color,roughness:1}));m.castShadow=true;scene.add(m);}
 const balloons=[];
 const palettes=[['#b75638','#f5dcb0'],['#425e63','#e5c78e'],['#a78249','#ece0bd'],['#884b3d','#c78b59'],['#d6b675','#f5ead0'],['#786858','#ede3c3']];
 function balloon(x,y,z,scale,palette,index){
 const g=new THREE.Group(),vs=[],co=[],ind=[],sides=compact?56:96,rows=compact?24:36;
 const profile=t=>{const keys=[[0,.12],[.08,.25],[.22,.58],[.42,.9],[.62,1],[.78,.9],[.9,.65],[.97,.32],[1,.015]];for(let i=1;i<keys.length;i++)if(t<=keys[i][0]){const f=(t-keys[i-1][0])/(keys[i][0]-keys[i-1][0]);return mix(keys[i-1][1],keys[i][1],f*f*(3-2*f));}return .01;};
 for(let j=0;j<=rows;j++){const t=j/rows;for(let k=0;k<=sides;k++){const a=k/sides*6.2831853;const sector=k/sides*16;const panel=Math.pow(Math.sin(sector*Math.PI),2);const r=profile(t)*(1+panel*.028);vs.push(Math.cos(a)*r*8,t*21+4,Math.sin(a)*r*8);let col=new THREE.Color(palette[Math.floor(sector)%2]);if(t<.15||t>.95)col=new THREE.Color(palette[0]);if(t>.22&&t<.29)col.lerp(new THREE.Color(palette[1]),.55);col.multiplyScalar(.88+panel*.12);co.push(col.r,col.g,col.b);if(j<rows&&k<sides){const n=j*(sides+1)+k;ind.push(n,n+1,n+sides+1,n+1,n+sides+2,n+sides+1);}}}
 const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(vs,3));geo.setAttribute('color',new THREE.Float32BufferAttribute(co,3));geo.setIndex(ind);geo.computeVertexNormals();const envelope=new THREE.Mesh(geo,new THREE.MeshStandardMaterial({vertexColors:true,roughness:.83,side:THREE.DoubleSide}));g.add(envelope);
 const basket=new THREE.Mesh(new THREE.BoxGeometry(1.9,1.5,1.5),new THREE.MeshStandardMaterial({color:'#8b613b',roughness:1}));basket.position.y=1.15;g.add(basket);const rim=new THREE.Mesh(new THREE.BoxGeometry(2.1,.2,1.7),new THREE.MeshStandardMaterial({color:'#4c4030',roughness:1}));rim.position.y=1.92;g.add(rim);
 const ropes=[];for(const xx of [-.8,.8])for(const zz of [-.65,.65]){ropes.push(new THREE.Vector3(xx,1.8,zz),new THREE.Vector3(xx*1.25,4.8,zz*1.25));}const rope=new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(ropes),new THREE.LineBasicMaterial({color:'#514331'}));g.add(rope);
 const fire=new THREE.Mesh(new THREE.ConeGeometry(.24,1.1,6),new THREE.MeshBasicMaterial({color:'#ffc876'}));fire.position.y=3;g.add(fire);
 g.scale.setScalar(scale);g.position.set(x,y,z);g.rotation.y=rand()*6.28;scene.add(g);balloons.push({group:g,base:new THREE.Vector3(x,y,z),phase:rand()*6.28,fire,scale,index});return g;
 }
 balloon(55,91,-54,1.24,palettes[0],0);balloon(-105,110,-181,1.04,palettes[1],1);balloon(151,71,-158,.8,palettes[4],2);balloon(-177,69,35,.7,palettes[3],3);
 for(let i=0;i<35;i++){balloon((rand()-.5)*970,86+rand()*145,-170-rand()*720,.36+rand()*.53,palettes[i%palettes.length],i+4);}
 // Slowly drifting birds, always independent of camera movement.
 const birdPositions=[],birdCount=35;for(let i=0;i<birdCount;i++){birdPositions.push((rand()-.5)*460,40+rand()*40,(rand()-.5)*450);}
 const birdGeo=new THREE.BufferGeometry();birdGeo.setAttribute('position',new THREE.Float32BufferAttribute(new Float32Array(birdCount*18),3));const birds=new THREE.LineSegments(birdGeo,new THREE.LineBasicMaterial({color:'#514a42',transparent:true,opacity:.65}));scene.add(birds);
 function update(t){for(const b of balloons){b.group.position.x=b.base.x+Math.sin(t*.025+b.phase)*5;b.group.position.y=b.base.y+Math.sin(t*.18+b.phase)*1.15;b.group.rotation.z=Math.sin(t*.2+b.phase)*.009;b.fire.visible=Math.sin(t*.85+b.phase)>.58;}
 const p=birdGeo.attributes.position;for(let i=0;i<birdCount;i++){const x=birdPositions[i*3]+Math.sin(t*.045+i)*22,y=birdPositions[i*3+1]+Math.sin(t*.2+i)*2,z=birdPositions[i*3+2]+Math.cos(t*.04+i)*18,flap=Math.sin(t*4+i)*.55;const vals=[x-.8,y+flap,z+.3,x,y,z,x,y,z,x+.8,y+flap,z+.3,x,y,z,x,y-.15,z+.55];for(let k=0;k<18;k++)p.array[i*18+k]=vals[k];}p.needsUpdate=true;}
 const looks=[{name:'Gün doğumu',detail:'05:42 &nbsp; / &nbsp; ALTIN SAAT',top:'#417d96',horizon:'#edb69b',fog:'#c5ada0',light:'#ffcea0',power:4.1,ambient:1.75,exposure:1.15,sunY:190},{name:'Gün batımı',detail:'18:36 &nbsp; / &nbsp; SON IŞIK',top:'#8393a6',horizon:'#eda276',fog:'#c18e79',light:'#ffb078',power:3.6,ambient:1.6,exposure:1.12,sunY:115},{name:'Mavi saat',detail:'19:12 &nbsp; / &nbsp; AKŞAM SESSİZLİĞİ',top:'#233b65',horizon:'#bd96a0',fog:'#69758d',light:'#c5d1ff',power:1.15,ambient:1.45,exposure:.9,sunY:90}];
 let lookIndex=0;function setLook(i){lookIndex=i%looks.length;const a=looks[lookIndex];skyUniforms.top.value.set(a.top);skyUniforms.horizon.value.set(a.horizon);skyUniforms.bottom.value.set(a.fog);scene.fog.color.set(a.fog);sun.color.set(a.light);sun.intensity=a.power;ambient.intensity=a.ambient;sun.position.y=a.sunY;renderer.toneMappingExposure=a.exposure;return a;}
 function render(){sky.position.copy(camera.position);renderer.render(scene,camera);}
 return {renderer,scene,camera,colliders,balloons,update,render,setLook,height,looks,get lookIndex(){return lookIndex;}};
}
