"""Forn — karakter modeli + iskelet. Çalıştır: blender -b -P build_char.py  -> char.blend"""
import sys, os, math
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import bpy, bmesh
from mathutils import Vector, Matrix
from lib import *

HERE = os.path.dirname(os.path.abspath(__file__))
reset()
scene = bpy.context.scene
C_CHAR = collection('Forn_Character')

# ------------------------------------------------------------------ ölçüler
CZ = 1.36            # gövde merkezi yüksekliği
R = 0.70             # disk yarıçapı
T = 0.225            # yarı kalınlık
NEXP = 2.5           # süper-elips üsteli

# ------------------------------------------------------------------ malzemeler
BLUE = hexcol('#0B3CF5')
mat_blue, bs_blue = principled('Forn_Blue', BLUE, rough=0.2, coat=1.0, coat_rough=0.04,
                               sss=0.35, sss_col=(0.02, 0.08, 0.6), sss_scale=0.06, spec=0.6)
mat_ink, _ = principled('Forn_Ink', (0.006, 0.006, 0.01, 1), rough=0.32, coat=0.5, coat_rough=0.1)
mat_line = outline_material('Forn_Outline')

# beyaz göz: hafif krem gölge gradyanı yok, cam gibi parlak
mat_white, bs_w = principled('Forn_EyeWhite', hexcol('#F7F4EA'), rough=0.12, coat=1.0, coat_rough=0.02, spec=0.5)

# iris: merkezden dışa açık camgöbeği -> mavi
mat_iris = new_mat('Forn_Iris')
nt = mat_iris.node_tree
out = nt.nodes.new('ShaderNodeOutputMaterial')
bsd = nt.nodes.new('ShaderNodeBsdfPrincipled')
tc = nt.nodes.new('ShaderNodeTexCoord')
vl = nt.nodes.new('ShaderNodeVectorMath'); vl.operation = 'LENGTH'
mr = nt.nodes.new('ShaderNodeMapRange'); mr.inputs['From Min'].default_value = 0.0; mr.inputs['From Max'].default_value = 0.145
cr = nt.nodes.new('ShaderNodeValToRGB')
cr.color_ramp.elements[0].position = 0.0; cr.color_ramp.elements[0].color = hexcol('#BFEFFF')
cr.color_ramp.elements[1].position = 1.0; cr.color_ramp.elements[1].color = hexcol('#1F63F0')
e = cr.color_ramp.elements.new(0.55); e.color = hexcol('#43B4FF')
nt.links.new(tc.outputs['Object'], vl.inputs[0])
nt.links.new(vl.outputs['Value'], mr.inputs['Value'])
nt.links.new(mr.outputs['Result'], cr.inputs['Fac'])
nt.links.new(cr.outputs['Color'], bsd.inputs['Base Color'])
bsd.inputs['Roughness'].default_value = 0.1
bsd.inputs['Coat Weight'].default_value = 1.0
bsd.inputs['Coat Roughness'].default_value = 0.02
nt.links.new(bsd.outputs['BSDF'], out.inputs['Surface'])

mat_glint, _ = principled('Forn_Glint', (1, 1, 1, 1), rough=0.2, emission=(1, 1, 1, 1), emit_strength=2.0)

# ------------------------------------------------------------------ GÖVDE (disk + anahtarlık deliği)
bm = bmesh.new()
prof = []
NP = 64
for i in range(NP + 1):
    ph = math.pi * i / NP
    r = R * (math.sin(ph) ** (2 / NEXP))
    y = -T * math.copysign(abs(math.cos(ph)) ** (2 / NEXP), math.cos(ph))
    prof.append(bm.verts.new((r, y, 0.0)))
for a, b in zip(prof[:-1], prof[1:]):
    bm.edges.new((a, b))
bmesh.ops.spin(bm, geom=bm.verts[:] + bm.edges[:], angle=math.tau, steps=128, axis=(0, 1, 0), cent=(0, 0, 0))
bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-5)
bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
me = bpy.data.meshes.new('Forn_Body')
bm.to_mesh(me); bm.free()
body = bpy.data.objects.new('Forn_Body', me)
link(body, C_CHAR)
body.location = (0, 0, 0)
# spin XZ düzleminde döner -> disk XZ'de, kalınlık Y'de. Merkezi CZ'ye taşı
for v in me.vertices:
    v.co.z += CZ
me.update()
set_smooth(body)

