"""Ravenhold kalesi -- ana kurulum betigi.
Kullanim:  blender -b --python src/build.py     (ortam degiskenleri: STAGES, OUT)
"""
import sys
import os
import math
import random
import importlib

SRC = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, SRC)
import numpy as np
import bpy

import common, materials, terrain, roads, viaduct, castle, props, village, vegetation
for m in (common, materials, terrain, roads, viaduct, castle, props, village, vegetation):
    importlib.reload(m)
from common import *
from terrain import H0, WALL_PTS
import castle as C

STAGES = os.environ.get("STAGES", "all").split(",")
OUT = os.environ.get("OUT", os.path.join(SRC, "..", "sato.blend"))


def want(s):
    return "all" in STAGES or s in STAGES


PI = math.pi
R = random.Random(5)

bpy.ops.wm.read_factory_settings(use_empty=True)
scn = bpy.context.scene
M = materials.make_all()
# ek materyaller
M["road"] = materials.plain("Yol_Toprak", (0.16, 0.12, 0.08, 1), 0.95)
M["road_edge"] = materials.plain("Yol_Kenar", (0.10, 0.09, 0.05, 1), 0.98)
M["terrain"] = terrain.terrain_material()
M["water"] = terrain.water_material()

root = get_collection("RAVENHOLD")
col_terrain = get_collection("Arazi_ve_Su", root)
col_castle = get_collection("Kale", root)
col_village = get_collection("Koy", root)
col_veg = get_collection("Bitki_Ortusu", root)
col_props = get_collection("Bayraklar_Kuslar", root)
col_lights = get_collection("Isiklar", root)
col_cam = get_collection("Kameralar", root)

castle_root = new_empty("Ravenhold_Kale_Koku", col_castle, (0, 0, 0), "PLAIN_AXES", 5)

flags = []
lights = []

# ----------------------------------------------------------------------------
# YOL (araziyi etkiler; once yol nesnesi)
# ----------------------------------------------------------------------------
road = roads.Road()
print("Yol uzunlugu", road.L, "egim", road.grade)

# ----------------------------------------------------------------------------
# ARAZI
# ----------------------------------------------------------------------------
xs = terrain.build_axes()
ys = terrain.build_axes(2700.0, 760)
X, Y = np.meshgrid(xs, ys)
Hh, Dd = terrain.height(X, Y)
Hh = road.carve(X, Y, Hh)
terrain_obj = terrain.terrain_object(xs, ys, Hh, M["terrain"], col_terrain, "Arazi")
np.save(os.path.join(SRC, "_H.npy"), Hh)

# su
wv = np.array([[-3400, -3400, 0], [3400, -3400, 0], [3400, 3400, 0], [-3400, 3400, 0]], dtype=np.float32)
water = mesh_from_numpy("Gol_Suyu", wv, np.array([[0, 1, 2, 3]]), col_terrain, [M["water"]], smooth=False)

# ----------------------------------------------------------------------------
# KALE
# ----------------------------------------------------------------------------
def B(name, col=col_castle):
    return Builder(name, M)


def fin(b, col=col_castle):
    o = b.finish(col)
    o.parent = castle_root
    return o


# Kuleler & duvarlar
b_walls = B("Sur_ve_Kuleler")
towers = [
    dict(kind="round", r=7.4, h=36, rh=19, roof="roof_slate"),
    dict(kind="round", r=4.8, h=27, rh=12, roof="roof_slate"),
    dict(kind="round", r=6.0, h=38, rh=19, roof="roof_slate"),  # kapi sol
    dict(kind="round", r=6.0, h=38, rh=19, roof="roof_slate"),  # kapi sag
    dict(kind="round", r=4.8, h=25, rh=9, roof="roof_dark", style="crenel"),
    dict(kind="round", r=8.0, h=41, rh=21, roof="roof_slate"),
    dict(kind="round", r=5.6, h=30, rh=14, roof="roof_copper"),
    dict(kind="square", w=9.0, h=42, rh=22, roof="roof_slate"),
    dict(kind="round", r=9.4, h=46, rh=15, roof="roof_dark", style="crenel", drum=6.5),
    dict(kind="round", r=5.8, h=33, rh=16, roof="roof_slate"),
    dict(kind="round", r=6.8, h=36, rh=18, roof="roof_slate"),
]
radii = []
for i, (p, t) in enumerate(zip(WALL_PTS, towers)):
    x, y = p
    if t["kind"] == "round":
        C.round_tower(b_walls, x, y, t["r"], t["h"], t["rh"], t["roof"], t.get("style", "roof"), flags, lights,
                      windows=2, slits=3, drum=t.get("drum", 3.6))
        radii.append(t["r"])
    else:
        C.square_tower(b_walls, x, y, t["w"], t["w"], t["h"], rot=0.35, roofmat=t["roof"], roof_h=t["rh"], flags=flags)
        radii.append(t["w"] * 0.75)
