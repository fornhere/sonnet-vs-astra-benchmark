import { POIS, WORLD, RES, HALF } from './config.js';

const $ = (s) => document.querySelector(s);
const clamp = (v, a, b) => Math.min(Math.max(v, a), b);

// ---------- harita dokusu (yükseklik dizisinden) ----------
export function buildMapCanvas(terrain, size = 1024) {
  const c = document.createElement('canvas'); c.width = c.height = size;
  const g = c.getContext('2d'); const im = g.createImageData(size, size);
  const st = RES / size;
  const H = terrain.H, G = terrain.G, NX = terrain.NX, NZ = terrain.NZ;
  for (let j = 0; j < size; j++) for (let i = 0; i < size; i++) {
    const k = Math.floor(j * st) * RES + Math.floor(i * st);
    const h = H[k]; const nx = NX[k], nz = NZ[k]; const ny = Math.sqrt(Math.max(0, 1 - nx * nx - nz * nz));
    const l = clamp(nx * -0.55 + ny * 0.7 + nz * -0.45, 0, 1);
    const tone = 0.42 + 0.7 * l;
    const hh = clamp(h / 210, 0, 1);
    let R = (150 + 75 * hh) * tone, Gc = (118 + 62 * hh) * tone, B = (92 + 44 * hh) * tone;
    const gr = clamp((G[k] - 0.35) * 2.2, 0, 1);
    R = R * (1 - gr) + 92 * tone * gr; Gc = Gc * (1 - gr) + 128 * tone * gr; B = B * (1 - gr) + 62 * tone * gr;
    const o = (j * size + i) * 4; im.data[o] = R; im.data[o + 1] = Gc; im.data[o + 2] = B; im.data[o + 3] = 255;
  }
  g.putImageData(im, 0, 0);
  return c;
}

export class UI {
  constructor(app) {
    this.app = app;
    this.el = {
      loader: $('#loader'), status: $('#loader .status'), prog: $('#loader .prog i'), bStart: $('#bStart'), bFree: $('#bFree'),
      caption: $('#caption'), capK: $('#caption .kick'), capH: $('#caption h2'), capP: $('#caption p'),
      skip: $('#skip'), tourprog: $('#tourprog'), tourbar: $('#tourprog i'),
      hud: $('#hud'), compass: $('#compass canvas'), place: $('#place'), placeN: $('#place .n'), placeM: $('#place .m'), placeK: $('#place .k'),
      mini: $('#mini canvas'), disc: $('#disc'), mode: $('#mode'), alt: $('#alt'), hint: $('#hint'),
      tod: $('#tod'), clock: $('#clock'), bFlow: $('#bFlow'), bFly: $('#bFly'), bMap: $('#bMap'), bPhoto: $('#bPhoto'), bSound: $('#bSound'), bFull: $('#bFull'), bTour: $('#bTour'),
      poi: $('#poi'), poiH: $('#poi h3'), poiP: $('#poi p'), poiK: $('#poi .k'),
      pause: $('#pause'), lockhint: $('#lockhint'), goal: $('#goal'), bigmap: $('#bigmap'), bigCanvas: $('#bigmap canvas'), fadeout: $('#fadeout'), touch: $('#touch'),
    };
    this.disc = new Set(JSON.parse(localStorage.getItem('kapadokya_disc') || '[]'));
    this.capIdx = -1; this.poiTimer = 0; this.hintTimer = 0;
    this.buildStars();
  }

  buildStars() {
    const s = document.querySelector('#loader .stars'); let h = '';
    for (let i = 0; i < 90; i++) {
      const x = Math.random() * 100, y = Math.random() * 62, r = Math.random() * 1.6 + 0.4, o = 0.25 + Math.random() * 0.75;
      h += `<i style="position:absolute;left:${x}%;top:${y}%;width:${r}px;height:${r}px;border-radius:50%;background:#fff;opacity:${o};animation-delay:${(Math.random()*4).toFixed(2)}s;animation-duration:${(2+Math.random()*3).toFixed(1)}s"></i>`;
    }
    s.innerHTML = h;
  }

  progress(p, text) { this.el.prog.style.width = (p * 100) + '%'; if (text) this.el.status.textContent = text; }
  ready() {
    this.el.prog.style.width = '100%'; this.el.status.textContent = 'Hazır';
    this.el.bStart.classList.remove('hidden'); this.el.bFree.classList.remove('hidden');
  }
  hideLoader() { this.el.loader.style.opacity = 0; this.el.loader.style.pointerEvents = 'none'; setTimeout(() => this.el.loader.classList.add('hidden'), 1300); }

