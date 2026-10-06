import { expect, test, type Locator, type Page } from "@playwright/test";

/**
 * Select and Dropdown on a phone.
 *
 * A pop-over under its trigger is a desktop pattern: on a phone the list is
 * as narrow as the field, opens under the thumb and is cut by the keyboard.
 * With `presentation="auto"` (Select's default) the list opens in a
 * BottomSheet on a touch screen narrower than 640px, and under the trigger
 * everywhere else. Dropdown has the same prop and defaults to the pop-over;
 * `presentation="sheet"` is the action sheet.
 *
 * The list, its role, its options and the keys are the same in both.
 */

const LAB = "/chaos-lab/touch-menus";

async function gotoLab(page: Page) {
    await page.goto(LAB, { waitUntil: "domcontentloaded" });
    await expect(page.getByTestId("lab-hydrated")).toBeAttached({ timeout: 30_000 });
}

const host = (page: Page, id: string) => page.getByTestId(`lab-${id}`);
const selectTrigger = (scope: Page | Locator) => scope.locator('button[aria-haspopup="listbox"]');
const sheet = (page: Page, name: string) => page.getByRole("dialog", { name, exact: true });

const rect = (locator: Locator) =>
    locator.evaluate((element) => {
        const { left, right, top, bottom, width, height } = element.getBoundingClientRect();
        return { left, right, top, bottom, width, height };
    });

/** The sheet slides in over 200ms. */
async function settled(page: Page) {
    await page.waitForTimeout(350);
}

