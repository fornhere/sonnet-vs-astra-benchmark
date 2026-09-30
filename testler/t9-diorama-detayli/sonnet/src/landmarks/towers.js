// Gökdelen simgeleri: Empire State, Chrysler, One World Trade Center, Flatiron, Rockefeller (30 Rock)
import { Model } from './util.js';

const TAU = Math.PI * 2;

export function empireState(P) {
  const s = 0.35, Wl = 9.4, Dl = 4.2, Ht = 43;
  const m = new Model(Wl + 0.6, Dl + 0.6, Ht, s, P);
  const tiers = [
    [0.056, 1.0, 1.0, 'lime2'], [0.14, 0.86, 0.9, 'lime'], [0.29, 0.68, 0.8, 'lime2'], [0.575, 0.56, 0.68, 'lime'],
    [0.63, 0.46, 0.58, 'lime2'], [0.68, 0.37, 0.48, 'lime'], [0.715, 0.31, 0.4, 'lime2'],
  ];
  let y = 0;
  for (const [top, wf, df, mat] of tiers) { m.box(0, 0, Wl * wf, Dl * df, y * Ht, top * Ht, mat); m.box(0, 0, Wl * wf + s * 0.5, Dl * df + s * 0.5, top * Ht - s, top * Ht, 'limeP'); y = top; }
  // 86. kat gözlem güvertesi (ince çıkıntı) + kule
  m.box(0, 0, Wl * 0.34, Dl * 0.44, 0.715 * Ht, 0.735 * Ht, 'limeP');
  // taç: gece aydınlatmalı
  const crown = [[0.79, 0.20, 0.27], [0.83, 0.15, 0.20], [0.858, 0.10, 0.13]];
  y = 0.735; for (const [top, wf, df] of crown) { m.box(0, 0, Wl * wf, Dl * df, y * Ht, top * Ht, 'steelUp'); y = top; }
  // anten: kalınlık 1 voxel
  m.box(0, 0, s * 1.4, s * 1.4, 0.858 * Ht, 0.94 * Ht, 'chrome'); m.box(0, 0, s, s, 0.94 * Ht, Ht, 'chrome');
  // yan kuleler: basamaklarda küçük köşe pilasterleri
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) m.box(sx * Wl * 0.5 * 0.86, sz * Dl * 0.5 * 0.9, s * 1.2, s * 1.2, 0.056 * Ht, 0.16 * Ht, 'limeP');
  return { m, name: 'esb' };
}

export function chrysler(P) {
  const s = 0.28, L = 4.1, Ht = 31;
  const m = new Model(L + 0.4, L + 0.4, Ht, s, P);
  const tiers = [[0.06, 1.0, 'lime2'], [0.17, 0.86, 'lime'], [0.32, 0.70, 'lime2'], [0.53, 0.58, 'lime'], [0.68, 0.49, 'lime2']];
  let y = 0;
  for (const [top, f, mat] of tiers) { m.box(0, 0, L * f, L * f, y * Ht, top * Ht, mat); m.box(0, 0, L * f + s * 0.5, L * f + s * 0.5, top * Ht - s, top * Ht, 'limeP'); y = top; }
  // kartal başları (61. kat köşeleri)
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) { m.box(sx * L * 0.5 * 0.5, sz * L * 0.5 * 0.5, s * 1.6, s * 1.6, 0.665 * Ht, 0.69 * Ht, 'steel'); }
  // çelik taç: 7 kademeli kemer (kare kesit, kademeli daralma) + üçgen pencere dilimleri
  const cy0 = 0.68, cy1 = 0.885, n = 7, R = L * 0.5 * 0.47;
  for (let k = 0; k < n; k++) {
    const ya = cy0 + (cy1 - cy0) * k / n, yb = cy0 + (cy1 - cy0) * (k + 1) / n;
    const r = R * Math.pow(1 - k / (n + 0.5), 0.85);
    const r2 = r * 0.9;
    // her kademe: alt geniş, üst biraz dar (kemer)
    const mid = (ya + yb) / 2 * Ht;
    const cm = k % 2 ? 'steel' : 'chrome'; m.box(0, 0, r * 2, r * 2, ya * Ht, mid, cm); m.box(0, 0, r2 * 2, r2 * 2, mid, yb * Ht, cm);
    // üçgen pencereler dört yüzde
    const nt = k < 2 ? 3 : k < 5 ? 2 : 1; const hT = (yb - ya) * Ht * 0.78;
    for (let f = 0; f < 4; f++) for (let j = 0; j < nt; j++) {
      const along = (-r + (j + 0.5) * (2 * r / nt)); const wT = (2 * r / nt) * 0.62;
      for (let yy = ya * Ht + s * 0.4; yy < ya * Ht + s * 0.4 + hT; yy += s * 0.5) {
        const u = 1 - (yy - (ya * Ht + s * 0.4)) / hT; const hw = wT * 0.5 * u; if (hw < s * 0.35) continue;
        for (let a = along - hw; a <= along + hw; a += s * 0.5) {
          const rr = r + (f === 0 || f === 1 ? 0 : 0);
          const px = f === 0 ? a : f === 1 ? a : f === 2 ? rr - s * 0.55 : -rr + s * 0.55;
          const pz = f === 0 ? rr - s * 0.55 : f === 1 ? -rr + s * 0.55 : a;
          m.set(px, yy, pz, 'crownWin');
        }
      }
    }
  }
  // iğne
  m.box(0, 0, s * 1.5, s * 1.5, cy1 * Ht, 0.93 * Ht, 'chrome'); m.box(0, 0, s, s, 0.93 * Ht, Ht, 'chrome');
  return { m, name: 'chrysler' };
}

