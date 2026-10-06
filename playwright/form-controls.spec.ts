import { expect, test, type Locator, type Page } from "@playwright/test";

/**
 * Form controls in a browser: what the consumer app reported against
 * 8.1.0-beta.1, measured where jsdom cannot.
 *
 *   - Input: hint and error tied to the field; content inside the field at
 *     either end; a password that can be shown.
 *   - Button: a real link with `href`; labels that wrap instead of painting
 *     outside the button; one-line labels still on the 32 / 40 / 48 scale
 *     (44 / 44 / 48 on touch) beside Input and Select; no pressed dip under
 *     reduced motion.
 *   - Checkbox, Radio, RadioGroup and Toggle: the real control takes the
 *     click, so `getByRole(...).check()` works.
 *   - ListItem: hover and pressed fills; a row with nothing to do is not a
 *     button.
 */

const MIN_TARGET = 44;

async function hydrated(page: Page, component: string) {
    await page.goto(`/components/${component}`, { waitUntil: "domcontentloaded" });
    // The docs page marks itself once its scripts have run: wait for any Svelte-attached handler.
    await page.waitForLoadState("networkidle");
}

async function box(locator: Locator) {
    return locator.evaluate((element) => {
        const { x, y, width, height } = element.getBoundingClientRect();
        return { x, y, width, height, right: x + width, bottom: y + height };
    });
}

/** Lays an example out across the screen with 16px each side, as an app would; the docs card is narrower than a phone. */
async function acrossTheScreen(element: Locator) {
    await element.evaluate((node) => {
        const frame = document.createElement("div");
        frame.setAttribute("data-test-box", "");
        frame.style.cssText =
            "position:absolute;top:0;left:0;z-index:99999;box-sizing:border-box;width:100vw;padding:16px;background:var(--color-card)";
        frame.append(node);
        document.body.append(frame);
        window.scrollTo(0, 0);
    });
}

/** Whether the centre and four points 21px from it all land on the control: a 44px target, whatever draws it. */
async function takesATouch(control: Locator) {
    return control.evaluate((element) => {
        const { x, y, width, height } = element.getBoundingClientRect();
        const cx = x + width / 2;
        const cy = y + height / 2;
        return [
            [0, 0],
            [-21, 0],
            [21, 0],
            [0, -21],
            [0, 21],
        ].every(([dx, dy]) => {
            const hit = document.elementFromPoint(cx + dx, cy + dy);
            return !!hit && (hit === element || element.contains(hit));
        });
    });
}

const px = (value: string) => Number.parseFloat(value);

const reveal = (page: Page) => page.getByTestId("input-demo-reveal");
const revealButton = (page: Page) => page.getByRole("button", { name: "Show password" });

/** Waits until the reveal button answers: the page is usable before it hydrates. */
async function inputPage(page: Page) {
    await hydrated(page, "Input");
    await expect(async () => {
        await revealButton(page).click();
        await expect(reveal(page)).toHaveAttribute("type", "text", { timeout: 1_000 });
    }).toPass({ timeout: 30_000 });
    await revealButton(page).click();
    await expect(reveal(page)).toHaveAttribute("type", "password");
}

async function buttonPage(page: Page) {
    await hydrated(page, "Button");
    await expect(page.getByTestId("button-demo-long")).toBeVisible();
}

