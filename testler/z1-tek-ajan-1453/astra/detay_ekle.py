# Executed by sahne_kur.py before saving. Uses the same procedural construction helpers.
# Refinement of the studio card and background, with no KIT data edits.
for ob in list(C.objects):
 if any(s in ob.name for s in ['Başlık_', '60_Stüdyo_fonu']):bpy.data.objects.remove(ob,do_unlink=True)
# Opaque emissive sweep, well beyond the kit and parallel to the original lens.
backmat=bpy.data.materials.new('C3_Gün_doğumu_fonu');backmat.use_nodes=True
nt=backmat.node_tree;nt.nodes.clear();out=nt.nodes.new('ShaderNodeOutputMaterial');em=nt.nodes.new('ShaderNodeEmission');tc=nt.nodes.new('ShaderNodeTexCoord');sep=nt.nodes.new('ShaderNodeSeparateXYZ');nt.links.new(tc.outputs['Generated'],sep.inputs[0]);r=nt.nodes.new('ShaderNodeValToRGB')
r.color_ramp.elements[0].position=.2;r.color_ramp.elements[0].color=(.035,.070,.085,1)
r.color_ramp.elements[1].position=.85;r.color_ramp.elements[1].color=(.008,.018,.027,1)
e=r.color_ramp.elements.new(.47);e.color=(.14,.145,.135,1)
nt.links.new(sep.outputs['Y'],r.inputs[0]);nt.links.new(r.outputs[0],em.inputs['Color']);em.inputs['Strength'].default_value=.6;nt.links.new(em.outputs[0],out.inputs['Surface'])
me=bpy.data.meshes.new('Stüdyo sonsuz fon');me.from_pydata([(-19000,-15000,0),(19000,-15000,0),(19000,15000,0),(-19000,15000,0)],[],[(0,1,2,3)]);me.materials.append(backmat);ob=bpy.data.objects.new('C3_60_Stüdyo_fonu',me);C.objects.link(ob);ob.location=cardpoint(0,0,-25000);ob.rotation_euler=rot
# Lettering is self-lit like foil in a studio reflection: stable and fully legible.
labelmat=M[letter];shader=labelmat.node_tree.nodes.get('Principled BSDF');shader.inputs['Emission Color'].default_value=(.83,.74,.54,1);shader.inputs['Emission Strength'].default_value=.65
for nm,tx,x,y,sz in [('Başlık_üst','K O N S T A N T İ N O P O L İ S',-2890,1510,57),('Başlık_tarih','1453',-2920,1060,420),('Başlık_alt','29 MAYIS   /   ŞAFAK',-2880,925,79)]:textob(nm,tx,cardpoint(x,y),sz,letter,rot,font)
curve('Başlık_pirinç_çizgi',[cardpoint(-2880,835),cardpoint(-1840,835)],2.5,gold)
# Small edition mark in the opposite corner balances the museum title.
textob('Başlık_edisyon','İSTANBUL  /  ZAMAN KESİTİ 03',cardpoint(1730,1510),43,letter,rot,font)
# Refined warm directional light; the original KIT sun stays byte-for-byte intact.
bpy.data.lights['C3_Şafak • doğudan bal ışığı'].energy=5.8
bpy.data.lights['C3_Şafak • doğudan bal ışığı'].color=(1,.48,.19)
sc.view_settings.exposure=-1.0

# Courtyard walls and enclosed orchards introduce human-scale structure without figures.
by=B('34_Mahalle_avluları_ve_bahçe_duvarları')
for i,(x,y) in enumerate(occupied):
 if i%4:continue
 # slim, partially broken garden enclosure on the back of a dwelling
 w=random.uniform(33,47);l=random.uniform(30,53);cy=y+l*.8
 for a,q in [((x-w/2,cy-l/2),(x-w/2,cy+l/2)),((x-w/2,cy+l/2),(x+w/2,cy+l/2)),((x+w/2,cy+l/2),(x+w/2,cy-l/2))]:
  aa=Vector(a);bb=Vector(q);mid=(aa+bb)/2;z=ground(mid.x,mid.y)
  by.box((mid.x,mid.y,z+3),(float((bb-aa).length),2.5,6),stone,math.atan2(bb.y-aa.y,bb.x-aa.x))
