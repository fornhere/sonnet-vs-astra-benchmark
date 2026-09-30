// Çalışma zamanı veri: bake edilmiş OSM/NYC rasterleri + türev alanlar
import bin from './data/world.bin';
import meta from './data/meta.json';
import { W, H, llToCell } from './geo.js';

export const D = 10;           // kaide kesitinin derinliği (voxel); dünya y = yi - D
export const GROUND = 1;       // kara yüzey üst y'si; deniz y=0
const N = W * H;

export function loadWorld() {
  const b = bin instanceof Uint8Array ? bin : new Uint8Array(bin);
  const land = b.subarray(0, N), road = b.subarray(N, 2 * N), bh = b.subarray(2 * N, 3 * N), park = b.subarray(3 * N, 4 * N);
  // kıyıdan uzaklık (su hücreleri için, 8-komşu BFS) ve sudan uzaklık (kara için)
  const wdist = new Uint8Array(N).fill(255), ldist = new Uint8Array(N).fill(255);
  bfs(land, 1, wdist);   // karaya uzaklık — su hücrelerinde
  bfs(land, 0, ldist);   // suya uzaklık — kara hücrelerinde
  // Manhattan kara bileşeni (Empire State hücresinden 4-komşu yayılım; iskeleler dahil)
  const isMan = new Uint8Array(N);
  { const [ex, ey] = llToCell(40.7484, -73.9857).map(Math.floor); const st = [ey * W + ex];
    while (st.length) { const i = st.pop(); if (i < 0 || i >= N || isMan[i] || !land[i]) continue; isMan[i] = 1; const x = i % W; if (x > 0) st.push(i - 1); if (x < W - 1) st.push(i + 1); st.push(i - W); st.push(i + W); } }
  return { W, H, N, land, road, bh, park, wdist, ldist, meta, isMan, clear: new Uint8Array(N) };
}
// hedef=1: kara hücrelerinden başla ve su hücrelerinin uzaklığını yaz
function bfs(land, src, out) {
  const q = new Int32Array(W * H); let qh = 0, qt = 0;
  for (let i = 0; i < W * H; i++) if (land[i] === src) { out[i] = 0; q[qt++] = i; }
  while (qh < qt) {
    const i = q[qh++]; const x = i % W, y = (i / W) | 0; const d = out[i] + 1; if (d > 254) continue;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      if (!dx && !dy) continue; const X = x + dx, Y = y + dy; if (X < 0 || Y < 0 || X >= W || Y >= H) continue;
      const j = Y * W + X; if (out[j] > d) { out[j] = d; q[qt++] = j; }
    }
  }
}
