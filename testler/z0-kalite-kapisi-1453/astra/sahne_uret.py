import bpy, math, random, os, sys
from mathutils import Vector
from math import sin, cos, pi
random.seed(1453)
ROOT=os.path.dirname(os.path.abspath(__file__))
bpy.ops.object.select_all(action='SELECT'); bpy.ops.object.delete(use_global=False)
for m in list(bpy.data.materials): bpy.data.materials.remove(m)
# All geometry, surfaces and atmosphere are created here; no external assets.
COL={}
def collection(n):
 c=bpy.data.collections.new(n); bpy.context.scene.collection.children.link(c); COL[n]=c; return c
for n in ['01 • Kara ve kıyılar','02 • Bizans deniz surları','03 • Ayasofya — 1453','04 • Kent dokusu','05 • Haliç ve Galata','06 • Tekneler ve donanım','07 • Bahçeler','08 • Şafak ve duman'] : collection(n)
active=COL['01 • Kara ve kıyılar']
def put(o):
 for c in list(o.users_collection): c.objects.unlink(o)
 active.objects.link(o); return o
def mat(n,c,rough=.7,noise=0,metal=0):
 m=bpy.data.materials.new(n); m.diffuse_color=(*c,1); m.use_nodes=True
 nd=m.node_tree.nodes; l=m.node_tree.links; p=nd.get('Principled BSDF'); p.inputs['Base Color'].default_value=(*c,1);p.inputs['Roughness'].default_value=rough;p.inputs['Metallic'].default_value=metal
 if noise:
  t=nd.new('ShaderNodeTexNoise');t.inputs['Scale'].default_value=noise;t.inputs['Detail'].default_value=4;t.inputs['Roughness'].default_value=.75
  tc=nd.new('ShaderNodeTexCoord');l.new(tc.outputs['Object'],t.inputs['Vector'])
  ramp=nd.new('ShaderNodeValToRGB');ramp.color_ramp.elements[0].position=.18;ramp.color_ramp.elements[0].color=(*(v*.57 for v in c),1);ramp.color_ramp.elements[1].position=.82;ramp.color_ramp.elements[1].color=(*(min(1,v*1.28) for v in c),1);l.new(t.outputs['Fac'],ramp.inputs[0]);l.new(ramp.outputs[0],p.inputs['Base Color'])
  b=nd.new('ShaderNodeBump');b.inputs['Strength'].default_value=.32;b.inputs['Distance'].default_value=.14;l.new(t.outputs['Fac'],b.inputs['Height']);l.new(b.outputs[0],p.inputs['Normal'])
 return m
stone=mat('Limestone | salt, ochre & age',(.42,.35,.25),noise=2.4)
stone2=mat('Pale cut limestone',(.6,.52,.39),noise=3)
mortar=mat('Mortar in the sea walls',(.20,.185,.145),noise=3)
brick=mat('Byzantine brick',(.32,.145,.082),noise=6)
plasters=[mat('Limewash %02d'%i,c,noise=2) for i,c in enumerate([(.51,.44,.32),(.64,.55,.42),(.39,.32,.24),(.55,.43,.30),(.42,.39,.31),(.65,.58,.46)])]
roofs=[mat('Terracotta %02d'%i,c,noise=5) for i,c in enumerate([(.28,.095,.046),(.36,.14,.066),(.22,.10,.064),(.40,.19,.10)])]
lead=mat('Weathered lead roofs',(.23,.26,.245),.57,3,.25)
wood=mat('Tarred oak',(.095,.051,.027),noise=3)
woodlight=mat('Sun worn cedar',(.27,.16,.075),noise=4)
dark=mat('Deep unglazed openings',(.028,.029,.023),.95)
green=mat('Cypress | olive dark',(.068,.098,.048),noise=2)
olive=mat('Olive | dusty leaves',(.19,.23,.12),noise=3)
earth=mat('Dry earth and grass',(.23,.235,.13),noise=.08)
cliff=mat('Coastal rock',(.29,.27,.20),noise=.7)
sailmat=mat('Flax canvas',(.74,.67,.49),.91,7)
rope=mat('Hemp rope',(.33,.25,.15),noise=5)
class Batch:
 def __init__(self,n): self.n=n;self.v=[];self.f=[];self.mi=[];self.mats=[]
 def face(self,vs,m):
  j=len(self.v);self.v.extend(vs);self.f.append(tuple(range(j,j+len(vs))));
  if m not in self.mats:self.mats.append(m)
  self.mi.append(self.mats.index(m))
 def box(self,p,s,m,a=0):
  x,y,z=p;dx,dy,dz=[v/2 for v in s];c=cos(a);q=sin(a)
  vv=[(x+u*c-v*q,y+u*q+v*c,z+w) for u,v,w in [(-dx,-dy,-dz),(dx,-dy,-dz),(dx,dy,-dz),(-dx,dy,-dz),(-dx,-dy,dz),(dx,-dy,dz),(dx,dy,dz),(-dx,dy,dz)]]
  for f in [(0,3,2,1),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7),(4,5,6,7)]:self.face([vv[k] for k in f],m)
 def mesh(self):
  me=bpy.data.meshes.new(self.n);me.from_pydata(self.v,[],self.f);me.materials.clear()
  for m in self.mats:me.materials.append(m)
  me.update();o=bpy.data.objects.new(self.n,me);active.objects.link(o)
  for p,i in zip(me.polygons,self.mi):p.material_index=i
  return o

