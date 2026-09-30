// Uzakta dalgalarla yalpalayan ışıklı vapur (Şehir Hatları tarzı). Yol: kıyıya paralel oval rota.
import * as THREE from 'three';
import { heightAt } from './waves.js';
import { makeGlow } from './util/textures.js';
import { mulberry32 } from './util/rng.js';
import { U } from './uniforms.js';

const LEN = 58, BEAM = 11.5;
const X1 = 150, X2 = -540, Z1 = 900, Z2 = -900, R = (X1 - X2) / 2;
const STRAIGHT = Z1 - Z2;
const PERIM = 2 * STRAIGHT + 2 * Math.PI * R;

// s (m) -> konum ve baş yönü (radyan; +x'ten +z'ye)
function pathAt(s) {
  s = ((s % PERIM) + PERIM) % PERIM;
  // Bacak 1: x=X1, kuzeye (z azalır)
  if (s < STRAIGHT) return { x: X1, z: Z1 - s, h: -Math.PI / 2 };
  s -= STRAIGHT;
  const arc = Math.PI * R;
  if (s < arc) { // kuzey uçta yarım daire, doğudan batıya
    const a = s / R; // 0..pi
    const cx = (X1 + X2) / 2, cz = Z2;
    return { x: cx + Math.cos(a) * R, z: cz - Math.sin(a) * R, h: -Math.PI / 2 - a };
  }
  s -= arc;
  if (s < STRAIGHT) return { x: X2, z: Z2 + s, h: Math.PI / 2 };
  s -= STRAIGHT;
  const a = s / R;
  const cx = (X1 + X2) / 2, cz = Z1;
  return { x: cx - Math.cos(a) * R, z: cz + Math.sin(a) * R, h: Math.PI / 2 - a };
}

