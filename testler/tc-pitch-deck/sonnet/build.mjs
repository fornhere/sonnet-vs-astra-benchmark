// Rota — tohum turu sunumu. `node build.mjs` -> deck.html (statik, kendi kendine yeten)
import fs from 'node:fs';

const TOTAL = 12;
const css = fs.readFileSync(new URL('./styles.css', import.meta.url), 'utf8');

/* ---------- yardımcılar ---------- */
const tr = (n, d = 0) => {
  const s = n.toFixed(d);
  const [i, f] = s.split('.');
  const g = i.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return f ? `${g},${f}` : g;
};
const pad = (n) => String(n).padStart(2, '0');

const glyph = (c = 'var(--orange)', bg = 'none') => `
<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="23" fill="${bg}" stroke="${c}" stroke-width="2"/>
<path d="M14 35H23Q29 35 29 29V22Q29 16 35 16" stroke="${c}" stroke-width="3.4" stroke-linecap="round"/>
<circle cx="14" cy="35" r="3.2" fill="${c}"/><circle cx="35" cy="16" r="3.2" fill="${c}"/></svg>`;

const ICON = {
  route: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="39" r="4.5"/><circle cx="38" cy="10" r="4.5"/><path d="M13.5 39H26a6 6 0 0 0 6-6V22a6 6 0 0 1 6-6.5"/></svg>`,
  box: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M24 5 41 14v20L24 43 7 34V14z"/><path d="M7 14l17 9 17-9M24 23v20"/><path d="M15.5 9.5l17 9" stroke-dasharray="1 5"/></svg>`,
  clock: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="21" cy="27" r="16"/><path d="M21 17v10l7 4"/><path d="M35 7a13 13 0 0 1 7 8M39 3a17 17 0 0 1 8 11"/></svg>`,
  code: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M17 14 7 24l10 10M31 14l10 10-10 10M27 9l-6 30"/></svg>`,
  bars: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 41h38M10 34v-8M20 34V18M30 34V23M40 34V9"/><path d="M33 9h7v7"/></svg>`,
};

function chrome(n, section, dark) {
  return `
<div class="eyebrow"><b>${pad(n)}</b><i></i>${section}</div>
<div class="foot"><div class="brand">${glyph(dark ? '#f4efe5' : '#10151c')}<span>Rota · Tohum turu 2026</span></div><div>${pad(n)} / ${TOTAL}</div></div>`;
}

const slides = [];
const add = (n, cls, section, body, opts = {}) => {
  slides.push(`
<div class="frame"><section class="slide ${cls}" id="s${n}">${opts.nochrome ? '' : chrome(n, section, cls.includes('dark'))}${body}</section></div>`);
};