def mesh(n,vs,fs,m,smooth=False):
 me=bpy.data.meshes.new(n);me.from_pydata(vs,[],fs);me.materials.append(m);me.update();o=bpy.data.objects.new(n,me);active.objects.link(o)
 if smooth:
  for p in me.polygons:p.use_smooth=True
 return o

def cube(n,p,s,m,bevel=0):
 b=Batch(n);b.box(p,s,m);o=b.mesh()
 if bevel:
  md=o.modifiers.new('Soft weathered edges','BEVEL');md.width=bevel;md.segments=2;o.modifiers.new('Weighted normals','WEIGHTED_NORMAL')
 return o

def curve(n,pts,r,m):
 cu=bpy.data.curves.new(n,'CURVE');cu.dimensions='3D';cu.resolution_u=1;cu.bevel_depth=r;cu.bevel_resolution=1;s=cu.splines.new('POLY');s.points.add(len(pts)-1)
 for p,co in zip(s.points,pts):p.co=(*co,1)
 o=bpy.data.objects.new(n,cu);active.objects.link(o);o.data.materials.append(m);return o

def cyl(n,p,r,d,m,verts=24,r2=None):
 bpy.ops.mesh.primitive_cone_add(vertices=verts,radius1=r,radius2=r if r2 is None else r2,depth=d,location=p);o=put(bpy.context.object);o.name=n;o.data.materials.append(m);return o

def dome(n,p,r,h,m,start=0,end=2*pi):
 seg=64; rings=16;vs=[];fs=[]
 for j in range(rings+1):
  t=j*pi/2/rings
  for i in range(seg+1):
   a=start+(end-start)*i/seg;vs.append((p[0]+r*cos(t)*cos(a),p[1]+r*cos(t)*sin(a),p[2]+h*sin(t)))
 for j in range(rings):
  for i in range(seg):k=j*(seg+1)+i;fs.append((k,k+1,k+seg+2,k+seg+1))
 return mesh(n,vs,fs,m,True)

def arch(b,p,w,h,m,angle=0,frame=True):
 # Flat dark opening with voussoirs, upright in local XZ plane.
 x,y,z=p;r=w/2;spring=h-r
 pts=[(-r,0),(r,0)]+[(r*cos(a),spring+r*sin(a)) for a in [i*pi/12 for i in range(13)]]
 def tr(u,v,dep=0):return(x+u*cos(angle)-dep*sin(angle),y+u*sin(angle)+dep*cos(angle),z+v)
 b.face([tr(u,v) for u,v in pts],m)
 if frame:
  for i in range(12):
   a=i*pi/12;aa=(i+1)*pi/12
   b.face([tr(r*cos(a),spring+r*sin(a),.02),tr((r+.24)*cos(a),spring+(r+.24)*sin(a),.02),tr((r+.24)*cos(aa),spring+(r+.24)*sin(aa),.02),tr(r*cos(aa),spring+r*sin(aa),.02)],stone2)
  for u in [-r-.12,r+.12]:
   b.box(tr(u,spring/2),(.24,.2,spring),stone2,angle)

def roof(b,x,y,z,w,d,h,m,a=0):
 def t(u,v,k):return(x+u*cos(a)-v*sin(a),y+u*sin(a)+v*cos(a),z+k)
 vv=[t(-w/2,-d/2,0),t(w/2,-d/2,0),t(w/2,d/2,0),t(-w/2,d/2,0),t(0,-d/2,h),t(0,d/2,h)]
 for f in [(0,1,4),(2,3,5),(0,4,5,3),(4,1,2,5)]:b.face([vv[i] for i in f],m)
 # ceramic courses visibly catch the low sun
 for j in range(int(w/.85)):
  u=-w/2+j*.85;k=h*(1-abs(u)/(w/2))
  for side in [-1,1]: pass
  b.box(t(u,0,k+.045),(.09,d+.1,.1),m,a)

