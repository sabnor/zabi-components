/**
 * What DateField and TimeField share once they are given a `locale`: the
 * words, and the pure parts of the time picker (which hours and minutes
 * there are, which are outside `min` and `max`).
 */

import { formatTime } from "./date.js";

/** The words DateField says when it has a `locale`. Replace any of them to translate. */
export interface DateFieldStrings {
    /** The sheet's action that empties the field. Shown while the field has a value and is not `required`. */
    clear: string;
    /** The sheet's name when the field has no label. */
    chooseDate: string;
}

export const DATE_FIELD_STRINGS: DateFieldStrings = {
    clear: "Clear",
    chooseDate: "Choose date",
};

/** The words TimeField says when it has a `locale`. Replace any of them to translate. */
export interface TimeFieldStrings {
    /** The sheet's action that empties the field. Shown while the field has a value and is not `required`. */
    clear: string;
    /** The sheet's action that sets the chosen time and closes it. */
    done: string;
    /** Accessible name of the column of hours. */
    hours: string;
    /** Accessible name of the column of minutes. */
    minutes: string;
    /** The sheet's name when the field has no label. */
    chooseTime: string;
}

export const TIME_FIELD_STRINGS: TimeFieldStrings = {
    clear: "Clear",
    done: "Done",
    hours: "Hours",
    minutes: "Minutes",
    chooseTime: "Choose time",
};

/** Whether a `locale` was given: a tag, or a list with at least one. */
export function hasLocale(locale: string | string[] | undefined | null): boolean {
    return Array.isArray(locale) ? locale.length > 0 : !!locale;
}

/** The minutes between choices when the app says nothing: five. */
export const DEFAULT_MINUTE_STEP = 5;

/**
 * Whether the library's time picker can serve this `step`. It has hours and
 * minutes only, so a step in seconds (under 60) or `"any"` is left to the
 * platform's own picker.
 */
export function stepFitsLibraryPicker(step: number | "any" | undefined): boolean {
    if (step === undefined) return true;
    return typeof step === "number" && Number.isFinite(step) && step >= 60;
}

/** `step` (in seconds) as whole minutes between choices; five without one. */
export function minuteStep(step: number | "any" | undefined): number {
    if (typeof step === "number" && Number.isFinite(step) && step >= 60) return Math.round(step / 60);
    return DEFAULT_MINUTE_STEP;
}

const pad2 = (value: number) => String(value).padStart(2, "0");

/** `"19:30"` (or `"19:30:15"`) as [19, 30]; null for anything else. */
export function parseHourMinute(value: string | null | undefined): [number, number] | null {
    const match = /^(\d{2}):(\d{2})(?::\d{2}(?:\.\d+)?)?$/.exec(value ?? "");
    if (!match) return null;
    const hour = Number(match[1]);
    const minute = Number(match[2]);
    return hour > 23 || minute > 59 ? null : [hour, minute];
}

/**
 * Whether a time is within `min` and `max`, either of which may be missing.
 * Like the native input, a `min` later than `max` is a range over midnight:
 * 22:00 to 06:00 allows 23:30 and 05:00.
 */
export function timeInRange(hour: number, minute: number, min?: string, max?: string): boolean {
    const at = hour * 60 + minute;
    const lower = parseHourMinute(min);
    const upper = parseHourMinute(max);
    const from = lower ? lower[0] * 60 + lower[1] : null;
    const to = upper ? upper[0] * 60 + upper[1] : null;
    if (from !== null && to !== null && from > to) return at >= from || at <= to;
    if (from !== null && at < from) return false;
    if (to !== null && at > to) return false;
    return true;
}

export interface TimeChoice {
    /** Two digits: `"07"`. */
    value: string;
    label: string;
    disabled: boolean;
}

/** The hour as the locale writes it: "19" in Swedish, "7 PM" in American English. */
export function hourLabel(hour: number, locale: string | string[] | undefined): string {
    return formatTime(`${pad2(hour)}:00`, locale, { hour: "numeric" }) || pad2(hour);
}

/** The minute as two digits, in the locale's own numerals. */
export function minuteLabel(minute: number, locale: string | string[] | undefined): string {
    try {
        return new Intl.NumberFormat(locale || undefined, { minimumIntegerDigits: 2, useGrouping: false }).format(minute);
    } catch {
        return pad2(minute);
    }
}

/** The 24 hours. An hour is disabled when no time in it is within `min` and `max`. */
export function hourChoices(locale: string | string[] | undefined, min?: string, max?: string): TimeChoice[] {
    return Array.from({ length: 24 }, (_, hour) => ({
        value: pad2(hour),
        label: hourLabel(hour, locale),
        disabled: !Array.from({ length: 60 }, (_, minute) => minute).some((minute) => timeInRange(hour, minute, min, max)),
    }));
}

/**
 * The minutes of one hour: every `stepMinutes`, plus the minute of `current`
 * when it is not on the step, so a value such as 19:07 can be kept. A minute
 * is disabled when the time is outside `min` and `max`; with no hour chosen
 * none is.
 */
export function minuteChoices(options: {
    locale: string | string[] | undefined;
    stepMinutes: number;
    hour: string;
    current?: string;
    min?: string;
    max?: string;
}): TimeChoice[] {
    const { locale, stepMinutes, hour, current, min, max } = options;
    const minutes = new Set<number>();
    for (let minute = 0; minute < 60; minute += stepMinutes) minutes.add(minute);
    const now = parseHourMinute(current);
    if (now) minutes.add(now[1]);
    const chosenHour = hour === "" ? null : Number(hour);
    return [...minutes]
        .sort((a, b) => a - b)
        .map((minute) => ({
            value: pad2(minute),
            label: minuteLabel(minute, locale),
            disabled: chosenHour !== null && !timeInRange(chosenHour, minute, min, max),
        }));
}
