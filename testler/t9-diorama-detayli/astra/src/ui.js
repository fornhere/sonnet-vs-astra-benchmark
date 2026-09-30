import { THREE, LANDMARKS } from "./core.js";
import { createAudio } from "./audio.js";
export function setupUI({
  scene,
  renderer,
  cameraRig,
  lights,
  atmosphere,
  post,
  stats,
}) {
  const $ = (s) => document.querySelector(s);
  const sound = createAudio();
  let current = "overview",
    photo = false;
  $("#places").innerHTML = LANDMARKS.map(
    (l, i) =>
      `<button class="place" data-place="${l.id}" title="${l.name} · ${l.key} tuşu"><span class="place-num">${String(i + 1).padStart(2, "0")}</span><span class="place-text">${l.name}</span><span class="place-arrow">↗</span></button>`,
  ).join("");
  function select(id) {
    current = id;
    document.body.classList.toggle("detail-view", id !== "overview");
    cameraRig.fly(id);
    document
      .querySelectorAll("[data-place]")
      .forEach((b) => b.classList.toggle("active", b.dataset.place === id));
    const l = LANDMARKS.find((x) => x.id === id);
    $("#info").hidden = !l;
    $("#map-note").style.opacity = l ? ".0" : "1";
    if (l) {
      $("#info-en").textContent = l.en;
      $("#info-name").textContent = l.name;
      $("#info-text").textContent = l.info;
      $("#info-coord").textContent =
        `${l.lat.toFixed(4)}° N · ${Math.abs(l.lon).toFixed(4)}° W`;
    }
  }
  document
    .querySelectorAll("[data-place]")
    .forEach((b) => (b.onclick = () => select(b.dataset.place)));
  $("#close-info").onclick = () => {
    $("#info").hidden = true;
    $("#map-note").style.opacity = "1";
  };
  $("#next-place").onclick = () => {
    const i = LANDMARKS.findIndex((l) => l.id === current);
    select(LANDMARKS[(i + 1) % LANDMARKS.length].id);
  };
  function setTime(v) {
    $("#time").value = v;
    const n = lights.setTime(Number(v));
    post.uniforms.night.value = n;
    const hours = Math.floor(v),
      mins = Math.floor((v - hours) * 60);
    const name =
      v < 8 ? "Şafak" : v < 15.5 ? "Öğlen" : v < 20 ? "Gün batımı" : "Gece";
    $("#time-name").innerHTML =
      `${name} <b>${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}</b>`;
    document.body.classList.toggle("night-ui", n > 0.5);
  }
  $("#time").oninput = (e) => setTime(e.target.value);
  function setWeather(v) {
    atmosphere.setWeather(v);
    document.querySelectorAll("[data-weather]").forEach((b) => {
      b.classList.toggle("active", b.dataset.weather === v);
      b.setAttribute("aria-pressed", String(b.dataset.weather === v));
    });
  }
  document
    .querySelectorAll("[data-weather]")
    .forEach((b) => (b.onclick = () => setWeather(b.dataset.weather)));
  $("#sound").onclick = async () => {
    try {
      const on = await sound.toggle();
      $("#sound").setAttribute(
        "aria-label",
        on ? "Şehir ambiyansını kapat" : "Şehir ambiyansını aç",
      );
      $("#sound").setAttribute("aria-pressed", String(on));
      $("#sound span").textContent = on ? "Ses açık" : "Ses kapalı";
      $("#sound").style.color = on ? "#b3944e" : "";
      toast(on ? "Şehrin uzak uğultusu açıldı." : "Ambiyans kapatıldı.");
    } catch {
      toast("Ses için tarayıcınızda Web Audio desteği gerekir.");
    }
  };
  function photoMode(v) {
    photo = v;
    document.body.classList.toggle("photo-mode", v);
    $("#photo-dock").hidden = !v;
    $("#hover-label").hidden = true;
    cameraRig.interrupt();
  }
  $("#photo").onclick = () => photoMode(true);
  $("#exit-photo").onclick = () => photoMode(false);
  function download() {
    post.render();
    const a = document.createElement("a");
    a.download = `New-York-${current}-${$("#time").value.replace(".", "-")}.png`;
    a.href = renderer.domElement.toDataURL("image/png");
    a.click();
    toast("Fotoğraf PNG olarak indirildi.");
  }
  $("#download").onclick = download;
  window.addEventListener("keydown", (e) => {
    if (e.target.matches("input,textarea")) return;
    const l = LANDMARKS.find((l) => l.key === e.key);
    if (l) {
      select(l.id);
      return;
    }
    if (e.key.toLowerCase() === "o" || e.key === "Home") select("overview");
    if (e.key.toLowerCase() === "p") photoMode(!photo);
    if (e.key === "Escape") photoMode(false);
    if (e.key.toLowerCase() === "f") $("#fps").hidden = !$("#fps").hidden;
  });
  cameraRig.onTour = (on) => {
    $("#tour-status").innerHTML =
      `<span></span> ${on ? "SİNEMATİK TUR" : "CANLI MAKET"}`;
  };
  const raycaster = new THREE.Raycaster(),
    mouse = new THREE.Vector2();
  const proxies = LANDMARKS.map((l) => {
    const width =
      l.id === "park"
        ? 20
        : l.id === "bridge"
          ? 26
          : l.id === "liberty"
            ? 8
            : 6;
    const proxy = new THREE.Mesh(
      new THREE.BoxGeometry(width, l.height, width),
      new THREE.MeshBasicMaterial(),
    );
    proxy.position.set(l.x, l.height / 2, l.z);
    proxy.updateMatrixWorld();
    proxy.userData.id = l.id;
    return proxy;
  });
  let down = null,
    lastHover = null;
  function pick(e) {
    mouse.set(
      (e.clientX / window.innerWidth) * 2 - 1,
      (-e.clientY / window.innerHeight) * 2 + 1,
    );
    raycaster.setFromCamera(mouse, cameraRig.camera);
    return raycaster.intersectObjects(proxies)[0]?.object.userData.id;
  }
  renderer.domElement.addEventListener("pointermove", (e) => {
    if (photo || e.buttons) {
      $("#hover-label").hidden = true;
      return;
    }
    const id = pick(e),
      l = LANDMARKS.find((l) => l.id === id);
    $("#hover-label").hidden = !l;
    if (l) {
      $("#hover-label").textContent = `${l.name} ↗`;
      $("#hover-label").style.left =
        `${Math.min(innerWidth - 180, e.clientX + 15)}px`;
      $("#hover-label").style.top = `${e.clientY + 16}px`;
    }
    renderer.domElement.style.cursor = l ? "pointer" : "grab";
    lastHover = id;
  });
  renderer.domElement.addEventListener(
    "pointerleave",
    () => ($("#hover-label").hidden = true),
  );
  renderer.domElement.addEventListener("pointerdown", (e) => {
    down = { x: e.clientX, y: e.clientY };
  });
  renderer.domElement.addEventListener("pointerup", (e) => {
    if (down && Math.hypot(down.x - e.clientX, down.y - e.clientY) < 5) {
      const id = pick(e);
      if (id && !photo) select(id);
    }
    down = null;
  });
  let toastTimeout;
  function toast(text) {
    $("#toast").textContent = text;
    $("#toast").classList.add("show");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => $("#toast").classList.remove("show"), 2600);
  }
  setTime(17.5);
  setWeather("clear");
  return {
    select,
    setTime,
    setWeather,
    photoMode,
    download,
    updateFPS(fps) {
      $(".compass svg").style.transform =
        `rotate(${cameraRig.controls.getAzimuthalAngle()}rad)`;
      $("#fps").textContent = `${Math.round(fps)} FPS`;
    },
  };
}
