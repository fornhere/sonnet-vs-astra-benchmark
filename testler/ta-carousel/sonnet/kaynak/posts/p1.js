// Gönderi 1 — Kadıköy Akşamı lansmanı: 8 kare boyunca kesintisiz akan gün batımı panoraması
const L = require('../lib');
const { C, at, page, header, footer, rng } = L;
const N = 8, W = 1080, PW = W * N, HZ = 965;

function panorama() {
  const r = rng(42);
  const gid = L.uid('pn');
  let s = `<svg width="${PW}" height="1350" viewBox="0 0 ${PW} 1350" style="display:block">
  <defs>
    <linearGradient id="${gid}sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1E1236"/><stop offset=".38" stop-color="#4A2249"/><stop offset=".62" stop-color="#A63F45"/><stop offset=".78" stop-color="#EC8A50"/><stop offset="1" stop-color="#F8C56E"/></linearGradient>
    <linearGradient id="${gid}sky" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="${HZ}"><stop offset="0" stop-color="#1E1236"/><stop offset=".4" stop-color="#4A2249"/><stop offset=".68" stop-color="#A63F45"/><stop offset=".86" stop-color="#EC8A50"/><stop offset="1" stop-color="#F8C56E"/></linearGradient>
    <linearGradient id="${gid}night" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${PW}" y2="0"><stop offset="0" stop-color="#0E1030" stop-opacity="0"/><stop offset=".16" stop-color="#0E1030" stop-opacity=".05"/><stop offset=".5" stop-color="#0E1030" stop-opacity=".55"/><stop offset=".78" stop-color="#0C0F2E" stop-opacity=".86"/><stop offset="1" stop-color="#0A0C28" stop-opacity=".94"/></linearGradient>
    <linearGradient id="${gid}sea" gradientUnits="userSpaceOnUse" x1="0" y1="${HZ}" x2="0" y2="1350"><stop offset="0" stop-color="#D0704F"/><stop offset=".12" stop-color="#8A3E52"/><stop offset=".55" stop-color="#3B2153"/><stop offset="1" stop-color="#1A1236"/></linearGradient>
    <linearGradient id="${gid}sean" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${PW}" y2="0"><stop offset="0" stop-color="#0E1030" stop-opacity="0"/><stop offset=".2" stop-color="#0E1030" stop-opacity=".12"/><stop offset=".6" stop-color="#0E1030" stop-opacity=".6"/><stop offset="1" stop-color="#080A22" stop-opacity=".85"/></linearGradient>
    <linearGradient id="${gid}far" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${PW}" y2="0"><stop offset="0" stop-color="#8A4657"/><stop offset=".3" stop-color="#5D3352"/><stop offset=".6" stop-color="#2E2456"/><stop offset="1" stop-color="#171B45"/></linearGradient>
    <linearGradient id="${gid}near" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${PW}" y2="0"><stop offset="0" stop-color="#4B2447"/><stop offset=".3" stop-color="#2F1B44"/><stop offset=".6" stop-color="#191840"/><stop offset="1" stop-color="#0D1030"/></linearGradient>
    <radialGradient id="${gid}moon" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFF1C9" stop-opacity=".35"/><stop offset="1" stop-color="#FFF1C9" stop-opacity="0"/></radialGradient>
    <radialGradient id="${gid}sun" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFD98A"/><stop offset=".55" stop-color="#F58B4E"/><stop offset="1" stop-color="#E2543F"/></radialGradient>
    <radialGradient id="${gid}glow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFB56A" stop-opacity=".75"/><stop offset=".5" stop-color="#F0784E" stop-opacity=".28"/><stop offset="1" stop-color="#F0784E" stop-opacity="0"/></radialGradient>
    <linearGradient id="${gid}refl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFC46E" stop-opacity=".85"/><stop offset="1" stop-color="#FFC46E" stop-opacity="0"/></linearGradient>
  </defs>
  <rect width="${PW}" height="${HZ + 4}" fill="url(#${gid}sky)"/>
  <rect width="${PW}" height="${HZ + 4}" fill="url(#${gid}night)"/>`;
  // yıldızlar
  for (let i = 0; i < 230; i++) {
    const x = 2000 + r() * (PW - 2000), y = 30 + Math.pow(r(), 1.5) * 620;
    const ramp = Math.min(1, (x - 2000) / 3500);
    s += L.star(x.toFixed(0), y.toFixed(0), (0.8 + r() * 1.7).toFixed(1), (0.15 + ramp * 0.7 * r()).toFixed(2));
  }
  // güneş + hare
  s += `<circle cx="540" cy="${HZ - 20}" r="620" fill="url(#${gid}glow)"/><circle cx="540" cy="${HZ - 10}" r="252" fill="url(#${gid}sun)"/>`;
  // bulut şeritleri
  const cloud = (x, y, w, h, c, o) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${c}" opacity="${o}"/>`;
  s += cloud(700, 540, 340, 14, '#F4A07A', .5) + cloud(820, 575, 420, 10, '#D9634F', .4)
    + cloud(1250, 610, 520, 14, '#B44A54', .45) + cloud(1500, 650, 380, 10, '#9C3F55', .4) + cloud(2200, 560, 460, 12, '#8A3B5E', .38) + cloud(2520, 600, 320, 10, '#7A3560', .32)
    + cloud(3300, 500, 420, 12, '#5D2F63', .3);
  // ay (son kare)
  const mx = 7560 + 790, my = 300;
  s += `<circle cx="${mx}" cy="${my}" r="230" fill="url(#${gid}moon)"/><circle cx="${mx}" cy="${my}" r="58" fill="#FFF4D2"/><circle cx="${mx + 24}" cy="${my - 12}" r="52" fill="#151846"/>`;
  // uzak siluet + yakın siluet
  const farSeg = (seed, x0, x1, m) => `<g fill="url(#${gid}far)">${L.citySilhouette({ seed, x0, x1, base: HZ + 2, hMin: 26, hMax: 88, color: 'none', mosques: m, dense: 1.1 }).split('</g>')[0].replace(/^<g[^>]*>/, '')}</g>`;
  s += farSeg(7, 640, 4000, 0) + farSeg(8, 4000, 5000, 1) + farSeg(9, 5000, PW, 0);
  for (let i = 0; i < N; i++) {
    const x0 = Math.max(i * W, 1000), x1 = (i + 1) * W;
    if (x1 <= 1000) continue;
    const lit = Math.min(0.62, 0.02 + i * 0.09);
    const sil = L.citySilhouette({ seed: 100 + i, x0, x1: x1 + 60, base: HZ + 14, hMin: 42, hMax: 140 + (i % 3) * 14, color: `url(#${gid}near)`, litProb: lit, lit: i > 4 ? '#FFD98C' : '#FFCB7A', mosques: 0 });
    s += sil;
  }
  // deniz
  s += `<rect y="${HZ + 8}" width="${PW}" height="${1350 - HZ - 8}" fill="url(#${gid}sea)"/><rect y="${HZ + 8}" width="${PW}" height="${1350 - HZ - 8}" fill="url(#${gid}sean)"/>`;
  // güneş yansıması
  for (let i = 0; i < 22; i++) {
    const y = HZ + 14 + i * 17 + (i * i) * 0.5, w = 60 + i * 15 + r() * 40, x = 540 - w / 2 + (r() - .5) * 30;
    s += `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${w.toFixed(0)}" height="${(4 + i * 0.35).toFixed(1)}" rx="3" fill="#FFC46E" opacity="${(0.75 - i * 0.03).toFixed(2)}"/>`;
  }
  // ışık yansımaları (sağa doğru artar)
  for (let i = 0; i < 260; i++) {
    const x = 1300 + r() * (PW - 1300), y = HZ + 20 + Math.pow(r(), 1.3) * 150;
    const a = 0.1 + Math.min(1, (x - 1300) / 5000) * 0.4;
    s += `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${(3 + r() * 5).toFixed(0)}" height="${(10 + r() * 34).toFixed(0)}" rx="2" fill="#FFCB7A" opacity="${(a * r()).toFixed(2)}"/>`;
  }
  // dalga çizgileri
  for (let i = 0; i < 170; i++) {
    const x = r() * PW, y = HZ + 30 + Math.pow(r(), 1.2) * 340, w = 40 + r() * 170;
    s += `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${w.toFixed(0)}" height="3" rx="1.500" fill="#FFE6C2" opacity="${(0.05 + r() * 0.11).toFixed(2)}"/>`;
  }
  // büyük vapur — 1.-2. kare arasındaki dikişi aşar, kaydırmayı çağırır
  const wake = (x, y) => `<path d="M${x} ${y}L${x - 700} ${y + 14}L${x - 700} ${y + 6}Z" fill="#FFE6C2" opacity=".22"/><path d="M${x} ${y + 8}L${x - 520} ${y + 34}L${x - 520} ${y + 26}Z" fill="#FFE6C2" opacity=".16"/>`;
  s += wake(1120, 1012);
  s += `<g transform="translate(850,858)">${L.ferry({ width: 500, hull: '#22132F', cabin: '#331B45', lit: '#FFD07A', stripe: '#E4573D' }).replace(/<svg[^>]*>/, '<g>').replace('</svg>', '</g>')}</g>`;
  s += `<ellipse cx="1100" cy="1030" rx="250" ry="10" fill="#000" opacity=".18"/>`;
  // küçük vapurlar
  const small = (x, y, w, flip, lit) => `<g transform="translate(${x},${y}) ${flip ? `scale(-1,1) translate(${-w},0)` : ''}">${L.ferry({ width: w, hull: '#1A1130', cabin: '#26183C', lit, stripe: '#C64A45' }).replace(/<svg[^>]*>/, '<g>').replace('</svg>', '</g>')}</g>`;
  s += small(4000, 905, 240, false, '#FFCB7A') + small(6350, 900, 250, true, '#FFD98C');
  // martılar
  const gulls = [[130, 800, 70], [870, 690, 54], [960, 740, 40], [1500, 480, 60], [1640, 420, 44], [1330, 560, 38], [2700, 420, 50]];
  for (const [x, y, sz] of gulls) s += `<g transform="translate(${x},${y})">${L.gull(sz, '#2A1236', .8).replace(/<svg[^>]*>/, '<g>').replace('</svg>', '</g>')}</g>`;
  return s + '</svg>';
}
const PAN = panorama();

