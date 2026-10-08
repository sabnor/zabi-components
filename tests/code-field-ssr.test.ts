// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import CodeField from "../src/components/atoms/CodeField.svelte";

vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

describe("CodeField (server render)", () => {
    it("is one named input that posts its value by name, with no boxes drawn until the page is interactive", () => {
        const { body } = renderOnServer(CodeField, { props: { name: "code", value: "123" } });
        expect(body.match(/<input/g)).toHaveLength(1);
        expect(body).toMatch(/<input[^>]*name="code"/);
        expect(body).toMatch(/<input[^>]*value="123"/);
        expect(body).toMatch(/<input[^>]*autocomplete="one-time-code"/);
        expect(body).toMatch(/<input[^>]*inputmode="numeric"/);
        expect(body).toMatch(/<label[^>]*for="([^"]+)"[^>]*>\s*Verification code/);
        expect(body).toContain("6 digits");
        // Typing is visible without scripts: the input is not the transparent layer yet.
        expect(body).not.toContain("text-transparent");
        expect(body).not.toContain("data-code-cell");
    });

    it("renders the error, hint and attributes the same as Input", () => {
        const { body } = renderOnServer(CodeField, {
            props: { error: "Wrong code", hint: "Six digits", required: true, disabled: true, readonly: true },
        });
        expect(body).toMatch(/<input[^>]*aria-invalid="true"/);
        expect(body).toMatch(/<input[^>]*aria-required="true"/);
        expect(body).toMatch(/<input[^>]*disabled/);
        expect(body).toMatch(/<input[^>]*readonly/);
        expect(body).toContain('role="alert"');
        expect(body).toContain("Wrong code");
        expect(body).toContain("Six digits");
    });
});
