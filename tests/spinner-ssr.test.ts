// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import Spinner from "../src/components/atoms/Spinner.svelte";

/**
 * Compiled for the server, with no `document`. The shared Vitest config
 * resolves `svelte` with the `browser` condition, so the server runtime is
 * named by path.
 */
vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

describe("Spinner on the server", () => {
    it("renders a hidden ring without a label", () => {
        expect(typeof document).toBe("undefined");
        const { body } = renderOnServer(Spinner, { props: {} });
        expect(body).toContain('aria-hidden="true"');
        expect(body).not.toContain('role="status"');
    });

    it("renders the status and its label", () => {
        const { body } = renderOnServer(Spinner, { props: { label: "Loading projects" } });
        expect(body).toMatch(/<span[^>]*role="status"/);
        expect(body).toContain("Loading projects");
    });
});
