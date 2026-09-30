import { cleanup, render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import IconButton from "../src/components/atoms/IconButton.svelte";
import IconButtonHarness from "./fixtures/IconButtonHarness.svelte";

/**
 * QA review of 4411e02. Gaps the package's own tests leave open. What the
 * review found wrong (the pressed style surviving `disabled`, and the `xs`
 * touch area covering a neighbour) is a matter of rendered CSS and hit
 * testing, which jsdom has neither of; those are described in the QA-2
 * report with the browser measurements, not asserted here.
 */

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

const button = (name = "Bold") => screen.getByRole("button", { name });

describe("IconButton (QA): toggle edge cases", () => {
    it.each([{ disabled: true }, { loading: true }])(
        "does not flip or call onclick while %o",
        async (blocked) => {
            const user = userEvent.setup();
            const onclick = vi.fn();
            render(IconButton, {
                props: { label: "Bold", pressed: true, onclick, ...blocked },
            });

            await user.click(button());

            expect(onclick).not.toHaveBeenCalled();
            // The state is still exposed: a disabled toggle is "pressed, unavailable".
            expect(button().getAttribute("aria-pressed")).toBe("true");
            expect((button() as HTMLButtonElement).disabled).toBe(true);
        },
    );

    it("flips with Space and with Enter, once per key", async () => {
        const user = userEvent.setup();
        render(IconButtonHarness, { props: { mode: "bind" } });

        button().focus();
        await user.keyboard(" ");
        expect(button().getAttribute("aria-pressed")).toBe("true");
        expect(screen.getByTestId("bound").textContent).toBe("true");
        await user.keyboard("{Enter}");
        expect(button().getAttribute("aria-pressed")).toBe("false");
        expect(screen.getByTestId("bound").textContent).toBe("false");
    });

    it("follows the parent when a one-way value changes without a click", async () => {
        const { rerender } = render(IconButton, {
            props: { label: "Bold", pressed: false },
        });
        await rerender({ pressed: true });
        expect(button().getAttribute("aria-pressed")).toBe("true");

        // Back to a plain button: the attribute goes, it is not left as "false".
        await rerender({ pressed: undefined });
        expect(button().hasAttribute("aria-pressed")).toBe(false);
    });

    it("stays in step over several clicks in one-way mode", async () => {
        const user = userEvent.setup();
        render(IconButtonHarness, { props: { mode: "one-way" } });

        for (const expected of ["true", "false", "true"]) {
            await user.click(button());
            expect(button().getAttribute("aria-pressed")).toBe(expected);
            expect(screen.getByTestId("bound").textContent).toBe(expected);
        }
    });

    it("lets the consumer's own attributes through without losing the name", () => {
        render(IconButton, {
            props: { label: "Delete row", size: "xs", tone: "danger", variant: "ghost", "data-row": "7" },
        });
        expect(button("Delete row").getAttribute("data-row")).toBe("7");
        expect(button("Delete row").getAttribute("type")).toBe("button");
    });
});
