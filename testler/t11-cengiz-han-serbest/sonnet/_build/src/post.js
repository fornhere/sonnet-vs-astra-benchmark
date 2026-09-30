import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';

const GradeShader = {
  uniforms: {
    tDiffuse: { value: null }, uSun: { value: new THREE.Vector2(0.5, 0.5) }, uShaft: { value: 0 }, uTime: { value: 0 },
    uFade: { value: 1 }, uAspect: { value: 1 }, uGrain: { value: 0.035 }, uVig: { value: 0.32 }, uWarm: { value: 0.0 },
  },
  vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
  fragmentShader: `
uniform sampler2D tDiffuse; uniform vec2 uSun; uniform float uShaft, uTime, uFade, uAspect, uGrain, uVig, uWarm;
varying vec2 vUv;
float h(vec2 p){ vec3 p3 = fract(vec3(p.xyx)*.1031); p3 += dot(p3,p3.yzx+33.33); return fract((p3.x+p3.y)*p3.z); }
void main(){
  vec2 uv = vUv; vec2 c = uv - 0.5;
  float ca = dot(c,c) * 0.010;
  vec3 col;
  col.r = texture2D(tDiffuse, uv + c*ca).r;
  col.g = texture2D(tDiffuse, uv).g;
  col.b = texture2D(tDiffuse, uv - c*ca).b;
  if (uShaft > 0.002){
    vec2 dir = uSun - uv; vec3 acc = vec3(0.); float decay = 1.0;
    for (int i=0;i<30;i++){
      vec2 s = uv + dir * (float(i)/30.0) * 0.9;
      vec3 sc = texture2D(tDiffuse, s).rgb;
      float l = dot(sc, vec3(0.3333));
      acc += sc * smoothstep(0.62, 0.98, l) * decay; decay *= 0.955;
    }
    col += acc / 30.0 * uShaft * vec3(1.0,0.86,0.68);
  }
  // grade: gentle S-curve, split tone
  float l = dot(col, vec3(0.299,0.587,0.114));
  col = mix(vec3(l), col, 1.20);
  col = mix(col, col*col*(3.0-2.0*col), 0.34);
  col *= mix(vec3(0.97,1.0,1.03), vec3(1.04,1.0,0.95), smoothstep(0.15,0.75,l));
  col += vec3(0.05,0.02,-0.02) * uWarm * l;
  // vignette
  float v = smoothstep(0.85, 0.15, length(c*vec2(uAspect*0.8,1.0)*1.05));
  col *= mix(1.0 - uVig, 1.0, v);
  // grain
  float g = h(uv*vec2(1920.,1080.) + fract(uTime)*97.0) - 0.5;
  col += g * uGrain * (1.0 - l*0.6);
  col *= uFade;
  gl_FragColor = vec4(col, 1.0);
}`,
};

export function makePost(renderer, scene, camera) {
  const size = renderer.getSize(new THREE.Vector2());
  const pr = renderer.getPixelRatio();
  const rt = new THREE.WebGLRenderTarget(size.x * pr, size.y * pr, { type: THREE.HalfFloatType, samples: 4 });
  const composer = new EffectComposer(renderer, rt);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(size.x, size.y), 0.30, 0.7, 1.35);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());
  const grade = new ShaderPass(GradeShader);
  composer.addPass(grade);
  return { composer, bloom, grade };
}
