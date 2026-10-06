import { expect, test, type Locator, type Page } from "@playwright/test";

import { gotoHydrated, holdScripts, waitForHydration } from "./helpers/hydration";

/**
 * Select as a form control across hydration, on /chaos-lab/qa-select.
 *
 * The server's HTML carries a real `<select>`; once the page has hydrated a
 * button with a list of its own takes over and the native one stays as the
 * form control. This spec is about the handover.
 *
 * The first three groups are from the QA review of 13cba0e and pin what it
 * measured and found right. The last group is what it found wrong, each test
 * stating what a form needs:
 *
 *   - a value with no matching option (its options still loading, or simply
 *     not among them) was taken for a visitor's choice at hydration and
 *     replaced by whatever the native select happened to show;
 *   - keyboard focus in the native select fell to `<body>` at the handover;
 *   - `aria-label` did not reach the native select;
 *   - with several empty required Selects, focus went to the last one;
 *   - a form reset did nothing.
 */

const LAB = "/chaos-lab/qa-select";

const host = (page: Page, id: string) => page.getByTestId(id);
const trigger = (scope: Locator) => scope.locator('button[aria-haspopup="listbox"]');
const native = (scope: Locator) => scope.locator("select");
const option = (page: Page, label: string) => page.locator('button[role="option"]', { hasText: label }).first();

const ENGLISH = [
    "Select an option",
    "Search options",
    "No results found",
    "Loading options",
    "No options available",
    "Add an option",
    "Select options",
    "Close",
    "Expand",
    "Collapse",
    "Menu",
];

/** Every default English string found in the text or the naming attributes under `selectors`. */
const englishIn = (page: Page, selectors: string[]) =>
    page.evaluate(
        ({ selectors, ENGLISH }) => {
            const found: string[] = [];
            for (const selector of selectors) {
                for (const root of document.querySelectorAll(selector)) {
                    const strings: string[] = [];
                    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
                    for (let node = walker.nextNode(); node; node = walker.nextNode()) strings.push(node.textContent ?? "");
                    for (const element of [root, ...root.querySelectorAll("*")]) {
                        for (const name of ["aria-label", "placeholder", "title"]) {
                            const value = element.getAttribute(name);
                            if (value) strings.push(value);
                        }
                    }
                    for (const text of strings) for (const word of ENGLISH) if (text.includes(word)) found.push(`${selector}: ${text.trim()}`);
                }
            }
            return found;
        },
        { selectors, ENGLISH },
    );

const STRING_HOSTS = ["str-search", "str-empty", "str-loading", "str-native", "str-sheet", "str-nolabel"].map(
    (id) => `[data-testid="${id}"]`,
);

/** Opens the lab with its scripts held: the page is the server's HTML until the returned function is called. */
async function openUnhydrated(page: Page) {
    const release = await holdScripts(page);
    await page.goto(LAB, { waitUntil: "commit" });
    await expect(native(host(page, "pre"))).toBeVisible();
    return async () => {
        await release();
        await waitForHydration(page);
    };
}

/** What the second form's fields would send. */
const sent = (page: Page, form: string) =>
    page.evaluate(
        (id) => Object.fromEntries(new FormData(document.querySelector<HTMLFormElement>(`[data-testid="${id}"]`)!)),
        form,
    );

