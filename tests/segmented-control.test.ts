import { List } from "@lucide/svelte";
import { cleanup, render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import SegmentedControl from "../src/components/molecules/SegmentedControl.svelte";
import SegmentedControlHarness from "./fixtures/SegmentedControlHarness.svelte";

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

const group = () => screen.getByRole("radiogroup");
const segments = () => screen.getAllByRole("radio") as HTMLInputElement[];
const segment = (name: string) => screen.getByRole("radio", { name }) as HTMLInputElement;
const checked = () => segments().filter((input) => input.checked).map((input) => input.value);
const bound = () => screen.getByTestId("bound").textContent;

const four = [
    { value: "day", label: "Day" },
    { value: "week", label: "Week" },
    { value: "month", label: "Month" },
    { value: "year", label: "Year" },
];

describe("SegmentedControl", () => {
    it("is a radio group named by its label, not a tab list", () => {
        render(SegmentedControlHarness, { props: { initial: "maybe" } });
        expect(screen.getByRole("radiogroup", { name: "Answer" })).toBe(group());
        expect(screen.queryByRole("tablist")).toBeNull();
        expect(screen.queryAllByRole("tab")).toEqual([]);
        expect(segments().map((input) => input.type)).toEqual(["radio", "radio", "radio"]);
        // Each segment is named by its visible label.
        expect(segment("Going")).toBeTruthy();
        expect(segment("Maybe").checked).toBe(true);
        expect(segment("Can't")).toBeTruthy();
        // The name is not shown.
        expect(screen.queryByText("Answer")).toBeNull();
        expect(group().getAttribute("data-testid")).toBe("segmented");
    });

    it("can be named by a visible element instead", () => {
        render(SegmentedControlHarness, { props: { labelledby: true } });
        expect(screen.getByRole("radiogroup", { name: "Are you coming?" })).toBe(group());
        expect(group().hasAttribute("aria-label")).toBe(false);
    });

    it("can start with nothing selected and is still one Tab stop", async () => {
        const user = userEvent.setup();
        render(SegmentedControlHarness);
        expect(checked()).toEqual([]);
        expect(bound()).toBe("undefined");
        expect(segments().map((input) => input.tabIndex)).toEqual([0, -1, -1]);

        await user.tab();
        expect(document.activeElement).toBe(segment("Going"));
        await user.tab();
        expect(group().contains(document.activeElement)).toBe(false);
    });

    it("gives the Tab stop to the selected segment", () => {
        render(SegmentedControlHarness, { props: { initial: "no" } });
        expect(segments().map((input) => input.tabIndex)).toEqual([-1, -1, 0]);
    });

    it("selects on a press, binds the value and reports it", async () => {
        const user = userEvent.setup();
        const onchange = vi.fn();
        render(SegmentedControlHarness, { props: { initial: "going", onchange } });

        await user.click(screen.getByText("Maybe"));
        expect(checked()).toEqual(["maybe"]);
        expect(bound()).toBe("maybe");
        expect(onchange).toHaveBeenCalledTimes(1);
        expect(onchange).toHaveBeenCalledWith("maybe");
    });

    it("never clears on a repeat press of the selected segment", async () => {
        const user = userEvent.setup();
        const onchange = vi.fn();
        render(SegmentedControlHarness, { props: { initial: "maybe", onchange } });

        await user.click(screen.getByText("Maybe"));
        await user.click(segment("Maybe"));
        segment("Maybe").focus();
        await user.keyboard(" ");
        await user.keyboard("{Enter}");
        await user.keyboard("{Delete}{Backspace}{Escape}");

        expect(checked()).toEqual(["maybe"]);
        expect(bound()).toBe("maybe");
        expect(onchange).not.toHaveBeenCalled();
    });

    it("moves and selects with the arrow keys, Home and End, and wraps", async () => {
        const user = userEvent.setup();
        const onchange = vi.fn();
        render(SegmentedControlHarness, { props: { initial: "going", onchange } });
        await user.tab();
        expect(document.activeElement).toBe(segment("Going"));

        await user.keyboard("{ArrowRight}");
        expect(bound()).toBe("maybe");
        expect(document.activeElement).toBe(segment("Maybe"));
        expect(segments().map((input) => input.tabIndex)).toEqual([-1, 0, -1]);

        await user.keyboard("{ArrowDown}");
        expect(bound()).toBe("no");
        await user.keyboard("{ArrowRight}");
        expect(bound()).toBe("going");
        await user.keyboard("{ArrowLeft}");
        expect(bound()).toBe("no");
        await user.keyboard("{ArrowUp}");
        expect(bound()).toBe("maybe");
        await user.keyboard("{End}");
        expect(bound()).toBe("no");
        await user.keyboard("{Home}");
        expect(bound()).toBe("going");
        expect(document.activeElement).toBe(segment("Going"));
        expect(onchange).toHaveBeenLastCalledWith("going");
    });

    it("selects the first segment on Right, and the focused one on Space, from nothing", async () => {
        const user = userEvent.setup();
        const { unmount } = render(SegmentedControlHarness);
        await user.tab();
        await user.keyboard("{ArrowRight}");
        expect(bound()).toBe("going");
        unmount();

        render(SegmentedControlHarness);
        await user.tab();
        await user.keyboard(" ");
        expect(bound()).toBe("going");
    });

    it("moves from the segment that has focus, not from the selected one", async () => {
        // A screen reader's cursor can put focus on a radio that is not checked.
        const user = userEvent.setup();
        render(SegmentedControl, {
            props: {
                label: "View",
                options: [
                    { value: "list", label: "List" },
                    { value: "month", label: "Month" },
                ],
                value: "list",
            },
        });

        segment("Month").focus();
        await user.keyboard("{ArrowLeft}");
        expect(checked()).toEqual(["list"]);
        expect(document.activeElement).toBe(segment("List"));
        cleanup();

        render(SegmentedControlHarness, { props: { initial: "going" } });
        segment("Can't").focus();
        await user.keyboard("{ArrowLeft}");
        expect(bound()).toBe("maybe");
        segment("Can't").focus();
        await user.keyboard("{ArrowRight}");
        expect(bound()).toBe("going");
    });

    it("selects the focused segment on a forward key while empty, wherever focus is", async () => {
        const user = userEvent.setup();
        render(SegmentedControlHarness);
        segment("Maybe").focus();
        await user.keyboard("{ArrowRight}");
        expect(bound()).toBe("maybe");
        await user.keyboard("{ArrowRight}");
        expect(bound()).toBe("no");
    });

    it("skips a disabled segment with the keys and ignores a press on it", async () => {
        const user = userEvent.setup();
        const onchange = vi.fn();
        render(SegmentedControlHarness, {
            props: {
                initial: "going",
                onchange,
                options: [
                    { value: "going", label: "Going" },
                    { value: "maybe", label: "Maybe", disabled: true },
                    { value: "no", label: "Can't" },
                ],
            },
        });
        expect(segment("Maybe").disabled).toBe(true);

        await user.click(screen.getByText("Maybe"));
        expect(bound()).toBe("going");
        expect(onchange).not.toHaveBeenCalled();

        segment("Going").focus();
        await user.keyboard("{ArrowRight}");
        expect(bound()).toBe("no");
    });

    it("gives the Tab stop to the first segment that can be chosen", () => {
        render(SegmentedControlHarness, {
            props: {
                options: [
                    { value: "going", label: "Going", disabled: true },
                    { value: "maybe", label: "Maybe" },
                    { value: "no", label: "Can't" },
                ],
            },
        });
        expect(segments().map((input) => input.tabIndex)).toEqual([-1, 0, -1]);
    });

    it("cannot be changed while disabled", async () => {
        const user = userEvent.setup();
        const onchange = vi.fn();
        render(SegmentedControlHarness, {
            props: { initial: "going", disabled: true, onchange },
        });
        expect(segments().every((input) => input.disabled)).toBe(true);
        expect(group().getAttribute("aria-disabled")).toBe("true");
        await user.click(screen.getByText("Maybe"));
        expect(bound()).toBe("going");
        expect(onchange).not.toHaveBeenCalled();
    });

    it("submits with a form under its name, and nothing while empty", async () => {
        const user = userEvent.setup();
        render(SegmentedControlHarness);
        const data = () => new FormData(screen.getByTestId("form") as HTMLFormElement);
        expect(data().has("answer")).toBe(false);
        await user.click(screen.getByText("Can't"));
        expect(data().get("answer")).toBe("no");
    });

    it("leaves the radios without a name when none is given", () => {
        render(SegmentedControl, { props: { label: "Period", options: four, value: "week" } });
        expect(segments().every((input) => !input.hasAttribute("name"))).toBe(true);
        expect(checked()).toEqual(["week"]);
    });

    it("says whether it fills the row, and which size it is", () => {
        render(SegmentedControlHarness);
        expect(group().hasAttribute("data-full-width")).toBe(true);
        expect(group().getAttribute("data-size")).toBe("md");
        cleanup();

        render(SegmentedControlHarness, { props: { fullWidth: false, size: "lg" } });
        expect(group().hasAttribute("data-full-width")).toBe(false);
        expect(group().getAttribute("data-size")).toBe("lg");
    });

    it("renders an option's icon as decoration", () => {
        render(SegmentedControlHarness, { props: { initial: "going" } });
        expect(group().querySelector("svg")).toBeNull();
        cleanup();

        render(SegmentedControl, {
            props: {
                label: "View",
                options: [
                    { value: "list", label: "List", icon: List },
                    { value: "month", label: "Month" },
                ],
            },
        });
        const icon = group().querySelector("svg");
        expect(icon).not.toBeNull();
        expect(icon!.closest("[aria-hidden='true']")).not.toBeNull();
        // The icon adds nothing to the name.
        expect(segment("List")).toBeTruthy();
    });

    it("warns in development outside two to four options, and still renders", () => {
        const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
        render(SegmentedControl, { props: { label: "Period", options: four } });
        render(SegmentedControl, { props: { label: "Period", options: four.slice(0, 2) } });
        expect(warn).not.toHaveBeenCalled();
        cleanup();

        render(SegmentedControl, { props: { label: "Period", options: four.slice(0, 1) } });
        expect(warn).toHaveBeenCalledTimes(1);
        expect(warn.mock.calls[0][0]).toContain("2 to 4 options and got 1");
        expect(segments()).toHaveLength(1);
        cleanup();

        render(SegmentedControl, {
            props: { label: "Period", options: [...four, { value: "all", label: "All" }] },
        });
        expect(warn).toHaveBeenCalledTimes(2);
        expect(segments()).toHaveLength(5);
    });
});
