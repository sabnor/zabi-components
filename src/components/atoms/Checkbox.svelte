<script lang="ts">
    import SelectionControl from "./SelectionControl.svelte";
    import type { SelectionControlMarkProps } from "./SelectionControl.svelte";

    interface Props {
        /** Extra classes for the host element. */
        class?: string;
        id?: string;
        name?: string;
        value?: string;
        disabled?: boolean;
        loading?: boolean;
        label?: string;
        defaultChecked?: boolean;
        checked?: boolean;
        onChange?: (event: Event) => void;
        onchange?: (event: Event) => void;
    }

    let {
        class: className = "",
        id,
        value = "",
        name = "",
        disabled = false,
        loading = false,
        label = "",
        defaultChecked = false,
        checked = $bindable(defaultChecked),
        onChange,
        onchange,
        ...restProps
    }: Props = $props();
</script>

{#snippet mark(props: SelectionControlMarkProps)}
    <!-- While loading the ring stands in for the tick, so the two never overlap;
         the fill still says whether the box is checked. The ring is only in the
         DOM while busy, which is what lets it take Spinner's reduced-motion
         pulse: a pulse animates opacity and would un-hide a ring that was
         merely transparent. It is drawn in the text colour so the gap in it
         survives: a hand-written border colour class repaints all four sides. -->
    {#if props.loading}
        <span
            class="pointer-events-none absolute z-10 inline-block size-3 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-pulse {props.checked
                ? 'text-action-primary'
                : 'text-brand-500'}"
            aria-hidden="true"
        ></span>
    {:else}
        <svg
            class="absolute w-3 h-3 text-action-primary pointer-events-none z-10 opacity-0 group-has-checked/control:opacity-100"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.5"
                d="M5 13l4 4L19 7"
            />
        </svg>
    {/if}
{/snippet}

<SelectionControl
    type="checkbox"
    shape="square"
    {id}
    {name}
    {value}
    {label}
    {disabled}
    {loading}
    bind:checked
    {defaultChecked}
    {onChange}
    {onchange}
    {mark}
    class={className}
    {...restProps}
/>
