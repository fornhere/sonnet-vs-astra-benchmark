// Demlik "Demini Al" — ortak bileşenler: sahne SVG'leri, CSS, animasyon zaman çizelgesi
import fs from 'fs';
export const ROOT = '/home/forn/sonnet-vs-astra/tb-banner-seti/sonnet';
const b64 = f => fs.readFileSync(`${ROOT}/fonts-src/${f}.woff2`).toString('base64');

export const FONT_CSS = `
@font-face{font-family:ND;font-weight:700;font-style:normal;src:url(data:font/woff2;base64,${b64('NotoSerifDisplay-Bold')}) format('woff2')}
@font-face{font-family:ND;font-weight:700;font-style:italic;src:url(data:font/woff2;base64,${b64('NotoSerifDisplay-BoldItalic')}) format('woff2')}
@font-face{font-family:NS;font-weight:500;src:url(data:font/woff2;base64,${b64('NotoSans-Medium')}) format('woff2')}
@font-face{font-family:NS;font-weight:700;src:url(data:font/woff2;base64,${b64('NotoSans-Bold')}) format('woff2')}
`;

// tohumlu rastgele
function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }

// Kadıköy/Moda çatı silüeti: iki katman + yanan pencereler
export function skyline(W, TT, sh, seed = 7) {
  const r = rng(seed);
  const layer = (hMin, hMax, wMin, wMax, mos) => {
    let d = '', x = -6; const wins = [];
    while (x < W + 6) {
      const w = wMin + r() * (wMax - wMin), h = (hMin + r() * (hMax - hMin)) * sh, y = TT - h;
      const t = r();
      d += `M${x.toFixed(1)} ${TT}V${y.toFixed(1)}`;
      if (t < .22) { d += `L${(x + w / 2).toFixed(1)} ${(y - w * .28).toFixed(1)}L${(x + w).toFixed(1)} ${y.toFixed(1)}`; }           // beşik çatı
      else if (t < .34) { const bw = w * .35; d += `H${(x + w * .2).toFixed(1)}V${(y - sh * .07).toFixed(1)}H${(x + w * .2 + bw).toFixed(1)}V${y.toFixed(1)}H${(x + w).toFixed(1)}`; } // su deposu
      else if (t < .42) { d += `H${(x + w * .7).toFixed(1)}V${(y - sh * .09).toFixed(1)}h${(w * .08).toFixed(1)}V${y.toFixed(1)}H${(x + w).toFixed(1)}`; } // baca
      else d += `H${(x + w).toFixed(1)}`;
      d += `V${TT}Z`;
      if (mos && h > sh * .35) for (let k = 0; k < 2; k++) if (r() < .55) wins.push([x + w * (.2 + r() * .55), y + h * (.15 + r() * .6)]);
      x += w * (.78 + r() * .2);
    }
    return { d, wins };
  };
  const far = layer(.28, .62, sh * .18, sh * .34, false);
  const near = layer(.14, .5, sh * .14, sh * .3, true);
  // minare + kubbe (siluetin karakteri)
  let mos = '';
  const mx = W * (.62 + r() * .12), mh = sh * 1.05, mw = Math.max(2.2, sh * .05);
  mos += `M${(mx - mw / 2).toFixed(1)} ${TT}V${(TT - mh).toFixed(1)}h${mw.toFixed(1)}V${TT}ZM${(mx - mw * .9).toFixed(1)} ${(TT - mh).toFixed(1)}h${(mw * 1.8).toFixed(1)}L${mx.toFixed(1)} ${(TT - mh - sh * .22).toFixed(1)}Z`;
  const mx2 = mx + sh * .55, mh2 = sh * .82;
  mos += `M${(mx2 - mw / 2).toFixed(1)} ${TT}V${(TT - mh2).toFixed(1)}h${mw.toFixed(1)}V${TT}ZM${(mx2 - mw * .9).toFixed(1)} ${(TT - mh2).toFixed(1)}h${(mw * 1.8).toFixed(1)}L${mx2.toFixed(1)} ${(TT - mh2 - sh * .18).toFixed(1)}Z`;
  const dr = sh * .3, dx = mx - sh * .55;
  mos += `M${(dx - dr).toFixed(1)} ${TT}V${(TT - dr * .6).toFixed(1)}A${dr.toFixed(1)} ${dr.toFixed(1)} 0 0 1 ${(dx + dr).toFixed(1)} ${(TT - dr * .6).toFixed(1)}V${TT}Z`;
  let win = '';
  const ws = Math.max(1.4, sh * .028);
  near.wins.slice(0, 26).forEach(([x, y], i) => {
    win += `<rect class="${i % 3 == 0 ? 'tw' : ''}" style="animation-delay:${(i * .37 % 3).toFixed(2)}s" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${ws.toFixed(1)}" height="${(ws * 1.4).toFixed(1)}" fill="#FFC46B" opacity="${(.45 + r() * .5).toFixed(2)}"/>`;
  });
  return `<g class="far"><path d="${far.d}" fill="#4A2247" opacity=".85"/></g><g class="near"><path d="${near.d}${mos}" fill="#20101F"/>${win}</g>`;
}

