// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import Slider from "../src/components/atoms/Slider.svelte";
import SliderHarness from "./fixtures/SliderHarness.svelte";

/**
 * Compiled for the server, with no `document`. The shared Vitest config
 * resolves `svelte` with the `browser` condition, so the server runtime is
 * named by path.
 */
vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

describe("Slider on the server", () => {
    it("renders the input with its value, fill and label wired", () => {
        expect(typeof document).toBe("undefined");
        const { body } = renderOnServer(SliderHarness, {
            props: { initial: 25, showValue: true, percent: true },
        });

        const input = /<input[^>]*type="range"[^>]*>/.exec(body)?.[0] ?? "";
        expect(input).toContain('value="25"');
        expect(input).toContain('aria-valuetext="25 %"');
        expect(input).toContain("--zabi-slider-ratio: 0.25");
        const id = /\sid="([^"]+)"/.exec(input)?.[1];
        expect(id).toBeTruthy();
        expect(body).toMatch(new RegExp(`<label[^>]*for="${id}"[^>]*>Volume`));
        expect(body).toMatch(new RegExp(`<output[^>]*for="${id}"`));
        expect(body).toContain("25 %");
    });

    it("starts at min without a value", () => {
        const { body } = renderOnServer(Slider, { props: { min: 20, max: 80 } });
        expect(/<input[^>]*type="range"[^>]*>/.exec(body)?.[0]).toContain('value="20"');
    });
});