n = len(WALL_PTS)
for i in range(n):
    j = (i + 1) % n
    if i == 2:
        continue  # kapi yapisi
    C.wall_segment(b_walls, WALL_PTS[i], WALL_PTS[j], radii[i], radii[j], lights=lights)
fin(b_walls)

b_gate = B("Kapi_Yapisi")
gx = (WALL_PTS[2][0] + WALL_PTS[3][0]) / 2
gy = (WALL_PTS[2][1] + WALL_PTS[3][1]) / 2
gang = math.atan2(WALL_PTS[3][1] - WALL_PTS[2][1], WALL_PTS[3][0] - WALL_PTS[2][0])
C.gatehouse(b_gate, gx, gy, gang, lights, flags)
fin(b_gate)

# donjon
b_keep = B("Ana_Kule_Donjon")
C.keep(b_keep, -2.0, 16.0, flags, lights)
fin(b_keep)

b_hall = B("Buyuk_Salon")
C.great_hall(b_hall, 40.0, 3.0, 15.0, 34.0, 15.0, 11.0, 0.0, lights, flags)
fin(b_hall)

b_chapel = B("Sapel")
C.chapel(b_chapel, -40.0, 8.0, 11.0, 24.0, 13.0, 9.5, 0.0, flags)
fin(b_chapel)

b_houses = B("Avlu_Evleri")
houses = [
    (-22, -29, 10, 15, 0.0, 8.0, "roof_red"),
    (28, -27, 9, 13, 0.0, 7.5, "roof_red"),
    (-30, 36, 9, 12, PI / 2, 7.5, "roof_dark"),
    (26, 38, 10, 9, PI / 2, 7.5, "roof_red"),
    (54, -14, 8, 12, 0.0, 7.0, "roof_dark"),
    (52, 26, 7, 8, 0.0, 6.5, "roof_red"),
]
for (x, y, w, d, rot, h, rm) in houses:
    C.timber_house(b_houses, x, y, w, d, h, rot, rm, lights)
fin(b_houses)

# avlu zemini + kucuk detaylar
b_court = B("Avlu_Zemini_ve_Detaylar")
cx = sum(p[0] for p in WALL_PTS) / n
cy = sum(p[1] for p in WALL_PTS) / n
for i in range(n):
    p, q = WALL_PTS[i], WALL_PTS[(i + 1) % n]
    b_court.face([(cx, cy, H0 + 0.06), (p[0], p[1], H0 + 0.06), (q[0], q[1], H0 + 0.06)][::-1], "cobble")
# kuyu
def well(b, x, y):
    b.cyl(x, y, H0, 1.7, 1.2, 16, "stone_light", cap_top=False)
    b.cyl(x, y, H0 + 0.02, 1.35, 1.15, 16, "dark", cap_top=False)
    for sx in (-1, 1):
        b.box(x + sx * 1.6, y, H0, 0.25, 0.25, 3.6, mat="wood_dark")
    b.box(x, y, H0 + 3.4, 3.8, 0.25, 0.25, mat="wood_dark")
    b.gable(x, y, H0 + 3.55, 1.2, 3.6, 1.1, rot=PI / 2 * 0 + PI / 2 * 0, over=0.35, mat_roof="roof_red", mat_wall="wood_dark")
    b.cyl(x, y, H0 + 2.0, 0.09, 1.4, 6, "iron") if False else None
well(b_court, 6.0, -26.0)
def barrel(b, x, y, z=H0):
    b.cyl(x, y, z, 0.5, 0.35, 10, "wood", r_top=0.62, cap_top=False)
    b.cyl(x, y, z + 0.35, 0.62, 0.35, 10, "wood", r_top=0.62, cap_top=False)
    b.cyl(x, y, z + 0.7, 0.62, 0.35, 10, "wood", r_top=0.5)
    for zz in (0.12, 0.6):
        b.cyl(x, y, z + zz, 0.62, 0.06, 10, "iron", cap_top=False)
