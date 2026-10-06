import { cleanup, render, screen, waitFor } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import Input from "../src/components/atoms/Input.svelte";
import Select from "../src/components/atoms/Select.svelte";
import Textarea from "../src/components/atoms/Textarea.svelte";
import SelectDisabledOptionHarness from "./fixtures/SelectDisabledOptionHarness.svelte";

afterEach(() => {
    cleanup();
});

const classesOf = (element: Element) => element.className.split(/\s+/);

/**
 * iOS Safari zooms the page when a focused field is under 16px. jsdom applies
 * no stylesheet, so these pin the classes; the computed font size and the
 * unchanged heights are measured in playwright/text-field-size.spec.ts.
 */
describe("text fields are 16px below the sm breakpoint", () => {
    it.each(["sm", "md"] as const)("Input size %s keeps text-sm from sm up", (size) => {
        render(Input, { props: { label: "Name", size } });
        const classes = classesOf(screen.getByLabelText("Name"));

        expect(classes).toContain("max-sm:text-base");
        expect(classes).toContain("text-sm");
    });

    it("keeps the 16px floor when a caller sets its own text size", () => {
        render(Input, { props: { label: "Search", class: "text-xs" } });
        const classes = classesOf(screen.getByLabelText("Search"));

        expect(classes).toContain("text-xs");
        expect(classes).not.toContain("text-sm");
        expect(classes).toContain("max-sm:text-base");
    });

    it("Textarea", () => {
        render(Textarea, { props: { label: "Notes" } });
        const classes = classesOf(screen.getByLabelText("Notes"));

        expect(classes).toEqual(expect.arrayContaining(["text-sm", "max-sm:text-base", "leading-6"]));
    });

    it.each(["sm", "md"] as const)("Select trigger size %s", (size) => {
        render(Select, { props: { label: "Plan", size, options: [] } });

        expect(classesOf(screen.getByLabelText("Plan"))).toEqual(
            expect.arrayContaining(["text-sm", "max-sm:text-base"]),
        );
    });

    it("leaves labels and the lg size as they were", () => {
        const { container } = render(Input, { props: { label: "Name", size: "lg" } });

        expect(classesOf(screen.getByLabelText("Name"))).not.toContain("max-sm:text-base");
        expect(classesOf(container.querySelector("label") as Element)).not.toContain(
            "max-sm:text-base",
        );
    });
});

describe("Select: a disabled option", () => {
    it("is passed by the arrow keys in both directions, and cannot be chosen", async () => {
        const user = userEvent.setup();
        render(SelectDisabledOptionHarness);

        screen.getByLabelText("Plan").focus();
        await user.keyboard("{Enter}");
        const [alpha, bravo, charlie] = await screen.findAllByRole("option");
        await waitFor(() => expect(document.activeElement).toBe(alpha));

        // A natively disabled button cannot take focus, so ArrowDown stopped at Alpha.
        expect(bravo.hasAttribute("disabled")).toBe(false);
        expect(bravo.getAttribute("aria-disabled")).toBe("true");
        await user.keyboard("{ArrowDown}");
        expect(document.activeElement).toBe(bravo);
        await user.keyboard("{ArrowDown}");
        expect(document.activeElement).toBe(charlie);
        await user.keyboard("{ArrowUp}{ArrowUp}");
        expect(document.activeElement).toBe(alpha);

        await user.keyboard("{ArrowDown}{Enter}");
        expect(screen.getByTestId("bound").textContent).toBe("");
        await user.click(bravo);
        expect(screen.getByTestId("bound").textContent).toBe("");
        // Refusing the option leaves the list open.
        expect(screen.getByRole("listbox")).toBeTruthy();

        await user.click(charlie);
        expect(screen.getByTestId("bound").textContent).toBe("c");
    });
});
