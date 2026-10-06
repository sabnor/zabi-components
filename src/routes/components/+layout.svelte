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

    /**
     * SidebarShell's small-screen mode. SidebarNavigation does not declare
     * these props yet; it hands what it does not know to the SidebarShell it
     * is built on, so they are spread. `isOpen` cannot be bound through it:
     * the drawer says when it has closed itself with `onclose`.
     */
    const catalogDrawer = $derived({
        mobile: "drawer" as const,
        isOpen: sidebarOpen,
        drawerTitle: "Components",
        onclose: () => {
            sidebarOpen = false;
        },
    });
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
        class="flex h-[calc(100dvh-var(--site-header-height))] min-h-0 w-full max-w-screen"
    >
        <!-- From `lg` up the catalog is a rail beside the page. Below that
        SidebarShell's drawer mode shows the same sidebar in a Drawer, opened
        by the button above the page content. -->
        <div class="flex h-full min-h-0 shrink-0 flex-col">
            <SidebarNavigation
                className="min-h-0 flex-1"
                mode="expanded"
                ariaLabel="Component catalog"
                items={docsSidebarItems}
                currentPath={docsSidebarCurrentPath}
                activePrimaryHref={`category:${selectedCategory}`}
                bind:searchValue={componentsNavSearch}
                searchMode="input"
                showProfile={false}
                showThemeToggle={false}
                showLogout={false}
                emptyStateTitle="Nothing matches"
                emptyStateDescription="Try another term to find categories or components."
                onNavigate={handleDocsSidebarNavigate}
                {...catalogDrawer}
            />
        </div>

        <div class="flex min-h-0 min-w-0 flex-1 flex-col">
            <!-- `relative` makes this the containing block for absolutely
            positioned descendants. Without it an `sr-only` span far down the
            content is not clipped by this scroller, and it stretches the
            document itself: blank space to scroll through under the page. -->
            <div
                class="relative min-h-0 flex-1 overflow-y-auto overscroll-y-contain p-8 pb-[calc(2rem+env(safe-area-inset-bottom,0px))]"
            >
                <div class="mb-6 flex items-center gap-3 lg:hidden">
                    <button
                        type="button"
                        onclick={() => (sidebarOpen = !sidebarOpen)}
                        class="focus-ring text-description hover:text-headline flex size-11 cursor-pointer items-center justify-center rounded-control text-2xl transition-colors"
                        aria-label="Browse components"
                        aria-haspopup="dialog"
                        aria-expanded={sidebarOpen}
                        data-testid="catalog-menu-button"
                    >
                        <span aria-hidden="true">☰</span>
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
