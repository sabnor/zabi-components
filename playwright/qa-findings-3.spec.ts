import { expect, test, type Locator, type Page } from "@playwright/test";

import { waitForHydration } from "./helpers/hydration";

/**
 * Findings from the QA pass on the radius work, one describe per finding.
 * Each test fails without its fix. The capped Dropdown's scrolling box is in
 * playwright/dropdown-viewport.spec.ts, and the square-corner rule in
 * playwright/nested-radius.spec.ts.
 */

const PREVIEWS = "main .min-h-\\[100px\\]";

async function openPage(page: Page, name: string) {
    await page.goto(`/components/${name}`, { waitUntil: "domcontentloaded" });
    await expect(page.locator("main h1").first()).toBeVisible();
    await page.waitForLoadState("networkidle");
}

/** Clicks until the popup is there: the page is usable before it hydrates. */
async function openPopup(opener: Locator, popup: Locator) {
    await waitForHydration(opener);
    if (!(await popup.isVisible())) await opener.click();
    await expect(popup).toBeVisible();
    // An entry animation moves the panel: measure it at rest.
    await popup.page().waitForTimeout(400);
}

const radius = (locator: Locator) =>
    locator.evaluate((element) => parseFloat(getComputedStyle(element).borderTopLeftRadius));

/** Any CSS colour as sRGB bytes: the browser may hand back `oklch()` or `color()`. */
const TO_RGB = `(colour) => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    context.fillStyle = colour;
    context.fillRect(0, 0, 1, 1);
    return [...context.getImageData(0, 0, 1, 1).data].slice(0, 3);
}`;

function contrast(a: number[], b: number[]): number {
    const luminance = (rgb: number[]) => {
        const [r, g, blue] = rgb.map((value) => {
            const channel = value / 255;
            return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
        });
        return 0.2126 * r + 0.7152 * g + 0.0722 * blue;
    };
    const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
    return (light + 0.05) / (dark + 0.05);
}

test.describe("Popups share the overlay radius", () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test("Dropdown, Select's list, ColorPicker's popover and NavigationMenu's panel are all 16px", async ({
        page,
    }) => {
        await openPage(page, "Dropdown");
        const menu = page.locator('[role="menu"]').first();
        await openPopup(page.locator(PREVIEWS).getByRole("button", { name: "Project actions" }).first(), menu);
        expect(await radius(menu.locator("xpath=.."))).toBe(16);

        await openPage(page, "Select");
        const list = page.locator('[role="listbox"]').first();
        await openPopup(page.locator(PREVIEWS).locator('button[aria-haspopup="listbox"]').first(), list);
        expect(await radius(list.locator("xpath=.."))).toBe(16);

        await openPage(page, "ColorPicker");
        const popover = page.getByRole("dialog", { name: "Color picker" }).first();
        await openPopup(page.locator(PREVIEWS).getByRole("button", { name: "Open color picker" }).first(), popover);
        expect(await radius(popover)).toBe(16);

        await openPage(page, "NavigationMenu");
        const panel = page.locator("[data-navigation-menu-content]").first();
        await openPopup(
            page.locator(PREVIEWS).locator("[data-navigation-menu-trigger]", { hasText: "Components" }).first(),
            panel,
        );
        expect(await radius(panel)).toBe(16);
    });
});

test.describe("A disabled Select dims its text", () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    for (const dark of [false, true]) {
        test(`the value and the placeholder take the disabled colour, in the ${dark ? "dark" : "light"} theme`, async ({
            page,
        }) => {
            await page.goto("/chaos-lab/select-states", { waitUntil: "domcontentloaded" });
            await expect(page.getByTestId("lab-hydrated")).toBeAttached({ timeout: 30_000 });
            await page.evaluate((dark) => document.documentElement.classList.toggle("dark", dark), dark);
            const colours = await page.getByTestId("lab-select-states").evaluate(
                (host, toRgb) => {
                    const rgb = new Function(`return ${toRgb}`)() as (colour: string) => number[];
                    const probe = document.createElement("span");
                    probe.style.color = "var(--color-action-disabled-text)";
                    host.append(probe);
                    const disabledToken = rgb(getComputedStyle(probe).color);
                    probe.remove();
                    const triggers = [...host.querySelectorAll<HTMLElement>('button[aria-haspopup="listbox"]')];
                    return {
                        disabledToken,
                        text: triggers.map((trigger) => rgb(getComputedStyle(trigger.querySelector("span")!).color)),
                        disabled: triggers.map((trigger) => (trigger as HTMLButtonElement).disabled),
                    };
                },
                TO_RGB,
            );
            expect(colours.disabled).toEqual([false, true, true]);
            // Enabled: its own text colour. Disabled: the disabled one, value or placeholder alike.
            expect(colours.text[0]).not.toEqual(colours.disabledToken);
            expect(colours.text[1]).toEqual(colours.disabledToken);
            expect(colours.text[2]).toEqual(colours.disabledToken);
        });
    }
});

