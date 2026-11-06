<script lang="ts">
    import Heart from "@lucide/svelte/icons/heart";
    import Icon from "../../components/atoms/Icon.svelte";

    const sizes = ["xs", "sm", "md", "lg"] as const;
</script>

<div class="flex items-center gap-4">
    {#each sizes as size (size)}
        <Icon icon={Heart} {size} />
    {/each}
    <span class="text-2xl">Text <Icon icon={Heart} size="inherit" class="inline" /></span>
</div>
