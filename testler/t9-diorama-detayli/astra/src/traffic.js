import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { THREE, random, geo } from "./core.js";
import { streetSegments } from "./buildings.js";
export function traffic(scene) {
  const count = 95,
    dummy = new THREE.Object3D(),
    c = new THREE.Color();
  const bodies = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.62, 0.35, 1.25),
    new THREE.MeshStandardMaterial({ roughness: 0.6 }),
    count,
  );
  const roofs = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.48, 0.24, 0.63),
    new THREE.MeshStandardMaterial({ color: "#a6c4be", roughness: 0.4 }),
    count,
  );
  bodies.castShadow = false;
  roofs.castShadow = false;
  scene.add(bodies, roofs);
  const routes = [];
  for (let i = 0; i < count; i++) {
    const path = streetSegments[Math.floor(random() * streetSegments.length)];
    routes.push({
      path,
      offset: random(),
      speed: 0.005 + random() * 0.006,
      dir: random() > 0.5 ? 1 : -1,
    });
    bodies.setColorAt(
      i,
      c.set(
        i % 4 === 0
          ? ["#bdb7a4", "#be715b", "#586f79", "#eee1c4"][i % 4]
          : "#e6b647",
      ),
    );
  }
  function boat(color, len, width) {
    const g = new THREE.Group(),
      parts = [];
    function part(w, h, d, y, col, z = 0, x = 0) {
      const geometry = new THREE.BoxGeometry(w, h, d);
      geometry.translate(x, y, z);
      const color = new THREE.Color(col);
      const colors = new Float32Array(geometry.attributes.position.count * 3);
      for (let i = 0; i < colors.length; i += 3) {
        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;
      }
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      parts.push(geometry);
    }
    part(width, 0.5, len, 0, "#e0d2ac");
    part(width * 0.83, 0.8, len * 0.8, 0.65, color);
    part(width * 0.78, 0.25, len * 0.84, 1.16, "#f1dfb6");
    part(width * 0.65, 0.6, len * 0.5, 1.6, "#d9e0cc");
    part(width * 0.66, 0.22, len * 0.43, 1.8, "#4e787b");
    part(width * 0.68, 0.2, len * 0.54, 2, "#f0dfb5");
    part(0.32, 0.9, 0.44, 2.5, "#bc7845");
    for (let side of [-1, 1])
      part(0.06, 0.16, len * 0.68, 0.79, "#476872", 0, side * width * 0.425);
    g.add(
      new THREE.Mesh(
        mergeGeometries(parts),
        new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.7 }),
      ),
    );
    parts.forEach((p) => p.dispose());
    scene.add(g);
    return g;
  }
  const ferry = boat("#d38b3e", 7.5, 2.8);
  const boats = [
    boat("#d3c3a0", 3.3, 1.2),
    boat("#faf0cf", 2.8, 0.9),
    boat("#aa7752", 4.1, 1.3),
  ];
  const wakeMaterial = new THREE.MeshBasicMaterial({
    color: "#bbd3c3",
    transparent: true,
    opacity: 0.25,
    depthWrite: false,
  });
  const wakes = [ferry, ...boats].map((b, i) => {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(i ? 1.4 : 3.5, i ? 5 : 8),
      wakeMaterial,
    );
    m.rotation.x = -Math.PI / 2;
    scene.add(m);
    return m;
  });
  return {
    count,
    update(t) {
      routes.forEach((r, i) => {
        const f = (((r.offset + t * r.speed * r.dir) % 1) + 1) % 1;
        const index = Math.min(
            r.path.length - 2,
            Math.floor(f * (r.path.length - 1)),
          ),
          mix = f * (r.path.length - 1) - index;
        const a = r.path[index],
          b = r.path[index + 1];
        const dx = b.x - a.x,
          dz = b.z - a.z;
        dummy.position.set(a.x + dx * mix + r.dir * 0.22, 0.91, a.z + dz * mix);
        dummy.rotation.set(
          0,
          Math.atan2(dx, dz) + (r.dir < 0 ? Math.PI : 0),
          0,
        );
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        bodies.setMatrixAt(i, dummy.matrix);
        dummy.position.y += 0.28;
        dummy.updateMatrix();
        roofs.setMatrixAt(i, dummy.matrix);
      });
      bodies.instanceMatrix.needsUpdate = true;
      roofs.instanceMatrix.needsUpdate = true;
      const f = (t * 0.009) % 1;
      ferry.position.set(-33 - f * 38, -0.9, 63 + f * 28);
      ferry.rotation.y = Math.atan2(-38, 28);
      boats.forEach((b, i) => {
        const a = (t * (0.005 + i * 0.0007) + i * 0.31) % 1;
        b.position.set(-56 + a * 30 - i * 3, -1.05, 49 - a * 136);
        b.rotation.y = Math.atan2(30, -136);
      });
      [ferry, ...boats].forEach((b, i) => {
        wakes[i].position.copy(b.position);
        wakes[i].position.y = -1.48;
        wakes[i].position.x -= Math.sin(b.rotation.y) * (i ? 3 : 7);
        wakes[i].position.z -= Math.cos(b.rotation.y) * (i ? 3 : 7);
        wakes[i].rotation.z = -b.rotation.y;
      });
    },
  };
}
