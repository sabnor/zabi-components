import { expect, test, type Locator, type Page } from "@playwright/test";

import { waitForHydration } from "./helpers/hydration";

/**
 * Slider in a real browser: the parts jsdom cannot show.
 *
 * The track, its fill and the thumb are vendor pseudo-elements. jsdom does
 * not render them and `getComputedStyle` cannot read them, so what they look
 * like is checked from pixels. The keyboard and pointer behaviour is the
 * browser's own, which jsdom does not implement for a range input either.
 * Chromium only: the `::-moz-range-*` rules are written but not exercised.
 */

type Rgb = [number, number, number];

const volume = (page: Page) => page.getByTestId("slider-demo-volume");
const quality = (page: Page) => page.getByTestId("slider-demo-quality");

/** The page is usable before it hydrates; a key that lands early changes the input but not the bound value. */
async function gotoHydrated(page: Page) {
    await page.goto("/components/Slider", { waitUntil: "domcontentloaded" });
    await waitForHydration(page);
    await volume(page).focus();
    await page.keyboard.press("End");
    await expect(page.getByTestId("slider-demo-volume-value")).toHaveText("100");
    await volume(page).fill("40");
    await expect(page.getByTestId("slider-demo-volume-value")).toHaveText("40");
    await volume(page).blur();
    await page.mouse.move(0, 0);
}

/** Colour a token resolves to on this page. */
async function token(page: Page, name: string): Promise<Rgb> {
    return page.evaluate((variable) => {
        const probe = document.createElement("div");
        probe.style.backgroundColor = `var(${variable})`;
        document.body.append(probe);
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = 1;
        const context = canvas.getContext("2d")!;
        context.fillStyle = getComputedStyle(probe).backgroundColor;
        probe.remove();
        context.fillRect(0, 0, 1, 1);
        const [r, g, b] = context.getImageData(0, 0, 1, 1).data;
        return [r, g, b] as [number, number, number];
    }, name);
}

/** Pixel of the rendered input at `xOffset` px from its left edge, on its centre line (or `dy` px off it). */
async function pixel(page: Page, input: Locator, xOffset: number, dy = 0): Promise<Rgb> {
    const shot = (await input.screenshot({ animations: "disabled" })).toString("base64");
    return page.evaluate(
        async ({ data, x, dy }) => {
            const image = new Image();
            image.src = `data:image/png;base64,${data}`;
            await image.decode();
            const canvas = document.createElement("canvas");
            canvas.width = image.width;
            canvas.height = image.height;
            const context = canvas.getContext("2d")!;
            context.drawImage(image, 0, 0);
            const scale = image.width / (image.width / window.devicePixelRatio);
            const [r, g, b] = context.getImageData(
                Math.round(x * scale),
                Math.round(image.height / 2 + dy * scale),
                1,
                1,
            ).data;
            return [r, g, b] as [number, number, number];
        },
        { data: shot, x: xOffset, dy },
    );
}

function near(actual: Rgb, expected: Rgb, tolerance = 6) {
    return actual.every((channel, index) => Math.abs(channel - expected[index]) <= tolerance);
}

