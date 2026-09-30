"""maskot.blend üretimi: karakter + ortam + animasyon."""
import sys, os, math, json
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import bpy, bmesh
import numpy as np
from mathutils import Vector, Matrix, Euler
import env, anim, poselib as pl
from lib import *

bpy.ops.wm.open_mainfile(filepath=os.path.join(HERE, 'char.blend'))
sc = bpy.context.scene
C = collection('Set')
env.setup_render(sc, 1920, 1080, 96)
env.cyclorama(C)
mline = bpy.data.materials['Forn_Outline']
env.peg(C, mline)
letters = env.letters(C, mline)
env.lights(C)
cam, tgt = env.camera(C)
rig = pl.init()

S = anim.build_all()
N = anim.N
sc.frame_start, sc.frame_end = 0, N - 1
bpy.context.preferences.edit.keyframe_new_interpolation_type = 'LINEAR'

rest = {n: rig.data.bones[n] for n in [b.name for b in rig.data.bones]}
C0 = np.array([0, 0, anim.CZ0])
KEYED = ['body', 'face', 'hand_ik.L', 'hand_ik.R', 'foot_ik.L', 'foot_ik.R', 'elbow_pole.L', 'elbow_pole.R', 'knee_pole.L', 'knee_pole.R']
FINGER_BONES = [b.name for b in rig.data.bones if b.name[:3] in ('idx', 'mid', 'rng', 'pnk', 'thm')]
pb = rig.pose.bones
V3 = lambda a: Vector((float(a[0]), float(a[1]), float(a[2])))
B = S['B']

def rot_to_quat(R):
    return Matrix([list(map(float, r)) for r in R]).to_quaternion()

def key_bone(name, f, loc=True, rot=True, scl=False):
    p = pb[name]
    if loc: p.keyframe_insert('location', frame=f)
    if rot: p.keyframe_insert('rotation_quaternion', frame=f)
    if scl: p.keyframe_insert('scale', frame=f)

for f in range(N):
    # gövde
    R = anim.rb(B['roll'][f], B['yaw'][f], B['pit'][f])
    pb['body'].location = V3(B['c'][f] - C0)
    pb['body'].rotation_quaternion = rot_to_quat(R)
    pb['body'].scale = (B['sxy'][f], B['sxy'][f], B['sz'][f])
    key_bone('body', f, scl=True)
    # eller
    for side, sx, HA in (('L', 1.0, S['HL']), ('R', -1.0, S['HR'])):
        rest_rel = np.array([anim.ARM_W[0] * sx, anim.ARM_W[1], anim.ARM_W[2] - anim.CZ0])
        pl.set_loc('hand_ik.' + side, delta=V3(HA['pos'][f] - rest_rel))
        pl.set_rot('hand_ik.' + side, Rw=Matrix([list(map(float, r)) for r in HA['R'][f]]))
        rest_pole = np.array([anim.ARM_E[0] * sx, 0.58, anim.ARM_E[2] - anim.CZ0])
        pl.set_loc('elbow_pole.' + side, delta=V3(HA['pole'][f] - rest_pole))
        pl.hand_pose(side, curl=HA['curl'][f], spread=HA['spread'][f], thumb=HA['thumb'][f], per=[0, 0.04, 0.09, 0.16])
        for n_ in ('hand_ik.' + side, 'elbow_pole.' + side):
            key_bone(n_, f)
        for n_ in FINGER_BONES:
            if n_.endswith(side):
                key_bone(n_, f, loc=False)
    # ayaklar
    for side, sx, FA in (('L', 1.0, S['FL']), ('R', -1.0, S['FR'])):
        pl.set_loc('foot_ik.' + side, target=V3(FA['pos'][f]))
        Rf = anim.rot_x(FA['pitch'][f])
        pl.set_rot('foot_ik.' + side, Rw=Matrix([list(map(float, r)) for r in Rf]))
        key_bone('foot_ik.' + side, f)
        # diz kutbu: kalçanın önünde
        fwd = anim.rot_z(B['yaw'][f]) @ np.array([0, -1.0, 0])
        pole_w = FA['hip'][f] + fwd * 0.75 + np.array([0, 0, -0.15])
        pl.set_loc('knee_pole.' + side, target=V3(pole_w))
        key_bone('knee_pole.' + side, f, rot=False)
    # yüz
    for k, arr in S['face'].items():
        pb['face'][k] = float(arr[f])
        pb['face'].keyframe_insert('["%s"]' % k, frame=f)
    # kamera
    cam.location = (S['cam']['x'][f], S['cam']['y'][f], S['cam']['z'][f])
    tgt.location = (S['cam']['tx'][f], S['cam']['ty'][f], S['cam']['tz'][f])
    cam.data.lens = S['cam']['lens'][f]
    cam.keyframe_insert('location', frame=f); tgt.keyframe_insert('location', frame=f)
    cam.data.keyframe_insert('lens', frame=f)


