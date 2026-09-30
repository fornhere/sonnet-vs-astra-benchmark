# C3_1453_Safak — 29 Mayıs 1453 şafağı. Kit kopyasında YALNIZ C3 yuvasını doldurur.
# Çalıştır: blender -b /home/forn/zaman-yarigi/kit/arazi_kiyi.blend --python build_c3.py
import bpy, bmesh, math, random, json
import numpy as np
from mathutils import Vector
from mathutils.bvhtree import BVHTree

random.seed(1453); np.random.seed(1453)
sc = bpy.context.scene
COL = bpy.data.collections['C3_1453_Safak']
F0, F1 = 1141, 1590
FA, FB = 1131, 1600

# ------------------------------------------------------------ arazi verisi
arazi = bpy.data.objects['KIT_Arazi']
me0 = arazi.data
V0 = np.array([tuple(v.co) for v in me0.vertices])
nx = int(np.argmax(np.abs(np.diff(V0[:, 1])) > 1)) + 1
n = len(V0)
ny = next(k for k in range(50, 800) if nx * k + 2 * (nx + k) - 4 == n)
G = V0[:nx * ny].reshape(ny, nx, 3)
X, Y, Z = G[:, :, 0], G[:, :, 1], G[:, :, 2]
bvh = BVHTree.FromPolygons([tuple(v) for v in V0], [tuple(p.vertices) for p in me0.polygons])
_zc = {}
def gz(x, y):
    k = (round(x / 3), round(y / 3))
    if k in _zc: return _zc[k]
    h = bvh.ray_cast(Vector((x, y, 900)), Vector((0, 0, -1)))
    z = h[0].z if h[0] is not None else -10.0
    _zc[k] = z; return z
SEA = 0.8
def land(x, y, m=3.0): return gz(x, y) > SEA + m
def site_z(cx, cy, r):
    zs = [gz(cx, cy)] + [gz(cx + r * math.cos(a), cy + r * math.sin(a)) for a in np.linspace(0, 6.28, 9)[:-1]]
    return max(zs)

# ------------------------------------------------------------ malzemeler
MATS = {}
def mat(name, col, rough=0.8, emit=None, estr=0.0, metal=0.0, alpha=None, vcol=None, two=False):
    if name in MATS: return MATS[name]
    m = bpy.data.materials.new('C3_' + name); m.use_nodes = True
    nt = m.node_tree; b = nt.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = (*col, 1); b.inputs['Roughness'].default_value = rough
    b.inputs['Metallic'].default_value = metal
    if emit is not None:
        b.inputs['Emission Color'].default_value = (*emit, 1); b.inputs['Emission Strength'].default_value = estr
    if alpha is not None: b.inputs['Alpha'].default_value = alpha
    if vcol:
        vc = nt.nodes.new('ShaderNodeVertexColor'); vc.layer_name = vcol
        nt.links.new(vc.outputs['Color'], b.inputs['Base Color'])
        nt.links.new(vc.outputs['Alpha'], b.inputs['Alpha'])
    if two: m.use_backface_culling = False
    MATS[name] = m; return m

# ------------------------------------------------------------ mesh oluşturucu
class MB:
    def __init__(s): s.V = []; s.F = []; s.M = []; s.S = []; s.mats = []
    def mi(s, m):
        if m not in s.mats: s.mats.append(m)
        return s.mats.index(m)
    def add(s, m, verts, faces, smooth=False):
        o = len(s.V); i = s.mi(m); s.V.extend(verts)
        for f in faces: s.F.append(tuple(k + o for k in f)); s.M.append(i); s.S.append(smooth)
    def build(s, name, coll=None, parent=None):
        me = bpy.data.meshes.new(name); me.from_pydata(s.V, [], s.F); me.update()
        for m in s.mats: me.materials.append(MATS[m] if isinstance(m, str) else m)
        me.polygons.foreach_set('material_index', s.M)
        try: me.polygons.foreach_set('use_smooth', s.S)
        except Exception: pass
        ob = bpy.data.objects.new(name, me); (coll or COL).objects.link(ob)
        if parent: ob.parent = parent
        return ob
def rot2(x, y, a):
    c, s_ = math.cos(a), math.sin(a); return x * c - y * s_, x * s_ + y * c
