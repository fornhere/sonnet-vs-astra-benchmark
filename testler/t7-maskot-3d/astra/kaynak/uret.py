import bpy, math, os, sys
from mathutils import Vector
from math import sin, cos, pi
BASE=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
bpy.ops.object.select_all(action='SELECT'); bpy.ops.object.delete(use_global=False)
for d in bpy.data.materials: bpy.data.materials.remove(d)
sc=bpy.context.scene
sc.render.engine='CYCLES'; sc.cycles.samples=8;sc.cycles.adaptive_threshold=.07;sc.render.use_persistent_data=True; sc.cycles.use_denoising=True
sc.cycles.max_bounces=4; sc.cycles.diffuse_bounces=1; sc.cycles.glossy_bounces=2
sc.render.resolution_x=1280; sc.render.resolution_y=720; sc.render.resolution_percentage=100
sc.render.fps=24; sc.frame_start=1; sc.frame_end=192
sc.render.image_settings.file_format='PNG'; sc.render.film_transparent=False
sc.view_settings.view_transform='Khronos PBR Neutral';sc.view_settings.look='None';sc.view_settings.exposure=-.25
bpy.context.preferences.filepaths.save_version=0
sc.world.color=(.25,.25,.25)
sc.world.use_nodes=True; sc.world.node_tree.nodes['Background'].inputs[0].default_value=(.85,.9,1,1); sc.world.node_tree.nodes['Background'].inputs[1].default_value=.6

def mat(name,col,metal=0,rough=.3,coat=0):
 m=bpy.data.materials.new(name); m.diffuse_color=(*col,1); m.use_nodes=True
 p=m.node_tree.nodes.get('Principled BSDF'); p.inputs['Base Color'].default_value=(*col,1); p.inputs['Metallic'].default_value=metal; p.inputs['Roughness'].default_value=rough; p.inputs['Coat Weight'].default_value=coat; p.inputs['Coat Roughness'].default_value=.16
 return m
blue=mat('01 • Kobalt / sırlı seramik',(.002,.029,.48),0,.30,.18)
limb=mat('02 • Esnek kobalt',(.003,.038,.52),0,.34,.12)
ink=mat('03 • Gece mavisi',(.001,.003,.009),0,.62)
white=mat('04 • Göz / porselen',(.92,.95,1),0,.22,.25)
cyan=mat('05 • İris / turkuaz',(.005,.49,.9),.18,.24,.4)
back=mat('06 • Stüdyo / sıcak beyaz',(.86,.845,.79),0,.78)
platform=mat('07 • Podyum / tebeşir',(.96,.94,.88),0,.45)
textmat=mat('08 • Yazı / lacivert',(.003,.009,.028),0,.6)
for material in [blue,limb,ink,textmat]:material.node_tree.nodes.get('Principled BSDF').inputs['Specular IOR Level'].default_value=.24
bp=back.node_tree.nodes.get('Principled BSDF');bp.inputs['Emission Color'].default_value=(.86,.845,.79,1);bp.inputs['Emission Strength'].default_value=.32
# Very fine ceramic surface rather than visible noise.
n=blue.node_tree.nodes.new('ShaderNodeTexNoise'); n.inputs['Scale'].default_value=165;n.inputs['Detail'].default_value=2
b=blue.node_tree.nodes.new('ShaderNodeBump'); b.inputs['Strength'].default_value=.055;b.inputs['Distance'].default_value=.013
blue.node_tree.links.new(n.outputs['Fac'],b.inputs['Height']);blue.node_tree.links.new(b.outputs['Normal'],blue.node_tree.nodes.get('Principled BSDF').inputs['Normal'])
def empty(name,parent=None):
 o=bpy.data.objects.new(name,None);sc.collection.objects.link(o);o.parent=parent; o.empty_display_size=.3;return o
