const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
(async () => {
  const out = process.argv[2] || "onizleme";
  fs.mkdirSync(out, { recursive: true });
  const errors = [],
    messages = [];
  const browser = await chromium.launch({
    executablePath: "/usr/bin/chromium",
    headless: true,
    args: [
      "--no-sandbox",
      "--use-angle=swiftshader",
      "--enable-unsafe-swiftshader",
      "--disable-dev-shm-usage",
    ],
  });
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
  });
  page.on("pageerror", (e) => errors.push(e.stack));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
    messages.push({ type: m.type(), text: m.text() });
  });
  const requests = [];
  page.on("request", (r) => requests.push(r.url()));
  await page.goto("file://" + path.resolve("index.html"));
  await page.waitForFunction(() => window.__NY?.ready);
  await page.waitForTimeout(3000);
  await page.evaluate(
    () =>
      new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))),
  );
  await page.evaluate(() => __NY.freeze());
  await page.screenshot({
    animations: "disabled",
    path: path.join(out, "00-genel-bakis.png"),
  });
  const landmarks = await page.evaluate(() =>
    __NY.landmarks.map((l) => ({ id: l.id, name: l.name, key: l.key })),
  );
  for (let i = 0; i < landmarks.length; i++) {
    const l = landmarks[i];
    await page.keyboard.press(l.key);
    await page.waitForFunction(() => !__NY.camera.flying);
    await page.evaluate(
      () =>
        new Promise((r) =>
          requestAnimationFrame(() => requestAnimationFrame(r)),
        ),
    );
    if (
      (await page.locator(".place.active").getAttribute("data-place")) !== l.id
    )
      throw new Error("Wrong active landmark " + l.id);
    await page.screenshot({
      animations: "disabled",
      path: path.join(out, `${String(i + 1).padStart(2, "0")}-${l.id}.png`),
    });
    console.log("Captured", l.id);
  }
  await page.keyboard.press("o");
  await page.evaluate(() => __NY.setTime(22));
  await page.waitForFunction(() => !__NY.camera.flying);
  await page.evaluate(
    () =>
      new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))),
  );
  await page.screenshot({
    animations: "disabled",
    path: path.join(out, "11-gece.png"),
  });
  await page.evaluate(() => {
    __NY.setTime(13);
    __NY.setWeather("snow");
    __NY.freeze(false);
  });
  await page.waitForTimeout(1600);
  await page.screenshot({
    animations: "disabled",
    path: path.join(out, "12-karli.png"),
  });
  await page.evaluate(() => __NY.setWeather("fog"));
  await page.waitForTimeout(1000);
  await page.screenshot({
    animations: "disabled",
    path: path.join(out, "13-sisli.png"),
  });
  await page.evaluate(() => {
    __NY.setWeather("clear");
    __NY.setTime(17.5);
  });
  await page.locator("#photo").click();
  await page.waitForTimeout(500);
  const photoHidden = (await page.locator(".masthead").isVisible()) === false;
  const downloadPromise = page.waitForEvent("download");
  await page.locator("#download").click();
  const download = await downloadPromise;
  await download.saveAs(path.join(out, "14-fotograf.png"));
  await page.keyboard.press("Escape");
  await page.locator("#sound").click();
  const audioEnabled = await page
    .locator("#sound")
    .getAttribute("aria-pressed");
  await page.locator("#sound").click();
  const stats = await page.evaluate(() => ({
    stats: __NY.stats,
    fps: __NY.fps(),
    webgl: __NY.renderer
      .getContext()
      .getParameter(
        __NY.renderer.getContext().getExtension("WEBGL_debug_renderer_info")
          .UNMASKED_RENDERER_WEBGL,
      ),
  }));
  fs.writeFileSync(
    path.join(out, "rapor.json"),
    JSON.stringify(
      {
        errors,
        messages,
        requests,
        photoHidden,
        download: download.suggestedFilename(),
        audioEnabled,
        ...stats,
      },
      null,
      2,
    ),
  );
  console.log(
    JSON.stringify({ errors, photoHidden, audioEnabled, ...stats }, null, 2),
  );
  await browser.close();
})();
