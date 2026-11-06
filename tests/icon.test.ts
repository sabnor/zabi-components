import Heart from "@lucide/svelte/icons/heart";
import { cleanup, render, screen } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";

import Icon from "../src/components/atoms/Icon.svelte";

afterEach(() => cleanup());

describe("Icon", () => {
    it.each([
        ["xs", "12"],
        ["sm", "16"],
        ["md", "20"],
        ["lg", "24"],
        ["inherit", "1em"],
    ] as const)("size %s is %s", (size, px) => {
        const { container } = render(Icon, { icon: Heart, size });
        const svg = container.querySelector("svg")!;
        expect(svg.getAttribute("width")).toBe(px);
        expect(svg.getAttribute("height")).toBe(px);
    });

    it("defaults to md", () => {
        const { container } = render(Icon, { icon: Heart });
        expect(container.querySelector("svg")!.getAttribute("width")).toBe("20");
    });

    it("is decorative without a label", () => {
        const { container } = render(Icon, { icon: Heart });
        const svg = container.querySelector("svg")!;
        expect(svg.getAttribute("aria-hidden")).toBe("true");
        expect(svg.getAttribute("focusable")).toBe("false");
        expect(screen.queryByRole("img")).toBeNull();
    });

    it("is an image with a name when labelled", () => {
        const { container } = render(Icon, { icon: Heart, label: "Favourite" });
        expect(screen.getByRole("img", { name: "Favourite" })).toBe(container.querySelector("svg"));
        expect(container.querySelector("svg")!.getAttribute("aria-hidden")).toBeNull();
    });

    it("passes class and strokeWidth to the svg", () => {
        const { container } = render(Icon, { icon: Heart, class: "text-error", strokeWidth: 1 });
        const svg = container.querySelector("svg")!;
        expect(svg.classList.contains("text-error")).toBe(true);
        expect(svg.getAttribute("stroke-width")).toBe("1");
    });
});