test.describe("Input on a desktop", () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test("hint and error: both tied to the field, hint first, and nothing listed that is not there", async ({ page }) => {
        await inputPage(page);
        const field = page.getByTestId("input-demo-hint");
        const described = async () => {
            const ids = ((await field.getAttribute("aria-describedby")) ?? "").split(" ").filter(Boolean);
            return Promise.all(ids.map((id) => page.locator(`[id="${id}"]`).textContent()));
        };
        expect((await described()).map((text) => text?.trim())).toEqual(["At least 8 characters."]);
        await expect(field).not.toHaveAttribute("aria-invalid", "true");

        await field.fill("abc");
        await expect(page.getByRole("alert")).toContainText("That is fewer than 8 characters.");
        expect((await described()).map((text) => text?.trim())).toEqual([
            "At least 8 characters.",
            "That is fewer than 8 characters.",
        ]);
        await expect(field).toHaveAttribute("aria-invalid", "true");
        // Named and described as a screen reader would hear it.
        await expect(field).toHaveAccessibleName("Password");
        await expect(field).toHaveAccessibleDescription("At least 8 characters. That is fewer than 8 characters.");

        await field.fill("abcdefgh");
        await expect(page.getByRole("alert")).toHaveCount(0);
        expect((await described()).map((text) => text?.trim())).toEqual(["At least 8 characters."]);

        // A field with only a hint.
        const other = page.getByTestId("input-demo-hint-only");
        await expect(other).toHaveAccessibleDescription("Shown beside your results.");
    });

    test("revealable: a 32px toggle 4px inside the 40px field, with the corner that goes with it", async ({ page }) => {
        await inputPage(page);
        const field = await box(reveal(page));
        const button = await box(revealButton(page));
        expect(field.height).toBe(40);
        expect(button.width).toBe(32);
        expect(button.height).toBe(32);
        expect(Math.round(field.right - button.right)).toBe(4);
        expect(Math.round(button.y - field.y)).toBe(4);
        expect(Math.round(field.bottom - button.bottom)).toBe(4);

        const outer = px(await reveal(page).evaluate((element) => getComputedStyle(element).borderTopRightRadius));
        const inner = px(await revealButton(page).evaluate((element) => getComputedStyle(element).borderTopRightRadius));
        expect(outer).toBeGreaterThan(4);
        expect(inner).toBe(outer - 4);

        // The text stops before the button.
        const pad = px(await reveal(page).evaluate((element) => getComputedStyle(element).paddingRight));
        expect(pad).toBe(40);
    });

    test("revealable: shows and hides the password; one name, a pressed state, autocomplete untouched", async ({ page }) => {
        await inputPage(page);
        await expect(reveal(page)).toHaveAttribute("autocomplete", "current-password");
        await expect(revealButton(page)).toHaveAttribute("aria-pressed", "false");

        await revealButton(page).click();
        await expect(reveal(page)).toHaveAttribute("type", "text");
        await expect(reveal(page)).toHaveValue("correct horse");
        await expect(revealButton(page)).toHaveAttribute("aria-pressed", "true");
        await expect(reveal(page)).toHaveAttribute("autocomplete", "current-password");
        // Nothing is announced: no live region has appeared anywhere near the field.
        expect(await reveal(page).evaluate((element) => element.closest("div")!.parentElement!.querySelector("[aria-live], [role=status], [role=alert]"))).toBeNull();

        await revealButton(page).click();
        await expect(reveal(page)).toHaveAttribute("type", "password");
        await expect(revealButton(page)).toHaveAttribute("aria-pressed", "false");
    });

    test("revealable: a press with the mouse leaves focus and the caret in the field; the keyboard reaches the button", async ({
        page,
    }) => {
        await inputPage(page);
        await reveal(page).focus();
        await reveal(page).evaluate((element: HTMLInputElement) => element.setSelectionRange(4, 7));
        await revealButton(page).click();
        await expect(reveal(page)).toHaveAttribute("type", "text");
        await expect(reveal(page)).toBeFocused();
        expect(await reveal(page).evaluate((element: HTMLInputElement) => [element.selectionStart, element.selectionEnd])).toEqual([4, 7]);
        // Typing goes on where it was.
        await page.keyboard.type("X");
        await expect(reveal(page)).toHaveValue("corrX horse");

        await page.keyboard.press("Tab");
        await expect(revealButton(page)).toBeFocused();
        const ring = await revealButton(page).evaluate((element) => getComputedStyle(element).boxShadow);
        expect(ring).not.toBe("none");
        await page.keyboard.press("Space");
        await expect(reveal(page)).toHaveAttribute("type", "password");
        await expect(revealButton(page)).toBeFocused();
    });

    test("leading and trailing: inside the field's box, the text between them, and a press on the icon reaches the field", async ({
        page,
    }) => {
        await inputPage(page);
        const field = page.getByTestId("input-demo-search");
        const edge = await box(field);
        const icon = await box(field.locator("xpath=..").locator("[data-input-leading] svg"));
        const clear = await box(page.getByTestId("input-demo-clear"));
        expect(icon.x).toBeGreaterThan(edge.x);
        expect(icon.right).toBeLessThan(edge.x + 40);
        // Centred in a 32px slot 4px in: 12px from the edge, where the text's padding would start.
        expect(Math.round(icon.x - edge.x)).toBe(12);
        expect(Math.round(edge.right - clear.right)).toBe(4);
        expect(clear.width).toBe(32);

        const style = await field.evaluate((element) => {
            const computed = getComputedStyle(element);
            return { left: computed.paddingLeft, right: computed.paddingRight };
        });
        expect(px(style.left)).toBe(40);
        expect(px(style.right)).toBe(40);

        // The icon is decoration: a click on it lands in the field.
        await page.mouse.click(icon.x + icon.width / 2, icon.y + icon.height / 2);
        await expect(field).toBeFocused();
        // The button is a button.
        await page.getByTestId("input-demo-clear").click();
        await expect(field).toHaveValue("");

        // The focus ring is the field's own, around everything in it.
        await field.focus();
        await page.keyboard.press("Tab");
        await page.keyboard.press("Shift+Tab");
        const ring = await field.evaluate((element) => getComputedStyle(element).boxShadow);
        expect(ring).not.toBe("none");
    });

    test("right to left: leading is on the right, trailing on the left, and the room follows", async ({ page }) => {
        await inputPage(page);
        const field = page.getByTestId("input-demo-search");
        await field.locator("xpath=../..").evaluate((element) => element.setAttribute("dir", "rtl"));
        const edge = await box(field);
        const icon = await box(field.locator("xpath=..").locator("[data-input-leading] svg"));
        const clear = await box(page.getByTestId("input-demo-clear"));
        expect(Math.round(edge.right - icon.right)).toBe(12);
        expect(Math.round(clear.x - edge.x)).toBe(4);

        const revealField = reveal(page);
        await revealField.locator("xpath=../..").evaluate((element) => element.setAttribute("dir", "rtl"));
        const revealEdge = await box(revealField);
        const button = await box(revealButton(page));
        expect(Math.round(button.x - revealEdge.x)).toBe(4);
        expect(px(await revealField.evaluate((element) => getComputedStyle(element).paddingLeft))).toBe(40);
    });

    test("the spinner and trailing content stand side by side, and the field makes room for both", async ({ page }) => {
        await inputPage(page);
        const field = page.getByTestId("input-demo-unit");
        const end = field.locator("xpath=..").locator("[data-input-trailing]");
        const unit = await box(end.getByText("kg"));
        // The box around the spinner, not the spinner: a turning square has a bounding box that changes.
        const spinner = await box(end.locator(".animate-spin").locator("xpath=.."));
        const edge = await box(field);
        expect(unit.right).toBeLessThanOrEqual(spinner.x);
        // The spinner is 12px from the edge, where it has always been: 4px to its box, 8px inside it.
        expect(Math.round(edge.right - spinner.right)).toBe(4);
        expect(await end.locator(".animate-spin").locator("xpath=..").evaluate((element) => getComputedStyle(element).paddingRight)).toBe("8px");
        const pad = px(await field.evaluate((element) => getComputedStyle(element).paddingRight));
        const cluster = await box(end);
        expect(pad).toBe(Math.round(cluster.width) + 4);
        expect(edge.right - pad).toBeLessThanOrEqual(unit.x);
    });
});

