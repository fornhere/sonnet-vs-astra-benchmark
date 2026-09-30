import * as THREE from 'three';
import { createRig, DEFAULT_POSE } from './rig.js';
import { FINISHES, CITIES, sunTimes, fmtTime } from './finishes.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };
const mixv = (a, b, t) => (Array.isArray(a) ? a.map((v, i) => v + (b[i] - v) * t) : a + (b - a) * t);
const PI = Math.PI;

/* ------------------------------------------------------------------ paletler */
// [b0 rgb, b1 rgb, g1 rgba, g2 rgba]
const PAL = {
  night: [6, 7, 11, 13, 16, 26, 70, 95, 150, 0.32, 255, 122, 47, 0.09],
  cool: [5, 8, 13, 10, 19, 32, 70, 120, 190, 0.3, 20, 50, 90, 0.35],
  mid: [7, 8, 10, 17, 19, 25, 120, 130, 160, 0.22, 255, 122, 47, 0.1],
  gold: [9, 8, 6, 22, 18, 11, 220, 170, 80, 0.26, 90, 50, 20, 0.22],
  warm: [10, 8, 8, 27, 17, 13, 255, 140, 70, 0.3, 120, 50, 25, 0.22],
};
const SKY = {
  night: [5, 8, 18, 9, 14, 32, 60, 80, 170, 0.3, 30, 40, 110, 0.3],
  dawn: [24, 12, 24, 66, 30, 44, 255, 140, 80, 0.55, 200, 80, 120, 0.32],
  day: [18, 32, 56, 44, 74, 118, 255, 240, 205, 0.42, 90, 150, 230, 0.36],
  dusk: [22, 10, 28, 62, 22, 46, 255, 96, 96, 0.5, 120, 60, 190, 0.36],
};
const SKYKEY = { night: [0x8ea0ff, 0.55, 0.9], dawn: [0xffa070, 1.0, 1.0], day: [0xfff3e2, 1.35, 1.0], dusk: [0xff8072, 0.95, 1.0] };

/* ------------------------------------------------------------------ zaman çizelgesi (sahne, ilerleme → poz) */
const KEYS = [];
const K = (target, p, over) => KEYS.push({ target, p, over });
const S = (i) => `#s${i}`;

// 0 · giriş
K(S(0), 0, { ry: -0.62, rx: 0.07, z: -2.6, y: 0.15, sx: 0, explode: 0, strap: 1, env: 0, pal: PAL.night, sim: 0, simT: 0, back: 0, rz: 0 });
K(S(0), 0.55, { ry: -0.3, rx: 0.05, z: -1.5, y: 0.05, env: 0.6 });
K(S(0), 1, { ry: 0.1, rx: 0.0, z: 0.4, y: 0, env: 1.1 });
// 1 · kadran
K(S(1), 0, { ry: 0.14, rx: -0.03, z: 0.7, sx: 0.3, env: 1.4, pal: PAL.cool });
K(S(1), 0.5, { ry: 0.3, rx: 0.08, z: 2.3, sx: 0.3, y: 0.1, env: 2.0 });
K(S(1), 1, { ry: -0.22, rx: 0.12, z: 1.4, sx: 0.3, y: 0, env: 2.6 });
// 2 · anatomi
K(S(2), 0, { ry: -0.3, rx: -0.35, z: -1.2, sx: 0.32, y: 0, env: 2.8, pal: PAL.mid });
K(S(2), 0.34, { ry: -0.28, rx: -0.98, rz: 0, z: -4.5, y: -0.75, sx: 0.36, sxM: -0.36, explode: 1, strap: 0, env: 3.3 });
K(S(2), 1, { ry: -0.42, rx: -0.98, rz: 0.55, z: -4.3, y: -0.75, sx: 0.36, explode: 1, strap: 0, env: 4.0 });
// 3 · kalp (arkadan)
K(S(3), 0.4, { ry: PI - 0.4, rx: 0.02, rz: 0, z: -1.6, y: 0, sx: 0.3, sxM: 0, explode: 1, back: 1, strap: 0, pal: PAL.gold, env: 4.7 });
K(S(3), 1, { ry: PI - 0.12, rx: 0.06, rz: 0, z: 1.2, y: 0, sx: 0.32, explode: 0.9, back: 1, env: 5.4 });
// 4 · gün ışığı
K(S(4), 0.24, { ry: 0.1, rx: -0.05, z: 0.8, y: 0.2, sx: 0.05, explode: 0, back: 0, strap: 1, sim: 0, simT: 0, pal: PAL.cool, env: 6.0 });
K(S(4), 0.38, { ry: 0.04, rx: -0.02, z: 1.5, y: 0.55, sx: 0.06, zt: -4.5, syM: 0.38, sim: 1, simT: 0, env: 6.3 });
K(S(4), 0.96, { ry: -0.14, rx: 0.03, z: 1.5, y: 0.55, sx: 0.06, sim: 1, simT: 1, env: 6.9 });
// 5 · malzeme
K(S(5), 0.26, { ry: -1.0, rx: 0.1, z: 1.0, y: 0, sx: -0.32, zt: 0, syM: 0.24, sim: 0, simT: 1, strap: 0, pal: PAL.warm, env: 7.4 });
K(S(5), 0.72, { ry: -1.32, rx: 0.05, z: 2.5, y: 0.12, sx: -0.34, env: 8.0 });
K(S(5), 1, { ry: -0.9, rx: 0.15, z: 0.7, y: 0, sx: -0.32, env: 8.4 });
// 6 · bilekte
K(S(6), 0.12, { ry: -0.7, rx: 0.32, z: -2.7, y: 0.55, sx: 0.3, syM: 0.3, strap: 1, pal: PAL.mid, env: 8.8 });
K(S(6), 1, { ry: -0.2, rx: 0.22, z: -2.4, y: 0.55, sx: 0.3, env: 9.4 });
// 7 · sipariş
K(S(7), 0.1, { ry: 0.3, rx: 0.0, z: -1.2, y: 0, sx: -0.34, syM: 0.24, pal: PAL.night, env: 9.8 });
K(S(7), 1, { ry: 0.85, rx: 0.04, z: -1.6, y: 0, sx: -0.34, env: 10.4 });
// özellikler
K('#specs', 0, { ry: 0.85, rx: 0.04, z: -1.9, sx: -0.32, syM: 0.32 });
K('#specs', 1, { ry: 0.5, rx: 0.1, z: -2.2, sx: -0.32, env: 11 });

