"""Kale yolu: egimli, kavisli yol; arazi carving; viyaduk kemerleri."""
import math
import numpy as np
from common import smoothstep, lerp
from terrain import H0

# Yol kontrol noktalari (kapidan koye). Kapi disi ~ (6,-50)
CTRL = [
    (6.0, -50.0), (6.0, -62.0), (-4.0, -76.0), (-30.0, -90.0), (-66.0, -96.0),
    (-96.0, -112.0), (-118.0, -134.0), (-146.0, -132.0), (-168.0, -108.0),
    (-186.0, -86.0), (-206.0, -74.0), (-228.0, -84.0), (-244.0, -100.0),
]
ROAD_W = 6.0
GRADE_START = 14.0     # kapida duz kisim
VIA_END = 118.0        # viyaduk bitisi (s)
Z_END = 5.7


def catmull(pts, per=24):
    P = [pts[0]] + list(pts) + [pts[-1]]
    out = []
    for i in range(1, len(P) - 2):
        p0, p1, p2, p3 = [np.array(p) for p in (P[i - 1], P[i], P[i + 1], P[i + 2])]
        for t in np.linspace(0, 1, per, endpoint=False):
            t2, t3 = t * t, t * t * t
            out.append(0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3))
    out.append(np.array(P[-2]))
    return np.array(out)


def resample(poly, step=1.0):
    seg = np.hypot(*(poly[1:] - poly[:-1]).T)
    cum = np.concatenate([[0], np.cumsum(seg)])
    n = int(cum[-1] / step)
    s = np.linspace(0, cum[-1], n + 1)
    x = np.interp(s, cum, poly[:, 0])
    y = np.interp(s, cum, poly[:, 1])
    return s, np.stack([x, y], axis=1)


class Road:
    def __init__(self):
        poly = catmull(CTRL)
        self.s, self.xy = resample(poly, 1.0)
        L = self.s[-1]
        self.L = L
        g = (H0 - Z_END) / (L - GRADE_START)
        self.grade = g
        z = H0 - g * np.maximum(0, self.s - GRADE_START)
        # yumusat
        k = 9
        zp = np.pad(z, (k, k), mode="edge")
        z = np.convolve(zp, np.ones(2 * k + 1) / (2 * k + 1), mode="valid")
        self.z = z
        d = np.gradient(self.xy, axis=0)
        n = np.hypot(d[:, 0], d[:, 1])[:, None]
        self.tan = d / n
        self.nrm = np.stack([-self.tan[:, 1], self.tan[:, 0]], axis=1)   # sol normal

    def at(self, s):
        x = np.interp(s, self.s, self.xy[:, 0])
        y = np.interp(s, self.s, self.xy[:, 1])
        z = np.interp(s, self.s, self.z)
        tx = np.interp(s, self.s, self.tan[:, 0])
        ty = np.interp(s, self.s, self.tan[:, 1])
        return x, y, z, np.arctan2(ty, tx)

    def carve(self, X, Y, H):
        """Araziyi yola gore duzenle (kesme/dolgu). Viyaduk bolgesinde dolgu kademeli."""
        Hn = H.copy()
        xf = X.ravel()
        yf = Y.ravel()
        hf = H.ravel().copy()
        # sadece yola 40 m'den yakin noktalar
        mind = np.full(xf.shape, 1e9)
        arg = np.zeros(xf.shape, dtype=np.int64)
        sub = np.arange(0, len(self.s), 2)
        sx, sy = self.xy[sub, 0], self.xy[sub, 1]
        # bbox filtre
        mask = (xf > sx.min() - 45) & (xf < sx.max() + 45) & (yf > sy.min() - 45) & (yf < sy.max() + 45)
        idx = np.where(mask)[0]
        CH = 20000
        for i in range(0, len(idx), CH):
            ii = idx[i:i + CH]
            dx = xf[ii][:, None] - sx[None, :]
            dy = yf[ii][:, None] - sy[None, :]
            d2 = dx * dx + dy * dy
            a = np.argmin(d2, axis=1)
            mind[ii] = np.sqrt(d2[np.arange(len(ii)), a])
            arg[ii] = sub[a]
        near = mind < 45
        ii = np.where(near)[0]
        s_idx = arg[ii]
        dist = mind[ii]
        zr = self.z[s_idx]
        s_val = self.s[s_idx]
        # dolgu agirligi: viyaduk bolgesinde kademeli
        wfill = smoothstep(18.0, VIA_END, s_val)
        h_old = hf[ii]
        band = 1.0 - smoothstep(ROAD_W * 0.5 + 1.2, ROAD_W * 0.5 + 15.0, dist)
        # kesme: eski yukseklik yolun ustundeyse tam kesme (kayalik yamac kesilir)
        cut = h_old > zr - 0.35
        target = zr - 0.25
        w = np.where(cut, band, band * wfill)
        # dolgu icin yumusak yamac (asagi dogru)
        hf[ii] = lerp(h_old, target, np.clip(w, 0, 1))
        return hf.reshape(H.shape)

    # -------------------------------------------------------------------
    def strip(self, s0, s1, width, step=1.0, lift=0.0):
        s = np.arange(s0, s1 + 1e-6, step)
        x, y, z, _ = self.at(s)
        nx = np.interp(s, self.s, self.nrm[:, 0])
        ny = np.interp(s, self.s, self.nrm[:, 1])
        hw = width / 2
        L = np.stack([x + nx * hw, y + ny * hw, z + lift], axis=1)
        R = np.stack([x - nx * hw, y - ny * hw, z + lift], axis=1)
        return s, L, R
