const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");
(async () => {
  const useHardware = process.argv.includes("--gpu");
  const browser = await chromium.launch({
    executablePath: "/usr/bin/chromium",
    headless: true,
    args: [
      "--no-sandbox",
      ...(useHardware
        ? []
        : ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"]),
      "--disable-dev-shm-usage",
    ],
  });
  const results = [];
  for (const quality of ["high", "low"]) {
    const errors = [];
    const page = await browser.newPage({
      viewport: { width: 1920, height: 1080 },
    });
    page.on("pageerror", (e) => errors.push(e.stack));
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    await page.goto(
      "file://" +
        path.resolve("index.html") +
        (quality === "low" ? "?q=low" : ""),
    );
    await page.waitForFunction(() => __NY?.ready);
    await page.waitForTimeout(6000);
    await page.evaluate(() => __NY.resetMetrics());
    await page.waitForTimeout(15000);
    const r = await page.evaluate(() => ({
      fps: __NY.fps(),
      stats: __NY.stats,
      resolution: [
        __NY.renderer.domElement.width,
        __NY.renderer.domElement.height,
      ],
      renderer: __NY.renderer
        .getContext()
        .getParameter(
          __NY.renderer.getContext().getExtension("WEBGL_debug_renderer_info")
            .UNMASKED_RENDERER_WEBGL,
        ),
    }));
    results.push({ quality, viewport: [1920, 1080], errors, ...r });
    console.log(JSON.stringify(results.at(-1)));
    await page.close();
  }
  fs.writeFileSync(
    useHardware ? "kontrol/performans-gpu.json" : "kontrol/performans.json",
    JSON.stringify(
      {
        measuredAt: new Date().toISOString(),
        note: useHardware
          ? "Default Chromium renderer requested. Check renderer string to verify actual hardware. 15 second RAF measurement after 6 second warmup."
          : "Isolated headless Chromium with explicitly selected SwiftShader software Vulkan. 15 second RAF measurement after 6 second warmup. No screenshots during sampling.",
        results,
      },
      null,
      2,
    ),
  );
  await browser.close();
})();
