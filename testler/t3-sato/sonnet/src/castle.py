"""Kale: cevre duvari, kuleler, kapi, ana kule (donjon), salon, sapel, avlu binalari."""
import math
import random
import numpy as np
import bpy
from mathutils import Vector
from common import Builder, get_collection, new_empty
from terrain import H0, WALL_PTS

R = random.Random(11)
PI = math.pi


# ----------------------------------------------------------------------------
# Profiller
# ----------------------------------------------------------------------------
def gothic_profile(w, h, n=6):
    hs = max(h - 0.866 * w, 0.01)
    pts = [(-w / 2, 0.0), (w / 2, 0.0), (w / 2, hs)]
    for i in range(1, n + 1):  # sag ark (merkez -w/2)
        th = math.radians(0 + 60 * i / n)
        pts.append((-w / 2 + w * math.cos(th), hs + w * math.sin(th)))
    for i in range(1, n):  # sol ark (merkez +w/2)
        th = math.radians(120 + 60 * i / n)
        pts.append((w / 2 + w * math.cos(th), hs + w * math.sin(th)))
    pts.append((-w / 2, hs))
    return pts


def round_profile(r, n=20):
    return [(r * math.cos(2 * PI * i / n), r + r * math.sin(2 * PI * i / n)) for i in range(n)]


def rect_profile(w, h):
    return [(-w / 2, 0), (w / 2, 0), (w / 2, h), (-w / 2, h)]


def offset_profile(prof, d):
    """Basit buyutme (merkezden)."""
    cx = sum(p[0] for p in prof) / len(prof)
    cy = sum(p[1] for p in prof) / len(prof)
    out = []
    for (u, v) in prof:
        dx, dy = u - cx, v - cy
        l = math.hypot(dx, dy) or 1
        out.append((u + dx / l * d, v + dy / l * d))
    return out


def window(b, x, y, z, a, w=1.3, h=3.2, glow=None, style="gothic", frame="stone_light", depth=0.28, cross=True):
    """(x,y,z) pencere tabani, a = duvar dis normali acisi."""
    ang = a - PI / 2
    if glow is None:
        glow = R.uniform(0.45, 1.0) if R.random() > 0.12 else 0.0
    prof = gothic_profile(w, h) if style == "gothic" else (round_profile(w / 2) if style == "round" else rect_profile(w, h))
    if style == "gothic":
        fr = [(u, v) for (u, v) in gothic_profile(w + 0.6, h + 0.3)]
        fr = [(u, v - 0.0) for (u, v) in fr]
    elif style == "round":
        fr = round_profile(w / 2 + 0.3)
    else:
        fr = rect_profile(w + 0.6, h + 0.5)
    fb = 0.0
    # tas cerceve (dis), sonra cam
    b.prism(fr if style != "round" else [(u, v - 0.3) for (u, v) in fr], x, y, z - (0.15 if style != "round" else 0.0), ang,
            depth * 0.7, frame, inset_back=0.35)
    b.prism(prof, x, y, z, ang, depth, "dark", front_mat="window", glow=glow, inset_back=0.35)
    if cross and style != "round" and h > 2.0:
        # kayit / haç
        c, s = math.cos(ang), math.sin(ang)
        nx, ny = -s, c
        b.prism(rect_profile(0.09, h * 0.9), x, y, z, ang, depth + 0.05, "iron")
        zc = z + h * 0.5
        b.prism([(-w / 2, 0), (w / 2, 0), (w / 2, 0.09), (-w / 2, 0.09)], x, y, zc, ang, depth + 0.05, "iron")
    elif style == "round":
        b.prism(rect_profile(0.1, w), x, y, z, ang, depth + 0.05, "iron")
        b.prism([(-w / 2, w / 2), (w / 2, w / 2), (w / 2, w / 2 + 0.1), (-w / 2, w / 2 + 0.1)], x, y, z, ang, depth + 0.05, "iron")


def slit(b, x, y, z, a, h=1.6, w=0.28):
    ang = a - PI / 2
    b.prism(rect_profile(w + 0.3, h + 0.3), x, y, z - 0.15, ang, 0.1, "stone_light", inset_back=0.3)
    b.prism(rect_profile(w, h), x, y, z, ang, 0.06, "dark", inset_back=0.3)


def torch(b, x, y, z, a, lights=None):
    """Duvar mesalesi: demir tutucu + alev (parlak)."""
    ca, sa = math.cos(a), math.sin(a)
    b.box(x + ca * 0.25, y + sa * 0.25, z, 0.16, 0.16, 0.9, mat="iron")
    b.cyl(x + ca * 0.38, y + sa * 0.38, z + 0.85, 0.15, 0.3, 8, "iron", r_top=0.26)
    fl = b.cone(x + ca * 0.38, y + sa * 0.38, z + 1.1, 0.19, 0.5, 8, "window")
    for f in fl:
        for l in f.loops:
            l[b.glow] = (1.0, 1.0, 1.0, 1.0)
    if lights is not None:
        lights.append((x + ca * 0.5, y + sa * 0.5, z + 1.3))


