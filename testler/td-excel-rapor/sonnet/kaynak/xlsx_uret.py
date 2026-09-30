"""panel.xlsx üretici — formüllü, tablo tabanlı, grafikli panel. Önbellek değerleri Python'da hesaplanır (LibreOffice ile doğrulanır)."""
import json
import datetime as dt
import numpy as np
import pandas as pd
import xlsxwriter
from xlsxwriter.utility import xl_rowcol_to_cell as rc, xl_col_to_name as cn
from analiz import yukle, AYLAR, KANALLAR, URUNLER

YIL = 2025
M = json.load(open('metrics.json', encoding='utf-8'))
ham, gid = yukle()
N = len(ham)

# ------------------------------------------------------------- önbellek modeli (formüllerle aynı mantık)
d = ham.copy().reset_index(drop=True)
d['ay'] = d.tarih.dt.to_period('M').dt.to_timestamp()
d['yil'] = d.tarih.dt.year
lower = {k.lower(): k for k in KANALLAR}
d['kt'] = d.kanal.str.strip().str.lower().map(lower).fillna('TANIMSIZ')
d['sira'] = np.arange(1, N + 1)
first_pos = d.groupby('no').sira.transform('min')
d['tekrar'] = (first_pos < d.sira).astype(int)
d['gec'] = 1 - d.tekrar
d['iadeadet'] = ((d.gec == 1) & (d.iade == 'Evet')).astype(int)
d['net'] = np.where((d.tekrar == 1) | (d.iade == 'Evet'), 0.0, d.tutar)
d['kargog'] = d.gec * d.kargo
d['liste'] = d.gec * d.adet * d.fiyat
d['indtl'] = d.gec * (d.adet * d.fiyat - d.tutar)
d['iadetutar'] = d.iadeadet * d.tutar
d['adetg'] = d.gec * d.adet
d['tutarg'] = d.gec * d.tutar
d['indirimli'] = ((d.gec == 1) & (d.ind > 0)).astype(int)
# Giderler
gid = gid.copy()
gid['ay'] = pd.to_datetime(gid.ay + '-01')
gid['diger'] = 0
gid['toplam'] = gid.kira + gid.personel + gid.pazarlama + gid.hammadde + gid.diger

KOMISYON = {k: 0.0 for k in KANALLAR}
KAN_SLOT = 6
URUN_SLOT = 8
KAT_SLOT = 4
KATLAR = ['Çay', 'Ekipman', 'Deneyim']
URUN_KAT = {u: d[d.urun == u].kat.iloc[0] for u in URUNLER}

y = d[d.yil == YIL]
months = [pd.Timestamp(YIL, m, 1) for m in range(1, 13)]


def ssum(df, col): return float(df[col].sum())


# ------------------------------------------------------------- çalışma kitabı
WB = 'panel.xlsx'
wb = xlsxwriter.Workbook('../' + WB)
wb.set_properties({'title': 'Demlik Satış ve Kâr Paneli', 'subject': 'Yönetim paneli', 'comments': 'Formüllü, kendiliğinden güncellenen panel'})
FONT = 'Calibri'
GREEN, GREEN_L, COPPER, COPPER_L, RED, RED_L, INK, MUTED, LINE, PAPER = '#1F5A45', '#DCE9E1', '#C1662B', '#F6E6D8', '#B23A2E', '#F5DEDA', '#1E2B27', '#66706B', '#E4DED2', '#FAF7F2'
KR = {'Mağaza': '#1F5A45', 'Trendyol': '#E2732C', 'Web sitesi': '#3B6E9E', 'Instagram DM': '#9A4C8B'}
UR = ['#B5651D', '#E3A857', '#2A6B52', '#8DBB9C', '#2F8F9D', '#6E5A7E']


def F(**k):
    base = {'font_name': FONT, 'font_size': 10.5, 'valign': 'vcenter'}
    base.update(k)
    return wb.add_format(base)


f_title = F(bold=True, font_size=20, font_color='#FFFFFF', bg_color=GREEN, valign='vcenter', indent=1)
f_sub = F(font_size=10.5, font_color='#C9D6CE', bg_color=GREEN, indent=1)
f_h = F(bold=True, font_color='#FFFFFF', bg_color=GREEN, align='center', text_wrap=True, border=1, border_color='#FFFFFF')
f_hl = F(bold=True, font_color='#FFFFFF', bg_color=GREEN, align='left', text_wrap=True, border=1, border_color='#FFFFFF')
f_hcalc = F(bold=True, font_color='#FFFFFF', bg_color='#6B756F', align='center', text_wrap=True, border=1, border_color='#FFFFFF')
f_sec = F(bold=True, font_size=13, font_color=GREEN, bottom=2, bottom_color=GREEN)
f_txt = F(); f_txtb = F(bold=True)
f_note = F(font_color=MUTED, italic=True, text_wrap=True, valign='top')
f_int = F(num_format='#,##0'); f_tl = F(num_format='#,##0'); f_tl2 = F(num_format='#,##0.00'); f_pct = F(num_format='0.0%'); f_pct0 = F(num_format='0%')
f_date = F(num_format='dd.mm.yyyy', align='center'); f_month = F(num_format='mmm yyyy', align='left', bold=True)
f_tot_int = F(num_format='#,##0', bold=True, top=1, bg_color='#F0EDE6'); f_tot_pct = F(num_format='0.0%', bold=True, top=1, bg_color='#F0EDE6')
f_tot_txt = F(bold=True, top=1, bg_color='#F0EDE6'); f_tot_month = F(bold=True, top=1, bg_color='#F0EDE6')
f_in = F(font_color='#0000FF', bg_color='#FFF8DC', border=1, border_color='#D9C98B', num_format='0.0%', bold=True)
f_in_txt = F(font_color='#0000FF', bg_color='#FFF8DC', border=1, border_color='#D9C98B', bold=True)
f_in_int = F(font_color='#0000FF', bg_color='#FFF8DC', border=1, border_color='#D9C98B', num_format='#,##0', bold=True)
f_in_year = F(font_color='#0000FF', bg_color='#FFF8DC', border=2, border_color=COPPER, bold=True, align='center', font_size=14, num_format='0')
f_lab = F(bold=True, font_color=MUTED, font_size=9.5)
f_card_l = F(bold=True, font_color=MUTED, font_size=10, bg_color='#FFFFFF', top=2, top_color=GREEN, left=1, right=1, left_color=LINE, right_color=LINE, align='left', indent=1)
f_card_v = lambda nf, col=GREEN: F(bold=True, font_size=22, font_color=col, bg_color='#FFFFFF', left=1, right=1, left_color=LINE, right_color=LINE, align='left', indent=1, num_format=nf)
f_card_s = F(font_size=9, font_color=MUTED, bg_color='#FFFFFF', bottom=1, left=1, right=1, bottom_color=LINE, left_color=LINE, right_color=LINE, align='left', indent=1)
f_al_l = F(bold=True, font_color=INK, bg_color='#FFFFFF', bottom=1, bottom_color=LINE, indent=1)
f_al_v = F(bold=True, font_color=INK, bg_color='#FFFFFF', bottom=1, bottom_color=LINE, align='right', num_format='#,##0')
f_al_vp = F(bold=True, font_color=INK, bg_color='#FFFFFF', bottom=1, bottom_color=LINE, align='right', num_format='0.0%')
f_al_vm = F(bold=True, font_color=INK, bg_color='#FFFFFF', bottom=1, bottom_color=LINE, align='right', num_format='mmm yyyy')
f_al_t = F(font_color=INK, bg_color='#FFFFFF', bottom=1, bottom_color=LINE, indent=1)
f_link = F(font_color='#0563C1', underline=1)

# çalışma sayfaları (sekme sırası)
ws_o = wb.add_worksheet('Özet'); ws_a = wb.add_worksheet('Aylık'); ws_k = wb.add_worksheet('Kanal'); ws_u = wb.add_worksheet('Ürün')
ws_s = wb.add_worksheet('Senaryo'); ws_v = wb.add_worksheet('Veri'); ws_g = wb.add_worksheet('Giderler'); ws_y = wb.add_worksheet('Ayarlar')
ws_c = wb.add_worksheet('Veri Kontrol'); ws_r = wb.add_worksheet('Rehber')
for w_, col in [(ws_o, GREEN), (ws_a, GREEN), (ws_k, GREEN), (ws_u, GREEN), (ws_s, COPPER), (ws_v, '#6B756F'), (ws_g, '#6B756F'), (ws_y, '#6B756F'), (ws_c, RED), (ws_r, '#3B6E9E')]:
    w_.set_tab_color(col)

TS = 'tblSatis'; TG = 'tblGider'

# ============================================================= AYARLAR
ws = ws_y
ws.set_column('A:A', 22); ws.set_column('B:B', 14); ws.set_column('C:D', 3); ws.set_column('E:E', 28); ws.set_column('F:F', 14); ws.set_column('G:G', 3)
ws.set_column('H:H', 16); ws.set_column('I:I', 3); ws.set_column('J:J', 10)
ws.merge_range('A1:J1', 'Ayarlar — listeler ve varsayımlar', f_title); ws.set_row(0, 30)
ws.merge_range('A2:J2', 'Mavi hücreler sizin girdiğiniz değerlerdir. Yeni kanal/ürün eklerken listeye ekleyin; boş satırlar bu iş için ayrıldı.', f_sub)
ws.write('A3', 'Kanallar', f_hl); ws.write('B3', 'Komisyon %', f_h)
for i in range(KAN_SLOT):
    ws.write(3 + i, 0, KANALLAR[i] if i < len(KANALLAR) else '', f_in_txt)
    ws.write(3 + i, 1, 0, f_in)
ws.merge_range(3 + KAN_SLOT, 0, 3 + KAN_SLOT + 2, 1, 'Komisyon: Trendyol/pazaryeri veya ödeme kesintisi oranı. Verideki tutarlarda yok; sözleşmenizdeki oranı yazın, kâr otomatik güncellenir.', f_note)
ws.write('E3', 'Ürünler', f_hl); ws.write('F3', 'Kategori', f_h)
for i in range(URUN_SLOT):
    ws.write(3 + i, 4, URUNLER[i] if i < len(URUNLER) else '', f_in_txt)
    ws.write(3 + i, 5, URUN_KAT[URUNLER[i]] if i < len(URUNLER) else '', f_in_txt)
ws.write('H3', 'Kategoriler', f_hl)
for i in range(KAT_SLOT):
    ws.write(3 + i, 7, KATLAR[i] if i < len(KATLAR) else '', f_in_txt)
ws.write('J3', 'Yıllar', f_hl)
for i in range(6):
    ws.write(3 + i, 9, 2025 + i, f_in_txt)
wb.define_name('Kanallar', f"=Ayarlar!$A$4:$A${3 + KAN_SLOT}")
wb.define_name('Komisyonlar', f"=Ayarlar!$B$4:$B${3 + KAN_SLOT}")
wb.define_name('Urunler', f"=Ayarlar!$E$4:$E${3 + URUN_SLOT}")
wb.define_name('Kategoriler', f"=Ayarlar!$H$4:$H${3 + KAT_SLOT}")
wb.define_name('Yillar', "=Ayarlar!$J$4:$J$9")
wb.define_name('Yil', "='Özet'!$C$4")

