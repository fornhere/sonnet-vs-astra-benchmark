import * as THREE from 'three';

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const cv = (w, h = w) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
const mix = (a, b, t) => a + (b - a) * t;
const hex2rgb = (h) => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
const rgbMix = (c1, c2, t) => `rgb(${mix(c1[0], c2[0], t) | 0},${mix(c1[1], c2[1], t) | 0},${mix(c1[2], c2[2], t) | 0})`;

export function tex(canvas, { srgb = true, repeat = null, aniso = 8 } = {}) {
  const t = new THREE.CanvasTexture(canvas);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(repeat[0], repeat[1]); }
  t.anisotropy = aniso;
  return t;
}

/* Fırçalı metal: satır başına rastgele gri → dairesel çizgiler (lathe v ekseni boyunca) */
export function brushedMaps(aniso) {
  const r = rng(7);
  const c = cv(8, 512), g = c.getContext('2d');
  let v = 0.5;
  for (let y = 0; y < 512; y++) {
    v = mix(v, r(), 0.55);
    const k = 110 + v * 120;
    g.fillStyle = `rgb(${k},${k},${k})`;
    g.fillRect(0, y, 8, 1);
  }
  const t = tex(c, { srgb: false, repeat: [1, 0.32], aniso });
  return t;
}

/* Perlage: üst üste binen daire desenleri (ana plaka) */
export function perlageTexture(aniso) {
  const c = cv(512), g = c.getContext('2d');
  g.fillStyle = '#9aa0a8'; g.fillRect(0, 0, 512, 512);
  const step = 512 / 40, rowStep = 512 / 46, R = 10;
  for (let j = -3; j < 50; j++) for (let i = -3; i < 44; i++) {
    const x = i * step + (((j % 2) + 2) % 2) * step / 2, y = j * rowStep;
    const gr = g.createRadialGradient(x, y, 1, x, y, R);
    gr.addColorStop(0, 'rgba(255,255,255,.4)');
    gr.addColorStop(0.55, 'rgba(190,196,204,.25)');
    gr.addColorStop(0.9, 'rgba(70,76,84,.4)');
    gr.addColorStop(1, 'rgba(255,255,255,.18)');
    g.fillStyle = gr; g.beginPath(); g.arc(x, y, R, 0, 7); g.fill();
  }
  return tex(c, { repeat: [2, 2], aniso });
}

/* Côtes de Genève: köprüler için şerit deseni */
export function stripeTexture(aniso, base = '#b9bfc7') {
  const c = cv(256, 64), g = c.getContext('2d');
  const b = hex2rgb(base);
  for (let x = 0; x < 256; x++) {
    const p = (x % 32) / 32;
    const k = 0.55 + 0.45 * Math.sin(p * Math.PI);
    g.fillStyle = rgbMix([b[0] * 0.35, b[1] * 0.35, b[2] * 0.35], [Math.min(255, b[0] * 1.15), Math.min(255, b[1] * 1.15), Math.min(255, b[2] * 1.15)], k);
    g.fillRect(x, 0, 1, 64);
  }
  return tex(c, { repeat: [2.2, 1], aniso });
}

