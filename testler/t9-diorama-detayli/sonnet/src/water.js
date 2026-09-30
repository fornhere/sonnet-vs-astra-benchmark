// Deniz yüzeyi: kıyı derinlik dokusu, animasyonlu dalga normalleri, köpük, güneş parıltısı, gökyüzü yansıması.
import * as THREE from 'three';
import { W, H } from './geo.js';
import { U } from './materials.js';

export function buildWater(world) {
  const tex = new THREE.DataTexture(new Uint8Array(world.wdist), W, H, THREE.RedFormat, THREE.UnsignedByteType);
  tex.magFilter = THREE.LinearFilter; tex.minFilter = THREE.LinearFilter; tex.needsUpdate = true; tex.flipY = false;
  const landTex = new THREE.DataTexture(new Uint8Array(world.land.map((v) => v * 255)), W, H, THREE.RedFormat, THREE.UnsignedByteType);
  landTex.magFilter = THREE.NearestFilter; landTex.minFilter = THREE.NearestFilter; landTex.needsUpdate = true;
  const uniforms = THREE.UniformsUtils.merge([THREE.UniformsLib.fog, {
    uShore: { value: tex }, uLand: { value: landTex }, uSize: { value: new THREE.Vector2(W, H) },
    uTime: U.uTime, uNight: U.uNight, uSkyCol: U.uSkyCol, uSunCol: U.uSunCol, uSunDir: U.uSunDir, uSnow: U.uSnow, uCam: { value: new THREE.Vector3() },
    uShallow: { value: new THREE.Color('#5fb8b0') }, uMid: { value: new THREE.Color('#2f7ca4') }, uDeep: { value: new THREE.Color('#173f6a') },
  }]);
  // UniformsUtils.merge değerleri klonlar → paylaşılan referansları geri bağla
  Object.assign(uniforms, { uTime: U.uTime, uNight: U.uNight, uSkyCol: U.uSkyCol, uSunCol: U.uSunCol, uSunDir: U.uSunDir, uSnow: U.uSnow });
  const mat = new THREE.ShaderMaterial({
    uniforms, fog: true,
    vertexShader: `varying vec3 vW; varying vec2 vUv;
      #include <fog_pars_vertex>
      void main(){ vec4 wp = modelMatrix*vec4(position,1.0); vW = wp.xyz; vUv = vec2(wp.x, wp.z); vec4 mvPosition = viewMatrix*wp; gl_Position = projectionMatrix*mvPosition; 
      #include <fog_vertex>
      }`,
    fragmentShader: `varying vec3 vW; varying vec2 vUv;
      uniform sampler2D uShore, uLand; uniform vec2 uSize; uniform float uTime, uNight, uSnow; uniform vec3 uSkyCol, uSunCol, uSunDir, uCam, uShallow, uMid, uDeep;
      #include <fog_pars_fragment>
      float h12(vec2 p){ vec3 p3 = fract(vec3(p.xyx)*.1031); p3 += dot(p3,p3.yzx+33.33); return fract((p3.x+p3.y)*p3.z); }
      float vn(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f); return mix(mix(h12(i),h12(i+vec2(1,0)),f.x), mix(h12(i+vec2(0,1)),h12(i+vec2(1,1)),f.x), f.y); }
      float wave(vec2 p, float t){ return vn(p*0.9+vec2(t*0.35,t*0.2))*0.6 + vn(p*2.1-vec2(t*0.5,-t*0.3))*0.3 + vn(p*4.7+vec2(-t*0.9,t*0.6))*0.1; }
      void main(){
        vec2 uv = vUv / uSize;
        float d = texture2D(uShore, uv).r * 255.0;   // kıyıya hücre uzaklığı
        float t = uTime;
        float e = 0.09;
        float w0 = wave(vUv, t), wx = wave(vUv+vec2(e,0.0), t), wz = wave(vUv+vec2(0.0,e), t);
        vec3 n = normalize(vec3((w0-wx)*2.2, 1.0, (w0-wz)*2.2));
        vec3 V = normalize(uCam - vW);
        vec3 col = mix(uShallow, uMid, smoothstep(0.5, 6.0, d));
        col = mix(col, uDeep, smoothstep(5.0, 30.0, d));
        col *= 0.92 + 0.16 * w0;
        // yansıma
        float fres = pow(1.0 - max(dot(n, V), 0.0), 3.0);
        vec3 refl = mix(uSkyCol, vec3(0.42, 0.58, 0.78), 0.55);
        col = mix(col, mix(refl, vec3(dot(refl, vec3(0.33))), 0.35), clamp(0.08 + fres * 0.6, 0.0, 0.85));
        // güneş parıltısı
        vec3 L = normalize(uSunDir); vec3 R = reflect(-L, n);
        float sp = pow(max(dot(R, V), 0.0), 220.0);
        float sp2 = pow(max(dot(R, V), 0.0), 60.0);
        col += uSunCol * (sp * 4.0 + sp2 * 0.1) * step(0.0, uSunDir.y + 0.03);
        // köpük
        float fo = smoothstep(1.2, 0.2, d + (vn(vUv * 3.0 + t * 0.6) - 0.5) * 1.6) * (0.55 + 0.45 * sin(t * 1.3 + d * 5.0));
        col = mix(col, vec3(0.92, 0.97, 1.0), clamp(fo, 0.0, 1.0) * 0.75);
        // gece koyulaşması + kar
        col *= mix(1.0, 0.2, uNight); col = mix(col, col * vec3(0.55, 0.7, 1.0), uNight);
        col = mix(col, vec3(0.75, 0.8, 0.86) * (0.6 + 0.4 * (1.0 - uNight)), uSnow * 0.0);
        gl_FragColor = vec4(col, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
        #include <fog_fragment>
      }`,
  });
  const geo = new THREE.PlaneGeometry(W, H, 1, 1); geo.rotateX(-Math.PI / 2); geo.translate(W / 2, -0.02, H / 2);
  const mesh = new THREE.Mesh(geo, mat); mesh.name = 'water'; mesh.receiveShadow = false; mesh.renderOrder = 0;
  return { mesh, mat };
}
