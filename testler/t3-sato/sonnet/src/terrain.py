"""Arazi: kayalik (crag) uzerinde kale platosu, golu, daglar, yol carvingi."""
import math
import numpy as np
import bpy
from common import Noise2D, smoothstep, lerp, mesh_from_numpy

H0 = 50.0            # kale platosu yuksekligi (su seviyesi = 0)
WATER = 0.0

# Kale cevre duvari kose noktalari (saat yonu tersi); kuleler burada
WALL_PTS = [
    (-62, -34), (-24, -46), (-4, -48), (16, -47), (30, -42), (60, -30),
    (68, 8), (50, 42), (2, 52), (-44, 40), (-66, 6),
]

# kule yaricaplari (WALL_PTS ile ayni sirada) -- plato bu diskleri de kapsar
TOWER_R = [7.4, 4.8, 6.0, 6.0, 4.8, 8.0, 5.6, 6.8, 9.4, 5.8, 6.8]

N = Noise2D(7)


def poly_sdf(x, y, pts):
    """Isaretli mesafe (icerisi negatif). Vektorel."""
    px = np.array([p[0] for p in pts], dtype=np.float64)
    py = np.array([p[1] for p in pts], dtype=np.float64)
    n = len(pts)
    d2 = np.full(x.shape, 1e18)
    inside = np.zeros(x.shape, dtype=bool)
    j = n - 1
    for i in range(n):
        ex, ey = px[j] - px[i], py[j] - py[i]
        wx, wy = x - px[i], y - py[i]
        t = np.clip((wx * ex + wy * ey) / (ex * ex + ey * ey), 0, 1)
        dx, dy = wx - ex * t, wy - ey * t
        d2 = np.minimum(d2, dx * dx + dy * dy)
        cond = ((py[i] > y) != (py[j] > y)) & (x < (px[j] - px[i]) * (y - py[i]) / (py[j] - py[i] + 1e-12) + px[i])
        inside ^= cond
        j = i
    d = np.sqrt(d2)
    return np.where(inside, -d, d)


def smax(a, b, k=3.0):
    h = np.clip(0.5 + 0.5 * (a - b) / k, 0, 1)
    return lerp(b, a, h) + k * h * (1 - h) * 0.5


def base_height(x, y):
    """Vadi + dag + gol taban yuksekligi (kale kayaligi haric)."""
    # ana dag halkasi
    my = smoothstep(430, 1700, y)
    mside = smoothstep(600, 1500, np.abs(x) - 0.15 * np.clip(y, 0, 900))
    mount = np.maximum(my, mside * 0.9)
    ridged = N.ridged(x / 620.0 + 3.1, y / 620.0 - 1.7, 6, 2.0, 0.5)
    fbm = N.fbm(x / 1400.0, y / 1400.0, 3)
    det = N.ridged(x / 150.0 - 4.0, y / 150.0 + 8.0, 5, 2.1, 0.5)
    det2 = N.fbm(x / 45.0, y / 45.0, 4)
    peaks = mount * (80 + 430 * ridged ** 1.4 + 110 * fbm + 85 * det ** 1.6 + 15 * det2)
    # sedimanter basamaklanma (yuksek arazide)
    peaks = np.where(peaks > 60, peaks + 9.0 * np.sin(peaks * 0.55) * smoothstep(60, 220, peaks), peaks)
    # karsi kiyi hafif tepeler
    hills = 4.0 + 9.0 * (N.fbm(x / 210.0 + 11, y / 210.0 + 5, 5) * 0.5 + 0.5) * smoothstep(-40, 300, y) \
        + 30.0 * smoothstep(300, 620, y) * (N.fbm(x / 340.0 - 2, y / 340.0 + 9, 4) * 0.5 + 0.5)
    # gol havzasi: on tarafta (y < shore(x))
    shore = -95.0 + 55.0 * N.fbm(x / 380.0 + 5, 1.7, 3) + 30.0 * N.fbm(x / 120.0, 4.2, 3)
    lakeM = smoothstep(shore + 40, shore - 40, y)  # 1 = gol icinde
    # gol tabani
    depth = -14.0 - 10 * (N.fbm(x / 200.0, y / 200.0, 3) * 0.5 + 0.5)
    h = lerp(hills, depth, lakeM)
    # solda koy: yarimada (koy kasabasi) -- duz kara
    pen = np.exp(-(((x + 236) / 100.0) ** 2 + ((y + 92) / 78.0) ** 2))
    flat = 5.7 + 0.35 * N.fbm(x / 30, y / 30, 2)
    h = lerp(h, flat, np.clip(pen * 2.2, 0, 1) ** 0.8)
    # sagda ikinci kucuk kara parcasi (cam agaclari icin)
    isl = np.exp(-(((x - 230) / 70.0) ** 2 + ((y + 165) / 45.0) ** 2))
    h = np.maximum(h, lerp(h, 6.5, np.clip(isl * 1.5, 0, 1)))
    return h + peaks


