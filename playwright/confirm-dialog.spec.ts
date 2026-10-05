import { expect, test, type Locator, type Page } from "@playwright/test";

/**
 * ConfirmDialog in a real browser: the parts jsdom cannot show.
 *
 * A real browser drops focus when the focused button is disabled, only a real
 * browser hit-tests the backdrop, and the showcase page is server rendered and
 * hydrated, which is how a consumer's page reaches the dialog too.
 */

const dialog = (page: Page) => page.getByRole("alertdialog");

/** The page is usable before it hydrates; a click that lands early is lost. */
async function openDialog(page: Page, opener: Locator): Promise<Locator> {
    await expect(async () => {
        if ((await dialog(page).count()) === 0) await opener.click();
        await expect(dialog(page)).toBeVisible({ timeout: 1_000 });
    }).toPass({ timeout: 30_000 });
    return dialog(page);
}

test.describe("ConfirmDialog — focus, loading and the backdrop", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/components/ConfirmDialog", {
            waitUntil: "domcontentloaded",
        });
    });

    test("opens in body with focus on Cancel, and Escape returns focus to the opener", async ({
        page,
    }) => {
        const opener = page.getByRole("button", { name: "Delete project" });
        const panel = await openDialog(page, opener);

        await expect(panel).toHaveAccessibleName("Delete this project?");
        await expect(panel).toHaveAccessibleDescription(
            "The project and its files are removed for everyone. This cannot be undone.",
        );
        // Portalled: the overlay is a direct child of <body>.
        expect(
            await panel.evaluate((el) => el.parentElement?.parentElement === document.body),
        ).toBe(true);

        const cancel = panel.getByRole("button", { name: "Cancel" });
        await expect(cancel).toBeFocused();

        // Tab cycles between the two buttons and never reaches the page.
        await page.keyboard.press("Tab");
        await expect(panel.getByRole("button", { name: "Delete" })).toBeFocused();
        await page.keyboard.press("Tab");
        await expect(cancel).toBeFocused();

        await page.keyboard.press("Escape");
        await expect(panel).toBeHidden();
        await expect(opener).toBeFocused();
        await expect(page.getByTestId("confirm-demo-outcome")).toHaveText(
            "Cancelled (escape).",
        );
    });

    test("Enter on the focused Cancel cancels; it never confirms", async ({ page }) => {
        const opener = page.getByRole("button", { name: "Delete project" });
        const panel = await openDialog(page, opener);
        await expect(panel.getByRole("button", { name: "Cancel" })).toBeFocused();

        await page.keyboard.press("Enter");
        await expect(panel).toBeHidden();
        await expect(page.getByTestId("confirm-demo-outcome")).toHaveText(
            "Cancelled (cancel-button).",
        );
    });

    test("an async confirm blocks every way out, keeps focus in the dialog, then closes", async ({
        page,
    }) => {
        const opener = page.getByRole("button", { name: "Delete project" });
        const panel = await openDialog(page, opener);
        const confirm = panel.getByRole("button", { name: "Delete" });
        const cancel = panel.getByRole("button", { name: "Cancel" });

        // The dialog puts focus on Cancel a task after it opens; moved to
        // Delete before that, it would be taken back and Enter would cancel.
        await expect(cancel).toBeFocused();
        await confirm.focus();
        await page.keyboard.press("Enter");

        await expect(confirm).toBeDisabled();
        await expect(confirm).toHaveAttribute("aria-busy", "true");
        await expect(cancel).toBeDisabled();
        // Announced through a polite status region, not `aria-busy` on the panel.
        await expect(panel.getByRole("status")).toHaveText("Working…");
        await expect(panel).not.toHaveAttribute("aria-busy", /.*/);
        // The panel holds the focus, reached by keyboard, and draws no ring
        // around the whole dialog.
        await expect(panel).toBeFocused();
        await expect(panel).toHaveCSS("outline-style", "none");
        // The focused button was just disabled; focus must not be on <body>.
        expect(
            await page.evaluate(
                () => !!document.activeElement?.closest('[role="alertdialog"]'),
            ),
        ).toBe(true);

        await page.keyboard.press("Escape");
        await page.mouse.click(5, 5);
        await page.keyboard.press("Tab");
        await expect(panel).toBeVisible();
        expect(
            await page.evaluate(
                () => !!document.activeElement?.closest('[role="alertdialog"]'),
            ),
        ).toBe(true);

        await expect(panel).toBeHidden({ timeout: 10_000 });
        await expect(page.getByTestId("confirm-demo-outcome")).toHaveText(
            "Project deleted.",
        );
        await expect(opener).toBeFocused();
    });

    test("a backdrop click cancels, a click inside the panel does not", async ({ page }) => {
        const opener = page.getByRole("button", { name: "Delete project" });
        const panel = await openDialog(page, opener);

        await panel.getByRole("heading", { name: "Delete this project?" }).click();
        await expect(panel).toBeVisible();

        await page.mouse.click(5, 5);
        await expect(panel).toBeHidden();
        await expect(page.getByTestId("confirm-demo-outcome")).toHaveText(
            "Cancelled (backdrop).",
        );
    });

    test("a rejected confirm stays open, shows the error and gives focus back", async ({
        page,
    }) => {
        const opener = page.getByRole("button", { name: "Transfer ownership" });
        const panel = await openDialog(page, opener);
        const confirm = panel.getByRole("button", { name: "Transfer" });

        await confirm.click();
        await expect(confirm).toBeDisabled();

        await expect(
            panel.getByText("The new owner has not accepted the invitation yet."),
        ).toBeVisible({ timeout: 10_000 });
        await expect(panel).toBeVisible();
        await expect(confirm).toBeEnabled();
        await expect(confirm).toBeFocused();

        // The dialog is dismissible again.
        await page.keyboard.press("Escape");
        await expect(panel).toBeHidden();
        await expect(opener).toBeFocused();
    });
});
