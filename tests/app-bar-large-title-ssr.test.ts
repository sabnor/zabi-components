// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import AppBarHarness from "./fixtures/AppBarHarness.svelte";

vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

describe("AppBar largeTitle on the server", () => {
    it("renders the whole header at top 0 with the large heading and a hidden small title", () => {
        const { body } = renderOnServer(AppBarHarness, {
            props: { largeTitle: true, backHref: "/quiz", withActions: true },
        });
        const header = /<header[^>]*>/.exec(body)?.[0] ?? "";
        expect(header).toContain('data-large-title');
        expect(header).not.toContain("style=");
        expect(header).toContain("top-0");
        expect(body).toMatch(/<h1[^>]*>\s*Round 3(?:<!---->)?\s*<\/h1>/);
        expect(body).toMatch(/<p[^>]*class="[^"]*opacity-0[^"]*"[^>]*data-appbar-part="title"[^>]*aria-hidden="true"|<p[^>]*aria-hidden="true"[^>]*>/);
        expect(body.match(/<h1/g)).toHaveLength(1);
        expect(body).toContain('data-condensed="false"');
    });

    it("writes the tone and keeps the default markup otherwise", () => {
        const plain = renderOnServer(AppBarHarness, { props: {} }).body;
        expect(plain).toContain('data-tone="default"');
        expect(plain).not.toContain("data-large-title");
        const brand = renderOnServer(AppBarHarness, { props: { tone: "brand" } }).body;
        expect(brand).toContain('data-tone="brand"');
        expect(brand).toContain("on-brand");
        expect(brand).toContain('data-scrolled-under="false"');
    });
});
