"""Koy: gol kiyisinda yari ahsap evler, kilise, iskele."""
import math
import random
import numpy as np
from terrain import sample_height
import castle as C

PI = math.pi


def build_village(b, xs, ys, H, road, center=(-236.0, -92.0), n_houses=20, seed=9):
    R = random.Random(seed)
    cx, cy = center
    placed = []
    sx, sy = road.xy[:, 0], road.xy[:, 1]

    def ground(x, y):
        return float(sample_height(xs, ys, H, np.array([x]), np.array([y]))[0])

    def free(x, y, r):
        if ground(x, y) < 3.2:
            return False
        for (px, py, pr) in placed:
            if (x - px) ** 2 + (y - py) ** 2 < (r + pr) ** 2:
                return False
        # yol kenari
        d = np.min((sx - x) ** 2 + (sy - y) ** 2)
        return d > (r + 4.0) ** 2

    tries = 0
    while len(placed) < n_houses and tries < 4000:
        tries += 1
        a = R.uniform(0, 2 * PI)
        rr = R.uniform(8, 62) ** 1.0
        x, y = cx + rr * math.cos(a) * 1.15, cy + rr * math.sin(a) * 0.85
        w = R.uniform(5.5, 9.0)
        d = R.uniform(7.5, 13.0)
        rad = math.hypot(w, d) * 0.55
        if not free(x, y, rad):
            continue
        # sokaga (merkeze) dogru yon + rastgele
        rot = math.atan2(cy - y, cx - x) + R.choice([0, PI / 2]) + R.uniform(-0.25, 0.25)
        z0 = ground(x, y) + 0.05
        h = R.uniform(4.2, 6.2)
        rm = R.choice(["roof_red", "roof_red", "roof_red", "roof_dark"])
        C.timber_house(b, x, y, w, d, h, rot, rm, None, chimney=True, roof_h=w * R.uniform(0.6, 0.85),
                       floors=2 if h > 5 else 1, z0=z0, wall="plaster")
        placed.append((x, y, rad))
    # kilise: merkeze yakin
    for (kx, ky) in [(cx + 6, cy - 4), (cx + 14, cy + 6), (cx - 6, cy + 10), (cx + 22, cy - 6)]:
        if free(kx, ky, 12):
            church(b, kx, ky, ground(kx, ky) + 0.05, rot=R.uniform(-0.3, 0.3))
            placed.append((kx, ky, 12))
            break
    # iskele
    pier(b, xs, ys, H, cx, cy)
    return placed


def church(b, x, y, z0, rot=0.0):
    w, d, h = 7.5, 15.0, 7.5
    b.box(x, y, z0 - 2.0, w + 0.8, d + 0.8, 3.0, rot=rot, mat="stone_big")
    b.box(x, y, z0 + 0.9, w, d, h - 0.9, rot=rot, mat="stone_light")
    b.gable(x, y, z0 + h, w, d, 5.2, rot=rot, over=0.6, mat_roof="roof_slate", mat_wall="stone_light")
    c, s = math.cos(rot), math.sin(rot)
    for side in (-1, 1):
        for k in range(3):
            off = (k - 1) * 4.0
            px, py = x + side * w / 2 * c - off * s, y + side * w / 2 * s + off * c
            C.window(b, px, py, z0 + 2.3, rot + (0 if side == 1 else PI), 1.1, 3.2, glow=0.9)
    # kule
    tx, ty = x - (d / 2 + 1.5) * s * -1 * 0 - 0 * c, y
    tx = x - s * (-d / 2 - 1.8)
    ty = y + c * (-d / 2 - 1.8)
    b.box(tx, ty, z0 - 2.0, 4.6, 4.6, 3.0, rot=rot, mat="stone_big")
    b.box(tx, ty, z0 + 1.0, 4.0, 4.0, 13.0, rot=rot, mat="stone_light")
    for i in range(4):
        a = rot + i * PI / 2
        C.window(b, tx + 2.0 * math.cos(a), ty + 2.0 * math.sin(a), z0 + 9.0, a, 0.9, 2.6, glow=0.7)
    b.pyramid(tx, ty, z0 + 14.0, 4.8, 4.8, 9.0, rot=rot, mat="roof_slate")
    b.cyl(tx, ty, z0 + 22.8, 0.12, 2.2, 6, "gold")


def pier(b, xs, ys, H, cx, cy):
    # kiyi noktasini bul: -y yonunde
    px = cx - 8
    py = cy
    for t in range(0, 200):
        h = float(sample_height(xs, ys, H, np.array([px]), np.array([py - t]))[0])
        if h < 0.5:
            py = py - t
            break
    z = 1.05
    L = 24.0
    for k in range(int(L / 0.9)):
        yy = py + 3.0 - k * 0.9
        b.box(px, yy, z, 3.0, 0.8, 0.14, mat="wood")
    for k in range(0, int(L / 4)):
        yy = py + 3.0 - k * 4.0
        for sx in (-1.4, 1.4):
            b.box(px + sx, yy, -1.5, 0.28, 0.28, z + 2.6, mat="wood_dark")
    for sx in (-1.5, 1.5):
        b.box(px + sx, py + 3.0 - L / 2, z + 0.14, 0.12, L, 0.12, mat="wood_dark")
    # kucuk kulube
    b.box(px + 5.0, py + 6.0, z - 0.2, 5.0, 4.0, 3.0, mat="wood")
    b.gable(px + 5.0, py + 6.0, z + 2.8, 5.0, 4.0, 1.8, rot=0.0, over=0.4, mat_roof="roof_dark", mat_wall="wood")
