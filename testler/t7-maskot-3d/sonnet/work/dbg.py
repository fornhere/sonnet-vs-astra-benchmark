import bpy
bpy.ops.wm.open_mainfile(filepath='maskot.blend')
sc = bpy.context.scene
for f in (96, 100, 104):
    sc.frame_set(f)
    dg = bpy.context.evaluated_depsgraph_get()
    for n in ('Face_Iris','Face_Pupil','Face_EyeWhite'):
        o = bpy.data.objects[n].evaluated_get(dg)
        print(f, n, [round(x,3) for x in o.matrix_world.translation], [round(x,3) for x in o.matrix_world.to_scale()], len(o.data.vertices) if hasattr(o.data,'vertices') else '')
    fb = bpy.data.objects['Forn_Rig'].pose.bones['face']
    print({k: round(fb[k],3) for k in ('lid','iris_size','pupil_size','look_x','look_y')})
