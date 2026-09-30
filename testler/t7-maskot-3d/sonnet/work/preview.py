import bpy, sys, os
argv = sys.argv[sys.argv.index('--')+1:]
blend = argv[0]; outdir = argv[1]; frames = [int(x) for x in argv[2].split(',')]
w = int(argv[3]) if len(argv) > 3 else 640
samples = int(argv[4]) if len(argv) > 4 else 24
bpy.ops.wm.open_mainfile(filepath=blend)
_p = bpy.context.preferences.addons['cycles'].preferences
_p.compute_device_type = 'OPTIX'; _p.get_devices()
for _d in _p.devices: _d.use = (_d.type == 'OPTIX')
bpy.context.scene.cycles.device = 'GPU'
sc = bpy.context.scene
sc.render.resolution_x = w; sc.render.resolution_y = int(w*9/16)
sc.cycles.samples = samples
sc.render.image_settings.file_format = 'PNG'
os.makedirs(outdir, exist_ok=True)
for f in frames:
    sc.frame_set(f)
    sc.render.filepath = os.path.join(outdir, 'f%04d.png' % f)
    bpy.ops.render.render(write_still=True)
