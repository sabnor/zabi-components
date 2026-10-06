// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import { mergeZabiStrings } from "../src/components/util/zabi-strings";
import ZabiStringsHarness from "./fixtures/ZabiStringsHarness.svelte";

/**
 * Compiled for the server, with no `document`. The provider is Svelte
 * context, so its words belong to the render they were given to: two
 * requests in two languages do not see each other's, which a module-level
 * store could not promise. The shared Vitest config resolves `svelte` with
 * the `browser` condition, so the server runtime is named by path.
 */
vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

const render = (props: Record<string, unknown>) =>
    renderOnServer(ZabiStringsHarness, { props: props as never }).body;

describe("ZabiStringsProvider on the server", () => {
    it("the first byte already has the app's words", () => {
        expect(typeof document).toBe("undefined");
        const body = render({ kind: "AppBar", strings: { common: { back: "Tillbaka" } } });
        expect(body).toMatch(/<a[^>]*aria-label="Tillbaka"/);
        expect(body).not.toContain('aria-label="Back"');
    });

    it("a component's own entry reaches the server's markup: Select's native select and its trigger", () => {
        const body = render({ kind: "SelectSheet", strings: { select: { placeholder: "Välj" } } });
        expect(body).toMatch(/<option[^>]*>\s*Välj/);
        expect(body).not.toContain("Select an option");
    });

    it("one render's words are not another's: each request has its own", () => {
        const swedish = render({ kind: "AppBar", strings: { common: { back: "Tillbaka" } } });
        const finnish = render({ kind: "AppBar", strings: { common: { back: "Takaisin" } } });
        const none = render({ kind: "AppBar" });
        expect(swedish).toContain('aria-label="Tillbaka"');
        expect(finnish).toContain('aria-label="Takaisin"');
        expect(finnish).not.toContain("Tillbaka");
        // And without a provider, after both: the English it always was.
        expect(none).toContain('aria-label="Back"');
    });

    it("an inner provider merges over the outer, word by word", () => {
        const body = render({
            kind: "AppBar",
            strings: { common: { back: "Tillbaka", close: "Stäng" } },
            inner: { common: { back: "Bakåt" } },
        });
        expect(body).toContain('aria-label="Bakåt"');
        // The outer provider's own readers still have the outer words.
        expect(body).toMatch(/data-testid="outer-probe"[^>]*>\s*(?:<!---->)?Stäng/);
    });

    it("mergeZabiStrings: entry by entry, leaving what the inner one does not name", () => {
        const outer = { common: { close: "Stäng", back: "Tillbaka" }, select: { placeholder: "Välj" } };
        const merged = mergeZabiStrings(outer, { common: { close: "Stäng menyn" }, stepper: { step: () => "Steg" } as never });
        expect(merged.common).toEqual({ close: "Stäng menyn", back: "Tillbaka" });
        expect(merged.select).toEqual({ placeholder: "Välj" });
        expect(merged.stepper).toBeTruthy();
        // Neither input is changed.
        expect(outer.common).toEqual({ close: "Stäng", back: "Tillbaka" });
        expect(mergeZabiStrings(undefined, undefined)).toEqual({});
        expect(mergeZabiStrings(outer, undefined)).toBe(outer);
    });
});
