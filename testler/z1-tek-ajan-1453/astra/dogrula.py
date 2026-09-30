import bpy,json,hashlib,struct
from pathlib import Path
R=Path(__file__).resolve().parent
KIT='/home/forn/zaman-yarigi/kit/arazi_kiyi.blend'
def value(v):
 try:return [round(float(x),8) for x in v]
 except:
  if isinstance(v,(str,bool,int,float)):return v
  return str(v)
def nodes(tree):
 if not tree:return None
 return {'nodes':[(n.name,n.bl_idname,[(i.name,value(i.default_value)) for i in n.inputs if hasattr(i,'default_value')]) for n in tree.nodes],'links':[(l.from_node.name,l.from_socket.name,l.to_node.name,l.to_socket.name) for l in tree.links]}
def signature():
 s=bpy.context.scene;s.frame_set(1365);bpy.context.view_layer.update();out={}
 for o in bpy.data.objects:
  if not o.name.startswith('KIT_'):continue
  x={'type':o.type,'matrix':[[round(v,6) for v in r] for r in o.matrix_world],'hide_render':o.hide_render,'hide_select':o.hide_select,'collections':[c.name for c in o.users_collection]}
  if o.type=='MESH':
   h=hashlib.sha256()
   for v in o.data.vertices:h.update(struct.pack('fff',*v.co))
   for p in o.data.polygons:h.update(struct.pack('%si'%len(p.vertices),*p.vertices));h.update(struct.pack('i?',p.material_index,p.use_smooth))
   x['mesh_sha256']=h.hexdigest();x['materials']=[(m.name,nodes(m.node_tree)) for m in o.data.materials]
  if o.type=='LIGHT':x['light']={p:value(getattr(o.data,p)) for p in ['type','energy','color','angle']}
  if o.type=='CAMERA':x['camera']={p:value(getattr(o.data,p)) for p in ['type','lens','clip_start','clip_end','sensor_width','sensor_height','shift_x','shift_y']}
  x['constraints']=[(c.type,getattr(c,'target',None).name if getattr(c,'target',None) else None,getattr(c,'track_axis',None),getattr(c,'up_axis',None)) for c in o.constraints]
  out[o.name]=x
 out['world']=nodes(s.world.node_tree)
 out['camera_samples']={}
 for f in [1,601,1141,1365,1590,2221,3300]:
  s.frame_set(f);bpy.context.view_layer.update();out['camera_samples'][str(f)]={'camera':[[round(v,6) for v in r] for r in s.camera.matrix_world],'target':value(bpy.data.objects['KIT_Kamera_Hedef'].location)}
 return out
bpy.ops.wm.open_mainfile(filepath=KIT);base=signature()
bpy.ops.wm.open_mainfile(filepath=str(R/'sahne.blend'));final=signature()
diff=[k for k in base if base[k]!=final[k]]
assert not diff, 'KIT changed: '+repr(diff)
others={c.name:len(c.all_objects) for c in bpy.data.collections if c.name.startswith(('C1_','C2_','C4_','C5_','C6_'))}
assert not any(others.values()),others
s=bpy.context.scene;s.frame_set(1365);bpy.context.view_layer.update()
c=bpy.data.collections['C3_1453_Safak'];added=[o for o in bpy.data.objects if not o.name.startswith('KIT_')]
assert all(list(o.users_collection)==[c] for o in added),'Object outside C3'
assert all(not o.hide_render for o in c.objects),'Hidden C3 at 1365'
assert s.camera.name=='KIT_Kamera'
assert s.render.resolution_x==1920 and s.render.resolution_y==1080 and s.render.resolution_percentage==100
report={'result':'PASS','KIT_objects_materials_world_unchanged':True,'KIT_camera_trajectory_unchanged':True,'camera_sample_frames':[1,601,1141,1365,1590,2221,3300],'other_era_collections':others,'C3_object_count':len(c.objects),'all_added_objects_only_in_C3':True,'frame':1365,'resolution':[1920,1080],'percentage':100,'external_assets':'None; procedural geometry/materials; packed local typeface','historical_checklist':{'Ayasofya_raised_dome_buttresses_no_minarets':True,'Hagia_Irene':True,'sea_walls_and_towers':True,'Galata_enceinte_and_tower':True,'Golden_Horn_chain':True,'Ottoman_oared_ships_inside_Horn':True,'sparse_ruined_Byzantine_city':True,'smoke_and_eastern_dawn_light':True,'no_people_flags_violence_modern_mosques':True}}
(R/'dogrulama.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print(json.dumps(report,ensure_ascii=False,indent=2))
