<script lang="ts">
    import Calendar from "../../../components/molecules/Calendar.svelte";
    import type { CalendarEvent, CalendarStrings } from "../../../components/util/calendar.js";
    import { formatDate } from "../../../components/util/date.js";
    import type { DemoRendererProps } from "./types";

    let { exampleIndex }: DemoRendererProps = $props();

    const events: CalendarEvent[] = [
        { date: "2026-10-06", label: "Quiz på The Crown" },
        { date: "2026-10-06", label: "Musikquiz", tone: "accent" },
        { date: "2026-10-10", label: "Lagträff", tone: "success" },
        { date: "2026-10-17", label: "Kvartsfinal", tone: "warning" },
        { date: "2026-10-17", label: "Semifinal", tone: "danger" },
        { date: "2026-10-17", label: "Final" },
        { date: "2026-10-17", label: "Efterfest", tone: "accent" },
        { date: "2026-11-03", label: "Höstquiz" },
    ];

    /** The app is Swedish: so are the words the calendar says. */
    const swedish: Partial<CalendarStrings> = {
        previousMonth: "Föregående månad",
        nextMonth: "Nästa månad",
        today: "i dag",
        selected: "vald",
        unavailable: "inte valbar",
        events: (list) =>
            `${list.length} ${list.length === 1 ? "händelse" : "händelser"}: ${list
                .map((event) => event.label)
                .join(", ")}`,
    };

    let month = $state("2026-10");
    let selected = $state<string | null>("2026-10-06");
    const dayEvents = $derived(events.filter((event) => event.date === selected));

    let bookingMonth = $state("2026-10");
    let booked = $state<string | null>(null);
    let lastSelect = $state("none yet");
</script>

{#if exampleIndex === 0}
    <!-- 308px is seven 44px days: the card this example sits in is narrower
    than a phone, so it scrolls sideways there instead of squeezing the days. -->
    <div class="overflow-x-auto">
    <div class="mx-auto w-full min-w-[308px] space-y-4 sm:w-96" data-testid="calendar-demo">
        <Calendar bind:month bind:selected {events} locale="sv" strings={swedish} />
        <!-- What the app does with the selection: the day's quizzes, under the grid. -->
        <section aria-live="polite" data-testid="calendar-demo-events">
            <h3 class="text-sm font-semibold text-headline first-letter:uppercase">
                {selected
                    ? formatDate(selected, "sv", { weekday: "long", day: "numeric", month: "long" })
                    : "Ingen dag vald"}
            </h3>
            {#if dayEvents.length === 0}
                <p class="mt-2 text-sm text-description">Inga quiz den här dagen.</p>
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
    </div>
{:else}
    <div class="overflow-x-auto">
    <div class="mx-auto w-full min-w-[308px] space-y-3 sm:w-96" data-testid="calendar-demo-limits">
        <Calendar
            bind:month={bookingMonth}
            bind:selected={booked}
            locale="en-GB"
            weekStartsOn={0}
            min="2026-10-05"
            max="2026-11-20"
            isDateDisabled={(date) => new Date(`${date}T00:00:00Z`).getUTCDay() === 1}
            onselect={(date) => (lastSelect = date)}
        />
        <p class="text-sm text-description" data-testid="calendar-demo-limits-state">
            Booked: {booked ?? "nothing"}. Last select: {lastSelect}.
        </p>
    </div>
    </div>
{/if}
