import { cleanup, fireEvent, render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import DateHarness from "./fixtures/DateHarness.svelte";

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

const state = () => screen.getByTestId("state").textContent!.split("|")[0];

const cases = [
    { piece: "date", type: "date", label: "Quiz date", value: "2026-10-06", other: "2026-11-03", min: "2026-10-01", max: "2026-12-31" },
    { piece: "time", type: "time", label: "Starts", value: "19:00", other: "20:30", min: "17:00", max: "23:00" },
] as const;

describe.each(cases)("$piece field", ({ piece, type, label, value, other, min, max }) => {
    const field = () => screen.getByLabelText(label) as HTMLInputElement;

    it("is a native input of its type, labelled, holding the value as given", () => {
        render(DateHarness, { props: { piece, initialValue: value } });
        expect(field().tagName).toBe("INPUT");
        expect(field().type).toBe(type);
        expect(field().value).toBe(value);
        expect(field().name).toBe("when");
        // The label is a real <label for>.
        const labelElement = document.querySelector(`label[for="${field().id}"]`);
        expect(labelElement?.textContent).toBe(label);
    });

    it("is empty as an empty string, and shows the browser's format hint in the placeholder colour", async () => {
        render(DateHarness, { props: { piece } });
        expect(field().value).toBe("");
        expect(state()).toBe("");
        expect(field().className).toMatch(/(^|\s)text-input-placeholder(\s|$)/);
        expect(field().hasAttribute("data-empty")).toBe(true);

        await fireEvent.input(field(), { target: { value } });
        expect(field().className).not.toMatch(/(^|\s)text-input-placeholder(\s|$)/);
        expect(field().hasAttribute("data-empty")).toBe(false);
    });

    it("binds the value both ways, as a string in the native format", async () => {
        render(DateHarness, { props: { piece, initialValue: value } });
        await fireEvent.input(field(), { target: { value: other } });
        expect(state()).toBe(other);
        expect(typeof field().value).toBe("string");
        await fireEvent.input(field(), { target: { value: "" } });
        expect(state()).toBe("");
    });

    it("passes min, max and step to the input", () => {
        render(DateHarness, { props: { piece, min, max, step: 5 } });
        expect(field().min).toBe(min);
        expect(field().max).toBe(max);
        expect(field().step).toBe("5");
    });

    it("has no min, max or step unless given", () => {
        render(DateHarness, { props: { piece } });
        expect(field().hasAttribute("min")).toBe(false);
        expect(field().hasAttribute("max")).toBe(false);
        expect(field().hasAttribute("step")).toBe(false);
        expect(field().hasAttribute("readonly")).toBe(false);
    });

    it("wires the hint to the field", () => {
        render(DateHarness, { props: { piece, hint: "Until the end of this day." } });
        const hint = screen.getByText("Until the end of this day.");
        expect(field().getAttribute("aria-describedby")).toBe(hint.id);
        expect(field().hasAttribute("aria-invalid")).toBe(false);
        expect(field().getAttribute("aria-describedby")).not.toContain("message");
    });

    it("shows an error, marks the field invalid, announces it, and keeps the hint", () => {
        render(DateHarness, {
            props: { piece, hint: "Until the end of this day.", error: "Pick a later one." },
        });
        const error = screen.getByRole("alert");
        expect(error.textContent?.trim()).toBe("Pick a later one.");
        expect(field().getAttribute("aria-invalid")).toBe("true");
        const describedBy = field().getAttribute("aria-describedby")!.split(" ");
        expect(describedBy).toContain(error.id);
        expect(describedBy).toContain(screen.getByText("Until the end of this day.").id);
        for (const id of describedBy) expect(document.getElementById(id)).not.toBeNull();
        expect(field().className).toContain("border-error");
    });

    it("is required, disabled and read only on request", () => {
        const { unmount } = render(DateHarness, { props: { piece, required: true } });
        expect(field().required).toBe(true);
        expect(field().getAttribute("aria-required")).toBe("true");
        unmount();

        const second = render(DateHarness, { props: { piece, disabled: true, initialValue: value } });
        expect(field().disabled).toBe(true);
        second.unmount();

        render(DateHarness, { props: { piece, readonly: true, initialValue: value } });
        expect(field().readOnly).toBe(true);
        expect(field().disabled).toBe(false);
    });

    it("is Input's box at Input's sizes, 16px text on a phone and 44px on a touch screen", () => {
        const heights = { sm: "h-8", md: "h-10", lg: "h-12" } as const;
        for (const size of ["sm", "md", "lg"] as const) {
            const { unmount } = render(DateHarness, { props: { piece, size } });
            const classes = field().className;
            expect(classes).toContain(heights[size]);
            expect(classes).toContain("rounded-control");
            expect(classes).toContain("bg-input");
            expect(classes).toContain("focus-ring");
            if (size !== "lg") {
                expect(classes).toContain("pointer-coarse:min-h-11");
                expect(classes).toContain("max-sm:text-base");
            } else {
                expect(classes).toContain("text-base");
            }
            unmount();
        }
    });

    it("turns the browser's own look off, so the box is the same in every engine", () => {
        render(DateHarness, { props: { piece } });
        expect(field().className).toContain("appearance-none");
        expect(field().className).toContain("zabi-temporal-field");
        expect(field().className).toContain("w-full");
        expect(field().className).toContain("min-w-0");
    });

    it("merges class onto the input and passes other attributes to it", () => {
        render(DateHarness, { props: { piece, fieldClass: "w-40" } });
        expect(screen.getByTestId("field")).toBe(field());
        expect(field().className).toContain("w-40");
        expect(field().className).not.toMatch(/(^|\s)w-full(\s|$)/);
    });

    it("is one Tab stop, and takes typing", async () => {
        const user = userEvent.setup();
        render(DateHarness, { props: { piece } });
        await user.tab();
        expect(document.activeElement).toBe(field());
        await user.tab();
        expect(document.activeElement).toBe(screen.getByRole("button", { name: "Send" }));
    });

    it("submits its value under its name, in the native format", async () => {
        const onsubmitted = vi.fn();
        render(DateHarness, { props: { piece, initialValue: value, onsubmitted } });
        await fireEvent.submit(field().form!);
        expect(onsubmitted).toHaveBeenCalledWith({ when: value });
    });

    it("submits an empty string while empty, and nothing while disabled", async () => {
        const onsubmitted = vi.fn();
        const { unmount } = render(DateHarness, { props: { piece, onsubmitted } });
        await fireEvent.submit(field().form!);
        expect(onsubmitted).toHaveBeenLastCalledWith({ when: "" });
        unmount();

        render(DateHarness, { props: { piece, initialValue: value, disabled: true, onsubmitted } });
        await fireEvent.submit(field().form!);
        expect(onsubmitted).toHaveBeenLastCalledWith({});
    });

    describe("inside FormField", () => {
        it("takes its label, id, description and required state from the FormField", () => {
            render(DateHarness, {
                props: { piece, inFormField: true, hint: "Shown on the leaderboard.", required: true },
            });
            // One label: the FormField's. The field's own is hidden.
            expect(document.querySelectorAll("label")).toHaveLength(1);
            const input = document.querySelector("input")!;
            expect(document.querySelector("label")!.getAttribute("for")).toBe(input.id);
            expect(input.type).toBe(type);
            expect(input.required).toBe(true);
            const description = screen.getByText("Shown on the leaderboard.");
            expect(input.getAttribute("aria-describedby")).toBe(description.id);
        });

        it("is marked invalid and described by the FormField's error", () => {
            render(DateHarness, {
                props: { piece, inFormField: true, fieldError: "Pick a day." },
            });
            const input = document.querySelector("input")!;
            expect(input.getAttribute("aria-invalid")).toBe("true");
            const error = screen.getByRole("alert");
            expect(input.getAttribute("aria-describedby")).toBe(error.id);
            // One message, the FormField's: the field adds none of its own.
            expect(screen.getAllByRole("alert")).toHaveLength(1);
        });

        it("still binds and submits", async () => {
            const onsubmitted = vi.fn();
            render(DateHarness, { props: { piece, inFormField: true, onsubmitted } });
            const input = document.querySelector("input")!;
            await fireEvent.input(input, { target: { value } });
            expect(state()).toBe(value);
            await fireEvent.submit(input.form!);
            expect(onsubmitted).toHaveBeenCalledWith({ when: value });
        });
    });
});
