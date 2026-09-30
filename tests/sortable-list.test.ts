import { cleanup, fireEvent, render, screen, within } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { tick } from "svelte";
import { afterEach, describe, expect, it, vi } from "vitest";

import { dropIndex, moveItem } from "../src/components/util/sortable-list";
import SortableListHarness from "./fixtures/SortableListHarness.svelte";

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

const order = () => screen.getByTestId("order").textContent;
const handle = (title: string) =>
    screen.getByRole("button", { name: `Reorder ${title}` });
const announcement = () =>
    screen.getByRole("status").textContent?.split(String.fromCharCode(160)).join("").trim();
/** Row titles in DOM order, which is what a screen reader walks. */
const rendered = () =>
    screen
        .getAllByRole("listitem")
        .map((row) => within(row).getByTestId(/^card-/).textContent?.trim());

describe("moveItem", () => {
    it("moves one entry and leaves the input alone", () => {
        const input = ["a", "b", "c", "d"];
        expect(moveItem(input, 0, 2)).toEqual(["b", "c", "a", "d"]);
        expect(moveItem(input, 3, 0)).toEqual(["d", "a", "b", "c"]);
        expect(input).toEqual(["a", "b", "c", "d"]);
    });

    it("clamps the target and ignores an unknown source", () => {
        expect(moveItem(["a", "b", "c"], 0, 99)).toEqual(["b", "c", "a"]);
        expect(moveItem(["a", "b", "c"], 2, -5)).toEqual(["c", "a", "b"]);
        expect(moveItem(["a", "b", "c"], 7, 0)).toEqual(["a", "b", "c"]);
    });
});

describe("dropIndex", () => {
    // Rows of unequal height with an 8px gap: 40, 100, 40, 60.
    const slots = [
        { top: 0, height: 40 },
        { top: 48, height: 100 },
        { top: 156, height: 40 },
        { top: 204, height: 60 },
    ];

    it("stays put until an edge crosses a neighbour's centre", () => {
        expect(dropIndex(slots, 0, 0)).toBe(0);
        // Bottom edge at 97, the second row's centre is at 98.
        expect(dropIndex(slots, 0, 57)).toBe(0);
        expect(dropIndex(slots, 0, 59)).toBe(1);
    });

    it("passes several rows in one step, in either direction", () => {
        expect(dropIndex(slots, 0, 224)).toBe(3);
        expect(dropIndex(slots, 3, -204)).toBe(0);
        // Top edge at 120: above the third row's centre (176), below the second's (98).
        expect(dropIndex(slots, 3, -84)).toBe(2);
    });
});

describe("SortableList semantics", () => {
    it("renders a named list whose handles are described buttons", () => {
        render(SortableListHarness);

        const list = screen.getByRole("list", { name: "Sections" });
        expect(list.tagName).toBe("UL");
        expect(within(list).getAllByRole("listitem")).toHaveLength(4);

        const grip = handle("Hero");
        expect(grip.tagName).toBe("BUTTON");
        const description = document.getElementById(
            grip.getAttribute("aria-describedby") ?? "",
        );
        expect(description?.textContent).toBe(
            "Arrow keys move this item. Home and End move it to the start or the end.",
        );
        // Out of the reading order, so it is not read as loose text after the
        // list; a hidden element still describes what points at it.
        expect(description?.hidden).toBe(true);

        const status = screen.getByRole("status");
        expect(status.getAttribute("aria-live")).toBe("polite");
        expect(list.contains(status)).toBe(false);
    });

    it("hides the move buttons on request and leaves the handle", () => {
        render(SortableListHarness, { props: { showMoveButtons: false } });
        expect(screen.queryByRole("button", { name: /^Move / })).toBeNull();
        expect(handle("Hero")).toBeTruthy();
    });

    it("lets the item snippet place the handle when controls are manual", () => {
        render(SortableListHarness, { props: { controls: "manual" } });
        expect(screen.getByTestId("card-hero").contains(handle("Hero"))).toBe(true);
        expect(screen.queryByRole("button", { name: /^Move / })).toBeNull();
    });
});

