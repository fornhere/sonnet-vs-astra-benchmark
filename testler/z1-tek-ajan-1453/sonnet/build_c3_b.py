# --- C3 bölüm 2: evler, ağaçlar, zemin, gemiler, yol, duman, ışık, gökyüzü, deniz ---
KEEP = [(-588, -824, 340), (-430, -400, 200), (-GT[0] * -1, GT[1], 70), (-1250, -1170, 330), (-2290, 290, 80), (-3000, 430, 80),
        (-1260, -1420, 80), (-1700, -780, 80), (-2200, -520, 80), (-3350, -350, 80), (float(ZA[0]), float(ZA[1]), 60), (float(ZBp[0]), float(ZBp[1]), 60)]
def free(x, y):
    return all(math.hypot(x - a, y - b) > r for a, b, r in KEEP)
def slope(x, y, d=12):
    return abs(gz(x + d, y) - gz(x - d, y)) + abs(gz(x, y + d) - gz(x, y - d))

HB = MB(); TB = MB(); houses = []
ROOFS = ['kiremit1', 'kiremit2', 'kiremit3']
def ev(x, y, ruin_p=0.22, sz=1.0):
    z = site_z(x, y, 8)
    rot = random.choice([0.35, 0.6, 1.0, -0.2, 0.0]) + random.uniform(-0.25, 0.25)
    w, d = random.uniform(16, 27) * sz, random.uniform(11, 18) * sz
    if random.random() < ruin_p:
        box(HB, 'harabe', x, y, z - 4, w, d, 4 + random.uniform(0, 4), rot)
        if random.random() < 0.5: box(HB, 'harabe', x + 4, y + 3, z - 4, 4, 4, 9, rot)
    else:
        h = random.uniform(6, 9)
        gable(HB, random.choice(['duvar1', 'duvar2']), random.choice(ROOFS), x, y, z - 4, w, d, h + 4, random.uniform(4, 6.5), rot)
    houses.append((x, y))
def cluster(cx, cy, r, cnt, ruin_p=0.22, sz=1.0):
    k = 0; tries = 0
    while k < cnt and tries < cnt * 12:
        tries += 1
        a = random.uniform(0, 6.283); rr = r * math.sqrt(random.random())
        x, y = cx + rr * math.cos(a), cy + rr * math.sin(a)
        if land(x, y, 6) and free(x, y) and slope(x, y) < 22 and not (x < -4300):
            ev(x, y, ruin_p, sz); k += 1
# Ayasofya çevresi, kıyı şeritleri, yamaçlar (seyrek, harap)
for (cx, cy, r, c) in [(-760, -560, 260, 55), (-1350, -900, 300, 55), (-1500, -300, 330, 70), (-2000, -100, 400, 70), (-2500, 100, 400, 60),
                       (-3100, 100, 450, 60), (-3600, -100, 400, 50), (-2200, -900, 450, 50), (-3000, -1100, 500, 45), (-1700, -1350, 300, 35),
                       (-1000, -400, 250, 30), (-300, -350, 240, 25), (-2700, -600, 350, 40)]:
    cluster(cx, cy, r, c, 0.25)
# Galata (surların içi, daha sık)
tries = 0; kc = 0
wl = np.array(land_wall)
while kc < 300 and tries < 6000:
    tries += 1
    x, y = random.uniform(-1820, -380), random.uniform(560, 1350)
    ylim = np.interp(x, wl[:, 0], wl[:, 1])
    if y < ylim - 35 and land(x, y, 5) and free(x, y) and slope(x, y) < 30:
        ev(x, y, 0.08, 0.95); kc += 1
# kuzey yamaçlar, Kasımpaşa/Pera, Üsküdar (çok seyrek)
for (cx, cy, r, c) in [(-2000, 1900, 400, 22), (-800, 1900, 500, 24), (400, 2400, 500, 18), (2400, -500, 350, 20), (2900, -1200, 350, 16),
                       (2300, 500, 350, 16), (2700, 1300, 350, 14), (3200, 200, 250, 10), (-2900, 1300, 300, 14)]:
    cluster(cx, cy, r, c, 0.12)
HB.build('C3_Evler')
print('evler', len(houses))

