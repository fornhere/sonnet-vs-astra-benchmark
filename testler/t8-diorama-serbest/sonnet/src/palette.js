import { hex } from './util.js';
// Malzeme kimlikleri
export const M = {
  AIR: 0, BEDROCK: 1, SCHIST: 2, SOIL: 3, FILL: 4, SAND: 5, SILT: 6, CONCRETE: 7, ASPHALT: 8, PLAZA: 9, GRASS: 10, FOREST: 11, PITCH: 12, PIER: 13, PONDBED: 14, BEACH: 15,
  LEAF1: 16, LEAF2: 17, LEAF3: 18, LEAF_ORANGE: 19, LEAF_RED: 20, LEAF_YELLOW: 21, TRUNK: 22, ROCK: 23, SNOW: 24,
  BLD0: 32,                                   // 32..71: bina (stil-1)*8+pal
  // kahraman malzemeleri
  LIMESTONE: 80, STEEL: 81, GLASS_WTC: 82, COPPER: 83, GRANITE: 84, GOLD: 85, BRICKRED: 86, SPIRE: 87, DARKGLASS: 88, CREAM: 89, GREENROOF: 90, TERRACOTTA: 91, WHITE: 92, BLACKGLASS: 93, VESSEL: 94, STARFORT: 95, TIMES: 96, ORANGE_FERRY: 97, STEELBLUE: 98, LAMP: 99, CROWN: 100, BRICKGRAY: 101, GLASSBLUE: 102, ROOFGREEN: 103, WOOD: 104, CABLE: 105, ROADDECK: 106, TOWERSTONE: 107, TRUSS: 108, ESBTOP: 109, FLAME: 110, WHITEBOAT: 111, REDBOAT: 112, TAXI: 113,
};
export const MATS = new Array(256).fill(null);
const def = (id, top, side, o = {}) => { MATS[id] = { top: hex(top), side: hex(side), win: 0, jit: 0.05, roof: null, ...o }; };
def(M.BEDROCK, '#3a3f48', '#343944', { jit: 0.12 });
def(M.SCHIST, '#6b7078', '#666b74', { jit: 0.16 });
def(M.SOIL, '#7a5a42', '#7a5a42', { jit: 0.1 });
def(M.FILL, '#9a8a72', '#948570', { jit: 0.08 });
def(M.SAND, '#c9b98d', '#a89a72', { jit: 0.06 });
def(M.SILT, '#5c6870', '#56626b', { jit: 0.08 });
def(M.CONCRETE, '#b4b0a8', '#a6a29a', { jit: 0.03 });
def(M.ASPHALT, '#4b4d53', '#a9a59d', { jit: 0.03, win: 10 });
def(M.PLAZA, '#c9c3b6', '#aaa595', { jit: 0.04 });
def(M.GRASS, '#6c9b45', '#80613f', { jit: 0.06, win: 11 });
def(M.FOREST, '#4f8038', '#6b5236', { jit: 0.06, win: 11 });
def(M.PITCH, '#a99b62', '#80613f', { jit: 0.05 });
def(M.PIER, '#a58559', '#5c452e', { jit: 0.08 });
def(M.PONDBED, '#5b7a6c', '#6b5a42', { jit: 0.06 });
def(M.BEACH, '#dccb98', '#bfae7e', { jit: 0.05 });
def(M.LEAF1, '#4f9440', '#3d7532', { jit: 0.08, win: 9 });
def(M.LEAF2, '#5da24a', '#467f37', { jit: 0.08, win: 9 });
def(M.LEAF3, '#3f8038', '#326a2d', { jit: 0.08, win: 9 });
def(M.LEAF_ORANGE, '#e0862f', '#bd6a26', { jit: 0.08, win: 9 });
def(M.LEAF_RED, '#c94a30', '#a23a26', { jit: 0.08, win: 9 });
def(M.LEAF_YELLOW, '#e3c23c', '#c5a32f', { jit: 0.08, win: 9 });
def(M.TRUNK, '#6b4a2f', '#5a3e28', { jit: 0.06 });
def(M.ROCK, '#8a8a88', '#7c7c7a', { jit: 0.1 });
def(M.SNOW, '#f0f3f6', '#e2e8ee');

