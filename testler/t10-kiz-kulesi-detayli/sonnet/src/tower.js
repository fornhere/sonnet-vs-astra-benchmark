// Kız Kulesi: kayalık adacık, rıhtım (taş iskele), sur duvarı, ek yapı, ana kule,
// galeri, fener odası, kurşun kubbe, bayrak. Her şey prosedürel.
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { makeStone, makeRock, makeLead, makePaving, makeTiles, makeFlag } from './util/textures.js';
import { mulberry32, fbm2 } from './util/rng.js';
import { ISLET, ringShell, platformGeometry, rockJitter, localToWorld, footprintPoints } from './islet.js';
import { TOWER } from './config.js';

export const DIM = {
  platformY: TOWER.platformY,     // 4.2
  shaftBottom: 4.2, shaftTop: 15.6,
  rBottom: 4.55, rTop: 3.75,
  galleryY: 17.3,
  drumTop: 19.5,
  lanternBottom: 19.9, lanternTop: 22.5,
  domeBase: 22.85,
  topY: 31.6,
};
export const shaftRadius = (y) => THREE.MathUtils.lerp(DIM.rBottom, DIM.rTop, (y - DIM.shaftBottom) / (DIM.shaftTop - DIM.shaftBottom));

function stoneMat(tex, rx, ry, opts = {}) {
  const map = tex.map.clone(); map.repeat.set(rx, ry); map.needsUpdate = true;
  const bump = tex.bump.clone(); bump.repeat.set(rx, ry); bump.needsUpdate = true;
  return new THREE.MeshStandardMaterial({
    emissive: 0x05070a,
    map, bumpMap: bump, bumpScale: opts.bump ?? 2.2, roughness: opts.rough ?? 0.88, metalness: 0,
    color: opts.color ?? 0xffffff,
  });
}

function archShape(w, h) {
  const s = new THREE.Shape();
  const r = w / 2;
  s.moveTo(-r, 0); s.lineTo(r, 0); s.lineTo(r, h - r);
  s.absarc(0, h - r, r, 0, Math.PI, false);
  s.lineTo(-r, 0);
  return s;
}

function hipRoof(w, d, h, over = 0.35, ridgeInset = 0.28) {
  const W = w / 2 + over, D = d / 2 + over;
  const rl = Math.max(W - D * (1 + ridgeInset), 0.2);
  const rd = D * ridgeInset;
  const v = [
    [-W, 0, -D], [W, 0, -D], [W, 0, D], [-W, 0, D],
    [-rl, h, -rd], [rl, h, -rd], [rl, h, rd], [-rl, h, rd],
  ];
  const faces = [[0, 1, 5, 4], [1, 2, 6, 5], [2, 3, 7, 6], [3, 0, 4, 7], [4, 5, 6, 7]];
  const pos = [], uv = [];
  const push = (a, b, c) => {
    for (const i of [a, b, c]) { pos.push(...v[i]); uv.push(v[i][0] * 0.35, v[i][2] * 0.35 + v[i][1] * 0.35); }
  };
  for (const f of faces) { push(f[0], f[1], f[2]); push(f[0], f[2], f[3]); }
  // yüzlerin dışa baktığından emin olmak için ters çevir
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.computeVertexNormals();
  return g;
}

