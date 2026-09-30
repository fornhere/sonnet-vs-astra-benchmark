const { chromium } = require("playwright");
const fs = require("fs");
(async () => {
  const b = await chromium.launch({
    executablePath: "/usr/bin/chromium",
    headless: true,
    args: [
      "--no-sandbox",
      "--use-angle=swiftshader",
      "--enable-unsafe-swiftshader",
      "--disable-dev-shm-usage",
    ],
  });
  const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
  const errors = [],
    requests = [];
  p.on("pageerror", (e) => errors.push(e.stack));
  p.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  p.on("request", (r) => requests.push(r.url()));
  await p.goto("http://127.0.0.1:8000/?q=low");
  await p.waitForFunction(() => window.__NY?.ready);
  await p.waitForTimeout(2200);
  const checks = {};
  await p.keyboard.press("f");
  checks.fpsHide = await p.locator("#fps").isHidden();
  await p.keyboard.press("f");
  checks.fpsShow = await p.locator("#fps").isVisible();
  await p.locator('[data-place="liberty"]').click();
  await p.waitForFunction(() => !__NY.camera.flying);
  checks.panelSelect =
    (await p.locator("#info-name").textContent()) === "Özgürlük Heykeli";
  const labelPoint = await p.evaluate(() => {
    const cam = __NY.camera.camera,
      l = __NY.landmarks.find((l) => l.id === "liberty");
    const point = cam.position
      .clone()
      .set(l.x, l.height * 0.55, l.z)
      .project(cam);
    return {
      x: ((point.x + 1) / 2) * innerWidth,
      y: ((1 - point.y) / 2) * innerHeight,
    };
  });
  await p.mouse.move(labelPoint.x, labelPoint.y);
  await p.waitForTimeout(400);
  checks.hoverLabel =
    (await p.locator("#hover-label").textContent()).includes(
      "Özgürlük Heykeli",
    ) && (await p.locator("#hover-label").isVisible());
  const before = await p.evaluate(() => __NY.camera.camera.zoom);
  await p.mouse.wheel(0, -180);
  await p.waitForTimeout(900);
  checks.wheelZoom = (await p.evaluate(() => __NY.camera.camera.zoom)) > before;
  const pos = await p.evaluate(() => __NY.camera.camera.position.toArray());
  await p.mouse.move(550, 350);
  await p.mouse.down();
  await p.mouse.move(660, 390, { steps: 6 });
  await p.mouse.up();
  await p.waitForTimeout(600);
  const after = await p.evaluate(() => __NY.camera.camera.position.toArray());
  checks.orbitMoved = JSON.stringify(pos) !== JSON.stringify(after);
  await p.locator("#time").focus();
  await p.keyboard.press("End");
  checks.timeControl = await p.locator("#time-name").textContent();
  await p.locator('[data-weather="snow"]').click();
  checks.weatherButton =
    (await p.locator('[data-weather="snow"]').getAttribute("aria-pressed")) ===
    "true";
  await p.keyboard.press("p");
  checks.photoKey =
    (await p.locator("#photo-dock").isVisible()) &&
    (await p.locator(".masthead").isHidden());
  await p.keyboard.press("Escape");
  checks.photoEscape = await p.locator(".masthead").isVisible();
  await p.keyboard.press("o");
  await p.waitForFunction(() => !__NY.camera.flying);
  await p.mouse.move(10, 400);
  await p.waitForTimeout(20800);
  checks.autoTour = (await p.locator("#tour-status").textContent()).includes(
    "SİNEMATİK",
  );
  await p.mouse.move(11, 400);
  await p.waitForTimeout(400);
  checks.tourStopsOnInput = (
    await p.locator("#tour-status").textContent()
  ).includes("CANLI");
  await p.setViewportSize({ width: 390, height: 844 });
  await p.evaluate(() => {
    __NY.setTime(17.5);
    __NY.setWeather("clear");
    __NY.select("overview");
  });
  await p.waitForFunction(() => !__NY.camera.flying);
  await p.evaluate(
    () =>
      new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))),
  );
  await p.screenshot({ path: "kontrol/mobil-390.png", animations: "disabled" });
  checks.mobileNoHorizontalOverflow = await p.evaluate(
    () => document.documentElement.scrollWidth <= innerWidth,
  );
  await p.locator('[data-place="grand"]').scrollIntoViewIfNeeded();
  await p.locator('[data-place="grand"]').click();
  await p.waitForFunction(() => !__NY.camera.flying);
  checks.mobileSelection =
    (await p.locator("#info-name").textContent()) === "Grand Central";
  await p.screenshot({
    path: "kontrol/mobil-grand.png",
    animations: "disabled",
  });
  fs.writeFileSync(
    "kontrol/etkilesim.json",
    JSON.stringify({ errors, requests, checks }, null, 2),
  );
  console.log(JSON.stringify({ errors, checks }, null, 2));
  await b.close();
})();
