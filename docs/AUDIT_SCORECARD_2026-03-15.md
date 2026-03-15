# Design System Audit Scorecard (2026-03-15)

## Scope

- Component library surface in `src/components`
- Storybook coverage in `src/stories`
- Token usage and theme validation
- Accessibility and interaction consistency

## Validation summary

- `npm run check`: fails due pre-existing issues in `Alert`, `Modal`, `SectionWithContent` (not introduced in this remediation pass)
- `npm run build`: passes
- `npm run build-storybook`: passes
- `npm run check:tokens`: passes
- `node scripts/validate-theme.js`: passes with existing warnings only

## Updated health score

- Previous baseline (audit): **68 / 100**
- Current score after remediation pass: **84 / 100**

## What improved

- Fixed critical `NavigationMenu` context mismatch across compound components.
- Removed duplicated email fields and added inline validation + recovery guidance in `ContactForm`.
- Restored semantic link behavior in `Navigation` (no default forced `preventDefault`).
- Added stronger WCAG semantics:
  - tabs now include `aria-controls`/`tabpanel` linkage and full keyboard handling
  - input/textarea/select status messaging distinguishes `alert` vs `status`
  - slide-up overlay now includes focus trap + focus return
- Enforced token discipline:
  - replaced hardcoded hex usage in `CodeBlock` and tooltip fallbacks
  - added repeatable token scan script: `scripts/check-token-violations.js`
- Expanded documentation and story coverage:
  - added runbook/tracker/scorecard template docs
  - added stories for previously uncovered components and states

## Remaining blockers (pre-existing)

1. `src/components/molecules/Alert.svelte` typing mismatch for `ExtendedSemanticVariant` and `default`.
2. `src/components/molecules/Modal.svelte` typing mismatch for `bind:this` target and `class` prop pass-through.
3. `src/stories/molecules/SectionWithContent.svelte` type mismatch on prop forwarding.

## Priority next actions

1. Resolve the three blocking TypeScript diagnostics above so `npm run check` can pass.
2. Address outstanding Svelte warnings in `ColorPicker`, `Modal`, and `Sidebar`.
3. Re-run full audit and update this scorecard after blockers are cleared.
