"""Ortak yardimcilar: gurultu, mesh olusturucu (Builder), UV, materyal yardimcilari."""
import math
import bpy
import bmesh
import numpy as np
from mathutils import Vector, Matrix

# ----------------------------------------------------------------------------
# Gurultu (numpy, vektorel)
# ----------------------------------------------------------------------------
class Noise2D:
    def __init__(self, seed=1):
        rng = np.random.default_rng(seed)
        self.perm = rng.permutation(256).astype(np.int64)
        self.vals = rng.uniform(-1, 1, 256)

    def value(self, x, y):
        xi = np.floor(x).astype(np.int64)
        yi = np.floor(y).astype(np.int64)
        xf = x - xi
        yf = y - yi
        u = xf * xf * xf * (xf * (xf * 6 - 15) + 10)
        v = yf * yf * yf * (yf * (yf * 6 - 15) + 10)
        p = self.perm
        vl = self.vals

        def h(ix, iy):
            return vl[p[(p[ix & 255] + iy) & 255]]

        a = h(xi, yi)
        b = h(xi + 1, yi)
        c = h(xi, yi + 1)
        d = h(xi + 1, yi + 1)
        return (a + (b - a) * u) + ((c + (d - c) * u) - (a + (b - a) * u)) * v

    def fbm(self, x, y, octaves=5, lac=2.0, gain=0.5):
        s = 0.0
        amp = 1.0
        norm = 0.0
        fx, fy = x, y
        for i in range(octaves):
            s = s + amp * self.value(fx + 17.3 * i, fy - 9.1 * i)
            norm += amp
            amp *= gain
            fx = fx * lac + 3.1
            fy = fy * lac - 1.7
        return s / norm

    def ridged(self, x, y, octaves=5, lac=2.0, gain=0.5):
        s = 0.0
        amp = 1.0
        norm = 0.0
        fx, fy = x, y
        for i in range(octaves):
            n = 1.0 - np.abs(self.value(fx + 7.7 * i, fy + 3.3 * i))
            s = s + amp * n * n
            norm += amp
            amp *= gain
            fx = fx * lac + 5.3
            fy = fy * lac - 2.9
        return s / norm


def smoothstep(a, b, x):
    t = np.clip((x - a) / (b - a), 0.0, 1.0)
    return t * t * (3 - 2 * t)


def lerp(a, b, t):
    return a + (b - a) * t


# ----------------------------------------------------------------------------
# Koleksiyon / obje yardimcilari
# ----------------------------------------------------------------------------
def get_collection(name, parent=None):
    col = bpy.data.collections.get(name)
    if col is None:
        col = bpy.data.collections.new(name)
        (parent or bpy.context.scene.collection).children.link(col)
    return col


def link_obj(obj, col):
    for c in list(obj.users_collection):
        c.objects.unlink(obj)
    col.objects.link(obj)


def mesh_from_numpy(name, verts, faces, col, mat_list=None, smooth=True, uv=None):
    """verts (N,3) float, faces (M,k) int (sabit k) -> obje."""
    verts = np.asarray(verts, dtype=np.float32)
    faces = np.asarray(faces, dtype=np.int32)
    me = bpy.data.meshes.new(name)
    nv = len(verts)
    nf = len(faces)
    k = faces.shape[1]
    me.vertices.add(nv)
    me.vertices.foreach_set("co", verts.ravel())
    me.loops.add(nf * k)
    me.polygons.add(nf)
    me.loops.foreach_set("vertex_index", faces.ravel())
    me.polygons.foreach_set("loop_start", np.arange(nf, dtype=np.int32) * k)
    if hasattr(me.polygons, "foreach_set"):
        try:
            me.polygons.foreach_set("loop_total", np.full(nf, k, dtype=np.int32))
        except Exception:
            pass
    me.update()
    me.validate()
    if smooth:
        me.shade_smooth()
    if mat_list:
        for m in mat_list:
            me.materials.append(m)
    obj = bpy.data.objects.new(name, me)
    col.objects.link(obj)
    return obj


# ----------------------------------------------------------------------------
# Builder: bmesh tabanli, materyal-slotlu, UV'li geometri toplayici
# ----------------------------------------------------------------------------
UP = Vector((0, 0, 1))


