import * as THREE from 'three';
import data from './statueData.js';

async function gunzip(b64) {
  const bin = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
  const ds = new DecompressionStream('gzip');
  const stream = new Blob([bin]).stream().pipeThrough(ds);
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

export async function loadStatueGeometries() {
  const u8 = await gunzip(data);
  const buf = u8.buffer.slice(u8.byteOffset, u8.byteOffset + u8.byteLength);
  const dv = new DataView(buf);
  let off = 0;
  const count = dv.getUint32(off, true); off += 4;
  const out = [];
  for (let m = 0; m < count; m++) {
    const n = dv.getUint32(off, true), ni = dv.getUint32(off + 4, true);
    const mn = [0, 1, 2].map((i) => dv.getFloat32(off + 8 + 4 * i, true));
    const mx = [0, 1, 2].map((i) => dv.getFloat32(off + 20 + 4 * i, true));
    off += 32;
    const pos16 = new Uint16Array(buf, off, n * 3); off += n * 6;
    const nr8 = new Int8Array(buf, off, n * 3); off += n * 3;
    off += (4 - ((n * 9) % 4)) % 4;
    const idx = new Uint32Array(buf, off, ni); off += ni * 4;
    const pos = new Float32Array(n * 3), nrm = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) for (let a = 0; a < 3; a++) {
      pos[3 * i + a] = mn[a] + (pos16[3 * i + a] / 65535) * (mx[a] - mn[a]);
      nrm[3 * i + a] = nr8[3 * i + a] / 127;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('normal', new THREE.BufferAttribute(nrm, 3));
    g.setIndex(new THREE.BufferAttribute(idx.slice(), 1));
    g.computeBoundingSphere(); g.computeBoundingBox();
    out.push(g);
  }
  return out;
}
