// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import NavigationHarness from "./fixtures/AppShellNavigationHarness.svelte";

vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

const host = (body: string) => /<div[^>]*data-app-shell(?=[\s>=])[^>]*>/.exec(body)?.[0] ?? "";

describe("AppShell with a navigation on the server", () => {
    it("is complete without scripts: the region first, the attribute, both forms of the navigation", () => {
        expect(typeof document).toBe("undefined");
        const { body } = renderOnServer(NavigationHarness, { props: {} });
        expect(host(body)).toContain('data-navigation-placement="auto"');
        const region = body.indexOf("data-app-shell-navigation");
        expect(region).toBeGreaterThan(-1);
        expect(region).toBeLessThan(body.indexOf("data-app-shell-scroller"));
        expect(region).toBeLessThan(body.indexOf("<header"));
        expect(body.match(/data-testid="appnav"/g)).toHaveLength(1);
        // Both forms are there for the stylesheet to choose between.
        expect(body.match(/<nav/g)).toHaveLength(2);
        expect(body).toContain("an-tabs");
        expect(body).toContain("an-side");
    });

    it("says the insets in CSS, so they are right before any script runs", () => {
        const { body } = renderOnServer(NavigationHarness, { props: { withFooter: true } });
        const tag = host(body);
        expect(tag).toContain("--app-shell-bottom-inset: calc(var(--shell-overlay) + 0px)");
        expect(tag).toContain("--app-shell-start-inset: var(--shell-start)");
        expect(tag).toContain("--shell-footer: calc(64px + env(safe-area-inset-bottom, 0px))");
    });

    it("gives the snippet tabs on the server in auto", () => {
        const { body } = renderOnServer(NavigationHarness, { props: {} });
        expect(body).toMatch(/data-testid="placement-arg"[^>]*>tabs</);
    });

    it("marks the active destination in both forms", () => {
        const { body } = renderOnServer(NavigationHarness, { props: { active: "/inbox" } });
        expect(body.match(/aria-current="page"/g)).toHaveLength(2);
    });
});
