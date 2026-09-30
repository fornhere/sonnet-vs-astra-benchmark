import bpy, sys, os
# usage: closeup.py -- blend out frame cx,cy,cz tx,ty,tz [w] [samples]
argv = sys.argv[sys.argv.index('--')+1:]
blend, out, f = argv[0], argv[1], int(argv[2])
cp = [float(v) for v in argv[3].split(',')]; tp = [float(v) for v in argv[4].split(',')]
w = int(argv[5]) if len(argv) > 5 else 960
samples = int(argv[6]) if len(argv) > 6 else 48
bpy.ops.wm.open_mainfile(filepath=blend)
_p = bpy.context.preferences.addons['cycles'].preferences
_p.compute_device_type = 'OPTIX'; _p.get_devices()
for _d in _p.devices: _d.use = (_d.type == 'OPTIX')
bpy.context.scene.cycles.device = 'GPU'
sc = bpy.context.scene
sc.render.resolution_x = w; sc.render.resolution_y = int(w*9/16)
sc.cycles.samples = samples
sc.frame_set(f)
cam = bpy.data.objects['Camera']; tgt = bpy.data.objects['CamTarget']
cam.animation_data_clear(); tgt.animation_data_clear(); cam.data.animation_data_clear()
cam.location = cp; tgt.location = tp
sc.render.filepath = out
bpy.ops.render.render(write_still=True)
