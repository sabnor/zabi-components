import { cleanup, fireEvent, render, screen, within } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import ColorPicker from "../src/components/atoms/ColorPicker.svelte";

/**
 * The colour map of ColorPicker: saturation across, lightness up.
 *
 * It was a `<div role="button" tabindex="0">` with no name and an
 * `onmousedown`: a Tab stop that said "button" and did nothing for a key, and
 * a surface a finger or a pen could not use. The hex field was the only way
 * in without a mouse.
 *
 * It is now two sliders that share one surface, which is how the platform
 * already says "a value between two ends": two visually hidden
 * `<input type="range">`, named, one Tab stop between them. The arrow keys
 * work as on a map (left and right for saturation, up and down for
 * lightness), and the surface takes any pointer.
 */

const open = async (props: Record<string, unknown> = {}) => {
    const user = userEvent.setup();
    const result = render(ColorPicker, { props: { value: "#bf4040", ...props } });
    await user.click(screen.getByRole("button", { name: /color picker|¤open/i }));
    const dialog = await screen.findByRole("dialog");
    return { user, dialog, ...result };
};

const area = (name = "Saturation and lightness") => screen.getByRole("group", { name });
const saturation = () => screen.getByRole("slider", { name: "Saturation" }) as HTMLInputElement;
const lightness = () => screen.getByRole("slider", { name: "Lightness" }) as HTMLInputElement;
const hex = () => (screen.getByRole("textbox") as HTMLInputElement).value;

beforeEach(() => {
    // jsdom has no canvas; keep the draw loop a no-op.
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
});

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

describe("ColorPicker's colour map: what it is", () => {
    it("is a named group of two sliders, not a button", async () => {
        const { dialog } = await open();
        expect(within(dialog).queryByRole("button")).toBeNull();
        expect(within(area()).getAllByRole("slider")).toEqual([saturation(), lightness()]);
        // #bf4040 is hsl(0, 50%, 50%).
        expect(saturation().value).toBe("50");
        expect(lightness().value).toBe("50");
        for (const slider of [saturation(), lightness()]) {
            expect(slider.type).toBe("range");
            expect(slider.min).toBe("0");
            expect(slider.max).toBe("100");
        }
    });

    it("says each value with the colour it makes", async () => {
        await open();
        expect(saturation().getAttribute("aria-valuetext")).toBe("50%, #bf4040");
        expect(lightness().getAttribute("aria-valuetext")).toBe("50%, #bf4040");
    });

    it("is one Tab stop: saturation, with lightness reached by its keys", async () => {
        await open();
        expect(saturation().tabIndex).toBe(0);
        expect(lightness().tabIndex).toBe(-1);
        expect(area().hasAttribute("tabindex"), "The surface itself is not a stop").toBe(false);
    });

    it("takes its names from strings", async () => {
        await open({ strings: { open: "¤open", area: "Mättnad och ljushet", saturation: "Mättnad", lightness: "Ljushet" } });
        const group = screen.getByRole("group", { name: "Mättnad och ljushet" });
        expect(within(group).getByRole("slider", { name: "Mättnad" })).toBeTruthy();
        expect(within(group).getByRole("slider", { name: "Ljushet" })).toBeTruthy();
    });
});

describe("ColorPicker: what it says about a value that is not a colour", () => {
    it("says so in English by default, and in the app's words from strings", async () => {
        const user = userEvent.setup();
        const first = render(ColorPicker, { props: { value: "" } });
        await user.type(screen.getByRole("textbox"), "zzz");
        expect(document.body.textContent).toContain("Please enter a valid hex color (e.g., #ff0000 or #f00)");
        first.unmount();

        render(ColorPicker, { props: { value: "", strings: { invalidHex: "Skriv en hexfärg, till exempel #ff0000" } } });
        await user.type(screen.getByRole("textbox"), "zzz");
        expect(document.body.textContent).toContain("Skriv en hexfärg, till exempel #ff0000");
        expect(document.body.textContent).not.toContain("Please enter");
    });
});

