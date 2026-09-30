import bpy, math, random, json
from mathutils import Vector, Matrix
from pathlib import Path
from collections import defaultdict
R=Path(__file__).resolve().parent
random.seed(1453)
sc=bpy.context.scene
C=bpy.data.collections['C3_1453_Safak']
for o in list(C.all_objects): bpy.data.objects.remove(o,do_unlink=True)
terrain=bpy.data.objects['KIT_Arazi']
def ground(x,y):
 hit,p,n,i=terrain.ray_cast(Vector((x,y,900)),Vector((0,0,-1)))
 return p.z if hit else 0
M=[]
def mat(name,color,rough=.8,metal=0,noise=0):
 m=bpy.data.materials.new('C3_'+name);m.diffuse_color=(*color,1);m.use_nodes=True
 b=m.node_tree.nodes.get('Principled BSDF');b.inputs['Base Color'].default_value=(*color,1);b.inputs['Roughness'].default_value=rough;b.inputs['Metallic'].default_value=metal
 if noise:
  n=m.node_tree.nodes.new('ShaderNodeTexNoise');n.inputs['Scale'].default_value=noise;n.inputs['Detail'].default_value=2
  g=m.node_tree.nodes.new('ShaderNodeNewGeometry');m.node_tree.links.new(g.outputs['Position'],n.inputs['Vector'])
  ramp=m.node_tree.nodes.new('ShaderNodeValToRGB');ramp.color_ramp.elements[0].color=(*(v*.65 for v in color),1);ramp.color_ramp.elements[1].color=(*(min(v*1.18,1) for v in color),1)
  m.node_tree.links.new(n.outputs['Fac'],ramp.inputs[0]);m.node_tree.links.new(ramp.outputs[0],b.inputs['Base Color'])
 M.append(m);return len(M)-1
stone=mat('Kireçtaşı • sıcak fildişi',(.68,.57,.40),noise=.12)
lightstone=mat('Kesme taş • açık',(.84,.74,.55),noise=.15)
brick=mat('Bizans tuğla hatılları',(.40,.16,.095),noise=.35)
roof=[mat('Kiremit_%02d'%i,c,noise=.23) for i,c in enumerate([(.36,.115,.065),(.48,.18,.10),(.29,.09,.055),(.53,.24,.125),(.37,.23,.15)])]
plaster=[mat('Sıva_%02d'%i,c,noise=.15) for i,c in enumerate([(.65,.52,.36),(.74,.65,.47),(.48,.42,.32),(.76,.61,.43),(.53,.43,.32)])]
lead=mat('Dövme kurşun kubbe',(.17,.25,.25),.48,.48,.18)
ribmat=mat('Kurşun kenet',(.34,.40,.37),.48,.55)
dark=mat('Karanlık açıklık',(.036,.039,.032))
wood=mat('Eskitilmiş ceviz',(.17,.085,.038),noise=.2)
gold=mat('Patinalı pirinç',(.61,.39,.13),.35,.68)
sail=mat('Keten yelken',(.82,.73,.51),noise=.3)
pathmat=mat('Kireç çakıl yollar',(.48,.41,.29),noise=.11)
soil=mat('Bostan toprağı',(.21,.20,.115),noise=.2)
greens=[mat('Ağaç_%d'%i,c,noise=.18) for i,c in enumerate([(.10,.17,.075),(.18,.25,.095),(.23,.28,.12),(.13,.21,.12)])]
foam=mat('Solgun su izi',(.33,.48,.43),.3)
base=mat('Koyu bronz levha',(.032,.055,.055),.48,.5)
letter=mat('Gravür • kemik',(.83,.74,.54),.5,.25)
class B:
 def __init__(self,name,origin=(0,0,0),scale=(1,1,1),rot=0):self.name=name;self.v=[];self.f=[];self.mi=[];self.origin=origin;self.scale=scale;self.rot=rot
 def mesh(self,v,f,m):
  n=len(self.v);c=math.cos(self.rot);s=math.sin(self.rot)
  for x,y,z in v:
   x*=self.scale[0];y*=self.scale[1];z*=self.scale[2];self.v.append((self.origin[0]+c*x-s*y,self.origin[1]+s*x+c*y,self.origin[2]+z))
  self.f.extend([tuple(n+i for i in fa) for fa in f]);self.mi.extend([m]*len(f))
 def box(self,p,sz,m,rot=0):
  x,y,z=p;a,b,h=[v/2 for v in sz];v=[];c=math.cos(rot);s=math.sin(rot)
  for dx,dy,dz in [(-a,-b,-h),(-a,-b,h),(-a,b,-h),(-a,b,h),(a,-b,-h),(a,-b,h),(a,b,-h),(a,b,h)]:v.append((x+dx*c-dy*s,y+dx*s+dy*c,z+dz))
  self.mesh(v,[(0,4,6,2),(1,3,7,5),(0,1,5,4),(2,6,7,3),(0,2,3,1),(4,5,7,6)],m)
 def cyl(self,p,r,h,m,n=16,r2=None):
  r2=r if r2 is None else r2;x,y,z=p;v=[(x+rr*math.cos(i*math.tau/n),y+rr*math.sin(i*math.tau/n),zz) for rr,zz in [(r,z),(r2,z+h)] for i in range(n)]
  f=[tuple(range(n-1,-1,-1)),tuple(range(n,2*n))]+[(i,(i+1)%n,(i+1)%n+n,i+n) for i in range(n)];self.mesh(v,f,m)
 def roof(self,p,w,l,h,m):
  x,y,z=p;v=[(x-w/2,y-l/2,z),(x+w/2,y-l/2,z),(x+w/2,y+l/2,z),(x-w/2,y+l/2,z),(x,y-l/2,z+h),(x,y+l/2,z+h)]
  self.mesh(v,[(0,1,4),(3,5,2),(0,4,5,3),(4,1,2,5),(0,3,2,1)],m)
 def dome(self,p,r,h,m,n=40,rings=10):
  x,y,z=p;v=[]
  for j in range(rings+1):
   a=j/rings*math.pi/2;rr=max(.0001,r*math.cos(a))
   for i in range(n):v.append((x+rr*math.cos(i/n*math.tau),y+rr*math.sin(i/n*math.tau),z+h*math.sin(a)))
  self.mesh(v,[(j*n+i,j*n+(i+1)%n,(j+1)*n+(i+1)%n,(j+1)*n+i) for j in range(rings) for i in range(n)],m)
 def rod(self,a,b,r,m,n=6):
  a=Vector(a);b=Vector(b);d=(b-a).normalized();u=d.cross(Vector((0,0,1)))
  if u.length<.01:u=d.cross(Vector((0,1,0)))
  u.normalize();w=d.cross(u);v=[tuple(p+r*(u*math.cos(i*math.tau/n)+w*math.sin(i*math.tau/n))) for p in (a,b) for i in range(n)]
  self.mesh(v,[(i,(i+1)%n,(i+1)%n+n,i+n) for i in range(n)],m)
 def finish(self):
  me=bpy.data.meshes.new(self.name);me.from_pydata(self.v,[],self.f);me.update();ob=bpy.data.objects.new('C3_'+self.name,me);C.objects.link(ob)
  for m in M:me.materials.append(m)
  for p,mi in zip(me.polygons,self.mi):p.material_index=mi
  return ob

