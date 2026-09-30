import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

import Alert from "../src/components/molecules/Alert.svelte";
import SlideUp from "../src/components/molecules/SlideUp.svelte";
import Toaster from "../src/components/molecules/Toaster.svelte";
import { pushToast, toastStore } from "../src/components/molecules/toast-store.js";
import ModalCloseHarness from "./fixtures/ModalCloseHarness.svelte";
import ModalHarness from "./fixtures/ModalHarness.svelte";
import ModalDynamicHarness from "./fixtures/ModalDynamicHarness.svelte";
import NestedModalHarness from "./fixtures/NestedModalHarness.svelte";
import NavMenuHarness from "./fixtures/NavMenuHarness.svelte";
import TooltipOutsideHarness from "./fixtures/TooltipOutsideHarness.svelte";

const LIVE_REGION = '[aria-live], [role="status"], [role="alert"], [role="log"]';

beforeAll(() => {
    // jsdom has no Web Animations API; Svelte transitions need a minimal stub.
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
    cleanup();
    toastStore.clear();
    vi.restoreAllMocks();
    vi.useRealTimers();
    document.body.style.overflow = "";
});

describe("Modal semantics", () => {
    it("puts role=dialog on the panel, not the backdrop", async () => {
        const user = userEvent.setup();
        render(ModalHarness);
        await user.click(screen.getByTestId("open-modal"));

        const dialog = await screen.findByRole("dialog", { name: "Test dialog" });
        expect(dialog.getAttribute("aria-modal")).toBe("true");
        expect(dialog.contains(screen.getByTestId("modal-action"))).toBe(true);
        expect(dialog.parentElement?.getAttribute("role")).toBe("presentation");
    });

    it("locks body scroll while open and restores it on close", async () => {
        const user = userEvent.setup();
        document.body.style.overflow = "auto";
        render(ModalHarness);

        await user.click(screen.getByTestId("open-modal"));
        const dialog = await screen.findByRole("dialog");
        expect(document.body.style.overflow).toBe("hidden");

        await fireEvent.keyDown(dialog, { key: "Escape" });
        await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
        expect(document.body.style.overflow).toBe("auto");
    });

    it("keeps the scroll lock until the last nested modal closes", async () => {
        const user = userEvent.setup();
        render(NestedModalHarness);

        await user.click(screen.getByTestId("open-outer"));
        await fireEvent.click(await screen.findByTestId("open-inner"));
        await screen.findByRole("dialog", { name: "Inner" });

        await user.click(screen.getByTestId("close-inner"));
        await waitFor(() =>
            expect(screen.queryByRole("dialog", { name: "Inner" })).toBeNull(),
        );
        expect(document.body.style.overflow).toBe("hidden");

        await user.click(screen.getByTestId("close-outer"));
        await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
        expect(document.body.style.overflow).toBe("");
    });

    it("Escape in a nested modal closes only the inner one", async () => {
        const user = userEvent.setup();
        render(NestedModalHarness);

        await user.click(screen.getByTestId("open-outer"));
        await fireEvent.click(await screen.findByTestId("open-inner"));
        const inner = await screen.findByRole("dialog", { name: "Inner" });

        await fireEvent.keyDown(inner, { key: "Escape" });
        await waitFor(() =>
            expect(screen.queryByRole("dialog", { name: "Inner" })).toBeNull(),
        );
        expect(screen.getByRole("dialog", { name: "Outer" })).toBeTruthy();
    });

    it("renders a close button without a title", async () => {
        const user = userEvent.setup();
        render(ModalDynamicHarness);
        await user.click(screen.getByTestId("open-dynamic"));

        const dialog = await screen.findByTestId("dynamic-modal");
        expect(dialog.getAttribute("role")).toBe("dialog");
        await user.click(screen.getByRole("button", { name: "Close" }));
        await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    });

    it("includes content rendered after open in the Tab trap", async () => {
        const user = userEvent.setup();
        render(ModalDynamicHarness);
        await user.click(screen.getByTestId("open-dynamic"));
        await screen.findByRole("dialog");

        const add = screen.getByTestId("add-late");
        await user.click(add);
        const late = await screen.findByTestId("late-button");

        add.focus();
        await user.tab();
        expect(document.activeElement).toBe(late);

        await user.tab();
        expect(document.activeElement).toBe(
            screen.getByRole("button", { name: "Close" }),
        );
    });
});