/* Kadran: sunburst + baskı. Altta 6 hizasında gün-gece penceresi delik olarak açılır. */
export const DIAL = { R: 1.75, winY: 0.44, winR: 0.24 };
export function dialTexture(f, aniso, size = 2048) {
  const c = cv(size), g = c.getContext('2d');
  const R = size / 2, cx = R, cy = R;
  const d = f.dial, rand = rng(31);
  const dark = hex2rgb(d.dark), light = hex2rgb(d.light);
  g.fillStyle = d.base; g.fillRect(0, 0, size, size);

  // sunburst
  const cg = g.createConicGradient(-Math.PI / 2, cx, cy);
  const N = 720;
  let n = 0.5;
  for (let i = 0; i <= N; i++) {
    const a = (i / N) * Math.PI * 2;
    n = mix(n, rand(), 0.35);
    const lobes = 0.5 + 0.5 * Math.cos(2 * (a - 0.7));
    const v = Math.max(0, Math.min(1, 0.18 + lobes * 0.5 + (n - 0.5) * 0.55));
    cg.addColorStop(i / N, rgbMix(dark, light, v));
  }
  g.fillStyle = cg; g.beginPath(); g.arc(cx, cy, R, 0, 7); g.fill();
  // ince ışınlar
  g.save(); g.translate(cx, cy);
  for (let i = 0; i < 1400; i++) {
    const a = rand() * Math.PI * 2;
    g.strokeStyle = rand() > 0.5 ? 'rgba(255,255,255,.035)' : 'rgba(0,0,0,.07)';
    g.lineWidth = 1 + rand() * 1.4;
    g.beginPath(); g.moveTo(Math.cos(a) * R * 0.05, Math.sin(a) * R * 0.05); g.lineTo(Math.cos(a) * R, Math.sin(a) * R); g.stroke();
  }
  g.restore();
  // kenar vinyeti
  const vg = g.createRadialGradient(cx, cy, R * 0.55, cx, cy, R);
  vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, d.edge + 'cc');
  g.fillStyle = vg; g.fillRect(0, 0, size, size);

  // dakika izi
  g.save(); g.translate(cx, cy);
  for (let i = 0; i < 60; i++) {
    const a = (i / 60) * Math.PI * 2 - Math.PI / 2;
    const five = i % 5 === 0;
    const r0 = R * (five ? 0.815 : 0.845), r1 = R * 0.895;
    g.strokeStyle = five ? d.ink : d.soft;
    g.lineWidth = five ? size * 0.0042 : size * 0.0022;
    g.beginPath(); g.moveTo(Math.cos(a) * r0, Math.sin(a) * r0); g.lineTo(Math.cos(a) * r1, Math.sin(a) * r1); g.stroke();
  }
  // 12 saat üçgeni (vurgu)
  g.fillStyle = f.accent;
  g.beginPath(); g.moveTo(0, -R * 0.905); g.lineTo(-R * 0.03, -R * 0.845); g.lineTo(R * 0.03, -R * 0.845); g.closePath(); g.fill();
  g.restore();

  // yazılar
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillStyle = d.ink;
  g.font = `italic ${size * 0.062}px "Instrument Serif", serif`;
  g.fillText('Meridian', cx, cy - R * 0.4);
  g.font = `500 ${size * 0.0155}px Inter, sans-serif`;
  g.letterSpacing = size * 0.0075 + 'px';
  g.fillStyle = d.soft;
  g.fillText('HALCYON', cx + size * 0.004, cy - R * 0.5);
  g.fillText('GÜNEŞ KALİBRESİ H-01', cx + size * 0.004, cy - R * 0.28);
  g.fillText('100 M', cx + R * 0.56, cy + size * 0.003);
  g.letterSpacing = '0px';

  // gün-gece penceresi çerçevesi
  const wy = cy + R * DIAL.winY, wr = R * DIAL.winR;
  g.save(); g.translate(cx, wy);
  const ring = g.createRadialGradient(0, 0, wr, 0, 0, wr * 1.28);
  ring.addColorStop(0, 'rgba(0,0,0,.65)'); ring.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = ring; g.beginPath(); g.arc(0, 0, wr * 1.28, 0, 7); g.fill();
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2 - Math.PI / 2;
    const q = i % 6 === 0;
    g.strokeStyle = q ? f.accent : d.soft;
    g.lineWidth = q ? size * 0.0032 : size * 0.0018;
    const r0 = wr * (q ? 1.19 : 1.22), r1 = wr * 1.3;
    g.beginPath(); g.moveTo(Math.cos(a) * r0, Math.sin(a) * r0); g.lineTo(Math.cos(a) * r1, Math.sin(a) * r1); g.stroke();
  }
  g.fillStyle = f.accent;
  g.beginPath(); g.moveTo(0, -wr * 1.04); g.lineTo(-wr * 0.09, -wr * 1.2); g.lineTo(wr * 0.09, -wr * 1.2); g.closePath(); g.fill();
  g.fillStyle = d.soft; g.font = `500 ${size * 0.0125}px Inter, sans-serif`; g.letterSpacing = size * 0.006 + 'px';
  g.fillText('GÜN · GECE', 0, wr * 1.55);
  g.restore();

  // pencereyi delik yap
  g.globalCompositeOperation = 'destination-out';
  g.fillStyle = '#000'; g.beginPath(); g.arc(cx, wy, wr, 0, 7); g.fill();
  g.globalCompositeOperation = 'source-over';
  return tex(c, { aniso });
}

