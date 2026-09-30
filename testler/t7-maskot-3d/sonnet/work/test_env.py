import sys, os, math
sys.path.insert(0, '/home/forn/sonnet-vs-astra/t7-maskot-3d/sonnet/work')
import bpy
from mathutils import Vector
import env, poselib as pl
from lib import *
bpy.ops.wm.open_mainfile(filepath='/home/forn/sonnet-vs-astra/t7-maskot-3d/sonnet/work/char.blend')
sc = bpy.context.scene
C = collection('Set')
env.setup_render(sc, 1280, 720, 64)
env.cyclorama(C)
mline = bpy.data.materials['Forn_Outline']
env.peg(C, mline)
L = env.letters(C, mline)
for o in L:
    print(o.name, o.location, [round(x,2) for x in o.dimensions])
env.lights(C)
cam, tgt = env.camera(C)
cam.location = (0.4, -11.5, 2.2); tgt.location = (0.4, 0, 1.5)
rig = pl.init()
rig.pose.bones['root'].location = (env.CHAR_X, env.CHAR_Y, 0)
pl.hand_pose('L', 0.3, 0, 0.3); pl.hand_pose('R', 0.3, 0, 0.3)
pl.face(look_x=0.0)
sc.render.filepath = '/home/forn/sonnet-vs-astra/t7-maskot-3d/sonnet/work/test/env.png'
bpy.ops.render.render(write_still=True)
