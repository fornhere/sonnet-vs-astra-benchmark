"""Forn 3D — ortak yardımcılar (Blender 5.2)."""
import bpy, bmesh, math
from mathutils import Vector, Matrix, Euler, Quaternion

# ---------------------------------------------------------------- renk
def s2l(c):
    c = c / 255.0
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4

def hexcol(h, a=1.0):
    h = h.lstrip('#')
    r, g, b = int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)
    return (s2l(r), s2l(g), s2l(b), a)

# ---------------------------------------------------------------- sahne
def reset():
    bpy.ops.wm.read_factory_settings(use_empty=True)

def link(obj, coll=None):
    coll = coll or bpy.context.scene.collection
    coll.objects.link(obj)
    return obj

def collection(name, parent=None):
    c = bpy.data.collections.get(name)
    if c is None:
        c = bpy.data.collections.new(name)
        (parent or bpy.context.scene.collection).children.link(c)
    return c

def mesh_obj(name, verts, faces, coll=None, smooth=True, edges=None):
    me = bpy.data.meshes.new(name)
    me.from_pydata([tuple(v) for v in verts], edges or [], faces)
    me.update()
    if smooth and faces:
        me.polygons.foreach_set('use_smooth', [True] * len(me.polygons))
    ob = bpy.data.objects.new(name, me)
    link(ob, coll)
    return ob

def eval_mesh(ob, name=None):
    dg = bpy.context.evaluated_depsgraph_get()
    ev = ob.evaluated_get(dg)
    me = bpy.data.meshes.new_from_object(ev)
    if name:
        me.name = name
    return me

def bake_modifiers(ob, keep=()):
    """Modifier yığınını mesh'e uygula (keep listesindekiler hariç değil — hepsi)."""
    me = eval_mesh(ob, ob.data.name + '_baked')
    for m in list(ob.modifiers):
        ob.modifiers.remove(m)
    me.materials.clear()
    old = ob.data
    ob.data = me
    bpy.data.meshes.remove(old)
    return me

def set_smooth(ob):
    me = ob.data
    me.polygons.foreach_set('use_smooth', [True] * len(me.polygons))
    me.update()

# ---------------------------------------------------------------- malzeme
def new_mat(name):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    for n in list(nt.nodes):
        nt.nodes.remove(n)
    return m

def principled(name, base, rough=0.3, metallic=0.0, coat=0.0, coat_rough=0.05,
               sss=0.0, sss_col=None, sss_scale=0.05, spec=0.5, emission=None, emit_strength=0.0):
    m = new_mat(name)
    nt = m.node_tree
    out = nt.nodes.new('ShaderNodeOutputMaterial')
    bs = nt.nodes.new('ShaderNodeBsdfPrincipled')
    bs.inputs['Base Color'].default_value = base
    bs.inputs['Roughness'].default_value = rough
    bs.inputs['Metallic'].default_value = metallic
    bs.inputs['Coat Weight'].default_value = coat
    bs.inputs['Coat Roughness'].default_value = coat_rough
    bs.inputs['Subsurface Weight'].default_value = sss
    bs.inputs['Subsurface Scale'].default_value = sss_scale
    if sss_col is not None:
        bs.inputs['Subsurface Radius'].default_value = sss_col
    bs.inputs['Specular IOR Level'].default_value = spec
    if emission is not None:
        bs.inputs['Emission Color'].default_value = emission
        bs.inputs['Emission Strength'].default_value = emit_strength
    nt.links.new(bs.outputs['BSDF'], out.inputs['Surface'])
    return m, bs

def outline_material(name='Outline'):
    """Ters-kabuk çizgi: yalnız kamera ışınına, yalnız ön yüzü (çevirilmiş normal) siyah."""
    m = new_mat(name)
    nt = m.node_tree
    out = nt.nodes.new('ShaderNodeOutputMaterial')
    geo = nt.nodes.new('ShaderNodeNewGeometry')
    lp = nt.nodes.new('ShaderNodeLightPath')
    em = nt.nodes.new('ShaderNodeEmission')
    em.inputs['Color'].default_value = (0.0, 0.0, 0.0, 1)
    tr = nt.nodes.new('ShaderNodeBsdfTransparent')
    inv = nt.nodes.new('ShaderNodeMath'); inv.operation = 'SUBTRACT'
    inv.inputs[0].default_value = 1.0
    nt.links.new(lp.outputs['Is Camera Ray'], inv.inputs[1])
    mx = nt.nodes.new('ShaderNodeMath'); mx.operation = 'MAXIMUM'
    nt.links.new(geo.outputs['Backfacing'], mx.inputs[0])
    nt.links.new(inv.outputs[0], mx.inputs[1])
    mix = nt.nodes.new('ShaderNodeMixShader')
    nt.links.new(mx.outputs[0], mix.inputs['Fac'])
    nt.links.new(em.outputs[0], mix.inputs[1])
    nt.links.new(tr.outputs[0], mix.inputs[2])
    nt.links.new(mix.outputs[0], out.inputs['Surface'])
    return m

def add_outline(ob, mat_outline, thickness=0.012):
    """Solidify ters-kabuk. Nesne slotları: [ana, outline]."""
    if len(ob.data.materials) == 1:
        ob.data.materials.append(mat_outline)
    m = ob.modifiers.new('Outline', 'SOLIDIFY')
    m.thickness = thickness
    m.offset = 1.0
    m.use_flip_normals = True
    m.use_rim = True
    m.use_even_offset = True
    m.material_offset = 1
    m.material_offset_rim = 1
    return m

