<script lang="ts">
    import { generateId } from "../../routes/lib/ssr-safe.js";

    interface Props {
        id?: string;
        checked?: boolean;
        name?: string;
        disabled?: boolean;
        /** Shows a spinner in place of the check mark and disables interaction. */
        loading?: boolean;
        label?: string;
        onchange?: (event: Event) => void;
    }

    let {
        id: idProp,
        checked = $bindable(false),
        name = "",
        disabled = false,
        loading = false,
        label = "",
        onchange,
        ...restProps
    }: Props = $props();

    const fallbackId = generateId("checkbox");
    const checkboxId = $derived(idProp ?? fallbackId);
    const isDisabled = $derived(disabled || loading);

    const checkboxBoxClasses = $derived(() => {
        const base =
            "absolute inset-0 rounded transition-all duration-200 border-2";
        if (checked) {
            return `${base} border-brand-500 bg-brand-500 group-hover:bg-brand-600 group-hover:border-brand-600 group-active:scale-95`;
        }
        return `${base} border-base-400 bg-transparent group-hover:border-brand-500 group-hover:bg-brand-50 group-active:scale-95`;
    });

    const checkboxContainerClasses = $derived(() => {
        const base =
            "relative inline-flex items-center justify-center w-5 h-5 rounded transition-all duration-200";
        if (isDisabled) {
            return `${base} opacity-50 cursor-not-allowed`;
        }
        return `${base} cursor-pointer`;
    });

    const labelWrapperClasses = $derived(() => {
        const base =
            "flex items-center gap-2 p-1.5 -m-1.5 rounded-md transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-brand-500 focus-within:ring-offset-2";
        if (isDisabled) {
            return `${base} opacity-50 cursor-not-allowed`;
        }
        return `${base} group cursor-pointer hover:bg-base-100 active:bg-base-200`;
    });

    function handleChange(event: Event) {
        if (isDisabled) return;
        const target = event.target as HTMLInputElement;
        checked = target.checked;
        if (onchange) {
            onchange(event);
        }
    }
</script>

<div class="flex items-center gap-2">
    <label for={checkboxId} class={labelWrapperClasses()}>
        <div class={checkboxContainerClasses()}>
            <input
                type="checkbox"
                id={checkboxId}
                {name}
                {checked}
                disabled={isDisabled}
                class="sr-only"
                aria-busy={loading ? "true" : undefined}
                onchange={handleChange}
                {...restProps}
            />
            <div class={checkboxBoxClasses()}></div>
            {#if loading}
                <span
                    class="pointer-events-none absolute inline-block size-3 shrink-0 animate-spin rounded-full border-2 {checked
                        ? 'border-base-50'
                        : 'border-brand-500'} border-t-transparent z-10"
                    aria-hidden="true"
                ></span>
            {:else if checked}
                <svg
                    class="absolute w-3 h-3 text-base-50 pointer-events-none z-10"
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
        </div>
        {#if label}
            <span class="text-sm font-medium text-label">
                {label}
            </span>
        {/if}
    </label>
</div>
