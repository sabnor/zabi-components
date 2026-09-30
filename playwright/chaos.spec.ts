import { expect, test } from "@playwright/test";
import {
    assertTabStaysInTopDialog,
    gotoChaosLab,
    openChaosModal,
    panelLocator,
    readChaosTooltipDelayMs,
    waitForChaosLabHydrated,
    waitForFocusInside,
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
            await expect(panel).not.toHaveAttribute("role", "menu");
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

    test("portalled modal: escapes a transformed, clipped ancestor, traps focus and restores it", async ({
        page,
    }) => {
        const trap = page.getByTestId("chaos-portal-trap");
        const trapBox = (await trap.boundingBox())!;
        const viewport = page.viewportSize()!;

        // Control: the ancestor really does trap an in-place modal, otherwise
        // the portalled assertions below would pass without a portal.
        await page.getByTestId("chaos-open-trapped").click();
        const trapped = page.getByTestId("chaos-modal-trapped");
        await expect(trapped).toBeAttached();
        const trappedBackdrop = (await trapped.locator("..").boundingBox())!;
        expect(
            trappedBackdrop.width,
            "An in-place backdrop is sized by the transformed ancestor, not the viewport",
        ).toBeLessThanOrEqual(trapBox.width);
        expect(trappedBackdrop.height).toBeLessThanOrEqual(trapBox.height);
        await waitForFocusInside(
            page,
            trapped,
            "Escape is handled by the modal, so focus has to be inside it first",
        );
        await page.keyboard.press("Escape");
        await expect(trapped).not.toBeAttached();

        const opener = page.getByTestId("chaos-open-portal");
        await opener.click();
        const dialog = page.getByTestId("chaos-modal-portal");
        await expect(dialog).toBeVisible();

        const placement = await dialog.evaluate((panel: HTMLElement) => {
            const overlay = panel.parentElement!;
            const rect = overlay.getBoundingClientRect();
            const box = panel.getBoundingClientRect();
            const hit = document.elementFromPoint(
                box.left + box.width / 2,
                box.top + 8,
            );
            return {
                parentIsBody: overlay.parentElement === document.body,
                insideTrap: !!panel.closest('[data-testid="chaos-portal-trap"]'),
                overlay: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
                panelHeight: box.height,
                hitInsidePanel: !!hit && panel.contains(hit),
            };
        });
        expect(placement.parentIsBody, "The overlay should be a child of <body>").toBe(true);
        expect(placement.insideTrap).toBe(false);
        expect(
            placement.overlay,
            "The portalled backdrop should cover the viewport, not the ancestor's box",
        ).toEqual({ x: 0, y: 0, width: viewport.width, height: viewport.height });
        expect(
            placement.panelHeight,
            "The panel must not be clipped to the 96px ancestor",
        ).toBeGreaterThan(trapBox.height);
        expect(
            placement.hitInsidePanel,
            "The panel should be the topmost element where it is drawn",
        ).toBe(true);

        await waitForFocusInside(
            page,
            dialog,
            "After opening the portalled modal, focus should move into it",
        );
        await assertTabStaysInTopDialog(page, 8);

        // Tab may have left focus on the button with a tooltip, whose first
        // Escape only hides the tooltip; close from a control without one.
        await dialog.getByRole("button", { name: "Close" }).focus();
        await expect(
            dialog.getByRole("tooltip", { includeHidden: true }),
        ).toHaveAttribute("data-visible", "false");
        await page.keyboard.press("Escape");
        await expect(dialog).not.toBeAttached();
        await expect(page.getByTestId("chaos-portal-last-close")).toHaveText("escape");
        await expect(
            opener,
            "Focus must return to the opener inside the clipped ancestor",
        ).toBeFocused();
        expect(
            await page.locator("body > [role='presentation']").count(),
            "Nothing should be left behind in <body>",
        ).toBe(0);
    });

    test("modal opened from a portalled modal: it is on top, and Escape closes them in order", async ({
        page,
    }) => {
        await page.getByTestId("chaos-open-portal").click();
        const portalled = page.getByTestId("chaos-modal-portal");
        await expect(portalled).toBeVisible();
        await page.getByTestId("chaos-open-page-modal").click();
        const later = page.getByTestId("chaos-modal-page");
        await expect(later).toBeAttached();
        await waitForFocusInside(
            page,
            later,
            "Focus should move into the modal that was opened last",
        );

        const onTop = await later.evaluate((panel: HTMLElement) => {
            const box = panel.getBoundingClientRect();
            const hit = document.elementFromPoint(
                box.left + box.width / 2,
                box.top + box.height / 2,
            );
            return !!hit && panel.contains(hit);
        });
        expect(
            onTop,
            "The modal opened last must be drawn above the portalled one, not behind it",
        ).toBe(true);

        await page.keyboard.press("Escape");
        await expect(later).not.toBeAttached();
        await expect(portalled).toBeVisible();
        await page.keyboard.press("Escape");
        await expect(portalled).not.toBeAttached();
    });

    test("modal: Escape with a tooltip showing hides the tooltip and keeps the modal", async ({
        page,
    }) => {
        await page.getByTestId("chaos-open-portal").click();
        const dialog = page.getByTestId("chaos-modal-portal");
        await expect(dialog).toBeVisible();
        const action = page.getByTestId("chaos-portal-action");
        await action.focus();
        const tooltip = dialog.getByRole("tooltip", { includeHidden: true });
        await expect(tooltip).toHaveAttribute("data-visible", "true");

        await page.keyboard.press("Escape");
        await expect(tooltip).toHaveAttribute("data-visible", "false");
        await expect(
            dialog,
            "The first Escape belongs to the tooltip (WCAG 1.4.13)",
        ).toBeVisible();
        await expect(action).toBeFocused();

        await page.keyboard.press("Escape");
        await expect(dialog).not.toBeAttached();
    });

    test("modal with nothing focusable: focus moves to the dialog itself", async ({
        page,
    }) => {
        const opener = page.getByTestId("chaos-open-text-only");
        await opener.click();
        const dialog = page.getByTestId("chaos-modal-text-only");
        await expect(dialog).toBeVisible();
        await expect(
            dialog,
            "With no focusable content the panel takes focus, so a screen reader is moved into the dialog",
        ).toBeFocused();
        await page.keyboard.press("Escape");
        await expect(dialog).not.toBeAttached();
        await expect(opener).toBeFocused();
    });

    test("modal: no slide-up animation under prefers-reduced-motion", async ({
        page,
    }) => {
        // Below the md breakpoint, where the panel slides up from the bottom.
        await page.setViewportSize({ width: 600, height: 800 });
        await page.getByTestId("chaos-open-modal").click();
        const dialog = page.getByTestId("chaos-modal-root");
        await expect(dialog).toBeVisible();
        expect(
            await dialog.evaluate((el) => getComputedStyle(el).animationName),
            "Control: the panel animates when motion is allowed",
        ).toBe("slideUp");
        await page.keyboard.press("Escape");
        await expect(dialog).not.toBeAttached();

        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.getByTestId("chaos-open-modal").click();
        await expect(dialog).toBeVisible();
        expect(
            await dialog.evaluate((el) => getComputedStyle(el).animationName),
        ).toBe("none");
    });

    test("modal opened while a portalled drawer is open: it is on top, and Escape closes them in order", async ({
        page,
    }) => {
        await page.getByTestId("chaos-open-drawer").click();
        const drawer = page.getByTestId("chaos-drawer");
        await expect(drawer).toBeVisible();
        await page.getByTestId("chaos-drawer-open-page-modal").click();
        const later = page.getByTestId("chaos-modal-page");
        await expect(later).toBeAttached();
        await waitForFocusInside(page, later, "Focus should move into the modal opened last");

        expect(
            await later.evaluate((panel: HTMLElement) => {
                const box = panel.getBoundingClientRect();
                const hit = document.elementFromPoint(
                    box.left + box.width / 2,
                    box.top + box.height / 2,
                );
                return !!hit && panel.contains(hit);
            }),
            "The modal opened last must be drawn above the portalled drawer",
        ).toBe(true);

        await page.keyboard.press("Escape");
        await expect(later).not.toBeAttached();
        await expect(drawer).toBeVisible();
        await page.keyboard.press("Escape");
        await expect(drawer).not.toBeAttached();
        await expect(page.getByTestId("chaos-open-drawer")).toBeFocused();
    });

    test("drawer opened while a portalled modal is open: it is on top, and Escape closes them in order", async ({
        page,
    }) => {
        await page.getByTestId("chaos-open-portal").click();
        const modal = page.getByTestId("chaos-modal-portal");
        await expect(modal).toBeVisible();
        await page.getByTestId("chaos-open-page-drawer").click();
        const later = page.getByTestId("chaos-drawer-page");
        await expect(later).toBeAttached();
        await waitForFocusInside(page, later, "Focus should move into the drawer opened last");
        await expect
            .poll(() => later.evaluate((el) => el.getAnimations().length))
            .toBe(0);

        expect(
            await later.evaluate((panel: HTMLElement) => {
                const box = panel.getBoundingClientRect();
                const hit = document.elementFromPoint(
                    box.left + box.width / 2,
                    box.top + box.height / 2,
                );
                return !!hit && panel.contains(hit);
            }),
            "The drawer opened last must be drawn above the portalled modal",
        ).toBe(true);

        await page.keyboard.press("Escape");
        await expect(later).not.toBeAttached();
        await expect(modal).toBeVisible();
    });
});
