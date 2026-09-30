import json,glob,os,re
here=os.path.dirname(os.path.abspath(__file__))
R=lambda p:open(os.path.join(here,p),encoding="utf-8").read()
cues=json.load(open(os.path.join(here,"cues.json")))
order="ABCDEFGH"
css=R("base.css")+"\n"+"\n".join(R(f"s{k}.css") for k in order if os.path.exists(os.path.join(here,f"s{k}.css")))
html="\n".join(R(f"s{k}.html") for k in order if os.path.exists(os.path.join(here,f"s{k}.html")))
js="const CUES="+json.dumps(cues)+";\n"+R("j00-core.js")+"\n"+"\n".join(R(f"j{k}.js") for k in order if os.path.exists(os.path.join(here,f"j{k}.js")))+"\n"+R("j99-final.js")
page=R("shell.html").replace("/*CSS*/",css).replace("<!--SCENES-->",html).replace("/*JS*/",js)
open(os.path.join(here,"..","index.html"),"w",encoding="utf-8").write(page)
print("built",len(page))
