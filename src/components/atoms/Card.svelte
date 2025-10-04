<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let title = "";
    export let subtitle = "";
    export let description = "";
    export let image = "";
    export let variant: "default" | "elevated" = "default";
    export let interactive = false;
    export let className = "";

    const dispatch = createEventDispatcher<{
        click: { event: MouseEvent };
    }>();

    function handleClick(event: CustomEvent) {
        if (interactive) {
            const mouseEvent = event as unknown as MouseEvent;
            dispatch("click", { event: mouseEvent });
        }
    }
</script>

<article
    class="card card-{variant} {interactive ? 'interactive' : ''} {className}"
    on:click={handleClick}
    role={interactive ? "button" : undefined}
    {...interactive ? { tabindex: 0 } : {}}
>
    {#if image}
        <div class="card-image">
            <img src={image} alt={title} />
        </div>
    {/if}

    <div class="card-content">
        {#if title}
            <h3 class="card-title">{title}</h3>
        {/if}

        {#if subtitle}
            <p class="card-subtitle">{subtitle}</p>
        {/if}

        {#if description}
            <p class="card-description">{description}</p>
        {/if}

        <slot />
    </div>
</article>

<style>
    .card {
        @apply bg-card border border-border rounded-lg overflow-hidden;
    }

    .card-elevated {
        @apply bg-card-elevated shadow-adaptive-lg;
    }

    .interactive {
        @apply cursor-pointer transition-all duration-200 hover:shadow-adaptive-md hover:-translate-y-1 hover:bg-card-hover;
    }

    .card-image {
        @apply aspect-video overflow-hidden;
    }

    .card-image img {
        @apply w-full h-full object-cover;
    }

    .card-content {
        @apply p-4 space-y-2;
    }

    .card-title {
        @apply text-lg font-semibold;
        color: rgb(var(--color-text));
    }

    .card-subtitle {
        @apply text-sm font-medium;
        color: rgb(var(--color-text-secondary));
    }

    .card-description {
        @apply text-sm;
        color: rgb(var(--color-text-tertiary));
    }
</style>
