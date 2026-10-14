import { cleanup, render, screen } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";

import Badge from "../src/components/atoms/Badge.svelte";
import Button from "../src/components/atoms/Button.svelte";
import Heading from "../src/components/atoms/Heading.svelte";
import IconButton from "../src/components/atoms/IconButton.svelte";
import Rating from "../src/components/atoms/Rating.svelte";
import Text from "../src/components/atoms/Text.svelte";
import Tabs from "../src/components/molecules/Tabs.svelte";
import AccentHarness from "./fixtures/AccentHarness.svelte";

/**
 * The accent role had tokens and no component that used them: `Button` had no
 * accent variant, and `Heading` and `Text` could only be the page's own text
 * colours, so an app painting a brand block passed a colour class every time.
 *
 * These read the classes each component ends up with. Whether those classes
 * paint what they say (the state variants of `.bg-accent` did not) is a
 * stylesheet question: scripts/check-state-variants.js holds the rules, and
 * playwright/accent.spec.ts measures them in a browser.
 */

afterEach(() => cleanup());

const classesOf = (element: Element) => (element.getAttribute("class") ?? "").split(/\s+/);

describe('Button and IconButton variant="accent"', () => {
    it("is the accent fill with its own label colour and its own hover and pressed fills", () => {
        render(Button, { variant: "accent", text: "Spela" });
        const classes = classesOf(screen.getByRole("button", { name: "Spela" }));
        for (const name of ["bg-accent", "text-on-accent", "hover:bg-accent-hover", "active:bg-accent-active"]) {
            expect(classes).toContain(name);
        }
        // Not the primary button's fill or label by another name.
        expect(classes.some((name) => name.includes("action-primary"))).toBe(false);
        // The default ring, as on a primary button; the offset gap separates it from the fill.
        expect(classes).toContain("focus-ring");
        expect(classes.some((name) => name.startsWith("focus-ring--"))).toBe(false);
    });

    it("is disabled the way the other solid variants are", () => {
        render(Button, { variant: "accent", text: "Accent", disabled: true });
        render(Button, { variant: "primary", text: "Primary", disabled: true });
        const disabledOf = (name: string) =>
            classesOf(screen.getByRole("button", { name })).filter((c) => c.startsWith("disabled:")).sort();
        expect(disabledOf("Accent")).toEqual(disabledOf("Primary"));
        expect(disabledOf("Accent")).toContain("disabled:bg-action-disabled");
    });

    it("IconButton has the same variant, and its toggled-on fill is the accent's pressed step", () => {
        render(IconButton, { variant: "accent", label: "Off", pressed: false });
        render(IconButton, { variant: "accent", label: "On", pressed: true });
        const off = classesOf(screen.getByRole("button", { name: "Off" }));
        const on = classesOf(screen.getByRole("button", { name: "On" }));
        expect(off).toContain("bg-accent");
        expect(off).toContain("text-on-accent");
        expect(off).toContain("hover:bg-accent-hover");
        expect(off).toContain("active:bg-accent-active");
        // One fill survives the merge, so the stylesheet's order cannot pick.
        expect(on.filter((name) => name.startsWith("bg-"))).toEqual(["bg-accent-active"]);
        expect(on).toContain("outline-2");
    });
});

describe('Badge variant="accent"', () => {
    it("is built like its siblings: a tinted fill with its text step, or the solid fill with its label", () => {
        render(Badge, { variant: "accent", text: "Nytt" });
        render(Badge, { variant: "accent", emphasis: "solid", text: "Solid" });
        const subtle = classesOf(screen.getByText("Nytt"));
        const solid = classesOf(screen.getByText("Solid"));
        expect(subtle).toEqual(expect.arrayContaining(["bg-accent-subtle", "text-accent-text", "border-transparent"]));
        expect(subtle).not.toContain("border-accent-border");
        expect(solid).toEqual(expect.arrayContaining(["bg-accent", "text-on-accent", "border-transparent"]));
        // A status badge puts the card colour on its fill; an accent may be a yellow, where that is white on yellow.
        expect(solid).not.toContain("text-card");
    });

    it("leaves energetic on its own family", () => {
        render(Badge, { variant: "energetic", text: "Energetic" });
        const classes = classesOf(screen.getByText("Energetic"));
        expect(classes).toContain("bg-energetic-subtle");
        expect(classes.some((name) => name.includes("accent"))).toBe(false);
    });
});

describe("Heading and Text on a filled block", () => {
    it.each([
        [undefined, "text-headline"],
        ["headline", "text-headline"],
        ["inherit", "text-inherit"],
        ["on-brand", "text-on-brand"],
        ["on-accent", "text-on-accent"],
    ] as const)("Heading tone %s is %s, and nothing else sets its colour", (tone, expected) => {
        render(Heading, { level: 2, text: "Rubrik", tone });
        const classes = classesOf(screen.getByRole("heading", { name: "Rubrik" }));
        const colours = classes.filter((name) => /^text-(headline|inherit|on-brand|on-accent|body)$/.test(name));
        expect(colours).toEqual([expected]);
    });

    it("Text has the same three tones, and keeps the six it had", () => {
        render(AccentHarness);
        // Text takes no rest attributes; the harness marks each one with a class.
        const toneOf = (marked: string) =>
            classesOf(document.querySelector(`.probe-${marked.replace(/^text-/, "")}`)!).filter((name) =>
                /^text-(?!xs|sm|base|lg)/.test(name),
            );
        expect(toneOf("text-inherit")).toEqual(["text-inherit"]);
        expect(toneOf("text-on-brand")).toEqual(["text-on-brand"]);
        expect(toneOf("text-on-accent")).toEqual(["text-on-accent"]);
        expect(toneOf("text-body")).toEqual(["text-body"]);
        expect(toneOf("text-description")).toEqual(["text-description"]);
        expect(toneOf("text-error")).toEqual(["text-error"]);
    });
});

describe("the selected pill Tab, held down", () => {
    /**
     * Its pressed fill was the hover step of the subtle fill: 1.24:1 from the
     * resting fill in light, under the 1.25:1 a pressed fill is held to. It
     * is the pressed role now, and the label darkens with it through
     * `.text-link:active`; scripts/contrast-pairs.js holds both.
     */
    it("uses the pressed role of its fill, with the link colour as its label", () => {
        render(Tabs, {
            variant: "pills",
            activeTab: "a",
            tabs: [
                { id: "a", label: "Lista" },
                { id: "b", label: "Månad" },
            ],
        });
        const selected = classesOf(screen.getByRole("tab", { name: "Lista" }));
        const idle = classesOf(screen.getByRole("tab", { name: "Månad" }));
        expect(selected).toEqual(
            expect.arrayContaining(["bg-action-primary-subtle", "text-link", "active:bg-action-primary-subtle-active"]),
        );
        expect(selected).not.toContain("active:bg-action-primary-subtle-hover");
        // An unselected pill has no fill of its own, so its pressed state is the tint.
        expect(idle).toContain("active:bg-surface-active");
    });
});

describe("Rating tone", () => {
    it.each([
        [undefined, "primary"],
        ["primary", "primary"],
        ["accent", "accent"],
    ] as const)("tone %s is on the host as data-tone=%s, interactive and read-only", (tone, expected) => {
        const { container, unmount } = render(Rating, { label: "Quiz", value: 3, tone });
        expect(container.querySelector(".rating")?.getAttribute("data-tone")).toBe(expected);
        unmount();
        const shown = render(Rating, { label: "Quiz", value: 3.5, readonly: true, tone });
        expect(shown.container.querySelector(".rating")?.getAttribute("data-tone")).toBe(expected);
    });
});
