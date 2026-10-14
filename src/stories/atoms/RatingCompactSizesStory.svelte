<script lang="ts">
    import Rating from "../../components/atoms/Rating.svelte";

    const sizes = ["sm", "md", "lg", "xl", "display"] as const;
    const comma = (value: number) => value.toFixed(1).replace(".", ",");
</script>

<div class="flex flex-col items-start gap-3">
    {#each sizes as size (size)}
        <Rating compact {size} value={3.5} formatValue={comma} label={size} hideLabel />
    {/each}
</div>