# ağaçlar (selvi + zeytin/çam kümeleri), bahçe öbekleri
cnt = 0; tries = 0
hs = houses
while cnt < 1400 and tries < 9000:
    tries += 1
    if random.random() < 0.55 and hs:
        hx, hy = random.choice(hs); x, y = hx + random.gauss(0, 45), hy + random.gauss(0, 45)
    else:
        x, y = random.uniform(-4200, 3500), random.uniform(-2100, 3100)
    if land(x, y, 5) and free(x, y) and slope(x, y) < 40:
        z = gz(x, y) - 1
        if random.random() < 0.45:
            cone(TB, 'agac', x, y, z, random.uniform(3.0, 4.2), random.uniform(20, 32), n=5)
        else:
            r = random.uniform(6, 10); cone(TB, random.choice(['agac', 'agac2']), x, y, z, r, r * 1.5, n=6)
        cnt += 1
TB.build('C3_Agaclar')

# ------------------------------------------------------------ zemin örtüsü (kit arazisinin ustune boyalı katman)
def grid_noise(fx, fy, ph):
    return (np.sin(X / fx + ph) * np.cos(Y / fy + ph * 1.7) + 0.6 * np.sin((X + Y) / (fx * 0.4) + ph * 2.3) + 0.35 * np.cos(X / (fx * 0.23) - Y / (fy * 0.31) + ph))
nz = grid_noise(240, 200, 0.5); nz = (nz - nz.min()) / (nz.max() - nz.min())
nz2 = grid_noise(90, 110, 2.1); nz2 = (nz2 - nz2.min()) / (nz2.max() - nz2.min())
gy_, gx_ = np.gradient(Z, 21.6); sl = np.clip(np.hypot(gx_, gy_) / 0.9, 0, 1)
den = np.zeros_like(Z)
if houses:
    hp = np.array(houses)
    ix = np.clip(((hp[:, 0] - X[0, 0]) / (X[0, -1] - X[0, 0]) * (nx - 1)).astype(int), 0, nx - 1)
    iy = np.clip(((hp[:, 1] - Y[0, 0]) / (Y[-1, 0] - Y[0, 0]) * (ny - 1)).astype(int), 0, ny - 1)
    np.add.at(den, (iy, ix), 1.0)
    for _ in range(9):
        den = (den + np.roll(den, 1, 0) + np.roll(den, -1, 0) + np.roll(den, 1, 1) + np.roll(den, -1, 1)) / 5
    den = np.clip(den / max(den.max() * 0.35, 1e-6), 0, 1)
col = np.zeros(Z.shape + (4,))
dry = np.array([0.66, 0.58, 0.30]); green = np.array([0.27, 0.40, 0.15]); earth = np.array([0.52, 0.38, 0.24])
rock = np.array([0.50, 0.46, 0.40]); scrub = np.array([0.20, 0.27, 0.12]); dust = np.array([0.58, 0.50, 0.38]); ochre = np.array([0.72, 0.55, 0.28])
base = dry[None, None] * (1 - nz[..., None]) + green[None, None] * nz[..., None]
base = base * (1 - 0.35 * nz2[..., None]) + scrub[None, None] * 0.35 * nz2[..., None]
fld = ((nz2 > 0.62) & (nz > 0.35))[..., None]
base = np.where(fld, base * 0.4 + ochre[None, None] * 0.6, base)
base = base * (1 - sl[..., None] * 0.6) + rock[None, None] * sl[..., None] * 0.6
base = base * (1 - den[..., None] * 0.65) + dust[None, None] * den[..., None] * 0.65
col[..., :3] = base
col[..., 3] = np.clip((Z - 0.8) / 7.0, 0, 1) * 0.92
verts = [(float(X[i, j]), float(Y[i, j]), float(Z[i, j]) + 0.9) for i in range(ny) for j in range(nx)]
fcs = []
for i in range(ny - 1):
    for j in range(nx - 1):
        a = i * nx + j
        if Z[i, j] > SEA - 1 or Z[i, j + 1] > SEA - 1 or Z[i + 1, j] > SEA - 1 or Z[i + 1, j + 1] > SEA - 1:
            fcs.append((a, a + 1, a + nx + 1, a + nx))
ov = bpy.data.meshes.new('C3_Ortu'); ov.from_pydata(verts, [], fcs); ov.update()
for p in ov.polygons: p.use_smooth = True
ca = ov.color_attributes.new('col', 'FLOAT_COLOR', 'POINT'); ca.data.foreach_set('color', col.reshape(-1))
ov.materials.append(mat('ortu', (0.5, 0.5, 0.4), 0.95, vcol='col'))
ovo = bpy.data.objects.new('C3_Ortu', ov); COL.objects.link(ovo)

