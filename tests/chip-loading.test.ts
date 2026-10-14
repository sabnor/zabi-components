import { createRawSnippet } from "svelte";
import { cleanup, render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import Chip from "../src/components/atoms/Chip.svelte";

afterEach(cleanup);

const label = (text: string) => createRawSnippet(() => ({ render: () => `<span>${text}</span>` }));

describe("Chip loading (Z-091)", () => {
    it("is busy and unavailable but still a Tab stop, and keeps its name", () => {
        render(Chip, { props: { type: "submit", loading: true, children: label("Going") } });
        const chip = screen.getByRole("button", { name: "Going" }) as HTMLButtonElement;
        expect(chip.getAttribute("aria-busy")).toBe("true");
        expect(chip.getAttribute("aria-disabled")).toBe("true");
        expect(chip.disabled).toBe(false);
        expect(chip.querySelector("[aria-hidden='true'].animate-spin")).not.toBeNull();
        // The label stays in the chip, so its width does not change.
        expect(chip.textContent).toContain("Going");
    });

    it("has no busy attributes or spinner when it is not loading", () => {
        render(Chip, { props: { type: "submit", children: label("Going") } });
        const chip = screen.getByRole("button", { name: "Going" });
        expect(chip.hasAttribute("aria-busy")).toBe(false);
        expect(chip.hasAttribute("aria-disabled")).toBe(false);
        expect(chip.querySelector(".animate-spin")).toBeNull();
    });

    it("swallows the press: no submit, no onclick, and a toggle does not toggle", async () => {
        const form = document.createElement("form");
        document.body.appendChild(form);
        const submit = vi.fn((event: Event) => event.preventDefault());
        form.addEventListener("submit", submit);
        const onclick = vi.fn();
        const onchange = vi.fn();
        render(Chip, { target: form, props: { type: "submit", loading: true, onclick, children: label("Going") } });
        await userEvent.click(screen.getByRole("button", { name: "Going" }));
        expect(submit).not.toHaveBeenCalled();
        expect(onclick).not.toHaveBeenCalled();
        form.remove();

        cleanup();
        render(Chip, { props: { loading: true, selected: false, onchange, children: label("Filter") } });
        const toggle = screen.getByRole("button", { name: "Filter" });
        await userEvent.click(toggle);
        expect(onchange).not.toHaveBeenCalled();
        expect(toggle.getAttribute("aria-pressed")).toBe("false");
    });

    it("keeps focus while loading starts", async () => {
        const { rerender } = render(Chip, { props: { type: "submit", children: label("Going") } });
        const chip = screen.getByRole("button", { name: "Going" });
        chip.focus();
        await rerender({ loading: true });
        expect(document.activeElement).toBe(chip);
    });

    it("is a plain disabled button when disabled, loading or not", () => {
        render(Chip, { props: { type: "submit", disabled: true, loading: true, children: label("Going") } });
        const chip = screen.getByRole("button", { name: "Going" }) as HTMLButtonElement;
        expect(chip.disabled).toBe(true);
        expect(chip.hasAttribute("aria-busy")).toBe(false);
    });
});
