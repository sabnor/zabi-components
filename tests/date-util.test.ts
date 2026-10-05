import { afterEach, describe, expect, it, vi } from "vitest";

import {
    calendarDayName,
    calendarKeyTarget,
    DEFAULT_CALENDAR_STRINGS,
    groupEventsByDate,
} from "../src/components/util/calendar";
import {
    addDays,
    addMonths,
    addMonthsToMonth,
    clampDate,
    daysInMonth,
    endOfWeek,
    formatDate,
    formatTime,
    isIsoDate,
    isLeapYear,
    monthGrid,
    monthOf,
    normaliseWeekStart,
    parseIsoDate,
    parseIsoMonth,
    startOfWeek,
    todayIso,
    todayIsoUtc,
    weekdayOf,
    weekdayOrder,
} from "../src/components/util/date";

afterEach(() => {
    vi.unstubAllEnvs();
    vi.useRealTimers();
});

describe("parsing", () => {
    it("reads a real date and refuses everything else", () => {
        expect(parseIsoDate("2026-10-06")).toEqual({ year: 2026, month: 10, day: 6 });
        expect(parseIsoDate("0001-01-01")).toEqual({ year: 1, month: 1, day: 1 });
        for (const bad of [
            "",
            null,
            undefined,
            "2026-10-6",
            "2026-13-01",
            "2026-00-10",
            "2026-02-30",
            "2025-02-29",
            "2026-04-31",
            "0000-01-01",
            "06/10/2026",
            "2026-10-06T00:00:00Z",
            " 2026-10-06",
        ]) {
            expect(parseIsoDate(bad), String(bad)).toBeNull();
            expect(isIsoDate(bad)).toBe(false);
        }
    });

    it("reads a month", () => {
        expect(parseIsoMonth("2026-10")).toEqual({ year: 2026, month: 10 });
        expect(parseIsoMonth("2026-13")).toBeNull();
        expect(parseIsoMonth("2026-10-06")).toBeNull();
        expect(monthOf("2026-10-06")).toBe("2026-10");
        expect(monthOf("nonsense")).toBeNull();
        expect(monthOf(null)).toBeNull();
    });
});

describe("month lengths and leap years", () => {
    it("knows the length of every month", () => {
        expect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => daysInMonth(2026, month))).toEqual(
            [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        );
    });

    it("follows the Gregorian leap rule, the century years included", () => {
        expect(isLeapYear(2024)).toBe(true);
        expect(isLeapYear(2026)).toBe(false);
        expect(isLeapYear(1900)).toBe(false);
        expect(isLeapYear(2100)).toBe(false);
        expect(isLeapYear(2000)).toBe(true);
        expect(isLeapYear(2400)).toBe(true);
        expect(daysInMonth(2024, 2)).toBe(29);
        expect(daysInMonth(2100, 2)).toBe(28);
        expect(parseIsoDate("2024-02-29")).not.toBeNull();
        expect(parseIsoDate("2100-02-29")).toBeNull();
    });
});

describe("moving by days", () => {
    it("crosses months, years and leap days", () => {
        expect(addDays("2026-10-31", 1)).toBe("2026-11-01");
        expect(addDays("2026-01-01", -1)).toBe("2025-12-31");
        expect(addDays("2024-02-28", 1)).toBe("2024-02-29");
        expect(addDays("2024-02-29", 1)).toBe("2024-03-01");
        expect(addDays("2026-02-28", 1)).toBe("2026-03-01");
        expect(addDays("2026-10-06", 7)).toBe("2026-10-13");
        expect(addDays("2026-10-06", 365)).toBe("2027-10-06");
        expect(addDays("2026-10-06", 0)).toBe("2026-10-06");
    });

    it("counts every day once across a year, in both directions", () => {
        let date = "2024-01-01";
        const seen = new Set<string>();
        for (let step = 0; step < 366; step += 1) {
            seen.add(date);
            date = addDays(date, 1)!;
        }
        expect(seen.size).toBe(366);
        expect(date).toBe("2025-01-01");
        for (let step = 0; step < 366; step += 1) date = addDays(date, -1)!;
        expect(date).toBe("2024-01-01");
    });

    it("works far from now, and stops at the ends of the range", () => {
        expect(addDays("0099-12-31", 1)).toBe("0100-01-01");
        expect(addDays("0001-01-02", -1)).toBe("0001-01-01");
        expect(addDays("0001-01-01", -1)).toBeNull();
        expect(addDays("9999-12-31", 1)).toBeNull();
        expect(addDays("3000-02-28", 1)).toBe("3000-03-01");
        expect(weekdayOf("0001-01-01")).toBe(1);
        expect(addDays("nonsense", 1)).toBeNull();
    });
});

