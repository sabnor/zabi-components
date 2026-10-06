<script lang="ts">
    import { onMount } from "svelte";
    import Select from "../../../components/atoms/Select.svelte";
    import Input from "../../../components/atoms/Input.svelte";

    /**
     * Select in a real form, for playwright/select-form.spec.ts: its width in
     * a column, long labels, and what it does before the scripts arrive or
     * without them (a native `<select>` in the server's HTML).
     */
    const frequency = [
        { value: "weekly", label: "Every week" },
        { value: "biweekly", label: "Every other week" },
        { value: "monthly", label: "Every month" },
        { value: "never", label: "Never", disabled: true },
    ];
    const svenska = [
        { value: "vecka", label: "Varje vecka" },
        { value: "varannan", label: "Varannan vecka på torsdagar" },
        { value: "manad", label: "Första torsdagen i varje månad" },
    ];
    const numbers = [
        { value: 1, label: "One" },
        { value: 2, label: "Two" },
        { value: 3, label: "Three" },
    ];

    let chosen = $state<string | number | undefined>("biweekly");
    let required = $state<string | number | undefined>(undefined);
    let swedish = $state<string | number | undefined>("manad");
    let narrow = $state<string | number | undefined>("biweekly");
    let native = $state<string | number | undefined>("weekly");
    let count = $state<string | number | undefined>(2);
    let changes = $state<string[]>([]);

    let hydrated = $state(false);
    onMount(() => {
        hydrated = true;
    });
</script>

<svelte:head>
    <title>Select form lab</title>
    <meta name="robots" content="noindex" />
</svelte:head>

<main class="p-[16px]">
    <h1 class="text-lg font-semibold text-headline">Select form lab</h1>
    {#if hydrated}
        <span data-testid="lab-hydrated" aria-hidden="true" hidden></span>
    {/if}

    <!-- 328px: a 360px phone less 16px on each side. -->
    <form method="GET" class="mt-4 w-[328px] max-w-full space-y-4" data-testid="lab-form">
        <div data-testid="lab-frequency">
            <Select
                label="Frequency"
                name="frequency"
                options={frequency}
                searchable={false}
                bind:value={chosen}
                onchange={() => (changes = [...changes, "frequency"])}
            />
        </div>
        <div data-testid="lab-input">
            <Input label="Beside an input" name="note" value="Same width" />
        </div>
        <div data-testid="lab-required">
            <Select
                label="Required"
                name="needed"
                required
                placeholder="Choose one"
                options={frequency}
                searchable={false}
                bind:value={required}
            />
        </div>
        <div data-testid="lab-count">
            <Select label="A number" name="count" options={numbers} searchable={false} bind:value={count} />
        </div>
        <div data-testid="lab-native">
            <Select
                label="Native"
                name="plain"
                presentation="native"
                options={frequency}
                bind:value={native}
                onchange={() => (changes = [...changes, "plain"])}
            />
        </div>
        <button type="submit" class="min-h-11 rounded-control border border-border px-3">Submit</button>
    </form>
    <p class="mt-2 text-sm text-description [overflow-wrap:anywhere]" data-testid="lab-state">
        {chosen ?? ""}|{required ?? ""}|{count ?? ""}:{typeof count}|{native ?? ""}|{changes.join(",")}
    </p>

    <!-- Long Swedish labels in a column that is all the screen gives. -->
    <div class="mt-6" style="max-width: 328px" data-testid="lab-swedish">
        <Select label="Hur ofta" options={svenska} searchable={false} bind:value={swedish} />
    </div>

    <!-- A column narrower than the label. -->
    <div class="mt-6 w-32" data-testid="lab-narrow">
        <Select label="Narrow" options={frequency} searchable={false} bind:value={narrow} />
    </div>

    <div class="h-[400px]"></div>
</main>
