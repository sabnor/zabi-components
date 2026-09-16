<script lang="ts">
    import type { Snippet } from 'svelte';

    type Tone = 'body' | 'description' | 'caption' | 'headline' | 'label' | 'error';
    type Size = 'xs' | 'sm' | 'md' | 'lg';
    type Weight = 'normal' | 'medium' | 'semibold' | 'bold';

    interface Props {
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
    }

    let {
        as: Tag = 'p',
        tone = 'body',
        size = 'md',
        weight,
        class: className = '',
        children,
    }: Props = $props();

    const toneClass: Record<Tone, string> = {
        body: 'text-body',
        description: 'text-description',
        caption: 'text-caption',
        headline: 'text-headline',
        label: 'text-label',
        error: 'text-error',
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
</script>

<svelte:element
    this={Tag}
    class={[toneClass[tone], sizeClass[size], weightClass[resolvedWeight], className]
        .filter(Boolean)
        .join(' ')}
>
    {#if children}
        {@render children()}
    {/if}
</svelte:element>