def box(b, m, cx, cy, z0, sx, sy, h, rot=0.0):
    vs = []
    for dz in (0, h):
        for px, py in ((-sx / 2, -sy / 2), (sx / 2, -sy / 2), (sx / 2, sy / 2), (-sx / 2, sy / 2)):
            rx, ry = rot2(px, py, rot); vs.append((cx + rx, cy + ry, z0 + dz))
    b.add(m, vs, [(4, 5, 6, 7), (0, 1, 5, 4), (1, 2, 6, 5), (2, 3, 7, 6), (3, 0, 4, 7)])
def gable(b, mw, mr, cx, cy, z0, sx, sy, h, rh, rot=0.0, over=1.15):
    box(b, mw, cx, cy, z0, sx, sy, h, rot)
    vs = []
    for px, py, pz in ((-sx / 2 * over, -sy / 2 * over, 0), (sx / 2 * over, -sy / 2 * over, 0), (sx / 2 * over, sy / 2 * over, 0), (-sx / 2 * over, sy / 2 * over, 0),
                       (-sx / 2 * over, 0, rh), (sx / 2 * over, 0, rh)):
        rx, ry = rot2(px, py, rot); vs.append((cx + rx, cy + ry, z0 + h + pz))
    b.add(mr, vs, [(0, 1, 5, 4), (2, 3, 4, 5), (0, 4, 3), (1, 2, 5)])
def cyl(b, m, cx, cy, z0, r0, r1, h, n=14, cap=True, smooth=False, capm=None, ang0=0.0, ang1=2 * math.pi):
    full = abs(ang1 - ang0 - 2 * math.pi) < 1e-6
    k = n if full else n + 1
    vs = []
    for r, dz in ((r0, 0), (r1, h)):
        for i in range(k):
            a = ang0 + (ang1 - ang0) * i / n
            vs.append((cx + r * math.cos(a), cy + r * math.sin(a), z0 + dz))
    fs = []
    for i in range(n):
        j = (i + 1) % k if full else i + 1
        fs.append((i, j, k + j, k + i))
    b.add(m, vs, fs, smooth)
    if cap and r1 > 0:
        c = len(vs)
        vs2 = vs[k:2 * k]
        b.add(capm or m, vs2, [tuple(range(k))] if full else [tuple(range(k))])
def cone(b, m, cx, cy, z0, r, h, n=12, smooth=False):
    vs = [(cx + r * math.cos(2 * math.pi * i / n), cy + r * math.sin(2 * math.pi * i / n), z0) for i in range(n)] + [(cx, cy, z0 + h)]
    b.add(m, vs, [(i, (i + 1) % n, n) for i in range(n)], smooth)
def dome(b, m, cx, cy, z0, r, h, n=32, rings=8, ribs=0, ramp=0.03, a0=0.0, a1=2 * math.pi, rot=0.0, smooth=True):
    full = abs(a1 - a0 - 2 * math.pi) < 1e-6
    k = n if full else n + 1
    vs = []
    for j in range(rings):
        ph = (math.pi / 2) * j / rings
        for i in range(k):
            a = a0 + (a1 - a0) * i / n
            rr = r * math.cos(ph) * (1 + (ramp * math.cos(ribs * a) * math.cos(ph) if ribs else 0))
            px, py = rr * math.cos(a), rr * math.sin(a); rx, ry = rot2(px, py, rot)
            vs.append((cx + rx, cy + ry, z0 + h * math.sin(ph)))
    vs.append((cx, cy, z0 + h)); top = len(vs) - 1
    fs = []
    for j in range(rings - 1):
        for i in range(n):
            a_, b_ = j * k + i, j * k + (i + 1) % k if full else j * k + i + 1
            fs.append((a_, b_, b_ + k, a_ + k))
    for i in range(n):
        a_, b_ = (rings - 1) * k + i, (rings - 1) * k + ((i + 1) % k if full else i + 1)
        fs.append((a_, b_, top))
    b.add(m, vs, fs, smooth)

def to_world(u, v, o, a):
    rx, ry = rot2(u, v, a); return o[0] + rx, o[1] + ry