# ------------------------------------------------------------------ ekstralar: harfler, zzz, toz, kıvılcım
from sig import Sig
Ls = S['L']
def key_obj(ob, f, **kw):
    for k, v in kw.items():
        setattr(ob, k, v)
        ob.keyframe_insert(k, frame=f)

# harfler: yerden yükselir
LET_T = {'F': Ls + 50, 'O': Ls + 56, 'R': Ls + 62, 'N': Ls + 68}
letter_frames = {}
for ob in letters:
    nm = ob.name[-1]
    f0 = LET_T[nm]
    zs = Sig(-1.9).keys([(0, -1.9), (f0, -1.9, 'b'), (f0 + 13, 0.0)]).sample(N)
    # sonradan selam sıçraması
    wf = Ls + 104 + 4 * 'FORN'.index(nm)
    hop = Sig(0.0).keys([(wf, 0.0), (wf + 4, 0.16, 'o'), (wf + 9, 0.0, 'i'), (wf + 12, 0.0)]).sample(N)
    ssz = Sig(1.0).keys([(f0, 1.0), (f0 + 6, 1.18, 'e'), (f0 + 13, 1.0, 'e'), (f0 + 16, 0.86, 'e'), (f0 + 21, 1.03, 'e'), (f0 + 27, 1.0),
                         (wf, 1.0), (wf + 3, 0.9, 'e'), (wf + 6, 1.08, 'e'), (wf + 11, 1.0)]).sample(N)
    rz = Sig(0.0).keys([(f0, 0.0), (f0 + 8, 3.5 * (1 if nm in 'FR' else -1), 'e'), (f0 + 20, 0.0, 'e')]).sample(N)
    for f in range(N):
        ob.location.z = float(zs[f] + hop[f])
        s_ = float(ssz[f]); ob.scale = (1.0 / math.sqrt(s_), 1.0, s_)
        ob.rotation_euler = (0.0, math.radians(float(rz[f])), 0.0)
        ob.keyframe_insert('location', frame=f); ob.keyframe_insert('scale', frame=f); ob.keyframe_insert('rotation_euler', frame=f)
    letter_frames[nm] = f0
anim.EVENTS['letters'] = LET_T

# kıvılcımlar
mstar, _ = principled('Star', (1, 0.95, 0.7, 1), rough=0.5, emission=(1.0, 0.92, 0.55, 1), emit_strength=6.0)
star_src = env.star_mesh(C)
star_src.data.materials.append(mstar)
stars = []
SP = {'F': [(-0.45, 1.25), (0.4, 1.5)], 'O': [(-0.5, 1.4), (0.5, 1.1)], 'R': [(-0.4, 1.5), (0.55, 1.25)], 'N': [(-0.45, 1.2), (0.5, 1.45)]}
for ob in letters:
    nm = ob.name[-1]
    f0 = LET_T[nm]
    for j, (dx, dz) in enumerate(SP[nm]):
        st = star_src.copy(); st.data = star_src.data
        C.objects.link(st)
        st.location = (ob.location.x + dx, -0.25, dz)
        f1 = f0 + 10 + 3 * j
        sc_ = Sig(0.0).keys([(f1 - 1, 0.0), (f1 + 4, 0.34 - 0.08 * j, 'o'), (f1 + 16, 0.0, 'i')]).sample(N)
        rot = Sig(0.0).keys([(f1 - 1, 0.0), (f1 + 16, 90.0 * (1 if j == 0 else -1))]).sample(N)
        for f in range(f1 - 2, min(N, f1 + 18)):
            st.scale = (float(sc_[f]),) * 3
            st.rotation_euler = (math.radians(90), 0.0, math.radians(float(rot[f])))
            st.keyframe_insert('scale', frame=f); st.keyframe_insert('rotation_euler', frame=f)
        st.scale = (0, 0, 0); st.keyframe_insert('scale', frame=0)
        st.rotation_euler = (math.radians(90), 0, 0)
bpy.data.objects.remove(star_src)

