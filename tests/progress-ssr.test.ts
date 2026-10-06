// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import Progress from "../src/components/atoms/Progress.svelte";

vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

describe("Progress on the server", () => {
    it("renders every segment, the count and the value text", () => {
        expect(typeof document).toBe("undefined");
        const { body } = renderOnServer(Progress, {
            props: { value: 4, max: 19, segmented: true, label: "Rundan" },
        });
        expect(body.match(/<span[^>]*aria-hidden="true"/g)).toHaveLength(19);
        expect(body.match(/bg-progress-fill/g)).toHaveLength(4);
        expect(body).toContain('aria-valuetext="4 of 19"');
        expect(body).toContain('aria-valuenow="4"');
        expect(body).toContain(">4 of 19<");
    });
});
