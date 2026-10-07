import { readFileSync } from "node:fs";
import { cleanup, render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import Radio from "../src/components/atoms/Radio.svelte";
import RadioGroup from "../src/components/molecules/RadioGroup.svelte";

afterEach(cleanup);

const options = [
    { value: "system", label: "Follow system", description: "Uses the device setting" },
    { value: "light", label: "Light" },
];

describe("RadioGroup chosenRing (Z-086)", () => {
    it("rows have no quiet class by default: the chosen row keeps its ring", () => {
        const { container } = render(RadioGroup, { props: { options, legend: "Appearance" } });
        expect(container.querySelectorAll(".selection-control-option-row")).toHaveLength(2);
        expect(container.querySelector(".selection-control-option-row-quiet")).toBeNull();
    });

    it("chosenRing={false} marks every row quiet and still chooses and moves with the keyboard", async () => {
        const { container } = render(RadioGroup, {
            props: { options, legend: "Appearance", chosenRing: false, defaultValue: "system" },
        });
        expect(container.querySelectorAll(".selection-control-option-row-quiet")).toHaveLength(2);
        const user = userEvent.setup();
        const system = screen.getByRole("radio", { name: /Follow system/ }) as HTMLInputElement;
        expect(system.checked).toBe(true);
        system.focus();
        await user.keyboard("{ArrowDown}");
        expect((screen.getByRole("radio", { name: "Light" }) as HTMLInputElement).checked).toBe(true);
        // A repeat press on the chosen item is a no-op.
        await user.click(screen.getByRole("radio", { name: "Light" }));
        expect((screen.getByRole("radio", { name: "Light" }) as HTMLInputElement).checked).toBe(true);
    });

    it("the quiet rule leaves a focus-visible row alone, so keyboard focus keeps its ring", () => {
        const css = readFileSync("src/app.css", "utf8");
        expect(css).toContain(
            ".selection-control-option-row-quiet:has(:checked):not(:has(:focus-visible))",
        );
        expect(css).toContain(".selection-control-label-row-interaction:has(:focus-visible)");
    });
});

describe("Radio description (Z-086)", () => {
    it("is read as the description and is not part of the name", () => {
        render(Radio, { props: { name: "a", value: "system", label: "Follow system", description: "Uses the device setting" } });
        const radio = screen.getByRole("radio", { name: "Follow system" });
        const id = radio.getAttribute("aria-describedby")!;
        expect(document.getElementById(id)?.textContent?.trim()).toBe("Uses the device setting");
    });

    it("keeps a caller's aria-describedby beside its own", () => {
        render(Radio, {
            props: { name: "a", value: "x", label: "X", description: "Own", "aria-describedby": "other" },
        });
        const radio = screen.getByRole("radio", { name: "X" });
        expect(radio.getAttribute("aria-describedby")).toMatch(/^other .+-description$/);
    });

    it("without a description nothing is added", () => {
        render(Radio, { props: { name: "a", value: "x", label: "X" } });
        expect(screen.getByRole("radio").hasAttribute("aria-describedby")).toBe(false);
    });
});
