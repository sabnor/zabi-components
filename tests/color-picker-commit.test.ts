import { cleanup, fireEvent, render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import ColorPicker from "../src/components/atoms/ColorPicker.svelte";

/** `oncommit(value)`: once per committed change, never for half-typed input. */

const setup = (props: Record<string, unknown> = {}) => {
    const oncommit = vi.fn();
    const onchange = vi.fn();
    render(ColorPicker, { props: { value: "", oncommit, onchange, ...props } });
    const field = screen.getByRole("textbox") as HTMLInputElement;
    return { oncommit, onchange, field, user: userEvent.setup() };
};

beforeEach(() => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
});

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

describe("ColorPicker oncommit", () => {
    it("says nothing while typing, and the value once on blur", async () => {
        const { oncommit, field, user } = setup();
        await user.click(field);
        await user.type(field, "#12");
        await user.type(field, "8978");
        expect(oncommit).not.toHaveBeenCalled();
        await user.tab();
        expect(oncommit).toHaveBeenCalledTimes(1);
        expect(oncommit).toHaveBeenCalledWith("#128978");
    });

    it("expands #rgb and lowercases on Enter, and adds a missing #", async () => {
        const { oncommit, field, user } = setup();
        await user.type(field, "#ABC{Enter}");
        expect(oncommit).toHaveBeenLastCalledWith("#aabbcc");
        await user.clear(field);
        await user.type(field, "DDEEFF{Enter}");
        expect(oncommit).toHaveBeenLastCalledWith("#ddeeff");
    });

    it("never fires for an invalid value", async () => {
        const { oncommit, field, user } = setup();
        await user.type(field, "#12x");
        await user.tab();
        expect(oncommit).not.toHaveBeenCalled();
    });

    it("does not repeat the same value, Enter then blur included", async () => {
        const { oncommit, field, user } = setup();
        await user.type(field, "#abc{Enter}");
        await user.tab();
        expect(oncommit).toHaveBeenCalledTimes(1);
        await user.clear(field);
        await user.type(field, "#aabbcc");
        await user.tab();
        expect(oncommit).toHaveBeenCalledTimes(1);
    });

    it("says an empty string when the field is cleared", async () => {
        const { oncommit, field, user } = setup({ value: "#112233" });
        await user.clear(field);
        await user.tab();
        expect(oncommit).toHaveBeenCalledTimes(1);
        expect(oncommit).toHaveBeenCalledWith("");
    });

    it("does not fire for a blur that changed nothing", async () => {
        const { oncommit, field, user } = setup({ value: "#112233" });
        await user.click(field);
        await user.tab();
        expect(oncommit).not.toHaveBeenCalled();
    });

    it("keeps onchange as it was: the event, on blur", async () => {
        const { onchange, field, user } = setup();
        await user.type(field, "#123456");
        await user.tab();
        expect(onchange.mock.calls.at(-1)![0]).toBeInstanceOf(Event);
    });

    it("commits each key step on the map, and the end of a drag", async () => {
        const { oncommit, user } = setup({ value: "#bf4040" });
        await user.click(screen.getByRole("button", { name: /open/i }));
        const saturation = screen.getByRole("slider", { name: "Saturation" });
        saturation.focus();
        await user.keyboard("{ArrowRight}");
        expect(oncommit).toHaveBeenCalledTimes(1);
        expect(oncommit.mock.calls[0][0]).toMatch(/^#[0-9a-f]{6}$/);
        await user.keyboard("{ArrowRight}");
        expect(oncommit).toHaveBeenCalledTimes(2);

        const group = screen.getByRole("group", { name: "Saturation and lightness" });
        group.getBoundingClientRect = () => ({ left: 0, top: 0, width: 100, height: 100, right: 100, bottom: 100, x: 0, y: 0, toJSON() {} }) as DOMRect;
        await fireEvent.pointerDown(group, { pointerId: 1, clientX: 10, clientY: 10, button: 0 });
        await fireEvent.pointerMove(group, { pointerId: 1, clientX: 20, clientY: 20 });
        expect(oncommit).toHaveBeenCalledTimes(2);
        await fireEvent.pointerUp(group, { pointerId: 1 });
        expect(oncommit).toHaveBeenCalledTimes(3);
    });

    it("commits a hue drag at its end, a hue key step at once", async () => {
        const { oncommit } = setup({ value: "#bf4040" });
        await userEvent.click(screen.getByRole("button", { name: /open/i }));
        const hue = screen.getByRole("slider", { name: "Hue slider" });
        await fireEvent.pointerDown(hue, { pointerId: 1 });
        await fireEvent.input(hue, { target: { value: "120" } });
        await fireEvent.input(hue, { target: { value: "200" } });
        expect(oncommit).not.toHaveBeenCalled();
        await fireEvent.pointerUp(hue, { pointerId: 1 });
        expect(oncommit).toHaveBeenCalledTimes(1);
        await fireEvent.input(hue, { target: { value: "30" } });
        expect(oncommit).toHaveBeenCalledTimes(2);
    });
});
