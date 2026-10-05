import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import GalleryHarness from "./fixtures/GalleryHarness.svelte";

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    document.documentElement.dir = "";
});

const grid = () => screen.getByTestId("grid");
const list = () => within(grid()).getByRole("list");
const tiles = () => [...grid().querySelectorAll<HTMLButtonElement>("[data-photo-key]")];
const items = () => [...grid().querySelectorAll<HTMLButtonElement>("[data-photo-grid-item]")];
const tile = (name: string) => within(grid()).getByRole("button", { name });
const state = () => {
    const [open, index, selected, keys, count] = screen.getByTestId("state").textContent!.split("|");
    return { open, index: Number(index), selected, keys: keys ? keys.split(",") : [], count: Number(count) };
};

function mount(props: Record<string, unknown> = {}) {
    render(GalleryHarness, { props: { withViewer: false, ...props } });
    return userEvent.setup();
}

/** jsdom has no layout: put the tiles in rows of `columns`, by their top edge. */
function layOut(columns: number) {
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (this: HTMLElement) {
        const at = items().indexOf(this as HTMLButtonElement);
        const top = at === -1 ? 0 : Math.floor(at / columns) * 100;
        return { top, bottom: top + 96, left: 0, right: 96, width: 96, height: 96, x: 0, y: top } as DOMRect;
    });
}

describe("PhotoGrid semantics", () => {
    it("is a named list with one button per photo, named by its alt", () => {
        mount();
        expect(within(grid()).getByRole("list", { name: "Quiz night photos" })).toBe(list());
        expect(list().querySelectorAll("li")).toHaveLength(6);
        expect(tiles().map((button) => button.getAttribute("aria-label"))).toEqual([
            "Team at the table",
            "Score sheet",
            "The bar",
            "Trophy",
            "Question card",
            "Team by the door",
        ]);
        for (const button of tiles()) {
            expect(button.getAttribute("type")).toBe("button");
            // Not a toggle unless the grid is selectable.
            expect(button.hasAttribute("aria-pressed")).toBe(false);
        }
    });

    it("shows the thumbnail, lazily, with no alt of its own: the button has the name", () => {
        mount();
        const image = tiles()[0].querySelector("img")!;
        expect(image.getAttribute("src")).toContain("#thumb-1");
        expect(image.getAttribute("loading")).toBe("lazy");
        expect(image.getAttribute("decoding")).toBe("async");
        expect(image.getAttribute("alt")).toBe("");
        expect(image.className).toContain("object-cover");
        expect(tiles()[0].parentElement!.className).toContain("aspect-square");
    });

    it("falls back to src when a photo has no thumbnail", () => {
        mount({
            initialPhotos: [{ src: "/full.jpg", alt: "The bar", width: 800, height: 600 }],
        });
        expect(tiles()[0].querySelector("img")!.getAttribute("src")).toBe("/full.jpg");
        // And without an id, the src is the photo's identity.
        expect(tiles()[0].dataset.photoKey).toBe("/full.jpg");
    });

    it("names a photo without alt by its place, and warns in development", async () => {
        const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
        mount({
            initialPhotos: [
                { src: "/1.jpg", alt: "", width: 1, height: 1 },
                { src: "/2.jpg", alt: "The bar", width: 1, height: 1 },
                { src: "/3.jpg", alt: "  ", width: 1, height: 1 },
            ],
        });
        expect(tiles().map((button) => button.getAttribute("aria-label"))).toEqual([
            "Photo 1 of 3",
            "The bar",
            "Photo 3 of 3",
        ]);
        await waitFor(() => expect(warn).toHaveBeenCalledTimes(1));
        expect(String(warn.mock.calls[0][0])).toContain("2 of 3 photos have no alt text");
    });

    it("does not warn when every photo has alt text", async () => {
        const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
        mount();
        await Promise.resolve();
        expect(warn).not.toHaveBeenCalled();
    });

    it("passes other attributes to the host and marks it for the viewer to find", () => {
        mount();
        expect(grid().hasAttribute("data-photo-grid")).toBe(true);
        expect(tiles()[2].dataset.photoKey).toBe("p3");
    });
});