# ============================================================= VERİ (tablo)
ws = ws_v
ws.merge_range('A1:Y1', 'Veri — satış kayıtları', f_title); ws.set_row(0, 30)
ws.merge_range('A2:Y2', 'Yeni siparişleri tablonun hemen altındaki boş satıra yapıştırın (yalnız A–K sütunları). Gri başlıklı sütunlar kendiliğinden dolar; tablo otomatik uzar.', f_sub)
HDR = 3  # başlık satırı (0-indeks)
fdate = F(num_format='dd.mm.yyyy'); fpct_c = F(num_format='0%'); ftl2 = F(num_format='#,##0.00'); fint = F(num_format='0'); fmon = F(num_format='mmm yyyy'); ftxt = F()
calc = [
    ('Ay', '=DATE(YEAR({T}[@[Tarih]]),MONTH({T}[@[Tarih]]),1)', fmon, lambda: d.ay),
    ('Yıl', '=YEAR({T}[@[Ay]])', fint, lambda: d.yil),
    ('Kanal Temiz', '=IFERROR(INDEX(Kanallar,MATCH(TRIM({T}[@[Kanal]]),Kanallar,0)),"TANIMSIZ")', ftxt, lambda: d.kt),
    ('Sıra', '=ROW()-ROW({T}[[#Headers],[Sipariş No]])', fint, lambda: d.sira),
    ('Tekrar', '=IF(MATCH({T}[@[Sipariş No]],{T}[Sipariş No],0)<{T}[@[Sıra]],1,0)', fint, lambda: d.tekrar),
    ('Geçerli', '=1-{T}[@[Tekrar]]', fint, lambda: d.gec),
    ('İade Adedi', '=IF(AND({T}[@[Geçerli]]=1,{T}[@[İade]]="Evet"),1,0)', fint, lambda: d.iadeadet),
    ('Net Satış', '=IF(OR({T}[@[Tekrar]]=1,{T}[@[İade]]="Evet"),0,{T}[@[Tutar (TL)]])', ftl2, lambda: d.net),
    ('Kargo Geçerli', '={T}[@[Geçerli]]*{T}[@[Kargo Maliyeti (TL)]]', ftl2, lambda: d.kargog),
    ('Liste Tutarı', '={T}[@[Geçerli]]*{T}[@[Adet]]*{T}[@[Birim Fiyat (TL)]]', ftl2, lambda: d.liste),
    ('İndirim TL', '={T}[@[Geçerli]]*({T}[@[Adet]]*{T}[@[Birim Fiyat (TL)]]-{T}[@[Tutar (TL)]])', ftl2, lambda: d.indtl),
    ('İade Tutarı', '={T}[@[İade Adedi]]*{T}[@[Tutar (TL)]]', ftl2, lambda: d.iadetutar),
    ('Adet Geçerli', '={T}[@[Geçerli]]*{T}[@[Adet]]', fint, lambda: d.adetg),
    ('Tutar Geçerli', '={T}[@[Geçerli]]*{T}[@[Tutar (TL)]]', ftl2, lambda: d.tutarg),
    ('İndirimli', '=IF(AND({T}[@[Geçerli]]=1,{T}[@[İndirim]]>0),1,0)', fint, lambda: d.indirimli),
]
inp = ['Sipariş No', 'Tarih', 'Kanal', 'Ürün', 'Kategori', 'Adet', 'Birim Fiyat (TL)', 'İndirim', 'Tutar (TL)', 'Kargo Maliyeti (TL)', 'İade']
inp_fmt = [F(), fdate, F(), F(), F(), F(num_format='0'), F(num_format='#,##0.00'), fpct_c, ftl2, F(num_format='#,##0.00'), F()]
cols = [{'header': h, 'format': inp_fmt[i], 'header_format': f_h} for i, h in enumerate(inp)]
for name, fm, fmt_, _ in calc:
    cols.append({'header': name, 'formula': fm.format(T=TS), 'format': fmt_, 'header_format': f_hcalc})
data_rows = []
for r_ in d.itertuples(index=False):
    data_rows.append([int(r_.no), r_.tarih.to_pydatetime(), r_.kanal, r_.urun, r_.kat, int(r_.adet), int(r_.fiyat), float(r_.ind), float(r_.tutar), int(r_.kargo), r_.iade])
ws.add_table(HDR, 0, HDR + N, len(cols) - 1, {'name': TS, 'columns': cols, 'data': [row + [None] * len(calc) for row in data_rows], 'style': 'Table Style Light 1', 'autofilter': True})
# önbellek değerleriyle formülleri yeniden yaz
col_idx = {name: len(inp) + i for i, (name, *_ ) in enumerate(calc)}
for name, fm, fmt_, getter in calc:
    ci = col_idx[name]
    ser = getter()
    fx = '=' + fm.format(T=TS).lstrip('=').replace('@', '[#This Row],')
    for i in range(N):
        v = ser.iloc[i]
        if name == 'Ay':
            v = (v.to_pydatetime() - dt.datetime(1899, 12, 30)).days
        elif isinstance(v, (np.integer,)):
            v = int(v)
        elif isinstance(v, (np.floating,)):
            v = float(v)
        ws.write_formula(HDR + 1 + i, ci, fx, fmt_, v)
ws.freeze_panes(HDR + 1, 1)
ws.set_column('A:A', 11); ws.set_column('B:B', 11); ws.set_column('C:C', 13); ws.set_column('D:D', 24); ws.set_column('E:E', 10); ws.set_column('F:F', 7)
ws.set_column('G:G', 12); ws.set_column('H:H', 9); ws.set_column('I:J', 12); ws.set_column('K:K', 7); ws.set_column('L:L', 10); ws.set_column('M:M', 7)
ws.set_column('N:N', 13); ws.set_column('O:Y', 11)
ws.set_row(HDR, 32)
LAST = 20000
ws.data_validation(HDR + 1, 2, LAST, 2, {'validate': 'list', 'source': '=Kanallar', 'error_type': 'warning', 'error_title': 'Tanımsız kanal', 'error_message': 'Bu kanal Ayarlar sayfasındaki listede yok. Yine de girilebilir ama raporlarda "TANIMSIZ" görünür.'})
ws.data_validation(HDR + 1, 3, LAST, 3, {'validate': 'list', 'source': '=Urunler', 'error_type': 'warning', 'error_title': 'Tanımsız ürün', 'error_message': 'Bu ürün Ayarlar sayfasındaki listede yok.'})
ws.data_validation(HDR + 1, 4, LAST, 4, {'validate': 'list', 'source': '=Kategoriler', 'error_type': 'warning'})
ws.data_validation(HDR + 1, 10, LAST, 10, {'validate': 'list', 'source': ['Evet', 'Hayır']})

# ============================================================= GİDERLER (tablo)
ws = ws_g
ws.merge_range('A1:G1', 'Giderler — aylık gider tablosu', f_title); ws.set_row(0, 30)
ws.merge_range('A2:G2', 'Her ay için bir satır ekleyin (Ay = ayın 1\'i, örn. 01.03.2026). "Diğer Gider": komisyon, POS kesintisi, ambalaj, vergi gibi kalemler için.', f_sub)
gcols = [{'header': 'Ay', 'format': F(num_format='mmm yyyy', align='left'), 'header_format': f_h}, {'header': 'Kira', 'format': f_tl, 'header_format': f_h},
         {'header': 'Personel', 'format': f_tl, 'header_format': f_h}, {'header': 'Pazarlama', 'format': f_tl, 'header_format': f_h},
         {'header': 'Hammadde', 'format': f_tl, 'header_format': f_h}, {'header': 'Diğer Gider', 'format': f_tl, 'header_format': f_h},
         {'header': 'Toplam Gider', 'format': F(num_format='#,##0', bold=True), 'header_format': f_hcalc, 'formula': f'=SUM({TG}[@[Kira]:[Diğer Gider]])'}]
gdata = [[r_.ay.to_pydatetime(), int(r_.kira), int(r_.personel), int(r_.pazarlama), int(r_.hammadde), 0, None] for r_ in gid.itertuples(index=False)]
ws.add_table(3, 0, 3 + len(gdata), 6, {'name': TG, 'columns': gcols, 'data': gdata, 'style': 'Table Style Light 1'})
for i, r_ in enumerate(gid.itertuples(index=False)):
    ws.write_formula(4 + i, 6, f'=SUM({TG}[[#This Row],[Kira]:[Diğer Gider]])', F(num_format='#,##0', bold=True), float(r_.toplam))
ws.set_column('A:A', 12); ws.set_column('B:G', 14); ws.set_row(3, 30); ws.freeze_panes(4, 1)

# ============================================================= yardımcı: hücreye formül + önbellek değeri
def wf(ws_, row, col, formula, fmt, value):
    if isinstance(value, (np.integer,)): value = int(value)
    if isinstance(value, (np.floating,)): value = float(value)
    if isinstance(value, pd.Timestamp): value = (value.to_pydatetime() - dt.datetime(1899, 12, 30)).days
    ws_.write_formula(row, col, formula, fmt, value)


# ============================================================= AYLIK
ws = ws_a
ws.hide_gridlines(2)
ws.merge_range('A1:Q1', 'Aylık kâr–zarar tablosu', f_title); ws.set_row(0, 30)
ws.merge_range('A2:Q2', 'Seçili yıl (Özet sayfasından değişir). Tüm hücreler Veri ve Giderler sayfalarından formülle hesaplanır.', f_sub)
heads = ['Ay', 'Sipariş', 'Net satış', 'İade %', 'Ort. sepet', 'Kargo', 'Hammadde', 'Kira', 'Personel', 'Pazarlama', 'Diğer gider', 'Komisyon', 'Toplam maliyet', 'Net kâr', 'Kâr marjı', 'Başabaş net satış', 'Başabaşa fark']
for j, h in enumerate(heads):
    ws.write(3, j, h, f_hl if j == 0 else f_h)
ws.set_row(3, 32)
KR0 = 5  # Kanal matrisi ilk ay satırı (1-indeksli Excel satırı) — aşağıda tanımlı
KOM_ROW = 17
KM0 = 18   # Excel satırı: Kanal!A18 = Ocak
A0 = 5     # Aylık ilk veri satırı (Excel)
aylik_vals = []
for i, mth in enumerate(months):
    r = A0 + i; ri = r - 1
    yy = y[y.ay == mth]; gg = gid[gid.ay == mth]
    B = ssum(yy, 'gec'); C = ssum(yy, 'net'); Dv = ssum(yy, 'iadeadet') / B if B else 0; E = ssum(yy, 'tutarg') / B if B else 0
    Fv = ssum(yy, 'kargog'); Gv = ssum(gg, 'hammadde'); H = ssum(gg, 'kira'); I = ssum(gg, 'personel'); J = ssum(gg, 'pazarlama'); K = ssum(gg, 'diger')
    L = sum(KOMISYON[k] * float(yy[yy.kt == k].net.sum()) for k in KANALLAR)
    Mv = Fv + Gv + H + I + J + K + L; Nv = C - Mv; Ov = Nv / C if C else 0
    P = (H + I + J + K) / (1 - (Fv + Gv + L) / C) if C else None; Q = C - P if C else None
    aylik_vals.append(dict(B=B, C=C, D=Dv, E=E, F=Fv, G=Gv, H=H, I=I, J=J, K=K, L=L, M=Mv, N=Nv, O=Ov, P=P, Q=Q))
    wf(ws, ri, 0, f'=DATE(Yil,{i + 1},1)', f_month, mth)
    wf(ws, ri, 1, f'=SUMIFS({TS}[Geçerli],{TS}[Ay],$A{r})', f_int, B)
    wf(ws, ri, 2, f'=SUMIFS({TS}[Net Satış],{TS}[Ay],$A{r})', f_int, C)
    wf(ws, ri, 3, f'=IF(B{r}=0,0,SUMIFS({TS}[İade Adedi],{TS}[Ay],$A{r})/B{r})', f_pct, Dv)
    wf(ws, ri, 4, f'=IF(B{r}=0,0,SUMIFS({TS}[Tutar Geçerli],{TS}[Ay],$A{r})/B{r})', f_int, E)
    wf(ws, ri, 5, f'=SUMIFS({TS}[Kargo Geçerli],{TS}[Ay],$A{r})', f_int, Fv)
    for c_, nm, v in [(6, 'Hammadde', Gv), (7, 'Kira', H), (8, 'Personel', I), (9, 'Pazarlama', J), (10, 'Diğer Gider', K)]:
        wf(ws, ri, c_, f'=SUMIFS({TG}[{nm}],{TG}[Ay],$A{r})', f_int, v)
    wf(ws, ri, 11, f"=SUMPRODUCT(Kanal!$B{KM0 + i}:$G{KM0 + i},Kanal!$B${KOM_ROW}:$G${KOM_ROW})", f_int, L)
    wf(ws, ri, 12, f'=SUM(F{r}:L{r})', f_int, Mv)
    wf(ws, ri, 13, f'=C{r}-M{r}', F(num_format='#,##0;[Red]-#,##0', bold=True), Nv)
    wf(ws, ri, 14, f'=IF(C{r}=0,0,N{r}/C{r})', f_pct, Ov)
    wf(ws, ri, 15, f'=IF(C{r}=0,NA(),SUM(H{r}:K{r})/(1-(F{r}+G{r}+L{r})/C{r}))', f_int, P if P is not None else '#N/A')
    wf(ws, ri, 16, f'=IF(C{r}=0,NA(),C{r}-P{r})', F(num_format='#,##0;[Red]-#,##0'), Q if Q is not None else '#N/A')
