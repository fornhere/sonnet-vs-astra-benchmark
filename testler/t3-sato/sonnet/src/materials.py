"""Prosedürel materyaller (Cycles / Principled). Dokuları dosya yok, hepsi node."""
import bpy


def _n(nt, typ, loc=(0, 0), **props):
    n = nt.nodes.new(typ)
    n.location = loc
    for k, v in props.items():
        setattr(n, k, v)
    return n


def _mix(nt, fac, a, b, blend="MIX", loc=(0, 0), clamp=True):
    m = nt.nodes.new("ShaderNodeMix")
    m.data_type = "RGBA"
    m.blend_type = blend
    m.clamp_result = clamp
    m.location = loc
    if isinstance(fac, (int, float)):
        m.inputs[0].default_value = fac
    else:
        nt.links.new(fac, m.inputs[0])
    for idx, v in ((6, a), (7, b)):
        if isinstance(v, (tuple, list)):
            m.inputs[idx].default_value = v
        else:
            nt.links.new(v, m.inputs[idx])
    return m


def _ramp(nt, fac, stops, loc=(0, 0), interp="LINEAR"):
    r = nt.nodes.new("ShaderNodeValToRGB")
    r.location = loc
    r.color_ramp.interpolation = interp
    el = r.color_ramp.elements
    while len(el) > len(stops):
        el.remove(el[-1])
    while len(el) < len(stops):
        el.new(0.5)
    for e, (p, col) in zip(el, stops):
        e.position = p
        e.color = col
    if fac is not None:
        nt.links.new(fac, r.inputs[0])
    return r


def _noise(nt, scale, detail=4.0, rough=0.55, coord=None, loc=(0, 0), dist=0.0):
    n = nt.nodes.new("ShaderNodeTexNoise")
    n.noise_dimensions = "3D"
    n.location = loc
    n.inputs["Scale"].default_value = scale
    n.inputs["Detail"].default_value = detail
    n.inputs["Roughness"].default_value = rough
    if "Distortion" in n.inputs:
        n.inputs["Distortion"].default_value = dist
    if coord is not None:
        nt.links.new(coord, n.inputs["Vector"])
    return n


def _math(nt, op, a, b=None, loc=(0, 0), clamp=False):
    m = nt.nodes.new("ShaderNodeMath")
    m.operation = op
    m.use_clamp = clamp
    m.location = loc
    for i, v in enumerate((a, b)):
        if v is None:
            continue
        if isinstance(v, (int, float)):
            m.inputs[i].default_value = v
        else:
            nt.links.new(v, m.inputs[i])
    return m


def _base(name):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    nt = mat.node_tree
    nt.nodes.clear()
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    out.location = (1600, 0)
    bsdf = nt.nodes.new("ShaderNodeBsdfPrincipled")
    bsdf.location = (1300, 0)
    nt.links.new(bsdf.outputs["BSDF"], out.inputs["Surface"])
    return mat, nt, bsdf, out


def _uvmap(nt, scale=(1, 1, 1), loc=(-1400, 0)):
    tc = nt.nodes.new("ShaderNodeTexCoord")
    tc.location = loc
    mp = nt.nodes.new("ShaderNodeMapping")
    mp.location = (loc[0] + 200, loc[1])
    mp.inputs["Scale"].default_value = scale
    nt.links.new(tc.outputs["UV"], mp.inputs["Vector"])
    return tc, mp


def _bump(nt, bsdf, height, strength=0.5, dist=0.05, loc=(1000, -300), bevel=None):
    b = nt.nodes.new("ShaderNodeBump")
    b.location = loc
    b.inputs["Strength"].default_value = strength
    b.inputs["Distance"].default_value = dist
    nt.links.new(height, b.inputs["Height"])
    if bevel is not None:
        nt.links.new(bevel.outputs["Normal"], b.inputs["Normal"])
    nt.links.new(b.outputs["Normal"], bsdf.inputs["Normal"])
    return b


def _bevel(nt, radius=0.06, loc=(700, -500)):
    bv = nt.nodes.new("ShaderNodeBevel")
    bv.location = loc
    bv.inputs["Radius"].default_value = radius
    bv.samples = 4
    return bv


def _ao(nt, dist=1.5, loc=(200, 300)):
    ao = nt.nodes.new("ShaderNodeAmbientOcclusion")
    ao.location = loc
    ao.inputs["Distance"].default_value = dist
    ao.samples = 4
    return ao