# delik silindiri
HOLE = Vector((0.012, 0, CZ + 0.53))
HR = 0.078
cy = bpy.data.meshes.new('hole_cut')
bmc = bmesh.new()
bmesh.ops.create_cone(bmc, cap_ends=True, radius1=HR, radius2=HR, depth=1.2, segments=64)
bmesh.ops.rotate(bmc, verts=bmc.verts, cent=(0, 0, 0), matrix=Matrix.Rotation(math.pi / 2, 3, 'X'))
bmesh.ops.translate(bmc, verts=bmc.verts, vec=HOLE)
bmc.to_mesh(cy); bmc.free()
cut = bpy.data.objects.new('hole_cut', cy)
link(cut, C_CHAR)
bo = body.modifiers.new('Hole', 'BOOLEAN')
bo.operation = 'DIFFERENCE'; bo.object = cut; bo.solver = 'EXACT'
bv = body.modifiers.new('HoleBevel', 'BEVEL')
bv.limit_method = 'ANGLE'; bv.angle_limit = math.radians(40)
bv.width = 0.02; bv.segments = 5; bv.harden_normals = False
bake_modifiers(body)
bpy.data.objects.remove(cut)
set_smooth(body)
body.data.materials.append(mat_blue)
# yüz plakalarının projeksiyon hedefi: çizgisiz, kameradan gizli vekil gövde
proxy = bpy.data.objects.new('Forn_BodyProxy', body.data.copy())
link(proxy, C_CHAR)
for a in ('visible_camera', 'visible_diffuse', 'visible_glossy', 'visible_transmission', 'visible_volume_scatter', 'visible_shadow'):
    setattr(proxy, a, False)

# ------------------------------------------------------------------ YÜZ PARÇALARI
FACE_Y = -0.9    # projeksiyon için önde dursun
EYE_C = Vector((0.05, 0, CZ - 0.03))
EYE_RX, EYE_RZ = 0.325, 0.205
face_objs = []

def face_part(name, obj, mat, offset, thick=0.010, bevel=0.0025):
    obj.name = name
    obj.data.materials.append(mat)
    obj.location.y = FACE_Y
    sw = obj.modifiers.new('Wrap', 'SHRINKWRAP')
    sw.wrap_method = 'PROJECT'
    sw.target = proxy
    sw.use_project_y = True
    sw.use_negative_direction = False
    sw.use_positive_direction = True
    sw.cull_face = 'OFF'
    sw.offset = offset
    sw.wrap_mode = 'ABOVE_SURFACE'
    if thick > 0:
        so = obj.modifiers.new('Thick', 'SOLIDIFY')
        so.thickness = thick
        so.offset = 1.0
        so.use_even_offset = True
        so.use_rim = True
    if bevel > 0:
        bv = obj.modifiers.new('Bev', 'BEVEL')
        bv.width = bevel; bv.segments = 2; bv.limit_method = 'ANGLE'
    face_objs.append(obj)
    return obj

# göz çerçevesi (siyah) + beyaz
eye_back = polar_grid('eye_back', EYE_RX + 0.020, EYE_RZ + 0.020, EYE_C.x, EYE_C.z, rings=7, segs=64, coll=C_CHAR)
face_part('Face_EyeOutline', eye_back, mat_ink, 0.004, thick=0.006, bevel=0.0)
eye_w = polar_grid('eye_w', EYE_RX, EYE_RZ, EYE_C.x, EYE_C.z, rings=7, segs=64, coll=C_CHAR)
face_part('Face_EyeWhite', eye_w, mat_white, 0.010, thick=0.006, bevel=0.0)

# iris + pupil + parıltı (hiyerarşi: iris > pupil > glint), nesne orijini gözün merkezi
iris = polar_grid('iris', 0.145, 0.145, 0, 0, rings=5, segs=48, coll=C_CHAR)
face_part('Face_Iris', iris, mat_iris, 0.016, thick=0.004, bevel=0.0)
iris.location = (EYE_C.x + 0.135, FACE_Y, EYE_C.z)
pupil = polar_grid('pupil', 0.090, 0.090, 0, 0, rings=4, segs=40, coll=C_CHAR)
face_part('Face_Pupil', pupil, mat_ink, 0.021, thick=0.004, bevel=0.0)
add_shape(iris, 'small', [Vector((v.co.x * 0.5, v.co.y, v.co.z * 0.5)) for v in iris.data.vertices])
pupil.parent = iris
pupil.location = (-0.008, 0, 0.045)
add_shape(pupil, 'small', [Vector((v.co.x * 0.5, v.co.y, v.co.z * 0.5)) for v in pupil.data.vertices])
add_shape(pupil, 'big', [Vector((v.co.x * 1.5, v.co.y, v.co.z * 1.5)) for v in pupil.data.vertices])
glint = polar_grid('glint', 0.024, 0.024, 0, 0, rings=2, segs=20, coll=C_CHAR)
face_part('Face_Glint', glint, mat_glint, 0.026, thick=0.002, bevel=0.0)
glint.parent = pupil
glint.location = (0.030, 0, 0.032)

