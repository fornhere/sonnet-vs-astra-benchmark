// Özgürlük Heykeli, Grand Central, Times Square panoları, Rockefeller plaza (buz pisti)
import { Model } from './util.js';

const TAU = Math.PI * 2;

export function statueOfLiberty(P) {
  const s = 0.16, Ht = 13.4, R = 2.9;
  const m = new Model(R * 2 + 0.4, R * 2 + 0.4, Ht, s, P);
  // Fort Wood: 11 köşeli yıldız
  const star = []; for (let i = 0; i < 22; i++) { const a = i / 22 * TAU; const r = i % 2 ? R * 0.74 : R; star.push([Math.sin(a) * r, -Math.cos(a) * r]); }
  m.prism(star, 0, 0.55, 'fort'); m.prism(star.map(([x, z]) => [x * 0.82, z * 0.82]), 0.55, 0.8, 'fortDk');
  m.cyl(0, 0, R * 0.6, R * 0.6, 0.8, 1.0, 'grass');
  // kaide: granit, üç kademe
  m.box(0, 0, 2.6, 2.6, 1.0, 1.6, 'granite'); m.box(0, 0, 2.2, 2.2, 1.6, 3.3, 'stoneLt'); m.box(0, 0, 2.45, 2.45, 3.3, 3.5, 'granite'); m.box(0, 0, 1.75, 1.75, 3.5, 4.4, 'stoneLt'); m.box(0, 0, 2.0, 2.0, 4.4, 4.6, 'granite');
  const y0 = 4.6;
  // gövde (elbise): iri ve konik
  for (let y = y0; y < y0 + 4.3; y += s) {
    const t = (y - y0) / 4.3; const rx = 0.95 - 0.38 * t, rz = 0.72 - 0.22 * t;
    m.cyl(0, 0, rx, rz, y, y + s, Math.floor((y - y0) / s) % 4 === 0 ? 'copperDk' : 'copper');
  }
  // elbise kıvrımları (ön yüzde dikey şeritler + etek dalgaları)
  for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; const x = Math.sin(a) * 0.86, z = Math.cos(a) * 0.66; m.box(x, z, s * 1.6, s * 1.6, y0, y0 + 1.5 + (i % 3) * 0.5, i % 2 ? 'copperDk' : 'copperLt'); }
  for (let i = 0; i < 5; i++) m.box(-0.25 + i * 0.13, 0.62 - Math.abs(i - 2) * 0.05, s * 1.3, s * 1.3, y0 + 0.4, y0 + 3.6, i % 2 ? 'copperDk' : 'copper');
  // omuz + göğüs
  m.cyl(0, 0, 0.58, 0.44, y0 + 4.3, y0 + 5.05, 'copper'); m.cyl(0, 0, 0.62, 0.34, y0 + 4.6, y0 + 4.9, 'copperLt');
  // boyun, baş
  m.cyl(0, 0.03, 0.22, 0.2, y0 + 5.05, y0 + 5.32, 'copper'); m.ell(0, y0 + 5.68, 0.05, 0.42, 0.46, 0.4, 'copper');
  // taç bandı + 7 uzun ışın
  m.cyl(0, 0.05, 0.46, 0.44, y0 + 5.9, y0 + 6.08, 'copperLt');
  for (let i = 0; i < 7; i++) { const a = (-0.5 + i / 6) * Math.PI * 1.06 - Math.PI / 2; const dx = Math.cos(a), dz = Math.sin(a); const len = i === 3 ? 1.05 : 1.2; const ex = dx * len * 1.05, ey = y0 + 6.1 + 0.55 + Math.abs(dx) * 0.28 + (i === 3 ? 0.4 : 0); m.line(dx * 0.32, y0 + 6.1, dz * 0.32 * 0.5 + 0.05, ex, ey, dz * 0.68 + 0.05, 'copperLt', 0); m.box(ex, dz * 0.68 + 0.05, s * 1.3, s * 1.3, ey - s, ey + s, 'gold'); }
  // sağ kol yukarı: omuzdan meşaleye
  m.line(0.6, y0 + 4.7, 0.05, 0.86, y0 + 6.8, 0.1, 'copper', 1); m.line(0.86, y0 + 6.8, 0.1, 0.94, y0 + 8.1, 0.14, 'copper', 1);
  m.cyl(0.94, 0.14, 0.24, 0.24, y0 + 8.0, y0 + 8.28, 'goldMat'); m.cyl(0.94, 0.14, 0.16, 0.16, y0 + 8.28, y0 + 8.7, 'gold');
  m.ell(0.94, y0 + 9.1, 0.14, 0.26, 0.5, 0.26, 'flame');
  // sol kol + tablet (ön yüzde, yatık)
  m.line(-0.6, y0 + 4.5, 0.05, -0.9, y0 + 3.6, 0.4, 'copperDk', 1);
  m.box(-0.95, 0.42, 0.18, 0.78, y0 + 2.7, y0 + 4.2, 'copperLt'); m.box(-0.92, 0.46, 0.34, 0.64, y0 + 2.85, y0 + 4.05, 'copperDk');
  // pelerin
  m.box(-0.35, -0.5, 0.75, 0.2, y0 + 1.6, y0 + 4.8, 'copperDk');
  return { m, name: 'liberty', rotY: Math.PI / 4 };
}

