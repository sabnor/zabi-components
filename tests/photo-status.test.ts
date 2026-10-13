import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import GalleryHarness from "./fixtures/GalleryHarness.svelte";
import type { Photo, PhotoViewerAction } from "../src/components/util/photo";

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

const PIXEL = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
const photo = (at: number, extra: Partial<Photo> = {}): Photo => ({
    id: `p${at}`,
    src: `${PIXEL}#full-${at}`,
    thumbSrc: `${PIXEL}#thumb-${at}`,
    alt: `Photo ${at}`,
    width: 1600,
    height: 1200,
    ...extra,
});

const grid = () => screen.getByTestId("grid");
const viewer = () => screen.getByRole("dialog", { name: "Photo viewer" });

describe("PhotoGrid: a tile says where its photo stands (Z-133)", () => {
    const photos = [
        photo(1),
        photo(2, { status: "uploading" }),
        photo(3, { status: "uploading", progress: 0.4 }),
        photo(4, { status: "error" }),
    ];

    it("marks the tile and says it in the name", () => {
        render(GalleryHarness, { props: { withViewer: false, initialPhotos: photos } });
        const names = [...grid().querySelectorAll("[data-photo-key]")].map((tile) => tile.getAttribute("aria-label"));
        expect(names).toEqual(["Photo 1", "Photo 2, Uploading", "Photo 3, Uploading", "Photo 4, Not uploaded"]);
        const marks = [...grid().querySelectorAll("[data-photo-grid-status]")];
        expect(marks.map((mark) => mark.getAttribute("data-photo-grid-status"))).toEqual([
            "uploading",
            "uploading",
            "error",
        ]);
        expect(marks[1].textContent!.trim()).toBe("40%");
        for (const mark of marks) expect(mark.getAttribute("aria-hidden")).toBe("true");
    });

    it("takes the words from strings", () => {
        render(GalleryHarness, {
            props: {
                withViewer: false,
                initialPhotos: photos,
                gridStrings: { uploading: "på väg", uploadFailed: "kom inte fram" },
            },
        });
        expect(within(grid()).getByRole("button", { name: "Photo 2, på väg" })).toBeTruthy();
        expect(within(grid()).getByRole("button", { name: "Photo 4, kom inte fram" })).toBeTruthy();
    });

    it("offers Try again on a failed photo only with onretry, and reports the photo", async () => {
        const gridRetry = vi.fn();
        const view = render(GalleryHarness, { props: { withViewer: false, initialPhotos: photos } });
        expect(grid().querySelector("[data-photo-grid-retry]")).toBeNull();
        view.unmount();

        render(GalleryHarness, { props: { withViewer: false, initialPhotos: photos, gridRetry } });
        const retries = grid().querySelectorAll("[data-photo-grid-retry]");
        expect(retries).toHaveLength(1);
        await userEvent.setup().click(within(grid()).getByRole("button", { name: "Try again: Photo 4" }));
        expect(gridRetry).toHaveBeenCalledWith(expect.objectContaining({ id: "p4" }), 3);
    });
});

describe("PhotoGrid: a thumbnail that fails is told to the page, once (Z-132)", () => {
    it("calls onloaderror with the photo and its place", async () => {
        const gridLoadError = vi.fn();
        render(GalleryHarness, { props: { withViewer: false, initialPhotos: [photo(1), photo(2)], gridLoadError } });
        const image = grid().querySelectorAll("img")[1];
        await fireEvent.error(image);
        expect(gridLoadError).toHaveBeenCalledTimes(1);
        expect(gridLoadError).toHaveBeenCalledWith(expect.objectContaining({ id: "p2" }), 1);
    });
});

describe("PhotoGrid: nothing leaves the add tile (Z-136)", () => {
    it("cuts the label at two lines, keeps the whole text as the name, and draws the plus only where it fits", () => {
        render(GalleryHarness, {
            props: { withViewer: false, withAdd: true, gridStrings: { addPhoto: "Lägg till foton" } },
        });
        const add = grid().querySelector<HTMLElement>("[data-photo-grid-add]")!;
        expect(add.getAttribute("aria-label")).toBe("Lägg till foton");
        expect(add.className).toContain("overflow-hidden");
        expect(add.querySelector("span")!.className).toContain("line-clamp-2");
        // The tile is the container the plus asks about.
        expect(add.closest("li")!.className).toContain("@container");
        const plus = add.querySelector("svg")!;
        expect(plus.getAttribute("class")).toContain("hidden");
        expect(plus.getAttribute("class")).toContain("@min-[calc(24px+3.5rem)]:block");
    });
});

