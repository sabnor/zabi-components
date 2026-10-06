import Bell from "@lucide/svelte/icons/bell";
import House from "@lucide/svelte/icons/house";
import Trophy from "@lucide/svelte/icons/trophy";
import User from "@lucide/svelte/icons/user";
import Users from "@lucide/svelte/icons/users";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import BottomTabBar from "../src/components/molecules/BottomTabBar.svelte";
import {
    activeTabHref,
    tabMatchesPath,
    type BottomTabBarItem,
} from "../src/components/util/bottom-tab-bar";

const items: BottomTabBarItem[] = [
    { href: "/", label: "Home", icon: House },
    { href: "/quiz", label: "Quiz", icon: Trophy },
    { href: "/teams", label: "Teams", icon: Users },
    { href: "/inbox", label: "Inbox", icon: Bell, badge: 3 },
    { href: "/me", label: "Me", icon: User },
];

/** jsdom does not navigate; a followed link only logs "not implemented". */
const stay = (event: Event) => event.preventDefault();

const nav = () => screen.getByRole("navigation");
const links = () => within(nav()).getAllByRole("link") as HTMLAnchorElement[];
const current = () => links().filter((link) => link.getAttribute("aria-current") === "page");

beforeEach(() => {
    window.history.replaceState({}, "", "/");
});

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

describe("BottomTabBar semantics", () => {
    it("is a navigation landmark named Main, with one link per item", () => {
        render(BottomTabBar, { props: { items, active: "/quiz" } });
        expect(screen.getByRole("navigation", { name: "Main" })).toBe(nav());
        expect(links().map((link) => link.getAttribute("href"))).toEqual([
            "/",
            "/quiz",
            "/teams",
            "/inbox",
            "/me",
        ]);
        expect(nav().querySelectorAll("li")).toHaveLength(5);
    });

    it("takes its landmark name from label", () => {
        render(BottomTabBar, { props: { items, active: "/quiz", label: "Huvudmeny" } });
        expect(screen.getByRole("navigation", { name: "Huvudmeny" })).toBeTruthy();
    });

    it("names each link by its label alone: the icon is decorative", () => {
        render(BottomTabBar, { props: { items, active: "/quiz" } });
        expect(screen.getByRole("link", { name: "Quiz" })).toBeTruthy();
        for (const link of links()) {
            const icon = link.querySelector("svg");
            expect(icon, "Each tab has an icon").not.toBeNull();
            expect(icon!.closest('[aria-hidden="true"]')).not.toBeNull();
        }
    });

    it("passes other attributes to the nav and merges class", () => {
        render(BottomTabBar, {
            props: { items, active: "/quiz", class: "md:hidden", "data-testid": "tabs" },
        });
        expect(screen.getByTestId("tabs")).toBe(nav());
        expect(nav().className).toContain("md:hidden");
        expect(nav().className).toContain("material-bar");
        expect(nav().className).not.toContain("bg-surface-elevated");
        expect(nav().className).not.toContain("border-t");
        expect(nav().getAttribute("data-bar-edge")).toBe("bottom");
    });
});

