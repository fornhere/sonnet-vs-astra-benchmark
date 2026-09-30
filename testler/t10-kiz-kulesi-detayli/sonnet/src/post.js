// Son işlem: HDR bloom -> ton eşleme (ACES) -> renk derecelendirme, vinyet, kromatik sapma, film greni.
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { Q } from './config.js';
import { U } from './uniforms.js';

const FinalShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: U.uTime, uFlash: U.uFlash, uStorm: U.uStorm, uDay: U.uDay,
    uAspect: { value: 16 / 9 },
  },
  vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
  fragmentShader: /* glsl */`
    uniform sampler2D tDiffuse;
    uniform float uTime, uFlash, uStorm, uDay, uAspect;
    varying vec2 vUv;
    float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
    void main(){
      vec2 c = vUv - 0.5;
      float r2 = dot(c * vec2(uAspect, 1.0), c * vec2(uAspect, 1.0));
      // kromatik sapma (kenarlara doğru)
      float ca = 0.0003 + 0.0010 * r2 + 0.0015 * uFlash;
      vec3 col;
      col.r = texture2D(tDiffuse, vUv + c * ca * 1.6).r;
      col.g = texture2D(tDiffuse, vUv).g;
      col.b = texture2D(tDiffuse, vUv - c * ca * 1.6).b;
      // hafif derecelendirme: gölgelerde soğuk, parlaklarda sıcak
      float lum = dot(col, vec3(0.299, 0.587, 0.114));
      col = mix(col, col * vec3(0.94, 1.0, 1.08), (1.0 - smoothstep(0.0, 0.5, lum)) * 0.6);
      col = mix(col, col * vec3(1.06, 1.0, 0.92), smoothstep(0.5, 1.0, lum) * 0.5);
      col = pow(col, vec3(0.97));
      col = mix(vec3(lum), col, 1.06 + 0.12 * uDay);
      // vinyet
      col *= 1.0 - smoothstep(0.12, 0.62, r2) * (0.55 + 0.15 * uStorm);
      // film grenı
      float g = hash(vUv * vec2(1920.0, 1080.0) + fract(uTime * 7.0) * 100.0) - 0.5;
      col += g * (0.022 + 0.018 * uStorm) * (1.0 - lum * 0.6);
      gl_FragColor = vec4(col, 1.0);
    }
  `,
};

export class Post {
  constructor(renderer, scene, camera) {
    this.renderer = renderer;
    const size = renderer.getDrawingBufferSize(new THREE.Vector2());
    const rt = new THREE.WebGLRenderTarget(size.x, size.y, { type: THREE.HalfFloatType, samples: Q.msaa });
    this.composer = new EffectComposer(renderer, rt);
    this.composer.addPass(new RenderPass(scene, camera));
    if (Q.bloom) {
      this.bloom = new UnrealBloomPass(new THREE.Vector2(size.x, size.y), 0.55, 0.8, 0.85);
      this.composer.addPass(this.bloom);
    }
    this.composer.addPass(new OutputPass());
    this.final = new ShaderPass(FinalShader);
    this.composer.addPass(this.final);
  }

  setSize(w, h, pr) {
    this.composer.setPixelRatio(pr);
    this.composer.setSize(w, h);
    this.final.uniforms.uAspect.value = w / h;
  }

  render(dt) {
    if (this.bloom) this.bloom.strength = 0.5 + 0.2 * Math.min(1.2, U.uFlash.value) + 0.1 * U.uStorm.value;
    this.composer.render(dt);
  }
}
