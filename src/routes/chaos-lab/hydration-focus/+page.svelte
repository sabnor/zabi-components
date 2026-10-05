<script lang="ts">
    import { onMount } from "svelte";
    import Container from "../../../components/atoms/Container.svelte";
    import Collapsible from "../../../components/molecules/Collapsible.svelte";
    import EmptyState from "../../../components/molecules/EmptyState.svelte";
    import AppShell from "../../../components/organisms/AppShell.svelte";

    /**
     * A control inside each component whose root used to be a
     * `<svelte:element>`, for playwright/hydration-focus.spec.ts: the page is
     * server-rendered, the test focuses a control before the scripts arrive,
     * and focus must still be there once the page has hydrated.
     */
    let hydrated = $state(false);
    onMount(() => {
        hydrated = true;
    });
</script>

<svelte:head>
    <title>Hydration focus lab</title>
    <meta name="robots" content="noindex" />
</svelte:head>

<main class="space-y-6 p-4">
    <h1 class="text-lg font-semibold text-headline">Hydration focus lab</h1>
    {#if hydrated}
        <span data-testid="lab-hydrated" aria-hidden="true" hidden></span>
    {/if}

    <EmptyState title="No reports yet" description="Create the first one.">
        {#snippet action()}
            <button type="button" data-testid="in-empty-state">Create report</button>
        {/snippet}
    </EmptyState>

    <EmptyState title="Nothing here" description="Compact, in a card." size="compact">
        {#snippet action()}
            <button type="button" data-testid="in-empty-state-compact">Add one</button>
        {/snippet}
    </EmptyState>

    <Container as="section">
        <button type="button" data-testid="in-container">In a Container</button>
    </Container>

    <Collapsible title="Delivery notes" headingLevel={3}>
        <p>Leave it at the door.</p>
    </Collapsible>

    <!-- Nested in a page of its own, as the docs preview is: `div`, not a second `main`. -->
    <div class="h-64 overflow-hidden border border-border">
        <AppShell contentElement="div">
            <button type="button" data-testid="in-app-shell">In the AppShell content</button>
        </AppShell>
    </div>
</main>
