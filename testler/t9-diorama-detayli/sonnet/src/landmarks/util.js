// Simge modelleri için ince-voxel çizim yardımcıları. Koordinatlar DÜNYA birimi (1 = 20 m), model merkezine göre.
import { VoxelGrid, Palette, KIND } from '../voxel.js';

export function makeLandmarkPalette() {
  const P = new Palette();
  const W = { kind: KIND.WINDOWS, wx: 2, wy: 8 };
  // taş / kireçtaşı
  P.add('lime', 0xd9d1bd, { ...W, wx: 2, wy: 6 }); P.add('lime2', 0xcfc6b0, { ...W, wx: 2, wy: 6 }); P.add('limeP', 0xe3dccb); P.add('limeDk', 0xb9b09b);
  P.add('cream', 0xe8dcc0, W); P.add('sand', 0xc9b48a, W); P.add('granite', 0x9a958a); P.add('graniteDk', 0x7c786f); P.add('stoneLt', 0xbdb6a6);
  P.add('buff', 0xd8bf94, { kind: KIND.WINDOWS, wx: 1, wy: 4 }); P.add('buffDk', 0xa8896a, { kind: KIND.PLAIN }); P.add('buffLt', 0xecdfc4, { kind: KIND.PLAIN });
  P.add('brick', 0xa8614a, W); P.add('brickDk', 0x87483a, W);
  P.add('steel', 0x9aa6b0, { kind: KIND.METAL }); P.add('steelDk', 0x6f7a85, { kind: KIND.METAL }); P.add('chrome', 0xc6d0d8, { kind: KIND.METAL });
  P.add('steelUp', 0xcfdde8, { kind: KIND.UPLIT }); P.add('crownWin', 0x141c2a, { kind: KIND.LITWIN }); P.add('crownWinLit', 0xffe2a0, { kind: KIND.LAMP });
  P.add('glassW', 0x5f8fa6, { kind: KIND.GLASS, wx: 2, wy: 4 }); P.add('glassW2', 0x6d9db2, { kind: KIND.GLASS, wx: 2, wy: 4 }); P.add('glassDk', 0x36566b, { kind: KIND.GLASS, wx: 2, wy: 4 });
  P.add('wtcGlass', 0x6f9fb8, { kind: KIND.GLASS, wx: 2, wy: 4 }); P.add('wtcBase', 0x8d8f94); P.add('wtcSpire', 0xf2f5f8, { kind: KIND.UPLIT });
  P.add('darkGlass', 0x1c2a3a); P.add('black', 0x202226); P.add('rooftop', 0x6a6a6e);
  P.add('copper', 0x6fae9a, { kind: KIND.FLOOD }); P.add('copperDk', 0x5b9784, { kind: KIND.FLOOD }); P.add('copperLt', 0x8cc9b2, { kind: KIND.FLOOD });
  P.add('gold', 0xe9c04a, { kind: KIND.LAMP }); P.add('flame', 0xffcf55, { kind: KIND.LAMP }); P.add('goldMat', 0xc9a13a);
  P.add('grass', 0x5f9c47, { kind: KIND.GRASS }); P.add('grassDk', 0x4a8a3b, { kind: KIND.GRASS }); P.add('path', 0xcdbf9d);
  P.add('deck', 0x5b5f66, { kind: KIND.ROAD }); P.add('deckLine', 0xe8e0a0); P.add('rail', 0x7d838b);
  P.add('cable', 0x2b2d31); P.add('cableLt', 0x777c84); P.add('cableMain', 0x30333a, { kind: KIND.UPLIT }); P.add('cableStay', 0x5e636b, { kind: KIND.UPLIT }); P.add('tower', 0xb59f7c, { kind: KIND.FLOOD }); P.add('towerDk', 0x8f7b5d, { kind: KIND.FLOOD });
  P.add('towerArch', 0x1d1a17);
  P.add('red', 0xc8382e); P.add('redSteps', 0xd04a3a, { kind: KIND.PLAIN }); P.add('white', 0xf1f1ee); P.add('blue', 0x3b6fb6);
  P.add('ice', 0xbfe4f2, { kind: KIND.ICE }); P.add('treeTrunk', 0x6a4a2e); P.add('leaf', 0x2f7a3a, { kind: KIND.CANVAS }); P.add('leaf2', 0x3d8a44, { kind: KIND.CANVAS });
  P.add('xmas', 0xffe08a, { kind: KIND.LAMP }); P.add('xmasG', 0x2a7a44, { kind: KIND.PLAIN });
  P.add('pool', 0x1e3346, { kind: KIND.POND }); P.add('plaza', 0xc6b9a3); P.add('fort', 0x8f8a80); P.add('fortDk', 0x767268);
  for (let i = 0; i < 6; i++) P.add('sign' + i, [0x30a0ff, 0xff3070, 0xffd030, 0x40e070, 0xb050ff, 0xffffff][i], { kind: KIND.SIGN });
  P.add('signBack', 0x2c2e34); P.add('signFrame', 0x18191c);
  P.add('taxi', 0xf2b800); P.add('ferryO', 0xf08a1c); P.add('hullDk', 0x2f3a4a); P.add('cab', 0xe9ecef); P.add('winDk', 0x223244);
  return P;
}

