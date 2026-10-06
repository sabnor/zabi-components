// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import Rating from "../src/components/atoms/Rating.svelte";
import RatingHarness from "./fixtures/RatingHarness.svelte";

/**
 * Compiled for the server, with no `document`. The shared Vitest config
 * resolves `svelte` with the `browser` condition, so the server runtime is
 * named by path.
 */
vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

const radios = (body: string) => body.match(/<input[^>]*type="radio"[^>]*>/g) ?? [];

describe("Rating on the server", () => {
    it("renders the radio group with its name, the checked star and one Tab stop", () => {
        expect(typeof document).toBe("undefined");
        const { body } = renderOnServer(RatingHarness, { props: { initial: 4, clearable: true } });

        const group = /<div[^>]*role="radiogroup"[^>]*>/.exec(body)?.[0] ?? "";
        const labelId = /aria-labelledby="([^"]+)"/.exec(group)?.[1];
        expect(labelId).toBeTruthy();
        expect(body).toMatch(new RegExp(`<span[^>]*id="${labelId}"[^>]*>Quiz</span>`));

        const inputs = radios(body);
        expect(inputs).toHaveLength(5);
        expect(inputs.map((input) => /aria-label="([^"]+)"/.exec(input)?.[1])).toEqual([
            "1 of 5 stars",
            "2 of 5 stars",
            "3 of 5 stars",
            "4 of 5 stars",
            "5 of 5 stars",
        ]);
        expect(inputs.map((input) => /\schecked/.test(input))).toEqual([
            false,
            false,
            false,
            true,
            false,
        ]);
        expect(inputs.map((input) => /tabindex="(-?\d)"/.exec(input)?.[1])).toEqual([
            "-1",
            "-1",
            "-1",
            "0",
            "-1",
        ]);
        expect(inputs.every((input) => input.includes('name="quiz"'))).toBe(true);
        // Filled before any script runs.
        expect(body.match(/<label[^>]*data-on[^>]*>/g)).toHaveLength(4);
        expect(body).toContain('aria-label="Clear rating"');
    });

    it("renders an empty rating with nothing checked and the first star as the Tab stop", () => {
        const { body } = renderOnServer(Rating, { props: { label: "Quiz" } });
        const inputs = radios(body);
        expect(inputs.some((input) => /\schecked/.test(input))).toBe(false);
        expect(inputs.map((input) => /tabindex="(-?\d)"/.exec(input)?.[1])).toEqual([
            "0",
            "-1",
            "-1",
            "-1",
            "-1",
        ]);
        expect(body).not.toContain("data-on");
        expect(body).not.toContain("Clear rating");
    });

    it("renders a read-only score as one named image with partly filled stars", () => {
        const { body } = renderOnServer(Rating, {
            props: { label: "Quiz", value: 3.5, readonly: true },
        });
        const host = /<div[^>]*role="img"[^>]*>/.exec(body)?.[0] ?? "";
        expect(host).toContain('aria-label="Quiz, 3.5 of 5 stars"');
        expect(radios(body)).toHaveLength(0);
        expect(
            [...body.matchAll(/--zabi-rating-fill:\s*([\d.]+)/g)].map((match) => match[1]),
        ).toEqual(["1", "1", "1", "0.5", "0"]);
        expect(body).toMatch(/data-rating-value[^>]*>\s*3\.5\s*</);
    });

    it("renders No rating for a read-only score without a value", () => {
        const { body } = renderOnServer(Rating, { props: { label: "Quiz", readonly: true } });
        expect(body).toContain('aria-label="Quiz, No rating"');
        expect(body).toMatch(/data-rating-value[^>]*>\s*No rating\s*</);
    });
});
