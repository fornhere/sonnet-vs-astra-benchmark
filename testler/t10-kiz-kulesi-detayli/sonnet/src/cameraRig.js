// 60 sn'lik kusursuz döngü sinematik kamera + serbest (OrbitControls) mod.
// Anahtar kareler arası Hermite (Catmull-Rom teğetli, periyodik) -> hız sürekliliği, döngüde kesik yok.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { LOOP } from './config.js';
import { heightAt } from './waves.js';
import { state } from './state.js';

const P = (x, y, z) => new THREE.Vector3(x, y, z);
const polar = (R, deg, y) => P(R * Math.cos(THREE.MathUtils.degToRad(deg)), y, R * Math.sin(THREE.MathUtils.degToRad(deg)));

// t, konum, hedef, fov, bölüm adı
export const KEYS = [
  { t: 0,    pos: P(-262, 31, 84),   tgt: P(-6, 17.5, -8),  fov: 32, name: 'I · Uzak plan' },
  { t: 7,    pos: P(-246, 27, 70),   tgt: P(-4, 17, -6),    fov: 31 },
  { t: 13.5, pos: P(-190, 15, 62),   tgt: P(-2, 14.5, -3),  fov: 33 },
  { t: 18,   pos: P(-108, 4.2, 54),  tgt: P(0, 10, -2),     fov: 40, name: 'II · Dalga seviyesi' },
  { t: 23,   pos: P(-88, 2.4, 6),    tgt: P(0, 9, -1),      fov: 42 },
  { t: 27,   pos: P(-72, 3.4, -46),  tgt: P(0, 10, 0),      fov: 42 },
  { t: 31,   pos: polar(66, -112, 9), tgt: P(0, 13, 0),     fov: 42, name: 'III · Kulenin çevresi' },
  { t: 35.5, pos: polar(58, -52, 14), tgt: P(0, 15, 0),     fov: 42 },
  { t: 40,   pos: polar(46, 8, 18),   tgt: P(0, 17, 0),   fov: 40 },
  { t: 43.5, pos: polar(23, 42, 22.5), tgt: P(0, 20.6, 0),  fov: 38, name: 'IV · Fener odası' },
  { t: 48,   pos: polar(15.5, 88, 24), tgt: P(0, 21.0, 0),  fov: 34 },
  { t: 53,   pos: P(-60, 30, 120),   tgt: P(0, 20, 0),      fov: 34 },
  { t: 57.5, pos: P(-230, 33, 100),  tgt: P(-9, 18, -8),    fov: 32.5 },
];

const N = KEYS.length;
// t_i / tekrar: son anahtar 60'tan önce; 60'da KEYS[0] tekrar eder
function seg(i) { return KEYS[((i % N) + N) % N]; }
function tOf(i) { return KEYS[((i % N) + N) % N].t + Math.floor(i / N) * LOOP; }

function hermite(p0, m0, p1, m1, dt, s, out) {
  const s2 = s * s, s3 = s2 * s;
  const h00 = 2 * s3 - 3 * s2 + 1, h10 = s3 - 2 * s2 + s, h01 = -2 * s3 + 3 * s2, h11 = s3 - s2;
  return out.set(
    h00 * p0.x + h10 * dt * m0.x + h01 * p1.x + h11 * dt * m1.x,
    h00 * p0.y + h10 * dt * m0.y + h01 * p1.y + h11 * dt * m1.y,
    h00 * p0.z + h10 * dt * m0.z + h01 * p1.z + h11 * dt * m1.z);
}

const _m0 = new THREE.Vector3(), _m1 = new THREE.Vector3();
function tangent(field, i, out) {
  const a = seg(i - 1)[field], b = seg(i + 1)[field];
  const dt = tOf(i + 1) - tOf(i - 1);
  return out.copy(b).sub(a).divideScalar(dt);
}

export function sampleCinematic(time, outPos, outTgt) {
  const t = ((time % LOOP) + LOOP) % LOOP;
  // bölümü bul
  let i = 0;
  for (let k = 0; k < N; k++) if (t >= KEYS[k].t) i = k;
  const t0 = tOf(i), t1 = tOf(i + 1);
  const dt = t1 - t0;
  const s = (t - t0) / dt;
  const A = seg(i), B = seg(i + 1);
  // konum
  tangent('pos', i, _m0); tangent('pos', i + 1, _m1);
  hermite(A.pos, _m0, B.pos, _m1, dt, s, outPos);
  tangent('tgt', i, _m0); tangent('tgt', i + 1, _m1);
  hermite(A.tgt, _m0, B.tgt, _m1, dt, s, outTgt);
  const fov = THREE.MathUtils.lerp(A.fov, B.fov, s * s * (3 - 2 * s));
  // bölüm başlığı
  let name = '';
  for (let k = 0; k < N; k++) if (KEYS[k].name && t >= KEYS[k].t) name = KEYS[k].name;
  return { fov, name };
}