/* ------------------------------------------------------------------ durum */
const state = {
  scroll: 0, vh: innerHeight, keys: [], cur: null, tgt: null,
  finish: 0, city: 0, kick: 1, intro: 0, mx: 0, my: 0, sm: { x: 0, y: 0 },
  simMin: 720, sun: { rise: 400, set: 1100, noon: 750 },
};

const canvas = $('#gl');
let rig = null;
async function boot() {
  try {
    await Promise.race([
      Promise.all([
        document.fonts.load('italic 40px "Instrument Serif"'), document.fonts.load('40px "Instrument Serif"'),
        document.fonts.load('500 20px Inter'), document.fonts.load('500 20px "JetBrains Mono"'),
      ]),
      new Promise((r) => setTimeout(r, 2500)),
    ]);
  } catch (e) { /* yazı tipi beklemesi başarısız olsa da devam */ }

  try {
    rig = createRig(canvas);
  } catch (e) {
    document.body.classList.add('nogl', 'ready');
    console.warn('WebGL başlatılamadı', e);
    return;
  }
  initUI();
  layout();
  addEventListener('resize', () => { rig.resize(); layout(); });
  addEventListener('scroll', () => { state.scroll = scrollY; }, { passive: true });
  addEventListener('pointermove', (e) => { state.mx = e.clientX / innerWidth - 0.5; state.my = e.clientY / innerHeight - 0.5; }, { passive: true });
  state.scroll = scrollY;
  selectCity(0, true);
  selectFinish(0, true);
  requestAnimationFrame(() => requestAnimationFrame(() => { document.body.classList.add('ready'); }));
  last = performance.now();
  requestAnimationFrame(frame);
}

