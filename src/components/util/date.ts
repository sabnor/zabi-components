/**
 * Calendar dates as strings: `YYYY-MM-DD` for a day, `YYYY-MM` for a month,
 * `HH:mm` (or `HH:mm:ss`) for a time of day. The formats a native date or
 * time input reads and writes.
 *
 * A date here is a day on the calendar, not a moment. Nothing in this file
 * goes through a local `Date`: the arithmetic is on the numbers, or on UTC,
 * where every day has 24 hours. So a date never moves to the day before or
 * after because of a time zone, and a day on which the clocks change is a day
 * like any other.
 *
 * Years 0001 to 9999, four digits: within that, two dates compare as strings.
 */

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;
const ISO_MONTH = /^(\d{4})-(\d{2})$/;
const ISO_TIME = /^(\d{2}):(\d{2})(?::(\d{2})(?:\.\d+)?)?$/;

export interface DateParts {
    year: number;
    /** 1 to 12. */
    month: number;
    day: number;
}

const pad = (value: number, length = 2) => String(value).padStart(length, "0");

export function isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/** Days in a month; `month` is 1 to 12. */
export function daysInMonth(year: number, month: number): number {
    if (month === 2) return isLeapYear(year) ? 29 : 28;
    return [4, 6, 9, 11].includes(month) ? 30 : 31;
}

/** The parts of a `YYYY-MM-DD` string, or null when it is not a real date. */
export function parseIsoDate(value: string | null | undefined): DateParts | null {
    const match = ISO_DATE.exec(value ?? "");
    if (!match) return null;
    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    if (year < 1 || month < 1 || month > 12 || day < 1 || day > daysInMonth(year, month)) return null;
    return { year, month, day };
}

export function isIsoDate(value: string | null | undefined): value is string {
    return parseIsoDate(value) !== null;
}

/** The parts of a `YYYY-MM` string, or null when it is not a real month. */
export function parseIsoMonth(value: string | null | undefined): { year: number; month: number } | null {
    const match = ISO_MONTH.exec(value ?? "");
    if (!match) return null;
    const year = Number(match[1]);
    const month = Number(match[2]);
    if (year < 1 || month < 1 || month > 12) return null;
    return { year, month };
}

export function toIsoDate(year: number, month: number, day: number): string {
    return `${pad(year, 4)}-${pad(month)}-${pad(day)}`;
}

export function toIsoMonth(year: number, month: number): string {
    return `${pad(year, 4)}-${pad(month)}`;
}

/** The month a date is in: `2026-10-06` gives `2026-10`. Null for a string that is not a date. */
export function monthOf(date: string | null | undefined): string | null {
    const parts = parseIsoDate(date);
    return parts ? toIsoMonth(parts.year, parts.month) : null;
}

/**
 * A UTC timestamp for the day. `Date.UTC` reads a year under 100 as 19xx, so
 * the year is set afterwards.
 */
function utcOf({ year, month, day }: DateParts): Date {
    const date = new Date(Date.UTC(2000, month - 1, day));
    date.setUTCFullYear(year);
    return date;
}

function isoOfUtc(date: Date): string {
    return toIsoDate(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate());
}

const inRange = (year: number) => year >= 1 && year <= 9999;

/** The date `count` days later (earlier when negative), or null outside years 1 to 9999. */
export function addDays(date: string, count: number): string | null {
    const parts = parseIsoDate(date);
    if (!parts) return null;
    const moved = utcOf(parts);
    moved.setUTCDate(moved.getUTCDate() + count);
    return inRange(moved.getUTCFullYear()) ? isoOfUtc(moved) : null;
}

/** The month `count` months later (earlier when negative), or null outside years 1 to 9999. */
export function addMonthsToMonth(month: string, count: number): string | null {
    const parts = parseIsoMonth(month);
    if (!parts) return null;
    const index = parts.year * 12 + (parts.month - 1) + count;
    const year = Math.floor(index / 12);
    return inRange(year) ? toIsoMonth(year, (index % 12 + 12) % 12 + 1) : null;
}

/**
 * The same day of the month `count` months later. A day the target month does
 * not have becomes its last one: 31 January plus a month is 28 or 29 February.
 */
export function addMonths(date: string, count: number): string | null {
    const parts = parseIsoDate(date);
    if (!parts) return null;
    const target = parseIsoMonth(addMonthsToMonth(toIsoMonth(parts.year, parts.month), count));
    if (!target) return null;
    const day = Math.min(parts.day, daysInMonth(target.year, target.month));
    return toIsoDate(target.year, target.month, day);
}

/** Day of the week, 0 for Sunday to 6 for Saturday. -1 for a string that is not a date. */
export function weekdayOf(date: string): number {
    const parts = parseIsoDate(date);
    return parts ? utcOf(parts).getUTCDay() : -1;
}

/** A whole number from 0 to 6 for the first day of the week; anything else is Monday. */
export function normaliseWeekStart(weekStartsOn: number | undefined): number {
    return Number.isInteger(weekStartsOn) && weekStartsOn! >= 0 && weekStartsOn! <= 6
        ? weekStartsOn!
        : 1;
}

