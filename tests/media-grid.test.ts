import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { isVideoPath, isVideoUrl as sharedIsVideoUrl } from "../src/components/util/media";
import { columnCount, isVideoUrl, moveIndex } from "../src/components/util/media-grid";
import MediaGridHarness from "./fixtures/MediaGridHarness.svelte";

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

const grid = () => screen.getByTestId("grid");
const tile = (name: string) => screen.getByRole("button", { name });
const tiles = () =>
    Array.from(grid().querySelectorAll<HTMLButtonElement>("[data-media-grid-item]"));
const names = () => tiles().map((button) => button.getAttribute("aria-label"));
const selected = () => screen.getByTestId("selected").textContent;
const pressed = () =>
    tiles()
        .filter((button) => button.getAttribute("aria-pressed") === "true")
        .map((button) => button.getAttribute("aria-label"));

/**
 * jsdom has no layout. Give the tiles the top edges a browser would for a
 * grid of `columns` columns, which is all the arrow keys read.
 */
function stubColumns(columns: number) {
    tiles().forEach((button) => {
        vi.spyOn(button, "getBoundingClientRect").mockImplementation(() => {
            const index = tiles().indexOf(button);
            const top = Math.floor(index / columns) * 128;
            return { top, bottom: top + 120, height: 120, left: 0, right: 120, width: 120, x: 0, y: top, toJSON: () => ({}) } as DOMRect;
        });
    });
}

describe("isVideoUrl", () => {
    it("goes by the extension before any query or hash, and by a video data URL", () => {
        expect(isVideoUrl("/media/clip.mp4")).toBe(true);
        expect(isVideoUrl("https://cdn.example/clip.WEBM?token=1#t=2")).toBe(true);
        expect(isVideoUrl("data:video/mp4;base64,AAAA")).toBe(true);
        expect(isVideoUrl("/media/hero.jpg")).toBe(false);
        expect(isVideoUrl("/media/photo.jpg?name=clip.mp4")).toBe(false);
        expect(isVideoUrl("/media/9f3a")).toBe(false);
    });
});

describe("the shared video rule", () => {
    it("is one function, whichever module it is imported from", () => {
        expect(isVideoUrl).toBe(sharedIsVideoUrl);
    });

    it("judges a bare path or file name by its extension", () => {
        expect(isVideoPath("holiday.MOV")).toBe(true);
        expect(isVideoPath("/media/clip.m4v?download=1")).toBe(true);
        expect(isVideoPath("clip.ogv#t=3")).toBe(true);
        expect(isVideoPath("photo.jpeg")).toBe(false);
        expect(isVideoPath("mp4")).toBe(false);
        // A data URL has no extension; only `isVideoUrl` knows about those.
        expect(isVideoPath("data:video/mp4;base64,AAAA")).toBe(false);
    });
});

describe("columnCount", () => {
    it("counts the tiles that share the first top edge", () => {
        expect(columnCount([0, 0, 0, 128, 128])).toBe(3);
        expect(columnCount([0, 0.4, 128])).toBe(2);
        expect(columnCount([0, 128, 256])).toBe(1);
        expect(columnCount([0, 0])).toBe(2);
        expect(columnCount([])).toBe(1);
    });
});

describe("moveIndex", () => {
    // 7 items in 3 columns: rows 0-2, 3-5, 6.
    it("moves one step without wrapping", () => {
        expect(moveIndex(0, "left", 3, 7)).toBe(0);
        expect(moveIndex(2, "right", 3, 7)).toBe(3);
        expect(moveIndex(6, "right", 3, 7)).toBe(6);
        expect(moveIndex(4, "up", 3, 7)).toBe(1);
        expect(moveIndex(1, "up", 3, 7)).toBe(1);
        expect(moveIndex(0, "down", 3, 7)).toBe(3);
    });

    it("reaches a short last row from any column, and stops there", () => {
        expect(moveIndex(3, "down", 3, 7)).toBe(6);
        expect(moveIndex(5, "down", 3, 7)).toBe(6);
        expect(moveIndex(6, "down", 3, 7)).toBe(6);
    });

    it("goes to the ends of the row and of the grid", () => {
        expect(moveIndex(4, "rowStart", 3, 7)).toBe(3);
        expect(moveIndex(4, "rowEnd", 3, 7)).toBe(5);
        expect(moveIndex(6, "rowEnd", 3, 7)).toBe(6);
        expect(moveIndex(4, "first", 3, 7)).toBe(0);
        expect(moveIndex(4, "last", 3, 7)).toBe(6);
        expect(moveIndex(0, "down", 3, 0)).toBe(-1);
    });
});

