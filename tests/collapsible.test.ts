import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { tick } from "svelte";
import { afterEach, describe, expect, it, vi } from "vitest";

import { nextTriggerIndex } from "../src/components/util/collapsible";
import CollapsibleGroupHarness from "./fixtures/CollapsibleGroupHarness.svelte";
import CollapsibleHarness from "./fixtures/CollapsibleHarness.svelte";

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

const state = () => screen.getByTestId("state").textContent?.trim();
const trigger = (name: string | RegExp = "Billing") =>
    screen.getByRole("button", { name });
const panelOf = (button: HTMLElement) => {
    const panel = document.getElementById(
        button.getAttribute("aria-controls") ?? "",
    );
    if (!panel) throw new Error("aria-controls does not point at an element");
    return panel;
};

describe("nextTriggerIndex", () => {
    it("moves one step and wraps at both ends", () => {
        expect(nextTriggerIndex("ArrowDown", 0, 3)).toBe(1);
        expect(nextTriggerIndex("ArrowDown", 2, 3)).toBe(0);
        expect(nextTriggerIndex("ArrowUp", 1, 3)).toBe(0);
        expect(nextTriggerIndex("ArrowUp", 0, 3)).toBe(2);
    });

    it("jumps to the ends and ignores every other key", () => {
        expect(nextTriggerIndex("Home", 2, 3)).toBe(0);
        expect(nextTriggerIndex("End", 0, 3)).toBe(2);
        expect(nextTriggerIndex("Tab", 0, 3)).toBeNull();
        expect(nextTriggerIndex("Enter", 0, 3)).toBeNull();
        expect(nextTriggerIndex("ArrowDown", 0, 0)).toBeNull();
    });
});

describe("Collapsible wiring", () => {
    it("points a real button at a panel that is labelled by it", () => {
        render(CollapsibleHarness);

        const button = trigger();
        expect(button.tagName).toBe("BUTTON");
        expect(button.getAttribute("type")).toBe("button");
        expect(button.getAttribute("aria-expanded")).toBe("false");
        expect(button.id).toBeTruthy();

        const panel = panelOf(button);
        expect(panel.id).not.toBe(button.id);
        expect(panel.getAttribute("aria-labelledby")).toBe(button.id);
        expect(panel.hidden).toBe(true);
    });

    it("gives two instances different ids", () => {
        render(CollapsibleHarness);
        render(CollapsibleHarness);

        const [first, second] = screen.getAllByRole("button", { name: "Billing" });
        expect(first.id).not.toBe(second.id);
        expect(first.getAttribute("aria-controls")).not.toBe(
            second.getAttribute("aria-controls"),
        );
    });

    it("names the panel as a group, and as a region only on request", () => {
        render(CollapsibleHarness, { props: { initialOpen: true } });
        expect(screen.getByRole("group", { name: "Billing" })).toBe(
            panelOf(trigger()),
        );
        expect(screen.queryByRole("region")).toBeNull();
        cleanup();

        render(CollapsibleHarness, { props: { initialOpen: true, region: true } });
        expect(screen.getByRole("region", { name: "Billing" })).toBe(
            panelOf(trigger()),
        );
    });

    it("wraps the default trigger in a heading only when a level is given", () => {
        render(CollapsibleHarness);
        expect(screen.queryByRole("heading")).toBeNull();
        cleanup();

        render(CollapsibleHarness, { props: { headingLevel: 3 } });
        const heading = screen.getByRole("heading", { level: 3, name: "Billing" });
        expect(heading.contains(trigger())).toBe(true);
    });

    it("passes other attributes to the host and reports its state there", async () => {
        const user = userEvent.setup();
        render(CollapsibleHarness);

        const host = screen.getByTestId("host");
        expect(host.getAttribute("data-state")).toBe("closed");
        await user.click(trigger());
        expect(host.getAttribute("data-state")).toBe("open");
    });
});