function windowTexture(cols, rows, litProb, seed) {
  const rnd = mulberry32(seed);
  const cw = 20, ch = 26;
  const c = document.createElement('canvas');
  c.width = cols * cw; c.height = rows * ch;
  const g = c.getContext('2d');
  g.fillStyle = '#000'; g.fillRect(0, 0, c.width, c.height);
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
    if (rnd() > litProb) continue;
    const t = rnd();
    g.fillStyle = t < 0.8 ? '#ffd58a' : '#fff2cf';
    g.fillRect(i * cw + 4, j * ch + 5, cw - 8, ch - 12);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

export class Ship {
  constructor(scene) {
    this.s = Z1 - 100;    // başlangıç: (150, 100) - kuzeye giden bacakta; uzak planda kulenin arkasından geçer
    this.speed = 9.5;
    const g = new THREE.Group();
    this.root = g;
    const white = new THREE.MeshStandardMaterial({ color: 0xd9dde2, roughness: 0.7 });
    const hullDark = new THREE.MeshStandardMaterial({ color: 0x141a22, roughness: 0.65 });
    const red = new THREE.MeshStandardMaterial({ color: 0x8a1c17, roughness: 0.7 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x0f1216, roughness: 0.8 });

    // Gövde planı (baş +x)
    const sh = new THREE.Shape();
    sh.moveTo(LEN / 2, 0);
    sh.bezierCurveTo(LEN * 0.32, BEAM * 0.5, LEN * 0.05, BEAM * 0.5, -LEN * 0.36, BEAM * 0.5);
    sh.lineTo(-LEN * 0.5, BEAM * 0.38);
    sh.lineTo(-LEN * 0.5, -BEAM * 0.38);
    sh.lineTo(-LEN * 0.36, -BEAM * 0.5);
    sh.bezierCurveTo(LEN * 0.05, -BEAM * 0.5, LEN * 0.32, -BEAM * 0.5, LEN / 2, 0);
    const hullGeo = new THREE.ExtrudeGeometry(sh, { depth: 4.2, bevelEnabled: false, curveSegments: 16 });
    hullGeo.rotateX(-Math.PI / 2); // extrude z -> y (yukarı)
    hullGeo.translate(0, -1.6, 0);
    { // pruvada yukarı kıvrım (sheer) ve hafif tumble-home
      const pa = hullGeo.attributes.position;
      for (let i = 0; i < pa.count; i++) {
        const bx = Math.max(0, pa.getX(i) / (LEN / 2));
        const sx = Math.max(0, -pa.getX(i) / (LEN / 2));
        pa.setY(i, pa.getY(i) + (pa.getY(i) > 0 ? 1.3 * bx * bx + 0.5 * sx * sx : 0.9 * bx * bx * bx));
      }
      hullGeo.computeVertexNormals();
    }
    const hull = new THREE.Mesh(hullGeo, [hullDark, hullDark]);
    g.add(hull);
    // beyaz güverte şeridi
    const stripe = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: 1.1, bevelEnabled: false, curveSegments: 16 }).rotateX(-Math.PI / 2).translate(0, 1.5, 0), red);
    stripe.scale.set(1.001, 1, 1.001);
    g.add(stripe);
    // dişli üst güverte
    const deck1 = new THREE.Mesh(new THREE.BoxGeometry(LEN * 0.66, 3.0, BEAM * 0.86), white);
    deck1.position.set(-LEN * 0.06, 4.1, 0);
    const winTex = windowTexture(28, 1, 0.92, 4);
    const winTex2 = windowTexture(22, 1, 0.9, 9);
    const emiMat = (tex, rx) => { const t = tex.clone(); t.repeat.set(rx, 1); t.needsUpdate = true; return new THREE.MeshStandardMaterial({ color: 0xcfd4da, roughness: 0.7, emissiveMap: t, emissive: new THREE.Color(2.2, 1.7, 1.0), emissiveIntensity: 1 }); };
    // pencere şeritleri: kenarlara ince kutular (emisif)
    const strip = (w, h, d, x, y, z, tex, rx) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), emiMat(tex, rx));
      m.position.set(x, y, z);
      return m;
    };
    g.add(deck1);
    for (const side of [-1, 1]) {
      const p = strip(LEN * 0.62, 1.5, 0, -LEN * 0.06, 4.35, side * (BEAM * 0.43 + 0.02), winTex, 1);
      if (side < 0) p.rotation.y = Math.PI;
      g.add(p);
    }
    const deck2 = new THREE.Mesh(new THREE.BoxGeometry(LEN * 0.5, 2.8, BEAM * 0.7), white);
    deck2.position.set(-LEN * 0.08, 6.9, 0); g.add(deck2);
    for (const side of [-1, 1]) {
      const p = strip(LEN * 0.46, 1.4, 0, -LEN * 0.08, 7.0, side * (BEAM * 0.35 + 0.02), winTex2, 1);
      if (side < 0) p.rotation.y = Math.PI;
      g.add(p);
    }
    // ön ve arka cephe pencereleri
    const front = strip(BEAM * 0.6, 1.4, 0, 0, 7.0, 0, winTex2, 0.3); front.rotation.y = Math.PI / 2; front.position.set(-LEN * 0.08 + LEN * 0.25 + 0.02, 7.0, 0); g.add(front);
    // köprü üstü
    const bridge = new THREE.Mesh(new THREE.BoxGeometry(LEN * 0.14, 2.6, BEAM * 0.55), white);
    bridge.position.set(LEN * 0.14, 9.3, 0); g.add(bridge);
    const bwin = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.0, BEAM * 0.5), new THREE.MeshBasicMaterial({ color: new THREE.Color(2.6, 2.0, 1.1) }));
    bwin.position.set(LEN * 0.14 + LEN * 0.07 + 0.02, 9.45, 0); g.add(bwin);
    // baca
    const funnel = new THREE.Mesh(new THREE.CylinderGeometry(1.7, 2.0, 7.5, 16), white);
    funnel.scale.z = 1.2;
    funnel.position.set(-LEN * 0.14, 11.2, 0); g.add(funnel);
    const fTop = new THREE.Mesh(new THREE.CylinderGeometry(1.72, 1.72, 2.0, 16), dark);
    fTop.scale.z = 1.2; fTop.position.set(-LEN * 0.14, 14.2, 0); g.add(fTop);
    const fBand = new THREE.Mesh(new THREE.CylinderGeometry(1.78, 1.78, 0.7, 16), red);
    fBand.scale.z = 1.2; fBand.position.set(-LEN * 0.14, 13.0, 0); g.add(fBand);
    // direk ve ışıklar
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.16, 8, 6), dark);
    mast.position.set(LEN * 0.14, 15.0, 0); g.add(mast);
    const lightMat = (c) => new THREE.MeshBasicMaterial({ color: c });
    const mk = (c, x, y, z, s = 0.28) => { const m = new THREE.Mesh(new THREE.SphereGeometry(s, 8, 6), lightMat(c)); m.position.set(x, y, z); g.add(m); return m; };
    mk(new THREE.Color(6, 6, 5.5), LEN * 0.14, 19.0, 0, 0.35);            // seyir ışığı (beyaz)
    mk(new THREE.Color(6, 0.3, 0.2), LEN * 0.22, 8.8, BEAM * 0.27);       // iskele (kırmızı) - bakış yönüne göre sol
    mk(new THREE.Color(0.3, 5, 0.6), LEN * 0.22, 8.8, -BEAM * 0.27);      // sancak (yeşil)
    mk(new THREE.Color(5, 4.5, 3.8), -LEN * 0.46, 6.0, 0, 0.3);           // kıç ışığı
    // güverte flood ışıkları
    for (let i = 0; i < 7; i++) mk(new THREE.Color(4, 3.2, 2.0), -LEN * 0.32 + i * 6.5, 5.9, i % 2 ? BEAM * 0.44 : -BEAM * 0.44, 0.18);
    // parıltı sprite'ları
    const glowTex = makeGlow(64);
    const sp = (color, size, x, y, z, op) => {
      const m = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: op }));
      m.scale.setScalar(size); m.position.set(x, y, z); g.add(m); return m;
    };
    sp(new THREE.Color(1.0, 0.95, 0.85), 16, LEN * 0.14, 19, 0, 0.9);
    sp(new THREE.Color(1.0, 0.75, 0.4), 60, -LEN * 0.06, 6.5, 0, 0.32);
    sp(new THREE.Color(1.0, 0.3, 0.2), 8, LEN * 0.22, 8.8, BEAM * 0.27, 0.8);
    sp(new THREE.Color(0.3, 1.0, 0.4), 8, LEN * 0.22, 8.8, -BEAM * 0.27, 0.8);

    // kıç izi (köpük şeridi)
    const wakeGeo = new THREE.PlaneGeometry(190, 15, 1, 1);
    wakeGeo.rotateX(-Math.PI / 2); wakeGeo.translate(-LEN * 0.5 - 95, 0, 0);
    this.wakeMat = new THREE.ShaderMaterial({
      uniforms: { ...U },
      vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }',
      fragmentShader: /* glsl */`
        uniform vec3 uHorizon, uAmbient; uniform float uFlash, uTime;
        varying vec2 vUv;
        float h(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
        float n(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f); return mix(mix(h(i),h(i+vec2(1,0)),f.x), mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x), f.y); }
        void main(){
          float along = 1.0 - vUv.x; // 0 = gemi, 1 = uzak
          float across = abs(vUv.y - 0.5) * 2.0;
          float spread = 0.25 + along * 0.75;
          float m = smoothstep(spread, spread * 0.3, across);
          float nz = n(vec2(along * 40.0 - uTime * 0.4, vUv.y * 14.0)) * 0.6 + n(vec2(along * 90.0, vUv.y * 30.0 - uTime)) * 0.4;
          float a = m * (1.0 - along) * smoothstep(0.25, 0.7, nz) * 0.55;
          vec3 c = vec3(0.5, 0.58, 0.65) * (0.05 + length(uAmbient) * 1.5) + uFlash * vec3(0.5, 0.6, 0.9);
          gl_FragColor = vec4(c, a);
        }`,
      transparent: true, depthWrite: false,
    });
    const wake = new THREE.Mesh(wakeGeo, this.wakeMat);
    wake.renderOrder = 2;
    this.wake = wake;
    g.add(wake);

    scene.add(g);
    this.lightPos = new THREE.Vector3();
    this.roll = 0; this.pitch = 0;
    g.traverse((o) => o.layers.enable(1));
  }

  update(dt, time) {
    this.s += this.speed * dt;
    const p = pathAt(this.s);
    const cs = Math.cos(p.h), sn = Math.sin(p.h);
    // dalga örnekleri (baş, kıç, iskele, sancak)
    const hb = heightAt(p.x + cs * LEN * 0.4, p.z + sn * LEN * 0.4, time);
    const hs = heightAt(p.x - cs * LEN * 0.4, p.z - sn * LEN * 0.4, time);
    const hp = heightAt(p.x - sn * BEAM * 0.5, p.z + cs * BEAM * 0.5, time);
    const hq = heightAt(p.x + sn * BEAM * 0.5, p.z - cs * BEAM * 0.5, time);
    const heave = (hb + hs + hp + hq) / 4;
    const pitchT = Math.atan2(hb - hs, LEN * 0.8);
    const rollT = Math.atan2(hp - hq, BEAM);
    const k = Math.min(1, dt * 2.5);
    this.pitch += (pitchT - this.pitch) * k;
    this.roll += (rollT * 1.5 - this.roll) * k;
    this.root.position.set(p.x, heave * 0.9 - 0.3, p.z);
    // yerel eksenler: x=baş; heading: -p.h etrafında (three'de Y rotasyonu -x->z yönüne ters)
    this.root.rotation.set(0, 0, 0);
    this.root.rotation.order = 'YZX';
    this.root.rotation.y = -p.h;
    this.root.rotation.z = this.pitch;   // bas-kıç eğim
    this.root.rotation.x = this.roll;    // yan yatma
    this.root.updateMatrixWorld();
    this.lightPos.set(0, 7, 0).applyMatrix4(this.root.matrixWorld);
    this.wake.position.y = 0.35 - (heave * 0.9 - 0.3) + heave * 0.4;
  }
}
