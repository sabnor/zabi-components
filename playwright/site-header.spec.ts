import { expect, test, type Page } from "@playwright/test";

import { waitForHydration } from "./helpers/hydration";

/**
 * The site's own header: five links, the brand menu and the theme toggle.
 *
 * That row needs about 820px, so the header folds into the phone menu below
 * 1024px (`collapseAt="lg"`). Nothing in it may widen the document, at the
 * widths on either side of that breakpoint and on the narrowest phone, in
 * either theme, with the phone menu open or closed.
 */

const WIDTHS = [320, 375, 768, 1023, 1024, 1280];
const LINKS = ["Components", "Docs", "Theming", "Storybook", "GitHub"];

const header = (page: Page) => page.getByRole("navigation", { name: "Main navigation" });
const menuButton = (page: Page) => page.getByRole("button", { name: /^(Open|Close) menu$/ });

async function expectNoSidewaysOverflow(page: Page, width: number, when: string): Promise<void> {
    const overflow = await page.evaluate(() => {
        const viewport = document.documentElement.clientWidth;
        const nav = document.querySelector('nav[aria-label="Main navigation"]');
        const past = [...(nav?.querySelectorAll("*") ?? [])]
            .filter((el) => {
                const box = el.getBoundingClientRect();
                return box.width > 0 && (box.right > viewport + 0.5 || box.left < -0.5);
            })
            .map((el) => `${el.tagName.toLowerCase()}.${String(el.getAttribute("class")).slice(0, 40)}`);
        return { scrollWidth: document.documentElement.scrollWidth, past: past.slice(0, 3) };
    });
    expect(overflow.scrollWidth, `document width, ${when}`).toBeLessThanOrEqual(width);
    expect(overflow.past, `header content past the viewport edge, ${when}`).toEqual([]);
}

for (const mode of ["light", "dark"] as const) {
    for (const width of WIDTHS) {
        test(`the header fits at ${width}px, ${mode}`, async ({ page }) => {
            await page.setViewportSize({ width, height: 800 });
            // The site's boot script reads this and sets the `dark` class.
            await page.addInitScript((theme) => localStorage.setItem("theme", theme), mode);
            await page.goto("/docs", { waitUntil: "domcontentloaded" });
            await expect
                .poll(() => page.evaluate(() => document.documentElement.classList.contains("dark")))
                .toBe(mode === "dark");

            await expectNoSidewaysOverflow(page, width, "menu closed");

            if (width >= 1024) {
                // The row: every link is in the bar, and there is no menu button.
                for (const name of LINKS) {
                    await expect(header(page).getByRole("link", { name }).first()).toBeVisible();
                }
                await expect(menuButton(page)).toBeHidden();
                return;
            }

            // The page is usable before it hydrates; a click that lands early is lost.
            await waitForHydration(page);
            if ((await page.getByRole("button", { name: "Close menu" }).count()) === 0) {
                await page.getByRole("button", { name: "Open menu" }).click();
            }
            await expect(header(page).getByRole("link", { name: "Theming" })).toBeVisible();

            for (const name of LINKS) {
                await expect(header(page).getByRole("link", { name }).first()).toBeVisible();
            }
            await expectNoSidewaysOverflow(page, width, "menu open");
        });
    }
}
