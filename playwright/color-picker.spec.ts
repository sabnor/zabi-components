import { expect, test, type Locator, type Page } from "@playwright/test";

import { gotoHydrated } from "./helpers/hydration";
import { touchDrag } from "./helpers/touch";

/**
 * ColorPicker's colour map in a browser: the parts jsdom cannot show.
 *
 * The map was an unnamed `role="button"` that only a mouse could use. It is
 * two sliders on one surface now (tests/color-picker.test.ts has what they
 * are and say). Here: that Tab reaches it once and shows where focus is, that
 * the arrow keys move the mark both ways, and that a finger can drag on it
 * without the page scrolling away under the finger.
 */

const PREVIEWS = "main .min-h-\\[100px\\]";

async function open(page: Page): Promise<Locator> {
    await gotoHydrated(page, "/components/ColorPicker");
    const swatch = page.locator(`${PREVIEWS} [data-color-picker-open]:not(:disabled)`).first();
    await swatch.scrollIntoViewIfNeeded();
    await swatch.click();
    const dialog = page.getByRole("dialog", { name: "Color picker" });
    await expect(dialog).toBeVisible();
    return dialog;
}

const hexOf = (dialog: Locator) =>
    dialog.getByRole("slider", { name: "Saturation" }).evaluate((input) => input.getAttribute("aria-valuetext")!.split(", ")[1]);

test.describe("ColorPicker's colour map: keyboard", () => {
    test("one Tab stop that shows where focus is, and arrow keys that move the mark both ways", async ({ page }) => {
        const dialog = await open(page);
        const area = dialog.getByRole("group", { name: "Saturation and lightness" });
        const saturation = dialog.getByRole("slider", { name: "Saturation" });
        const lightness = dialog.getByRole("slider", { name: "Lightness" });
        const hue = dialog.getByRole("slider", { name: "Hue slider" });
        await expect(area.getByRole("button")).toHaveCount(0);

        // From the swatch, Tab goes to the map, then to the hue slider: two stops in the picker.
        await page.locator(`${PREVIEWS} [data-color-picker-open]:not(:disabled)`).first().focus();
        await page.keyboard.press("Tab");
        await expect(saturation).toBeFocused();
        const ring = () =>
            area.evaluate((element) => {
                const style = getComputedStyle(element);
                return style.outlineStyle === "none" ? null : `${style.outlineStyle} ${style.outlineWidth}`;
            });
        expect(await ring(), "The sliders are not drawn, so the surface carries the ring").toBe("solid 2px");

        const mark = area.locator("div.rounded-full");
        const before = (await mark.boundingBox())!;
        const s = Number(await saturation.inputValue());
        const l = Number(await lightness.inputValue());
        await page.keyboard.press("ArrowLeft");
        await page.keyboard.press("ArrowLeft");
        await expect(saturation).toHaveValue(String(s - 2));
        await page.keyboard.press("Shift+ArrowUp");
        await expect(lightness).toHaveValue(String(Math.min(100, l + 10)));
        await expect(lightness, "Focus is on the slider that moved").toBeFocused();
        expect(await ring(), "And the ring is still there").toBe("solid 2px");
        const after = (await mark.boundingBox())!;
        expect(after.x).toBeLessThan(before.x);
        expect(after.y).toBeLessThan(before.y);
        // The value the field shows is the colour the sliders say.
        const field = page.locator(`${PREVIEWS} input[type="text"]:not(:disabled)`).first();
        await expect(field).toHaveValue(await hexOf(dialog));

        await page.keyboard.press("Tab");
        await expect(hue).toBeFocused();
        const hueRing = await hue.evaluate((input) => {
            const style = getComputedStyle(input.parentElement!);
            return style.outlineStyle === "none" ? null : `${style.outlineStyle} ${style.outlineWidth}`;
        });
        expect(hueRing, "The hue slider is transparent: its track carries the ring").toBe("solid 2px");
        await page.keyboard.press("Shift+Tab");
        await expect(saturation, "Back to the map's one stop, not to the slider that was left").toBeFocused();
    });

    test("with a mouse it works as before, and shows no ring", async ({ page }) => {
        const dialog = await open(page);
        const area = dialog.getByRole("group", { name: "Saturation and lightness" });
        const box = (await area.boundingBox())!;
        await page.mouse.move(box.x + box.width * 0.25, box.y + box.height * 0.75);
        await page.mouse.down();
        await expect(dialog.getByRole("slider", { name: "Saturation" })).toHaveValue("25");
        await expect(dialog.getByRole("slider", { name: "Lightness" })).toHaveValue("25");
        await page.mouse.move(box.x + box.width * 0.75, box.y + box.height * 0.25, { steps: 4 });
        await expect(dialog.getByRole("slider", { name: "Saturation" })).toHaveValue("75");
        await expect(dialog.getByRole("slider", { name: "Lightness" })).toHaveValue("75");
        await page.mouse.up();
        await page.mouse.move(box.x + 5, box.y + 5);
        await expect(dialog.getByRole("slider", { name: "Saturation" }), "Released").toHaveValue("75");
        expect(await area.evaluate((element) => getComputedStyle(element).outlineStyle)).toBe("none");
        // The press did not close the picker, and the keys carry on from there.
        await expect(dialog).toBeVisible();
        await page.keyboard.press("ArrowRight");
        await expect(dialog.getByRole("slider", { name: "Saturation" })).toHaveValue("76");
    });
});

test.describe("ColorPicker's colour map: a finger", () => {
    test.use({ viewport: { width: 375, height: 740 }, hasTouch: true, isMobile: true });

    test("a drag sets the colour and the page stays where it is", async ({ page }) => {
        const dialog = await open(page);
        const area = dialog.getByRole("group", { name: "Saturation and lightness" });
        await area.scrollIntoViewIfNeeded();
        const box = (await area.boundingBox())!;
        const scrolled = await page.evaluate(() => [window.scrollX, window.scrollY, document.querySelector("main")?.scrollTop ?? 0]);
        const from = { x: box.x + box.width * 0.5, y: box.y + box.height * 0.2 };
        const to = { x: box.x + box.width * 0.2, y: box.y + box.height * 0.8 };
        await touchDrag(page, from, to);
        await expect(dialog.getByRole("slider", { name: "Saturation" })).toHaveValue("20");
        await expect(dialog.getByRole("slider", { name: "Lightness" })).toHaveValue("20");
        expect(
            await page.evaluate(() => [window.scrollX, window.scrollY, document.querySelector("main")?.scrollTop ?? 0]),
            "A drag on the map must not scroll what is under it",
        ).toEqual(scrolled);
        await expect(dialog, "And the picker is still open").toBeVisible();
    });

    test("the hue track is a finger tall", async ({ page }) => {
        const dialog = await open(page);
        const hue = dialog.getByRole("slider", { name: "Hue slider" });
        expect(await page.evaluate(() => matchMedia("(pointer: coarse)").matches)).toBe(true);
        const box = (await hue.boundingBox())!;
        expect(box.height).toBeGreaterThanOrEqual(44);
        // And the map is far more than that: the whole surface is the target.
        const area = (await dialog.getByRole("group", { name: "Saturation and lightness" }).boundingBox())!;
        expect(Math.min(area.width, area.height)).toBeGreaterThanOrEqual(44);
    });
});
