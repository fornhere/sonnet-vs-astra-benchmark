import * as T from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { rng, glowTexture } from "./util.js";
import { seaHeight } from "./ocean.js";
export function environment(scene) {
  const random = rng(81),
    geos = [],
    lightGeo = [],
    cityMat = new T.MeshStandardMaterial({ color: 0x15232a, roughness: 1 }),
    lightsMat = new T.MeshBasicMaterial({
      color: 0xba9761,
      transparent: true,
      opacity: 0.65,
    });
  function put(g, x, y, z) {
    g.translate(x, y, z);
    geos.push(g);
  }
  function box(w, h, d, x, y, z) {
    put(new T.BoxGeometry(w, h, d), x, y, z);
  }
  function mosque(x, z, s = 1) {
    box(17 * s, 9 * s, 14 * s, x, 4.5 * s, z);
    put(
      new T.SphereGeometry(8 * s, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2),
      x,
      9 * s,
      z,
    );
    for (let dx of [-11, 11])
      for (let dz of [-8, 8]) {
        put(
          new T.CylinderGeometry(0.7 * s, 1.05 * s, 27 * s, 8),
          x + dx * s,
          13.5 * s,
          z + dz * s,
        );
        put(
          new T.CylinderGeometry(1.3 * s, 1.3 * s, 0.65 * s, 12),
          x + dx * s,
          20 * s,
          z + dz * s,
        );
        put(
          new T.ConeGeometry(0.95 * s, 6 * s, 8),
          x + dx * s,
          30 * s,
          z + dz * s,
        );
      }
    put(new T.CylinderGeometry(0.1 * s, 0.1 * s, 4 * s, 6), x, 18 * s, z);
  }
  // Two distinct inhabited shores; the open navigation channel remains between them.
  for (let side of [-1, 1]) {
    for (let i = 0; i < 95; i++) {
      let x = side * (95 + random() * 300),
        z = -190 - random() * 160,
        h = 2 + Math.pow(random(), 2) * 11;
      box(4 + random() * 10, h, 7 + random() * 10, x, h / 2 - 1, z);
      for (let j = 0; j < 3; j++) {
        let g = new T.PlaneGeometry(0.45, 0.65);
        g.translate(x + (random() - 0.5) * 5, 2 + random() * h, z + 10);
        lightGeo.push(g);
      }
    }
    box(280, 4, 35, side * 240, 0, -220);
  }
  mosque(-145, -240, 1.35);
  mosque(150, -240, 0.9);
  mosque(250, -300, 1.2);
  scene.add(new T.Mesh(mergeGeometries(geos), cityMat));
  scene.add(new T.Mesh(mergeGeometries(lightGeo), lightsMat));
  const ferry = new T.Group();
  scene.add(ferry);
  const hull = new T.MeshStandardMaterial({
      color: 0x15232c,
      roughness: 0.46,
      metalness: 0.25,
    }),
    white = new T.MeshStandardMaterial({ color: 0xa5ada9, roughness: 0.65 }),
    red = new T.MeshStandardMaterial({ color: 0x65472e });
  function fbox(w, h, d, mat, x, y, z) {
    const m = new T.Mesh(new T.BoxGeometry(w, h, d), mat);
    m.position.set(x, y, z);
    ferry.add(m);
  }
  const shape = new T.Shape();
  shape.moveTo(-12, -2.2);
  shape.lineTo(9, -2.2);
  shape.quadraticCurveTo(14, 0, 9, 2.2);
  shape.lineTo(-12, 2.2);
  shape.closePath();
  let hg = new T.ExtrudeGeometry(shape, {
    depth: 2,
    bevelEnabled: true,
    bevelSegments: 1,
    bevelSize: 0.25,
    bevelThickness: 0.3,
  });
  hg.rotateX(Math.PI / 2);
  const hm = new T.Mesh(hg, hull);
  hm.position.y = 1.3;
  ferry.add(hm);
  fbox(19, 2, 3.6, white, -1, 2, 0);
  fbox(16, 0.22, 4.6, white, -2, 3.2, 0);
  fbox(10, 1.7, 3.2, white, -1, 4, 0);
  fbox(12, 0.2, 3.8, white, -1, 4.9, 0);
  fbox(1.1, 2, 1.2, red, -3, 5.8, 0);
  fbox(0.13, 4, 0.13, hull, 5, 5.2, 0);
  const wm = new T.MeshBasicMaterial({ color: 0xffc779 });
  for (let x = -8; x < 7; x += 1.2)
    for (let z of [-1.85, 1.85]) fbox(0.72, 0.72, 0.03, wm, x, 2.3, z);
  for (let x = -5; x < 4; x += 1.1)
    for (let z of [-1.64, 1.64]) fbox(0.68, 0.7, 0.02, wm, x, 4, z);
  const ferryBuckets = new Map();
  for (const child of [...ferry.children]) {
    if (child.isMesh) {
      child.updateMatrix();
      const g = child.geometry.clone().applyMatrix4(child.matrix);
      if (!ferryBuckets.has(child.material))
        ferryBuckets.set(child.material, []);
      ferryBuckets.get(child.material).push(g.index ? g.toNonIndexed() : g);
      ferry.remove(child);
    }
  }
  for (const [mat, gs] of ferryBuckets)
    ferry.add(new T.Mesh(mergeGeometries(gs), mat));
  const gt = glowTexture();
  for (let x of [-10, 10]) {
    let m = new T.Sprite(
      new T.SpriteMaterial({
        map: gt,
        color: x < 0 ? 0xffaf58 : 0xb8ffca,
        depthWrite: false,
        blending: T.AdditiveBlending,
      }),
    );
    m.position.set(x, 3.5, 0);
    m.scale.set(4, 4, 1);
    ferry.add(m);
  }
  // Fine wake lines follow the ferry, broken into two diverging arms.
  const wake = new T.Group();
  for (let k = 0; k < 2; k++) {
    let pts = [];
    for (let i = 0; i < 35; i++)
      pts.push(
        new T.Vector3(-11 - i * 1.3, 0.08, (k ? 1 : -1) * (2 + i * 0.25)),
      );
    let line = new T.Line(
      new T.BufferGeometry().setFromPoints(pts),
      new T.LineBasicMaterial({
        color: 0x7f9a9f,
        transparent: true,
        opacity: 0.22,
      }),
    );
    wake.add(line);
  }
  ferry.add(wake);
  const birds = [];
  const birdMat = new T.MeshStandardMaterial({
    color: 0xa7b5b8,
    side: T.DoubleSide,
    roughness: 1,
  });
  for (let i = 0; i < 9; i++) {
    let b = new T.Group();
    for (let side of [-1, 1]) {
      let g = new T.BufferGeometry();
      g.setAttribute(
        "position",
        new T.Float32BufferAttribute(
          [0, 0, 0, side * 1.1, 0.05, -0.14, side * 0.45, 0, 0.25],
          3,
        ),
      );
      g.computeVertexNormals();
      let wing = new T.Mesh(g, birdMat);
      wing.userData.side = side;
      b.add(wing);
    }
    scene.add(b);
    birds.push(b);
  }
  return {
    cityMat,
    update(t, s, flash, dawn) {
      ferry.position.set(
        72 * Math.sin(t * 0.018) + 25,
        seaHeight(60, -95, t, s) * 0.65,
        -104,
      );
      ferry.rotation.set(
        Math.sin(t * 1.4) * 0.022 * s,
        Math.PI * 0.07,
        Math.sin(t * 1.1) * 0.042 * s,
      );
      for (let i = 0; i < birds.length; i++) {
        let b = birds[i],
          a = t * 0.085 + i * 0.6;
        b.position.set(
          Math.cos(a) * (22 + i * 1.7),
          26 + Math.sin(t * 0.4 + i) * 3 + i * 0.6,
          Math.sin(a) * 22 - 5,
        );
        b.rotation.y = -a - Math.PI / 2;
        b.children.forEach(
          (w) =>
            (w.rotation.z = Math.sin(t * 4.5 + i) * 0.37 * w.userData.side),
        );
      }
      cityMat.emissive.setRGB(0.028 * flash, 0.045 * flash, 0.065 * flash);
      lightsMat.opacity = 0.48 * (1 - dawn * 0.65);
    },
  };
}
