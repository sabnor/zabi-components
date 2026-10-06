import { cleanup, fireEvent, render, screen } from "@testing-library/svelte";
import { afterEach, describe, expect, it, vi } from "vitest";

import Slider from "../src/components/atoms/Slider.svelte";
import SliderHarness from "./fixtures/SliderHarness.svelte";

afterEach(cleanup);

const slider = () => screen.getByRole("slider") as HTMLInputElement;
const bound = () => screen.getByTestId("bound").textContent;
const shown = () => document.querySelector("[data-slider-value]")?.textContent?.trim();

/** What a drag or an arrow key does, as far as the DOM is concerned. */
async function setTo(value: number) {
    await fireEvent.input(slider(), { target: { value: String(value) } });
}

describe("Slider", () => {
    it("is a native range input named by its label", () => {
        render(SliderHarness, { props: { initial: 30 } });
        const input = screen.getByRole("slider", { name: "Volume" }) as HTMLInputElement;
        expect(input.tagName).toBe("INPUT");
        expect(input.type).toBe("range");
        expect(input.min).toBe("0");
        expect(input.max).toBe("100");
        expect(input.step).toBe("1");
        expect(input.value).toBe("30");
        expect(screen.getByText("Volume").getAttribute("for")).toBe(input.id);
    });

    it("binds the value as a number and reports native input and change", async () => {
        const oninput = vi.fn();
        const onchange = vi.fn();
        render(SliderHarness, { props: { initial: 30, oninput, onchange } });

        await setTo(45);
        expect(bound()).toBe("45");
        expect(oninput).toHaveBeenCalledTimes(1);
        expect(oninput.mock.calls[0][0]).toBeInstanceOf(Event);
        expect(onchange).not.toHaveBeenCalled();

        await fireEvent.change(slider(), { target: { value: "50" } });
        expect(onchange).toHaveBeenCalledTimes(1);
    });

    it("starts at min when no value is given", () => {
        // Unbound, as in a plain form that only reads the submitted value.
        render(Slider, { props: { min: 20, max: 80, "aria-label": "Volume" } });
        expect(slider().value).toBe("20");
        expect(slider().style.getPropertyValue("--zabi-slider-ratio")).toBe("0");
        expect(screen.getByRole("slider", { name: "Volume" })).toBe(slider());
    });

    it("passes min, max and step to the input", () => {
        render(SliderHarness, { props: { initial: 1.5, min: 1, max: 3, step: 0.5 } });
        expect(slider().min).toBe("1");
        expect(slider().max).toBe("3");
        expect(slider().step).toBe("0.5");
        expect(slider().value).toBe("1.5");
    });

    it("submits with a form under its name", async () => {
        render(SliderHarness, { props: { initial: 30 } });
        await setTo(70);
        const data = new FormData(screen.getByTestId("form") as HTMLFormElement);
        expect(data.get("volume")).toBe("70");
    });

    it("tells the track how much to fill, clamped to the range", async () => {
        render(SliderHarness, { props: { initial: 25 } });
        expect(slider().style.getPropertyValue("--zabi-slider-ratio")).toBe("0.25");
        await setTo(100);
        expect(slider().style.getPropertyValue("--zabi-slider-ratio")).toBe("1");
        cleanup();

        render(SliderHarness, { props: { initial: 50, min: 40, max: 60 } });
        expect(slider().style.getPropertyValue("--zabi-slider-ratio")).toBe("0.5");
        cleanup();

        // A value outside the range, or an empty range, must not overfill.
        render(SliderHarness, { props: { initial: 500 } });
        expect(slider().style.getPropertyValue("--zabi-slider-ratio")).toBe("1");
        cleanup();
        render(SliderHarness, { props: { initial: 5, min: 10, max: 10 } });
        expect(slider().style.getPropertyValue("--zabi-slider-ratio")).toBe("0");
    });

    it("shows the value only when asked, and keeps it current", async () => {
        const { unmount } = render(SliderHarness, { props: { initial: 30 } });
        expect(shown()).toBeUndefined();
        unmount();

        render(SliderHarness, { props: { initial: 30, showValue: true } });
        expect(shown()).toBe("30");
        const output = document.querySelector("output")!;
        expect(output.getAttribute("for")).toBe(slider().id);
        await setTo(64);
        expect(shown()).toBe("64");
    });

    it("formats the value for the eye and for assistive technology alike", async () => {
        render(SliderHarness, {
            props: { initial: 30, showValue: true, percent: true },
        });
        expect(shown()).toBe("30 %");
        expect(slider().getAttribute("aria-valuetext")).toBe("30 %");
        await setTo(80);
        expect(shown()).toBe("80 %");
        expect(slider().getAttribute("aria-valuetext")).toBe("80 %");
    });

    it("sets aria-valuetext from formatValue even when the value is not shown", () => {
        render(SliderHarness, { props: { initial: 30, percent: true } });
        expect(shown()).toBeUndefined();
        expect(slider().getAttribute("aria-valuetext")).toBe("30 %");
    });

    it("leaves aria-valuetext off without a formatter, so the number is read", () => {
        render(SliderHarness, { props: { initial: 30, showValue: true } });
        expect(slider().hasAttribute("aria-valuetext")).toBe(false);
    });

    it("still shows the value when the label is hidden or missing", () => {
        render(SliderHarness, {
            props: { initial: 30, showValue: true, hideLabel: true },
        });
        expect(screen.queryByText("Volume")).toBeNull();
        expect(shown()).toBe("30");
    });

    it("keeps each size on the shared control height scale, with a 44px input", () => {
        const rowOf = (size?: "sm" | "md" | "lg") => {
            const { unmount } = render(SliderHarness, { props: { size } });
            const row = slider().parentElement!.className.split(" ");
            const input = slider().className.split(" ");
            const dataSize = slider().getAttribute("data-size");
            unmount();
            return { row, input, dataSize };
        };
        expect(rowOf("sm").row).toContain("h-8");
        expect(rowOf().row).toContain("h-10");
        expect(rowOf("lg").row).toContain("h-12");
        expect(rowOf("sm").input).toContain("h-11");
        expect(rowOf().input).toContain("h-11");
        expect(rowOf("lg").input).toContain("h-12");
        expect(rowOf("sm").dataSize).toBe("sm");
        expect(rowOf().dataSize).toBe("md");
    });

    it("disables the native input", () => {
        render(SliderHarness, { props: { initial: 30, disabled: true, showValue: true } });
        expect(slider().disabled).toBe(true);
        expect(document.querySelector("[data-slider-value]")!.className).toContain(
            "text-action-disabled-text",
        );
    });

    it("ties helper text to the input", () => {
        render(SliderHarness, { props: { message: "Applies to all videos." } });
        const message = screen.getByText("Applies to all videos.");
        expect(slider().getAttribute("aria-describedby")).toBe(message.id);
        expect(message.getAttribute("role")).toBeNull();
        expect(slider().hasAttribute("aria-invalid")).toBe(false);
    });

    it("marks an error as invalid and announces it", () => {
        render(SliderHarness, {
            props: { message: "Choose at least 10.", variant: "error" },
        });
        const message = screen.getByRole("alert");
        expect(message.textContent?.trim()).toBe("Choose at least 10.");
        expect(message.className).toContain("text-error-text");
        expect(slider().getAttribute("aria-invalid")).toBe("true");
        expect(slider().getAttribute("aria-describedby")).toBe(message.id);
    });

    it("passes other attributes to the input", () => {
        render(SliderHarness);
        expect(screen.getByTestId("range")).toBe(slider());
    });
});