TR = A0 + 12  # toplam satırı (Excel 17)
yv = y
Bt = ssum(yv, 'gec'); Ct = ssum(yv, 'net')
tot = {k: sum(v[k] for v in aylik_vals) for k in 'BCFGHIJKLMN'}
tot['D'] = ssum(yv, 'iadeadet') / Bt if Bt else 0; tot['E'] = ssum(yv, 'tutarg') / Bt if Bt else 0; tot['O'] = tot['N'] / tot['C'] if tot['C'] else 0
nm_ = sum(1 for v in aylik_vals if v['C'] > 0)
tot['P'] = (tot['H'] + tot['I'] + tot['J'] + tot['K']) / max(nm_, 1) / (1 - (tot['F'] + tot['G'] + tot['L']) / tot['C'])
ws.write(TR - 1, 0, 'Yıl toplamı', f_tot_txt)
for c_ in 'BCFGHIJKLMN':
    ci = ord(c_) - 65
    wf(ws, TR - 1, ci, f'=SUM({c_}{A0}:{c_}{A0 + 11})', f_tot_int, tot[c_])
wf(ws, TR - 1, 3, f'=IF(B{TR}=0,0,SUMIFS({TS}[İade Adedi],{TS}[Yıl],Yil)/B{TR})', f_tot_pct, tot['D'])
wf(ws, TR - 1, 4, f'=IF(B{TR}=0,0,SUMIFS({TS}[Tutar Geçerli],{TS}[Yıl],Yil)/B{TR})', f_tot_int, tot['E'])
wf(ws, TR - 1, 14, f'=IF(C{TR}=0,0,N{TR}/C{TR})', f_tot_pct, tot['O'])
wf(ws, TR - 1, 15, f'=IF(C{TR}=0,NA(),SUM(H{TR}:K{TR})/MAX(1,COUNTIF(C{A0}:C{A0 + 11},">0"))/(1-(F{TR}+G{TR}+L{TR})/C{TR}))', f_tot_int, tot['P'])
ws.write(TR - 1, 16, 'aylık ort.', f_tot_txt)
ws.set_column('A:A', 12); ws.set_column('B:B', 9); ws.set_column('C:Q', 12.5)
ws.conditional_format(f'N{A0}:N{A0 + 11}', {'type': 'cell', 'criteria': '<', 'value': 0, 'format': wb.add_format({'bg_color': RED_L, 'font_color': RED})})
ws.conditional_format(f'N{A0}:N{A0 + 11}', {'type': 'cell', 'criteria': '>', 'value': 0, 'format': wb.add_format({'bg_color': GREEN_L, 'font_color': GREEN})})
ws.conditional_format(f'C{A0}:C{A0 + 11}', {'type': 'data_bar', 'bar_color': '#8DBB9C', 'bar_solid': True})
ws.conditional_format(f'P{A0}:Q{A0 + 11}', {'type': 'formula', 'criteria': f'=ISNA(P{A0})', 'format': wb.add_format({'font_color': '#BBBBBB'})})
ws.conditional_format(f'D{A0}:D{A0 + 11}', {'type': '3_color_scale', 'min_color': '#FFFFFF', 'mid_color': '#FBE3C8', 'max_color': '#E08A5A'})
ws.merge_range(TR + 1, 0, TR + 3, 16, 'Başabaş net satış = (kira + personel + pazarlama + diğer gider) ÷ (1 − (kargo + hammadde + komisyon) ÷ net satış). O ay net satış bu tutarın altındaysa ay zarar eder. Net satış = iade edilen siparişler ve tekrar kayıtlar hariç tutar.', f_note)
ws.freeze_panes(4, 1)
# grafikler
ch = wb.add_chart({'type': 'column'})
ch.add_series({'name': 'Net satış', 'categories': f'=Aylık!$A${A0}:$A${A0 + 11}', 'values': f'=Aylık!$C${A0}:$C${A0 + 11}', 'fill': {'color': GREEN}, 'gap': 60})
ln = wb.add_chart({'type': 'line'})
ln.add_series({'name': 'Başabaş', 'categories': f'=Aylık!$A${A0}:$A${A0 + 11}', 'values': f'=Aylık!$P${A0}:$P${A0 + 11}', 'line': {'color': COPPER, 'width': 2.25, 'dash_type': 'dash'}})
ch.combine(ln)
ch.set_title({'name': 'Aylık net satış ve başabaş noktası (TL)', 'name_font': {'size': 12, 'name': FONT}})
ch.set_legend({'position': 'bottom'}); ch.set_y_axis({'num_format': '#,##0', 'major_gridlines': {'visible': True, 'line': {'color': LINE}}}); ch.set_x_axis({'num_format': 'mmm'})
ch.set_size({'width': 640, 'height': 320}); ch.set_chartarea({'border': {'color': LINE}})
ws.insert_chart(f'A{TR + 6}', ch)
ch2 = wb.add_chart({'type': 'column'})
ch2.add_series({'name': 'Net kâr', 'categories': f'=Aylık!$A${A0}:$A${A0 + 11}', 'values': f'=Aylık!$N${A0}:$N${A0 + 11}', 'fill': {'color': GREEN}, 'invert_if_negative': True, 'invert_if_negative_color': RED, 'gap': 60,
                'data_labels': {'value': True, 'num_format': '#,##0,', 'font': {'size': 9}}})
ch2.set_title({'name': 'Aylık net kâr (bin TL)', 'name_font': {'size': 12, 'name': FONT}}); ch2.set_legend({'none': True})
ch2.set_y_axis({'num_format': '#,##0', 'major_gridlines': {'visible': True, 'line': {'color': LINE}}}); ch2.set_x_axis({'num_format': 'mmm', 'label_position': 'low'})
ch2.set_size({'width': 640, 'height': 320}); ch2.set_chartarea({'border': {'color': LINE}})
ws.insert_chart(f'H{TR + 6}', ch2)

# ============================================================= KANAL
ws = ws_k
ws.hide_gridlines(2)
ws.merge_range('A1:N1', 'Kanal analizi', f_title); ws.set_row(0, 30)
ws.merge_range('A2:N2', 'Katkı = net satış − hammadde (yıl oranıyla) − kargo − komisyon. Sabit giderler kanallara dağıtılmaz. Kanal adları Ayarlar sayfasından gelir.', f_sub)
ws.write('A3', 'Hammadde oranı (yıl)', f_lab)
ham_or = tot['G'] / tot['C'] if tot['C'] else 0
wf(ws, 2, 1, f"=IF(Aylık!C{TR}=0,0,Aylık!G{TR}/Aylık!C{TR})", f_pct, ham_or)
ws.merge_range('A4:N4', '1) Yıl özeti — kanal bazında', f_sec)
kh = ['Kanal', 'Sipariş', 'Liste tutarı', 'İndirim TL', 'İndirim %', 'İade %', 'Net satış', 'Pay %', 'Kargo', 'Hammadde (tahsis)', 'Komisyon', 'Katkı', 'Katkı / sipariş', 'Katkı % (liste)']
for j, h in enumerate(kh):
    ws.write(4, j, h, f_hl if j == 0 else f_h)
ws.set_row(4, 32)
K0 = 6  # Excel satırı
kanal_vals = {}
for i in range(KAN_SLOT):
    r = K0 + i; ri = r - 1
    nm = KANALLAR[i] if i < len(KANALLAR) else ''
    yy = y[y.kt == nm] if nm else y.iloc[0:0]
    B = ssum(yy, 'gec'); Cc = ssum(yy, 'liste'); Dd = ssum(yy, 'indtl'); G = ssum(yy, 'net'); I_ = ssum(yy, 'kargog')
    Fr = ssum(yy, 'iadeadet') / B if B else 0
    J = G * ham_or; Kk = G * KOMISYON.get(nm, 0); Lk = G - I_ - J - Kk
    kanal_vals[nm] = dict(B=B, C=Cc, D=Dd, G=G, I=I_, F=Fr, L=Lk)
    e = lambda x: x if nm else ''
    wf(ws, ri, 0, f'=IF(Ayarlar!$A{4 + i}="","",Ayarlar!$A{4 + i})', f_txtb, nm)
    wf(ws, ri, 1, f'=IF($A{r}="","",SUMIFS({TS}[Geçerli],{TS}[Kanal Temiz],$A{r},{TS}[Yıl],Yil))', f_int, e(B))
    wf(ws, ri, 2, f'=IF($A{r}="","",SUMIFS({TS}[Liste Tutarı],{TS}[Kanal Temiz],$A{r},{TS}[Yıl],Yil))', f_int, e(Cc))
    wf(ws, ri, 3, f'=IF($A{r}="","",SUMIFS({TS}[İndirim TL],{TS}[Kanal Temiz],$A{r},{TS}[Yıl],Yil))', f_int, e(Dd))
    wf(ws, ri, 4, f'=IF($A{r}="","",IF(C{r}=0,0,D{r}/C{r}))', f_pct, e(Dd / Cc if Cc else 0))
    wf(ws, ri, 5, f'=IF($A{r}="","",IF(B{r}=0,0,SUMIFS({TS}[İade Adedi],{TS}[Kanal Temiz],$A{r},{TS}[Yıl],Yil)/B{r}))', f_pct, e(Fr))
    wf(ws, ri, 6, f'=IF($A{r}="","",SUMIFS({TS}[Net Satış],{TS}[Kanal Temiz],$A{r},{TS}[Yıl],Yil))', f_int, e(G))
    wf(ws, ri, 7, f'=IF($A{r}="","",IF(G${K0 + KAN_SLOT}=0,0,G{r}/G${K0 + KAN_SLOT}))', f_pct, e(G / tot['C'] if tot['C'] else 0))
    wf(ws, ri, 8, f'=IF($A{r}="","",SUMIFS({TS}[Kargo Geçerli],{TS}[Kanal Temiz],$A{r},{TS}[Yıl],Yil))', f_int, e(I_))
    wf(ws, ri, 9, f'=IF($A{r}="","",G{r}*$B$3)', f_int, e(J))
    wf(ws, ri, 10, f'=IF($A{r}="","",G{r}*Ayarlar!$B{4 + i})', f_int, e(Kk))
    wf(ws, ri, 11, f'=IF($A{r}="","",G{r}-I{r}-J{r}-K{r})', f_int, e(Lk))
    wf(ws, ri, 12, f'=IF($A{r}="","",IF(B{r}=0,0,L{r}/B{r}))', f_int, e(Lk / B if B else 0))
    wf(ws, ri, 13, f'=IF($A{r}="","",IF(C{r}=0,0,L{r}/C{r}))', f_pct, e(Lk / Cc if Cc else 0))
KT = K0 + KAN_SLOT  # toplam satırı Excel
ws.write(KT - 1, 0, 'Toplam', f_tot_txt)
sums = {c: sum(v[c] for v in kanal_vals.values()) for c in 'BCDGIL'}
for c_, nm_c in [('B', 1), ('C', 2), ('D', 3), ('G', 6), ('I', 8), ('L', 11)]:
    wf(ws, KT - 1, nm_c, f'=SUM({c_}{K0}:{c_}{KT - 1})', f_tot_int, sums[c_])
