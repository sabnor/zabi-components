import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { formatDate, formatTime } from "../src/components/util/date";
import {
    hourChoices,
    minuteChoices,
    minuteStep,
    stepFitsLibraryPicker,
    timeInRange,
} from "../src/components/util/temporal-field";
import DateHarness from "./fixtures/DateHarness.svelte";

/**
 * DateField and TimeField with a `locale`: the library's own display of the
 * value and its own picker over the native input, which stays as the form
 * control. What the server sends is in temporal-locale-ssr.test.ts.
 */

const prototype = HTMLInputElement.prototype as { showPicker?: () => void };

beforeEach(() => {
    delete prototype.showPicker;
});

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    delete prototype.showPicker;
});

const state = () => screen.getByTestId("state").textContent!.split("|")[0];
const native = () => document.querySelector<HTMLInputElement>("input[data-temporal-native]")!;
const trigger = (name: string | RegExp) => screen.findByRole("button", { name, expanded: false });
const dialog = () => screen.queryByRole("dialog");
const hours = () => within_listbox("Hours");
const minutes = () => within_listbox("Minutes");
const within_listbox = (name: string) => screen.getByRole("listbox", { name });
const optionTexts = (box: HTMLElement) => [...box.querySelectorAll('[role="option"]')].map((option) => option.textContent!.trim());
const option = (box: HTMLElement, text: string) =>
    [...box.querySelectorAll<HTMLElement>('[role="option"]')].find((element) => element.textContent!.trim() === text)!;

describe("pure parts", () => {
    it("the hours are written as the locale writes an hour, and the values stay 00 to 23", () => {
        const sv = hourChoices("sv");
        const us = hourChoices("en-US");
        expect(sv).toHaveLength(24);
        expect(sv[19].value).toBe("19");
        expect(sv[19].label).toBe("19");
        expect(us[19].value).toBe("19");
        expect(us[19].label).toBe("7 PM");
    });

    it("minutes: every step, five without one, plus a current minute that is off the step", () => {
        const values = (options: { value: string }[]) => options.map((choice) => choice.value);
        expect(values(minuteChoices({ locale: "sv", stepMinutes: 5, hour: "" }))).toHaveLength(12);
        expect(values(minuteChoices({ locale: "sv", stepMinutes: minuteStep(900), hour: "" }))).toEqual(["00", "15", "30", "45"]);
        expect(values(minuteChoices({ locale: "sv", stepMinutes: 15, hour: "", current: "19:07" }))).toEqual(["00", "07", "15", "30", "45"]);
        expect(minuteStep(undefined)).toBe(5);
        expect(stepFitsLibraryPicker(300)).toBe(true);
        expect(stepFitsLibraryPicker(30)).toBe(false);
        expect(stepFitsLibraryPicker("any")).toBe(false);
    });

    it("min and max disable what is outside, also over midnight", () => {
        expect(timeInRange(9, 0, "10:00", "18:00")).toBe(false);
        expect(timeInRange(10, 0, "10:00", "18:00")).toBe(true);
        expect(timeInRange(23, 30, "22:00", "06:00")).toBe(true);
        expect(timeInRange(12, 0, "22:00", "06:00")).toBe(false);
        const choices = hourChoices("sv", "17:00", "19:30");
        expect(choices.filter((choice) => !choice.disabled).map((choice) => choice.value)).toEqual(["17", "18", "19"]);
    });
});

