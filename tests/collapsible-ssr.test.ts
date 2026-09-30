// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import CollapsibleGroupHarness from "./fixtures/CollapsibleGroupHarness.svelte";
import CollapsibleHarness from "./fixtures/CollapsibleHarness.svelte";

/**
 * The node environment makes Vite compile the components for the server, which
 * is what SvelteKit does for the first response. Nothing here has a DOM.
 *
 * The shared Vitest config resolves `svelte` with the `browser` condition (the
 * other suites mount components in jsdom), so the server runtime is named
 * here by path. Without it `getContext` comes from the client runtime and
 * throws inside a server render.
 */
vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));
describe("Collapsible on the server", () => {
    it("renders the closed panel hidden, with matching ids", () => {
        const { body } = renderOnServer(CollapsibleHarness, { props: {} });

        const button = /<button[^>]*aria-controls="([^"]+)"[^>]*>/.exec(body);
        expect(button).toBeTruthy();
        expect(button?.[0]).toContain('aria-expanded="false"');
        const panel = new RegExp(`<div[^>]*id="${button?.[1]}"[^>]*>`).exec(body);
        expect(panel?.[0]).toContain("hidden");
        const triggerId = /id="([^"]+)"/.exec(button?.[0] ?? "")?.[1];
        expect(panel?.[0]).toContain(`aria-labelledby="${triggerId}"`);
        // Hidden, not absent: the content is in the markup.
        expect(body).toContain('data-testid="note"');
    });

    it("renders an open panel without hidden, and a group around its members", () => {
        const { body } = renderOnServer(CollapsibleGroupHarness, {
            props: { initial: ["general"] },
        });

        expect(body).toContain('aria-expanded="true"');
        const open = /<div[^>]*role="region"[^>]*>/.exec(body);
        expect(open).toBeTruthy();
        expect(open?.[0]).not.toContain("hidden");
        expect(body).toContain("<h3");
    });
});
