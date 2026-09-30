// Demlik carousel — ortak kütüphane: tasarım sistemi + kodla çizilmiş SVG illüstrasyonlar
const fs = require('fs');
const path = require('path');

let _uid = 0;
const uid = (p = 'i') => `${p}${++_uid}`;

// seeded rng
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6D2B79F5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Catmull-Rom -> cubic bezier (returns "C ..." segments starting after current point)
function smooth(pts) {
  let d = '';
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}
function profilePath(half, cx) {
  const L = half.map(([w, y]) => [cx - w, y]);
  const R = half.slice().reverse().map(([w, y]) => [cx + w, y]);
  return `M${L[0][0]} ${L[0][1]}${smooth(L)}L${R[0][0]} ${R[0][1]}${smooth(R)}Z`;
}

// ---------- palette ----------
const C = {
  cream: '#F4EAD9', cream2: '#EBDDC3', paper: '#F7EFE0',
  ink: '#2B1710', brown: '#5A2E1C',
  tavsan: '#A8301B', tavsan2: '#7F1F12', tavsanL: '#D95A2B',
  amber: '#EFA43A', amberL: '#F7C56A', copper: '#C5713A',
  green: '#1F3D2E', moss: '#4E6E45', sage: '#B5C39A', bergamot: '#DCC94B',
  plum: '#2A1740', indigo: '#20244C', indigo2: '#33306A', rose: '#E58A6B',
};

// ---------- page wrapper ----------
const BASE_CSS = `
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1080px;height:1350px;overflow:hidden;background:#000}
body{font-family:'Noto Sans',sans-serif;-webkit-font-smoothing:antialiased;text-rendering:geometricPrecision}
.slide{position:relative;width:1080px;height:1350px;overflow:hidden}
.abs{position:absolute}
.serif{font-family:'Noto Serif Display','Noto Serif',serif}
.sans{font-family:'Noto Sans',sans-serif}
.mono{font-family:'iA Writer Quattro S','Noto Sans',monospace}
.cap{font-family:'Noto Sans',sans-serif;font-weight:700;letter-spacing:.2em;text-transform:uppercase;font-size:23px}
.grain{position:absolute;inset:0;pointer-events:none;mix-blend-mode:multiply;opacity:.22}
svg{display:block;overflow:visible}
`;
function page(body, css = '') {
  return `<!doctype html><html lang="tr"><head><meta charset="utf-8"><style>${BASE_CSS}${css}</style></head><body>${body}${grain()}</body></html>`;
}
function grain(op = 0.22) {
  const f = uid('gr');
  return `<svg class="grain" style="opacity:${op}" width="1080" height="1350" viewBox="0 0 1080 1350"><filter id="${f}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 0.35  0 0 0 0 0.25  0 0 0 0 0.2  0 0 0 1.1 -0.35"/></filter><rect width="1080" height="1350" filter="url(#${f})"/></svg>`;
}
const at = (x, y, w, inner, extra = '') =>
  `<div class="abs" style="left:${x}px;top:${y}px;${w ? `width:${w}px;` : ''}${extra}">${inner}</div>`;

