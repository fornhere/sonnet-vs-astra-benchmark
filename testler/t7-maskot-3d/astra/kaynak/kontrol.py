import bpy,json
from mathutils import Vector
from bpy_extras.object_utils import world_to_camera_view
s=bpy.context.scene
report={'resolution':[s.render.resolution_x,s.render.resolution_y],'fps':s.render.fps,'frame_range':[s.frame_start,s.frame_end],'objects':len(bpy.data.objects),'materials':len(bpy.data.materials),'packed_images':[],'packed_fonts':[],'packed_sounds':[],'shape_keys':[]}
for x in bpy.data.images:
 if x.packed_file:report['packed_images'].append(x.name)
for x in bpy.data.fonts:
 if x.packed_file:report['packed_fonts'].append(x.name)
for x in bpy.data.sounds:
 if x.packed_file:report['packed_sounds'].append(x.name)
for x in bpy.data.shape_keys:report['shape_keys']+=list(x.key_blocks.keys())
import numpy as np
mins=[1.,1.];maxs=[0.,0.];outside=[]
for fr in [1,12,25,70,145,192]:
 s.frame_set(fr);dg=bpy.context.evaluated_depsgraph_get()
 camera=s.camera.evaluated_get(dg);inv=camera.matrix_world.inverted()
 vf=camera.data.view_frame(scene=s);xmin=min(v.x for v in vf);xmax=max(v.x for v in vf);ymin=min(v.y for v in vf);ymax=max(v.y for v in vf)
 low=[1.,1.];high=[0.,0.]
 for ob in bpy.data.collections['01 · MASKOT'].objects:
  if ob.type not in {'MESH','CURVE'}:continue
  o=ob.evaluated_get(dg);mesh=o.to_mesh()
  if mesh and len(mesh.vertices):
   v=np.empty(len(mesh.vertices)*3,dtype=np.float64);mesh.vertices.foreach_get('co',v);v=v.reshape(-1,3)
   m=np.array(inv@o.matrix_world);v=v@m[:3,:3].T+m[:3,3]
   bounds=[((v[:,0].min()-xmin)/(xmax-xmin),(v[:,0].max()-xmin)/(xmax-xmin)),((v[:,1].min()-ymin)/(ymax-ymin),(v[:,1].max()-ymin)/(ymax-ymin))]
   for i in range(2):low[i]=min(low[i],float(bounds[i][0]));high[i]=max(high[i],float(bounds[i][1]))
  o.to_mesh_clear()
 for i in range(2):mins[i]=min(mins[i],low[i]);maxs[i]=max(maxs[i],high[i])
 if min(low)<0 or max(high)>1:outside.append({'frame':fr,'min':low,'max':high})
report['sampled_actual_surface_bounds']={'min':mins,'max':maxs};report['sampled_actual_surface_outside_camera']=outside
with open(bpy.path.abspath('//onizleme/sahne-kontrol.json'),'w') as f:json.dump(report,f,indent=2,ensure_ascii=False)
print('SCENE_CHECK',len(report['packed_images']),'packed reference,',len(outside),'sampled actual surface bounds outside camera')
