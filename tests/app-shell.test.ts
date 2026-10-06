import { cleanup, render, screen, waitFor, within } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import AppShellHarness from "./fixtures/AppShellHarness.svelte";

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
});

const shell = () => screen.getByTestId("shell");
const scroller = () => shell().querySelector<HTMLElement>("[data-app-shell-scroller]")!;
const main = () => within(shell()).getByRole("main");
const style = () => shell().getAttribute("style") ?? "";

describe("AppShell structure", () => {
    it("lays out header, main and footer in that order", () => {
        render(AppShellHarness);
        const header = within(shell()).getByRole("banner");
        const tabs = within(shell()).getByRole("navigation", { name: "Main" });
        expect(main().contains(screen.getByTestId("content"))).toBe(true);
        expect(
            header.compareDocumentPosition(main()) & Node.DOCUMENT_POSITION_FOLLOWING,
        ).toBeTruthy();
        expect(main().compareDocumentPosition(tabs) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
        // The bars are not inside main: they are landmarks of their own.
        expect(main().contains(header)).toBe(false);
        expect(main().contains(tabs)).toBe(false);
    });

    it("has exactly one main, and only the middle scrolls", () => {
        render(AppShellHarness);
        expect(within(shell()).getAllByRole("main")).toHaveLength(1);
        expect(shell().className).toContain("h-dvh");
        expect(shell().className).not.toMatch(/(^|\s)h-screen(\s|$)/);
        expect(shell().className).toContain("overflow-hidden");
        expect(scroller().className).toContain("overflow-y-auto");
        expect(scroller().contains(main())).toBe(true);
        expect(scroller().contains(screen.getByTestId("bar"))).toBe(true);
        expect(scroller().contains(screen.getByTestId("tabs"))).toBe(false);
    });

    it("renders neither bar region when the snippets are left out", () => {
        render(AppShellHarness, { props: { withHeader: false, withFooter: false } });
        expect(shell().querySelector("[data-app-shell-header]")).toBeNull();
        expect(shell().querySelector("[data-app-shell-footer]")).toBeNull();
        expect(main().contains(screen.getByTestId("content"))).toBe(true);
    });

    it("renders the content in a main element unless told otherwise", () => {
        render(AppShellHarness);
        const content = shell().querySelector("[data-app-shell-content]")!;
        expect(content.tagName).toBe("MAIN");
        expect(content).toBe(main());
    });

    it("renders the content in a div, with no main, for a shell inside another main", () => {
        render(AppShellHarness, { props: { contentElement: "div" } });
        expect(within(shell()).queryByRole("main")).toBeNull();
        expect(shell().querySelector("main")).toBeNull();
        const content = shell().querySelector("[data-app-shell-content]")!;
        expect(content.tagName).toBe("DIV");
        expect(content.contains(screen.getByTestId("content"))).toBe(true);
        // The same place and the same layout as the main it stands in for.
        expect(scroller().contains(content)).toBe(true);
        expect(content.className).toContain("flex-1");
        expect(content.className).toContain("env(safe-area-inset-left)");
        expect(content.contains(screen.getByTestId("bar"))).toBe(false);
        expect(content.contains(screen.getByTestId("tabs"))).toBe(false);
    });

    it("merges class and passes other attributes to the host", () => {
        render(AppShellHarness, { props: { class: "h-96" } });
        expect(shell().hasAttribute("data-app-shell")).toBe(true);
        expect(shell().className).toContain("h-96");
        expect(shell().className, "A call-site height replaces 100dvh").not.toContain("h-dvh");
    });
});

describe("AppShell safe areas", () => {
    it("keeps the content clear of the sides, and leaves top and bottom to the bars", () => {
        render(AppShellHarness);
        expect(main().className).toContain("env(safe-area-inset-left)");
        expect(main().className).toContain("env(safe-area-inset-right)");
        expect(main().className).not.toContain("safe-area-inset-top");
        expect(main().className).not.toContain("safe-area-inset-bottom");
        expect(screen.getByTestId("bar").className).toContain("env(safe-area-inset-top)");
        expect(screen.getByTestId("tabs").className).toContain("env(safe-area-inset-bottom)");
    });

    it("handles top and bottom itself when there is no bar there", () => {
        render(AppShellHarness, { props: { withHeader: false, withFooter: false } });
        expect(main().className).toContain("env(safe-area-inset-top)");
        expect(main().className).toContain("env(safe-area-inset-bottom)");
    });
});

describe("AppShell custom properties", () => {
    it("starts from the default bar heights where nothing can be measured", () => {
        render(AppShellHarness);
        expect(style()).toContain(
            "--app-shell-top-inset: calc(56px + env(safe-area-inset-top, 0px))",
        );
        expect(style()).toContain(
            "--app-shell-bottom-inset: calc(64px + env(safe-area-inset-bottom, 0px))",
        );
    });

    it("is the safe-area inset alone without a bar", () => {
        render(AppShellHarness, { props: { withHeader: false, withFooter: false } });
        expect(style()).toContain("--app-shell-top-inset: env(safe-area-inset-top, 0px)");
        expect(style()).toContain("--app-shell-bottom-inset: env(safe-area-inset-bottom, 0px)");
    });

    it("takes the measured height of each bar, and follows it when it changes", async () => {
        const observers: { callback: () => void; target: Element | null }[] = [];
        vi.stubGlobal(
            "ResizeObserver",
            class {
                entry: { callback: () => void; target: Element | null };
                constructor(callback: () => void) {
                    this.entry = { callback, target: null };
                    observers.push(this.entry);
                }
                observe(target: Element) {
                    this.entry.target = target;
                }
                disconnect() {
                    this.entry.target = null;
                }
            },
        );
        let headerHeight = 72;
        vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (
            this: HTMLElement,
        ) {
            const height = this.hasAttribute("data-app-shell-header")
                ? headerHeight
                : this.hasAttribute("data-app-shell-footer")
                  ? 99
                  : 0;
            return { height, width: 0, top: 0, left: 0, right: 0, bottom: 0, x: 0, y: 0 } as DOMRect;
        });

        render(AppShellHarness);
        await waitFor(() => expect(style()).toContain("--app-shell-top-inset: 72px"));
        expect(style()).toContain("--app-shell-bottom-inset: 99px");

        // Enlarged text, a title on two lines: the bar grows and the value follows.
        headerHeight = 96;
        observers
            .find((entry) => entry.target?.hasAttribute("data-app-shell-header"))!
            .callback();
        await waitFor(() => expect(style()).toContain("--app-shell-top-inset: 96px"));
    });

    it("keeps a style passed to it, after its own properties", () => {
        render(AppShellHarness, { props: { style: "--brand-gap: 4px;" } });
        expect(style()).toContain("--brand-gap: 4px;");
        expect(style().indexOf("--app-shell-bottom-inset")).toBeLessThan(
            style().indexOf("--brand-gap"),
        );
    });

    it("keeps a focused field clear of the header with scroll padding", () => {
        render(AppShellHarness);
        expect(scroller().className).toContain("scroll-pt-(--app-shell-top-inset)");
    });
});

