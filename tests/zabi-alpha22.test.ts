import Bell from "@lucide/svelte/icons/bell";
import House from "@lucide/svelte/icons/house";
import Trophy from "@lucide/svelte/icons/trophy";
import { createRawSnippet } from "svelte";
import { cleanup, render, screen, within } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

import Button from "../src/components/atoms/Button.svelte";
import Card from "../src/components/atoms/Card.svelte";
import Skeleton from "../src/components/atoms/Skeleton.svelte";
import BottomTabBar from "../src/components/molecules/BottomTabBar.svelte";
import Stepper from "../src/components/molecules/Stepper.svelte";
import type { BottomTabBarItem } from "../src/components/util/bottom-tab-bar";
import SkeletonStepperHarness from "./fixtures/SkeletonStepperHarness.svelte";

afterEach(cleanup);

const body = createRawSnippet(() => ({ render: () => `<span>Ny inbjudan</span>` }));
const classesOf = (element: Element) => (element.getAttribute("class") ?? "").split(/\s+/);

describe("Card loading (Z-108)", () => {
    it("a loading submit card is busy and unavailable, not disabled, and stays a Tab stop", async () => {
        render(Card, { props: { type: "submit", loading: true, children: body } });
        const card = screen.getByRole("button", { name: /Ny inbjudan/ });
        expect(card.getAttribute("aria-busy")).toBe("true");
        expect(card.getAttribute("aria-disabled")).toBe("true");
        expect((card as HTMLButtonElement).disabled).toBe(false);
        await userEvent.tab();
        expect(document.activeElement).toBe(card);
        expect(classesOf(card)).toContain("min-h-11");
    });

    it("swallows the press: nothing is submitted and onclick does not run", async () => {
        const form = document.createElement("form");
        document.body.appendChild(form);
        const submit = vi.fn((event: Event) => event.preventDefault());
        form.addEventListener("submit", submit);
        const onclick = vi.fn();
        render(Card, { target: form, props: { type: "submit", loading: true, onclick, children: body } });
        await userEvent.click(screen.getByRole("button"));
        await userEvent.keyboard("{Enter}");
        expect(submit).not.toHaveBeenCalled();
        expect(onclick).not.toHaveBeenCalled();
        form.remove();
    });

    it("holds the pressed look: no hover or pressed rule left", () => {
        render(Card, { props: { type: "button", loading: true, children: body } });
        const classes = classesOf(screen.getByRole("button"));
        expect(classes).toContain("bg-card-active");
        expect(classes).toContain("cursor-progress");
        expect(classes.some((name) => name.startsWith("hover:") || name.startsWith("active:"))).toBe(false);
    });

    it("is as before without loading, with disabled, and on a link or a plain card", () => {
        render(Card, { props: { type: "submit", children: body } });
        expect(screen.getByRole("button").hasAttribute("aria-busy")).toBe(false);
        cleanup();
        render(Card, { props: { type: "submit", loading: true, disabled: true, children: body } });
        expect((screen.getByRole("button") as HTMLButtonElement).disabled).toBe(true);
        expect(screen.getByRole("button").hasAttribute("aria-busy")).toBe(false);
        cleanup();
        render(Card, { props: { href: "/x", loading: true, children: body } });
        expect(screen.getByRole("link").hasAttribute("aria-busy")).toBe(false);
    });
});

const items: BottomTabBarItem[] = [
    { href: "/", label: "Home", icon: House },
    { href: "/pubs", label: "Pubs", icon: Trophy },
    { href: "/inbox", label: "Inbox", icon: Bell },
];

