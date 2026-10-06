import { expect, test, type Locator, type Page } from "@playwright/test";

import { gotoHydrated } from "./helpers/hydration";

/**
 * Select as a form control.
 *
 * Width: the trigger sat in an inline-block, so it was as wide as its label
 * (178.6px in a 328px column), changed width with the choice, could not be
 * narrower than the label, and cut the label off where the column was.
 *
 * Without scripts: the trigger was a button that opens a list from script and
 * the form control a hidden input, so before the scripts arrived, or with
 * none, a press did nothing and the form sent an empty value. The server's
 * HTML now carries a real `<select>`, which is the control until the
 * component has mounted and the form control ever after.
 */

const LAB = "/chaos-lab/select-form";

const host = (page: Page, id: string) => page.getByTestId(`lab-${id}`);
const trigger = (scope: Locator) => scope.locator('button[aria-haspopup="listbox"]');
const native = (scope: Locator) => scope.locator("select");

const rect = (locator: Locator) =>
    locator.evaluate((element) => {
        const { left, right, top, bottom, width, height } = element.getBoundingClientRect();
        return { left, right, top, bottom, width, height };
    });

const overflow = (page: Page) =>
    page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);

const round = (value: number) => Math.round(value * 10) / 10;

test.describe("Select fills its column", () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test("the trigger is as wide as the column and as an Input in it, whatever is chosen", async ({ page }) => {
        await gotoHydrated(page, LAB);
        const field = host(page, "frequency");
        const before = await rect(trigger(field));
        const input = await rect(host(page, "input").locator("input"));
        console.log(`MEASURED trigger ${round(before.width)}px in a 328px column; input ${round(input.width)}px`);
        expect(before.width).toBe(328);
        expect(before.width).toBe(input.width);
        expect(before.left).toBe(input.left);
        // One line: the shared height scale.
        expect(before.height).toBe(40);

        // A shorter choice does not change the control's width.
        await trigger(field).click();
        await field.getByRole("option", { name: "Every week" }).click();
        await expect(trigger(field)).toContainText("Every week");
        expect((await rect(trigger(field))).width).toBe(328);
    });

    test("the list is as wide as the trigger", async ({ page }) => {
        await gotoHydrated(page, LAB);
        const field = host(page, "frequency");
        await trigger(field).click();
        const list = field.getByRole("listbox");
        await expect(list).toBeVisible();
        const panel = await rect(list.locator("xpath=.."));
        expect(panel.width).toBeCloseTo(328, 0);
    });

    test("in a column narrower than its label the trigger is that narrow, and the label wraps whole", async ({
        page,
    }) => {
        await gotoHydrated(page, LAB);
        const field = host(page, "narrow");
        const button = await rect(trigger(field));
        const column = await rect(field);
        expect(button.width).toBe(128);
        expect(button.right).toBeLessThanOrEqual(column.right);
        const label = trigger(field).locator("span").first();
        // Nothing is cut: no ellipsis, nothing wider than its box, more than one line.
        expect(await label.evaluate((element) => getComputedStyle(element).textOverflow)).not.toBe("ellipsis");
        expect(await label.evaluate((element) => element.scrollWidth <= element.clientWidth + 1)).toBe(true);
        expect(button.height).toBeGreaterThan(40);
        await expect(label).toHaveText("Every other week");
        // The chevron is in the middle of the box, inside it.
        const chevron = await rect(trigger(field).locator("svg"));
        expect(Math.abs((chevron.top + chevron.bottom) / 2 - (button.top + button.bottom) / 2)).toBeLessThan(1);
        expect(chevron.right).toBeLessThanOrEqual(button.right);
    });
});

for (const width of [320, 360]) {
    test.describe(`Select at ${width}px with text at 200%`, () => {
        test.use({ viewport: { width, height: 740 }, hasTouch: true, isMobile: true });

        test("long Swedish labels wrap inside the column and the page does not grow sideways", async ({ page }) => {
            await gotoHydrated(page, LAB);
            await page.evaluate(() => (document.documentElement.style.fontSize = "200%"));
            await page.waitForTimeout(100);
            for (const id of ["swedish", "frequency", "narrow"]) {
                const field = host(page, id);
                const column = await rect(field);
                const button = await rect(trigger(field));
                console.log(`MEASURED ${width}px 200% ${id}: column ${round(column.width)}, trigger ${round(button.width)}x${round(button.height)}`);
                expect(button.left, id).toBeGreaterThanOrEqual(column.left - 0.5);
                expect(button.right, id).toBeLessThanOrEqual(column.right + 0.5);
                expect(button.right, id).toBeLessThanOrEqual(width);
                const label = trigger(field).locator("span").first();
                expect(await label.evaluate((element) => element.scrollWidth <= element.clientWidth + 1), id).toBe(true);
            }
            expect(await overflow(page)).toBe(0);
        });
    });
}