test.describe("Select without scripts, on a phone", () => {
    test.use({ viewport: { width: 360, height: 800 }, hasTouch: true, isMobile: true, javaScriptEnabled: false });

    test("the native select is named, described, 44px tall, and marks an error", async ({ page }) => {
        await page.goto(LAB, { waitUntil: "domcontentloaded" });
        await expect(page.getByLabel("Preselected", { exact: true })).toHaveValue("b");
        await expect(native(host(page, "pre"))).toHaveAccessibleDescription("Hint for pre");
        await expect(native(host(page, "err"))).toHaveAttribute("aria-invalid", "true");
        await expect(native(host(page, "err"))).toHaveAccessibleDescription(/Fel val/);
        for (const id of ["pre", "req", "dis", "nat", "sm"]) {
            const box = await native(host(page, id)).boundingBox();
            expect(box!.height, id).toBeGreaterThanOrEqual(44);
            expect(box!.width, id).toBe(328);
        }
        await expect(native(host(page, "pre")).locator('option[value="c"]')).toBeDisabled();
        // No English in a Select that was given every string.
        expect(await englishIn(page, STRING_HOSTS)).toEqual([]);
    });

    test("a GET form sends what was chosen, stops on an empty required one, and leaves a disabled one out", async ({
        page,
    }) => {
        await page.goto(LAB, { waitUntil: "domcontentloaded" });
        await page.getByTestId("submit").click();
        await page.waitForTimeout(300);
        expect(page.url()).not.toContain("pre=");
        await native(host(page, "pre")).selectOption("d");
        await native(host(page, "req")).selectOption("a");
        await native(host(page, "req2")).selectOption("b");
        await native(host(page, "nat-req")).selectOption("b");
        await page.getByTestId("submit").click();
        await expect(page).toHaveURL(/[?&]pre=d&req=a&req2=b&err=a&nat=a&natreq=b&/);
        expect(page.url()).not.toMatch(/[?&]dis=/);
        expect(page.url()).not.toMatch(/[?&]natdis=/);
    });

    test("a value with no option of its own is what the native select holds, and what the form sends", async ({ page }) => {
        await page.goto(LAB, { waitUntil: "domcontentloaded" });
        // "zzz" is not among the options; "b" has none yet, they are still loading.
        await expect(native(host(page, "stale"))).toHaveValue("zzz");
        await expect(native(host(page, "async"))).toHaveValue("b");
        const fields = await sent(page, "f2");
        expect(fields.stale).toBe("zzz");
        // The real options are all there to choose from, and the stand-in is not offered among them.
        await expect(native(host(page, "stale")).locator("option:not([hidden])")).toHaveCount(4);
        await expect(native(host(page, "stale")).locator("option[hidden]")).toHaveAttribute("value", "zzz");
    });

    test("aria-label names the native select", async ({ page }) => {
        await page.goto(LAB, { waitUntil: "domcontentloaded" });
        await expect(native(host(page, "aria"))).toHaveAccessibleName("Team");
    });
});

test.describe("Select strings", () => {
    test("with every string given, no English is left: closed, open, searching, empty, loading", async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 900 });
        await gotoHydrated(page, LAB);
        expect(await englishIn(page, STRING_HOSTS)).toEqual([]);
        await trigger(host(page, "str-search")).click();
        await expect(host(page, "str-search").getByRole("listbox", { name: "ZZ-list" })).toBeVisible();
        await host(page, "str-search").locator("input").fill("qqq");
        await expect(host(page, "str-search")).toContainText("ZZ-noresults");
        expect(await englishIn(page, STRING_HOSTS)).toEqual([]);
        await page.keyboard.press("Escape");
        await trigger(host(page, "str-empty")).click();
        await expect(host(page, "str-empty")).toContainText("ZZ-emptytitle");
        await expect(host(page, "str-empty")).toContainText("ZZ-emptydesc");
        expect(await englishIn(page, STRING_HOSTS)).toEqual([]);
    });

    test.describe("in the sheet on a phone", () => {
        test.use({ viewport: { width: 375, height: 800 }, hasTouch: true, isMobile: true });

        test("the sheet's close button and grip take their names from strings", async ({ page }) => {
            await page.emulateMedia({ reducedMotion: "reduce" });
            await gotoHydrated(page, LAB);
            const field = trigger(host(page, "str-sheet"));
            await field.scrollIntoViewIfNeeded();
            await field.tap();
            const dialog = page.getByRole("dialog");
            await expect(dialog).toBeVisible();
            await expect(dialog.getByRole("button", { name: "ZZ-close" })).toBeVisible();
            const grip = dialog.locator("button[data-sheet-grip]");
            await expect(grip).toHaveAttribute("aria-label", "ZZ-expand");
            expect(await englishIn(page, ['[role="dialog"]'])).toEqual([]);
            await grip.click();
            await expect(grip).toHaveAttribute("aria-label", "ZZ-collapse");
            expect(await englishIn(page, ['[role="dialog"]'])).toEqual([]);
        });
    });
});