for (const width of [375, 320]) {
    test.describe(`Select on a phone, ${width}px`, () => {
        test.use({ viewport: { width, height: 740 }, hasTouch: true, isMobile: true });

        test("before it is touched the markup is the same as anywhere: no sheet, no list", async ({ page }) => {
            await gotoLab(page);
            await expect(page.getByRole("dialog")).toHaveCount(0);
            await expect(page.getByRole("listbox")).toHaveCount(0);
            await expect(selectTrigger(host(page, "select-long"))).toHaveAttribute("aria-expanded", "false");
        });

        test("opens its list in a sheet named by its label, as wide as the screen, with 48px rows", async ({
            page,
        }) => {
            await gotoLab(page);
            await selectTrigger(host(page, "select-long")).tap();
            const dialog = sheet(page, "Pub");
            await expect(dialog).toBeVisible();
            await settled(page);

            const box = await rect(dialog);
            expect(box.left).toBe(0);
            expect(box.width).toBe(width);
            expect(box.bottom).toBeCloseTo(740, 0);

            const list = dialog.getByRole("listbox");
            await expect(list).toHaveAttribute("aria-label", "Pub");
            const options = dialog.getByRole("option");
            await expect(options).toHaveCount(12);
            const sizes = await options.evaluateAll((elements) =>
                elements.map((element) => {
                    const { width, height } = element.getBoundingClientRect();
                    return { width, height };
                }),
            );
            for (const size of sizes) {
                expect(size.height).toBeGreaterThanOrEqual(48);
                // Full width: the sheet less its own padding and the list's.
                expect(size.width).toBeGreaterThan(width - 60);
            }
            // The page did not grow sideways.
            expect(
                await page.evaluate(
                    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
                ),
            ).toBe(0);
        });

        test("the chosen option is marked, focused and in view; a long, searchable list opens at full height", async ({
            page,
        }) => {
            await gotoLab(page);
            await selectTrigger(host(page, "select-long")).tap();
            const dialog = sheet(page, "Pub");
            await expect(dialog).toBeVisible();
            await settled(page);
            await expect(dialog).toHaveAttribute("data-snap", "full");

            const chosen = dialog.getByRole("option", { name: "Glenfiddich Warehouse" });
            await expect(chosen).toHaveAttribute("aria-selected", "true");
            await expect(chosen).toBeFocused();
            const option = await rect(chosen);
            const content = await rect(dialog.locator("[data-bottom-sheet-content]"));
            expect(option.top).toBeGreaterThanOrEqual(content.top);
            expect(option.bottom).toBeLessThanOrEqual(content.bottom);
        });

        test("the search field stays under the header while the list scrolls, and filters it", async ({ page }) => {
            await gotoLab(page);
            await selectTrigger(host(page, "select-long")).tap();
            const dialog = sheet(page, "Pub");
            await expect(dialog).toBeVisible();
            await settled(page);
            const search = dialog.getByRole("textbox", { name: "Search options" });
            const before = await rect(search);
            await dialog.locator("[data-bottom-sheet-content]").evaluate((element) => {
                element.style.height = "200px";
                element.style.flex = "none";
                element.scrollTop = 300;
            });
            const after = await rect(search);
            expect(after.top).toBeCloseTo(before.top, 0);
            // On top of the options that scrolled under it.
            expect(
                await search.evaluate((element) => {
                    const box = element.getBoundingClientRect();
                    const hit = document.elementFromPoint(box.left + box.width / 2, box.top + box.height / 2);
                    return hit === element;
                }),
            ).toBe(true);

            await search.fill("kv");
            await expect(dialog.getByRole("option")).toHaveCount(1);
            await expect(dialog.getByRole("option", { name: "Kvarnen" })).toBeVisible();
        });

        test("choosing an option closes the sheet, sets the value and the form value, and returns focus", async ({
            page,
        }) => {
            await gotoLab(page);
            const trigger = selectTrigger(host(page, "select-long"));
            await trigger.tap();
            const dialog = sheet(page, "Pub");
            await expect(dialog).toBeVisible();
            await settled(page);
            await dialog.getByRole("option", { name: "Kvarnen" }).tap();
            await expect(dialog).toHaveCount(0);
            await expect(trigger).toContainText("Kvarnen");
            await expect(trigger).toBeFocused();
            await expect(trigger).toHaveAttribute("aria-expanded", "false");
            expect(
                await page.getByTestId("lab-form").evaluate((form) => new FormData(form as HTMLFormElement).get("pub")),
            ).toBe("10");
        });

        test("choosing the chosen option again closes the sheet and keeps the value", async ({ page }) => {
            await gotoLab(page);
            const trigger = selectTrigger(host(page, "select-long"));
            await trigger.tap();
            const dialog = sheet(page, "Pub");
            await expect(dialog).toBeVisible();
            await settled(page);
            await dialog.getByRole("option", { name: "Glenfiddich Warehouse" }).tap();
            await expect(dialog).toHaveCount(0);
            await expect(page.getByTestId("lab-values")).toHaveText("7|");
        });

        test("a disabled option takes focus and cannot be chosen", async ({ page }) => {
            await gotoLab(page);
            const trigger = selectTrigger(host(page, "select-long"));
            await trigger.tap();
            const dialog = sheet(page, "Pub");
            await expect(dialog).toBeVisible();
            await settled(page);
            const disabled = dialog.getByRole("option", { name: "Dovas" });
            await expect(disabled).toHaveAttribute("aria-disabled", "true");
            await disabled.focus();
            await expect(disabled).toBeFocused();
            // Playwright will not tap what says it is disabled; a finger will.
            await disabled.tap({ force: true });
            await expect(dialog).toBeVisible();
            await expect(page.getByTestId("lab-values")).toHaveText("7|");
        });

        test("the keys are the list's own: arrows, Home and End move, Tab stays in the sheet, Escape closes", async ({
            page,
        }) => {
            await gotoLab(page);
            const trigger = selectTrigger(host(page, "select-short"));
            await trigger.focus();
            await page.keyboard.press("Enter");
            const dialog = sheet(page, "Storlek");
            await expect(dialog).toBeVisible();
            await settled(page);
            // A short list without search opens at half height.
            await expect(dialog).toHaveAttribute("data-snap", "half");
            const options = dialog.getByRole("option");
            await expect(options.nth(0)).toBeFocused();
            await page.keyboard.press("ArrowDown");
            await expect(options.nth(1)).toBeFocused();
            await page.keyboard.press("End");
            await expect(options.nth(2)).toBeFocused();
            await page.keyboard.press("ArrowDown");
            await expect(options.nth(0)).toBeFocused();
            await page.keyboard.press("Home");
            await expect(options.nth(0)).toBeFocused();

            for (let press = 0; press < 8; press += 1) {
                await page.keyboard.press("Tab");
                expect(
                    await dialog.evaluate((element) => element.contains(document.activeElement)),
                    "Tab stays in the sheet",
                ).toBe(true);
            }
            await expect(dialog).toBeVisible();

            await page.keyboard.press("Escape");
            await expect(dialog).toHaveCount(0);
            await expect(trigger).toBeFocused();
            await expect(page.getByTestId("lab-values")).toHaveText("7|");
        });

        test("the backdrop and the close button close it without choosing", async ({ page }) => {
            await gotoLab(page);
            const trigger = selectTrigger(host(page, "select-short"));
            await trigger.tap();
            const dialog = sheet(page, "Storlek");
            await expect(dialog).toBeVisible();
            await settled(page);
            await page.touchscreen.tap(width / 2, 40);
            await expect(dialog).toHaveCount(0);

            await trigger.tap();
            await expect(dialog).toBeVisible();
            await settled(page);
            await dialog.getByRole("button", { name: "Close" }).tap();
            await expect(dialog).toHaveCount(0);
            await expect(page.getByTestId("lab-values")).toHaveText("7|");
        });

        test('presentation="popover" keeps the list under the field', async ({ page }) => {
            await gotoLab(page);
            await selectTrigger(host(page, "select-popover")).tap();
            await expect(host(page, "select-popover").getByRole("listbox")).toBeVisible();
            await expect(page.getByRole("dialog")).toHaveCount(0);
        });
    });
}

