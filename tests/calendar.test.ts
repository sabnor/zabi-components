import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import DateHarness from "./fixtures/DateHarness.svelte";
import type { CalendarEvent } from "../src/components/util/calendar";

/** Monday 5 October 2026, at noon where the test runs. */
beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 9, 5, 12, 0));
    document.documentElement.lang = "";
    document.documentElement.dir = "";
});

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.useRealTimers();
    document.documentElement.lang = "";
    document.documentElement.dir = "";
});

const events: CalendarEvent[] = [
    { date: "2026-10-06", label: "Quiz at The Crown" },
    { date: "2026-10-06", label: "Music quiz", tone: "accent" },
    { date: "2026-10-10", label: "Team meeting", tone: "success" },
    { date: "2026-10-17", label: "Quarter-final", tone: "warning" },
    { date: "2026-10-17", label: "Semi-final", tone: "danger" },
    { date: "2026-10-17", label: "Final" },
    { date: "2026-10-17", label: "After-party", tone: "accent" },
];

const calendar = () => screen.getByTestId("calendar");
const grid = () => within(calendar()).getByRole("grid");
const day = (date: string) => calendar().querySelector<HTMLButtonElement>(`[data-date="${date}"]`)!;
const days = () => [...calendar().querySelectorAll<HTMLButtonElement>("[data-date]")];
const title = () => calendar().querySelector("[aria-live]")!.textContent!.trim();
const bound = () => {
    const [, month, selected] = screen.getByTestId("state").textContent!.split("|");
    return { month, selected };
};
const previous = () => within(calendar()).getByRole("button", { name: "Previous month" });
const next = () => within(calendar()).getByRole("button", { name: "Next month" });

function mount(props: Record<string, unknown> = {}) {
    render(DateHarness, { props: { piece: "calendar", locale: "en-GB", ...props } });
    return userEvent.setup();
}

describe("Calendar structure", () => {
    it("is a grid named by its month title, with a column header per weekday", () => {
        mount({ initialMonth: "2026-10" });
        expect(title()).toBe("October 2026");
        expect(screen.getByRole("grid", { name: "October 2026" })).toBe(grid());
        const headers = within(grid()).getAllByRole("columnheader");
        expect(headers).toHaveLength(7);
        // Short for the eye, one letter where the column is too narrow for
        // that (the stylesheet shows one of the two), the full name for a
        // screen reader, which hears neither of the others.
        const seen = headers[0].querySelector('[aria-hidden="true"]')!;
        expect(seen.querySelector(".weekday-short")!.textContent).toBe("Mon");
        expect(seen.querySelector(".weekday-narrow")!.textContent).toBe("M");
        expect(seen.textContent!.replace(/\s+/g, "")).toBe("MonM");
        expect(headers[0].querySelectorAll('[aria-hidden="true"]')).toHaveLength(1);
        expect(headers[0].querySelector(".sr-only")!.textContent).toBe("Monday");
        expect(headers[0].getAttribute("abbr")).toBe("Monday");
        expect(headers[6].querySelector(".sr-only")!.textContent).toBe("Sunday");
    });

    it("announces the month: the title is a polite live region", () => {
        mount({ initialMonth: "2026-10" });
        const region = calendar().querySelector("[aria-live]")!;
        expect(region.getAttribute("aria-live")).toBe("polite");
        expect(region.getAttribute("aria-atomic")).toBe("true");
        expect(grid().getAttribute("aria-labelledby")).toBe(region.id);
    });

    it("has a row per week and a button per day of the month, and no days of other months", () => {
        mount({ initialMonth: "2026-10" });
        // October 2026 starts on a Thursday: five rows from Monday, plus the header row.
        expect(within(grid()).getAllByRole("row")).toHaveLength(6);
        expect(days()).toHaveLength(31);
        expect(days()[0].dataset.date).toBe("2026-10-01");
        expect(days()[0].textContent?.trim()).toBe("1");
        const cells = within(grid()).getAllByRole("gridcell");
        expect(cells).toHaveLength(35);
        expect(cells.filter((cell) => cell.querySelector("button") === null)).toHaveLength(4);
        expect(cells[0].textContent).toBe("");
        expect(cells[3].querySelector("button")).toBe(day("2026-10-01"));
    });

    it("has as many rows as the month touches: four, five or six", async () => {
        mount({ initialMonth: "2026-02", weekStartsOn: 0 });
        expect(within(grid()).getAllByRole("row")).toHaveLength(5);
        cleanup();
        mount({ initialMonth: "2026-08" });
        expect(within(grid()).getAllByRole("row")).toHaveLength(7);
    });

    it("starts the week on the day asked for", () => {
        mount({ initialMonth: "2026-10", weekStartsOn: 0 });
        const headers = within(grid()).getAllByRole("columnheader");
        expect(headers[0].querySelector(".sr-only")!.textContent).toBe("Sunday");
        expect(within(grid()).getAllByRole("gridcell")[4].querySelector("button")).toBe(day("2026-10-01"));
    });

    it("passes other attributes to the host", () => {
        mount({ initialMonth: "2026-10" });
        expect(calendar().getAttribute("data-month")).toBe("2026-10");
        expect(calendar().className).toContain("w-full");
    });
});

