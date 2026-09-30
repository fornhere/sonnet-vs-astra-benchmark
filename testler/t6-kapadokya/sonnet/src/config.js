// Dünya sabitleri ve ilgi noktaları (metre cinsinden; +x doğu, -z kuzey)
export const WORLD = 4096;          // kare dünya kenarı
export const RES = 2048;            // yükseklik dokusu çözünürlüğü
export const CELL = WORLD / RES;    // 2 m
export const HALF = WORLD / 2;

// ilgi noktaları — konumlar arazi üretimiyle uyumlu seçildi (bkz. tools/haritalar)
export const POIS = [
  {
    id: 'goreme', name: 'Göreme', x: 180, z: 120, r: 190, kind: 'town',
    text: 'Kayalara oyulmuş evleriyle bir vadi kasabası. 1985’te UNESCO Dünya Mirası listesine giren Göreme Milli Parkı’nın kalbi burası.',
  },
  {
    id: 'uchisar', name: 'Uçhisar Kalesi', x: -760, z: -430, r: 230, kind: 'castle',
    text: 'Yüzlerce odası, geçidi ve deliğiyle yekpare bir kaya. Bölgenin en yüksek noktalarından biri; tepesinden bütün vadiler görünür.',
  },
  {
    id: 'ask', name: 'Aşk Vadisi', x: 640, z: -640, r: 260, kind: 'valley',
    text: 'Boyları on metreyi aşan uzun, ince peribacalarıyla ünlü. Sert bazalt başlıklar, altındaki yumuşak tüfü milyonlarca yıl korudu.',
  },
  {
    id: 'guvercinlik', name: 'Güvercinlik Vadisi', x: -330, z: 560, r: 240, kind: 'valley',
    text: 'Kayalara oyulmuş binlerce güvercin yuvası. Köylüler güvercin gübresini bağlarını beslemek için toplardı.',
  },
  {
    id: 'gul', name: 'Gül Vadisi', x: 930, z: 380, r: 260, kind: 'valley',
    text: 'Gün batarken kayalar pembeden kızıla döner. Tüf katmanlarındaki demir oksit, taşa bu rengi verir.',
  },
  {
    id: 'devrent', name: 'Devrent · Hayal Vadisi', x: -1010, z: 830, r: 250, kind: 'valley',
    text: 'Rüzgâr ve yağmurun oyduğu mantar, deve ve hayvan biçimli kayalar. Herkes farklı bir şekil görür.',
  },
  {
    id: 'pasabag', name: 'Paşabağ · Keşişler Vadisi', x: 330, z: 1010, r: 240, kind: 'valley',
    text: 'Bir gövdeden çıkan çok başlı peribacaları. Erken Hıristiyan keşişler bu kayaların içinde yaşadı.',
  },
  {
    id: 'balon', name: 'Balon Kalkış Alanı', x: -240, z: -980, r: 220, kind: 'field',
    text: 'Her sabah gün doğarken onlarca balon burada şişer, sonra vadilerin üzerinde süzülmeye başlar.',
  },
];

// tur için sabit başlangıç noktası (yürüme modu)
export const SPAWN = { x: 110, z: 700 };
