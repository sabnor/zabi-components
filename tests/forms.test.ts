import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { createRawSnippet } from "svelte";
import { afterEach, describe, expect, it, onTestFinished, vi } from "vitest";

import ContactForm from "../src/components/molecules/ContactForm.svelte";
import ColorPicker from "../src/components/atoms/ColorPicker.svelte";
import ImageUpload from "../src/components/molecules/ImageUpload.svelte";
import ImageUploadHarness from "./fixtures/ImageUploadHarness.svelte";

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

describe("ContactForm", () => {
    it("prevents native submission when validation fails and keeps errors visible", async () => {
        const user = userEvent.setup();
        const onsubmit = vi.fn();
        let defaultPrevented: boolean | undefined;
        const listener = (event: Event) => {
            defaultPrevented = event.defaultPrevented;
            // Keep jsdom from attempting navigation if the component failed to block it.
            event.preventDefault();
        };
        document.addEventListener("submit", listener);

        try {
            render(ContactForm, { props: { onsubmit } });
            await user.click(screen.getByRole("button", { name: "Send Message" }));

            expect(defaultPrevented).toBe(true);
            expect(onsubmit).not.toHaveBeenCalled();
            expect(screen.getByText("Please enter your name.")).toBeTruthy();
            expect(screen.getByText("Please enter your email address.")).toBeTruthy();
        } finally {
            document.removeEventListener("submit", listener);
        }
    });

    it("calls onsubmit when the form is valid", async () => {
        const user = userEvent.setup();
        const onsubmit = vi.fn((event: SubmitEvent) => event.preventDefault());

        render(ContactForm, { props: { onsubmit } });
        await user.type(screen.getByLabelText("Name"), "Ada");
        await user.type(screen.getByLabelText("Email"), "ada@example.com");
        await user.type(screen.getByLabelText("Message"), "Hello");
        await user.click(screen.getByRole("button", { name: "Send Message" }));

        expect(onsubmit).toHaveBeenCalledOnce();
    });
});

