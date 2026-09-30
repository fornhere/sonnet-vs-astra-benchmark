import { THREE, SEED, bake, stats, LANDMARKS } from "./core.js";
import { terrain } from "./terrain.js";
import { buildings } from "./buildings.js";
import { landmarks, billboards } from "./landmarks.js";
import { traffic } from "./traffic.js";
import { lighting, postprocess, atmosphere, addLamps } from "./lighting.js";
import { makeCamera } from "./camera.js";
import { setupUI } from "./ui.js";
const params = new URLSearchParams(location.search),
  low = params.get("q") === "low";
const scene = new THREE.Scene();
scene.background = new THREE.Color("#e8ddc6");
scene.fog = new THREE.FogExp2("#e8ddc6", 0.00032);
const renderer = new THREE.WebGLRenderer({
  antialias: !low,
  preserveDrawingBuffer: true,
  powerPreference: "high-performance",
});
renderer.setPixelRatio(
  low ? Math.min(devicePixelRatio, 0.7) : Math.min(devicePixelRatio, 1.5),
);
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.autoUpdate = false;
renderer.shadowMap.needsUpdate = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.info.autoReset = false;
document.querySelector("#world").appendChild(renderer.domElement);
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(2000, 2000),
  new THREE.MeshStandardMaterial({ color: "#f1ecdf", roughness: 1 }),
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -12;
floor.receiveShadow = true;
scene.add(floor);
const terrainStats = terrain(scene),
  buildingStats = buildings();
landmarks(scene);
addLamps();
const { meshes, materials } = bake(scene);
if (meshes.leaves) {
  const leafMat = materials.solid.clone();
  leafMat.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = { value: 0 };
    leafMat.userData.shader = shader;
    shader.vertexShader = "uniform float uTime;\n" + shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace(
      "#include <begin_vertex>",
      "#include <begin_vertex>\n transformed.x += sin(uTime * 1.3 + instanceMatrix[3].x * .13 + instanceMatrix[3].z * .07) * .055 * (position.y + .5);",
    );
  };
  meshes.leaves.material = leafMat;
}
const snowState = { value: 0 };
for (const mat of [materials.solid, meshes.leaves?.material]) {
  if (!mat) continue;
  const previous = mat.onBeforeCompile;
  mat.onBeforeCompile = (shader) => {
    previous.call(mat, shader);
    shader.uniforms.uSnow = snowState;
    shader.vertexShader = "varying float vSnowSurface;\n" + shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace(
      "#include <begin_vertex>",
      "#include <begin_vertex>\n vSnowSurface=step(.5,normal.y)*step(.9,(instanceMatrix*vec4(position,1.)).y);",
    );
    shader.fragmentShader =
      "uniform float uSnow; varying float vSnowSurface;\n" +
      shader.fragmentShader;
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <color_fragment>",
      "#include <color_fragment>\n diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.82,.88,.87),uSnow*vSnowSurface*.9);",
    );
  };
}
const cameraRig = makeCamera(renderer),
  lights = lighting(scene, renderer, materials, low),
  post = postprocess(renderer, scene, cameraRig.camera, low),
  weather = atmosphere(scene, snowState),
  transit = traffic(scene);
const ui = setupUI({
  scene,
  renderer,
  cameraRig,
  lights,
  atmosphere: weather,
  post,
  stats,
});
function resize() {
  renderer.setSize(innerWidth, innerHeight);
  cameraRig.resize(innerWidth, innerHeight);
  const s = renderer.getDrawingBufferSize(new THREE.Vector2());
  post.resize(s.x, s.y);
}
window.addEventListener("resize", resize);
resize();
let last = performance.now(),
  frames = [],
  accum = 0,
  frame = 0,
  time = 0,
  lastFPS = 0;
let paused = false;
function animate(now) {
  requestAnimationFrame(animate);
  const rawDelta = Math.max(0, (now - last) / 1000);
  const delta = Math.min(0.1, rawDelta);
  last = now;
  if (!paused) time += delta;
  cameraRig.update(now);
  transit.update(time);
  weather.update(time, cameraRig.camera.zoom);
  if (meshes.leaves?.material.userData.shader)
    meshes.leaves.material.userData.shader.uniforms.uTime.value = time;
  billboards.forEach((b, i) => {
    const val =
      (1.3 + lights.night * 2.5) * (1 + Math.sin(time * 1.1 + i) * 0.13);
    b.material.color.setRGB(val, val, val);
    b.material.map = b.userData.frames[Math.floor(time / 4 + i) % 2];
  });
  renderer.info.reset();
  post.render();
  if (rawDelta > 0) {
    frames.push(rawDelta * 1000);
    if (frames.length > 600) frames.shift();
  }
  frame++;
  if (now - lastFPS > 600 && frames.length) {
    lastFPS = now;
    ui.updateFPS(
      1000 /
        (frames.slice(-60).reduce((a, b) => a + b, 0) /
          Math.min(60, frames.length)),
    );
  }
}
requestAnimationFrame(animate);
window.__NY = {
  ready: true,
  seed: SEED,
  landmarks: LANDMARKS,
  stats: {
    ...stats,
    ...terrainStats,
    ...buildingStats,
    cars: transit.count,
    quality: low ? "low" : "high",
    estimatedVisibleVoxelFaces: stats.faces + 12000,
    worstCaseVoxelFaces: stats.faces + 7308,
  },
  select: ui.select,
  setTime: ui.setTime,
  setWeather: ui.setWeather,
  photo: ui.photoMode,
  freeze(v = true) {
    paused = v;
  },
  resetMetrics() {
    frames = [];
  },
  fps() {
    const sorted = [...frames].sort((a, b) => a - b);
    return {
      samples: frames.length,
      mean: 1000 / (frames.reduce((a, b) => a + b, 0) / frames.length),
      p50ms: sorted[Math.floor(sorted.length * 0.5)],
      p95ms: sorted[Math.floor(sorted.length * 0.95)],
      drawCalls: renderer.info.render.calls,
      triangles: renderer.info.render.triangles,
    };
  },
  camera: cameraRig,
  renderer,
  scene,
};
setTimeout(() => {
  const el = document.querySelector("#loading");
  el.style.opacity = 0;
  setTimeout(() => el.remove(), 750);
}, 350);
if (params.has("view")) setTimeout(() => ui.select(params.get("view")), 500);
if (params.has("time")) ui.setTime(Number(params.get("time")));
if (params.has("weather")) ui.setWeather(params.get("weather"));
console.info("New York Atelier initialized", window.__NY.stats);