function slide(i, inner, { color = '#F8ECD8', hdr = true, ftr = true, last = false } = {}) {
  return page(`<div class="slide">
  <div class="abs" style="left:${-(i - 1) * W}px;top:0">${PAN}</div>
  <div class="abs" style="inset:0;background:linear-gradient(180deg,rgba(18,10,34,.5) 0,rgba(18,10,34,0) 32%)"></div>
  ${inner}${hdr ? header(i, N, color) : ''}${ftr ? footer(color, '@demlik.kadikoy', 'kaydır', last) : ''}</div>`,
    `.t{font-family:'Noto Serif Display',serif;color:#F8ECD8;font-weight:500;letter-spacing:-.015em}
     .t i{font-style:italic;color:${C.amberL};font-weight:500}
     .card{background:rgba(22,10,40,.5);border:1.5px solid rgba(255,235,205,.22);border-radius:38px;backdrop-filter:blur(8px)}
     .lbl{font-weight:700;letter-spacing:.2em;font-size:22px;color:${C.amberL};text-transform:uppercase}`);
}

const chip = (t, y = 190) => `<div class="abs" style="left:80px;top:${y}px;display:flex;align-items:center;gap:16px"><div style="width:54px;height:3px;background:${C.amberL}"></div><div class="lbl">${t}</div></div>`;