# ----------------------------------------------------------------------------
# Kule tipleri
# ----------------------------------------------------------------------------
def merlon_ring(b, x, y, z, r, count, mat="stone", size=(1.3, 0.9, 1.7)):
    for i in range(count):
        a = 2 * PI * (i + 0.5) / count
        b.box(x + r * math.cos(a), y + r * math.sin(a), z, size[0], size[1], size[2], rot=a + PI / 2, mat=mat)


def flag(b_flags, x, y, z, pole_h, col="cloth", size=(4.2, 2.4), angle=0.0):
    """Bayrak + direk bilgisi listeye eklenir; nesneler sonra olusturulur."""
    b_flags.append(dict(x=x, y=y, z=z, h=pole_h, size=size, mat=col, ang=angle))


def round_tower(b, x, y, r, h, roof_h, roofmat="roof_slate", style="roof", flags=None, lights=None,
                windows=2, slits=3, drum=3.6, z_base=None, glowing=True):
    """style: 'roof' (konik), 'crenel' (mazgalli acik top)."""
    zb = H0 - 7 if z_base is None else z_base
    top = H0 + h
    # eski temel (batter)
    b.cyl(x, y, zb, r + 2.6, H0 + 3.5 - zb, 28, "stone_big", r_top=r + 0.2, rot=0.1)
    # govde
    b.cyl(x, y, H0 + 3.5, r, h - 3.5, 28, "stone", rot=0.1)
    # bantlar
    b.cyl(x, y, H0 + 3.4, r + 0.3, 0.5, 28, "stone_light")
    b.cyl(x, y, H0 + h * 0.55, r + 0.28, 0.45, 28, "stone_light")
    # ok yarigi / pencereler
    for k in range(slits):
        for j in range(5):
            a = 2 * PI * (j + 0.4 * k) / 5 + k * 0.5 + R.uniform(-0.1, 0.1)
            slit(b, x + r * math.cos(a), y + r * math.sin(a), H0 + 5.5 + k * (h - 12) / max(slits, 1), a)
    for j in range(windows):
        a = 2 * PI * (j + R.random() * 0.3) / windows + R.uniform(0, 1.4)
        window(b, x + (r - 0.05) * math.cos(a), y + (r - 0.05) * math.sin(a), top - 8.0 - R.uniform(0, 2), a, 1.2, 2.8)
    # korbel halkasi
    n_cor = int(2 * PI * r / 1.6)
    for i in range(n_cor):
        a = 2 * PI * i / n_cor
        b.box(x + (r + 0.35) * math.cos(a), y + (r + 0.35) * math.sin(a), top - 2.2, 0.75, 0.9, 2.2, rot=a + PI / 2,
              mat="stone_light", taper=0.7)
    b.cyl(x, y, top - 0.1, r + 1.15, 0.9, 28, "stone_light", r_top=r + 1.0, cap_top=True)
    rr = r + 1.15
    if style == "crenel":
        # ust kat: mazgal
        b.cyl(x, y, top + 0.7, rr - 0.1, 1.0, 28, "stone", cap_top=False)
        merlon_ring(b, x, y, top + 1.7, rr - 0.4, int(2 * PI * rr / 2.6), "stone", (1.5, 0.95, 1.7))
        b.cyl(x, y, top + 0.75, rr - 0.55, 0.05, 24, "stone_dark")
        # ic kucuk cati/ ust yapi
        if drum > 0:
            b.cyl(x, y, top + 0.75, r * 0.55, drum, 16, "stone_light")
            b.cone(x, y, top + 0.75 + drum, r * 0.75, roof_h, 16, roofmat)
            if flags is not None:
                flag(flags, x, y, top + 0.75 + drum + roof_h, 5.0, "cloth")
    else:
        # davul (tambur) ve konik cati
        b.cyl(x, y, top + 0.8, rr - 0.55, drum, 28, "stone", rot=0.05)
        for j in range(4):
            a = 2 * PI * j / 4 + 0.7
            if drum > 2.5:
                window(b, x + (rr - 0.6) * math.cos(a), y + (rr - 0.6) * math.sin(a), top + 1.5, a, 0.9, 1.9)
        zc = top + 0.8 + drum
        # cati: iki kademeli (dikey) - genis saçak
        b.cyl(x, y, zc - 0.2, rr + 0.9, 0.7, 28, roofmat, r_top=rr + 0.4, cap_top=False)
        b.cone(x, y, zc + 0.3, rr + 0.5, roof_h, 28, roofmat)
        # cati kirisi
        zt = zc + 0.3 + roof_h
        b.cyl(x, y, zt - 0.2, 0.28, 2.4, 8, "gold")
        b.cone(x, y, zt + 2.2, 0.45, 1.0, 8, "gold")
        if flags is not None:
            flag(flags, x, y, zt + 3.0, 6.0, "cloth" if R.random() > 0.35 else "cloth_blue")
        # roof dormers
        for j in range(3):
            a = 2 * PI * j / 3 + R.uniform(0, 1)
            if roof_h > 9:
                dz = zc + roof_h * 0.35
                rd = (rr + 0.5) * (1 - 0.35) - 0.2
                dx, dy = x + rd * math.cos(a), y + rd * math.sin(a)
                b.box(dx, dy, dz - 0.4, 1.4, 1.4, 1.5, rot=a + PI / 2, mat="stone_light")
                b.gable(dx, dy, dz + 1.1, 1.4, 1.5, 1.0, rot=a + PI / 2 + PI / 2 * 0 + PI / 2, over=0.25,
                        mat_roof=roofmat, mat_wall="stone_light")
                window(b, dx + 0.75 * math.cos(a), dy + 0.75 * math.sin(a), dz + 0.05, a, 0.6, 1.1, style="rect", cross=False)
    return top


