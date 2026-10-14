import { cleanup, render, screen, waitFor, within } from "@testing-library/svelte";
import { afterEach, describe, expect, it, vi } from "vitest";

import AppShellHarness from "./fixtures/AppShellHarness.svelte";
import NavigationHarness from "./fixtures/AppShellNavigationHarness.svelte";

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
});

const shell = () => screen.getByTestId("shell");
const region = () => shell().querySelector<HTMLElement>("[data-app-shell-navigation]")!;
const column = () => shell().querySelector<HTMLElement>("[data-app-shell-column]")!;
const scroller = () => shell().querySelector<HTMLElement>("[data-app-shell-scroller]")!;
const style = () => shell().getAttribute("style") ?? "";
const rootValue = (name: string) => document.documentElement.style.getPropertyValue(name);

/** `matchMedia` with a viewport width, and a way to resize it. */
function stubViewport(width: number) {
    const listeners = new Set<() => void>();
    let current = width;
    const rem = (query: string) => Number(/min-width:\s*([\d.]+)rem/.exec(query)?.[1] ?? 0) * 16;
    vi.stubGlobal("matchMedia", (query: string) => ({
        get matches() {
            return current >= rem(query);
        },
        media: query,
        addEventListener: (_: string, listener: () => void) => listeners.add(listener),
        removeEventListener: (_: string, listener: () => void) => listeners.delete(listener),
    }));
    return (next: number) => {
        current = next;
        listeners.forEach((listener) => listener());
    };
}

describe("AppShell navigation structure", () => {
    it("puts the navigation region first, then a column that holds the scroller and the footer", () => {
        render(NavigationHarness, { props: { withFooter: true } });
        expect(shell().firstElementChild).toBe(region());
        expect(region().nextElementSibling).toBe(column());
        expect(column().contains(scroller())).toBe(true);
        expect(column().contains(shell().querySelector("[data-app-shell-footer]"))).toBe(true);
        expect(region().contains(scroller())).toBe(false);
        expect(within(region()).getAllByRole("navigation", { hidden: true }).length).toBe(2);
    });

    it("renders the snippet once", () => {
        render(NavigationHarness);
        expect(screen.getAllByTestId("appnav")).toHaveLength(1);
    });

    it("tabs from the navigation to the header to the content", () => {
        render(NavigationHarness);
        const order = [region(), shell().querySelector("[data-app-shell-header]")!, screen.getByTestId("content")];
        order.slice(1).forEach((node, index) => {
            expect(order[index].compareDocumentPosition(node) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
        });
    });

    it("names the prop on the host so CSS can read it, auto by default", () => {
        render(NavigationHarness);
        expect(shell().getAttribute("data-navigation-placement")).toBe("auto");
        cleanup();
        render(NavigationHarness, { props: { navigationPlacement: "rail" } });
        expect(shell().getAttribute("data-navigation-placement")).toBe("rail");
    });

    it("keeps the same host classes except the row layout", () => {
        render(NavigationHarness);
        expect(shell().className).toContain("app-shell--nav");
        expect(shell().className).not.toContain("flex-col");
    });

    it("renders exactly the old markup without a navigation", () => {
        render(AppShellHarness);
        expect(shell().hasAttribute("data-navigation-placement")).toBe(false);
        expect(shell().className).toContain("flex-col");
        expect(shell().className).not.toContain("app-shell--nav");
        expect(shell().querySelector("[data-app-shell-navigation]")).toBeNull();
        expect(shell().querySelector("[data-app-shell-column]")).toBeNull();
        expect(shell().firstElementChild).toBe(shell().querySelector("[data-app-shell-scroller]"));
        expect(shell().getAttribute("style")).not.toContain("--app-shell-start-inset");
        expect(shell().getAttribute("style")).not.toContain("--shell-");
    });
});

describe("AppShell navigation insets", () => {
    it("takes the tabs into the bottom inset in CSS, and the safe area alone for a side column", () => {
        render(NavigationHarness);
        // Without a footer: the overlay (the tabs when they are tabs) and, for a side column, the safe area.
        expect(style()).toContain(
            "--app-shell-bottom-inset: calc(var(--shell-overlay) + var(--shell-safe-bottom))",
        );
        expect(style()).toContain("--shell-footer: 0px");
        expect(style()).toContain("--app-shell-start-inset: var(--shell-start)");
        expect(scroller().getAttribute("style")).toContain("--app-shell-footer-overlay: var(--shell-overlay)");
    });

    it("counts the footer in the total, and adds no safe area of its own: the footer has it", () => {
        render(NavigationHarness, { props: { withFooter: true } });
        expect(style()).toContain("--app-shell-bottom-inset: calc(var(--shell-overlay) + 0px)");
        expect(style()).toContain("--shell-footer: calc(64px + env(safe-area-inset-bottom, 0px))");
        const footer = shell().querySelector<HTMLElement>("[data-app-shell-footer]")!;
        expect(footer.className).toContain("bottom-(--shell-nav-bottom)");
        expect(footer.className).not.toContain("bottom-0");
    });

    it("pads the content and the scroll position by the bottom inset, always", () => {
        render(NavigationHarness);
        const content = shell().querySelector("[data-app-shell-content]")!;
        expect(content.className).toContain("pb-(--app-shell-bottom-inset)");
        expect(content.className).toContain("pl-(--shell-content-pl)");
        expect(content.className).not.toContain("pl-[env(safe-area-inset-left)]");
        expect(scroller().className).toContain("scroll-pb-(--app-shell-bottom-inset)");
    });

    it("measures the region and the footer, and replaces the estimates", async () => {
        vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (
            this: HTMLElement,
        ) {
            const box = this.hasAttribute("data-app-shell-navigation")
                ? { width: 300, height: 90 }
                : this.hasAttribute("data-app-shell-footer")
                  ? { width: 0, height: 50 }
                  : { width: 0, height: 0 };
            return { ...box, top: 0, left: 0, right: 0, bottom: 0, x: 0, y: 0 } as DOMRect;
        });
        render(NavigationHarness, { props: { withFooter: true, navigationPlacement: "tabs" } });
        await waitFor(() => expect(style()).toContain("--shell-nav-h: 90px"));
        expect(style()).toContain("--shell-nav-w: 300px");
        expect(style()).toContain("--shell-footer: 50px");
        // On <html>: the footer plus the tabs, and no start inset as tabs.
        await waitFor(() => expect(rootValue("--app-shell-bottom-inset")).toBe("calc(50px + 90px)"));
        expect(rootValue("--app-shell-start-inset")).toBe("0px");
    });

    it("mirrors the width of a rail onto <html> as the start inset, and removes it after", async () => {
        vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (
            this: HTMLElement,
        ) {
            const box = this.hasAttribute("data-app-shell-navigation")
                ? { width: 80, height: 700 }
                : { width: 0, height: 0 };
            return { ...box, top: 0, left: 0, right: 0, bottom: 0, x: 0, y: 0 } as DOMRect;
        });
        const { unmount } = render(NavigationHarness, { props: { navigationPlacement: "rail" } });
        await waitFor(() => expect(rootValue("--app-shell-start-inset")).toBe("80px"));
        // A side column leaves only the safe area under the content without a footer.
        expect(rootValue("--app-shell-bottom-inset")).toBe("env(safe-area-inset-bottom, 0px)");
        unmount();
        expect(rootValue("--app-shell-start-inset")).toBe("");
    });

    it("estimates the width before measuring: 80px for a rail, 256px for a sidebar", async () => {
        render(NavigationHarness, { props: { navigationPlacement: "sidebar" } });
        await waitFor(() => expect(rootValue("--app-shell-start-inset")).toBe("256px"));
        cleanup();
        render(NavigationHarness, { props: { navigationPlacement: "rail" } });
        await waitFor(() => expect(rootValue("--app-shell-start-inset")).toBe("80px"));
    });

    it("does not set the start inset on <html> for a shell without a navigation", async () => {
        render(AppShellHarness);
        await waitFor(() => expect(rootValue("--app-shell-top-inset")).toContain("56px"));
        expect(rootValue("--app-shell-start-inset")).toBe("");
    });
});