describe("date field with a locale", () => {
    it("shows the date in the locale and is named by its label and value", async () => {
        render(DateHarness, { props: { piece: "date", locale: "sv", initialValue: "2026-11-10" } });
        const button = await trigger(/^Quiz date/);
        expect(button.textContent).toContain(formatDate("2026-11-10", "sv"));
        expect(button.textContent).toContain("10 nov. 2026");
        expect(button.getAttribute("aria-haspopup")).toBe("dialog");
        expect(button.getAttribute("type")).toBe("button");
        expect(button.getAttribute("aria-labelledby")).toBeTruthy();
        // The label points at the button.
        expect(document.querySelector(`label[for="${button.id}"]`)?.textContent).toBe("Quiz date");
    });

    it("keeps the native input as the form control, out of sight, the tab order and the accessibility tree", async () => {
        render(DateHarness, { props: { piece: "date", locale: "sv", initialValue: "2026-11-10", min: "2026-01-01", max: "2026-12-31", required: true } });
        await trigger(/^Quiz date/);
        const input = native();
        expect(input.type).toBe("date");
        expect(input.name).toBe("when");
        expect(input.value).toBe("2026-11-10");
        expect(input.min).toBe("2026-01-01");
        expect(input.max).toBe("2026-12-31");
        expect(input.required).toBe(true);
        expect(input.getAttribute("tabindex")).toBe("-1");
        expect(input.getAttribute("aria-hidden")).toBe("true");
        expect(input.getAttribute("style")).toMatch(/opacity:\s*0/);
        // Its own label is not drawn twice.
        expect(document.querySelectorAll("label")).toHaveLength(1);
        expect(screen.queryByLabelText("Quiz date", { selector: "input" })).toBeNull();
    });

    it("submits the ISO value", async () => {
        const onsubmitted = vi.fn();
        render(DateHarness, { props: { piece: "date", locale: "sv", initialValue: "2026-11-10", onsubmitted } });
        await trigger(/^Quiz date/);
        await userEvent.click(screen.getByRole("button", { name: "Send" }));
        expect(onsubmitted).toHaveBeenCalledWith({ when: "2026-11-10" });
    });

    it("shows the placeholder, in its colour, while empty; and the format the app asked for", async () => {
        const first = render(DateHarness, { props: { piece: "date", locale: "sv", placeholder: "Välj datum" } });
        const empty = await trigger(/^Quiz date/);
        expect(empty.textContent).toContain("Välj datum");
        expect(empty.querySelector(".text-input-placeholder")).not.toBeNull();
        first.unmount();
        render(DateHarness, {
            props: { piece: "date", locale: "sv", initialValue: "2026-10-06", format: { weekday: "short", day: "numeric", month: "short" } },
        });
        const formatted = await trigger(/^Quiz date/);
        expect(formatted.textContent).toContain(formatDate("2026-10-06", "sv", { weekday: "short", day: "numeric", month: "short" }));
        expect(formatted.textContent).toMatch(/tis 6 okt/);
    });

    it("opens the calendar in a sheet named by the label, with the value selected and the locale's names", async () => {
        render(DateHarness, { props: { piece: "date", locale: "sv", initialValue: "2026-11-10" } });
        const button = await trigger(/^Quiz date/);
        await userEvent.click(button);
        const sheet = await screen.findByRole("dialog", { name: "Quiz date" });
        expect(button.getAttribute("aria-expanded")).toBe("true");
        expect(sheet.querySelector('[data-month="2026-11"]')).not.toBeNull();
        expect(sheet.querySelector('[data-date="2026-11-10"]')!.closest("td")!.getAttribute("aria-selected")).toBe("true");
        expect(sheet.textContent).toMatch(/november 2026/i);
    });

    it("choosing a day sets the ISO value, fires input and change, closes, and focuses the button again", async () => {
        const onfieldchange = vi.fn();
        const onfieldinput = vi.fn();
        render(DateHarness, { props: { piece: "date", locale: "sv", initialValue: "2026-11-10", onfieldchange, onfieldinput } });
        const button = await trigger(/^Quiz date/);
        await userEvent.click(button);
        const sheet = await screen.findByRole("dialog");
        await userEvent.click(sheet.querySelector<HTMLElement>('[data-date="2026-11-20"]')!);
        await waitFor(() => expect(dialog()).toBeNull());
        expect(state()).toBe("2026-11-20");
        expect(native().value).toBe("2026-11-20");
        expect(onfieldchange).toHaveBeenCalledTimes(1);
        expect(onfieldinput).toHaveBeenCalledTimes(1);
        expect((onfieldchange.mock.calls[0][0] as Event).target).toBe(native());
        await waitFor(() => expect(document.activeElement).toBe(screen.getByRole("button", { name: /^Quiz date/ })));
        expect(screen.getByRole("button", { name: /^Quiz date/ }).textContent).toContain("20 nov. 2026");
    });

    it("opens from the keyboard, moves with the grid's keys, and chooses with Enter", async () => {
        render(DateHarness, { props: { piece: "date", locale: "sv", initialValue: "2026-11-10" } });
        const button = await trigger(/^Quiz date/);
        button.focus();
        await userEvent.keyboard("{Enter}");
        const sheet = await screen.findByRole("dialog");
        await waitFor(() => expect(document.activeElement).toBe(sheet.querySelector('[data-date="2026-11-10"]')));
        await userEvent.keyboard("{ArrowRight}");
        await waitFor(() => expect(document.activeElement).toBe(sheet.querySelector('[data-date="2026-11-11"]')));
        await userEvent.keyboard("{Enter}");
        await waitFor(() => expect(dialog()).toBeNull());
        expect(state()).toBe("2026-11-11");
    });

    it("Escape leaves the value alone and returns focus to the button", async () => {
        const onfieldchange = vi.fn();
        render(DateHarness, { props: { piece: "date", locale: "sv", initialValue: "2026-11-10", onfieldchange } });
        const button = await trigger(/^Quiz date/);
        await userEvent.click(button);
        await screen.findByRole("dialog");
        await userEvent.keyboard("{Escape}");
        await waitFor(() => expect(dialog()).toBeNull());
        expect(state()).toBe("2026-11-10");
        expect(onfieldchange).not.toHaveBeenCalled();
        await waitFor(() => expect(document.activeElement).toBe(screen.getByRole("button", { name: /^Quiz date/ })));
    });

    it("min and max: days outside are aria-disabled and cannot be chosen", async () => {
        render(DateHarness, { props: { piece: "date", locale: "sv", initialValue: "2026-11-10", min: "2026-11-05", max: "2026-11-25" } });
        await userEvent.click(await trigger(/^Quiz date/));
        const sheet = await screen.findByRole("dialog");
        const day = (date: string) => sheet.querySelector<HTMLElement>(`[data-date="${date}"]`)!;
        expect(day("2026-11-04").getAttribute("aria-disabled")).toBe("true");
        expect(day("2026-11-26").getAttribute("aria-disabled")).toBe("true");
        expect(day("2026-11-05").getAttribute("aria-disabled")).toBeNull();
        await userEvent.click(day("2026-11-26"));
        expect(state()).toBe("2026-11-10");
        expect(dialog()).not.toBeNull();
    });

    it("Clear empties the field, fires change, closes; it is not there when required or empty", async () => {
        const onfieldchange = vi.fn();
        const first = render(DateHarness, { props: { piece: "date", locale: "sv", initialValue: "2026-11-10", onfieldchange } });
        await userEvent.click(await trigger(/^Quiz date/));
        await screen.findByRole("dialog");
        await userEvent.click(screen.getByRole("button", { name: "Clear" }));
        await waitFor(() => expect(dialog()).toBeNull());
        expect(state()).toBe("");
        expect(native().value).toBe("");
        expect(onfieldchange).toHaveBeenCalledTimes(1);
        await waitFor(() => expect(document.activeElement).toBe(screen.getByRole("button", { name: /^Quiz date/ })));
        first.unmount();

        render(DateHarness, { props: { piece: "date", locale: "sv", initialValue: "2026-11-10", required: true } });
        await userEvent.click(await trigger(/^Quiz date/));
        await screen.findByRole("dialog");
        expect(screen.queryByRole("button", { name: "Clear" })).toBeNull();
        await userEvent.keyboard("{Escape}");
        await waitFor(() => expect(dialog()).toBeNull());
        cleanup();

        render(DateHarness, { props: { piece: "date", locale: "sv" } });
        await userEvent.click(await trigger(/^Quiz date/));
        await screen.findByRole("dialog");
        expect(screen.queryByRole("button", { name: "Clear" })).toBeNull();
    });

    it("the app's words", async () => {
        render(DateHarness, {
            props: { piece: "date", locale: "sv", initialValue: "2026-11-10", label: "", strings: { clear: "Rensa", chooseDate: "Välj datum" } },
        });
        await userEvent.click(await trigger(/./));
        await screen.findByRole("dialog", { name: "Välj datum" });
        expect(screen.getByRole("button", { name: "Rensa" })).toBeTruthy();
    });

    it("readonly shows the value and does not open; disabled cannot be pressed", async () => {
        const first = render(DateHarness, { props: { piece: "date", locale: "sv", initialValue: "2026-11-10", readonly: true } });
        const button = await trigger(/^Quiz date/);
        expect(button.textContent).toContain("10 nov. 2026");
        await userEvent.click(button);
        expect(dialog()).toBeNull();
        expect(native().readOnly).toBe(true);
        first.unmount();

        render(DateHarness, { props: { piece: "date", locale: "sv", initialValue: "2026-11-10", disabled: true } });
        const off = await screen.findByRole("button", { name: /^Quiz date/ });
        expect((off as HTMLButtonElement).disabled).toBe(true);
        expect(native().disabled).toBe(true);
    });

    it("the hint and the error are on the button, and the hidden input does not repeat them", async () => {
        render(DateHarness, { props: { piece: "date", locale: "sv", hint: "Until the end of the day.", error: "Pick a day." } });
        const button = await trigger(/^Quiz date/);
        const described = button.getAttribute("aria-describedby")!.split(" ");
        expect(described).toHaveLength(2);
        expect(document.getElementById(described[0])!.textContent).toContain("Until the end of the day.");
        expect(document.getElementById(described[1])!.textContent).toContain("Pick a day.");
        expect(screen.getAllByText("Pick a day.")).toHaveLength(1);
        expect(native().hasAttribute("aria-invalid")).toBe(false);
    });

    it("the browser's own validation on the hidden input is cancelled and moves focus to the button", async () => {
        const oninvalid = vi.fn();
        render(DateHarness, { props: { piece: "date", locale: "sv", required: true, oninvalid } });
        const button = await trigger(/^Quiz date/);
        const event = new Event("invalid", { cancelable: true });
        native().dispatchEvent(event);
        expect(event.defaultPrevented).toBe(true);
        expect(document.activeElement).toBe(button);
        expect(oninvalid).toHaveBeenCalledTimes(1);
        // And through a real submit.
        const form = document.querySelector("form")!;
        button.blur();
        expect(form.reportValidity()).toBe(false);
        expect(document.activeElement).toBe(button);
    });

    it("works inside a FormField: its label points at the button", async () => {
        render(DateHarness, { props: { piece: "date", locale: "sv", inFormField: true, initialValue: "2026-11-10" } });
        const button = await screen.findByRole("button", { name: /Quiz date/ });
        const label = document.querySelector(`label[for="${button.id}"]`);
        expect(label?.textContent).toContain("Quiz date");
        expect(native().id).not.toBe(button.id);
    });
});