describe("days on which the clocks change", () => {
    // In Stockholm the clocks go forward on 29 March 2026 and back on 25
    // October 2026; in New York on 8 March and 1 November. A local Date
    // would make one of those days 23 hours long and one 25.
    it.each(["Europe/Stockholm", "America/New_York", "Pacific/Auckland", "UTC"])(
        "moves one day at a time through them in %s",
        (zone) => {
            vi.stubEnv("TZ", zone);
            expect(addDays("2026-03-28", 1)).toBe("2026-03-29");
            expect(addDays("2026-03-29", 1)).toBe("2026-03-30");
            expect(addDays("2026-03-30", -1)).toBe("2026-03-29");
            expect(addDays("2026-10-24", 1)).toBe("2026-10-25");
            expect(addDays("2026-10-25", 1)).toBe("2026-10-26");
            expect(addDays("2026-10-26", -1)).toBe("2026-10-25");
            expect(addDays("2026-03-07", 1)).toBe("2026-03-08");
            expect(addDays("2026-11-01", 1)).toBe("2026-11-02");
            expect(weekdayOf("2026-03-29")).toBe(0);
            expect(weekdayOf("2026-10-25")).toBe(0);
            expect(monthGrid("2026-03", 1).flat().filter(Boolean)).toHaveLength(31);
            expect(monthGrid("2026-10", 1).flat().filter(Boolean)).toHaveLength(31);
            expect(formatDate("2026-03-29", "en-GB")).toBe("29 Mar 2026");
            expect(formatDate("2026-10-25", "en-GB")).toBe("25 Oct 2026");
        },
    );
});

describe("moving by months", () => {
    it("moves a month string across years", () => {
        expect(addMonthsToMonth("2026-10", 1)).toBe("2026-11");
        expect(addMonthsToMonth("2026-12", 1)).toBe("2027-01");
        expect(addMonthsToMonth("2026-01", -1)).toBe("2025-12");
        expect(addMonthsToMonth("2026-10", 12)).toBe("2027-10");
        expect(addMonthsToMonth("2026-10", -22)).toBe("2024-12");
        expect(addMonthsToMonth("0001-01", -1)).toBeNull();
        expect(addMonthsToMonth("9999-12", 1)).toBeNull();
        expect(addMonthsToMonth("2026-13", 1)).toBeNull();
    });

    it("keeps the day of the month, or takes the last one the month has", () => {
        expect(addMonths("2026-10-06", 1)).toBe("2026-11-06");
        expect(addMonths("2026-01-31", 1)).toBe("2026-02-28");
        expect(addMonths("2024-01-31", 1)).toBe("2024-02-29");
        expect(addMonths("2026-03-31", -1)).toBe("2026-02-28");
        expect(addMonths("2026-10-31", 1)).toBe("2026-11-30");
        expect(addMonths("2024-02-29", 12)).toBe("2025-02-28");
        expect(addMonths("2024-02-29", -12)).toBe("2023-02-28");
        expect(addMonths("2026-12-15", 1)).toBe("2027-01-15");
    });
});