describe("Calendar month and locale", () => {
    it("defaults to the month of the selected day", () => {
        mount({ initialSelected: "2027-03-15" });
        expect(title()).toBe("March 2027");
        expect(bound().month, "The bound month is not written until the user moves").toBe("unset");
    });

    it("defaults to this month when nothing is selected", async () => {
        mount();
        await waitFor(() => expect(title()).toBe("October 2026"));
    });

    it("follows a selection made from outside, until the user has chosen a month", async () => {
        const user = mount({ initialSelected: "2026-10-06" });
        await user.click(screen.getByTestId("set-outside"));
        expect(title()).toBe("March 2027");
        await user.click(next());
        expect(title()).toBe("April 2027");
        expect(bound().month).toBe("2027-04");
    });

    it("writes its names in the locale given", () => {
        mount({ initialMonth: "2026-10", locale: "sv" });
        expect(title()).toBe("oktober 2026");
        expect(calendar().querySelector("[aria-live]")!.className).toContain("first-letter:uppercase");
        expect(within(grid()).getAllByRole("columnheader")[0].querySelector(".sr-only")!.textContent).toBe(
            "måndag",
        );
        expect(day("2026-10-07").getAttribute("aria-label")).toBe("onsdag 7 oktober 2026");
    });

    it("without a locale uses the page's language once it runs", async () => {
        document.documentElement.lang = "sv";
        mount({ initialMonth: "2026-10", locale: undefined });
        await waitFor(() => expect(title()).toBe("oktober 2026"));
    });
});

describe("Calendar today and selection", () => {
    it("marks today with aria-current and more than colour, once it runs", async () => {
        mount({ initialMonth: "2026-10" });
        await waitFor(() => expect(day("2026-10-05").getAttribute("aria-current")).toBe("date"));
        expect(day("2026-10-05").hasAttribute("data-today")).toBe(true);
        expect(day("2026-10-05").getAttribute("aria-label")).toBe("Monday, 5 October 2026, today");
        expect(calendar().querySelectorAll('[aria-current="date"]')).toHaveLength(1);
    });

    it("selects a day on a press: bound, reported, in the name and on the cell", async () => {
        const onselect = vi.fn();
        const user = mount({ initialMonth: "2026-10", onselect });
        await user.click(day("2026-10-07"));
        expect(bound().selected).toBe("2026-10-07");
        expect(onselect).toHaveBeenCalledTimes(1);
        expect(onselect).toHaveBeenCalledWith("2026-10-07");
        expect(day("2026-10-07").getAttribute("aria-label")).toBe("Wednesday, 7 October 2026, selected");
        expect(day("2026-10-07").closest("td")!.getAttribute("aria-selected")).toBe("true");
        expect(calendar().querySelectorAll('[aria-selected="true"]')).toHaveLength(1);
        expect(day("2026-10-07").hasAttribute("data-selected")).toBe(true);
    });

    it("never clears the selection on a repeat press", async () => {
        const onselect = vi.fn();
        const user = mount({ initialMonth: "2026-10", initialSelected: "2026-10-07", onselect });
        await user.click(day("2026-10-07"));
        await user.click(day("2026-10-07"));
        await user.keyboard("{Enter}");
        await user.keyboard(" ");
        expect(bound().selected).toBe("2026-10-07");
        expect(onselect).not.toHaveBeenCalled();
        expect(day("2026-10-07").hasAttribute("data-selected")).toBe(true);
    });

    it("moves the selection, one day at a time", async () => {
        const user = mount({ initialMonth: "2026-10", initialSelected: "2026-10-07" });
        await user.click(day("2026-10-20"));
        expect(bound().selected).toBe("2026-10-20");
        expect(calendar().querySelectorAll("[data-selected]")).toHaveLength(1);
        expect(day("2026-10-07").closest("td")!.hasAttribute("aria-selected")).toBe(false);
    });

    it("names today and selected together, today first", async () => {
        mount({ initialMonth: "2026-10", initialSelected: "2026-10-05" });
        await waitFor(() =>
            expect(day("2026-10-05").getAttribute("aria-label")).toBe(
                "Monday, 5 October 2026, today, selected",
            ),
        );
    });

    it("ignores a selected value that is not a date", () => {
        mount({ initialMonth: "2026-10", initialSelected: "tomorrow" });
        expect(calendar().querySelectorAll("[data-selected]")).toHaveLength(0);
    });
});

