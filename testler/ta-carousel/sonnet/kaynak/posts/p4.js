// Gönderi 4 — Cumartesi Demleme Atölyesi (bilet konsepti)
const L = require('../lib');
const { C, page, rng } = L;
const N = 8;
const G = '#1F3D2E';
const CSS = `
.t{font-family:'Noto Serif Display',serif;font-weight:500;letter-spacing:-.015em}
.lbl{font-weight:700;letter-spacing:.2em;font-size:22px;text-transform:uppercase}
`;
const arrow = c => `<svg width="54" height="20" viewBox="0 0 54 20" style="margin-left:14px"><path d="M2 10h48M42 2l8 8-8 8" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const hdr = (i, c) => `<div class="abs" style="left:80px;right:80px;top:70px;display:flex;justify-content:space-between;align-items:center;z-index:30">${L.wordmark(c, 40)}<div class="mono" style="font-size:24px;letter-spacing:.14em;color:${c};opacity:.85">${String(i).padStart(2, '0')} / ${String(N).padStart(2, '0')}</div></div>`;
const ftr = (c, last) => `<div class="abs" style="left:80px;right:80px;bottom:60px;display:flex;justify-content:space-between;align-items:center;z-index:30"><div class="cap" style="color:${c};font-size:21px;opacity:.85">@demlik.kadikoy</div>${last ? `<div class="cap" style="color:${c};font-size:21px;opacity:.85">demlik.com.tr</div>` : `<div class="cap" style="color:${c};font-size:21px;display:flex;align-items:center">kaydır${arrow(c)}</div>`}</div>`;
const chip = (t, c = C.amberL) => `<div class="abs" style="left:80px;top:190px;display:flex;align-items:center;gap:16px;z-index:30"><div style="width:54px;height:3px;background:${c}"></div><div class="lbl" style="color:${c}">${t}</div></div>`;

// yaprak desenli yeşil zemin
function leafBg(color = G, op = .07) {
  const r = rng(3); let s = '';
  for (let i = 0; i < 70; i++) {
    const x = r() * 1080, y = r() * 1350, sc = .5 + r() * .8, a = r() * 360;
    s += `<path transform="translate(${x.toFixed(0)},${y.toFixed(0)}) rotate(${a.toFixed(0)}) scale(${sc.toFixed(2)})" d="M0 0C18 -28 52 -30 70 -6 46 20 16 20 0 0Z M4 0L62 -8" fill="#F4EAD9" stroke="none"/>`;
  }
  return `<div class="abs" style="inset:0;background:radial-gradient(circle at 70% 20%,#2D5641,${color} 60%,#152B20)"></div><svg class="abs" style="left:0;top:0;opacity:${op}" width="1080" height="1350">${s}</svg>`;
}

// kavanoz
function jar({ width = 220, leaf = '#3A2416', label = 'HARMAN', lid = '#B5651D', no = '' } = {}) {
  const g = L.uid('jr');
  const r = rng(21); let lv = '';
  for (let i = 0; i < 60; i++) { const x = 44 + r() * 112, y = 126 + Math.pow(r(), .7) * 108; lv += `<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="${(6 + r() * 6).toFixed(1)}" ry="2.400" transform="rotate(${(r() * 180).toFixed(0)} ${x.toFixed(0)} ${y.toFixed(0)})" fill="${['#2E1B10', '#4B3A1B', '#5C4520', '#3F2616'][Math.floor(r() * 4)]}"/>`; }
  return `<svg width="${width}" height="${width * 1.3}" viewBox="0 0 200 260"><defs><linearGradient id="${g}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".25" stop-color="#fff" stop-opacity=".05"/><stop offset=".8" stop-color="#000" stop-opacity=".05"/><stop offset="1" stop-color="#000" stop-opacity=".22"/></linearGradient><clipPath id="${g}c"><rect x="30" y="70" width="140" height="170" rx="28"/></clipPath></defs>
  <ellipse cx="100" cy="246" rx="82" ry="9" fill="#000" opacity=".25"/>
  <rect x="30" y="70" width="140" height="170" rx="28" fill="#F4EAD9" fill-opacity=".22" stroke="#fff" stroke-opacity=".7" stroke-width="3"/>
  <g clip-path="url(#${g}c)"><rect x="30" y="116" width="140" height="130" fill="#2A1710" opacity=".9"/>${lv}<rect x="30" y="70" width="140" height="170" fill="url(#${g})"/></g>
  <rect x="36" y="34" width="128" height="44" rx="10" fill="${lid}"/><rect x="36" y="34" width="128" height="14" rx="7" fill="#fff" opacity=".22"/>
  <rect x="52" y="128" width="96" height="76" rx="8" fill="#F7EFE0" transform="rotate(-2 100 166)"/><rect x="60" y="136" width="80" height="60" rx="4" fill="none" stroke="${C.tavsan}" stroke-width="1.800" transform="rotate(-2 100 166)"/>
  <text x="100" y="164" text-anchor="middle" font-family="Noto Serif Display" font-weight="700" font-size="13.500" letter-spacing="1.500" fill="${C.tavsan}" transform="rotate(-2 100 166)">${label}</text><text x="100" y="186" text-anchor="middle" font-family="Noto Serif Display" font-style="italic" font-size="15" fill="#5A2E1C" transform="rotate(-2 100 166)">${no}</text>
  <path d="M42 88C40 130 40 190 46 226" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".45" fill="none"/></svg>`;
}

// bilet
function ticket(w = 900, h = 560, inner = '', stubX = 680, color = '#F4EAD9') {
  const r = 28, n = 24;
  const d = `M${r} 0H${stubX - n}A${n} ${n} 0 0 0 ${stubX + n} 0H${w - r}A${r} ${r} 0 0 1 ${w} ${r}V${h - r}A${r} ${r} 0 0 1 ${w - r} ${h}H${stubX + n}A${n} ${n} 0 0 0 ${stubX - n} ${h}H${r}A${r} ${r} 0 0 1 0 ${h - r}V${r}A${r} ${r} 0 0 1 ${r} 0Z`;
  return `<div style="position:relative;width:${w}px;height:${h}px;filter:drop-shadow(0 26px 40px rgba(0,0,0,.4))"><svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="position:absolute;left:0;top:0"><path d="${d}" fill="${color}"/><path d="M${stubX} ${n + 14}V${h - n - 14}" stroke="#2B171055" stroke-width="3" stroke-dasharray="4 10" stroke-linecap="round"/><rect x="18" y="18" width="${stubX - 36}" height="${h - 36}" rx="16" fill="none" stroke="${C.tavsan}" stroke-width="2" opacity=".5"/></svg>${inner}</div>`;
}
function barcode(w = 150, h = 70, seed = 4) { const r = rng(seed); let x = 0, s = ''; while (x < w) { const bw = 2 + Math.floor(r() * 5); s += `<rect x="${x}" y="0" width="${bw}" height="${h}" fill="#2B1710"/>`; x += bw + 2 + Math.floor(r() * 4); } return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${s}</svg>`; }

