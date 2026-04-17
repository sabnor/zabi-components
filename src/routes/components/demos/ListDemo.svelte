<script lang="ts">
    import { Bell, CreditCard, Shield } from "@lucide/svelte";
    import Badge from "../../../components/atoms/Badge.svelte";
    import List from "../../../components/atoms/List.svelte";
    import { ListItem } from "../../../components/atoms/index.js";
    import type { ListItemData } from "../../../components/atoms/ListItem.svelte";
    import type { DemoRendererProps } from "./types";

    let { exampleIndex }: DemoRendererProps = $props();

    const basicItems: ListItemData[] = [
        { id: "notifications", label: "Notifications" },
        { id: "privacy", label: "Privacy" },
        { id: "language", label: "Language" },
    ];

    const iconMixItems: ListItemData[] = [
        {
            id: "notify",
            label: "Push notifications",
            description: "Alerts on this device",
            href: "/settings/notifications",
            icon: Bell,
        },
        {
            id: "security",
            label: "Security keys",
            description: "Passkeys and backup codes",
            href: "/settings/security",
            icon: Shield,
        },
        { id: "privacy", label: "Privacy", href: "/settings/privacy" },
    ];

    const avatarItems: ListItemData[] = [
        {
            id: "alex",
            label: "Alex Rivera",
            description: "Product design",
            href: "/people/alex",
            avatar:
                "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
            avatarAlt: "",
        },
        {
            id: "sam",
            label: "Sam Lee",
            description: "Engineering",
            href: "/people/sam",
            avatar:
                "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam",
            avatarAlt: "",
        },
    ];

    const accountItems: ListItemData[] = [
        {
            id: "profile",
            label: "Profile",
            description: "Photo, name, and contact details",
            href: "/settings/profile",
        },
        {
            id: "security",
            label: "Security",
            description: "Password, 2FA, and sessions",
            href: "/settings/security",
        },
    ];

    const planItem: ListItemData = {
        id: "team",
        label: "Team plan",
        description: "Shared workspace for up to 8 people",
    };

    const invoiceItem: ListItemData = {
        id: "inv-1042",
        label: "Invoice #1042",
        description: "Acme Corp · Net 30",
        href: "/billing/invoices/1042",
        icon: CreditCard,
    };

    const selectedChromeItems: ListItemData[] = [
        {
            id: "notify",
            label: "Notifications",
            icon: Bell,
            href: "/settings/notifications",
        },
        {
            id: "security",
            label: "Security",
            icon: Shield,
            href: "/settings/security",
        },
    ];

</script>

{#if exampleIndex === 0}
    <div class="w-full">
        <div class="list-group">
            <List items={basicItems} ariaLabel="Quick settings" />
        </div>
    </div>
{:else if exampleIndex === 1}
    <div class="w-full">
        <div class="list-group">
            <List items={iconMixItems} ariaLabel="Security and notifications" />
        </div>
    </div>
{:else if exampleIndex === 2}
    <div class="w-full">
        <div class="list-group">
            <List items={avatarItems} ariaLabel="People" />
        </div>
    </div>
{:else if exampleIndex === 3}
    <div class="w-full">
        <div class="list-group">
            <List items={accountItems} ariaLabel="Account settings" />
        </div>
    </div>
{:else if exampleIndex === 4}
    <ul class="list-group" role="list" aria-label="Plans">
        <li>
            <ListItem item={planItem}>
                {#snippet trailing()}
                    <Badge variant="success" text="Current" />
                {/snippet}
            </ListItem>
        </li>
    </ul>
{:else if exampleIndex === 5}
    <ul class="list-group" role="list" aria-label="Recent invoices">
        <li>
            <ListItem item={invoiceItem}>
                {#snippet trailing()}
                    <span class="text-sm font-medium tabular-nums text-headline"
                        >$240.00</span
                    >
                {/snippet}
            </ListItem>
        </li>
    </ul>
{:else if exampleIndex === 6}
    <div class="w-full">
        <div class="list-group">
            <List
                items={selectedChromeItems}
                selectedId="security"
                ariaLabel="Settings sections"
            />
        </div>
    </div>
{:else}
    <div class="w-full">
        <div class="list-group">
            <List items={basicItems} ariaLabel="Quick settings" />
        </div>
    </div>
{/if}
