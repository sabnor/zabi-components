import { expect, test, type Page } from "@playwright/test";

/**
 * TopNavbar's phone menu, from a review of the docs site at phone sizes.
 *
 * Each test is one finding of that review, at the viewport it was found at.
 * The lab page (/chaos-lab/top-navbar) is a bar with eight items and a hash
 * for a route; the first finding also runs against the site's own header,
 * where following a link really changes the page.
 */

const LAB = "/chaos-lab/top-navbar";

const phone = { viewport: { width: 375, height: 667 }, hasTouch: true, isMobile: true };

const bar = (page: Page) => page.getByRole("navigation", { name: "Lab navigation" });
const menuButton = (page: Page) => page.getByRole("button", { name: /^(Open|Close) menu$/ });
/** The open phone menu: the element the menu button's `aria-controls` names. */
const panel = (page: Page) => page.locator("[id^='topnavbar-menu']");

async function gotoLab(page: Page, query = "") {
    await page.goto(`${LAB}${query}`, { waitUntil: "domcontentloaded" });
    await expect(page.getByTestId("lab-hydrated")).toBeAttached({ timeout: 30_000 });
}

async function openMenu(page: Page) {
    await menuButton(page).click();
    await expect(menuButton(page)).toHaveAttribute("aria-expanded", "true");
    await expect(panel(page)).toBeVisible();
}

const sidewaysOverflow = (page: Page) =>
    page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );

