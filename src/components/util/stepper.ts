/** Types and pure helpers for `Stepper`. Kept out of the component so they can be tested without a DOM. */

/** One step: a label, and optionally a line under it. A plain string is a step with only a label. */
export interface StepperStep {
    label: string;
    /** A short line under the label in the full layout, and under the current step's name in the compact one. */
    description?: string;
}

/** A step as the `steps` prop takes it. */
export type StepperItem = string | StepperStep;

/** Where a step is in the flow. */
export type StepperStepState = "completed" | "current" | "upcoming";

export type StepperLayout = "auto" | "full" | "compact";

/**
 * Every built-in string. Pass a partial object to `strings` to translate.
 * `step` is counted from 1 in all of them.
 */
export interface StepperStrings {
    /** The visible start of the compact line: "Step 2 of 3". */
    position: (step: number, total: number) => string;
    /**
     * What a screen reader reads for a step, and the name of its button when
     * the step is one: "Step 1 of 3: Details, completed".
     */
    stepLabel: (step: number, total: number, label: string, state: StepperStepState) => string;
    /** Read out, politely, when the current step changes: "Step 2 of 3: Ratings". */
    announcement: (step: number, total: number, label: string) => string;
}

const STATE_WORDS: Record<StepperStepState, string> = {
    completed: "completed",
    current: "current",
    upcoming: "upcoming",
};

export const STEPPER_STRINGS: StepperStrings = {
    position: (step, total) => `Step ${step} of ${total}`,
    stepLabel: (step, total, label, state) =>
        `Step ${step} of ${total}: ${label}, ${STATE_WORDS[state]}`,
    announcement: (step, total, label) => `Step ${step} of ${total}: ${label}`,
};

/** Strings and objects alike, as objects. */
export function normalizeSteps(steps: readonly StepperItem[] | null | undefined): StepperStep[] {
    return (steps ?? []).map((step) => (typeof step === "string" ? { label: step } : step));
}

/**
 * The index of the step that is shown as current: `current` as a whole number
 * held within the steps. Below the first step it is the first, past the last
 * it is the last, and something that is not a number is the first. `-1` when
 * there are no steps.
 */
export function clampStep(current: number | null | undefined, total: number): number {
    if (total <= 0) return -1;
    if (current === null || current === undefined || Number.isNaN(current)) return 0;
    if (current === Infinity) return total - 1;
    if (current === -Infinity) return 0;
    return Math.max(0, Math.min(total - 1, Math.trunc(current)));
}

/** The state of the step at `index` when the step at `current` is the current one. */
export function stepState(index: number, current: number): StepperStepState {
    if (index < current) return "completed";
    return index === current ? "current" : "upcoming";
}
