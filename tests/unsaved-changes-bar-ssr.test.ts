// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import UnsavedChangesBarHarness from "./fixtures/UnsavedChangesBarHarness.svelte";

/**
 * Compiled for the server, with no `document`: the focus handling must not
 * reach for one while rendering. The shared Vitest config resolves `svelte`
 * with the `browser` condition, so the server runtime is named by path.
 */
vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

describe("UnsavedChangesBar on the server", () => {
    it("renders an empty host with a silent status while clean", () => {
        expect(typeof document).toBe("undefined");
        const { body } = renderOnServer(UnsavedChangesBarHarness, { props: {} });
        expect(body).toContain('data-testid="bar"');
        expect(body).not.toContain('role="region"');
        expect(body).toMatch(/<p[^>]*role="status"[^>]*>\s*<\/p>/);
        expect(body).not.toContain(">Save<");
    });

    it("renders the bar, its message and its buttons when dirty", () => {
        const { body } = renderOnServer(UnsavedChangesBarHarness, {
            props: { initialDirty: true },
        });
        const host = /<div[^>]*data-testid="bar"[^>]*>/.exec(body)?.[0] ?? "";
        expect(host).toContain('role="region"');
        expect(host).toContain('aria-label="Unsaved changes"');
        expect(body).toMatch(/<p[^>]*role="status"[^>]*>\s*You have unsaved changes\s*<\/p>/);
        expect(body).toContain("Save");
        expect(body).toContain("Discard");
    });
});
