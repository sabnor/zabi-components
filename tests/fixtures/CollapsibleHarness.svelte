<script lang="ts">
    import Collapsible from "../../src/components/molecules/Collapsible.svelte";
    import type { CollapsibleHeadingLevel } from "../../src/components/util/collapsible.js";

    interface Props {
        initialOpen?: boolean;
        onopenchange?: (open: boolean) => void;
        disabled?: boolean;
        /** Renders the consumer's own header through the `trigger` snippet. */
        custom?: boolean;
        headingLevel?: CollapsibleHeadingLevel;
        unmountOnClose?: boolean;
        region?: boolean;
    }

    let {
        initialOpen = false,
        onopenchange,
        disabled = false,
        custom = false,
        headingLevel,
        unmountOnClose = false,
        region,
    }: Props = $props();

    // svelte-ignore state_referenced_locally
    let open = $state(initialOpen);
</script>

{#snippet content()}
    <label>
        Note
        <input data-testid="note" />
    </label>
    <a href="/details">Read more</a>
{/snippet}

{#if custom}
    <Collapsible
        bind:open
        {onopenchange}
        {disabled}
        {unmountOnClose}
        {region}
        data-testid="host"
    >
        {#snippet trigger(props, state)}
            <div data-testid="header">
                <h3>Billing</h3>
                <button {...props} aria-label="Toggle billing">
                    {state.open ? "Hide" : "Show"}
                </button>
                <button type="button">Edit</button>
            </div>
        {/snippet}
        {@render content()}
    </Collapsible>
{:else}
    <Collapsible
        bind:open
        title="Billing"
        {onopenchange}
        {disabled}
        {headingLevel}
        {unmountOnClose}
        {region}
        data-testid="host"
    >
        {@render content()}
    </Collapsible>
{/if}

<button type="button" onclick={() => (open = !open)}>Outside toggle</button>
<p data-testid="state">{open ? "open" : "closed"}</p>
