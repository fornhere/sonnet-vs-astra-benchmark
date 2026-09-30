import * as T from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { rng, glowTexture, noiseGLSL } from "./util.js";
export function buildTower(scene, U) {
  const random = rng(17),
    group = new T.Group(),
    buckets = new Map();
  scene.add(group);
  function texture(kind) {
    const c = document.createElement("canvas");
    c.width = c.height = 512;
    const ctx = c.getContext("2d");
    ctx.fillStyle = kind === "stone" ? "#a49c88" : "#d9d1b6";
    ctx.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 18000; i++) {
      let v = random();
      ctx.fillStyle = `rgba(${v > 0.5 ? "248,239,205" : "47,54,49"},${random() * 0.12})`;
      ctx.fillRect(
        random() * 512,
        random() * 512,
        1 + random() * 5,
        1 + random() * 3,
      );
    }
    if (kind === "stone")
      for (let row = 0; row < 13; row++) {
        for (let col = -1; col < 7; col++) {
          let x = col * 86 + (row % 2) * 43,
            y = row * 40;
          ctx.fillStyle = `rgba(26,35,34,${0.2 + random() * 0.18})`;
          ctx.fillRect(x, y, 84, 2);
          ctx.fillRect(x, y, 2, 39);
          ctx.fillStyle = `rgba(255,245,209,${random() * 0.1})`;
          ctx.fillRect(x + 3, y + 3, 79, 34);
        }
      }
    const tx = new T.CanvasTexture(c);
    tx.wrapS = tx.wrapT = T.RepeatWrapping;
    tx.colorSpace = T.SRGBColorSpace;
    return tx;
  }
  const stoneTex = texture("stone"),
    plasterTex = texture("plaster");
  const stone = new T.MeshStandardMaterial({
    map: stoneTex,
    bumpMap: stoneTex,
    bumpScale: 0.15,
    roughness: 0.88,
    color: 0xaaa69b,
  });
  const plaster = new T.MeshStandardMaterial({
    map: plasterTex,
    bumpMap: plasterTex,
    bumpScale: 0.055,
    color: 0x9b9787,
    roughness: 0.88,
  });
  const trim = new T.MeshStandardMaterial({ color: 0x929b96, roughness: 0.7 });
  const dark = new T.MeshStandardMaterial({
    color: 0x162226,
    roughness: 0.65,
    metalness: 0.25,
  });
  const lead = new T.MeshStandardMaterial({
    color: 0x3d494d,
    roughness: 0.48,
    metalness: 0.65,
  });
  const wood = new T.MeshStandardMaterial({ color: 0x5b4231, roughness: 0.78 });
  const gold = new T.MeshStandardMaterial({
    color: 0xa4884f,
    metalness: 0.75,
    roughness: 0.35,
  });
  const glass = new T.MeshStandardMaterial({
    color: 0xdd9645,
    emissive: 0xff9b38,
    emissiveIntensity: 0.9,
    roughness: 0.25,
  });
  const black = new T.MeshStandardMaterial({ color: 0x081016, roughness: 0.6 });
  function add(geo, mat, x = 0, y = 0, z = 0, rot = 0) {
    geo.rotateY(rot);
    geo.translate(x, y, z);
    if (!buckets.has(mat)) buckets.set(mat, []);
    buckets.get(mat).push(geo);
  }
  function box(w, h, d, mat, x, y, z, rot = 0) {
    add(new T.BoxGeometry(w, h, d), mat, x, y, z, rot);
  }
  function cyl(r1, r2, h, mat, x, y, z, n = 32) {
    add(new T.CylinderGeometry(r1, r2, h, n), mat, x, y, z);
  }
  // Wave-worn foundation and an elliptical ring of individual basalt rocks.
  const foundation = new T.CylinderGeometry(13.4, 14.4, 1.35, 64);
  foundation.scale(1, 1, 0.72);
  add(foundation, dark, 0, -0.4, 0);
  for (let i = 0; i < 95; i++) {
    const a = (i / 95) * Math.PI * 2,
      r = 13 + random() * 3;
    const geo = new T.DodecahedronGeometry(0.8 + random() * 1.3, 1);
    geo.scale(1.4, 0.6 + random() * 0.6, 1);
    geo.rotateX(random() * 4);
    geo.rotateZ(random() * 4);
    add(
      geo,
      dark,
      Math.cos(a) * r,
      0.1 + random() * 0.6,
      Math.sin(a) * r * 0.7,
    );
  }
  box(26, 1, 19, stone, 0, 1.3, 0);
  box(26.5, 0.28, 19.5, trim, 0, 1.9, 0);
  // Fortified courtyard, with a clearly articulated cornice and merlons.
  box(19, 4.7, 1.1, stone, 0, 4.35, -6);
  box(19, 4.7, 1.1, stone, 0, 4.35, 6);
  box(1.1, 4.7, 12, stone, -9, 4.35, 0);
  box(1.1, 4.7, 12, stone, 9, 4.35, 0);
  for (const z of [-6, 6]) {
    box(19.5, 0.3, 1.35, trim, 0, 6.85, z);
    for (let x = -9; x <= 9; x += 1.5) box(0.8, 0.8, 1.2, stone, x, 7.35, z);
  }
  for (const x of [-9, 9]) {
    box(1.35, 0.3, 12, trim, x, 6.85, 0);
    for (let z = -4.5; z <= 4.5; z += 1.5)
      box(1.2, 0.8, 0.8, stone, x, 7.35, z);
  }
  box(17, 0.15, 11, stone, 0, 2.1, 0);
  // The square shaft, projecting octagonal lantern and curved lead roof.
  const tx = -3,
    tz = 0;
  box(5.6, 12.3, 5.6, plaster, tx, 9.9, tz);
  box(6.1, 0.45, 6.1, trim, tx, 4.05, tz);
  for (let y = 5; y < 15; y += 2.1) {
    for (let x of [-5.65, -0.35])
      box(0.38, 0.55, 5.7, stone, x + (x < -3 ? -0.055 : 0.055), y, 0);
  }
  box(6.1, 0.42, 6.1, trim, tx, 16.1, tz);
  box(6.5, 0.25, 6.5, trim, tx, 16.46, tz);
  cyl(3.9, 3.55, 0.35, trim, tx, 16.7, tz, 8);
  cyl(3.5, 3.5, 0.68, plaster, tx, 17.18, tz, 8);
  cyl(3.5, 3.5, 0.55, plaster, tx, 20.28, tz, 8);
  for (let i = 0; i < 8; i++) {
    let a = (i * Math.PI) / 4;
    box(
      0.44,
      2.85,
      0.44,
      plaster,
      tx + 3.35 * Math.sin(a),
      18.65,
      3.35 * Math.cos(a),
      a,
    );
  }
  // Arched window frames, with inset darkness and warm glazing.
  function arch(w, h, d, mat, x, y, z, rot = 0) {
    let sh = new T.Shape();
    sh.moveTo(-w / 2, 0);
    sh.lineTo(w / 2, 0);
    sh.lineTo(w / 2, h - w / 2);
    sh.absarc(0, h - w / 2, w / 2, 0, Math.PI, false);
    sh.lineTo(-w / 2, 0);
    add(
      new T.ExtrudeGeometry(sh, {
        depth: d,
        bevelEnabled: false,
        curveSegments: 10,
      }),
      mat,
      x,
      y,
      z,
      rot,
    );
  }
  for (const side of [0, 1, 2, 3]) {
    let a = (side * Math.PI) / 2;
    const dir = new T.Vector3(Math.sin(a), 0, Math.cos(a));
    for (const y of [8.1, 13.15]) {
      let p = dir.clone().multiplyScalar(2.81);
      arch(0.8, 1.65, 0.12, stone, tx + p.x, y, p.z, a);
      p = dir.clone().multiplyScalar(2.94);
      arch(
        0.58,
        1.4,
        0.03,
        y === 8.1 ? glass : black,
        tx + p.x,
        y + 0.08,
        p.z,
        a,
      );
    }
  }
  for (let i = 0; i < 8; i++) {
    let a = ((i + 0.5) * Math.PI) / 4,
      p = new T.Vector3(Math.sin(a), 0, Math.cos(a)).multiplyScalar(3.25);
    arch(1.08, 2.3, 0.12, dark, tx + p.x, 17.2, p.z, a);
    p.multiplyScalar(1.025);
    arch(0.82, 1.88, 0.04, glass, tx + p.x, 17.38, p.z, a);
    box(0.1, 1.8, 0.12, wood, tx + p.x, 18.25, p.z, a);
  }
  cyl(4, 4, 0.2, trim, tx, 20.65, 0, 8);
  cyl(3.65, 3.85, 0.18, lead, tx, 20.84, 0, 8);
  const profile = [
    [3.75, 0],
    [3.7, 0.3],
    [3.3, 0.75],
    [2.85, 1.6],
    [2.45, 2.7],
    [1.95, 3.8],
    [1.55, 4.6],
    [1.5, 5.05],
  ].map((p) => new T.Vector2(...p));
  add(new T.LatheGeometry(profile, 48), lead, tx, 20.87, 0);
  // Raised standing seams on the lead-clad cupola.
  for (let i = 0; i < 16; i++) {
    let a = (i / 16) * Math.PI * 2,
      pts = profile.map(
        (v) =>
          new T.Vector3(
            tx + (v.x + 0.025) * Math.sin(a),
            20.87 + v.y,
            (v.x + 0.025) * Math.cos(a),
          ),
      );
    add(
      new T.TubeGeometry(new T.CatmullRomCurve3(pts), 18, 0.023, 4, false),
      dark,
    );
  }
  cyl(1.85, 1.85, 0.16, trim, tx, 26.02, 0, 16);
  cyl(0.12, 0.2, 3.1, gold, tx, 27.63, 0, 12);
  cyl(0.03, 0.21, 0.75, gold, tx, 29.38, 0, 12);
  add(new T.SphereGeometry(0.19, 12, 8), gold, tx, 28.93, 0);
  // Balcony rail, window lintels, service doors, bollards and stone stairs.
  for (let i = 0; i < 32; i++) {
    let a = (i / 32) * Math.PI * 2;
    cyl(
      0.028,
      0.028,
      0.75,
      dark,
      tx + 3.82 * Math.sin(a),
      17.2,
      3.82 * Math.cos(a),
      5,
    );
  }
  for (let y of [16.85, 17.58]) {
    const ring = new T.TorusGeometry(3.82, 0.035, 5, 64);
    ring.rotateX(Math.PI / 2);
    add(ring, dark, tx, y, 0);
  }
  for (let x = -7.5; x <= 7.5; x += 3) {
    arch(0.9, 1.85, 0.06, dark, x, 3.2, 6.56);
    arch(0.66, 1.53, 0.07, glass, x, 3.35, 6.63);
    box(1.18, 0.16, 0.3, trim, x, 3.1, 6.7);
  }
  arch(1.5, 2.6, 0.08, wood, 9.59, 2.03, 0, Math.PI / 2);
  for (let i = 0; i < 6; i++)
    box(3, 0.25 + i * 0.17, 0.6, stone, 9.6 + i * 0.55, 1.42 + i * 0.085, 0);
  for (let x = -11; x <= 11; x += 3.6)
    for (let z of [-8.7, 8.7]) {
      cyl(0.13, 0.18, 0.65, dark, x, 2.28, z, 8);
      cyl(0.24, 0.24, 0.1, dark, x, 2.58, z, 8);
    }
  // Separate Ottoman wooden annex along the rear courtyard.
  box(7, 3.4, 4.1, wood, 4.65, 3.9, -3.4);
  box(7.3, 0.25, 4.4, lead, 4.65, 5.7, -3.4);
  for (let x = 2; x < 8; x += 1.1) {
    box(0.65, 1.4, 0.04, glass, x, 4.1, -1.33);
    box(0.05, 1.45, 0.07, dark, x, 4.1, -1.27);
  }
  for (const [mat, geos] of buckets) {
    const mesh = new T.Mesh(
      mergeGeometries(
        geos.map((g) => (g.index ? g.toNonIndexed() : g)),
        false,
      ),
      mat,
    );
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
    geos.forEach((g) => g.dispose());
  }
  // World-space masonry gives every wall the same physical stone scale.
  for (const [mat, isStone] of [
    [stone, true],
    [plaster, false],
    [lead, false],
  ]) {
    mat.customProgramCacheKey = () => (isStone ? "masonry-v2" : "plaster-v2");
    mat.onBeforeCompile = (sh) => {
      sh.vertexShader =
        "varying vec3 vSurface;varying vec3 vFace;\n" + sh.vertexShader;
      sh.vertexShader = sh.vertexShader.replace(
        "#include <begin_vertex>",
        "#include <begin_vertex>\nvSurface=(modelMatrix*vec4(position,1.)).xyz;vFace=normalize(mat3(modelMatrix)*normal);",
      );
      sh.fragmentShader =
        "varying vec3 vSurface;varying vec3 vFace;\n" +
        noiseGLSL +
        "\n" +
        sh.fragmentShader;
      sh.fragmentShader = sh.fragmentShader.replace(
        "#include <color_fragment>",
        `#include <color_fragment>
 vec3 an=abs(vFace);vec2 uv=an.y>.7?vSurface.xz:(an.x>an.z?vSurface.zy:vSurface.xy);
 float stain=fbm(uv*.7);float grain=noise(uv*45.);float wet=(1.-smoothstep(.3,2.8,vSurface.y));
 diffuseColor.rgb*=mix(.55,1.12,stain)*(.88+grain*.18)*(1.-wet*.3);
 ${isStone ? `vec2 brick=uv*vec2(1.1,2.5);brick.x+=mod(floor(brick.y),2.)*.5;vec2 f=fract(brick);float mortar=(1.-smoothstep(.025,.065,min(f.x,f.y)));diffuseColor.rgb*=1.-mortar*.4;diffuseColor.rgb*=.86+hash(floor(brick))*.27;` : ""}
 `,
      );
    };
  }
  // A small wind-driven Turkish flag, painted procedurally.
  const fc = document.createElement("canvas");
  fc.width = 192;
  fc.height = 128;
  const fx = fc.getContext("2d");
  fx.fillStyle = "#b52b32";
  fx.fillRect(0, 0, 192, 128);
  fx.fillStyle = "#eee9d8";
  fx.beginPath();
  fx.arc(76, 64, 29, 0, Math.PI * 2);
  fx.fill();
  fx.fillStyle = "#b52b32";
  fx.beginPath();
  fx.arc(84, 59, 23, 0, Math.PI * 2);
  fx.fill();
  fx.fillStyle = "#eee9d8";
  fx.beginPath();
  for (let i = 0; i < 10; i++) {
    let a = -Math.PI / 2 + (i * Math.PI) / 5,
      r = i % 2 ? 6 : 15;
    let x = 115 + Math.cos(a) * r,
      y = 61 + Math.sin(a) * r;
    if (i === 0) fx.moveTo(x, y);
    else fx.lineTo(x, y);
  }
  fx.closePath();
  fx.fill();
  const ft = new T.CanvasTexture(fc);
  ft.colorSpace = T.SRGBColorSpace;
  const fm = new T.MeshStandardMaterial({
    map: ft,
    side: T.DoubleSide,
    roughness: 0.86,
  });
  fm.onBeforeCompile = (sh) => {
    sh.uniforms.uFlagTime = U.uTime;
    sh.vertexShader = "uniform float uFlagTime;\n" + sh.vertexShader;
    sh.vertexShader = sh.vertexShader.replace(
      "#include <begin_vertex>",
      "#include <begin_vertex>\ntransformed.z+=sin(position.x*4.-uFlagTime*6.)*.16*position.x;transformed.y+=sin(position.x*3.-uFlagTime*4.)*.05*position.x;",
    );
  };
  const fg = new T.PlaneGeometry(2.1, 1.2, 16, 6);
  fg.translate(1.05, 0, 0);
  const flag = new T.Mesh(fg, fm);
  flag.position.set(-3, 28.05, 0.02);
  scene.add(flag);
  const glow = glowTexture();
  for (const x of [-10, -5, 0, 5, 10]) {
    const sprite = new T.Sprite(
      new T.SpriteMaterial({
        map: glow,
        color: 0xffb867,
        transparent: true,
        depthWrite: false,
        blending: T.AdditiveBlending,
      }),
    );
    sprite.position.set(x, 2.55, 8.5);
    sprite.scale.set(2.2, 2.2, 1);
    group.add(sprite);
  }
  const lantern = new T.Group();
  lantern.position.set(tx, 19.25, 0);
  scene.add(lantern);
  const lamp = new T.Mesh(
    new T.SphereGeometry(0.34, 16, 10),
    new T.MeshBasicMaterial({ color: 0xffebc3 }),
  );
  lantern.add(lamp);
  const halo = new T.Sprite(
    new T.SpriteMaterial({
      map: glow,
      color: 0xffc279,
      blending: T.AdditiveBlending,
      depthWrite: false,
    }),
  );
  halo.material.depthTest = false;
  halo.scale.set(5, 5, 1);
  lantern.add(halo);
  const streak = new T.Sprite(
    new T.SpriteMaterial({
      map: glow,
      color: 0xffd093,
      opacity: 0.2,
      depthTest: false,
      depthWrite: false,
      blending: T.AdditiveBlending,
    }),
  );
  streak.scale.set(12, 0.3, 1);
  lantern.add(streak);
  const key = new T.SpotLight(0xffcf91, 540, 100, Math.PI / 3, 0.8, 1.3);
  key.position.set(-14, 18, 22);
  key.target.position.set(-3, 12, 0);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.near = 1;
  key.shadow.camera.far = 90;
  key.shadow.bias = -0.00015;
  key.shadow.normalBias = 0.035;
  scene.add(key, key.target);
  const fill = new T.PointLight(0xffb25a, 100, 34, 1.7);
  fill.position.set(7, 5, 10);
  scene.add(fill);
  return { group, lantern, key, fill };
}
