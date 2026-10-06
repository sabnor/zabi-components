# Lucide icons used by zabi-components

The package depends on `@lucide/svelte`. Every component imports each icon it uses from that icon's own file:

```ts
import ChevronDown from "@lucide/svelte/icons/chevron-down";
```

No component imports from the package's barrel (`import { ChevronDown } from "@lucide/svelte"`). The barrel re-exports every icon, about 1,700 Svelte files, and a bundler has to read and compile all of them to find the one that is used: a SvelteKit app with a single `<Button>` from this library transformed 3,800 modules for its client build when the library used the barrel, and 366 now. `npm run check` fails on a barrel import anywhere under `src` (the components, the stories, the docs site and the catalog's code samples), in `docs`, `.storybook` and the README, because the examples are what gets copied; `npm run build:lib` fails on one in `dist` (`scripts/lucide-barrel.js`). The one exception is `src/types/IconPropsCheck.svelte`, the type test that proves an icon from the barrel is still accepted by every icon prop.

## In your app

Import icons the same way, one file each. It is the barrel import that is slow, not the number of icons you use.

```svelte
<script lang="ts">
    import { List } from "zabi-components";
    import House from "@lucide/svelte/icons/house";
    import Settings from "@lucide/svelte/icons/settings";

    const items = [
        { id: "1", label: "Home", icon: House },
        { id: "2", label: "Settings", icon: Settings },
    ];
</script>
```

A barrel-imported icon still works wherever a prop takes an icon: the two are the same component with the same type (`src/types/IconPropsCheck.svelte` holds that in `npm run check`). It only costs you the build time described above.

## Icons re-exported from the package root

For convenience the root entry re-exports a few icons: `Sun`, `Moon`, `Monitor`, `Grip`, `GripVertical`, `ChevronUp`, `ChevronDown`, `ChevronRight`, `Zap`, `Briefcase`, `Clipboard` and `Settings`. Each comes from its own file, so `import { Button } from "zabi-components"` does not reach the barrel.

## If your app aliases `@lucide/svelte`

An alias for `@lucide/svelte` itself no longer covers what the library imports: the components ask for `@lucide/svelte/icons/<name>`. If you replace Lucide with a hand-authored set, alias those paths, for each of these files:

`arrow-left`, `arrow-right`, `briefcase`, `check`, `chevron-down`, `chevron-left`, `chevron-right`, `chevron-up`, `circle-alert`, `circle-check-big`, `clipboard`, `command`, `copy`, `external-link`, `grip`, `grip-vertical`, `image`, `image-off`, `info`, `log-out`, `menu`, `monitor`, `moon`, `octagon-alert`, `play`, `plus`, `search`, `settings`, `star`, `sun`, `trash-2`, `triangle-alert`, `user`, `x`, `zap`.

Showcase and demo routes under this repo import additional icons, some of them from the barrel; those are not part of the package.

## Typings for `@lucide/svelte/icons/*`

`@lucide/svelte` 0.544.x ships per-icon `.svelte.d.ts` files with a duplicate `type X = ReturnType<typeof X>` line that makes some TypeScript language services treat them as non-modules, so an editor may report that an icon has no default export. It affects editor tooling only, not runtime and not a build.

The package runs no install scripts in your project, and since 8.1.0 it lists none either: the dev-only `prepare` script is gone, so installing from a tarball no longer makes npm print an `install-scripts` notice.

- In your app: if your editor complains, enable `skipLibCheck` or upgrade `@lucide/svelte`.
- In this repo: `npm run check` (svelte-check) and `npm run build:lib` pass on a fresh install without any patch. If your editor still shows the error, run `npm run fix:lucide-types` once after installing; it strips the duplicate line from the files in `node_modules` and changes nothing else.
