// Kayalık adacığın planı: gemi burnu gibi sivri (lodosa dönük) bir taş kütle.
// Aynı plan geometri, deniz köpüğü SDF'i ve sıçrama noktaları için kullanılır.
import * as THREE from 'three';
import { fbm2, clamp } from './util/rng.js';

export const ISLET = {
  center: new THREE.Vector2(-3.5, 3.5),
  bow: new THREE.Vector2(-0.7071, 0.7071), // yerel +a (burun, güneybatı)
  lat: new THREE.Vector2(0.7071, 0.7071),  // yerel +l
  A: 20.5,
  B: 8.8,
  N: 128,
  rockScaleAtWater: 1.05,
};

export function localToWorld(a, l, out = new THREE.Vector2()) {
  out.x = ISLET.center.x + ISLET.bow.x * a + ISLET.lat.x * l;
  out.y = ISLET.center.y + ISLET.bow.y * a + ISLET.lat.y * l;
  return out;
}

export function footprintLocal(phi, scale = 1) {
  const c = Math.cos(phi), s = Math.sin(phi);
  const a = ISLET.A * (c >= 0 ? c : 0.8 * c);
  const l = ISLET.B * s * (c > 0 ? 1 - 0.55 * c * c : 1);
  return [a * scale, l * scale];
}

// Dünya koordinatında çevre noktaları (kapalı çokgen; son nokta tekrar edilmez)
export function footprintPoints(scale = 1, n = ISLET.N) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const [a, l] = footprintLocal((i / n) * Math.PI * 2, scale);
    pts.push(localToWorld(a, l));
  }
  return pts;
}

function outwardNormals2D(pts) {
  const n = pts.length, out = [];
  for (let i = 0; i < n; i++) {
    const p = pts[(i - 1 + n) % n], q = pts[(i + 1) % n];
    // çokgen yönü: yerel (a,l) açısı artışı -> dünya yönünde saat yönü işaretine göre
    let tx = q.x - p.x, tz = q.y - p.y;
    const len = Math.hypot(tx, tz) || 1; tx /= len; tz /= len;
    out.push(new THREE.Vector2(tz, -tx));
  }
  // yönü merkezden dışarı bakacak şekilde düzelt
  let dot = 0;
  for (let i = 0; i < n; i++) {
    dot += out[i].x * (pts[i].x - ISLET.center.x) + out[i].y * (pts[i].y - ISLET.center.y);
  }
  if (dot < 0) out.forEach((v) => v.multiplyScalar(-1));
  return out;
}

/**
 * Kenar halkası üzerinde kabuk üretir. levels: [{y, scale, jitter(k, y)->radial offset (m), jy}]
 * u = yay uzunluğu / texScale, v = yükseklik / texScale
 */