  // ---- tur altyazıları ----
  setCaption(c) {
    const e = this.el;
    if (!c) { e.caption.classList.remove('show'); return; }
    e.caption.classList.remove('show');
    setTimeout(() => {
      e.caption.classList.toggle('center', !!c.center);
      e.capK.textContent = c.kick || ''; e.capH.textContent = c.title || ''; e.capP.textContent = c.text || '';
      void e.caption.offsetWidth; e.caption.classList.add('show');
    }, this.capIdx >= 0 ? 350 : 0);
  }
  updateCaptions(t, list) {
    let idx = -1;
    for (let i = 0; i < list.length; i++) if (t >= list[i].t0 && t < list[i].t1) idx = i;
    if (idx !== this.capIdx) { this.capIdx = idx; this.setCaption(idx >= 0 ? list[idx] : null); }
  }
  tourUI(on) {
    document.body.classList.toggle('cine', on);
    this.el.skip.classList.toggle('hidden', !on); this.el.tourprog.classList.toggle('hidden', !on);
    if (!on) { this.capIdx = -1; this.setCaption(null); }
  }
  tourProgress(f) { this.el.tourbar.style.width = (f * 100) + '%'; }

  // ---- HUD ----
  showHUD(on) { this.el.hud.classList.toggle('off', !on); }
  showHint() {
    this.el.hint.style.opacity = 1; clearTimeout(this._hintT);
    this._hintT = setTimeout(() => { this.el.hint.style.opacity = 0; }, 14000);
  }
  setClock(hour) {
    const h = ((hour % 24) + 24) % 24; const hh = Math.floor(h), mm = Math.floor((h - hh) * 60);
    this.el.clock.textContent = String(hh).padStart(2, '0') + ':' + String(mm).padStart(2, '0');
    if (document.activeElement !== this.el.tod) this.el.tod.value = h;
  }

  drawCompass(yaw, pos) {
    const cv = this.el.compass, g = cv.getContext('2d'); const W = cv.width, Hh = cv.height;
    g.clearRect(0, 0, W, Hh);
    const head = ((-yaw * 180 / Math.PI) % 360 + 360) % 360;
    const span = 110, ppd = W / span;
    g.font = '500 22px Inter, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
    const card = { 0: 'K', 45: 'KD', 90: 'D', 135: 'GD', 180: 'G', 225: 'GB', 270: 'B', 315: 'KB' };
    for (let d = Math.floor(head - span / 2 - 2); d <= head + span / 2 + 2; d++) {
      const dd = ((d % 360) + 360) % 360; const x = W / 2 + (d - head) * ppd;
      if (d % 5 === 0) {
        const big = d % 15 === 0;
        g.strokeStyle = 'rgba(246,237,224,' + (big ? 0.7 : 0.35) + ')'; g.lineWidth = 2;
        g.beginPath(); g.moveTo(x, Hh - 2); g.lineTo(x, Hh - (big ? 18 : 11)); g.stroke();
      }
      if (card[dd] !== undefined) {
        g.fillStyle = dd % 90 === 0 ? '#ffd9a8' : 'rgba(246,237,224,.7)';
        g.font = (dd % 90 === 0 ? '600 24px' : '500 18px') + ' Inter, sans-serif';
        g.fillText(card[dd], x, 24);
      }
    }
    // POI işaretleri
    for (const p of POIS) {
      const b = ((Math.atan2(p.x - pos.x, -(p.z - pos.z)) * 180 / Math.PI) % 360 + 360) % 360;
      let diff = ((b - head + 540) % 360) - 180;
      if (Math.abs(diff) > span / 2 - 2) continue;
      const x = W / 2 + diff * ppd;
      const done = this.disc.has(p.id);
      g.fillStyle = done ? 'rgba(255,255,255,.55)' : '#f2a65a';
      g.beginPath(); g.moveTo(x, 6); g.lineTo(x + 7, 13); g.lineTo(x, 20); g.lineTo(x - 7, 13); g.closePath(); g.fill();
    }
    g.fillStyle = '#fff'; g.beginPath(); g.moveTo(W / 2, Hh - 2); g.lineTo(W / 2 - 6, Hh - 12); g.lineTo(W / 2 + 6, Hh - 12); g.closePath(); g.fill();
  }

  drawMini(mapCanvas, pos, yaw) {
    const cv = this.el.mini, g = cv.getContext('2d'); const S = cv.width;
    const view = 760; // metre
    const ms = mapCanvas.width / WORLD;
    const sx = (pos.x + HALF) * ms - view * ms / 2, sz = (pos.z + HALF) * ms - view * ms / 2;
    g.fillStyle = '#211a17'; g.fillRect(0, 0, S, S);
    g.drawImage(mapCanvas, sx, sz, view * ms, view * ms, 0, 0, S, S);
    const scale = S / view;
    for (const p of POIS) {
      const x = S / 2 + (p.x - pos.x) * scale, y = S / 2 + (p.z - pos.z) * scale;
      if (x < -10 || y < -10 || x > S + 10 || y > S + 10) continue;
      g.fillStyle = this.disc.has(p.id) ? 'rgba(255,255,255,.85)' : '#f2a65a';
      g.strokeStyle = 'rgba(0,0,0,.6)'; g.lineWidth = 3;
      g.beginPath(); g.arc(x, y, 8, 0, 7); g.stroke(); g.fill();
    }
    // oyuncu oku (bakış yönü)
    g.save(); g.translate(S / 2, S / 2); g.rotate(-yaw);
    g.fillStyle = 'rgba(255,255,255,.18)'; g.beginPath(); g.moveTo(0, 0); g.arc(0, 0, 70, -Math.PI / 2 - 0.55, -Math.PI / 2 + 0.55); g.closePath(); g.fill();
    g.fillStyle = '#fff'; g.strokeStyle = '#000'; g.lineWidth = 3;
    g.beginPath(); g.moveTo(0, -13); g.lineTo(9, 10); g.lineTo(0, 5); g.lineTo(-9, 10); g.closePath(); g.stroke(); g.fill();
    g.restore();
  }

