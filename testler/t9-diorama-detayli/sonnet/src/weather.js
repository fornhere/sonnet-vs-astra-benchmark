// Hava durumu: açık / sisli / karlı (voxel kar taneleri + zemin/çatı kar örtüsü)
import * as THREE from 'three';
import { U } from './materials.js';
import { W, H } from './geo.js';
import { mulberry32, SEED } from './rng.js';

export class Weather {
  constructor(lighting, quality) {
    this.lighting = lighting; this.mode = 'clear'; this.target = { fog: 0, snow: 0 }; this.snowCover = 0;
    this.count = quality === 'low' ? 1000 : 1800;
    const geo = new THREE.BoxGeometry(1, 1, 1);
    this.mat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.92, fog: true });
    this.mesh = new THREE.InstancedMesh(geo, this.mat, this.count); this.mesh.frustumCulled = false; this.mesh.visible = false; this.mesh.name = 'snow'; this.mesh.userData.noAO = true;
    const r = mulberry32(SEED + 4242); this.p = new Float32Array(this.count * 4);
    for (let i = 0; i < this.count; i++) { this.p[i * 4] = r(); this.p[i * 4 + 1] = r(); this.p[i * 4 + 2] = r(); this.p[i * 4 + 3] = r(); }
    this.m = new THREE.Matrix4(); this.faces = this.count * 5;
  }
  set(mode) { this.mode = mode; this.target.fog = mode === 'fog' ? 1 : 0; this.target.snow = mode === 'snow' ? 1 : 0; }
  update(dt, t, camTarget, rad) {
    const wk = this.lighting.weatherK; let ch = false;
    for (const k of ['fog', 'snow']) { const d = this.target[k] - wk[k]; if (Math.abs(d) > 0.001) { wk[k] += Math.sign(d) * Math.min(Math.abs(d), dt * 0.7); ch = true; } }
    const cover = this.mode === 'snow' ? 1 : 0; this.snowCover += (cover - this.snowCover) * Math.min(1, dt * (cover ? 0.35 : 0.5)); U.uSnow.value = this.snowCover < 0.01 ? 0 : this.snowCover;
    if (ch) this.lighting.apply();
    const on = wk.snow > 0.02; this.mesh.visible = on; if (!on) return;
    const S = Math.min(460, Math.max(90, rad * 0.5)); const h = S * 0.55; const sz = S * 0.0022 + 0.06;
    const m = this.m, q = new THREE.Quaternion(), pos = new THREE.Vector3(), sc = new THREE.Vector3(sz, sz, sz);
    const cx = camTarget.x, cz = camTarget.z, cy = Math.max(6, h * 0.5);
    for (let i = 0; i < this.count; i++) {
      const a = this.p[i * 4], b = this.p[i * 4 + 1], c = this.p[i * 4 + 2], d = this.p[i * 4 + 3];
      const fall = 0.05 + d * 0.06; const yy = ((b - t * fall * (S / 60) * 0.35) % 1 + 1) % 1;
      const x = cx + (((a + Math.sin(t * 0.6 + d * 9) * 0.01 * (S / 100)) % 1 + 1) % 1 - 0.5) * S + Math.sin(t * 0.9 + d * 20 + yy * 6) * sz * 2.5;
      const z = cz + (c - 0.5) * S + Math.cos(t * 0.8 + d * 15 + yy * 5) * sz * 2.5;
      pos.set(x, yy * h + 0.4, z); m.compose(pos, q, sc); this.mesh.setMatrixAt(i, m);
    }
    this.mesh.instanceMatrix.needsUpdate = true; this.mat.opacity = 0.55 + 0.4 * wk.snow;
  }
}