const slides = [];

// 1 — kapak: bilet
slides.push(page(`<div class="slide" style="background:${G}">${leafBg()}
  ${hdr(1, '#F4EAD9')}
  ${chip('Ekim · demleme atölyesi')}
  <div class="abs" style="left:80px;top:250px;width:920px;z-index:5"><div class="t" style="font-size:118px;line-height:1;color:#F4EAD9">Cumartesi’ye<br><i style="color:${C.amberL}">yerin var mı?</i></div></div>
  <div class="abs" style="left:90px;top:610px;transform:rotate(-4deg);z-index:6">
   ${ticket(900, 560, `
    <div class="abs" style="left:60px;top:48px;width:560px"><div class="lbl" style="color:${C.tavsan};font-size:19px">Demlik · Kadıköy · Moda</div>
      <div class="t" style="font-size:64px;line-height:1;color:${C.ink};margin-top:20px">Demleme<br>Atölyesi</div>
      <div style="height:3px;width:120px;background:${C.tavsan};margin:26px 0 22px"></div>
      <div class="t" style="font-size:98px;line-height:1;font-style:italic;color:${C.tavsan}">Cumartesi</div>
      <div style="font-size:26px;letter-spacing:.14em;font-weight:700;color:#5A2E1C;margin-top:22px">GİRİŞ · 1 KİŞİ · ÇAY DAHİL</div></div>
    <div class="abs" style="left:715px;top:40px;width:150px;text-align:center"><div class="lbl" style="font-size:16px;color:#5A2E1C">Bilet no</div><div class="t" style="font-size:66px;color:${C.ink};line-height:1;margin-top:4px">042</div>
      <div style="margin-top:34px;display:flex;justify-content:center">${barcode(140, 150, 6)}</div>
      <div class="mono" style="font-size:15px;margin-top:10px;color:#5A2E1C;letter-spacing:.1em">DEMİNİAL</div>
      <div style="margin-top:22px;display:inline-block;padding:9px 18px;border-radius:30px;background:${C.tavsan};color:#FFF3E0;font-weight:800;font-size:22px">%20</div></div>`)}
  </div>
  <div class="abs" style="left:830px;top:235px;z-index:7;transform:rotate(8deg)">${L.glass({ width: 175, fill: .8 })}</div>
  ${ftr('#F4EAD9')}
</div>`, CSS));