describe("SortableList keyboard", () => {
    it("moves the item with the arrow keys and keeps focus on its handle", async () => {
        const user = userEvent.setup();
        const onreorder = vi.fn();
        render(SortableListHarness, { props: { onreorder } });

        const grip = handle("Hero");
        grip.focus();
        await user.keyboard("{ArrowDown}");

        expect(order()).toBe("gallery,hero,pricing,faq");
        expect(rendered()).toEqual(["Gallery", "Hero", "Pricing", "FAQ"]);
        expect(document.activeElement).toBe(grip);
        expect(announcement()).toBe("Hero, moved to position 2 of 4");
        expect(onreorder).toHaveBeenCalledTimes(1);
        expect(onreorder.mock.calls[0][0]).toMatchObject({
            item: { id: "hero" },
            from: 0,
            to: 1,
        });
        expect(
            onreorder.mock.calls[0][0].items.map((s: { id: string }) => s.id),
        ).toEqual(["gallery", "hero", "pricing", "faq"]);

        await user.keyboard("{ArrowDown}");
        expect(order()).toBe("gallery,pricing,hero,faq");
        expect(document.activeElement).toBe(grip);

        await user.keyboard("{ArrowUp}");
        expect(order()).toBe("gallery,hero,pricing,faq");
        expect(document.activeElement).toBe(grip);
        expect(onreorder).toHaveBeenLastCalledWith(
            expect.objectContaining({ from: 2, to: 1 }),
        );
    });

    it("moves to the ends with Home and End", async () => {
        const user = userEvent.setup();
        render(SortableListHarness);

        const grip = handle("Gallery");
        grip.focus();
        await user.keyboard("{End}");
        expect(order()).toBe("hero,pricing,faq,gallery");
        expect(announcement()).toBe("Gallery, moved to position 4 of 4");
        expect(document.activeElement).toBe(grip);

        await user.keyboard("{Home}");
        expect(order()).toBe("gallery,hero,pricing,faq");
        expect(announcement()).toBe("Gallery, moved to position 1 of 4");
        expect(document.activeElement).toBe(grip);
    });

    it("says so when a key cannot move the item any further", async () => {
        const user = userEvent.setup();
        const onreorder = vi.fn();
        render(SortableListHarness, { props: { onreorder } });

        handle("Hero").focus();
        expect(announcement()).toBe("");
        await user.keyboard("{ArrowUp}");
        expect(announcement()).toBe("Hero, already first");
        const once = screen.getByRole("status").textContent;
        // Pressing it again must change the text, or it is not read again.
        await user.keyboard("{Home}");
        expect(announcement()).toBe("Hero, already first");
        expect(screen.getByRole("status").textContent).not.toBe(once);

        handle("FAQ").focus();
        await user.keyboard("{ArrowDown}");
        expect(announcement()).toBe("FAQ, already last");
        await user.keyboard("{End}");
        expect(announcement()).toBe("FAQ, already last");

        // Home on the last item is a real move, not a boundary.
        await user.keyboard("{Home}");
        expect(announcement()).toBe("FAQ, moved to position 1 of 4");
        expect(onreorder).toHaveBeenCalledTimes(1);
    });

    it("does nothing at an end, and still stops the page from scrolling", async () => {
        const onreorder = vi.fn();
        render(SortableListHarness, { props: { onreorder } });

        const first = handle("Hero");
        first.focus();
        // fireEvent returns false when a handler called preventDefault().
        expect(await fireEvent.keyDown(first, { key: "ArrowUp" })).toBe(false);
        expect(await fireEvent.keyDown(first, { key: "Home" })).toBe(false);
        expect(order()).toBe("hero,gallery,pricing,faq");
        expect(onreorder).not.toHaveBeenCalled();

        // Keys the handle does not own are left alone, as are browser shortcuts.
        expect(await fireEvent.keyDown(first, { key: "Tab" })).toBe(true);
        expect(
            await fireEvent.keyDown(first, { key: "ArrowDown", altKey: true }),
        ).toBe(true);
        expect(order()).toBe("hero,gallery,pricing,faq");
    });
});

