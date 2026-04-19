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

Some versions of `@lucide/svelte` ship per-icon `.d.ts` files that confuse certain TypeScript setups. The published package runs **`postinstall`** → `scripts/fix-lucide-svelte-icon-dts.js` (the script is included in the npm tarball). Keep install scripts enabled, or run that script manually after install if you use `--ignore-scripts`.
