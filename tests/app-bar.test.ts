import { cleanup, fireEvent, render, screen, within } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import AppBarHarness from "./fixtures/AppBarHarness.svelte";

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    Object.defineProperty(window, "scrollY", { configurable: true, value: 0 });
});

const bar = () => screen.getByTestId("bar");
const outside = () => screen.getByTestId("outside");
const collapsed = () => bar().getAttribute("data-collapsed");

/** jsdom has no layout: give the scroller a size, then scroll it. */
function scrollable(element: HTMLElement, scrollHeight = 2000, clientHeight = 300) {
    Object.defineProperty(element, "scrollHeight", { configurable: true, value: scrollHeight });
    Object.defineProperty(element, "clientHeight", { configurable: true, value: clientHeight });
}

async function scrollTo(element: HTMLElement, top: number) {
    element.scrollTop = top;
    await fireEvent.scroll(element);
}

describe("AppBar semantics", () => {
    it("is a header landmark with the title as a level 1 heading", () => {
        render(AppBarHarness);
        expect(bar().tagName).toBe("HEADER");
        expect(screen.getByRole("banner")).toBe(bar());
        const heading = within(bar()).getByRole("heading", { level: 1, name: "Round 3" });
        expect(heading.tagName).toBe("H1");
    });

    it("takes the heading level from headingLevel", () => {
        render(AppBarHarness, { props: { headingLevel: 2 } });
        expect(within(bar()).getByRole("heading", { level: 2, name: "Round 3" })).toBeTruthy();
        expect(within(bar()).queryByRole("heading", { level: 1 })).toBeNull();
    });

    it("renders no heading without a title", () => {
        render(AppBarHarness, { props: { title: "" } });
        expect(within(bar()).queryByRole("heading")).toBeNull();
    });

    it("stays at the top, clear of the status bar, and merges class", () => {
        render(AppBarHarness, { props: { class: "static" } });
        expect(bar().className).toContain("env(safe-area-inset-top)");
        expect(bar().className).toContain("top-0");
        // The call site wins over the bar's own `sticky`.
        expect(bar().className).toContain("static");
        expect(bar().className).not.toMatch(/(^|\s)sticky(\s|$)/);
    });
});

describe("AppBar back control", () => {
    it("has none unless asked for", () => {
        render(AppBarHarness);
        expect(within(bar()).queryByRole("link")).toBeNull();
        expect(within(bar()).queryByRole("button")).toBeNull();
    });

    it("is a link named Back with backHref", () => {
        render(AppBarHarness, { props: { backHref: "/quiz" } });
        const back = within(bar()).getByRole("link", { name: "Back" });
        expect(back.getAttribute("href")).toBe("/quiz");
        expect(back.className).toContain("size-12");
        expect(back.className).toContain("focus-ring");
        expect(back.querySelector("svg")?.getAttribute("aria-hidden")).toBe("true");
    });

    it("is a button with onback alone, and calls it", async () => {
        const user = userEvent.setup();
        const onback = vi.fn();
        render(AppBarHarness, { props: { onback } });
        const back = within(bar()).getByRole("button", { name: "Back" });
        expect(back.getAttribute("type")).toBe("button");
        await user.click(back);
        expect(onback).toHaveBeenCalledTimes(1);
    });

    it("runs onback before the link is followed, and lets it stop that", async () => {
        const onback = vi.fn((event: MouseEvent) => event.preventDefault());
        render(AppBarHarness, { props: { backHref: "/quiz", onback } });
        const back = within(bar()).getByRole("link", { name: "Back" });
        const followed = await fireEvent.click(back);
        expect(onback).toHaveBeenCalledTimes(1);
        expect(followed, "preventDefault in onback cancels the navigation").toBe(false);
    });

    it("takes its name from backLabel", () => {
        render(AppBarHarness, { props: { backHref: "/", backLabel: "Tillbaka" } });
        expect(within(bar()).getByRole("link", { name: "Tillbaka" })).toBeTruthy();
    });
});