# kapak (lid): siyah arka + mavi dolgu, şekil anahtarları
LID_A = 0.335
LID_REST = dict(a=LID_A, zc=EYE_C.z + 0.03, b=0.27, slope=0.10, cx=EYE_C.x)
LID_KEYS = {
    'lid_open':  dict(zc=EYE_C.z + 0.20, b=0.215),
    'lid_close': dict(zc=EYE_C.z - 0.195, b=0.405),
    'lid_tilt':  dict(slope=0.26),
    'lid_slump': dict(zc=EYE_C.z - 0.03, b=0.27, a=0.36),
}
def lid_variant(base, over, grow):
    P = dict(base); P.update(over)
    return dict(a=P['a'] + grow[0], zc=P['zc'] - grow[1], b=P['b'] + grow[2], slope=P['slope'], cx=P['cx'])

def make_lid(name, grow, mat, offset, thick):
    ob, co0 = dome_obj(name, lid_variant(LID_REST, {}, grow), coll=C_CHAR)
    for k, ov in LID_KEYS.items():
        P = lid_variant(LID_REST, ov, grow)
        if k == 'lid_tilt':
            P['slope'] = LID_REST['slope'] + 0.16
        add_shape(ob, k, dome_coords(P))
    # ikinci yön: negatif eğim
    P = lid_variant(LID_REST, {}, grow); P['slope'] = LID_REST['slope'] - 0.20
    add_shape(ob, 'lid_tilt_neg', dome_coords(P))
    face_part(name, ob, mat, offset, thick=thick, bevel=0.0)
    return ob
lid_back = make_lid('Face_LidOutline', (0.022, 0.024, 0.020), mat_ink, 0.028, 0.006)
lid_fill = make_lid('Face_Lid', (0.0, 0.0, 0.0), mat_blue, 0.033, 0.008)

# kaş
BROW_REST = dict(L=0.66, t=0.058, pw=6.0, cx=0.02, cz=CZ + 0.325, tilt=9.0, arch=0.0, vee=0.0)
brow, co = strip_obj('brow', BROW_REST, nu=36, nv=4, coll=C_CHAR)
add_shape(brow, 'brow_arch', strip_coords(dict(BROW_REST, arch=0.05), 36, 4))
add_shape(brow, 'brow_vee', strip_coords(dict(BROW_REST, vee=0.055, arch=0.0), 36, 4))
def recenter(ob, c):
    for v in ob.data.vertices:
        v.co -= c
    if ob.data.shape_keys:
        for kb in ob.data.shape_keys.key_blocks:
            for d in kb.data:
                d.co -= c
    ob.location = (c.x, FACE_Y, c.z)
BROW_C = Vector((BROW_REST['cx'], 0, BROW_REST['cz']))
recenter(brow, BROW_C)
face_part('Face_Brow', brow, mat_ink, 0.030, thick=0.012, bevel=0.003)

# burun (L)
nose_v, _ = strip_obj('nose_v', dict(L=0.185, t=0.036, pw=6.0, cx=-0.005, cz=CZ - 0.268, tilt=90.0), nu=20, nv=4, coll=C_CHAR)
face_part('Face_NoseV', nose_v, mat_ink, 0.020, thick=0.012, bevel=0.003)
nose_f, _ = strip_obj('nose_f', dict(L=0.155, t=0.036, pw=6.0, cx=0.072, cz=CZ - 0.352, tilt=-2.0), nu=20, nv=4, coll=C_CHAR)
face_part('Face_NoseFoot', nose_f, mat_ink, 0.020, thick=0.012, bevel=0.003)

# ağız
MOUTH = dict(L=0.23, t=0.044, pw=5.0, cx=0.03, cz=CZ - 0.465, tilt=0.0, arch=0.0)
mouth, _ = strip_obj('mouth', MOUTH, nu=32, nv=4, coll=C_CHAR)
add_shape(mouth, 'mouth_smile', strip_coords(dict(MOUTH, L=0.25, tilt=-9.0, arch=-0.05, cz=CZ - 0.46, pw=4.0), 32, 4))
add_shape(mouth, 'mouth_dot', strip_coords(dict(MOUTH, L=0.105, t=0.105, pw=2.0, cx=0.0, cz=CZ - 0.485), 32, 4))
add_shape(mouth, 'mouth_oval', strip_coords(dict(MOUTH, L=0.17, t=0.12, pw=2.2, cx=0.02, cz=CZ - 0.49), 32, 4))
face_part('Face_Mouth', mouth, mat_ink, 0.020, thick=0.012, bevel=0.003)

