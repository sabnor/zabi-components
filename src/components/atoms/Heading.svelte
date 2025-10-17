<script lang="ts">
    let { level = 1, text = "" } = $props<{
        level?: 1 | 2 | 3 | 4 | 5 | 6;
        text?: string;
    }>();
</script>

{#if level === 1}
    <h1 class="text-4xl font-bold text-gray-900">{text}</h1>
{:else if level === 2}
    <h2 class="text-3xl font-bold text-gray-900">{text}</h2>
{:else if level === 3}
    <h3 class="text-2xl font-semibold text-gray-900">{text}</h3>
{:else if level === 4}
    <h4 class="text-xl font-semibold text-gray-900">{text}</h4>
{:else if level === 5}
    <h5 class="text-lg font-medium text-gray-900">{text}</h5>
{:else}
    <h6 class="text-base font-medium text-gray-900">{text}</h6>
{/if}
