import bpy, math
from mathutils import Vector, Matrix, Quaternion, Euler

rig = None
def init():
    global rig
    rig = bpy.data.objects['Forn_Rig']
    for pb in rig.pose.bones:
        pb.rotation_mode = 'QUATERNION'
    return rig

def rest_rot(name):
    return rig.data.bones[name].matrix_local.to_3x3()

def set_loc(name, target=None, delta=None):
    """target: dünya konumu (dinlenme baş noktasına göre delta hesaplanır). delta: dünya ofseti."""
    b = rig.data.bones[name]
    if delta is None:
        delta = Vector(target) - b.head_local
    rig.pose.bones[name].location = rest_rot(name).inverted() @ Vector(delta)

def set_rot(name, Rw=None, euler_deg=None, world_axes=True):
    """Rw: dünya dönüşü (3x3 Matrix / Quaternion / Euler). Kemik yerel çerçevesine çevrilir."""
    if Rw is None:
        Rw = Euler([math.radians(a) for a in euler_deg], 'XYZ').to_matrix()
    if isinstance(Rw, Euler): Rw = Rw.to_matrix()
    if isinstance(Rw, Quaternion): Rw = Rw.to_matrix()
    Rb = rest_rot(name)
    L = Rb.inverted() @ Rw @ Rb
    rig.pose.bones[name].rotation_quaternion = L.to_quaternion()

def set_local_rot(name, x=0, y=0, z=0):
    """Kemik-yerel euler (derece)."""
    rig.pose.bones[name].rotation_quaternion = Euler((math.radians(x), math.radians(y), math.radians(z)), 'XYZ').to_quaternion()

FING = ['idx', 'mid', 'rng', 'pnk']
def hand_pose(side, curl=0.3, spread=0.0, thumb=0.3, per=None):
    """curl 0..1 (1 = yumruk). per: parmak başına ek curl listesi."""
    for fi, f in enumerate(FING):
        c = curl + (per[fi] if per else 0)
        for si in range(3):
            n = '%s%d.%s' % (f, si + 1, side)
            ang = c * (70 if si == 0 else 95 if si == 1 else 75)
            sp = spread * (fi - 1.5) * 9 if si == 0 else 0
            rig.pose.bones[n].rotation_quaternion = Euler((math.radians(ang), 0, math.radians(sp)), 'XYZ').to_quaternion()
    for i in range(3):
        n = 'thm%d.%s' % (i + 1, side)
        ang = thumb * (35 if i == 0 else 45 if i == 1 else 40)
        rig.pose.bones[n].rotation_quaternion = Euler((math.radians(ang), 0, 0), 'XYZ').to_quaternion()

def face(**kw):
    fb = rig.pose.bones['face']
    for k, v in kw.items():
        fb[k] = float(v)

def key_all(frame, names=None):
    for pb in rig.pose.bones:
        if names and pb.name not in names:
            continue
        pb.keyframe_insert('location', frame=frame)
        pb.keyframe_insert('rotation_quaternion', frame=frame)
        pb.keyframe_insert('scale', frame=frame)
