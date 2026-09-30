"""Cam ve yaprakli agaclar (numpy ile toplu mesh), kayalar."""
import math
import numpy as np
import bpy
from common import Noise2D, smoothstep, mesh_from_numpy
from terrain import sample_height, poly_sdf, WALL_PTS, H0

N2 = Noise2D(31)


def conifer_template(tiers=5, seg=8, rng=None):
    """(verts, faces, tier_t) - z 0..~1 normalize (yukseklik 1 = 1 birim), yaricap ~ 0.3."""
    V = []
    F = []
    T = []   # tint (0..1) alttan uca
    # govde
    ring0 = [(0.035 * math.cos(2 * math.pi * i / 6), 0.035 * math.sin(2 * math.pi * i / 6), 0.0) for i in range(6)]
    ring1 = [(0.02 * math.cos(2 * math.pi * i / 6), 0.02 * math.sin(2 * math.pi * i / 6), 0.35) for i in range(6)]
    base = len(V)
    V += ring0 + ring1
    T += [0.0] * 12
    for i in range(6):
        j = (i + 1) % 6
        F.append((base + i, base + j, base + 6 + j))
        F.append((base + i, base + 6 + j, base + 6 + i))
    trunk_faces = len(F)
    # katlar
    for k in range(tiers):
        t = k / max(1, tiers - 1)
        z0 = 0.16 + 0.60 * t * 0.98
        h = 0.34 - 0.12 * t
        r = 0.30 * (1.0 - 0.72 * t) + 0.04
        base = len(V)
        for i in range(seg):
            a = 2 * math.pi * i / seg + (k * 0.4)
            rr = r * (0.9 + 0.2 * ((i * 7 + k * 3) % 5) / 4)
            V.append((rr * math.cos(a), rr * math.sin(a), z0))
            T.append(t * 0.6)
        V.append((0.0, 0.0, z0 + h))
        T.append(min(1.0, t * 0.6 + 0.45))
        for i in range(seg):
            j = (i + 1) % seg
            F.append((base + i, base + j, base + seg))
        # alt kapak (ici)
        V.append((0.0, 0.0, z0 + 0.02))
        T.append(0.0)
        for i in range(seg):
            j = (i + 1) % seg
            F.append((base + j, base + i, base + seg + 1))
    return np.array(V, dtype=np.float32), np.array(F, dtype=np.int32), np.array(T, dtype=np.float32), trunk_faces


def blob_template(subdiv=1, rng=None):
    """Kaba kure (icosphere) + gurultu."""
    t = (1 + math.sqrt(5)) / 2
    V = [(-1, t, 0), (1, t, 0), (-1, -t, 0), (1, -t, 0), (0, -1, t), (0, 1, t), (0, -1, -t), (0, 1, -t), (t, 0, -1), (t, 0, 1), (-t, 0, -1), (-t, 0, 1)]
    V = [np.array(v, dtype=np.float64) / np.linalg.norm(v) for v in V]
    F = [(0, 11, 5), (0, 5, 1), (0, 1, 7), (0, 7, 10), (0, 10, 11), (1, 5, 9), (5, 11, 4), (11, 10, 2), (10, 7, 6), (7, 1, 8),
         (3, 9, 4), (3, 4, 2), (3, 2, 6), (3, 6, 8), (3, 8, 9), (4, 9, 5), (2, 4, 11), (6, 2, 10), (8, 6, 7), (9, 8, 1)]
    cache = {}
    for _ in range(subdiv):
        nf = []
        def mid(a, b):
            key = (min(a, b), max(a, b))
            if key not in cache:
                m = (V[a] + V[b]) / 2
                m /= np.linalg.norm(m)
                V.append(m)
                cache[key] = len(V) - 1
            return cache[key]
        for (a, b, c) in F:
            ab, bc, ca = mid(a, b), mid(b, c), mid(c, a)
            nf += [(a, ab, ca), (b, bc, ab), (c, ca, bc), (ab, bc, ca)]
        F = nf
    V = np.array(V)
    rng = rng or np.random.default_rng(1)
    V = V * (1 + 0.22 * rng.uniform(-1, 1, len(V))[:, None])
    return V.astype(np.float32), np.array(F, dtype=np.int32)


