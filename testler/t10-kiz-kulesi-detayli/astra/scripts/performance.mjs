import { chromium } from "playwright";
import fs from "node:fs";
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
const results = [];
for (const q of ["high", "low"]) {
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  await page.goto(`http://127.0.0.1:8080/?q=${q}`);
  await page.waitForFunction(() => window.__BOGAZ?.ready);
  await page.waitForTimeout(2500);
  console.log("Measuring", q);
  await page.waitForTimeout(12000);
  const result = {
    quality: q,
    viewport: [1920, 1080],
    sampleSeconds: 10,
    ...(await page.evaluate(() => window.__BOGAZ.metrics())),
    errors,
  };
  results.push(result);
  console.log(JSON.stringify(result));
  await page.close();
}
fs.writeFileSync(
  "onizleme/performans.json",
  JSON.stringify(
    {
      date: new Date().toISOString(),
      hardware:
        "NVIDIA device inaccessible in sandbox; /dev/dri and /dev/nvidia* absent; headless ANGLE SwiftShader",
      results,
    },
    null,
    2,
  ),
);
await browser.close();
