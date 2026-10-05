import { expect, test, type Page } from "@playwright/test";

/**
 * The site asks for the whole screen (`viewport-fit=cover` in src/app.html) so
 * that the phone components it demonstrates get real safe-area insets. In
 * return its own header, content and footer have to stay out from under a
 * notch and a home indicator. Insets are emulated over CDP, as in
 * app-shell.spec.ts.
 */

const CASES = [
    {
        name: "portrait",
        viewport: { width: 390, height: 844 },
        insets: { top: 47, bottom: 34, left: 0, right: 0 },
    },
    {
        name: "landscape",
        viewport: { width: 844, height: 390 },
        insets: { top: 0, bottom: 21, left: 47, right: 47 },
    },
];

type Insets = (typeof CASES)[number]["insets"];

async function emulate(page: Page, insets: Insets): Promise<void> {
    const cdp = await page.context().newCDPSession(page);
    await cdp.send("Emulation.setSafeAreaInsetsOverride", { insets });
}

/** Links, buttons and headings that are on screen but reach into an inset at the top or a side. */
function intruders(insets: Insets): string[] {
    const right = window.innerWidth - insets.right;
    const found: string[] = [];
    for (const el of document.querySelectorAll<HTMLElement>("nav a, nav button, main h1, main h2, main p, footer a, footer p")) {
        if (el.offsetParent === null || el.closest(".sr-only")) continue;
        const box = el.getBoundingClientRect();
        if (box.width < 2 || box.bottom <= 0 || box.top >= window.innerHeight) continue;
        // The catalog's closed drawer is parked off the left edge.
        if (box.right <= 0) continue;
        const inHeader = !!el.closest('nav[aria-label="Main navigation"]');
        if (box.left < insets.left - 0.5 || box.right > right + 0.5 || (inHeader && box.top < insets.top - 0.5)) {
            found.push(`${el.tagName.toLowerCase()} "${(el.textContent ?? "").trim().slice(0, 24)}"`);
        }
    }
    return found;
}

test("the site asks for the safe-area insets", async ({ page }) => {
    await page.goto("/docs", { waitUntil: "domcontentloaded" });
    await expect(page.locator('meta[name="viewport"]')).toHaveAttribute(
        "content",
        /viewport-fit=cover/,
    );
});

for (const { name, viewport, insets } of CASES) {
    test.describe(`safe areas, ${name}`, () => {
        test.use({ viewport });

        for (const path of ["/", "/docs", "/theming", "/components/Button"]) {
            test(`${path} keeps its header and content clear`, async ({ page }) => {
                await emulate(page, insets);
                await page.goto(path, { waitUntil: "domcontentloaded" });
                await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeVisible();

                expect(await page.evaluate(intruders, insets)).toEqual([]);
                expect(
                    await page.evaluate(() => document.documentElement.scrollWidth),
                ).toBeLessThanOrEqual(viewport.width);
            });
        }

        test("the footer ends above the home indicator", async ({ page }) => {
            await emulate(page, insets);
            await page.goto("/docs", { waitUntil: "domcontentloaded" });
            const lastLink = page.locator("footer a").last();
            await lastLink.scrollIntoViewIfNeeded();
            await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
            await expect
                .poll(async () => {
                    const box = await lastLink.boundingBox();
                    return box ? box.y + box.height : Infinity;
                })
                .toBeLessThanOrEqual(viewport.height - insets.bottom);
            expect(await page.evaluate(intruders, insets)).toEqual([]);
        });
    });
}
