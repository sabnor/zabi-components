import { cleanup, render, screen, within } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import ChipHarness from "./fixtures/ChipHarness.svelte";

/**
 * Chip's inputs are bound, as Checkbox and Radio are (tests/hydration-value.test.ts),
 * so that a choice made before the page hydrated is kept. jsdom cannot hold a
 * page between its markup and its scripts, so that part is not shown here: it
 * needs the real-browser pattern of playwright/hydration-value.spec.ts. What can
 * be shown is that binding changed nothing else.
 */

afterEach(cleanup);

const state = () => JSON.parse(screen.getByTestId("state").textContent!);
const settle = () => new Promise((resolve) => setTimeout(resolve, 20));
const plan = () => within(screen.getByRole("radiogroup", { name: "Plan" }));
const toppings = () => within(screen.getByRole("group", { name: "Toppings" }));
const checkedValues = (group: ReturnType<typeof within>, role: "radio" | "checkbox") =>
    (group.getAllByRole(role) as HTMLInputElement[]).filter((input) => input.checked).map((input) => input.value);

describe("mounted in the browser only", () => {
    it("shows the state it is given and reports nothing", async () => {
        const onreport = vi.fn();
        render(ChipHarness, { props: { pressed: true, agreed: true, plan: "pro", toppings: ["ham"], onreport } });
        expect((screen.getByRole("checkbox", { name: "Terms" }) as HTMLInputElement).checked).toBe(true);
        expect(screen.getByRole("button", { name: "Open now" }).getAttribute("aria-pressed")).toBe("true");
        expect(checkedValues(plan(), "radio")).toEqual(["pro"]);
        expect(checkedValues(toppings(), "checkbox")).toEqual(["ham"]);
        await settle();
        expect(onreport).not.toHaveBeenCalled();
        expect(state()).toEqual({ pressed: true, agreed: true, plan: "pro", toppings: ["ham"] });
    });

    it("starts empty without reporting, and without changing the parent's state", async () => {
        const onreport = vi.fn();
        render(ChipHarness, { props: { onreport } });
        await settle();
        expect(onreport).not.toHaveBeenCalled();
        expect(state()).toEqual({ pressed: false, agreed: false, plan: null, toppings: [] });
    });
});

describe("a change by the user", () => {
    it("is reported once, for a checkbox chip and a group alike", async () => {
        const onreport = vi.fn();
        render(ChipHarness, { props: { onreport } });
        await userEvent.click(screen.getByRole("checkbox", { name: "Terms" }));
        await userEvent.click(plan().getByRole("radio", { name: "Basic" }));
        await userEvent.click(toppings().getByRole("checkbox", { name: "Ham" }));
        await settle();
        expect(onreport.mock.calls).toEqual([["checkbox", true], ["plan", "basic"], ["toppings", ["ham"]]]);
    });
});

describe("a form reset", () => {
    it("takes every input back to what the form was, and the state follows", async () => {
        render(ChipHarness);
        await userEvent.click(screen.getByRole("checkbox", { name: "Terms" }));
        await userEvent.click(plan().getByRole("radio", { name: "Pro" }));
        await userEvent.click(toppings().getByRole("checkbox", { name: "Cheese" }));
        expect(state()).toMatchObject({ agreed: true, plan: "pro", toppings: ["cheese"] });
        await userEvent.click(screen.getByRole("button", { name: "Reset" }));
        await settle();
        expect(state()).toEqual({ pressed: false, agreed: false, plan: null, toppings: [] });
    });
});