root=empty('RIG • Ana hareket');root['aciklama']='Tüm maskot. Z ekseni dönüş, konum ve squash/stretch ana kontrolü.'
bodyrig=empty('RIG • Gövde ve yüz',root)
def smooth(o,ma,parent=None):
 o.data.materials.append(ma);o.parent=parent
 if o.type=='MESH':
  for p in o.data.polygons:p.use_smooth=True
 return o
def uv(name,loc,scale,ma,parent=None,seg=64,rings=32):
 bpy.ops.mesh.primitive_uv_sphere_add(segments=seg,ring_count=rings,location=loc);o=bpy.context.object;o.name=name;o.scale=scale
 bpy.ops.object.transform_apply(location=False,rotation=False,scale=True);return smooth(o,ma,parent)
def path(name,points,radius,ma,parent=None,dynamic=False):
 cu=bpy.data.curves.new(name,'CURVE');cu.dimensions='3D';cu.resolution_u=24;cu.bevel_depth=radius;cu.bevel_resolution=5;cu.use_fill_caps=True
 s=cu.splines.new('NURBS' if dynamic else 'BEZIER')
 if dynamic:
  s.points.add(len(points)-1)
  for b,p in zip(s.points,points):b.co=(*p,1)
  s.order_u=min(3,len(points));s.use_endpoint_u=True
 else:
  s.bezier_points.add(len(points)-1)
  for b,p in zip(s.bezier_points,points):b.co=p;b.handle_left_type='AUTO';b.handle_right_type='AUTO'
 o=bpy.data.objects.new(name,cu);sc.collection.objects.link(o);o.data.materials.append(ma);o.parent=parent;return o
body=uv('GÖVDE • Delikli nazar boncuğu',(0,0,2.43),(1.14,.37,1.18),blue,bodyrig,128,64)
# Genuine through-hole with softly rounded edge.
bpy.ops.mesh.primitive_cylinder_add(vertices=64,radius=.118,depth=1.8,location=(0,0,3.34),rotation=(pi/2,0,0));cut=bpy.context.object
mod=body.modifiers.new('Gerçek askı deliği','BOOLEAN');mod.operation='DIFFERENCE';mod.object=cut
bpy.context.view_layer.objects.active=body;bpy.ops.object.modifier_apply(modifier=mod.name);bpy.data.objects.remove(cut,do_unlink=True)
bev=body.modifiers.new('Deliğin yumuşak kenarı','BEVEL');bev.width=.018;bev.segments=3
# Fine perimeter piping follows the flattened bead silhouette.
pts=[(1.133*cos(a),.035,2.43+1.173*sin(a)) for a in [2*pi*i/128 for i in range(129)]]
path('GÖVDE • İnce koyu dış hat',pts,.018,ink,bodyrig)
# Eye elements.
eye=uv('YÜZ • Tek göz akı',(0,-.352,2.55),(.50,.205,.46),white,bodyrig)
gaze=empty('RIG • Bakış',bodyrig);gaze.location=(.105,0,2.55)
uv('YÜZ • Turkuaz iris',(0,-.548,0),(.268,.061,.268),cyan,gaze)
uv('YÜZ • Siyah pupil',(.017,-.604,.017),(.157,.039,.17),ink,gaze)
uv('YÜZ • Göz ışığı',(-.045,-.634,.091),(.047,.012,.055),white,gaze,32,16)
# Sculpted eyelid with two shape keys, closed and alert.
NX,NY=48,12
verts=[]; faces=[]
def lidverts(boundary):
 out=[]
 for i in range(NX+1):
  x=-.523+1.046*i/NX; top=.54*math.sqrt(max(0,1-(x/.526)**2))
  low=max(-top,min(top,boundary+.13*x))
  for j in range(NY+1):
   z=low+(top-low)*j/NY
   y=-.576-.079*math.sqrt(max(0,1-(x/.55)**2-(z/.53)**2))
   out.append((x,y,2.55+z))
 return out
verts=lidverts(.075)
for i in range(NX):
 for j in range(NY):
  a=i*(NY+1)+j;faces.append((a,a+NY+1,a+NY+2,a+1))