// 2 — ne yapıyoruz
function scentJars() { return `<svg width="220" height="170" viewBox="0 0 220 170"><g>${[0, 1, 2].map(i => { const x = 26 + i * 64; return `<rect x="${x}" y="80" width="52" height="70" rx="12" fill="#FFF" fill-opacity=".5" stroke="${C.tavsan}" stroke-width="3"/><rect x="${x + 2}" y="112" width="48" height="36" rx="10" fill="${['#2E4A2E', '#7A2A18', '#8C8A3A'][i]}"/><rect x="${x - 4}" y="66" width="60" height="18" rx="6" fill="${C.tavsan}"/><path d="M${x + 14} 52c-8-10 8-16 0-26M${x + 30} 54c-8-10 8-16 0-30" stroke="${C.tavsan}" stroke-width="3.500" stroke-linecap="round" fill="none" opacity=".6"/>`; }).join('')}</g></svg>`; }
function timerMini() { return `<svg width="200" height="170" viewBox="0 0 200 170"><rect x="88" y="6" width="24" height="16" rx="5" fill="${C.copper}"/><circle cx="100" cy="94" r="68" fill="${C.tavsan}"/><circle cx="100" cy="94" r="58" fill="#FBF0DC"/><path d="M100 94L100 46A48 48 0 0 1 142 118Z" fill="${C.amber}"/><line x1="100" y1="94" x2="128" y2="110" stroke="#2B1710" stroke-width="6" stroke-linecap="round"/><circle cx="100" cy="94" r="7" fill="#2B1710"/>${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => { const a = i / 10 * 6.283; return `<line x1="${100 + Math.sin(a) * 50}" y1="${94 - Math.cos(a) * 50}" x2="${100 + Math.sin(a) * 56}" y2="${94 - Math.cos(a) * 56}" stroke="#2B1710" stroke-width="3" stroke-linecap="round"/>`; }).join('')}</svg>`; }
const act = (y, n, title, txt, ill, rot) => `<div class="abs" style="left:80px;top:${y}px;width:920px;height:238px;background:#F4EAD9;border-radius:36px;transform:rotate(${rot}deg);box-shadow:0 20px 40px rgba(0,0,0,.3);z-index:5">
  <div class="t" style="position:absolute;left:36px;top:18px;font-size:120px;line-height:1;font-style:italic;color:${C.tavsan}">${n}</div>
  <div style="position:absolute;left:170px;top:36px;width:480px"><div class="t" style="font-size:60px;line-height:1;color:${C.ink}">${title}</div><div style="font-size:29px;line-height:1.38;color:#4A2C20;margin-top:14px">${txt}</div></div>
  <div style="position:absolute;right:34px;top:40px">${ill}</div></div>`;
slides.push(page(`<div class="slide" style="background:${G}">${leafBg()}
  ${hdr(2, '#F4EAD9')}${chip('Akış')}
  <div class="abs" style="left:80px;top:245px;width:920px"><div class="t" style="font-size:96px;line-height:1;color:#F4EAD9">Üç perde, <i style="color:${C.amberL}">bir masa.</i></div></div>
  ${act(440, '1', 'Kokla', 'Üç harmanla tanışırız. Burun önce karar verir.', scentJars(), -1.2)}
  ${act(710, '2', 'Demle', 'Doğru sıcaklık, doğru süre. Kendi demliğinde denersin.', timerMini(), 1)}
  ${act(980, '3', 'Harmanla', 'Kendi harmanını karıştırırsın. Ölçü senin, isim de.', jar({ width: 130, no: 'senin adın' }), -.8)}
  ${ftr('#F4EAD9')}
</div>`, CSS));

