import { createRawSnippet } from "svelte";
import { cleanup, render } from "@testing-library/svelte";
import { readFileSync } from "node:fs";
import { afterEach, describe, expect, it } from "vitest";

import SpeechBubble from "../src/components/atoms/SpeechBubble.svelte";

afterEach(cleanup);

const host = (container: HTMLElement) => container.firstElementChild as HTMLElement;
const quoted = createRawSnippet(() => ({ render: () => "<p>Hej, vi vill boka bord.</p>" }));
const source = readFileSync("src/components/atoms/SpeechBubble.svelte", "utf8");

describe("SpeechBubble", () => {
    it("is a figure with the label as figcaption before a blockquote", () => {
        const { container } = render(SpeechBubble, { props: { label: "Säg så här i luren", children: quoted } });
        const figure = host(container);
        expect(figure.tagName).toBe("FIGURE");
        const [caption, quote] = Array.from(figure.children);
        expect(caption.tagName).toBe("FIGCAPTION");
        expect(caption.textContent?.trim()).toBe("Säg så här i luren");
        expect(caption.className).not.toContain("sr-only");
        expect(quote.tagName).toBe("BLOCKQUOTE");
        expect(quote.querySelector("p")?.textContent).toBe("Hej, vi vill boka bord.");
    });

    it("keeps a hidden label in the DOM as sr-only", () => {
        const { container } = render(SpeechBubble, {
            props: { label: "Säg så här", labelHidden: true, children: quoted },
        });
        const caption = container.querySelector("figcaption")!;
        expect(caption.className).toContain("sr-only");
        expect(caption.textContent?.trim()).toBe("Säg så här");
    });

    it("has no figcaption without a label, and takes a snippet as label", () => {
        const none = render(SpeechBubble, { props: { children: quoted } });
        expect(none.container.querySelector("figcaption")).toBeNull();
        cleanup();
        const label = createRawSnippet(() => ({ render: () => '<span class="meta">Säg</span>' }));
        const { container } = render(SpeechBubble, { props: { label, children: quoted } });
        expect(container.querySelector("figcaption .meta")?.textContent).toBe("Säg");
    });

    it("hides the fill, tail and decoration from assistive technology and adds no role or control", () => {
        const decoration = createRawSnippet(() => ({ render: () => '<svg data-spark=""></svg>' }));
        const { container } = render(SpeechBubble, { props: { label: "x", decoration, children: quoted } });
        const quote = container.querySelector("blockquote")!;
        const tail = quote.querySelector("svg.tail")!;
        expect(tail.closest("[aria-hidden='true']")).not.toBeNull();
        expect(tail.getAttribute("focusable")).toBe("false");
        expect(quote.querySelector(".fill")!.closest("[aria-hidden='true']")).not.toBeNull();
        expect(quote.querySelector("[data-spark]")!.closest("[aria-hidden='true']")).not.toBeNull();
        expect(quote.querySelector("p")!.closest("[aria-hidden]")).toBeNull();
        expect(container.querySelector("[role],[tabindex],button,[aria-live]")).toBeNull();
    });

    it("draws no decoration wrapper unless one is passed", () => {
        const { container } = render(SpeechBubble, { props: { children: quoted } });
        expect(container.querySelector(".decoration")).toBeNull();
    });

    it("defaults to side end and tone ink, and falls back to them for an unknown value", () => {
        const { container } = render(SpeechBubble, { props: { children: quoted } });
        expect(host(container).dataset.side).toBe("end");
        expect(host(container).dataset.tone).toBe("ink");
        cleanup();
        const set = render(SpeechBubble, { props: { side: "start", tone: "paper", children: quoted } });
        expect(host(set.container).dataset.side).toBe("start");
        expect(host(set.container).dataset.tone).toBe("paper");
        cleanup();
        const odd = render(SpeechBubble, { props: { side: "left", tone: "navy", children: quoted } as any });
        expect(host(odd.container).dataset.side).toBe("end");
        expect(host(odd.container).dataset.tone).toBe("ink");
    });

    it("merges a call-site class over the default type and passes rest props", () => {
        const { container } = render(SpeechBubble, {
            props: { class: "text-2xl", "data-testid": "book-script", children: quoted } as any,
        });
        expect(host(container).className).toContain("text-2xl");
        expect(host(container).className).not.toContain("text-lg");
        expect(host(container).className).toContain("font-medium");
        expect(host(container).getAttribute("data-testid")).toBe("book-script");
    });

    it("reads its four properties with fallbacks and never declares them", () => {
        for (const name of ["fill", "text", "radius", "tilt"]) {
            expect(source).toContain(`var(--zabi-bubble-${name},`);
            expect(source).not.toMatch(new RegExp(`^\\s*--zabi-bubble-${name}\\s*:`, "m"));
        }
        expect(source).toContain("border-radius: var(--zabi-bubble-radius, 1.5rem)");
        expect(source).toContain("rotate: var(--zabi-bubble-tilt, 0deg)");
    });

    it("keeps the shape as an outline in forced colours and sizes the drawing in rem", () => {
        const forced = source.slice(source.indexOf("@media (forced-colors: active)"));
        expect(forced).toContain("outline: 0.125rem solid CanvasText");
        expect(forced).toMatch(/\.tail\s*\{\s*display: none/);
        const style = source.slice(source.indexOf("<style>"));
        expect(style.replace(/\/\*[\s\S]*?\*\//g, "")).not.toMatch(/\d+px/);
    });
});
