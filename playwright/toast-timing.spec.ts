import { expect, test, type Locator, type Page } from "@playwright/test";
import { gotoHydrated } from "./helpers/hydration";
import { touchHold, touchTap } from "./helpers/touch";

/**
 * How long a toast stays, what holds its timer, and what a press on it does
 * to whatever is open under it. The fixture is /phone-lab.
 *
 * No test here waits for a toast's time to pass. The page's clock is
 * installed and stopped before a toast is pushed, and moved by hand
 * (`page.clock.runFor`): the seconds a toast says it has left are then exact,
 * however busy the machine is. A finger is put down and lifted through the
 * DevTools protocol, with a timestamp on each event.
 */

const PHONE = { width: 375, height: 800 };
const NARROW = { width: 320, height: 568 };

const press = (page: Page, testId: string) =>
    page.getByTestId(testId).evaluate((el) => (el as HTMLElement).click());

const stack = (page: Page) => page.locator("[data-zabi-toaster]");
const toasts = (page: Page) => stack(page).locator("[data-toast-id]");

async function box(locator: Locator) {
    const rect = await locator.boundingBox();
    expect(rect, "The element must be laid out").not.toBeNull();
    return rect!;
}

const centre = async (locator: Locator) => {
    const rect = await box(locator);
    return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
};

/** The lab, with the page's clock stopped: nothing counts until a test says so. */
async function gotoLabWithClockStopped(page: Page) {
    await page.clock.install();
    await gotoHydrated(page, "/phone-lab");
    await page.clock.pauseAt(new Date((await page.evaluate(() => Date.now())) + 1000));
}

/** Pushes one of the lab's toasts and returns it once it has stopped moving. */
async function push(page: Page, name: string) {
    const before = await toasts(page).count();
    await press(page, `len-${name}`);
    const toast = toasts(page).nth(before);
    await expect(toast).toBeVisible();
    await expect.poll(() => toast.evaluate((el) => el.getAnimations().length)).toBe(0);
    return toast;
}

/** The seconds the toast says it has left, or null when it has no timer. */
const secondsLeft = (toast: Locator) =>
    toast.evaluate((el) => {
        const sentence = el.querySelector("[data-toast-countdown]")?.textContent;
        return sentence ? Number(/(\d+) seconds?/.exec(sentence)?.[1]) : null;
    });

test.describe("the length of a toast", () => {
    test.use({ viewport: PHONE });

    for (const [name, seconds] of [
        ["default", 7],
        ["default-long", 14],
        ["short", 3],
        ["medium", 7],
        ["long", 14],
        ["error-short", 3],
        ["fourteen", 14],
    ] as const) {
        test(`"${name}" has ${seconds} seconds, and is gone when they have passed`, async ({ page }) => {
            await gotoLabWithClockStopped(page);
            const toast = await push(page, name);
            expect(await secondsLeft(toast)).toBe(seconds);

            await page.clock.runFor((seconds - 1) * 1000);
            await expect.poll(() => secondsLeft(toast)).toBe(1);
            await expect(toast).toBeVisible();
            await page.clock.runFor(1000);
            await expect(toasts(page)).toHaveCount(0);
        });
    }

    // "default-longest" is 397 characters with no duration: more than long can be read in.
    for (const name of ["error", "persistent", "detail", "default-longest"] as const) {
        test(`"${name}" has no timer and is still there after a minute`, async ({ page }) => {
            await gotoLabWithClockStopped(page);
            const toast = await push(page, name);
            expect(await secondsLeft(toast)).toBeNull();
            await page.clock.runFor(60_000);
            await expect(toast).toBeVisible();
            expect(await secondsLeft(toast)).toBeNull();
        });
    }
});

