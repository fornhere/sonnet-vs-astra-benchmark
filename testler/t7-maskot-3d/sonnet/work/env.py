"""Forn — stüdyo ortamı: sikloraması, askı, FORN harfleri, ışıklar, kamera."""
import bpy, bmesh, math, os
from mathutils import Vector, Matrix
from lib import *

HERE = os.path.dirname(os.path.abspath(__file__))
CHAR_X = 2.5          # Forn'un sahnedeki x'i
CHAR_Y = -0.30        # ayakta duruş y'si (askı ucu)
WALL_Y = 0.60
PEG_Z = 3.12
LX = -0.85            # harflerin merkez x'i
LETTER_H = 1.08

def setup_render(sc, w=1920, h=1080, samples=96):
    p = bpy.context.preferences.addons['cycles'].preferences
    p.compute_device_type = 'OPTIX'; p.get_devices()
    for d in p.devices:
        d.use = True
    sc.render.engine = 'CYCLES'
    sc.cycles.device = 'GPU'
    sc.cycles.samples = samples
    sc.cycles.use_denoising = True
    sc.cycles.denoiser = 'OPENIMAGEDENOISE'
    sc.cycles.max_bounces = 8
    sc.cycles.transparent_max_bounces = 16
    sc.cycles.caustics_reflective = False
    sc.cycles.caustics_refractive = False
    sc.render.resolution_x, sc.render.resolution_y = w, h
    sc.render.resolution_percentage = 100
    sc.render.fps = 30
    sc.view_settings.view_transform = 'Standard'
    sc.view_settings.look = 'None'
    sc.render.film_transparent = False