shore=[(210,-620),(220,-300),(200,-140),(165,-35),(100,55),(55,145),(-70,205),(-280,240),(-520,285),(-800,335),(-1150,365),(-1700,430)]
# Terraced green promontory, bounded by the shoreline.
def landheight(x,y):
 base=5+19*math.exp(-((x+80)/290)**2-((y+125)/300)**2)+12*math.exp(-((x+550)/650)**2-((y+300)/650)**2)
 dist=10000
 for (ax,ay),(bx,by) in zip(shore,shore[1:]):
  dx=bx-ax;dy=by-ay;t=max(0,min(1,((x-ax)*dx+(y-ay)*dy)/(dx*dx+dy*dy)));dist=min(dist,math.hypot(x-ax-t*dx,y-ay-t*dy))
 return base*min(1,dist/75)+.3
vs=[];fs=[]
# ribbons connecting waterfront to south inland border
terrainshore=[]
for a,b in zip(shore,shore[1:]):
 for k in range(8):terrainshore.append((a[0]+(b[0]-a[0])*k/8,a[1]+(b[1]-a[1])*k/8))
terrainshore.append(shore[-1])
for i,(x,y) in enumerate(terrainshore):
 for j in range(17):
  t=j/16; yy=y-(y+1050)*t;xx=x-80*sin(t*pi)*math.exp(-i/3)
  vs.append((xx,yy,landheight(xx,yy)))
for i in range(len(terrainshore)-1):
 for j in range(16):k=i*17+j;fs.append((k,k+1,k+18,k+17))
mesh('The first hill • hand built terrain',vs,fs,earth,True)
# rock shelf along entire edge
bb=Batch('Shoreline rocks')
for i in range(len(shore)-1):
 a=Vector((*shore[i],0));b=Vector((*shore[i+1],0));ln=(b-a).length
 for j in range(int(ln/5)):
  p=a.lerp(b,j/max(1,int(ln/5)));bb.box((p.x+random.uniform(-3,3),p.y+random.uniform(-3,3),.1),(random.uniform(4,9),random.uniform(3,7),random.uniform(.6,2.4)),cliff,random.random()*pi)
bb.mesh()
# water; two frequencies of physically lit wave normals
water=mat('Haliç • indigo and copper water',(.025,.071,.08),.22,0,.33)
n=water.node_tree.nodes;l=water.node_tree.links;p=n.get('Principled BSDF');p.inputs['IOR'].default_value=1.333
tex=n.new('ShaderNodeTexNoise');tex.inputs['Scale'].default_value=.32;tex.inputs['Detail'].default_value=3;tex.inputs['Roughness'].default_value=.7
co=n.new('ShaderNodeTexCoord');mp=n.new('ShaderNodeVectorMath');mp.operation='MULTIPLY';mp.inputs[1].default_value=(.65,3.8,1);l.new(co.outputs['Object'],mp.inputs[0]);l.new(mp.outputs[0],tex.inputs[0]);bu=n.new('ShaderNodeBump');bu.inputs['Strength'].default_value=.48;bu.inputs['Distance'].default_value=.32;l.new(tex.outputs['Fac'],bu.inputs['Height'])
tex2=n.new('ShaderNodeTexNoise');tex2.inputs['Scale'].default_value=3.8;tex2.inputs['Detail'].default_value=2;l.new(mp.outputs[0],tex2.inputs[0]);bu2=n.new('ShaderNodeBump');bu2.inputs['Strength'].default_value=.23;bu2.inputs['Distance'].default_value=.055;l.new(tex2.outputs['Fac'],bu2.inputs['Height']);l.new(bu.outputs[0],bu2.inputs['Normal']);l.new(bu2.outputs[0],p.inputs['Normal'])
cube('Continuous water surface',(-300,0,-.65),(10000,10000,1),water)
# Sea walls: single defensive enceinte with frequent rectangular towers.
active=COL['02 • Bizans deniz surları'];wall=Batch('Masonry, brick bands & crenellations');openings=Batch('Sea wall arrow slits')
def wallseg(ax,ay,bx,by):
 dx=bx-ax;dy=by-ay;ln=math.hypot(dx,dy);ang=math.atan2(dy,dx);mx=(ax+bx)/2;my=(ay+by)/2
 wall.box((mx,my,6.2),(ln,3.6,11.7),mortar,ang)
 for row in range(14):
  z=.8+row*.77
  count=max(1,int(ln/2.8))
  for j in range(count):
   t=(j+.5+(row%2)*.28)/count
   if t>1:continue
   x=ax+dx*t;y=ay+dy*t
   wall.box((x,y,z),(ln/count-.07,3.75,.70),random.choice([stone,stone,stone2]),ang)
 for z in [3.2,3.5,7.4,7.7,10.8]:wall.box((mx,my,z),(ln,3.9,.17),brick,ang)
 wall.box((mx,my,12.1),(ln,4.1,.5),stone2,ang)
 for j in range(int(ln/3)):
  t=(j+.5)/int(ln/3);wall.box((ax+dx*t,ay+dy*t,13),(1.55,3.8,1.7),stone,ang)
