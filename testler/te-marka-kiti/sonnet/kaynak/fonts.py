import base64,io,os
from fontTools import subset
from fontTools.ttLib import TTFont
U=list(range(0x20,0x7F))+list(range(0xA0,0x100))+[0x11E,0x11F,0x130,0x131,0x15E,0x15F,0x2013,0x2014,0x2018,0x2019,0x201C,0x201D,0x2022,0x2026,0x2190,0x2191,0x2192,0x2193,0x20BA,0x2212,0x2032,0x2033,0x2715,0x2713,0x25CF,0x2197,0x2260,0x2248,0x2264,0x2265]
D='/usr/share/fonts/noto/'
SPEC=[
 ('Noto Serif Display',400,'normal','NotoSerifDisplay-Regular.ttf'),
 ('Noto Serif Display',500,'normal','NotoSerifDisplay-Medium.ttf'),
 ('Noto Serif Display',700,'normal','NotoSerifDisplay-Bold.ttf'),
 ('Noto Serif Display',400,'italic','NotoSerifDisplay-Italic.ttf'),
 ('Noto Serif Display',500,'italic','NotoSerifDisplay-MediumItalic.ttf'),
 ('Noto Serif Display',700,'italic','NotoSerifDisplay-BoldItalic.ttf'),
 ('Noto Serif Display',900,'italic','NotoSerifDisplay-BlackItalic.ttf'),
 ('Noto Serif Display',900,'normal','NotoSerifDisplay-Black.ttf'),
 ('Noto Sans',300,'normal','NotoSans-Light.ttf'),
 ('Noto Sans',400,'normal','NotoSans-Regular.ttf'),
 ('Noto Sans',500,'normal','NotoSans-Medium.ttf'),
 ('Noto Sans',700,'normal','NotoSans-Bold.ttf'),
 ('Noto Sans',400,'italic','NotoSans-Italic.ttf'),
]
def css():
    out=[]
    for fam,w,st,fn in SPEC:
        opts=subset.Options(); opts.flavor='woff2'; opts.layout_features=['kern','liga','tnum','lnum','calt','locl','ccmp','mark','mkmk']
        opts.notdef_outline=True
        f=TTFont(D+fn); s=subset.Subsetter(opts); s.populate(unicodes=U); s.subset(f)
        b=io.BytesIO(); f.flavor='woff2'; f.save(b)
        out.append(f"@font-face{{font-family:'{fam}';font-weight:{w};font-style:{st};src:url(data:font/woff2;base64,{base64.b64encode(b.getvalue()).decode()}) format('woff2');}}")
    return '\n'.join(out)
if __name__=='__main__':
    c=css(); print(len(c)//1024,'KB')