describe("MediaGrid semantics", () => {
    it("is a named list of toggle buttons", () => {
        render(MediaGridHarness);

        const list = screen.getByRole("list", { name: "Media library" });
        expect(within(list).getAllByRole("listitem")).toHaveLength(7);
        expect(tiles()).toHaveLength(7);
        for (const button of tiles()) {
            expect(button.tagName).toBe("BUTTON");
            expect(button.getAttribute("aria-pressed")).toBe("false");
        }
        // No button inside a button, and nothing a listbox would forbid.
        expect(grid().querySelector("button button")).toBeNull();
    });

    it("lazy-loads images and takes alt from the label", () => {
        render(MediaGridHarness);
        const image = tile("hero.jpg").querySelector("img")!;
        expect(image.getAttribute("alt")).toBe("hero.jpg");
        expect(image.getAttribute("loading")).toBe("lazy");
        expect(image.getAttribute("src")).toBe("/media/hero.jpg");
    });

    it("shows a video as a silent still with an indicator, and says so in its name", () => {
        render(MediaGridHarness);

        // Sniffed from the URL, query string and all.
        const clip = tile("clip.mp4, video");
        const video = clip.querySelector("video")!;
        expect(video.hasAttribute("controls")).toBe(false);
        expect(video.hasAttribute("autoplay")).toBe(false);
        expect(video.muted).toBe(true);
        expect(video.getAttribute("preload")).toBe("metadata");
        expect(video.getAttribute("tabindex")).toBe("-1");
        expect(clip.querySelector("[data-media-grid-video]")).not.toBeNull();

        // Declared by the accessor, with a poster: an image, not a <video>.
        const reel = tile("reel, video");
        expect(reel.querySelector("video")).toBeNull();
        expect(reel.querySelector("img")!.getAttribute("src")).toBe("/media/9f3a.jpg");
        expect(reel.querySelector("[data-media-grid-video]")).not.toBeNull();

        expect(tile("hero.jpg").querySelector("[data-media-grid-video]")).toBeNull();
    });

    it("replaces an image that fails to load with a fallback", async () => {
        render(MediaGridHarness);
        const button = tile("hero.jpg");
        await fireEvent.error(button.querySelector("img")!);

        expect(button.querySelector("img")).toBeNull();
        expect(button.querySelector("[data-media-grid-fallback]")).not.toBeNull();
        // Still named and still selectable.
        expect(tile("hero.jpg")).toBe(button);
        // The others are untouched.
        expect(tile("team.png").querySelector("img")).not.toBeNull();
    });

    it("replaces a video that fails to load too", async () => {
        render(MediaGridHarness);
        const clip = tile("clip.mp4, video");
        await fireEvent.error(clip.querySelector("video")!);
        expect(clip.querySelector("video")).toBeNull();
        expect(clip.querySelector("[data-media-grid-fallback]")).not.toBeNull();
    });
});

