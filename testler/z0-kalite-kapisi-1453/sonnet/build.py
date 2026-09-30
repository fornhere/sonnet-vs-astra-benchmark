"""Istanbul, 29 Mayis 1453 safagi - Sarayburnu'ndan tek sabit kamera.
Her sey Blender icinde prosedurel uretilir. Kullanim:
  blender -b --python build.py -- [--test]
"""
import bpy, bmesh, math, random, sys, os
from math import sin, cos, pi, atan2, sqrt, exp
from mathutils import Vector, Matrix, noise as mn

random.seed(1453)
TEST = '--test' in sys.argv
HERE = os.path.dirname(os.path.abspath(__file__))

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
coll = scene.collection

# ------------------------------------------------------------ yardimcilar
def sst(a, b, x):
    t = min(1.0, max(0.0, (x - a) / (b - a)))
    return t * t * (3 - 2 * t)

def lerp(a, b, t): return a + (b - a) * t
def clamp(x, a=0.0, b=1.0): return max(a, min(b, x))

def fbm(x, y, o=3):
    v, a, f = 0.0, 1.0, 1.0
    for i in range(o):
        v += a * mn.noise(Vector((x * f, y * f, 3.7 * i)))
        a *= 0.5; f *= 2.0
    return v * 0.6

def jit(c, j):
    if not j: return c
    k = 1 + random.uniform(-j, j)
    return (c[0] * k, c[1] * k * (1 + random.uniform(-j, j) * 0.3), c[2] * k)

# ------------------------------------------------------------ cografya
# Kamera -X'e bakar; sag = +Y (Haliç / Galata), sol = -Y (Marmara)
def s_c(x): return -38 - 0.20 * (40 - x)      # Marmara kiyisi
def n_c(x): return 45 + 0.15 * (40 - x)       # Halic guney kiyisi (sur hatti)
def hn_c(x): return 100 + 0.25 * (40 - x)     # Halic kuzey kiyisi (Galata)

HS = (-330.0, -52.0)      # Ayasofya
HIPPO = (-560.0, -98.0)   # Hipodrom

def base_el(x, y):
    e = 8 + 27 * sst(-60, -330, x) + 20 * sst(-520, -1500, x)
    return e + 5 * fbm(x / 220, y / 220)

def terrain_h(x, y):
    d1 = min(y - s_c(x), n_c(x) - y, 40 - x)
    d2 = y - hn_c(x)
    if d1 > 0:
        h1 = -3 + 9 * sst(0, 14, d1) + base_el(x, y) * sst(10, 110, d1)
    else:
        h1 = -3 + d1 * 0.06
    if d2 > 0:
        h2 = -3 + 9 * sst(0, 14, d2) + (12 + 55 * sst(15, 240, d2) + 12 * fbm(x / 160, y / 160)) * sst(8, 90, d2)
    else:
        h2 = -3 + d2 * 0.06
    h = max(h1, h2)
    # Ayasofya platosu
    w = 1 - sst(70, 150, sqrt(((x - HS[0]) / 1.0) ** 2 + ((y - HS[1]) / 0.9) ** 2))
    h = lerp(h, 37.0, w * (1 if d1 > 20 else 0))
    # Hipodrom platosu
    q = sqrt(((x - HIPPO[0]) / 1.9) ** 2 + ((y - HIPPO[1]) / 0.8) ** 2)
    w = 1 - sst(70, 110, q)
    h = lerp(h, 33.0, w * (1 if d1 > 20 else 0))
    return h

def mese_dist(x, y):   # Mese (ana cadde)
    return abs(y - (-8 - 0.05 * (x + 100)))

def ter_col(x, y, h):
    n = fbm(x / 70, y / 70) + 0.5
    g = fbm(x / 30 + 9, y / 30) + 0.5
    grass = (0.09, 0.12, 0.035); dry = (0.33, 0.25, 0.115); earth = (0.36, 0.26, 0.16)
    t = clamp(n * 2.0 - 0.7); u = clamp(g * 2.2 - 0.9)
    c = [lerp(lerp(dry[i], grass[i], u), earth[i], t * 0.5) for i in range(3)]
    d1 = min(y - s_c(x), n_c(x) - y)
    if 0 < d1 < 10 or 0 < (y - hn_c(x)) < 10:   # kiyi taslari
        c = [0.24, 0.21, 0.17]
    if h < 0.6:
        c = [0.10, 0.09, 0.07]
    if d1 > 15 and mese_dist(x, y) < 3.2 and x < 20:
        c = [0.30, 0.245, 0.17]
    return c

# ------------------------------------------------------------ mesh kurucu
def _faces(verts):
    return list({f for v in verts for f in v.link_faces})

class MB:
    def __init__(s, name, mat):
        s.name = name; s.mat = mat
        s.bm = bmesh.new()
        s.col = s.bm.loops.layers.float_color.new('col')

    def paint(s, faces, c, smooth=False):
        for f in faces:
            f.smooth = smooth
            for l in f.loops:
                l[s.col] = (c[0], c[1], c[2], 1.0)

    def box(s, P, c, size, rz=0.0, col=(.5, .5, .5), j=0.0):
        Mx = P @ Matrix.Translation(c) @ Matrix.Rotation(rz, 4, 'Z') @ Matrix.Diagonal((size[0], size[1], size[2], 1))
        r = bmesh.ops.create_cube(s.bm, size=1.0, matrix=Mx)
        s.paint(_faces(r['verts']), jit(col, j))

    def cyl(s, P, c, r, h, r2=None, seg=16, col=(.5, .5, .5), j=0.0, smooth=False):
        Mx = P @ Matrix.Translation(c) @ Matrix.Diagonal((1, 1, h, 1))
        r_ = bmesh.ops.create_cone(s.bm, cap_ends=True, cap_tris=False, segments=seg,
                                   radius1=r, radius2=(r if r2 is None else r2), depth=1.0, matrix=Mx)
        s.paint(_faces(r_['verts']), jit(col, j), smooth)

    def sph(s, P, c, rad, col=(.5, .5, .5), us=24, vs=12, smooth=True, j=0.0):
        Mx = P @ Matrix.Translation(c) @ Matrix.Diagonal((rad[0], rad[1], rad[2], 1))
        r = bmesh.ops.create_uvsphere(s.bm, u_segments=us, v_segments=vs, radius=1.0, matrix=Mx)
        s.paint(_faces(r['verts']), jit(col, j), smooth)
        return r['verts']

    def bar(s, P, a, b, th, col=(.3, .2, .12)):
        a = Vector(a); b = Vector(b); d = b - a; L = d.length
        if L < 1e-5: return
        up = 'X' if abs(d.normalized().y) > 0.99 else 'Y'
        q = d.normalized().to_track_quat('Z', up)
        Mx = P @ Matrix.Translation((a + b) / 2) @ q.to_matrix().to_4x4() @ Matrix.Diagonal((th, th, L, 1))
        r = bmesh.ops.create_cube(s.bm, size=1.0, matrix=Mx)
        s.paint(_faces(r['verts']), col)

    def poly(s, P, pts, col, smooth=False):
        vs = [s.bm.verts.new(P @ Vector(p)) for p in pts]
        try:
            f = s.bm.faces.new(vs)
        except ValueError:
            return
        s.paint([f], col, smooth)

    def finish(s, smooth=False):
        me = bpy.data.meshes.new(s.name)
        s.bm.to_mesh(me); s.bm.free()
        if smooth:
            for p in me.polygons: p.use_smooth = True
        me.materials.append(s.mat)
        ob = bpy.data.objects.new(s.name, me)
        coll.objects.link(ob)
        return ob

