# Rota yatırımcı sunumu

12 slaytlık Türkçe tohum yatırım sunumu. Hikâye; toplam teslimat maliyeti sorunundan ürün deneyimine, mevcut performansa, iş modeline, pazar senaryosuna, büyüme planına ve yatırım talebine ilerler.

## Teslim dosyaları

- **sunum.pdf**: Ana teslim. Tam 16:9, 1200 × 675 punto, 12 sayfa. Yazı katmanı korunur, metinler seçilebilir. Sistem yazı tipleri PDF içinde gömülüdür.
- **sunum.html**: İnternet gerektirmeyen, tarayıcıda sunulabilen kaynak sunum.
- **KONUSMA.md**: Her slayt için 2–3 cümle konuşma notu.
- **kaynak/olustur.py**: Tüm slayt metinleri, SVG çizimler ve HTML üretimi.
- **kaynak/stil.css**: Renkler, tipografi, yerleşim ve baskı stilleri.
- **kaynak/sunum.js**: Klavye gezinmesi, ekran ölçekleme ve tam ekran kontrolü.
- **kaynak/pdf-uret.sh** ve **kaynak/pdf-boyut.py**: PDF’yi yeniden üretme ve sayfa sınırını tam 16:9 yapma.
- **kaynak/kontrol.mjs**: Tarayıcıda slayt sınırlarını ve klavye gezinmesini kontrol eder.
- **kaynak/VERI_NOTLARI.md**: Verilen rakamlar, hesaplamalar, varsayımlar ve eksik bilgilerin kaydı.
- **rota-kaynak.zip**: HTML, kaynak kod, konuşma notları ve bu kılavuzun taşınabilir paketi. PDF ayrı teslim edilir.
- **kontrol/**: PDF’den alınan slayt PNG’leri ve yerel kontrol kayıtları. Sunumu açmak için gerekmez.

## Nasıl açılır?

PDF’yi herhangi bir PDF görüntüleyiciyle açın. Canlı sunum için `sunum.html` dosyasını Chromium veya Chrome’da açın; sunucu veya internet gerekmez.

- Sağ / sol ok, Page Down / Page Up: sonraki / önceki slayt.
- Boşluk: sonraki slayt.
- Home / End: ilk / son slayt.
- F: tam ekranı aç / kapat.
- Altta, fareyle üzerine gelindiğinde görünen kontrol çubuğu da kullanılabilir.
- Belirli bir slayta doğrudan gitmek için dosya adresinin sonuna `#s7` gibi bir bölüm ekleyin.

## Nasıl düzenlenir ve yeniden üretilir?

Metinleri ve şekilleri `kaynak/olustur.py`, görünümü `kaynak/stil.css` içinde düzenleyin. `sunum.html` üretilen dosyadır; doğrudan burada yapılan değişiklikler yeniden üretimde üzerine yazılır.

Çalışma klasöründe:

```bash
python3 kaynak/olustur.py
```

PDF için:

```bash
bash kaynak/pdf-uret.sh
```

Gerekenler: Python 3, Chromium, qpdf ve Poppler (`pdfinfo`, `pdftoppm`, `pdftotext`). Python veya npm paketi yüklemek gerekmez. Kaynaklar sistemdeki açık lisanslı Adwaita Sans ve Noto Sans yazı tiplerini kullanır; bunlar yoksa tarayıcı sans-serif yedeğine geçer ve HTML’de küçük yerleşim farkları olabilir. Teslim PDF’si font kurulumuna ihtiyaç duymaz.

İsteğe bağlı tarayıcı kontrolü için Node 22 veya üzeri:

```bash
node kaynak/kontrol.mjs
```

## Veri sınırları

Sağlanan rakamlar korunmuştur. Yeni niceliklerden pazar senaryosu, kaynak dağılımı ve plan dönemleri açıkça tahmin olarak işaretlenmiştir. 2.000 TL aylık gelir/aktif satıcı oranı verilen metriklerden hesaplanmıştır; fiyat veya ödeyen müşteri ARPA’sı değildir. Ürün ekranı temsilidir.

Kurucu kimlikleri, geçmiş deneyim, müşteri sonuçları, kohortlar ve nakit bütçesi verilmediği için uydurulmamıştır. Gerçek yatırım görüşmesine uyarlarken tamamlanabilecek alanlar `kaynak/VERI_NOTLARI.md` dosyasında belirtilmiştir.

## Yapılan kontrol

12 sayfanın tamamı PNG olarak görüntülendi. Temsili ürün ekranı Chromium’da açıldı ve ekran görüntüsü incelendi. Slayt sınırları, klavye gezinmesi, sayfa sayısı, PDF yapısı, 16:9 ölçüsü ve temel rakamların PDF metninde korunması doğrulandı. Tüm görseller kodla üretildi; görsel üretim modeli veya indirilen görsel, ikon, font dosyası kullanılmadı.
