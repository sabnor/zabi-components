import { expect, test, type Locator, type Page } from "@playwright/test";

/**
 * Rating on a phone: the parts jsdom cannot show.
 *
 * jsdom has no layout, so the 44px targets, the half-filled star and the
 * reflow at 320px are measured here, in a 375px touch viewport. The keys are
 * pressed in a real browser too, where a native radio has behaviour of its
 * own that the component must not fight.
 */

test.use({ viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true });

const MIN_TARGET = 44;

const quiz = (page: Page) => page.getByTestId("rating-demo-quiz");
const food = (page: Page) => page.getByTestId("rating-demo-food");
const quizValue = (page: Page) => page.getByTestId("rating-demo-quiz-value");
const foodValue = (page: Page) => page.getByTestId("rating-demo-food-value");
/** The label around a star's radio input: what a finger hits. */
const target = (host: Locator, star: number) => host.locator(".rating-star").nth(star - 1);
const radio = (host: Locator, star: number) => host.getByRole("radio").nth(star - 1);

/** The page is usable before it hydrates; a tap that lands early checks the radio but not the bound value. */
async function gotoHydrated(page: Page) {
    await page.goto("/components/Rating", { waitUntil: "domcontentloaded" });
    await expect(async () => {
        await target(quiz(page), 1).tap();
        await target(quiz(page), 2).tap();
        await expect(quizValue(page)).toHaveText("2", { timeout: 1_000 });
    }).toPass({ timeout: 30_000 });
}

async function boxes(locator: Locator) {
    return locator.evaluateAll((elements) =>
        elements.map((element) => {
            const { x, y, width, height } = element.getBoundingClientRect();
            return { x, y, width, height };
        }),
    );
}

/**
 * Lays a demo out as an app on a phone would: the full screen width with a
 * 16px gutter each side. The docs page puts each demo in a card that is far
 * narrower than that at 320px.
 */
async function asOnAPhone(hosts: Locator) {
    await hosts.evaluateAll((elements) => {
        const frame = document.createElement("div");
        frame.style.cssText =
            "position:absolute;top:0;left:0;z-index:99999;box-sizing:border-box;width:100vw;padding:16px;background:var(--color-card)";
        for (const element of elements) frame.append(element.parentElement!);
        document.body.append(frame);
        window.scrollTo(0, 0);
    });
}

