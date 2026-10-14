import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { cleanup, render, screen } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";

import Select from "../src/components/atoms/Select.svelte";

afterEach(cleanup);

describe("Select width (Z-089)", () => {
    it("the container keeps its hook, and the stylesheet caps it at its parent", () => {
        const { container } = render(Select, {
            props: { label: "Frequency", class: "w-48", options: [{ value: "a", label: "A" }] },
        });
        const root = container.querySelector(".select-container") as HTMLElement;
        expect(root.className.split(/\s+/)).toContain("w-48");
        // jsdom has no layout: the cap is a rule in the components layer (a caller's max-w-* utility wins).
        const css = readFileSync(resolve(process.cwd(), "src/app.css"), "utf8");
        expect(css).toMatch(/\.select-container\s*\{\s*max-width:\s*100%;/);
    });
});