export function buildTower(renderCfg = {}) {
  const group = new THREE.Group();
  group.name = 'KizKulesi';
  const rnd = mulberry32(2024);

  // --- Malzemeler ---
  const stoneTex = makeStone(768, 7, { base: [204, 194, 172] });
  const wallTex = makeStone(768, 12, { base: [150, 142, 124], rows: 10 });
  const rockTex = makeRock(512, 21);
  rockTex.map.repeat.set(1, 1);

  const rockMat = new THREE.MeshStandardMaterial({ map: rockTex.map, bumpMap: rockTex.bump, bumpScale: 6.0, roughness: 0.42, metalness: 0.08, color: 0xdfe4ee, emissive: 0x0a0e14, side: THREE.DoubleSide });
  const wallMat = stoneMat(wallTex, 1, 1, { color: 0xe4e2dc, rough: 0.8 });
  const towerMat = stoneMat(stoneTex, 6, 3, { color: 0xffffff, bump: 2.0 });
  const towerMatUpper = stoneMat(stoneTex, 4.5, 0.6, { color: 0xfaf4e6 });
  const trimMat = stoneMat(stoneTex, 5, 0.5, { color: 0xe6dcc4 });
  const pavingTex = makePaving(384); pavingTex.repeat.set(1, 1);
  const pavingMat = new THREE.MeshStandardMaterial({ map: pavingTex, roughness: 0.5, metalness: 0.0, color: 0xb0b0b8 });
  const leadTex = makeLead(384);
  const leadMat = new THREE.MeshStandardMaterial({ map: leadTex, color: 0xa6b4c2, metalness: 0.8, roughness: 0.34, envMapIntensity: 1.0 });
  const tileTex = makeTiles(256); tileTex.wrapS = tileTex.wrapT = THREE.RepeatWrapping;
  const roofMat = new THREE.MeshStandardMaterial({ map: tileTex, roughness: 0.7, metalness: 0.0, color: 0xc9b8b0, side: THREE.DoubleSide });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x15120f, roughness: 0.9 });
  const ironMat = new THREE.MeshStandardMaterial({ color: 0x1c1f24, roughness: 0.45, metalness: 0.8 });
  const glowMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(1.0, 0.62, 0.26), fog: true });
  const glowMatCool = new THREE.MeshBasicMaterial({ color: new THREE.Color(1.0, 0.86, 0.6), fog: true });

  // --- Kayalık kütle ---
  const rockLevels = [];
  const ys = [-8, -5.5, -3.5, -2, -0.9, 0.0, 0.9, 1.7, 2.35];
  const rj = rockJitter(4, 1.0);
  ys.forEach((y, j) => {
    const scale = 1.0 + 0.042 * (2.35 - y);
    const amp = j === 0 ? 0.5 : 1.0;
    rockLevels.push({ y, scale, jitter: (k, i) => rj(k, i) * amp * (y > 1.2 ? 0.55 : 1.0), jy: (k) => (y > 1.2 ? (fbm2(k * 0.4, 9, 3, 5) - 0.5) * 0.5 : (fbm2(k * 0.5, y, 3, 5) - 0.5) * 1.4) });
  });
  const rockGeo = ringShell(rockLevels, 5, ISLET.N, { flip: true });
  const rock = new THREE.Mesh(rockGeo, rockMat);
  rock.name = 'rock';
  group.add(rock);

  // Kaya üst şelfi (duvarla kaya arasındaki çıkıntı) - halka şeklinde üst yüzey
  const shelfGeo = ringShell([
    { y: 2.33, scale: 1.0, jitter: (k, i) => rj(k, i) * 0.55, jy: (k) => (fbm2(k * 0.4, 9, 3, 5) - 0.5) * 0.5 },
    { y: 2.3, scale: 0.90 },
  ], 5, ISLET.N, { flip: false });
  group.add(new THREE.Mesh(shelfGeo, rockMat));

  // Kaya bloklar (kırıntı)
  const boulderGeos = [];
  const pts = footprintPoints(1.06, 40);
  for (let i = 0; i < 46; i++) {
    const p = pts[Math.floor(rnd() * pts.length)];
    const dx = p.x - ISLET.center.x, dz = p.y - ISLET.center.y;
    const dl = Math.hypot(dx, dz);
    const out = 0.6 + rnd() * 3.4;
    const s = 0.55 + rnd() * rnd() * 2.0;
    const g = new THREE.IcosahedronGeometry(1, 3);
    const pa = g.attributes.position;
    for (let v = 0; v < pa.count; v++) {
      const x = pa.getX(v), y = pa.getY(v), z = pa.getZ(v);
      const n = 0.62 + fbm2(x * 2.6 + i, y * 2.6 + z * 2.1, 4, i) * 0.85;
      pa.setXYZ(v, x * n * 1.25, y * n * 0.72, z * n);
    }
    g.computeVertexNormals();
    g.scale(s, s, s);
    g.rotateY(rnd() * 6.28);
    g.translate(p.x + (dx / dl) * out, -0.35 + (rnd() - 0.5) * 0.9 + (rnd() < 0.3 ? 0.6 : 0), p.y + (dz / dl) * out);
    boulderGeos.push(g);
  }
  const boulders = new THREE.Mesh(mergeGeometries(boulderGeos), rockMat);
  boulders.name = 'boulders';
  group.add(boulders);

  // --- Sur duvarı (rıhtım duvarı) ---
  const wallLevels = [
    { y: -2.5, scale: 0.975 },
    { y: 1.3, scale: 0.958 },
    { y: DIM.platformY, scale: 0.945 },
  ];
  const wallGeo = ringShell(wallLevels, 4.2, ISLET.N, { flip: true });
  const wall = new THREE.Mesh(wallGeo, wallMat);
  wall.name = 'wall';
  group.add(wall);
  // duvar üstü: hafif taşkın silme
  const cap = new THREE.Mesh(ringShell([
    { y: DIM.platformY - 0.05, scale: 0.955 },
    { y: DIM.platformY + 0.12, scale: 0.955 },
    { y: DIM.platformY + 0.14, scale: 0.925 },
  ], 4, ISLET.N, { flip: true }), trimMat);
  group.add(cap);
  // korkuluk (parapet)
  const parapet = new THREE.Mesh(ringShell([
    { y: DIM.platformY + 0.12, scale: 0.93 },
    { y: DIM.platformY + 1.05, scale: 0.93 },
    { y: DIM.platformY + 1.1, scale: 0.905 },
    { y: DIM.platformY + 0.12, scale: 0.905 },
  ], 3, ISLET.N, { flip: true }), wallMat);
  group.add(parapet);
  // teras zemini
  const platform = new THREE.Mesh(platformGeometry(0.925, DIM.platformY + 0.11, 2.6), pavingMat);
  group.add(platform);

  // --- Taş iskele / merdiven (kıç tarafı, Üsküdar yönü) ---
  const pier = new THREE.Group();
  const steps = 10;
  const stepGeos = [];
  const sternA = -ISLET.A * 0.8 * 0.94; // ~ -15.4
  for (let s = 0; s < steps; s++) {
    const top = DIM.platformY - 0.32 * s + 0.1;
    const a0 = sternA - s * 0.95;
    const height = top + 2.5;
    const g = new THREE.BoxGeometry(1.0, height, 3.6);
    g.translate(a0 - 0.45, top - height / 2, 0);
    stepGeos.push(g);
  }
  const stepMesh = new THREE.Mesh(mergeGeometries(stepGeos), stoneMat(wallTex, 1.2, 1.2, { color: 0xd8d6cf }));
  pier.add(stepMesh);
  // bağlama babaları ve direkler
  const bollardGeo = new THREE.CylinderGeometry(0.16, 0.2, 0.45, 10);
  for (const [a, l] of [[sternA - 7.7, 1.5], [sternA - 7.7, -1.5], [sternA - 4.5, 1.6], [sternA - 4.5, -1.6]]) {
    const b = new THREE.Mesh(bollardGeo, ironMat);
    const sIdx = Math.min(steps - 1, Math.round((sternA - a) / 0.95));
    b.position.set(a, DIM.platformY - 0.32 * sIdx + 0.1 + 0.22, l);
    pier.add(b);
  }
  // iskele lambası (yerel a ekseni boyunca)
  const lampY = DIM.platformY + 0.1;
  const lampPost = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 2.6, 8), ironMat);
  lampPost.position.set(sternA - 0.5, lampY + 1.3, 1.9);
  pier.add(lampPost);
  const lampGlow = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 8), glowMat);
  lampGlow.position.set(sternA - 0.5, lampY + 2.7, 1.9);
  pier.add(lampGlow);
  const lampPost2 = lampPost.clone(); lampPost2.position.z = -1.9; pier.add(lampPost2);
  const lampGlow2 = lampGlow.clone(); lampGlow2.position.z = -1.9; pier.add(lampGlow2);
  // yerel (a,l) -> dünya: a ekseni bow yönünde
  pier.position.set(ISLET.center.x, 0, ISLET.center.y);
  pier.rotation.y = -Math.atan2(ISLET.bow.y, ISLET.bow.x);
  group.add(pier);
  const pierLampLocal = [[sternA - 0.5, lampY + 2.7, 1.9], [sternA - 0.5, lampY + 2.7, -1.9]];

  // --- Ek yapı (salon), kule tabanına bitişik ---
  const annex = new THREE.Group();
  const annexW = 11.6, annexD = 5.4, annexH = 3.5;
  const annexBody = new THREE.Mesh(new THREE.BoxGeometry(annexW, annexH, annexD), stoneMat(stoneTex, 3, 1, { color: 0xe6dcc6 }));
  annexBody.position.y = DIM.platformY + 0.11 + annexH / 2;
  annex.add(annexBody);
  const roof = new THREE.Mesh(hipRoof(annexW, annexD, 1.9, 0.4), roofMat);
  roof.position.y = DIM.platformY + 0.11 + annexH;
  annex.add(roof);
  const annexWinsGeo = [];
  const winShape = archShape(0.75, 1.5);
  const winGeo = new THREE.ShapeGeometry(winShape, 8);
  const frameGeo = new THREE.ShapeGeometry(archShape(1.0, 1.75), 8);
  const y0 = DIM.platformY + 0.11 + 0.9;
  const annexWindows = [];
  for (const side of [-1, 1]) {
    for (let i = 0; i < 5; i++) {
      const x = -annexW / 2 + 1.5 + i * 2.15;
      const w = new THREE.Mesh(winGeo, i === 2 && side === 1 ? glowMatCool : glowMat);
      w.position.set(x, y0, side * (annexD / 2 + 0.03));
      if (side < 0) w.rotation.y = Math.PI;
      annex.add(w);
      const f = new THREE.Mesh(frameGeo, darkMat);
      f.position.set(x, y0 - 0.1, side * (annexD / 2 + 0.015));
      if (side < 0) f.rotation.y = Math.PI;
      annex.add(f);
    }
  }
  // kapı
  const door = new THREE.Mesh(new THREE.ShapeGeometry(archShape(1.3, 2.4), 8), glowMat);
  door.position.set(annexW / 2 + 0.03, DIM.platformY + 0.11, 0);
  door.rotation.y = Math.PI / 2;
  annex.add(door);
  const doorF = new THREE.Mesh(new THREE.ShapeGeometry(archShape(1.6, 2.7), 8), darkMat);
  doorF.position.set(annexW / 2 + 0.015, DIM.platformY + 0.11, 0); doorF.rotation.y = Math.PI / 2; annex.add(doorF);
  // bacalık
  const chimney = new THREE.Mesh(new THREE.BoxGeometry(0.8, 2.2, 0.8), stoneMat(stoneTex, 1, 1));
  chimney.position.set(-annexW * 0.25, DIM.platformY + annexH + 2.2, annexD * 0.12);
  annex.add(chimney);
  annex.position.set(...(() => { const p = localToWorld(4.8, 0); return [p.x, 0, p.y]; })());
  annex.rotation.y = -Math.atan2(ISLET.bow.y, ISLET.bow.x);
  group.add(annex);

  // --- Ana kule gövdesi ---
  const towerGroup = new THREE.Group();
  towerGroup.name = 'tower';
  group.add(towerGroup);

  // Gövde (hafif konik) + kaide
  const shaftPts = [];
  shaftPts.push(new THREE.Vector2(DIM.rBottom + 0.55, DIM.shaftBottom - 0.05));
  shaftPts.push(new THREE.Vector2(DIM.rBottom + 0.5, DIM.shaftBottom + 0.9));
  shaftPts.push(new THREE.Vector2(DIM.rBottom + 0.12, DIM.shaftBottom + 1.5));
  shaftPts.push(new THREE.Vector2(DIM.rBottom, DIM.shaftBottom + 1.6));
  shaftPts.push(new THREE.Vector2(DIM.rTop, DIM.shaftTop));
  const shaft = new THREE.Mesh(new THREE.LatheGeometry(shaftPts, 64), towerMat);
  towerGroup.add(shaft);

  // Silme kuşakları
  const bandY = [9.8, 13.1];
  for (const by of bandY) {
    const r = shaftRadius(by);
    const pts2 = [new THREE.Vector2(r - 0.05, by), new THREE.Vector2(r + 0.2, by + 0.08), new THREE.Vector2(r + 0.24, by + 0.32), new THREE.Vector2(r + 0.12, by + 0.44), new THREE.Vector2(r - 0.05, by + 0.5)];
    towerGroup.add(new THREE.Mesh(new THREE.LatheGeometry(pts2, 64), trimMat));
  }

  // Konsollu taşma (yukarıya doğru genişleyen) -> galeri zemini
  const flare = [];
  const fy0 = DIM.shaftTop;
  flare.push(new THREE.Vector2(DIM.rTop, fy0));
  flare.push(new THREE.Vector2(DIM.rTop + 0.15, fy0 + 0.35));
  flare.push(new THREE.Vector2(DIM.rTop + 0.12, fy0 + 0.55));
  flare.push(new THREE.Vector2(DIM.rTop + 0.5, fy0 + 0.75));
  flare.push(new THREE.Vector2(DIM.rTop + 0.9, fy0 + 1.05));
  flare.push(new THREE.Vector2(4.85, fy0 + 1.2));
  flare.push(new THREE.Vector2(4.9, DIM.galleryY));
  flare.push(new THREE.Vector2(4.75, DIM.galleryY + 0.02));
  towerGroup.add(new THREE.Mesh(new THREE.LatheGeometry(flare, 64), trimMat));
  // konsol tuğlaları
  const corbelGeo = new THREE.BoxGeometry(0.42, 0.9, 0.8);
  const corbels = [];
  for (let i = 0; i < 36; i++) {
    const a = (i / 36) * Math.PI * 2;
    const g = corbelGeo.clone();
    g.translate(0, 0, 0);
    g.rotateY(-a + Math.PI / 2);
    g.translate(Math.cos(a) * (DIM.rTop + 0.55), fy0 + 0.7, Math.sin(a) * (DIM.rTop + 0.55));
    corbels.push(g);
  }
  towerGroup.add(new THREE.Mesh(mergeGeometries(corbels), trimMat));

  // Galeri zemini üst yüzü
  const floor = new THREE.Mesh(new THREE.CylinderGeometry(4.78, 4.78, 0.06, 64), pavingMat);
  floor.position.y = DIM.galleryY + 0.03;
  towerGroup.add(floor);

  // Korkuluk: küçük direkler + üst/alt tırabzan
  const balGeo = new THREE.CylinderGeometry(0.045, 0.06, 0.95, 6);
  const bals = [];
  for (let i = 0; i < 64; i++) {
    const a = (i / 64) * Math.PI * 2;
    const g = balGeo.clone();
    g.translate(Math.cos(a) * 4.7, DIM.galleryY + 0.5, Math.sin(a) * 4.7);
    bals.push(g);
  }
  towerGroup.add(new THREE.Mesh(mergeGeometries(bals), ironMat));
  const rail = new THREE.Mesh(new THREE.TorusGeometry(4.7, 0.06, 6, 96), ironMat);
  rail.rotation.x = Math.PI / 2; rail.position.y = DIM.galleryY + 1.0;
  towerGroup.add(rail);
  const rail2 = rail.clone(); rail2.position.y = DIM.galleryY + 0.15; rail2.scale.setScalar(1.0); towerGroup.add(rail2);

  // Üst gövde (dram)
  const drumPts = [
    new THREE.Vector2(3.1, DIM.galleryY),
    new THREE.Vector2(3.0, DIM.galleryY + 0.3),
    new THREE.Vector2(3.0, DIM.drumTop - 0.3),
    new THREE.Vector2(3.35, DIM.drumTop - 0.15),
    new THREE.Vector2(3.4, DIM.drumTop),
    new THREE.Vector2(3.1, DIM.drumTop + 0.05),
    new THREE.Vector2(2.75, DIM.drumTop + 0.06),
  ];
  const drum = new THREE.Mesh(new THREE.LatheGeometry(drumPts, 48), towerMatUpper);
  towerGroup.add(drum);

  // Fener odası (cam)
  const lanternGroup = new THREE.Group();
  lanternGroup.name = 'lantern';
  towerGroup.add(lanternGroup);
  const glassMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(1.0, 0.86, 0.55), transparent: true, opacity: 0.11, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending });
  const glass = new THREE.Mesh(new THREE.CylinderGeometry(2.62, 2.62, DIM.lanternTop - DIM.lanternBottom, 32, 1, true), glassMat);
  glass.position.y = (DIM.lanternTop + DIM.lanternBottom) / 2;
  lanternGroup.add(glass);
  const mullionGeo = new THREE.BoxGeometry(0.11, DIM.lanternTop - DIM.lanternBottom, 0.11);
  const mulls = [];
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    const g = mullionGeo.clone();
    g.translate(Math.cos(a) * 2.64, (DIM.lanternTop + DIM.lanternBottom) / 2, Math.sin(a) * 2.64);
    mulls.push(g);
  }
  lanternGroup.add(new THREE.Mesh(mergeGeometries(mulls), ironMat));
  // pencere halkaları
  for (const y of [DIM.lanternBottom + 0.05, (DIM.lanternTop + DIM.lanternBottom) / 2, DIM.lanternTop - 0.05]) {
    const t = new THREE.Mesh(new THREE.TorusGeometry(2.64, 0.05, 6, 48), ironMat);
    t.rotation.x = Math.PI / 2; t.position.y = y; lanternGroup.add(t);
  }
  // Taban ve tavan
  const lFloor = new THREE.Mesh(new THREE.CylinderGeometry(2.7, 2.7, 0.15, 32), darkMat);
  lFloor.position.y = DIM.lanternBottom; lanternGroup.add(lFloor);
  // Fener merceği (dönen kısım)
  const lens = new THREE.Group();
  lens.position.y = (DIM.lanternTop + DIM.lanternBottom) / 2 - 0.2;
  const lensCore = new THREE.Mesh(new THREE.SphereGeometry(0.28, 16, 12), new THREE.MeshBasicMaterial({ color: new THREE.Color(3.6, 3.1, 2.3) }));
  lens.add(lensCore);
  const panelMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(2.6, 2.2, 1.6), side: THREE.DoubleSide });
  for (const s of [1, -1]) {
    const p = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.95, 1.3, 16, 1, true, -0.55, 1.1), panelMat);
    p.rotation.y = s > 0 ? 0 : Math.PI; // +z yönünü aç (rotasyon sonra beam ile senkron)
    lens.add(p);
  }
  const lensRing = new THREE.Mesh(new THREE.TorusGeometry(0.98, 0.04, 6, 32), ironMat);
  lensRing.rotation.x = Math.PI / 2; lensRing.position.y = 0.72; lens.add(lensRing);
  const lensRing2 = lensRing.clone(); lensRing2.position.y = -0.72; lens.add(lensRing2);
  // Fresnel merceğinin prizma halkaları
  for (let i = -3; i <= 3; i++) {
    const pr = new THREE.Mesh(new THREE.TorusGeometry(0.93 + 0.01 * Math.abs(i), 0.028, 5, 32), panelMat);
    pr.rotation.x = Math.PI / 2; pr.position.y = i * 0.2; lens.add(pr);
  }
  lanternGroup.add(lens);

  // Tavan silmesi + kurşun kubbe
  const capPts = [
    new THREE.Vector2(2.8, DIM.lanternTop),
    new THREE.Vector2(3.2, DIM.lanternTop + 0.06),
    new THREE.Vector2(3.28, DIM.lanternTop + 0.3),
    new THREE.Vector2(3.05, DIM.lanternTop + 0.36),
  ];
  towerGroup.add(new THREE.Mesh(new THREE.LatheGeometry(capPts, 48), trimMat));
  const dp = [];
  const d0 = DIM.domeBase;
  const prof = [[3.05, 0], [3.22, 0.28], [3.24, 0.75], [3.12, 1.35], [2.85, 2.0], [2.42, 2.65], [1.95, 3.25], [1.5, 3.95], [1.1, 4.7], [0.76, 5.45], [0.5, 6.15], [0.32, 6.85], [0.22, 7.45], [0.16, 7.9]];
  for (const [r, h] of prof) dp.push(new THREE.Vector2(r, d0 + h * 1.0));
  const dome = new THREE.Mesh(new THREE.LatheGeometry(dp, 96), leadMat);
  dome.name = 'dome';
  towerGroup.add(dome);
  // kubbe altı pervaz çember
  const dr = new THREE.Mesh(new THREE.TorusGeometry(3.05, 0.09, 6, 64), leadMat);
  dr.rotation.x = Math.PI / 2; dr.position.y = d0 + 0.06; towerGroup.add(dr);
  // alemi (finial)
  const finialTopY = d0 + 7.9;
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.07, 1.6, 8), ironMat);
  pole.position.y = finialTopY + 0.75; towerGroup.add(pole);
  const ball = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 12), new THREE.MeshStandardMaterial({ color: 0xc8a24a, metalness: 0.9, roughness: 0.3 }));
  ball.position.y = finialTopY + 0.1; towerGroup.add(ball);
  const tip = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), new THREE.MeshBasicMaterial({ color: new THREE.Color(3, 0.3, 0.2) }));
  tip.position.y = finialTopY + 1.58; towerGroup.add(tip); // uçak/seyir uyarı ışığı

  // --- Kule pencereleri ---
  const towerWins = [];
  const winRows = [
    { y: 6.6, n: 4, off: 0.4, w: 0.55, h: 1.0 },
    { y: 9.0, n: 5, off: 1.1, w: 0.62, h: 1.25 },
    { y: 11.6, n: 5, off: 0.2, w: 0.62, h: 1.25 },
    { y: 14.0, n: 6, off: 0.7, w: 0.58, h: 1.15 },
  ];
  const wg = new Map();
  for (const row of winRows) {
    for (let i = 0; i < row.n; i++) {
      const th = row.off + (i / row.n) * Math.PI * 2;
      const r = shaftRadius(row.y) + 0.03;
      const key = row.w + ':' + row.h;
      if (!wg.has(key)) wg.set(key, [new THREE.ShapeGeometry(archShape(row.w, row.h), 8), new THREE.ShapeGeometry(archShape(row.w + 0.3, row.h + 0.3), 8)]);
      const [gw, gf] = wg.get(key);
      const lit = ((i * 7 + row.y * 3) | 0) % 3 !== 0;
      const f = new THREE.Mesh(gf, darkMat);
      f.position.set(Math.cos(th) * (r - 0.012), row.y - 0.14, Math.sin(th) * (r - 0.012));
      f.rotation.y = Math.PI / 2 - th;
      towerGroup.add(f);
      const m = new THREE.Mesh(gw, lit ? glowMat : darkMat);
      m.position.set(Math.cos(th) * r, row.y, Math.sin(th) * r);
      m.rotation.y = Math.PI / 2 - th;
      towerGroup.add(m);
    }
  }
  // Üst gövde küçük pencereleri
  for (let i = 0; i < 8; i++) {
    const th = 0.2 + (i / 8) * Math.PI * 2;
    const m = new THREE.Mesh(new THREE.ShapeGeometry(archShape(0.5, 0.95), 6), glowMatCool);
    m.position.set(Math.cos(th) * 3.03, DIM.galleryY + 0.5, Math.sin(th) * 3.03);
    m.rotation.y = Math.PI / 2 - th;
    towerGroup.add(m);
  }
  // Kule kapısı (iskele yönüne bakar: -45°)
  {
    const th = -Math.PI / 4;
    const r = shaftRadius(DIM.platformY + 1.6) + 0.03;
    const dm = new THREE.Mesh(new THREE.ShapeGeometry(archShape(1.5, 2.6), 8), darkMat);
    dm.position.set(Math.cos(th) * r, DIM.platformY + 0.11, Math.sin(th) * r);
    dm.rotation.y = Math.PI / 2 - th; towerGroup.add(dm);
  }

  // --- Bayrak direği (kıç terasında) ---
  const flagGroup = new THREE.Group();
  {
    const p = localToWorld(-10.5, -4.2);
    flagGroup.position.set(p.x, DIM.platformY + 0.11, p.y);
    const poleG = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.08, 9.5, 8), ironMat);
    poleG.position.y = 4.75; flagGroup.add(poleG);
    const knob = new THREE.Mesh(new THREE.SphereGeometry(0.11, 8, 6), new THREE.MeshStandardMaterial({ color: 0xc8a24a, metalness: 1, roughness: 0.3 }));
    knob.position.y = 9.55; flagGroup.add(knob);
  }
  const flagGeo = new THREE.PlaneGeometry(2.4, 1.6, 26, 12);
  const flagBase = flagGeo.attributes.position.array.slice();
  const flagMat = new THREE.MeshStandardMaterial({ map: makeFlag(), side: THREE.DoubleSide, roughness: 0.8, emissive: 0x220202, emissiveIntensity: 0.4 });
  const flag = new THREE.Mesh(flagGeo, flagMat);
  flag.position.set(1.2, 8.5, 0);
  flagGroup.add(flag);
  group.add(flagGroup);

  // --- Işıklar (sıcak nokta ışıklar) ---
  const warm = new THREE.Color(1.0, 0.62, 0.3);
  const lights = [];
  const pierBase = new THREE.Object3D(); pierBase.position.copy(pier.position); pierBase.rotation.copy(pier.rotation);
  pierBase.updateMatrixWorld(true);
  for (const lp of pierLampLocal) {
    const v = new THREE.Vector3(...lp).applyMatrix4(pierBase.matrixWorld);
    const L = new THREE.PointLight(warm, 40, 32, 1.6); L.position.copy(v); group.add(L); lights.push(L);
  }
  const towerLightWorld = new THREE.PointLight(new THREE.Color(1.0, 0.7, 0.4), 26, 26, 1.7);
  towerLightWorld.position.set(6.2, DIM.platformY + 3, -1.5); group.add(towerLightWorld); lights.push(towerLightWorld);
  const lanternFill = new THREE.PointLight(new THREE.Color(1.0, 0.82, 0.55), 30, 22, 1.6);
  lanternFill.position.set(0, (DIM.lanternTop + DIM.lanternBottom) / 2, 0); group.add(lanternFill); lights.push(lanternFill);

  // Emissive pencere titremesi için materyaller
  const glowMats = [glowMat, glowMatCool];

  const api = {
    group, lens, lights, glowMats, leadMat, rock, dome,
    lanternPos: new THREE.Vector3(0, (DIM.lanternTop + DIM.lanternBottom) / 2 - 0.2, 0),
    lampWorld: pierLampLocal.map((lp) => new THREE.Vector3(...lp).applyMatrix4(pierBase.matrixWorld)),
    update(t, wind, storm) {
      // bayrak dalgalanması (rüzgâr yönü: +x,-z -> flama yönü)
      const pa = flagGeo.attributes.position;
      const sp = 1.6 + wind * 0.28;
      const amp = 0.14 + Math.min(wind, 24) * 0.014;
      for (let i = 0; i < pa.count; i++) {
        const x = flagBase[i * 3], y = flagBase[i * 3 + 1];
        const u = (x + 1.2) / 2.4; // direkten uzaklık
        const w = Math.sin(u * 7.0 - t * sp * 3.2 + y * 1.2) * amp * u * 1.4 + Math.sin(u * 13 - t * sp * 5.1) * amp * 0.35 * u;
        pa.setXYZ(i, x * (1 - 0.07 * u * storm), y + Math.sin(u * 4 - t * sp * 2.0) * 0.06 * u, w);
      }
      pa.needsUpdate = true;
      flagGeo.computeVertexNormals();
      flagGroup.rotation.y = Math.PI / 4; // flama rüzgâr yönüne (+x,-z) uzanır
    },
    flicker(t) {
      const k = 0.92 + 0.08 * Math.sin(t * 9.3) * Math.sin(t * 3.1 + 1.3) + 0.03 * Math.sin(t * 23.0);
      glowMat.color.setRGB(1.0 * k * 1.4, 0.62 * k * 1.4, 0.26 * k * 1.4);
      glowMatCool.color.setRGB(1.0 * k * 1.5, 0.86 * k * 1.5, 0.6 * k * 1.5);
    },
  };
  return api;
}
