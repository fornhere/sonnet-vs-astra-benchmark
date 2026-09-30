import {
  THREE,
  box,
  geo,
  polygon,
  inside,
  random,
  textPlane,
  LANDMARKS,
} from "./core.js";
export const manhattan = polygon([
  [-74.0185, 40.7],
  [-74.014, 40.719],
  [-74.009, 40.739],
  [-74.007, 40.756],
  [-73.994, 40.778],
  [-73.977, 40.805],
  [-73.954, 40.833],
  [-73.936, 40.853],
  [-73.927, 40.871],
  [-73.916, 40.878],
  [-73.91, 40.873],
  [-73.913, 40.861],
  [-73.929, 40.842],
  [-73.934, 40.825],
  [-73.934, 40.804],
  [-73.941, 40.792],
  [-73.943, 40.777],
  [-73.958, 40.758],
  [-73.968, 40.744],
  [-73.974, 40.729],
  [-73.971, 40.721],
  [-73.975, 40.711],
  [-73.982, 40.708],
  [-73.995, 40.71],
  [-74.001, 40.706],
  [-74.008, 40.702],
  [-74.012, 40.701],
]);
const jersey = polygon([
  [-74.105, 40.665],
  [-74.105, 40.889],
  [-73.967, 40.889],
  [-74.016, 40.804],
  [-74.029, 40.776],
  [-74.035, 40.737],
  [-74.044, 40.716],
  [-74.066, 40.705],
  [-74.077, 40.691],
  [-74.078, 40.665],
]);
const east = polygon([
  [-73.869, 40.665],
  [-73.869, 40.889],
  [-73.899, 40.889],
  [-73.9, 40.866],
  [-73.917, 40.842],
  [-73.919, 40.817],
  [-73.915, 40.797],
  [-73.923, 40.776],
  [-73.942, 40.757],
  [-73.952, 40.74],
  [-73.96, 40.722],
  [-73.97, 40.71],
  [-73.982, 40.705],
  [-73.993, 40.704],
  [-73.999, 40.698],
  [-74.01, 40.686],
  [-74.018, 40.676],
  [-74.013, 40.665],
]);
export const angle = 0.49;
export function gridToWorld(u, v) {
  return {
    x: Math.cos(angle) * u - Math.sin(angle) * v,
    z: Math.sin(angle) * u + Math.cos(angle) * v,
  };
}
export function worldToGrid(x, z) {
  return {
    u: Math.cos(angle) * x + Math.sin(angle) * z,
    v: -Math.sin(angle) * x + Math.cos(angle) * z,
  };
}
export const parkCenter = geo(-73.9654, 40.7827);
export function isPark(x, z, margin = 0) {
  const a = worldToGrid(x - parkCenter.x, z - parkCenter.z);
  return Math.abs(a.u) < 8.6 + margin && Math.abs(a.v) < 22.6 + margin;
}
export function landAt(x, z) {
  return inside(x, z, manhattan);
}
export function terrain(scene) {
  box("solid", 0, -9, -24, 220, 5, 266, "#553826");
  box("solid", 0, -6.25, -24, 217, 1, 263, "#ab7850");
  box("solid", 0, -5.35, -24, 216, 1, 262, "#4d5152");
  box("solid", 0, -4.35, -24, 216, 1, 262, "#746f63");
  box("solid", 0, -3.4, -24, 216, 0.9, 262, "#5b827e");
  box("solid", 0, -2.65, -24, 216, 0.6, 262, "#a8b4a0");
  // Fine horizontal seams and end-grain: a cabinet-maker's laminated wooden base.
  for (let i = 0; i < 21; i++) {
    box(
      "solid",
      0,
      -11.2 + i * 0.22,
      109.06,
      219,
      0.045,
      0.06,
      i % 3 === 0 ? "#af8052" : "#473626",
    );
    box("solid", 110.05, -11.2 + i * 0.22, -24, 0.06, 0.035, 263, "#977049");
  }
  box("water", 0, -1.93, -24, 215, 0.75, 261, "#276e7c");
  let landCount = 0;
  const step = 1.8;
  for (let x = -106; x < 106; x += step)
    for (let z = -153; z < 105; z += step) {
      const m = landAt(x, z),
        outer = inside(x, z, jersey) || inside(x, z, east);
      if (m || outer) {
        const c = m
          ? random() > 0.8
            ? "#b7b39c"
            : "#c5c1a9"
          : random() > 0.8
            ? "#8b9982"
            : "#a4ad92";
        box("solid", x, -0.52, z, step, 1.9, step, c);
        landCount++;
      } else if (random() > 0.973) {
        box("water", x, -1.5, z, 1.0 + random() * 1.8, 0.055, 0.22, "#73afb2");
      }
    }
  // Manhattan waterfront rim is naturally terraced by the voxel shoreline.
  const plaque = box("metal", 0, -8, 109.13, 30, 3.5, 0.3, "#b89048");
  textPlane(scene, "N E W   Y O R K", [0, -8, 109.32], 25, 2.7, {
    color: "#342c20",
    size: 66,
    font: "Georgia",
  });
  for (let x of [-13.5, 13.5])
    box("metal", x, -8, 109.36, 0.45, 0.45, 0.18, "#584129");
  for (const [text, x, z, rot, w] of [
    ["H U D S O N  R I V E R", -54, -46, -0.49, 47],
    ["E A S T  R I V E R", 40, -44, -0.49, 42],
    ["U P P E R  B A Y", -26, 85, 0, 37],
  ]) {
    const l = textPlane(scene, text, [x, -1.47, z], w, 3, {
      color: "#b3d0c0",
      size: 52,
      font: "Arial",
    });
    l.rotation.set(-Math.PI / 2, 0, rot);
  }
  // Muted neighboring boroughs give the island a readable, geographic context.
  for (let x = -99; x < 100; x += 7)
    for (let z = -142; z < 92; z += 9) {
      if (
        (inside(x, z, jersey) || inside(x, z, east)) &&
        !landAt(x, z) &&
        random() > 0.26
      ) {
        const bridge = LANDMARKS.find((l) => l.id === "bridge");
        const dx = x - bridge.x,
          dz = z - bridge.z;
        if (
          Math.abs(dx * 0.81 + dz * 0.586) < 24 &&
          Math.abs(-dx * 0.586 + dz * 0.81) < 4.5
        )
          continue;
        const h = 1.4 + random() * 5;
        box("solid", x, h / 2 + 0.5, z, 4 + random() * 1.7, h, 5.5, "#aaa998");
        box("solid", x, h + 0.65, z, 3.5, 0.35, 4.5, "#bdbba8");
      }
    }
  return { landCount };
}