def curve(name,points,r,m):
 b=B(name)
 for a,z in zip(points,points[1:]):b.rod(a,z,r,m)
 return b.finish()

# All heights are ray-cast onto the original terrain, without changing it.
# Coast is traced from the KIT mesh itself rather than approximated with a map.
segments=[]
for p in terrain.data.polygons:
 if len(p.vertices)!=4:continue
 vs=[terrain.data.vertices[i].co for i in p.vertices]
 if min(v.z for v in vs)<-20:continue
 hits=[]
 for a,b in zip(vs,vs[1:]+vs[:1]):
  if (a.z-4)*(b.z-4)<0:
   t=(4-a.z)/(b.z-a.z);hits.append((a.x+(b.x-a.x)*t,a.y+(b.y-a.y)*t))
 if len(hits)==2:segments.append(hits)
adj=defaultdict(list)
def key(p):return (round(p[0],2),round(p[1],2))
for a,b in segments:adj[key(a)].append(key(b));adj[key(b)].append(key(a))
paths=[];used=set()
for start in adj:
 if start in used:continue
 if len(adj[start])==1:
  chain=[];now=start;last=None
  while now not in used:
   used.add(now);chain.append(now);opts=[x for x in adj[now] if x!=last]
   if not opts:break
   last,now=now,opts[0]
  paths.append(chain)
# Major coastline (peninsula) has its closest point to Sarayburnu.
coast=min([p for p in paths if len(p)>100],key=lambda p:min(x*x+y*y for x,y in p))
def resample(points,spacing):
 out=[points[0]];carry=0
 for a,b in zip(points,points[1:]):
  a=Vector(a);b=Vector(b);d=(b-a).length
  if d<.001:continue
  while carry+d>=spacing:
   a=a+(b-a)*((spacing-carry)/d);out.append(tuple(a));d=(b-a).length;carry=0
  carry+=d
 return out
