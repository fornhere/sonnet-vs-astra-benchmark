// Şehir paleti (Uint8 indeksleri). Yüzeyler "maket" tonlarında: mat, sıcak, hafif doygun.
import { Palette, KIND } from './voxel.js';

export function makeCityPalette() {
  const P = new Palette();
  // ---- zemin ----
  P.add('asphalt', 0x50535a, { kind: KIND.ROAD });
  P.add('asphalt2', 0x484b52, { kind: KIND.ROAD });
  P.add('highway', 0x3c3f46, { kind: KIND.ROAD });
  P.add('walk', 0xc6c1b3);
  P.add('walk2', 0xb5b0a0);
  P.add('plaza', 0xc9b9a0);
  P.add('quay', 0x8e8c86);
  P.add('grass0', 0x5c9a45, { kind: KIND.GRASS });
  P.add('grass1', 0x6aa84c, { kind: KIND.GRASS });
  P.add('grass2', 0x4f8a3d, { kind: KIND.GRASS });
  P.add('forest', 0x386b33, { kind: KIND.GRASS });
  P.add('pond', 0x3f88b8, { kind: KIND.POND });
  P.add('pier', 0x8b6a45, { kind: KIND.WOOD });
  P.add('sand', 0xd6c390);
  // ---- kesit katmanları ----
  P.add('topsoil', 0x3b2718);
  P.add('soil', 0x6b4a2f);
  P.add('clay', 0x9a7550);
  P.add('clay2', 0xb08c5f);
  P.add('gravel', 0x9b9384);
  P.add('rock0', 0x757a82);
  P.add('rock1', 0x5c6169);
  P.add('rock2', 0x8a8f96);
  P.add('bedrock', 0x3f434a);
  P.add('silt', 0x9a8763);
  P.add('watercol', 0x1c5f86, { kind: KIND.WATERSIDE, noTop: true });
  // ---- çatılar ----
  ['roofA:0x6d7075', 'roofB:0x847f78', 'roofC:0x9a7e68', 'roofD:0x5f6e63', 'roofE:0x7a8492', 'roofF:0xaaaaa4', 'roofG:0x8d6a5a'].forEach((s) => { const [n, c] = s.split(':'); P.add(n, parseInt(c), {}); });
  P.add('ledwall', 0x2c2e36, { kind: KIND.SIGN });
  // ---- bina duvarları (pencereli) ----
  const win = { kind: KIND.WINDOWS, wx: 3, wy: 10 };
  const styles = {
    brick: [0xb2705a, 0xa4644f, 0xbf7f68], red: [0x9b5646, 0xa9634f, 0x8a4c3f], tan: [0xc8a878, 0xbb9d70, 0xd2b585],
    cream: [0xe0d2b0, 0xd8c8a4, 0xe8dcc0], stone: [0xb7ae9c, 0xa9a08f, 0xc4bcab], white: [0xe6e2d8, 0xdcd7cb, 0xefece4],
    brown: [0x93765c, 0x876b52, 0xa08264], grey: [0x9aa0a6, 0x8a9096, 0xa8adb2], dark: [0x5f656e, 0x565c66, 0x6a707a],
  };
  for (const k in styles) styles[k].forEach((c, i) => P.add(`w_${k}${i}`, c, win));
  const glass = { kind: KIND.GLASS, wx: 4, wy: 12 };
  const gl = { gblue: [0x86a5bd, 0x96b3c8, 0x7597b0], gteal: [0x74aeb3, 0x82bbc0, 0x669fa6], gsteel: [0xa1abb5, 0x929da8, 0xb0bac3], gnavy: [0x546c86, 0x5f7892, 0x4a5e77], gbronze: [0x9d8872, 0x8e7a66, 0xac9882] };
  for (const k in gl) gl[k].forEach((c, i) => P.add(`g_${k}${i}`, c, glass));
  return P;
}

// Bina stili seçimi için sıralı listeler
export const LOW_STYLES = ['brick', 'red', 'tan', 'cream', 'brown', 'stone', 'brick', 'white'];
export const MID_STYLES = ['brick', 'stone', 'tan', 'cream', 'grey', 'white', 'brown', 'red'];
export const TALL_STYLES = ['stone', 'grey', 'white', 'dark', 'cream', 'stone'];
export const GLASS_STYLES = ['gblue', 'gteal', 'gsteel', 'gnavy', 'gbronze', 'gblue', 'gsteel'];
export const ROOFS = ['roofA', 'roofB', 'roofC', 'roofD', 'roofE', 'roofF', 'roofG'];
