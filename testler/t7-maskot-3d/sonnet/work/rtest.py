import bpy, sys, math, os
from mathutils import Vector
argv = sys.argv[sys.argv.index('--')+1:]
src = argv[0]; outp = argv[1]; view = argv[2] if len(argv)>2 else 'front'
bpy.ops.wm.open_mainfile(filepath=src)
sc = bpy.context.scene
p = bpy.context.preferences.addons['cycles'].preferences
p.compute_device_type = 'OPTIX'; p.get_devices()
for d in p.devices: d.use = True
sc.render.engine = 'CYCLES'; sc.cycles.device = 'GPU'
sc.cycles.samples = 48; sc.cycles.use_denoising = True
sc.render.resolution_x, sc.render.resolution_y = 960, 540
sc.cycles.transparent_max_bounces = 12
# world
w = bpy.data.worlds.new('w'); sc.world = w; w.use_nodes = True
bg = w.node_tree.nodes['Background']; bg.inputs[0].default_value = (0.5,0.55,0.6,1); bg.inputs[1].default_value = 0.08
# floor
bpy.ops.mesh.primitive_plane_add(size=30, location=(0,0,0))
fl = bpy.context.object
m = bpy.data.materials.new('f'); m.use_nodes=True; m.node_tree.nodes['Principled BSDF'].inputs[0].default_value=(0.9,0.87,0.8,1)
fl.data.materials.append(m)
# lights
def area(loc, size, energy, target=Vector((0,0,1.2))):
    l = bpy.data.lights.new('a','AREA'); l.energy=energy; l.size=size
    o = bpy.data.objects.new('a', l); sc.collection.objects.link(o); o.location=loc
    d = target - Vector(loc); o.rotation_euler = d.to_track_quat('-Z','Y').to_euler()
area((-3,-4,4),3.5,220)
area((4,-3,2),2.5,120)
area((0,3,3),3,120)
cam = bpy.data.objects.new('cam', bpy.data.cameras.new('cam')); sc.collection.objects.link(cam); sc.camera = cam
cam.data.lens = 50
views = {
 'front': ((0,-6.5,1.25),(0,0,1.1)),
 'tq': ((3.5,-5.5,1.6),(0,0,1.0)),
 'side': ((6.5,0,1.2),(0,0,1.0)),
 'back': ((0,6.5,1.2),(0,0,1.1)),
 'face': ((0.3,-2.6,1.4),(0.05,0,1.35)),
 'hand': ((2.0,-1.6,0.6),(0.8,0,0.5)),
}
loc, tgt = views[view]
cam.location = loc
cam.rotation_euler = (Vector(tgt)-Vector(loc)).to_track_quat('-Z','Y').to_euler()
sc.render.filepath = outp
sc.render.image_settings.file_format='PNG'
if len(argv)>3:
    exec(open(argv[3]).read())
bpy.ops.render.render(write_still=True)
