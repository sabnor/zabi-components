// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import DateHarness from "./fixtures/DateHarness.svelte";

/** Compiled for the server, as in date-calendar-ssr.test.ts. */
vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

/** The markup without hydration comments and without the counter that numbers generated ids. */
const bare = (body: string) => body.replace(/<!--.*?-->/g, "").replace(/-ssr-\d+/g, "-ssr-N");

describe.each([
    ["date", "2026-10-06"],
    ["time", "19:00"],
] as const)("%s field with a locale, on the server", (piece, value) => {
    const props = { piece, initialValue: value, hint: "A hint.", min: value, required: true, name: "when" };

    it("is the native input, byte for byte what it is without a locale", () => {
        const plain = renderOnServer(DateHarness, { props }).body;
        const located = renderOnServer(DateHarness, { props: { ...props, locale: "sv", placeholder: "Välj", picker: "native" } }).body;
        expect(bare(located)).toBe(bare(plain));
        expect(located).toContain(`type="${piece}"`);
        expect(located).toContain(`value="${value}"`);
        expect(located).not.toContain("aria-haspopup");
        expect(located).not.toContain("aria-hidden");
        expect(located).not.toContain("tabindex");
    });
});