for i in range(len(shore)-1):wallseg(*shore[i],*shore[i+1])
def tower(x,y,ang=0,w=10,h=17):
 wall.box((x,y,h/2),(w,w,h),stone,ang)
 for z in [3.2,3.55,8,8.35,h-1]:wall.box((x,y,z),(w+.12,w+.12,.22),brick,ang)
 wall.box((x,y,h),(w+.65,w+.65,.65),stone2,ang)
 for side in [-1,1]:
  for j in range(4):
   u=-w/2+(j+.5)*w/4
   for xx,yy in [(u,side*w/2),(side*w/2,u)]:
    wall.box((x+xx*cos(ang)-yy*sin(ang),y+xx*sin(ang)+yy*cos(ang),h+1.1),(1.5,1.5,1.8),stone,ang)
 for u in [-2.4,2.4]:
  for z in [5.5,11]:
   for sign in [-1,1]:
    px=x+u*cos(ang)-sign*(w/2+.035)*sin(ang);py=y+u*sin(ang)+sign*(w/2+.035)*cos(ang)
    arch(openings,(px,py,z),.65,2,dark,ang,False)
for i in range(len(shore)-1):
 a=Vector(shore[i]);b=Vector(shore[i+1]);ln=(b-a).length
 for j in range(max(1,int(ln/62))):
  p=a.lerp(b,j/max(1,int(ln/62)));tower(p.x,p.y,math.atan2((b-a).y,(b-a).x),random.uniform(9,11),random.uniform(16,20))
wall.mesh();openings.mesh()
# Hagia Sophia: basilical mass, great dome, two half-domes, exedrae and articulated tympana.
active=COL['03 • Ayasofya — 1453'];HX=-38;HY=-107;HZ=landheight(HX,HY)
def hp(x,y,z):return(HX+x,HY+y,HZ+z)
b=Batch('Ayasofya | walls, cornices and brick courses');win=Batch('Ayasofya | recessed arched windows')
b.box(hp(0,0,10),(72,78,20),plasters[1]);b.box(hp(0,0,22),(44,48,24),plasters[3]);b.box(hp(0,0,32),(36,36,12),brick)
# stepped outer aisles with long pitched roofs
for x in [-28,28]:
 b.box(hp(x,0,17),(16,72,9),plasters[1]);roof(b,HX+x,HY,HZ+21.5,17,74,3,lead)
 for y in [-27,-12,6,24]:
  b.box(hp(x+(8 if x>0 else -8),y,15),(5,6,30),stone)
  b.box(hp(x+(6 if x>0 else -6),y,29),(4,6,7),stone)
for z in [5,12,20,24,31,36]:
 b.box(hp(0,0,z),(44.4,48.4,.34),stone2)
for x in [-19,19]:
 for y in [-20,20]:b.box(hp(x,y,30),(7,8,15),stone)
# long axis north-south: the east liturgical end faces shore in this composed view
for sign in [-1,1]:
 cy=sign*21
 cyl('Half-dome drum',hp(0,cy,25),16,7,brick,64)
 dome('Great semicupola',hp(0,cy,28),17,12,lead,0 if sign>0 else pi,pi if sign>0 else 2*pi)
 # southern half hidden in central block, full cylinder drum is architectural base
 for x in [-12,12]:
  cyl('Exedra drum',hp(x,sign*32,15),8.5,12,plasters[3],32)
  dome('Lower exedra',hp(x,sign*32,21),9,6.5,lead)
 # apsidal end
 cyl('Apse',hp(0,sign*39,9),9,18,plasters[1],32)
 dome('Apse lead roof',hp(0,sign*39,18),9.6,6,lead)
# main dome at historically recognizable broad proportions
cyl('Forty-window drum',hp(0,0,39),16.4,5,stone2,80)
dome('Great dome • 31 m span',hp(0,0,41.5),17,12.5,lead)
for i in range(40):
 a=i*2*pi/40
 # panes tangent to circular drum
 px=HX+16.48*cos(a);py=HY+16.48*sin(a)
 arch(win,(px,py,HZ+37.4),.85,3.1,dark,a+pi/2)
 pts=[]
 for j in range(19):
  t=j*pi/2/18;pts.append(hp(17.08*cos(t)*cos(a),17.08*cos(t)*sin(a),41.5+12.55*sin(t)))
 curve('Lead dome standing seam',pts,.045,stone2)
# side tympanum arches and double rows of window openings
for sign in [-1,1]:
 for row,(zz,hw,num) in enumerate([(23,3.6,7),(29,4.0,5)]):
  for i in range(num):
   yy=(i-(num-1)/2)*5.0
   arch(win,hp(sign*22.05,yy,zz),2.0,hw,dark,pi/2)
 for yy in range(-30,34,8):
  arch(win,hp(sign*36.04,yy,5),1.5,4,dark,pi/2)
  arch(win,hp(sign*36.04,yy,14),1.4,3,dark,pi/2)
