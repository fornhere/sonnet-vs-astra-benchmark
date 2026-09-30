"""blender -b maskot.blend --python kaynak/render.py -- 64 1920
Varsa OPTIX, yoksa CPU. PNG dizisini kareler/ içine yazar.
"""
import bpy, sys, os
s=bpy.context.scene
args=sys.argv[sys.argv.index('--')+1:] if '--' in sys.argv else []
s.cycles.device='CPU'
s.cycles.samples=int(args[0]) if args else 64
width=int(args[1]) if len(args)>1 else 1920
s.render.resolution_x=width;s.render.resolution_y=round(width*9/16)
try:
 p=bpy.context.preferences.addons['cycles'].preferences;p.compute_device_type='OPTIX';p.get_devices()
 gpu=[d for d in p.devices if d.type=='OPTIX']
 if gpu:
  for d in p.devices:d.use=d.type=='OPTIX'
  s.cycles.device='GPU'
except Exception: s.cycles.device='CPU'
s.render.resolution_percentage=100;s.render.filepath='//kareler/forn_';s.render.image_settings.file_format='PNG'
s.render.use_persistent_data=True
os.makedirs(bpy.path.abspath('//kareler'),exist_ok=True)
bpy.ops.render.render(animation=True)