# ----------------------------------------------------------------------------
def stone_material(name, col_a, col_b, scale=(1, 1, 1), brick=(1.1, 0.55), mortar_col=(0.10, 0.09, 0.08, 1),
                   rough=0.82, bump=0.6, weather=True, grime=(0.05, 0.045, 0.04, 1), moss=0.0):
    mat, nt, bsdf, out = _base(name)
    tc, mp = _uvmap(nt, scale)
    gen = nt.nodes.new("ShaderNodeTexCoord")
    gen.location = (-1400, -500)
    br = nt.nodes.new("ShaderNodeTexBrick")
    br.location = (-1000, 200)
    br.offset = 0.5
    br.offset_frequency = 2
    br.squash = 1.0
    br.inputs["Color1"].default_value = col_a
    br.inputs["Color2"].default_value = col_b
    br.inputs["Mortar"].default_value = mortar_col
    br.inputs["Scale"].default_value = 1.0
    br.inputs["Mortar Size"].default_value = 0.035
    br.inputs["Mortar Smooth"].default_value = 0.12
    br.inputs["Bias"].default_value = 0.0
    br.inputs["Brick Width"].default_value = brick[0]
    br.inputs["Row Height"].default_value = brick[1]
    nt.links.new(mp.outputs["Vector"], br.inputs["Vector"])
    # buyuk olcekli lekelenme
    n_big = _noise(nt, 0.09, 4, 0.6, gen.outputs["Object"], (-1000, -100))
    n_fine = _noise(nt, 5.0, 6, 0.65, gen.outputs["Object"], (-1000, -350))
    tint = _ramp(nt, n_big.outputs["Fac"], [(0.3, (0.78, 0.78, 0.8, 1)), (0.7, (1.12, 1.0, 0.86, 1))], (-700, -100))
    c1 = _mix(nt, 1.0, br.outputs["Color"], tint.outputs["Color"], "MULTIPLY", (-450, 100), clamp=False)
    # ince taneli varyasyon
    fine = _ramp(nt, n_fine.outputs["Fac"], [(0.35, (0.82, 0.82, 0.82, 1)), (0.7, (1.1, 1.1, 1.1, 1))], (-700, -350))
    c2 = _mix(nt, 1.0, c1.outputs[2], fine.outputs["Color"], "MULTIPLY", (-250, 100), clamp=False)
    last = c2
    if weather:
        # kirlenme: AO + yukseklik (alt) koyulugu
        ao = _ao(nt, 2.5, (-450, -300))
        gr = _mix(nt, ao.outputs["AO"], grime, (1, 1, 1, 1), "MIX", (0, -50))
        c3 = _mix(nt, 1.0, last.outputs[2], gr.outputs[2], "MULTIPLY", (200, 100), clamp=False)
        last = c3
    if moss > 0:
        sep = nt.nodes.new("ShaderNodeSeparateXYZ")
        sep.location = (-700, -600)
        nt.links.new(gen.outputs["Object"], sep.inputs[0])
        zm = _ramp(nt, sep.outputs["Z"], [(0.0, (1, 1, 1, 1)), (1.0, (0, 0, 0, 1))], (-450, -600))
        zm.color_ramp.elements[0].position = 0.0
        zm.color_ramp.elements[1].position = 1.0
        nn = _noise(nt, 0.35, 5, 0.6, gen.outputs["Object"], (-700, -800))
        mm = _math(nt, "MULTIPLY", nn.outputs["Fac"], zm.outputs["Color"], (-200, -700))
        # basitce: moss = ramp(noise * zmask)
        mr = _ramp(nt, mm.outputs["Value"], [(0.28, (0, 0, 0, 1)), (0.4, (1, 1, 1, 1))], (0, -700))
        moss_c = _mix(nt, mr.outputs["Color"], last.outputs[2], (0.08, 0.12, 0.03, 1), "MIX", (400, 100))
        last = moss_c
    nt.links.new(last.outputs[2], bsdf.inputs["Base Color"])
    bsdf.inputs["Roughness"].default_value = rough
    # bump: harc cizgisi + ince gürültü
    hgt = _math(nt, "ADD", br.outputs["Fac"], _math(nt, "MULTIPLY", n_fine.outputs["Fac"], 0.35, (-700, -450)).outputs[0],
                (-450, -450))
    bv = _bevel(nt, 0.05)
    _bump(nt, bsdf, hgt.outputs[0], bump, 0.05, bevel=bv)
    return mat