describe("Modal closing", () => {
    it.each([
        ["escape", (dialog: HTMLElement) => fireEvent.keyDown(dialog, { key: "Escape" })],
        ["backdrop", (dialog: HTMLElement) => fireEvent.click(dialog.parentElement!)],
        [
            "close-button",
            () => fireEvent.click(screen.getByRole("button", { name: "Close" })),
        ],
    ] as const)("reports %s through onclose and still calls onclick", async (reason, close) => {
        const user = userEvent.setup();
        const onclose = vi.fn();
        const onclick = vi.fn();
        render(ModalCloseHarness, { onclose, onclick });
        await user.click(screen.getByTestId("open-modal"));
        const dialog = await screen.findByRole("dialog");

        await close(dialog);
        await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
        expect(onclose).toHaveBeenCalledTimes(1);
        expect(onclose).toHaveBeenCalledWith({ reason });
        // Backwards compatible: the event still reaches `onclick`.
        expect(onclick).toHaveBeenCalledTimes(1);
        expect(onclick.mock.calls[0][0]).toBeInstanceOf(Event);
    });

    it("does not fire onclose for a click inside the panel or a close by the parent", async () => {
        const user = userEvent.setup();
        const onclose = vi.fn();
        render(ModalCloseHarness, { onclose });
        await user.click(screen.getByTestId("open-modal"));
        await screen.findByRole("dialog");

        await user.click(screen.getByTestId("modal-action"));
        expect(screen.getByRole("dialog")).toBeTruthy();
        await user.click(screen.getByTestId("close-from-parent"));
        await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
        expect(onclose).not.toHaveBeenCalled();
    });

    it("ignores Escape, the backdrop and the close button when not dismissible", async () => {
        const user = userEvent.setup();
        const onclose = vi.fn();
        const onclick = vi.fn();
        render(ModalCloseHarness, { dismissible: false, onclose, onclick });
        await user.click(screen.getByTestId("open-modal"));
        const dialog = await screen.findByRole("dialog");

        await fireEvent.keyDown(dialog, { key: "Escape" });
        await fireEvent.click(dialog.parentElement!);
        const close = screen.getByRole("button", { name: "Close" });
        await user.click(close);

        expect(screen.getByRole("dialog")).toBeTruthy();
        expect(onclose).not.toHaveBeenCalled();
        expect(onclick).not.toHaveBeenCalled();
        expect(document.body.style.overflow).toBe("hidden");

        // The parent still owns `isOpen`.
        await user.click(screen.getByTestId("close-from-parent"));
        await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    });

    it("keeps the close button focusable and the Tab trap closed when not dismissible", async () => {
        const user = userEvent.setup();
        render(ModalCloseHarness);
        await user.click(screen.getByTestId("open-modal"));
        await screen.findByRole("dialog");
        const close = screen.getByRole("button", { name: "Close" });
        expect(close.hasAttribute("aria-disabled")).toBe(false);

        // Turns non-dismissible while open, as a confirm does when it starts loading.
        close.focus();
        await fireEvent.click(screen.getByTestId("lock"));
        expect(close.getAttribute("aria-disabled")).toBe("true");
        expect((close as HTMLButtonElement).disabled).toBe(false);
        expect(document.activeElement).toBe(close);

        await user.tab({ shift: true });
        expect(document.activeElement).toBe(screen.getByTestId("close-from-parent"));
        await user.tab();
        expect(document.activeElement).toBe(close);
    });

    it("takes Tab and Escape back when focus has fallen out of the dialog", async () => {
        const user = userEvent.setup();
        const onclose = vi.fn();
        render(ModalCloseHarness, { onclose });
        const opener = screen.getByTestId("open-modal");
        await user.click(opener);
        const dialog = await screen.findByRole("dialog");
        await waitFor(() => expect(dialog.contains(document.activeElement)).toBe(true));

        // What a browser does when the focused button is disabled or removed.
        (document.activeElement as HTMLElement).blur();
        expect(document.activeElement).toBe(document.body);
        await user.tab();
        expect(document.activeElement).toBe(screen.getByRole("button", { name: "Close" }));

        (document.activeElement as HTMLElement).blur();
        await user.keyboard("{Escape}");
        await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
        expect(onclose).toHaveBeenCalledTimes(1);
        expect(onclose).toHaveBeenCalledWith({ reason: "escape" });
        expect(document.activeElement).toBe(opener);
    });

    it("pulls stray focus into the innermost modal only", async () => {
        const user = userEvent.setup();
        render(ModalCloseHarness, { nested: true });
        await user.click(screen.getByTestId("open-modal"));
        await fireEvent.click(await screen.findByTestId("open-inner"));
        const inner = await screen.findByRole("dialog", { name: "Inner dialog" });
        await waitFor(() => expect(inner.contains(document.activeElement)).toBe(true));

        (document.activeElement as HTMLElement).blur();
        await user.tab();
        expect(inner.contains(document.activeElement)).toBe(true);

        (document.activeElement as HTMLElement).blur();
        await user.keyboard("{Escape}");
        await waitFor(() =>
            expect(screen.queryByRole("dialog", { name: "Inner dialog" })).toBeNull(),
        );
        expect(screen.getByRole("dialog", { name: "Closing dialog" })).toBeTruthy();
    });

    it("Escape in a non-dismissible inner modal leaves the outer one open", async () => {
        const user = userEvent.setup();
        render(ModalCloseHarness, { nested: true, innerDismissible: false });
        await user.click(screen.getByTestId("open-modal"));
        await fireEvent.click(await screen.findByTestId("open-inner"));
        const inner = await screen.findByRole("dialog", { name: "Inner dialog" });

        await fireEvent.keyDown(inner, { key: "Escape" });
        expect(screen.getByRole("dialog", { name: "Inner dialog" })).toBeTruthy();
        expect(screen.getByRole("dialog", { name: "Closing dialog" })).toBeTruthy();
    });
});

