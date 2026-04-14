<script lang="ts">
    import ComponentShowcaseExampleDemos from "../ComponentShowcaseExampleDemos.svelte";
    import Badge from "../../../components/atoms/Badge.svelte";
    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();

    const component = $derived(data.component);

    let modalOpen = $state(false);
    let slideUpOpen = $state(false);
    let activeTab = $state("tab1");
    let selectValue = $state<string | number | undefined>(undefined);
    let sidebarPath = $state("/revenue");
    let sidebarSearchValue = $state("Revenue");
    let sidebarSearchPanelOpen = $state(false);
    let sidebarProjectSearch = $state("");
    let selectedProjectId = $state("proj-zabi-web");
</script>

<svelte:head>
    <title>{component.name} - Components - Zabi Components</title>
    <meta
        name="description"
        content={component.description}
    />
</svelte:head>

<div class="max-w-4xl">
    <div class="mb-8">
        <h1 class="mb-2 text-3xl font-bold text-headline">
            {component.name}
        </h1>
        <p class="mb-4 text-lg text-description">
            {component.description}
        </p>
        <div class="flex gap-2">
            <Badge variant="info" text={component.category} />
            {#if component.variants}
                <Badge
                    variant="info"
                    text="{component.variants.length} variants"
                />
            {/if}
        </div>
        {#if component.variants?.length}
            <div class="mt-3 flex flex-wrap items-center gap-2">
                <span class="text-sm font-medium text-headline">Variants:</span>
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

    <div class="mt-12">
        <h2 class="mb-6 text-2xl font-bold text-headline">Props</h2>
        <div class="overflow-x-auto">
            <table class="w-full border-collapse border border-border">
                <thead>
                    <tr class="bg-base-100">
                        <th
                            class="border border-border px-4 py-2 text-left font-semibold text-headline"
                            >Name</th
                        >
                        <th
                            class="border border-border px-4 py-2 text-left font-semibold text-headline"
                            >Type</th
                        >
                        <th
                            class="border border-border px-4 py-2 text-left font-semibold text-headline"
                            >Required</th
                        >
                        <th
                            class="border border-border px-4 py-2 text-left font-semibold text-headline"
                            >Default</th
                        >
                        <th
                            class="border border-border px-4 py-2 text-left font-semibold text-headline"
                            >Description</th
                        >
                    </tr>
                </thead>
                <tbody>
                    {#each component.props as prop}
                        <tr>
                            <td
                                class="border border-border px-4 py-2 font-mono text-body"
                                >{prop.name}</td
                            >
                            <td
                                class="border border-border px-4 py-2 text-description"
                                >{prop.type}</td
                            >
                            <td class="border border-border px-4 py-2 text-description">
                                {prop.required ? "Yes" : "No"}
                            </td>
                            <td class="border border-border px-4 py-2 text-description">
                                {prop.defaultValue || "-"}
                            </td>
                            <td class="border border-border px-4 py-2 text-description">
                                {prop.description}
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</div>

<footer
    class="mt-16 -mx-8 border-t border-border bg-base-100 px-8 py-8"
>
    <div class="mx-auto max-w-4xl">
        <div
            class="flex flex-col items-center justify-between gap-4 md:flex-row"
        >
            <div class="text-center md:text-left">
                <p class="mb-2 text-description">
                    Open source · MIT license · Code on GitHub
                </p>
                <p class="text-sm text-caption">
                    © 2026 Zabi Components. MIT License.
                </p>
            </div>
            <div class="flex gap-6">
                <a
                    href="/docs"
                    class="text-description transition-colors hover:text-headline"
                    >Docs</a
                >
                <a
                    href="/components"
                    class="text-description transition-colors hover:text-headline"
                    >Components</a
                >
                <a
                    href="https://github.com/sabnor/zabi-components"
                    class="text-description transition-colors hover:text-headline"
                    >GitHub</a
                >
            </div>
        </div>
    </div>
</footer>
