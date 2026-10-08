<script lang="ts">
    import TopNavbar from "../../src/components/organisms/TopNavbar.svelte";

    interface Props {
        /** The bar's own `nav` snippet in place of `items`. */
        withNav?: boolean;
        [key: string]: unknown;
    }

    let { withNav = false, ...rest }: Props = $props();
</script>

{#if withNav}
    <TopNavbar {...rest}>
        {#snippet nav()}
            <ul data-testid="own-nav">
                <li><a href="/own">Own link</a></li>
            </ul>
        {/snippet}
    </TopNavbar>
{:else}
    <TopNavbar {...rest}>
        {#snippet actions()}
            <a href="/signin" data-testid="signin">Sign in</a>
            <button type="button" data-testid="help">Help</button>
        {/snippet}
    </TopNavbar>
{/if}