for (const size of [
    { width: 375, height: 740 },
    { width: 1280, height: 900 },
]) {
    test.describe(`Select without JavaScript, ${size.width}px`, () => {
        test.use({ viewport: size, javaScriptEnabled: false });

        test("is a native select that shows the chosen option, can be changed, and submits", async ({ page }) => {
            await page.goto(LAB, { waitUntil: "domcontentloaded" });
            const field = host(page, "frequency");
            const select = native(field);
            await expect(select).toBeVisible();
            await expect(select).toHaveValue("biweekly");
            await expect(select).toHaveAttribute("name", "frequency");
            // The label is the select's.
            await expect(page.getByLabel("Frequency", { exact: true })).toHaveValue("biweekly");
            // The custom trigger, which could do nothing here, is not shown.
            await expect(trigger(field)).toBeHidden();
            // It looks like the field: the column's width, the shared height.
            const box = await rect(select);
            expect(box.width).toBe(Math.min(328, size.width - 32));
            expect(box.height).toBe(40);
            // A disabled option is disabled natively; the placeholder of an empty one is its first option.
            await expect(select.locator('option[value="never"]')).toBeDisabled();
            await expect(native(host(page, "required")).locator("option").first()).toHaveText("Choose one");
            await expect(native(host(page, "required"))).toHaveValue("");

            await select.selectOption("monthly");
            await native(host(page, "required")).selectOption("weekly");
            await page.getByRole("button", { name: "Submit" }).click();
            await expect(page).toHaveURL(/[?&]frequency=monthly(&|$)/);
            await expect(page).toHaveURL(/[?&]needed=weekly(&|$)/);
            await expect(page).toHaveURL(/[?&]count=2(&|$)/);
            await expect(page).toHaveURL(/[?&]plain=weekly(&|$)/);
        });

        test("required is checked by the browser: an empty one stops the form", async ({ page }) => {
            await page.goto(LAB, { waitUntil: "domcontentloaded" });
            await page.getByRole("button", { name: "Submit" }).click();
            await page.waitForTimeout(300);
            expect(page.url()).not.toContain("frequency=");
            expect(
                await native(host(page, "required")).evaluate((element) => (element as HTMLSelectElement).validity.valueMissing),
            ).toBe(true);
        });
    });
}