for sign in [-1,1]:
 for xx in range(-27,28,7):arch(win,hp(xx,sign*39.1,5),2,4.5,dark,0)
# fine historic banding and weathered repairs
for z in [7.6,7.9,15,15.3,18.4]:
 for x in [-36.15,36.15]:b.box(hp(x,0,z),(.15,76,.17),brick)
# western narthex and atrium (open courtyard)
b.box(hp(0,-49,6),(63,13,12),plasters[0]);roof(b,HX,HY-49,HZ+12,64,15,2.6,lead)
for x in [-31,31]:
 b.box(hp(x,-69,3),(3,34,6),stone);roof(b,HX+x,HY-69,HZ+6,5,36,1.5,roofs[1])
for i in range(9):arch(win,hp(-25+i*6,-55.6,1),3,6,dark)
# modest cathedral cross
b.box(hp(0,0,55.6),(.28,.28,3.0),wood);b.box(hp(0,0,56.0),(1.6,.24,.24),wood)
b.mesh();win.mesh()
# Hagia Eirene nearby, also no minarets.
def church(x,y,s=1):
 z=landheight(x,y);bb=Batch('Byzantine church walls');bb.box((x,y,z+8*s),(22*s,42*s,16*s),plasters[0]);roof(bb,x,y,z+16*s,24*s,44*s,4*s,roofs[1]);cyl('Church drum',(x,y,z+20*s),8*s,6*s,brick);dome('Church cupola',(x,y,z+23*s),8.8*s,5*s,lead);bb.mesh()
church(50,8,.72);church(-430,-190,.9);church(-790,90,.8)
# Organic urban fabric with visible gardens and lanes, not a modern dense grid.
active=COL['04 • Kent dokusu'];houses=Batch('Hundreds of hand-generated masonry dwellings');details=Batch('Doors, shutters, chimneys & roof ridges')
def house(x,y,z,w,d,h,a=0,far=False):
 m=random.choice(plasters);r=random.choice(roofs)
 houses.box((x,y,z+h/2),(w,d,h),m,a);roof(houses,x,y,z+h,w+.8,d+.9,random.uniform(2,3.5),r,a)
 def tr(u,v,k):return(x+u*cos(a)-v*sin(a),y+u*sin(a)+v*cos(a),z+k)
 if not far:
  details.box(tr(0,d/2+.05,1.6),(1.3,.12,3.2),wood,a)
  for side in [-1,1]:
   for u in [-w*.27,w*.27]:
    for zz in ([h-2.2] if h<8 else [3.2,h-2.2]):
     details.box(tr(u,side*(d/2+.04),zz),(1.05,.14,1.5),dark,a)
     details.box(tr(u+.62,side*(d/2+.10),zz),(.18,.19,1.6),woodlight,a)
  details.box(tr(w*.27,-d*.2,h+2),(1,1,2.8),brick,a)
for row in range(27):
 for col in range(43):
  x=-1060+col*27+random.uniform(-8,8);y=-660+row*27+random.uniform(-7,7)
  # city boundary and monumental/garden precinct
  sy=205-(x+70)*.6 if x>-70 else 215+(-x-70)*.15
  if y>sy-34 or x>150:continue
  if ((x-HX)/76)**2+((y-HY)/87)**2<1.4:continue
  if x>5 and y>-55:continue
  if random.random()<.34+.15*sin(x*.025)*cos(y*.023):continue
  if abs(y+310+25*sin(x*.009))<14:continue
  z=landheight(x,y)+.3;house(x,y,z,random.uniform(8,16),random.uniform(10,19),random.uniform(5,12),random.uniform(-.22,.22),x<-600)
houses.mesh();details.mesh()
# abandoned walls and cistern ruins on the acropolis
ru=Batch('Acropolis gardens | fragmentary ancient structures')
for x,y,w,d in [(100,-100,18,25),(110,-185,24,29),(15,-285,34,21)]:
 z=landheight(x,y)
 for k in range(7):ru.box((x-w/2+k*w/7,y,z+random.uniform(2,4)),(w/7-.15,2,random.uniform(4,7)),stone)
 for k in range(4):ru.box((x,y+k*d/4,z+2),(2,d/4-.1,4),brick)
ru.mesh()
# Opposite shore with the Genoese settlement of Pera/Galata.
active=COL['05 • Haliç ve Galata']
vs=[];fs=[]
for i in range(51):
 x=-2300+i*70
 for j in range(21):
  y=620+j*60+.07*x;z=6+100*(1-math.exp(-j/4))*math.exp(-((x+150)/1350)**2)
  vs.append((x,y,z))
for i in range(50):
 for j in range(20):k=i*21+j;fs.append((k,k+21,k+22,k+1))
