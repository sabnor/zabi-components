// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import ConfirmDialogHarness from "./fixtures/ConfirmDialogHarness.svelte";

/**
 * The node environment makes Vite compile the component for the server. The
 * shared Vitest config resolves `svelte` with the `browser` condition, so the
 * server runtime is named by path.
 */
vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

describe("ConfirmDialog on the server", () => {
    it("renders nothing while closed", () => {
        const { body } = renderOnServer(ConfirmDialogHarness, { props: {} });
        expect(body).not.toContain('role="dialog"');
        expect(body).toContain("Delete project");
    });

    it("renders an open dialog with its description wired, without a document", () => {
        expect(typeof document).toBe("undefined");
        const { body } = renderOnServer(ConfirmDialogHarness, {
            props: { initialOpen: true, variant: "danger" },
        });

        const panel = /<div[^>]*role="dialog"[^>]*>/.exec(body)?.[0] ?? "";
        const describedBy = /aria-describedby="([^"]+)"/.exec(panel)?.[1];
        expect(describedBy).toBeTruthy();
        expect(body).toContain(
            `<p id="${describedBy}">The project and its files are removed for everyone.</p>`,
        );
        expect(panel).toContain('data-variant="danger"');
        expect(body).toContain("Cancel");
        expect(body).toContain("Confirm");
    });
});
