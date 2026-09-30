import * as T from "three";
import { buildTower } from "./architecture.js";
import { createOcean } from "./ocean.js";
import { atmosphere } from "./atmosphere.js";
import { environment } from "./environment.js";
import { CameraRig } from "./camera.js";
import { StormAudio } from "./audio.js";
const $ = (s) => document.querySelector(s),
  params = new URLSearchParams(location.search),
  low = params.get("q") === "low";
const state = {
  time: Number(params.get("t") || 0),
  storm: 0.78,
  dawn: 0,
  paused: params.has("still"),
  photo: false,
  fps: 0,
  frameMs: 0,
  quality: low ? "low" : "high",
};
const U = {
  uTime: { value: state.time },
  uStorm: { value: state.storm },
  uDawn: { value: 0 },
  uFlash: { value: 0 },
  uBeam: { value: 0 },
};
const scene = new T.Scene();
scene.fog = new T.FogExp2(0x132631, 0.0035);
const camera = new T.PerspectiveCamera(
  43,
  innerWidth / innerHeight,
  0.15,
  2200,
);
let renderer;
try {
  renderer = new T.WebGLRenderer({
    antialias: !low,
    powerPreference: "high-performance",
    preserveDrawingBuffer: false,
  });
} catch (e) {
  $("#fatal").hidden = false;
  $("#fatal").textContent =
    "Bu sahne WebGL 2 destekli bir tarayıcı gerektirir. Chromium’da donanım hızlandırmayı açarak tekrar deneyin.";
  $("#loading").classList.add("done");
  throw e;
}
renderer.setPixelRatio(low ? 0.7 : Math.min(devicePixelRatio, 1));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = T.SRGBColorSpace;
renderer.toneMapping = T.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.04;
renderer.shadowMap.enabled = !low;
renderer.shadowMap.type = T.PCFSoftShadowMap;
renderer.shadowMap.autoUpdate = false;
renderer.shadowMap.needsUpdate = true;
$("#scene").appendChild(renderer.domElement);
const hemi = new T.HemisphereLight(0x9ec6dc, 0x132127, 1.6);
scene.add(hemi);
const moon = new T.DirectionalLight(0xa9c9ef, 2.2);
moon.position.set(-70, 95, -50);
scene.add(moon);
const flashLight = new T.DirectionalLight(0xbbd8ff, 0);
flashLight.position.set(-60, 110, -100);
scene.add(flashLight);
const tower = buildTower(scene, U),
  ocean = createOcean(scene, U, low),
  sky = atmosphere(scene, U, low),
  env = environment(scene),
  rig = new CameraRig(camera, renderer.domElement),
  sound = new StormAudio();
const settings = $("#settings");
let strikeTime = -100,
  nextStrike = 7,
  real = 0,
  last = performance.now(),
  fpsLast = last,
  frames = 0,
  frameSamples = [],
  toastTimer;
