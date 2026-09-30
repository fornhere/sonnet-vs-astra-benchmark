// Son işlem: MSAA → GTAO (SSAO) → bloom → tilt-shift (2 geçiş) → ton eşleme → vinyet/renk derecelendirme
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { GTAOPass } from 'three/examples/jsm/postprocessing/GTAOPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

const TiltShift = (dir) => ({
  uniforms: { tDiffuse: { value: null }, uDir: { value: new THREE.Vector2(dir[0], dir[1]) }, uRes: { value: new THREE.Vector2(1, 1) }, uFocus: { value: 0.5 }, uBand: { value: 0.16 }, uAmount: { value: 1.0 }, uTilt: { value: 0.0 } },
  vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
  fragmentShader: `uniform sampler2D tDiffuse; uniform vec2 uDir, uRes; uniform float uFocus, uBand, uAmount, uTilt; varying vec2 vUv;
    void main(){
      float dy = abs((vUv.y - uFocus) + (vUv.x - 0.5) * uTilt);
      float b = smoothstep(uBand, uBand + 0.5, dy) * uAmount;      // 0..1
      float r = b * 5.2;                                             // piksel yarıçapı
      vec2 px = uDir / uRes;
      vec4 c = texture2D(tDiffuse, vUv) * 0.2270270270;
      float w[4]; w[0]=0.3162162162; w[1]=0.0702702703; w[2]=0.0; w[3]=0.0;
      c += texture2D(tDiffuse, vUv + px * 1.3846153846 * r) * 0.3162162162;
      c += texture2D(tDiffuse, vUv - px * 1.3846153846 * r) * 0.3162162162;
      c += texture2D(tDiffuse, vUv + px * 3.2307692308 * r) * 0.0702702703;
      c += texture2D(tDiffuse, vUv - px * 3.2307692308 * r) * 0.0702702703;
      gl_FragColor = c;
    }`,
});
const Grade = {
  uniforms: { tDiffuse: { value: null }, uVig: { value: 0.32 }, uSat: { value: 1.08 }, uTime: { value: 0 }, uWarm: { value: new THREE.Color(1.02, 1.0, 0.97) }, uAspect: { value: 1.7 } },
  vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
  fragmentShader: `uniform sampler2D tDiffuse; uniform float uVig, uSat, uTime, uAspect; uniform vec3 uWarm; varying vec2 vUv;
    float h12(vec2 p){ vec3 p3 = fract(vec3(p.xyx)*.1031); p3 += dot(p3,p3.yzx+33.33); return fract((p3.x+p3.y)*p3.z); }
    void main(){
      vec3 c = texture2D(tDiffuse, vUv).rgb;
      float l = dot(c, vec3(0.299, 0.587, 0.114));
      c = mix(vec3(l), c, uSat) * uWarm;
      c = (c - 0.5) * 1.04 + 0.5;
      vec2 q = (vUv - 0.5) * vec2(uAspect * 0.62, 1.0);
      float v = smoothstep(0.95, 0.15, length(q) * 1.25);
      c *= mix(1.0 - uVig, 1.0, v);
      c += (h12(vUv * 1000.0 + uTime) - 0.5) * 0.012;
      gl_FragColor = vec4(c, 1.0);
    }`,
};

export class Post {
  constructor(renderer, scene, camera, quality) {
    this.renderer = renderer; this.quality = quality; this.enabled = true;
    const size = renderer.getDrawingBufferSize(new THREE.Vector2());
    const rt = new THREE.WebGLRenderTarget(size.x, size.y, { type: THREE.HalfFloatType, samples: quality === 'low' ? 0 : 4 });
    this.composer = new EffectComposer(renderer, rt);
    this.composer.addPass(new RenderPass(scene, camera));
    this.gtao = null;
    if (quality !== 'low') {
      this.gtao = new GTAOPass(scene, camera, size.x, size.y);
      this.gtao.blendIntensity = 0.85;
      this.gtao.updateGtaoMaterial({ radius: 2.2, distanceExponent: 1.4, thickness: 2.5, scale: 1.0, samples: 12, distanceFallOff: 1.0, screenSpaceRadius: false });
      this.gtao.updatePdMaterial({ lumaPhi: 10, depthPhi: 2, normalPhi: 3, radius: 5, radiusExponent: 1, rings: 2, samples: 12 });
      // gökyüzünü AO geçişinden çıkar
      const ov = this.gtao._overrideVisibility.bind(this.gtao), rs = this.gtao._restoreVisibility.bind(this.gtao); const hid = [];
      this.gtao._overrideVisibility = () => { ov(); scene.traverse((o) => { if (o.userData?.noAO && o.visible) { o.visible = false; hid.push(o); } }); };
      this.gtao._restoreVisibility = () => { rs(); hid.forEach((o) => { o.visible = true; }); hid.length = 0; };
      this.composer.addPass(this.gtao);
    }
    this.bloom = new UnrealBloomPass(new THREE.Vector2(size.x / 2, size.y / 2), 0.32, 0.55, 1.0);
    this.composer.addPass(this.bloom);
    this.tsH = new ShaderPass(TiltShift([1, 0])); this.tsV = new ShaderPass(TiltShift([0, 1]));
    this.composer.addPass(this.tsH); this.composer.addPass(this.tsV);
    this.composer.addPass(new OutputPass());
    this.grade = new ShaderPass(Grade); this.composer.addPass(this.grade);
    this.setSize(size.x, size.y);
  }
  setSize(w, h) {
    this.composer.setSize(w, h);
    for (const p of [this.tsH, this.tsV]) p.uniforms.uRes.value.set(w, h);
    this.grade.uniforms.uAspect.value = w / h;
  }
  setTilt({ focus, band, amount }) {
    for (const p of [this.tsH, this.tsV]) { if (focus != null) p.uniforms.uFocus.value = focus; if (band != null) p.uniforms.uBand.value = band; if (amount != null) p.uniforms.uAmount.value = amount; }
  }
  render(dt, t) { this.grade.uniforms.uTime.value = t % 10; this.composer.render(dt); }
}
