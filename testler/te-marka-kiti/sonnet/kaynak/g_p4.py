from g_core import *
from mock1 import *
from mock2 import *
BLUR='<defs><filter id="blur6" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="6"/></filter><filter id="blur8" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="8"/></filter><filter id="blur3"><feGaussianBlur stdDeviation="3"/></filter></defs>'
def cap(items,left=64,top=630,width=995):
    cols=''.join(f'<div style="flex:1"><div class="lab" style="color:var(--kirmizi)">{a}</div><div class="small" style="margin-top:5px;font-size:11.2px;opacity:.95">{b}</div></div>' for a,b in items)
    return f'<div class="abs" style="left:{left}px;top:{top}px;width:{width}px;display:flex;gap:34px">{cols}</div>'
def wood(y,h=234,c1='#CFAE80',c2='#B98F5E'):
    lines=''.join(f'<rect x="0" y="{y+18+k*29}" width="1123" height="1.4" fill="#000" opacity=".07"/>' for k in range(int(h/29)))
    return f'<rect y="{y}" width="1123" height="{h}" fill="{c1}"/><rect y="{y}" width="1123" height="10" fill="#fff" opacity=".22"/>{lines}'

def p_bardak():
    wall='<defs><linearGradient id="wall1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#EFE0C6"/><stop offset="1" stop-color="#E2CDAA"/></linearGradient></defs>'
    svg=f'''<svg class="abs" style="inset:0" width="1123" height="794" viewBox="0 0 1123 794">{BLUR}{wall}<rect width="1123" height="794" fill="url(#wall1)"/>{wood(548,246)}
{cup(190,556,1.55,C['kirmizi'],'red')}{cup(420,556,1.55,C['koyu'],'dark')}{cup(650,556,1.55,C['krem'],'cream')}{tea_glass(880,562,3.7)}
</svg>'''
    body=f'''{svg}
<div class="abs" style="left:64px;top:86px"><div class="eyebrow">06 — Uygulamalar · Bardaklar</div>
 <div class="h-l" style="margin-top:12px;font-size:50px">Elde, sıcak, tanıdık.</div></div>
{cap([('Kâğıt bardak · 8 / 12 oz','Kırmızı, koyu ve porselen; çift cidarlı, mat lamine. Ana logo beyaz ya da ters sürümle, ortada. Sıcak tutucu bant: Bardak Sırası deseni.'),('İnce belli bardak','Şeffaf cam, kehribar çay. Altın rengi kenar çizgisi; belde krem tek renk ikon. Set: 6 bardak + 6 tabak, ahşap kutuda.'),('Baskı','Kâğıt bardakta 2 renk (Kırmızı + Krem ya da Koyu). Camda serigrafi: yalnız tek renk ikon. Foto ya da gradyan yok.')],top=660)}'''
    return '06 · Uygulamalar',body,'',True