me=bpy.data.meshes.new('Kapak yüzeyi');me.from_pydata(verts,[],faces);me.update()
lid=bpy.data.objects.new('YÜZ • Animasyonlu göz kapağı',me);sc.collection.objects.link(lid);smooth(lid,blue,bodyrig)
sol=lid.modifiers.new('Kapak kalınlığı','SOLIDIFY');sol.thickness=.018
lid.shape_key_add(name='Basis')
for nm,bound in [('Göz kırp',-.49),('Merak',.32)]:
 k=lid.shape_key_add(name=nm)
 for v,co in zip(k.data,lidverts(bound)):v.co=co
# Eyelid edge animates with the lid.
lashpts=[verts[i*(NY+1)] for i in range(0,NX+1,4)]
lash=path('YÜZ • Kapak çizgisi',lashpts,.014,ink,bodyrig,True)
brow=path('YÜZ • Tek kaş',[(-.46,-.457,2.96),(-.12,-.5,3.035),(.42,-.44,3.10)],.040,ink,bodyrig)
path('YÜZ • L burun',[(-.067,-.556,2.225),(-.054,-.578,1.970),(.135,-.543,1.994)],.037,ink,bodyrig)
mouth=path('YÜZ • Muzip gülümseme',[(-.21,-.419,1.828),(-.06,-.454,1.798),(.12,-.427,1.835)],.033,ink,bodyrig)
# Flexible limbs and individually sculpted fingers.
legs=[];arms=[];hands=[]
for side in [-1,1]:
 label='Sol' if side<0 else 'Sağ'
 path(label+' • Bacak',[(side*.39,.04,1.45),(side*.44,.015,.83),(side*.54,-.02,.28)],.112,limb,root)
 shoe=uv(label+' • Yuvarlak ayak',(side*.57,-.13,.22),(.43,.51,.22),blue,root)
 uv(label+' • Koyu taban',(side*.57,-.10,.087),(.42,.49,.054),ink,root)
 pts=[(side*.96,.01,2.0),(side*1.19,-.015,1.65),(side*1.30,-.065,1.27)]
 arm=path(label+' • Esnek kol',pts,.108,limb,root,True);arms.append(arm)
 hand=empty('RIG • '+label+' el',root);hand.location=pts[-1];hands.append(hand)
 uv(label+' • Avuç',(0,-.035,.05),(.20,.124,.24),limb,hand)
 for i,(x,h) in enumerate([(-.137,.26),(-.047,.37),(.05,.35),(.14,.255)]):
  path(label+' • Parmak '+str(i+1),[(x,-.025,.19),(x*1.15,-.036,.19+h*.55),(x*1.19,-.069,.19+h)],.056 if i<3 else .051,limb,hand)
  uv(label+' • Parmak ucu '+str(i+1),(x*1.19,-.069,.19+h),(.055,.055,.057),limb,hand,24,12)
 path(label+' • Başparmak',[(-side*.14,-.03,.04),(-side*.27,-.03,.15),(-side*.29,-.045,.26)],.073,limb,hand)
 uv(label+' • Başparmak ucu',(-side*.29,-.045,.26),(.072,.072,.076),limb,hand,24,12)
 # A soft palm crease adds readable hand structure.
 path(label+' • Avuç kıvrımı',[(-side*.12,-.152,.005),(-side*.07,-.159,.075),(-side*.1,-.147,.15)],.007,blue,hand)
