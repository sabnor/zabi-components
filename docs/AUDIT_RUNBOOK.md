# Design System Audit Runbook

Use this runbook to execute a repeatable audit across all exported components.

## Scope

- UI components
- Layout primitives
- Interaction patterns
- Design tokens
- Documentation and stories

## Inputs

- Component exports:
  - `src/components/index.ts`
  - `src/components/atoms/index.ts`
  - `src/components/molecules/index.ts`
  - `src/components/organisms/index.ts`
- Stories: `src/stories`
- Docs: `docs/ACCESSIBILITY.md`, `docs/KEYBOARD_NAVIGATION.md`, `docs/VARIANTS.md`
- Tokens: `src/app.css`

## Step-by-step

1. Build inventory from exports and map to stories.
2. Score each component on maturity dimensions (states, accessibility, responsiveness, docs, token usage).
3. Run interaction-state checks (`default`, `hover`, `focus`, `active`, `disabled`, `loading`, `error` when applicable).
4. Validate accessibility behavior:
   - keyboard navigation
   - focus visibility
   - semantic HTML + ARIA
5. Validate token compliance:
   - run `npm run check:tokens`
   - document approved exceptions
6. Check loading/error/empty states on data and async surfaces.
7. Produce component findings with severity and remediation.
8. Publish global score and top-priority backlog.

## Verification commands

- `npm run check`
- `npm run build`
- `npm run build-storybook`
- `npm run check:tokens`

## Output artifacts

- Per-component scorecards
- Updated global health score
- Prioritized remediation backlog