function toast(s) {
  $("#toast").textContent = s;
  $("#toast").classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $("#toast").classList.remove("visible"), 2600);
}
function lightning() {
  sky.strike(camera);
  strikeTime = real;
  sound.thunder(1 + Math.random() * 2);
  nextStrike = real + 9 + Math.random() * 15;
}
function setStorm(v) {
  state.storm = Math.max(0, Math.min(1, v));
  U.uStorm.value = state.storm;
  sound.setIntensity(state.storm);
  $("#storm").value = Math.round(state.storm * 100);
  $("#storm").style.setProperty("--fill", `${state.storm * 100}%`);
  $("#storm-value").value = `%${Math.round(state.storm * 100)}`;
  $("#wind").textContent = `↗ ${Math.round(3 + state.storm * 45)} kn`;
  $("#weather-label").textContent =
    state.storm > 0.68
      ? "KUVVETLİ FIRTINA"
      : state.storm > 0.28
        ? "RÜZGÂRLI GECE"
        : "SAKİN SULAR";
}
function setDawn(v) {
  state.dawn = Math.max(0, Math.min(1, v));
  U.uDawn.value = state.dawn;
  $("#time").value = Math.round(state.dawn * 100);
  $("#time").style.setProperty("--fill", `${state.dawn * 100}%`);
  let m = 160 + Math.round(state.dawn * 205);
  $("#time-value").value =
    `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}
function setFree(on) {
  rig.setFree(on);
  document.body.classList.toggle("free", on);
  $("#free").setAttribute("aria-pressed", on);
  $("#free span").textContent = on ? "Sinematiğe dön" : "Serbest keşfet";
  $("#camera-label").textContent = on ? "SERBEST KAMERA" : "SİNEMATİK KAMERA";
}
function setPause(on) {
  state.paused = on;
  $("#pause").setAttribute(
    "aria-label",
    on ? "Animasyonu sürdür" : "Animasyonu duraklat",
  );
  $("#pause svg").innerHTML = on
    ? '<path d="m8 5 11 7-11 7z"/>'
    : '<path d="M8 5v14M16 5v14"/>';
}
let photoWasFree = false;
function photo(on) {
  state.photo = on;
  document.body.classList.toggle("photo", on);
  $("#photo-ui").hidden = !on;
  if (on) {
    photoWasFree = rig.free;
    setFree(true);
  } else setFree(photoWasFree);
}
async function download() {
  const ratio = renderer.getPixelRatio();
  renderer.setPixelRatio(1);
  renderer.setSize(innerWidth, innerHeight);
  renderer.render(scene, camera);
  const blob = await new Promise((r) =>
    renderer.domElement.toBlob(r, "image/png"),
  );
  renderer.setPixelRatio(ratio);
  renderer.setSize(innerWidth, innerHeight);
  if (!blob) {
    toast("Fotoğraf oluşturulamadı. Tekrar deneyin.");
    return;
  }
  let a = document.createElement("a"),
    url = URL.createObjectURL(blob);
  a.href = url;
  a.download = `Bogaz-Kiz-Kulesi-${Math.round(state.time % 60)}s.png`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 3000);
  toast("Fotoğraf PNG olarak indirildi.");
}
$("#storm").addEventListener("input", (e) => setStorm(e.target.value / 100));
$("#time").addEventListener("input", (e) => setDawn(e.target.value / 100));
$("#lightning").onclick = lightning;
$("#audio").onclick = async () => {
  try {
    let on = await sound.toggle();
    $("#audio").setAttribute("aria-pressed", on);
    $("#audio span").textContent = on ? "Ses açık" : "Ses kapalı";
    $("#audio svg").innerHTML = on
      ? '<path d="M11 5 6 9H3v6h3l5 4zM15 8c4 2 4 6 0 8m3-11c7 4 7 10 0 14"/>'
      : '<path d="M11 5 6 9H3v6h3l5 4zM16 9l5 6m0-6-5 6"/>';
  } catch (e) {
    toast("Ses başlatılamadı. Tarayıcı ses iznini kontrol edin.");
  }
};
$("#free").onclick = () => setFree(!rig.free);
$("#photo").onclick = () => photo(true);
$("#photo-exit").onclick = () => photo(false);
$("#download").onclick = download;
$("#pause").onclick = () => setPause(!state.paused);
$("#settings-toggle").onclick = () => {
  let closed = settings.classList.toggle("collapsed");
  $("#settings-toggle").setAttribute("aria-expanded", !closed);
  $("#settings-toggle").setAttribute(
    "aria-label",
    closed ? "Atmosfer ayarlarını göster" : "Atmosfer ayarlarını gizle",
  );
};
$("#fps-toggle").onclick = () => ($("#fps").hidden = !$("#fps").hidden);
const narrow = matchMedia("(max-width:600px)");
function compactPanel() {
  if (narrow.matches) {
    settings.classList.add("collapsed");
    $("#settings-toggle").setAttribute("aria-expanded", "false");
    $("#settings-toggle").setAttribute(
      "aria-label",
      "Atmosfer ayarlarını göster",
    );
  }
}
narrow.addEventListener("change", compactPanel);
compactPanel();
$(".brand").onclick = (e) => {
  e.preventDefault();
  state.time = 0;
  setFree(false);
};
function seek(t) {
  state.time = Math.max(0, Math.min(60, t));
  rig.transition = 0;
  setFree(false);
}
$("#timeline").onclick = (e) => {
  let r = $("#timeline").getBoundingClientRect();
  seek(((e.clientX - r.left) / r.width) * 60);
};
$("#timeline").onkeydown = (e) => {
  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
    e.preventDefault();
    seek((state.time % 60) + (e.key === "ArrowRight" ? 2 : -2));
  }
};
document.addEventListener("keydown", (e) => {
  if (e.target.tagName === "INPUT") return;
  if (e.code === "Space") {
    e.preventDefault();
    setPause(!state.paused);
  }
  if (e.key.toLowerCase() === "l") lightning();
  if (e.key.toLowerCase() === "m") $("#audio").click();
  if (e.key.toLowerCase() === "c") setFree(!rig.free);
  if (e.key.toLowerCase() === "f") $("#fps-toggle").click();
  if (e.key.toLowerCase() === "h") document.body.classList.toggle("clean");
  if (e.key.toLowerCase() === "p") photo(!state.photo);
  if (e.key === "Escape") {
    photo(false);
    document.body.classList.remove("clean");
  }
});
window.addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});
document.addEventListener("visibilitychange", () => {
  last = performance.now();
  if (sound.ctx) {
    if (document.hidden) sound.ctx.suspend();
    else if (sound.enabled) sound.ctx.resume();
  }
});

$("#quality").textContent = low ? "DÜŞÜK" : "YÜKSEK";
if (params.has("clean")) document.body.classList.add("clean");
setPause(state.paused);
function render(now) {
  requestAnimationFrame(render);
  let dt = (now - last) / 1000;
  last = now;
  if (document.hidden) return;
  real += dt;
  if (!state.paused) state.time += dt;
  U.uTime.value = state.time;
  U.uBeam.value = (state.time * Math.PI) / 8;
  sky.beams.rotation.y = U.uBeam.value;
  if (
    real > nextStrike &&
    state.storm > 0.18 &&
    !state.paused &&
    !params.has("still")
  )
    lightning();
  let age = real - strikeTime;
  let flash = params.has("flash")
    ? 0.85
    : age < 0.75
      ? Math.exp(-age * 8) * (0.55 + 0.45 * Math.pow(Math.cos(age * 34), 2))
      : 0;
  U.uFlash.value = flash;
  sky.bolts.visible = params.has("flash") || age < 0.35;
  sky.boltMat.opacity = params.has("flash") ? 1 : Math.max(0, 1 - age * 3);
  flashLight.intensity = flash * 10;
  hemi.intensity = 0.55 + state.dawn * 1.8;
  moon.intensity = 0.75 + state.dawn * 1.5;
  scene.fog.color.setRGB(
    0.01 + state.dawn * 0.1 + flash * 0.14,
    0.023 + state.dawn * 0.1 + flash * 0.19,
    0.035 + state.dawn * 0.1 + flash * 0.26,
  );
  scene.fog.density = 0.0039 + state.storm * 0.0018;
  env.update(state.time, state.storm, flash, state.dawn);
  rig.update(state.time, dt);
  renderer.render(scene, camera);
  frames++;
  if (now - fpsLast > 900) {
    state.fps = (frames * 1000) / (now - fpsLast);
    state.frameMs = (now - fpsLast) / frames;
    $("#fps").textContent = Math.round(state.fps);
    frames = 0;
    fpsLast = now;
  }
  frameSamples.push(now);
  if (frameSamples.length > 800) frameSamples.shift();
  const t = state.time % 60;
  $("#progress").style.width = `${(t / 60) * 100}%`;
  $("#timecode").innerHTML =
    `00:${String(Math.floor(t)).padStart(2, "0")} <em>/ 01:00</em>`;
  $("#timeline").setAttribute("aria-valuenow", t.toFixed(1));
}
rig.update(state.time, 0);
if (params.has("flash")) lightning();
renderer.compile(scene, camera);
renderer.render(scene, camera);
last = performance.now();
requestAnimationFrame(render);
setTimeout(() => $("#loading").classList.add("done"), 200);
window.__BOGAZ = {
  state,
  renderer,
  scene,
  camera,
  rig,
  U,
  ready: true,
  seek(t) {
    seek(t);
    rig.update(state.time, 0);
  },
  setFree,
  setStorm,
  setDawn,
  lightning,
  pause: setPause,
  photo,
  sound,
  metrics() {
    let a = frameSamples.filter((t) => t > performance.now() - 10000),
      d = [];
    for (let i = 1; i < a.length; i++) d.push(a[i] - a[i - 1]);
    d.sort((a, b) => a - b);
    return {
      fps: d.length ? 1000 / (d.reduce((a, b) => a + b, 0) / d.length) : 0,
      p95ms: d[Math.floor(d.length * 0.95)],
      frames: d.length,
      drawCalls: renderer.info.render.calls,
      triangles: renderer.info.render.triangles,
      resolution: renderer.getDrawingBufferSize(new T.Vector2()).toArray(),
      renderer: renderer
        .getContext()
        .getParameter(
          renderer.getContext().getExtension("WEBGL_debug_renderer_info")
            ?.UNMASKED_RENDERER_WEBGL || renderer.getContext().RENDERER,
        ),
    };
  },
};