describe("ColorPicker's colour map: the keyboard", () => {
    it("left and right move saturation, by one and by ten with Shift", async () => {
        const onchange = vi.fn();
        const { user } = await open({ onchange });
        saturation().focus();
        await user.keyboard("{ArrowRight}");
        expect(saturation().value).toBe("51");
        await user.keyboard("{Shift>}{ArrowRight}{/Shift}");
        expect(saturation().value).toBe("61");
        await user.keyboard("{ArrowLeft}{ArrowLeft}");
        expect(saturation().value).toBe("59");
        await user.keyboard("{Shift>}{ArrowLeft}{/Shift}");
        expect(saturation().value).toBe("49");
        expect(lightness().value, "The other axis is untouched").toBe("50");
        expect(hex()).toBe("#be4141");
        expect(onchange).toHaveBeenCalled();
    });

    it("up and down move lightness from either slider, and focus goes to the one that moved", async () => {
        const { user } = await open();
        saturation().focus();
        await user.keyboard("{ArrowUp}");
        expect(lightness().value).toBe("51");
        expect(saturation().value).toBe("50");
        expect(document.activeElement, "So a screen reader says the value that changed").toBe(lightness());
        await user.keyboard("{Shift>}{ArrowDown}{/Shift}");
        expect(lightness().value).toBe("41");
        // And back across from there.
        await user.keyboard("{ArrowRight}");
        expect(saturation().value).toBe("51");
        expect(document.activeElement).toBe(saturation());
    });

    it("stops at the ends", async () => {
        const { user } = await open({ value: "#ff0000" });
        saturation().focus();
        expect(saturation().value).toBe("100");
        await user.keyboard("{Shift>}{ArrowRight}{/Shift}{ArrowRight}");
        expect(saturation().value).toBe("100");
        await user.keyboard("{Shift>}{ArrowUp}{ArrowUp}{ArrowUp}{ArrowUp}{ArrowUp}{ArrowUp}{/Shift}");
        expect(lightness().value).toBe("100");
        expect(hex()).toBe("#ffffff");
    });

    it("the slider's own input sets the value too: Home, End and a screen reader's gesture", async () => {
        await open();
        await fireEvent.input(saturation(), { target: { value: "0" } });
        expect(hex()).toBe("#808080");
        await fireEvent.input(lightness(), { target: { value: "25" } });
        expect(lightness().getAttribute("aria-valuetext")).toBe("25%, #404040");
    });
});

describe("ColorPicker's colour map: any pointer", () => {
    const layOut = () => {
        vi.spyOn(area(), "getBoundingClientRect").mockReturnValue({
            left: 100, top: 200, width: 200, height: 100, right: 300, bottom: 300, x: 100, y: 200, toJSON: () => ({}),
        } as DOMRect);
    };

    it.each(["mouse", "touch", "pen"])("a %s press sets both values from where it lands, and a drag follows", async (pointerType) => {
        await open();
        layOut();
        // A quarter across, three quarters down: 25% saturation, 25% lightness.
        await fireEvent.pointerDown(area(), { pointerId: 1, pointerType, button: 0, clientX: 150, clientY: 275 });
        expect(saturation().value).toBe("25");
        expect(lightness().value).toBe("25");

        await fireEvent.pointerMove(area(), { pointerId: 1, pointerType, clientX: 300, clientY: 200 });
        expect(saturation().value).toBe("100");
        expect(lightness().value).toBe("100");

        // Past the edge, it stays at the end.
        await fireEvent.pointerMove(area(), { pointerId: 1, pointerType, clientX: 20, clientY: 900 });
        expect(saturation().value).toBe("0");
        expect(lightness().value).toBe("0");

        await fireEvent.pointerUp(area(), { pointerId: 1, pointerType, clientX: 20, clientY: 900 });
        await fireEvent.pointerMove(area(), { pointerId: 1, pointerType, clientX: 200, clientY: 250 });
        expect(saturation().value, "Released: a move does nothing").toBe("0");
    });

    it("a move without a press does nothing, and neither does another mouse button", async () => {
        await open();
        layOut();
        await fireEvent.pointerMove(area(), { pointerId: 1, pointerType: "mouse", clientX: 300, clientY: 200 });
        expect(saturation().value).toBe("50");
        await fireEvent.pointerDown(area(), { pointerId: 1, pointerType: "mouse", button: 2, clientX: 300, clientY: 200 });
        expect(saturation().value).toBe("50");
    });

    it("does not let a drag scroll the page under it, and gives the hue track a finger's height", async () => {
        await open();
        expect(area().className.split(/\s+/)).toContain("touch-none");
        const hue = screen.getByRole("slider", { name: "Hue slider" });
        expect(hue.parentElement!.className.split(/\s+/)).toEqual(expect.arrayContaining(["h-6", "pointer-coarse:h-11"]));
    });
});