wf(ws, KT - 1, 4, f'=IF(C{KT}=0,0,D{KT}/C{KT})', f_tot_pct, sums['D'] / sums['C'])
wf(ws, KT - 1, 5, f'=IF(B{KT}=0,0,SUMIFS({TS}[İade Adedi],{TS}[Yıl],Yil)/B{KT})', f_tot_pct, tot['D'])
wf(ws, KT - 1, 7, f'=SUM(H{K0}:H{KT - 1})', f_tot_pct, 1.0)
wf(ws, KT - 1, 9, f'=SUM(J{K0}:J{KT - 1})', f_tot_int, sum(kanal_vals[k]['G'] * ham_or for k in kanal_vals if k))
wf(ws, KT - 1, 10, f'=SUM(K{K0}:K{KT - 1})', f_tot_int, 0)
wf(ws, KT - 1, 12, f'=IF(B{KT}=0,0,L{KT}/B{KT})', f_tot_int, sums['L'] / sums['B'])
wf(ws, KT - 1, 13, f'=IF(C{KT}=0,0,L{KT}/C{KT})', f_tot_pct, sums['L'] / sums['C'])
ws.conditional_format(f'F{K0}:F{K0 + KAN_SLOT - 1}', {'type': 'data_bar', 'bar_color': '#E9A76B', 'bar_solid': True})
ws.conditional_format(f'M{K0}:M{K0 + KAN_SLOT - 1}', {'type': 'data_bar', 'bar_color': '#8DBB9C', 'bar_solid': True})
# 2) Ay × Kanal net satış
ws.merge_range('A15:N15', '2) Ay × kanal — net satış (TL)', f_sec)
ws.write(15, 0, 'Ay', f_hl)
for c in range(KAN_SLOT):
    wf(ws, 15, 1 + c, f'=IF($A${K0 + c}="","",$A${K0 + c})', f_h, KANALLAR[c] if c < len(KANALLAR) else '')
ws.write(15, 7, 'Toplam', f_h)
ws.write(KOM_ROW - 1, 0, 'Komisyon %', f_lab)
for c in range(KAN_SLOT):
    wf(ws, KOM_ROW - 1, 1 + c, f'=Ayarlar!$B{4 + c}', f_pct, 0)
mat_net = {}
for i, mth in enumerate(months):
    r = KM0 + i; ri = r - 1
    wf(ws, ri, 0, f'=DATE(Yil,{i + 1},1)', f_month, mth)
    tot_m = 0
    for c in range(KAN_SLOT):
        nm = KANALLAR[c] if c < len(KANALLAR) else ''
        v = float(y[(y.ay == mth) & (y.kt == nm)].net.sum()) if nm else ''
        tot_m += v if nm else 0
        cl = cn(1 + c)
        wf(ws, ri, 1 + c, f'=IF({cl}$16="","",SUMIFS({TS}[Net Satış],{TS}[Kanal Temiz],{cl}$16,{TS}[Ay],$A{r}))', f_int, v)
        mat_net[(i, c)] = v
    wf(ws, ri, 7, f'=SUM(B{r}:G{r})', f_tot_int, tot_m)
ws.write(KM0 + 11, 0, 'Yıl', f_tot_txt)
for c in range(KAN_SLOT):
    cl = cn(1 + c)
    v = sum(mat_net[(i, c)] for i in range(12)) if c < len(KANALLAR) else 0
    wf(ws, KM0 + 11, 1 + c, f'=SUM({cl}{KM0}:{cl}{KM0 + 11})', f_tot_int, v)
wf(ws, KM0 + 11, 7, f'=SUM(H{KM0}:H{KM0 + 11})', f_tot_int, tot['C'])
ws.conditional_format(f'B{KM0}:G{KM0 + 11}', {'type': '2_color_scale', 'min_color': '#FFFFFF', 'max_color': '#7FB596'})
# 3) iade oranı
IM0 = 35
ws.merge_range('A33:N33', '3) Ay × kanal — iade oranı (siparişlerin %)', f_sec)
ws.write(33, 0, 'Ay', f_hl)
for c in range(KAN_SLOT):
    wf(ws, 33, 1 + c, f'=IF($A${K0 + c}="","",$A${K0 + c})', f_h, KANALLAR[c] if c < len(KANALLAR) else '')
ws.write(33, 7, 'Tüm kanallar', f_h)
mat_ret = {}
for i, mth in enumerate(months):
    r = IM0 + i; ri = r - 1
    wf(ws, ri, 0, f'=DATE(Yil,{i + 1},1)', f_month, mth)
    for c in range(KAN_SLOT):
        nm = KANALLAR[c] if c < len(KANALLAR) else ''
        yy = y[(y.ay == mth) & (y.kt == nm)] if nm else y.iloc[0:0]
        n_ = ssum(yy, 'gec'); v = (ssum(yy, 'iadeadet') / n_ if n_ else 0) if nm else ''
        cl = cn(1 + c)
        f_ = (f'=IF({cl}$34="","",IF(SUMIFS({TS}[Geçerli],{TS}[Kanal Temiz],{cl}$34,{TS}[Ay],$A{r})=0,0,'
              f'SUMIFS({TS}[İade Adedi],{TS}[Kanal Temiz],{cl}$34,{TS}[Ay],$A{r})/SUMIFS({TS}[Geçerli],{TS}[Kanal Temiz],{cl}$34,{TS}[Ay],$A{r})))')
        wf(ws, ri, 1 + c, f_, f_pct, v)
        mat_ret[(i, c)] = v
    wf(ws, ri, 7, f'=Aylık!D{A0 + i}', f_tot_pct, aylik_vals[i]['D'])
ws.conditional_format(f'B{IM0}:G{IM0 + 11}', {'type': '3_color_scale', 'min_color': '#FFFFFF', 'mid_color': '#FBE3C8', 'max_color': '#D9583F', 'min_type': 'num', 'min_value': 0, 'mid_type': 'num', 'mid_value': 0.06, 'max_type': 'num', 'max_value': 0.16})
ws.set_column('A:A', 20); ws.set_column('B:N', 12.5)
ws.freeze_panes(5, 1)
# grafikler
cs = wb.add_chart({'type': 'column', 'subtype': 'stacked'})
for c in range(len(KANALLAR)):
    cs.add_series({'name': f'=Kanal!${cn(1 + c)}$16', 'categories': f'=Kanal!$A${KM0}:$A${KM0 + 11}', 'values': f'=Kanal!${cn(1 + c)}${KM0}:${cn(1 + c)}${KM0 + 11}', 'fill': {'color': KR[KANALLAR[c]]}, 'gap': 55})
cs.set_title({'name': 'Aylık net satış — kanal dağılımı (TL)', 'name_font': {'size': 12, 'name': FONT}}); cs.set_legend({'position': 'bottom'})
cs.set_y_axis({'num_format': '#,##0', 'major_gridlines': {'visible': True, 'line': {'color': LINE}}}); cs.set_x_axis({'num_format': 'mmm'}); cs.set_size({'width': 620, 'height': 320}); cs.set_chartarea({'border': {'color': LINE}})
ws.insert_chart('J15', cs)
cl_ = wb.add_chart({'type': 'line'})
for c in range(len(KANALLAR)):
    w_ = 3.5 if KANALLAR[c] == 'Trendyol' else 1.75
    cl_.add_series({'name': f'=Kanal!${cn(1 + c)}$34', 'categories': f'=Kanal!$A${IM0}:$A${IM0 + 11}', 'values': f'=Kanal!${cn(1 + c)}${IM0}:${cn(1 + c)}${IM0 + 11}',
                    'line': {'color': KR[KANALLAR[c]], 'width': w_}, 'marker': {'type': 'circle', 'size': 5, 'fill': {'color': KR[KANALLAR[c]]}, 'border': {'color': KR[KANALLAR[c]]}}})
cl_.set_title({'name': 'Aylık iade oranı — kanal karşılaştırması', 'name_font': {'size': 12, 'name': FONT}}); cl_.set_legend({'position': 'bottom'})
cl_.set_y_axis({'num_format': '0%', 'major_gridlines': {'visible': True, 'line': {'color': LINE}}}); cl_.set_x_axis({'num_format': 'mmm'}); cl_.set_size({'width': 620, 'height': 320}); cl_.set_chartarea({'border': {'color': LINE}})
ws.insert_chart('J33', cl_)
cb = wb.add_chart({'type': 'bar'})
cb.add_series({'name': 'Katkı / sipariş (TL)', 'categories': f'=Kanal!$A${K0}:$A${K0 + len(KANALLAR) - 1}', 'values': f'=Kanal!$M${K0}:$M${K0 + len(KANALLAR) - 1}',
               'points': [{'fill': {'color': KR[k]}} for k in KANALLAR], 'data_labels': {'value': True, 'num_format': '#,##0'}, 'gap': 60})
cb.set_title({'name': 'Sipariş başına katkı (TL)', 'name_font': {'size': 12, 'name': FONT}}); cb.set_legend({'none': True})
cb.set_x_axis({'num_format': '#,##0', 'major_gridlines': {'visible': True, 'line': {'color': LINE}}}); cb.set_y_axis({'reverse': True}); cb.set_size({'width': 620, 'height': 260}); cb.set_chartarea({'border': {'color': LINE}})
ws.insert_chart('P3', cb)

# ============================================================= ÜRÜN
ws = ws_u
ws.hide_gridlines(2)
ws.merge_range('A1:K1', 'Ürün analizi', f_title); ws.set_row(0, 30)
ws.merge_range('A2:K2', 'Ürün ve kategori adları Ayarlar sayfasından gelir. Seçili yıl için hesaplanır.', f_sub)
ws.merge_range('A4:K4', '1) Yıl özeti — ürün bazında', f_sec)
uh = ['Ürün', 'Kategori', 'Adet', 'Sipariş', 'Net satış', 'Pay %', 'Ort. sepet', 'İade %', 'Kargo', 'Kargo / net satış', 'İndirim %']
for j, h in enumerate(uh):
    ws.write(4, j, h, f_hl if j == 0 else f_h)
ws.set_row(4, 32)
U0 = 6
urun_vals = {}
for i in range(URUN_SLOT):
    r = U0 + i; ri = r - 1
    nm = URUNLER[i] if i < len(URUNLER) else ''
    yy = y[y.urun == nm] if nm else y.iloc[0:0]
    Ad = ssum(yy, 'adetg'); B = ssum(yy, 'gec'); G = ssum(yy, 'net'); Tg = ssum(yy, 'tutarg'); Kg = ssum(yy, 'kargog'); Li = ssum(yy, 'liste'); In = ssum(yy, 'indtl')
    urun_vals[nm] = dict(B=B, G=G)
    e = lambda x: x if nm else ''
    wf(ws, ri, 0, f'=IF(Ayarlar!$E{4 + i}="","",Ayarlar!$E{4 + i})', f_txtb, nm)
    wf(ws, ri, 1, f'=IF($A{r}="","",Ayarlar!$F{4 + i})', f_txt, URUN_KAT.get(nm, '') if nm else '')
    wf(ws, ri, 2, f'=IF($A{r}="","",SUMIFS({TS}[Adet Geçerli],{TS}[Ürün],$A{r},{TS}[Yıl],Yil))', f_int, e(Ad))
    wf(ws, ri, 3, f'=IF($A{r}="","",SUMIFS({TS}[Geçerli],{TS}[Ürün],$A{r},{TS}[Yıl],Yil))', f_int, e(B))
    wf(ws, ri, 4, f'=IF($A{r}="","",SUMIFS({TS}[Net Satış],{TS}[Ürün],$A{r},{TS}[Yıl],Yil))', f_int, e(G))
    wf(ws, ri, 5, f'=IF($A{r}="","",IF(E${U0 + URUN_SLOT}=0,0,E{r}/E${U0 + URUN_SLOT}))', f_pct, e(G / tot['C'] if tot['C'] else 0))
    wf(ws, ri, 6, f'=IF($A{r}="","",IF(D{r}=0,0,SUMIFS({TS}[Tutar Geçerli],{TS}[Ürün],$A{r},{TS}[Yıl],Yil)/D{r}))', f_int, e(Tg / B if B else 0))
    wf(ws, ri, 7, f'=IF($A{r}="","",IF(D{r}=0,0,SUMIFS({TS}[İade Adedi],{TS}[Ürün],$A{r},{TS}[Yıl],Yil)/D{r}))', f_pct, e(ssum(yy, 'iadeadet') / B if B else 0))
    wf(ws, ri, 8, f'=IF($A{r}="","",SUMIFS({TS}[Kargo Geçerli],{TS}[Ürün],$A{r},{TS}[Yıl],Yil))', f_int, e(Kg))
    wf(ws, ri, 9, f'=IF($A{r}="","",IF(E{r}=0,0,I{r}/E{r}))', f_pct, e(Kg / G if G else 0))
    wf(ws, ri, 10, f'=IF($A{r}="","",IF(SUMIFS({TS}[Liste Tutarı],{TS}[Ürün],$A{r},{TS}[Yıl],Yil)=0,0,SUMIFS({TS}[İndirim TL],{TS}[Ürün],$A{r},{TS}[Yıl],Yil)/SUMIFS({TS}[Liste Tutarı],{TS}[Ürün],$A{r},{TS}[Yıl],Yil)))', f_pct, e(In / Li if Li else 0))
