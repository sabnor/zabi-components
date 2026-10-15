import { cleanup, fireEvent, render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import Button from "../src/components/atoms/Button.svelte";
import Checkbox from "../src/components/atoms/Checkbox.svelte";
import Radio from "../src/components/atoms/Radio.svelte";
import Textarea from "../src/components/atoms/Textarea.svelte";
import Toggle from "../src/components/atoms/Toggle.svelte";
import ImageUpload from "../src/components/molecules/ImageUpload.svelte";
import RadioGroup from "../src/components/molecules/RadioGroup.svelte";
import { SELECTION_CONTROL_INPUT } from "../src/components/atoms/selection-control.styles";

afterEach(cleanup);

const ids = (element: Element) => (element.getAttribute("aria-describedby") ?? "").split(" ").filter(Boolean);
const textOf = (id: string) => document.getElementById(id)?.textContent?.replace(/\s+/g, " ").trim();

describe("Textarea: a character count tied to maxlength (Z-125)", () => {
    it("shows nothing without count, and nothing without maxlength", () => {
        const { container, unmount } = render(Textarea, { props: { label: "Text", maxlength: 20, value: "abc" } });
        expect(container.querySelector("[data-textarea-count]")).toBeNull();
        unmount();
        const second = render(Textarea, { props: { label: "Text", count: true, value: "abc" } });
        expect(second.container.querySelector("[data-textarea-count]")).toBeNull();
    });

    it("counts as n / max, after the hint in the description, and is not a live region", async () => {
        const { container } = render(Textarea, {
            props: { label: "Text", maxlength: 20, count: true, hint: "Be kind", value: "abc" },
        });
        const field = screen.getByRole("textbox");
        const count = container.querySelector("[data-textarea-count]")!;
        expect(count.textContent!.trim()).toBe("3 / 20");
        expect(ids(field).map(textOf)).toEqual(["Be kind", "3 / 20"]);
        expect(count.getAttribute("aria-live")).toBeNull();
        expect(count.getAttribute("role")).toBeNull();
        await userEvent.setup().type(field, "de");
        expect(count.textContent!.trim()).toBe("5 / 20");
        expect(field.getAttribute("maxlength")).toBe("20");
    });

    it("starts at countFrom and takes its words from countText", async () => {
        const { container } = render(Textarea, {
            props: {
                label: "Text",
                maxlength: 10,
                count: true,
                countFrom: 8,
                countText: ({ remaining }: { remaining: number }) => `${remaining} tecken kvar`,
                value: "1234567",
            },
        });
        const field = screen.getByRole("textbox");
        expect(container.querySelector("[data-textarea-count]")).toBeNull();
        expect(field.getAttribute("aria-describedby")).toBeNull();
        await userEvent.setup().type(field, "8");
        expect(container.querySelector("[data-textarea-count]")!.textContent!.trim()).toBe("2 tecken kvar");
    });
});

describe("Toggle: a description under the label (Z-126)", () => {
    it("is inside the label, out of the name, and describes the switch after the caller's ids", async () => {
        const onchange = vi.fn();
        render(Toggle, {
            props: { label: "Contact me", description: "Only about this", "aria-describedby": "own", onchange },
        });
        const toggle = screen.getByRole("switch", { name: "Contact me" });
        const [own, description] = ids(toggle);
        expect(own).toBe("own");
        const line = document.getElementById(description)!;
        expect(line.textContent!.trim()).toBe("Only about this");
        expect(line.getAttribute("aria-hidden")).toBe("true");
        expect(line.closest("label")!.getAttribute("for")).toBe(toggle.id);
        expect(line.className).toContain("text-description");
        // A tap on it toggles, as a tap on the label does.
        await userEvent.setup().click(line);
        expect(onchange).toHaveBeenCalledWith({ checked: true });
    });

    it("changes nothing without one", () => {
        const { container } = render(Toggle, { props: { label: "Contact me" } });
        expect(screen.getByRole("switch").getAttribute("aria-describedby")).toBeNull();
        expect(container.firstElementChild!.className).toContain("items-center");
        expect(container.querySelector("label")!.textContent!.trim()).toBe("Contact me");
    });
});

describe("Checkbox: description, and the box at the end (Z-128)", () => {
    it("takes a description as Radio does: in the label, describing the box, not naming it", async () => {
        render(Checkbox, { props: { label: "Bar Kaja", description: "Tisdagar 19:00" } });
        const box = screen.getByRole("checkbox", { name: "Bar Kaja" });
        const line = document.getElementById(ids(box)[0])!;
        expect(line.textContent!.trim()).toBe("Tisdagar 19:00");
        expect(line.closest("label")!.getAttribute("for")).toBe(box.id);
        await userEvent.setup().click(line);
        expect((box as HTMLInputElement).checked).toBe(true);
    });

    it.each([
        ["Checkbox", Checkbox, "checkbox"],
        ["Radio", Radio, "radio"],
    ] as const)("%s: controlPosition end moves the control by order and lets the row fill", (_name, component, role) => {
        const { container, unmount } = render(component, { props: { label: "Bar Kaja", controlPosition: "end" } });
        const input = screen.getByRole(role);
        const label = input.closest("label")!;
        // Still first in the markup: the order is visual only.
        expect(label.firstElementChild!.contains(input)).toBe(true);
        expect(label.firstElementChild!.className).toContain("order-last");
        expect(label.className).toContain("flex-1");
        expect(label.lastElementChild!.className).toContain("flex-1");
        unmount();
        const start = render(component, { props: { label: "Bar Kaja" } });
        const plain = start.container.querySelector("label")!;
        expect(plain.firstElementChild!.className).not.toContain("order-last");
        expect(plain.className).not.toContain("flex-1");
        expect(container).toBeTruthy();
    });

    it("keeps the touch target at 44px however large the text is", () => {
        const classes = SELECTION_CONTROL_INPUT.split(" ");
        expect(classes).toContain("pointer-coarse:size-[44px]");
        // Nothing of it in rem: `size-11` was 88px at 200% text.
        expect(classes.filter((name) => name.startsWith("pointer-coarse:")).join(" ")).not.toMatch(/size-11|3\.5/);
    });
});

describe("Button: never wider than what it is in (Z-129)", () => {
    it.each(["primary", "tonal", "outline", "text"] as const)("%s has [max-inline-size:100%] and hyphens-auto", (variant) => {
        render(Button, { props: { variant, text: "Lägg till på hemskärmen" } });
        const classes = screen.getByRole("button").className.split(" ");
        expect(classes).toContain("[max-inline-size:100%]");
        expect(classes).toContain("hyphens-auto");
    });
});

describe("ImageUpload: several files (Z-130)", () => {
    const file = (name: string, size = 10, type = "image/png") => new File([new Uint8Array(size)], name, { type });
    const input = (container: HTMLElement) => container.querySelector<HTMLInputElement>('[data-testid="image-upload-input"]')!;

    it("takes one file, as before, without multiple", () => {
        const { container } = render(ImageUpload, { props: { label: "Photo" } });
        expect(input(container).multiple).toBe(false);
    });

    it("hands every chosen file over in order, and keeps none", async () => {
        const onfiles = vi.fn();
        const onfileselect = vi.fn();
        const { container } = render(ImageUpload, { props: { label: "Photos", multiple: true, onfiles, onfileselect } });
        const field = input(container);
        expect(field.multiple).toBe(true);
        const chosen = [file("a.png"), file("b.png"), file("c.png")];
        await fireEvent.change(field, { target: { files: chosen } });
        expect(onfiles).toHaveBeenCalledTimes(1);
        expect(onfiles.mock.calls[0][0].map((taken: File) => taken.name)).toEqual(["a.png", "b.png", "c.png"]);
        expect(onfileselect).not.toHaveBeenCalled();
        // No preview: the dropzone is still there.
        expect(container.querySelector("img")).toBeNull();
    });

    it("turns away what is too large and what is past maxFiles, each with why", async () => {
        const onfiles = vi.fn();
        const onfilereject = vi.fn();
        const { container } = render(ImageUpload, {
            props: { label: "Photos", multiple: true, maxFiles: 2, maxSize: 100, onfiles, onfilereject },
        });
        const chosen = [file("a.png"), file("big.png", 500), file("b.png"), file("c.png")];
        await fireEvent.change(input(container), { target: { files: chosen } });
        expect(onfiles.mock.calls[0][0].map((taken: File) => taken.name)).toEqual(["a.png", "b.png"]);
        expect(onfilereject.mock.calls.map(([rejected, reason]) => [rejected.name, reason])).toEqual([
            ["big.png", "size"],
            ["c.png", "count"],
        ]);
    });
});

describe("descriptionSpoken: a description read out in other words than it is drawn in (Z-138)", () => {
    const drawn = "tis, ons · 6 pubar";
    const spoken = "tisdagar och onsdagar, 6 pubar";

    it("Radio and Checkbox: the spoken words describe the control once, the drawn line is shown and not referenced", () => {
        for (const Control of [Radio, Checkbox]) {
            const { container, unmount } = render(Control, {
                props: { label: "Söderrundan", description: drawn, descriptionSpoken: spoken },
            });
            const input = container.querySelector("input")!;
            expect(ids(input).map(textOf)).toEqual([spoken]);
            const line = Array.from(container.querySelectorAll("span")).find((el) => el.textContent?.trim() === drawn)!;
            expect(line.id).toBe("");
            expect(line.getAttribute("aria-hidden")).toBe("true");
            expect(document.getElementById(ids(input)[0])!.hidden).toBe(true);
            unmount();
        }
    });

    it("Toggle: the same, after the ids passed in", () => {
        render(Toggle, {
            props: { label: "Söderrundan", description: drawn, descriptionSpoken: spoken, "aria-describedby": "own" },
        });
        const toggle = screen.getByRole("switch");
        expect(ids(toggle)[0]).toBe("own");
        expect(ids(toggle).slice(1).map(textOf)).toEqual([spoken]);
    });

    it("RadioGroup: an option's spoken words describe its radio", () => {
        const { container } = render(RadioGroup, {
            props: {
                name: "theme",
                label: "Theme",
                options: [{ value: "s", label: "Söderrundan", description: drawn, descriptionSpoken: spoken }],
            },
        });
        const input = container.querySelector("input")!;
        expect(ids(input).map(textOf)).toEqual([spoken]);
    });

    it("without it the drawn line is the description, as before", () => {
        const { container } = render(Radio, { props: { label: "Söderrundan", description: drawn } });
        expect(ids(container.querySelector("input")!).map(textOf)).toEqual([drawn]);
        expect(container.querySelector("[hidden]")).toBeNull();
    });
});

describe("Toggle: the knob slides with no overshoot, on tokens of its own (Z-146)", () => {
    it("reads --zabi-toggle-ease and --zabi-toggle-duration, else the standard curve over the moderate duration", () => {
        const { container } = render(Toggle, { props: { label: "Notify me" } });
        const knob = container.querySelector(".toggle-switch-thumb")!;
        expect(knob.className).toContain("ease-(--zabi-toggle-ease,var(--ease-standard))");
        expect(knob.className).toContain("duration-(--zabi-toggle-duration,var(--duration-moderate))");
        expect(knob.className).toContain("motion-reduce:transition-none");
        expect(knob.className).not.toContain("ease-spring");
    });
});