describe("MediaGrid selection", () => {
    it("selects one item, marks it with more than colour, and reports it", async () => {
        const user = userEvent.setup();
        const onselect = vi.fn();
        render(MediaGridHarness, { props: { onselect } });

        await user.click(tile("team.png"));
        expect(selected()).toBe("team");
        expect(pressed()).toEqual(["team.png"]);
        expect(tile("team.png").querySelector("[data-media-grid-check]")).not.toBeNull();
        expect(tile("hero.jpg").querySelector("[data-media-grid-check]")).toBeNull();
        expect(onselect).toHaveBeenCalledTimes(1);
        expect(onselect.mock.calls[0][0]).toMatchObject({
            item: { id: "team" },
            selected: true,
            keys: ["team"],
        });

        await user.click(tile("hero.jpg"));
        expect(selected()).toBe("hero");
        expect(pressed()).toEqual(["hero.jpg"]);

        // Activating the selected item clears it, as a toggle button does.
        await user.click(tile("hero.jpg"));
        expect(selected()).toBe("");
        expect(pressed()).toEqual([]);
        expect(onselect).toHaveBeenLastCalledWith(
            expect.objectContaining({ selected: false, keys: [] }),
        );
    });

    it("shows a bound selection from the start", () => {
        render(MediaGridHarness, { props: { initialSelected: "logo" } });
        expect(pressed()).toEqual(["logo.svg"]);
    });

    it("selects with Enter and Space", async () => {
        const user = userEvent.setup();
        render(MediaGridHarness);
        tile("hero.jpg").focus();
        await user.keyboard("{Enter}");
        expect(selected()).toBe("hero");
        await user.keyboard(" ");
        expect(selected()).toBe("");
    });

    it("keeps several items selected when multiple", async () => {
        const user = userEvent.setup();
        const onselect = vi.fn();
        render(MediaGridHarness, { props: { multiple: true, onselect } });

        await user.click(tile("hero.jpg"));
        await user.click(tile("logo.svg"));
        expect(selected()).toBe("hero,logo");
        expect(pressed()).toEqual(["hero.jpg", "logo.svg"]);
        expect(onselect).toHaveBeenLastCalledWith(
            expect.objectContaining({ selected: true, keys: ["hero", "logo"] }),
        );

        await user.click(tile("hero.jpg"));
        expect(selected()).toBe("logo");
        expect(onselect).toHaveBeenLastCalledWith(
            expect.objectContaining({ selected: false, keys: ["logo"] }),
        );
    });
});

describe("MediaGrid keyboard", () => {
    it("is one Tab stop: the item, then its delete button, then out", async () => {
        const user = userEvent.setup();
        render(MediaGridHarness, { props: { deleting: "report" } });

        expect(tiles().filter((button) => button.tabIndex === 0)).toHaveLength(1);
        expect(
            grid().querySelectorAll('[data-media-grid-delete][tabindex="0"]'),
        ).toHaveLength(1);

        screen.getByTestId("before").focus();
        await user.tab();
        expect(document.activeElement).toBe(tile("hero.jpg"));
        await user.tab();
        expect(document.activeElement).toBe(tile("Delete hero.jpg"));
        await user.tab();
        expect(document.activeElement).toBe(screen.getByTestId("after"));

        await user.tab({ shift: true });
        expect(document.activeElement).toBe(tile("Delete hero.jpg"));
    });

    it("starts on the selected item", async () => {
        const user = userEvent.setup();
        render(MediaGridHarness, { props: { initialSelected: "logo" } });
        screen.getByTestId("before").focus();
        await user.tab();
        expect(document.activeElement).toBe(tile("logo.svg"));
    });

    it("moves in two dimensions by the rendered columns", async () => {
        const user = userEvent.setup();
        render(MediaGridHarness);
        stubColumns(3);

        tile("hero.jpg").focus();
        await user.keyboard("{ArrowRight}");
        expect(document.activeElement).toBe(tile("team.png"));
        await user.keyboard("{ArrowDown}");
        expect(document.activeElement).toBe(tile("reel, video"));
        // No tile under this column in the last row: go to the last item.
        await user.keyboard("{ArrowDown}");
        expect(document.activeElement).toBe(tile("desk.jpg"));
        await user.keyboard("{ArrowUp}");
        expect(document.activeElement).toBe(tile("logo.svg"));
        await user.keyboard("{End}");
        expect(document.activeElement).toBe(tile("map.webp"));
        await user.keyboard("{Home}");
        expect(document.activeElement).toBe(tile("logo.svg"));
        await user.keyboard("{Control>}{End}{/Control}");
        expect(document.activeElement).toBe(tile("desk.jpg"));
        await user.keyboard("{Control>}{Home}{/Control}");
        expect(document.activeElement).toBe(tile("hero.jpg"));
        await user.keyboard("{ArrowLeft}");
        expect(document.activeElement).toBe(tile("hero.jpg"));

        // Moving focus does not select.
        expect(selected()).toBe("");
    });

    it("follows a different column count", async () => {
        const user = userEvent.setup();
        render(MediaGridHarness);
        stubColumns(2);
        tile("hero.jpg").focus();
        await user.keyboard("{ArrowDown}");
        expect(document.activeElement).toBe(tile("clip.mp4, video"));
    });

    it("makes the item the arrows reached the Tab stop", async () => {
        const user = userEvent.setup();
        render(MediaGridHarness, { props: { deleting: "report" } });
        stubColumns(3);

        tile("hero.jpg").focus();
        await user.keyboard("{ArrowRight}{ArrowRight}");
        expect(tile("clip.mp4, video").tabIndex).toBe(0);
        expect(tile("hero.jpg").tabIndex).toBe(-1);
        await user.tab();
        expect(document.activeElement).toBe(tile("Delete clip.mp4"));
        // The arrows work from the delete button as well.
        await user.keyboard("{ArrowLeft}");
        expect(document.activeElement).toBe(tile("team.png"));
    });

    it("mirrors left and right in a right-to-left layout", async () => {
        const user = userEvent.setup();
        render(MediaGridHarness);
        stubColumns(3);
        grid().style.direction = "rtl";

        tile("hero.jpg").focus();
        await user.keyboard("{ArrowLeft}");
        expect(document.activeElement).toBe(tile("team.png"));
        await user.keyboard("{ArrowRight}");
        expect(document.activeElement).toBe(tile("hero.jpg"));
    });

    it("stops the keys it handles from scrolling, and leaves the rest", async () => {
        render(MediaGridHarness);
        stubColumns(3);
        const first = tile("hero.jpg");
        first.focus();
        // fireEvent returns false when a handler called preventDefault().
        expect(await fireEvent.keyDown(first, { key: "ArrowUp" })).toBe(false);
        expect(await fireEvent.keyDown(first, { key: "Home" })).toBe(false);
        expect(await fireEvent.keyDown(first, { key: "Tab" })).toBe(true);
        expect(await fireEvent.keyDown(first, { key: "ArrowDown", altKey: true })).toBe(true);
        expect(document.activeElement).toBe(first);
    });
});

