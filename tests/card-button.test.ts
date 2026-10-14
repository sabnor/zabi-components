import { createRawSnippet } from "svelte";
import { cleanup, render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import Card from "../src/components/atoms/Card.svelte";

afterEach(cleanup);

const body = createRawSnippet(() => ({ render: () => `<span>Ny inbjudan</span>` }));
const classesOf = (element: Element) => (element.getAttribute("class") ?? "").split(/\s+/);

function formWith() {
    const form = document.createElement("form");
    document.body.appendChild(form);
    const submitted: Array<{ name: string; value: string }> = [];
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const submitter = (event as SubmitEvent).submitter as HTMLButtonElement | null;
        if (submitter) submitted.push({ name: submitter.name, value: submitter.value });
    });
    return { form, submitted };
}

describe("Card type=submit (Z-085)", () => {
    it("is one <button type=submit> holding its content", () => {
        render(Card, { props: { type: "submit", children: body } });
        const card = screen.getByRole("button", { name: /Ny inbjudan/ });
        expect(card.tagName).toBe("BUTTON");
        expect(card.getAttribute("type")).toBe("submit");
        expect(card.getAttribute("role")).toBeNull();
        expect(card.getAttribute("tabindex")).toBeNull();
    });

    it("posts its name and value, by click and by Enter", async () => {
        const { form, submitted } = formWith();
        render(Card, { target: form, props: { type: "submit", name: "notification", value: "n1", children: body } });
        await userEvent.tab();
        expect(document.activeElement).toBe(screen.getByRole("button"));
        await userEvent.keyboard("{Enter}");
        await userEvent.click(screen.getByRole("button"));
        expect(submitted).toEqual([
            { name: "notification", value: "n1" },
            { name: "notification", value: "n1" },
        ]);
        form.remove();
    });

    it("is drawn and pressed as the link card is: ring, state classes, 44px, body colour", () => {
        render(Card, { props: { type: "submit", children: body } });
        const classes = classesOf(screen.getByRole("button"));
        for (const name of ["block", "text-start", "text-body", "focus-ring", "min-h-11", "cursor-pointer", "rounded-container", "hover:bg-card-hover", "active:bg-card-active"]) {
            expect(classes).toContain(name);
        }
    });

    it("takes the form attribute, runs onclick, and can be disabled", async () => {
        const onclick = vi.fn();
        render(Card, { props: { type: "button", form: "f1", onclick, children: body } });
        const card = screen.getByRole("button");
        expect(card.getAttribute("form")).toBe("f1");
        expect(card.getAttribute("type")).toBe("button");
        await userEvent.click(card);
        expect(onclick).toHaveBeenCalledTimes(1);
        cleanup();
        render(Card, { props: { type: "submit", disabled: true, children: body } });
        expect((screen.getByRole("button") as HTMLButtonElement).disabled).toBe(true);
    });

    it("with href stays a link; without type it is the div of alpha.7", () => {
        render(Card, { props: { type: "submit", href: "/a", children: body } });
        expect(screen.getByRole("link").tagName).toBe("A");
        cleanup();
        const { container } = render(Card, { props: { children: body } });
        expect(container.querySelector("button")).toBeNull();
        expect(container.querySelector("div")?.getAttribute("role")).toBeNull();
    });
});
