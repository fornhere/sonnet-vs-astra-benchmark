import * as THREE from 'three';
import { lathe, gearShape, extrude, strapGeometry } from './geo.js';
import * as TX from './textures.js';
import { FINISHES } from './finishes.js';
import { buildMovement } from './movement.js';

const DIAL_Y = 0.04;
const WIN = { x: 0, z: TX.DIAL.R * TX.DIAL.winY, r: TX.DIAL.R * TX.DIAL.winR };

export function buildWatch(renderer) {
  const aniso = renderer.capabilities.getMaxAnisotropy();
  const root = new THREE.Group();
  const face = new THREE.Group();
  face.rotation.x = Math.PI / 2; // düz koordinat: +Y kadran normali, -Z = 12 yönü, +X = 3 yönü
  root.add(face);

  /* ---------------- malzemeler ---------------- */
  const brushed = TX.brushedMaps(aniso);
  const f0 = FINISHES[0];
  const mCase = new THREE.MeshStandardMaterial({ color: f0.caseColor, metalness: 1, roughness: f0.caseRough, roughnessMap: brushed, bumpMap: brushed, bumpScale: 0.12 });
  const mPolish = new THREE.MeshStandardMaterial({ color: f0.polish, metalness: 1, roughness: 0.11 });
  const mAccent = new THREE.MeshStandardMaterial({ color: f0.accent, metalness: 0.35, roughness: 0.42 });
  const mLume = new THREE.MeshStandardMaterial({ color: f0.lume, emissive: f0.lume, emissiveIntensity: 0.45, roughness: 0.7 });
  const mHand = new THREE.MeshStandardMaterial({ color: '#eceff3', metalness: 1, roughness: 0.14 });
  const mGold = new THREE.MeshStandardMaterial({ color: '#e0b96c', metalness: 1, roughness: 0.16, envMapIntensity: 1.8 });
  const mBrass = new THREE.MeshStandardMaterial({ color: '#d0a45a', metalness: 1, roughness: 0.24, envMapIntensity: 1.8 });
  const mSteel = new THREE.MeshStandardMaterial({ color: '#eef1f4', metalness: 1, roughness: 0.16, envMapIntensity: 1.9 });
  const mBlued = new THREE.MeshStandardMaterial({ color: '#284aa8', metalness: 1, roughness: 0.28 });
  const mDark = new THREE.MeshStandardMaterial({ color: '#0a0a0c', metalness: 0.5, roughness: 0.5 });
  const mRuby = new THREE.MeshPhysicalMaterial({ color: '#c8102e', roughness: 0.08, metalness: 0, clearcoat: 1, emissive: '#5a0010', emissiveIntensity: 0.5 });
  const perl = TX.perlageTexture(aniso); perl.repeat.set(0.85, 0.85);
  const mPlate = new THREE.MeshStandardMaterial({ color: '#b4bac2', metalness: 0.95, roughness: 0.42, map: perl, bumpMap: perl, bumpScale: 0.5, envMapIntensity: 1.3 });
  const stripes = TX.stripeTexture(aniso, '#c6ccd4'); stripes.repeat.set(1.5, 1); stripes.center.set(0.5, 0.5); stripes.rotation = 0.62;
  const mBridge = new THREE.MeshStandardMaterial({ color: '#ffffff', metalness: 1, roughness: 0.26, map: stripes, envMapIntensity: 1.5 });
  const stripes2 = TX.stripeTexture(aniso, '#d8b676'); stripes2.repeat.set(1.5, 1); stripes2.center.set(0.5, 0.5); stripes2.rotation = -0.3;
  const mRotor = new THREE.MeshStandardMaterial({ color: '#ffffff', metalness: 1, roughness: 0.24, map: stripes2 });
  // Safir cam: kadranı karartmadan yalnızca yansımaları ekleyen toplamalı katman (gerçek cam gibi)
  const mGlass = new THREE.MeshPhysicalMaterial({
    color: '#000000', metalness: 0, roughness: 0.03, ior: 1.6, transparent: true, depthWrite: false,
    blending: THREE.CustomBlending, blendEquation: THREE.AddEquation, blendSrc: THREE.OneFactor, blendDst: THREE.OneFactor,
    blendSrcAlpha: THREE.ZeroFactor, blendDstAlpha: THREE.OneFactor,
    envMapIntensity: 1.15, iridescence: 0.22, iridescenceIOR: 1.3, iridescenceThicknessRange: [140, 380],
  });
  const mBackGlass = new THREE.MeshPhysicalMaterial({ color: '#ffffff', metalness: 0, roughness: 0.02, transparent: true, opacity: 0.16, envMapIntensity: 1.6, depthWrite: false });

  const uniforms = { uSheen: { value: 0.5 }, uAng: { value: 0.4 } };
  const mDial = new THREE.MeshPhysicalMaterial({ color: '#ffffff', metalness: 0.42, roughness: 0.46, clearcoat: 0.1, clearcoatRoughness: 0.35, alphaTest: 0.5 });
  mDial.onBeforeCompile = (sh) => {
    sh.uniforms.uSheen = uniforms.uSheen; sh.uniforms.uAng = uniforms.uAng;
    sh.fragmentShader = 'uniform float uSheen; uniform float uAng;\n' + sh.fragmentShader.replace(
      '#include <map_fragment>',
      `#include <map_fragment>
       vec2 dc = vMapUv - 0.5; float dAng = atan(dc.y, dc.x); float dr = length(dc) * 2.0;
       float lobe = pow(max(cos(dAng - uAng), 0.0), 6.0) + 0.6 * pow(max(cos(dAng - uAng - 3.14159), 0.0), 6.0);
       diffuseColor.rgb *= 1.0 + uSheen * lobe * smoothstep(0.04, 0.5, dr);`
    );
  };
  const mDisc = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.5, metalness: 0, emissive: '#ffffff', emissiveIntensity: 0.55 });
  const mBezelPlate = new THREE.MeshStandardMaterial({ color: '#ffffff', metalness: 0.5, roughness: 0.28 });
  const mStrap = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.62, metalness: 0, bumpScale: 0.5, transparent: true });

  /* ---------------- gruplar ---------------- */
  const G = {};
  for (const k of ['crystal', 'bezel', 'handH', 'handM', 'handS', 'dial', 'move', 'back', 'strap']) { G[k] = new THREE.Group(); face.add(G[k]); }
  const gCase = new THREE.Group(); face.add(gCase);
  G.case = gCase;
  const add = (grp, geo, mat, x = 0, y = 0, z = 0) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); grp.add(m); return m; };

  /* ---------------- kasa ---------------- */
  add(gCase, lathe([[[2.0, -0.27], [2.04, -0.2], [2.06, -0.05], [2.06, 0.1], [2.04, 0.19]]]), mCase);
  add(gCase, lathe([[[2.04, 0.19], [2.015, 0.235], [1.975, 0.262]], [[1.9, -0.335], [1.985, -0.3], [2.0, -0.27]]]), mPolish);
  add(gCase, lathe([[[1.975, 0.262], [1.8, 0.262], [1.79, 0.2], [1.79, -0.31], [1.9, -0.335]]]), mCase);

  // lugs
  {
    const pts = [[1.4, 0.23], [1.9, 0.255], [2.2, 0.17], [2.42, -0.03], [2.55, -0.2], [2.45, -0.29], [2.2, -0.285], [1.9, -0.3], [1.4, -0.3]];
    const sp = new THREE.SplineCurve(pts.map(([u, v]) => new THREE.Vector2(u, v)));
    const shape = new THREE.Shape(sp.getPoints(60));
    const lg = extrude(shape, 0.3, 0.035, 12);
    lg.translate(0, 0, -0.15); lg.rotateY(Math.PI / 2);
    const mk = (x, sz) => { const m = add(gCase, lg, mCase, x, 0, 0); m.scale.z = sz; return m; };
    mk(1.2, 1); mk(-1.2, 1); mk(1.2, -1); mk(-1.2, -1);
    for (const sz of [1, -1]) {
      const bar = add(gCase, new THREE.CylinderGeometry(0.05, 0.05, 2.5, 12).rotateZ(Math.PI / 2), mSteel, 0, -0.14, sz * 2.2);
    }
  }
  // taç + itmeler
  {
    const cg = extrude(gearShape(30, 0.27, 0.232), 0.3, 0.016, 8);
    cg.translate(0, 0, -0.15); cg.rotateY(Math.PI / 2);
    add(gCase, cg, mCase, 2.22, -0.02, 0);
    add(gCase, new THREE.CylinderGeometry(0.19, 0.19, 0.05, 40).rotateZ(-Math.PI / 2), mAccent, 2.4, -0.02, 0);
    add(gCase, new THREE.CylinderGeometry(0.1, 0.1, 0.4, 20).rotateZ(-Math.PI / 2), mSteel, 2.0, -0.02, 0);
    for (const s of [-1, 1]) {
      const a = 0.62 * s, d = new THREE.Vector3(Math.cos(a), 0, Math.sin(a));
      const p = add(gCase, new THREE.CylinderGeometry(0.085, 0.085, 0.24, 24), mSteel, d.x * 2.1, -0.02, d.z * 2.1);
      p.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d);
      const cap = add(gCase, new THREE.CylinderGeometry(0.1, 0.1, 0.04, 24), mPolish, d.x * 2.23, -0.02, d.z * 2.23);
      cap.quaternion.copy(p.quaternion);
    }
  }

  /* ---------------- bezel ---------------- */
  add(G.bezel, lathe([[[1.98, 0.262], [1.99, 0.3], [1.99, 0.395]]]), mCase);
  add(G.bezel, lathe([[[1.99, 0.395], [1.965, 0.435], [1.935, 0.442]], [[1.575, 0.442], [1.555, 0.42]]]), mPolish);
  add(G.bezel, lathe([[[1.555, 0.42], [1.555, 0.262]]]), mCase);
  const bezelPlate = add(G.bezel, new THREE.RingGeometry(1.575, 1.935, 160, 1).rotateX(-Math.PI / 2), mBezelPlate, 0, 0.4426, 0);
  add(G.bezel, new THREE.RingGeometry(1.555, 1.6, 160, 1).rotateX(Math.PI / 2), mDark, 0, 0.28, 0);

  /* ---------------- safir cam ---------------- */
  {
    const a = 1.56, h = 0.15, y0 = 0.49, Rs = (a * a + h * h) / (2 * h), th0 = Math.asin(a / Rs);
    const run = [[a, 0.3], [a, y0]];
    for (let i = 0; i <= 36; i++) { const th = th0 * (1 - i / 36); run.push([Rs * Math.sin(th), y0 + Rs * Math.cos(th) - Rs * Math.cos(th0)]); }
    add(G.crystal, lathe([run], 160), mGlass);
  }

  /* ---------------- kadran ---------------- */
  const dialMesh = add(G.dial, new THREE.CircleGeometry(TX.DIAL.R, 160).rotateX(-Math.PI / 2), mDial, 0, DIAL_Y, 0);
  add(G.dial, new THREE.CylinderGeometry(TX.DIAL.R, TX.DIAL.R, 0.04, 96, 1, true), mDark, 0, DIAL_Y - 0.02, 0);
  // gün-gece penceresi
  add(G.dial, new THREE.TorusGeometry(WIN.r + 0.012, 0.02, 12, 96).rotateX(-Math.PI / 2), mPolish, WIN.x, DIAL_Y + 0.008, WIN.z);
  const discPivot = new THREE.Group(); discPivot.position.set(WIN.x, DIAL_Y - 0.012, WIN.z); G.dial.add(discPivot);
  const disc = add(discPivot, new THREE.CircleGeometry(WIN.r + 0.03, 96).rotateX(-Math.PI / 2), mDisc);
  // indeksler
  for (let h = 1; h <= 12; h++) {
    if (h === 6) continue;
    const a = (h / 12) * Math.PI * 2;
    const dir = new THREE.Vector3(Math.sin(a), 0, -Math.cos(a));
    const perp = new THREE.Vector3(Math.cos(a), 0, Math.sin(a));
    const len = h % 3 === 0 ? 0.34 : 0.26;
    const rad = 1.3;
    const offs = h === 12 ? [-0.075, 0.075] : [0];
    for (const o of offs) {
      const p = dir.clone().multiplyScalar(rad).addScaledVector(perp, o);
      const bar = add(G.dial, new THREE.BoxGeometry(0.08, 0.06, len), mHand, p.x, DIAL_Y + 0.03, p.z);
      bar.rotation.y = -a;
      const lu = add(G.dial, new THREE.BoxGeometry(0.044, 0.012, len * 0.72), mLume, p.x, DIAL_Y + 0.06, p.z);
      lu.rotation.y = -a;
    }
  }

  /* ---------------- ibreler ---------------- */
  function handGeo(half, depth, bevel = 0.006) {
    const pts = half.map(([x, y]) => new THREE.Vector2(x, y));
    const mirror = half.slice().reverse().map(([x, y]) => new THREE.Vector2(-x, y));
    const s = new THREE.Shape([...pts, ...mirror.slice(1)]);
    const g = extrude(s, depth, bevel, 6);
    g.rotateX(-Math.PI / 2);
    return g;
  }
  {
    const hh = handGeo([[0.0, -0.2], [0.075, -0.16], [0.095, 0.02], [0.08, 0.34], [0.0, 1.0]], 0.03);
    const hl = handGeo([[0.0, 0.12], [0.038, 0.16], [0.045, 0.34], [0.0, 0.8]], 0.012, 0.001);
    add(G.handH, hh, mHand, 0, DIAL_Y + 0.11, 0);
    add(G.handH, hl, mLume, 0, DIAL_Y + 0.145, 0);
    const mh = handGeo([[0.0, -0.22], [0.062, -0.18], [0.075, 0.02], [0.062, 0.5], [0.0, 1.44]], 0.028);
    const ml = handGeo([[0.0, 0.14], [0.03, 0.18], [0.036, 0.5], [0.0, 1.22]], 0.012, 0.001);
    add(G.handM, mh, mHand, 0, DIAL_Y + 0.15, 0);
    add(G.handM, ml, mLume, 0, DIAL_Y + 0.182, 0);
    const sh = handGeo([[0.0, -0.44], [0.011, -0.4], [0.011, 1.55], [0.0, 1.58]], 0.01, 0.002);
    add(G.handS, sh, mAccent, 0, DIAL_Y + 0.19, 0);
    add(G.handS, new THREE.CylinderGeometry(0.065, 0.065, 0.012, 32), mAccent, 0, DIAL_Y + 0.19, 0.3 * 0).position.z = 0.36;
    const cap = add(G.handS, new THREE.CylinderGeometry(0.075, 0.075, 0.09, 32), mPolish, 0, DIAL_Y + 0.2, 0);
    add(G.handS, new THREE.CylinderGeometry(0.03, 0.03, 0.12, 20), mAccent, 0, DIAL_Y + 0.235, 0);
  }

  /* ---------------- kasa arkası ---------------- */
  add(G.back, lathe([[[1.62, -0.55], [1.78, -0.55], [1.865, -0.5], [1.865, -0.42], [1.76, -0.4], [1.76, -0.34]]]), mCase);
  add(G.back, lathe([[[1.76, -0.34], [1.62, -0.34]], [[1.62, -0.34], [1.62, -0.55]]]), mCase);
  add(G.back, new THREE.CircleGeometry(1.66, 96).rotateX(Math.PI / 2), mBackGlass, 0, -0.53, 0);
  // kazıma yazı
  {
    const c = document.createElement('canvas'); c.width = c.height = 1024; const g = c.getContext('2d');
    g.clearRect(0, 0, 1024, 1024);
    g.fillStyle = '#fff'; g.textAlign = 'center';
    g.font = '500 30px Inter, sans-serif'; g.letterSpacing = '10px';
    g.save(); g.translate(512, 512);
    const txt = 'HALCYON · MERIDIAN · GRADE 5 TITANYUM · 100 M · NO. 0001/1000 · ';
    for (let i = 0; i < txt.length; i++) { const a = (i / txt.length) * Math.PI * 2; g.save(); g.rotate(a); g.translate(0, -470); g.fillText(txt[i], 0, 0); g.restore(); }
    g.restore();
    const t = TX.tex(c, { aniso });
    const ring = new THREE.Mesh(new THREE.CircleGeometry(1.86, 128).rotateX(Math.PI / 2), new THREE.MeshBasicMaterial({ map: t, transparent: true, opacity: 0.55, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 }));
    ring.position.y = -0.551; G.back.add(ring);
  }

  /* ---------------- mekanizma ---------------- */
  const mv = buildMovement({ plate: mPlate, brass: mBrass, brassPolished: mGold, steel: mSteel, bridge: mBridge, ruby: mRuby, blued: mBlued, dark: mDark, rotor: mRotor, gold: mGold });
  mv.group.rotation.x = Math.PI / 2;
  mv.group.rotation.y = 0;
  G.move.add(mv.group);
  G.move.position.y = -0.14;

  /* ---------------- kayış ---------------- */
  const strapPts = [[0, -0.9], [1.5, -0.86], [2.3, -0.45], [3.05, -1.25], [3.3, -2.5], [2.9, -3.95], [1.7, -5.05], [0, -5.35], [-1.7, -5.05], [-2.9, -3.95], [-3.3, -2.5], [-3.05, -1.25], [-2.3, -0.45], [-1.5, -0.86]];
  add(G.strap, strapGeometry(strapPts, 2.0, 0.34, 0.11), mStrap);
  // kayış tokası + keeper halkaları (kayışı sarar)
  {
    const mk = (zc, len, y0) => {
      const s = new THREE.Shape(); const w = 2.26, h = 0.66;
      s.moveTo(-w / 2, -h / 2); s.lineTo(w / 2, -h / 2); s.lineTo(w / 2, h / 2); s.lineTo(-w / 2, h / 2); s.closePath();
      const hole = new THREE.Path(); const iw = 2.04, ih = 0.38;
      hole.moveTo(-iw / 2, -ih / 2); hole.lineTo(-iw / 2, ih / 2); hole.lineTo(iw / 2, ih / 2); hole.lineTo(iw / 2, -ih / 2); hole.closePath(); s.holes.push(hole);
      const g = extrude(s, len, 0.03, 4); g.translate(0, 0, -len / 2);
      return add(G.strap, g, mCase, 0, y0, zc);
    };
    mk(-0.55, 0.42, -5.35); mk(0.5, 0.42, -5.35);
  }

  /* ---------------- anchors (etiketler) ---------------- */
  const anchors = {};
  const anchor = (key, parent, x, y, z) => { const o = new THREE.Object3D(); o.position.set(x, y, z); parent.add(o); anchors[key] = o; };
  anchor('crystal', G.crystal, 1.5, 0.5, 0.25);
  anchor('bezel', G.bezel, 1.97, 0.36, 0.2);
  anchor('hands', G.handM, 0.08, DIAL_Y + 0.22, 0);
  anchor('dial', G.dial, 1.74, DIAL_Y, 0.2);
  anchor('case', gCase, 2.06, 0.0, 0.5);
  anchor('move', G.move, 1.6, -0.15, 0.5);
  anchor('back', G.back, 1.86, -0.46, 0.2);

  /* ---------------- durum ---------------- */
  const OFF = { crystal: 3.2, bezel: 2.2, handH: 1.45, handM: 1.6, handS: 1.75, dial: 0.8, move: -1.05, back: -2.05 };
  const BASE = { move: -0.14 };
  const dayTex = { current: null };
  let dayInfo = { rise: 380, set: 1100 };
  let finish = 0;
  const targetCol = { case: new THREE.Color(f0.caseColor), polish: new THREE.Color(f0.polish), accent: new THREE.Color(f0.accent), lume: new THREE.Color(f0.lume) };
  const cache = {};
  function applyTextures(idx) {
    const f = FINISHES[idx];
    if (!cache[idx]) {
      const st = TX.strapTextures(f, aniso);
      cache[idx] = { dial: TX.dialTexture(f, aniso), bezel: TX.bezelTexture(f, aniso), strap: st };
    }
    const c = cache[idx];
    mDial.map = c.dial; mDial.needsUpdate = true;
    mBezelPlate.map = c.bezel; mBezelPlate.needsUpdate = true;
    mStrap.map = c.strap.map; mStrap.bumpMap = c.strap.bump; mStrap.needsUpdate = true;
  }
  function setFinish(idx) {
    finish = idx;
    const f = FINISHES[idx];
    targetCol.case.set(f.caseColor); targetCol.polish.set(f.polish); targetCol.accent.set(f.accent); targetCol.lume.set(f.lume);
    mCase.roughness = f.caseRough;
    applyTextures(idx);
  }
  function setDay(rise, set) {
    dayInfo = { rise, set };
    if (dayTex.current) dayTex.current.dispose();
    dayTex.current = TX.discTexture(rise, set, FINISHES[finish], aniso);
    mDisc.map = dayTex.current; mDisc.emissiveMap = dayTex.current; mDisc.needsUpdate = true;
  }
  applyTextures(0);
  setDay(dayInfo.rise, dayInfo.set);

  const tmp = new THREE.Color();
  function update(s, dt) {
    const k = 1 - Math.exp(-dt * 5);
    for (const [m, key] of [[mCase, 'case'], [mPolish, 'polish'], [mAccent, 'accent']]) { m.color.lerp(targetCol[key], k); }
    mLume.color.lerp(targetCol.lume, k); mLume.emissive.copy(mLume.color);

    // patlatma
    const e = s.explode;
    G.crystal.position.y = OFF.crystal * e;
    G.bezel.position.y = OFF.bezel * e;
    G.handH.position.y = OFF.handH * e;
    G.handM.position.y = OFF.handM * e;
    G.handS.position.y = OFF.handS * e;
    G.dial.position.y = OFF.dial * e;
    G.move.position.y = BASE.move + OFF.move * e;
    G.back.position.y = OFF.back * e;
    G.back.position.x = s.backSlide * 10;
    G.back.rotation.z = -s.backSlide * 0.4;

    // kayış
    const sv = s.strap;
    G.strap.visible = sv > 0.01;
    mStrap.opacity = sv;
    G.strap.position.y = -(1 - sv) * 2.2;

    // ibreler (dakika cinsinden saat)
    const c = s.clock;
    G.handH.rotation.y = -((c / 60) % 12) / 12 * Math.PI * 2;
    G.handM.rotation.y = -((c % 60) / 60) * Math.PI * 2;
    G.handS.rotation.y = -((c * 60) % 60) / 60 * Math.PI * 2;
    // gün-gece diski
    discPivot.rotation.y = ((((c % 1440) + 1440) % 1440) / 1440) * Math.PI * 2;

    uniforms.uAng.value = s.sheenAng;
    uniforms.uSheen.value = s.sheen;
    mv.update(s.gear, s.time, s.rotor);
  }

  return { root, face, G, anchors, update, setFinish, setDay, materials: { mGlass, mCase, mAccent, mDisc }, get finish() { return finish; } };
}
