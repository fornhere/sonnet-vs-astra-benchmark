# Last lighting and atmosphere pass, entirely shader based.
# Keep physical sky lighting; add a photographic dawn gradient to camera / sea reflection.
n=world.node_tree.nodes;l=world.node_tree.links
oldout=out
co=n.new('ShaderNodeTexCoord');sep=n.new('ShaderNodeSeparateXYZ');l.new(co.outputs['Normal'],sep.inputs[0]);ab=n.new('ShaderNodeMath');ab.operation='ABSOLUTE';l.new(sep.outputs['Z'],ab.inputs[0])
r=n.new('ShaderNodeValToRGB');r.color_ramp.elements.remove(r.color_ramp.elements[1]);e=r.color_ramp.elements[0];e.position=0;e.color=(.62,.36,.235,1)
for pos,col in [(.14,(.38,.36,.37,1)),(.4,(.14,.22,.31,1)),(1,(.055,.115,.22,1))]:e=r.color_ramp.elements.new(pos);e.color=col
l.new(ab.outputs[0],r.inputs[0]);custom=n.new('ShaderNodeBackground');custom.inputs['Strength'].default_value=.7;l.new(r.outputs[0],custom.inputs['Color'])
path=n.new('ShaderNodeLightPath');mx=n.new('ShaderNodeMath');mx.operation='MAXIMUM';l.new(path.outputs['Is Camera Ray'],mx.inputs[0]);l.new(path.outputs['Is Glossy Ray'],mx.inputs[1]);mix=n.new('ShaderNodeMixShader');l.new(mx.outputs[0],mix.inputs[0]);l.new(bg.outputs[0],mix.inputs[1]);l.new(custom.outputs[0],mix.inputs[2]);l.new(mix.outputs[0],oldout.inputs[0])
# No box-shaped distant haze boundary: one coherent atmosphere.
o=bpy.data.objects.get('Veil over the distant hills')
if o:bpy.data.objects.remove(o,do_unlink=True)
haze.node_tree.nodes.get('Principled Volume').inputs['Density'].default_value=.00048
# Continuous wind-shaped volume columns avoid a stack of obvious spheres.
for o in list(bpy.data.objects):
 if o.name.startswith('Smoke plume'):bpy.data.objects.remove(o,do_unlink=True)
active=COL['08 • Şafak ve duman']
for k,(x,y,h) in enumerate([(-490,-280,85),(-790,-180,108),(-1030,-80,68)]):
 z=landheight(x,y);vv=[];ff=[];N=15;M=18
 for j in range(N+1):
  t=j/N;cx=x-68*t*t;cy=y+15*t;rr=(3+20*t)*(1-.5*max(0,(t-.8)/.2));zz=z+t*h
  for i in range(M):
   a=i*2*pi/M;rad=rr*(1+.19*sin(i*3+j*2)+.12*sin(i*5-j));vv.append((cx+rad*cos(a),cy+rad*.64*sin(a),zz+sin(a*3+j)*2*t))
 for j in range(N):
  for i in range(M):ff.append((j*M+i,j*M+(i+1)%M,(j+1)*M+(i+1)%M,(j+1)*M+i))
 ff.append(tuple(range(M-1,-1,-1)));ff.append(tuple(N*M+i for i in range(M)))
 mesh('Wind-bent smoke • continuous %d'%k,vv,ff,sm,True)
