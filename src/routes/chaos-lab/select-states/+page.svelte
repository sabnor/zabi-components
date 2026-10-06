<script lang="ts">
    import { onMount } from "svelte";
    import Select from "../../../components/atoms/Select.svelte";

    /**
     * A Select enabled, disabled with a value, and disabled without one, for
     * playwright/qa-findings-3.spec.ts: both disabled ones have to dim their text.
     */
    const options = [
        { value: "1", label: "Team 1" },
        { value: "2", label: "Team 2" },
        { value: "3", label: "Team 3" },
    ];

    let hydrated = $state(false);
    onMount(() => {
        hydrated = true;
    });
</script>

<svelte:head>
    <title>Select states lab</title>
    <meta name="robots" content="noindex" />
</svelte:head>

<main class="p-4">
    <h1 class="text-lg font-semibold text-headline">Select states lab</h1>
    {#if hydrated}
        <span data-testid="lab-hydrated" aria-hidden="true" hidden></span>
    {/if}

    <div class="mt-4 max-w-xs space-y-4" data-testid="lab-select-states">
        <Select label="Enabled" value="1" {options} />
        <Select label="Disabled" value="1" disabled {options} />
        <Select label="Disabled, empty" disabled {options} />
    </div>
</main>