# anahtarlık deliği içi: koyu iç yüzey için ek bir şey gerekmez (delik gerçek)

# yüz plakalarının kabartma yönü: Solidify normali -Y olan grid'te, offset=+1 dışarı (normal yönü)
for ob in face_objs:
    for m in ob.modifiers:
        if m.type == 'SOLIDIFY':
            m.offset = 1.0

# ------------------------------------------------------------------ BEDEN (uzuvlar) — Skin ile
def refine_skeleton(pts, edges, radii, step):
    pts = [Vector(p) for p in pts]; radii = list(radii); ne = []
    for a, b in edges:
        L = (pts[b] - pts[a]).length
        n = max(1, int(round(L / step)))
        prev = a
        for k in range(1, n):
            t = k / n
            pts.append(pts[a].lerp(pts[b], t)); radii.append(radii[a] * (1 - t) + radii[b] * t)
            ne.append((prev, len(pts) - 1)); prev = len(pts) - 1
        ne.append((prev, b))
    return pts, ne, radii

def skin_mesh(name, pts, edges, radii, roots=(0,), step=0.045):
    pts, edges, radii = refine_skeleton(pts, edges, radii, step)
    me = bpy.data.meshes.new(name)
    me.from_pydata([tuple(p) for p in pts], edges, [])
    ob = bpy.data.objects.new(name, me)
    link(ob, C_CHAR)
    sk = ob.modifiers.new('Skin', 'SKIN')
    sk.use_x_symmetry = False
    sk.use_smooth_shade = True
    sk.branch_smoothing = 0.8
    layer = me.skin_vertices[0].data
    for i, r in enumerate(radii):
        layer[i].radius = (r, r)
    for r in roots:
        layer[r].use_root = True
    return ob

def flatten_hand(ob, wrist, D, N, u0, u1, k):
    """Avuç/parmak w ekseni (N) boyunca basık; wrist'e doğru yumuşak geçiş."""
    for v in ob.data.vertices:
        rel = v.co - wrist
        u = rel.dot(D)
        if u <= u0:
            continue
        f = smoothstep((u - u0) / (u1 - u0))
        w = rel.dot(N)
        v.co -= N * (w * (1 - k) * f)

SIDES = {'L': 1.0, 'R': -1.0}
LEG = {}
ARM = {}

def M(p, sx):
    return Vector((p[0] * sx, p[1], p[2]))

# ---- geometri tanımı (sol taraf; sağ = x aynası)
ARM_S = Vector((0.50, 0.0, 1.05)); ARM_E = Vector((0.745, 0.03, 0.84)); ARM_W = Vector((0.79, -0.02, 0.62))
HIP = Vector((0.20, 0.0, 0.88)); KNEE = Vector((0.235, -0.02, 0.545)); ANK = Vector((0.265, 0.0, 0.235))

HAND_D = Vector((0.05, 0, -1)).normalized()
HAND_Y = Vector((0, 1, 0))
HAND_N = HAND_Y.cross(HAND_D).normalized()          # avuç içi: gövdeye doğru (-X)
FING = [  # (v ofset, [segment uzunlukları], radius taban)
    (-0.092, [0.078, 0.056, 0.048], 0.033),   # işaret (ön)
    (-0.031, [0.085, 0.060, 0.050], 0.034),   # orta
    (0.031,  [0.078, 0.056, 0.046], 0.033),   # yüzük
    (0.092,  [0.062, 0.044, 0.040], 0.030),   # serçe
]
K_U = 0.115   # eklem çizgisi