describe("weeks", () => {
    it("knows the day of the week", () => {
        // 6 October 2026 is a Tuesday.
        expect(weekdayOf("2026-10-06")).toBe(2);
        expect(weekdayOf("2023-01-01")).toBe(0);
        expect(weekdayOf("2000-02-29")).toBe(2);
        expect(weekdayOf("1970-01-01")).toBe(4);
        expect(weekdayOf("nonsense")).toBe(-1);
    });

    it("finds the ends of the week for every first day of the week", () => {
        // Tuesday 6 October 2026.
        const starts = ["2026-10-04", "2026-10-05", "2026-10-06", "2026-09-30", "2026-10-01", "2026-10-02", "2026-10-03"];
        for (let weekStartsOn = 0; weekStartsOn <= 6; weekStartsOn += 1) {
            const start = startOfWeek("2026-10-06", weekStartsOn)!;
            expect(start, `week starting on ${weekStartsOn}`).toBe(starts[weekStartsOn]);
            expect(weekdayOf(start)).toBe(weekStartsOn);
            expect(endOfWeek("2026-10-06", weekStartsOn)).toBe(addDays(start, 6));
        }
        // The first day of the week is the start of its own week.
        expect(startOfWeek("2026-10-05", 1)).toBe("2026-10-05");
        expect(endOfWeek("2026-10-11", 1)).toBe("2026-10-11");
    });

    it("orders the weekdays from the first day of the week, and reads anything else as Monday", () => {
        expect(weekdayOrder(1)).toEqual([1, 2, 3, 4, 5, 6, 0]);
        expect(weekdayOrder(0)).toEqual([0, 1, 2, 3, 4, 5, 6]);
        expect(weekdayOrder(6)).toEqual([6, 0, 1, 2, 3, 4, 5]);
        for (const odd of [7, -1, 1.5, Number.NaN, undefined]) {
            expect(normaliseWeekStart(odd as number | undefined)).toBe(1);
        }
    });
});

describe("the grid of a month", () => {
    const shape = (month: string, weekStartsOn: number) => {
        const weeks = monthGrid(month, weekStartsOn);
        return {
            rows: weeks.length,
            lead: weeks[0].findIndex((day) => day !== null),
            trail: weeks[weeks.length - 1].filter((day) => day === null).length,
        };
    };

    it("has every day of the month once, in order, in rows of seven", () => {
        for (const month of ["2026-10", "2024-02", "2026-02", "2026-12", "0001-01", "9999-12"]) {
            for (let weekStartsOn = 0; weekStartsOn <= 6; weekStartsOn += 1) {
                const weeks = monthGrid(month, weekStartsOn);
                expect(weeks.every((week) => week.length === 7)).toBe(true);
                const days = weeks.flat().filter((day): day is string => day !== null);
                const parts = parseIsoMonth(month)!;
                expect(days).toHaveLength(daysInMonth(parts.year, parts.month));
                expect(days[0]).toBe(`${month}-01`);
                expect([...days].sort()).toEqual(days);
                // Each day is in the column of its weekday.
                weeks.forEach((week) =>
                    week.forEach((day, column) => {
                        if (day) expect(weekdayOf(day)).toBe((weekStartsOn + column) % 7);
                    }),
                );
            }
        }
    });

    it("starts in the first column when the month begins on the first day of the week", () => {
        // 1 June 2026 is a Monday; 1 February 2026 a Sunday.
        expect(shape("2026-06", 1)).toEqual({ rows: 5, lead: 0, trail: 5 });
        expect(shape("2026-02", 0)).toEqual({ rows: 4, lead: 0, trail: 0 });
        expect(monthGrid("2026-06", 1)[0][0]).toBe("2026-06-01");
    });

    it("has four, five or six rows, as many as the month touches", () => {
        // February 2026 starts on a Sunday: four rows from Sunday, five from Monday.
        expect(shape("2026-02", 0).rows).toBe(4);
        expect(shape("2026-02", 1)).toEqual({ rows: 5, lead: 6, trail: 1 });
        // October 2026 starts on a Thursday: five rows.
        expect(shape("2026-10", 1)).toEqual({ rows: 5, lead: 3, trail: 1 });
        // August 2026 starts on a Saturday: six rows from Monday.
        expect(shape("2026-08", 1)).toEqual({ rows: 6, lead: 5, trail: 6 });
        // A leap February never fits four rows.
        for (let weekStartsOn = 0; weekStartsOn <= 6; weekStartsOn += 1) {
            expect(shape("2024-02", weekStartsOn).rows).toBe(5);
        }
    });

    it("is empty for a month that is not one", () => {
        expect(monthGrid("2026-13")).toEqual([]);
        expect(monthGrid("")).toEqual([]);
    });
});

describe("today", () => {
    it("is the local day, and separately the UTC day", () => {
        // 23:30 on 31 October in Stockholm (UTC+1) is still 31 October in UTC;
        // 00:30 on 1 November in Stockholm is still 31 October in UTC.
        const lateEvening = new Date(2026, 9, 31, 23, 30);
        expect(todayIso(lateEvening)).toBe("2026-10-31");
        const utc = new Date(Date.UTC(2026, 9, 31, 23, 30));
        expect(todayIsoUtc(utc)).toBe("2026-10-31");
        vi.useFakeTimers({ toFake: ["Date"] });
        vi.setSystemTime(new Date(2026, 0, 5, 9, 0));
        expect(todayIso()).toBe("2026-01-05");
    });
});

