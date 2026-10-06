// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import DrawerHarness from "./fixtures/DrawerHarness.svelte";

/**
 * The node environment makes Vite compile the component for the server, and
 * there is no `document` here: a portal, a scroll lock or an animation that
 * reached for one while rendering would throw. The shared Vitest config
 * resolves `svelte` with the `browser` condition, so the server runtime is
 * named by path.
 */
vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

describe("Drawer on the server", () => {
    it("renders nothing while closed", () => {
        const { body } = renderOnServer(DrawerHarness, { props: {} });
        expect(body).not.toContain('role="dialog"');
        expect(body).toContain("Open projects");
    });

    it("renders an open portalled drawer in place, wired, without a document", () => {
        expect(typeof document).toBe("undefined");
        const { body } = renderOnServer(DrawerHarness, {
            props: { initialOpen: true, description: "Pick where the page goes." },
        });

        const host = body.indexOf('data-testid="host"');
        const panel = /<div[^>]*role="dialog"[^>]*>/.exec(body);
        expect(panel).toBeTruthy();
        // In place in the markup; the client moves it to body on mount.
        expect(panel?.index ?? -1).toBeGreaterThan(host);
        expect(panel?.[0]).toContain('aria-modal="true"');

        const labelledBy = /aria-labelledby="([^"]+)"/.exec(panel?.[0] ?? "")?.[1];
        const describedBy = /aria-describedby="([^"]+)"/.exec(panel?.[0] ?? "")?.[1];
        expect(body).toMatch(new RegExp(`<h2[^>]*id="${labelledBy}"[^>]*>Choose a project`));
        expect(body).toMatch(
            new RegExp(`<p[^>]*id="${describedBy}"[^>]*>Pick where the page goes.`),
        );
    });
});
