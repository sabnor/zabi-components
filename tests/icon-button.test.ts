import { cleanup, render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import IconButton from "../src/components/atoms/IconButton.svelte";
import IconButtonHarness from "./fixtures/IconButtonHarness.svelte";

afterEach(() => {
    cleanup();
});

const classesOf = (element: HTMLElement) => element.className.split(/\s+/);

describe("IconButton", () => {
    describe("size", () => {
        it("renders xs as a 24px box", () => {
            render(IconButton, { size: "xs", label: "Edit" });
            const classes = classesOf(screen.getByRole("button", { name: "Edit" }));

            expect(classes).toContain("size-6");
            expect(classes).not.toContain("size-10");
        });

        it.each([
            ["xs", "size-6"],
            ["sm", "size-8"],
            ["md", "size-10"],
            ["lg", "size-12"],
        ] as const)("renders %s with no invisible hit-area layer", (size, box) => {
            // An `xs` touch overlay once reached 10px past the box and covered
            // the visible edge of the button beside it; the box is the target.
            render(IconButton, { size, label: "Edit" });
            const classes = classesOf(screen.getByRole("button", { name: "Edit" }));

            expect(classes).toContain(box);
            expect(classes.some((c) => c.includes("before:"))).toBe(false);
        });
    });

    describe("pressed", () => {
        it("renders no aria-pressed when pressed is undefined", () => {
            render(IconButton, { label: "Edit" });
            expect(
                screen.getByRole("button", { name: "Edit" }).hasAttribute("aria-pressed"),
            ).toBe(false);
        });

        it.each([true, false])("renders aria-pressed=%s when defined", (pressed) => {
            render(IconButton, { label: "Bold", pressed });
            expect(
                screen.getByRole("button", { name: "Bold" }).getAttribute("aria-pressed"),
            ).toBe(String(pressed));
        });

        it.each(["primary", "secondary", "danger", "ghost", "outline", "link", "accent"] as const)(
            "gives a pressed %s button an outline and a fill that hover does not use",
            (variant) => {
                render(IconButton, { label: "Off", variant, pressed: false });
                render(IconButton, { label: "On", variant, pressed: true });
                const off = classesOf(screen.getByRole("button", { name: "Off" }));
                const on = classesOf(screen.getByRole("button", { name: "On" }));

                // Shape, not only colour.
                expect(on).toContain("outline-2");
                expect(on).toContain("-outline-offset-2");
                expect(on).toContain("outline-current");
                expect(off).not.toContain("outline-2");

                const restingFill = (classes: string[]) =>
                    classes.find((c) => c.startsWith("bg-"));
                const hoverFill = off
                    .find((c) => c.startsWith("hover:bg-"))
                    ?.replace("hover:", "");
                expect(restingFill(on)).toBeDefined();
                expect(restingFill(on)).not.toBe(restingFill(off));
                expect(restingFill(on)).not.toBe(hoverFill);
                // One fill survives the merge, so stylesheet order cannot pick.
                expect(on.filter((c) => c.startsWith("bg-"))).toHaveLength(1);
            },
        );

        /**
         * A toggled-on button, held down. Its pressed fill was its hover fill,
         * so with a mouse (which is already hovering) the press showed nothing,
         * and on touch the step was 1.24:1 (ghost) and 1.18:1 (danger tone)
         * against the resting fill. The `-subtle-active` roles are a step of
         * their own; scripts/contrast-pairs.js holds them to 1.25:1.
         */
        it.each([
            ["ghost", undefined, "action-primary-subtle"],
            ["outline", undefined, "action-primary-subtle"],
            ["link", undefined, "action-primary-subtle"],
            ["ghost", "danger", "action-danger-subtle"],
            ["outline", "danger", "action-danger-subtle"],
        ] as const)("a toggled-on %s button (tone %s) is held on a fill past its hover fill", (variant, tone, role) => {
            render(IconButton, { label: "On", variant, tone, pressed: true });
            const on = classesOf(screen.getByRole("button", { name: "On" }));
            expect(on).toContain(`bg-${role}`);
            expect(on).toContain(`hover:bg-${role}-hover`);
            expect(on).toContain(`active:bg-${role}-active`);
        });

        it("flips a bound value on click", async () => {
            const user = userEvent.setup();
            render(IconButtonHarness, { mode: "bind" });
            const button = screen.getByRole("button", { name: "Bold" });

            expect(button.getAttribute("aria-pressed")).toBe("false");
            await user.click(button);
            expect(button.getAttribute("aria-pressed")).toBe("true");
            expect(screen.getByTestId("bound").textContent).toBe("true");
            await user.keyboard(" ");
            expect(button.getAttribute("aria-pressed")).toBe("false");
            expect(screen.getByTestId("bound").textContent).toBe("false");
        });

        it("stays in step with a parent that flips its own state in onclick", async () => {
            const user = userEvent.setup();
            render(IconButtonHarness, { mode: "one-way" });
            const button = screen.getByRole("button", { name: "Bold" });

            await user.click(button);
            expect(button.getAttribute("aria-pressed")).toBe("true");
            expect(screen.getByTestId("bound").textContent).toBe("true");
            await user.click(button);
            expect(button.getAttribute("aria-pressed")).toBe("false");
            expect(screen.getByTestId("bound").textContent).toBe("false");
        });

        it("keeps its state when onclick prevents the default", async () => {
            const user = userEvent.setup();
            render(IconButtonHarness, { mode: "veto" });
            const button = screen.getByRole("button", { name: "Bold" });

            await user.click(button);
            expect(button.getAttribute("aria-pressed")).toBe("false");
        });

        it("still calls onclick and never adds aria-pressed to a plain button", async () => {
            const user = userEvent.setup();
            const onclick = vi.fn();
            render(IconButton, { label: "Edit", onclick });
            const button = screen.getByRole("button", { name: "Edit" });

            await user.click(button);
            expect(onclick).toHaveBeenCalledTimes(1);
            expect(button.hasAttribute("aria-pressed")).toBe(false);
        });
    });

    describe("tone", () => {
        it.each(["ghost", "outline"] as const)(
            "styles a danger %s button with the danger tokens and focus ring",
            (variant) => {
                render(IconButton, { label: "Delete", variant, tone: "danger" });
                const classes = classesOf(screen.getByRole("button", { name: "Delete" }));

                expect(classes).toContain("bg-transparent");
                expect(classes).toContain("text-error");
                expect(classes).not.toContain("text-headline");
                expect(classes).toContain("hover:bg-action-danger-subtle");
                expect(classes).toContain("active:bg-action-danger-subtle-hover");
                expect(classes).toContain("focus-ring--danger");
                expect(classes).not.toContain("focus-ring--muted");
                expect(classes).not.toContain("hover:bg-surface-hover");
            },
        );

        it("gives the danger outline a danger border", () => {
            render(IconButton, { label: "Delete", variant: "outline", tone: "danger" });
            const classes = classesOf(screen.getByRole("button", { name: "Delete" }));
            expect(classes).toContain("border-error-border");
            expect(classes).not.toContain("border-border");
        });

        it("leaves ghost unchanged by default", () => {
            render(IconButton, { label: "Edit", variant: "ghost" });
            const classes = classesOf(screen.getByRole("button", { name: "Edit" }));
            expect(classes).toContain("text-headline");
            expect(classes).toContain("hover:bg-surface-hover");
            expect(classes).toContain("focus-ring--muted");
            expect(classes).not.toContain("text-error");
        });

        it("is ignored by the solid variants", () => {
            render(IconButton, { label: "Save", variant: "primary", tone: "danger" });
            const classes = classesOf(screen.getByRole("button", { name: "Save" }));
            expect(classes).toContain("bg-action-primary");
            expect(classes).not.toContain("text-error");
        });

        it("keeps the danger colours when pressed", () => {
            render(IconButton, {
                label: "Delete",
                variant: "ghost",
                tone: "danger",
                pressed: true,
            });
            const classes = classesOf(screen.getByRole("button", { name: "Delete" }));
            expect(classes).toContain("bg-action-danger-subtle");
            expect(classes).toContain("text-error");
            expect(classes).toContain("outline-2");
        });
    });

    it("takes its accessible name from label", () => {
        render(IconButton, { label: "Favorite", size: "xs", pressed: true });
        expect(screen.getByRole("button", { name: "Favorite" })).toBeTruthy();
    });
});
