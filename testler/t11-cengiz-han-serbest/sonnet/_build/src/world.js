import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { terrainH } from './terrain.js';

let seed = 4242; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const rr = (a, b) => a + (b - a) * rnd();
const mm = new THREE.Matrix4(), qq = new THREE.Quaternion(), pp = new THREE.Vector3(), ss = new THREE.Vector3(), ee = new THREE.Euler();
const UP = new THREE.Vector3(0, 1, 0);

function box(w, h, d, x, y, z, color) {
  const g = new THREE.BoxGeometry(w, h, d); g.translate(x, y, z);
  const n = g.attributes.position.count, c = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) { c[i * 3] = color[0]; c[i * 3 + 1] = color[1]; c[i * 3 + 2] = color[2]; }
  g.setAttribute('color', new THREE.BufferAttribute(c, 3)); return g;
}

export function buildWorld(scene, monument) {
  const parts = { update: [] };
  const grp = new THREE.Group(); scene.add(grp);

  // ---------- road loop ----------
  const roadPts = [[-96, -9], [-420, -34], [-1300, -120], [-2500, -40], [-3500, 130], [-3900, 420], [-3400, 640], [-2400, 470], [-1200, 260], [-500, 120], [-150, 22], [-82, 9], [-62, 0], [-82, -8]]
    .map(([x, z]) => new THREE.Vector3(x, 0, z));
  const roadCurve = new THREE.CatmullRomCurve3(roadPts, true, 'centripetal');
  {
    const N = 900, pos = [], uv = [], idx = [];
    for (let i = 0; i <= N; i++) {
      const t = i / N, p = roadCurve.getPointAt(t % 1), tg = roadCurve.getTangentAt(t % 1);
      const nx = -tg.z, nz = tg.x, l = Math.hypot(nx, nz) || 1;
      for (const s of [-1, 1]) { const x = p.x + (nx / l) * 4.2 * s, z = p.z + (nz / l) * 4.2 * s; pos.push(x, terrainH(x, z) + 0.12, z); uv.push(s < 0 ? 0 : 1, t * 900); }
      if (i < N) { const a = i * 2; idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3); }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx); g.computeVertexNormals();
    const cv = document.createElement('canvas'); cv.width = 64; cv.height = 128; const cx = cv.getContext('2d');
    cx.fillStyle = '#2b2b2c'; cx.fillRect(0, 0, 64, 128);
    cx.fillStyle = '#4a4a4a'; for (let i = 0; i < 400; i++) cx.fillRect(Math.random() * 64, Math.random() * 128, 1, 1);
    cx.fillStyle = '#d8cfa0'; cx.fillRect(30, 0, 4, 60); cx.fillStyle = '#bdb8a8'; cx.fillRect(1, 0, 2, 128); cx.fillRect(61, 0, 2, 128);
    const tex = new THREE.CanvasTexture(cv); tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8;
    const road = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ map: tex, roughness: 0.9, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }));
    road.receiveShadow = true; road.frustumCulled = false; grp.add(road);
  }

  // ---------- vehicles ----------
  {
    const wheels = (L, W, y = 0.36) => [[L / 2 - 0.85, W / 2], [L / 2 - 0.85, -W / 2], [-L / 2 + 0.85, W / 2], [-L / 2 + 0.85, -W / 2]].map(([x, z]) => box(0.75, 0.72, 0.28, x, y, z, [0.05, 0.05, 0.05]));
    const car = mergeGeometries([box(4.4, 0.7, 1.85, 0, 0.7, 0, [1, 1, 1]), box(2.4, 0.62, 1.7, -0.25, 1.36, 0, [0.09, 0.11, 0.14]), box(2.0, 0.08, 1.6, -0.25, 1.7, 0, [1, 1, 1]), ...wheels(4.4, 1.7)]);
    const bus = mergeGeometries([box(11.5, 2.3, 2.55, 0, 1.75, 0, [1, 1, 1]), box(11.0, 0.85, 2.58, 0, 2.2, 0, [0.09, 0.11, 0.14]), box(11.2, 0.12, 2.4, 0, 3.0, 0, [0.85, 0.85, 0.85]), ...wheels(11.5, 2.3, 0.5)]);
    const mat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.35, metalness: 0.6 });
    const NC = 22, NB = 3;
    const cars = new THREE.InstancedMesh(car, mat, NC), buses = new THREE.InstancedMesh(bus, mat, NB);
    const lightGeo = mergeGeometries([box(0.15, 0.22, 0.4, 2.2, 0.85, 0.6, [1, 0.9, 0.7]), box(0.15, 0.22, 0.4, 2.2, 0.85, -0.6, [1, 0.9, 0.7]), box(0.15, 0.2, 0.4, -2.2, 0.9, 0.6, [1, 0.1, 0.05]), box(0.15, 0.2, 0.4, -2.2, 0.9, -0.6, [1, 0.1, 0.05])]);
    const lightMat = new THREE.MeshBasicMaterial({ vertexColors: true });
    const carLights = new THREE.InstancedMesh(lightGeo, lightMat, NC);
    const palette = ['#e8e8e8', '#b5b8bd', '#1c1f24', '#8a1f24', '#2b4a7a', '#d9d4c5', '#4a5b3a'].map((c) => new THREE.Color(c));
    const veh = [];
    for (let i = 0; i < NC + NB; i++) {
      const bus_ = i >= NC; const dir = rnd() < 0.5 ? 1 : -1;
      veh.push({ bus: bus_, idx: bus_ ? i - NC : i, u: (rnd() < 0.7 ? rr(0.0, 0.07) : rr(0.93, 1.0)) % 1, v: rr(9, 18) * (bus_ ? 0.8 : 1), lane: 0 });
      const m = bus_ ? buses : cars; m.setColorAt(bus_ ? i - NC : i, palette[(rnd() * palette.length) | 0]);
    }
    const len = roadCurve.getLength();
    parts.update.push((t, dt, night) => {
      for (const v of veh) {
        v.u = (v.u + (v.v * dt) / len) % 1;
        const p = roadCurve.getPointAt(v.u), tg = roadCurve.getTangentAt(v.u);
        const nx = -tg.z, nz = tg.x, l = Math.hypot(nx, nz);
        // drive on the right-hand side of the direction of travel
        p.x += (nx / l) * 2.0; p.z += (nz / l) * 2.0; p.y = terrainH(p.x, p.z) + 0.12;
        const yaw = Math.atan2(-tg.z, tg.x);
        qq.setFromAxisAngle(UP, yaw);
        mm.compose(p, qq, ss.set(1, 1, 1));
        (v.bus ? buses : cars).setMatrixAt(v.idx, mm);
        if (!v.bus) carLights.setMatrixAt(v.idx, mm);
      }
      cars.instanceMatrix.needsUpdate = buses.instanceMatrix.needsUpdate = carLights.instanceMatrix.needsUpdate = true;
      lightMat.color.setScalar(0.25 + night * 5.0);
    });
    for (const m of [cars, buses, carLights]) { m.frustumCulled = false; grp.add(m); }
    cars.castShadow = false;
  }

  // ---------- gers ----------
  {
    const wall = new THREE.CylinderGeometry(3.0, 3.0, 1.7, 20, 1, true); wall.translate(0, 0.85, 0);
    const roof = new THREE.ConeGeometry(3.45, 1.35, 20, 1, true); roof.translate(0, 1.7 + 0.67, 0);
    const crown = new THREE.CylinderGeometry(0.5, 0.5, 0.15, 12); crown.translate(0, 3.05, 0);
    const trim = new THREE.CylinderGeometry(3.05, 3.05, 0.14, 20); trim.translate(0, 1.72, 0);
    const paint = (g, c) => { const n = g.attributes.position.count, a = new Float32Array(n * 3); for (let i = 0; i < n; i++) { a[i * 3] = c[0]; a[i * 3 + 1] = c[1]; a[i * 3 + 2] = c[2]; } g.setAttribute('color', new THREE.BufferAttribute(a, 3)); return g; };
    const geo = mergeGeometries([paint(wall, [0.62, 0.59, 0.53]), paint(roof, [0.68, 0.66, 0.60]), paint(crown, [0.35, 0.22, 0.12]), paint(trim, [0.55, 0.13, 0.10])]);
    const door = new THREE.PlaneGeometry(0.95, 1.4); door.translate(0, 0.72, 3.03);
    const gm = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.9, side: THREE.DoubleSide });
    const camps = [[-190, -230, 9], [-260, -170, 7], [310, 190, 10], [380, -150, 7], [-70, 260, 8], [130, -300, 6], [-560, 260, 8]];
    const list = [];
    for (const [cx, cz, n] of camps) for (let i = 0; i < n; i++) {
      const a = rnd() * Math.PI * 2, d = 12 + rnd() * 52;
      list.push([cx + Math.cos(a) * d, cz + Math.sin(a) * d, rnd() * Math.PI * 2, rr(0.85, 1.2)]);
    }
    const gers = new THREE.InstancedMesh(geo, gm, list.length), doors = new THREE.InstancedMesh(door, new THREE.MeshBasicMaterial({ color: new THREE.Color(0.18, 0.26, 0.5), side: THREE.DoubleSide }), list.length);
    list.forEach(([x, z, yaw, s], i) => {
      pp.set(x, terrainH(x, z), z); qq.setFromAxisAngle(UP, yaw); ss.set(s, s, s); mm.compose(pp, qq, ss); gers.setMatrixAt(i, mm); doors.setMatrixAt(i, mm);
    });
    gers.castShadow = true; gers.receiveShadow = true; doors.frustumCulled = false; gers.frustumCulled = false;
    grp.add(gers, doors);
    parts.update.push((t, dt, night) => doors.material.color.setRGB(0.18, 0.26, 0.5).lerp(new THREE.Color(1.0, 0.62, 0.28), night).multiplyScalar(1 + night * 4));
  }

  // ---------- people ----------
  {
    const body = new THREE.CylinderGeometry(0.26, 0.22, 1.05, 8); body.translate(0, 0.95, 0);
    const legs = new THREE.CylinderGeometry(0.18, 0.16, 0.5, 6); legs.translate(0, 0.25, 0);
    const head = new THREE.SphereGeometry(0.15, 8, 6); head.translate(0, 1.66, 0);
    const paint = (g, c) => { const n = g.attributes.position.count, a = new Float32Array(n * 3); for (let i = 0; i < n; i++) { a[i * 3] = c[0]; a[i * 3 + 1] = c[1]; a[i * 3 + 2] = c[2]; } g.setAttribute('color', new THREE.BufferAttribute(a, 3)); return g; };
    const geo = mergeGeometries([paint(body, [1, 1, 1]), paint(legs, [0.12, 0.12, 0.16]), paint(head, [0.75, 0.55, 0.42])]);
    const N = 170;
    const mesh = new THREE.InstancedMesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.85 }), N);
    const cols = ['#c4322a', '#2c5aa0', '#e7c65a', '#f0f0f0', '#2a2a2e', '#3d7a4a', '#c27a2c', '#7a3d7a'].map((c) => new THREE.Color(c));
    const ppl = [];
    for (let i = 0; i < N; i++) {
      const zone = rnd();
      const r = zone < 0.6 ? rr(42, 58) : zone < 0.85 ? rr(34, 41) : rr(60, 80);
      ppl.push({ r, a: rnd() * Math.PI * 2, w: (rnd() < 0.5 ? 1 : -1) * rr(0.6, 1.5) / r, s: rr(0.92, 1.08) });
      mesh.setColorAt(i, cols[(rnd() * cols.length) | 0]);
    }
    parts.update.push((t, dt) => {
      for (let i = 0; i < N; i++) {
        const p = ppl[i]; p.a += p.w * dt;
        const x = Math.cos(p.a) * p.r, z = Math.sin(p.a) * p.r;
        // steps are only around r 31-40; keep simple: stand on ground / step height
        const step = p.r < 40 ? Math.max(0, Math.min(1.3, (40 - p.r) / 2.2 * 0.24 + 0.0)) : 0;
        pp.set(x, step + Math.abs(Math.sin(t * 6 + i)) * 0.03, z);
        qq.setFromAxisAngle(UP, -p.a + (p.w > 0 ? Math.PI : 0));
        ss.setScalar(p.s); mm.compose(pp, qq, ss); mesh.setMatrixAt(i, mm);
      }
      mesh.instanceMatrix.needsUpdate = true;
    });
    mesh.frustumCulled = false; mesh.castShadow = true; grp.add(mesh);
  }

  // ---------- horse herds ----------
  if (monument.herdGeo) {
    const cols = ['#5a3a25', '#3a2618', '#8a6a48', '#1b1512', '#c9b79a', '#6b4a30', '#9a7a55'].map((c) => new THREE.Color(c));
    const groups = [[-290, -40, 20, 46], [-640, 120, 26, 60], [230, 330, 16, 50], [-420, -300, 22, 55], [520, -240, 18, 60], [-140, 200, 8, 30], [330, -70, 22, 55], [640, 120, 26, 60], [820, -240, 20, 60]];
    let total = 0; groups.forEach((g) => (total += g[2]));
    const mesh = new THREE.InstancedMesh(monument.herdGeo, new THREE.MeshStandardMaterial({ roughness: 0.75, metalness: 0 }), total);
    const hs = [];
    groups.forEach(([cx, cz, n, rad]) => {
      const heading = rnd() * Math.PI * 2;
      for (let i = 0; i < n; i++) {
        hs.push({ cx, cz, ox: rr(-rad, rad), oz: rr(-rad, rad), yaw: heading + rr(-0.6, 0.6), sp: rr(0.4, 1.3), sc: rr(0.95, 1.2), ph: rnd() * 10, cx0: cx, cz0: cz });
        mesh.setColorAt(hs.length - 1, cols[(rnd() * cols.length) | 0]);
      }
    });
    parts.update.push((t, dt) => {
      hs.forEach((h, i) => {
        const g = 1.0 + 0.5 * Math.sin(t * 0.05 + h.ph);
        h.ox += Math.cos(h.yaw) * h.sp * dt * 0.7; h.oz += Math.sin(h.yaw) * h.sp * dt * 0.7;
        // gently steer back towards the group's centre
        const d = Math.hypot(h.ox, h.oz);
        if (d > 70) h.yaw += (Math.atan2(-h.oz, -h.ox) - h.yaw + 3 * Math.PI) % (2 * Math.PI) * 0.0 + 0.5 * dt * (Math.sin(Math.atan2(-h.oz, -h.ox) - h.yaw) > 0 ? 1 : -1);
        const x = h.cx + h.ox, z = h.cz + h.oz;
        pp.set(x, terrainH(x, z), z);
        qq.setFromAxisAngle(UP, -h.yaw);   // model faces +x; yaw measured from +x towards +z
        const bob = 1.0 + Math.sin(t * 5.5 * h.sp + h.ph) * 0.012;
        ss.set(h.sc * 0.92, h.sc * 0.92 * bob, h.sc * 0.92); mm.compose(pp, qq, ss); mesh.setMatrixAt(i, mm);
      });
      mesh.instanceMatrix.needsUpdate = true;
    });
    mesh.frustumCulled = false; mesh.castShadow = false; mesh.receiveShadow = true; grp.add(mesh);
  }

  // ---------- eagles ----------
  {
    const wingG = new THREE.BufferGeometry();
    wingG.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0.35, 0, 0, -0.35, 3.2, 0.25, -0.9, 0, 0, 0.35, 3.2, 0.25, -0.9, 3.6, 0.15, 0.4], 3));
    wingG.setIndex([0, 1, 2, 0, 2, 3]); wingG.computeVertexNormals();
    const wm = new THREE.MeshStandardMaterial({ color: 0x2a1d14, roughness: 0.9, side: THREE.DoubleSide });
    const bodyG = new THREE.SphereGeometry(0.34, 8, 6); bodyG.scale(2.2, 0.7, 0.7);
    const birds = [];
    for (let i = 0; i < 7; i++) {
      const g = new THREE.Group();
      const b = new THREE.Mesh(bodyG, wm); g.add(b);
      const wl = new THREE.Mesh(wingG, wm), wr = new THREE.Mesh(wingG, wm); wr.scale.z = -1; g.add(wl, wr);
      g.scale.setScalar(rr(1.4, 2.2)); grp.add(g);
      birds.push({ g, wl, wr, R: rr(90, 240), H: rr(60, 130), sp: rr(0.05, 0.10) * (rnd() < 0.5 ? 1 : -1), ph: rnd() * 6.28, cx: rr(-40, 40), cz: rr(-40, 40) });
    }
    parts.update.push((t) => {
      for (const b of birds) {
        const a = b.ph + t * b.sp;
        const x = b.cx + Math.cos(a) * b.R, z = b.cz + Math.sin(a) * b.R, y = b.H + Math.sin(t * 0.3 + b.ph) * 8;
        b.g.position.set(x, y, z);
        const dir = b.sp > 0 ? 1 : -1;
        b.g.rotation.set(0, -a + (dir > 0 ? 0 : Math.PI) - Math.PI / 2 * dir * 0 + Math.PI / 2 * dir - Math.PI / 2 * (dir < 0 ? 0 : 0), 0);
        b.g.rotation.z = -0.28 * dir;
        const fl = Math.sin(t * 2.2 + b.ph * 3) * 0.18 + Math.sin(t * 0.7 + b.ph) * 0.06;
        b.wl.rotation.x = fl; b.wr.rotation.x = -fl;
      }
    });
  }

  // ---------- dust motes ----------
  {
    const N = 1400, g = new THREE.BufferGeometry(), pos = new Float32Array(N * 3), ph = new Float32Array(N);
    for (let i = 0; i < N; i++) { pos[i * 3] = rr(-45, 45); pos[i * 3 + 1] = rr(-20, 30); pos[i * 3 + 2] = rr(-45, 45); ph[i] = rnd() * 6.28; }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('ph', new THREE.BufferAttribute(ph, 1));
    const mat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false,
      uniforms: { uTime: { value: 0 }, uCam: { value: new THREE.Vector3() }, uCol: { value: new THREE.Color(1, 0.85, 0.6) }, uAmt: { value: 1 } },
      vertexShader: `uniform float uTime; uniform vec3 uCam; attribute float ph; varying float vA;
        void main(){ vec3 p = position; p.x += sin(uTime*0.3+ph*3.0)*2.5; p.y += sin(uTime*0.5+ph)*1.5 + uTime*0.15*0.0; p.z += cos(uTime*0.27+ph*2.0)*2.5;
          vec3 w = uCam + mod(p - uCam + 45.0, 90.0) - 45.0; w.y = max(w.y, 0.5);
          vec4 mv = viewMatrix*vec4(w,1.0); gl_Position = projectionMatrix*mv; float d = -mv.z;
          gl_PointSize = clamp(90.0/d, 1.2, 6.0) * (0.6+0.4*sin(uTime+ph*9.0)); vA = smoothstep(80.0, 6.0, d) * smoothstep(0.3, 2.5, d);}`,
      fragmentShader: `uniform vec3 uCol; uniform float uAmt; varying float vA; void main(){ vec2 c=gl_PointCoord-0.5; float a = smoothstep(0.5,0.0,length(c)); gl_FragColor = vec4(uCol*a*vA*uAmt*0.9, 1.0);}`,
    });
    const pts = new THREE.Points(g, mat); pts.frustumCulled = false; grp.add(pts);
    parts.motes = mat;
  }

  return {
    update(t, dt, night, camera, sky) {
      for (const f of parts.update) f(t, dt, night);
      const m = parts.motes; m.uniforms.uTime.value = t; m.uniforms.uCam.value.copy(camera.position);
      const low = 1 - THREE.MathUtils.smoothstep(sky.e, 0.05, 0.55);
      m.uniforms.uAmt.value = (0.15 + 0.85 * low) * (1 - night) * (1 - THREE.MathUtils.smoothstep(camera.position.y, 30, 90));
      m.uniforms.uCol.value.copy(sky.sun ? new THREE.Color(1, 0.8, 0.55) : new THREE.Color(1, 1, 1));
    },
  };
}
