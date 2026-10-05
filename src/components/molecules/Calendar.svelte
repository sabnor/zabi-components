<script lang="ts">
    import { tick } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import ChevronLeft from "@lucide/svelte/icons/chevron-left";
    import ChevronRight from "@lucide/svelte/icons/chevron-right";
    import IconButton from "../atoms/IconButton.svelte";
    import {
        calendarDayName,
        calendarKeyTarget,
        DEFAULT_CALENDAR_STRINGS,
        groupEventsByDate,
        MAX_EVENT_DOTS,
        type CalendarEvent,
        type CalendarStrings,
    } from "../util/calendar.js";
    import { cn } from "../util/cn.js";
    import {
        addMonthsToMonth,
        clampDate,
        daysInMonth,
        formatDate,
        isIsoDate,
        monthGrid,
        monthOf,
        normaliseWeekStart,
        parseIsoDate,
        parseIsoMonth,
        todayIso,
        todayIsoUtc,
        toIsoDate,
        weekdayOrder,
    } from "../util/date.js";
    import { isRtl } from "../util/radio-keys.js";
    import { generateId } from "../util/ssr-safe.js";

    /**
     * One month as a grid of days, with a dot on the days that have events.
     * Pick a day and list what happens on it below:
     *
     * ```svelte
     * <Calendar bind:selected {events} locale="sv" />
     * {#each events.filter((event) => event.date === selected) as event}
     *     <p>{event.label}</p>
     * {/each}
     * ```
     *
     * Dates are strings: `YYYY-MM-DD` for a day, `YYYY-MM` for a month. A
     * press on the selected day changes nothing: the selection is never
     * cleared by pressing it again.
     *
     * It is as wide as its container, seven equal columns: give it a width
     * where the container is wide. Days are at least 44px tall, and at least
     * 40px wide down to a 320px screen with 16px margins.
     * The weekday names are three letters ("Mon"), or one where the text is
     * enlarged so far that three would not fit their column.
     *
     * On the server, and until it runs in the browser, it does not know what
     * day it is: nothing is marked as today, and a calendar given neither
     * `month` nor `selected` shows the month it is in UTC. Pass `month` to
     * decide the first month yourself, and `locale` so the names are the same
     * on the server and in the browser.
     *
     * Other attributes (`id`, `data-*`, ...) land on the host element.
     */
    type Props = Omit<HTMLAttributes<HTMLDivElement>, "class" | "onselect"> & {
        /**
         * The month shown, as `YYYY-MM`. Supports `bind:month`. Left out, it
         * starts at the month of `selected`, or of today.
         */
        month?: string;
        /** The selected day, as `YYYY-MM-DD`, or null. Supports `bind:selected`. */
        selected?: string | null;
        /** What happens on which day. A day shows a dot per event, three at most. */
        events?: CalendarEvent[];
        /** First day of the week: 0 for Sunday to 6 for Saturday. */
        weekStartsOn?: number;
        /**
         * Language of the month and day names, as a BCP 47 tag (`sv`, `en-GB`).
         * Left out, it is the page's language (`<html lang>`), then the
         * browser's; on the server, English.
         *
         * It translates only what comes from the calendar of that language:
         * the month, the weekdays and the dates. The words the component
         * adds ("Previous month", "today", "selected", "2 events: ...") stay
         * English until you pass them in `strings`. Translate both.
         */
        locale?: string;
        /** Earliest day that can be selected, as `YYYY-MM-DD`. Months before it cannot be reached. */
        min?: string;
        /** Latest day that can be selected, as `YYYY-MM-DD`. Months after it cannot be reached. */
        max?: string;
        /** Return true for a day that cannot be selected. It can still be focused and read. */
        isDateDisabled?: (date: string) => boolean;
        /** The words the calendar says; replace any of them to translate. */
        strings?: Partial<CalendarStrings>;
        /** Called with the day when the user selects another one. */
        onselect?: (date: string) => void;
        /** Called with the month when the user moves to another one. */
        onmonthchange?: (month: string) => void;
        /** Extra classes for the host element. */
        class?: string;
    };

    let {
        month = $bindable(),
        selected = $bindable(null),
        events = [],
        weekStartsOn = 1,
        locale,
        min,
        max,
        isDateDisabled,
        strings,
        onselect,
        onmonthchange,
        class: className = "",
        ...restProps
    }: Props = $props();

    const titleId = generateId("calendar-title");
    const text = $derived({ ...DEFAULT_CALENDAR_STRINGS, ...strings });

    let grid: HTMLTableElement | undefined = $state();

    /**
     * Null on the server and in the first render in the browser, so the two
     * agree whatever the time zones; the real day arrives once mounted.
     */
    let today = $state<string | null>(null);
    /** The page's or the browser's language, known once mounted. */
    let detectedLocale = $state<string | undefined>(undefined);
    /**
     * The month to show when neither `month` nor `selected` says. UTC first:
     * the server and the browser compute the same one. The user's own month
     * replaces it once mounted, which differs only around the turn of a month.
     */
    let fallbackMonth = $state(monthOf(todayIsoUtc())!);

    $effect(() => {
        const now = todayIso();
        today = now;
        fallbackMonth = monthOf(now)!;
        detectedLocale = document.documentElement.lang || navigator.language || undefined;
        // A calendar left open over midnight: look again when it is looked at again.
        const refresh = () => {
            if (document.visibilityState === "visible") today = todayIso();
        };
        document.addEventListener("visibilitychange", refresh);
        return () => document.removeEventListener("visibilitychange", refresh);
    });

    const language = $derived(locale ?? detectedLocale ?? "en");
    const weekStart = $derived(normaliseWeekStart(weekStartsOn));
    const selectedDate = $derived(isIsoDate(selected) ? selected : null);
    const viewMonth = $derived(
        parseIsoMonth(month) ? (month as string) : (monthOf(selectedDate) ?? fallbackMonth),
    );
    const weeks = $derived(monthGrid(viewMonth, weekStart));
    const eventsByDate = $derived(groupEventsByDate(events));

    const title = $derived(
        formatDate(`${viewMonth}-01`, language, { month: "long", year: "numeric" }),
    );

    /** 1 January 2023 was a Sunday: that week gives the names of the seven days. */
    const weekdays = $derived(
        weekdayOrder(weekStart).map((weekday) => {
            const sample = toIsoDate(2023, 1, 1 + weekday);
            return {
                short: formatDate(sample, language, { weekday: "short" }),
                narrow: formatDate(sample, language, { weekday: "narrow" }),
                long: formatDate(sample, language, { weekday: "long" }),
            };
        }),
    );

    function isDisabled(date: string): boolean {
        if (isIsoDate(min) && date < min) return true;
        if (isIsoDate(max) && date > max) return true;
        return isDateDisabled?.(date) ?? false;
    }

    const previous = $derived(addMonthsToMonth(viewMonth, -1));
    const next = $derived(addMonthsToMonth(viewMonth, 1));
    /** A month can be reached when at least one of its days is within `min` and `max`. */
    const canGoPrevious = $derived.by(() => {
        const parts = parseIsoMonth(previous);
        if (!parts) return false;
        const last = toIsoDate(parts.year, parts.month, daysInMonth(parts.year, parts.month));
        return !(isIsoDate(min) && last < min);
    });
    const canGoNext = $derived(!!next && !(isIsoDate(max) && `${next}-01` > max));

    /** The day the keyboard was last on. It keeps the one Tab stop where the user left it. */
    let focused = $state<string | null>(null);

    /**
     * The one day in the grid that takes Tab: where the keyboard was, else
     * the selected day, else today, else the first day that can be selected;
     * always a day of the month shown.
     */
    const tabStop = $derived.by(() => {
        const inView = (date: string | null) => !!date && monthOf(date) === viewMonth;
        if (inView(focused)) return focused;
        if (inView(selectedDate)) return selectedDate;
        if (inView(today)) return today;
        const days = weeks.flat().filter((date): date is string => date !== null);
        return days.find((date) => !isDisabled(date)) ?? days[0] ?? null;
    });

    function showMonth(nextMonth: string | null) {
        if (!nextMonth || nextMonth === viewMonth) return;
        month = nextMonth;
        onmonthchange?.(nextMonth);
    }

    /** A press on the selected day is not a change: a single selection never clears. */
    function select(date: string) {
        if (isDisabled(date) || date === selectedDate) return;
        selected = date;
        onselect?.(date);
    }

    async function focusDay(date: string) {
        focused = date;
        showMonth(monthOf(date));
        await tick();
        grid?.querySelector<HTMLElement>(`[data-date="${date}"]`)?.focus();
    }

    function handleKeydown(event: KeyboardEvent) {
        const origin = (event.target as Element | null)?.closest<HTMLElement>("[data-date]");
        const from = origin?.dataset.date;
        if (!from || event.altKey || event.ctrlKey || event.metaKey) return;
        const target = calendarKeyTarget(event.key, from, {
            shift: event.shiftKey,
            rtl: isRtl(event.currentTarget as Element),
            weekStartsOn: weekStart,
        });
        if (!target) return;
        // The key is the grid's either way: the page must not scroll under it.
        event.preventDefault();
        // Not past the first or last day that may be chosen.
        const allowed = clampDate(target, min, max);
        if (allowed !== from) void focusDay(allowed);
    }

    const fullDate = (date: string) =>
        formatDate(date, language, {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });

    /** `aria-disabled`, not `disabled`: a button that turns disabled under the finger or the key would drop focus. */
    const stepClasses = (available: boolean) =>
        available ? "" : "cursor-not-allowed opacity-50 hover:bg-transparent active:bg-transparent active:scale-100";