describe("MediaGrid keyboard hint", () => {
    const hint = () => grid().querySelector<HTMLElement>("[data-media-grid-hint]")!;
    const described = () =>
        tiles()
            .filter((button) => button.hasAttribute("aria-describedby"))
            .map((button) => button.getAttribute("aria-label"));

    it("describes the Tab stop, and only it, with one short sentence", () => {
        render(MediaGridHarness, { props: { deleting: "report" } });
        expect(hint().textContent?.trim()).toBe("Use the arrow keys to move between items.");
        expect(described()).toEqual(["hero.jpg"]);
        expect(tile("hero.jpg").getAttribute("aria-describedby")).toBe(hint().id);
        // Not on the delete buttons.
        expect(grid().querySelectorAll("[data-media-grid-delete][aria-describedby]")).toHaveLength(0);
    });

    it("follows the selected item, which is where Tab lands", () => {
        render(MediaGridHarness, { props: { initialSelected: "logo" } });
        expect(described()).toEqual(["logo.svg"]);
    });

    it("stays on the item focus came in on, so arrowing does not repeat it", async () => {
        const user = userEvent.setup();
        render(MediaGridHarness);
        stubColumns(3);

        screen.getByTestId("before").focus();
        await user.tab();
        expect(document.activeElement).toBe(tile("hero.jpg"));
        expect(described()).toEqual(["hero.jpg"]);

        await user.keyboard("{ArrowRight}");
        expect(document.activeElement).toBe(tile("team.png"));
        // The newly focused item has no description to read out.
        expect(described()).toEqual(["hero.jpg"]);
        await user.keyboard("{ArrowDown}");
        expect(described()).toEqual(["hero.jpg"]);
    });

    it("moves to the new Tab stop once focus has left the grid", async () => {
        const user = userEvent.setup();
        render(MediaGridHarness);
        stubColumns(3);

        tile("hero.jpg").focus();
        await user.keyboard("{ArrowRight}");
        await user.tab();
        expect(document.activeElement).toBe(screen.getByTestId("after"));
        // Coming back lands on team.png, and it is read there.
        expect(described()).toEqual(["team.png"]);
        await user.tab({ shift: true });
        expect(document.activeElement).toBe(tile("team.png"));
        expect(described()).toEqual(["team.png"]);
    });

    it("is hidden until the grid has keyboard focus, by a rule on the host", () => {
        render(MediaGridHarness);
        const classes = hint().className.split(" ");
        expect(classes).toContain("hidden");
        expect(classes).toContain("group-has-[:focus-visible]/media:block");
        expect(grid().className.split(" ")).toContain("group/media");
    });

    it("is translatable, and absent with nothing to move between", () => {
        const { unmount } = render(MediaGridHarness, {
            props: { strings: { keyboardHint: "Flytta med piltangenterna." } },
        });
        expect(hint().textContent?.trim()).toBe("Flytta med piltangenterna.");
        unmount();

        render(MediaGridHarness, { props: { initialItems: [] } });
        expect(grid().querySelector("[data-media-grid-hint]")).toBeNull();
    });
});