def place(xs, ys, H, rng, n_try, region, road, dens_fn, min_h=2.4, max_slope=0.75, avoid=None):
    x0, x1, y0, y1 = region
    px = rng.uniform(x0, x1, n_try)
    py = rng.uniform(y0, y1, n_try)
    h = sample_height(xs, ys, H, px, py)
    e = 3.0
    hx = sample_height(xs, ys, H, px + e, py) - sample_height(xs, ys, H, px - e, py)
    hy = sample_height(xs, ys, H, px, py + e) - sample_height(xs, ys, H, px, py - e)
    slope = np.hypot(hx, hy) / (2 * e)
    d = poly_sdf(px, py, WALL_PTS)
    dens = dens_fn(px, py, h, slope, d)
    ok = (h > min_h) & (slope < max_slope) & (rng.uniform(0, 1, n_try) < dens) & (d > 3.0)
    # yola uzaklik
    if road is not None:
        sx, sy = road.xy[::3, 0], road.xy[::3, 1]
        idx = np.where(ok)[0]
        keep = np.ones(len(idx), dtype=bool)
        for i in range(0, len(idx), 4000):
            ii = idx[i:i + 4000]
            dd = np.min((px[ii][:, None] - sx[None, :]) ** 2 + (py[ii][:, None] - sy[None, :]) ** 2, axis=1)
            keep[i:i + 4000] = dd > 11.0 ** 2
        ok[idx[~keep]] = False
    if avoid is not None:
        for (ax, ay, ar) in avoid:
            ok &= ((px - ax) ** 2 + (py - ay) ** 2) > ar * ar
    return px[ok], py[ok], h[ok], slope[ok]


