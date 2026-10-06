import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/svelte";
import { afterEach, describe, expect, it, vi } from "vitest";

import House from "@lucide/svelte/icons/house";
import GlassShellHarness from "./fixtures/GlassShellHarness.svelte";
import AppBar from "../src/components/molecules/AppBar.svelte";
import BottomTabBar from "../src/components/molecules/BottomTabBar.svelte";
import StickyActionBar from "../src/components/molecules/StickyActionBar.svelte";
import UnsavedChangesBar from "../src/components/molecules/UnsavedChangesBar.svelte";
import TopNavbar from "../src/components/organisms/TopNavbar.svelte";

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    Object.defineProperty(window, "scrollY", { value: 0, configurable: true });
    document.documentElement.style.scrollPaddingBottom = "";
});

const shell = () => screen.getByTestId("shell");
const scroller = () => shell().querySelector<HTMLElement>("[data-app-shell-scroller]")!;
const under = (id: string) => screen.getByTestId(id).getAttribute("data-scrolled-under");

/** jsdom has no layout: put the scroller at a position in a 1000px column seen through 400px. */
function scrollTo(top: number) {
    const el = scroller();
    Object.defineProperty(el, "scrollTop", { value: top, configurable: true });
    Object.defineProperty(el, "scrollHeight", { value: 1000, configurable: true });
    Object.defineProperty(el, "clientHeight", { value: 400, configurable: true });
    el.dispatchEvent(new Event("scroll"));
}

describe("AppShell layout", () => {
    it("lets the footer lie over the scroller, not take a row of its own", () => {
        render(GlassShellHarness);
        const footer = shell().querySelector("[data-app-shell-footer]")!;
        expect(footer.className).toContain("absolute");
        expect(footer.className).toContain("inset-x-0");
        expect(footer.className).toContain("bottom-0");
        expect(footer.className).toContain("z-sticky");
        expect(footer.className).not.toContain("shrink-0");
        expect(scroller().contains(footer)).toBe(false);
    });

    it("pads the content and the scroll position by the bottom inset when there is a footer", () => {
        render(GlassShellHarness);
        const content = shell().querySelector("[data-app-shell-content]")!;
        expect(content.className).toContain("pb-(--app-shell-bottom-inset)");
        expect(scroller().className).toContain("scroll-pb-(--app-shell-bottom-inset)");
        expect(scroller().getAttribute("style")).toContain(
            "--app-shell-footer-overlay: var(--app-shell-bottom-inset)",
        );
    });

    it("has no overlay without a footer", () => {
        render(GlassShellHarness, { props: { withFooter: false } });
        const content = shell().querySelector("[data-app-shell-content]")!;
        expect(content.className).toContain("pb-[env(safe-area-inset-bottom)]");
        expect(scroller().className).not.toContain("scroll-pb-");
        expect(scroller().getAttribute("style")).toContain("--app-shell-footer-overlay: 0px");
    });

    it("paints the canvas wash only when asked, and lets it through the header", () => {
        const { unmount } = render(GlassShellHarness);
        expect(shell().className).toContain("bg-background");
        expect(shell().className).not.toContain("bg-canvas");
        expect(shell().querySelector("[data-app-shell-header]")!.className).not.toContain("--color-bar");
        unmount();
        render(GlassShellHarness, { props: { canvas: true } });
        expect(shell().className).toContain("bg-canvas");
        expect(shell().className).not.toContain("bg-background");
        expect(shell().querySelector("[data-app-shell-header]")!.className).toContain(
            "[--color-bar:transparent]",
        );
    });
});

describe("scroll state through the shell", () => {
    it("starts flush on the host and on every bar", () => {
        render(GlassShellHarness);
        expect(shell().getAttribute("data-scrolled-top")).toBe("false");
        expect(under("bar")).toBe("false");
    });

    it("flips the host attributes and the bars when the scroller scrolls", async () => {
        render(GlassShellHarness);
        scrollTo(0);
        await waitFor(() => expect(shell().getAttribute("data-scrolled-bottom")).toBe("true"));
        expect(shell().getAttribute("data-scrolled-top")).toBe("false");
        expect(under("bar")).toBe("false");
        expect(under("tabs")).toBe("true");
        expect(under("sticky")).toBe("true");

        scrollTo(300);
        await waitFor(() => expect(shell().getAttribute("data-scrolled-top")).toBe("true"));
        expect(under("bar")).toBe("true");
        expect(under("topnav")).toBe("true");

        scrollTo(600);
        await waitFor(() => expect(shell().getAttribute("data-scrolled-bottom")).toBe("false"));
        expect(under("tabs")).toBe("false");
        expect(under("sticky")).toBe("false");
    });

    it("scrollEdge forces the bars either way", async () => {
        const { unmount } = render(GlassShellHarness, { props: { barScrollEdge: "always" } });
        for (const id of ["bar", "tabs", "sticky", "topnav"]) expect(under(id), id).toBe("true");
        unmount();
        render(GlassShellHarness, { props: { barScrollEdge: "never" } });
        scrollTo(300);
        for (const id of ["bar", "tabs", "sticky", "topnav"]) expect(under(id), id).toBe("false");
    });

    it("gives the bars the hairline edge they draw on", () => {
        render(GlassShellHarness);
        for (const id of ["bar", "tabs", "sticky", "topnav"]) {
            expect(screen.getByTestId(id).className, id).toContain("material-bar");
        }
        expect(screen.getByTestId("tabs").getAttribute("data-bar-edge")).toBe("bottom");
        expect(screen.getByTestId("sticky").getAttribute("data-bar-edge")).toBe("bottom");
        expect(screen.getByTestId("bar").hasAttribute("data-bar-edge")).toBe(false);
    });
});

