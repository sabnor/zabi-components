import { cleanup, render } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";

import AppBar from "../src/components/molecules/AppBar.svelte";

afterEach(cleanup);

const header = (container: HTMLElement) => container.querySelector("header") as HTMLElement;

describe("AppBar position", () => {
    it("sticks by default", () => {
        const { container } = render(AppBar, { props: { title: "Quiz" } });
        const classes = header(container).className.split(/\s+/);
        expect(classes).toContain("sticky");
        expect(classes).toContain("material-bar");
        expect(classes).not.toContain("relative");
    });

    it("`static` is in the flow, still positioned for the material layer, and never glass", () => {
        const { container } = render(AppBar, {
            props: { title: "Quiz", position: "static", scrollEdge: "always" },
        });
        const bar = header(container);
        const classes = bar.className.split(/\s+/);
        expect(classes).toContain("relative");
        expect(classes).not.toContain("sticky");
        expect(classes).not.toContain("static");
        expect(bar.dataset.scrolledUnder).toBe("false");
    });

    it("reads the 8.1 `class=\"static\"` as `position=\"static\"` and keeps the caller's other classes", () => {
        const { container } = render(AppBar, {
            props: { title: "Quiz", class: "static mt-2" },
        });
        const classes = header(container).className.split(/\s+/);
        expect(classes).toContain("relative");
        expect(classes).toContain("mt-2");
        expect(classes).not.toContain("static");
        expect(classes).not.toContain("sticky");
    });

    it("with a large title the 56px row does not stick either", () => {
        const { container } = render(AppBar, {
            props: { title: "Quiz", largeTitle: true, position: "static" },
        });
        const row = container.querySelector("[data-appbar-bar]") as HTMLElement;
        expect(row.className.split(/\s+/)).toContain("relative");
        expect(row.className.split(/\s+/)).not.toContain("sticky");
        expect(header(container).className.split(/\s+/)).not.toContain("sticky");
    });
});