# ------------------------------------------------------------ gemiler (Osmanlı kadırga/fusta, insansız, sancaksız)
def gemi_mb(L, Bm, masts=2, K=4.6, oars=True):
    b = MB(); n = 16
    secs = []
    for i in range(n + 1):
        t = i / n; u = (t - 0.5) * L
        w = max(Bm / 2 * (1 - abs(2 * t - 1) ** 3.2) ** 0.7, 0.35)
        hh = 2.2 + 3.2 * abs(2 * t - 1) ** 3
        secs.append((u, w, hh))
    vs = []
    for (u, w, hh) in secs:
        vs += [(u, -w, hh), (u, -w * 0.55, -1.8), (u, w * 0.55, -1.8), (u, w, hh)]
    vs = [(x * K, y * K, z * K) for x, y, z in vs]
    fs_h = []; fs_d = []
    for i in range(n):
        a = i * 4; c = a + 4
        fs_h += [(a, c, c + 1, a + 1), (a + 1, c + 1, c + 2, a + 2), (a + 2, c + 2, c + 3, a + 3)]
        fs_d.append((a, a + 3, c + 3, c))
    b.add('ahsap', vs, fs_h); b.add('gemi_guverte', vs, fs_d)
    for mi, (mu, mh) in enumerate([(0.08, 15), (-0.30, 11)][:masts]):
        u = mu * L
        box(b, 'ahsap', u * K, 0, 2 * K, 0.6 * K, 0.6 * K, mh * K * 0.8)
        # lateen yelken (üçgen, iki yüzlü)
        p = [((u + 0.36 * L) * K, 0, (3.2) * K), ((u - 0.10 * L) * K, 0.0, (mh + 3) * K), ((u - 0.30 * L) * K, 0, (3.8) * K)]
        p2 = [(x, y + 0.9 * K, z) for x, y, z in p]
        b.add('yelken', p + [(x, y - 0.9 * K, z) for x, y, z in p], [(0, 1, 2), (3, 5, 4)])
        # yelken direği (yard)
        b.add('ahsap_a', [(p[0][0], 0.0, p[0][2] - 0.2 * K), (p[1][0], 0.0, p[1][2]), (p[1][0], 0.4 * K, p[1][2]), (p[0][0], 0.4 * K, p[0][2] - 0.2 * K)], [(0, 1, 2, 3)])
    if oars:
        for i in range(-6, 7):
            u = i * L * 0.052
            for s_ in (-1, 1):
                w = Bm / 2 * (1 - abs(u / (L / 2)) ** 3.2) ** 0.7 if abs(u) < L / 2 else 1
                y0, y1 = s_ * w * K, s_ * (w + 7.5) * K
                b.add('ahsap_a', [((u - 0.3) * K, y0, 3.2 * K), ((u + 0.3) * K, y0, 3.2 * K), ((u + 0.3) * K, y1, -0.9 * K), ((u - 0.3) * K, y1, -0.9 * K)], [(0, 1, 2, 3), (3, 2, 1, 0)])
    return b
VAR = [gemi_mb(31, 5.8, 2).build('C3_gemi_v0', COL), gemi_mb(24, 4.8, 1).build('C3_gemi_v1', COL), gemi_mb(37, 6.6, 2).build('C3_gemi_v2', COL)]
ship_objs = []
def ship_at(x, y, ang, v, z=None, pitch=0.0, name='C3_Gemi', sc_=1.0):
    ob = bpy.data.objects.new(name, VAR[v].data); COL.objects.link(ob); ob.scale = (sc_, sc_, sc_)
    ob.location = (x, y, (SEA + 0.6) if z is None else z); ob.rotation_euler = (0, pitch, ang)
    ship_objs.append(ob); return ob
for o in VAR: o.hide_render = True; o.hide_viewport = True
# Kasımpaşa açığı: kıyıya paralel iki-üç sıra
gr = resample(gal, 46)
cand = [(i, p) for i, p in enumerate(gr) if -3050 < p[0] < -1800 and p[1] > 950]
placed = []
for i, p in cand:
    if i + 1 >= len(gr): continue
    t = gr[i + 1] - gr[i]; ang = math.atan2(t[1], t[0]); nrm = np.array([-t[1], t[0]]) / max(np.hypot(*t), 1e-6)
    if gz(*(p + nrm * 120)) > SEA: nrm = -nrm
    for row, dist in enumerate((95, 200, 305)):
        if random.random() < (0.85 if row < 2 else 0.55):
            q = p + nrm * dist + t / max(np.hypot(*t), 1e-6) * random.uniform(-12, 12)
            if gz(q[0], q[1]) < SEA - 0.8 and all(math.hypot(q[0] - a, q[1] - b) > 95 for a, b in placed):
                placed.append((q[0], q[1])); ship_at(q[0], q[1], ang + random.uniform(-0.07, 0.07), random.choice([0, 0, 1, 2]), sc_=1.55)