UT = U0 + URUN_SLOT
ws.write(UT - 1, 0, 'Toplam', f_tot_txt); ws.write(UT - 1, 1, '', f_tot_txt)
for c_, ci, v in [('C', 2, ssum(y, 'adetg')), ('D', 3, ssum(y, 'gec')), ('E', 4, tot['C']), ('I', 8, ssum(y, 'kargog'))]:
    wf(ws, UT - 1, ci, f'=SUM({c_}{U0}:{c_}{UT - 1})', f_tot_int, v)
wf(ws, UT - 1, 5, f'=SUM(F{U0}:F{UT - 1})', f_tot_pct, 1.0)
wf(ws, UT - 1, 6, f'=IF(D{UT}=0,0,SUMIFS({TS}[Tutar Geçerli],{TS}[Yıl],Yil)/D{UT})', f_tot_int, tot['E'])
wf(ws, UT - 1, 7, f'=Aylık!D{TR}', f_tot_pct, tot['D'])
wf(ws, UT - 1, 9, f'=IF(E{UT}=0,0,I{UT}/E{UT})', f_tot_pct, ssum(y, 'kargog') / tot['C'])
ws.write(UT - 1, 10, '', f_tot_txt)
ws.conditional_format(f'E{U0}:E{UT - 1}', {'type': 'data_bar', 'bar_color': '#8DBB9C', 'bar_solid': True})
ws.conditional_format(f'J{U0}:J{UT - 1}', {'type': '2_color_scale', 'min_color': '#FFFFFF', 'max_color': '#E9A76B'})
# kategori
CT0 = 19
ws.merge_range('A17:K17', '2) Kategori özeti', f_sec)
for j, h in enumerate(['Kategori', 'Sipariş', 'Net satış', 'Pay %', 'Kargo', 'Kargo / net satış']):
    ws.write(17, j, h, f_hl if j == 0 else f_h)
for i in range(KAT_SLOT):
    r = CT0 + i; ri = r - 1
    nm = KATLAR[i] if i < len(KATLAR) else ''
    yy = y[y.kat == nm] if nm else y.iloc[0:0]
    G = ssum(yy, 'net'); Kg = ssum(yy, 'kargog'); e = lambda x: x if nm else ''
    wf(ws, ri, 0, f'=IF(Ayarlar!$H{4 + i}="","",Ayarlar!$H{4 + i})', f_txtb, nm)
    wf(ws, ri, 1, f'=IF($A{r}="","",SUMIFS({TS}[Geçerli],{TS}[Kategori],$A{r},{TS}[Yıl],Yil))', f_int, e(ssum(yy, 'gec')))
    wf(ws, ri, 2, f'=IF($A{r}="","",SUMIFS({TS}[Net Satış],{TS}[Kategori],$A{r},{TS}[Yıl],Yil))', f_int, e(G))
    wf(ws, ri, 3, f'=IF($A{r}="","",IF(Aylık!$C${TR}=0,0,C{r}/Aylık!$C${TR}))', f_pct, e(G / tot['C']))
    wf(ws, ri, 4, f'=IF($A{r}="","",SUMIFS({TS}[Kargo Geçerli],{TS}[Kategori],$A{r},{TS}[Yıl],Yil))', f_int, e(Kg))
    wf(ws, ri, 5, f'=IF($A{r}="","",IF(C{r}=0,0,E{r}/C{r}))', f_pct, e(Kg / G if G else 0))
# ay × ürün
UM0 = 28
ws.merge_range('A25:K25', '3) Ay × ürün — net satış (TL)', f_sec)
ws.write(26, 0, 'Ay', f_hl)
for c in range(URUN_SLOT):
    wf(ws, 26, 1 + c, f'=IF($A${U0 + c}="","",$A${U0 + c})', f_h, URUNLER[c] if c < len(URUNLER) else '')
ws.write(26, 9, 'Toplam', f_h)
ws.set_row(26, 44)
for i, mth in enumerate(months):
    r = UM0 + i; ri = r - 1
    wf(ws, ri, 0, f'=DATE(Yil,{i + 1},1)', f_month, mth)
    tm = 0
    for c in range(URUN_SLOT):
        nm = URUNLER[c] if c < len(URUNLER) else ''
        v = float(y[(y.ay == mth) & (y.urun == nm)].net.sum()) if nm else ''
        tm += v if nm else 0
        cl = cn(1 + c)
        wf(ws, ri, 1 + c, f'=IF({cl}$27="","",SUMIFS({TS}[Net Satış],{TS}[Ürün],{cl}$27,{TS}[Ay],$A{r}))', f_int, v)
    wf(ws, ri, 9, f'=SUM(B{r}:I{r})', f_tot_int, tm)
ws.conditional_format(f'B{UM0}:I{UM0 + 11}', {'type': '2_color_scale', 'min_color': '#FFFFFF', 'max_color': '#7FB596'})
ws.set_column('A:A', 24); ws.set_column('B:B', 12); ws.set_column('C:K', 12.5)
ws.freeze_panes(5, 1)
cu = wb.add_chart({'type': 'bar'})
cu.add_series({'name': 'Net satış', 'categories': f'=Ürün!$A${U0}:$A${U0 + len(URUNLER) - 1}', 'values': f'=Ürün!$E${U0}:$E${U0 + len(URUNLER) - 1}',
               'points': [{'fill': {'color': c}} for c in UR], 'data_labels': {'value': True, 'num_format': '#,##0,'}, 'gap': 50})
cu.set_title({'name': 'Ürün bazında net satış (bin TL)', 'name_font': {'size': 12, 'name': FONT}}); cu.set_legend({'none': True})
cu.set_x_axis({'num_format': '#,##0,', 'major_gridlines': {'visible': True, 'line': {'color': LINE}}}); cu.set_y_axis({'reverse': True}); cu.set_size({'width': 600, 'height': 300}); cu.set_chartarea({'border': {'color': LINE}})
ws.insert_chart('M4', cu)
cm = wb.add_chart({'type': 'column', 'subtype': 'stacked'})
for c in range(len(URUNLER)):
    cm.add_series({'name': f'=Ürün!${cn(1 + c)}$27', 'categories': f'=Ürün!$A${UM0}:$A${UM0 + 11}', 'values': f'=Ürün!${cn(1 + c)}${UM0}:${cn(1 + c)}${UM0 + 11}', 'fill': {'color': UR[c]}, 'gap': 55})
cm.set_title({'name': 'Aylık net satış — ürün dağılımı (TL)', 'name_font': {'size': 12, 'name': FONT}}); cm.set_legend({'position': 'bottom'})
cm.set_y_axis({'num_format': '#,##0', 'major_gridlines': {'visible': True, 'line': {'color': LINE}}}); cm.set_x_axis({'num_format': 'mmm'}); cm.set_size({'width': 600, 'height': 340}); cm.set_chartarea({'border': {'color': LINE}})
ws.insert_chart('M20', cm)

# ============================================================= VERİ KONTROL
ws = ws_c
ws.hide_gridlines(2)
ws.merge_range('A1:D1', 'Veri kontrolü', f_title); ws.set_row(0, 30)
ws.merge_range('A2:D2', 'Veri sayfasına yeni satır ekledikçe bu kontroller otomatik güncellenir. Sorunlu satırlar raporlarda otomatik düzeltilerek sayılır.', f_sub)
for j, h in enumerate(['Kontrol', 'Sonuç', 'Durum', 'Ne yapıldı / ne yapmalı']):
    ws.write(3, j, h, f_hl)
tb = d
chk = [
    ('Toplam satır', f'=ROWS({TS}[Sipariş No])', N, False, 'Bilgi'),
    ('Tekrar eden sipariş numarası', f'=SUM({TS}[Tekrar])', int(d.tekrar.sum()), True, 'İlk kayıt sayılır, sonrakiler hesaba katılmaz. Kaynağı kontrol edin.'),
    ('Tanımsız kanal', f'=COUNTIF({TS}[Kanal Temiz],"TANIMSIZ")', 0, True, 'Ayarlar sayfasındaki Kanallar listesine ekleyin.'),
    ('Yazımı düzeltilen kanal adı', f'=SUMPRODUCT(--NOT(EXACT({TS}[Kanal],{TS}[Kanal Temiz])))-B7', int((d.kanal != d.kt).sum()), True, 'Büyük/küçük harf farkı; "Kanal Temiz" sütunu düzeltir. Girişte listeden seçin.'),
    ('Tanımsız ürün', f'=SUMPRODUCT(--(COUNTIF(Urunler,{TS}[Ürün])=0))', 0, True, 'Ayarlar sayfasındaki Ürünler listesine ekleyin.'),
    ('Eksi adetli satır', f'=COUNTIF({TS}[Adet],"<0")', int((d.adet < 0).sum()), True, 'İade/iptal düzeltmesi sayılır ve satıştan düşer. İade sütununu da işaretlemeyi düşünün.'),
    ('Tutar ≠ Adet × Fiyat × (1 − İndirim)', f'=SUMPRODUCT(--(ABS({TS}[Adet]*{TS}[Birim Fiyat (TL)]*(1-{TS}[İndirim])-{TS}[Tutar (TL)])>0.01))', int((abs(d.adet * d.fiyat * (1 - d.ind) - d.tutar) > 0.01).sum()), True, 'Fiyat/indirim/tutar uyuşmazlığı; satırı kontrol edin.'),
    ('Satışı olup gideri girilmemiş ay (seçili yıl)', f"=SUMPRODUCT(--(Aylık!B{A0}:B{A0 + 11}>0),--((Aylık!G{A0}:G{A0 + 11}+Aylık!H{A0}:H{A0 + 11}+Aylık!I{A0}:I{A0 + 11}+Aylık!J{A0}:J{A0 + 11})=0))", 0, True, 'Giderler sayfasına o ayın satırını ekleyin; yoksa kâr olduğundan yüksek görünür.'),
]
f_ok = wb.add_format({'font_color': GREEN, 'bold': True}); f_bad = wb.add_format({'font_color': COPPER, 'bold': True, 'bg_color': COPPER_L})
issue_cells = []
for i, (nm, fm, val, is_issue, note) in enumerate(chk):
    r = 5 + i
    ws.write(r - 1, 0, nm, f_al_l)
    wf(ws, r - 1, 1, fm, F(num_format='#,##0', bold=True, align='right', bg_color='#FFFFFF', bottom=1, bottom_color=LINE), val)
    if is_issue:
        wf(ws, r - 1, 2, f'=IF(B{r}=0,"✓ Sorun yok","⚠ İnceleyin")', F(bg_color='#FFFFFF', bottom=1, bottom_color=LINE, bold=True), '✓ Sorun yok' if val == 0 else '⚠ İnceleyin')
        issue_cells.append(f'B{r}')
    else:
        ws.write(r - 1, 2, '', f_al_t)
    ws.write(r - 1, 3, note, f_al_t)