describe("PhotoViewer: Try again asks the page first (Z-132)", () => {
    async function openBroken(props: Record<string, unknown>) {
        render(GalleryHarness, { props: { withGrid: false, initialOpen: true, initialPhotos: [photo(1)], ...props } });
        await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeNull());
        await fireEvent.error(viewer().querySelector("[data-photo-viewer-image]")!);
    }

    it("tells the page of the failure, once", async () => {
        const viewerLoadError = vi.fn();
        await openBroken({ viewerLoadError });
        expect(viewerLoadError).toHaveBeenCalledTimes(1);
        expect(viewerLoadError).toHaveBeenCalledWith(expect.objectContaining({ id: "p1" }), 0);
    });

    it("waits, busy, for the promise onretry returns, then asks for the image again", async () => {
        let done!: () => void;
        const viewerRetry = vi.fn(() => new Promise<void>((resolve) => (done = resolve)));
        await openBroken({ viewerRetry });
        const button = within(viewer()).getByRole("button", { name: "Try again" });
        await userEvent.setup().click(button);
        expect(viewerRetry).toHaveBeenCalledWith(expect.objectContaining({ id: "p1" }), 0);
        expect(button.getAttribute("aria-busy")).toBe("true");
        expect(viewer().querySelector("[data-photo-viewer-image]")).toBeNull();
        done();
        await waitFor(() => expect(viewer().querySelector("[data-photo-viewer-image]")).not.toBeNull());
    });

    it("asks for the image again all the same when onretry fails", async () => {
        const viewerRetry = vi.fn(() => Promise.reject(new Error("no address")));
        await openBroken({ viewerRetry });
        await userEvent.setup().click(within(viewer()).getByRole("button", { name: "Try again" }));
        await waitFor(() => expect(viewer().querySelector("[data-photo-viewer-image]")).not.toBeNull());
    });
});

describe("PhotoViewer: a credit under the caption (Z-135)", () => {
    it("draws it on a line of its own, outside what More folds, and describes the dialog by both", async () => {
        const photos = [photo(1, { caption: "Utslagsfrågan", credit: "Foto: Sara" })];
        render(GalleryHarness, { props: { withGrid: false, initialOpen: true, initialPhotos: photos } });
        await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeNull());
        const plate = viewer().querySelector("[data-photo-viewer-caption]")!;
        const credit = plate.querySelector("[data-photo-viewer-credit]")!;
        expect(credit.textContent!.trim()).toBe("Foto: Sara");
        expect(credit.className).toContain("basis-full");
        expect(credit.className).toContain("text-description");
        expect(credit.className).not.toContain("line-clamp");
        const described = viewer().getAttribute("aria-describedby")!.split(" ");
        expect(described.map((id) => document.getElementById(id)!.textContent!.replace(/\s+/g, " ").trim())).toEqual([
            "Photo 1, 1 of 1",
            "Utslagsfrågan",
            "Foto: Sara",
        ]);
    });

    it("shows a credit without a caption", async () => {
        render(GalleryHarness, {
            props: { withGrid: false, initialOpen: true, initialPhotos: [photo(1, { credit: "Foto: Sara" })] },
        });
        await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeNull());
        expect(viewer().querySelector("[data-photo-viewer-credit]")!.textContent!.trim()).toBe("Foto: Sara");
    });
});

describe("PhotoViewer: an action that goes with its photo does not take the focus with it (Z-134)", () => {
    it("moves the focus to Close when the pressed button is gone and the focus is on the page", async () => {
        const photos = [photo(1), photo(2)];
        // Only the first photo can be removed.
        let actions: PhotoViewerAction[] = [{ id: "remove", label: "Remove", onclick: () => {} }];
        const view = render(GalleryHarness, {
            props: { withGrid: false, initialOpen: true, initialPhotos: photos, actions },
        });
        await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeNull());
        const remove = within(viewer()).getByRole("button", { name: "Remove" });
        remove.focus();
        expect(document.activeElement).toBe(remove);
        actions = [];
        await view.rerender({ actions });
        await waitFor(() =>
            expect(document.activeElement).toBe(within(viewer()).getByRole("button", { name: "Close" })),
        );
    });
});