describe("ImageUpload", () => {
    it("hands the selected file and preview url to the consumer", async () => {
        const user = userEvent.setup();
        // jsdom lacks object URLs; install stubs for this test only.
        const createObjectURL = vi.fn(() => "blob:preview-1");
        const revokeObjectURL = vi.fn();
        const urlStatics = URL as unknown as Record<string, unknown>;
        urlStatics.createObjectURL = createObjectURL;
        urlStatics.revokeObjectURL = revokeObjectURL;
        onTestFinished(() => {
            delete urlStatics.createObjectURL;
            delete urlStatics.revokeObjectURL;
        });

        const onfileselect = vi.fn();
        render(ImageUploadHarness, { props: { onfileselect } });

        const file = new File(["img"], "photo.png", { type: "image/png" });
        await user.upload(screen.getByTestId("image-upload-input") as HTMLInputElement, file);

        expect(onfileselect).toHaveBeenCalledWith({ file, url: "blob:preview-1" });
        await waitFor(() =>
            expect(screen.getByTestId("bound-value").textContent).toBe("blob:preview-1"),
        );

        await user.click(screen.getByRole("button", { name: "Remove" }));
        expect(onfileselect).toHaveBeenLastCalledWith({ file: null, url: null });
        expect(revokeObjectURL).toHaveBeenCalledWith("blob:preview-1");
        await waitFor(() => expect(screen.getByTestId("bound-value").textContent).toBe(""));
    });

    it("opens the file chooser with Space on the drop zone", async () => {
        const user = userEvent.setup();
        render(ImageUploadHarness);

        const input = screen.getByTestId("image-upload-input") as HTMLInputElement;
        const clickSpy = vi.spyOn(input, "click");

        screen.getByRole("button", { name: /No image selected/ }).focus();
        await user.keyboard(" ");

        expect(clickSpy).toHaveBeenCalled();
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
    const dropOf = (file: File) => ({
        dataTransfer: { files: [file], types: ["Files"] },
    });

    it("calls onbrowse instead of opening the native chooser", async () => {
        const user = userEvent.setup();
        const onbrowse = vi.fn();
        const onclick = vi.fn();
        const { rerender } = render(ImageUpload, { props: { onbrowse, onclick } });
        const clickSpy = vi.spyOn(fileInput(), "click");

        await user.click(screen.getByRole("button", { name: /No image selected/ }));
        expect(onclick).toHaveBeenCalledOnce();
        expect(onbrowse).toHaveBeenCalledOnce();

        // Change goes through the same path once there is a value.
        await rerender({ value: "https://cdn.example.com/logo.png" });
        await user.click(screen.getByRole("button", { name: "Change" }));
        expect(onbrowse).toHaveBeenCalledTimes(2);
        expect(clickSpy).not.toHaveBeenCalled();
    });

    it("keeps the native chooser closed when onclick prevents the default", async () => {
        const user = userEvent.setup();
        const onbrowse = vi.fn();
        render(ImageUpload, {
            props: { onbrowse, onclick: (event: Event) => event.preventDefault() },
        });
        const clickSpy = vi.spyOn(fileInput(), "click");

        await user.click(screen.getByRole("button", { name: /No image selected/ }));

        expect(clickSpy).not.toHaveBeenCalled();
        expect(onbrowse).not.toHaveBeenCalled();
    });

    it("renders a video, without autoplay, for a stored video url", () => {
        const { container } = render(ImageUpload, {
            props: { value: "https://cdn.example.com/media/intro.MP4?v=3#t=1" },
        });

        const video = container.querySelector("video");
        expect(video?.getAttribute("src")).toBe(
            "https://cdn.example.com/media/intro.MP4?v=3#t=1",
        );
        expect(container.querySelector("img")).toBeNull();
        // Nothing moves until the viewer presses play, reduced motion or not.
        expect(video?.hasAttribute("autoplay")).toBe(false);
        expect(video?.hasAttribute("controls")).toBe(true);
    });

    it("keeps an image for a video-looking query string and honours previewType", async () => {
        const { container, rerender } = render(ImageUpload, {
            props: { value: "https://cdn.example.com/thumb.png?source=clip.mp4" },
        });
        expect(container.querySelector("img")).toBeTruthy();
        expect(container.querySelector("video")).toBeNull();

        await rerender({ value: "https://cdn.example.com/media/8f2c", previewType: "video" });
        expect(container.querySelector("video")).toBeTruthy();
    });

    it("previews a picked video from its MIME type", async () => {
        const user = userEvent.setup();
        stubObjectUrls("blob:clip-1");
        const { container } = render(ImageUpload, { props: { accept: "image/*,video/*" } });

        await user.upload(fileInput(), new File(["v"], "clip", { type: "video/mp4" }));

        await waitFor(() =>
            expect(container.querySelector("video")?.getAttribute("src")).toBe("blob:clip-1"),
        );
    });

    it("renders the preview snippet in place of the built-in preview", () => {
        const preview = createRawSnippet<[{ url: string; type: string; alt: string }]>(
            (detail) => ({
                render: () =>
                    `<span data-testid="custom-preview">${detail().type}:${detail().url}</span>`,
            }),
        );
        const { container } = render(ImageUpload, {
            props: { value: "https://cdn.example.com/intro.webm", preview },
        });

        expect(screen.getByTestId("custom-preview").textContent).toBe(
            "video:https://cdn.example.com/intro.webm",
        );
        expect(container.querySelector("video, img")).toBeNull();
        expect(screen.getByRole("button", { name: "Remove" })).toBeTruthy();
    });

    it("uses a native button that the label names and opens", async () => {
        const user = userEvent.setup();
        render(ImageUpload, { props: { label: "Logo", id: "site-logo" } });
        const clickSpy = vi.spyOn(fileInput(), "click");

        const dropzone = screen.getByLabelText("Logo");
        expect(dropzone.tagName).toBe("BUTTON");
        expect(dropzone.getAttribute("type")).toBe("button");
        expect(dropzone.id).toBe("site-logo");
        expect(dropzone.className).toContain("focus-ring");
        // Nothing interactive may sit inside a button.
        expect(dropzone.querySelector("button, a, input, [tabindex]")).toBeNull();

        await user.click(screen.getByText("Logo"));
        expect(clickSpy).toHaveBeenCalledOnce();
    });

    it("reaches the dropzone, Change and Remove by keyboard", async () => {
        const user = userEvent.setup();
        const onbrowse = vi.fn();
        const { rerender } = render(ImageUpload, { props: { onbrowse } });

        await user.tab();
        expect(document.activeElement).toBe(
            screen.getByRole("button", { name: /No image selected/ }),
        );
        await user.keyboard("{Enter}");
        expect(onbrowse).toHaveBeenCalledOnce();

        // The focused dropzone is unmounted by the swap; focus must follow
        // the control rather than fall to <body>.
        await rerender({ value: "https://cdn.example.com/logo.png" });
        await waitFor(() =>
            expect(document.activeElement).toBe(screen.getByRole("button", { name: "Change" })),
        );
        await user.tab();
        expect(document.activeElement).toBe(screen.getByRole("button", { name: "Remove" }));

        await user.keyboard("{Enter}");
        await waitFor(() =>
            expect(document.activeElement).toBe(
                screen.getByRole("button", { name: /No image selected/ }),
            ),
        );
    });

    it("leaves focus alone when the value changes while focus is elsewhere", async () => {
        const outside = document.createElement("button");
        document.body.append(outside);
        onTestFinished(() => outside.remove());
        const { rerender } = render(ImageUpload, { props: { label: "Logo" } });

        outside.focus();
        await rerender({ value: "https://cdn.example.com/logo.png" });
        await screen.findByRole("button", { name: "Change Logo" });
        expect(document.activeElement).toBe(outside);

        // Nothing focused and no interaction with the control: stay on <body>.
        outside.blur();
        await rerender({ value: null });
        await screen.findByRole("button", { name: "Logo" });
        expect(document.activeElement).toBe(document.body);
    });

    it("announces a selection and a removal politely, with replaceable text", async () => {
        const user = userEvent.setup();
        stubObjectUrls();
        const { rerender } = render(ImageUpload, { props: { label: "Logo" } });
        const status = screen.getByRole("status");
        expect(status.getAttribute("aria-live")).toBe("polite");
        expect(status.textContent?.trim()).toBe("");

        await user.upload(fileInput(), new File(["img"], "photo.png", { type: "image/png" }));
        await waitFor(() => expect(status.textContent?.trim()).toBe("Image selected"));

        await user.click(screen.getByRole("button", { name: "Remove Logo" }));
        await waitFor(() => expect(status.textContent?.trim()).toBe("Image removed"));

        await rerender({ selectedText: "Bild vald", value: "https://cdn.example.com/logo.png" });
        await waitFor(() => expect(status.textContent?.trim()).toBe("Bild vald"));
        // A second selection in a row still changes the live region.
        const first = status.textContent;
        await rerender({ value: "https://cdn.example.com/other.png" });
        await waitFor(() => expect(status.textContent).not.toBe(first));
        expect(status.textContent?.trim()).toBe("Bild vald");
    });

    it("names Change and Remove after the label and passes alt to the image", () => {
        const { container } = render(ImageUpload, {
            props: {
                label: "Logo",
                alt: "Acme wordmark",
                value: "https://cdn.example.com/logo.png",
            },
        });

        expect(screen.getByRole("button", { name: "Change Logo" }).textContent?.trim()).toBe(
            "Change",
        );
        expect(screen.getByRole("button", { name: "Remove Logo" })).toBeTruthy();
        expect(container.querySelector("img")?.getAttribute("alt")).toBe("Acme wordmark");
        expect(screen.getByRole("group", { name: "Logo" })).toBeTruthy();
    });

    it("keeps today's names and empty alt without a label", () => {
        const { container } = render(ImageUpload, {
            props: { value: "https://cdn.example.com/logo.png" },
        });

        expect(screen.getByRole("button", { name: "Change" })).toBeTruthy();
        expect(screen.getByRole("button", { name: "Remove" })).toBeTruthy();
        expect(container.querySelector("img")?.getAttribute("alt")).toBe("");
        expect(container.querySelector("label")).toBeNull();
    });

    it("keeps the actions visible where hover is unavailable", () => {
        render(ImageUpload, { props: { value: "https://cdn.example.com/logo.png" } });

        // jsdom evaluates no media queries; the generated CSS is checked by hand.
        const classes = screen.getByTestId("image-upload-actions").className.split(/\s+/);
        expect(classes).toContain("opacity-0");
        expect(classes).toContain("group-hover:opacity-100");
        expect(classes).toContain("group-has-[:focus-visible]:opacity-100");
        expect(classes).toContain("pointer-coarse:opacity-100");
        expect(classes).toContain("[@media(hover:none)]:opacity-100");
        // An image keeps the full overlay with a fine pointer and drops to a strip on touch.
        expect(classes).not.toContain("bottom-auto");
        expect(classes).toContain("pointer-coarse:bottom-auto");
    });

    it("lets the pointer through the actions layer, except on the buttons", () => {
        render(ImageUpload, { props: { value: "https://cdn.example.com/logo.png" } });

        const layer = screen.getByTestId("image-upload-actions");
        expect(layer.className.split(/\s+/)).toContain("pointer-events-none");
        const plate = screen.getByRole("button", { name: "Change" }).parentElement as HTMLElement;
        expect(plate.className.split(/\s+/)).toContain("pointer-events-auto");
        // Opaque, so the labels do not depend on the image for contrast.
        expect(plate.className.split(/\s+/)).toContain("bg-surface-overlay");
    });

    it("puts the actions in a strip for any video, and wherever actionsPlacement says", async () => {
        const preview = createRawSnippet(() => ({
            render: () => `<video data-testid="custom-video"></video>`,
        }));
        const strip = () =>
            screen.getByTestId("image-upload-actions").className.split(/\s+/).includes("bottom-auto");
        const { rerender } = render(ImageUpload, {
            props: { value: "https://cdn.example.com/intro.mp4", preview },
        });
        // A snippet's video has controls to keep clear too.
        expect(strip()).toBe(true);

        await rerender({ actionsPlacement: "overlay" });
        expect(strip()).toBe(false);

        await rerender({
            value: "https://cdn.example.com/logo.png",
            preview: undefined,
            actionsPlacement: undefined,
        });
        expect(strip()).toBe(false);
        await rerender({ actionsPlacement: "strip" });
        expect(strip()).toBe(true);
    });

    it("ties the error to the control in both states", async () => {
        const { rerender } = render(ImageUpload, {
            props: { label: "Logo", errorMessage: "Too large." },
        });
        const describes = (element: HTMLElement) =>
            (element.getAttribute("aria-describedby") ?? "").split(" ");
        const alert = screen.getByRole("alert");

        expect(describes(screen.getByRole("button", { name: "Logo" }))).toContain(alert.id);
        await rerender({ value: "https://cdn.example.com/logo.png" });
        expect(describes(screen.getByRole("button", { name: "Change Logo" }))).toContain(alert.id);

        await rerender({ errorMessage: "" });
        expect(
            screen.getByRole("button", { name: "Change Logo" }).hasAttribute("aria-describedby"),
        ).toBe(false);
    });

    it("lets the actions wrap and truncate in a narrow container", () => {
        render(ImageUpload, { props: { value: "https://cdn.example.com/logo.png" } });

        // jsdom has no layout; playwright/qa-image-upload.spec.ts measures the boxes.
        const change = screen.getByRole("button", { name: "Change" });
        expect((change.parentElement as HTMLElement).className.split(/\s+/)).toEqual(
            expect.arrayContaining(["flex-wrap", "min-w-0"]),
        );
        expect(change.className.split(/\s+/)).toContain("min-w-0");
        expect(change.querySelector(".truncate")?.textContent).toBe("Change");
    });

    it("has no minimum width", async () => {
        // `min-w-0` lets the actions shrink and is not a minimum; any other
        // `min-w-*` is. The rendered widths are measured in
        // playwright/qa-image-upload.spec.ts.
        const minimum = /\bmin-w-(?!0\b)/;
        const { container, rerender } = render(ImageUpload);
        expect(container.innerHTML).not.toMatch(minimum);

        await rerender({ value: "https://cdn.example.com/logo.png" });
        expect(container.innerHTML).not.toMatch(minimum);
    });

    it("takes the error title and recovery line as props", async () => {
        const { rerender } = render(ImageUpload, { props: { errorMessage: "Too large." } });
        const alert = screen.getByRole("alert");
        expect(alert.textContent).toContain("Image upload failed");
        expect(alert.textContent).toContain(
            "Recovery action: try another file or retry upload.",
        );

        await rerender({
            errorMessage: "Too large.",
            errorTitle: "Uppladdningen misslyckades",
            errorRecovery: false,
        });
        expect(alert.textContent).toContain("Uppladdningen misslyckades");
        expect(alert.textContent).not.toContain("Image upload failed");
        expect(alert.textContent).not.toContain("Recovery action");
        expect(alert.querySelectorAll("p").length).toBe(2);
    });

    it("lets every built-in string be replaced", async () => {
        const { rerender } = render(ImageUpload, {
            props: { browseText: "Klicka för att välja en fil" },
        });
        expect(screen.getByText("Klicka för att välja en fil")).toBeTruthy();
        expect(screen.queryByText("Click to choose a file")).toBeNull();

        await rerender({
            value: "https://cdn.example.com/logo.png",
            label: "Logotyp",
            changeText: "Byt",
            removeText: "Ta bort",
            changeLabel: "Byt logotyp",
        });
        expect(screen.getByRole("button", { name: "Byt logotyp" }).textContent?.trim()).toBe(
            "Byt",
        );
        expect(screen.getByRole("button", { name: "Ta bort Logotyp" })).toBeTruthy();
    });

    it("accepts a dropped file on the dropzone and on the preview", async () => {
        const { createObjectURL, revokeObjectURL } = stubObjectUrls();
        createObjectURL.mockReturnValueOnce("blob:first").mockReturnValueOnce("blob:second");
        const onfileselect = vi.fn();
        const { container } = render(ImageUpload, { props: { onfileselect } });

        const dropzone = screen.getByRole("button", { name: /No image selected/ });
        await fireEvent.dragEnter(dropzone, { dataTransfer: { types: ["Files"] } });
        expect(dropzone.className).toContain("border-action-primary");
        expect(dropzone.className).toContain("bg-action-primary-subtle");

        const first = new File(["a"], "a.png", { type: "image/png" });
        await fireEvent.drop(dropzone, dropOf(first));
        expect(onfileselect).toHaveBeenLastCalledWith({ file: first, url: "blob:first" });
        await waitFor(() =>
            expect(container.querySelector("img")?.getAttribute("src")).toBe("blob:first"),
        );

        const second = new File(["b"], "b.png", { type: "image/png" });
        await fireEvent.drop(container.querySelector("img") as HTMLElement, dropOf(second));
        expect(onfileselect).toHaveBeenLastCalledWith({ file: second, url: "blob:second" });
        // Replacing a preview releases the object URL it replaces.
        expect(revokeObjectURL).toHaveBeenCalledWith("blob:first");
    });

    it("ignores a drop that accept rules out or that lands while disabled", async () => {
        stubObjectUrls();
        const onfileselect = vi.fn();
        const onfilereject = vi.fn();
        const { rerender } = render(ImageUpload, {
            props: { accept: "image/png,.webp", onfileselect, onfilereject },
        });
        const dropzone = () => screen.getByRole("button", { name: /No image selected/ });

        const pdf = new File(["p"], "notes.pdf", { type: "application/pdf" });
        await fireEvent.drop(dropzone(), dropOf(pdf));
        expect(onfileselect).not.toHaveBeenCalled();
        expect(onfilereject).toHaveBeenCalledWith(pdf);

        await rerender({ disabled: true });
        await fireEvent.dragEnter(dropzone(), { dataTransfer: { types: ["Files"] } });
        expect(dropzone().className).not.toContain("bg-action-primary-subtle");
        // The primary border on hover is for a dropzone that can be used.
        expect(dropzone().className.split(/\s+/)).not.toContain("hover:border-action-primary");
        // fireEvent returns false when a handler cancelled the event: the drop
        // is swallowed, not left for the browser to open the file.
        const disabledDrop = dropOf(new File(["a"], "a.png", { type: "image/png" }));
        const over = { dataTransfer: { ...disabledDrop.dataTransfer, dropEffect: "copy" } };
        expect(await fireEvent.dragOver(dropzone(), over)).toBe(false);
        expect(await fireEvent.drop(dropzone(), disabledDrop)).toBe(false);
        expect(onfileselect).not.toHaveBeenCalled();

        await rerender({ disabled: false });
        const webp = new File(["w"], "photo.WEBP", { type: "" });
        await fireEvent.drop(dropzone(), dropOf(webp));
        expect(onfileselect).toHaveBeenCalledWith({ file: webp, url: "blob:preview-1" });
    });

    it("revokes the object url when the component is destroyed", async () => {
        const user = userEvent.setup();
        const { revokeObjectURL } = stubObjectUrls("blob:gone");
        const { unmount } = render(ImageUpload);

        await user.upload(fileInput(), new File(["img"], "photo.png", { type: "image/png" }));
        expect(revokeObjectURL).not.toHaveBeenCalled();

        unmount();
        expect(revokeObjectURL).toHaveBeenCalledWith("blob:gone");
    });
});

describe("ColorPicker", () => {
    it("parses 3-digit hex into the correct hue", async () => {
        const user = userEvent.setup();
        // jsdom has no canvas; keep the draw loop a no-op.
        vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);

        render(ColorPicker, { props: { value: "#0f0" } });
        await user.click(screen.getByRole("button", { name: "Open color picker" }));

        const hue = (await screen.findByLabelText("Hue slider")) as HTMLInputElement;
        expect(hue.value).toBe("120");
    });
});
