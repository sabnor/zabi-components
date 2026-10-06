import { expect, test, type Page } from "@playwright/test";

/**
 * The "On this page" list on the guides marks the section being read.
 *
 * It did not: the entries were plain links with hover styles and nothing else,
 * so no entry ever had `aria-current`. Every case below asserts that exactly
 * one entry is current, and which one.
 *
 * There are two copies of the list, one shown at a time: the sticky column
 * from 1024px up and a disclosure below that. Both are checked.
 */

const GUIDES = [
    { path: "/docs", middle: "use", nearEnd: "imports", last: "next" },
    { path: "/theming", middle: "tokens", nearEnd: "limits", last: "stability" },
];

const VIEWPORTS = [
    { name: "1280px, the column", width: 1280, height: 800, phone: false },
    { name: "375px, the disclosure", width: 375, height: 740, phone: true },
];

const list = (page: Page) => page.locator("[data-on-this-page]");
/** The entries of whichever copy of the list is on screen. */
const entries = (page: Page) => list(page).locator("a:visible");
const entry = (page: Page, id: string) => list(page).locator(`a[href="#${id}"]:visible`);

/** Below 1024px the list is folded away until its summary is pressed. */
async function reveal(page: Page, phone: boolean): Promise<void> {
    if (!phone) return;
    // The page is usable before it hydrates, and <details> opens without script.
    const details = list(page).locator("details");
    if (!(await details.evaluate((el: HTMLDetailsElement) => el.open))) {
        await details.locator("summary").click();
    }
    await expect(entries(page).first()).toBeVisible();
}

/**
 * The `href` of every entry marked current, in the copy of the list this
 * width uses. Read from the markup whether or not the disclosure is open: on
 * a phone the list is at the top of the page, so opening it to look would
 * scroll there and move the mark.
 */
const currentEntries = (page: Page) =>
    list(page).evaluate((nav) => {
        const column = nav.querySelector(":scope > div");
        const inUse = column && getComputedStyle(column).display !== "none" ? column : nav.querySelector("details");
        return [...(inUse?.querySelectorAll("a") ?? [])]
            .filter((link) => link.getAttribute("aria-current") === "location")
            .map((link) => link.getAttribute("href"));
    });

async function expectCurrent(page: Page, id: string): Promise<void> {
    await expect.poll(() => currentEntries(page), { message: `current entry` }).toEqual([`#${id}`]);
}

/**
 * The list is server-rendered with the first entry marked; the tracking starts
 * when the page hydrates, and the component says so with `data-tracking`. A
 * scroll before that is not seen, so every test waits for it. Under a loaded
 * machine hydration can take many seconds.
 */
async function open(page: Page, path: string, phone: boolean, show = true): Promise<void> {
    await page.goto(path, { waitUntil: "load" });
    await expect(list(page)).toHaveAttribute("data-tracking", "", { timeout: 60_000 });
    if (!show) return;
    await reveal(page, phone);
    await expect(entries(page).first()).toBeVisible();
}

/** Scrolls like a reader does, a wheel notch at a time, until `done`. */
async function wheelUntil(page: Page, deltaY: number, done: () => Promise<boolean>): Promise<void> {
    await page.mouse.move(200, 400);
    await expect(async () => {
        if (!(await done())) {
            await page.mouse.wheel(0, deltaY);
            throw new Error("not there yet");
        }
    }).toPass({ timeout: 60_000, intervals: [50] });
}

