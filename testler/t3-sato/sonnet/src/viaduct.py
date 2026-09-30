"""Kapiya cikan tas viyaduk (kemerli koprü) + zemin yol seridi."""
import math
import numpy as np
from common import Builder
from roads import VIA_END, ROAD_W
from terrain import sample_height


def build_viaduct(b, road, xs, ys, H, span=10.5, pw=2.6, deck_w=7.6, deck_t=1.0, s_start=0.0, s_end=None):
    s_end = s_end or VIA_END
    # --- pier ve kemer hesabi
    n = max(2, int(round((s_end - s_start) / span)))
    piers_s = np.linspace(s_start, s_end, n + 1)
    px, py, pz, pang = road.at(piers_s)
    # kesit yonu (yola dik)
    def ground(x, y, ang, w):
        c, s = math.cos(ang), math.sin(ang)
        pts = [(x + (-s) * o, y + c * o) for o in (-w / 2, 0.0, w / 2)]
        return min(sample_height(xs, ys, H, np.array([p[0]]), np.array([p[1]]))[0] for p in pts)

    zg = [ground(px[i], py[i], pang[i], deck_w) - 3.5 for i in range(n + 1)]
    ptw = deck_w - 1.4
    for i in range(n):
        x0, y0, x1, y1 = px[i], py[i], px[i + 1], py[i + 1]
        L = math.hypot(x1 - x0, y1 - y0)
        ang = math.atan2(y1 - y0, x1 - x0)
        ux, uy = (x1 - x0) / L, (y1 - y0) / L
        nx, ny = -uy, ux
        zu0 = pz[i] - deck_t - 0.15
        zu1 = pz[i + 1] - deck_t - 0.15
        zu_mid = (zu0 + zu1) / 2
        r_i = (L - pw) / 2
        z_sp = zu_mid - (r_i + 0.85) + 0.0
        # profil noktalari (u, z)
        prof = []
        prof.append((0.0, zg[i]))
        prof.append((0.0, zu0))
        prof.append((L, zu1))
        prof.append((L, zg[i + 1]))
        gm = min(zg[i] + 3.5, zg[i + 1] + 3.5)
        arch = (z_sp - 0.3 > gm - 1.0) and r_i > 2.0
        if arch:
            # kemer kesigi (sagdan sola)
            nseg = 14
            arcp = [(L / 2 + r_i * math.cos(math.pi * k / nseg), z_sp + r_i * math.sin(math.pi * k / nseg)) for k in range(nseg + 1)]
            # sag pier yuz: (L - pw/2)
            pr = [(L - pw / 2, zg[i + 1]), (L - pw / 2, z_sp)] + arcp[1:-1][::1]
            # sirali: sag alt -> sag yay basi -> ust -> sol yay sonu -> sol alt
            prof = [(0.0, zg[i]), (0.0, zu0), (L, zu1), (L, zg[i + 1]), (L - pw / 2, zg[i + 1]), (L - pw / 2, z_sp)]
            prof += arcp[1:-1]
            prof += [(pw / 2, z_sp), (pw / 2, zg[i])]
        # 3B'ye cevir: iki yuz (ust genisligi ptw)
        def P(u, z, off):
            return (x0 + ux * u + nx * off, y0 + uy * u + ny * off, z)

        front = [P(u, z, ptw / 2) for (u, z) in prof]
        back = [P(u, z, -ptw / 2) for (u, z) in prof]
        b.face(front, "stone")
        b.face(back[::-1], "stone")
        m = len(prof)
        for k in range(m):
            j = (k + 1) % m
            if k == 1:
                continue  # ustte kaldirma (deck ortuyor)
            b.face([back[k], back[j], front[j], front[k]], "stone_big" if k >= 4 else "stone")
        # pier yuzu gruplama: pier basi
        if arch:
            # sivri kemer basligi (imposta) tasi
            for sgn, uu in ((-1, pw / 2), (1, L - pw / 2)):
                b.box(x0 + ux * uu, y0 + uy * uu, z_sp - 0.35, 0.6, ptw + 0.5, 0.5, rot=ang, mat="stone_light")
            # kemer kilit tasi (anahtar)
            b.box(x0 + ux * L / 2, y0 + uy * L / 2, z_sp + r_i - 0.05, 0.9, ptw + 0.35, 1.0, rot=ang, mat="stone_light")
            # kemer halkasi: on/arka yuzde ince halka (hafif kabarik)
            R0, R1 = r_i, r_i + 0.85
            seg = 14
            for side in (-1, 1):
                off = side * (ptw / 2 + 0.05)
                for k in range(seg):
                    a0, a1 = math.pi * k / seg, math.pi * (k + 1) / seg
                    q = [P(L / 2 + R * math.cos(a), z_sp + R * math.sin(a), off) for (R, a) in ((R0, a0), (R1, a0), (R1, a1), (R0, a1))]
                    b.face(q if side == 1 else q[::-1], "stone_light")
        # pier zeminleri: yatay bantlar
        if i > 0 or True:
            b.box(x0, y0, zu0 - 0.45, 0.6 + 0.0, ptw + 0.0, 0.0001, rot=ang, mat="stone_light") if False else None
    # pier ust silmeleri (payanda)
    for i in range(n + 1):
        b.box(px[i], py[i], pz[i] - deck_t - 1.8, pw + 0.9, ptw + 0.8, 0.5, rot=pang[i], mat="stone_light")
    # --- deck: surekli seritsel yuzey
    s = np.arange(s_start, s_end + 1e-6, 1.0)
    x, y, z, ang = road.at(s)
    nx = np.interp(s, road.s, road.nrm[:, 0])
    ny = np.interp(s, road.s, road.nrm[:, 1])
    hw = deck_w / 2

    def V(i, off, dz=0.0):
        return (x[i] + nx[i] * off, y[i] + ny[i] * off, z[i] + dz)

    for i in range(len(s) - 1):
        j = i + 1
        # yol yuzu
        b.quad(V(i, -ROAD_W / 2), V(j, -ROAD_W / 2), V(j, ROAD_W / 2), V(i, ROAD_W / 2), "cobble")
        # kaldirim (yaya) sag/sol
        for sgn in (-1, 1):
            o0, o1 = sgn * ROAD_W / 2, sgn * hw
            q = [V(i, o0, 0.0), V(j, o0, 0.0), V(j, o1, 0.0), V(i, o1, 0.0)]
            b.face(q if sgn == 1 else q[::-1], "stone_light") if False else None
        # kalinlik: yan yuzler ve alt
        for sgn in (-1, 1):
            o = sgn * hw
            q = [V(i, o, -deck_t), V(j, o, -deck_t), V(j, o, 0.0), V(i, o, 0.0)]
            b.face(q if sgn == 1 else q[::-1], "stone_light")
        b.quad(V(i, hw, -deck_t), V(j, hw, -deck_t), V(j, -hw, -deck_t), V(i, -hw, -deck_t), "stone_dark")
        # yol kenarlari: ust yuzey hw'ye kadar (kaldirim)
        for sgn in (-1, 1):
            o0, o1 = sgn * ROAD_W / 2, sgn * hw
            q = [V(i, o0, 0.0), V(j, o0, 0.0), V(j, o1, 0.0), V(i, o1, 0.0)]
            b.face(q if sgn == -1 else q[::-1], "stone_light")
        # korkuluk
        for sgn in (-1, 1):
            o_in, o_out = sgn * (hw - 0.75), sgn * (hw - 0.05)
            hp = 1.2
            # dis yuz
            qo = [V(i, o_out, 0.0), V(j, o_out, 0.0), V(j, o_out, hp), V(i, o_out, hp)]
            qi = [V(i, o_in, 0.0), V(j, o_in, 0.0), V(j, o_in, hp), V(i, o_in, hp)]
            qt = [V(i, o_in, hp), V(j, o_in, hp), V(j, o_out, hp), V(i, o_out, hp)]
            if sgn == 1:
                b.face(qo, "stone")
                b.face(qi[::-1], "stone")
                b.face(qt[::-1], "stone_light")
            else:
                b.face(qo[::-1], "stone")
                b.face(qi, "stone")
                b.face(qt, "stone_light")
    # korkuluk payandalari / lambalik postlari
    for i in range(6, len(s) - 4, 8):
        for sgn in (-1, 1):
            b.box(x[i] + nx[i] * sgn * (hw - 0.4), y[i] + ny[i] * sgn * (hw - 0.4), z[i], 0.95, 0.95, 1.65, rot=ang[i], mat="stone_light")
    return dict(piers=n, zg=zg)


def build_ground_road(b, road, s0, s1, width=ROAD_W + 0.6):
    s, L, R = road.strip(s0, s1, width, 1.5, 0.06)
    for i in range(len(s) - 1):
        b.quad(tuple(L[i]), tuple(L[i + 1]), tuple(R[i + 1]), tuple(R[i]), "road")
    # eğimli yan etekler (toprak kenar)
    s2, L2, R2 = road.strip(s0, s1, width + 2.6, 1.5, -0.9)
    for i in range(len(s) - 1):
        b.quad(tuple(L2[i]), tuple(L2[i + 1]), tuple(L[i + 1]), tuple(L[i]), "road_edge")
        b.quad(tuple(R[i]), tuple(R[i + 1]), tuple(R2[i + 1]), tuple(R2[i]), "road_edge")