mesh('Galata hillside',vs,fs,earth,True)
gal=Batch('Galata settlement');oldh=houses;oldd=details;houses=gal;details=gal
for i in range(260):
 x=random.uniform(-1200,650);y=random.uniform(665,1130)+.07*x;z=6+100*(1-math.exp(-(y-620-.07*x)/240))*math.exp(-((x+150)/1350)**2)
 house(x,y,z,random.uniform(9,19),random.uniform(10,20),random.uniform(6,16),random.uniform(-.2,.2),True)
gal.mesh();houses=oldh;details=oldd
# Galata's medieval tower, subdued in distant haze
x=-235;y=865;z=6+100*(1-math.exp(-(y-620-.07*x)/240))*math.exp(-((x+150)/1350)**2)
cyl('Tower of Christ • Galata 1348',(x,y,z+23),10,46,stone,48)
cyl('Galata battlement gallery',(x,y,z+45),11.5,3,stone2,48)
cyl('Galata timber roof',(x,y,z+52),12,14,wood,48,0)
# Distant land behind Constantinople
for iy in range(0):
 vs=[]
 for j in range(51):
  xx=-4500+j*125;yy=-1400-iy*550;zz=75+60*sin(j*.21+iy)+35*sin(j*.58)
  vs.extend([(xx,yy,-10),(xx,yy,zz)])
 mesh('Distant Thracian ridge '+str(iy),vs,[(i*2,i*2+1,i*2+3,i*2+2) for i in range(50)],earth)
# Trees built with clustered polygon foliage, rooted on gardens and hill.
active=COL['07 • Bahçeler'];trees=Batch('Cypresses • trunks');leaves=Batch('Cypresses • foliage')
def tree(x,y,z,s=1,cypress=True):
 trees.box((x,y,z+2*s),(.5*s,.5*s,4*s),wood)
 # tapered many-ring silhouette
 h=random.uniform(9,15)*s;r=random.uniform(1.5,2.4)*s
 vv=[];ff=[]
 for j in range(8):
  t=j/7;rr=r*(sin(pi*t)**.65)*(.95+.1*sin(j*2))
  for i in range(9):a=i*2*pi/9;vv.append((x+rr*cos(a),y+rr*sin(a),z+2*s+t*h))
 for j in range(7):
  for i in range(9):leaves.face([vv[j*9+i],vv[j*9+(i+1)%9],vv[(j+1)*9+(i+1)%9],vv[(j+1)*9+i]],green if cypress else olive)
for i in range(230):
 x=random.uniform(-650,140);y=random.uniform(-500,150)
 if ((x-HX)/75)**2+((y-HY)/84)**2<1.25:continue
 sy=205-(x+70)*.6 if x>-70 else 215+(-x-70)*.15
 if y>sy-20:continue
 tree(x,y,landheight(x,y),random.uniform(.65,1.2))
