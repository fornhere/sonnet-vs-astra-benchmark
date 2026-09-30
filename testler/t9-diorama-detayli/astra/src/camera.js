import { THREE, LANDMARKS } from "./core.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
export function makeCamera(renderer) {
  const camera = new THREE.OrthographicCamera(-200, 200, 140, -140, 0.1, 1400);
  camera.position.set(214, 200, 270);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 4, -23);
  controls.enableDamping = true;
  controls.dampingFactor = 0.065;
  controls.minPolarAngle = 0.22;
  controls.maxPolarAngle = Math.PI * 0.46;
  controls.minZoom = 0.65;
  controls.maxZoom = 8;
  controls.enablePan = true;
  controls.panSpeed = 0.7;
  controls.rotateSpeed = 0.6;
  controls.zoomSpeed = 0.8;
  let lastUpdate = performance.now();
  let lastInput = performance.now(),
    flight = null,
    selected = null,
    touring = false,
    onTour = () => {};
  const initial = {
    pos: camera.position.clone(),
    target: controls.target.clone(),
    zoom: 1,
  };
  function interrupt() {
    lastInput = performance.now();
    if (touring) {
      touring = false;
      onTour(false);
    }
    flight = null;
  }
  controls.addEventListener("start", interrupt);
  for (const event of ["pointerdown", "pointermove", "wheel", "keydown"])
    window.addEventListener(
      event,
      () => {
        lastInput = performance.now();
        if (touring) {
          touring = false;
          onTour(false);
        }
      },
      { passive: true },
    );
  function fly(id) {
    const l = LANDMARKS.find((x) => x.id === id);
    selected = l || null;
    lastInput = performance.now();
    touring = false;
    onTour(false);
    let target, pos, zoom;
    if (l) {
      target = new THREE.Vector3(l.x, l.height * 0.36, l.z);
      const dir =
        l.id === "bridge"
          ? new THREE.Vector3(0, 1.25, 2.3)
          : l.id === "park"
            ? new THREE.Vector3(1.3, 2.8, 1.5)
            : l.id === "flatiron"
              ? new THREE.Vector3(1.9, 2.0, 1.6)
              : l.id === "grand"
                ? new THREE.Vector3(0, 4.2, 1.8)
                : l.id === "times"
                  ? new THREE.Vector3(-2, 1.8, 1.2)
                  : l.id === "rockefeller"
                    ? new THREE.Vector3(2, 1.8, -0.2)
                    : new THREE.Vector3(1.2, 1.15, 1.65);
      pos = target.clone().add(dir.normalize().multiplyScalar(300));
      zoom = 280 / l.zoom;
    } else {
      target = initial.target.clone();
      pos = initial.pos.clone();
      zoom = 1;
    }
    flight = {
      start: performance.now(),
      fromP: camera.position.clone(),
      fromT: controls.target.clone(),
      fromZ: camera.zoom,
      toP: pos,
      toT: target,
      toZ: zoom,
    };
  }
  function update(now) {
    const dt = Math.max(0, Math.min(0.1, (now - lastUpdate) / 1000));
    lastUpdate = now;
    if (flight) {
      const t = Math.min(1, (now - flight.start) / 1500),
        e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      camera.position.lerpVectors(flight.fromP, flight.toP, e);
      controls.target.lerpVectors(flight.fromT, flight.toT, e);
      camera.zoom = THREE.MathUtils.lerp(flight.fromZ, flight.toZ, e);
      camera.updateProjectionMatrix();
      if (t === 1) flight = null;
    } else if (now - lastInput > 20000) {
      if (!touring) {
        touring = true;
        onTour(true);
      }
      const p = camera.position.clone().sub(controls.target);
      p.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.028 * dt);
      camera.position.copy(controls.target).add(p);
    }
    controls.target.x = THREE.MathUtils.clamp(controls.target.x, -90, 90);
    controls.target.z = THREE.MathUtils.clamp(controls.target.z, -140, 95);
    controls.target.y = THREE.MathUtils.clamp(controls.target.y, 0, 55);
    controls.update();
  }
  function resize(w, h) {
    const aspect = w / h;
    camera.left = -140 * aspect;
    camera.right = 140 * aspect;
    camera.top = 140;
    camera.bottom = -140;
    camera.setViewOffset(w, h, w > 0.8 * h ? w * 0.055 : 0, 0, w, h);
    camera.updateProjectionMatrix();
  }
  return {
    camera,
    controls,
    fly,
    update,
    resize,
    interrupt,
    get flying() {
      return !!flight;
    },
    get selected() {
      return selected;
    },
    set onTour(fn) {
      onTour = fn;
    },
  };
}
