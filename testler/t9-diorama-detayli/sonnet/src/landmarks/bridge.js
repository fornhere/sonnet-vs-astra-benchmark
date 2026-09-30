// Asma köprü üreteci (Brooklyn: granit gotik kuleler + yelpaze diyagonal halatlar; Manhattan/Williamsburg: çelik kuleler)
import { Model } from './util.js';

/**
 * L: köprü uzunluğu (dünya birimi), waterA/waterB: suya giriş/çıkış konumları (x, -L/2..L/2),
 * style: 'stone' | 'steel'
 */
export function suspensionBridge(P, { L, waterA, waterB, style = 'stone', deckW = 1.9, deckY = 3.0, towerH = 9.6, s = 0.3, stays = true }) {
  const Wd = deckW + 2.4;
  const m = new Model(L + 1.2, Wd + 1.0, towerH + 1.2, s, P);
  const spanLen = 486 / 22;                                   // ana açıklık (486 m / 20)
  const mid = (waterA + waterB) / 2;
  const xT1 = Math.max(waterA + 1.5, mid - spanLen / 2), xT2 = Math.min(waterB - 1.5, mid + spanLen / 2);
  const towers = [xT1, xT2];
  const half = deckW / 2;
  // --- yol tabliyesi ---
  const deckTop = deckY;
  for (let x = -L / 2; x < L / 2; x += s) {
    // kenarlarda rampa: kıyıdan ilerleyip zemine iner
    let y = deckY;
    const dA = x - (-L / 2), dB = L / 2 - x; const ramp = 6.5;
    const lower = Math.min(dA, dB) < ramp; if (lower) y = 0.25 + (deckY - 0.25) * Math.pow(Math.min(dA, dB) / ramp, 0.85);
    m.box(x, 0, s * 1.05, deckW, y - 0.28, y, 'deck');
    m.box(x, 0, s * 1.05, 0.08, y, y + 0.05, 'deckLine');
    for (const sz of [-1, 1]) m.box(x, sz * (half + 0.05), s * 1.05, 0.1, y, y + 0.22, 'rail');
    // taş viyadük gövdesi
    if (lower && y > 0.5) { m.box(x, 0, s * 1.05, deckW * 0.9, 0, y - 0.28, 'granite'); }
  }
  // viyadük kemerleri (koyu) her 1.0'da bir
  for (let x = -L / 2 + 0.6; x < -L / 2 + 6.4; x += 1.0) { const y = 0.25 + (deckY - 0.25) * Math.pow((x + L / 2) / 6.5, 0.85); const ah = Math.max(0.3, (y - 0.28) * 0.7); m.box(x, 0, 0.42, deckW * 0.95, 0, ah, 'towerArch'); }
  for (let x = L / 2 - 0.6; x > L / 2 - 6.4; x -= 1.0) { const y = 0.25 + (deckY - 0.25) * Math.pow((L / 2 - x) / 6.5, 0.85); const ah = Math.max(0.3, (y - 0.28) * 0.7); m.box(x, 0, 0.42, deckW * 0.95, 0, ah, 'towerArch'); }
  // --- kuleler ---
  const tw = style === 'stone' ? 1.5 : 0.8, tz = deckW + 1.5;
  for (const xt of towers) {
    if (style === 'stone') {
      // iki granit ayak + üst/alt sivri kemer
      for (const sz of [-1, 1]) { m.box(xt, sz * (tz / 2 - 0.5), tw, 1.0, 0, towerH - 0.5, 'tower'); m.box(xt, sz * (tz / 2 - 0.5), tw + 0.15, 1.15, deckY + 0.3, deckY + 0.5, 'towerDk'); m.box(xt, sz * (tz / 2 - 0.5), tw, 1.0, towerH - 0.5, towerH, 'towerDk'); }
      // ara duvar (kemer boşlukları açılır)
      m.box(xt, 0, tw, tz - 1.0, 0, towerH - 0.5, 'tower');
      const carve = (yA, hA, aw) => {
        for (let y = yA; y < yA + hA; y += s * 0.5) for (let z = -aw / 2; z <= aw / 2; z += s * 0.5) {
          const u = Math.abs(z) / (aw / 2); const yt = yA + hA * (1 - Math.pow(u, 1.9)); if (y < yt) for (let x = xt - tw / 2 - 0.05; x <= xt + tw / 2 + 0.05; x += s * 0.5) m.set(x, y, z, 0);
        }
      };
      carve(0.0, deckY + 1.7, deckW + 0.35);           // yol geçidi
      carve(towerH - 3.2, 2.5, tz - 1.6);              // üst kemer
      // yan yüzlerde sivri kemer (gotik) nişleri: iki kat
      for (const sz of [-1, 1]) for (const [ya, ha, aw] of [[deckY + 0.5, 3.6, 0.7], [towerH - 3.0, 2.2, 0.62]]) {
        const zf = sz * (tz / 2 - 0.5 + 0.5 - s * 0.6);
        for (let y = ya; y < ya + ha; y += s * 0.5) { const t = (y - ya) / ha; const half = aw / 2 * (t < 0.55 ? 1 : Math.max(0, 1 - Math.pow((t - 0.55) / 0.45, 1.5))); for (let x = -half; x <= half; x += s * 0.5) m.set(xt + x, y, zf, 'towerArch'); }
      }
      m.box(xt, 0, tw + 0.2, tz + 0.2, towerH, towerH + 0.35, 'towerDk');
      for (const sz of [-1, 1]) m.box(xt, sz * (tz / 2 - 0.5), 0.5, 0.5, towerH + 0.35, towerH + 0.75, 'towerDk');
    } else {
      // çelik: iki ayak + çapraz kiriş
      for (const sz of [-1, 1]) m.box(xt, sz * (tz / 2 - 0.3), tw, 0.6, 0, towerH, 'steelDk');
      for (let k = 0; k < 4; k++) { const y = deckY + 0.7 + k * (towerH - deckY - 1.4) / 3; m.box(xt, 0, tw * 0.8, tz - 0.6, y, y + 0.28, 'steelDk'); }
      m.box(xt, 0, tw * 1.1, tz, towerH - 0.05, towerH + 0.3, 'steelDk');
    }
  }
  // --- ana halatlar (parabolik) + askı halatları + stay'ler ---
  const yT = towerH - 0.15, yM = deckY + 0.95, yA = deckY + 0.55;
  const cable = (z) => {
    const pts = [];
    const xa = -L / 2 + 6.4, xb = L / 2 - 6.4;                       // ankraj (kıyıdaki viyadük başlangıcı)
    const cab = (x) => {
      if (x < xT1) { const t = (x - xa) / (xT1 - xa); return (yA + (yT - yA) * Math.pow(Math.max(0, t), 1.05)) - Math.sin(Math.max(0, Math.min(1, t)) * Math.PI) * 0.35; }
      if (x > xT2) { const t = (xb - x) / (xb - xT2); return (yA + (yT - yA) * Math.pow(Math.max(0, t), 1.05)) - Math.sin(Math.max(0, Math.min(1, t)) * Math.PI) * 0.35; }
      const u = (x - (xT1 + xT2) / 2) / ((xT2 - xT1) / 2); return yM + (yT - yM) * u * u;
    };
    for (let x = xa; x <= xb; x += s * 0.7) pts.push([x, cab(x)]);
    for (let i = 0; i + 1 < pts.length; i++) m.line(pts[i][0], pts[i][1], z, pts[i + 1][0], pts[i + 1][1], z, 'cableMain', 0);
    // askılar: 1 voxel dikey çizgiler
    for (let x = xa + 0.9; x < xb - 0.3; x += 1.25) { if (Math.abs(x - xT1) < 0.6 || Math.abs(x - xT2) < 0.6) continue; m.line(x, deckY + 0.2, z, x, cab(x), z, 'cableStay', 0); }
    return cab;
  };
  for (const sz of [-1, 1]) cable(sz * (half + 0.15));
  if (stays) for (const sz of [-1, 1]) for (const xt of towers) for (const dir of [-1, 1]) {
    const n = 6; for (let i = 1; i <= n; i++) { const xd = xt + dir * (i * 1.8); const lim = dir < 0 ? xd > -L / 2 + 6.6 : xd < L / 2 - 6.6; if (!lim) continue; const yTop = yT - 0.15 - (i - 1) * 0.12; m.line(xt, yTop, sz * (half + 0.12), xd, deckY + 0.05, sz * (half + 0.12), 'cableStay', 0); }
  }
  // gece lambaları
  for (let x = -L / 2 + 7; x < L / 2 - 6; x += 1.8) for (const sz of [-1, 1]) m.box(x, sz * (half + 0.05), 0.1, 0.1, deckY + 0.22, deckY + 0.4, 'gold');
  return { m, towers, deckY };
}
