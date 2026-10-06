import { expect, test, type Page } from "@playwright/test";
import { gotoHydrated } from "./helpers/hydration";

/**
 * The header and footer of an overlay at large text.
 *
 * With `html { font-size: 200% }` on a phone, the header of a BottomSheet (its
 * gutters, the gap above the title, the title itself, the close button) and
 * the padding of its footer all doubled, and took 394 of the 576 px of a sheet
 * at half height: the content had 182 px. The title column was 216 px wide and
 * "hemskärmen" was cut as "hemskärme" / "n".
 *
 * That chrome is navigation chrome, like the app bar: its gutters, gaps and
 * controls are in px, and its title grows with the text setting to 1.3 times
 * its size and no further. What the app puts in the overlay, and the button it
 * puts in the footer, scale in full. At 100% nothing moved, which the
 * geometry pinned below holds.
 *
 * The fixture is the app's install sheet, and the same content in a
 * full-screen Modal, a Drawer and a SlideUp, at /phone-lab.
 */

const KINDS = {
    sheet: { content: "[data-bottom-sheet-content]", baseTitle: 20 },
    modal: { content: "[data-modal-content]", baseTitle: 24 },
    drawer: { content: ":scope > div:nth-child(2)", baseTitle: 24 },
    slide: { content: "[data-slide-up-content]", baseTitle: 24 },
} as const;
type Kind = keyof typeof KINDS;
const kinds = Object.keys(KINDS) as Kind[];

const VIEWPORTS = {
    "360x800": { width: 360, height: 800 },
    "320x568": { width: 320, height: 568 },
} as const;
type Size = keyof typeof VIEWPORTS;

/**
 * The chrome in px, as it was before it was capped and as it must stay at 100%
 * text. None of it depends on how wide the fonts of the machine are: the
 * header is measured without its title and the footer without its button.
 *
 * `titleRoom` is from the start of the title to the close button; it is 40px
 * narrower at 320 than at 360, as the screen is.
 */
const CHROME: Record<
    Kind,
    {
        /** Header minus the row of the title: padding, and a border where there is one. */
        header: number;
        /** Footer minus the button in it. */
        footer: number;
        titleRoom: number;
        titleFont: number;
        titleLine: number;
        close: number;
        /** From the edge of the panel to the title, and to the text of the content. */
        gutter: number;
        contentGutter: number;
    }
> = {
    sheet: { header: 41, footer: 25, titleRoom: 292, titleFont: 20, titleLine: 28, close: 44, gutter: 16, contentGutter: 16 },
    modal: { header: 41, footer: 41, titleRoom: 280, titleFont: 24, titleLine: 32, close: 32, gutter: 24, contentGutter: 24 },
    drawer: { header: 36, footer: 33, titleRoom: 279, titleFont: 24, titleLine: 32, close: 32, gutter: 25, contentGutter: 25 },
    slide: { header: 41, footer: 33, titleRoom: 280, titleFont: 24, titleLine: 32, close: 32, gutter: 24, contentGutter: 24 },
};

interface Geometry {
    panel: number;
    header: number;
    content: number;
    footer: number;
    headerChrome: number;
    footerChrome: number;
    titleRoom: number;
    titleFont: number;
    titleLine: number;
    titleLines: number;
    close: number;
    closeWidth: number;
    gutter: number;
    contentGutter: number;
    /** "hemskärmen" as the lines it is drawn on, e.g. ["hemskärmen"] or ["hem", "skärmen"]. */
    word: string[];
    hyphens: string;
    /** Whether this browser has a Swedish hyphenation dictionary at all. */
    canHyphenate: boolean;
}

/** The panel of the open overlay. A SlideUp takes no test id; it is the dialog inside its host. */
const panelOf = (page: Page, kind: Kind) =>
    kind === "slide"
        ? page.getByTestId("chrome-slide-host").getByRole("dialog")
        : page.getByTestId(`chrome-${kind}`);

async function open(page: Page, kind: Kind, scale: 100 | 200) {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await gotoHydrated(page, "/phone-lab");
    await page.evaluate((value) => {
        document.documentElement.style.fontSize = `${value}%`;
    }, scale);
    await page.getByTestId(`chrome-${kind}-open`).click();
    const panel = panelOf(page, kind);
    await expect(panel).toBeVisible();
    await expect(panel.getByRole("button", { name: "Klar" })).toBeVisible();
    return panel;
}

