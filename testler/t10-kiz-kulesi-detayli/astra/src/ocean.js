import * as T from "three";
import { noiseGLSL } from "./util.js";
export const wavesGLSL = `
void gerstner(vec2 dir,float wavelength,float amp,float speed,vec2 p,inout vec3 v,inout vec3 dx,inout vec3 dz){
 float k=6.2831853/wavelength;float f=k*dot(dir,p)-speed*uTime;float a=amp*(.15+uStorm*.95);float s=sin(f),c=cos(f);float q=.6;
 v+=vec3(q*a*dir.x*c,a*s,q*a*dir.y*c);
 dx+=vec3(-q*a*k*dir.x*dir.x*s,a*k*dir.x*c,-q*a*k*dir.x*dir.y*s);
 dz+=vec3(-q*a*k*dir.x*dir.y*s,a*k*dir.y*c,-q*a*k*dir.y*dir.y*s);
}
void surface(vec2 p,out vec3 v,out vec3 norm){v=vec3(p.x,0.,p.y);vec3 dx=vec3(1,0,0),dz=vec3(0,0,1);
 gerstner(normalize(vec2(1,.3)),29.,.55,1.05,p,v,dx,dz);
 gerstner(normalize(vec2(.65,-.8)),16.,.32,1.45,p,v,dx,dz);
 gerstner(normalize(vec2(.2,1)),9.5,.21,1.9,p,v,dx,dz);
 gerstner(normalize(vec2(-.7,.6)),5.3,.11,2.7,p,v,dx,dz);
 gerstner(normalize(vec2(.9,.4)),2.7,.065,3.7,p,v,dx,dz);
 gerstner(normalize(vec2(-.3,1)),1.4,.026,4.6,p,v,dx,dz);
 norm=normalize(cross(dz,dx));}`;
export function createOcean(scene, uniforms, low) {
  const g = new T.PlaneGeometry(2, 2, low ? 140 : 260, low ? 140 : 260);
  g.rotateX(-Math.PI / 2);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    let x = p.getX(i),
      z = p.getZ(i);
    p.setXYZ(
      i,
      Math.sign(x) * Math.pow(Math.abs(x), 2.1) * 900,
      0,
      Math.sign(z) * Math.pow(Math.abs(z), 2.1) * 900,
    );
  }
  const m = new T.ShaderMaterial({
    uniforms,
    vertexShader: `uniform float uTime,uStorm;varying vec3 vWorld,vNormal;${wavesGLSL}void main(){vec3 p,n;surface(position.xz,p,n);vWorld=p;vNormal=n;gl_Position=projectionMatrix*viewMatrix*vec4(p,1.);}`,
    fragmentShader: `
 uniform float uTime,uStorm,uDawn,uFlash,uBeam;varying vec3 vWorld,vNormal;${noiseGLSL}
 void main(){
 vec3 V=normalize(cameraPosition-vWorld);vec2 p=vWorld.xz;
 float rip=noise(p*2.5+vec2(uTime*.9,-uTime*.3));
 vec3 N=normalize(vNormal+vec3((noise(p*3.+uTime)-.5)*.1,0.,(rip-.5)*.13));
 float fres=pow(1.-max(dot(N,V),0.),3.5);
 vec3 sky=mix(vec3(.03,.068,.09),vec3(.27,.31,.34),uDawn);
 vec3 base=mix(vec3(.006,.026,.035),vec3(.03,.075,.083),uDawn);
 vec3 col=mix(base,sky,fres*.82);
 vec3 moonDir=normalize(vec3(-.6,.7,-.7));vec3 H=normalize(V+moonDir);float spec=pow(max(dot(N,H),0.),145.);
 col+=vec3(.14,.26,.31)*spec*(.9+.5*uStorm);
 col+=vec3(.018,.065,.073)*max(N.y-.7,0.)*2.;
 // Fragmented warm reflection: narrow at the island, broad across the moving foreground.
 float zside=smoothstep(-8.,4.,p.y);float spread=1.6+abs(p.y)*.065;
 float reflection=exp(-pow((p.x+3.+N.x*8.)/spread,2.))*zside*exp(-abs(p.y)*.022);
 float strips=pow(max(0.,sin(p.y*3.2+N.z*21.+uTime*1.8)),9.);
 col+=vec3(1.,.41,.09)*reflection*(.045+strips*.55)*(1.-fres*.45);
 vec2 bdir=vec2(sin(uBeam),cos(uBeam));vec2 from=p-vec2(-3,0);float beam=pow(max(dot(normalize(from),bdir),0.),90.);
 col+=vec3(.65,.44,.19)*beam*pow(max(N.y,0.),14.)*exp(-length(from)*.023)*(.07+strips*.5);
 float r=length(p/vec2(16.5,12.));float shore=exp(-pow((r-1.)*8.,2.));
 float lace=fbm(p*1.8+vec2(uTime*.5,-uTime*.6));float crest=smoothstep(.68,.91,vWorld.y)*smoothstep(.54,.75,lace)*uStorm;
 float foam=shore*smoothstep(.36,.62,lace+sin(r*24.-uTime*2.5)*.16)*(.25+.7*uStorm)+crest*.17;
 col=mix(col,vec3(.38,.52,.54),foam*.8);
 col+=vec3(.35,.5,.64)*uFlash*(.14+fres*.6+spec);
 float dist=length(cameraPosition-vWorld);float fog=1.-exp(-dist*.0035);col=mix(col,sky*.52+uFlash*.18,fog);
 gl_FragColor=vec4(col,1.);
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
 }`,
  });
  const ocean = new T.Mesh(g, m);
  ocean.frustumCulled = false;
  scene.add(ocean);
  return ocean;
}
export function seaHeight(x, z, t, s) {
  const waves = [
    [1, 0.3, 29, 0.55, 1.05],
    [0.65, -0.8, 16, 0.32, 1.45],
    [0.2, 1, 9.5, 0.21, 1.9],
    [-0.7, 0.6, 5.3, 0.11, 2.7],
    [0.9, 0.4, 2.7, 0.065, 3.7],
    [-0.3, 1, 1.4, 0.026, 4.6],
  ];
  let h = 0;
  for (let [dx, dz, w, a, v] of waves) {
    let l = Math.hypot(dx, dz);
    h +=
      a *
      (0.15 + s * 0.95) *
      Math.sin(((6.283 / w) * (dx * x + dz * z)) / l - v * t);
  }
  return h;
}