describe("BottomTabBar pending (Z-109)", () => {
    const link = (name: RegExp) => within(screen.getByRole("navigation")).getByRole("link", { name });

    it("the mark moves to the pending tab; aria-current stays on active, and the pending link is busy", () => {
        render(BottomTabBar, { props: { items, active: "/", pending: "/pubs" } });
        expect(link(/^Home/).getAttribute("aria-current")).toBe("page");
        expect(link(/^Pubs/).hasAttribute("aria-current")).toBe(false);
        expect(link(/^Pubs/).getAttribute("aria-busy")).toBe("true");
        expect(link(/^Pubs/).className).toContain("font-semibold");
        expect(link(/^Home/).className).not.toContain("font-semibold");
        expect(link(/^Pubs/).querySelector("span")!.className).toContain("bg-tabbar-active");
    });

    it("without pending, or with one that matches nothing, the mark and aria-current are one", () => {
        render(BottomTabBar, { props: { items, active: "/pubs" } });
        expect(link(/^Pubs/).getAttribute("aria-current")).toBe("page");
        expect(link(/^Pubs/).className).toContain("font-semibold");
        cleanup();
        render(BottomTabBar, { props: { items, active: "/pubs", pending: "/nowhere" } });
        expect(link(/^Pubs/).getAttribute("aria-current")).toBe("page");
        expect(screen.getByRole("navigation").querySelector("[aria-busy]")).toBeNull();
    });

    it("pending on the active tab changes nothing", () => {
        render(BottomTabBar, { props: { items, active: "/pubs", pending: "/pubs" } });
        expect(link(/^Pubs/).getAttribute("aria-current")).toBe("page");
        expect(link(/^Pubs/).hasAttribute("aria-busy")).toBe(false);
    });
});

describe("Button in forced colours (Z-110)", () => {
    const edge = "forced-colors:border-[color:ButtonBorder]";

    it("every variant drawn by its fill has a system-colour edge there", () => {
        for (const variant of ["primary", "accent", "secondary", "danger", "tonal"] as const) {
            render(Button, { text: "Go", variant });
            const classes = classesOf(screen.getByRole("button"));
            expect(classes, variant).toContain(edge);
            expect(classes, variant).toContain("forced-colors:border");
            cleanup();
        }
    });

    it("ghost, link and text stay bare; outline keeps its own border", () => {
        for (const variant of ["ghost", "link", "text", "outline"] as const) {
            render(Button, { text: "Go", variant });
            expect(classesOf(screen.getByRole("button")), variant).not.toContain(edge);
            cleanup();
        }
    });

    it("disabled and loading buttons, and a disabled link, have the disabled-text edge", () => {
        render(Button, { text: "Go", disabled: true });
        expect(classesOf(screen.getByRole("button"))).toContain("disabled:forced-colors:border-[color:GrayText]");
        cleanup();
        render(Button, { text: "Go", loading: true, variant: "outline" });
        expect(classesOf(screen.getByRole("button"))).toContain("forced-colors:border-[color:GrayText]");
        cleanup();
        render(Button, { text: "Go", href: "/x", disabled: true });
        expect(classesOf(screen.getByRole("link"))).toContain("forced-colors:border-[color:GrayText]");
    });
});

describe("Stepper in a SkeletonGroup (Z-111)", () => {
    it("the group is the one status; the stepper has none of its own there", () => {
        const { container } = render(SkeletonStepperHarness);
        expect(container.querySelectorAll('[role="status"]')).toHaveLength(1);
        expect(container.querySelector("[data-stepper-status]")).toBeNull();
        expect(screen.getByRole("status", { name: "Laddar" })).toBeTruthy();
    });

    it("a stepper on its own keeps its status", () => {
        const { container } = render(Stepper, { props: { steps: ["One", "Two"], current: 0 } });
        expect(container.querySelectorAll("[data-stepper-status]")).toHaveLength(1);
    });
});

describe("Skeleton box at zero specificity (Z-112)", () => {
    it("the variant's width and height are written at :where() specificity, whole", () => {
        const { container } = render(Skeleton, { props: { variant: "circle", class: "size-sticker" } });
        const classes = classesOf(container.firstElementChild!);
        expect(classes).toContain("[:where(&)]:w-10");
        expect(classes).toContain("size-sticker");
        expect(classes).not.toContain("w-10");
        expect(classes).toContain("aspect-square");
    });

    it("text and block keep their default size classes at the same specificity", () => {
        const text = render(Skeleton).container.firstElementChild!;
        expect(classesOf(text)).toEqual(expect.arrayContaining(["[:where(&)]:w-full", "[:where(&)]:h-3"]));
        cleanup();
        const block = render(Skeleton, { props: { variant: "block" } }).container.firstElementChild!;
        expect(classesOf(block)).toEqual(expect.arrayContaining(["[:where(&)]:w-full", "[:where(&)]:h-32"]));
    });
});

describe("z-fixed class (Z-113)", () => {
    it("sits beside the other layer classes and reads --z-fixed", () => {
        const css = readFileSync(resolve(process.cwd(), "src/app.css"), "utf8");
        expect(css).toMatch(/\.z-fixed\s*\{\s*z-index:\s*var\(--z-fixed\);\s*\}/);
    });
});
