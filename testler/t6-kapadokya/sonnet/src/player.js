import * as THREE from 'three';
import { SPAWN } from './config.js';

const EYE = 1.72;
const _f = new THREE.Vector3(), _r = new THREE.Vector3(), _w = new THREE.Vector3();

export class Player {
  constructor(camera, terrain, colliders) {
    this.camera = camera; this.terrain = terrain; this.colliders = colliders;
    this.pos = new THREE.Vector3(SPAWN.x, 0, SPAWN.z);
    this.vel = new THREE.Vector3();
    this.yaw = 0; this.pitch = 0;
    this.mode = 'walk';          // walk | fly
    this.grounded = true;
    this.keys = new Set();
    this.look = { dx: 0, dy: 0 };
    this.joy = { mx: 0, mz: 0 };
    this.camY = 0; this.bob = 0; this.speed = 0; this.walking = false; this.sprint = false; this.burn = false;
    this.roll = 0; this.enabled = false;
    this.eye = EYE;
  }

  place(x, z, yaw, pitch = 0) {
    this.pos.set(x, this.terrain.heightAt(x, z), z);
    this.yaw = yaw; this.pitch = pitch; this.vel.set(0, 0, 0);
    this.camY = this.pos.y + EYE; this.grounded = true; this.mode = 'walk';
  }
  setFromCamera(pos, look) {
    const d = _f.copy(look).sub(pos).normalize();
    this.yaw = Math.atan2(-d.x, -d.z); this.pitch = Math.asin(THREE.MathUtils.clamp(d.y, -1, 1));
    this.pos.set(pos.x, this.terrain.heightAt(pos.x, pos.z), pos.z);
    this.camY = pos.y; this.grounded = true; this.mode = 'walk';
  }

  toggleFly() {
    if (this.mode === 'walk') {
      this.mode = 'fly'; this.grounded = false;
      this.pos.y = Math.max(this.camY, this.terrain.heightAt(this.pos.x, this.pos.z) + 3) ; this.vel.set(0, 3, 0);
      this.camY = this.pos.y;
    } else {
      this.mode = 'fly-land';
    }
  }

  groundAt(x, z) { return this.terrain.heightAt(x, z); }

  collide(x, z, r) {
    let ox = x, oz = z;
    this.colliders.forEach(h => h.query(ox, oz, r + 10, (o) => {
      const dx = ox - o.x, dz = oz - o.z; const rr = o.r + r; const d2 = dx * dx + dz * dz;
      if (d2 < rr * rr) { const d = Math.sqrt(d2) || 0.001; ox = o.x + dx / d * rr; oz = o.z + dz / d * rr; }
    }));
    return [ox, oz];
  }