# ------------------------------------------------------------ malzemeler
def new_mat(name):
    m = bpy.data.materials.new(name); m.use_nodes = True
    nt = m.node_tree
    for n in list(nt.nodes): nt.nodes.remove(n)
    return m, nt.nodes, nt.links

def out_principled(nodes, links, **kw):
    out = nodes.new('ShaderNodeOutputMaterial')
    bs = nodes.new('ShaderNodeBsdfPrincipled')
    for k, v in kw.items():
        if k in bs.inputs: bs.inputs[k].default_value = v
    links.new(bs.outputs[0], out.inputs['Surface'])
    return bs

def mat_vcol(name, rough=0.85, bump=0.25, scale=6.0, metallic=0.0, tint=None):
    m, nodes, links = new_mat(name)
    bs = out_principled(nodes, links, Roughness=rough, Metallic=metallic)
    vc = nodes.new('ShaderNodeVertexColor'); vc.layer_name = 'col'
    tc = nodes.new('ShaderNodeTexCoord')
    nz = nodes.new('ShaderNodeTexNoise'); nz.inputs['Scale'].default_value = scale
    nz.inputs['Detail'].default_value = 6
    links.new(tc.outputs['Object'], nz.inputs['Vector'])
    mix = nodes.new('ShaderNodeMix'); mix.data_type = 'RGBA'; mix.blend_type = 'MULTIPLY'
    mix.inputs['Factor'].default_value = 0.55
    links.new(vc.outputs['Color'], mix.inputs['A'])
    links.new(nz.outputs['Fac'], mix.inputs['B'])
    # nz fac ~0.5 ortalama -> kontrast icin 2x
    mul = nodes.new('ShaderNodeMath'); mul.operation = 'MULTIPLY'; mul.inputs[1].default_value = 1.8
    links.new(nz.outputs['Fac'], mul.inputs[0])
    links.new(mul.outputs[0], mix.inputs['B'])
    links.new(mix.outputs['Result'], bs.inputs['Base Color'])
    bp = nodes.new('ShaderNodeBump'); bp.inputs['Strength'].default_value = bump
    nz2 = nodes.new('ShaderNodeTexNoise'); nz2.inputs['Scale'].default_value = scale * 6
    links.new(tc.outputs['Object'], nz2.inputs['Vector'])
    links.new(nz2.outputs['Fac'], bp.inputs['Height'])
    links.new(bp.outputs['Normal'], bs.inputs['Normal'])
    return m

def mat_stone():
    m, nodes, links = new_mat('Sur_Tas_Tugla')
    bs = out_principled(nodes, links, Roughness=0.9)
    tc = nodes.new('ShaderNodeTexCoord')
    wv = nodes.new('ShaderNodeTexWave'); wv.wave_type = 'BANDS'; wv.bands_direction = 'Z'
    wv.inputs['Scale'].default_value = 0.42; wv.inputs['Distortion'].default_value = 1.2
    wv.inputs['Detail'].default_value = 2
    links.new(tc.outputs['Object'], wv.inputs['Vector'])
    ramp = nodes.new('ShaderNodeValToRGB')
    ramp.color_ramp.interpolation = 'CONSTANT'
    ramp.color_ramp.elements[0].position = 0.0; ramp.color_ramp.elements[0].color = (0.40, 0.17, 0.10, 1)   # tugla kusagi
    e = ramp.color_ramp.elements.new(0.36); e.color = (0.46, 0.38, 0.29, 1)                            # kesme tas
    links.new(wv.outputs['Fac'], ramp.inputs['Fac'])
    nz = nodes.new('ShaderNodeTexNoise'); nz.inputs['Scale'].default_value = 1.6; nz.inputs['Detail'].default_value = 8
    links.new(tc.outputs['Object'], nz.inputs['Vector'])
    mul = nodes.new('ShaderNodeMath'); mul.operation = 'MULTIPLY'; mul.inputs[1].default_value = 1.7
    links.new(nz.outputs['Fac'], mul.inputs[0])
    mix = nodes.new('ShaderNodeMix'); mix.data_type = 'RGBA'; mix.blend_type = 'MULTIPLY'
    mix.inputs['Factor'].default_value = 0.8
    links.new(ramp.outputs['Color'], mix.inputs['A']); links.new(mul.outputs[0], mix.inputs['B'])
    links.new(mix.outputs['Result'], bs.inputs['Base Color'])
    bp = nodes.new('ShaderNodeBump'); bp.inputs['Strength'].default_value = 0.6
    nz2 = nodes.new('ShaderNodeTexNoise'); nz2.inputs['Scale'].default_value = 5; nz2.inputs['Detail'].default_value = 10
    links.new(tc.outputs['Object'], nz2.inputs['Vector'])
    links.new(nz2.outputs['Fac'], bp.inputs['Height'])
    links.new(bp.outputs['Normal'], bs.inputs['Normal'])
    return m

def mat_water():
    m, nodes, links = new_mat('Deniz')
    bs = out_principled(nodes, links, Roughness=0.045)
    bs.inputs['Base Color'].default_value = (0.012, 0.03, 0.04, 1)
    bs.inputs['IOR'].default_value = 1.333
    tc = nodes.new('ShaderNodeTexCoord')
    mp = nodes.new('ShaderNodeMapping'); mp.inputs['Scale'].default_value = (0.35, 1.3, 1.0)
    links.new(tc.outputs['Object'], mp.inputs['Vector'])
    nz = nodes.new('ShaderNodeTexNoise'); nz.inputs['Scale'].default_value = 1.0; nz.inputs['Detail'].default_value = 7
    nz.inputs['Roughness'].default_value = 0.55
    links.new(mp.outputs[0], nz.inputs['Vector'])
    bp = nodes.new('ShaderNodeBump'); bp.inputs['Strength'].default_value = 0.10; bp.inputs['Distance'].default_value = 0.4
    links.new(nz.outputs['Fac'], bp.inputs['Height'])
    links.new(bp.outputs['Normal'], bs.inputs['Normal'])
    return m

def mat_emit(name, col, strength):
    m, nodes, links = new_mat(name)
    out = nodes.new('ShaderNodeOutputMaterial'); em = nodes.new('ShaderNodeEmission')
    em.inputs['Color'].default_value = (*col, 1); em.inputs['Strength'].default_value = strength
    links.new(em.outputs[0], out.inputs['Surface'])
    return m

def mat_smoke(name, dens, col):
    m, nodes, links = new_mat(name)
    out = nodes.new('ShaderNodeOutputMaterial')
    tc = nodes.new('ShaderNodeTexCoord')
    ln = nodes.new('ShaderNodeVectorMath'); ln.operation = 'LENGTH'
    links.new(tc.outputs['Object'], ln.inputs[0])
    inv = nodes.new('ShaderNodeMapRange'); inv.inputs['From Min'].default_value = 0.0; inv.inputs['From Max'].default_value = 1.0
    inv.inputs['To Min'].default_value = 1.0; inv.inputs['To Max'].default_value = 0.0
    links.new(ln.outputs['Value'], inv.inputs['Value'])
    nz = nodes.new('ShaderNodeTexNoise'); nz.inputs['Scale'].default_value = 2.4; nz.inputs['Detail'].default_value = 8
    nz.inputs['Roughness'].default_value = 0.65
    links.new(tc.outputs['Object'], nz.inputs['Vector'])
    mr = nodes.new('ShaderNodeMapRange'); mr.inputs['From Min'].default_value = 0.3; mr.inputs['From Max'].default_value = 0.75
    links.new(nz.outputs['Fac'], mr.inputs['Value'])
    m1 = nodes.new('ShaderNodeMath'); m1.operation = 'MULTIPLY'
    links.new(inv.outputs[0], m1.inputs[0]); links.new(mr.outputs[0], m1.inputs[1])
    m2 = nodes.new('ShaderNodeMath'); m2.operation = 'MULTIPLY'; m2.inputs[1].default_value = dens * 0.55
    links.new(m1.outputs[0], m2.inputs[0])
    pv = nodes.new('ShaderNodeVolumePrincipled')
    pv.inputs['Color'].default_value = (*col, 1)
    pv.inputs['Anisotropy'].default_value = 0.35
    links.new(m2.outputs[0], pv.inputs['Density'])
    links.new(pv.outputs[0], out.inputs['Volume'])
    return m

