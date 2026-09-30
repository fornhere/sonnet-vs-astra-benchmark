// Gönderi 2 — Çayı doğru demlemenin 7 adımı (kaydedilebilir rehber)
const L = require('../lib');
const { C, at, page, rng } = L;
const N = 9;

const CSS = `
.t{font-family:'Noto Serif Display',serif;color:${C.ink};font-weight:500;letter-spacing:-.015em}
.t i{font-style:italic;color:${C.tavsan};font-weight:500}
.lbl{font-weight:700;letter-spacing:.2em;font-size:22px;text-transform:uppercase}
.body{font-size:37px;line-height:1.4;color:#4A2C20}
`;

function bg(inner, bgc = C.cream) { return page(`<div class="slide" style="background:${bgc}">${inner}</div>`, CSS); }

// ---- illüstrasyonlar ----
function dropIll() {
  const g = L.uid('dr');
  return `<svg width="420" height="520" viewBox="0 0 300 372"><defs><linearGradient id="${g}" x1=".2" y1="0" x2=".8" y2="1"><stop offset="0" stop-color="#E6FAFA"/><stop offset=".5" stop-color="#8FD0DC"/><stop offset="1" stop-color="#3B8BA3"/></linearGradient></defs>
  <ellipse cx="150" cy="342" rx="120" ry="18" fill="none" stroke="#CFF1F3" stroke-width="4" opacity=".7"/><ellipse cx="150" cy="342" rx="82" ry="11" fill="none" stroke="#CFF1F3" stroke-width="4" opacity=".9"/><ellipse cx="150" cy="342" rx="42" ry="6" fill="none" stroke="#fff" stroke-width="4"/>
  <path d="M150 12C150 12 36 150 36 226a114 114 0 0 0 228 0C264 150 150 12 150 12Z" fill="url(#${g})"/>
  <path d="M84 232c0 30 16 56 40 66" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round" opacity=".75"/>
  <circle cx="98" cy="196" r="9" fill="#fff" opacity=".8"/>
  <path d="M232 250c-4 22 -16 40 -34 52" fill="none" stroke="#2C6F86" stroke-width="8" stroke-linecap="round" opacity=".35"/></svg>`;
}
function spoonIll() {
  const r = rng(9);
  let leaves = '';
  for (let i = 0; i < 90; i++) {
    const a = r() * 6.283, d = Math.pow(r(), .6) * 78, x = 150 + Math.cos(a) * d * 1.25, y = 138 + Math.sin(a) * d * 0.55 - Math.max(0, 40 - d) * .6;
    const cols = ['#2E1B10', '#3F2616', '#4B3A1B', '#5C4520', '#33301A'];
    leaves += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(7 + r() * 8).toFixed(1)}" ry="${(2.2 + r() * 2).toFixed(1)}" transform="rotate(${(r() * 180).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="${cols[Math.floor(r() * cols.length)]}"/>`;
  }
  let stray = '';
  for (let i = 0; i < 16; i++) {
    const x = 60 + r() * 380, y = 235 + r() * 46;
    stray += `<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="${(7 + r() * 7).toFixed(1)}" ry="2.400" transform="rotate(${(r() * 180).toFixed(0)} ${x.toFixed(0)} ${y.toFixed(0)})" fill="#3A2416" opacity=".9"/>`;
  }
  const g = L.uid('sp');
  return `<svg width="600" height="360" viewBox="0 0 520 300"><defs><linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF8EA"/><stop offset=".5" stop-color="#D9CDB6"/><stop offset="1" stop-color="#A99C82"/></linearGradient></defs>
  ${stray}
  <ellipse cx="180" cy="228" rx="150" ry="18" fill="#000" opacity=".2"/>
  <path d="M215 170C300 176 380 198 500 214" fill="none" stroke="#B7AB92" stroke-width="20" stroke-linecap="round"/><path d="M215 166C300 172 380 194 500 208" fill="none" stroke="url(#${g})" stroke-width="16" stroke-linecap="round"/>
  <ellipse cx="150" cy="150" rx="110" ry="62" fill="#9C917A"/><ellipse cx="150" cy="144" rx="110" ry="62" fill="url(#${g})"/><ellipse cx="150" cy="140" rx="94" ry="50" fill="#B9AD95"/>
  ${leaves}</svg>`;
}
function thermoIll() {
  const marks = [60, 70, 80, 90, 100];
  const y = t => 400 - (t - 50) * 6.6; // 50 -> 400, 100 -> 70
  return `<svg width="520" height="560" viewBox="0 0 520 560">
  <rect x="120" y="26" width="64" height="400" rx="32" fill="#FFF3E0"/><circle cx="152" cy="452" r="66" fill="#FFF3E0"/>
  <rect x="136" y="40" width="32" height="386" rx="16" fill="#E9D9BD"/><circle cx="152" cy="452" r="50" fill="#E9D9BD"/>
  <rect x="140" y="${y(95)}" width="24" height="${430 - y(95)}" rx="12" fill="${C.tavsan}"/><circle cx="152" cy="452" r="42" fill="${C.tavsan}"/>
  <circle cx="140" cy="440" r="12" fill="#fff" opacity=".35"/>
  ${marks.map(t => `<line x1="196" y1="${y(t)}" x2="${t === 100 ? 236 : 222}" y2="${y(t)}" stroke="#FFF3E0" stroke-width="4" stroke-linecap="round"/><text x="252" y="${y(t) + 9}" font-family="Noto Sans" font-weight="700" font-size="26" fill="#FFF3E0" opacity=".85">${t}°</text>`).join('')}
  ${[65, 75, 85].map(t => `<line x1="196" y1="${y(t)}" x2="210" y2="${y(t)}" stroke="#FFF3E0" stroke-width="3" opacity=".6"/>`).join('')}
  <g transform="translate(300,${y(95) - 44})"><path d="M0 44l-30 -22 30 -22h150a22 22 0 0 1 22 22v0a22 22 0 0 1 -22 22z" transform="translate(30,22)" fill="#FFF3E0"/><text x="52" y="59" font-family="Noto Serif Display" font-weight="700" font-size="52" fill="${C.tavsan}">95°C</text></g>
  </svg>`;
}
function timerIll() {
  const cx = 250, cy = 290, R = 210;
  const pol = (a, r) => [cx + Math.sin(a) * r, cy - Math.cos(a) * r];
  let ticks = '', nums = '';
  for (let m = 0; m < 50; m++) { const a = m / 50 * Math.PI * 2, big = m % 5 === 0; const [x1, y1] = pol(a, R - (big ? 28 : 16)), [x2, y2] = pol(a, R - 6); ticks += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#3A1F14" stroke-width="${big ? 5 : 2.500}" stroke-linecap="round"/>`; }
  for (let k = 0; k < 10; k++) { const [x, y] = pol(k / 10 * Math.PI * 2, R - 62); nums += `<text x="${x}" y="${y + 16}" text-anchor="middle" font-family="Noto Serif Display" font-weight="700" font-size="46" fill="#3A1F14">${k === 0 ? 10 : k}</text>`; }
  const a4 = 4 / 10 * Math.PI * 2, a5 = 5 / 10 * Math.PI * 2;
  const [p4x, p4y] = pol(a4, R - 8), [p5x, p5y] = pol(a5, R - 8), [hx, hy] = pol((4.5) / 10 * Math.PI * 2, R - 46);
  return `<svg width="560" height="580" viewBox="0 0 500 540">
  <rect x="222" y="6" width="56" height="30" rx="8" fill="#E9C58A"/><rect x="236" y="30" width="28" height="22" fill="#C99C58"/>
  <circle cx="${cx}" cy="${cy + 8}" r="${R + 20}" fill="#000" opacity=".22"/><circle cx="${cx}" cy="${cy}" r="${R + 20}" fill="#E4573D"/><circle cx="${cx}" cy="${cy}" r="${R + 6}" fill="#B93A26"/><circle cx="${cx}" cy="${cy}" r="${R}" fill="#FBF0DC"/>
  <path d="M${cx} ${cy}L${p4x} ${p4y}A${R - 8} ${R - 8} 0 0 1 ${p5x} ${p5y}Z" fill="${C.amber}"/>
  ${ticks}${nums}
  <line x1="${cx}" y1="${cy}" x2="${hx}" y2="${hy}" stroke="#2B1710" stroke-width="10" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="16" fill="#2B1710"/><circle cx="${cx}" cy="${cy}" r="6" fill="${C.amberL}"/>
  <text x="${cx}" y="${cy - 96}" text-anchor="middle" font-family="iA Writer Quattro S" font-weight="700" font-size="24" letter-spacing="4" fill="#3A1F14" opacity=".7">DAKİKA</text></svg>`;
}
function noSpoonBadge() {
  return `<svg width="190" height="190" viewBox="0 0 190 190"><circle cx="95" cy="95" r="90" fill="#FBF0DC"/><circle cx="95" cy="95" r="90" fill="none" stroke="${C.tavsan}" stroke-width="14"/>
  <g transform="rotate(-38 95 95)"><ellipse cx="95" cy="52" rx="20" ry="27" fill="#5A2E1C"/><rect x="90" y="76" width="10" height="66" rx="5" fill="#5A2E1C"/></g>
  <path d="M40 150L150 40" stroke="${C.tavsan}" stroke-width="14" stroke-linecap="round"/></svg>`;
}
function glassTrio() {
  const teas = [['#FFD88A', '#F2B04A', '#DE8A2B'], ['#FFB65A', '#D9542B', '#7A1D10'], ['#B5501E', '#7A1D10', '#3A0B05']];
  const item = (i, w, lab, sub, top) => `<div style="position:absolute;left:${i.x}px;top:${i.y}px;width:${w}px;text-align:center">${L.glass({ width: w, fill: 0.8, tea: teas[i.k], plate: true, glow: false })}<div class="lbl" style="color:#FFF3E0;margin-top:14px;font-size:${i.big ? 27 : 21}px">${lab}</div><div style="font-family:'Noto Serif Display';font-style:italic;color:#F7D9A8;font-size:${i.big ? 34 : 27}px">${sub}</div></div>`;
  return `<div style="position:relative;width:900px;height:640px">
    ${item({ x: 20, y: 90, k: 0 }, 250, 'Açık', 'kısa dem')}
    ${item({ x: 325, y: 20, k: 1, big: 1 }, 290, 'Tavşan kanı', 'tam kıvamı')}
    ${item({ x: 630, y: 90, k: 2 }, 250, 'Koyu', 'uzun dem')}
    <div style="position:absolute;left:530px;top:6px;width:84px;height:84px;border-radius:50%;background:${C.amberL};display:flex;align-items:center;justify-content:center;box-shadow:0 8px 24px rgba(0,0,0,.35)"><svg width="46" height="46" viewBox="0 0 46 46"><path d="M8 24l10 10 20-22" fill="none" stroke="#5A2E1C" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg></div></div>`;
}

// ---- kart iskeleti ----
function panelPattern(color) {
  let s = '';
  for (let i = 1; i <= 6; i++) s += `<circle cx="500" cy="400" r="${i * 95}" fill="none" stroke="#fff" stroke-opacity="${0.11 - i * 0.012}" stroke-width="2"/>`;
  return `<svg class="abs" style="left:0;top:0" width="1000" height="800" viewBox="0 0 1000 800">${s}</svg>`;
}
function stepSlide(n, cfg) {
  const { color, dark = '#000', label, title, body, ill, illY = 0, illScale = 1, tag } = cfg;
  const progress = [...Array(7)].map((_, i) => `<div style="flex:1;height:8px;border-radius:4px;background:${i < n ? C.tavsan : '#3A1F1420'}"></div>`).join('');
  return bg(`
  <div class="abs" style="left:40px;top:40px;width:1000px;height:800px;border-radius:64px;background:${color};overflow:hidden">
    <div class="abs" style="inset:0;background:radial-gradient(circle at 50% 46%,rgba(255,255,255,.2),rgba(255,255,255,0) 58%),linear-gradient(180deg,rgba(0,0,0,0) 60%,${dark}55)"></div>
    ${panelPattern(color)}
    <div class="abs serif" style="left:40px;top:${cfg.numY ?? -30}px;font-size:640px;line-height:1;font-style:italic;font-weight:500;color:#fff;opacity:.16">${n}</div>
    <div class="abs" style="left:44px;top:44px;display:flex;align-items:center;gap:10px">${L.wordmark('#FFF3E0', 34)}</div>
    <div class="abs mono" style="right:48px;top:52px;color:#FFF3E0;font-size:24px;letter-spacing:.14em;background:rgba(0,0,0,.22);padding:10px 22px;border-radius:40px">ADIM ${n} / 7</div>
    <div class="abs" style="left:0;right:0;top:${cfg.illTop ?? 130}px;display:flex;justify-content:center;transform:scale(${illScale});transform-origin:center top">${ill}</div>
  </div>
  <div class="abs" style="left:80px;top:890px;width:920px">
    <div class="lbl" style="color:${C.tavsan};font-size:22px">${label}</div>
    <div class="t" style="font-size:92px;line-height:1;margin-top:14px">${title}</div>
    <div class="body" style="margin-top:22px;width:900px">${body}</div>
  </div>
  <div class="abs" style="left:80px;right:80px;bottom:56px;display:flex;gap:10px">${progress}</div>`);
}

const slides = [];
// 1 — kapak
slides.push(page(`<div class="slide" style="background:${C.tavsan}">
  <div class="abs" style="inset:0;background:radial-gradient(circle at 60% 62%,#D6512B 0,#A8301B 45%,#6E170C 100%)"></div>
  <div class="abs serif" style="left:330px;top:470px;font-size:900px;line-height:1;font-style:italic;font-weight:600;color:#FFF3E0;opacity:.11;letter-spacing:-.05em">7</div>
  <div class="abs" style="left:80px;top:70px;z-index:5">${L.wordmark('#FFF3E0', 40)}</div>
  <div class="abs mono" style="right:80px;top:78px;color:#FFF3E0;font-size:24px;letter-spacing:.14em;opacity:.85;z-index:5">01 / 09</div>
  <div class="abs" style="left:80px;top:190px;display:flex;align-items:center;gap:16px;z-index:5"><div style="width:54px;height:3px;background:${C.amberL}"></div><div class="lbl" style="color:${C.amberL}">Kaydet · Demleme rehberi</div></div>
  <div class="abs" style="left:80px;top:250px;width:900px;z-index:5"><div class="t" style="color:#FFF3E0;font-size:124px;line-height:.98">Çayı doğru<br>demlemenin</div><div class="t" style="color:#FFF3E0;font-size:124px;line-height:.98"><i style="color:${C.amberL}">7 adımı.</i></div></div>
  <div class="abs" style="left:400px;top:720px;z-index:4">${L.demlik({ width: 640, body: '#F4EAD9', band: C.tavsan, shade: '#5A2E1C' })}</div>
  <div class="abs" style="left:660px;top:585px;z-index:4">${L.steam('#FFEFD6', .6, 160, 170, 7)}</div>
  <div class="abs" style="left:80px;bottom:62px;right:80px;display:flex;justify-content:space-between;align-items:center;z-index:5"><div class="cap" style="color:#FFF3E0;font-size:21px;opacity:.9">@demlik.kadikoy</div><div class="cap" style="color:#FFF3E0;display:flex;align-items:center;font-size:21px">kaydır<svg width="54" height="20" viewBox="0 0 54 20" style="margin-left:14px"><path d="M2 10h48M42 2l8 8-8 8" fill="none" stroke="#FFF3E0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></div></div>
  <div class="abs" style="left:80px;top:960px;z-index:5;width:330px"><div style="font-family:'Noto Serif Display';font-style:italic;color:#FFE6C2;font-size:40px;line-height:1.18">Çay acele sevmez.<br>Ama doğru demlemek de zor değil.</div></div>
</div>`, CSS));

const steps = [
  { color: '#2C6F86', dark: '#0B2A36', label: 'Adım 1 · Su', title: 'Suyu <i>taze</i> çek.', body: 'Soğuk musluk suyuyla başla. Bir kez kaynamış suyu tekrar kaynatma; çayın tadı yorulur.', ill: dropIll(), illTop: 150, illScale: 1.12 },
  { color: '#B5651D', dark: '#3A1A05', label: 'Adım 2 · Demlik', title: 'Demliği <i>ısıt.</i>', body: 'Kaynar suyla çalkala, boşalt. Soğuk demlik çayın sıcaklığını çalar.', ill: L.demlik({ width: 640, body: '#F4EAD9', band: C.tavsan, shade: '#5A2E1C' }) + `<div style="position:absolute;left:240px;top:-112px">${L.steam('#FFEFD6', .75, 170, 190, 8)}</div>`, illTop: 232 },
  { color: '#3F6B45', dark: '#0F2A18', label: 'Adım 3 · Ölçü', title: 'Bir tatlı kaşığı, <i>bir bardak.</i>', body: '200 ml su için tam bir tatlı kaşığı (yaklaşık 2,5 g). Kaşığı ne silme ne tepe doldur.', ill: spoonIll(), illTop: 250, illScale: 1.2, numY: -40 },
  { color: '#C2461F', dark: '#4A1408', label: 'Adım 4 · Sıcaklık', title: 'Kaynasın, <i>bir dakika</i> dursun.', body: 'Hedef 95°C. Suyu kaynadıktan sonra 1 dakika beklet, sonra çayın üstüne dök.', ill: thermoIll(), illTop: 140, illScale: 1.15 },
  { color: '#2B2C64', dark: '#0E0F30', label: 'Adım 5 · Süre', title: 'Dört-beş dakika. <i>Sabır.</i>', body: 'Çay acele sevmez. Zamanlayıcıyı kur, demlik işini yapsın.', ill: timerIll(), illTop: 130, illScale: 1.1 },
  { color: '#5A3A1E', dark: '#1F1005', label: 'Adım 6 · Kapak', title: 'Kapat, <i>karıştırma.</i>', body: 'Kapak kapalı kalsın ki aroma demlikte kalsın. Kaşıkla kurcalamak yok.', ill: L.demlik({ width: 600, body: '#3F6B45', band: '#F4EAD9', shade: '#0F2A18' }) + `<div style="position:absolute;left:735px;top:-10px">${noSpoonBadge()}</div>`, illTop: 260, illScale: 1 },
  { color: '#6E1F3A', dark: '#2A0716', label: 'Adım 7 · Servis', title: 'Rengine bak: <i>tavşan kanı.</i>', body: 'Bardağı önce yarıya kadar doldur, kalanı sıcak suyla ayarla. Açık, orta ya da koyu; karar senin.', ill: glassTrio(), illTop: 118, illScale: 1.02, numY: -30 },
];
steps.forEach((s, i) => slides.push(stepSlide(i + 1, s)));

// 9 — kapanış
slides.push(page(`<div class="slide" style="background:${C.cream}">
  <div class="abs" style="left:0;top:0;width:1080px;height:640px;background:${C.tavsan}"></div>
  <div class="abs" style="left:0;top:0;width:1080px;height:640px;background:radial-gradient(circle at 78% 30%,#D6512B,rgba(0,0,0,0) 60%)"></div>
  <div class="abs" style="left:80px;top:70px">${L.wordmark('#FFF3E0', 40)}</div>
  <div class="abs mono" style="right:80px;top:78px;color:#FFF3E0;font-size:24px;letter-spacing:.14em;opacity:.85">09 / 09</div>
  <div class="abs" style="left:80px;top:200px;width:920px"><div class="t" style="color:#FFF3E0;font-size:104px;line-height:1.02">Yedi adım <i style="color:${C.amberL}">tamam.</i><br>Peki ya harman?</div></div>
  <div class="abs" style="left:735px;top:420px;transform:rotate(5deg)">${L.glass({ width: 270, fill: .8 })}</div>
  <div class="abs" style="left:80px;top:730px;width:640px"><div class="body" style="font-size:36px">Bu adımlar Demlik harmanları için yazıldı. Karadeniz Sabahı, Kadıköy Akşamı ve Adaçaylı Bergamot ile dene; sonra <b style="color:${C.tavsan}">cumartesi atölyesinde</b> ustasından gör.</div></div>
  <div class="abs" style="left:80px;top:1080px;width:920px;display:flex;gap:16px">${['Kaydet', 'Arkadaşına yolla', 'Yorumda dem süreni yaz'].map(t => `<div style="flex:1;text-align:center;padding:22px 8px;border:2.5px solid ${C.tavsan};border-radius:100px;color:${C.tavsan};font-weight:700;font-size:25px">${t}</div>`).join('')}</div>
  <div class="abs" style="left:80px;right:80px;bottom:58px;display:flex;justify-content:space-between" ><div class="cap" style="color:${C.ink};font-size:21px">@demlik.kadikoy</div><div class="cap" style="color:${C.ink};font-size:21px">Moda Cd. No: 42 · demlik.com.tr</div></div>
</div>`, CSS));

module.exports = { dir: 'cay-nasil-demlenir-7-adim', slides };
