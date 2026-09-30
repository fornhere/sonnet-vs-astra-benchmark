// Ortak koordinat çerçevesi: lon/lat -> Manhattan ızgarası (n: kuzey ekseni, e: doğu ekseni), metre cinsinden
export const LON0 = -74.0170, LAT0 = 40.7033;       // Battery
export const ANG = 28.86 * Math.PI / 180;
const MX = 111320 * Math.cos(LAT0 * Math.PI / 180), MY = 110950;
export const V = 15.98;
export const E0 = -3900, N0 = -2761.6;
export const W = 408, D = 944;                      // ızgara boyutu (voxel)
export function toNE(lon, lat) {
  const x = (lon - LON0) * MX, y = (lat - LAT0) * MY;
  return [x * Math.cos(ANG) - y * Math.sin(ANG), x * Math.sin(ANG) + y * Math.cos(ANG)]; // [e, n]
}
export function toVox(lon, lat) {
  const [e, n] = toNE(lon, lat);
  return [(e - E0) / V, (n - N0) / V];   // [fx (batı->doğu), fn (güney->kuzey)]
}
export function fromNE(e, n) {
  const x = e * Math.cos(ANG) + n * Math.sin(ANG), y = -e * Math.sin(ANG) + n * Math.cos(ANG);
  return [LON0 + x / MX, LAT0 + y / MY];
}
export function corners(pad = 200) {
  const e1 = E0 + W * V, n1 = N0 + D * V;
  return [[E0 - pad, N0 - pad], [e1 + pad, N0 - pad], [e1 + pad, n1 + pad], [E0 - pad, n1 + pad]].map(([e, n]) => fromNE(e, n));
}
