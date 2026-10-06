import { devices, expect, test, type Page } from "@playwright/test";

import { waitForHydration } from "./helpers/hydration";

/**
 * ImageUpload in a real browser (QA review of b76dace, and the fixes that
 * followed): the parts jsdom cannot show. jsdom evaluates no media queries,
 * so the unit test for the touch layout can only compare class names; and it
 * does not drop focus the way a browser does when the focused node is
 * unmounted.
 */

const PATH = "/components/ImageUpload";
/** 1x1 PNG. */
const PNG = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
    "base64",
);

const dropzone = (page: Page) =>
    page.getByRole("button", { name: "Cover image", exact: true }).first();
const actions = (page: Page) => page.getByTestId("image-upload-actions").first();

/** Picks a file through the real chooser, from the keyboard. */
async function pickImage(page: Page): Promise<void> {
    await page.goto(PATH, { waitUntil: "networkidle" });
    await waitForHydration(page);
    const chooser = page.waitForEvent("filechooser");
    await dropzone(page).focus();
    await page.keyboard.press("Enter");
    await (await chooser).setFiles({ name: "cover.png", mimeType: "image/png", buffer: PNG });
    await expect(actions(page)).toBeAttached();
}

test.describe("ImageUpload — names, focus and the overlay", () => {
    test("keyboard: Change and Remove are named after the label and focus reveals them", async ({
        page,
    }) => {
        await pickImage(page);
        const group = page.getByRole("group", { name: "Cover image" }).first();
        const change = group.getByRole("button", { name: "Change Cover image" });
        const remove = group.getByRole("button", { name: "Remove Cover image" });

        await expect(change, "A keyboard pick leaves focus on Change").toBeFocused();
        await expect(actions(page)).toHaveCSS("opacity", "1");
        await change.blur();
        await expect(
            actions(page),
            "With a mouse and nothing focused, the actions stay out of the way",
        ).toHaveCSS("opacity", "0");
        await change.focus();
        await expect(actions(page)).toHaveCSS("opacity", "1");
        await page.keyboard.press("Tab");
        await expect(remove).toBeFocused();
        await expect(actions(page)).toHaveCSS("opacity", "1");
    });

    // QA-IU-1: the empty and the filled state are different nodes, and the
    // swap unmounts whichever had focus. Focus used to fall to <body>, sending
    // a keyboard user back to the top of the page after every pick and every
    // Remove. It follows the control id: Change after a pick, the dropzone
    // after Remove.
    test("keyboard: focus follows the control across a pick and a Remove", async ({
        page,
    }) => {
        await pickImage(page);
        await expect(
            page.getByRole("button", { name: "Change Cover image" }).first(),
        ).toBeFocused();
        await expect(page.getByRole("status").filter({ hasText: "Image selected" })).toHaveCount(1);

        await page.getByRole("button", { name: "Remove Cover image" }).first().focus();
        await page.keyboard.press("Enter");
        await expect(dropzone(page)).toBeFocused();
        await expect(page.getByRole("status").filter({ hasText: "Image removed" })).toHaveCount(1);
    });

    test("mouse: a pick leaves the new preview uncovered and the layer lets the pointer through", async ({
        page,
    }) => {
        await page.goto(PATH, { waitUntil: "networkidle" });
        await waitForHydration(page);
        const chooser = page.waitForEvent("filechooser");
        await dropzone(page).click();
        await (await chooser).setFiles({ name: "cover.png", mimeType: "image/png", buffer: PNG });
        await expect(actions(page)).toBeAttached();
        await page.mouse.move(1, 1);

        // Focus is restored to Change, but without a focus ring to show there
        // is nothing to reveal: the overlay must not sit on the fresh preview.
        await expect(actions(page)).toHaveCSS("opacity", "0");
        const hit = await page
            .getByRole("group", { name: "Cover image" })
            .first()
            .locator("img")
            .evaluate((img) => {
                const box = img.getBoundingClientRect();
                return document.elementFromPoint(box.x + 12, box.y + 12) === img;
            });
        expect(hit, "The invisible layer must not take clicks meant for the preview").toBe(true);
    });

    test("narrow: Change and Remove wrap inside a 128px column", async ({ page }) => {
        await pickImage(page);
        const group = page.getByRole("group", { name: "Cover image" }).first();
        // group -> drop wrapper -> host element
        await group.evaluate((el) => {
            (el.parentElement!.parentElement as HTMLElement).style.width = "128px";
        });
        await page.getByRole("button", { name: "Change Cover image" }).first().focus();

        const preview = await group.boundingBox();
        expect(preview!.width).toBeCloseTo(128, 0);
        const boxes = [];
        for (const name of ["Change Cover image", "Remove Cover image"]) {
            const box = await page.getByRole("button", { name }).first().boundingBox();
            expect(box, name).toBeTruthy();
            expect(box!.x, `${name} left edge`).toBeGreaterThanOrEqual(preview!.x);
            expect(box!.x + box!.width, `${name} right edge`).toBeLessThanOrEqual(
                preview!.x + preview!.width,
            );
            expect(box!.y + box!.height, `${name} bottom edge`).toBeLessThanOrEqual(
                preview!.y + preview!.height,
            );
            boxes.push(box!);
        }
        expect(boxes[1].y, "Side by side they need 160px, so Remove wraps below").toBeGreaterThan(
            boxes[0].y,
        );
    });
});

test.describe("ImageUpload — touch", () => {
    const { defaultBrowserType: _browser, ...pixel } = devices["Pixel 7"];
    test.use(pixel);

    test("touch: the actions are visible as a strip, leave the preview in view, and respond to a tap", async ({
        page,
    }) => {
        await pickImage(page);
        expect(
            await page.evaluate(() => matchMedia("(pointer: coarse)").matches),
            "The emulated device must report a coarse pointer, or this test proves nothing",
        ).toBe(true);

        await expect(actions(page)).toHaveCSS("opacity", "1");
        const strip = await actions(page).boundingBox();
        const preview = await page.getByRole("group", { name: "Cover image" }).first().boundingBox();
        expect(strip && preview).toBeTruthy();
        expect(
            strip!.height,
            "A strip, not a full overlay: most of the preview stays uncovered",
        ).toBeLessThan(preview!.height / 2);

        for (const name of ["Change Cover image", "Remove Cover image"]) {
            const box = await page.getByRole("button", { name }).first().boundingBox();
            expect(box, name).toBeTruthy();
            // WCAG 2.5.8 minimum; 44px is the comfortable size and these are 32px tall.
            expect(Math.min(box!.width, box!.height), `${name} target size`).toBeGreaterThanOrEqual(24);
            expect(box!.x, `${name} stays inside the preview`).toBeGreaterThanOrEqual(preview!.x);
            expect(box!.x + box!.width).toBeLessThanOrEqual(preview!.x + preview!.width);
        }

        await page.getByRole("button", { name: "Remove Cover image" }).first().tap();
        await expect(dropzone(page)).toBeVisible();
        await expect(actions(page)).toHaveCount(0);
    });
});