test.describe("TopNavbar phone menu at 375px", () => {
    test.use(phone);

    test("finding 1: the menu closes when a link in it is followed (site header)", async ({ page }) => {
        await page.goto("/", { waitUntil: "domcontentloaded" });
        const button = page.getByRole("button", { name: /^(Open|Close) menu$/ });
        // The page is usable before it hydrates; a tap that lands early does nothing.
        await expect(async () => {
            if ((await button.getAttribute("aria-expanded")) !== "true") await button.click();
            await expect(button).toHaveAttribute("aria-expanded", "true", { timeout: 1_000 });
        }).toPass({ timeout: 30_000 });

        await page.locator("[id^='topnavbar-menu']").getByRole("link", { name: "Docs" }).tap();
        await expect(page).toHaveURL(/\/docs$/);
        await expect(button).toHaveAttribute("aria-expanded", "false");
        await expect(page.locator("[id^='topnavbar-menu']")).toHaveCount(0);
    });

    test("finding 1: the menu closes on a link, and when the path changes some other way", async ({
        page,
    }) => {
        await gotoLab(page);
        await openMenu(page);
        await panel(page).getByRole("link", { name: "Patterns" }).tap();
        await expect(page.getByTestId("lab-path")).toHaveText("#patterns");
        await expect(menuButton(page)).toHaveAttribute("aria-expanded", "false");
        await expect(panel(page)).toHaveCount(0);

        await openMenu(page);
        await page.evaluate(() => {
            window.location.hash = "#theming";
        });
        await expect(page.getByTestId("lab-path")).toHaveText("#theming");
        await expect(menuButton(page)).toHaveAttribute("aria-expanded", "false");
    });

    test("finding 5: Escape closes the menu and returns focus to the menu button", async ({ page }) => {
        await gotoLab(page);
        await openMenu(page);
        const link = panel(page).getByRole("link", { name: "Components" });
        await link.focus();
        await expect(link).toBeFocused();

        await page.keyboard.press("Escape");
        await expect(panel(page)).toHaveCount(0);
        await expect(menuButton(page)).toHaveAttribute("aria-expanded", "false");
        await expect(menuButton(page)).toBeFocused();
    });

    test("finding 6: each link in the menu is the full row, and 44px tall", async ({ page }) => {
        await gotoLab(page);
        await openMenu(page);
        const row = (await panel(page).locator("ul").first().boundingBox())!;
        const links = await panel(page)
            .locator("ul a")
            .evaluateAll((anchors) =>
                anchors.map((anchor) => {
                    const { width, height } = anchor.getBoundingClientRect();
                    return { width, height };
                }),
            );
        expect(links).toHaveLength(8);
        expect(row.width).toBeGreaterThan(300);
        for (const link of links) {
            expect(link.width).toBeCloseTo(row.width, 0);
            expect(link.height).toBeGreaterThanOrEqual(44);
        }
    });

    test("finding 7: a tap outside the bar closes the menu; the page is not locked", async ({ page }) => {
        await gotoLab(page);
        await openMenu(page);

        // Not a modal: the page behind still scrolls.
        await page.evaluate(() => window.scrollTo(0, 200));
        expect(await page.evaluate(() => window.scrollY)).toBe(200);
        await expect(panel(page)).toBeVisible();
        expect(await page.evaluate(() => getComputedStyle(document.body).overflow)).not.toBe("hidden");

        // Below the open panel, on the page itself.
        const box = (await panel(page).boundingBox())!;
        await page.touchscreen.tap(187, Math.min(box.y + box.height + 30, 640));
        await expect(panel(page)).toHaveCount(0);
        await expect(menuButton(page)).toHaveAttribute("aria-expanded", "false");
    });

    test("a Dropdown in the menu opens whole, keeps its own Escape, and leaves the menu open", async ({
        page,
    }) => {
        await gotoLab(page, "?extra=1");
        await openMenu(page);
        // The menu fits here, so it is not a scrolling box that would clip the Dropdown.
        expect(await panel(page).evaluate((element) => getComputedStyle(element).overflowY)).toBe("visible");

        const account = panel(page).getByTestId("lab-account");
        await account.tap();
        const items = panel(page).getByRole("menuitem");
        await expect(items).toHaveCount(2);
        // Every item is under the finger, not cut off by the menu.
        const covered = await items.evaluateAll((elements) =>
            elements.map((element) => {
                const box = element.getBoundingClientRect();
                const hit = document.elementFromPoint(box.left + box.width / 2, box.top + box.height / 2);
                return !!hit && element.contains(hit);
            }),
        );
        expect(covered).toEqual([true, true]);

        // Escape closes the Dropdown first, and only then the menu.
        await items.first().focus();
        await page.keyboard.press("Escape");
        await expect(items).toHaveCount(0);
        await expect(panel(page)).toBeVisible();
        await expect(account).toBeFocused();
        await page.keyboard.press("Escape");
        await expect(panel(page)).toHaveCount(0);
        await expect(menuButton(page)).toBeFocused();

        // Choosing an item is not following a link: the menu stays.
        await openMenu(page);
        await account.tap();
        await items.first().tap();
        await expect(items).toHaveCount(0);
        await expect(panel(page)).toBeVisible();
    });

    test("a link that opens in a new tab closes the menu too", async ({ page, context }) => {
        await gotoLab(page, "?extra=1");
        await openMenu(page);
        const [popup] = await Promise.all([
            context.waitForEvent("page"),
            panel(page).getByRole("link", { name: /Source/ }).click(),
        ]);
        await popup.close();
        await expect(panel(page)).toHaveCount(0);
    });

    test("Tab past the last control closes the menu with focus on the next control in the page", async ({
        page,
    }) => {
        await gotoLab(page);
        await openMenu(page);
        await panel(page).getByRole("button", { name: /Switch to (dark|light) mode/ }).focus();
        await page.keyboard.press("Tab");
        await expect(page.getByTestId("lab-outside")).toBeFocused();
        await expect(panel(page)).toHaveCount(0);
        // And back: the bar's own controls, with the menu still closed.
        await page.keyboard.press("Shift+Tab");
        await expect(menuButton(page)).toBeFocused();
        await expect(menuButton(page)).toHaveAttribute("aria-expanded", "false");
    });

    test("finding 7: so does moving focus out of the bar; focus inside it does not", async ({ page }) => {
        await gotoLab(page);
        await openMenu(page);
        await panel(page).getByRole("link", { name: "Theming" }).focus();
        await expect(panel(page)).toBeVisible();

        await page.getByTestId("lab-outside").focus();
        await expect(panel(page)).toHaveCount(0);
        // Focus is left where the user put it.
        await expect(page.getByTestId("lab-outside")).toBeFocused();
    });

    test("finding 8: aria-controls names the panel only while the panel exists", async ({ page }) => {
        await gotoLab(page);
        const dangling = () =>
            menuButton(page).evaluate((button) => {
                const id = button.getAttribute("aria-controls");
                return id !== null && document.getElementById(id) === null;
            });
        expect(await dangling()).toBe(false);
        expect(await menuButton(page).getAttribute("aria-controls")).toBeNull();

        await openMenu(page);
        const id = await menuButton(page).getAttribute("aria-controls");
        expect(id).toBeTruthy();
        await expect(page.locator(`[id="${id}"]`)).toBeVisible();
        expect(await dangling()).toBe(false);
    });

    test("finding 9: widening past the breakpoint closes the menu, so it is closed on the way back", async ({
        page,
    }) => {
        await gotoLab(page, "?items=4");
        await openMenu(page);
        await page.setViewportSize({ width: 1024, height: 700 });
        await expect(menuButton(page)).toBeHidden();
        // A media query reports its change when the browser next renders; nobody resizes within a frame.
        await page.evaluate(
            () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
        );
        await page.setViewportSize({ width: 375, height: 667 });
        await expect(menuButton(page)).toBeVisible();
        await expect(menuButton(page)).toHaveAttribute("aria-expanded", "false");
        await expect(panel(page)).toHaveCount(0);
    });
});