# ------------------------------------------------------------ renk paleti
mat('tas', (0.62, 0.55, 0.44), 0.9)
mat('tas_a', (0.55, 0.45, 0.33), 0.9)
mat('tas_k', (0.42, 0.37, 0.31), 0.95)
mat('sur', (0.55, 0.46, 0.34), 0.9)
mat('sur_ust', (0.40, 0.32, 0.26), 0.9)
mat('ayasofya', (0.62, 0.34, 0.22), 0.9)
mat('ayasofya_krem', (0.70, 0.55, 0.36), 0.9)
mat('kursun', (0.30, 0.34, 0.40), 0.4, metal=0.3)
mat('kiremit1', (0.52, 0.20, 0.13), 0.85)
mat('kiremit2', (0.60, 0.29, 0.17), 0.85)
mat('kiremit3', (0.40, 0.25, 0.17), 0.9)
mat('harabe', (0.30, 0.27, 0.24), 1.0)
mat('duvar1', (0.62, 0.53, 0.40), 0.95)
mat('duvar2', (0.55, 0.44, 0.33), 0.95)
mat('agac', (0.14, 0.26, 0.11), 0.9)
mat('agac2', (0.24, 0.34, 0.14), 0.9)
mat('ahsap', (0.20, 0.12, 0.07), 0.8)
mat('ahsap_a', (0.42, 0.28, 0.15), 0.8)
mat('gemi_guverte', (0.55, 0.40, 0.24), 0.8)
mat('yelken', (0.95, 0.88, 0.72), 0.9, emit=(1.0, 0.72, 0.42), estr=0.10, two=True)
mat('yol', (0.62, 0.50, 0.34), 1.0)
mat('zincir', (0.09, 0.08, 0.075), 0.5, metal=0.6)

# ------------------------------------------------------------ kıyı konturu
def contours(th=SEA):
    A = Z > th; segs = []; P = {}
    def ipt(a, b):
        z0, z1 = Z[a], Z[b]; t = (th - z0) / (z1 - z0)
        return (float(X[a] + (X[b] - X[a]) * t), float(Y[a] + (Y[b] - Y[a]) * t))
    tab = {1: [(3, 0)], 2: [(0, 1)], 3: [(3, 1)], 4: [(1, 2)], 5: [(3, 0), (1, 2)], 6: [(0, 2)], 7: [(3, 2)], 8: [(2, 3)],
           9: [(0, 2)], 10: [(0, 1), (2, 3)], 11: [(1, 2)], 12: [(1, 3)], 13: [(0, 1)], 14: [(3, 0)]}
    for i in range(ny - 1):
        for j in range(nx - 1):
            code = int(A[i, j]) + 2 * int(A[i, j + 1]) + 4 * int(A[i + 1, j + 1]) + 8 * int(A[i + 1, j])
            if code in (0, 15): continue
            ed = [((i, j), (i, j + 1)), ((i, j + 1), (i + 1, j + 1)), ((i + 1, j), (i + 1, j + 1)), ((i, j), (i + 1, j))]
            for e1, e2 in tab[code]:
                k1, k2 = ed[e1], ed[e2]
                for k in (k1, k2):
                    if k not in P: P[k] = ipt(*k)
                segs.append((k1, k2))
    adj = {}
    for a, b in segs: adj.setdefault(a, []).append(b); adj.setdefault(b, []).append(a)
    seen = set(); chains = []
    starts = [k for k, v in adj.items() if len(v) == 1] + list(adj.keys())
    for s0 in starts:
        if s0 in seen: continue
        ch = [s0]; seen.add(s0); cur = s0
        while True:
            nxt = [q for q in adj[cur] if q not in seen]
            if not nxt: break
            cur = nxt[0]; seen.add(cur); ch.append(cur)
        pts = [P[k] for k in ch]
        L = sum(math.dist(pts[i], pts[i + 1]) for i in range(len(pts) - 1))
        if L > 400: chains.append(pts)
    return chains
def smooth_poly(pts, it=3):
    p = np.array(pts)
    for _ in range(it):
        q = p.copy(); q[1:-1] = (p[:-2] + 2 * p[1:-1] + p[2:]) / 4; p = q
    return p
def resample(p, step):
    p = np.asarray(p); d = np.r_[0, np.cumsum(np.hypot(*np.diff(p, axis=0).T))]
    t = np.arange(0, d[-1], step); return np.c_[np.interp(t, d, p[:, 0]), np.interp(t, d, p[:, 1])]
chains = [smooth_poly(c) for c in contours()]
def near_chain(x, y):
    best = None
    for c in chains:
        d = np.hypot(c[:, 0] - x, c[:, 1] - y); i = int(d.argmin())
        if best is None or d[i] < best[0]: best = (d[i], c, i)
    return best