/** The first day of the week a date is in. */
export function startOfWeek(date: string, weekStartsOn = 1): string | null {
    const weekday = weekdayOf(date);
    if (weekday === -1) return null;
    return addDays(date, -((weekday - normaliseWeekStart(weekStartsOn) + 7) % 7));
}

/** The last day of the week a date is in. */
export function endOfWeek(date: string, weekStartsOn = 1): string | null {
    const start = startOfWeek(date, weekStartsOn);
    return start ? addDays(start, 6) : null;
}

/**
 * The weeks of a month, each seven entries from the first day of the week. A
 * day of the month is its ISO date; a place before the 1st or after the last
 * day is null. There are as many weeks as the month touches: four (a
 * 28-day February that starts on the first day of the week), five or six.
 */
export function monthGrid(month: string, weekStartsOn = 1): (string | null)[][] {
    const parts = parseIsoMonth(month);
    if (!parts) return [];
    const first = toIsoDate(parts.year, parts.month, 1);
    const lead = (weekdayOf(first) - normaliseWeekStart(weekStartsOn) + 7) % 7;
    const days = daysInMonth(parts.year, parts.month);
    const cells: (string | null)[] = Array.from({ length: lead }, () => null);
    for (let day = 1; day <= days; day += 1) cells.push(toIsoDate(parts.year, parts.month, day));
    while (cells.length % 7 !== 0) cells.push(null);
    const weeks: (string | null)[][] = [];
    for (let index = 0; index < cells.length; index += 7) weeks.push(cells.slice(index, index + 7));
    return weeks;
}

/** The seven days of the week as numbers (0 for Sunday), from the first day of the week. */
export function weekdayOrder(weekStartsOn = 1): number[] {
    const start = normaliseWeekStart(weekStartsOn);
    return Array.from({ length: 7 }, (_, index) => (start + index) % 7);
}

/**
 * Today where the user is, as `YYYY-MM-DD`. This is the one place that reads
 * the local clock: "today" is a local idea. Call it in the browser; on a
 * server it is the server's day.
 */
export function todayIso(now: Date = new Date()): string {
    return toIsoDate(now.getFullYear(), now.getMonth() + 1, now.getDate());
}

/** Today in UTC: the same on a server and in a browser at the same moment. */
export function todayIsoUtc(now: Date = new Date()): string {
    return isoOfUtc(now);
}

/** A date held between `min` and `max`, either of which may be missing or invalid. */
export function clampDate(date: string, min?: string | null, max?: string | null): string {
    if (isIsoDate(min) && date < min) return min;
    if (isIsoDate(max) && date > max) return max;
    return date;
}

function formatter(
    locale: string | string[] | undefined,
    options: Intl.DateTimeFormatOptions,
): Intl.DateTimeFormat | null {
    try {
        // Formatted in UTC, where the value was put: the reader's zone never moves it.
        return new Intl.DateTimeFormat(locale || undefined, { ...options, timeZone: "UTC" });
    } catch {
        // An unknown locale tag or option: fall back to the runtime's own.
        try {
            return new Intl.DateTimeFormat(undefined, { ...options, timeZone: "UTC" });
        } catch {
            return null;
        }
    }
}

/**
 * A date for reading: `formatDate("2026-10-06", "sv")` is "6 okt. 2026",
 * `formatDate("2026-10-06", "en-GB")` is "6 Oct 2026".
 *
 * `value` is `YYYY-MM-DD`, what a DateField holds. The day shown is always
 * the day in the string: it does not depend on the time zone of the browser
 * or the server. An empty or invalid value gives an empty string.
 *
 * Pass the `locale` of the page. Without it the runtime's own is used, which
 * on a server is the server's and may differ from the reader's, so text
 * rendered on the server and again in the browser may not match.
 *
 * `options` are those of `Intl.DateTimeFormat`; `timeZone` is not one you can
 * set here.
 */
export function formatDate(
    value: string | null | undefined,
    locale?: string | string[],
    options: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" },
): string {
    const parts = parseIsoDate(value);
    if (!parts) return "";
    return formatter(locale, options)?.format(utcOf(parts)) ?? (value as string);
}

/**
 * A time of day for reading: `formatTime("19:00", "sv")` is "19:00",
 * `formatTime("19:00", "en-US")` is "7:00 PM".
 *
 * `value` is `HH:mm` or `HH:mm:ss`, what a TimeField holds. It is a time on
 * the clock, with no zone: nothing shifts it. An empty or invalid value gives
 * an empty string. `locale` and `options` as for `formatDate`.
 */
export function formatTime(
    value: string | null | undefined,
    locale?: string | string[],
    // The locale's own short time: "07:05" in Swedish, "7:05 AM" in American English.
    options: Intl.DateTimeFormatOptions = { timeStyle: "short" },
): string {
    const match = ISO_TIME.exec(value ?? "");
    if (!match) return "";
    const hours = Number(match[1]);
    const minutes = Number(match[2]);
    const seconds = Number(match[3] ?? "0");
    if (hours > 23 || minutes > 59 || seconds > 59) return "";
    const moment = new Date(Date.UTC(2000, 0, 1, hours, minutes, seconds));
    return formatter(locale, options)?.format(moment) ?? (value as string);
}