/* Bezel halkası: 24 saat ölçeği */
export function bezelTexture(f, aniso, size = 2048) {
  const c = cv(size), g = c.getContext('2d');
  const R = size / 2;
  g.fillStyle = f.bezelBase; g.fillRect(0, 0, size, size);
  // ince fırça
  const r = rng(5);
  g.save(); g.translate(R, R);
  for (let i = 0; i < 220; i++) {
    g.strokeStyle = r() > 0.5 ? 'rgba(255,255,255,.06)' : 'rgba(0,0,0,.06)';
    g.lineWidth = 1 + r() * 2; g.beginPath(); g.arc(0, 0, R * (0.78 + r() * 0.22), 0, 7); g.stroke();
  }
  g.fillStyle = f.bezelInk; g.strokeStyle = f.bezelInk;
  g.textAlign = 'center'; g.textBaseline = 'middle';
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2;
    g.save(); g.rotate(a);
    const big = i % 3 === 0;
    g.lineWidth = size * (big ? 0.0055 : 0.003);
    g.beginPath(); g.moveTo(0, -R * (big ? 0.845 : 0.875)); g.lineTo(0, -R * 0.93); g.stroke();
    if (big) {
      g.font = `500 ${size * 0.03}px Inter, sans-serif`;
      g.fillText(String(i === 0 ? 24 : i), 0, -R * 0.965 + size * 0.006);
    }
    g.restore();
  }
  g.restore();
  // dış kenarda sıfır noktası
  return tex(c, { aniso });
}

/* Gün-gece diski */
export function discTexture(rise, set, f, aniso, size = 1024) {
  const c = cv(size), g = c.getContext('2d');
  const R = size / 2, cx = R, cy = R;
  const ang = (t) => (t / 1440) * Math.PI * 2 - Math.PI / 2; // 00:00 üstte
  // gece
  const ng = g.createRadialGradient(cx, cy, 0, cx, cy, R);
  ng.addColorStop(0, '#0b1230'); ng.addColorStop(1, '#03060f');
  g.fillStyle = ng; g.fillRect(0, 0, size, size);
  const r = rng(11);
  for (let i = 0; i < 260; i++) {
    const a = r() * Math.PI * 2, d = Math.sqrt(r()) * R * 0.98;
    g.fillStyle = `rgba(255,255,255,${0.15 + r() * 0.75})`;
    g.beginPath(); g.arc(cx + Math.cos(a) * d, cy + Math.sin(a) * d, 1 + r() * 2.6, 0, 7); g.fill();
  }
  // gün yayı
  const a0 = ang(rise), a1 = ang(set);
  const dg = g.createRadialGradient(cx, cy, R * 0.1, cx, cy, R);
  dg.addColorStop(0, '#ffe7a3'); dg.addColorStop(0.55, '#ffb347'); dg.addColorStop(1, '#ff7a3a');
  g.fillStyle = dg; g.beginPath(); g.moveTo(cx, cy); g.arc(cx, cy, R * 1.02, a0, a1); g.closePath(); g.fill();
  // şafak/alacakaranlık halesi
  for (const a of [a0, a1]) {
    g.strokeStyle = 'rgba(255,255,255,.9)'; g.lineWidth = size * 0.006;
    g.beginPath(); g.moveTo(cx + Math.cos(a) * R * 0.5, cy + Math.sin(a) * R * 0.5); g.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R); g.stroke();
  }
  // güneş
  const noon = (rise + set) / 2, sa = ang(noon);
  const sx = cx + Math.cos(sa) * R * 0.66, sy = cy + Math.sin(sa) * R * 0.66;
  const sg = g.createRadialGradient(sx, sy, 0, sx, sy, R * 0.3);
  sg.addColorStop(0, 'rgba(255,255,255,1)'); sg.addColorStop(0.35, 'rgba(255,244,200,.95)'); sg.addColorStop(1, 'rgba(255,200,90,0)');
  g.fillStyle = sg; g.beginPath(); g.arc(sx, sy, R * 0.3, 0, 7); g.fill();
  g.fillStyle = '#fffdf2'; g.beginPath(); g.arc(sx, sy, R * 0.13, 0, 7); g.fill();
  // ay
  const ma = ang((noon + 720) % 1440);
  const mx = cx + Math.cos(ma) * R * 0.62, my = cy + Math.sin(ma) * R * 0.62;
  g.fillStyle = '#e8eefc'; g.beginPath(); g.arc(mx, my, R * 0.12, 0, 7); g.fill();
  g.globalCompositeOperation = 'destination-out';
  g.beginPath(); g.arc(mx + R * 0.055, my - R * 0.03, R * 0.1, 0, 7); g.fill();
  g.globalCompositeOperation = 'source-over';
  // saat çizgileri
  for (const h of [0, 6, 12, 18]) {
    const a = ang(h * 60);
    g.strokeStyle = 'rgba(255,255,255,.55)'; g.lineWidth = size * 0.004;
    g.beginPath(); g.moveTo(cx + Math.cos(a) * R * 0.9, cy + Math.sin(a) * R * 0.9); g.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R); g.stroke();
  }
  return tex(c, { aniso });
}