test.describe("Select once mounted", () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test("a choice made before the scripts arrive is adopted and reported once", async ({ page }) => {
        const hydrate = await openUnhydrated(page);
        await native(host(page, "pre")).selectOption("d");
        await native(host(page, "req")).selectOption("a");
        await native(host(page, "nat")).selectOption("b");
        await hydrate();
        await expect(trigger(host(page, "pre"))).toContainText("Delta");
        await expect(page.getByTestId("state")).toHaveText(/^d\|a\|b\|\|/);
        // One report for each of the three, in the order the fields are in, and none from a field nobody touched.
        const log = (await page.getByTestId("state").innerText()).split("|").pop()!.split(",");
        expect(log).toEqual(["pre=d", "req=a", "nat=b"]);
    });

    test('presentation="native": bound both ways, invalid and described when it has an error', async ({ page }) => {
        await gotoHydrated(page, LAB);
        const select = native(host(page, "nat"));
        await select.selectOption("b");
        await expect(page.getByTestId("state")).toHaveText(/^b\|\|b\|\|.*nat=b$/);
        await page.getByTestId("set").click();
        await expect(select).toHaveValue("d");
        await expect(native(host(page, "nat-err"))).toHaveAttribute("aria-invalid", "true");
        await expect(native(host(page, "nat-err"))).toHaveAccessibleDescription(/Fel val/);
        await expect(native(host(page, "nat"))).toHaveAccessibleDescription("Hint for native");
        await expect(native(host(page, "nat-dis"))).toBeDisabled();
        await expect(host(page, "nat").locator("button")).toHaveCount(0);
    });

    test("the hidden native select is one tab stop less, not in the accessibility tree, and still validates", async ({
        page,
    }) => {
        await gotoHydrated(page, LAB);
        const select = native(host(page, "req"));
        await expect(select).toHaveAttribute("aria-hidden", "true");
        await expect(select).toHaveAttribute("tabindex", "-1");
        expect(await select.evaluate((element) => getComputedStyle(element).visibility)).toBe("hidden");
        expect(await select.evaluate((element) => (element as HTMLSelectElement).validity.valueMissing)).toBe(true);
        await trigger(host(page, "pre")).focus();
        await page.keyboard.press("Tab");
        await expect(trigger(host(page, "req"))).toBeFocused();
        await expect(host(page, "req").getByRole("combobox")).toHaveCount(0);
    });

    test("back navigation restores the choice into the custom control", async ({ page }) => {
        await gotoHydrated(page, LAB);
        await trigger(host(page, "pre")).click();
        await option(page, "Alfa").click();
        await expect(trigger(host(page, "pre"))).toContainText("Alfa");
        await page.getByTestId("away").click();
        await page.waitForURL(/select-states/);
        await page.goBack();
        await waitForHydration(page);
        await expect(trigger(host(page, "pre"))).toContainText("Alfa");
        await expect(native(host(page, "pre"))).toHaveValue("a");
    });
});

test.describe("the handover at hydration", () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test("a value given before its options arrive survives hydration, and is shown by its label when they do", async ({
        page,
    }) => {
        await gotoHydrated(page, LAB);
        // `value="b"`, `options={[]}` and `isLoading` on the server; nobody touched it.
        await expect(page.getByTestId("state2")).toHaveText(/^b\|/);
        expect(await page.getByTestId("state").innerText()).not.toContain("async=");
        await expect(native(host(page, "async"))).toHaveValue("b");
        await page.getByTestId("load").click();
        await expect(trigger(host(page, "async"))).toContainText("Beta");
        await expect(native(host(page, "async"))).toHaveValue("b");
        // The stand-in option is gone once the real one is there.
        await expect(native(host(page, "async")).locator('option[value="b"]')).toHaveCount(1);
        await expect(page.getByTestId("state2")).toHaveText(/^b\|/);
        expect(await page.getByTestId("state").innerText()).not.toContain("async=");
    });

    test("a value that matches no option is not replaced by the first option at hydration, and is what the form sends", async ({
        page,
    }) => {
        await gotoHydrated(page, LAB);
        await expect(page.getByTestId("state2")).toHaveText(/\|zzz$/);
        expect(await page.getByTestId("state").innerText()).not.toContain("stale=");
        await expect(native(host(page, "stale"))).toHaveValue("zzz");
        expect((await sent(page, "f2")).stale).toBe("zzz");
    });

    test("a real choice made before hydration is still adopted over a value that had no option", async ({ page }) => {
        const hydrate = await openUnhydrated(page);
        await native(host(page, "stale")).selectOption("d");
        await hydrate();
        await expect(page.getByTestId("state2")).toHaveText(/\|d$/);
        await expect(trigger(host(page, "stale"))).toContainText("Delta");
        const log = (await page.getByTestId("state").innerText()).split("|").pop()!.split(",");
        expect(log).toEqual(["stale=d"]);
    });

    test("left alone, nothing is reported by any Select on the page", async ({ page }) => {
        await gotoHydrated(page, LAB);
        await expect(page.getByTestId("state")).toHaveText("b||a||");
        await expect(page.getByTestId("state2")).toHaveText("b|zzz");
    });

    test("focus in the native select is still in the control after hydration", async ({ page }) => {
        const hydrate = await openUnhydrated(page);
        await native(host(page, "pre")).focus();
        await hydrate();
        await expect(trigger(host(page, "pre"))).toBeFocused();
        // And the keyboard goes on from there.
        await page.keyboard.press("Tab");
        await expect(trigger(host(page, "req"))).toBeFocused();
    });

    test("focus elsewhere is left where it is", async ({ page }) => {
        const hydrate = await openUnhydrated(page);
        await page.getByTestId("submit").focus();
        await hydrate();
        await expect(page.getByTestId("submit")).toBeFocused();
    });

    test("aria-label names the native select before hydration too, and the trigger after", async ({ page }) => {
        const hydrate = await openUnhydrated(page);
        await expect(native(host(page, "aria"))).toBeVisible();
        await expect(native(host(page, "aria"))).toHaveAccessibleName("Team");
        await hydrate();
        await expect(trigger(host(page, "aria"))).toHaveAccessibleName("Team");
    });
});

