import * as T from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
const V=(a)=>new T.Vector3(...a);
export function createMonument(){
 const root=new T.Group(),statue=new T.Group();root.add(statue);statue.position.y=10.3;statue.scale.set(1.83,1.66,1.98);
 const steel=new T.MeshStandardMaterial({color:0xa7acac,metalness:.94,roughness:.34});
 const polished=new T.MeshStandardMaterial({color:0xc3c6c0,metalness:1,roughness:.28});
 const darkSteel=new T.MeshStandardMaterial({color:0x626e70,metalness:.88,roughness:.32});
 const black=new T.MeshStandardMaterial({color:0x263532,metalness:.75,roughness:.31});
 const gold=new T.MeshStandardMaterial({color:0xa88b54,metalness:.85,roughness:.27});
 const stone=new T.MeshStandardMaterial({color:0x9c9986,roughness:.88});
 const trim=new T.MeshStandardMaterial({color:0xb2aa90,roughness:.7});
 const glass=new T.MeshStandardMaterial({color:0x172d2e,roughness:.26,metalness:.4});
 for(const material of [steel,polished,darkSteel]){
  material.onBeforeCompile=shader=>{
   shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vSculpt;').replace('#include <begin_vertex>','#include <begin_vertex>\nvSculpt=(modelMatrix*vec4(transformed,1.)).xyz;');
   shader.fragmentShader=shader.fragmentShader.replace('#include <common>','#include <common>\nvarying vec3 vSculpt;').replace('#include <normal_fragment_begin>',`#include <normal_fragment_begin>
    float dent=sin(vSculpt.x*5.7+sin(vSculpt.z*3.8))*sin(vSculpt.y*7.3+sin(vSculpt.x*4.));
    vec3 surfgrad=cross(dFdy(vViewPosition),normal)*dFdx(dent)+cross(normal,dFdx(vViewPosition))*dFdy(dent);
    float det=dot(dFdx(vViewPosition),cross(dFdy(vViewPosition),normal));
    normal=normalize(abs(det)*normal-.013*sign(det)*surfgrad);
   `);
  };
 }
 function mesh(geo,mat,p=[0,0,0],parent=statue){let m=new T.Mesh(geo,mat);m.position.set(...p);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
 function ell(p,s,mat=steel,rot=null,parent=statue){let m=mesh(new T.SphereGeometry(1,36,24),mat,p,parent);m.scale.set(...s);if(rot)m.rotation.set(...rot);return m;}
 function tube(points,r,mat=steel,parent=statue,segments=40){return mesh(new T.TubeGeometry(new T.CatmullRomCurve3(points.map(V)),segments,r,8,false),mat,[0,0,0],parent);}
 function bone(a,b,r1,r2,mat=steel,parent=statue){const av=V(a),bv=V(b),d=bv.clone().sub(av);let m=mesh(new T.CylinderGeometry(r2,r1,d.length(),24),mat,av.clone().add(bv).multiplyScalar(.5).toArray(),parent);m.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),d.normalize());return m;}
 function loft(rings,mat=steel,parent=statue,segments=48,fold=0){
 let smooth=[];for(let k=0;k<rings.length-1;k++){let a=rings[Math.max(0,k-1)],b=rings[k],c=rings[k+1],d=rings[Math.min(rings.length-1,k+2)];for(let q=0;q<4;q++){let t=q/4;smooth.push(b.map((v,n)=>.5*((2*v)+(-a[n]+c[n])*t+(2*a[n]-5*v+4*c[n]-d[n])*t*t+(-a[n]+3*v-3*c[n]+d[n])*t*t*t)));}}smooth.push(rings.at(-1));rings=smooth;
 let pos=[],idx=[];rings.forEach((r,j)=>{for(let i=0;i<=segments;i++){let a=i/segments*Math.PI*2,w=1+fold*Math.cos(a*12+j*.2);pos.push(r[1]+Math.cos(a)*r[3]*w,r[0],r[2]+Math.sin(a)*r[4]*w);if(j&&i){let c=j*(segments+1)+i;idx.push(c,c-1,c-segments-2,c,c-segments-2,c-segments-1);}}});let g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(pos,3));if(rings[rings.length-1][0]>rings[0][0]){for(let k=0;k<idx.length;k+=3){let tmp=idx[k];idx[k]=idx[k+1];idx[k+1]=tmp;}}g.setIndex(idx);g.computeVertexNormals();return mesh(g,mat,[0,0,0],parent);}
 // Horse: flowing chest, barrel, haunches and a broad arched neck.
 ell([0,8.8,-.3],[2.25,2.7,4.9]);ell([0,8.9,-3.65],[2.36,2.58,2.15]);ell([0,9.1,3.1],[2.06,2.76,2.0]);
 loft([[8.6,0,2.9,1.5,1.7],[9.5,0,3.3,1.65,1.8],[10.6,0,3.55,1.5,1.7],[12,0,3.95,1.28,1.5],[13.3,0,4.55,1.12,1.35],[14.6,0,5.1,1.02,1.16],[15.2,0,5.6,.86,.92],[15.5,0,5.7,.45,.5]]);
 // Realistic tapered limbs, knees, fetlocks, and separate hooves.
 for(const s of [-1,1]){
  let z=s===1?3.0:3.55;let x=s*1.42;
  ell([x,8.15,z],[.83,2.0,1.0],steel,[s*.06,0,s*.12]);
  loft([[7.9,x,z,.69,.72],[6.4,x*1.08,z+.06,.44,.48],[4.65,x*1.08,z+.17,.38,.37],[4.25,x*1.08,z+.25,.5,.44],[3.7,x*1.07,z+.18,.35,.31],[1.15,x*1.03,z+.26,.26,.3],[.75,x*1.03,z+.4,.4,.4]]);
  ell([x*1.03,.43,z+.58],[.55,.42,.78],darkSteel);
  tube([[x+.18,6.4,z+.4],[x+.16,4.4,z+.53],[x+.15,1.2,z+.53]],.055,polished);
  let hx=s*1.57,hz=s===1?-3.2:-3.75;
  ell([hx,8.0,hz],[.99,1.96,1.33],steel,[.32,0,-s*.15]);
  loft([[8.25,hx,hz,.87,1.05],[7.15,hx*1.1,hz+.3,.79,.86],[6.2,hx*1.12,hz+.55,.61,.59],[5.2,hx*1.11,hz-.1,.43,.46],[4.0,hx*1.1,hz-.95,.36,.46],[3.6,hx*1.1,hz-1.0,.44,.44],[2.9,hx*1.09,hz-.85,.29,.31],[.9,hx*1.08,hz-.35,.27,.3],[.5,hx*1.08,hz-.14,.41,.39]]);
  ell([hx*1.08,.4,hz+.02],[.55,.42,.75],darkSteel);
 }
 // Long face, defined jaw, nostrils, ears and eyes.
 ell([0,14.1,6.05],[.94,1.65,1.1],steel,[-.4,0,0]);
 loft([[12.4,0,7.05,.65,.69],[12.8,0,7.1,.82,.78],[13.5,0,6.7,.72,.83],[14.6,0,6.2,.78,.86],[15.4,0,5.75,.83,.78],[15.8,0,5.65,.42,.5]]);
 ell([0,12.6,7.2],[.84,.59,.78]);
 for(const s of [-1,1]){
  ell([s*.61,12.88,7.65],[.19,.16,.095],black,[0,s*.6,0]);
  ell([s*.77,14.82,6.24],[.23,.23,.22],polished);ell([s*.9,14.84,6.3],[.08,.12,.12],black);
  tube([[s*.62,15.13,6.27],[s*.88,15.05,6.22],[s*.96,14.89,6.08]],.1,steel);
  loft([[15.25,s*.6,5.45,.33,.34],[15.8,s*.71,5.46,.3,.3],[16.5,s*.81,5.36,.17,.22],[17.0,s*.84,5.34,.035,.06]],steel);
  ell([s*.79,16.15,5.58],[.11,.46,.065],darkSteel,[0,0,-s*.16]);
 }
 tube([[-.7,12.36,7.46],[0,12.22,7.86],[.7,12.36,7.46]],.045,darkSteel);
 // A comb-like sculpted mane, with flowing ridges.
 let maneShape=new T.Shape();maneShape.moveTo(-4.6,9.8);maneShape.bezierCurveTo(-4.1,12.1,-4.4,14.7,-5.8,16.0);maneShape.lineTo(-5.3,16.3);maneShape.bezierCurveTo(-2.9,15.6,-2.0,12.7,-2.3,10.1);maneShape.closePath();
 let mane=mesh(new T.ExtrudeGeometry(maneShape,{depth:.48,bevelEnabled:true,bevelThickness:.15,bevelSize:.12,bevelSegments:3,steps:1}),darkSteel);mane.rotation.y=Math.PI/2;mane.position.x=-.24;
 for(let i=0;i<16;i++){let t=i/15,y=10.6+t*5.0,z=2.6+t*2.7;for(const s of [-1,1])tube([[s*.28,y,z-.4],[s*.42,y+.45,z-.65],[s*.35,y+.85,z-.5]],.08,polished);}
 // Tail as a tapered bundle of metal strands.
 tube([[0,9.5,-5],[.2,8.2,-5.5],[.35,6.0,-5.7],[.65,3.2,-6.3],[1.25,1.25,-6.4]],.49,steel);
 for(let i=0;i<13;i++){let a=i/13*Math.PI*2;tube([[.35*Math.cos(a),9,-5.1+.35*Math.sin(a)],[.2+.48*Math.cos(a),6.3,-5.8+.36*Math.sin(a)],[.65+.38*Math.cos(a),3.3,-6.3+.35*Math.sin(a)],[1.25+.17*Math.cos(a),1.15,-6.4+.15*Math.sin(a)]],.068,i%2?polished:darkSteel);}
 // Bridle, browband, medallions, breast straps and double reins.
 for(const s of [-1,1]){
  tube([[s*.7,15.65,5.4],[s*.99,15.0,6.1],[s*.87,13.0,7.34]],.13,darkSteel);
  tube([[s*.87,12.9,7.38],[s*1.8,12.0,5.75],[s*2.15,12.6,3.5],[s*1.58,14.75,2.0]],.092,darkSteel);
  tube([[s*.87,12.9,7.3],[s*1.96,11.35,5.1],[s*2.25,11.6,3.25],[s*1.5,14.55,2.1]],.065,polished);
  let bit=mesh(new T.TorusGeometry(.27,.068,8,28),polished,[s*.91,12.94,7.16]);bit.rotation.y=Math.PI/2;
  tube([[s*1.1,11.4,3.95],[s*1.94,9.8,4.07],[s*1.0,8.0,4.8],[0,7.7,4.9]],.17,darkSteel);
  for(let j=0;j<9;j++){let a=j/8;ell([s*(1.08+a*.02),12.5+a*2.6,4.7+a*.8],[.12,.15,.16],polished);}
 }
 tube([[-.86,13,7.32],[0,12.94,7.94],[.86,13,7.32]],.14,darkSteel);
 tube([[-.88,15.14,6.15],[0,15.1,6.92],[.88,15.14,6.15]],.17,darkSteel);
 for(let i=0;i<7;i++)ell([-.66+i*.22,15.15,6.86+.07*Math.cos(i)],[.075,.09,.045],polished);
 ell([0,8.22,4.99],[.38,.48,.14],polished);
 // Saddle cloth: tailored surface wraps over the barrel, with a scalloped border.
 for(let s of [-1,1]){
  let p=[],idx=[];for(let j=0;j<=22;j++){let z=-3.95+j/22*6.25;for(let i=0;i<=18;i++){let a=i/18*1.57;let x=s*Math.sin(a)*2.43,y=9.25+Math.cos(a)*2.67-.18*Math.cos(z*1.8);p.push(x,y,z);if(j&&i){let c=j*19+i;idx.push(c,c-1,c-20,c,c-20,c-19);}}}
  let g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(p,3));g.setIndex(idx);g.computeVertexNormals();let saddle=mesh(g,darkSteel);saddle.material=darkSteel.clone();saddle.material.side=T.DoubleSide;
  tube([[s*2.44,9.22,-3.9],[s*2.48,9.04,-2],[s*2.47,9.0,0],[s*2.43,9.18,2.3]],.13,polished);
  for(let j=0;j<16;j++){let z=-3.6+j*.37;ell([s*2.43,9.42,z],[.09,.13,.12],polished);}
 }
 ell([0,11.45,-.85],[1.9,.64,2.25],black);
 // Rider: a heavy deel, open shoulders and sculpted cloth folds.
 loft([[11.2,0,-.95,1.9,1.55],[12.3,0,-.85,2.05,1.6],[13.4,0,-.7,1.75,1.42],[14.2,0,-.63,1.52,1.25],[15.6,0,-.55,1.62,1.26],[17,0,-.65,2.12,1.4],[18.1,0,-.62,2.15,1.26],[18.8,0,-.68,1.74,1.08],[19.2,0,-.68,1.22,.82],[19.45,0,-.64,.73,.65]],steel,statue,64,.035);
 // Back cloak is a single continuous, pleated sheet.
 let cp=[],ci=[];for(let j=0;j<=36;j++){let t=j/36,y=18.9-t*10;let rx=1.7+t*1.15,rz=1.13+t*3.8,cz=-.7-t*.5;for(let i=0;i<=48;i++){let a=Math.PI+i/48*Math.PI;let f=.16*Math.sin(i/48*Math.PI*14)*Math.sin(t*Math.PI*.8);cp.push(Math.cos(a)*(rx+f),y+.48*Math.sin(i/48*Math.PI)*t,cz+Math.sin(a)*(rz+f));if(j&&i){let c=j*49+i;ci.push(c,c-1,c-50,c,c-50,c-49);}}}
 let cg=new T.BufferGeometry();cg.setAttribute('position',new T.Float32BufferAttribute(cp,3));cg.setIndex(ci);cg.computeVertexNormals();let capeMat=steel.clone();capeMat.side=T.DoubleSide;mesh(cg,capeMat);
 for(let s of [-1,1]){
  tube([[s*1.7,18.9,-.7],[s*2.04,16.4,-.87],[s*2.35,13.0,-1.06],[s*2.85,8.9,-1.2]],.105,polished);
  // Bent knees, long riding boots and stirrups.
  ell([s*1.68,11.3,.75],[.87,1.65,1.63],steel,[-.45,0,s*.36]);
  ell([s*2.47,9.5,1.66],[.72,1.62,.78],darkSteel,[.2,0,s*.07]);
  ell([s*2.57,8.45,2.12],[.71,.63,1.22],darkSteel,[.13,0,0]);
  tube([[s*2.6,8.14,1.3],[s*3.13,8.02,1.32],[s*3.15,7.69,2.5],[s*2.52,7.65,2.55]],.11,polished);
  tube([[s*2.42,11.45,.32],[s*2.93,9.9,.74],[s*3.02,8,1.52]],.12,black);
  for(let i=0;i<4;i++)tube([[s*2.96,9.0+i*.33,1.1],[s*3.03,9.08+i*.33,1.66],[s*2.91,9.1+i*.33,2.0]],.048,polished);
 }
 // Draped coat panels conceal the upper thighs, as on the monument.
 for(const side of [-1,1]){
  let pp=[],ii=[];for(let j=0;j<=24;j++){let t=j/24;for(let i=0;i<=24;i++){let u=i/24,angle=-1.4+u*2.8;let x=side*(1.45+t*.93+Math.cos(angle)*.27),z=-.7+Math.sin(angle)*(1.55+t*.7),y=14.04-t*4.9+Math.cos(angle)*t*.52;let fold=Math.sin(u*Math.PI*12)*.075*t;pp.push(x+side*fold,y,z);if(j&&i){let c=j*25+i;ii.push(c,c-1,c-26,c,c-26,c-25);}}}
  let g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(pp,3));g.setIndex(ii);g.computeVertexNormals();let m=steel.clone();m.side=T.DoubleSide;mesh(g,m);
  tube([[side*2.49,9.18,-2.91],[side*2.72,9.57,-.7],[side*2.49,9.18,1.5]],.09,polished);
 }
 // Belt, diagonal lapel and engraved edging.
 const belt=mesh(new T.CylinderGeometry(1.7,1.76,.42,64),darkSteel,[0,14.12,-.63]);belt.scale.z=.77;
 ell([.25,14.13,.77],[.38,.31,.12],gold);tube([[-.65,19.3,.05],[.1,17.75,.74],[.9,16, .65],[1.25,14.4,.12]],.115,polished);
 tube([[.6,19.3,.1],[1.35,18.24,.5],[1.96,17.9,.36]],.13,polished);
 for(let i=0;i<11;i++){let y=14.8+i*.3;tube([[-1.4,y,.05],[-.5,y+.15,.78],[.42,y+.4,.77]],.035,darkSteel);}
 for(let s of [-1,1])for(let j=0;j<4;j++)tube([[s*.5,13.7-j*.6,.87],[s*1.05,13.3-j*.58,1.0],[s*1.71,12.9-j*.59,.6]],.06,polished);
 function sleeve(a,b,r1,r2){let d=V(b).sub(V(a)),len=d.length();let g=new T.Group();statue.add(g);g.position.set(...a);g.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),d.normalize());loft([[0,0,0,r1*.78,r1*.78],[len*.15,0,0,r1,r1],[len*.48,0,0,(r1+r2)*.55,(r1+r2)*.55],[len*.85,0,0,r2*1.12,r2*1.12],[len,0,0,r2,r2]],steel,g,40,.028);let cuff=mesh(new T.CylinderGeometry(r2*1.05,r2*1.07,.17,36),darkSteel,[0,len-.1,0],g);}
 // Arms: right elbow forward, fist around the ceremonial whip.
 sleeve([1.77,18.02,-.5],[2.94,17.25,1.15],.96,.73);ell([2.95,17.29,1.14],[.78,.8,.74]);sleeve([2.95,17.3,1.13],[2.9,18.05,3.58],.72,.46);
 sleeve([-1.77,18,-.45],[-2.68,15.7,.85],.91,.68);ell([-2.66,15.6,.85],[.7,.76,.73]);sleeve([-2.68,15.7,.85],[-1.48,14.82,2.25],.67,.41);
 ell([2.9,17.96,3.73],[.55,.53,.57]);ell([-1.43,14.78,2.41],[.49,.45,.49]);
 for(let i=0;i<4;i++){ell([2.54+i*.19,17.71,4.02],[.1,.25,.21],polished,[.3,0,0]);ell([-1.72+i*.17,14.56,2.68],[.09,.22,.17],polished);}
 bone([2.84,11.28,3.02],[2.91,18.38,3.86],.09,.12,gold);ell([2.91,18.4,3.87],[.16,.18,.17],gold);
 for(let i=0;i<8;i++)ell([2.9,17.6-i*.13,3.77-i*.014],[.14,.035,.14],darkSteel);
 // Neck, face planes, nose, eyelids, moustache, beard. All remain sculpted steel.
 ell([0,19.64,-.55],[.64,.87,.64]);
 loft([[19.85,0,-.44,.51,.5],[20.15,0,-.35,.78,.66],[20.65,0,-.38,.95,.79],[21.22,0,-.49,1.01,.89],[21.85,0,-.58,.92,.89],[22.3,0,-.64,.78,.77],[22.6,0,-.7,.46,.51]]);
 for(const s of [-1,1]){
  ell([s*.94,20.96,-.36],[.22,.45,.24]);
  ell([s*.53,20.82,.24],[.42,.29,.14],steel,[0,0,s*.12]);
  tube([[s*.17,21.54,.42],[s*.48,21.61,.38],[s*.78,21.48,.19]],.115,darkSteel);
  tube([[s*.21,21.3,.43],[s*.47,21.25,.48],[s*.68,21.31,.33]],.075,polished);
  ell([s*.46,21.33,.45],[.19,.047,.055],black);
  tube([[s*.06,20.52,.7],[s*.28,20.42,.7],[s*.55,20.26,.48],[s*.62,20.05,.44]],.11,darkSteel);
  // Braided hair hanging below the helmet.
  tube([[s*.93,21.55,-.73],[s*1.12,20.45,-.82],[s*1.12,19.5,-.66],[s*.96,19.1,-.47]],.2,darkSteel);
  for(let i=0;i<11;i++)ell([s*(1.05+.06*Math.sin(i)),20.86-i*.15,-.6],[.21,.07,.21],polished);
 }
 ell([0,20.96,.5],[.17,.4,.23]);ell([0,20.7,.61],[.23,.15,.15]);
 tube([[-.35,20.24,.58],[0,20.21,.69],[.35,20.24,.58]],.04,black);
 loft([[19.55,0,.28,.13,.13],[19.8,0,.37,.35,.22],[20.1,0,.42,.4,.23],[20.25,0,.43,.3,.22]],darkSteel);
 for(let i=0;i<7;i++)tube([[-.26+i*.087,20.12,.64],[-.21+i*.07,19.88,.58],[-.09+i*.03,19.58,.38]],.025,polished);
 // Mongol helmet: flared brim, crown, central crest and top finial.
 loft([[21.85,0,-.65,1.16,1.05],[22.05,0,-.65,1.23,1.14],[22.21,0,-.65,1.01,.95],[22.7,0,-.69,.9,.86],[23.05,0,-.72,.63,.6],[23.25,0,-.73,.17,.17]],polished);
 for(let s of [-1,1])tube([[s*1.11,21.94,-.65],[s*.89,22.59,-.61],[s*.48,23.12,-.61],[0,23.26,-.72]],.055,darkSteel);
 bone([0,23.2,-.73],[0,23.95,-.77],.17,.013,polished);
 tube([[0,22.02,.47],[0,22.48,.24],[0,22.88,-.12],[0,23.2,-.56]],.075,steel);
 // Architectural base: concentric stone drums, cornices and thirty-six columns.
 function cyl(rt,rb,h,y,mat=stone){return mesh(new T.CylinderGeometry(rt,rb,h,144),mat,[0,y,0],root);}
 cyl(21.5,22.1,.6,.3);cyl(20.7,21.2,.6,.9);cyl(19.6,20.3,.6,1.5);cyl(18.85,18.85,5.4,4.5);cyl(20.25,20.25,.5,7.4,trim);cyl(19.8,20.35,.35,7.82);cyl(18.35,18.75,.35,8.15,trim);cyl(17.55,17.55,1.5,9.07);cyl(18.1,18.3,.3,9.93,trim);cyl(18.45,18.1,.22,10.2,trim);
 let windowShape=new T.Shape();windowShape.moveTo(-.68,0);windowShape.lineTo(.68,0);windowShape.lineTo(.68,2.2);windowShape.absarc(0,2.2,.68,0,Math.PI,false);windowShape.closePath();let winGeo=new T.ShapeGeometry(windowShape);
 for(let i=0;i<36;i++){
  let a=i/36*Math.PI*2;let sector=new T.Group();sector.rotation.y=a;root.add(sector);
  mesh(winGeo,glass,[0,2.3,18.91],sector);
  tube([[-.79,2.23,18.96],[-.79,4.57,18.96],[-.55,5.2,18.96],[0,5.4,18.96],[.55,5.2,18.96],[.79,4.57,18.96],[.79,2.23,18.96]],.1,trim,sector,28);
  bone([0,2.4,18.97],[0,5.04,18.97],.036,.036,trim,sector);bone([-.62,3.4,18.97],[.62,3.4,18.97],.035,.035,trim,sector);
  let ca=a+Math.PI/36,x=Math.sin(ca)*19.03,z=Math.cos(ca)*19.03;
  bone([x,1.78,z],[x,6.87,z],.34,.28,trim,root);mesh(new T.CylinderGeometry(.45,.43,.28,20),trim,[x,6.9,z],root);mesh(new T.CylinderGeometry(.45,.48,.3,20),trim,[x,1.92,z],root);
  for(let k=0;k<5;k++){let yy=2.6+k*.76;bone([x-.01,yy,z],[x-.01,yy+.035,z],.351,.351,stone,root);}
  ell([Math.sin(a)*17.62,9.12,Math.cos(a)*17.62],[.42,.5,.42],glass,null,root);
 }
 // Broad ceremonial staircase, precise treads and side walls.
 for(let i=0;i<16;i++){let z=22+i*.85;mesh(new T.BoxGeometry(10.8,.16+(15-i)*.105,.91),i%2?stone:trim,[0,(.16+(15-i)*.105)/2,z],root);for(let s of [-1,1])mesh(new T.BoxGeometry(.53,.4+(15-i)*.105,.92),stone,[s*5.8,(.4+(15-i)*.105)/2,z],root);}
 const plaza=new T.Mesh(new T.CircleGeometry(31,160),new T.MeshStandardMaterial({color:0x74766a,roughness:.97}));plaza.rotation.x=-Math.PI/2;plaza.position.y=.04;plaza.receiveShadow=true;root.add(plaza);
 // Inlaid radial plaza joints.
 for(let i=0;i<60;i++){let a=i/60*Math.PI*2;bone([Math.sin(a)*22.4,.065,Math.cos(a)*22.4],[Math.sin(a)*30.8,.065,Math.cos(a)*30.8],.022,.022,darkSteel,root);}
 for(const r of [23.8,27.4,30.9]){let m=mesh(new T.TorusGeometry(r,.032,4,160),darkSteel,[0,.07,0],root);m.rotation.x=Math.PI/2;}
 // Merge stationary pieces by material; retain physically based lighting with fewer draw calls.
 function batch(group){group.updateMatrixWorld(true);let buckets=new Map();const inv=group.matrixWorld.clone().invert();group.traverse(o=>{if(o.isMesh){let g=o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone();if(!g.attributes.uv)g.setAttribute('uv',new T.Float32BufferAttribute(new Float32Array(g.attributes.position.count*2),2));g.applyMatrix4(inv.clone().multiply(o.matrixWorld));let key=o.material.uuid;if(!buckets.has(key))buckets.set(key,{mat:o.material,geos:[]});buckets.get(key).geos.push(g);}});group.clear();for(const b of buckets.values()){const g=mergeGeometries(b.geos,false);if(g){const m=new T.Mesh(g,b.mat);m.castShadow=true;m.receiveShadow=true;group.add(m);}b.geos.forEach(g=>g.dispose());}}
 batch(statue);batch(root);
 root.userData.materials={steel,polished,darkSteel,gold};return root;
}
