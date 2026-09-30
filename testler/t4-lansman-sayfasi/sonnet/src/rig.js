import * as THREE from 'three';
import { makeStudioEnv } from './env.js';
import { buildWatch } from './watch.js';

export const DEFAULT_POSE = {
  rx: 0, ry: 0, rz: 0, x: 0, y: 0, z: 0, s: 1,
  sx: 0, sy: 0, syM: 0.22, sxM: 0, zt: 0, fov: 24,
  explode: 0, strap: 1, back: 0,
  env: 0, sheen: 0.45, sheenAng: 0.4,
  key: 1.0, rim: 0.6, exposure: 1.0,
};

export function createRig(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  scene.environment = makeStudioEnv(renderer);
  scene.environmentIntensity = 1.0;

  const camera = new THREE.PerspectiveCamera(24, 1, 0.1, 100);
  const key = new THREE.DirectionalLight(0xfff4e6, 1.6); key.position.set(-5, 8, 10); scene.add(key);
  const rim = new THREE.DirectionalLight(0xbcd4ff, 0.8); rim.position.set(7, 2, -6); scene.add(rim);
  const fill = new THREE.AmbientLight(0x8fa0c0, 0.12); scene.add(fill);

  const watch = buildWatch(renderer);
  scene.add(watch.root);

  const size = { w: 1, h: 1, aspect: 1 };
  function resize() {
    const w = canvas.clientWidth || window.innerWidth, h = canvas.clientHeight || window.innerHeight;
    size.w = w; size.h = h; size.aspect = w / h;
    renderer.setSize(w, h, false);
    camera.aspect = size.aspect;
  }
  resize();

  const D = 15;
  function apply(p, state, dt) {
    const wide = size.aspect > 1.05;
    const f = wide ? 1 : Math.min(2.1, Math.max(1, 0.78 / size.aspect));
    const fov = p.fov;
    camera.fov = fov;
    camera.position.set(0, 0, D * f);
    camera.updateProjectionMatrix();
    const sx = wide ? p.sx : p.sxM, sy = wide ? p.sy : p.syM;
    camera.projectionMatrix.elements[8] = -sx;
    camera.projectionMatrix.elements[9] = -sy;
    camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();

    watch.root.rotation.set(p.rx, p.ry, p.rz, 'YXZ');
    watch.root.position.set(p.x, p.y, wide ? p.z : p.z + p.zt);
    watch.root.scale.setScalar(p.s);
    scene.environmentRotation.y = p.env;
    scene.environmentIntensity = 1.0;
    key.intensity = p.key * 1.6;
    rim.intensity = p.rim * 1.2;
    if (p.keyColor) key.color.set(p.keyColor);
    renderer.toneMappingExposure = p.exposure;
    scene.updateMatrixWorld(true);
    watch.update({
      explode: p.explode, strap: p.strap, backSlide: p.back,
      clock: state.clock, time: state.time, gear: state.gear, rotor: state.rotor,
      sheen: p.sheen, sheenAng: p.sheenAng,
    }, dt);
    renderer.render(scene, camera);
  }

  return { renderer, scene, camera, watch, resize, apply, size };
}
