import bpy, math
from mathutils import Vector
scn = bpy.context.scene
co = bpy.data.objects["Kamera_Avlu"]
co.location = (18, -38, 66)
co.rotation_euler = (Vector((-2, 16, 70)) - co.location).to_track_quat("-Z", "Y").to_euler()
co.data.lens = 26
scn.cycles.samples = 128
scn.cycles.denoiser = "OPENIMAGEDENOISE"
t = bpy.data.texts.new("OKU_BENI")
t.write("""RAVENHOLD (Kuzgun Kalesi) -- Blender 5.2 / Cycles
Olcek: 1 BU = 1 m. Su z=0, kale platosu/avlu z=50.
Kameralar: Kamera_Ucus (animasyonlu, kare 1-480, 24 fps), Kamera_Kapak_Ana, Kamera_Kapak_Havadan,
           Kamera_Avlu, Kamera_Gun_Batimi_Goldan (sabit).
Gun batimi: World > 'Gok' (Sky Texture) sun_elevation anahtar karelidir; pencere isigi 'Pencere_Isik' >
           'GlowStrength' dugumu anahtar karelidir.
GPU: Preferences > System > Cycles Render Devices > OptiX.
Koleksiyonlar: Kale (parcalar ayri nesne), Koy, Arazi_ve_Su, Bitki_Ortusu, Bayraklar_Kuslar, Isiklar, Kameralar.
Kaynak betikler (src/build.py) sahneyi sifirdan uretir.
""")
scn.camera = bpy.data.objects["Kamera_Ucus"]
scn.frame_set(1)
bpy.ops.wm.save_mainfile(compress=True)
print("KAYDEDILDI")
