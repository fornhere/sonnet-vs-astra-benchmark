"""Optional cover art and an exterior RPG overview, from the final Blender scene."""
import bpy,os,math
from mathutils import Vector
r=os.path.dirname(os.path.abspath(__file__));s=bpy.context.scene
s.render.compositor_device='CPU';s.render.use_persistent_data=True;s.cycles.samples=40
s.frame_set(165);s.render.resolution_x=1920;s.render.resolution_y=1080
s.render.filepath=os.path.join(r,'kapak.png');bpy.ops.render.render(write_still=True)
for m in s.timeline_markers:m.camera=None
s.camera=bpy.data.objects['MAP / orthographic courtyard plan'];s.camera.data.ortho_scale=57
s.world.node_tree.nodes.get('Background').inputs['Strength'].default_value=.28
bpy.data.objects['Sun / late amber'].rotation_euler.x=math.radians(35)
s.render.resolution_x=1600;s.render.resolution_y=1600;s.render.use_compositing=False
s.render.filepath=os.path.join(r,'avlu_plani.png');bpy.ops.render.render(write_still=True)
