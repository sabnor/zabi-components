import { cleanup, render, screen } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";

import ActionPanel from "../src/components/atoms/ActionPanel.svelte";
import Checkbox from "../src/components/atoms/Checkbox.svelte";
import ColorPicker from "../src/components/atoms/ColorPicker.svelte";
import Input from "../src/components/atoms/Input.svelte";
import Radio from "../src/components/atoms/Radio.svelte";
import Select from "../src/components/atoms/Select.svelte";
import Skeleton from "../src/components/atoms/Skeleton.svelte";
import Textarea from "../src/components/atoms/Textarea.svelte";
import Header from "../src/components/molecules/Header.svelte";
import PropsTable from "../src/components/molecules/PropsTable.svelte";
import Section from "../src/components/molecules/Section.svelte";
import LightModeHarness from "./fixtures/LightModeHarness.svelte";
import NavMenuHarness from "./fixtures/NavMenuHarness.svelte";
import TableHarness from "./fixtures/TableHarness.svelte";

/**
 * Class-level pins for the light-mode surface fixes. jsdom applies no
 * stylesheet, so what these protect is the choice of token: a surface token
 * where a raw ramp step used to vanish on the light page, and no state
 * variant left beside a hand-written colour class it cannot beat. The
 * rendered colours were measured in a browser in both themes.
 */

afterEach(() => {
    cleanup();
});

const classesOf = (element: Element | null | undefined) =>
    (element?.getAttribute("class") ?? "").split(/\s+/);

describe("surfaces use tokens, not ramp steps", () => {
    it("Skeleton is a neutral fill that shows on a card and on the page", () => {
        render(Skeleton, { props: { "aria-label": "Loading" } });
        const classes = classesOf(screen.getByRole("status"));

        expect(classes).toContain("bg-neutral-subtle");
        expect(classes).not.toContain("bg-surface-2");
    });

    it("Table sits on the card surface with an elevated caption band", () => {
        const { container } = render(TableHarness);

        expect(classesOf(container.querySelector("table")?.parentElement)).toContain("bg-card");
        const caption = classesOf(container.querySelector("caption"));
        expect(caption).toContain("bg-surface-elevated");
        expect(caption).not.toContain("bg-base-50");
    });

    it("PropsTable's header band and empty box use surface tokens", () => {
        const filled = render(PropsTable, {
            props: { props: [{ name: "size", type: "string", required: false, description: "Size" }] },
        });
        expect(classesOf(filled.container.querySelector("thead tr"))).toEqual([
            "bg-surface-elevated",
        ]);
        expect(filled.container.innerHTML).not.toContain("bg-base-50");
        filled.unmount();

        const empty = render(PropsTable, { props: { props: [] } });
        expect(classesOf(screen.getByText("No documented props."))).toContain("bg-card");
        expect(empty.container.innerHTML).not.toContain("bg-base-50");
    });

    it("Header's variant chip is a neutral fill, not the page colour", () => {
        render(Header, {
            props: { title: "Button", description: "A button.", category: "atoms", variantsStates: ["primary"] },
        });
        const chip = classesOf(screen.getByText("primary"));

        expect(chip).toContain("bg-neutral-subtle");
        expect(chip).not.toContain("bg-base-100");
    });

    it("Section's accent background has no OS-driven dark variant", () => {
        const { container } = render(Section, { props: { background: "accent" } });

        expect(container.innerHTML).toContain("bg-brand-50");
        // The theme is the `.dark` class and the ramp mirrors under it; a
        // `dark:` variant follows the OS instead.
        expect(container.innerHTML).not.toContain("dark:");
    });
});

describe("menus share one edge and one surface", () => {
    const recipe = ["border", "border-border-overlay", "bg-surface-overlay"];

    it("Dropdown", () => {
        render(LightModeHarness);
        const popup = screen.getByTestId("dropdown").querySelector(".shadow-lg");

        expect(classesOf(popup)).toEqual(expect.arrayContaining(recipe));
        expect(classesOf(popup)).not.toContain("border-border");
    });

    it("NavigationMenuContent", async () => {
        const { container } = render(NavMenuHarness);
        (screen.getByRole("button", { name: "One" }) as HTMLButtonElement).click();
        await screen.findByText("Link A");
        const panel = container.querySelector(".z-dropdown");

        expect(classesOf(panel)).toEqual(expect.arrayContaining(recipe));
        expect(classesOf(panel)).not.toContain("border-border");
    });

    it("ColorPicker", async () => {
        const { container } = render(ColorPicker, { props: { value: "#336699" } });
        (screen.getByRole("button", { name: "Open color picker" }) as HTMLButtonElement).click();
        const popup = await screen.findByLabelText("Hue slider");

        const panel = popup.closest(".z-popover");
        expect(classesOf(panel)).toEqual(expect.arrayContaining(recipe));
        // `bg-input` is an inset surface in dark: the popover sat below its card.
        expect(classesOf(panel)).not.toContain("bg-input");
        expect(container.querySelector(".z-popover")).toBe(panel);
    });
});

