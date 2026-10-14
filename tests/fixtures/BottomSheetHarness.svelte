<script lang="ts">
    import BottomSheet from "../../src/components/molecules/BottomSheet.svelte";
    import TimeColumn from "../../src/components/atoms/TimeColumn.svelte";
    import type {
        BottomSheetCloseReason,
        BottomSheetSnap,
    } from "../../src/components/util/bottom-sheet";

    interface Props {
        initialOpen?: boolean;
        initialSnap?: BottomSheetSnap;
        snapPoints?: BottomSheetSnap[];
        description?: string;
        dismissible?: boolean;
        portal?: boolean;
        closeLabel?: string;
        expandLabel?: string;
        collapseLabel?: string;
        initialFocus?: string;
        withFooter?: boolean;
        /** Something inside the content that scrolls or is dragged by itself. */
        inner?: "list" | "opt-out" | "range" | "time-column" | "short-list";
        onclose?: (detail: { reason: BottomSheetCloseReason }) => void;
        onkeydown?: (event: KeyboardEvent) => void;
    }

    let {
        initialOpen = false,
        initialSnap,
        snapPoints,
        description,
        dismissible,
        portal,
        closeLabel,
        expandLabel,
        collapseLabel,
        initialFocus,
        withFooter = true,
        inner,
        onclose,
        onkeydown,
    }: Props = $props();

    // svelte-ignore state_referenced_locally
    let open = $state(initialOpen);
    // svelte-ignore state_referenced_locally
    let snap = $state<BottomSheetSnap | undefined>(initialSnap);
</script>

<div data-testid="host">
    <button type="button" data-testid="opener" onclick={() => (open = true)}>Open filters</button>
    <output data-testid="state">{open ? "open" : "closed"}:{snap ?? "unset"}</output>
    <BottomSheet
        bind:isOpen={open}
        bind:snap
        title="Filters"
        {description}
        {snapPoints}
        {dismissible}
        {portal}
        {closeLabel}
        {expandLabel}
        {collapseLabel}
        {initialFocus}
        {onclose}
        {onkeydown}
        data-testid="sheet"
        footer={withFooter ? footer : undefined}
    >
        <label>
            Search
            <input id="sheet-search" type="text" />
        </label>
        <p>Pick what to show.</p>
        {#if inner === "list" || inner === "short-list"}
            <ul data-testid="inner" style="overflow-y: auto; height: 120px">
                <li data-testid="inner-row">One</li>
                <li>Two</li>
            </ul>
        {:else if inner === "opt-out"}
            <div data-testid="inner" data-sheet-no-drag><span data-testid="inner-row">Map</span></div>
        {:else if inner === "range"}
            <input data-testid="inner" type="range" aria-label="Volume" />
        {:else if inner === "time-column"}
            <TimeColumn
                label="Minutes"
                options={[
                    { value: "00", label: "00" },
                    { value: "15", label: "15" },
                    { value: "30", label: "30" },
                    { value: "45", label: "45" },
                ]}
                selected="45"
                onselect={() => {}}
            />
        {/if}
    </BottomSheet>
</div>

{#snippet footer()}
    <button type="button" onclick={() => (open = false)}>Show results</button>
{/snippet}