// 3 — kimler gelmeli
const tick = `<svg width="66" height="66" viewBox="0 0 66 66"><rect x="4" y="4" width="58" height="58" rx="14" fill="none" stroke="${C.tavsan}" stroke-width="4"/><path d="M14 34l14 15L58 12" fill="none" stroke="${C.tavsan}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const who = (y, t) => `<div style="display:flex;align-items:center;gap:30px;height:176px;border-bottom:2.5px solid #2B171022">${tick}<div class="t" style="font-size:56px;line-height:1.08;color:${C.ink}">${t}</div></div>`;
slides.push(page(`<div class="slide" style="background:${G}">${leafBg()}
  ${hdr(3, '#F4EAD9')}${chip('Kimler gelmeli?')}
  <div class="abs" style="left:80px;top:245px;width:920px"><div class="t" style="font-size:96px;line-height:1;color:#F4EAD9">Bu bilet <i style="color:${C.amberL}">sana.</i></div></div>
  <div class="abs" style="left:80px;top:430px;width:920px;background:#F4EAD9;border-radius:40px;padding:26px 50px 30px;box-shadow:0 24px 50px rgba(0,0,0,.35);transform:rotate(-.6deg);z-index:5">
    ${who(0, 'Kahveden çaya dönmek isteyenler')}${who(0, '“Demli olsun” deyip nedenini bilmeyenler')}${who(0, 'Kendine bir cumartesi hediye edenler')}
    <div style="display:flex;align-items:center;gap:30px;height:176px">${tick}<div class="t" style="font-size:56px;line-height:1.08;color:${C.ink}">Yalnız gelenler: <i style="color:${C.tavsan}">masada arkadaş çıkar.</i></div></div>
  </div>
  ${ftr('#F4EAD9')}
