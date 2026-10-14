// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import GlassShellHarness from "./fixtures/GlassShellHarness.svelte";
import AppBar from "../src/components/molecules/AppBar.svelte";
import StickyActionBar from "../src/components/molecules/StickyActionBar.svelte";
import TopNavbar from "../src/components/organisms/TopNavbar.svelte";

vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

const tag = (body: string, re: RegExp) => re.exec(body)?.[0] ?? "";

describe("the glass bars on the server", () => {
    it("renders every bar flush, with the scroll state false", () => {
        const { body } = renderOnServer(GlassShellHarness, { props: {} });
        expect(tag(body, /<header[^>]*>/)).toContain('data-scrolled-under="false"');
        expect(tag(body, /<nav[^>]*aria-label="Main"[^>]*>/)).toContain('data-scrolled-under="false"');
        expect(tag(body, /<div[^>]*data-testid="sticky"[^>]*>/)).toContain('data-scrolled-under="false"');
        const host = tag(body, /<div[^>]*data-app-shell(?=[\s>=])[^>]*>/);
        expect(host).toContain('data-scrolled-top="false"');
        expect(host).toContain('data-scrolled-bottom="false"');
    });

    it("renders the footer over the scroller and the sticky bar above it, without scripts", () => {
        const { body } = renderOnServer(GlassShellHarness, { props: {} });
        expect(tag(body, /<div[^>]*data-app-shell-footer[^>]*>/)).toContain("absolute inset-x-0 bottom-0");
        expect(tag(body, /<div[^>]*data-testid="sticky"[^>]*>/)).toContain(
            "bottom: var(--app-shell-footer-overlay, 0px)",
        );
        expect(body).toContain("--app-shell-footer-overlay: var(--app-shell-bottom-inset)");
    });

    it("renders the glass when forced, and flush when forbidden", () => {
        const always = renderOnServer(GlassShellHarness, { props: { barScrollEdge: "always" } }).body;
        expect(tag(always, /<header[^>]*>/)).toContain('data-scrolled-under="true"');
        const never = renderOnServer(GlassShellHarness, { props: { barScrollEdge: "never" } }).body;
        expect(tag(never, /<header[^>]*>/)).toContain('data-scrolled-under="false"');
    });

    it("renders bars on their own flush", () => {
        expect(tag(renderOnServer(AppBar, { props: { title: "A" } }).body, /<header[^>]*>/)).toContain(
            'data-scrolled-under="false"',
        );
        expect(tag(renderOnServer(StickyActionBar, { props: {} }).body, /<div[^>]*>/)).toContain(
            'data-scrolled-under="false"',
        );
        expect(tag(renderOnServer(TopNavbar, { props: { brand: "B" } }).body, /<nav[^>]*>/)).toContain(
            'data-scrolled-under="false"',
        );
    });

    it("paints the canvas on request", () => {
        const { body } = renderOnServer(GlassShellHarness, { props: { canvas: true } });
        expect(tag(body, /<div[^>]*data-app-shell(?=[\s>=])[^>]*>/)).toContain("bg-canvas");
    });
});
