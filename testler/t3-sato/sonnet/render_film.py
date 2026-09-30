"""Film render (PNG dizisi). Kullanim:
blender -b sato.blend --python render_film.py -- BASLA BITIS ADIM [ORNEK] [OUTDIR]
Ornek: 'ADIM'=2 ise BASLA'dan baslayip iki karede bir render eder (once tekler, sonra ciftler icin ikinci turda BASLA+1).
Mevcut dosya varsa atlar (devam edilebilir).
"""
import bpy, sys, os

argv = sys.argv[sys.argv.index("--") + 1:]
f0, f1, step = int(argv[0]), int(argv[1]), int(argv[2])
samples = int(argv[3]) if len(argv) > 3 else 48
outdir = argv[4] if len(argv) > 4 else os.path.join(os.path.dirname(bpy.data.filepath), "kareler")
os.makedirs(outdir, exist_ok=True)

scn = bpy.context.scene
prefs = bpy.context.preferences.addons['cycles'].preferences
prefs.compute_device_type = 'OPTIX'
prefs.get_devices()
for d in prefs.devices:
    d.use = (d.type == 'OPTIX')
scn.cycles.device = 'GPU'
cy = scn.cycles
cy.samples = samples
cy.use_adaptive_sampling = True
cy.adaptive_threshold = 0.03
cy.adaptive_min_samples = 16
cy.use_denoising = True
cy.denoiser = "OPTIX"
scn.render.image_settings.file_format = "PNG"
scn.render.image_settings.color_depth = "8"
scn.render.image_settings.compression = 15
scn.render.use_persistent_data = True
for f in range(f0, f1 + 1, step):
    path = os.path.join(outdir, f"f_{f:04d}.png")
    if os.path.exists(path):
        continue
    scn.frame_set(f)
    scn.render.filepath = path
    bpy.ops.render.render(write_still=True)
    print("KARE", f, flush=True)