export function grandCentral(P) {
  const s = 0.28, Wl = 8.0, Dl = 6.6, Hb = 5.0;
  const m = new Model(Wl + 0.4, Dl + 0.4, 9, s, P);
  m.boxRoof(0, 0, Wl, Dl, 0, Hb, 'cream', 'limeP');
  // taban bandı ve saçak
  m.box(0, 0, Wl + s, Dl + s, 0, 0.5, 'limeDk'); m.box(0, 0, Wl + s, Dl + s, Hb - 0.3, Hb, 'limeP');
  // mansard (bakır), 3 basamak
  m.box(0, 0, Wl - 0.3, Dl - 0.3, Hb, Hb + 0.35, 'copperDk'); m.box(0, 0, Wl - 0.9, Dl - 0.9, Hb + 0.35, Hb + 0.7, 'copper'); m.box(0, 0, Wl - 1.8, Dl - 1.8, Hb + 0.7, Hb + 1.0, 'copperLt');
  // köşe pavyonları
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) { m.box(sx * (Wl / 2 - 0.5), sz * (Dl / 2 - 0.45), 1.0, 0.9, Hb, Hb + 0.9, 'copperDk'); m.box(sx * (Wl / 2 - 0.5), sz * (Dl / 2 - 0.45), 0.7, 0.6, Hb + 0.9, Hb + 1.15, 'copper'); }
  // güney cephe: merkez alınlık + üç büyük kemer pencere
  const zf = Dl / 2;
  m.box(0, zf - 0.1, 3.5, 0.5, 0, Hb + 1.0, 'limeP');
  m.box(0, zf + 0.05, 3.9, 0.25, Hb - 0.3, Hb + 0.05, 'limeDk');
  // alınlık (üçgen)
  for (let k = 0; k < 8; k++) m.box(0, zf - 0.05, 3.6 - k * 0.42, 0.4, Hb + 1.0 + k * 0.12, Hb + 1.12 + k * 0.12, 'limeP');
  for (let i = -1; i <= 1; i++) {
    const ax = i * 1.05; const aw = 0.78, ah = 2.5, y0 = 0.75;
    for (let y = y0; y < y0 + ah; y += s * 0.5) for (let x = -aw / 2; x <= aw / 2; x += s * 0.5) {
      const top = y0 + ah - aw / 2; let ok = true; if (y > top) { const dy = y - top; ok = (x * x + dy * dy) <= (aw / 2) ** 2; }
      if (ok) m.set(ax + x, y, zf + 0.1, 'darkGlass');
    }
  }
  // "Glory of Commerce" heykel grubu + saat
  m.box(0, zf - 0.2, 1.0, 0.5, Hb + 1.0 + 0.9, Hb + 1.9, 'limeP');
  m.ell(0, Hb + 2.35, zf - 0.2, 0.34, 0.4, 0.2, 'steel'); m.box(-0.5, zf - 0.2, 0.22, 0.22, Hb + 1.9, Hb + 2.5, 'steelDk'); m.box(0.5, zf - 0.2, 0.22, 0.22, Hb + 1.9, Hb + 2.5, 'steelDk');
  m.cyl(0, zf + 0.12, 0.3, 0.05, Hb + 1.15, Hb + 1.75, 'white');
  // yan cephe pencere şeritleri (küçük koyu şeritler) — gece ışıklı
  for (const sx of [-1, 1]) for (let j = -1; j <= 1; j++) m.box(sx * (Wl / 2 + 0.02), j * 1.4, 0.06, 0.55, 0.8, 2.9, 'crownWinLit');
  return { m, name: 'gct' };
}