pen = near_chain(-20, -20)[1]         # yarımada kıyısı
gal = near_chain(-1050, 650)[1]       # Galata / kuzey kıyı
print('chains', len(chains), 'pen', len(pen), 'gal', len(gal))

# ------------------------------------------------------------ SURLAR
WALL = MB()
def wall_line(pts, H=20, T=11, tower_every=3, gap=0.06, tower=(26, 36), closed=False, mw='sur', merlon=True):
    for i in range(len(pts) - 1):
        (x0, y0), (x1, y1) = pts[i], pts[i + 1]
        L = math.hypot(x1 - x0, y1 - y0)
        if L < 1: continue
        zs = [gz(x0 + (x1 - x0) * t, y0 + (y1 - y0) * t) for t in (0, 0.5, 1)]
        zb = min(zs) - 4; ztop = max(zs) + H
        ang = math.atan2(y1 - y0, x1 - x0)
        cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
        ruin = random.random() < gap
        h = ztop - zb if not ruin else (ztop - zb) * 0.35
        box(WALL, mw, cx, cy, zb, L + 2, T, h, ang)
        if merlon and not ruin:
            box(WALL, 'sur_ust', cx, cy, zb + h, L + 2, T + 3, 3.0, ang)
        if i % tower_every == 0:
            zt = gz(x0, y0) - 4
            th_ = (ztop - zt) + tower[1] - H if not ruin else (ztop - zt) * 0.6
            box(WALL, mw, x0, y0, zt, tower[0], tower[0], th_ + H * 0.0 if not ruin else th_, ang)
            if not ruin:
                box(WALL, 'sur_ust', x0, y0, zt + th_, tower[0] + 5, tower[0] + 5, 4.0, ang)
                box(WALL, 'kiremit3', x0, y0, zt + th_ + 4, tower[0] * 0.6, tower[0] * 0.6, 3.0, ang)
pen_r = resample(pen[pen[:, 0] > -4300], 30)
wall_line(pen_r, H=17, T=10)
# Galata: kıyı surları + kara surları
galr = resample(gal, 30)
gm = [p for p in galr if -1900 < p[0] < -60 and 500 < p[1] < 1500]
wall_line(gm, H=20, T=11, mw='duvar2')
GT = (-1084.0, 1069.0)
def coast_pt(x, y):
    d = np.hypot(gal[:, 0] - x, gal[:, 1] - y); return gal[int(d.argmin())]
W = coast_pt(-1880, 1000); E = coast_pt(-330, 1250)
def line_pts(a, b, step=32):
    d = math.dist(a, b); k = max(2, int(d / step)); return [(a[0] + (b[0] - a[0]) * i / k, a[1] + (b[1] - a[1]) * i / k) for i in range(k + 1)]
mid1 = (-1500, 1330); mid2 = (-720, 1290)
land_wall = line_pts(W, mid1) + line_pts(mid1, GT)[1:] + line_pts(GT, mid2)[1:] + line_pts(mid2, E)[1:]
wall_line(land_wall, H=20, T=11, mw='duvar2', tower_every=2, tower=(24, 34), gap=0.03)
WALL.build('C3_Surlar')

