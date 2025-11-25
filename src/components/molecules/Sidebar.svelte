<script lang="ts">
    import type { Snippet } from "svelte";
    import { onMount, onDestroy } from "svelte";

    interface SidebarItem {
        id: string;
        label: string;
        description?: string;
        icon?: any;
        onClick?: () => void;
    }

    interface SidebarSection {
        title?: string;
        items: SidebarItem[];
    }

    interface Props {
        title?: string;
        sections?: SidebarSection[];
        items?: SidebarItem[];
        selectedItemId?: string;
        selectedSectionId?: string;
        onItemClick?: (item: SidebarItem) => void;
        onSectionClick?: (sectionId: string) => void;
        className?: string;
        header?: Snippet;
        footer?: Snippet;
        isOpen?: boolean;
        onClose?: () => void;
        mobileResponsive?: boolean;
    }

    let {
        title = "",
        sections = [],
        items = [],
        selectedItemId = "",
        selectedSectionId = "",
        onItemClick,
        onSectionClick,
        className = "",
        header,
        footer,
        isOpen = true,
        onClose,
        mobileResponsive = true,
        ...restProps
    }: Props = $props();

    let isMobile = $state(false);
    let sidebarElement = $state<HTMLElement | null>(null);

    function checkMobile() {
        if (mobileResponsive) {
            isMobile = window.innerWidth < 768;
        } else {
            isMobile = false;
        }
    }

    function handleItemClick(item: SidebarItem) {
        if (item.onClick) {
            item.onClick();
        }
        if (onItemClick) {
            onItemClick(item);
        }
        // Close sidebar on mobile when item is clicked
        if (isMobile && onClose) {
            onClose();
        }
    }

    function handleSectionClick(sectionId: string) {
        if (onSectionClick) {
            onSectionClick(sectionId);
        }
    }

    function handleBackdropClick(event: MouseEvent) {
        if (event.target === event.currentTarget && onClose) {
            onClose();
        }
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === "Escape" && isOpen && isMobile && onClose) {
            onClose();
        }
    }

    onMount(() => {
        checkMobile();
        if (mobileResponsive) {
            window.addEventListener("resize", checkMobile);
            return () => window.removeEventListener("resize", checkMobile);
        }
    });

    const hasSections = $derived(sections.length > 0);
    const hasItems = $derived(items.length > 0);
</script>

