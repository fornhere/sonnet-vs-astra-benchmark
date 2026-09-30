"""Render original camera animation. Resume-safe: existing PNGs are skipped.
Usage: blender -b sato.blend --python render_film.py -- [start] [end] [step]
"""
import bpy, os, sys, time
root=os.path.dirname(os.path.abspath(__file__))
args=sys.argv[sys.argv.index('--')+1:] if '--' in sys.argv else []
start=int(args[0]) if len(args)>0 else 1
end=int(args[1]) if len(args)>1 else 576
step=int(args[2]) if len(args)>2 else 3
s=bpy.context.scene
s.render.resolution_x=1280;s.render.resolution_y=720;s.render.resolution_percentage=100
s.cycles.samples=6;s.cycles.adaptive_threshold=.12
s.cycles.denoising_quality='BALANCED';s.cycles.denoising_prefilter='FAST'
s.cycles.max_bounces=2;s.cycles.diffuse_bounces=1;s.cycles.glossy_bounces=1
# At delivery resolution, physical ashlar supplies the readable surface relief.
# Reduce sub-pixel bump evaluation in the animation; the source .blend retains it.
for material in bpy.data.materials:
    if not material.use_nodes:continue
    nt=material.node_tree
    for node in nt.nodes:
        if node.type=='TEX_NOISE':node.inputs['Detail'].default_value=1
        if node.type=='BSDF_PRINCIPLED' and not material.name.startswith('Sea'):
            for link in list(node.inputs['Normal'].links):nt.links.remove(link)
s.render.use_persistent_data=True
s.render.threads=8
for f in range(start,end+1,step):
    path=os.path.join(root,'renders',f'frame_{f:04d}.png')
    if os.path.exists(path):continue
    t=time.time();s.frame_set(f);s.render.filepath=path
    bpy.ops.render.render(write_still=True)
    print(f'FRAME {f} • {time.time()-t:.2f}s',flush=True)