test.describe("a toast of three seconds", () => {
    test.use({ viewport: PHONE });

    test("has come in before a second has passed, and has gone out after the third", async ({ page }) => {
        await gotoLabWithClockStopped(page);
        await press(page, "len-short");
        const toast = toasts(page).first();
        // In place and fully drawn with none of its three seconds used: the page's clock has not moved.
        await expect(toast).toHaveCSS("opacity", "1");
        await expect.poll(() => toast.evaluate((el) => el.getAnimations().length)).toBe(0);
        expect(await secondsLeft(toast)).toBe(3);
        // What is announced is there from the start, as one piece.
        const live = toast.locator('[role="status"]');
        await expect(live).toHaveAttribute("aria-atomic", "true");
        await expect(live).toHaveText("Draft saved.");

        await page.clock.runFor(3000);
        // Its way out is an animation of its own; the toast is out of the page when that has ended.
        await expect(toasts(page)).toHaveCount(0);
        await expect(stack(page).locator("*")).toHaveCount(0);
    });

    test("with reduced motion it appears and goes at once", async ({ page }) => {
        await page.emulateMedia({ reducedMotion: "reduce" });
        await gotoLabWithClockStopped(page);
        await press(page, "len-short");
        const toast = toasts(page).first();
        await expect(toast).toBeVisible();
        expect(await toast.evaluate((el) => el.getAnimations().length), "Nothing moves").toBe(0);
        expect(await toast.evaluate((el) => getComputedStyle(el).opacity)).toBe("1");
        expect(await secondsLeft(toast)).toBe(3);
        await page.clock.runFor(3000);
        await expect(toasts(page)).toHaveCount(0);
    });

    test("counts while the toast above it is held", async ({ page }) => {
        await gotoLabWithClockStopped(page);
        const first = await push(page, "long");
        // Held by focus: the second toast moves the first, and a mouse would no longer be over it.
        await first.getByRole("button").focus();
        await expect(first).toHaveAttribute("data-paused", "true");

        const second = await push(page, "short");
        await expect(second).toHaveAttribute("data-paused", "false");
        expect(await secondsLeft(second)).toBe(3);
        await page.clock.runFor(3000);
        await expect(toasts(page)).toHaveCount(1);
        await expect(first).toHaveAttribute("data-paused", "true");
        expect(await secondsLeft(first)).toBe(14);
    });
});

test.describe("a finger on a toast", () => {
    // Not `isMobile`: that zooms a page out when its text outgrows it. A coarse pointer all the same.
    test.use({ viewport: PHONE, hasTouch: true });

    test("held for three seconds it holds the timer; lifted, the timer runs; a tap does neither for good", async ({
        page,
    }) => {
        await gotoLabWithClockStopped(page);
        expect(await page.evaluate(() => matchMedia("(pointer: coarse)").matches)).toBe(true);
        // QA's toast: 198 characters, 14 seconds.
        const toast = await push(page, "fourteen");
        const pauses = page.getByTestId("toast-pauses");
        await page.clock.runFor(1000);
        await expect.poll(() => secondsLeft(toast)).toBe(13);
        await expect(toast).toHaveAttribute("data-paused", "false");

        const finger = await touchHold(page, await centre(toast.locator("[data-toast-message]")));
        await expect(toast, "Held").toHaveAttribute("data-paused", "true");
        await expect(pauses).toHaveText("Pauses: paused");
        await page.clock.runFor(3000);
        expect(await secondsLeft(toast), "Nothing counted under the finger").toBe(13);
        await expect(toast).toHaveAttribute("data-paused", "true");

        await finger.lift(3000);
        await expect(toast, "Lifted").toHaveAttribute("data-paused", "false");
        await expect(pauses).toHaveText("Pauses: paused,running");
        await page.clock.runFor(3000);
        await expect.poll(() => secondsLeft(toast)).toBe(10);
        await expect(toast, "The mouse events a browser makes of a tap hold nothing").toHaveAttribute(
            "data-paused",
            "false",
        );

        // A tap: down and up. It is reported as one pause and one run, and the toast stays.
        await touchTap(page, await centre(toast.locator("[data-toast-message]")));
        await expect(pauses).toHaveText("Pauses: paused,running,paused,running");
        await expect(toast).toHaveAttribute("data-paused", "false");
        await page.clock.runFor(2000);
        await expect.poll(() => secondsLeft(toast)).toBe(8);
        await expect(toast).toBeVisible();
        await expect(pauses).toHaveText("Pauses: paused,running,paused,running");
    });

    test("lifted in its last second, a short toast has its three seconds again", async ({ page }) => {
        await gotoLabWithClockStopped(page);
        const toast = await push(page, "short");
        await page.clock.runFor(2000);
        await expect.poll(() => secondsLeft(toast)).toBe(1);

        const finger = await touchHold(page, await centre(toast.locator("[data-toast-message]")));
        await expect(toast).toHaveAttribute("data-paused", "true");
        await page.clock.runFor(5000);
        expect(await secondsLeft(toast)).toBe(1);
        await finger.lift(5000);
        await expect(toast).toHaveAttribute("data-paused", "false");
        await expect.poll(() => secondsLeft(toast)).toBe(3);

        await page.clock.runFor(2000);
        await expect.poll(() => secondsLeft(toast)).toBe(1);
        await expect(toast).toBeVisible();
        await page.clock.runFor(1000);
        await expect(toasts(page)).toHaveCount(0);
    });

    test("a mouse on the same screen holds the timer while it is over the toast, as a mouse does", async ({
        page,
    }) => {
        await gotoLabWithClockStopped(page);
        const toast = await push(page, "fourteen");
        const pauses = page.getByTestId("toast-pauses");
        // First a finger, as on a touch laptop.
        await touchTap(page, await centre(toast.locator("[data-toast-message]")));
        await expect(pauses).toHaveText("Pauses: paused,running");

        const over = await centre(toast.locator("[data-toast-message]"));
        await page.mouse.move(over.x, over.y);
        await expect(toast).toHaveAttribute("data-paused", "true");
        await page.mouse.down();
        await page.mouse.up();
        await page.clock.runFor(3000);
        expect(await secondsLeft(toast)).toBe(14);
        await expect(toast, "Still over it").toHaveAttribute("data-paused", "true");

        await page.mouse.move(5, 5);
        await expect(toast).toHaveAttribute("data-paused", "false");
        await expect(pauses).toHaveText("Pauses: paused,running,paused,running");
        await page.clock.runFor(2000);
        await expect.poll(() => secondsLeft(toast)).toBe(12);
    });
});

