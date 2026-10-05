import { expect, test, type Locator, type Page } from "@playwright/test";

/**
 * A toast in an app that is not in English: what it shows, how much room its
 * text gets, and whose words are on the screen. The fixture is /phone-lab,
 * which pushes the consumer's own two-sentence Swedish error the obvious way,
 * with a message and a type and nothing else.
 */

const PHONE = { width: 375, height: 812 };
const TEXT = "Det gick inte att spara. Kolla uppkopplingen och försök igen.";

async function gotoLab(page: Page) {
    await page.goto("/phone-lab", { waitUntil: "domcontentloaded" });
    await expect(page.getByTestId("phone-lab-hydrated")).toBeAttached({ timeout: 30_000 });
}

async function box(locator: Locator) {
    const rect = await locator.boundingBox();
    expect(rect, "The element must be laid out").not.toBeNull();
    return rect!;
}

const press = (page: Page, testId: string) =>
    page.getByTestId(testId).evaluate((el) => (el as HTMLElement).click());

const stack = (page: Page) => page.locator("[data-zabi-toaster]");
const toasts = (page: Page) => stack(page).locator("[data-toast-id]");

/** Everything a sighted user can read in the stack: text that is laid out and not clipped to nothing. */
const visibleText = (page: Page) =>
    stack(page).evaluate((region) => {
        const out: string[] = [];
        const walker = document.createTreeWalker(region, NodeFilter.SHOW_TEXT);
        for (let node = walker.nextNode(); node; node = walker.nextNode()) {
            const text = node.textContent?.trim();
            const parent = node.parentElement;
            if (!text || !parent) continue;
            if (parent.closest(".sr-only, [aria-hidden='true']")) continue;
            const rect = parent.getBoundingClientRect();
            if (rect.width > 1 && rect.height > 1) out.push(text);
        }
        return out.join(" ");
    });

test.describe("A toast pushed with a message, on a phone", () => {
    test.use({ viewport: PHONE, hasTouch: true, isMobile: true });

    test("shows the message, and no English over or under it", async ({ page }) => {
        await gotoLab(page);
        await press(page, "toast-sv-push");
        const toast = toasts(page).first();
        await expect(toast).toBeVisible();
        await expect(toast.getByText(TEXT)).toBeVisible();
        await expect(toast).toHaveAttribute("aria-label", TEXT);
        await expect(toast.getByRole("alert")).toHaveText(TEXT);
        // The message is all there is to read, and Dismiss is the only control.
        expect(await visibleText(page)).toBe(TEXT);
        await expect(toast.getByRole("button")).toHaveCount(1);

        // A toast with a timer: the bar, and still nothing to read but the message.
        await press(page, "toast-timed-push");
        const timed = toasts(page).last();
        await expect(timed.getByText("Utkastet är sparat.")).toBeVisible();
        await expect(timed.locator("[data-toast-countdown]")).toBeAttached();
        expect(await visibleText(page)).toBe(`${TEXT} Utkastet är sparat.`);
        await expect(timed.getByRole("button")).toHaveCount(1);
    });

    test("with the app's strings, every accessible name is the app's", async ({ page }) => {
        await gotoLab(page);
        await press(page, "toast-sv-toggle");
        await press(page, "toast-timed-push");
        const toast = toasts(page).first();
        await expect(toast).toBeVisible();
        await expect(page.getByRole("region", { name: "Aviseringar" })).toBeVisible();
        await expect(toast.getByRole("button", { name: "Stäng aviseringen" })).toBeVisible();
        await expect(toast.locator("[data-toast-countdown]")).toHaveText(/^Stängs om \d+ sekunder\.$/);
        const said = await stack(page).evaluate((region) =>
            [region.getAttribute("aria-label"), region.textContent, ...[...region.querySelectorAll("[aria-label]")].map((el) => el.getAttribute("aria-label"))].join(" | "),
        );
        for (const word of ["Notifications", "Dismiss", "close in", "seconds", "Changes saved", "Click to stop"]) {
            expect(said, word).not.toContain(word);
        }
    });

    test("the timer is held while the toast has focus, and the app is told", async ({ page }) => {
        await gotoLab(page);
        await press(page, "toast-timed-push");
        const toast = toasts(page).first();
        await expect(toast).toHaveAttribute("data-paused", "false");
        await toast.getByRole("button").focus();
        await expect(toast).toHaveAttribute("data-paused", "true");
        await expect(page.getByTestId("toast-pauses")).toHaveText("Pauses: paused");
        await page.getByTestId("toast-push").focus();
        await expect(toast).toHaveAttribute("data-paused", "false");
        await expect(page.getByTestId("toast-pauses")).toHaveText("Pauses: paused,running");
    });
});

