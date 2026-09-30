# Demlik 2025 — teslim

## Hazırlanan dosyalar

| Dosya | İçerik | Açılış |
|---|---|---|
| **rapor.pdf** | 7 sayfalık, yatay A4 yönetim raporu. Sonuç, aylık performans, kanallar, ürünler, 90 günlük plan ve yöntem. | Herhangi bir PDF okuyucu |
| **rapor.html** | Aynı raporun çevrimdışı, mobil uyumlu sürümü. Bölüm gezintisi ve etkileşimli komisyon testi. | Dosyaya çift tıklayın veya Chromium ile açın |
| **panel.xlsx** | Formüller, 4 düzenlenebilir Excel grafiği, kaynak tablolar, yıl seçimi, komisyon testi, mutabakatlar ve kullanım rehberi. | Excel veya LibreOffice Calc |
| **BULGULAR.md** | Ayrıntılı bulgular, hesap tanımları, varsayımlar, veri temizleme izi ve öneriler. | Metin/Markdown okuyucu |

Raporun ana bulgusu: **4.908.772,25 TL net satışa karşılık, dosyada bulunan giderler sonrası 70.787,25 TL kalıyor.** Bu tutar eksik komisyon/vergi/stok bilgisi nedeniyle muhasebe kârı değildir. Öncelikler Trendyol iadeleri, sekiz negatif ayın planlanması ve gerçek gider tabanının tamamlanmasıdır.

Kaynak dosya yalnız okundu; değiştirilmedi. 12 birebir kopya analizden çıkarıldı, Excel kaynak sayfasında işaretlenerek korundu. Altı `web sitesi` yazımı hesaplanan sütunda `Web sitesi` ile birleştirildi. Grafikler ve marka işareti kodla üretildi; görsel üretim modeli kullanılmadı, dışarıdan görsel/ikon/font indirilmedi.

## Excel’i güncelleme

1. Önce dosyanın bir çalışma kopyasını alın. `Satışlar` sayfasındaki filtrelenebilir `Sat` tablosuna yeni kayıt ekleyin. Tablonun son satırının son hücresinde **Tab** tuşu tabloyu genişletir. **A:K** giriş alanlarını doldurun, **L / Dahil** alanına geçerli kayıt için **1** yazın. Doğrulanmış kopyayı saklayıp hariç bırakmak için **0** kullanın.
2. **M:P hesap sütunlarıdır.** Excel için hesaplanan tablo sütunu tanımları dosyada var. Uygulamanız formülleri yeni satıra otomatik taşımıyorsa üst satırın M:P hücrelerini aşağı kopyalayın. Formüllerin üzerine veri yapıştırmayın.
3. `Giderler` sayfasındaki `Gid` tablosuna her ay için tek satır ekleyin. Ay gerçek Excel tarihi ve ayın ilk günü olmalı. Bilinen sıfır gideri **0**, henüz bilinmeyeni **boş** bırakın. **F / Eksik alan** formülünü kontrol edin; gerekiyorsa üstten kopyalayın.
4. `Panel!D5` hücresinden yılı seçin. Otomatik hesaplama açık olmalı; Excel’de **Ctrl+Alt+F9** ile yeniden hesaplanabilir. Aylık grafikler, net satış ve komisyon testi güncellenir. Yıllık sonuç 12 tamamlanmış ay ister; eksik gider ayında `n.a.` görünür.
5. `Kullanım` sayfasındaki fark kontrollerini izleyin. Kaynak kayıt / hariç kayıt sayıları dışında farkların sıfır olması beklenir. Yeni kanal veya ürün varsa `Kanal ve Ürün` özetine mevcut satırı kopyalayıp adını değiştirin, toplam kontrolü ve ilgili grafik aralıklarını genişletin. Mevcut satır sırası 2025 büyüklüğüne göredir; kendiliğinden yeniden sıralanmaz.

**Komisyon testi:** `Panel!N30` hücresindeki %10 yalnız bir varsayımdır; gerçek gider değildir. Bu oran sadece Trendyol net satışına uygulanır. Test, gerçekleşen sonuç hücresini değiştirmez.

