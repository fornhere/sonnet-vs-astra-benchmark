"""Bayraklar (Wave modifier ile dalgalanir), direkler, kuslar, kucuk sahne detaylari."""
import math
import random
import numpy as np
import bpy
from common import Builder, get_collection

R = random.Random(23)


def flag_mesh(name, L, H, nx=14, nz=8, swallow=True, gold_border=True):
    me = bpy.data.meshes.new(name)
    us = np.linspace(0, 1, nx + 1)
    vs = np.linspace(0, 1, nz + 1)
    verts = []
    for j, v in enumerate(vs):
        for i, u in enumerate(us):
            verts.append((u * L, 0.0, -v * H))   # direkten asagi
    faces = []
    for j in range(nz):
        for i in range(nx):
            a = j * (nx + 1) + i
            faces.append((a, a + 1, a + nx + 2, a + nx + 1))
    me.from_pydata(verts, [], faces)
    me.update()
    # kirlangic kuyruk: sag uctaki orta noktalari iceri cek
    if swallow:
        for j, v in enumerate(vs):
            for i, u in enumerate(us):
                if u > 0.75:
                    k = (u - 0.75) / 0.25
                    depth = (1 - abs(v - 0.5) * 2) * 0.18 * L * k
                    me.vertices[j * (nx + 1) + i].co.x -= depth
    ca = me.color_attributes.new("glow", "FLOAT_COLOR", "POINT")
    pin = []
    for j, v in enumerate(vs):
        for i, u in enumerate(us):
            g = 1.0 if (gold_border and (v < 0.1 or v > 0.9 or u > 0.96)) else 0.0
            ca.data[j * (nx + 1) + i].color = (g, g, g, 1)
    return me


def make_flags(flag_list, col, mats, wind_angle=0.15):
    pole_b = Builder("Bayrak_Direkleri", mats)
    objs = []
    for k, f in enumerate(flag_list):
        x, y, z, h = f["x"], f["y"], f["z"], f["h"]
        pole_b.cyl(x, y, z, 0.12, h, 8, "iron", r_top=0.08)
        pole_b.cyl(x, y, z + h, 0.22, 0.4, 8, "gold", r_top=0.0, cap_top=False)
        L, H = f["size"]
        me = flag_mesh(f"BayrakMesh{k}", L, H)
        obj = bpy.data.objects.new(f"Bayrak_{k:02d}", me)
        col.objects.link(obj)
        obj.location = (x, y, z + h - 0.3)
        obj.rotation_euler = (0, 0, wind_angle + R.uniform(-0.25, 0.25) + f.get("ang", 0.0))
        me.materials.append(mats[f["mat"]])
        vg = obj.vertex_groups.new(name="pin")
        nx = 14
        for idx in range(len(me.vertices)):
            i = idx % (nx + 1)
            u = i / nx
            vg.add([idx], min(1.0, u * 1.8), "REPLACE")
        m = obj.modifiers.new("Dalga", "WAVE")
        m.use_x = True
        m.use_y = False
        m.use_normal = True
        m.use_normal_x = False
        m.use_normal_y = True
        m.use_normal_z = False
        m.height = 0.16 * L
        m.width = 1.0 + 0.15 * L
        m.narrowness = 1.5
        m.speed = 0.22 + R.uniform(-0.03, 0.03)
        m.time_offset = -R.uniform(0, 30)
        m.start_position_x = 0.0
        m.vertex_group = "pin"
        m.falloff_radius = 0.0
        # gecerli olmasi icin ince alt bolum
        sub = obj.modifiers.new("Alt", "SUBSURF")
        sub.levels = 1
        sub.render_levels = 1
        objs.append(obj)
    pole_b.finish(col)
    return objs