def crag_profile(d, x, y):
    """kale platosu (d<=0 ici) ve kayaliklar."""
    dd = np.maximum(d, 0.0)
    cliff = 32.0 * smoothstep(0, 15, dd) ** 0.8
    talus = (H0 - 32.0 + 14.0) * smoothstep(12, 190, dd) ** 0.8
    prof = H0 - cliff - talus
    # kaya teraslari / kayalik gurultusu
    rock = N.ridged(x / 38.0, y / 38.0, 5, 2.1, 0.5) - 0.45
    w = smoothstep(2, 10, dd) * (1 - smoothstep(100, 190, dd))
    prof = prof + rock * 16.0 * w + N.fbm(x / 11.0, y / 11.0, 3) * 2.6 * w + N.ridged(x / 6.5, y / 6.5, 3) * 1.6 * w
    # basamaklanma (kaya katmanlari)
    wt = smoothstep(2.5, 9, dd) * (1 - smoothstep(35, 90, dd))
    tt = prof / 4.5
    stepped = (np.floor(tt) + smoothstep(0.15, 0.85, tt - np.floor(tt))) * 4.5
    prof = lerp(prof, stepped, wt * 0.75)
    return prof


def plateau_sdf(x, y):
    d = poly_sdf(x, y, WALL_PTS)
    for (cx_, cy_), r in zip(WALL_PTS, TOWER_R):
        d = np.minimum(d, np.hypot(x - cx_, y - cy_) - r - 1.2)
    return d - 2.4


def height(x, y, road=None):
    d = plateau_sdf(x, y)
    b = base_height(x, y)
    c = crag_profile(d, x, y)
    h = smax(c, b, 6.0)
    # platonun icini tam duzelt (avlu)
    plateau = 1.0 - smoothstep(-8.0, -1.0, d)
    h = lerp(h, H0 + 0.0 * x, np.clip(plateau, 0, 1))
    return h, d


def build_axes(L=2400.0, n=700, k=4.2):
    t = np.linspace(-1, 1, n)
    return L * np.sinh(k * t) / np.sinh(k)


def make_terrain(col, road_fn=None, mat=None):
    xs = build_axes()
    ys = build_axes(1500.0, 700)
    ys = ys + 0.0
    X, Y = np.meshgrid(xs, ys)
    H, D = height(X, Y)
    if road_fn is not None:
        H = road_fn(X, Y, H)
    return xs, ys, H, D


def grid_faces(nx, ny):
    idx = np.arange(nx * ny).reshape(ny, nx)
    a = idx[:-1, :-1]
    b = idx[:-1, 1:]
    c = idx[1:, 1:]
    d = idx[1:, :-1]
    return np.stack([a.ravel(), b.ravel(), c.ravel(), d.ravel()], axis=1)


def terrain_object(xs, ys, H, mat, col, name="Arazi"):
    X, Y = np.meshgrid(xs, ys)
    verts = np.stack([X, Y, H], axis=-1).reshape(-1, 3)
    faces = grid_faces(len(xs), len(ys))
    obj = mesh_from_numpy(name, verts, faces, col, [mat], smooth=True)
    return obj


