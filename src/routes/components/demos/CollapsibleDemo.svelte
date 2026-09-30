<script lang="ts">
    import { ChevronDown } from "@lucide/svelte";
    import Badge from "../../../components/atoms/Badge.svelte";
    import Button from "../../../components/atoms/Button.svelte";
    import Card from "../../../components/atoms/Card.svelte";
    import Input from "../../../components/atoms/Input.svelte";
    import Collapsible from "../../../components/molecules/Collapsible.svelte";
    import type { DemoRendererProps } from "./types";

    let { exampleIndex }: DemoRendererProps = $props();

    let notesOpen = $state(false);
    let billingOpen = $state(true);
    let detailsOpen = $state(false);
</script>

{#if exampleIndex === 0}
    <div class="w-full space-y-3">
        <div class="rounded-container border border-border bg-surface-raised p-1">
            <Collapsible bind:open={notesOpen} title="Delivery notes" headingLevel={3}>
                <p class="text-sm text-description">
                    Leave parcels with the front desk. The loading bay is closed
                    on weekends.
                </p>
            </Collapsible>
        </div>
        <p class="text-sm text-description">
            The panel is {notesOpen ? "open" : "closed"}.
        </p>
    </div>
{:else if exampleIndex === 1}
    <Card fullWidth={true}>
        <Collapsible bind:open={billingOpen} panelClass="pt-4">
            {#snippet trigger(props, state)}
                <div class="flex items-center gap-2">
                    <h3 class="min-w-0 flex-1 text-sm font-medium text-headline">
                        Billing details
                    </h3>
                    <Badge text="Draft" />
                    <Button variant="outline" size="sm" text="Preview" />
                    <button
                        {...props}
                        class="focus-ring flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-control text-description transition-colors hover:bg-surface-hover hover:text-body motion-reduce:transition-none"
                        aria-label="Billing details"
                    >
                        <ChevronDown
                            size={16}
                            aria-hidden="true"
                            class={state.open ? "rotate-180" : ""}
                        />
                    </button>
                </div>
            {/snippet}
            <Input label="Invoice reference" placeholder="PO-2041" />
            <p class="mt-2 text-sm text-description">
                Type something, collapse the section and open it again: the
                field keeps its value.
            </p>
            <div class="mt-4">
                <Button size="sm" onclick={() => (billingOpen = false)}>
                    Save and close
                </Button>
            </div>
        </Collapsible>
    </Card>
{:else}
    <div
        class="w-full rounded-container border border-border bg-surface-raised p-4"
    >
        <p class="text-sm font-medium text-headline">
            The import stopped at row 214.
        </p>
        <Collapsible bind:open={detailsOpen} unmountOnClose class="mt-2">
            {#snippet trigger(props, state)}
                <Button {...props} variant="link" size="sm">
                    Details
                    <ChevronDown
                        size={16}
                        aria-hidden="true"
                        class={state.open ? "rotate-180" : ""}
                    />
                </Button>
            {/snippet}
            <pre
                class="mt-2 overflow-x-auto rounded-control border border-border bg-surface-base p-3 text-sm text-description">Row 214: "amount" is not a number ("12,50 kr")</pre>
        </Collapsible>
    </div>
{/if}
