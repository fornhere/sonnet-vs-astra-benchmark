from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
FONTS={'bold':'/usr/share/fonts/noto/NotoSerifDisplay-BoldItalic.ttf','black':'/usr/share/fonts/noto/NotoSerifDisplay-BlackItalic.ttf','semi':'/usr/share/fonts/noto/NotoSerifDisplay-MediumItalic.ttf'}
def glyph_paths(weight,text,kern=None,scale=None,tracking=0):
    f=TTFont(FONTS[weight]); gs=f.getGlyphSet(); cmap=f.getBestCmap()
    upm=f['head'].unitsPerEm
    x=0; out=[]
    kern=kern or {}
    for i,ch in enumerate(text):
        gn=cmap[ord(ch)]
        pen=SVGPathPen(gs)
        tp=TransformPen(pen,(1,0,0,-1,x,0))  # flip y, baseline at 0
        gs[gn].draw(tp)
        bp=BoundsPen(gs); gs[gn].draw(bp)
        out.append(dict(ch=ch,d=pen.getCommands(),x=x,bounds=bp.bounds,adv=gs[gn].width))
        x+=gs[gn].width+tracking+kern.get(i,0)
    return out,x,upm,f
if __name__=='__main__':
    for w in FONTS:
        o,x,upm,f=glyph_paths(w,'demlık')
        print(w,x,upm,[ (g['ch'],g['bounds']) for g in o])
    print(f['OS/2'].sxHeight,f['OS/2'].sCapHeight)