test.describe("Select in another overlay, on a phone", () => {
    test.use({ viewport: { width: 375, height: 740 }, hasTouch: true, isMobile: true });

    for (const outer of [
        { open: "lab-open-modal", name: "Nytt besök", label: "Pub i dialogen", index: 0 },
        { open: "lab-open-drawer", name: "Filter", label: "Pub i lådan", index: 1 },
        { open: "lab-open-sheet", name: "Logga besök", label: "Pub i arket", index: 2 },
    ]) {
        test(`${outer.name}: the sheet opens on top, and closing it returns to the field in the overlay`, async ({
            page,
        }) => {
            await gotoLab(page);
            await page.getByTestId(outer.open).tap();
            const parent = sheet(page, outer.name);
            await expect(parent).toBeVisible();
            await settled(page);
            const trigger = selectTrigger(parent);
            await trigger.tap();
            const dialog = sheet(page, outer.label);
            await expect(dialog).toBeVisible();
            await settled(page);

            // On top: an option in it is what a tap at its centre reaches.
            const option = dialog.getByRole("option", { name: "Engelen" });
            expect(
                await option.evaluate((element) => {
                    element.scrollIntoView({ block: "center", behavior: "instant" });
                    const box = element.getBoundingClientRect();
                    const hit = document.elementFromPoint(box.left + box.width / 2, box.top + box.height / 2);
                    return !!hit && (hit === element || element.contains(hit));
                }),
            ).toBe(true);

            // Escape closes the list only.
            await page.keyboard.press("Escape");
            await expect(dialog).toHaveCount(0);
            await expect(parent).toBeVisible();
            await expect(trigger).toBeFocused();

            // And a choice lands in the field of the overlay underneath.
            await trigger.tap();
            await expect(dialog).toBeVisible();
            await settled(page);
            await dialog.getByRole("option", { name: "Engelen" }).tap();
            await expect(dialog).toHaveCount(0);
            await expect(parent).toBeVisible();
            await expect(trigger).toContainText("Engelen");
            await expect(trigger).toBeFocused();
            const values = (await page.getByTestId("lab-nested-values").textContent())!.split("|");
            expect(values[outer.index]).toBe("5");
        });
    }
});

