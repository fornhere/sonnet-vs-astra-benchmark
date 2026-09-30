"""KARAKIYI — The Tidal Crown. Entirely original, procedural Blender environment.
Run: blender -b --python build_castle.py
All dimensions are metres. No external assets or add-ons are needed.
"""
import bpy, math, random, os, sys, time
from mathutils import Vector
from collections import defaultdict
from math import sin, cos, pi

ROOT = os.path.dirname(os.path.abspath(__file__))
random.seed(1947)
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
for d in list(bpy.data.collections):
    if d.name != 'Collection': bpy.data.collections.remove(d)
basecollection = bpy.data.collections.get('Collection')
basecollection.name = '00 • WORLD / sea & distant islands'
collections = {basecollection.name: basecollection}
def coll(name):
    if name not in collections:
        c=bpy.data.collections.new(name); bpy.context.scene.collection.children.link(c); collections[name]=c
    return collections[name]

def mat(name, color, rough=.7, metallic=0, noise=0, scale=3):
    m=bpy.data.materials.new(name); m.diffuse_color=(*color,1); m.use_nodes=True
    ns=m.node_tree.nodes; lk=m.node_tree.links; p=ns.get('Principled BSDF')
    p.inputs['Base Color'].default_value=(*color,1); p.inputs['Roughness'].default_value=rough; p.inputs['Metallic'].default_value=metallic
    if noise:
        tex=ns.new('ShaderNodeTexNoise'); tex.inputs['Scale'].default_value=scale; tex.inputs['Detail'].default_value=3
        tc=ns.new('ShaderNodeTexCoord'); lk.new(tc.outputs['Object'],tex.inputs['Vector'])
        ramp=ns.new('ShaderNodeValToRGB'); ramp.color_ramp.elements[0].position=.18; ramp.color_ramp.elements[1].position=.82
        ramp.color_ramp.elements[0].color=(*(x*(1-noise) for x in color),1)
        ramp.color_ramp.elements[1].color=(*(min(x*(1+noise),1) for x in color),1)
        lk.new(tex.outputs['Fac'],ramp.inputs[0]); lk.new(ramp.outputs[0],p.inputs['Base Color'])
        bump=ns.new('ShaderNodeBump'); bump.inputs['Strength'].default_value=.23; bump.inputs['Distance'].default_value=.075
        lk.new(tex.outputs['Fac'],bump.inputs['Height']); lk.new(bump.outputs[0],p.inputs['Normal'])
    return m

stone=[mat('Limestone • ashlar %02d'%i, (.43+i*.017,.385+i*.016,.295+i*.014),noise=.22,scale=5) for i in range(6)]
trim=mat('Limestone • freshly dressed edges',(.66,.59,.44),noise=.13,scale=7)
mortar=mat('Recessed joints • warm grey',(.265,.25,.205),noise=.2)
roofm=[mat('Patinated copper • %02d'%i,(.038+i*.01,.145+i*.013,.15+i*.013),rough=.44,metallic=.38,noise=.26,scale=3) for i in range(5)]
gold=mat('Old brass • finials & heraldry',(.55,.31,.075),.29,.72)
iron=mat('Forged iron',(.042,.051,.052),.4,.72)
wood=mat('Oak • weathered',(.19,.085,.035),noise=.4,scale=5)
dark=mat('Deep window recess',(.017,.027,.03))
red=mat('House of the tide • oxblood cloth',(.24,.019,.028),.85,noise=.16,scale=8)
rock=mat('Island • basalt & lichen',(.115,.15,.155),noise=.52,scale=1.7)
grass=mat('Coastal moss',(.15,.215,.082),noise=.5,scale=2)
soil=mat('Courtyard • worn paving',(.32,.305,.245),noise=.32,scale=4)
leaves=[mat('Cypress foliage %d'%i,(.026+i*.018,.087+i*.025,.055+i*.008),noise=.32,scale=4) for i in range(3)]
glass=mat('Amber leaded glass',(.48,.205,.045),.27,.28)
p=glass.node_tree.nodes.get('Principled BSDF'); p.inputs['Emission Color'].default_value=(1,.37,.065,1); p.inputs['Emission Strength'].default_value=.8
blueglass=mat('Chapel • petrol glass',(.025,.16,.2),.24,.35)

# Batched meshes keep a substantial architectural model responsive in the viewport.
parts={}; group=''
def put(material, verts, faces):
    key=(group,material.name)
    if key not in parts: parts[key]=[[],[]]
    v,f=parts[key]; n=len(v); v.extend(verts); f.extend(tuple(n+j for j in face) for face in faces)

def box(center, size, material, angle=0):
    x,y,z=center; a,b,c=[s/2 for s in size]; C=cos(angle); S=sin(angle)
    pts=[(x+u*C-v*S,y+u*S+v*C,z+w) for u,v,w in [(-a,-b,-c),(a,-b,-c),(a,b,-c),(-a,b,-c),(-a,-b,c),(a,-b,c),(a,b,c),(-a,b,c)]]
    put(material,pts,[(0,3,2,1),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)])

def tube(x,y,z,r,h,material,n=32,r2=None,start=0,end=2*pi):
    if r2 is None:r2=r
    full=abs(end-start-2*pi)<.001; count=n if full else n+1
    vs=[(x+rad*cos(start+(end-start)*i/n),y+rad*sin(start+(end-start)*i/n),zz) for rad,zz in [(r,z),(r2,z+h)] for i in range(count)]
    fs=[]
    for i in range(n):j=(i+1)%count;fs.append((i,j,j+count,i+count))
    fs += [tuple(reversed(range(count))),tuple(range(count,count*2))]
    if not full:fs.extend([(0,count,count*2-1,count-1)])
    put(material,vs,fs)

def rod(a,b,r,material,n=8):
    av,bv=Vector(a),Vector(b); d=bv-av; q=d.to_track_quat('Z','Y')
    verts=[tuple(av+q@Vector((r*cos(2*pi*i/n),r*sin(2*pi*i/n),zz))) for zz in [0,d.length] for i in range(n)]
    put(material,verts,[(i,(i+1)%n,(i+1)%n+n,i+n) for i in range(n)]+[tuple(reversed(range(n))),tuple(range(n,2*n))])

