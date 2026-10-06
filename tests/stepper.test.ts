import { cleanup, render, screen, within } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import Stepper from "../src/components/molecules/Stepper.svelte";
import {
    STEPPER_STRINGS,
    clampStep,
    normalizeSteps,
    stepState,
} from "../src/components/util/stepper";
import StepperHarness from "./fixtures/StepperHarness.svelte";

afterEach(() => {
    cleanup();
    vi.useRealTimers();
});

const nav = () => screen.getByRole("navigation");
const list = () => within(nav()).getByRole("list");
const items = () => within(list()).getAllByRole("listitem");
/** What a screen reader reads for each step: the text that is not hidden from it. */
const read = () =>
    items().map((item) => {
        const copy = item.cloneNode(true) as HTMLElement;
        for (const hidden of copy.querySelectorAll('[aria-hidden="true"]')) hidden.remove();
        return copy.textContent!.replace(/\s+/g, " ").trim();
    });
const states = () => items().map((item) => item.getAttribute("data-state"));
const bound = () => screen.getByTestId("bound").textContent;
const status = () => document.querySelector("[data-stepper-status]")!;
const summary = () => document.querySelector<HTMLElement>("[data-stepper-summary]")!;
const press = (name: string) => userEvent.click(screen.getByRole("button", { name }));

describe("stepper helpers", () => {
    it("takes labels and objects alike", () => {
        expect(normalizeSteps(["A", { label: "B", description: "b" }])).toEqual([
            { label: "A" },
            { label: "B", description: "b" },
        ]);
        expect(normalizeSteps(undefined)).toEqual([]);
    });

    it("holds the current step within the steps", () => {
        expect(clampStep(1, 3)).toBe(1);
        expect(clampStep(-4, 3)).toBe(0);
        expect(clampStep(3, 3)).toBe(2);
        expect(clampStep(99, 3)).toBe(2);
        expect(clampStep(Infinity, 3)).toBe(2);
        expect(clampStep(-Infinity, 3)).toBe(0);
        expect(clampStep(1.9, 3)).toBe(1);
        expect(clampStep(Number.NaN, 3)).toBe(0);
        expect(clampStep(undefined, 3)).toBe(0);
        expect(clampStep(null, 3)).toBe(0);
        expect(clampStep(0, 0)).toBe(-1);
    });

    it("names the state of a step from where the current one is", () => {
        expect([0, 1, 2].map((index) => stepState(index, 1))).toEqual([
            "completed",
            "current",
            "upcoming",
        ]);
    });

    it("has English strings with the step counted from 1", () => {
        expect(STEPPER_STRINGS.position(2, 3)).toBe("Step 2 of 3");
        expect(STEPPER_STRINGS.stepLabel(1, 3, "Details", "completed")).toBe(
            "Step 1 of 3: Details, completed",
        );
        expect(STEPPER_STRINGS.stepLabel(3, 3, "Result", "upcoming")).toBe(
            "Step 3 of 3: Result, upcoming",
        );
        expect(STEPPER_STRINGS.announcement(2, 3, "Ratings")).toBe("Step 2 of 3: Ratings");
    });
});

