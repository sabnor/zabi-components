<script lang="ts">
    import SortableList from "../../src/components/molecules/SortableList.svelte";
    import type {
        SortableListReorderDetail,
        SortableListStrings,
    } from "../../src/components/util/sortable-list.js";

    type Section = { id: string; title: string; locked?: boolean };

    interface Props {
        onreorder?: (detail: SortableListReorderDetail<Section>) => void;
        controls?: "auto" | "manual";
        showMoveButtons?: boolean;
        disabled?: boolean;
        strings?: Partial<SortableListStrings>;
        /** Marks "Gallery" as a disabled item. */
        lockGallery?: boolean;
        /**
         * Manual mode only: makes each card's header clickable, as a card
         * that expands on a header click would, and renders the move buttons
         * inside it too.
         */
        onheaderclick?: (id: string) => void;
    }

    let {
        onreorder,
        controls = "auto",
        showMoveButtons = true,
        disabled = false,
        strings,
        lockGallery = false,
        onheaderclick,
    }: Props = $props();

    let items = $state<Section[]>([
        { id: "hero", title: "Hero" },
        { id: "gallery", title: "Gallery" },
        { id: "pricing", title: "Pricing" },
        { id: "faq", title: "FAQ" },
    ]);
</script>

<SortableList
    bind:items
    getKey={(section) => section.id}
    getLabel={(section) => section.title}
    isItemDisabled={(section) => lockGallery && section.id === "gallery"}
    aria-label="Sections"
    {onreorder}
    {controls}
    {showMoveButtons}
    {disabled}
    {strings}
>
    {#snippet item(section, row)}
        {#if controls === "manual"}
            {#if onheaderclick}
                <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
                <div
                    data-testid="card-{section.id}"
                    onclick={() => onheaderclick(section.id)}
                >
                    {@render row.handle()}
                    <span>{section.title}</span>
                    {@render row.moveButtons()}
                </div>
            {:else}
                <div data-testid="card-{section.id}">
                    {@render row.handle()}
                    <span>{section.title}</span>
                </div>
            {/if}
        {:else}
            <span data-testid="card-{section.id}">{section.title}</span>
        {/if}
    {/snippet}
</SortableList>
<p data-testid="order">{items.map((section) => section.id).join(",")}</p>
