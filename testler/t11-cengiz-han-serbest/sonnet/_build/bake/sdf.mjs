import { S } from '../src/shape.js';

const sq = (x) => x * x;
export function smin(a, b, k) { const h = Math.max(k - Math.abs(a - b), 0) / k; return Math.min(a, b) - h * h * k * 0.25; }
export function smax(a, b, k) { return -smin(-a, -b, k); }

// primitives: {f(x,y,z)->d, bb:[x0,y0,z0,x1,y1,z1]}
function withScale(f0, zc, sz) {
  if (sz === 1) return f0;
  const m = Math.min(1, sz);
  return (x, y, z) => f0(x, y, zc + (z - zc) / sz) * m;
}
export function sphere(c, r, sz = 1) {
  const [cx, cy, cz] = c;
  const f = withScale((x, y, z) => Math.hypot(x - cx, y - cy, z - cz) - r, cz, sz);
  const e = r * Math.max(1, sz);
  return { f, bb: [cx - e, cy - e, cz - e, cx + e, cy + e, cz + e] };
}
export function ellipsoid(c, r) {
  const [cx, cy, cz] = c; const [rx, ry, rz] = r;
  const mn = Math.min(rx, ry, rz);
  const f = (x, y, z) => {
    const px = (x - cx) / rx, py = (y - cy) / ry, pz = (z - cz) / rz;
    const k0 = Math.hypot(px, py, pz);
    if (k0 < 1e-6) return -mn;
    const k1 = Math.hypot(px / rx, py / ry, pz / rz);
    return k0 * (k0 - 1) / k1;
  };
  return { f, bb: [cx - rx, cy - ry, cz - rz, cx + rx, cy + ry, cz + rz] };
}
export function rc(a, b, r1, r2, sz = 1) {
  const bax = b[0] - a[0], bay = b[1] - a[1], baz = b[2] - a[2];
  const zc = (a[2] + b[2]) / 2;
  // when z-scaled, the axis endpoint z is remapped too; do the scale about zc on inputs
  const az = a[2], bz = b[2];
  const l2 = bax * bax + bay * bay + baz * baz;
  const rr = r1 - r2, a2 = l2 - rr * rr, il2 = 1 / l2;
  const sgn = Math.sign(rr);
  const f0 = (x, y, z) => {
    const pax = x - a[0], pay = y - a[1], paz = z - a[2];
    const yy = pax * bax + pay * bay + paz * baz;
    const zz = yy - l2;
    const cx = pax * l2 - bax * yy, cy = pay * l2 - bay * yy, cz = paz * l2 - baz * yy;
    const x2 = cx * cx + cy * cy + cz * cz;
    const y2 = yy * yy * l2, z2 = zz * zz * l2;
    const k = sgn * rr * rr * x2;
    if (Math.sign(zz) * a2 * z2 > k) return Math.sqrt(x2 + z2) * il2 - r2;
    if (Math.sign(yy) * a2 * y2 < k) return Math.sqrt(x2 + y2) * il2 - r1;
    return (Math.sqrt(x2 * a2 * il2) + yy * rr) * il2 - r1;
  };
  const f = withScale(f0, zc, sz);
  const R = Math.max(r1, r2) * Math.max(1, sz);
  return { f, bb: [Math.min(a[0], b[0]) - R, Math.min(a[1], b[1]) - R, Math.min(a[2], b[2]) - R,
                   Math.max(a[0], b[0]) + R, Math.max(a[1], b[1]) + R, Math.max(a[2], b[2]) + R] };
}
// polyline of round cones
export function chain(pts, rs, sz = 1) {
  const out = [];
  for (let i = 0; i < pts.length - 1; i++) out.push(rc(pts[i], pts[i + 1], rs[i], rs[i + 1], sz));
  return out;
}
const mirrorZ = (v) => [v[0], v[1], -v[2]];

// A scene is an ordered list of {p, k, sub}: smin with k; sub => subtract (smax with -d)
export function makeScene(items, cutY = null) {
  const list = items.map((it) => ({ p: it.p, k: it.k ?? 0.05, sub: !!it.sub }));
  const bb = [1e9, 1e9, 1e9, -1e9, -1e9, -1e9];
  for (const it of list) if (!it.sub) for (let i = 0; i < 3; i++) { bb[i] = Math.min(bb[i], it.p.bb[i]); bb[i + 3] = Math.max(bb[i + 3], it.p.bb[i + 3]); }
  const f = (x, y, z) => {
    let d = 1e9;
    for (let i = 0; i < list.length; i++) {
      const it = list[i], b = it.p.bb;
      if (it.sub) {
        // subtraction only matters when d is near the surface
        if (d > it.k + 0.5) continue;
        d = smax(d, -it.p.f(x, y, z), it.k);
        continue;
      }
      const dx = Math.max(b[0] - x, 0, x - b[3]), dy = Math.max(b[1] - y, 0, y - b[4]), dz = Math.max(b[2] - z, 0, z - b[5]);
      const lb = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (lb >= d + it.k + 0.02) continue;
      const v = it.p.f(x, y, z);
      d = d > 1e8 ? v : smin(d, v, it.k);
    }
    if (cutY !== null) d = Math.max(d, cutY - y);
    return d;
  };
  return { f, bb };
}

export { mirrorZ };
