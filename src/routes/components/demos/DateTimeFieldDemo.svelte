<script lang="ts">
    import Button from "../../../components/atoms/Button.svelte";
    import DateField from "../../../components/atoms/DateField.svelte";
    import TimeField from "../../../components/atoms/TimeField.svelte";
    import FormField from "../../../components/molecules/FormField.svelte";
    import { formatDate, formatTime } from "../../../components/util/date.js";
    import type { DemoRendererProps } from "./types";

    /** One demo for both fields; `kind` says which page it is on. */
    let { exampleIndex, kind }: DemoRendererProps & { kind: "date" | "time" } = $props();

    let date = $state("2026-10-06");
    let time = $state("19:00");
    let submitted = $state("Nothing sent yet.");

    let deadline = $state("");
    let opens = $state("");
    const deadlineError = $derived(
        deadline && deadline < "2026-10-01" ? "Pick a day in October or later." : "",
    );
    const opensError = $derived(opens && opens < "17:00" ? "The pub opens at 17:00." : "");

    function send(event: SubmitEvent) {
        event.preventDefault();
        const data = new FormData(event.currentTarget as HTMLFormElement);
        submitted = JSON.stringify(Object.fromEntries(data.entries()));
    }
</script>

{#if exampleIndex === 0}
    <form class="w-full space-y-4" onsubmit={send} data-testid="{kind}-field-demo-form">
        {#if kind === "date"}
            <DateField label="Quiz date" name="date" bind:value={date} required />
        {:else}
            <TimeField label="Starts" name="time" bind:value={time} step={300} required />
        {/if}
        <!-- The field shows the device's format; this line is the page's. -->
        <p class="text-sm text-description" data-testid="{kind}-field-demo-text">
            {#if kind === "date"}
                Value: {date || "empty"}. In British English: {formatDate(date, "en-GB") || "–"}. In
                American English: {formatDate(date, "en-US") || "–"}.
            {:else}
                Value: {time || "empty"}. In British English: {formatTime(time, "en-GB") || "–"}. In
                American English: {formatTime(time, "en-US") || "–"}.
            {/if}
        </p>
        <Button type="submit" size="lg">Send</Button>
        <p class="text-sm text-description" data-testid="{kind}-field-demo-sent">{submitted}</p>
    </form>
{:else if exampleIndex === 1}
    <div class="w-full space-y-6">
        {#if kind === "date"}
            <DateField
                label="Last day to sign up"
                hint="Teams can join until the end of this day."
                error={deadlineError}
                min="2026-10-01"
                max="2026-12-31"
                bind:value={deadline}
                data-testid="date-field-demo-limits"
            />
            <FormField label="Played on" description="Shown on the leaderboard." required>
                {#snippet control(props)}
                    <DateField hideLabel bind:value={date} {...props} />
                {/snippet}
            </FormField>
        {:else}
            <TimeField
                label="Doors open"
                hint="In steps of 15 minutes."
                error={opensError}
                min="17:00"
                max="23:00"
                step={900}
                bind:value={opens}
                data-testid="time-field-demo-limits"
            />
            <FormField label="First question" description="Shown in the invitation." required>
                {#snippet control(props)}
                    <TimeField hideLabel bind:value={time} {...props} />
                {/snippet}
            </FormField>
        {/if}
    </div>
{:else}
    <div class="w-full space-y-4">
        {#if kind === "date"}
            <DateField label="Small" size="sm" bind:value={date} />
            <DateField label="Medium" size="md" bind:value={date} />
            <DateField label="Large" size="lg" bind:value={date} />
            <DateField label="Read only" readonly bind:value={date} />
            <DateField label="Disabled" disabled bind:value={date} />
        {:else}
            <TimeField label="Small" size="sm" bind:value={time} />
            <TimeField label="Medium" size="md" bind:value={time} />
            <TimeField label="Large" size="lg" bind:value={time} />
            <TimeField label="Read only" readonly bind:value={time} />
            <TimeField label="Disabled" disabled bind:value={time} />
        {/if}
    </div>
{/if}
