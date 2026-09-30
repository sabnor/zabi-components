<script lang="ts">
    import Collapsible from "../../src/components/molecules/Collapsible.svelte";
    import CollapsibleGroup from "../../src/components/molecules/CollapsibleGroup.svelte";

    interface Props {
        multiple?: boolean;
        /** Panels open at the start, by name. */
        initial?: string[];
        /** Disables the "Members" panel. */
        disableMembers?: boolean;
        onopenchange?: (name: string, open: boolean) => void;
    }

    let {
        multiple = false,
        initial = [],
        disableMembers = false,
        onopenchange,
    }: Props = $props();

    // svelte-ignore state_referenced_locally
    let general = $state(initial.includes("general"));
    // svelte-ignore state_referenced_locally
    let members = $state(initial.includes("members"));
    // svelte-ignore state_referenced_locally
    let billing = $state(initial.includes("billing"));
    let nested = $state(false);
</script>

<CollapsibleGroup {multiple} data-testid="group">
    <Collapsible
        bind:open={general}
        title="General"
        headingLevel={3}
        onopenchange={(open) => onopenchange?.("general", open)}
    >
        <p>General settings</p>
        <!-- Not a member of the group: it sits inside a panel. -->
        <Collapsible bind:open={nested} title="Advanced">
            <p>Advanced settings</p>
        </Collapsible>
    </Collapsible>
    <Collapsible
        bind:open={members}
        title="Members"
        headingLevel={3}
        disabled={disableMembers}
        onopenchange={(open) => onopenchange?.("members", open)}
    >
        <p>Member list</p>
        <button type="button">Invite</button>
    </Collapsible>
    <Collapsible
        bind:open={billing}
        onopenchange={(open) => onopenchange?.("billing", open)}
    >
        {#snippet trigger(props)}
            <h3><button {...props}>Billing</button></h3>
        {/snippet}
        <p>Invoices</p>
    </Collapsible>
</CollapsibleGroup>

<button type="button" onclick={() => (billing = true)}>Open billing from outside</button>
<p data-testid="state">
    {[general && "general", members && "members", billing && "billing", nested && "nested"]
        .filter(Boolean)
        .join(",")}
</p>
