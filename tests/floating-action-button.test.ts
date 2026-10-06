import Pencil from "@lucide/svelte/icons/pencil";
import { cleanup, render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import FloatingActionButton from "../src/components/atoms/FloatingActionButton.svelte";
import MobileFormHarness from "./fixtures/MobileFormHarness.svelte";

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

describe("FloatingActionButton semantics", () => {
    it("is a button named by its label, with a decorative icon", () => {
        render(FloatingActionButton, { props: { label: "New quiz" } });
        const button = screen.getByRole("button", { name: "New quiz" });
        expect(button.tagName).toBe("BUTTON");
        expect(button.getAttribute("type")).toBe("button");
        expect(button.getAttribute("aria-label")).toBe("New quiz");
        expect(button.textContent?.trim(), "No visible text unless extended").toBe("");
        const icon = button.querySelector("svg")!;
        expect(icon.closest('[aria-hidden="true"]')).not.toBeNull();
        // A plus sign unless told otherwise.
        expect(icon.getAttribute("class")).toContain("lucide-plus");
    });

    it("draws the icon it is given", () => {
        render(FloatingActionButton, { props: { label: "Write", icon: Pencil } });
        expect(screen.getByRole("button").querySelector("svg")!.getAttribute("class")).toContain(
            "lucide-pencil",
        );
    });

    it("extended: shows the label as its text, which then names it", () => {
        render(FloatingActionButton, { props: { label: "Write a question", extended: true } });
        const button = screen.getByRole("button", { name: "Write a question" });
        expect(button.textContent?.trim()).toBe("Write a question");
        expect(button.hasAttribute("aria-label")).toBe(false);
        expect(button.querySelector("svg")).not.toBeNull();
    });

    it("is a link with href, and keeps its name", () => {
        render(FloatingActionButton, { props: { label: "New quiz", href: "/quiz/new" } });
        const link = screen.getByRole("link", { name: "New quiz" });
        expect(link.getAttribute("href")).toBe("/quiz/new");
        expect(screen.queryByRole("button")).toBeNull();
    });

    it("passes other attributes through and merges class", () => {
        render(FloatingActionButton, {
            props: { label: "New quiz", class: "bottom-24", "data-testid": "fab", id: "new-quiz" },
        });
        const button = screen.getByTestId("fab");
        expect(button.id).toBe("new-quiz");
        expect(button.className).toContain("bottom-24");
        expect(button.className, "A call-site offset replaces the built-in one").not.toContain(
            "--fab-bottom-offset",
        );
    });
});

describe("FloatingActionButton interaction", () => {
    it("runs onclick on a click and on Enter and Space", async () => {
        const user = userEvent.setup();
        const onclick = vi.fn();
        render(FloatingActionButton, { props: { label: "New quiz", onclick } });
        await user.tab();
        expect(document.activeElement).toBe(screen.getByRole("button"));
        await user.click(screen.getByRole("button"));
        await user.keyboard("{Enter}");
        await user.keyboard(" ");
        expect(onclick).toHaveBeenCalledTimes(3);
    });

    it("has a focus ring, a pressed state and an outline for forced colours", () => {
        render(FloatingActionButton, { props: { label: "New quiz" } });
        const classes = screen.getByRole("button").className;
        expect(classes).toContain("focus-ring");
        expect(classes).toContain("active:scale-[0.96]");
        expect(classes).toContain("motion-reduce:active:scale-100");
        expect(classes).toContain("border-transparent");
        // Primary action tokens.
        expect(classes).toContain("bg-action-primary");
        expect(classes).toContain("text-action-primary");
        expect(classes).toContain("shadow-lg");
    });

    it("is 56px round in px, with a 44px target to spare", () => {
        render(FloatingActionButton, { props: { label: "New quiz" } });
        const button = screen.getByRole("button");
        // In px: the round button does not grow with the text size.
        expect(button.className).toContain("size-[56px]");
        expect(button.className).not.toContain("min-h-14");
        expect(button.className).toContain("rounded-pill");
        expect(button.querySelector("svg")!.parentElement!.className).toContain("size-[24px]");
    });

    it("extended: its height follows the text size", () => {
        render(FloatingActionButton, { props: { label: "Write", extended: true } });
        const classes = screen.getByRole("button").className;
        expect(classes).toContain("min-h-14");
        expect(classes).toContain("min-w-14");
        expect(classes).not.toContain("size-[56px]");
    });
});

describe("FloatingActionButton placement", () => {
    it("on its own: fixed above the home indicator, 16px from the end edge, liftable", () => {
        render(FloatingActionButton, { props: { label: "New quiz" } });
        const button = screen.getByRole("button");
        expect(button.getAttribute("data-position")).toBe("bottom-end");
        const classes = button.className;
        expect(classes).toMatch(/(^|\s)fixed(\s|$)/);
        expect(classes).toContain(
            "bottom-[calc(env(safe-area-inset-bottom,0px)+var(--fab-bottom-offset,0px)+16px)]",
        );
        expect(classes).toContain("end-[calc(16px+max(");
        expect(classes).not.toContain("--app-shell-bottom-inset");
    });

    it("in an AppShell: placed against the shell, above its bottom inset", () => {
        render(MobileFormHarness, { props: { piece: "fab-in-shell" } });
        const classes = screen.getByRole("button", { name: "New quiz" }).className;
        expect(classes).toMatch(/(^|\s)absolute(\s|$)/);
        expect(classes).not.toMatch(/(^|\s)fixed(\s|$)/);
        expect(classes).toContain(
            "bottom-[calc(var(--app-shell-bottom-inset,0px)+var(--fab-bottom-offset,0px)+16px)]",
        );
        expect(screen.getByTestId("shell").contains(screen.getByRole("button"))).toBe(true);
    });

    it.each([
        ["bottom-start", "start-[calc(16px+max("],
        ["bottom-center", "inset-x-0"],
        ["bottom-end", "end-[calc(16px+max("],
    ] as const)("position %s uses logical sides", (position, expected) => {
        render(FloatingActionButton, { props: { label: "New quiz", position } });
        const button = screen.getByRole("button");
        expect(button.getAttribute("data-position")).toBe(position);
        expect(button.className).toContain(expected);
        expect(button.className).not.toMatch(/(^|\s)(left|right)-\[/);
    });
});
