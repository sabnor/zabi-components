<script lang="ts">
    import { onMount, tick, type Snippet } from "svelte";
    import type { HTMLInputAttributes } from "svelte/elements";
    import { generateId } from "../util/ssr-safe.js";
    import { cn } from "../util/cn.js";
    import { groupBinding } from "../util/hydration.js";
    import {
        SELECTION_CONTROL_INPUT,
        SELECTION_CONTROL_LABEL_ROW,
        selectionControlRingOverlayClasses,
        selectionControlShellClasses,
        type SelectionControlShape,
    } from "./selection-control.styles";

    type SelectionControlType = "checkbox" | "radio";

    export type SelectionControlMarkProps = {
        checked: boolean;
        loading: boolean;
        disabled: boolean;
    };

    type Props = Omit<
        HTMLInputAttributes,
        "class" | "id" | "name" | "value" | "disabled" | "checked" | "type" | "onchange"
    > & {
        /** Extra classes for the host element. */
        class?: string;
        id?: string;
        type: SelectionControlType;
        shape: SelectionControlShape;
        name?: string;
        value?: string;
        label?: string;
        disabled?: boolean;
        loading?: boolean;
        defaultChecked?: boolean;
        checked?: boolean;
        onChange?: (event: Event) => void;
        onchange?: (event: Event) => void;
        mark?: Snippet<[SelectionControlMarkProps]>;
    };

    let {
        class: className = "",
        id: idProp,
        type,
        shape,
        name = "",
        value = "",
        label = "",
        disabled = false,
        loading = false,
        defaultChecked = false,
        checked = $bindable<Exclude<Props["checked"], undefined>>(),
        onChange,
        onchange,
        mark,
        ...restProps
    }: Props = $props();

    // No fallback on a bindable prop: Svelte refuses `bind:…={undefined}` on
    // one that has a fallback (`props_invalid_value`), and a page that throws
    // while it hydrates never becomes interactive. The default is applied
    // here instead: at once, for the server and the first render, and again
    // whenever a parent hands back `undefined`.
    const applyDefaults = () => {
        if (checked === undefined) checked = defaultChecked;
    };
    applyDefaults();
    $effect.pre(applyDefaults);

    /** Call once per mount — `generateId()` in `$derived` would churn ids every tick. */
    const fallbackId = generateId("selection-control");
    const controlId = $derived(idProp ?? fallbackId);
    const isDisabled = $derived(disabled || loading);

    const labelWrapperClasses = SELECTION_CONTROL_LABEL_ROW;

    const controlContainerClasses = $derived(selectionControlShellClasses(shape));

    const controlRingClasses = $derived(selectionControlRingOverlayClasses(shape));

    let input: HTMLInputElement | undefined = $state();

    /**
     * The input is bound, so a tick made before the page hydrated is kept:
     * Svelte's binding finds the input changed and hands its state over here
     * instead of overwriting it (see util/hydration.ts). A form reset arrives
     * the same way.
     *
     * A choice that is adopted like that came without a `change` event that
     * anything heard, and a parent that only listens (`onchange`, no
     * `bind:checked`) would never learn of it. So while the component
     * settles, a change made through the binding is noted, and reported once
     * with a real `change` event on the input: the callbacks get the event
     * they always get, and a form around the control hears it too.
     */
    let settling = true;
    let adopted = false;

    function take(next: boolean) {
        if (next === !!checked) return;
        checked = next;
        if (settling) adopted = true;
    }

    /** What a single radio's group is bound to: its own value while it is checked. */
    const NOT_CHOSEN = {};
    const radio = groupBinding<unknown>(
        () => (checked ? value : NOT_CHOSEN),
        (chosen) => take(chosen === value),
        () => take(false),
    );

    onMount(() => {
        // The bindings adopt in a microtask of their own, queued before this one.
        void tick().then(() => {
            settling = false;
            if (adopted) input?.dispatchEvent(new Event("change", { bubbles: true }));
        });
    });

    function handleChange(event: Event) {
        if (isDisabled) return;
        // A real change is its own report: nothing is left to tell.
        adopted = false;
        const target = event.target as HTMLInputElement;
        checked = target.checked;
        onChange?.(event);
        onchange?.(event);
    }
</script>

<div class={cn("flex items-center gap-2", className)}>
    <label for={controlId} class={labelWrapperClasses}>
        <span class={controlContainerClasses}>
            <!-- One branch per type: a binding needs a type it can read. -->
            {#if type === "checkbox"}
                <input
                    bind:this={input}
                    type="checkbox"
                    id={controlId}
                    {name}
                    {value}
                    bind:checked={() => !!checked, take}
                    disabled={isDisabled}
                    class={SELECTION_CONTROL_INPUT}
                    aria-busy={loading ? "true" : undefined}
                    onchange={handleChange}
                    {...restProps}
                />
            {:else}
                <input
                    bind:this={input}
                    type="radio"
                    id={controlId}
                    {name}
                    {value}
                    bind:group={radio.value}
                    disabled={isDisabled}
                    class={SELECTION_CONTROL_INPUT}
                    aria-busy={loading ? "true" : undefined}
                    onchange={handleChange}
                    {...restProps}
                />
            {/if}
            <span class={controlRingClasses}></span>
            {#if mark}
                {@render mark({ checked: !!checked, loading, disabled: isDisabled })}
            {/if}
        </span>
        {#if label}
            <span class="text-sm font-medium text-label">
                {label}
            </span>
        {/if}
    </label>
</div>
