<script lang="ts">
    export let title: string;
    export let subtitle: string;
    export let className = "";
</script>

<section class="hero text-center space-y-4 {className}">
    <h2 class="text-3xl font-bold text-text">{title}</h2>
    <p class="text-lg text-text-secondary max-w-2xl mx-auto">
        {subtitle}
    </p>
</section>

<style>
    .hero {
        @apply py-8;
    }
</style>
