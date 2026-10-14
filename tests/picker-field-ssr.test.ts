// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import PickerFieldHarness from "./fixtures/PickerFieldHarness.svelte";

vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

const body = renderOnServer(PickerFieldHarness, { props: { scenario: "forms" } }).body;
const tags = (tag: string) => body.match(new RegExp(`<${tag}\\b(?:[^>"]|"[^"]*")*>`, "g")) ?? [];

describe("PickerField on the server", () => {
    it("is a named button with a hidden input for the form", () => {
        expect(typeof document).toBe("undefined");
        const button = tags("button")[0];
        expect(button).toContain('aria-haspopup="dialog"');
        expect(button).toMatch(/aria-labelledby="[^"]+-label [^"]+-value"/);
        expect(button).toMatch(/aria-describedby="[^"]+-hint"/);
        expect(body).toContain("The Bishops Arms");
        const hidden = tags("input")[0];
        expect(hidden).toContain('type="hidden"');
        expect(hidden).toContain('name="pub"');
        expect(hidden).toContain('value="42"');
    });

    it("the link form is a working link with no scripts needed", () => {
        const links = tags("a");
        expect(links[0]).toContain('href="/pubs/choose"');
        expect(links[0]).not.toContain("aria-haspopup");
        expect(links[0]).not.toContain("aria-expanded");
        expect(body).toContain("Choose a pub");
    });

    it("a disabled link has no href and says it is unavailable", () => {
        expect(tags("a")[1]).not.toContain("href=");
        expect(tags("a")[1]).toContain('aria-disabled="true"');
    });
});
