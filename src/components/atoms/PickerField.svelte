<script lang="ts">
    import ChevronDown from "@lucide/svelte/icons/chevron-down";
    import type { Snippet } from "svelte";
    import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";
    import { cn } from "../util/cn.js";
    import { fieldDescribedBy, fieldMessageState } from "../util/field.js";
    import { FIELD_CONTROL_TRIGGER, fieldControlEdge, fieldControlSize } from "../util/field-control.js";
    import { generateId } from "../util/ssr-safe.js";
    import FieldMessages from "./FieldMessages.svelte";

    /**
     * A field-shaped trigger that opens whatever the app gives it, usually its
     * own BottomSheet: the app owns the list, the search and the value. It
     * looks like a Select of the same `size` and is one control: a `<button>`
     * (a link with `href`) named by its label and its current value.
     *
     * Other attributes (`data-*`, `aria-*`, `onfocus`, ...) land on that
     * element. The component does not open anything: `onclick` does, and the
     * app sets `expanded` while its sheet is open.
     */
    type Props = Omit<
        HTMLButtonAttributes,
        | "class"
        | "value"
        | "name"
        | "disabled"
        | "type"
        | "onclick"
        | "aria-describedby"
        | "aria-haspopup"
        | "aria-expanded"
        | "aria-controls"
        | "children"
    > & {
        /** Extra classes for the host element. */
        class?: string;
        /** Id of the control. Omit to auto-generate. */
        id?: string;
        /** The label above the field. It is part of the control's name. */
        label?: string;
        /** The text of what is chosen. It is display text; `formValue` is what a form sends. */
        value?: string;
        /** Shown in the placeholder colour while there is no `value`. */
        placeholder?: string;
        /** An icon or an avatar before the text. */
        leading?: Snippet;
        /** Replaces the chevron at the end: a calendar or a clock, say. It is decoration, so it should be `aria-hidden`. */
        trailing?: Snippet;
        /** Replaces the value text, for rich content. The control is still named by `value`, so give that too. */
        children?: Snippet;
        size?: "sm" | "md" | "lg";
        disabled?: boolean;
        /** Status text under the field. Shown with a `success`, `warning` or `error` variant; for neutral help, use `hint`. */
        message?: string;
        variant?: "default" | "success" | "warning" | "error";
        /** Help text under the field, read out with it. */
        hint?: string;
        /**
         * An error under the field, announced. A button cannot take
         * `aria-invalid`, so the error is the error edge colour and the
         * described-by message; it wins over `variant` and `message`.
         */
        error?: string;
        /** What the control opens: `aria-haspopup`. Default `"dialog"`. Not put on a link. */
        haspopup?: "dialog" | "listbox" | "menu" | "true";
        /** Whether what it opens is open now: `aria-expanded`, and the chevron turns. Leave it out and neither is set. Not put on a link. */
        expanded?: boolean;
        /** Id of what it opens: `aria-controls`. */
        controls?: string;
        /** Makes the control a link to this address, which works without scripts: a page that does the picking. With scripts, `onclick` may call `preventDefault()` and open a sheet instead. */
        href?: string;
        /** With `href`: where the link opens. */
        target?: HTMLAnchorAttributes["target"];
        /** With `href`: the link's relationship, such as `noopener`. */
        rel?: HTMLAnchorAttributes["rel"];
        /** The name a hidden input submits `formValue` under. Without it there is no hidden input. */
        name?: string;
        /** What the form submits for the choice, such as an id. */
        formValue?: string;
        /** The inner `<button>` (or `<a>`). Bindable: the app focuses it when its sheet closes, so a keyboard user is back where they were. */
        element?: HTMLButtonElement | HTMLAnchorElement | null;
        /** Ids of other elements that describe the field. The hint and the message are added after them. */
        "aria-describedby"?: string | null;
        onclick?: (event: MouseEvent) => void;
    };

    let {
        class: className = "",
        id: idProp,
        label = "",
        value = "",
        placeholder = "",
        leading,
        trailing,
        children,
        size = "md",
        disabled = false,
        variant = "default",
        message = "",
        hint = "",
        error = "",
        haspopup = "dialog",
        expanded,
        controls,
        href,
        target,
        rel,
        name = "",
        formValue = "",
        element = $bindable(),
        "aria-describedby": describedBy,
        onclick,
        ...restProps
    }: Props = $props();

    const fallbackId = generateId("picker-field");
    const fieldId = $derived(idProp ?? fallbackId);
    const labelId = $derived(`${fieldId}-label`);
    const valueId = $derived(`${fieldId}-value`);

    const isLink = $derived(href !== undefined && href !== null);
    const status = $derived(fieldMessageState({ variant, message, hint, error }));
    const isEmpty = $derived(value === "");
    const sizeClass = $derived(fieldControlSize(size));

    const controlClasses = $derived(
        cn(
            FIELD_CONTROL_TRIGGER,
            sizeClass.box,
            sizeClass.text,
            fieldControlEdge(status.variant),
            // `disabled:` does not match an `<a>`: a disabled link wears the pair itself.
            isLink && disabled && "cursor-not-allowed border-input-border bg-input-disabled text-action-disabled-text hover:bg-input-disabled active:bg-input-disabled",
        ),
    );

    /**
     * The name is the label and the value (the placeholder while there is
     * none), as a Select's is. Without a label the content names it. A
     * caller's own `aria-label` or `aria-labelledby` wins.
     */
    const labelledBy = $derived(label ? `${labelId} ${valueId}` : undefined);

    /** A disabled link has no `href`, but a pointer can still press it. */
    function handleLinkClick(event: MouseEvent) {
        if (disabled) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        onclick?.(event);
    }
