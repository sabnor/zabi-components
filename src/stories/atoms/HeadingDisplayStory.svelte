<script lang="ts">
    import Heading from "../../components/atoms/Heading.svelte";

    /**
     * `levels`: the six heading levels. `display`: the same in the display
     * variant. `ownFace`: the display tokens set on the wrapper, as an app
     * would set them on any ancestor.
     */
    let { mode = "display" }: { mode?: "levels" | "display" | "ownFace" } = $props();

    const levels = [1, 2, 3, 4, 5, 6] as const;
</script>

{#if mode === "ownFace"}
    <div style="--font-family-display: Georgia, serif; --zabi-display-weight: 400;">
        <Heading level={1} variant="display" text="Ett annat typsnitt" />
    </div>
{:else if mode === "levels"}
    <div class="flex flex-col gap-4">
        {#each levels as level (level)}
            <Heading {level} text={`Heading ${level} - ${level < 3 ? "Bold" : "Medium"}`} />
        {/each}
    </div>
{:else}
    <div class="flex flex-col gap-4">
        {#each levels as level (level)}
            <Heading {level} variant="display" text={`Display ${level}`} />
        {/each}
    </div>
{/if}
