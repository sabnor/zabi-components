import { cleanup, render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import Checkbox from "../src/components/atoms/Checkbox.svelte";
import Radio from "../src/components/atoms/Radio.svelte";
import Toggle from "../src/components/atoms/Toggle.svelte";
import { SELECTION_CONTROL_SHELL_STATE } from "../src/components/atoms/selection-control.styles";
import { openingTime } from "../src/components/util/temporal-field";
import DateHarness from "./fixtures/DateHarness.svelte";

afterEach(cleanup);

const css = readFileSync(resolve(__dirname, "../src/app.css"), "utf8");
const state = () => screen.getByTestId("state").textContent!.split("|")[0];
const hours = () => screen.getByRole("listbox", { name: "Hours" });
const minutes = () => screen.getByRole("listbox", { name: "Minutes" });
const selected = (box: HTMLElement) => box.querySelector('[aria-selected="true"]');
const tabStop = (box: HTMLElement) => box.querySelector<HTMLElement>('[role="option"][tabindex="0"]')!.dataset.value;
const openField = async (props: Record<string, unknown>) => {
    render(DateHarness, { props: { piece: "time", locale: "sv", ...props } });
    await userEvent.click(await screen.findByRole("button", { name: /^Starts/, expanded: false }));
    await screen.findByRole("dialog");
};

describe("openingTime (Z-117)", () => {
    const base = { now: [14, 37] as [number, number], stepMinutes: 5 };
    it("openAt, else now, on the step", () => {
        expect(openingTime({ ...base, openAt: "18:30" })).toEqual(["18", "30"]);
        expect(openingTime({ ...base })).toEqual(["14", "35"]);
        expect(openingTime({ ...base, openAt: "18:37", stepMinutes: 15 })).toEqual(["18", "30"]);
        expect(openingTime({ ...base, openAt: "nonsense" })).toEqual(["14", "35"]);
    });
    it("stays inside min and max", () => {
        expect(openingTime({ ...base, openAt: "06:00", min: "17:00", max: "21:00" })).toEqual(["17", "00"]);
        expect(openingTime({ ...base, openAt: "23:00", min: "17:00", max: "21:00" })).toEqual(["21", "00"]);
        expect(openingTime({ ...base, openAt: "12:00", min: "22:00", max: "06:00" })).toEqual(["22", "00"]);
    });
});

describe("TimeField openAt (Z-117)", () => {
    it("an empty field opens with the keyboard stop on openAt, nothing chosen, value untouched", async () => {
        await openField({ openAt: "18:30" });
        expect(tabStop(hours())).toBe("18");
        expect(tabStop(minutes())).toBe("30");
        expect(selected(hours())).toBeNull();
        expect(selected(minutes())).toBeNull();
        expect(state()).toBe("");
        expect((screen.getByRole("button", { name: "Done" }) as HTMLButtonElement).disabled).toBe(true);
        expect(document.querySelector("[data-chosen-time]")).toBeNull();
    });

    it("choosing after opening there sets the value only on Done", async () => {
        await openField({ openAt: "18:30" });
        await userEvent.click(hours().querySelector('[data-value="19"]')!);
        expect(state()).toBe("");
        await userEvent.click(screen.getByRole("button", { name: "Done" }));
        expect(state()).toBe("19:30");
    });

    it("a field with a value opens on the value, openAt is ignored", async () => {
        await openField({ openAt: "18:30", initialValue: "07:15" });
        expect(selected(hours())!.getAttribute("data-value")).toBe("07");
        expect(selected(minutes())!.getAttribute("data-value")).toBe("15");
    });

    it("without openAt the columns stand at a row, still nothing chosen", async () => {
        await openField({});
        expect(selected(hours())).toBeNull();
        expect(hours().querySelectorAll('[role="option"][tabindex="0"]')).toHaveLength(1);
        expect(state()).toBe("");
    });
});

describe("TimeField says what Done will set (Z-118)", () => {
    it("the chosen time is in the sheet beside Done, and follows the choice", async () => {
        await openField({ initialValue: "18:00" });
        const said = () => document.querySelector("[data-chosen-time]")!.textContent!.replace(/\s+/g, " ").trim();
        expect(said()).toBe("Chosen time 18:00");
        await userEvent.click(hours().querySelector('[data-value="07"]')!);
        expect(said()).toBe("Chosen time 07:00");
    });

    it("scrolling a column changes nothing: the value and the chosen row stay", async () => {
        await openField({ initialValue: "18:00" });
        hours().scrollTop = 0;
        hours().dispatchEvent(new Event("scroll"));
        expect(selected(hours())!.getAttribute("data-value")).toBe("18");
        expect(state()).toBe("18:00");
    });

    it("the word is the app's to set", async () => {
        await openField({ initialValue: "18:00", strings: { chosenTime: "Vald tid" } });
        expect(document.querySelector("[data-chosen-time]")!.textContent).toContain("Vald tid");
    });
});

describe("Checkbox and Radio box keeps its size (Z-119)", () => {
    const classes = (element: Element) => element.className.split(/\s+/);
    it("the box has shrink-0 with and without a description", () => {
        expect(SELECTION_CONTROL_SHELL_STATE.split(/\s+/)).toContain("shrink-0");
        const long = "Maximiliana-Alexandrina Bernadotte von Östergötland-Södermanland";
        const a = render(Checkbox, { props: { label: long } }).container;
        expect(classes(a.querySelector(".selection-control-shell")!)).toContain("shrink-0");
        cleanup();
        const b = render(Radio, { props: { label: long, name: "r", value: "x" } }).container;
        expect(classes(b.querySelector(".selection-control-shell")!)).toContain("shrink-0");
        cleanup();
        const c = render(Checkbox, { props: { label: "A", description: "B" } }).container;
        expect(classes(c.querySelector(".selection-control-shell")!)).toContain("shrink-0");
    });

    it("the row is centred, as before alpha.25 (withdrawn first-line alignment, D241)", () => {
        const plain = render(Checkbox, { props: { label: "Plain" } }).container.querySelector("label")!;
        expect(classes(plain)).toContain("items-center");
        expect(classes(plain)).not.toContain("items-start");
        expect(classes(plain)).not.toContain("pointer-coarse:py-3");
        expect(classes(plain)).toContain("pointer-coarse:min-h-11");
    });
});

describe("Toggle knob token (Z-121)", () => {
    it("the knob reads --color-toggle-thumb in front of the default knob", () => {
        render(Toggle, { props: { label: "Notiser" } });
        const thumb = screen.getByRole("switch").querySelector(".toggle-switch-thumb")!;
        expect(thumb.classList.contains("bg-toggle-thumb")).toBe(true);
        expect(thumb.classList.contains("bg-card")).toBe(false);
        expect(css).toMatch(/\.bg-toggle-thumb \{\s*background-color: var\(--color-toggle-thumb, var\(--color-toggle-knob\)\);/);
    });

    it("the token is declared nowhere, and the class comes before the forced-colours thumb rule", () => {
        expect(css).not.toMatch(/^\s*--color-toggle-thumb:/m);
        const forcedThumb = css.indexOf(".toggle-switch-thumb {\n    top: 1px");
        expect(forcedThumb).toBeGreaterThan(0);
        expect(css.indexOf(".bg-toggle-thumb {")).toBeLessThan(forcedThumb);
    });
});