describe("PhotoGrid loading", () => {
    it("shows a placeholder until the thumbnail has loaded, then the photo", async () => {
        mount();
        const first = tiles()[0];
        const image = first.querySelector("img")!;
        expect(first.querySelector("[data-photo-grid-skeleton]")).not.toBeNull();
        expect(image.className).toContain("opacity-0");

        await fireEvent.load(image);
        expect(first.querySelector("[data-photo-grid-skeleton]")).toBeNull();
        expect(image.className).toContain("opacity-100");
        // The others are still loading.
        expect(tiles()[1].querySelector("[data-photo-grid-skeleton]")).not.toBeNull();
    });

    it("shows a fallback when the thumbnail fails, and keeps the tile's name", async () => {
        mount();
        const first = tiles()[0];
        await fireEvent.error(first.querySelector("img")!);
        expect(first.querySelector("img")).toBeNull();
        expect(first.querySelector("[data-photo-grid-fallback]")).not.toBeNull();
        expect(first.querySelector("[data-photo-grid-skeleton]")).toBeNull();
        expect(first.getAttribute("aria-label")).toBe("Team at the table");
    });

    it("counts an image that was complete before the grid ran", () => {
        const complete = vi.spyOn(HTMLImageElement.prototype, "complete", "get").mockReturnValue(true);
        const natural = vi.spyOn(HTMLImageElement.prototype, "naturalWidth", "get").mockReturnValue(240);
        mount();
        expect(grid().querySelectorAll("[data-photo-grid-skeleton]")).toHaveLength(0);
        expect(tiles()[0].querySelector("img")!.className).toContain("opacity-100");
        complete.mockRestore();
        natural.mockRestore();
    });
});

describe("PhotoGrid columns", () => {
    it("follows its own width when columns is left out: 3, then 4, then 5", () => {
        mount();
        expect(grid().className).toContain("@container");
        expect(list().className).toContain("grid-cols-3");
        expect(list().className).toContain("@[480px]:grid-cols-4");
        expect(list().className).toContain("@[768px]:grid-cols-5");
        expect(list().style.gridTemplateColumns).toBe("");
        // The gap is in px: it must not grow with the text.
        expect(list().className).toContain("gap-[4px]");
    });

    it("has exactly the columns asked for", () => {
        mount({ columns: 4 });
        expect(list().style.gridTemplateColumns).toBe("repeat(4, minmax(0, 1fr))");
        expect(list().className).not.toContain("grid-cols-3");
    });
});

describe("PhotoGrid opening", () => {
    it("reports the photo's place when a tile is pressed", async () => {
        const onopened = vi.fn();
        const user = mount({ onopened });
        await user.click(tile("The bar"));
        expect(onopened).toHaveBeenCalledWith(2);
        expect(state().index).toBe(2);
    });

    it("opens with Enter and with Space", async () => {
        const onopened = vi.fn();
        const user = mount({ onopened });
        tile("Trophy").focus();
        await user.keyboard("{Enter}");
        await user.keyboard(" ");
        expect(onopened.mock.calls.map((call) => call[0])).toEqual([3, 3]);
    });
});

describe("PhotoGrid max", () => {
    it("shows no more than max, and the last tile says how many more there are", () => {
        mount({ count: 14, max: 8 });
        expect(tiles()).toHaveLength(8);
        const last = tiles()[7];
        expect(last.getAttribute("aria-label")).toBe("Score sheet 8, 6 more photos");
        const more = last.querySelector("[data-photo-grid-more]")!;
        expect(more.textContent?.trim()).toBe("+6");
        expect(more.getAttribute("aria-hidden")).toBe("true");
        // On an opaque plate over the dimmed photo.
        expect(more.className).toContain("bg-overlay");
        expect(more.querySelector("span")!.className).toContain("bg-surface-overlay");
        expect(tiles()[6].querySelector("[data-photo-grid-more]")).toBeNull();
    });

    it("opens the viewer at that tile's own photo", async () => {
        const onopened = vi.fn();
        const user = mount({ count: 14, max: 8, onopened });
        await user.click(tiles()[7]);
        expect(onopened).toHaveBeenCalledWith(7);
    });

    it("shows every photo, and no count, when there are no more than max", () => {
        mount({ count: 8, max: 8 });
        expect(tiles()).toHaveLength(8);
        expect(grid().querySelector("[data-photo-grid-more]")).toBeNull();
        expect(tiles()[7].getAttribute("aria-label")).toBe("Score sheet 8");
    });

    it("takes the wording from strings", () => {
        mount({ count: 14, max: 8, gridStrings: { morePhotos: (hidden: number) => `${hidden} bilder till` } });
        expect(tiles()[7].getAttribute("aria-label")).toBe("Score sheet 8, 6 bilder till");
    });
});

