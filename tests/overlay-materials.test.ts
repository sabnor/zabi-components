import { cleanup, render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { createRawSnippet } from "svelte";
import fs from "node:fs";
import path from "node:path";
import { afterEach, beforeAll, describe, expect, it } from "vitest";

import Select from "../src/components/atoms/Select.svelte";
import Toast from "../src/components/atoms/Toast.svelte";
import Tooltip from "../src/components/atoms/Tooltip.svelte";
import Toaster from "../src/components/molecules/Toaster.svelte";
import { pushToast, toastStore } from "../src/components/molecules/toast-store.js";
import DropdownOptionsHarness from "./fixtures/DropdownOptionsHarness.svelte";
import ModalFullScreenHarness from "./fixtures/ModalFullScreenHarness.svelte";

/**
 * The overlays sit on the thick material (9.0). A Modal, Drawer or BottomSheet
 * must not carry a backdrop-filter on the element that holds the content: it
 * would become the containing block of every fixed-position popover inside it,
 * and only while the material is on. So those three take the layer form, which
 * paints the glass on a ::before. (Drawer and BottomSheet are in their own test files.)
 */

const classesOf = (element: Element | null | undefined) =>
    (element?.getAttribute("class") ?? "").split(/\s+/).filter(Boolean);

beforeAll(() => {
    if (!Element.prototype.animate) {
        Element.prototype.animate = function () {
            const animation = {
                onfinish: null as null | (() => void),
                cancel() {},
                finish() {},
                currentTime: 0,
                effect: { getComputedTiming: () => ({ progress: 1 }) },
            };
            queueMicrotask(() => animation.onfinish?.());
            return animation as unknown as Animation;
        };
    }
});

afterEach(() => {
    toastStore.clear();
    cleanup();
});

const text = (label: string) => createRawSnippet(() => ({ render: () => `<button type="button">${label}</button>` }));

describe("the layer form of the material in app.css", () => {
    const css = fs.readFileSync(path.resolve(__dirname, "../src/app.css"), "utf-8");
    const rule = (selector: string) => {
        const start = css.indexOf(`${selector} {`);
        expect(start).toBeGreaterThan(-1);
        return css.slice(start, css.indexOf("}", start));
    };

    it("puts the filter on the ::before, never on the element, and reads the thick tokens", () => {
        const element = rule(".material-layer-thick");
        expect(element).not.toMatch(/backdrop-filter|[^-]filter:|transform|contain:|will-change/);
        expect(element).toContain("isolation: isolate");
        const layer = rule(".material-layer-thick::before");
        expect(layer).toContain("backdrop-filter: var(--material-filter-thick)");
        expect(layer).toContain("background-color: var(--color-material-thick)");
        expect(layer).toContain("z-index: -1");
    });
});

describe("Modal", () => {
    it("holds its content in a panel with the layer form, which does not scroll", () => {
        render(ModalFullScreenHarness, { initialOpen: true });
        const panel = screen.getByRole("dialog");
        const classes = classesOf(panel);
        expect(classes).toContain("material-layer-thick");
        expect(classes).not.toContain("material-thick");
        expect(classes).not.toContain("shadow-lg");
        expect(classes).not.toContain("bg-surface-overlay");
        expect(classes).not.toContain("border-border-overlay");
        expect(classes).not.toContain("overflow-y-auto");
        // The Card is what scrolls, so the layer behind it stays where it is.
        expect(classesOf(panel.firstElementChild)).toContain("overflow-y-auto");
        expect(panel.getAttribute("aria-modal")).toBe("true");
    });

    it("reads the motion tokens for its entry", () => {
        render(ModalFullScreenHarness, { initialOpen: true });
        const cls = classesOf(screen.getByRole("dialog")).join(" ");
        expect(cls).toContain("animate-[slideUp_var(--duration-slow)_var(--ease-out)]");
        expect(cls).not.toContain("0.3s");
    });
});

describe("Dropdown and Select menus", () => {
    it("a Dropdown menu is the layer form (it may hold fixed-position content) with no shadow class", async () => {
        render(DropdownOptionsHarness, { initialOpen: true });
        const menu = (await screen.findByRole("menu")).parentElement!;
        const classes = classesOf(menu);
        expect(classes).toContain("material-layer-thick");
        expect(classes).not.toContain("shadow-lg");
        expect(classes).not.toContain("bg-surface-overlay");
        expect(classes).not.toContain("border-border-overlay");
        expect(classes.join(" ")).toContain("duration-(--duration-moderate)");
        expect(classes).not.toContain("duration-200");
    });

    it("a Select listbox is a Dropdown menu, so it carries the same material", async () => {
        const user = userEvent.setup();
        render(Select, { props: { options: [{ value: "a", label: "Alpha" }, { value: "b", label: "Beta" }] } });
        await user.click(screen.getByRole("combobox"));
        const listbox = await screen.findByRole("listbox");
        expect(classesOf(listbox.parentElement)).toContain("material-layer-thick");
        // Options keep their opaque fills.
        const option = screen.getAllByRole("option")[0];
        expect(classesOf(option).join(" ")).toContain("hover:bg-surface-overlay-hover");
    });
});

describe("Tooltip tone", () => {
    const bubble = (props: Record<string, unknown> = {}) => {
        render(Tooltip, { props: { content: "Help", children: text("Trigger"), ...props } });
        return screen.getByRole("tooltip", { hidden: true });
    };

    it("is the thick material with body text by default, with no arrow", () => {
        const el = bubble();
        const classes = classesOf(el);
        expect(el.getAttribute("data-tone")).toBe("material");
        expect(classes).toContain("material-thick");
        expect(classes).toContain("text-body");
        expect(classes).not.toContain("shadow-lg");
        expect(classes).not.toContain("bg-tooltip-bg");
        expect(classes).not.toContain("text-tooltip-fg");
        expect(classes.join(" ")).toContain("duration-(--duration-moderate)");
    });

    it('tone="inverted" is the 8.1 bubble', () => {
        const el = bubble({ tone: "inverted" });
        const classes = classesOf(el);
        expect(el.getAttribute("data-tone")).toBe("inverted");
        expect(classes).toEqual(expect.arrayContaining(["bg-tooltip-bg", "text-tooltip-fg"]));
        expect(classes).not.toContain("material-thick");
    });
});

describe("Toast", () => {
    it.each([
        ["success", "border-success", "text-success-text"],
        ["error", "border-error", "text-error-text"],
        ["warning", "border-warning", "text-warning-text"],
        ["info", "border-transparent", "text-body"],
    ] as const)("%s sits on the thick material, with its status in the border and text", (type, border, color) => {
        render(Toast, { props: { type, message: "Saved", layout: "inline" } });
        const classes = classesOf(screen.getByRole("alert"));
        expect(classes).toContain("material-thick");
        expect(classes).not.toContain("shadow-lg");
        expect(classes).not.toContain("bg-surface-overlay");
        expect(classes).toEqual(expect.arrayContaining([border, color]));
    });

    it("a Toaster toast is on the material too", async () => {
        render(Toaster);
        pushToast({ type: "success", message: "Done", duration: 3000 });
        const toast = await screen.findByRole("group", { name: "Done" });
        const classes = classesOf(toast);
        expect(classes).toContain("material-thick");
        expect(classes).not.toContain("shadow-lg");
        expect(classes).not.toContain("bg-surface-overlay");
    });
});