coast=resample(coast,48)
# Parapets and alternating towers, built as individually legible model stonework.
def wall(points,name,h=26,width=11,tower_every=4):
 b=B(name)
 for j,(p,q) in enumerate(zip(points,points[1:])):
  x,y=p;xx,yy=q;z=max(ground(x,y),4);zz=max(ground(xx,yy),4);length=math.hypot(xx-x,yy-y);ang=math.atan2(yy-y,xx-x);mid=((x+xx)/2,(y+yy)/2)
  zbase=min(z,zz)-3;top=max(z,zz)+h
  b.box((*mid,(zbase+top)/2),(length+3,width,top-zbase),stone,ang)
  b.box((*mid,top-7),(length+4,width+.8,1.8),brick,ang)
  b.box((*mid,top),(length+4,width+2,3),lightstone,ang)
  count=max(2,int(length/9))
  for k in range(count):
   t=(k+.3)/count;bx=x+(xx-x)*t;by=y+(yy-y)*t;b.box((bx,by,top+3.5),(4.5,width+1,7),lightstone,ang)
  if j%tower_every==0:
   th=top+14;tw=23
   b.box((x,y,(zbase+th)/2),(tw,tw,th-zbase),stone,ang)
   for lev in [th-19,th-9]:b.box((x,y,lev),(tw+1,tw+1,1.6),brick,ang)
   b.box((x,y,th),(tw+3,tw+3,3),lightstone,ang)
   for u in [-1,0,1]:
    for v in [-1,0,1]:
     if abs(u)==1 or abs(v)==1:b.box((x+u*8,y+v*8,th+4),(6,6,8),lightstone,ang)
   b.box((x,y-width-1,th-9),(3,1.2,7),dark)
 return b.finish()
citycoast=[]
for p in coast:
 if p[0]>-4100 and p[1]<2100:citycoast.append(p)
wall(citycoast,'01_Deniz_surları',27,12,4)
# Western double Theodosian defence, beyond the sparse gardens.
landpts=[(-4270,600),(-4250,1000),(-4100,1370),(-3930,1730),(-3780,2110),(-3570,2440)]
wall(resample(landpts,70),'02_Kara_surları_iç',45,17,3)
wall(resample([(x-70,y-15) for x,y in landpts],70),'03_Kara_surları_dış',20,10,5)
# Galata enceinte follows the Genoese town, not modern Beyoglu.
galatap=[(-1510,780),(-1500,1070),(-1360,1370),(-1010,1440),(-700,1240),(-530,930),(-610,735),(-930,650),(-1220,665),(-1510,780)]
wall(resample(galatap,45),'04_Ceneviz_Galata_surları',24,10,4)

# Architectural miniature: raised post-562 dome, forty drum lights, semi-domes,
# red brick bands, arcades, substantial pre-Ottoman buttressing. No minarets.
def arch_window(b,x,y,z,w,h,normal='y',m=dark):
 n=10;v=[(-w/2,0),(w/2,0),(w/2,h-w/2)]+[(math.cos(i*math.pi/n)*w/2,h-w/2+math.sin(i*math.pi/n)*w/2) for i in range(n+1)]
 if normal=='y':coords=[(x+u,y,z+v) for u,v in v]
 else:coords=[(x,y+u,z+v) for u,v in v]
 b.mesh(coords,[tuple(range(len(coords)))],m)