test.describe("Input on a phone, touch", () => {
    test.use({ viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true });

    test("revealable: the field is 44px tall, the toggle is still 4px inside it, and takes a touch across 44px", async ({
        page,
    }) => {
        await inputPage(page);
        expect(await page.evaluate(() => matchMedia("(pointer: coarse)").matches)).toBe(true);
        await acrossTheScreen(reveal(page).locator("xpath=../.."));
        const field = await box(reveal(page));
        const button = await box(revealButton(page));
        expect(field.height).toBe(MIN_TARGET);
        expect(button.width).toBe(32);
        expect(button.height).toBe(32);
        expect(Math.round(field.right - button.right)).toBe(4);
        expect(Math.round(button.y - field.y)).toBe(6);
        expect(await takesATouch(revealButton(page))).toBe(true);

        // A tap while typing keeps the field focused, so the keyboard stays up.
        await reveal(page).tap();
        await expect(reveal(page)).toBeFocused();
        await revealButton(page).tap();
        await expect(reveal(page)).toHaveAttribute("type", "text");
        await expect(reveal(page)).toBeFocused();
        await revealButton(page).tap();
        await expect(reveal(page)).toHaveAttribute("type", "password");
    });

    test("a button the app puts in the field is a 44px target there", async ({ page }) => {
        await inputPage(page);
        await acrossTheScreen(page.getByTestId("input-demo-search").locator("xpath=../.."));
        const clear = await box(page.getByTestId("input-demo-clear"));
        expect(clear.width).toBeGreaterThanOrEqual(MIN_TARGET);
        expect(clear.height).toBeGreaterThanOrEqual(MIN_TARGET);
        // The field has made room for the larger button: the text does not run under it.
        const field = page.getByTestId("input-demo-search");
        const pad = px(await field.evaluate((element) => getComputedStyle(element).paddingRight));
        expect(pad).toBeGreaterThanOrEqual(MIN_TARGET + 8);
    });
});

