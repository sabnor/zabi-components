<script lang="ts">
    let {
        level = 1,
        text = "",
        className = "",
        children,
        ...restProps
    }: {
        level?: 1 | 2 | 3 | 4 | 5 | 6;
        text?: string;
        className?: string;
        children?: any;
        [key: string]: any;
    } = $props();

    // Size classes based on heading level
    const sizeClasses = {
        1: "text-4xl md:text-5xl font-bold",
        2: "text-3xl md:text-4xl font-bold",
        3: "text-2xl md:text-3xl font-semibold",
        4: "text-xl md:text-2xl font-semibold",
        5: "text-lg md:text-xl font-medium",
        6: "text-base md:text-lg font-medium",
    };

    // Computed classes
    const headingClasses = $derived(
        ["text-gray-900 dark:text-gray-100", sizeClasses[level], className]
            .filter(Boolean)
            .join(" "),
    );
</script>

{#if level === 1}
    <h1 class={headingClasses} {...restProps}>
        {text}
        {#if children}
            {@render children()}
        {/if}
    </h1>
{:else if level === 2}
    <h2 class={headingClasses} {...restProps}>
        {text}
        {#if children}
            {@render children()}
        {/if}
    </h2>
{:else if level === 3}
    <h3 class={headingClasses} {...restProps}>
        {text}
        {#if children}
            {@render children()}
        {/if}
    </h3>
{:else if level === 4}
    <h4 class={headingClasses} {...restProps}>
        {text}
        {#if children}
            {@render children()}
        {/if}
    </h4>
{:else if level === 5}
    <h5 class={headingClasses} {...restProps}>
        {text}
        {#if children}
            {@render children()}
        {/if}
    </h5>
{:else if level === 6}
    <h6 class={headingClasses} {...restProps}>
        {text}
        {#if children}
            {@render children()}
        {/if}
    </h6>
{/if}
