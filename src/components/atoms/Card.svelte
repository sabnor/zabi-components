<script lang="ts">
    export let title: string = "";
    export let image: string = "";
    export let interactive: boolean = false;

    // Simple card classes
    $: cardClasses = [
        "bg-white border border-gray-200 rounded-lg p-4",
        interactive ? "cursor-pointer hover:shadow-md" : "",
    ].join(" ");
</script>

<div class={cardClasses}>
    {#if image}
        <img
            src={image}
            alt={title}
            class="w-full h-48 object-cover rounded-md mb-4"
        />
    {/if}

    {#if title}
        <h3 class="text-lg font-semibold mb-2">{title}</h3>
    {/if}

    <slot />
</div>