/* Kayış: renk + bump. u boyunca tekrar, v genişlik */
export function strapTextures(f, aniso) {
  const W = 512, H = 256;
  const c = cv(W, H), g = c.getContext('2d');
  const b = cv(W, H), h = b.getContext('2d');
  g.fillStyle = f.strap.base; g.fillRect(0, 0, W, H);
  h.fillStyle = '#808080'; h.fillRect(0, 0, W, H);
  // çapraz dokuma
  for (let i = -H; i < W + H; i += 6) {
    g.strokeStyle = 'rgba(255,255,255,.05)'; g.lineWidth = 2;
    g.beginPath(); g.moveTo(i, 0); g.lineTo(i + H, H); g.stroke();
    h.strokeStyle = 'rgba(255,255,255,.35)'; h.lineWidth = 2.4;
    h.beginPath(); h.moveTo(i, 0); h.lineTo(i + H, H); h.stroke();
    h.strokeStyle = 'rgba(0,0,0,.3)'; h.lineWidth = 2;
    h.beginPath(); h.moveTo(i + 3, 0); h.lineTo(i + H + 3, H); h.stroke();
  }
  // kenar koyulaştırma + dikiş
  const eg = g.createLinearGradient(0, 0, 0, H);
  eg.addColorStop(0, f.strap.edge); eg.addColorStop(0.06, 'rgba(0,0,0,0)'); eg.addColorStop(0.94, 'rgba(0,0,0,0)'); eg.addColorStop(1, f.strap.edge);
  g.fillStyle = eg; g.fillRect(0, 0, W, H);
  g.strokeStyle = f.strap.stitch; g.lineWidth = 3.4; g.setLineDash([14, 9]);
  for (const y of [H * 0.085, H * 0.915]) { g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
  h.strokeStyle = '#000'; h.lineWidth = 5; h.setLineDash([14, 9]);
  for (const y of [H * 0.085, H * 0.915]) { h.beginPath(); h.moveTo(0, y); h.lineTo(W, y); h.stroke(); }
  const map = tex(c, { repeat: [7, 1], aniso });
  const bump = tex(b, { srgb: false, repeat: [7, 1], aniso });
  return { map, bump };
}
