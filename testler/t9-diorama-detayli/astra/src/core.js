import * as THREE from "three";
export { THREE };
export const SEED = 19091932;
let state = SEED;
export function random() {
  state = (Math.imul(1664525, state) + 1013904223) >>> 0;
  return state / 4294967296;
}
export function geo(lon, lat) {
  return { x: (lon + 73.98) * 850, z: -(lat - 40.75) * 1120 };
}
export function inside(x, z, poly) {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const a = poly[i],
      b = poly[j];
    if (a.z > z != b.z > z && x < ((b.x - a.x) * (z - a.z)) / (b.z - a.z) + a.x)
      c = !c;
  }
  return c;
}
export function polygon(coords) {
  return coords.map((c) => geo(...c));
}
export const batches = {};
export const stats = { boxes: 0, faces: 0 };
export function box(kind, x, y, z, w, h, d, color, ry = 0) {
  (batches[kind] ??= []).push({ x, y, z, w, h, d, color, ry });
}
export function bake(scene) {
  const materials = {
    solid: new THREE.MeshStandardMaterial({ roughness: 0.91, metalness: 0.02 }),
    window: new THREE.MeshStandardMaterial({
      roughness: 0.45,
      metalness: 0.1,
      emissive: 0xffb44b,
      emissiveIntensity: 0,
    }),
    glass: new THREE.MeshStandardMaterial({ roughness: 0.52, metalness: 0.08 }),
    water: new THREE.MeshStandardMaterial({ roughness: 0.82, metalness: 0.03 }),
    metal: new THREE.MeshStandardMaterial({ roughness: 0.46, metalness: 0.48 }),
    glow: new THREE.MeshStandardMaterial({
      roughness: 0.6,
      emissive: 0xffc55a,
      emissiveIntensity: 0,
    }),
  };
  const dummy = new THREE.Object3D(),
    c = new THREE.Color();
  const meshes = {};
  for (const [kind, items] of Object.entries(batches)) {
    const mat = materials[kind] || materials.solid;
    const mesh = new THREE.InstancedMesh(
      new THREE.BoxGeometry(1, 1, 1),
      mat,
      items.length,
    );
    items.forEach((b, i) => {
      dummy.position.set(b.x, b.y, b.z);
      dummy.scale.set(b.w, b.h, b.d);
      dummy.rotation.set(0, b.ry, 0);
      if (b.quat) dummy.quaternion.fromArray(b.quat);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, c.set(b.color));
    });
    mesh.castShadow = kind === "solid" || kind === "metal";
    mesh.receiveShadow = true;
    mesh.computeBoundingSphere();
    scene.add(mesh);
    meshes[kind] = mesh;
    stats.boxes += items.length;
  }
  stats.faces = stats.boxes * 6;
  return { meshes, materials };
}
export function label(
  text,
  {
    color = "#e3cd9f",
    bg = null,
    width = 1024,
    height = 128,
    size = 66,
    font = "Georgia",
    spacing = 0,
  } = {},
) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (bg) {
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);
  }
  ctx.fillStyle = color;
  ctx.font = `${size}px ${font}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, width / 2, height / 2);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
export function textPlane(scene, text, pos, w, h, opts = {}) {
  const material = new THREE.MeshBasicMaterial({
    map: label(text, opts),
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), material);
  mesh.position.set(...pos);
  scene.add(mesh);
  return mesh;
}
export function line(scene, points, color = 0x514942, radius = 0.14) {
  const curve = new THREE.CatmullRomCurve3(
    points.map((p) => new THREE.Vector3(...p)),
  );
  const mesh = new THREE.Mesh(
    new THREE.TubeGeometry(
      curve,
      Math.max(8, points.length * 4),
      radius,
      4,
      false,
    ),
    new THREE.MeshStandardMaterial({ color, roughness: 0.8 }),
  );
  scene.add(mesh);
  mesh.castShadow = true;
  return mesh;
}
export const LANDMARKS = [
  {
    id: "liberty",
    name: "Özgürlük Heykeli",
    en: "LIBERTY ISLAND",
    key: "1",
    lon: -74.0445,
    lat: 40.6892,
    height: 16,
    zoom: 41,
    info: "Bakırdan bir karşılama, yeşile dönüşen bir simge. 1886’dan beri Liberty Island’dan New York Limanı’na bakıyor.",
  },
  {
    id: "empire",
    name: "Empire State",
    en: "MIDTOWN · 1931",
    key: "2",
    lon: -73.9857,
    lat: 40.7484,
    height: 58,
    zoom: 82,
    info: "Art Deco’nun basamak basamak yükselen silueti. 1931’de tamamlanan Empire State, kentin gökyüzüne uzanma tutkusunun simgesi.",
  },
  {
    id: "chrysler",
    name: "Chrysler Building",
    en: "MIDTOWN · 1930",
    key: "3",
    lon: -73.9753,
    lat: 40.7516,
    height: 48,
    zoom: 70,
    info: "Paslanmaz çelik tacı ve ışın biçimli kemerleriyle bir Art Deco mücevheri. Otomobil çağının iyimserliğini Manhattan’ın ufkuna taşıyor.",
  },
  {
    id: "wtc",
    name: "One World Trade Center",
    en: "LOWER MANHATTAN · 2014",
    key: "4",
    lon: -74.0134,
    lat: 40.7127,
    height: 67,
    zoom: 90,
    info: "Yeniden doğuşun 541 metrelik işareti. Işığı yakalayan cam yüzeyleri ve ince anteni, Downtown’ın yeni odak noktası.",
  },
  {
    id: "flatiron",
    name: "Flatiron",
    en: "FLATIRON DISTRICT · 1902",
    key: "5",
    lon: -73.9897,
    lat: 40.7411,
    height: 22,
    zoom: 44,
    info: "Broadway ile Fifth Avenue’nun kesişimindeki ince üçgen. 1902 tarihli bu yapı, bulunduğu köşenin geometrisini bir şehir ikonuna dönüştürdü.",
  },
  {
    id: "bridge",
    name: "Brooklyn Köprüsü",
    en: "EAST RIVER · 1883",
    key: "6",
    lon: -73.9969,
    lat: 40.7061,
    height: 17,
    zoom: 57,
    info: "Taş kuleler, çelik kablolar ve iki kıyı arasında bir yürüyüş. 1883’te açılan köprü, Manhattan ile Brooklyn’i birbirine bağlıyor.",
  },
  {
    id: "park",
    name: "Central Park",
    en: "MANHATTAN’IN YEŞİL KALBİ",
    key: "7",
    lon: -73.9654,
    lat: 40.7825,
    height: 4,
    zoom: 81,
    info: "Izgaranın ortasında nefes alan büyük bir peyzaj. Göller, çayırlar ve ağaç yolları, yoğun şehrin ritmini yavaşlatıyor.",
  },
  {
    id: "times",
    name: "Times Square",
    en: "BROADWAY × SEVENTH AVENUE",
    key: "8",
    lon: -73.9855,
    lat: 40.758,
    height: 23,
    zoom: 58,
    info: "Broadway’in ışıklı kavşağı. Tiyatrolar ve sürekli değişen panolar, geceyi bile şehrin en parlak saatine çeviriyor.",
  },
  {
    id: "rockefeller",
    name: "Rockefeller Center",
    en: "MIDTOWN · ART DECO",
    key: "9",
    lon: -73.9787,
    lat: 40.7587,
    height: 41,
    zoom: 67,
    info: "Bir meydanın çevresinde yükselen Art Deco topluluğu. 30 Rock’ın katmanlı kütlesi ve aşağıdaki küçük plaza, bu makette de birlikte tasarlandı.",
  },
  {
    id: "grand",
    name: "Grand Central",
    en: "42ND STREET · 1913",
    key: "0",
    lon: -73.9772,
    lat: 40.7527,
    height: 10,
    zoom: 28,
    info: "Şehrin günlük akışının görkemli eşiği. Beaux-Arts cephesi, kemerli pencereleri ve yeşil çatısıyla gökdelenlerin arasında insana ölçek veriyor.",
  },
]
  .map((l) => ({ ...l, ...geo(l.lon, l.lat) }))
  .map((l) =>
    l.id === "grand"
      ? { ...l, x: 2.4, z: -5.5 }
      : l.id === "chrysler"
        ? { ...l, x: l.x + 2.1, z: l.z + 1.3 }
        : l,
  );
