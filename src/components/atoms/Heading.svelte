<script lang="ts">
    export let level: 1 | 2 | 3 | 4 | 5 | 6 = 1;
    export let text: string = "";
    export let color: string = "text-text";
    export let spacing: "tight" | "normal" | "loose" = "normal";

    // More explicit and distinct sizing for each level with !important to override any conflicting CSS
    const levelStyles = {
        1: "!text-6xl md:!text-7xl font-bold leading-tight block",
        2: "!text-4xl md:!text-5xl font-bold leading-tight block",
        3: "!text-3xl md:!text-4xl font-semibold leading-snug block",
        4: "!text-2xl md:!text-3xl font-semibold leading-snug block",
        5: "!text-xl md:!text-2xl font-medium leading-normal block",
        6: "!text-lg md:!text-xl font-medium leading-normal block",
    };

    // Spacing classes based on level and spacing prop
    const spacingClasses = {
        tight: {
            1: "mb-2",
            2: "mb-3",
            3: "mb-2",
            4: "mb-2",
            5: "mb-1",
            6: "mb-1",
        },
        normal: {
            1: "mb-4",
            2: "mb-4",
            3: "mb-3",
            4: "mb-3",
            5: "mb-2",
            6: "mb-2",
        },
        loose: {
            1: "mb-6",
            2: "mb-6",
            3: "mb-4",
            4: "mb-4",
            5: "mb-3",
            6: "mb-3",
        },
    };

    $: headingClasses = `${levelStyles[level]} font-title ${color} ${spacingClasses[spacing][level]}`;
</script>

{#if level === 1}
    <h1 class={headingClasses}>
        <slot>{text}</slot>
    </h1>
{:else if level === 2}
    <h2 class={headingClasses}>
        <slot>{text}</slot>
    </h2>
{:else if level === 3}
    <h3 class={headingClasses}>
        <slot>{text}</slot>
    </h3>
{:else if level === 4}
    <h4 class={headingClasses}>
        <slot>{text}</slot>
    </h4>
{:else if level === 5}
    <h5 class={headingClasses}>
        <slot>{text}</slot>
    </h5>
{:else if level === 6}
    <h6 class={headingClasses}>
        <slot>{text}</slot>
    </h6>
{/if}
