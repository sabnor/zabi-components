import { expect, test, type Page, type Route } from "@playwright/test";

/**
 * Focus survives hydration.
 *
 * A server-rendered page can be used before its scripts arrive: a keyboard
 * user may already have tabbed to a button. Svelte hydrates most markup in
 * place, but a `<svelte:element>` is taken out and put back, and a focused
 * control inside it is blurred on the way: focus falls to `<body>` and the
 * next Tab starts from the top of the page.
 *
 * EmptyState, Container, AppShell's content and Collapsible's heading wrapper
 * had such an element around the caller's controls. Each is now an explicit
 * branch per tag. The lab page (/chaos-lab/hydration-focus) has a control in
 * each; here the scripts are held back, the control is focused, the scripts
 * are released, and focus must still be on it.
 */

const LAB = "/chaos-lab/hydration-focus";

/** Holds every script of the page until `release()` is called. */
async function holdScripts(page: Page) {
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

const controls: { name: string; locate: (page: Page) => ReturnType<Page["locator"]> }[] = [
    { name: "EmptyState (a section)", locate: (page) => page.getByTestId("in-empty-state") },
    { name: "EmptyState, compact (a div)", locate: (page) => page.getByTestId("in-empty-state-compact") },
    { name: "Container", locate: (page) => page.getByTestId("in-container") },
    { name: "Collapsible's heading", locate: (page) => page.getByRole("button", { name: "Delivery notes" }) },
    { name: "AppShell's content", locate: (page) => page.getByTestId("in-app-shell") },
    { name: "Text (a p): a link", locate: (page) => page.getByTestId("in-text") },
    { name: "Text (a div): a field", locate: (page) => page.getByTestId("in-text-div") },
    { name: "Text (a span): a link", locate: (page) => page.getByTestId("in-text-span") },
    { name: "Heading: a link", locate: (page) => page.getByTestId("in-heading") },
    { name: "CardHeader: a link", locate: (page) => page.getByTestId("in-card-header") },
    { name: "AppBar: an action", locate: (page) => page.getByTestId("in-app-bar") },
];

test("Text: what is typed across the moment of hydration is all kept", async ({ page }) => {
    const typed = "abcdefghijklmnopqrstuvwxyz0123456789";
    const release = await holdScripts(page);
    await page.goto(LAB, { waitUntil: "commit" });
    const field = page.getByTestId("in-text-div");
    await expect(field).toBeVisible();
    await field.focus();
    await page.keyboard.type(typed.slice(0, 12));
    // Released in the middle of the word, and typing goes on while the page wakes up.
    const released = release();
    for (const key of typed.slice(12)) {
        await page.keyboard.type(key);
        await page.waitForTimeout(40);
    }
    await released;
    await expect(page.getByTestId("lab-hydrated")).toBeAttached({ timeout: 30_000 });
    await expect(field).toHaveValue(typed);
    await expect(field).toBeFocused();
});

for (const control of controls) {
    test(`${control.name}: a control focused before hydration keeps focus through it`, async ({ page }) => {
        const release = await holdScripts(page);
        await page.goto(LAB, { waitUntil: "commit" });
        const target = control.locate(page);
        await expect(target).toBeVisible();
        // Server-rendered and not yet hydrated.
        await expect(page.getByTestId("lab-hydrated")).toHaveCount(0);

        await target.focus();
        await expect(target).toBeFocused();
        // The same node must still be there afterwards, not a copy of it.
        await target.evaluate((element) => {
            (element as HTMLElement & { __before?: boolean }).__before = true;
        });

        await release();
        await expect(page.getByTestId("lab-hydrated")).toBeAttached({ timeout: 30_000 });

        await expect(target).toBeFocused();
        expect(
            await target.evaluate((element) => (element as HTMLElement & { __before?: boolean }).__before === true),
        ).toBe(true);
        expect(await page.evaluate(() => document.activeElement === document.body)).toBe(false);
    });
}

test("the markup is what it was: the same elements, in the same order", async ({ page }) => {
    await page.goto(LAB, { waitUntil: "domcontentloaded" });
    await expect(page.getByTestId("lab-hydrated")).toBeAttached({ timeout: 30_000 });
    const tags = await page.evaluate(() => {
        const tagOf = (selector: string, up = 0) => {
            let element: Element | null = document.querySelector(selector);
            for (let i = 0; i < up && element; i += 1) element = element.parentElement;
            return element?.tagName.toLowerCase() ?? null;
        };
        return {
            emptyState: document.querySelector('[data-testid="in-empty-state"]')?.closest("section")?.getAttribute("aria-labelledby") ? "section" : null,
            emptyStateCompact: document.querySelector('[data-testid="in-empty-state-compact"]')?.closest("section") ? "section" : "div",
            container: tagOf('[data-testid="in-container"]', 1),
            collapsibleHeading: document.querySelector("h3 > button[aria-expanded]") ? "h3" : null,
            appShellContent: tagOf("[data-app-shell-content]"),
            text: tagOf('[data-testid="in-text"]', 1),
            textDiv: tagOf('[data-testid="in-text-div"]', 2),
            textSpan: tagOf('[data-testid="in-text-span"]', 1),
            heading: tagOf('[data-testid="in-heading"]', 1),
            cardHeaderTitle: document.querySelector('[data-testid="in-card-header"]')?.previousElementSibling?.tagName.toLowerCase() ?? null,
            appBarTitle: document.querySelector('[data-testid="in-app-bar"]')?.closest("header")?.querySelector("h2")?.textContent?.trim() ?? null,
        };
    });
    expect(tags).toEqual({
        emptyState: "section",
        emptyStateCompact: "div",
        container: "section",
        collapsibleHeading: "h3",
        appShellContent: "div",
        text: "p",
        textDiv: "div",
        textSpan: "span",
        heading: "h2",
        cardHeaderTitle: "h2",
        appBarTitle: "New visit",
    });
});