def torus(x,y,z,r,minor,material,n=40,k=6):
    vs=[(x+(r+minor*cos(2*pi*j/k))*cos(2*pi*i/n),y+(r+minor*cos(2*pi*j/k))*sin(2*pi*i/n),z+minor*sin(2*pi*j/k)) for i in range(n) for j in range(k)]
    put(material,vs,[(i*k+j,((i+1)%n)*k+j,((i+1)%n)*k+(j+1)%k,i*k+(j+1)%k) for i in range(n) for j in range(k)])

def arch(cx,cy,z,w,h,depth,material,angle=0, thickness=None, steps=16):
    # Semicircular arch opening, or a solid arched insert, standing in local X/Z.
    r=w/2; spring=h-r; C,S=cos(angle),sin(angle)
    tr=lambda x,y,zz:(cx+x*C-y*S,cy+x*S+y*C,z+zz)
    if thickness is None:
        profile=[(-r,0),(r,0)]+[(r*cos(pi*i/steps),spring+r*sin(pi*i/steps)) for i in range(steps+1)]
        vs=[tr(x,y,zz) for y in [-depth/2,depth/2] for x,zz in profile]; n=len(profile)
        put(material,vs,[tuple(reversed(range(n))),tuple(range(n,2*n))]+[(i,(i+1)%n,(i+1)%n+n,i+n) for i in range(n)])
    else:
        t=thickness
        for side in [-1,1]:
            xx=side*(r+t/2); bx,by,_=tr(xx,0,0)
            box((bx,by,z+spring/2),(t,depth,spring),material,angle)
        for i in range(steps):
            a=pi*i/steps+.006; b=pi*(i+1)/steps-.006
            vs=[tr(rad*cos(th),yy,spring+rad*sin(th)) for yy in [-depth/2,depth/2] for rad,th in [(r,a),(r,b),(r+t,b),(r+t,a)]]
            put(material,vs,[(0,3,2,1),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)])

def window(x,y,z,w= .7,h=1.9,angle=0,lit=False):
    arch(x,y,z,w,h,.075,glass if lit else dark,angle)
    arch(x,y,z-.025,w,h,.21,trim,angle,thickness=.14,steps=10)
    C,S=cos(angle),sin(angle)
    box((x,y,z-.1),(w+.44,.38,.16),trim,angle)
    # Mullions and a horizontal transom in front of the glass.
    box((x+.07*S,y-.07*C,z+h*.46),(.055,.12,h*.85),iron,angle)
    box((x+.07*S,y-.07*C,z+h*.5),(w,.12,.052),iron,angle)

def flag(x,y,z,length=2.1):
    rod((x,y,z-.1),(x,y,z+3),.046,gold)
    tube(x,y,z+3,.13,.32,gold,8,r2=0)
    vs=[]; nx,nz=12,6
    for j in range(nz+1):
        for i in range(nx+1):
            u=i/nx; v=j/nz
            vs.append((x+u*length,y+sin(u*8-v*2)*u*.23,z+2.72-v*1.15-u*.13))
    put(red,vs,[(j*(nx+1)+i,j*(nx+1)+i+1,(j+1)*(nx+1)+i+1,(j+1)*(nx+1)+i) for j in range(nz) for i in range(nx)])
    # Brass sun on the cloth, on both sides.
    for side in [-1,1]:
        for i in range(12):
            a=2*pi*i/12
            xx=x+.78+.2*cos(a); zz=z+2.1+.2*sin(a)
            rod((xx,y+side*.24,zz),(xx+.1*cos(a),y+side*.24,zz+.1*sin(a)),.024,gold,5)

def coneroof(x,y,z,r,h):
    tube(x,y,z-.14,r*.99,.23,iron,48)
    steps=int(h/.43)
    for j in range(steps):
        f=j/steps; nextf=(j+1)/steps
        tube(x,y,z+h*f,r*(1-f)+.10,h/steps,roofm[j%5],48,r2=r*(1-nextf)+.035)
    # Standing seams in the copper, fine enough to catch rim light.
    for i in range(16):
        a=i*2*pi/16
        rod((x+r*cos(a),y+r*sin(a),z+.04),(x+.07*cos(a),y+.07*sin(a),z+h),.023,roofm[3],5)
    tube(x,y,z+h,.08,.68,gold,10,r2=.025)
    tube(x,y,z+h+.67,.14,.24,gold,8,r2=0)

def tower(name,x,y,r,base,height,roof=True):
    global group
    group=name; top=base+height
    tube(x,y,base,r+.35,.8,stone[1],40,r2=r)
    tube(x,y,base+.6,r-.045,height-.6,mortar,48)
    rows=int((height-.6)/.48); n=max(18,int(r*12))
    for j in range(rows):
        zz=base+.6+j*(height-.6)/rows
        for i in range(n):
            a=2*pi*(i+.5*(j%2))/n
            tube(x,y,zz,r+random.uniform(-.024,.032),(height-.6)/rows-.028,random.choice(stone),2,r2=r+random.uniform(-.02,.02),start=a+.009,end=a+2*pi/n-.009)
    for zz,rr,hh in [(base+1,r+.09,.18),(top-1.15,r+.1,.18),(top-.4,r+.23,.26),(top-.12,r+.32,.24)]:tube(x,y,zz,rr,hh,trim,48)
    # Corbel table beneath the projecting fighting platform.
    for i in range(20):
        a=i*2*pi/20
        box((x+(r+.08)*cos(a),y+(r+.08)*sin(a),top-.61),(.27,.37,.62),trim,a)
    if roof:
        tube(x,y,top,r+.24,.72,stone[3],48)
        for i in range(12):
            a=i*2*pi/12
            box((x+(r+.16)*cos(a),y+(r+.16)*sin(a),top+.9),(.44,.54,.56),trim,a)
        coneroof(x,y,top+.63,r+.57,r*1.7+.65)
    else:
        tube(x,y,top,r+.2,.38,trim,48)
        for i in range(12):
            a=i*2*pi/12
            box((x+r*cos(a),y+r*sin(a),top+.85),(.65,.7,1),stone[4],a)
        tube(x,y,top+.39,r-.4,.04,soil,40)
    for lev in [base+height*.33,base+height*.65]:
        for i in range(6):
            a=2*pi*i/6
            window(x+(r+.08)*sin(a),y-(r+.08)*cos(a),lev,.48,1.48,a,lit=(i%3==0))