describe("limits", () => {
    it("holds a date between min and max, ignoring limits that are not dates", () => {
        expect(clampDate("2026-10-06", "2026-10-10", "2026-10-20")).toBe("2026-10-10");
        expect(clampDate("2026-10-26", "2026-10-10", "2026-10-20")).toBe("2026-10-20");
        expect(clampDate("2026-10-15", "2026-10-10", "2026-10-20")).toBe("2026-10-15");
        expect(clampDate("2026-10-15", "nonsense", undefined)).toBe("2026-10-15");
        expect(clampDate("2026-10-15", null, null)).toBe("2026-10-15");
    });
});

describe("formatDate", () => {
    it("writes the date in the language asked for", () => {
        expect(formatDate("2026-10-06", "sv")).toBe("6 okt. 2026");
        expect(formatDate("2026-10-06", "en-GB")).toBe("6 Oct 2026");
        expect(formatDate("2026-10-06", "en-US")).toBe("Oct 6, 2026");
        expect(formatDate("2026-10-06", "sv", { weekday: "long", day: "numeric", month: "long" })).toBe(
            "tisdag 6 oktober",
        );
        expect(formatDate("2026-10-06", "sv", { month: "long", year: "numeric" })).toBe("oktober 2026");
    });

    it("never shifts the day, whatever the time zone of the runtime", () => {
        for (const zone of ["Pacific/Kiritimati", "Pacific/Pago_Pago", "America/Los_Angeles", "Europe/Stockholm", "Asia/Tokyo"]) {
            vi.stubEnv("TZ", zone);
            expect(formatDate("2026-10-06", "en-GB"), zone).toBe("6 Oct 2026");
            expect(formatDate("2026-01-01", "en-GB"), zone).toBe("1 Jan 2026");
            expect(formatDate("2026-12-31", "en-GB"), zone).toBe("31 Dec 2026");
        }
    });

    it("does not let a timeZone option move it either", () => {
        expect(
            formatDate("2026-10-06", "en-GB", {
                day: "numeric",
                month: "short",
                timeZone: "Pacific/Pago_Pago",
            } as Intl.DateTimeFormatOptions),
        ).toBe("6 Oct");
    });

    it("handles years far from now", () => {
        expect(formatDate("0050-03-01", "en-GB")).toContain("50");
        expect(formatDate("0050-03-01", "en-GB")).toContain("1 Mar");
        expect(formatDate("9999-12-31", "en-GB")).toBe("31 Dec 9999");
    });

    it("gives an empty string for an empty or invalid value", () => {
        for (const bad of ["", null, undefined, "2026-02-30", "tomorrow"]) {
            expect(formatDate(bad, "sv")).toBe("");
        }
    });

    it("falls back to the runtime's language for a tag it does not know", () => {
        expect(formatDate("2026-10-06", "not a locale")).not.toBe("");
        expect(formatDate("2026-10-06")).not.toBe("");
    });
});

describe("formatTime", () => {
    it("writes the time in the language asked for", () => {
        expect(formatTime("19:00", "sv")).toBe("19:00");
        expect(formatTime("19:00", "en-GB")).toBe("19:00");
        expect(formatTime("19:00", "en-US").replace(/\s/g, " ")).toBe("7:00 PM");
        expect(formatTime("07:05", "sv")).toBe("07:05");
        expect(formatTime("00:00", "en-US").replace(/\s/g, " ")).toBe("12:00 AM");
        expect(formatTime("19:00:30", "sv", { hour: "numeric", minute: "2-digit", second: "2-digit" })).toBe(
            "19:00:30",
        );
    });

    it("never shifts the hour, whatever the time zone of the runtime", () => {
        for (const zone of ["Pacific/Kiritimati", "America/Los_Angeles", "Europe/Stockholm", "Asia/Kolkata"]) {
            vi.stubEnv("TZ", zone);
            expect(formatTime("19:00", "sv"), zone).toBe("19:00");
            expect(formatTime("02:30", "sv"), zone).toBe("02:30");
        }
    });

    it("gives an empty string for an empty or invalid value", () => {
        for (const bad of ["", null, undefined, "25:00", "19:60", "7pm", "19"]) {
            expect(formatTime(bad, "sv")).toBe("");
        }
    });
});

