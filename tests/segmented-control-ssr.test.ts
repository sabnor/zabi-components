// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import SegmentedControl from "../src/components/molecules/SegmentedControl.svelte";
import SegmentedControlHarness from "./fixtures/SegmentedControlHarness.svelte";

/**
 * Compiled for the server, with no `document`. The shared Vitest config
 * resolves `svelte` with the `browser` condition, so the server runtime is
 * named by path.
 */
vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

const radios = (body: string) => body.match(/<input[^>]*type="radio"[^>]*>/g) ?? [];
const tabStops = (body: string) =>
    radios(body).map((input) => /tabindex="(-?\d)"/.exec(input)?.[1]);

describe("SegmentedControl on the server", () => {
    it("renders the radio group with its name, the checked segment and one Tab stop", () => {
        expect(typeof document).toBe("undefined");
        const { body } = renderOnServer(SegmentedControlHarness, { props: { initial: "maybe" } });

        const group = /<div[^>]*role="radiogroup"[^>]*>/.exec(body)?.[0] ?? "";
        expect(group).toContain('aria-label="Answer"');
        expect(group).toContain('data-size="md"');
        expect(group).toContain("data-full-width");

        const inputs = radios(body);
        expect(inputs.map((input) => /value="([^"]+)"/.exec(input)?.[1])).toEqual([
            "going",
            "maybe",
            "no",
        ]);
        expect(inputs.map((input) => /\schecked/.test(input))).toEqual([false, true, false]);
        expect(tabStops(body)).toEqual(["-1", "0", "-1"]);
        expect(inputs.every((input) => input.includes('name="answer"'))).toBe(true);
        expect(body).toContain("Going");
        expect(body).toContain("Can't");
    });

    it("is neutral by default and renders no indicator, so the checked segment draws its own look", () => {
        const { body } = renderOnServer(SegmentedControlHarness, { props: { initial: "maybe" } });
        const group = /<div[^>]*role="radiogroup"[^>]*>/.exec(body)?.[0] ?? "";
        expect(group).toContain('data-tone="neutral"');
        expect(group).not.toContain("data-indicator");
        expect(body).not.toContain("segment-indicator");
        expect(/\schecked/.test(radios(body)[1])).toBe(true);
    });

    it("renders nothing checked without a value, and warns about nothing", () => {
        const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
        const { body } = renderOnServer(SegmentedControl, {
            props: {
                "aria-labelledby": "question",
                options: [
                    { value: "list", label: "List", disabled: true },
                    { value: "month", label: "Month" },
                ],
            },
        });
        const group = /<div[^>]*role="radiogroup"[^>]*>/.exec(body)?.[0] ?? "";
        expect(group).toContain('aria-labelledby="question"');
        expect(group).not.toContain("aria-label=");
        expect(radios(body).some((input) => /\schecked/.test(input))).toBe(false);
        expect(tabStops(body)).toEqual(["-1", "0"]);
        expect(warn).not.toHaveBeenCalled();
        warn.mockRestore();
    });
});