describe("BottomTabBar active tab", () => {
    it("marks exactly the tab whose href is active", () => {
        render(BottomTabBar, { props: { items, active: "/teams" } });
        expect(current().map((link) => link.textContent?.trim())).toEqual(["Teams"]);
    });

    it("keeps a tab marked on the pages under it", () => {
        render(BottomTabBar, { props: { items, active: "/quiz/round/3" } });
        expect(current().map((link) => link.getAttribute("href"))).toEqual(["/quiz"]);
    });

    it("matches the root only exactly", () => {
        const { unmount } = render(BottomTabBar, { props: { items, active: "/" } });
        expect(current().map((link) => link.getAttribute("href"))).toEqual(["/"]);
        unmount();
        render(BottomTabBar, { props: { items, active: "/settings" } });
        expect(current(), "No tab for this page: none is marked").toEqual([]);
    });

    it("marks the most specific tab when two match", () => {
        const nested: BottomTabBarItem[] = [
            { href: "/quiz", label: "Quiz", icon: Trophy },
            { href: "/quiz/live", label: "Live", icon: Bell },
            { href: "/me", label: "Me", icon: User },
        ];
        render(BottomTabBar, { props: { items: nested, active: "/quiz/live/3" } });
        expect(current().map((link) => link.getAttribute("href"))).toEqual(["/quiz/live"]);
    });

    it("defaults to the page it is on", async () => {
        window.history.replaceState({}, "", "/inbox/unread");
        render(BottomTabBar, { props: { items } });
        await waitFor(() =>
            expect(current().map((link) => link.getAttribute("href"))).toEqual(["/inbox"]),
        );
    });

    it("follows back and forward while no active tab is passed", async () => {
        window.history.replaceState({}, "", "/quiz");
        render(BottomTabBar, { props: { items } });
        await waitFor(() => expect(current()).toHaveLength(1));

        window.history.pushState({}, "", "/me");
        window.dispatchEvent(new PopStateEvent("popstate"));
        await waitFor(() =>
            expect(current().map((link) => link.getAttribute("href"))).toEqual(["/me"]),
        );
    });

    it("lets active win over the address", async () => {
        window.history.replaceState({}, "", "/inbox");
        render(BottomTabBar, { props: { items, active: "/me" } });
        await Promise.resolve();
        expect(current().map((link) => link.getAttribute("href"))).toEqual(["/me"]);
    });

    it("shows the active tab by more than colour", () => {
        render(BottomTabBar, { props: { items, active: "/quiz" } });
        const [active] = current();
        const idle = links()[0];
        expect(active.className).toContain("font-semibold");
        expect(active.querySelector("span")!.className).toContain("bg-nav-menu-active");
        expect(active.querySelector("span")!.className).toContain("--color-action-primary");
        expect(idle.className).not.toContain("font-semibold");
        expect(idle.querySelector("span")!.className).not.toContain("bg-nav-menu-active");
    });

    it("keeps a shape on the active tab in forced-colors mode, where its fill is dropped", () => {
        render(BottomTabBar, { props: { items, active: "/quiz" } });
        const [active] = current();
        const idle = links()[0];
        // A transparent outline is invisible until the system paints it.
        expect(active.querySelector("span")!.className).toContain("outline-2");
        // A 2px outline in the action colour: the mark that reaches 3:1 against the bar.
        expect(active.querySelector("span")!.className).toContain("outline-2");
        expect(active.querySelector("span")!.className).toContain("outline-(color:--color-action-primary)");
        expect(active.querySelector("span")!.className).not.toContain("outline-transparent");
        expect(idle.querySelector("span")!.className).not.toContain("outline-2");
    });

    it("never clears the selection when the active tab is pressed again", async () => {
        const user = userEvent.setup();
        const onclick = vi.fn(stay);
        render(BottomTabBar, { props: { items, active: "/quiz", onclick } });
        const [active] = current();

        await user.click(active);
        await user.click(active);

        // An ordinary link press: it reaches the page, and nothing is toggled.
        expect(onclick).toHaveBeenCalledTimes(2);
        expect(current()).toEqual([active]);
    });
});

describe("BottomTabBar badges", () => {
    it("shows the count and adds it to the name of the link", () => {
        render(BottomTabBar, { props: { items, active: "/quiz" } });
        const inbox = screen.getByRole("link", { name: "Inbox, 3 new" });
        expect(inbox.getAttribute("href")).toBe("/inbox");
        // The visible label still starts the name, for voice control.
        expect(inbox.getAttribute("aria-label")!.startsWith("Inbox")).toBe(true);
        const badge = within(inbox).getByText("3");
        expect(badge.closest('[aria-hidden="true"]')).not.toBeNull();
        // From the icon's upper trailing corner outwards, in either writing
        // direction, and sized in px: it does not grow over the icon with the text.
        expect(badge.className).toContain("start-4");
        expect(badge.className).toContain("bottom-4");
        expect(badge.className).not.toMatch(/(?:^|\s)(?:left|right)-/);
        expect(badge.className).toContain("h-[18px]");
        expect(badge.className).toContain("text-[11px]");
        // Against the icon's own box, not the pill.
        expect(badge.parentElement!.className).toContain("relative");
        expect(badge.parentElement!.className).toContain("size-6");
        expect(badge.parentElement!.querySelector("svg")).not.toBeNull();
    });

    it("leaves a tab without a count, or with 0, alone", () => {
        const withZero = items.map((item) =>
            item.href === "/inbox" ? { ...item, badge: 0 } : item,
        );
        render(BottomTabBar, { props: { items: withZero, active: "/quiz" } });
        const inbox = screen.getByRole("link", { name: "Inbox" });
        expect(inbox.hasAttribute("aria-label")).toBe(false);
        expect(within(inbox).queryByText("0")).toBeNull();
    });

    it("takes the wording from badgeLabel", () => {
        const badgeLabel = vi.fn(
            (count: number, item: BottomTabBarItem) => `${count} olästa i ${item.label}`,
        );
        render(BottomTabBar, { props: { items, active: "/quiz", badgeLabel } });
        expect(screen.getByRole("link", { name: "Inbox, 3 olästa i Inbox" })).toBeTruthy();
        expect(badgeLabel).toHaveBeenCalledWith(3, items[3]);
    });

    it("caps what is shown but not what is read out", () => {
        const many = items.map((item) =>
            item.href === "/inbox" ? { ...item, badge: 120 } : item,
        );
        const { unmount } = render(BottomTabBar, { props: { items: many, active: "/quiz" } });
        const inbox = screen.getByRole("link", { name: "Inbox, 120 new" });
        expect(within(inbox).getByText("99+")).toBeTruthy();
        unmount();

        render(BottomTabBar, { props: { items: many, active: "/quiz", badgeMax: 9 } });
        expect(within(screen.getByRole("link", { name: "Inbox, 120 new" })).getByText("9+")).toBeTruthy();
    });
});

