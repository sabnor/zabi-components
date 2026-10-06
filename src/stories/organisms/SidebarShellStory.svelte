<script lang="ts">
    import Menu from "@lucide/svelte/icons/menu";
    import IconButton from "../../components/atoms/IconButton.svelte";
    import SidebarShell from "../../components/organisms/SidebarShell.svelte";

    interface Props {
        mode?: "expanded" | "collapsed";
        mobile?: "none" | "drawer";
        label?: string;
    }
    let { mode = "expanded", mobile = "none", label = undefined }: Props = $props();

    let isOpen = $state(false);
    const links = ["Dashboard", "Teams", "Quiz", "Settings"];
</script>

<div class="flex h-[480px] w-full border border-border">
    <SidebarShell {mode} {mobile} {label} bind:isOpen drawerTitle="Menu" ariaLabel="Main menu">
        {#snippet trigger({ props, toggle })}
            <div class="p-2">
                <IconButton variant="ghost" size="lg" label="Menu" onclick={toggle} {...props}>
                    <Menu size={20} />
                </IconButton>
            </div>
        {/snippet}
        {#snippet header({ collapsed })}
            <span class="text-base font-semibold text-headline">{collapsed ? "Z" : "Zabi"}</span>
        {/snippet}
        {#snippet children()}
            {@const collapsed = mode === "collapsed" && !isOpen}
            <ul class="m-0 flex list-none flex-col gap-1 p-0">
                {#each links as link (link)}
                    <li>
                        <a
                            href={`#${link.toLowerCase()}`}
                            class="focus-ring focus-ring--nav flex min-h-10 items-center rounded-control px-3 text-sm text-nav-menu-item no-underline hover:bg-nav-menu-hover pointer-coarse:min-h-11"
                        >
                            {collapsed ? link[0] : link}
                        </a>
                    </li>
                {/each}
            </ul>
        {/snippet}
    </SidebarShell>
    <div class="min-w-0 flex-1 p-4 text-sm text-body">
        Page content. With <code>mobile="drawer"</code> the rail is here from 1024px up; in a
        narrower window the button opens the same sidebar in a drawer.
    </div>
</div>
