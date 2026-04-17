import type { ComponentDoc } from "../../../types/page.types";
import { componentsCatalog } from "../components-catalog";
import { makeDoc, demoId } from "./_shared";

const props = componentsCatalog.atoms.find((c) => c.name === "List")!.props;

export const doc: ComponentDoc = makeDoc({
    name: "List",
    category: "atoms",
    description:
        "List maps an `items` array to a semantic `<ul role=\"list\">` of rows—ideal for menus and settings where each row fits `ListItemData`. Prefer List when the UI maps cleanly from data; compose ListItem inside your own `<ul>` when you need trailing content (badges, amounts, controls). Put the list in a `list-group` (or use `className` on List) for grouped chrome; use `selectedId` to mark the active link.",
    defaultExample: {
        title: "Minimal rows",
        description:
            "Each item needs `id` and `label`. Add more fields in later examples.",
        demoId: demoId("List", "default"),
        code: `<script lang="ts">
  const items = [
    { id: "notifications", label: "Notifications" },
    { id: "privacy", label: "Privacy" },
    { id: "language", label: "Language" },
  ];
</script>

<div class="list-group">
  <List items={items} ariaLabel="Quick settings" />
</div>`,
    },
    examples: [
        {
            title: "Helper line under the label",
            description:
                "Optional `description` renders as muted text beneath the title.",
            demoId: demoId("List", "withDescription"),
            code: `<script lang="ts">
  const items = [
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
</script>

<div class="list-group">
  <List items={items} ariaLabel="Account settings" />
</div>`,
        },
        {
            title: "Leading icons",
            description:
                "Pass a Lucide icon on rows that need one; omit it where plain text is enough.",
            demoId: demoId("List", "leadingIcon"),
            code: `<script lang="ts">
  import { Bell, Shield } from "@lucide/svelte";

  const items = [
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
</script>

<div class="list-group">
  <List items={items} ariaLabel="Security and notifications" />
</div>`,
        },
        {
            title: "Leading avatars",
            description:
                "`avatar` is an image URL. Set `avatarAlt` for meaningful photos; use `\"\"` when decorative. Avatar wins over `icon` if both are set.",
            demoId: demoId("List", "leadingAvatar"),
            code: `<script lang="ts">
  const items = [
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
</script>

<div class="list-group">
  <List items={items} ariaLabel="People" />
</div>`,
        },
        {
            title: "Active row and list chrome",
            description:
                "`selectedId` marks the current row. Wrap the list in `list-group` for border, padding, and surface styling.",
            demoId: demoId("List", "selectedAndChrome"),
            code: `<script lang="ts">
  import { Bell, Shield } from "@lucide/svelte";

  const items = [
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

<div class="list-group">
  <List
    items={items}
    selectedId="security"
    ariaLabel="Settings sections"
  />
</div>`,
        },
        {
            title: "Trailing slot (manual ListItem)",
            description:
                "`ListItemData` has no trailing slot. Compose your own `<ul>` and pass the `trailing` snippet on ListItem for badges, status, or short meta.",
            demoId: demoId("List", "trailing"),
            code: `<script lang="ts">
  import { Badge, ListItem } from "zabi-components/atoms";

  const item = {
    id: "team",
    label: "Team plan",
    description: "Shared workspace for 8 people",
  };
</script>

<ul class="list-group" role="list" aria-label="Plans">
  <li>
    <ListItem item={item}>
      {#snippet trailing()}
        <Badge variant="success" text="Current" />
      {/snippet}
    </ListItem>
  </li>
</ul>`,
        },
        {
            title: "Item fields + trailing snippet",
            description:
                "Set `icon` on the item; add currency, totals, or labels in `trailing` only.",
            demoId: demoId("List", "combined"),
            code: `<script lang="ts">
  import { CreditCard } from "@lucide/svelte";
  import { ListItem } from "zabi-components/atoms";

  const invoice = {
    id: "inv-1042",
    label: "Invoice #1042",
    description: "Acme Corp · Net 30",
    href: "/billing/invoices/1042",
    icon: CreditCard,
  };
</script>

<ul class="list-group" role="list" aria-label="Recent invoices">
  <li>
    <ListItem item={invoice}>
      {#snippet trailing()}
        <span class="text-sm font-medium tabular-nums text-headline">$240.00</span>
      {/snippet}
    </ListItem>
  </li>
</ul>`,
        },
    ],
    variantsStates: ["default", "selected", "disabled", "no-arrow"],
    props,
    guidelines: {
        whenToUse: [
            "Use List when each row is a simple `ListItemData` shape—settings lists, section navigation, lightweight directories.",
            "Use ListItem inside your own `<ul>` when you need trailing snippets, bespoke markup, or controls that do not belong on the shared data type.",
            "Use `selectedId` with linked rows to reflect the current route or active section.",
            "Wrap lists in `list-group` (or `className` on List) when you want grouped chrome.",
        ],
        whenToAvoid: [
            "Avoid long paragraphs in `description`; keep helper lines short so rows stay scannable.",
            "Avoid cramming complex interactions into a row—prefer a sheet or full screen when the pattern outgrows a list row.",
        ],
    },
});
