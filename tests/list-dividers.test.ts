import { readFileSync } from "node:fs";
import { cleanup, render, screen } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";

import List from "../src/components/atoms/List.svelte";

afterEach(cleanup);

const items = [
    { id: "a", label: "Alpha" },
    { id: "b", label: "Beta" },
    { id: "c", label: "Gamma" },
];

describe("List: rows are told apart by dividers, not by a border each", () => {
    it("a row has a transparent border box, never border-border", () => {
        render(List, { props: { items, onclick: () => {} } });
        for (const row of screen.getAllByRole("button")) {
            const own = row.className.split(/\s+/);
            expect(own).toContain("border");
            expect(own).not.toContain("border-border");
            expect(own).toContain("border-[color:var(--zabi-list-row-border-color,transparent)]");
        }
    });

    it("the list carries the divider class, and a selected row marks itself", () => {
        render(List, { props: { items, selectedId: "b", onclick: () => {} } });
        expect(screen.getByRole("list").className).toContain("list-dividers");
        const rows = screen.getAllByRole("button");
        expect(rows[1].getAttribute("data-selected")).toBe("true");
        expect(rows[0].hasAttribute("data-selected")).toBe(false);
    });

    it("the divider rule is drawn between li siblings only, in the divider property", () => {
        const css = readFileSync("src/app.css", "utf8");
        expect(css).toMatch(/\.list-dividers > li \+ li::before/);
        expect(css).toContain("var(--zabi-list-divider-color, var(--color-border))");
        // Nothing is drawn above the first row or below the last.
        expect(css).not.toMatch(/\.list-dividers > li:(first|last)-child::/);
    });
});