test.describe("TopNavbar phone menu over the page it pushed down", () => {
    // Tall enough that the control under the open menu is still on screen.
    test.use({ viewport: { width: 375, height: 800 }, hasTouch: true, isMobile: true });

    for (const pointer of ["touch", "mouse"] as const) {
        test(`a ${pointer} press on a control under the open menu reaches it, and closes the menu`, async ({
            page,
        }) => {
            // At the top of the page the open menu pushes the page down. Closing
            // on the way down moved the control from under the press: it closed
            // the menu and the control never got its click.
            await gotoLab(page);
            await openMenu(page);
            const outside = page.getByTestId("lab-outside");
            const box = (await outside.boundingBox())!;
            const x = box.x + box.width / 2;
            const y = box.y + box.height / 2;
            if (pointer === "touch") await page.touchscreen.tap(x, y);
            else await page.mouse.click(x, y);

            await expect(page.getByTestId("lab-outside-presses")).toHaveText("1");
            await expect(panel(page)).toHaveCount(0);
        });
    }
});

test.describe("TopNavbar phone menu on a short screen", () => {
    test.use({ viewport: { width: 568, height: 320 }, hasTouch: true, isMobile: true });

    test("finding 2: the open menu fits under the bar and scrolls on its own to its last control", async ({
        page,
    }) => {
        await gotoLab(page);
        await openMenu(page);

        const sizes = await panel(page).evaluate((element) => {
            const box = element.getBoundingClientRect();
            return {
                bottom: box.bottom,
                scrolls: element.scrollHeight > element.clientHeight,
                overflowY: getComputedStyle(element).overflowY,
                overscroll: getComputedStyle(element).overscrollBehaviorY,
            };
        });
        expect(sizes.bottom).toBeLessThanOrEqual(320);
        expect(sizes.scrolls).toBe(true);
        expect(sizes.overflowY).toBe("auto");
        expect(sizes.overscroll).toBe("contain");

        // The last control in the menu can be brought on screen, without moving the page.
        const last = panel(page).getByRole("button", { name: /Switch to (dark|light) mode/ });
        await last.scrollIntoViewIfNeeded();
        const box = (await last.boundingBox())!;
        expect(box.y + box.height).toBeLessThanOrEqual(320);
        expect(box.y).toBeGreaterThanOrEqual(64);
        expect(await page.evaluate(() => window.scrollY)).toBe(0);
        await last.tap();
    });
});

