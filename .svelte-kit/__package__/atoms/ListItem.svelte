<script lang="ts">
    import { ArrowRight } from "@lucide/svelte";
    import type { Component, Snippet } from "svelte";
    import ListItemLeading from "./ListItemLeading.svelte";

    export interface ListItemData {
        /** Unique identifier for stable rendering and active-state tracking. */
        id: string;
        /** Primary item label. */
        label: string;
        /** Optional secondary text shown under the label. */
        description?: string;
        /** Optional URL; when set, the item renders as an anchor. */
        href?: string;
        /** Optional Lucide-style icon rendered in the leading column. If both `avatar` and `icon` are set, `avatar` is shown. */
        icon?: Component<{ size?: number; class?: string }>;
        /** Optional avatar image URL for the leading column (takes precedence over `icon`). */
        avatar?: string;
        /** Accessible label for `avatar`; use `""` when the image is decorative. */
        avatarAlt?: string;
        /** Link target, only used when href is provided. */
        target?: "_self" | "_blank" | "_parent" | "_top";
        /** Link rel attribute, only used when href is provided. */
        rel?: string;
        /** Disabled state for the item. */
        disabled?: boolean;
    }

    interface Props {
        /** Item data to render. */
        item: ListItemData;
        /** Active-state styling flag. */
        selected?: boolean;
        /** Whether to show the right-arrow icon. */
        showArrow?: boolean;
        /** Optional trailing region (badges, metadata, auxiliary actions). Renders before the arrow when `showArrow` is true. */
        trailing?: Snippet;
        /** Item click callback. */
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

    const itemClasses = $derived.by(() => {
        const baseClasses =
            "group focus-ring flex w-full items-center gap-3 rounded-xl border border-border px-4 py-3 pr-5 text-left transition-all duration-150";
        const interactiveClasses = item.disabled
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer focus-visible:bg-base-100";
        const selectedClasses = selected
            ? "bg-action-primary-subtle border-brand-500"
            : "";
        return `${baseClasses} ${interactiveClasses} ${selectedClasses}`.trim();
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
    {#if showArrow}
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
{:else}
    <button
        type="button"
        class={itemClasses}
        disabled={item.disabled}
        onclick={handleItemClick}
        {...restProps}
    >
        {@render rowContent()}
    </button>
{/if}