def church(name,pos,scale=3.1,small=False):
 x,y=pos;z=ground(x,y)+5;b=B(name,(x,y,z),(scale,scale,scale*1.3),math.radians(-12))
 if not small:
  b.box((0,0,1),(102,120,2),lightstone)
  b.box((0,0,12),(74,88,24),stone)
  b.box((0,0,23),(76,88,2),brick)
  b.box((0,0,26),(62,77,7),stone)
  # north and south gallery roofs
  for side in [-1,1]:
   b.roof((side*29,0,29),21,91,7,roof[1])
   for yy in [-40,-22,0,22,40]:
    b.box((side*39,yy,16),(9,11,32),lightstone)
    b.box((side*35,yy,29),(8,10,17),stone)
    # tapered exterior buttress shoulders
    b.mesh([(side*44,yy-5,0),(side*44,yy+5,0),(side*32,yy+5,35),(side*32,yy-5,35),(side*32,yy-5,0),(side*32,yy+5,0)],[(0,1,2,3),(0,3,4),(1,5,2),(4,3,2,5)],stone)
   for yy in range(-33,38,10):
    arch_window(b,side*37.05,yy,6,4,9,'x');arch_window(b,side*38.1,yy,20,3,6,'x')
  # central supporting square and high dome
  b.box((0,0,32),(39,40,15),stone)
  for zz in [28,32,36,39]:b.box((0,0,zz),(40,41,1),brick)
  for side in [-1,1]:
   b.cyl((0,side*28,27),19,4,stone,40);b.dome((0,side*28,31),19,11,lead)
   for ex in [-1,1]:b.dome((ex*14,side*38,24),10,7,lead,24,6)
  b.cyl((0,0,38),18.6,7,stone,80)
  b.cyl((0,0,44.5),19.1,1.2,ribmat,80)
  b.dome((0,0,45.5),19,14.4,lead,80,16)
  for i in range(40):
   a=i*math.tau/40;xx=18.71*math.cos(a);yy=18.71*math.sin(a)
   b.box((xx,yy,41.2),(1.6,.65,3.7),dark,a-math.pi/2)
   pts=[(19*math.cos(t)*math.cos(a),19*math.cos(t)*math.sin(a),45.6+14.4*math.sin(t)) for t in [j/12*math.pi/2 for j in range(13)]]
   for u,v in zip(pts,pts[1:]):b.rod(u,v,.16,ribmat,4)
  # west narthex and open arcaded forecourt
  b.box((0,-50,11),(73,13,22),stone);b.roof((0,-50,22),76,16,5,roof[0])
  for xx in range(-29,31,8):arch_window(b,xx,-56.6,1,5.2,13)
  for side in [-1,1]:
   b.box((side*35,-76,5),(5,40,10),stone);b.roof((side*35,-76,10),9,42,3,roof[1])
  b.box((0,-95,4),(74,4,8),stone)
  # shallow east apse
  b.cyl((0,47,0),12,24,stone,24);b.dome((0,47,24),12,7,lead,32,8)
 else:
  b.box((0,0,1),(42,77,2),lightstone);b.box((0,0,12),(30,54,24),stone)
  for zz in [5,10,15,20,24]:b.box((0,0,zz),(30.5,54.5,1.1),brick)
  b.roof((0,-12,25),33,34,10,roof[0]);b.box((0,11,27),(26,28,10),stone)
  b.cyl((0,11,30),12,8,stone,40);b.dome((0,11,38),12.6,10,lead,48,12)
  for i in range(16):
   a=i*math.tau/16;b.box((12.1*math.cos(a),11+12.1*math.sin(a),34.5),(2,.7,4.6),dark,a-math.pi/2)
  b.cyl((0,29,0),10,22,stone,24);b.dome((0,29,22),10,6,lead,32,8)
  for side in [-1,1]:
   for yy in [-20,-6,10,24]:b.box((side*17,yy,9),(5,5,18),lightstone)
   for yy in range(-20,25,9):arch_window(b,side*15.1,yy,10,3.2,8,'x')
  b.box((0,-38,5),(32,22,10),stone);b.roof((0,-38,10),33,24,5,roof[0])
  for xx in [-10,0,10]:arch_window(b,xx,-50.1,0,5,8)
 return b.finish()
church('10_AYASOFYA • 562 kubbesi · minaresiz',(-615,-890),3.3)
church('11_AYA_İRİNİ • Bizans bazilikası',(-440,-510),2.8,True)
# Genoese tower: masonry cylinder, corbelled crown, medieval short lead cap.
x,y=-1080,1120;z=ground(x,y);b=B('12_GALATA • 1348', (x,y,z),(2.2,2.2,2.4))
b.cyl((0,0,0),15,5,lightstone,48);b.cyl((0,0,5),12,48,stone,48,r2=10.6)
for zz in [8,14,20,26,32,38,44,50]:b.cyl((0,0,zz),12.1-(zz-5)*.026,1,lightstone,48)
for zz in [16,29,42]:
 for i in range(8):
  a=i*math.tau/8;b.box((11.9*math.cos(a),11.9*math.sin(a),zz),(2.2,.5,5),dark,a-math.pi/2)
b.cyl((0,0,52),13,3,lightstone,48);b.cyl((0,0,55),11.5,9,stone,48)
for i in range(12):
 a=i*math.tau/12;b.box((11.6*math.cos(a),11.6*math.sin(a),59),(2.6,.8,4.5),dark,a-math.pi/2)
b.cyl((0,0,64),14,17,lead,48,r2=.5);b.cyl((0,0,81),.55,3,gold,12);b.finish()

# Gravel streets follow the terrain, with the Mese and the cathedral approach.
def road(name,pts,w):
 pts=resample(pts,22);b=B(name)
 for a,q in zip(pts,pts[1:]):
  d=Vector((q[0]-a[0],q[1]-a[1]));d.normalize();p=Vector((-d.y,d.x))*w/2
  vs=[]
  for xy in [Vector(a)+p,Vector(a)-p,Vector(q)-p,Vector(q)+p]:vs.append((xy.x,xy.y,ground(*xy)+1.0))
  b.mesh(vs,[(0,1,2,3)],pathmat)
 b.finish()