test.describe("a toast at 320px with the text at 200%", () => {
    test.use({ viewport: NARROW, hasTouch: true });

    test('the status icon stays 20px and "uppkopplingen" is on one line', async ({ page }) => {
        await gotoHydrated(page, "/phone-lab");
        await page.evaluate(() => (document.documentElement.style.fontSize = "200%"));
        await press(page, "toast-sv-push");
        const toast = toasts(page).first();
        await expect(toast).toBeVisible();
        await expect.poll(() => toast.evaluate((el) => el.getAnimations().length)).toBe(0);

        const icon = await box(toast.locator('[role="alert"] svg'));
        expect(icon.width, "It was 40px: the icon grew with the text, the padding beside it did not").toBe(20);
        expect(icon.height).toBe(20);

        const text = toast.locator("[data-toast-message]");
        const column = await box(text);
        expect(column.width, "The text column (202px before)").toBeGreaterThanOrEqual(222);

        const lines = await text.evaluate((el) => {
            const node = el.firstChild!;
            const word = "uppkopplingen";
            const start = (node.textContent ?? "").indexOf(word);
            const tops = new Set<number>();
            let width = 0;
            for (let index = start; index < start + word.length; index += 1) {
                const range = document.createRange();
                range.setStart(node, index);
                range.setEnd(node, index + 1);
                const rect = range.getBoundingClientRect();
                tops.add(Math.round(rect.top));
                width += rect.width;
            }
            return { found: start >= 0, lines: tops.size, width };
        });
        expect(lines.found).toBe(true);
        expect(lines.lines, `The word is ${Math.round(lines.width)}px wide`).toBe(1);
        expect(await toast.evaluate((el) => el.scrollWidth <= el.clientWidth), "Nothing sticks out").toBe(true);
    });
});

test.describe("a press on a toast, with something open under it", () => {
    test.use({ viewport: PHONE, hasTouch: true });

    test("the phone menu of the top bar stays open; a press on the page closes it", async ({ page }) => {
        await gotoHydrated(page, "/phone-lab");
        await press(page, "len-persistent");
        const toast = toasts(page).first();
        await expect(toast).toBeVisible();
        await expect.poll(() => toast.evaluate((el) => el.getAnimations().length)).toBe(0);

        const menuButton = page.getByRole("button", { name: /^(Open|Close) menu$/ });
        await menuButton.evaluate((el) => (el as HTMLElement).click());
        await expect(menuButton).toHaveAttribute("aria-expanded", "true");

        await touchTap(page, await centre(toast.locator("[data-toast-message]")));
        // The tap has been handled once the toast has reported it.
        await expect(page.getByTestId("toast-pauses")).toHaveText("Pauses: paused,running");
        await expect(menuButton, "A tap on the toast").toHaveAttribute("aria-expanded", "true");

        const onPage = await pointOnThePage(page);
        await page.mouse.click(onPage.x, onPage.y);
        await expect(menuButton, "A press on the page").toHaveAttribute("aria-expanded", "false");
        await expect(toast).toBeVisible();
    });
});