by.finish()
# A roofless basilica / masonry remnant: visibly empty rather than a new sanctuary.
b=B('51_Harap_bazilika',(-2210,-250,ground(-2210,-250)),(1.8,1.8,1.8),.12)
for side in [-1,1]:
 b.box((side*22,0,7),(4,80,14),stone)
 for j in range(8):
  yy=-33+j*10;b.cyl((side*13,yy,0),1.8,random.uniform(6,14),lightstone,10)
b.box((0,-40,4),(46,4,8),stone)
for j in range(18):
 a=j/17*math.pi;b.box((22*math.cos(a),40+22*math.sin(a),10),(5,4,20),stone,a)
b.finish()
# Former masonry cistern, orchard-walled and partially ruined.
b=B('52_Açık_sarnıç_ve_kalıntılar',(-3060,-80,ground(-3060,-80)),(1,1,1),.1)
for s in [-1,1]:b.box((s*65,0,8),(6,180,16),brick);b.box((0,s*90,8),(136,6,16),brick)
for xx in [-42,-14,14,42]:
 for yy in [-65,-35,-5,25,55]:b.cyl((xx,yy,0),3,random.uniform(5,12),stone,8)
b.finish()
# Tiny church roofs in two distant districts, modest Byzantine basilicas.
for i,(x,y) in enumerate([(-2830,330),(-1790,-470)]):
 z=ground(x,y);b=B('53_Mahalle_bazilikası_%d'%i,(x,y,z),(1.5,1.5,1.7),.2)
 b.box((0,0,10),(27,47,20),stone);b.roof((0,0,20),31,51,10,roof[2])
 b.cyl((0,12,24),8,5,brick,24);b.dome((0,12,29),8.4,7,lead,32,8)
 for xx in [-8,0,8]:arch_window(b,xx,-23.6,3,4,10)
 b.finish()

# Carved resin ripple highlights: geometry only, preserving the kit water material.
b=B('44_Reçine_deniz • ince dalga çizgileri')
for i in range(1900):
 x=random.uniform(-4200,3100);y=random.uniform(-2100,2950)
 if ground(x,y)>-.1:continue
 # The strongest glints form an eastern dawn reflection, others stay subdued.
 if random.random()>.5 and x<0:continue
 length=random.uniform(7,25)
 pts=[(x-length/2+j/4*length,y+1.7*math.sin(j/4*math.pi),1.12) for j in range(5)]
 for a,q in zip(pts,pts[1:]):b.rod(a,q,random.uniform(.25,.5),foam,4)
b.finish()
# Small model docks in Galata and Kasimpasa, free of anachronistic equipment.
b=B('45_Ahşap_iskeleler')
for x,y,ang in [(-820,653,.1),(-1180,670,-.25),(-1670,1510,.9)]:
 for j in range(11):
  dx=math.sin(ang)*j*5;dy=-math.cos(ang)*j*5;b.box((x+dx,y+dy,7),(20,4.5,2),wood,ang)
  if j%3==0:
   for s in [-1,1]:b.cyl((x+dx+s*8*math.cos(ang),y+dy+s*8*math.sin(ang),0),1.5,12,wood,8)
b.finish()
# Subtle annotations anchored to architecture. All are independent C3 objects,
# facing the original camera, with fine brass leaders and no geographic edits.
from bpy_extras.object_utils import world_to_camera_view
W=5800*36/32;H=W*1080/1920
def screenlocal(world):
 v=world_to_camera_view(sc,cam,Vector(world));return ((v.x-.5)*W,(v.y-.5)*H)
def annotate(nm,title,subtitle,target,offset,size=35):
 x,y=screenlocal(target);ex=x+offset[0];ey=y+offset[1]
 pts=[cardpoint(x,y,-5780),cardpoint(ex,ey,-5780),cardpoint(ex+155,ey,-5780)]
 curve('Etiket_'+nm+'_işaret',pts,1.05,gold)
 textob('Etiket_'+nm,title,cardpoint(ex+8,ey+24,-5780),size,letter,rot,font)
 textob('Etiket_'+nm+'_alt',subtitle,cardpoint(ex+8,ey-30,-5780),size*.64,letter,rot,font)