def sample_height(xs, ys, H, x, y):
    """Bilineer ornekleme (dizi girdi)."""
    fx = np.interp(x, xs, np.arange(len(xs)))
    fy = np.interp(y, ys, np.arange(len(ys)))
    ix = np.clip(np.floor(fx).astype(int), 0, len(xs) - 2)
    iy = np.clip(np.floor(fy).astype(int), 0, len(ys) - 2)
    tx = fx - ix
    ty = fy - iy
    h00 = H[iy, ix]
    h10 = H[iy, ix + 1]
    h01 = H[iy + 1, ix]
    h11 = H[iy + 1, ix + 1]
    return (h00 * (1 - tx) + h10 * tx) * (1 - ty) + (h01 * (1 - tx) + h11 * tx) * ty


# ----------------------------------------------------------------------------
def terrain_material():
    from materials import _base, _noise, _ramp, _mix, _math, _bump
    mat, nt, bsdf, out = _base("Arazi")
    tc = nt.nodes.new("ShaderNodeTexCoord")
    tc.location = (-1800, 0)
    geo = nt.nodes.new("ShaderNodeNewGeometry")
    geo.location = (-1800, -300)
    sep = nt.nodes.new("ShaderNodeSeparateXYZ")
    sep.location = (-1600, 0)
    nt.links.new(tc.outputs["Object"], sep.inputs[0])
    nsep = nt.nodes.new("ShaderNodeSeparateXYZ")
    nsep.location = (-1600, -300)
    nt.links.new(geo.outputs["Normal"], nsep.inputs[0])

    def val_ramp(fac, stops, loc):
        """0..1 dondurur (Fac cikisi)"""
        r = _ramp(nt, fac, [(p, (v, v, v, 1)) for p, v in stops], loc)
        s = nt.nodes.new("ShaderNodeSeparateColor")
        s.location = (loc[0] + 250, loc[1])
        nt.links.new(r.outputs["Color"], s.inputs["Color"])
        return s.outputs["Red"]

    # egim -> kaya maskesi (dik = kaya)
    slope_rock = val_ramp(nsep.outputs["Z"], [(0.6, 1.0), (0.86, 0.0)], (-1350, -300))
    n_big = _noise(nt, 0.006, 5, 0.6, tc.outputs["Object"], (-1600, 300))
    n_mid = _noise(nt, 0.05, 5, 0.6, tc.outputs["Object"], (-1600, 500))
    n_fine = _noise(nt, 1.3, 6, 0.65, tc.outputs["Object"], (-1600, 700))
    grass = _ramp(nt, n_mid.outputs["Fac"], [(0.35, (0.09, 0.16, 0.04, 1)), (0.6, (0.20, 0.22, 0.06, 1))], (-1300, 450))
    dry = _ramp(nt, n_big.outputs["Fac"], [(0.4, (0.9, 0.9, 0.9, 1)), (0.65, (1.7, 1.2, 0.6, 1))], (-1300, 250))
    g2 = _mix(nt, 1.0, grass.outputs["Color"], dry.outputs["Color"], "MULTIPLY", (-1000, 400), clamp=False)
    rock = _ramp(nt, n_mid.outputs["Fac"], [(0.3, (0.075, 0.068, 0.062, 1)), (0.7, (0.20, 0.18, 0.155, 1))], (-1300, 0))
    rfine = _ramp(nt, n_fine.outputs["Fac"], [(0.3, (0.7, 0.7, 0.7, 1)), (0.7, (1.2, 1.2, 1.2, 1))], (-1300, -150))
    mps = nt.nodes.new("ShaderNodeMapping")
    mps.location = (-1600, 900)
    mps.inputs["Scale"].default_value = (1.0, 1.0, 0.35)
    nt.links.new(tc.outputs["Object"], mps.inputs["Vector"])
    n_str = _noise(nt, 0.25, 4, 0.6, mps.outputs["Vector"], (-1350, 900), dist=0.2)
    streak = _ramp(nt, n_str.outputs["Fac"], [(0.3, (0.55, 0.55, 0.55, 1)), (0.7, (1.35, 1.3, 1.25, 1))], (-1100, 900))
    rock2a = _mix(nt, 1.0, rock.outputs["Color"], rfine.outputs["Color"], "MULTIPLY", (-1000, 0), clamp=False)
    rock2 = _mix(nt, 1.0, rock2a.outputs[2], streak.outputs["Color"], "MULTIPLY", (-820, 0), clamp=False)
    # yukseklik: yuksekte kaya, en yukarida kar
    zdiv = _math(nt, "DIVIDE", sep.outputs["Z"], 300.0, (-1350, 150))
    hi_rock = val_ramp(zdiv.outputs[0], [(0.18, 0.0), (0.5, 1.0)], (-1100, 150))
    rmask = _math(nt, "MAXIMUM", slope_rock, hi_rock, (-800, -200))
    land = _mix(nt, rmask.outputs[0], g2.outputs[2], rock2.outputs[2], "MIX", (-500, 300))
    zn = _noise(nt, 0.01, 4, 0.5, tc.outputs["Object"], (-1600, -600))
    sh = _math(nt, "ADD", sep.outputs["Z"], _math(nt, "MULTIPLY", zn.outputs["Fac"], 90.0, (-1350, -600)).outputs[0], (-1150, -600))
    sh2 = _math(nt, "DIVIDE", sh.outputs[0], 480.0, (-950, -600))
    snow_m = val_ramp(sh2.outputs[0], [(0.62, 0.0), (0.78, 1.0)], (-750, -600))
    flat = _math(nt, "SUBTRACT", 1.0, slope_rock, (-600, -450))
    smask = _math(nt, "MULTIPLY", snow_m, flat.outputs[0], (-400, -550))
    snow_col = _mix(nt, smask.outputs[0], land.outputs[2], (0.85, 0.88, 0.95, 1), "MIX", (-100, 300))
    # sahil (su cizgisi yakininda islak toprak/kum)
    mr = nt.nodes.new("ShaderNodeMapRange")
    mr.location = (-1300, -900)
    mr.inputs["From Min"].default_value = -1.0
    mr.inputs["From Max"].default_value = 3.4
    mr.inputs["To Min"].default_value = 1.0
    mr.inputs["To Max"].default_value = 0.0
    nt.links.new(sep.outputs["Z"], mr.inputs["Value"])
    sand = _mix(nt, mr.outputs["Result"], snow_col.outputs[2], (0.16, 0.13, 0.09, 1), "MIX", (150, 300))
    # yol izi: 'road' vertex renk ozniteligi (0..1)
    ra = nt.nodes.new("ShaderNodeAttribute")
    ra.attribute_name = "road"
    ra.location = (-100, -200)
    rc = _mix(nt, ra.outputs["Fac"], sand.outputs[2], (0.26, 0.20, 0.13, 1), "MIX", (400, 300))
    nt.links.new(rc.outputs[2], bsdf.inputs["Base Color"])
    bsdf.inputs["Roughness"].default_value = 0.92
    h1 = _math(nt, "ADD", n_fine.outputs["Fac"], _math(nt, "MULTIPLY", n_mid.outputs["Fac"], 1.5, (-1200, 800)).outputs[0], (-900, 800))
    h2 = _math(nt, "ADD", h1.outputs[0], _math(nt, "MULTIPLY", n_str.outputs["Fac"], 0.5, (-900, 950)).outputs[0], (-700, 850))
    _bump(nt, bsdf, h2.outputs[0], 0.7, 0.7)
    return mat