/** A point where the page itself is on top: not the bar with its open menu, not a toast. */
const pointOnThePage = (page: Page) =>
    page.evaluate(() => {
        const x = Math.round(window.innerWidth / 2);
        for (let y = window.innerHeight - 10; y > 0; y -= 10) {
            if (document.elementFromPoint(x, y)?.closest("main")) return { x, y };
        }
        throw new Error("The page is covered from top to bottom");
    });

test.describe("Drawer on a phone with a home indicator", () => {
    test.use({ viewport: PHONE, hasTouch: true });

    async function setSafeArea(page: Page, insets: { top?: number; bottom?: number; left?: number; right?: number }) {
        const cdp = await page.context().newCDPSession(page);
        await cdp.send("Emulation.setSafeAreaInsetsOverride", { insets });
        await cdp.detach();
    }

    test("its last link ends above the indicator, and its close button takes a touch of 44px", async ({ page }) => {
        await page.emulateMedia({ reducedMotion: "reduce" });
        await gotoHydrated(page, "/phone-lab");
        await setSafeArea(page, { bottom: 34 });
        expect(await page.evaluate(() => matchMedia("(pointer: coarse)").matches)).toBe(true);
        await press(page, "drawer-plain-open");
        const drawer = page.getByTestId("lab-drawer-plain");
        await expect(drawer).toBeVisible();

        const last = drawer.locator("[data-drawer-link]").last();
        await last.evaluate((el) => el.scrollIntoView({ block: "end" }));
        // Scrolled as far as it goes.
        await drawer
            .locator("[data-drawer-link]")
            .first()
            .evaluate((el) => {
                const scroller = el.closest("ul")!.parentElement!;
                scroller.scrollTop = scroller.scrollHeight;
            });
        const link = await box(last);
        expect(
            Math.round(link.y + link.height),
            "The last link ended 2px inside the 34px of the home indicator",
        ).toBeLessThanOrEqual(PHONE.height - 34);

        const close = drawer.getByRole("button", { name: "Close" });
        const button = await box(close);
        expect(button.width).toBe(32);
        expect(button.height).toBe(32);
        const hitArea = await close.evaluate((el) => {
            const style = getComputedStyle(el, "::before");
            return { width: parseFloat(style.width), height: parseFloat(style.height), position: style.position };
        });
        expect(hitArea.position).toBe("absolute");
        expect(hitArea.width).toBeGreaterThanOrEqual(44);
        expect(hitArea.height).toBeGreaterThanOrEqual(44);
        for (const [dx, dy] of [
            [-21, -21],
            [21, -21],
            [-21, 21],
            [21, 21],
        ]) {
            const hit = await page.evaluate(
                ([x, y]) => document.elementFromPoint(x, y)?.closest("button")?.getAttribute("aria-label"),
                [button.x + 16 + dx, button.y + 16 + dy],
            );
            expect(hit, `A touch ${dx},${dy} from the centre of the button`).toBe("Close");
        }
    });

    test("with a footer, the buttons in it are above the indicator", async ({ page }) => {
        await page.emulateMedia({ reducedMotion: "reduce" });
        await gotoHydrated(page, "/phone-lab");
        await setSafeArea(page, { bottom: 34 });
        await press(page, "drawer-open");
        const drawer = page.getByTestId("lab-drawer");
        await expect(drawer).toBeVisible();
        const save = await box(page.getByTestId("drawer-save"));
        expect(Math.round(save.y + save.height)).toBeLessThanOrEqual(PHONE.height - 34);
        // The panel still reaches the bottom of the screen: its surface is behind the indicator.
        const panel = await box(drawer);
        expect(Math.round(panel.y + panel.height)).toBe(PHONE.height);
    });
});
