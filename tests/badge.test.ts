import { cleanup, render, screen } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";

import Badge from "../src/components/atoms/Badge.svelte";

/**
 * Badge's box, as far as class names can say it. What the classes amount to
 * (20, 24 and 28px for one line, a long label wrapping inside a 360px screen
 * at 200% text) is measured in playwright/badge.spec.ts.
 */

afterEach(cleanup);

const classes = (text: string) => screen.getByText(text).className.split(/\s+/);

describe("Badge", () => {
    it.each([
        ["sm", "min-h-5", "py-px", "rounded-[0.625rem]"],
        ["md", "min-h-6", "py-[3px]", "rounded-[0.75rem]"],
        ["lg", "min-h-7", "py-[3px]", "rounded-[0.875rem]"],
    ] as const)("%s: a minimum height, the padding that makes one line that tall, and half of it as the corner", (size, height, padding, corner) => {
        render(Badge, { props: { text: "Bekräftad", size } });
        const own = classes("Bekräftad");
        expect(own).toEqual(expect.arrayContaining([height, padding, corner]));
        // Not a fixed height any more, and not the pill radius: a wrapped badge would be a lozenge.
        expect(own.some((name) => /^h-\d/.test(name))).toBe(false);
        expect(own).not.toContain("rounded-pill");
    });

    it("wraps: no nowrap, never wider than what it is in, and a long word breaks", () => {
        render(Badge, { props: { text: "Väntar på bekräftelse från gruppen" } });
        const own = classes("Väntar på bekräftelse från gruppen");
        expect(own).not.toContain("whitespace-nowrap");
        expect(own).toEqual(expect.arrayContaining(["[max-inline-size:100%]", "min-w-0", "[overflow-wrap:anywhere]"]));
        expect(own).toContain("items-center");
    });

    it("keeps its icon whole beside a wrapped label", () => {
        render(Badge, { props: { text: "Klar", variant: "success", showIcon: true } });
        const icon = screen.getByText("Klar").querySelector("svg")!;
        expect(icon.getAttribute("class")).toContain("shrink-0");
        expect(icon.getAttribute("aria-hidden")).toBe("true");
    });

    it("a corner from the call site still wins", () => {
        render(Badge, { props: { text: "9", class: "rounded-control" } });
        const own = classes("9");
        expect(own).toContain("rounded-control");
        expect(own.some((name) => name.startsWith("rounded-["))).toBe(false);
    });

    it("renders nothing without a label, and passes other attributes on", () => {
        render(Badge, { props: { text: "" } });
        expect(document.querySelector("span")).toBeNull();
        cleanup();
        render(Badge, { props: { text: "Ny", "data-testid": "new", id: "new" } });
        expect(screen.getByTestId("new").id).toBe("new");
    });
});