{#if isMobile && mobileResponsive}
    <!-- Mobile: Overlay and Drawer -->
    {#if isOpen}
        <div
            class="fixed inset-0 bg-overlay z-modal md:hidden"
            onclick={handleBackdropClick}
            onkeydown={handleKeydown}
            role="dialog"
            aria-modal="true"
            aria-label="Sidebar navigation"
            tabindex="-1"
        >
            <aside
                bind:this={sidebarElement}
                class="fixed left-0 top-0 bottom-0 w-64 bg-base-100 border-r border-border p-6 h-full overflow-y-auto transform transition-transform duration-300 ease-in-out {isOpen ? 'translate-x-0' : '-translate-x-full'} {className}"
                role="complementary"
                aria-label="Sidebar navigation"
                onclick={(e) => e.stopPropagation()}
                {...restProps}
            >
                <div class="flex items-center justify-between mb-4 md:hidden">
                    {#if title}
                        <h2 class="text-lg font-semibold text-headline">{title}</h2>
                    {/if}
                    {#if onClose}
                        <button
                            type="button"
                            onclick={onClose}
                            class="text-description hover:text-headline text-2xl cursor-pointer transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-base-50"
                            aria-label="Close sidebar"
                        >
                            ×
                        </button>
                    {/if}
                </div>

                {#if header}
                    <div class="mb-6">
                        {@render header()}
                    </div>
                {:else if title && !isMobile}
                    <h2 class="text-lg font-semibold text-headline mb-4">{title}</h2>
                {/if}

                {#if hasSections}
                    {#each sections as section}
                        {#if section.title}
                            <div class="mb-4">
                                <h3 class="text-sm font-medium text-headline mb-2 uppercase tracking-wide">
                                    {section.title}
                                </h3>
                            </div>
                        {/if}

                        <nav class="space-y-2 mb-8">
                            {#each section.items as item}
                                <button
                                    type="button"
                                    onclick={() => handleItemClick(item)}
                                    class="w-full text-left px-3 py-2 rounded-md transition-colors duration-200 {selectedItemId ===
                                    item.id
                                        ? 'bg-action-primary-subtle text-headline border-l-2 border-action-primary'
                                        : 'text-secondary hover:text-headline hover:bg-base-50'}"
                                    aria-current={selectedItemId === item.id ? "page" : undefined}
                                >
                                    <div class="flex items-center gap-2">
                                        {#if item.icon}
                                            <div class="shrink-0">
                                                <svelte:component this={item.icon} class="h-4 w-4" />
                                            </div>
                                        {/if}
                                        <div class="flex-1">
                                            <div class="font-medium">{item.label}</div>
                                            {#if item.description}
                                                <div class="text-xs text-description">
                                                    {item.description}
                                                </div>
                                            {/if}
                                        </div>
                                    </div>
                                </button>
                            {/each}
                        </nav>
                    {/each}
                {:else if hasItems}
                    <nav class="space-y-1">
                        {#each items as item}
                            <button
                                type="button"
                                onclick={() => handleItemClick(item)}
                                class="w-full text-left px-3 py-2 rounded-md transition-colors duration-200 {selectedItemId ===
                                item.id
                                    ? 'bg-action-primary-subtle text-headline border-l-2 border-action-primary'
                                    : 'text-secondary hover:text-headline hover:bg-base-50'}"
                                aria-current={selectedItemId === item.id ? "page" : undefined}
                            >
                                <div class="flex items-center gap-2">
                                    {#if item.icon}
                                        <div class="shrink-0">
                                            <svelte:component this={item.icon} class="h-4 w-4" />
                                        </div>
                                    {/if}
                                    <div class="flex-1">
                                        <div class="font-medium">{item.label}</div>
                                        {#if item.description}
                                            <div class="text-xs text-description">
                                                {item.description}
                                            </div>
                                        {/if}
                                    </div>
                                </div>
                            </button>
                        {/each}
                    </nav>
                {/if}

                {#if footer}
                    <div class="mt-auto pt-6 border-t border-border">
                        {@render footer()}
                    </div>
                {/if}
            </aside>
        </div>
    {/if}
{:else}
    <!-- Desktop: Always visible sidebar -->
    <aside
        bind:this={sidebarElement}
        class="w-64 bg-base-100 border-r border-border p-6 h-full overflow-y-auto {className}"
        role="complementary"
        aria-label="Sidebar navigation"
        {...restProps}
    >
    {#if header}
        <div class="mb-6">
            {@render header()}
        </div>
    {:else if title}
        <h2 class="text-lg font-semibold text-headline mb-4">{title}</h2>
    {/if}

    {#if hasSections}
        {#each sections as section}
            {#if section.title}
                <div class="mb-4">
                    <h3 class="text-sm font-medium text-headline mb-2 uppercase tracking-wide">
                        {section.title}
                    </h3>
                </div>
            {/if}

            <nav class="space-y-2 mb-8">
                {#each section.items as item}
                    <button
                        type="button"
                        onclick={() => handleItemClick(item)}
                        class="w-full text-left px-3 py-2 rounded-md transition-colors duration-200 {selectedItemId ===
                        item.id
                            ? 'bg-action-primary-subtle text-headline border-l-2 border-action-primary'
                            : 'text-secondary hover:text-headline hover:bg-base-50'}"
                        aria-current={selectedItemId === item.id ? "page" : undefined}
                    >
                        <div class="flex items-center gap-2">
                            {#if item.icon}
                                <div class="shrink-0">
                                    <svelte:component this={item.icon} class="h-4 w-4" />
                                </div>
                            {/if}
                            <div class="flex-1">
                                <div class="font-medium">{item.label}</div>
                                {#if item.description}
                                    <div class="text-xs text-description">
                                        {item.description}
                                    </div>
                                {/if}
                            </div>
                        </div>
                    </button>
                {/each}
            </nav>
        {/each}
    {:else if hasItems}
        <nav class="space-y-1">
            {#each items as item}
                <button
                    type="button"
                    onclick={() => handleItemClick(item)}
                    class="w-full text-left px-3 py-2 rounded-md transition-colors duration-200 {selectedItemId ===
                    item.id
                        ? 'bg-action-primary-subtle text-headline border-l-2 border-action-primary'
                        : 'text-secondary hover:text-headline hover:bg-base-50'}"
                    aria-current={selectedItemId === item.id ? "page" : undefined}
                >
                    <div class="flex items-center gap-2">
                        {#if item.icon}
                            <div class="shrink-0">
                                <svelte:component this={item.icon} class="h-4 w-4" />
                            </div>
                        {/if}
                        <div class="flex-1">
                            <div class="font-medium">{item.label}</div>
                            {#if item.description}
                                <div class="text-xs text-description">
                                    {item.description}
                                </div>
                            {/if}
                        </div>
                    </div>
                </button>
            {/each}
        </nav>
    {/if}

        {#if footer}
            <div class="mt-auto pt-6 border-t border-border">
                {@render footer()}
            </div>
        {/if}
    </aside>
{/if}
