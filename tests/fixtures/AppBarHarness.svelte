<script lang="ts">
    import IconButton from "../../src/components/atoms/IconButton.svelte";
    import AppBar from "../../src/components/molecules/AppBar.svelte";

    interface Props {
        title?: string;
        headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
        backHref?: string;
        onback?: (event: MouseEvent) => void;
        backLabel?: string;
        collapseOnScroll?: boolean;
        withActions?: boolean;
        withLeading?: boolean;
        titleLines?: 1 | 2;
        largeTitle?: boolean;
        tone?: "default" | "transparent" | "brand";
        scrollEdge?: "auto" | "always" | "never";
        /** Put the bar in a scrolling box of its own, as AppShell does. */
        inScroller?: boolean;
        class?: string;
    }

    let {
        title = "Round 3",
        headingLevel,
        backHref,
        onback,
        backLabel,
        collapseOnScroll,
        withActions = false,
        withLeading = false,
        titleLines = undefined,
        largeTitle = undefined,
        tone = undefined,
        scrollEdge = undefined,
        inScroller = false,
        class: className,
    }: Props = $props();
</script>

{#snippet bar()}
    <AppBar
        {title}
        {headingLevel}
        {backHref}
        {onback}
        {backLabel}
        {collapseOnScroll}
        {titleLines}
        {largeTitle}
        {tone}
        {scrollEdge}
        class={className}
        data-testid="bar"
        leading={withLeading ? leading : undefined}
        actions={withActions ? actions : undefined}
    />
{/snippet}

{#snippet leading()}
    <span data-testid="leading">Logo</span>
{/snippet}

{#snippet actions()}
    <IconButton variant="ghost" size="lg" label="Search">S</IconButton>
    <IconButton variant="ghost" size="lg" label="Share">H</IconButton>
{/snippet}

{#if inScroller}
    <div data-testid="scroller" style="overflow-y: auto; height: 300px;">
        {@render bar()}
        <button type="button" data-testid="outside">Outside</button>
    </div>
{:else}
    {@render bar()}
    <button type="button" data-testid="outside">Outside</button>
{/if}