def water_material():
    from materials import _base, _noise, _math, _bump
    mat, nt, bsdf, out = _base("Su")
    tc = nt.nodes.new("ShaderNodeTexCoord")
    tc.location = (-1200, 0)
    mp = nt.nodes.new("ShaderNodeMapping")
    mp.location = (-1000, 0)
    mp.inputs["Scale"].default_value = (1, 1, 1)
    nt.links.new(tc.outputs["Object"], mp.inputs["Vector"])
    n1 = _noise(nt, 0.07, 5, 0.55, mp.outputs["Vector"], (-800, 200))
    n2 = _noise(nt, 0.55, 5, 0.6, mp.outputs["Vector"], (-800, -100))
    hgt = _math(nt, "ADD", n1.outputs["Fac"], _math(nt, "MULTIPLY", n2.outputs["Fac"], 0.35, (-500, -100)).outputs[0], (-300, 100))
    bsdf.inputs["Base Color"].default_value = (0.012, 0.035, 0.05, 1)
    bsdf.inputs["Roughness"].default_value = 0.04
    bsdf.inputs["IOR"].default_value = 1.33
    bsdf.inputs["Specular IOR Level"].default_value = 0.8
    _bump(nt, bsdf, hgt.outputs[0], 0.05, 0.4)
    return mat