print('gemiler', len(placed))
gb = resample(gal, 46)
for i, p in enumerate(gb):
    if not (-150 < p[0] < 1900 and 1250 < p[1] < 2700) or i + 1 >= len(gb): continue
    t = gb[i + 1] - gb[i]; ang = math.atan2(t[1], t[0]); nrm = np.array([-t[1], t[0]]) / max(np.hypot(*t), 1e-6)
    if gz(*(p + nrm * 150)) > SEA: nrm = -nrm
    for dist in (110, 210):
        if random.random() < 0.28:
            q = p + nrm * (dist + random.uniform(-40, 60))
            if gz(q[0], q[1]) < SEA - 0.8 and all(math.hypot(q[0] - a, q[1] - b) > 110 for a, b in placed):
                placed.append((q[0], q[1])); ship_at(q[0], q[1], ang + random.uniform(-0.25, 0.25), random.choice([0, 1, 2]), sc_=1.3)
# Sarayburnu/Haliç ağzı: zincirin arkasında Bizans-Ceneviz gemileri (küçük grup)
zc = (ZA + ZBp) / 2
for k, off in enumerate((-75, -140, -205)):
    for s_ in (-0.5, 0.5):
        q = zc + np.array([off, 0]) + np.array([0, s_ * 140])
        if gz(q[0], q[1]) < SEA - 1: ship_at(q[0], q[1], math.radians(90) + random.uniform(-0.1, 0.1), 2, name='C3_GemiBatiKarsi')

# ------------------------------------------------------------ 22 Nisan: karadan indirilen gemiler (kızak yolu)
S0 = coast_pt(1050, 2100); E0 = coast_pt(-2000, 1620)
print('yol', S0, E0)
path = []
NP = 190
for i in range(NP + 1):
    t = i / NP
    x = S0[0] + (E0[0] - S0[0]) * t + 260 * math.sin(math.pi * t) * 0.6
    y = S0[1] + (E0[1] - S0[1]) * t - 320 * math.sin(math.pi * t)
    path.append((x, y))
YB = MB(); pts = np.array(path); tang = np.gradient(pts, axis=0); tang /= np.hypot(tang[:, 0], tang[:, 1])[:, None]
nr = np.c_[-tang[:, 1], tang[:, 0]]
vv = []
for p, n_ in zip(pts, nr):
    for s_ in (-13, 13):
        q = p + n_ * s_; vv.append((float(q[0]), float(q[1]), gz(q[0], q[1]) + 1.6))
ff = [(2 * i, 2 * i + 1, 2 * i + 3, 2 * i + 2) for i in range(NP)]
YB.add('yol', vv, ff)
# ahşap kızak izleri (iki ray)
for off in (-5, 5):
    vv = []
    for p, n_ in zip(pts, nr):
        for s_ in (off - 1.3, off + 1.3):
            q = p + n_ * s_; vv.append((float(q[0]), float(q[1]), gz(q[0], q[1]) + 2.4))
    YB.add('ahsap', vv, [(2 * i, 2 * i + 1, 2 * i + 3, 2 * i + 2) for i in range(NP)])
YB.build('C3_KizakYolu')
for fr, v in ((0.30, 1), (0.47, 0), (0.64, 2)):
    i = int(NP * fr); p = pts[i]; a = math.atan2(tang[i][1], tang[i][0])
    dz = gz(*(pts[i + 3])) - gz(*(pts[i - 3])); pitch = -math.atan2(dz, math.dist(pts[i + 3], pts[i - 3]))
    ship_at(p[0], p[1], a, v, z=gz(p[0], p[1]) + 5.0, pitch=pitch * 0.9, name='C3_GemiKarada')

# ------------------------------------------------------------ duman (pamuk-maket bulutu)
def smoke_mats():
    ms = []
    for k in range(5):
        t = k / 4
        col_ = (0.04 + 0.20 * t, 0.035 + 0.16 * t, 0.035 + 0.14 * t)
        m = mat('duman%d' % k, col_, 1.0, emit=(1.0, 0.55, 0.28), estr=0.02 + 0.22 * t * t, alpha=0.55 - 0.18 * t)
        ms.append(m)
    return ms
SM = smoke_mats()
ico = bmesh.new(); bmesh.ops.create_icosphere(ico, subdivisions=2, radius=1.0)
smoke_meshes = []
for k in range(5):
    me = bpy.data.meshes.new('C3_puf%d' % k); ico.to_mesh(me); me.materials.append(SM[k])
    for p in me.polygons: p.use_smooth = True
    smoke_meshes.append(me)
