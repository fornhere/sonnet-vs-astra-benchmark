import {
  THREE,
  box,
  batches,
  geo,
  LANDMARKS,
  random,
  line,
  textPlane,
  label,
} from "./core.js";
import { building } from "./buildings.js";
import {
  parkCenter,
  gridToWorld,
  worldToGrid,
  landAt,
  isPark,
  angle,
} from "./terrain.js";
export const billboards = [];
function B(x, z, lx, y, lz, w, h, d, c, k = "solid", ry = 0) {
  box(k, x + lx, y, z + lz, w, h, d, c, ry);
}
function beam(a, b, width, color, scene) {
  const start = new THREE.Vector3(...a),
    end = new THREE.Vector3(...b);
  const pos = start.clone().add(end).multiplyScalar(0.5);
  const len = start.distanceTo(end);
  const q = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    end.sub(start).normalize(),
  );
  (batches.solid ??= []).push({
    x: pos.x,
    y: pos.y,
    z: pos.z,
    w: width,
    h: len,
    d: width,
    color,
    ry: 0,
    quat: q.toArray(),
  });
}
export function tree(x, z, scale = 1, c) {
  box(
    "solid",
    x,
    1.3 * scale,
    z,
    0.28 * scale,
    1.8 * scale,
    0.28 * scale,
    "#77694a",
  );
  const colors = ["#315c3d", "#46774a", "#5b864b", "#769551", "#a28f40"];
  const color = c || colors[Math.floor(random() * colors.length)];
  box(
    "leaves",
    x,
    2.3 * scale,
    z,
    1.45 * scale,
    1.5 * scale,
    1.45 * scale,
    color,
  );
  box(
    "leaves",
    x + 0.2 * scale,
    3.2 * scale,
    z - 0.1 * scale,
    0.95 * scale,
    0.65 * scale,
    0.95 * scale,
    color,
  );
}
export function landmarks(scene) {
  for (const l of LANDMARKS) {
    const { x, z } = l;
    const b = (...a) => {
      if (l.id === "grand") {
        a[0] *= 0.8;
        a[2] *= 0.8;
        a[3] *= 0.8;
        a[5] *= 0.8;
      }
      B(x, z, ...a);
    };
    switch (l.id) {
      case "empire": {
        b(0, 2, 0, 8, 3, 6.7, "#cabb98");
        b(0, 6, 0, 6.6, 6, 5.5, "#c7b78f");
        b(0, 10.5, 0, 5.5, 3, 4.7, "#d5c59e");
        b(0, 24, 0, 4.7, 25, 4, "#c5b68e");
        b(0, 39, 0, 3.65, 6, 3.15, "#d9c9a2");
        b(0, 43.6, 0, 2.75, 3.4, 2.5, "#cdbd96");
        b(0, 47, 0, 1.7, 3.5, 1.8, "#d6c9a8");
        b(0, 51, 0, 0.95, 4.5, 1, "#c7c8b9");
        b(0, 56, 0, 0.24, 6, 0.24, "#d5d7cb", "metal");
        for (let y = 4; y < 42; y += 1.4)
          for (let xx = -1.8; xx < 2; xx += 0.65) {
            const width = y > 37 ? 1.5 : 2.1;
            if (Math.abs(xx) > width) continue;
            for (let side of [-1, 1])
              b(
                xx,
                y,
                side * (y > 37 ? 1.59 : 2.025),
                0.23,
                0.65,
                0.05,
                "#687b79",
                "window",
              );
          }
        for (let s of [-1, 1])
          for (let p = -1.6; p < 2; p += 0.75)
            b(s * 2.37, 24, p, 0.13, 25, 0.2, "#e0d0a8");
        break;
      }
      case "chrysler": {
        building(x, z, 5.2, 5, 25, "#b6afa0", 0);
        b(0, 28, 0, 4.2, 5, 4, "#c6c6b6");
        b(0, 32, 0, 3.5, 3, 3.5, "#cbd1c4", "metal");
        for (let i = 0; i < 7; i++) {
          const w = 3.45 - i * 0.39;
          b(0, 34.2 + i * 1.18, 0, w, 0.93, w, "#d6ddd2", "metal");
          b(
            0,
            34.68 + i * 1.18,
            0,
            w + 0.13,
            0.14,
            w + 0.13,
            "#8caaa6",
            "metal",
          );
          for (let side of [-1, 1]) {
            for (let j = -1; j <= 1; j++) {
              if (w > 0.9)
                b(
                  j * w * 0.23,
                  34.25 + i * 1.18,
                  side * (w / 2 + 0.022),
                  0.22,
                  0.5,
                  0.04,
                  "#587c7e",
                  "window",
                );
            }
          }
        }
        for (let tier = 0; tier < 6; tier++) {
          const radius = 1.65 - tier * 0.21,
            base = 33.7 + tier * 1.1,
            depth = 1.76 - tier * 0.19;
          for (let j = 0; j <= 16; j++) {
            const a = (j / 16) * Math.PI;
            for (const side of [-1, 1])
              b(
                Math.cos(a) * radius,
                base + Math.sin(a) * radius,
                side * depth,
                0.19,
                0.19,
                0.16,
                "#ecede0",
                "metal",
              );
          }
          for (const side of [-1, 1])
            for (const xx of [-0.65, 0, 0.65])
              for (let row = 0; row < 3; row++)
                if (Math.abs(xx) < radius * 0.8)
                  b(
                    xx,
                    base + 0.3 + row * 0.16,
                    side * (depth + 0.04),
                    0.3 - row * 0.075,
                    0.15,
                    0.04,
                    "#406978",
                    "window",
                  );
        }
        b(0, 44, 0, 0.4, 5, 0.4, "#dce5d8", "metal");
        b(0, 47.5, 0, 0.13, 3, 0.13, "#e5eadc", "metal");
        for (const a of [-1, 1])
          for (const d of [-1, 1]) {
            b(
              a * 2.3,
              29.1,
              d * 2.3,
              1.1,
              0.35,
              0.6,
              "#d4dacc",
              "metal",
              a * 0.6,
            );
            b(a * 2.65, 29.4, d * 2.4, 0.45, 0.55, 0.4, "#e5e4ce", "metal");
          }
        break;
      }
      case "wtc": {
        b(0, 0.9, 0, 11, 0.8, 10, "#aebcba");
        for (let i = 0; i < 31; i++) {
          const y = 2 + i * 1.75;
          const cut = (i / 30) * 3.3;
          for (let iz = 0; iz < 15; iz++) {
            const zz = -3.15 + iz * 0.45,
              w = 2 * Math.min(3.4, 6.7 - cut - Math.abs(zz));
            b(
              0,
              y + 0.8,
              zz,
              w,
              1.73,
              0.455,
              i % 4 === 0 ? "#618e9e" : "#739ea9",
              "metal",
            );
            b(0, y + 1.67, zz, w + 0.016, 0.065, 0.457, "#b5ccc7", "metal");
          }
          for (const side of [-1, 1]) {
            const w = 2 * Math.min(3.4, 3.55 - cut);
            for (let a = -w / 2 + 0.25; a < w / 2; a += 0.5)
              b(
                a,
                y + 0.8,
                side * 3.382,
                0.055,
                1.62,
                0.026,
                "#a8c6c6",
                "window",
              );
          }
        }
        b(0, 56, 0, 2.5, 2, 2.5, "#b4c8c4", "metal");
        b(0, 63, 0, 0.22, 12, 0.22, "#d5ddd1", "metal");
        for (const a of [-1, 1]) {
          b(a * 5, 0.8, 3.7, 3.5, 0.35, 3.5, "#566e6c");
          b(a * 5, 1, 3.7, 2.6, 0.12, 2.6, "#345657", "water");
        }
        break;
      }
      case "flatiron": {
        // Narrow, genuinely triangular floor plates assembled from rectangular voxels.
        for (let row = 0; row < 16; row++) {
          const zz = -3.7 + row * 0.46,
            w = 0.42 + row * 0.285;
          b(0, 10.3, zz, w, 19.5, 0.48, "#cabb9e", "solid", 0);
          b(0, 20.3, zz, w + 0.28, 0.6, 0.5, "#dfcfac");
          for (let y = 2.2; y < 19.5; y += 1.65) {
            for (const s of [-1, 1])
              b(
                s * (w / 2 + 0.035),
                y,
                zz,
                0.055,
                0.75,
                0.26,
                "#788580",
                "window",
              );
          }
        }
        for (let y = 3; y < 20; y += 3.3)
          b(0, y, 3.45, 4.9, 0.15, 0.12, "#e0d0ad");
        for (let xx = -1.8; xx <= 1.8; xx += 0.65)
          for (let y = 2; y < 19; y += 1.65)
            b(xx, y, 3.49, 0.34, 0.72, 0.07, "#7c8780", "window");
        b(0, 1, -4.7, 2, 0.35, 2, "#c5bba1");
        break;
      }
      case "rockefeller": {
        building(x, z, 6.2, 3.5, 31, "#bdae91", 0);
        b(0, 34, 0, 4.8, 5, 3.15, "#cbbda0");
        b(0, 38, 0, 3.3, 3, 2.5, "#d3c5a6");
        b(0, 40.1, 0, 2.5, 1.3, 2, "#ddd0b0");
        for (let a = -2.7; a < 3; a += 0.65)
          b(a, 18, 1.8, 0.16, 27, 0.12, "#e0cdaa");
        b(5.2, 0.71, 0, 4, 0.18, 7, "#aaa895");
        b(5.2, 0.86, 0, 2.5, 0.2, 4.7, "#85b7b8", "water");
        b(3.4, 1.2, 0, 0.6, 1, 0.5, "#c9a24b", "metal");
        for (let i = -3; i <= 3; i++) {
          b(7.2, 2, i, 0.06, 2.5, 0.06, "#aea389", "metal");
          b(7.45, 3, i, 0.5, 0.5, 0.06, i % 2 ? "#d3b68a" : "#bd7869");
        }
        break;
      }
      case "grand": {
        b(0, 2.8, 0, 7, 4.6, 5.4, "#d3c5aa");
        b(0, 5.3, 0, 7.4, 0.55, 5.8, "#e0d0b1");
        b(0, 6.6, -0.45, 5.6, 2.2, 3.3, "#749b8b", "metal");
        b(0, 7.7, -0.45, 4.9, 0.35, 3.1, "#8aab97");
        for (let a = -1; a <= 1; a++) {
          b(a * 1.8, 3.2, 2.73, 1.2, 2.6, 0.06, "#527471", "window");
          b(a * 1.8, 4.6, 2.73, 0.8, 0.45, 0.07, "#587a75", "window");
        }
        for (let a = -3; a <= 3; a += 1.5)
          b(a, 3, 2.95, 0.35, 4.1, 0.45, "#e4d5b5");
        for (let i = 0; i < 4; i++)
          b(0, 5.8 + i * 0.4, 2.7, 4 - i * 0.9, 0.4, 0.6, "#d6c9a9");
        b(0, 7.75, 2.7, 0.55, 0.65, 0.35, "#c9a650", "metal");
        b(0, 1.8, 2.99, 1.1, 1.6, 0.08, "#405855");
        for (let i = 0; i < 3; i++)
          b(0, 0.6 + i * 0.12, 3.2 + i * 0.3, 8, 0.13, 0.35, "#d1c1a2");
        break;
      }
      case "times": {
        building(x, z, 4.2, 3.6, 20, "#8b9187", 0);
        b(0, 23, 0, 3.1, 5, 2.8, "#7c8982");
        b(-3.8, 10, -1, 2.5, 19, 4.7, "#a5a18c");
        for (const spec of [
          [0, 17, 1.91, 3.75, 3.5, "NEW YORK", "#d84d22"],
          [0, 12.3, 1.92, 3.8, 4.5, "BROADWAY", "#dfac12"],
          [-3.8, 13, 1.4, 2.3, 5.5, "JAZZ", "#169eaa"],
          [-3.8, 6.2, 1.4, 2.2, 4.5, "NYC", "#c9387b"],
          [0, 23, 1.5, 2.7, 2, "24 / 7", "#9ebc9e"],
        ]) {
          const [a, y, c, w, h, text, col] = spec;
          const plane = textPlane(scene, text, [x + a, y, z + c], w, h, {
            bg: col,
            color: "#fff8dd",
            width: 512,
            height: 512,
            size: text.length > 7 ? 61 : 87,
            font: "Arial Black",
          });
          plane.material.toneMapped = false;
          plane.userData.frames = [
            plane.material.map,
            label(
              text === "NEW YORK"
                ? "HELLO NYC"
                : text === "BROADWAY"
                  ? "TONIGHT"
                  : text === "JAZZ"
                    ? "LIVE"
                    : text === "NYC"
                      ? "LOVE"
                      : "THE CITY",
              {
                bg: col,
                color: "#fff8dd",
                width: 512,
                height: 512,
                size: 65,
                font: "Arial Black",
              },
            ),
          ];
          billboards.push(plane);
          b(a, y, c - 0.1, w + 0.25, h + 0.25, 0.16, "#454d46");
        }
        for (let i = 0; i < 7; i++)
          b(0, 0.7 + i * 0.14, 4 + i * 0.33, 2.2, 0.15, 0.35, "#c26245");
        break;
      }
      case "liberty": {
        for (let ix = -7; ix <= 7; ix++)
          for (let iz = -5; iz <= 5; iz++)
            if ((ix / 7) ** 2 + (iz / 5) ** 2 < 1) {
              b(ix * 1.1, -0.35, iz * 1.1, 1.1, 2.5, 1.1, "#b4b097");
              b(
                ix * 1.1,
                1,
                iz * 1.1,
                1.1,
                0.2,
                1.1,
                Math.abs(ix) < 3 && Math.abs(iz) < 3 ? "#c9bba0" : "#759167",
              );
            }
        b(0, 1.6, 0, 5, 1, 4.8, "#aa9879");
        b(0, 2.5, 0, 3.5, 0.8, 3.3, "#c5b393");
        b(0, 4, 0, 2.8, 2.3, 2.6, "#bba885");
        b(0, 5.3, 0, 3.3, 0.4, 3, "#d6c39f");
        const green = "#78a88c",
          light = "#8fbaa0",
          dark = "#5e927b";
        for (let i = 0; i < 9; i++)
          b(
            -0.15 + i * 0.035,
            5.7 + i * 0.58,
            0,
            2.2 - i * 0.12,
            0.6,
            1.55 - i * 0.06,
            i % 3 === 0 ? light : green,
          );
        b(0.1, 11, 0, 1.25, 1.3, 0.92, green);
        b(0.13, 12.25, 0, 0.9, 1.15, 0.86, light);
        b(0.15, 12.98, 0, 1.24, 0.24, 1.05, dark);
        b(0.15, 12.9, 0.45, 0.68, 0.15, 0.14, green);
        b(0.1, 12.4, 0.48, 0.13, 0.2, 0.12, "#a2c4a7");
        beam([x - 0.5, 10.9, z], [x - 1.65, 12.3, z], 0.58, green, scene);
        beam([x - 1.65, 12.3, z], [x - 1.9, 14.5, z], 0.46, light, scene);
        b(-1.9, 14.7, 0, 0.7, 0.3, 0.65, "#6a987e");
        b(-1.9, 15.25, 0, 0.25, 0.9, 0.25, "#c2a14e", "metal");
        b(-1.9, 15.8, 0, 0.48, 0.7, 0.48, "#ffcf65", "glow");
        b(-1.9, 16.25, 0, 0.25, 0.4, 0.25, "#ffe0a0", "glow");
        beam(
          [x + 0.55, 10.8, z],
          [x + 1.15, 9.8, z + 0.25],
          0.56,
          green,
          scene,
        );
        b(1.05, 9.7, 0.55, 0.85, 1.4, 0.28, "#6d9b80", "solid", -0.25);
        for (let i = 0; i < 7; i++) {
          const a = (i / 6) * Math.PI;
          beam(
            [x + 0.15 + Math.cos(a) * 0.5, 13, z + Math.sin(a) * 0.3],
            [
              x + 0.15 + Math.cos(a) * 1.13,
              13.55 + Math.sin(a) * 0.3,
              z + Math.sin(a) * 0.6,
            ],
            0.14,
            light,
            scene,
          );
        }
        for (let i = 0; i < 7; i++) {
          const a = (i * Math.PI * 2) / 7;
          tree(x + Math.cos(a) * 5.4, z + Math.sin(a) * 3.7, 0.75);
        }
        break;
      }
      case "bridge": {
        const dir = new THREE.Vector3(0.81, 0, 0.586),
          cross = new THREE.Vector3(-dir.z, 0, dir.x);
        function P(t, y, s = 0) {
          return [x + dir.x * t + cross.x * s, y, z + dir.z * t + cross.z * s];
        }
        const ry = Math.atan2(dir.x, dir.z);
        b(0, 5, 0, 4.2, 0.8, 39, "#b9aa8b", "solid", ry);
        for (let s of [-1, 1]) {
          const q = P(0, 5.65, s * 1.85);
          box("solid", q[0], q[1], q[2], 0.17, 0.7, 39, "#a39172", ry);
        }
        for (let t of [-9, 9]) {
          for (let s of [-1.45, 1.45]) {
            const p = P(t, 8.8, s);
            box("solid", p[0], p[1], p[2], 1.2, 16, 1.65, "#b6aa8d", ry);
          }
          for (let y of [13.3, 14.1, 14.9, 15.7, 16.5]) {
            const w = y < 15 ? 2.1 : 4.3;
            const p = P(t, y);
            box("solid", p[0], p[1], p[2], w, 0.8, 1.7, "#c7b99a", ry);
          }
          const p = P(t, 17.2);
          box("solid", p[0], p[1], p[2], 4.7, 0.5, 2, "#d6c7a7", ry);
        }
        for (let s of [-1.8, 1.8]) {
          const pts = [];
          for (let t = -19; t <= 19; t += 0.5) {
            let y;
            if (t < -9) y = 6 + ((t + 19) / 10) * 10;
            else if (t > 9) y = 16 - ((t - 9) / 10) * 10;
            else y = 7 + 9 * (t / 9) ** 2;
            pts.push(P(t, y, s));
            if (Math.round(t * 2) % 3 === 0)
              beam(P(t, 5.6, s), P(t, y, s), 0.07, "#706e5e", scene);
          }
          line(scene, pts, "#625f50", 0.13);
          for (let t of [-9, 9])
            for (let to of [-18, -14, -5, 0, 5, 14, 18])
              if (Math.abs(to - t) < 15)
                beam(P(t, 16, s), P(to, 5.7, s), 0.065, "#85816b", scene);
        }
        for (let t = -18; t < 19; t += 1.5) {
          const p = P(t, 5.45);
          box("solid", p[0], p[1], p[2], 0.1, 0.03, 0.7, "#e7d9af", ry);
        }
        break;
      }
      case "park": {
        for (let u = -8.4; u < 8.5; u += 1.2)
          for (let v = -22.2; v < 22.3; v += 1.2) {
            const p = gridToWorld(u, v);
            const px = x + p.x,
              pz = z + p.z;
            const lake =
              ((u + 1.9) / 5.6) ** 2 + ((v + 8) / 5.7) ** 2 < 1 ||
              ((u - 2.5) / 3.4) ** 2 + ((v - 6) / 3.8) ** 2 < 1;
            box(
              lake ? "water" : "solid",
              px,
              0.71,
              pz,
              1.21,
              0.32,
              1.21,
              lake
                ? "#387f88"
                : ["#527f46", "#6b914f", "#80a55c"][Math.floor(random() * 3)],
              -angle,
            );
            const path =
              Math.abs(u - Math.sin(v * 0.2) * 4) < 0.75 ||
              Math.abs(v - 1.5) < 0.6;
            if (path && !lake)
              box("solid", px, 0.91, pz, 1.22, 0.12, 1.22, "#cbbd94", -angle);
            else if (
              !lake &&
              random() > 0.79 &&
              !(Math.abs(u) < 4 && v > 10 && v < 17)
            )
              tree(px, pz, 0.72 + random() * 0.42);
          }
        for (let i = 0; i < 17; i++) {
          const p = gridToWorld(i % 2 === 0 ? -9 : 9, -21 + i * 2.6);
          tree(x + p.x, z + p.z, 0.7);
        }
        for (let i = -2; i <= 2; i++)
          b(i * 0.7, 1.2, 5, 0.7, 0.3, 1.1, "#b8ab86");
        break;
      }
    }
  }
  // Pocket parks, avenue trees and piers.
  for (let i = 0; i < 190; i++) {
    const x = -36 + random() * 94,
      z = -139 + random() * 194;
    if (
      landAt(x, z) &&
      !isPark(x, z) &&
      !LANDMARKS.some((l) => Math.hypot(l.x - x, l.z - z) < 5)
    )
      tree(x, z, 0.48 + random() * 0.28);
  }
  for (let i = 0; i < 8; i++)
    box(
      "solid",
      -27 - i * 1.75,
      0.25,
      14 - i * 8,
      8,
      0.8,
      1.8,
      "#ada589",
      -0.1,
    );
}