const given = () => screen.getByTestId("placement-arg").textContent;

describe("AppShell navigation placement argument", () => {
    it("is tabs without matchMedia, and the forced value when forced", () => {
        render(NavigationHarness);
        expect(given()).toBe("tabs");
        cleanup();
        render(NavigationHarness, { props: { navigationPlacement: "sidebar" } });
        expect(given()).toBe("sidebar");
    });

    it("follows the viewport in auto, and changes with it", async () => {
        const resize = stubViewport(800);
        render(NavigationHarness);
        await waitFor(() => expect(given()).toBe("rail"));
        resize(1280);
        await waitFor(() => expect(given()).toBe("sidebar"));
        resize(390);
        await waitFor(() => expect(given()).toBe("tabs"));
    });

    it("tells a sticky bar about the tabs: footerOverlays and the total follow the placement", async () => {
        const resize = stubViewport(390);
        vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (
            this: HTMLElement,
        ) {
            const box = this.hasAttribute("data-app-shell-navigation")
                ? { width: 390, height: 70 }
                : { width: 0, height: 0 };
            return { ...box, top: 0, left: 0, right: 0, bottom: 0, x: 0, y: 0 } as DOMRect;
        });
        render(NavigationHarness);
        // Tabs: the root value counts them. A rail does not.
        await waitFor(() => expect(rootValue("--app-shell-bottom-inset")).toBe("70px"));
        resize(900);
        await waitFor(() =>
            expect(rootValue("--app-shell-bottom-inset")).toBe("env(safe-area-inset-bottom, 0px)"),
        );
    });
});