roads=[[(-640,-1120),(-1120,-1010),(-1700,-650),(-2350,-480),(-3050,-570),(-3900,-950)], [(-600,-660),(-850,-100),(-1250,140),(-1840,450),(-2420,920),(-2790,1420)], [(-1120,-1020),(-1270,-480),(-1250,140)],[(-2360,-490),(-2260,180),(-2420,920)]]
for i,r in enumerate(roads):road('20_Mese_yollar_%d'%i,r,26 if i==0 else 15)
road('21_Galata_yolu',[(-1110,710),(-1110,1100),(-1240,1320)],19)

# Hippodrome ruins: long U-shaped sphendone, surviving spina and obelisks.
b=B('13_Hipodrom • harap sphendone',(-1000,-1250,ground(-1000,-1250)+3),(1.6,1.6,1.6),-.18)
for side in [-1,1]:
 b.box((side*45,0,5),(8,140,10),stone)
 for yy in range(-55,66,12):b.box((side*45,yy,10),(9,5,9),lightstone)
for i in range(20):
 a=math.pi+i/19*math.pi;b.box((45*math.cos(a),-70+45*math.sin(a),7),(10,9,14),stone,a)
b.box((0,-2,1),(9,145,2),lightstone)
for yy,hh in [(-35,26),(35,33)]:
 b.box((0,yy,3),(8,8,6),stone);b.cyl((0,yy,6),2.8,hh,lightstone,4,r2=1.4);b.cyl((0,yy,hh+6),2,5,lightstone,4,r2=0)
b.cyl((0,0,2),1.6,15,gold,10);b.finish()

# Deterministic, sparse late-Byzantine settlement. Houses are clustered around
# lanes, leaving substantial gardens and roofless precincts.
def inpoly(p,poly):
 x,y=p;inside=False
 for a,b in zip(poly,poly[1:]+poly[:1]):
  if (a[1]>y)!=(b[1]>y) and x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0]:inside=not inside
 return inside
citypoly=[(-3890,-1450),(-3700,-600),(-3360,100),(-2830,1370),(-2190,630),(-1550,290),(-550,90),(-150,-100),(-140,-920),(-620,-1450),(-1900,-1420),(-2900,-1280)]
Bhouse=B('30_Mahalleler • el yapımı kiremit çatılar');Br=B('31_Harap_evler_ve_taş_izleri');Bt=B('32_Serviler_ve_bahçeler');Bg=B('33_Bostan_sıraları')
centers=[(-1550,-1020),(-1300,-680),(-1800,-380),(-2350,-780),(-2750,-450),(-3000,80),(-2650,650),(-2000,400),(-1200,-50),(-450,-170),(-3290,-800),(-1070,970),(-1260,1170),(-820,900)]
def house(x,y,w,l,h,angle,ruin=False):
 z=ground(x,y);b=B('tmp',(x,y,z),(1,1,1),angle)
 pm=random.choice(plaster);rm=random.choice(roof)
 if ruin:
  for dx in [-w/2,w/2]:b.box((dx,0,h*.26),(3,l,h*.52),pm)
  b.box((0,l/2,h*.4),(w,3,h*.8),pm)
  for k in range(8):b.box((random.uniform(-w,w),random.uniform(-l,l),2),(random.uniform(2,6),random.uniform(2,5),4),stone)
 else:
  b.box((0,0,h/2),(w,l,h),pm);b.box((0,0,h*.53),(w+.7,l+.7,1.3),wood)
  b.roof((0,0,h),w+4,l+4,h*.34,rm)
  # tile lines make the roofs read as ceramic pieces at close inspection
  for yy in range(0,int(l),7):
   dy=yy-l/2;b.rod((-w/2-2,dy,h),(0,dy,h*1.34),.48,brick,4);b.rod((0,dy,h*1.34),(w/2+2,dy,h),.48,brick,4)
  b.rod((0,-l/2-2,h*1.34),(0,l/2+2,h*1.34),1,rm,6)
  b.box((0,-l/2-.1,h*.24),(w*.18,.7,h*.48),dark)
  for xx in [-w*.28,w*.28]:
   b.box((xx,-l/2-.4,h*.74),(w*.16,.7,h*.19),dark)
   b.box((xx,-l/2-1,h*.65),(w*.20,2,1),lightstone)
  if random.random()<.25:b.box((w*.25,l*.2,h*1.23),(4,4,h*.4),brick)
 dest=Br if ruin else Bhouse
 n=len(dest.v);dest.v.extend(b.v);dest.f.extend([tuple(n+i for i in f) for f in b.f]);dest.mi.extend(b.mi)
