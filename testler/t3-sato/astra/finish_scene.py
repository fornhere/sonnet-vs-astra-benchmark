"""Production setup: local asset origins, object grouping, camera QA and stills."""
import bpy,os,sys
from mathutils import Vector
from collections import defaultdict
root=os.path.dirname(os.path.abspath(__file__));s=bpy.context.scene
groups=defaultdict(list)
for ob in list(bpy.data.objects):
    if ob.type=='MESH' and 'asset_part' in ob:groups[ob['asset_part']].append(ob)
for name,objects in groups.items():
    verts=[Vector(v) for ob in objects for v in ob.bound_box]
    lo=Vector(tuple(min(v[i] for v in verts) for i in range(3)));hi=Vector(tuple(max(v[i] for v in verts) for i in range(3)))
    center=(lo+hi)/2
    parent=bpy.data.objects.new(name+' • ASSET',None);objects[0].users_collection[0].objects.link(parent)
    parent.empty_display_type='PLAIN_AXES';parent.empty_display_size=.65;parent.location=center
    for ob in objects:
        for v in ob.data.vertices:v.co-=center
        ob.parent=parent
    if 'gulls' in name:
        parent.keyframe_insert('location',frame=1);parent.location.x-=18;parent.location.y+=4;parent.keyframe_insert('location',frame=576)
# Keep a single canonical, fully portable file, with the film settings ready to use.
s.render.resolution_x=1280;s.render.resolution_y=720;s.cycles.samples=24
s.render.compositor_device='CPU';s.render.use_persistent_data=True
s.frame_set(110);s.render.filepath='//renders/frame_'
readme=bpy.data.texts.new('READ ME • KARAKIYI')
readme.write('KARAKIYI — THE TIDAL CROWN\n\nOriginal exterior environment. 1 Blender unit = 1 metre.\nAll geometry and procedural materials are local. No downloads or plug-ins.\nEach named ASSET empty moves its corresponding architectural module.\nCollections 00–13: environment / architecture / dressing.\n90: lights. 91: cameras.\n\n24 fps / 576 frames / three camera markers.\n1–240 Arrival; 241–408 Gate; 409–576 Rising orbit.\nAdditional STILL and MAP cameras are supplied.\nFor a GPU render, select a working OptiX device in Preferences, then GPU Compute.\n\nExterior art asset. Solid masonry, decorative window recesses; no furnished interior, game collisions, UV baking or LODs.\nSee TESLIM.md for commands and delivery notes.\n')
for screen in bpy.data.screens:
    for area in screen.areas:
        if area.type=='VIEW_3D':
            sh=area.spaces.active.shading
            sh.type='SOLID';sh.color_type='MATERIAL';sh.show_cavity=True;sh.cavity_type='BOTH'
            sh.curvature_ridge_factor=1.4;sh.curvature_valley_factor=1.2
            sh.background_type='VIEWPORT';sh.background_color=(.035,.052,.061)
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(root,'sato.blend'))
s.render.resolution_x=960;s.render.resolution_y=540;s.cycles.samples=10
for f in ([] if '--no-preview' in sys.argv else [1,408,409,576]):
    s.frame_set(f);s.render.filepath=os.path.join(root,'previews',f'final_{f:04d}.png')
    bpy.ops.render.render(write_still=True)
    print('CHECKED',f,flush=True)