def square_tower(b, x, y, w, d, h, rot=0.0, roofmat="roof_slate", roof_h=14, flags=None, windows=2, crenel=False):
    zb = H0 - 7
    b.box(x, y, zb, w + 3.0, d + 3.0, H0 + 4 - zb, rot=rot, mat="stone_big", taper=(w + 0.3) / (w + 3.0))
    b.box(x, y, H0 + 4, w, d, h - 4, rot=rot, mat="stone")
    # koseler (kose tasi)
    for sx in (-1, 1):
        for sy in (-1, 1):
            c, s = math.cos(rot), math.sin(rot)
            lx, ly = sx * w / 2, sy * d / 2
            b.box(x + lx * c - ly * s, y + lx * s + ly * c, H0 + 3.6, 1.0, 1.0, h - 3.6 + 0.2, rot=rot, mat="stone_light")
    top = H0 + h
    b.box(x, y, top, w + 1.6, d + 1.6, 1.0, rot=rot, mat="stone_light", taper=1.0)
    for i in range(4):
        a = rot + i * PI / 2
        wd = w if i % 2 == 0 else d
        ox = x + (d if i % 2 == 0 else w) / 2 * math.cos(a + PI / 2) * 0
        cx = x + (w / 2 if i % 2 == 0 else d / 2) * math.cos(a)
        cy = y + (w / 2 if i % 2 == 0 else d / 2) * math.sin(a)
        for j in range(windows):
            off = (j - (windows - 1) / 2) * 3.2
            wx = cx + off * math.cos(a + PI / 2)
            wy = cy + off * math.sin(a + PI / 2)
            window(b, wx, wy, top - 9, a, 1.2, 3.0)
    if crenel:
        c = math.cos(rot)
        for i in range(4):
            a = rot + i * PI / 2
            L = (d if i % 2 == 0 else w) + 1.6
            cx = x + ((w if i % 2 == 0 else d) / 2 + 0.7) * math.cos(a)
            cy = y + ((w if i % 2 == 0 else d) / 2 + 0.7) * math.sin(a)
            n = int(L / 2.6)
            for k in range(n):
                off = (k + 0.5 - n / 2) * (L / n)
                b.box(cx + off * math.cos(a + PI / 2), cy + off * math.sin(a + PI / 2), top + 1.0, 1.4, 0.9, 1.7,
                      rot=a + PI / 2, mat="stone")
    else:
        b.pyramid(x, y, top + 0.9, w + 1.8, d + 1.8, roof_h, rot=rot, mat=roofmat)
        zt = top + 0.9 + roof_h
        b.cyl(x, y, zt - 0.2, 0.25, 2.5, 8, "gold")
        if flags is not None:
            flag(flags, x, y, zt + 2.0, 5.5, "cloth")
    return top


# ----------------------------------------------------------------------------
# Duvarlar
# ----------------------------------------------------------------------------
def wall_segment(b, p0, p1, r0, r1, h=13.0, thick=3.4, lights=None, skip=(), slit_every=9.0):
    x0, y0 = p0
    x1, y1 = p1
    dx, dy = x1 - x0, y1 - y0
    L = math.hypot(dx, dy)
    ux, uy = dx / L, dy / L
    nx, ny = uy, -ux  # dis normal (CCW poligon)
    ang = math.atan2(dy, dx)
    s0, s1 = r0 * 0.5, L - r1 * 0.5
    Lc = s1 - s0
    mx = x0 + ux * (s0 + s1) / 2
    my = y0 + uy * (s0 + s1) / 2
    zb = H0 - 7
    # temel (batter)
    b.box(mx, my, zb, Lc, thick + 2.8, H0 + 3.0 - zb, rot=ang, mat="stone_big", taper=1.0)
    # asil sur govdesi : ust uzerinden kalinlik
    # asagi kismi eğimli temel
    b.box(mx + nx * 0.0, my + ny * 0.0, H0 + 3.0, Lc, thick, h - 3.0, rot=ang, mat="stone")
    top = H0 + h
    # yuruyus yolu: hafif genis ust
    b.box(mx, my, top - 0.2, Lc, thick + 0.8, 0.6, rot=ang, mat="stone_light")
    # dis korkuluk + mazgal
    off = thick / 2 + 0.2
    b.box(mx + nx * off, my + ny * off, top + 0.4, Lc, 0.85, 1.1, rot=ang, mat="stone")
    n = int(Lc / 2.5)
    step = Lc / n
    for k in range(n):
        s = s0 + (k + 0.5) * step
        px, py = x0 + ux * s, y0 + uy * s
        b.box(px + nx * off, py + ny * off, top + 1.5, step * 0.56, 0.95, 1.6, rot=ang, mat="stone")
    # ic korkuluk
    b.box(mx - nx * (thick / 2 + 0.1), my - ny * (thick / 2 + 0.1), top + 0.4, Lc, 0.55, 0.9, rot=ang, mat="stone")
    # payandalar (dis)
    nb = max(1, int(Lc / 11))
    for k in range(nb):
        s = s0 + (k + 0.5) * Lc / nb
        px, py = x0 + ux * s, y0 + uy * s
        b.box(px + nx * (thick / 2 + 0.55), py + ny * (thick / 2 + 0.55), H0 + 1.0, 2.2, 1.7, h - 1.2, rot=ang,
              mat="stone_light", taper=0.75)
        # ok yarigi
        for sgn in (-1, 1):
            sp = s + sgn * Lc / nb * 0.25
            slit(b, x0 + ux * sp + nx * thick / 2, y0 + uy * sp + ny * thick / 2, H0 + 6.0, math.atan2(ny, nx), 1.8)
    # ic tarafta destek kemerleri (gorunur kismi: ic yuzden hafif dis)
    # sur ic yuzeyi mesaleleri
    if lights is not None:
        for k in range(max(1, int(Lc / 18))):
            s = s0 + (k + 0.5) * Lc / max(1, int(Lc / 18))
            torch(b, x0 + ux * s - nx * thick / 2, y0 + uy * s - ny * thick / 2, top - 4.5, math.atan2(-ny, -nx), lights)
    return dict(mx=mx, my=my, ang=ang)