describe("time field with a locale", () => {
    it("shows 18:30 in Swedish, never 06:30 PM; and the American form for en-US", async () => {
        const first = render(DateHarness, { props: { piece: "time", locale: "sv", initialValue: "18:30" } });
        const button = await trigger(/^Starts/);
        expect(button.textContent).toContain(formatTime("18:30", "sv"));
        expect(button.textContent).toContain("18:30");
        expect(button.textContent).not.toMatch(/PM/);
        expect(button.querySelector("svg")).not.toBeNull();
        expect(native().type).toBe("time");
        expect(native().value).toBe("18:30");
        first.unmount();
        render(DateHarness, { props: { piece: "time", locale: "en-US", initialValue: "18:30" } });
        expect((await trigger(/^Starts/)).textContent).toMatch(/6:30\s?PM/);
    });

    it("opens two named listboxes: 24 hours as the locale writes them, minutes every five", async () => {
        render(DateHarness, { props: { piece: "time", locale: "sv", initialValue: "18:30" } });
        await userEvent.click(await trigger(/^Starts/));
        await screen.findByRole("dialog", { name: "Starts" });
        expect(optionTexts(hours())).toHaveLength(24);
        expect(optionTexts(hours())[19]).toBe("19");
        expect(optionTexts(minutes())).toEqual(["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"]);
        expect(option(hours(), "18").getAttribute("aria-selected")).toBe("true");
        expect(option(minutes(), "30").getAttribute("aria-selected")).toBe("true");
        expect(option(hours(), "19").getAttribute("aria-selected")).toBe("false");
    });

    it("en-US hours say 7 PM", async () => {
        render(DateHarness, { props: { piece: "time", locale: "en-US", initialValue: "19:00" } });
        await userEvent.click(await trigger(/^Starts/));
        await screen.findByRole("dialog");
        expect(optionTexts(hours())[19]).toBe("7 PM");
        expect(option(hours(), "7 PM").getAttribute("aria-selected")).toBe("true");
    });

    it("step is in seconds: 900 is every 15 minutes; a value off the step is its own option", async () => {
        render(DateHarness, { props: { piece: "time", locale: "sv", initialValue: "19:07", step: 900 } });
        await userEvent.click(await trigger(/^Starts/));
        await screen.findByRole("dialog");
        expect(optionTexts(minutes())).toEqual(["00", "07", "15", "30", "45"]);
        expect(option(minutes(), "07").getAttribute("aria-selected")).toBe("true");
    });

    it("Done sets the time, fires input and change, closes, and refocuses the button", async () => {
        const onfieldchange = vi.fn();
        const onfieldinput = vi.fn();
        render(DateHarness, { props: { piece: "time", locale: "sv", initialValue: "18:30", onfieldchange, onfieldinput } });
        const button = await trigger(/^Starts/);
        await userEvent.click(button);
        await screen.findByRole("dialog");
        await userEvent.click(option(hours(), "20"));
        // Choosing does not close: a time is two choices.
        expect(dialog()).not.toBeNull();
        expect(state()).toBe("18:30");
        await userEvent.click(option(minutes(), "45"));
        await userEvent.click(screen.getByRole("button", { name: "Done" }));
        await waitFor(() => expect(dialog()).toBeNull());
        expect(state()).toBe("20:45");
        expect(native().value).toBe("20:45");
        expect(onfieldchange).toHaveBeenCalledTimes(1);
        expect(onfieldinput).toHaveBeenCalledTimes(1);
        await waitFor(() => expect(document.activeElement).toBe(screen.getByRole("button", { name: /^Starts/ })));
        expect(screen.getByRole("button", { name: /^Starts/ }).textContent).toContain("20:45");
    });

    it("from empty: Done waits for an hour, which brings a first minute with it", async () => {
        render(DateHarness, { props: { piece: "time", locale: "sv" } });
        await userEvent.click(await trigger(/^Starts/));
        await screen.findByRole("dialog");
        const done = screen.getByRole("button", { name: "Done" }) as HTMLButtonElement;
        expect(done.disabled).toBe(true);
        expect(screen.queryByRole("button", { name: "Clear" })).toBeNull();
        await userEvent.click(option(hours(), "07"));
        expect(done.disabled).toBe(false);
        expect(option(minutes(), "00").getAttribute("aria-selected")).toBe("true");
        await userEvent.click(done);
        await waitFor(() => expect(state()).toBe("07:00"));
    });

    it("closing without Done leaves the value alone; Clear empties it", async () => {
        const onfieldchange = vi.fn();
        render(DateHarness, { props: { piece: "time", locale: "sv", initialValue: "18:30", onfieldchange } });
        await userEvent.click(await trigger(/^Starts/));
        await screen.findByRole("dialog");
        await userEvent.click(option(hours(), "22"));
        await userEvent.keyboard("{Escape}");
        await waitFor(() => expect(dialog()).toBeNull());
        expect(state()).toBe("18:30");
        expect(onfieldchange).not.toHaveBeenCalled();

        await userEvent.click(await trigger(/^Starts/));
        await screen.findByRole("dialog");
        // The draft starts again from the value, not from the abandoned 22.
        expect(option(hours(), "18").getAttribute("aria-selected")).toBe("true");
        await userEvent.click(screen.getByRole("button", { name: "Clear" }));
        await waitFor(() => expect(dialog()).toBeNull());
        expect(state()).toBe("");
        expect(onfieldchange).toHaveBeenCalledTimes(1);
    });

    it("keyboard: one Tab stop per column, Up and Down, Home and End, digits, Enter chooses", async () => {
        render(DateHarness, { props: { piece: "time", locale: "sv", initialValue: "18:30" } });
        await userEvent.click(await trigger(/^Starts/));
        await screen.findByRole("dialog");
        // The sheet starts on the chosen hour.
        await waitFor(() => expect(document.activeElement).toBe(option(hours(), "18")));
        expect(hours().querySelectorAll('[tabindex="0"]')).toHaveLength(1);
        expect(option(hours(), "17").getAttribute("tabindex")).toBe("-1");
        await userEvent.keyboard("{ArrowDown}");
        expect(document.activeElement).toBe(option(hours(), "19"));
        await userEvent.keyboard("{ArrowUp}{ArrowUp}");
        expect(document.activeElement).toBe(option(hours(), "17"));
        await userEvent.keyboard("{End}");
        expect(document.activeElement).toBe(option(hours(), "23"));
        await userEvent.keyboard("{Home}");
        expect(document.activeElement).toBe(option(hours(), "00"));
        // Typed digits: "7" is 07, "1" then "9" is 19.
        await userEvent.keyboard("7");
        expect(document.activeElement).toBe(option(hours(), "07"));
        await new Promise((resolve) => setTimeout(resolve, 850));
        await userEvent.keyboard("19");
        expect(document.activeElement).toBe(option(hours(), "19"));
        // Moving focus is not choosing.
        expect(option(hours(), "18").getAttribute("aria-selected")).toBe("true");
        await userEvent.keyboard("{Enter}");
        expect(option(hours(), "19").getAttribute("aria-selected")).toBe("true");
        // Tab goes on to the minutes.
        await userEvent.tab();
        expect(document.activeElement).toBe(option(minutes(), "30"));
        await userEvent.keyboard("{ArrowDown}{Enter}");
        // Then Clear, then Done.
        await userEvent.tab();
        expect(document.activeElement).toBe(screen.getByRole("button", { name: "Clear" }));
        await userEvent.tab();
        expect(document.activeElement).toBe(screen.getByRole("button", { name: "Done" }));
        await userEvent.keyboard("{Enter}");
        await waitFor(() => expect(dialog()).toBeNull());
        expect(state()).toBe("19:35");
    });

    it("min and max disable the hours and minutes outside; a disabled row cannot be chosen but can be read", async () => {
        render(DateHarness, { props: { piece: "time", locale: "sv", initialValue: "18:30", min: "17:00", max: "19:15" } });
        await userEvent.click(await trigger(/^Starts/));
        await screen.findByRole("dialog");
        expect(option(hours(), "16").getAttribute("aria-disabled")).toBe("true");
        expect(option(hours(), "17").getAttribute("aria-disabled")).toBeNull();
        expect(option(hours(), "20").getAttribute("aria-disabled")).toBe("true");
        await userEvent.click(option(hours(), "20"));
        expect(option(hours(), "18").getAttribute("aria-selected")).toBe("true");
        await userEvent.click(option(hours(), "19"));
        // 19:30 is past the max: the minute moves to the first one 19 allows.
        expect(option(minutes(), "00").getAttribute("aria-selected")).toBe("true");
        expect(option(minutes(), "20").getAttribute("aria-disabled")).toBe("true");
        expect(option(minutes(), "15").getAttribute("aria-disabled")).toBeNull();
    });

    it("the app's words", async () => {
        render(DateHarness, {
            props: {
                piece: "time",
                locale: "sv",
                initialValue: "18:30",
                label: "",
                strings: { clear: "Rensa", done: "Klar", hours: "Timmar", minutes: "Minuter", chooseTime: "Välj tid" },
            },
        });
        await userEvent.click(await trigger(/./));
        await screen.findByRole("dialog", { name: "Välj tid" });
        expect(screen.getByRole("listbox", { name: "Timmar" })).toBeTruthy();
        expect(screen.getByRole("listbox", { name: "Minuter" })).toBeTruthy();
        expect(screen.getByRole("button", { name: "Klar" })).toBeTruthy();
        expect(screen.getByRole("button", { name: "Rensa" })).toBeTruthy();
    });
});

