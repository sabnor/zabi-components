import { cleanup, fireEvent, render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, onTestFinished, vi } from "vitest";

import ImageUpload from "../src/components/molecules/ImageUpload.svelte";

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

/** jsdom lacks object URLs; install stubs for one test only. */
function stubObjectUrls(url = "blob:preview-1") {
    const urlStatics = URL as unknown as Record<string, unknown>;
    urlStatics.createObjectURL = vi.fn(() => url);
    urlStatics.revokeObjectURL = vi.fn();
    onTestFinished(() => {
        delete urlStatics.createObjectURL;
        delete urlStatics.revokeObjectURL;
    });
}

const fileInput = () => screen.getByTestId("image-upload-input") as HTMLInputElement;
const photo = (size = 4) => new File([new Uint8Array(size)], "me.png", { type: "image/png" });

describe('ImageUpload variant="button"', () => {
    it("is one button named by the label, with no drop area", () => {
        const { container } = render(ImageUpload, { props: { variant: "button", label: "Välj ett foto" } });
        const button = screen.getByRole("button", { name: "Välj ett foto" });
        expect(screen.getAllByRole("button")).toHaveLength(1);
        expect(container.querySelector("label")).toBeNull();
        expect(container.querySelector(".border-dashed")).toBeNull();
        expect(container.querySelector("[data-drag-over], [role=presentation]")).toBeNull();
        // The default trigger is the secondary Button; buttonVariant changes it.
        expect(button.className).toContain("bg-action-secondary");
    });

    it("takes buttonVariant and falls back to browseText for a name", () => {
        render(ImageUpload, { props: { variant: "button", buttonVariant: "tonal" } });
        const button = screen.getByRole("button", { name: "Click to choose a file" });
        expect(button.className).toContain("bg-action-tonal");
    });

    it("opens the chooser, reports the file and draws no preview or Remove", async () => {
        stubObjectUrls();
        const user = userEvent.setup();
        const onfileselect = vi.fn();
        const { container } = render(ImageUpload, {
            props: { variant: "button", label: "Photo", onfileselect },
        });
        const click = vi.spyOn(fileInput(), "click");
        await user.click(screen.getByRole("button", { name: "Photo" }));
        expect(click).toHaveBeenCalledTimes(1);

        const file = photo();
        await fireEvent.change(fileInput(), { target: { files: [file] } });
        expect(onfileselect).toHaveBeenCalledWith({ file, url: "blob:preview-1" });
        expect(container.querySelector("img, video")).toBeNull();
        expect(screen.getAllByRole("button")).toHaveLength(1);
        expect(screen.getByRole("button", { name: "Photo" })).toBeTruthy();
        expect(screen.getByRole("status").textContent?.trim()).toBe("Image selected");
    });

    it("does nothing when disabled, and ties the error to the button", async () => {
        const user = userEvent.setup();
        render(ImageUpload, {
            props: { variant: "button", label: "Photo", disabled: true, errorMessage: "Too large" },
        });
        const button = screen.getByRole("button", { name: "Photo" }) as HTMLButtonElement;
        const click = vi.spyOn(fileInput(), "click");
        await user.click(button);
        expect(click).not.toHaveBeenCalled();
        expect(button.disabled).toBe(true);
        expect(screen.getByRole("alert").id).toBe(button.getAttribute("aria-describedby"));
    });
});

describe("ImageUpload maxSize", () => {
    it("turns away a chosen file that is too large, with the reason", async () => {
        stubObjectUrls();
        const onfileselect = vi.fn();
        const onfilereject = vi.fn();
        render(ImageUpload, { props: { variant: "button", label: "Photo", maxSize: 10, onfileselect, onfilereject } });
        const big = photo(11);
        await fireEvent.change(fileInput(), { target: { files: [big] } });
        expect(onfilereject).toHaveBeenCalledWith(big, "size");
        expect(onfileselect).not.toHaveBeenCalled();

        const small = photo(10);
        await fireEvent.change(fileInput(), { target: { files: [small] } });
        expect(onfileselect).toHaveBeenCalledWith({ file: small, url: "blob:preview-1" });
    });

    it("applies to a drop on the dropzone too, after the type", async () => {
        stubObjectUrls();
        const onfilereject = vi.fn();
        const { container } = render(ImageUpload, { props: { label: "Logo", maxSize: 10, onfilereject } });
        const zone = container.querySelector("[role=presentation]")!;
        const big = photo(11);
        await fireEvent.drop(zone, { dataTransfer: { types: ["Files"], files: [big] } });
        expect(onfilereject).toHaveBeenLastCalledWith(big, "size");
        const text = new File(["x"], "a.txt", { type: "text/plain" });
        await fireEvent.drop(zone, { dataTransfer: { types: ["Files"], files: [text] } });
        expect(onfilereject).toHaveBeenLastCalledWith(text, "type");
    });
});
