# Additional all-procedural environmental craft; executed inside sahne_uret.py.
active=COL['01 • Kara ve kıyılar']
pathmat=mat('Worn limestone dust paths',(.36,.31,.22),noise=1.5)
def footpath(name,points,width):
 vv=[]
 for i,(x,y) in enumerate(points):
  a=Vector(points[max(0,i-1)]);b=Vector(points[min(len(points)-1,i+1)]);d=(b-a).normalized();n=Vector((-d.y,d.x))
  for side in [-1,1]:
   xx=x+n.x*width*.5*side;yy=y+n.y*width*.5*side;vv.append((xx,yy,landheight(xx,yy)+.42))
 return mesh(name,vv,[(i*2,i*2+1,i*2+3,i*2+2) for i in range(len(points)-1)],pathmat)
footpath('Path through the acropolis',[(90,85),(75,60),(45,40),(19,5),(-4,-22),(-22,-50)],3.5)
footpath('Road toward the cathedral',[(30,-102),(55,-84),(71,-48),(86,-10),(93,35),(80,75),(56,136)],5)
footpath('Western lane',[(-94,-150),(-125,-160),(-180,-162),(-230,-145),(-290,-152),(-350,-170)],4.5)
# Cathedral forecourt paving in irregular modules.
active=COL['03 • Ayasofya — 1453'];paving=Batch('Cathedral precinct • worn paving')
for ix in range(17):
 for iy in range(12):
  x=HX-43+ix*5;y=HY-70+iy*5
  if abs(x-HX)<34 and y>HY-57:continue
  paving.box((x,y,landheight(x,y)+.32),(4.9,4.9,.15),random.choice([stone,stone2,plasters[0]]))
paving.mesh()
# Individual cap stones and repairs add age to near towers.
active=COL['02 • Bizans deniz surları'];weather=Batch('Near wall • joints, repairs and salt line')
for ax,ay in shore[:7]:
 for row in range(18):
  for j in range(5):
   if random.random()<.3:continue
   weather.box((ax-4+j*2,ay+5.08,.8+row*.78),(1.8,.12,.67),random.choice([stone,stone,stone2]))
for x,y in [(55,145),(-70,205)]:
 arch(weather,(x,y+5.13,1),3.4,6,wood,0)
weather.mesh()
# Olive groves: loose, irregular branching canopies, not conical trees.
active=COL['07 • Bahçeler']
fol=Batch('Olive groves • leaf clusters');trunks=Batch('Olive groves • twisting trunks')
for i in range(95):
 x=random.uniform(-190,145);y=random.uniform(-270,145)
 if ((x-HX)/80)**2+((y-HY)/92)**2<1.2:continue
 sy=205-(x+70)*.6 if x>-70 else 215+(-x-70)*.15
 if y>sy-22:continue
 z=landheight(x,y);h=random.uniform(3,6)
 trunks.box((x,y,z+h/2),(.6,.7,h),wood,random.random())
 for q in range(random.randint(4,7)):
  cx=x+random.uniform(-2.8,2.8);cy=y+random.uniform(-2.8,2.8);cz=z+h+random.uniform(-.2,2);r=random.uniform(1.4,2.7)
  vv=[]
  for j in range(5):
   t=-pi/2+j*pi/4
   for k in range(8):
    a=k*pi/4;rr=r*random.uniform(.85,1.15);vv.append((cx+rr*cos(t)*cos(a),cy+rr*cos(t)*sin(a),cz+rr*.8*sin(t)))
  for j in range(4):
   for k in range(8):fol.face([vv[j*8+k],vv[j*8+(k+1)%8],vv[(j+1)*8+(k+1)%8],vv[(j+1)*8+k]],olive)
fol.mesh();trunks.mesh()
# Quays, low waterfront stores and mooring posts.
active=COL['06 • Tekneler ve donanım'];quay=Batch('Small landing • wharf and bollards')
quay.box((-87,217,1),(30,13,2),stone)
for i in range(21):quay.box((-103+i*1.5,231,1.4),(1.38,16,.55),woodlight)
for x in [-103,-88,-73]:
 for y in [224,236]:quay.box((x,y,.9),(.6,.6,4.2),wood)
for y in [225,229,233,237]:quay.box((-88,y,1.25),(32,.2,.3),wood)
quay.mesh()
boat('Moored rowing skiff',-110,235,11,.8,False)
# Tiny whitecaps drawn as broken, irregular foam lines near hulls.
foam=mat('Dissolving wake',(.37,.44,.39),.6)
for j in range(18):
 x=230+j*2.8;y=350+j*.45
 curve('Broken ripple',[(x+t*1.7,y+sin(t*1.4+j)*.15,.018) for t in range(4)],.025,foam)
# Inland continuation: Constantinople is not an island. Low ridges recede into haze.
active=COL['01 • Kara ve kıyılar']
vv=[];ff=[]
for i in range(65):
 x=-6000+i*100
 for j in range(44):
  y=-1050-j*120
  fade=min(1,j/4)
  z=(6+fade*(30+36*sin(x*.0018+y*.0014)+22*sin(x*.0031-y*.002)))
  vv.append((x,y,z))
for i in range(64):
 for j in range(43):k=i*44+j;ff.append((k,k+1,k+45,k+44))
mesh('Continuous inland landscape',vv,ff,earth,True)
# Continue the far western city bank to the vanishing point.
vv=[];ff=[]
for i in range(30):
 x=-1700-i*160
 for j in range(12):
  y=430+i*12-j*150;vv.append((x,y,3+j*3+18*sin(i*.35)*min(1,j/3)))
for i in range(29):
 for j in range(11):k=i*12+j;ff.append((k,k+1,k+13,k+12))
mesh('Western bank vanishes into morning',vv,ff,earth,True)
active=COL['08 • Şafak ve duman']
farhaze=volume('Inland dawn mist',(.58,.62,.68),.0012)
cube('Veil over the distant hills',(-2600,-2050,130),(5200,2400,300),farhaze)
# Architectural tympana under the great dome.
active=COL['03 • Ayasofya — 1453'];ty=Batch('Great lateral arches');tw=Batch('Tympanum window lights')
for sign in [-1,1]:
 arch(ty,hp(sign*22.22,0,20),30,18,brick,pi/2,True)
 for row,(zz,count) in enumerate([(22,7),(28,5)]):
  for i in range(count):arch(tw,hp(sign*22.35,(i-(count-1)/2)*3.6,zz),1.6,3.6,dark,pi/2,True)
ty.mesh();tw.mesh()
