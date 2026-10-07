// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import SkeletonHarness from "./fixtures/SkeletonHarness.svelte";

/** Compiled for the server, with no `document` (see tests/zabi-strings-ssr.test.ts for the mock). */
vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

const render = (kind: string) => renderOnServer(SkeletonHarness, { props: { kind } as never }).body;

describe("Skeleton on the server (Z-094)", () => {
    it("a lone piece is one status named Loading…", () => {
        expect(typeof document).toBe("undefined");
        const body = render("lone");
        expect(body).toContain('role="status"');
        expect(body).toContain('aria-label="Loading…"');
    });

    it("a group is one status, its pieces hidden", () => {
        const body = render("group");
        expect(body.match(/role="status"/g)).toHaveLength(1);
        expect(body).toContain('aria-label="Laddar sidan"');
        expect(body).toContain('aria-hidden="true"');
    });

    it("the provider's label is in the first byte", () => {
        expect(render("provider")).toContain('aria-label="Laddar…"');
        expect(render("group-provider")).toContain('aria-label="Laddar…"');
    });
});
