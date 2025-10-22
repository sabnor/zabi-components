<!-- SSR-safe wrapper component for zabi-components -->
<script lang="ts">
    import { onMount } from "svelte";

    interface Props {
        fallback?: any;
        component?: any;
        props?: Record<string, any>;
    }

    let {
        fallback = null,
        component,
        props = {},
        children,
    } = $props<Props & { children?: any }>();

    let mounted = $state(false);

    onMount(() => {
        mounted = true;
    });
</script>

{#if mounted && component}
    {@const Component = component}
    <Component {...props}>
        {@render children?.()}
    </Component>
{:else if fallback}
    {@const FallbackComponent = fallback}
    <FallbackComponent {...props}>
        {@render children?.()}
    </FallbackComponent>
{:else}
    <!-- Fallback content for SSR -->
    <div class="zabi-ssr-fallback">
        {@render children?.()}
    </div>
{/if}

<style>
    .zabi-ssr-fallback {
        /* Minimal styling for SSR fallback */
        display: contents;
    }
</style>