describe("Collapsible toggling", () => {
    it("opens and closes on click and reports each change once", async () => {
        const user = userEvent.setup();
        const onopenchange = vi.fn();
        render(CollapsibleHarness, { props: { onopenchange } });

        const button = trigger();
        await user.click(button);
        expect(button.getAttribute("aria-expanded")).toBe("true");
        expect(panelOf(button).hidden).toBe(false);
        expect(onopenchange.mock.calls).toEqual([[true]]);

        await user.click(button);
        expect(button.getAttribute("aria-expanded")).toBe("false");
        expect(panelOf(button).hidden).toBe(true);
        expect(onopenchange.mock.calls).toEqual([[true], [false]]);
    });

    it("toggles with Enter and with Space", async () => {
        const user = userEvent.setup();
        render(CollapsibleHarness);

        const button = trigger();
        button.focus();
        await user.keyboard("{Enter}");
        expect(state()).toBe("open");
        await user.keyboard(" ");
        expect(state()).toBe("closed");
        expect(document.activeElement).toBe(button);
    });

    it("binds open in both directions", async () => {
        const user = userEvent.setup();
        const onopenchange = vi.fn();
        render(CollapsibleHarness, { props: { onopenchange } });

        // Child to parent.
        await user.click(trigger());
        expect(state()).toBe("open");

        // Parent to child. The parent made this change, so it is not reported back.
        onopenchange.mockClear();
        await user.click(screen.getByRole("button", { name: "Outside toggle" }));
        expect(state()).toBe("closed");
        expect(trigger().getAttribute("aria-expanded")).toBe("false");
        expect(panelOf(trigger()).hidden).toBe(true);
        expect(onopenchange).not.toHaveBeenCalled();
    });

    it("starts open when asked to", () => {
        render(CollapsibleHarness, { props: { initialOpen: true } });
        expect(trigger().getAttribute("aria-expanded")).toBe("true");
        expect(panelOf(trigger()).hidden).toBe(false);
    });

    it("does not toggle when disabled, but still follows its binding", async () => {
        const user = userEvent.setup();
        const onopenchange = vi.fn();
        render(CollapsibleHarness, { props: { disabled: true, onopenchange } });

        const button = trigger() as HTMLButtonElement;
        expect(button.disabled).toBe(true);
        expect(screen.getByTestId("host").hasAttribute("data-disabled")).toBe(true);
        await user.click(button);
        expect(state()).toBe("closed");
        expect(onopenchange).not.toHaveBeenCalled();

        await user.click(screen.getByRole("button", { name: "Outside toggle" }));
        expect(panelOf(button).hidden).toBe(false);
    });
});

describe("Collapsible closed content", () => {
    it("is hidden from the accessibility tree and from the tab order", async () => {
        const user = userEvent.setup();
        render(CollapsibleHarness);

        // Role queries skip what assistive technology cannot reach.
        expect(screen.queryByRole("textbox", { name: "Note" })).toBeNull();
        expect(screen.queryByRole("link", { name: "Read more" })).toBeNull();
        const panel = panelOf(trigger());
        expect(panel.hasAttribute("hidden")).toBe(true);
        expect(panel.contains(screen.getByTestId("note"))).toBe(true);

        // Tab goes from the trigger straight past the closed panel.
        await user.tab();
        expect(document.activeElement).toBe(trigger());
        await user.tab();
        expect(document.activeElement).toBe(
            screen.getByRole("button", { name: "Outside toggle" }),
        );

        await user.click(trigger());
        expect(screen.getByRole("textbox", { name: "Note" })).toBeTruthy();
        expect(screen.getByRole("link", { name: "Read more" })).toBeTruthy();
        await user.tab();
        expect(document.activeElement).toBe(screen.getByTestId("note"));
    });

    it("keeps the content mounted by default, so a form keeps its values", async () => {
        const user = userEvent.setup();
        render(CollapsibleHarness, { props: { initialOpen: true } });

        const note = screen.getByTestId("note") as HTMLInputElement;
        await user.type(note, "Net 30");
        await user.click(trigger());
        await user.click(trigger());

        expect(screen.getByTestId("note")).toBe(note);
        expect(note.value).toBe("Net 30");
    });

    it("removes the content while closed with unmountOnClose, and keeps the panel", async () => {
        const user = userEvent.setup();
        render(CollapsibleHarness, { props: { unmountOnClose: true } });

        expect(screen.queryByTestId("note")).toBeNull();
        // The panel element stays, so aria-controls never dangles.
        expect(panelOf(trigger()).hidden).toBe(true);

        await user.click(trigger());
        expect(screen.getByTestId("note")).toBeTruthy();
        await user.click(trigger());
        expect(screen.queryByTestId("note")).toBeNull();
    });
});

