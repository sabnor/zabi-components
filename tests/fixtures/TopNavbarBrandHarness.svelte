<script lang="ts">
    import TopNavbar from "../../src/components/organisms/TopNavbar.svelte";
    import BrandSwitcher from "../../src/lib/marketing/BrandSwitcher.svelte";

    let { menu }: { menu?: "sheet" | "inline" } = $props();
</script>

<!-- As src/routes/+layout.svelte writes it: no argument to the snippet. -->
<TopNavbar brand="Zabi" items={[{ label: "Docs", href: "/docs" }]} collapseAt="lg" {menu}>
    {#snippet actions()}
        <BrandSwitcher />
    {/snippet}
</TopNavbar>
