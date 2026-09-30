import { D } from './dims.js';

const P = (fx, fn) => [fx, D - fn];
export function buildInfo(pts, nb) {
  const L = (k) => [pts[k][0], D - pts[k][1]];
  const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const bk = mid(P(283, 254), P(374, 226)), mb = mid(L('mbr_m'), L('mbr_b')), wb = mid(P(345, 340), P(404, 350)), qb = mid(P(303, 658), P(404, 656));
  // pin: [anahtar, konum, etiket yüksekliği, tür, ad, alt başlık, metin, görünüm]
  const lm = [
    { id: 'esb', pos: L('esb'), y: 50, name: 'Empire State Building', sub: '1931 · 443 m · 102 kat', text: '40 yıl boyunca dünyanın en yüksek binasıydı. Art deco kuleyi 410 günde, rekor hızla bitirdiler; tepesi geceleri renk renk aydınlanır.', v: { ty: 30, az: 28, el: 22, dist: 200 } },
    { id: 'chrysler', pos: L('chrysler'), y: 40, name: 'Chrysler Building', sub: '1930 · 319 m · 77 kat', text: 'Paslanmaz çelik taçlı, güneş ışını kemerleriyle bezeli art deco başyapıtı. Kısa süre dünyanın en yüksek binası oldu.', v: { ty: 28, az: 40, el: 20, dist: 150 } },
    { id: 'wtc', pos: L('wtc'), y: 70, name: 'One World Trade Center', sub: '2014 · 541 m (1776 ft)', text: 'Batı Yarımküre’nin en yüksek binası. Yüksekliği 1776 ft: Amerikan Bağımsızlık Bildirgesi’nin yılı.', v: { ty: 34, az: 30, el: 18, dist: 220 } },
    { id: 'liberty', pos: L('liberty'), y: 24, name: 'Özgürlük Heykeli', sub: '1886 · 93 m (kaide dahil)', text: 'Fransa’nın Amerika’ya hediyesi. Liberty Adası’nda, on bir köşeli yıldız biçimli Fort Wood’un üstünde durur.', v: { ty: 20, az: 20, el: 14, dist: 62 } },
    { id: 'timessq', pos: L('timessq'), y: 24, name: 'Times Meydanı', sub: '“Dünyanın Kavşağı”', text: 'Neon panoların kesintisiz yandığı, günde yüz binlerce kişinin geçtiği kavşak. Broadway ile 7. Cadde’nin “papyon”u.', v: { ty: 11, az: 16, el: 36, dist: 62 } },
    { id: 'grandcentral', pos: L('grandcentral'), y: 22, name: 'Grand Central Terminal', sub: '1913 · 44 peron', text: 'Dünyanın peron sayısı en fazla istasyonu. Ana salonun tavanında gökyüzü takımyıldızları resmedilidir.', v: { ty: 12, az: 30, el: 20, dist: 80 } },
    { id: 'rockefeller', pos: L('rockefeller'), y: 36, name: 'Rockefeller Center', sub: '1939 · 259 m (30 Rock)', text: 'Art deco iş kompleksi; buz pateni pisti ve Noel ağacıyla ünlü.', v: { ty: 24, az: 25, el: 20, dist: 110 } },
    { id: 'flatiron', pos: L('flatiron'), y: 24, name: 'Flatiron Binası', sub: '1902 · 87 m', text: 'Broadway ile 5. Cadde’nin kesiştiği üçgen parselde yükselen “ütü” biçimli erken gökdelen.', v: { ty: 12, az: 30, el: 20, dist: 60 } },
    { id: 'woolworth', pos: L('woolworth'), y: 30, name: 'Woolworth Building', sub: '1913 · 241 m', text: 'Gotik ayrıntılarıyla “ticaret katedrali”; 1913’ten 1930’a kadar dünyanın en yüksek binasıydı.', v: { ty: 14, az: 30, el: 20, dist: 90 } },
    { id: 'un', pos: L('un'), y: 26, name: 'Birleşmiş Milletler', sub: '1952 · Sekreterlik 154 m', text: 'Doğu Nehri kıyısındaki yeşil camlı Sekreterlik kulesi; uluslararası toprak sayılır.', v: { ty: 14, az: -30, el: 20, dist: 110 } },
    { id: 'vessel', pos: L('vessel'), y: 22, name: 'Vessel · Hudson Yards', sub: '2019 · 46 m · 154 merdiven', text: 'Bal peteği gibi birbirine bağlı merdivenlerden oluşan bakır renkli heykel.', v: { ty: 10, az: 30, el: 20, dist: 60 } },
    { id: 'cpark', pos: L('cpark'), y: 18, name: 'Central Park', sub: '1858 · 341 hektar', text: 'Şehrin ortasında yürüyüşle 2,5 km’lik bir yeşil dikdörtgen. Rezervuar, göller ve 18.000 ağaçla dolu.', v: { ty: 10, az: 25, el: 42, dist: 330 } },
    { id: 'met', pos: L('met'), y: 18, name: 'The Met', sub: '1870 · 5 milyon eser', text: 'Central Park’ın doğu kenarında, dünyanın en büyük sanat müzelerinden biri.', v: { ty: 10, az: 20, el: 22, dist: 100 } },
    { id: 'bkbr', pos: bk, y: 26, name: 'Brooklyn Köprüsü', sub: '1883 · 486 m ana açıklık', text: 'Çelik tel kullanılan ilk büyük asma köprü. Granit kuleleri sivri kemerli.', v: { ty: 14, az: 25, el: 22, dist: 130 } },
    { id: 'mbr', pos: mb, y: 26, name: 'Manhattan Köprüsü', sub: '1909 · 448 m ana açıklık', text: 'Çelik kafesli, üstünde metro hatları da geçen asma köprü.', v: { ty: 14, az: 25, el: 24, dist: 130 } },
    { id: 'wbr', pos: wb, y: 28, name: 'Williamsburg Köprüsü', sub: '1903 · 488 m ana açıklık', text: 'Açıldığında dünyanın en uzun asma köprüsüydü.', v: { ty: 14, az: 28, el: 24, dist: 140 } },
    { id: 'qbr', pos: qb, y: 26, name: 'Queensboro Köprüsü', sub: '1909 · konsol kafes', text: 'Roosevelt Adası’nın üstünden geçen çelik konsol köprü.', v: { ty: 14, az: 28, el: 24, dist: 150 } },
    { id: 'ellis', pos: L('ellis'), y: 14, name: 'Ellis Adası', sub: '1892–1954', text: 'On iki milyondan fazla göçmen Amerika’ya buradan girdi.', v: { ty: 10, az: 20, el: 24, dist: 70 } },
    { id: 'governors', pos: L('governors'), y: 14, name: 'Governors Adası', sub: 'Vaktiyle askeri üs', text: 'Bugün parkları ve piknik alanlarıyla şehrin yazlık kaçış noktası.', v: { ty: 8, az: 20, el: 30, dist: 120 } },
    { id: 'roosevelt', pos: L('roosevelt'), y: 16, name: 'Roosevelt Adası', sub: '3,2 km uzunluğunda', text: 'Doğu Nehri’ndeki ince ada. Teleferikle Manhattan’a bağlanır.', v: { ty: 8, az: 20, el: 30, dist: 150 } },
    { id: 'nyse', pos: L('nyse'), y: 20, name: 'Wall Street · NYSE', sub: 'Finans Bölgesi', text: 'Dünyanın en büyük borsasının kalbi.', v: { ty: 10, az: 30, el: 24, dist: 90 } },
    { id: 'washsq', pos: L('washsq'), y: 14, name: 'Washington Square', sub: 'Greenwich Village', text: 'Mermer kemeriyle Village’ın buluşma noktası.', v: { ty: 8, az: 20, el: 30, dist: 80 } },
    { id: 'columbia', pos: L('columbia'), y: 14, name: 'Columbia Üniversitesi', sub: '1754', text: 'Morningside Heights’ta Ivy League kampüsü.', v: { ty: 8, az: 20, el: 30, dist: 90 } },
  ];
  const hoods = Object.entries(nb).map(([name, p]) => ({ name, pos: [p[0], D - p[1]], water: /River|Harbor/.test(name) }));
  const views = {
    overview: { ty: 4, pos: [212, 505], az: 32, el: 35, dist: 1200 },
    downtown: { ty: 16, pos: L('wtc'), az: 38, el: 26, dist: 190 },
    midtown: { ty: 26, pos: L('esb'), az: 32, el: 24, dist: 260 },
    park: { ty: 8, pos: L('cpark'), az: 28, el: 44, dist: 360 },
    bridges: { ty: 14, pos: [332, D - 262], az: 32, el: 25, dist: 190 },
    liberty: { ty: 8, pos: L('liberty'), az: 24, el: 14, dist: 46 },
    street: { ty: 11.5, pos: L('timessq'), az: 8, el: 7, dist: 40 },
  };
  return { lm, hoods, views };
}
export function viewToCam(v, THREE) {
  if (v.cam) return { pos: new THREE.Vector3(...v.cam), target: new THREE.Vector3(...v.tgt) };
  const az = v.az * Math.PI / 180, el = v.el * Math.PI / 180; const t = new THREE.Vector3(v.pos[0], v.ty, v.pos[1]);
  const p = t.clone().add(new THREE.Vector3(-Math.sin(az) * Math.cos(el), Math.sin(el), Math.cos(az) * Math.cos(el)).multiplyScalar(v.dist));
  return { pos: p, target: t };
}
