<script lang="ts">
    type Orientation = 'horizontal' | 'vertical';

    interface Props {
        orientation?: Orientation;
        label?: string;
        inset?: boolean;
        class?: string;
        labelClass?: string;
        /** Decorative: omit `role="separator"` so SR does not announce a split. */
        decorative?: boolean;
    }

    let {
        orientation = 'horizontal',
        label,
        inset = false,
        class: className = '',
        labelClass = '',
        decorative = true,
    }: Props = $props();

    const isVertical = $derived(orientation === 'vertical');

    const lineClasses = $derived(
        [
            'bg-border',
            isVertical ? 'h-full w-px flex-1' : 'h-px w-full flex-1',
            inset ? (isVertical ? 'my-2' : 'mx-2') : undefined,
        ]
            .filter(Boolean)
            .join(' '),
    );
</script>

<div
    class={[
        'flex items-center text-description',
        isVertical ? 'h-full min-h-[1rem] flex-col' : 'w-full flex-row',
        className,
    ]
        .filter(Boolean)
        .join(' ')}
>
    <div
        aria-hidden={decorative ? 'true' : undefined}
        role={decorative ? 'presentation' : 'separator'}
        aria-orientation={decorative ? undefined : orientation}
        class={lineClasses}
    ></div>

    {#if label}
        <span
            class={['shrink-0 px-3 text-xs font-medium text-description', labelClass]
                .filter(Boolean)
                .join(' ')}
        >
            {label}
        </span>

        <div
            aria-hidden={decorative ? 'true' : undefined}
            role={decorative ? 'presentation' : 'separator'}
            aria-orientation={decorative ? undefined : orientation}
            class={lineClasses}
        ></div>
    {/if}
</div>
