import { createRawSnippet } from "svelte";
import { cleanup, render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import Chip from "../src/components/atoms/Chip.svelte";

afterEach(cleanup);

const label = (text: string) => createRawSnippet(() => ({ render: () => `<span>${text}</span>` }));

/** A form the chip is rendered into; `submitted` collects each submit's submitter. */
function formWith() {
    const form = document.createElement("form");
    document.body.appendChild(form);
    const submitted: Array<{ name: string; value: string }> = [];
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const submitter = (event as SubmitEvent).submitter as HTMLButtonElement | null;
        if (submitter) submitted.push({ name: submitter.name, value: submitter.value });
    });
    return { form, submitted };
}

describe("Chip type=submit (Z-082)", () => {
    it("is a submit button that posts its name and value", async () => {
        const { form, submitted } = formWith();
        render(Chip, { target: form, props: { type: "submit", name: "answer", value: "going", children: label("Jag kommer") } });
        const chip = screen.getByRole("button", { name: "Jag kommer" });
        expect(chip.getAttribute("type")).toBe("submit");
        await userEvent.click(chip);
        expect(submitted).toEqual([{ name: "answer", value: "going" }]);
        form.remove();
    });

    it("does not toggle itself: selected is the app's, said with aria-pressed", async () => {
        const { form } = formWith();
        const onchange = vi.fn();
        const onclick = vi.fn();
        render(Chip, { target: form, props: { type: "submit", name: "answer", value: "going", selected: false, onchange, onclick, children: label("Jag kommer") } });
        const chip = screen.getByRole("button", { name: "Jag kommer" });
        expect(chip.getAttribute("aria-pressed")).toBe("false");
        await userEvent.click(chip);
        expect(chip.getAttribute("aria-pressed")).toBe("false");
        expect(onchange).not.toHaveBeenCalled();
        expect(onclick).toHaveBeenCalledTimes(1);
        form.remove();
    });

    it("draws and says selected when the app says so", () => {
        render(Chip, { props: { type: "submit", name: "answer", value: "going", selected: true, children: label("Jag kommer") } });
        const chip = screen.getByRole("button", { name: "Jag kommer" });
        expect(chip.getAttribute("aria-pressed")).toBe("true");
        expect(chip.className.split(/\s+/)).toContain("bg-chip-selected");
    });

    it("is reached by Tab and pressed with Enter", async () => {
        const { form, submitted } = formWith();
        render(Chip, { target: form, props: { type: "submit", name: "answer", value: "maybe", children: label("Kanske") } });
        await userEvent.tab();
        expect(document.activeElement).toBe(screen.getByRole("button", { name: "Kanske" }));
        await userEvent.keyboard("{Enter}");
        expect(submitted).toEqual([{ name: "answer", value: "maybe" }]);
        form.remove();
    });

    it("when disabled posts nothing", async () => {
        const { form, submitted } = formWith();
        render(Chip, { target: form, props: { type: "submit", name: "answer", value: "no", disabled: true, children: label("Nej") } });
        await userEvent.click(screen.getByRole("button", { name: "Nej" }));
        expect(submitted).toEqual([]);
        form.remove();
    });

    it("type=button does not submit and does not toggle either", async () => {
        const { form, submitted } = formWith();
        render(Chip, { target: form, props: { type: "button", children: label("Plain") } });
        const chip = screen.getByRole("button", { name: "Plain" });
        expect(chip.getAttribute("type")).toBe("button");
        await userEvent.click(chip);
        expect(submitted).toEqual([]);
        expect(chip.getAttribute("aria-pressed")).toBe("false");
        form.remove();
    });

    it("without a type is still the toggle button of alpha.7", async () => {
        render(Chip, { props: { children: label("Toggle") } });
        const chip = screen.getByRole("button", { name: "Toggle" });
        expect(chip.getAttribute("type")).toBe("button");
        await userEvent.click(chip);
        expect(chip.getAttribute("aria-pressed")).toBe("true");
    });
});