plumes = []
def plume(x, y, height=900, lean=(0.62, 0.78), r0=16, dark=1.0, nn=26, wisp=False):
    z0 = gz(x, y)
    root = bpy.data.objects.new('C3_DumanKok', None); COL.objects.link(root); root.location = (x, y, z0)
    for i in range(nn):
        t = i / (nn - 1); jit = random.uniform(-0.35, 0.35)
        r = (r0 + t * (r0 * 3.4)) * random.uniform(0.85, 1.2) * (0.6 if wisp else 1.0)
        px = lean[0] * (t ** 1.7) * height * 0.55 + random.gauss(0, r * 0.35) + math.sin(t * 6) * 18
        py = lean[1] * (t ** 1.7) * height * 0.55 + random.gauss(0, r * 0.35)
        pz = t * height + r * 0.3
        kk = min(4, max(0, int((t * 4.2 + random.uniform(-0.6, 0.6)) if not wisp else 3 + random.random())))
        if dark < 1: kk = min(4, kk + 2)
        ob = bpy.data.objects.new('C3_Puf', smoke_meshes[kk]); COL.objects.link(ob)
        ob.parent = root; ob.location = (px, py, pz); ob.scale = (r, r * random.uniform(0.85, 1.2), r * random.uniform(0.75, 1.0))
        ob.rotation_euler = (random.random() * 3, random.random() * 3, random.random() * 3)
        ob.visible_shadow = True
        s0 = ob.scale.copy()
        ob.scale = s0 * 0.7; ob.keyframe_insert('scale', frame=FA)
        ob.scale = s0 * 1.08; ob.keyframe_insert('scale', frame=FB)
    root.rotation_euler = (0, 0, 0); root.keyframe_insert('rotation_euler', frame=FA)
    root.rotation_euler = (0.03, -0.03, 0.1); root.keyframe_insert('rotation_euler', frame=FB)
    plumes.append(root)
def find_land(x, y):
    for r in range(0, 400, 25):
        for a in np.linspace(0, 6.28, 12):
            q = (x + r * math.cos(a), y + r * math.sin(a))
            if land(q[0], q[1], 8): return q
    return (x, y)
for (x, y, h, d, wsp) in [(-3600, 380, 1100, 1.0, False), (-3050, -150, 800, 1.0, False), (-2450, 850, 700, 1.0, False), (-3400, -800, 650, 0.5, False),
                          (-1800, 250, 420, 0.5, True), (-1900, 1750, 380, 0.5, True), (-900, 1750, 360, 0.5, True), (2450, -450, 380, 0.5, True)]:
    x, y = find_land(x, y); plume(x, y, h * 0.62, dark=d, wisp=wsp, r0=(20 if not wsp else 12), nn=(40 if not wsp else 16))

# ------------------------------------------------------------ sabah sisi (düşük, sıcak, alfa-gürültülü düzlemler)
sm_ = bpy.data.materials.new('C3_Sis'); sm_.use_nodes = True; nt = sm_.node_tree; b_ = nt.nodes['Principled BSDF']
b_.inputs['Base Color'].default_value = (1.0, 0.80, 0.68, 1); b_.inputs['Roughness'].default_value = 1.0
b_.inputs['Emission Color'].default_value = (1.0, 0.68, 0.48, 1); b_.inputs['Emission Strength'].default_value = 0.55
tcs = nt.nodes.new('ShaderNodeTexCoord'); nzs = nt.nodes.new('ShaderNodeTexNoise'); nzs.inputs['Scale'].default_value = 3.2; nzs.inputs['Detail'].default_value = 4
rs = nt.nodes.new('ShaderNodeValToRGB'); rs.color_ramp.elements[0].position = 0.42; rs.color_ramp.elements[1].position = 0.75; rs.color_ramp.elements[1].color = (0.30, 0.30, 0.30, 1)
edge = nt.nodes.new('ShaderNodeTexGradient'); edge.gradient_type = 'SPHERICAL'
mm = nt.nodes.new('ShaderNodeMapping'); mm.inputs['Location'].default_value = (-1, -1, 0); mm.inputs['Scale'].default_value = (2, 2, 2)
nt.links.new(tcs.outputs['UV'], mm.inputs['Vector']); nt.links.new(mm.outputs['Vector'], edge.inputs['Vector'])
inv = nt.nodes.new('ShaderNodeMath'); inv.operation = 'SUBTRACT'; inv.inputs[0].default_value = 1.0; nt.links.new(edge.outputs['Fac'], inv.inputs[1])
mm2 = nt.nodes.new('ShaderNodeMath'); mm2.operation = 'MULTIPLY'; mm2.use_clamp = True
nt.links.new(tcs.outputs['Object'], nzs.inputs['Vector']); nt.links.new(nzs.outputs['Fac'], rs.inputs['Fac'])
nt.links.new(rs.outputs['Color'], mm2.inputs[0]); nt.links.new(edge.outputs['Fac'], mm2.inputs[1]); nt.links.new(mm2.outputs[0], b_.inputs['Alpha'])
def sis(x, y, z, sx, sy, rot):
    bpy.ops.mesh.primitive_plane_add(size=1, location=(x, y, z)); o = bpy.context.active_object; o.name = 'C3_Sis'
    for c in list(o.users_collection): c.objects.unlink(o)
    COL.objects.link(o); o.scale = (sx, sy, 1); o.rotation_euler = (0, 0, rot); o.data.materials.append(sm_)
    o.visible_shadow = False; o.visible_glossy = False
