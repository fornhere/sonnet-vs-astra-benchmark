import json,re
cues=open("../work/cues.json").read()
css=open("src/style.css").read(); body=open("src/body.html").read(); js=open("src/main.js").read().replace("/*CUES*/",cues)
logo='''<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><symbol id="logo" viewBox="0 0 100 100"><rect x="14" y="7" width="72" height="86" rx="15" fill="none" stroke="currentColor" stroke-width="5.5"/><line x1="30" y1="33" x2="68" y2="33" stroke="#F6A93B" stroke-width="8" stroke-linecap="round"/><line x1="30" y1="52" x2="70" y2="52" stroke="currentColor" stroke-width="6" stroke-linecap="round" opacity=".9"/><line x1="30" y1="70" x2="52" y2="70" stroke="currentColor" stroke-width="6" stroke-linecap="round" opacity=".9"/></symbol></defs></svg>'''
html=f'''<!doctype html>
<html lang="tr"><head><meta charset="UTF-8"/><meta name="viewport" content="width=1920, height=1080"/>
<title>Hafıza OS — tanıtım</title>
<script src="assets/gsap.min.js"></script>
<style>{css}</style></head>
<body>
<div id="root" data-composition-id="main" data-start="0" data-width="1920" data-height="1080" data-duration="{json.loads(cues)["total"]}">
{logo}
{body}
</div>
<script>
{js}
</script>
</body></html>'''
import re
cj=json.loads(cues)
for i,sc in enumerate(cj["scenes"]):
    d=sc["dur"]+(0.4 if i<len(cj["scenes"])-1 else 0)
    html=re.sub(r'(<section id="s-%s" class="clip scn" )data-start="[\d.]+" data-duration="[\d.]+"'%sc["id"], r'\1data-start="%s" data-duration="%s"'%(sc["start"],round(d,3)), html)
open("index.html","w").write(html)
print(len(html))
