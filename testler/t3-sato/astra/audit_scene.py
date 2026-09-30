import bpy,json,os
from pathlib import Path
s=bpy.context.scene;r=Path(__file__).resolve().parent
report={
 'blender_version':bpy.app.version_string,
 'scene':s['title'],
 'mesh_objects':sum(o.type=='MESH' for o in s.objects),
 'polygons':sum(len(o.data.polygons) for o in s.objects if o.type=='MESH'),
 'vertices':sum(len(o.data.vertices) for o in s.objects if o.type=='MESH'),
 'materials':len(bpy.data.materials),
 'camera_count':sum(o.type=='CAMERA' for o in s.objects),
 'modular_groups':sum(o.type=='EMPTY' for o in s.objects),
 'timeline':{'start':s.frame_start,'end':s.frame_end,'fps':s.render.fps},
 'camera_cuts':[{'frame':m.frame,'camera':m.camera.name if m.camera else None} for m in s.timeline_markers],
 'external_file_images':[im.filepath for im in bpy.data.images if im.source=='FILE' and not im.packed_file],
 'missing_files':[im.filepath for im in bpy.data.images if im.source=='FILE' and not im.packed_file and not Path(bpy.path.abspath(im.filepath)).exists()],
 'render_engine':s.render.engine,
 'unit_system':s.unit_settings.system,
}
assert report['mesh_objects']>300
assert report['camera_count']==5
assert len(report['camera_cuts'])==3
assert not report['missing_files']
(r/'previews'/'scene_audit.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
print(json.dumps(report,ensure_ascii=False,indent=2))