const slides = [];

// 1 — kapak
slides.push(slide(1, `
  ${chip('Yeni sonbahar harmanı')}
  ${at(80, 250, 920, `<div class="t" style="font-size:198px;line-height:.92">Gün bitti.</div><div class="t" style="font-size:118px;line-height:1.1;margin-top:10px"><i>Çay yeni başlıyor.</i></div>`)}
  ${at(190, 712, 700, `<div style="display:flex;justify-content:center">${L.glass({ width: 400, fill: 0.8, tea: ['#FFB65A', '#D9542B', '#7A1D10'] })}</div>`, 'z-index:5')}
  <div class="abs" style="left:545px;top:606px;z-index:6;opacity:.95">${L.steam('#FFEFD6', .55, 140, 150, 6)}</div>
  ${at(80, 1150, 400, `<div class="lbl" style="color:#FFE6C2;font-size:21px;line-height:1.5">Kadıköy Akşamı<br><span style="opacity:.7;color:#FFE6C2">harman no. 04</span></div>`, 'display:none')}
`));

// 2
slides.push(slide(2, `
  ${chip('Akşam, Kadıköy')}
  ${at(80, 250, 920, `<div class="t" style="font-size:118px;line-height:1.02">Kadıköy’de akşam bir saat değil, bir <i>haldir.</i></div>`)}
  ${at(80, 690, 640, `<div style="font-size:34px;line-height:1.42;color:#FFEBD2;opacity:.92">Vapur düdüğü, simit kokusu, Moda’da batan güneş. Biz de o hali bir harmana sığdırdık.</div>`)}
`));

