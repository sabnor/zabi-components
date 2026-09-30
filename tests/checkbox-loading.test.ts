import { cleanup, render, screen } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";

import Checkbox from "../src/components/atoms/Checkbox.svelte";

afterEach(cleanup);

const ringOf = (container: HTMLElement) => container.querySelector(".animate-spin");
const tickOf = (container: HTMLElement) => container.querySelector("svg");
const classesOf = (element: Element | null) =>
    (element?.getAttribute("class") ?? "").split(/\s+/);

/**
 * The loading ring used to be in the DOM all the time, hidden with
 * `opacity-0` and revealed by a busy selector that never matched, so
 * `loading` showed nothing. jsdom cannot evaluate that selector either; what
 * it can see is that the ring now exists only while loading.
 */
describe("Checkbox loading", () => {
    it("has no ring when it is not loading", () => {
        const { container } = render(Checkbox, { props: { label: "Agree", checked: true } });

        expect(ringOf(container)).toBeNull();
        expect(tickOf(container)).not.toBeNull();
    });

    it("shows the ring in place of the tick while loading, and is busy and disabled", () => {
        const { container } = render(Checkbox, {
            props: { label: "Agree", checked: true, loading: true },
        });
        const ring = ringOf(container);

        expect(ring).not.toBeNull();
        expect(ring?.getAttribute("aria-hidden")).toBe("true");
        // Nothing hides it: visibility is presence, not an opacity switch.
        expect(classesOf(ring).some((name) => name.includes("opacity-0"))).toBe(false);
        // The tick gives way, so the two never overlap.
        expect(tickOf(container)).toBeNull();

        const input = screen.getByRole("checkbox", { name: "Agree" }) as HTMLInputElement;
        expect(input.getAttribute("aria-busy")).toBe("true");
        expect(input.disabled).toBe(true);
        expect(input.checked).toBe(true);
    });

    it("keeps a gap in the ring and colours it for the fill behind it", async () => {
        const { container, rerender } = render(Checkbox, {
            props: { label: "Agree", loading: true },
        });
        // The ring is drawn in the text colour with a transparent top: a
        // border colour class of its own would repaint all four sides.
        expect(classesOf(ringOf(container))).toEqual(
            expect.arrayContaining(["border-current", "border-t-transparent", "text-brand-500"]),
        );

        await rerender({ checked: true });
        // On the checked fill it takes the tick's colour.
        expect(classesOf(ringOf(container))).toContain("text-action-primary");
        expect(classesOf(ringOf(container))).not.toContain("text-brand-500");
    });

    it("gives the tick back when loading ends", async () => {
        const { container, rerender } = render(Checkbox, {
            props: { label: "Agree", checked: true, loading: true },
        });

        await rerender({ loading: false });
        expect(ringOf(container)).toBeNull();
        expect(tickOf(container)).not.toBeNull();
        expect((screen.getByRole("checkbox", { name: "Agree" }) as HTMLInputElement).disabled).toBe(
            false,
        );
    });
});
