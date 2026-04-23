# Zabi Components

Svelte **5** UI primitives (runes, `onclick` / `oninput`, …), Tailwind **v4** design tokens, SSR-safe. Requires **Svelte ≥ 5.43.8**.

Docs: **[zabi-components.vercel.app](https://zabi-components.vercel.app/)**

---

## Quick start

**1. Install**

```bash
npm install zabi-components
```

Ensure `svelte@^5.43.8` is installed — SvelteKit apps usually already match; add `@sveltejs/kit@^2` only for Kit. Optional: `react@^18` if you use `zabi-components/react`.

**2. Global CSS** (e.g. SvelteKit `src/app.css` — adjust for your bundler entry)

```css
@import "tailwindcss";
@import "zabi-components/theme-only";
@import "zabi-components/theme-dark-only";
```

No Tailwind? See [docs/theme-imports.md](./docs/theme-imports.md) (`colors` or full `css`).

**3. Use a component** (`+page.svelte` or any Svelte 5 component)

```svelte
<script lang="ts">
    import { Button, Input } from "zabi-components";

    let name = $state("");
</script>

<div class="flex max-w-md flex-col gap-4 p-6">
    <Input label="Name" name="name" bind:value={name} placeholder="Ada Lovelace" />
    <Button onclick={() => console.log(name)}>Save</Button>
</div>
```

Without the theme CSS, token classes (`bg-input`, `text-body`, …) look unstyled — always import the theme.

---

## Import strategy

| Approach | When to use |
|----------|-------------|
| **Barrel** `import { … } from "zabi-components"` | **Default.** Smallest mental load; fine for most apps. |
| **Category** `zabi-components/atoms`, `/molecules`, `/organisms` | Larger bundles where you want imports to mirror structure, or you only pull one layer in a given file. |
| **Types** `zabi-components/types` | Shared prop unions / enums in your app code. |
| **Helpers** `zabi-components`, `zabi-components/lib/ssr-safe`, `lib/variant-utils` | Utilities the package publishes — not app internals. |

Stick to **documented package subpaths** from `package.json` `exports`. Do not reach into `node_modules/zabi-components/dist/...` by hand.

---

## Mental model

**Data-driven (start here)** — You pass **arrays or option lists**; the component renders rows and wires behavior (keyboard, selection, labels).

```svelte
<script lang="ts">
    import { List, RadioGroup } from "zabi-components";

    let choice = $state<string | undefined>();
</script>

<List items={[{ id: "a", label: "Alpha" }]} ariaLabel="Example" />
<RadioGroup legend="Pick one" options={[{ value: "x", label: "X" }]} bind:value={choice} />
```

**Composable (advanced)** — You assemble **nested components** when layout and snippets matter more than a single props object.

```svelte
<script lang="ts">
    import {
        Card,
        CardHeader,
        CardContent,
        NavigationMenu,
        NavigationMenuList,
        NavigationMenuItem,
        NavigationMenuTrigger,
    } from "zabi-components";
</script>

<Card>
    <CardHeader title="Title" />
    <CardContent><p class="text-body">Main content.</p></CardContent>
</Card>

<NavigationMenu>
    <NavigationMenuList>
        <NavigationMenuItem>
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
        </NavigationMenuItem>
    </NavigationMenuList>
</NavigationMenu>
```

Wrong mental model: treating composable roots as optional — see **Common pitfalls**.

---

## Pattern examples

Components use **DOM-style props** (`onclick`, `oninput`), not legacy `on:click`.

**List** — data + optional selection:

```svelte
<script lang="ts">
    import { List } from "zabi-components"; // or …/atoms
    import { Home } from "@lucide/svelte";

    const items = [
        { id: "1", label: "Home", icon: Home },
        { id: "2", label: "Settings", href: "/settings" },
    ];
</script>

<List items={items} selectedId="1" ariaLabel="Navigation" />
```

**Modal** — `bind:isOpen`, body in the default slot, optional `{#snippet footer()}`:

```svelte
<script lang="ts">
    import { Modal, Button } from "zabi-components";

    let open = $state(false);
</script>

<Button onclick={() => (open = true)}>Open</Button>

<Modal bind:isOpen={open} title="Confirm">
    <p class="text-description">Continue?</p>
    {#snippet footer()}
        <Button variant="secondary" onclick={() => (open = false)}>Cancel</Button>
        <Button onclick={() => (open = false)}>OK</Button>
    {/snippet}
</Modal>
```

**RadioGroup** — `bind:value` or `defaultValue`:

```svelte
<script lang="ts">
    import { RadioGroup } from "zabi-components";

    let plan = $state<string | undefined>("pro");
</script>

<RadioGroup legend="Plan" options={[{ value: "pro", label: "Pro" }]} bind:value={plan} />
```

---

## Design tokens (short)

| Token / class | Role |
|---------------|------|
| `surface-1` / `surface-2` | Layered backgrounds — prefer over raw neutrals so light/dark stay aligned. |
| `.focus-ring` / `focus-ring--nav` | Keyboard focus rings — don’t replace with `outline-none` unless you substitute an equivalent visible focus style. |

Details: [THEME.md](./THEME.md).

---

## Constraints (do / don’t)

**Consumers — imports**

```ts
// ✅ Stable public API
import { Button, Modal } from "zabi-components";
import type { ButtonVariant } from "zabi-components/types";

// ❌ Fragile / unsupported — may break on upgrades
import Button from "some-path/node_modules/zabi-components/dist/atoms/Button.svelte";
```

**Consumers — styling**

Load theme CSS (Quick start). Unstyled components usually mean missing `@import "zabi-components/theme-only"` (and dark overrides if you use `.dark`).

**Library code (contributors)**

```ts
// ❌ App routes are not part of the package graph
import { analytics } from "../../routes/lib/analytics";

// ✅ Shared helpers live next to components
import { generateId } from "../util/ssr-safe.js";

// ❌ Packaging: escaping `dist/` layout (CI fails `npm run check`)
import type { Foo } from "../../types/variants";

// ✅ Depth matches publish layout
import type { Foo } from "../types/variants.js";
```

---

## Common pitfalls

| Issue | What goes wrong | Fix |
|-------|-----------------|-----|
| **Invalid import paths** | Build fails or types missing — deep `dist/` imports, wrong relative depth to `types/`. | Use `package.json` exports only; types from `zabi-components/types` or correct `../types/` inside `src/components`. |
| **Composable misuse** | Missing `NavigationMenu` / `NavigationMenuList` wrapper, or orphan `CardHeader` without `Card`. | Follow the documented parent chain; copy structure from Storybook or package demos. |
| **`outline-none` on custom controls** | WCAG failure — keyboard users see no focus. | Use `.focus-ring`, theme rings, or mirror the focus styles inputs/buttons use. |
| **Legacy Svelte events** | Handlers never run — this library uses `onclick`, not `on:click`. | Use `onclick={handler}` on components that expose it; use `oninput` / native props per component. |

---

## Development (contributors)

| Topic | Rule |
|-------|------|
| Utilities | `src/components/util/` |
| New components | `atoms` / `molecules` / `organisms` by scope |
| Imports | Shallow relatives inside `components`; no `routes/` |
| CSS | Prefer Tailwind + tokens; avoid unnecessary `:global` |

---

## Testing & quality

| Layer | Command | Purpose |
|-------|---------|---------|
| Unit / component | `npm run test` | Vitest + Testing Library — logic and regressions |
| Interaction | `npm run test:e2e` | Playwright — overlays, focus, keyboard flows |

---

## More documentation

[THEME.md](./THEME.md) · [THEMING.md](./THEMING.md) · [docs/theme-imports.md](./docs/theme-imports.md) · [CHANGELOG.md](./CHANGELOG.md)

## License

MIT — see [LICENSE](./LICENSE).