def hand_pts(W):
    """W: bilek noktası (sol). Döner: pts, edges, radii, bone_info"""
    pts, edges, radii, info = [], [], [], {}
    def P(u, v, w=0.0):
        return W + HAND_D * u + HAND_Y * v + HAND_N * w
    def add(p, r):
        pts.append(p); radii.append(r); return len(pts) - 1
    iW = add(W, 0.052)
    iPm = add(P(0.065, 0.0, 0.0), 0.075)
    edges.append((iW, iPm))
    iK = []
    for fi, (v, segs, r0) in enumerate(FING):
        iK.append(add(P(K_U, v), r0 + 0.002))
    edges += [(iPm, iK[1]), (iPm, iK[2]), (iK[0], iK[1]), (iK[3], iK[2])]
    fing_idx = []
    for fi, (v, segs, r0) in enumerate(FING):
        chain = [iK[fi]]
        u = K_U
        for si, sl in enumerate(segs):
            u += sl
            r = r0 * (1.0 - 0.06 * (si + 1)) if si < 2 else r0 * 0.86
            i = add(P(u, v * (1.0 + 0.10 * (si + 1))), r)
            edges.append((chain[-1], i)); chain.append(i)
        fing_idx.append(chain)
    # başparmak: avuç içinin ön kenarından
    iT0 = add(P(0.070, -0.110, 0.020), 0.042)
    iT1 = add(P(0.125, -0.165, 0.030), 0.038)
    iT2 = add(P(0.175, -0.190, 0.030), 0.034)
    iT3 = add(P(0.215, -0.198, 0.028), 0.031)
    edges += [(iPm, iT0), (iT0, iT1), (iT1, iT2), (iT2, iT3)]
    info['fingers'] = fing_idx
    info['thumb'] = [iT0, iT1, iT2, iT3]
    info['W'] = iW; info['Pm'] = iPm; info['K'] = iK
    return pts, edges, radii, info

built = {}
for side, sx in SIDES.items():
    # ---------------- KOL
    W = M(ARM_W, sx)
    hp, he, hr, hinfo = hand_pts(ARM_W)   # sol referans
    pts = [ARM_S, ARM_E] + hp
    off = 2
    edges = [(0, 1), (1, off + hinfo['W'])] + [(a + off, b + off) for a, b in he]
    radii = [0.060, 0.054] + hr
    # sağ taraf için x aynası
    ptsS = [M(p, sx) for p in pts]
    # hand vectors mirrored
    ob = skin_mesh('Forn_Arm.' + side, ptsS, edges, radii, roots=(0,), step=0.04)
    bake_modifiers(ob)
    me = ob.data
    # avuç/parmakları N yönünde basıkla
    Dm = Vector((HAND_D.x * sx, HAND_D.y, HAND_D.z)); Nm = Vector((HAND_N.x * sx, HAND_N.y, HAND_N.z))
    flatten_hand(ob, W, Dm, Nm, 0.0, 0.07, 0.78)
    set_smooth(ob)
    ob.data.materials.append(mat_blue)
    built['arm' + side] = (ob, W, Dm, Nm, hinfo, off)

    # ---------------- BACAK
    pts = [M(HIP, sx), M(KNEE, sx), M(ANK, sx), M(ANK + Vector((0.005, 0, -0.06)), sx)]
    ob = skin_mesh('Forn_Leg.' + side, pts, [(0, 1), (1, 2), (2, 3)], [0.072, 0.063, 0.060, 0.058], roots=(0,), step=0.05)
    bake_modifiers(ob)
    set_smooth(ob)
    ob.data.materials.append(mat_blue)
    built['leg' + side] = ob

    # ---------------- AYAKKABI
    sm = bpy.data.meshes.new('Forn_Shoe.' + side)
    bmS = bmesh.new()
    bmesh.ops.create_uvsphere(bmS, u_segments=56, v_segments=32, radius=1.0)
    for v in bmS.verts:
        x, y, z = v.co
        # süper-elips kubbe, düz taban
        sx_, sy_, sz_ = 0.19, 0.30, 0.19
        zz = z
        v.co = Vector((x * sx_, y * sy_, zz * sz_))
        # taban düzle
        zb = -0.02
        if v.co.z < zb:
            v.co.z = zb + (v.co.z - zb) * 0.12
        # burun kalınlaşsın, topuk daralsın
        t = (-v.co.y / sy_ + 1) * 0.5   # 0 topuk .. 1 burun
        v.co.x *= 0.82 + 0.28 * t
        v.co.z += 0.12 * (0.0)
    bmS.to_mesh(sm); bmS.free()
    so = bpy.data.objects.new('Forn_Shoe.' + side, sm)
    link(so, C_CHAR)
    # yerleştir: yaw dışa 10°, merkez
    yaw = math.radians(10) * sx
    Rm = Matrix.Rotation(yaw, 4, 'Z')
    ctr = M(ANK, sx) + Vector((0.02 * sx, -0.115, 0))
    ctr.z = 0.0404
    for v in sm.vertices:
        v.co = ctr + (Rm.to_3x3() @ v.co)
    sm.update(); set_smooth(so)
    so.data.materials.append(mat_blue)
    built['shoe' + side] = so

