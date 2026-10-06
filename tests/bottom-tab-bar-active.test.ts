import Bell from "@lucide/svelte/icons/bell";
import House from "@lucide/svelte/icons/house";
import Star from "@lucide/svelte/icons/star";
import Trophy from "@lucide/svelte/icons/trophy";
import { cleanup, render, screen, within } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";

import BottomTabBar from "../src/components/molecules/BottomTabBar.svelte";
import type { BottomTabBarItem } from "../src/components/util/bottom-tab-bar";

const items: BottomTabBarItem[] = [
    { href: "/", label: "Home", icon: House },
    { href: "/quiz", label: "Quiz", icon: Trophy, activeIcon: Star },
    { href: "/inbox", label: "Inbox", icon: Bell, badge: 3 },
];

afterEach(cleanup);

const nav = () => screen.getByRole("navigation");
const link = (name: RegExp) => within(nav()).getByRole("link", { name });
const svgOf = (a: HTMLElement) => a.querySelector("svg")!;

describe("BottomTabBar active icon", () => {
    it("draws activeIcon instead of icon on the active tab, and icon when idle", () => {
        const { unmount } = render(BottomTabBar, { props: { items, active: "/quiz" } });
        expect(svgOf(link(/^Quiz/)).getAttribute("class")).toContain("lucide-star");
        unmount();
        render(BottomTabBar, { props: { items, active: "/" } });
        expect(svgOf(link(/^Quiz/)).getAttribute("class")).toContain("lucide-trophy");
    });

    it("draws the same icon heavier on the active tab when there is no activeIcon", () => {
        render(BottomTabBar, { props: { items, active: "/inbox" } });
        expect(svgOf(link(/^Inbox/)).getAttribute("stroke-width")).toBe("2.5");
        expect(svgOf(link(/^Home/)).getAttribute("stroke-width")).toBe("2");
    });

    it("does not thicken an activeIcon", () => {
        render(BottomTabBar, { props: { items, active: "/quiz" } });
        expect(svgOf(link(/^Quiz/)).getAttribute("stroke-width")).toBe("2");
    });
});

describe("BottomTabBar attention badge", () => {
    it("is the error solid badge with a ring in the bar colour", () => {
        render(BottomTabBar, { props: { items, active: "/" } });
        const badge = within(link(/^Inbox/)).getByText("3");
        expect(badge.className).toContain("bg-error");
        expect(badge.className).toContain("ring-2");
        expect(badge.className).toContain("--color-bar");
        expect(badge.className).toContain("start-4");
    });
});

describe("BottomTabBar floating", () => {
    it("is edge to edge by default", () => {
        render(BottomTabBar, { props: { items, active: "/" } });
        expect(nav().className).toContain("material-bar");
        expect(nav().querySelector(".material-layer-regular")).toBeNull();
    });

    it("is a glass capsule inside a transparent nav", () => {
        render(BottomTabBar, { props: { items, active: "/", floating: true } });
        expect(nav().getAttribute("aria-label")).toBe("Main");
        expect(nav().className).not.toContain("material-bar");
        expect(nav().className).toContain("12px");
        expect(nav().className).toContain("env(safe-area-inset-bottom)");
        expect(nav().className).toContain("fixed");
        const layer = nav().querySelector(".material-layer-regular")!;
        // The radius is the tab's 20px plus the inset, set in the style block.
        expect(layer.className).toContain("tabbar-capsule");
        expect(layer.className).toContain("relative");
        expect(layer.querySelectorAll("a")).toHaveLength(3);
    });
});