def crate(b, x, y, s=0.9, rot=0.0, z=H0):
    b.box(x, y, z, s, s, s, rot=rot, mat="wood_dark")
for (x, y) in [(-12, -30), (-13.2, -29.3), (-12.5, -28), (34, -20), (35.2, -19.4), (36.5, -20.2), (58, 3), (58.6, 4.2), (-56, 14), (-55, 15.3), (-27, 28), (-22, 30)]:
    barrel(b_court, x, y) if R.random() > 0.35 else crate(b_court, x, y, R.uniform(0.8, 1.1), R.uniform(0, 3))
# tezgah / pazar yeri
def stall(b, x, y, rot, colr):
    c, s = math.cos(rot), math.sin(rot)
    b.box(x, y, H0, 3.2, 1.4, 1.0, rot=rot, mat="wood")
    for sx in (-1, 1):
        for sy in (-1, 1):
            b.box(x + sx * 1.5 * c - sy * 0.65 * s, y + sx * 1.5 * s + sy * 0.65 * c, H0, 0.14, 0.14, 2.4, rot=rot, mat="wood_dark")
    b.gable(x, y, H0 + 2.4, 1.6, 3.4, 0.5, rot=rot, over=0.2, mat_roof=colr, mat_wall="cloth")
stall(b_court, 18, -34, 0.1, "cloth")
stall(b_court, -6, -34, -0.1, "cloth_blue")
fin(b_court)

# ----------------------------------------------------------------------------
# VIYADUK + YOL
# ----------------------------------------------------------------------------
b_via = B("Viyaduk")
viaduct.build_viaduct(b_via, road, xs, ys, Hh)
fin(b_via)
b_road = B("Kale_Yolu")
viaduct.build_ground_road(b_road, road, roads.VIA_END - 4.0, road.L)
fin(b_road)

# ----------------------------------------------------------------------------
# KOY + ORMAN
# ----------------------------------------------------------------------------
if want("village"):
    b_vil = Builder("Koy_Evleri", M)
    village.build_village(b_vil, xs, ys, Hh, road)
    b_vil.finish(col_village)

if want("forest"):
    M["pine"] = vegetation.pine_material()
    M["leaf"] = vegetation.leaf_material()
    nc, nd = vegetation.build_forest(col_veg, M, xs, ys, Hh, road)
    print("AGAC", nc, nd)

# avlu agaclari (sonbahar meseleri)
if want("forest"):
    b_tr = Builder("Avlu_Agaclari_Govde", M)
    rng_t = np.random.default_rng(4)
    bvv, bff = vegetation.blob_template(1, rng_t)
    Vt, Ft, Tt = [], [], []
    base = 0
    for (tx, ty, ts, tint) in [(-9, -7, 1.0, 0.45), (21, -5, 1.15, 0.62), (54, 40, 0.9, 0.3), (-48, -18, 0.95, 0.75)]:
        b_tr.cyl(tx, ty, H0 - 0.3, 0.55 * ts, 7.0 * ts, 8, "bark", r_top=0.3 * ts)
        for k_ in range(3):
            ox, oy = rng_t.uniform(-2.2, 2.2, 2) * ts
            oz = (7.0 + 2.0 * k_) * ts
            rs = 4.6 * ts * rng_t.uniform(0.85, 1.1)
            V2 = bvv * np.array([rs, rs, rs * 0.8]) + np.array([tx + ox, ty + oy, H0 + oz])
            Vt += V2.tolist()
            Ft += (bff + base).tolist()
            Tt += [tint] * len(bvv)
            base += len(bvv)
    b_tr.finish(col_veg)
    Vt = np.array(Vt, dtype=np.float32)
    ot = mesh_from_numpy("Avlu_Agaclari_Yaprak", Vt, np.array(Ft, dtype=np.int32), col_veg, [M["leaf"]], smooth=False)
    ca = ot.data.color_attributes.new("tint", "FLOAT_COLOR", "POINT")
    Tt = np.array(Tt, dtype=np.float32)
    ca.data.foreach_set("color", np.stack([Tt, Tt, np.zeros_like(Tt), np.ones_like(Tt)], axis=1).ravel())