describe("MediaGrid delete", () => {
    it("has no delete buttons unless ondelete is given", () => {
        render(MediaGridHarness);
        expect(grid().querySelectorAll("[data-media-grid-delete]")).toHaveLength(0);
    });

    it("reports the item, selects nothing and removes nothing", async () => {
        const user = userEvent.setup();
        const onremove = vi.fn();
        const onselect = vi.fn();
        render(MediaGridHarness, { props: { deleting: "report", onremove, onselect } });

        const button = tile("Delete team.png");
        // A sibling of the item's button, so it is reachable and valid.
        expect(tile("team.png").contains(button)).toBe(false);
        await user.click(button);

        expect(onremove).toHaveBeenCalledTimes(1);
        expect(onremove.mock.calls[0][0]).toMatchObject({ id: "team" });
        expect(onselect).not.toHaveBeenCalled();
        expect(selected()).toBe("");
        expect(tiles()).toHaveLength(7);
    });

    it("sits on the logical end corner, with a larger tap area for coarse pointers", () => {
        render(MediaGridHarness, { props: { deleting: "report" } });
        const classes = tile("Delete hero.jpg").className.split(" ");
        expect(classes).toContain("end-1");
        expect(classes).not.toContain("right-1");
        // Drawn at 28px; the pseudo-element is what grows, and only on touch.
        expect(classes).toContain("size-7");
        expect(classes).toContain("before:hidden");
        expect(classes).toContain("pointer-coarse:before:block");
    });

    it("names a video's delete button by its label alone", () => {
        render(MediaGridHarness, { props: { deleting: "report" } });
        expect(tile("Delete clip.mp4")).toBeTruthy();
    });

    it("leaves the button off an item that may not be deleted", async () => {
        const onremove = vi.fn();
        render(MediaGridHarness, {
            props: { deleting: "report", protectedId: "logo", onremove },
        });
        expect(screen.queryByRole("button", { name: "Delete logo.svg" })).toBeNull();
        expect(grid().querySelectorAll("[data-media-grid-delete]")).toHaveLength(6);

        // The Delete key respects it too.
        tile("logo.svg").focus();
        await fireEvent.keyDown(tile("logo.svg"), { key: "Delete" });
        expect(onremove).not.toHaveBeenCalled();
    });

    it("asks for the focused item's deletion with the Delete key", async () => {
        const user = userEvent.setup();
        const onremove = vi.fn();
        render(MediaGridHarness, { props: { deleting: "report", onremove } });
        tile("team.png").focus();
        await user.keyboard("{Delete}");
        expect(onremove).toHaveBeenCalledTimes(1);
        expect(onremove.mock.calls[0][0]).toMatchObject({ id: "team" });
        expect(selected()).toBe("");
    });
});

