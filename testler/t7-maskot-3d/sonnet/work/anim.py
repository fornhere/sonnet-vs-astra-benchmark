"""Forn — animasyon: sinyal tabanlı sahne + rig uygulaması."""
import math, json
import numpy as np
from sig import *
import env

N = 306
CZ0 = 1.36
C0 = np.array([0.0, 0.0, CZ0])
HL = np.array([0.012, 0.0, 0.53])              # delik, gövde merkezine göre
PEG_H = np.array([env.CHAR_X, 0.0, env.PEG_Z - 0.028])
STAND_Y = -0.56
ANK_Z = 0.235
G = 12.0
EVENTS = {}

def V(x, y, z): return np.array([x, y, z], dtype=float)
def norm(v): v = np.asarray(v, float); return v / (np.linalg.norm(v) + 1e-9)
def rb(roll, yaw, pitch): return rot_z(yaw) @ rot_y(roll) @ rot_x(pitch)

# ------------------------------------------------------------------ gövde
def body_track():
    t = np.arange(N) / FPS
    F_REL = 98
    # asılı sallanma
    amp = Sig().keys([(0, 4.5), (30, 4.5), (60, 3.0), (74, 7), (86, 13), (F_REL, 17)]).sample(N)
    frq = Sig().keys([(0, 0.55), (60, 0.62), (74, 1.2), (F_REL, 1.7)]).sample(N)
    phase = 2 * np.pi * np.cumsum(frq) / FPS
    roll_h = np.radians(amp * np.sin(phase))
    yaw_h = np.radians(5.0 * np.sin(2 * np.pi * 0.21 * t + 0.7)) * np.clip(1 - (np.arange(N) - 60) / 30, 0, 1)
    pit_h = np.radians(2.5 * np.sin(2 * np.pi * 0.33 * t + 1.9))
    hy = Sig().keys([(0, 0.0), (72, 0.0, 'e'), (80, -0.13, 'e'), (83, -0.11, 'e'), (89, -0.31, 'e'), (92, -0.29, 'e'), (F_REL, -0.57)]).sample(N)
    # hang merkezi
    c = np.zeros((N, 3)); roll = np.zeros(N); yaw = np.zeros(N); pit = np.zeros(N)
    for f in range(N):
        R = rb(roll_h[f], yaw_h[f], pit_h[f])
        c[f] = PEG_H + V(0, hy[f], 0) - R @ HL
        roll[f], yaw[f], pit[f] = roll_h[f], yaw_h[f], pit_h[f]
    # serbest düşüş
    z0 = c[F_REL, 2]
    tau_land = math.sqrt(2 * (z0 - CZ0) / G)
    F_LAND = int(math.ceil(F_REL + tau_land * FPS))
    for f in range(F_REL, F_LAND):
        tau = (f - F_REL) / FPS
        u = (f - F_REL) / (F_LAND - F_REL)
        cx_ = c[F_REL, 0] * (1 - smoothstep(u * 1.2)) + env.CHAR_X * smoothstep(u * 1.2)
        c[f] = V(cx_, STAND_Y, z0 - 0.5 * G * tau ** 2)
        roll[f] = roll[F_REL] * (1 - smoothstep(u * 1.15)) + np.radians(6) * np.sin(u * 3.0) * u
        yaw[f] = yaw[F_REL] * (1 - u)
        pit[f] = pit[F_REL] * (1 - u) + np.radians(-8) * math.sin(u * math.pi)
    L = F_LAND
    EVENTS['fall'] = F_REL; EVENTS['land'] = L
    # iniş sonrası (tuşlu)
    dz = Sig().keys([(L, 0.0), (L + 3, -0.30), (L + 7, 0.07), (L + 11, -0.045), (L + 15, 0.0),
                     (L + 34, 0.0), (L + 38, -0.03, 'e'), (L + 44, 0.0, 'e'),
                     # ta-da: çömel ve zıpla
                     (L + 47, -0.07, 'e'), (L + 51, 0.0), (L + 54, 0.13), (L + 60, 0.0),
                     (L + 98, 0.0), (L + 102, -0.09, 'e'), (L + 105, 0.0), (L + 109, 0.34), (L + 113, 0.0),
                     (L + 116, -0.05, 'e'), (L + 120, 0.0),
                     (L + 176, 0.0), (L + 180, -0.03, 'e'), (L + 186, 0.0, 'e')]).sample(N)
    sz = Sig(1.0).keys([(0, 1.0), (32, 1.0), (35, 1.05, 'e'), (44, 1.0, 'e'),
                        (F_REL + 1, 1.0), (F_REL + 4, 1.07), (L - 1, 1.12),
                        (L, 1.12), (L + 3, 0.76), (L + 7, 1.09), (L + 11, 0.965), (L + 15, 1.0),
                        (L + 34, 1.0), (L + 38, 0.95, 'e'), (L + 44, 1.0, 'e'),
                        (L + 47, 0.90, 'e'), (L + 51, 1.0), (L + 54, 1.09), (L + 58, 0.96), (L + 61, 1.0),
                        (L + 98, 1.0), (L + 102, 0.88, 'e'), (L + 105, 1.0), (L + 109, 1.12), (L + 113, 1.02), (L + 116, 0.86, 'e'), (L + 119, 1.05), (L + 123, 1.0),
                        (L + 176, 1.0), (L + 180, 0.95, 'e'), (L + 186, 1.0, 'e')]).sample(N)
    yawk = Sig().keys([(L, 0.0), (L + 38, 0.0, 'e'), (L + 52, -26.0, 'e'), (L + 90, -26.0, 'e'), (L + 102, 0.0, 'e'), (L + 200, 0.0)]).sample(N)
    rollk = Sig().keys([(L, 0.0), (L + 12, 0.0), (L + 20, 2.0, 'e'), (L + 34, 0.0, 'e'), (L + 46, 0.0), (L + 53, -5.0), (L + 64, 0.0),
                        (L + 104, 0.0), (L + 109, 5.0), (L + 114, 0.0), (L + 130, 0.0), (L + 150, 1.5, 'e'), (L + 170, 0.0, 'e')]).sample(N)
    pitk = Sig().keys([(L, 0.0), (L + 5, 6.0), (L + 12, -3.0), (L + 20, 0.0), (L + 20, 0.0), (L + 26, -4.0, 'e'), (L + 33, -4.0, 'e'), (L + 44, 0.0, 'e'),
                       (L + 47, 0.0), (L + 50, -5.0, 'e'), (L + 58, 0.0), (L + 100, 0.0), (L + 106, 5.0, 'e'), (L + 111, -6.0, 'e'), (L + 118, 0.0)]).sample(N)
    for f in range(L, N):
        c[f] = V(env.CHAR_X + 0.0, STAND_Y, CZ0 + dz[f] - (0.015 if f > L + 20 else 0.0))
        roll[f] = np.radians(rollk[f]); yaw[f] = np.radians(yawk[f]); pit[f] = np.radians(pitk[f])
    # breathing (tüm hayatta kalma hissi)
    breath = 1.0 + 0.008 * np.sin(2 * np.pi * 0.42 * t)
    szf = sz * breath
    sxy = 1.0 / np.sqrt(szf)
    return dict(c=c, roll=roll, yaw=yaw, pit=pit, sz=szf, sxy=sxy, L=L, F_REL=F_REL, t=t)

