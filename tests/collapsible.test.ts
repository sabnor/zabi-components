import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { tick } from "svelte";
import { afterEach, describe, expect, it, vi } from "vitest";

import { nextTriggerIndex } from "../src/components/util/collapsible";
import CollapsibleGroupHarness from "./fixtures/CollapsibleGroupHarness.svelte";
import CollapsibleHarness from "./fixtures/CollapsibleHarness.svelte";
import { detailsOf, triggerByText } from "./fixtures/collapsible-trigger";

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

const state = () => screen.getByTestId("state").textContent?.trim();
/** The default trigger is a `<summary>`; a custom one (see "custom trigger") is a button. */
const trigger = (name = "Billing") => triggerByText(name);
const details = () => detailsOf(trigger());
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
    it("points a native summary at a panel that is labelled by it", () => {
        render(CollapsibleHarness);

        const summary = trigger();
        expect(summary.tagName).toBe("SUMMARY");
        expect(summary.parentElement?.tagName).toBe("DETAILS");
        // Native disclosure semantics: no button role, no aria-expanded.
        expect(summary.hasAttribute("role")).toBe(false);
        expect(summary.hasAttribute("aria-expanded")).toBe(false);
        expect(summary.id).toBeTruthy();
        expect(summary.hasAttribute("data-collapsible-trigger")).toBe(true);

        const panel = panelOf(summary);
        expect(panel.id).not.toBe(summary.id);
        expect(panel.getAttribute("aria-labelledby")).toBe(summary.id);
        // The browser hides closed content; `hidden` is only for a custom trigger.
        expect(panel.hasAttribute("hidden")).toBe(false);
        expect(details().open).toBe(false);
        expect(details().contains(panel)).toBe(true);
    });

    it("gives two instances different ids", () => {
        render(CollapsibleHarness);
        render(CollapsibleHarness);

        const [first, second] = screen.getAllByText("Billing", { selector: "summary span" });
        const a = first.closest("summary") as HTMLElement;
        const b = second.closest("summary") as HTMLElement;
        expect(a.id).not.toBe(b.id);
        expect(a.getAttribute("aria-controls")).not.toBe(b.getAttribute("aria-controls"));
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

    it("puts a heading inside the summary only when a level is given", () => {
        render(CollapsibleHarness);
        expect(screen.queryByRole("heading")).toBeNull();
        cleanup();

        render(CollapsibleHarness, { props: { headingLevel: 3 } });
        const heading = screen.getByRole("heading", { level: 3, name: "Billing" });
        // A summary inside a heading is not valid HTML, so it is the other way round.
        expect(trigger().contains(heading)).toBe(true);
        expect(heading.closest("summary")).toBe(trigger());
    });

    it("passes other attributes to the host and reports its state there", async () => {
        const user = userEvent.setup();
        render(CollapsibleHarness);

        const host = screen.getByTestId("host");
        expect(host.getAttribute("data-state")).toBe("closed");
        await user.click(trigger());
        expect(host.getAttribute("data-state")).toBe("open");
    });

    it("hides the native marker and keeps the focus ring and the touch target", () => {
        render(CollapsibleHarness);
        const classes = trigger().className;
        expect(classes).toContain("list-none");
        expect(classes).toContain("[&::-webkit-details-marker]:hidden");
        expect(classes).toContain("focus-ring");
        // The flex row is on an inner element, not on the summary.
        expect(classes).not.toMatch(/(^|\s)flex(\s|$)/);
        expect(trigger().firstElementChild?.className).toContain("pointer-coarse:min-h-11");
    });
});

