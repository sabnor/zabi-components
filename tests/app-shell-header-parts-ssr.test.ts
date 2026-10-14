// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import AppShellPartsHarness from "./fixtures/AppShellPartsHarness.svelte";

vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

describe("AppShell header parts on the server", () => {
    it("renders the parts in order inside the header wrapper, before the content", () => {
        expect(typeof document).toBe("undefined");
        const { body } = renderOnServer(AppShellPartsHarness, { props: { sticky: [false, true, true] } });
        const bar = body.indexOf('data-testid="part-bar"');
        const filters = body.indexOf('data-testid="part-filters"');
        const tabs = body.indexOf('data-testid="part-tabs"');
        expect(bar).toBeGreaterThan(body.indexOf("data-app-shell-header"));
        expect(filters).toBeGreaterThan(bar);
        expect(tabs).toBeGreaterThan(filters);
        expect(body.indexOf("<main")).toBeGreaterThan(tabs);
        // The decision is in the markup, not in a script.
        expect(/data-sticky="false"[^>]*data-testid="part-bar"|data-testid="part-bar"[^>]*data-sticky="false"/.test(body)).toBe(true);
        expect(body).toContain('data-sticky="true"');
        // One banner, the app bar's own.
        expect(body.match(/<header/g)).toHaveLength(1);
        // The status bar strip is in the markup, hidden from assistive technology.
        expect(body).toMatch(/data-app-shell-strip[^>]*aria-hidden="true"|aria-hidden="true"[^>]*data-app-shell-strip/);
    });

    it("gives the host a usable top inset before anything is measured", () => {
        const { body } = renderOnServer(AppShellPartsHarness, {});
        expect(body).toContain("--app-shell-top-inset: calc(56px + env(safe-area-inset-top, 0px))");
    });
});
