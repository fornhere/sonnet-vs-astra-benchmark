# exec() ile build.py icinden calisir. Sinematik ucus: kamera + hedef bosluklari her karede anahtar karelenir.
import numpy as np

FPS = 24
DUR = 20.0                      # saniye (video suresi)
STORY = 24.0                    # yol haritasi zaman olcegi (KF zamanlari)
N_FRAMES = int(DUR * FPS)
scn.frame_start = 1
scn.frame_end = N_FRAMES


def hermite_path(times, pts, t):
    """Non-uniform Catmull-Rom (Hermite), t dizi."""
    times = np.asarray(times, dtype=float)
    pts = np.asarray(pts, dtype=float)
    n = len(times)
    m = np.zeros_like(pts)
    for i in range(n):
        if i == 0:
            m[i] = (pts[1] - pts[0]) / (times[1] - times[0])
        elif i == n - 1:
            m[i] = (pts[-1] - pts[-2]) / (times[-1] - times[-2])
        else:
            m[i] = (pts[i + 1] - pts[i - 1]) / (times[i + 1] - times[i - 1])
    out = np.zeros((len(t), pts.shape[1]))
    for k, tt in enumerate(t):
        i = int(np.clip(np.searchsorted(times, tt) - 1, 0, n - 2))
        h = times[i + 1] - times[i]
        u = (tt - times[i]) / h
        h00 = 2 * u ** 3 - 3 * u ** 2 + 1
        h10 = u ** 3 - 2 * u ** 2 + u
        h01 = -2 * u ** 3 + 3 * u ** 2
        h11 = u ** 3 - u ** 2
        out[k] = h00 * pts[i] + h10 * h * m[i] + h01 * pts[i + 1] + h11 * h * m[i + 1]
    return out


def ease(u):
    return u * u * (3 - 2 * u)


# --- yol takibi: koyden kapiya
def road_pt(s, up=6.0, side=0.0):
    x, y, z, a = road.at(np.array([s]))
    x, y, z, a = float(x[0]), float(y[0]), float(z[0]), float(a[0])
    return (x - math.sin(a) * side, y + math.cos(a) * side, z + up)


# (zaman s, kamera, hedef)
KF = []
KF.append((0.0, (-70, -390, 8.0), (12, -30, 62)))
KF.append((2.8, (-30, -320, 13.0), (8, -28, 64)))
KF.append((5.4, (-95, -235, 27.0), (-20, -60, 54)))
KF.append((7.2, (-175, -160, 62.0), (-70, -90, 44)))
def mixp(a, b, w):
    return tuple(a[i] * (1 - w) + b[i] * w for i in range(3))


CASTLE_LOOK = (0, -35, 68)
KF.append((8.8, road_pt(300, 38, 12), mixp(road_pt(250, 10), CASTLE_LOOK, 0.55)))
KF.append((10.6, road_pt(205, 30, 8), mixp(road_pt(150, 16), CASTLE_LOOK, 0.6)))
KF.append((12.4, road_pt(130, 26, 6), mixp(road_pt(80, 22), CASTLE_LOOK, 0.6)))
KF.append((13.8, road_pt(78, 26, 10), (6, -50, 66)))
KF.append((14.9, (-6, -96, 104), (6, -45, 80)))
KF.append((16.1, (8, -62, 126), (0, -8, 94)))
KF.append((17.6, (58, 8, 128), (-2, 16, 96)))
KF.append((19.0, (56, 92, 130), (0, 12, 84)))
KF.append((20.4, (-78, 118, 132), (0, 12, 84)))
KF.append((21.8, (-186, 10, 130), (0, 10, 78)))
KF.append((24.0, (-130, -250, 74), (2, -5, 72)))

tk = np.array([k[0] for k in KF])
cam_pts = [k[1] for k in KF]
tgt_pts = [k[2] for k in KF]

frames = np.arange(N_FRAMES)
tsec = frames / FPS
# yumusak hiz: genel ease-in-out
uu = tsec / DUR
uu = uu + 0.45 * (ease(np.clip(uu, 0, 1)) - uu)
tt = uu * STORY
cpos = hermite_path(tk, cam_pts, tt)
tpos = hermite_path(tk, tgt_pts, tt)