def cyclorama(coll):
    # profil (y,z): zemin -> fillet -> duvar
    R_ = 0.32
    y0 = WALL_Y - R_
    prof = [(-40.0, 0.0), (y0, 0.0)]
    for i in range(1, 17):
        a = math.pi / 2 * i / 16
        prof.append((y0 + R_ * math.sin(a), R_ - R_ * math.cos(a)))
    prof.append((WALL_Y, 14.0))
    xs = [-40.0, -8, 0, 8, 40.0]
    verts, faces = [], []
    for (y, z) in prof:
        for x in xs:
            verts.append((x, y, z))
    n = len(xs)
    for k in range(len(prof) - 1):
        for i in range(n - 1):
            a = k * n + i
            faces.append((a, a + n, a + n + 1, a + 1))
    ob = mesh_obj('Cyclorama', verts, faces, coll)
    # yüzey normali kameraya (−y, +z) baksın
    bm = bmesh.new(); bm.from_mesh(ob.data)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    for f in bm.faces:
        if f.normal.y > 0.5 or (f.normal.z < -0.5):
            f.normal_flip()
    bm.to_mesh(ob.data); bm.free()

    m = new_mat('Cyclorama')
    nt = m.node_tree
    out = nt.nodes.new('ShaderNodeOutputMaterial')
    bs = nt.nodes.new('ShaderNodeBsdfPrincipled')
    tc = nt.nodes.new('ShaderNodeTexCoord')
    sep = nt.nodes.new('ShaderNodeSeparateXYZ')
    nt.links.new(tc.outputs['Object'], sep.inputs[0])
    def math_(op, a=None, b=None, clamp=False):
        n_ = nt.nodes.new('ShaderNodeMath'); n_.operation = op; n_.use_clamp = clamp
        if a is not None:
            if isinstance(a, (int, float)): n_.inputs[0].default_value = a
            else: nt.links.new(a, n_.inputs[0])
        if b is not None:
            if isinstance(b, (int, float)): n_.inputs[1].default_value = b
            else: nt.links.new(b, n_.inputs[1])
        return n_.outputs[0]
    X, Z, Y = sep.outputs[0], sep.outputs[2], sep.outputs[1]
    # zemin -> duvar geçişi (z yüksekliği)
    wall_f = nt.nodes.new('ShaderNodeMapRange')
    wall_f.inputs['From Min'].default_value = 0.02; wall_f.inputs['From Max'].default_value = 1.1
    wall_f.clamp = True
    nt.links.new(Z, wall_f.inputs['Value'])
    # yarım ton nokta deseni (45° döndürülmüş ızgara)
    K = 1.0 / 0.21
    u = math_('MULTIPLY', math_('ADD', X, Z), K * 0.7071)
    v = math_('MULTIPLY', math_('SUBTRACT', X, Z), K * 0.7071)
    fu = math_('WRAP', u, 1.0); fv = math_('WRAP', v, 1.0)
    du = math_('SUBTRACT', fu, 0.5); dv = math_('SUBTRACT', fv, 0.5)
    dist = math_('SQRT', math_('ADD', math_('MULTIPLY', du, du), math_('MULTIPLY', dv, dv)))
    # odak merkezinden uzaklık (x - CHAR_X*0.5, z - 1.4)
    cx = math_('SUBTRACT', X, CHAR_X * 0.35); cz = math_('SUBTRACT', Z, 1.5)
    rr = math_('SQRT', math_('ADD', math_('MULTIPLY', cx, cx), math_('MULTIPLY', cz, cz)))
    rad = nt.nodes.new('ShaderNodeMapRange')
    rad.inputs['From Min'].default_value = 2.2; rad.inputs['From Max'].default_value = 8.5
    rad.inputs['To Min'].default_value = 0.0; rad.inputs['To Max'].default_value = 0.42
    rad.clamp = True
    nt.links.new(rr, rad.inputs['Value'])
    edge = math_('SUBTRACT', dist, rad.outputs['Result'])
    dots = nt.nodes.new('ShaderNodeMapRange')
    dots.inputs['From Min'].default_value = 0.035; dots.inputs['From Max'].default_value = -0.035
    dots.clamp = True
    nt.links.new(edge, dots.inputs['Value'])
    # renkler
    c_floor = hexcol('#F4E8CE'); c_wall = hexcol('#FFC530'); c_dot = hexcol('#F29A00')
    mix1 = nt.nodes.new('ShaderNodeMix'); mix1.data_type = 'RGBA'
    mix1.inputs['A'].default_value = c_floor; mix1.inputs['B'].default_value = c_wall
    nt.links.new(wall_f.outputs['Result'], mix1.inputs['Factor'])
    mix2 = nt.nodes.new('ShaderNodeMix'); mix2.data_type = 'RGBA'
    mix2.inputs['B'].default_value = c_dot
    dotmask = math_('MULTIPLY', dots.outputs['Result'], wall_f.outputs['Result'])
    nt.links.new(dotmask, mix2.inputs['Factor'])
    nt.links.new(mix1.outputs['Result'], mix2.inputs['A'])
    nt.links.new(mix2.outputs['Result'], bs.inputs['Base Color'])
    bs.inputs['Roughness'].default_value = 0.38
    bs.inputs['Specular IOR Level'].default_value = 0.45
    bs.inputs['Coat Weight'].default_value = 0.0
    nt.links.new(bs.outputs['BSDF'], out.inputs['Surface'])
    ob.data.materials.append(m)
    return ob

