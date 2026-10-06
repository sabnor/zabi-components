import { expect, test, type Page } from "@playwright/test";

/**
 * The accent role in a browser, and text and focus on a filled block.
 *
 * `.bg-accent` is one of the hand-written colour classes, outside every cascade
 * layer, so it beat the generated `hover:bg-accent-hover` and
 * `active:bg-accent-active`: an accent button stayed on its resting fill under
 * the pointer. The variants are restated by hand now. Whether a rule wins is a
 * cascade question, so it is measured here, on the real `Button
 * variant="accent"` and on bare elements for the class lists no component
 * renders (text and border).
 *
 * Also here: Tailwind's `font-sans` following the theme's font token, the
 * `inherit` and `on-*` tones, the `on-brand` block's focus ring, and the
 * accent tone of Rating.
 */

const PREVIEWS = "main .min-h-\\[100px\\]";

async function openPage(page: Page, name: string, dark = false) {
    await page.goto(`/components/${name}`, { waitUntil: "domcontentloaded" });
    await expect(page.locator("main h1").first()).toBeVisible();
    await page.waitForLoadState("networkidle");
    await page.evaluate((on) => document.documentElement.classList.toggle("dark", on), dark);
    await page.addStyleTag({ content: "*, *::before, *::after { transition: none !important; }" });
}

/** A token as the colour the browser computes for it. */
const token = (page: Page, name: string) =>
    page.evaluate((variable) => {
        const probe = document.createElement("div");
        probe.style.color = `var(${variable})`;
        document.body.append(probe);
        const colour = getComputedStyle(probe).color;
        probe.remove();
        return colour;
    }, name);

/** WCAG contrast of two computed colours, measured in the page. */
const contrast = (page: Page, a: string, b: string) =>
    page.evaluate(
        ([first, second]) => {
            const canvas = document.createElement("canvas");
            canvas.width = canvas.height = 1;
            const context = canvas.getContext("2d", { willReadFrequently: true })!;
            const luminance = (colour: string) => {
                context.clearRect(0, 0, 1, 1);
                context.fillStyle = colour;
                context.fillRect(0, 0, 1, 1);
                const [r, g, b] = [...context.getImageData(0, 0, 1, 1).data].slice(0, 3).map((channel) => {
                    const value = channel / 255;
                    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
                });
                return 0.2126 * r + 0.7152 * g + 0.0722 * b;
            };
            const [hi, lo] = [luminance(first), luminance(second)].sort((x, y) => y - x);
            return (hi + 0.05) / (lo + 0.05);
        },
        [a, b],
    );

