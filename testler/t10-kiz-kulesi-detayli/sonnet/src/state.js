import { T_SCALE } from './waves.js';
import { params } from './config.js';

const num = (k, d) => (params.has(k) ? Number(params.get(k)) : d);

// Uygulamanın tek gerçek kaynağı (UI ve modüller bunu okur/yazar)
export const state = {
  time: 0,
  dt: 0.016,
  storm: num('storm', 0.8),      // hedef (kaydırıcı)
  stormSmooth: num('storm', 0.8),
  day: num('day', 0),            // 0 gece .. 1 şafak
  daySmooth: num('day', 0),
  rain: 0.8,
  wind: 12,                      // m/s
  gust: 0,
  wave: { amp: 0.6, steep: 0.6 },
  waveTimeScale: T_SCALE,
  lampWorld: [],
  camMode: params.get('free') ? 'free' : 'cinematic',
  camTime: num('t', 0),
  uiHidden: false,
  photoMode: false,
  soundOn: false,
  showFps: params.get('fps') !== '0',
  camHold: false,
  renderH: 1080,
};
