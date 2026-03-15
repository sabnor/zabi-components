<script lang="ts">
    import {
        NavigationMenu,
        NavigationMenuList,
        NavigationMenuItem,
        NavigationMenuTrigger,
        NavigationMenuContent,
        NavigationMenuLink,
    } from "../../components/molecules/index.js";

    const items = [
        {
            id: "products",
            label: "Products",
            links: [
                { href: "#web", label: "Web" },
                { href: "#mobile", label: "Mobile" },
            ],
        },
        {
            id: "resources",
            label: "Resources",
            links: [
                { href: "#docs", label: "Documentation" },
                { href: "#guides", label: "Guides" },
            ],
        },
    ];
</script>

<div class="space-y-4">
    <p class="text-sm text-description">
        Open a trigger, press Escape to close, and click the button below to
        verify outside-click close behavior.
    </p>

    <NavigationMenu>
        <NavigationMenuList>
            {#each items as item}
                <NavigationMenuItem value={item.id}>
                    <NavigationMenuTrigger value={item.id}>
                        {item.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent value={item.id}>
                        <ul class="grid gap-2">
                            {#each item.links as link}
                                <li>
                                    <NavigationMenuLink href={link.href}>
                                        {link.label}
                                    </NavigationMenuLink>
                                </li>
                            {/each}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            {/each}
        </NavigationMenuList>
    </NavigationMenu>

    <button
        type="button"
        class="inline-flex rounded-lg border border-border px-4 py-2 text-sm text-body"
    >
        Outside click target
    </button>
</div>