def mat_fog():
    m, nodes, links = new_mat('Sabah_Sisi')
    out = nodes.new('ShaderNodeOutputMaterial')
    geo = nodes.new('ShaderNodeNewGeometry')
    sep = nodes.new('ShaderNodeSeparateXYZ')
    links.new(geo.outputs['Position'], sep.inputs[0])
    mz = nodes.new('ShaderNodeMath'); mz.operation = 'MULTIPLY'; mz.inputs[1].default_value = -1 / 42.0
    links.new(sep.outputs['Z'], mz.inputs[0])
    ex = nodes.new('ShaderNodeMath'); ex.operation = 'EXPONENT'
    links.new(mz.outputs[0], ex.inputs[0])
    # yatay degisim: hafif noise
    nz = nodes.new('ShaderNodeTexNoise'); nz.inputs['Scale'].default_value = 0.004; nz.inputs['Detail'].default_value = 3
    links.new(geo.outputs['Position'], nz.inputs['Vector'])
    nm = nodes.new('ShaderNodeMath'); nm.operation = 'MULTIPLY_ADD'; nm.inputs[1].default_value = 1.3; nm.inputs[2].default_value = 0.35
    links.new(nz.outputs['Fac'], nm.inputs[0])
    md = nodes.new('ShaderNodeMath'); md.operation = 'MULTIPLY'; md.inputs[1].default_value = 0.0011
    links.new(ex.outputs[0], md.inputs[0])
    md2 = nodes.new('ShaderNodeMath'); md2.operation = 'MULTIPLY'
    links.new(md.outputs[0], md2.inputs[0]); links.new(nm.outputs[0], md2.inputs[1])
    pv = nodes.new('ShaderNodeVolumeScatter')
    pv.inputs['Color'].default_value = (0.95, 0.80, 0.70, 1)
    pv.inputs['Anisotropy'].default_value = 0.15
    links.new(md2.outputs[0], pv.inputs['Density'])
    links.new(pv.outputs[0], out.inputs['Volume'])
    return m

MAT = {
    'stone': mat_stone(),
    'plaster': mat_vcol('Siva', 0.9, 0.35, 3.0),
    'house': mat_vcol('Ev', 0.92, 0.5, 2.0),
    'lead': mat_vcol('Kursun', 0.5, 0.15, 1.2, metallic=0.35),
    'dark': mat_vcol('Pencere', 0.5, 0.0, 1.0),
    'tree': mat_vcol('Agac', 0.95, 0.6, 0.6),
    'ground': mat_vcol('Zemin', 0.96, 0.7, 0.05),
    'wood': mat_vcol('Ahsap_Yelken', 0.8, 0.4, 3.0),
    'water': mat_water(),
}

# ------------------------------------------------------------ arazi
def axis_steps(a0, a1, ref, k=0.012, base=4.0):
    out = []; v = a0
    # a0 -> a1 (artan), adim mesafeye gore
    while v < a1:
        out.append(v)
        v += base + k * abs(v - ref)
    out.append(a1)
    return out

xs = axis_steps(-3100, 100, 30)
ys = axis_steps(-1000, 1700, 5)
ter = MB('Arazi', MAT['ground'])
bm = ter.bm
grid = []
for xv in xs:
    row = []
    for yv in ys:
        h = terrain_h(xv, yv)
        vv = bm.verts.new((xv, yv, h))
        row.append((vv, ter_col(xv, yv, h)))
    grid.append(row)
for i in range(len(xs) - 1):
    for j in range(len(ys) - 1):
        vs = [grid[i][j], grid[i + 1][j], grid[i + 1][j + 1], grid[i][j + 1]]
        f = bm.faces.new([v[0] for v in vs])
        f.smooth = True
        for l, v in zip(f.loops, vs):
            l[ter.col] = (*v[1], 1.0)
ter.finish(smooth=True)

water = bpy.data.objects.new('Deniz', bpy.data.meshes.new('Deniz'))
wb = bmesh.new()
bmesh.ops.create_grid(wb, x_segments=1, y_segments=1, size=14000.0)
wb.to_mesh(water.data); wb.free()
water.data.materials.append(MAT['water'])
water.location = (-2500, 300, 0)
coll.objects.link(water)

def gz(x, y): return max(terrain_h(x, y), 0.0)

# ------------------------------------------------------------ surlar
ST = MB('Surlar', MAT['stone'])
I = Matrix.Identity(4)
STC = (1, 1, 1)

def wall_path(pts, top, thick, merl=True, tower_k=3, tsize=8.5, thi=6.0, base=-3.0, tcolor=STC):
    n = len(pts)
    for i in range(n - 1):
        a = Vector((*pts[i], 0)); b = Vector((*pts[i + 1], 0))
        d = b - a; L = d.length; ang = atan2(d.y, d.x)
        m = (a + b) / 2
        ST.box(I, (m.x, m.y, (top + base) / 2), (L + 0.6, thick, top - base), rz=ang, col=STC)
        # sur ustu (yol) ve mazgal
        if merl:
            k = max(1, int(L / 2.6))
            nx, ny = -sin(ang), cos(ang)
            for q in range(k):
                t = (q + 0.5) / k
                p = a + d * t
                for sgn in (-1, 1):
                    ST.box(I, (p.x + nx * sgn * (thick / 2 - 0.35), p.y + ny * sgn * (thick / 2 - 0.35), top + 0.8),
                           (1.4, 0.8, 1.6), rz=ang, col=STC)
    if tower_k:
        for i in range(0, n, tower_k):
            p = Vector((*pts[i], 0))
            j = min(i + 1, n - 1); k0 = max(i - 1, 0)
            dd = Vector(pts[j]) - Vector(pts[k0]); ang = atan2(dd.y, dd.x)
            th = top + thi + random.uniform(-1.0, 2.0)
            ST.box(I, (p.x, p.y, (th + base) / 2), (tsize, tsize, th - base), rz=ang, col=STC)
            if merl:
                ST.box(I, (p.x, p.y, th + 0.15), (tsize + 1.4, tsize + 1.4, 0.9), rz=ang, col=STC)
                for sx in (-1, 1):
                    for sy in (-1, 1):
                        for q in (-0.5, 0.5):
                            lp = Vector((sx * (tsize / 2 + 0.2), sy * q * tsize * 0.7, 0))
                            for (u, v) in ((sx * (tsize / 2 + 0.2), q * tsize * 0.75 * sy), (q * tsize * 0.75 * sy, sx * (tsize / 2 + 0.2))):
                                pass
                # mazgallar: dort kenar
                for e in range(4):
                    a2 = ang + e * pi / 2
                    for q in (-3, 0, 3):
                        u = tsize / 2 + 0.2
                        cx = p.x + cos(a2) * u - sin(a2) * q * 0.9
                        cy = p.y + sin(a2) * u + cos(a2) * q * 0.9
                        ST.box(I, (cx, cy, th + 1.2), (1.4, 1.5, 1.7), rz=a2, col=STC)
            # dar pencereler (deniz yonu) - koyu
            for e in (1, 3):
                a2 = ang + e * pi / 2
                DK.box(I, (p.x + cos(a2) * (tsize / 2 + 0.06), p.y + sin(a2) * (tsize / 2 + 0.06), th - 4.0),
                       (0.3, 0.9, 2.6), rz=a2, col=(0.008, 0.008, 0.01))