// A collapsing AppBar following the shell's scrolling area needs a stylesheet
// and layout: that is in playwright/app-shell.spec.ts.
describe("AppShell and its bars", () => {
    it("places the tab bar itself: inside the shell it is not fixed", () => {
        render(AppShellHarness);
        const tabs = screen.getByTestId("tabs");
        expect(tabs.getAttribute("data-position")).toBe("static");
        expect(tabs.className).not.toContain("fixed");
        expect(
            within(tabs).getByRole("link", { name: "Quiz" }).getAttribute("aria-current"),
        ).toBe("page");
    });

    it("keeps the header in view at the top of the scrolling area", () => {
        render(AppShellHarness);
        const region = shell().querySelector("[data-app-shell-header]")!;
        expect(region.className).toContain("sticky");
        expect(region.className).toContain("top-0");
        // The strip left behind by a collapsed bar must not swallow taps.
        expect(region.className).toContain("pointer-events-none");
        expect(region.className).toContain("*:pointer-events-auto");
    });

    it("tabs from the header through the content to the tabs", async () => {
        const user = userEvent.setup();
        render(AppShellHarness);
        await user.tab();
        expect(document.activeElement).toBe(
            within(screen.getByTestId("bar")).getByRole("link", { name: "Back" }),
        );
        await user.tab();
        expect(document.activeElement).toBe(
            within(screen.getByTestId("tabs")).getByRole("link", { name: "Home" }),
        );
    });
});

describe("AppShell insets outside the shell", () => {
    const rootValue = (name: string) => document.documentElement.style.getPropertyValue(name);

    it("mirrors both properties onto <html> while mounted, and removes them after", async () => {
        const { unmount } = render(AppShellHarness);
        await waitFor(() =>
            expect(rootValue("--app-shell-bottom-inset")).toContain("safe-area-inset-bottom"),
        );
        expect(rootValue("--app-shell-top-inset")).toContain("56px");
        unmount();
        expect(rootValue("--app-shell-top-inset")).toBe("");
        expect(rootValue("--app-shell-bottom-inset")).toBe("");
    });

    it("mirrors the shell mounted last, and the one before it again when that goes", async () => {
        const first = render(AppShellHarness);
        await waitFor(() => expect(rootValue("--app-shell-top-inset")).toContain("56px"));

        // A second shell without bars: its insets are the safe areas alone.
        const second = render(AppShellHarness, { props: { withHeader: false, withFooter: false } });
        await waitFor(() =>
            expect(rootValue("--app-shell-top-inset")).toBe("env(safe-area-inset-top, 0px)"),
        );
        second.unmount();
        expect(rootValue("--app-shell-top-inset")).toContain("56px");
        first.unmount();
        expect(rootValue("--app-shell-top-inset")).toBe("");
    });
});