describe("Modal portal", () => {
    it("renders in place by default", async () => {
        const user = userEvent.setup();
        render(ModalCloseHarness);
        await user.click(screen.getByTestId("open-modal"));
        const dialog = await screen.findByRole("dialog");

        expect(screen.getByTestId("host").contains(dialog)).toBe(true);
    });

    it("moves the overlay to document.body and removes it on close", async () => {
        const user = userEvent.setup();
        const onclose = vi.fn();
        render(ModalCloseHarness, { portal: true, onclose });
        const opener = screen.getByTestId("open-modal");
        await user.click(opener);
        const dialog = await screen.findByRole("dialog", { name: "Closing dialog" });
        const overlay = dialog.parentElement!;

        expect(overlay.parentElement).toBe(document.body);
        expect(screen.getByTestId("host").contains(dialog)).toBe(false);
        expect(overlay.className).toContain("z-modal");
        expect(document.body.style.overflow).toBe("hidden");
        await waitFor(() => expect(dialog.contains(document.activeElement)).toBe(true));

        await fireEvent.keyDown(document.activeElement!, { key: "Escape" });
        await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
        expect(overlay.isConnected).toBe(false);
        expect(onclose).toHaveBeenCalledWith({ reason: "escape" });
        expect(document.activeElement).toBe(opener);
        expect(document.body.style.overflow).toBe("");
    });

    it("keeps the Tab trap, the close button and the backdrop working outside the app root", async () => {
        const user = userEvent.setup();
        const onclose = vi.fn();
        render(ModalCloseHarness, { portal: true, onclose });
        await user.click(screen.getByTestId("open-modal"));
        const dialog = await screen.findByRole("dialog");
        const close = screen.getByRole("button", { name: "Close" });

        close.focus();
        await user.tab({ shift: true });
        expect(document.activeElement).toBe(screen.getByTestId("close-from-parent"));
        await user.tab();
        expect(document.activeElement).toBe(close);

        await user.click(close);
        await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
        expect(onclose).toHaveBeenLastCalledWith({ reason: "close-button" });

        await user.click(screen.getByTestId("open-modal"));
        await fireEvent.click((await screen.findByRole("dialog")).parentElement!);
        await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
        expect(onclose).toHaveBeenLastCalledWith({ reason: "backdrop" });
        expect(dialog.isConnected).toBe(false);
    });

    it("Escape in a portalled inner modal closes only the inner one", async () => {
        const user = userEvent.setup();
        render(ModalCloseHarness, { portal: true, nested: true });
        await user.click(screen.getByTestId("open-modal"));
        await fireEvent.click(await screen.findByTestId("open-inner"));
        const inner = await screen.findByRole("dialog", { name: "Inner dialog" });
        const outer = screen.getByRole("dialog", { name: "Closing dialog" });

        // Siblings under body, the inner one later and so on top at the same z-index.
        expect(outer.contains(inner)).toBe(false);
        expect(
            outer.parentElement!.compareDocumentPosition(inner.parentElement!) &
                Node.DOCUMENT_POSITION_FOLLOWING,
        ).toBeTruthy();

        await fireEvent.keyDown(inner, { key: "Escape" });
        await waitFor(() =>
            expect(screen.queryByRole("dialog", { name: "Inner dialog" })).toBeNull(),
        );
        expect(screen.getByRole("dialog", { name: "Closing dialog" })).toBeTruthy();
        expect(document.body.style.overflow).toBe("hidden");

        await fireEvent.keyDown(outer, { key: "Escape" });
        await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
        expect(document.body.style.overflow).toBe("");
    });

    it("leaves nothing in document.body when unmounted while open", async () => {
        const { unmount } = render(ModalCloseHarness, {
            portal: true,
            initialOpen: true,
        });
        const dialog = await screen.findByRole("dialog");
        expect(dialog.parentElement!.parentElement).toBe(document.body);

        unmount();
        expect(dialog.isConnected).toBe(false);
        expect(document.querySelector('[role="dialog"]')).toBeNull();
        expect(document.body.style.overflow).toBe("");
    });
});

