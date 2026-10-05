// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import FloatingActionButton from "../src/components/atoms/FloatingActionButton.svelte";
import { focusToasts } from "../src/components/molecules/toast-store";
import { getToastFocusables } from "../src/components/util/focus-utils";
import { topOverlayFooter } from "../src/components/util/overlay";
import OverlayToastHarness from "./fixtures/OverlayToastHarness.svelte";
import TooltipTouchHarness from "./fixtures/TooltipTouchHarness.svelte";

/**
 * Compiled for the server, with no `window`, `document`, `visualViewport` or
 * `ResizeObserver`: an overlay that followed the keyboard, registered its
 * footer or looked for toasts while rendering would throw, and so would a
 * floating button that measured itself. The shared Vitest config resolves
 * `svelte` with the `browser` condition, so the server runtime is named by
 * path.
 */
vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

describe("overlays with a toaster, on the server", () => {
    it.each(["modal", "sheet", "drawer", "slide"] as const)(
        "an open %s renders with no position of its own and no footer registered",
        (kind) => {
            expect(typeof document).toBe("undefined");
            const { body } = renderOnServer(OverlayToastHarness, { props: { kind } });
            const panel = /<div[^>]*role="dialog"[^>]*>/.exec(body)?.[0] ?? "";
            expect(panel).toContain('aria-modal="true"');
            // The root is marked for the keyboard rules, and not yet moved.
            const root = /<div[^>]*group\/overlay[^>]*>/.exec(body)?.[0] ?? "";
            expect(root).not.toBe("");
            expect(root).not.toContain("data-keyboard-open");
            expect(root).not.toMatch(/style="[^"]*bottom/);
            expect(topOverlayFooter()).toBeNull();
            // The toast region is there, at rest.
            const region = /<div[^>]*data-zabi-toaster[^>]*>/.exec(body)?.[0] ?? "";
            expect(region).toContain('role="region"');
            expect(region).not.toContain("data-at");
            expect(region).not.toContain("max-height");
        },
    );

    it("the toast helpers answer without a document", () => {
        expect(getToastFocusables()).toEqual([]);
        expect(focusToasts()).toBe(false);
    });
});

describe("FloatingActionButton on the server", () => {
    it("renders without measuring anything", () => {
        const { body } = renderOnServer(FloatingActionButton, { props: { label: "New quiz" } });
        expect(body).toMatch(/<button[^>]*aria-label="New quiz"/);
        expect(body).not.toContain("scroll-padding");
    });
});

describe("Tooltip on the server", () => {
    it("renders a disabled trigger undescribed, and the bubble closed and unpointable", () => {
        const { body } = renderOnServer(TooltipTouchHarness, { props: { triggerDisabled: true } });
        expect(body).toMatch(/<button[^>]*disabled/);
        expect(body).not.toContain("aria-describedby");
        const bubble = /<div[^>]*role="tooltip"[^>]*>/.exec(body)?.[0] ?? "";
        expect(bubble).toContain('data-visible="false"');
        expect(bubble).toContain('data-parked="true"');
        expect(bubble).toContain("pointer-events-none");
    });
});