# ------------------------------------------------------------------ İSKELET
arm_data = bpy.data.armatures.new('Forn_Rig')
rig = bpy.data.objects.new('Forn_Rig', arm_data)
link(rig, C_CHAR)
bpy.context.view_layer.objects.active = rig
rig.select_set(True)
bpy.ops.object.mode_set(mode='EDIT')
EB = arm_data.edit_bones

def bone(name, head, tail, parent=None, roll_z=None, deform=True, inherit_scale=True):
    b = EB.new(name)
    b.head = Vector(head); b.tail = Vector(tail)
    if roll_z is not None:
        b.align_roll(Vector(roll_z))
    if parent:
        b.parent = EB[parent]
    b.use_deform = deform
    if not inherit_scale:
        b.inherit_scale = 'NONE'
    return b

bone('root', (0, 0, 0), (0, 0.5, 0), roll_z=(0, 0, 1), deform=False)
bone('body', (0, 0, CZ), (0, 0.35, CZ), 'root', roll_z=(0, 0, 1), deform=True)
bone('face', (0.05, -0.30, CZ - 0.03), (0.05, -0.18, CZ - 0.03), 'body', roll_z=(0, 0, 1), deform=False, inherit_scale=False)

for side, sx in SIDES.items():
    S = M(ARM_S, sx); E = M(ARM_E, sx); W = M(ARM_W, sx)
    upN = (E - S).normalized()
    bone('upper_arm.' + side, S, E, 'body', roll_z=(0, -1, 0), inherit_scale=False)
    bone('forearm.' + side, E, W, 'upper_arm.' + side, roll_z=(0, -1, 0))
    ob, Wm, Dm, Nm, hinfo, off = built['arm' + side]
    pts = [v.co.copy() for v in ob.data.vertices]
    # hand bone
    K_ctr = Wm + Dm * K_U
    bone('hand.' + side, Wm, K_ctr, 'forearm.' + side, roll_z=Nm)
    for fi, chain in enumerate(hinfo['fingers']):
        # chain indeksleri hand_pts iç indeksi; mesh dışı — pozisyonları yeniden hesapla
        pass
    # parmak kemikleri: geometri tanımından yeniden hesapla
    def P(u, v, w=0.0):
        return Wm + Dm * u + Vector((0, 1, 0)) * v + Nm * w
    names = ['idx', 'mid', 'rng', 'pnk']
    for fi, (v, segs, r0) in enumerate(FING):
        u = K_U
        prev = 'hand.' + side
        for si, sl in enumerate(segs):
            v0 = v * (1.0 + 0.10 * si) if si > 0 else v
            v1 = v * (1.0 + 0.10 * (si + 1))
            h = P(u, v0)
            t = P(u + sl, v1)
            nm = '%s%d.%s' % (names[fi], si + 1, side)
            bone(nm, h, t, prev, roll_z=Nm)
            prev = nm
            u += sl
    tpts = [P(0.070, -0.110, 0.020), P(0.125, -0.165, 0.030), P(0.175, -0.190, 0.030), P(0.215, -0.198, 0.028)]
    prev = 'hand.' + side
    for i in range(3):
        nm = 'thm%d.%s' % (i + 1, side)
        bone(nm, tpts[i], tpts[i + 1], prev, roll_z=Nm)
        prev = nm
    # kontrol: el IK hedefi, dirsek kutbu
    bone('hand_ik.' + side, Wm, K_ctr, 'body', roll_z=Nm, deform=False, inherit_scale=False)
    bone('elbow_pole.' + side, E + Vector((0.0, 0.55, 0)), E + Vector((0.0, 0.68, 0)), 'body', roll_z=(0, 0, 1), deform=False, inherit_scale=False)

    # bacak
    H = M(HIP, sx); K = M(KNEE, sx); A = M(ANK, sx)
    bone('thigh.' + side, H, K, 'body', roll_z=(0, -1, 0), inherit_scale=False)
    bone('shin.' + side, K, A, 'thigh.' + side, roll_z=(0, -1, 0))
    toe = A + Vector(( -0.0 * sx, -0.30, -0.115))
    yaw = math.radians(10) * sx
    toe = A + Matrix.Rotation(yaw, 3, 'Z') @ Vector((0, -0.30, -0.115))
    bone('foot.' + side, A, toe, 'shin.' + side, roll_z=(0, 0, 1))
    bone('foot_ik.' + side, A, toe, 'root', roll_z=(0, 0, 1), deform=False)
    bone('knee_pole.' + side, K + Vector((0.02 * sx, -0.7, 0)), K + Vector((0.02 * sx, -0.82, 0)), 'root', roll_z=(0, 0, 1), deform=False)