# --- arazi/su uzerinde guvenli yukseklik (yol kenari tepeleri vb. icin)
def ground_at(x, y):
    g = terrain.sample_height(xs, ys, Hh, np.array([x]), np.array([y]))[0]
    for dx in (-14, 0, 14):
        for dy in (-14, 0, 14):
            g = max(g, terrain.sample_height(xs, ys, Hh, np.array([x + dx]), np.array([y + dy]))[0])
    return max(g, 0.0)


def smooth1d(a, w):
    k = np.ones(w) / w
    ap = np.pad(a, (w // 2, w // 2), mode="edge")
    return np.convolve(ap, k, mode="valid")[: len(a)]


gr = np.array([ground_at(p[0], p[1]) for p in cpos])
CLEAR = np.interp(tsec, [0, 2.0, 4, 20], [8.0, 8.0, 14.0, 14.0])
zc = np.maximum(cpos[:, 2], gr + CLEAR)
zc = smooth1d(zc, 41)
zc = np.maximum(zc, gr + CLEAR * 0.8)
zc = smooth1d(zc, 15)
cpos[:, 2] = zc
for c_ in (0, 1):
    cpos[:, c_] = smooth1d(cpos[:, c_], 9)

target = new_empty("Kamera_Hedef", col_cam, (0, 0, 60), "SPHERE", 3.0)
for i, f in enumerate(frames):
    scn.frame_set(int(f) + 1)
    cam.location = tuple(cpos[i])
    cam.keyframe_insert("location", frame=int(f) + 1)
    target.location = tuple(tpos[i])
    target.keyframe_insert("location", frame=int(f) + 1)
# lineer interpolasyon (zaten her karede)
for ob in (cam, target):
    if ob.animation_data and ob.animation_data.action:
        try:
            for fc in ob.animation_data.action.fcurves:
                for kp in fc.keyframe_points:
                    kp.interpolation = "LINEAR"
        except Exception:
            pass

trk = cam.constraints.new("TRACK_TO")
trk.target = target
trk.track_axis = "TRACK_NEGATIVE_Z"
trk.up_axis = "UP_Y"
cam.data.dof.use_dof = True
cam.data.dof.focus_object = target
cam.data.dof.aperture_fstop = 5.6
cam.data.lens = 30
scn.frame_set(1)

# ---------------------------------------------------------------------------
# Gun batimi ilerlemesi: gunes alcalir, pencereler daha cok parlar (anahtar kareli)
# ---------------------------------------------------------------------------
sky_node = world.node_tree.nodes["Gok"]
glow_node = M["window"].node_tree.nodes["GlowStrength"]
for frame, elev, rot, glow, expo in ((1, 5.5, 212.0, 2.2, -0.7), (int(N_FRAMES * 0.45), 4.2, 216.0, 4.5, -0.65), (N_FRAMES, 2.4, 224.0, 9.0, -0.25)):
    sky_node.sun_elevation = math.radians(elev)
    sky_node.sun_rotation = math.radians(rot)
    sky_node.keyframe_insert("sun_elevation", frame=frame)
    sky_node.keyframe_insert("sun_rotation", frame=frame)
    glow_node.inputs[1].default_value = glow
    glow_node.inputs[1].keyframe_insert("default_value", frame=frame)
    scn.view_settings.exposure = expo
    scn.keyframe_insert(data_path="view_settings.exposure", frame=frame)
scn.frame_set(1)

# ---------------------------------------------------------------------------
# Ek sabit kameralar (kapak / ilustrasyon icin)
# ---------------------------------------------------------------------------
def still_cam(name, loc, tgt, lens=35, fstop=8.0):
    cd = bpy.data.cameras.new(name)
    cd.lens = lens
    cd.sensor_width = 36
    cd.clip_end = 8000
    co = bpy.data.objects.new(name, cd)
    col_cam.objects.link(co)
    co.location = loc
    d = Vector(tgt) - Vector(loc)
    co.rotation_euler = d.to_track_quat("-Z", "Y").to_euler()
    return co

from mathutils import Vector
still_cam("Kamera_Kapak_Ana", (-190, -360, 92), (0, 0, 70), 38)
still_cam("Kamera_Kapak_Havadan", (150, -170, 190), (0, 5, 66), 34)
still_cam("Kamera_Avlu", (18, -38, 66), (-2, 16, 70), 26)
still_cam("Kamera_Gun_Batimi_Goldan", (40, -520, 10), (0, 0, 66), 50)
