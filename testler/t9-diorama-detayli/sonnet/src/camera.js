// Orbit kamera: sürükle=döndür, sağ tuş/Shift=kaydır, tekerlek=yakınlaş; sınırlı; yumuşak uçuş; boşta sinematik tur.
import * as THREE from 'three';
import { W, H } from './geo.js';

const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const wrapPI = (a) => { while (a > Math.PI) a -= 2 * Math.PI; while (a < -Math.PI) a += 2 * Math.PI; return a; };

export const OVERVIEW = { tx: W * 0.5, ty: 6, tz: H * 0.535, az: -0.7, pol: 1.16, rad: 800 };

export class CameraRig {
  constructor(camera, dom) {
    this.camera = camera; this.dom = dom;
    this.cur = { ...OVERVIEW }; this.goal = { ...OVERVIEW };
    this.flight = null; this.tour = null; this.idle = 0; this.idleLimit = 20; this.tourOn = true;
    this.onInput = null; this.onTourChange = null; this.tourPoses = [];
    this.limits = { radMin: 7, radMax: 1500, polMin: 0.08, polMax: 1.5 };
    this._drag = null; this._pinch = null;
    const el = dom;
    el.addEventListener('contextmenu', (e) => e.preventDefault());
    el.addEventListener('pointerdown', (e) => this._down(e));
    window.addEventListener('pointermove', (e) => this._move(e));
    window.addEventListener('pointerup', (e) => this._up(e));
    el.addEventListener('wheel', (e) => { e.preventDefault(); this.goal = this.flight ? { ...this.cur } : this.goal; this.input(); this.goal.rad *= Math.exp(e.deltaY * 0.0012); this.clamp(this.goal); }, { passive: false });
    this.apply();
  }
  // touch: yalnızca boşta sayacını sıfırlar ve turu durdurur; input: uçuşu da iptal eder (sürükleme/tekerlek)
  touch() { this.idle = 0; if (this.tour) this.stopTour(); }
  stopTour() { if (this.tour) { this.tour = null; this.flight = null; this.goal = { ...this.cur }; this.onTourChange?.(false); } }
  input() { this.idle = 0; if (this.tour) { this.stopTour(); } else if (this.flight) { this.flight = null; this.goal = { ...this.cur }; } this.onInput?.(); }
  _down(e) {
    if (e.target !== this.dom) return;
    this.input(); this.dom.setPointerCapture?.(e.pointerId);
    this._drag = { x: e.clientX, y: e.clientY, pan: e.button === 2 || e.button === 1 || e.shiftKey, moved: 0 };
  }
  _move(e) {
    if (!this._drag) return;
    const dx = e.clientX - this._drag.x, dy = e.clientY - this._drag.y; this._drag.x = e.clientX; this._drag.y = e.clientY; this._drag.moved += Math.abs(dx) + Math.abs(dy);
    this.idle = 0;
    if (this._drag.pan) {
      const k = this.goal.rad * 0.0012; const az = this.goal.az;
      this.goal.tx += (-Math.cos(az) * dx - Math.sin(az) * dy) * k;
      this.goal.tz += (Math.sin(az) * dx - Math.cos(az) * dy) * k;
      this.clamp(this.goal);
    } else {
      this.goal.az -= dx * 0.0052; this.goal.pol -= dy * 0.0046; this.clamp(this.goal);
    }
  }
  _up() { this._drag = null; }
  clamp(p) {
    const L = this.limits;
    p.rad = Math.min(L.radMax, Math.max(L.radMin, p.rad));
    p.tx = Math.min(W + 6, Math.max(-6, p.tx)); p.tz = Math.min(H + 6, Math.max(-6, p.tz)); p.ty = Math.min(70, Math.max(0, p.ty));
    // kamera masanın/kaidenin altına inmesin: y >= 4
    const cosMax = Math.min(1, Math.max(-1, (4 - p.ty) / p.rad));
    const polMax = Math.min(L.polMax, Math.acos(cosMax));
    p.pol = Math.min(polMax, Math.max(L.polMin, p.pol));
    return p;
  }
  flyTo(pose, dur = 1.5) {
    if (this.tour) this.stopTour(); const from = { ...this.cur };
    const to = { ...this.cur, ...pose }; this.clamp(to);
    to.az = from.az + wrapPI(to.az - from.az);
    this.flight = { from, to, t: 0, dur, ease: easeInOut };
    this.goal = { ...to };
  }
  startTour() {
    if (!this.tourPoses.length) return;
    this.tour = { i: 0, phase: 0 }; this.onTourChange?.(true); this._tourNext();
  }
  _tourNext() {
    const list = this.tourPoses; const p = list[this.tour.i % list.length]; this.tour.i++;
    const from = { ...this.cur }; const to = { ...p }; this.clamp(to); to.az = from.az + wrapPI(to.az - from.az);
    // tur boyunca yavaş azimut kayması
    to.az += 0.22;
    this.flight = { from, to, t: 0, dur: p.dur ?? 9, ease: easeInOut, tour: true, label: p.label };
    this.goal = { ...to }; this.onTourStep?.(p);
  }
  update(dt) {
    this.idle += dt;
    if (!this.flight && !this.tour && this.tourOn && this.idle > this.idleLimit) this.startTour();
    if (this.flight) {
      const f = this.flight; f.t += dt / f.dur; const k = Math.min(1, f.t); const e = f.ease(k);
      for (const key of ['tx', 'ty', 'tz', 'az', 'pol', 'rad']) {
        if (key === 'rad') this.cur.rad = Math.exp(Math.log(f.from.rad) + (Math.log(f.to.rad) - Math.log(f.from.rad)) * e);
        else this.cur[key] = f.from[key] + (f.to[key] - f.from[key]) * e;
      }
      if (k >= 1) { const wasTour = f.tour; this.flight = null; this.goal = { ...this.cur }; if (wasTour && this.tour) this._tourNext(); }
    } else {
      const a = 1 - Math.exp(-dt * 9);
      for (const key of ['tx', 'ty', 'tz', 'az', 'pol']) this.cur[key] += (this.goal[key] - this.cur[key]) * a;
      this.cur.rad = Math.exp(Math.log(this.cur.rad) + (Math.log(this.goal.rad) - Math.log(this.cur.rad)) * a);
    }
    this.apply();
  }
  apply() {
    const c = this.cur; const sp = Math.sin(c.pol), cp = Math.cos(c.pol);
    this.camera.position.set(c.tx + c.rad * sp * Math.sin(c.az), c.ty + c.rad * cp, c.tz + c.rad * sp * Math.cos(c.az));
    this.camera.lookAt(c.tx, c.ty, c.tz);
  }
}