describe("Collapsible custom trigger", () => {
    it("wires the consumer's own button inside their header", async () => {
        const user = userEvent.setup();
        const onopenchange = vi.fn();
        render(CollapsibleHarness, { props: { custom: true, onopenchange } });

        const button = trigger("Toggle billing");
        expect(screen.getByTestId("header").contains(button)).toBe(true);
        expect(button.tagName).toBe("BUTTON");
        expect(button.getAttribute("type")).toBe("button");
        expect(button.getAttribute("aria-expanded")).toBe("false");
        expect(button.textContent?.trim()).toBe("Show");
        expect(panelOf(button).getAttribute("aria-labelledby")).toBe(button.id);
        // Only one trigger: the default header button is not rendered.
        expect(
            screen.getAllByRole("button").filter((el) => el.hasAttribute("aria-expanded")),
        ).toHaveLength(1);

        await user.click(button);
        expect(button.getAttribute("aria-expanded")).toBe("true");
        expect(button.textContent?.trim()).toBe("Hide");
        expect(panelOf(button).hidden).toBe(false);
        expect(onopenchange.mock.calls).toEqual([[true]]);

        // A neighbouring button in the header is left alone.
        await user.click(screen.getByRole("button", { name: "Edit" }));
        expect(state()).toBe("open");
    });

    it("passes disabled through to the consumer's button", async () => {
        const user = userEvent.setup();
        render(CollapsibleHarness, { props: { custom: true, disabled: true } });

        const button = trigger("Toggle billing") as HTMLButtonElement;
        expect(button.disabled).toBe(true);
        await user.click(button);
        expect(state()).toBe("closed");
    });
});