test.describe("SidebarNavigation search: the placeholder under the pointer", () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    for (const dark of [false, true]) {
        test(`is 4.5:1 or better on the hover fill, in the ${dark ? "dark" : "light"} theme`, async ({ page }) => {
            await openPage(page, "SidebarNavigation");
            await page.evaluate((dark) => document.documentElement.classList.toggle("dark", dark), dark);
            const field = page.locator(PREVIEWS).locator('input[type="search"]').first();
            await field.scrollIntoViewIfNeeded();
            const read = () =>
                field.evaluate((input, toRgb) => {
                    const rgb = new Function(`return ${toRgb}`)() as (colour: string) => number[];
                    const style = getComputedStyle(input);
                    return {
                        fill: style.backgroundColor,
                        fillRgb: rgb(style.backgroundColor),
                        placeholder: rgb(getComputedStyle(input, "::placeholder").color),
                    };
                }, TO_RGB);
            const resting = await read();
            await field.hover();
            // The fill changes over 150ms.
            await page.waitForTimeout(400);
            const hovered = await read();
            // There is a hover fill, and it is opaque: the contrast below is against it alone.
            expect(hovered.fill).not.toBe(resting.fill);
            expect(hovered.fill).not.toMatch(/rgba\([^)]*,\s*0(\.\d+)?\)|transparent|\/\s*0(\.\d+)?\)/);
            expect(contrast(hovered.placeholder, hovered.fillRgb)).toBeGreaterThanOrEqual(4.5);
        });
    }
});

test.describe("Docs site demos", () => {
    test("the Toaster page has one Toaster: a toast is drawn and announced once", async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 900 });
        await openPage(page, "Toaster");
        const push = page.locator(PREVIEWS).getByRole("button", { name: "Push sample toast" }).first();
        await waitForHydration(page);
        if ((await page.locator("[data-toast-id]").count()) === 0) await push.click();
        await expect(page.locator("[data-toast-id]").first()).toBeVisible();
        await page.waitForTimeout(300);
        const ids = await page
            .locator("[data-toast-id]")
            .evaluateAll((toasts) => toasts.map((toast) => toast.getAttribute("data-toast-id")));
        // No toast id appears twice in the page.
        expect(ids.length).toBeGreaterThan(0);
        expect(new Set(ids).size).toBe(ids.length);
    });

    test("the first Dropdown demo's items have the control radius inside the 16px panel", async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 900 });
        await openPage(page, "Dropdown");
        const opener = page.locator(PREVIEWS).getByRole("button", { name: "Select an option" }).first();
        const item = page.locator(PREVIEWS).locator('[role="menuitem"]').first();
        await openPopup(opener, item);
        expect(await radius(item)).toBe(8);
    });
});

test.describe("ColorPicker's popover on a phone", () => {
    for (const width of [375, 320]) {
        test.describe(`${width}px`, () => {
            test.use({ viewport: { width, height: 740 }, hasTouch: true, isMobile: true });

            test("stays inside the screen, 8px from each side, and widens nothing", async ({ page }) => {
                await openPage(page, "ColorPicker");
                const opener = page.locator(PREVIEWS).getByRole("button", { name: "Open color picker" }).first();
                const popover = page.getByRole("dialog", { name: "Color picker" }).first();
                await opener.scrollIntoViewIfNeeded();
                await openPopup(opener, popover);
                const box = await popover.evaluate((element) => {
                    const { left, right, top } = element.getBoundingClientRect();
                    return { left, right, top };
                });
                const screen = await page.evaluate(() => document.documentElement.clientWidth);
                expect(box.left).toBeGreaterThanOrEqual(7.5);
                expect(box.right).toBeLessThanOrEqual(screen - 7.5);
                // Still right under its swatch.
                const swatch = await opener.evaluate((element) => element.getBoundingClientRect().bottom);
                expect(box.top - swatch).toBeGreaterThanOrEqual(0);
                expect(box.top - swatch).toBeLessThanOrEqual(8);
                expect(
                    await page.evaluate(
                        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
                    ),
                ).toBe(0);
                // The colour field inside is whole: its right edge is inside the popover.
                const field = await popover.locator("canvas").first().evaluate((element) => {
                    const { left, right } = element.getBoundingClientRect();
                    return { left, right };
                });
                expect(field.left).toBeGreaterThanOrEqual(box.left);
                expect(field.right).toBeLessThanOrEqual(box.right);
            });
        });
    }
});