</div>`, CSS));

// 4 — masa üstü (flat-lay)
function flatlay() {
  const r = rng(77);
  const saucerGlass = (x, y, s = 1, tea = ['#FFC46A', '#D9542B', '#7A1D10']) => { const g = L.uid('fg'); return `<g transform="translate(${x},${y}) scale(${s})"><circle cx="10" cy="16" r="124" fill="#000" opacity=".22" filter="url(#blur)"/><circle r="120" fill="#F1E4CC"/><circle r="118" fill="#FBF3E3"/><circle r="90" fill="#EBDCC0"/><circle r="88" fill="none" stroke="#D9C7A6" stroke-width="3"/><defs><radialGradient id="${g}" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="${tea[0]}"/><stop offset=".6" stop-color="${tea[1]}"/><stop offset="1" stop-color="${tea[2]}"/></radialGradient></defs><circle r="62" fill="#fff" fill-opacity=".5" stroke="#fff" stroke-width="5"/><circle r="55" fill="url(#${g})"/><path d="M-36 -26A46 46 0 0 1 8 -50" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".7"/><ellipse cx="86" cy="60" rx="34" ry="8" transform="rotate(38 86 60)" fill="#D6CBB4"/><circle cx="66" cy="44" r="10" fill="#D6CBB4"/></g>`; };
  const leaves = n => [...Array(n)].map(() => `<ellipse cx="${(r() * 1000 + 40).toFixed(0)}" cy="${(r() * 1250 + 50).toFixed(0)}" rx="${(8 + r() * 6).toFixed(0)}" ry="3" transform="rotate(${(r() * 180).toFixed(0)} 0 0)" fill="#3A2416" opacity="0"/>`).join('');
  let scatter = ''; const spots = [[560, 860], [640, 920], [300, 720], [960, 900], [700, 1010], [130, 630]];
  spots.forEach(([cx, cy]) => { for (let i = 0; i < 9; i++) { const x = cx + (r() - .5) * 110, y = cy + (r() - .5) * 60; scatter += `<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="${(9 + r() * 7).toFixed(1)}" ry="3.200" transform="rotate(${(r() * 180).toFixed(0)} ${x.toFixed(0)} ${y.toFixed(0)})" fill="${['#2E1B10', '#4B3A1B', '#3F2616'][Math.floor(r() * 3)]}" opacity=".95"/>`; } });
  const dg = L.uid('dg');
  return `<svg width="1080" height="1350" viewBox="0 0 1080 1350" class="abs" style="left:0;top:0">
  <defs><filter id="blur"><feGaussianBlur stdDeviation="12"/></filter><filter id="wood" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.006 0.22" numOctaves="3" seed="4"/><feColorMatrix values="0 0 0 0 0.25  0 0 0 0 0.13  0 0 0 0 0.05  0 0 0 .8 -.22"/></filter>
  <radialGradient id="${dg}" cx=".38" cy=".3" r=".85"><stop offset="0" stop-color="#fff" stop-opacity=".3"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></radialGradient></defs>
  <rect width="1080" height="1350" fill="#B98858"/>
  ${[0, 1, 2, 3, 4].map(i => `<rect x="0" y="${i * 270}" width="1080" height="270" fill="${['#B98858', '#B0804F', '#BE8E5E', '#AE7D4D', '#B7865A'][i]}"/><rect x="0" y="${i * 270}" width="1080" height="4" fill="#5A3416" opacity=".5"/>`).join('')}
  <rect width="1080" height="1350" filter="url(#wood)"/>
  <rect width="1080" height="1350" fill="#000" opacity=".1"/>
  <!-- keten peçete -->
  <g transform="translate(30,760) rotate(-9)"><rect x="6" y="14" width="400" height="290" fill="#000" opacity=".22" filter="url(#blur)"/><rect width="400" height="290" rx="8" fill="#F1E6D0"/>${[0, 1, 2].map(i => `<rect x="0" y="${28 + i * 8}" width="400" height="4" fill="${G}" opacity=".85"/><rect x="0" y="${236 + i * 8}" width="400" height="4" fill="${G}" opacity=".85"/>`).join('')}<path d="M0 8H400M0 282H400" stroke="#00000010"/></g>
  <!-- demlik (üstten) -->
  <g transform="translate(420,640)">
    <ellipse cx="20" cy="26" rx="240" ry="200" fill="#000" opacity=".25" filter="url(#blur)"/>
    <path d="M-150 -60C-270 -110 -290 60 -150 80" fill="none" stroke="${C.tavsan2}" stroke-width="40" stroke-linecap="round"/>
    <path d="M120 -110C200 -140 260 -190 320 -230L344 -196C300 -120 230 -40 128 30Z" fill="${C.tavsan}"/><ellipse cx="333" cy="-214" rx="14" ry="20" transform="rotate(-38 333 -214)" fill="${C.tavsan2}"/>
    <circle r="178" fill="${C.tavsan}"/><circle r="178" fill="url(#${dg})"/>
    <circle r="150" fill="none" stroke="#F4EAD9" stroke-width="10" opacity=".95"/><circle r="126" fill="none" stroke="#F4EAD9" stroke-width="3" opacity=".8" stroke-dasharray="2 12" stroke-linecap="round"/>
    <circle r="102" fill="${C.tavsan}"/><circle r="102" fill="url(#${dg})"/><circle r="102" fill="none" stroke="#00000030" stroke-width="4"/>
    <circle r="28" fill="${C.tavsan2}"/><circle r="22" fill="${C.tavsan}"/><circle cx="-7" cy="-8" r="8" fill="#fff" opacity=".4"/>
  </g>
  ${saucerGlass(850, 250, 1.12)}${saucerGlass(880, 620, 1.05, ['#F6E88A', '#D0B93A', '#8C7E1E'])}${saucerGlass(800, 1085, 1.0, ['#F0A54A', '#B8451C', '#5E150A'])}
  <!-- kavanozlar (üstten) -->
  <g transform="translate(150,930)"><circle cx="8" cy="14" r="106" fill="#000" opacity=".25" filter="url(#blur)"/><circle r="104" fill="${C.copper}"/><circle r="104" fill="url(#${dg})"/><circle r="88" fill="none" stroke="#00000030" stroke-width="3"/><circle r="56" fill="#F7EFE0"/><text y="-2" text-anchor="middle" font-family="Noto Serif Display" font-weight="700" font-size="15.500" letter-spacing="1.500" fill="${C.tavsan}">HARMAN</text><text y="22" text-anchor="middle" font-family="Noto Serif Display" font-style="italic" font-size="16" fill="#5A2E1C">no. 1</text></g>
  <g transform="translate(330,1180)"><circle cx="8" cy="14" r="84" fill="#000" opacity=".25" filter="url(#blur)"/><circle r="82" fill="#3F6B45"/><circle r="82" fill="url(#${dg})"/><circle r="68" fill="none" stroke="#00000030" stroke-width="3"/><circle r="44" fill="#F7EFE0"/><text y="6" text-anchor="middle" font-family="Noto Serif Display" font-weight="700" font-size="12" letter-spacing="1" fill="${C.tavsan}">HARMAN</text></g>
  ${scatter}
  <!-- kaşık -->
  <g transform="translate(520,1150) rotate(-24)"><ellipse cx="6" cy="12" rx="150" ry="40" fill="#000" opacity=".2" filter="url(#blur)"/><rect x="60" y="-8" width="180" height="16" rx="8" fill="#CFC3AA"/><ellipse cx="0" cy="0" rx="76" ry="48" fill="#E8DECA"/><ellipse cx="0" cy="0" rx="62" ry="36" fill="#B9AD95"/>${[...Array(40)].map(() => { const a = r() * 6.283, d = Math.pow(r(), .6) * 50; return `<ellipse cx="${(Math.cos(a) * d).toFixed(1)}" cy="${(Math.sin(a) * d * .6).toFixed(1)}" rx="${(6 + r() * 6).toFixed(1)}" ry="2.400" transform="rotate(${(r() * 180).toFixed(0)} ${(Math.cos(a) * d).toFixed(1)} ${(Math.sin(a) * d * .6).toFixed(1)})" fill="${['#2E1B10', '#4B3A1B', '#3F2616'][Math.floor(r() * 3)]}"/>`; }).join('')}</g>
  <!-- defter kartı -->
  <g transform="translate(585,715) rotate(7)"><rect x="8" y="14" width="330" height="210" fill="#000" opacity=".25" filter="url(#blur)"/><rect width="330" height="210" rx="10" fill="#F7EFE0"/><rect x="18" y="18" width="294" height="174" rx="6" fill="none" stroke="${C.tavsan}" stroke-width="2" opacity=".6"/><text x="36" y="66" font-family="Noto Serif Display" font-style="italic" font-size="34" fill="${C.tavsan}">harman kartı</text>${[0, 1, 2, 3].map(i => `<line x1="36" y1="${96 + i * 30}" x2="292" y2="${96 + i * 30}" stroke="#2B1710" stroke-opacity=".25" stroke-width="2"/>`).join('')}<text x="40" y="118" font-family="Noto Sans" font-size="18" fill="#5A2E1C">3 kaşık Karadeniz</text><text x="40" y="148" font-family="Noto Sans" font-size="18" fill="#5A2E1C">1 kaşık Bergamot</text></g>
  ${leaves(0)}
  </svg>`;
}
slides.push(page(`<div class="slide" style="background:#B98858">${flatlay()}
  <div class="abs" style="left:0;right:0;top:0;height:280px;background:linear-gradient(180deg,rgba(20,10,4,.55),rgba(20,10,4,0));z-index:2"></div>
  ${hdr(4, '#FFF3E0')}
  <div class="abs" style="left:70px;top:170px;width:560px;background:#F7EFE0;border-radius:28px;padding:34px 40px 38px;transform:rotate(-2deg);box-shadow:0 20px 40px rgba(0,0,0,.4);z-index:8"><div class="lbl" style="font-size:18px;color:${C.tavsan}">Cumartesi sabahı</div><div class="t" style="font-size:88px;line-height:1;color:${C.ink};margin-top:12px">Masa <i style="color:${C.tavsan}">hazır.</i></div></div>
  ${ftr('#FFF3E0')}
