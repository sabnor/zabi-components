import { cleanup, render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import Select from "../src/components/atoms/Select.svelte";

afterEach(cleanup);

const languages = [
    { value: "sv", label: "Svenska", lang: "sv" },
    { value: "en", label: "English", lang: "en" },
];

const triggerOf = (container: HTMLElement) =>
    container.querySelector<HTMLButtonElement>('button[aria-haspopup="listbox"]')!;

describe("Select option lang (Z-083)", () => {
    it("is on the row, the native option and the trigger's text while chosen", async () => {
        const { container } = render(Select, { label: "Språk", options: languages, value: "en", presentation: "popover" });
        const native = container.querySelector("select")!;
        expect([...native.options].map((option) => option.getAttribute("lang"))).toEqual(["sv", "en"]);
        const trigger = triggerOf(container);
        expect(trigger.querySelector("[lang]")?.getAttribute("lang")).toBe("en");
        await userEvent.click(trigger);
        const rows = screen.getAllByRole("option");
        expect(rows.map((row) => row.getAttribute("lang"))).toEqual(["sv", "en"]);
    });

    it("leaves lang off where an option has none, and off the placeholder", async () => {
        const { container } = render(Select, { label: "Språk", options: [{ value: "x", label: "X" }], presentation: "popover" });
        expect(container.querySelector("select option[lang]")).toBeNull();
        expect(triggerOf(container).querySelector("[lang]")).toBeNull();
        await userEvent.click(triggerOf(container));
        expect(screen.getByRole("option").hasAttribute("lang")).toBe(false);
    });
});