for (const dark of [false, true]) {
    const mode = dark ? "dark" : "light";

    test.describe(`accent, ${mode}`, () => {
        test('Button variant="accent": the fill, its hover and its pressed step, and its label', async ({ page }) => {
            await openPage(page, "Button", dark);
            const button = page.locator(PREVIEWS).getByRole("button", { name: "Accent", exact: true }).first();
            await button.scrollIntoViewIfNeeded();
            const fill = () => button.evaluate((node) => getComputedStyle(node).backgroundColor);
            const [accent, hover, active, on] = await Promise.all(
                ["--color-accent", "--color-accent-hover", "--color-accent-active", "--color-on-accent"].map((name) => token(page, name)),
            );
            expect(new Set([accent, hover, active]).size).toBe(3);

            await page.mouse.move(0, 0);
            expect(await fill()).toBe(accent);
            expect(await button.evaluate((node) => getComputedStyle(node).color)).toBe(on);
            expect(await contrast(page, on, accent)).toBeGreaterThanOrEqual(4.5);

            const box = (await button.boundingBox())!;
            await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
            // It stayed on the resting fill here: `.bg-accent` beat the generated variant.
            expect(await fill()).toBe(hover);
            await page.mouse.down();
            try {
                expect(await fill()).toBe(active);
                expect(await contrast(page, on, active)).toBeGreaterThanOrEqual(4.5);
            } finally {
                await page.mouse.move(0, 0);
                await page.mouse.up();
            }

            // Disabled, it is the same neutral pair as every other solid variant, hovered or not.
            const primary = page.locator(PREVIEWS).getByRole("button", { name: "Primary", exact: true }).first();
            const disabledLook = async (target: typeof button) => {
                await target.evaluate((node: HTMLButtonElement) => (node.disabled = true));
                const b = (await target.boundingBox())!;
                await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
                return target.evaluate((node) => [getComputedStyle(node).backgroundColor, getComputedStyle(node).color]);
            };
            expect(await disabledLook(button)).toEqual(await disabledLook(primary));
            expect((await disabledLook(button))[0]).toBe(await token(page, "--color-action-disabled"));
        });

        test("the accent state variants win over the hand-written classes: fill, text and border", async ({ page }) => {
            await openPage(page, "Button", dark);
            // The exact class list from the report, and the two the library does not render itself.
            const samples = await page.evaluate(() => {
                const host = document.createElement("div");
                host.style.cssText = "display:flex;gap:40px;padding:40px";
                host.innerHTML = `
                    <button id="s-fill" class="bg-accent text-on-accent hover:bg-accent-hover">fill</button>
                    <button id="s-text" class="text-accent hover:text-accent-hover active:text-accent-active">text</button>
                    <button id="s-border" class="border-2 border-accent hover:border-accent-hover active:border-accent-active">border</button>
                    <button id="s-info" class="bg-info active:bg-info-active">info</button>`;
                document.querySelector("main")!.prepend(host);
                window.scrollTo(0, 0);
                return ["s-fill", "s-text", "s-border", "s-info"];
            });
            const read = (id: string, property: string) =>
                page.evaluate(([i, p]) => getComputedStyle(document.getElementById(i)!)[p as "color"], [id, property]);
            const over = async (id: string) => {
                const box = (await page.locator(`#${id}`).boundingBox())!;
                await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
            };
            expect(samples).toHaveLength(4);
            const [accent, hover, active, infoActive] = await Promise.all(
                ["--color-accent", "--color-accent-hover", "--color-accent-active", "--color-info-active"].map((name) => token(page, name)),
            );

            // `.text-accent` is the accent's text step, the one that is readable on a page.
            const accentText = await token(page, "--color-accent-text");
            for (const [id, property, resting] of [
                ["s-fill", "backgroundColor", accent],
                ["s-text", "color", accentText],
                ["s-border", "borderTopColor", accent],
            ] as const) {
                await page.mouse.move(0, 0);
                expect(await read(id, property), `${id} at rest`).toBe(resting);
                await over(id);
                expect(await read(id, property), `${id} under the pointer`).toBe(hover);
                if (id === "s-fill") continue;
                await page.mouse.down();
                try {
                    expect(await read(id, property), `${id} pressed`).toBe(active);
                } finally {
                    await page.mouse.move(0, 0);
                    await page.mouse.up();
                }
            }
            // The same gap, found by the audit: a role with an -active token and no rule for it.
            await over("s-info");
            await page.mouse.down();
            try {
                expect(await read("s-info", "backgroundColor")).toBe(infoActive);
            } finally {
                await page.mouse.move(0, 0);
                await page.mouse.up();
            }
        });

        test('Badge variant="accent": tinted with its text step, or solid with the on-accent label', async ({ page }) => {
            await openPage(page, "Badge", dark);
            const look = (name: string) =>
                page
                    .locator(PREVIEWS)
                    .getByText(name, { exact: true })
                    .first()
                    .evaluate((node) => {
                        const style = getComputedStyle(node);
                        return { fill: style.backgroundColor, text: style.color };
                    });
            const subtle = await look("Accent");
            const solid = await look("Accent solid");
            expect(subtle).toEqual({ fill: await token(page, "--color-accent-subtle"), text: await token(page, "--color-accent-text") });
            expect(solid).toEqual({ fill: await token(page, "--color-accent"), text: await token(page, "--color-on-accent") });
            expect(await contrast(page, subtle.text, subtle.fill)).toBeGreaterThanOrEqual(4.5);
            expect(await contrast(page, solid.text, solid.fill)).toBeGreaterThanOrEqual(4.5);
        });

        test("Rating tone=accent: the accent as the fill, outlined in the accent text step, 3:1 on page, card and inset", async ({ page }) => {
            await openPage(page, "Rating", dark);
            const rating = page.getByTestId("rating-demo-accent").first();
            await rating.scrollIntoViewIfNeeded();
            const star = await rating.evaluate((host) => {
                const fill = host.querySelector(".rating-glyph-fill")!;
                const svg = fill.querySelector("svg")!;
                return { fill: getComputedStyle(fill).color, edge: getComputedStyle(svg).stroke, tone: host.getAttribute("data-tone") };
            });
            expect(star.tone).toBe("accent");
            expect(star.fill).toBe(await token(page, "--color-accent"));
            expect(star.edge).toBe(await token(page, "--color-accent-text"));
            for (const surface of ["--color-surface-base", "--color-surface-raised", "--color-surface-inset"]) {
                const ground = await token(page, surface);
                expect(await contrast(page, star.edge, ground), `outline on ${surface}`).toBeGreaterThanOrEqual(3);
                // With the library's own accent the fill passes as well; an app's yellow may not, which is what the outline is for.
                expect(await contrast(page, star.fill, ground), `fill on ${surface}`).toBeGreaterThanOrEqual(3);
            }

            // The primary tone is as it was: the fill is its own outline.
            const primary = await page
                .getByTestId("rating-demo-average")
                .first()
                .evaluate((host) => {
                    const fill = host.querySelector(".rating-glyph-fill")!;
                    return { fill: getComputedStyle(fill).color, edge: getComputedStyle(fill.querySelector("svg")!).stroke };
                });
            expect(primary.fill).toBe(await token(page, "--color-action-primary"));
            expect(primary.edge).toBe(primary.fill);
        });

        test("Rating: an app sets --zabi-rating-on and --zabi-rating-off, on the component or around it", async ({ page }) => {
            await openPage(page, "Rating", dark);
            const colours = (testId: string) =>
                page
                    .getByTestId(testId)
                    .first()
                    .evaluate((host) => ({
                        on: getComputedStyle(host.querySelector(".rating-glyph-fill")!).color,
                        off: getComputedStyle(host.querySelector(".rating-glyph-empty")!).color,
                    }));
            // Around it: a class on an ancestor, which a declaration on the component itself would have overridden.
            await page.addStyleTag({ content: ".sunshine { --zabi-rating-on: rgb(253, 215, 21); --zabi-rating-off: rgb(1, 2, 3); }" });
            await page.getByTestId("rating-demo-average").first().evaluate((host) => host.parentElement!.classList.add("sunshine"));
            expect(await colours("rating-demo-average")).toEqual({ on: "rgb(253, 215, 21)", off: "rgb(1, 2, 3)" });
            // On it, and it wins over the tone.
            await page.getByTestId("rating-demo-accent").first().evaluate((host) => host.style.setProperty("--zabi-rating-on", "rgb(9, 8, 7)"));
            expect((await colours("rating-demo-accent")).on).toBe("rgb(9, 8, 7)");

            // An interactive rating keeps the app's colour under the pointer and while pressed.
            const quiz = page.getByTestId("rating-demo-quiz").first();
            await quiz.evaluate((host) => host.style.setProperty("--zabi-rating-on", "rgb(253, 215, 21)"));
            const first = quiz.locator(".rating-star").first();
            await first.scrollIntoViewIfNeeded();
            const box = (await first.boundingBox())!;
            await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
            const hovered = () => first.evaluate((star) => getComputedStyle(star.querySelector(".rating-glyph-fill")!).color);
            expect(await hovered()).toBe("rgb(253, 215, 21)");
            await quiz.evaluate((host) => host.style.setProperty("--zabi-rating-on-hover", "rgb(200, 170, 0)"));
            expect(await hovered()).toBe("rgb(200, 170, 0)");
        });

        test("a brand or accent block: text takes the block's colour, and the focus ring is the one colour that shows on it", async ({ page }) => {
            await openPage(page, "Heading", dark);
            await page.evaluate(() => {
                const host = document.createElement("div");
                host.innerHTML = `
                    <div id="brand" class="bg-action-primary on-brand" style="padding:32px">
                        <h2 id="brand-inherit" class="text-inherit">inherit</h2>
                        <p id="brand-on" class="text-on-brand">on-brand</p>
                        <button id="brand-button" class="focus-ring bg-accent text-on-accent" style="padding:8px 16px">Play</button>
                        <button id="brand-ghost" class="focus-ring focus-ring--muted" style="padding:8px 16px">Quiet</button>
                    </div>
                    <div id="accent" class="bg-accent on-accent" style="padding:32px">
                        <h2 id="accent-inherit" class="text-inherit">inherit</h2>
                        <p id="accent-on" class="text-on-accent">on-accent</p>
                        <button id="accent-button" class="focus-ring bg-action-primary text-action-primary" style="padding:8px 16px">Play</button>
                    </div>
                    <button id="page-button" class="focus-ring bg-action-primary text-action-primary" style="padding:8px 16px">Page</button>`;
                document.querySelector("main")!.prepend(host);
            });
            const colour = (id: string, property = "color") =>
                page.evaluate(([i, p]) => getComputedStyle(document.getElementById(i)!)[p as "color"], [id, property]);
            const ringOf = async (id: string) => {
                await page.keyboard.press("Tab");
                await page.evaluate((i) => document.getElementById(i)!.focus(), id);
                const shadow = await colour(id, "boxShadow");
                return {
                    ring: /((?:rgba?|color)\([^)]+\)) 0px 0px 0px 4px/.exec(shadow)?.[1] ?? "",
                    gap: /((?:rgba?|color)\([^)]+\)) 0px 0px 0px 2px/.exec(shadow)?.[1] ?? "",
                };
            };

            for (const [block, fillToken, onToken] of [
                ["brand", "--color-action-primary", "--color-on-brand"],
                ["accent", "--color-accent", "--color-on-accent"],
            ]) {
                const fill = await token(page, fillToken);
                const on = await token(page, onToken);
                expect(await colour(block, "backgroundColor")).toBe(fill);
                expect(await colour(`${block}-inherit`), `${block}: inherit`).toBe(on);
                expect(await colour(`${block}-on`), `${block}: on tone`).toBe(on);
                expect(await contrast(page, on, fill)).toBeGreaterThanOrEqual(4.5);

                const { ring, gap } = await ringOf(`${block}-button`);
                expect(ring, `${block}: ring colour`).toBe(on);
                expect(gap, `${block}: gap colour`).toBe(fill);
                expect(await contrast(page, ring, fill), `${block}: ring on the block`).toBeGreaterThanOrEqual(3);
            }
            // The muted ring follows too, or a ghost control would be ringed in page grey on the brand.
            expect((await ringOf("brand-ghost")).ring).toBe(await token(page, "--color-on-brand"));

            // Outside a block nothing moved; and there the default ring would not show on the brand: it is the brand.
            const outside = await ringOf("page-button");
            expect(outside.ring).toBe(await token(page, "--color-focus-ring"));
            expect(await contrast(page, outside.ring, await token(page, "--color-action-primary"))).toBeLessThan(1.1);
        });

        test("font-sans, font-mono and font-heading follow the theme's font tokens", async ({ page }) => {
            await openPage(page, "Heading", dark);
            const families = await page.evaluate(() => {
                const host = document.createElement("div");
                host.innerHTML = `<h2 id="f-sans" class="font-sans">a</h2><h2 id="f-heading" class="font-heading">a</h2><code id="f-mono" class="font-mono">a</code><h2 id="f-plain">a</h2>`;
                document.body.append(host);
                // As an app does: one heading face, one body face, one code face.
                document.documentElement.style.setProperty("--font-family-sans", '"Body Face", sans-serif');
                document.documentElement.style.setProperty("--font-family-heading", '"Display Face", serif');
                document.documentElement.style.setProperty("--font-family-mono", '"Code Face", monospace');
                const family = (id: string) => getComputedStyle(document.getElementById(id)!).fontFamily;
                return { sans: family("f-sans"), heading: family("f-heading"), mono: family("f-mono"), plain: family("f-plain"), body: getComputedStyle(document.body).fontFamily };
            });
            // It was Tailwind's system stack: ui-sans-serif, system-ui, …
            expect(families.sans).toBe('"Body Face", sans-serif');
            expect(families.sans).toBe(families.body);
            expect(families.heading).toBe('"Display Face", serif');
            expect(families.plain).toBe(families.heading);
            expect(families.mono).toBe('"Code Face", monospace');
        });
    });
}
