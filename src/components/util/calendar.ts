/** Public types and pure helpers for `Calendar`. */

import { addDays, addMonths, endOfWeek, startOfWeek } from "./date.js";

/** The colour of an event's dot. `default` is the primary action colour. */
export type CalendarTone = "default" | "success" | "warning" | "danger" | "accent";

/** Something that happens on a day. */
export interface CalendarEvent {
    /** The day, as `YYYY-MM-DD`. */
    date: string;
    /** What it is. Not shown in the grid; read out with the day. */
    label: string;
    tone?: CalendarTone;
}

/** The words the calendar says. Replace any of them to translate. */
export interface CalendarStrings {
    /** Accessible name of the button that goes a month back. */
    previousMonth: string;
    /** Accessible name of the button that goes a month forward. */
    nextMonth: string;
    /** Added to the name of today's date. */
    today: string;
    /** Added to the name of the selected date. */
    selected: string;
    /** Added to the name of a date that cannot be selected. */
    unavailable: string;
    /** The events part of a day's name. Called only for a day that has events. */
    events: (events: CalendarEvent[]) => string;
}

export const DEFAULT_CALENDAR_STRINGS: CalendarStrings = {
    previousMonth: "Previous month",
    nextMonth: "Next month",
    today: "today",
    selected: "selected",
    unavailable: "unavailable",
    events: (events) =>
        `${events.length} ${events.length === 1 ? "event" : "events"}: ${events
            .map((event) => event.label)
            .join(", ")}`,
};

/** How many dots a day shows at most. The name of the day still counts every event. */
export const MAX_EVENT_DOTS = 3;

/**
 * The accessible name of a day: the full date, then what is true of it, then
 * its events. "Tuesday 6 October 2026, today, selected, 2 events: Quiz at The
 * Crown, Music quiz".
 */
export function calendarDayName(
    fullDate: string,
    state: { today: boolean; selected: boolean; disabled: boolean; events: CalendarEvent[] },
    strings: CalendarStrings,
): string {
    const parts = [fullDate];
    if (state.today) parts.push(strings.today);
    if (state.selected) parts.push(strings.selected);
    if (state.disabled) parts.push(strings.unavailable);
    if (state.events.length > 0) parts.push(strings.events(state.events));
    return parts.join(", ");
}

/**
 * Where a key takes focus from `date`, by the date-grid pattern: the arrows by
 * a day and a week, Home and End to the ends of the week, Page Up and Page
 * Down by a month, and by a year with Shift. Left and Right swap in a
 * right-to-left layout, where the next day is on the left.
 *
 * Returns null for a key that does not move, or a move past year 1 or 9999.
 */
export function calendarKeyTarget(
    key: string,
    date: string,
    options: { shift?: boolean; rtl?: boolean; weekStartsOn?: number } = {},
): string | null {
    const { shift = false, rtl = false, weekStartsOn = 1 } = options;
    switch (key) {
        case "ArrowLeft":
            return addDays(date, rtl ? 1 : -1);
        case "ArrowRight":
            return addDays(date, rtl ? -1 : 1);
        case "ArrowUp":
            return addDays(date, -7);
        case "ArrowDown":
            return addDays(date, 7);
        case "Home":
            return startOfWeek(date, weekStartsOn);
        case "End":
            return endOfWeek(date, weekStartsOn);
        case "PageUp":
            return addMonths(date, shift ? -12 : -1);
        case "PageDown":
            return addMonths(date, shift ? 12 : 1);
        default:
            return null;
    }
}

/** The events of each day, in the order given. */
export function groupEventsByDate(events: readonly CalendarEvent[]): Map<string, CalendarEvent[]> {
    const byDate = new Map<string, CalendarEvent[]>();
    for (const event of events) {
        const list = byDate.get(event.date);
        if (list) list.push(event);
        else byDate.set(event.date, [event]);
    }
    return byDate;
}