grh = resample(gal, 260)
for i, p in enumerate(grh):
    if -3000 < p[0] < -1500 and p[1] > 900 and i + 1 < len(grh):
        t = grh[i + 1] - grh[i]; nrm = np.array([-t[1], t[0]]) / max(np.hypot(*t), 1e-6)
        if gz(*(p + nrm * 130)) > SEA: nrm = -nrm
        q = p + nrm * 130; sis(q[0], q[1], random.uniform(16, 30), 620, 300, math.atan2(t[1], t[0]))
for (x, y, sx, sy) in [(-500, -1650, 1500, 600), (900, -500, 1300, 600), (1300, 1500, 1100, 500)]:
    sis(x, y, random.uniform(12, 22), sx, sy, random.uniform(-0.6, 0.6))

# ------------------------------------------------------------ deniz (kit denizinin ustunde: şafak gökyüzünü yansıtan)
xmin, xmax, ymin, ymax = V0[:, 0].min(), V0[:, 0].max(), V0[:, 1].min(), V0[:, 1].max()
bpy.ops.mesh.primitive_plane_add(size=1, location=((xmin + xmax) / 2, (ymin + ymax) / 2, 1.05))
sea = bpy.context.active_object; sea.name = 'C3_Deniz'; sea.scale = ((xmax - xmin) * 0.998, (ymax - ymin) * 0.998, 1)
for c in list(sea.users_collection): c.objects.unlink(sea)
COL.objects.link(sea)
sm = bpy.data.materials.new('C3_DenizM'); sm.use_nodes = True; nt = sm.node_tree
for nd in list(nt.nodes): nt.nodes.remove(nd)
out = nt.nodes.new('ShaderNodeOutputMaterial'); bs = nt.nodes.new('ShaderNodeBsdfPrincipled')
tc = nt.nodes.new('ShaderNodeTexCoord'); mp = nt.nodes.new('ShaderNodeMapping'); nz_ = nt.nodes.new('ShaderNodeTexNoise')
nz_.inputs['Scale'].default_value = 0.012; nz_.inputs['Detail'].default_value = 3
nt.links.new(tc.outputs['Object'], mp.inputs['Vector']); nt.links.new(mp.outputs['Vector'], nz_.inputs['Vector'])
mp.inputs['Scale'].default_value = (1, 1, 1)
drv = mp.inputs['Location'].driver_add('default_value', 0); drv.driver.type = 'SCRIPTED'; drv.driver.expression = 'frame*0.0035'
bump = nt.nodes.new('ShaderNodeBump'); bump.inputs['Strength'].default_value = 0.22; bump.inputs['Distance'].default_value = 40
nt.links.new(nz_.outputs['Fac'], bump.inputs['Height']); nt.links.new(bump.outputs['Normal'], bs.inputs['Normal'])
# derinlik rengi (kıyıda açık zümrüt-turkuaz, açıkta koyu lacivert): arazi yüksekliğinden değil, mesafeden: basit gradyan
bs.inputs['Base Color'].default_value = (0.010, 0.085, 0.125, 1); bs.inputs['Roughness'].default_value = 0.10
bs.inputs['Metallic'].default_value = 0.0; bs.inputs['IOR'].default_value = 1.33
lw = nt.nodes.new('ShaderNodeLayerWeight'); lw.inputs['Blend'].default_value = 0.35
em = nt.nodes.new('ShaderNodeEmission'); em.inputs['Color'].default_value = (1.0, 0.60, 0.42, 1); em.inputs['Strength'].default_value = 0.8
skycol = nt.nodes.new('ShaderNodeRGB'); skycol.outputs[0].default_value = (0.85, 0.50, 0.42, 1)
mix = nt.nodes.new('ShaderNodeMixShader'); add = nt.nodes.new('ShaderNodeAddShader')
mult = nt.nodes.new('ShaderNodeMath'); mult.operation = 'MULTIPLY'; mult.inputs[1].default_value = 1.0
nt.links.new(lw.outputs['Fresnel'], mult.inputs[0])
nt.links.new(bs.outputs['BSDF'], add.inputs[0]); nt.links.new(em.outputs['Emission'], add.inputs[1])
nt.links.new(add.outputs['Shader'], out.inputs['Surface'])
cd_ = nt.nodes.new('ShaderNodeCameraData'); mrd = nt.nodes.new('ShaderNodeMapRange')
mrd.inputs['From Min'].default_value = 3500; mrd.inputs['From Max'].default_value = 11000; mrd.inputs['To Min'].default_value = 0.25; mrd.inputs['To Max'].default_value = 2.2
nt.links.new(cd_.outputs['View Distance'], mrd.inputs['Value'])
mults = nt.nodes.new('ShaderNodeMath'); mults.operation = 'MULTIPLY'
nt.links.new(mult.outputs[0], mults.inputs[0]); nt.links.new(mrd.outputs['Result'], mults.inputs[1]); nt.links.new(mults.outputs[0], em.inputs['Strength'])
sea.data.materials.append(sm)
sea.visible_shadow = False