test.describe("Button on a desktop", () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test("one-line labels are 32, 40 and 48px tall, exactly as tall as the Input and Select beside them", async ({ page }) => {
        await buttonPage(page);
        for (const [size, height] of [
            ["sm", 32],
            ["md", 40],
            ["lg", 48],
        ] as const) {
            const row = page.getByTestId(`button-demo-row-${size}`);
            const heights = await row
                .locator("button, input")
                .evaluateAll((controls) => controls.map((control) => control.getBoundingClientRect().height));
            expect(heights, size).toEqual([height, height, height, height]);
            const tops = await row
                .locator("button, input")
                .evaluateAll((controls) => controls.map((control) => Math.round(control.getBoundingClientRect().y)));
            expect(new Set(tops).size, `${size}: one row`).toBe(1);
        }
        // A long label that fits on one line here is on the scale too.
        expect((await box(page.getByTestId("button-demo-long"))).height).toBe(48);
        expect((await box(page.getByTestId("button-demo-short"))).height).toBe(40);
    });

    test("the pressed dip is there, and is not under prefers-reduced-motion", async ({ page }) => {
        await buttonPage(page);
        const button = page.getByTestId("button-demo-short");
        await button.scrollIntoViewIfNeeded();
        const at = await box(button);
        const scale = () => button.evaluate((element) => getComputedStyle(element).scale);

        await page.mouse.move(at.x + at.width / 2, at.y + at.height / 2);
        await page.mouse.down();
        expect(await scale()).toBe("0.98");
        await page.mouse.up();

        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.mouse.down();
        expect(["1", "none"]).toContain(await scale());
        await page.mouse.up();
    });

    test("href: a real link that looks like the button; disabled, it cannot be followed", async ({ page }) => {
        await buttonPage(page);
        const link = page.getByTestId("button-demo-link");
        expect(await link.evaluate((element) => element.tagName)).toBe("A");
        await expect(link).toHaveRole("link");
        expect((await box(link)).height).toBe(40);
        await link.click();
        await expect(page).toHaveURL(/#log-in$/);

        await page.evaluate(() => history.replaceState(null, "", location.pathname));
        const off = page.getByTestId("button-demo-link-disabled");
        await expect(off).toHaveRole("link");
        await expect(off).toHaveAttribute("aria-disabled", "true");
        expect(await off.getAttribute("href")).toBeNull();
        await off.click({ force: true });
        expect(new URL(page.url()).hash).toBe("");
        // Not a Tab stop: from the link before it, Tab goes past it.
        await page.getByRole("link", { name: "Open the docs" }).focus();
        await page.keyboard.press("Tab");
        expect(await off.evaluate((element) => element === document.activeElement)).toBe(false);
        // Drawn as disabled, hovered or not.
        const fill = () => off.evaluate((element) => getComputedStyle(element).backgroundColor);
        const rest = await fill();
        await off.hover({ force: true });
        expect(await fill()).toBe(rest);
        expect(rest).not.toBe(await link.evaluate((element) => getComputedStyle(element).backgroundColor));
    });

    test("a link variant with href is a text link: underlined, in the sentence, and it breaks across lines", async ({ page }) => {
        await buttonPage(page);
        const link = page.getByTestId("button-demo-inline");
        const style = await link.evaluate((element) => {
            const computed = getComputedStyle(element);
            return { display: computed.display, line: computed.textDecorationLine, minHeight: computed.minHeight };
        });
        expect(style.display).toBe("inline");
        expect(style.line).toContain("underline");
        expect(["0px", "auto"]).toContain(style.minHeight);

        await page.getByTestId("button-demo-sentence").evaluate((element) => (element.style.width = "180px"));
        const lines = await link.evaluate((element) => element.getClientRects().length);
        expect(lines).toBeGreaterThanOrEqual(2);
        // On the same lines as the words around it, not in a box of its own.
        const sentence = await box(page.getByTestId("button-demo-sentence"));
        const first = await link.evaluate((element) => element.getClientRects()[0].y);
        expect(first - sentence.y).toBeLessThan(30);
    });
});

