import bpy
bpy.ops.wm.open_mainfile(filepath='char.blend')
dg = bpy.context.evaluated_depsgraph_get()
for n in ('Forn_Body','Forn_Arm.L','Forn_Shoe.L'):
    o = bpy.data.objects[n]
    ev = o.evaluated_get(dg)
    m = ev.to_mesh()
    print(n, len(o.data.vertices), len(m.vertices), [ (mod.name, mod.show_render, mod.show_viewport) for mod in o.modifiers], [(x.name if x else None) for x in o.data.materials])
    import collections
    print(collections.Counter(p.material_index for p in m.polygons))
