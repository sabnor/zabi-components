// @vitest-environment node
import Bell from "@lucide/svelte/icons/bell";
import House from "@lucide/svelte/icons/house";
import Trophy from "@lucide/svelte/icons/trophy";
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import BottomTabBar from "../src/components/molecules/BottomTabBar.svelte";

/**
 * Compiled for the server, with no `window`: working out the current page
 * must not reach for `location` while rendering. The shared Vitest config
 * resolves `svelte` with the `browser` condition, so the server runtime is
 * named by path.
 */
vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

const items = [
    { href: "/", label: "Home", icon: House },
    { href: "/quiz", label: "Quiz", icon: Trophy },
    { href: "/inbox", label: "Inbox", icon: Bell, badge: 3 },
];

const link = (body: string, href: string) =>
    new RegExp(`<a[^>]*href="${href}"[^>]*>`).exec(body)?.[0] ?? "";

describe("BottomTabBar on the server", () => {
    it("renders the links without a window, and marks none while it cannot know the page", () => {
        expect(typeof window).toBe("undefined");
        const { body } = renderOnServer(BottomTabBar, { props: { items } });
        expect(body).toMatch(/<nav[^>]*aria-label="Main"/);
        expect(link(body, "/")).not.toBe("");
        expect(link(body, "/quiz")).not.toBe("");
        expect(body).not.toContain("aria-current");
    });

    it("marks the active tab when the page is passed", () => {
        const { body } = renderOnServer(BottomTabBar, {
            props: { items, active: "/quiz/round/3" },
        });
        expect(link(body, "/quiz")).toContain('aria-current="page"');
        expect(link(body, "/")).not.toContain("aria-current");
        expect(body.match(/aria-current/g)).toHaveLength(1);
    });

    it("renders the count and its wording", () => {
        const { body } = renderOnServer(BottomTabBar, { props: { items, active: "/" } });
        expect(link(body, "/inbox")).toContain('aria-label="Inbox, 3 new"');
        expect(body).toMatch(/>\s*3\s*</);
    });

    it("is fixed on its own", () => {
        const { body } = renderOnServer(BottomTabBar, { props: { items, active: "/" } });
        expect(/<nav[^>]*>/.exec(body)?.[0]).toContain('data-position="fixed"');
    });
});
