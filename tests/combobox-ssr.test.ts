// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import Combobox from "../src/components/molecules/Combobox.svelte";

vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

describe("Combobox on the server", () => {
    it("renders a closed combobox with its label and live region", () => {
        expect(typeof document).toBe("undefined");
        const { body } = renderOnServer(Combobox, { props: { search: () => [], label: "Place" } });
        expect(body).toMatch(/<input[^>]*role="combobox"/);
        expect(body).toMatch(/aria-expanded="false"/);
        expect(body).toContain("Place");
        expect(body).toContain('aria-live="polite"');
        expect(body).not.toContain("listbox");
    });
});
