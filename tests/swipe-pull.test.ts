import { cleanup, render, screen, waitFor, within } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import SwipePullHarness from "./fixtures/SwipePullHarness.svelte";
import { DEFAULT_TOASTER_STRINGS } from "../src/components/util/toaster";

/**
 * SwipeableListItem and PullToRefresh without their gestures: the routes a
 * keyboard and a screen reader have. The gestures are in
 * playwright/swipe-pull.spec.ts.
 */

afterEach(cleanup);

const row = (name: string) => screen.getByTestId(`row-${name}`);
const more = (name: string) => within(row(name)).getByRole("button", { name: "Actions" });
const actions = (name: string) => row(name).querySelector<HTMLElement>("[data-swipeable-actions]")!;

/** `inert` as the page has it: the property where the DOM knows it, the attribute otherwise. */
const isInert = (element: HTMLElement) => element.inert === true || element.hasAttribute("inert");

describe("SwipeableListItem by keyboard", () => {
    it("opens from its button, moves focus to the first action, and Escape returns focus to the button", async () => {
        const user = userEvent.setup();
        render(SwipePullHarness, { kind: "swipe" });
        expect(more("One").getAttribute("aria-expanded")).toBe("false");
        expect(more("One").getAttribute("aria-controls")).toBe(actions("One").id);
        expect(isInert(actions("One")), "Out of reach while closed").toBe(true);
        expect(actions("One").className.split(/\s+/)).toContain("invisible");

        more("One").focus();
        await user.keyboard("{Enter}");
        expect(more("One").getAttribute("aria-expanded")).toBe("true");
        expect(isInert(actions("One"))).toBe(false);
        expect(actions("One").className.split(/\s+/)).not.toContain("invisible");
        const group = within(row("One")).getByRole("group", { name: "Actions" });
        await waitFor(() => expect(document.activeElement).toBe(within(group).getByRole("button", { name: "Archive One" })));

        await user.keyboard("{Escape}");
        expect(more("One").getAttribute("aria-expanded")).toBe("false");
        expect(document.activeElement).toBe(more("One"));
    });

    it("runs an action on a press, closes, and returns focus to the button", async () => {
        const user = userEvent.setup();
        const onselect = vi.fn();
        render(SwipePullHarness, { kind: "swipe", onselect });
        await user.click(more("One"));
        await user.click(within(row("One")).getByRole("button", { name: "Delete One" }));
        expect(onselect).toHaveBeenCalledExactlyOnceWith("delete One");
        expect(row("One").getAttribute("data-open")).toBe("false");
        expect(document.activeElement).toBe(more("One"));
    });

    it("keeps one row open in a list, and closes on a press elsewhere", async () => {
        const user = userEvent.setup();
        render(SwipePullHarness, { kind: "swipe" });
        await user.click(more("One"));
        expect(row("One").getAttribute("data-open")).toBe("true");
        await user.click(more("Two"));
        expect(row("Two").getAttribute("data-open")).toBe("true");
        expect(row("One").getAttribute("data-open")).toBe("false");

        await user.click(screen.getByTestId("elsewhere"));
        expect(row("Two").getAttribute("data-open")).toBe("false");
    });
});

describe("PullToRefresh by its button", () => {
    const region = () => screen.getByTestId("region");
    const status = () => region().querySelector("[data-pull-status]")!;

    it("refreshes, says so, is busy meanwhile, and says when it is done", async () => {
        const user = userEvent.setup();
        let finish = () => {};
        const onrefresh = vi.fn(() => new Promise<void>((resolve) => (finish = resolve)));
        render(SwipePullHarness, { kind: "pull", onrefresh });
        // The region that speaks is there, empty, before there is anything to say.
        expect(status().getAttribute("role")).toBe("status");
        expect(status().textContent).toBe("");
        expect(region().hasAttribute("aria-busy")).toBe(false);

        const button = screen.getByRole("button", { name: "Refresh" });
        await user.click(button);
        expect(onrefresh).toHaveBeenCalledTimes(1);
        await waitFor(() => expect(status().textContent).toBe("Refreshing"));
        expect(region().getAttribute("aria-busy")).toBe("true");
        // A second press while it runs starts nothing.
        await user.click(button);
        expect(onrefresh).toHaveBeenCalledTimes(1);

        finish();
        await waitFor(() => expect(status().textContent).toBe("Updated"));
        expect(region().hasAttribute("aria-busy")).toBe(false);
    });

    it("ends the busy state when the refresh fails, and does not say it was updated", async () => {
        const user = userEvent.setup();
        const onrefresh = vi.fn(() => Promise.reject(new Error("offline")));
        render(SwipePullHarness, { kind: "pull", onrefresh });
        await user.click(screen.getByRole("button", { name: "Refresh" }));
        await waitFor(() => expect(region().getAttribute("data-refreshing")).toBe("false"));
        expect(onrefresh).toHaveBeenCalledTimes(1);
        expect(region().hasAttribute("aria-busy")).toBe(false);
        expect(status().textContent).toBe("");
    });
});

describe("the time a toast has left, in its last second", () => {
    it('is "1 second", not "1 seconds"', () => {
        expect(DEFAULT_TOASTER_STRINGS.closesIn(1)).toBe("This message will close in 1 second.");
        expect(DEFAULT_TOASTER_STRINGS.closesIn(3)).toBe("This message will close in 3 seconds.");
        expect(DEFAULT_TOASTER_STRINGS.pausedClosesIn(1)).toBe("Paused — closes in 1 second.");
    });
});