DK = MB('Pencereler', MAT['dark'])

def coast_pts(fn, off, x0, x1, step):
    pts = []; x = x0
    while x > x1:
        pts.append((x, fn(x) + off)); x -= step
    return pts

# Marmara suru (sol) ve Halic suru (sag), uca donen burun suru
left = coast_pts(s_c, 4.5, 34, -1500, 21)
right = coast_pts(n_c, -4.5, 34, -1500, 21)
tip = [(34, s_c(34) + 4.5), (37, s_c(37) + 20), (38, 0), (37, n_c(37) - 20), (34, n_c(34) - 4.5)]
wall_path(left, 11.5, 3.6, merl=True, tower_k=3, thi=6)
wall_path(right, 10.5, 3.4, merl=True, tower_k=3, thi=6)
wall_path(tip, 11.5, 4.0, merl=True, tower_k=0)
# uc kulesi (Eugenios) - kamera altinda, on planda
def big_tower(x, y, ang, h=22):
    ST.box(I, (x, y, (h - 4) / 2), (13, 13, h + 4), rz=ang, col=STC)
    ST.box(I, (x, y, h + 0.3), (15, 15, 1.0), rz=ang, col=STC)
    for e in range(4):
        a2 = ang + e * pi / 2
        for q in (-5, -2.5, 0, 2.5, 5):
            u = 7.3
            ST.box(I, (x + cos(a2) * u - sin(a2) * q, y + sin(a2) * u + cos(a2) * q, h + 1.6),
                   (1.5, 1.7, 1.9), rz=a2, col=STC)
big_tower(-14, s_c(-14) + 8, 0.2, 21)
big_tower(-14, n_c(-14) - 8, -0.15, 22)
# Galata (Cenevizli) suru ve kule
gal = coast_pts(hn_c, 5, -120, -900, 22)
wall_path(gal, 8.5, 2.8, merl=True, tower_k=4, tsize=7, thi=4)
# Hipodrom (kemerli yigma set) - dis duvar halkasi
hip = []
for i in range(64):
    a = 2 * pi * i / 64
    hip.append((HIPPO[0] + 190 * cos(a), HIPPO[1] + 40 * sin(a)))
hip.append(hip[0])
wall_path(hip, 13.5, 6.0, merl=False, tower_k=0, base=-8.0)
# Kara yonu icin arka plan: Theodosius suru - uzakta (sis icinde)
far = [(-1500 - i * 20, 300 - i * 12) for i in range(0)]
ST.finish()

# ------------------------------------------------------------ Ayasofya
PL = MB('Ayasofya_Siva', MAT['plaster'])
LD = MB('Ayasofya_Kursun', MAT['lead'])

def hagia_sophia(x, y, g, rot):
    P = Matrix.Translation((x, y, g)) @ Matrix.Rotation(rot, 4, 'Z')
    ch = (0.62, 0.36, 0.25); ch2 = (0.68, 0.44, 0.30); lc = (0.17, 0.18, 0.20); lc2 = (0.24, 0.25, 0.27)
    PL.box(P, (0, 0, 10), (62, 60, 22), col=ch, j=0.03)
    LD.box(P, (0, 0, 21.3), (62.6, 60.6, 0.8), col=lc)
    PL.box(P, (0, 0, 19), (36, 44, 38), col=ch2, j=0.02)
    for sx in (-16, 16):
        for sy in (-1, 1):
            PL.box(P, (sx, sy * 36, 19), (9, 12, 38), col=ch, j=0.03)
            LD.box(P, (sx, sy * 36, 38.3), (9.6, 12.6, 0.7), col=lc)
    for sx in (-1, 1):
        PL.cyl(P, (sx * 20, 0, 26.5), 16.4, 13, seg=40, col=ch2)
        LD.sph(P, (sx * 20, 0, 33), (16.6, 16.6, 10.5), col=lc2, us=40, vs=10)
        for a in [(-60 + 20 * i) * pi / 180 for i in range(7)]:
            rz = a if sx > 0 else pi - a
            DK.box(P, (sx * 20 + sx * 16.5 * cos(a), 16.5 * sin(a), 29.5), (0.5, 2.0, 4.6), rz=rz, col=(0.01, 0.01, 0.012))
    # merkezi kubbe
    PL.cyl(P, (0, 0, 41), 16.7, 6, seg=80, col=ch2, smooth=True)
    for i in range(40):
        a = 2 * pi * i / 40
        DK.box(P, (16.85 * cos(a), 16.85 * sin(a), 41.2), (0.5, 2.1, 3.6), rz=a, col=(0.01, 0.01, 0.012))
    verts = LD.sph(P, (0, 0, 40), (16.5, 16.5, 16.5), col=lc2, us=160, vs=24)
    Pi = P.inverted()
    cen = Vector((0, 0, 40))
    for v in verts:
        l = Pi @ v.co
        if l.z > 44.0:
            phi = atan2(l.y, l.x)
            k = 1 + 0.02 * (0.5 + 0.5 * cos(40 * phi)) ** 2
            v.co = P @ (cen + (l - cen) * k)
    LD.cyl(P, (0, 0, 57.4), 0.7, 3.0, r2=0.2, seg=8, col=lc)
    # dogu apsis
    PL.cyl(P, (33, 0, 12), 10.8, 24, seg=24, col=ch)
    LD.cyl(P, (33, 0, 27.5), 11.4, 7, r2=0.2, seg=24, col=lc)
    for a in (-38, 0, 38):
        a *= pi / 180
        DK.box(P, (33 + 10.9 * cos(a), 10.9 * sin(a), 13), (0.4, 2.2, 6.5), rz=a, col=(0.01, 0.01, 0.012))
    # batida narteks ve atrium
    PL.box(P, (-37, 0, 9), (12, 58, 20), col=ch)
    PL.box(P, (-58, 27, 4), (30, 2.5, 9), col=ch); PL.box(P, (-58, -27, 4), (30, 2.5, 9), col=ch)
    PL.box(P, (-72.5, 0, 4), (2.5, 56, 9), col=ch)
    # kose merdiven kuleleri
    for sx in (-1, 1):
        for sy in (-1, 1):
            PL.cyl(P, (sx * 34, sy * 34, 16), 5.2, 34, seg=14, col=ch)
            LD.cyl(P, (sx * 34, sy * 34, 35.5), 5.8, 5, r2=0.2, seg=14, col=lc)
    # vaftizhane
    PL.cyl(P, (-30, -48, 7), 7.2, 15, seg=16, col=ch)
    LD.sph(P, (-30, -48, 14.5), (7.4, 7.4, 5.5), col=lc2, us=20, vs=8)

hagia_sophia(HS[0], HS[1], 37.0, 0.16)

# ------------------------------------------------------------ kiliseler
CH = MB('Kiliseler', MAT['plaster'])
CL = MB('Kilise_Kubbeler', MAT['lead'])

def church(x, y, g, rot, sc=1.0, big=False):
    P = Matrix.Translation((x, y, g)) @ Matrix.Rotation(rot, 4, 'Z') @ Matrix.Diagonal((sc, sc, sc, 1))
    c1 = (0.55, 0.36, 0.26); lc = (0.20, 0.21, 0.22)
    CH.box(P, (0, 0, 5), (22, 9, 12), col=c1, j=0.05)
    CH.box(P, (0, 0, 5), (9, 22, 12), col=c1, j=0.05)
    CL.box(P, (0, 0, 11.2), (22.4, 9.4, 0.8), col=lc); CL.box(P, (0, 0, 11.2), (9.4, 22.4, 0.8), col=lc)
    CH.cyl(P, (0, 0, 14), 4.3, 6, seg=16, col=c1)
    CL.sph(P, (0, 0, 16.5), (4.5, 4.5, 3.6), col=lc, us=16, vs=8)
    CH.cyl(P, (12, 0, 4), 3.6, 9, seg=12, col=c1)
    CL.cyl(P, (12, 0, 9.5), 3.9, 2.5, r2=0.1, seg=12, col=lc)

