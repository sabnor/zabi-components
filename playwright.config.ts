import { defineConfig, devices } from "@playwright/test";

const port = Number(process.env.PLAYWRIGHT_PORT ?? "5180");
const baseURL =
    process.env.PLAYWRIGHT_BASE_URL ?? `http://127.0.0.1:${port}`;

export default defineConfig({
    testDir: "playwright",
    timeout: 60_000,
    expect: { timeout: 15_000 },
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    /** First failure is enough for this small suite; speeds up CI signal. */
    maxFailures: process.env.CI ? 1 : 0,
    workers: process.env.CI ? 2 : undefined,
    reporter: process.env.CI
        ? [
              ["github"],
              ["list"],
          ]
        : [["list"]],
    use: {
        ...devices["Desktop Chrome"],
        baseURL,
        trace: process.env.CI ? "on-first-retry" : "retain-on-failure",
    },
    webServer: {
        command: `npx vite dev --host 127.0.0.1 --port ${port}`,
        url: baseURL,
        // Always start a fresh server so route/layout changes (e.g. `+layout@`) are picked up.
        reuseExistingServer: process.env.PLAYWRIGHT_REUSE_SERVER === "1",
        timeout: 180_000,
    },
});