def peg(coll, mat_line):
    mchrome, _ = principled('Chrome', (0.75, 0.78, 0.85, 1), rough=0.16, metallic=1.0, spec=0.6)
    parts = []
    # gövde
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, radius1=0.05, radius2=0.05, depth=0.9, segments=40)
    bmesh.ops.rotate(bm, verts=bm.verts, cent=(0, 0, 0), matrix=Matrix.Rotation(math.pi / 2, 3, 'X'))
    bmesh.ops.translate(bm, verts=bm.verts, vec=(CHAR_X, WALL_Y - 0.45, PEG_Z))
    me = bpy.data.meshes.new('peg'); bm.to_mesh(me); bm.free()
    ob = bpy.data.objects.new('Peg', me); link(ob, coll); set_smooth(ob)
    # uç topuzu
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=40, v_segments=24, radius=0.068)
    bmesh.ops.translate(bm, verts=bm.verts, vec=(CHAR_X, -0.30, PEG_Z))
    me2 = bpy.data.meshes.new('peg_knob'); bm.to_mesh(me2); bm.free()
    kn = bpy.data.objects.new('PegKnob', me2); link(kn, coll); set_smooth(kn)
    # duvar plakası
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, radius1=0.17, radius2=0.15, depth=0.06, segments=48)
    bmesh.ops.rotate(bm, verts=bm.verts, cent=(0, 0, 0), matrix=Matrix.Rotation(math.pi / 2, 3, 'X'))
    bmesh.ops.translate(bm, verts=bm.verts, vec=(CHAR_X, WALL_Y - 0.03, PEG_Z))
    me3 = bpy.data.meshes.new('peg_plate'); bm.to_mesh(me3); bm.free()
    pl = bpy.data.objects.new('PegPlate', me3); link(pl, coll); set_smooth(pl)
    for o in (ob, kn, pl):
        o.data.materials.append(mchrome)
        bv = o.modifiers.new('Bevel', 'BEVEL'); bv.width = 0.012; bv.segments = 3; bv.limit_method = 'ANGLE'
        add_outline(o, mat_line, 0.008)
    return [ob, kn, pl]

def letters(coll, mat_line):
    font = bpy.data.fonts.load(os.path.join(HERE, 'fonts', 'ArchivoBlack-Regular.ttf'))
    cu = bpy.data.curves.new('title', 'FONT')
    cu.body = 'FORN'
    cu.font = font
    cu.size = LETTER_H / 0.58
    cu.extrude = 0.14
    cu.bevel_depth = 0.022
    cu.bevel_resolution = 3
    cu.space_character = 1.0
    cu.align_x = 'CENTER'
    to = bpy.data.objects.new('title_tmp', cu)
    link(to, coll)
    me = eval_mesh(to, 'title_mesh')
    bpy.data.objects.remove(to)
    # ada ayrımı
    bm = bmesh.new(); bm.from_mesh(me)
    bm.verts.ensure_lookup_table()
    seen = set(); islands = []
    for v in bm.verts:
        if v.index in seen:
            continue
        stack = [v]; comp = []
        seen.add(v.index)
        while stack:
            a = stack.pop(); comp.append(a)
            for e in a.link_edges:
                b = e.other_vert(a)
                if b.index not in seen:
                    seen.add(b.index); stack.append(b)
        islands.append(comp)
    # x-aralığı örtüşen adaları harf olarak birleştir
    rngs = [(min(v.co.x for v in c), max(v.co.x for v in c), c) for c in islands]
    rngs.sort(key=lambda r: r[0])
    groups = []
    for lo, hi, c in rngs:
        if groups and lo < groups[-1][1] - 1e-6:
            groups[-1][1] = max(groups[-1][1], hi); groups[-1][2].extend(c)
        else:
            groups.append([lo, hi, list(c)])
    print('letter groups', len(groups))
    names = ['F', 'O', 'R', 'N']
    objs = []
    for i, (lo, hi, comp) in enumerate(groups[:4]):
        idx = {v.index for v in comp}
        verts = [v.co.copy() for v in comp]
        remap = {v.index: k for k, v in enumerate(comp)}
        faces = [[remap[v.index] for v in f.verts] for f in bm.faces if f.verts[0].index in idx]
        cx = (lo + hi) / 2
        newv = [Vector((p.x - cx, -p.z, p.y)) for p in verts]
        ob = mesh_obj('Letter_' + names[i], newv, faces, coll)
        ob.location = (cx + LX, 0.17, 0.0)
        objs.append(ob)
    bm.free()
    # normalleri düzelt + malzeme
    mblack, _ = principled('Letter_Black', (0.008, 0.008, 0.012, 1), rough=0.38, coat=0.0, spec=0.3)
    for ob in objs:
        bm = bmesh.new(); bm.from_mesh(ob.data)
        bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
        bm.to_mesh(ob.data); bm.free()
        set_smooth(ob)
        ob.data.materials.append(mblack)
    return objs

