import { cleanup, render, screen } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";

import Input from "../src/components/atoms/Input.svelte";
import Textarea from "../src/components/atoms/Textarea.svelte";
import Fixture from "./fixtures/RequiredInFormField.svelte";

afterEach(cleanup);

describe.each([
    ["Input", Input],
    ["Textarea", Textarea],
] as const)("%s required marker", (_name, Component) => {
    it("draws the asterisk with the label's ::after, keeping its text and the name", () => {
        const { container } = render(Component as typeof Input, { label: "Email", required: true });
        const label = container.querySelector("label")!;
        expect(label.textContent).toBe("Email");
        expect(label.className).toContain("after:content-['*'_/_'']");
        expect(label.className).toContain("after:text-error");
        expect(screen.getByLabelText("Email")).toBeTruthy();
        expect(screen.getByRole("textbox", { name: "Email" })).toBeTruthy();
        expect((screen.getByRole("textbox") as HTMLInputElement).required).toBe(true);
    });

    it("has none when not required", () => {
        const { container } = render(Component as typeof Input, { label: "Email" });
        expect(container.querySelector("label")!.className).not.toContain("after:content");
    });

    it("has none without a label of its own", () => {
        const { container } = render(Component as typeof Input, { label: "Email", hideLabel: true, required: true });
        expect(container.querySelector("label")).toBeNull();
        expect(container.textContent).not.toContain("*");
    });
});

describe.each(["input", "textarea"] as const)("a %s inside FormField", (kind) => {
    it("shows only FormField's marker", () => {
        const { container } = render(Fixture, { kind });
        const stars = [...container.querySelectorAll("span")].filter((span) => span.textContent === "*");
        expect(stars).toHaveLength(1);
        expect(screen.getByRole("textbox", { name: /^Email/ })).toBeTruthy();
    });
});