// Bina paletleri (stil 1..5), yan yüz rengi + çatı renkleri
export const STYLE_SIDES = [
  null,
  ['#7f96a8', '#6d8497', '#8fa5b3', '#5f7a8c', '#a4b4bd', '#7f8f9b', '#557085', '#9aa9a5'],   // 1 cam kule
  ['#b5644a', '#a8583f', '#c07b5a', '#9c5540', '#b8714f', '#8f4a38', '#c4885f', '#86604a'],   // 2 tuğla
  ['#d8c9a7', '#cfc0a0', '#c9b791', '#e0d3b5', '#bfae8f', '#d0bfa4', '#a96a50', '#c8b8a0'],   // 3 kireçtaşı / art deco
  ['#cfc8bd', '#bdb6ac', '#d8d2c8', '#a9a49c', '#c6c0b4', '#b5ab9c', '#d4cbbb', '#9d9a94'],   // 4 modern
  ['#8a7a6a', '#7d726a', '#95877a', '#6f675f', '#a08f7c', '#85786a', '#726a64', '#9a8b7d'],   // 5 endüstriyel
];
export const ROOFS = ['#56575b', '#66676b', '#4b4c50', '#77787b', '#88705f', '#5f6f60', '#8c8f92', '#6f5d55'];
for (let s = 1; s <= 5; s++) for (let p = 0; p < 8; p++) {
  const id = M.BLD0 + (s - 1) * 8 + p;
  MATS[id] = { top: hex('#66676b'), side: hex(STYLE_SIDES[s][p]), win: s, jit: 0.035, roof: true };
}
// Kahramanlar
def(M.LIMESTONE, '#cdbf9e', '#d4c7a6', { win: 7, jit: 0.02 });
def(M.STEEL, '#c9d1d8', '#c4ccd4', { win: 12, jit: 0.02 });
def(M.GLASS_WTC, '#a9c4d6', '#8fb2c8', { win: 6, jit: 0.015 });
def(M.COPPER, '#67b39a', '#4ea08a', { win: 0, jit: 0.05 });
def(M.GRANITE, '#a9a59d', '#9b978f', { win: 0, jit: 0.05 });
def(M.GOLD, '#f2c14a', '#e8b23a', { win: 13, jit: 0.02 });
def(M.BRICKRED, '#8a5a4a', '#b26a52', { win: 2, jit: 0.04 });
def(M.SPIRE, '#dfe6ee', '#cdd5de', { win: 13, jit: 0.02 });
def(M.DARKGLASS, '#3c4c5e', '#485a6e', { win: 6, jit: 0.02 });
def(M.CREAM, '#e5dcc2', '#ddd2b4', { win: 3, jit: 0.03 });
def(M.GREENROOF, '#6a9a86', '#c8bda0', { win: 3, jit: 0.04 });
def(M.TERRACOTTA, '#b8623f', '#c8a878', { win: 3, jit: 0.04 });
def(M.WHITE, '#f2f2ee', '#eceae4', { win: 0, jit: 0.02 });
def(M.BLACKGLASS, '#20262e', '#2a323c', { win: 6, jit: 0.015 });
def(M.VESSEL, '#c98354', '#c07a4d', { win: 0, jit: 0.04 });
def(M.STARFORT, '#a39a86', '#8f8672', { win: 0, jit: 0.05 });
def(M.TIMES, '#3a3a40', '#202028', { win: 8, jit: 0.0 });
def(M.ORANGE_FERRY, '#f07a1f', '#ec6f14', { win: 0, jit: 0.02 });
def(M.STEELBLUE, '#57728d', '#4d6882', { win: 12, jit: 0.02 });
def(M.LAMP, '#fff0c0', '#fff0c0', { win: 13, jit: 0 });

def(M.CROWN, '#e9eef4', '#dfe6ee', { win: 13, jit: 0.015 });
def(M.BRICKGRAY, '#8d8c88', '#bdb8ad', { win: 3, jit: 0.03 });
def(M.GLASSBLUE, '#7fa4c0', '#6f94b2', { win: 6, jit: 0.015 });
def(M.ROOFGREEN, '#5f9e88', '#5f9e88', { win: 0, jit: 0.04 });
def(M.WOOD, '#8f6d47', '#6b5035', { win: 0, jit: 0.06 });
def(M.CABLE, '#b9b3a6', '#a8a295', { win: 0, jit: 0.03 });
def(M.ROADDECK, '#4a4c52', '#8c8a84', { win: 0, jit: 0.02 });
def(M.TOWERSTONE, '#a89f8c', '#b3a994', { win: 14, jit: 0.05 });
def(M.TRUSS, '#7c8a94', '#6f7d88', { win: 12, jit: 0.04 });
def(M.ESBTOP, '#f4f1e6', '#eee8d4', { win: 13, jit: 0.02 });
def(M.FLAME, '#ffd66a', '#ffc247', { win: 13, jit: 0.0 });
def(M.WHITEBOAT, '#f4f4f0', '#eeeeea', { win: 0, jit: 0.02 });
def(M.REDBOAT, '#c8402c', '#b83a28', { win: 0, jit: 0.02 });
def(M.TAXI, '#f5c518', '#e8b810', { win: 0, jit: 0.02 });
