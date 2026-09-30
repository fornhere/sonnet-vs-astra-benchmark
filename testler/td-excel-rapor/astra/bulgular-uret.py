from pathlib import Path
import json
R=Path(__file__).resolve().parent; d=json.loads((R/'calisma/veri.json').read_text());t=d['totals']
def tr(x,n=2):return f'{x:,.{n}f}'.replace(',','@').replace('.',',').replace('@','.')
md=f'''# Demlik 2025 — bulgular ve karar notu

Analiz dönemi: **1 Ocak–31 Aralık 2025**. Kaynak: `demlik-satis-2025.xlsx`, `Satışlar!A1:K8637` ve `Giderler!A1:E13`. Bu, 2025 gerçekleşenlerinin değerlendirmesidir; 2026 performansına ilişkin iddia veya tahmin içermez.

## Yöneticiye ana mesaj

**4.908.772,25 TL net satışa rağmen, dosyadaki giderler sonrası yalnız 70.787,25 TL kalıyor (%1,44).** Komisyon, vergi, finansman ve stok değişimi verisi eksik olduğundan bu tutar net kâr veya nakit akışı değildir. Satış büyümesinden önce maliyet tabanını tamamlamak ve Trendyol iadelerindeki artışı çözmek gerekir.

## Doğrulanmış göstergeler

| Gösterge | Değer | Tanım |
|---|---:|---|
| Analize alınan sipariş | 8.624 | 12 birebir kopya hariç, sipariş numarası tekil |
| Liste değeri | 5.262.920,00 TL | Adet × birim fiyat |
| İndirim | 120.126,75 TL | Liste değeri − kaynak satış tutarı |
| İndirim sonrası tutar | 5.142.793,25 TL | İadeler düşülmeden önce |
| İade tutarı | 234.021,00 TL | İade=Evet kayıtlarının satış tutarı |
| Net satış | 4.908.772,25 TL | İndirim sonrası tutar − iadeler |
| İade oranı | %4,66 | 402 / 8.624 sipariş |
| İadesiz ortalama sipariş | 597,03 TL | Net satış / 8.222 iadesiz sipariş |
| Kargo gideri | 223.456,00 TL | İade edilenler dahil tüm geçerli kayıtlar |
| Hammadde gideri | 1.572.529,00 TL | Kaynak aylık gider; COGS olduğu doğrulanmadı |
| Kira + personel + pazarlama | 3.042.000,00 TL | 1.020.000 + 1.704.000 + 318.000 |
| Bilinen giderler sonrası sonuç | 70.787,25 TL | Net satış − yukarıdaki kayıtlı giderler |

## Karar gerektiren yedi bulgu

1. **Yıllık sonuç çok kırılgan.** Trendyol net satışı 1.238.455,25 TL. Bu matraha uygulanacak %5,71577 ek gider, 70.787,25 TL’yi sıfırlar. Gerçek oran bilinmiyor. Yalnız %10 varsayımsal komisyon testinde ek gider 123.845,53 TL, kalan sonuç **−53.058,28 TL**. Kaynak: temiz satışların Kanal=Trendyol toplamı ve yıllık gider toplamı. Excel: `Panel!N30:N36`.

2. **Mart–Ekim boyunca sekiz ay negatif.** Bu ayların toplamı **−413.162,25 TL**; Ocak, Şubat, Kasım ve Aralık toplamı +483.949,50 TL. Nisan en zayıf ay: −97.631,75 TL. Tahsilat/ödeme tarihleri olmadığı için 413,2 bin TL nakit ihtiyacı olarak sunulmadı. Kaynak: satış tarihine göre aylık toplama ve `Giderler` ayları. Excel: `Aylık hesap!C23:N23`.

3. **Trendyol iadesinde belirgin dönem kırılması var.** İlk yarı 31/1.139 = **%2,72**; ikinci yarı 196/1.336 = **%14,67**; artış 11,95 yüzde puan ve yaklaşık 5,39 kat. Aylık oran ağustosta %15,32’ye çıkıyor, ağustos–aralık %14,47–17,39 arasında. Yıllık 402 iadenin 227’si (%56,47) bu kanalda; satış payı %25,23. Operasyonel sebep dosyada yok. İncelenecekler: iade gerekçesi, ürün ve paketleme, teslimat, ürün sayfası. Kaynak: tarih + kanal + iade işareti.

4. **İndirim yükü tek kanalda yoğunlaşıyor.** Trendyol indirimi **118.700,75 TL**, tüm indirimin %98,81’i; kanal liste değerinin %8,04’ü. İndirimli/iadesiz sipariş katkısını gerçek maliyetle ölçmeden kampanya büyütülmemeli. İndirimle iade arasında nedensellik kanıtı yok. Excel: `Kanal ve Ürün!G6:G9`.

5. **Ekipman yoğunlaşması ve bardak kırılması izlenmeli.** Demlik Seti 1.685.045 TL, İnce Belli Bardak 1.567.671 TL; birlikte net satışın **%66,26’sı**. Bardak mart 139.062 TL’den nisanda 20.160 TL’ye düşüyor (**%85,50**). Stok kesintisi olası açıklamalardan biri; stok verisi olmadığı için sebep olarak kabul edilmedi. Kaynak: ürün + satış tarihi. Excel ürün özeti: `Kanal ve Ürün!B15:I20`.

6. **Çay karması değişiyor ve kargo yükü yüksek.** Adaçaylı Bergamot ilk çeyrek 178.103,50 TL’den son çeyrek 57.833,25 TL’ye geriliyor (**%67,53**). Kadıköy Akşamı dosyada ilk kez ekimde görülüyor; son üç ayda 277.032 TL, son çeyrek net satışının %16,36’sı. Lansman tarihi, ikame veya müşteri kazanımı kanıtı yok. Çayda kargo/net satış %9,49, ekipmanda %2,57. Çoklu paket/ekipmanla birlikte satış, katkı ölçümüyle küçük ölçekte denenebilir.

7. **Pazarlama artışını ciro tek başına doğrulamıyor.** Ekim net satışı eylüle göre %11,52 artıyor. Pazarlama 30.000 TL’den 65.000 TL’ye çıkarken sonuç −12.133,50 TL’den −23.103 TL’ye geriliyor. Yeni ürün ve dönem etkileri ayrışmıyor; reklamın başarısız olduğu ya da ROAS değeri söylenemez. Kampanya bazlı ek katkı ve ilişkilendirme verisi toplanmalı.

## Başa baş hesabı: varsayımlar görünür

Yıllık katkı yaklaşımı = net satış − hammadde − kargo = **3.112.787,25 TL**. Katkı oranı = **%63,41**. Kira, personel ve pazarlama sabit; hammadde ve kargo net satışla oransal varsayılırsa:

- Yıllık yaklaşık başa baş satış: 3.042.000 / %63,412745 = **4.797.142,88 TL**.
- Aylık yıllık-ortalama eşdeğeri: **399.761,91 TL**. Aylık grafikte ise her ayın kendi gider/katkı oranı kullanılır.
- Güvenlik payı: (4.908.772,25 − 4.797.142,88) / 4.908.772,25 = **%2,27**.

Bu yaklaşım maliyet davranışına bağlıdır; muhasebe başa başı ya da satış tahmini değildir. Hammadde her ay satışın yaklaşık %32’si: kaynakta hesaplanmış/tahmini olabileceği bir **hipotezdir**, tedarik faturası ve stokla doğrulanmalıdır. Ürünlere bu oran dağıtılmadı.

## 90 günlük önerilen uygulama

| Zaman | Sorumlu önerisi | İş | Kontrol ölçütü |
|---|---|---|---|
| İlk 7 gün | Sahip + muhasebe | Komisyon, ödeme maliyeti, KDV durumu, stok ve kaynak giderleri mutabık kıl | 12 ayın gerçek maliyet tabanı; kopya temizliği |
| İlk 30 gün | E-ticaret + operasyon | Son 50 Trendyol iadesini kodla; en büyük iki sebep için pilot düzeltme | İade süresi dolmuş sipariş gruplarında ≤%5 pilot hedefi |
| 30–90 gün | Sahip + satış | 13 haftalık nakit planı, bardak stok kontrolü, çay paket testi | Haftalık plan sapması ve komisyon dahil katkı |

**Ayrı etki testleri (taahhüt değil):**

- 2025 ikinci yarı Trendyol hacmi ve iade edilen ortalama sipariş tutarı korunursa, %5 iade hedefi: (196 − 1.336 × %5) × (106.897,25 / 196) = **70.464,92 TL satış geri kazanımı**. Bu tutar ilave maliyetler, komisyon ve talep etkisi öncesidir; kâr artışı değildir.
- Kira + personel + pazarlama toplamında %5 tasarruf: **152.100 TL/yıl**. Satış, hizmet kalitesi ve uygulama maliyeti değişmiyor varsayımıyla. Uygulanabilirliği doğrulanmadı.
- Bu testler birbirine eklenerek sonuç tahmini yapılmadı.

## Veri hazırlama ve denetim izi

- Kaynaktaki **12 tam satır kopyası**, ilk kaydı korunarak analizin dışında tutuldu. İşlem sipariş numarasıyla kör silme değildir: tüm 11 alanın birebir aynı olduğu doğrulandı. Çıktı Excel’inde kaynak kayıtlar saklandı; hariç bırakılanların `Dahil` değeri 0. Diğerlerinde 1.
- `web sitesi` yazan **6 kayıt**, hesaplanan `Kanal grubu` sütununda `Web sitesi` olarak eşlendi. Kaynak `Kanal` sütunu korunuyor. İki kayıtta %15 indirim ve 38 TL kargo bulunması olası kanal kayıt hatasıdır; kanıt olmadığı için Trendyol’a taşınmadı.
- Kaynak metin tarihleri Excel’de gerçek tarihlere çevrildi. Kaynak tutarları ve giderleri değiştirilmedi.
- Hiçbir kaynak hücresi boş değil. Temizlenmiş sipariş numaraları tekil. 365 gün ve 12 gider ayı var. Tüm kaynak satırlarda `Tutar = ROUND(Adet × Fiyat × (1 − İndirim), 2)` sağlanıyor.
- Temizleme toplam tutarı 5.583,25 TL, iade tutarını 185 TL, net satışı 5.398,25 TL ve kargoyu 318 TL azaltır. Ham sonuç 75.867,50 TL; temiz sonuç 70.787,25 TL.

| Hariç kaynak satırı | Sipariş No | Tarih | İndirim sonrası tutar TL | Kargo TL |
|---:|---:|---|---:|---:|
'''
for x in d['excluded']:md+=f"| {x['Kaynak satır']} | {x['Sipariş No']} | {x['Tarih']} | {tr(x['Tutar (TL)'])} | {tr(x['Kargo Maliyeti (TL)'])} |\n"
md+='''
## Yorum sınırları

İadeler tam iade kabul edilip satış ayından düşülür; ayrı iade tarihi ve geri dönüş kargosu yoktur. Kayıtlı çıkış kargosu korunur. Tutarların KDV dahil/hariç oluşu bilinmiyor; kaynak TL tutarları olduğu gibi kullanıldı. Stok değişimi ve ürün maliyetleri olmadan brüt kâr/ürün kârlılığı hesaplanmadı. Müşteri kimliği olmadan tekrar alışveriş ve müşteri yaşam boyu değeri hesaplanmadı. Tek yıllık desen, kalıcı mevsimsellik veya neden-sonuç kanıtı sayılmadı.

## Dosyalar ve güncellik

`rapor.pdf` ve `rapor.html` aynı yedi bölümlük sabit 2025 analizidir. HTML’de komisyon varsayımıyla etkileşimli test yapılabilir. `panel.xlsx` formül ve yerel Excel grafikleriyle güncellenir; güncelleme talimatları `Kullanım` sayfasında. PDF/HTML, Excel değişince otomatik değişmez.

Kaynak SHA-256: `'''+d['checks']['source_sha256']+'`\n'
(R/'BULGULAR.md').write_text(md)
print('BULGULAR.md',len(md))
