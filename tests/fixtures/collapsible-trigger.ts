import { screen } from "@testing-library/svelte";

/**
 * The trigger of a `Collapsible` by its visible text: a `<summary>` for the
 * default trigger, a `<button>` for a custom one. A summary has no ARIA role
 * of its own in the testing library, so role queries cannot find it.
 */
export function triggerByText(name: string): HTMLElement {
    const summary = [...document.querySelectorAll("summary")].find(
        (element) => element.textContent?.trim() === name,
    );
    return summary ?? screen.getByRole("button", { name });
}

/** The `<details>` that holds a default trigger. */
export function detailsOf(trigger: HTMLElement): HTMLDetailsElement {
    const details = trigger.closest("details");
    if (!details) throw new Error("the trigger is not inside a <details>");
    return details;
}
