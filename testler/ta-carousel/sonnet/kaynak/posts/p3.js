// Gönderi 3 — Kahve siparişin, çay kaderin (paylaşılabilir eşleştirme + radar)
const L = require('../lib');
const { C, at, page, rng } = L;
const N = 8;
const CSS = `
.t{font-family:'Noto Serif Display',serif;font-weight:500;letter-spacing:-.015em}
.lbl{font-weight:700;letter-spacing:.2em;font-size:22px;text-transform:uppercase}
.chip{display:inline-block;padding:11px 24px;border-radius:40px;font-weight:700;font-size:24px;letter-spacing:.04em;margin-right:12px}
`;
const arrow = c => `<svg width="54" height="20" viewBox="0 0 54 20" style="margin-left:14px"><path d="M2 10h48M42 2l8 8-8 8" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const hdr = (i, c) => `<div class="abs" style="left:80px;right:80px;top:70px;display:flex;justify-content:space-between;align-items:center;z-index:20">${L.wordmark(c, 40)}<div class="mono" style="font-size:24px;letter-spacing:.14em;color:${c};opacity:.85">${String(i).padStart(2, '0')} / ${String(N).padStart(2, '0')}</div></div>`;
const ftr = (c, last) => `<div class="abs" style="left:80px;right:80px;bottom:60px;display:flex;justify-content:space-between;align-items:center;z-index:20"><div class="cap" style="color:${c};font-size:21px;opacity:.85">@demlik.kadikoy</div>${last ? `<div class="cap" style="color:${c};font-size:21px;opacity:.85">demlik.com.tr</div>` : `<div class="cap" style="color:${c};font-size:21px;display:flex;align-items:center">kaydır${arrow(c)}</div>`}</div>`;
const slides = [];

// silüet bardak (kapak)
function glassSil(w, color = '#2B1710') {
  const g = L.glass({ width: w, fill: 0.8, plate: false, shadow: false, glow: false, tea: [color, color, color] });
  return g;
}

// 1 — kapak
const menuRow = (y, cupHtml, name, hint) => `
  <div class="abs" style="left:60px;top:${y}px">${cupHtml}</div>
  <div class="abs" style="left:330px;top:${y + 52}px"><div class="lbl" style="font-size:18px;color:${C.tavsan};opacity:.9">${hint}</div><div class="t" style="font-size:52px;color:${C.ink};line-height:1.05;margin-top:2px">${name}</div></div>
  <svg class="abs" style="left:0;top:${y}px" width="1080" height="180"><path d="M690 116L790 116" stroke="${C.tavsan}" stroke-width="3" stroke-dasharray="2 10" stroke-linecap="round" opacity=".8"/></svg>
  <div class="abs" style="left:830px;top:${y + 4}px;width:170px;height:176px;display:flex;align-items:center;justify-content:center">
    <svg width="170" height="176" viewBox="0 0 170 176"><defs><clipPath id="q${y}"><rect x="0" y="0" width="170" height="176"/></clipPath></defs>
    <g transform="translate(24,-4) scale(.6)">${L.glass({ width: 200, fill: .8, plate: false, shadow: false, glow: false, tea: ['#3A2216', '#2B1710', '#1C0F09'] }).replace(/<svg[^>]*>/, '<g>').replace('</svg>', '</g>')}</g>
    </svg><div class="t" style="position:absolute;left:0;right:0;top:54px;text-align:center;font-size:66px;font-style:italic;color:${C.amberL}">?</div></div>`;
slides.push(page(`<div class="slide" style="background:${C.cream}">
  <div class="abs" style="inset:0;background:radial-gradient(circle at 20% 10%,#FFF7E8,rgba(255,247,232,0) 60%)"></div>
  ${hdr(1, C.ink)}
  <div class="abs" style="left:80px;top:190px;display:flex;align-items:center;gap:16px"><div style="width:54px;height:3px;background:${C.tavsan}"></div><div class="lbl" style="color:${C.tavsan}">Kahveciler için çay haritası</div></div>
  <div class="abs" style="left:80px;top:248px;width:920px"><div class="t" style="font-size:112px;line-height:1;color:${C.ink};white-space:nowrap">Kahve siparişin,<br><i style="color:${C.tavsan}">çay kaderin.</i></div></div>
  ${menuRow(600, L.cup({ kind: 'espresso', width: 250, body: '#2C6F86', rim: '#4E93AA', accent: null }), 'Espresso', 'kısa ve sert')}
  ${menuRow(800, L.cup({ kind: 'turkish', width: 250, body: '#A8301B', accent: '#F4D9A0', rim: '#E9C58A', coffee: '#3A1F10', foam: '#B98650' }), 'Türk kahvesi', 'köpüklü, sohbetli')}
  ${menuRow(1000, L.cup({ kind: 'latte', width: 250, body: '#B5C39A', rim: '#DCE5C6', accent: null }), 'Latte', 'yumuşak ve sütlü')}
  ${ftr(C.ink)}
