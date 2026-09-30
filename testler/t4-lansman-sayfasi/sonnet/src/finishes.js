// Üç sonlandırma: kasa, kadran, kayış ve vurgu rengi birlikte değişir.
export const FINISHES = [
  {
    id: 'titan',
    name: 'Ham Titanyum',
    note: 'Fırçalı Grade 5 · Arduvaz kadran',
    caseColor: '#b9bec6',
    caseRough: 0.42,
    polish: '#d9dde3',
    accent: '#ff7a2f',
    dial: { base: '#27313c', dark: '#151c24', light: '#607488', edge: '#0d1218', ink: '#e8edf2', soft: 'rgba(232,237,242,.55)' },
    strap: { base: '#252a31', edge: '#1b1f25', stitch: '#ff7a2f' },
    bezelInk: '#e9edf2', bezelBase: '#1f252c',
    lume: '#dcffd4',
    swatch: 'linear-gradient(135deg,#e8ebef,#8d949d 55%,#c8ccd2)',
  },
  {
    id: 'obsidian',
    name: 'Obsidyen',
    note: 'DLC kaplı titanyum · Siyah kadran',
    caseColor: '#2a2c31',
    caseRough: 0.36,
    polish: '#6a6e77',
    accent: '#ff4f2e',
    dial: { base: '#0c0d10', dark: '#050506', light: '#3a3e47', edge: '#020203', ink: '#f2f2f0', soft: 'rgba(242,242,240,.5)' },
    strap: { base: '#15161a', edge: '#0c0d0f', stitch: '#ff4f2e' },
    bezelInk: '#f2f2f0', bezelBase: '#121316',
    lume: '#e6ffdc',
    swatch: 'linear-gradient(135deg,#4a4d55,#0c0d10 60%,#2a2c31)',
  },
  {
    id: 'ember',
    name: 'Günbatımı',
    note: 'Bronz anodize titanyum · Terrakota kadran',
    caseColor: '#c08c62',
    caseRough: 0.4,
    polish: '#e9c3a0',
    accent: '#ffd28a',
    dial: { base: '#5b2a1b', dark: '#2f130b', light: '#c7683b', edge: '#1c0a05', ink: '#fbeee0', soft: 'rgba(251,238,224,.6)' },
    strap: { base: '#3b2418', edge: '#2a180f', stitch: '#ffd28a' },
    bezelInk: '#f6e6d2', bezelBase: '#38200f',
    lume: '#fff4d0',
    swatch: 'linear-gradient(135deg,#f0c9a3,#a9663a 55%,#e0a67b)',
  },
];

// Şehirler: gün doğumu / batımı gerçekten hesaplanır (NOAA yaklaşımı).
export const CITIES = [
  { id: 'ist', name: 'İstanbul', lat: 41.01, lon: 28.98 },
  { id: 'ank', name: 'Ankara', lat: 39.93, lon: 32.86 },
  { id: 'izm', name: 'İzmir', lat: 38.42, lon: 27.14 },
  { id: 'trb', name: 'Trabzon', lat: 41.0, lon: 39.72 },
  { id: 'van', name: 'Van', lat: 38.49, lon: 43.38 },
];

export function sunTimes(date, lat, lon, tz = 3) {
  const rad = Math.PI / 180;
  const start = new Date(date.getFullYear(), 0, 0);
  const N = Math.floor((date - start) / 86400000);
  const g = (2 * Math.PI / 365) * (N - 1);
  const eq = 229.18 * (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g) - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g));
  const decl = 0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g) - 0.006758 * Math.cos(2 * g) + 0.000907 * Math.sin(2 * g) - 0.002697 * Math.cos(3 * g) + 0.00148 * Math.sin(3 * g);
  const c = Math.cos(90.833 * rad) / (Math.cos(lat * rad) * Math.cos(decl)) - Math.tan(lat * rad) * Math.tan(decl);
  const ha = Math.acos(Math.max(-1, Math.min(1, c))) / rad;
  const noon = 720 - 4 * lon - eq + tz * 60;
  return { rise: noon - 4 * ha, set: noon + 4 * ha, noon };
}

export const fmtTime = (min) => {
  min = ((min % 1440) + 1440) % 1440;
  const h = Math.floor(min / 60), m = Math.floor(min % 60);
  return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0');
};
