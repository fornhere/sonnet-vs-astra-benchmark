"""Zaman serisi araçları: anahtar kareli sinyaller (numpy)."""
import math
import numpy as np

FPS = 30

def _ease(mode, u):
    if mode == 'e':   # kosinüs yumuşatma
        return 0.5 - 0.5 * np.cos(np.pi * u)
    if mode == 'i':   # ease-in (kübik)
        return u ** 3
    if mode == 'o':   # ease-out (kübik)
        return 1 - (1 - u) ** 3
    if mode == 'b':   # geri taşma (overshoot)
        c1 = 1.9; c3 = c1 + 1
        return 1 + c3 * (u - 1) ** 3 + c1 * (u - 1) ** 2
    if mode == 'l':
        return u
    raise ValueError(mode)

class Sig:
    """Anahtarlar: (kare, değer, mod). mod, o anahtardan sonraki segmenti belirler.
    p: PCHIP (yumuşak, taşmasız) e/i/o/b/l: ease modları  h: sabit tut"""
    def __init__(self, default=0.0):
        self.k = []
        self.default = default

    def key(self, f, v, mode='p'):
        self.k.append((float(f), float(v), mode))
        return self

    def keys(self, seq, mode='p'):
        for it in seq:
            if len(it) == 3:
                self.key(*it)
            else:
                self.key(it[0], it[1], mode)
        return self

    def sample(self, n):
        fr = np.arange(n, dtype=float)
        if not self.k:
            return np.full(n, self.default)
        ks = sorted(self.k, key=lambda a: a[0])
        xs = np.array([a[0] for a in ks]); ys = np.array([a[1] for a in ks])
        modes = [a[2] for a in ks]
        m = len(ks)
        # PCHIP teğetleri
        d = np.zeros(m)
        if m > 1:
            h = np.diff(xs); delta = np.diff(ys) / np.where(h == 0, 1e-9, h)
            for i in range(1, m - 1):
                if delta[i - 1] * delta[i] > 0:
                    w1 = 2 * h[i] + h[i - 1]; w2 = h[i] + 2 * h[i - 1]
                    d[i] = (w1 + w2) / (w1 / delta[i - 1] + w2 / delta[i])
            d[0] = delta[0] if m > 1 else 0
            d[-1] = delta[-1]
            # uç teğetleri kırp
            if m > 2:
                d[0] = ((2 * h[0] + h[1]) * delta[0] - h[0] * delta[1]) / (h[0] + h[1])
                if np.sign(d[0]) != np.sign(delta[0]): d[0] = 0
                elif np.sign(delta[0]) != np.sign(delta[1]) and abs(d[0]) > 3 * abs(delta[0]): d[0] = 3 * delta[0]
                d[-1] = ((2 * h[-1] + h[-2]) * delta[-1] - h[-1] * delta[-2]) / (h[-1] + h[-2])
                if np.sign(d[-1]) != np.sign(delta[-1]): d[-1] = 0
                elif np.sign(delta[-1]) != np.sign(delta[-2]) and abs(d[-1]) > 3 * abs(delta[-1]): d[-1] = 3 * delta[-1]
        out = np.empty(n)
        for j, f in enumerate(fr):
            if f <= xs[0]:
                out[j] = ys[0]; continue
            if f >= xs[-1]:
                out[j] = ys[-1]; continue
            i = int(np.searchsorted(xs, f, side='right') - 1)
            x0, x1 = xs[i], xs[i + 1]; y0, y1 = ys[i], ys[i + 1]
            u = (f - x0) / (x1 - x0)
            md = modes[i]
            if md == 'h':
                out[j] = y0
            elif md == 'p':
                hh = x1 - x0
                u2, u3 = u * u, u ** 3
                out[j] = ((2 * u3 - 3 * u2 + 1) * y0 + (u3 - 2 * u2 + u) * hh * d[i]
                          + (-2 * u3 + 3 * u2) * y1 + (u3 - u2) * hh * d[i + 1])
            else:
                out[j] = y0 + (y1 - y0) * _ease(md, u)
        return out

def spring_follow(x, w=10.0, z=0.4, sub=8):
    """x: (n,) veya (n,3). İkinci mertebe yay ile hedefi geriden izler."""
    x = np.asarray(x, dtype=float)
    dt = 1.0 / FPS / sub
    y = x[0].copy(); v = np.zeros_like(y)
    out = np.empty_like(x)
    for i in range(len(x)):
        for _ in range(sub):
            a = w * w * (x[i] - y) - 2 * z * w * v
            v = v + a * dt
            y = y + v * dt
        out[i] = y
    return out

def smoothstep(x):
    x = np.clip(x, 0.0, 1.0)
    return x * x * (3 - 2 * x)

def rot_x(a):
    c, s = math.cos(a), math.sin(a)
    return np.array([[1, 0, 0], [0, c, -s], [0, s, c]])
def rot_y(a):
    c, s = math.cos(a), math.sin(a)
    return np.array([[c, 0, s], [0, 1, 0], [-s, 0, c]])
def rot_z(a):
    c, s = math.cos(a), math.sin(a)
    return np.array([[c, -s, 0], [s, c, 0], [0, 0, 1]])
