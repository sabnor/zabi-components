<script lang="ts">
    import ComponentShowcaseExampleDemos from "../ComponentShowcaseExampleDemos.svelte";
    import Header from "../../../components/molecules/Header.svelte";
    import Page from "../../../components/molecules/Page.svelte";
    import PropsTable from "../../../components/molecules/PropsTable.svelte";
    import Section from "../../../components/molecules/Section.svelte";
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

<Page className="max-w-4xl">
    <Header
        title={component.name}
        description={component.description}
        category={component.category}
        variantsStates={component.variants}
    />

    <Section
        title="Live example"
        description="Default usage you can copy and adapt."
        padding="none"
        background="transparent"
        maxWidth="none"
        className="pt-2"
    >
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
    </Section>

    <Section
        title="Props / API"
        description="Minimal API reference for the exported component."
        padding="none"
        background="transparent"
        maxWidth="none"
    >
        <PropsTable props={component.props} />
    </Section>
</Page>

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