# Aya Irini
church(-236, 44, 33.0, 0.2, 1.7)
# Kucuk Ayasofya (Sergios-Bakhos)
church(-430, -130, 31.0, 0.5, 1.3)
for (x, y, s) in [(-140, 20, 0.9), (-270, 90, 0.9), (-420, 20, 1.0), (-500, -20, 1.0), (-640, 20, 1.1),
                  (-720, -20, 1.0), (-820, -60, 1.1), (-900, 30, 1.2), (-1050, -30, 1.2), (-380, -105, 0.8), (-180, -60, 0.8)]:
    church(x, y, gz(x, y) - 0.5, random.uniform(0, pi), s)

# Justinianos Sutunu (Ayasofya'nin bati-onunde) ve Konstantin Sutunu
COLM = MB('Sutunlar', MAT['stone'])
def column(x, y, h, r=2.2):
    g = gz(x, y)
    for i in range(3):
        COLM.box(I, (x, y, g + i * 0.9), (r * 2 + 6 - i * 1.6, r * 2 + 6 - i * 1.6, 1.0), col=(1, 1, 1))
    COLM.cyl(I, (x, y, g + h / 2), r, h, seg=16, col=(1, 1, 1))
    COLM.box(I, (x, y, g + h + 0.6), (r * 2 + 1.5, r * 2 + 1.5, 1.2), col=(1, 1, 1))
    COLM.box(I, (x, y, g + h + 3.0), (3.4, 6.5, 3.5), col=(1, 1, 1))     # heykel kutlesi
column(-395, -20, 24, 2.2)
column(-980, 60, 32, 2.6)
column(HIPPO[0] - 80, HIPPO[1] + 3, 20, 1.3)
column(HIPPO[0] - 20, HIPPO[1] + 3, 22, 1.3)
column(HIPPO[0] + 40, HIPPO[1] + 3, 14, 1.0)
COLM.finish()

# ------------------------------------------------------------ evler, agaclar
HB = MB('Evler', MAT['house'])
TB = MB('Agaclar', MAT['tree'])
WALLC = [(0.55, 0.45, 0.32), (0.62, 0.52, 0.38), (0.5, 0.38, 0.26), (0.66, 0.6, 0.48), (0.45, 0.33, 0.22), (0.58, 0.42, 0.3)]
ROOFC = [(0.36, 0.10, 0.055), (0.42, 0.13, 0.07), (0.30, 0.09, 0.05), (0.38, 0.16, 0.09), (0.28, 0.12, 0.07)]

def house(x, y, g, w, l, h, rz, wc, rc):
    c, s = cos(rz), sin(rz)
    def V(u, v, z): return HB.bm.verts.new((x + u * c - v * s, y + u * s + v * c, z))
    hw, hl = w / 2, l / 2
    z0 = g - 3.0; z1 = g + h; z2 = z1 + w * 0.30
    b = [V(-hw, -hl, z0), V(hw, -hl, z0), V(hw, hl, z0), V(-hw, hl, z0),
         V(-hw, -hl, z1), V(hw, -hl, z1), V(hw, hl, z1), V(-hw, hl, z1)]
    r0 = V(0, -hl, z2); r1 = V(0, hl, z2)
    F = [((b[0], b[1], b[5], b[4]), wc), ((b[1], b[2], b[6], b[5]), wc), ((b[2], b[3], b[7], b[6]), wc),
         ((b[3], b[0], b[4], b[7]), wc), ((b[4], b[5], r0), wc), ((b[6], b[7], r1), wc),
         ((b[4], r0, r1, b[7]), rc), ((b[5], b[6], r1, r0), rc)]
    for vs, col in F:
        try:
            f = HB.bm.faces.new(vs)
        except ValueError:
            continue
        HB.paint([f], col)

houses = []
zones = []
def in_zone(x, y):
    if ((x - HS[0]) / 105) ** 2 + ((y - HS[1]) / 82) ** 2 < 1: return True
    if ((x - HIPPO[0]) / 215) ** 2 + ((y - HIPPO[1]) / 50) ** 2 < 1: return True
    if ((x + 236) / 30) ** 2 + ((y - 44) / 26) ** 2 < 1: return True
    if x > -20: return True
    return False

x = -40.0
step = 13
cnt = 0
while x > -1500:
    y = -900.0
    while y < 700:
        xx = x + random.uniform(-6, 6); yy = y + random.uniform(-6, 6)
        y += step
        d1 = min(yy - s_c(xx), n_c(xx) - yy)
        if d1 < 24 or in_zone(xx, yy) or (xx > -100 and abs(yy - 6) < 26): continue
        dens = 0.55 + 1.3 * sst(-100, -380, xx) * (1 - 0.6 * sst(-1000, -1500, xx))
        cl = fbm(xx / 130, yy / 130) + 0.5
        if random.random() > dens * clamp(cl * 1.6 - 0.15, 0.12, 1): continue
        if mese_dist(xx, yy) < 5.5: continue
        g = terrain_h(xx, yy)
        w = random.uniform(6, 11); l = random.uniform(6.5, 13)
        h = random.uniform(3.6, 6.2) + (2.5 if random.random() < 0.18 else 0)
        rz = random.gauss(0, 0.18) + (pi / 2 if random.random() < 0.4 else 0) + (0.05 * (yy / 80))
        house(xx, yy, g, w, l, h, rz, random.choice(WALLC), random.choice(ROOFC))
        cnt += 1
    x -= step
# Galata yakasi evleri (cenevizli mahallesi) ve kule
for gx in range(-140, -800, -18):
    for gy in range(0, 260, 17):
        xx = gx + random.uniform(-6, 6); yy = hn_c(gx) + 14 + gy * 0.7 + random.uniform(-6, 6)
        if random.random() > 0.55: continue
        g = terrain_h(xx, yy)
        house(xx, yy, g, random.uniform(7, 11), random.uniform(7, 12), random.uniform(4.5, 8), random.gauss(0.2, 0.2),
              random.choice(WALLC), random.choice(ROOFC))
print('houses', cnt)

# Galata (Christea Turris)
GX, GY = -345.0, hn_c(-345) + 52
gg = terrain_h(GX, GY)
GP = Matrix.Translation((GX, GY, gg))
ST2 = MB('Galata_Kulesi', MAT['stone'])
ST2.cyl(GP, (0, 0, 17), 8.5, 40, seg=28, col=(1, 1, 1), smooth=False)
ST2.cyl(GP, (0, 0, 37.5), 10.0, 3.2, seg=28, col=(1, 1, 1))
CLg = MB('Galata_Cati', MAT['lead'])
CLg.cyl(GP, (0, 0, 46.5), 10.4, 14.0, r2=0.3, seg=28, col=(0.20, 0.13, 0.10))
for a in range(0, 360, 30):
    DK.box(GP, (8.6 * cos(a * pi / 180), 8.6 * sin(a * pi / 180), 37.5), (0.4, 1.2, 1.8), rz=a * pi / 180, col=(0.01, 0.01, 0.012))
ST2.finish(); CLg.finish()

