import bpy,os,time
r=os.path.dirname(os.path.abspath(__file__));s=bpy.context.scene
s.render.resolution_x=800;s.render.resolution_y=450;s.cycles.samples=8
s.render.compositor_device='CPU';s.render.use_persistent_data=True
for f in [1,240,241,325,408,409,492,576]:
    s.frame_set(f);s.render.filepath=os.path.join(r,'previews',f'shot_{f:04d}.png')
    bpy.ops.render.render(write_still=True)
    print('REVIEW',f,flush=True)
