<script lang="ts">
    import ComponentShowcaseExampleDemos from "../ComponentShowcaseExampleDemos.svelte";
    import Header from "../../../components/molecules/Header.svelte";
    import Page from "../../../components/molecules/Page.svelte";
    import PropsTable from "../../../components/molecules/PropsTable.svelte";
    import Section from "../../../components/molecules/Section.svelte";
    import type { PageData } from "./$types";

    import { ExternalLink } from "@lucide/svelte";
    import { GITHUB_URL } from "$lib/marketing/content";
    let { data }: { data: PageData } = $props();

    const component = $derived(data.component);

    let modalOpen = $state(false);
    let slideUpOpen = $state(false);
    let activeTab = $state("tab1");
    let selectValue = $state<string | number | undefined>(undefined);
    let sidebarPath = $state("/revenue");
    let sidebarSearchValue = $state("");
    let sidebarSearchPanelOpen = $state(false);
    let sidebarProjectSearch = $state("");
    let selectedProjectId = $state("proj-zabi-web");
</script>

<svelte:head>
    <title>{component.name} — Zabi Components</title>
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
        title="Props"
        description="The props you are most likely to need, with types and defaults."
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
                    Zabi Components is open source under the MIT license.
                </p>
                <p class="text-sm text-caption">
                    © {new Date().getFullYear()} Zabi Components.
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
                    href={GITHUB_URL}
                    class="inline-flex items-center text-description transition-colors hover:text-headline"
                    target="_blank"
                    rel="noopener noreferrer"
                    >GitHub<ExternalLink
                        size={12}
                        class="ml-1 shrink-0 opacity-70"
                        aria-hidden="true"
                    /><span class="sr-only">(opens in a new tab)</span></a
                >
            </div>
        </div>
    </div>
</footer>
