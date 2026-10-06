// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import Stepper from "../src/components/molecules/Stepper.svelte";
import StepperHarness from "./fixtures/StepperHarness.svelte";

/**
 * Compiled for the server, with no `document`. The shared Vitest config
 * resolves `svelte` with the `browser` condition, so the server runtime is
 * named by path.
 *
 * Which layout shows is decided by CSS alone, so the markup that leaves the
 * server is already right for every width: one list, and one line for the
 * compact layout that is hidden from assistive technology.
 */
vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

const steps = (body: string) => body.match(/<li[^>]*class="stepper-step[^"]*"[^>]*>/g) ?? [];

describe("Stepper on the server", () => {
    it("renders the landmark, one list and the state of every step", () => {
        expect(typeof document).toBe("undefined");
        const { body } = renderOnServer(StepperHarness, { props: { initial: 1 } });

        expect(body).toMatch(/<nav[^>]*aria-label="Progress"/);
        expect(body).toMatch(/<nav[^>]*data-layout="auto"/);
        expect(body).toMatch(/<nav[^>]*data-size="md"/);
        expect(body.match(/<ol/g)).toHaveLength(1);

        const items = steps(body);
        expect(items).toHaveLength(3);
        expect(items.map((item) => /data-state="([^"]+)"/.exec(item)?.[1])).toEqual([
            "completed",
            "current",
            "upcoming",
        ]);
        expect(items.filter((item) => item.includes('aria-current="step"'))).toHaveLength(1);
        expect(items[1]).toContain('aria-current="step"');

        expect(body).toContain("Step 1 of 3: Details, completed");
        expect(body).toContain("Step 2 of 3: Ratings, current");
        expect(body).toContain("Step 3 of 3: Result + notes, upcoming");
    });

    it("renders the compact line hidden from assistive technology, and an empty status", () => {
        const { body } = renderOnServer(StepperHarness, { props: { initial: 1 } });
        const summary = /<div[^>]*data-stepper-summary[^>]*>[\s\S]*?<\/div>/.exec(body)?.[0] ?? "";
        expect(summary).toContain('aria-hidden="true"');
        expect(summary.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()).toBe(
            "Step 2 of 3 — Ratings",
        );
        expect(body).toMatch(/<span[^>]*role="status"[^>]*><\/span>/);
    });

    it("renders the completed steps as buttons when interactive", () => {
        const { body } = renderOnServer(StepperHarness, {
            props: { initial: 2, interactive: true },
        });
        expect(body.match(/<button[^>]*class="stepper-body[^"]*"[^>]*>/g)).toHaveLength(2);
        expect(body).toMatch(/<span[^>]*class="stepper-body[^"]*"[^>]*tabindex="-1"/);
    });

    it("shows an out-of-range value as the nearest step, and nothing at all without steps", () => {
        const far = renderOnServer(Stepper, { props: { steps: ["A", "B"], current: 9 } }).body;
        expect(steps(far).map((item) => /data-state="([^"]+)"/.exec(item)?.[1])).toEqual([
            "completed",
            "current",
        ]);
        const none = renderOnServer(Stepper, { props: { steps: [] } }).body;
        expect(none).not.toContain("<nav");
    });
});
