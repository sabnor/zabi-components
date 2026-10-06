<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';

    import { cn } from "../util/cn.js";
    import type { OnFillTone } from "../types/variants.js";
    type Tone = 'body' | 'description' | 'caption' | 'headline' | 'label' | 'error' | OnFillTone;
    type Size = 'xs' | 'sm' | 'md' | 'lg';
    type Weight = 'normal' | 'medium' | 'semibold' | 'bold';

    /** Other attributes (`id`, `data-*`, `aria-*`, ...) land on the element. */
    type Props = Omit<HTMLAttributes<HTMLElement>, 'class'> & {
        as?: 'p' | 'span' | 'div';
        tone?: Tone;
        size?: Size;
        /**
         * Overrides the weight the tone implies — `label` sets `medium`,
         * every other tone sets `normal`.
         */
        weight?: Weight;
        class?: string;
        children?: Snippet;
    };

    let {
        as: Tag = 'p',
        tone = 'body',
        size = 'md',
        weight,
        class: className = '',
        children,
        ...restProps
    }: Props = $props();

    const toneClass: Record<Tone, string> = {
        body: 'text-body',
        description: 'text-description',
        caption: 'text-caption',
        headline: 'text-headline',
        label: 'text-label',
        error: 'text-error',
        inherit: 'text-inherit',
        'on-brand': 'text-on-brand',
        'on-accent': 'text-on-accent',
    };

    /**
     * The bottom of the same ramp `Heading` sits on, so the two components
     * share one scale rather than each carrying its own. `md` matches the
     * metrics of an `h6` (text-base/leading-6) and `lg` those of an `h5`
     * (text-lg/leading-7) — a Text set at that size lands on the same line
     * box as the heading above it. Leading is stated rather than inherited
     * from Tailwind's defaults so the shared steps stay locked together if
     * the type scale is retuned.
     */
    const sizeClass: Record<Size, string> = {
        xs: 'text-xs leading-4',
        sm: 'text-sm leading-5',
        md: 'text-base leading-6',
        lg: 'text-lg leading-7',
    };

    const weightClass: Record<Weight, string> = {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
    };

    /** Labels read as labels by default; callers can still override. */
    const defaultWeight: Weight = $derived(tone === 'label' ? 'medium' : 'normal');
    const resolvedWeight = $derived(weight ?? defaultWeight);
    const classes = $derived(
        cn(toneClass[tone], sizeClass[size], weightClass[resolvedWeight], className),
    );
</script>

<!-- One branch per tag, not a dynamic element: hydration takes a dynamic
element out and puts it back, which blurs a link or a field inside it that the
user had already tabbed to. -->
{#if Tag === 'span'}
    <span class={classes} {...restProps}>{@render children?.()}</span>
{:else if Tag === 'div'}
    <div class={classes} {...restProps}>{@render children?.()}</div>
{:else}
    <p class={classes} {...restProps}>{@render children?.()}</p>
{/if}