// köşeleri yuvarlatılmış poliline yolu
function rpath(pts, r = 46) {
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [p0, p1, p2] = [pts[i - 1], pts[i], pts[i + 1]];
    const l1 = Math.hypot(p0[0] - p1[0], p0[1] - p1[1]);
    const l2 = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);
    const rr = Math.min(r, l1 / 2, l2 / 2);
    const a = [p1[0] + ((p0[0] - p1[0]) / l1) * rr, p1[1] + ((p0[1] - p1[1]) / l1) * rr];
    const b = [p1[0] + ((p2[0] - p1[0]) / l2) * rr, p1[1] + ((p2[1] - p1[1]) / l2) * rr];
    d += ` L${a[0].toFixed(1)} ${a[1].toFixed(1)} Q${p1[0]} ${p1[1]} ${b[0].toFixed(1)} ${b[1].toFixed(1)}`;
  }
  const L = pts[pts.length - 1];
  return d + ` L${L[0]} ${L[1]}`;
}
function rng(seed) { return () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

/* ============ 1 · KAPAK ============ */
{
  const A = [120, 940], B = [820, 200];
  const opt = [A, [120, 780], [300, 600], [560, 600], [700, 460], [700, 340], [820, 220], B];
  const alt1 = [A, [420, 940], [580, 780], [850, 780], [850, 560], [850, 200], B].map((p) => p);
  const alt1b = [A, [420, 940], [580, 780], [860, 780], [860, 420], B];
  const alt2 = [A, [120, 620], [290, 450], [290, 200], B];
  const r = rng(7);
  let cons = '';
  const nodes = [];
  for (let i = 0; i < 46; i++) nodes.push([60 + r() * 860, 90 + r() * 900]);
  nodes.forEach((p, i) => {
    const near = nodes.map((q, j) => [j, Math.hypot(p[0] - q[0], p[1] - q[1])]).filter((x) => x[0] !== i).sort((a, b) => a[1] - b[1]).slice(0, 2);
    near.forEach(([j]) => { if (j > i) cons += `<line x1="${p[0].toFixed(0)}" y1="${p[1].toFixed(0)}" x2="${nodes[j][0].toFixed(0)}" y2="${nodes[j][1].toFixed(0)}" stroke="#f4efe5" stroke-opacity=".08" stroke-width="1.5"/>`; });
    cons += `<circle cx="${p[0].toFixed(0)}" cy="${p[1].toFixed(0)}" r="${(3 + r() * 3).toFixed(1)}" fill="#f4efe5" fill-opacity=".22"/>`;
  });
  const stations = [[120, 780], [300, 600], [560, 600], [700, 460], [700, 340]];
  const chip = (x, y, t, col, w) => `<g transform="translate(${x} ${y})"><rect x="0" y="-22" width="${w}" height="44" rx="22" fill="#0c1016" stroke="${col}" stroke-width="2"/><text x="${w / 2}" y="7" text-anchor="middle" font-size="21" fill="${col}" font-family="Rota Mono, monospace" letter-spacing="1.5">${t}</text></g>`;
  const map = `
<svg class="abs" style="left:940px;top:0" width="980" height="1080" viewBox="0 0 980 1080" fill="none">
  ${cons}
  <path d="${rpath(alt2, 50)}" stroke="#6b7684" stroke-width="7" stroke-dasharray="4 16" stroke-linecap="round"/>
  <path d="${rpath(alt1b, 50)}" stroke="#6b7684" stroke-width="7" stroke-dasharray="4 16" stroke-linecap="round"/>
  <path d="${rpath(opt, 52)}" stroke="#ee5a2c" stroke-opacity=".16" stroke-width="44" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="${rpath(opt, 52)}" stroke="#ee5a2c" stroke-opacity=".3" stroke-width="26" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="${rpath(opt, 52)}" stroke="#ff6a3d" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
  ${stations.map((s) => `<circle cx="${s[0]}" cy="${s[1]}" r="13" fill="#0c1016" stroke="#f4efe5" stroke-width="5"/>`).join('')}
  <g transform="translate(${A[0]} ${A[1]})"><circle r="30" fill="#ee5a2c" fill-opacity=".25"/><circle r="19" fill="#f4efe5"/><rect x="-8" y="-8" width="16" height="16" rx="3" fill="#0c1016"/></g>
  <g transform="translate(${B[0]} ${B[1]})"><circle r="30" fill="#4fd6b0" fill-opacity=".25"/><circle r="19" fill="#4fd6b0"/><path d="M-8 0l5.5 5.5L9 -6" stroke="#0c1016" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></g>
  ${chip(160, 940, 'DEPO', '#f4efe5', 100)}
  ${chip(640, 128, 'MÜŞTERİ', '#4fd6b0', 138)}
  ${chip(342, 640, 'ROTA ÖNERİSİ', '#ff6a3d', 210)}
  ${chip(596, 828, 'GECİKME RİSKİ', '#b8c0cb', 226)}
  ${chip(330, 330, 'YÜKSEK MALİYET', '#b8c0cb', 250)}
</svg>`;
  add(1, 'dark', '', `
${map}
<div class="abs" style="left:120px;top:96px;display:flex;align-items:center;gap:20px">
  <div style="width:64px;height:64px">${glyph('#ff6a3d')}</div>
  <div style="font-family:var(--serif);font-size:56px;font-weight:500;letter-spacing:-.01em">Rota</div>
</div>
<div class="abs" style="left:120px;top:330px;width:900px">
  <div class="mono" style="font-size:22px;letter-spacing:.18em;color:#ff9a76;margin-bottom:36px">TOHUM YATIRIM TURU · 1,2 MİLYON USD</div>
  <h1 style="font-size:132px;line-height:1.0">Her siparişin<br><em style="color:#ff6a3d">en doğru yolu.</em></h1>
  <p class="lead" style="margin-top:44px;width:760px;color:#b3bbc6">Türkiye’deki KOBİ e-ticaret satıcıları için yapay zekâ destekli kargo ve teslimat optimizasyonu.</p>
</div>
<div class="abs mono" style="left:120px;bottom:64px;font-size:20px;letter-spacing:.14em;color:#98a1ad">YATIRIMCI SUNUMU · EYLÜL 2026</div>
`, { nochrome: true });
}

/* ============ 2 · SORUN ============ */
{
  const W = 1680, H = 350, cols = 6;
  const xs = Array.from({ length: cols }, (_, i) => (i + 0.5) * (W / cols));
  const ys = [332, 314, 270, 204, 118, 40];
  const line = xs.map((x, i) => `${i ? 'L' : 'M'}${x} ${ys[i]}`).join(' ');
  // yumuşak eğri
  let d = `M${xs[0]} ${ys[0]}`;
  for (let i = 1; i < cols; i++) { const cx = (xs[i - 1] + xs[i]) / 2; d += ` C${cx} ${ys[i - 1]} ${cx} ${ys[i]} ${xs[i]} ${ys[i]}`; }
  const area = d + ` L${xs[cols - 1]} ${H} L${xs[0]} ${H} Z`;
  const steps = [
    ['Sipariş geliyor', 'Ödeme alındı, saat işlemeye başladı.'],
    ['Elle seçim', 'Sekmeler, tablolar, iç güdü.'],
    ['Yanlış kargo', 'O güzergâhta pahalı ya da yavaş.'],
    ['Gecikme', 'Kimse haber vermez; satıcı da geç öğrenir.'],
    ['Şikâyet ve iade', 'Ters lojistik ve destek yükü.'],
    ['Müşteri kaybı', 'Kötü yorum, geri gelmeyen alıcı.'],
  ];
  add(2, 'light', 'Sorun', `
<h2 class="abs" style="left:120px;top:150px;width:1150px">Küçük satıcı her gönderide <em>kumar</em> oynuyor.</h2>
<div class="abs" style="left:1330px;top:168px;width:470px">
  <p style="font-size:29px;color:var(--muted)">Kargo firmasını, fiyatı ve teslimat süresini elle seçiyor. Yanlış seçimin bedelini iade ve gecikme olarak ödüyor.</p>
</div>
<div class="abs" style="left:120px;top:388px;width:${W}px">
  <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none">
    <defs><linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ee5a2c" stop-opacity=".55"/><stop offset="1" stop-color="#ee5a2c" stop-opacity=".02"/></linearGradient></defs>
    ${[0, 1, 2, 3].map((k) => `<line x1="0" x2="${W}" y1="${40 + k * 110}" y2="${40 + k * 110}" stroke="rgba(16,21,28,.10)" stroke-dasharray="3 9"/>`).join('')}
    <path d="${area}" fill="url(#g2)"/>
    <path d="${d}" stroke="#ee5a2c" stroke-width="7" stroke-linecap="round"/>
    ${xs.map((x, i) => `<line x1="${x}" x2="${x}" y1="${ys[i]}" y2="${H}" stroke="rgba(16,21,28,.25)" stroke-dasharray="2 8"/>
      <circle cx="${x}" cy="${ys[i]}" r="${i === cols - 1 ? 20 : 15}" fill="${i === cols - 1 ? '#ee5a2c' : '#f4efe5'}" stroke="#ee5a2c" stroke-width="5"/>
      ${i === cols - 1 ? `<path d="M${x - 7} ${ys[i] - 7}l14 14M${x + 7} ${ys[i] - 7}l-14 14" stroke="#f4efe5" stroke-width="4" stroke-linecap="round"/>` : ''}`).join('')}
    <text x="0" y="24" font-size="20" fill="#5d6570" font-family="Rota Mono, monospace" letter-spacing="2.5">SATICIYA MALİYET ↑</text>
  </svg>
</div>
<div class="abs" style="left:120px;top:764px;width:${W}px;display:grid;grid-template-columns:repeat(6,1fr)">
  ${steps.map((s, i) => `<div style="padding:0 14px;text-align:center"><div class="mono" style="font-size:19px;color:var(--orange);letter-spacing:.1em">${pad(i + 1)}</div><div style="font-size:28px;font-weight:650;margin:2px 0 4px;white-space:nowrap">${s[0]}</div><div style="font-size:22px;line-height:1.3;color:var(--muted)">${s[1]}</div></div>`).join('')}
</div>
`);
}

/* ============ 3 · ÇÖZÜM ============ */
{
  const mods = [
    ['route', 'Kargo seçimi', 'Fiyat, süre ve güvenilirliği birlikte tartar; her sipariş için en uygun kargo firmasını seçer.'],
    ['box', 'Paketleme önerisi', 'Ürüne uygun kutu ve koruma önerir; hasarı ve gereksiz hacim maliyetini azaltır.'],
    ['clock', 'Gecikme tahmini', 'Paket yola çıkmadan gecikme riskini gösterir; sorun olmadan önce uyarır.'],
  ];
  add(3, 'light', 'Çözüm', `
<h2 class="abs" style="left:120px;top:150px;width:1500px">Sipariş başına tek karar: <em>Rota verir.</em></h2>

<!-- giriş kartı -->
<div class="abs card" style="left:120px;top:414px;width:400px;height:500px;padding:36px 34px">
  <div class="mono" style="font-size:19px;letter-spacing:.14em;color:var(--muted)">GİREN</div>
  <div style="font-family:var(--serif);font-size:48px;margin:6px 0 26px;line-height:1.05">Yeni sipariş</div>
  ${['Ürün ve ağırlık / hacim', 'Teslimat adresi', 'Müşterinin süre beklentisi', 'Satıcının maliyet hedefi'].map((t) => `<div style="display:flex;align-items:center;gap:14px;padding:14px 0;border-top:2px dashed var(--line);font-size:26px"><span style="width:14px;height:14px;border-radius:50%;background:var(--ink);flex:none"></span>${t}</div>`).join('')}
</div>

<!-- bağlantılar + merkez -->
<svg class="abs" style="left:520px;top:364px" width="1000" height="620" viewBox="0 0 1000 620" fill="none">
  <defs><marker id="ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M1 1L9 5L1 9z" fill="#ee5a2c"/></marker></defs>
  <path d="M0 300 H120" stroke="#10151c" stroke-width="4"/>
  ${[102, 498].map((y) => `<path d="${rpath([[300, 300], [420, 300], [420, y], [640, y]], 40)}" stroke="#ee5a2c" stroke-width="5" marker-end="url(#ar)"/>`).join('')}<path d="M300 300H640" stroke="#ee5a2c" stroke-width="5" marker-end="url(#ar)"/>
  <circle cx="210" cy="300" r="112" fill="#10151c"/>
  <circle cx="210" cy="300" r="126" stroke="#10151c" stroke-opacity=".18" stroke-width="2"/>
  <circle cx="210" cy="300" r="142" stroke="#10151c" stroke-opacity=".10" stroke-width="2" stroke-dasharray="2 8"/>
</svg>
<div class="abs" style="left:630px;top:576px;width:200px;text-align:center;color:var(--paper)">
  <div style="width:60px;height:60px;margin:0 auto 6px">${glyph('#ff6a3d')}</div>
  <div style="font-family:var(--serif);font-size:52px;line-height:1">Rota</div>
  <div class="mono" style="font-size:16px;letter-spacing:.14em;color:#b3bbc6;margin-top:6px">MOTOR</div>
</div>

<!-- çıktılar -->
<div class="abs" style="left:1160px;top:380px;width:640px;display:flex;flex-direction:column;gap:26px">
  ${mods.map((m, i) => `<div class="card" style="padding:26px 32px;display:flex;gap:26px;align-items:center;height:172px;${i === 0 ? '' : ''}">
    <div style="width:74px;height:74px;flex:none;color:var(--orange)">${ICON[m[0]]}</div>
    <div><div style="font-size:36px;font-weight:650;letter-spacing:-.01em">${m[1]}</div><div style="font-size:25px;line-height:1.3;color:var(--muted);margin-top:4px">${m[2]}</div></div>
  </div>`).join('')}
</div>
`);
}

/* ============ 4 · ÜRÜN ============ */
{
  const opt = (name, price, days, risk, tag, best) => {
    const seg = [1, 2, 3].map((k) => `<span style="width:30px;height:10px;border-radius:5px;background:${k <= risk ? (risk === 3 ? '#c23a2b' : '#0e7a63') : 'rgba(16,21,28,.14)'}"></span>`).join('');
    return `<div style="display:flex;align-items:center;gap:20px;padding:15px 26px;border-radius:20px;border:${best ? '3px solid #0e7a63' : '2px solid rgba(16,21,28,.14)'};background:${best ? 'rgba(14,122,99,.09)' : 'rgba(255,255,255,.6)'};position:relative">
      <div style="width:200px"><div style="font-size:31px;font-weight:650">${name}</div><div class="mono" style="font-size:17px;letter-spacing:.08em;color:#5d6570;margin-top:2px">${tag}</div></div>
      <div style="width:150px;font-size:36px;font-weight:650;font-variant-numeric:tabular-nums">${price}</div>
      <div style="width:120px;font-size:27px">${days}</div>
      <div style="flex:1"><div style="display:flex;gap:6px">${seg}</div><div style="font-size:19px;color:#5d6570;margin-top:6px">Gecikme riski: ${['', 'Düşük', 'Orta', 'Yüksek'][risk]}</div></div>
      ${best ? `<div style="position:absolute;right:22px;top:-18px;background:#0e7a63;color:#fff;font-size:19px;font-weight:650;letter-spacing:.06em;padding:5px 16px;border-radius:999px">ROTA ÖNERİSİ</div>` : ''}
    </div>`;
  };
  add(4, 'light', 'Ürün', `
<h2 class="abs" style="left:120px;top:150px;width:760px;font-size:80px">Satıcı bir bakışta <em>karar</em> görüyor.</h2>
<div class="abs" style="left:120px;top:470px;width:640px;display:flex;flex-direction:column;gap:34px">
  ${[['1', 'En ucuz her zaman en iyi değil', 'Rota fiyatı, süreyi ve gecikme riskini aynı ekranda tartar.'], ['2', 'Paketleme tek dokunuşta', 'Kutu ve koruma önerisi siparişle birlikte gelir.'], ['3', 'Gecikme yola çıkmadan görünür', 'Riskli siparişlerde alternatif hazır bekler.']].map((x) => `<div style="display:flex;gap:22px"><div style="width:46px;height:46px;border-radius:50%;background:#10151c;color:#f4efe5;display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:650;flex:none;margin-top:2px">${x[0]}</div><div><div style="font-size:30px;font-weight:650">${x[1]}</div><div style="font-size:26px;line-height:1.35;color:var(--muted)">${x[2]}</div></div></div>`).join('')}
</div>

<div class="abs" style="left:880px;top:150px;width:920px;background:#fbf8f2;border-radius:26px;box-shadow:0 30px 70px rgba(16,21,28,.22),0 0 0 2px rgba(16,21,28,.12);overflow:hidden">
  <div style="height:62px;background:#10151c;display:flex;align-items:center;padding:0 24px;gap:12px;color:#f4efe5">
    <span style="width:14px;height:14px;border-radius:50%;background:#ee5a2c"></span><span style="width:14px;height:14px;border-radius:50%;background:#e8b64a"></span><span style="width:14px;height:14px;border-radius:50%;background:#4fd6b0"></span>
    <span class="mono" style="margin-left:18px;font-size:19px;letter-spacing:.1em;opacity:.8">rota · sipariş detayı</span>
    <span style="margin-left:auto" class="tag">Örnek ekran</span>
  </div>
  <div style="padding:22px 32px 28px">
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px">
      <div><div class="mono" style="font-size:18px;letter-spacing:.14em;color:#5d6570">ÖRNEK SİPARİŞ</div><div style="font-family:var(--serif);font-size:44px;margin-top:2px">İzmir → Ankara</div></div>
      <div style="font-size:24px;color:#5d6570;text-align:right">2 ürün · 1,4 kg<br>Müşteri beklentisi: 3 gün içinde</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:16px;margin-top:26px">
      ${opt('Kargo A', '₺54,90', '3 gün', 3, 'EN UCUZ', false)}
      ${opt('Kargo B', '₺58,10', '2 gün', 1, 'DENGELİ', true)}
      ${opt('Kargo C', '₺66,00', '1 gün', 1, 'EN HIZLI', false)}
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:18px">
      <div style="border-radius:20px;background:#ebe4d6;padding:16px 24px;display:flex;gap:18px;align-items:center"><div style="width:58px;height:58px;color:#ee5a2c;flex:none">${ICON.box}</div><div><div class="mono" style="font-size:16px;letter-spacing:.12em;color:#5d6570">PAKETLEME</div><div style="font-size:24px;font-weight:600;line-height:1.25">Orta boy kutu<br><span style="font-weight:400;color:#5d6570">30×20×15 cm · 1 kat dolgu</span></div></div></div>
      <div style="border-radius:20px;background:#ebe4d6;padding:16px 24px;display:flex;gap:18px;align-items:center"><div style="width:58px;height:58px;color:#ee5a2c;flex:none">${ICON.clock}</div><div><div class="mono" style="font-size:16px;letter-spacing:.12em;color:#5d6570">TAHMİN</div><div style="font-size:24px;font-weight:600;line-height:1.25">2 iş günü içinde teslim<br><span style="font-weight:400;color:#5d6570">Bölge yoğunluğu: normal</span></div></div></div>
    </div>
    <div style="margin-top:18px;background:#10151c;color:#f4efe5;border-radius:18px;text-align:center;font-size:27px;font-weight:650;padding:16px">Kargo B ile etiketi oluştur →</div>
  </div>
</div>
<div class="abs note" style="left:880px;top:944px;width:920px;text-align:center">Ekran tasarımı ve değerler illüstratiftir; gerçek müşteri verisi değildir.</div>
`);
}

/* ============ 5 · VERİ ÇARKI ============ */
{
  const cx = 450, cy = 400, RX = 300, RY = 235;
  const P = (deg) => [cx + RX * Math.cos((deg * Math.PI) / 180), cy + RY * Math.sin((deg * Math.PI) / 180)];
  const nodes = [['Gönderi', 'her sipariş', -90], ['Teslimat sonucu', 'süre · gecikme · iade', 0], ['Model öğrenir', 'her güzergâh, her kargo', 90], ['Daha iyi seçim', 'sonraki sipariş', 180]];
  const arcs = nodes.map((n, i) => {
    const a0 = n[2] + 27, a1 = nodes[(i + 1) % 4][2] - 27 + (i === 3 ? 360 : 0);
    const s = P(a0), e = P(a1);
    return `<path d="M${s[0].toFixed(1)} ${s[1].toFixed(1)} A${RX} ${RY} 0 0 1 ${e[0].toFixed(1)} ${e[1].toFixed(1)}" stroke="#ee5a2c" stroke-width="6" stroke-linecap="round" marker-end="url(#ar5)"/>`;
  }).join('');
  const nodeEls = nodes.map((n, i) => {
    const [x, y] = P(n[2]);
    const w = 250, h = 92;
    return `<g transform="translate(${(x - w / 2).toFixed(1)} ${(y - h / 2).toFixed(1)})"><rect width="${w}" height="${h}" rx="26" fill="${i === 3 ? '#ee5a2c' : '#10151c'}"/><text x="${w / 2}" y="42" text-anchor="middle" font-size="29" font-weight="650" fill="#f4efe5">${n[0]}</text><text x="${w / 2}" y="72" text-anchor="middle" font-size="20" fill="#f4efe5" fill-opacity=".72">${n[1]}</text></g>`;
  }).join('');
  const pts = [
    ['Türkiye’ye özgü teslimat verisi', 'Hangi kargo, hangi güzergâhta, hangi dönemde gerçekte ne kadar sürüyor? Vaat değil, gerçekleşen.'],
    ['KOBİ ölçeğinde birikiyor', '310 satıcının gönderisi tek modelde buluşur; tek bir satıcının göremeyeceği örüntüler görünür olur.'],
    ['Saha bilgisi modelin içinde', 'Lojistik kurucunun operasyondan bildiği kurallar, tahmin modelinin girdisi olarak kodlanıyor.'],
  ];
  add(5, 'light', 'Neden yapay zekâ · Veri çarkı', `
<h2 class="abs" style="left:120px;top:150px;width:1680px;font-size:80px;white-space:nowrap">Her gönderi Rota’yı <em>daha akıllı</em> yapıyor.</h2>
<svg class="abs" style="left:70px;top:300px" width="900" height="720" viewBox="0 0 900 720" fill="none">
  <defs><marker id="ar5" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M1 1L9 5L1 9z" fill="#ee5a2c"/></marker></defs>
  <ellipse cx="${cx}" cy="${cy}" rx="${RX}" ry="${RY}" stroke="rgba(16,21,28,.12)" stroke-width="2" stroke-dasharray="3 9"/>
  <ellipse cx="${cx}" cy="${cy}" rx="172" ry="150" fill="rgba(238,90,44,.07)"/>
  ${arcs}
  ${nodeEls}
  <text x="${cx}" y="${cy - 6}" text-anchor="middle" font-size="80" fill="#10151c" font-family="Rota Serif, serif" font-weight="500">48.000</text>
  <text x="${cx}" y="${cy + 34}" text-anchor="middle" font-size="27" fill="#5d6570">gönderi / ay</text>
  <text x="${cx}" y="${cy + 70}" text-anchor="middle" font-size="19" fill="#ee5a2c" font-family="Rota Mono, monospace" letter-spacing="1.5">HER BİRİ BİR ÖĞRENME ÖRNEĞİ</text>
</svg>
<div class="abs" style="left:1040px;top:380px;width:760px;display:flex;flex-direction:column;gap:44px">
  ${pts.map((p, i) => `<div style="display:flex;gap:26px"><div class="mono" style="font-size:26px;color:var(--orange);padding-top:6px">${pad(i + 1)}</div><div><div style="font-family:var(--serif);font-size:42px;line-height:1.1;margin-bottom:8px">${p[0]}</div><div style="font-size:26px;line-height:1.38;color:var(--muted)">${p[1]}</div></div></div>`).join('')}
</div>
`);
}

/* ============ 6 · TRACTION (karanlık) ============ */
{
  // %11 bileşik büyüme eğrisi (hesaplama: 1,11^12)
  const gw = 760, gh = 270;
  const N = 24;
  const pts = Array.from({ length: N + 1 }, (_, i) => { const t = (i / N) * 12; const v = Math.pow(1.11, t); return [(i / N) * gw, gh - ((v - 1) / (Math.pow(1.11, 12) - 1)) * (gh - 30) - 8]; });
  const dcurve = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
  const growth = `
<svg width="${gw + 40}" height="${gh + 120}" viewBox="-10 -80 ${gw + 40} ${gh + 120}" fill="none">
  <defs><linearGradient id="g6" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff6a3d" stop-opacity=".45"/><stop offset="1" stop-color="#ff6a3d" stop-opacity="0"/></linearGradient></defs>
  <path d="${dcurve} L${gw} ${gh} L0 ${gh} Z" fill="url(#g6)"/>
  <path d="${dcurve}" stroke="#ff6a3d" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
  <line x1="0" x2="${gw}" y1="${gh}" y2="${gh}" stroke="rgba(244,239,229,.3)" stroke-width="2"/>
  <circle cx="0" cy="${pts[0][1]}" r="9" fill="#0c1016" stroke="#f4efe5" stroke-width="4"/>
  <circle cx="${gw}" cy="${pts[N][1]}" r="12" fill="#ff6a3d" stroke="#0c1016" stroke-width="4"/>
  <text x="0" y="${gh + 36}" font-size="20" fill="#98a1ad" font-family="Rota Mono, monospace" letter-spacing="1.5">BUGÜN · 1,0×</text>
  <text x="${gw}" y="${gh + 36}" text-anchor="end" font-size="20" fill="#98a1ad" font-family="Rota Mono, monospace" letter-spacing="1.5">12 AY SONRA</text>
  <text x="${gw - 30}" y="${pts[N][1] - 30}" text-anchor="end" font-size="64" fill="#f4efe5" font-family="Rota Serif, serif">≈ 3,5×</text>
</svg>`;
  const tiles = [
    ['310', 'aktif satıcı', (() => { let s = ''; for (let i = 0; i < 310; i++) s += `<circle cx="${(i % 31) * 8 + 4}" cy="${Math.floor(i / 31) * 8 + 4}" r="2.6" fill="#f4efe5" fill-opacity="${i > 300 ? 1 : .55}"/>`; return `<svg width="250" height="80" viewBox="0 0 250 80">${s}</svg>`; })()],
    ['48.000', 'aylık gönderi', (() => { let s = ''; for (let r = 0; r < 4; r++) for (let c = 0; c < 15; c++) s += `<rect x="${c * 17}" y="${r * 20}" width="12" height="12" rx="2.5" fill="#ff6a3d" fill-opacity="${.35 + ((c + r * 3) % 5) * .13}"/>`; return `<svg width="250" height="80" viewBox="0 0 250 80">${s}</svg>`; })()],
    ['%11', 'aylık büyüme', `<svg width="250" height="80" viewBox="0 0 250 80" fill="none"><path d="M4 70 Q120 66 170 40 T244 6" stroke="#4fd6b0" stroke-width="5" stroke-linecap="round"/><path d="M226 4h20v20" stroke="#4fd6b0" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`],
    ['%71', 'brüt marj', `<svg width="250" height="80" viewBox="0 0 250 80" fill="none"><rect x="4" y="26" width="242" height="26" rx="13" fill="rgba(244,239,229,.14)"/><rect x="4" y="26" width="${242 * 0.71}" height="26" rx="13" fill="#4fd6b0"/></svg>`],
    ['14 ay', 'yaşında', `<svg width="250" height="80" viewBox="0 0 250 80">${Array.from({ length: 14 }, (_, i) => `<circle cx="${i * 17.5 + 8}" cy="40" r="${i === 13 ? 8 : 6}" fill="${i === 13 ? '#ff6a3d' : '#f4efe5'}" fill-opacity="${i === 13 ? 1 : .35 + i * .04}"/>`).join('')}</svg>`],
  ];
  add(6, 'dark', 'Traction', `
<h2 class="abs" style="left:120px;top:150px;width:1000px;font-size:80px">14 ayda <em>çalışan</em> bir motor.</h2>
<div class="abs" style="left:120px;top:310px;width:900px">
  <div class="mono" style="font-size:22px;letter-spacing:.16em;color:#98a1ad">AYLIK YİNELENEN GELİR (MRR)</div>
  <div style="font-family:var(--serif);font-size:208px;line-height:1;letter-spacing:-.03em;margin-top:8px">620.000<span style="font-size:110px;color:#ff6a3d;margin-left:14px">₺</span></div>
  <div style="display:flex;align-items:center;gap:20px;margin-top:22px"><span style="font-size:38px;font-weight:650;color:#4fd6b0;background:rgba(79,214,176,.12);border-radius:999px;padding:6px 22px">↗ %11 / ay</span><span style="font-size:27px;color:#98a1ad">bileşik büyüme</span></div>
</div>
<div class="abs" style="left:1040px;top:250px">${growth}</div>
<div class="abs note" style="left:1040px;top:672px;width:760px;color:#98a1ad;font-size:18px">Şekil hesaplamadır: aylık %11 bileşik büyüme, 1,11¹² ≈ 3,5×. Gerçekleşmiş seri değildir.</div>
<div class="abs" style="left:120px;top:744px;width:1680px;display:grid;grid-template-columns:repeat(5,1fr);gap:22px">
  ${tiles.map((t) => `<div class="card" style="padding:20px 28px 18px;height:224px;display:flex;flex-direction:column;justify-content:space-between"><div><div style="font-family:var(--serif);font-size:74px;line-height:1;letter-spacing:-.02em">${t[0]}</div><div style="font-size:26px;color:#b3bbc6;margin-top:6px">${t[1]}</div></div><div>${t[2]}</div></div>`).join('')}
</div>
`);
}

/* ============ 7 · BİRİM EKONOMİ ============ */
{
  const rev = 620000, gp = Math.round(rev * 0.71), cogs = rev - gp;
  const H = 380, sc = H / rev, base = 520, bw = 210;
  const bars = [
    { x: 30, top: base - rev * sc, h: rev * sc, c: '#10151c', v: tr(rev), l: 'Aylık gelir', s: 'MRR' },
    { x: 330, top: base - rev * sc, h: cogs * sc, c: '#c9c1af', v: '−' + tr(cogs), l: 'Doğrudan maliyet', s: '%29' },
    { x: 630, top: base - gp * sc, h: gp * sc, c: '#0e7a63', v: tr(gp), l: 'Brüt kâr', s: '%71' },
  ];
  const wf = `
<svg width="900" height="640" viewBox="0 0 900 640" fill="none">
  <line x1="0" x2="900" y1="${base}" y2="${base}" stroke="#10151c" stroke-width="3"/>
  <line x1="${30 + bw}" x2="330" y1="${base - rev * sc}" y2="${base - rev * sc}" stroke="rgba(16,21,28,.35)" stroke-dasharray="4 8" stroke-width="2"/>
  <line x1="${330 + bw}" x2="630" y1="${base - gp * sc}" y2="${base - gp * sc}" stroke="rgba(16,21,28,.35)" stroke-dasharray="4 8" stroke-width="2"/>
  ${bars.map((b) => `<rect x="${b.x}" y="${b.top}" width="${bw}" height="${b.h}" rx="10" fill="${b.c}"/>
    <text x="${b.x + bw / 2}" y="${b.top - 48}" text-anchor="middle" font-size="46" font-weight="650" fill="#10151c" font-family="Rota Serif, serif">${b.v}</text>
    <text x="${b.x + bw / 2}" y="${b.top - 16}" text-anchor="middle" font-size="24" fill="#5d6570">TL / ay</text>
    <text x="${b.x + bw / 2}" y="${base + 44}" text-anchor="middle" font-size="27" font-weight="650" fill="#10151c">${b.l}</text>
    <text x="${b.x + bw / 2}" y="${base + 78}" text-anchor="middle" font-size="22" fill="#5d6570" font-family="Rota Mono, monospace" letter-spacing="2">${b.s}</text>`).join('')}
  <text x="${630 + bw / 2}" y="${base - gp * sc / 2 + 12}" text-anchor="middle" font-size="80" fill="#f4efe5" font-family="Rota Serif, serif">%71</text>
</svg>`;
  const big = [
    [tr(rev / 310), '₺', 'satıcı başına aylık gelir', '620.000 ÷ 310'],
    ['≈' + tr(rev / 48000, 1), '₺', 'gönderi başına gelir', '620.000 ÷ 48.000'],
    ['≈' + tr(48000 / 310), '', 'satıcı başına aylık gönderi', '48.000 ÷ 310'],
  ];
  add(7, 'light', 'Birim ekonomi', `
<h2 class="abs" style="left:120px;top:150px;width:1500px">Her 100 ₺ gelirin <em>71 ₺’si</em> brüt kâr.</h2>
<div class="abs" style="left:120px;top:330px;width:660px;display:flex;flex-direction:column;gap:20px">
  ${big.map((b) => `<div class="card" style="padding:20px 34px;display:flex;justify-content:space-between;align-items:center">
    <div><div style="font-family:var(--serif);font-size:80px;line-height:1;letter-spacing:-.02em">${b[0]}<span style="font-size:46px;color:var(--orange);margin-left:8px">${b[1]}</span></div><div style="font-size:26px;margin-top:6px">${b[2]}</div></div>
    <div class="mono" style="font-size:19px;color:var(--muted);text-align:right;letter-spacing:.04em">${b[3]}</div></div>`).join('')}
</div>
<div class="abs" style="left:900px;top:290px">${wf}</div>
<div class="abs note" style="left:120px;top:946px;width:1680px;font-size:18px">Tüm değerler, açıklanan MRR (620.000 ₺), aktif satıcı (310), aylık gönderi (48.000) ve brüt marj (%71) rakamlarından hesaplanmıştır.</div>
`);
}

/* ============ 8 · BÜYÜME YOLU ============ */
{
  const cols = 25, gap = 27;
  let dots = '';
  for (let i = 0; i < 410; i++) {
    const x = (i % cols) * gap + 12, y = Math.floor(i / cols) * gap + 12;
    dots += i < 310
      ? `<circle cx="${x}" cy="${y}" r="9" fill="#10151c"/>`
      : `<circle cx="${x}" cy="${y}" r="8" fill="rgba(238,90,44,.16)" stroke="#ee5a2c" stroke-width="2.2" stroke-dasharray="3 3.5"/>`;
  }
  const dw = cols * gap, dh = Math.ceil(410 / cols) * gap;
  const ladder = [
    ['Kargo seçimi', 'Bugün', true], ['Paketleme önerisi', 'Bugün', true], ['Gecikme tahmini', 'Bugün', true],
    ['Otomatik iade önleme', 'Yol haritası', false], ['Müşteriye proaktif bildirim', 'Yol haritası', false], ['Toplu kargo fiyatı pazarlığı', 'Yol haritası', false],
  ];
  add(8, 'light', 'Büyüme motoru', `
<h2 class="abs" style="left:120px;top:150px;width:1680px;white-space:nowrap;font-size:84px">Her yeni 100 satıcı, aylık <em>200.000 ₺</em> ekler.</h2>
<div class="abs" style="left:120px;top:330px">
  <svg width="${dw}" height="${dh}" viewBox="0 0 ${dw} ${dh}">${dots}</svg>
  <div style="display:flex;gap:34px;margin-top:22px;font-size:24px;align-items:center">
    <span style="display:flex;align-items:center;gap:10px"><svg width="20" height="20"><circle cx="10" cy="10" r="9" fill="#10151c"/></svg>310 aktif satıcı</span>
    <span style="display:flex;align-items:center;gap:10px"><svg width="20" height="20"><circle cx="10" cy="10" r="8" fill="rgba(238,90,44,.16)" stroke="#ee5a2c" stroke-width="2.2" stroke-dasharray="3 3.5"/></svg>+100 satıcı → +200.000 ₺ MRR</span>
  </div>
  <div class="note" style="margin-top:12px;width:${dw}px;font-size:18px">Satıcı başına 2.000 ₺ (620.000 ÷ 310) ile hesaplandı; ARPA sabit varsayımı.</div>
</div>
<div class="abs" style="left:900px;top:330px;width:900px">
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
    ${ladder.map((l, i) => `<div style="border-radius:22px;padding:20px 26px;min-height:124px;${l[2] ? 'background:#10151c;color:#f4efe5' : 'border:3px dashed rgba(16,21,28,.32);background:rgba(255,255,255,.5)'}">
      <div class="mono" style="font-size:17px;letter-spacing:.14em;color:${l[2] ? '#4fd6b0' : '#c9431b'}">${l[1].toUpperCase()}</div>
      <div style="font-size:31px;font-weight:650;line-height:1.15;margin-top:8px">${l[0]}</div></div>`).join('')}
  </div>
  <div style="margin-top:28px;border-top:3px solid #10151c;padding-top:20px;display:flex;justify-content:space-between;align-items:flex-end">
    <div><div class="mono" style="font-size:19px;letter-spacing:.14em;color:var(--muted)">BUGÜNKÜ YILLIK GELİR HIZI</div><div style="font-family:var(--serif);font-size:88px;line-height:1.05">7,44 <span style="font-size:50px;color:var(--orange)">milyon ₺</span></div></div>
    <div class="mono" style="font-size:19px;color:var(--muted);text-align:right;padding-bottom:12px">620.000 × 12</div>
  </div>
  <div style="margin-top:10px;font-size:22px;color:var(--muted);line-height:1.35">Yol haritası kalemleri plandır; henüz satışa sunulmuş ürün değildir.</div>
</div>
`);
}

/* ============ 9 · REKABET ============ */
{
  const W = 860, H = 570;
  const items = [
    ['Elle / Excel', 0.1, 0.62, '#5d6570', 16],
    ['Kargo firması panelleri', 0.2, 0.82, '#5d6570', 16],
    ['Genel kargo entegratörleri', 0.46, 0.55, '#5d6570', 16],
    ['Kurumsal lojistik yazılımı', 0.78, 0.17, '#5d6570', 16],
  ];
  const px = (v) => 60 + v * (W - 100), py = (v) => 20 + (1 - v) * (H - 80);
  const labels = { 'Elle / Excel': [22, 6], 'Kargo firması panelleri': [22, 6], 'Genel kargo entegratörleri': [22, 6], 'Kurumsal lojistik yazılımı': [-22, 6, 'end'] };
  const chart = `
<svg width="${W + 40}" height="${H + 30}" viewBox="-10 0 ${W + 40} ${H + 30}" fill="none">
  <rect x="${px(0.55)}" y="${py(1) - 0}" width="${px(1) - px(0.55) + 30}" height="${py(0.5) - py(1)}" rx="26" fill="rgba(14,122,99,.11)" stroke="#0e7a63" stroke-dasharray="6 8" stroke-width="2.5"/>
  <line x1="60" y1="${py(0)}" x2="${W + 10}" y2="${py(0)}" stroke="#10151c" stroke-width="3"/>
  <line x1="60" y1="${py(1) - 10}" x2="60" y2="${py(0)}" stroke="#10151c" stroke-width="3"/>
  <line x1="${px(0.5)}" y1="${py(1)}" x2="${px(0.5)}" y2="${py(0)}" stroke="rgba(16,21,28,.18)" stroke-dasharray="3 9"/>
  <line x1="60" y1="${py(0.5)}" x2="${W + 10}" y2="${py(0.5)}" stroke="rgba(16,21,28,.18)" stroke-dasharray="3 9"/>
  ${items.map((it) => { const l = labels[it[0]]; return `<circle cx="${px(it[1])}" cy="${py(it[2])}" r="16" fill="#c9c1af" stroke="#5d6570" stroke-width="3"/><text x="${px(it[1]) + l[0]}" y="${py(it[2]) + l[1]}" font-size="25" font-weight="600" fill="#10151c" ${l[2] ? `text-anchor="${l[2]}"` : ''}>${it[0]}</text>`; }).join('')}
  <circle cx="${px(0.86)}" cy="${py(0.86)}" r="44" fill="#ee5a2c" fill-opacity=".2"/><circle cx="${px(0.86)}" cy="${py(0.86)}" r="28" fill="#ee5a2c"/>
  <text x="${px(0.86)}" y="${py(0.86) + 68}" text-anchor="middle" font-size="40" font-weight="700" fill="#c9431b" font-family="Rota Serif, serif">Rota</text>
  <text x="60" y="${H + 28}" font-size="19" fill="#5d6570" font-family="Rota Mono, monospace" letter-spacing="1.6">SABİT KURAL / ELLE</text>
  <text x="${W + 10}" y="${H + 28}" text-anchor="end" font-size="19" fill="#5d6570" font-family="Rota Mono, monospace" letter-spacing="1.6">SİPARİŞ BAŞINA · ÖĞRENEN →</text>
  <text transform="translate(30 ${py(0)}) rotate(-90)" font-size="19" fill="#5d6570" font-family="Rota Mono, monospace" letter-spacing="1.6">AĞIR KURULUM</text>
  <text transform="translate(30 ${py(1) + 8}) rotate(-90)" text-anchor="end" font-size="19" fill="#5d6570" font-family="Rota Mono, monospace" letter-spacing="1.6">KOBİ’YE UYGUN →</text>
</svg>`;
  const why = [
    ['Sipariş başına, satıcıya özel', 'Kural tablosu değil, her siparişin fiyat–süre–risk dengesini yeniden hesaplayan model.'],
    ['KOBİ için, dakikalar içinde', 'Lojistik ekibi olmayan satıcı, ek kurulum yükü olmadan başlar.'],
    ['Gerçekleşen veriyle öğrenen', 'Her gönderi tahmin modelini besler; rakibin kopyalayamadığı birikim.'],
  ];
  add(9, 'light', 'Rekabet', `
<h2 class="abs" style="left:120px;top:150px;width:1680px;font-size:80px;white-space:nowrap">Boş kalan köşe: <em>KOBİ için</em> sipariş başına karar.</h2>
<div class="abs" style="left:100px;top:320px">${chart}</div>
<div class="abs" style="left:1070px;top:360px;width:730px;display:flex;flex-direction:column;gap:52px">
  ${why.map((w, i) => `<div style="display:flex;gap:24px"><div style="width:14px;flex:none;border-radius:7px;background:${i === 0 ? '#ee5a2c' : i === 1 ? '#0e7a63' : '#10151c'}"></div><div><div style="font-family:var(--serif);font-size:40px;line-height:1.1;margin-bottom:6px">${w[0]}</div><div style="font-size:25px;line-height:1.38;color:var(--muted)">${w[1]}</div></div></div>`).join('')}
</div>
<div class="abs note" style="left:1070px;top:910px;width:730px;font-size:18px">Nitel, kategori bazlı konumlandırmadır; ölçülmüş bir pazar payı değildir.</div>
`);
}

/* ============ 10 · EKİP ============ */
{
  const team = [
    ['code', 'Yazılım', 'Kurucu', 'Rota’nın ürününü ve tahmin motorunu inşa ediyor.'],
    ['code', 'Yazılım', 'Kurucu', 'Veri hattını, entegrasyonları ve altyapıyı taşıyor.'],
    ['route', 'Lojistik', 'Kurucu', 'Kargo operasyonunu içeriden biliyor; kuralları modele öğretiyor.'],
    ['bars', 'Satış', 'Kurucu', 'Satıcıyla doğrudan ilişki kuruyor; 310 satıcıya giden yolu açıyor.'],
  ];
  add(10, 'light', 'Ekip', `
<h2 class="abs" style="left:120px;top:150px;width:1680px;white-space:nowrap">Sorunun üç yüzü <em>aynı masada.</em></h2>
<p class="abs lead" style="left:120px;top:290px;width:1400px">Ürünü inşa eden, sahayı bilen ve satıcıyı ikna eden kişiler aynı kurucu ekibinde.</p>
<div class="abs" style="left:120px;top:410px;width:1680px;display:grid;grid-template-columns:repeat(4,1fr);gap:26px">
  ${team.map((t, i) => `<div class="card" style="height:440px;padding:34px 32px;display:flex;flex-direction:column;justify-content:space-between;${i === 2 ? 'background:#10151c;color:#f4efe5;border-color:#10151c' : ''}">
    <div style="display:flex;justify-content:space-between;align-items:flex-start"><div style="width:84px;height:84px;color:${i === 2 ? '#ff6a3d' : '#ee5a2c'}">${ICON[t[0]]}</div><div class="mono" style="font-size:19px;letter-spacing:.14em;opacity:.6">${pad(i + 1)}</div></div>
    <div><div class="mono" style="font-size:19px;letter-spacing:.16em;color:${i === 2 ? '#4fd6b0' : 'var(--orange)'}">${t[2].toUpperCase()}</div><div style="font-family:var(--serif);font-size:62px;line-height:1.05;margin:4px 0 14px">${t[1]}</div><div style="font-size:24px;line-height:1.36;opacity:.78">${t[3]}</div></div>
  </div>`).join('')}
</div>
<div class="abs" style="left:120px;top:900px;width:1680px;display:flex;gap:70px;font-size:26px;color:var(--muted)">
  <span><b style="color:var(--ink);font-weight:650">4</b> kurucu</span><span><b style="color:var(--ink);font-weight:650">14</b> ay birlikte çalışıyoruz</span><span><b style="color:var(--ink);font-weight:650">310</b> satıcıya hizmet veriyoruz</span>
</div>
`);
}

/* ============ 11 · 18 AY PLANI ============ */
{
  const W = 1040, H = 470, months = 18;
  const s11 = (m) => 620000 * Math.pow(1.11, m), s6 = (m) => 620000 * Math.pow(1.06, m);
  const ymax = 4.5e6;
  const X = (m) => 70 + (m / months) * (W - 110), Y = (v) => 70 + (1 - v / ymax) * (H - 110);
  const path = (f) => Array.from({ length: months + 1 }, (_, m) => `${m ? 'L' : 'M'}${X(m).toFixed(1)} ${Y(f(m)).toFixed(1)}`).join(' ');
  const yt = [0, 1e6, 2e6, 3e6, 4e6];
  const chart = `
<svg width="${W}" height="${H + 60}" viewBox="0 0 ${W} ${H + 60}" fill="none">
  <defs><linearGradient id="g11" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ee5a2c" stop-opacity=".28"/><stop offset="1" stop-color="#ee5a2c" stop-opacity="0"/></linearGradient></defs>
  ${yt.map((v) => `<line x1="70" x2="${W - 40}" y1="${Y(v)}" y2="${Y(v)}" stroke="rgba(16,21,28,.13)" ${v ? 'stroke-dasharray="3 9"' : 'stroke="#10151c" stroke-width="2.5"'}/><text x="58" y="${Y(v) + 7}" text-anchor="end" font-size="20" fill="#5d6570" font-variant-numeric="tabular-nums">${v / 1e6}${v ? ' M' : ''}</text>`).join('')}
  <path d="${path(s11)} L${X(18)} ${Y(0)} L${X(0)} ${Y(0)} Z" fill="url(#g11)"/>
  <path d="${path(s6)}" stroke="#5d6570" stroke-width="5" stroke-dasharray="2 12" stroke-linecap="round"/>
  <path d="${path(s11)}" stroke="#ee5a2c" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
  ${[0, 6, 12, 18].map((m) => `<text x="${X(m)}" y="${H - 8}" text-anchor="middle" font-size="22" fill="#10151c" font-family="Rota Mono, monospace">${m === 0 ? 'BUGÜN' : m + '. AY'}</text><circle cx="${X(m)}" cy="${Y(s11(m))}" r="${m === 0 || m === 18 ? 11 : 8}" fill="${m === 18 ? '#ee5a2c' : '#f4efe5'}" stroke="#ee5a2c" stroke-width="4"/>`).join('')}
  <text x="${X(18) - 24}" y="${Y(s11(18)) - 50}" text-anchor="end" font-size="52" font-family="Rota Serif, serif" fill="#10151c">≈ ${tr(s11(18) / 1e6, 2)} M ₺</text>
  <text x="${X(18) - 24}" y="${Y(s11(18)) - 20}" text-anchor="end" font-size="22" fill="#c9431b" font-family="Rota Mono, monospace" letter-spacing="1.5">%11/AY İLE</text>
  <text x="${X(18) - 6}" y="${Y(s6(18)) + 88}" text-anchor="end" font-size="34" font-family="Rota Serif, serif" fill="#5d6570">≈ ${tr(s6(18) / 1e6, 2)} M ₺ <tspan font-size="20" font-family="Rota Mono, monospace" letter-spacing="1.5"> · %6/AY İLE</tspan></text>
  <text x="0" y="14" font-size="20" fill="#5d6570" font-family="Rota Mono, monospace" letter-spacing="1.5">MRR · MİLYON ₺</text>
</svg>`;
  const ms = [
    ['0–6. ay', 'Veriyi derinleştir', 'Kargo–güzergâh performans verisi ve tahmin doğruluğu öncelik.'],
    ['6–12. ay', 'Satış motorunu büyüt', 'Satış ekibini genişlet, satıcı edinme kanallarını çoğalt.'],
    ['12–18. ay', 'Ölçeğe hazırlan', 'Yol haritasındaki ürünleri devreye al; sonraki tura veriyle git.'],
  ];
  add(11, 'light', '18 aylık plan', `
<h2 class="abs" style="left:120px;top:150px;width:1500px">18 ayda <em>ölçeğe</em> giden yol.</h2>
<div class="abs" style="left:110px;top:320px">${chart}</div>
<div class="abs" style="left:110px;top:880px;width:1040px;display:flex;gap:16px;align-items:center"><span class="tag">Tahmin</span><span class="note" style="font-size:20px;line-height:1.35;flex:1">Senaryolar, bugünkü 620.000 ₺ MRR’den sabit aylık büyümeyle hesaplandı. %6 muhafazakâr varsayımdır; taahhüt değildir.</span></div>
<div class="abs" style="left:1230px;top:330px;width:570px;display:flex;flex-direction:column;gap:18px">
  ${ms.map((m, i) => `<div class="card" style="padding:20px 30px;${i === 2 ? 'background:#10151c;color:#f4efe5;border-color:#10151c' : ''}"><div class="mono" style="font-size:19px;letter-spacing:.14em;color:${i === 2 ? '#ff9a76' : 'var(--orange)'}">${m[0].toUpperCase()}</div><div style="font-family:var(--serif);font-size:42px;line-height:1.1;margin:6px 0 8px">${m[1]}</div><div style="font-size:23px;line-height:1.35;opacity:.75">${m[2]}</div></div>`).join('')}
</div>
`);
}

/* ============ 12 · TALEP ============ */
{
  const parts = [
    ['Ürün ve yapay zekâ mühendisliği', 40, '#ff6a3d'],
    ['Satış ve büyüme', 30, '#4fd6b0'],
    ['Kargo ağı ve operasyon', 20, '#f4efe5'],
    ['Rezerv', 10, '#6b7684'],
  ];
  const cx = 250, cy = 250, R = 190, sw = 62;
  let a = -90, arcs = '';
  parts.forEach((p) => {
    const a0 = a + 1.6, a1 = a + (p[1] / 100) * 360 - 1.6;
    const pt = (d) => [cx + R * Math.cos((d * Math.PI) / 180), cy + R * Math.sin((d * Math.PI) / 180)];
    const s = pt(a0), e = pt(a1), large = a1 - a0 > 180 ? 1 : 0;
    arcs += `<path d="M${s[0].toFixed(1)} ${s[1].toFixed(1)} A${R} ${R} 0 ${large} 1 ${e[0].toFixed(1)} ${e[1].toFixed(1)}" stroke="${p[2]}" stroke-width="${sw}" fill="none"/>`;
    a += (p[1] / 100) * 360;
  });
  const donut = `<svg width="500" height="500" viewBox="0 0 500 500">${arcs}
    <text x="${cx}" y="${cy + 6}" text-anchor="middle" font-size="60" fill="#f4efe5" font-family="Rota Serif, serif">1,2 M</text>
    <text x="${cx}" y="${cy + 46}" text-anchor="middle" font-size="24" fill="#98a1ad">USD</text></svg>`;
  const runway = Array.from({ length: 18 }, (_, i) => `<div style="flex:1;height:44px;border-radius:8px;background:#ff6a3d"></div>`).join('');
  add(12, 'dark', 'Talep', `
<div class="abs" style="left:120px;top:170px;width:1050px">
  <div class="mono" style="font-size:22px;letter-spacing:.16em;color:#ff9a76">TOHUM TURU</div>
  <div style="font-family:var(--serif);font-size:138px;line-height:1.05;letter-spacing:-.03em;margin-top:14px;white-space:nowrap">1,2 milyon <em style="color:#ff6a3d">USD</em></div>
  <div style="font-size:42px;margin-top:6px;color:#dcd6c9">18 ay pist · tohum turu</div>
</div>
<div class="abs" style="left:120px;top:520px;width:1000px">
  <div style="display:flex;gap:6px">${runway}</div>
  <div style="display:flex;justify-content:space-between;font-family:var(--mono);font-size:19px;letter-spacing:.1em;color:#98a1ad;margin-top:12px"><span>1. AY</span><span>6</span><span>12</span><span>18. AY</span></div>
  <div style="font-size:24px;color:#98a1ad;margin-top:16px;line-height:1.35">1.200.000 ÷ 18 ≈ 66.667 USD / ay ortalama bütçe (hesaplama).</div>
</div>

<div class="abs" style="left:1210px;top:150px;width:590px">
  <div class="mono" style="font-size:21px;letter-spacing:.14em;color:#98a1ad;margin-bottom:6px">FONUN KULLANIMI <span class="tag" style="margin-left:10px;font-size:15px">Plan · tahmin</span></div>
  <div style="margin-left:-6px">${donut}</div>
  ${parts.map((p) => `<div style="display:flex;align-items:center;gap:16px;padding:9px 0;font-size:25px"><span style="width:20px;height:20px;border-radius:6px;background:${p[2]};flex:none"></span><span style="flex:1">${p[0]}</span><b class="mono" style="font-weight:400;font-size:24px">%${p[1]}</b></div>`).join('')}
</div>

<div class="abs" style="left:120px;top:770px;width:1000px;border-top:2px solid rgba(244,239,229,.2);padding-top:30px">
  <div style="font-family:var(--serif);font-size:66px;line-height:1.08">Her siparişin <em style="color:#ff6a3d">en doğru yolu</em> için.</div>
  <div style="font-size:26px;color:#98a1ad;margin-top:14px">Rota · 4 kurucu · 310 satıcı · 620.000 ₺ MRR</div>
</div>
`);
}

/* ---------- çıktı ---------- */
const html = `<!doctype html>
<html lang="tr"><head><meta charset="utf-8"><title>Rota — Tohum turu yatırımcı sunumu</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>${css}</style></head>
<body>
${slides.join('\n')}
<script>
  // ekranda: pencereye sığdır, ok tuşlarıyla gez. Yazdırmada (PDF) 1920x1080 sabit.
  (function () {
    function fit() { var s = Math.min(innerWidth / 1920, innerHeight / 1080); document.documentElement.style.setProperty('--s', s); }
    addEventListener('resize', fit); fit();
    var frames = [].slice.call(document.querySelectorAll('.frame'));
    function cur() { var y = scrollY + innerHeight / 2, best = 0; frames.forEach(function (f, i) { if (f.offsetTop <= y) best = i; }); return best; }
    addEventListener('keydown', function (e) {
      var i = cur();
      if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); frames[Math.min(i + 1, frames.length - 1)].scrollIntoView({ behavior: 'smooth' }); }
      if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); frames[Math.max(i - 1, 0)].scrollIntoView({ behavior: 'smooth' }); }
    });
  })();
</script>
</body></html>`;
fs.writeFileSync(new URL('./deck.html', import.meta.url), html);
console.log('deck.html yazıldı,', slides.length, 'slayt');
