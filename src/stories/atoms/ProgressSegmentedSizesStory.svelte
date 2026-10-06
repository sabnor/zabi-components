<script lang="ts">
    import Progress from "../../components/atoms/Progress.svelte";

    const sizes = ["sm", "md", "lg", "xl"] as const;
</script>

<div class="flex w-80 flex-col gap-6">
    {#each sizes as size (size)}
        <Progress {size} segmented value={4} max={19} label="Round ({size})" />
        <Progress {size} segmented value={3} max={5} label="Steps ({size})" />
    {/each}
</div>
