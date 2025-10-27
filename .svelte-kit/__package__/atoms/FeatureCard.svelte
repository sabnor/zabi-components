<script lang="ts">
    import { onMount } from "svelte";

    /**
     * FeatureCard component - SSR-safe implementation
     * @component
     */

    interface Props {
        /** Icon to display */
        icon?: string;
        /** Title of the feature */
        title: string;
        /** Description of the feature */
        description: string;
        /** Additional CSS classes */
        className?: string;
    }

    let {
        icon = "✨",
        title,
        description,
        className = "",
        ...restProps
    }: Props = $props();

    let mounted = $state(false);

    onMount(() => {
        mounted = true;
    });
</script>

{#if mounted}
    <div
        class="p-6 rounded-lg bg-surface-level-0 border border-border hover:border-primary/20 hover:shadow-sm transition-colors duration-200 {className}"
        {...restProps}
    >
        <div class="flex items-start gap-4">
            <div class="shrink-0 text-2xl" aria-hidden="true">
                {icon}
            </div>
            <div class="flex-1 min-w-0">
                <h3 class="text-lg font-semibold text-headline mb-2">
                    {title}
                </h3>
                <p class="text-description leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    </div>
{:else}
    <!-- SSR fallback -->
    <div
        class="p-6 rounded-lg bg-gray-100 border border-gray-300 hover:border-gray-400 hover:shadow-sm transition-colors duration-200 {className}"
        {...restProps}
    >
        <div class="flex items-start gap-4">
            <div class="shrink-0 text-2xl" aria-hidden="true">
                {icon}
            </div>
            <div class="flex-1 min-w-0">
                <h3 class="text-lg font-semibold text-headline mb-2">
                    {title}
                </h3>
                <p class="text-description leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    </div>
{/if}
