# Releasing

This project does not use GitHub Actions. Every gate runs on your machine, and
publishing is a manual `npm publish`. The steps below are the ones the old
`publish.yml` workflow ran, in the same order.

## 1. Gates

Run all of these from a clean tree on the branch you intend to release.

```sh
npm run check        # svelte-check, import/layout checks, design checks
npm test             # unit tests (vitest)
npm run test:themes  # theme output: determinism + frozen hashes
npm run test:e2e     # Playwright, full suite
npm run build:lib    # also runs prepublishOnly's work + verify-build.js
```

`npm pack --dry-run` is a useful last look at what will actually ship.

### If a theme test fails on the frozen hashes

The `test:themes` snapshot pins the built CSS. When a token change is
intentional, refresh it — the determinism half of that test must still pass, or
the build is not reproducible and the snapshot is hiding a real problem.

```sh
UPDATE_SNAPSHOTS=1 npm run test:themes
```

### If Playwright hangs with no output

A version too old for the local Node deadlocks in its TypeScript loader,
printing only a DEP0205 `module.register()` warning. Confirm with
`npx playwright test --list`, which does discovery only: if that hangs too, it is
the loader, not your tests. Upgrade `@playwright/test`.

A killed run can leave Vite holding the port, and the next run then fails with
"is already used":

```sh
lsof -nP -tiTCP:5180 -sTCP:LISTEN | xargs kill -9
```

## 2. Version and changelog

Bump `package.json` and move the `[Unreleased]` section under the new version
heading with today's date.

```sh
npm version <major|minor|patch> --no-git-tag-version
```

Judge the bump against **what is published on npm**, not against the previous
commit — a version prepared but never published means consumers skip it
entirely. Check with `npm view zabi-components version`. Removing an `exports`
subpath, renaming or removing a token the theme publishes, or regenerating the
ramps, is breaking for them even if it looks minor in the diff.

"A token the theme publishes" is every name in
`tests/__snapshots__/theme-token-names.snap.json`: the `--color-*` roles, the
`--zabi-*` ramps and the font, radius, shadow and z-index tokens. `THEMING.md`
documents them as the token API. `npm run test:themes` fails when one of those
names is missing from the built CSS, and refreshing the snapshots only ever
adds names, so the only way to remove one is to edit that file by hand. If a
commit does, the release is a major.

Grep the docs for the old version afterwards: `README.md` and `docs/` have
referred to versions that never reached npm.

## 3. Publish

```sh
npm login --registry https://registry.npmjs.org/
npm run publish:npm
```

`prepublishOnly` runs `build:lib`, so the tarball is always rebuilt from source.
A local publish omits `--provenance`, which needs CI's OIDC — harmless, it only
means no verified-build badge on npm.

## 4. Tag and push

```sh
git tag -a v<version> -m "Release <version>"
git push origin main --tags
```

Nothing is triggered by the tag; it is for the record.

## 5. Deploy the site

```sh
vercel deploy --prod
```

The site build is `npm run build:site` (wired to Vercel through the
`vercel-build` script). It builds Storybook first and copies it into
`static/storybook`, which is what the Storybook links in the top bar, the footer
and the docs open. If the project's Build Command is overridden in the Vercel
dashboard, set it to `npm run build:site`, or those links will 404.

The Vercel project is linked by id in `.vercel/`, with no git integration, so
deploys are CLI-only and a push does not trigger one. Publish to npm **before**
deploying: the landing page prints `package.json`'s version next to the install
command, so deploying first advertises a version nobody can install.

## Registry note

`.npmrc` pins this project to `registry.npmjs.org`. Do not remove it. Without
it, a global registry setting (a work Artifactory, say) gets baked into
`package-lock.json`'s `resolved` URLs, which leaks an internal hostname into this
public repo and breaks any build without credentials for that registry.
