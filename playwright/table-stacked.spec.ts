import { expect, test, type Page } from "@playwright/test";

import { gotoHydrated } from "./helpers/hydration";

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
        await gotoHydrated(page, PATH);

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
        await gotoHydrated(page, PATH);

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
        await gotoHydrated(page, PATH);

        // The header row is out of view but still in the tree, giving the
        // cells their column headers.
        await expect(table(page).getByRole("columnheader")).toHaveText(["Region", "Revenue"]);
        await expect(table(page).getByRole("row")).toHaveCount(3);
        // The generated label has an empty text alternative: the cell's name
        // is its value alone, so "Region" is not announced twice.
        await expect(table(page).getByRole("cell", { name: "North", exact: true })).toHaveCount(1);
        await expect(table(page).getByRole("cell", { name: "$9,200", exact: true })).toHaveCount(1);
    });

    /**
     * Appends one row to the demo table: a text value, an empty labelled
     * cell, an empty unlabelled cell, and an unlabelled cell with three
     * children. Table cannot wrap a caller's cell content, so these are the
     * shapes the stacked rules have to cope with as they come.
     */
    async function addAwkwardRow(page: Page): Promise<void> {
        await expect(table(page).locator("tbody tr").first()).toHaveAttribute("role", "row");
        await table(page).evaluate((element) => {
            const row = document.createElement("tr");
            row.setAttribute("data-testid", "awkward");
            row.innerHTML =
                '<td class="px-4 py-3" data-label="Region">West</td>' +
                '<td class="px-4 py-3" data-label="Revenue"></td>' +
                '<td class="px-4 py-3"></td>' +
                '<td class="px-4 py-3"><button type="button">Edit</button><a href="#open">Open</a><button type="button">Delete</button></td>';
            element.querySelector("tbody")!.append(row);
        });
        await expect(page.getByTestId("awkward")).toHaveAttribute("role", "row");
    }

    /** Edges of a cell's content box and of each child in it, in page pixels. */
    function cellGeometry(page: Page, index: number) {
        return page
            .getByTestId("awkward")
            .locator("td")
            .nth(index)
            .evaluate((cell) => {
                const style = getComputedStyle(cell);
                const box = cell.getBoundingClientRect();
                const range = document.createRange();
                range.selectNodeContents(cell);
                const content = range.getBoundingClientRect();
                return {
                    height: box.height,
                    start: box.left + parseFloat(style.paddingLeft),
                    end: box.right - parseFloat(style.paddingRight),
                    contentLeft: content.left,
                    contentRight: content.right,
                    children: [...cell.children].map((child) => {
                        const rect = child.getBoundingClientRect();
                        return { left: rect.left, right: rect.right, top: rect.top };
                    }),
                    label: getComputedStyle(cell, "::before").content,
                };
            });
    }

    for (const dir of ["ltr", "rtl"] as const) {
        test(`phone, ${dir}: a cell's children stay together at the value side, labelled or not`, async ({
            page,
        }) => {
            await page.setViewportSize({ width: 390, height: 844 });
            await page.goto(PATH, { waitUntil: "networkidle" });
            await page.evaluate((value) => (document.documentElement.dir = value), dir);
            await addAwkwardRow(page);

            const text = await cellGeometry(page, 0);
            const actions = await cellGeometry(page, 3);
            // The value side is the inline end: right in LTR, left in RTL.
            const valueEdge = (cell: typeof text) => (dir === "ltr" ? cell.end : cell.start);
            const outer = (cell: typeof text) =>
                dir === "ltr" ? cell.contentRight : cell.contentLeft;

            expect(outer(text), "A text value sits at the value side").toBeCloseTo(
                valueEdge(text),
                0,
            );

            expect(actions.label, "No data-label, no generated label").toBe("none");
            expect(actions.children).toHaveLength(3);
            const ordered = [...actions.children].sort((a, b) => a.left - b.left);
            expect(
                dir === "ltr" ? ordered[2].right : ordered[0].left,
                "The group ends at the value side, not at the label side",
            ).toBeCloseTo(valueEdge(actions), 0);
            for (const [a, b] of [
                [ordered[0], ordered[1]],
                [ordered[1], ordered[2]],
            ]) {
                expect(b.left - a.right, "Siblings sit one gap apart, not spread out").toBeCloseTo(
                    16,
                    0,
                );
                expect(b.top).toBeCloseTo(a.top, 0);
            }
        });
    }

    test("phone: an empty cell takes no room but keeps its place in the row", async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto(PATH, { waitUntil: "networkidle" });
        await addAwkwardRow(page);

        const labelled = await cellGeometry(page, 1);
        const unlabelled = await cellGeometry(page, 2);
        expect(labelled.height, "No label with nothing beside it").toBe(0);
        expect(labelled.label).toBe("none");
        expect(unlabelled.height, "No blank line").toBe(0);

        // Still four cells to assistive technology, so the actions stay in
        // the fourth column and the columns before them keep their headers.
        await expect(page.getByTestId("awkward").getByRole("cell")).toHaveCount(4);
        await expect(
            page.getByTestId("awkward").getByRole("cell", { name: "Edit Open Delete" }),
        ).toHaveCount(1);
    });
});