# ------------------------------------------------------------ AYASOFYA
def ayasofya(cx, cy, K=3.3, rot=math.radians(28)):
    b = MB(); KZ = K * 1.05
    z = site_z(cx, cy, 55 * K * 0.6) + 1.0
    def P(u, v): return to_world(u * K, v * K, (cx, cy), rot)
    # temel
    ux, uy = P(0, 0)
    box(b, 'tas_k', ux, uy, z - 30, 150 * K, 112 * K, 30, rot)
    box(b, 'tas_k', ux, uy, z - 2.5, 150 * K, 112 * K, 2.5, rot)
    # ana gövde
    def bx(m, u, v, su, sv, h, z0=0.0):
        x, y = P(u, v); box(b, m, x, y, z + z0 * KZ, su * K, sv * K, h * KZ, rot)
    bx('ayasofya', 0, 0, 64, 72, 34)
    bx('kursun', 0, 0, 64.5, 60, 34.6, )        # yan sahınlık çatısı bandı
    bx('ayasofya_krem', 0, 0, 65, 73, 3, z0=30)
    # narteks + ekzonarteks
    bx('ayasofya', -41, 0, 14, 60, 22); bx('kursun', -41, 0, 14.5, 50, 22.5)
    bx('ayasofya_krem', -50, 0, 8, 52, 15); bx('kursun', -50, 0, 8.5, 44, 15.5)
    # avlu (atrium): dört duvar
    for (u, v, su, sv) in ((-78, 0, 3, 46), (-87, 23, 22, 3), (-87, -23, 22, 3)):
        bx('duvar1', u, v, su, sv, 8)
    # payandalar (kuzey/güney)
    for s_ in (-1, 1):
        for u in (-24, -8, 8, 24):
            bx('tas_a', u, s_ * 44, 9, 15, 30)
            bx('kursun', u, s_ * 44, 8, 10, 32, z0=0)
    # pencere sıraları (koyu, kuzey/güney duvarlar ve narteks)
    mat('pencere', (0.10, 0.07, 0.05), 0.9)
    for s_ in (-1, 1):
        for u in (-28, -16, 0, 16, 28):
            bx('pencere', u, s_ * 36.4, 5.5, 0.8, 14, z0=14)
            bx('pencere', u, s_ * 36.4, 5.5, 0.8, 6, z0=2)
    for v in (-20, -10, 0, 10, 20):
        bx('pencere', -48.5, v, 0.8, 4.5, 8, z0=4)
    # batı köşe payandaları
    for s_ in (-1, 1):
        bx('tas_a', -36, s_ * 38, 12, 12, 34)
    # doğu apsis + yarım kubbe
    x, y = P(32, 0)
    cyl(b, 'ayasofya', x, y, z, 15 * K, 15 * K, 24 * KZ, n=16, ang0=-math.pi / 2 + rot, ang1=math.pi / 2 + rot, smooth=True, cap=False)
    x, y = P(32, 0)
    dome(b, 'kursun', x, y, z + 24 * KZ, 15 * K, 10 * KZ, n=16, rings=6, a0=-math.pi / 2 + rot, a1=math.pi / 2 + rot)
    # doğu ve batı yarım kubbeler (ana nef)
    for s_ in (-1, 1):
        x, y = P(s_ * 16, 0)
        dome(b, 'kursun', x, y, z + 34 * KZ, 16 * K, 15 * KZ, n=20, rings=7, a0=(-math.pi / 2 if s_ > 0 else math.pi / 2) + rot,
             a1=(math.pi / 2 if s_ > 0 else 3 * math.pi / 2) + rot)
    # tambur (kırk pencere) + yükseltilmiş ana kubbe
    x, y = P(0, 0)
    cyl(b, 'ayasofya_krem', x, y, z + 32 * KZ, 17.5 * K, 17.5 * K, 12 * KZ, n=40, smooth=True, cap=False)
    cyl(b, 'ahsap', x, y, z + 36.5 * KZ, 17.65 * K, 17.65 * K, 4 * KZ, n=40, smooth=True, cap=False)   # pencere kuşağı
    dome(b, 'kursun', x, y, z + 44 * KZ, 17.4 * K, 15 * KZ, n=80, rings=12, ribs=40, ramp=0.022)
    return b
AS = ayasofya(-588, -824, K=4.3)
AS.build('C3_Ayasofya')

# Aya İrini
def aya_irini(cx, cy, K=3.0, rot=math.radians(28)):
    b = MB(); z = site_z(cx, cy, 45 * K * 0.5) + 1.0
    def P(u, v): return to_world(u * K, v * K, (cx, cy), rot)
    x, y = P(0, 0); box(b, 'tas_k', x, y, z - 25, 62 * K, 32 * K, 25, rot)
    def bx(m, u, v, su, sv, h, z0=0.0):
        x, y = P(u, v); box(b, m, x, y, z + z0 * K, su * K, sv * K, h * K, rot)
    bx('ayasofya', 0, 0, 46, 24, 15); bx('kursun', 0, 0, 46.5, 22, 15.5)
    bx('ayasofya', -30, 0, 14, 20, 11)                          # atrium
    x, y = P(23, 0); cyl(b, 'ayasofya', x, y, z, 10 * K, 10 * K, 12 * K, n=12, ang0=-math.pi / 2 + rot, ang1=math.pi / 2 + rot, cap=False)
    dome(b, 'kursun', x, y, z + 12 * K, 10 * K, 5 * K, n=12, rings=5, a0=-math.pi / 2 + rot, a1=math.pi / 2 + rot)
    for u, r in ((-5, 7.5), (8, 6.5)):
        x, y = P(u, 0)
        cyl(b, 'ayasofya_krem', x, y, z + 15 * K, r * K, r * K, 5 * K, n=16, cap=False, smooth=True)
        dome(b, 'kursun', x, y, z + 20 * K, r * K, 5 * K, n=24, rings=6, ribs=16, ramp=0.03)
    return b
