import { devices, expect, test, type Locator, type Page } from "@playwright/test";

/**
 * Drawer in a real browser: the parts jsdom cannot show.
 *
 * jsdom has no layout and no Web Animations, so only here can the panel be
 * seen to sit on its edge at full height, slide in (and not slide under
 * reduced motion), fit a phone, and stack with Modal in both directions.
 */

const drawer = (page: Page) => page.getByRole("dialog", { name: "Choose a project" });

/** The page is usable before it hydrates; a click that lands early is lost. */
async function openWith(opener: Locator, target: Locator): Promise<void> {
    await expect(async () => {
        if ((await target.count()) === 0) await opener.click();
        await expect(target).toBeVisible({ timeout: 1_000 });
    }).toPass({ timeout: 30_000 });
}

/** The slide is 200ms; geometry is only meaningful once it has finished. */
async function settled(panel: Locator): Promise<void> {
    await expect
        .poll(() => panel.evaluate((el) => el.getAnimations().length))
        .toBe(0);
}

const lockCount = (page: Page) =>
    page.evaluate(() => document.body.dataset.zabiScrollLock ?? null);

test.describe("Drawer — edge, focus and closing", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/components/Drawer", { waitUntil: "domcontentloaded" });
    });

    test("sits on the right edge at full height, with focus on the search field", async ({
        page,
    }) => {
        const opener = page.getByRole("button", { name: "Choose project" });
        const panel = drawer(page);
        await openWith(opener, panel);
        await settled(panel);

        const viewport = page.viewportSize()!;
        const box = (await panel.boundingBox())!;
        expect(Math.round(box.x + box.width)).toBe(viewport.width);
        expect(Math.round(box.y)).toBe(0);
        expect(Math.round(box.height)).toBe(viewport.height);
        expect(Math.round(box.width)).toBe(448);

        await expect(panel).toHaveAccessibleDescription(
            "The page moves to the project you pick.",
        );
        // Portalled: the overlay is a direct child of <body>.
        expect(
            await panel.evaluate((el) => el.parentElement?.parentElement === document.body),
        ).toBe(true);
        await expect(panel.getByLabel("Search projects")).toBeFocused();
        expect(await page.evaluate(() => document.body.style.overflow)).toBe("hidden");

        // Shift+Tab from the first control wraps to the last; focus never leaves.
        await panel.getByRole("button", { name: "Close" }).focus();
        await page.keyboard.press("Shift+Tab");
        await expect(panel.getByRole("button", { name: "Cancel" })).toBeFocused();
        await page.keyboard.press("Tab");
        await expect(panel.getByRole("button", { name: "Close" })).toBeFocused();

        await page.keyboard.press("Escape");
        await expect(panel).toBeHidden();
        await expect(opener).toBeFocused();
        expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
        await expect(page.getByTestId("drawer-demo-selected")).toContainText(
            "Last close: escape",
        );
    });

    test("a backdrop click closes it, a click in the panel does not", async ({ page }) => {
        const opener = page.getByRole("button", { name: "Choose project" });
        const panel = drawer(page);
        await openWith(opener, panel);
        await settled(panel);

        await panel.getByRole("heading", { name: "Choose a project" }).click();
        await expect(panel).toBeVisible();

        await page.mouse.click(20, 300);
        await expect(panel).toBeHidden();
        await expect(page.getByTestId("drawer-demo-selected")).toContainText(
            "Last close: backdrop",
        );
    });

    test("slides in, and does not under prefers-reduced-motion", async ({ page }) => {
        const opener = page.getByRole("button", { name: "Choose project" });
        const panel = drawer(page);
        await openWith(opener, panel);
        // Sampled right after it appears: the slide is still running.
        expect(await panel.evaluate((el) => el.getAnimations().length)).toBe(1);
        await settled(panel);
        await page.keyboard.press("Escape");
        await expect(panel).toBeHidden();

        await page.emulateMedia({ reducedMotion: "reduce" });
        await opener.click();
        await expect(panel).toBeVisible();
        expect(await panel.evaluate((el) => el.getAnimations().length)).toBe(0);
    });

    test("side=start is the left edge, and the right edge in a right-to-left page", async ({
        page,
    }) => {
        const opener = page.getByRole("button", { name: "Filters" });
        const panel = page.getByRole("dialog", { name: "Filters" });
        const viewport = page.viewportSize()!;

        await openWith(opener, panel);
        await settled(panel);
        let box = (await panel.boundingBox())!;
        expect(Math.round(box.x)).toBe(0);
        expect(Math.round(box.width)).toBe(320);
        await page.keyboard.press("Escape");
        await expect(panel).toBeHidden();

        await page.evaluate(() => document.documentElement.setAttribute("dir", "rtl"));
        await opener.click();
        await expect(panel).toBeVisible();
        await settled(panel);
        box = (await panel.boundingBox())!;
        expect(Math.round(box.x + box.width)).toBe(viewport.width);
    });
});

