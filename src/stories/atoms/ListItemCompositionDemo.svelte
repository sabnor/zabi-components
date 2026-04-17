<script lang="ts">
    import { CreditCard } from "@lucide/svelte";
    import ListItem from "../../components/atoms/ListItem.svelte";
    import type { ListItemData } from "../../components/atoms/ListItem.svelte";

    const itemIcon: ListItemData = {
        id: "billing",
        label: "Billing",
        description: "Update payment methods and invoices",
        href: "/billing",
        icon: CreditCard,
    };

    const itemAvatar: ListItemData = {
        id: "contact",
        label: "Felix Nguyen",
        description: "Finance · Invoice contact",
        href: "/people/felix",
        avatar:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
        avatarAlt: "",
    };

    const itemPlain: ListItemData = {
        id: "team",
        label: "Team members",
        description: "Invite teammates and assign roles",
    };
</script>

<!--
  Storybook helper: data-driven icon, avatar, and text-only rows.
-->

<div class="flex w-full max-w-md flex-col gap-2">
    <ListItem item={itemIcon} />
    <ListItem item={itemAvatar} />
    <ListItem item={itemPlain} showArrow={false} />
</div>
