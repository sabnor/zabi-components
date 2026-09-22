<script lang="ts">
    import Tabs from "../../src/components/molecules/Tabs.svelte";

    let activeTab = $state("a");
    const tabs = [
        { id: "a", label: "Alpha" },
        { id: "b", label: "Beta" },
        { id: "c", label: "Gamma", disabled: true },
        { id: "d", label: "Delta" },
    ];
</script>

<Tabs {tabs} bind:activeTab>
    {#snippet children({ activeTab: current })}
        <p>Panel {current}</p>
    {/snippet}
</Tabs>
<p data-testid="bound">{activeTab}</p>
