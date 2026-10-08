// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import TopNavbarSheetHarness from "./fixtures/TopNavbarSheetHarness.svelte";

/**
 * Compiled for the server, with no `document`: the sheet is a closed
 * BottomSheet there, so nothing is portalled or locked until the page is
 * interactive. The shared Vitest config resolves `svelte` with the `browser`
 * condition, so the server runtime is named by path.
 */
vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

const items = [
    { label: "Docs", href: "/docs" },
    { label: "Theming", href: "/theming" },
];

describe("TopNavbar on the server", () => {
    it("renders the bar, the row of links and a closed menu button that names a dialog", () => {
        expect(typeof document).toBe("undefined");
        const { body } = renderOnServer(TopNavbarSheetHarness, {
            props: { brand: "Zabi", brandHref: "/", items, currentPath: "/docs" },
        });
        const button = /<button[^>]*aria-label="Open menu"[^>]*>/.exec(body)?.[0] ?? "";
        expect(button).toContain('aria-haspopup="dialog"');
        expect(button).toContain('aria-expanded="false"');
        expect(button).not.toContain("aria-controls");
        // The links are in the markup for the row; no sheet, and no second copy.
        expect(body).toContain('href="/docs"');
        expect(body.match(/href="\/theming"/g)).toHaveLength(1);
        expect(body).not.toContain('role="dialog"');
        expect(body).not.toContain("topnavbar-menu");
    });

    it("renders the inline menu as it was: no haspopup, no dialog", () => {
        const { body } = renderOnServer(TopNavbarSheetHarness, {
            props: { brand: "Zabi", items, menu: "inline" },
        });
        const button = /<button[^>]*aria-label="Open menu"[^>]*>/.exec(body)?.[0] ?? "";
        expect(button).not.toContain("aria-haspopup");
        expect(body).not.toContain('role="dialog"');
    });
});
