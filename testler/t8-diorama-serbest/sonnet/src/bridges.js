import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { M } from './palette.js';
import { GROUND, K } from './world.js';
import { Model, placeModel } from './hero.js';
import { D } from './dims.js';

const SC = 0.25;             // mini voxel
const smoothstep = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

// Köprü: A -> B (dünya x,z). type: 'brooklyn' | 'steelsusp' | 'cantilever'
export function buildBridge(world, opts, parent, mats) {
  const { A, B, type, deckW = 8, deckY = 13.4, name } = opts;
  const dx = B[0] - A[0], dz = B[1] - A[1]; const L = Math.hypot(dx, dz); const dir = [dx / L, dz / L]; const perp = [-dz / L, dx / L];
  const L2W = (s, t, y) => new THREE.Vector3(A[0] + dir[0] * s + perp[0] * t, y, A[1] + dir[1] * s + perp[1] * t);
  // su geçişleri
  const water = []; { let inW = false, s0 = 0; for (let s = 0; s <= L; s += 0.5) { const x = Math.floor(A[0] + dir[0] * s), z = Math.floor(A[1] + dir[1] * s); const k = world.kind[z * world.W + x]; const w = k === K.WATER || k === K.PIER; if (w && !inW) { inW = true; s0 = s; } if (!w && inW) { inW = false; water.push([s0, s]); } } if (inW) water.push([s0, L]); }
  const mainW = water.length ? water.reduce((a, b) => (b[1] - b[0] > a[1] - a[0] ? b : a)) : [L * 0.3, L * 0.7];
  const yEnd = 10.5;
  const deckAt = (s) => yEnd + (deckY - yEnd) * Math.min(smoothstep(0, 9, s), smoothstep(0, 9, L - s));
  const PAD = 4, NX = Math.ceil(L / SC) + PAD * 2, NZ = 64, ZC = 32, NY = 84;
  const m = new Model(NX, NY, NZ, SC); const cables = []; const extra = new THREE.Group();
  const lx = (s) => Math.round(s / SC) + PAD; const hw = Math.round(deckW / 2);
  const yl = (y) => Math.round((y - GROUND) / SC);
  // güverte
  for (let s = 0; s <= L; s += SC) { const x = lx(s); const yd = yl(deckAt(s));
    for (let t = -hw; t < hw; t++) { m.set(x, yd, ZC + t, M.ROADDECK); m.set(x, yd - 1, ZC + t, M.ROADDECK); }
    const lamp = Math.round(s / SC) % 6 === 0; m.set(x, yd + 1, ZC - hw, lamp ? M.LAMP : M.CABLE); m.set(x, yd + 1, ZC + hw - 1, lamp ? M.LAMP : M.CABLE); if (lamp) { m.set(x, yd + 2, ZC - hw, M.LAMP); m.set(x, yd + 2, ZC + hw - 1, M.LAMP); } }
  const towers = [];
  if (type === 'brooklyn' || type === 'steelsusp') {
    const margin = type === 'brooklyn' ? 3.2 : 3.6; const s1 = mainW[0] + margin, s2 = mainW[1] - margin; towers.push(s1, s2);
    const stone = type === 'brooklyn'; const HT = stone ? 5.0 : 5.6; // güverte üstü kule yüksekliği (birim)
    const legW = stone ? 6 : 4, gap = hw * 2 + (stone ? 4 : 3); const mat = stone ? M.TOWERSTONE : M.TRUSS;
    for (const s of towers) { const x0 = lx(s) - legW / 2; const yb = yl(deckAt(s)) - 10, yt = yl(deckAt(s) + HT);
      for (const side of [-1, 1]) { const zc = ZC + side * (gap / 2); m.box(x0, yl(WATER_Y_C) - 2, zc - legW / 2, x0 + legW, yt, zc + legW / 2, mat); }
      // üst kirişler ve sivri kemer
      const zA = ZC - gap / 2 + legW / 2 - 1, zB = ZC + gap / 2 - legW / 2 + 1;
      m.box(x0, yt - 5, Math.round(zA), x0 + legW, yt, Math.round(zB), mat);
      if (stone) { m.box(x0, yt - 12, Math.round(zA), x0 + legW, yt - 5, Math.round(zA + 3), mat); m.box(x0, yt - 12, Math.round(zB - 3), x0 + legW, yt - 5, Math.round(zB), mat); m.box(x0, yt - 9, Math.round(zA + 3), x0 + legW, yt - 5, Math.round(zA + 5), mat); m.box(x0, yt - 9, Math.round(zB - 5), x0 + legW, yt - 5, Math.round(zB - 3), mat); }
      else { m.box(x0, yt - 16, Math.round(zA), x0 + legW, yt - 14, Math.round(zB), mat); m.box(x0, yt - 26, Math.round(zA), x0 + legW, yt - 24, Math.round(zB), mat); }
      // kule tepesi süsü
      for (const side of [-1, 1]) m.box(x0 + 1, yt, ZC + side * (gap / 2) - 1, x0 + legW - 1, yt + 2, ZC + side * (gap / 2) + 1, mat);
    }
    // ana kablolar
    const cy = (s) => { const top = deckAt(s1) + HT + 0.5; const low = deckY + 0.55; if (s < s1) return low + (top - low) * 0.0 + (yEnd + 1.1 - low) * 0 + (top - (yEnd + 0.6)) * (1 - Math.pow(s / s1, 1.25)) + (yEnd + 0.6) - (yEnd + 0.6); return 0; };
    const cableY = (s) => { const top = deckY + HT + 0.55; if (s >= s1 && s <= s2) { const u = (s - (s1 + s2) / 2) / ((s2 - s1) / 2); return deckY + 0.6 + (top - deckY - 0.6) * u * u; } if (s < s1) { const u = s / s1; return (yEnd + 1.2) + (top - yEnd - 1.2) * Math.pow(u, 1.35); } const u = (L - s) / (L - s2); return (yEnd + 1.2) + (top - yEnd - 1.2) * Math.pow(u, 1.35); };
    const offs = hw * SC * 0 + (hw + 0.7) * SC * 0; const cabT = (gap / 2) * SC;
    const hangers = [];
    for (const side of [-1, 1]) { const pts = []; for (let s = 0; s <= L; s += 1.5) pts.push(L2W(s, side * cabT, cableY(s))); pts.push(L2W(L, side * cabT, cableY(L)));
      cables.push(pts);
      for (let s = s1 + 0.6; s < s2; s += 0.85) { const y0 = deckAt(s) + 0.15, y1 = cableY(s); hangers.push([L2W(s, side * cabT, y0), L2W(s, side * cabT, y1)]); }
      for (let s = 2.5; s < s1 - 0.2; s += 1.4) hangers.push([L2W(s, side * cabT, deckAt(s) + 0.15), L2W(s, side * cabT, cableY(s))]);
      for (let s = s2 + 1.5; s < L - 2.5; s += 1.4) hangers.push([L2W(s, side * cabT, deckAt(s) + 0.15), L2W(s, side * cabT, cableY(s))]);
      if (stone) for (const s of towers) for (let k = 1; k <= 9; k++) { const sd = s < L / 2 ? 1 : 1; const ds = (k * 1.6) * (s < (s1 + s2) / 2 ? 1 : -1); for (const sgn of [1, -1]) { const sp = s + sgn * ds; if (sp > 1 && sp < L - 1) hangers.push([L2W(s, side * cabT, deckAt(s) + HT + 0.4), L2W(sp, side * cabT, deckAt(sp) + 0.2)]); } }
    }
    // çelik kafes (steel type) veya taş ayaklar
    if (!stone) { for (let s = 0; s <= L; s += SC) { const x = lx(s); const yd = yl(deckAt(s)); if (s > 6 && s < L - 6 && Math.round(s / SC) % 5 === 0) for (const t of [-hw, hw - 1]) for (let y = 1; y <= 7; y++) m.set(x, yd - 1 - y, ZC + t, M.TRUSS); for (const t of [-hw, hw - 1]) for (let dd = 0; dd < 1; dd++) m.set(x, yd - 8, ZC + t, M.TRUSS); } }
    else { for (let s = 6; s < L - 6; s += 3) { const x = lx(s); const yd = yl(deckAt(s)); for (const t of [-hw, hw - 1]) for (let y = 1; y <= 3; y++) m.set(x, yd - 1 - y, ZC + t, M.TRUSS); } }
    // kablo ve askı geometrileri
    const cm = new THREE.MeshStandardMaterial({ color: stone ? 0x8a7d6a : 0x9aa2aa, roughness: 0.6, metalness: 0.3 });
    for (const pts of cables) { const curve = new THREE.CatmullRomCurve3(pts); const g = new THREE.TubeGeometry(curve, Math.min(400, pts.length * 4), 0.11, 6, false); const mesh = new THREE.Mesh(g, cm); mesh.castShadow = true; extra.add(mesh); }
    const hg = []; for (const [a, b] of hangers) { const v = new THREE.Vector3().subVectors(b, a); const len = v.length(); if (len < 0.05) continue; const g = new THREE.CylinderGeometry(0.028, 0.028, len, 4); const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), v.clone().normalize()); g.applyMatrix4(new THREE.Matrix4().compose(a.clone().add(b).multiplyScalar(0.5), q, new THREE.Vector3(1, 1, 1))); hg.push(g); }
    if (hg.length) { const mesh = new THREE.Mesh(mergeGeometries(hg), new THREE.MeshStandardMaterial({ color: stone ? 0x9b907d : 0xaab2ba, roughness: 0.7, metalness: 0.2 })); extra.add(mesh); }
  } else { // cantilever (Queensboro)
    const piers = []; for (const [a, b] of water) { piers.push(a + 1.2, b - 1.2); } if (!piers.length) piers.push(L * 0.3, L * 0.7);
    const trussH = (s) => { let h = 1.3; for (const p of piers) { const d = Math.abs(s - p); h = Math.max(h, 1.3 + 4.4 * Math.max(0, 1 - Math.pow(d / 9, 1.4))); } return h; };
    for (let s = 0; s <= L; s += SC) { const x = lx(s); const yd = yl(deckAt(s)); const th = Math.round(trussH(s) / SC); const inMain = s > mainW[0] - 6 && s < mainW[1] + 6 || water.some(w => s > w[0] - 4 && s < w[1] + 4);
      if (!inMain) continue;
      for (const t of [-hw, hw - 1]) { m.set(x, yd + 1 + th, ZC + t, M.TRUSS); m.set(x, yd - 1, ZC + t, M.TRUSS);
        if (Math.round(s / SC) % 6 === 0) for (let y = 0; y <= th; y++) m.set(x, yd + 1 + y, ZC + t, M.TRUSS);
        const ph = Math.round(s / SC) % 12; if (th > 3) { const yy = Math.round((ph / 12) * th); m.set(x, yd + 1 + yy, ZC + t, M.TRUSS); }
      }
      if (Math.round(s / SC) % 10 === 0) for (let t = -hw; t < hw; t++) m.set(x, yd + 1 + th, ZC + t, M.TRUSS);
    }
    for (const p of piers) { const x0 = lx(p) - 3; m.box(x0, yl(WATER_Y_C) - 2, ZC - hw - 1, x0 + 6, yl(deckAt(p)) - 1, ZC + hw + 1, M.TOWERSTONE); }
    for (const p of piers.filter((_, i) => i % 2 === 0)) { /* Roosevelt/kıyı kuleleri */ }
  }
  // model oturt
  const a = Math.atan2(-dz, dx);
  const pxo = PAD * SC; const px = A[0] - dir[0] * pxo - ZC * SC * Math.sin(a), pz = A[1] - dir[1] * pxo - ZC * SC * Math.cos(a);
  placeModel(m, mats, parent, px, GROUND, pz, a); parent.add(extra);
  return { name, A, B, L, towers: towers.map(s => L2W(s, 0, deckY + 3)) };
}
const WATER_Y_C = 8.6;