**Tarih girişi:** `01.01.2026` gibi gerçek tarih kullanın. Kaynak dosyadaki metin tarihlerini elle aktarırken Excel’in tarihe dönüştürdüğünü doğrulayın. Kopya kontrolünü sipariş numarası ve tüm alanlarla yapın. Kaynakta her tekil sipariş bir ürün satırıdır; ileride çok satırlı sipariş sistemine geçilirse adet/oran tanımları yeniden ele alınmalıdır.

PDF ve HTML, **2025 analizinin sabit sürümleridir**. Excel değişince kendiliğinden güncellenmezler. HTML’de komisyon sürgüsünü değiştirmek sadece o test görünümünü etkiler; yazdırma sırasında seçilen test değeri basılır.

## Yapılan kontroller

- Temiz satışlar Python ile bağımsız toplandı; aylık, kanal ve ürün sonuçları Excel formül sonuçlarıyla karşılaştırıldı.
- LibreOffice’te **133 hesap ve davranış kontrolü** geçti: temel toplamlar, fiyat/adet/tutar değişimi, iade, komisyon oranı, boş/sıfır gider ayrımı, yıl seçimi, tabloya yeni satış ekleme ve yeni kaydı hariç bırakma.
- Son Excel dosyası filtre ve hesaplanan sütun tanımları eklendikten sonra LibreOffice’te tekrar açıldı; net satış ve sonuç doğrulandı. Yerel Excel grafikleri ve altı sayfa PDF önizlemesine alındı.
- Beklenmeyen Excel formül hatası bulunmadı. Kullanım sayfasındaki mutabakat farkları sıfır. Verinin ilk ve son tarihleri 01.01.2025 / 31.12.2025; tüm kaynak satırlar korunuyor.
- HTML Chromium’da masaüstü ve 390 px mobil genişlikte açıldı. JavaScript hatası ve yatay sayfa taşması yok. Komisyon sürgüsü %0 ve %20 uçlarında kontrol edildi.
- Nihai 7 PDF sayfası görüntüye çevrilip gözden geçirildi. Sayfa taşmaları düzeltildi; son sürümde başlıklar, grafikler, tablolar ve dipnotlar sayfa içinde.
- Microsoft Excel uygulaması bu Linux ortamında çalıştırılmadı. Dosya makrosuz `.xlsx` ve standart Excel formülleri/grafikleri kullanır; yeniden hesaplama LibreOffice ile doğrulandı.

## Teknik dosyalar

Gündelik kullanım için yukarıdaki dört çıktı yeterli; kurulum veya internet gerekmez.

`calisma/` analiz JSON’u, hesap kontrol günlükleri ve görsel önizlemeleri içerir. `analiz.py`, `panel-uret.mjs`, `excel-son-islem.py`, `rapor-uret.py`, `bulgular-uret.py`, `tarayici-kontrol.mjs`, `libreoffice-kontrol.py` ve `excel-gorsel-kontrol.py` yeniden üretim/denetim kaynaklarıdır. `node_modules` bu makinedeki mevcut çalışma zamanı bağımlılıklarına bağlantıdır; nihai dosyalar buna bağımlı değildir.

Bu ortamda yeniden üretim sırası:

```bash
/home/forn/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python analiz.py
node panel-uret.mjs
/home/forn/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python excel-son-islem.py
/home/forn/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python rapor-uret.py
node tarayici-kontrol.mjs
/home/forn/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python bulgular-uret.py
```

Bu betikler özgün 2025 kaynak dosyasını esas alır ve çıktıları yeniden yazar. İşletmenin sonradan düzenlediği `panel.xlsx` dosyasını kaybetmemek için yeniden üretimi ayrı bir klasörde/kopyada yapın. Rapor metinleri 2025 için editoryal olarak yazılmıştır; farklı yıl/veriyle yeniden kullanımda sayılar kadar yorumlar da yeniden analiz edilmelidir.
