import { cleanup, render, screen } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";

import Button from "../src/components/atoms/Button.svelte";
import IconButton from "../src/components/atoms/IconButton.svelte";
import Spinner from "../src/components/atoms/Spinner.svelte";

afterEach(cleanup);

const ring = (container: HTMLElement) =>
    container.querySelector<HTMLElement>(".animate-spin")!;

describe("Spinner", () => {
    it("is decorative without a label", () => {
        const { container } = render(Spinner);
        expect(screen.queryByRole("status")).toBeNull();
        expect(ring(container).getAttribute("aria-hidden")).toBe("true");
        expect(container.textContent?.trim()).toBe("");
    });

    it("is a status that carries its label as text when given one", () => {
        const { container } = render(Spinner, { props: { label: "Saving changes" } });
        const status = screen.getByRole("status");
        expect(status.textContent?.trim()).toBe("Saving changes");
        // The ring itself stays out of the accessibility tree.
        expect(ring(container).getAttribute("aria-hidden")).toBe("true");
        expect(status.contains(ring(container))).toBe(true);
        expect(status.querySelector(".sr-only")?.textContent).toBe("Saving changes");
    });

    it("has the four sizes the built-in loading states use, md by default", () => {
        const sizeOf = (size?: "xs" | "sm" | "md" | "lg") => {
            const { container, unmount } = render(Spinner, { props: { size } });
            const classes = ring(container).className;
            unmount();
            return classes.split(" ").find((name) => name.startsWith("size-"));
        };
        expect(sizeOf()).toBe("size-4");
        expect(sizeOf("xs")).toBe("size-3");
        expect(sizeOf("sm")).toBe("size-3.5");
        expect(sizeOf("md")).toBe("size-4");
        expect(sizeOf("lg")).toBe("size-5");
    });

    it("draws the same ring as a loading Button and IconButton of the same size", () => {
        const classesOf = (element: Element | null) =>
            new Set((element?.getAttribute("class") ?? "").split(/\s+/).filter(Boolean));
        // The spinner adds its reduced-motion behaviour; everything else matches.
        const own = (element: Element | null) => {
            const classes = classesOf(element);
            classes.delete("motion-reduce:animate-pulse");
            return classes;
        };

        for (const size of ["sm", "md"] as const) {
            const button = render(Button, { props: { loading: true, size, text: "Save" } });
            const inButton = classesOf(button.container.querySelector(".animate-spin"));
            button.unmount();
            const spinner = render(Spinner, { props: { size } });
            expect(own(ring(spinner.container))).toEqual(inButton);
            spinner.unmount();
        }

        for (const size of ["xs", "sm", "md", "lg"] as const) {
            const button = render(IconButton, {
                props: { loading: true, size, label: "Refresh" },
            });
            const inButton = classesOf(button.container.querySelector(".animate-spin"));
            button.unmount();
            const spinner = render(Spinner, { props: { size } });
            expect(own(ring(spinner.container))).toEqual(inButton);
            spinner.unmount();
        }
    });

    it("takes the text colour and does not spin under reduced motion", () => {
        const { container } = render(Spinner);
        const classes = ring(container).className.split(" ");
        expect(classes).toContain("border-current");
        expect(classes).toContain("motion-reduce:animate-pulse");
    });

    it("lets class override the size and passes other attributes on", () => {
        const { container } = render(Spinner, {
            props: { class: "size-8 text-link", "data-testid": "busy" },
        });
        const element = screen.getByTestId("busy");
        expect(element).toBe(ring(container));
        const classes = element.className.split(" ");
        expect(classes).toContain("size-8");
        expect(classes).not.toContain("size-4");
        expect(classes).toContain("text-link");
    });
});