/* ------------------------------------------------------------------ yerleşim: anahtar konumları */
let scenes = [], beats = [], tagEls = [];
function layout() {
  state.vh = innerHeight;
  const docTop = (el) => el.getBoundingClientRect().top + scrollY;
  scenes = $$('.scene').map((el) => ({ el, top: docTop(el), h: el.offsetHeight, name: el.dataset.name }));
  const specs = $('#specs');
  const sp = { el: specs, top: docTop(specs), h: specs.offsetHeight, name: specs.dataset.name };
  const all = [...scenes, sp];
  state.all = all;
  state.keys = KEYS.map((k) => {
    const sc = all.find((s) => '#' + s.el.id === k.target);
    const span = Math.max(1, sc.h - state.vh);
    return { px: sc.top + k.p * span, over: k.over };
  }).sort((a, b) => a.px - b.px);
  let prev = { ...DEFAULT_POSE, pal: PAL.night, sim: 0, simT: 0 };
  for (const k of state.keys) { k.pose = { ...prev, ...k.over }; prev = k.pose; }
  buildRail(all);
  beats = $$('[data-in]').map((el) => {
    const [a, b] = el.dataset.in.split(',').map(Number);
    const [c, d] = (el.dataset.out || '9,10').split(',').map(Number);
    return { el, a, b, c, d, scene: all.find((s) => s.el.contains(el)), vis: 0, counts: $$('[data-count]', el).map((n) => ({ n, t: +n.dataset.count, dec: +(n.dataset.dec || 0), t0: -1 })) };
  });
  tagEls = $$('.tag').map((el) => ({ el, key: el.dataset.key }));
}

function evalPose(y) {
  const ks = state.keys;
  if (y <= ks[0].px) return ks[0].pose;
  if (y >= ks[ks.length - 1].px) return ks[ks.length - 1].pose;
  let i = 0;
  while (i < ks.length - 2 && y > ks[i + 1].px) i++;
  const a = ks[i], b = ks[i + 1];
  const u = clamp((y - a.px) / (b.px - a.px));
  const e = u * 0.25 + smooth(0, 1, u) * 0.75;
  const out = {};
  for (const k in a.pose) out[k] = mixv(a.pose[k], b.pose[k], e);
  return out;
}

/* ------------------------------------------------------------------ UI */
function buildRail(all) {
  const rail = $('#rail');
  rail.innerHTML = '';
  all.forEach((s, i) => {
    const b = document.createElement('button');
    b.type = 'button'; b.innerHTML = `<span>${s.name}</span><i></i>`;
    b.setAttribute('aria-label', s.name);
    b.onclick = () => scrollTo({ top: s.top + (i === 0 ? 0 : Math.min(s.h * 0.08, 60)), behavior: 'smooth' });
    rail.appendChild(b);
  });
  state.railEls = $$('button', rail);
}

function splitWords() {
  $$('.h, .lead').forEach((h) => {
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((t) => {
            if (!t) return;
            if (/^\s+$/.test(t)) frag.appendChild(document.createTextNode(' '));
            else { const w = document.createElement('span'); w.className = 'w'; w.innerHTML = `<span>${t}</span>`; frag.appendChild(w); }
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
      });
    };
    walk(h);
    h.setAttribute('aria-label', h.textContent);
    h._words = $$('.w > span', h);
  });
}

function bind(key, val) { $$(`[data-bind="${key}"]`).forEach((e) => { if (e._v !== val) { e.textContent = val; e._v = val; } }); }

function chipRow(host, onPick, getIdx) {
  host.innerHTML = '';
  CITIES.forEach((c, i) => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'chip'; b.textContent = c.name; b.setAttribute('aria-pressed', i === getIdx());
    b.onclick = () => onPick(i);
    host.appendChild(b);
  });
}

function selectCity(i, init) {
  state.city = i;
  const c = CITIES[i];
  const t = sunTimes(new Date(), c.lat, c.lon, 3);
  state.sun = t;
  rig.watch.setDay(t.rise, t.set);
  $$('.chips button').forEach((b) => { b.setAttribute('aria-pressed', b.textContent === c.name); });
  const bar = $('.bar');
  bar.style.setProperty('--r', (t.rise / 14.4) + '%');
  bar.style.setProperty('--s', (t.set / 14.4) + '%');
  bind('rise', fmtTime(t.rise)); bind('set', fmtTime(t.set));
  const len = t.set - t.rise;
  bind('len', `${Math.floor(len / 60)} sa ${Math.round(len % 60)} dk`);
}

function selectFinish(i, init) {
  state.finish = i;
  const f = FINISHES[i];
  rig.watch.setFinish(i);
  const root = document.documentElement.style;
  root.setProperty('--accent', f.accent);
  const c = parseInt(f.accent.slice(1), 16);
  const soft = [(c >> 16) & 255, (c >> 8) & 255, c & 255].map((v) => Math.round(v + (255 - v) * 0.42));
  root.setProperty('--accent-soft', `rgb(${soft})`);
  bind('finishName', f.name); bind('finishNote', f.note);
  $$('#swatches .sw').forEach((b, k) => b.setAttribute('aria-checked', k === i));
  if (!init) state.kick = 0;
}

