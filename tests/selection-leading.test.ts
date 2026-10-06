import { cleanup, render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import Checkbox from "../src/components/atoms/Checkbox.svelte";
import Radio from "../src/components/atoms/Radio.svelte";
import Toggle from "../src/components/atoms/Toggle.svelte";
import LeadingHarness from "./fixtures/SelectionLeadingHarness.svelte";

afterEach(cleanup);

const cases = [
    ["checkbox", "checkbox"],
    ["radio", "radio"],
    ["toggle", "switch"],
] as const;

describe("leading snippet on Checkbox, Radio and Toggle", () => {
    it.each(cases)("%s: control, leading, text in order inside one label, named by the label", (control, role) => {
        const { container } = render(LeadingHarness, { props: { control } });
        const labels = container.querySelectorAll("label");
        expect(labels).toHaveLength(1);
        const label = labels[0];
        const leading = label.querySelector('[data-testid="leading"]')!;
        expect(leading).toBeTruthy();
        // The control (input or switch button) comes first, then the leading element, then the name.
        const input = screen.getByRole(role, { name: "Anna" });
        expect(input.compareDocumentPosition(leading) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
        const html = container.innerHTML;
        expect(html.indexOf('data-testid="leading"')).toBeLessThan(html.lastIndexOf("Anna"));
        expect(leading.closest("label")).toBe(label);
    });

    it.each(cases)("%s: pressing the leading element operates the control", async (control, role) => {
        render(LeadingHarness, { props: { control } });
        const user = userEvent.setup();
        await user.click(screen.getByTestId("leading"));
        const el = screen.getByRole(role);
        if (role === "switch") expect(el.getAttribute("aria-checked")).toBe("true");
        else expect((el as HTMLInputElement).checked).toBe(true);
    });

    it.each(cases)("%s: leading without a label still renders", (control) => {
        render(LeadingHarness, { props: { control, label: "" } });
        expect(screen.getByTestId("leading")).toBeTruthy();
    });

    it("leading gives the same spacing logic with logical gap, not margins", () => {
        const { container } = render(LeadingHarness, { props: { control: "checkbox" } });
        expect(container.querySelector("label")!.className).not.toMatch(/\b(ml|mr)-/);
    });

    it.each([
        ["Checkbox", Checkbox],
        ["Radio", Radio],
        ["Toggle", Toggle],
    ])("%s: without leading no wrapper is added", (_name, component) => {
        const { container } = render(component as never, { props: { label: "Anna" } as never });
        const label = container.querySelector("label")!;
        expect(label.querySelector("span.shrink-0.inline-flex, span.inline-flex.shrink-0")).toBeNull();
        expect(label.className).not.toContain("gap-3 ");
    });
});