describe("AppBar regions and keyboard", () => {
    it("puts leading before the title and actions after it", () => {
        render(AppBarHarness, { props: { withLeading: true, withActions: true, backHref: "/" } });
        const order = [
            within(bar()).getByRole("link", { name: "Back" }),
            screen.getByTestId("leading"),
            within(bar()).getByRole("heading"),
            within(bar()).getByRole("button", { name: "Search" }),
            within(bar()).getByRole("button", { name: "Share" }),
        ];
        for (let index = 1; index < order.length; index += 1) {
            expect(
                order[index - 1].compareDocumentPosition(order[index]) &
                    Node.DOCUMENT_POSITION_FOLLOWING,
            ).toBeTruthy();
        }
    });

    it("tabs through back, then the actions, then out", async () => {
        const user = userEvent.setup();
        render(AppBarHarness, { props: { withActions: true, onback: vi.fn() } });
        await user.tab();
        expect(document.activeElement).toBe(within(bar()).getByRole("button", { name: "Back" }));
        await user.tab();
        expect(document.activeElement).toBe(within(bar()).getByRole("button", { name: "Search" }));
        await user.tab();
        expect(document.activeElement).toBe(within(bar()).getByRole("button", { name: "Share" }));
        await user.tab();
        expect(document.activeElement).toBe(outside());
    });

    it("activates the back button with Enter and Space", async () => {
        const user = userEvent.setup();
        const onback = vi.fn();
        render(AppBarHarness, { props: { onback } });
        await user.tab();
        await user.keyboard("{Enter}");
        await user.keyboard(" ");
        expect(onback).toHaveBeenCalledTimes(2);
    });
});

