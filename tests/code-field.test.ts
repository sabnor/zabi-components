import { cleanup, fireEvent, render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { tick } from "svelte";
import { afterEach, describe, expect, it, vi } from "vitest";

import CodeField from "../src/components/atoms/CodeField.svelte";
import {
    activePlace,
    caretAfterSanitise,
    codeGroups,
    codeLength,
    nearestBox,
    pasteInto,
    replaceAt,
    sanitiseCode,
} from "../src/components/util/code-field";
import CodeFieldHarness from "./fixtures/CodeFieldHarness.svelte";

afterEach(cleanup);

const field = () => screen.getByRole("textbox") as HTMLInputElement;
const cells = () => Array.from(document.querySelectorAll("[data-code-cell]")).map((cell) => cell.textContent?.trim());

/** What `aria-describedby` points at, joined as a screen reader reads it. */
const described = (input: HTMLElement) =>
    (input.getAttribute("aria-describedby") ?? "")
        .split(" ")
        .map((id) => document.getElementById(id)?.textContent?.trim())
        .join(" ");

/** A paste event with clipboard text, which jsdom's userEvent.paste does not place a caret for. */
function pasteText(target: HTMLInputElement, text: string) {
    const event = new Event("paste", { bubbles: true, cancelable: true }) as ClipboardEvent;
    Object.defineProperty(event, "clipboardData", { value: { getData: () => text } });
    target.dispatchEvent(event);
}

describe("helpers", () => {
    it("drops what does not belong and cuts to the length", () => {
        expect(sanitiseCode("123 456", "numeric", 6)).toBe("123456");
        expect(sanitiseCode("123-456", "numeric", 6)).toBe("123456");
        expect(sanitiseCode("12a3", "numeric", 6)).toBe("123");
        expect(sanitiseCode("12a3", "alphanumeric", 6)).toBe("12a3");
        expect(sanitiseCode("1234567", "numeric", 6)).toBe("123456");
    });

    it("keeps the caret after the characters that stayed before it", () => {
        expect(caretAfterSanitise("12 3", 4, "numeric", 6)).toBe(3);
        expect(caretAfterSanitise("a1", 1, "numeric", 6)).toBe(0);
    });

    it("pastes a whole code over what was there, and a part at the selection", () => {
        expect(pasteInto("12", 0, 0, "123 456", "numeric", 6)).toBe("123456");
        expect(pasteInto("123456", 3, 3, "999999", "numeric", 6)).toBe("999999");
        expect(pasteInto("12", 2, 2, "34", "numeric", 6)).toBe("1234");
        expect(pasteInto("1256", 2, 2, "34", "numeric", 6)).toBe("123456");
        expect(replaceAt("123456", 2, "9")).toBe("129456");
    });

    it("keeps the length and the active place in range", () => {
        expect(codeLength(undefined)).toBe(6);
        expect(codeLength(0)).toBe(1);
        expect(codeLength(99)).toBe(12);
        expect(codeLength(4.9)).toBe(4);
        expect(activePlace(6, 6)).toBe(5);
        expect(activePlace(2, 6)).toBe(2);
    });
});

describe("grouping helpers", () => {
    it("reads a number as each group's size and a list as the sizes", () => {
        expect(codeGroups(4, 8)).toEqual([4, 4]);
        expect(codeGroups(3, 8)).toEqual([3, 3, 2]);
        expect(codeGroups([3, 3, 4], 10)).toEqual([3, 3, 4]);
        expect(codeGroups([2], 6)).toEqual([2, 4]);
        expect(codeGroups([4, 4, 4], 6)).toEqual([4, 2]);
    });

    it("means no grouping for one group or anything unusable", () => {
        expect(codeGroups(undefined, 8)).toEqual([]);
        expect(codeGroups(8, 8)).toEqual([]);
        expect(codeGroups(0, 8)).toEqual([]);
        expect(codeGroups(NaN, 8)).toEqual([]);
        expect(codeGroups([], 8)).toEqual([]);
        expect(codeGroups([-1, "x" as unknown as number], 8)).toEqual([]);
    });

    it("finds the box nearest a point, a row at a time", () => {
        const rects = [
            { left: 0, right: 40, top: 0, bottom: 48 },
            { left: 50, right: 90, top: 0, bottom: 48 },
            { left: 0, right: 40, top: 56, bottom: 104 },
        ];
        expect(nearestBox(rects, 45, 20)).toBe(0);
        expect(nearestBox(rects, 70, 20)).toBe(1);
        expect(nearestBox(rects, 100, 80)).toBe(2);
        expect(nearestBox([], 0, 0)).toBe(-1);
    });
});

describe("CodeField groups and size", () => {
    it("draws eight places in two groups and keeps one input and one value", () => {
        render(CodeField, { props: { name: "code", length: 8, groups: 4, value: "12345678" } });
        expect(screen.getAllByRole("textbox")).toHaveLength(1);
        const groups = Array.from(document.querySelectorAll("[data-code-group]"));
        expect(groups).toHaveLength(2);
        expect(groups.map((group) => group.querySelectorAll("[data-code-cell]").length)).toEqual([4, 4]);
        expect(cells()).toEqual(["1", "2", "3", "4", "5", "6", "7", "8"]);
        expect(field().value).toBe("12345678");
        expect(document.querySelector("[data-code-cells]")?.getAttribute("aria-hidden")).toBe("true");
        expect(document.querySelector("[data-code-cells]")?.className).toContain("flex-wrap");
        // The grouping is not spoken: the same one description as without it.
        expect(described(field())).toBe("8 digits");
    });

    it("fills from a paste with a space or a dash between the groups", async () => {
        render(CodeField, { props: { length: 8, groups: 4 } });
        field().focus();
        pasteText(field(), "1234 5678");
        await tick();
        expect(field().value).toBe("12345678");
        pasteText(field(), "8765-4321");
        await tick();
        expect(field().value).toBe("87654321");
    });

    it("has no groups when none are asked for, or only one", () => {
        render(CodeField, { props: { length: 8 } });
        expect(document.querySelectorAll("[data-code-group]")).toHaveLength(0);
        expect(document.querySelector("[data-grouped]")).toBeNull();
        cleanup();
        render(CodeField, { props: { length: 8, groups: 8 } });
        expect(document.querySelectorAll("[data-code-group]")).toHaveLength(0);
    });

    it("keeps the caret mark on the right box across groups", async () => {
        render(CodeField, { props: { length: 8, groups: 4, value: "12345" } });
        field().focus();
        field().setSelectionRange(5, 5);
        await fireEvent.keyUp(field());
        expect(document.querySelector("[data-active]")).toBe(document.querySelectorAll("[data-code-cell]")[5]);
    });

    it("maps a tap to the nearest box, also on a second row", async () => {
        render(CodeField, { props: { length: 8, groups: 4, value: "12345678" } });
        const boxes = Array.from(document.querySelectorAll("[data-code-cell]")) as HTMLElement[];
        boxes.forEach((box, index) => {
            const row = Math.floor(index / 4);
            const left = (index % 4) * 50;
            box.getBoundingClientRect = () => ({ left, right: left + 40, top: row * 56, bottom: row * 56 + 48 }) as DOMRect;
        });
        await fireEvent.click(field(), { clientX: 105, clientY: 70 });
        expect(field().selectionStart).toBe(6);
    });

    it("never makes a box smaller than its digit, whatever the text size", () => {
        render(CodeField, { props: { length: 8, groups: 4 } });
        const box = document.querySelector("[data-code-cell]") as HTMLElement;
        expect(box.style.minInlineSize).toBe("1.15em");
        expect((document.querySelector("[data-code-group]") as HTMLElement).style.minInlineSize).toContain("7.25rem");
    });

    it("has a compact size that is still 44px tall, and a large one", () => {
        render(CodeField, { props: { size: "sm" } });
        const small = document.querySelector("[data-code-cell]") as HTMLElement;
        expect(small.className).toContain("h-11");
        expect(small.className).toContain("text-lg");
        cleanup();
        render(CodeField, { props: { size: "lg" } });
        expect((document.querySelector("[data-code-cell]") as HTMLElement).className).toContain("h-14");
        cleanup();
        render(CodeField, {});
        expect((document.querySelector("[data-code-cell]") as HTMLElement).className).toContain("h-12");
    });
});

describe("CodeField", () => {
    it("is one input with one name, the one-time-code autocomplete and the numeric keyboard", () => {
        render(CodeField, { props: { name: "code" } });
        expect(screen.getAllByRole("textbox")).toHaveLength(1);
        const input = screen.getByRole("textbox", { name: "Verification code" });
        expect(input.getAttribute("autocomplete")).toBe("one-time-code");
        expect(input.getAttribute("inputmode")).toBe("numeric");
        expect(input.getAttribute("name")).toBe("code");
        expect(described(input)).toBe("6 digits");
        expect(document.querySelector("[data-code-cells]")?.getAttribute("aria-hidden")).toBe("true");
        expect(cells()).toHaveLength(6);
    });

    it("takes a label, hides it on request and describes the length of another code", () => {
        render(CodeField, { props: { label: "Code from the email", labelHidden: true, length: 4, mode: "alphanumeric" } });
        const input = screen.getByRole("textbox", { name: "Code from the email" });
        expect(input.getAttribute("inputmode")).toBe("text");
        expect(described(input)).toBe("4 characters");
        expect(screen.getByText("Code from the email").classList.contains("sr-only")).toBe(true);
        expect(cells()).toHaveLength(4);
    });

    it("types digits into the boxes and refuses letters", async () => {
        render(CodeField, { props: { name: "code" } });
        await userEvent.type(field(), "12a3");
        expect(field().value).toBe("123");
        expect(cells()).toEqual(["1", "2", "3", "", "", ""]);
    });

    it("lets letters in when asked to", async () => {
        render(CodeField, { props: { mode: "alphanumeric" } });
        await userEvent.type(field(), "a1B-2");
        expect(field().value).toBe("a1B2");
    });

    it("stops at the length and calls oncomplete once, with the code", async () => {
        const oncomplete = vi.fn();
        render(CodeField, { props: { oncomplete } });
        await userEvent.type(field(), "1234567");
        expect(field().value).toBe("123456");
        expect(oncomplete).toHaveBeenCalledTimes(1);
        expect(oncomplete).toHaveBeenCalledWith("123456");
    });

    it("pastes a whole code with a space or a dash in it, with the caret anywhere", async () => {
        const oncomplete = vi.fn();
        render(CodeField, { props: { oncomplete } });
        field().focus();
        pasteText(field(), "123 456");
        await tick();
        expect(field().value).toBe("123456");
        expect(cells()).toEqual(["1", "2", "3", "4", "5", "6"]);
        expect(oncomplete).toHaveBeenCalledWith("123456");

        field().setSelectionRange(2, 2);
        pasteText(field(), "987-654");
        await tick();
        expect(field().value).toBe("987654");
        expect(oncomplete).toHaveBeenLastCalledWith("987654");
    });

    it("ignores a paste with nothing in it that belongs", async () => {
        render(CodeField, { props: { value: "12" } });
        field().focus();
        pasteText(field(), "abc");
        expect(field().value).toBe("12");
    });

    it("replaces a filled place that a digit is typed over", async () => {
        render(CodeField, { props: { value: "123456" } });
        field().focus();
        field().setSelectionRange(2, 2);
        await userEvent.keyboard("9");
        expect(field().value).toBe("129456");
        expect(field().selectionStart).toBe(3);
    });

    it("clears backwards with Backspace", async () => {
        render(CodeField, { props: { value: "123" } });
        field().focus();
        field().setSelectionRange(3, 3);
        await userEvent.keyboard("{Backspace}");
        expect(field().value).toBe("12");
        expect(cells()).toEqual(["1", "2", "", "", "", ""]);
    });

    it("moves the caret with a tap on a box, to the end when the box is empty", async () => {
        render(CodeField, { props: { value: "123" } });
        const boxes = Array.from(document.querySelectorAll("[data-code-cell]")) as HTMLElement[];
        boxes.forEach((box, index) =>
            box.getBoundingClientRect = () => ({ left: index * 50, right: index * 50 + 40 }) as DOMRect,
        );
        await fireEvent.click(field(), { clientX: 60 });
        expect(field().selectionStart).toBe(1);
        await fireEvent.click(field(), { clientX: 260 });
        expect(field().selectionStart).toBe(3);
    });

    it("marks the box the caret is in only while it has focus", async () => {
        render(CodeField, { props: { value: "12" } });
        expect(document.querySelector("[data-active]")).toBeNull();
        field().focus();
        field().setSelectionRange(2, 2);
        await fireEvent.keyUp(field());
        expect(cells().indexOf("")).toBe(2);
        expect(document.querySelectorAll("[data-active]")).toHaveLength(1);
        expect(document.querySelector("[data-active]")).toBe(document.querySelectorAll("[data-code-cell]")[2]);
        field().blur();
        await Promise.resolve();
        expect(document.querySelector("[data-active]")).toBeNull();
    });

    it("follows bind:value both ways", async () => {
        render(CodeFieldHarness, { props: { initial: "12" } });
        expect(field().value).toBe("12");
        field().focus();
        field().setSelectionRange(2, 2);
        await userEvent.keyboard("3");
        expect(screen.getByTestId("bound").textContent).toBe("123");
        await userEvent.click(screen.getByRole("button", { name: "Set" }));
        expect(field().value).toBe("654321");
        expect(cells()).toEqual(["6", "5", "4", "3", "2", "1"]);
    });

    it("does not call oncomplete for a value the parent sets", async () => {
        const oncomplete = vi.fn();
        render(CodeFieldHarness, { props: { oncomplete } });
        await userEvent.click(screen.getByRole("button", { name: "Set" }));
        expect(oncomplete).not.toHaveBeenCalled();
    });

    it("ties an error to the field, announces it and marks the field invalid", () => {
        render(CodeField, { props: { error: "That code is wrong.", hint: "From the email" } });
        const input = field();
        expect(input.getAttribute("aria-invalid")).toBe("true");
        const alert = screen.getByRole("alert");
        expect(alert.textContent).toContain("That code is wrong.");
        expect(described(input)).toBe("6 digits From the email That code is wrong.");
    });

    it("passes disabled, readonly, required and other attributes to the input, and does not type when read-only", async () => {
        render(CodeField, { props: { readonly: true, required: true, "data-testid": "code", value: "12" } });
        const input = field();
        expect(input.hasAttribute("readonly")).toBe(true);
        expect(input.required).toBe(true);
        expect(input.getAttribute("data-testid")).toBe("code");
        await userEvent.type(input, "3");
        expect(input.value).toBe("12");
        cleanup();
        render(CodeField, { props: { disabled: true } });
        expect(field().disabled).toBe(true);
    });

    it("uses the words of a strings provider, and the strings prop over them", () => {
        render(CodeFieldHarness, { props: { provider: true } });
        const input = screen.getByRole("textbox", { name: "Verifieringskod" });
        expect(described(input)).toBe("6 siffror");
        cleanup();
        render(CodeField, { props: { strings: { label: "Kod" } } });
        expect(screen.getByRole("textbox", { name: "Kod" })).toBeTruthy();
    });
});