describe("Stepper", () => {
    it("is a navigation landmark named Progress, holding one ordered list of the steps", () => {
        render(StepperHarness);
        expect(screen.getByRole("navigation", { name: "Progress" })).toBe(nav());
        expect(list().tagName).toBe("OL");
        expect(items()).toHaveLength(3);
        // One list: the compact line is not a second one.
        expect(within(nav()).getAllByRole("list")).toHaveLength(1);
    });

    it("reads each step as its number, its label and its state", () => {
        render(StepperHarness);
        expect(read()).toEqual([
            "Step 1 of 3: Details, completed",
            "Step 2 of 3: Ratings, current",
            "Step 3 of 3: Result + notes, upcoming",
        ]);
        expect(states()).toEqual(["completed", "current", "upcoming"]);
    });

    it("marks the current step, and only it, with aria-current", () => {
        render(StepperHarness);
        expect(items().map((item) => item.getAttribute("aria-current"))).toEqual([
            null,
            "step",
            null,
        ]);
    });

    it("shows state by more than colour: a check for completed, the number for the others", () => {
        render(StepperHarness);
        const markers = items().map((item) => item.querySelector(".stepper-marker")!);
        expect(markers.every((marker) => marker.getAttribute("aria-hidden") === "true")).toBe(true);
        expect(markers[0].querySelector("svg")).not.toBeNull();
        expect(markers[0].textContent!.trim()).toBe("");
        expect(markers[1].querySelector("svg")).toBeNull();
        expect(markers[1].textContent!.trim()).toBe("2");
        expect(markers[2].textContent!.trim()).toBe("3");
    });

    it("keeps the visible repeats of the list away from a screen reader", () => {
        render(StepperHarness);
        expect(summary().getAttribute("aria-hidden")).toBe("true");
        expect(summary().textContent!.replace(/\s+/g, " ").trim()).toBe("Step 2 of 3 — Ratings");
        for (const label of document.querySelectorAll(".stepper-label")) {
            expect(label.getAttribute("aria-hidden")).toBe("true");
        }
    });

    it("reads a description after the step, and shows the current one in the compact line", () => {
        render(Stepper, {
            steps: [
                { label: "Details", description: "Place and date" },
                { label: "Ratings", description: "Quiz, food and mood" },
            ],
            current: 1,
        });
        expect(read()).toEqual([
            "Step 1 of 2: Details, completed Place and date",
            "Step 2 of 2: Ratings, current Quiz, food and mood",
        ]);
        expect(summary().textContent).toContain("Quiz, food and mood");
        expect(summary().textContent).not.toContain("Place and date");
    });

    it("starts at the first step when current is not given", () => {
        render(Stepper, { steps: ["A", "B"] });
        expect(states()).toEqual(["current", "upcoming"]);
    });

    it("shows a value outside the steps as the nearest step, and leaves the bound value alone", async () => {
        render(StepperHarness, { initial: -3 });
        expect(states()).toEqual(["current", "upcoming", "upcoming"]);
        expect(bound()).toBe("-3");

        await press("Far");
        expect(states()).toEqual(["completed", "completed", "current"]);
        expect(bound()).toBe("99");
        expect(summary().textContent).toContain("Step 3 of 3");
    });

    it("follows the bound value", async () => {
        render(StepperHarness, { initial: 0 });
        await press("Next");
        expect(states()).toEqual(["completed", "current", "upcoming"]);
        await press("Next");
        expect(states()).toEqual(["completed", "completed", "current"]);
        await press("Back");
        expect(states()).toEqual(["completed", "current", "upcoming"]);
        expect(bound()).toBe("1");
    });

    it("renders nothing without steps", () => {
        render(Stepper, { steps: [] });
        expect(screen.queryByRole("navigation")).toBeNull();
    });

    it("puts class, size, layout and other attributes on the host", () => {
        render(StepperHarness, { size: "lg", layout: "compact" });
        expect(nav().className).toContain("from-the-app");
        expect(nav().getAttribute("data-testid")).toBe("stepper");
        expect(nav().getAttribute("data-size")).toBe("lg");
        expect(nav().getAttribute("data-layout")).toBe("compact");
    });

    it("is medium and automatic by default", () => {
        render(Stepper, { steps: ["A", "B"] });
        expect(nav().getAttribute("data-size")).toBe("md");
        expect(nav().getAttribute("data-layout")).toBe("auto");
    });

    it("takes another name, or the element that names it", () => {
        render(Stepper, { steps: ["A", "B"], label: "Log visit" });
        expect(screen.getByRole("navigation", { name: "Log visit" })).toBe(nav());
        cleanup();

        render(Stepper, { steps: ["A", "B"], "aria-labelledby": "elsewhere" });
        expect(nav().hasAttribute("aria-label")).toBe(false);
        expect(nav().getAttribute("aria-labelledby")).toBe("elsewhere");
    });

    it("has nothing to press or to Tab to unless interactive", () => {
        render(Stepper, { steps: ["A", "B", "C"], current: 2 });
        expect(within(nav()).queryAllByRole("button")).toHaveLength(0);
        expect(nav().querySelectorAll("[tabindex]")).toHaveLength(0);
    });

    it("replaces every string", () => {
        render(StepperHarness, {
            label: "Förlopp",
            strings: {
                position: (step: number, total: number) => `Steg ${step} av ${total}`,
                stepLabel: (step: number, total: number, label: string, state: string) =>
                    `Steg ${step} av ${total}: ${label} (${state})`,
            },
        });
        expect(screen.getByRole("navigation", { name: "Förlopp" })).toBe(nav());
        expect(read()[0]).toBe("Steg 1 av 3: Details (completed)");
        expect(summary().textContent!.replace(/\s+/g, " ").trim()).toBe("Steg 2 av 3 — Ratings");
        expect(nav().textContent).not.toContain("Step ");
    });
});