def roof_material(name, col_a, col_b, tile=(0.9, 0.55), rough=0.65, bump=1.6):
    mat, nt, bsdf, out = _base(name)
    tc, mp = _uvmap(nt, (1, 1, 1))
    gen = nt.nodes.new("ShaderNodeTexCoord")
    gen.location = (-1400, -500)
    br = nt.nodes.new("ShaderNodeTexBrick")
    br.location = (-1000, 200)
    br.offset = 0.5
    br.offset_frequency = 2
    br.inputs["Color1"].default_value = col_a
    br.inputs["Color2"].default_value = col_b
    br.inputs["Mortar"].default_value = (0.01, 0.01, 0.012, 1)
    br.inputs["Mortar Size"].default_value = 0.06
    br.inputs["Mortar Smooth"].default_value = 0.1
    br.inputs["Brick Width"].default_value = tile[0]
    br.inputs["Row Height"].default_value = tile[1]
    br.inputs["Bias"].default_value = 0.0
    nt.links.new(mp.outputs["Vector"], br.inputs["Vector"])
    n_big = _noise(nt, 0.12, 3, 0.5, gen.outputs["Object"], (-1000, -100))
    tint = _ramp(nt, n_big.outputs["Fac"], [(0.35, (0.75, 0.78, 0.8, 1)), (0.65, (1.15, 1.08, 1.0, 1))], (-700, -100))
    c1 = _mix(nt, 1.0, br.outputs["Color"], tint.outputs["Color"], "MULTIPLY", (-400, 100), clamp=False)
    ao = _ao(nt, 1.5, (-450, -300))
    gr = _mix(nt, ao.outputs["AO"], (0.15, 0.15, 0.15, 1), (1, 1, 1, 1), "MIX", (-100, -100))
    c2 = _mix(nt, 1.0, c1.outputs[2], gr.outputs[2], "MULTIPLY", (200, 100), clamp=False)
    nt.links.new(c2.outputs[2], bsdf.inputs["Base Color"])
    bsdf.inputs["Roughness"].default_value = rough
    # her tas için hafif gradyan yükselti: mortar + kenar
    n_fine = _noise(nt, 9.0, 3, 0.5, gen.outputs["Object"], (-1000, -350))
    hgt = _math(nt, "ADD", br.outputs["Fac"], _math(nt, "MULTIPLY", n_fine.outputs["Fac"], 0.3, (-700, -450)).outputs[0],
                (-450, -450))
    bv = _bevel(nt, 0.04)
    _bump(nt, bsdf, hgt.outputs[0], bump, 0.04, bevel=bv)
    return mat


def wood_material(name, col_a=(0.13, 0.075, 0.04, 1), col_b=(0.28, 0.16, 0.08, 1), rough=0.7, scale=(1, 1, 1)):
    mat, nt, bsdf, out = _base(name)
    tc, mp = _uvmap(nt, scale)
    gen = nt.nodes.new("ShaderNodeTexCoord")
    gen.location = (-1400, -500)
    # damar: uzatilmis gurultu (UV u yonunde uzun)
    mp2 = nt.nodes.new("ShaderNodeMapping")
    mp2.location = (-1200, -200)
    mp2.inputs["Scale"].default_value = (0.5, 9.0, 9.0)
    nt.links.new(tc.outputs["UV"], mp2.inputs["Vector"])
    nz = _noise(nt, 4.0, 5, 0.6, mp2.outputs["Vector"], (-950, -200), dist=0.5)
    wv = nt.nodes.new("ShaderNodeTexWave")
    wv.location = (-950, -500)
    wv.wave_type = "BANDS"
    wv.bands_direction = "Y"
    wv.inputs["Scale"].default_value = 3.0
    wv.inputs["Distortion"].default_value = 4.0
    wv.inputs["Detail"].default_value = 2.0
    nt.links.new(mp.outputs["Vector"], wv.inputs["Vector"])
    ramp = _ramp(nt, nz.outputs["Fac"], [(0.35, col_a), (0.65, col_b)], (-650, -200))
    ao = _ao(nt, 0.8, (-650, -450))
    gr = _mix(nt, ao.outputs["AO"], (0.3, 0.3, 0.3, 1), (1, 1, 1, 1), "MIX", (-350, -350))
    c = _mix(nt, 1.0, ramp.outputs["Color"], gr.outputs[2], "MULTIPLY", (0, -100), clamp=False)
    nt.links.new(c.outputs[2], bsdf.inputs["Base Color"])
    bsdf.inputs["Roughness"].default_value = rough
    hgt = _math(nt, "MULTIPLY", wv.outputs["Fac"], 0.5, (-350, -600))
    _bump(nt, bsdf, nz.outputs["Fac"], 0.25, 0.02)
    return mat


