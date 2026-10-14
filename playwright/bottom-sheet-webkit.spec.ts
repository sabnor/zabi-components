import { devices, expect, test } from "@playwright/test";

import { waitForHydration } from "./helpers/hydration";

/**
 * Z-088: on iOS Safari the sheet rose to the top of the screen as it opened,
 * then dropped to where it rests. The overlay root was `overflow: hidden`, a
 * scroll container; the panel waits below the screen during the slide, so the
 * root had room to scroll, and focusing the grip scrolled it. The panel was
 * then 32px high at rest (the filler under it) as well.
 *
 * It pins its own browser (WebKit with an iPhone 15 profile, which is not iOS
 * Safari), so it is left out of the default run and needs
 * `npx playwright install webkit`:
 *     PLAYWRIGHT_WEBKIT=1 npx playwright test playwright/bottom-sheet-webkit.spec.ts
 */
const { defaultBrowserType: _ignored, ...iPhone } = devices["iPhone 15"];
test.use({ ...iPhone, browserName: "webkit", reducedMotion: "no-preference" });

test("the sheet only translates up from below, and rests on the bottom edge", async ({ page }) => {
    await page.goto("/components/BottomSheet", { waitUntil: "domcontentloaded" });
    await waitForHydration(page);
    await page.evaluate(() => {
        const opener = document.querySelector('[data-testid="bottom-sheet-demo-open"]')!;
        opener.addEventListener(
            "click",
            () => {
                const rec: { top: number; scroll: number; anims: number }[] = ((window as any).__rec = []);
                const tick = () => {
                    const panel = document.querySelector('[role="dialog"]');
                    if (panel) {
                        rec.push({
                            top: panel.getBoundingClientRect().top,
                            scroll: panel.parentElement!.scrollTop,
                            anims: panel.getAnimations().length,
                        });
                    }
                    if (rec.length < 120) requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
            },
            true,
        );
    });
    await page.getByTestId("bottom-sheet-demo-open").click();
    await page.waitForTimeout(1500);

    const frames: { top: number; scroll: number; anims: number }[] = await page.evaluate(() => (window as any).__rec);
    const viewport = page.viewportSize()!.height;
    const rest = frames[frames.length - 1];
    const panelHeight = await page.getByRole("dialog").evaluate((el) => el.getBoundingClientRect().height);

    // Rests on the bottom edge: nothing scrolled it, so no 32px lift.
    expect(rest.top + panelHeight).toBeCloseTo(viewport, 0);
    // No frame has the root scrolled, and none is above the spring's own overshoot (5% of the panel).
    for (const frame of frames) {
        expect(frame.scroll).toBe(0);
        expect(frame.top).toBeGreaterThan(rest.top - panelHeight * 0.06);
    }
});
