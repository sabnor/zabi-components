<script lang="ts">
    import ArrowRight from "@lucide/svelte/icons/arrow-right";
    import type { Component, Snippet } from "svelte";
    import ListItemLeading from "./ListItemLeading.svelte";

    export interface ListItemData {
        id: string;
        label: string;
        description?: string;
        href?: string;
        icon?: Component<{ size?: number; class?: string }>;
        /** Leading image; wins over `icon` when both are set. */
        avatar?: string;
        /** `avatar` alt text; `""` if decorative. */
        avatarAlt?: string;
        target?: "_self" | "_blank" | "_parent" | "_top";
        rel?: string;
        disabled?: boolean;
    }

    interface Props {
        item: ListItemData;
        selected?: boolean;
        /** The arrow at the end of a row that can be pressed. A row with nothing to do never has one. */
        showArrow?: boolean;
        /** Shown before the chevron when `showArrow` is true. */
        trailing?: Snippet;
        /**
         * Called when the row is pressed. A row with neither this nor
         * `item.href` has nothing to do: it is plain content, not a button.
         */
        onclick?: (item: ListItemData, event: MouseEvent) => void;
    }

    let {
        item,
        selected = false,
        showArrow = true,
        trailing,
        onclick,
        ...restProps
    }: Props = $props();

    /**
     * A row is a link with `item.href`, a button with `onclick`, and otherwise
     * plain content: it used to be a focusable button with a pointer cursor
     * and an arrow, and nothing happened when it was pressed.
     */
    const interactive = $derived(!!item.href || !!onclick);

    const itemClasses = $derived.by(() => {
        const baseClasses =
            // The container radius, or the one a `.list-group` shell around the list
        // hands down so the row is concentric with it (see app.css).
        "group flex w-full items-center gap-3 rounded-[var(--zabi-list-row-radius,var(--radius-container))] border px-4 py-3 pr-5 text-left transition-all duration-150";
        if (!interactive) {
            const tone = selected ? "bg-action-primary-subtle border-action-primary" : "border-border";
            return `${baseClasses} ${tone} ${item.disabled ? "opacity-50" : ""}`.trim();
        }
        const cursorClasses = item.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer";
        // A selected row keeps its fill under keyboard focus, which the focus
        // ring already shows; the hover tint is for rows with no fill. The two
        // never share an element, and neither does the selected border with
        // `border-border`: beside each other the second of each pair lost.
        //
        // Hover is for a pointer that can hover (the hand-written rule is
        // gated on it, so the tint does not stay on after a tap); the pressed
        // fill is for every pointer, and is what a finger sees.
        const stateClasses = selected
            ? "bg-action-primary-subtle border-action-primary active:bg-action-primary-subtle-active"
            : item.disabled
              ? "border-border"
              : "border-border hover:bg-surface-hover focus-visible:bg-surface-hover active:bg-surface-active";
        return `focus-ring ${baseClasses} ${cursorClasses} ${stateClasses}`.trim();
    });

    const ariaCurrent = $derived(item.href && selected ? "page" : undefined);

    const rel = $derived.by(() => {
        if (item.rel) {
            return item.rel;
        }
        if (item.target === "_blank") {
            return "noopener noreferrer";
        }
        return undefined;
    });

    const handleItemClick = (event: MouseEvent): void => {
        if (item.disabled) {
            event.preventDefault();
            return;
        }
        onclick?.(item, event);
    };
</script>

{#snippet rowContent()}
    {#if item.avatar}
        <ListItemLeading class="rounded-full">
            <img
                src={item.avatar}
                alt={item.avatarAlt ?? ""}
                class="block size-full min-h-0 min-w-0 object-cover"
                loading="lazy"
                decoding="async"
            />
        </ListItemLeading>
    {:else if item.icon}
        <ListItemLeading>
            <span aria-hidden="true">
                <item.icon size={16} />
            </span>
        </ListItemLeading>
    {/if}
    <span class="min-w-0 flex-1">
        <span class="block text-sm font-medium text-headline">{item.label}</span
        >
        {#if item.description}
            <span class="mt-0.5 block text-sm text-description"
                >{item.description}</span
            >
        {/if}
    </span>
    {#if trailing}
        <span class="flex shrink-0 items-center gap-2 text-sm text-description">
            {@render trailing()}
        </span>
    {/if}
    {#if showArrow && interactive}
        <ArrowRight
            size={16}
            class="shrink-0 text-description transition-transform duration-150 group-hover:translate-x-1 group-focus-visible:translate-x-1"
            aria-hidden="true"
        />
    {/if}
{/snippet}

{#if item.href}
    <a
        href={item.href}
        target={item.target}
        {rel}
        aria-current={ariaCurrent}
        aria-disabled={item.disabled ? "true" : undefined}
        tabindex={item.disabled ? -1 : undefined}
        class={itemClasses}
        onclick={handleItemClick}
        {...restProps}
    >
        {@render rowContent()}
    </a>
{:else if onclick}
    <button
        type="button"
        class={itemClasses}
        disabled={item.disabled}
        onclick={handleItemClick}
        {...restProps}
    >
        {@render rowContent()}
    </button>
{:else}
    <!-- A plain row has no role, so `aria-disabled` on it would say nothing
    to anyone: a disabled one is only drawn dimmed. There is nothing in it to
    press, enabled or not. -->
    <div class={itemClasses} {...restProps}>
        {@render rowContent()}
    </div>
{/if}