def plaster_material(name, col=(0.62, 0.55, 0.42, 1), rough=0.9):
    mat, nt, bsdf, out = _base(name)
    gen = nt.nodes.new("ShaderNodeTexCoord")
    gen.location = (-1200, 0)
    n1 = _noise(nt, 0.5, 5, 0.6, gen.outputs["Object"], (-900, 100))
    n2 = _noise(nt, 12.0, 6, 0.6, gen.outputs["Object"], (-900, -200))
    tint = _ramp(nt, n1.outputs["Fac"], [(0.3, (0.8, 0.78, 0.74, 1)), (0.7, (1.1, 1.05, 1.0, 1))], (-600, 100))
    c1 = _mix(nt, 1.0, col, tint.outputs["Color"], "MULTIPLY", (-300, 0), clamp=False)
    ao = _ao(nt, 1.0, (-600, -300))
    gr = _mix(nt, ao.outputs["AO"], (0.35, 0.3, 0.26, 1), (1, 1, 1, 1), "MIX", (-300, -250))
    c2 = _mix(nt, 1.0, c1.outputs[2], gr.outputs[2], "MULTIPLY", (0, 0), clamp=False)
    nt.links.new(c2.outputs[2], bsdf.inputs["Base Color"])
    bsdf.inputs["Roughness"].default_value = rough
    _bump(nt, bsdf, n2.outputs["Fac"], 0.3, 0.02)
    return mat


def metal_material(name, col=(0.05, 0.05, 0.055, 1), rough=0.45, metallic=1.0):
    mat, nt, bsdf, out = _base(name)
    gen = nt.nodes.new("ShaderNodeTexCoord")
    gen.location = (-1000, 0)
    n1 = _noise(nt, 6.0, 5, 0.6, gen.outputs["Object"], (-700, 0))
    r = _ramp(nt, n1.outputs["Fac"], [(0.3, (0.6, 0.6, 0.6, 1)), (0.7, (1.2, 1.2, 1.2, 1))], (-400, 0))
    c = _mix(nt, 1.0, col, r.outputs["Color"], "MULTIPLY", (-100, 0), clamp=False)
    nt.links.new(c.outputs[2], bsdf.inputs["Base Color"])
    bsdf.inputs["Roughness"].default_value = rough
    bsdf.inputs["Metallic"].default_value = metallic
    _bump(nt, bsdf, n1.outputs["Fac"], 0.2, 0.02)
    return mat


def emissive_window(name, tint_a=(1.0, 0.55, 0.16, 1), tint_b=(1.0, 0.75, 0.35, 1), strength=6.0):
    """Renk ozniteligi 'glow' (0..1) ile parlaklik. Animasyon: 'Strength' degeri surulebilir."""
    mat, nt, bsdf, out = _base(name)
    attr = nt.nodes.new("ShaderNodeAttribute")
    attr.attribute_name = "glow"
    attr.attribute_type = "GEOMETRY"
    attr.location = (-900, 0)
    ramp = _ramp(nt, attr.outputs["Fac"], [(0.0, tint_a), (1.0, tint_b)], (-600, 200))
    # pencere ici geometrik degisim: UV'ye gore hafif gradyan
    tc = nt.nodes.new("ShaderNodeTexCoord")
    tc.location = (-900, -300)
    n = _noise(nt, 2.0, 2, 0.5, tc.outputs["Object"], (-650, -300))
    mult = nt.nodes.new("ShaderNodeMath")
    mult.operation = "MULTIPLY"
    mult.location = (-400, -100)
    nt.links.new(attr.outputs["Fac"], mult.inputs[0])
    mult.inputs[1].default_value = strength
    mult.label = "GlowStrength"
    mult.name = "GlowStrength"
    bsdf.inputs["Base Color"].default_value = (0.02, 0.015, 0.01, 1)
    nt.links.new(ramp.outputs["Color"], bsdf.inputs["Emission Color"])
    nt.links.new(mult.outputs[0], bsdf.inputs["Emission Strength"])
    bsdf.inputs["Roughness"].default_value = 0.2
    return mat


