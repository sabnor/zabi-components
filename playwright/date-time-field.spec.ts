import { expect, test, type Locator, type Page } from "@playwright/test";

import { waitForHydration } from "./helpers/hydration";

/**
 * DateField and TimeField in a real browser: the parts jsdom cannot show.
 *
 * They are native inputs, and a native date or time input brings its own box
 * with it: its own height, its own inner parts, its own idea of dark. Only a
 * browser shows whether the field is the height of an Input, keeps that
 * height while empty, takes a value from its picker's keyboard, and submits
 * it in the format the app expects.
 *
 * This runs in Chromium. What WebKit on iOS does with the same input (the
 * collapsed empty field, the centred value) is answered in the component by
 * the known CSS, and is not verified here.
 */

const fields = [
    {
        name: "DateField",
        kind: "date",
        label: "Quiz date",
        value: "2026-10-06",
        next: "2026-11-03",
        text: /In British English: 3 Nov 2026\.\s+In\s+American English: Nov 3, 2026\./,
        limitsLabel: "Last day to sign up",
        tooEarly: "2026-09-15",
        error: "Pick a day in October or later.",
        fine: "2026-10-15",
        formFieldLabel: "Played on",
        description: "Shown on the leaderboard.",
    },
    {
        name: "TimeField",
        kind: "time",
        label: "Starts",
        value: "19:00",
        next: "20:30",
        text: /In British English: 20:30\.\s+In\s+American English: 8:30\sPM\./,
        limitsLabel: "Doors open",
        tooEarly: "16:00",
        error: "The pub opens at 17:00.",
        fine: "18:00",
        formFieldLabel: "First question",
        description: "Shown in the invitation.",
    },
] as const;

async function box(locator: Locator) {
    const rect = await locator.boundingBox();
    expect(rect, "The element must be laid out").not.toBeNull();
    return rect!;
}

