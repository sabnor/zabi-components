// @vitest-environment node
import Bell from "@lucide/svelte/icons/bell";
import House from "@lucide/svelte/icons/house";
import Star from "@lucide/svelte/icons/star";
import Trophy from "@lucide/svelte/icons/trophy";
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import BottomTabBar from "../src/components/molecules/BottomTabBar.svelte";

vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

const items = [
    { href: "/", label: "Home", icon: House },
    { href: "/quiz", label: "Quiz", icon: Trophy, activeIcon: Star },
    { href: "/inbox", label: "Inbox", icon: Bell, badge: 3 },
];

describe("BottomTabBar active mark and floating on the server", () => {
    it("renders the active pill without an outline, with the forced-colors hook", () => {
        const { body } = renderOnServer(BottomTabBar, { props: { items, active: "/quiz" } });
        expect(body).toContain("bg-tabbar-active");
        expect(body).toContain("forced-colors:outline-2");
        expect(body).not.toMatch(/(?<!forced-colors:)outline-2/);
    });

    it("renders activeIcon, the heavier stroke and the error badge", () => {
        const swapped = renderOnServer(BottomTabBar, { props: { items, active: "/quiz" } }).body;
        expect(swapped).toContain("lucide-star");
        const heavier = renderOnServer(BottomTabBar, { props: { items, active: "/inbox" } }).body;
        expect(heavier).toContain('stroke-width="2.5"');
        expect(heavier).toContain("bg-error");
        expect(heavier).toContain("--color-bar");
    });

    it("renders the floating capsule and a nav without material-bar", () => {
        const { body } = renderOnServer(BottomTabBar, {
            props: { items, active: "/", floating: true },
        });
        const nav = /<nav[^>]*>/.exec(body)![0];
        expect(nav).not.toContain("material-bar");
        expect(nav).toContain('aria-label="Main"');
        expect(body).toContain("material-layer-regular");
        expect(body).toContain("rounded-[28px]");
    });
});
