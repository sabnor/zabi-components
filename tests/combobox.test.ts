import { fireEvent, render, screen } from "@testing-library/svelte";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import Combobox from "../src/components/molecules/Combobox.svelte";

const CITIES = [
    { value: "1", label: "Malmö", description: "Skåne" },
    { value: "2", label: "Mora" },
    { value: "3", label: "Moss", disabled: true },
];

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

async function type(input: HTMLElement, text: string) {
    await fireEvent.focus(input);
    await fireEvent.input(input, { target: { value: text } });
}
async function settle(ms = 250) {
    await vi.advanceTimersByTimeAsync(ms);
}
const field = () => screen.getByRole("combobox") as HTMLInputElement;

describe("Combobox", () => {
    it("searches after the debounce, once the text is long enough", async () => {
        const search = vi.fn(async () => CITIES);
        render(Combobox, { props: { search, label: "Place", minLength: 2 } });
        await type(field(), "M");
        await settle(500);
        expect(search).not.toHaveBeenCalled();
        await type(field(), "Mo");
        await settle(249);
        expect(search).not.toHaveBeenCalled();
        await settle(1);
        expect(search).toHaveBeenCalledTimes(1);
        expect(search.mock.calls[0][0]).toBe("Mo");
        expect(screen.getAllByRole("option")).toHaveLength(3);
    });

    it("ignores a stale answer and aborts its signal", async () => {
        const signals: AbortSignal[] = [];
        let resolveFirst: (v: typeof CITIES) => void = () => {};
        const search = vi.fn((q: string, signal: AbortSignal) => {
            signals.push(signal);
            if (q === "a") return new Promise<typeof CITIES>((r) => (resolveFirst = r));
            return Promise.resolve([{ value: "9", label: "Second" }]);
        });
        render(Combobox, { props: { search, debounce: 10 } });
        await type(field(), "a");
        await settle(10);
        await type(field(), "ab");
        await settle(10);
        expect(signals[0].aborted).toBe(true);
        resolveFirst(CITIES);
        await settle(0);
        const options = screen.getAllByRole("option");
        expect(options.map((o) => o.textContent?.trim())).toEqual(["Second"]);
    });

    it("moves with the arrows, wraps, skips disabled, and Enter chooses", async () => {
        const onselect = vi.fn();
        render(Combobox, { props: { search: () => CITIES, onselect, label: "Place" } });
        const input = field();
        await type(input, "m");
        await settle();
        expect(input.getAttribute("aria-expanded")).toBe("true");
        await fireEvent.keyDown(input, { key: "ArrowDown" });
        expect(input.getAttribute("aria-activedescendant")).toBe(screen.getAllByRole("option")[0].id);
        await fireEvent.keyDown(input, { key: "ArrowDown" });
        await fireEvent.keyDown(input, { key: "ArrowDown" });
        // Moss is disabled: wraps to the first.
        expect(screen.getAllByRole("option")[0].getAttribute("aria-selected")).toBe("true");
        await fireEvent.keyDown(input, { key: "ArrowUp" });
        expect(screen.getAllByRole("option")[1].getAttribute("aria-selected")).toBe("true");
        await fireEvent.keyDown(input, { key: "Enter" });
        expect(onselect).toHaveBeenCalledWith(CITIES[1]);
        expect(input.value).toBe("Mora");
        expect(screen.queryByRole("listbox")).toBeNull();
    });

    it("does not swallow Enter with no active option", async () => {
        render(Combobox, { props: { search: () => CITIES } });
        const input = field();
        await type(input, "m");
        await settle();
        const notPrevented = await fireEvent.keyDown(input, { key: "Enter" });
        expect(notPrevented).toBe(true);
    });

    it("Escape closes the list and keeps the text; a pointer press chooses; Tab and blur close", async () => {
        const onselect = vi.fn();
        render(Combobox, { props: { search: () => CITIES, onselect } });
        const input = field();
        await type(input, "mo");
        await settle();
        await fireEvent.keyDown(input, { key: "Escape" });
        expect(screen.queryByRole("listbox")).toBeNull();
        expect(input.value).toBe("mo");
        await fireEvent.keyDown(input, { key: "Escape" });
        expect(input.value).toBe("mo");
        await fireEvent.keyDown(input, { key: "ArrowDown" });
        expect(screen.getAllByRole("option")).toHaveLength(3);
        await fireEvent.keyDown(input, { key: "Tab" });
        expect(screen.queryByRole("listbox")).toBeNull();
        await fireEvent.keyDown(input, { key: "ArrowDown" });
        await fireEvent.blur(input);
        expect(screen.queryByRole("listbox")).toBeNull();
        await fireEvent.focus(input);
        await fireEvent.keyDown(input, { key: "ArrowDown" });
        await fireEvent.pointerDown(screen.getAllByRole("option")[0]);
        expect(onselect).toHaveBeenCalledWith(CITIES[0]);
        expect(input.value).toBe("Malmö");
    });

    it("keeps free text with selected null, and editing after a choice resets selected", async () => {
        let selected: unknown = "unset";
        const { component } = render(Combobox, {
            props: {
                search: () => CITIES,
                get selected() {
                    return selected;
                },
                set selected(v) {
                    selected = v;
                },
            } as never,
        });
        void component;
        const input = field();
        await type(input, "zzz");
        await settle();
        await fireEvent.blur(input);
        expect(input.value).toBe("zzz");
        expect(selected).toBeNull();
        await type(input, "m");
        await settle();
        await fireEvent.keyDown(input, { key: "ArrowDown" });
        await fireEvent.keyDown(input, { key: "Enter" });
        expect((selected as { label: string }).label).toBe("Malmö");
        await fireEvent.input(input, { target: { value: "Malm" } });
        expect(selected).toBeNull();
    });

    it("shows loading, empty (also when the search rejects) and the count in a polite live region", async () => {
        const search = vi.fn();
        search.mockImplementationOnce(() => new Promise(() => {}));
        render(Combobox, { props: { search } });
        const input = field();
        const live = () => document.querySelector("[aria-live=polite]")!.textContent;
        await type(input, "a");
        await settle();
        expect(live()).toBe("Searching…");
        expect(screen.getAllByText("Searching…").length).toBe(2);
        search.mockRejectedValueOnce(new Error("x"));
        await fireEvent.input(input, { target: { value: "ab" } });
        await settle();
        expect(live()).toBe("No matches");
        search.mockResolvedValueOnce([CITIES[0]]);
        await fireEvent.input(input, { target: { value: "abc" } });
        await settle();
        expect(live()).toBe("1 result");
        search.mockResolvedValueOnce(CITIES);
        await fireEvent.input(input, { target: { value: "abcd" } });
        await settle();
        expect(live()).toBe("3 results");
    });

    it("takes its words from strings", async () => {
        render(Combobox, {
            props: { search: () => [], strings: { empty: "Inga träffar", results: (n: number) => `${n} träffar` } },
        });
        await type(field(), "x");
        await settle();
        expect(document.querySelector("[aria-live=polite]")!.textContent).toBe("Inga träffar");
    });

    it("has the combobox ARIA wiring, a label, and passes other attributes to the input", async () => {
        render(Combobox, {
            props: { search: () => CITIES, label: "Place", "data-testid": "place", inputmode: "search", name: "city" } as never,
        });
        const input = screen.getByLabelText("Place") as HTMLInputElement;
        expect(input.getAttribute("role")).toBe("combobox");
        expect(input.getAttribute("aria-autocomplete")).toBe("list");
        expect(input.getAttribute("aria-expanded")).toBe("false");
        expect(input.getAttribute("data-testid")).toBe("place");
        expect(input.getAttribute("inputmode")).toBe("search");
        expect(input.name).toBe("city");
        await type(input, "m");
        await settle();
        expect(input.getAttribute("aria-controls")).toBe(screen.getByRole("listbox").id);
        expect(screen.getAllByRole("option")[2].getAttribute("aria-disabled")).toBe("true");
    });
});
