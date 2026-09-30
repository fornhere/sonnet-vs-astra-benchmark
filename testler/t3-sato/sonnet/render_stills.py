"""Kapak/ilustrasyon kareleri: blender -b sato.blend --python render_stills.py -- [cozunurluk_yuzdesi] [ornek] [cikti_klasoru]"""
import bpy, sys, os
argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
pct = int(argv[0]) if len(argv) > 0 else 100
spp = int(argv[1]) if len(argv) > 1 else 160
outdir = argv[2] if len(argv) > 2 else os.path.join(os.path.dirname(bpy.data.filepath), "kapaklar")
os.makedirs(outdir, exist_ok=True)
scn = bpy.context.scene
prefs = bpy.context.preferences.addons['cycles'].preferences
prefs.compute_device_type = 'OPTIX'
prefs.get_devices()
for d in prefs.devices:
    d.use = (d.type == 'OPTIX')
scn.cycles.device = 'GPU'
scn.cycles.samples = spp
scn.cycles.use_denoising = True
scn.cycles.denoiser = "OPTIX"
scn.render.resolution_x = 2560
scn.render.resolution_y = 1440
scn.render.resolution_percentage = pct
scn.render.image_settings.file_format = "PNG"
JOBS = [
    ("kapak_1_altin_saat", "Kamera_Kapak_Ana", 1),
    ("kapak_2_alacakaranlik", "Kamera_Kapak_Ana", 480),
    ("kapak_3_havadan", "Kamera_Kapak_Havadan", 300),
    ("kapak_4_avlu", "Kamera_Avlu", 420),
]
only = os.environ.get("ONLY")
for name, cam, frame in JOBS:
    if only and only not in name:
        continue
    scn.camera = bpy.data.objects[cam]
    scn.frame_set(frame)
    scn.render.filepath = os.path.join(outdir, name + ".png")
    bpy.ops.render.render(write_still=True)
    print("KAPAK", name, flush=True)