aya_irini(-430, -400, K=3.6).build('C3_AyaIrini')

# Bizans kiliseleri (çapraz planlı, kubbeli, kiremit çatılı)
def kilise(cx, cy, K=2.2, rot=0.0):
    b = MB(); z = site_z(cx, cy, 20 * K) + 0.8
    box(b, 'tas_k', cx, cy, z - 18, 26 * K, 26 * K, 18, rot)
    def bx(m, u, v, su, sv, h, z0=0.0):
        x, y = to_world(u * K, v * K, (cx, cy), rot); box(b, m, x, y, z + z0 * K, su * K, sv * K, h * K, rot)
    bx('duvar1', 0, 0, 14, 14, 12)
    gable(b, 'duvar1', 'kiremit1', *to_world(0, 0, (cx, cy), rot), z, 22 * K, 8 * K, 11 * K, 5 * K, rot=rot, over=1.05)
    gable(b, 'duvar1', 'kiremit1', *to_world(0, 0, (cx, cy), rot), z, 8 * K, 22 * K, 11 * K, 5 * K, rot=rot, over=1.05)
    x, y = to_world(0, 0, (cx, cy), rot)
    cyl(b, 'duvar2', x, y, z + 11 * K, 5 * K, 5 * K, 5 * K, n=12, cap=False)
    dome(b, 'kursun', x, y, z + 16 * K, 5.2 * K, 4 * K, n=18, rings=6, ribs=12)
    ax, ay = to_world(13 * K, 0, (cx, cy), rot)
    cyl(b, 'duvar1', ax, ay, z, 4.5 * K, 4.5 * K, 9 * K, n=10, ang0=-math.pi / 2 + rot, ang1=math.pi / 2 + rot, cap=False)
    return b
KIL = MB()
for (kx, ky, kr) in [(-2290, 290, 0.2), (-3000, 430, 0.5), (-1260, -1420, 0.3), (-1700, -780, 0.1), (-2200, -520, 0.4), (-3350, -350, 0.2)]:
    if land(kx, ky):
        kk = kilise(kx, ky, rot=kr); KIL.V += [];
        kk.build('C3_Kilise')

# Hipodrom (harap, U biçimli)
def hipodrom(cx, cy, rot, K=1.55):
    b = MB(); z = site_z(cx, cy, 90) + 0.6
    Lh, Wh = 400 * K / 1.55, 118 * K
    # iki uzun kenar + kavisli uç (sphendone)
    pts = []
    for i in range(0, 15): pts.append((-Lh / 2 + Lh * i / 14, Wh / 2))
    for i in range(1, 12):
        a = math.pi / 2 - math.pi * i / 12; pts.append((Lh / 2 + (Wh / 2) * math.cos(a) * 0.6, Wh / 2 * math.sin(a)))
    for i in range(14, -1, -1): pts.append((-Lh / 2 + Lh * i / 14, -Wh / 2))
    for i in range(len(pts) - 1):
        (u0, v0), (u1, v1) = pts[i], pts[i + 1]
        x0, y0 = to_world(u0, v0, (cx, cy), rot); x1, y1 = to_world(u1, v1, (cx, cy), rot)
        if random.random() < 0.18: continue
        L = math.hypot(x1 - x0, y1 - y0); ang = math.atan2(y1 - y0, x1 - x0)
        zb = min(gz(x0, y0), gz(x1, y1)) - 3
        box(b, 'duvar2', (x0 + x1) / 2, (y0 + y1) / 2, zb, L + 1, 9, (z - zb) + 5, ang)
    for i in range(6):
        x, y = to_world(-Lh * 0.32 + i * Lh * 0.12, 0, (cx, cy), rot)
        cyl(b, 'tas_a', x, y, z, 3.0, 2.2, 22 if i % 2 else 32, n=6)
    return b
hipodrom(-1250, -1170, math.radians(38)).build('C3_Hipodrom')