# ------------------------------------------------------------------ eller / ayaklar
HAND_D0 = norm(V(0.05, 0, -1))
HAND_Y = V(0, 1, 0)
HAND_N0 = norm(np.cross(HAND_Y, HAND_D0))
ARM_S = V(0.50, 0.0, 1.05); ARM_E = V(0.745, 0.03, 0.84); ARM_W = V(0.79, -0.02, 0.62)
HIP = V(0.20, 0.0, 0.88); ANK = V(0.265, 0.0, ANK_Z)
ARM_REACH = 0.545
LEG_REACH = 0.645

class HandSig:
    def __init__(self, sx):
        self.sx = sx
        self.pos = [Sig() for _ in range(3)]
        self.fd = [Sig() for _ in range(3)]
        self.pd = [Sig() for _ in range(3)]
        self.pole = [Sig() for _ in range(3)]
        self.curl = Sig(0.28); self.spread = Sig(0.0); self.thumb = Sig(0.3); self.lag = Sig(0.0)
        self.wag = Sig(0.0)
        rest = self.rest()
        self.key(0, **rest)

    def rest(self):
        sx = self.sx
        return dict(pos=V(ARM_W[0] * sx, ARM_W[1], ARM_W[2] - CZ0), fd=V(HAND_D0[0] * sx, HAND_D0[1], HAND_D0[2]),
                    pd=V(HAND_N0[0] * sx, HAND_N0[1], HAND_N0[2]), pole=V(ARM_E[0] * sx, 0.58, ARM_E[2] - CZ0),
                    curl=0.28, spread=0.0, thumb=0.3, lag=1.0, wag=0.0)

    def key(self, f, mode='p', mirror=False, **kw):
        """mirror=True: verilen vektörler 'sağ el' tanımıdır (x işareti sx ile çarpılır)."""
        sx = self.sx
        def M(v):
            v = np.asarray(v, float).copy()
            if mirror: v[0] = v[0] * (-sx)  # tanımlar sağ el (−x) için yazıldı
            return v
        for name, arr in (('pos', self.pos), ('fd', self.fd), ('pd', self.pd), ('pole', self.pole)):
            if name in kw:
                v = M(kw[name])
                for i in range(3): arr[i].key(f, v[i], mode)
        for name in ('curl', 'spread', 'thumb', 'lag', 'wag'):
            if name in kw:
                getattr(self, name).key(f, kw[name], mode)

