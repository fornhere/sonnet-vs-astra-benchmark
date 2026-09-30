// Fener: dönen çift hüzme (hacimsel koni), fener odasındaki parıltı, spot ışıklar.
import * as THREE from 'three';
import { U } from './uniforms.js';
import { COMMON_UNIFORMS, NOISE } from './shaders/chunks.js';
import { BEAM_PERIOD } from './config.js';
import { makeGlow } from './util/textures.js';

const BEAM_LEN = 1500;
const TILT = -0.021; // hafif aşağı eğim: hüzme uzakta denize değer

const VERT = /* glsl */`
uniform float uLen;
uniform float uHalf;
varying vec3 vWorld;
varying vec3 vNormalW;
varying float vS;
void main(){
  // konik: apex z=0, uzunluk z=uLen
  float s = position.z * uLen;
  float r = 0.6 + s * uHalf;
  vec3 local = vec3(position.x * r, position.y * r, s);
  vec4 w = modelMatrix * vec4(local, 1.0);
  vWorld = w.xyz;
  vS = s;
  vec3 nl = normalize(vec3(position.x, position.y, -uHalf));
  vNormalW = normalize(mat3(modelMatrix) * nl);
  gl_Position = projectionMatrix * viewMatrix * w;
}
`;
const FRAG = /* glsl */`
${COMMON_UNIFORMS}
${NOISE}
uniform float uIntensity;
uniform float uSign;
uniform vec3 uAxis;
varying vec3 vWorld;
varying vec3 vNormalW;
varying float vS;
void main(){
  vec3 V = normalize(uCamPos - vWorld);
  float ndv = abs(dot(normalize(vNormalW), V));
  float dist = length(uCamPos - vWorld);
  // yol uzunluğu ~ ndv; kenarlar yumuşak
  float body = pow(ndv, 2.0);
  float along = smoothstep(3.0, 45.0, vS) * (1.0 / (1.0 + vS * 0.0042)) * exp(-vS * uBeamAtten);
  // yağmur/sis içindeki parçacık dokusu
  float grain = 0.7 + 0.3 * vnoise(vec2(vS * 0.045 - uTime * 2.4, atan(vNormalW.x, vNormalW.z) * 9.0 + vS * 0.01));
  float streak = 0.75 + 0.25 * vnoise(vec2(vWorld.x * 0.4 + vWorld.z * 0.31 + uTime * 11.0, vWorld.y * 0.05 + uTime * 30.0));
  float density = 0.16 + 0.7 * uStorm;
  along *= 1.0 - smoothstep(0.55, 1.0, vS / 1500.0);
  // kameraya çok yaklaşınca sönsün (yüzeyde patlamasın)
  float near = smoothstep(2.0, 16.0, dist) * smoothstep(-1.0, 7.0, vWorld.y);
  float axisAlign = abs(dot(uAxis, V));
  along *= 1.0 - 0.9 * smoothstep(0.80, 0.985, axisAlign);
  float a = body * along * grain * streak * density * uIntensity * near * uBeamAmt;
  vec3 col = vec3(1.0, 0.9, 0.7) * a;
  // sis rengiyle karıştır (uzak hüzme soluklaşır)
  col = mix(col, col * 0.7 + uFogColor * a * 0.6, 0.25);
  gl_FragColor = vec4(col, 1.0);
}
`;