describe("SlideUp semantics", () => {
    it("puts role=dialog on the sheet and locks scroll until unmount", async () => {
        const { unmount } = render(SlideUp, { isOpen: true, title: "Sheet" });
        const dialog = await screen.findByRole("dialog", { name: "Sheet" });
        expect(dialog.parentElement?.getAttribute("role")).toBe("presentation");
        expect(document.body.style.overflow).toBe("hidden");

        unmount();
        expect(document.body.style.overflow).toBe("");
    });
});

describe("NavigationMenu disclosure", () => {
    it("uses disclosure semantics (no menu roles, no aria-haspopup)", async () => {
        const user = userEvent.setup();
        render(NavMenuHarness);
        const trigger = screen.getByRole("button", { name: "One" });
        expect(trigger.hasAttribute("aria-haspopup")).toBe(false);

        await user.click(trigger);
        expect(trigger.getAttribute("aria-expanded")).toBe("true");
        const panel = document.getElementById(trigger.getAttribute("aria-controls")!);
        expect(panel).toBeTruthy();
        expect(panel?.hasAttribute("role")).toBe(false);
        expect(screen.queryByRole("menu")).toBeNull();
    });

    it("does not leak document mousedown listeners across open/close cycles", async () => {
        const user = userEvent.setup();
        const added = vi.spyOn(document, "addEventListener");
        const removed = vi.spyOn(document, "removeEventListener");
        render(NavMenuHarness);
        const trigger = screen.getByRole("button", { name: "One" });

        for (let i = 0; i < 4; i++) {
            await user.click(trigger);
            await waitFor(() => expect(trigger.getAttribute("aria-expanded")).toBe("true"));
            await user.click(trigger);
            await waitFor(() => expect(trigger.getAttribute("aria-expanded")).toBe("false"));
        }

        const count = (spy: typeof added) =>
            spy.mock.calls.filter(([type]) => type === "mousedown").length;
        expect(count(added)).toBe(4);
        expect(count(removed)).toBe(count(added));
    });

    it("keeps the default landmark label", () => {
        render(NavMenuHarness);
        expect(screen.getByRole("navigation", { name: "Main navigation" })).toBeTruthy();
    });
});