// 3 — üç nota
const noteCard = (y, no, name, desc, icon, tint) => at(80, y, 920, `
  <div class="card" style="height:152px;display:flex;align-items:center;padding:0 34px;gap:32px">
    <div style="width:104px;height:104px;border-radius:50%;background:${tint};display:flex;align-items:center;justify-content:center;flex:none">${icon}</div>
    <div><div class="lbl" style="font-size:19px;opacity:.9">Nota ${no}</div>
    <div class="t" style="font-size:54px;line-height:1.05;margin-top:2px">${name}</div>
    <div style="font-size:26px;color:#FFEBD2;opacity:.88;margin-top:2px">${desc}</div></div></div>`);
slides.push(slide(3, `
  ${chip('İçindekiler')}
  ${at(80, 245, 920, `<div class="t" style="font-size:96px;line-height:1">Üç nota, <i>bir akşam.</i></div>`)}
  ${noteCard(400, '01', 'Bakır', 'Koyu, dolgun, Karadeniz’den siyah çay tabanı.', L.iconLeaf(84), 'rgba(126,155,87,.28)')}
  ${noteCard(576, '02', 'Turunç', 'Bir tutam parlak kabuk: ilk yudumun kıvılcımı.', L.iconPeel(84), 'rgba(245,160,60,.28)')}
  ${noteCard(752, '03', 'Duman', 'Ateşte kavrulmuş tarçın; uzun, sıcak bir bitiş.', L.iconCinnamon(90), 'rgba(196,110,60,.3)')}
`));

// 4 — yudum yudum
const leader = (x1, y1, x2, y2) => `<svg class="abs" style="left:0;top:0;z-index:4" width="1080" height="1350"><path d="M${x1} ${y1}L${x2} ${y2}" stroke="#FFE6C2" stroke-width="2.500" stroke-dasharray="2 8" stroke-linecap="round" opacity=".85"/><circle cx="${x2}" cy="${y2}" r="7" fill="${C.amberL}"/></svg>`;
slides.push(slide(4, `
  ${chip('Tadım notları')}
  ${at(80, 245, 920, `<div class="t" style="font-size:96px;line-height:1">Üç yudum, <i>üç hal.</i></div>`)}
  ${at(330, 372, 420, L.glass({ width: 420, fill: 0.86, tea: ['#FFB65A', '#D9542B', '#6F190E'] }), 'z-index:3')}
  ${leader(330, 520, 478, 520)}${leader(750, 665, 592, 665)}${leader(330, 800, 486, 800)}
  ${at(80, 440, 250, `<div class="lbl" style="font-size:20px">01 · İlk yudum</div><div class="t" style="font-size:46px;line-height:1.05;margin-top:6px">Turunç,<br>parlak.</div>`)}
  ${at(770, 585, 240, `<div class="lbl" style="font-size:20px">02 · Ortası</div><div class="t" style="font-size:46px;line-height:1.05;margin-top:6px">Bal rengi gövde.</div>`)}
  ${at(80, 700, 280, `<div class="lbl" style="font-size:20px">03 · Son</div><div class="t" style="font-size:46px;line-height:1.05;margin-top:6px">Tarçın, uzun<br>bir <i>“hıh.”</i></div>`)}
`));

