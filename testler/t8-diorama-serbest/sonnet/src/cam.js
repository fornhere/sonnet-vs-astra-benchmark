import * as THREE from 'three';
import { W, D } from './dims.js';

const ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeSine = t => -(Math.cos(Math.PI * t) - 1) / 2;

export function createCameraRig(camera, controls, canvas, hooks) {
  const rig = { anim: null, tour: null, keys: {}, onCancel: () => {} };
  const tmpV = new THREE.Vector3();
  rig.flyTo = (pos, target, dur = 2.4, opts = {}) => {
    rig.cancelTour(); rig.anim = { p0: camera.position.clone(), t0: controls.target.clone(), p1: pos.clone(), t1: target.clone(), dur, t: 0, bump: opts.bump ?? 0.18, time: opts.time, time0: hooks.getTime() };
    controls.enabled = false;
  };
  rig.set = (pos, target) => { camera.position.copy(pos); controls.target.copy(target); controls.update(); };
  rig.startTour = (stops) => {
    rig.anim = null; controls.enabled = false;
    const P = new THREE.CatmullRomCurve3(stops.map(s => s.pos.clone()), false, 'centripetal'); const T = new THREE.CatmullRomCurve3(stops.map(s => s.target.clone()), false, 'centripetal');
    const starts = []; let acc = 0; for (let i = 1; i < stops.length; i++) { starts.push(acc); acc += stops[i].dur; }
    rig.tour = { stops, P, T, starts, total: acc, e: 0, time0: hooks.getTime() };
    // başlangıcı mevcut kameradan yumuşat
    rig.tour.from = { p: camera.position.clone(), t: controls.target.clone() }; rig.tour.blend = 0;
    hooks.onTourStart && hooks.onTourStart();
  };
  rig.cancelTour = () => { if (rig.tour) { rig.tour = null; controls.enabled = true; hooks.onTourEnd && hooks.onTourEnd(); } };
  rig.update = (dt) => {
    if (rig.anim) { const a = rig.anim; a.t += dt / a.dur; const u = Math.min(1, a.t), e = ease(u);
      camera.position.lerpVectors(a.p0, a.p1, e); camera.position.y += Math.sin(Math.PI * e) * a.bump * a.p0.distanceTo(a.p1) * 0.5; controls.target.lerpVectors(a.t0, a.t1, e);
      if (a.time !== undefined) hooks.setTime(a.time0 + (a.time - a.time0) * e);
      camera.lookAt(controls.target);
      if (u >= 1) { rig.anim = null; controls.enabled = true; controls.update(); } return; }
    if (rig.tour) { const t = rig.tour; t.e += dt; const n = t.stops.length - 1;
      let i = 0; while (i < n - 1 && t.e > t.starts[i] + t.stops[i + 1].dur) i++;
      const segT = Math.min(1, Math.max(0, (t.e - t.starts[i]) / t.stops[i + 1].dur)); let u = segT; // sürekli hareket
      const g = (i + u) / n; const p = t.P.getPoint(Math.min(0.9999, g)), tg = t.T.getPoint(Math.min(0.9999, g));
      t.blend = Math.min(1, t.blend + dt / 2.2); const b = easeSine(t.blend);
      camera.position.copy(t.from.p).lerp(p, b); controls.target.copy(t.from.t).lerp(tg, b); camera.lookAt(controls.target);
      // zaman
      const s0 = t.stops[i], s1 = t.stops[i + 1]; const tm = s0.time + (s1.time - s0.time) * easeSine(segT); hooks.setTime(((tm % 24) + 24) % 24);
      { const showPrev = segT < 0.24 && i > 0 && (s0.title || s0.text); const showNext = (i === 0 ? segT < 0.94 : segT > 0.42 && segT < 0.96) && (s1.title || s1.text); hooks.onTourCaption && hooks.onTourCaption(showPrev ? s0 : showNext ? s1 : null, showPrev ? i : i + 1, t.stops.length - 1); }
      if (t.e >= t.total) { rig.tour = null; controls.enabled = true; controls.update(); hooks.onTourEnd && hooks.onTourEnd(); hooks.onTourCaption && hooks.onTourCaption(null); }
      return; }
    // klavye ile gezinme
    const k = rig.keys; let mx = 0, mz = 0; if (k['w'] || k['arrowup']) mz -= 1; if (k['s'] || k['arrowdown']) mz += 1; if (k['a'] || k['arrowleft']) mx -= 1; if (k['d'] || k['arrowright']) mx += 1;
    if (mx || mz) { const dist = camera.position.distanceTo(controls.target); const sp = Math.max(30, dist * 0.9) * dt * (k['shift'] ? 2.5 : 1);
      const fwd = tmpV.set(controls.target.x - camera.position.x, 0, controls.target.z - camera.position.z).normalize(); const right = new THREE.Vector3(-fwd.z, 0, fwd.x);
      const mv = fwd.multiplyScalar(-mz * sp).add(right.multiplyScalar(mx * sp)); camera.position.add(mv); controls.target.add(mv); rig.cancelTour(); }
    if (k['q'] || k['e']) { const ang = (k['q'] ? 1 : -1) * dt * 1.1; const off = camera.position.clone().sub(controls.target); off.applyAxisAngle(new THREE.Vector3(0, 1, 0), ang); camera.position.copy(controls.target).add(off); }
    if (k['+'] || k['='] || k['-'] || k['_']) { const f = (k['+'] || k['=']) ? 0.5 : 2.0; const off = camera.position.clone().sub(controls.target); off.multiplyScalar(Math.pow(f, dt * 1.6)); camera.position.copy(controls.target).add(off); }
    // sınırlar
    controls.target.x = THREE.MathUtils.clamp(controls.target.x, -40, W + 40); controls.target.z = THREE.MathUtils.clamp(controls.target.z, -40, D + 40); controls.target.y = THREE.MathUtils.clamp(controls.target.y, 4, 80);
  };
  addEventListener('keydown', e => { const k = e.key.toLowerCase(); rig.keys[k] = true; if (k === 'shift') rig.keys['shift'] = true; if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(k)) e.preventDefault(); });
  addEventListener('keyup', e => { rig.keys[e.key.toLowerCase()] = false; if (e.key === 'Shift') rig.keys['shift'] = false; });
  addEventListener('blur', () => { rig.keys = {}; });
  canvas.addEventListener('pointerdown', () => { if (rig.tour) rig.cancelTour(); if (rig.anim) { rig.anim = null; controls.enabled = true; } });
  canvas.addEventListener('wheel', () => { if (rig.tour) rig.cancelTour(); }, { passive: true });
  // çift tık: oraya git
  const ray = new THREE.Raycaster(); const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -10);
  canvas.addEventListener('dblclick', (e) => {
    const r = canvas.getBoundingClientRect(); const ndc = new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera); const hit = new THREE.Vector3(); if (!ray.ray.intersectPlane(plane, hit)) return;
    hit.x = THREE.MathUtils.clamp(hit.x, 0, W); hit.z = THREE.MathUtils.clamp(hit.z, 0, D);
    const off = camera.position.clone().sub(controls.target); const len = Math.max(28, off.length() * 0.45); off.setLength(len);
    rig.flyTo(hit.clone().add(off), hit.clone().setY(12), 1.6, { bump: 0.1 });
  });
  return rig;
}