# ----------------------------------------------------------------------------
# Kapi yapisi
# ----------------------------------------------------------------------------
def gatehouse(b, cx, cy, ang, lights=None, flags=None, doors=True):
    """cx,cy kapi merkezi; ang kapi duvarinin boyuna yonu (ic kapi -> dis normal)."""
    c, s = math.cos(ang), math.sin(ang)
    nx, ny = s, -c  # dis normal
    W = 22.0
    T = 8.0
    h = 17.0
    # gövde
    b.box(cx, cy, H0 - 12, W, T + 2.8, H0 + 3 + 12 - 12 + 0, rot=ang, mat="stone_big")
    b.box(cx, cy, H0 + 3, W, T, h - 3, rot=ang, mat="stone")
    top = H0 + h
    b.box(cx, cy, top - 0.2, W + 1.2, T + 1.2, 0.8, rot=ang, mat="stone_light")
    # mazgal
    for side in (-1, 1):
        for k in range(int(W / 2.6)):
            off = (k + 0.5 - int(W / 2.6) / 2) * (W / int(W / 2.6))
            b.box(cx + c * off + nx * side * (T / 2 + 0.3), cy + s * off + ny * side * (T / 2 + 0.3), top + 0.6, 1.4, 0.9,
                  1.6, rot=ang, mat="stone")
    # kapi gecidi: sivri kemer, karanlik
    gw, gh = 5.4, 8.2
    prof = gothic_profile(gw, gh)
    ax, ay = cx + nx * (T / 2 + 0.02), cy + ny * (T / 2 + 0.02)
    a_ang = ang  # u ekseni = duvar yonu
    for side in (1, -1):
        px, py = cx + nx * side * (T / 2), cy + ny * side * (T / 2)
        # kemer cercevesi
        fr = gothic_profile(gw + 1.6, gh + 0.9)
        pa = ang if side == 1 else ang + PI
        b.prism(fr, px, py, H0 - 0.15, pa, 0.5, "stone_light", inset_back=0.3)
        b.prism(prof, px, py, H0, pa, 0.35, "dark", front_mat="dark", inset_back=0.4)
    # gecit ici: koyu tunel (iç kutular)
    b.box(cx, cy, H0 + 0.02, gw - 0.2, T + 0.4, gh - 2.5, rot=ang, mat="dark")
    # kapi kanadi (acik, ic tarafta) + izgara
    zs = H0 + 4.4
    bars = []
    # herse (yukselmis yari acik): dis yuzeyin hemen ici
    px, py = cx + nx * (T / 2 - 1.2), cy + ny * (T / 2 - 1.2)
    for k in range(9):
        off = (k - 4) * 0.56
        b.box(px + c * off, py + s * off, zs + 0.0, 0.16, 0.16, gh - 4.2, rot=ang, mat="iron")
    for k in range(8):
        b.box(px, py, zs + 0.4 + k * 0.62, 5.0, 0.13, 0.13, rot=ang, mat="iron")
    # ust pencereler & ambleml: kapi ustu
    window(b, cx + nx * (T / 2 + 0.02) - c * 3.0, cy + ny * (T / 2 + 0.02) - s * 3.0, H0 + 11.0, math.atan2(ny, nx), 1.3, 3.2,
           glow=0.9)
    window(b, cx + nx * (T / 2 + 0.02) + c * 3.0, cy + ny * (T / 2 + 0.02) + s * 3.0, H0 + 11.0, math.atan2(ny, nx), 1.3, 3.2,
           glow=0.9)
    # armasi / sancak levhasi
    b.box(cx + nx * (T / 2 + 0.05), cy + ny * (T / 2 + 0.05), H0 + 11.5, 3.0, 0.2, 3.6, rot=ang, mat="stone_dark")
    if lights is not None:
        for sgn in (-1, 1):
            torch(b, cx + c * sgn * 4.4 + nx * (T / 2 + 0.05), cy + s * sgn * 4.4 + ny * (T / 2 + 0.05), H0 + 3.6,
                  math.atan2(ny, nx), lights)


