import bpy, sys, os
argv = sys.argv[sys.argv.index('--')+1:]
blend, outdir, f0, f1 = argv[0], argv[1], int(argv[2]), int(argv[3])
step = int(argv[4]) if len(argv) > 4 else 1
bpy.ops.wm.open_mainfile(filepath=blend)
_p = bpy.context.preferences.addons['cycles'].preferences
_p.compute_device_type = 'OPTIX'; _p.get_devices()
for _d in _p.devices: _d.use = (_d.type == 'OPTIX')
bpy.context.scene.cycles.device = 'GPU'
sc = bpy.context.scene
sc.render.image_settings.file_format = 'PNG'
os.makedirs(outdir, exist_ok=True)
for f in range(f0, f1 + 1, step):
    p = os.path.join(outdir, 'f%04d.png' % f)
    if os.path.exists(p): continue
    sc.frame_set(f)
    sc.render.filepath = p
    bpy.ops.render.render(write_still=True)
