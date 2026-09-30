import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

/* Keskin köşeli lathe: her "run" kendi içinde pürüzsüz, run'lar arası sert kenar. */
export function lathe(runs, segs = 128) {
  const gs = runs.map((r) => new THREE.LatheGeometry(r.map(([x, y]) => new THREE.Vector2(x, y)), segs));
  return gs.length === 1 ? gs[0] : mergeGeometries(gs);
}

export function gearShape(N, rOut, rRoot, opt = {}) {
  const s = new THREE.Shape();
  const p = (Math.PI * 2) / N;
  for (let i = 0; i < N; i++) {
    const a = i * p;
    const pts = [[a - 0.36 * p, rRoot], [a - 0.15 * p, rOut], [a + 0.15 * p, rOut], [a + 0.36 * p, rRoot]];
    pts.forEach(([ang, r], k) => {
      const x = Math.cos(ang) * r, y = Math.sin(ang) * r;
      if (i === 0 && k === 0) s.moveTo(x, y); else s.lineTo(x, y);
    });
  }
  s.closePath();
  if (opt.spokes) {
    const S = opt.spokes, gap = opt.gap ?? 0.13;
    for (let k = 0; k < S; k++) {
      const a0 = (k * 2 * Math.PI) / S + gap, a1 = ((k + 1) * 2 * Math.PI) / S - gap;
      const h = new THREE.Path();
      h.absarc(0, 0, opt.rRim, a0, a1, false);
      h.absarc(0, 0, opt.rHub, a1, a0, true);
      h.closePath();
      s.holes.push(h);
    }
  }
  if (opt.bore) {
    const h = new THREE.Path(); h.absarc(0, 0, opt.bore, 0, Math.PI * 2, true); s.holes.push(h);
  }
  return s;
}

export function capsuleShape(x1, y1, x2, y2, w) {
  const a = Math.atan2(y2 - y1, x2 - x1), r = w / 2;
  const s = new THREE.Shape();
  s.absarc(x1, y1, r, a + Math.PI / 2, a + Math.PI * 1.5, false);
  s.absarc(x2, y2, r, a - Math.PI / 2, a + Math.PI / 2, false);
  s.closePath();
  return s;
}

export function ringShape(rOut, rIn, a0 = 0, a1 = Math.PI * 2) {
  const s = new THREE.Shape();
  s.absarc(0, 0, rOut, a0, a1, false);
  if (a1 - a0 < Math.PI * 2 - 0.001) s.absarc(0, 0, rIn, a1, a0, true);
  else { const h = new THREE.Path(); h.absarc(0, 0, rIn, 0, Math.PI * 2, true); s.holes.push(h); }
  return s;
}

export function extrude(shape, depth, bevel = 0.01, curveSegs = 24) {
  return new THREE.ExtrudeGeometry(shape, {
    depth, bevelEnabled: bevel > 0, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 2, curveSegments: curveSegs,
  });
}

/* Kapalı halka şeklinde kayış (bileği saran). pts: [z, y] çiftleri */
export function strapGeometry(pts, w = 2.0, t = 0.34, r = 0.1, N = 360) {
  const curve = new THREE.CatmullRomCurve3(pts.map(([z, y]) => new THREE.Vector3(0, y, z)), true, 'centripetal');
  const center = new THREE.Vector3();
  pts.forEach(([z, y]) => center.add(new THREE.Vector3(0, y, z)));
  center.multiplyScalar(1 / pts.length);
  const K = 6, sec = [];
  for (const [sx, sy, a0] of [[1, 1, 0], [-1, 1, 90], [-1, -1, 180], [1, -1, 270]]) {
    for (let k = 0; k <= K; k++) {
      const ang = ((a0 + (90 * k) / K) * Math.PI) / 180;
      const na = Math.cos(ang), nb = Math.sin(ang);
      sec.push({ a: sx * (w / 2 - r) + r * na, b: sy * (t / 2 - r) + r * nb, na, nb });
    }
  }
  const M = sec.length;
  const pos = [], nor = [], uv = [], idx = [];
  const X = new THREE.Vector3(1, 0, 0);
  let sign = 0;
  for (let i = 0; i <= N; i++) {
    const s = i / N;
    const P = curve.getPointAt(Math.min(s, 0.99999)), T = curve.getTangentAt(Math.min(s, 0.99999));
    const n = new THREE.Vector3(0, -T.z, T.y);
    if (n.dot(P.clone().sub(center)) < 0) n.negate();
    if (!sign) sign = new THREE.Vector3().crossVectors(X, T).dot(n) > 0 ? 1 : -1;
    for (let j = 0; j < M; j++) {
      const q = sec[j];
      pos.push(P.x + q.a * X.x + q.b * n.x, P.y + q.a * X.y + q.b * n.y, P.z + q.a * X.z + q.b * n.z);
      nor.push(q.na * X.x + q.nb * n.x, q.na * X.y + q.nb * n.y, q.na * X.z + q.nb * n.z);
      uv.push(s, (q.a + w / 2) / w);
    }
  }
  for (let i = 0; i < N; i++) {
    const i2 = i + 1;
    for (let j = 0; j < M; j++) {
      const j2 = (j + 1) % M;
      const a = i * M + j, b = i2 * M + j, c = i2 * M + j2, d = i * M + j2;
      if (sign > 0) idx.push(a, b, d, b, c, d); else idx.push(a, d, b, b, d, c);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  return g;
}
