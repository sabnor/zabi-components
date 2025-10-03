<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let title = "";
    export let subtitle = "";
    export let description = "";
    export let image = "";
    export let variant: "default" | "elevated" = "default";
    export let interactive = false;
    export let className = "";

    const dispatch = createEventDispatcher();

    function handleClick(event: MouseEvent) {
        if (interactive) {
            dispatch("click", { event });
        }
    }
</script>

<article
    class="card card-{variant} {interactive ? 'interactive' : ''} {className}"
    on:click={(e) => handleClick(e as unknown as MouseEvent)}
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
        @apply bg-white border border-gray-200 rounded-lg overflow-hidden;
    }

    .card-elevated {
        @apply shadow-lg;
    }

    .interactive {
        @apply cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-1;
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
        @apply text-lg font-semibold text-gray-900;
    }

    .card-subtitle {
        @apply text-sm font-medium text-gray-600;
    }

    .card-description {
        @apply text-sm text-gray-500;
    }
</style>