  update(dt) {
    const k = this.keys;
    const fwd = (k.has('KeyW') || k.has('ArrowUp') ? 1 : 0) - (k.has('KeyS') || k.has('ArrowDown') ? 1 : 0) + (-this.joy.mz);
    const str = (k.has('KeyD') || k.has('ArrowRight') ? 1 : 0) - (k.has('KeyA') || k.has('ArrowLeft') ? 1 : 0) + this.joy.mx;
    const sprint = k.has('ShiftLeft') || k.has('ShiftRight');
    this.sprint = sprint;
    // fare bakışı
    this.yaw -= this.look.dx; this.pitch -= this.look.dy;
    this.look.dx = this.look.dy = 0;
    this.pitch = THREE.MathUtils.clamp(this.pitch, -1.5, 1.5);

    const cy = Math.cos(this.yaw), sy = Math.sin(this.yaw);
    if (this.mode === 'walk') {
      _f.set(-sy, 0, -cy); _r.set(cy, 0, -sy);
      const spd = sprint ? 12.5 : 5.4;
      _w.set(0, 0, 0).addScaledVector(_f, fwd).addScaledVector(_r, str);
      const mag = _w.length(); if (mag > 1) _w.divideScalar(mag);
      const acc = this.grounded ? 14 : 3;
      this.vel.x += (_w.x * spd - this.vel.x) * Math.min(1, acc * dt);
      this.vel.z += (_w.z * spd - this.vel.z) * Math.min(1, acc * dt);
      let nx = this.pos.x + this.vel.x * dt, nz = this.pos.z + this.vel.z * dt;
      const g0 = this.groundAt(this.pos.x, this.pos.z);
      const step = Math.hypot(nx - this.pos.x, nz - this.pos.z);
      if (step > 1e-5 && this.grounded) {
        const g1 = this.groundAt(nx, nz);
        if ((g1 - g0) / step > 1.5 && g1 - this.pos.y > 0.9) {
          // eğim çok dik: eksen bazlı kaydır
          const gx = this.groundAt(nx, this.pos.z), gz = this.groundAt(this.pos.x, nz);
          const okx = (gx - g0) / Math.max(Math.abs(nx - this.pos.x), 1e-4) < 1.5;
          const okz = (gz - g0) / Math.max(Math.abs(nz - this.pos.z), 1e-4) < 1.5;
          if (!okx) nx = this.pos.x; if (!okz) nz = this.pos.z;
          if (!okx && !okz) { this.vel.x *= 0.2; this.vel.z *= 0.2; }
        }
      }
      [nx, nz] = this.collide(nx, nz, 0.45);
      const lim = 1780; nx = THREE.MathUtils.clamp(nx, -lim, lim); nz = THREE.MathUtils.clamp(nz, -lim, lim);
      this.pos.x = nx; this.pos.z = nz;
      const g = this.groundAt(nx, nz);
      if (this.grounded) {
        if (this.pos.y - g > 0.6 && this.pos.y > g) { this.grounded = false; }
        else this.pos.y = g;
        if (k.has('Space') && this.grounded) { this.vel.y = 7.2; this.grounded = false; }
      }
      if (!this.grounded) {
        this.vel.y -= 21 * dt; this.pos.y += this.vel.y * dt;
        if (this.pos.y <= g) { this.pos.y = g; this.vel.y = 0; this.grounded = true; }
      }
      this.speed = Math.hypot(this.vel.x, this.vel.z);
      this.walking = this.grounded && this.speed > 1.2;
      if (this.walking) this.bob += dt * (sprint ? 12 : 8.5) * Math.min(1.3, this.speed / 5); 
      const bobY = this.walking ? Math.sin(this.bob) * (sprint ? 0.07 : 0.045) : 0;
      const targetEye = this.pos.y + EYE + bobY;
      this.camY += (targetEye - this.camY) * Math.min(1, dt * (this.grounded ? 16 : 30));
      this.burn = false;
      this.roll += (-str * 0.012 * (this.grounded ? 1 : 0) - this.roll) * Math.min(1, dt * 6);
    } else {
      // balon / serbest uçuş
      const cp = Math.cos(this.pitch), sp = Math.sin(this.pitch);
      _f.set(-sy * cp, sp, -cy * cp); _r.set(cy, 0, -sy);
      const spd = sprint ? 70 : 24;
      _w.set(0, 0, 0).addScaledVector(_f, fwd).addScaledVector(_r, str);
      const up = (k.has('Space') ? 1 : 0) - (k.has('KeyC') || k.has('ControlLeft') ? 1 : 0);
      _w.y += up * 0.8;
      this.burn = up > 0;
      const mag = _w.length(); if (mag > 1) _w.divideScalar(mag);
      const acc = 1.8;
      this.vel.x += (_w.x * spd - this.vel.x) * Math.min(1, acc * dt);
      this.vel.y += (_w.y * spd - this.vel.y) * Math.min(1, acc * dt);
      this.vel.z += (_w.z * spd - this.vel.z) * Math.min(1, acc * dt);
      // hafif dalgalanma
      const t = performance.now() * 0.001;
      this.pos.x += this.vel.x * dt + Math.sin(t * 0.31) * 0.02; this.pos.z += this.vel.z * dt + Math.cos(t * 0.27) * 0.02; this.pos.y += this.vel.y * dt + Math.sin(t * 0.5) * 0.02;
      const lim = 1780; this.pos.x = THREE.MathUtils.clamp(this.pos.x, -lim, lim); this.pos.z = THREE.MathUtils.clamp(this.pos.z, -lim, lim);
      const g = this.groundAt(this.pos.x, this.pos.z);
      this.pos.y = THREE.MathUtils.clamp(this.pos.y, g + 2.5, 1300);
      this.camY = this.pos.y;
      this.speed = this.vel.length(); this.walking = false;
      this.roll += (-str * 0.05 - this.roll) * Math.min(1, dt * 3);
      if (this.mode === 'fly-land') {
        // yumuşak iniş
        this.vel.y += (-6 - this.vel.y) * Math.min(1, dt * 1.2);
        if (this.pos.y <= g + 2.6) { this.mode = 'walk'; this.grounded = false; this.vel.set(0, -1, 0); }
      }
    }
    // kamera
    const c = this.camera;
    c.position.set(this.pos.x, this.camY, this.pos.z);
    c.rotation.order = 'YXZ';
    c.rotation.set(this.pitch, this.yaw, this.roll);
  }
}
