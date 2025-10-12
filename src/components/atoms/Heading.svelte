<script lang="ts">
    export let level: 1 | 2 | 3 | 4 | 5 | 6 = 1;
    export let text: string = "";

    // Simple size classes
    $: sizeClasses = {
        1: "text-4xl font-bold",
        2: "text-3xl font-bold",
        3: "text-2xl font-semibold",
        4: "text-xl font-semibold",
        5: "text-lg font-medium",
        6: "text-base font-medium",
    };

    $: headingClasses = ["text-gray-900", sizeClasses[level]].join(" ");
</script>

{#if level === 1}
    <h1 class={headingClasses} {...$$restProps}>{text}<slot /></h1>
{:else if level === 2}
    <h2 class={headingClasses} {...$$restProps}>{text}<slot /></h2>
{:else if level === 3}
    <h3 class={headingClasses} {...$$restProps}>{text}<slot /></h3>
{:else if level === 4}
    <h4 class={headingClasses} {...$$restProps}>{text}<slot /></h4>
{:else if level === 5}
    <h5 class={headingClasses} {...$$restProps}>{text}<slot /></h5>
{:else if level === 6}
    <h6 class={headingClasses} {...$$restProps}>{text}<slot /></h6>
{/if}