class Builder:
    def __init__(self, name, mats):
        """mats: {isim: bpy.types.Material}. Slotlar kullanilma sirasina gore acilir."""
        self.name = name
        self.mats = mats
        self.bm = bmesh.new()
        self.slots = []  # materyal isimleri
        self.glow = self.bm.loops.layers.float_color.new("glow")
        self.uvl = self.bm.loops.layers.uv.new("UVMap")
        self._glow_face = {}

    def slot(self, mat):
        if mat not in self.slots:
            self.slots.append(mat)
        return self.slots.index(mat)

    # -- temel yuz ekleme ----------------------------------------------------
    def face(self, pts, mat, smooth=False, glow=None):
        try:
            vs = [self.bm.verts.new(p) for p in pts]
            f = self.bm.faces.new(vs)
        except ValueError:
            return None
        f.material_index = self.slot(mat)
        f.smooth = smooth
        if glow is not None:
            self._glow_face[f.index if False else id(f)] = glow
            for l in f.loops:
                l[self.glow] = (glow, glow, glow, 1.0)
        return f

    def quad(self, a, b, c, d, mat, smooth=False, glow=None):
        return self.face([a, b, c, d], mat, smooth, glow)

    # -- kutu ----------------------------------------------------------------
    def box(self, x, y, z0, w, d, h, rot=0.0, mat="stone", bottom=False, taper=1.0, glow=None):
        """taban merkezli kutu. taper: ust yuzun olcegi."""
        c, s = math.cos(rot), math.sin(rot)
        hw, hd = w / 2, d / 2

        def P(lx, ly, z, k=1.0):
            lx *= k
            ly *= k
            return (x + lx * c - ly * s, y + lx * s + ly * c, z)

        b = [P(-hw, -hd, z0), P(hw, -hd, z0), P(hw, hd, z0), P(-hw, hd, z0)]
        t = [P(-hw, -hd, z0 + h, taper), P(hw, -hd, z0 + h, taper), P(hw, hd, z0 + h, taper), P(-hw, hd, z0 + h, taper)]
        faces = []
        for i in range(4):
            j = (i + 1) % 4
            faces.append(self.quad(b[i], b[j], t[j], t[i], mat, glow=glow))
        faces.append(self.quad(t[0], t[1], t[2], t[3], mat, glow=glow))  # ust (yukari)
        if bottom:
            faces.append(self.quad(b[0], b[3], b[2], b[1], mat))
        return faces

    def box_pts(self, b, t, mat, bottom=False):
        """Kose listeleri ile (b: alt 4 kose, t: ust 4 kose)."""
        for i in range(4):
            j = (i + 1) % 4
            self.quad(b[i], b[j], t[j], t[i], mat)
        self.quad(t[0], t[1], t[2], t[3], mat)
        if bottom:
            self.quad(b[0], b[3], b[2], b[1], mat)

    # -- silindir / koni -----------------------------------------------------
    def cyl(self, x, y, z0, r, h, segs=24, mat="stone", r_top=None, cap_top=True, cap_bottom=False,
            smooth=True, rot=0.0, glow=None):
        r_top = r if r_top is None else r_top
        ring0 = []
        ring1 = []
        for i in range(segs):
            a = rot + 2 * math.pi * i / segs
            ca, sa = math.cos(a), math.sin(a)
            ring0.append((x + r * ca, y + r * sa, z0))
            ring1.append((x + r_top * ca, y + r_top * sa, z0 + h))
        fs = []
        for i in range(segs):
            j = (i + 1) % segs
            if r_top < 1e-4:
                fs.append(self.face([ring0[i], ring0[j], (x, y, z0 + h)], mat, smooth, glow))
            else:
                fs.append(self.face([ring0[i], ring0[j], ring1[j], ring1[i]], mat, smooth, glow))
        if cap_top and r_top >= 1e-4:
            self.face(ring1[::-1], mat, False)
        if cap_bottom:
            self.face(ring0, mat, False)
        return fs

    def cone(self, x, y, z0, r, h, segs=24, mat="roof", rot=0.0):
        return self.cyl(x, y, z0, r, h, segs, mat, r_top=0.0, cap_top=False, rot=rot)

    def pyramid(self, x, y, z0, w, d, h, rot=0.0, mat="roof", top_scale=0.0):
        c, s = math.cos(rot), math.sin(rot)
        hw, hd = w / 2, d / 2

        def P(lx, ly, z):
            return (x + lx * c - ly * s, y + lx * s + ly * c, z)

        b = [P(-hw, -hd, z0), P(hw, -hd, z0), P(hw, hd, z0), P(-hw, hd, z0)]
        if top_scale < 1e-4:
            ap = P(0, 0, z0 + h)
            for i in range(4):
                self.face([b[i], b[(i + 1) % 4], ap], mat)
        else:
            t = [P(-hw * top_scale, -hd * top_scale, z0 + h), P(hw * top_scale, -hd * top_scale, z0 + h),
                 P(hw * top_scale, hd * top_scale, z0 + h), P(-hw * top_scale, hd * top_scale, z0 + h)]
            for i in range(4):
                j = (i + 1) % 4
                self.quad(b[i], b[j], t[j], t[i], mat)

    def gable(self, x, y, z0, w, d, h, rot=0.0, over=0.5, mat_roof="roof", mat_wall="stone", thick=0.3,
              ridge=True):
        """Besik cati. Duvar plani w (yerel x) x d (yerel y), sirt yerel y boyunca. z0 = duvar ustu."""
        c, s = math.cos(rot), math.sin(rot)
        hw = w / 2 + over
        hd = d / 2 + over * 0.7

        def P(lx, ly, z):
            return (x + lx * c - ly * s, y + lx * s + ly * c, z)

        top = z0 + h
        # cati yuzleri
        self.quad(P(-hw, -hd, z0), P(-hw, hd, z0), P(0, hd, top), P(0, -hd, top), mat_roof)
        self.quad(P(hw, hd, z0), P(hw, -hd, z0), P(0, -hd, top), P(0, hd, top), mat_roof)
        # kalim (alt yuz gorunumu icin cati kalinligi)
        self.quad(P(-hw, -hd, z0), P(-hw, -hd, z0 - thick), P(-hw, hd, z0 - thick), P(-hw, hd, z0), mat_roof)
        self.quad(P(hw, hd, z0), P(hw, hd, z0 - thick), P(hw, -hd, z0 - thick), P(hw, -hd, z0), mat_roof)
        self.quad(P(-hw, -hd, z0 - thick), P(-hw, -hd, z0), P(0, -hd, top), P(0, -hd, top - thick), mat_roof) if False else None
        # kalkanlar
        zr = z0 + h * (over / hw)
        for sgn, yy in ((-1, -d / 2), (1, d / 2)):
            pts = [P(-w / 2, yy, z0), P(w / 2, yy, z0), P(w / 2, yy, zr), P(0, yy, top), P(-w / 2, yy, zr)]
            if sgn > 0:
                pts = pts[::-1]
            self.face(pts, mat_wall)
        # alt (cati alti)
        self.quad(P(-hw, -hd, z0), P(hw, -hd, z0), P(hw, hd, z0), P(-hw, hd, z0), mat_wall)
        if ridge:
            self.box(x, y, top - 0.12, 0.45, d + over * 1.4 + 0.4, 0.4, rot=rot + math.pi / 2, mat=mat_roof) if False else None

    def hip_roof(self, x, y, z0, w, d, h, rot=0.0, over=0.5, mat="roof"):
        c, s = math.cos(rot), math.sin(rot)
        hw, hd = w / 2 + over, d / 2 + over
        r = max(0.0, (d - w) / 2)

        def P(lx, ly, z):
            return (x + lx * c - ly * s, y + lx * s + ly * c, z)

        e = [P(-hw, -hd, z0), P(hw, -hd, z0), P(hw, hd, z0), P(-hw, hd, z0)]
        a = P(0, -r, z0 + h)
        b = P(0, r, z0 + h)
        self.face([e[0], e[1], a], mat)
        self.quad(e[1], e[2], b, a, mat)
        self.face([e[2], e[3], b], mat)
        self.quad(e[3], e[0], a, b, mat)

    # -- profil prizmasi (sivri kemerli pencere vb.) -----------------------------
    def prism(self, prof, x, y, z, ang, depth, mat, front_mat=None, glow=None, inset_back=0.0):
        """prof: 2B (u,v) noktalar; duvar yatay yonu ang'dan (u ekseni = (cos,sin)), normal =(−sin, cos)?"""
        c, s = math.cos(ang), math.sin(ang)
        nx, ny = -s, c  # yuz normali (disari)
        front = []
        back = []
        for (u, v) in prof:
            px = x + u * c
            py = y + u * s
            front.append((px + nx * depth, py + ny * depth, z + v))
            back.append((px - nx * inset_back, py - ny * inset_back, z + v))
        self.face(front, front_mat or mat, glow=glow)
        n = len(prof)
        for i in range(n):
            j = (i + 1) % n
            self.face([back[i], back[j], front[j], front[i]], mat)

    # -- bitir ---------------------------------------------------------------
    def finish(self, col, parent=None):
        bm = self.bm
        bm.normal_update()
        # UV
        uvl = self.uvl
        for f in bm.faces:
            n = f.normal
            if abs(n.z) > 0.92:
                for l in f.loops:
                    p = l.vert.co
                    l[uvl].uv = (p.x, p.y)
            else:
                t = UP.cross(n)
                t.normalize()
                up_s = n.cross(t)
                for l in f.loops:
                    p = l.vert.co
                    l[uvl].uv = (p.dot(t), p.dot(up_s))
        me = bpy.data.meshes.new(self.name)
        bm.to_mesh(me)
        bm.free()
        for m in self.slots:
            me.materials.append(self.mats[m])
        # Blender 4.1+: yuz 'smooth' bayraklari korunur
        obj = bpy.data.objects.new(self.name, me)
        col.objects.link(obj)
        if parent is not None:
            obj.parent = parent
        return obj


def new_empty(name, col, loc=(0, 0, 0), display="PLAIN_AXES", size=1.0):
    e = bpy.data.objects.new(name, None)
    e.empty_display_type = display
    e.empty_display_size = size
    e.location = loc
    col.objects.link(e)
    return e