test("375px with the text at 200%: the text has the width of the toast, and the button a line of its own", async ({
    browser,
}) => {
    // Not `isMobile`: that zooms a page out when its text outgrows it. A coarse pointer all the same.
    const context = await browser.newContext({ viewport: PHONE, hasTouch: true });
    const page = await context.newPage();
    await gotoLab(page);
    await page.evaluate(() => (document.documentElement.style.fontSize = "200%"));
    await press(page, "toast-sv-push");
    const toast = toasts(page).first();
    await expect(toast).toBeVisible();
    await expect(toast).toHaveCSS("opacity", "1");
    await expect.poll(() => toast.evaluate((el) => el.getAnimations().length)).toBe(0);

    const text = toast.getByText(TEXT);
    const column = await box(text);
    const dismiss = await box(toast.getByRole("button"));
    const card = await box(toast);

    // It was about 95px beside an 88px button, eleven lines, words broken in two.
    // The toast less its own 16px padding, the icon and the gap beside it.
    expect(column.width, "The text column").toBeGreaterThanOrEqual(200);
    expect(dismiss.y, "The button is under the text, not beside it").toBeGreaterThanOrEqual(
        column.y + column.height - 1,
    );
    expect(card.height, "It was 594px tall").toBeLessThanOrEqual(420);
    // No word is broken: every line of the text ends where a word ends.
    const broken = await text.evaluate((el) => {
        const node = el.firstChild as Text;
        const range = document.createRange();
        const words = node.data.trim().split(/\s+/);
        let from = node.data.indexOf(words[0]);
        const split: string[] = [];
        for (const word of words) {
            const at = node.data.indexOf(word, from);
            range.setStart(node, at);
            range.setEnd(node, at + word.length);
            if (range.getClientRects().length > 1) split.push(word);
            from = at + word.length;
        }
        return split;
    });
    expect(broken, "Words drawn on two lines").toEqual([]);
    expect(card.x).toBeGreaterThanOrEqual(0);
    expect(card.x + card.width).toBeLessThanOrEqual(PHONE.width);
    await context.close();
});

test("on a desktop the stack is where it was; a toast with a title and a message shows both", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await gotoLab(page);
    await page.getByTestId("toast-push").click();
    const toast = toasts(page).first();
    await expect(toast).toHaveCSS("opacity", "1");
    await expect(toast.getByRole("heading", { name: "Saved" })).toBeVisible();
    // To the eye as well: a line of its own under the title, not text for a screen reader only.
    const line = toast.getByText("Your answers were saved.");
    await expect(line).toBeVisible();
    expect((await box(line)).width).toBeGreaterThan(100);
    expect(await line.evaluate((el) => el.closest(".sr-only") === null)).toBe(true);
    await expect
        .poll(async () => {
            const region = await box(stack(page));
            return { x: region.x, width: region.width, right: 1280 - (region.x + region.width), bottom: 800 - (region.y + region.height) };
        })
        .toEqual({ x: 880, width: 384, right: 16, bottom: 16 });
    const card = await box(toast);
    expect({ x: card.x, width: card.width }).toEqual({ x: 896, width: 352 });
});