test.describe("Button on a phone, touch", () => {
    test.use({ viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true });

    test("one-line labels are 44, 44 and 48px tall, as the Input and Select beside them", async ({ page }) => {
        await buttonPage(page);
        await acrossTheScreen(page.getByTestId("button-demo-wrap"));
        for (const [size, height] of [
            ["sm", 44],
            ["md", 44],
            ["lg", 48],
        ] as const) {
            const heights = await page
                .getByTestId(`button-demo-row-${size}`)
                .locator("button, input")
                .evaluateAll((controls) => controls.map((control) => control.getBoundingClientRect().height));
            expect(heights, size).toEqual([height, height, height, height]);
        }
        expect((await box(page.getByTestId("button-demo-long"))).height).toBe(48);
    });

    test("at 200% text a long label wraps inside the button, which grows; nothing paints outside it", async ({ page }) => {
        await buttonPage(page);
        await acrossTheScreen(page.getByTestId("button-demo-wrap"));
        await page.evaluate(() => (document.documentElement.style.fontSize = "200%"));
        const button = page.getByTestId("button-demo-long");
        const edge = await box(button);
        expect(Math.round(edge.width)).toBe(375 - 32);
        const fit = await button.evaluate((element) => {
            const range = document.createRange();
            range.selectNodeContents(element);
            const text = range.getBoundingClientRect();
            const own = element.getBoundingClientRect();
            return {
                scrolls: element.scrollWidth > element.clientWidth + 1,
                left: text.left - own.left,
                right: own.right - text.right,
                top: text.top - own.top,
                bottom: own.bottom - text.bottom,
                lines: new Set([...range.getClientRects()].map((rect) => Math.round(rect.top))).size,
            };
        });
        expect(fit.scrolls).toBe(false);
        expect(fit.lines).toBeGreaterThanOrEqual(2);
        for (const side of [fit.left, fit.right, fit.top, fit.bottom]) expect(side).toBeGreaterThanOrEqual(0);
        // Taller than one line's 48px, with the same air above and below.
        expect(edge.height).toBeGreaterThan(96);
        expect(Math.abs(fit.top - fit.bottom)).toBeLessThanOrEqual(1);
        const overflow = await page.locator("[data-test-box]").evaluate((element) => element.scrollWidth - element.clientWidth);
        expect(overflow).toBeLessThanOrEqual(0);
    });
});

