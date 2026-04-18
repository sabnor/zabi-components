<script lang="ts">
    import { ArrowRight } from "@lucide/svelte";
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
        showArrow?: boolean;
        /** Shown before the chevron when `showArrow` is true. */
        trailing?: Snippet;
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