test.describe("Slider — rendering, keyboard and pointer", () => {
    test.beforeEach(async ({ page }) => {
        await gotoHydrated(page);
    });

    test("rendering: the track is filled up to the thumb in the brand colour, and the rest is the control track", async ({
        page,
    }) => {
        const input = volume(page);
        const width = (await input.boundingBox())!.width;
        const fill = await token(page, "--color-action-primary");
        const rest = await token(page, "--color-control-track");
        expect(near(fill, rest), "The two tokens must differ, or this proves nothing").toBe(false);

        // At 40: a point at 20% is filled, a point at 80% is not.
        expect(near(await pixel(page, input, width * 0.2), fill)).toBe(true);
        expect(near(await pixel(page, input, width * 0.8), rest)).toBe(true);

        await input.fill("90");
        await page.mouse.move(0, 0);
        expect(near(await pixel(page, input, width * 0.8), fill)).toBe(true);

        await input.fill("10");
        expect(near(await pixel(page, input, width * 0.2), rest)).toBe(true);

        // The track is a thin bar, not the default control: well above it is the card.
        const above = await pixel(page, input, width * 0.8, -14);
        expect(near(above, rest)).toBe(false);
    });

    test("rendering: the fill is on the right in a right-to-left layout, and the arrows swap", async ({
        page,
    }) => {
        const input = volume(page);
        await input.evaluate((el) => el.closest("div")!.setAttribute("dir", "rtl"));
        const width = (await input.boundingBox())!.width;
        const fill = await token(page, "--color-action-primary");
        const rest = await token(page, "--color-control-track");

        expect(near(await pixel(page, input, width * 0.9), fill)).toBe(true);
        expect(near(await pixel(page, input, width * 0.2), rest)).toBe(true);

        await input.focus();
        await page.keyboard.press("ArrowLeft");
        await expect(page.getByTestId("slider-demo-volume-value")).toHaveText("41");
    });

    test("keyboard: the native keys move by the step, and the shown value and valuetext follow", async ({
        page,
    }) => {
        const input = quality(page);
        const shown = page.locator("[data-slider-value]").first();
        await input.focus();
        await expect(shown).toHaveText("80 %");

        await page.keyboard.press("ArrowRight");
        await expect(shown).toHaveText("90 %");
        await page.keyboard.press("ArrowDown");
        await page.keyboard.press("ArrowLeft");
        await expect(shown).toHaveText("70 %");
        await page.keyboard.press("Home");
        await expect(shown).toHaveText("10 %");
        await page.keyboard.press("End");
        await expect(shown).toHaveText("100 %");
        await page.keyboard.press("PageDown");
        await expect(shown).not.toHaveText("100 %");
        await expect(input).toHaveAttribute("aria-valuetext", /^\d+ %$/);

        // What Chromium hands to assistive technology.
        await page.keyboard.press("Home");
        const client = await page.context().newCDPSession(page);
        await client.send("Accessibility.enable");
        const { nodes } = await client.send("Accessibility.getFullAXTree");
        const node = nodes.find(
            (candidate) =>
                candidate.role?.value === "slider" && candidate.name?.value === "Image quality",
        );
        expect(node, "A slider named by its label").toBeTruthy();
        // The tree's own "valuetext" property does not carry aria-valuetext
        // (it is empty for a plain ARIA slider with one, too), so the
        // attribute is what can be checked here.
        await expect(input).toHaveAttribute("aria-valuetext", "10 %");
        expect(node!.description?.value).toBe("Lower quality makes smaller files.");
    });

    test("focus: the ring is drawn around the thumb on keyboard focus only", async ({ page }) => {
        const input = volume(page);
        const width = (await input.boundingBox())!.width;
        const ring = await token(page, "--color-focus-ring");
        // Thumb centre at 40% of the travel: 10px + 0.4 * (width - 20px); its edge is 10px out.
        const edge = 10 + 0.4 * (width - 20) + 10;

        // Anti-aliasing moves the ring by a pixel; look across the few just outside the edge.
        const ringNear = async () => {
            for (let dx = 0; dx <= 6; dx += 1) {
                if (near(await pixel(page, input, edge + dx), ring, 12)) return true;
            }
            return false;
        };

        await input.click({ position: { x: 10 + 0.4 * (width - 20), y: 22 } });
        await input.fill("40");
        await page.mouse.move(0, 0);
        expect(await ringNear(), "A mouse click does not draw the focus ring").toBe(false);

        await input.blur();
        await input.focus();
        await page.keyboard.press("ArrowRight");
        await page.keyboard.press("ArrowLeft");
        await expect(input).toHaveValue("40");
        expect(await ringNear(), "Keyboard focus draws the ring just outside the thumb").toBe(true);
    });

    test("pointer: a click on the track and a drag both set the value", async ({ page }) => {
        const input = volume(page);
        const value = page.getByTestId("slider-demo-volume-value");
        const box = (await input.boundingBox())!;

        await page.mouse.click(box.x + box.width * 0.75, box.y + box.height / 2);
        const clicked = Number(await value.textContent());
        expect(clicked).toBeGreaterThan(70);
        expect(clicked).toBeLessThan(80);

        await page.mouse.move(box.x + box.width * 0.75, box.y + box.height / 2);
        await page.mouse.down();
        await page.mouse.move(box.x + box.width * 0.25, box.y + box.height / 2, { steps: 6 });
        await page.mouse.up();
        const dragged = Number(await value.textContent());
        expect(dragged).toBeGreaterThan(20);
        expect(dragged).toBeLessThan(30);
    });

    test("geometry: rows are 32, 40 and 48px, and every input is at least 44px tall to the pointer", async ({
        page,
    }) => {
        const heights = await page.evaluate(() =>
            ["Small", "Medium", "Large"].map((name) => {
                const label = Array.from(document.querySelectorAll("label")).find(
                    (candidate) => candidate.textContent?.trim() === name,
                )!;
                const input = document.getElementById(label.htmlFor)!;
                return {
                    row: input.parentElement!.getBoundingClientRect().height,
                    input: input.getBoundingClientRect().height,
                };
            }),
        );
        expect(heights.map((entry) => entry.row)).toEqual([32, 40, 48]);
        for (const entry of heights) expect(entry.input).toBeGreaterThanOrEqual(44);

        // The taller input is hit-tested above the thin track: 18px off the
        // centre line is still the slider.
        const input = volume(page);
        const box = (await input.boundingBox())!;
        await page.mouse.click(box.x + box.width * 0.6, box.y + box.height / 2 - 18);
        expect(
            Number(await page.getByTestId("slider-demo-volume-value").textContent()),
        ).toBeGreaterThan(55);
    });

    test("disabled: greyed out with the disabled tokens and out of the Tab order", async ({
        page,
    }) => {
        const input = page.getByRole("slider", { name: "Locked by your plan" });
        await input.scrollIntoViewIfNeeded();
        await expect(input).toBeDisabled();
        const width = (await input.boundingBox())!.width;
        const fill = await token(page, "--color-action-disabled-text");
        const rest = await token(page, "--color-action-disabled");
        expect(near(await pixel(page, input, width * 0.1), fill)).toBe(true);
        expect(near(await pixel(page, input, width * 0.8), rest)).toBe(true);
    });
});

test.describe("Slider — dark theme", () => {
    test.use({ colorScheme: "dark" });

    test("rendering: fill and rest use the dark values of the same tokens", async ({ page }) => {
        await gotoHydrated(page);
        await page.evaluate(() => document.documentElement.classList.add("dark"));
        const input = volume(page);
        const width = (await input.boundingBox())!.width;
        const fill = await token(page, "--color-action-primary");
        const rest = await token(page, "--color-control-track");
        expect(near(await pixel(page, input, width * 0.2), fill)).toBe(true);
        expect(near(await pixel(page, input, width * 0.8), rest)).toBe(true);
    });
});

test.describe("Slider — touch", () => {
    test.use({ hasTouch: true });

    test("touch: a tap on the track sets the value", async ({ page }) => {
        await gotoHydrated(page);
        const input = volume(page);
        const box = (await input.boundingBox())!;
        await page.touchscreen.tap(box.x + box.width * 0.75, box.y + box.height / 2);
        const value = Number(await page.getByTestId("slider-demo-volume-value").textContent());
        expect(value).toBeGreaterThan(70);
        expect(value).toBeLessThan(80);
    });
});