describe("Toaster live regions", () => {
    it("keeps the countdown and buttons out of any live region", async () => {
        render(Toaster);
        pushToast({ message: "Profile updated", type: "success", duration: 5000 });

        const countdown = await waitFor(() => {
            const el = document.querySelector("[data-toast-countdown]");
            expect(el).toBeTruthy();
            return el!;
        });
        expect(countdown.closest(LIVE_REGION)).toBeNull();
        expect(
            screen.getByRole("button", { name: "Dismiss notification" }).closest(LIVE_REGION),
        ).toBeNull();

        const region = screen.getByRole("region", { name: "Notifications" });
        expect(region.hasAttribute("aria-live")).toBe(false);

        const status = screen.getByRole("status");
        expect(status.textContent).toContain("Changes saved");
        expect(status.textContent).toContain("Profile updated");
    });

    it("pauses auto-dismiss while hovered", async () => {
        vi.useFakeTimers({ toFake: ["setInterval", "clearInterval"] });
        render(Toaster);
        pushToast({ message: "Hold on", type: "info", duration: 3000 });

        const toast = await screen.findByRole("group", { name: "Notice" });
        await fireEvent.mouseEnter(toast);
        vi.advanceTimersByTime(5000);
        await waitFor(() => expect(toast.textContent).toContain("3 seconds"));
        expect(screen.queryByRole("group", { name: "Notice" })).toBeTruthy();

        await fireEvent.mouseLeave(toast);
        vi.advanceTimersByTime(1000);
        await waitFor(() => expect(toast.textContent).toContain("2 seconds"));
    });
});

describe("Alert", () => {
    it("hides itself on dismiss and still calls onclick", async () => {
        const user = userEvent.setup();
        const onclick = vi.fn();
        render(Alert, { closable: true, title: "Heads up", variant: "warning", onclick });

        const alert = screen.getByRole("alert");
        expect(alert.hasAttribute("aria-live")).toBe(false);

        await user.click(screen.getByRole("button", { name: "Dismiss alert" }));
        expect(onclick).toHaveBeenCalledTimes(1);
        await waitFor(() => expect(screen.queryByRole("alert")).toBeNull());
    });
});

describe("Tooltip Escape", () => {
    it("does not steal focus when the tooltip was opened by hover", async () => {
        const user = userEvent.setup();
        render(TooltipOutsideHarness);
        const outside = screen.getByTestId("outside-focus");
        outside.focus();

        await user.hover(screen.getByTestId("tip-trigger"));
        await waitFor(() =>
            expect(screen.getByRole("tooltip", { hidden: true }).dataset.visible).toBe("true"),
        );
        await user.keyboard("{Escape}");

        expect(document.activeElement).toBe(outside);
        await waitFor(() =>
            expect(screen.getByRole("tooltip", { hidden: true }).dataset.visible).toBe("false"),
        );
    });
});
