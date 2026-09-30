import sys,importlib,re
sys.path.insert(0,'.')
import g_core
from g_core import *
mods=[importlib.import_module(m) for m in ('g_p1','g_p2')]
import g_p1,g_p2
try:
    import g_p3; mods.append(g_p3)
except ImportError: pass
try:
    import g_p4; mods.append(g_p4)
except ImportError: pass
try:
    import g_p5; mods.append(g_p5)
except ImportError: pass
ORDER=[]
import g_p1,g_p2
if True:
    ORDER=[g_p1.p_cover,g_p1.p_toc,g_p1.p_story,g_p1.p_platform,g_p1.p_idea,g_p1.p_ana,g_p1.p_wordmark,g_p1.p_family,g_p1.p_grounds,g_p2.p_mono,g_p2.p_clear,g_p2.p_donts]
    for m in mods:
        if hasattr(m,'PAGES'): ORDER+=m.PAGES
def main():
    defs=sym_defs()
    pages=[]
    total=len(ORDER)
    for i,fn in enumerate(ORDER,1):
        sec,body,cls,rh=fn()
        pages.append(page(i,total,sec or '',body,cls,rh=rh))
    doc=f'''<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Demlik — Marka Kimliği Kılavuzu</title><style>{fonts.css()}
{CSS}</style></head><body>{defs}<div class="wrap" id="wrap"><div class="stage" id="stage">{''.join(pages)}</div></div>
<script>(function(){{var w=document.getElementById('wrap'),s=document.getElementById('stage');function f(){{if(matchMedia('print').matches)return;var k=Math.min(1,(innerWidth-24)/1123);s.style.transform='scale('+k+')';w.style.width=(1123*k)+'px';w.style.height=(s.offsetHeight*k)+'px';}}f();addEventListener('resize',f);addEventListener('beforeprint',function(){{s.style.transform='none';w.style.width='auto';w.style.height='auto'}});addEventListener('afterprint',f);}})();</script></body></html>'''
    open('../kilavuz.html','w').write(doc)
    print('pages',total,len(doc)//1024,'KB')
main()
