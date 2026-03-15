# Design System Remediation Tracker

This tracker records remediation status for the design system audit findings.

## Severity Acceptance Criteria

- `critical`: must be fixed before merge
- `high`: required in current remediation cycle
- `medium`: required before next publish unless explicitly deferred
- `low`: required before next publish unless explicitly deferred

## Canonical Component Inventory

Source of truth:
- `src/components/index.ts`
- `src/components/atoms/index.ts`
- `src/components/molecules/index.ts`
- `src/components/organisms/index.ts`

### Atoms

`Badge`, `Button`, `Card`, `CardContent`, `CardFooter`, `CardHeader`, `Checkbox`, `CodeBlock`, `ColorPicker`, `FeatureCard`, `Heading`, `IconButton`, `Input`, `OptimizedImage`, `Progress`, `Select`, `Skeleton`, `Textarea`, `ThemeToggle`, `Toast`, `Toggle`, `Tooltip`

### Molecules

`Alert`, `ComponentDemo`, `ContactForm`, `Dropdown`, `Form`, `ImageUpload`, `Modal`, `NavigationMenu`, `NavigationMenuContent`, `NavigationMenuItem`, `NavigationMenuLink`, `NavigationMenuList`, `NavigationMenuTrigger`, `Section`, `Sidebar`, `SlideUp`, `Tabs`

### Organisms

`Navbar`, `Navigation`

## Remediation Board

| ID | Area | Severity | Status | Owner | Evidence |
| --- | --- | --- | --- | --- | --- |
| R-001 | NavigationMenu context key mismatch | critical | fixed | AI agent | `src/components/molecules/navigation-menu-context.ts` |
| R-002 | ContactForm duplicated email fields | high | fixed | AI agent | `src/components/molecules/ContactForm.svelte` |
| R-003 | Navigation link semantics (`preventDefault` + `role="button"`) | high | fixed | AI agent | `src/components/organisms/Navigation.svelte` |
| R-004 | Tabs incomplete ARIA linkage | medium | fixed | AI agent | `src/components/molecules/Tabs.svelte` |
| R-005 | Hardcoded hex colors in components | high | fixed | AI agent | `src/components/atoms/CodeBlock.svelte`, `src/components/atoms/Tooltip.svelte`, `scripts/check-token-violations.js` |
| R-006 | Missing loading/empty/error state coverage | medium | fixed | AI agent | `Select`, `ImageUpload`, and related stories |
| R-007 | Story/docs coverage gaps for exported components | medium | fixed | AI agent | New stories + audit docs added |
| R-008 | Duplicate utility/helper logic | low | fixed | AI agent | Shared `generateId` usage + `createId` alias |
| R-009 | ImageUpload object URL lifecycle cleanup | medium | fixed | AI agent | `src/components/molecules/ImageUpload.svelte` |

## Verification Checklist

- [ ] `npm run check` passes (currently blocked by pre-existing issues outside this remediation scope)
- [x] `npm run build` passes
- [x] `npm run build-storybook` passes
- [x] Keyboard navigation tested for overlays and composite widgets
- [x] Token scan reviewed for unapproved hardcoded values
- [x] Updated global scorecard published