# ----------------------------------------------------------------------------
# Binalar
# ----------------------------------------------------------------------------
def timber_house(b, x, y, w, d, h, rot, roofmat="roof_red", lights=None, chimney=True, roof_h=None, floors=2,
                 wall="plaster", z0=H0, over=0.6):
    """Yari ahsap ev. rot=0: govde w(x) x d(y), sirt y boyunca."""
    c, s = math.cos(rot), math.sin(rot)
    roof_h = roof_h or w * 0.7
    # taş cinko
    b.box(x, y, z0 - 2.5, w + 0.5, d + 0.5, 3.4, rot=rot, mat="stone")
    b.box(x, y, z0 + 0.9, w, d, h - 0.9, rot=rot, mat=wall)
    # ustte kat çıkıntısı (jettying)
    if floors > 1:
        b.box(x, y, z0 + h * 0.5, w + 0.6, d + 0.6, 0.35, rot=rot, mat="wood_dark")

    def P(lx, ly):
        return x + lx * c - ly * s, y + lx * s + ly * c

    # ahsap dikmeler
    for face in range(4):
        L = d if face % 2 == 0 else w
        n = max(2, int(L / 2.0))
        a = rot + (0 if face == 0 else (PI / 2 if face == 1 else (PI if face == 2 else -PI / 2)))
        # dış normal aci = a  (face0: +x yüz, face1: +y, ...)
        px, py = x + (w / 2 if face % 2 == 0 else d / 2) * math.cos(a), y + (w / 2 if face % 2 == 0 else d / 2) * math.sin(a)
        for k in range(n + 1):
            off = (k / n - 0.5) * (L - 0.25)
            qx = px + off * math.cos(a + PI / 2) + 0.06 * math.cos(a)
            qy = py + off * math.sin(a + PI / 2) + 0.06 * math.sin(a)
            b.box(qx, qy, z0 + 0.9, 0.22, 0.22, h - 0.9, rot=a, mat="wood_dark")
        # yatay kirislar
        for zz in (z0 + 0.9, z0 + h * 0.5 - 0.1, z0 + h - 0.25):
            b.box(px + 0.06 * math.cos(a), py + 0.06 * math.sin(a), zz, 0.22, L, 0.28, rot=a, mat="wood_dark") if False else \
                b.box(px + 0.06 * math.cos(a), py + 0.06 * math.sin(a), zz, L, 0.22, 0.28, rot=a + PI / 2, mat="wood_dark")
        # capraz destekler
        for k in range(n):
            if R.random() < 0.55:
                off0 = (k / n - 0.5) * (L - 0.25)
                off1 = ((k + 1) / n - 0.5) * (L - 0.25)
                zb = z0 + 0.9 + 0.1
                zt2 = z0 + h * 0.5 - 0.1
                p0 = (px + off0 * math.cos(a + PI / 2) + 0.1 * math.cos(a), py + off0 * math.sin(a + PI / 2) + 0.1 * math.sin(a))
                p1 = (px + off1 * math.cos(a + PI / 2) + 0.1 * math.cos(a), py + off1 * math.sin(a + PI / 2) + 0.1 * math.sin(a))
                seg = (p1[0] - p0[0], p1[1] - p0[1])
                sl = math.hypot(*seg)
                b.face([(p0[0], p0[1], zb), (p1[0], p1[1], zb + 0.0), (p1[0], p1[1], zt2), (p0[0], p0[1], zt2)], "plaster") if False else None
        # pencere
        for k in range(max(1, int(L / 4.0))):
            off = (k + 0.5 - max(1, int(L / 4.0)) / 2) * (L / max(1, int(L / 4.0)))
            qx = px + off * math.cos(a + PI / 2)
            qy = py + off * math.sin(a + PI / 2)
            for fl in range(floors):
                if face == 0 and fl == 0 and k == 0:
                    # kapi
                    b.prism(rect_profile(1.3, 2.3), qx, qy, z0 + 0.9, a - PI / 2, 0.2, "wood_dark", inset_back=0.3)
                    continue
                window(b, qx, qy, z0 + 1.9 + fl * h * 0.5, a, 0.8, 1.05, style="rect", frame="wood_dark", depth=0.15, cross=False)
    # cati
    b.gable(x, y, z0 + h, w, d, roof_h, rot=rot, over=over, mat_roof=roofmat, mat_wall=wall)
    # bacalar
    if chimney:
        cx_, cy_ = P(w * 0.25, d * 0.3)
        b.box(cx_, cy_, z0 + h + 0.5, 1.1, 1.1, roof_h * 0.9 + 1.5, rot=rot, mat="stone")
        b.box(cx_, cy_, z0 + h + 0.5 + roof_h * 0.9 + 1.5, 1.4, 1.4, 0.3, rot=rot, mat="stone_light")