for (const viewport of VIEWPORTS) {
    test.describe(`on this page, ${viewport.name}`, () => {
        test.use({ viewport: { width: viewport.width, height: viewport.height } });
        // Room for a slow hydration; a passing test takes a few seconds.
        test.describe.configure({ timeout: 150_000 });

        for (const guide of GUIDES) {
            test.describe(guide.path, () => {
                test("the first entry is current at the top, on the server too", async ({ page, request }) => {
                    const html = await (await request.get(guide.path)).text();
                    expect(html.match(/aria-current="location"/g)?.length, "copies marked in the server's HTML").toBe(2);

                    await open(page, guide.path, viewport.phone);
                    const first = await entries(page).first().getAttribute("href");
                    await expect.poll(() => currentEntries(page)).toEqual([first]);
                });

                test("scrolling to a middle section marks it, and the bottom marks the last", async ({ page }) => {
                    await open(page, guide.path, viewport.phone);

                    // Until the section's heading has passed the top of the screen.
                    await wheelUntil(page, 240, () =>
                        page.evaluate(
                            (id) => document.getElementById(id)!.getBoundingClientRect().top < 40,
                            guide.middle,
                        ),
                    );
                    await expectCurrent(page, guide.middle);

                    await wheelUntil(page, 2000, () =>
                        page.evaluate(
                            () =>
                                window.innerHeight + window.scrollY >=
                                document.documentElement.scrollHeight - 2,
                        ),
                    );
                    await expectCurrent(page, guide.last);
                });

                test("following an entry marks it at once and keeps it", async ({ page }) => {
                    await open(page, guide.path, viewport.phone);

                    // Near the end of the page: the page stops at the bottom
                    // before this section reaches the top, and the mark must
                    // still be on the entry that was followed.
                    await entry(page, guide.nearEnd).click();
                    await expect(page).toHaveURL(new RegExp(`#${guide.nearEnd}$`));
                    await expectCurrent(page, guide.nearEnd);
                    // Still so once the jump is long over.
                    await page.waitForTimeout(400);
                    await expectCurrent(page, guide.nearEnd);

                    // The same entry again: the address does not change.
                    await entry(page, guide.middle).click();
                    await expectCurrent(page, guide.middle);
                    await entry(page, guide.middle).click();
                    await expectCurrent(page, guide.middle);

                    // Scrolling on hands the mark back to where the reader is.
                    await wheelUntil(page, -2000, () => page.evaluate(() => window.scrollY === 0));
                    const first = await entries(page).first().getAttribute("href");
                    await expect.poll(() => currentEntries(page)).toEqual([first]);
                });

                test("an address with a hash marks that entry", async ({ page }) => {
                    // The disclosure is left closed: the reader is at the
                    // section, not at the list.
                    await open(page, `${guide.path}#${guide.middle}`, viewport.phone, false);
                    await expectCurrent(page, guide.middle);

                    await open(page, `${guide.path}#${guide.nearEnd}`, viewport.phone, false);
                    await expectCurrent(page, guide.nearEnd);
                });

                test("the keyboard follows an entry", async ({ page }) => {
                    await open(page, guide.path, viewport.phone);
                    await entry(page, guide.middle).focus();
                    await page.keyboard.press("Enter");
                    await expect(page).toHaveURL(new RegExp(`#${guide.middle}$`));
                    await expectCurrent(page, guide.middle);
                    // Focus was not taken somewhere unrelated: it is on the
                    // entry, or where the browser put it for the jump.
                    expect(
                        await page.evaluate(
                            () => document.activeElement?.tagName.toLowerCase() ?? "",
                        ),
                    ).toMatch(/^(a|body|section)$/);

                    // Tab goes on from there, into the page. Focus may land in
                    // a later section and scroll to it, and the mark follows the
                    // reader; there is still exactly one.
                    await page.keyboard.press("Tab");
                    await expect.poll(async () => (await currentEntries(page)).length).toBe(1);
                    expect(
                        await page.evaluate(() => !!document.activeElement?.closest("main")),
                        "Tab stayed in the page content",
                    ).toBe(true);
                });
            });
        }
    });
}

