import bpy, json, os
s=bpy.context.scene
report={
 'blender':bpy.app.version_string,
 'scene_file':os.path.basename(bpy.data.filepath),
 'resolution':[s.render.resolution_x,s.render.resolution_y],
 'resolution_percentage':s.render.resolution_percentage,
 'render_engine':s.render.engine,
 'samples':s.cycles.samples,
 'cameras':len([o for o in s.objects if o.type=='CAMERA']),
 'active_camera':s.camera.name,
 'objects':len(s.objects),
 'meshes':len(bpy.data.meshes),
 'materials':len(bpy.data.materials),
 'external_images':[i.filepath for i in bpy.data.images if i.source=='FILE'],
 'linked_libraries':[l.filepath for l in bpy.data.libraries],
 'render_path':s.render.filepath,
}
print(json.dumps(report,ensure_ascii=False,indent=2))
assert report['resolution']==[1920,1080] and report['resolution_percentage']==100
assert report['cameras']==1
assert not report['external_images'] and not report['linked_libraries']
with open(os.path.join(os.path.dirname(bpy.data.filepath),'kontrol.json'),'w') as f:json.dump(report,f,ensure_ascii=False,indent=2)
