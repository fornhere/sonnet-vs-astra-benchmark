"""Onizleme: BLEND, VIEWS="ad:x,y,z>tx,ty,tz;Fnn:kare"  (Fnn -> ucus animasyonundan kare nn), RES (yuzde), SAMPLES"""
import bpy, os, math, sys
from mathutils import Vector
blend = os.environ.get("BLEND", "/tmp/build1.blend")
bpy.ops.wm.open_mainfile(filepath=blend)
scn = bpy.context.scene
prefs = bpy.context.preferences.addons['cycles'].preferences
prefs.compute_device_type = 'OPTIX'
prefs.get_devices()
for d in prefs.devices:
    d.use = (d.type == 'OPTIX')
scn.cycles.device = 'GPU'
scn.cycles.samples = int(os.environ.get("SAMPLES", "24"))
scn.render.resolution_percentage = int(os.environ.get("RES", "50"))
scn.cycles.use_adaptive_sampling = True
flight = scn.camera
E = os.environ
vs = scn.view_settings
if "EXPO" in E: vs.exposure = float(E["EXPO"])
if "LOOK" in E: vs.look = E["LOOK"]
wt = scn.world.node_tree
sky = wt.nodes["Gok"]
if "SUN_ELEV" in E or "SUN_ROT" in E:
    if wt.animation_data: wt.animation_data_clear()
    if "SUN_ELEV" in E: sky.sun_elevation = math.radians(float(E["SUN_ELEV"]))
    if "SUN_ROT" in E: sky.sun_rotation = math.radians(float(E["SUN_ROT"]))
if "SKYSTR" in E: wt.nodes["Background"].inputs["Strength"].default_value = float(E["SKYSTR"])
if "FOGG" in E: bpy.data.materials["Sis_Genel"].node_tree.nodes["Principled Volume"].inputs["Density"].default_value = float(E["FOGG"])
if "FOGV" in E: bpy.data.objects["Sis_Vadi"].hide_render = (float(E["FOGV"]) == 0)
pvd = bpy.data.cameras.new("PV")
pvd.lens = float(os.environ.get("LENS", "32"))
pvd.clip_end = 8000
pv = bpy.data.objects.new("PV", pvd)
scn.collection.objects.link(pv)
for v in os.environ["VIEWS"].split(";"):
    name, rest = v.split(":")
    if name.startswith("F"):
        scn.camera = flight
        scn.frame_set(int(rest))
    else:
        scn.camera = pv
        a, t = rest.split(">")
        loc = Vector([float(k) for k in a.split(",")])
        tgt = Vector([float(k) for k in t.split(",")])
        pv.location = loc
        pv.rotation_euler = (tgt - loc).to_track_quat("-Z", "Y").to_euler()
    scn.render.filepath = f"/tmp/pv_{name}.png"
    bpy.ops.render.render(write_still=True)
    print("OK", name)