# ----------------------------------------------------------------------------
# BAYRAKLAR
# ----------------------------------------------------------------------------
fl_objs = props.make_flags(flags, col_props, M)

# sarkan sancaklar
banners = []
gnx, gny = math.sin(gang), -math.cos(gang)
ga = math.atan2(gny, gnx)
for sgn in (-1, 1):
    banners.append(dict(x=gx + math.cos(gang) * sgn * 8.2 + gnx * 4.35, y=gy + math.sin(gang) * sgn * 8.2 + gny * 4.35, z=H0 + 15.5, a=ga, w=2.4, h=7.5, mat="cloth"))
for sgn in (-1, 1):
    banners.append(dict(x=-2 + sgn * 3.1, y=16 - 11.0 - 0.1, z=H0 + 29.0, a=-PI / 2, w=2.6, h=9.0, mat="cloth" if sgn > 0 else "cloth_blue"))
    banners.append(dict(x=-2 + sgn * 3.1, y=16 + 11.0 + 0.1, z=H0 + 29.0, a=PI / 2, w=2.6, h=9.0, mat="cloth_blue" if sgn > 0 else "cloth"))
banners.append(dict(x=-2 + 13.1, y=16 + 0.0, z=H0 + 29.0, a=0.0, w=2.6, h=9.0, mat="cloth"))
banners.append(dict(x=-2 - 13.1, y=16 + 0.0, z=H0 + 29.0, a=PI, w=2.6, h=9.0, mat="cloth"))
# duvar ustu / kule onu
for (px, py, ang_, zt, hh) in [(-62, -34, math.atan2(-34 - 16, -62 + 2) , H0 + 30, 9), (60, -30, math.atan2(-30 - 16, 60 + 2), H0 + 34, 10)]:
    banners.append(dict(x=px + math.cos(ang_) * 8.2, y=py + math.sin(ang_) * 8.2, z=zt, a=ang_, w=2.6, h=hh, mat="cloth_blue"))
# salon kalkan yuzu
banners.append(dict(x=40 - 5.0, y=3 - 17.1, z=H0 + 12.0, a=-PI / 2, w=2.4, h=7.0, mat="cloth"))
banners.append(dict(x=40 + 5.0, y=3 - 17.1, z=H0 + 12.0, a=-PI / 2, w=2.4, h=7.0, mat="cloth"))
props.make_banners(banners, col_props, M)

# ----------------------------------------------------------------------------
# KUSLAR (karga surusu, kale etrafinda daire cizer)
# ----------------------------------------------------------------------------
M["bird"] = materials.plain("Karga", (0.008, 0.008, 0.01, 1), 0.5)
BIRD_END = 20 * 24 + 8
brd = random.Random(77)
flocks = [((-2, 16), 46, 112, 0.0062), ((0, 5), 82, 96, -0.0048), ((0, 0), 130, 82, 0.0041)]
for fi, (cen, rad, hgt, sp) in enumerate(flocks):
    for k in range(4 if fi == 0 else 3):
        bd, wg = props.make_bird(f"Karga_{fi}_{k}", col_props, M["bird"], 0.55)
        bd.scale = (0.6, 0.6, 0.6)
        props.animate_bird(bd, wg, BIRD_END, cen, rad + brd.uniform(-8, 8), hgt + brd.uniform(-8, 10), sp * brd.uniform(0.9, 1.1),
                           brd.uniform(0, 6.28), flap_period=brd.choice([10, 12, 14]))

# ----------------------------------------------------------------------------
# ISIKLAR (mesale)
# ----------------------------------------------------------------------------
for k, (x, y, z) in enumerate(lights):
    ld = bpy.data.lights.new(f"Mesale_{k:02d}", "POINT")
    ld.color = (1.0, 0.55, 0.22)
    ld.energy = 900.0
    ld.shadow_soft_size = 0.4
    lo = bpy.data.objects.new(f"Mesale_{k:02d}", ld)
    col_lights.objects.link(lo)
    lo.location = (x, y, z)

# ----------------------------------------------------------------------------
# DUNYA / RENDER AYARLARI
# ----------------------------------------------------------------------------
exec(open(os.path.join(SRC, "scene_setup.py")).read())
exec(open(os.path.join(SRC, "camera.py")).read())

bpy.ops.wm.save_as_mainfile(filepath=os.path.abspath(OUT))
print("KAYDEDILDI", OUT)
