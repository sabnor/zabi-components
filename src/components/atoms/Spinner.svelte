<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";
    import { cn } from "../util/cn.js";

    type Props = Omit<HTMLAttributes<HTMLSpanElement>, "class"> & {
        /**
         * Diameter, on the scale the built-in loading states use: 12, 14, 16
         * and 20px. For another size pass a `size-*` utility through `class`.
         */
        size?: "xs" | "sm" | "md" | "lg";
        /**
         * What is loading. With a label the spinner is a `status` and the
         * label is read out; without one it is decorative and hidden from
         * assistive technology, for use beside text that already says so.
         */
        label?: string;
        /** Extra classes for the ring: a size, a colour, an opacity. */
        class?: string;
    };

    let {
        size = "md",
        label = "",
        class: className = "",
        ...restProps
    }: Props = $props();

    const SIZES = {
        xs: "size-3",
        sm: "size-3.5",
        md: "size-4",
        lg: "size-5",
    };

    /**
     * The same ring Button, IconButton and Input draw while loading, in the
     * text colour. Rotation is the motion a reduced-motion preference is
     * about, so there the ring stays still and fades in and out instead:
     * something must still show that work is going on.
     */
    const ringClasses = $derived(
        cn(
            "inline-block shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent opacity-80 motion-reduce:animate-pulse",
            SIZES[size],
            className,
        ),
    );
</script>

{#if label}
    <span class="inline-flex shrink-0" role="status" {...restProps}>
        <span class={ringClasses} aria-hidden="true"></span>
        <span class="sr-only">{label}</span>
    </span>
{:else}
    <span class={ringClasses} aria-hidden="true" {...restProps}></span>
{/if}
