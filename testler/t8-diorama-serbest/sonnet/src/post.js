import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

const TiltShader = (dir) => ({
  uniforms: { tDiffuse: { value: null }, uRes: { value: new THREE.Vector2(1, 1) }, uDir: { value: new THREE.Vector2(...dir) }, uFocus: { value: 0.5 }, uBand: { value: 0.27 }, uAmount: { value: 1.0 } },
  vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
  fragmentShader: `uniform sampler2D tDiffuse; uniform vec2 uRes; uniform vec2 uDir; uniform float uFocus; uniform float uBand; uniform float uAmount; varying vec2 vUv;
    void main(){ float d = max(abs(vUv.y - uFocus) - uBand, 0.0); float r = min(d * 3.2, 1.0); r = r*r * 2.6 * uAmount; 
      vec3 acc = texture2D(tDiffuse, vUv).rgb * 0.2270270; vec2 st = uDir / uRes * r;
      acc += texture2D(tDiffuse, vUv + st*1.3846).rgb*0.3162162 + texture2D(tDiffuse, vUv - st*1.3846).rgb*0.3162162;
      acc += texture2D(tDiffuse, vUv + st*3.2308).rgb*0.0702703 + texture2D(tDiffuse, vUv - st*3.2308).rgb*0.0702703;
      gl_FragColor = vec4(acc, 1.0); }`,
});
const GradeShader = {
  uniforms: { tDiffuse: { value: null }, uVig: { value: 0.38 }, uSat: { value: 1.14 }, uTime: { value: 0 }, uWarm: { value: 0.0 } },
  vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
  fragmentShader: `uniform sampler2D tDiffuse; uniform float uVig; uniform float uSat; uniform float uTime; uniform float uWarm; varying vec2 vUv;
    void main(){ vec3 c = texture2D(tDiffuse, vUv).rgb; float l = dot(c, vec3(0.2126,0.7152,0.0722)); c = mix(vec3(l), c, uSat);
      vec2 q = vUv - 0.5; float v = 1.0 - uVig * dot(q,q) * 2.2; c *= v;
      c *= vec3(1.0 + uWarm*0.05, 1.0, 1.0 - uWarm*0.05);
      float n = fract(sin(dot(vUv*1000.0 + uTime, vec2(12.9898,78.233)))*43758.5453); c += (n-0.5)*0.008;
      gl_FragColor = vec4(c, 1.0); }`,
};
export function createPost(renderer, scene, camera) {
  const size = renderer.getSize(new THREE.Vector2()); const pr = renderer.getPixelRatio();
  const rt = new THREE.WebGLRenderTarget(size.x * pr, size.y * pr, { type: THREE.HalfFloatType, samples: 4 });
  const composer = new EffectComposer(renderer, rt); composer.setPixelRatio(pr); composer.setSize(size.x, size.y);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(size.x, size.y), 0.4, 0.55, 1.0); composer.addPass(bloom);
  const th = new ShaderPass(TiltShader([1, 0])), tv = new ShaderPass(TiltShader([0, 1])); composer.addPass(th); composer.addPass(tv);
  const grade = new ShaderPass(GradeShader); composer.addPass(grade);
  composer.addPass(new OutputPass());
  const api = { composer, bloom, grade, tilt: 1, tiltK: 1,
    setSize(w, h, pr) { composer.setPixelRatio(pr); composer.setSize(w, h); for (const p of [th, tv]) p.uniforms.uRes.value.set(w * pr, h * pr); },
    update(time) { th.uniforms.uAmount.value = tv.uniforms.uAmount.value = api.tilt * api.tiltK; th.enabled = tv.enabled = api.tilt > 0.01; grade.uniforms.uTime.value = time % 10; },
  };
  api.setSize(size.x, size.y, pr); return api;
}
