import { cleanup, render, screen, waitFor, within } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";
import { afterEach, beforeAll, describe, expect, it } from "vitest";

import Checkbox from "../src/components/atoms/Checkbox.svelte";
import Radio from "../src/components/atoms/Radio.svelte";
import AppBar from "../src/components/molecules/AppBar.svelte";
import ConfirmDialog from "../src/components/molecules/ConfirmDialog.svelte";
import Modal from "../src/components/molecules/Modal.svelte";
import PhotoViewer from "../src/components/molecules/PhotoViewer.svelte";
import Toaster from "../src/components/molecules/Toaster.svelte";
import { pushToast, toastStore } from "../src/components/molecules/toast-store";

/**
 * Z-157: a person's name in a string prop could not be marked
 * `translate="no"`, so it took the page's hyphenation and a translator could
 * change it. Each place that draws such a string takes a snippet of its own
 * beside it, drawn in the string's place.
 */

const name = (text: string) => createRawSnippet(() => ({ render: () => `<bdi translate="no">${text}</bdi>` }));

beforeAll(() => {
    // jsdom has no Web Animations API; a toast's transition needs a minimal stub.
    if (!Element.prototype.animate) {
        Element.prototype.animate = function () {
            const animation = {
                onfinish: null as null | (() => void),
                cancel() {},
                finish() {},
                currentTime: 0,
                effect: { getComputedTiming: () => ({ progress: 1 }) },
            };
            queueMicrotask(() => animation.onfinish?.());
            return animation as unknown as Animation;
        };
    }
});

afterEach(() => {
    toastStore.clear();
    cleanup();
});

describe("labelContent", () => {
    it("draws a Checkbox's label from the snippet, and the box is still named by it", () => {
        render(Checkbox, { props: { label: "Ada Lovelace", labelContent: name("Ada Lovelace") } });
        const box = screen.getByRole("checkbox", { name: "Ada Lovelace" });
        expect(box.closest("label")!.querySelector('bdi[translate="no"]')!.textContent).toBe("Ada Lovelace");
    });

    it("draws a Radio's label from the snippet, with a description too", () => {
        render(Radio, { props: { label: "Grace", labelContent: name("Grace"), description: "Admin" } });
        const radio = screen.getByRole("radio", { name: "Grace" });
        expect(radio.closest("label")!.querySelector('bdi[translate="no"]')).not.toBeNull();
    });

    it("is drawn with no label string as well", () => {
        render(Checkbox, { props: { labelContent: name("Alan") } });
        expect(screen.getByRole("checkbox", { name: "Alan" })).toBeTruthy();
    });
});

describe("titleContent", () => {
    it("draws an AppBar's heading from the snippet", () => {
        render(AppBar, { props: { title: "Ada Lovelace", titleContent: name("Ada Lovelace") } });
        const heading = screen.getByRole("heading", { name: "Ada Lovelace" });
        expect(heading.querySelector('bdi[translate="no"]')).not.toBeNull();
    });

    it("draws it in both of a large title's rows", () => {
        const { container } = render(AppBar, { props: { title: "Ada", titleContent: name("Ada"), largeTitle: true } });
        expect(container.querySelectorAll('bdi[translate="no"]')).toHaveLength(2);
        expect(screen.getByRole("heading", { name: "Ada" }).querySelector("bdi")).not.toBeNull();
    });

    it("names a Modal by the snippet", () => {
        render(Modal, { props: { isOpen: true, portal: false, titleContent: name("Ada") } });
        const dialog = screen.getByRole("dialog", { name: "Ada" });
        expect(within(dialog).getByRole("heading").querySelector("bdi")).not.toBeNull();
    });

    it("draws a ConfirmDialog's title and message from the snippets, still its name and description", () => {
        render(ConfirmDialog, {
            props: {
                open: true,
                portal: false,
                title: "Remove Ada?",
                titleContent: name("Remove Ada?"),
                message: "Ada leaves the group.",
                messageContent: name("Ada leaves the group."),
            },
        });
        const dialog = screen.getByRole("alertdialog", { name: "Remove Ada?" });
        const described = document.getElementById(dialog.getAttribute("aria-describedby")!)!;
        expect(described.textContent!.trim()).toBe("Ada leaves the group.");
        expect(described.querySelector('bdi[translate="no"]')).not.toBeNull();
    });
});

describe("creditContent", () => {
    it("draws a photo's credit from the snippet", () => {
        render(PhotoViewer, {
            props: {
                isOpen: true,
                portal: false,
                photos: [{ src: "/1.jpg", alt: "The bar", width: 4, height: 3, credit: "Foto: Ada", creditContent: name("Foto: Ada") }],
            },
        });
        const credit = document.querySelector("[data-photo-viewer-credit]")!;
        expect(credit.textContent!.trim()).toBe("Foto: Ada");
        expect(credit.querySelector('bdi[translate="no"]')).not.toBeNull();
    });
});

describe("messageContent", () => {
    it("draws a toast's message from the snippet, alone and under a title", async () => {
        render(Toaster);
        pushToast({ message: "Ada is admin now.", messageContent: name("Ada is admin now."), type: "success" });
        pushToast({ title: "Removed", message: "Grace left.", messageContent: name("Grace left."), type: "info" });
        await waitFor(() => expect(document.querySelectorAll('[data-toast-message] bdi[translate="no"]')).toHaveLength(2));
        const texts = [...document.querySelectorAll("[data-toast-message]")].map((p) => p.textContent!.trim());
        expect(texts).toEqual(["Ada is admin now.", "Grace left."]);
    });
});