# Set and camera.
bpy.ops.mesh.primitive_plane_add(size=200);floor=bpy.context.object;floor.name='SET • Sonsuz sıcak beyaz';floor.data.materials.append(back)
# Thin, almost flush circular display disc.
bpy.ops.mesh.primitive_cylinder_add(vertices=128,radius=1.70,depth=.055,location=(-1.80,.03,.004));ped=bpy.context.object;ped.name='SET • Seramik podyum';smooth(ped,platform)
bv=ped.modifiers.new('Yuvarlatılmış kenar','BEVEL');bv.width=.04;bv.segments=4
font=bpy.data.fonts.load('/usr/share/fonts/liberation/LiberationSans-Bold.ttf')
letters=[]
for i,ch in enumerate('FORN'):
 cu=bpy.data.curves.new('Harf '+ch,'FONT');cu.body=ch;cu.font=font;cu.size=1.20;cu.extrude=.028;cu.bevel_depth=.009;cu.bevel_resolution=4;cu.space_character=1.0
 o=bpy.data.objects.new('LOGO • '+ch,cu);sc.collection.objects.link(o);cu.materials.append(textmat);o.rotation_euler=(pi/2,0,0);o.location=(.1+i*.82,-.03,1.87);letters.append(o)
cu=bpy.data.curves.new('Slogan','FONT');cu.body='MERAKIN PEŞİNDEN.';cu.font=font;cu.size=.205;cu.space_character=1.14;cu.extrude=.001
slogan=bpy.data.objects.new('LOGO • MERAKIN PEŞİNDEN.',cu);sc.collection.objects.link(slogan);cu.materials.append(textmat);slogan.location=(.13,-.04,1.36);slogan.rotation_euler=(pi/2,0,0)
accent=path('LOGO • Turkuaz imza',[(0,0,0),(.62,0,0)],.025,cyan);accent.location=(.13,-.05,1.68)
# Camera is animated from character close-up into final brand lockup.
bpy.ops.object.camera_add();cam=bpy.context.object;cam.name='CAM • Ana kamera';sc.camera=cam;cam.data.type='ORTHO';cam.data.lens=52
for fr,x,sz in [(1,-1.8,9.0),(35,-1.8,7.8),(100,0,8.8),(192,0,8.8)]:
 tz=2.40 if fr==1 else 1.92
 cam.location=(x,-18,5.6+tz-1.92);target=Vector((x,0,tz));cam.rotation_euler=(target-cam.location).to_track_quat('-Z','Y').to_euler();cam.data.ortho_scale=sz
 cam.keyframe_insert('location',frame=fr);cam.keyframe_insert('rotation_euler',frame=fr);cam.data.keyframe_insert('ortho_scale',frame=fr)
def light(name,loc,energy,color,size,target,size_y=None):
 bpy.ops.object.light_add(type='AREA',location=loc);o=bpy.context.object;o.name=name;o.data.energy=energy;o.data.color=color;o.data.shape='DISK';o.data.size=size
 o.rotation_euler=(Vector(target)-o.location).to_track_quat('-Z','Y').to_euler();return o
light('LIGHT • Ana softbox',(-4,-6,8),1050,(.90,.95,1),4,(-1,0,2))
light('LIGHT • Sıcak dolgu',(5,-3,5),750,(1,.88,.72),4,(0,0,1.8))
light('LIGHT • Mavi kenar',(-1,4,6),1000,(.74,.86,1),3,(-1,0,2))
light('LIGHT • Uzun göz yansıması',(-3,-4,4),130,(1,1,1),1.1,(-1,0,2.5))
# Animation: arrival, anticipation, greeting, presentation, blink, resting hold.
def key(o,prop,vals):
 for fr,v in vals:setattr(o,prop,v);o.keyframe_insert(prop,frame=fr)