</div>`, CSS));

// 5 — eve giderken
const take = (y, n, t, d) => `<div class="abs" style="left:430px;top:${y}px;width:570px"><div style="display:flex;gap:22px"><div class="t" style="font-size:76px;line-height:.9;font-style:italic;color:${C.amberL};width:56px">${n}</div><div><div class="t" style="font-size:50px;line-height:1.05;color:#F4EAD9">${t}</div><div style="font-size:28px;line-height:1.38;color:#DCE6D0;margin-top:10px">${d}</div></div></div></div>`;
slides.push(page(`<div class="slide" style="background:${G}">${leafBg()}
  ${hdr(5, '#F4EAD9')}${chip('Eve giderken')}
  <div class="abs" style="left:80px;top:245px;width:920px"><div class="t" style="font-size:88px;line-height:1;color:#F4EAD9;white-space:nowrap">Eve <i style="color:${C.amberL}">bunlarla</i> dönersin.</div></div>
  <div class="abs" style="left:30px;top:520px;z-index:4;transform:rotate(-5deg)">${jar({ width: 420, no: 'senin adın' })}</div>
  ${take(500, '1', 'Kendi harmanın', 'Kavanozda, üstünde senin adınla.')}
  ${take(760, '2', 'Demleme kartın', 'Yedi adım, cebinde. Mutfakta kaybolmaz.')}
  ${take(1020, '3', 'Yeni bir alışkanlık', 'Cumartesi sabahının küçük, sıcak bir sözü.')}
  ${ftr('#F4EAD9')}