test.describe("on this page: the mark is not colour alone, and has contrast", () => {
    /**
     * The current entry differs by a leading bar and by weight as well as by
     * colour. The bar is a UI part (3:1 against what is behind it); the label
     * is text (4.5:1).
     */
    async function measure(page: Page) {
        return entries(page).evaluateAll((links) => {
            const canvas = document.createElement("canvas");
            canvas.width = canvas.height = 1;
            const context = canvas.getContext("2d", { willReadFrequently: true })!;
            const rgba = (colour: string) => {
                context.clearRect(0, 0, 1, 1);
                context.fillStyle = colour;
                context.fillRect(0, 0, 1, 1);
                const [r, g, b, a] = context.getImageData(0, 0, 1, 1).data;
                return { r, g, b, a: a / 255 };
            };
            /** What is painted behind `el`: its own fill over its ancestors', down to an opaque one. */
            const backdrop = (el: Element) => {
                const layers: ReturnType<typeof rgba>[] = [];
                for (let node: Element | null = el; node; node = node.parentElement) {
                    const fill = rgba(getComputedStyle(node).backgroundColor);
                    if (fill.a > 0) layers.push(fill);
                    if (fill.a === 1) break;
                }
                let out = { r: 255, g: 255, b: 255 };
                for (const layer of layers.reverse()) {
                    out = {
                        r: layer.r * layer.a + out.r * (1 - layer.a),
                        g: layer.g * layer.a + out.g * (1 - layer.a),
                        b: layer.b * layer.a + out.b * (1 - layer.a),
                    };
                }
                return out;
            };
            const luminance = ({ r, g, b }: { r: number; g: number; b: number }) => {
                const [lr, lg, lb] = [r, g, b].map((channel) => {
                    const v = channel / 255;
                    return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
                });
                return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
            };
            const ratio = (a: { r: number; g: number; b: number }, b: { r: number; g: number; b: number }) => {
                const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
                return Math.round(((hi + 0.05) / (lo + 0.05)) * 100) / 100;
            };

            const current = links.find((link) => link.getAttribute("aria-current") === "location");
            const other = links.find((link) => link.getAttribute("aria-current") !== "location");
            if (!current || !other) throw new Error("need a current and another entry");
            const bar = current.querySelector("span[aria-hidden]");
            if (!bar) throw new Error("the current entry has no bar");
            const behind = backdrop(current);
            return {
                text: ratio(rgba(getComputedStyle(current).color), behind),
                bar: ratio(rgba(getComputedStyle(bar).backgroundColor), behind),
                barWidth: bar.getBoundingClientRect().width,
                weight: Number(getComputedStyle(current).fontWeight),
                otherWeight: Number(getComputedStyle(other).fontWeight),
                otherHasBar: !!other.querySelector("span[aria-hidden]"),
            };
        });
    }

    for (const viewport of VIEWPORTS) {
        for (const mode of ["light", "dark"] as const) {
            for (const brand of ["default", "amber"] as const) {
                test(`${viewport.name}, ${mode}, ${brand}`, async ({ page }) => {
                    await page.setViewportSize({ width: viewport.width, height: viewport.height });
                    await page.addInitScript((theme) => localStorage.setItem("theme", theme), mode);
                    test.setTimeout(150_000);
                    await page.goto(brand === "amber" ? "/theming?brand=amber" : "/theming", {
                        waitUntil: "load",
                    });
                    await expect(list(page)).toHaveAttribute("data-tracking", "", { timeout: 60_000 });
                    await expect
                        .poll(
                            () =>
                                page.evaluate(
                                    () =>
                                        document.documentElement.style.getPropertyValue("--zabi-brand-600") !==
                                        "",
                                ),
                            { timeout: 30_000 },
                        )
                        .toBe(brand === "amber");
                    await reveal(page, viewport.phone);

                    const measured = await measure(page);
                    test.info().annotations.push({
                        type: "contrast",
                        description: `${viewport.name}, ${mode}, ${brand}: text ${measured.text}:1, bar ${measured.bar}:1`,
                    });
                    expect(measured.text, "label on what is behind it").toBeGreaterThanOrEqual(4.5);
                    expect(measured.bar, "bar on what is behind it").toBeGreaterThanOrEqual(3);
                    expect(measured.barWidth).toBeGreaterThanOrEqual(3);
                    expect(measured.weight).toBeGreaterThan(measured.otherWeight);
                    expect(measured.otherHasBar).toBe(false);
                });
            }
        }
    }
});