describe("picker native", () => {
    it.each([
        ["date", "2026-11-10", /^Quiz date/],
        ["time", "18:30", /^Starts/],
    ] as const)("%s: the button opens the platform's picker with showPicker, in the press", async (piece, value, name) => {
        const showPicker = vi.fn();
        prototype.showPicker = showPicker;
        render(DateHarness, { props: { piece, locale: "sv", initialValue: value, picker: "native" } });
        await userEvent.click(await trigger(name));
        expect(showPicker).toHaveBeenCalledTimes(1);
        expect(dialog()).toBeNull();
    });

    it("a time step under a minute uses the platform's picker; so does `any`", async () => {
        const showPicker = vi.fn();
        prototype.showPicker = showPicker;
        render(DateHarness, { props: { piece: "time", locale: "sv", initialValue: "18:30", step: 1 } });
        await userEvent.click(await trigger(/^Starts/));
        expect(showPicker).toHaveBeenCalledTimes(1);
        expect(dialog()).toBeNull();
    });

    it("where showPicker is missing the field is today's native input", async () => {
        render(DateHarness, { props: { piece: "date", locale: "sv", initialValue: "2026-11-10", picker: "native" } });
        await screen.findByLabelText("Quiz date");
        expect(screen.queryByRole("button", { name: /Quiz date/ })).toBeNull();
        const input = screen.getByLabelText("Quiz date") as HTMLInputElement;
        expect(input.getAttribute("aria-hidden")).toBeNull();
        expect(input.getAttribute("tabindex")).toBeNull();
        expect(input.value).toBe("2026-11-10");
    });

    // Last of the file: a refused picker is remembered for the page's life.
    it("where showPicker throws the native input is un-hidden, and stays so for the session", async () => {
        prototype.showPicker = vi.fn(() => {
            throw new DOMException("not allowed", "NotAllowedError");
        });
        render(DateHarness, { props: { piece: "date", locale: "sv", initialValue: "2026-11-10", picker: "native" } });
        await userEvent.click(await trigger(/^Quiz date/));
        const input = (await screen.findByLabelText("Quiz date")) as HTMLInputElement;
        expect(input.tagName).toBe("INPUT");
        expect(input.getAttribute("aria-hidden")).toBeNull();
        expect(screen.queryByRole("button", { name: /Quiz date/ })).toBeNull();
        await waitFor(() => expect(document.activeElement).toBe(input));
        cleanup();

        // Another field that wants the platform's picker starts native.
        prototype.showPicker = vi.fn();
        render(DateHarness, { props: { piece: "time", locale: "sv", initialValue: "18:30", picker: "native" } });
        await screen.findByLabelText("Starts");
        expect(screen.queryByRole("button", { name: /Starts/ })).toBeNull();
    });
});
