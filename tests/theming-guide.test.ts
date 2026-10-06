import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import {
    ALL_DOCUMENTED_TOKENS,
    COLOR_TOKENS,
    SHAPE_TOKENS,
    TYPE_TOKENS,
} from "../src/lib/marketing/theme-tokens";

/**
 * The theming guide is the token API, so it must not name a token the theme
 * does not publish.
 *
 * The list of published names is tests/__snapshots__/theme-token-names.snap.json,
 * which `npm run test:themes` keeps equal to the built CSS and never lets
 * shrink. Every custom property the published docs and the site's token
 * tables mention is checked against it here.
 */

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf-8");

const published = new Set<string>(
    JSON.parse(read("tests/__snapshots__/theme-token-names.snap.json")),
);

/** The docs that ship in the package (`files` in package.json), plus the README. */
const DOCS = ["THEMING.md", "THEME.md", "docs/theme-imports.md", "README.md"];

/** Things that start with two hyphens and are not tokens of the theme. */
const NOT_TOKENS = new Set([
    // zabi-theme options
    "--brand",
    "--accent",
    "--neutral",
    "--out",
    "--strict",
    "--set",
    "--set-light",
    "--set-dark",
    "--neutral-chroma",
    "--help",
    "--pin",
    "--pin-accent",
    // placeholders the docs use for a token of your own
    "--my-gap",
    "--token",
    // other commands the docs quote
    "--exit-code",
    "--dry-run",
    "--no-git-tag-version",
    "--provenance",
    "--access",
    "--registry",
    "--tags",
    "--grep",
    "--quiet",
    // THEME.md's example of a token an app adds for itself
    "--color-quiz-gold",
]);

/**
 * Custom properties a component reads for itself, which the guide documents
 * under "Component-level properties". They are not tokens of the theme, so
 * they are not in the published list, and they are allowed here on one
 * condition, checked below: the component named really reads them. A property
 * the guide promises and no component reads is as wrong as an unpublished
 * token.
 */
const COMPONENT_PROPERTIES: Record<string, string> = {
    "--zabi-rating-on": "src/components/atoms/Rating.svelte",
    "--zabi-rating-on-hover": "src/components/atoms/Rating.svelte",
    "--zabi-rating-on-active": "src/components/atoms/Rating.svelte",
    "--zabi-rating-on-edge": "src/components/atoms/Rating.svelte",
    "--zabi-rating-off": "src/components/atoms/Rating.svelte",
    // Button reads these through `rounded-button` and `font-button`, which are in the stylesheet.
    "--zabi-button-radius": "src/app.css",
    "--zabi-button-font-weight": "src/app.css",
};

function mentioned(text: string): string[] {
    // Not after `#`: `#--set-and-overrides` is a link to a heading.
    const names = text.match(/(?<![\w#-])--[a-z][a-z0-9-]*/g) ?? [];
    return [...new Set(names)].filter((name) => !NOT_TOKENS.has(name) && !(name in COMPONENT_PROPERTIES));
}

/**
 * `--zabi-brand-*` and `--color-<family>-subtle` reach us as `--zabi-brand-`
 * and `--color-`: a prefix, which has to be the start of a real token.
 */
function exists(name: string): boolean {
    if (published.has(name)) return true;
    if (!name.endsWith("-")) return false;
    return [...published].some((token) => token.startsWith(name));
}

describe.each(DOCS)("%s", (file) => {
    it("names only tokens the theme publishes", () => {
        const unknown = mentioned(read(file)).filter((name) => !exists(name));
        expect(unknown).toEqual([]);
    });
});

describe("component-level properties in the guide", () => {
    const guide = read("THEMING.md");

    it.each(Object.entries(COMPONENT_PROPERTIES))("%s is read by %s with a fallback, and is not declared there", (name, file) => {
        const source = read(file);
        // Read with a fallback: an app's value, from the component or from around it, wins.
        expect(source).toContain(`var(${name},`);
        // Declared on the component it could only be overridden by an inline style.
        expect(new RegExp(`(?<![\\w-])${name}\\s*:`).test(source)).toBe(false);
    });

    it("documents every one of them, and none is a published token", () => {
        for (const name of Object.keys(COMPONENT_PROPERTIES)) {
            expect(guide, name).toContain(`\`${name}\``);
            expect(published.has(name), name).toBe(false);
        }
    });
});

describe("the token tables on the theming page", () => {
    it("list only published tokens", () => {
        expect(ALL_DOCUMENTED_TOKENS.filter((name) => !published.has(name))).toEqual([]);
    });

    it("promise as settable only what THEMING.md documents", () => {
        const guide = read("THEMING.md");
        const settable = [...COLOR_TOKENS, ...TYPE_TOKENS, ...SHAPE_TOKENS].flatMap((row) =>
            // A ramp is written in the guide as its first and last step.
            row.tokens.length > 8 && row.tokens[0].startsWith("--zabi-")
                ? [row.tokens[0], row.tokens[row.tokens.length - 1]]
                : row.tokens,
        );
        expect(settable.filter((name) => !guide.includes(`\`${name}\``))).toEqual([]);
    });
});