describe("Collapsible toggling", () => {
    // jsdom toggles a <details> on a click on its <summary> and fires `toggle`
    // a task later, as a browser does; it does not turn Enter or Space into a
    // click, so the keyboard tests below send the click that a browser would.
    it("opens and closes on click and reports each change once", async () => {
        const user = userEvent.setup();
        const onopenchange = vi.fn();
        render(CollapsibleHarness, { props: { onopenchange } });

        await user.click(trigger());
        await waitFor(() => expect(state()).toBe("open"));
        expect(details().open).toBe(true);
        expect(onopenchange.mock.calls).toEqual([[true]]);

        await user.click(trigger());
        await waitFor(() => expect(state()).toBe("closed"));
        expect(details().open).toBe(false);
        expect(onopenchange.mock.calls).toEqual([[true], [false]]);
    });

    // Fails without the `toggle` listener: the state would stay "closed".
    it("takes a change made on the <details> itself, as find-in-page does", async () => {
        const onopenchange = vi.fn();
        render(CollapsibleHarness, { props: { onopenchange } });

        details().open = true;
        await waitFor(() => expect(state()).toBe("open"));
        expect(screen.getByTestId("host").getAttribute("data-state")).toBe("open");
        expect(onopenchange.mock.calls).toEqual([[true]]);
    });

    it("leaves Enter and Space to the browser, and keeps focus on the summary", async () => {
        render(CollapsibleHarness);

        const summary = trigger();
        summary.focus();
        // Nothing may call preventDefault: that would stop the browser's own toggle.
        expect(await fireEvent.keyDown(summary, { key: "Enter" })).toBe(true);
        expect(await fireEvent.keyDown(summary, { key: " " })).toBe(true);
        // The click the browser makes of either key.
        await fireEvent.click(summary);
        await waitFor(() => expect(state()).toBe("open"));
        await fireEvent.click(summary);
        await waitFor(() => expect(state()).toBe("closed"));
        expect(document.activeElement).toBe(summary);
    });

    it("binds open in both directions", async () => {
        const user = userEvent.setup();
        const onopenchange = vi.fn();
        render(CollapsibleHarness, { props: { onopenchange } });

        // Child to parent.
        await user.click(trigger());
        await waitFor(() => expect(state()).toBe("open"));

        // Parent to child. The parent made this change, so it is not reported back.
        onopenchange.mockClear();
        await user.click(screen.getByRole("button", { name: "Outside toggle" }));
        expect(state()).toBe("closed");
        await tick();
        expect(details().open).toBe(false);
        // Wait for the toggle event that the script's own change causes.
        await new Promise((resolve) => setTimeout(resolve, 20));
        expect(onopenchange).not.toHaveBeenCalled();

        await user.click(screen.getByRole("button", { name: "Outside toggle" }));
        await tick();
        expect(details().open).toBe(true);
        await new Promise((resolve) => setTimeout(resolve, 20));
        expect(onopenchange).not.toHaveBeenCalled();
    });

    it("starts open when asked to", () => {
        render(CollapsibleHarness, { props: { initialOpen: true } });
        expect(details().open).toBe(true);
        expect(panelOf(trigger()).hasAttribute("hidden")).toBe(false);
    });

    it("does not toggle when disabled, but still follows its binding", async () => {
        const user = userEvent.setup();
        const onopenchange = vi.fn();
        render(CollapsibleHarness, { props: { disabled: true, onopenchange } });

        const summary = trigger();
        // A summary cannot be disabled: it is inert by other means.
        expect(summary.getAttribute("aria-disabled")).toBe("true");
        expect(summary.getAttribute("tabindex")).toBe("-1");
        expect(summary.className).toContain("pointer-events-none");
        expect(screen.getByTestId("host").hasAttribute("data-disabled")).toBe(true);

        // The click is cancelled, so the browser does not toggle it.
        expect(await fireEvent.click(summary)).toBe(false);
        await new Promise((resolve) => setTimeout(resolve, 20));
        expect(state()).toBe("closed");
        expect(details().open).toBe(false);
        expect(onopenchange).not.toHaveBeenCalled();

        await user.click(screen.getByRole("button", { name: "Outside toggle" }));
        await tick();
        expect(details().open).toBe(true);
        expect(onopenchange).not.toHaveBeenCalled();
    });

    it("undoes a change that reaches a disabled panel through the details", async () => {
        const onopenchange = vi.fn();
        render(CollapsibleHarness, { props: { disabled: true, onopenchange } });

        details().open = true;
        await waitFor(() => expect(details().open).toBe(false));
        expect(state()).toBe("closed");
        expect(onopenchange).not.toHaveBeenCalled();
    });
});

