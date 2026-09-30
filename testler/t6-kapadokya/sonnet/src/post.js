import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

const GradeShader = {
  uniforms: {
    tDiffuse: { value: null },
    uFade: { value: 0 },        // 1 = siyah
    uVig: { value: 0.32 },
    uTime: { value: 0 },
    uGrain: { value: 0.012 },
    uAspect: { value: 1 },
    uNightMix: { value: 0 },
  },
  vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }`,
  fragmentShader: `
    uniform sampler2D tDiffuse; uniform float uFade, uVig, uTime, uGrain, uAspect, uNightMix;
    varying vec2 vUv;
    float h(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233)))*43758.5453); }
    void main(){
      vec2 c = vUv - 0.5;
      // hafif kromatik sapma
      float ca = dot(c,c) * 0.0035;
      vec3 col;
      col.r = texture2D(tDiffuse, vUv + c*ca).r;
      col.g = texture2D(tDiffuse, vUv).g;
      col.b = texture2D(tDiffuse, vUv - c*ca).b;
      // vinyet
      float v = smoothstep(0.95, 0.15, length(c*vec2(uAspect*0.75, 1.0))*1.15);
      col *= mix(1.0 - uVig, 1.0, v);
      // sıcak/soğuk ton ayırma: gölgeler serin, aydınlıklar sıcak
      float l = dot(col, vec3(0.2126,0.7152,0.0722));
      col = mix(col, col*vec3(0.93,0.98,1.08), (1.0 - smoothstep(0.0, 0.5, l))*0.45);
      col = mix(col, col*vec3(1.05,1.0,0.93), smoothstep(0.4, 2.0, l)*0.35);
      // film greni
      float g = h(vUv*vec2(1920.,1080.) + fract(uTime)*137.0) - 0.5;
      col += g * uGrain * (0.4 + 0.6*(1.0 - clamp(l,0.0,1.0)));
      col *= 1.0 - uFade;
      gl_FragColor = vec4(max(col, 0.0), 1.0);
    }`,
};

export function createPost(renderer, scene, camera) {
  const size = renderer.getDrawingBufferSize(new THREE.Vector2());
  const rt = new THREE.WebGLRenderTarget(size.x, size.y, { type: THREE.HalfFloatType, samples: 4 });
  const composer = new EffectComposer(renderer, rt);
  const rp = new RenderPass(scene, camera);
  const bloom = new UnrealBloomPass(new THREE.Vector2(size.x, size.y), 0.42, 0.75, 1.15);
  const grade = new ShaderPass(GradeShader);
  const out = new OutputPass();
  composer.addPass(rp); composer.addPass(bloom); composer.addPass(grade); composer.addPass(out);
  return { composer, bloom, grade, out, rp };
}