test.describe("Select before and after it hydrates", () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    /** Holds every script back until `release()`, so the page is the server's HTML. */
    async function holdScripts(page: Page) {
        let release: () => void = () => {};
        const held = new Promise<void>((resolve) => (release = resolve));
        await page.route("**/*", async (route) => {
            if (route.request().resourceType() === "script") await held;
            await route.continue();
        });
        return () => release();
    }

    test("nothing moves when it hydrates: the native select and the trigger have the same box", async ({ page }) => {
        const release = await holdScripts(page);
        await page.goto(LAB, { waitUntil: "commit" });
        const field = host(page, "frequency");
        await expect(native(field)).toBeVisible();
        const before = {
            control: await rect(native(field)),
            below: await rect(page.getByRole("button", { name: "Submit" })),
        };
        release();
        await expect(page.getByTestId("lab-hydrated")).toBeAttached({ timeout: 30_000 });
        await expect(trigger(field)).toBeVisible();
        const after = {
            control: await rect(trigger(field)),
            below: await rect(page.getByRole("button", { name: "Submit" })),
        };
        console.log(
            `MEASURED hydration shift: control ${round(after.control.left - before.control.left)}/${round(after.control.top - before.control.top)}, size ${round(after.control.width - before.control.width)}x${round(after.control.height - before.control.height)}, content below ${round(after.below.top - before.below.top)}`,
        );
        expect(after.control).toEqual(before.control);
        expect(after.below.top).toBe(before.below.top);
    });

    test("a choice made before the scripts arrive is kept, and reported once", async ({ page }) => {
        const release = await holdScripts(page);
        await page.goto(LAB, { waitUntil: "commit" });
        const field = host(page, "frequency");
        await expect(native(field)).toBeVisible();
        await native(field).selectOption("monthly");
        await native(host(page, "count")).selectOption("3");
        release();
        await expect(page.getByTestId("lab-hydrated")).toBeAttached({ timeout: 30_000 });
        await expect(trigger(field)).toContainText("Every month");
        // The bound value, with a number still a number, and one change event for the one that changed.
        await expect(page.getByTestId("lab-state")).toHaveText("monthly||3:number|weekly|frequency");
        await expect(native(field)).toHaveValue("monthly");
    });

    test("once mounted the native select is out of the way and still the form control", async ({ page }) => {
        await gotoHydrated(page, LAB);
        const field = host(page, "frequency");
        const select = native(field);
        await expect(select).toHaveAttribute("name", "frequency");
        await expect(select).toHaveAttribute("aria-hidden", "true");
        await expect(select).toHaveAttribute("tabindex", "-1");
        // A press where the control is reaches the trigger.
        expect(
            await trigger(field).evaluate((element) => {
                const box = element.getBoundingClientRect();
                const hit = document.elementFromPoint(box.left + box.width / 2, box.top + box.height / 2);
                return !!hit && (hit === element || element.contains(hit));
            }),
        ).toBe(true);
        await expect(page.locator('input[type="hidden"][name="frequency"]')).toHaveCount(0);
        // The label names the trigger now.
        await expect(page.getByRole("combobox", { name: /Frequency/ })).toBeVisible();

        // Tab goes from the trigger on to the next field, not into the hidden select.
        await trigger(field).focus();
        await page.keyboard.press("Tab");
        await expect(host(page, "input").locator("input")).toBeFocused();

        // Choosing from the list changes what the form sends.
        await trigger(field).click();
        await field.getByRole("option", { name: "Every month" }).click();
        await expect(select).toHaveValue("monthly");
        await trigger(host(page, "required")).click();
        await host(page, "required").getByRole("option", { name: "Every week" }).click();
        await page.getByRole("button", { name: "Submit" }).click();
        await expect(page).toHaveURL(/[?&]frequency=monthly(&|$)/);
        await expect(page).toHaveURL(/[?&]needed=weekly(&|$)/);
    });

    test("required, mounted: an empty one stops the form, focus goes to its trigger, and it says why", async ({
        page,
    }) => {
        await gotoHydrated(page, LAB);
        const field = host(page, "required");
        const failures: string[] = [];
        page.on("console", (message) => {
            if (/not focusable/i.test(message.text())) failures.push(message.text());
        });
        await page.getByRole("button", { name: "Submit" }).click();
        await page.waitForTimeout(300);
        expect(page.url()).not.toContain("frequency=");
        await expect(trigger(field)).toBeFocused();
        // The browser's own words for it, in the browser's language, under the field,
        // announced, and what the trigger is described by. (A button cannot be `aria-invalid`.)
        const message = field.locator('[role="alert"]');
        await expect(message).toBeVisible();
        expect((await message.textContent())!.trim().length).toBeGreaterThan(3);
        const describedBy = await trigger(field).getAttribute("aria-describedby");
        expect(await message.evaluate((element) => element.closest("[id]")!.id)).toBe(describedBy);
        expect(failures).toEqual([]);

        // Choosing clears it, and the form goes.
        await trigger(field).click();
        await field.getByRole("option", { name: "Every month" }).click();
        await expect(message).toHaveCount(0);
        await page.getByRole("button", { name: "Submit" }).click();
        await expect(page).toHaveURL(/[?&]needed=monthly(&|$)/);
    });
});

test.describe('Select presentation="native"', () => {
    for (const size of [
        { width: 375, height: 740, touch: true },
        { width: 1280, height: 900, touch: false },
    ]) {
        test.describe(`${size.width}px`, () => {
            test.use({ viewport: { width: size.width, height: size.height }, hasTouch: size.touch, isMobile: size.touch });

            test("is only the native select, styled as the field, and bound like any other", async ({ page }) => {
                await gotoHydrated(page, LAB);
                const field = host(page, "native");
                const select = native(field);
                await expect(select).toBeVisible();
                await expect(trigger(field)).toHaveCount(0);
                await expect(page.getByLabel("Native", { exact: true })).toHaveValue("weekly");
                await expect(select).not.toHaveAttribute("aria-hidden", "true");

                const box = await rect(select);
                const input = await rect(host(page, "input").locator("input"));
                expect(box.width).toBe(input.width);
                expect(box.height).toBe(input.height);
                const style = await select.evaluate((element) => {
                    const computed = getComputedStyle(element);
                    return { size: parseFloat(computed.fontSize), radius: computed.borderTopLeftRadius };
                });
                // 16px below `sm`, so a phone does not zoom in on it.
                expect(style.size).toBe(size.width < 640 ? 16 : 14);
                expect(style.radius).toBe("8px");

                await select.selectOption("monthly");
                await expect(page.getByTestId("lab-state")).toHaveText(/\|monthly\|plain$/);
                // No list of the component's own, no dialog.
                await expect(page.getByRole("listbox")).toHaveCount(0);
                await expect(page.getByRole("dialog")).toHaveCount(0);
            });
        });
    }
});