def build_forest(col, mats, xs, ys, H, road, seed=3, n_con=7000, n_dec=900, village=(-236, -92, 62)):
    rng = np.random.default_rng(seed)

    def dens_con(x, y, h, s, d):
        f = N2.fbm(x / 140.0 + 2, y / 140.0 - 1, 4) * 0.5 + 0.5
        f2 = N2.fbm(x / 500.0 - 7, y / 500.0 + 3, 3) * 0.5 + 0.5
        base = smoothstep(0.38, 0.62, f * 0.7 + f2 * 0.5) * (1.0 - smoothstep(180, 340, h)) * (1.0 - 0.9 * smoothstep(0.35, 0.75, s))
        # kayaligin yamaclarinda seyrek
        base = base * (0.35 + 0.65 * smoothstep(8, 60, d))
        # gol kiyisi
        return base * smoothstep(2.4, 6.0, h) * 1.0

    def dens_dec(x, y, h, s, d):
        f = N2.fbm(x / 90.0 + 12, y / 90.0 - 6, 3) * 0.5 + 0.5
        return smoothstep(0.55, 0.75, f) * (1.0 - smoothstep(60, 180, h)) * (1.0 - smoothstep(0.3, 0.6, s))

    avoid = [(village[0], village[1], village[2])]
    reg = (-1000, 1000, -320, 780)
    # conifers
    tv, tf, tt, ntrunk = conifer_template(5, 8)
    nv, nf_ = len(tv), len(tf)
    cx, cy, ch, cs = place(xs, ys, H, rng, 420000, reg, road, dens_con, avoid=avoid)
    if len(cx) > n_con:
        sel = rng.choice(len(cx), n_con, replace=False)
        cx, cy, ch, cs = cx[sel], cy[sel], ch[sel], cs[sel]
    k = len(cx)
    far = np.clip(np.hypot(cx, cy - 100) / 700.0, 0, 1)
    sc = rng.uniform(9.5, 19.0, k) * (1 + 0.6 * far)
    wid = rng.uniform(0.85, 1.25, k)
    rot = rng.uniform(0, 2 * math.pi, k)
    cr, sr = np.cos(rot), np.sin(rot)
    Vs = np.empty((k, nv, 3), dtype=np.float32)
    lx = tv[:, 0][None, :] * (sc * wid)[:, None]
    ly = tv[:, 1][None, :] * (sc * wid)[:, None]
    Vs[:, :, 0] = cx[:, None] + lx * cr[:, None] - ly * sr[:, None]
    Vs[:, :, 1] = cy[:, None] + lx * sr[:, None] + ly * cr[:, None]
    Vs[:, :, 2] = (ch[:, None] - 0.4) + tv[:, 2][None, :] * sc[:, None]
    Fs = (tf[None, :, :] + (np.arange(k) * nv)[:, None, None]).reshape(-1, 3)
    obj = mesh_from_numpy("Cam_Agaclari", Vs.reshape(-1, 3), Fs, col, [mats["pine"], mats["bark"]], smooth=False)
    # malzeme indeksi: govde yuzleri bark(1), gerisi pine(0)
    mi = np.zeros((k, nf_), dtype=np.int32)
    mi[:, :ntrunk] = 1
    obj.data.polygons.foreach_set("material_index", mi.ravel())
    # renk oznitelikleri: 'tint' (0..1 yukseklik), 'var' (agac basi rastgele)
    ca = obj.data.color_attributes.new("tint", "FLOAT_COLOR", "POINT")
    tint = np.tile(tt, k)
    var = np.repeat(rng.uniform(0, 1, k), nv)
    rgba = np.stack([tint, var, np.repeat(rng.uniform(0, 1, k), nv), np.ones_like(tint)], axis=1).astype(np.float32)
    ca.data.foreach_set("color", rgba.ravel())
    obj.data.update()
    # yaprakli
    bv, bf = blob_template(1, np.random.default_rng(seed))
    dx, dy, dh, ds = place(xs, ys, H, rng, 60000, reg, road, dens_dec, min_h=2.6, avoid=avoid)
    if len(dx) > n_dec:
        sel = rng.choice(len(dx), n_dec, replace=False)
        dx, dy, dh, ds = dx[sel], dy[sel], dh[sel], ds[sel]
    k2 = len(dx)
    nvb, nfb = len(bv), len(bf)
    # her agaç: 3 kure (taç) + govde
    Vd = []
    Fd = []
    Td = []
    MI = []
    base = 0
    for i in range(k2):
        s = rng.uniform(6.5, 11.0)
        trunk_h = s * 0.55
        # govde (kaba prizma)
        tvv = []
        for a in range(5):
            th = 2 * math.pi * a / 5
            tvv.append((dx[i] + 0.4 * s * 0.1 * math.cos(th), dy[i] + 0.4 * s * 0.1 * math.sin(th), dh[i] - 0.4))
        for a in range(5):
            th = 2 * math.pi * a / 5
            tvv.append((dx[i] + 0.25 * s * 0.1 * math.cos(th), dy[i] + 0.25 * s * 0.1 * math.sin(th), dh[i] + trunk_h))
        Vd += tvv
        Td += [0.0] * 10
        for a in range(5):
            b2 = (a + 1) % 5
            Fd.append((base + a, base + b2, base + 5 + b2))
            Fd.append((base + a, base + 5 + b2, base + 5 + a))
            MI += [1, 1]
        base += 10
        vv = rng.uniform(0, 1)
        for c in range(3):
            ox, oy = rng.uniform(-0.35, 0.35, 2) * s
            oz = trunk_h + s * (0.35 + 0.3 * c / 2) * rng.uniform(0.7, 1.1)
            rs = s * rng.uniform(0.42, 0.62)
            rot2 = rng.uniform(0, 6.28)
            R = np.array([[math.cos(rot2), -math.sin(rot2), 0], [math.sin(rot2), math.cos(rot2), 0], [0, 0, 1]])
            V2 = (bv @ R.T) * np.array([rs * 1.1, rs * 1.1, rs * 0.85]) + np.array([dx[i] + ox, dy[i] + oy, dh[i] + oz])
            Vd += V2.tolist()
            Td += [vv] * nvb
            Fd += (bf + base).tolist()
            MI += [0] * nfb
            base += nvb
    if k2:
        Vd = np.array(Vd, dtype=np.float32)
        Fd = np.array(Fd, dtype=np.int32)
        objd = mesh_from_numpy("Yaprakli_Agaclar", Vd, Fd, col, [mats["leaf"], mats["bark"]], smooth=False)
        objd.data.polygons.foreach_set("material_index", np.array(MI, dtype=np.int32))
        ca = objd.data.color_attributes.new("tint", "FLOAT_COLOR", "POINT")
        Td = np.array(Td, dtype=np.float32)
        z = Vd[:, 2]
        rgba = np.stack([Td, Td, np.zeros_like(Td), np.ones_like(Td)], axis=1).astype(np.float32)
        ca.data.foreach_set("color", rgba.ravel())
        objd.data.update()
    return k, k2