# Zzz
import lib as _lib
font = bpy.data.fonts.load(os.path.join(HERE, 'fonts', 'ArchivoBlack-Regular.ttf'))
mblack = bpy.data.materials['Letter_Black']
for i, (f0, sz_) in enumerate(((3, 0.34), (20, 0.44), (37, 0.56))):
    cu = bpy.data.curves.new('z%d' % i, 'FONT'); cu.body = 'Z' if i == 2 else 'z'; cu.font = font; cu.size = sz_
    cu.extrude = 0.03; cu.bevel_depth = 0.006; cu.align_x = 'CENTER'
    to = bpy.data.objects.new('z%d_tmp' % i, cu); C.objects.link(to)
    me = eval_mesh(to, 'zmesh%d' % i); bpy.data.objects.remove(to)
    zo = bpy.data.objects.new('Zzz_%d' % i, me); C.objects.link(zo)
    for v in me.vertices:
        v.co = Vector((v.co.x, -v.co.z, v.co.y))
    me.materials.append(mblack); set_smooth(zo)
    x0, z0 = env.CHAR_X + 0.85, 3.0 + 0.1 * i
    zs_ = Sig().keys([(0, 0.0), (6, 1.0, 'o'), (36, 1.0), (52, 0.0, 'i')]).sample(53)
    for f in range(f0 - 1, min(N, f0 + 60)):
        u = (f - f0) / 52.0
        s_ = float(zs_[max(0, min(len(zs_) - 1, f - f0))]) if 0 <= u <= 1 else 0.0
        zo.location = (x0 + 0.55 * u + 0.05 * math.sin(u * 9), -0.35, z0 + 0.65 * u)
        zo.scale = (s_, s_, s_); zo.rotation_euler = (0, math.radians(-10 + 20 * math.sin(u * 6)), 0)
        zo.keyframe_insert('location', frame=f); zo.keyframe_insert('scale', frame=f); zo.keyframe_insert('rotation_euler', frame=f)
    zo.scale = (0, 0, 0); zo.keyframe_insert('scale', frame=0)

# toz bulutları (iniş)
mdust = new_mat('Dust')
_nt = mdust.node_tree
_o = _nt.nodes.new('ShaderNodeOutputMaterial'); _d = _nt.nodes.new('ShaderNodeBsdfDiffuse'); _t = _nt.nodes.new('ShaderNodeBsdfTransparent'); _mx = _nt.nodes.new('ShaderNodeMixShader')
_d.inputs['Color'].default_value = hexcol('#FFF6E4'); _mx.inputs['Fac'].default_value = 0.55
_nt.links.new(_t.outputs[0], _mx.inputs[1]); _nt.links.new(_d.outputs[0], _mx.inputs[2]); _nt.links.new(_mx.outputs[0], _o.inputs['Surface'])
for _a in ('visible_shadow',): pass
rng = np.random.RandomState(11)
for i in range(11):
    a_ = 2 * math.pi * i / 11 + rng.uniform(-0.2, 0.2)
    d = bpy.data.objects.new('Dust_%d' % i, bpy.data.meshes.new('dust%d' % i))
    bm = bmesh.new(); bmesh.ops.create_uvsphere(bm, u_segments=20, v_segments=12, radius=1.0); bm.to_mesh(d.data); bm.free()
    C.objects.link(d); set_smooth(d); d.data.materials.append(mdust); d.visible_shadow = False
    dist = rng.uniform(0.45, 0.95); r0 = rng.uniform(0.07, 0.11)
    cx_, cy_ = env.CHAR_X, anim.STAND_Y
    for f in range(Ls - 1, Ls + 18):
        u = (f - Ls) / 15.0
        uu = max(0.0, min(1.0, u))
        ease = 1 - (1 - uu) ** 3
        s_ = r0 * (2.6 * ease) * (1 - max(0.0, (uu - 0.35) / 0.65) ** 1.5) if uu > 0 else 0.0
        d.location = (cx_ + math.cos(a_) * dist * ease, cy_ + math.sin(a_) * dist * ease * 0.6, 0.06 + 0.10 * ease)
        d.scale = (s_, s_, s_ * 0.7)
        d.keyframe_insert('location', frame=f); d.keyframe_insert('scale', frame=f)
    d.scale = (0, 0, 0); d.keyframe_insert('scale', frame=0); d.keyframe_insert('scale', frame=Ls + 18)

sc.frame_set(0)
json.dump(anim.EVENTS, open(os.path.join(HERE, 'events.json'), 'w'))
for fnt in list(bpy.data.fonts):
    if fnt.users == 0: bpy.data.fonts.remove(fnt)
bpy.data.orphans_purge(do_recursive=True)
try:
    bpy.ops.file.pack_all()
except Exception as ex:
    print('pack', ex)
sc.cycles.samples = 64
sc.render.filepath = '//render/f_'
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(HERE, 'maskot_work.blend'))
print('OK maskot_work.blend', anim.EVENTS)
