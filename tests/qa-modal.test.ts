import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { createRawSnippet } from "svelte";
import { afterEach, describe, expect, it, vi } from "vitest";

import Modal from "../src/components/molecules/Modal.svelte";
import ModalCloseHarness from "./fixtures/ModalCloseHarness.svelte";

/**
 * QA review of ef61c42. Gaps the package's own tests leave open. The tests
 * marked DEFECT fail against the component as committed and are skipped so
 * the suite stays green; each names what has to change before it is enabled.
 */

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    document.body.innerHTML = "";
    document.body.removeAttribute("style");
    delete document.body.dataset.zabiScrollLock;
    delete document.body.dataset.zabiScrollLockOverflow;
});

const dialog = (name: string) => screen.getByRole("dialog", { name });
const paragraph = (text: string) =>
    createRawSnippet(() => ({ render: () => `<p>${text}</p>` }));

describe("Modal (QA): closing", () => {
    it("lets the parent close a non-dismissible modal, without an onclose", async () => {
        const user = userEvent.setup();
        const onclose = vi.fn();
        const onclick = vi.fn();
        render(ModalCloseHarness, { props: { initialOpen: true, onclose, onclick } });

        await user.click(screen.getByTestId("lock"));
        await user.keyboard("{Escape}");
        expect(screen.queryByRole("dialog")).toBeTruthy();

        await user.click(screen.getByTestId("close-from-parent"));
        await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
        expect(onclose).not.toHaveBeenCalled();
        // The deprecated close report stays silent too.
        expect(onclick).not.toHaveBeenCalled();
        expect(document.body.style.overflow).toBe("");
    });

    it("reports each close once, through onclose and the deprecated onclick alike", async () => {
        const user = userEvent.setup();
        const onclose = vi.fn();
        const onclick = vi.fn();
        render(ModalCloseHarness, { props: { portal: true, onclose, onclick } });

        for (const [reason, close] of [
            ["escape", () => user.keyboard("{Escape}")],
            ["close-button", () => user.click(screen.getByRole("button", { name: "Close" }))],
        ] as const) {
            await user.click(screen.getByTestId("open-modal"));
            await waitFor(() => expect(screen.queryByRole("dialog")).toBeTruthy());
            await close();
            await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
            expect(onclose).toHaveBeenCalledTimes(1);
            expect(onclose).toHaveBeenCalledWith({ reason });
            expect(onclick).toHaveBeenCalledTimes(1);
            onclose.mockClear();
            onclick.mockClear();
        }
        // Nothing of the portalled overlay is left behind.
        expect(document.body.querySelector('[role="presentation"]')).toBeNull();
    });

    it("still hands Escape to the consumer's onkeydown when not dismissible", async () => {
        const onkeydown = vi.fn();
        render(Modal, {
            props: { isOpen: true, dismissible: false, title: "Pending", onkeydown },
        });

        await fireEvent.keyDown(dialog("Pending"), { key: "Escape" });
        expect(onkeydown).toHaveBeenCalledOnce();
        expect(screen.queryByRole("dialog")).toBeTruthy();
    });
});

describe("Modal (QA): stacking and focus", () => {
    // DEFECT (QA-M-1): every overlay has the same z-index, so paint order is
    // DOM order. A portalled modal sits at the end of <body>; an in-place
    // modal opened after it (a confirm declared in the page, say) is earlier
    // in the document, so it opens *behind* the first one while holding the
    // focus trap. The later modal must end up on top: by order, or by a
    // z-index that grows with the number of open overlays.
    it.skip("puts a modal opened later on top of a portalled one", async () => {
        const later = render(Modal, { props: { isOpen: false, title: "Confirm" } });
        render(Modal, { props: { isOpen: true, portal: true, title: "Editor" } });
        await later.rerender({ isOpen: true });

        const first = dialog("Editor").parentElement as HTMLElement;
        const second = dialog("Confirm").parentElement as HTMLElement;
        const follows =
            (first.compareDocumentPosition(second) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0;
        const zIndex = (overlay: HTMLElement) => Number(overlay.style.zIndex || 0);
        expect(follows || zIndex(second) > zIndex(first)).toBe(true);
    });

    // DEFECT (QA-M-2, older than ef61c42): with nothing focusable inside,
    // focus stays on the opener behind the backdrop, so a screen reader is
    // never moved into the dialog. The panel has tabindex="-1" for exactly
    // this; it should take focus when there is no focusable child.
    it.skip("moves focus into a dialog that has no focusable content", async () => {
        const opener = document.createElement("button");
        document.body.append(opener);
        opener.focus();

        render(Modal, {
            props: { isOpen: true, showClose: false, children: paragraph("Saving…") },
        });

        await waitFor(() =>
            expect(screen.getByRole("dialog").contains(document.activeElement)).toBe(true),
        );
    });
});
