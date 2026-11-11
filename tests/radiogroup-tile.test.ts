import { cleanup, render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { createRawSnippet } from "svelte";
import { afterEach, describe, expect, it } from "vitest";

import RadioGroup from "../src/components/molecules/RadioGroup.svelte";

afterEach(cleanup);

const options = [
    { value: "none", label: "None" },
    { value: "sm", label: "Small" },
    { value: "md", label: "Medium" },
    { value: "lg", label: "Large" },
    { value: "full", label: "Full", description: "Pill" },
];

const optionVisual = createRawSnippet((option: () => { value: string }) => ({
    render: () => `<i data-visual="${option().value}"></i>`,
}));

describe("RadioGroup appearance=tile (cms-admin 16)", () => {
    it("renders five radios named by their label, with the picture hidden", () => {
        const { container } = render(RadioGroup, {
            props: { legend: "Shape", options, appearance: "tile", optionVisual },
        });
        expect(screen.getAllByRole("radio")).toHaveLength(5);
        for (const o of options) expect(screen.getByRole("radio", { name: o.label })).toBeTruthy();
        const visuals = container.querySelectorAll("[data-visual]");
        expect(visuals).toHaveLength(5);
        for (const v of visuals) expect(v.closest('[aria-hidden="true"]')).not.toBeNull();
        expect(container.querySelector("label")!.className).toContain("rounded-control");
        expect(container.querySelector(".grid")).not.toBeNull();
        expect(screen.getByRole("radio", { name: "Full" }).getAttribute("aria-describedby")).toBeTruthy();
    });

    it("arrow keys, Home and End move and select; a repeat press keeps the choice", async () => {
        render(RadioGroup, {
            props: { legend: "Shape", options, appearance: "tile", defaultValue: "none" },
        });
        const user = userEvent.setup();
        const radio = (n: string) => screen.getByRole("radio", { name: n }) as HTMLInputElement;
        radio("None").focus();
        await user.keyboard("{ArrowRight}");
        expect(radio("Small").checked).toBe(true);
        await user.keyboard("{End}");
        expect(radio("Full").checked).toBe(true);
        await user.keyboard("{ArrowDown}");
        expect(radio("None").checked).toBe(true);
        await user.click(radio("None"));
        expect(radio("None").checked).toBe(true);
    });

    it("the list takes the picture between the radio and the label", () => {
        const { container } = render(RadioGroup, { props: { legend: "Shape", options, optionVisual } });
        expect(container.querySelectorAll("[data-visual]")).toHaveLength(5);
        expect(container.querySelector(".selection-control-option-row")).not.toBeNull();
    });

    it("without the new props the list has no tile markup", () => {
        const { container } = render(RadioGroup, { props: { legend: "Shape", options } });
        expect(container.querySelector(".grid")).toBeNull();
        expect(container.querySelector("label")!.className).not.toContain("rounded-control");
        expect(container.querySelector("[aria-hidden='true'].flex.items-center.justify-center")).toBeNull();
        expect(container.querySelectorAll(".selection-control-option-row")).toHaveLength(5);
    });
});

describe("RadioGroup tile columns, layout and chosen badge", () => {
    it("draws a check badge on every tile, hidden from assistive technology", () => {
        const { container } = render(RadioGroup, {
            props: { legend: "Shape", options, appearance: "tile", defaultValue: "sm" },
        });
        const badges = container.querySelectorAll(".tile-badge");
        expect(badges).toHaveLength(5);
        badges.forEach((b) => expect(b.getAttribute("aria-hidden")).toBe("true"));
        expect((screen.getByRole("radio", { name: /small/i }) as HTMLInputElement).checked).toBe(true);
    });

    it("sets columns and tileMinWidth as custom properties, and nothing by default", () => {
        const a = render(RadioGroup, { props: { legend: "A", options, appearance: "tile", columns: 3, tileMinWidth: "5rem" } });
        const grid = a.container.querySelector(".tile-grid") as HTMLElement;
        expect(grid.getAttribute("style")).toContain("--zabi-tile-columns: 3");
        expect(grid.getAttribute("style")).toContain("--zabi-tile-min: 5rem");
        cleanup();
        const b = render(RadioGroup, { props: { legend: "B", options, appearance: "tile" } });
        expect((b.container.querySelector(".tile-grid") as HTMLElement).hasAttribute("style")).toBe(false);
    });

    it('tileLayout="row" marks the tiles; the default does not', () => {
        const a = render(RadioGroup, { props: { legend: "A", options, appearance: "tile", tileLayout: "row" } });
        expect(a.container.querySelectorAll(".tile-row")).toHaveLength(5);
        cleanup();
        const b = render(RadioGroup, { props: { legend: "B", options, appearance: "tile" } });
        expect(b.container.querySelectorAll(".tile-row")).toHaveLength(0);
    });
});