// ---------- brand mark ----------
function mark(color = C.cream, size = 44) {
  // minik ince belli bardak + buhar
  return `<svg width="${size * 0.62}" height="${size}" viewBox="0 0 31 50"><path d="M8 14c0 2 1 3-1 5s-1 4 1 6M15 12c0 2 1 3-1 5s-1 4 1 6M22 14c0 2 1 3-1 5s-1 4 1 6" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" opacity=".85" transform="translate(0,-10)"/><path d="M3 20h25c0 7-3 10-6 12-1.400 1-1.600 2.500-.6 4 1 1.500 2.400 3.500 2.400 6H8c0-2.500 1.400-4.500 2.400-6 1-1.500.8-3-.6-4-3-2-6.800-5-6.800-12z" fill="${color}"/></svg>`;
}
function wordmark(color = C.cream, size = 40) {
  return `<div style="display:flex;align-items:center;gap:12px">${mark(color, size)}<span class="serif" style="font-size:${size}px;font-weight:600;letter-spacing:.04em;color:${color};line-height:1">demlik</span></div>`;
}
function header(i, n, color = C.cream, extra = '') {
  return `<div class="abs" style="left:80px;right:80px;top:70px;display:flex;justify-content:space-between;align-items:center;z-index:20">
    ${wordmark(color, 40)}
    <div class="mono" style="font-size:24px;letter-spacing:.14em;color:${color};opacity:.85">${String(i).padStart(2, '0')} / ${String(n).padStart(2, '0')}</div></div>${extra}`;
}
function footer(color = C.cream, left = '@demlik.kadikoy', right = 'kaydır', last = false) {
  const arrow = `<svg width="54" height="20" viewBox="0 0 54 20" style="margin-left:14px"><path d="M2 10h48M42 2l8 8-8 8" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  return `<div class="abs" style="left:80px;right:80px;bottom:64px;display:flex;justify-content:space-between;align-items:center;z-index:20">
    <div class="cap" style="color:${color};opacity:.85;font-size:21px">${left}</div>
    ${last ? '' : `<div class="cap" style="color:${color};display:flex;align-items:center;font-size:21px">${right}${arrow}</div>`}</div>`;
}

// ---------- illustrations ----------
function steam(color = '#fff', op = 0.55, w = 120, h = 170, sw = 7) {
  const p = (x, d) => `<path d="M${x} ${h}c-${d} -${h * 0.2} ${d} -${h * 0.35} 0 -${h * 0.55}s${d} -${h * 0.3} 0 -${h * 0.45}" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" opacity="${op}"/>`;
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${p(w * 0.2, 14)}${p(w * 0.5, -16)}${p(w * 0.8, 14)}</svg>`;
}

// ince belli bardak
function glass({ width = 300, fill = 0.78, plate = true, tea = [C.amber, C.tavsanL, C.tavsan2], shadow = true, glow = true } = {}) {
  const g = uid('gl'), cl = uid('cl');
  const half = [[49, 20], [48, 55], [43, 95], [36, 128], [33.5, 142], [38, 166], [45, 196], [46, 214], [40, 236]];
  const body = profilePath(half, 100);
  const top = 236 - fill * 214;
  const H = plate ? 285 : 250;
  return `<svg width="${width}" height="${width * H / 200}" viewBox="0 0 200 ${H}">
  <defs>
    <linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${tea[0]}"/><stop offset=".45" stop-color="${tea[1]}"/><stop offset="1" stop-color="${tea[2]}"/></linearGradient>
    <linearGradient id="${g}s" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".28"/><stop offset=".3" stop-color="#000" stop-opacity="0"/><stop offset=".72" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".32"/></linearGradient>
    <clipPath id="${cl}"><path d="${body}"/></clipPath>
  </defs>
  ${shadow ? `<ellipse cx="100" cy="${plate ? 262 : 244}" rx="86" ry="10" fill="#000" opacity=".28"/>` : ''}
  ${plate ? `<ellipse cx="100" cy="252" rx="82" ry="14" fill="#F1E4CC"/><ellipse cx="100" cy="250" rx="82" ry="13" fill="#FBF3E3"/><ellipse cx="100" cy="249" rx="56" ry="8" fill="#E9D8BB"/>` : ''}
  <path d="${body}" fill="rgba(255,255,255,.14)"/>
  <g clip-path="url(#${cl})">
    <rect x="40" y="${top}" width="120" height="${250 - top}" fill="url(#${g})"/>
    <ellipse cx="100" cy="${top}" rx="50" ry="5" fill="${tea[0]}" opacity=".9"/>
    <rect x="40" y="20" width="120" height="230" fill="url(#${g}s)"/>
    ${glow ? `<ellipse cx="100" cy="215" rx="30" ry="14" fill="#FFD48A" opacity=".2"/>` : ''}
  </g>
  <path d="${body}" fill="none" stroke="rgba(255,255,255,.7)" stroke-width="2"/>
  <ellipse cx="100" cy="20" rx="49" ry="5.500" fill="none" stroke="rgba(255,255,255,.75)" stroke-width="2"/>
  <path d="M61 40C60 84 54 108 51 134" fill="none" stroke="#fff" stroke-width="4.500" stroke-linecap="round" opacity=".55" clip-path="url(#${cl})"/>
  <path d="M60 172C66 192 68 204 66 218" fill="none" stroke="#fff" stroke-width="3.500" stroke-linecap="round" opacity=".35"/>
  <path d="M80 236h40" stroke="rgba(255,255,255,.5)" stroke-width="2"/>
  </svg>`;
}

// küçük seramik demlik
function demlik({ width = 420, body = C.tavsan, band = C.cream, shade = '#000', steamOn = false } = {}) {
  const g = uid('dm');
  return `<svg width="${width}" height="${width * 0.8}" viewBox="0 0 460 368">
  <defs>
    <radialGradient id="${g}" cx=".36" cy=".3" r=".85"><stop offset="0" stop-color="#fff" stop-opacity=".28"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="${shade}" stop-opacity=".38"/></radialGradient>
    <clipPath id="${g}c"><path d="M92 158C56 200 68 300 128 336C165 354 255 354 292 336C352 300 364 200 328 158C300 132 120 132 92 158Z"/></clipPath>
  </defs>
  <ellipse cx="210" cy="356" rx="165" ry="12" fill="#000" opacity=".25"/>
  <!-- kulp -->
  <path d="M96 190C22 172 6 272 106 294" fill="none" stroke="${body}" stroke-width="24" stroke-linecap="round"/>
  <path d="M96 190C22 172 6 272 106 294" fill="none" stroke="#000" stroke-opacity=".18" stroke-width="24" stroke-linecap="round" stroke-dasharray="0 400 60 400"/>
  <!-- emzik -->
  <path d="M328 226C378 226 396 182 428 128L450 138C418 208 396 262 326 274Z" fill="${body}"/>
  <path d="M428 128L450 138" stroke="#000" stroke-opacity=".2" stroke-width="4"/>
  <!-- gövde -->
  <path d="M92 158C56 200 68 300 128 336C165 354 255 354 292 336C352 300 364 200 328 158C300 132 120 132 92 158Z" fill="${body}"/>
  <g clip-path="url(#${g}c)">
    <path d="M40 240Q210 268 380 240" fill="none" stroke="${band}" stroke-width="16" opacity=".95"/>
    <path d="M40 272Q210 300 380 272" fill="none" stroke="${band}" stroke-width="5" opacity=".9"/>
    ${[...Array(9)].map((_, i) => `<circle cx="${92 + i * 29}" cy="${252 + Math.sin(i / 8 * Math.PI) * 9 + 2}" r="3.500" fill="${body}"/>`).join('')}
    <rect x="0" y="0" width="460" height="368" fill="url(#${g})"/>
  </g>
  <!-- kapak -->
  <path d="M120 148C140 96 280 96 300 148Z" fill="${body}"/>
  <path d="M120 148C140 96 280 96 300 148Z" fill="url(#${g})"/>
  <rect x="104" y="144" width="212" height="14" rx="7" fill="${body}"/>
  <rect x="104" y="144" width="212" height="14" rx="7" fill="#000" opacity=".12"/>
  <rect x="200" y="86" width="20" height="18" fill="${body}"/>
  <circle cx="210" cy="80" r="17" fill="${body}"/><circle cx="210" cy="80" r="17" fill="url(#${g})"/>
  <path d="M150 130C170 108 210 104 244 108" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".4"/>
  <path d="M110 200C98 230 104 262 120 290" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".28"/>
  </svg>`;
}

function ferry({ width = 520, hull = '#1B1029', cabin = '#2A1A3C', trim = '#E9C58A', lit = C.amberL, stripe = C.tavsanL } = {}) {
  const wins = (x0, x1, y, n, s = 11) => [...Array(n)].map((_, i) => `<rect x="${x0 + i * ((x1 - x0) / n)}" y="${y}" width="${s}" height="${s * 1.2}" rx="2" fill="${lit}"/>`).join('');
  return `<svg width="${width}" height="${width * 0.37}" viewBox="0 0 520 192">
  <rect x="246" y="4" width="20" height="44" fill="${cabin}"/><rect x="246" y="14" width="20" height="8" fill="${stripe}"/>
  <rect x="292" y="10" width="18" height="38" fill="${cabin}"/><rect x="292" y="18" width="18" height="7" fill="${stripe}"/>
  <path d="M170 76h180v-24h-42v-8h-90v8h-48z" fill="${cabin}"/>
  ${wins(186, 336, 60, 10, 9)}
  <path d="M82 124h360V78H82z" fill="${cabin}"/>
  ${wins(98, 428, 92, 22, 10)}
  <path d="M40 124h440l-12 30H60z" fill="${hull}"/>
  <path d="M28 118h464v10H28z" fill="${trim}" opacity=".9"/>
  <path d="M28 128l32 34h400l32-34z" fill="${hull}"/>
  <path d="M46 150h428" stroke="${stripe}" stroke-width="4" opacity=".9"/>
  <path d="M258 4V-22" stroke="${cabin}" stroke-width="4"/><path d="M258 -22l30 8-30 8z" fill="${stripe}"/>
  </svg>`;
}

function gull(size = 60, color = '#2A1740', op = 0.85) {
  return `<svg width="${size}" height="${size * 0.4}" viewBox="0 0 60 24"><path d="M2 14C12 2 24 4 30 14 36 4 48 2 58 14 48 8 38 10 30 20 22 10 12 8 2 14Z" fill="${color}" opacity="${op}"/></svg>`;
}

// şehir silueti (genel katman) — panorama içine gömülecek grup
function citySilhouette({ seed, x0, x1, base, hMin, hMax, color, litProb = 0, lit = C.amberL, mosques = 1, dense = 1 }) {
  const r = rng(seed);
  let out = '', win = '';
  let x = x0;
  const mosqueAt = [];
  for (let m = 0; m < mosques; m++) mosqueAt.push(x0 + (x1 - x0) * (m + 0.5 + (r() - 0.5) * 0.3) / mosques);
  while (x < x1) {
    const nearMosque = mosqueAt.find(mx => Math.abs(x - mx) < 40);
    if (nearMosque !== undefined && !mosqueAt.done?.includes(nearMosque)) {
      (mosqueAt.done ||= []).push(nearMosque);
      const mx = nearMosque, dh = hMax * 0.85;
      out += `<path d="M${mx - 60} ${base}V${base - dh * 0.5}a60 60 0 0 1 120 0V${base}Z"/>`;
      out += `<rect x="${mx - 6}" y="${base - dh - 46}" width="12" height="46"/><circle cx="${mx}" cy="${base - dh - 52}" r="7"/>`;
      for (const s of [-1, 1]) {
        const tx = mx + s * 92, th = hMax * 1.5;
        out += `<rect x="${tx - 7}" y="${base - th}" width="14" height="${th}"/><rect x="${tx - 11}" y="${base - th * 0.78}" width="22" height="5"/><path d="M${tx - 8} ${base - th}L${tx} ${base - th - 46}L${tx + 8} ${base - th}Z"/>`;
      }
      out += `<rect x="${mx - 84}" y="${base - dh * 0.32}" width="168" height="${dh * 0.32}"/>`;
      x = mx + 130;
      continue;
    }
    const t = r();
    if (t < 0.12) { // servi
      const h = hMin + r() * (hMax - hMin) * 0.9, w = 18 + r() * 10;
      out += `<ellipse cx="${x + w / 2}" cy="${base - h / 2}" rx="${w / 2}" ry="${h / 2}"/>`;
      x += w + 4;
    } else {
      const w = (34 + r() * 64) * dense, h = hMin + r() * (hMax - hMin);
      const roof = r();
      out += `<rect x="${x}" y="${base - h}" width="${w}" height="${h + 4}"/>`;
      if (roof < 0.45) out += `<path d="M${x - 5} ${base - h}L${x + w / 2} ${base - h - 22 - r() * 16}L${x + w + 5} ${base - h}Z"/>`;
      else if (roof < 0.6) out += `<rect x="${x + 8}" y="${base - h - 14}" width="${w * 0.4}" height="14"/>`;
      if (litProb > 0) {
        for (let wy = base - h + 14; wy < base - 18; wy += 24)
          for (let wx = x + 9; wx < x + w - 12; wx += 20)
            if (r() < litProb) win += `<rect x="${wx}" y="${wy}" width="8" height="11" rx="1.500"/>`;
      }
      x += w + (r() < 0.3 ? 0 : 3 + r() * 6);
    }
  }
  return `<g fill="${color}">${out}</g><g fill="${lit}" opacity=".95">${win}</g>`;
}

function star(x, y, r, op) {
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="#FFF3D6" opacity="${op}"/>`;
}

