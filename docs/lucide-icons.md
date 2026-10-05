# Lucide icons used by zabi-components

The package depends on `@lucide/svelte`. If your app **aliases** `@lucide/svelte` to a hand-authored barrel, re-export every icon the library imports, or drop the alias and use the real package (or per-icon paths only).

## Packaged components (from the `zabi-components` build)

| Source | Import style | Icons |
|--------|--------------|--------|
| `CodeBlock` | Per-icon path | `check`, `copy` |
| `ThemeToggle` | Barrel | `Sun`, `Moon` |
| `ListItem` | Barrel | `ArrowRight` |
| `Badge` | Barrel | `Check`, `AlertTriangle`, `X`, `Info` |
| `ImageUpload` | Barrel | `Image` |
| `Input` | Barrel | `CheckCircle`, `AlertTriangle`, `AlertCircle` |
| `Select` | Barrel | `ChevronDown`, `CheckCircle`, `AlertTriangle`, `AlertCircle` |
| `SidebarPanel` | Barrel | `Search`, `X` |
| `SidebarAccountPanel` | Barrel | `LogOut`, `Moon`, `Sun`, `User` |
| `SidebarNavigation` | Barrel | `Command`, `Search` |

Showcase and demo routes under this repo import additional icons (e.g. `CircleQuestionMark`, `Heart`); those are **not** required for consumers who only install the library.

## Typings for `@lucide/svelte/icons/*`

`@lucide/svelte` 0.544.x ships per-icon `.svelte.d.ts` files with a duplicate `type X = ReturnType<typeof X>` line that makes some TypeScript language services treat them as non-modules. This affects editor tooling only, not runtime or builds with `skipLibCheck`.

Since 8.0.0 the package **does not run any install scripts** in your project. If your editor reports missing icon exports such as `Check` or `Copy`, prefer importing per-icon paths (`@lucide/svelte/icons/check`), enable `skipLibCheck`, or upgrade `@lucide/svelte`. Contributors to this repo get the patch automatically via the dev-only `prepare` script.

That `prepare` script is still listed in the published `package.json`. npm does not run `prepare` for a package installed from the registry, and does not mention it. If you install from a tarball file or a URL instead, npm 11 prints an `install-scripts` warning that names it (`prepare: node scripts/fix-lucide-svelte-icon-dts.js`). Nothing has run, and the script's file is not in the package: there is nothing to approve, and the warning can be ignored.