describe("ColorPicker: Escape, the map redraw and the names", () => {
    it("opens with the keyboard into the popover, and Escape closes it and returns focus to the swatch", async () => {
        const user = userEvent.setup();
        render(ColorPicker, { props: { value: "#bf4040" } });
        const swatch = screen.getByRole("button", { name: /color picker/i });
        swatch.focus();
        await user.keyboard("{Enter}");
        const dialog = await screen.findByRole("dialog");
        expect(dialog.contains(document.activeElement)).toBe(true);
        await user.tab();
        expect(dialog.contains(document.activeElement)).toBe(true);
        await user.keyboard("{Escape}");
        expect(screen.queryByRole("dialog")).toBeNull();
        expect(document.activeElement).toBe(swatch);
    });

    it("closes on Escape from the swatch while open, and does not reach a parent unless it was open", async () => {
        const user = userEvent.setup();
        const parentKey = vi.fn();
        document.body.addEventListener("keydown", parentKey);
        render(ColorPicker, { props: { value: "#bf4040" } });
        const swatch = screen.getByRole("button", { name: /color picker/i });
        swatch.focus();
        await user.keyboard("{Escape}");
        expect(parentKey).toHaveBeenCalledTimes(1);
        parentKey.mockClear();
        await user.keyboard("{Enter}");
        await screen.findByRole("dialog");
        parentKey.mockClear();
        swatch.focus();
        await user.keyboard("{Escape}");
        expect(screen.queryByRole("dialog")).toBeNull();
        expect(parentKey).not.toHaveBeenCalled();
        document.body.removeEventListener("keydown", parentKey);
    });

    it("a press outside closes it without taking focus from what was pressed", async () => {
        const { user } = await open();
        const other = document.createElement("button");
        document.body.appendChild(other);
        other.focus();
        await fireEvent.mouseDown(other);
        expect(screen.queryByRole("dialog")).toBeNull();
        expect(document.activeElement).toBe(other);
        other.remove();
        void user;
    });

    it("redraws the map when the hex is typed", async () => {
        const fills: string[] = [];
        vi.restoreAllMocks();
        vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({
            set fillStyle(v: string) {
                fills.push(v);
            },
            fillRect() {},
        } as unknown as CanvasRenderingContext2D);
        const { user } = await open();
        await new Promise((r) => setTimeout(r, 0));
        fills.length = 0;
        const input = screen.getByRole("textbox");
        // Focus by key, not a press: a press on the field is outside the popover.
        (input as HTMLInputElement).focus();
        (input as HTMLInputElement).select();
        await user.keyboard("#00cc33");
        await new Promise((r) => setTimeout(r, 0));
        expect(fills.length).toBeGreaterThan(0);
        // hue 135 at the full-saturation, mid-lightness column: green-dominant
        expect(fills.some((c) => c === "#00ff44" || c === "#00ff45" || /^#00[a-f0-9]{2}[0-4][0-9a-f]$/.test(c))).toBe(true);
    });

    it("names the field and the swatch from the visible label, and keeps today's names without one", async () => {
        const { unmount } = render(ColorPicker, { props: { value: "#bf4040", label: "Brand colour" } });
        expect(screen.getByRole("textbox", { name: "Brand colour" })).toBeTruthy();
        expect(screen.getByRole("button", { name: /^Brand colour, / })).toBeTruthy();
        unmount();
        render(ColorPicker, { props: { value: "#bf4040" } });
        expect(screen.getByRole("textbox", { name: "Hex color input" })).toBeTruthy();
        expect(screen.getByRole("button", { name: "Open color picker" })).toBeTruthy();
    });
});