// 5 — saat
function clock() {
  const cx = 250, cy = 250, R = 236;
  const pt = (h, r) => { const a = (h / 12) * Math.PI * 2 - Math.PI / 2; return [cx + Math.cos(a) * r, cy + Math.sin(a) * r]; };
  let ticks = '', nums = '';
  for (let m = 0; m < 60; m++) { const a = m / 60 * Math.PI * 2; const big = m % 5 === 0; const r1 = R - (big ? 30 : 16), r2 = R - 6; ticks += `<line x1="${cx + Math.sin(a) * r1}" y1="${cy - Math.cos(a) * r1}" x2="${cx + Math.sin(a) * r2}" y2="${cy - Math.cos(a) * r2}" stroke="#3A1F14" stroke-width="${big ? 5 : 2}" stroke-linecap="round" opacity="${big ? 1 : .55}"/>`; }
  for (let h = 1; h <= 12; h++) { const [x, y] = pt(h, R - 66); nums += `<text x="${x}" y="${y + 17}" text-anchor="middle" font-family="Noto Serif Display" font-weight="600" font-size="50" fill="#3A1F14">${h}</text>`; }
  // 18:00–21:00 => 6..9 arası dilim
  const [ax, ay] = pt(6, R - 8), [bx, by] = pt(9, R - 8);
  const arc = `<path d="M${cx} ${cy}L${ax} ${ay}A${R - 8} ${R - 8} 0 0 1 ${bx} ${by}Z" fill="${C.tavsanL}" opacity=".9"/>`;
  const hx = pt(7, 100), mx = pt(0, 138);
  return `<svg width="500" height="500" viewBox="0 0 500 500"><circle cx="${cx}" cy="${cy}" r="${R + 14}" fill="#000" opacity=".18" transform="translate(0,10)"/><circle cx="${cx}" cy="${cy}" r="${R + 14}" fill="#5A2E1C"/><circle cx="${cx}" cy="${cy}" r="${R + 2}" fill="#F7EBD5"/>${arc}<circle cx="${cx}" cy="${cy}" r="${R - 44}" fill="#F7EBD5" opacity=".0"/>${ticks}${nums}
  <line x1="${cx}" y1="${cy}" x2="${hx[0]}" y2="${hx[1]}" stroke="#2B1710" stroke-width="13" stroke-linecap="round"/><line x1="${cx}" y1="${cy}" x2="${mx[0]}" y2="${mx[1]}" stroke="#2B1710" stroke-width="8" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="15" fill="#2B1710"/><circle cx="${cx}" cy="${cy}" r="6" fill="${C.amberL}"/></svg>`;
}
slides.push(slide(5, `
  ${chip('Ne zaman içilir?')}
  ${at(80, 245, 920, `<div class="t" style="font-size:96px;line-height:1">Saati belli: <i>akşam.</i></div>`)}
  ${at(290, 340, 500, clock())}
  ${at(80, 890, 920, `<div class="card" style="padding:34px 40px 36px;text-align:center"><div class="t" style="font-size:78px;line-height:1">18:00 – 21:00</div><div style="font-size:31px;line-height:1.4;color:#FFEBD2;margin-top:14px">İş çıkışı ile akşam yemeği arası.<br>Bildirimleri sustur, demliği konuştur.</div></div>`, 'z-index:5')}
`));

// 6 — eşlikçiler
const pair = (x, y, icon, name, desc) => at(x, y, 430, `<div class="card" style="height:250px;padding:26px 30px;border-radius:38px;display:flex;flex-direction:column;justify-content:space-between"><div style="display:flex;justify-content:space-between;align-items:flex-start"><div class="t" style="font-size:46px;line-height:1.02">${name}</div><div style="margin:-6px -6px 0 0">${icon}</div></div><div style="font-size:26px;line-height:1.35;color:#FFEBD2;opacity:.9">${desc}</div></div>`);
slides.push(slide(6, `
  ${chip('Eşlikçiler')}
  ${at(80, 245, 920, `<div class="t" style="font-size:96px;line-height:1">Yanına <i>ne gider?</i></div>`)}
  ${pair(80, 400, L.iconSimit(120), 'Sıcak simit', 'Susamlı, çıtır; turunçla iyi anlaşır.')}
  ${pair(570, 400, L.iconChestnut(120), 'Kestane', 'Sonbaharın kendisi. Tarçınla dost.')}
  ${pair(80, 672, L.iconWalnut(120), 'Ceviz içi', 'Bir avuç; bakır notayı derinleştirir.')}
  ${pair(570, 672, L.iconLokum(120), 'Lokum', 'Tek küp yeter; çay zaten tatlı.')}
`));