async function measure(page: Page, kind: Kind): Promise<Geometry> {
    const panel = panelOf(page, kind);
    const read = () =>
        panel.evaluate((root, contentSelector) => {
            const content = root.querySelector(contentSelector)!;
            const title = root.querySelector("h2")!;
            const close =
                title.closest("div")!.parentElement!.querySelector("button:not([data-sheet-grip])") ??
                root.querySelector("button:not([data-sheet-grip])")!;
            const done = [...root.querySelectorAll("button")].find((button) => button.textContent?.trim() === "Klar")!;
            const text = root.querySelector('[data-testid="chrome-text"]')!;
            const box = root.getBoundingClientRect();
            const inner = content.getBoundingClientRect();
            const heading = title.getBoundingClientRect();
            const style = getComputedStyle(title);
            const lineHeight = parseFloat(style.lineHeight);

            // The word, by the line each of its letters is drawn on.
            const walker = document.createTreeWalker(title, NodeFilter.SHOW_TEXT);
            const word: string[] = [];
            for (let node = walker.nextNode(); node; node = walker.nextNode()) {
                const letters = node.textContent ?? "";
                const start = letters.indexOf("hemskärmen");
                if (start < 0) continue;
                let lastTop: number | null = null;
                for (let index = start; index < start + "hemskärmen".length; index += 1) {
                    const range = document.createRange();
                    range.setStart(node, index);
                    range.setEnd(node, index + 1);
                    const top = Math.round(range.getBoundingClientRect().top);
                    if (lastTop === null || Math.abs(top - lastTop) > 2) word.push("");
                    word[word.length - 1] += letters[index];
                    lastTop = top;
                }
            }

            // A column too narrow for the word, where only hyphenation may break it.
            const probe = document.createElement("div");
            probe.lang = "sv";
            probe.textContent = "hemskärmen";
            probe.style.cssText =
                "position:absolute;visibility:hidden;inline-size:5em;font-size:20px;line-height:20px;hyphens:auto;overflow-wrap:normal;";
            document.body.append(probe);
            const canHyphenate = probe.getBoundingClientRect().height > 30;
            probe.remove();

            const round = (value: number) => Math.round(value * 10) / 10;
            const header = inner.top - box.top;
            const footer = box.bottom - inner.bottom;
            return {
                panel: round(box.height),
                header: round(header),
                content: round(inner.height),
                footer: round(footer),
                // The row is as tall as the title, or as the close button where that reaches lower.
                headerChrome: round(header - Math.max(heading.height, close.getBoundingClientRect().bottom - heading.top)),
                footerChrome: round(footer - done.getBoundingClientRect().height),
                titleRoom: round(close.getBoundingClientRect().left - heading.left),
                titleFont: round(parseFloat(style.fontSize)),
                titleLine: round(lineHeight),
                titleLines: Math.round(heading.height / lineHeight),
                close: round(close.getBoundingClientRect().height),
                closeWidth: round(close.getBoundingClientRect().width),
                gutter: round(heading.left - box.left),
                contentGutter: round(text.getBoundingClientRect().left - box.left),
                word,
                hyphens: style.hyphens,
                canHyphenate,
            };
        }, KINDS[kind].content);

    // The sheet settles at its snap height; read until two readings agree.
    let last = await read();
    await expect
        .poll(async () => {
            const next = await read();
            const same = JSON.stringify(next) === JSON.stringify(last);
            last = next;
            return same;
        })
        .toBe(true);
    return last;
}

function report(label: string, geometry: Geometry) {
    test.info().annotations.push({ type: "geometry", description: `${label} ${JSON.stringify(geometry)}` });
    if (process.env.OVERLAY_CHROME_LOG) console.log(`GEOMETRY ${label} ${JSON.stringify(geometry)}`);
}

