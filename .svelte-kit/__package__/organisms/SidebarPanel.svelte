<script lang="ts">
    import Input from "../atoms/Input.svelte";
    import Badge from "../atoms/Badge.svelte";
    import { Search, X } from "@lucide/svelte";
    import type { Component } from "svelte";

    export interface SidebarPanelItem {
        id: string;
        label: string;
        icon?: Component<{ size?: number; class?: string }>;
        description?: string;
        badgeText?: string;
    }

    interface Props {
        className?: string;
        widthClass?: string;
        /** Match `SidebarNavigation` `layout="card"` surfaces. */
        variant?: "plain" | "elevated";
        ariaLabel?: string;
        title?: string;
        subtitle?: string;
        showSearch?: boolean;
        searchPlaceholder?: string;
        searchValue?: string;
        items?: SidebarPanelItem[];
        selectedItemId?: string;
        emptyStateTitle?: string;
        emptyStateDescription?: string;
        emptyStateActionLabel?: string;
        selectLabel?: string;
        closeLabel?: string;
        onSelect?: (item: SidebarPanelItem) => void;
        onClose?: () => void;
        onEmptyStateAction?: () => void;
    }

    let {
        className = "",
        widthClass = "w-80",
        variant = "elevated",
        ariaLabel = "Picker panel",
        title = "Items",
        subtitle = "Choose an item to continue",
        showSearch = true,
        searchPlaceholder = "Search...",
        searchValue = $bindable(""),
        items = [],
        selectedItemId = $bindable(""),
        emptyStateTitle = "No matches",
        emptyStateDescription = "Try a different keyword.",
        emptyStateActionLabel = "",
        selectLabel = "Select item",
        closeLabel = "Close panel",
        onSelect,
        onClose,
        onEmptyStateAction,
        ...restProps
    }: Props = $props();

    const normalizedSearchTerm = $derived(searchValue.trim().toLowerCase());
    const filteredItems = $derived(
        normalizedSearchTerm
            ? items.filter((item) =>
                  item.label.toLowerCase().includes(normalizedSearchTerm),
              )
            : items,
    );

    const isElevated = $derived(variant === "elevated");

    const containerClasses = $derived.by(() => {
        const resolvedWidthClass = widthClass.trim() || "w-80";
        const shell = isElevated
            ? "rounded-3xl border border-border bg-base-50/95 text-headline shadow-md ring-1 ring-border/50"
            : "rounded-3xl border border-border bg-background text-headline shadow-sm";
        return `${resolvedWidthClass} shrink-0 p-4 ${shell} ${className}`.trim();
    });

    function getItemClasses(itemId: string): string {
        const isActive = selectedItemId === itemId;
        const baseClasses =
            "w-full cursor-pointer rounded-xl px-3 py-3 text-left transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-nav-menu-focus";
        if (isActive) {
            return `${baseClasses} bg-background text-headline shadow-sm ring-1 ring-border`;
        }
        return `${baseClasses} text-description hover:bg-background/75 hover:text-headline`;
    }

    function handleSelect(item: SidebarPanelItem): void {
        selectedItemId = item.id;
        if (onSelect) {
            onSelect(item);
        }
    }

    function handleClose(): void {
        if (onClose) {
            onClose();
        }
    }

    function handleEmptyStateAction(): void {
        if (onEmptyStateAction) {
            onEmptyStateAction();
        }
    }
</script>

<aside class={containerClasses} aria-label={ariaLabel} {...restProps}>
    <div class="mb-4 flex items-start justify-between gap-3">
        <div class="min-w-0">
            <h3 class="truncate text-base font-semibold tracking-tight text-headline">
                {title}
            </h3>
            <p class="mt-1 text-sm text-description">{subtitle}</p>
        </div>
        <button
            type="button"
            class="inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-xl text-description transition-colors hover:bg-background/80 hover:text-headline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nav-menu-focus focus-visible:ring-offset-0"
            aria-label={closeLabel}
            onclick={handleClose}
        >
            <X size={18} />
        </button>
    </div>

    {#if showSearch}
        <div class="relative mb-4">
            <span
                class="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-description"
                aria-hidden="true"
            >
                <Search size={18} />
            </span>
            <Input
                type="search"
                bind:value={searchValue}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
                class="w-full min-w-0 rounded-2xl py-2.5 pl-10 text-sm ring-1 ring-border/60 ring-offset-0 focus:ring-2 focus:ring-nav-menu-focus {isElevated
                    ? 'border-transparent bg-background/90'
                    : 'border-transparent bg-base-50'}"
            />
        </div>
    {/if}

    {#if filteredItems.length > 0}
        <ul class="space-y-1.5" role="listbox" aria-label={selectLabel}>
            {#each filteredItems as item (item.id)}
                <li role="presentation">
                    <button
                        type="button"
                        role="option"
                        class={getItemClasses(item.id)}
                        onclick={() => handleSelect(item)}
                        aria-selected={selectedItemId === item.id}
                    >
                        <span class="flex items-center justify-between gap-3">
                            <span class="flex min-w-0 items-start gap-2.5">
                                {#if item.icon}
                                    {@const Icon = item.icon}
                                    <span
                                        class="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center text-current"
                                        aria-hidden="true"
                                    >
                                        <Icon size={18} />
                                    </span>
                                {/if}
                                <span class="min-w-0">
                                    <span
                                        class="block truncate text-sm font-medium text-current"
                                    >
                                        {item.label}
                                    </span>
                                    {#if item.description}
                                        <span
                                            class="mt-0.5 block truncate text-xs text-description"
                                        >
                                            {item.description}
                                        </span>
                                    {/if}
                                </span>
                            </span>
                            {#if item.badgeText}
                                <Badge text={item.badgeText} size="sm" />
                            {/if}
                        </span>
                    </button>
                </li>
            {/each}
        </ul>
    {:else}
        <div
            class="rounded-2xl border border-dashed border-border bg-background/70 p-4 ring-1 ring-border/40"
        >
            <h4 class="text-sm font-semibold text-headline">{emptyStateTitle}</h4>
            <p class="mt-1 text-sm text-description">{emptyStateDescription}</p>
            {#if emptyStateActionLabel.trim() && onEmptyStateAction}
                <button
                    type="button"
                    class="mt-4 inline-flex min-h-10 cursor-pointer items-center rounded-xl bg-action-primary px-3 py-2 text-sm font-medium text-action-primary outline-none transition-colors hover:bg-action-primary-hover focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-nav-menu-focus"
                    onclick={handleEmptyStateAction}
                >
                    {emptyStateActionLabel.trim()}
                </button>
            {/if}
        </div>
    {/if}
</aside>
