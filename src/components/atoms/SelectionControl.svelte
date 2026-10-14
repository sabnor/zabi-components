<script lang="ts">
    import { onMount, tick, type Snippet } from "svelte";
    import type { HTMLInputAttributes } from "svelte/elements";
    import { generateId } from "../util/ssr-safe.js";
    import { cn } from "../util/cn.js";
    import { groupBinding } from "../util/hydration.js";
    import { fieldDescribedBy, fieldMessageState } from "../util/field.js";
    import type { SemanticVariant } from "../types/variants.js";
    import FieldMessages from "./FieldMessages.svelte";
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
        /**
         * Drawn inside the one label, between the control and the label text,
         * as decoration for the name `label` already gives. A leading image
         * should have an empty alt: the label names the row.
         */
        leading?: Snippet;
        /**
         * A line under the label, tied to the input with `aria-describedby`.
         * It is not part of the name: the label names the control.
         */
        description?: string;
        /**
         * What a screen reader says for the description, when the drawn line
         * is in short forms ("tis, ons" for "tisdagar och onsdagar"). It
         * takes the drawn line's place in `aria-describedby`; it is not drawn.
         */
        descriptionSpoken?: string;
        /**
         * Where the control sits in the row. `end` puts it after the leading,
         * the label and the description, at the far edge; the row is still
         * one label and fills the width it is given.
         */
        controlPosition?: "start" | "end";
        variant?: SemanticVariant;
        /** Status text under the control. Shown with a `success`, `warning` or `error` variant; for neutral help, use `hint`. */
        message?: string;
        /** Help text under the control, read out with it. */
        hint?: string;
        /** An error under the control. It marks the input invalid and is announced; it wins over `variant` and `message`. */
        error?: string;
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
        leading,
        description,
        descriptionSpoken,
        controlPosition = "start",
        variant = "default",
        message = "",
        hint = "",
        error = "",
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

    const descriptionId = $derived(`${controlId}-description`);
    const status = $derived(fieldMessageState({ variant, message, hint, error }));
    const hasFieldText = $derived(status.showMessage || status.showHint);
    // The caller's ids, then the description, the hint and the message.
    const describedBy = $derived(
        fieldDescribedBy(
            controlId,
            status,
            [restProps["aria-describedby"], description ? descriptionId : undefined]
                .filter(Boolean)
                .join(" "),
        ),
    );
    // `aria-invalid` is not supported by the radio role: a radio's error is said by its description.
    const invalid = $derived(status.variant === "error" ? "true" : undefined);

    // With a description the row is two lines: the box sits at the top, as in RadioGroup.
    // At the end the control is moved by `order`, so the markup and what a
    // screen reader meets first are the same in both positions.
    const controlAtEnd = $derived(controlPosition === "end");
    const labelWrapperClasses = $derived(
        cn(SELECTION_CONTROL_LABEL_ROW, description && "items-start", controlAtEnd && "min-w-0 flex-1"),
    );

    const controlContainerClasses = $derived(
        cn(selectionControlShellClasses(shape), description && "mt-0.5", controlAtEnd && "order-last"),
    );
    const labelTextClasses = $derived(controlAtEnd ? "min-w-0 flex-1" : "");

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

{#snippet row()}
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
                    aria-describedby={describedBy}
                    aria-invalid={invalid ?? restProps["aria-invalid"]}
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
                    aria-describedby={describedBy}
                />
            {/if}
            <span class={controlRingClasses}></span>
            {#if mark}
                {@render mark({ checked: !!checked, loading, disabled: isDisabled })}
            {/if}
        </span>
        {#if leading}
            <span class="inline-flex shrink-0 items-center">
                {@render leading()}
            </span>
        {/if}
        {#if description}
            <span class={cn("flex flex-col gap-1", labelTextClasses)}>
                <span class="text-sm font-medium text-label">
                    {label}
                </span>
                <!-- aria-hidden keeps it out of the name; aria-describedby still reads it,
                     or reads the spoken words in its place. -->
                <span id={descriptionSpoken ? undefined : descriptionId} class="text-sm text-description" aria-hidden="true">
                    {description}
                </span>
                {#if descriptionSpoken}
                    <span id={descriptionId} hidden>{descriptionSpoken}</span>
                {/if}
            </span>
        {:else if label}
            <span class={cn("text-sm font-medium text-label", labelTextClasses)}>
                {label}
            </span>
        {/if}
    </label>
{/snippet}

{#if hasFieldText}
    <div class={cn("flex flex-col", className)}>
        <div class="flex items-center gap-2">
            {@render row()}
        </div>
        <!-- Under the label text: the box is 20px and the gap 8px. With the box at the end, from the row's edge. -->
        <div class={controlAtEnd ? "" : "ps-7"}>
            <FieldMessages fieldId={controlId} {status} {hint} gap="mt-1" />
        </div>
    </div>
{:else}
    <div class={cn("flex items-center gap-2", className)}>
        {@render row()}
    </div>
{/if}