// Rockefeller: buz pisti + ağaç + bayraklar (kule ayrıca)
export function rockPlaza(P) {
  const s = 0.15; const m = new Model(3.2, 2.4, 3.2, s, P);
  m.box(0, 0, 3.0, 2.2, 0, 0.12, 'plaza'); m.box(0, 0, 2.2, 1.4, 0.12, 0.16, 'ice');
  // ağaç (Noel)
  for (let k = 0; k < 7; k++) { const r = 0.42 - k * 0.055; m.cyl(0.0, 0.0, r, r, 0.16 + k * 0.24, 0.16 + (k + 1) * 0.24, k % 2 ? 'xmas' : 'xmasG'); }
  m.box(0, 0, s, s, 1.9, 2.1, 'gold');
  // bayrak direkleri
  for (let i = -3; i <= 3; i++) m.box(i * 0.42, 1.0, s * 0.8, s * 0.8, 0.12, 0.9, i % 2 ? 'red' : 'blue');
  return { m, name: 'rockplaza' };
}

// Times Square: tabela kulesi (One Times Square + top), plaza döşemesi ve çatı panoları
export function timesSquare(P, heightAt, cx, cz) {
  const s = 0.2, R = 10;
  const m = new Model(R * 2, R * 2, 14, s, P);
  // bowtie plaza: canlı renkli zemin şeridi
  m.box(0, 0.4, 1.6, 4.4, 0, 0.08, 'plaza');
  for (let i = 0; i < 6; i++) m.box(-0.5 + i * 0.2, 2.5, 0.16, 0.16, 0.08, 0.2, 'sign' + (i % 6));
  // One Times Square: 1.5×1.5×9 kule (tüm yüzler LED)
  const tx = 0.15, tz = 2.9;
  m.box(tx, tz, 1.5, 1.5, 0, 8.6, 'sign1');
  m.box(tx, tz, 1.1, 1.1, 8.6, 9.3, 'signBack'); m.box(tx, tz, 0.16, 0.16, 9.3, 11.0, 'chrome');
  m.ell(tx, 11.35, tz, 0.4, 0.4, 0.4, 'flame');
  // çevre çatılarına panolar: yükseklik bilgisi ile
  let k = 0;
  for (let dz = -7; dz <= 7; dz++) for (let dx = -7; dx <= 7; dx++) {
    if (Math.hypot(dx, dz) > 8) continue; const h = heightAt(Math.round(cx + dx), Math.round(cz + dz)); if (h < 3) continue;
    const hsh = Math.abs(Math.sin((dx + 17) * 12.9898 + (dz + 31) * 78.233) * 43758.5453) % 1; if (hsh > 0.6) continue;
    const yTop = h; const face = ((Math.abs(dx * 7 + dz * 3)) % 4);
    const vert = face < 2; const bw = 1.3 + hsh * 0.9, bh = 1.0 + hsh * 1.3;
    m.box(dx, dz, vert ? bw : 0.18, vert ? 0.18 : bw, yTop + 0.25, yTop + 0.25 + bh, 'sign' + ((k++) % 6));
    m.box(dx - (vert ? 0.3 : 0), dz - (vert ? 0 : 0.3), 0.1, 0.1, yTop, yTop + 0.3, 'signFrame'); m.box(dx + (vert ? 0.3 : 0), dz + (vert ? 0 : 0.3), 0.1, 0.1, yTop, yTop + 0.3, 'signFrame');
    if (k > 40) break;
  }
  return { m, name: 'times' };
}
