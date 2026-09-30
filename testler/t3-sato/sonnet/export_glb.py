"""Kale geometrisini (UV'li, materyal slotlu) GLB olarak disa aktarir: game-engine icin.
kullanim: blender -b sato.blend --python export_glb.py"""
import bpy, os
out = os.path.join(os.path.dirname(bpy.data.filepath), "sato_kale_geometri.glb")
bpy.ops.object.select_all(action="DESELECT")
n = 0
for name in ("Kale", "Koy"):
    for o in bpy.data.collections[name].all_objects:
        if o.type == "MESH":
            o.select_set(True)
            n += 1
bpy.context.view_layer.objects.active = [o for o in bpy.context.selected_objects][0]
bpy.ops.export_scene.gltf(filepath=out, export_format="GLB", use_selection=True, export_yup=True,
                          export_apply=False, export_materials="EXPORT", export_cameras=False, export_lights=False,
                          export_animations=False)
print("GLB", out, n)