describe("AppBar collapse on scroll", () => {
    it("is off by default: scrolling does nothing", async () => {
        render(AppBarHarness, { props: { inScroller: true } });
        const scroller = screen.getByTestId("scroller");
        scrollable(scroller);
        await scrollTo(scroller, 400);
        expect(collapsed()).toBeNull();
        expect(bar().className).not.toContain("-translate-y");
    });

    it("hides on the way down and returns on the way up, in its scrolling ancestor", async () => {
        render(AppBarHarness, { props: { inScroller: true, collapseOnScroll: true } });
        const scroller = screen.getByTestId("scroller");
        scrollable(scroller);
        expect(collapsed()).toBe("false");

        await scrollTo(scroller, 200);
        expect(collapsed()).toBe("true");
        expect(bar().className).toContain("-translate-y");
        // The strip under the status bar stays put.
        expect(bar().className).toContain("env(safe-area-inset-top,0px)");

        await scrollTo(scroller, 400);
        expect(collapsed()).toBe("true");

        await scrollTo(scroller, 380);
        expect(collapsed()).toBe("false");
        expect(bar().className).not.toContain("-translate-y");
    });

    it("ignores a few pixels of jitter in either direction", async () => {
        render(AppBarHarness, { props: { inScroller: true, collapseOnScroll: true } });
        const scroller = screen.getByTestId("scroller");
        scrollable(scroller);
        await scrollTo(scroller, 5);
        expect(collapsed()).toBe("false");
        await scrollTo(scroller, 200);
        expect(collapsed()).toBe("true");
        await scrollTo(scroller, 196);
        expect(collapsed(), "4px back up is not a change of direction").toBe("true");
    });

    it("always shows at the top", async () => {
        render(AppBarHarness, { props: { inScroller: true, collapseOnScroll: true } });
        const scroller = screen.getByTestId("scroller");
        scrollable(scroller);
        await scrollTo(scroller, 300);
        expect(collapsed()).toBe("true");
        await scrollTo(scroller, 0);
        expect(collapsed()).toBe("false");
    });

    it("does not react to the bounce past the end of the content", async () => {
        render(AppBarHarness, { props: { inScroller: true, collapseOnScroll: true } });
        const scroller = screen.getByTestId("scroller");
        scrollable(scroller, 2000, 300);
        await scrollTo(scroller, 1700);
        expect(collapsed()).toBe("true");
        // Overscroll reports positions beyond the last one that exists, and
        // then comes back: that is not the user scrolling up.
        await scrollTo(scroller, 1760);
        await scrollTo(scroller, 1700);
        expect(collapsed()).toBe("true");
        await scrollTo(scroller, 1650);
        expect(collapsed()).toBe("false");
    });

    it("is not held by the focus a click leaves behind", async () => {
        const user = userEvent.setup();
        render(AppBarHarness, {
            props: { inScroller: true, collapseOnScroll: true, withActions: true },
        });
        const scroller = screen.getByTestId("scroller");
        scrollable(scroller);
        const search = within(bar()).getByRole("button", { name: "Search" });

        await user.click(search);
        expect(document.activeElement).toBe(search);

        await scrollTo(scroller, 300);
        expect(collapsed(), "Pointer focus does not hold the bar").toBe("true");
        expect(document.activeElement, "Focus stays where the press left it").toBe(search);

        await scrollTo(scroller, 200);
        expect(collapsed()).toBe("false");
        await scrollTo(scroller, 500);
        expect(collapsed(), "And it can hide again").toBe("true");
    });

    it("comes back on the next key press after a click, and is held from then on", async () => {
        const user = userEvent.setup();
        render(AppBarHarness, {
            props: { inScroller: true, collapseOnScroll: true, withActions: true },
        });
        const scroller = screen.getByTestId("scroller");
        scrollable(scroller);
        const search = within(bar()).getByRole("button", { name: "Search" });
        await user.click(search);
        await scrollTo(scroller, 300);
        expect(collapsed()).toBe("true");

        // The focused control is out of sight: any key shows where focus is.
        await user.keyboard("{Shift}");
        expect(collapsed()).toBe("false");
        expect(document.activeElement).toBe(search);
        await scrollTo(scroller, 600);
        expect(collapsed(), "Now the keyboard is in use, focus holds the bar").toBe("false");
    });

    it("holds for keyboard focus that follows a click in the bar", async () => {
        const user = userEvent.setup();
        render(AppBarHarness, {
            props: { inScroller: true, collapseOnScroll: true, withActions: true },
        });
        const scroller = screen.getByTestId("scroller");
        scrollable(scroller);
        await user.click(within(bar()).getByRole("button", { name: "Search" }));
        await user.tab();
        expect(document.activeElement).toBe(within(bar()).getByRole("button", { name: "Share" }));

        await scrollTo(scroller, 300);
        expect(collapsed()).toBe("false");
    });

    it("holds for keyboard focus after a press in the bar that never became a click", async () => {
        const user = userEvent.setup();
        render(AppBarHarness, {
            props: { inScroller: true, collapseOnScroll: true, backHref: "/" },
        });
        const scroller = screen.getByTestId("scroller");
        scrollable(scroller);
        // A finger put down on the title and dragged away: no click follows.
        await fireEvent.pointerDown(within(bar()).getByRole("heading"));

        await user.tab();
        expect(document.activeElement).toBe(within(bar()).getByRole("link", { name: "Back" }));
        await scrollTo(scroller, 300);
        expect(collapsed()).toBe("false");
    });

    it("stops holding when keyboard focus leaves, and a later click does not hold either", async () => {
        const user = userEvent.setup();
        render(AppBarHarness, {
            props: { inScroller: true, collapseOnScroll: true, withActions: true },
        });
        const scroller = screen.getByTestId("scroller");
        scrollable(scroller);
        await user.tab();
        await scrollTo(scroller, 300);
        expect(collapsed()).toBe("false");

        await user.click(within(bar()).getByRole("button", { name: "Share" }));
        await scrollTo(scroller, 600);
        expect(collapsed()).toBe("true");
    });

    it("never hides while keyboard focus is inside it", async () => {
        render(AppBarHarness, {
            props: { inScroller: true, collapseOnScroll: true, backHref: "/" },
        });
        const scroller = screen.getByTestId("scroller");
        scrollable(scroller);
        within(bar()).getByRole("link", { name: "Back" }).focus();

        await scrollTo(scroller, 300);
        await scrollTo(scroller, 600);
        expect(collapsed()).toBe("false");

        outside().focus();
        await scrollTo(scroller, 900);
        expect(collapsed()).toBe("true");
    });

    it("comes back when focus moves into it", async () => {
        const user = userEvent.setup();
        render(AppBarHarness, {
            props: { inScroller: true, collapseOnScroll: true, backHref: "/" },
        });
        const scroller = screen.getByTestId("scroller");
        scrollable(scroller);
        await scrollTo(scroller, 300);
        expect(collapsed()).toBe("true");

        // Still in the tab order while it is away, so the keyboard can reach it.
        await user.tab();
        expect(document.activeElement).toBe(within(bar()).getByRole("link", { name: "Back" }));
        expect(collapsed()).toBe("false");
    });

    it("follows the window when nothing around it scrolls", async () => {
        render(AppBarHarness, { props: { collapseOnScroll: true } });
        Object.defineProperty(document.documentElement, "scrollHeight", {
            configurable: true,
            value: 3000,
        });
        const scrollWindow = async (top: number) => {
            Object.defineProperty(window, "scrollY", { configurable: true, value: top });
            await fireEvent.scroll(window);
        };
        await scrollWindow(300);
        expect(collapsed()).toBe("true");
        await scrollWindow(250);
        expect(collapsed()).toBe("false");
    });

    it("moves without animation under reduced motion", () => {
        render(AppBarHarness, { props: { collapseOnScroll: true } });
        expect(bar().className).toContain("transition-transform");
        expect(bar().className).toContain("motion-reduce:transition-none");
    });

    it("fades its controls while it is away, so none shows in the strip that stays", async () => {
        render(AppBarHarness, {
            props: { inScroller: true, collapseOnScroll: true, backHref: "/", withActions: true },
        });
        const scroller = screen.getByTestId("scroller");
        scrollable(scroller);
        const row = () => bar().firstElementChild as HTMLElement;
        expect(row().className).not.toContain("opacity-0");

        await scrollTo(scroller, 200);
        expect(collapsed()).toBe("true");
        // Under a status bar the bottom of the bar stays on screen: the
        // controls in it must be neither seen nor pressed there.
        expect(row().className).toContain("opacity-0");
        expect(row().className).toContain("pointer-events-none");
        expect(row().className).toContain("motion-reduce:transition-none");
        // Not removed: the keyboard still reaches them, and that brings the bar back.
        expect(row().contains(within(bar()).getByRole("link", { name: "Back" }))).toBe(true);
        expect(within(bar()).getByRole("button", { name: "Search" })).toBeTruthy();

        within(bar()).getByRole("button", { name: "Search" }).focus();
        await Promise.resolve();
        expect(collapsed()).toBe("false");
        expect(row().className).not.toContain("opacity-0");
        expect(row().className).not.toContain("pointer-events-none");
    });

    it("stops listening when it is removed", async () => {
        const { unmount } = render(AppBarHarness, {
            props: { inScroller: true, collapseOnScroll: true },
        });
        const scroller = screen.getByTestId("scroller");
        const remove = vi.spyOn(scroller, "removeEventListener");
        unmount();
        expect(remove).toHaveBeenCalledWith("scroll", expect.any(Function));
    });
});