</div>`, CSS));

// 2 — masaya bir bardak daha
slides.push(page(`<div class="slide" style="background:#1B0F0A">
  <div class="abs" style="inset:0;background:radial-gradient(circle at 50% 30%,#6A4028 0,#3A2116 45%,#1B0F0A 100%)"></div>
  ${hdr(2, '#FFF3E0')}
  <div class="abs" style="left:80px;top:190px;display:flex;align-items:center;gap:16px"><div style="width:54px;height:3px;background:${C.amberL}"></div><div class="lbl" style="color:${C.amberL}">Bir öneri</div></div>
  <div class="abs" style="left:80px;top:248px;width:920px"><div class="t" style="font-size:98px;line-height:1.02;color:#FFF3E0">Kahveyi bırakma.<br><i style="color:${C.amberL}">Bir bardak da çay.</i></div></div>
  <div class="abs" style="left:0;top:960px;width:1080px;height:390px;background:linear-gradient(180deg,#6B4429,#3E2515)"></div>
  <div class="abs" style="left:0;top:960px;width:1080px;height:6px;background:#8B5E3C"></div>
  ${[1, 2, 3].map(i => `<div class="abs" style="left:0;top:${960 + i * 95}px;width:1080px;height:3px;background:#00000030"></div>`).join('')}
  <div class="abs" style="left:56px;top:665px;z-index:3">${L.cup({ kind: 'espresso', width: 470, body: '#FBF3E3' })}</div>
  <div class="abs" style="left:190px;top:560px;z-index:4;opacity:.8">${L.steam('#FFEFD6', .5, 110, 120, 6)}</div>
  <div class="abs" style="left:610px;top:575px;z-index:3">${L.glass({ width: 330, fill: .82, tea: ['#FFB65A', '#D9542B', '#6F190E'] })}</div>
  <div class="abs" style="left:700px;top:445px;z-index:4;opacity:.8">${L.steam('#FFEFD6', .55, 140, 130, 6)}</div>
  <div class="abs" style="left:80px;top:1115px;width:920px"><div class="t" style="font-size:44px;line-height:1.25;font-style:italic;color:#FFE2B8">Kahve siparişine göre çayını buluyoruz.<br><span style="font-size:34px;opacity:.85">Üç soru değil, üç kaydırma.</span></div></div>
  ${ftr('#FFF3E0')}