def star_mesh(coll, name='Star'):
    verts, faces = [], []
    n = 4
    for i in range(n * 2):
        a = math.pi * i / n + math.pi / 2
        r = 1.0 if i % 2 == 0 else 0.16
        verts.append((r * math.cos(a), 0.0, r * math.sin(a)))
    verts.append((0, 0, 0))
    for i in range(n * 2):
        faces.append((i, (i + 1) % (n * 2), n * 2))
    # normal −Y'ye
    ob = mesh_obj(name, verts, [tuple(reversed(f)) for f in faces], coll)
    return ob

def lights(coll):
    def area(name, loc, size, energy, target, color=(1, 1, 1), size_y=None):
        l = bpy.data.lights.new(name, 'AREA')
        l.energy = energy; l.size = size
        if size_y:
            l.shape = 'RECTANGLE'; l.size_y = size_y
        l.color = color
        o = bpy.data.objects.new(name, l); link(o, coll)
        o.location = loc
        d = Vector(target) - Vector(loc)
        o.rotation_euler = d.to_track_quat('-Z', 'Y').to_euler()
        return o
    T = (CHAR_X, -0.2, 1.3)
    area('Key', (CHAR_X - 4.0, -7.5, 6.0), 4.0, 420, T, (1.0, 0.97, 0.92), 3.0)
    area('Fill', (CHAR_X + 6.5, -6.0, 2.8), 5.0, 110, T, (0.88, 0.94, 1.0), 3.0)
    def spot(name, loc, energy, target, color):
        l = bpy.data.lights.new(name, 'SPOT')
        l.energy = energy; l.spot_size = math.radians(32); l.spot_blend = 0.6
        l.shadow_soft_size = 0.25; l.color = color
        o = bpy.data.objects.new(name, l); link(o, coll); o.location = loc
        o.rotation_euler = (Vector(target) - Vector(loc)).to_track_quat('-Z', 'Y').to_euler()
        return o
    spot('RimL', (CHAR_X - 3.6, 0.35, 3.6), 1100, T, (0.8, 0.93, 1.0))
    spot('RimR', (CHAR_X + 3.6, 0.35, 3.4), 1100, T, (0.8, 0.93, 1.0))
    area('Top', (CHAR_X, -1.5, 8.0), 5.0, 160, (CHAR_X, -0.3, 0.5), (1.0, 0.98, 0.95))
    area('Wide', (-3.0, -8.0, 6.0), 6.0, 200, (-1.0, 0.2, 1.0), (1, 1, 1), 4.0)
    w = bpy.data.worlds.new('World')
    bpy.context.scene.world = w
    w.use_nodes = True
    bg = w.node_tree.nodes['Background']
    bg.inputs[0].default_value = hexcol('#FFE9B8')
    bg.inputs[1].default_value = 0.12

def camera(coll):
    cd = bpy.data.cameras.new('Cam')
    cd.lens = 45
    cd.sensor_width = 36
    cd.dof.use_dof = True
    cd.dof.aperture_fstop = 3.2
    cam = bpy.data.objects.new('Camera', cd)
    link(cam, coll)
    bpy.context.scene.camera = cam
    tgt = bpy.data.objects.new('CamTarget', None)
    tgt.empty_display_type = 'PLAIN_AXES'
    link(tgt, coll)
    tc = cam.constraints.new('TRACK_TO')
    tc.target = tgt; tc.track_axis = 'TRACK_NEGATIVE_Z'; tc.up_axis = 'UP_Y'
    cd.dof.focus_object = tgt
    return cam, tgt