def cloth_material(name, col=(0.45, 0.02, 0.03, 1), col2=(0.9, 0.7, 0.2, 1), rough=0.85):
    mat, nt, bsdf, out = _base(name)
    attr = nt.nodes.new("ShaderNodeAttribute")
    attr.attribute_name = "glow"
    attr.location = (-900, 0)
    tc = nt.nodes.new("ShaderNodeTexCoord")
    tc.location = (-1200, -300)
    wv = nt.nodes.new("ShaderNodeTexWave")
    wv.wave_type = "BANDS"
    wv.bands_direction = "X"
    wv.inputs["Scale"].default_value = 60.0
    wv.inputs["Distortion"].default_value = 0.5
    wv.location = (-900, -300)
    nt.links.new(tc.outputs["Object"], wv.inputs["Vector"])
    # glow=0 -> ana renk, glow=1 -> altin
    m = _mix(nt, attr.outputs["Fac"], col, col2, "MIX", (-500, 0))
    r = _ramp(nt, wv.outputs["Fac"], [(0.0, (0.85, 0.85, 0.85, 1)), (1.0, (1.1, 1.1, 1.1, 1))], (-600, -300))
    c = _mix(nt, 1.0, m.outputs[2], r.outputs["Color"], "MULTIPLY", (-250, 0), clamp=False)
    nt.links.new(c.outputs[2], bsdf.inputs["Base Color"])
    bsdf.inputs["Roughness"].default_value = rough
    if "Sheen Weight" in bsdf.inputs:
        bsdf.inputs["Sheen Weight"].default_value = 0.6
    mat.use_backface_culling = False
    return mat


def gold_material(name):
    return metal_material(name, (0.9, 0.62, 0.15, 1), 0.28, 1.0)


def copper_roof_material(name):
    """Patinali bakir (yesil-turkuaz) - ince damarli."""
    mat, nt, bsdf, out = _base(name)
    tc, mp = _uvmap(nt, (1, 1, 1))
    gen = nt.nodes.new("ShaderNodeTexCoord")
    gen.location = (-1400, -500)
    br = nt.nodes.new("ShaderNodeTexBrick")
    br.location = (-1000, 200)
    br.offset = 0.0
    br.inputs["Color1"].default_value = (0.05, 0.19, 0.16, 1)
    br.inputs["Color2"].default_value = (0.09, 0.27, 0.21, 1)
    br.inputs["Mortar"].default_value = (0.03, 0.09, 0.08, 1)
    br.inputs["Mortar Size"].default_value = 0.02
    br.inputs["Mortar Smooth"].default_value = 0.1
    br.inputs["Brick Width"].default_value = 0.7
    br.inputs["Row Height"].default_value = 2.5
    nt.links.new(mp.outputs["Vector"], br.inputs["Vector"])
    n = _noise(nt, 3.0, 5, 0.6, gen.outputs["Object"], (-800, -200))
    r = _ramp(nt, n.outputs["Fac"], [(0.35, (0.8, 0.8, 0.85, 1)), (0.65, (1.2, 1.15, 1.1, 1))], (-500, -200))
    c = _mix(nt, 1.0, br.outputs["Color"], r.outputs["Color"], "MULTIPLY", (-200, 100), clamp=False)
    nt.links.new(c.outputs[2], bsdf.inputs["Base Color"])
    bsdf.inputs["Roughness"].default_value = 0.45
    bsdf.inputs["Metallic"].default_value = 0.6
    _bump(nt, bsdf, br.outputs["Fac"], 0.7, 0.05)
    return mat


def plain(name, col, rough=0.6, metallic=0.0):
    mat, nt, bsdf, out = _base(name)
    bsdf.inputs["Base Color"].default_value = col
    bsdf.inputs["Roughness"].default_value = rough
    bsdf.inputs["Metallic"].default_value = metallic
    return mat


