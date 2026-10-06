// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import SidebarShellHarness from "./fixtures/SidebarShellHarness.svelte";

/**
 * Compiled for the server, with no `document` and no `matchMedia`. The shared
 * Vitest config resolves `svelte` with the `browser` condition, so the server
 * runtime is named by path.
 */
vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

describe("SidebarShell on the server", () => {
    it("renders the rail alone, as before, without mobile", () => {
        expect(typeof document).toBe("undefined");
        const { body } = renderOnServer(SidebarShellHarness, { props: {} });
        expect(body.match(/<nav/g)).toHaveLength(1);
        expect(body).toContain('aria-label="Navigation links"');
        expect(body).not.toContain('role="dialog"');
        expect(body).not.toContain("data-sidebar-trigger");
    });

    it("drawer: the rail for lg and up, the trigger for below, and no drawer until it is opened", () => {
        const { body } = renderOnServer(SidebarShellHarness, { props: { mobile: "drawer" } });
        expect(body.match(/<nav/g)).toHaveLength(1);
        const nav = /<nav[^>]*>/.exec(body)![0];
        expect(nav).toContain("hidden");
        expect(nav).toContain("lg:flex");
        expect(body).toContain("data-sidebar-trigger");
        expect(body).toContain('aria-haspopup="dialog"');
        expect(body).not.toContain('role="dialog"');
    });
});