export function ringShell(levels, texScale = 4, n = ISLET.N, opts = {}) {
  const base = footprintPoints(1, n);
  const nrm = outwardNormals2D(base);
  const cols = n + 1;
  const pos = new Float32Array(levels.length * cols * 3);
  const uv = new Float32Array(levels.length * cols * 2);
  // yay uzunluğu
  const arc = [0];
  for (let i = 1; i <= n; i++) arc.push(arc[i - 1] + base[i % n].distanceTo(base[i - 1]));
  for (let j = 0; j < levels.length; j++) {
    const L = levels[j];
    for (let i = 0; i < cols; i++) {
      const k = i % n;
      const bx = base[k].x - ISLET.center.x, bz = base[k].y - ISLET.center.y;
      const off = L.jitter ? L.jitter(k, i) : 0;
      const x = ISLET.center.x + bx * L.scale + nrm[k].x * off;
      const z = ISLET.center.y + bz * L.scale + nrm[k].y * off;
      const o = (j * cols + i) * 3;
      pos[o] = x; pos[o + 1] = L.y + (L.jy ? L.jy(k, i) : 0); pos[o + 2] = z;
      const uo = (j * cols + i) * 2;
      uv[uo] = arc[i] / texScale; uv[uo + 1] = L.y / texScale;
    }
  }
  const idx = [];
  for (let j = 0; j < levels.length - 1; j++) {
    for (let i = 0; i < n; i++) {
      const a = j * cols + i, b = a + 1, c = a + cols, d = c + 1;
      if (opts.flip) idx.push(a, b, c, b, d, c); else idx.push(a, c, b, b, c, d);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  // dikişte normalleri eşle
  const nn = g.attributes.normal;
  for (let j = 0; j < levels.length; j++) {
    const a = j * cols, b = j * cols + n;
    const x = nn.getX(a) + nn.getX(b), y = nn.getY(a) + nn.getY(b), z = nn.getZ(a) + nn.getZ(b);
    const l = Math.hypot(x, y, z) || 1;
    nn.setXYZ(a, x / l, y / l, z / l); nn.setXYZ(b, x / l, y / l, z / l);
  }
  return g;
}

// Çokgenin iç dolgusu (teras zemini)
export function platformGeometry(scale, y, texScale = 3) {
  const pts = footprintPoints(scale);
  const shape = new THREE.Shape(pts.map((p) => new THREE.Vector2(p.x, -p.y)));
  const g = new THREE.ShapeGeometry(shape, 1);
  g.rotateX(-Math.PI / 2);
  g.translate(0, y, 0);
  // Shape (x,-z) -> rotateX(-90) -> (x, 0, z): doğru; UV dünya koordinatından
  const p = g.attributes.position, uv = g.attributes.uv;
  for (let i = 0; i < p.count; i++) uv.setXY(i, p.getX(i) / texScale, p.getZ(i) / texScale);
  g.computeVertexNormals();
  return g;
}

// İşaretli mesafe alanı (m): dışarı pozitif. Deniz köpüğü ve dalga tırmanması için.
export function bakeSDF(res = 192, half = 46) {
  const pts = footprintPoints(ISLET.rockScaleAtWater, 96);
  const n = pts.length;
  const data = new Uint16Array(res * res);
  const toHalf = THREE.DataUtils.toHalfFloat;
  for (let j = 0; j < res; j++) {
    for (let i = 0; i < res; i++) {
      const x = ISLET.center.x + ((i + 0.5) / res * 2 - 1) * half;
      const z = ISLET.center.y + ((j + 0.5) / res * 2 - 1) * half;
      let dmin = 1e9, inside = false;
      for (let k = 0, m = n - 1; k < n; m = k++) {
        const ax = pts[k].x, az = pts[k].y, bx = pts[m].x, bz = pts[m].y;
        if ((az > z) !== (bz > z) && x < ((bx - ax) * (z - az)) / (bz - az) + ax) inside = !inside;
        const ex = bx - ax, ez = bz - az;
        const t = clamp(((x - ax) * ex + (z - az) * ez) / (ex * ex + ez * ez), 0, 1);
        const dx = x - (ax + ex * t), dz = z - (az + ez * t);
        const d = dx * dx + dz * dz;
        if (d < dmin) dmin = d;
      }
      const s = Math.sqrt(dmin) * (inside ? -1 : 1);
      data[j * res + i] = toHalf(s);
    }
  }
  const tex = new THREE.DataTexture(data, res, res, THREE.RedFormat, THREE.HalfFloatType);
  tex.minFilter = tex.magFilter = THREE.LinearFilter;
  tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.needsUpdate = true;
  return { tex, half, center: ISLET.center.clone() };
}

export function rockJitter(seed = 3, amp = 1.0) {
  return (k, i) => (fbm2(k * 0.21 + seed, seed * 3.7, 4, seed) - 0.5) * 2.4 * amp
    + (fbm2(k * 0.9, seed, 2, seed + 1) - 0.5) * 0.9 * amp;
}