annotate('Ayasofya','AYASOFYA','562 KUBBESİ · MİNARESİZ',(-615,-890,ground(-615,-890)+265),(-370,200),38)
annotate('Galata','GALATA','CENEVİZ · 1348',(-1080,1120,ground(-1080,1120)+205),(160,280),36)
annotate('Kadırgalar','HALİÇ’TEKİ KADIRGALAR','22 NİSAN’DA KARADAN İNDİRİLDİ',(-2000,1350,60),(-820,470),36)
annotate('Zincir','HALİÇ ZİNCİRİ','EUGENIOS — GALATA',(-730,440,16),(370,-145),35)
# Selected shoreline trees and shrubs in the formerly imperial gardens.
b=B('35_Sarayburnu_servileri')
for i in range(70):
 x=random.uniform(-370,-115);y=random.uniform(-1150,-170)
 if ground(x,y)<15 or math.hypot(x+440,y+510)<150:continue
 z=ground(x,y);h=random.uniform(25,48)
 b.cyl((x,y,z),1.6,h*.2,wood,6);b.cyl((x,y,z+h*.13),random.uniform(5,8),h,greens[i%4],10,r2=0)
b.finish()
# Final presentation pass: correctly orient the east light, polish the main miniatures.
bpy.data.objects['C3_Şafak • doğudan bal ışığı'].rotation_euler.z=math.radians(105)
bpy.data.lights['C3_Şafak • doğudan bal ışığı'].energy=7.0
sc.view_settings.exposure=-1.15
for ob in C.objects:
 if ob.type=='MESH' and any(s in ob.name for s in ['10_AYASOFYA','11_AYA_İRİNİ','12_GALATA']):
  for p in ob.data.polygons:
   if p.material_index==lead:p.use_smooth=True
  mod=ob.modifiers.new('Elle işlenmiş yumuşak taş kenarları','BEVEL');mod.width=.6;mod.segments=2;mod.limit_method='ANGLE'
# Readable labels sit in front of the model, yet point to actual projected positions.
for ob in list(C.objects):
 if 'Etiket_' in ob.name:bpy.data.objects.remove(ob,do_unlink=True)
def annotate(nm,title,subtitle,target,offset,size=54):
 x,y=screenlocal(target);ex=x+offset[0];ey=y+offset[1];depth=3400;factor=depth/5800
 def cp(u,v):return cardpoint(u*factor,v*factor,-depth)
 curve('Etiket_'+nm+'_işaret',[cp(x,y),cp(ex,ey),cp(ex+210,ey)],.80,gold)
 # a very small terminal marks the exact miniature being annotated
 curve('Etiket_'+nm+'_uç',[cp(x-5,y),cp(x+5,y)],1.6,gold)
 textob('Etiket_'+nm,title,cp(ex+8,ey+30),size*factor,letter,rot,font)
 textob('Etiket_'+nm+'_alt',subtitle,cp(ex+8,ey-37),size*.64*factor,letter,rot,font)
annotate('Ayasofya','AYASOFYA','562 KUBBESİ · MİNARESİZ',(-615,-890,ground(-615,-890)+265),(-1050,-730),60)
annotate('İrini','AYA İRİNİ','BİZANS BAZİLİKASI',(-440,-510,ground(-440,-510)+175),(950,-700),56)
annotate('Galata','GALATA KULESİ','CENEVİZ · 1348',(-1080,1120,ground(-1080,1120)+205),(300,380),55)
annotate('Kadırgalar','HALİÇ’TEKİ KADIRGALAR','22 NİSAN’DA KARADAN İNDİRİLDİ',(-2000,1350,60),(-1050,530),54)
annotate('Zincir','HALİÇ ZİNCİRİ','EUGENIOS — GALATA',(-730,440,16),(540,-280),54)
ship('42_Osmanlı_baştarda • Haliç içinde',-1660,930,.26,175,True)
# A small, clearly presentational cartographic seal in empty resin water.
x,y=1000,-1150
b=B('70_Pirinç_yön_gülü',(x,y,2))
for j in range(8):
 a=j*math.pi/4;r1=94 if j%2==0 else 57;rr=17
 u=Vector((math.sin(a),math.cos(a),0));v=Vector((math.cos(a),-math.sin(a),0))
 b.mesh([tuple(u*r1+Vector((0,0,1))),tuple(v*rr+Vector((0,0,1))),tuple(Vector((0,0,3)))],[(0,1,2)],gold)
 b.mesh([tuple(u*r1+Vector((0,0,1))),tuple(-v*rr+Vector((0,0,1))),tuple(Vector((0,0,3)))],[(0,1,2)],base)
