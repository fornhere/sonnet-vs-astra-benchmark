import { chromium } from "playwright";
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
page.on("pageerror", console.error);
page.on("console", (m) => {
  if (m.type() === "error") console.error(m.text());
});
for (const [name, query] of [
  ["simsek", "still=1&t=0&flash=1"],
  ["huzme", "still=1&t=3.8&clean=1"],
]) {
  await page.goto("http://127.0.0.1:8080/?" + query);
  await page.waitForFunction(() => window.__BOGAZ?.ready);
  await page.waitForTimeout(900);
  await page.screenshot({ path: `onizleme/final/${name}.png` });
  console.log("Captured", name);
}
await browser.close();