for i in range(15):tree(65+random.uniform(-15,20),-45+i*8,landheight(65,-45+i*8),random.uniform(.8,1.3))
trees.mesh();leaves.mesh()
# Boats with curved planked hulls, decks, cordage and loose triangular lateen sails.
active=COL['06 • Tekneler ve donanım']
def boat(name,x,y,L,a,sail=True):
 W=L*.22;H=L*.105;vs=[];fs=[]
 def tr(u,v,z):return(x+u*cos(a)-v*sin(a),y+u*sin(a)+v*cos(a),z)
 for j in range(6):
  t=j/5;z=.1+t*H
  for i in range(33):
   ang=i*2*pi/32;u=L/2*cos(ang);v=W/2*sin(ang)*(sin(pi*t/2)*.83+.15)
   vs.append(tr(u,v,z+H*.3*abs(cos(ang))**5))
 for j in range(5):
  for i in range(32):k=j*33+i;fs.append((k,k+1,k+34,k+33))
 mesh(name+' | carvel hull',vs,fs,wood,True)
 for j in range(1,6):
  t=j/5;pts=[]
  for i in range(49):
   ang=i*2*pi/48;pts.append(tr(L/2*cos(ang),W/2*sin(ang)*(sin(pi*t/2)*.83+.15),.1+t*H+H*.3*abs(cos(ang))**5))
  curve('Hull wale',pts,L*.007,woodlight)
 b=Batch(name+' | deck and ribs')
 # deck shape elliptical
 b.face([tr(L*.475*cos(i*2*pi/32),W*.45*sin(i*2*pi/32),H*.91) for i in range(32)],woodlight)
 for i in range(15):
  u=(i/14-.5)*L*.88;ww=W*.86*math.sqrt(max(0,1-(u/(L/2))**2));b.face([tr(u-.025,-ww/2,H*.92),tr(u+.025,-ww/2,H*.92),tr(u+.025,ww/2,H*.92),tr(u-.025,ww/2,H*.92)],wood)
 # stern deck
 for side in [-1,1]:
  curve('Gunwale', [tr(L*.485*cos(i*pi/24),side*W*.47*sin(i*pi/24),H+H*.3*abs(cos(i*pi/24))**5) for i in range(25)],.11,woodlight)
 mast=L*.74;mx=-L*.08
 curve('Main mast',[tr(mx,0,H),tr(mx,0,H+mast)],L*.012,woodlight)
 # long slanting lateen yard
 A=(L*.35,0,H+mast*.43);B=(-L*.38,0,H+mast*1.04)
 curve('Lateen yard',[tr(*A),tr(*B)],L*.010,woodlight)
 if sail:
  C=(-L*.31,W*.07,H+mast*.12);vv=[];ff=[];N=15
  for i in range(N+1):
   for j in range(N+1-i):
    u=i/N;v=j/N;w=1-u-v
    px=A[0]*w+B[0]*u+C[0]*v;py=(A[1]*w+B[1]*u+C[1]*v)+W*.31*sin(pi*u)*sin(pi*v)*sin(pi*w)*4;pz=A[2]*w+B[2]*u+C[2]*v;vv.append(tr(px,py,pz))
  idx={};q=0
  for i in range(N+1):
   for j in range(N+1-i):idx[i,j]=q;q+=1
  for i in range(N):
   for j in range(N-i):
    ff.append((idx[i,j],idx[i+1,j],idx[i,j+1]))
    if j<N-i-1:ff.append((idx[i+1,j],idx[i+1,j+1],idx[i,j+1]))
  mesh('Undyed lateen canvas',vv,ff,sailmat,True)
  for P,Q in [(A,B),(B,C),(C,A)]:curve('Sail bolt rope',[tr(*P),tr(*Q)],.045,rope)
  for t in [.2,.4,.6,.8]:
   P=tuple(B[k]*(1-t)+A[k]*t for k in range(3));Q=tuple(B[k]*(1-t)+C[k]*t for k in range(3));curve('Canvas stitched panel',[tr(*P),tr(*Q)],.017,woodlight)
 else:
  curve('Furled canvas',[tr(A[0]*.92,0,A[2]+.08),tr(B[0]*.94,0,B[2])],L*.024,sailmat)
 for u,v in [(-L*.4,0),(L*.4,0),(0,-W*.44),(0,W*.44)]:curve('Standing rigging',[tr(mx,0,H+mast*.95),tr(u,v,H)],L*.0015,rope)
 for u in [-L*.22,L*.24]:
  for side in [-1,1]:curve('Rowing oar',[tr(u,side*W*.4,H*.8),tr(u-L*.11,side*W*.95,.25)],L*.0035,woodlight)
 b.mesh()
boat('Coastal lateener • foreground',40,270,44,math.radians(55),True)
boat('Low galley • midwater',-220,290,43,math.radians(8),False)
boat('Merchant lateener',-380,280,30,math.radians(-10),True)
boat('Anchored transport',-465,405,23,math.radians(14),True)
boat('Small coastal boat',95,285,18,math.radians(30),False)
for i in range(8):boat('Distant Haliç vessel %02d'%i,-680-i*82,random.uniform(400,515),random.uniform(15,25),random.uniform(-.2,.4),i%3!=0)
# Period harbour barrier: floating timber booms with sagging iron chain.
chainmat=mat('Black iron chain',(.075,.069,.052),.5,0,.7)
pts=[]
for i in range(70):
 t=i/69;x=-110+t*90;y=220+t*405;z=.35+.25*cos(t*16*pi);pts.append((x,y,z))
 if i%3==0:cube('Harbour chain timber float',(x,y,.05),(5.8,1.3,.9),wood)
curve('Haliç harbour chain',pts,.11,chainmat)
# Physically shaded homogeneous haze + noisy rising smoke volumes.
active=COL['08 • Şafak ve duman']
def volume(n,col,density):
 m=bpy.data.materials.new(n);m.use_nodes=True;nd=m.node_tree.nodes;nd.clear();out=nd.new('ShaderNodeOutputMaterial');v=nd.new('ShaderNodeVolumePrincipled');v.inputs['Color'].default_value=(*col,1);v.inputs['Density'].default_value=density;v.inputs['Anisotropy'].default_value=.30;m.node_tree.links.new(v.outputs['Volume'],out.inputs['Volume']);return m
