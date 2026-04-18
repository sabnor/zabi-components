import { expect, type Locator, type Page } from "@playwright/test";

export const CHAOS_LAB_PATH = "/chaos-lab";

/**
 * After `reload()`, the SSR shell returns before the client bundle rehydrates.
 */
export async function waitForChaosLabHydrated(page: Page): Promise<void> {
    await expect(
        page.getByTestId("chaos-hydrated"),
        "Chaos lab must hydrate before interaction — otherwise Svelte click handlers never run",
    ).toBeAttached({ timeout: 30_000 });
}

export async function gotoChaosLab(page: Page): Promise<void> {
    await page.goto(CHAOS_LAB_PATH, { waitUntil: "domcontentloaded" });
    await expect(
        page.getByRole("heading", { name: "Chaos lab" }),
        "Chaos lab route should render its main heading",
    ).toBeVisible();
    await waitForChaosLabHydrated(page);
}

export async function readChaosTooltipDelayMs(page: Page): Promise<number> {
    const raw = await page
        .locator("[data-chaos-tooltip-delay]")
        .first()
        .getAttribute("data-chaos-tooltip-delay");
    const n = Number(raw);
    if (!Number.isFinite(n) || n <= 0) {
        throw new Error(
            `Expected positive data-chaos-tooltip-delay on chaos lab; got ${JSON.stringify(raw)}`,
        );
    }
    return n;
}

/** Opens the primary chaos modal and waits until focus is inside the dialog subtree. */
export async function openChaosModal(page: Page): Promise<Locator> {
    const opener = page.getByTestId("chaos-open-modal");
    await opener.click();
    const dialog = page.getByTestId("chaos-modal-root");
    await expect(
        dialog,
        "Modal root (data-testid chaos-modal-root) should be visible after open",
    ).toBeVisible();
    await waitForFocusInside(
        page,
        dialog,
        "After opening the modal, focus should move into the dialog (initial focus / saveFocus)",
    );
    return dialog;
}

export async function waitForFocusInside(
    page: Page,
    container: Locator,
    message: string,
): Promise<void> {
    await expect
        .poll(
            async () =>
                container.evaluate((el: HTMLElement) => {
                    const active = document.activeElement;
                    return active !== null && el.contains(active);
                }),
            {
                timeout: 15_000,
                intervals: [50, 100, 200, 400],
                message,
            },
        )
        .toBe(true);
}

/** Asserts Tab cycles keep focus within the topmost `[role=dialog][aria-modal=true]`. */
export async function assertTabStaysInTopDialog(
    page: Page,
    tabPresses: number,
): Promise<void> {
    for (let i = 0; i < tabPresses; i++) {
        await page.keyboard.press("Tab");
        const inside = await page.evaluate(() => {
            const active = document.activeElement;
            const shells = document.querySelectorAll<HTMLElement>(
                '[role="dialog"][aria-modal="true"]',
            );
            const top = shells[shells.length - 1];
            return !!(active && top && top.contains(active));
        });
        expect(
            inside,
            `Focus escaped the top dialog after Tab (iteration ${i + 1}/${tabPresses})`,
        ).toBe(true);
    }
}

export function panelLocator(page: Page, panelId: string): Locator {
    return page.locator(`#${panelId}`);
}
