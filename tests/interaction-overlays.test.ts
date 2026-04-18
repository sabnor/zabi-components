import { fireEvent, render, screen, waitFor, cleanup } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import ModalHarness from "./fixtures/ModalHarness.svelte";
import NestedModalHarness from "./fixtures/NestedModalHarness.svelte";
import NavMenuHarness from "./fixtures/NavMenuHarness.svelte";
import RadioDynamicHarness from "./fixtures/RadioDynamicHarness.svelte";
import RadioStaleHarness from "./fixtures/RadioStaleHarness.svelte";
import ToggleHarness from "./fixtures/ToggleHarness.svelte";
import TooltipHarness from "./fixtures/TooltipHarness.svelte";

import {
    navigationMenuPanelId,
    navigationMenuStableInstanceId,
} from "../src/components/molecules/navigation-menu-context.js";

afterEach(() => {
    cleanup();
    vi.useRealTimers();
});

describe("Modal", () => {
    it("returns focus to the opener after close and supports Escape", async () => {
        const user = userEvent.setup();
        render(ModalHarness);

        const openBtn = screen.getByTestId("open-modal");
        const outside = screen.getByTestId("outside-before");
        outside.focus();
        expect(document.activeElement).toBe(outside);

        await user.click(openBtn);
        const dialog = await screen.findByRole("dialog", { name: "Test dialog" });
        expect(dialog).toBeTruthy();

        await waitFor(() => {
            const inDialog = dialog.contains(document.activeElement);
            expect(inDialog).toBe(true);
        });

        await fireEvent.keyDown(dialog, { key: "Escape", bubbles: true });
        await waitFor(() =>
            expect(screen.queryByRole("dialog")).toBeNull(),
        );
        expect(document.activeElement).toBe(openBtn);
    });

    it("handles rapid open/close without leaving duplicate dialogs", async () => {
        const user = userEvent.setup();
        render(ModalHarness);
        const openBtn = screen.getByTestId("open-modal");

        for (let i = 0; i < 5; i++) {
            await user.click(openBtn);
            const dlg = await screen.findByRole("dialog");
            await fireEvent.keyDown(dlg, { key: "Escape", bubbles: true });
            await waitFor(() =>
                expect(screen.queryByRole("dialog")).toBeNull(),
            );
        }
    });
});

describe("Modal nesting", () => {
    it("opens inner over outer and restores focus in LIFO order", async () => {
        const user = userEvent.setup();
        render(NestedModalHarness);

        const before = screen.getByTestId("focus-outside");
        before.focus();

        await user.click(screen.getByTestId("open-outer"));
        await screen.findByRole("dialog", { name: "Outer" });

        await fireEvent.click(screen.getByTestId("open-inner"));
        await screen.findByRole("dialog", { name: "Inner" });
        expect(screen.getAllByRole("dialog")).toHaveLength(2);

        await user.click(screen.getByTestId("close-inner"));
        await waitFor(() =>
            expect(
                screen.queryByRole("dialog", { name: "Inner" }),
            ).toBeNull(),
        );
        expect(screen.getByRole("dialog", { name: "Outer" })).toBeTruthy();

        await user.click(screen.getByTestId("close-outer"));
        await waitFor(() =>
            expect(screen.queryByRole("dialog")).toBeNull(),
        );
        expect(document.activeElement).toBe(
            screen.getByTestId("open-outer"),
        );
    });
});

