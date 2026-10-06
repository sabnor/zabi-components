<script lang="ts">
    import ComponentShowcaseExampleDemos from "../ComponentShowcaseExampleDemos.svelte";
    import Header from "../../../components/molecules/Header.svelte";
    import Page from "../../../components/molecules/Page.svelte";
    import PropsTable from "../../../components/molecules/PropsTable.svelte";
    import Section from "../../../components/molecules/Section.svelte";
    import type { PageData } from "./$types";

    import { layerPath, layers } from "$lib/marketing/content";
    import Seo from "$lib/marketing/Seo.svelte";
    let { data }: { data: PageData } = $props();

    const component = $derived(data.component);

    /**
     * Catalog descriptions are written for the page header and some are under
     * 50 characters. A search snippet has room for about 160, so the rest says
     * what the page holds, in the longest form that still fits.
     */
    const metaDescription = $derived.by(() => {
        const candidates = [
            `${component.description} Live example, props and defaults for the ${component.name} component in Svelte 5.`,
            `${component.description} Svelte 5 component with a live example and props.`,
        ];
        return (
            candidates.find((candidate) => candidate.length <= 160) ??
            component.description
        );
    });

    const breadcrumbs = $derived([
        { name: "Components", path: "/components" },
        {
            name:
                layers.find((layer) => layer.id === component.category)
                    ?.title ?? component.category,
            path: layerPath(component.category),
        },
        { name: component.name },
    ]);

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

<Seo
    title={`${component.name}: Svelte 5 component | Zabi Components`}
    description={metaDescription}
    {breadcrumbs}
/>

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
