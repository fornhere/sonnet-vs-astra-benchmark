/* Piksel-piksel küre işleyici + yardımcılar. Tamamen deterministik: çıktı yalnızca parametrelere bağlı. */
(function () {
  const TAU = Math.PI * 2;
  const D2R = Math.PI / 180;
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const lerp = (a, b, t) => a + (b - a) * t;
  const smooth = (t) => { t = clamp(t); return t * t * (3 - 2 * t); };
  const easeOut = (t) => 1 - Math.pow(1 - clamp(t), 3);
  const easeInOut = (t) => { t = clamp(t); return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
  const easeOutBack = (t) => { t = clamp(t); const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); };
  const sstep = (a, b, x) => smooth((x - a) / (b - a));

  // anahtar-kare: [[t, v], ...] arası easeInOut
  function kf(t, keys, ease = easeInOut) {
    if (t <= keys[0][0]) return keys[0][1];
    for (let i = 1; i < keys.length; i++) {
      if (t <= keys[i][0]) {
        const [t0, v0] = keys[i - 1], [t1, v1] = keys[i];
        return lerp(v0, v1, ease((t - t0) / (t1 - t0)));
      }
    }
    return keys[keys.length - 1][1];
  }

  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const norm = (a) => { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; };
  const vadd = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  const vmul = (a, k) => [a[0] * k, a[1] * k, a[2] * k];

  // ---- kara maskesi ----
  const LAND = { data: null, w: 2048, h: 1024 };
  function initLand() {
    const s = atob(window.LAND_BITS);
    LAND.data = new Uint8Array(LAND.w * LAND.h);
    for (let i = 0; i < LAND.data.length; i++) LAND.data[i] = (s.charCodeAt(i >> 3) >> (i & 7)) & 1 ? 255 : 0;
  }
  function landAt(lon, lat) {
    const W = LAND.w, H = LAND.h, D = LAND.data;
    const fx = (lon / TAU + 0.5) * W - 0.5, fy = (0.5 - lat / Math.PI) * H - 0.5;
    const x0 = Math.floor(fx), y0 = Math.floor(fy);
    const tx = fx - x0, ty = fy - y0;
    const xa = ((x0 % W) + W) % W, xb = (xa + 1) % W;
    const ya = Math.min(H - 1, Math.max(0, y0)), yb = Math.min(H - 1, Math.max(0, y0 + 1));
    const a = D[ya * W + xa], b = D[ya * W + xb], c = D[yb * W + xa], d = D[yb * W + xb];
    return (a * (1 - tx) * (1 - ty) + b * tx * (1 - ty) + c * (1 - tx) * ty + d * tx * ty) / 255;
  }

  // ---- 3B değer gürültüsü ----
  function hash3(x, y, z) {
    let h = (x * 374761393 + y * 668265263 + z * 2147483647) | 0;
    h = (h ^ (h >>> 13)) * 1274126177 | 0;
    return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
  }
  function vnoise(x, y, z) {
    const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
    const xf = x - xi, yf = y - yi, zf = z - zi;
    const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf), w = zf * zf * (3 - 2 * zf);
    const l = (a, b, t) => a + (b - a) * t;
    return l(
      l(l(hash3(xi, yi, zi), hash3(xi + 1, yi, zi), u), l(hash3(xi, yi + 1, zi), hash3(xi + 1, yi + 1, zi), u), v),
      l(l(hash3(xi, yi, zi + 1), hash3(xi + 1, yi, zi + 1), u), l(hash3(xi, yi + 1, zi + 1), hash3(xi + 1, yi + 1, zi + 1), u), v),
      w);
  }

  // ---- küre ----
  const bufs = {};
  function getBuf(size) {
    if (!bufs[size]) {
      const c = document.createElement('canvas');
      c.width = c.height = size;
      const x = c.getContext('2d');
      bufs[size] = { c, x, img: x.createImageData(size, size) };
    }
    return bufs[size];
  }

  // cam: {right, up, zc}; earth: {axis, spin, eps-taban}
  function earthBasis(axis, ref, spin) {
    // ref: eksene dik referans vektörü (r1); r2 = axis x r1
    const r2 = cross(axis, ref);
    const Ze = vadd(vmul(ref, Math.cos(spin)), vmul(r2, Math.sin(spin)));
    const Xe = cross(axis, Ze);
    return { Xe, Ye: axis, Ze };
  }

  const DEEP = [10, 58, 150], SHALLOW = [34, 130, 214];
  const GREEN = [64, 156, 98], OLIVE = [112, 150, 74], SAND = [214, 178, 108], TUNDRA = [156, 172, 150];

  // ---- önceden hesaplanmış yüzey dokusu (renk + bulut + şehir ışığı + okyanus maskesi) ----
  const TEX = { w: 2048, h: 1024, rgb: null, aux: null };
  function buildTex() {
    const W = TEX.w, H = TEX.h;
    TEX.rgb = new Uint8ClampedArray(W * H * 3);
    TEX.aux = new Uint8ClampedArray(W * H * 2);
    for (let y = 0; y < H; y++) {
      const lat = (0.5 - (y + 0.5) / H) * Math.PI;
      const cl = Math.cos(lat), ey = Math.sin(lat);
      const alat = Math.abs(lat);
      for (let x = 0; x < W; x++) {
        const lon = ((x + 0.5) / W - 0.5) * TAU;
        const ex = cl * Math.sin(lon), ez = cl * Math.cos(lon);
        const land = landAt(lon, lat);
        const n1 = vnoise(ex * 4 + 11, ey * 4 + 7, ez * 4 + 3);
        const n2 = vnoise(ex * 13 + 5, ey * 13 + 9, ez * 13 + 1);
        let r, g, b;
        const shallow = clamp(0.25 + (n1 - 0.5) * 0.9);
        r = lerp(DEEP[0], SHALLOW[0], shallow); g = lerp(DEEP[1], SHALLOW[1], shallow); b = lerp(DEEP[2], SHALLOW[2], shallow);
        if (land > 0.02) {
          const desert = Math.exp(-Math.pow((alat - 0.42) / 0.17, 2)) * sstep(0.38, 0.62, n1);
          const tund = sstep(0.95, 1.2, alat);
          const mix = sstep(0.3, 0.9, alat) * 0.8 + n2 * 0.25;
          let lr = lerp(GREEN[0], OLIVE[0], mix), lg = lerp(GREEN[1], OLIVE[1], mix), lb = lerp(GREEN[2], OLIVE[2], mix);
          lr = lerp(lr, SAND[0], desert); lg = lerp(lg, SAND[1], desert); lb = lerp(lb, SAND[2], desert);
          lr = lerp(lr, TUNDRA[0], tund); lg = lerp(lg, TUNDRA[1], tund); lb = lerp(lb, TUNDRA[2], tund);
          const k = clamp(land * 1.4 - 0.2);
          r = lerp(r, lr, k); g = lerp(g, lg, k); b = lerp(b, lb, k);
        }
        const ice = sstep(1.22 + (n1 - 0.5) * 0.12, 1.34 + (n1 - 0.5) * 0.12, alat);
        r = lerp(r, 240, ice); g = lerp(g, 246, ice); b = lerp(b, 252, ice);
        const cn = vnoise(ex * 5.5 + 40, ey * 9 + 20, ez * 5.5 + 60) * 0.55 + vnoise(ex * 14 + 10, ey * 20 + 30, ez * 14 + 2) * 0.45;
        const cl2 = sstep(0.6, 0.82, cn) * 0.62;
        r = lerp(r, 250, cl2); g = lerp(g, 252, cl2); b = lerp(b, 255, cl2);
        const i = y * W + x;
        TEX.rgb[i * 3] = r; TEX.rgb[i * 3 + 1] = g; TEX.rgb[i * 3 + 2] = b;
        TEX.aux[i * 2] = (1 - land) * (1 - cl2) * 255;
        let lights = 0;
        if (land > 0.5 && n2 > 0.7 && alat < 1.15 && cl2 < 0.3) lights = (n2 - 0.7) * 3.3 * (1 - cl2);
        TEX.aux[i * 2 + 1] = clamp(lights) * 255;
      }
    }
  }

  /**
   * o: { cam:{right,up,zc}, basis:{Xe,Ye,Ze}, sun:[x,y,z] (dünyadan güneşe birim) }
   */
  function renderGlobe(ctx, cx, cy, R, o) {
    if (!TEX.rgb) buildTex();
    const pad = 2;
    const size = Math.ceil(R * 2) + pad * 2;
    const B = getBuf(size);
    const data = B.img.data;
    const { right, up, zc } = o.cam;
    const { Xe, Ye, Ze } = o.basis;
    const sun = o.sun;
    const hv = norm(vadd(sun, zc));
    const TW = TEX.w, TH = TEX.h, RGB = TEX.rgb, AUX = TEX.aux;
    const c0 = size / 2;
    let p = 0;
    for (let j = 0; j < size; j++) {
      const v = -((j + 0.5) - c0) / R;
      for (let i = 0; i < size; i++, p += 4) {
        const u = ((i + 0.5) - c0) / R;
        const rr = u * u + v * v;
        const rad = Math.sqrt(rr);
        const aEdge = clamp((1 - rad) * R + 0.5);
        if (aEdge <= 0) { data[p + 3] = 0; continue; }
        const z = Math.sqrt(Math.max(0, 1 - rr));
        const nx = u * right[0] + v * up[0] + z * zc[0];
        const ny = u * right[1] + v * up[1] + z * zc[1];
        const nz = u * right[2] + v * up[2] + z * zc[2];
        const ex = nx * Xe[0] + ny * Xe[1] + nz * Xe[2];
        const ey = nx * Ye[0] + ny * Ye[1] + nz * Ye[2];
        const ez = nx * Ze[0] + ny * Ze[1] + nz * Ze[2];
        const lon = Math.atan2(ex, ez);
        const lat = Math.asin(ey > 1 ? 1 : ey < -1 ? -1 : ey);
        // çift doğrusal doku örnekleme
        const fx = (lon / TAU + 0.5) * TW - 0.5, fy = (0.5 - lat / Math.PI) * TH - 0.5;
        const x0 = Math.floor(fx), y0 = Math.floor(fy);
        const tx = fx - x0, ty = fy - y0;
        const xa = ((x0 % TW) + TW) % TW, xb = xa + 1 === TW ? 0 : xa + 1;
        const ya = y0 < 0 ? 0 : y0 >= TH ? TH - 1 : y0, yb = y0 + 1 < 0 ? 0 : y0 + 1 >= TH ? TH - 1 : y0 + 1;
        const i00 = (ya * TW + xa), i10 = (ya * TW + xb), i01 = (yb * TW + xa), i11 = (yb * TW + xb);
        const w00 = (1 - tx) * (1 - ty), w10 = tx * (1 - ty), w01 = (1 - tx) * ty, w11 = tx * ty;
        const r = RGB[i00 * 3] * w00 + RGB[i10 * 3] * w10 + RGB[i01 * 3] * w01 + RGB[i11 * 3] * w11;
        const g = RGB[i00 * 3 + 1] * w00 + RGB[i10 * 3 + 1] * w10 + RGB[i01 * 3 + 1] * w01 + RGB[i11 * 3 + 1] * w11;
        const b = RGB[i00 * 3 + 2] * w00 + RGB[i10 * 3 + 2] * w10 + RGB[i01 * 3 + 2] * w01 + RGB[i11 * 3 + 2] * w11;
        const specM = (AUX[i00 * 2] * w00 + AUX[i10 * 2] * w10 + AUX[i01 * 2] * w01 + AUX[i11 * 2] * w11) / 255;
        const lights = (AUX[i00 * 2 + 1] * w00 + AUX[i10 * 2 + 1] * w10 + AUX[i01 * 2 + 1] * w01 + AUX[i11 * 2 + 1] * w11) / 255;
        // ışık
        const ndl = nx * sun[0] + ny * sun[1] + nz * sun[2];
        const day = sstep(-0.1, 0.14, ndl);
        const sh = ndl > 0 ? ndl : 0;
        const lit = 0.16 + 0.98 * Math.pow(sh, 0.75);
        let dr = r * lit, dg = g * lit, db = b * lit;
        const dn = (ndl - 0.03) / 0.09;
        const tw = (dn > -3.2 && dn < 3.2) ? Math.exp(-dn * dn) * 0.55 : 0;
        dr += 255 * tw * 0.55; dg += 120 * tw * 0.4; db += 40 * tw * 0.25;
        const hd = nx * hv[0] + ny * hv[1] + nz * hv[2];
        const spec = hd > 0.9 ? Math.pow(hd, 90) * 0.42 * specM * day : 0;
        dr += 255 * spec; dg += 240 * spec; db += 220 * spec;
        let nr = r * 0.045 + 5, ng = g * 0.05 + 9, nb = b * 0.08 + 26;
        nr += 255 * lights * 0.9; ng += 190 * lights * 0.9; nb += 100 * lights * 0.8;
        let fr = lerp(nr, dr, day), fg = lerp(ng, dg, day), fb = lerp(nb, db, day);
        const f1 = 1 - z, fres = f1 * f1 * Math.sqrt(f1);
        const atm = fres * (0.2 + 0.8 * clamp(ndl * 1.6 + 0.25));
        fr += 99 * atm; fg += 187 * atm; fb += 280 * atm;
        data[p] = fr > 255 ? 255 : fr; data[p + 1] = fg > 255 ? 255 : fg; data[p + 2] = fb > 255 ? 255 : fb;
        data[p + 3] = aEdge * 255;
      }
    }
    B.x.putImageData(B.img, 0, 0);
    ctx.drawImage(B.c, cx - size / 2, cy - size / 2);
  }

  // yumuşak atmosfer halesi
  function halo(ctx, cx, cy, R, alpha = 1, color = '90,170,255') {
    const g = ctx.createRadialGradient(cx, cy, R * 0.96, cx, cy, R * 1.28);
    g.addColorStop(0, `rgba(${color},${0.32 * alpha})`);
    g.addColorStop(0.35, `rgba(${color},${0.10 * alpha})`);
    g.addColorStop(1, `rgba(${color},0)`);
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(cx, cy, R * 1.28, 0, TAU); ctx.fill();
  }

  // kamera: yükseklik açısı e (dünya y yukarı, z izleyiciye)
  function camera(e) {
    return { right: [1, 0, 0], up: [0, Math.cos(e), -Math.sin(e)], zc: [0, Math.sin(e), Math.cos(e)] };
  }
  // eksen: y'den ε kadar h0 yönüne yatık
  function axisFor(eps, h0) {
    const a = norm(vadd(vmul([0, 1, 0], Math.cos(eps)), vmul(h0, Math.sin(eps))));
    const ref = vadd(vmul(h0, Math.cos(eps)), vmul([0, 1, 0], -Math.sin(eps)));
    return { a, ref };
  }

  window.E = { TAU, D2R, clamp, lerp, smooth, easeOut, easeInOut, easeOutBack, sstep, kf, dot, cross, norm, vadd, vmul, initLand, buildTex, renderGlobe, halo, camera, axisFor, earthBasis, vnoise, hash3 };
})();