# agaclar
for i in range(1300):
    xx = random.uniform(-1500, -30); yy = random.uniform(-380, 380)
    d1 = min(yy - s_c(xx), n_c(xx) - yy)
    if d1 < 22 or in_zone(xx, yy) or mese_dist(xx, yy) < 5: continue
    if (fbm(xx / 60 + 4, yy / 60) + 0.5) < 0.45 and random.random() < 0.8: continue
    g = terrain_h(xx, yy)
    if random.random() < 0.55:
        h = random.uniform(8, 14)
        TB.cyl(I, (xx, yy, g + h / 2 - 1), random.uniform(1.1, 1.7), h, r2=0.15, seg=6,
               col=jit((0.035, 0.07, 0.03), 0.3), smooth=True)
    else:
        r = random.uniform(2.6, 4.6)
        TB.sph(I, (xx, yy, g + r * 0.9 + 1.5), (r, r, r * 0.8), col=jit((0.07, 0.10, 0.035), 0.4), us=8, vs=5)
        TB.cyl(I, (xx, yy, g + 1), 0.3, 3, seg=5, col=(0.08, 0.05, 0.03))
for i in range(300):     # Galata yamaclari
    xx = random.uniform(-100, -900); yy = hn_c(xx) + random.uniform(30, 300)
    g = terrain_h(xx, yy); r = random.uniform(2.6, 4)
    TB.sph(I, (xx, yy, g + r), (r, r, r * 0.8), col=jit((0.07, 0.09, 0.03), 0.4), us=8, vs=5)

# ------------------------------------------------------------ gemiler
SH = MB('Gemiler', MAT['wood'])
def hull(P, L, B, D, sheer=1.0, stern=0.0, col=(0.09, 0.05, 0.03), deck=(0.22, 0.14, 0.08), N=16, beam_pow=1.0, stern_w=0.55):
    rings = []
    for i in range(N + 1):
        t = i / N
        x = (t - 0.5) * L
        wf = 1 - (max(0.0, (t - 0.5) / 0.5)) ** 2.2 * 0.985
        wf *= 1 - (max(0.0, (0.18 - t) / 0.18)) ** 2 * (1 - stern_w)
        w = max(0.03, B / 2 * wf ** beam_pow)
        zt = sheer * (((t - 0.5) * 2) ** 2) * 0.9 + (stern * sst(0.3, 0.0, t)) + (0.4 * sst(0.8, 1.0, t) * sheer)
        keel = -D * (1 - 0.25 * (1 - wf))
        rings.append([Vector((x, -w, zt)), Vector((x, -w * 0.82, keel * 0.45)), Vector((x, 0, keel)),
                      Vector((x, w * 0.82, keel * 0.45)), Vector((x, w, zt))])
    for i in range(N):
        r0, r1 = rings[i], rings[i + 1]
        for j in range(4):
            SH.poly(P, [r0[j], r0[j + 1], r1[j + 1], r1[j]], jit(col, 0.12))
        SH.poly(P, [r0[0], r0[4], r1[4], r1[0]], jit(deck, 0.1))
    return rings

def sail_tri(P, A, Bp, C, bulge, col, n=6):
    A = Vector(A); Bp = Vector(Bp); C = Vector(C)
    pts = {}
    for i in range(n + 1):
        for j in range(n + 1 - i):
            a, b = i / n, j / n
            p = A + (Bp - A) * a + (C - A) * b
            p.y += bulge * 4 * a * b * (1 - a - b) * 3
            pts[(i, j)] = p
    for i in range(n):
        for j in range(n - i):
            SH.poly(P, [pts[(i, j)], pts[(i + 1, j)], pts[(i, j + 1)]], jit(col, 0.05))
            if i + j < n - 1:
                SH.poly(P, [pts[(i + 1, j)], pts[(i + 1, j + 1)], pts[(i, j + 1)]], jit(col, 0.05))

def sail_sq(P, cx, cy, zb, zt, wb, wt, bulge, col, n=6):
    # kare yelken (x-z duzlemi degil: gemiye dik, y genisligi)
    g = []
    for i in range(n + 1):
        row = []
        for j in range(n + 1):
            u = j / n; v = i / n
            wv = lerp(wb, wt, v)
            row.append(Vector((cx + bulge * sin(pi * u) * sin(pi * (0.15 + 0.7 * v)) , cy + (u - 0.5) * wv, lerp(zb, zt, v))))
        g.append(row)
    for i in range(n):
        for j in range(n):
            SH.poly(P, [g[i][j], g[i][j + 1], g[i + 1][j + 1], g[i + 1][j]], jit(col, 0.05))

SAIL = (0.62, 0.55, 0.42)
def galley(x, y, ang, sc=1.0, sails=True, furl=False):
    P = Matrix.Translation((x, y, 0.0)) @ Matrix.Rotation(ang, 4, 'Z') @ Matrix.Diagonal((sc, sc, sc, 1))
    L, B, D = 34.0, 5.0, 1.4
    rings = hull(P, L, B, D, sheer=1.1, stern=1.6, N=18)
    zt = lambda t: 0.0
    # kurulu kuvvetler: kurek
    SH.box(P, (L * 0.5 - 1.5, 0, 1.8), (5.0, 0.5, 0.3), col=(0.2, 0.12, 0.07))
    SH.bar(P, (L * 0.5 - 1, 0, 1.5), (L * 0.5 + 4.5, 0, 2.6), 0.35, (0.15, 0.09, 0.05))   # mahmuz
    # kiç kasara
    SH.box(P, (-L * 0.5 + 3.0, 0, 3.0), (6.0, B * 0.72, 0.5), col=(0.2, 0.13, 0.08))
    for sy in (-1, 1):
        SH.bar(P, (-L * 0.5 + 1.0, sy * B * 0.34, 1.0), (-L * 0.5 + 1.0, sy * B * 0.34, 3.0), 0.2, (0.15, 0.1, 0.06))
        SH.bar(P, (-L * 0.5 + 5.0, sy * B * 0.34, 1.0), (-L * 0.5 + 5.0, sy * B * 0.34, 3.0), 0.2, (0.15, 0.1, 0.06))
    # kurekler
    n = 22
    for i in range(n):
        t = 0.12 + 0.68 * i / (n - 1)
        x0 = (t - 0.5) * L
        for sy in (-1, 1):
            w = B / 2 * (1 - (max(0.0, (t - 0.5) / 0.5)) ** 2.2 * 0.985)
            zb = 1.0 * ((t - 0.5) * 2) ** 2 * 0.9
            a = Vector((x0 + 0.5, sy * (w * 0.6), zb + 0.5))
            d = Vector((-0.28, sy * 0.78, -0.55)).normalized()
            SH.bar(P, a, a + d * 8.0, 0.14, (0.33, 0.24, 0.14))
            SH.bar(P, a - d * 1.5, a, 0.14, (0.33, 0.24, 0.14))
    # direkler ve yelkenler (lateen)
    def mast(x0, H, tack_dx, peak_dx, yard=True):
        SH.bar(P, (x0, 0, 1.0), (x0, 0, H), 0.32, (0.25, 0.16, 0.09))
        A = (x0 + tack_dx, 0, 2.6); Bp = (x0 + peak_dx, 0, H * 0.96)
        SH.bar(P, A, Bp, 0.22, (0.22, 0.14, 0.08))
        if sails:
            C = (x0 + peak_dx - 3.0, 0, 3.6)
            sail_tri(P, A, Bp, C, 0.9 if not furl else 0.2, SAIL)
    mast(L * 0.10, 17.0, L * 0.30, -L * 0.22)
    if L > 0:
        mast(-L * 0.22, 12.5, L * 0.22, -L * 0.36)
    SH.bar(P, (L * 0.10, 0, 15.5), (L * 0.5 + 3.0, 0, 2.4), 0.06, (0.1, 0.07, 0.05))
    SH.bar(P, (L * 0.10, 0, 15.5), (-L * 0.5, 0, 3.0), 0.06, (0.1, 0.07, 0.05))