describe("Calendar events", () => {
    it("shows a dot per event, three at most, in the tone of each", () => {
        mount({ initialMonth: "2026-10", events });
        const dots = (date: string) => [...day(date).querySelectorAll<HTMLElement>(".dot")];
        expect(dots("2026-10-06").map((dot) => dot.dataset.tone)).toEqual(["default", "accent"]);
        expect(dots("2026-10-10").map((dot) => dot.dataset.tone)).toEqual(["success"]);
        expect(dots("2026-10-17").map((dot) => dot.dataset.tone)).toEqual(["warning", "danger", "default"]);
        expect(dots("2026-10-07")).toHaveLength(0);
        expect(day("2026-10-07").querySelector(".dots")).toBeNull();
        // Decorative: the name carries the events.
        expect(day("2026-10-06").querySelector(".dots")!.getAttribute("aria-hidden")).toBe("true");
    });

    it("reads the events out with the date, all of them", () => {
        mount({ initialMonth: "2026-10", events });
        expect(day("2026-10-06").getAttribute("aria-label")).toBe(
            "Tuesday, 6 October 2026, 2 events: Quiz at The Crown, Music quiz",
        );
        expect(day("2026-10-10").getAttribute("aria-label")).toBe(
            "Saturday, 10 October 2026, 1 event: Team meeting",
        );
        expect(day("2026-10-17").getAttribute("aria-label")).toBe(
            "Saturday, 17 October 2026, 4 events: Quarter-final, Semi-final, Final, After-party",
        );
    });

    it("takes its words from strings, the events part as a function", async () => {
        const eventsText = vi.fn((list: CalendarEvent[]) => `${list.length} händelser`);
        mount({
            initialMonth: "2026-10",
            initialSelected: "2026-10-05",
            events,
            locale: "sv",
            strings: {
                previousMonth: "Föregående månad",
                nextMonth: "Nästa månad",
                today: "i dag",
                selected: "vald",
                events: eventsText,
            },
        });
        expect(within(calendar()).getByRole("button", { name: "Föregående månad" })).toBeTruthy();
        expect(within(calendar()).getByRole("button", { name: "Nästa månad" })).toBeTruthy();
        expect(day("2026-10-06").getAttribute("aria-label")).toBe("tisdag 6 oktober 2026, 2 händelser");
        expect(eventsText).toHaveBeenCalledWith(events.slice(0, 2));
        await waitFor(() =>
            expect(day("2026-10-05").getAttribute("aria-label")).toBe("måndag 5 oktober 2026, i dag, vald"),
        );
    });
});

