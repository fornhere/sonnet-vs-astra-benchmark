// Shared constants: statue is modelled in "horse metres" and scaled by S to world metres.
export const S = 13.6;            // world metres per model metre
export const BASE_H = 10;
export const STATUE_Y = 11.45;  // world y of hoof level (top of pedestal plinth)
// anchors in model metres (x forward/east, y up, z = rider's right)
export const A = {
  face:    [0.30, 2.50, 0.0],
  hat:     [0.22, 2.75, 0.0],
  handR:   [0.60, 2.08, 0.36],
  whipTip: [1.16, 2.78, 0.62],
  handL:   [0.46, 1.96, -0.24],
  muzzle:  [1.33, 1.56, 0.0],
  horseHead:[1.12, 1.78, 0.0],
  eye:     [1.17, 1.80, 0.09],
  chest:   [0.55, 1.15, 0.0],
  tail:    [-1.15, 0.7, 0.0],
};
export const w = (a) => a.map((v) => v * S);

// rider is drawn 12% larger than life about the saddle
export const RS = 1.12, RC = [0.10, 1.55, 0.0];
export const rt = (p) => [0, 1, 2].map((a) => RC[a] + (p[a] - RC[a]) * RS);
