<script lang="ts">
    import SidebarNavigation from "../../components/organisms/SidebarNavigation.svelte";
    import ComponentShowcaseExampleDemos from "./ComponentShowcaseExampleDemos.svelte";
    import Badge from "../../components/atoms/Badge.svelte";
    import type { SidebarNavigationItem } from "../../components/organisms/SidebarNavigation.svelte";
    import type { ComponentMetadata } from "../../types/page.types";
    import { componentsCatalog as components } from "$lib/showcase/components-catalog";
    import { categories } from "$lib/showcase/components-showcase-constants";
    import {
        getDocsCategoryIcon,
        getDocsComponentIcon,
    } from "$lib/showcase/docs-sidebar-helpers";

    let selectedCategory = $state("atoms");
    let selectedComponent = $state("button");
    let modalOpen = $state(false);
    let slideUpOpen = $state(false);
    let activeTab = $state("tab1");
    let sidebarOpen = $state(false);
    let selectValue = $state<string | number | undefined>(undefined);
    let sidebarPath = $state("/revenue");
    let sidebarSearchValue = $state("Revenue");
    let sidebarSearchPanelOpen = $state(false);
    let sidebarProjectSearch = $state("");
    let selectedProjectId = $state("proj-zabi-web");
    let componentsNavSearch = $state("");

    let currentComponents = $derived.by(() => {
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
        selectedComponent
            ? `component:${selectedComponent}`
            : `category:${selectedCategory}`,
    );

    const docsSidebarItems = $derived.by((): SidebarNavigationItem[] => {
        const categoryItems: SidebarNavigationItem[] = categories.map((category) => ({
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
        }));

        const componentItems: SidebarNavigationItem[] = currentComponents.map(
            (component: ComponentMetadata) => ({
                id: `component-${component.name.toLowerCase()}`,
                label: component.name,
                href: `component:${component.name.toLowerCase()}`,
                icon: getDocsComponentIcon(component.name, component.category),
                group: "secondary",
            }),
        );

        return [...categoryItems, ...componentItems];
    });

    function handleDocsSidebarNavigate(
        item: SidebarNavigationItem,
        event: MouseEvent,
    ): void {
        event.preventDefault();

        const [targetType, targetValue] = item.href.split(":");
        if (!targetValue) {
            return;
        }

        if (targetType === "category") {
            selectedCategory = targetValue;
            const firstComponent =
                targetValue === "all"
                    ? [
                          ...components.atoms,
                          ...components.molecules,
                          ...components.organisms,
                      ][0]
                    : components[targetValue]?.[0];
            selectedComponent = firstComponent
                ? firstComponent.name.toLowerCase()
                : "";
        } else if (targetType === "component") {
            selectedComponent = targetValue;
        }

        sidebarOpen = false;
    }
</script>

<svelte:head>
    <title>Components - Zabi Components</title>
    <meta
        name="description"
        content="Interactive component showcase and documentation"
    />
</svelte:head>

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
            class="fixed left-0 top-16 z-30 flex h-[calc(100dvh-4rem)] min-h-0 w-[min(100vw-1rem,266px)] max-w-[266px] flex-col transform bg-background transition-transform duration-200 md:static md:z-0 md:h-full md:w-auto md:max-w-none md:min-h-0 md:shrink-0 md:translate-x-0 {sidebarOpen
                ? 'translate-x-0'
                : '-translate-x-full'}"
        >
            <SidebarNavigation
                className="min-h-0 flex-1"
                mode="expanded"
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

        <!-- Main content: scrolls with page footer -->
        <div class="flex min-h-0 min-w-0 flex-1 flex-col">
            <div
                class="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-y-contain p-8"
            >
            <div class="mb-6 flex items-center gap-3 md:hidden">
                <button
                    type="button"
                    onclick={() => (sidebarOpen = !sidebarOpen)}
                    class="text-description hover:text-headline text-2xl cursor-pointer transition-colors"
                    aria-label="Toggle component sidebar"
                    aria-expanded={sidebarOpen}
                >
                    ☰
                </button>
                <span class="text-sm font-semibold text-headline">Browse components</span>
            </div>
            {#each currentComponents as component}
                {#if selectedComponent === component.name.toLowerCase()}
                    <div class="max-w-4xl">
                        <!-- Component Header -->
                        <div class="mb-8">
                            <h1 class="text-3xl font-bold text-headline mb-2">
                                {component.name}
                            </h1>
                            <p class="text-lg text-description mb-4">
                                {component.description}
                            </p>
                            <div class="flex gap-2">
                                <Badge
                                    variant="info"
                                    text={component.category}
                                />
                                {#if component.variants}
                                    <Badge
                                        variant="info"
                                        text="{component.variants
                                            .length} variants"
                                    />
                                {/if}
                            </div>
                            {#if component.variants?.length}
                                <div
                                    class="mt-3 flex flex-wrap items-center gap-2"
                                >
                                    <span
                                        class="text-sm font-medium text-headline"
                                    >
                                        Variants:
                                    </span>
                                    {#each component.variants as variant}
                                        <span
                                            class="rounded-md bg-base-100 px-2 py-1 text-xs text-headline"
                                        >
                                            {variant}
                                        </span>
                                    {/each}
                                </div>
                            {/if}
                        </div>

                        <ComponentShowcaseExampleDemos
                            {component}
                            bind:modalOpen
                            bind:slideUpOpen
                            bind:activeTab
                            bind:selectValue
                            bind:sidebarPath
                            bind:sidebarSearchValue
                            bind:sidebarSearchPanelOpen
                            bind:sidebarProjectSearch
                            bind:selectedProjectId
                        />
                        <!-- Props Table -->
                        <div class="mt-12">
                            <h2 class="text-2xl font-bold text-headline mb-6">
                                Props
                            </h2>
                            <div class="overflow-x-auto">
                                <table
                                    class="w-full border-collapse border border-border"
                                >
                                    <thead>
                                        <tr class="bg-base-100">
                                            <th
                                                class="border border-border px-4 py-2 text-left text-headline font-semibold"
                                                >Name</th
                                            >
                                            <th
                                                class="border border-border px-4 py-2 text-left text-headline font-semibold"
                                                >Type</th
                                            >
                                            <th
                                                class="border border-border px-4 py-2 text-left text-headline font-semibold"
                                                >Required</th
                                            >
                                            <th
                                                class="border border-border px-4 py-2 text-left text-headline font-semibold"
                                                >Default</th
                                            >
                                            <th
                                                class="border border-border px-4 py-2 text-left text-headline font-semibold"
                                                >Description</th
                                            >
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {#each component.props as prop}
                                            <tr>
                                                <td
                                                    class="border border-border px-4 py-2 text-body font-mono"
                                                    >{prop.name}</td
                                                >
                                                <td
                                                    class="border border-border px-4 py-2 text-description"
                                                    >{prop.type}</td
                                                >
                                                <td
                                                    class="border border-border px-4 py-2 text-description"
                                                    >{prop.required
                                                        ? "Yes"
                                                        : "No"}</td
                                                >
                                                <td
                                                    class="border border-border px-4 py-2 text-description"
                                                    >{prop.defaultValue ||
                                                        "-"}</td
                                                >
                                                <td
                                                    class="border border-border px-4 py-2 text-description"
                                                    >{prop.description}</td
                                                >
                                            </tr>
                                        {/each}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                {/if}
            {/each}

                <footer
                    class="mt-16 bg-base-100 border-t border-border py-8 -mx-8 px-8"
                >
                    <div class="mx-auto max-w-4xl">
                        <div
                            class="flex flex-col items-center justify-between gap-4 md:flex-row"
                        >
                            <div class="text-center md:text-left">
                                <p class="text-description mb-2">
                                    Open source · MIT license · Code on GitHub
                                </p>
                                <p class="text-sm text-caption">
                                    © 2026 Zabi Components. MIT License.
                                </p>
                            </div>
                            <div class="flex gap-6">
                                <a
                                    href="/docs"
                                    class="text-description hover:text-headline transition-colors"
                                    >Docs</a
                                >
                                <a
                                    href="/components"
                                    class="text-description hover:text-headline transition-colors"
                                    >Components</a
                                >
                                <a
                                    href="https://github.com/sabnor/zabi-components"
                                    class="text-description hover:text-headline transition-colors"
                                    >GitHub</a
                                >
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    </main>
</div>