def wall(a,b,z=6,height=6,width=1.3):
    ax,ay=a;bx,by=b; L=math.hypot(bx-ax,by-ay);ang=math.atan2(by-ay,bx-ax)
    box(((ax+bx)/2,(ay+by)/2,z+height/2),(L,width,height),stone[2],ang)
    box(((ax+bx)/2,(ay+by)/2,z+height-.25),(L,width+.3,.35),trim,ang)
    N=int(L/.93)
    for i in range(N):
        t=(i+.5)/N
        box((ax+(bx-ax)*t,ay+(by-ay)*t,z+height+.45),(.58,width+.2,.95),stone[i%6],ang)
    # Walkway and interior safety curb.
    box(((ax+bx)/2,(ay+by)/2,z+height-.58),(L,width+1.0,.16),trim,ang)
    for i in range(int(L/3)):
        t=(i+.5)/int(L/3); xx=ax+(bx-ax)*t; yy=ay+(by-ay)*t
        box((xx,yy,z+height*.48),(.5,width+ .44,height*.96),stone[4],ang)
    # Outward ashlar lines give scale without a flat tiled image texture.
    for side in [-1,1]:
        for j in range(int(height/.62)):
            for i in range(int(L/1.3)):
                u=(i+.5+.5*(j%2))/(int(L/1.3)+.5)
                xx=ax+(bx-ax)*u-side*sin(ang)*(width/2+.017)
                yy=ay+(by-ay)*u+side*cos(ang)*(width/2+.017)
                box((xx,yy,z+.3+j*.62),(L/int(L/1.3)-.045,.055,.575),random.choice(stone),ang)

# TERRAIN: fractured cliff strata, stepped summit, lichen shelf.
group='01 • ISLAND / fractured basalt'
N=80; levels=[(-1.8,1.01),(.25,1.02),(2, .97),(4.2,.90),(5.8,.84)]
profile=[1+random.uniform(-.1,.1)+.05*sin(i*.8) for i in range(N)]
verts=[]
for j,(z,rad) in enumerate(levels):
    for i in range(N):
        a=2*pi*i/N; p=profile[i]*rad
        verts.append((27*p*cos(a),23*p*sin(a),z+random.uniform(-.4,.4)))
faces=[]
for j in range(len(levels)-1):
    for i in range(N):
        a=j*N+i;b=j*N+(i+1)%N;c=(j+1)*N+(i+1)%N;d=(j+1)*N+i
        faces.extend([(a,b,c),(a,c,d)])
faces.append(tuple(range((len(levels)-1)*N,len(levels)*N)))
put(rock,verts,faces)
tube(0,0,5.4,1,.55,grass,80) # replaced by an elliptical summit below
vs=[(22.9*cos(2*pi*i/N)*profile[i],19.4*sin(2*pi*i/N)*profile[i],5.72) for i in range(N)]
put(grass,vs,[tuple(range(N))])
for i in range(95):
    a=random.uniform(0,2*pi); rr=random.uniform(.91,1.14)
    x=25.3*rr*cos(a);y=21.6*rr*sin(a)
    z=random.uniform(-.5,2.4)
    # Angular, oriented rock shards.
    r=random.uniform(.6,2.4)
    nh=6;hh=random.uniform(1,3.8);vs=[]
    for j in range(3):
        for k in range(nh):
            th=2*pi*k/nh;rad=r*random.uniform(.55,1.05)*(1-j*.23)
            vs.append((x+rad*cos(th)+j*.23,y+rad*sin(th),z+j*hh*.5+random.uniform(-.35,.35)))
    fs=[]
    for j in range(2):
        for k in range(nh):fs.append((j*nh+k,j*nh+(k+1)%nh,(j+1)*nh+(k+1)%nh,(j+1)*nh+k))
    fs.append(tuple(range(2*nh,3*nh)));put(rock,vs,fs)

# The causeway reaches a real mainland headland, rather than ending in the sea.
group='01 • MAINLAND / approach headland'
coast=[(-3,-49),(3,-49),(4,-53),(7,-58),(7.4,-63),(10,-69),(9,-76),(14,-85),(17,-101),(22,-117),(30,-149),(54,-230),(95,-450),(-140,-450),(-80,-235),(-37,-133),(-28,-106),(-24,-88),(-19,-78),(-17,-67),(-10,-58)]
vs=[(x*1.06,y,z) for z in [-1,5.78] for x,y in coast]
n=len(coast)
put(rock,vs,[(i,(i+1)%n,(i+1)%n+n,i+n) for i in range(n)]+[tuple(range(n,2*n))])
put(grass,[(x,y,5.81) for x,y in coast],[tuple(range(n))])
for j in range(230):
    y=-50-j*1.8
    box((-max(0,j-7)*.09,y,5.91),(4.1,1.77,.12),soil)
for i in range(20):
    x=random.uniform(-17,-5);y=random.uniform(-103,-67)
    tube(x,y,5.8,random.uniform(.4,1.2),random.uniform(.4,1.2),rock,5,r2=.15)

# FORTIFICATIONS: a deliberately irregular medieval enceinte.
points=[(-17,-10),(-19,3),(-12,15),(3,18),(17,12),(20,-2),(15,-13),(6,-17),(-6,-17)]
group='02 • CURTAIN WALLS / accessible ramparts'
for i in range(len(points)):
    a=points[i];b=points[(i+1)%len(points)]
    if i==7:continue
    wall(a,b)
for i,(x,y) in enumerate(points):
    if i in [7,8]:continue
    tower('03 • WATCHTOWER %02d'%(i+1),x,y,1.85 if i%2 else 2.15,5.7,7.5+(i%3)*.7,roof=i not in [0,3])
    if i in [0,3]:flag(x,y,14.3,2)