def carrack(x, y, ang, sc=1.0):
    P = Matrix.Translation((x, y, 0.0)) @ Matrix.Rotation(ang, 4, 'Z') @ Matrix.Diagonal((sc, sc, sc, 1))
    L, B, D = 30.0, 10.0, 4.5
    hull(P, L, B, D, sheer=2.2, stern=3.5, col=(0.11, 0.065, 0.035), deck=(0.24, 0.16, 0.09), N=16, beam_pow=0.6, stern_w=0.7)
    SH.box(P, (-L * 0.5 + 4.5, 0, 6.5), (9.0, B * 0.82, 4.0), col=(0.14, 0.085, 0.05))      # kiç kale
    SH.box(P, (L * 0.5 - 4.5, 0, 4.2), (6.0, B * 0.5, 3.0), col=(0.14, 0.085, 0.05))         # bas kale
    for (x0, H, sw) in ((2.0, 27.0, 13), (10.5, 20.0, 9), ):
        SH.bar(P, (x0, 0, 2.0), (x0, 0, H), 0.42, (0.22, 0.14, 0.08))
        SH.bar(P, (x0 + 0.3, -sw * 0.5, H * 0.72), (x0 + 0.3, sw * 0.5, H * 0.72), 0.2, (0.22, 0.14, 0.08))
        sail_sq(P, x0 + 0.5, 0, H * 0.72 - 9.0 * (H / 27.0), H * 0.72, sw * 0.8, sw, 1.6, SAIL)
        sail_sq(P, x0 + 0.5, 0, H * 0.72 + 0.4, H * 0.72 + 6.0 * (H / 27.0), sw * 0.62, sw * 0.4, 1.0, SAIL)
    x0 = -8.0
    SH.bar(P, (x0, 0, 4.0), (x0, 0, 17), 0.3, (0.22, 0.14, 0.08))
    SH.bar(P, (x0 + 5, 0, 4.5), (x0 - 7, 0, 16), 0.16, (0.22, 0.14, 0.08))
    sail_tri(P, (x0 + 5, 0, 4.5), (x0 - 7, 0, 16), (x0 - 9.5, 0, 5.5), 0.8, SAIL)
    SH.bar(P, (L * 0.5 - 2, 0, 4.0), (L * 0.5 + 6.5, 0, 6.5), 0.5, (0.2, 0.12, 0.07))    # civadra

# Kamera on plani: kahraman kadirga (Halic, kiyi suruna yakin)
galley(-178, 106, pi * 0.93, 1.0, True)
# Karadeniz-Halic agzi: Osmanli filosu (Bogaz tarafi) ve Halic ici
galley(-250, 112, pi * 1.04, 0.95, True)
galley(-250, 136, pi * 0.95, 0.9, False)
galley(-170, 158, pi * 1.12, 0.95, True)
galley(-300, 122, pi * 0.9, 0.85, False, furl=True)
galley(-330, 160, pi * 1.0, 0.9, True)
galley(-275, 172, pi * 0.97, 0.9, False)
carrack(-395, 152, pi * 0.94, 1.0)
carrack(-455, 176, pi * 1.06, 1.05)
carrack(-560, 190, pi * 0.98, 1.1)
galley(-520, 152, pi * 1.03, 1.0, False)
galley(-640, 210, pi * 0.96, 1.0, False)
# Marmara tarafi (sol)
galley(-235, -142, pi * 0.92, 1.0, True)
galley(-330, -196, pi * 1.0, 1.1, False)
galley(-430, -230, pi * 0.94, 1.05, True)
carrack(-560, -238, pi * 1.05, 1.2)
galley(-160, -110, pi * 1.08, 0.95, False)

# Zincir (bom): Eugenios kulesinden Galata'ya yuzen kutuk hatti
A = Vector((-24, n_c(-24) - 9)); Bc = Vector((GX + 15, hn_c(GX) + 4))
nlog = 44
for i in range(nlog):
    t = (i + 0.5) / nlog
    p = A + (Bc - A) * t
    ang = atan2((Bc - A).y, (Bc - A).x)
    SH.cyl(I, (p.x, p.y, 0.1), 0.8, 4.2, seg=6, col=(0.12, 0.075, 0.04))
    # yatay yatir: silindiri hat yonune ce
# silindirleri hat boyunca dondurmek yerine ince bir zincir bari
SH.bar(I, (A.x, A.y, 0.35), (Bc.x, Bc.y, 0.35), 0.28, (0.05, 0.05, 0.055))
SH.finish()
DK.finish()

for c_ in (PL, LD, CH, CL, HB, TB):
    c_.finish()

# ------------------------------------------------------------ duman & atesler
def plume(sx, sy, sz, n=6, size=1.0, dens=0.11, col=(0.42, 0.37, 0.33), drift=(-0.55, -0.35), rise=13.0):
    m = mat_smoke('Duman', dens, col)
    for i in range(n):
        t = i / max(1, n - 1)
        r = size * (4.5 + 11.0 * t ** 0.8)
        p = Vector((sx + drift[0] * rise * i * 1.0 + random.uniform(-1, 1), sy + drift[1] * rise * i * 1.0 + random.uniform(-1, 1),
                    sz + rise * i * size * 0.55 + r * 0.4))
        bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=3, radius=1.0, location=p)
        ob = bpy.context.object
        ob.scale = (r * random.uniform(1.0, 1.3), r * random.uniform(1.0, 1.3), r * random.uniform(0.9, 1.25))
        ob.rotation_euler = (random.uniform(0, 3), random.uniform(0, 3), random.uniform(0, 3))
        ob.data.materials.append(m)
        ob.visible_shadow = False
        ob.name = 'Duman'

# sehir bacalari
for (x, y) in [(-150, 8), (-215, -18), (-300, 60), (-440, 10), (-520, -40), (-610, 30), (-700, -10),
               (-780, -50), (-860, 20), (-960, 0), (-560, 70), (-350, -108), (-250, 92)]:
    plume(x, y, terrain_h(x, y) + 5, n=random.randint(7, 9), size=random.uniform(0.55, 0.9),
          dens=0.13, col=(0.45, 0.4, 0.36), rise=random.uniform(9, 12))
# Galata yamacindaki kamp atesleri (Halic'in karsi kiyisi)
fires = []
em = mat_emit('Ates', (1.0, 0.42, 0.10), 220)
for (x, y) in [(-260, hn_c(-260) + 70), (-330, hn_c(-330) + 120), (-410, hn_c(-410) + 95), (-480, hn_c(-480) + 150),
               (-215, hn_c(-215) + 92), (-560, hn_c(-560) + 110), (-640, hn_c(-640) + 165), (-370, hn_c(-370) + 190)]:
    g = terrain_h(x, y)
    bpy.ops.mesh.primitive_uv_sphere_add(radius=1.1, location=(x, y, g + 1.0))
    ob = bpy.context.object; ob.data.materials.append(em); ob.name = 'Ates'
    plume(x, y, g + 3, n=8, size=0.8, dens=0.12, col=(0.5, 0.42, 0.36), rise=11)
# uzakta, kara surlari yonunde kalin ve koyu duman kolonlari (barut dumani - yalniz atmosfer)
for (x, y, s) in [(-1450, -70, 3.0), (-1350, 40, 2.4), (-1600, 110, 3.4)]:
    plume(x, y, terrain_h(x, y), n=9, size=s, dens=0.05, col=(0.2, 0.17, 0.15), rise=30)

# sis kutusu
bpy.ops.mesh.primitive_cube_add(size=2.0, location=(-1300, 300, 127))
fog = bpy.context.object; fog.scale = (1400, 1500, 132); fog.name = 'Sis'
fog.data.materials.append(mat_fog()); fog.visible_shadow = False
if os.environ.get('NOFOG'): fog.hide_render = True

