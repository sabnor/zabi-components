<script lang="ts">
    import BottomSheet from "../../src/components/molecules/BottomSheet.svelte";
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
    </BottomSheet>
</div>

{#snippet footer()}
    <button type="button" onclick={() => (open = false)}>Show results</button>
{/snippet}
