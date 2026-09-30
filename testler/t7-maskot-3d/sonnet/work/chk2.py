import bpy, math
from mathutils import Vector
bpy.ops.wm.open_mainfile(filepath='char.blend')
rig = bpy.data.objects['Forn_Rig']
bpy.context.view_layer.update()
def dev():
    r = {}
    for n in ('forearm.L','shin.L','forearm.R','shin.R','hand.L','foot.L'):
        pb = rig.pose.bones[n]; b = rig.data.bones[n]
        r[n] = round((pb.head - b.head_local).length, 4)
    return r
for ang in (0, 90, -90, 180):
    for n in ('forearm.L','forearm.R','shin.L','shin.R'):
        c = [c for c in rig.pose.bones[n].constraints if c.type=='IK'][0]
        c.pole_angle = math.radians(ang)
    bpy.context.view_layer.update()
    print(ang, dev())