describe("PhotoGrid add tile", () => {
    it("is absent without onadd", () => {
        mount();
        expect(grid().querySelector("[data-photo-grid-add]")).toBeNull();
    });

    it("comes first, with a visible label, and reports a press", async () => {
        const onadded = vi.fn();
        const user = mount({ withAdd: true, onadded });
        const add = within(grid()).getByRole("button", { name: "Add photo" });
        expect(items()[0]).toBe(add);
        expect(add.textContent?.trim()).toBe("Add photo");
        expect(add.querySelector("svg")!.getAttribute("aria-hidden")).toBe("true");
        expect(add.className).toContain("border-control-border");
        expect(list().querySelectorAll("li")).toHaveLength(7);
        await user.click(add);
        expect(onadded).toHaveBeenCalledTimes(1);
        expect(state().open).toBe("closed");
    });

    it("does not count towards max, and takes its label from strings", () => {
        mount({ withAdd: true, count: 14, max: 8, gridStrings: { addPhoto: "Lägg till bild" } });
        expect(tiles()).toHaveLength(8);
        expect(within(grid()).getByRole("button", { name: "Lägg till bild" })).toBeTruthy();
    });
});

describe("PhotoGrid selecting one", () => {
    it("selects on a press instead of opening: bound, reported, pressed, and marked", async () => {
        const onselect = vi.fn();
        const onopened = vi.fn();
        const user = mount({ selectable: "single", onselect, onopened });
        expect(tiles().every((button) => button.getAttribute("aria-pressed") === "false")).toBe(true);

        await user.click(tile("The bar"));
        expect(onopened).not.toHaveBeenCalled();
        expect(state().selected).toBe("p3");
        expect(tile("The bar").getAttribute("aria-pressed")).toBe("true");
        expect(tile("The bar").querySelector("[data-photo-grid-check]")).not.toBeNull();
        expect(tile("The bar").className).toContain("outline-2");
        expect(onselect).toHaveBeenCalledTimes(1);
        const detail = onselect.mock.calls[0][0];
        expect(detail.index).toBe(2);
        expect(detail.selected).toBe(true);
        expect(detail.keys).toEqual(["p3"]);
        expect(detail.photo.id).toBe("p3");
    });

    it("never clears the selection on a repeat press", async () => {
        const onselect = vi.fn();
        const user = mount({ selectable: "single", initialSelected: "p3", onselect });
        await user.click(tile("The bar"));
        await user.click(tile("The bar"));
        tile("The bar").focus();
        await user.keyboard("{Enter} ");
        expect(state().selected).toBe("p3");
        expect(tile("The bar").getAttribute("aria-pressed")).toBe("true");
        expect(onselect).not.toHaveBeenCalled();
    });

    it("moves the selection to another photo", async () => {
        const user = mount({ selectable: "single", initialSelected: "p3" });
        await user.click(tile("Trophy"));
        expect(state().selected).toBe("p4");
        expect(grid().querySelectorAll("[data-photo-grid-check]")).toHaveLength(1);
        expect(tile("The bar").getAttribute("aria-pressed")).toBe("false");
    });

    it("gives each tile a button of its own that opens it", async () => {
        const onopened = vi.fn();
        const user = mount({ selectable: "single", onopened });
        const open = within(grid()).getByRole("button", { name: "Open The bar" });
        expect(open.parentElement).toBe(tile("The bar").parentElement);
        expect(tile("The bar").contains(open), "Beside the tile's button, not inside it").toBe(false);
        await user.click(open);
        expect(onopened).toHaveBeenCalledWith(2);
        expect(state().selected, "Opening does not select").toBe("none");
    });

    it("has no open buttons when nothing would open", () => {
        mount({ selectable: "single", handlesOpen: false });
        expect(grid().querySelector("[data-photo-grid-open]")).toBeNull();
    });
});

