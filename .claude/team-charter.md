# zabi-components product team — charter

A Svelte 5 + Tailwind v4 component library (atoms / molecules / organisms under `src/components/`), design tokens in `src/app.css` and `tokens/`, a SvelteKit docs/marketing site in `src/routes` + `src/lib`, Storybook stories in `src/stories`, design guard scripts in `scripts/check-*.js`, vitest unit tests in `tests/`, Playwright e2e in `playwright/`.

Sabina hands the team reports (feature requests, investigations, audits); the team turns them into committed, verified work.

## Roles

Agent definitions live in `.claude/agents/`.

- **team-manager** (one, long-lived). Reads each report, verifies its claims against the code, splits it into work packages, orders them, assigns them, reviews the result, runs the gates, commits. Owns the backlog and the git history. Does not write feature code unless a package is trivial.
- **design-systems-engineer** — tokens, `src/app.css`, `tokens/`, ramp/surface generators, theme CSS build, `scripts/check-*.js` guards, theme snapshot.
- **component-engineer** (one or more) — Svelte 5 components, their types in `src/components/types`, index exports, unit tests, Storybook stories, and the catalog/docs entry for each.
- **a11y-qa-engineer** — reviews every package before commit: keyboard, focus, names/roles, reduced motion, touch; writes or extends vitest and Playwright tests; does light/dark visual checks.
- **docs-site-engineer** — `src/routes`, `src/lib/marketing`, `src/lib/showcase`, `.storybook/`, README / THEME.md / THEMING.md / CHANGELOG.md.

Spawn only the roles a package needs. A small package is one engineer plus a QA pass.

## Workflow

1. **Intake.** Read the report. Check each claim against the current code before planning on it; reports can be stale or wrong, and line numbers drift. Record anything that does not hold.
2. **Plan.** Write work packages to `BACKLOG.md` in the session scratchpad (not the repo): id, source report item, files touched, owner role, dependencies, acceptance criteria, status. Order by the report's priority, then by dependency.
3. **Execute.** One writer per file at a time. `src/app.css`, `tokens/`, `src/components/*/index.ts`, `src/components/types`, `CHANGELOG.md` and `package.json` are shared hot spots: serialise packages that touch them. Run packages in parallel only when their file sets are disjoint; use worktree isolation for parallel code work if in doubt (a worktree needs its own `npm ci` or a symlinked `node_modules`).
4. **Verify.** Per package: `npm run check`, `npm test`, and the relevant extras (`npm run test:themes` after any token/CSS change, `npm run test:e2e` for interactive behaviour, `npm run build:lib` before closing a batch). QA reviews the diff. A package with failing gates is not done.
5. **Commit.** The manager commits each package as soon as it is green: one logical change per commit, Conventional Commits in the repo's existing style (`feat(components): …`, `fix(theme): …`, `test(…): …`, `docs(…): …`). Stage explicit paths, never `git add -A`. Add a `CHANGELOG.md` `[Unreleased]` entry with the change. Engineers do not commit.
6. **Report.** Keep `BACKLOG.md` current. Finish with a summary: what shipped (commit hashes), what was deferred and why, what needs Sabina's decision.

## Hard rules

- **No Claude attribution in git history.** No `Co-Authored-By` trailers, no `Claude-Session` trailers, no "Generated with Claude Code" lines. Ever.
- **Do not push, tag, publish to npm, bump the version, or open a PR** unless Sabina asks for it. Local commits only. Releasing is her call.
- **Never commit to `main`.** Work on the branch the brief names. If none is named, check `npm view zabi-components version` against `package.json` and the current branch, branch from the latest release branch, and say which branch you chose.
- **Breaking changes need sign-off.** Removing or renaming a prop, an `exports` subpath or a `--color-*` token, or regenerating the ramps, is breaking for consumers (see `RELEASING.md`). Prefer additive changes with backwards-compatible defaults; if a report item cannot be done without a break, stop that item and escalate.
- **Intentional theme changes** need `UPDATE_SNAPSHOTS=1 npm run test:themes`, and the determinism half of that test must still pass.
- **Never weaken a check to make it pass.** Fix the cause, or escalate.
- Match the surrounding code: naming, comment density, idiom. Read `THEME.md`, `THEMING.md`, `RELEASING.md` and `docs/` before changing what they describe, and update them when behaviour changes.
- Do not leave dev servers or Playwright runs holding ports (`lsof -nP -tiTCP:5180 -sTCP:LISTEN | xargs kill -9` clears a stuck one).

## Environment notes

- There is no CI. Every gate runs locally.
- Headless Chrome cannot render phone widths through `--window-size` (under ~500px it crops instead of reflowing). For mobile QA, emulate the device over CDP.
- If Playwright hangs with no output, see `RELEASING.md`.

## Escalate to Sabina (through the manager's final report) when

- a report item needs a breaking change or a product decision,
- two report items conflict,
- a claim in a report does not reproduce,
- a gate fails for a reason outside the package.

Carry on with everything that does not depend on the answer.