describe("StickyActionBar over a footer", () => {
    it("sticks above the footer at rest", () => {
        render(GlassShellHarness);
        expect(screen.getByTestId("sticky").getAttribute("style")).toContain(
            "bottom: var(--app-shell-footer-overlay, 0px)",
        );
    });

    it("does not double the safe-area padding the footer already covers", () => {
        render(GlassShellHarness);
        expect(screen.getByTestId("sticky").className).toContain("pb-3");
        expect(screen.getByTestId("sticky").className).not.toContain("safe-area-inset-bottom");
    });

    it("without a footer behaves as it does on its own", () => {
        render(GlassShellHarness, { props: { withFooter: false } });
        const bar = screen.getByTestId("sticky");
        expect(bar.getAttribute("style") ?? "").not.toContain("bottom:");
        expect(bar.className).toContain("safe-area-inset-bottom");
    });

    it("reserves scroll padding for its own height and the footer under it", async () => {
        vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (
            this: HTMLElement,
        ) {
            const height = this.hasAttribute("data-app-shell-footer")
                ? 64
                : this.getAttribute("data-testid") === "sticky"
                  ? 72
                  : 0;
            return { height, width: 0, top: 0, left: 0, right: 0, bottom: 0, x: 0, y: 0 } as DOMRect;
        });
        render(GlassShellHarness);
        // jsdom applies no stylesheet, so the scroller is not recognised as one
        // and the bar reserves on <html>; in a browser it is the shell's scroller.
        await waitFor(() =>
            expect(document.documentElement.style.scrollPaddingBottom).toBe("136px"),
        );
    });
});

describe("UnsavedChangesBar over a footer", () => {
    it("is a regular-material layer and clears the footer", () => {
        render(GlassShellHarness);
        const bar = screen.getByTestId("unsaved");
        expect(bar.className).toContain("material-layer-regular");
        expect(bar.className).not.toContain("shadow-lg");
        expect(bar.className).not.toContain("bg-surface-overlay");
        expect(bar.className).toContain("var(--app-shell-footer-overlay,0px)");
    });

    it("keeps the home-indicator offset on its own", () => {
        render(UnsavedChangesBar, { props: { dirty: true, "data-testid": "unsaved" } });
        const bar = screen.getByTestId("unsaved");
        expect(bar.className).toContain("material-layer-regular");
        expect(bar.className).toContain("safe-area-inset-bottom");
        expect(bar.className).not.toContain("footer-overlay");
    });

    it("is empty and unstyled when not dirty", () => {
        render(UnsavedChangesBar, { props: { "data-testid": "unsaved" } });
        expect(screen.getByTestId("unsaved").className).not.toContain("material-layer");
    });
});

describe("bars on their own", () => {
    it("watch the window: AppBar and TopNavbar at the top", async () => {
        Object.defineProperty(window, "scrollY", { value: 120, configurable: true });
        vi.spyOn(document.documentElement, "scrollHeight", "get").mockReturnValue(5000);
        render(AppBar, { props: { title: "A", "data-testid": "a" } });
        render(TopNavbar, { props: { brand: "B", showThemeToggle: false, "data-testid": "t" } });
        await waitFor(() => expect(under("a")).toBe("true"));
        expect(under("t")).toBe("true");
    });

    it("are flush at the top of the window, and scrollEdge overrides", async () => {
        render(AppBar, { props: { title: "A", "data-testid": "a" } });
        render(AppBar, { props: { title: "B", scrollEdge: "always", "data-testid": "b" } });
        await waitFor(() => expect(under("b")).toBe("true"));
        expect(under("a")).toBe("false");
    });

    it("BottomTabBar and StickyActionBar read the bottom edge of the window", async () => {
        // 0 scrolled, but the page is taller than the window: content is under a bottom bar.
        vi.spyOn(document.documentElement, "scrollHeight", "get").mockReturnValue(5000);
        render(BottomTabBar, {
            props: {
                items: [
                    { href: "/", label: "Home", icon: House },
                    { href: "/quiz", label: "Quiz", icon: House },
                    { href: "/inbox", label: "Inbox", icon: House },
                ],
                "data-testid": "tabs",
            },
        });
        render(StickyActionBar, { props: { "data-testid": "sticky" } });
        await waitFor(() => expect(under("tabs")).toBe("true"));
        expect(under("sticky")).toBe("true");
    });

    it("TopNavbar sits on the material while its phone menu is open", async () => {
        render(TopNavbar, { props: { brand: "B", showThemeToggle: false, "data-testid": "t" } });
        expect(under("t")).toBe("false");
        await fireEvent.click(screen.getByRole("button", { name: /open/i }));
        expect(under("t")).toBe("true");
    });
});
