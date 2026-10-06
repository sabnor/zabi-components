// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import ModalCloseHarness from "./fixtures/ModalCloseHarness.svelte";

/**
 * The node environment makes Vite compile the component for the server, and
 * there is no `document` here: a portal that reached for one while rendering
 * would throw. The shared Vitest config resolves `svelte` with the `browser`
 * condition, so the server runtime is named by path.
 */
vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

describe("Modal on the server", () => {
    it("renders an open portalled modal in place, without touching document", () => {
        expect(typeof document).toBe("undefined");
        const { body } = renderOnServer(ModalCloseHarness, {
            props: { portal: true, initialOpen: true },
        });

        const host = body.indexOf('data-testid="host"');
        const dialog = body.indexOf('role="dialog"');
        expect(host).toBeGreaterThan(-1);
        // In place in the markup; the client moves it to body on mount.
        expect(dialog).toBeGreaterThan(host);
        expect(body).toContain("Closing dialog");
    });

    it("renders nothing for a closed portalled modal", () => {
        const { body } = renderOnServer(ModalCloseHarness, {
            props: { portal: true },
        });
        expect(body).not.toContain('role="dialog"');
    });
});
