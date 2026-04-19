<script lang="ts">
    import type { Snippet } from "svelte";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import SidebarNavigation from "../../components/organisms/SidebarNavigation.svelte";
    import type { SidebarNavigationItem } from "../../components/organisms/SidebarNavigation.svelte";
    import type { ComponentMetadata } from "../../types/page.types";
    import { componentsCatalog as components } from "$lib/showcase/components-catalog";
    import { categories } from "$lib/showcase/components-showcase-constants";
    import {
        getDocsCategoryIcon,
        getDocsComponentIcon,
    } from "$lib/showcase/docs-sidebar-helpers";

    interface PageDataShape {
        component?: ComponentMetadata;
    }

    type ShowcaseCatalog = ComponentMetadata["category"] | "all";

    interface Props {
        children: Snippet;
    }

    let { children }: Props = $props();

    let sidebarOpen = $state(false);
    let componentsNavSearch = $state("");

    const selectedCategory = $derived.by((): ShowcaseCatalog => {
        if ($page.url.searchParams.get("catalog") === "all") {
            return "all";
        }
        return (
            ($page.data as PageDataShape | undefined)?.component
                ?.category ?? "atoms"
        );
    });

    const catalogQuerySuffix = $derived(
        $page.url.searchParams.get("catalog") === "all" ? "?catalog=all" : "",
    );

    const currentComponents = $derived.by(() => {
        if (selectedCategory === "all") {
            return [
                ...components.atoms,
                ...components.molecules,
                ...components.organisms,
            ];
        }
        return components[selectedCategory] || [];
    });

    const docsSidebarCurrentPath = $derived(
        `${$page.url.pathname}${$page.url.search}`,
    );

    const docsSidebarItems = $derived.by((): SidebarNavigationItem[] => {
        const categoryItems: SidebarNavigationItem[] = categories.map(
            (category) => ({
                id: `category-${category.id}`,
                label: category.label,
                href: `category:${category.id}`,
                icon: getDocsCategoryIcon(category.id),
                badgeText:
                    category.id === "all"
                        ? components.atoms.length +
                          components.molecules.length +
                          components.organisms.length
                        : components[category.id]?.length,
                group: "primary",
            }),
        );

        const componentItems: SidebarNavigationItem[] = currentComponents.map(
            (component: ComponentMetadata) => ({
                id: `component-${component.name.toLowerCase()}`,
                label: component.name,
                href: `/components/${component.name}${catalogQuerySuffix}`,
                icon: getDocsComponentIcon(component.name, component.category),
                group: "secondary",
            }),
        );

        return [...categoryItems, ...componentItems];
    });

    function firstInCategory(categoryId: string): ComponentMetadata | undefined {
        if (categoryId === "all") {
            return [
                ...components.atoms,
                ...components.molecules,
                ...components.organisms,
            ][0];
        }
        return components[categoryId]?.[0];
    }

    function handleDocsSidebarNavigate(
        item: SidebarNavigationItem,
        event: MouseEvent,
    ): void {
        if (item.href.startsWith("category:")) {
            event.preventDefault();
            const targetValue = item.href.split(":")[1];
            if (!targetValue) {
                return;
            }
            const first = firstInCategory(targetValue);
            if (first) {
                const suffix =
                    targetValue === "all" ? "?catalog=all" : "";
                goto(`/components/${first.name}${suffix}`);
            }
            sidebarOpen = false;
            return;
        }

        sidebarOpen = false;
    }
</script>

<div class="bg-background">
    <main
        class="flex h-[calc(100dvh-4rem)] min-h-0 w-full max-w-screen"
    >
        {#if sidebarOpen}
            <button
                type="button"
                class="fixed inset-x-0 bottom-0 top-16 z-20 bg-black/30 md:hidden"
                onclick={() => (sidebarOpen = false)}
                aria-label="Close components sidebar"
            ></button>
        {/if}

        <div
            class="fixed left-0 top-16 z-30 flex h-[calc(100dvh-4rem)] min-h-0 w-[min(100vw-1rem,266px)] max-w-[266px] flex-col transform bg-background transition-transform duration-200 md:static md:z-10 md:h-full md:w-auto md:max-w-none md:min-h-0 md:shrink-0 md:translate-x-0 {sidebarOpen
                ? 'translate-x-0'
                : '-translate-x-full'}"
        >
            <SidebarNavigation
                className="min-h-0 flex-1"
                mode="expanded"
                ariaLabel="Component catalog: categories and components"
                items={docsSidebarItems}
                currentPath={docsSidebarCurrentPath}
                activePrimaryHref={`category:${selectedCategory}`}
                bind:searchValue={componentsNavSearch}
                searchMode="input"
                showProfile={false}
                showThemeToggle={false}
                showLogout={false}
                emptyStateTitle="No navigation matches"
                emptyStateDescription="Try another term to find categories or components."
                onNavigate={handleDocsSidebarNavigate}
            />
        </div>

        <div class="flex min-h-0 min-w-0 flex-1 flex-col">
            <div
                class="min-h-0 flex-1 overflow-y-auto overscroll-y-contain p-8"
            >
                <div class="mb-6 flex items-center gap-3 md:hidden">
                    <button
                        type="button"
                        onclick={() => (sidebarOpen = !sidebarOpen)}
                        class="text-description hover:text-headline cursor-pointer text-2xl transition-colors"
                        aria-label="Toggle component sidebar"
                        aria-expanded={sidebarOpen}
                    >
                        ☰
                    </button>
                    <span class="text-sm font-semibold text-headline"
                        >Browse components</span
                    >
                </div>

                {@render children()}
            </div>
        </div>
    </main>
</div>