tot_issue_row = 5 + len(chk) + 1
issue_total = int(d.tekrar.sum()) + int((d.kanal != d.kt).sum()) + int((d.adet < 0).sum())
ws.write(tot_issue_row - 1, 0, 'Toplam sorun sayısı', f_tot_txt)
wf(ws, tot_issue_row - 1, 1, '=' + '+'.join(issue_cells), f_tot_int, issue_total)
ws.conditional_format('C5:C20', {'type': 'text', 'criteria': 'containing', 'value': '✓', 'format': f_ok})
ws.conditional_format('C5:C20', {'type': 'text', 'criteria': 'containing', 'value': '⚠', 'format': f_bad})
ws.set_column('A:A', 44); ws.set_column('B:B', 12); ws.set_column('C:C', 16); ws.set_column('D:D', 92)
VK_TOTAL = f"'Veri Kontrol'!$B${tot_issue_row}"

# ============================================================= SENARYO
ws = ws_s
ws.hide_gridlines(2)
ws.merge_range('A1:F1', 'Senaryo — "ya şöyle olsaydı?"', f_title); ws.set_row(0, 30)
ws.merge_range('A2:F2', 'Mavi hücreleri değiştirin; kâr etkisi anında hesaplanır. Tahmindir: satış tepkileri (hacim kaybı vb.) sizin varsayımınızdır.', f_sub)
ws.merge_range('A3:F3', 'Varsayımlar', f_sec)
S_IN = [
    ('Fiyat artışı (%)', 0.03, f_in, 'Tüm ürünlere uygulanır', None),
    ('Fiyat artışının satış hacmine etkisi: hacim kaybı (%)', 0.015, f_in, 'Zam sonrası kaybolan satış oranı; 2025 verisinde fiyat hiç değişmediği için gerçek tepki ölçülemedi', None),
    ('Hedef kanal', 'Trendyol', f_in_txt, 'İade ve indirim adımları bu kanal için hesaplanır', 'kanal'),
    ('Hedef kanalda iade oranı hedefi (sipariş %)', 0.028, f_in, '2025 Oca–Tem Trendyol iade oranı: %2,8', None),
    ('Hedef kanalda indirim azaltma (%)', 0.0, f_in, 'İndirim TL\'sinin ne kadarı kaldırılır (0 = yok). Önce A/B testle deneyin', None),
    ('… indirimli siparişlerde kaybolan sipariş (%)', 0.10, f_in, 'Başabaş kayıp oranı sonuç tablosunda görünür', None),
    ('Kargo maliyetinde iyileşme (%)', 0.10, f_in, 'Sözleşme/paketleme/eşik ile', None),
    ('Kaçırılan satışın geri kazanımı (net satış, TL)', float(round(M['bardak']['kayip_ciro'])), f_in_int, '2025 Nis–May bardak kesintisi tahmini (rapor s.8). Stok güvencesiyle önlenen ciro', None),
    ('Yaz (Nis–Ağu) satış artışı (%)', 0.0, f_in, 'Yaz ürünü/etkinlik planından beklenen artış', None),
]
for i, (lab, val, fm, note, kind) in enumerate(S_IN):
    r = 4 + i
    ws.write(r - 1, 0, lab, f_txtb)
    ws.write(r - 1, 1, val, fm)
    ws.merge_range(r - 1, 2, r - 1, 5, note, f_note)
    if kind == 'kanal':
        ws.data_validation(r - 1, 1, r - 1, 1, {'validate': 'list', 'source': '=Kanallar'})
S = {'p': 'B4', 'v': 'B5', 'k': 'B6', 'r': 'B7', 'x': 'B8', 'y': 'B9', 'kg': 'B10', 'rec': 'B11', 'yaz': 'B12'}
sv = {'p': 0.03, 'v': 0.015, 'k': 'Trendyol', 'r': 0.028, 'x': 0.0, 'y': 0.10, 'kg': 0.10, 'rec': float(round(M['bardak']['kayip_ciro'])), 'yaz': 0.0}
ws.merge_range('A14:F14', 'Bugünkü durum (seçili yıl)', f_sec)
T_ = y[y.kt == 'Trendyol']
base = {
    'net': tot['C'], 'kargo': tot['F'], 'ham': tot['G'], 'kar': tot['N'],
    'katki': 1 - (tot['F'] + tot['G'] + tot['L']) / tot['C'],
    'tutark': ssum(T_, 'tutarg'), 'iadek': ssum(T_, 'iadeadet') / ssum(T_, 'gec'), 'indk': ssum(T_, 'indtl'),
    'nind': ssum(T_, 'indirimli'), 'netind': float(T_[T_.indirimli == 1].net.sum()), 'kargoind': float(T_[T_.indirimli == 1].kargog.sum()),
}
B_ = [
    ('Net satış', f'=Aylık!C{TR}', f_int, base['net']),
    ('Kargo', f'=Aylık!F{TR}', f_int, base['kargo']),
    ('Hammadde', f'=Aylık!G{TR}', f_int, base['ham']),
    ('Net kâr', f'=Aylık!N{TR}', f_int, base['kar']),
    ('Katkı oranı (1 − (kargo+hammadde+komisyon)/net satış)', f'=IF(B15=0,0,1-(Aylık!F{TR}+Aylık!G{TR}+Aylık!L{TR})/B15)', f_pct, base['katki']),
    ('Hedef kanal — tutar (iade dahil)', f'=SUMIFS({TS}[Tutar Geçerli],{TS}[Kanal Temiz],{S["k"]},{TS}[Yıl],Yil)', f_int, base['tutark']),
    ('Hedef kanal — iade oranı (sipariş)', f'=IFERROR(SUMIFS({TS}[İade Adedi],{TS}[Kanal Temiz],{S["k"]},{TS}[Yıl],Yil)/SUMIFS({TS}[Geçerli],{TS}[Kanal Temiz],{S["k"]},{TS}[Yıl],Yil),0)', f_pct, base['iadek']),
    ('Hedef kanal — indirim TL', f'=SUMIFS({TS}[İndirim TL],{TS}[Kanal Temiz],{S["k"]},{TS}[Yıl],Yil)', f_int, base['indk']),
    ('Hedef kanal — indirimli sipariş sayısı', f'=SUMIFS({TS}[İndirimli],{TS}[Kanal Temiz],{S["k"]},{TS}[Yıl],Yil)', f_int, base['nind']),
    ('Hedef kanal — indirimli siparişlerin net satışı', f'=SUMIFS({TS}[Net Satış],{TS}[Kanal Temiz],{S["k"]},{TS}[Yıl],Yil,{TS}[İndirimli],1)', f_int, base['netind']),
    ('Hedef kanal — indirimli siparişlerin kargosu', f'=SUMIFS({TS}[Kargo Geçerli],{TS}[Kanal Temiz],{S["k"]},{TS}[Yıl],Yil,{TS}[İndirimli],1)', f_int, base['kargoind']),
]
for i, (lab, fm, ff, val) in enumerate(B_):
    r = 15 + i
    ws.write(r - 1, 0, lab, f_txt)
    wf(ws, r - 1, 1, fm, ff, val)
# B15 net, B16 kargo, B17 ham, B18 kâr, B19 katkı, B20 tutar_k, B21 iade_k, B22 ind_k, B23 nind, B24 netind, B25 kargoind
ham_or_ = base['ham'] / base['net']
kom_k = 0.0
c_ind = (base['netind'] / base['nind']) * (1 - ham_or_ - kom_k) - (base['kargoind'] / base['nind'])
lev = [
    ('Fiyat güncellemesi', f'=(B15*(1+{S["p"]})*(1-{S["v"]})-B15)+(B16+B17)*{S["v"]}', ((base['net'] * (1 + sv['p']) * (1 - sv['v']) - base['net']) + (base['kargo'] + base['ham']) * sv['v']),
     'Yeni net satış − eski + hacim düşünce azalan hammadde ve kargo'),
    ('Hedef kanalda iade normalleşmesi', f'=(B21-{S["r"]})*B20*(1-Kanal!$B$3-IFERROR(INDEX(Komisyonlar,MATCH({S["k"]},Kanallar,0)),0))', (base['iadek'] - sv['r']) * base['tutark'] * (1 - ham_or_ - kom_k),
     '(Bugünkü iade oranı − hedef) × tutar × (1 − hammadde − komisyon)'),
    ('Hedef kanalda indirimi azaltma', f'=IF(OR(B23=0,{S["x"]}=0),0,{S["x"]}*B22*(1-{S["y"]})-{S["y"]}*B23*((B24/B23)*(1-Kanal!$B$3-IFERROR(INDEX(Komisyonlar,MATCH({S["k"]},Kanallar,0)),0))-B25/B23))', 0.0,
     'Kalan siparişlerde kazanılan indirim − kaybolan siparişlerin katkısı'),
    ('Kargo iyileşmesi', f'=B16*{S["kg"]}', base['kargo'] * sv['kg'], 'Toplam kargo × iyileşme oranı'),
    ('Kaçırılan satışın geri kazanımı', f'={S["rec"]}*B19', sv['rec'] * base['katki'], 'Geri kazanılan net satış × katkı oranı'),
    ('Yaz satış artışı', f'=SUM(Aylık!C{A0 + 3}:C{A0 + 7})*{S["yaz"]}*B19', 0.0, 'Nis–Ağu net satışı × artış × katkı oranı'),
]
ws.merge_range('A28:F28', 'Sonuç — her adımın yıllık kâra etkisi', f_sec)
for j, h in enumerate(['Adım', 'Kâr etkisi (TL)', 'Nasıl hesaplandı']):
    ws.write(28, j, h, f_hl) if j < 2 else None
ws.merge_range(28, 2, 28, 5, 'Nasıl hesaplandı', f_hl)
lev_vals = []
for i, (lab, fm, val, note) in enumerate(lev):
    r = 30 + i
    ws.write(r - 1, 0, lab, f_txtb)
    wf(ws, r - 1, 1, fm, F(num_format='#,##0;[Red]-#,##0', bold=True), val)
    ws.merge_range(r - 1, 2, r - 1, 5, note, f_note)
    lev_vals.append(val)
TOT_R = 30 + len(lev)
sc_tot = sum(lev_vals)
ws.write(TOT_R - 1, 0, 'Toplam kâr etkisi', f_tot_txt)
wf(ws, TOT_R - 1, 1, f'=SUM(B30:B{TOT_R - 1})', F(num_format='#,##0;[Red]-#,##0', bold=True, top=1, bg_color='#F0EDE6'), sc_tot)
ws.write(TOT_R, 0, 'Bugünkü net kâr', f_txt); wf(ws, TOT_R, 1, '=B18', f_int, base['kar'])
ws.write(TOT_R + 1, 0, 'Senaryo net kârı', F(bold=True, font_size=12, font_color=GREEN)); wf(ws, TOT_R + 1, 1, f'=B{TOT_R + 1}+B{TOT_R}', F(num_format='#,##0;[Red]-#,##0', bold=True, font_size=12, font_color=GREEN), base['kar'] + sc_tot)
ws.write(TOT_R + 2, 0, 'İndirim azaltmada başabaş kayıp oranı', f_txt)
NC = base['nind'] * c_ind; Gd = 0.5 * base['indk']
wf(ws, TOT_R + 2, 1, f'=IF(B23=0,0,(0.5*B22)/(0.5*B22+B23*((B24/B23)*(1-Kanal!$B$3-IFERROR(INDEX(Komisyonlar,MATCH({S["k"]},Kanallar,0)),0))-B25/B23)))', f_pct, Gd / (Gd + NC))
ws.merge_range(TOT_R + 2, 2, TOT_R + 2, 5, 'İndirimi yarıya indirirsek, indirimli siparişlerin bu oranından fazlası kaybolursa zarar ederiz.', f_note)
ws.set_column('A:A', 50); ws.set_column('B:B', 17); ws.set_column('C:F', 20)
# şelale yardımcı tablo (H:M)
HW = 3
ws.write(HW - 1, 7, 'Grafik verisi', f_lab)
for j, h in enumerate(['Adım', 'Taban', 'Artış', 'Azalış', 'Toplam', 'Kümülatif']):
    ws.write(HW, 7 + j, h, f_h)