describe("Calendar month buttons", () => {
    it("go a month back and forward: bound, reported and announced", async () => {
        const onmonthchange = vi.fn();
        const user = mount({ initialMonth: "2026-10", onmonthchange });
        await user.click(next());
        expect(title()).toBe("November 2026");
        expect(bound().month).toBe("2026-11");
        expect(onmonthchange).toHaveBeenLastCalledWith("2026-11");
        expect(days()).toHaveLength(30);
        expect(document.activeElement, "Focus stays on the button").toBe(next());

        await user.click(previous());
        await user.click(previous());
        expect(title()).toBe("September 2026");
        expect(onmonthchange).toHaveBeenLastCalledWith("2026-09");
        expect(onmonthchange).toHaveBeenCalledTimes(3);
    });

    it("cross a year", async () => {
        const user = mount({ initialMonth: "2026-12" });
        await user.click(next());
        expect(title()).toBe("January 2027");
    });

    it("keep the selection when the month changes", async () => {
        const user = mount({ initialMonth: "2026-10", initialSelected: "2026-10-07" });
        await user.click(next());
        expect(bound().selected).toBe("2026-10-07");
        expect(calendar().querySelectorAll("[data-selected]")).toHaveLength(0);
        await user.click(previous());
        expect(day("2026-10-07").hasAttribute("data-selected")).toBe(true);
    });

    it("are icon buttons with decorative icons", () => {
        mount({ initialMonth: "2026-10" });
        for (const button of [previous(), next()]) {
            expect(button.tagName).toBe("BUTTON");
            expect(button.querySelector("svg")!.getAttribute("aria-hidden")).toBe("true");
            expect(button.className).toContain("pointer-coarse:min-h-11");
        }
    });
});

describe("Calendar limits", () => {
    it("marks days outside min and max unavailable, and does not select them", async () => {
        const onselect = vi.fn();
        const user = mount({ initialMonth: "2026-10", min: "2026-10-05", max: "2026-10-20", onselect });
        expect(day("2026-10-04").getAttribute("aria-disabled")).toBe("true");
        expect(day("2026-10-04").getAttribute("aria-label")).toBe("Sunday, 4 October 2026, unavailable");
        expect(day("2026-10-05").hasAttribute("aria-disabled")).toBe(false);
        expect(day("2026-10-20").hasAttribute("aria-disabled")).toBe(false);
        expect(day("2026-10-21").getAttribute("aria-disabled")).toBe("true");
        // Not the disabled attribute: the day can still be focused and read.
        expect(day("2026-10-04").disabled).toBe(false);

        await user.click(day("2026-10-04"));
        await user.click(day("2026-10-21"));
        expect(onselect).not.toHaveBeenCalled();
        expect(bound().selected).toBe("none");
        await user.click(day("2026-10-20"));
        expect(bound().selected).toBe("2026-10-20");
    });

    it("closes the days isDateDisabled names", async () => {
        const user = mount({
            initialMonth: "2026-10",
            isDateDisabled: (date: string) => date === "2026-10-12",
        });
        expect(day("2026-10-12").getAttribute("aria-disabled")).toBe("true");
        await user.click(day("2026-10-12"));
        expect(bound().selected).toBe("none");
    });

    it("does not go to a month with no day that can be selected", async () => {
        const onmonthchange = vi.fn();
        const user = mount({
            initialMonth: "2026-10",
            min: "2026-10-05",
            max: "2026-11-20",
            onmonthchange,
        });
        expect(previous().getAttribute("aria-disabled")).toBe("true");
        expect(previous().disabled, "Still focusable: focus is not dropped").toBe(false);
        expect(next().hasAttribute("aria-disabled")).toBe(false);
        await user.click(previous());
        expect(title()).toBe("October 2026");
        expect(onmonthchange).not.toHaveBeenCalled();

        await user.click(next());
        expect(title()).toBe("November 2026");
        expect(next().getAttribute("aria-disabled")).toBe("true");
        expect(previous().hasAttribute("aria-disabled")).toBe(false);
        await user.click(next());
        expect(title()).toBe("November 2026");
    });

    it("reaches a month that min only partly covers", () => {
        mount({ initialMonth: "2026-11", min: "2026-10-31" });
        expect(previous().hasAttribute("aria-disabled")).toBe(false);
    });
});

