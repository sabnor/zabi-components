<script lang="ts">
    import SelectionControl from "./SelectionControl.svelte";
    import type { SelectionControlMarkProps } from "./SelectionControl.svelte";

    interface Props {
        id?: string;
        name?: string;
        value?: string;
        disabled?: boolean;
        /** Shows a spinner in place of the check mark and disables interaction. */
        loading?: boolean;
        label?: string;
        /** Initial checked state for uncontrolled usage. */
        defaultChecked?: boolean;
        /** Controlled checked state (also supports `bind:checked`). */
        checked?: boolean;
        onChange?: (event: Event) => void;
        onchange?: (event: Event) => void;
    }

    let {
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
    <span
        class="pointer-events-none absolute inline-block size-3 shrink-0 animate-spin rounded-full border-2 border-brand-500 border-t-transparent z-10 opacity-0 group-has-[aria-busy=true]/control:opacity-100 group-has-checked/control:border-base-50"
        aria-hidden="true"
    ></span>
    <svg
        class="absolute w-3 h-3 text-base-50 pointer-events-none z-10 opacity-0 group-has-checked/control:opacity-100"
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
    {...restProps}
/>
