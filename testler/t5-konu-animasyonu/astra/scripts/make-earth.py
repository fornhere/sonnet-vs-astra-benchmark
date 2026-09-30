import json
x=json.load(open('gps-film/assets/world.json')); rings=[]
for f in x['features']:
 g=f['geometry']; polys=g['coordinates'] if g['type']=='MultiPolygon' else [g['coordinates']]
 for p in polys:
  a=p[0]
  if len(a)>7: rings.append(a)
open('gps-film/assets/land.js','w').write('window.LAND='+json.dumps(rings,separators=(',',':'))+';')