</div>`, CSS));

// 6 — SSS sohbet
const bubbleQ = t => `<div style="display:flex;justify-content:flex-end;margin-top:26px"><div style="max-width:660px;background:#F4EAD9;color:${C.ink};border-radius:38px 38px 8px 38px;padding:22px 34px;font-size:34px;line-height:1.3;font-weight:500">${t}</div></div>`;
const bubbleA = t => `<div style="display:flex;gap:18px;align-items:flex-end;margin-top:14px"><div style="width:72px;height:72px;border-radius:50%;background:${C.tavsan};display:flex;align-items:center;justify-content:center;flex:none">${L.mark('#FFF3E0', 40)}</div><div style="max-width:700px;background:${C.tavsan};color:#FFF3E0;border-radius:38px 38px 38px 8px;padding:22px 34px;font-size:34px;line-height:1.3">${t}</div></div>`;
slides.push(page(`<div class="slide" style="background:${G}">${leafBg()}
  ${hdr(6, '#F4EAD9')}${chip('Sorulanlar')}
  <div class="abs" style="left:80px;top:245px;width:920px"><div class="t" style="font-size:96px;line-height:1;color:#F4EAD9">Aklına <i style="color:${C.amberL}">takılan?</i></div></div>
  <div class="abs" style="left:80px;top:395px;width:920px">
    ${bubbleQ('Hiç çay bilmiyorum, sorun olur mu?')}${bubbleA('Tam sana göre. Sıfırdan başlıyoruz.')}
    ${bubbleQ('Yalnız gelsem?')}${bubbleA('Masada hep bir sohbet çıkar.')}
    ${bubbleQ('Ben kahve içiyorum…')}${bubbleA('Herkes kahveden gelir. Kapıdan çay kokusuyla çıkar. ☺')}
  </div>
  ${ftr('#F4EAD9')}
</div>`, CSS));

// 7 — teklif: kupon
slides.push(page(`<div class="slide" style="background:${C.tavsan}">
  <div class="abs" style="inset:0;background:radial-gradient(circle at 50% 45%,#D6512B 0,#A8301B 55%,#6E170C 100%)"></div>
  ${hdr(7, '#FFF3E0')}${chip('Ekim kampanyası')}
  <div class="abs" style="left:80px;top:245px;width:920px"><div class="t" style="font-size:150px;line-height:.95;color:#FFF3E0"><i style="color:${C.amberL}">Demini</i> Al.</div></div>
  <div class="abs" style="left:70px;top:520px;transform:rotate(-3deg)">
    <div style="position:relative;width:940px;height:520px;border:5px dashed #FFF3E0;border-radius:36px;background:#F4EAD9;box-shadow:0 30px 60px rgba(0,0,0,.35)">
      <svg style="position:absolute;left:34px;top:-26px" width="52" height="52" viewBox="0 0 52 52"><rect width="52" height="52" fill="#F4EAD9" opacity="0"/><g fill="none" stroke="#FFF3E0" stroke-width="4" stroke-linecap="round"><circle cx="14" cy="14" r="8"/><circle cx="14" cy="38" r="8"/><path d="M20 18L46 34M20 34L46 18"/></g></svg>
      <div class="t" style="position:absolute;left:44px;top:30px;font-size:290px;line-height:1;color:${C.tavsan};letter-spacing:-.04em">%20</div>
      <div style="position:absolute;left:655px;top:70px;width:250px"><div class="lbl" style="font-size:18px;color:#5A2E1C">Cumartesi</div><div class="t" style="font-size:52px;line-height:1.05;color:${C.ink};margin-top:6px">Demleme<br>Atölyesi</div><div style="height:3px;width:80px;background:${C.tavsan};margin:20px 0"></div><div style="font-size:26px;line-height:1.35;color:#4A2C20"><b>İlk hafta</b> bilet fiyatında indirim.</div></div>
      <div style="position:absolute;left:44px;bottom:36px;font-family:'iA Writer Quattro S';font-weight:700;font-size:26px;letter-spacing:.18em;color:#5A2E1C">KOD: DEMİNİAL</div>
      <div style="position:absolute;right:44px;bottom:30px">${barcode(200, 56, 9)}</div>
    </div></div>
  <div class="abs" style="left:80px;top:1130px;width:920px;font-size:33px;line-height:1.4;color:#FFE8CE">Masa sayısı sınırlı. Rezervasyon için <b style="color:#FFF3E0">demlik.com.tr</b> ya da DM.</div>
  ${ftr('#FFF3E0')}