test.describe("Checkbox, Radio, RadioGroup and Toggle take the click themselves", () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    /** The first control of the kind that is enabled and not yet on. */
    async function firstOff(page: Page, role: "checkbox" | "radio" | "switch") {
        const all = page.getByRole(role);
        await expect(all.first()).toBeVisible();
        const count = await all.count();
        for (let index = 0; index < count; index += 1) {
            const control = all.nth(index);
            if ((await control.isEnabled()) && !(await control.isChecked())) return control;
        }
        throw new Error(`no enabled, unchecked ${role} on the page`);
    }

    for (const [component, role] of [
        ["Checkbox", "checkbox"],
        ["Radio", "radio"],
        ["RadioGroup", "radio"],
        ["Toggle", "switch"],
    ] as const) {
        test(`${component}: getByRole("${role}").check() and getByLabel(...).check()`, async ({ page }) => {
            await hydrated(page, component);
            const control = await firstOff(page, role);
            // No `force`: the actionability checks have to pass, which they did not while an overlay lay over the input.
            await expect(async () => {
                await control.check({ timeout: 2_000 });
            }).toPass({ timeout: 30_000 });
            await expect(control).toBeChecked();

            const next = await firstOff(page, role).catch(() => null);
            if (next) {
                const name = await next.evaluate((element) => {
                    const labels = (element as HTMLInputElement).labels;
                    return labels?.[0]?.textContent?.replace(/\s+/g, " ").trim() ?? "";
                });
                if (name) {
                    const byLabel = page.getByLabel(name, { exact: true }).first();
                    await byLabel.check({ timeout: 5_000 });
                    await expect(byLabel).toBeChecked();
                }
            }
        });
    }

    test("Checkbox: the box is the input; the keyboard and the semantics are what they were", async ({ page }) => {
        await hydrated(page, "Checkbox");
        const control = await firstOff(page, "checkbox");
        const geometry = await control.evaluate((element) => {
            const own = element.getBoundingClientRect();
            const shell = element.parentElement!.getBoundingClientRect();
            const hit = document.elementFromPoint(own.x + own.width / 2, own.y + own.height / 2);
            return { own: [own.width, own.height], shell: [shell.width, shell.height], dx: own.x - shell.x, dy: own.y - shell.y, hitsInput: hit === element };
        });
        expect(geometry.own).toEqual([20, 20]);
        expect(geometry.shell).toEqual([20, 20]);
        expect(geometry.dx).toBe(0);
        expect(geometry.dy).toBe(0);
        expect(geometry.hitsInput).toBe(true);

        expect(await control.evaluate((element) => element.tagName + ":" + (element as HTMLInputElement).type)).toBe("INPUT:checkbox");
        await control.focus();
        await page.keyboard.press("Space");
        await expect(control).toBeChecked();
        await page.keyboard.press("Space");
        await expect(control).not.toBeChecked();
    });
});