occupied=[]
for cx,cy in centers:
 for j in range(random.randint(30,55)):
  x=cx+random.gauss(0,145);y=cy+random.gauss(0,120)
  if not(inpoly((x,y),citypoly) or inpoly((x,y),galatap[:-1])):continue
  if ground(x,y)<10:continue
  if ((x+615)/235)**2+((y+890)/330)**2<1:continue
  if ((x+440)/110)**2+((y+510)/170)**2<1:continue
  if abs(x+1000)<115 and abs(y+1250)<200:continue
  if math.hypot(x+1080,y-1120)<65:continue
  if any((x-a)**2+(y-b)**2<36**2 for a,b in occupied):continue
  occupied.append((x,y));house(x,y,random.uniform(20,36),random.uniform(27,47),random.uniform(17,31),random.uniform(-.35,.35),random.random()<.14)
Bhouse.finish();Br.finish()
# orchard and cypress trees, with faceted hand-crafted foliage
for i in range(700):
 x=random.uniform(-3840,-170);y=random.uniform(-1400,1550)
 if not inpoly((x,y),citypoly) or ground(x,y)<13:continue
 if any((x-a)**2+(y-b)**2<26**2 for a,b in occupied):continue
 if math.hypot(x+615,y+890)<230 or math.hypot(x+440,y+510)<130:continue
 z=ground(x,y);h=random.uniform(15,35);r=random.uniform(7,15);gm=random.choice(greens)
 Bt.cyl((x,y,z),1.4,h*.55,wood,6)
 if random.random()<.37:
  Bt.cyl((x,y,z+h*.25),r*.6,h*1.4,gm,9,r2=0)
 else:
  Bt.dome((x,y,z+h*.4),r,h*.62,gm,9,4);Bt.cyl((x,y,z+h*.2),r*.6,h*.3,gm,9,r2=r)
Bt.finish()
# vegetable beds laid in small groups: marks of a depopulated city
for cx,cy in [(-2130,-1130),(-2900,-1070),(-3300,-370),(-2690,150),(-2110,60),(-1650,-690),(-730,-150)]:
 for j in range(7):
  x=cx+j*12;y=cy
  pts=[(x,y+v,ground(x,y+v)+1.3) for v in range(-45,46,15)]
  for a,q in zip(pts,pts[1:]):Bg.rod(a,q,3.5,soil,4);Bg.rod((a[0],a[1],a[2]+2),(q[0],q[1],q[2]+2),1.7,greens[1],4)
Bg.finish()

# Chain across the mouth of the Golden Horn, with alternate iron links and floats.
a=Vector((-420,190,13));q=Vector((-1000,660,13));d=q-a;u=d.normalized();v=Vector((-u.y,u.x,0))
b=B('40_Haliç_zinciri • Eugenios—Galata')
for j in range(118):
 t=j/117;p=a+d*t;p.z-=6*math.sin(math.pi*t)
 pts=[]
 for k in range(13):
  ang=k/12*math.tau;off=u*(5.6*math.cos(ang))+(v if j%2 else Vector((0,0,1)))*(3*math.sin(ang));pts.append(tuple(p+off))
 for f,g in zip(pts,pts[1:]):b.rod(f,g,1.05,gold,5)
for j in range(1,10):
 p=a+d*j/10;b.box((p.x,p.y,4.5),(17,12,6),wood,math.atan2(d.y,d.x));b.box((p.x,p.y,8),(10,9,1),gold)
b.finish()
# Strong chain anchor towers, separate from repeating sea towers.
for name,p in [('Eugenios',a),('Galata_zincir_kulesi',q)]:
 z=ground(p.x,p.y);b=B('41_'+name)
 b.box((p.x,p.y,z+25),(39,39,50),stone)
 for lev in [12,24,36,48]:b.box((p.x,p.y,z+lev),(40,40,2),brick)
 for dx in [-15,0,15]:
  for dy in [-15,0,15]:
   if abs(dx)==15 or abs(dy)==15:b.box((p.x+dx,p.y+dy,z+54),(9,9,9),lightstone)
 b.finish()