test.describe("the handover on a phone", () => {
    test.use({ viewport: { width: 360, height: 800 }, hasTouch: true, isMobile: true });

    test("focus in the native select is still in the control after hydration", async ({ page }) => {
        const hydrate = await openUnhydrated(page);
        await native(host(page, "pre")).focus();
        await hydrate();
        await expect(trigger(host(page, "pre"))).toBeFocused();
    });
});

test.describe("Select in a form, once mounted", () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test("with two empty required Selects, focus goes to the first, and each says what is wrong", async ({ page }) => {
        await gotoHydrated(page, LAB);
        await page.getByTestId("submit2").click();
        await expect(host(page, "two-a").getByRole("alert")).toBeVisible();
        await expect(host(page, "two-b").getByRole("alert")).toBeVisible();
        await expect(trigger(host(page, "two-a"))).toBeFocused();
        // With the first answered, focus goes to the second.
        await trigger(host(page, "two-a")).click();
        await option(page, "Alfa").click();
        await page.getByTestId("submit2").click();
        await expect(trigger(host(page, "two-b"))).toBeFocused();
    });

    test("a form reset puts the first value back, in the control and in what is sent, and reports it once", async ({ page }) => {
        await gotoHydrated(page, LAB);
        await trigger(host(page, "pre")).click();
        await option(page, "Delta").click();
        await expect(native(host(page, "pre"))).toHaveValue("d");
        await native(host(page, "nat")).selectOption("d");
        await trigger(host(page, "req")).click();
        await option(page, "Alfa").click();
        await expect(page.getByTestId("state")).toHaveText(/^d\|a\|d\|\|pre=d,nat=d,req=a$/);

        await page.getByTestId("reset").click();

        await expect(native(host(page, "pre"))).toHaveValue("b");
        await expect(trigger(host(page, "pre"))).toContainText("Beta");
        await expect(native(host(page, "nat"))).toHaveValue("a");
        await expect(native(host(page, "req"))).toHaveValue("");
        // The bound values follow, and each Select that changed says so once.
        await expect(page.getByTestId("state")).toHaveText(/^b\|\|a\|\|/);
        const log = (await page.getByTestId("state").innerText()).split("|").pop()!.split(",").slice(3);
        expect(log.sort()).toEqual(["nat=a", "pre=b", "req=undefined"].sort());
        const fields = await sent(page, "f");
        expect(fields.pre).toBe("b");
        expect(fields.nat).toBe("a");
    });

    test("a reset that changes nothing reports nothing", async ({ page }) => {
        await gotoHydrated(page, LAB);
        await page.getByTestId("reset").click();
        await page.waitForTimeout(200);
        await expect(page.getByTestId("state")).toHaveText("b||a||");
    });
});
