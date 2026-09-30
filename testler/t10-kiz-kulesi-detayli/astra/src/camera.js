import * as T from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
export class CameraRig {
  constructor(camera, element) {
    this.camera = camera;
    this.free = false;
    this.transition = 0;
    this.controls = new OrbitControls(camera, element);
    this.controls.enabled = false;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.06;
    this.controls.minDistance = 18;
    this.controls.maxDistance = 150;
    this.controls.maxPolarAngle = Math.PI * 0.485;
    this.controls.target.set(-3, 11, 0);
    this.controls.enablePan = false;
    const pts = [
      [46, 17, 69],
      [27, 5, 55],
      [-29, 4.1, 66],
      [-66, 17, 0],
      [-36, 26, -49],
      [27, 25, -32],
      [12, 24, 23],
      [34, 29, 42],
    ];
    const target = [
      [-5, 11, 0],
      [-3, 12, 0],
      [-3, 13, 0],
      [-3, 12, 0],
      [-3, 15, 0],
      [-3, 17, 0],
      [-3, 20, 0],
      [-3, 14, 0],
    ];
    this.path = new T.CatmullRomCurve3(
      pts.map((p) => new T.Vector3(...p)),
      true,
      "catmullrom",
      0.45,
    );
    this.targetPath = new T.CatmullRomCurve3(
      target.map((p) => new T.Vector3(...p)),
      true,
      "catmullrom",
      0.35,
    );
    this.look = new T.Vector3();
    this.desired = new T.Vector3();
    this.lastTarget = new T.Vector3(-3, 11, 0);
  }
  setFree(on) {
    if (on === this.free) return;
    this.free = on;
    this.controls.enabled = on;
    if (on) {
      this.controls.target.copy(this.lastTarget);
      this.controls.update();
    } else {
      this.transition = 1;
      this.from = this.camera.position.clone();
      this.fromLook = this.controls.target.clone();
    }
  }
  update(t, dt) {
    if (this.free) {
      this.controls.update();
      return;
    }
    let u = (((t % 60) + 60) % 60) / 60;
    this.path.getPoint(u, this.desired);
    this.targetPath.getPoint(u, this.look);
    if (this.transition > 0) {
      this.transition = Math.max(0, this.transition - dt * 0.45);
      const b = 1 - this.transition,
        k = b * b * (3 - 2 * b);
      this.camera.position.lerpVectors(this.from, this.desired, k);
      this.lastTarget.lerpVectors(this.fromLook, this.look, k);
    } else {
      this.camera.position.copy(this.desired);
      this.lastTarget.copy(this.look);
    }
    this.camera.lookAt(this.lastTarget);
  }
}
