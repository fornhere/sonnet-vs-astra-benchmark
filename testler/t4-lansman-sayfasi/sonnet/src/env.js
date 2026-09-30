import * as THREE from 'three';

/* Stüdyo ışık odası: karanlık bir küp + yumuşak kutular. PMREM ile yansıma haritasına çevrilir. */
export function makeStudioEnv(renderer) {
  const scene = new THREE.Scene();
  const room = new THREE.Mesh(
    new THREE.BoxGeometry(40, 40, 40),
    new THREE.MeshBasicMaterial({ color: 0x07080b, side: THREE.BackSide })
  );
  scene.add(room);
  const panel = (w, h, pos, color, k) => {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(k), side: THREE.DoubleSide })
    );
    m.position.set(...pos);
    m.lookAt(0, 0, 0);
    scene.add(m);
    return m;
  };
  // ana üst kutu
  panel(16, 10, [0, 15, 4], 0xffffff, 4.2);
  // yan şeritler (uzun metal yansımaları)
  panel(2.2, 22, [-13, 1, 3], 0xfff1e0, 5);
  panel(2.2, 22, [13, 2, 2], 0xd8e8ff, 6);
  // arka kenar ışığı
  panel(18, 3, [0, 5, -15], 0xffe2c2, 6);
  // ön dolgu (cam ve kadranı yıkamasın diye loş)
  panel(12, 8, [-7, -3, 15], 0xffffff, 0.9);
  panel(5, 5, [8, 7, 14], 0xfff6ea, 2.4);
  // alt sıcak bounce
  panel(20, 6, [0, -14, 2], 0xffb27a, 1.2);
  // küçük sert nokta ışıklar (parlak vurgu noktaları)
  panel(1.2, 1.2, [-6, 9, 10], 0xffffff, 12);
  panel(1.0, 1.0, [7, -4, 12], 0xffffff, 6);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const rt = pmrem.fromScene(scene, 0.015, 0.1, 100);
  scene.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); });
  pmrem.dispose();
  return rt.texture;
}
