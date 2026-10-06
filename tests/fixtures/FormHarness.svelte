<script lang="ts">
    import Button from "../../src/components/atoms/Button.svelte";
    import CardHeader from "../../src/components/atoms/CardHeader.svelte";
    import Heading from "../../src/components/atoms/Heading.svelte";
    import IconButton from "../../src/components/atoms/IconButton.svelte";
    import Input from "../../src/components/atoms/Input.svelte";
    import Text from "../../src/components/atoms/Text.svelte";
    import AppBar from "../../src/components/molecules/AppBar.svelte";
    import EmptyState from "../../src/components/molecules/EmptyState.svelte";

    /** What a test needs composed: snippets, bindings and children cannot be passed as plain props. */
    interface Props {
        show: "slots" | "reveal" | "tags" | "links";
        level?: 1 | 2 | 3 | 4 | 5 | 6;
        size?: "sm" | "md" | "lg";
        loading?: boolean;
        disabled?: boolean;
        onclick?: (event: MouseEvent) => void;
    }

    let { show, level = 2, size = "md", loading = false, disabled = false, onclick }: Props = $props();

    let password = $state("hunter2!");
    let query = $state("quiz");
</script>

{#if show === "slots"}
    <Input label="Search" bind:value={query} {size} {loading}>
        {#snippet leading()}
            <svg data-testid="lead" aria-hidden="true"></svg>
        {/snippet}
        {#snippet trailing()}
            <button type="button" data-testid="trail" onclick={() => (query = "")}>Clear</button>
        {/snippet}
    </Input>
    <output data-testid="value">{query}</output>
{:else if show === "reveal"}
    <Input
        label="Password"
        type="password"
        autocomplete="current-password"
        revealable
        bind:value={password}
        {size}
        {loading}
        {disabled}
    />
    <output data-testid="value">{password}</output>
{:else if show === "tags"}
    <Heading {level} data-testid="heading">Visits <a href="#all">See all</a></Heading>
    <Text data-testid="text-p" id="intro">A paragraph</Text>
    <Text as="span" data-testid="text-span">A span</Text>
    <Text as="div" data-testid="text-div">A div</Text>
    <CardHeader title="Card title" {level} data-testid="card-header" />
    <AppBar title="Bar title" headingLevel={level} />
    <EmptyState title="Empty title" description="Nothing yet." headingLevel={level} />
{:else}
    <Button href="/login" {onclick} {disabled} {loading} {size} data-testid="link">Log in</Button>
    <Button href="/docs" target="_blank" rel="noopener" download="docs.pdf" variant="outline">Docs</Button>
    <p>
        No account? <Button href="/register" variant="link" {disabled}>Create one</Button>
    </p>
    <IconButton href="/settings" label="Settings" {onclick} {disabled} {loading}>
        <svg aria-hidden="true"></svg>
    </IconButton>
    <IconButton href="/pin" label="Pin" pressed={true}><svg aria-hidden="true"></svg></IconButton>
{/if}
