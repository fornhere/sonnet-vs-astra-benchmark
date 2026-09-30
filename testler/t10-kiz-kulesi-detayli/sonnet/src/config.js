// URL parametreleri ve kalite ön ayarları
export const params = new URLSearchParams(location.search);

export const QUALITY = params.get('q') === 'low' ? 'low' : 'high';

const PRESETS = {
  high: {
    maxDpr: 1.5,
    renderScale: 1.0,
    seaRadial: 300, seaAngular: 512,
    rainNear: 20000, rainFar: 14000,
    sprayMax: 7000,
    cityBuildings: 9500, cityLights: 5200,
    bloom: true, msaa: 4,
    cubeRes: 256, envEvery: 3,
    cloudOct: 5, seaOct: 7,
    birds: 16,
    ripples: true,
    lowClouds: 5,
    shadows: false,
  },
  low: {
    maxDpr: 1.0,
    renderScale: 0.7,
    seaRadial: 160, seaAngular: 256,
    rainNear: 7000, rainFar: 4000,
    sprayMax: 700,
    cityBuildings: 3200, cityLights: 1800,
    bloom: false, msaa: 0,
    cubeRes: 128, envEvery: 4,
    cloudOct: 3, seaOct: 5,
    birds: 8,
    ripples: false,
    lowClouds: 3,
    shadows: false,
  },
};

export const Q = PRESETS[QUALITY];

// Kamera döngüsü (saniye)
export const LOOP = 60;
// Fener: tam tur süresi (60 sn'nin böleni -> döngüde de ritim korunur)
export const BEAM_PERIOD = 10;

// Sahne sabitleri (metre; +x doğu / Üsküdar, -z kuzey, +y yukarı)
export const TOWER = {
  platformY: 4.2,
  lanternY: 20.0,
  topY: 30.5,
};

export const RNG_SEED = Number(params.get('seed')) || 1453;
