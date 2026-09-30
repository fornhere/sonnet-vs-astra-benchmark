// Bina yükseklikleri ve stilleri: gerçek NYC yükseklik rasterı → voxel sütunları (+ setback, stil, çatı).
import { W, H } from './geo.js';
import { hash2, mulberry32, SEED } from './rng.js';
import { LOW_STYLES, MID_STYLES, TALL_STYLES, GLASS_STYLES, ROOFS } from './palette.js';

export const VEX = 1.3;       // dikey abartı (dioramada gökdelenler daha etkileyici)
export const MAX_H = 60;      // voxel

export function buildBuildings(world, P, opts = {}) {
  const { bh, land, road, park, clear, isMan } = world;
  const N = W * H;
  const hv = new Uint8Array(N);       // voxel yüksekliği (0 = bina yok)
  const wall = new Uint8Array(N), roof = new Uint8Array(N), depth = new Uint8Array(N);
  for (let i = 0; i < N; i++) {
    if (!bh[i] || !land[i] || road[i] || park[i] === 3 || park[i] === 4 || clear[i]) continue;
    const m = bh[i] * 3;
    if (m < (isMan[i] ? 11 : 90)) continue;   // barakalar/garajlar zemin sayılır; ada dışında yalnız orta/yüksek binalar
    hv[i] = Math.max(1, Math.min(MAX_H, Math.round(m / 20 * VEX)));
  }
  // simge çevresinde "nefes alanı": binalar merkezden uzaklaştıkça yükselir (simge görünür kalsın)
  for (const [hx, hz, R, mn] of opts.halo || []) for (let y = Math.floor(hz - R); y <= Math.ceil(hz + R); y++) for (let x = Math.floor(hx - R); x <= Math.ceil(hx + R); x++) {
    if (x < 0 || y < 0 || x >= W || y >= H) continue; const i = y * W + x; if (!hv[i]) continue; const d = Math.hypot(x - hx, y - hz); if (d >= R) continue;
    const t = d / R; const f = mn + (1 - mn) * t * t * (3 - 2 * t); hv[i] = Math.max(1, Math.round(hv[i] * f));
  }
  // bina grupları: aynı yükseklikteki 4-komşu hücreler tek bina
  const gid = new Int32Array(N).fill(-1); let ng = 0; const stack = [];
  const groupInfo = [];
  for (let s = 0; s < N; s++) {
    if (!hv[s] || gid[s] >= 0) continue;
    let cnt = 0, sx = 0, sy = 0; stack.push(s); gid[s] = ng;
    while (stack.length) {
      const i = stack.pop(); cnt++; sx += i % W; sy += (i / W) | 0;
      const x = i % W, y = (i / W) | 0;
      for (const j of [x > 0 ? i - 1 : -1, x < W - 1 ? i + 1 : -1, y > 0 ? i - W : -1, y < H - 1 ? i + W : -1]) if (j >= 0 && hv[j] === hv[s] && gid[j] < 0) { gid[j] = ng; stack.push(j); }
    }
    groupInfo.push({ h: hv[s], cnt, cx: sx / cnt, cy: sy / cnt }); ng++;
  }
  // duvara uzaklık (0=kenar hücre: bina olmayan komşusu var)
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = y * W + x; if (!hv[i]) continue;
    let d = 3;
    for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) {
      if (Math.abs(dx) + Math.abs(dy) > 2) continue;
      const X = x + dx, Y = y + dy; const empty = X < 0 || Y < 0 || X >= W || Y >= H || !hv[Y * W + X];
      if (empty) d = Math.min(d, Math.abs(dx) + Math.abs(dy));
    }
    depth[i] = d;
  }
  // stil ata
  const pid = (n) => P.id(n);
  for (let i = 0; i < N; i++) {
    if (!hv[i]) continue;
    const g = groupInfo[gid[i]]; const r = hash2(g.cx * 7 | 0, g.cy * 11 | 0, SEED + 77);
    const r2 = hash2(g.cx * 13 | 0, g.cy * 5 | 0, SEED + 91), r3 = hash2(g.cx * 3 | 0, g.cy * 17 | 0, SEED + 5);
    const h = g.h; const shade = Math.floor(r3 * 3);
    let name;
    if (h >= 22) name = r < 0.62 ? 'g_' + GLASS_STYLES[Math.floor(r2 * GLASS_STYLES.length)] + shade : 'w_' + TALL_STYLES[Math.floor(r2 * TALL_STYLES.length)] + shade;
    else if (h >= 11) name = r < 0.4 ? 'g_' + GLASS_STYLES[Math.floor(r2 * GLASS_STYLES.length)] + shade : 'w_' + MID_STYLES[Math.floor(r2 * MID_STYLES.length)] + shade;
    else if (h >= 5) name = 'w_' + MID_STYLES[Math.floor(r2 * MID_STYLES.length)] + shade;
    else name = 'w_' + LOW_STYLES[Math.floor(r2 * LOW_STYLES.length)] + shade;
    wall[i] = pid(name); roof[i] = pid(ROOFS[Math.floor(hash2(g.cx | 0, g.cy | 0, SEED + 3) * ROOFS.length)]);
  }
  // setback: yüksek ve derin binalarda kenar hücreler alçalır (düğün pastası)
  const eff = new Uint8Array(hv);
  for (let i = 0; i < N; i++) {
    if (!hv[i]) continue; const h = hv[i];
    if (h >= 8 && depth[i] === 1) { eff[i] = Math.max(2, h - Math.floor(h * 0.22)); }
    else if (h >= 20 && depth[i] === 2) { eff[i] = h - Math.floor(h * 0.07); }
  }
  // kenarları alçalttığımızda tamamen ince (1 hücre) kuleler tam boyunda kalır: depth=1 ama komşusu yok → derinlik 1'e dahil değil.
  // Basit kural: hücrenin karşı komşusu da bina ise (kalınlık ≥ 2) alçalt, yoksa ince kule → tam yükseklik.
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = y * W + x; if (!hv[i] || eff[i] === hv[i]) continue;
    const nb = (X, Y) => X >= 0 && Y >= 0 && X < W && Y < H && hv[Y * W + X] > 0;
    const thick = (nb(x - 1, y) && nb(x + 1, y)) || (nb(x, y - 1) && nb(x, y + 1)) || (nb(x - 1, y) && nb(x - 2, y)) || (nb(x + 1, y) && nb(x + 2, y)) || (nb(x, y - 1) && nb(x, y - 2)) || (nb(x, y + 1) && nb(x, y + 2));
    if (!thick) eff[i] = hv[i];
  }
  // Times Square: çevredeki binalar LED panolarla kaplanır (üst katlar)
  const sign = new Uint8Array(N);
  if (opts.sign) { const [sx, sz, R] = opts.sign; for (let y = Math.floor(sz - R); y <= Math.ceil(sz + R); y++) for (let x = Math.floor(sx - R); x <= Math.ceil(sx + R); x++) { if (x < 0 || y < 0 || x >= W || y >= H) continue; const i = y * W + x; if (eff[i] >= 2 && Math.hypot(x - sx, y - sz) <= R) sign[i] = 1; } }
  return { hv: eff, wall, roof, gid, sign };
}
