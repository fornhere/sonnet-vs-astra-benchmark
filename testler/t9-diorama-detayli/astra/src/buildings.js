import { box, random, LANDMARKS } from "./core.js";
import { gridToWorld, worldToGrid, landAt, isPark, angle } from "./terrain.js";
export const streetSegments = [];
export function building(x, z, w, d, h, color, ry = angle, windows = true) {
  box("solid", x, 0.55 + h / 2, z, w, h, d, color, ry);
  box("solid", x, h + 0.74, z, w + 0.24, 0.4, d + 0.24, "#cdc2ac", ry);
  box("solid", x, h + 0.99, z, w * 0.71, 0.3, d * 0.72, "#77776c", ry);
  box("solid", x, 0.58, z, w + 0.7, 0.2, d + 0.7, "#999a87", ry);
  if (h > 8) {
    box("solid", x + 0.3, h + 1.4, z - 0.3, 1.1, 0.8, 1, "#ada28b", ry);
  }
  if (!windows) return;
  const co = Math.cos(ry),
    si = Math.sin(ry);
  function win(lx, lz, y, ww, dd) {
    const lit = random() > 0.3;
    box(
      lit ? "window" : "glass",
      x + co * lx + si * lz,
      y,
      z - si * lx + co * lz,
      ww,
      0.52,
      dd,
      lit ? "#b7b39a" : "#596d6b",
      ry,
    );
  }
  for (let y = 2.1; y < h - 0.25; y += 2.1) {
    for (let a = -w / 2 + 0.75; a < w / 2 - 0.3; a += 1.35) {
      win(a, d / 2 + 0.018, y, 0.5, 0.05);
      win(a, -d / 2 - 0.018, y, 0.5, 0.05);
    }
    for (let a = -d / 2 + 0.8; a < d / 2 - 0.3; a += 1.5) {
      win(w / 2 + 0.018, a, y, 0.05, 0.55);
      win(-w / 2 - 0.018, a, y, 0.05, 0.55);
    }
  }
}
function nearLandmark(x, z) {
  const bridge = LANDMARKS.find((l) => l.id === "bridge");
  const dx = x - bridge.x,
    dz = z - bridge.z;
  if (
    Math.abs(dx * 0.81 + dz * 0.586) < 24 &&
    Math.abs(-dx * 0.586 + dz * 0.81) < 4.6
  )
    return true;
  return LANDMARKS.some((l) => {
    if (l.id === "park" || l.id === "bridge" || l.id === "liberty")
      return false;
    return (
      Math.hypot(x - l.x, z - l.z) <
      (l.id === "wtc"
        ? 7.2
        : l.id === "empire"
          ? 6.1
          : l.id === "grand"
            ? 7
            : l.id === "times"
              ? 7
              : l.id === "flatiron"
                ? 6.1
                : 5.2)
    );
  });
}
export function buildings() {
  // Streets follow Manhattan's rotated orthogonal grid, with narrow crosswalks.
  for (let u = -52; u < 54; u += 4.4) {
    let run = [];
    for (let v = -153; v < 95; v += 1.7) {
      const p = gridToWorld(u, v);
      if (landAt(p.x, p.z) && !isPark(p.x, p.z)) {
        box("solid", p.x, 0.48, p.z, 0.85, 0.08, 1.8, "#777e76", -angle);
        if (Math.floor(v) % 9 === 0)
          box("solid", p.x, 0.533, p.z, 0.09, 0.012, 0.5, "#ded3a7", -angle);
        run.push(p);
      } else if (run.length > 5) {
        streetSegments.push(run);
        run = [];
      }
    }
    if (run.length > 5) streetSegments.push(run);
  }
  for (let v = -148; v < 89; v += 4.4) {
    for (let u = -55; u < 53; u += 1.4) {
      const p = gridToWorld(u, v);
      if (landAt(p.x, p.z) && !isPark(p.x, p.z)) {
        box("solid", p.x, 0.49, p.z, 1.5, 0.08, 0.75, "#7e8378", -angle);
      }
    }
  }
  const colors = [
    "#9b7f63",
    "#af9672",
    "#c1ad89",
    "#7d928c",
    "#cbbb96",
    "#a67e62",
    "#b3a082",
    "#527b83",
  ];
  let count = 0;
  for (let u = -49.8; u < 53; u += 4.4)
    for (let v = -145.8; v < 90; v += 4.4) {
      const p = gridToWorld(u, v);
      if (!landAt(p.x, p.z) || isPark(p.x, p.z, 1.5) || nearLandmark(p.x, p.z))
        continue;
      const corners = [
        [-1.55, -1.55],
        [1.55, 1.55],
        [-1.55, 1.55],
        [1.55, -1.55],
      ];
      if (
        !corners.every(([a, b]) => {
          const q = gridToWorld(u + a, v + b);
          return landAt(q.x, q.z);
        })
      )
        continue;
      const downtown = Math.exp(-((p.x + 26) ** 2 + (p.z - 42) ** 2) / 230),
        midtown = Math.exp(-(p.x ** 2 + (p.z + 6) ** 2) / 600);
      let h =
        3 +
        random() * 6 +
        (0.2 + Math.pow(random(), 1.5) * 0.85) * (21 * midtown + 25 * downtown);
      if (p.z < -70) h *= 0.7;
      if (p.x > -2 && p.x < 10 && p.z > -2 && p.z < 13) h = Math.min(h, 5.2);
      const w = 2.8 + random() * 0.4,
        d = 2.7 + random() * 0.4;
      building(
        p.x,
        p.z,
        w,
        d,
        h,
        colors[Math.floor(random() * colors.length)],
        -angle,
      );
      if (h > 18) {
        box(
          "solid",
          p.x,
          h + 1.9,
          p.z,
          w * 0.64,
          2,
          d * 0.65,
          colors[count % colors.length],
          -angle,
        );
        box("metal", p.x, h + 3.7, p.z, 0.12, 2, 0.12, "#79796d");
      }
      count++;
    }
  // Broadway: diagonal, pale asphalt inlaid across the street grid.
  const broadway = [
    [-74.013, 40.706],
    [-74.009, 40.718],
    [-73.995, 40.731],
    [-73.9897, 40.7411],
    [-73.987, 40.749],
    [-73.9855, 40.758],
    [-73.982, 40.769],
    [-73.969, 40.789],
    [-73.95, 40.815],
  ];
  const points = broadway.map(([lon, lat]) => ({
    x: (lon + 73.98) * 850,
    z: -(lat - 40.75) * 1120,
  }));
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1],
      b = points[i],
      dx = b.x - a.x,
      dz = b.z - a.z,
      dist = Math.hypot(dx, dz);
    for (let t = 0; t < dist; t += 0.7) {
      const f = t / dist;
      box(
        "solid",
        a.x + dx * f,
        0.58,
        a.z + dz * f,
        1.45,
        0.13,
        0.85,
        "#b4ac8e",
        Math.atan2(dx, dz),
      );
    }
  }
  return { count };
}
