// @vitest-environment node
import { readFileSync } from "node:fs";
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

describe("Rating server output without the new props", () => {
    // Captured from the code before compact, empty and the larger sizes.
    // The scoped-style hash changes with the stylesheet, so it is removed.
    // The server counter in ids and the index of the top-level branch marker
    // (a new `compact` branch was added before the old ones) are removed too.
    const strip = (html: string) =>
        html
            .replace(/svelte-[a-z0-9]+/g, "svelte-x")
            .replace(/rating-ssr-\d+/g, "rating-ssr-n")
            .replace(/^<!--\[--><!--\[-?\d+--/, "<!--[--><!--[n--");
    const baseline = JSON.parse(
        readFileSync(new URL("./fixtures/rating-baseline.json", import.meta.url), "utf8"),
    ) as { a: string; b: string };

    it("renders the default input as before", () => {
        const { body } = renderOnServer(Rating, {
            props: { label: "Quiz", value: 3, name: "q", clearable: true, id: "r" },
        });
        expect(strip(body)).toBe(strip(baseline.a));
    });

    it("renders the default read-only rating as before", () => {
        const { body } = renderOnServer(Rating, {
            props: { label: "Pub", value: 3.5, readonly: true, id: "r" },
        });
        expect(strip(body)).toBe(strip(baseline.b));
    });

    it("renders a compact score on the server", () => {
        const { body } = renderOnServer(Rating, { props: { compact: true, value: 4, max: 5 } });
        expect(body).toContain('role="img"');
        expect(body).toContain('aria-label="4 of 5 stars"');
        expect(body.match(/class="rating-glyph svelte/g)).toHaveLength(1);
        expect(body).toContain("data-rating-value");
    });
});