describe("sidebar rings are at full strength", () => {
    it("has no ring at partial alpha and no ring colour without a token", () => {
        render(LightModeHarness);
        const html = ["panel", "panel-empty", "nav", "nav-empty"]
            .map((id) => screen.getByTestId(id).innerHTML)
            .join("");

        expect(html).not.toMatch(/ring-border\/\d/);
        expect(html).not.toContain("ring-border-focus");
    });

    it("rings the search fields like a field and the avatar with the border colour", () => {
        render(LightModeHarness);

        for (const id of ["panel", "nav"]) {
            const search = screen.getByTestId(id).querySelector('input[type="search"]');
            expect(classesOf(search), id).toEqual(
                expect.arrayContaining(["ring-1", "ring-input-border"]),
            );
        }
        expect(classesOf(screen.getByText("AL"))).toEqual(
            expect.arrayContaining(["ring-1", "ring-border"]),
        );
    });

    it("leaves the dashed empty boxes with their dashed border alone", () => {
        render(LightModeHarness);

        for (const id of ["panel-empty", "nav-empty"]) {
            const box = classesOf(screen.getByTestId(id).querySelector(".border-dashed"));
            expect(box, id).toContain("border-border");
            // A solid ring outside a dashed border reads as a solid border.
            expect(box, id).not.toContain("ring-1");
        }
    });
});

describe("state variants that used to lose to a hand-written colour class", () => {
    it("ActionPanel layers its hover tint over the card instead of replacing the fill", async () => {
        const { rerender } = render(ActionPanel, {
            props: { title: "Billing", description: "Invoices", onclick: () => {} },
        });
        const enabled = classesOf(screen.getByRole("button", { name: "Billing" }));

        expect(enabled).toContain("bg-card");
        expect(enabled).toEqual(
            expect.arrayContaining([
                "bg-linear-to-b",
                "hover:from-surface-hover",
                "hover:to-surface-hover",
                "active:from-surface-active",
                "active:to-surface-active",
            ]),
        );
        expect(enabled).not.toContain("hover:bg-surface-hover");
        expect(enabled).not.toContain("active:bg-surface-active");

        await rerender({ disabled: true });
        const disabled = classesOf(screen.getByRole("button", { name: "Billing" }));
        expect(disabled.filter((name) => /^(hover|active):/.test(name))).toEqual([]);
    });

    it("Tabs: the selected pill presses to the next step of its own fill", () => {
        render(LightModeHarness);
        const [selected, idle] = Array.from(
            screen.getByTestId("pills").querySelectorAll('[role="tab"]'),
        ).map(classesOf);

        expect(selected).toEqual(
            expect.arrayContaining([
                "bg-action-primary-subtle",
                "text-link",
                "active:bg-action-primary-subtle-hover",
            ]),
        );
        expect(selected).not.toContain("bg-brand-100");
        expect(selected).not.toContain("active:bg-surface-active");
        // A tab with no fill keeps the tint.
        expect(idle).toContain("active:bg-surface-active");
        expect(idle).not.toContain("bg-action-primary-subtle");
    });

    it("Tabs: the rule under the tabs is the border token", () => {
        render(LightModeHarness);
        const list = classesOf(screen.getByTestId("tabs").querySelector('[role="tablist"]'));

        expect(list).toContain("border-border");
        expect(list).not.toContain("border-base-200");
    });

    it("ListItem: a selected row carries neither the idle border nor the idle focus fill", () => {
        render(LightModeHarness);
        const [idle, selected] = Array.from(
            screen.getByTestId("list").querySelectorAll("button"),
        ).map(classesOf);

        expect(selected).toEqual(
            expect.arrayContaining(["bg-action-primary-subtle", "border-action-primary"]),
        );
        expect(selected).not.toContain("border-border");
        expect(selected).not.toContain("focus-visible:bg-surface-hover");
        expect(selected).toContain("focus-ring");
        expect(idle).toEqual(
            expect.arrayContaining(["border-border", "focus-visible:bg-surface-hover"]),
        );
    });
});

describe("checked controls use the primary action fill", () => {
    it("Checkbox", () => {
        const { container } = render(Checkbox, { props: { label: "Agree", checked: true } });
        const shell = classesOf(container.querySelector(".group\\/control"));

        expect(shell).toEqual(
            expect.arrayContaining([
                "has-[:checked]:bg-action-primary",
                "has-[:checked]:border-action-primary",
                "has-[:checked]:group-hover:bg-action-primary-hover",
            ]),
        );
        expect(shell.join(" ")).not.toContain("has-[:checked]:bg-brand-500");
        // The tick is the primary button's text colour, in both themes.
        expect(classesOf(container.querySelector("svg"))).toContain("text-action-primary");
    });

    it("Radio", () => {
        const { container } = render(Radio, { props: { label: "Pro", checked: true } });

        expect(classesOf(container.querySelector(".group\\/control"))).toContain(
            "has-[:checked]:bg-action-primary",
        );
        const dot = classesOf(container.querySelector(".size-2"));
        expect(dot).toContain("bg-action-primary-text");
        expect(dot).not.toContain("bg-base-50");
    });
});

describe("fields darken their border on hover", () => {
    const hover = "enabled:hover:border-input-border-hover";

    it("Input, Textarea and Select in the default state", () => {
        render(Input, { props: { label: "Name" } });
        render(Textarea, { props: { label: "Notes" } });
        render(Select, { props: { label: "Plan", options: [] } });

        for (const label of ["Name", "Notes", "Plan"]) {
            expect(classesOf(screen.getByLabelText(label)), label).toEqual(
                expect.arrayContaining(["border-input-border", hover]),
            );
        }
    });

    it.each(["error", "success", "warning"] as const)(
        "leaves the %s border alone on hover",
        (variant) => {
            render(Input, { props: { label: "Name", variant, message: "Note" } });
            render(Textarea, { props: { label: "Notes", variant, message: "Note" } });
            render(Select, { props: { label: "Plan", options: [], variant, message: "Note" } });

            for (const label of ["Name", "Notes", "Plan"]) {
                expect(classesOf(screen.getByLabelText(label)), label).not.toContain(hover);
            }
        },
    );
});