test.describe("Dropdown on a phone", () => {
    test.use({ viewport: { width: 375, height: 740 }, hasTouch: true, isMobile: true });

    test("by default it is still a menu under its trigger", async ({ page }) => {
        await gotoLab(page);
        await host(page, "menu-popover").getByRole("button", { name: "Meny" }).tap();
        const menu = host(page, "menu-popover").getByRole("menu");
        await expect(menu).toBeVisible();
        await expect(page.getByRole("dialog")).toHaveCount(0);
        await expect(menu.locator("xpath=..")).toHaveAttribute("data-resolved-placement", /.+/);
    });

    test('presentation="sheet" is an action sheet: the same menu, 48px rows, icon, description and danger tone', async ({
        page,
    }) => {
        await gotoLab(page);
        const trigger = host(page, "menu-sheet").getByRole("button", { name: "Åtgärder" });
        await trigger.tap();
        const dialog = sheet(page, "Besöket på Kvarnen");
        await expect(dialog).toBeVisible();
        await settled(page);
        // Four actions: half height.
        await expect(dialog).toHaveAttribute("data-snap", "half");

        const menu = dialog.getByRole("menu", { name: "Besök" });
        await expect(menu).toBeVisible();
        const items = menu.getByRole("menuitem");
        await expect(items).toHaveCount(4);
        await expect(items.nth(0)).toBeFocused();
        for (const box of await items.evaluateAll((elements) =>
            elements.map((element) => element.getBoundingClientRect().height),
        )) {
            expect(box).toBeGreaterThanOrEqual(48);
        }
        await expect(items.nth(0).locator("svg")).toHaveCount(1);
        await expect(items.nth(1)).toContainText("Skicka en länk till besöket");
        const colours = await items.evaluateAll((elements) => elements.map((element) => getComputedStyle(element).color));
        expect(colours[3]).not.toBe(colours[0]);

        // Arrow keys in order, wrapping; a disabled item is reached and not done.
        await page.keyboard.press("ArrowDown");
        await page.keyboard.press("ArrowDown");
        await expect(items.nth(2)).toBeFocused();
        await expect(items.nth(2)).toHaveAttribute("aria-disabled", "true");
        await page.keyboard.press("Enter");
        await expect(dialog).toBeVisible();
        await expect(page.getByTestId("lab-action")).toHaveText("");
        await page.keyboard.press("ArrowUp");
        await page.keyboard.press("ArrowUp");
        await page.keyboard.press("ArrowUp");
        await expect(items.nth(3)).toBeFocused();

        await items.nth(1).tap();
        await expect(dialog).toHaveCount(0);
        await expect(page.getByTestId("lab-action")).toHaveText("share");
        await expect(trigger).toBeFocused();
    });

    test('presentation="auto" opens the sheet here', async ({ page }) => {
        await gotoLab(page);
        await host(page, "menu-auto").getByRole("button", { name: "Mer" }).tap();
        await expect(sheet(page, "Mer")).toBeVisible();
        await expect(sheet(page, "Mer").getByRole("menuitem")).toHaveCount(4);
    });
});

test.describe("Where nothing changes", () => {
    for (const context of [
        { name: "a mouse at 1280px", use: { viewport: { width: 1280, height: 800 } } },
        { name: "a mouse in a 375px window", use: { viewport: { width: 375, height: 740 } } },
        {
            name: "a tablet: a coarse pointer at 820px",
            use: { viewport: { width: 820, height: 1180 }, hasTouch: true, isMobile: true },
        },
    ]) {
        test.describe(context.name, () => {
            test.use(context.use);

            test("Select and an auto Dropdown open under their triggers, with no dialog", async ({ page }) => {
                await gotoLab(page);
                const field = host(page, "select-long");
                const trigger = selectTrigger(field);
                await trigger.click();
                const list = field.getByRole("listbox");
                await expect(list).toBeVisible();
                await expect(page.getByRole("dialog")).toHaveCount(0);

                // The pop-over's geometry: under the field, 8px away, from its start edge, as wide as it.
                const panel = await rect(list.locator("xpath=.."));
                const button = await rect(trigger);
                expect(panel.top).toBeCloseTo(button.bottom + 8, 0);
                expect(panel.left).toBeCloseTo(button.left, 0);
                // As wide as the field, to within the panel's own rounding of it.
                expect(Math.abs(panel.width - button.width)).toBeLessThan(4);
                // Printed, to compare with the same run before the change.
                console.log(
                    `GEOMETRY ${test.info().titlePath[2]}: panel ${[panel.left, panel.top, panel.width, panel.height].map((value) => Math.round(value * 10) / 10).join(" ")} trigger ${[button.left, button.bottom, button.width].map((value) => Math.round(value * 10) / 10).join(" ")}`,
                );
                await page.keyboard.press("Escape");
                await expect(list).toHaveCount(0);

                await host(page, "menu-auto").getByRole("button", { name: "Mer" }).click();
                await expect(host(page, "menu-auto").getByRole("menu")).toBeVisible();
                await expect(page.getByRole("dialog")).toHaveCount(0);
            });
        });
    }

    test.describe("explicitly a sheet, with a mouse at 1280px", () => {
        test.use({ viewport: { width: 1280, height: 800 } });

        test('presentation="sheet" is a sheet on any screen', async ({ page }) => {
            await gotoLab(page);
            await host(page, "menu-sheet").getByRole("button", { name: "Åtgärder" }).click();
            await expect(sheet(page, "Besöket på Kvarnen")).toBeVisible();
        });
    });
});