function initUI() {
  splitWords();
  const sw = $('#swatches');
  FINISHES.forEach((f, i) => {
    const b = document.createElement('button');
    b.className = 'sw'; b.type = 'button'; b.setAttribute('role', 'radio'); b.setAttribute('aria-label', f.name);
    b.style.setProperty('--g', f.swatch);
    b.onclick = () => selectFinish(i);
    sw.appendChild(b);
  });
  chipRow($('#cities'), (i) => selectCity(i), () => state.city);
  setupOrder();
}

function setupOrder() {
  const dlg = $('#order'), body = $('#ord-body'), tpl = $('#ord-form');
  const open = () => {
    body.innerHTML = '';
    body.appendChild(tpl.content.cloneNode(true));
    const f = FINISHES[state.finish];
    $$('[data-bind]', body).forEach((e) => { e._v = null; });
    bind('finishName', f.name); bind('finishNote', f.note);
    $('[data-bind="swatch"]', body).style.setProperty('--g', f.swatch);
    let city = state.city;
    const host = $('#ord-cities', body);
    const draw = () => chipRow(host, (i) => { city = i; selectCity(i); draw(); }, () => city);
    draw();
    const form = $('#ordform');
    form.onsubmit = (e) => {
      e.preventDefault();
      const mail = $('#ord-mail', body).value.trim();
      if (!mail) return;
      let h = 7; for (const ch of mail) h = (h * 31 + ch.charCodeAt(0)) % 900;
      const no = String(h + 100).padStart(4, '0');
      try { localStorage.setItem('meridian-order', JSON.stringify({ mail, finish: f.id, city: CITIES[city].id, no })); } catch (err) { /* özel mod */ }
      body.innerHTML = `<div class="ord-done"><p class="eyebrow" style="justify-content:center">Sıradasın</p><div class="no">№ ${no}</div><p>${f.name} · ${CITIES[city].name} için ayarlanacak. 14 Ekim'de <b>${mail.replace(/[<>&]/g, '')}</b> adresine haber vereceğiz.</p><button class="btn wide" type="button" data-close>Tamam</button></div>`;
      $('[data-close]', body).onclick = () => dlg.close();
    };
    if (!dlg.open) dlg.showModal();
    setTimeout(() => $('#ord-mail', body)?.focus(), 350);
  };
  $$('[data-order]').forEach((b) => b.addEventListener('click', open));
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
  $('.x', dlg).onclick = () => dlg.close();
}

/* ------------------------------------------------------------------ döngü */
let last = 0, time = 0;
let cur = null;
const tmpV = new THREE.Vector3();
const skyMix = (t) => {
  const { rise, set } = state.sun;
  const u = (t - rise) / (set - rise);
  const dawn = Math.exp(-(u * u) / (2 * 0.06 * 0.06));
  const dusk = Math.exp(-((u - 1) * (u - 1)) / (2 * 0.06 * 0.06));
  const day = smooth(-0.02, 0.2, u) * (1 - smooth(0.8, 1.02, u));
  const night = clamp(1 - smooth(-0.14, -0.02, u) * (1 - smooth(1.02, 1.14, u)) , 0, 1);
  const w = { night, dawn, day, dusk };
  const sum = night + dawn + day + dusk;
  let pal = new Array(14).fill(0), kc = new THREE.Color(0, 0, 0), ki = 0, ke = 0;
  for (const n in w) {
    const k = w[n] / sum;
    SKY[n].forEach((v, i) => { pal[i] += v * k; });
    kc.add(new THREE.Color(SKYKEY[n][0]).multiplyScalar(k));
    ki += SKYKEY[n][1] * k; ke += SKYKEY[n][2] * k;
  }
  return { pal, color: kc, intensity: ki, exposure: ke };
};

function phaseName(t) {
  const { rise, set } = state.sun;
  if (t < rise - 50) return 'Gece';
  if (t < rise + 35) return 'Şafak';
  if (t < 660) return 'Sabah';
  if (t < 840) return 'Öğle';
  if (t < set - 90) return 'Öğleden sonra';
  if (t < set - 5) return 'Altın saat';
  if (t < set + 60) return 'Gün batımı';
  return 'Gece';
}