bpy.ops.object.mode_set(mode='POSE')
pb = rig.pose.bones
for side, sx in SIDES.items():
    ik = pb['forearm.' + side].constraints.new('IK')
    ik.target = rig; ik.subtarget = 'hand_ik.' + side
    ik.pole_target = rig; ik.pole_subtarget = 'elbow_pole.' + side
    ik.chain_count = 2
    ik.use_tail = True
    ik.pole_angle = math.radians(-90)
    cr_ = pb['hand.' + side].constraints.new('COPY_ROTATION')
    cr_.target = rig; cr_.subtarget = 'hand_ik.' + side
    ik = pb['shin.' + side].constraints.new('IK')
    ik.target = rig; ik.subtarget = 'foot_ik.' + side
    ik.pole_target = rig; ik.pole_subtarget = 'knee_pole.' + side
    ik.chain_count = 2
    ik.pole_angle = math.radians(90)
    cr_ = pb['foot.' + side].constraints.new('COPY_ROTATION')
    cr_.target = rig; cr_.subtarget = 'foot_ik.' + side
# yüz kontrol kemiği özellikleri
fb = pb['face']
props = dict(lid=0.0, lid_tilt=0.0, brow_y=0.0, brow_tilt=0.0, brow_arch=0.0, brow_vee=0.0,
             look_x=0.0, look_y=0.0, iris_size=1.0, pupil_size=1.0,
             mouth_smile=0.0, mouth_dot=0.0, mouth_oval=0.0)
for k, v in props.items():
    fb[k] = float(v)
    ui = fb.id_properties_ui(k)
    ui.update(min=-2.0 if k in ('lid', 'lid_tilt', 'brow_y', 'brow_tilt', 'look_x', 'look_y') else 0.0, max=2.0 if k != 'brow_tilt' else 40.0)
bpy.ops.object.mode_set(mode='OBJECT')

# ------------------------------------------------------------------ AĞIRLIKLAR + PARENT
def armature_mod(ob):
    m = ob.modifiers.new('Armature', 'ARMATURE')
    m.object = rig
    return m

# gövde: kemiğe tek ağırlık

for side, sx in SIDES.items():
    ob, Wm, Dm, Nm, hinfo, off = built['arm' + side]
    bl = []
    S = M(ARM_S, sx); E = M(ARM_E, sx)
    bl.append(('upper_arm.' + side, S, E, 0.06))
    bl.append(('forearm.' + side, E, Wm, 0.055))
    bl.append(('hand.' + side, Wm, Wm + Dm * K_U, 0.05))
    def P(u, v, w=0.0):
        return Wm + Dm * u + Vector((0, 1, 0)) * v + Nm * w
    names = ['idx', 'mid', 'rng', 'pnk']
    for fi, (v, segs, r0) in enumerate(FING):
        u = K_U
        for si, sl in enumerate(segs):
            v0 = v * (1.0 + 0.10 * si) if si > 0 else v
            v1 = v * (1.0 + 0.10 * (si + 1))
            bl.append(('%s%d.%s' % (names[fi], si + 1, side), P(u, v0), P(u + sl, v1), 0.028))
            u += sl
    tpts = [P(0.070, -0.110, 0.020), P(0.125, -0.165, 0.030), P(0.175, -0.190, 0.030), P(0.215, -0.198, 0.028)]
    for i in range(3):
        bl.append(('thm%d.%s' % (i + 1, side), tpts[i], tpts[i + 1], 0.03))
    assign_weights(ob, bl)
    ob.parent = rig
    armature_mod(ob)
    # bacak
    lg = built['leg' + side]
    H = M(HIP, sx); K = M(KNEE, sx); A = M(ANK, sx)
    assign_weights(lg, [('thigh.' + side, H, K, 0.10), ('shin.' + side, K, A, 0.10)])
    lg.parent = rig
    armature_mod(lg)
    sh = built['shoe' + side]
    vg = sh.vertex_groups.new(name='foot.' + side)
    vg.add(list(range(len(sh.data.vertices))), 1.0, 'REPLACE')
    sh.parent = rig
    armature_mod(sh)

def finish(ob, subsurf=0, line=0.011):
    if subsurf:
        m = ob.modifiers.new('Subsurf', 'SUBSURF')
        m.levels = subsurf; m.render_levels = subsurf
    add_outline(ob, mat_line, line)
