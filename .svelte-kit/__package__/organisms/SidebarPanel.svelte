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
            ? "rounded-3xl border border-border bg-card text-headline shadow-md ring-1 ring-border/50"
            : "rounded-3xl border border-border bg-card text-headline shadow-sm";
        return `${resolvedWidthClass} shrink-0 p-5 ${shell} ${className}`.trim();
    });

    function getItemClasses(itemId: string): string {
        const isActive = selectedItemId === itemId;
        const baseClasses =
            "focus-ring focus-ring--nav w-full cursor-pointer rounded-lg px-3 py-2.5 text-left transition-colors duration-150";
        if (isActive) {
            return `${baseClasses} bg-nav-menu-active text-inherit shadow-sm ring-1 ring-border/80`;
        }
        return `${baseClasses} text-nav-menu-item hover:bg-nav-menu-hover hover:text-nav-menu-item-hover active:bg-base-200`;
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
    <div class="mb-5 flex items-start justify-between gap-3">
        <div class="min-w-0 pr-1">
            <h3 class="truncate text-base font-semibold tracking-tight text-headline">
                {title}
            </h3>
            <p class="mt-0.5 text-sm leading-relaxed text-description">{subtitle}</p>
        </div>
        <button
            type="button"
            class="-mr-0.5 -mt-0.5 inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-nav-menu-item transition-colors hover:bg-nav-menu-hover hover:text-nav-menu-item-hover focus-ring focus-ring--nav"
            aria-label={closeLabel}
            onclick={handleClose}
        >
            <X size={18} />
        </button>
    </div>

    {#if showSearch}
        <div class="relative mb-5">
            <span
                class="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-description"
                aria-hidden="true"
            >
                <Search size={17} />
            </span>
            <Input
                type="search"
                bind:value={searchValue}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
                class="w-full min-w-0 min-h-10 rounded-xl border-transparent !bg-transparent py-2 pl-10 text-sm ring-1 ring-border/60 hover:!bg-nav-menu-hover focus:!bg-transparent focus-ring focus-ring--nav"
            />
        </div>
    {/if}

    {#if filteredItems.length > 0}
        <ul class="space-y-1" role="listbox" aria-label={selectLabel}>
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
            class="rounded-xl border border-dashed border-border bg-transparent px-3.5 py-4 ring-1 ring-border/40"
        >
            <h4 class="text-sm font-semibold text-headline">{emptyStateTitle}</h4>
            <p class="mt-1 text-sm leading-relaxed text-description">{emptyStateDescription}</p>
            {#if emptyStateActionLabel.trim() && onEmptyStateAction}
                <button
                    type="button"
                    class="mt-3 inline-flex min-h-10 cursor-pointer items-center rounded-lg bg-action-primary px-3 py-2 text-sm font-medium text-action-primary transition-colors hover:bg-action-primary-hover focus-ring focus-ring--nav"
                    onclick={handleEmptyStateAction}
                >
                    {emptyStateActionLabel.trim()}
                </button>
            {/if}
        </div>
    {/if}
</aside>