test.describe("Drawer — with Modal", () => {
    test("modal, drawer, modal: Escape closes the topmost and focus unwinds in order", async ({
        page,
    }) => {
        await page.goto("/components/Drawer", { waitUntil: "domcontentloaded" });

        const editOpener = page.getByRole("button", { name: "Edit page" });
        const editModal = page.getByRole("dialog", { name: "Edit page" });
        await openWith(editOpener, editModal);
        expect(await lockCount(page)).toBe("1");

        const moveButton = editModal.getByRole("button", { name: "Move to project" });
        const panel = drawer(page);
        await moveButton.click();
        await expect(panel).toBeVisible();
        await settled(panel);
        expect(await lockCount(page)).toBe("2");
        await expect(panel.getByLabel("Search projects")).toBeFocused();

        // The drawer is on top: the modal's button is covered.
        const covered = await moveButton.evaluate((el) => {
            const rect = el.getBoundingClientRect();
            const top = document.elementFromPoint(
                rect.left + rect.width / 2,
                rect.top + rect.height / 2,
            );
            return !el.contains(top);
        });
        expect(covered).toBe(true);

        // Tab stays in the drawer although the modal underneath traps too.
        for (let i = 0; i < 12; i += 1) {
            await page.keyboard.press("Tab");
            expect(
                await panel.evaluate((el) => el.contains(document.activeElement)),
            ).toBe(true);
        }

        const newProject = panel.getByRole("button", { name: "New project" });
        const newModal = page.getByRole("dialog", { name: "New project" });
        await newProject.click();
        await expect(newModal).toBeVisible();
        expect(await lockCount(page)).toBe("3");
        for (let i = 0; i < 6; i += 1) {
            await page.keyboard.press("Tab");
            expect(
                await newModal.evaluate((el) => el.contains(document.activeElement)),
            ).toBe(true);
        }

        await page.keyboard.press("Escape");
        await expect(newModal).toBeHidden();
        await expect(panel).toBeVisible();
        await expect(newProject).toBeFocused();
        expect(await lockCount(page)).toBe("2");

        await page.keyboard.press("Escape");
        await expect(panel).toBeHidden();
        await expect(editModal).toBeVisible();
        await expect(moveButton).toBeFocused();
        expect(await lockCount(page)).toBe("1");

        await page.keyboard.press("Escape");
        await expect(editModal).toBeHidden();
        await expect(editOpener).toBeFocused();
        expect(await lockCount(page)).toBeNull();
        expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
    });
});

test.describe("Drawer — phone", () => {
    // Device emulation, not a narrow window: headless Chrome crops instead of
    // reflowing below about 500px.
    const { defaultBrowserType: _ignored, ...iPhone } = devices["iPhone 13"];
    test.use(iPhone);

    test("fills the height and never exceeds the screen width", async ({ page }) => {
        await page.goto("/components/Drawer", { waitUntil: "domcontentloaded" });
        const viewport = page.viewportSize()!;
        expect(viewport.width).toBeLessThan(448);

        const opener = page.getByRole("button", { name: "Choose project" });
        const panel = drawer(page);
        await expect(async () => {
            if ((await panel.count()) === 0) await opener.tap();
            await expect(panel).toBeVisible({ timeout: 1_000 });
        }).toPass({ timeout: 30_000 });
        await settled(panel);

        const box = (await panel.boundingBox())!;
        expect(Math.round(box.width)).toBe(viewport.width);
        expect(Math.round(box.x)).toBe(0);
        expect(Math.round(box.height)).toBe(viewport.height);
        // Nothing pushes the page sideways.
        expect(
            await page.evaluate(
                () => document.documentElement.scrollWidth <= window.innerWidth,
            ),
        ).toBe(true);

        // The close button and the footer are both on screen and respond to a tap.
        await expect(panel.getByRole("button", { name: "Cancel" })).toBeInViewport();
        await panel.getByRole("button", { name: "Close" }).tap();
        await expect(panel).toBeHidden();
    });

    test("the narrow drawer leaves part of the page visible to tap", async ({ page }) => {
        await page.goto("/components/Drawer", { waitUntil: "domcontentloaded" });
        const viewport = page.viewportSize()!;
        const opener = page.getByRole("button", { name: "Filters" });
        const panel = page.getByRole("dialog", { name: "Filters" });
        await expect(async () => {
            if ((await panel.count()) === 0) await opener.tap();
            await expect(panel).toBeVisible({ timeout: 1_000 });
        }).toPass({ timeout: 30_000 });
        await settled(panel);

        const box = (await panel.boundingBox())!;
        expect(Math.round(box.width)).toBe(320);
        await page.touchscreen.tap(viewport.width - 10, 300);
        await expect(panel).toBeHidden();
    });
});
