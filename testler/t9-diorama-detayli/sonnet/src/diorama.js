// Maket: ahşap kaide, pirinç isim plakası, masa yüzeyi.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { W, H } from './geo.js';
import { D } from './world.js';
import { mulberry32 } from './rng.js';

function woodTexture(w, h, base, dark, seed, vertical = false) {
  const c = document.createElement('canvas'); c.width = w; c.height = h; const g = c.getContext('2d');
  const rnd = mulberry32(seed);
  g.fillStyle = base; g.fillRect(0, 0, w, h);
  // uzun damarlar
  for (let i = 0; i < 260; i++) {
    const y = rnd() * h, a = 0.05 + rnd() * 0.14, th = 0.6 + rnd() * 2.6;
    g.strokeStyle = `rgba(${dark},${a})`; g.lineWidth = th; g.beginPath();
    const ph = rnd() * 6, amp = 2 + rnd() * 9, fr = 0.004 + rnd() * 0.012;
    for (let x = 0; x <= w; x += 12) { const yy = y + Math.sin(x * fr + ph) * amp + Math.sin(x * fr * 3.1 + ph) * amp * 0.25; if (x === 0) g.moveTo(x, yy); else g.lineTo(x, yy); }
    g.stroke();
  }
  // tahta ek yerleri ve düğümler
  for (let i = 0; i < 6; i++) { const x = rnd() * w, y = rnd() * h, r = 8 + rnd() * 22; const gr = g.createRadialGradient(x, y, 1, x, y, r); gr.addColorStop(0, `rgba(${dark},0.55)`); gr.addColorStop(1, `rgba(${dark},0)`); g.fillStyle = gr; g.save(); g.translate(x, y); g.scale(2.6, 1); g.translate(-x, -y); g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); g.restore(); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 8;
  if (vertical) t.rotation = Math.PI / 2;
  return t;
}

export function buildBase() {
  const group = new THREE.Group(); group.name = 'base';
  const M = 11;                              // kaide taşma payı
  const wood = woodTexture(1024, 512, '#5c4331', '80,52,32', 7);
  const woodMat = new THREE.MeshStandardMaterial({ map: wood, roughness: 0.42, metalness: 0.0, color: 0xffffff, envMapIntensity: 0.8 });
  const woodDark = new THREE.MeshStandardMaterial({ map: woodTexture(1024, 512, '#4a3527', '60,38,24', 21), roughness: 0.5 });
  const T = 11;
  // alt tabla
  const a = new THREE.Mesh(new RoundedBoxGeometry(W + M * 2, T, H + M * 2, 4, 1.4), woodMat);
  a.position.set(W / 2, -D - T / 2, H / 2); a.castShadow = true; a.receiveShadow = true; group.add(a);
  // üst pervaz (daha koyu, çıkıntılı)
  const b = new THREE.Mesh(new RoundedBoxGeometry(W + M * 2 - 5, 2.4, H + M * 2 - 5, 3, 0.8), woodDark);
  b.position.set(W / 2, -D + 0.4, H / 2); b.castShadow = true; b.receiveShadow = true; group.add(b);
  // kesit bloğunu çevreleyen ince pirinç şerit
  const brassMat = new THREE.MeshStandardMaterial({ color: 0xb8923c, roughness: 0.32, metalness: 1.0 });
  const strip = (w, d, x, z) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, 0.5, d), brassMat); m.position.set(x, -D + 1.62, z); group.add(m); };
  const sw = 0.9;
  strip(W + sw * 2, sw, W / 2, -sw / 2); strip(W + sw * 2, sw, W / 2, H + sw / 2); strip(sw, H, -sw / 2, H / 2); strip(sw, H, W + sw / 2, H / 2);
  // isim plakası (güney yüz)
  const cv = document.createElement('canvas'); cv.width = 1536; cv.height = 192; const g = cv.getContext('2d');
  const gr = g.createLinearGradient(0, 0, 0, 192); gr.addColorStop(0, '#e9c877'); gr.addColorStop(0.5, '#b8923c'); gr.addColorStop(1, '#8c6a24');
  g.fillStyle = gr; g.fillRect(0, 0, 1536, 192);
  const pr = mulberry32(31); for (let i = 0; i < 900; i++) { g.fillStyle = `rgba(255,240,190,${pr() * 0.06})`; g.fillRect(pr() * 1536, pr() * 192, 60 + pr() * 120, 1); }
  g.strokeStyle = 'rgba(60,38,8,0.9)'; g.lineWidth = 5; g.strokeRect(14, 14, 1508, 164); g.lineWidth = 2; g.strokeRect(26, 26, 1484, 140);
  g.font = '700 128px "Times New Roman", Georgia, serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
  const text = 'NEW YORK';
  const draw = (dx, dy, col) => { g.fillStyle = col; let x = 512 + dx - (text.length - 1) * 0.5 * 20; for (const ch of text) { g.fillText(ch, x, 100 + dy); x += 20 + g.measureText(ch).width - 0; } };
  // aralıklı harfler: manuel yerleşim
  const place = (dx, dy, col) => { g.fillStyle = col; const sp = 26; let total = 0; const ws = [...text].map((ch) => g.measureText(ch).width); total = ws.reduce((s, v) => s + v, 0) + sp * (text.length - 1); let x = 768 - total / 2 + dx; [...text].forEach((ch, i) => { g.textAlign = 'left'; g.fillText(ch, x, 100 + dy); x += ws[i] + sp; }); };
  place(2, 3, 'rgba(255,235,170,0.55)'); place(0, 0, '#3a2408');
  const plateTex = new THREE.CanvasTexture(cv); plateTex.colorSpace = THREE.SRGBColorSpace; plateTex.anisotropy = 8;
  const bump = new THREE.CanvasTexture(cv);
  const plateMat = new THREE.MeshStandardMaterial({ map: plateTex, metalness: 0.85, roughness: 0.34, bumpMap: bump, bumpScale: 2.2 });
  const pw = 78, ph = pw * 192 / 1536;
  const plate = new THREE.Mesh(new RoundedBoxGeometry(pw, ph, 0.7, 2, 0.15), [brassMat, brassMat, brassMat, brassMat, plateMat, brassMat]);
  plate.position.set(-M - 0.35, -D - T / 2 + 0.1, H * 0.7); plate.rotation.y = -Math.PI / 2; plate.castShadow = true; plate.name = 'plate'; group.add(plate);
  for (const sx of [-1, 1]) for (const sy of [-1, 1]) { const sc = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.3, 12), brassMat); sc.rotation.x = Math.PI / 2; sc.rotation.set(Math.PI / 2, 0, Math.PI / 2); sc.rotation.order = 'YXZ'; sc.position.set(plate.position.x - 0.4, plate.position.y + sy * (ph / 2 - 0.9), plate.position.z + sx * (pw / 2 - 1.5)); sc.rotation.set(0, 0, Math.PI / 2); group.add(sc); }
  return group;
}

