import type { Locator, Page, Route } from "@playwright/test";

/**
 * Waiting for the page to be interactive.
 *
 * Every page of the docs site is served as markup and hydrated afterwards. In
 * between it looks ready and is not: a click does nothing, a typed value is
 * not bound, a key is lost. The tests used to cope by trying an action and
 * checking for its effect within a second, over and over until it took:
 *
 *     await expect(async () => {
 *         await opener.click();
 *         await expect(panel).toBeVisible({ timeout: 1_000 });
 *     }).toPass({ timeout: 30_000 });
 *
 * That measures the machine, not the product. On a loaded runner the panel
 * takes longer than a second to appear after a click that DID land, the loop
 * clicks again (closing what it had opened, or hitting what now covers the
 * button), and the test fails with "Timeout 1000ms exceeded" although nothing
 * is wrong. Most of the suite's failures under load were this.
 *
 * The root layout (src/routes/+layout.svelte) sets `data-zabi-hydrated` on
 * `<html>` from an effect, which runs once the whole tree has hydrated. So a
 * test waits for that, once, and then does what a user does: one action, and
 * an expectation with the suite's ordinary timeout.
 *
 * The deadline is the one the retry loops and the labs' own markers had. How
 * long a page takes to hydrate here is mostly how long the dev server takes
 * to compile it the first time, which says nothing about the library.
 */
const HYDRATED = () => document.documentElement.dataset.zabiHydrated === "true";
const HYDRATION_TIMEOUT = 30_000;

/** Resolves once the page's handlers are attached. Cheap to call again on a page that already is. */
export async function waitForHydration(target: Page | Locator): Promise<void> {
    const page = "page" in target && typeof target.page === "function" ? target.page() : (target as Page);
    await page.waitForFunction(HYDRATED, undefined, { timeout: HYDRATION_TIMEOUT });
}

/** `page.goto`, then wait until the page can be used. */
export async function gotoHydrated(page: Page, url: string): Promise<void> {
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await waitForHydration(page);
}

/**
 * Holds every script of the page until the returned `release()` is called, so
 * a test can use the server-rendered markup as a visitor on a slow connection
 * does: before any handler is attached. Call it before `page.goto`, and go
 * with `waitUntil: "commit"`: no load event comes while the scripts are held.
 */
export async function holdScripts(page: Page): Promise<() => Promise<void>> {
    const held: Route[] = [];
    let open = false;
    await page.route(
        (url) => /\.(?:js|ts|svelte)(?:\?|$)/.test(url.pathname + url.search) || url.pathname.includes("/@"),
        async (route) => {
            if (open) await route.continue();
            else held.push(route);
        },
    );
    return async () => {
        open = true;
        await Promise.all(held.splice(0).map((route) => route.continue()));
    };
}
