import { cleanup, render, screen } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";

import Button from "../src/components/atoms/Button.svelte";
import IconButton from "../src/components/atoms/IconButton.svelte";
import ActionPanel from "../src/components/atoms/ActionPanel.svelte";
import Checkbox from "../src/components/atoms/Checkbox.svelte";
import Input from "../src/components/atoms/Input.svelte";
import Spinner from "../src/components/atoms/Spinner.svelte";
import Textarea from "../src/components/atoms/Textarea.svelte";
import Toggle from "../src/components/atoms/Toggle.svelte";

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
        // Full equality, the reduced-motion class included: a loading Button
        // must stop spinning under the preference just as the Spinner does.

        for (const size of ["sm", "md"] as const) {
            const button = render(Button, { props: { loading: true, size, text: "Save" } });
            const inButton = classesOf(button.container.querySelector(".animate-spin"));
            button.unmount();
            const spinner = render(Spinner, { props: { size } });
            expect(classesOf(ring(spinner.container))).toEqual(inButton);
            spinner.unmount();
        }

        for (const size of ["xs", "sm", "md", "lg"] as const) {
            const button = render(IconButton, {
                props: { loading: true, size, label: "Refresh" },
            });
            const inButton = classesOf(button.container.querySelector(".animate-spin"));
            button.unmount();
            const spinner = render(Spinner, { props: { size } });
            expect(classesOf(ring(spinner.container))).toEqual(inButton);
            spinner.unmount();
        }
    });

    it("has the same reduced-motion behaviour in every built-in loading state", () => {
        const spinnerOf = (container: HTMLElement) =>
            (container.querySelector(".animate-spin")?.getAttribute("class") ?? "").split(/\s+/);

        for (const [name, Component, props] of [
            ["Input", Input, { loading: true, label: "Name" }],
            ["Textarea", Textarea, { loading: true, label: "Notes" }],
            ["ActionPanel", ActionPanel, { loading: true, title: "Billing", description: "Invoices" }],
            ["Toggle", Toggle, { loading: true, label: "Alerts" }],
        ] as const) {
            const view = render(Component as never, { props: props as never });
            // Rotation is what the preference is about; the ring fades instead.
            expect(spinnerOf(view.container), name).toContain("motion-reduce:animate-pulse");
            view.unmount();
        }

        // Checkbox hides its ring with `opacity-0` until it is busy, and a
        // pulse animates opacity, so there the ring stops instead of fading.
        const checkbox = render(Checkbox, { props: { loading: true, label: "Agree" } });
        expect(spinnerOf(checkbox.container)).toContain("motion-reduce:animate-none");
        expect(spinnerOf(checkbox.container)).not.toContain("motion-reduce:animate-pulse");
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