# Fifteenth-century oared vessels, held inside the Horn at the Kasimpasa shore.
def ship(name,x,y,angle,length=120,unfurled=False):
 b=B(name,(x,y,2),(1,1,1),angle);L=length;w=L*.15
 # multi-chine hull, pointed bow and stern
 sections=[(-L*.5,1,7),(-L*.38,w*.75,0),(-L*.18,w,0),(L*.18,w,0),(L*.40,w*.64,1),(L*.55,.5,12)]
 vs=[]
 for yy,ww,up in sections:vs.extend([(-ww,yy,10+up),(-ww*.72,yy,3+up),(0,yy,-2+up),(ww*.72,yy,3+up),(ww,yy,10+up)])
 fs=[]
 for j in range(len(sections)-1):
  for k in range(4):fs.append((j*5+k,j*5+k+1,(j+1)*5+k+1,(j+1)*5+k))
 b.mesh(vs,fs,wood)
 deck=[(-ww,yy,10+up*.25) for yy,ww,up in sections]+[(ww,yy,10+up*.25) for yy,ww,up in reversed(sections)]
 b.mesh(deck,[tuple(range(len(deck)))],pathmat)
 for side in [-1,1]:
  pts=[(side*ww,yy,11+up) for yy,ww,up in sections]
  for aa,bb in zip(pts,pts[1:]):b.rod(aa,bb,1.5,gold)
  for yy in range(-int(L*.31),int(L*.35),7):
   b.rod((side*w*.9,yy,10),(side*w*2.1,yy-11,2),.8,wood)
   b.box((side*w*2.05,yy-10,2),(1.8,7,1),wood,.1)
 for yy in range(-int(L*.28),int(L*.34),7):b.box((0,yy,11),(w*1.8,2,2),wood)
 b.box((0,-L*.34,16),(w*1.5,L*.16,8),wood)
 b.rod((0,0,10),(0,0,81),1.8,wood,10)
 b.rod((0,0,72),(-w,L*.36,10),.45,sail);b.rod((0,0,72),(w,-L*.4,16),.45,sail)
 if unfurled:
  b.rod((0,-L*.29,81),(0,L*.35,50),1.1,wood)
  vv=[(0,-L*.28,79),(0,L*.34,51),(0,L*.27,24),(5,L*.01,43)]
  b.mesh(vv,[(0,1,3),(1,2,3),(2,0,3)],sail)
  for aa,bb in [(vv[0],vv[2]),(vv[1],vv[2])]:b.rod(aa,bb,.35,wood)
 else:
  b.rod((0,-L*.28,70),(0,L*.27,47),2.8,sail,8)
  b.rod((0,-L*.3,72),(0,L*.29,47),1,wood)
 b.finish()
 # engraved ripples: narrow, quiet arcs around each miniature ship
 br=B(name+'_su_izi',(x,y,1.4),(1,1,1),angle)
 for side in [-1,1]:
  for k in range(2):
   pts=[(side*(w+10+k*7+4*math.sin(j/9*math.pi)), -L*.42+j/9*L*.88,0) for j in range(10)]
   for aa,bb in zip(pts,pts[1:]):br.rod(aa,bb,.7,foam,4)
 br.finish()
for i,(x,y) in enumerate([(-1830,1280),(-2020,1450),(-2230,1600),(-1750,1080),(-1970,1160),(-2160,1320),(-2370,1660),(-2000,930),(-2310,1450)]):ship('42_Osmanlı_kadırgası_%02d'%i,x,y,.2+random.uniform(-.2,.2),random.uniform(108,143),i in [0,3,6])
for i,(x,y) in enumerate([(-790,555),(-1250,510),(-1320,610)]):ship('43_Küçük_liman_teknesi_%d'%i,x,y,-.7,61,False)

# Ruined precinct: broken arches and columns in the former imperial quarter.
b=B('50_Harap_Bizans_duvarları')
for cx,cy in [(-460,-1230),(-1510,-1300),(-2300,-250),(-2850,1010)]:
 z=ground(cx,cy)
 for j in range(6):
  x=cx+j*19;b.box((x,cy,z+10),(7,12,20+random.uniform(-5,7)),stone)
  if j<4:
   for k in range(10):
    a=k/9*math.pi;b.box((x+9.5+9.5*math.cos(a),cy,z+18+10*math.sin(a)),(4,12,4),brick,-a)
 for j in range(4):b.cyl((cx+j*24,cy-30,z),3,random.uniform(5,17),lightstone,12)
b.finish()

# Physical museum plaque, on the empty sea foreground, with matching fine rules.
def textob(name,body,loc,size,material,rot=(0,0,0),font=None):
 cu=bpy.data.curves.new(name,'FONT');cu.body=body;cu.size=size;cu.extrude=.12;cu.bevel_depth=.04;cu.space_character=1.12
 if font:cu.font=font
 ob=bpy.data.objects.new('C3_'+name,cu);C.objects.link(ob);ob.location=loc;ob.rotation_euler=rot;cu.materials.append(M[material]);return ob
