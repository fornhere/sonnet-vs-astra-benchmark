// Arayüz: kaydırıcılar, düğmeler, klavye kısayolları, fps sayacı, fotoğraf modu
import { state } from './state.js';
import { params, QUALITY } from './config.js';

const $ = (id) => document.getElementById(id);

export class UI {
  constructor(handlers) {
    this.h = handlers;
    const body = document.body;
    if (params.get('ui') === '0') { body.classList.add('ui-hidden'); state.uiHidden = true; }
    if (params.has('nointro') || params.get('ui') === '0') body.classList.add('nointro');
    if (!state.showFps) body.classList.add('nofps');
    $('bFps').classList.toggle('on', state.showFps);

    this.storm = $('storm'); this.day = $('day');
    this.storm.value = state.storm; this.day.value = state.day;
    this.storm.addEventListener('input', () => { state.storm = Number(this.storm.value); this.refresh(); });
    this.day.addEventListener('input', () => { state.day = Number(this.day.value); this.refresh(); });

    $('bStrike').onclick = () => handlers.strike();
    $('bCam').onclick = () => handlers.camToggle();
    $('bBack').onclick = () => handlers.camCinematic();
    $('bSound').onclick = () => handlers.sound();
    $('bPhoto').onclick = () => this.photo(true);
    $('pDl').onclick = () => handlers.download();
    $('pExit').onclick = () => this.photo(false);
    $('bFps').onclick = () => this.fps(!state.showFps);
    $('bQ').onclick = () => {
      const p = new URLSearchParams(location.search);
      if (QUALITY === 'low') p.delete('q'); else p.set('q', 'low');
      location.search = p.toString();
    };
    $('bQT').textContent = 'Kalite: ' + (QUALITY === 'low' ? 'Düşük' : 'Yüksek');
    $('bQ').classList.toggle('on', QUALITY === 'low');

    // klavye
    window.addEventListener('keydown', (e) => {
      if (e.target && e.target.tagName === 'INPUT' && e.key.length === 1 && !/[a-zA-Z]/.test(e.key)) return;
      const k = e.key.toLowerCase();
      if (k === 'h') this.hide(!state.uiHidden);
      else if (k === 'f') this.fps(!state.showFps);
      else if (k === 'l') handlers.strike();
      else if (k === 'm') handlers.sound();
      else if (k === 'c') handlers.camToggle();
      else if (k === 'p') this.photo(!state.photoMode);
      else if (k === 'escape' && state.photoMode) this.photo(false);
      else if ((k === 'enter' || k === ' ') && state.photoMode) { e.preventDefault(); handlers.download(); }
    });
    // fotoğraf modunda fare hareketi çubuğu geri getirir
    let fadeT = 0;
    window.addEventListener('mousemove', () => {
      if (!state.photoMode) return;
      $('photoBar').classList.remove('faded');
      clearTimeout(fadeT); fadeT = setTimeout(() => $('photoBar').classList.add('faded'), 2600);
    });
    this.refresh();
    this.updateCamButtons();
  }

  refresh() {
    $('stormv').textContent = Math.round(state.storm * 100) + '%';
    const day = state.day;
    // 02:00 gece -> 06:45 şafak
    const mins = 120 + day * 285;
    const hh = String(Math.floor(mins / 60)).padStart(2, '0'), mm = String(Math.floor(mins % 60)).padStart(2, '0');
    const name = day < 0.35 ? 'Gece' : day < 0.75 ? 'Seher' : 'Şafak';
    $('dayv').textContent = `${name} ${hh}:${mm}`;
  }

  hide(v) { state.uiHidden = v; document.body.classList.toggle('ui-hidden', v); }
  fps(v) { state.showFps = v; document.body.classList.toggle('nofps', !v); $('bFps').classList.toggle('on', v); this.toast(v ? 'FPS sayacı açık' : 'FPS sayacı gizlendi'); }

  photo(on) {
    state.photoMode = on;
    document.body.classList.toggle('ui-hidden', on || state.uiHidden);
    $('photoBar').classList.toggle('hide', !on);
    $('photoBar').classList.remove('faded');
    if (on) {
      $('intro').style.display = 'none';
      setTimeout(() => state.photoMode && $('photoBar').classList.add('faded'), 3200);
    }
  }

  updateCamButtons() {
    const free = state.camMode === 'free';
    $('bBack').classList.toggle('hide', !free);
    $('bCam').classList.toggle('hide', free);
    $('bCam').classList.toggle('on', !free);
  }

  setChapter(text) { const el = $('chapter'); if (el.textContent !== text) el.textContent = text; }
  setSound(on) {
    $('bSound').classList.toggle('on', on);
    $('bSoundT').textContent = on ? 'Ses açık' : 'Ses kapalı';
  }

  setFps(fps, ms, extra) {
    $('fpsv').textContent = fps.toFixed(0) + ' fps · ' + ms.toFixed(1) + ' ms';
    $('fpsx').textContent = extra;
  }

  toast(msg) {
    const t = $('toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(this._tt); this._tt = setTimeout(() => t.classList.remove('show'), 1800);
  }

  error(msg) { const e = $('err'); e.textContent = msg; e.classList.remove('hide'); }
}