const setBg = (pal) => {
  const s = document.documentElement.style;
  s.setProperty('--b0', `rgb(${pal[0] | 0},${pal[1] | 0},${pal[2] | 0})`);
  s.setProperty('--b1', `rgb(${pal[3] | 0},${pal[4] | 0},${pal[5] | 0})`);
  s.setProperty('--g1', `rgba(${pal[6] | 0},${pal[7] | 0},${pal[8] | 0},${pal[9].toFixed(3)})`);
  s.setProperty('--g2', `rgba(${pal[10] | 0},${pal[11] | 0},${pal[12] | 0},${pal[13].toFixed(3)})`);
};

function frame(now) {
  requestAnimationFrame(frame);
  const dt = Math.min(0.05, (now - last) / 1000); last = now;
  time += dt;
  const vh = state.vh, y = state.scroll;
  const tgt = evalPose(y);
  if (!cur || state.snap) { cur = { ...tgt }; for (const k in tgt) cur[k] = Array.isArray(tgt[k]) ? tgt[k].slice() : tgt[k]; state.snap = false; }
  const k = 1 - Math.exp(-dt * 6.0);
  for (const key in tgt) cur[key] = mixv(cur[key], tgt[key], k);

  // giriş sahnesi
  state.intro = Math.min(1, state.intro + dt / 2.6);
  const ie = 1 - Math.pow(1 - state.intro, 4);
  // fare paralaksı + hafif salınım
  state.sm.x += (state.mx - state.sm.x) * (1 - Math.exp(-dt * 3));
  state.sm.y += (state.my - state.sm.y) * (1 - Math.exp(-dt * 3));
  state.kick = Math.min(1, state.kick + dt / 1.5);
  const kickAng = (1 - Math.pow(1 - state.kick, 4)) * PI * 2 - PI * 2 * (state.kick >= 1 ? 1 : 0);
  const kickRz = state.kick >= 1 ? 0 : -(PI * 2) + (1 - Math.pow(1 - state.kick, 4)) * PI * 2;

  const p = { ...DEFAULT_POSE, ...cur };
  const wide = rig.size.aspect > 1.05;
  p.ry += Math.sin(time * 0.42) * 0.05 + (wide ? state.sm.x * 0.16 : 0) + (1 - ie) * 1.3;
  p.rx += Math.cos(time * 0.33) * 0.02 + (wide ? state.sm.y * 0.1 : 0);
  p.rz += kickRz;
  p.z -= (1 - ie) * 3.2;
  p.sheenAng = 0.3 + y / vh * 0.5 + p.ry * -1.2;
  p.sheen = 0.55;

  // saat: gerçek zaman ⇄ simüle gün
  const d = new Date();
  const real = d.getHours() * 60 + d.getMinutes() + d.getSeconds() / 60 + d.getMilliseconds() / 60000;
  const { rise, set } = state.sun;
  const sim = rise - 100 + p.simT * (set - rise + 260);
  const simK = clamp(p.sim);
  const clock = real + (sim - real) * simK;
  state.simMin = sim;
  if (simK > 0.02) {
    const sky = skyMix(sim);
    p.pal = mixv(p.pal, sky.pal, simK);
    p.keyColor = '#' + sky.color.getHexString();
    p.key = p.key * (1 + (sky.intensity - 1) * simK);
    p.exposure = 1 + (sky.exposure - 1) * simK * 0.0;
  } else p.keyColor = '#fff4e6';

  const gear = y / vh * 1.7 + time * 0.12;
  const rotor = 0.8 + y / vh * 0.55 + Math.sin(time * 0.7) * 0.25;
  rig.apply(p, { clock, time, gear, rotor }, dt);

  setBg(p.pal);

  updateDOM(p, y, vh, clock, simK);
}

