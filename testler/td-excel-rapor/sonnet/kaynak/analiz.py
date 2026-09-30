"""Demlik 2025 satış analizi — rapor, Excel ve BULGULAR için tek sayı kaynağı.

Kullanım:  python analiz.py  -> metrics.json yazar
Kural seti (BULGULAR.md / rapor "Veri notları" ile aynı):
  * Aynı Sipariş No'lu birebir tekrar satırlar tek sayılır (12 satır).
  * 'web sitesi' -> 'Web sitesi' (6 satır).
  * Net satış = Tutar, iade=Evet olan siparişler hariç (tam iade varsayımı).
  * Eksi adetli 5 satır düzeltme/iptal kaydı sayılır, satışlardan düşer.
  * Kargo iade edilen siparişlerde de gerçekleşmiş maliyet sayılır.
  * Hammadde, Kira, Personel, Pazarlama = Giderler sayfası (olduğu gibi).
"""
import json
import numpy as np
import pandas as pd

GIRDI = '/home/forn/sonnet-vs-astra/td-excel-rapor/girdi/demlik-satis-2025.xlsx'
AYLAR = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara']
KANALLAR = ['Mağaza', 'Trendyol', 'Web sitesi', 'Instagram DM']
URUNLER = ['Demlik Seti (el yapımı)', 'İnce Belli Bardak 6lı', 'Karadeniz Sabahı 250g',
           'Adaçaylı Bergamot 100g', 'Kadıköy Akşamı 250g', 'Demleme Atölyesi']


def yukle():
    ham = pd.read_excel(GIRDI, sheet_name='Satışlar')
    g = pd.read_excel(GIRDI, sheet_name='Giderler')
    ham.columns = ['no', 'tarih', 'kanal', 'urun', 'kat', 'adet', 'fiyat', 'ind', 'tutar', 'kargo', 'iade']
    g.columns = ['ay', 'kira', 'personel', 'pazarlama', 'hammadde']
    ham['tarih'] = pd.to_datetime(ham.tarih)
    return ham, g


def hazirla(ham):
    d = ham.drop_duplicates('no', keep='first').copy()
    d['kanal'] = d.kanal.replace({'web sitesi': 'Web sitesi'})
    d['ret'] = d.iade.eq('Evet')
    d['net'] = np.where(d.ret, 0.0, d.tutar)
    d['brut'] = d.adet * d.fiyat
    d['indtl'] = d.brut - d.tutar
    d['ay'] = d.tarih.dt.strftime('%Y-%m')
    d['m'] = d.tarih.dt.month
    return d