export function buildTable() {
  // Tek parça masa dokusu: sıcak ceviz damarları + merkezden dışa kararan ışık havuzu
  const S = 2048; const c = document.createElement('canvas'); c.width = c.height = S; const g = c.getContext('2d'); const rnd = mulberry32(4242);
  g.fillStyle = '#42302a'; g.fillRect(0, 0, S, S);
  for (let i = 0; i < 900; i++) {
    const y = rnd() * S, a = 0.03 + rnd() * 0.08, th = 0.8 + rnd() * 3.0; g.strokeStyle = rnd() < 0.5 ? `rgba(20,12,8,${a})` : `rgba(120,86,60,${a * 0.7})`; g.lineWidth = th; g.beginPath();
    const ph = rnd() * 6, amp = 4 + rnd() * 22, fr = 0.0012 + rnd() * 0.004;
    for (let x = 0; x <= S; x += 16) { const yy = y + Math.sin(x * fr + ph) * amp + Math.sin(x * fr * 2.7 + ph) * amp * 0.3; if (x === 0) g.moveTo(x, yy); else g.lineTo(x, yy); }
    g.stroke();
  }
  // tahta birleşim çizgileri
  for (let k = 1; k < 7; k++) { const y = k * S / 7 + (rnd() - 0.5) * 8; g.fillStyle = 'rgba(15,8,4,0.55)'; g.fillRect(0, y, S, 2.2); g.fillStyle = 'rgba(180,130,80,0.10)'; g.fillRect(0, y + 2.2, S, 1.5); }
  const rg = g.createRadialGradient(S / 2, S / 2, S * 0.04, S / 2, S / 2, S * 0.5);
  rg.addColorStop(0, 'rgba(255,215,170,0.22)'); rg.addColorStop(0.3, 'rgba(0,0,0,0.0)'); rg.addColorStop(0.75, 'rgba(0,0,0,0.6)'); rg.addColorStop(1, 'rgba(0,0,0,0.92)'); g.fillStyle = rg; g.fillRect(0, 0, S, S);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
  const mat = new THREE.MeshStandardMaterial({ map: t, roughness: 0.55, color: 0xffffff, envMapIntensity: 0.6 });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(4400, 4400), mat);
  m.rotation.x = -Math.PI / 2; m.position.set(W / 2, -D - 9, H / 2); m.receiveShadow = true; m.name = 'table';
  return m;
}