# Main gate: an actual open portal under a vaulted stone arch.
for x in [-5.8,5.8]:tower('04 • GATEHOUSE / '+('east' if x>0 else 'west'),x,-17,2.5,5.7,9.2)
group='04 • GATEHOUSE / portcullis & entrance'
box((-3.35,-17,9.1),(2.5,3.3,6.8),stone[3]);box((3.35,-17,9.1),(2.5,3.3,6.8),stone[3])
# Open arch geometry and solid spandrels; no fake black doorway.
arch(0,-17,5.85,4.2,5.5,3.2,trim,thickness=.6,steps=24)
box((0,-17,12.43),(7.5,3.3,2.3),stone[2])
box((0,-17,13.61),(8,3.65,.25),trim)
for x in [-3.5,-2.5,-1.5,-.5,.5,1.5,2.5,3.5]:box((x,-18.48,14.15),(.6,.62,.95),stone[4])
for x in [-2.9,0,2.9]:window(x,-18.7,11.6,.55,1.3,lit=True)
# Raised iron gate visible within the opening.
for x in [-1.8,-1.4,-1,-.6,-.2,.2,.6,1,1.4,1.8]:
    box((x,-17.55,10.12),(.055,.1,2.8),iron)
for z in [9.15,9.7,10.3,10.9]:box((0,-17.55,z),(4.05,.12,.07),iron)
# Double heavy doors opened inward.
for side in [-1,1]:
    box((side*2.1,-15.25,7.7),(.22,2.3,3.7),wood,side*.12)
    for z in [6.3,7.65,9.1]:box((side*1.94,-15.25,z),(.12,2.3,.16),iron,side*.12)

# Heraldic hanging banners, a sun divided by a tidal line.
for x in [-3.2,3.2]:
    box((x,-18.79,10.55),(.9,.055,1.8),red)
    rod((x-.65,-18.82,11.5),(x+.65,-18.82,11.5),.05,gold)
    arch(x,-18.84,10.4,.46,.46,.035,gold)
    box((x,-18.87,10.55),(.58,.03,.05),red)
    for i in [-1,1]:rod((x+i*.45,-18.79,9.66),(x,-18.79,9.35),.025,gold)

# BRIDGE, built as a series of true arches with tall tidal piers.
group='05 • TIDAL VIADUCT / six arches'
for j in range(6):
    y=-20.4-j*5.2
    # Rotate an X/Z arch so its opening follows the length of the bridge.
    arch(0,y-2.6,.35,4.25,5.05,4.5,stone[3],pi/2,thickness=.47,steps=16)
    box((0,y,2.6),(4.6,.95,5.7),stone[1])
    box((0,y-2.6,5.8),(4.75,5.22,.9),stone[3])
    for side in [-1,1]:
        box((side*2.24,y-2.6,6.55),(.38,5.22,.7),stone[4])
        box((side*2.24,y-2.6,6.96),(.5,5.22,.18),trim)
        box((side*2.28,y,6.8),(.6,.6,1.1),trim)
        # Cutwaters project out of the ocean at each pier.
        tube(side*2.35,y,0,1,2.1,stone[1],4,r2=.52)
    for i in range(5):
        box((0,y-i*1.04,6.27),(4.1,1.01,.05),random.choice(stone))
box((0,-19,6.06),(4.3,4,.4),wood)
for x in [-2,2]:rod((x,-18.5,9.0),(x,-20.4,6.4),.065,iron)

# COURTYARDS: paving, terraces, gardens and a stair to the keep.
group='06 • COURTYARDS / paving & stairs'
vs=[(x,y,5.88) for x,y in points];put(soil,vs,[tuple(range(len(vs)))])
# Distinct cobbled circulation routes.
for x in range(-3,4):
    for j in range(28):
        box((x*.66+(.3 if j%2 else 0),-14+j*.61,5.94),(.62,.57,.075),stone[(j+x)%6])
box((-4,5.5,6.42),(16.2,14.2,1.0),stone[2])
box((-4,5.5,6.94),(16.55,14.5,.16),trim)
for j in range(6):box((-3,-4.9+j*.48,5.95+j*.17),(5.4,.51,.17*(j+1)),stone[3])

# GRAND KEEP: layered Romanesque/Gothic massing, galleries and corner turrets.
group='07 • GRAND KEEP / ashlar & buttresses'
box((-4,5.8,14.45),(12,10.5,15),stone[2])
for j in range(28):
    z=7.22+j*.52
    for i in range(12):
        x=-9.7+i*.98+(j%2)*.24
        for y in [.536,11.064]:box((x,y,z),(.947,.025,.49),stone[(i+j*3)%6])
    for i in range(10):
        y=.94+i*.99+(j%2)*.22
        for x in [-10.014,2.014]:box((x,y,z),(.025,.957,.49),stone[(i+j*3)%6])
for z in [7.4,10.6,15.5,20.9,21.9]:box((-4,5.8,z),(12.45,10.9,.24),trim)
# Quoin stacks, evenly bonded corners.
for x in [-10,2]:
    for y in [.55,11.05]:
        for j in range(26):box((x,y,7.25+j*.55),(.7 if j%2 else 1.1,.95 if j%2 else .7,.5),trim)
for x in [-8,-4,0]:
    for y,angle in [(.48,0),(11.12,pi)]:
        for z in [8.1,12,16.7]:window(x,y,z,1.05,2.65,angle,lit=z<16)
        # Twin lancets beneath the upper gallery.
        window(x-.43,y,19.55,.48,1.48,angle);window(x+.43,y,19.55,.48,1.48,angle)
for x,ang in [(-10.08,-pi/2),(2.08,pi/2)]:
    for y in [2.3,5.8,9.3]:
        for z in [8.1,12,16.7]:window(x,y,z,1,2.6,ang,lit=z<13)
# Buttresses taper in steps, resting on the keep terrace.
for x in [-9.3,-6.2,-1.8,1.3]:
    for y in [-.05,11.65]:
        for j in range(3):
            box((x,y,8.7+j*3.3),(.65,1.35-j*.22,3.4),stone[4])
            box((x,y,10.4+j*3.3),(.81,1.5-j*.22,.22),trim)