key(root,'location',[(1,(-1.8,0,.5)),(12,(-1.8,0,.70)),(25,(-1.8,0,.02)),(31,(-1.8,0,.11)),(39,(-1.8,0,.03)),(62,(-1.8,0,.045)),(86,(-1.8,0,.02)),(116,(-1.8,0,.04)),(145,(-1.8,0,.025)),(170,(-1.8,0,.04)),(192,(-1.8,0,.03))])
key(root,'rotation_euler',[(1,(0,-.09,-2.4)),(12,(0,.04,-.9)),(25,(0,0,.09)),(38,(0,0,0)),(59,(0,-.03,-.06)),(88,(0,0,.07)),(116,(0,0,0)),(192,(0,0,0))])
key(root,'scale',[(1,(.94,.98,1.08)),(17,(.96,.98,1.06)),(25,(1.10,1.04,.91)),(31,(.97,.99,1.035)),(39,(1,1,1)),(192,(1,1,1))])
def lerp(a,b,t):return a+(b-a)*t
def ease(t):return t*t*(3-2*t)
def interp(fr,points):
 if fr<=points[0][0]:return points[0][1]
 for (a,x),(b,y) in zip(points,points[1:]):
  if fr<=b:return lerp(x,y,ease((fr-a)/(b-a)))
 return points[-1][1]
for fr in range(1,193):
 # Right hand lifts into three clear, diminishing waves, then presents title.
 w=interp(fr,[(1,0),(40,0),(58,1),(88,1),(112,.48),(131,0),(192,0)])
 wave=sin((fr-57)*.43)*.22 if 58<=fr<=89 else 0
 for side,arm,hand in zip([-1,1],arms,hands):
  ww=w if side==1 else .10*sin(fr*.045)
  wrist=(side*(1.28+.17*ww),-.09-.12*ww,1.27+1.22*ww)
  elbow=(side*(1.20+.28*ww),-.025,1.67+.07*ww)
  pts=[(side*.96,.01,2.0),elbow,wrist]
  for bp,p in zip(arm.data.splines[0].points,pts):bp.co=(*p,1);bp.keyframe_insert('co',frame=fr)
  hand.location=wrist;hand.rotation_euler=(0,side*(pi-(pi+.2)*ww)+wave if side==1 else -pi+.08*sin(fr*.06),0)
  hand.keyframe_insert('location',frame=fr);hand.keyframe_insert('rotation_euler',frame=fr)
 # Gaze anticipates greeting, then logo, then audience.
 gx=interp(fr,[(1,.08),(32,.08),(44,.18),(59,.07),(87,.08),(105,.21),(121,.21),(137,.09),(192,.09)])
 gaze.location.x=gx;gaze.keyframe_insert('location',frame=fr)
 blink=0
 for center in [36,128,168]:blink=max(blink,max(0,1-abs(fr-center)/3))
 alert=interp(fr,[(1,0),(40,0),(49,.62),(61,.22),(89,.22),(116,0),(192,0)])
 lid.data.shape_keys.key_blocks['Göz kırp'].value=blink;lid.data.shape_keys.key_blocks['Göz kırp'].keyframe_insert('value',frame=fr)
 lid.data.shape_keys.key_blocks['Merak'].value=alert*(1-blink);lid.data.shape_keys.key_blocks['Merak'].keyframe_insert('value',frame=fr)
 lv=lidverts(.075);lb=lidverts(-.49);la=lidverts(.32)
 for i,bp in enumerate(lash.data.splines[0].points):
  idx=i*4*(NY+1);bp.co=tuple(lv[idx][j]+blink*(lb[idx][j]-lv[idx][j])+alert*(1-blink)*(la[idx][j]-lv[idx][j]) for j in range(3))+(1,);bp.keyframe_insert('co',frame=fr)
 brow.rotation_euler.y=interp(fr,[(1,0),(42,0),(53,-.075),(70,0),(106,.035),(132,0),(192,0)]);brow.keyframe_insert('rotation_euler',frame=fr)
for i,o in enumerate(letters):
 start=83+i*5
 key(o,'scale',[(1,(.001,)*3),(start,(.001,)*3),(start+12,(1.055,)*3),(start+19,(1,)*3),(192,(1,)*3)])
 key(o,'location',[(1,(.1+i*.82,-.03,1.65)),(start,(.1+i*.82,-.03,1.65)),(start+16,(.1+i*.82,-.03,1.87)),(192,(.1+i*.82,-.03,1.87))])