export function scene(W, H, TT, sh, { stars = 14, gulls = true, seed = 7 } = {}) {
  const r = rng(seed + 99);
  let s = '';
  for (let i = 0; i < stars; i++) {
    const x = r() * W, y = r() * TT * .5, rr = .5 + r() * .9;
    s += `<circle class="st" style="animation-delay:${(r() * 3).toFixed(2)}s" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rr.toFixed(2)}" fill="#FFEBCB"/>`;
  }
  let g = '';
  if (gulls) {
    const gs = Math.max(.7, Math.min(W, H) / 380);
    [[.08, .22, 1], [.15, .3, .7], [.86, .2, .85]].forEach(([fx, fy, k], i) => {
      g += `<g class="gull" style="animation-delay:${i * 1.3}s" transform="translate(${(W * fx).toFixed(0)} ${(TT * fy).toFixed(0)}) scale(${(gs * k).toFixed(2)})"><path d="M0 0q5-6 10 0q5-6 10 0" fill="none" stroke="#FFEBCB" stroke-width="1.6" stroke-linecap="round" opacity=".75"/></g>`;
    });
  }
  return `<svg class="scene" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${s}${g}${skyline(W, TT, sh, seed)}</svg>`;
}

// ince belli bardak: yerel koordinat (üst kenar ortası = 0,0), yükseklik ~168
const GLASS = 'M-48 0C-50 30-32 50-32 72C-32 96-50 112-44 142C-42 158-30 168-20 168L20 168C30 168 42 158 44 142C50 112 32 96 32 72C32 50 50 30 48 0Z';

export function hero() {
  // viewBox 400x350; halka merkezi (200,172)
  return `<svg class="sun" viewBox="0 0 400 350" overflow="visible"><defs>
<radialGradient id="glow" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#FFB454" stop-opacity=".55"/><stop offset=".55" stop-color="#F0703A" stop-opacity=".22"/><stop offset="1" stop-color="#F0703A" stop-opacity="0"/></radialGradient>
<linearGradient id="sunf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE3A3"/><stop offset=".55" stop-color="#FFB454"/><stop offset="1" stop-color="#F0703A"/></linearGradient></defs>
<g class="sunrise"><circle cx="200" cy="172" r="250" fill="url(#glow)"/><circle cx="200" cy="172" r="128" fill="url(#sunf)"/></g></svg>`;
}