export class Lighthouse {
  constructor(scene, tower) {
    this.tower = tower;
    this.angle = 0;
    this.group = new THREE.Group();
    this.group.position.copy(tower.lanternPos);
    scene.add(this.group);

    const geo = new THREE.CylinderGeometry(1, 1, 1, 40, 28, true);
    // Cylinder: y ekseni boyunca -> z eksenine yatır, apex yerine s=0..1
    geo.rotateX(Math.PI / 2);   // y -> z
    geo.translate(0, 0, 0.5);   // z: 0..1
    this.beams = [];
    for (const [k, sign, intensity] of [[0, 1, 1.0], [1, -1, 0.55]]) {
      const mat = new THREE.ShaderMaterial({
        uniforms: { ...U, uLen: { value: BEAM_LEN }, uHalf: { value: 0.05 }, uIntensity: { value: intensity }, uSign: { value: sign }, uAxis: { value: new THREE.Vector3(1, 0, 0) } },
        vertexShader: VERT, fragmentShader: FRAG,
        transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide,
      });
      const m = new THREE.Mesh(geo, mat);
      m.renderOrder = 5;
      m.frustumCulled = false;
      this.group.add(m);
      this.beams.push(m);
    }

    // Fener odası parıltısı
    const glowTex = makeGlow(128);
    this.glowMat = new THREE.SpriteMaterial({ map: glowTex, color: new THREE.Color(1.0, 0.85, 0.55), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 1 });
    this.glow = new THREE.Sprite(this.glowMat);
    this.glow.scale.setScalar(14);
    this.glow.renderOrder = 7;
    this.group.add(this.glow);
    this.glowMat2 = new THREE.SpriteMaterial({ map: glowTex, color: new THREE.Color(1.0, 0.9, 0.7), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.4 });
    this.glow2 = new THREE.Sprite(this.glowMat2);
    this.glow2.scale.setScalar(120);
    this.glow2.renderOrder = 7;
    this.group.add(this.glow2);

    // Işınların düştüğü yüzeyleri aydınlatan spotlar
    this.spots = [];
    for (const I of [110, 60]) {
      const sp = new THREE.SpotLight(0xffe2b0, I, 420, 0.085, 0.7, 1.4);
      sp.position.copy(tower.lanternPos);
      const tg = new THREE.Object3D();
      scene.add(tg);
      sp.target = tg;
      scene.add(sp);
      this.spots.push(sp);
    }
    this.dirs = [new THREE.Vector3(), new THREE.Vector3()];
    this._z = new THREE.Vector3(0, 0, 1); this._tc = new THREE.Vector3();
  }

  update(dt, time, camera, state) {
    // dönüş: BEAM_PERIOD sn'de bir tur (60 sn içinde tam sayıda tur -> kusursuz döngü ritmi)
    this.angle = (time / BEAM_PERIOD) * Math.PI * 2;
    const c = Math.cos(this.angle), s = Math.sin(this.angle);
    const d1 = this.dirs[0].set(c, TILT, s).normalize();
    const d2 = this.dirs[1].set(-c, TILT, -s).normalize();
    U.uBeamDir1.value.copy(d1);
    U.uBeamDir2.value.copy(d2);
    U.uLanternPos.value.copy(this.tower.lanternPos);
    // sabah ışığında fener söner
    U.uBeamAmt.value = 1 - 0.85 * Math.max(0, state.daySmooth - 0.82) / 0.18;
    U.uBeamAtten.value = U.uFogDensity.value * 1.6 + 0.00012;

    // koniler
    for (let i = 0; i < 2; i++) {
      const d = this.dirs[i];
      const m = this.beams[i];
      m.quaternion.setFromUnitVectors(this._z, d); // koninin +z ekseni hüzme yönüne
      m.material.uniforms.uHalf.value = U.uBeamHalf.value;
      m.material.uniforms.uAxis.value.copy(d);
    }
    // spotlar
    for (let i = 0; i < 2; i++) {
      const sp = this.spots[i];
      sp.target.position.copy(this.tower.lanternPos).addScaledVector(this.dirs[i], 60);
      sp.intensity = (i === 0 ? 110 : 60) * U.uBeamAmt.value;
    }
    this.tower.lens.rotation.y = -this.angle + Math.PI / 2; // panel +z yönüne bakar (benzetim)

    // kameraya doğru gelen hüzme: parıltı sabit değil, hüzme yönüne göre şişer
    const toCam = this._tc.copy(camera.position).sub(this.tower.lanternPos);
    const dc = toCam.length();
    toCam.divideScalar(dc);
    const align = Math.max(0, Math.max(d1.dot(toCam), 0.55 * d2.dot(toCam)));
    const f = 0.55 + 3.6 * Math.pow(align, 6.0);
    const fog = Math.exp(-Math.pow(dc * U.uFogDensity.value, 1.5));
    const scaleGlow = Math.max(0.35, Math.min(1.4, dc / 45)); // yakında sprite boyutu büyümesin
    this.glowMat.opacity = Math.min(1.1, 0.35 * f * (0.5 + 0.5 * fog)) * U.uBeamAmt.value;
    this.glow.scale.setScalar(9 * scaleGlow + 7 * align);
    this.glowMat2.opacity = Math.min(0.6, 0.06 + 0.38 * Math.pow(align, 4.0)) * (0.4 + 0.6 * state.stormSmooth) * U.uBeamAmt.value;
    this.glow2.scale.setScalar(36 + 70 * align);
  }
}