# ------------------------------------------------------------ gökyüzü kubbesi (dünyaya dokunmadan)
bpy.ops.mesh.primitive_uv_sphere_add(radius=45000, segments=64, ring_count=32, location=(-400, 400, 0))
sky = bpy.context.active_object; sky.name = 'C3_Gokyuzu'
for c in list(sky.users_collection): c.objects.unlink(sky)
COL.objects.link(sky)
for a in ('visible_diffuse', 'visible_glossy', 'visible_transmission', 'visible_volume_scatter', 'visible_shadow'): setattr(sky, a, False)
sky.data.polygons.foreach_set('use_smooth', [True] * len(sky.data.polygons))
skm = bpy.data.materials.new('C3_GokM'); skm.use_nodes = True; nt = skm.node_tree
for nd in list(nt.nodes): nt.nodes.remove(nd)
out = nt.nodes.new('ShaderNodeOutputMaterial'); em = nt.nodes.new('ShaderNodeEmission')
geo = nt.nodes.new('ShaderNodeNewGeometry'); sep = nt.nodes.new('ShaderNodeSeparateXYZ'); vm = nt.nodes.new('ShaderNodeVectorMath'); vm.operation = 'NORMALIZE'
nt.links.new(geo.outputs['Position'], vm.inputs[0]); nt.links.new(vm.outputs['Vector'], sep.inputs[0])
mr = nt.nodes.new('ShaderNodeMapRange'); mr.inputs['From Min'].default_value = -0.05; mr.inputs['From Max'].default_value = 0.12
mr.clamp = True; nt.links.new(sep.outputs['Z'], mr.inputs['Value'])
def ramp(stops):
    r = nt.nodes.new('ShaderNodeValToRGB')
    el = r.color_ramp.elements
    el[0].position = stops[0][0]; el[0].color = stops[0][1]; el[1].position = stops[1][0]; el[1].color = stops[1][1]
    for pos, c in stops[2:]:
        e = el.new(pos); e.color = c
    nt.links.new(mr.outputs['Result'], r.inputs['Fac']); return r
r_pre = ramp([(0.0, (0.55, 0.30, 0.34, 1)), (1.0, (0.020, 0.035, 0.11, 1)), (0.30, (0.20, 0.16, 0.30, 1)), (0.12, (0.42, 0.24, 0.30, 1))])
r_dawn = ramp([(0.0, (1.0, 0.62, 0.34, 1)), (1.0, (0.10, 0.20, 0.42, 1)), (0.12, (1.0, 0.50, 0.36, 1)), (0.30, (0.62, 0.38, 0.52, 1)), (0.60, (0.22, 0.30, 0.55, 1))])
dv = nt.nodes.new('ShaderNodeValue'); dv.name = 'dawn'; dv.outputs[0].default_value = 0.0
mx = nt.nodes.new('ShaderNodeMix'); mx.data_type = 'RGBA'
nt.links.new(dv.outputs[0], mx.inputs['Factor']); nt.links.new(r_pre.outputs['Color'], mx.inputs['A']); nt.links.new(r_dawn.outputs['Color'], mx.inputs['B'])
nt.links.new(mx.outputs['Result'], em.inputs['Color']); em.inputs['Strength'].default_value = 1.15
nt.links.new(em.outputs['Emission'], out.inputs['Surface'])
sky.data.materials.append(skm)
# 'dawn' değeri: sürücü ile kareye bağlı (0 → 1)
d2 = dv.outputs[0].driver_add('default_value'); d2.driver.type = 'SCRIPTED'
d2.driver.expression = 'max(0.0, min(1.0, (frame-1141)/300.0))'