test.describe("Rating: touch, keyboard and small screens", () => {
    test.beforeEach(async ({ page }) => {
        await gotoHydrated(page);
    });

    test("touch: every star is a target of at least 44 by 44px, at every size", async ({ page }) => {
        expect(await page.evaluate(() => matchMedia("(pointer: coarse)").matches)).toBe(true);

        const all = await boxes(page.locator(".rating-star"));
        // Five examples on the page: sm, md and lg are among them.
        expect(all.length).toBeGreaterThanOrEqual(25);
        for (const box of all) {
            expect(box.width).toBeGreaterThanOrEqual(MIN_TARGET);
            expect(box.height).toBeGreaterThanOrEqual(MIN_TARGET);
        }
        for (const size of ["sm", "md", "lg"]) {
            const sized = await boxes(page.locator(`.rating[data-size="${size}"] .rating-star`));
            expect(sized.length, `stars at ${size}`).toBeGreaterThanOrEqual(5);
        }

        // Targets sit side by side and do not overlap, so a tap has one answer.
        const row = await boxes(quiz(page).locator(".rating-star"));
        for (let index = 1; index < row.length; index += 1) {
            expect(row[index].x).toBeGreaterThanOrEqual(row[index - 1].x + row[index - 1].width - 0.5);
            expect(row[index].y).toBeCloseTo(row[0].y, 0);
        }
    });

    test("touch: the clear button is a 44px target, 8px clear of the last star", async ({ page }) => {
        const clear = food(page).getByRole("button", { name: "Clear rating" });
        await asOnAPhone(food(page));
        const box = (await clear.boundingBox())!;
        expect(box.width).toBeGreaterThanOrEqual(MIN_TARGET);
        expect(box.height).toBeGreaterThanOrEqual(MIN_TARGET);

        const last = (await target(food(page), 5).boundingBox())!;
        expect(box.x - (last.x + last.width)).toBeGreaterThanOrEqual(8);
    });

    test("touch: a tap rates, a second tap on the same star changes nothing, the clear button clears", async ({
        page,
    }) => {
        await target(quiz(page), 4).tap();
        await expect(quizValue(page)).toHaveText("4");
        await expect(radio(quiz(page), 4)).toBeChecked();
        await target(quiz(page), 4).tap();
        await target(quiz(page), 4).tap();
        await expect(quizValue(page)).toHaveText("4");
        await expect(radio(quiz(page), 4)).toBeChecked();
        // Not clearable: nothing on the page clears it.
        await expect(quiz(page).getByRole("button")).toHaveCount(0);

        await expect(foodValue(page)).toHaveText("4");
        await target(food(page), 4).tap();
        await expect(foodValue(page)).toHaveText("4");

        const clear = food(page).locator("[data-rating-clear]");
        await clear.tap();
        await expect(foodValue(page)).toHaveText("none");
        await expect(food(page).getByRole("radio", { checked: true })).toHaveCount(0);
        // Out of the way, and its room kept so the row does not jump.
        await expect(clear).toBeHidden();
        expect((await clear.boundingBox())!.width).toBeGreaterThanOrEqual(MIN_TARGET);

        await target(food(page), 2).tap();
        await expect(foodValue(page)).toHaveText("2");
        await expect(clear).toBeVisible();
    });

    test("rendering: filled stars use the primary action colour and empty ones the strong border", async ({
        page,
    }) => {
        // The star tapped last (the second) dips while pressed; read once it has let go.
        await expect(async () => {
            const colours = await readColours(page);
            expect(colours.pressed).toBe(false);
            expect(colours.glyph).toBe(24);
        }).toPass({ timeout: 5_000 });
        const colours = await readColours(page);
        expect(colours.on).not.toBe(colours.off);
        expect(colours.empty).toBe(colours.off);
        // At 2 of 5: the second star is filled across, the third not at all.
        expect(colours.filledWidth).toBeCloseTo(colours.glyph, 0);
        expect(colours.emptyWidth).toBe(0);
    });

    function readColours(page: Page) {
        return quiz(page).evaluate((host) => {
            const probe = (variable: string) => {
                const element = document.createElement("div");
                element.style.color = `var(${variable})`;
                document.body.append(element);
                const colour = getComputedStyle(element).color;
                element.remove();
                return colour;
            };
            const stars = [...host.querySelectorAll(".rating-star")];
            const fill = (star: Element) => star.querySelector(".rating-glyph-fill")!;
            return {
                on: probe("--color-action-primary"),
                off: probe("--color-border-strong"),
                filled: getComputedStyle(fill(stars[0])).color,
                filledWidth: fill(stars[1]).getBoundingClientRect().width,
                emptyWidth: fill(stars[2]).getBoundingClientRect().width,
                glyph: stars[1].querySelector(".rating-glyph")!.getBoundingClientRect().width,
                pressed: stars[1].matches(":active"),
                empty: getComputedStyle(stars[4].querySelector(".rating-glyph-empty")!).color,
            };
        });
    }

    test("rendering: a read-only 3.5 is one image, with the fourth star half filled", async ({ page }) => {
        const average = page.getByTestId("rating-demo-average");
        await expect(average).toHaveRole("img");
        await expect(average).toHaveAccessibleName("Pub score, 3.5 of 5 stars");
        await expect(average.getByRole("radio")).toHaveCount(0);
        await expect(average.locator("[data-rating-value]")).toHaveText("3.5");

        const widths = await average.locator(".rating-glyph").evaluateAll((glyphs) =>
            glyphs.map((glyph) => {
                const fill = glyph.querySelector(".rating-glyph-fill")!.getBoundingClientRect();
                const whole = glyph.getBoundingClientRect();
                return { ratio: fill.width / whole.width, atStart: Math.abs(fill.left - whole.left) < 0.5 };
            }),
        );
        expect(widths.map((entry) => Math.round(entry.ratio * 100) / 100)).toEqual([1, 1, 1, 0.5, 0]);
        expect(widths[3].atStart).toBe(true);

        // Right to left, the half that is filled is the right one.
        await average.evaluate((host) => host.setAttribute("dir", "rtl"));
        const rtl = await average.locator(".rating-glyph").nth(3).evaluate((glyph) => {
            const fill = glyph.querySelector(".rating-glyph-fill")!.getBoundingClientRect();
            const whole = glyph.getBoundingClientRect();
            return { ratio: fill.width / whole.width, atEnd: Math.abs(fill.right - whole.right) < 0.5 };
        });
        expect(rtl.ratio).toBeCloseTo(0.5, 2);
        expect(rtl.atEnd).toBe(true);
    });

    test("keyboard: the group is one Tab stop, the arrows move and select, and it reads as a named radio group", async ({
        page,
    }) => {
        await radio(quiz(page), 2).focus();
        await page.keyboard.press("ArrowRight");
        await expect(quizValue(page)).toHaveText("3");
        await expect(radio(quiz(page), 3)).toBeFocused();
        await page.keyboard.press("ArrowDown");
        await expect(quizValue(page)).toHaveText("4");
        await page.keyboard.press("ArrowLeft");
        await page.keyboard.press("ArrowUp");
        await expect(quizValue(page)).toHaveText("2");
        await page.keyboard.press("End");
        await expect(quizValue(page)).toHaveText("5");
        await page.keyboard.press("ArrowRight");
        await expect(quizValue(page)).toHaveText("1");
        await page.keyboard.press("Home");
        await expect(radio(quiz(page), 1)).toBeFocused();

        // Space on the selected star, and Delete where it is not clearable: no change.
        await page.keyboard.press("End");
        await page.keyboard.press("Space");
        await page.keyboard.press("Delete");
        await page.keyboard.press("Backspace");
        await expect(quizValue(page)).toHaveText("5");

        // One Tab leaves the group.
        await page.keyboard.press("Tab");
        expect(
            await quiz(page).evaluate((host) => host.contains(document.activeElement)),
        ).toBe(false);
        await page.keyboard.press("Shift+Tab");
        await expect(radio(quiz(page), 5)).toBeFocused();

        // What Chromium hands to assistive technology: "Quiz", then "5 of 5 stars".
        const client = await page.context().newCDPSession(page);
        await client.send("Accessibility.enable");
        const { nodes } = await client.send("Accessibility.getFullAXTree");
        const group = nodes.find(
            (node) => node.role?.value === "radiogroup" && node.name?.value === "Quiz",
        );
        expect(group, "A radio group named by its label").toBeTruthy();
        const isChecked = (node: (typeof nodes)[number]) =>
            node.properties?.some(
                (property) => property.name === "checked" && property.value.value === "true",
            ) ?? false;
        const radios = nodes.filter((node) => node.role?.value === "radio");
        expect(radios.some((node) => node.name?.value === "5 of 5 stars" && isChecked(node))).toBe(
            true,
        );
        expect(radios.some((node) => node.name?.value === "1 of 5 stars" && !isChecked(node))).toBe(
            true,
        );
    });

    test("keyboard: Delete and Backspace clear a clearable rating and keep focus in the group", async ({
        page,
    }) => {
        await radio(food(page), 4).focus();
        await page.keyboard.press("Delete");
        await expect(foodValue(page)).toHaveText("none");
        await expect(radio(food(page), 1)).toBeFocused();

        await page.keyboard.press("ArrowRight");
        await page.keyboard.press("ArrowRight");
        await expect(foodValue(page)).toHaveText("2");
        await page.keyboard.press("Backspace");
        await expect(foodValue(page)).toHaveText("none");

        // The clear button by keyboard: focus does not vanish with it.
        await page.keyboard.press("End");
        await expect(foodValue(page)).toHaveText("5");
        await page.keyboard.press("Tab");
        await expect(food(page).locator("[data-rating-clear]")).toBeFocused();
        await page.keyboard.press("Enter");
        await expect(foodValue(page)).toHaveText("none");
        await expect(radio(food(page), 1)).toBeFocused();
    });

    test("keyboard: the arrows move from the star that has focus, not from the selected one", async ({
        page,
    }) => {
        // Quiz is at 2. A screen reader's cursor can put focus on a star that is not checked.
        await radio(quiz(page), 5).focus();
        await page.keyboard.press("ArrowLeft");
        await expect(quizValue(page)).toHaveText("4");
        await expect(radio(quiz(page), 4)).toBeFocused();

        await radio(quiz(page), 1).focus();
        await page.keyboard.press("ArrowRight");
        await expect(quizValue(page)).toHaveText("2");
    });

    test("keyboard: Left and Right swap in a right-to-left layout", async ({ page }) => {
        await quiz(page).evaluate((host) => host.setAttribute("dir", "rtl"));
        // The first star is now the rightmost one.
        const row = await boxes(quiz(page).locator(".rating-star"));
        expect(row[0].x).toBeGreaterThan(row[4].x);

        await radio(quiz(page), 2).focus();
        await page.keyboard.press("ArrowLeft");
        await expect(quizValue(page)).toHaveText("3");
        await page.keyboard.press("ArrowRight");
        await page.keyboard.press("ArrowRight");
        await expect(quizValue(page)).toHaveText("1");
        await page.keyboard.press("ArrowDown");
        await expect(quizValue(page)).toHaveText("2");
    });

    test("focus: keyboard focus draws the ring around the star's target", async ({ page }) => {
        const shadow = () =>
            target(quiz(page), 3).evaluate((label) => getComputedStyle(label).boxShadow);
        expect(await shadow()).toBe("none");
        await radio(quiz(page), 2).focus();
        await page.keyboard.press("ArrowRight");
        const ring = await page.evaluate(() => {
            const probe = document.createElement("div");
            probe.style.color = "var(--color-focus-ring)";
            document.body.append(probe);
            const colour = getComputedStyle(probe).color;
            probe.remove();
            return colour;
        });
        expect(await shadow()).toContain(ring);
    });

    test("contrast: an empty star is 3:1 or better against the page, card and inset surfaces, in light and dark", async ({
        page,
    }) => {
        // WCAG 1.4.11: the outline is all there is of an empty star.
        const ratios = () =>
            quiz(page).evaluate((host) => {
                const canvas = document.createElement("canvas");
                canvas.width = canvas.height = 1;
                const context = canvas.getContext("2d", { willReadFrequently: true })!;
                const rgb = (colour: string) => {
                    context.clearRect(0, 0, 1, 1);
                    context.fillStyle = colour;
                    context.fillRect(0, 0, 1, 1);
                    return [...context.getImageData(0, 0, 1, 1).data].slice(0, 3);
                };
                const luminance = (colour: string) => {
                    const [r, g, b] = rgb(colour).map((channel) => {
                        const value = channel / 255;
                        return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
                    });
                    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
                };
                const probe = document.createElement("div");
                document.body.append(probe);
                const surface = (variable: string) => {
                    probe.style.color = `var(${variable})`;
                    return getComputedStyle(probe).color;
                };
                const empty = getComputedStyle(
                    host.querySelectorAll(".rating-star")[4].querySelector(".rating-glyph-empty")!,
                ).color;
                const result = ["--color-page", "--color-card", "--color-surface-inset"].map((variable) => {
                    const [light, dark] = [luminance(empty), luminance(surface(variable))].sort(
                        (a, b) => b - a,
                    );
                    return { variable, ratio: (light + 0.05) / (dark + 0.05) };
                });
                probe.remove();
                return result;
            });

        for (const dark of [false, true]) {
            await page.evaluate((on) => document.documentElement.classList.toggle("dark", on), dark);
            for (const { variable, ratio } of await ratios()) {
                expect(ratio, `${variable}, ${dark ? "dark" : "light"}`).toBeGreaterThanOrEqual(3);
            }
        }
    });

    test("forced colours: keyboard focus is an outline, since the shadow ring is dropped", async ({ page }) => {
        await page.emulateMedia({ forcedColors: "active" });
        const style = () =>
            target(quiz(page), 3).evaluate((label) => {
                const computed = getComputedStyle(label);
                return {
                    shadow: computed.boxShadow,
                    outline: computed.outlineStyle,
                    width: computed.outlineWidth,
                };
            });
        expect((await style()).outline).toBe("none");
        await radio(quiz(page), 2).focus();
        await page.keyboard.press("ArrowRight");
        expect(await style()).toEqual({ shadow: "none", outline: "solid", width: "2px" });
    });

    test("names: the clear button is out of the accessibility tree and the Tab order while there is nothing to clear", async ({
        page,
    }) => {
        await expect(food(page).getByRole("button", { name: "Clear rating" })).toHaveCount(1);
        await radio(food(page), 4).focus();
        await page.keyboard.press("Tab");
        await expect(food(page).locator("[data-rating-clear]")).toBeFocused();

        // Enter on it clears, and focus lands on the first star without rating it.
        await page.keyboard.press("Enter");
        await expect(foodValue(page)).toHaveText("none");
        await expect(radio(food(page), 1)).toBeFocused();
        await expect(food(page).getByRole("radio", { checked: true })).toHaveCount(0);
        await expect(food(page).getByRole("button")).toHaveCount(0);

        await page.keyboard.press("Tab");
        expect(
            await food(page).evaluate((host) => host.contains(document.activeElement)),
            "Tab leaves the rating: the hidden button is not a stop",
        ).toBe(false);
    });

    test("motion: the pressed star does not animate under prefers-reduced-motion", async ({ page }) => {
        const duration = () =>
            quiz(page)
                .locator(".rating-glyph")
                .first()
                .evaluate((glyph) => getComputedStyle(glyph).transitionDuration);
        expect(await duration()).toBe("0.15s");
        await page.emulateMedia({ reducedMotion: "reduce" });
        expect(await duration()).toBe("0s");
    });

    test("320px: no sideways scrolling, the targets keep their size, and doubled text still fits", async ({
        page,
    }) => {
        await page.setViewportSize({ width: 320, height: 640 });
        const overflow = () =>
            page.evaluate(() => ({
                page: document.documentElement.scrollWidth - document.documentElement.clientWidth,
                hosts: [...document.querySelectorAll<HTMLElement>(".rating")].map((host) => {
                    const parent = host.parentElement!.getBoundingClientRect();
                    const stars = host.querySelector(".rating-stars")!.getBoundingClientRect();
                    const inside = [...host.querySelectorAll(".rating-glyph, [data-rating-clear]")].every(
                        (part) => {
                            const box = part.getBoundingClientRect();
                            return box.left >= parent.left - 0.5 && box.right <= parent.right + 0.5;
                        },
                    );
                    return { inside, scroll: host.scrollWidth - host.clientWidth, wide: stars.width };
                }),
            }));

        const narrow = await overflow();
        expect(narrow.page).toBe(0);
        expect(narrow.hosts.length).toBeGreaterThanOrEqual(8);
        for (const host of narrow.hosts) {
            expect(host.inside).toBe(true);
            expect(host.scroll).toBeLessThanOrEqual(0);
        }
        for (const box of await boxes(page.locator(".rating-star"))) {
            expect(box.width).toBeGreaterThanOrEqual(MIN_TARGET);
            expect(box.height).toBeGreaterThanOrEqual(MIN_TARGET);
        }
        // With a phone's gutters, five stars and the clear button share one row at this width.
        await asOnAPhone(food(page));
        const row = await boxes(food(page).locator(".rating-star, [data-rating-clear]"));
        expect(new Set(row.map((box) => Math.round(box.y + box.height / 2))).size).toBe(1);

        // Text at 200%: stars wrap where they must, and nothing is pushed out of its container.
        await asOnAPhone(page.locator(".rating"));
        await page.evaluate(() => {
            document.documentElement.style.fontSize = "200%";
        });
        const zoomed = await overflow();
        for (const host of zoomed.hosts) {
            expect(host.inside).toBe(true);
            expect(host.scroll).toBeLessThanOrEqual(0);
        }
        for (const box of await boxes(page.locator(".rating-star"))) {
            expect(box.width).toBeGreaterThanOrEqual(MIN_TARGET);
            expect(box.height).toBeGreaterThanOrEqual(MIN_TARGET);
        }
    });
});
