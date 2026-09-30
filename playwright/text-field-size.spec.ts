import { expect, test, type Locator, type Page } from "@playwright/test";

/**
 * iOS Safari zooms the page when a focused field is under 16px, so the text
 * of Input, Select and Textarea is 16px below the `sm` breakpoint and keeps
 * its size from there up. jsdom evaluates no media queries; this is where the
 * computed size, and the unchanged control height, can be measured. It runs
 * in Chromium: the zoom itself is an iOS Safari behaviour and is not tested.
 */

const PHONE = { width: 390, height: 844 };
const DESKTOP = { width: 1024, height: 900 };

const fields: { name: string; path: string; field: (page: Page) => Locator; height?: number }[] = [
    {
        name: "Input",
        path: "/components/Input",
        field: (page) => page.getByRole("textbox", { name: "Email address" }).first(),
        height: 40,
    },
    {
        name: "Select",
        path: "/components/Select",
        field: (page) => page.getByRole("button", { name: /Default \(No Search\)/ }).first(),
        height: 40,
    },
    {
        name: "Textarea",
        path: "/components/Textarea",
        field: (page) => page.getByRole("textbox", { name: "Project notes" }).first(),
    },
];

for (const { name, path, field, height } of fields) {
    test(`${name}: 16px text on a phone, 14px from sm up, same height at both`, async ({
        page,
    }) => {
        await page.setViewportSize(DESKTOP);
        await page.goto(path, { waitUntil: "domcontentloaded" });
        await expect(field(page)).toHaveCSS("font-size", "14px");
        const desktop = await field(page).boundingBox();

        await page.setViewportSize(PHONE);
        await expect(field(page)).toHaveCSS("font-size", "16px");
        const phone = await field(page).boundingBox();

        expect(phone!.height, "The larger text must not grow the control").toBe(desktop!.height);
        if (height) expect(phone!.height).toBe(height);
        const clipped = await field(page).evaluate(
            (element) => element.scrollHeight > element.clientHeight,
        );
        expect(clipped, "The text must fit the box").toBe(false);
    });
}

test("labels keep their size on a phone", async ({ page }) => {
    await page.setViewportSize(PHONE);
    await page.goto("/components/Input", { waitUntil: "domcontentloaded" });

    await expect(page.locator("label", { hasText: "Email address" }).first()).toHaveCSS(
        "font-size",
        "14px",
    );
});