describe("Calendar keyboard", () => {
    it("is one Tab stop: the selected day, else today, else the first day", async () => {
        const user = mount({ initialMonth: "2026-10", initialSelected: "2026-10-07" });
        expect(days().filter((button) => button.tabIndex === 0)).toEqual([day("2026-10-07")]);
        screen.getByTestId("before").focus();
        await user.tab();
        expect(document.activeElement).toBe(previous());
        await user.tab();
        expect(document.activeElement).toBe(next());
        await user.tab();
        expect(document.activeElement).toBe(day("2026-10-07"));
        await user.tab();
        expect(document.activeElement, "One Tab leaves the grid").toBe(screen.getByTestId("after"));
        cleanup();

        mount({ initialMonth: "2026-10" });
        await waitFor(() =>
            expect(days().filter((button) => button.tabIndex === 0)).toEqual([day("2026-10-05")]),
        );
        cleanup();

        mount({ initialMonth: "2026-11" });
        expect(days().filter((button) => button.tabIndex === 0)).toEqual([day("2026-11-01")]);
    });

    it("skips unavailable days when it picks the first Tab stop", () => {
        mount({ initialMonth: "2026-11", min: "2026-11-04" });
        expect(days().filter((button) => button.tabIndex === 0)).toEqual([day("2026-11-04")]);
    });

    it("moves by a day and a week with the arrows, without selecting", async () => {
        const user = mount({ initialMonth: "2026-10", initialSelected: "2026-10-07" });
        day("2026-10-07").focus();
        await user.keyboard("{ArrowRight}");
        expect(document.activeElement).toBe(day("2026-10-08"));
        await user.keyboard("{ArrowDown}");
        expect(document.activeElement).toBe(day("2026-10-15"));
        await user.keyboard("{ArrowLeft}");
        expect(document.activeElement).toBe(day("2026-10-14"));
        await user.keyboard("{ArrowUp}");
        expect(document.activeElement).toBe(day("2026-10-07"));
        expect(bound().selected).toBe("2026-10-07");
        // The Tab stop follows the keyboard.
        await user.keyboard("{ArrowRight}");
        expect(days().filter((button) => button.tabIndex === 0)).toEqual([day("2026-10-08")]);
    });

    it("goes to the ends of the week with Home and End", async () => {
        const user = mount({ initialMonth: "2026-10" });
        day("2026-10-07").focus();
        await user.keyboard("{Home}");
        expect(document.activeElement).toBe(day("2026-10-05"));
        await user.keyboard("{End}");
        expect(document.activeElement).toBe(day("2026-10-11"));
    });

    it("selects the focused day with Enter and with Space", async () => {
        const onselect = vi.fn();
        const user = mount({ initialMonth: "2026-10", onselect });
        day("2026-10-07").focus();
        await user.keyboard("{ArrowRight}{Enter}");
        expect(bound().selected).toBe("2026-10-08");
        await user.keyboard("{ArrowRight} ");
        expect(bound().selected).toBe("2026-10-09");
        expect(onselect.mock.calls.map((call) => call[0])).toEqual(["2026-10-08", "2026-10-09"]);
    });

    it("rolls over the end of the month: the month changes and focus is on the right day", async () => {
        const onmonthchange = vi.fn();
        const user = mount({ initialMonth: "2026-10", onmonthchange });
        day("2026-10-31").focus();
        await user.keyboard("{ArrowRight}");
        await waitFor(() => expect(document.activeElement).toBe(day("2026-11-01")));
        expect(title()).toBe("November 2026");
        expect(bound().month).toBe("2026-11");
        expect(onmonthchange).toHaveBeenLastCalledWith("2026-11");

        await user.keyboard("{ArrowLeft}");
        await waitFor(() => expect(document.activeElement).toBe(day("2026-10-31")));
        expect(title()).toBe("October 2026");

        await user.keyboard("{ArrowDown}");
        await waitFor(() => expect(document.activeElement).toBe(day("2026-11-07")));
        await user.keyboard("{ArrowUp}{ArrowUp}");
        await waitFor(() => expect(document.activeElement).toBe(day("2026-10-24")));
    });

    it("goes by a month with Page Up and Page Down, and by a year with Shift", async () => {
        const user = mount({ initialMonth: "2026-10" });
        day("2026-10-31").focus();
        await user.keyboard("{PageDown}");
        // November has no 31st: its last day.
        await waitFor(() => expect(document.activeElement).toBe(day("2026-11-30")));
        await user.keyboard("{PageUp}{PageUp}");
        await waitFor(() => expect(document.activeElement).toBe(day("2026-09-30")));
        await user.keyboard("{Shift>}{PageDown}{/Shift}");
        await waitFor(() => expect(document.activeElement).toBe(day("2027-09-30")));
        expect(title()).toBe("September 2027");
        await user.keyboard("{Shift>}{PageUp}{/Shift}");
        await waitFor(() => expect(document.activeElement).toBe(day("2026-09-30")));
    });

    it("mirrors left and right in a right-to-left page", async () => {
        document.documentElement.dir = "rtl";
        const user = mount({ initialMonth: "2026-10" });
        day("2026-10-07").focus();
        await user.keyboard("{ArrowLeft}");
        expect(document.activeElement).toBe(day("2026-10-08"));
        await user.keyboard("{ArrowRight}{ArrowRight}");
        expect(document.activeElement).toBe(day("2026-10-06"));
        await user.keyboard("{ArrowDown}");
        expect(document.activeElement).toBe(day("2026-10-13"));
    });

    it("does not move past min and max, and can stand on an unavailable day between them", async () => {
        const user = mount({
            initialMonth: "2026-10",
            min: "2026-10-05",
            max: "2026-10-20",
            isDateDisabled: (date: string) => date === "2026-10-12",
        });
        day("2026-10-06").focus();
        await user.keyboard("{ArrowLeft}{ArrowLeft}{ArrowLeft}");
        expect(document.activeElement).toBe(day("2026-10-05"));
        await user.keyboard("{PageUp}");
        expect(document.activeElement).toBe(day("2026-10-05"));
        expect(title()).toBe("October 2026");
        await user.keyboard("{PageDown}");
        expect(document.activeElement).toBe(day("2026-10-20"));

        day("2026-10-11").focus();
        await user.keyboard("{ArrowRight}");
        expect(document.activeElement, "Reachable, so it can be read").toBe(day("2026-10-12"));
        await user.keyboard("{Enter}");
        expect(bound().selected).toBe("none");
    });

    it("takes the keys it uses from the page, and leaves the others", async () => {
        mount({ initialMonth: "2026-10" });
        day("2026-10-07").focus();
        for (const key of ["ArrowDown", "PageDown", "Home", "End"]) {
            const event = new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true });
            document.activeElement!.dispatchEvent(event);
            expect(event.defaultPrevented, key).toBe(true);
        }
        for (const key of ["Tab", "a", "Escape"]) {
            const event = new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true });
            document.activeElement!.dispatchEvent(event);
            expect(event.defaultPrevented, key).toBe(false);
        }
        // With a modifier the key is the browser's (Alt+Left is Back).
        const back = new KeyboardEvent("keydown", { key: "ArrowLeft", altKey: true, bubbles: true, cancelable: true });
        document.activeElement!.dispatchEvent(back);
        expect(back.defaultPrevented).toBe(false);
    });

    // The focus ring is drawn by the component's stylesheet, around the face
    // of the day: playwright/calendar.spec.ts looks at it in a browser.
});

describe("Calendar and the clock", () => {
    it("moves the today mark when the calendar is looked at again on another day", async () => {
        mount({ initialMonth: "2026-10" });
        await waitFor(() => expect(day("2026-10-05").hasAttribute("data-today")).toBe(true));
        vi.setSystemTime(new Date(2026, 9, 6, 8, 0));
        document.dispatchEvent(new Event("visibilitychange"));
        await waitFor(() => expect(day("2026-10-06").hasAttribute("data-today")).toBe(true));
        expect(day("2026-10-05").hasAttribute("data-today")).toBe(false);
        await fireEvent.focus(day("2026-10-06"));
    });
});