# ------------------------------------------------------------ ışıklar
ld = bpy.data.lights.new('C3_Safak_Gunes', 'SUN'); ld.angle = math.radians(1.6); sun = bpy.data.objects.new('C3_Safak_Gunes', ld); COL.objects.link(sun)
def sun_dir(el, az):
    e, a = math.radians(el), math.radians(az); return Vector((math.cos(e) * math.sin(a), math.cos(e) * math.cos(a), math.sin(e)))
for fr, el, az, en, cl in ((FA, -2.0, 64, 0.5, (0.55, 0.55, 0.95)), (1141, -1.0, 65, 2.5, (0.7, 0.55, 0.85)), (1365, 7.0, 62, 9.0, (1.0, 0.44, 0.14)), (1590, 13.0, 74, 8.5, (1.0, 0.72, 0.45)), (FB, 13.5, 75, 8.5, (1.0, 0.75, 0.5))):
    sun.rotation_euler = sun_dir(el, az).to_track_quat('Z', 'Y').to_euler(); sun.keyframe_insert('rotation_euler', frame=fr)
    ld.energy = en; ld.color = cl; ld.keyframe_insert('energy', frame=fr); ld.keyframe_insert('color', frame=fr)
# gökten yansıyan soğuk dolgu (gölgesiz)
fd = bpy.data.lights.new('C3_Safak_Dolgu', 'SUN'); fd.energy = 0.3; fd.color = (0.45, 0.55, 1.0); fd.angle = math.radians(40); fd.use_shadow = False
fo = bpy.data.objects.new('C3_Safak_Dolgu', fd); COL.objects.link(fo); fo.rotation_euler = Vector((-0.5, 0.6, 0.9)).to_track_quat('Z', 'Y').to_euler()
# KIT varsayilan güneşinin ışığını kesen (kameraya görünmeyen) yüksek perde: kit nesnelerine dokunmadan
bpy.ops.mesh.primitive_plane_add(size=1, location=(4670, 5510, 6000))
blk = bpy.context.active_object; blk.name = 'C3_KitGunesPerdesi'; blk.scale = (9600, 6200, 1)
for c in list(blk.users_collection): c.objects.unlink(blk)
COL.objects.link(blk); blk.visible_camera = False; blk.visible_diffuse = False; blk.visible_glossy = False; blk.visible_transmission = False
blk.data.materials.append(mat('perde', (0, 0, 0), 1.0))

# ------------------------------------------------------------ gemi sallanması
for ob in ship_objs:
    ph = random.uniform(0, 6.28); z0 = ob.location.z; r0 = ob.rotation_euler.copy()
    if ob.name == 'C3_GemiKarada': continue
    for fr in range(FA, FB + 1, 25):
        t = fr / 30.0
        ob.location.z = z0 + 0.5 * math.sin(t * 1.3 + ph)
        ob.rotation_euler = (0.03 * math.sin(t * 1.1 + ph), r0[1] + 0.02 * math.sin(t * 0.9 + ph * 2), r0[2])
        ob.keyframe_insert('location', index=2, frame=fr); ob.keyframe_insert('rotation_euler', frame=fr)

# ------------------------------------------------------------ yuva görünürlüğü ve kayıt
for ob in list(COL.objects):
    if ob in VAR: continue
    for prop in ('hide_render', 'hide_viewport'):
        setattr(ob, prop, True); ob.keyframe_insert(prop, frame=FA - 1)
        setattr(ob, prop, False); ob.keyframe_insert(prop, frame=FA)
        ob.keyframe_insert(prop, frame=FB)
        setattr(ob, prop, True); ob.keyframe_insert(prop, frame=FB + 1)
    setattr(ob, 'hide_render', False); setattr(ob, 'hide_viewport', False)
sc.eevee.taa_render_samples = 128; sc.eevee.use_raytracing = True; sc.eevee.use_shadows = True
sc.frame_set(1365)
bpy.ops.wm.save_as_mainfile(filepath='/home/forn/sonnet-vs-astra/z1-tek-ajan-1453/sonnet/sahne.blend')
print('C3 OK')