describe("SortableList move buttons", () => {
    it("are named after the item and disabled at the ends", () => {
        render(SortableListHarness);

        const up = (title: string) =>
            screen.getByRole("button", { name: `Move ${title} up` }) as HTMLButtonElement;
        const down = (title: string) =>
            screen.getByRole("button", { name: `Move ${title} down` }) as HTMLButtonElement;

        expect(up("Hero").disabled).toBe(true);
        expect(down("Hero").disabled).toBe(false);
        expect(up("Pricing").disabled).toBe(false);
        expect(down("Pricing").disabled).toBe(false);
        expect(up("FAQ").disabled).toBe(false);
        expect(down("FAQ").disabled).toBe(true);
    });

    it("move one place, announce, and keep focus on the pressed button", async () => {
        const user = userEvent.setup();
        const onreorder = vi.fn();
        render(SortableListHarness, { props: { onreorder } });

        const down = screen.getByRole("button", { name: "Move Hero down" });
        await user.click(down);

        expect(order()).toBe("gallery,hero,pricing,faq");
        expect(announcement()).toBe("Hero, moved to position 2 of 4");
        expect(document.activeElement).toBe(down);
        expect(onreorder).toHaveBeenCalledWith(
            expect.objectContaining({ from: 0, to: 1 }),
        );
        // Gallery is now first, so its "up" is the disabled one.
        expect(
            (screen.getByRole("button", { name: "Move Gallery up" }) as HTMLButtonElement)
                .disabled,
        ).toBe(true);
        expect(
            (screen.getByRole("button", { name: "Move Hero up" }) as HTMLButtonElement)
                .disabled,
        ).toBe(false);
    });

    it("hand focus to the other button when the pressed one reaches an end", async () => {
        const user = userEvent.setup();
        render(SortableListHarness);

        const up = screen.getByRole("button", { name: "Move Gallery up" });
        await user.click(up);

        expect(order()).toBe("gallery,hero,pricing,faq");
        expect((up as HTMLButtonElement).disabled).toBe(true);
        expect(document.activeElement).toBe(
            screen.getByRole("button", { name: "Move Gallery down" }),
        );
    });
});

/**
 * `controls="manual"` puts the handle and the move buttons wherever the
 * snippet says, and a card header that toggles on click is the obvious place.
 * Enter and Space on a button produce a click too.
 */
describe("SortableList inside a clickable header", () => {
    it("does not let a click or a key press on the handle reach the header", async () => {
        const user = userEvent.setup();
        const onheaderclick = vi.fn();
        render(SortableListHarness, {
            props: { controls: "manual", onheaderclick },
        });

        await user.click(handle("Hero"));
        handle("Hero").focus();
        await user.keyboard("{Enter}");
        await user.keyboard(" ");
        await user.keyboard("{ArrowDown}");
        expect(onheaderclick).not.toHaveBeenCalled();
        expect(order()).toBe("gallery,hero,pricing,faq");

        // The header itself still works.
        await user.click(within(screen.getByTestId("card-hero")).getByText("Hero"));
        expect(onheaderclick).toHaveBeenCalledTimes(1);
        expect(onheaderclick).toHaveBeenCalledWith("hero");
    });

    it("does not let a move button's click reach the header, by mouse or keyboard", async () => {
        const user = userEvent.setup();
        const onheaderclick = vi.fn();
        render(SortableListHarness, {
            props: { controls: "manual", onheaderclick },
        });

        await user.click(screen.getByRole("button", { name: "Move Hero down" }));
        expect(order()).toBe("gallery,hero,pricing,faq");
        await user.keyboard("{Enter}");
        expect(order()).toBe("gallery,pricing,hero,faq");
        expect(onheaderclick).not.toHaveBeenCalled();
    });
});