def great_hall(b, cx, cy, w, d, h, roof_h, rot, lights=None, flags=None):
    c, s = math.cos(rot), math.sin(rot)

    def P(lx, ly):
        return cx + lx * c - ly * s, cy + lx * s + ly * c

    b.box(cx, cy, H0 - 4, w + 1.0, d + 1.0, 6.0, rot=rot, mat="stone_big", taper=0.93)
    b.box(cx, cy, H0 + 1.9, w, d, h - 1.9, rot=rot, mat="stone_light")
    # ust silme
    b.box(cx, cy, H0 + h - 0.6, w + 0.6, d + 0.6, 0.6, rot=rot, mat="stone")
    b.box(cx, cy, H0 + 5.2, w + 0.35, d + 0.35, 0.4, rot=rot, mat="stone")
    n = int((d - 4) / 5.8)
    for side in (-1, 1):
        a = rot + (0 if side == 1 else PI)
        for k in range(n):
            off = (k + 0.5 - n / 2) * ((d - 4) / n)
            px, py = P(side * w / 2, off)
            window(b, px, py, H0 + 6.0, a, 2.0, 6.2, glow=R.uniform(0.6, 1.0))
            # alt pencere
            window(b, px, py, H0 + 2.2, a, 1.0, 2.0, style="rect", glow=R.uniform(0.3, 1.0), cross=False)
        for k in range(n + 1):
            off = (k - n / 2) * ((d - 4) / n)
            px, py = P(side * w / 2, off)
            b.box(px + 0.5 * side * c, py + 0.5 * side * s, H0 - 1.0, 1.8, 1.1, h + 1.6, rot=a + PI / 2 * 0, mat="stone",
                  taper=0.6)
    # kalkan yüzleri: gül pencere
    for side in (-1, 1):
        a = rot + PI / 2 if side == 1 else rot - PI / 2
        px, py = P(0, side * d / 2)
        window(b, px, py, H0 + 5.5, a, 3.6, 8.5, glow=1.0)
        window(b, px, py, H0 + h + 1.6, a, 2.4, 2.4, style="round", glow=1.0)
    b.gable(cx, cy, H0 + h, w, d, roof_h, rot=rot, over=0.8, mat_roof="roof_slate", mat_wall="stone_light")
    # cati sirt bakir
    # cati üstü çatı penceresi
    for k in range(3):
        off = (k - 1) * 10
        for side in (-1, 1):
            px, py = P(side * w * 0.22, off)
            zc = H0 + h + roof_h * (1 - 0.44 * 1.0) - 0.6
            b.box(px, py, zc, 2.0, 2.0, 2.0, rot=rot, mat="stone_light")
            a = rot + (0 if side == 1 else PI)
            window(b, px + side * 1.0 * c, py + side * 1.0 * s, zc + 0.3, a, 0.9, 1.4, style="rect", cross=False)
            b.gable(px, py, zc + 2.0, 2.0, 2.0, 1.4, rot=rot + PI / 2, over=0.3, mat_roof="roof_slate", mat_wall="stone_light")
    # sirt: fener kule
    lx, ly = P(0, 0)
    for off in (-d * 0.3, d * 0.3):
        px, py = P(0, off)
        b.cyl(px, py, H0 + h + roof_h - 0.3, 1.1, 2.6, 8, "stone_light")
        b.cone(px, py, H0 + h + roof_h + 2.3, 1.7, 3.8, 8, "roof_copper")
    if flags is not None:
        px, py = P(0, d / 2 - 1.5)
        flag(flags, px, py, H0 + h + roof_h - 0.2, 6.0, "cloth_blue")


def chapel(b, cx, cy, w, d, h, roof_h, rot, flags=None):
    c, s = math.cos(rot), math.sin(rot)

    def P(lx, ly):
        return cx + lx * c - ly * s, cy + lx * s + ly * c

    b.box(cx, cy, H0 - 4, w + 1.0, d + 1.0, 5.0, rot=rot, mat="stone_big", taper=0.94)
    b.box(cx, cy, H0 + 1.0, w, d, h - 1.0, rot=rot, mat="stone_light")
    b.box(cx, cy, H0 + h - 0.5, w + 0.5, d + 0.5, 0.5, rot=rot, mat="stone")
    n = int((d - 3) / 4.5)
    for side in (-1, 1):
        a = rot + (0 if side == 1 else PI)
        for k in range(n):
            off = (k + 0.5 - n / 2) * ((d - 3) / n)
            px, py = P(side * w / 2, off)
            window(b, px, py, H0 + 3.6, a, 1.6, 6.0, glow=R.uniform(0.6, 1.0))
        for k in range(n + 1):
            off = (k - n / 2) * ((d - 3) / n)
            px, py = P(side * w / 2, off)
            b.box(px + 0.45 * side * c, py + 0.45 * side * s, H0 - 1.0, 1.6, 1.0, h + 1.2, rot=a, mat="stone", taper=0.6)
    b.gable(cx, cy, H0 + h, w, d, roof_h, rot=rot, over=0.7, mat_roof="roof_slate", mat_wall="stone_light")
    # apsis (yarim koni)
    ax, ay = P(0, d / 2)
    b.cyl(ax, ay, H0 - 4, w / 2 + 0.3, h + 4, 12, "stone_light", cap_top=False)
    b.cone(ax, ay, H0 + h, w / 2 + 0.7, roof_h * 0.85, 12, "roof_slate")
    for j in range(3):
        aa = rot + PI / 2 + (j - 1) * 0.7
        window(b, ax + (w / 2 + 0.25) * math.cos(aa), ay + (w / 2 + 0.25) * math.sin(aa), H0 + 3.6, aa, 1.4, 5.5, glow=1.0)
    # ön: gül pencere
    gx, gy = P(0, -d / 2)
    a = rot - PI / 2
    window(b, gx, gy, H0 + 3.0, a, 2.6, 7.0, glow=1.0)
    window(b, gx, gy, H0 + h + 1.5, a, 2.2, 2.2, style="round", glow=1.0)
    # çan kulesi (sivri kule) : dar, çok yüksek
    tx, ty = P(0, -d / 2 - 2.6)
    bell_tower(b, tx, ty, 6.0, 26.0, rot, flags)


