// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import ToneSsrHarness from "./fixtures/ToneSsrHarness.svelte";

vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

const body = renderOnServer(ToneSsrHarness, { props: {} }).body;

describe("Card and Block on the server", () => {
    it("a link card is an <a href> with its content inside", () => {
        expect(typeof document).toBe("undefined");
        const match = body.match(/<a\b[^>]*href="\/pubs\/1"[^>]*>([\s\S]*?)<\/a>/);
        expect(match).not.toBeNull();
        expect(match![0]).toContain("on-brand");
        expect(match![1]).toContain("Puben");
        expect(match![0]).not.toContain("role=");
    });

    it("a Block is its element with the fill classes", () => {
        expect(body).toMatch(/<section\b[^>]*class="[^"]*bg-card-tint[^"]*"[^>]*aria-label="Erbjudande"|<section\b[^>]*aria-label="Erbjudande"[^>]*class="[^"]*bg-card-tint/);
    });

    it("a custom fill is in the server style attribute", () => {
        expect(body).toContain("background-color: #123");
        expect(body).toContain("--zabi-on-fill: #fff");
    });
});