export class Model {
  /** w,d,h: dünya birimi kutu; s: voxel boyutu (dünya birimi) */
  constructor(w, d, h, s, P) {
    this.s = s; this.P = P; this.w = w; this.d = d; this.h = h;
    this.nx = Math.ceil(w / s); this.nz = Math.ceil(d / s); this.ny = Math.ceil(h / s);
    this.g = new VoxelGrid(this.nx, this.ny, this.nz);
  }
  id(n) { return typeof n === 'number' ? n : this.P.id(n); }
  X(x) { return Math.round(x / this.s + this.nx / 2); }
  Z(z) { return Math.round(z / this.s + this.nz / 2); }
  Y(y) { return Math.round(y / this.s); }
  // merkezli kutu (cx,cz merkez; w,d boyut; y0..y1 yükseklik aralığı)
  box(cx, cz, w, d, y0, y1, p) {
    const v = this.id(p);
    const x0 = this.X(cx - w / 2), x1 = this.X(cx + w / 2), z0 = this.Z(cz - d / 2), z1 = this.Z(cz + d / 2), a = this.Y(y0), b = this.Y(y1);
    this.g.box(x0, a, z0, Math.max(x1, x0 + 1), b, Math.max(z1, z0 + 1), v);
  }
  // kutu; ama 2 malzeme: duvar + son katman çatı
  boxRoof(cx, cz, w, d, y0, y1, wall, roof) { this.box(cx, cz, w, d, y0, y1, wall); const b = this.Y(y1); const v = this.id(roof); const x0 = this.X(cx - w / 2), x1 = Math.max(this.X(cx + w / 2), x0 + 1), z0 = this.Z(cz - d / 2), z1 = Math.max(this.Z(cz + d / 2), z0 + 1); this.g.box(x0, b - 1, z0, x1, b, z1, v); }
  cyl(cx, cz, rx, rz, y0, y1, p) { const s = this.s; this.g.cyl(cx / s + this.nx / 2, cz / s + this.nz / 2, rx / s, rz / s, this.Y(y0), this.Y(y1), this.id(p)); }
  ell(cx, cy, cz, rx, ry, rz, p) { const s = this.s; this.g.ellipsoid(cx / s + this.nx / 2, cy / s, cz / s + this.nz / 2, rx / s, ry / s, rz / s, this.id(p)); }
  line(x0, y0, z0, x1, y1, z1, p, r = 0) { const s = this.s, ax = this.nx / 2, az = this.nz / 2; this.g.line(Math.round(x0 / s + ax), Math.round(y0 / s), Math.round(z0 / s + az), Math.round(x1 / s + ax), Math.round(y1 / s), Math.round(z1 / s + az), this.id(p), r); }
  set(x, y, z, p) { this.g.set(this.X(x), this.Y(y), this.Z(z), this.id(p)); }
  // tek voxel (ham indeks)
  raw(ix, iy, iz, p) { this.g.set(ix, iy, iz, this.id(p)); }
  // çokgen prizma (halka: [[x,z],...] dünya birimi model merkezine göre)
  prism(ring, y0, y1, p) {
    const v = this.id(p), s = this.s; const R = ring.map(([x, z]) => [x / s + this.nx / 2, z / s + this.nz / 2]);
    let mnx = 1e9, mxx = -1e9, mnz = 1e9, mxz = -1e9; for (const q of R) { mnx = Math.min(mnx, q[0]); mxx = Math.max(mxx, q[0]); mnz = Math.min(mnz, q[1]); mxz = Math.max(mxz, q[1]); }
    for (let z = Math.floor(mnz); z <= Math.ceil(mxz); z++) for (let x = Math.floor(mnx); x <= Math.ceil(mxx); x++) {
      const px = x + 0.5, pz = z + 0.5; let c = false;
      for (let i = 0, j = R.length - 1; i < R.length; j = i++) { const a = R[i], b = R[j]; if ((a[1] > pz) !== (b[1] > pz) && px < (b[0] - a[0]) * (pz - a[1]) / (b[1] - a[1]) + a[0]) c = !c; }
      if (c) for (let y = this.Y(y0); y < this.Y(y1); y++) this.g.set(x, y, z, v);
    }
  }
}