export function glassHero() {
  const tick = (r, w, n, dl, col, op) => `<circle cx="200" cy="172" r="${r}" fill="none" stroke="${col}" stroke-opacity="${op}" stroke-width="${w}" stroke-dasharray="${dl} ${(2 * Math.PI * r / n - dl).toFixed(3)}" transform="rotate(-90 200 172)"/>`;
  return `<svg class="hero" viewBox="0 0 400 350" overflow="visible"><defs>
<clipPath id="gc"><path d="${GLASS}"/></clipPath><clipPath id="hz"><rect x="-80" y="-80" width="560" height="402"/></clipPath>
<linearGradient id="tea1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F2A63B"/><stop offset="1" stop-color="#D9782A"/></linearGradient>
<linearGradient id="tea2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C2411D"/><stop offset=".6" stop-color="#8E2412"/><stop offset="1" stop-color="#5E140C"/></linearGradient>
<linearGradient id="sau" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF1D8"/><stop offset="1" stop-color="#D9BE96"/></linearGradient>
<radialGradient id="sh" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#000" stop-opacity=".55"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient></defs>
<g clip-path="url(#hz)"><g class="ring">
${tick(156, 9, 60, 1.8, '#FFEBCB', .5)}${tick(158, 15, 12, 2.6, '#FFEBCB', .9)}
<circle class="arc" cx="200" cy="172" r="146" fill="none" stroke="#FFD08A" stroke-width="3.2" stroke-linecap="round" stroke-dasharray="917.4" stroke-dashoffset="0" transform="rotate(-90 200 172)"/>
<circle class="ping" cx="200" cy="172" r="146" fill="none" stroke="#FFD08A" stroke-width="2"/>
<g class="hand"><circle cx="200" cy="26" r="6.5" fill="#FFF3DE" stroke="#F0703A" stroke-width="2.5"/></g>
</g></g>
<ellipse cx="200" cy="336" rx="118" ry="13" fill="url(#sh)"/>
<g transform="translate(200 118) scale(1.24)"><g class="glass">
<ellipse cx="0" cy="173" rx="76" ry="8.5" fill="url(#sau)"/><ellipse cx="0" cy="171" rx="58" ry="5.2" fill="#FFF7E6" opacity=".9"/><ellipse cx="0" cy="171.6" rx="76" ry="8.5" fill="none" stroke="#B3261E" stroke-width="1.6" opacity=".9" transform="translate(0 -1.4) scale(.985 1)"/>
<g transform="rotate(-7 60 172)"><rect x="36" y="168.6" width="52" height="2.2" rx="1.1" fill="#EAD7B8"/><ellipse cx="34" cy="169.7" rx="7.5" ry="3" fill="#EAD7B8"/></g>
<path d="${GLASS}" fill="#FFFFFF" fill-opacity=".07"/>
<g clip-path="url(#gc)"><g class="liq"><rect x="-60" y="18" width="120" height="160" fill="url(#tea1)"/><rect class="deep" x="-60" y="18" width="120" height="160" fill="url(#tea2)"/>
<ellipse cx="0" cy="18" rx="50" ry="5.6" fill="#FFC56A" opacity=".55" class="surf"/></g></g>
<path d="M-44 6C-40 28-27 46-27 72C-27 96-42 112-38 140" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="2.6" stroke-linecap="round"/>
<path d="M38 20C36 34 30 46 27 64" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="2" stroke-linecap="round"/>
<path d="M-27 148C-24 156-18 160-10 162" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="2" stroke-linecap="round"/>
<path d="${GLASS}" fill="none" stroke="#FFEBCB" stroke-opacity=".7" stroke-width="1.5"/>
<ellipse cx="0" cy="0" rx="48" ry="6" fill="none" stroke="#FFF3DE" stroke-opacity=".85" stroke-width="1.5"/>
<g class="steams" fill="none" stroke="#FFEBCB" stroke-width="2.4" stroke-linecap="round">
<path class="sm s1" d="M-16 -8C-28 -22-6 -30-16 -46C-24 -58-10 -66-14 -80"/>
<path class="sm s2" d="M2 -10C-10 -26 12 -34 2 -52C-6 -64 8 -74 3 -90"/>
<path class="sm s3" d="M20 -8C10 -20 30 -30 22 -44C16 -54 28 -62 24 -74"/></g>
</g></g></svg>`;
}

export function logo() {
  return `<div class="logo"><svg viewBox="0 0 30 34" width="1em" height="1.13em"><path d="M3 2C2.5 8 8 12 8 17C8 22 2.5 24 4 30C4.5 32 6.5 33 8 33L22 33C23.5 33 25.5 32 26 30C27.5 24 22 22 22 17C22 12 27.5 8 27 2Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M4.6 12C7 13.4 11 14 15 14C19 14 23 13.4 25.4 12L24.6 26C21 27 18 27.6 15 27.6C12 27.6 9 27 5.4 26Z" fill="#FFB454"/></svg><span class="lt"><b>demlik</b><i>KADIKÖY</i></span></div>`;
}

