import { expect, test, type Locator, type Page } from "@playwright/test";

/**
 * Collapsible in a real browser: the parts jsdom cannot show.
 *
 * The showcase page is rendered on the server and hydrated, so this is where
 * the ids on the trigger and the panel have to agree after hydration, and
 * where `hidden` really takes closed content out of the tab order.
 */

/** The page is usable before it hydrates; a click that lands early is lost. */
async function setOpen(trigger: Locator, open: boolean): Promise<void> {
    await expect(async () => {
        if ((await trigger.getAttribute("aria-expanded")) !== String(open)) {
            await trigger.click();
        }
        await expect(trigger).toHaveAttribute("aria-expanded", String(open), {
            timeout: 1_000,
        });
    }).toPass({ timeout: 30_000 });
}

async function panelOf(page: Page, trigger: Locator): Promise<Locator> {
    const id = await trigger.getAttribute("aria-controls");
    expect(id).toBeTruthy();
    return page.locator(`[id="${id}"]`);
}

test.describe("Collapsible — hydrated wiring and focus", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/components/Collapsible", { waitUntil: "domcontentloaded" });
    });

    test("trigger and panel point at each other after hydration", async ({ page }) => {
        const trigger = page.getByRole("button", { name: "Delivery notes" });
        await setOpen(trigger, true);

        const panel = await panelOf(page, trigger);
        await expect(panel).toHaveCount(1);
        await expect(panel).toBeVisible();
        await expect(panel).toHaveAttribute(
            "aria-labelledby",
            (await trigger.getAttribute("id")) ?? "",
        );
        await expect(
            page.getByRole("heading", { level: 3, name: "Delivery notes" }),
        ).toBeVisible();

        await trigger.press("Enter");
        await expect(trigger).toHaveAttribute("aria-expanded", "false");
        await expect(panel).toBeHidden();
        await trigger.press("Space");
        await expect(panel).toBeVisible();
    });

    test("closed content is skipped by Tab and keeps its form value", async ({ page }) => {
        const trigger = page.getByRole("button", { name: "Billing details" });
        const field = page.getByLabel("Invoice reference");

        // This example starts open.
        await setOpen(trigger, true);
        await field.fill("PO-7");

        await setOpen(trigger, false);
        await expect(field).toBeHidden();
        await trigger.focus();
        await page.keyboard.press("Tab");
        await expect(field).not.toBeFocused();
        expect(
            await page.evaluate(
                () => !!document.activeElement?.closest("[hidden]"),
            ),
        ).toBe(false);

        await setOpen(trigger, true);
        await expect(field).toHaveValue("PO-7");
        await trigger.focus();
        await page.keyboard.press("Tab");
        await expect(field).toBeFocused();
    });

    test("closing from inside the panel moves focus to the trigger, not to the page", async ({
        page,
    }) => {
        const trigger = page.getByRole("button", { name: "Billing details" });
        await setOpen(trigger, true);

        // A real browser drops focus on <body> when the focused control is hidden.
        const save = page.getByRole("button", { name: "Save and close" });
        // This example is served open, so nothing above waited for hydration:
        // a key pressed before it is lost.
        await expect(async () => {
            if (await save.isVisible()) {
                await save.focus();
                await page.keyboard.press("Enter");
            }
            await expect(trigger).toHaveAttribute("aria-expanded", "false", {
                timeout: 1_000,
            });
        }).toPass({ timeout: 30_000 });

        await expect(save).toBeHidden();
        await expect(trigger).toBeFocused();
    });

    test("the default trigger's text follows the writing direction", async ({ page }) => {
        const trigger = page.getByRole("button", { name: "Delivery notes" });
        await expect(trigger).toHaveCSS("text-align", "start");
    });

    test("a library Button works as the trigger, and unmounted content is gone while closed", async ({
        page,
    }) => {
        const trigger = page.getByRole("button", { name: "Details", exact: true });
        await expect(page.getByText("Row 214:")).toHaveCount(0);
        // The panel element is there even though its content is not.
        await expect(await panelOf(page, trigger)).toHaveCount(1);

        await setOpen(trigger, true);
        await expect(page.getByText("Row 214:")).toBeVisible();
        await setOpen(trigger, false);
        await expect(page.getByText("Row 214:")).toHaveCount(0);
    });
});

test.describe("CollapsibleGroup — accordion", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/components/CollapsibleGroup", {
            waitUntil: "domcontentloaded",
        });
    });

    test("one panel at a time, and the arrow keys move between headers", async ({ page }) => {
        const group = page.locator("[data-collapsible-group]:not([data-multiple])");
        const headers = group.locator("[data-collapsible-trigger]");
        await expect(headers).toHaveCount(3);

        await setOpen(headers.nth(0), true);
        await setOpen(headers.nth(1), true);
        await expect(headers.nth(0)).toHaveAttribute("aria-expanded", "false");
        await expect(group.getByRole("region")).toHaveCount(1);

        await headers.nth(1).focus();
        await page.keyboard.press("ArrowDown");
        await expect(headers.nth(2)).toBeFocused();
        await page.keyboard.press("ArrowDown");
        await expect(headers.nth(0)).toBeFocused();
        await page.keyboard.press("End");
        await expect(headers.nth(2)).toBeFocused();
        await page.keyboard.press("Home");
        await expect(headers.nth(0)).toBeFocused();
        // Moving focus opened nothing.
        await expect(headers.nth(1)).toHaveAttribute("aria-expanded", "true");

        // Tab still walks every header; the open panel has no focusable content.
        await page.keyboard.press("Tab");
        await expect(headers.nth(1)).toBeFocused();
        await page.keyboard.press("Tab");
        await expect(headers.nth(2)).toBeFocused();
    });

    test("with multiple, panels stay open side by side", async ({ page }) => {
        const group = page.locator("[data-collapsible-group][data-multiple]");
        const headers = group.locator("[data-collapsible-trigger]");
        await expect(headers).toHaveCount(3);
        await expect(headers.nth(0)).toHaveAttribute("aria-expanded", "true");
        await expect(headers.nth(1)).toHaveAttribute("aria-expanded", "true");

        await setOpen(headers.nth(2), true);
        await expect(headers.nth(0)).toHaveAttribute("aria-expanded", "true");
        await expect(headers.nth(1)).toHaveAttribute("aria-expanded", "true");
        // Several panels can be open at once here, so none is a landmark.
        await expect(group.getByRole("region")).toHaveCount(0);
    });
});