def su_kemeri(cx, cy, rot, half=270):
    b = MB(); ax = (math.cos(rot), math.sin(rot))
    pts = [(cx + ax[0] * t, cy + ax[1] * t) for t in np.arange(-half, half + 1, 6)]
    top = max(gz(*p) for p in pts) + 14
    for i in range(len(pts) - 1):
        (x0, y0), (x1, y1) = pts[i], pts[i + 1]
        if gz(x0, y0) < 2: continue
        box(b, 'tas_a', (x0 + x1) / 2, (y0 + y1) / 2, top - 7, 8, 12, 7, rot)
    for t in np.arange(-half, half + 1, 26):
        x, y = cx + ax[0] * t, cy + ax[1] * t; g = gz(x, y)
        if g < 2 or top - g < 6: continue
        box(b, 'tas_a', x, y, g - 3, 9, 13, top - g + 3 - 7, rot)
    return b
su_kemeri(-2650, -200, math.radians(-40)).build('C3_SuKemeri')

# ------------------------------------------------------------ GALATA KULESİ
def galata_kulesi(cx, cy, S=1.45):
    b = MB(); z = site_z(cx, cy, 30 * S) + 1
    cyl(b, 'tas_k', cx, cy, z - 30, 34 * S, 34 * S, 30, n=16)
    cyl(b, 'duvar2', cx, cy, z, 27 * S, 25 * S, 42 * S, n=16, smooth=True)
    cyl(b, 'tas_a', cx, cy, z + 42 * S, 25 * S, 24 * S, 58 * S, n=16, smooth=True)
    cyl(b, 'tas_k', cx, cy, z + 100 * S, 24 * S, 24 * S, 8 * S, n=16, smooth=True)
    cyl(b, 'tas_a', cx, cy, z + 108 * S, 31 * S, 31 * S, 6 * S, n=16, smooth=True)
    cyl(b, 'tas_k', cx, cy, z + 114 * S, 30 * S, 30 * S, 4 * S, n=16, smooth=True)
    cyl(b, 'duvar2', cx, cy, z + 108 * S, 22 * S, 22 * S, 24 * S, n=16, smooth=True)
    cone(b, 'kiremit3', cx, cy, z + 132 * S, 31 * S, 30 * S, n=16)
    return b
galata_kulesi(*GT).build('C3_GalataKulesi')

# ------------------------------------------------------------ ZİNCİR (Haliç ağzı)
def zincir():
    b = MB()
    gmz = [p for p in resample(gal, 6) if -1500 < p[0] < -900 and 350 < p[1] < 900]
    pz = [p for p in resample(pen, 6) if -1500 < p[0] < -900 and 0 < p[1] < 500]
    best = (1e9, None, None)
    for p in gmz[::3]:
        for q in pz[::3]:
            d = math.dist(p, q)
            if d < best[0]: best = (d, p, q)
    _, gp, pp = best
    A = np.array(pp); B = np.array(gp)
    print('zincir', A, B, best[0])
    # kuleler
    for (px, py, nm) in ((A[0], A[1], 'Eugenios'), (B[0], B[1], 'Kemankes')):
        z = gz(px, py)
        for k in range(2):
            pass
        box(b, 'tas_a', px, py, z - 10, 56, 56, 100)
        box(b, 'sur_ust', px, py, z + 90, 66, 66, 9)
        box(b, 'kiremit3', px, py, z + 99, 38, 38, 10)
    d = B - A; Ln = np.hypot(*d); ang = math.atan2(d[1], d[0]); k = int(Ln / 34)
    for i in range(k):
        t = (i + 0.5) / k; p = A + d * t
        box(b, 'ahsap', p[0], p[1], 0.3, 18, 8, 6.5, ang + 1.5708)
    for i in range(k * 2):
        t = (i + 0.5) / (k * 2); p = A + d * t
        box(b, 'zincir', p[0], p[1], 1.2, 9, 3.0, 2.2, ang + 1.5708)
    return b, A, B
ZB, ZA, ZBp = zincir(); ZB.build('C3_Zincir')

json.dump(dict(A=list(map(float, ZA)), B=list(map(float, ZBp))), open('/tmp/zincir.json', 'w'))
exec(open('/home/forn/sonnet-vs-astra/z1-tek-ajan-1453/sonnet/build_c3_b.py').read())