for (const size of Object.keys(VIEWPORTS) as Size[]) {
    test.describe(`overlay chrome at ${size}`, () => {
        test.use({ viewport: VIEWPORTS[size] });
        const narrower = 360 - VIEWPORTS[size].width;

        for (const kind of kinds) {
            const chrome = CHROME[kind];

            test(`${kind}: nothing moves at 100% text`, async ({ page }) => {
                await open(page, kind, 100);
                const geometry = await measure(page, kind);
                report(`${size} ${kind} 100%`, geometry);

                expect({
                    header: geometry.headerChrome,
                    footer: geometry.footerChrome,
                    titleRoom: geometry.titleRoom,
                    titleFont: geometry.titleFont,
                    titleLine: geometry.titleLine,
                    close: geometry.close,
                    closeWidth: geometry.closeWidth,
                    gutter: geometry.gutter,
                    contentGutter: geometry.contentGutter,
                }).toEqual({ ...chrome, titleRoom: chrome.titleRoom - narrower, closeWidth: chrome.close });
                // And a title that wraps still wraps between words: no hyphenation at this size.
                expect(geometry.hyphens).toBe("manual");
                expect(geometry.word).toEqual(["hemskärmen"]);
            });

            test(`${kind}: at 200% text the content keeps at least half of the panel`, async ({ page }) => {
                await open(page, kind, 200);
                const geometry = await measure(page, kind);
                report(`${size} ${kind} 200%`, geometry);

                expect(
                    geometry.content,
                    `header ${geometry.header} + footer ${geometry.footer} of ${geometry.panel}`,
                ).toBeGreaterThanOrEqual(geometry.panel / 2);
            });

            test(`${kind}: at 200% text the title grows to 1.3 times its size and the chrome stays`, async ({
                page,
            }) => {
                await open(page, kind, 200);
                const geometry = await measure(page, kind);

                // It does grow: a title that ignored the text setting would fail 1.4.4 the other way.
                expect(geometry.titleFont).toBeGreaterThan(chrome.titleFont);
                expect(geometry.titleFont).toBeLessThanOrEqual(chrome.titleFont * 1.3 + 0.05);
                // Its line grows with it, so two lines do not touch.
                expect(geometry.titleLine / geometry.titleFont).toBeCloseTo(chrome.titleLine / chrome.titleFont, 1);
                // The padding, the close button and the gutters are the px they are at 100%.
                expect({
                    header: geometry.headerChrome,
                    footer: geometry.footerChrome,
                    titleRoom: geometry.titleRoom,
                    close: geometry.close,
                    closeWidth: geometry.closeWidth,
                    gutter: geometry.gutter,
                    contentGutter: geometry.contentGutter,
                }).toEqual({
                    header: chrome.header,
                    footer: chrome.footer,
                    titleRoom: chrome.titleRoom - narrower,
                    close: chrome.close,
                    closeWidth: chrome.close,
                    gutter: chrome.gutter,
                    contentGutter: chrome.contentGutter,
                });
            });

            test(`${kind}: at 200% text "hemskärmen" is hyphenated or whole, never cut`, async ({ page }) => {
                await open(page, kind, 200);
                const geometry = await measure(page, kind);

                expect(geometry.word.join(""), "The word is in the title").toBe("hemskärmen");
                expect(geometry.hyphens).toBe("auto");
                if (geometry.word.length > 1) {
                    // Broken: then by the language's rules, which need a dictionary,
                    // and never a single letter left over as before ("hemskärme" / "n").
                    expect(geometry.canHyphenate, `cut as ${geometry.word.join(" / ")}`).toBe(true);
                    for (const part of geometry.word) expect(part.length).toBeGreaterThanOrEqual(2);
                }
                // Three and four lines before.
                expect(geometry.titleLines).toBeLessThanOrEqual(2);
            });
        }
    });
}

test.describe("a word wider than the title's line", () => {
    test.use({ viewport: VIEWPORTS["320x568"] });

    test("is hyphenated by the rules of the title's language, not cut", async ({ page }) => {
        const panel = await open(page, "sheet", 200);
        // The layout of one long word; the text is put in place of the title's own.
        const { canHyphenate } = await measure(page, "sheet");
        const lines = await panel.locator("h2").evaluate((title) => {
            const word = "användarinställningarna";
            title.textContent = `Ändra ${word}`;
            const node = title.firstChild!;
            const start = "Ändra ".length;
            const read = () => {
                const parts: string[] = [];
                let lastTop: number | null = null;
                for (let index = 0; index < word.length; index += 1) {
                    const range = document.createRange();
                    range.setStart(node, start + index);
                    range.setEnd(node, start + index + 1);
                    const top = Math.round(range.getBoundingClientRect().top);
                    if (lastTop === null || Math.abs(top - lastTop) > 2) parts.push("");
                    parts[parts.length - 1] += word[index];
                    lastTop = top;
                }
                return parts;
            };
            const parts = read();
            const fits = title.scrollWidth <= title.clientWidth;
            // Where a word may only be hyphenated, never cut: the same lines, if the breaks were hyphens.
            title.style.overflowWrap = "normal";
            const hyphenatedOnly = read();
            const fitsHyphenatedOnly = title.scrollWidth <= title.clientWidth;
            title.style.overflowWrap = "";
            return { parts, fits, hyphenatedOnly, fitsHyphenatedOnly };
        });

        // It is on more than one line and nothing sticks out of the column.
        expect(lines.parts.length).toBeGreaterThan(1);
        expect(lines.fits).toBe(true);
        // Without a Swedish dictionary the browser can only cut it; with one, it must not.
        test.skip(!canHyphenate, "This browser has no Swedish hyphenation dictionary");
        expect(lines.hyphenatedOnly, "Every break is a hyphenation point").toEqual(lines.parts);
        expect(lines.fitsHyphenatedOnly).toBe(true);
    });
});