</script>

{#snippet content()}
    {#if leading}
        <span class="flex shrink-0 items-center" data-picker-field-leading>{@render leading()}</span>
    {/if}
    <!-- A value has no colour class of its own, and a disabled control none
    at all: the control's `text-body` and its disabled colour are inherited
    (a colour class here beat the disabled one in Select). -->
    <span
        id={valueId}
        class={cn("min-w-0 flex-1 truncate text-start", isEmpty && !disabled && !children && "text-input-placeholder")}
    >
        {#if children}
            {@render children()}
        {:else}
            {isEmpty ? placeholder : value}
        {/if}
    </span>
    {#if trailing}
        <span class="flex shrink-0 items-center text-description" data-picker-field-trailing>{@render trailing()}</span>
    {:else}
        <ChevronDown
            size={20}
            class={cn(
                "shrink-0 text-description transition-transform duration-(--duration-moderate) motion-reduce:transition-none",
                expanded && "rotate-180",
            )}
            aria-hidden="true"
        />
    {/if}
{/snippet}

<div class={cn("w-full min-w-0", className)}>
    {#if label}
        {#if isLink}
            <!-- A link cannot be a label's control. -->
            <span id={labelId} class="mb-2 block text-sm font-medium text-label">{label}</span>
        {:else}
            <label id={labelId} for={fieldId} class="mb-2 block text-sm font-medium text-label">{label}</label>
        {/if}
    {/if}

    {#if isLink}
        <!-- With `href` the control is a link with its role left native, and
        no `aria-haspopup` or `aria-expanded`: it goes to a page. Disabled, it
        has no `href` and says it is unavailable, as a disabled Button link. -->
        <a
            bind:this={element}
            id={fieldId}
            href={disabled ? undefined : href}
            {target}
            {rel}
            class={controlClasses}
            role={disabled ? "link" : undefined}
            aria-disabled={disabled ? "true" : undefined}
            aria-labelledby={labelledBy}
            aria-describedby={fieldDescribedBy(fieldId, status, describedBy)}
            {...(restProps as unknown as HTMLAnchorAttributes)}
            onclick={handleLinkClick}
        >
            {@render content()}
        </a>
    {:else}
        <button
            bind:this={element}
            type="button"
            id={fieldId}
            {disabled}
            class={controlClasses}
            aria-haspopup={haspopup}
            aria-expanded={expanded}
            aria-controls={controls}
            aria-labelledby={labelledBy}
            aria-describedby={fieldDescribedBy(fieldId, status, describedBy)}
            {...restProps}
            {onclick}
        >
            {@render content()}
        </button>
    {/if}

    {#if name}
        <input type="hidden" {name} value={formValue} {disabled} />
    {/if}
    <FieldMessages {fieldId} {status} {hint} gap="mt-1" messageClass="w-full" />
</div>
