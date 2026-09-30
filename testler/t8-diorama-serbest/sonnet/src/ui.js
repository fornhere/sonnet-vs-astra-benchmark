import * as THREE from 'three';
import { viewToCam } from './info.js';
import { smooth } from './util.js';

const $ = (s) => document.querySelector(s);
export function initUI(o) {
  const { camera, controls, canvas, rig, info, tourStops, api } = o;
  const labelsEl = $('#labels'); const items = [];
  const mk = (cls, text, pos, y, extra = {}) => { const el = document.createElement('div'); el.className = 'lb ' + cls; el.textContent = text; labelsEl.appendChild(el); const it = { el, cls, pos: new THREE.Vector3(pos[0], y, pos[1]), ...extra }; items.push(it); return it; };
  const major = new Set(['esb', 'wtc', 'liberty', 'cpark', 'bkbr', 'qbr']);
  const primaryHood = new Set(['Financial District', 'Midtown', 'Upper West Side', 'Upper East Side', 'Harlem', 'Greenwich Village', 'Jersey City']);
  for (const h of info.hoods) mk(h.water ? 'water' : 'hood', h.name, h.pos, h.water ? 9.5 : 26, { primary: primaryHood.has(h.name) });
  for (const l of info.lm) { const it = mk('lm', l.name, l.pos, l.y, { lm: l, major: major.has(l.id), flip: l.id === 'wtc' || l.id === 'liberty' }); if (it.flip) it.el.style.flexDirection = 'row-reverse'; it.el.addEventListener('click', (e) => { e.stopPropagation(); select(l); }); }
  let selected = null;
  function select(l) {
    selected = l; for (const it of items) if (it.lm) it.el.classList.toggle('sel', it.lm === l);
    $('#ct').textContent = 'Yer imi'; $('#cn').textContent = l.name; $('#cs').textContent = l.sub; $('#cp').textContent = l.text; $('#card').classList.add('show');
    const c = viewToCam({ pos: l.pos, ...l.v }, THREE); rig.flyTo(c.pos, c.target, 2.2);
  }
  $('#cardx').onclick = () => { $('#card').classList.remove('show'); selected = null; for (const it of items) it.el.classList.remove('sel'); };
  const cam = document.getElementById('photo'); if (cam) cam.addEventListener('click', () => window.__shot && window.__shot());
  // görünümler
  const goView = (name) => { let v = info.views[name]; if (!v) return; const asp = innerWidth / innerHeight; if (asp < 1.0 && !v.cam) { v = { ...v, dist: v.dist * Math.min(2.4, 1.0 / Math.max(0.45, asp) * (name === 'overview' ? 0.72 : 0.9)), az: name === 'overview' ? 0 : v.az, el: name === 'overview' ? 46 : v.el }; } const c = viewToCam(v, THREE); rig.flyTo(c.pos, c.target, name === 'overview' ? 2.6 : 2.2); };
  document.querySelectorAll('[data-view]').forEach(b => b.addEventListener('click', () => goView(b.dataset.view)));
  // tur
  let touring = false;
  const tb = $('#tourbtn'); const setTour = (on) => { touring = on; document.body.classList.toggle('touring', on); tb.classList.toggle('on', on); tb.firstChild.nodeValue = on ? '■ Turu durdur ' : '▶ Şehir Turu '; };
  const toggleTour = () => { if (touring) { rig.cancelTour(); } else { $('#card').classList.remove('show'); rig.startTour(tourStops); } };
  tb.addEventListener('click', toggleTour);
  api.hooks.onTourStart = () => { setTour(true); $('#help').style.opacity = 0; flow(false); };
  api.hooks.onTourEnd = () => { setTour(false); $('#tourbar').style.width = '0'; $('#caption').classList.remove('show'); };
  let capKey = null;
  api.hooks.onTourCaption = (stop, i, n) => { const cap = $('#caption'); if (!stop || (!stop.title && !stop.text)) { if (!stop) cap.classList.remove('show'); return; }
    if (capKey !== stop) { capKey = stop; $('#capn').textContent = `${String(i).padStart(2, '0')} / ${String(n).padStart(2, '0')}`; $('#capt').textContent = stop.title; $('#capp').textContent = stop.text; }
    cap.classList.add('show'); };
  // zaman
  const tod = $('#tod'), clock = $('#clock'); let flowing = false;
  const fmt = (t) => { const h = Math.floor(t) % 24, m = Math.floor((t - Math.floor(t)) * 60); return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0'); };
  tod.addEventListener('input', () => { flow(false); api.setTime(parseFloat(tod.value)); });
  document.querySelectorAll('[data-tod]').forEach(b => b.addEventListener('click', () => { flow(false); const to = parseFloat(b.dataset.tod); api.tweenTime(to); }));
  const play = $('#play'); const flow = (on) => { flowing = on; play.textContent = on ? '❚❚' : '▶'; play.classList.toggle('on', on); };
  play.addEventListener('click', () => flow(!flowing));
  // anahtarlar
  const sw = (name, fn) => { const el = document.querySelector(`.sw[data-t="${name}"]`); el.addEventListener('click', () => { el.classList.toggle('on'); fn(el.classList.contains('on')); }); return el; };
  const swLabels = sw('labels', on => { labelsEl.style.display = on ? '' : 'none'; });
  sw('traffic', on => api.toggles.traffic(on)); sw('clouds', on => api.toggles.clouds(on)); sw('tilt', on => api.toggles.tilt(on)); sw('bloom', on => api.toggles.bloom(on)); const swSnow = sw('snow', on => api.toggles.snow(on));
  addEventListener('keydown', (e) => { if (e.target && e.target.tagName === 'INPUT') return; const k = e.key.toLowerCase();
    const map = { '1': 'overview', '2': 'downtown', '3': 'midtown', '4': 'park', '5': 'bridges', '6': 'liberty', '7': 'street' };
    if (map[k]) goView(map[k]); else if (k === 't') toggleTour(); else if (k === ' ') { e.preventDefault(); flow(!flowing); } else if (k === 'h') { $('#ui').style.opacity = $('#ui').style.opacity === '0' ? '' : '0'; } else if (k === 'p') window.__shot && window.__shot(); else if (k === 'l') swLabels.click(); else if (k === 'k') swSnow.click(); else if (k === 'f') { if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen && document.documentElement.requestFullscreen(); } });
  setTimeout(() => { $('#help').style.opacity = 0; }, 16000);
  // her karede
  let rects = []; const calcRects = () => { rects = ['#brand', '#left', '#right', '#dock', '#compass', '#card.show'].map(q => document.querySelector(q)).filter(Boolean).map(e => e.getBoundingClientRect()); }; calcRects(); addEventListener('resize', calcRects); setInterval(calcRects, 1500);
  const hidden = (x, y) => rects.some(r => x > r.left - 6 && x < r.right + 6 && y > r.top - 6 && y < r.bottom + 6);
  const v = new THREE.Vector3(); const needle = $('#needle'); const bar = $('#tourbar');
  return {
    update(dt, W, Hh, timeH) {
      if (flowing) { api.setTime((timeH + dt * 0.32) % 24); }
      tod.value = api.getTime(); clock.textContent = fmt(api.getTime());
      const dir = new THREE.Vector3(); camera.getWorldDirection(dir); const head = Math.atan2(dir.x, -dir.z) * 180 / Math.PI; needle.style.transform = `rotate(${-head - 29}deg)`;
      if (rig.tour) bar.style.width = (100 * rig.tour.e / rig.tour.total) + '%';
      const cp = camera.position; const d0 = cp.distanceTo(controls.target); const hK = smooth(16, 60, cp.y);
      for (const it of items) { v.copy(it.pos).project(camera); const dist = cp.distanceTo(it.pos);
        let op = 0;
        if (v.z < 1 && v.z > -1 && Math.abs(v.x) < 1.1 && Math.abs(v.y) < 1.1) {
          if (it.cls === 'hood') op = smooth(90, 220, dist) * (it.primary ? (1 - smooth(1700, 2300, dist)) : (1 - smooth(560, 820, dist))) * 0.95;
          else if (it.cls === 'water') op = smooth(350, 700, dist) * (1 - smooth(1500, 2200, dist)) * 0.9;
          else op = it.major ? (1 - smooth(1500, 2300, dist)) * smooth(30, 70, dist) : (1 - smooth(380, 620, dist)) * smooth(25, 60, dist);
          op *= hK; if (rig.tour) op *= 0.0;
        }
        if (op < 0.02) { if (it.vis !== false) { it.el.style.opacity = 0; it.el.style.pointerEvents = 'none'; it.vis = false; } continue; }
        it.vis = true; it.el.style.opacity = op.toFixed(2); it.el.style.pointerEvents = it.cls === 'lm' ? 'auto' : 'none';
        const x = (v.x * 0.5 + 0.5) * W, y = (-v.y * 0.5 + 0.5) * Hh; if (hidden(x, y)) { it.el.style.opacity = 0; it.el.style.pointerEvents = 'none'; it.vis = false; continue; } it.el.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px) translate(${it.cls === 'lm' ? (it.flip ? 'calc(-100% + 4px)' : '-4px') : '-50%'},-50%)`; }
    },
    goView, select,
  };
}
