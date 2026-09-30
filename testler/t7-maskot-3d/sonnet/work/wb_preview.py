import bpy, sys, os
argv = sys.argv[sys.argv.index('--')+1:]
blend, outdir, f0, f1 = argv[0], argv[1], int(argv[2]), int(argv[3])
step = int(argv[4]) if len(argv) > 4 else 1
w = int(argv[5]) if len(argv) > 5 else 640
bpy.ops.wm.open_mainfile(filepath=blend)
sc = bpy.context.scene
sc.render.engine = 'BLENDER_WORKBENCH'
sc.render.resolution_x = w; sc.render.resolution_y = int(w*9/16)
sc.display.shading.light = 'STUDIO'
sc.display.shading.color_type = 'MATERIAL'
sc.display.shading.show_object_outline = True
sc.display.shading.object_outline_color = (0,0,0)
sc.render.image_settings.file_format = 'PNG'
sc.view_settings.view_transform = 'Standard'
for m in bpy.data.materials:
    n = m.name
    col = None
    if m.node_tree:
        for nd in m.node_tree.nodes:
            if nd.type == 'BSDF_PRINCIPLED':
                col = tuple(nd.inputs['Base Color'].default_value)
    if n == 'Cyclorama': col = (0.9, 0.5, 0.05, 1)
    if n == 'Forn_Iris': col = (0.2, 0.6, 1.0, 1)
    if n == 'Forn_Outline': col = (0, 0, 0, 1)
    if col: m.diffuse_color = col
os.makedirs(outdir, exist_ok=True)
for f in range(f0, f1+1, step):
    sc.frame_set(f)
    sc.render.filepath = os.path.join(outdir, 'f%04d.png' % f)
    bpy.ops.render.render(write_still=True)
