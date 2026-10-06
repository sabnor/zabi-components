// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import DrawerHarness from "./fixtures/DrawerHarness.svelte";
import Toaster from "../src/components/molecules/Toaster.svelte";
import * as library from "../src/components/index";
import * as focusUtils from "../src/components/util/focus-utils";
import * as toaster from "../src/components/util/toaster";

/**
 * The node environment makes Vite compile the components for the server. The
 * shared Vitest config resolves `svelte` with the `browser` condition, so the
 * server runtime is named by path.
 */
vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

type Resolve = (
    toast: { duration?: unknown; type: string; hasAction: boolean; textLength: number },
    defaultDuration?: unknown,
) => number;

describe("toast lengths, without a document", () => {
    it("exports the three named lengths from the root, in milliseconds", () => {
        expect(typeof document).toBe("undefined");
        const exported = (library as unknown as { TOAST_DURATIONS?: Record<string, number> }).TOAST_DURATIONS;
        expect(exported).toEqual({ short: 3000, medium: 7000, long: 14000 });
    });

    it("resolves a toast's time from what the app said, then from what the toast is", () => {
        const resolve = (toaster as unknown as { resolveToastDuration?: Resolve }).resolveToastDuration;
        expect(resolve, "resolveToastDuration").toBeTypeOf("function");
        const plain = { type: "info", hasAction: false, textLength: 12 };
        // What the app said.
        expect(resolve!({ ...plain, duration: "short" })).toBe(3000);
        expect(resolve!({ ...plain, duration: "medium" })).toBe(7000);
        expect(resolve!({ ...plain, duration: "long" })).toBe(14000);
        expect(resolve!({ ...plain, duration: "persistent" })).toBe(0);
        expect(resolve!({ ...plain, duration: 0 })).toBe(0);
        expect(resolve!({ ...plain, duration: -5 })).toBe(0);
        expect(resolve!({ ...plain, duration: 2500 })).toBe(2500);
        expect(resolve!({ ...plain, type: "error", duration: "short" })).toBe(3000);
        expect(resolve!({ ...plain, hasAction: true, duration: "long" })).toBe(14000);
        expect(resolve!({ ...plain, textLength: 500, duration: "short" })).toBe(3000);
        expect(resolve!({ ...plain, textLength: 500, duration: 2500 })).toBe(2500);
        // What the toast is.
        expect(resolve!(plain)).toBe(7000);
        expect(resolve!({ ...plain, textLength: 120 })).toBe(7000);
        expect(resolve!({ ...plain, textLength: 121 })).toBe(14000);
        expect(resolve!({ ...plain, textLength: 240 })).toBe(14000);
        expect(resolve!({ ...plain, textLength: 241 })).toBe(0);
        expect(resolve!({ ...plain, type: "error" })).toBe(0);
        expect(resolve!({ ...plain, hasAction: true })).toBe(0);
        // The Toaster's default, in place of medium.
        expect(resolve!(plain, "short")).toBe(3000);
        expect(resolve!(plain, 30000)).toBe(30000);
        expect(resolve!(plain, "persistent")).toBe(0);
        expect(resolve!({ ...plain, textLength: 121 }, "short")).toBe(14000);
        expect(resolve!({ ...plain, textLength: 121 }, 30000)).toBe(30000);
        expect(resolve!({ ...plain, textLength: 121 }, "persistent")).toBe(0);
        // More than 240 stays, whatever the default.
        expect(resolve!({ ...plain, textLength: 241 }, "short")).toBe(0);
        expect(resolve!({ ...plain, textLength: 241 }, "long")).toBe(0);
        expect(resolve!({ ...plain, textLength: 241 }, 30000)).toBe(0);
        expect(resolve!({ ...plain, type: "error" }, "short")).toBe(0);
        expect(resolve!({ ...plain, hasAction: true }, "short")).toBe(0);
        // A word that is not one of the four (a typo from JavaScript) is as if nothing was said.
        expect(resolve!({ ...plain, duration: "brief" })).toBe(7000);
        expect(resolve!({ ...plain, duration: Number.NaN })).toBe(7000);
    });

    it("renders a Toaster with a default length, empty, with its region named", () => {
        const { body } = renderOnServer(Toaster, { props: { defaultDuration: "long" } });
        expect(body).toContain("data-zabi-toaster");
        expect(body).toContain('aria-label="Notifications"');
        expect(body).not.toContain("data-toast-id");
        // Not an attribute of the region: the prop is the toaster's own.
        expect(body.toLowerCase()).not.toContain("defaultduration");
    });

    it("tells nothing apart as inside a toast where there is no document", () => {
        const inside = (focusUtils as unknown as { isInsideToastRegion?: (target: unknown) => boolean })
            .isInsideToastRegion;
        expect(inside, "isInsideToastRegion").toBeTypeOf("function");
        expect(inside!(null)).toBe(false);
        expect(inside!({})).toBe(false);
    });

    it("serves an open Drawer padded for the home indicator", () => {
        const { body } = renderOnServer(DrawerHarness, { props: { initialOpen: true } });
        const panel = /<div[^>]*role="dialog"[^>]*>/.exec(body)?.[0] ?? "";
        expect(panel).toContain("pb-[env(safe-area-inset-bottom,0px)]");
    });
});
