import { cleanup, render, screen } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";

import RadioGroup from "../src/components/molecules/RadioGroup.svelte";

afterEach(cleanup);

describe("RadioGroup option description (Z-092)", () => {
    const options = [
        { value: "a", label: "Follow the phone", description: "Light by day, dark at night" },
        { value: "b", label: "Light" },
    ];

    it("names the radio by its label and describes it by the description", () => {
        render(RadioGroup, { props: { legend: "Theme", options } });
        const radio = screen.getByRole("radio", { name: "Follow the phone", exact: true });
        const description = screen.getByText("Light by day, dark at night");
        expect(description.getAttribute("aria-hidden")).toBe("true");
        expect(radio.getAttribute("aria-describedby")).toBe(description.id);
        expect(screen.getByRole("radio", { name: "Light" }).hasAttribute("aria-describedby")).toBe(false);
    });

    it("centres a one-line row and keeps a described row at the top", () => {
        render(RadioGroup, { props: { legend: "Theme", options } });
        const rowOf = (name: string) => screen.getByRole("radio", { name }).closest("label") as HTMLElement;
        expect(rowOf("Light").className.split(/\s+/)).toContain("items-center");
        expect(rowOf("Follow the phone").className.split(/\s+/)).not.toContain("items-center");
        expect(rowOf("Follow the phone").className.split(/\s+/)).toContain("items-start");
    });
});