</div>`, CSS));

// 3 eşleşme slaytı
function match(i, cfg) {
  const { top, bot, botText, coffeeName, tagline, cupHtml, glassTea, blend, desc, chips, chipBg, chipFg, accent, topAccent, topText = '#FFF3E0' } = cfg;
  return page(`<div class="slide" style="background:${bot}">
  <div class="abs" style="inset:0;background:radial-gradient(circle at 78% 68%,rgba(255,255,255,.16),rgba(255,255,255,0) 55%)"></div>
  <div class="abs" style="left:0;top:0;width:1080px;height:640px;background:${top};clip-path:polygon(0 0,100% 0,100% 520px,0 610px)">
    <div class="abs" style="inset:0;background:radial-gradient(circle at 25% 20%,rgba(255,255,255,.12),rgba(255,255,255,0) 60%)"></div>
  </div>
  ${hdr(i, topText)}
  <div class="abs" style="left:80px;top:195px;width:560px;z-index:5"><div class="lbl" style="color:${topAccent || accent}">Kahve siparişin</div>
    <div class="t" style="font-size:${cfg.coffeeSize || 118}px;line-height:.98;color:${topText};margin-top:14px">${coffeeName}</div>
    <div class="t" style="font-size:38px;line-height:1.15;font-style:italic;color:${topAccent || accent};margin-top:16px;width:380px">${tagline}</div></div>
  <div class="abs" style="left:600px;top:${cfg.cupTop ?? 170}px;z-index:4">${cupHtml}</div>
  <div class="abs" style="left:462px;top:487px;width:156px;height:156px;border-radius:50%;background:${C.cream};box-shadow:0 10px 30px rgba(0,0,0,.3);display:flex;align-items:center;justify-content:center;z-index:9;transform:rotate(-8deg)"><svg width="84" height="64" viewBox="0 0 84 64"><rect x="4" y="8" width="76" height="17" rx="8.500" fill="${C.tavsan}"/><rect x="4" y="39" width="76" height="17" rx="8.500" fill="${C.tavsan}"/></svg></div>
  <div class="abs" style="left:80px;top:700px;width:600px;z-index:5"><div class="lbl" style="color:${accent}">Çayın</div>
    <div class="t" style="font-size:112px;line-height:.98;color:${botText};margin-top:12px">${blend}</div>
    <div style="font-size:34px;line-height:1.38;color:${botText};opacity:.94;margin-top:26px;width:590px">${desc}</div>
    <div style="margin-top:30px">${chips.map(c => `<span class="chip" style="background:${chipBg};color:${chipFg}">${c}</span>`).join('')}</div></div>
  <div class="abs" style="left:690px;top:690px;z-index:4">${L.glass({ width: 320, fill: .82, tea: glassTea })}</div>
  ${ftr(botText)}
