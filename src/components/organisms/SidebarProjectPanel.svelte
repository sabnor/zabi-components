<script lang="ts">
    import Input from "../atoms/Input.svelte";
    import Badge from "../atoms/Badge.svelte";
    import { Search, X } from "@lucide/svelte";
    import type { Component } from "svelte";

    export interface SidebarProjectPanelItem {
        id: string;
        label: string;
        icon?: Component<{ size?: number; class?: string }>;
        description?: string;
        badgeText?: string;
    }

    interface Props {
        className?: string;
        widthClass?: string;
        ariaLabel?: string;
        title?: string;
        subtitle?: string;
        showSearch?: boolean;
        searchPlaceholder?: string;
        searchValue?: string;
        items?: SidebarProjectPanelItem[];
        selectedItemId?: string;
        emptyStateTitle?: string;
        emptyStateDescription?: string;
        selectLabel?: string;
        closeLabel?: string;
        onSelect?: (item: SidebarProjectPanelItem) => void;
        onClose?: () => void;
    }

    let {
        className = "",
        widthClass = "w-80",
        ariaLabel = "Project picker panel",
        title = "Projects",
        subtitle = "Choose a project to continue",
        showSearch = true,
        searchPlaceholder = "Search projects...",
        searchValue = $bindable(""),
        items = [],
        selectedItemId = $bindable(""),
        emptyStateTitle = "No projects found",
        emptyStateDescription = "Try a different keyword or create a new project.",
        selectLabel = "Select project",
        closeLabel = "Close panel",
        onSelect,
        onClose,
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

    const containerClasses = $derived.by(() => {
        const resolvedWidthClass = widthClass.trim() || "w-80";
        return `${resolvedWidthClass} shrink-0 rounded-2xl border border-border bg-background p-4 ${className}`.trim();
    });

    function getItemClasses(itemId: string): string {
        const isActive = selectedItemId === itemId;
        const baseClasses =
            "w-full cursor-pointer rounded-xl px-3 py-3 text-left transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-0";
        if (isActive) {
            return `${baseClasses} bg-action-primary-subtle text-headline`;
        }
        return `${baseClasses} hover:bg-base-50 text-description`;
    }

    function handleSelect(item: SidebarProjectPanelItem): void {
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
</script>

<aside class={containerClasses} aria-label={ariaLabel} {...restProps}>
    <div class="mb-4 flex items-start justify-between gap-3">
        <div class="min-w-0">
            <h3 class="truncate text-base font-semibold text-headline">{title}</h3>
            <p class="mt-1 text-sm text-description">{subtitle}</p>
        </div>
        <button
            type="button"
            class="inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-description hover:bg-base-50 hover:text-headline focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-0"
            aria-label={closeLabel}
            onclick={handleClose}
        >
            <X size={16} />
        </button>
    </div>

    {#if showSearch}
        <div class="relative mb-3">
            <span
                class="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-description"
                aria-hidden="true"
            >
                <Search size={18} />
            </span>
            <Input
                type="search"
                bind:value={searchValue}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
                class="w-full min-w-0 rounded-xl pl-11"
            />
        </div>
    {/if}

    {#if filteredItems.length > 0}
        <ul class="space-y-2" aria-label={selectLabel}>
            {#each filteredItems as item (item.id)}
                <li>
                    <button
                        type="button"
                        class={getItemClasses(item.id)}
                        onclick={() => handleSelect(item)}
                        aria-pressed={selectedItemId === item.id}
                    >
                        <span class="flex items-center justify-between gap-3">
                            <span class="flex min-w-0 items-start gap-2">
                                {#if item.icon}
                                    {@const Icon = item.icon}
                                    <span
                                        class="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center text-current"
                                        aria-hidden="true"
                                    >
                                        <Icon size={16} />
                                    </span>
                                {/if}
                                <span class="min-w-0">
                                    <span class="block truncate text-sm font-medium text-current">
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
        <div class="rounded-xl border border-dashed border-border bg-base-50 p-4">
            <h4 class="text-sm font-semibold text-headline">{emptyStateTitle}</h4>
            <p class="mt-1 text-sm text-description">{emptyStateDescription}</p>
        </div>
    {/if}
</aside>
