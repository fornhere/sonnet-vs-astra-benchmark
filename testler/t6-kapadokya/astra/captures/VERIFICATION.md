# Tarayıcı doğrulaması

- `test-results.json`: 18 işlevsel kontrol geçti; JavaScript/WebGL hatası gözlenmedi.
- `mobile-check.json`: gerçek dokunma olaylarıyla joystick hareketi ve sürükleyerek bakış kontrolü geçti.
- `01-opening.png`: son derlemenin Chromium'da **doğrudan file:// üzerinden**, yükleme ekranı kapandıktan sonra alınmış açılış görüntüsü. Görsel olarak incelendi.
- `09-mobile-explore.png`: son mobil geometri sadeleştirmesiyle 390 × 844 görünüm; joystick, yükselme/alçalma, harita ve alt kontroller görsel olarak incelendi.
- Diğer kareler geliştirme sırasında kullanılan tur, yürüyüş, seyir noktası, ışık, balon ve fotoğraf kontrol görüntüleridir.

Testlerde ekran kartından bağımsız SwiftShader kullanıldı. Bunlar FPS ölçümü değildir. Nihai açılış görüntüsündeki sahne 146 çizim çağrısı kullanır; mobil sürüm daha düşük geometrik ayrıntı ile çizilir.

Son `app.js`, `npm run build` ile başarıyla derlendi. Çalıştırmak için Node, npm veya internet gerekmez.
