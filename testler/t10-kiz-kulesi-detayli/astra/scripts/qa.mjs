import { chromium } from "playwright";
import fs from "node:fs";
const round = process.argv[2] || "final";
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
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 1,
});
const errors = [];
page.on(
  "pageerror",
  (e) => (errors.push(String(e)), console.log("PAGE ERROR", String(e))),
);
page.on("console", (m) => {
  if (m.type() === "error") {
    errors.push(m.text());
    console.log("CONSOLE ERROR", m.text());
  }
});
await page.goto("http://127.0.0.1:8080/?still=1", { waitUntil: "networkidle" });
await page.waitForFunction(() => window.__BOGAZ?.ready);
await page.waitForTimeout(1200);
for (const t of process.argv[3]
  ? process.argv[3].split(",").map(Number)
  : [0, 10, 20, 30, 40, 49]) {
  await page.evaluate((t) => window.__BOGAZ.seek(t), t);
  await page.waitForTimeout(450);
  await page.screenshot({
    path: `onizleme/${round}/${String(t).padStart(2, "0")}-sinematik.png`,
  });
  console.log("Captured", t);
}
await page.click("#free");
await page.mouse.move(960, 500);
await page.mouse.down();
await page.mouse.move(1160, 540, { steps: 12 });
await page.mouse.up();
await page.waitForTimeout(600);
await page.screenshot({ path: `onizleme/${round}/serbest.png` });
const metrics = await page.evaluate(() => window.__BOGAZ.metrics());
fs.writeFileSync(
  `onizleme/${round}/rapor.json`,
  JSON.stringify({ errors, metrics }, null, 2),
);
console.log(JSON.stringify({ errors, metrics }, null, 2));
await browser.close();