</div>`, CSS);
}
slides.push(match(3, {
  top: '#2A1710', bot: '#1F3D2E', botText: '#F4EAD9', accent: C.amberL, chipBg: 'rgba(244,234,217,.14)', chipFg: '#F4EAD9',
  coffeeName: 'Espresso', tagline: 'kısa, sert, acele.',
  cupHtml: L.cup({ kind: 'espresso', width: 440, body: '#FBF3E3' }), blend: 'Karadeniz<br>Sabahı', glassTea: ['#F0A54A', '#B8451C', '#5E150A'],
  desc: 'Koyu, dolgun, net. İlk yudumda uyandırır; süt de şeker de istemez.', chips: ['koyu', 'net', 'enerjik'],
}));
slides.push(match(4, {
  top: '#4A2214', bot: '#23244F', botText: '#F8ECD8', accent: C.amberL, chipBg: 'rgba(248,236,216,.14)', chipFg: '#F8ECD8',
  coffeeName: 'Türk<br>kahvesi', coffeeSize: 108, tagline: 'sohbet uzar, fincan soğur.',
  cupHtml: L.cup({ kind: 'turkish', width: 440, body: '#A8301B', accent: '#F4D9A0', rim: '#E9C58A', coffee: '#3A1F10', foam: '#B98650' }),
  blend: 'Kadıköy<br>Akşamı', glassTea: ['#FFB65A', '#D9542B', '#6F190E'],
  desc: 'Turunç, tarçın, bakır. Sohbeti kahve kadar uzatır; fal yerine bir bardak daha.', chips: ['baharatlı', 'sıcak', 'sohbetlik'],
}));
slides.push(match(5, {
  top: '#8B5E3C', bot: '#C9C77E', botText: '#1F3D2E', accent: '#5B6B22', chipBg: 'rgba(31,61,46,.12)', chipFg: '#1F3D2E',
  coffeeName: 'Latte', tagline: 'yumuşak, sütlü, yavaş.',
  cupHtml: L.cup({ kind: 'latte', width: 440, body: '#B5C39A', rim: '#DCE5C6' }), blend: 'Adaçaylı<br>Bergamot', glassTea: ['#F6E88A', '#D0B93A', '#8C7E1E'],
  desc: 'Pürüzsüz, çiçeksi, ferah. Latte sevenlere hafif ve sıcacık bir kucak.', chips: ['yumuşak', 'çiçeksi', 'ferah'],
  topText: '#FFF6E4', topAccent: '#FFE2A8',
}));

// 6 — radar
function radar() {
  const axes = ['Gövde', 'Çiçeksi', 'Baharat', 'Tatlılık', 'Ferahlık'];
  const data = [
    { n: 'Karadeniz Sabahı', c: '#1F3D2E', v: [5, 1, 2, 2, 3] },
    { n: 'Kadıköy Akşamı', c: '#D9542B', v: [4, 2, 5, 4, 2] },
    { n: 'Adaçaylı Bergamot', c: '#B7A315', v: [2, 5, 1, 3, 5] },
  ];
  const cx = 350, cy = 340, R = 275;
  const pt = (i, v) => { const a = -Math.PI / 2 + i / 5 * Math.PI * 2, r = R * v / 5; return [cx + Math.cos(a) * r, cy + Math.sin(a) * r]; };
  let s = '';
  for (let k = 1; k <= 5; k++) s += `<polygon points="${axes.map((_, i) => pt(i, k).join(',')).join(' ')}" fill="${k % 2 ? '#00000006' : 'none'}" stroke="#2B1710" stroke-opacity="${k === 5 ? .5 : .2}" stroke-width="${k === 5 ? 2.5 : 1.5}"/>`;
  axes.forEach((a, i) => { const [x, y] = pt(i, 5); s += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="#2B1710" stroke-opacity=".2" stroke-width="1.500"/>`; const [lx, ly] = pt(i, 6.15); s += `<text x="${lx}" y="${ly + 8}" text-anchor="middle" font-family="Noto Sans" font-weight="700" font-size="26" letter-spacing="1" fill="#2B1710">${a}</text>`; });
  data.forEach(d => { const pts = d.v.map((v, i) => pt(i, v).join(',')).join(' '); s += `<polygon points="${pts}" fill="${d.c}" fill-opacity=".2" stroke="${d.c}" stroke-width="5" stroke-linejoin="round"/>` + d.v.map((v, i) => { const [x, y] = pt(i, v); return `<circle cx="${x}" cy="${y}" r="8" fill="${d.c}" stroke="#F4EAD9" stroke-width="3"/>`; }).join(''); });
  return `<svg width="700" height="680" viewBox="0 0 700 680" style="overflow:visible">${s}</svg>`;
}
slides.push(page(`<div class="slide" style="background:${C.cream}">
  ${hdr(6, C.ink)}
  <div class="abs" style="left:80px;top:190px;display:flex;align-items:center;gap:16px"><div style="width:54px;height:3px;background:${C.tavsan}"></div><div class="lbl" style="color:${C.tavsan}">Damak haritası</div></div>
  <div class="abs" style="left:80px;top:248px;width:920px"><div class="t" style="font-size:100px;line-height:1;color:${C.ink}">Üçü, <i style="color:${C.tavsan}">yan yana.</i></div></div>
  <div class="abs" style="left:190px;top:420px">${radar()}</div>
  <div class="abs" style="left:80px;top:1130px;width:920px;display:flex;justify-content:space-between">
    ${[['Karadeniz Sabahı', '#1F3D2E'], ['Kadıköy Akşamı', '#D9542B'], ['Adaçaylı Bergamot', '#B7A315']].map(([n, c]) => `<div style="display:flex;align-items:center;gap:12px"><div style="width:22px;height:22px;border-radius:50%;background:${c}"></div><div style="font-weight:700;font-size:25px;color:${C.ink}">${n}</div></div>`).join('')}</div>
  <div class="abs" style="left:80px;top:1190px;width:920px"><div style="font-family:'Noto Serif Display';font-style:italic;font-size:31px;color:#6B4636">Puanlar bizim damağımızdan; asıl hakem senin damağın.</div></div>
  ${ftr(C.ink)}
</div>`, CSS));