describe("AppBar title", () => {
    const heading = () => within(bar()).getByRole("heading", { level: 1 });
    const row = () => heading().parentElement!;

    it("is one line with an ellipsis, and two before it is cut with titleLines 2", () => {
        const first = render(AppBarHarness);
        expect(heading().className).toContain("truncate");
        expect(heading().className).not.toContain("line-clamp-2");
        first.unmount();
        render(AppBarHarness, { props: { titleLines: 2 } });
        expect(heading().className).toContain("line-clamp-2");
        expect(heading().className).not.toContain("truncate");
    });

    it("keeps its whole text and has no title attribute", () => {
        const long = "79 poäng, The Bishops Arms på Vasagatan";
        render(AppBarHarness, { props: { title: long } });
        expect(heading().textContent).toBe(long);
        expect(heading().hasAttribute("title")).toBe(false);
        expect(heading().hasAttribute("aria-label")).toBe(false);
    });

    it("marks its own parts, and renders leading as it is, between the back control and the title", () => {
        render(AppBarHarness, { props: { backHref: "/quiz", withLeading: true, withActions: true } });
        // Back, leading, title, actions in the document, whichever row the title is drawn on.
        expect([...row().children].map((child) => (child as HTMLElement).dataset.appbarPart ?? child.getAttribute("data-testid"))).toEqual([
            "back",
            "leading",
            "title",
            "actions",
        ]);
        // Nothing was put around the app's markup.
        expect(screen.getByTestId("leading").parentElement).toBe(row());
    });

    it("without a layout to measure it stays on the stylesheet's fallback: no row is claimed", () => {
        render(AppBarHarness, { props: { backHref: "/quiz", withLeading: true, withActions: true } });
        expect(row().hasAttribute("data-title-row")).toBe(false);
        expect(row().style.getPropertyValue("--appbar-leading-max")).toBe("");
    });
});
