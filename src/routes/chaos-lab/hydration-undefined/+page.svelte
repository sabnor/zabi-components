<script lang="ts">
    import RadioGroup from "../../../components/molecules/RadioGroup.svelte";

    /**
     * A RadioGroup bound to state that starts as `undefined`, which its own
     * props documentation names as "no selection", for
     * playwright/hydration-value.spec.ts. Hydrating it used to throw
     * `props_invalid_value`, and a page that throws while it hydrates never
     * becomes interactive: the button below proves that it did.
     */
    const answers = [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
    ];

    let answer = $state<string | undefined>();
    let withDefault = $state<string | undefined>();
    let presses = $state(0);
</script>

<svelte:head>
    <title>Hydration with undefined lab</title>
    <meta name="robots" content="noindex" />
</svelte:head>

<main class="space-y-6 p-4">
    <h1 class="text-lg font-semibold text-headline">Hydration with undefined lab</h1>

    <section data-lab="undefined">
        <RadioGroup legend="Answer" options={answers} bind:value={answer} />
        <output data-testid="undefined-value">{answer ?? "none"}</output>
    </section>

    <section data-lab="default">
        <RadioGroup legend="With a default" options={answers} bind:value={withDefault} defaultValue="no" />
        <output data-testid="default-value">{withDefault ?? "none"}</output>
    </section>

    <button type="button" data-testid="alive" onclick={() => (presses += 1)}>Pressed {presses}</button>
</main>