// 7 — kampanya
function badge() {
  const t = 'DEMİNİ AL ✦ DEMİNİ AL ✦ DEMİNİ AL ✦ ';
  return `<svg width="250" height="250" viewBox="0 0 250 250" style="transform:rotate(-12deg)"><defs><path id="bc" d="M125 125m-92 0a92 92 0 1 1 184 0a92 92 0 1 1 -184 0"/></defs><circle cx="125" cy="125" r="122" fill="${C.tavsanL}"/><circle cx="125" cy="125" r="112" fill="none" stroke="#FFE6C2" stroke-width="2" stroke-dasharray="3 7"/><text font-family="Noto Sans" font-weight="800" font-size="21" letter-spacing="3.400" fill="#FFF3DC"><textPath href="#bc">${t}</textPath></text><g transform="translate(125,125)"><path d="M-24 -18h48c0 14 -6 20 -12 24-2 2-2 5 0 8 2 3 4 6 4 10h-32c0-4 2-7 4-10 2-3 2-6 0-8-6-4-12-10-12-24z" fill="#FFF3DC" transform="scale(1.100) translate(0,-8)"/></g></svg>`;
}
slides.push(slide(7, `
  ${chip('Ekim kampanyası')}
  ${at(80, 245, 920, `<div class="t" style="font-size:150px;line-height:.95"><i>Demini</i> Al.</div>`)}
  ${at(60, 430, 700, `<div class="t" style="font-size:460px;line-height:.9;color:#FFF3DC;letter-spacing:-.04em;text-shadow:0 10px 50px rgba(20,8,30,.5)">%20</div>`)}
  ${at(775, 420, 250, badge(), 'z-index:6')}
  ${at(80, 1110, 920, `<div class="t" style="font-size:50px;line-height:1.15;color:#FFF3DC"><i>İlk hafta,</i> cumartesi demleme atölyesinde.</div>`)}
`));

// 8 — çağrı
slides.push(slide(8, `
  ${chip('Moda’da buluşalım')}
  ${at(80, 245, 880, `<div class="t" style="font-size:158px;line-height:.94">Akşamı<br><i>kaçırma.</i></div>`)}
  ${at(80, 740, 920, `
    <div style="background:#F6EAD3;border-radius:44px;padding:50px 56px;color:#2B1710;box-shadow:0 30px 80px rgba(8,4,24,.5)">
      <div class="lbl" style="color:${C.tavsan};font-size:20px">Kadıköy Akşamı · şimdi rafta</div>
      <div class="t" style="color:#2B1710;font-size:60px;line-height:1.05;margin-top:14px">Moda Cd. No: 42, Kadıköy</div>
      <div style="height:2px;background:#2B171022;margin:30px 0"></div>
      <div style="display:flex;justify-content:space-between;font-size:33px;font-weight:600"><span>@demlik.kadikoy</span><span>demlik.com.tr</span></div>
    </div>
    <div style="display:flex;gap:16px;margin-top:30px">${['Kaydet', 'Arkadaşına yolla', 'Cumartesi gel'].map(t => `<div style="flex:1;text-align:center;padding:20px 0;border:2px solid #FFE6C2;border-radius:100px;color:#FFF3DC;font-weight:700;font-size:26px;letter-spacing:.02em;background:rgba(20,8,40,.35)">${t}</div>`).join('')}</div>`, 'z-index:5')}
  ${at(0, 1245, 1080, `<div class="t" style="text-align:center;font-size:44px;color:#FFE6C2"><i>Çay acele sevmez.</i></div>`)}
`, { last: true, ftr: false }));

module.exports = { dir: 'kadikoy-aksami-lansman', slides };
