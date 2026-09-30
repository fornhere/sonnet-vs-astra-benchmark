// lat/lon -> Manhattan ızgara uzayı (metre). Caddeler (avenue) ekseni yukarı (kuzey) bakar.
export const LAT0 = 40.7033, LON0 = -74.0170; // Battery
const KLAT = 111200, KLON = 111320 * Math.cos(LAT0 * Math.PI / 180);
const A = 29 * Math.PI / 180;
export function ll2uv(lat, lon) {
  const e = (lon - LON0) * KLON, n = (lat - LAT0) * KLAT;
  const v = e * Math.sin(A) + n * Math.cos(A);
  const u = e * Math.cos(A) - n * Math.sin(A);
  return [u, v]; // metre; u doğu(sağ), v kuzey(yukarı)
}

// ---- Izgara tanımı (bake + çalışma zamanı ortak) ----
export const CELL = 22;                 // metre / voxel (yatay)
export const U0 = -2500, U1 = 2400;     // ızgara uzayı sınırları (m)
export const V0 = -3300, V1 = 12200;
export const W = Math.round((U1 - U0) / CELL);
export const H = Math.round((V1 - V0) / CELL); // r=0 en kuzey satır
export const toCell = (u, v) => [(u - U0) / CELL, (V1 - v) / CELL];
export const llToCell = (lat, lon) => { const [u, v] = ll2uv(lat, lon); return toCell(u, v); };