describe("SortableList strings", () => {
    it("takes translated names, description and announcements", async () => {
        const user = userEvent.setup();
        render(SortableListHarness, {
            props: {
                strings: {
                    handleLabel: (label: string) => `Flytta ${label}`,
                    handleDescription: "Använd piltangenterna.",
                    moveUp: (label: string) => `Flytta upp ${label}`,
                    moved: ({ label, position, total }) =>
                        `${label} är nu nummer ${position} av ${total}`,
                    atEnd: ({ label }) => `${label} är redan sist`,
                },
            },
        });

        const grip = screen.getByRole("button", { name: "Flytta Hero" });
        expect(
            document.getElementById(grip.getAttribute("aria-describedby") ?? "")
                ?.textContent,
        ).toBe("Använd piltangenterna.");
        expect(screen.getByRole("button", { name: "Flytta upp FAQ" })).toBeTruthy();
        // Anything not overridden keeps its default.
        expect(screen.getByRole("button", { name: "Move Hero down" })).toBeTruthy();

        grip.focus();
        await user.keyboard("{ArrowDown}");
        expect(announcement()).toBe("Hero är nu nummer 2 av 4");

        screen.getByRole("button", { name: "Flytta FAQ" }).focus();
        await user.keyboard("{ArrowDown}");
        expect(announcement()).toBe("FAQ är redan sist");
        // Not overridden, so the default.
        grip.focus();
        await user.keyboard("{ArrowUp}{ArrowUp}");
        expect(announcement()).toBe("Hero, already first");
    });
});

describe("SortableList disabled", () => {
    it("disables every control when the list is disabled", async () => {
        const onreorder = vi.fn();
        render(SortableListHarness, { props: { disabled: true, onreorder } });

        const buttons = screen.getAllByRole("button") as HTMLButtonElement[];
        expect(buttons).toHaveLength(12);
        expect(buttons.every((button) => button.disabled)).toBe(true);

        await fireEvent.keyDown(handle("Hero"), { key: "ArrowDown" });
        await fireEvent.pointerDown(handle("Hero"), { pointerId: 1, clientY: 120 });
        await fireEvent.pointerMove(window, { pointerId: 1, clientY: 200 });
        await fireEvent.pointerUp(window, { pointerId: 1, clientY: 200 });
        expect(order()).toBe("hero,gallery,pricing,faq");
        expect(onreorder).not.toHaveBeenCalled();
    });

    it("disables one item's controls and lets the others move past it", async () => {
        const user = userEvent.setup();
        render(SortableListHarness, { props: { lockGallery: true } });

        expect((handle("Gallery") as HTMLButtonElement).disabled).toBe(true);
        expect(
            (screen.getByRole("button", { name: "Move Gallery up" }) as HTMLButtonElement)
                .disabled,
        ).toBe(true);
        expect(
            (screen.getByRole("button", { name: "Move Gallery down" }) as HTMLButtonElement)
                .disabled,
        ).toBe(true);
        expect((handle("Hero") as HTMLButtonElement).disabled).toBe(false);

        await fireEvent.keyDown(handle("Gallery"), { key: "ArrowDown" });
        expect(order()).toBe("hero,gallery,pricing,faq");

        handle("Hero").focus();
        await user.keyboard("{ArrowDown}");
        expect(order()).toBe("gallery,hero,pricing,faq");
    });
});

/**
 * jsdom has no layout: every rect is zero. These tests give the rows the
 * geometry a browser would (48px rows, 8px gap) and drive the real handlers
 * with synthetic pointer events, so they cover the drag state machine and its
 * arithmetic. They cannot show that a real pointer produces those events, that
 * touch does not scroll the page, or that the rows paint where the transforms
 * say; `playwright/sortable-list.spec.ts` does that in a browser.
 */
