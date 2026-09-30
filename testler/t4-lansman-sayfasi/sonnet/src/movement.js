import * as THREE from 'three';
import { gearShape, capsuleShape, ringShape, extrude } from './geo.js';

/* Kalibre H-01: yerel XY düzleminde kurulur, +Z kameraya (kasa arkasına) doğru derinlik.
   Dişli dönüşleri gerçek çark oranlarıyla birbirine kilitlidir. */
export function buildMovement(m) {
  const g = new THREE.Group();
  const add = (geo, mat, z = 0, x = 0, y = 0) => {
    const me = new THREE.Mesh(geo, mat);
    me.position.set(x, y, z);
    g.add(me);
    return me;
  };
  const MOD = 0.015; // pitch yarıçapı = N * MOD

  // ana plaka
  const plateG = new THREE.CylinderGeometry(1.72, 1.72, 0.08, 96).rotateX(Math.PI / 2);
  plateG.translate(0, 0, -0.04);
  // silindirin UV'si perlage için düzlemsel olmalı → kapak UV'lerini xy'ye çevir
  const uv = plateG.attributes.uv, pos = plateG.attributes.position;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, pos.getX(i) * 0.5, pos.getY(i) * 0.5);
  add(plateG, m.plate);

  // dişli zinciri
  const chain = [
    { N: 41, spokes: 5, x: -0.6, y: 0.3, from: null },
    { N: 30, spokes: 4, ang: -10 },
    { N: 24, spokes: 3, ang: -60 },
    { N: 18, spokes: 0, ang: -150 },
    { N: 14, spokes: 0, ang: -172 },
  ];
  const zGear = 0.03;
  const gears = [];
  chain.forEach((c, i) => {
    const rP = c.N * MOD;
    if (i > 0) {
      const p = gears[i - 1];
      const a = (c.ang * Math.PI) / 180;
      c.theta = a;
      c.x = p.x + Math.cos(a) * (p.rP + rP);
      c.y = p.y + Math.sin(a) * (p.rP + rP);
    }
    const rOut = rP + 0.014, rRoot = rP - 0.045;
    const shape = gearShape(c.N, rOut, rRoot, c.spokes ? { spokes: c.spokes, rHub: 0.11 + i * 0.01, rRim: rRoot - 0.055, gap: 0.16 } : { bore: 0.05 });
    const mesh = add(extrude(shape, 0.055, 0.008), i === 0 ? m.brass : i % 2 ? m.steel : m.brass, zGear, c.x, c.y);
    // pim
    const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.2, 16).rotateX(Math.PI / 2), m.steel);
    pin.position.set(c.x, c.y, 0.1); g.add(pin);
    gears.push({ N: c.N, x: c.x, y: c.y, rP, mesh, theta: c.theta });
  });

  // mainspring varil kapağı
  {
    const b = gears[0];
    const cover = add(extrude(ringShape(0.47, 0.16), 0.02, 0.006), m.brassPolished, zGear + 0.075, b.x, b.y);
    cover.userData.follow = 0;
    for (const r of [0.3, 0.38]) {
      const t = new THREE.Mesh(new THREE.TorusGeometry(r, 0.008, 6, 64), m.steel);
      t.position.set(b.x, b.y, zGear + 0.1); g.add(t);
    }
    gears[0].cover = cover;
  }

  // ratchet (kurma) çarkı — varil ile ilişkisiz süs, ikinci bir dişli
  {
    const N = 24, rP = N * MOD, a = (78 * Math.PI) / 180;
    const x = gears[0].x + Math.cos(a) * (gears[0].rP + rP), y = gears[0].y + Math.sin(a) * (gears[0].rP + rP);
    const rOut = rP + 0.014, rRoot = rP - 0.045;
    const mesh = add(extrude(gearShape(N, rOut, rRoot, { spokes: 5, rHub: 0.09, rRim: rRoot - 0.05, gap: 0.2 }), 0.05, 0.008), m.steel, zGear + 0.02, x, y);
    gears.push({ N, x, y, rP, mesh, theta: a, ratchet: true });
  }

  // köprüler
  const zB = 0.14;
  const bridge = (shape, dz = 0) => add(extrude(shape, 0.06, 0.012), m.bridge, zB + dz);
  const B = gears[0], C = gears[1], T = gears[2], F = gears[3], E = gears[4];
  // varil köprüsü: 3 kollu
  for (const deg of [55, 185, 300]) {
    const a = (deg * Math.PI) / 180;
    bridge(capsuleShape(B.x, B.y, B.x + Math.cos(a) * 0.62, B.y + Math.sin(a) * 0.62, 0.26));
  }
  bridge(capsuleShape(B.x, B.y, B.x, B.y, 0.4));
  // tren köprüsü: C → T → F
  bridge(capsuleShape(C.x, C.y, T.x, T.y, 0.3));
  bridge(capsuleShape(T.x, T.y, F.x, F.y, 0.28));
  bridge(capsuleShape(F.x, F.y, E.x, E.y, 0.24));
  bridge(capsuleShape(C.x, C.y, C.x, C.y, 0.36));
  // denge köprüsü
  const Bc = { x: -0.86, y: -0.62 };
  bridge(capsuleShape(Bc.x, Bc.y, -1.27, -0.05, 0.2));
  bridge(capsuleShape(Bc.x, Bc.y, Bc.x, Bc.y, 0.3));
  bridge(capsuleShape(Bc.x, Bc.y, Bc.x + 0.5, Bc.y - 0.45, 0.2));

  // taşlar (rubi) + vidalar
  const jewel = (x, y, z, s = 1) => {
    const ch = new THREE.Mesh(new THREE.CylinderGeometry(0.085 * s, 0.085 * s, 0.03, 32).rotateX(Math.PI / 2), m.brassPolished);
    ch.position.set(x, y, z + 0.015); g.add(ch);
    const ru = new THREE.Mesh(new THREE.SphereGeometry(0.052 * s, 24, 12), m.ruby);
    ru.scale.z = 0.55; ru.position.set(x, y, z + 0.03); g.add(ru);
  };
  const zTop = zB + 0.06 + 0.012;
  [B, C, T, F, E].forEach((q) => jewel(q.x, q.y, zTop));
  jewel(Bc.x, Bc.y, zTop, 1.15);
  const screw = (x, y) => {
    const s = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.028, 24).rotateX(Math.PI / 2), m.blued);
    s.position.set(x, y, zTop + 0.012); g.add(s);
    const slot = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.014, 0.012), m.dark);
    slot.position.set(x, y, zTop + 0.028); slot.rotation.z = (x * 13 + y * 7) % 3; g.add(slot);
  };
  for (const deg of [55, 185, 300]) { const a = (deg * Math.PI) / 180; screw(B.x + Math.cos(a) * 0.62, B.y + Math.sin(a) * 0.62); }
  screw(-1.27, -0.05); screw(Bc.x + 0.5, Bc.y - 0.45); screw(T.x, T.y); screw(F.x + 0.05, F.y - 0.02);

  // palet çatalı
  const pivotX = (E.x + Bc.x) / 2 - 0.02, pivotY = (E.y + Bc.y) / 2 - 0.03;
  const fork = new THREE.Group(); fork.position.set(pivotX, pivotY, 0.05);
  {
    const s = new THREE.Shape();
    s.moveTo(-0.24, 0.06); s.lineTo(-0.03, 0.02); s.lineTo(0.2, 0.12); s.lineTo(0.22, 0.05); s.lineTo(0.04, -0.03); s.lineTo(-0.2, -0.09); s.lineTo(-0.27, -0.03); s.closePath();
    fork.add(new THREE.Mesh(extrude(s, 0.03, 0.006), m.steel));
    const st = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.02, 0.03), m.ruby); st.position.set(0.19, 0.09, 0.02); fork.add(st);
  }
  g.add(fork);

  // denge çarkı
  const balance = new THREE.Group(); balance.position.set(Bc.x, Bc.y, 0.075);
  {
    balance.add(new THREE.Mesh(new THREE.TorusGeometry(0.44, 0.03, 12, 72), m.brassPolished));
    for (let k = 0; k < 3; k++) {
      const arm = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.05, 0.03), m.brassPolished);
      arm.rotation.z = (k * Math.PI) / 3 + 0.3; balance.add(arm);
    }
    for (let k = 0; k < 12; k++) {
      const a = (k / 12) * Math.PI * 2;
      const s = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.09, 12).rotateX(Math.PI / 2), m.gold);
      s.position.set(Math.cos(a) * 0.44, Math.sin(a) * 0.44, 0); balance.add(s);
    }
    const pts = [];
    for (let i = 0; i <= 260; i++) { const a = i * 0.16, r = 0.05 + i * 0.00058; pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, -0.035)); }
    balance.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 400, 0.005, 5), m.blued));
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.09, 24).rotateX(Math.PI / 2), m.steel); balance.add(hub);
  }
  g.add(balance);

  // rotor (otomatik kurma ağırlığı) — kadraja en yakın katman
  const rotor = new THREE.Group();
  {
    const a0 = 0.15, a1 = Math.PI * 0.98;
    const shape = ringShape(1.3, 0.2, a0, a1);
    for (const [s0, s1, ri, ro] of [[0.28, 0.9, 0.5, 1.02], [1.0, 1.7, 0.5, 1.02], [1.8, 2.75, 0.5, 1.02]]) {
      const h = new THREE.Path(); h.absarc(0, 0, ro, s0 + 0.15, s1 + 0.15, false); h.absarc(0, 0, ri, s1 + 0.15, s0 + 0.15, true); h.closePath();
      shape.holes.push(h);
    }
    const body = new THREE.Mesh(extrude(shape, 0.07, 0.014), m.rotor); body.position.z = 0.235; rotor.add(body);
    const hubM = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.11, 40).rotateX(Math.PI / 2), m.brassPolished);
    hubM.position.z = 0.285; rotor.add(hubM);
    const ru = new THREE.Mesh(new THREE.SphereGeometry(0.06, 24, 12), m.ruby); ru.scale.z = 0.55; ru.position.z = 0.345; rotor.add(ru);
    // rotor kenarında ince halka çizgi
    const t = new THREE.Mesh(new THREE.TorusGeometry(1.14, 0.012, 6, 96, Math.PI * 0.74), m.steel);
    t.rotation.z = 0.3; t.position.z = 0.318; rotor.add(t);
  }
  g.add(rotor);
  // rotor merkez mili
  const spindle = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.3, 16).rotateX(Math.PI / 2), m.steel);
  spindle.position.z = 0.15; g.add(spindle);

  const wrap = (a) => a;
  function update(phi, time, rotorAngle) {
    // sürücü: varil
    gears[0].phi = phi;
    for (let i = 1; i < 5; i++) {
      const A = gears[i - 1], Bg = gears[i];
      const th = Bg.theta;
      Bg.phi = th + Math.PI - Math.PI / Bg.N + (th - A.phi) * (A.N / Bg.N);
    }
    for (let i = 0; i < 5; i++) gears[i].mesh.rotation.z = gears[i].phi;
    if (gears[0].cover) gears[0].cover.rotation.z = gears[0].phi;
    // ratchet: varile bağlı
    const R = gears[5], th = R.theta;
    R.phi = th + Math.PI - Math.PI / R.N + (th - gears[0].phi) * (gears[0].N / R.N);
    R.mesh.rotation.z = R.phi;
    const sw = Math.sin(time * 2 * Math.PI * 1.55);
    balance.rotation.z = 1.25 * sw;
    fork.rotation.z = -0.16 * Math.sin(time * 2 * Math.PI * 1.55 + 0.6);
    rotor.rotation.z = rotorAngle;
  }
  update(0, 0, 0);
  return { group: g, update };
}
