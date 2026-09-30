import bpy, os
root=os.path.dirname(bpy.data.filepath)
s=bpy.context.scene
s.render.filepath='//kare.png'
s.unit_settings.system='METRIC'
s.camera.data.passepartout_alpha=.9
for screen in bpy.data.screens:
 for area in screen.areas:
  if area.type=='VIEW_3D':
   sp=area.spaces.active;sp.region_3d.view_perspective='CAMERA';sp.shading.type='SOLID';sp.shading.color_type='MATERIAL';sp.shading.show_cavity=True;sp.clip_end=14000
for i,c in enumerate(bpy.data.collections):
 if c.name[:2].isdigit():c.color_tag='COLOR_%02d'%((i%8)+1)
for name in ['TESLIM.md','sahne_uret.py','detay_ekle.py','son_isik.py','yuzeyler.py']:
 p=os.path.join(root,name)
 if os.path.exists(p):
  text=bpy.data.texts.get(name) or bpy.data.texts.new(name);text.clear();text.write(open(p).read())
bpy.context.preferences.filepaths.save_version=0
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(root,'sahne.blend'),compress=True)
print('PORTABLE BLEND SAVED')
