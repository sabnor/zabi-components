// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import ChipSsrHarness from "./fixtures/ChipSsrHarness.svelte";

/**
 * Compiled for the server, with no `document`: what a visitor gets before any
 * script runs. The shared Vitest config resolves `svelte` with the `browser`
 * condition, so the server runtime is named by path.
 */
vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

const html = (scenario: string) => renderOnServer(ChipSsrHarness, { props: { scenario } }).body;
const tags = (body: string, tag: string) => body.match(new RegExp(`<${tag}\\b(?:[^>"]|"[^"]*")*>`, "g")) ?? [];

describe("Chip on the server", () => {
    it("a link chip is an <a href> with aria-current while selected, and nothing else is needed", () => {
        expect(typeof document).toBe("undefined");
        const links = tags(html("forms"), "a");
        expect(links[0]).toContain('href="/pubs?filter=open"');
        expect(links[0]).toContain('aria-current="true"');
        expect(links[1]).toContain('href="/pubs?filter=all"');
        expect(links[1]).not.toContain("aria-current");
    });

    it("a disabled link has no href and says it is unavailable", () => {
        const gone = tags(html("forms"), "a")[2];
        expect(gone).not.toContain("href=");
        expect(gone).toContain('aria-disabled="true"');
    });

    it("a toggle button is a type=button with aria-pressed", () => {
        const buttons = tags(html("forms"), "button");
        expect(buttons[0]).toContain('type="button"');
        expect(buttons[0]).toContain('aria-pressed="true"');
        expect(buttons[1]).toContain('aria-pressed="false"');
    });

    it("radio and checkbox chips are real inputs with name, value and checked, under a label", () => {
        const body = html("forms");
        const inputs = tags(body, "input");
        const small = inputs.find((input) => input.includes('value="s"'))!;
        const medium = inputs.find((input) => input.includes('value="m"'))!;
        const cheese = inputs.find((input) => input.includes('value="cheese"'))!;
        expect(small).toMatch(/type="radio"/);
        expect(small).toContain('name="size"');
        expect(small).toContain("checked");
        expect(medium).not.toContain("checked");
        expect(cheese).toMatch(/type="checkbox"/);
        expect(cheese).toContain('name="extra"');
        expect(cheese).toContain("checked");
        expect(cheese).toContain("required");
        expect(body).toMatch(/<label[^>]*>(?:<!--[^>]*-->)*<input[^>]*type="radio"/);
        expect(body).toContain("Small");
    });

    it("the selected look is carried by CSS on the native state, not by state", () => {
        const label = tags(html("forms"), "label")[0];
        expect(label).toContain("has-[:checked]:bg-chip-selected");
        expect(label).toContain("not-has-[:checked]:bg-chip");
    });
});

describe("ChipGroup on the server", () => {
    it("a radio group has the radiogroup role, its name, and the chosen chip checked", () => {
        const body = html("radio-group");
        expect(tags(body, "div")[0]).toMatch(/role="radiogroup"/);
        expect(tags(body, "div")[0]).toContain('aria-label="Plan"');
        const inputs = tags(body, "input");
        expect(inputs.every((input) => input.includes('name="plan"'))).toBe(true);
        expect(inputs.find((input) => input.includes('value="pro"'))).toContain("checked");
        expect(inputs.find((input) => input.includes('value="basic"'))).not.toContain("checked");
    });

    it("a checkbox group has the group role and checks the chips its value holds", () => {
        const body = html("checkbox-group");
        expect(tags(body, "div")[0]).toMatch(/role="group"/);
        const inputs = tags(body, "input");
        expect(inputs.find((input) => input.includes('value="ham"'))).toContain("checked");
        expect(inputs.find((input) => input.includes('value="cheese"'))).not.toContain("checked");
    });

    it("a row group renders one line: no wrap, a scroll box, and no fade before it is measured", () => {
        const body = html("row");
        const host = tags(body, "div")[0];
        expect(host).toContain("flex-nowrap");
        expect(host).toContain("overflow-x-auto");
        expect(host).not.toContain("flex-wrap ");
        expect(host).not.toContain("data-overflow");
        expect(body).toContain('aria-current="true"');
    });

    it("sub-groups in a row are named groups of their own, with no scroll box", () => {
        const divs = tags(html("subgroups"), "div");
        expect(divs[0]).toContain("overflow-x-auto");
        expect(divs[1]).toMatch(/role="radiogroup"/);
        expect(divs[1]).toContain('aria-label="Day"');
        expect(divs[1]).toContain("data-chip-subgroup");
        expect(divs[1]).not.toContain("overflow-x-auto");
        expect(divs[2]).toMatch(/role="group"/);
        expect(divs[2]).toContain('aria-label="Area"');
    });
});