arch(-4,.25,7.03,2.1,3.1,.12,wood)
arch(-4,.18,7.02,2.2,3.18,.38,trim,thickness=.28)
for x in [-4.75,-4.5,-4.25,-4,-3.75,-3.5,-3.25]:box((x,.1,8.1),(.025,.035,2.15),iron)
box((-4,-.02,8.1),(2,.06,.16),iron)

# Mansard-like steep hipped copper roof, tiled in courses.
def hiproof(cx,cy,z,wx,wy,h):
    steps=int(h/.4)
    for i in range(steps):
        f=i/steps;g=(i+1)/steps
        ax=wx/2*(1-f)+.12;ay=wy/2*(1-f)+.12
        bx=wx/2*(1-g);by=wy/2*(1-g)
        vs=[(cx+sx*ax,cy+sy*ay,z+f*h) for sx,sy in [(-1,-1),(1,-1),(1,1),(-1,1)]]+[(cx+sx*bx,cy+sy*by,z+g*h) for sx,sy in [(-1,-1),(1,-1),(1,1),(-1,1)]]
        put(roofm[i%5],vs,[(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)])
    for sx,sy in [(-1,-1),(1,-1),(1,1),(-1,1)]:rod((cx+sx*wx/2,cy+sy*wy/2,z),(cx,cy,z+h),.055,gold)

group='07 • GRAND KEEP / copper crown'
box((-4,5.8,22.18),(12.9,11.3,.35),trim)
hiproof(-4,5.8,22.35,13.3,11.8,7.3)
for x in [-7,-4,-1]:
    box((x,1.0,23.5),(1.15,1.35,1.4),stone[4])
    window(x,.28,23.0,.6,1.15,lit=False)
    hiproof(x,1.0,24.2,1.6,1.7,1.05)
for x,y in [(-10,.55),(2,.55),(-10,11.05),(2,11.05)]:
    tower('08 • KEEP TURRETS / %.0f %.0f'%(x,y),x,y,1.03,18.6,5.4)
group='08 • KEEP / lantern & standard'
tube(-4,5.8,28.7,.83,2.1,trim,8)
for i in range(8):
    a=i*pi/4;window(-4+.84*sin(a),5.8-.84*cos(a),29.05,.28,1.1,a,True)
coneroof(-4,5.8,30.6,1.18,2.4);flag(-4,5.8,33.85,2.8)

# EAST CHAPEL: nave, apse, flying buttresses, rose window and bell spire.
group='09 • TIDE CHAPEL / nave'
box((10,5,10.15),(5.5,11,8.5),stone[3])
box((10,5,6.24),(6.15,11.55,.6),trim)
for z in [9,13.95]:box((10,5,z),(5.8,11.4,.22),trim)
# Gabled end masonry.
vs=[(7.25,-.5,14.4),(12.75,-.5,14.4),(10,-.5,18),(7.25,10.5,14.4),(12.75,10.5,14.4),(10,10.5,18)]
put(stone[3],vs,[(0,1,2),(3,5,4),(0,3,4,1),(1,4,5,2),(2,5,3,0)])
for i in range(11):
    f=i/11;g=(i+1)/11
    for side in [-1,1]:
        xa=10+side*3.1*(1-f);xb=10+side*3.1*(1-g)
        put(roofm[i%5],[(xa,-.9,14.3+f*3.85),(xa,10.9,14.3+f*3.85),(xb,10.9,14.3+g*3.85),(xb,-.9,14.3+g*3.85)],[(0,1,2,3)])
rod((10,-1,18.2),(10,10.95,18.2),.075,gold)
for y in [1.5,4.5,7.5,9.6]:
    for x,ang in [(7.19,-pi/2),(12.81,pi/2)]:window(x,y,10,.72,3.0,ang,True)
    for side in [-1,1]:
        x=10+side*3.7
        box((x,y,8.55),(.62,.72,5.35),stone[3]);box((x,y,11.25),(.84,.94,.25),trim)
        rod((x,y,10.7),(10+side*2.5,y,13.25),.24,trim,4)
        tube(x,y,11.35,.32,1.6,roofm[2],4,r2=0)
# Rose tracery in vertical front facade, each spoke hand modelled.
arch(10,-.62,6,1.65,3.5,.1,wood)
arch(10,-.73,6,1.68,3.52,.25,trim,thickness=.2)
def circle_vertical(x,y,z,r,material,thick=.07):
    for i in range(48):
        a=i*2*pi/48;b=(i+1)*2*pi/48
        rod((x+r*cos(a),y,z+r*sin(a)),(x+r*cos(b),y,z+r*sin(b)),thick,material,6)
circle_vertical(10,-.67,12.1,1.12,trim,.14)
put(blueglass,[(10,-.63,12.1)]+[(10+1.04*cos(i*2*pi/48),-.63,12.1+1.04*sin(i*2*pi/48)) for i in range(48)],[(0,i+1,(i+1)%48+1) for i in range(48)])
for i in range(8):
    a=i*pi/4
    rod((10,-.78,12.1),(10+1.06*cos(a),-.78,12.1+1.06*sin(a)),.047,trim)
    circle_vertical(10+.57*cos(a),-.8,12.1+.57*sin(a),.29,trim,.035)
circle_vertical(10,-.81,12.1,.3,gold,.055)
tower('09 • TIDE CHAPEL / bell tower',10,9,1.38,13.8,6.9)
group='09 • TIDE CHAPEL / high spire'
coneroof(10,9,21.4,1.63,6)
rod((10,9,27.3),(10,9,29),.06,gold);rod((9.52,9,28.5),(10.48,9,28.5),.055,gold)

# Residential lower ward: timber framed service buildings under tiled roofs.
def house(name,x,y,w,d,h):
    global group
    group=name
    box((x,y,6+h/2),(w,d,h),stone[4])
    for xx in [x-w/2,x,x+w/2]:box((xx,y-d/2-.045,6+h/2),(.14,.14,h),wood)
    for zz in [6.3,7.8,6+h]:box((x,y-d/2-.08,zz),(w+.15,.15,.17),wood)
    for side in [-1,1]:rod((x,y-d/2-.12,7.8),(x+side*w/2,y-d/2-.12,6+h),.075,wood,4)
    for xx in [x-w*.28,x+w*.28]:window(xx,y-d/2-.14,6.65,.55,1.05,lit=True)
    hiproof(x,y,6+h,w+.75,d+.7,2.4)
    box((x+w*.25,y,8.9+h),(.65,.7,2.4),stone[2]);box((x+w*.25,y,10.15+h),(.85,.9,.25),trim)