def pine_material():
    from materials import _base, _noise, _ramp, _mix, _bump
    mat, nt, bsdf, out = _base("Cam_Yapragi")
    at = nt.nodes.new("ShaderNodeAttribute")
    at.attribute_name = "tint"
    at.location = (-900, 0)
    sep = nt.nodes.new("ShaderNodeSeparateColor")
    sep.location = (-700, 0)
    nt.links.new(at.outputs["Color"], sep.inputs["Color"])
    ramp = _ramp(nt, sep.outputs["Red"], [(0.0, (0.015, 0.05, 0.03, 1)), (1.0, (0.05, 0.13, 0.05, 1))], (-450, 100))
    # agac basina renk sapmasi (mavi-yesil <-> sarimsi yesil)
    var = _ramp(nt, sep.outputs["Green"], [(0.0, (0.75, 0.9, 1.0, 1)), (1.0, (1.5, 1.2, 0.7, 1))], (-450, -150))
    c = _mix(nt, 1.0, ramp.outputs["Color"], var.outputs["Color"], "MULTIPLY", (-150, 0), clamp=False)
    nt.links.new(c.outputs[2], bsdf.inputs["Base Color"])
    bsdf.inputs["Roughness"].default_value = 0.85
    if "Sheen Weight" in bsdf.inputs:
        bsdf.inputs["Sheen Weight"].default_value = 0.3
    tc = nt.nodes.new("ShaderNodeTexCoord")
    tc.location = (-900, -400)
    n = _noise(nt, 2.2, 3, 0.5, tc.outputs["Object"], (-650, -400))
    _bump(nt, bsdf, n.outputs["Fac"], 0.3, 0.3)
    return mat


def leaf_material():
    from materials import _base, _noise, _ramp, _mix, _bump
    mat, nt, bsdf, out = _base("Yaprak_Sonbahar")
    at = nt.nodes.new("ShaderNodeAttribute")
    at.attribute_name = "tint"
    at.location = (-900, 0)
    sep = nt.nodes.new("ShaderNodeSeparateColor")
    sep.location = (-700, 0)
    nt.links.new(at.outputs["Color"], sep.inputs["Color"])
    ramp = _ramp(nt, sep.outputs["Red"],
                 [(0.0, (0.08, 0.16, 0.03, 1)), (0.35, (0.55, 0.32, 0.03, 1)), (0.7, (0.62, 0.15, 0.03, 1)), (1.0, (0.35, 0.04, 0.02, 1))],
                 (-450, 100))
    nt.links.new(ramp.outputs["Color"], bsdf.inputs["Base Color"])
    bsdf.inputs["Roughness"].default_value = 0.8
    if "Subsurface Weight" in bsdf.inputs:
        bsdf.inputs["Subsurface Weight"].default_value = 0.15
    tc = nt.nodes.new("ShaderNodeTexCoord")
    n = _noise(nt, 1.6, 3, 0.5, tc.outputs["Object"], (-650, -400))
    _bump(nt, bsdf, n.outputs["Fac"], 0.3, 0.3)
    return mat