def hand_arrays(H, B):
    n = N
    pos = np.stack([s.sample(n) for s in H.pos], 1)
    fd = np.stack([s.sample(n) for s in H.fd], 1)
    pd = np.stack([s.sample(n) for s in H.pd], 1)
    pole = np.stack([s.sample(n) for s in H.pole], 1)
    lag = H.lag.sample(n)
    sx = H.sx
    S_rel = V(ARM_S[0] * sx, ARM_S[1], ARM_S[2] - CZ0)
    rest_rel = V(ARM_W[0] * sx, ARM_W[1], ARM_W[2] - CZ0)
    # dinlenme noktasının dünya konumu → yay gecikmesi
    world = np.zeros((n, 3))
    Rs = []
    for f in range(n):
        R = rb(B['roll'][f], B['yaw'][f], B['pit'][f]); Rs.append(R)
        world[f] = B['c'][f] + R @ rest_rel
    filt = spring_follow(world, w=9.0, z=0.28)
    lagw = filt - world
    out_pos = np.zeros((n, 3)); out_R = np.zeros((n, 3, 3)); out_pole = np.zeros((n, 3))
    D0m = np.stack([HAND_D0 * np.array([sx, 1, 1]), HAND_N0 * np.array([sx, 1, 1])], 1)
    d0 = HAND_D0 * np.array([sx, 1, 1]); n0 = HAND_N0 * np.array([sx, 1, 1])
    D0M = np.stack([d0, n0, np.cross(d0, n0)], 1)
    for f in range(n):
        R = Rs[f]
        p = pos[f] + lag[f] * (R.T @ lagw[f])
        # erişim sınırı
        v = p - S_rel; L_ = np.linalg.norm(v)
        if L_ > ARM_REACH: p = S_rel + v * (ARM_REACH / L_)
        out_pos[f] = p
        fdv = norm(fd[f]); pdv = pd[f] - fdv * np.dot(pd[f], fdv); pdv = norm(pdv)
        Fm = np.stack([fdv, pdv, np.cross(fdv, pdv)], 1)
        out_R[f] = Fm @ D0M.T
        out_pole[f] = pole[f]
    return dict(pos=out_pos, R=out_R, pole=out_pole, curl=H.curl.sample(n), spread=H.spread.sample(n), thumb=H.thumb.sample(n))