steps = [('Bugünkü kâr', '=B18', base['kar'], 'total')] + [(lev[i][0], f'=B{30 + i}', lev_vals[i], 'delta') for i in range(len(lev))] + [('Senaryo kârı', f'=B{TOT_R + 2}', base['kar'] + sc_tot, 'total')]
cum = 0
for i, (lab, ref, val, kind) in enumerate(steps):
    r = HW + 2 + i  # Excel satırı
    ws.write(r - 1, 7, lab, f_txt)
    if kind == 'total':
        wf(ws, r - 1, 8, '=0', f_int, 0); wf(ws, r - 1, 9, '=0', f_int, 0); wf(ws, r - 1, 10, '=0', f_int, 0)
        wf(ws, r - 1, 11, ref, f_int, val); wf(ws, r - 1, 12, f'=L{r}', f_int, val)
        cum = val
    else:
        newcum = cum + val
        wf(ws, r - 1, 8, f'=MIN(M{r - 1},M{r})', f_int, min(cum, newcum))
        wf(ws, r - 1, 9, f'=MAX({ref[1:]},0)', f_int, max(val, 0)); wf(ws, r - 1, 10, f'=MAX(-{ref[1:]},0)', f_int, max(-val, 0)); wf(ws, r - 1, 11, '=0', f_int, 0)
        wf(ws, r - 1, 12, f'=M{r - 1}+{ref[1:]}', f_int, newcum)
        cum = newcum
ws.set_column('H:H', 34); ws.set_column('I:M', 11)
cw = wb.add_chart({'type': 'column', 'subtype': 'stacked'})
cats = f'=Senaryo!$H${HW + 2}:$H${HW + 1 + len(steps)}'
def wser(col, name, color, nofill=False):
    s = {'name': name, 'categories': cats, 'values': f'=Senaryo!${col}${HW + 2}:${col}${HW + 1 + len(steps)}', 'gap': 45}
    s['fill'] = {'none': True} if nofill else {'color': color}
    if nofill: s['border'] = {'none': True}
    cw.add_series(s)
wser('I', 'Taban', '#FFFFFF', True); wser('J', 'Artış', '#2E8B57'); wser('K', 'Azalış', RED); wser('L', 'Toplam', COPPER)
cw.set_title({'name': 'Kâr köprüsü: bugünkü kâr → senaryo (TL)', 'name_font': {'size': 12, 'name': FONT}}); cw.set_legend({'none': True})
cw.set_y_axis({'num_format': '#,##0', 'major_gridlines': {'visible': True, 'line': {'color': LINE}}}); cw.set_x_axis({'num_font': {'size': 9}}); cw.set_size({'width': 760, 'height': 360}); cw.set_chartarea({'border': {'color': LINE}})
ws.insert_chart(f'H{HW + 2 + len(steps) + 2}', cw)

# ============================================================= ÖZET
ws = ws_o
ws.hide_gridlines(2)
ws.set_column('A:A', 2); ws.set_column('B:Q', 11.2)
ws.merge_range('A1:Q1', 'DEMLİK · Satış ve Kâr Paneli', f_title); ws.set_row(0, 38)
d_first = d.tarih.min(); d_last = d.tarih.max()
ws.merge_range('A2:Q2', 'Veriyi güncelleyin → yılı seçin → tüm sayfalar ve grafikler yenilenir. Mavi hücreler sizin girdiğiniz alanlardır. Nasıl yapılacağı: Rehber sayfası.', f_sub)
ws.write('B4', 'Yıl seçin:', F(bold=True, align='right'))
ws.write('C4', YIL, f_in_year); ws.data_validation('C4', {'validate': 'list', 'source': '=Yillar'})
ws.write('E4', 'İlk kayıt', F(bold=True, align='right')); wf(ws, 3, 5, f'=MIN({TS}[Tarih])', f_date, d_first)
ws.write('G4', 'Son kayıt', F(bold=True, align='right')); wf(ws, 3, 7, f'=MAX({TS}[Tarih])', f_date, d_last)
ws.write('J4', 'Veri sorunu:', F(bold=True, align='right'))
wf(ws, 3, 10, f'={VK_TOTAL}', F(bold=True, num_format='0', align='center'), issue_total)
ws.write_url('L4', "internal:'Veri Kontrol'!A1", f_link, 'Veri kontrolüne git')
ws.write_url('N4', "internal:'Rehber'!A1", f_link, 'Nasıl güncellerim?')
ws.set_row(3, 26)
cards = [('NET SATIŞ (TL)', f'=Aylık!C{TR}', '#,##0', tot['C'], 'iadeler ve tekrarlar hariç', GREEN),
         ('SİPARİŞ', f'=Aylık!B{TR}', '#,##0', tot['B'], 'tekil sipariş', GREEN),
         ('ORT. SEPET (TL)', f'=Aylık!E{TR}', '#,##0', tot['E'], 'iade dahil sipariş başı', GREEN),
         ('İADE ORANI', f'=Aylık!D{TR}', '0.0%', tot['D'], 'siparişlerin yüzdesi', COPPER),
         ('NET KÂR (TL)', f'=Aylık!N{TR}', '#,##0;[Red]-#,##0', tot['N'], 'net satış − tüm giderler', COPPER),
         ('KÂR MARJI', f'=Aylık!O{TR}', '0.0%', tot['O'], 'net kâr ÷ net satış', COPPER)]
for i, (lab, fm, nf, val, sub, col) in enumerate(cards):
    c0 = 1 + i * 3 - (0 if i < 5 else 0)
    # 6 kart × 2.6 sütun: B:C, D:F ... basit: her kart 2 sütun + 1 boşluk yok, 17 sütuna sığdırmak için kart genişliği 2-3 sütun
c_starts = [1, 3, 5, 8, 11, 14]; c_ends = [2, 4, 7, 10, 13, 16]
ws.set_row(5, 20); ws.set_row(6, 40); ws.set_row(7, 18)
for (lab, fm, nf, val, sub, col), c0, c1 in zip(cards, c_starts, c_ends):
    ws.merge_range(5, c0, 5, c1, lab, f_card_l)
    ws.merge_range(6, c0, 6, c1, '', f_card_v(nf, col))
    wf(ws, 6, c0, fm, f_card_v(nf, col), val)
    ws.merge_range(7, c0, 7, c1, sub, f_card_s)
# Dikkat panosu
ws.merge_range('B10:Q10', 'Dikkat panosu — formülle güncellenir', f_sec)
neg_months = sum(1 for v in aylik_vals if v['N'] < 0); dolu = sum(1 for v in aylik_vals if v['C'] > 0)
min_kar = min(v['N'] for v in aylik_vals); min_ay = months[[v['N'] for v in aylik_vals].index(min_kar)]
iade_k = {k: kanal_vals[k]['F'] for k in KANALLAR}; max_iade_k = max(iade_k, key=iade_k.get)
ind_k = {k: kanal_vals[k]['D'] / kanal_vals[k]['C'] for k in KANALLAR}; max_ind_k = max(ind_k, key=ind_k.get)
kat_k = {k: kanal_vals[k]['L'] / kanal_vals[k]['B'] for k in KANALLAR}; min_kat_k = min(kat_k, key=kat_k.get)
rng = lambda col: f'Kanal!${col}${K0}:${col}${K0 + KAN_SLOT - 1}'
alerts = [
    ('Zarar eden ay sayısı', f"=COUNTIF(Aylık!N{A0}:N{A0 + 11},\"<0\")", f_al_v, neg_months,
     f'=IF(Aylık!B{TR}=0,"Bu yıl için veri yok",IF(E11>0,"⚠ "&E11&" ay zarar yazdı (satışı olan "&COUNTIF(Aylık!C{A0}:C{A0 + 11},">0")&" ayın)","✓ Zarar eden ay yok"))', f'⚠ {neg_months} ay zarar yazdı (satışı olan {dolu} ayın)' if neg_months else '✓ Zarar eden ay yok'),
    ('En düşük aylık kâr (TL)', f'=MIN(Aylık!N{A0}:N{A0 + 11})', F(bold=True, bg_color='#FFFFFF', bottom=1, bottom_color=LINE, align='right', num_format='#,##0;[Red]-#,##0'), min_kar,
     f'=IF(E12<0,"⚠ En kötü ay: "&CHOOSE(MONTH(INDEX(Aylık!A{A0}:A{A0 + 11},MATCH(E12,Aylık!N{A0}:N{A0 + 11},0))),"Oca","Şub","Mar","Nis","May","Haz","Tem","Ağu","Eyl","Eki","Kas","Ara")&" "&YEAR(INDEX(Aylık!A{A0}:A{A0 + 11},MATCH(E12,Aylık!N{A0}:N{A0 + 11},0)))&" — başabaş ≈ "&ROUND(INDEX(Aylık!P{A0}:P{A0 + 11},MATCH(E12,Aylık!N{A0}:N{A0 + 11},0))/1000,0)&" bin TL","✓ Tüm aylar kârda")',
     None),
    ('İadesi en yüksek kanal', f'=MAX({rng("F")})', f_al_vp, iade_k[max_iade_k],
     f'=IF(E13>2*Aylık!D{TR},"⚠ "&INDEX({rng("A")},MATCH(E13,{rng("F")},0))&": iade oranı yıl ortalamasının 2 katından fazla","✓ "&INDEX({rng("A")},MATCH(E13,{rng("F")},0))&" en yüksek; olağan dışı değil")',
     f'⚠ {max_iade_k}: iade oranı yıl ortalamasının 2 katından fazla' if iade_k[max_iade_k] > 2 * tot['D'] else f'✓ {max_iade_k} en yüksek; olağan dışı değil'),
    ('İndirimi en yüksek kanal (liste tutarına göre)', f'=MAX({rng("E")})', f_al_vp, ind_k[max_ind_k],
     f'=IF(E14>0.05,"⚠ "&INDEX({rng("A")},MATCH(E14,{rng("E")},0))&": liste tutarının %5\'inden fazlası indirime gidiyor","✓ İndirim oranları düşük")',
     f'⚠ {max_ind_k}: liste tutarının %5\'inden fazlası indirime gidiyor' if ind_k[max_ind_k] > 0.05 else '✓ İndirim oranları düşük'),
    ('Sipariş başına en düşük katkı (TL)', f'=MIN({rng("M")})', f_al_v, kat_k[min_kat_k],
     f'=IFERROR("Kanal: "&INDEX({rng("A")},MATCH(E15,{rng("M")},0))&" — en yüksek kanalın yalnız %"&ROUND(E15/MAX({rng("M")})*100,0)&"\'i","Veri yok")', None),
    ('Veri kontrolünde sorun', f'={VK_TOTAL}', f_al_v, issue_total,
     '=IF(E16=0,"✓ Veri temiz","⚠ Veri Kontrol sayfasına bakın (kanal yazımı, tekrar, eksi adet…)")', '⚠ Veri Kontrol sayfasına bakın (kanal yazımı, tekrar, eksi adet…)' if issue_total else '✓ Veri temiz'),
]
alert_txt = [None] * 6
# önbellek metinleri
pk_ay = months[[v['N'] for v in aylik_vals].index(min_kar)]
pk_bas = [v['P'] for v in aylik_vals][[v['N'] for v in aylik_vals].index(min_kar)]
alert_txt[1] = f'⚠ En kötü ay: {AYLAR[pk_ay.month - 1]} {pk_ay.year} — başabaş ≈ {round(pk_bas / 1000)} bin TL' if min_kar < 0 else '✓ Tüm aylar kârda'
alert_txt[4] = f"Kanal: {min_kat_k} — en yüksek kanalın yalnız %{round(kat_k[min_kat_k] / max(kat_k.values()) * 100)}'i"
for i, (lab, fm, fv, val, fm_t, cache) in enumerate(alerts):
    r = 11 + i
    ws.merge_range(r - 1, 1, r - 1, 3, lab, f_al_l)
    wf(ws, r - 1, 4, fm, fv, val)
    ws.merge_range(r - 1, 5, r - 1, 16, '', f_al_t)
    ct = cache if cache is not None else alert_txt[i]
    wf(ws, r - 1, 5, fm_t, f_al_t, ct)