export function badge() {
  const N = 22, R = 50, r = 46; let p = '';
  for (let i = 0; i < N * 2; i++) { const a = i * Math.PI / N, k = i % 2 ? r : R; p += `${i ? 'L' : 'M'}${(50 + k * Math.cos(a)).toFixed(2)} ${(50 + k * Math.sin(a)).toFixed(2)}`; }
  return `<div class="badge"><svg viewBox="0 0 100 100"><path d="${p}Z" fill="#E2382B"/><circle cx="50" cy="50" r="41" fill="none" stroke="#FFEBCB" stroke-opacity=".7" stroke-width=".9" stroke-dasharray="1.6 2.2"/></svg><div class="bt"><small>İLK HAFTA</small><strong>%20</strong><small>ATÖLYEYE</small><small>İNDİRİM</small></div></div>`;
}

export const arrow = `<svg class="ar" viewBox="0 0 24 12" width="1.5em" height=".75em"><path d="M0 6H21M16 1.5L21 6L16 10.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

export const BASE_CSS = `
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#120a16}
#ad{position:relative;overflow:hidden;font-family:NS,'Noto Sans',sans-serif;color:#FFF3DE;display:block;text-decoration:none;cursor:pointer;-webkit-font-smoothing:antialiased}
#ad>*{position:absolute}
.bg{left:0;top:0;right:0;background:linear-gradient(180deg,#160C26 0%,#2E1640 26%,#6B2B55 52%,#C4493F 78%,#F49A50 100%)}
.bg::after{content:"";position:absolute;inset:0;background:radial-gradient(120% 60% at 50% 100%,rgba(255,190,110,.35),transparent 70%)}
.scene,.sun,.hero{pointer-events:none}
.scene{left:0;top:0}
.table{left:0;right:0;bottom:0;background:linear-gradient(180deg,#4A1C2A 0,#2B121E 30%,#170A12 100%);border-top:1px solid rgba(255,180,84,.55);box-shadow:0 -1px 14px rgba(240,112,58,.35)}
.table::before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(90deg,rgba(255,255,255,.028) 0 1px,transparent 1px 9px);opacity:.8}
.head,.f1{font-family:ND,'Noto Serif Display',serif;font-weight:700;line-height:.95;letter-spacing:-.025em}
.ln{display:block;overflow:hidden;padding-bottom:.1em;margin-bottom:-.1em}
.ln>span{display:inline-block}
.f1{font-style:italic;color:#FFE9C6}
.head em{font-style:italic;color:#FFB454}
.eyebrow{font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#FFB454;white-space:nowrap}
.sub{font-weight:500;line-height:1.28;color:#FFE9C6}
.sub b{font-family:ND,serif;font-style:italic;font-weight:700;color:#FFB454;white-space:nowrap}
.offer{font-weight:700;color:#FFF3DE;white-space:nowrap}
.offer i{font-style:normal;color:#FF7A5C}
.cta{display:flex;align-items:center;justify-content:center;gap:.55em;background:#FFB454;color:#2B0F1E;font-weight:700;border-radius:99px;white-space:nowrap;overflow:hidden}
.cta::after{content:"";position:absolute;top:0;bottom:0;width:40%;left:-60%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.75),transparent);transform:skewX(-18deg)}
.ar{flex:none}
.foot s{text-decoration:none}
.foot{font-weight:500;color:#F2D3B0;opacity:.85;white-space:nowrap;letter-spacing:.02em}
.logo{display:flex;align-items:center;gap:.42em;color:#FFF3DE;line-height:1}
.logo .lt{display:flex;flex-direction:column;gap:.18em}
.logo b{font-family:ND,serif;font-weight:700;font-size:1.32em;letter-spacing:-.02em;line-height:.8}
.logo i{font-style:normal;font-weight:700;font-size:.42em;letter-spacing:.32em;color:#FFB454}
.badge{display:flex;align-items:center;justify-content:center;transform:rotate(-9deg)}
.badge svg{position:absolute;inset:0;width:100%;height:100%}
.badge .bt{position:relative;text-align:center;color:#FFF3DE;display:flex;flex-direction:column;align-items:center;line-height:1}
.badge small{font-weight:700;letter-spacing:.07em;font-size:.105em;white-space:nowrap;line-height:1.12}
.badge strong{font-family:ND,serif;font-weight:700;font-size:.36em;letter-spacing:-.03em;line-height:.95;margin:.02em 0 .03em}
/* ---- zaman çizelgesi (0–~7.4 sn, sonra tutar) ---- */
@keyframes rise{from{transform:translateY(108%)}to{transform:none}}
@keyframes up{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
@keyframes fade{from{opacity:0}to{opacity:1}}
@keyframes out{to{opacity:0;transform:translateY(-8px)}}
@keyframes stamp{0%{opacity:0;transform:scale(2.6) rotate(-40deg)}55%{opacity:1;transform:scale(.9) rotate(-6deg)}78%{transform:scale(1.05) rotate(-10deg)}100%{opacity:1;transform:scale(1) rotate(-9deg)}}
@keyframes pop{0%{opacity:0;transform:scale(.7)}65%{opacity:1;transform:scale(1.07)}100%{opacity:1;transform:scale(1)}}
@keyframes shim{0%{left:-60%}100%{left:130%}}
@keyframes fill{from{transform:translateY(150px)}to{transform:none}}
@keyframes deep{from{opacity:0}to{opacity:1}}
@keyframes sunr{from{transform:translateY(70px);opacity:0}to{transform:none;opacity:1}}
@keyframes arc{from{stroke-dashoffset:917.4}to{stroke-dashoffset:0}}
@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
@keyframes ping{0%{opacity:.9;transform:scale(1)}100%{opacity:0;transform:scale(1.16)}}
@keyframes steam{0%{opacity:0;transform:translateY(8px)}30%{opacity:.6}100%{opacity:0;transform:translateY(-20px)}}
@keyframes glin{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
@keyframes skyup{from{transform:translateY(40%)}to{transform:none}}
@keyframes tw{0%,100%{opacity:.2}50%{opacity:1}}
@keyframes gull{0%{transform:translate(0,0)}100%{transform:translate(26px,-8px)}}
@keyframes ring{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:none}}
.go .bg{animation:fade .6s ease-out both}
.go .sunrise{animation:sunr 2.6s cubic-bezier(.2,.7,.2,1) .1s both}
.go .near{animation:skyup 1s cubic-bezier(.2,.8,.2,1) .05s both}
.go .far{animation:skyup 1.3s cubic-bezier(.2,.8,.2,1) .1s both}
.go .glass{animation:glin .8s cubic-bezier(.2,.8,.2,1) .25s both}
.go .liq{animation:fill 2.6s cubic-bezier(.5,.1,.3,1) .7s both}
.go .deep{animation:deep 3.1s ease-in-out .9s both}
.go .ring{animation:ring .7s ease-out .4s both;transform-origin:200px 172px}
.go .arc{animation:arc 3.1s cubic-bezier(.45,.05,.3,1) .6s both}
.go .hand{animation:spin 3.1s cubic-bezier(.45,.05,.3,1) .6s both;transform-origin:200px 172px}
.go .ping{animation:ping .9s ease-out 3.7s both;transform-origin:200px 172px}
.go .sm{animation:steam 3s ease-in-out infinite;opacity:0}
.go .s1{animation-delay:1.2s}.go .s2{animation-delay:2s}.go .s3{animation-delay:2.7s}
.tw{animation:tw 3s ease-in-out infinite}.st{animation:tw 4s ease-in-out infinite}.gull{animation:gull 9s ease-in-out infinite alternate}
.go .logo{animation:fade .6s ease-out .3s both}
.go .f1 .ln>span{animation:rise .75s cubic-bezier(.2,.8,.2,1) .7s both}
.go .f1 .ln:nth-child(2)>span{animation-delay:.9s}
.go .f1{animation:out .4s ease-in 3.0s both}
.go .head .ln>span{animation:rise .8s cubic-bezier(.2,.8,.2,1) 3.45s both}
.go .head .ln:nth-child(2)>span{animation-delay:3.65s}
.go .eyebrow{animation:up .6s ease-out 4.15s both}
.go .sub{animation:up .6s ease-out 4.35s both}
.go .badge{animation:stamp .75s cubic-bezier(.3,1.2,.4,1) 4.9s both}
.go .offer{animation:up .6s ease-out 4.9s both}
.go .cta{animation:pop .55s cubic-bezier(.3,1.3,.4,1) 5.7s both}
.go .cta::after{animation:shim 1.1s ease-in-out 6.5s 3}
.go .foot{animation:fade .8s ease-out 6.2s both}
`;

export const LOOP_JS = `(function(){var a=document.getElementById('ad');function r(){a.classList.remove('go');void a.offsetWidth;a.classList.add('go')}setTimeout(r,12500)})();`;
