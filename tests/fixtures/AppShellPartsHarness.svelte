<script lang="ts">
    import AppBar from "../../src/components/molecules/AppBar.svelte";
    import AppShell from "../../src/components/organisms/AppShell.svelte";
    import AppShellHeaderPart from "../../src/components/organisms/AppShellHeaderPart.svelte";

    interface Props {
        /** Whether each of the three parts sticks: the bar, the filters, the tabs. */
        sticky?: [boolean, boolean, boolean];
        largeTitle?: boolean;
    }

    let { sticky = [true, true, true], largeTitle = false }: Props = $props();
</script>

{#snippet header()}
    <AppShellHeaderPart sticky={sticky[0]} data-testid="part-bar">
        <AppBar title="Quiz" {largeTitle} data-testid="bar" />
    </AppShellHeaderPart>
    <AppShellHeaderPart sticky={sticky[1]} data-testid="part-filters">
        <div>Filters</div>
    </AppShellHeaderPart>
    <AppShellHeaderPart sticky={sticky[2]} data-testid="part-tabs">
        <div>Tabs</div>
    </AppShellHeaderPart>
{/snippet}

<AppShell data-testid="shell" {header}>
    <p data-testid="content">Ten questions, one point each.</p>
</AppShell>