# ------------------------------------------------------------ isik ve dunya
sun_dir = Vector((0.80, 0.55, 0.0)).normalized()
elev = math.radians(4.6)
u = Vector((sun_dir.x * cos(elev), sun_dir.y * cos(elev), sin(elev)))
sun = bpy.data.lights.new('Gunes', 'SUN')
sun.energy = 6.0; sun.color = (1.0, 0.58, 0.32); sun.angle = math.radians(0.9)
so = bpy.data.objects.new('Gunes', sun)
so.rotation_euler = u.to_track_quat('Z', 'Y').to_euler()
coll.objects.link(so)

world = bpy.data.worlds.new('Safak'); scene.world = world; world.use_nodes = True
wn = world.node_tree.nodes; wl = world.node_tree.links
for n in list(wn): wn.remove(n)
wout = wn.new('ShaderNodeOutputWorld')
bg = wn.new('ShaderNodeBackground'); bg.inputs['Strength'].default_value = 1.0
sky = wn.new('ShaderNodeTexSky'); sky.sky_type = 'MULTIPLE_SCATTERING'
sky.sun_elevation = elev; sky.sun_rotation = math.radians(20); sky.sun_disc = False
sky.altitude = 30; sky.air_density = 1.6; sky.aerosol_density = 3.0; sky.ozone_density = 3.0
tc = wn.new('ShaderNodeTexCoord')
sep = wn.new('ShaderNodeSeparateXYZ'); wl.new(tc.outputs['Object'], sep.inputs[0]) if False else wl.new(tc.outputs['Object'], sep.inputs[0])
zp = wn.new('ShaderNodeMath'); zp.operation = 'MAXIMUM'; zp.inputs[1].default_value = 0.0
wl.new(sep.outputs['Z'], zp.inputs[0])
zq = wn.new('ShaderNodeMath'); zq.operation = 'ADD'; zq.inputs[1].default_value = 0.10
wl.new(zp.outputs[0], zq.inputs[0])
dx = wn.new('ShaderNodeMath'); dx.operation = 'DIVIDE'; wl.new(sep.outputs['X'], dx.inputs[0]); wl.new(zq.outputs[0], dx.inputs[1])
dy = wn.new('ShaderNodeMath'); dy.operation = 'DIVIDE'; wl.new(sep.outputs['Y'], dy.inputs[0]); wl.new(zq.outputs[0], dy.inputs[1])
cmb = wn.new('ShaderNodeCombineXYZ'); cmb.inputs['Z'].default_value = 1.7
wl.new(dx.outputs[0], cmb.inputs['X']); wl.new(dy.outputs[0], cmb.inputs['Y'])
mp = wn.new('ShaderNodeMapping'); mp.inputs['Scale'].default_value = (0.35, 0.8, 1.0)
wl.new(cmb.outputs[0], mp.inputs['Vector'])
cn = wn.new('ShaderNodeTexNoise'); cn.inputs['Scale'].default_value = 1.6; cn.inputs['Detail'].default_value = 9
cn.inputs['Roughness'].default_value = 0.62; cn.inputs['Distortion'].default_value = 0.4
wl.new(mp.outputs[0], cn.inputs['Vector'])
cr = wn.new('ShaderNodeMapRange'); cr.inputs['From Min'].default_value = 0.47; cr.inputs['From Max'].default_value = 0.62
wl.new(cn.outputs['Fac'], cr.inputs['Value'])
# yukseklik maskesi (ufukta seyrelsin, tepede de azalsin)
hm = wn.new('ShaderNodeMapRange'); hm.inputs['From Min'].default_value = 0.02; hm.inputs['From Max'].default_value = 0.22
wl.new(sep.outputs['Z'], hm.inputs['Value'])
cm = wn.new('ShaderNodeMath'); cm.operation = 'MULTIPLY'; wl.new(cr.outputs[0], cm.inputs[0]); wl.new(hm.outputs[0], cm.inputs[1])
# bulut rengi: ufukta yakin pembe-turuncu, yukari gri-mor
cc = wn.new('ShaderNodeMapRange')
cc.inputs['From Min'].default_value = 0.03; cc.inputs['From Max'].default_value = 0.55
wl.new(sep.outputs['Z'], cc.inputs['Value'])
ccol = wn.new('ShaderNodeMix'); ccol.data_type = 'RGBA'
ccol.inputs['A'].default_value = (1.0, 0.36, 0.20, 1); ccol.inputs['B'].default_value = (0.13, 0.15, 0.24, 1)
wl.new(cc.outputs[0], ccol.inputs['Factor'])
bright = wn.new('ShaderNodeMath'); bright.operation = 'MULTIPLY_ADD'; bright.inputs[1].default_value = 1.6; bright.inputs[2].default_value = 0.4
wl.new(cr.outputs[0], bright.inputs[0])
cv = wn.new('ShaderNodeVectorMath'); cv.operation = 'SCALE'
wl.new(ccol.outputs['Result'], cv.inputs[0]); wl.new(bright.outputs[0], cv.inputs['Scale'])
mix = wn.new('ShaderNodeMix'); mix.data_type = 'RGBA'
wl.new(cm.outputs[0], mix.inputs['Factor'])
wl.new(sky.outputs['Color'], mix.inputs['A']); wl.new(cv.outputs['Vector'], mix.inputs['B'])
wl.new(mix.outputs['Result'], bg.inputs['Color'])
wl.new(bg.outputs[0], wout.inputs['Surface'])

# ------------------------------------------------------------ kamera
cam = bpy.data.cameras.new('Kamera'); cam.lens = 32; cam.sensor_width = 36
cam.clip_end = 20000; cam.clip_start = 0.5
co = bpy.data.objects.new('Sarayburnu_Kamera', cam)
co.location = (30, 6, 36)
target = Vector((-340, 12, 35.0))
co.rotation_euler = (target - co.location).to_track_quat('-Z', 'Y').to_euler()
coll.objects.link(co)
scene.camera = co

# ------------------------------------------------------------ render ayarlari
scene.render.engine = 'CYCLES'
cy = scene.cycles
cy.device = 'GPU'
try:
    prefs = bpy.context.preferences.addons['cycles'].preferences
    prefs.compute_device_type = 'OPTIX'
    prefs.get_devices()
    for d in prefs.devices: d.use = (d.type == 'OPTIX')
except Exception as e:
    print('gpu ayar', e)
cy.samples = 24 if TEST else 18
cy.use_adaptive_sampling = True; cy.adaptive_threshold = 0.02
cy.use_denoising = True
try: cy.denoiser = 'OPENIMAGEDENOISE'
except Exception: pass
cy.max_bounces = 6; cy.volume_bounces = 1
cy.volume_step_rate = 3.0; cy.volume_max_steps = 256
cy.sample_clamp_indirect = 10
scene.render.resolution_x = 960 if TEST else 1920
if os.environ.get('SMALL'): cy.samples = 12
scene.render.resolution_y = 540 if TEST else 1080
scene.render.resolution_percentage = 100
scene.view_settings.view_transform = 'AgX'
try: scene.view_settings.look = 'AgX - Medium High Contrast'
except Exception as e: print('look', e)
scene.view_settings.exposure = 0.0
scene.render.image_settings.file_format = 'PNG'
scene.render.filepath = os.path.join(HERE, 'test.png' if TEST else 'kare.png')

bpy.ops.wm.save_as_mainfile(filepath=os.path.join(HERE, 'sahne.blend'))
if '--render' in sys.argv or TEST:
    bpy.ops.render.render(write_still=True)
print('BITTI')
