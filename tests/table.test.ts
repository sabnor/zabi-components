import { cleanup, render, screen, waitFor } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";

import TableHarness from "./fixtures/TableHarness.svelte";

afterEach(() => {
    cleanup();
});

const classesOf = (element: Element) => element.className.split(/\s+/);

describe("Table", () => {
    it("keeps today's markup when neither option is used", () => {
        const { container } = render(TableHarness);
        const table = screen.getByRole("table", { name: "Members" });

        expect(classesOf(table)).toContain("min-w-[20rem]");
        expect(table.className).not.toMatch(/\[&>/);
        expect(table.hasAttribute("role")).toBe(false);
        expect(classesOf(container.querySelector("caption") as Element)).not.toContain("sr-only");
        // Nothing rewrites the caller's rows unless the table is stacked.
        expect(container.querySelector("tbody tr")?.hasAttribute("role")).toBe(false);
    });

    it("hides the caption from view but keeps it as the table's name", () => {
        const { container } = render(TableHarness, { props: { captionHidden: true } });

        const caption = container.querySelector("caption") as HTMLElement;
        expect(caption.textContent?.trim()).toBe("Members");
        expect(classesOf(caption)).toEqual(["sr-only"]);
        expect(screen.getByRole("table", { name: "Members" })).toBeTruthy();
    });

    it.each([
        ["sm", "max-sm:"],
        ["md", "max-md:"],
        ["lg", "max-lg:"],
        [true, ""],
    ] as const)("stacked=%s lays rows out as label and value pairs", (stacked, prefix) => {
        render(TableHarness, { props: { stacked } });
        const classes = classesOf(screen.getByRole("table", { name: "Members" }));

        // The rendered result is measured in playwright/table-stacked.spec.ts;
        // jsdom applies no stylesheet, so this pins the rules that produce it.
        expect(classes).toEqual(
            expect.arrayContaining([
                `${prefix}block`,
                // No minimum width and no sideways scroll once stacked.
                `${prefix}min-w-0`,
                // The header row stays in the DOM for its column headers.
                `${prefix}[&>thead]:sr-only`,
                `${prefix}[&>*>tr>*]:flex`,
                `${prefix}[&>*>tr>[data-label]]:before:content-[attr(data-label)]`,
            ]),
        );
        if (prefix) expect(classes).not.toContain("block");
    });

    it("restores table roles when stacked, for browsers that drop them with display", async () => {
        const { container, rerender } = render(TableHarness, { props: { stacked: "sm" } });
        const table = container.querySelector("table") as HTMLTableElement;

        expect(table.getAttribute("role")).toBe("table");
        expect(table.getAttribute("aria-labelledby")).toBe(container.querySelector("caption")?.id);
        expect(container.querySelector("thead")?.getAttribute("role")).toBe("rowgroup");
        expect(container.querySelector("thead th")?.getAttribute("role")).toBe("columnheader");
        expect(container.querySelector("tbody tr")?.getAttribute("role")).toBe("row");
        expect(container.querySelector("tbody th")?.getAttribute("role")).toBe("rowheader");
        expect(container.querySelector("tbody td")?.getAttribute("role")).toBe("cell");

        // Rows rendered later get them too.
        await rerender({ rows: ["Ada", "Lin", "Noor"] });
        await waitFor(() => {
            const rows = container.querySelectorAll("tbody tr");
            expect(rows).toHaveLength(3);
            expect(rows[2].getAttribute("role")).toBe("row");
            expect(rows[2].querySelector("td")?.getAttribute("role")).toBe("cell");
        });
        expect(screen.getAllByRole("row")).toHaveLength(4);
    });
});