ws.conditional_format('F11:F16', {'type': 'text', 'criteria': 'begins with', 'value': '⚠', 'format': wb.add_format({'font_color': COPPER, 'bold': True, 'bg_color': COPPER_L})})
ws.conditional_format('F11:F16', {'type': 'text', 'criteria': 'begins with', 'value': '✓', 'format': wb.add_format({'font_color': GREEN, 'bold': True})})
# grafikler (Özet)
ws.merge_range('B18:Q18', 'Grafikler', f_sec)
def ch_title(c, t): c.set_title({'name': t, 'name_font': {'size': 12, 'name': FONT, 'bold': True}})
g1 = wb.add_chart({'type': 'column'})
g1.add_series({'name': 'Net satış', 'categories': f'=Aylık!$A${A0}:$A${A0 + 11}', 'values': f'=Aylık!$C${A0}:$C${A0 + 11}', 'fill': {'color': GREEN}, 'gap': 60})
g1l = wb.add_chart({'type': 'line'})
g1l.add_series({'name': 'Başabaş', 'categories': f'=Aylık!$A${A0}:$A${A0 + 11}', 'values': f'=Aylık!$P${A0}:$P${A0 + 11}', 'line': {'color': COPPER, 'width': 2.25, 'dash_type': 'dash'}})
g1.combine(g1l); ch_title(g1, 'Aylık net satış ve başabaş (TL)'); g1.set_legend({'position': 'bottom'})
g1.set_y_axis({'num_format': '#,##0', 'major_gridlines': {'visible': True, 'line': {'color': LINE}}}); g1.set_x_axis({'num_format': 'mmm'}); g1.set_size({'width': 655, 'height': 310}); g1.set_chartarea({'border': {'color': LINE}})
ws.insert_chart('B19', g1)
g2 = wb.add_chart({'type': 'column'})
g2.add_series({'name': 'Net kâr', 'categories': f'=Aylık!$A${A0}:$A${A0 + 11}', 'values': f'=Aylık!$N${A0}:$N${A0 + 11}', 'fill': {'color': GREEN}, 'invert_if_negative': True, 'invert_if_negative_color': RED, 'gap': 60,
               'data_labels': {'value': True, 'num_format': '#,##0,', 'font': {'size': 9}}})
ch_title(g2, 'Aylık net kâr (bin TL)'); g2.set_legend({'none': True}); g2.set_y_axis({'num_format': '#,##0', 'major_gridlines': {'visible': True, 'line': {'color': LINE}}})
g2.set_x_axis({'num_format': 'mmm', 'label_position': 'low'}); g2.set_size({'width': 655, 'height': 310}); g2.set_chartarea({'border': {'color': LINE}})
ws.insert_chart('J19', g2)
g3 = wb.add_chart({'type': 'bar'})
g3.add_series({'name': 'Net satış', 'categories': f'=Kanal!$A${K0}:$A${K0 + len(KANALLAR) - 1}', 'values': f'=Kanal!$G${K0}:$G${K0 + len(KANALLAR) - 1}', 'points': [{'fill': {'color': KR[k]}} for k in KANALLAR],
               'data_labels': {'value': True, 'num_format': '#,##0,'}, 'gap': 55})
ch_title(g3, 'Kanal bazında net satış (bin TL)'); g3.set_legend({'none': True}); g3.set_y_axis({'reverse': True}); g3.set_x_axis({'num_format': '#,##0,', 'major_gridlines': {'visible': True, 'line': {'color': LINE}}})
g3.set_size({'width': 655, 'height': 290}); g3.set_chartarea({'border': {'color': LINE}})
ws.insert_chart('B36', g3)
g4 = wb.add_chart({'type': 'bar'})
g4.add_series({'name': 'Net satış', 'categories': f'=Ürün!$A${U0}:$A${U0 + len(URUNLER) - 1}', 'values': f'=Ürün!$E${U0}:$E${U0 + len(URUNLER) - 1}', 'points': [{'fill': {'color': c}} for c in UR],
               'data_labels': {'value': True, 'num_format': '#,##0,'}, 'gap': 50})
ch_title(g4, 'Ürün bazında net satış (bin TL)'); g4.set_legend({'none': True}); g4.set_y_axis({'reverse': True}); g4.set_x_axis({'num_format': '#,##0,', 'major_gridlines': {'visible': True, 'line': {'color': LINE}}})
g4.set_size({'width': 655, 'height': 290}); g4.set_chartarea({'border': {'color': LINE}})
ws.insert_chart('J36', g4)
g5 = wb.add_chart({'type': 'line'})
for c in range(len(KANALLAR)):
    w_ = 3.5 if KANALLAR[c] == 'Trendyol' else 1.75
    g5.add_series({'name': f'=Kanal!${cn(1 + c)}$34', 'categories': f'=Kanal!$A${IM0}:$A${IM0 + 11}', 'values': f'=Kanal!${cn(1 + c)}${IM0}:${cn(1 + c)}${IM0 + 11}',
                   'line': {'color': KR[KANALLAR[c]], 'width': w_}, 'marker': {'type': 'circle', 'size': 5, 'fill': {'color': KR[KANALLAR[c]]}, 'border': {'color': KR[KANALLAR[c]]}}})
ch_title(g5, 'Aylık iade oranı — kanal karşılaştırması'); g5.set_legend({'position': 'bottom'}); g5.set_y_axis({'num_format': '0%', 'major_gridlines': {'visible': True, 'line': {'color': LINE}}})
g5.set_x_axis({'num_format': 'mmm'}); g5.set_size({'width': 655, 'height': 300}); g5.set_chartarea({'border': {'color': LINE}})
ws.insert_chart('B52', g5)
g6 = wb.add_chart({'type': 'column', 'subtype': 'stacked'})
for c in range(len(URUNLER)):
    g6.add_series({'name': f'=Ürün!${cn(1 + c)}$27', 'categories': f'=Ürün!$A${UM0}:$A${UM0 + 11}', 'values': f'=Ürün!${cn(1 + c)}${UM0}:${cn(1 + c)}${UM0 + 11}', 'fill': {'color': UR[c]}, 'gap': 55})
ch_title(g6, 'Aylık net satış — ürün dağılımı (TL)'); g6.set_legend({'position': 'bottom'}); g6.set_y_axis({'num_format': '#,##0', 'major_gridlines': {'visible': True, 'line': {'color': LINE}}})
g6.set_x_axis({'num_format': 'mmm'}); g6.set_size({'width': 655, 'height': 300}); g6.set_chartarea({'border': {'color': LINE}})
ws.insert_chart('J52', g6)
ws.freeze_panes(4, 0)
ws.set_first_sheet(); ws.activate()
ws.set_landscape(); ws.fit_to_pages(1, 0); ws.set_paper(9)

# ============================================================= REHBER
ws = ws_r
ws.hide_gridlines(2)
ws.set_column('A:A', 3); ws.set_column('B:B', 26); ws.set_column('C:C', 110)
ws.merge_range('A1:C1', 'Rehber — paneli nasıl güncellerim?', f_title); ws.set_row(0, 30)
rows = [
    ('sec', 'Her ay yapılacaklar (3 adım)'),
    ('1. Satışları ekleyin', 'Veri sayfasında tablonun hemen altındaki boş satıra yeni siparişleri yapıştırın. Yalnız A–K sütunlarına (Sipariş No … İade). Gri başlıklı sütunlar kendiliğinden dolar, tablo otomatik uzar.'),
    ('2. Giderleri ekleyin', 'Giderler sayfasında yeni ay için bir satır ekleyin: Ay (ayın 1\'i), Kira, Personel, Pazarlama, Hammadde, Diğer Gider.'),
    ('3. Yılı seçin', 'Özet sayfasında C4 hücresinden yılı seçin (2025, 2026 …). Tüm sayfalar ve grafikler o yıla göre yenilenir. Kontrol için Özet\'teki "Dikkat panosu" ve Veri Kontrol sayfasına bakın.'),
    ('sec', 'Sayfalar'),
    ('Özet', 'Kartlar (net satış, sipariş, sepet, iade, kâr, marj), dikkat panosu ve ana grafikler.'),
    ('Aylık', 'Aylık kâr–zarar tablosu, başabaş noktası, kâr grafiği.'),
    ('Kanal', 'Kanal özeti (iade, indirim, katkı), ay × kanal net satış ve iade ısı haritaları.'),
    ('Ürün', 'Ürün ve kategori özeti, kargo yükü, ay × ürün matrisi.'),
    ('Senaryo', '"Fiyatı %3 artırsak? Trendyol iadesini düşürsek?" gibi sorular: mavi varsayımları değiştirin, kâr etkisini görün.'),
    ('Veri / Giderler', 'Ham kayıtlar. Bunlar dışında hiçbir sayfaya elle sayı yazmayın; diğerleri formüldür.'),
    ('Ayarlar', 'Kanal ve ürün listeleri, kanal komisyon oranları (varsayılan 0).'),
    ('Veri Kontrol', 'Tekrar kayıt, tanımsız kanal/ürün, eksi adet, tutar tutarsızlığı, gideri eksik ay kontrolleri.'),
    ('sec', 'Yeni kanal / ürün eklerken'),
    ('Kanal', 'Ayarlar sayfasında Kanallar listesinde boş satıra adı yazın (Veri sayfasındaki yazımla aynı). Kanal sayfasında 6 yer ayrıldı; grafikler ilk 4 kanalı gösterir — grafiğe sağ tık → Veri Seç ile aralığı genişletin.'),
    ('Ürün', 'Ayarlar sayfasında Ürünler listesine ürünü ve kategorisini ekleyin. Ürün sayfasında 8 yer ayrıldı; grafikler ilk 6 ürünü gösterir.'),
    ('sec', 'Hesap kuralları'),
    ('Net satış', 'Tutar (TL) toplamı; iade = "Evet" olan siparişler ve tekrar eden sipariş numaraları hariç. Tam iade varsayılır.'),
    ('Tekrar kayıt', 'Aynı Sipariş No\'nun ikinci ve sonraki kayıtları hesaba katılmaz (Veri sayfası, Tekrar sütunu).'),
    ('Kargo', 'Her siparişte gerçekleşen maliyet; iade edilen siparişin kargosu da gider sayılır.'),
    ('Net kâr', 'Net satış − kargo − hammadde − kira − personel − pazarlama − diğer gider − komisyon.'),
    ('Başabaş', '(kira + personel + pazarlama + diğer) ÷ (1 − (kargo + hammadde + komisyon) ÷ net satış). O ayın net satışı bunun altındaysa ay zararda.'),
    ('Katkı (Kanal)', 'Net satış − hammadde (yılın hammadde/net satış oranı) − kargo − komisyon. Sabit giderler dağıtılmaz.'),
    ('sec', 'Bilinmesi gerekenler'),
    ('KDV', 'Verideki tutarların KDV dahil mi hariç mi olduğu bilinmiyor; giderlerle aynı tabanda olduğundan emin olun.'),
    ('Komisyon', 'Trendyol ve ödeme komisyonları veride yok; Ayarlar\'daki komisyon % hücrelerine yazarsanız kâr güncellenir.'),
    ('Hammadde', '2025 verisinde hammadde her ay net satışın tam %32\'si; muhtemelen tahmin. Gerçek fatura tutarını girmek kârı gerçeğe yaklaştırır.'),
    ('Renkler', 'Mavi yazı + sarı zemin = sizin girdiğiniz hücre. Gri başlık = otomatik sütun. Bakır/kırmızı = dikkat, yeşil = iyi.'),
]
r = 3
for k, v in rows:
    if k == 'sec':
        ws.merge_range(r - 1, 1, r - 1, 2, v, f_sec); r += 1
    else:
        ws.write(r - 1, 1, k, F(bold=True, valign='top')); ws.write(r - 1, 2, v, F(text_wrap=True, valign='top'))
        ws.set_row(r - 1, 32 if len(v) > 105 else 18); r += 1

import os
for w_ in (ws_a, ws_k, ws_u, ws_s, ws_c, ws_r, ws_g, ws_y):
    w_.set_landscape(); w_.set_paper(9); w_.fit_to_pages(1, 0)
ws_v.set_landscape(); ws_v.set_paper(9); ws_v.fit_to_pages(1, 0); ws_v.repeat_rows(HDR)
if os.environ.get('PANEL_TEST'):
    ws_v.print_area(0, 0, 60, 24)
wb.close()
print('panel.xlsx yazıldı', N, 'satır')
