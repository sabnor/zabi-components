import { cleanup, fireEvent, render, screen } from "@testing-library/svelte";
import { afterEach, describe, expect, it, vi } from "vitest";

import Button from "../src/components/atoms/Button.svelte";
import IconButton from "../src/components/atoms/IconButton.svelte";

/**
 * A control that turns `loading` while it has focus must keep it.
 *
 * Loading used to set `disabled` on a button and take the `href` off a link.
 * Both make the element unfocusable, so the browser dropped focus on
 * `<body>`: a keyboard user who pressed Save was at the top of the page when
 * the save came back, and a screen reader lost its place.
 *
 * Now a loading control is unavailable the way ARIA says it, not the way the
 * platform does: `aria-disabled="true"` and `aria-busy="true"`, still a Tab
 * stop, and pressing it does nothing. `disabled` is unchanged: out of the Tab
 * order, as before.
 *
 * jsdom does not move focus off an element that stops being focusable, so
 * what is held here is the markup that decides it. That focus really stays
 * is in playwright/loading-focus.spec.ts.
 */

afterEach(cleanup);

const cases = [
    { name: "Button", component: Button, props: { text: "Save" }, role: "button", label: "Save" },
    { name: "IconButton", component: IconButton, props: { label: "Refresh" }, role: "button", label: "Refresh" },
] as const;

for (const { name, component, props, label } of cases) {
    describe(`${name} while loading`, () => {
        it("is unavailable but still focusable: aria-disabled and aria-busy, not disabled", async () => {
            const { rerender } = render(component as never, { props: { ...props } });
            const button = screen.getByRole("button", { name: label }) as HTMLButtonElement;
            button.focus();
            expect(document.activeElement).toBe(button);

            await rerender({ ...props, loading: true });
            expect(button.disabled, "A disabled button cannot hold focus").toBe(false);
            expect(button.getAttribute("aria-disabled")).toBe("true");
            expect(button.getAttribute("aria-busy")).toBe("true");
            expect(button.tabIndex).toBe(0);
            expect(document.activeElement).toBe(button);

            await rerender({ ...props, loading: false });
            expect(button.hasAttribute("aria-disabled")).toBe(false);
            expect(button.hasAttribute("aria-busy")).toBe(false);
            expect(button.disabled).toBe(false);
        });

        it("does nothing when pressed, and does not submit its form", async () => {
            const onclick = vi.fn();
            const onsubmit = vi.fn((event: Event) => event.preventDefault());
            const form = document.createElement("form");
            form.addEventListener("submit", onsubmit);
            document.body.append(form);
            render(component as never, {
                target: form,
                props: { ...props, loading: true, type: "submit", onclick },
            });
            const button = screen.getByRole("button", { name: label });

            const delivered = await fireEvent.click(button);
            expect(onclick).not.toHaveBeenCalled();
            expect(delivered, "The click is cancelled, so the form is not submitted").toBe(false);
            expect(onsubmit).not.toHaveBeenCalled();
            form.remove();
        });

        it("wears the disabled colours, with nothing left of its variant's hover or pressed fill", () => {
            render(component as never, { props: { ...props, loading: true, variant: "primary" } });
            const classes = screen.getByRole("button", { name: label }).className.split(/\s+/);
            expect(classes).toContain("text-action-disabled-text");
            expect(classes.filter((item) => /^(hover|active):/.test(item))).toEqual([]);
            expect(classes).not.toContain("bg-action-primary");
            // It can be focused now, so it keeps the ring.
            expect(classes).toContain("focus-ring");
        });

        it("disabled is as before: the attribute, and no ARIA stand-in for it", async () => {
            const onclick = vi.fn();
            render(component as never, { props: { ...props, disabled: true, onclick } });
            const button = screen.getByRole("button", { name: label }) as HTMLButtonElement;
            expect(button.disabled).toBe(true);
            expect(button.hasAttribute("aria-disabled")).toBe(false);
            expect(button.hasAttribute("aria-busy")).toBe(false);
        });

        it("disabled and loading together is disabled", () => {
            render(component as never, { props: { ...props, disabled: true, loading: true } });
            const button = screen.getByRole("button", { name: label }) as HTMLButtonElement;
            expect(button.disabled).toBe(true);
            expect(button.getAttribute("aria-busy")).toBe("true");
        });
    });

    describe(`${name} as a link, while loading`, () => {
        const linkProps = { ...props, href: "/next" };

        it("cannot be followed but is still a Tab stop", async () => {
            const { rerender } = render(component as never, { props: { ...linkProps } });
            const link = screen.getByRole("link", { name: label }) as HTMLAnchorElement;
            expect(link.getAttribute("href")).toBe("/next");
            expect(link.hasAttribute("tabindex")).toBe(false);

            await rerender({ ...linkProps, loading: true });
            expect(link.hasAttribute("href"), "Nothing to follow, by any means").toBe(false);
            expect(link.getAttribute("role")).toBe("link");
            expect(link.getAttribute("aria-disabled")).toBe("true");
            expect(link.getAttribute("aria-busy")).toBe("true");
            expect(link.getAttribute("tabindex"), "Without an href a link is only focusable with this").toBe("0");

            await rerender({ ...linkProps, loading: false });
            expect(link.getAttribute("href")).toBe("/next");
            expect(link.hasAttribute("tabindex")).toBe(false);
        });

        it("does nothing when pressed", async () => {
            const onclick = vi.fn();
            render(component as never, { props: { ...linkProps, loading: true, onclick } });
            const delivered = await fireEvent.click(screen.getByRole("link", { name: label }));
            expect(onclick).not.toHaveBeenCalled();
            expect(delivered).toBe(false);
        });

        it("a disabled link is as before: no href and not a Tab stop", () => {
            render(component as never, { props: { ...linkProps, disabled: true } });
            const link = screen.getByRole("link", { name: label });
            expect(link.hasAttribute("href")).toBe(false);
            expect(link.hasAttribute("tabindex")).toBe(false);
            expect(link.getAttribute("aria-disabled")).toBe("true");
        });

        it("a tabindex of the caller's own is kept", () => {
            render(component as never, { props: { ...linkProps, loading: true, tabindex: -1 } });
            expect(screen.getByRole("link", { name: label }).getAttribute("tabindex")).toBe("-1");
        });
    });
}