def foot_arrays(B, sx):
    n = N
    rel = V(ANK[0] * sx, 0.0, ANK_Z - CZ0)
    hip_rel = V(HIP[0] * sx, 0.0, HIP[2] - CZ0)
    world = np.zeros((n, 3)); hipw = np.zeros((n, 3))
    for f in range(n):
        R = rb(B['roll'][f], B['yaw'][f], B['pit'][f])
        world[f] = B['c'][f] + R @ rel
        hipw[f] = B['c'][f] + R @ hip_rel
    filt = spring_follow(world, w=7.5, z=0.3)
    free = filt.copy()
    # havada dursun: hipten uzaklık sınırı
    for f in range(n):
        v = free[f] - hipw[f]; L_ = np.linalg.norm(v)
        if L_ > LEG_REACH: free[f] = hipw[f] + v * (LEG_REACH / L_)
    L = B['L']
    out = free.copy()
    # yere değme: iniş anına kadar serbest; sonra sabitlen
    R_L = rb(B['roll'][L], B['yaw'][L], B['pit'][L])
    plant = (B['c'][L] + R_L @ rel).copy()
    plant[2] = ANK_Z
    yaw_f = np.zeros(n)
    pitch_f = np.zeros(n)
    for f in range(n):
        if f < L:
            out[f, 2] = max(free[f, 2], ANK_Z)
        else:
            out[f] = plant
            # kalkış (hop) sırasında ayaklar vücutla gelir
            fz = free[f, 2]
            out[f, 2] = max(ANK_Z, fz)
        h = out[f, 2] - ANK_Z
        pitch_f[f] = math.radians(58) * float(smoothstep(h / 0.30))
    return dict(pos=out, yaw=yaw_f, pitch=pitch_f, hip=hipw)