def make_bird(name, col, mat, scale=1.0):
    """Basit kuş: govde + iki kanat (kanat çırpma anahtar kareli)."""
    body_me = bpy.data.meshes.new(name + "_g")
    verts = [(0.9, 0, 0), (-0.6, 0.18, 0.1), (-0.6, -0.18, 0.1), (-0.6, 0, -0.16), (-1.1, 0, 0.04), (1.25, 0, -0.05)]
    faces = [(0, 1, 2), (0, 3, 1), (0, 2, 3), (1, 4, 2), (1, 3, 4), (3, 2, 4), (5, 0, 1)]
    body_me.from_pydata(verts, [], [f for f in faces[:6]])
    body_me.update()
    body = bpy.data.objects.new(name, body_me)
    col.objects.link(body)
    body_me.materials.append(mat)
    wings = []
    for side in (1, -1):
        me = bpy.data.meshes.new(name + f"_w{side}")
        v = [(0.5, 0, 0.02), (-0.4, 0, 0.02), (-0.9, side * 1.3, 0.1), (0.0, side * 1.7, 0.12), (0.5, side * 0.9, 0.06)]
        f = [(0, 1, 2, 3), (0, 3, 4)] if side == 1 else [(1, 0, 3, 2), (3, 0, 4)]
        me.from_pydata(v, [], f)
        me.update()
        me.materials.append(mat)
        w = bpy.data.objects.new(name + f"_kanat{side}", me)
        col.objects.link(w)
        w.parent = body
        wings.append(w)
    return body, wings


def animate_bird(body, wings, frame_end, center, radius, height, speed, phase, flap_period=14, bob=1.2):
    """Dairesel ucus (anahtar kareli), kanat cirpma (x ekseni rotasyon)."""
    step = 4
    for f in range(0, frame_end + step, step):
        a = phase + speed * f
        x = center[0] + radius * math.cos(a)
        y = center[1] + radius * math.sin(a)
        z = height + bob * math.sin(a * 2.3 + phase)
        body.location = (x, y, z)
        # yon: teget
        body.rotation_euler = (0.25 * math.sin(a * 1.7) - 0.3 * (1 if speed > 0 else -1) * 0.5, 0.05, a + (math.pi / 2 if speed > 0 else -math.pi / 2))
        body.keyframe_insert("location", frame=f)
        body.keyframe_insert("rotation_euler", frame=f)
    for w, side in zip(wings, (1, -1)):
        for f in range(0, frame_end + flap_period, flap_period // 2):
            up = ((f // (flap_period // 2)) % 2 == 0)
            w.rotation_euler = (side * (0.6 if up else -0.5), 0, 0)
            w.keyframe_insert("rotation_euler", frame=f)
        # constant fcurve smooth
        if w.animation_data and w.animation_data.action:
            for fc in w.animation_data.action.fcurves if hasattr(w.animation_data.action, "fcurves") else []:
                for kp in fc.keyframe_points:
                    kp.interpolation = "BEZIER"


def make_banners(banner_list, col, mats):
    """Duvardan sarkan dikey sancaklar (Wave ile dalgalanir). a: dis normal acisi."""
    pb = Builder("Sancak_Direkleri", mats)
    objs = []
    for k, f in enumerate(banner_list):
        x, y, z, a, w, h = f["x"], f["y"], f["z"], f["a"], f["w"], f["h"]
        me = flag_mesh(f"SancakMesh{k}", w, h, nx=6, nz=12, swallow=False)
        me.transform(__import__("mathutils").Matrix.Translation((-w / 2, 0, 0)))
        me.materials.append(mats[f["mat"]])
        obj = bpy.data.objects.new(f"Sancak_{k:02d}", me)
        col.objects.link(obj)
        obj.location = (x + math.cos(a) * 0.55, y + math.sin(a) * 0.55, z)
        obj.rotation_euler = (0, 0, a - math.pi / 2)
        vg = obj.vertex_groups.new(name="pin")
        nz = 12
        for idx in range(len(me.vertices)):
            j = idx // 7
            vg.add([idx], min(1.0, j / nz * 2.0), "REPLACE")
        m = obj.modifiers.new("Dalga", "WAVE")
        m.use_x = False
        m.use_y = False
        m.use_normal = True
        m.use_normal_x = False
        m.use_normal_y = True
        m.use_normal_z = False
        m.height = 0.22
        m.width = 2.2
        m.narrowness = 1.5
        m.speed = 0.18
        m.time_offset = -R.uniform(0, 30)
        m.start_position_x = 0.0
        m.start_position_y = 0.0
        m.use_y = True
        m.vertex_group = "pin"
        # direk (yatay): duvardan cikan
        c, s = math.cos(a), math.sin(a)
        pb.box(x + c * 0.3, y + s * 0.3, z + 0.05, w + 0.6, 0.16, 0.16, rot=a - math.pi / 2 + math.pi / 2 * 0, mat="iron")
        pb.box(x + c * 0.15, y + s * 0.15, z + 0.0, 0.14, 0.7, 0.14, rot=a, mat="iron") if False else None
        objs.append(obj)
    pb.finish(col)
    return objs