</script>

<div class={cn("zabi-calendar w-full", className)} data-month={viewMonth} {...restProps}>
    <div class="flex items-center justify-between gap-[8px] pb-2">
        <IconButton
            variant="ghost"
            label={text.previousMonth}
            aria-disabled={canGoPrevious ? undefined : "true"}
            class={stepClasses(canGoPrevious)}
            onclick={() => canGoPrevious && showMonth(previous)}
        >
            <ChevronLeft size={20} class="rtl:rotate-180" aria-hidden="true" />
        </IconButton>
        <!-- A live region: a change of month is read out, also when it comes
        from the arrow keys in the grid. -->
        <div
            id={titleId}
            class="min-w-0 text-center text-base font-semibold text-headline first-letter:uppercase"
            aria-live="polite"
            aria-atomic="true"
        >
            {title}
        </div>
        <IconButton
            variant="ghost"
            label={text.nextMonth}
            aria-disabled={canGoNext ? undefined : "true"}
            class={stepClasses(canGoNext)}
            onclick={() => canGoNext && showMonth(next)}
        >
            <ChevronRight size={20} class="rtl:rotate-180" aria-hidden="true" />
        </IconButton>
    </div>

    <!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
    <table
        bind:this={grid}
        role="grid"
        aria-labelledby={titleId}
        class="w-full table-fixed border-collapse"
        onkeydown={handleKeydown}
    >
        <thead>
            <tr>
                {#each weekdays as weekday (weekday.long)}
                    <th scope="col" abbr={weekday.long} class="h-8 p-0 text-xs font-medium text-description">
                        <span class="weekday" aria-hidden="true">
                            <span class="weekday-short">{weekday.short}</span>
                            <span class="weekday-narrow">{weekday.narrow}</span>
                        </span>
                        <span class="sr-only">{weekday.long}</span>
                    </th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each weeks as week, index (index)}
                <tr>
                    {#each week as date, column (column)}
                        {#if date}
                            {@const dayEvents = eventsByDate.get(date) ?? []}
                            {@const isToday = date === today}
                            {@const isSelected = date === selectedDate}
                            {@const disabled = isDisabled(date)}
                            <td role="gridcell" class="p-0" aria-selected={isSelected ? "true" : undefined}>
                                <button
                                    type="button"
                                    class="day"
                                    data-date={date}
                                    data-today={isToday ? "" : undefined}
                                    data-selected={isSelected ? "" : undefined}
                                    tabindex={date === tabStop ? 0 : -1}
                                    aria-label={calendarDayName(
                                        fullDate(date),
                                        {
                                            today: isToday,
                                            selected: isSelected,
                                            disabled,
                                            events: dayEvents,
                                        },
                                        text,
                                    )}
                                    aria-current={isToday ? "date" : undefined}
                                    aria-disabled={disabled ? "true" : undefined}
                                    onclick={() => select(date)}
                                    onfocus={() => (focused = date)}
                                >
                                    <span class="face">
                                        <span>{parseIsoDate(date)?.day}</span>
                                        {#if dayEvents.length > 0}
                                            <span class="dots" aria-hidden="true">
                                                {#each dayEvents.slice(0, MAX_EVENT_DOTS) as event, dot (dot)}
                                                    <span class="dot" data-tone={event.tone ?? "default"}></span>
                                                {/each}
                                            </span>
                                        {/if}
                                    </span>
                                </button>
                            </td>
                        {:else}
                            <!-- A place before the 1st or after the last day: days of
                            other months are not shown, so each day is in the grid once. -->
                            <td role="gridcell" class="p-0"></td>
                        {/if}
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<style>
    /*
     * The states of a day hang off the button (`data-selected`, `data-today`,
     * `aria-disabled`) and are drawn on the face inside it, which utilities
     * could only reach through a group variant per declaration.
     *
     * The button fills its cell and has square corners, so the cells take
     * touches edge to edge, corners included, with no gaps between them. The
     * face is drawn 2px inside it, so two marked days side by side do not run
     * into each other. The focus ring is drawn around the face as well: on
     * the square button it would not follow the shape that is seen.
     */
    /*
     * The weekday names follow the text size, the columns do not: with the
     * text enlarged to 200% on a 320px screen "Wed" is wider than its column
     * and runs into "Thu". In a column under 1.9rem the name is one letter
     * instead. The full name is read out either way.
     *
     * The query is on the name's own box, as wide as the column: the table
     * sets that width, not the name, so containing it changes no layout.
     */
    .weekday {
        display: block;
        container-type: inline-size;
    }
    .weekday-narrow {
        display: none;
    }
    @container (max-width: 1.9rem) {
        .weekday-short {
            display: none;
        }
        .weekday-narrow {
            display: inline;
        }
    }

    .day {
        position: relative;
        display: block;
        width: 100%;
        /* 44px for the finger, in px: it must not shrink. The rem part lets
           the number and the dots under it both fit when the text is enlarged. */
        min-height: max(44px, calc(1.25rem + 24px));
        padding: 0;
        border-radius: 0;
        outline: none;
        background: transparent;
        color: var(--color-body);
        font-size: 0.875rem;
        line-height: 1.25rem;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
    }

    /* Above its neighbours while focused: the ring reaches over their edges. */
    .day:focus-visible {
        z-index: 1;
    }

    /* The library's focus ring (see `.focus-ring` in app.css), on the face. */
    .day:focus-visible .face {
        box-shadow:
            0 0 0 2px var(--color-focus-ring-offset),
            0 0 0 4px var(--color-focus-ring);
    }

    .face {
        position: absolute;
        inset: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--radius-control);
        transition: background-color 150ms;
    }

    @media (hover: hover) {
        .day:not([aria-disabled="true"]):hover .face {
            background-color: var(--color-surface-hover);
        }
        .day[data-selected]:not([aria-disabled="true"]):hover .face {
            background-color: var(--color-action-primary-hover);
        }
    }

    .day:not([aria-disabled="true"]):active .face {
        background-color: var(--color-surface-active);
    }

    .day[data-selected] .face,
    .day[data-selected]:active .face {
        background-color: var(--color-action-primary);
        color: var(--color-action-primary-text);
        font-weight: 600;
    }

    /* Today: a ring and a heavier number, so it does not rest on colour. On
       the selected day the ring moves inside the fill and takes its text colour. */
    .day[data-today] .face {
        outline: 2px solid var(--color-action-primary);
        outline-offset: -2px;
        font-weight: 700;
    }
    .day[data-today][data-selected] .face {
        outline-color: currentColor;
        outline-offset: -4px;
    }

    /* Struck through as well as grey: the grey alone is a thin difference
       (3:1 against the page), and colour must not be the only sign. */
    .day[aria-disabled="true"] {
        color: var(--color-action-disabled-text);
        cursor: not-allowed;
    }

    /* On the number itself: the face is positioned out of the flow, and a
       line set on the button is not drawn through what is out of the flow. */
    .day[aria-disabled="true"] .face > span:first-child {
        text-decoration: line-through;
    }

    /* 5px above the bottom of the face: 4px dots, so 2px at their ends, plus
       those 5px stay within the face's 8px radius. */
    .dots {
        position: absolute;
        bottom: 5px;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        gap: 2px;
    }

    .dot {
        width: 4px;
        height: 4px;
        border-radius: var(--radius-pill);
        background-color: var(--color-action-primary);
    }
    .dot[data-tone="success"] {
        background-color: var(--color-success);
    }
    .dot[data-tone="warning"] {
        background-color: var(--color-warning);
    }
    .dot[data-tone="danger"] {
        background-color: var(--color-error);
    }
    .dot[data-tone="accent"] {
        background-color: var(--color-accent);
    }
    /* On the selected day's fill every dot takes the text colour: a tone
       would not show against it. The events are named with the day anyway. */
    .day[data-selected] .dot {
        background-color: currentColor;
    }

    @media (prefers-reduced-motion: reduce) {
        .face {
            transition: none;
        }
    }

    /* Fills are dropped where colours are forced: the selected day and the
       dots are drawn in system colours instead. */
    @media (forced-colors: active) {
        .day[data-selected] .face,
        .day[data-selected]:active .face {
            forced-color-adjust: none;
            background-color: Highlight;
            color: HighlightText;
        }
        /* A button's text is forced to ButtonText: without this a day that
           cannot be selected looks like one that can. */
        .day[aria-disabled="true"] {
            color: GrayText;
        }
        .day[data-today] .face {
            outline-color: CanvasText;
        }
        .day[data-today][data-selected] .face {
            outline-color: HighlightText;
        }
        /* The face's outline is today's mark, so focus is drawn on the
           button here, inside its edge. */
        .day:focus-visible {
            outline: 2px solid Highlight;
            outline-offset: -2px;
        }
        .day:focus-visible .face {
            box-shadow: none;
        }
        /* `[data-tone]` as well: a tone's own rule would otherwise win. */
        .dot,
        .dot[data-tone] {
            forced-color-adjust: none;
            background-color: CanvasText;
        }
        .day[data-selected] .dot,
        .day[data-selected] .dot[data-tone] {
            background-color: HighlightText;
        }
    }

    /* The selected day's hover rule is more specific than the one above, and
       with the adjustment off its own blue would show under the pointer. */
    @media (forced-colors: active) and (hover: hover) {
        .day[data-selected]:not([aria-disabled="true"]):hover .face {
            background-color: Highlight;
        }
    }
</style>