# ------------------------------------------------------------------ yüz
def face_sigs(L):
    S = {k: Sig(v) for k, v in dict(lid=0.0, lid_tilt=0.0, brow_y=0.0, brow_tilt=0.0, brow_arch=0.0, brow_vee=0.0,
                                    look_x=0.0, look_y=0.0, iris_size=1.0, pupil_size=1.0,
                                    mouth_smile=0.0, mouth_dot=0.0, mouth_oval=0.0).items()}
    def K(name, seq, mode='p'):
        S[name].keys(seq, mode)
    K('lid', [(0, -1.0), (26, -1.0, 'e'), (31, -0.55, 'e'), (35, -0.3), (38, -1.0, 'e'), (46, -1.0, 'e'), (50, -0.3, 'e'), (54, -0.2),
              (56, 0.35, 'e'), (66, 0.35, 'e'), (70, -0.2, 'e'), (74, -0.6), (84, -0.6), (88, -0.1), (98, 1.0, 'o'),
              (L - 1, 1.0), (L + 1, -1.0, 'l'), (L + 9, -1.0, 'e'), (L + 14, -0.35, 'e'), (L + 24, -0.2), (L + 32, -0.4, 'e'),
              (L + 40, -0.55, 'e'), (L + 46, 0.3, 'e'), (L + 54, 0.0, 'e'), (L + 70, 0.1), (L + 88, -0.1), (L + 100, 0.2, 'e'),
              (L + 110, 0.5), (L + 118, 0.0, 'e'), (L + 150, 0.05), (L + 176, -0.2, 'e'), (L + 190, -0.1)])
    K('lid_tilt', [(0, 0.0), (68, 0.0, 'e'), (74, -0.6, 'e'), (88, -0.6, 'e'), (98, 0.0), (L + 40, 0.4, 'e'), (L + 47, 0.0)])
    K('brow_y', [(0, 0.0), (52, 0.0, 'e'), (57, 0.09, 'e'), (66, 0.09, 'e'), (71, -0.02), (90, -0.02), (100, 0.13),
                 (L, 0.13), (L + 3, -0.03), (L + 16, 0.0), (L + 22, 0.07, 'e'), (L + 30, 0.07, 'e'), (L + 36, -0.03, 'e'),
                 (L + 46, 0.11), (L + 52, 0.0), (L + 56, 0.04), (L + 80, 0.03), (L + 95, 0.0), (L + 106, 0.12), (L + 118, 0.0),
                 (L + 130, 0.05), (L + 170, 0.05), (L + 185, 0.0)])
    K('brow_arch', [(0, 0.0), (36, 0.0), (40, 0.6), (46, 0.0), (98, 0.0), (102, 1.0), (L, 1.0), (L + 4, 0.0), (L + 46, 0.0), (L + 50, 0.5), (L + 94, 0.4), (L + 108, 1.0), (L + 120, 0.0)])
    K('brow_vee', [(0, 0.0), (68, 0.0, 'e'), (74, 0.9, 'e'), (88, 0.9), (98, 0.0), (L + 40, 0.6, 'e'), (L + 47, 0.0)])
    K('brow_tilt', [(0, 0.0), (L + 18, 0.0), (L + 26, 6.0, 'e'), (L + 36, 0.0, 'e'), (L + 84, 0.0), (L + 94, -5.0, 'e'), (L + 108, 0.0)])
    K('look_x', [(0, 0.0), (30, -0.10, 'e'), (40, -0.10), (50, 0.12, 'e'), (56, 0.0, 'e'), (70, 0.0, 'e'), (74, 0.0),
                 (L + 8, 0.0), (L + 14, 0.10), (L + 20, -0.12, 'e'), (L + 30, -0.12, 'e'), (L + 38, 0.0, 'e'), (L + 52, 0.0),
                 (L + 58, -0.14, 'e'), (L + 84, -0.14, 'e'), (L + 92, 0.0, 'e'), (L + 130, 0.0), (L + 136, 0.08, 'e'), (L + 156, 0.0)])
    K('look_y', [(0, 0.0), (50, 0.0), (56, -0.055, 'e'), (66, -0.055, 'e'), (72, 0.0, 'e'), (L + 14, 0.0), (L + 20, 0.05, 'e'), (L + 30, 0.05, 'e'), (L + 38, 0.0, 'e'),
                 (L + 84, 0.0), (L + 96, 0.02), (L + 110, 0.0)])
    K('iris_size', [(0, 1.0), (52, 1.0), (57, 0.82, 'e'), (66, 0.82, 'e'), (72, 1.0, 'e'), (98, 1.0), (101, 0.6, 'o'), (L, 0.6), (L + 3, 1.0),
                    (L + 47, 1.0), (L + 51, 0.85, 'e'), (L + 62, 1.0, 'e'), (L + 106, 1.0), (L + 109, 0.8, 'e'), (L + 116, 1.0, 'e')])
    K('pupil_size', [(0, 1.0), (52, 1.0), (57, 1.15, 'e'), (66, 1.15, 'e'), (72, 1.0, 'e'), (98, 1.0), (101, 0.75, 'o'), (L, 0.75), (L + 6, 1.0)])
    S['mouth_oval'].keys([(0, 0.0), (2, 0.15), (10, 0.02), (20, 0.15), (28, 0.02), (32, 0.0), (34, 0.0, 'e'), (40, 1.0, 'e'), (46, 1.0, 'e'), (50, 0.0, 'e'),
                          (70, 0.0), (76, 0.45), (80, 0.1), (85, 0.55), (89, 0.05), (99, 1.0), (L, 1.0), (L + 2, 0.55), (L + 10, 0.0),
                          (L + 34, 0.0), (L + 37, 0.6, 'e'), (L + 45, 0.0, 'e'), (L + 105, 0.0), (L + 108, 0.5, 'e'), (L + 116, 0.0, 'e')])
    S['mouth_dot'].keys([(0, 0.0), (54, 0.0), (58, 1.0, 'e'), (66, 1.0, 'e'), (70, 0.0, 'e'), (L + 50, 0.0), (L + 53, 0.6, 'e'), (L + 62, 0.0, 'e')])
    S['mouth_smile'].keys([(0, 0.0), (L + 58, 0.0), (L + 66, 1.0, 'e'), (L + 96, 1.0), (L + 100, 0.6, 'e'), (L + 104, 1.0, 'e'), (L + 150, 1.0), (L + 176, 0.7, 'e'), (L + 195, 0.7)])
    return S

