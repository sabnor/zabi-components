<script lang="ts">
    import { ChevronDown } from '@lucide/svelte';
    import Button from '../../components/atoms/Button.svelte';
    import Card from '../../components/atoms/Card.svelte';
    import Input from '../../components/atoms/Input.svelte';
    import Collapsible from '../../components/molecules/Collapsible.svelte';
    import CollapsibleGroup from '../../components/molecules/CollapsibleGroup.svelte';

    interface Props {
        /** Start with the panel open. */
        open?: boolean;
        disabled?: boolean;
        /** Wrap the default trigger in an h3. */
        heading?: boolean;
        /** Render the trigger inside a card header, next to another button. */
        customTrigger?: boolean;
        unmountOnClose?: boolean;
        /** Render three Collapsibles in a CollapsibleGroup. */
        group?: 'none' | 'single' | 'multiple';
    }

    let {
        open = false,
        disabled = false,
        heading = false,
        customTrigger = false,
        unmountOnClose = false,
        group = 'none',
    }: Props = $props();

    // svelte-ignore state_referenced_locally
    let isOpen = $state(open);
    let changes = $state(0);

    const sections = [
        { id: 'general', title: 'General', body: 'Name, language and time zone of the workspace.' },
        { id: 'members', title: 'Members', body: 'Who can sign in, and what each role may change.' },
        { id: 'billing', title: 'Billing', body: 'Plan, invoices and the billing contact.' },
    ];
</script>

<div class="max-w-lg space-y-3">
    {#if group !== 'none'}
        <div class="rounded-container border border-border bg-surface-raised p-1">
            <CollapsibleGroup multiple={group === 'multiple'} class="gap-1">
                {#each sections as section (section.id)}
                    <Collapsible title={section.title} headingLevel={3}>
                        <p class="text-sm text-description">{section.body}</p>
                    </Collapsible>
                {/each}
            </CollapsibleGroup>
        </div>
    {:else if customTrigger}
        <Card fullWidth={true}>
            <Collapsible
                bind:open={isOpen}
                onopenchange={() => (changes += 1)}
                panelClass="pt-4"
                {disabled}
                {unmountOnClose}
            >
                {#snippet trigger(props, state)}
                    <div class="flex items-center gap-2">
                        <h3 class="min-w-0 flex-1 text-sm font-medium text-headline">
                            Billing details
                        </h3>
                        <Button variant="outline" size="sm" text="Preview" />
                        <button
                            {...props}
                            class="focus-ring flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-control text-description transition-colors hover:bg-surface-hover hover:text-body motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-50"
                            aria-label="Billing details"
                        >
                            <ChevronDown
                                size={16}
                                aria-hidden="true"
                                class={state.open ? 'rotate-180' : ''}
                            />
                        </button>
                    </div>
                {/snippet}
                <Input label="Invoice reference" placeholder="PO-2041" />
            </Collapsible>
        </Card>
    {:else}
        <div class="rounded-container border border-border bg-surface-raised p-1">
            <Collapsible
                bind:open={isOpen}
                onopenchange={() => (changes += 1)}
                title="Billing details"
                headingLevel={heading ? 3 : undefined}
                {disabled}
                {unmountOnClose}
            >
                <Input label="Invoice reference" placeholder="PO-2041" />
            </Collapsible>
        </div>
    {/if}
    {#if group === 'none'}
        <p class="text-sm text-description">
            {isOpen ? 'Open' : 'Closed'} · toggled {changes} times
        </p>
    {/if}
</div>