  drawBigMap(mapCanvas, pos, yaw) {
    const cv = this.el.bigCanvas, g = cv.getContext('2d'); const S = cv.width;
    g.drawImage(mapCanvas, 0, 0, S, S);
    g.strokeStyle = 'rgba(255,255,255,.12)'; g.lineWidth = 1;
    for (let v = -1500; v <= 1500; v += 500) { const p = (v + HALF) / WORLD * S; g.beginPath(); g.moveTo(p, 0); g.lineTo(p, S); g.moveTo(0, p); g.lineTo(S, p); g.stroke(); }
    g.font = '600 22px Cormorant Garamond, Georgia, serif'; g.textBaseline = 'middle';
    for (const p of POIS) {
      const x = (p.x + HALF) / WORLD * S, y = (p.z + HALF) / WORLD * S; const done = this.disc.has(p.id);
      g.fillStyle = done ? '#fff' : '#f2a65a'; g.strokeStyle = 'rgba(0,0,0,.7)'; g.lineWidth = 4;
      g.beginPath(); g.arc(x, y, 9, 0, 7); g.stroke(); g.fill();
      g.lineWidth = 5; g.strokeStyle = 'rgba(0,0,0,.75)'; g.strokeText(p.name, x + 15, y); g.fillStyle = '#fff6e8'; g.fillText(p.name, x + 15, y);
    }
    const x = (pos.x + HALF) / WORLD * S, y = (pos.z + HALF) / WORLD * S;
    g.save(); g.translate(x, y); g.rotate(-yaw); g.fillStyle = '#fff'; g.strokeStyle = '#000'; g.lineWidth = 3;
    g.beginPath(); g.moveTo(0, -16); g.lineTo(11, 13); g.lineTo(0, 7); g.lineTo(-11, 13); g.closePath(); g.stroke(); g.fill(); g.restore();
    g.fillStyle = 'rgba(255,255,255,.7)'; g.font = '600 26px Inter, sans-serif'; g.textAlign = 'center'; g.fillText('K', S / 2, 26); g.textAlign = 'left';
  }

  // ---- keşif ----
  checkDiscovery(pos, sound) {
    let near = null, nd = 1e9;
    for (const p of POIS) {
      const d = Math.hypot(p.x - pos.x, p.z - pos.z);
      if (d < p.r && d < nd) { near = p; nd = d; }
      if (d < p.r * 0.5 && !this.disc.has(p.id)) {
        this.disc.add(p.id); localStorage.setItem('kapadokya_disc', JSON.stringify([...this.disc]));
        this.showPOI(p); sound && sound.chime();
      }
    }
    this.el.disc.innerHTML = `Keşfedilen <b>${this.disc.size} / ${POIS.length}</b>`;
    return near;
  }
  showPOI(p) {
    const e = this.el; e.poiH.textContent = p.name; e.poiP.textContent = p.text;
    e.poiK.textContent = this.disc.size === POIS.length ? 'Bütün yerleri keşfettin' : 'Yeni yer keşfettin · ' + this.disc.size + ' / ' + POIS.length;
    e.poi.classList.add('show'); clearTimeout(this._poiT); this._poiT = setTimeout(() => e.poi.classList.remove('show'), 9000);
  }

  updateGoal(pos) {
    let best = null, bd = 1e9;
    for (const p of POIS) { if (this.disc.has(p.id)) continue; const d = Math.hypot(p.x - pos.x, p.z - pos.z); if (d < bd) { bd = d; best = p; } }
    this.el.goal.innerHTML = best ? `Sıradaki <b>${best.name}</b> · ${bd < 1000 ? Math.round(bd / 10) * 10 + ' m' : (bd / 1000).toFixed(1) + ' km'}` : 'Bütün yerleri keşfettin ✦';
  }

  updatePlace(near, pos, agl, mode, terrain) {
    const e = this.el;
    e.placeN.textContent = near ? near.name : (mode === 'walk' ? 'Kapadokya' : 'Gökyüzü');
    e.placeK.textContent = near ? (this.disc.has(near.id) ? 'Keşfedildi' : 'Yaklaşıyorsun') : 'Şu an';
    const elev = Math.round(1040 + pos.y);
    e.placeM.textContent = `Rakım ${elev} m · Zeminden ${Math.max(0, Math.round(agl))} m`;
    e.mode.textContent = mode === 'walk' ? '' : 'Balon modu';
  }
}