describe("Tooltip", () => {
    it("sets aria-describedby on the focusable child while visible", async () => {
        const user = userEvent.setup();
        render(TooltipHarness, { delay: 0 });
        const btn = screen.getByTestId("tip-trigger");
        btn.focus();
        await waitFor(() => {
            expect(btn.getAttribute("aria-describedby")).toBeTruthy();
        });
        const id = btn.getAttribute("aria-describedby");
        expect(id).toBeTruthy();
        expect(document.getElementById(id!)?.getAttribute("role")).toBe(
            "tooltip",
        );
        await user.keyboard("{Escape}");
        await waitFor(() =>
            expect(btn.hasAttribute("aria-describedby")).toBe(false),
        );
    });

    it("respects delay and cancels show on rapid leave", async () => {
        vi.useFakeTimers();
        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
        render(TooltipHarness, { delay: 300 });
        const btn = screen.getByTestId("tip-trigger");

        await user.hover(btn);
        vi.advanceTimersByTime(150);
        expect(btn.hasAttribute("aria-describedby")).toBe(false);

        await user.unhover(btn);
        vi.advanceTimersByTime(500);
        expect(btn.hasAttribute("aria-describedby")).toBe(false);
    });
});

describe("NavigationMenu", () => {
    it("links trigger aria-controls to panel id for stable menuId", async () => {
        const user = userEvent.setup();
        render(NavMenuHarness);

        const trigger = screen.getByRole("button", { name: "One" });
        const panelId = navigationMenuPanelId("test-nav-stable", "one");
        expect(trigger.getAttribute("aria-controls")).toBe(panelId);

        await user.click(trigger);
        await waitFor(() => {
            const panel = document.getElementById(panelId);
            expect(panel).toBeTruthy();
            expect(panel?.getAttribute("role")).toBe("menu");
        });
    });

    it("computes deterministic stable instance ids (SSR hydration surrogate)", () => {
        const items = [{ value: "a" }, { value: "b" }];
        expect(navigationMenuStableInstanceId(items)).toBe(
            navigationMenuStableInstanceId(items),
        );
        expect(navigationMenuStableInstanceId(items)).toMatch(/^zabi-nav-[a-z0-9]+$/);
        expect(navigationMenuStableInstanceId(items)).not.toBe(
            navigationMenuStableInstanceId([{ value: "b" }, { value: "a" }]),
        );
    });
});

describe("RadioGroup", () => {
    it("gives roving tabindex to fallback when value is stale", async () => {
        const user = userEvent.setup();
        render(RadioStaleHarness);
        const radios = screen.getAllByRole("radio");
        const alpha = radios.find((r) => (r as HTMLInputElement).value === "a")!;
        const beta = radios.find((r) => (r as HTMLInputElement).value === "b")!;

        expect(alpha.tabIndex).toBe(0);
        expect(beta.tabIndex).toBe(-1);

        alpha.focus();
        await user.keyboard("{ArrowRight}");
        await user.keyboard("{ArrowRight}");
        expect((document.activeElement as HTMLInputElement).value).toBe("b");
    });

    it("recovers focus order after options swap removes current value", async () => {
        const user = userEvent.setup();
        render(RadioDynamicHarness);

        const radios = () => screen.getAllByRole("radio");
        const p = () =>
            radios().find((r) => (r as HTMLInputElement).value === "p")!;

        await user.click(screen.getByText("Y"));
        expect((radios().find((r) => (r as HTMLInputElement).checked) as HTMLInputElement).value).toBe("y");

        await user.click(screen.getByTestId("swap-options"));
        await waitFor(() => expect(radios().length).toBe(2));

        const first = p();
        expect(first.tabIndex).toBe(0);
        first.focus();
        await user.keyboard("{ArrowRight}");
        await user.keyboard("{ArrowRight}");
        expect((document.activeElement as HTMLInputElement).value).toBe("q");
    });
});

describe("Toggle", () => {
    it("uses fallback aria-label when no visible label", () => {
        render(ToggleHarness, { withLabel: false });
        const sw = screen.getByRole("switch");
        expect(sw.getAttribute("aria-label")).toBe("Toggle");
    });

    it("omits aria-label when a label is provided (associated label element)", () => {
        render(ToggleHarness, { withLabel: true });
        const sw = screen.getByRole("switch");
        expect(sw.hasAttribute("aria-label")).toBe(false);
        const lbl = screen.getByText("Notifications");
        expect(lbl.getAttribute("for")).toBe(sw.id);
    });
});
