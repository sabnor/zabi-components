// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import Alert from "../src/components/molecules/Alert.svelte";

vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

const WIDTH = "border-[length:var(--zabi-alert-border-width,1px)]";
const html = (props: Record<string, unknown>) => renderOnServer(Alert, { props }).body;

describe("Alert edge on the server", () => {
    it("the default output differs from the former one only in the border width class", () => {
        const body = html({ variant: "info", title: "Hi", message: "There" });
        expect(body).toContain(WIDTH);
        expect(body.replace(WIDTH, "border")).toContain(
            'class="relative rounded-container p-4 border block w-full bg-info-subtle border-info-border text-info-text transition-colors duration-150 motion-reduce:transition-none"',
        );
        expect(body).toContain('role="status"');
        expect(body).not.toContain("border-transparent");
    });

    it("bordered={false} and brand render on the server", () => {
        const body = html({ variant: "brand", bordered: false, title: "x" });
        expect(body).toContain("border-transparent");
        expect(body).toContain("bg-action-primary-subtle");
        expect(body).toContain('role="status"');
    });
});