house('10 • LOWER WARD / steward house',-11.9,-6.4,5.2,4.1,3.2)
house('10 • LOWER WARD / stables',12,-8.5,5.5,3.8,2.8)
house('10 • LOWER WARD / west barracks',-13,5,4.3,7.5,3.1)

# Courtyard cloister: open colonnade across the north garden.
group='11 • CLOISTER / garden arcade'
for j in range(7):
    x=-8+j*2.4
    box((x,14.1,7.6),(.46,.55,3.35),trim)
    box((x,14.1,9.2),(.75,.78,.28),trim)
    if j<6:arch(x+1.2,14.1,7.15,1.92,2.9,.48,trim,thickness=.18)
box((-.8,14.1,10.34),(15.2,2.8,.22),trim)
hiproof(-.8,14.1,10.48,15.4,3,1.3)

# FOUNTAIN, garden beds, benches, lamps, barrels, supply cart.
group='12 • PROPS / fountain & formal garden'
tube(6,-5.5,5.98,1.55,.26,trim,32);tube(6,-5.5,6.24,1.35,.42,stone[3],32)
torus(6,-5.5,6.63,1.25,.14,trim)
tube(6,-5.5,6.68,1.12,.018,blueglass,40)
tube(6,-5.5,6.68,.22,1.15,trim,16,r2=.17)
tube(6,-5.5,7.7,.66,.22,trim,32,r2=.42);tube(6,-5.5,7.95,.13,.6,gold,12,r2=.02)
for x,y,w,d in [(5,4,1.8,4),(-8,-8,3,1.5),(5,11,1.5,3),(10,-3.3,4,.8)]:
    box((x,y,6.14),(w,d,.4),trim);box((x,y,6.35),(w-.22,d-.22,.09),grass)
for x,y in [(3.7,-4),(8.4,-4),(-7.7,-3)]:
    box((x,y,6.55),(1.8,.55,.15),wood)
    for dx in [-.6,.6]:box((x+dx,y,6.25),(.16,.4,.6),trim)

def tree(x,y,z,s=1):
    rod((x,y,z),(x,y,z+4.2*s),.13*s,wood)
    for i in range(5):
        tube(x+sin(i)*.13*s,y+cos(i)*.12*s,z+(1+i*.65)*s,(.85-i*.1)*s,1.8*s,leaves[i%3],9,r2=.06)
for x,y,s in [(5,4,.95),(5,7,.95),(-9,-8,.8),(-7,-8,.75),(4,11,.85),(5.2,11,.8),(16,2,1.1),(-15,-1,.9),(7,12,.8)]:tree(x,y,6.4,s)

group='12 • PROPS / supply stores'
for x,y in [(-9,-9),(-10,-9),(-10,-10),(14,-5),(14,-6),(13.2,-5.2)]:
    tube(x,y,6,.43,1.02,wood,14,r2=.4)
    for z in [6.1,6.5,6.93]:torus(x,y,z,.425,.032,iron,16,5)
    for i in range(12):
        a=i*pi/6;rod((x+.425*cos(a),y+.425*sin(a),6.09),(x+.41*cos(a),y+.41*sin(a),6.93),.011,iron,4)
for x,y in [(11,-12),(12,-12),(-12,-9.5)]:
    box((x,y,6.46),(.85,.85,.9),wood)
    for z in [6.1,6.81]:box((x,y-.44,z),(.86,.08,.07),iron)
    rod((x-.4,y-.45,6.1),(x+.4,y-.45,6.83),.047,trim,4)
# Four-wheeled handcart.
box((9,-11,6.66),(1.35,2,.18),wood)
for x in [8.27,9.73]:
    box((x,-11,7.03),(.12,2,.65),wood)
    for y in [-11.65,-10.35]:
        circle_vertical(x,y,6.42,.44,iron,.055)
        # wheel is deliberately perpendicular to axle: local ring in YZ
        for i in range(12):
            a=2*pi*i/12;b=2*pi*(i+1)/12
            rod((x,y+.44*cos(a),6.42+.44*sin(a)),(x,y+.44*cos(b),6.42+.44*sin(b)),.055,wood)
            rod((x,y,6.42),(x,y+.43*cos(a),6.42+.43*sin(a)),.026,wood)
for x in [8.5,9.5]:rod((x,-10,6.65),(x,-7.8,6.1),.055,wood)

# Salt-tolerant climbing ivy softens selected masonry, with individually modelled leaves.
group='13 • VEGETATION / climbing ivy'
for x,y,top in [(-8.8,-.2,13.7),(12.89,7.9,11.8),(7.2,-16.9,10.3),(-15.5,-8.7,10.8)]:
    for j in range(3):
        xx=x+(j-1)*.27
        rod((xx,y,6),(xx+.16,y,top),.025,wood,5)
        for k in range(85):
            zz=random.uniform(6,top);spread=.6*(top-zz)/(top-6)+.13
            cx=xx+random.uniform(-spread,spread);cy=y+random.uniform(-.12,.12);r=random.uniform(.06,.16)
            put(random.choice(leaves),[(cx-r,cy,zz),(cx,cy-.07,zz+r*1.5),(cx+r,cy,zz),(cx,cy+.03,zz-r*.6)],[(0,1,2),(0,2,3)])

# Wall mounted beacons and freestanding bridge lanterns.
group='12 • PROPS / brass lanterns'
for x,y,z in [(-2.55,-19,8),(2.55,-19,8),(-2.25,-28,7.2),(2.25,-38.4,7.2),(3,-4,6.1),(8,-3,6.1)]:
    rod((x,y,z),(x,y,z+1.15),.05,iron)
    box((x,y,z+1.36),(.25,.25,.4),glass)
    for dx in [-.16,.16]:
        for dy in [-.16,.16]:rod((x+dx,y+dy,z+1.1),(x+dx,y+dy,z+1.61),.025,iron)
    tube(x,y,z+1.6,.28,.26,iron,4,r2=0)

