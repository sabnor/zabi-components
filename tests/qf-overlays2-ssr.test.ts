// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import { topOverlayFooter, topOverlayHeader } from "../src/components/util/overlay";
import SlideUpFooterHarness from "./fixtures/SlideUpFooterHarness.svelte";
import TwoTooltipsHarness from "./fixtures/TwoTooltipsHarness.svelte";

/**
 * Compiled for the server, with no `window`, `document` or `visualViewport`:
 * a SlideUp that registered its header and footer, a toast stack that read
 * the keyboard, or a tooltip that claimed to be the open one while rendering
 * would throw or leak into the next request. The shared Vitest config
 * resolves `svelte` with the `browser` condition, so the server runtime is
 * named by path.
 */
vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

describe("SlideUp with a footer, on the server", () => {
    it("renders the content as the scrolling box and the footer after it, with nothing registered", () => {
        expect(typeof document).toBe("undefined");
        const { body } = renderOnServer(SlideUpFooterHarness, { props: {} });
        const panel = /<div[^>]*role="dialog"[^>]*>/.exec(body)?.[0] ?? "";
        expect(panel).toContain("overflow-y-hidden");
        expect(body.indexOf("data-slide-up-content")).toBeGreaterThan(-1);
        expect(body.indexOf("data-slide-up-footer")).toBeGreaterThan(body.indexOf("data-slide-up-content"));
        expect(body).toMatch(/data-slide-up-footer[^>]*safe-area-inset-bottom|safe-area-inset-bottom[^>]*data-slide-up-footer/);
        expect(topOverlayFooter()).toBeNull();
        expect(topOverlayHeader()).toBeNull();
        // The toast stack is at rest: no inset, no height of its own.
        const region = /<div[^>]*data-zabi-toaster[^>]*>/.exec(body)?.[0] ?? "";
        expect(region).not.toContain("style=");
    });

    it("renders the one scrolling box without a footer", () => {
        const { body } = renderOnServer(SlideUpFooterHarness, { props: { withFooter: false } });
        const panel = /<div[^>]*role="dialog"[^>]*>/.exec(body)?.[0] ?? "";
        expect(panel).toContain("overflow-y-auto");
        expect(panel).not.toContain("overflow-y-hidden");
        expect(body).not.toContain("data-slide-up-footer");
        expect(body).not.toContain("data-slide-up-content");
    });
});

describe("Tooltips on the server", () => {
    it("render closed, unmirrored and with no tooltip claimed as open", () => {
        const { body } = renderOnServer(TwoTooltipsHarness, { props: {} });
        expect(body.match(/role="tooltip"/g)?.length).toBe(2);
        expect(body).not.toContain('data-visible="true"');
        expect(body).not.toContain("data-mirrored");
        expect(body).not.toContain("aria-describedby");
    });
});