test.describe("Checkbox on a phone, touch", () => {
    test.use({ viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true });

    test("the row is still 44px tall, and a tap on the box or on the label toggles", async ({ page }) => {
        await hydrated(page, "Checkbox");
        const control = page.getByRole("checkbox").first();
        const row = control.locator("xpath=ancestor::label");
        expect((await box(row)).height).toBeGreaterThanOrEqual(MIN_TARGET);
        // The input itself is the target: 44 by 44px, centred on the 20px box it draws.
        const own = await box(control);
        const drawn = await box(control.locator("xpath=.."));
        expect([own.width, own.height]).toEqual([MIN_TARGET, MIN_TARGET]);
        expect(Math.round(own.x + own.width / 2)).toBe(Math.round(drawn.x + drawn.width / 2));
        expect(Math.round(own.y + own.height / 2)).toBe(Math.round(drawn.y + drawn.height / 2));
        expect([drawn.width, drawn.height]).toEqual([20, 20]);
        expect(await takesATouch(control)).toBe(true);
        // Two rows: the targets do not reach each other.
        const targets = await page.getByRole("checkbox").evaluateAll((inputs) =>
            inputs.map((input) => input.getBoundingClientRect()).map((rect) => [rect.top, rect.bottom]),
        );
        for (let index = 1; index < targets.length; index += 1) {
            if (targets[index][0] > targets[index - 1][0]) expect(targets[index][0]).toBeGreaterThanOrEqual(targets[index - 1][1]);
        }
        const before = await control.isChecked();
        await expect(async () => {
            await control.tap();
            await expect(control).toBeChecked({ checked: !before, timeout: 1_000 });
        }).toPass({ timeout: 30_000 });
        await row.locator("span").last().tap();
        await expect(control).toBeChecked({ checked: before });
    });
});

test.describe("ListItem", () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test("a row that can be pressed has a hover fill and a pressed fill; the press does something", async ({ page }) => {
        await hydrated(page, "List");
        const row = page.getByRole("button", { name: "Notifications" }).first();
        await row.scrollIntoViewIfNeeded();
        await page.emulateMedia({ reducedMotion: "reduce" });
        const fill = () => row.evaluate((element) => getComputedStyle(element).backgroundColor);
        await page.mouse.move(0, 0);
        const rest = await fill();
        const at = await box(row);
        await page.mouse.move(at.x + at.width / 2, at.y + at.height / 2);
        await expect.poll(fill).not.toBe(rest);
        const hovered = await fill();
        await page.mouse.down();
        await expect.poll(fill).not.toBe(hovered);
        expect(await fill()).not.toBe(rest);
        await page.mouse.up();
        await expect(page.getByTestId("list-demo-opened")).toHaveText("Notifications");
        expect(await row.evaluate((element) => getComputedStyle(element).cursor)).toBe("pointer");
        await expect(row.locator("svg")).toHaveCount(1);
    });

    test("a row with nothing to do is plain content: no button, no arrow, no pointer, not a Tab stop", async ({ page }) => {
        await hydrated(page, "List");
        const list = page.getByRole("list", { name: "Plans" });
        await expect(list).toBeVisible();
        await expect(list.getByRole("button")).toHaveCount(0);
        await expect(list.getByRole("link")).toHaveCount(0);
        const row = list.getByText("Team plan").locator("xpath=ancestor::div[1]");
        const style = await row.evaluate((element) => ({
            cursor: getComputedStyle(element).cursor,
            tabIndex: (element as HTMLElement).tabIndex,
            arrows: element.querySelectorAll("svg").length,
            border: getComputedStyle(element).borderTopWidth,
        }));
        expect(style.cursor).not.toBe("pointer");
        expect(style.tabIndex).toBe(-1);
        expect(style.arrows).toBe(0);
        // Still drawn as a row.
        expect(style.border).toBe("1px");
        await expect(list.getByText("Current")).toBeVisible();
    });
});

test.describe("ListItem on a phone, touch", () => {
    test.use({ viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true });

    test("a hover fill does not stay on after a tap", async ({ page }) => {
        await hydrated(page, "List");
        const row = page.getByRole("button", { name: "Privacy" }).first();
        await page.emulateMedia({ reducedMotion: "reduce" });
        const fill = () => row.evaluate((element) => getComputedStyle(element).backgroundColor);
        const rest = await fill();
        await expect(async () => {
            await row.tap();
            await expect(page.getByTestId("list-demo-opened")).toHaveText("Privacy", { timeout: 1_000 });
        }).toPass({ timeout: 30_000 });
        // Focus is on the row now; move it away, and the row is as it was.
        await row.evaluate((element) => (element as HTMLElement).blur());
        await expect.poll(fill).toBe(rest);
    });
});
