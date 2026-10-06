import { createRawSnippet } from "svelte";
import { cleanup, render } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";

import Stat from "../src/components/atoms/Stat.svelte";

afterEach(cleanup);

const host = (container: HTMLElement) => container.firstElementChild as HTMLElement;
const texts = (el: HTMLElement) => (el.textContent ?? "").replace(/\s+/g, " ").trim();

describe("Stat", () => {
    it("renders value, unit and label in that order", () => {
        const { container } = render(Stat, {
            props: { value: "4", unit: "av 19", label: "pubar besökta", size: "lg" },
        });
        expect(host(container).tagName).toBe("DIV");
        expect(texts(host(container))).toBe("4 av 19 pubar besökta");
    });

    it("puts the label first in the DOM with labelPosition above", () => {
        const { container } = render(Stat, { props: { value: 5, label: "besök", labelPosition: "above" } });
        expect(texts(host(container))).toBe("besök 5");
    });

    it("shows a number as given and has no heading, role or live region", () => {
        const { container } = render(Stat, { props: { value: 5, label: "besök" } });
        expect(texts(host(container))).toBe("5 besök");
        expect(container.querySelector("h1,h2,h3,h4,h5,h6,[role],[aria-live]")).toBeNull();
    });

    it("omits the unit and label elements when not given", () => {
        const { container } = render(Stat, { props: { value: "7" } });
        expect(host(container).querySelectorAll("span")).toHaveLength(1);
    });

    it("uses children in place of value", () => {
        const children = createRawSnippet(() => ({ render: () => "<span>1<sup>a</sup></span>" }));
        const { container } = render(Stat, { props: { value: "x", children } });
        expect(container.querySelector("sup")).not.toBeNull();
        expect(texts(host(container))).toBe("1a");
    });

    it("sets the value in the display voice with role-token classes only", () => {
        const { container } = render(Stat, { props: { value: "4", unit: "av 19", label: "x", size: "md" } });
        const [value, unit, label] = Array.from(host(container).querySelectorAll("span"));
        expect(value.className).toEqual(expect.stringContaining("font-display"));
        expect(value.className).toContain("text-headline");
        expect(value.className).toContain("tabular-nums");
        expect(value.className).toContain("leading-none");
        expect(value.className).toContain("--zabi-display-weight");
        expect(value.className).toContain("--zabi-display-tracking");
        expect(value.className).toContain("text-4xl");
        expect(unit.className).toContain("text-description");
        expect(unit.className).toContain("font-medium");
        expect(label.className).toContain("text-description");
        expect(value.parentElement!.className).toContain("whitespace-nowrap");
        expect(value.parentElement!.className).toContain("items-baseline");
    });

    it.each([
        ["sm", "text-2xl", "text-sm", "text-xs"],
        ["md", "text-4xl", "text-base", "text-sm"],
        ["lg", "text-5xl", "text-xl", "text-sm"],
    ] as const)("%s sizes", (size, v, u, l) => {
        const { container } = render(Stat, { props: { value: "1", unit: "u", label: "l", size } });
        const [value, unit, label] = Array.from(host(container).querySelectorAll("span"));
        expect(value.className).toContain(v);
        expect(unit.className).toContain(u);
        expect(label.className).toContain(l);
    });

    it("aligns, merges a call-site class and passes rest props", () => {
        const { container } = render(Stat, {
            props: { value: "1", align: "center", class: "p-4", "data-x": "y" } as any,
        });
        expect(host(container).className).toContain("items-center");
        expect(host(container).className).toContain("p-4");
        expect(host(container).getAttribute("data-x")).toBe("y");
        cleanup();
        const def = render(Stat, { props: { value: "1" } });
        expect(host(def.container).className).toContain("items-start");
    });
});
