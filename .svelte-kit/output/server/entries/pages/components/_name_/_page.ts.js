import { redirect, error } from "@sveltejs/kit";
import { c as componentsCatalog } from "../../../../chunks/components-catalog.js";
function demoId(componentName, suffix) {
  return `${componentName}.${suffix}`;
}
function defaultExample(componentName, example) {
  return {
    demoId: example.demoId ?? demoId(componentName, "default"),
    title: example.title,
    description: example.description,
    code: example.code,
    language: example.language ?? "svelte"
  };
}
function makeDoc(doc2) {
  return {
    ...doc2,
    defaultExample: defaultExample(doc2.name, doc2.defaultExample),
    examples: doc2.examples?.map((ex) => ({
      demoId: ex.demoId,
      title: ex.title,
      description: ex.description,
      code: ex.code,
      language: ex.language ?? "svelte"
    }))
  };
}
const props$6 = componentsCatalog.atoms.find((c) => c.name === "Button").props;
const doc$6 = makeDoc({
  name: "Button",
  category: "atoms",
  description: "Accessible button with a small set of visual variants and sizes. Use it for primary and secondary actions across forms, dialogs, and toolbars.",
  defaultExample: {
    title: "Default",
    description: "Primary action button with a clear label.",
    demoId: demoId("Button", "default"),
    code: `<Button>Save changes</Button>`
  },
  examples: [
    {
      title: "Variants",
      description: "Use variants to communicate intent. Keep the page to one clear primary action.",
      demoId: demoId("Button", "variants"),
      code: `<div class="flex flex-wrap items-center gap-2">
  <Button variant="primary">Primary</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="link">Link</Button>
  <Button variant="danger">Delete</Button>
</div>`
    },
    {
      title: "Disabled",
      description: "Disable actions while submitting or when prerequisites aren’t met.",
      demoId: demoId("Button", "disabled"),
      code: `<div class="flex flex-wrap items-center gap-2">
  <Button disabled>Saving…</Button>
  <Button variant="secondary" disabled>Cancel</Button>
</div>`
    }
  ],
  variantsStates: ["primary", "secondary", "outline", "ghost", "link", "danger", "disabled"],
  props: props$6,
  guidelines: {
    whenToUse: [
      "Use for actions that change state (submit, save, delete, open dialog).",
      "Prefer one primary button per view to keep the main action obvious."
    ],
    whenToAvoid: [
      "Avoid using buttons for navigation — use links for route changes.",
      "Avoid icon-only buttons without an accessible label (use `IconButton`)."
    ]
  }
});
const props$5 = componentsCatalog.atoms.find((c) => c.name === "Input").props;
const doc$5 = makeDoc({
  name: "Input",
  category: "atoms",
  description: "Labeled form input with visual variants for validation states. Use it for structured data entry in forms and settings.",
  defaultExample: {
    title: "Default",
    description: "Use a clear label and an appropriate input type.",
    demoId: demoId("Input", "default"),
    code: `<Input label="Email address" type="email" placeholder="name@company.com" />`
  },
  examples: [
    {
      title: "Validation states",
      description: "Use variants to reflect validation state with accompanying messaging in your form.",
      demoId: demoId("Input", "states"),
      code: `<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
  <Input label="Email address" type="email" placeholder="name@company.com" />
  <Input variant="error" label="Email address" type="email" placeholder="name@company.com" />
</div>`
    }
  ],
  variantsStates: ["default", "success", "warning", "error"],
  props: props$5,
  guidelines: {
    whenToUse: [
      "Use for single-line text input with a visible label (forms, filters, settings).",
      "Prefer the correct `type` (email, tel, number, password) to improve UX and mobile keyboards."
    ],
    whenToAvoid: [
      "Avoid placeholder-only fields — keep labels visible for accessibility and clarity.",
      "Avoid using validation colors alone; include clear error text near the field."
    ]
  }
});
const props$4 = componentsCatalog.atoms.find((c) => c.name === "List").props;
const doc$4 = makeDoc({
  name: "List",
  category: "atoms",
  description: 'List maps an `items` array to a semantic `<ul role="list">` of rows—ideal for menus and settings where each row fits `ListItemData`. Prefer List when the UI maps cleanly from data; compose ListItem inside your own `<ul>` when you need trailing content (badges, amounts, controls). Put the list in a `list-group` (or use `className` on List) for grouped chrome; use `selectedId` to mark the active link.',
  defaultExample: {
    title: "Minimal rows",
    description: "Each item needs `id` and `label`. Add more fields in later examples.",
    demoId: demoId("List", "default"),
    code: `<script lang="ts">
  const items = [
    { id: "notifications", label: "Notifications" },
    { id: "privacy", label: "Privacy" },
    { id: "language", label: "Language" },
  ];
<\/script>

<div class="list-group">
  <List items={items} ariaLabel="Quick settings" />
</div>`
  },
  examples: [
    {
      title: "Helper line under the label",
      description: "Optional `description` renders as muted text beneath the title.",
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
<\/script>

<div class="list-group">
  <List items={items} ariaLabel="Account settings" />
</div>`
    },
    {
      title: "Leading icons",
      description: "Pass a Lucide icon on rows that need one; omit it where plain text is enough.",
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
<\/script>

<div class="list-group">
  <List items={items} ariaLabel="Security and notifications" />
</div>`
    },
    {
      title: "Leading avatars",
      description: '`avatar` is an image URL. Set `avatarAlt` for meaningful photos; use `""` when decorative. Avatar wins over `icon` if both are set.',
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
<\/script>

<div class="list-group">
  <List items={items} ariaLabel="People" />
</div>`
    },
    {
      title: "Active row and list chrome",
      description: "`selectedId` marks the current row. Wrap the list in `list-group` for border, padding, and surface styling.",
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
<\/script>

<div class="list-group">
  <List
    items={items}
    selectedId="security"
    ariaLabel="Settings sections"
  />
</div>`
    },
    {
      title: "Trailing slot (manual ListItem)",
      description: "`ListItemData` has no trailing slot. Compose your own `<ul>` and pass the `trailing` snippet on ListItem for badges, status, or short meta.",
      demoId: demoId("List", "trailing"),
      code: `<script lang="ts">
  import { Badge, ListItem } from "zabi-components/atoms";

  const item = {
    id: "team",
    label: "Team plan",
    description: "Shared workspace for 8 people",
  };
<\/script>

<ul class="list-group" role="list" aria-label="Plans">
  <li>
    <ListItem item={item}>
      {#snippet trailing()}
        <Badge variant="success" text="Current" />
      {/snippet}
    </ListItem>
  </li>
</ul>`
    },
    {
      title: "Item fields + trailing snippet",
      description: "Set `icon` on the item; add currency, totals, or labels in `trailing` only.",
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
<\/script>

<ul class="list-group" role="list" aria-label="Recent invoices">
  <li>
    <ListItem item={invoice}>
      {#snippet trailing()}
        <span class="text-sm font-medium tabular-nums text-headline">$240.00</span>
      {/snippet}
    </ListItem>
  </li>
</ul>`
    }
  ],
  variantsStates: ["default", "selected", "disabled", "no-arrow"],
  props: props$4,
  guidelines: {
    whenToUse: [
      "Use List when each row is a simple `ListItemData` shape—settings lists, section navigation, lightweight directories.",
      "Use ListItem inside your own `<ul>` when you need trailing snippets, bespoke markup, or controls that do not belong on the shared data type.",
      "Use `selectedId` with linked rows to reflect the current route or active section.",
      "Wrap lists in `list-group` (or `className` on List) when you want grouped chrome."
    ],
    whenToAvoid: [
      "Avoid long paragraphs in `description`; keep helper lines short so rows stay scannable.",
      "Avoid cramming complex interactions into a row—prefer a sheet or full screen when the pattern outgrows a list row."
    ]
  }
});
const props$3 = componentsCatalog.molecules.find((c) => c.name === "Modal").props;
const doc$3 = makeDoc({
  name: "Modal",
  category: "molecules",
  description: "Dialog overlay for focused tasks that require immediate user attention. Use it for confirmations, short forms, and critical flows that shouldn’t lose context.",
  defaultExample: {
    title: "Default",
    description: "A modal with a title and a clear primary action.",
    demoId: demoId("Modal", "default"),
    code: `<Button onclick={() => (open = true)}>Open modal</Button>

<Modal title="Confirm changes" bind:open>
  <p class="text-description">This change affects all team members.</p>
  <div class="mt-4 flex justify-end gap-2">
    <Button variant="secondary" onclick={() => (open = false)}>Cancel</Button>
    <Button variant="primary" onclick={() => (open = false)}>Confirm</Button>
  </div>
</Modal>`
  },
  variantsStates: ["default"],
  props: props$3,
  guidelines: {
    whenToUse: [
      "Use for confirmations and short, self-contained tasks.",
      "Ensure a clear primary action and an obvious way to cancel/close."
    ],
    whenToAvoid: [
      "Avoid deep multi-step flows in a modal; use a dedicated page when complexity grows.",
      "Avoid opening modals without moving focus into the dialog."
    ]
  }
});
const props$2 = componentsCatalog.atoms.find((c) => c.name === "Radio").props;
const doc$2 = makeDoc({
  name: "Radio",
  category: "atoms",
  description: "Single radio input for mutually exclusive choices. Use `RadioGroup` when you want a fully accessible group with arrow-key navigation and a single bindable value.",
  defaultExample: {
    title: "Default",
    description: "Use a label and a shared `name` to form a native radio group.",
    demoId: demoId("Radio", "default"),
    code: `<Radio name="plan" value="basic" label="Basic plan" />`
  },
  examples: [
    {
      title: "Group usage",
      description: "Use `RadioGroup` for options arrays, a semantic fieldset/legend, and roving focus with arrow keys.",
      demoId: demoId("Radio", "group"),
      code: `<RadioGroup
  legend="Billing cadence"
  options={[
    { value: "monthly", label: "Monthly" },
    { value: "annual", label: "Annual", description: "Save 20% with annual billing" }
  ]}
/>`
    },
    {
      title: "Disabled state",
      description: "Disable either the whole group or individual options to prevent selection.",
      demoId: demoId("Radio", "disabled"),
      code: `<RadioGroup
  legend="Notifications"
  disabled={true}
  options={[
    { value: "all", label: "All activity" },
    { value: "mentions", label: "Mentions only" }
  ]}
/>`
    },
    {
      title: "Realistic form",
      description: "Bind the selected value and use it to drive UI (e.g. helper copy or conditional fields).",
      demoId: demoId("Radio", "realistic"),
      code: `<script lang="ts">
  let billing = $state("annual");
<\/script>

<RadioGroup
  legend="Choose a plan"
  bind:value={billing}
  options={[
    { value: "starter", label: "Starter", description: "For personal projects" },
    { value: "team", label: "Team", description: "For collaborating with others" },
    { value: "enterprise", label: "Enterprise", description: "Advanced controls and SSO" }
  ]}
/>

<p class="text-sm text-description mt-2">
  Selected: {billing}
</p>`
    }
  ],
  props: props$2,
  guidelines: {
    whenToUse: [
      "Use `Radio` for a single option when you’re composing a custom layout and already have grouping handled.",
      "Use `RadioGroup` for standard forms: it provides a `<fieldset>` and keyboard navigation by default."
    ],
    whenToAvoid: [
      "Avoid using standalone radios without a clear group label/legend — users need context for what the choices represent."
    ]
  }
});
const props$1 = componentsCatalog.organisms.find(
  (c) => c.name === "SidebarNavigation"
).props;
const doc$1 = makeDoc({
  name: "SidebarNavigation",
  category: "organisms",
  description: "Sidebar navigation for app shells with clear active-state styling and optional search patterns. Use it to give users strong orientation and predictable navigation.",
  defaultExample: {
    title: "Default",
    description: "Expanded sidebar with a current page highlight and a simple search flow.",
    demoId: demoId("SidebarNavigation", "default"),
    code: `<SidebarNavigation
  mode="expanded"
  items={sidebarNavItems}
  currentPath="/revenue"
/>`
  },
  examples: [
    {
      title: "Search trigger + panel",
      description: "Use button-trigger search when results need more space than an inline input.",
      demoId: demoId("SidebarNavigation", "searchPanel"),
      code: `<SidebarNavigation
  mode="expanded"
  searchMode="button"
  items={sidebarNavItems}
  currentPath="/revenue"
  onSearchClick={() => (panelOpen = true)}
/>`
    }
  ],
  variantsStates: ["expanded", "collapsed", "searchMode: input", "searchMode: button"],
  props: props$1,
  guidelines: {
    whenToUse: [
      "Use for primary application navigation with clear current-page highlight.",
      "Group items into logical sections to reduce scanning time."
    ],
    whenToAvoid: [
      "Avoid for short, single-page experiences where a header nav is sufficient.",
      "Avoid mixing too many unrelated item groups; restructure IA first."
    ]
  }
});
const props = componentsCatalog.atoms.find((c) => c.name === "Skeleton").props;
const doc = makeDoc({
  name: "Skeleton",
  category: "atoms",
  description: "Neutral placeholder that mirrors the shape of content while it loads. Use when the final layout is predictable to reduce perceived latency and layout shift.",
  defaultExample: {
    title: "Default",
    description: "A single text line placeholder that fills its container.",
    demoId: demoId("Skeleton", "default"),
    code: `<Skeleton />`
  },
  examples: [
    {
      title: "Avatar",
      description: "Circle variant for avatars and icon placeholders.",
      demoId: demoId("Skeleton", "avatar"),
      code: `<Skeleton variant="circle" />`
    },
    {
      title: "Media block",
      description: "Block variant for cards, images, thumbnails, and hero regions.",
      demoId: demoId("Skeleton", "block"),
      code: `<Skeleton variant="block" />`
    },
    {
      title: "Custom size",
      description: "Use `width` / `height` for CSS lengths or pixel values, or Tailwind width utilities via `class`.",
      demoId: demoId("Skeleton", "size"),
      code: `<div class="space-y-3">
  <Skeleton width="50%" />
  <Skeleton width={240} height={8} />
  <Skeleton variant="block" class="w-64" />
</div>`
    },
    {
      title: "User row",
      description: "A realistic list-row pattern: avatar beside two lines of text.",
      demoId: demoId("Skeleton", "userRow"),
      code: `<div class="flex items-center gap-3">
  <Skeleton variant="circle" />
  <div class="flex-1 space-y-2">
    <Skeleton width="60%" />
    <Skeleton width="40%" />
  </div>
</div>`
    },
    {
      title: "Article card",
      description: "Drop-in placeholder for feed cards, blog previews, and product tiles.",
      demoId: demoId("Skeleton", "articleCard"),
      code: `<article class="space-y-3">
  <Skeleton variant="block" />
  <Skeleton width="70%" height={16} />
  <div class="space-y-2">
    <Skeleton />
    <Skeleton width="85%" />
  </div>
</article>`
    }
  ],
  variantsStates: ["text", "circle", "block"],
  props,
  guidelines: {
    whenToUse: [
      "Use for predictable layouts during data fetching (lists, cards, profile headers).",
      "Prefer skeletons over spinners for content-heavy pages to preserve structure."
    ],
    whenToAvoid: [
      "Avoid for unknown/dynamic layouts — use a lighter loading state instead.",
      "Avoid showing skeletons for very fast operations (it can feel like flicker)."
    ]
  }
});
const docs = [
  doc$6,
  doc$5,
  doc$2,
  doc,
  doc$3,
  doc$1,
  doc$4
];
function allComponentDocs() {
  return docs.slice();
}
function getComponentDocByName(name) {
  const lower = name.toLowerCase();
  return docs.find((d) => d.name.toLowerCase() === lower);
}
function allComponents() {
  return allComponentDocs();
}
function docToMetadata(doc2) {
  return {
    name: doc2.name,
    category: doc2.category,
    description: doc2.description,
    props: doc2.props,
    variants: doc2.variantsStates,
    examples: [doc2.defaultExample, ...doc2.examples ?? []].map((ex) => ({
      title: ex.title,
      description: ex.description ?? "",
      code: ex.code,
      language: ex.language,
      demoId: ex.demoId
    }))
  };
}
const load = ({ params }) => {
  const list = allComponents();
  const foundDoc = getComponentDocByName(params.name) ?? list.find((c) => c.name.toLowerCase() === params.name.toLowerCase());
  if (foundDoc) {
    if (params.name !== foundDoc.name) {
      redirect(301, `/components/${foundDoc.name}`);
    }
    return { component: docToMetadata(foundDoc) };
  }
  const fallbackList = [
    ...componentsCatalog.atoms,
    ...componentsCatalog.molecules,
    ...componentsCatalog.organisms
  ];
  const foundFallback = fallbackList.find(
    (c) => c.name.toLowerCase() === params.name.toLowerCase()
  );
  if (!foundFallback) {
    error(404, `Unknown component: ${params.name}`);
  }
  if (params.name !== foundFallback.name) {
    redirect(301, `/components/${foundFallback.name}`);
  }
  return { component: foundFallback };
};
export {
  load
};
