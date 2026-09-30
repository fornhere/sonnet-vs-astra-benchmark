import * as THREE from 'three';

// Zaman-düzensiz Hermite (sonlu fark teğetleri); anahtarlar {t, v:[..]}
function evalKeys(keys, t) {
  const n = keys.length;
  if (t <= keys[0].t) return keys[0].v.slice();
  if (t >= keys[n - 1].t) return keys[n - 1].v.slice();
  let i = 0; while (i < n - 2 && t > keys[i + 1].t) i++;
  const a = keys[i], b = keys[i + 1];
  const h = b.t - a.t, u = (t - a.t) / h;
  const p0 = keys[Math.max(i - 1, 0)], p3 = keys[Math.min(i + 2, n - 1)];
  const u2 = u * u, u3 = u2 * u;
  const h00 = 2 * u3 - 3 * u2 + 1, h10 = u3 - 2 * u2 + u, h01 = -2 * u3 + 3 * u2, h11 = u3 - u2;
  const out = [];
  for (let k = 0; k < a.v.length; k++) {
    const m1 = (b.v[k] - p0.v[k]) / Math.max(b.t - p0.t, 1e-4);
    const m2 = (p3.v[k] - a.v[k]) / Math.max(p3.t - a.t, 1e-4);
    out.push(h00 * a.v[k] + h10 * h * m1 + h01 * b.v[k] + h11 * h * m2);
  }
  return out;
}

// ------------------------------------------------------------------
// Sahne planı. Konumlar [x, zeminden yükseklik, z] (takip çekimlerinde balona göre ofset)
// ------------------------------------------------------------------
export const SHOTS = [
  { // 1 — şafak öncesi, balon kalkış alanı: alçaktan vinç çekimi
    name: 'kalkis', dur: 17, hour: [5.28, 5.52], fov: [50, 46], fadeIn: 2.4, fadeOut: 0.7,
    keys: [
      { t: 0, p: [-165, 11, -928], l: [-250, 28, -985] },
      { t: 7, p: [-146, 24, -905], l: [-246, 34, -985] },
      { t: 13, p: [-120, 52, -885], l: [-238, 42, -992] },
      { t: 17, p: [-96, 92, -862], l: [-230, 50, -1000] },
    ],
  },
  { // 2 — Göreme kasabası, ışıklar yanıyor
    name: 'goreme', dur: 15, hour: [5.60, 5.80], fov: [56, 50], fadeIn: 0.7, fadeOut: 0.7,
    keys: [
      { t: 0, p: [120, 60, 262], l: [213, 25, 127] },
      { t: 8, p: [188, 36, 232], l: [213, 30, 127] },
      { t: 15, p: [246, 26, 188], l: [214, 34, 127] },
    ],
  },
  { // 3 — Aşk Vadisi: sisin içinden yükselen peribacaları
    name: 'ask', dur: 16, hour: [5.92, 6.12], fov: [60, 56], fadeIn: 0.7, fadeOut: 0.7,
    keys: [
      { t: 0, p: [482, 28, -850], l: [466, 31, -629] },
      { t: 8, p: [478, 24, -790], l: [466, 30, -629] },
      { t: 16, p: [472, 20, -725], l: [468, 30, -629] },
    ],
  },
  { // 4 — balonu takip: gün doğumu balonun arkasında, kumaş içten aydınlanır
    name: 'balon', follow: 9, dur: 14, hour: [6.16, 6.34], fov: [44, 40], fadeIn: 0.7, fadeOut: 0.7,
    keys: [
      { t: 0, p: [-66, 2, 26], l: [0, 3, 0] },
      { t: 7, p: [-72, 6, -6], l: [0, 3, 0] },
      { t: 14, p: [-66, 11, -40], l: [0, 4, 0] },
    ],
  },
  { // 5 — Uçhisar Kalesi
    name: 'uchisar', dur: 15, hour: [6.42, 6.64], fov: [56, 52], fadeIn: 0.7, fadeOut: 0.7,
    keys: [
      { t: 0, p: [-505, 112, -55], l: [-760, -8, -430] },
      { t: 6, p: [-535, 98, -160], l: [-762, -18, -430] },
      { t: 11, p: [-548, 108, -255], l: [-766, -14, -432] },
      { t: 15, p: [-532, 138, -325], l: [-768, -6, -438] },
    ],
  },
  { // 6 — iniş: vadi tabanına
    name: 'inis', dur: 15, hour: [6.74, 6.94], fov: [62, 66], fadeIn: 0.7, fadeOut: 0,
    keys: [
      { t: 0, p: [175, 118, 545], l: [110, 20, 720] },
      { t: 7, p: [142, 72, 640], l: [70, 15, 730] },
      { t: 12, p: [126, 26, 690], l: [-10, 14, 742] },
      { t: 15, p: [110, 1.75, 700], l: [-100, 14, 750] },
    ],
  },
];