describe("CollapsibleGroup", () => {
    const header = (name: string) => screen.getByRole("button", { name });

    it("closes the open panel when another one opens", async () => {
        const user = userEvent.setup();
        const onopenchange = vi.fn();
        render(CollapsibleGroupHarness, { props: { onopenchange } });

        await user.click(header("General"));
        expect(state()).toBe("general");

        await user.click(header("Members"));
        expect(state()).toBe("members");
        expect(header("General").getAttribute("aria-expanded")).toBe("false");
        expect(onopenchange.mock.calls).toEqual([
            ["general", true],
            ["members", true],
            ["general", false],
        ]);

        // The open panel can be closed again, leaving none open.
        await user.click(header("Members"));
        expect(state()).toBe("");
    });

    it("closes the others when a panel is opened through its binding", async () => {
        const user = userEvent.setup();
        render(CollapsibleGroupHarness, { props: { initial: ["general"] } });

        await user.click(
            screen.getByRole("button", { name: "Open billing from outside" }),
        );
        expect(state()).toBe("billing");
    });

    it("keeps only the first of several panels that start open", () => {
        render(CollapsibleGroupHarness, {
            props: { initial: ["members", "billing"] },
        });
        expect(state()).toBe("members");
    });

    it("leaves the others open with multiple", async () => {
        const user = userEvent.setup();
        render(CollapsibleGroupHarness, { props: { multiple: true } });

        await user.click(header("General"));
        await user.click(header("Billing"));
        expect(state()).toBe("general,billing");
    });

    it("closes all but the first open panel when multiple is turned off", async () => {
        const view = render(CollapsibleGroupHarness, {
            props: { multiple: true, initial: ["general", "billing"] },
        });
        expect(state()).toBe("general,billing");

        await view.rerender({ multiple: false });
        expect(state()).toBe("general");
    });

    it("does not treat a Collapsible inside a panel as a member", async () => {
        const user = userEvent.setup();
        render(CollapsibleGroupHarness, { props: { initial: ["general"] } });

        await user.click(header("Advanced"));
        expect(state()).toBe("general,nested");
    });

    it("makes panels regions in a single-open group only", () => {
        render(CollapsibleGroupHarness, { props: { initial: ["general"] } });
        expect(screen.getByRole("region", { name: "General" })).toBeTruthy();
        cleanup();

        render(CollapsibleGroupHarness, {
            props: { multiple: true, initial: ["general"] },
        });
        expect(screen.queryByRole("region")).toBeNull();
        expect(screen.getByRole("group", { name: "General" })).toBeTruthy();
    });

    it("moves focus between its header buttons with the arrow keys, Home and End", async () => {
        const user = userEvent.setup();
        render(CollapsibleGroupHarness, { props: { initial: ["general"] } });

        header("General").focus();
        // "Advanced" sits between the two in the DOM and is skipped.
        await user.keyboard("{ArrowDown}");
        expect(document.activeElement).toBe(header("Members"));
        await user.keyboard("{ArrowDown}");
        expect(document.activeElement).toBe(header("Billing"));
        await user.keyboard("{ArrowDown}");
        expect(document.activeElement).toBe(header("General"));
        await user.keyboard("{ArrowUp}");
        expect(document.activeElement).toBe(header("Billing"));
        await user.keyboard("{Home}");
        expect(document.activeElement).toBe(header("General"));
        await user.keyboard("{End}");
        expect(document.activeElement).toBe(header("Billing"));

        // Moving focus opens nothing.
        expect(state()).toBe("general");
    });

    it("skips a disabled header and ignores the keys on a nested trigger", async () => {
        const user = userEvent.setup();
        render(CollapsibleGroupHarness, {
            props: { initial: ["general"], disableMembers: true },
        });

        header("General").focus();
        await user.keyboard("{ArrowDown}");
        expect(document.activeElement).toBe(header("Billing"));

        header("Advanced").focus();
        await user.keyboard("{ArrowDown}");
        expect(document.activeElement).toBe(header("Advanced"));
    });

    it("keeps every header in the tab order, and closed content out of it", async () => {
        const user = userEvent.setup();
        render(CollapsibleGroupHarness);

        const stops: (string | null | undefined)[] = [];
        for (let i = 0; i < 4; i += 1) {
            await user.tab();
            stops.push(document.activeElement?.textContent?.trim());
        }
        // "Advanced" is inside the closed General panel and is passed over.
        expect(stops).toEqual([
            "General",
            "Members",
            "Billing",
            "Open billing from outside",
        ]);
    });
});

describe("Collapsible focus when the panel closes", () => {
    it("moves focus to the trigger when a control inside the panel closes it", async () => {
        const user = userEvent.setup();
        render(CollapsibleHarness, { props: { initialOpen: true } });

        const save = screen.getByRole("button", { name: "Save" });
        save.focus();
        await user.keyboard("{Enter}");

        expect(state()).toBe("closed");
        expect(document.activeElement).toBe(trigger());
    });

    it("does the same for a custom trigger and for unmounted content", async () => {
        const user = userEvent.setup();
        render(CollapsibleHarness, {
            props: { initialOpen: true, custom: true, unmountOnClose: true },
        });

        await user.click(screen.getByRole("button", { name: "Save" }));
        expect(state()).toBe("closed");
        expect(screen.queryByTestId("note")).toBeNull();
        expect(document.activeElement).toBe(trigger("Toggle billing"));
    });

    it("leaves focus alone when it is outside the panel", async () => {
        const user = userEvent.setup();
        render(CollapsibleHarness, { props: { initialOpen: true } });

        const outside = screen.getByRole("button", { name: "Outside toggle" });
        await user.click(outside);
        expect(state()).toBe("closed");
        expect(document.activeElement).toBe(outside);

        // Opening never moves focus either.
        await user.click(outside);
        expect(state()).toBe("open");
        expect(document.activeElement).toBe(outside);
    });

    it("moves focus to the header of a panel its group closes", async () => {
        render(CollapsibleGroupHarness, { props: { initial: ["members"] } });

        screen.getByRole("button", { name: "Invite" }).focus();
        // A programmatic open of a sibling: the click does not move focus.
        await fireEvent.click(
            screen.getByRole("button", { name: "Open billing from outside" }),
        );

        await waitFor(() => expect(state()).toBe("billing"));
        expect(document.activeElement).toBe(screen.getByRole("button", { name: "Members" }));
    });
});