describe("Collapsible closed content", () => {
    it("stays in the DOM inside the closed details, with no hidden attribute", async () => {
        render(CollapsibleHarness);

        // jsdom has no layout: it cannot show that the browser hides this
        // content or drops it from the tab order. What is checked is the markup
        // that makes it do so: the content is in a closed <details>, and no
        // `hidden` attribute is involved.
        const panel = panelOf(trigger());
        expect(details().open).toBe(false);
        expect(details().contains(screen.getByTestId("note"))).toBe(true);
        expect(panel.hasAttribute("hidden")).toBe(false);
        expect(panel.contains(screen.getByTestId("note"))).toBe(true);
    });

    it("keeps the content mounted by default, so a form keeps its values", async () => {
        const user = userEvent.setup();
        render(CollapsibleHarness, { props: { initialOpen: true } });

        const note = screen.getByTestId("note") as HTMLInputElement;
        await user.type(note, "Net 30");
        await user.click(trigger());
        await waitFor(() => expect(state()).toBe("closed"));
        await user.click(trigger());
        await waitFor(() => expect(state()).toBe("open"));

        expect(screen.getByTestId("note")).toBe(note);
        expect(note.value).toBe("Net 30");
    });

    it("still submits a form field inside the closed details", () => {
        const view = render(CollapsibleHarness);
        const note = screen.getByTestId("note") as HTMLInputElement;
        note.name = "note";
        note.value = "Net 30";
        const form = document.createElement("form");
        document.body.append(form);
        form.append(details());
        expect(new FormData(form).get("note")).toBe("Net 30");
        form.remove();
        view.unmount();
    });

    it("removes the content while closed with unmountOnClose, and keeps the panel", async () => {
        const user = userEvent.setup();
        render(CollapsibleHarness, { props: { unmountOnClose: true } });

        expect(screen.queryByTestId("note")).toBeNull();
        // The panel element stays, so aria-controls never dangles.
        expect(panelOf(trigger())).toBeTruthy();

        await user.click(trigger());
        await waitFor(() => expect(screen.getByTestId("note")).toBeTruthy());
        await user.click(trigger());
        await waitFor(() => expect(screen.queryByTestId("note")).toBeNull());
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

describe("Collapsible custom trigger markup", () => {
    it("stays a button and a hidden panel, with no details", async () => {
        const user = userEvent.setup();
        render(CollapsibleHarness, { props: { custom: true } });

        expect(document.querySelector("details")).toBeNull();
        expect(document.querySelector("summary")).toBeNull();
        const button = triggerByText("Toggle billing");
        expect(panelOf(button).hidden).toBe(true);
        await user.click(button);
        expect(panelOf(button).hidden).toBe(false);
    });
});

describe("CollapsibleGroup", () => {
    // General, Advanced and Members are summaries; Billing has a custom button.
    const header = (name: string) => triggerByText(name);

    it("closes the open panel when another one opens", async () => {
        const user = userEvent.setup();
        const onopenchange = vi.fn();
        render(CollapsibleGroupHarness, { props: { onopenchange } });

        await user.click(header("General"));
        await waitFor(() => expect(state()).toBe("general"));

        await user.click(header("Members"));
        await waitFor(() => expect(state()).toBe("members"));
        expect(detailsOf(header("General")).open).toBe(false);
        expect(onopenchange.mock.calls).toEqual([
            ["general", true],
            ["members", true],
            ["general", false],
        ]);

        // The open panel can be closed again, leaving none open.
        await user.click(header("Members"));
        await waitFor(() => expect(state()).toBe(""));
    });

    it("shares one name on the details of a single-open group, for native exclusivity", () => {
        render(CollapsibleGroupHarness);

        const named = (title: string) => detailsOf(header(title)).getAttribute("name");
        expect(named("General")).toBeTruthy();
        expect(named("Members")).toBe(named("General"));
        // A Collapsible inside a panel is not a member, so it is not in the group.
        expect(named("Advanced")).toBeNull();
    });

    it("gives no name with multiple, and none to a disabled panel", () => {
        render(CollapsibleGroupHarness, { props: { multiple: true } });
        expect(detailsOf(header("General")).hasAttribute("name")).toBe(false);
        cleanup();

        render(CollapsibleGroupHarness, { props: { disableMembers: true } });
        expect(detailsOf(header("General")).hasAttribute("name")).toBe(true);
        expect(detailsOf(header("Members")).hasAttribute("name")).toBe(false);
    });

    it("ends consistent when the browser's exclusive group closes a sibling", async () => {
        const user = userEvent.setup();
        const onopenchange = vi.fn();
        render(CollapsibleGroupHarness, { props: { onopenchange } });

        await user.click(header("General"));
        await waitFor(() => expect(state()).toBe("general"));
        onopenchange.mockClear();

        // What a browser that knows `name` does on a click on another summary:
        // opens that one and closes the named sibling, then fires both toggles.
        // jsdom has no exclusivity of its own, so it is done here by hand.
        detailsOf(header("Members")).open = true;
        detailsOf(header("General")).open = false;
        await waitFor(() => expect(state()).toBe("members"));
        await new Promise((resolve) => setTimeout(resolve, 30));

        expect(detailsOf(header("General")).open).toBe(false);
        expect(detailsOf(header("Members")).open).toBe(true);
        expect(onopenchange).toHaveBeenCalledTimes(2);
        expect(onopenchange).toHaveBeenCalledWith("members", true);
        expect(onopenchange).toHaveBeenCalledWith("general", false);
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
        await waitFor(() => expect(state()).toBe("general,billing"));
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
        await waitFor(() => expect(state()).toBe("general,nested"));
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

    it("leaves every enabled header focusable, in document order", () => {
        render(CollapsibleGroupHarness);

        // jsdom has no layout and user-event does not know that a summary is
        // tabbable, so Tab order is not exercised here (see the e2e suite).
        // What decides it is checked instead: no header is taken out of the
        // order with a negative tabindex, and they appear in the DOM as listed.
        const headers = [...document.querySelectorAll("[data-collapsible-trigger]")];
        expect(headers.map((element) => element.textContent?.trim())).toEqual([
            "General",
            "Advanced",
            "Members",
            "Billing",
        ]);
        for (const element of headers) expect(element.hasAttribute("tabindex")).toBe(false);
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
        expect(document.activeElement).toBe(triggerByText("Members"));
    });
});

describe("CollapsibleGroup settling panels that start open", () => {
    it("renders only the first one open and brings the bound state in line, silently", async () => {
        const onopenchange = vi.fn();
        render(CollapsibleGroupHarness, {
            props: { initial: ["general", "members", "billing"], onopenchange },
        });

        // Before any effect has run, the markup is already settled.
        const open = [...document.querySelectorAll("details")]
            .filter((element) => element.open)
            .map((element) => element.querySelector("summary")?.textContent?.trim());
        expect(open).toEqual(["General"]);
        expect(screen.getAllByRole("button", { name: "Billing" })[0].getAttribute("aria-expanded")).toBe("false");

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
        await waitFor(() => expect(state()).toBe("billing"));
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

        await user.click(triggerByText("General"));
        await waitFor(() => expect(state()).toBe("general,members"));
        await user.click(screen.getByRole("button", { name: "Billing" }));
        await waitFor(() => expect(state()).toBe("members,billing"));
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
