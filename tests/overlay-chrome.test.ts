import { cleanup, render, screen, waitFor } from "@testing-library/svelte";
import { tick } from "svelte";
import { afterEach, describe, expect, it } from "vitest";

import OverlayChromeHarness from "./fixtures/OverlayChromeHarness.svelte";
import {
    OVERLAY_CHROME,
    OVERLAY_CLOSE_GLYPH,
    OVERLAY_TITLE_2XL,
    OVERLAY_TITLE_HYPHENS,
    OVERLAY_TITLE_WRAP,
    OVERLAY_TITLE_XL,
    textIsEnlarged,
} from "../src/components/util/overlay-chrome";

/**
 * The header and footer of an overlay are chrome: laid out in px, with a title
 * that grows to 1.3 times its size and stops, so that at 200% text they do not
 * take the screen from the content. jsdom has no layout; what can be held here
 * is which box carries which rule. playwright/overlay-chrome.spec.ts measures.
 */

afterEach(() => {
    cleanup();
    document.documentElement.style.fontSize = "";
});

/** What `html { font-size: 200% }` computes to; jsdom does not resolve a percentage. */
const enlargeText = () => (document.documentElement.style.fontSize = "32px");

const KINDS = ["sheet", "modal", "modal-full", "modal-mobile", "drawer", "slide", "slide-swipe"] as const;
type Kind = (typeof KINDS)[number];

const TITLE = "Lägg till på hemskärmen";
const dialog = () => screen.getByRole("dialog", { name: TITLE });
const title = () => screen.getByRole("heading", { level: 2, name: TITLE });
const closeButton = () => screen.getByRole("button", { name: "Close" });
const classesOf = (element: Element | null) => (element?.getAttribute("class") ?? "").split(/\s+/).filter(Boolean);

/** The nearest box around the element that sets the spacing scale, if any. */
const chromeBox = (element: Element) => element.closest(`[class~="${OVERLAY_CHROME}"]`);

/**
 * A class that takes its size from the rem spacing scale or a rem font step:
 * `px-6`, `max-md:pt-4`, `gap-3`, `size-8`, `text-2xl`, `leading-8`. Arbitrary
 * values (`px-[24px]`) and zero (`min-w-0`) are not matched.
 */
const REM_SIZED =
    /^(?:[a-z-]+:)*-?(?:p[xytblrse]?|m[xytblrse]?|gap(?:-[xy])?|space-[xy]|size|[wh]|min-[wh]|leading)-(?!0$)\d+(?:\.\d+)?$|^(?:[a-z-]+:)*text-(?:xs|sm|base|lg|\d?xl)$/;
const remSized = (element: Element | null) => classesOf(element).filter((name) => REM_SIZED.test(name));

function footerBox(kind: Kind) {
    const done = screen.getByTestId("done");
    return kind.startsWith("modal") ? done.closest("footer")! : done.parentElement!;
}

function contentBox() {
    // The box that carries the gutters: the first one up from the text that has horizontal padding.
    let box: Element | null = screen.getByTestId("text");
    while (box && !classesOf(box).some((name) => /(?:^|:)p[xlrse]?-/.test(name))) box = box.parentElement;
    return box!;
}

describe("the regular expression of this file", () => {
    it("tells a rem class from a px one", () => {
        for (const name of ["px-6", "pt-7", "gap-3", "size-8", "h-8", "max-md:pt-4", "md:px-6", "text-2xl", "leading-8", "-mt-2"]) {
            expect(REM_SIZED.test(name), name).toBe(true);
        }
        for (const name of ["px-[24px]", "gap-[12px]", "max-md:pt-[16px]", "text-headline", "h-dvh", "min-h-0", "min-w-0", "flex-1", "text-[24px]"]) {
            expect(REM_SIZED.test(name), name).toBe(false);
        }
    });
});

