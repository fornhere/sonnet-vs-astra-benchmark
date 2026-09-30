// Arayüz: KEŞFET paneli, bilgi kartı, etiketler/iğneler, zaman kaydırıcısı, hava seçici, fps sayacı, fotoğraf modu
import * as THREE from 'three';

export class UI {
  constructor({ landmarks, onFly, onOverview, onTime, onWeather, onAudio, onTour, onPhoto, onSnap }) {
    this.lm = landmarks; this.cb = { onFly, onOverview, onTime, onWeather, onAudio, onTour, onPhoto, onSnap };
    const root = document.getElementById('ui'); this.root = root; this.selected = null; this.hovered = null; this.pinsOn = true; this.fpsOn = true;
    const keyOf = (i) => (i === 9 ? '0' : String(i + 1));
    root.innerHTML = `
      <div class="brand hide-photo"><b>NEW YORK</b><span>Manhattan · voxel maketi</span></div>
      <div class="fps hide-photo" id="fps" title="fps sayacını gizle/göster (F)">-- fps</div>
      <div class="tour" id="tour">Sinematik tur · devam etmek için bir tuşa / fareye dokunun</div>
      <div class="panel hide-photo" id="panel"><h3>KEŞFET</h3>
        <div class="row" data-k="overview"><kbd>Esc</kbd><span class="nm">Genel bakış</span></div>
        ${this.lm.map((l, i) => `<div class="row" data-k="${l.key}"><kbd>${keyOf(i)}</kbd><span class="nm">${l.name}</span></div>`).join('')}
      </div>
      <div class="card hide-photo" id="card"><span class="x" id="cardx">✕</span><h4 id="cardt"></h4><p id="cardp"></p></div>
      <div class="dock hide-photo" id="dock">
        <div class="grp time"><div class="lbl">Gün döngüsü</div><div class="track" id="track"><input id="tslider" type="range" min="0" max="1000" value="660"><div class="thumb" id="thumb"></div></div>
          <div class="ticks"><span data-t="0">Şafak</span><span data-t="0.33">Öğlen</span><span data-t="0.66">Gün batımı</span><span data-t="1">Gece</span></div></div>
        <div class="grp"><div class="lbl">Hava</div><div class="btns" id="wx"><div class="btn on" data-w="clear">☀ Açık</div><div class="btn" data-w="fog">🌫 Sisli</div><div class="btn" data-w="snow">❄ Karlı</div></div></div>
        <div class="grp"><div class="lbl">Araçlar</div><div class="btns"><div class="btn" id="bAudio">🔊 Ses</div><div class="btn on" id="bTour">🎬 Tur</div><div class="btn on" id="bPins">📍 Etiket</div><div class="btn" id="bPhoto">📷 Foto</div></div></div>
      </div>
      <div class="photobar" id="photobar"><div class="btn" id="pSave">⬇ PNG indir</div><div class="btn" id="pExit">✕ Arayüzü geri getir</div></div>
      <div class="toast" id="toast"></div>
      <div class="tip" id="tip"></div>`;
    this.pins = this.lm.map((l, i) => { const d = document.createElement('div'); d.className = 'pin hide-photo'; d.textContent = keyOf(i); root.appendChild(d); return d; });
    this.$ = (id) => document.getElementById(id);
    this.panel = this.$('panel'); this.card = this.$('card'); this.tip = this.$('tip'); this.tourEl = this.$('tour'); this.fpsEl = this.$('fps');
    // panel satırları
    this.panel.querySelectorAll('.row').forEach((r) => r.addEventListener('click', () => { r.dataset.k === 'overview' ? this.cb.onOverview() : this.cb.onFly(r.dataset.k); }));
    this.$('cardx').addEventListener('click', () => this.setCard(null));
    // zaman
    const sl = this.$('tslider'); const setThumb = () => { this.$('thumb').style.left = (sl.value / 10) + '%'; };
    sl.addEventListener('input', () => { setThumb(); this.cb.onTime(sl.value / 1000); }); setThumb(); this.sl = sl; this.setThumb = setThumb;
    root.querySelectorAll('.ticks span').forEach((s) => s.addEventListener('click', () => { sl.value = +s.dataset.t * 1000; setThumb(); this.cb.onTime(+s.dataset.t); }));
    root.querySelectorAll('#wx .btn').forEach((b) => b.addEventListener('click', () => { root.querySelectorAll('#wx .btn').forEach((x) => x.classList.remove('on')); b.classList.add('on'); this.cb.onWeather(b.dataset.w); }));
    this.$('bAudio').addEventListener('click', async () => { const on = await this.cb.onAudio(); this.$('bAudio').classList.toggle('on', on); this.$('bAudio').innerHTML = on ? '🔊 Ses açık' : '🔊 Ses'; });
    this.$('bTour').addEventListener('click', () => { const on = this.cb.onTour(); this.$('bTour').classList.toggle('on', on); });
    this.$('bPins').addEventListener('click', () => { this.pinsOn = !this.pinsOn; this.$('bPins').classList.toggle('on', this.pinsOn); });
    this.$('bPhoto').addEventListener('click', () => this.setPhoto(true));
    this.$('pExit').addEventListener('click', () => this.setPhoto(false)); this.$('pSave').addEventListener('click', () => this.cb.onSnap());
    this.fpsEl.addEventListener('click', () => this.toggleFps());
    // klavye
    window.addEventListener('keydown', (e) => {
      if (e.target && /INPUT|TEXTAREA/.test(e.target.tagName) && e.target.type !== 'range') return;
      const k = e.key;
      if (/^[0-9]$/.test(k)) { const i = k === '0' ? 9 : +k - 1; if (this.lm[i]) this.cb.onFly(this.lm[i].key); }
      else if (k === 'Escape') { if (document.body.classList.contains('photo')) this.setPhoto(false); else this.cb.onOverview(); }
      else if (k === 'Home' || k === 'g' || k === 'G') this.cb.onOverview();
      else if (k === 'p' || k === 'P') this.setPhoto(!document.body.classList.contains('photo'));
      else if (k === 'f' || k === 'F') this.toggleFps();
      else if (k === 'm' || k === 'M') this.$('bAudio').click();
      else if (k === 't' || k === 'T') this.$('bTour').click();
      else if (k === 's' && document.body.classList.contains('photo')) this.cb.onSnap();
    });
    this._fpsN = 0; this._fpsT = performance.now(); this.fps = 0; this._ft = [];
  }
  toggleFps() { this.fpsOn = !this.fpsOn; this.fpsEl.classList.toggle('off', !this.fpsOn); this.fpsEl.style.opacity = this.fpsOn ? '' : '.3'; if (!this.fpsOn) this.fpsEl.textContent = 'fps ·'; }
  setPhoto(on) { document.body.classList.toggle('photo', on); this.toast(on ? 'Fotoğraf modu · S ile PNG indir · Esc ile çık' : ''); if (on) { this.$('photobar').classList.add('show'); setTimeout(() => this.$('photobar').classList.remove('show'), 3500); } this.cb.onPhoto?.(on); }
  toast(t) { const el = this.$('toast'); if (!t) { el.classList.remove('show'); return; } el.textContent = t; el.classList.add('show'); clearTimeout(this._tt); this._tt = setTimeout(() => el.classList.remove('show'), 2600); }
  setSelected(key) {
    this.selected = key; this.panel.querySelectorAll('.row').forEach((r) => r.classList.toggle('on', r.dataset.k === (key || 'overview')));
  }
  setCard(key) {
    if (!key) { this.card.classList.remove('show'); return; }
    const l = this.lm.find((x) => x.key === key); if (!l) return;
    this.$('cardt').textContent = l.name; this.$('cardp').textContent = l.info;
    this.card.style.top = (this.panel.offsetTop + this.panel.offsetHeight + 12) + 'px'; this.card.classList.add('show');
  }
  setTourVisible(v) { this.tourEl.classList.toggle('show', v); this.$('bTour').classList.toggle('on', true); }
  frame(dtMs) {
    this._ft.push(dtMs); if (this._ft.length > 90) this._ft.shift(); const now = performance.now();
    if (now - this._fpsT > 500) { const avg = this._ft.reduce((a, b) => a + b, 0) / this._ft.length; this.fps = 1000 / avg; this._fpsT = now; if (this.fpsOn) this.fpsEl.textContent = Math.round(this.fps) + ' fps · ' + avg.toFixed(1) + ' ms'; }
  }
  // iğneler ve etiket: anchors[i] = THREE.Vector3 (dünya)
  updateLabels(camera, anchors, camDist, hovered) {
    const w = innerWidth, h = innerHeight; const v = new THREE.Vector3(); const photo = document.body.classList.contains('photo');
    anchors.forEach((a, i) => {
      v.copy(a).project(camera); const p = this.pins[i];
      const vis = this.pinsOn && !photo && v.z < 1 && Math.abs(v.x) < 1.05 && Math.abs(v.y) < 1.05 && camDist[i] > 40;
      p.style.opacity = vis ? (hovered === this.lm[i].key ? 1 : 0.85) : 0; p.classList.toggle('hv', hovered === this.lm[i].key);
      p.style.left = ((v.x * 0.5 + 0.5) * w) + 'px'; p.style.top = ((-v.y * 0.5 + 0.5) * h) + 'px';
      if (hovered === this.lm[i].key) { this.tip.textContent = this.lm[i].name; this.tip.style.left = p.style.left; this.tip.style.top = (parseFloat(p.style.top) - 6) + 'px'; }
    });
    this.tip.classList.toggle('show', !!hovered && !document.body.classList.contains('photo'));
  }
}
