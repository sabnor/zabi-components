<script lang="ts">
    /**
     * Type-level guard, checked by `npm run check` and never packaged (the
     * library build takes only `.ts` from this folder).
     *
     * SidebarShell's `children` is a snippet that is handed the shell's
     * region context. Its `Props` used to intersect that with the plain
     * `children` of `HTMLAttributes`, which takes no argument, so a snippet
     * written the way the component's own example shows was a type error:
     * "Target signature provides too few arguments". This file is that
     * snippet. It also holds the small-screen props, on the shell and passed
     * through SidebarNavigation, `bind:isOpen` included.
     */
    import SidebarNavigation from "../components/organisms/SidebarNavigation.svelte";
    import SidebarShell from "../components/organisms/SidebarShell.svelte";

    let isOpen = $state(false);
    let reason = $state("");
</script>

<SidebarShell mobile="drawer" bind:isOpen drawerTitle="Menu" label="Länkar">
    {#snippet trigger({ props, toggle, isOpen: open })}
        <button type="button" onclick={toggle} {...props}>{open ? "Stäng" : "Meny"}</button>
    {/snippet}
    {#snippet header({ collapsed })}
        <span>{collapsed ? "Z" : "Zabi"}</span>
    {/snippet}
    {#snippet children({ collapsed, insetX })}
        <a href="/" class={insetX}>{collapsed ? "H" : "Hem"}</a>
    {/snippet}
    {#snippet footer({ insetX })}
        <span class={insetX}>Inloggad</span>
    {/snippet}
</SidebarShell>

<!-- A shell with plain content, no snippet, is still fine. -->
<SidebarShell>
    <a href="/">Hem</a>
</SidebarShell>

<SidebarNavigation
    items={[]}
    mobile="drawer"
    bind:isOpen
    drawerTitle="Meny"
    closeLabel="Stäng"
    label="Länkar"
    onclose={(detail) => (reason = detail.reason)}
>
    {#snippet trigger({ props, toggle })}
        <button type="button" onclick={toggle} {...props}>Meny {reason}</button>
    {/snippet}
</SidebarNavigation>