describe("PhotoGrid selecting several", () => {
    it("ticks and unticks like a checkbox", async () => {
        const onselect = vi.fn();
        const user = mount({ selectable: "multiple", onselect });
        await user.click(tile("The bar"));
        await user.click(tile("Trophy"));
        expect(state().keys).toEqual(["p3", "p4"]);
        expect(grid().querySelectorAll("[data-photo-grid-check]")).toHaveLength(2);

        await user.click(tile("The bar"));
        expect(state().keys).toEqual(["p4"]);
        expect(tile("The bar").getAttribute("aria-pressed")).toBe("false");
        expect(onselect.mock.calls.map((call) => [call[0].index, call[0].selected, call[0].keys])).toEqual([
            [2, true, ["p3"]],
            [3, true, ["p3", "p4"]],
            [2, false, ["p4"]],
        ]);
    });

    it("leaves the tile that stands for more photos as a way in, not a choice", async () => {
        const onopened = vi.fn();
        const user = mount({ selectable: "multiple", count: 14, max: 8, onopened });
        const last = tiles()[7];
        expect(last.hasAttribute("aria-pressed")).toBe(false);
        expect(last.parentElement!.querySelector("[data-photo-grid-open]")).toBeNull();
        await user.click(last);
        expect(onopened).toHaveBeenCalledWith(7);
        expect(state().keys).toEqual([]);
    });
});