def bell_tower(b, x, y, w, h, rot, flags=None):
    b.box(x, y, H0 - 6, w + 1.4, w + 1.4, 6.0, rot=rot, mat="stone_big", taper=0.9)
    b.box(x, y, H0, w, w, h, rot=rot, mat="stone_light")
    c, s = math.cos(rot), math.sin(rot)
    for i in range(4):
        a = rot + i * PI / 2
        cx, cy = x + w / 2 * math.cos(a), y + w / 2 * math.sin(a)
        window(b, cx, cy, H0 + 8.0, a, 1.0, 3.6, glow=0.9)
        window(b, cx, cy, H0 + h - 5.5, a, 1.5, 3.6, glow=0.0, style="gothic")
        for sx, sy in ((-1, -1), (1, -1), (1, 1), (-1, 1)):
            pass
    for sx in (-1, 1):
        for sy in (-1, 1):
            lx, ly = sx * w / 2, sy * w / 2
            b.box(x + lx * c - ly * s, y + lx * s + ly * c, H0 - 0.5, 0.9, 0.9, h + 0.6, rot=rot, mat="stone")
    top = H0 + h
    b.box(x, y, top, w + 1.0, w + 1.0, 0.7, rot=rot, mat="stone")
    # sivri kule cati (yüksek piramit) : bakir
    b.pyramid(x, y, top + 0.6, w + 1.8, w + 1.8, 15.0, rot=rot, mat="roof_copper")
    zt = top + 0.6 + 15
    b.cyl(x, y, zt - 0.3, 0.2, 3.0, 8, "gold")
    b.box(x, y, zt + 1.5, 1.6, 0.14, 0.14, rot=rot, mat="gold")
    b.box(x, y, zt + 0.7, 0.14, 0.14, 1.6, rot=rot, mat="gold")
    for sx in (-1, 1):
        for sy in (-1, 1):
            lx, ly = sx * (w / 2 + 0.6), sy * (w / 2 + 0.6)
            px, py = x + lx * c - ly * s, y + lx * s + ly * c
            b.cyl(px, py, top + 0.6, 0.6, 3.0, 8, "stone")
            b.cone(px, py, top + 3.6, 0.85, 4.2, 8, "roof_copper")


