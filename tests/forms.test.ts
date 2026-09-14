import { cleanup, render, screen, waitFor } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, onTestFinished, vi } from "vitest";

import ContactForm from "../src/components/molecules/ContactForm.svelte";
import ColorPicker from "../src/components/atoms/ColorPicker.svelte";
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
