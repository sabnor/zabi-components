import { expect, test } from "@playwright/test";
import {
    assertTabStaysInTopDialog,
    gotoChaosLab,
    openChaosModal,
    panelLocator,
    readChaosTooltipDelayMs,
    waitForChaosLabHydrated,
} from "./helpers/chaos-lab";

/**
 * Browser-only “chaos” regression layer (not jsdom).
 *
 * Tiers:
 * - **@smoke** — fastest, highest-value checks; run on every PR (`npm run test:e2e:smoke`).
 *   (Implemented as a `test.describe('@smoke')` group so `playwright test --grep @smoke` works on v1.52.)
 * - **Full suite** — timing / radio / tab-trap; run before release & in publish CI (`npm run test:e2e`).
 */

test.describe("Chaos lab — browser-only interaction risks", () => {
    test.beforeEach(async ({ page }) => {
        await gotoChaosLab(page);
    });

    test.describe("@smoke", () => {
        test("modal: Escape closes and focus restores to the opener", async ({
            page,
        }) => {
            const opener = page.getByTestId("chaos-open-modal");
            const dialog = await openChaosModal(page);
            await page.keyboard.press("Escape");
            await expect(
                dialog,
                "Escape should remove the modal dialog from the DOM",
            ).not.toBeAttached();
            await expect(
                opener,
                "Focus must return to the button that opened the modal (returnFocus)",
            ).toBeFocused();
        });

        test("nested modals: inner then outer close restore focus in LIFO order", async ({
            page,
        }) => {
            await page.getByTestId("chaos-open-outer").click();
            const outerDlg = page.getByTestId("chaos-modal-outer");
            await expect(outerDlg).toBeVisible();
            await page.getByTestId("chaos-open-inner").click();
            const innerDlg = page.getByTestId("chaos-modal-inner");
            await expect(innerDlg).toBeVisible();
            expect(
                await page.locator('[data-testid^="chaos-modal-"]').count(),
                "Both inner and outer modal shells should be mounted",
            ).toBe(2);
            await page.getByTestId("chaos-close-inner").click();
            await expect(innerDlg).not.toBeAttached();
            await expect(outerDlg).toBeVisible();
            await page.getByTestId("chaos-close-outer").click();
            await expect(outerDlg).not.toBeAttached();
            await expect(
                page.getByTestId("chaos-open-outer"),
                "After closing nested modals LIFO, focus should land on the outer opener",
            ).toBeFocused();
        });

        test("navigation menu: aria-controls id is stable across reload and matches panel", async ({
            page,
        }) => {
            const trigger = page.getByRole("button", { name: "Chaos Alpha" });
            const controlsFirst = await trigger.getAttribute("aria-controls");
            expect(
                controlsFirst,
                "Trigger must expose aria-controls for the panel id (SSR + client consistency)",
            ).toBeTruthy();
            expect(controlsFirst).toMatch(/^playwright-chaos-nav-/);
            await page.reload({ waitUntil: "domcontentloaded" });
            await expect(page.getByRole("heading", { name: "Chaos lab" })).toBeVisible();
            await waitForChaosLabHydrated(page);
            const triggerAfter = page.getByRole("button", { name: "Chaos Alpha" });
            const controlsSecond = await triggerAfter.getAttribute("aria-controls");
            expect(
                controlsSecond,
                "aria-controls must not change across reload (deterministic menuInstanceId / panel id)",
            ).toBe(controlsFirst);
            await triggerAfter.click();
            const panel = panelLocator(page, controlsFirst!);
            await expect(
                panel,
                "Clicking the trigger should reveal the panel whose id matches aria-controls",
            ).toBeVisible();
            await expect(panel).toHaveAttribute("role", "menu");
        });
    });

    test("tooltip: delayed show is cancelled when pointer leaves before the delay elapses", async ({
        page,
    }) => {
        const delayMs = await readChaosTooltipDelayMs(page);
        const trigger = page.getByRole("button", {
            name: "Chaos tooltip target",
        });
        await expect(
            trigger,
            "Tooltip trigger must be visible before pointer routing",
        ).toBeVisible();
        await trigger.hover();
        await page.getByRole("heading", { name: "Chaos lab" }).hover();
        const settleMs = delayMs + 200;
        await page.waitForTimeout(settleMs);
        expect(
            await trigger.getAttribute("aria-describedby"),
            `If the delayed tooltip fired after pointer leave, aria-describedby would be set after ~${settleMs}ms`,
        ).toBeNull();
    });

    test("radio group: dynamic option swap with stale value still allows keyboard recovery", async ({
        page,
    }) => {
        await page
            .locator('input[type="radio"][value="y"]')
            .click({ force: true });
        await page.getByTestId("chaos-radio-swap").click();
        const first = page.locator('input[type="radio"][value="p"]');
        await expect(first).toHaveCount(1);
        await expect(
            first,
            "After swap, the roving tabindex entry (stale controlled value) should be value=p",
        ).toHaveAttribute("tabindex", "0");
        await first.focus();
        await page.keyboard.press("ArrowRight");
        await page.keyboard.press("ArrowRight");
        await expect
            .poll(
                async () =>
                    page.evaluate(
                        () =>
                            (document.activeElement as HTMLInputElement | null)
                                ?.value,
                    ),
                {
                    timeout: 10_000,
                    message:
                        "Two ArrowRight presses from p should move roving focus to q (dynamic options)",
                },
            )
            .toBe("q");
    });

    test("navigation menu: pointer-open then keyboard Escape resets expanded state", async ({
        page,
    }) => {
        const trigger = page.getByRole("button", { name: "Chaos Alpha" });
        const controls = await trigger.getAttribute("aria-controls");
        expect(controls).toBeTruthy();
        await trigger.click();
        await expect(trigger).toHaveAttribute("aria-expanded", "true");
        const panel = panelLocator(page, controls!);
        await expect(panel).toBeVisible();
        await page.getByRole("link", { name: "Chaos panel link" }).focus();
        await page.keyboard.press("Escape");
        await expect(trigger).toHaveAttribute("aria-expanded", "false");
        await expect(panel).not.toBeAttached();
        const after = await trigger.getAttribute("aria-controls");
        expect(
            after,
            "aria-controls should stay stable after close (no pointer/keyboard id desync)",
        ).toBe(controls);
    });

    test("modal: repeated Tab keeps focus inside the dialog subtree", async ({
        page,
    }) => {
        await openChaosModal(page);
        const dialog = page.getByTestId("chaos-modal-root");
        await assertTabStaysInTopDialog(page, 12);
        await expect(
            dialog,
            "The chaos modal shell should remain mounted while tab-cycling",
        ).toBeVisible();
    });
});