def keep(b, cx, cy, flags=None, lights=None):
    """Ana kule (donjon): kare taban + 4 kose kulesi + yüksek octagon kule + sivri cati."""
    w, d = 26.0, 22.0
    h = 30.0
    zb = H0 - 12
    b.box(cx, cy, zb, w + 3.0, d + 3.0, H0 + 4 - zb, mat="stone_big", taper=(w + 0.4) / (w + 3.0))
    b.box(cx, cy, H0 + 4, w, d, h - 4, mat="stone")
    # koseler
    for sx in (-1, 1):
        for sy in (-1, 1):
            tx, ty = cx + sx * w / 2, cy + sy * d / 2
            # 4 kose kulesi
            b.cyl(tx, ty, H0 + 2, 4.6, 45 - 2 - 6.0, 24, "stone")
            b.cyl(tx, ty, H0 + 3.5, 4.9, 0.6, 24, "stone_light")
            # bantlar
            b.cyl(tx, ty, H0 + 20, 4.85, 0.5, 24, "stone_light")
            top_t = H0 + 39
            n_cor = 20
            for i in range(n_cor):
                a = 2 * PI * i / n_cor
                b.box(tx + 5.0 * math.cos(a), ty + 5.0 * math.sin(a), top_t - 2.0, 0.8, 0.9, 2.0, rot=a + PI / 2,
                      mat="stone_light", taper=0.7)
            b.cyl(tx, ty, top_t - 0.1, 5.7, 0.9, 24, "stone_light", r_top=5.5)
            b.cyl(tx, ty, top_t + 0.8, 5.0, 3.2, 24, "stone")
            zc = top_t + 4.0
            b.cyl(tx, ty, zc - 0.2, 6.0, 0.7, 24, "roof_copper", r_top=5.5, cap_top=False)
            b.cone(tx, ty, zc + 0.3, 5.6, 14.0, 24, "roof_copper")
            b.cyl(tx, ty, zc + 14.0, 0.22, 3.0, 8, "gold")
            for j in range(3):
                a = 2 * PI * j / 3 + (0.6 if sx > 0 else 0.0) + (0.8 if sy > 0 else 0.0)
                window(b, tx + 4.55 * math.cos(a), ty + 4.55 * math.sin(a), H0 + 10 + j * 3.0, a, 0.9, 2.4)
                slit(b, tx + 4.6 * math.cos(a + 0.9), ty + 4.6 * math.sin(a + 0.9), H0 + 6 + j * 4, a + 0.9)
            window(b, tx + 4.75 * math.cos(math.atan2(sy, sx)), ty + 4.75 * math.sin(math.atan2(sy, sx)), top_t + 1.0,
                   math.atan2(sy, sx), 1.0, 1.8, style="rect", cross=False)
            if flags is not None:
                flag(flags, tx, ty, zc + 15.5, 5.5, "cloth")
    top = H0 + h
    # üst korkuluk/korbel
    b.box(cx, cy, top - 0.4, w + 1.8, d + 1.8, 1.0, mat="stone_light")
    for i in range(int((w + 1.8) / 1.8)):
        pass
    # pencereler duvarlarda
    for i in range(4):
        a = i * PI / 2
        L = d if i % 2 == 0 else w
        cxx = cx + (w / 2 if i % 2 == 0 else d / 2) * math.cos(a)
        cyy = cy + (w / 2 if i % 2 == 0 else d / 2) * math.sin(a)
        for k in range(3):
            off = (k - 1) * 6.0
            for fl in range(3):
                window(b, cxx + off * math.cos(a + PI / 2), cyy + off * math.sin(a + PI / 2), H0 + 6.5 + fl * 7.0, a, 1.2,
                       3.0 if fl < 2 else 3.4, glow=R.uniform(0.4, 1.0))
    # duvar yuzeyi payandalari
    for i in range(4):
        a = i * PI / 2
        cxx = cx + (w / 2 if i % 2 == 0 else d / 2) * math.cos(a)
        cyy = cy + (w / 2 if i % 2 == 0 else d / 2) * math.sin(a)
        for off in (-3.0, 3.0):
            b.box(cxx + off * math.cos(a + PI / 2), cyy + off * math.sin(a + PI / 2), H0 + 2, 0.7, 0.7, h - 2.0,
                  rot=a, mat="stone_light")
    # merkez yüksek kule (sekizgen)
    r = 8.2
    zt = top
    b.cyl(cx, cy, zt - 1.0, r + 1.5, 2.5, 8, "stone_light", r_top=r + 0.4, rot=PI / 8)
    Ht = 26.0
    b.cyl(cx, cy, zt + 1.0, r, Ht, 8, "stone_light", rot=PI / 8, smooth=False)
    tt = zt + 1.0 + Ht
    # 8 pencere
    for i in range(8):
        a = PI / 8 + 2 * PI * (i + 0.5) / 8 - PI / 8 * 0 - (2 * PI / 16)
        a = 2 * PI * i / 8
        rr = r * math.cos(PI / 8) - 0.0
        wx, wy = cx + rr * math.cos(a), cy + rr * math.sin(a)
        window(b, wx, wy, zt + 6.0, a, 1.3, 4.5, glow=R.uniform(0.6, 1.0))
        window(b, wx, wy, zt + 15.5, a, 1.3, 4.5, glow=R.uniform(0.6, 1.0))
        b.box(cx + (r + 0.05) * math.cos(a + PI / 8), cy + (r + 0.05) * math.sin(a + PI / 8), zt, 0.7, 0.7, Ht + 0.5,
              rot=a + PI / 8, mat="stone")
    # korbel + ust kat
    for i in range(24):
        a = 2 * PI * i / 24
        b.box(cx + (r * 0.93 + 0.8) * math.cos(a), cy + (r * 0.93 + 0.8) * math.sin(a), tt - 2.0, 0.8, 1.2, 2.0, rot=a + PI / 2,
              mat="stone", taper=0.7)
    b.cyl(cx, cy, tt - 0.2, r + 1.2, 0.9, 8, "stone", rot=PI / 8)
    b.cyl(cx, cy, tt + 0.7, r + 0.4, 4.4, 8, "stone_light", rot=PI / 8, smooth=False)
    for i in range(8):
        a = 2 * PI * i / 8
        rr = (r + 0.4) * math.cos(PI / 8)
        window(b, cx + rr * math.cos(a), cy + rr * math.sin(a), tt + 1.3, a, 1.2, 2.4, glow=1.0)
    zc = tt + 5.1
    b.cyl(cx, cy, zc - 0.2, r + 2.6, 1.0, 8, "roof_slate", r_top=r + 1.6, cap_top=False, rot=PI / 8)
    b.cyl(cx, cy, zc + 0.6, r + 1.6, 6.0, 8, "roof_slate", r_top=r * 0.45, cap_top=False, rot=PI / 8, smooth=False)
    b.cyl(cx, cy, zc + 6.6, r * 0.45, 22.0, 8, "roof_slate", r_top=0.0, cap_top=False, rot=PI / 8, smooth=False)
    zt2 = zc + 6.6 + 22.0
    b.cyl(cx, cy, zt2 - 0.3, 0.32, 5.0, 8, "gold")
    b.cyl(cx, cy, zt2 + 1.5, 0.9, 0.35, 8, "gold")
    b.cone(cx, cy, zt2 + 1.7, 0.6, 1.3, 8, "gold")
    if flags is not None:
        flag(flags, cx, cy, zt2 + 4.5, 9.0, "cloth", size=(7.0, 4.0))
    # kucuk cati pencereleri
    return zt2


# ----------------------------------------------------------------------------
def barbican_bridge(b, path_pts):
    pass