test.describe("TopNavbar at 320px with text at 200%", () => {
    test.use({ viewport: { width: 320, height: 640 }, hasTouch: true, isMobile: true });

    test("finding 4: the brand is cut short and the menu button stays on screen", async ({ page }) => {
        await gotoLab(page);
        await page.evaluate(() => {
            document.documentElement.style.fontSize = "200%";
        });
        await expect(menuButton(page)).toBeVisible();
        const button = (await menuButton(page).boundingBox())!;
        expect(button.x).toBeGreaterThanOrEqual(0);
        expect(button.x + button.width).toBeLessThanOrEqual(320);

        const brand = bar(page).getByRole("link", { name: "Zabi Components" });
        const cut = await brand.evaluate((element) => ({
            truncated: element.scrollWidth > element.clientWidth,
            overflow: getComputedStyle(element).textOverflow,
            right: element.getBoundingClientRect().right,
        }));
        expect(cut.truncated).toBe(true);
        expect(cut.overflow).toBe("ellipsis");
        expect(cut.right).toBeLessThanOrEqual(button.x);
        // The bar itself does not widen the page.
        expect(await bar(page).evaluate((nav) => nav.scrollWidth - nav.clientWidth)).toBe(0);

        // And it still works.
        await openMenu(page);
    });

    test("finding 4: a long brand at normal text size is cut short too", async ({ page }) => {
        await gotoLab(page, "?brand=long");
        const button = (await menuButton(page).boundingBox())!;
        expect(button.x + button.width).toBeLessThanOrEqual(320);
        expect(await sidewaysOverflow(page)).toBe(0);
    });
});

test.describe("TopNavbar row on a wide pointer", () => {
    for (const width of [768, 900, 1024, 1100]) {
        test(`finding 3: eight items with collapseAt="xl" stay in the menu at ${width}px and nothing overflows`, async ({
            page,
        }) => {
            await page.setViewportSize({ width, height: 800 });
            await gotoLab(page, "?collapse=xl");
            expect(await sidewaysOverflow(page)).toBe(0);
            await expect(menuButton(page)).toBeVisible();
            await expect(bar(page).getByRole("link", { name: "Changelog" })).toHaveCount(0);
            await openMenu(page);
            await expect(panel(page).getByRole("link", { name: "Changelog" })).toBeVisible();
        });
    }

    test('finding 3: at 1280px collapseAt="xl" shows the row, and it fits', async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 800 });
        await gotoLab(page, "?collapse=xl");
        expect(await sidewaysOverflow(page)).toBe(0);
        await expect(menuButton(page)).toBeHidden();
        await expect(bar(page).getByRole("link", { name: "Changelog" })).toBeVisible();
    });

    test("the default still switches at 768px, and the row is as it was", async ({ page }) => {
        await page.setViewportSize({ width: 767, height: 800 });
        await gotoLab(page, "?items=4");
        await expect(menuButton(page)).toBeVisible();
        await expect(bar(page).getByRole("link", { name: "Theming" })).toHaveCount(0);

        await page.setViewportSize({ width: 768, height: 800 });
        await expect(menuButton(page)).toBeHidden();
        const links = bar(page).locator("ul a");
        await expect(links).toHaveCount(4);
        const boxes = await links.evaluateAll((anchors) =>
            anchors.map((anchor) => anchor.getBoundingClientRect().toJSON()),
        );
        // One row of pills as wide as their labels, 40px tall.
        expect(new Set(boxes.map((box) => Math.round(box.top))).size).toBe(1);
        for (const box of boxes) {
            expect(box.height).toBe(40);
            expect(box.width).toBeLessThan(140);
        }
        // The brand is whole in the row.
        const brand = bar(page).getByRole("link", { name: "Zabi Components" });
        expect(await brand.evaluate((element) => element.scrollWidth > element.clientWidth)).toBe(false);
        expect(await sidewaysOverflow(page)).toBe(0);
    });

    for (const collapse of ["sm", "lg"] as const) {
        test(`collapseAt="${collapse}" moves the switch`, async ({ page }) => {
            const at = collapse === "sm" ? 640 : 1024;
            await page.setViewportSize({ width: at - 1, height: 800 });
            await gotoLab(page, `?collapse=${collapse}&items=3`);
            await expect(menuButton(page)).toBeVisible();
            await page.setViewportSize({ width: at, height: 800 });
            await expect(menuButton(page)).toBeHidden();
            await expect(bar(page).getByRole("link", { name: "Patterns" })).toBeVisible();
        });
    }
});