// ---------- ingredient / food icons ----------
function iconLeaf(size = 120, c1 = '#7E9B57', c2 = '#3F5C34') {
  const g = uid('lf');
  return `<svg width="${size}" height="${size}" viewBox="0 0 120 120"><defs><linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>
  <path d="M22 96C10 52 40 16 92 16 100 66 68 100 22 96Z" fill="url(#${g})"/>
  <path d="M26 92C46 66 66 44 88 22" fill="none" stroke="#E6F0C8" stroke-width="3.500" stroke-linecap="round" opacity=".8"/>
  <path d="M46 70l16 2M56 58l16 0M40 82l12 0M66 44l14 -1" stroke="#E6F0C8" stroke-width="2.500" stroke-linecap="round" opacity=".55"/>
  <path d="M84 100C76 76 96 58 112 60 110 84 100 98 84 100Z" fill="${c2}" opacity=".85"/></svg>`;
}
function iconPeel(size = 120) {
  const g = uid('pl');
  return `<svg width="${size}" height="${size}" viewBox="0 0 120 120"><defs><radialGradient id="${g}" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#FFC15A"/><stop offset="1" stop-color="#E5751F"/></radialGradient></defs>
  <circle cx="60" cy="60" r="44" fill="url(#${g})"/><circle cx="60" cy="60" r="35" fill="#FFE0A0" opacity=".9"/>
  ${[...Array(8)].map((_, i) => { const a = i * Math.PI / 4; return `<path d="M60 60L${60 + Math.cos(a - .34) * 33} ${60 + Math.sin(a - .34) * 33}A33 33 0 0 1 ${60 + Math.cos(a + .34) * 33} ${60 + Math.sin(a + .34) * 33}Z" fill="#FFB347" opacity=".85"/>`; }).join('')}
  <circle cx="60" cy="60" r="5" fill="#FFE0A0"/></svg>`;
}
function iconCinnamon(size = 120) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 120 120">
  <g transform="rotate(-32 60 60)">
  <rect x="8" y="34" width="104" height="26" rx="13" fill="#B4642F"/><rect x="8" y="34" width="104" height="9" rx="4.500" fill="#D9894A" opacity=".8"/>
  <ellipse cx="106" cy="47" rx="8" ry="13" fill="#7B3C17"/><path d="M106 40a5 7 0 1 1 -2 10" fill="none" stroke="#D9894A" stroke-width="2.500"/>
  <rect x="14" y="66" width="98" height="24" rx="12" fill="#9A4F22"/><rect x="14" y="66" width="98" height="8" rx="4" fill="#C67A3E" opacity=".8"/>
  <ellipse cx="14" cy="78" rx="7" ry="12" fill="#6A3013"/><path d="M14 71a4.500 6.500 0 1 0 2 9" fill="none" stroke="#C67A3E" stroke-width="2.500"/></g></svg>`;
}
function iconSimit(size = 120) {
  const r = rng(11);
  const seeds = [...Array(34)].map(() => { const a = r() * 6.283, rr = 30 + (r() - .5) * 20; return `<ellipse cx="${60 + Math.cos(a) * rr}" cy="${60 + Math.sin(a) * rr}" rx="3.400" ry="1.700" transform="rotate(${r() * 180} ${60 + Math.cos(a) * rr} ${60 + Math.sin(a) * rr})" fill="#FFF0C4"/>`; }).join('');
  return `<svg width="${size}" height="${size}" viewBox="0 0 120 120"><circle cx="60" cy="60" r="35" fill="none" stroke="#9C5A22" stroke-width="34"/><circle cx="60" cy="60" r="35" fill="none" stroke="#D8933F" stroke-width="28"/><circle cx="60" cy="60" r="31" fill="none" stroke="#EDB35C" stroke-width="12" opacity=".7"/><circle cx="60" cy="60" r="12" fill="#00000010"/>${seeds}</svg>`;
}
function iconChestnut(size = 120) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 120 120"><path d="M60 14C84 30 100 52 98 76 96 98 78 108 60 108 42 108 24 98 22 76 20 52 36 30 60 14Z" fill="#6E3A1D"/><path d="M60 14C72 26 82 40 86 56 74 44 66 30 60 14Z" fill="#8B4E27"/><path d="M34 82C36 98 48 106 60 106 72 106 84 98 86 82 76 92 44 92 34 82Z" fill="#4A230F"/><path d="M40 62 60 48 80 62" fill="none" stroke="#F2D9A0" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M44 66 60 55 76 66" fill="#F0CD84" opacity=".9"/></svg>`;
}
function iconWalnut(size = 120) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 120 120"><circle cx="60" cy="62" r="42" fill="#B98A55"/><path d="M60 20V104" stroke="#8C6032" stroke-width="4"/><path d="M34 42c10 -6 18 2 14 12s-14 8 -10 20 14 8 12 18M86 42c-10 -6 -18 2 -14 12s14 8 10 20 -14 8 -12 18" fill="none" stroke="#8C6032" stroke-width="5" stroke-linecap="round"/><path d="M38 34C46 26 54 24 58 24" stroke="#E2BB84" stroke-width="5" stroke-linecap="round" fill="none"/></svg>`;
}
function iconLokum(size = 120) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 120 120"><g transform="rotate(-12 60 60)"><rect x="24" y="30" width="72" height="60" rx="10" fill="#E88CA6"/><rect x="24" y="30" width="72" height="20" rx="10" fill="#F4B1C4"/><rect x="24" y="30" width="72" height="60" rx="10" fill="none" stroke="#FFF6EE" stroke-width="7" opacity=".9" stroke-dasharray="3 6"/><circle cx="46" cy="66" r="5" fill="#9DB35A"/><circle cx="66" cy="58" r="5" fill="#9DB35A"/><circle cx="76" cy="74" r="5" fill="#9DB35A"/><circle cx="52" cy="78" r="4" fill="#9DB35A"/></g></svg>`;
}