function updateDOM(p, y, vh, clock, simK) {
  // aktif sahne
  const all = state.all;
  let idx = 0;
  for (let i = 0; i < all.length; i++) if (y + vh * 0.5 >= all[i].top) idx = i;
  if (state.idx !== idx) { state.idx = idx; state.railEls.forEach((b, i) => b.classList.toggle('on', i === idx)); }

  // sahne ilerlemeleri + vitrin
  for (const b of beats) {
    const s = b.scene;
    const pr = (y - s.top) / Math.max(1, s.h - vh);
    const vin = smooth(b.a, b.b, pr), vout = smooth(b.c, b.d, pr);
    const a = vin * (1 - vout);
    if (a !== b.vis) {
      b.vis = a;
      const st = b.el.style;
      if (a < 0.004) { st.opacity = 0; st.visibility = 'hidden'; }
      else {
        st.visibility = 'visible'; st.opacity = a.toFixed(3);
        st.transform = `translate3d(0,${((1 - vin) * 46 - vout * 40).toFixed(1)}px,0)`;
      }
      // kelime kelime açılış
      $$('.h, .lead', b.el).forEach((h) => {
        const n = h._words.length;
        h._words.forEach((w, i) => {
          const lp = clamp((vin * (n + 3) - i) / 3) * (1 - vout);
          const e = 1 - Math.pow(1 - lp, 3);
          w.style.transform = `translate3d(0,${((1 - e) * 108).toFixed(1)}%,0)`;
        });
      });
    }
    if (b.counts.length) {
      for (const c of b.counts) {
        if (a > 0.5) {
          if (c.t0 < 0) c.t0 = performance.now();
          const q = clamp((performance.now() - c.t0) / 1600);
          const e = 1 - Math.pow(1 - q, 4);
          const v = c.t * e;
          const txt = v.toLocaleString('tr-TR', { minimumFractionDigits: c.dec, maximumFractionDigits: c.dec });
          if (c.n._t !== txt) { c.n.textContent = txt; c.n._t = txt; }
        } else if (a < 0.02) c.t0 = -1;
      }
    }
  }

  // hero kelime damgası
  const p0 = clamp((y - all[0].top) / (all[0].h - vh));
  const wm = $('#wordmark');
  wm.style.opacity = (1 - smooth(0.0, 0.55, p0)).toFixed(3);
  $('.nav-mid').style.opacity = (1 - smooth(0.02, 0.2, p0)).toFixed(3);
  wm.style.transform = `translate(-50%,${(-54 - p0 * 14).toFixed(2)}%) scale(${(1 + p0 * 0.22).toFixed(3)})`;

  // etiketler
  const p2 = (y - all[2].top) / (all[2].h - vh);
  const tv = smooth(0.42, 0.56, p2) * (1 - smooth(1.0, 1.16, p2)) * smooth(0.9, 1, p.explode);
  const tagsHost = $('#tags');
  if (tv > 0.003) {
    tagsHost.style.visibility = 'visible';
    const W = innerWidth, H = innerHeight;
    const pts = tagEls.map((t) => {
      const a = rig.watch.anchors[t.key];
      a.getWorldPosition(tmpV);
      tmpV.project(rig.camera);
      return { x: (tmpV.x * 0.5 + 0.5) * W, y: (-tmpV.y * 0.5 + 0.5) * H };
    });
    const wide = rig.size.aspect > 1.05;
    let colX = Math.max(...pts.map((q) => q.x)) + (wide ? 90 : 34);
    colX = wide ? Math.min(colX, W - 340) : W - 112;
    const ys = pts.map((q) => q.y).sort((a, b) => a - b);
    let gap = 1e9; for (let i = 1; i < ys.length; i++) gap = Math.min(gap, ys[i] - ys[i - 1]);
    tagsHost.classList.toggle('tight', gap < 50);
    tagEls.forEach((t, i) => {
      const q = pts[i];
      const st = t.el.style;
      const lw = Math.max(26, colX - q.x);
      st.setProperty('--w', lw.toFixed(0) + 'px');
      st.transform = `translate3d(${q.x.toFixed(1)}px,${q.y.toFixed(1)}px,0) translateY(-50%)`;
      const stag = clamp((tv * 8 - i * 0.7) / 3);
      st.opacity = stag.toFixed(3);
    });
  } else if (tagsHost.style.visibility !== 'hidden') {
    tagsHost.style.visibility = 'hidden';
    tagEls.forEach((t) => { t.el.style.opacity = 0; });
  }

  // gün ışığı okuması
  if (simK > 0.1) {
    const t = state.simMin;
    bind('clk', fmtTime(t));
    bind('phase', phaseName(t));
    const bar = $('.bar i');
    bar.style.setProperty('--t', clamp(((t % 1440) + 1440) % 1440 / 1440) * 100 + '%');
  }
  // ilerleme çubuğu kullanıcı için sayfa başlığı vs. gerekmez
}

/* test kancası */
window.__m = {
  settle() { state.snap = true; },
  get pose() { return cur; },
  city: (i) => selectCity(i), finish: (i) => selectFinish(i),
};

boot();