describe("calendar keys", () => {
    const from = "2026-10-06";
    it("moves by a day and a week, and on into the next month", () => {
        expect(calendarKeyTarget("ArrowRight", from)).toBe("2026-10-07");
        expect(calendarKeyTarget("ArrowLeft", from)).toBe("2026-10-05");
        expect(calendarKeyTarget("ArrowDown", from)).toBe("2026-10-13");
        expect(calendarKeyTarget("ArrowUp", from)).toBe("2026-09-29");
        expect(calendarKeyTarget("ArrowRight", "2026-10-31")).toBe("2026-11-01");
        expect(calendarKeyTarget("ArrowLeft", "2026-01-01")).toBe("2025-12-31");
    });

    it("swaps left and right in a right-to-left layout, and nothing else", () => {
        expect(calendarKeyTarget("ArrowRight", from, { rtl: true })).toBe("2026-10-05");
        expect(calendarKeyTarget("ArrowLeft", from, { rtl: true })).toBe("2026-10-07");
        expect(calendarKeyTarget("ArrowDown", from, { rtl: true })).toBe("2026-10-13");
        expect(calendarKeyTarget("Home", from, { rtl: true })).toBe("2026-10-05");
    });

    it("goes to the ends of the week with Home and End", () => {
        expect(calendarKeyTarget("Home", from)).toBe("2026-10-05");
        expect(calendarKeyTarget("End", from)).toBe("2026-10-11");
        expect(calendarKeyTarget("Home", from, { weekStartsOn: 0 })).toBe("2026-10-04");
        expect(calendarKeyTarget("End", from, { weekStartsOn: 0 })).toBe("2026-10-10");
    });

    it("goes by a month with Page Up and Page Down, and by a year with Shift", () => {
        expect(calendarKeyTarget("PageDown", from)).toBe("2026-11-06");
        expect(calendarKeyTarget("PageUp", from)).toBe("2026-09-06");
        expect(calendarKeyTarget("PageDown", from, { shift: true })).toBe("2027-10-06");
        expect(calendarKeyTarget("PageUp", from, { shift: true })).toBe("2025-10-06");
        expect(calendarKeyTarget("PageDown", "2026-01-31")).toBe("2026-02-28");
    });

    it("leaves other keys alone", () => {
        for (const key of ["Enter", " ", "Tab", "a", "Escape"]) {
            expect(calendarKeyTarget(key, from)).toBeNull();
        }
    });
});

describe("calendar names", () => {
    const strings = DEFAULT_CALENDAR_STRINGS;
    const plain = { today: false, selected: false, disabled: false, events: [] };

    it("is the date alone for an ordinary day", () => {
        expect(calendarDayName("Wednesday 7 October 2026", plain, strings)).toBe("Wednesday 7 October 2026");
    });

    it("adds what is true of the day, then its events", () => {
        const events = [
            { date: "2026-10-06", label: "Quiz at The Crown" },
            { date: "2026-10-06", label: "Music quiz" },
        ];
        expect(
            calendarDayName("Tuesday 6 October 2026", { today: true, selected: true, disabled: false, events }, strings),
        ).toBe("Tuesday 6 October 2026, today, selected, 2 events: Quiz at The Crown, Music quiz");
        expect(
            calendarDayName("Tuesday 6 October 2026", { ...plain, events: events.slice(0, 1) }, strings),
        ).toBe("Tuesday 6 October 2026, 1 event: Quiz at The Crown");
        expect(calendarDayName("Monday 5 October 2026", { ...plain, disabled: true }, strings)).toBe(
            "Monday 5 October 2026, unavailable",
        );
    });

    it("groups events by day, in the order given", () => {
        const grouped = groupEventsByDate([
            { date: "2026-10-06", label: "A" },
            { date: "2026-10-07", label: "B" },
            { date: "2026-10-06", label: "C" },
        ]);
        expect(grouped.get("2026-10-06")?.map((event) => event.label)).toEqual(["A", "C"]);
        expect(grouped.get("2026-10-07")).toHaveLength(1);
        expect(grouped.get("2026-10-08")).toBeUndefined();
    });
});