# ---------------------------------------------------------------- 2B yüzey parçaları
def polar_grid(name, rx, rz, cx=0.0, cz=0.0, rings=8, segs=56, coll=None):
    verts = [(cx, 0.0, cz)]
    for k in range(1, rings + 1):
        r = k / rings
        for s in range(segs):
            a = 2 * math.pi * s / segs
            verts.append((cx + rx * r * math.cos(a), 0.0, cz + rz * r * math.sin(a)))
    faces = []
    for s in range(segs):
        faces.append((0, 1 + s, 1 + (s + 1) % segs))
    for k in range(1, rings):
        b0 = 1 + (k - 1) * segs
        b1 = 1 + k * segs
        for s in range(segs):
            s2 = (s + 1) % segs
            faces.append((b0 + s, b1 + s, b1 + s2, b0 + s2))
    # bakış yönü: CCW (x,z) => normal -Y ; yukarıdaki sıralama CCW
    return mesh_obj(name, verts, faces, coll)

def strip_coords(P, nu=30, nv=6):
    L, t, pw = P['L'], P['t'], P.get('pw', 4.0)
    cx, cz = P.get('cx', 0.0), P.get('cz', 0.0)
    tilt = math.radians(P.get('tilt', 0.0))
    arch = P.get('arch', 0.0)
    vee = P.get('vee', 0.0)
    out = []
    ct, st = math.cos(tilt), math.sin(tilt)
    for j in range(nv + 1):
        v = j / nv * 2 - 1
        for i in range(nu + 1):
            u = i / nu * 2 - 1
            au = min(abs(u), 1.0)
            prof = (1 - au ** pw) ** (1 / pw)
            x = u * L / 2
            z = arch * (1 - u * u) + vee * au + v * t / 2 * prof
            out.append(Vector((cx + x * ct - z * st, 0.0, cz + x * st + z * ct)))
    return out

def strip_obj(name, P, nu=30, nv=6, coll=None):
    co = strip_coords(P, nu, nv)
    faces = []
    for j in range(nv):
        for i in range(nu):
            a = j * (nu + 1) + i
            faces.append((a, a + 1, a + nu + 2, a + nu + 1))
    return mesh_obj(name, co, faces, coll), co

def dome_coords(P, nu=36, nv=8):
    """Yarım elips kapak: koordinat = (u,v) -> akor + kubbe."""
    a, zc, b, s = P['a'], P['zc'], P['b'], P['slope']
    cx = P.get('cx', 0.0)
    out = []
    for j in range(nv + 1):
        v = j / nv
        for i in range(nu + 1):
            u = math.cos(math.pi * (1 - i / nu))   # -1..1, uçlarda sık
            x = cx + a * u
            z = zc + s * a * u + b * v * math.sqrt(max(0.0, 1 - u * u))
            out.append(Vector((x, 0.0, z)))
    return out

def dome_obj(name, P, nu=36, nv=8, coll=None):
    co = dome_coords(P, nu, nv)
    faces = []
    for j in range(nv):
        for i in range(nu):
            a = j * (nu + 1) + i
            faces.append((a, a + 1, a + nu + 2, a + nu + 1))
    return mesh_obj(name, co, faces, coll), co

def add_shape(ob, name, coords):
    if ob.data.shape_keys is None:
        ob.shape_key_add(name='Basis')
    k = ob.shape_key_add(name=name)
    k.slider_min, k.slider_max = 0.0, 1.0
    for i, c in enumerate(coords):
        k.data[i].co = c
    return k

# ---------------------------------------------------------------- driver
def drive(idblock, path, index, expr, var_map):
    """var_map: {ad: (id, datapath)}"""
    fc = idblock.driver_add(path, index) if index is not None else idblock.driver_add(path)
    d = fc.driver
    d.type = 'SCRIPTED'
    d.expression = expr
    for vn, (tid, dp) in var_map.items():
        v = d.variables.new()
        v.name = vn
        v.type = 'SINGLE_PROP'
        v.targets[0].id = tid
        v.targets[0].data_path = dp
    return fc

# ---------------------------------------------------------------- ağırlık
def seg_dist(p, a, b):
    ab = b - a
    l2 = ab.length_squared
    t = 0.0 if l2 < 1e-12 else max(0.0, min(1.0, (p - a).dot(ab) / l2))
    return (p - (a + ab * t)).length, t

def smoothstep(x):
    x = max(0.0, min(1.0, x))
    return x * x * (3 - 2 * x)

def assign_weights(ob, bones, default_blend=0.05):
    """bones: [(ad, head, tail, blend)]. En yakın segment + eklem yumuşatma."""
    me = ob.data
    vgs = {}
    for name, _, _, _ in bones:
        vgs[name] = ob.vertex_groups.new(name=name)
    for vi, v in enumerate(me.vertices):
        p = v.co
        ds = []
        for name, h, t, bl in bones:
            d, _ = seg_dist(p, h, t)
            ds.append((d, name, bl))
        dmin = min(ds)[0]
        ws = {}
        for d, name, bl in ds:
            w = smoothstep(1.0 - (d - dmin) / bl)
            if w > 0.001:
                ws[name] = w
        tot = sum(ws.values())
        for name, w in ws.items():
            vgs[name].add([vi], w / tot, 'REPLACE')