# SEA: geometric swells plus fine normal detail. Large enough to meet the sky.
sea=mat('Sea • deep jade / wind ripples',(.025,.105,.12),.23,.45)
p=sea.node_tree.nodes.get('Principled BSDF');p.inputs['IOR'].default_value=1.333
ns=sea.node_tree.nodes;lk=sea.node_tree.links
tex=ns.new('ShaderNodeTexNoise');tex.inputs['Scale'].default_value=1.45;tex.inputs['Detail'].default_value=2;tex.inputs['Roughness'].default_value=.65
tc=ns.new('ShaderNodeTexCoord');lk.new(tc.outputs['Object'],tex.inputs['Vector'])
bump=ns.new('ShaderNodeBump');bump.inputs['Strength'].default_value=.32;bump.inputs['Distance'].default_value=.1;lk.new(tex.outputs['Fac'],bump.inputs['Height']);lk.new(bump.outputs[0],p.inputs['Normal'])
group='00 • WORLD / tidal sea'
grid=180; extent=10000;vs=[]
for j in range(grid+1):
    for i in range(grid+1):
        x=(i/grid-.5)*extent;y=(j/grid-.5)*extent
        z=-.45+.065*sin(x*.39+y*.31)+.08*sin(y*.62-x*.21)
        vs.append((x,y,z))
put(sea,vs,[(j*(grid+1)+i,j*(grid+1)+i+1,(j+1)*(grid+1)+i+1,(j+1)*(grid+1)+i) for j in range(grid) for i in range(grid)])
# Sea foam as broken fine rings, never a bright cartoon outline.
foam=mat('Tidal foam',(.36,.47,.43),.65)
group='00 • WORLD / foam at cliff base'
for i in range(140):
    a=random.uniform(0,2*pi);r=random.uniform(1.0,1.15)
    x=27*r*cos(a);y=23*r*sin(a)
    if abs(x)<3 and y<0:continue
    box((x,y,-.27),(.10,random.uniform(.3,1.1),.013),foam,-a)

# Atmospheric islands as low, jagged silhouettes in the far distance.
group='00 • WORLD / distant archipelago'
farrock=mat('Distant cliffs • atmospheric blue',(.15,.23,.26),noise=.25,scale=.4)
for x,y,rr,hh in [(-110,100,35,21),(-55,150,43,27),(25,190,50,28),(145,105,42,24),(-160,10,36,17)]:
    n=45;vs=[];phase=random.random()*6
    for j in range(n+1):
        for i in range(n+1):
            u=(i/n-.5)*2;v=(j/n-.5)*2
            edge=max(0,1-u*u-v*v)
            h=edge**1.65*(.58+.27*sin(u*9+phase)*cos(v*8)+.13*sin(u*21+v*15))
            vs.append((x+rr*u,y+rr*.6*v,-1+hh*h+random.uniform(-.25,.25)*edge))
    fs=[]
    for j in range(n):
        for i in range(n):
            a=j*(n+1)+i;b=a+1;c=a+n+2;d=a+n+1;fs.extend([(a,b,c),(a,c,d)])
    put(farrock,vs,fs)

# Small soaring birds support the human scale without competing with the castle.
group='00 • WORLD / gulls'
birdmat=mat('Gulls • ivory',(.66,.7,.67))
for i in range(11):
    x=random.uniform(-21,19);y=random.uniform(0,20);z=random.uniform(30,39);a=random.random()*pi
    vs=[(x,y-.1,z),(x-.2*cos(a),y-.2*sin(a),z+.16),(x-.9*cos(a),y-.9*sin(a),z+.12),(x-.4*cos(a),y-.4*sin(a),z-.05),(x+.2*cos(a),y+.2*sin(a),z+.16),(x+.9*cos(a),y+.9*sin(a),z+.12),(x+.4*cos(a),y+.4*sin(a),z-.05)]
    put(birdmat,vs,[(0,1,2,3),(0,6,5,4)])

# Commit editable, logically named meshes.
print('Committing',len(parts),'mesh batches',flush=True)
for (name,material_name),(verts,faces) in parts.items():
    me=bpy.data.meshes.new(name+' mesh');me.from_pydata(verts,[],faces);me.update()
    ob=bpy.data.objects.new(name+' | '+material_name,me);coll(name.split(' / ')[0]).objects.link(ob);me.materials.append(bpy.data.materials[material_name])
    if 'tidal sea' in name:
        for p in me.polygons:p.use_smooth=True
    ob['asset_part']=name;ob['units']='metres'
parts.clear()

# Golden hour lighting, cool marine skylight, with very soft long shadows.
world=bpy.data.worlds.new('Marine dusk • sky') if not bpy.data.worlds else bpy.data.worlds[0]
bpy.context.scene.world=world;world.use_nodes=True
ns=world.node_tree.nodes;ns.clear();lk=world.node_tree.links
out=ns.new('ShaderNodeOutputWorld');bg=ns.new('ShaderNodeBackground');bg.inputs['Strength'].default_value=.13
tex=ns.new('ShaderNodeTexSky');tex.sky_type='MULTIPLE_SCATTERING';tex.sun_elevation=math.radians(12);tex.sun_rotation=math.radians(135);tex.sun_disc=False;tex.altitude=.1;tex.air_density=1.2;tex.aerosol_density=1.7
lk.new(tex.outputs[0],bg.inputs[0]);lk.new(bg.outputs[0],out.inputs[0])
def light(name,typ,loc,energy,color,size=1):
    data=bpy.data.lights.new(name,typ);data.energy=energy;data.color=color
    ob=bpy.data.objects.new(name,data);coll('90 • LIGHTING').objects.link(ob);ob.location=loc
    if typ=='AREA':data.shape='DISK';data.size=size
    return ob
sun=light('Sun / late amber', 'SUN',(0,0,60),2.6,(1,.76,.48));sun.rotation_euler=(math.radians(63),math.radians(-24),math.radians(-38));sun.data.angle=.12
fill=light('Sky bounce / sea', 'AREA',(12,-25,32),2100,(.54,.73,1),30);fill.rotation_euler=(Vector((0,0,10))-fill.location).to_track_quat('-Z','Y').to_euler()