def blink(sig_lid, frames):
    for f in frames:
        pass

# ------------------------------------------------------------------ kamera
def camera_sigs(L):
    C = {'x': Sig(), 'y': Sig(), 'z': Sig(), 'tx': Sig(), 'ty': Sig(), 'tz': Sig(), 'lens': Sig(45.0)}
    X = env.CHAR_X
    P = [  # frame, pos, target
        (0,      (X + 0.7, -7.9, 2.35),  (X, 0.0, 2.2)),
        (56,     (X + 0.5, -7.5, 2.30),  (X, 0.0, 2.2)),
        (88,     (X + 0.3, -7.2, 2.25),  (X, -0.3, 2.15)),
        (L + 2,  (X + 0.3, -7.2, 1.75),  (X, -0.5, 1.4)),
        (L + 40, (X + 0.6, -7.2, 1.55),  (X - 0.05, -0.5, 1.30)),
        (L + 54, (X + 0.3, -7.6, 1.65),  (X - 0.6, -0.4, 1.35)),
        (L + 80, (1.4, -10.9, 1.95),  (0.5, -0.3, 1.42)),
        (L + 130, (1.3, -10.4, 1.90),  (0.5, -0.3, 1.42)),
        (N - 1,  (1.2, -9.9, 1.85),  (0.5, -0.3, 1.44)),
    ]
    for f, p, t in P:
        for i, k in enumerate('xyz'): C[k].key(f, p[i], 'p')
        for i, k in enumerate(('tx', 'ty', 'tz')): C[k].key(f, t[i], 'p')
    return C

