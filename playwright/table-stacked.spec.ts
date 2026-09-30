import { expect, test, type Page } from "@playwright/test";

/**
 * Table's stacked layout in a real browser. jsdom applies no stylesheet and
 * no media queries, so the unit tests can only pin class names; whether the
 * rows really stack, and whether the table is still a table to a screen
 * reader once its boxes are blocks, can only be seen here.
 */

const PATH = "/components/Table";
const table = (page: Page) => page.getByRole("table", { name: "Q1 results" }).first();

/** Box facts about the first body cell and the header row. */
async function layout(page: Page) {
    return table(page).evaluate((element) => {
        const cell = element.querySelector("tbody td") as HTMLElement;
        const head = element.querySelector("thead") as HTMLElement;
        const wrapper = element.parentElement as HTMLElement;
        const cells = [...element.querySelectorAll("tbody tr:first-child td")].map(
            (td) => td.getBoundingClientRect().top,
        );
        return {
            tableDisplay: getComputedStyle(element).display,
            cellDisplay: getComputedStyle(cell).display,
            label: getComputedStyle(cell, "::before").content,
            headHeight: head.getBoundingClientRect().height,
            scrollsSideways: wrapper.scrollWidth > wrapper.clientWidth,
            cellsShareARow: cells[0] === cells[1],
        };
    });
}

test.describe("Table — stacked below the sm breakpoint", () => {
    test("desktop: an ordinary table with its header row", async ({ page }) => {
        await page.setViewportSize({ width: 1024, height: 900 });
        await page.goto(PATH, { waitUntil: "domcontentloaded" });

        const facts = await layout(page);
        expect(facts.tableDisplay).toBe("table");
        expect(facts.cellDisplay).toBe("table-cell");
        expect(facts.label, "No generated label beside the value").toBe("none");
        expect(facts.headHeight).toBeGreaterThan(20);
        expect(facts.cellsShareARow).toBe(true);
    });

    test("phone: rows stack as label and value pairs and nothing scrolls sideways", async ({
        page,
    }) => {
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto(PATH, { waitUntil: "domcontentloaded" });

        const facts = await layout(page);
        expect(facts.tableDisplay).toBe("block");
        expect(facts.cellDisplay).toBe("flex");
        expect(facts.label, "The cell's data-label is drawn beside its value").toContain(
            '"Region"',
        );
        expect(facts.headHeight, "The header row is hidden from view").toBeLessThanOrEqual(1);
        expect(facts.scrollsSideways).toBe(false);
        expect(facts.cellsShareARow, "Each cell sits on its own line").toBe(false);
    });

    test("phone: still a table to assistive technology, with each label read once", async ({
        page,
    }) => {
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto(PATH, { waitUntil: "domcontentloaded" });

        // The header row is out of view but still in the tree, giving the
        // cells their column headers.
        await expect(table(page).getByRole("columnheader")).toHaveText(["Region", "Revenue"]);
        await expect(table(page).getByRole("row")).toHaveCount(3);
        // The generated label has an empty text alternative: the cell's name
        // is its value alone, so "Region" is not announced twice.
        await expect(table(page).getByRole("cell", { name: "North", exact: true })).toHaveCount(1);
        await expect(table(page).getByRole("cell", { name: "$9,200", exact: true })).toHaveCount(1);
    });
});