export function oneWTC(P) {
  const s = 0.34, S = 3.6, Ht = 52;
  const m = new Model(S + 0.4, S + 0.4, Ht, s, P);
  const yBase = 0.055 * Ht, yRoof = 0.77 * Ht;
  m.box(0, 0, S * 1.06, S * 1.06, 0, yBase, 'wtcBase');
  const n = Math.round((yRoof - yBase) / s);
  for (let i = 0; i < n; i++) {
    const t = i / n; const c = 0.5 * S * t; const y = yBase + i * s;
    for (let z = -S / 2 + s / 2; z < S / 2; z += s) for (let x = -S / 2 + s / 2; x < S / 2; x += s) {
      if (Math.abs(x) + Math.abs(z) <= S - c + 1e-6) m.set(x, y + s * 0.5, z, i === n - 1 ? 'steelDk' : 'wtcGlass');
    }
  }
  // çatı çevresi ve iğne
  m.box(0, 0, S * 0.36, S * 0.36, yRoof, yRoof + s * 2, 'steelDk');
  m.box(0, 0, s * 2, s * 2, yRoof + s * 2, 0.88 * Ht, 'steel');
  m.box(0, 0, s, s, 0.88 * Ht, Ht - s, 'chrome'); m.box(0, 0, s, s, Ht - s, Ht, 'flame');
  return { m, name: 'wtc' };
}

export function flatiron(P, ring) {
  // ring: hücre birimi, merkeze göre. Silüet tanınsın diye taban (doğu-batı) 1.6× genişletilir, tüm bina büyütülür.
  const s = 0.16, Ht = 9.6;
  // Gerçek yerleşim (5. Cadde/Broadway/23. Sokak üçgeni): kuzeye bakan sivri burun, güneyde geniş taban — abartılı oranla
  const R = [[-0.22, -3.0], [0.22, -3.0], [1.9, 2.7], [-1.9, 2.7]].map(([x, z]) => [x * 1.0, z * 1.0]);
  let mx = 0, mz = 0; for (const [x, z] of R) { mx = Math.max(mx, Math.abs(x)); mz = Math.max(mz, Math.abs(z)); }
  const m = new Model(mx * 2 + 0.8, mz * 2 + 0.8, Ht, s, P);
  m.prism(R, 0, Ht * 0.13, 'buffDk');
  m.prism(R, Ht * 0.13, Ht - s * 4, 'buff');
  // kornişler: alt bant + üst saçak (dışa taşan)
  m.prism(R.map(([x, z]) => [x * 1.03, z * 1.02]), Ht * 0.13 - s, Ht * 0.13 + s, 'buffLt');
  m.prism(R.map(([x, z]) => [x * 1.05, z * 1.03]), Ht - s * 4, Ht - s * 2, 'buffLt');
  m.prism(R.map(([x, z]) => [x * 1.03, z * 1.02]), Ht - s * 2, Ht - s, 'buffDk');
  m.prism(R, Ht - s, Ht, 'rooftop');
  return { m, name: 'flatiron' };
}

export function rockefeller(P) {
  const s = 0.25, Wl = 3.6, Dl = 2.3, Ht = 25;
  const m = new Model(Wl + 0.4, Dl + 0.4, Ht, s, P);
  const tiers = [[0.24, 1.0, 1.0], [0.44, 0.86, 0.94], [0.62, 0.7, 0.86], [0.78, 0.55, 0.76], [0.9, 0.42, 0.64], [0.97, 0.3, 0.5]];
  let y = 0;
  tiers.forEach(([top, wf, df], i) => { m.box(0, 0, Wl * wf, Dl * df, y * Ht, top * Ht, i % 2 ? 'lime' : 'lime2'); m.box(0, 0, Wl * wf + s * 0.5, Dl * df + s * 0.5, top * Ht - s, top * Ht, 'limeP'); y = top; });
  m.box(0, 0, Wl * 0.22, Dl * 0.36, 0.97 * Ht, Ht, 'steelUp');
  return { m, name: 'rockefeller' };
}
