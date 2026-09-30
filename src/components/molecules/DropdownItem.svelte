<script lang="ts">
    import { getContext, type Snippet } from "svelte";
    import type { HTMLButtonAttributes } from "svelte/elements";
    import { generateId } from "../util/ssr-safe.js";
    import { cn } from "../util/cn.js";
    import {
        DROPDOWN_CONTEXT_KEY,
        type DropdownContext,
        type DropdownItemIcon,
        type DropdownItemTone,
    } from "../util/dropdown.js";

    type Props = Omit<HTMLButtonAttributes, "class" | "disabled"> & {
        /** The text of the item, and its accessible name. Use `children` for custom content instead. */
        label?: string;
        /** Second line under the label, e.g. why the item is disabled. */
        description?: string;
        /** Rendered before the label, at 16px. Decorative: the label names the item. */
        icon?: DropdownItemIcon;
        /** `danger` for a destructive action such as Delete. */
        tone?: DropdownItemTone;
        /**
         * Rendered as `aria-disabled`, not `disabled`: the item stays focusable,
         * so the arrow keys reach it and its description is read, but a click
         * does nothing.
         */
        disabled?: boolean;
        /** Marks the chosen option of a listbox (`aria-selected`). */
        selected?: boolean;
        /** Extra classes for the item. */
        class?: string;
        /** Replaces `label` as the content. */
        children?: Snippet;
    };

    let {
        label = "",
        description = "",
        icon: Icon,
        tone = "default",
        disabled = false,
        selected = false,
        role,
        class: className = "",
        onclick,
        children,
        ...restProps
    }: Props = $props();

    const dropdown = getContext<DropdownContext | undefined>(DROPDOWN_CONTEXT_KEY);
    // The keyboard model of Dropdown finds items by role, so there is always one.
    const itemRole = $derived(role ?? dropdown?.itemRole ?? "menuitem");

    const labelId = generateId("dropdown-item-label");
    const descriptionId = generateId("dropdown-item-description");

    function handleClick(
        event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement },
    ) {
        if (disabled) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        onclick?.(event);
    }

    const itemClasses = $derived(
        cn(
            "focus-ring flex w-full items-start justify-start gap-2 rounded-control px-3 py-2 text-start text-sm transition-colors focus:outline-none",
            tone === "danger" ? "text-error focus-ring--danger" : "text-body",
            disabled
                ? "cursor-not-allowed"
                : tone === "danger"
                  ? "cursor-pointer hover:bg-action-danger-subtle"
                  : "cursor-pointer hover:bg-surface-overlay-hover",
            className,
        ),
    );
    // The description explains a disabled item, so it is never dimmed with it.
    const dimmed = $derived(disabled ? "opacity-50" : "");
</script>

<button
    type="button"
    role={itemRole}
    aria-selected={itemRole === "option" && selected ? true : undefined}
    aria-disabled={disabled ? "true" : undefined}
    aria-labelledby={description && (label || children) ? labelId : undefined}
    aria-describedby={description ? descriptionId : undefined}
    class={itemClasses}
    onclick={handleClick}
    {...restProps}
>
    {#if Icon}
        <span class="mt-0.5 shrink-0 {dimmed}" aria-hidden="true">
            <Icon size={16} />
        </span>
    {/if}
    <span class="min-w-0 flex-1">
        {#if children}
            <!-- The label when there is a description, so the name is the content alone. -->
            <span id={labelId} class="block {dimmed}">{@render children()}</span>
        {:else}
            <span id={labelId} class="block {dimmed}">{label}</span>
        {/if}
        {#if description}
            <span id={descriptionId} class="mt-0.5 block text-xs text-description">
                {description}
            </span>
        {/if}
    </span>
</button>
