import { cleanup, render, screen, within } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";

import NavigationHarness from "./fixtures/AppShellNavigationHarness.svelte";
import AppNavigationHarness from "./fixtures/AppNavigationHarness.svelte";

afterEach(cleanup);

const side = () => document.querySelector<HTMLElement>("nav[data-an-side]")!;
const tabs = () => document.querySelector<HTMLElement>(".an-tabs nav")!;

describe("AppNavigation", () => {
    it("renders both forms: the tab bar and one side nav, with the same links", () => {
        render(AppNavigationHarness);
        expect(tabs()).toBeTruthy();
        expect(side()).toBeTruthy();
        const names = (nav: HTMLElement) =>
            within(nav, ).getAllByRole("link", { hidden: true }).map((link) => link.getAttribute("href"));
        expect(names(side())).toEqual(["/", "/quiz", "/inbox"]);
        expect(names(tabs())).toEqual(["/", "/quiz", "/inbox"]);
    });

    it("names both landmarks, by default Main, or the label given", () => {
        render(AppNavigationHarness);
        expect(side().getAttribute("aria-label")).toBe("Main");
        expect(tabs().getAttribute("aria-label")).toBe("Main");
        cleanup();
        render(AppNavigationHarness, { props: { label: "Primary" } });
        expect(side().getAttribute("aria-label")).toBe("Primary");
        expect(tabs().getAttribute("aria-label")).toBe("Primary");
    });

    it("marks the one active link with aria-current in each form", () => {
        render(AppNavigationHarness, { props: { active: "/quiz/live/3" } });
        for (const nav of [side(), tabs()]) {
            const current = nav.querySelectorAll('[aria-current="page"]');
            expect(current).toHaveLength(1);
            expect(current[0].getAttribute("href")).toBe("/quiz");
        }
    });

    it("marks the page's own address when active is left out", () => {
        window.history.pushState({}, "", "/inbox");
        render(AppNavigationHarness, { props: { active: undefined } });
        expect(side().querySelector('[aria-current="page"]')?.getAttribute("href")).toBe("/inbox");
        window.history.pushState({}, "", "/");
    });

    it("draws activeIcon instead of the icon on the active link, else a heavier stroke", () => {
        render(AppNavigationHarness, { props: { active: "/inbox" } });
        const icon = (href: string) => side().querySelector(`a[href="${href}"] .an-icon svg`)!;
        expect(icon("/inbox").getAttribute("data-active-icon")).toBe("true");
        expect(icon("/inbox").getAttribute("stroke-width")).not.toBe("2.5");
        cleanup();
        render(AppNavigationHarness, { props: { active: "/quiz" } });
        expect(side().querySelector('a[href="/quiz"] .an-icon svg')!.getAttribute("stroke-width")).toBe("2.5");
        expect(side().querySelector('a[href="/"] .an-icon svg')!.getAttribute("stroke-width")).not.toBe("2.5");
    });

    it("shows one active fill per form shape, only on the active link", () => {
        render(AppNavigationHarness, { props: { active: "/quiz" } });
        expect(side().querySelectorAll(".an-fill")).toHaveLength(2);
        expect(side().querySelector('a[href="/quiz"] .an-fill-rail')!.className).toContain("bg-tabbar-active");
        expect(side().querySelector('a[href="/quiz"] .an-fill-side')!.className).toContain("bg-nav-menu-active");
        expect(side().querySelector('a[href="/"] .an-fill')).toBeNull();
    });

    it("names a link with a count as the tab bar does, and caps the shown count", () => {
        render(AppNavigationHarness, { props: { badgeMax: 2 } });
        const link = within(side()).getByRole("link", { name: "Inbox, 3 new", hidden: true });
        expect(link.textContent).toContain("2+");
        expect(link.querySelector(".an-badge")!.getAttribute("aria-hidden")).toBe("true");
        // The same name in the tab bar.
        expect(within(tabs()).getByRole("link", { name: "Inbox, 3 new", hidden: true })).toBeTruthy();
    });

    it("takes badgeLabel for the name in both forms", () => {
        render(AppNavigationHarness, { props: { badgeLabel: (count: number) => `${count} unread` } });
        expect(within(side()).getByRole("link", { name: "Inbox, 3 unread", hidden: true })).toBeTruthy();
        expect(within(tabs()).getByRole("link", { name: "Inbox, 3 unread", hidden: true })).toBeTruthy();
    });

    it("gives the links the focus ring and no outline mark of their own", () => {
        render(AppNavigationHarness, { props: { active: "/quiz" } });
        const link = side().querySelector<HTMLElement>('a[href="/quiz"]')!;
        expect(link.className).toContain("focus-ring");
        expect(link.className).toContain("focus-ring--nav");
        expect(link.className).toContain("duration-(--duration-base)");
        expect(link.className).not.toMatch(/(^|\s)outline|ring-2|border-s/);
    });

    it("has a surface of the page colour and a hairline on the content side", () => {
        render(AppNavigationHarness);
        expect(side().className).toContain("bg-surface-chrome");
        expect(side().className).toContain("border-e");
        expect(side().className).toContain("border-border-weak");
    });

    it("passes floating to the tab bar form", () => {
        render(AppNavigationHarness, { props: { floating: true } });
        expect(tabs().getAttribute("data-floating")).toBe("true");
    });

    it("renders header and footer in the side form only, before and after the list", () => {
        render(AppNavigationHarness, { props: { withSlots: true } });
        const header = screen.getByTestId("an-header");
        const footer = screen.getByTestId("an-footer");
        const list = side().querySelector("ul")!;
        expect(side().contains(header)).toBe(true);
        expect(tabs().contains(header)).toBe(false);
        expect(header.compareDocumentPosition(list) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
        expect(list.compareDocumentPosition(footer) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    });

    it("tells the snippets the shell's side placement, sidebar by default", () => {
        render(NavigationHarness, { props: { navigationPlacement: "rail" } });
        expect(screen.getByTestId("nav-header").textContent).toBe("Header rail");
        cleanup();
        render(NavigationHarness);
        expect(screen.getByTestId("nav-header").textContent).toBe("Header sidebar");
        expect(screen.getByTestId("nav-footer").textContent).toBe("Footer sidebar");
    });

    it("merges class and passes other attributes to its root", () => {
        render(AppNavigationHarness, { props: { class: "extra" } });
        const root = screen.getByTestId("an");
        expect(root.className).toContain("extra");
        expect(root.className).toContain("an");
    });
});
