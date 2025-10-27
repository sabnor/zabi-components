<script lang="ts">
    interface Props {
        level?: number;
        text: string;
    }

    let { level = 1, text }: Props = $props();

    // Automatic weight and size based on heading level
    const fontWeight = $derived(level <= 2 ? "700" : "500");
    const Tag = $derived(`h${level}`);

    // Size classes for different heading levels
    const sizeClasses = {
        1: "text-4xl",
        2: "text-3xl",
        3: "text-2xl",
        4: "text-xl",
        5: "text-lg",
        6: "text-base",
    };

    const sizeClass = $derived(
        sizeClasses[level as keyof typeof sizeClasses] || "text-base",
    );
</script>

<svelte:element
    this={Tag}
    class="text-headline font-nunito {sizeClass}"
    style="font-weight: {fontWeight};"
>
    {text}
</svelte:element>

<style>
    .font-nunito {
        font-family: "Nunito Sans", ui-sans-serif, system-ui, sans-serif;
    }
</style>