for (const field of fields) {
    const form = (page: Page) => page.getByTestId(`${field.kind}-field-demo-form`);
    const main = (page: Page) => form(page).getByLabel(field.label);
    const sent = (page: Page) => page.getByTestId(`${field.kind}-field-demo-sent`);
    const text = (page: Page) => page.getByTestId(`${field.kind}-field-demo-text`);

    /** The page is usable before it hydrates; a value typed early is not bound. */
    async function open(page: Page) {
        await page.goto(`/components/${field.name}`, { waitUntil: "domcontentloaded" });
        await waitForHydration(page);
        await main(page).fill(field.next);
        await expect(text(page)).toContainText(`Value: ${field.next}.`);
        await main(page).fill(field.value);
        await expect(text(page)).toContainText(`Value: ${field.value}.`);
    }

    test.describe(`${field.name} — a native ${field.kind} input in Input's box`, () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 375, height: 740 });
            await open(page);
        });

        test("is a native input of its type with a real label, and binds a picked value", async ({ page }) => {
            await expect(main(page)).toHaveAttribute("type", field.kind);
            await expect(main(page)).toHaveValue(field.value);
            // What a picker does: it sets the value and fires input.
            await main(page).fill(field.next);
            await expect(main(page)).toHaveValue(field.next);
            await expect(text(page)).toContainText(`Value: ${field.next}.`);
            // The field shows the browser's format; the page's own is text beside it.
            await expect(text(page)).toHaveText(field.text);
        });

        test("takes the keyboard: the arrow keys change the focused part", async ({ page }) => {
            await main(page).focus();
            await expect(main(page)).toBeFocused();
            await page.keyboard.press("ArrowUp");
            await expect(main(page)).not.toHaveValue(field.value);
            expect(await main(page).inputValue()).toMatch(
                field.kind === "date" ? /^\d{4}-\d{2}-\d{2}$/ : /^\d{2}:\d{2}$/,
            );
            expect(await main(page).evaluate((el) => getComputedStyle(el).boxShadow), "A focus ring").not.toBe(
                "none",
            );
        });

        test("submits its value under its name in the native format, and an empty string while empty", async ({
            page,
        }) => {
            await main(page).fill(field.next);
            await form(page).getByRole("button", { name: "Send" }).click();
            await expect(sent(page)).toHaveText(JSON.stringify({ [field.kind]: field.next }));

            // Required and empty: the browser's own validation stops the form.
            await main(page).fill("");
            await expect(text(page)).toContainText("Value: empty.");
            await form(page).getByRole("button", { name: "Send" }).click();
            await expect(sent(page)).toHaveText(JSON.stringify({ [field.kind]: field.next }));
            expect(await main(page).evaluate((el: HTMLInputElement) => el.validity.valueMissing)).toBe(true);
        });

        test("is as tall as an Input at every size, with a mouse and on a touch screen", async ({ page }) => {
            const sizes = page.locator("main").getByLabel("Small", { exact: true });
            await sizes.scrollIntoViewIfNeeded();
            const height = async (label: string) =>
                Math.round((await box(page.locator("main").getByLabel(label, { exact: true }))).height);
            expect([await height("Small"), await height("Medium"), await height("Large")]).toEqual([32, 40, 48]);
        });

        test("keeps its height and width while empty, and shows the format hint in the placeholder colour", async ({
            page,
        }) => {
            const filled = await box(main(page));
            const colours = () =>
                main(page).evaluate((el) => {
                    const probe = document.createElement("span");
                    document.body.append(probe);
                    const token = (name: string) => {
                        probe.style.color = `var(${name})`;
                        return getComputedStyle(probe).color;
                    };
                    const out = {
                        text: getComputedStyle(el).color,
                        body: token("--color-body"),
                        placeholder: token("--color-input-placeholder"),
                    };
                    probe.remove();
                    return out;
                });
            await expect.poll(async () => (await colours()).text === (await colours()).body).toBe(true);

            await main(page).fill("");
            const empty = await box(main(page));
            expect(Math.round(empty.height)).toBe(Math.round(filled.height));
            expect(Math.round(empty.width)).toBe(Math.round(filled.width));
            await expect
                .poll(async () => (await colours()).text === (await colours()).placeholder)
                .toBe(true);
        });

        test("has 16px text on a phone and 14px from sm up, like Input", async ({ page }) => {
            const size = () => main(page).evaluate((el) => getComputedStyle(el).fontSize);
            expect(await size(), "Under 16px, iOS zooms the page on focus").toBe("16px");
            await page.setViewportSize({ width: 800, height: 740 });
            expect(await size()).toBe("14px");
        });

        test("has the box of an Input: no browser chrome of its own, the value at the start", async ({
            page,
        }) => {
            const style = await main(page).evaluate((el) => {
                const computed = getComputedStyle(el);
                return {
                    appearance: computed.appearance,
                    display: computed.display,
                    radius: computed.borderTopLeftRadius,
                    border: computed.borderTopWidth,
                    align: computed.textAlign,
                };
            });
            expect(style.appearance).toBe("none");
            expect(style.display).toBe("block");
            expect(style.radius).toBe("8px");
            expect(style.border).toBe("1px");
            expect(style.align).toBe("start");
            const card = await box(form(page));
            const input = await box(main(page));
            expect(Math.round(input.width), "As wide as its container").toBe(Math.round(card.width));
        });

        test("hint and error are read out with the field, and the error marks it invalid", async ({ page }) => {
            const limited = page.locator("main").getByLabel(field.limitsLabel);
            await limited.scrollIntoViewIfNeeded();
            const hint = await limited.getAttribute("aria-describedby");
            expect(hint).toMatch(/-hint$/);
            await expect(page.locator(`#${hint}`)).toBeVisible();
            await expect(limited).not.toHaveAttribute("aria-invalid", "true");

            await limited.fill(field.tooEarly);
            const alert = page.locator("main").getByRole("alert").filter({ hasText: field.error });
            await expect(alert).toBeVisible();
            await expect(limited).toHaveAttribute("aria-invalid", "true");
            await expect(limited).toHaveAccessibleDescription(new RegExp(field.error.replace(/\./g, "\\.")));
            // The browser's own check agrees: the value is under min.
            expect(await limited.evaluate((el: HTMLInputElement) => el.validity.rangeUnderflow)).toBe(true);

            await limited.fill(field.fine);
            await expect(alert).toHaveCount(0);
            await expect(limited).not.toHaveAttribute("aria-invalid", "true");
            expect(await limited.evaluate((el: HTMLInputElement) => el.validity.valid)).toBe(true);
        });

        test("inside FormField: one label that focuses the field, and the description wired to it", async ({
            page,
        }) => {
            const inField = page.locator("main").getByLabel(field.formFieldLabel);
            await inField.scrollIntoViewIfNeeded();
            await expect(inField).toHaveAttribute("type", field.kind);
            await expect(inField).toHaveAttribute("required", "");
            await expect(inField).toHaveAccessibleDescription(field.description);
            const id = await inField.getAttribute("id");
            await expect(page.locator(`label[for="${id}"]`)).toHaveCount(1);
            await page.locator(`label[for="${id}"]`).click();
            await expect(inField).toBeFocused();
            await expect(inField).toHaveValue(field.value);
            await inField.fill(field.next);
            await expect(inField).toHaveValue(field.next);
        });

        test("read only and disabled: the value shows, and neither takes a new one from the keyboard", async ({
            page,
        }) => {
            const readOnly = page.locator("main").getByLabel("Read only");
            const disabled = page.locator("main").getByLabel("Disabled", { exact: true });
            await readOnly.scrollIntoViewIfNeeded();
            await expect(readOnly).toHaveValue(field.value);
            await expect(readOnly).toHaveJSProperty("readOnly", true);
            await readOnly.focus();
            await page.keyboard.press("ArrowUp");
            await expect(readOnly).toHaveValue(field.value);
            await expect(disabled).toBeDisabled();
            await expect(disabled).toHaveValue(field.value);
        });

        test("dark theme: the browser's own parts are told the page is dark", async ({ page }) => {
            const scheme = () => main(page).evaluate((el) => getComputedStyle(el).colorScheme);
            await page.evaluate(() => {
                document.documentElement.classList.remove("dark");
                document.documentElement.style.colorScheme = "";
            });
            expect(await scheme()).not.toBe("dark");
            // Only the class: the theme's dark block sets `color-scheme` itself.
            await page.evaluate(() => document.documentElement.classList.add("dark"));
            expect(await scheme()).toBe("dark");
            await page.evaluate(() => {
                document.documentElement.classList.remove("dark");
                document.documentElement.dataset.theme = "dark";
            });
            expect(await scheme()).toBe("dark");
        });

        test("forced colours: the field keeps its edge", async ({ page }) => {
            await page.emulateMedia({ forcedColors: "active" });
            const edge = await main(page).evaluate((el) => {
                const style = getComputedStyle(el);
                return { width: style.borderTopWidth, style: style.borderTopStyle, colour: style.borderTopColor };
            });
            expect(edge.width).toBe("1px");
            expect(edge.style).toBe("solid");
            expect(edge.colour).not.toBe("rgba(0, 0, 0, 0)");
        });

        test("right to left: the field keeps its box, and nothing overflows", async ({ page }) => {
            await page.evaluate(() => (document.documentElement.dir = "rtl"));
            // Chromium keeps a date or time input left to right inside a
            // right-to-left page; the field leaves that to the browser.
            expect(await main(page).evaluate((el) => getComputedStyle(el).textAlign)).toBe("start");
            const card = await box(form(page));
            const input = await box(main(page));
            expect(Math.round(input.x)).toBe(Math.round(card.x));
            expect(Math.round(input.width)).toBe(Math.round(card.width));
            expect(await form(page).evaluate((el) => el.scrollWidth <= el.clientWidth)).toBe(true);
            await expect(main(page)).toHaveValue(field.value);
        });

        test("fits a 320px screen, also with the text enlarged to 200%", async ({ page }) => {
            // The docs card is narrower than a phone at phone width. On a wide
            // page the example is set to 288px: a 320px screen with 16px margins.
            await page.setViewportSize({ width: 1000, height: 800 });
            await form(page).evaluate((el) => ((el as HTMLElement).style.width = "288px"));
            // Both boxes in one reading: the page is still settling after the text grows.
            const fits = async () => {
                const boxes = await form(page).evaluate((el) => {
                    const card = el.getBoundingClientRect();
                    const input = el.querySelector("input")!.getBoundingClientRect();
                    return {
                        card: [card.left, card.right],
                        input: [input.left, input.right],
                        scrolls: el.scrollWidth > el.clientWidth,
                    };
                });
                expect(Math.round(boxes.card[1] - boxes.card[0])).toBe(288);
                expect(boxes.input[0]).toBeGreaterThanOrEqual(boxes.card[0] - 0.5);
                expect(boxes.input[1]).toBeLessThanOrEqual(boxes.card[1] + 0.5);
                expect(boxes.scrolls).toBe(false);
            };
            await fits();
            const before = await box(main(page));
            await page.evaluate(() => (document.documentElement.style.fontSize = "200%"));
            await fits();
            // The box grows with the text, as an Input's does.
            expect((await box(main(page))).height).toBeGreaterThan(before.height);
        });
    });

    test.describe(`${field.name} — touch`, () => {
        test.use({ hasTouch: true, isMobile: true, viewport: { width: 375, height: 740 } });

        test("is at least 44px tall at every size, and a tap focuses it", async ({ page }) => {
            await open(page);
            for (const label of ["Small", "Medium", "Large"]) {
                const input = page.locator("main").getByLabel(label, { exact: true });
                await input.scrollIntoViewIfNeeded();
                expect((await box(input)).height, label).toBeGreaterThanOrEqual(44);
            }
            await main(page).scrollIntoViewIfNeeded();
            await main(page).tap();
            await expect(main(page)).toBeFocused();
        });
    });
}