haze=volume('Blue aerial perspective',(.54,.64,.72),.00028)
cube('Low marine haze',(-300,0,210),(6500,5500,480),haze)
sm=volume('Wind-combed smoke',(.24,.245,.25),.055)
nd=sm.node_tree.nodes;l=sm.node_tree.links;v=nd.get('Principled Volume');tc=nd.new('ShaderNodeTexCoord');ns=nd.new('ShaderNodeTexNoise');ns.inputs['Scale'].default_value=4.3;ns.inputs['Detail'].default_value=4;l.new(tc.outputs['Generated'],ns.inputs['Vector']);ramp=nd.new('ShaderNodeValToRGB');ramp.color_ramp.elements[0].position=.33;ramp.color_ramp.elements[0].color=(0,0,0,1);ramp.color_ramp.elements[1].position=.7;ramp.color_ramp.elements[1].color=(.019,.019,.019,1);l.new(ns.outputs['Fac'],ramp.inputs[0]);l.new(ramp.outputs[0],v.inputs['Density'])
for k,(x,y,h) in enumerate([(-470,-330,90),(-820,-230,130),(-1050,-140,95)]):
 z=landheight(x,y)
 for j in range(5):
  t=j/4;bpy.ops.mesh.primitive_uv_sphere_add(segments=16,ring_count=12,location=(x-t*85+sin(j*2)*10,y+t*18,z+8+t*h));o=put(bpy.context.object);o.name='Smoke plume %d • wisp %d'%(k,j);o.scale=(5+t*35,6+t*23,13+t*19);o.data.materials.append(sm)
exec(compile(open(os.path.join(ROOT,'detay_ekle.py')).read(),'detay_ekle.py','exec'))
# World dawn sky, with east light raking the sea walls.
world=bpy.data.worlds.new('Marmara dawn');bpy.context.scene.world=world;world.use_nodes=True;nd=world.node_tree.nodes;nd.clear();out=nd.new('ShaderNodeOutputWorld');bg=nd.new('ShaderNodeBackground');bg.inputs['Strength'].default_value=.32;sky=nd.new('ShaderNodeTexSky');sky.sky_type='MULTIPLE_SCATTERING';sky.sun_elevation=math.radians(5);sky.sun_rotation=math.radians(26.5);sky.altitude=.1;sky.air_density=1.2;sky.aerosol_density=2.0;sky.ozone_density=1.1;world.node_tree.links.new(sky.outputs[0],bg.inputs[0]);world.node_tree.links.new(bg.outputs[0],out.inputs[0])
bpy.ops.object.light_add(type='SUN',location=(600,250,400));sun=put(bpy.context.object);sun.name='29 Mayıs • first eastern light';sun.data.energy=3.0;sun.data.color=(1,.61,.32);sun.data.angle=math.radians(1.4);direction=Vector((-1,-.5,-.16));sun.rotation_euler=direction.to_track_quat('-Z','Y').to_euler()
exec(compile(open(os.path.join(ROOT,'son_isik.py')).read(),'son_isik.py','exec'))
exec(compile(open(os.path.join(ROOT,'yuzeyler.py')).read(),'yuzeyler.py','exec'))
# Single fixed establishing camera.
bpy.ops.object.camera_add(location=(400,370,112));cam=put(bpy.context.object);cam.name='Sarayburnu • tek sabit bakış';target=Vector((-230,0,25));cam.rotation_euler=(target-cam.location).to_track_quat('-Z','Y').to_euler();cam.data.lens=37;cam.data.clip_end=14000;cam.data.dof.use_dof=False;bpy.context.scene.camera=cam
scene=bpy.context.scene;scene.render.engine='CYCLES';scene.cycles.samples=96;scene.cycles.use_denoising=True;scene.cycles.max_bounces=7;scene.cycles.volume_bounces=1;scene.cycles.transparent_max_bounces=6;scene.cycles.use_adaptive_sampling=True;scene.cycles.adaptive_threshold=.015
try:
 prefs=bpy.context.preferences.addons['cycles'].preferences;prefs.compute_device_type='OPTIX';prefs.get_devices();gpu=False
 for d in prefs.devices:d.use=d.type=='OPTIX';gpu|=d.type=='OPTIX'
 scene.cycles.device='GPU' if gpu else 'CPU';print('RENDER DEVICE:',scene.cycles.device,[(d.name,d.type) for d in prefs.devices])
except Exception as e:print(e)
scene.render.resolution_x=1920;scene.render.resolution_y=1080;scene.render.resolution_percentage=100
scene.render.image_settings.file_format='PNG';scene.render.image_settings.color_mode='RGB';scene.render.filepath='//kare.png'
scene.view_settings.view_transform='AgX';scene.view_settings.look='AgX - Medium High Contrast';scene.view_settings.exposure=-.15
# Restrained photographic glare.
scene['Title']='İstanbul • 29 Mayıs 1453, şafak';scene['Historical scope']='Interpretive Byzantine city reconstruction. No Ottoman minarets, Topkapi, flags, people or violence. Procedural geometry and materials only.';scene['View']='Elevated fixed view from the waters immediately off Sarayburnu, looking west-southwest. Scale and distances composed for a readable establishing shot.'
# Helpful opening state.
for area in bpy.context.screen.areas:
 if area.type=='VIEW_3D':area.spaces.active.region_3d.view_perspective='CAMERA'
bpy.context.preferences.filepaths.save_version=0
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(ROOT,'sahne.blend'))
bpy.ops.render.render(write_still=True)
print('FINAL RENDER COMPLETE')