describe.each(KINDS)("the chrome of %s", (kind) => {
    const titleStep = kind === "sheet" ? OVERLAY_TITLE_XL : OVERLAY_TITLE_2XL;

    it("keeps its accessible names", () => {
        render(OverlayChromeHarness, { props: { kind } });
        expect(dialog().getAttribute("aria-modal")).toBe("true");
        // Hyphenation goes by the language of the title: on the panel, or on what is around it.
        expect(title().closest("[lang]")?.getAttribute("lang")).toBe("sv");
        expect(title().textContent?.trim()).toBe(TITLE);
        expect(closeButton()).toBeTruthy();
    });

    it("lays the header out in px: the title and the close button are inside the box that sets the scale", () => {
        render(OverlayChromeHarness, { props: { kind } });
        const box = chromeBox(title());
        expect(box, "The header sets --spacing to 4px").not.toBeNull();
        expect(box!.contains(closeButton())).toBe(true);
        // The scale is for chrome alone: what the app renders is outside it.
        expect(box!.contains(screen.getByTestId("text"))).toBe(false);
        expect(box!.contains(screen.getByTestId("done"))).toBe(false);
    });

    it("caps the title at 1.3 times its size, on a line that grows with it", () => {
        render(OverlayChromeHarness, { props: { kind } });
        const classes = classesOf(title());
        expect(classes).toEqual(expect.arrayContaining(titleStep.split(" ")));
        // No rem step beside the cap, and no fixed line under a growing font.
        expect(remSized(title())).toEqual([]);
        const [, rem, px] = /min\(([\d.]+)rem,([\d.]+)px\)/.exec(titleStep)!;
        expect(Number(px)).toBeCloseTo(Number(rem) * 16 * 1.3, 5);
    });

    it("with the text enlarged, hyphenates the title before it cuts a word", async () => {
        enlargeText();
        render(OverlayChromeHarness, { props: { kind } });
        await waitFor(() => expect(classesOf(title())).toContain(OVERLAY_TITLE_HYPHENS));
        expect(classesOf(title())).toContain("[overflow-wrap:break-word]");
    });

    it("at the default text size, wraps the title between words as it always did: no hyphenation", async () => {
        render(OverlayChromeHarness, { props: { kind } });
        await tick();
        expect(classesOf(title())).not.toContain(OVERLAY_TITLE_HYPHENS);
        expect(classesOf(title()).filter((name) => name.includes("hyphen"))).toEqual([]);
    });

    it("lets the title wrap, and cuts a word only when it is wider than the line", () => {
        render(OverlayChromeHarness, { props: { kind } });
        const classes = classesOf(title());
        expect(classes).toEqual(expect.arrayContaining(OVERLAY_TITLE_WRAP.split(" ")));
        expect(classes).toContain("[overflow-wrap:break-word]");
        expect(classes).not.toContain("[overflow-wrap:anywhere]");
        for (const name of ["truncate", "whitespace-nowrap", "line-clamp-1"]) expect(classes).not.toContain(name);
        // A flex item with `break-word` is as wide as its longest word unless it may shrink.
        const column = classes.includes("min-w-0") ? title() : title().parentElement!;
        expect(classesOf(column)).toContain("min-w-0");
        expect(classesOf(closeButton())).toContain("shrink-0");
    });

    it("keeps the close button a control: its size from the px scale, its glyph in px", () => {
        render(OverlayChromeHarness, { props: { kind } });
        const button = closeButton();
        const classes = classesOf(button);
        if (button.querySelector("svg")) {
            expect(button.querySelector("svg")!.getAttribute("width")).toBe("20");
        } else {
            expect(classes).toEqual(expect.arrayContaining(OVERLAY_CLOSE_GLYPH.split(" ")));
            expect(classes.filter((name) => /^text-\d?xl$/.test(name))).toEqual([]);
        }
    });

    it("pads the footer in px and leaves the scale of the app's button alone", () => {
        render(OverlayChromeHarness, { props: { kind } });
        const footer = footerBox(kind);
        expect(remSized(footer)).toEqual([]);
        expect(classesOf(footer).some((name) => /(?:^|:)p[xlrse]?-\[/.test(name))).toBe(true);
        expect(chromeBox(screen.getByTestId("done"))).toBeNull();
    });

    it("keeps the gutters of the content in px, in line with the header", () => {
        render(OverlayChromeHarness, { props: { kind } });
        const box = contentBox();
        expect(dialog().contains(box)).toBe(true);
        expect(classesOf(box).filter((name) => /^(?:[a-z-]+:)*p[xlrse]-\d/.test(name))).toEqual([]);
        expect(chromeBox(screen.getByTestId("text"))).toBeNull();
    });
});

describe("textIsEnlarged", () => {
    it("is false at the size browsers start from, and when the page says nothing", () => {
        expect(textIsEnlarged()).toBe(false);
        document.documentElement.style.fontSize = "16px";
        expect(textIsEnlarged()).toBe(false);
    });

    it("is true above it", () => {
        document.documentElement.style.fontSize = "20px";
        expect(textIsEnlarged()).toBe(true);
        enlargeText();
        expect(textIsEnlarged()).toBe(true);
    });
});

describe("the grips", () => {
    it("draws the grip of a swipeable SlideUp in px", () => {
        render(OverlayChromeHarness, { props: { kind: "slide-swipe" } });
        const grip = dialog().querySelector("[data-sheet-grip]")!;
        expect(classesOf(grip)).toContain(OVERLAY_CHROME);
        expect(classesOf(grip)).toContain("h-[28px]");
    });

    it("draws the grip of a BottomSheet in px: 44 by 80, inside the header", () => {
        render(OverlayChromeHarness, { props: { kind: "sheet" } });
        const grip = dialog().querySelector("[data-sheet-grip]")!;
        expect(classesOf(grip)).toEqual(expect.arrayContaining(["h-[44px]", "w-[80px]"]));
        expect(chromeBox(grip)).not.toBeNull();
    });
});

describe("without a footer", () => {
    it.each(["sheet", "modal-full", "drawer", "slide"] as const)("%s still pads its content in px at the sides", (kind) => {
        render(OverlayChromeHarness, { props: { kind, withFooter: false } });
        expect(screen.queryByTestId("done")).toBeNull();
        const box = contentBox();
        expect(classesOf(box).filter((name) => /^(?:[a-z-]+:)*p[xlrse]-\d/.test(name))).toEqual([]);
    });
});
