import { M } from './palette.js';
import { hash3, hash1, clamp } from './util.js';

export const H = 80, GROUND = 10, WATER_Y = 8.6;
export const K = { WATER: 0, ROAD: 1, BLD: 2, PARK: 3, PIER: 4, POND: 5 };

export function decodeGrid(bytes, W, D) {
  const N = W * D; const kind = new Uint8Array(N), hgt = new Uint8Array(N), pal = new Uint8Array(N), sty = new Uint8Array(N), bid = new Uint16Array(N);
  // veri güneyden kuzeye satır satır; dünya z ekseni kuzeye doğru azalır -> ters çevir
  const bv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  for (let r = 0; r < D; r++) { const z = D - 1 - r; for (let x = 0; x < W; x++) { const o = r * W + x, c = z * W + x;
    kind[c] = bytes[o]; hgt[c] = bytes[N + o]; pal[c] = bytes[2 * N + o]; sty[c] = bytes[3 * N + o]; bid[c] = bv.getUint16(4 * N + o * 2, true); } }
  return { W, D, kind, hgt, pal, sty, bid };
}

export function buildWorld(g, progress = () => {}) {
  const { W, D, kind, hgt, pal, sty, bid } = g; const N = W * D;
  const vox = new Uint8Array(W * D * H);
  const idx = (x, y, z) => y + H * (x + W * z);
  // --- seyrek arazi -> yeşil
  const bcount = new Float32Array(N);
  { const R = 5; const sat = new Int32Array((W + 1) * (D + 1));
    for (let z = 0; z < D; z++) { let row = 0; for (let x = 0; x < W; x++) { row += kind[z * W + x] === K.BLD ? 1 : 0; sat[(z + 1) * (W + 1) + x + 1] = sat[z * (W + 1) + x + 1] + row; } }
    for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) { const x0 = Math.max(0, x - R), x1 = Math.min(W, x + R + 1), z0 = Math.max(0, z - R), z1 = Math.min(D, z + R + 1);
      bcount[z * W + x] = sat[z1 * (W + 1) + x1] - sat[z0 * (W + 1) + x1] - sat[z1 * (W + 1) + x0] + sat[z0 * (W + 1) + x0]; } }
  for (let c = 0; c < N; c++) if (kind[c] === K.ROAD && bcount[c] < 7) { kind[c] = K.PARK; pal[c] = 0; }
  // --- kıyıya uzaklık (su sütunları için) — chamfer
  const shore = new Float32Array(N).fill(1e3);
  for (let c = 0; c < N; c++) if (kind[c] !== K.WATER) shore[c] = 0;
  const wgt = 1, dg = 1.41;
  for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) { const c = z * W + x; let v = shore[c]; if (!v) continue;
    if (x > 0) v = Math.min(v, shore[c - 1] + wgt); if (z > 0) { v = Math.min(v, shore[c - W] + wgt); if (x > 0) v = Math.min(v, shore[c - W - 1] + dg); if (x < W - 1) v = Math.min(v, shore[c - W + 1] + dg); } shore[c] = v; }
  for (let z = D - 1; z >= 0; z--) for (let x = W - 1; x >= 0; x--) { const c = z * W + x; let v = shore[c]; if (!v) continue;
    if (x < W - 1) v = Math.min(v, shore[c + 1] + wgt); if (z < D - 1) { v = Math.min(v, shore[c + W] + wgt); if (x < W - 1) v = Math.min(v, shore[c + W + 1] + dg); if (x > 0) v = Math.min(v, shore[c + W - 1] + dg); } shore[c] = v; }
  // kenardan da "kıyı" say (ızgara sınırındaki su derinliği aynı kalsın) — yok
  // --- bina yüksekliği / basamak (setback) hesabı
  const hEff = new Uint8Array(N); const edgeD = new Uint8Array(N);
  for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) { const c = z * W + x; if (kind[c] !== K.BLD) continue; const b = bid[c];
    let d = 1; // 4-komşu chamfer: aynı bina mı
    const same = (xx, zz) => xx >= 0 && xx < W && zz >= 0 && zz < D && kind[zz * W + xx] === K.BLD && bid[zz * W + xx] === b;
    while (d < 4) { let ok = true; for (let dz = -d; dz <= d && ok; dz++) for (let dx = -d; dx <= d; dx++) { if (!same(x + dx, z + dz)) { ok = false; break; } } if (!ok) break; d++; }
    edgeD[c] = d; }
  const maxD = new Map(); for (let c = 0; c < N; c++) if (kind[c] === K.BLD) { const b = bid[c]; if ((maxD.get(b) || 0) < edgeD[c]) maxD.set(b, edgeD[c]); }
  for (let c = 0; c < N; c++) { if (kind[c] !== K.BLD) continue; let h = hgt[c]; const md = maxD.get(bid[c]) || 1;
    if (h >= 14 && md >= 2 && (sty[c] === 3 || (sty[c] === 4 && h > 20))) { const t = (edgeD[c] - 1) / (md - 1); h = Math.round(h * (0.66 + 0.34 * t)); }
    hEff[c] = h; }
  // --- voksel doldurma
  progress('Zemin katmanları');
  for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) { const c = z * W + x; const k = kind[c]; const base = H * (x + W * z);
    const hs = hash3(x, 0, z, 5);
    if (k === K.WATER || k === K.PIER) {
      const d = shore[c]; const bed = d <= 1.5 ? 7 : d <= 2.5 ? 6 : d <= 4.5 ? 5 : d <= 8 ? 4 : 3;
      for (let y = 0; y < bed; y++) vox[base + y] = y < 2 ? M.BEDROCK : (y === bed - 1 ? M.SAND : M.SILT);
      if (k === K.PIER) for (let y = bed; y < 9; y++) vox[base + y] = M.PIER;
    } else {
      const bot = k === K.POND ? 8 : GROUND;
      for (let y = 0; y < bot; y++) vox[base + y] = y < 2 ? M.BEDROCK : y < 5 ? M.SCHIST : y < 8 ? (hs < 0.5 ? M.SOIL : M.FILL) : M.CONCRETE;
      if (k === K.POND) { vox[base + 7] = M.PONDBED; }
      else if (k === K.PARK) { vox[base + 8] = M.SOIL; vox[base + 9] = pal[c] === 1 ? M.FOREST : pal[c] === 2 ? M.PITCH : M.GRASS; }
      else { vox[base + 8] = M.CONCRETE; vox[base + 9] = k === K.BLD ? M.PLAZA : M.ASPHALT; }
      if (k === K.BLD) { const m = M.BLD0 + (sty[c] - 1) * 8 + pal[c]; const hh = Math.min(hEff[c], H - GROUND - 2); for (let y = 0; y < hh; y++) vox[base + GROUND + y] = m; }
      if (k === K.PARK) { // ağaçlar
        const p = pal[c]; const r = hash3(x, 1, z, 9);
        if (p !== 2) { const pr = p === 1 ? 0.78 : 0.2; if (r < pr) { const r2 = hash3(x, 2, z, 3);
          const m = r2 < 0.09 ? M.LEAF_ORANGE : r2 < 0.14 ? M.LEAF_RED : r2 < 0.19 ? M.LEAF_YELLOW : r2 < 0.5 ? M.LEAF1 : r2 < 0.75 ? M.LEAF2 : M.LEAF3;
          vox[base + GROUND] = m; if (p === 1 && hash3(x, 3, z, 4) < 0.28) vox[base + GROUND + 1] = m; } } }
    } }
  return { W, D, H, vox, kind, hgt: hEff, pal, sty, bid, shore, idx };
}