describe("Stepper, interactive", () => {
    it("makes the completed steps buttons, in the order of the steps, and no others", () => {
        render(StepperHarness, { interactive: true, initial: 2 });
        const buttons = within(nav()).getAllByRole("button");
        expect(buttons.map((button) => button.textContent!.replace(/\s+/g, " ").trim())).toEqual([
            "Step 1 of 3: Details, completed Details",
            "Step 2 of 3: Ratings, completed Ratings",
        ]);
        expect(
            within(nav()).getByRole("button", { name: "Step 1 of 3: Details, completed" }),
        ).toBe(buttons[0]);
        expect(buttons.every((button) => button.getAttribute("type") === "button")).toBe(true);
        // The current step is not a button, and not a Tab stop.
        expect(items()[2].querySelector("button")).toBeNull();
        expect(items()[2].querySelector(".stepper-body")!.getAttribute("tabindex")).toBe("-1");
    });

    it("goes back to a completed step on a press, tells the app, and updates the bound value", async () => {
        const onstepchange = vi.fn();
        render(StepperHarness, { interactive: true, initial: 2, onstepchange });
        await userEvent.click(
            within(nav()).getByRole("button", { name: "Step 1 of 3: Details, completed" }),
        );
        expect(states()).toEqual(["current", "upcoming", "upcoming"]);
        expect(bound()).toBe("0");
        expect(onstepchange).toHaveBeenCalledTimes(1);
        expect(onstepchange).toHaveBeenCalledWith(0);
        expect(within(nav()).queryAllByRole("button")).toHaveLength(0);
    });

    it("keeps focus on the step that was pressed, which is no longer a button", async () => {
        render(StepperHarness, { interactive: true, initial: 2 });
        await userEvent.click(
            within(nav()).getByRole("button", { name: "Step 2 of 3: Ratings, completed" }),
        );
        const body = items()[1].querySelector(".stepper-body")!;
        expect(body.tagName).toBe("SPAN");
        expect(document.activeElement).toBe(body);
    });

    it("works from the keyboard: Tab reaches the buttons in order, Enter and Space press", async () => {
        const user = userEvent.setup();
        render(StepperHarness, { interactive: true, initial: 2 });
        await user.tab();
        expect(document.activeElement).toBe(
            within(nav()).getByRole("button", { name: "Step 1 of 3: Details, completed" }),
        );
        await user.tab();
        expect(document.activeElement).toBe(
            within(nav()).getByRole("button", { name: "Step 2 of 3: Ratings, completed" }),
        );
        await user.keyboard("{Enter}");
        expect(bound()).toBe("1");
        await user.keyboard("{Shift>}{Tab}{/Shift}");
        await user.keyboard(" ");
        expect(bound()).toBe("0");
    });

    it("does nothing on a press of the current step or of one after it", async () => {
        const onstepchange = vi.fn();
        render(StepperHarness, { interactive: true, initial: 1, onstepchange });
        for (const index of [1, 2]) {
            await userEvent.click(items()[index].querySelector(".stepper-body")!);
        }
        expect(states()).toEqual(["completed", "current", "upcoming"]);
        expect(bound()).toBe("1");
        expect(onstepchange).not.toHaveBeenCalled();
    });

    it("does not call onstepchange when the app moves the step", async () => {
        const onstepchange = vi.fn();
        render(StepperHarness, { interactive: true, initial: 0, onstepchange });
        await press("Next");
        expect(onstepchange).not.toHaveBeenCalled();
    });
});

describe("Stepper, announcing", () => {
    it("has a polite status that is empty at first", () => {
        render(StepperHarness);
        expect(status().getAttribute("role")).toBe("status");
        expect(status().textContent).toBe("");
    });

    it("says the new step once when it changes, and then takes the words away", async () => {
        vi.useFakeTimers({ shouldAdvanceTime: true });
        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
        render(StepperHarness, { initial: 0 });

        const said: string[] = [];
        const observer = new MutationObserver(() => {
            if (status().textContent) said.push(status().textContent!);
        });
        observer.observe(status(), { childList: true, characterData: true, subtree: true });

        await user.click(screen.getByRole("button", { name: "Next" }));
        expect(status().textContent).toBe("Step 2 of 3: Ratings");
        expect(document.activeElement).toBe(screen.getByRole("button", { name: "Next" }));

        await vi.advanceTimersByTimeAsync(3100);
        expect(status().textContent).toBe("");
        expect(said).toEqual(["Step 2 of 3: Ratings"]);
        observer.disconnect();
    });

    it("says nothing when the value changes but the step shown does not", async () => {
        render(StepperHarness, { initial: 2 });
        await press("Far");
        expect(status().textContent).toBe("");
    });

    it("says a step the user went back to, in the app's own words", async () => {
        render(StepperHarness, {
            interactive: true,
            initial: 2,
            strings: {
                announcement: (step: number, total: number, label: string) =>
                    `Steg ${step} av ${total}: ${label}`,
            },
        });
        await userEvent.click(within(nav()).getAllByRole("button")[0]);
        expect(status().textContent).toBe("Steg 1 av 3: Details");
    });
});
