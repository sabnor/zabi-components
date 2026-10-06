<script lang="ts">
    import SidebarShell from "../../src/components/organisms/SidebarShell.svelte";

    interface Props {
        mobile?: "none" | "drawer";
        initialOpen?: boolean;
        label?: string;
        drawerTitle?: string;
        withTrigger?: boolean;
        onclose?: (detail: { reason: string }) => void;
    }
    let {
        mobile = undefined,
        initialOpen = false,
        label = undefined,
        drawerTitle = undefined,
        withTrigger = true,
        onclose,
    }: Props = $props();

    // svelte-ignore state_referenced_locally
    let isOpen = $state(initialOpen);
</script>

<SidebarShell {mobile} bind:isOpen {label} {drawerTitle} {onclose} ariaLabel="Main menu" data-testid="rail">
    {#snippet trigger({ props, toggle })}
        {#if withTrigger}
            <button type="button" onclick={toggle} {...props}>Menu</button>
        {/if}
    {/snippet}
    {#snippet header({ collapsed })}
        <span data-testid="brand" data-collapsed={String(collapsed)}>Zabi</span>
    {/snippet}
    {#snippet children({ insetX })}
        <a href="#home" data-inset={insetX}>Home</a>
        <a href="#teams">Teams</a>
        <button type="button">Not a link</button>
    {/snippet}
    {#snippet footer()}
        <span data-testid="foot">Signed in</span>
    {/snippet}
</SidebarShell>
<button type="button" onclick={() => (isOpen = true)}>Own button</button>
<output data-testid="open">{String(isOpen)}</output>