describe("MediaGrid focus after an item is removed", () => {
    it("moves to the item that took its place", async () => {
        const user = userEvent.setup();
        render(MediaGridHarness, { props: { deleting: "remove" } });

        tile("Delete team.png").focus();
        await user.keyboard("{Enter}");

        expect(names()).not.toContain("team.png");
        await waitFor(() =>
            expect(document.activeElement).toBe(tile("clip.mp4, video")),
        );
        expect(tile("clip.mp4, video").tabIndex).toBe(0);
    });

    it("moves to the new last item when the last one goes", async () => {
        const user = userEvent.setup();
        render(MediaGridHarness, { props: { deleting: "remove" } });
        await user.click(tile("Delete desk.jpg"));
        await waitFor(() => expect(document.activeElement).toBe(tile("map.webp")));
    });

    it("moves to the grid itself when nothing is left", async () => {
        const user = userEvent.setup();
        render(MediaGridHarness, {
            props: {
                deleting: "remove",
                initialItems: [{ id: "hero", name: "hero.jpg", url: "/media/hero.jpg" }],
            },
        });
        await user.click(tile("Delete hero.jpg"));
        await waitFor(() => expect(document.activeElement).toBe(grid()));
        expect(screen.getByText("No media yet")).toBeTruthy();
    });

    it("lands on the neighbour after a ConfirmDialog that closes once the item is gone", async () => {
        const user = userEvent.setup();
        render(MediaGridHarness, { props: { deleting: "confirm" } });

        await user.click(tile("Delete team.png"));
        const dialog = await screen.findByRole("alertdialog", { name: "Delete this file?" });
        // Focus is in the dialog when the item is removed; the dialog then
        // closes and has no delete button to hand focus back to.
        await user.click(within(dialog).getByRole("button", { name: "Delete" }));

        await waitFor(() => expect(screen.queryByRole("alertdialog")).toBeNull());
        expect(names()).not.toContain("team.png");
        await waitFor(() =>
            expect(document.activeElement).toBe(tile("clip.mp4, video")),
        );
    });

    it("lands on the neighbour when the dialog outlives the item", async () => {
        const user = userEvent.setup();
        render(MediaGridHarness, { props: { deleting: "confirm-slow" } });

        await user.click(tile("Delete team.png"));
        const dialog = await screen.findByRole("alertdialog");
        await user.click(within(dialog).getByRole("button", { name: "Delete" }));

        // The item goes first. Focus is still inside the open dialog then,
        // and the grid must not pull it out.
        await waitFor(() => expect(names()).not.toContain("team.png"));
        expect(screen.queryByRole("alertdialog")).not.toBeNull();
        expect(grid().contains(document.activeElement)).toBe(false);

        // Only when the dialog closes is focus lost, and then picked up.
        await waitFor(() => expect(screen.queryByRole("alertdialog")).toBeNull());
        await waitFor(() =>
            expect(document.activeElement).toBe(tile("clip.mp4, video")),
        );
    });

    it("returns to the delete button when the dialog is cancelled", async () => {
        const user = userEvent.setup();
        render(MediaGridHarness, { props: { deleting: "confirm" } });

        await user.click(tile("Delete team.png"));
        const dialog = await screen.findByRole("alertdialog");
        await user.click(within(dialog).getByRole("button", { name: "Cancel" }));
        await waitFor(() =>
            expect(document.activeElement).toBe(tile("Delete team.png")),
        );
        expect(tiles()).toHaveLength(7);
    });

    it("does not take focus when an item goes while focus is elsewhere", async () => {
        const user = userEvent.setup();
        render(MediaGridHarness);
        const button = screen.getByTestId("remove-first");
        await user.click(button);
        expect(tiles()).toHaveLength(6);
        await new Promise((resolve) => setTimeout(resolve, 50));
        expect(document.activeElement).toBe(button);
    });

    it("keeps focus where it is when another item than the focused one goes", async () => {
        render(MediaGridHarness);
        tile("logo.svg").focus();
        await fireEvent.click(screen.getByTestId("remove-first"));
        expect(tiles()).toHaveLength(6);
        expect(document.activeElement).toBe(tile("logo.svg"));
    });
});