scene=bpy.context.scene;scene.unit_settings.system='METRIC';scene.unit_settings.scale_length=1
scene.render.engine='CYCLES';scene.cycles.device='CPU';scene.cycles.samples=24
scene.render.compositor_device='CPU'
scene.cycles.use_denoising=True;scene.cycles.adaptive_threshold=.08
scene.cycles.max_bounces=4;scene.cycles.diffuse_bounces=2;scene.cycles.glossy_bounces=2;scene.cycles.transmission_bounces=2
scene.cycles.use_light_tree=True
scene.render.resolution_x=1600;scene.render.resolution_y=900;scene.render.resolution_percentage=100
scene.render.image_settings.file_format='PNG';scene.render.image_settings.color_mode='RGB';scene.render.image_settings.color_depth='8'
scene.render.fps=24;scene.frame_start=1;scene.frame_end=576
scene.render.film_transparent=False
scene.render.threads_mode='FIXED';scene.render.threads=12
scene.view_settings.view_transform='AgX';scene.view_settings.look='AgX - Medium High Contrast';scene.view_settings.exposure=-.35
# Depth based aerial perspective: distant islands melt naturally into the marine haze.
scene.view_layers[0].use_pass_mist=True
world.mist_settings.start=80;world.mist_settings.depth=200;world.mist_settings.falloff='LINEAR'
comp=bpy.data.node_groups.new('Marine aerial perspective','CompositorNodeTree')
comp.interface.new_socket(name='Image',in_out='OUTPUT',socket_type='NodeSocketColor')
scene.compositing_node_group=comp
rl=comp.nodes.new('CompositorNodeRLayers');mix=comp.nodes.new('ShaderNodeMix');mix.data_type='RGBA';mix.blend_type='MIX'
mix.inputs[7].default_value=(.245,.31,.335,1)
comp.links.new(rl.outputs['Mist'],mix.inputs[0]);comp.links.new(rl.outputs['Image'],mix.inputs[6])
out=comp.nodes.new('NodeGroupOutput');comp.links.new(mix.outputs[2],out.inputs['Image'])

def camera(name,keys,lens):
    data=bpy.data.cameras.new(name);data.lens=lens;data.clip_end=15000
    ob=bpy.data.objects.new(name,data);coll('91 • CAMERAS / three cinematic flights').objects.link(ob)
    for f,pos,target in keys:
        ob.location=pos;ob.rotation_euler=(Vector(target)-ob.location).to_track_quat('-Z','Y').to_euler()
        ob.keyframe_insert(data_path='location',frame=f);ob.keyframe_insert(data_path='rotation_euler',frame=f)
    if ob.animation_data:
        # Standard auto-clamped handles create calm, continuous movement.
        try:
            for fc in ob.animation_data.action.fcurves:
                for kp in fc.keyframe_points:kp.handle_left_type='AUTO_CLAMPED';kp.handle_right_type='AUTO_CLAMPED'
        except AttributeError:pass
    return ob
c1=camera('01 / THE TIDAL CROWN — arrival',[(1,(67,-90,46),(0,-3,14)),(100,(61,-78,42),(0,-2,15)),(240,(52,-67,36),(0,0,16))],37)
c2=camera('02 / THE GATE — bridge approach',[(241,(16,-47,19),(0,-7,16)),(325,(12,-42,18),(0,-5,17)),(408,(8,-36,17),(0,-3,18))],29)
c2.animation_data_clear()
for f,pos,target in [(241,(15,-49,15),(0,-14,11.5)),(325,(11,-43,14),(0,-13,11.9)),(408,(7,-37,13),(0,-12,12.4))]:
    c2.location=pos;c2.rotation_euler=(Vector(target)-c2.location).to_track_quat('-Z','Y').to_euler()
    c2.keyframe_insert(data_path='location',frame=f);c2.keyframe_insert(data_path='rotation_euler',frame=f)
c3=camera('03 / THE INNER WARD — rising orbit',[(409,(51,-7,40),(0,3,17)),(492,(49,12,44),(0,3,17)),(576,(44,29,47),(0,3,16))],27)
for f,c in [(1,c1),(241,c2),(409,c3)]:
    m=scene.timeline_markers.new(c.name,frame=f);m.camera=c
scene.camera=c1;scene.frame_set(110)
# Extra cameras make the model immediately useful as cover art and an RPG map.
hero=camera('STILL / cover portrait',[(1,(46,-64,35),(0,0,14))],46)
plan=camera('MAP / orthographic courtyard plan',[(1,(0,0,95),(0,0,0))],40);plan.data.type='ORTHO';plan.data.ortho_scale=65
scene['title']='KARAKIYI / The Tidal Crown'
scene['description']='An original fortified tidal island. Exterior environment, metric scale, modular collections, procedural PBR materials. Three animated camera shots and two still cameras.'
scene['license']='Original geometry and materials made for this commission. No third-party assets.'
scene['camera_edit']='Frames 1–240 arrival; 241–408 gate; 409–576 inner ward. 24 fps.'
scene['render_note']='CPU-compatible Cycles settings. Set device to GPU Compute when CUDA/OptiX is available.'
# A readable starting view when opening the .blend interactively.
for screen in bpy.data.screens:
    for area in screen.areas:
        if area.type=='VIEW_3D':
            area.spaces.active.region_3d.view_perspective='CAMERA'
            area.spaces.active.overlay.show_overlays=False
            area.spaces.active.shading.type='MATERIAL'
            area.spaces.active.shading.type='SOLID'
            area.spaces.active.shading.light='STUDIO'
            area.spaces.active.shading.color_type='MATERIAL'
scene.render.filepath=os.path.join(ROOT,'renders','frame_')
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(ROOT,'sato.blend'))
print('SAVED',len(bpy.data.objects),'objects',sum(len(m.polygons) for m in bpy.data.meshes),'polygons',flush=True)
if '--preview' in sys.argv:
    scene.render.resolution_x=1100;scene.render.resolution_y=619;scene.cycles.samples=16
    scene.render.filepath=os.path.join(ROOT,'previews','arrival.png');scene.frame_set(110)
    bpy.ops.render.render(write_still=True)
