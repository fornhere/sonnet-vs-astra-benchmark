import * as THREE from 'three';
import { viewToCam } from './info.js';
// Şehir turu: [görünüm, süre(sn), saat, başlık, metin]
export function buildTour(info) {
  const V = (o) => viewToCam(o, THREE); const lm = (id) => info.lm.find(l => l.id === id);
  const at = (id, over = {}) => V({ pos: lm(id).pos, ...lm(id).v, ...over });
  const S = [];
  const add = (cam, dur, time, title, text) => S.push({ pos: cam.pos, target: cam.target, dur, time, title, text });
  add(V(info.views.overview), 0, 15.6);
  add(V({ ty: 10, pos: [110, 900], az: 20, el: 26, dist: 420 }), 6, 16.2, 'Bir maket şehir', 'Gerçek bina izleri ve yükseklikleriyle inşa edilmiş Manhattan — masanın üstünde.');
  add(at('liberty', { az: 40, el: 12, dist: 44 }), 7, 17.3, 'Özgürlük Heykeli', 'Liberty Adası · 1886');
  add(at('liberty', { az: 95, el: 14, dist: 70 }), 5, 17.9, '', '');
  add(V({ ty: 16, pos: lm('wtc').pos, az: 60, el: 20, dist: 210 }), 6, 18.35, 'Aşağı Manhattan', 'One World Trade Center · 541 m');
  add(at('bkbr', { az: 20, el: 16, dist: 120 }), 7, 18.85, 'Brooklyn Köprüsü', '1883 · Dönemin en uzun asma köprüsü');
  add(V({ ty: 26, pos: lm('esb').pos, az: 28, el: 20, dist: 230 }), 8, 19.5, 'Midtown', 'Empire State ve Chrysler — art deco’nun iki tacı');
  add(V({ ty: 11, pos: lm('timessq').pos, az: 14, el: 30, dist: 80 }), 7, 20.5, 'Times Meydanı', 'Neon hiç sönmez');
  add(V({ ty: 8, pos: lm('cpark').pos, az: 40, el: 40, dist: 330 }), 7, 22.0, 'Central Park', '341 hektar yeşil — betonun ortasında bir vaha');
  add(V({ ty: 6, pos: [200, 500], az: 70, el: 30, dist: 1000 }), 12, 30.7, 'Manhattan', 'Şehir bir gece daha uyanık kaldı — şafak sökerken.');
  return S;
}
