# exec() ile build.py icinden calisir (bpy, scn, math, col_cam, col_lights vb. mevcut)
# ---------------------------------------------------------------------------
# Render ayarlari
# ---------------------------------------------------------------------------
scn.render.engine = "CYCLES"
cy = scn.cycles
cy.device = "GPU"
cy.samples = 96
cy.preview_samples = 32
cy.use_adaptive_sampling = True
cy.adaptive_threshold = 0.02
cy.use_denoising = True
cy.denoiser = "OPENIMAGEDENOISE"
cy.denoising_input_passes = "RGB_ALBEDO_NORMAL"
cy.max_bounces = 6
cy.diffuse_bounces = 3
cy.glossy_bounces = 4
cy.transmission_bounces = 4
cy.volume_bounces = 1
cy.transparent_max_bounces = 4
cy.volume_step_rate = 2.0
cy.volume_max_steps = 64
cy.sample_clamp_indirect = 8.0
try:
    cy.use_light_tree = True
except Exception:
    pass
scn.render.resolution_x = 1920
scn.render.resolution_y = 1080
scn.render.resolution_percentage = 100
scn.render.fps = 24
scn.frame_start = 1
scn.frame_end = 600
scn.render.use_persistent_data = True

prefs = bpy.context.preferences.addons["cycles"].preferences
prefs.compute_device_type = "OPTIX"
prefs.get_devices()
for d in prefs.devices:
    d.use = (d.type == "OPTIX")

# renk yonetimi
vs = scn.view_settings
vs.view_transform = "AgX"
try:
    vs.look = "AgX - Punchy"
except Exception:
    pass
vs.exposure = -0.7
scn.display_settings.display_device = "sRGB"

# ---------------------------------------------------------------------------
# Dunya: Nishita gok + hafif atmosferik sis
# ---------------------------------------------------------------------------
world = bpy.data.worlds.new("Ravenhold_Gokyuzu")
scn.world = world
world.use_nodes = True
nt = world.node_tree
nt.nodes.clear()
sky = nt.nodes.new("ShaderNodeTexSky")
sky.sky_type = "MULTIPLE_SCATTERING"
sky.sun_elevation = math.radians(7.0)
sky.sun_rotation = math.radians(SUN_ROT_DEG if "SUN_ROT_DEG" in globals() else 210.0)
sky.altitude = 40.0
sky.air_density = 1.6
sky.aerosol_density = 1.5
sky.ozone_density = 1.2
sky.sun_size = math.radians(0.7)
sky.sun_intensity = 1.0
sky.name = "Gok"
bg = nt.nodes.new("ShaderNodeBackground")
bg.inputs["Strength"].default_value = 1.0
wo = nt.nodes.new("ShaderNodeOutputWorld")
nt.links.new(sky.outputs["Color"], bg.inputs["Color"])
nt.links.new(bg.outputs["Background"], wo.inputs["Surface"])
# hacimsel sis: sinirli kutu hacmi (dunya hacmi gogu karartiyor)
def fog_box(name, x0, x1, y0, y1, z0, z1, density, aniso=0.5, color=(0.8, 0.86, 1.0, 1), noise=None):
    v = np.array([[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0], [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]], dtype=np.float32)
    f = np.array([[0, 3, 2, 1], [4, 5, 6, 7], [0, 1, 5, 4], [1, 2, 6, 5], [2, 3, 7, 6], [3, 0, 4, 7]])
    o = mesh_from_numpy(name, v, f, col_terrain, [], smooth=False)
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    n2 = m.node_tree
    n2.nodes.clear()
    out = n2.nodes.new("ShaderNodeOutputMaterial")
    vs_ = n2.nodes.new("ShaderNodeVolumePrincipled")
    vs_.inputs["Color"].default_value = color
    vs_.inputs["Anisotropy"].default_value = aniso
    vs_.inputs["Density"].default_value = density
    if "Absorption Color" in vs_.inputs:
        vs_.inputs["Absorption Color"].default_value = (1, 1, 1, 1)
    n2.links.new(vs_.outputs["Volume"], out.inputs["Volume"])
    if noise:
        tc = n2.nodes.new("ShaderNodeTexCoord")
        mp = n2.nodes.new("ShaderNodeMapping")
        mp.inputs["Scale"].default_value = (1, 1, noise.get("zscale", 3.0))
        n2.links.new(tc.outputs["Object"], mp.inputs["Vector"])
        nz = n2.nodes.new("ShaderNodeTexNoise")
        nz.inputs["Scale"].default_value = noise["scale"]
        nz.inputs["Detail"].default_value = 3.0
        n2.links.new(mp.outputs["Vector"], nz.inputs["Vector"])
        cr = n2.nodes.new("ShaderNodeValToRGB")
        cr.color_ramp.elements[0].position = noise.get("lo", 0.35)
        cr.color_ramp.elements[1].position = noise.get("hi", 0.7)
        n2.links.new(nz.outputs["Fac"], cr.inputs["Fac"])
        # yukseklik: alt/ust solma
        sep = n2.nodes.new("ShaderNodeSeparateXYZ")
        n2.links.new(tc.outputs["Generated"], sep.inputs[0])
        rz = n2.nodes.new("ShaderNodeMapRange")
        rz.inputs["From Min"].default_value = 0.0
        rz.inputs["From Max"].default_value = 1.0
        rz.inputs["To Min"].default_value = 1.0
        rz.inputs["To Max"].default_value = 0.0
        n2.links.new(sep.outputs["Z"], rz.inputs["Value"])
        mu = n2.nodes.new("ShaderNodeMath")
        mu.operation = "MULTIPLY"
        n2.links.new(cr.outputs["Color"], mu.inputs[0]) if False else None
        sp2 = n2.nodes.new("ShaderNodeSeparateColor")
        n2.links.new(cr.outputs["Color"], sp2.inputs["Color"])
        n2.links.new(sp2.outputs["Red"], mu.inputs[0])
        n2.links.new(rz.outputs["Result"], mu.inputs[1])
        mu2 = n2.nodes.new("ShaderNodeMath")
        mu2.operation = "MULTIPLY"
        mu2.inputs[1].default_value = density
        n2.links.new(mu.outputs[0], mu2.inputs[0])
        n2.links.new(mu2.outputs[0], vs_.inputs["Density"])
    o.data.materials.append(m)
    o.visible_shadow = False if False else o.visible_shadow
    o.display_type = "WIRE"
    return o


fog_global = fog_box("Sis_Genel", -3200, 3200, -3200, 3200, -40, 1400, 0.00009)
fog_valley = fog_box("Sis_Vadi", -900, 900, -900, 500, -2, 30, 0.0035, 0.6, (0.9, 0.9, 1.0, 1),
                     noise=dict(scale=0.006, zscale=5.0, lo=0.45, hi=0.75))

# ---------------------------------------------------------------------------
# Varsayilan onizleme kamerasi
# ---------------------------------------------------------------------------
cam_data = bpy.data.cameras.new("Kamera_Ucus")
cam_data.lens = 32
cam_data.sensor_width = 36
cam_data.clip_start = 0.5
cam_data.clip_end = 8000
cam = bpy.data.objects.new("Kamera_Ucus", cam_data)
col_cam.objects.link(cam)
scn.camera = cam
cam.location = (-250, -420, 60)
cam.rotation_euler = (math.radians(86), 0, math.radians(-30))
