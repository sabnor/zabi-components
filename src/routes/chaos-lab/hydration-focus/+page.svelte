<script lang="ts">
    import { onMount } from "svelte";
    import CardHeader from "../../../components/atoms/CardHeader.svelte";
    import Container from "../../../components/atoms/Container.svelte";
    import Heading from "../../../components/atoms/Heading.svelte";
    import Text from "../../../components/atoms/Text.svelte";
    import AppBar from "../../../components/molecules/AppBar.svelte";
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

    <Text>
        Forgot it? <a href="#reset" data-testid="in-text">Reset your password</a>
    </Text>

    <Text as="div">
        <label>E-mail <input type="email" data-testid="in-text-div" /></label>
    </Text>

    <Text as="span">
        <a href="#terms" data-testid="in-text-span">Terms</a>
    </Text>

    <Heading level={2}>
        Visits <a href="#all" data-testid="in-heading">See all</a>
    </Heading>

    <CardHeader title="Log in" level={2}>
        <a href="#help" data-testid="in-card-header">Need help?</a>
    </CardHeader>

    <!-- The title is a heading of its own level; the actions sit beside it. -->
    <AppBar title="New visit" headingLevel={2}>
        {#snippet actions()}
            <button type="button" data-testid="in-app-bar">Save</button>
        {/snippet}
    </AppBar>

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