export const CAPTIONS = [
  { t0: 1.6, t1: 8.6, center: true, kick: 'Nevşehir · Türkiye', title: 'KAPADOKYA', text: 'Güzel atların ülkesi.' },
  { t0: 10.2, t1: 16.2, kick: 'Şafak', title: 'Vadiler uyanırken', text: 'Gün doğmadan balonlar şişer, ilk ışıkla birlikte vadilerin üzerine yükselir.' },
  { t0: 18.6, t1: 27.8, kick: 'Göreme', title: 'Kayaya oyulmuş bir kasaba', text: 'Evler, kiliseler, güvercinlikler… hepsi yumuşak tüf taşına oyuldu.' },
  { t0: 34.6, t1: 45.6, kick: 'Aşk Vadisi', title: 'Peribacaları', text: 'Sert bir başlık, altındaki yumuşak tüfü milyonlarca yıl rüzgâra ve yağmura karşı korudu.' },
  { t0: 52.5, t1: 62.5, kick: 'Gökyüzü', title: 'Sessiz bir yükseliş', text: 'Balonlar rüzgârla süzülür; yükseldikçe vadiler bir harita gibi açılır.' },
  { t0: 67.2, t1: 77.6, kick: 'Uçhisar Kalesi', title: 'Bir kayanın içinde şehir', text: 'Yüzlerce oda, geçit ve pencere. Bölgenin en yüksek noktalarından biri.' },
  { t0: 83.4, t1: 92.0, kick: 'Şimdi sıra sende', title: 'Vadiye in ve keşfet', text: 'Sekiz yer seni bekliyor. Yürü, koş ya da bir balona atla.' },
];

export class Tour {
  constructor(terrain, balloons) {
    this.terrain = terrain; this.balloons = balloons;
    this.shots = SHOTS;
    let t = 0;
    for (const s of this.shots) { s.start = t; t += s.dur; }
    this.total = t;
    this.pos = new THREE.Vector3(); this.look = new THREE.Vector3();
    this.tmp = new THREE.Vector3();
  }

  shotAt(t) {
    for (let i = this.shots.length - 1; i >= 0; i--) if (t >= this.shots[i].start) return this.shots[i];
    return this.shots[0];
  }

  ground(x, z) { return this.terrain.heightAt(x, z); }

  // t: tur zamanı (s)
  sample(t) {
    t = Math.min(Math.max(t, 0), this.total - 1e-3);
    const s = this.shotAt(t);
    const lt = t - s.start;
    const P = evalKeys(s.keys.map(k => ({ t: k.t, v: k.p })), lt);
    const L = evalKeys(s.keys.map(k => ({ t: k.t, v: k.l })), lt);
    const u = lt / s.dur;
    const ease = u * u * (3 - 2 * u);
    let px, py, pz, lx, ly, lz;
    if (s.follow !== undefined && this.balloons) {
      const b = this.balloons.items[s.follow];
      const by = b.y + 15 * b.size;
      px = b.x + P[0]; py = by + P[1]; pz = b.z + P[2];
      lx = b.x + L[0]; ly = by + L[1]; lz = b.z + L[2];
    } else {
      px = P[0]; pz = P[2]; lx = L[0]; lz = L[2];
      py = this.ground(px, pz) + P[1];
      ly = this.ground(lx, lz) + L[1];
    }
    // zemin ve ileri engel payı
    const dx = lx - px, dz = lz - pz, dl = Math.hypot(dx, dz) || 1;
    const clear = s.name === 'inis' && lt > s.dur - 3 ? 0 : 3.2;
    const g0 = this.ground(px, pz);
    let gAhead = Math.max(this.ground(px + dx / dl * 14, pz + dz / dl * 14), this.ground(px + dx / dl * 32, pz + dz / dl * 32) - 6);
    if (s.name === 'inis' && lt > s.dur - 4) gAhead = -1e9;
    py = Math.max(py, g0 + clear, gAhead + 4.5 * (s.name === 'inis' ? 0.3 : 1));
    this.pos.set(px, py, pz); this.look.set(lx, ly, lz);
    // saat: vardiya bazlı doğrusal
    const hour = s.hour[0] + (s.hour[1] - s.hour[0]) * u;
    const fov = s.fov[0] + (s.fov[1] - s.fov[0]) * ease;
    // yumuşak kararma
    let fade = 0;
    if (lt < s.fadeIn) fade = 1 - lt / s.fadeIn;
    if (s.fadeOut > 0 && s.dur - lt < s.fadeOut) fade = Math.max(fade, 1 - (s.dur - lt) / s.fadeOut);
    fade = fade * fade * (3 - 2 * fade);
    return { pos: this.pos, look: this.look, hour, fov, fade, shot: s.name };
  }
}
