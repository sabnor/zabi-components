<script lang="ts">
    import Calendar from '../../components/molecules/Calendar.svelte';
    import type { CalendarEvent, CalendarStrings } from '../../components/util/calendar.js';
    import { formatDate } from '../../components/util/date.js';

    interface Props {
        /** The month it starts on, as YYYY-MM. */
        startMonth?: string;
        /** The day that starts selected, as YYYY-MM-DD; empty for none. */
        startSelected?: string;
        locale?: string;
        weekStartsOn?: number;
        min?: string;
        max?: string;
        /** Close every Monday. */
        closedMondays?: boolean;
        /** Leave the events out. */
        withoutEvents?: boolean;
        /** Say everything in Swedish. */
        swedish?: boolean;
        /** Width of the phone frame in px, margins included. */
        frameWidth?: 320 | 360 | 390;
    }

    let {
        startMonth = '2026-10',
        startSelected = '2026-10-06',
        locale = 'en-GB',
        weekStartsOn = 1,
        min,
        max,
        closedMondays = false,
        withoutEvents = false,
        swedish = false,
        frameWidth = 360,
    }: Props = $props();

    const events: CalendarEvent[] = [
        { date: '2026-10-06', label: 'Quiz at The Crown' },
        { date: '2026-10-06', label: 'Music quiz', tone: 'accent' },
        { date: '2026-10-10', label: 'Team meeting', tone: 'success' },
        { date: '2026-10-17', label: 'Quarter-final', tone: 'warning' },
        { date: '2026-10-17', label: 'Semi-final', tone: 'danger' },
        { date: '2026-10-17', label: 'Final' },
        { date: '2026-10-17', label: 'After-party', tone: 'accent' },
        { date: '2026-11-03', label: 'Autumn quiz' },
    ];

    const swedishStrings: Partial<CalendarStrings> = {
        previousMonth: 'Föregående månad',
        nextMonth: 'Nästa månad',
        today: 'i dag',
        selected: 'vald',
        unavailable: 'inte valbar',
        events: (list) =>
            `${list.length} ${list.length === 1 ? 'händelse' : 'händelser'}: ${list
                .map((event) => event.label)
                .join(', ')}`,
    };

    // svelte-ignore state_referenced_locally
    let month = $state(startMonth);
    // svelte-ignore state_referenced_locally
    let selected = $state<string | null>(startSelected || null);
    const shown = $derived(withoutEvents ? [] : events);
    const dayEvents = $derived(shown.filter((event) => event.date === selected));
    const language = $derived(swedish ? 'sv' : locale);
</script>

<!-- A phone-width frame with the 16px margins of a screen. Under the grid,
what an app does with the selection: the day's events. -->
<div
    class="space-y-4 rounded-container border border-border bg-background p-4"
    style="width: {frameWidth}px;"
>
    <Calendar
        bind:month
        bind:selected
        events={shown}
        locale={language}
        {weekStartsOn}
        {min}
        {max}
        isDateDisabled={closedMondays
            ? (date) => new Date(`${date}T00:00:00Z`).getUTCDay() === 1
            : undefined}
        strings={swedish ? swedishStrings : undefined}
    />
    <section aria-live="polite">
        <h3 class="text-sm font-semibold text-headline first-letter:uppercase">
            {selected
                ? formatDate(selected, language, { weekday: 'long', day: 'numeric', month: 'long' })
                : 'No day selected'}
        </h3>
        {#if dayEvents.length === 0}
            <p class="mt-2 text-sm text-description">Nothing on this day.</p>
        {:else}
            <ul class="m-0 mt-2 list-none space-y-2 p-0">
                {#each dayEvents as event (event.label)}
                    <li class="rounded-container border border-border bg-card p-3 text-sm text-body">
                        {event.label}
                    </li>
                {/each}
            </ul>
        {/if}
    </section>
</div>
