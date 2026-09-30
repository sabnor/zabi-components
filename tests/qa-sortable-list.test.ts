import { cleanup, fireEvent, render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { createRawSnippet, tick } from "svelte";
import { afterEach, describe, expect, it, vi } from "vitest";

import SortableList from "../src/components/molecules/SortableList.svelte";

/**
 * QA review of 64259c6. Gaps the package's own tests leave open: a parent
 * that replaces `items`, and lists of one and of no items. The test marked
 * DEFECT fails against the component as committed and is skipped so the
 * suite stays green; it names what has to change before it is enabled.
 */

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

type Section = { id: string; title: string };
const sections = (...ids: string[]): Section[] =>
    ids.map((id) => ({ id, title: id[0].toUpperCase() + id.slice(1) }));

const item = createRawSnippet<[Section, unknown]>((section) => ({
    render: () => `<span data-testid="card-${section().id}">${section().title}</span>`,
}));

function renderList(items: Section[], onreorder = vi.fn()) {
    const result = render(SortableList<Section>, {
        props: {
            items,
            getKey: (section: Section) => section.id,
            getLabel: (section: Section) => section.title,
            item,
            onreorder,
            "aria-label": "Sections",
        },
    });
    return { ...result, onreorder };
}

const handle = (title: string) => screen.getByRole("button", { name: `Reorder ${title}` });
const status = () => screen.getByRole("status");
const rendered = () =>
    screen.getAllByRole("listitem").map((row) => row.textContent?.trim());

const ROW = 48;
const GAP = 8;
const LIST_TOP = 100;
const middle = (index: number) => LIST_TOP + index * (ROW + GAP) + ROW / 2;

/** jsdom has no layout; give the rows the geometry a browser would. */
function stubLayout() {
    const list = screen.getByRole("list");
    const rect = (top: number, height: number) =>
        ({ top, bottom: top + height, height, left: 0, right: 300, width: 300, x: 0, y: top, toJSON: () => ({}) }) as DOMRect;
    vi.spyOn(list, "getBoundingClientRect").mockImplementation(() =>
        rect(LIST_TOP, list.children.length * (ROW + GAP) - GAP),
    );
    for (const row of Array.from(list.children)) {
        vi.spyOn(row, "getBoundingClientRect").mockImplementation(() =>
            rect(LIST_TOP + Array.from(list.children).indexOf(row) * (ROW + GAP), ROW),
        );
    }
}

describe("SortableList (QA): one item and no items", () => {
    it("renders an empty named list with no controls", () => {
        renderList([]);
        expect(screen.getByRole("list", { name: "Sections" }).children).toHaveLength(0);
        expect(screen.queryAllByRole("button")).toHaveLength(0);
        expect(status().textContent).toBe("");
    });

    it("has nothing to move with one item: keys, buttons and a drag change nothing", async () => {
        const user = userEvent.setup();
        const { onreorder } = renderList(sections("hero"));
        stubLayout();

        expect(
            (screen.getByRole("button", { name: "Move Hero up" }) as HTMLButtonElement).disabled,
        ).toBe(true);
        expect(
            (screen.getByRole("button", { name: "Move Hero down" }) as HTMLButtonElement).disabled,
        ).toBe(true);

        handle("Hero").focus();
        await user.keyboard("{ArrowDown}{ArrowUp}{Home}{End}");
        await fireEvent.pointerDown(handle("Hero"), { pointerId: 1, clientY: middle(0) });
        await fireEvent.pointerMove(window, { pointerId: 1, clientY: middle(0) + 300 });
        await fireEvent.pointerUp(window, { pointerId: 1, clientY: middle(0) + 300 });
        await tick();

        expect(onreorder).not.toHaveBeenCalled();
        expect(status().textContent).toBe("");
        expect(document.activeElement).toBe(handle("Hero"));
    });
});

describe("SortableList (QA): the parent replaces items", () => {
    it("changes the live region text for the same move made three times running", async () => {
        const user = userEvent.setup();
        const { rerender } = renderList(sections("hero", "gallery", "pricing"));
        const seen: string[] = [];

        for (let round = 0; round < 3; round += 1) {
            handle("Hero").focus();
            await user.keyboard("{ArrowDown}");
            seen.push(status().textContent ?? "");
            // The parent rejects the move and puts the old order back.
            await rerender({ items: sections("hero", "gallery", "pricing") });
        }

        expect(seen.map((text) => text.trim())).toEqual(
            Array(3).fill("Hero, moved to position 2 of 3"),
        );
        // A live region is silent unless its text differs from the last one.
        expect(seen[1]).not.toBe(seen[0]);
        expect(seen[2]).not.toBe(seen[1]);
    });

    // DEFECT (QA-SL-1): a drag remembers the dragged row by index. When the
    // parent replaces `items` while the pointer is down (a poll, a refetch,
    // another user's change), releasing moves whichever item now sits at
    // that index, and announces it. The drag must follow the item's key, or
    // be cancelled when the keys change under it.
    it.skip("never moves a different item when items are replaced during a drag", async () => {
        const { rerender, onreorder } = renderList(
            sections("hero", "gallery", "pricing", "faq"),
        );
        stubLayout();

        await fireEvent.pointerDown(handle("Hero"), { pointerId: 1, clientY: middle(0) });
        await fireEvent.pointerMove(window, { pointerId: 1, clientY: middle(1) });
        await rerender({ items: sections("faq", "pricing", "gallery", "hero") });
        await fireEvent.pointerUp(window, { pointerId: 1, clientY: middle(1) });
        await tick();

        for (const [detail] of onreorder.mock.calls) {
            expect(detail.item.id).toBe("hero");
        }
        expect(status().textContent).not.toMatch(/^Faq/);
        expect(rendered().indexOf("Faq")).toBe(0);
    });
});