module.exports = { C, uid, rng, smooth, profilePath, page, grain, at, header, footer, wordmark, mark, steam, glass, demlik, ferry, gull, citySilhouette, star,
  iconLeaf, iconPeel, iconCinnamon, iconSimit, iconChestnut, iconWalnut, iconLokum };

// ---- kahve fincanları (gönderi 3) ----
function cup({ kind = 'espresso', width = 420, body = '#FBF3E3', rim = '#fff', coffee = '#2A1208', foam = '#B98650', accent = null, saucer = '#F1E4CC', steamOn = true } = {}) {
  const g = uid('cp'), cl = uid('cc');
  const cfg = {
    espresso: { half: [[74, 58], [70, 88], [58, 128], [46, 158], [40, 170]], rx: 74, rim: 58, handle: 'M222 80C278 74 284 150 214 148' },
    turkish: { half: [[60, 40], [58, 76], [50, 118], [42, 150], [36, 166]], rx: 60, rim: 40, handle: 'M204 62C246 60 250 120 198 124' },
    latte: { half: [[100, 56], [98, 88], [82, 128], [62, 156], [50, 168]], rx: 100, rim: 56, handle: 'M244 84C312 78 316 158 234 152' },
  }[kind];
  const path = profilePath(cfg.half, 150);
  const ry = cfg.rx * 0.2;
  let art = '';
  if (kind === 'latte') art = `<ellipse cx="150" cy="${cfg.rim + 3}" rx="${cfg.rx - 7}" ry="${ry - 2}" fill="#E9D3B4"/><path d="M150 ${cfg.rim + 16}C112 ${cfg.rim + 4} 118 ${cfg.rim - 9} 150 ${cfg.rim - 1}C182 ${cfg.rim - 9} 188 ${cfg.rim + 4} 150 ${cfg.rim + 16}Z" fill="#FBF3E3"/>`;
  else if (kind === 'espresso') art = `<ellipse cx="150" cy="${cfg.rim + 3}" rx="${cfg.rx - 8}" ry="${ry - 3}" fill="${coffee}"/><ellipse cx="150" cy="${cfg.rim + 3}" rx="${cfg.rx - 8}" ry="${ry - 3}" fill="none" stroke="${foam}" stroke-width="6" opacity=".9"/><ellipse cx="138" cy="${cfg.rim + 1}" rx="22" ry="4" fill="#fff" opacity=".2"/>`;
  else art = `<ellipse cx="150" cy="${cfg.rim + 3}" rx="${cfg.rx - 7}" ry="${ry - 2}" fill="${coffee}"/><ellipse cx="150" cy="${cfg.rim + 3}" rx="${cfg.rx - 14}" ry="${ry - 5}" fill="${foam}"/><circle cx="128" cy="${cfg.rim + 2}" r="3" fill="#fff" opacity=".35"/><circle cx="170" cy="${cfg.rim + 5}" r="2.400" fill="#fff" opacity=".3"/><circle cx="152" cy="${cfg.rim}" r="2" fill="#fff" opacity=".3"/>`;
  const deco = accent ? `<g clip-path="url(#${cl})"><rect x="60" y="${cfg.rim + 22}" width="180" height="14" fill="${accent}"/>${[...Array(9)].map((_, i) => `<circle cx="${84 + i * 16.500}" cy="${cfg.rim + 62}" r="4" fill="${accent}"/>`).join('')}<path d="M60 ${cfg.rim + 86}Q150 ${cfg.rim + 100} 240 ${cfg.rim + 86}" stroke="${accent}" stroke-width="5" fill="none"/></g>` : '';
  return `<svg width="${width}" height="${width * 0.8}" viewBox="0 0 300 240">
  <defs><clipPath id="${cl}"><path d="${path}"/></clipPath><linearGradient id="${g}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".16"/><stop offset=".35" stop-color="#fff" stop-opacity=".18"/><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient></defs>
  <ellipse cx="150" cy="196" rx="132" ry="14" fill="#000" opacity=".22"/>
  <ellipse cx="150" cy="186" rx="126" ry="20" fill="${saucer}"/><ellipse cx="150" cy="182" rx="126" ry="19" fill="#fff" opacity=".55"/><ellipse cx="150" cy="180" rx="72" ry="9" fill="#000" opacity=".1"/>
  <path d="${cfg.handle}" fill="none" stroke="${body}" stroke-width="16" stroke-linecap="round"/><path d="${cfg.handle}" fill="none" stroke="#000" stroke-opacity=".14" stroke-width="16" stroke-linecap="round" stroke-dasharray="0 500 80 500"/>
  <path d="${path}" fill="${body}"/>${deco}<path d="${path}" fill="url(#${g})"/>
  <ellipse cx="150" cy="${cfg.rim}" rx="${cfg.rx}" ry="${ry}" fill="${rim}"/><ellipse cx="150" cy="${cfg.rim}" rx="${cfg.rx}" ry="${ry}" fill="url(#${g})" opacity=".5"/>
  ${art}
  </svg>`;
}
module.exports.cup = cup;