describe("CollapsibleGroup settling panels that start open", () => {
    it("renders only the first one open and brings the bound state in line, silently", async () => {
        const onopenchange = vi.fn();
        render(CollapsibleGroupHarness, {
            props: { initial: ["general", "members", "billing"], onopenchange },
        });

        // Before any effect has run, the markup is already settled.
        const expanded = screen
            .getAllByRole("button")
            .filter((button) => button.getAttribute("aria-expanded") === "true");
        expect(expanded.map((button) => button.textContent?.trim())).toEqual(["General"]);

        await waitFor(() => expect(state()).toBe("general"));
        expect(onopenchange).not.toHaveBeenCalled();
    });

    it("lets a panel that started closed this way open normally afterwards", async () => {
        const user = userEvent.setup();
        const onopenchange = vi.fn();
        render(CollapsibleGroupHarness, {
            props: { initial: ["members", "billing"], onopenchange },
        });
        await waitFor(() => expect(state()).toBe("members"));

        await user.click(screen.getByRole("button", { name: "Billing" }));
        expect(state()).toBe("billing");
        expect(onopenchange.mock.calls).toEqual([
            ["billing", true],
            ["members", false],
        ]);
    });

    it("leaves every panel open with multiple", async () => {
        const onopenchange = vi.fn();
        render(CollapsibleGroupHarness, {
            props: { multiple: true, initial: ["general", "billing"], onopenchange },
        });
        await tick();
        expect(state()).toBe("general,billing");
        expect(onopenchange).not.toHaveBeenCalled();
    });
});

describe("CollapsibleGroup and disabled panels", () => {
    it("does not close a disabled open panel, so two can be open in a single-open group", async () => {
        const user = userEvent.setup();
        const onopenchange = vi.fn();
        render(CollapsibleGroupHarness, {
            props: { initial: ["members"], disableMembers: true, onopenchange },
        });

        await user.click(screen.getByRole("button", { name: "General" }));
        expect(state()).toBe("general,members");
        await user.click(screen.getByRole("button", { name: "Billing" }));
        expect(state()).toBe("members,billing");
        expect(onopenchange.mock.calls).toEqual([
            ["general", true],
            ["billing", true],
            ["general", false],
        ]);
    });

    it("does not let a disabled open panel keep the others from starting open", async () => {
        render(CollapsibleGroupHarness, {
            props: { initial: ["members", "billing"], disableMembers: true },
        });
        await tick();
        expect(state()).toBe("members,billing");
    });

    it("keeps a disabled panel open when multiple is turned off", async () => {
        const view = render(CollapsibleGroupHarness, {
            props: {
                multiple: true,
                initial: ["general", "members", "billing"],
                disableMembers: true,
            },
        });
        await view.rerender({ multiple: false });
        expect(state()).toBe("general,members");
    });
});

describe("Collapsible default trigger", () => {
    it("aligns its text to the start, so it follows the writing direction", () => {
        render(CollapsibleHarness);
        expect(trigger().className).toContain("text-start");
        expect(trigger().className).not.toContain("text-left");
    });
});