describe("MediaGrid states", () => {
    it("shows placeholder tiles and one status while loading", () => {
        render(MediaGridHarness, { props: { initialItems: [], loading: true } });

        const skeletons = grid().querySelectorAll("[data-media-grid-skeleton]");
        expect(skeletons).toHaveLength(8);
        for (const skeleton of skeletons) {
            expect(skeleton.getAttribute("aria-hidden")).toBe("true");
        }
        // The hidden placeholders are not statuses of their own.
        expect(screen.getAllByRole("status")).toHaveLength(1);
        expect(screen.getByRole("status").textContent?.trim()).toBe("Loading media");
        expect(screen.getByRole("list").getAttribute("aria-busy")).toBe("true");
        expect(screen.queryByText("No media yet")).toBeNull();
    });

    it("takes a placeholder count and keeps loaded items in place", () => {
        render(MediaGridHarness, { props: { loading: true, loadingCount: 3 } });
        expect(tiles()).toHaveLength(7);
        expect(grid().querySelectorAll("[data-media-grid-skeleton]")).toHaveLength(3);
        // Placeholders are not list items to assistive technology.
        expect(screen.getAllByRole("listitem")).toHaveLength(7);
    });

    it("says nothing in the status when not loading", () => {
        render(MediaGridHarness);
        expect(screen.getByRole("status").textContent?.trim()).toBe("");
        expect(screen.getByRole("list").hasAttribute("aria-busy")).toBe(false);
    });

    it("shows the empty state, with its text overridable", () => {
        const { unmount } = render(MediaGridHarness, { props: { initialItems: [] } });
        expect(screen.getByRole("heading", { name: "No media yet" })).toBeTruthy();
        expect(screen.getByText("Images and videos you upload appear here.")).toBeTruthy();
        expect(screen.queryByRole("list")).toBeNull();
        unmount();

        render(MediaGridHarness, {
            props: {
                initialItems: [],
                strings: { emptyTitle: "Inga filer", emptyDescription: "Ladda upp en bild." },
            },
        });
        expect(screen.getByRole("heading", { name: "Inga filer" })).toBeTruthy();
        expect(screen.getByText("Ladda upp en bild.")).toBeTruthy();
    });

    it("uses a compact empty state under an h3, or the level asked for", () => {
        const { unmount } = render(MediaGridHarness, { props: { initialItems: [] } });
        const heading = screen.getByRole("heading", { name: "No media yet" });
        expect(heading.tagName).toBe("H3");
        expect(screen.getByText("Images and videos you upload appear here.")).toBeTruthy();
        // Compact: the smaller title, not the page-sized default. Read from
        // the heading, whatever element EmptyState wraps it in.
        expect(heading.className).toContain("text-base");
        expect(heading.className).not.toContain("text-lg");
        unmount();

        render(MediaGridHarness, {
            props: { initialItems: [], emptyHeadingLevel: 4 },
        });
        expect(screen.getByRole("heading", { name: "No media yet" }).tagName).toBe("H4");
    });

    it("takes an empty snippet instead", () => {
        render(MediaGridHarness, { props: { initialItems: [], customEmpty: true } });
        expect(screen.getByTestId("custom-empty")).toBeTruthy();
        expect(screen.queryByText("No media yet")).toBeNull();
    });

    it("disables selecting and deleting", async () => {
        const onselect = vi.fn();
        const onremove = vi.fn();
        render(MediaGridHarness, {
            props: { disabled: true, deleting: "report", onselect, onremove },
        });

        const buttons = Array.from(grid().querySelectorAll("button"));
        expect(buttons).toHaveLength(14);
        expect(buttons.every((button) => button.disabled)).toBe(true);

        await fireEvent.click(tile("hero.jpg"));
        await fireEvent.click(tile("Delete hero.jpg"));
        await fireEvent.keyDown(tile("hero.jpg"), { key: "Delete" });
        expect(onselect).not.toHaveBeenCalled();
        expect(onremove).not.toHaveBeenCalled();
        expect(selected()).toBe("");
    });

    it("takes translated names and a translated loading message", () => {
        render(MediaGridHarness, {
            props: {
                deleting: "report",
                loading: true,
                strings: {
                    deleteLabel: (label: string) => `Ta bort ${label}`,
                    videoLabel: (label: string) => `${label}, video (film)`,
                    loading: "Laddar media",
                },
            },
        });
        expect(tile("Ta bort hero.jpg")).toBeTruthy();
        expect(tile("clip.mp4, video (film)")).toBeTruthy();
        expect(screen.getByRole("status").textContent?.trim()).toBe("Laddar media");
    });
});
