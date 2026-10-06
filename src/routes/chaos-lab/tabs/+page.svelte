<script lang="ts">
    import { onMount } from "svelte";
    import Tabs from "../../../components/molecules/Tabs.svelte";

    /**
     * Tab lists that fit, that do not, and that share the row, for
     * playwright/tabs-overflow.spec.ts.
     */
    const three = [
        { id: "list", label: "List" },
        { id: "month", label: "Month" },
        { id: "map", label: "Map" },
    ];
    const many = [
        { id: "overview", label: "Overview" },
        { id: "schedule", label: "Schedule" },
        { id: "teams", label: "Teams" },
        { id: "standings", label: "Standings" },
        { id: "venues", label: "Venues" },
        { id: "rules", label: "Rules", disabled: true },
        { id: "archive", label: "Archive" },
        { id: "settings", label: "Settings" },
    ];

    let hydrated = $state(false);
    onMount(() => {
        hydrated = true;
    });

    let fits = $state("list");
    let overflowing = $state("overview");
    let startsAtEnd = $state("settings");
    let shared = $state("list");
    let rtl = $state("overview");
    let pills = $state("overview");
    let sharedFive = $state("overview");
    let sharedTwo = $state("upcoming");
</script>

<svelte:head>
    <title>Tabs lab</title>
    <meta name="robots" content="noindex" />
</svelte:head>

<main class="space-y-8 p-4">
    <h1 class="text-lg font-semibold text-headline">Tabs lab</h1>
    {#if hydrated}
        <span data-testid="lab-hydrated" aria-hidden="true" hidden></span>
    {/if}

    <section data-testid="lab-fits">
        <Tabs tabs={three} bind:activeTab={fits}>
            {#snippet children({ activeTab })}<p data-testid="lab-fits-panel">{activeTab}</p>{/snippet}
        </Tabs>
    </section>

    <section data-testid="lab-overflow">
        <Tabs tabs={many} bind:activeTab={overflowing}>
            {#snippet children({ activeTab })}<p data-testid="lab-overflow-panel">{activeTab}</p>{/snippet}
        </Tabs>
    </section>

    <section data-testid="lab-starts-at-end">
        <Tabs tabs={many} bind:activeTab={startsAtEnd}>
            {#snippet children({ activeTab })}<p>{activeTab}</p>{/snippet}
        </Tabs>
    </section>

    <section data-testid="lab-shared">
        <Tabs tabs={three} bind:activeTab={shared} fullWidth>
            {#snippet children({ activeTab })}<p data-testid="lab-shared-panel">{activeTab}</p>{/snippet}
        </Tabs>
    </section>

    <!-- `fullWidth` outside the two or three tabs it is meant for. -->
    <section data-testid="lab-shared-five">
        <Tabs tabs={many.slice(0, 5)} bind:activeTab={sharedFive} fullWidth>
            {#snippet children({ activeTab })}<p>{activeTab}</p>{/snippet}
        </Tabs>
    </section>

    <section data-testid="lab-shared-two">
        <Tabs
            tabs={[
                { id: "upcoming", label: "Upcoming quizzes" },
                { id: "past", label: "Past" },
            ]}
            bind:activeTab={sharedTwo}
            fullWidth
        >
            {#snippet children({ activeTab })}<p>{activeTab}</p>{/snippet}
        </Tabs>
    </section>

    <section data-testid="lab-rtl" dir="rtl">
        <Tabs tabs={many} bind:activeTab={rtl}>
            {#snippet children({ activeTab })}<p>{activeTab}</p>{/snippet}
        </Tabs>
    </section>

    <section data-testid="lab-pills">
        <Tabs tabs={many} bind:activeTab={pills} variant="pills">
            {#snippet children({ activeTab })}<p>{activeTab}</p>{/snippet}
        </Tabs>
    </section>
</main>
