<script lang="ts">
    /**
     * FeatureCard component - SSR-safe implementation
     * @component
     */

    // Props
    /** Icon to display */
    export let icon: string = "✨";
    /** Title of the feature */
    export let title: string;
    /** Description of the feature */
    export let description: string;
    /** Additional CSS classes */
    export let className: string = "";
</script>

<div
    class="feature-card p-6 rounded-lg bg-surface border border-border hover:border-primary/20 transition-colors duration-200 {className}"
>
    <div class="flex items-start gap-4">
        <div class="flex-shrink-0 text-2xl" aria-hidden="true">
            {icon}
        </div>
        <div class="flex-1 min-w-0">
            <h3 class="text-lg font-semibold text-text mb-2">
                {title}
            </h3>
            <p class="text-text-secondary leading-relaxed">
                {description}
            </p>
        </div>
    </div>
</div>

<style>
    .feature-card {
        @apply hover:shadow-sm;
    }
</style>