// 7 — ilk çay kuralları
const rule = (y, n, title, txt) => `<div class="abs" style="left:80px;top:${y}px;width:920px;display:flex;gap:36px;align-items:flex-start">
  <div class="t" style="font-size:180px;line-height:.8;font-style:italic;color:${C.tavsan};width:120px;flex:none">${n}</div>
  <div style="border-top:2.5px solid ${C.ink}33;padding-top:20px;flex:1"><div class="t" style="font-size:64px;line-height:1.05;color:${C.ink}">${title}</div><div style="font-size:33px;line-height:1.4;color:#4A2C20;margin-top:12px">${txt}</div></div></div>`;
slides.push(page(`<div class="slide" style="background:${C.cream2}">
  ${hdr(7, C.ink)}
  <div class="abs" style="left:80px;top:190px;display:flex;align-items:center;gap:16px"><div style="width:54px;height:3px;background:${C.tavsan}"></div><div class="lbl" style="color:${C.tavsan}">Kahveciye not</div></div>
  <div class="abs" style="left:80px;top:248px;width:920px"><div class="t" style="font-size:96px;line-height:1;color:${C.ink}">İlk çayda <i style="color:${C.tavsan}">3 kural.</i></div></div>
  ${rule(480, '1', 'İlk yudum sade.', 'Süt ve şeker yok. Önce çayın kendi sesini duy; sonra karar ver.')}
  ${rule(740, '2', 'Sıcak içme, ılık içme.', 'Kahve gibi yakıp içme. Bardağı elinde bir dakika bekle, tat açılır.')}
  ${rule(1000, '3', 'Ekran değil, bardak.', 'İlk bardakta telefonu bırak. Çay acele sevmez.')}
  ${ftr(C.ink)}
</div>`, CSS));

// 8 — CTA
slides.push(page(`<div class="slide" style="background:${C.tavsan}">
  <div class="abs" style="inset:0;background:radial-gradient(circle at 70% 55%,#D6512B 0,#A8301B 50%,#6E170C 100%)"></div>
  ${hdr(8, '#FFF3E0')}
  <div class="abs" style="left:80px;top:190px;display:flex;align-items:center;gap:16px"><div style="width:54px;height:3px;background:${C.amberL}"></div><div class="lbl" style="color:${C.amberL}">Karar veremedin mi?</div></div>
  <div class="abs" style="left:80px;top:248px;width:920px"><div class="t" style="font-size:118px;line-height:.98;color:#FFF3E0">Üçünü de <i style="color:${C.amberL}">tat.</i></div></div>
  <div class="abs" style="left:80px;top:430px;width:600px;font-size:37px;line-height:1.4;color:#FFE8CE">Cumartesi demleme atölyesinde üç harmanı yan yana içeriz. Hangisi seni seçiyor, birlikte bakarız.</div>
  <div class="abs" style="left:20px;top:730px;display:flex;align-items:flex-end">
    <div style="transform:rotate(-6deg);margin-right:-40px">${L.glass({ width: 300, fill: .82, tea: ['#F0A54A', '#B8451C', '#5E150A'] })}</div>
    <div style="z-index:2">${L.glass({ width: 370, fill: .82, tea: ['#FFB65A', '#D9542B', '#6F190E'] })}</div>
    <div style="transform:rotate(6deg);margin-left:-40px">${L.glass({ width: 300, fill: .82, tea: ['#F6E88A', '#D0B93A', '#8C7E1E'] })}</div></div>
  <div class="abs" style="left:700px;top:430px;width:300px;text-align:center;transform:rotate(7deg)"><div style="display:inline-block;background:${C.amberL};color:${C.ink};border-radius:50%;width:230px;height:230px;padding-top:44px"><div class="t" style="font-size:100px;line-height:1">%20</div><div class="lbl" style="font-size:17px;letter-spacing:.14em;margin-top:4px">ilk hafta</div><div class="lbl" style="font-size:17px;letter-spacing:.14em">atölyede</div></div></div>
  ${ftr('#FFF3E0', true)}
</div>`, CSS));

module.exports = { dir: 'kahve-siparisin-cay-kaderin', slides };