describe("SortableList pointer drag (stubbed layout)", () => {
    const ROW = 48;
    const GAP = 8;
    const LIST_TOP = 100;

    function stubLayout() {
        const rect = (top: number, height: number) =>
            ({
                top,
                bottom: top + height,
                height,
                left: 0,
                right: 300,
                width: 300,
                x: 0,
                y: top,
                toJSON: () => ({}),
            }) as DOMRect;
        const list = screen.getByRole("list");
        vi.spyOn(list, "getBoundingClientRect").mockImplementation(() =>
            rect(LIST_TOP, 4 * ROW + 3 * GAP),
        );
        for (const row of screen.getAllByRole("listitem")) {
            vi.spyOn(row, "getBoundingClientRect").mockImplementation(() => {
                // Layout position follows the current DOM order.
                const index = Array.from(list.children).indexOf(row);
                return rect(LIST_TOP + index * (ROW + GAP), ROW);
            });
        }
    }

    const rows = () => screen.getAllByRole("listitem");
    /** Pointer y at the middle of the row at `index`. */
    const middle = (index: number) => LIST_TOP + index * (ROW + GAP) + ROW / 2;

    it("drags a row down two places and commits on release", async () => {
        const onreorder = vi.fn();
        render(SortableListHarness, { props: { onreorder } });
        stubLayout();
        const grip = handle("Hero");
        const [hero, gallery, pricing, faq] = rows();

        await fireEvent.pointerDown(grip, { pointerId: 1, button: 0, clientY: middle(0) });
        await fireEvent.pointerMove(window, { pointerId: 1, clientY: middle(2) });

        // Nothing is committed while the pointer is down.
        expect(order()).toBe("hero,gallery,pricing,faq");
        expect(onreorder).not.toHaveBeenCalled();
        expect(hero.hasAttribute("data-dragging")).toBe(true);
        expect(hero.style.transform).toBe("translate3d(0, 112px, 0)");
        // The two rows it passed step up by its height plus the gap.
        expect(gallery.style.transform).toBe("translate3d(0, -56px, 0)");
        expect(pricing.style.transform).toBe("translate3d(0, -56px, 0)");
        expect(faq.style.transform).toBe("");

        await fireEvent.pointerUp(window, { pointerId: 1, clientY: middle(2) });
        await tick();

        expect(order()).toBe("gallery,pricing,hero,faq");
        expect(rendered()).toEqual(["Gallery", "Pricing", "Hero", "FAQ"]);
        expect(onreorder).toHaveBeenCalledTimes(1);
        expect(onreorder).toHaveBeenCalledWith(
            expect.objectContaining({ item: { id: "hero", title: "Hero" }, from: 0, to: 2 }),
        );
        expect(announcement()).toBe("Hero, moved to position 3 of 4");
        expect(document.activeElement).toBe(grip);
        for (const row of rows()) {
            expect(row.style.transform).toBe("");
            expect(row.hasAttribute("data-dragging")).toBe(false);
        }
    });

    it("drags a row up", async () => {
        render(SortableListHarness);
        stubLayout();

        await fireEvent.pointerDown(handle("FAQ"), { pointerId: 1, clientY: middle(3) });
        await fireEvent.pointerMove(window, { pointerId: 1, clientY: middle(1) });
        expect(rows()[1].style.transform).toBe("translate3d(0, 56px, 0)");
        expect(rows()[2].style.transform).toBe("translate3d(0, 56px, 0)");
        await fireEvent.pointerUp(window, { pointerId: 1, clientY: middle(1) });

        expect(order()).toBe("hero,faq,gallery,pricing");
        expect(announcement()).toBe("FAQ, moved to position 2 of 4");
    });

    it("restores the original order on Escape and ignores the rest of the gesture", async () => {
        const onreorder = vi.fn();
        render(SortableListHarness, { props: { onreorder } });
        stubLayout();

        await fireEvent.pointerDown(handle("Hero"), { pointerId: 1, clientY: middle(0) });
        await fireEvent.pointerMove(window, { pointerId: 1, clientY: middle(3) });
        expect(rows()[0].hasAttribute("data-dragging")).toBe(true);

        // The drag consumes this Escape so an enclosing dialog does not close.
        expect(await fireEvent.keyDown(window, { key: "Escape" })).toBe(false);
        await tick();

        expect(order()).toBe("hero,gallery,pricing,faq");
        expect(rendered()).toEqual(["Hero", "Gallery", "Pricing", "FAQ"]);
        for (const row of rows()) {
            expect(row.style.transform).toBe("");
            expect(row.hasAttribute("data-dragging")).toBe(false);
        }
        expect(announcement()).toBe(
            "Hero, move cancelled, still at position 1 of 4",
        );

        // The pointer is still down; moving and releasing it must not reorder.
        await fireEvent.pointerMove(window, { pointerId: 1, clientY: middle(2) });
        await fireEvent.pointerUp(window, { pointerId: 1, clientY: middle(2) });
        expect(order()).toBe("hero,gallery,pricing,faq");
        expect(onreorder).not.toHaveBeenCalled();
    });

    it("changes the live region text when the same cancellation is announced twice", async () => {
        render(SortableListHarness);
        stubLayout();
        const status = screen.getByRole("status");

        const dragAndCancel = async () => {
            await fireEvent.pointerDown(handle("Hero"), { pointerId: 1, clientY: middle(0) });
            await fireEvent.pointerMove(window, { pointerId: 1, clientY: middle(2) });
            await fireEvent.keyDown(window, { key: "Escape" });
            await fireEvent.pointerUp(window, { pointerId: 1, clientY: middle(2) });
            await tick();
        };

        await dragAndCancel();
        const first = status.textContent;
        await dragAndCancel();
        // Identical text would not be read out a second time.
        expect(status.textContent).not.toBe(first);
        expect(announcement()).toBe("Hero, move cancelled, still at position 1 of 4");
    });

    it("restores the original order when the browser cancels the pointer", async () => {
        render(SortableListHarness);
        stubLayout();

        await fireEvent.pointerDown(handle("Hero"), { pointerId: 1, clientY: middle(0) });
        await fireEvent.pointerMove(window, { pointerId: 1, clientY: middle(2) });
        await fireEvent.pointerCancel(window, { pointerId: 1 });
        await tick();

        expect(order()).toBe("hero,gallery,pricing,faq");
        expect(rows().every((row) => row.style.transform === "")).toBe(true);
    });

    it("treats a press without travel as a click, not a drag", async () => {
        const onreorder = vi.fn();
        render(SortableListHarness, { props: { onreorder } });
        stubLayout();

        await fireEvent.pointerDown(handle("Hero"), { pointerId: 1, clientY: middle(0) });
        await fireEvent.pointerMove(window, { pointerId: 1, clientY: middle(0) + 2 });
        expect(rows()[0].hasAttribute("data-dragging")).toBe(false);
        await fireEvent.pointerUp(window, { pointerId: 1, clientY: middle(0) + 2 });

        expect(order()).toBe("hero,gallery,pricing,faq");
        expect(onreorder).not.toHaveBeenCalled();
        expect(announcement()).toBe("");
    });

    it("ignores other pointers and non-primary mouse buttons", async () => {
        render(SortableListHarness);
        stubLayout();

        await fireEvent.pointerDown(handle("Hero"), {
            pointerId: 1,
            pointerType: "mouse",
            button: 2,
            clientY: middle(0),
        });
        await fireEvent.pointerMove(window, { pointerId: 1, clientY: middle(2) });
        expect(rows()[0].hasAttribute("data-dragging")).toBe(false);

        await fireEvent.pointerDown(handle("Hero"), { pointerId: 1, clientY: middle(0) });
        await fireEvent.pointerMove(window, { pointerId: 7, clientY: middle(2) });
        expect(rows()[0].hasAttribute("data-dragging")).toBe(false);
        await fireEvent.pointerUp(window, { pointerId: 1, clientY: middle(0) });
        expect(order()).toBe("hero,gallery,pricing,faq");
    });

    it("keeps the dragged row inside the list", async () => {
        render(SortableListHarness);
        stubLayout();

        await fireEvent.pointerDown(handle("Gallery"), { pointerId: 1, clientY: middle(1) });
        await fireEvent.pointerMove(window, { pointerId: 1, clientY: middle(1) + 600 });
        // Two rows below it: it can travel at most two steps.
        expect(rows()[1].style.transform).toBe("translate3d(0, 112px, 0)");
        await fireEvent.pointerUp(window, { pointerId: 1, clientY: middle(1) + 600 });
        expect(order()).toBe("hero,pricing,faq,gallery");
    });
});
