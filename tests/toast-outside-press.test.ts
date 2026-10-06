import { cleanup, render, screen, waitFor, within } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it } from "vitest";

import DrawerHarness from "./fixtures/DrawerHarness.svelte";
import ToastOutsideHarness from "./fixtures/ToastOutsideHarness.svelte";
import { pushToast, toastStore } from "../src/components/molecules/toast-store";
import * as focusUtils from "../src/components/util/focus-utils";

/**
 * A toast lies over whatever is open, and a press on it is a press on the
 * toast: to read it, hold it, dismiss it. A menu that closes on a press
 * "outside" used to take it for one, and closed under the toast.
 *
 * Select and Dropdown do the same and are held by their own tests.
 */

beforeAll(() => {
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

async function toastOnScreen() {
    pushToast({ message: "Draft saved.", duration: 0 });
    await waitFor(() => expect(document.querySelector("[data-toast-id]")).not.toBeNull());
    const card = document.querySelector<HTMLElement>("[data-toast-id]")!;
    return { card, text: within(card).getByText("Draft saved.") };
}

describe("isInsideToastRegion", () => {
    const inside = (target: unknown) =>
        (focusUtils as unknown as { isInsideToastRegion?: (target: unknown) => boolean }).isInsideToastRegion?.(target);

    it("is true for a toast, what is in it, and the region itself", async () => {
        render(ToastOutsideHarness, { kind: "navbar" });
        const { card, text } = await toastOnScreen();
        expect(inside(text)).toBe(true);
        expect(inside(card)).toBe(true);
        expect(inside(text.firstChild), "A text node, as a press on text reports in some browsers").toBe(true);
        expect(inside(document.querySelector("[data-zabi-toaster]"))).toBe(true);
    });

    it("is false for the page, and for what is not an element at all", () => {
        render(ToastOutsideHarness, { kind: "navbar" });
        expect(inside(screen.getByTestId("elsewhere"))).toBe(false);
        expect(inside(document.body)).toBe(false);
        expect(inside(document)).toBe(false);
        expect(inside(window)).toBe(false);
        expect(inside(null)).toBe(false);
    });
});

describe("a press on a toast is not a press outside", () => {
    it("TopNavbar: the phone menu stays open under a press on a toast, and closes on a press elsewhere", async () => {
        const user = userEvent.setup();
        render(ToastOutsideHarness, { kind: "navbar" });
        const menuButton = () => screen.getByRole("button", { name: /^(Open|Close) menu$/ });
        await user.click(menuButton());
        expect(menuButton().getAttribute("aria-expanded")).toBe("true");

        const { text } = await toastOnScreen();
        await user.click(text);
        expect(menuButton().getAttribute("aria-expanded"), "A press on the toast").toBe("true");

        // Its buttons too: the press moves focus into the toast, which is not leaving the bar.
        const { card } = await toastOnScreen();
        await user.click(within(card).getAllByRole("button", { name: "Dismiss notification" })[0]);
        expect(menuButton().getAttribute("aria-expanded"), "A press on a toast's button").toBe("true");

        await user.click(screen.getByTestId("elsewhere"));
        expect(menuButton().getAttribute("aria-expanded"), "A press on the page").toBe("false");
    });

    it("ColorPicker: the panel stays open under a press on a toast, and closes on a press elsewhere", async () => {
        const user = userEvent.setup();
        render(ToastOutsideHarness, { kind: "color" });
        const trigger = document.querySelector<HTMLElement>("[data-color-picker-open]")!;
        await user.click(trigger);
        expect(trigger.getAttribute("aria-expanded")).toBe("true");

        const { text } = await toastOnScreen();
        await user.click(text);
        expect(trigger.getAttribute("aria-expanded"), "A press on the toast").toBe("true");

        await user.click(screen.getByTestId("elsewhere"));
        await waitFor(() => expect(trigger.getAttribute("aria-expanded"), "A press on the page").toBe("false"));
    });

    it("NavigationMenu: the panel stays open under a press on a toast, and closes on a press elsewhere", async () => {
        const user = userEvent.setup();
        render(ToastOutsideHarness, { kind: "navmenu" });
        const trigger = document.querySelector<HTMLElement>("[data-navigation-menu-trigger]")!;
        await user.click(trigger);
        await waitFor(() => expect(trigger.getAttribute("aria-expanded")).toBe("true"));

        const { text } = await toastOnScreen();
        await user.click(text);
        expect(trigger.getAttribute("aria-expanded"), "A press on the toast").toBe("true");

        await user.click(screen.getByTestId("elsewhere"));
        await waitFor(() => expect(trigger.getAttribute("aria-expanded"), "A press on the page").toBe("false"));
    });
});

describe("Drawer on a phone", () => {
    const classesOf = (element: Element | null) => (element?.getAttribute("class") ?? "").split(/\s+/);

    it("ends above the home indicator: the panel is padded by the safe area, except over a keyboard", async () => {
        render(DrawerHarness, { props: { initialOpen: true } });
        const panel = await screen.findByRole("dialog");
        expect(classesOf(panel)).toContain("pb-[env(safe-area-inset-bottom,0px)]");
        expect(classesOf(panel)).toContain("group-data-keyboard-open/overlay:pb-0");
    });

    it("keeps a 44px touch area around its 32px close button", async () => {
        render(DrawerHarness, { props: { initialOpen: true } });
        const panel = await screen.findByRole("dialog");
        const close = within(panel).getByRole("button", { name: "Close" });
        const classes = classesOf(close);
        expect(classes).toContain("size-8");
        expect(classes).toContain("relative");
        for (const name of [
            "pointer-coarse:before:absolute",
            "pointer-coarse:before:min-h-11",
            "pointer-coarse:before:min-w-11",
        ]) {
            expect(classes).toContain(name);
        }
        // 11 steps of the header's 4px scale: 44px at every text size.
        expect(close.closest('[class~="[--spacing:4px]"]')).not.toBeNull();
    });
});
