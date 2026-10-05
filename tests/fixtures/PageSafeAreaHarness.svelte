<script lang="ts">
    import Page from "../../src/components/molecules/Page.svelte";
    import AppShell from "../../src/components/organisms/AppShell.svelte";

    interface Props {
        inShell?: boolean;
        safeArea?: boolean;
        class?: string;
    }

    let { inShell = false, safeArea, class: className }: Props = $props();
</script>

{#if inShell}
    <AppShell contentElement="div">
        <div data-testid="host">
            <Page {safeArea} class={className}><p>Rounds</p></Page>
        </div>
    </AppShell>
{:else}
    <div data-testid="host">
        <Page {safeArea} class={className}><p>Rounds</p></Page>
    </div>
{/if}