finish(body, 0, 0.013)
for side, sx in SIDES.items():
    finish(built['arm' + side][0], 1, 0.009)
    finish(built['leg' + side], 1, 0.011)
    finish(built['shoe' + side], 0, 0.012)

# yüz parçaları: gövde kemiğine bone-parent (rest'te dünya matrisi = kimlik)
rig.data.pose_position = 'POSE'
bpy.context.view_layer.update()
bone_b = rig.data.bones['body']
pm = rig.matrix_world @ rig.pose.bones['body'].matrix @ Matrix.Translation((0, bone_b.length, 0))
pinv = pm.inverted()
top_level = [o for o in face_objs if o.parent is None] + [body, proxy]
for ob in top_level:
    ob.parent = rig
    ob.parent_type = 'BONE'
    ob.parent_bone = 'body'
    ob.matrix_parent_inverse = pinv
for ob in face_objs:
    if ob.parent is not None and ob.parent is not rig:
        # çocuklar (pupil->iris) : iris bone-parent; çocuğun parent inverse'ü kimlik kalsın
        pass

# gövde de bone-parent yerine armature mod (yukarıda) kullandı; body objesini de rig'e parent'ladık.

# ------------------------------------------------------------------ SÜRÜCÜLER (yüz)
FB = lambda k: (rig, 'pose.bones["face"]["%s"]' % k)
def dv(**kw):
    return {k: FB(k) for k in kw}

# kapak
for ob in (lid_back, lid_fill):
    sk = ob.data.shape_keys
    drive(sk, 'key_blocks["lid_open"].value', None, 'max(lid,0)', dv(lid=1))
    drive(sk, 'key_blocks["lid_close"].value', None, 'max(-lid,0)', dv(lid=1))
    drive(sk, 'key_blocks["lid_tilt"].value', None, 'max(lid_tilt,0)', dv(lid_tilt=1))
    drive(sk, 'key_blocks["lid_tilt_neg"].value', None, 'max(-lid_tilt,0)', dv(lid_tilt=1))
    sk.key_blocks['lid_slump'].value = 0.0
# kaş
sk = brow.data.shape_keys
drive(sk, 'key_blocks["brow_arch"].value', None, 'brow_arch', dv(brow_arch=1))
drive(sk, 'key_blocks["brow_vee"].value', None, 'brow_vee', dv(brow_vee=1))
drive(brow, 'location', 2, '%f + brow_y' % BROW_C.z, dv(brow_y=1))
drive(brow, 'rotation_euler', 1, 'radians(brow_tilt)', dv(brow_tilt=1))
# ağız
sk = mouth.data.shape_keys
drive(sk, 'key_blocks["mouth_smile"].value', None, 'mouth_smile', dv(mouth_smile=1))
drive(sk, 'key_blocks["mouth_dot"].value', None, 'mouth_dot', dv(mouth_dot=1))
drive(sk, 'key_blocks["mouth_oval"].value', None, 'mouth_oval', dv(mouth_oval=1))
# göz bakışı
drive(iris, 'location', 0, '%f + look_x' % (EYE_C.x + 0.135), dv(look_x=1))
drive(iris, 'location', 2, '%f + look_y' % (EYE_C.z), dv(look_y=1))
drive(iris.data.shape_keys, 'key_blocks["small"].value', None, 'min(max((1-iris_size)/0.5,0),1)', dv(iris_size=1))
drive(pupil.data.shape_keys, 'key_blocks["small"].value', None, 'min(max((1-pupil_size)/0.5,0),1)', dv(pupil_size=1))
drive(pupil.data.shape_keys, 'key_blocks["big"].value', None, 'min(max((pupil_size-1)/0.5,0),1)', dv(pupil_size=1))
drive(pupil, 'location', 0, '-0.008*iris_size', dv(iris_size=1))
drive(pupil, 'location', 2, '0.045*iris_size', dv(iris_size=1))
drive(glint, 'location', 0, '0.030*pupil_size*iris_size', dv(pupil_size=1, iris_size=1))
drive(glint, 'location', 2, '0.032*pupil_size*iris_size', dv(pupil_size=1, iris_size=1))
# kaş dönüşü kaşın kendi merkezinde: nesne orijini dünya 0 -> bunu düzelt (aşağıda origin_set)

# ------------------------------------------------------------------ dışa
rig.show_in_front = False
rig.data.display_type = 'OCTAHEDRAL'
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(HERE, 'char.blend'))
print('OK char.blend')