fontpath='/usr/share/fonts/noto/NotoSerifDisplay-Regular.ttf'
if not Path(fontpath).exists():fontpath='/usr/share/fonts/noto/NotoSerif-Regular.ttf'
font=bpy.data.fonts.load(fontpath) if Path(fontpath).exists() else None
# Upper-left editorial label is a model display card. Its plane is parallel to
# the immutable camera at frame 1365, outside the geographical model itself.
sc.frame_set(1365);bpy.context.view_layer.update()
cam=sc.camera;cm=cam.matrix_world.copy();rot=cm.to_euler()
def cardpoint(x,y,z=-5800):return cm@Vector((x,y,z))
# subtle typography in the negative space above the model
for nm,tx,x,y,sz,ma in [('Başlık_üst','K O N S T A N T İ N O P O L İ S',-2900,1430,67,letter),('Başlık_tarih','29 MAYIS 1453',-2900,1240,150,letter),('Başlık_alt','Ş A F A K   /   H A L İ Ç ’ T E  S E S S İ Z L İ K',-2890,1130,45,letter)]:
 textob(nm,tx,cardpoint(x,y),sz,ma,rot,font)
# Historical chapter marker and fine divider are screen-plane objects in C3.
p1=cardpoint(-2890,1080);p2=cardpoint(-1690,1080);curve('Başlık_pirinç_çizgi',[p1,p2],2,gold)

# Warm sunrise added to the era slot; original lighting remains untouched.
ld=bpy.data.lights.new('C3_Şafak • doğudan bal ışığı','SUN');lo=bpy.data.objects.new('C3_Şafak • doğudan bal ışığı',ld);C.objects.link(lo);ld.energy=3.0;ld.color=(1,.57,.28);ld.angle=math.radians(8);lo.rotation_euler=(math.radians(78),math.radians(-15),math.radians(-75))
# Render-only studio horizon, behind the table and all KIT geometry.
b=B('60_Stüdyo_fonu');b.box((-6000,9000,1800),(48000,70,19000),base);back=b.finish()
# Wisps of smoke: procedurally carved volumes, no fire, figures or violence.
def smoke(name,loc,scale):
 bpy.ops.mesh.primitive_uv_sphere_add(segments=20,ring_count=12,location=loc);o=bpy.context.object;o.name='C3_'+name;o.scale=scale
 for col in list(o.users_collection):col.objects.unlink(o)
 C.objects.link(o)
 m=bpy.data.materials.new('C3_'+name+'_hacim');m.use_nodes=True;nt=m.node_tree;nt.nodes.clear();out=nt.nodes.new('ShaderNodeOutputMaterial');vol=nt.nodes.new('ShaderNodeVolumePrincipled');vol.inputs['Color'].default_value=(.26,.28,.29,1);vol.inputs['Anisotropy'].default_value=.15
 tex=nt.nodes.new('ShaderNodeTexNoise');tex.inputs['Scale'].default_value=3.2;tex.inputs['Detail'].default_value=3
 tc=nt.nodes.new('ShaderNodeTexCoord');nt.links.new(tc.outputs['Generated'],tex.inputs['Vector'])
 ramp=nt.nodes.new('ShaderNodeMapRange');ramp.inputs['From Min'].default_value=.36;ramp.inputs['From Max'].default_value=.7;ramp.inputs['To Min'].default_value=0;ramp.inputs['To Max'].default_value=.006
 nt.links.new(tex.outputs['Fac'],ramp.inputs['Value']);nt.links.new(ramp.outputs['Result'],vol.inputs['Density']);nt.links.new(vol.outputs['Volume'],out.inputs['Volume']);o.data.materials.append(m)
for i,(x,y,z) in enumerate([(-2920,750,245),(-3200,900,440),(-3650,-380,240),(-2000,-650,170)]):smoke('61_Şafak_dumanı_%d'%i,(x,y,z),(95+i*8,65+i*7,145+i*20))
sc.view_settings.exposure=-.7
sc.render.engine='BLENDER_EEVEE';sc.render.resolution_x=1920;sc.render.resolution_y=1080;sc.render.resolution_percentage=65
# Retain the kit's camera, data, keyframes, terrain, water and table exactly.
sc.render.image_settings.file_format='PNG';sc.render.filepath=str(R/'onizleme.png')
sc['C3_sunum']='29 Mayıs 1453 şafağı; el yapımı mimari diorama. Ana anıtlarda okunurluk için seçici ölçek. Hazır varlık yok.'
sc['C3_kaynak']='Kit kaynak_kartlari/C3_1453_Safak.md; ek mimari kontrol: KTB Ayasofya; EHW Hagia Eirene.'
exec(compile((R/'detay_ekle.py').read_text(),str(R/'detay_ekle.py'),'exec'))
bpy.ops.wm.save_as_mainfile(filepath=str(R/'sahne.blend'))
sc.render.resolution_percentage=65
bpy.ops.render.render(write_still=True)
print('C3_COMPLETE',len(C.objects),'objects')
