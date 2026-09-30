import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, onTestFinished, vi } from "vitest";

import ImageUpload from "../src/components/molecules/ImageUpload.svelte";

/**
 * QA review of b76dace. Gaps the package's own tests left open. The tests
 * tagged QA-IU-n failed against that commit and pin the fixes that followed.
 */

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

/** jsdom lacks object URLs; install stubs for one test only. */
function stubObjectUrls(url = "blob:preview-1") {
    const createObjectURL = vi.fn(() => url);
    const revokeObjectURL = vi.fn();
    const urlStatics = URL as unknown as Record<string, unknown>;
    urlStatics.createObjectURL = createObjectURL;
    urlStatics.revokeObjectURL = revokeObjectURL;
    onTestFinished(() => {
        delete urlStatics.createObjectURL;
        delete urlStatics.revokeObjectURL;
    });
    return { createObjectURL, revokeObjectURL };
}

const fileInput = () => screen.getByTestId("image-upload-input") as HTMLInputElement;
const STORED = "https://cdn.example.com/media/logo.png";

describe("ImageUpload (QA): custom source with a stored URL", () => {
    it("Remove reports nulls and revokes nothing when the value is a stored URL", async () => {
        const user = userEvent.setup();
        const { revokeObjectURL } = stubObjectUrls();
        const onbrowse = vi.fn();
        const onfileselect = vi.fn();
        render(ImageUpload, {
            props: { label: "Logo", value: STORED, onbrowse, onfileselect },
        });
        const clickSpy = vi.spyOn(fileInput(), "click");

        await user.click(screen.getByRole("button", { name: "Change Logo" }));
        expect(onbrowse).toHaveBeenCalledOnce();
        expect(clickSpy).not.toHaveBeenCalled();
        expect(onfileselect).not.toHaveBeenCalled();

        await user.click(screen.getByRole("button", { name: "Remove Logo" }));
        expect(onfileselect).toHaveBeenCalledOnce();
        expect(onfileselect).toHaveBeenCalledWith({ file: null, url: null });
        // A stored URL is the consumer's; only object URLs are the component's to revoke.
        expect(revokeObjectURL).not.toHaveBeenCalled();
        await waitFor(() =>
            expect(screen.getByRole("button", { name: "Logo" }).tagName).toBe("BUTTON"),
        );
    });
});

describe("ImageUpload (QA): label target in both states", () => {
    it("points the label at the dropzone when empty and at Change when filled", async () => {
        const { container, rerender } = render(ImageUpload, {
            props: { label: "Logo", id: "site-logo" },
        });
        const label = container.querySelector("label") as HTMLLabelElement;

        expect(label.htmlFor).toBe("site-logo");
        expect(document.getElementById("site-logo")).toBe(
            screen.getByRole("button", { name: "Logo" }),
        );
        // The dropzone's own text is still exposed, as its description.
        const hint = document.getElementById(
            document.getElementById("site-logo")?.getAttribute("aria-describedby") ?? "",
        );
        expect(hint?.textContent).toMatch(/No image selected/);

        await rerender({ value: STORED });
        expect(container.querySelectorAll("#site-logo")).toHaveLength(1);
        expect(document.getElementById("site-logo")).toBe(
            screen.getByRole("button", { name: "Change Logo" }),
        );
        expect(screen.getByRole("group", { name: "Logo" }).contains(label)).toBe(false);
    });
});

describe("ImageUpload (QA): drag state", () => {
    it("clears the highlight once every nested dragenter has been left", async () => {
        render(ImageUpload);
        const dropzone = screen.getByRole("button", { name: /No image selected/ });
        const inner = dropzone.querySelector("span") as HTMLElement;
        const files = { dataTransfer: { types: ["Files"] } };

        await fireEvent.dragEnter(dropzone, files);
        await fireEvent.dragEnter(inner, files);
        await fireEvent.dragLeave(inner);
        expect(dropzone.className).toContain("bg-action-primary-subtle");
        await fireEvent.dragLeave(dropzone);
        expect(dropzone.className).not.toContain("bg-action-primary-subtle");
    });

    it("ignores a drag that carries no files", async () => {
        const onfileselect = vi.fn();
        render(ImageUpload, { props: { onfileselect } });
        const dropzone = screen.getByRole("button", { name: /No image selected/ });

        // fireEvent returns true when nothing called preventDefault().
        expect(
            await fireEvent.dragOver(dropzone, { dataTransfer: { types: ["text/plain"] } }),
        ).toBe(true);
        expect(dropzone.className).not.toContain("bg-action-primary-subtle");
    });

    // QA-IU-3: while `disabled`, dragover and drop used not to be cancelled,
    // so the browser fell back to its default and navigated the tab to the
    // dropped file, discarding the form the component sits in.
    it("swallows a file dropped while disabled instead of letting the browser open it", async () => {
        const onfileselect = vi.fn();
        render(ImageUpload, { props: { disabled: true, onfileselect } });
        const dropzone = screen.getByRole("button", { name: /No image selected/ });
        const file = new File(["a"], "a.png", { type: "image/png" });
        const drop = { dataTransfer: { files: [file], types: ["Files"] } };

        // fireEvent returns false when a handler called preventDefault().
        expect(await fireEvent.dragOver(dropzone, drop)).toBe(false);
        expect(await fireEvent.drop(dropzone, drop)).toBe(false);
        expect(onfileselect).not.toHaveBeenCalled();
    });
});

describe("ImageUpload (QA): focus across the empty / filled swap", () => {
    // QA-IU-1: Remove unmounts the focused button; focus used to fall to
    // <body>, sending a keyboard user back to the top of the page. It lands
    // on the dropzone, which takes over the `id`.
    it("moves focus to the dropzone after Remove", async () => {
        const user = userEvent.setup();
        render(ImageUpload, { props: { label: "Logo", value: STORED } });

        screen.getByRole("button", { name: "Remove Logo" }).focus();
        await user.keyboard("{Enter}");

        await waitFor(() =>
            expect(document.activeElement).toBe(screen.getByRole("button", { name: "Logo" })),
        );
    });

    // Picking a file lost focus the same way; jsdom cannot show it (user.upload
    // focuses the hidden input), so that half is in playwright/qa-image-upload.spec.ts.
});
