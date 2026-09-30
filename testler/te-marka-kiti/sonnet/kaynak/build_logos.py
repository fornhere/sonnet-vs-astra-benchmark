import os,glob
from assets import *
out='../logo'
os.makedirs(out,exist_ok=True)
for f in glob.glob(out+'/*.svg'): os.remove(f)
SCH=['renkli','ters','siyah','beyaz','kahve']
DESC={'ana':'Demlik ana logo — ikon, kelime logosu ve tanıtıcı satır üst üste',
 'ana-slogan':'Demlik ana logo, sloganlı: Çay acele sevmez.',
 'yatay':'Demlik yatay logo',
 'ikon':'Demlik ikonu: çift katlı çaydanlık ve ince belli bardak',
 'kelime':'Demlik kelime logosu',
 'rozet':'Demlik yuvarlak rozet: profil, damga, uygulama ikonu',
 'bardak':'Demlik bardak işareti: 16–32 px favicon ve küçük boyutlar'}
files=[]
for sch in SCH:
    sc=scheme(sch)
    for nm in ('ana','ana-slogan','yatay','ikon','kelime','rozet','bardak'):
        if nm=='ana': inner,bb=L_ana(sc)
        elif nm=='ana-slogan': inner,bb=L_ana(sc,slogan=True)
        elif nm=='rozet': inner,bb=L_rozet(sc,sch)
        elif nm=='bardak': inner,bb=L_bardak(sc,sch)
        else: inner,bb=BUILD[nm](sc)
        pad=0 if nm in('rozet','bardak') else 8
        fn=f'demlik-{nm}-{sch}.svg'
        open(f'{out}/{fn}','w').write(svg_doc(inner,bb,pad=pad,title='Demlik — '+nm+' ('+sch+')',desc=DESC[nm]))
        files.append(fn)
print(len(files))