# ------------------------------------------------------------------ toplu üretim
def build_all():
    B = body_track()
    L = B['L']
    HR = HandSig(-1.0)   # char'ın sağ eli (−x)
    HL_ = HandSig(1.0)   # sol el (+x)
    # --- sağ el (−x): "ta-da"
    HR.key(L + 34, **HR.rest())
    HR.key(L + 44, pos=V(-0.72, -0.10, 0.25), fd=V(-0.15, -0.1, 1.0), pd=V(0.1, -1.0, 0.0), lag=0.0, curl=0.05, spread=0.6, thumb=0.0)
    HR.key(L + 53, pos=V(-1.0, -0.55, -0.02), fd=V(-0.85, -0.2, 0.45), pd=V(0.25, -0.55, 0.8), curl=0.08, spread=0.9, thumb=0.0, lag=0.0)
    HR.key(L + 72, pos=V(-1.0, -0.5, 0.06), fd=V(-0.85, -0.15, 0.5), pd=V(0.25, -0.55, 0.8), curl=0.10, spread=0.75, thumb=0.05, lag=0.0)
    HR.key(L + 90, pos=V(-1.0, -0.55, -0.02), fd=V(-0.85, -0.2, 0.45), pd=V(0.25, -0.55, 0.8), curl=0.1, spread=0.7, thumb=0.1, lag=0.0)
    HR.key(L + 100, pos=V(-0.8, -0.2, -0.45), fd=V(-0.2, -0.1, -1.0), pd=V(0.98, 0, -0.15), lag=0.3, curl=0.28, spread=0.0, thumb=0.3)
    HR.key(L + 105, pos=V(-0.75, -0.25, -0.35), fd=V(-0.2, -0.1, -1.0), pd=V(0.98, 0, -0.15), lag=0.3)
    HR.key(L + 109, pos=V(-0.85, -0.22, 0.28), fd=V(-0.35, 0.0, 1.0), pd=V(0.1, -1.0, 0.0), lag=0.0, curl=0.05, spread=1.0, thumb=0.0)
    HR.key(L + 116, pos=V(-0.7, -0.15, -0.5), fd=V(-0.1, 0, -1.0), pd=V(0.98, 0, -0.15), lag=0.7, curl=0.28, spread=0.0, thumb=0.3)
    HR.key(L + 126, **HR.rest())
    for i, v in enumerate((-0.745, 0.58, -0.5)):
        HR.pole[i].key(L + 36, v)
    for i, v in enumerate((-0.95, 0.35, -0.9)):
        HR.pole[i].key(L + 46, v); HR.pole[i].key(L + 92, v)
    for i, v in enumerate((-0.745, 0.58, -0.5)):
        HR.pole[i].key(L + 102, v)
    for i, v in enumerate((-0.95, 0.35, -0.6)):
        HR.pole[i].key(L + 109, v)
    for i, v in enumerate((-0.745, 0.58, -0.5)):
        HR.pole[i].key(L + 120, v)
    # --- sol el (+x): zıplama + el sallama
    HL_.key(L + 100, **HL_.rest())
    HL_.key(L + 105, pos=V(0.75, -0.25, -0.35), fd=V(0.2, -0.1, -1.0), pd=V(-0.98, 0, -0.15), lag=0.3, curl=0.28)
    HL_.key(L + 109, pos=V(0.85, -0.22, 0.28), fd=V(0.35, 0.0, 1.0), pd=V(-0.1, -1.0, 0.0), lag=0.0, curl=0.05, spread=1.0, thumb=0.0)
    HL_.key(L + 116, pos=V(0.72, -0.28, -0.20), fd=V(0.1, -0.05, -1.0), pd=V(-0.98, 0, -0.15), lag=0.5, curl=0.28, spread=0.0, thumb=0.3)
    HL_.key(L + 126, pos=V(0.80, -0.28, 0.14), fd=V(0.15, -0.05, 1.0), pd=V(0.0, -1.0, 0.0), lag=0.0, curl=0.05, spread=0.8, thumb=0.0)
    for i in range(9):
        f = L + 130 + 5 * i
        a = 26 * (1 if i % 2 == 0 else -1)
        HL_.key(f, fd=V(0.15 + math.sin(math.radians(a)), -0.05, math.cos(math.radians(a))), pd=V(0.0, -1.0, 0.0), lag=0.0, mode='p')
    HL_.key(L + 172, pos=V(0.80, -0.28, 0.14), fd=V(0.15, -0.05, 1.0), pd=V(0.0, -1.0, 0.0), lag=0.0)
    HL_.key(L + 186, **HL_.rest())
    for i, v in enumerate((0.745, 0.58, -0.5)):
        HL_.pole[i].key(L + 100, v)
    for i, v in enumerate((0.95, 0.35, -0.6)):
        HL_.pole[i].key(L + 109, v)
    for i, v in enumerate((0.745, 0.58, -0.5)):
        HL_.pole[i].key(L + 116, v)
    for i, v in enumerate((0.95, 0.4, -0.9)):
        HL_.pole[i].key(L + 126, v); HL_.pole[i].key(L + 174, v)
    for i, v in enumerate((0.745, 0.58, -0.5)):
        HL_.pole[i].key(L + 186, v)
    ha_R = hand_arrays(HR, B); ha_L = hand_arrays(HL_, B)
    fa_R = foot_arrays(B, -1.0); fa_L = foot_arrays(B, 1.0)
    F = face_sigs(L)
    face = {k: s.sample(N) for k, s in F.items()}
    # blink ekle (uyanık iken)
    def do_blink(f0, dur=5):
        for i in range(dur):
            f = f0 + i
            if f >= N: break
            k = math.sin(math.pi * (i + 0.5) / dur)
            face['lid'][f] = face['lid'][f] * (1 - k) + (-1.0) * k
    for fb in (L + 27, L + 66, L + 98, L + 148, L + 168, L + 180):
        do_blink(fb)
    C = camera_sigs(L)
    cam = {k: s.sample(N) for k, s in C.items()}
    # iniş kamera sarsıntısı
    rng = np.random.RandomState(4)
    for i in range(14):
        f = L + i
        a = 0.05 * math.exp(-i / 4.0)
        for k in ('x', 'z', 'tx', 'tz'):
            cam[k][f] += a * rng.randn()
    return dict(B=B, HR=ha_R, HL=ha_L, FR=fa_R, FL=fa_L, face=face, cam=cam, L=L)
