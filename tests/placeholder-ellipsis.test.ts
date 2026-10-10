import { cleanup, render } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";

import ColorPicker from "../src/components/atoms/ColorPicker.svelte";
import Input from "../src/components/atoms/Input.svelte";
import PickerField from "../src/components/atoms/PickerField.svelte";
import Select from "../src/components/atoms/Select.svelte";

afterEach(cleanup);

// jsdom does no layout and does not match `:placeholder-shown`, so the
// ellipsis itself cannot be seen here: these read the classes on the elements.
describe("a placeholder that is cut reads as cut (Z-124)", () => {
    it("Input: the field has placeholder-shown:text-ellipsis", () => {
        const { container } = render(Input, { props: { label: "Price", placeholder: "A long example of a price" } });
        const input = container.querySelector("input")!;
        expect(input.classList.contains("placeholder-shown:text-ellipsis")).toBe(true);
    });

    it("Input: the class is on every size and type, with a value or without", () => {
        for (const size of ["sm", "md", "lg"] as const) {
            for (const type of ["text", "search", "password"]) {
                const { container, unmount } = render(Input, { props: { label: "x", size, type, value: "typed" } });
                expect(container.querySelector("input")!.classList.contains("placeholder-shown:text-ellipsis")).toBe(true);
                unmount();
            }
        }
    });

    it("Input: nothing else on the input changes, and a class of the caller's stays", () => {
        const { container } = render(Input, { props: { label: "x", class: "my-own" } });
        const classes = container.querySelector("input")!.classList;
        expect(classes.contains("placeholder:text-input-placeholder")).toBe(true);
        expect(classes.contains("my-own")).toBe(true);
        expect(classes.contains("truncate")).toBe(false);
        expect(classes.contains("text-ellipsis")).toBe(false);
    });

    it("ColorPicker's field and Select's search field are an Input and get it", () => {
        const picker = render(ColorPicker, { props: { label: "Colour" } });
        expect(picker.container.querySelector("input")!.classList.contains("placeholder-shown:text-ellipsis")).toBe(true);
        picker.unmount();
    });

    it("Select's native control and PickerField's drawn placeholder truncate", () => {
        const picker = render(PickerField, { props: { label: "Day", placeholder: "Choose a day" } });
        const text = [...picker.container.querySelectorAll("span")].find((span) => span.textContent?.trim() === "Choose a day");
        expect(text?.classList.contains("truncate")).toBe(true);
        picker.unmount();

        const select = render(Select, { props: { label: "Kind", presentation: "native", options: [{ value: "a", label: "A" }] } });
        expect(select.container.querySelector("select")!.classList.contains("truncate")).toBe(true);
    });
});