def p_paket():
    wall='<defs><linearGradient id="wall2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2F231C"/><stop offset="1" stop-color="#3A2A21"/></linearGradient></defs>'
    shelf=f'<rect x="0" y="0" width="1123" height="794" fill="url(#wall2)"/><rect x="0" y="550" width="1123" height="22" fill="#B98F5E"/><rect x="0" y="550" width="1123" height="6" fill="#fff" opacity=".22"/><rect x="0" y="572" width="1123" height="222" fill="#241812"/><rect x="0" y="572" width="1123" height="12" fill="#000" opacity=".3"/>'
    # tea bag sachets on the shelf (front)
    sach=''
    def sachet(cx,by,w,h,col,fg,scene,rot):
        sc=scene(200,200).replace('width="200" height="200"',f'preserveAspectRatio="xMidYMid slice" x="{cx-w*.36:.1f}" y="{by-h+14:.1f}" width="{w*.72:.1f}" height="{h*.42:.1f}"',1)
        return f'''<g transform="rotate({rot} {cx} {by})"><rect x="{cx-w/2+4}" y="{by-h+4}" width="{w}" height="{h}" rx="3" fill="#000" opacity=".3" filter="url(#blur3)"/><rect x="{cx-w/2}" y="{by-h}" width="{w}" height="{h}" rx="3" fill="{col}"/>{sc}<path d="M{cx-w/2} {by-h+1} l{w} 0" stroke="#000" stroke-opacity=".18"/><text x="{cx}" y="{by-h*.32:.1f}" text-anchor="middle" font-family="Noto Serif Display" font-style="italic" font-weight="900" font-size="{w*.15:.1f}" fill="{fg}">{'demlik'}</text><text x="{cx}" y="{by-h*.14:.1f}" text-anchor="middle" font-family="Noto Sans" font-weight="700" letter-spacing="1" font-size="{w*.06:.1f}" fill="{fg}">POŞET ÇAY · 12 ADET</text></g>'''
    tins=(tin(190,550,165,268,C['yesil'],C['krem'],scene_karadeniz,('Karadeniz','Sabahı'),'ÖZEL HARMAN ÇAY · 100 G','',C['sis'])+
          tin(380,550,165,268,C['mur'],C['krem'],scene_aksam,('Kadıköy','Akşamı'),'ÖZEL HARMAN ÇAY · 100 G','',C['coral'])+
          tin(570,550,165,268,C['bergamot'],C['koyu'],scene_bergamot,('Adaçaylı','Bergamot'),'ÖZEL HARMAN ÇAY · 100 G','',C['bergtint']))
    pch=pouch(785,550,165,262,('Kadıköy','Akşamı'),scene_aksam)
    sach_svg=sachet(930,550,92,116,C['yesil'],C['krem'],scene_karadeniz,-4)+sachet(1018,556,92,116,C['bergamot'],C['koyu'],scene_bergamot,5)
    svg=f'<svg class="abs" style="inset:0" width="1123" height="794" viewBox="0 0 1123 794">{BLUR}{wall}{shelf}{tins}{pch}{sach_svg}</svg>'
    body=f'''{svg}
<div class="abs" style="left:64px;top:86px;color:var(--krem)"><div class="eyebrow" style="color:var(--amber)">06 — Uygulamalar · Paketler</div>
 <div class="h-l" style="margin-top:12px;font-size:50px">Üç harman, üç manzara.</div></div>
<div style="color:var(--krem)">{cap([('Teneke kutu · 100 g','Harman rengi + kemerli pencerede harman manzarası. Ad iki satır, Black Italic. Kapak: koyu bant, ikon.'),('Kraft poşet · 250 g','Kraft kâğıt, krem etiket; etiket üzerinde manzara + ad + gramaj. Alt yüz: rozet.'),('Poşet çay zarfı','12 adetlik zarf; harman rengi zemin, üstte manzara. Aynı sistem, farklı ölçü.')],top=650)}</div>'''
    return '06 · Uygulamalar',body,'dark',True

def p_tabela():
    svg=f'<div class="abs" style="left:0;top:0">{storefront(1123,670)}</div>'
    tiles=[('Fascia tabelası','Koyu Demlik panel, ince kehribar çerçeve, ters yatay logo. Üstte iki boyunlu lamba; gece de okunur. Logo panel genişliğinin ≤ %60\'ı.'),
           ('Askılı tabela · Ø 90 cm','Rozet, Çay Kırmızısı; demir dirsek, mat siyah. Yaya yönünden görünsün diye cepheye dik asılır.'),
           ('Cam giydirme','Krem vinil: “Çay acele sevmez.” + saat bilgisi. Camın alt üçte biri; ürünlerin önünü kapatmaz.')]
    cols=''.join(f'<div style="flex:1"><div class="lab" style="color:var(--kirmizi)">{a}</div><div class="small" style="margin-top:5px;font-size:11.2px;opacity:.95">{b}</div></div>' for a,b in tiles)
    body=f'''{svg}
<div class="abs" style="left:64px;top:86px"><div class="eyebrow" style="color:var(--amber)">06 — Uygulamalar · Tabela ve cephe</div>
 <div class="h-l" style="margin-top:12px;font-size:50px;color:var(--krem)">Sokaktan bile okunur.</div></div>
<div class="abs" style="left:0;right:0;top:670px;bottom:0;background:var(--krem)"></div>
<div class="abs" style="left:64px;top:690px;width:995px;display:flex;gap:34px;color:var(--koyu)">{cols}</div>'''
    return '06 · Uygulamalar',body,'dark',True

PAGES=[p_bardak,p_paket,p_tabela]
