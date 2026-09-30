import { chromium } from "playwright";
import fs from "node:fs";
import assert from "node:assert/strict";
const browser = await chromium.launch({
  executablePath: "/usr/bin/chromium",
  headless: true,
  args: [
    "--no-sandbox",
    "--enable-unsafe-swiftshader",
    "--disable-dev-shm-usage",
  ],
  env: { ...process.env, TMPDIR: process.cwd() + "/.tmp" },
});
const page = await browser.newPage({
  viewport: { width: 1280, height: 720 },
  deviceScaleFactor: 1,
  acceptDownloads: true,
});
const errors = [],
  external = [],
  checks = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
page.on("request", (r) => {
  if (/^https?:/.test(r.url()) && !r.url().includes("127.0.0.1"))
    external.push(r.url());
});
try {
  await page.goto("http://127.0.0.1:8080/?still=1");
  await page.waitForFunction(() => window.__BOGAZ?.ready);
  await page.waitForTimeout(700);
  const seam = await page.evaluate(() => {
    let b = window.__BOGAZ,
      r = b.rig;
    const a = r.path.getPoint(0),
      z = r.path.getPoint(1),
      ta = r.path.getPoint(0.0000001).sub(a).normalize(),
      tz = z.clone().sub(r.path.getPoint(0.9999999)).normalize();
    let minY = 100,
      minR = 100;
    for (let i = 0; i < 1200; i++) {
      let p = r.path.getPoint(i / 1200);
      minY = Math.min(minY, p.y);
      minR = Math.min(minR, Math.hypot(p.x + 3, p.z));
    }
    b.seek(0);
    let q = b.camera.quaternion.clone();
    b.seek(60);
    return {
      positionError: a.distanceTo(z),
      tangentError: ta.distanceTo(tz),
      rotationError: q.angleTo(b.camera.quaternion),
      minimumHeight: minY,
      minimumRadius: minR,
    };
  });
  assert(seam.positionError < 1e-9);
  assert(seam.rotationError < 1e-9);
  checks.push({ cameraSeam: seam });
  await page.locator("#storm").fill("0");
  assert.equal(await page.evaluate(() => window.__BOGAZ.state.storm), 0);
  await page.locator("#storm").fill("100");
  assert.equal(await page.evaluate(() => window.__BOGAZ.state.storm), 1);
  checks.push("Storm slider: 0 and 100");
  await page.locator("#time").fill("100");
  assert.equal(await page.evaluate(() => window.__BOGAZ.state.dawn), 1);
  await page.waitForTimeout(300);
  await page.screenshot({ path: "onizleme/final/safak.png" });
  await page.locator("#time").fill("0");
  checks.push("Dawn slider: full range");
  await page.click("#fps-toggle");
  assert.equal(await page.locator("#fps").isVisible(), true);
  await page.click("#fps-toggle");
  assert.equal(await page.locator("#fps").isVisible(), false);
  checks.push("FPS: show/hide");
  await page.click("#audio");
  await page.waitForTimeout(800);
  const audio = await page.evaluate(() => ({
    enabled: window.__BOGAZ.sound.enabled,
    status: window.__BOGAZ.sound.ctx.state,
    layers: window.__BOGAZ.sound.layers.length,
  }));
  assert.equal(audio.status, "running");
  assert.equal(audio.layers, 3);
  assert.equal(audio.enabled, true);
  await page.click("#lightning");
  await page.waitForTimeout(3400);
  await page.click("#audio");
  assert.equal(await page.evaluate(() => window.__BOGAZ.sound.enabled), false);
  checks.push({
    audio,
    thunderDelay: "1–3 s scheduled; 3.4 s observation, no errors",
  });
  await page.click("#settings-toggle");
  assert.equal(
    await page.locator("#settings-toggle").getAttribute("aria-expanded"),
    "false",
  );
  await page.click("#settings-toggle");
  checks.push("Settings: hide/show");
  await page.click("#free");
  assert.equal(await page.evaluate(() => window.__BOGAZ.rig.free), true);
  const before = await page.evaluate(() =>
    window.__BOGAZ.camera.position.toArray(),
  );
  await page.mouse.move(600, 350);
  await page.mouse.down();
  await page.mouse.move(850, 410, { steps: 10 });
  await page.mouse.up();
  await page.waitForTimeout(500);
  const after = await page.evaluate(() =>
    window.__BOGAZ.camera.position.toArray(),
  );
  assert.notDeepEqual(before, after);
  await page.click("#free");
  assert.equal(await page.evaluate(() => window.__BOGAZ.rig.free), false);
  checks.push("Orbit drag and return to cinematic");
  await page.click("#photo");
  assert.equal(
    await page.evaluate(() => document.body.classList.contains("photo")),
    true,
  );
  const dlPromise = page.waitForEvent("download");
  await page.click("#download");
  let dl = await dlPromise;
  await dl.saveAs("onizleme/final/fotograf.png");
  const png = fs.readFileSync("onizleme/final/fotograf.png");
  assert(png.length > 10000);
  checks.push({
    png: [png.readUInt32BE(16), png.readUInt32BE(20)],
    bytes: png.length,
  });
  await page.keyboard.press("Escape");
  assert.equal(await page.locator("#photo-ui").isVisible(), false);
  await page.goto("file://" + process.cwd() + "/index.html?still=1&q=low");
  await page.waitForFunction(() => window.__BOGAZ?.ready);
  await page.waitForTimeout(600);
  assert.equal(await page.evaluate(() => window.__BOGAZ.state.quality), "low");
  checks.push("file:// offline bundle and low mode");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(400);
  await page.screenshot({ path: "onizleme/final/mobil.png" });
  checks.push("390×844 responsive view");
  assert.equal(external.length, 0);
  assert.equal(errors.length, 0);
  const report = { passed: true, checks, errors, external };
  fs.writeFileSync(
    "onizleme/islev-testleri.json",
    JSON.stringify(report, null, 2),
  );
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser.close();
}