pts=[(115*math.sin(j*math.tau/80),115*math.cos(j*math.tau/80),1.5) for j in range(81)]
for a,q in zip(pts,pts[1:]):b.rod(a,q,.8,gold,4)
b.finish()
textob('71_Kuzey','K',(x-10,y+133,3),35,gold,(0,0,0),font)
textob('72_Marmara','M A R M A R A',(x-245,y-205,3),50,letter,(0,0,0),font)
# Pack external font binaries so the deliverable is self-contained.
bpy.ops.file.pack_all()

for ob in C.objects:
 if '61_Şafak_dumanı_' in ob.name:
  nt=ob.data.materials[0].node_tree;vol=next(n for n in nt.nodes if n.type=='PRINCIPLED_VOLUME');mr=next(n for n in nt.nodes if n.type=='MAP_RANGE');tc=next(n for n in nt.nodes if n.type=='TEX_COORD')
  mr.inputs['To Max'].default_value=.014
  sub=nt.nodes.new('ShaderNodeVectorMath');sub.operation='SUBTRACT';sub.inputs[1].default_value=(.5,.5,.5);nt.links.new(tc.outputs['Generated'],sub.inputs[0])
  leng=nt.nodes.new('ShaderNodeVectorMath');leng.operation='LENGTH';nt.links.new(sub.outputs[0],leng.inputs[0])
  fall=nt.nodes.new('ShaderNodeMapRange');fall.inputs['From Min'].default_value=.15;fall.inputs['From Max'].default_value=.5;fall.inputs['To Min'].default_value=1;fall.inputs['To Max'].default_value=0;nt.links.new(leng.outputs['Value'],fall.inputs[0])
  mul=nt.nodes.new('ShaderNodeMath');mul.operation='MULTIPLY';nt.links.new(fall.outputs[0],mul.inputs[0]);nt.links.new(mr.outputs[0],mul.inputs[1]);nt.links.new(mul.outputs[0],vol.inputs['Density'])
  ob.rotation_euler.y=-.24
# Hand-cut foundation aprons close small gaps beneath level landmark models.
for name,cx,cy,scale,boxes in [('Ayasofya',-615,-890,3.3,[(0,0,104,122),(0,-77,78,38)]),('Irini',-440,-510,2.8,[(0,0,44,79)])]:
 b=B('36_'+name+'_araziye_oturan_kaide');ca=math.cos(math.radians(-12));sa=math.sin(math.radians(-12));top=ground(cx,cy)+5.05
 for ox,oy,w,h in boxes:
  vv=[]
  for dx,dy in [(-w/2,-h/2),(w/2,-h/2),(w/2,h/2),(-w/2,h/2)]:
   xx=(dx+ox)*scale;yy=(dy+oy)*scale;x=cx+ca*xx-sa*yy;y=cy+sa*xx+ca*yy;vv.append((x,y,top))
  vv+= [(x,y,min(ground(x,y)-.2,top-.5)) for x,y,z in vv]
  b.mesh(vv,[(0,1,2,3),(0,4,5,1),(1,5,6,2),(2,6,7,3),(3,7,4,0)],stone)
 b.finish()
# C3 participates only in its assigned era interval.
for ob in C.objects:
 for f,hidden in [(1,True),(1140,True),(1141,False),(1590,False),(1591,True),(3300,True)]:
  ob.hide_render=hidden;ob.keyframe_insert(data_path='hide_render',frame=f)
  ob.hide_viewport=hidden;ob.keyframe_insert(data_path='hide_viewport',frame=f)
sc.frame_set(1365)
for screen in bpy.data.screens:
 for area in screen.areas:
  if area.type=='VIEW_3D':
   area.spaces.active.region_3d.view_perspective='CAMERA'
sc.render.resolution_percentage=100