const TAU = Math.PI * 2;
export class CameraRig {
  constructor(camera, dom) {
    this.camera = camera;
    this.dom = dom;
    this.pos = new THREE.Vector3();
    this.tgt = new THREE.Vector3();
    this.controls = new OrbitControls(camera, dom);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.07;
    this.controls.minDistance = 4;
    this.controls.maxDistance = 900;
    this.controls.maxPolarAngle = Math.PI * 0.497;
    this.controls.zoomSpeed = 0.9;
    this.controls.enabled = false;
    this.blend = 1;          // 1: sinematik tam
    this.blendFrom = { pos: new THREE.Vector3(), tgt: new THREE.Vector3(), fov: 35 };
    this.shakeSeed = 0;
    this.fov = 34;
    this.chapter = '';
    this.up = new THREE.Vector3(0, 1, 0);
    this._look = new THREE.Vector3();
    this._t = new THREE.Vector3(); this._r = new THREE.Vector3(); this._u = new THREE.Vector3(); this._lp = new THREE.Vector3();
    this._roll = 0;

    // kullanıcı fareyle sürükleyince serbest moda geç
    dom.addEventListener('pointerdown', () => { if (state.camMode === 'cinematic') this.setMode('free'); });
    dom.addEventListener('wheel', () => { if (state.camMode === 'cinematic') this.setMode('free'); }, { passive: true });
    if (state.camMode === 'free') this.setMode('free', true);
  }

  setMode(mode, initial = false) {
    if (mode === state.camMode && !initial) return;
    state.camMode = mode;
    if (mode === 'free') {
      // mevcut sinematik pozdan başla
      this.controls.enabled = true;
      const tg = new THREE.Vector3();
      sampleCinematic(state.camTime, this.pos, tg);
      // hedefi kuleye yakın tut
      this.controls.target.copy(tg);
      this.controls.update();
    } else {
      this.controls.enabled = false;
      // serbest pozdan sinematiğe yumuşak geçiş
      this.blend = 0;
      this.blendFrom.pos.copy(this.camera.position);
      this.blendFrom.tgt.copy(this.controls.target);
      this.blendFrom.fov = this.camera.fov;
    }
  }

  update(dt, time) {
    if (!state.camHold) state.camTime += dt;
    if (state.camMode === 'free') {
      this.controls.update();
      const cam = this.camera;
      const h = heightAt(cam.position.x, cam.position.z, time) + 0.9;
      if (cam.position.y < h) cam.position.y = h;
      this.chapter = 'Serbest kamera';
      return;
    }
    const t = state.camTime;
    const meta = sampleCinematic(t, this.pos, this.tgt);
    this.chapter = meta.name;
    const cam = this.camera;
    const storm = state.stormSmooth;
    // el kamerası titreşimi (60 sn'de tamsayı döngüsü -> dikişsiz)
    const w = t / LOOP * TAU;
    const amp = 0.0009 + 0.0022 * storm;
    const yawJ = amp * (Math.sin(w * 23) * 0.6 + Math.sin(w * 41 + 1.3) * 0.4 + Math.sin(w * 7) * 0.8);
    const pitJ = amp * (Math.sin(w * 29 + 0.7) * 0.6 + Math.sin(w * 53) * 0.4 + Math.sin(w * 11 + 2) * 0.8);
    // konum: dalga seviyesinde dalgayla birlikte hafif yükselip alçal
    const p = this.pos;
    let y = p.y;
    if (y < 14) {
      const hw = heightAt(p.x, p.z, time);
      y = Math.max(y + hw * 0.4, hw + 0.9);
    }
    const target = this._t.copy(this.tgt);
    let px = p.x, py = y, pz = p.z, fov = meta.fov;
    // serbestten dönüş harmanı
    if (this.blend < 1) {
      this.blend = Math.min(1, this.blend + dt / 1.8);
      const e = this.blend * this.blend * (3 - 2 * this.blend);
      px = THREE.MathUtils.lerp(this.blendFrom.pos.x, px, e); py = THREE.MathUtils.lerp(this.blendFrom.pos.y, py, e); pz = THREE.MathUtils.lerp(this.blendFrom.pos.z, pz, e);
      target.lerpVectors(this.blendFrom.tgt, target, e);
      fov = THREE.MathUtils.lerp(this.blendFrom.fov, fov, e);
    }
    cam.position.set(px, py, pz);
    const dir = target.sub(cam.position);
    const dl = dir.length();
    dir.divideScalar(dl);
    // titreşim uygula (yön vektörünü döndür)
    const right = this._r.crossVectors(dir, this.up).normalize();
    const upv = this._u.crossVectors(right, dir);
    dir.addScaledVector(right, yawJ).addScaledVector(upv, pitJ).normalize();
    cam.up.set(0, 1, 0);
    cam.lookAt(this._lp.copy(cam.position).add(dir));
    // dalga seviyesinde hafif yalpa (roll)
    const lowness = Math.max(0, 1 - y / 12);
    const roll = (Math.sin(t * 0.9) * 0.012 + Math.sin(t * 0.37 + 1) * 0.02) * lowness * (0.4 + storm);
    cam.rotateZ(roll);
    if (Math.abs(cam.fov - fov) > 1e-3) { cam.fov = fov; cam.updateProjectionMatrix(); }
  }
}