</div>`, CSS));

// 8 — harita / kapanış
function map() {
  return `<svg width="920" height="480" viewBox="0 120 920 480" style="display:block"><defs><clipPath id="mc"><rect y="120" width="920" height="480" rx="44"/></clipPath></defs>
  <g clip-path="url(#mc)"><rect width="920" height="640" fill="#F1E6CF"/>
  <path d="M0 470C90 430 150 500 250 470S420 430 470 520 560 640 560 640L0 640Z" fill="#8FC1CC"/><path d="M0 500C90 460 150 530 250 500S400 470 440 550" fill="none" stroke="#fff" stroke-width="5" opacity=".7" stroke-linecap="round"/><path d="M40 560C110 535 180 575 260 552" fill="none" stroke="#fff" stroke-width="4" opacity=".6" stroke-linecap="round"/>
  ${[[300, 0, 300, 640, 22], [560, 0, 700, 640, 22], [0, 160, 920, 110, 22], [0, 320, 920, 360, 16], [820, 0, 860, 640, 16], [420, 0, 440, 470, 12], [130, 0, 170, 430, 12]].map(([a, b, c, d, w]) => `<line x1="${a}" y1="${b}" x2="${c}" y2="${d}" stroke="#FFF9EC" stroke-width="${w}" stroke-linecap="round"/>`).join('')}
  <path d="M0 250C160 210 320 250 470 205S780 150 920 190" fill="none" stroke="${C.tavsan}" stroke-width="14" stroke-linecap="round" opacity=".9"/>
  ${[[350, 220, 90, 60], [640, 240, 110, 70], [70, 240, 100, 60], [370, 60, 100, 70], [700, 60, 90, 70], [50, 60, 90, 80], [660, 400, 120, 90], [470, 380, 100, 60]].map(([x, y, w, h]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="#E3D3B4"/>`).join('')}
  <rect x="150" y="360" width="120" height="60" rx="10" fill="#B9D19A"/>
  <text x="130" y="238" font-family="Noto Sans" font-weight="800" font-size="24" letter-spacing="4" fill="#FFF3E0" transform="rotate(-4 130 238)">MODA CD.</text>
  <text x="70" y="596" font-family="Noto Serif Display" font-style="italic" font-size="34" fill="#2F6F80">Marmara</text>
  <g transform="translate(470,196)"><ellipse cx="0" cy="32" rx="26" ry="8" fill="#000" opacity=".25"/><path d="M0 26C-46 -26 -34 -74 0 -74S46 -26 0 26Z" fill="${C.ink}"/><circle cy="-42" r="24" fill="#F4EAD9"/><text y="-32" text-anchor="middle" font-family="Noto Serif Display" font-weight="700" font-size="30" fill="${C.tavsan}">42</text></g></g></svg>`;
}
slides.push(page(`<div class="slide" style="background:${G}">${leafBg()}
  ${hdr(8, '#F4EAD9')}${chip('Cumartesi, Moda')}
  <div class="abs" style="left:80px;top:245px;width:920px"><div class="t" style="font-size:118px;line-height:.98;color:#F4EAD9">Cumartesi’de<br><i style="color:${C.amberL}">görüşürüz.</i></div></div>
  <div class="abs" style="left:80px;top:560px;box-shadow:0 26px 50px rgba(0,0,0,.4);border-radius:44px;transform:rotate(-1deg)">${map()}</div>
  <div class="abs" style="left:80px;top:1075px;width:920px;display:flex;justify-content:space-between;align-items:flex-end;padding-bottom:10px">
    <div><div class="t" style="font-size:52px;color:#F4EAD9;line-height:1.05">Moda Cd. No: 42</div><div style="font-size:30px;color:#DCE6D0;margin-top:6px">Kadıköy, İstanbul</div></div>
    <div style="text-align:right;font-size:30px;line-height:1.4;color:#F4EAD9;font-weight:600">@demlik.kadikoy<br>demlik.com.tr</div></div>
  <div class="abs" style="left:0;right:0;top:1230px;text-align:center"><div class="t" style="font-size:40px;color:${C.amberL};font-style:italic">Çay acele sevmez.</div></div>
</div>`, CSS));

module.exports = { dir: 'cumartesi-demleme-atolyesi', slides };
