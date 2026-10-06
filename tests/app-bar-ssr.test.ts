// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import AppBarHarness from "./fixtures/AppBarHarness.svelte";

/**
 * Compiled for the server, with no `document`: finding the scrolling ancestor
 * and listening to it must wait until the bar runs in the browser. The shared
 * Vitest config resolves `svelte` with the `browser` condition, so the server
 * runtime is named by path.
 */
vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

describe("AppBar on the server", () => {
    it("renders the header, its heading, the back link and the actions", () => {
        expect(typeof document).toBe("undefined");
        const { body } = renderOnServer(AppBarHarness, {
            props: { backHref: "/quiz", withActions: true },
        });
        expect(body).toMatch(/<header[^>]*data-testid="bar"/);
        expect(body).toMatch(/<h1[^>]*>\s*Round 3(?:<!---->)?\s*<\/h1>/);
        expect(body).toMatch(/<a[^>]*href="\/quiz"[^>]*aria-label="Back"/);
        expect(body).toContain('aria-label="Search"');
        expect(body).toContain('aria-label="Share"');
    });

    it("renders showing when it collapses on scroll", () => {
        const { body } = renderOnServer(AppBarHarness, {
            props: { collapseOnScroll: true, inScroller: true },
        });
        const header = /<header[^>]*>/.exec(body)?.[0] ?? "";
        expect(header).toContain('data-collapsed="false"');
        expect(header).not.toContain("-translate-y");
    });

    it("says nothing about collapsing when it does not", () => {
        const { body } = renderOnServer(AppBarHarness, { props: {} });
        expect(/<header[^>]*>/.exec(body)?.[0]).not.toContain("data-collapsed");
    });

    it("leaves the title's row to the stylesheet until it can be measured in the browser", () => {
        const { body } = renderOnServer(AppBarHarness, {
            props: { backHref: "/quiz", withActions: true, withLeading: true, titleLines: 2 },
        });
        expect(body).not.toContain("data-title-row");
        expect(body).toMatch(/<h1[^>]*data-appbar-part="title"/);
        expect(body).toMatch(/<h1[^>]*class="[^"]*line-clamp-2/);
        // Back, leading, title, actions, in that order in the markup.
        const order = ["data-appbar-part=\"back\"", "data-testid=\"leading\"", "data-appbar-part=\"title\"", "data-appbar-part=\"actions\""].map((mark) => body.indexOf(mark));
        expect(order.every((at) => at > -1)).toBe(true);
        expect([...order].sort((a, b) => a - b)).toEqual(order);
    });
});