def cobble_material(name):
    """Avlu / yol kaldirim tasi: voronoi hucre + bump."""
    mat, nt, bsdf, out = _base(name)
    tc = nt.nodes.new("ShaderNodeTexCoord")
    tc.location = (-1200, 0)
    vo = nt.nodes.new("ShaderNodeTexVoronoi")
    vo.location = (-900, 0)
    vo.feature = "F1"
    vo.inputs["Scale"].default_value = 1.4
    vo.inputs["Randomness"].default_value = 0.9
    nt.links.new(tc.outputs["Object"], vo.inputs["Vector"])
    vo2 = nt.nodes.new("ShaderNodeTexVoronoi")
    vo2.location = (-900, -300)
    vo2.feature = "DISTANCE_TO_EDGE"
    vo2.inputs["Scale"].default_value = 1.4
    vo2.inputs["Randomness"].default_value = 0.9
    nt.links.new(tc.outputs["Object"], vo2.inputs["Vector"])
    edge = _ramp(nt, vo2.outputs["Distance"], [(0.02, (0, 0, 0, 1)), (0.09, (1, 1, 1, 1))], (-600, -300))
    n = _noise(nt, 0.4, 4, 0.6, tc.outputs["Object"], (-900, -600))
    cell = _ramp(nt, vo.outputs["Color"] if False else _math(nt, "MULTIPLY", vo.outputs["Distance"], 1.0, (-700, 100)).outputs[0],
                 [(0.0, (0.34, 0.31, 0.28, 1)), (1.0, (0.20, 0.18, 0.16, 1))], (-450, 100))
    dirt = _ramp(nt, n.outputs["Fac"], [(0.35, (0.55, 0.5, 0.42, 1)), (0.7, (1.1, 1.05, 1.0, 1))], (-450, -500))
    c1 = _mix(nt, 1.0, cell.outputs["Color"], dirt.outputs["Color"], "MULTIPLY", (-200, 0), clamp=False)
    c2 = _mix(nt, edge.outputs["Color"], (0.05, 0.045, 0.04, 1), c1.outputs[2], "MIX", (50, 0))
    nt.links.new(c2.outputs[2], bsdf.inputs["Base Color"])
    bsdf.inputs["Roughness"].default_value = 0.85
    _bump(nt, bsdf, edge.outputs["Color"], 0.8, 0.08)
    return mat


def make_all():
    M = {}
    # Kale taşı: sıcak kum/kireçtaşı; farklı ton
    M["stone"] = stone_material("Kale_Tas", (0.46, 0.43, 0.38, 1), (0.34, 0.32, 0.29, 1), brick=(1.15, 0.58), moss=0.0)
    M["stone_light"] = stone_material("Kale_Tas_Acik", (0.60, 0.57, 0.50, 1), (0.48, 0.45, 0.40, 1), brick=(1.0, 0.5),
                                     bump=0.5)
    M["stone_dark"] = stone_material("Kale_Tas_Koyu", (0.30, 0.28, 0.26, 1), (0.22, 0.21, 0.20, 1), brick=(1.5, 0.7),
                                    rough=0.9, moss=1.0)
    M["stone_big"] = stone_material("Kale_Temel_Tas", (0.36, 0.33, 0.30, 1), (0.25, 0.23, 0.21, 1), brick=(2.2, 1.0),
                                   rough=0.92, bump=0.9, moss=1.0)
    M["roof_slate"] = roof_material("Cati_Kayrak", (0.055, 0.085, 0.14, 1), (0.10, 0.14, 0.22, 1))
    M["roof_red"] = roof_material("Cati_Kiremit", (0.32, 0.11, 0.06, 1), (0.48, 0.18, 0.09, 1), tile=(0.85, 0.6))
    M["roof_copper"] = copper_roof_material("Cati_Bakir")
    M["roof_dark"] = roof_material("Cati_Koyu", (0.10, 0.09, 0.09, 1), (0.17, 0.15, 0.14, 1), tile=(0.85, 0.5))
    M["wood"] = wood_material("Ahsap")
    M["wood_dark"] = wood_material("Ahsap_Koyu", (0.06, 0.035, 0.02, 1), (0.13, 0.08, 0.045, 1))
    M["plaster"] = plaster_material("Sıva", (0.72, 0.66, 0.52, 1))
    M["iron"] = metal_material("Demir", (0.04, 0.04, 0.045, 1), 0.5)
    M["gold"] = gold_material("Altin")
    M["window"] = emissive_window("Pencere_Isik")
    M["cloth"] = cloth_material("Sancak_Kirmizi")
    M["cloth_blue"] = cloth_material("Sancak_Mavi", (0.04, 0.10, 0.32, 1), (0.9, 0.75, 0.3, 1))
    M["cobble"] = cobble_material("Kaldirim")
    M["dark"] = plain("Karanlik", (0.008, 0.007, 0.007, 1), 0.9)
    M["bark"] = plain("Govde", (0.09, 0.06, 0.04, 1), 0.95)
    return M