describe("BottomTabBar keyboard", () => {
    it("is one Tab stop per tab, in order, and Enter follows the link", async () => {
        const user = userEvent.setup();
        const onclick = vi.fn(stay);
        render(BottomTabBar, { props: { items, active: "/quiz", onclick } });

        for (const link of links()) {
            await user.tab();
            expect(document.activeElement).toBe(link);
        }
        await user.keyboard("{Enter}");
        expect(onclick).toHaveBeenCalledTimes(1);
        expect((onclick.mock.calls[0][0].target as Element).closest("a")).toBe(links()[4]);
    });

    it("gives every link a visible focus style", () => {
        render(BottomTabBar, { props: { items, active: "/quiz" } });
        for (const link of links()) expect(link.className).toContain("focus-ring");
    });
});

describe("BottomTabBar placement", () => {
    it("is fixed to the bottom of the screen on its own, clear of the home indicator", () => {
        render(BottomTabBar, { props: { items, active: "/quiz" } });
        expect(nav().getAttribute("data-position")).toBe("fixed");
        expect(nav().className).toContain("fixed");
        expect(nav().className).toContain("bottom-0");
        expect(nav().className).toContain("env(safe-area-inset-bottom)");
    });

    it("stays in the page with position static", () => {
        render(BottomTabBar, { props: { items, active: "/quiz", position: "static" } });
        expect(nav().getAttribute("data-position")).toBe("static");
        expect(nav().className).not.toContain("fixed");
        expect(nav().className).toContain("env(safe-area-inset-bottom)");
    });

    it("sizes the bar in px and from its own width, with one-line labels", () => {
        render(BottomTabBar, { props: { items, active: "/quiz" } });
        // Layout is checked in the browser (playwright/bars-text-size.spec.ts
        // and playwright/app-shell.spec.ts); this pins what it comes from.
        // The spacing scale is in px inside the bar: `min-h-14` is 56px at
        // any text size, where it used to be 3.5rem.
        expect(nav().className).toContain("[--spacing:4px]");
        expect(nav().className).toContain("tabbar");
        // The gaps and the 44px floor are worked out from the number of tabs.
        expect(nav().style.getPropertyValue("--tabbar-count")).toBe(String(items.length));
        expect(nav().querySelector("ul")!.className).toContain("tabbar-list");
        for (const link of links()) {
            expect(link.className).toContain("min-h-14");
            expect(link.parentElement!.className).toContain("tabbar-tab");
            // The label is the link's name, on one line, in its own element.
            const label = link.querySelector(".tabbar-label")!;
            expect(label.textContent!.trim().length).toBeGreaterThan(0);
            expect(label.className).not.toContain("hyphens-auto");
        }
    });
});

describe("BottomTabBar item count", () => {
    it.each([3, 4, 5])("accepts %i items quietly", (count) => {
        const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
        render(BottomTabBar, { props: { items: items.slice(0, count), active: "/quiz" } });
        expect(warn).not.toHaveBeenCalled();
    });

    it.each([
        [2, items.slice(0, 2)],
        [6, [...items, { href: "/more", label: "More", icon: User }]],
    ])("warns in development about %i items, and still renders them", async (count, list) => {
        const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
        render(BottomTabBar, { props: { items: list, active: "/quiz" } });
        await waitFor(() => expect(warn).toHaveBeenCalledTimes(1));
        expect(String(warn.mock.calls[0][0])).toContain(`got ${count}`);
        expect(links()).toHaveLength(count);
    });
});

describe("tab matching", () => {
    it("matches a page and the pages under it, on whole segments", () => {
        expect(tabMatchesPath("/quiz", "/quiz")).toBe(true);
        expect(tabMatchesPath("/quiz", "/quiz/3")).toBe(true);
        expect(tabMatchesPath("/quiz", "/quizzes")).toBe(false);
        expect(tabMatchesPath("/quiz/", "/quiz")).toBe(true);
        expect(tabMatchesPath("/quiz?sort=new", "/quiz/3")).toBe(true);
    });

    it("matches the root, absolute URLs and path-less hrefs only exactly", () => {
        expect(tabMatchesPath("/", "/")).toBe(true);
        expect(tabMatchesPath("/", "/quiz")).toBe(false);
        expect(tabMatchesPath("https://example.com/a", "https://example.com/a")).toBe(true);
        expect(tabMatchesPath("https://example.com/a", "https://example.com/a/b")).toBe(false);
        expect(tabMatchesPath("#top", "#top")).toBe(true);
        expect(tabMatchesPath("#top", "#other")).toBe(false);
        expect(tabMatchesPath("/quiz", "")).toBe(false);
    });

    it("prefers an exact href over a longer prefix", () => {
        expect(activeTabHref(items, "/quiz")).toBe("/quiz");
        expect(activeTabHref(items, undefined)).toBeUndefined();
        expect(activeTabHref(items, "/nowhere")).toBeUndefined();
    });
});

describe("BottomTabBar events", () => {
    it("does not swallow clicks: a handler on the nav sees them", async () => {
        const onclick = vi.fn(stay);
        render(BottomTabBar, { props: { items, active: "/quiz", onclick } });
        await fireEvent.click(links()[2]);
        expect(onclick).toHaveBeenCalledTimes(1);
    });
});