def main():
    ham, g = yukle()
    d = hazirla(ham)
    M = {}
    r = lambda x, n=0: round(float(x), n)

    # ---- veri kalitesi
    dup = ham[ham.duplicated('no', keep='first')]
    M['kalite'] = dict(
        ham_satir=len(ham), tekil_satir=len(d), tekrar_satir=len(dup),
        tekrar_tutar=r(dup.tutar.sum(), 2), tekrar_kargo=r(dup.kargo.sum()),
        kucuk_harf_kanal=int((ham.kanal == 'web sitesi').sum()),
        eksi_adet=int((d.adet < 0).sum()), eksi_adet_tutar=r(d[d.adet < 0].tutar.sum(), 2),
        eksi_adet_iade_isaretli=int(((d.adet < 0) & d.ret).sum()),
    )

    # ---- yıl toplamları
    net = d.net.sum(); kargo = d.kargo.sum()
    gt = g[['kira', 'personel', 'pazarlama', 'hammadde']].sum()
    kar = net - kargo - gt.sum()
    T = dict(
        siparis=len(d), adet=int(d.adet.sum()), brut=r(d.brut.sum()), indirim=r(d.indtl.sum(), 2),
        tutar=r(d.tutar.sum(), 2), iade_tutar=r(d[d.ret].tutar.sum(), 2), iade_adet=int(d.ret.sum()),
        iade_oran=r(d.ret.mean() * 100, 2), net=r(net, 2), kargo=r(kargo), kira=r(gt.kira), personel=r(gt.personel),
        pazarlama=r(gt.pazarlama), hammadde=r(gt.hammadde), gider=r(gt.sum()), kar=r(kar, 2),
        marj=r(kar / net * 100, 2), hammadde_oran=r(gt.hammadde / net * 100, 2), kargo_oran=r(kargo / net * 100, 2),
        sepet=r(d.tutar.mean(), 2),
    )
    T['sabit_aylik'] = r((gt.kira + gt.personel) / 12)
    T['katki_orani'] = r(1 - gt.hammadde / net - kargo / net, 4)
    T['basabas_aylik'] = r((gt.kira + gt.personel + gt.pazarlama) / 12 / T['katki_orani'])
    M['yil'] = T

    # ---- aylık
    a = d.groupby('ay').agg(siparis=('no', 'count'), tutar=('tutar', 'sum'), net=('net', 'sum'), iade=('ret', 'sum'),
                            kargo=('kargo', 'sum'), indirim=('indtl', 'sum'), adet=('adet', 'sum'))
    a = a.join(g.set_index('ay'))
    a['gider'] = a[['kira', 'personel', 'pazarlama', 'hammadde']].sum(axis=1)
    a['kar'] = a.net - a.kargo - a.gider
    a['iade_oran'] = a.iade / a.siparis * 100
    a['basabas'] = (a.kira + a.personel + a.pazarlama) / (1 - a.hammadde / a.net - a.kargo / a.net)
    M['aylik'] = [dict(ay=k, ad=AYLAR[i], **{c: r(v, 2) for c, v in row.items()}) for i, (k, row) in enumerate(a.iterrows())]
    kar_ay = a[a.kar > 0]
    M['kis'] = dict(kar_ay=list(kar_ay.index), kar_ay_kar=r(kar_ay.kar.sum()), zarar_ay_zarar=r(a[a.kar <= 0].kar.sum()),
                    kar_ay_net=r(kar_ay.net.sum()), kar_ay_net_pay=r(kar_ay.net.sum() / net * 100, 1),
                    yaz_ort=r(a.loc['2025-04':'2025-08'].net.mean()), yaz_toplam=r(a.loc['2025-04':'2025-08'].net.sum()))

    # ---- kanal
    def katki(x):  # hammadde oranı yıl ortalaması (net satışın %32'si) — sabit oranlı katkı
        return x.net.sum() * (1 - T['hammadde_oran'] / 100) - x.kargo.sum()

    ks = []
    for k in KANALLAR:
        x = d[d.kanal == k]
        ks.append(dict(kanal=k, siparis=len(x), brut=r(x.brut.sum()), indirim=r(x.indtl.sum(), 2), tutar=r(x.tutar.sum(), 2),
                       iade_tutar=r(x[x.ret].tutar.sum(), 2), net=r(x.net.sum(), 2), kargo=r(x.kargo.sum()),
                       iade_oran=r(x.ret.mean() * 100, 2), pay=r(x.net.sum() / net * 100, 1),
                       sepet=r(x.tutar.mean(), 1), katki=r(katki(x)), katki_siparis=r(katki(x) / len(x), 1),
                       hammadde=r(x.net.sum() * T['hammadde_oran'] / 100),
                       katki_liste=r(katki(x) / x.brut.sum() * 100, 1),
                       indirim_oran=r(x.indtl.sum() / x.brut.sum() * 100, 2)))
    M['kanal'] = ks
    kp = d.pivot_table(index='ay', columns='kanal', values='net', aggfunc='sum')[KANALLAR]
    M['kanal_ay_net'] = {k: [r(v, 1) for v in kp[k]] for k in KANALLAR}
    ip = d.pivot_table(index='ay', columns='kanal', values='ret', aggfunc='mean')[KANALLAR] * 100
    M['kanal_ay_iade'] = {k: [r(v, 2) for v in ip[k]] for k in KANALLAR}

    # ---- Trendyol iade sıçraması
    t = d[d.kanal == 'Trendyol']
    once = t[t.tarih < '2025-08-01']; sonra = t[t.tarih >= '2025-08-01']
    o18 = t[t.tarih < '2025-08-18']; s18 = t[t.tarih >= '2025-08-18']
    fazla = (sonra.ret.mean() - once.ret.mean()) * sonra.tutar.sum()
    M['trendyol_iade'] = dict(
        once_oran=r(once.ret.mean() * 100, 2), sonra_oran=r(sonra.ret.mean() * 100, 2),
        once18=r(o18.ret.mean() * 100, 2), sonra18=r(s18.ret.mean() * 100, 2),
        once_sip=len(once), sonra_sip=len(sonra), sonra_tutar=r(sonra.tutar.sum()),
        fazla_iade_ciro=r(fazla), fazla_iade_katki=r(fazla * (1 - T['hammadde_oran'] / 100)),
        fazla_iade_adet=r((sonra.ret.mean() - once.ret.mean()) * len(sonra)),
        diger_once=r(d[(d.kanal != 'Trendyol') & (d.tarih < '2025-08-01')].ret.mean() * 100, 2),
        diger_sonra=r(d[(d.kanal != 'Trendyol') & (d.tarih >= '2025-08-01')].ret.mean() * 100, 2),
        urun={u: [r(once[once.urun == u].ret.mean() * 100, 1) if (once.urun == u).any() else None,
                  r(sonra[sonra.urun == u].ret.mean() * 100, 1)] for u in URUNLER if (t.urun == u).any()},
    )
    hf = t.groupby(t.tarih.dt.to_period('W')).ret.agg(['mean', 'count'])
    M['trendyol_hafta_iade'] = [[str(p.start_time.date()), r(v['mean'] * 100, 1), int(v['count'])] for p, v in hf.iterrows()]

    # ---- Trendyol indirimleri
    ti = t[t.ind > 0]
    M['trendyol_indirim'] = dict(
        pay_siparis=r((t.ind > 0).mean() * 100, 1), indirim_tl=r(t.indtl.sum(), 2), toplam_indirim=r(d.indtl.sum(), 2),
        tum_indirim_payi=r(t.indtl.sum() / d.indtl.sum() * 100, 1), indirimli_sip=len(ti), ort_indirim=r(t.indtl.sum() / t.brut.sum() * 100, 2),
        adet_indirimli=r(ti.adet.mean(), 3), adet_indirimsiz=r(t[t.ind == 0].adet.mean(), 3),
        iade_indirimsiz=r(t[t.ind == 0].ret.mean() * 100, 1), iade_10=r(t[t.ind == 0.10].ret.mean() * 100, 1),
        iade_15=r(t[t.ind == 0.15].ret.mean() * 100, 1),
        ay_pay=[r((t[t.ay == k].ind > 0).mean() * 100, 1) for k in a.index],
        yarim_kazanc=r(t.indtl.sum() / 2),
        katki_indirimli_siparis=r(ti.net.mean() * (1 - T['hammadde_oran'] / 100) - ti.kargo.mean(), 1),   # iade edilenler 0 ciro (Excel ile aynı)
    )
    G_ = M['trendyol_indirim']['yarim_kazanc']; NC_ = len(ti) * M['trendyol_indirim']['katki_indirimli_siparis']
    M['trendyol_indirim']['basabas_kayip_oran'] = r(G_ / (G_ + NC_) * 100, 1)   # G(1-x) = x*N*c
    M['trendyol_indirim']['duyarlilik'] = [[x, r(G_ * (1 - x / 100) - x / 100 * NC_)] for x in range(0, 21, 2)]
    M['trendyol_komisyon_1pct'] = r(t.net.sum() * 0.01)

    # ---- ürün
    us = []
    for u in URUNLER:
        x = d[d.urun == u]
        us.append(dict(urun=u, kat=x.kat.iloc[0], fiyat=int(x.fiyat.iloc[0]), siparis=len(x), adet=int(x.adet.sum()), net=r(x.net.sum(), 2),
                       pay=r(x.net.sum() / net * 100, 1), sepet=r(x.tutar.mean(), 1), iade_oran=r(x.ret.mean() * 100, 2),
                       kargo=r(x.kargo.sum()), kargo_oran=r(x.kargo.sum() / x.net.sum() * 100, 2),
                       indirim=r(x.indtl.sum(), 2), ilk=str(x.tarih.min().date())))
    M['urun'] = us
    up = d.pivot_table(index='ay', columns='urun', values='net', aggfunc='sum').reindex(columns=URUNLER).fillna(0)
    M['urun_ay_net'] = {u: [r(v, 1) for v in up[u]] for u in URUNLER}
    kt = d.groupby('kat').agg(net=('net', 'sum'), sip=('no', 'count'), kargo=('kargo', 'sum'))
    M['kategori'] = {k: dict(net=r(v.net, 2), pay=r(v.net / net * 100, 1), sip=int(v.sip), kargo=r(v.kargo)) for k, v in kt.iterrows()}
    cay_online = d[(d.kat == 'Çay') & (d.kanal != 'Mağaza')]
    M['cay_online'] = dict(siparis=len(cay_online), net=r(cay_online.net.sum()), kargo=r(cay_online.kargo.sum()),
                           kargo_oran=r(cay_online.kargo.sum() / cay_online.net.sum() * 100, 1), sepet=r(cay_online.tutar.mean(), 1),
                           kargo_orani_toplam=r(cay_online.kargo.sum() / net * 100, 2))
    M['kargo_ucret'] = {k: int(d[d.kanal == k].kargo.max()) for k in KANALLAR}

    # ---- bardak kesintisi (1 Nis – 31 May)
    b = d[d.urun == 'İnce Belli Bardak 6lı']
    gun = pd.date_range('2025-01-01', '2025-12-31')
    bd = b.groupby('tarih').size().reindex(gun, fill_value=0)
    M['bardak_gunluk'] = [int(v) for v in bd]
    bhaf = b.groupby(b.tarih.dt.to_period('W')).size()
    M['bardak_hafta'] = [[str(p.start_time.date()), int(v)] for p, v in bhaf.items()]
    dz = d[d.urun == 'Demlik Seti (el yapımı)']
    dhaf = dz.groupby(dz.tarih.dt.to_period('W')).size().reindex(bhaf.index, fill_value=0)
    M['demlik_hafta'] = [int(v) for v in dhaf]
    ihaf = b[b.kanal == 'Instagram DM'].groupby(b[b.kanal == 'Instagram DM'].tarih.dt.to_period('W')).size().reindex(bhaf.index, fill_value=0)
    M['bardak_dm_hafta'] = [int(v) for v in ihaf]
    k0, k1 = pd.Timestamp('2025-04-01'), pd.Timestamp('2025-05-31')
    ndays = (k1 - k0).days + 1
    kayip_sip = 0.0; ozet = {}
    for k in KANALLAR:
        x = b[b.kanal == k]
        mar = len(x[(x.tarih >= '2025-03-01') & (x.tarih <= '2025-03-31')]) / 31
        tem = len(x[(x.tarih >= '2025-07-01') & (x.tarih <= '2025-07-31')]) / 31
        gercek = len(x[(x.tarih >= k0) & (x.tarih <= k1)])
        beklenen = (mar + tem) / 2 * ndays
        ozet[k] = dict(mart_gun=r(mar, 2), temmuz_gun=r(tem, 2), gercek=gercek, beklenen=r(beklenen, 0))
        if k != 'Instagram DM':   # DM etkilenmemiş görünüyor
            kayip_sip += max(beklenen - gercek, 0)
    aov = b[b.kanal != 'Instagram DM'].net.sum() / len(b[b.kanal != 'Instagram DM'])
    aov = b[b.kanal != 'Instagram DM'].tutar.mean()
    kayip_ciro = kayip_sip * aov * (1 - b.ret.mean())
    M['bardak'] = dict(kanal=ozet, kayip_siparis=r(kayip_sip), aov=r(aov, 1), kayip_ciro=r(kayip_ciro),
                       kayip_katki=r(kayip_ciro * T['katki_orani'] + 0),
                       gun=ndays, gercek_toplam=int(len(b[(b.tarih >= k0) & (b.tarih <= k1)])),
                       mart_gunluk=r(len(b[(b.tarih >= '2025-03-01') & (b.tarih <= '2025-03-31')]) / 31, 1),
                       nis_may_gunluk=r(len(b[(b.tarih >= k0) & (b.tarih <= k1)]) / ndays, 1),
                       demlik_nis_may=r(d[(d.urun == 'Demlik Seti (el yapımı)') & (d.ay.isin(['2025-04', '2025-05']))].net.sum() / 2),
                       demlik_mar=r(d[(d.urun == 'Demlik Seti (el yapımı)') & (d.ay == '2025-03')].net.sum()))

    # ---- Atölye
    at = d[d.kat == 'Deneyim']
    M['atolye'] = dict(rez=len(at), kisi=int(at.adet.sum()), net=r(at.net.sum()), sepet=r(at.tutar.mean(), 1),
                       cumartesi=int((at.tarih.dt.dayofweek == 5).sum()), kanal={k: int((at.kanal == k).sum()) for k in KANALLAR},
                       seans_basi=r(len(at) / 52, 1), kisi_seans=r(at.adet.sum() / 52, 1), ciro_seans=r(at.net.sum() / 52),
                       ay_net=[r(at[at.ay == k].net.sum()) for k in a.index], ay_rez=[int((at.ay == k).sum()) for k in a.index])
    hg = d.groupby(d.tarih.dt.dayofweek).agg(net=('net', 'sum'))
    hg2 = d[d.kat != 'Deneyim'].groupby(d.tarih.dt.dayofweek).agg(net=('net', 'sum'))
    M['haftaici'] = dict(tum=[r(v) for v in hg.net], atolyesiz=[r(v) for v in hg2.net])

    # ---- pazarlama
    M['pazarlama'] = dict(
        aylik=[r(v) for v in a.pazarlama], net=[r(v) for v in a.net],
        net_basina=[r(n / p, 1) for n, p in zip(a.net, a.pazarlama)],
        oran=[r(p / n * 100, 1) for n, p in zip(a.net, a.pazarlama)],
        eki_farki=r(a.loc['2025-10', 'pazarlama'] - a.loc['2025-09', 'pazarlama']),
        eki_net_farki=r(a.loc['2025-10', 'net'] - a.loc['2025-09', 'net']),
        oca_sub_ort_net=r(a.loc['2025-01':'2025-02'].net.mean()), oca_sub_ort_paz=r(a.loc['2025-01':'2025-02'].pazarlama.mean()),
        kas_ara_ort_net=r(a.loc['2025-11':'2025-12'].net.mean()), kas_ara_ort_paz=r(a.loc['2025-11':'2025-12'].pazarlama.mean()),
        eki_ara_toplam=r(a.loc['2025-10':'2025-12'].pazarlama.sum()), oran_yil=r(gt.pazarlama / net * 100, 1))

    # ---- çay portföyü (Kadıköy lansmanı)
    cay = d[d.kat == 'Çay']
    cp = cay.pivot_table(index='ay', columns='urun', values='net', aggfunc='sum').fillna(0)
    M['cay'] = dict(
        adacayi_oca_sub=r(cp.loc['2025-01':'2025-02', 'Adaçaylı Bergamot 100g'].mean()),
        adacayi_kas_ara=r(cp.loc['2025-11':'2025-12', 'Adaçaylı Bergamot 100g'].mean()),
        kadikoy_kas_ara=r(cp.loc['2025-11':'2025-12', 'Kadıköy Akşamı 250g'].mean()),
        karadeniz_oca_sub=r(cp.loc['2025-01':'2025-02', 'Karadeniz Sabahı 250g'].mean()),
        karadeniz_kas_ara=r(cp.loc['2025-11':'2025-12', 'Karadeniz Sabahı 250g'].mean()),
        cay_oca_sub=r(cp.loc['2025-01':'2025-02'].sum(axis=1).mean()), cay_kas_ara=r(cp.loc['2025-11':'2025-12'].sum(axis=1).mean()),
        kadikoy_iade_trendyol=r(t[t.urun == 'Kadıköy Akşamı 250g'].ret.mean() * 100, 1))

    # ---- fiyat / senaryolar
    fiyat_1 = net * 0.01
    M['fiyat'] = dict(
        degisim=int(d.groupby('urun').fiyat.nunique().max()),
        bir_yuzde_kar=r(fiyat_1),
        senaryo_artis=3.0, senaryo_hacim_kaybi=1.5,
    )
    p, v = 0.03, 0.015
    yeni_net = net * (1 + p) * (1 - v)
    dk = (yeni_net - net) + gt.hammadde * v + kargo * v
    M['fiyat']['senaryo_kar'] = r(dk)
    M['kargo_pazarlik_10'] = r(kargo * 0.10)

    # köprü
    kopru = [
        ('Bugünkü kâr', T['kar']),
        ('Bardak stoku kesilmese', M['bardak']['kayip_katki']),
        ('Trendyol iadesi normale dönse', M['trendyol_iade']['fazla_iade_katki']),
        ('%3 fiyat güncellemesi', M['fiyat']['senaryo_kar']),
        ('Kargo sözleşmesi -%10', M['kargo_pazarlik_10']),
    ]
    M['kopru'] = [[n, r(v)] for n, v in kopru]
    M['kopru_toplam'] = r(sum(v for _, v in kopru))

    # ---- veri boşlukları için Kadıköy vb
    M['gunluk_siparis'] = dict(ort=r(len(d) / 365, 1), max=int(d.groupby('tarih').size().max()), min=int(d.groupby('tarih').size().min()))
    M['kanal_urun_iade'] = {k: {u: r(d[(d.kanal == k) & (d.urun == u)].ret.mean() * 100, 1) for u in URUNLER if ((d.kanal == k) & (d.urun == u)).any()} for k in KANALLAR}

    with open('metrics.json', 'w', encoding='utf-8') as f:
        json.dump(M, f, ensure_ascii=False, indent=1)
    print(json.dumps({k: M[k] for k in ['yil', 'kalite', 'kis', 'bardak', 'trendyol_iade', 'trendyol_indirim', 'fiyat', 'kopru', 'kopru_toplam', 'cay_online', 'atolye', 'pazarlama', 'cay']}, ensure_ascii=False, indent=1))


if __name__ == '__main__':
    main()