for ob in [slogan,accent]:key(ob,'scale',[(1,(.001,)*3),(108,(.001,)*3),(124,(1,)*3),(192,(1,)*3)])
# Hold the brand pose for a clean two-second editorial tail.
s=bpy.context.scene;s.frame_set(145)
objects=[bpy.data.objects[n] for n in ['RIG • Ana hareket','RIG • Bakış','RIG • Sol el','RIG • Sağ el','YÜZ • Tek kaş']]
trans=[(o,o.location.copy(),o.rotation_euler.copy(),o.scale.copy()) for o in objects]
curves=[bpy.data.objects[n].data for n in ['Sol • Esnek kol','Sağ • Esnek kol','YÜZ • Kapak çizgisi']]
points=[(p,p.co.copy()) for c in curves for sp in c.splines for p in sp.points]
keys=[(k,k.value) for k in bpy.data.objects['YÜZ • Animasyonlu göz kapağı'].data.shape_keys.key_blocks if k.name!='Basis']
for fr in range(145,193):
 for o,loc,rot,scale in trans:
  o.location=loc;o.rotation_euler=rot;o.scale=scale
  for prop in ['location','rotation_euler','scale']:o.keyframe_insert(prop,frame=fr)
 for p,co in points:p.co=co;p.keyframe_insert('co',frame=fr)
 for k,val in keys:k.value=val;k.keyframe_insert('value',frame=fr)
s.frame_set(145);s['KAPANIŞ']='145–192: sabit marka pozu';s.timeline_markers.new('06 / SABİT KAPANIŞ',frame=145)

# Timeline landmarks and useful metadata.
for name,frame in [('01 / DÖNÜŞ',1),('02 / İNİŞ',25),('03 / SELAM',58),('04 / FORN',90),('05 / SON POZ',137)]:sc.timeline_markers.new(name,frame=frame)
sc['PROJE']='FORN — Merakın peşinden';sc['SÜRE']='8 saniye / 24 fps / 1280 × 720';sc['KONTROLLER']='RIG boş nesneleri, göz kapağı shape keyleri, ayrı logo harfleri. Animasyon doğrudan anahtar karelidir.'
# Pack the reference into the file for future modeling work.
ref=bpy.data.images.load(os.path.join(BASE,'kaynak','karakter-sayfasi.png'));ref.use_fake_user=True;ref.pack()
for screen in bpy.data.screens:
 for area in screen.areas:
  if area.type=='VIEW_3D':area.spaces.active.region_3d.view_perspective='CAMERA'
sc.frame_set(145)
# An organized, self-contained production file.
for name in ['01 · MASKOT','02 · KONTROLLER','03 · SAHNE','04 · LOGO','05 · IŞIK VE KAMERA']:
 c=bpy.data.collections.new(name);sc.collection.children.link(c)
for o in list(sc.objects):
 name='02 · KONTROLLER' if o.type=='EMPTY' else '05 · IŞIK VE KAMERA' if o.type in {'LIGHT','CAMERA'} else '04 · LOGO' if o.name.startswith('LOGO') else '03 · SAHNE' if o.name.startswith('SET') else '01 · MASKOT'
 for c in list(o.users_collection):c.objects.unlink(o)
 bpy.data.collections[name].objects.link(o)
seq=sc.sequence_editor_create();seq.strips.new_sound('FORN • Özgün ses tasarımı',os.path.join(BASE,'kaynak','forn-ses.wav'),channel=1,frame_start=1).volume=10**(8.81/20)
bpy.ops.file.pack_all()
sc.render.filepath='//kareler/forn_'
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(BASE,'maskot.blend'))
args=sys.argv[sys.argv.index('--')+1:] if '--' in sys.argv else []
if 'preview' in args:
 sc.render.resolution_percentage=60;sc.cycles.samples=24
 for f in [25,70,145]:
  sc.frame_set(f);sc.render.filepath=os.path.join(BASE,'onizleme',f'kare_{f:03d}.png');bpy.ops.render.render(write_still=True)
elif 'render' in args:bpy.ops.render.render(animation=True)
