<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import { cn } from "../util/cn.js";
    import { displayVoice } from "../util/display-voice.js";

    type StatSize = "sm" | "md" | "lg";

    type Props = Omit<HTMLAttributes<HTMLDivElement>, "class"> & {
        /** The figure, shown as given: the app formats numbers for its locale. */
        value: string | number;
        label?: string;
        /** Drawn after the value, smaller, on the same baseline ("av 19"). */
        unit?: string;
        size?: StatSize;
        align?: "start" | "center" | "end";
        labelPosition?: "below" | "above";
        class?: string;
        /** Replaces `value` for a figure that needs markup. */
        children?: Snippet;
    };

    let {
        value,
        label = "",
        unit = "",
        size = "md",
        align = "start",
        labelPosition = "below",
        class: className = "",
        children,
        ...restProps
    }: Props = $props();

    /** Value 24 / 36 / 48px, unit 14 / 16 / 20px, label 12 / 14 / 14px. */
    const sizeClasses: Record<StatSize, { value: string; unit: string; label: string }> = {
        sm: { value: "text-2xl", unit: "text-sm", label: "text-xs" },
        md: { value: "text-4xl", unit: "text-base", label: "text-sm" },
        lg: { value: "text-5xl", unit: "text-xl", label: "text-sm" },
    };
    const alignClasses = {
        start: "items-start text-start",
        center: "items-center text-center",
        end: "items-end text-end",
    } as const;

    const s = $derived(sizeClasses[size] ?? sizeClasses.md);
    const hostClasses = $derived(
        cn(`flex flex-col gap-1 ${alignClasses[align] ?? alignClasses.start} ${className}`),
    );
</script>

{#snippet figure()}
    <div class="inline-flex items-baseline gap-1 whitespace-nowrap">
        <span class="font-display text-headline tabular-nums leading-none {displayVoice} {s.value}">
            {#if children}{@render children()}{:else}{value}{/if}
        </span>
        {#if unit}
            <span class="text-description font-medium {s.unit}">{unit}</span>
        {/if}
    </div>
{/snippet}

<div class={hostClasses} {...restProps}>
    {#if labelPosition === "above"}
        {#if label}<span class="text-description {s.label}">{label}</span>{/if}
        {@render figure()}
    {:else}
        {@render figure()}
        {#if label}<span class="text-description {s.label}">{label}</span>{/if}
    {/if}
</div>
