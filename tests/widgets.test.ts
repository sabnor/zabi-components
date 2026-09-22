import { cleanup, fireEvent, render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import ThemeToggle from "../src/components/atoms/ThemeToggle.svelte";
import SelectFormHarness from "./fixtures/SelectFormHarness.svelte";
import TabsHarness from "./fixtures/TabsHarness.svelte";
import ToggleFormHarness from "./fixtures/ToggleFormHarness.svelte";

afterEach(() => {
    cleanup();
    document.documentElement.classList.remove("dark");
    document.documentElement.style.colorScheme = "";
    globalThis.localStorage?.clear();
});

function formData(): FormData {
    return new FormData(screen.getByTestId("form") as HTMLFormElement);
}

describe("Tabs", () => {
    it("moves focus with selection on Arrow/Home/End and skips disabled tabs", async () => {
        const user = userEvent.setup();
        render(TabsHarness);
        const [alpha, beta, , delta] = screen.getAllByRole("tab");

        expect(screen.getByRole("tablist").tabIndex).toBe(-1);
        expect(alpha.tabIndex).toBe(0);

        alpha.focus();
        await user.keyboard("{ArrowRight}");
        expect(document.activeElement).toBe(beta);
        expect(beta.getAttribute("aria-selected")).toBe("true");
        expect(beta.tabIndex).toBe(0);

        await user.keyboard("{ArrowRight}");
        expect(document.activeElement).toBe(delta);

        await user.keyboard("{Home}");
        expect(document.activeElement).toBe(alpha);

        await user.keyboard("{End}");
        expect(document.activeElement).toBe(delta);
        expect(screen.getByTestId("bound").textContent).toBe("d");
    });

    it("has a single tab stop (the active tab)", async () => {
        const user = userEvent.setup();
        render(TabsHarness);
        await user.tab();
        expect(document.activeElement).toBe(screen.getAllByRole("tab")[0]);
        await user.tab();
        expect(document.activeElement?.getAttribute("role")).not.toBe("tab");
    });
});

describe("Select", () => {
    it("submits its value with native forms and matches string/number values", async () => {
        const user = userEvent.setup();
        render(SelectFormHarness);

        expect(screen.getByRole("button", { name: /fruit/i }).textContent).toContain(
            "Banana",
        );
        expect(formData().get("fruit")).toBe("2");

        await user.click(screen.getByRole("button", { name: /fruit/i }));
        await user.click(screen.getByRole("option", { name: "Apple" }));
        expect(formData().get("fruit")).toBe("1");
    });

    it("keeps the search field outside the listbox and lets Home move the caret", async () => {
        const user = userEvent.setup();
        render(SelectFormHarness);
        await user.click(screen.getByRole("button", { name: /fruit/i }));

        const listbox = screen.getByRole("listbox");
        const search = screen.getByRole("textbox", { name: "Search options" });
        expect(listbox.contains(search)).toBe(false);

        // fireEvent returns false when a handler called preventDefault().
        expect(await fireEvent.keyDown(search, { key: "Home" })).toBe(true);
        expect(await fireEvent.keyDown(search, { key: "End" })).toBe(true);
    });
});

describe("Toggle", () => {
    it("accepts an id and submits its name when checked", async () => {
        const user = userEvent.setup();
        render(ToggleFormHarness);
        const sw = screen.getByRole("switch", { name: "Notify me" });

        expect(sw.id).toBe("notif");
        expect(formData().get("notifications")).toBeNull();

        await user.click(sw);
        expect(sw.getAttribute("aria-checked")).toBe("true");
        expect(formData().get("notifications")).toBe("on");
    });

    it("toggles once per Enter/Space via native button activation", async () => {
        const user = userEvent.setup();
        render(ToggleFormHarness);
        const sw = screen.getByRole("switch");
        sw.focus();
        await user.keyboard("{Enter}");
        expect(sw.getAttribute("aria-checked")).toBe("true");
        await user.keyboard(" ");
        expect(sw.getAttribute("aria-checked")).toBe("false");
    });
});

describe("ThemeToggle", () => {
    it("still toggles the theme when a consumer onclick is passed", async () => {
        const user = userEvent.setup();
        const onclick = vi.fn();
        render(ThemeToggle, { props: { onclick, size: "sm" } });

        const btn = await screen.findByRole("button", { name: /switch to dark mode/i });
        expect(btn.className).toContain("w-8");

        await user.click(btn);
        expect(onclick).toHaveBeenCalledTimes(1);
        expect(document.documentElement.classList.contains("dark")).toBe(true);
        if (globalThis.localStorage) {
            expect(globalThis.localStorage.getItem("theme")).toBe("dark");
        }
    });
});