describe("PhotoGrid keyboard", () => {
    it("is one Tab stop: the first tile, or the selected one", async () => {
        const user = mount();
        expect(items().filter((button) => button.tabIndex === 0)).toEqual([tiles()[0]]);
        screen.getByTestId("before").focus();
        await user.tab();
        expect(document.activeElement).toBe(tiles()[0]);
        await user.tab();
        expect(document.activeElement).toBe(screen.getByTestId("after"));
        cleanup();

        mount({ selectable: "single", initialSelected: "p4" });
        expect(tiles().filter((button) => button.tabIndex === 0)).toEqual([tile("Trophy")]);
    });

    it("starts on the add tile when there is one", () => {
        mount({ withAdd: true });
        expect(items().filter((button) => button.tabIndex === 0)).toEqual([items()[0]]);
        expect(items()[0].hasAttribute("data-photo-grid-add")).toBe(true);
    });

    it("moves with the arrows by tile and by row, and stops at the edges", async () => {
        const user = mount();
        layOut(3);
        tiles()[0].focus();
        await user.keyboard("{ArrowRight}");
        expect(document.activeElement).toBe(tiles()[1]);
        await user.keyboard("{ArrowDown}");
        expect(document.activeElement).toBe(tiles()[4]);
        await user.keyboard("{ArrowLeft}");
        expect(document.activeElement).toBe(tiles()[3]);
        await user.keyboard("{ArrowUp}");
        expect(document.activeElement).toBe(tiles()[0]);
        await user.keyboard("{ArrowUp}{ArrowLeft}");
        expect(document.activeElement, "Nothing wraps").toBe(tiles()[0]);
        // The Tab stop follows.
        await user.keyboard("{ArrowRight}");
        expect(items().filter((button) => button.tabIndex === 0)).toEqual([tiles()[1]]);
    });

    it("goes to the ends of the row with Home and End, and of the grid with Ctrl", async () => {
        const user = mount();
        layOut(3);
        tiles()[4].focus();
        await user.keyboard("{Home}");
        expect(document.activeElement).toBe(tiles()[3]);
        await user.keyboard("{End}");
        expect(document.activeElement).toBe(tiles()[5]);
        await user.keyboard("{Control>}{Home}{/Control}");
        expect(document.activeElement).toBe(tiles()[0]);
        await user.keyboard("{Control>}{End}{/Control}");
        expect(document.activeElement).toBe(tiles()[5]);
    });

    it("mirrors left and right in a right-to-left page", async () => {
        document.documentElement.dir = "rtl";
        const user = mount();
        layOut(3);
        tiles()[1].focus();
        await user.keyboard("{ArrowLeft}");
        expect(document.activeElement).toBe(tiles()[2]);
        await user.keyboard("{ArrowRight}{ArrowRight}");
        expect(document.activeElement).toBe(tiles()[0]);
    });

    it("includes the add tile in the arrow order", async () => {
        const user = mount({ withAdd: true });
        layOut(3);
        items()[0].focus();
        await user.keyboard("{ArrowRight}");
        expect(document.activeElement).toBe(tiles()[0]);
        await user.keyboard("{ArrowLeft}");
        expect(document.activeElement).toBe(items()[0]);
    });

    it("keeps the arrow keys from scrolling the page, and leaves other keys alone", () => {
        mount();
        layOut(3);
        tiles()[0].focus();
        const press = (key: string, init: KeyboardEventInit = {}) => {
            const event = new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true, ...init });
            document.activeElement!.dispatchEvent(event);
            return event.defaultPrevented;
        };
        expect(press("ArrowDown")).toBe(true);
        expect(press("End")).toBe(true);
        expect(press("Tab")).toBe(false);
        expect(press("a")).toBe(false);
        expect(press("ArrowLeft", { altKey: true }), "Alt+Left is the browser's Back").toBe(false);
    });

    it("in a selectable grid, the open button of the active tile is reached with Tab", async () => {
        const user = mount({ selectable: "multiple" });
        layOut(3);
        screen.getByTestId("before").focus();
        await user.tab();
        expect(document.activeElement).toBe(tiles()[0]);
        await user.tab();
        expect(document.activeElement).toBe(within(grid()).getByRole("button", { name: "Open Team at the table" }));
        await user.tab();
        expect(document.activeElement, "Only the active tile's buttons are Tab stops").toBe(
            screen.getByTestId("after"),
        );
        // The arrows move from the open button's tile as well.
        within(grid()).getByRole("button", { name: "Open Team at the table" }).focus();
        await user.keyboard("{ArrowRight}");
        expect(document.activeElement).toBe(tiles()[1]);
    });

    it("says how to get around, to the tile focus arrives on and only that one", async () => {
        const user = mount();
        const hint = grid().querySelector("[data-photo-grid-hint]")!;
        expect(hint.textContent?.trim()).toBe("Use the arrow keys to move between photos.");
        expect(tiles()[0].getAttribute("aria-describedby")).toBe(hint.id);
        expect(tiles().filter((button) => button.hasAttribute("aria-describedby"))).toHaveLength(1);
        layOut(3);
        screen.getByTestId("before").focus();
        await user.tab();
        await user.keyboard("{ArrowRight}");
        // Not read again at every arrow press.
        expect(tiles()[1].hasAttribute("aria-describedby")).toBe(false);
        expect(tiles()[0].getAttribute("aria-describedby")).toBe(hint.id);
    });

    it("gives every tile a visible focus style", () => {
        mount({ withAdd: true, selectable: "single" });
        for (const button of grid().querySelectorAll("button")) {
            expect(button.className).toContain("focus-ring");
        }
    });
});

describe("PhotoGrid corners", () => {
    it("rounds what sits 4px inside a corner by the tile's radius less those 4px", () => {
        mount({ selectable: "single", initialSelected: "p1" });
        const check = tiles()[0].querySelector("[data-photo-grid-check]")!;
        const open = grid().querySelector("[data-photo-grid-open]")!;
        expect(tiles()[0].className).toContain("rounded-container");
        for (const mark of [check, open]) {
            expect(mark.className).toContain("rounded-[calc(var(--radius-container)-4px)]");
        }
        expect(check.className).toContain("start-[4px]");
        expect(check.className).toContain("top-[4px]");
        expect(open.className).toContain("end-[4px]");
        expect(open.className).toContain("bottom-[4px]");
    });
});
