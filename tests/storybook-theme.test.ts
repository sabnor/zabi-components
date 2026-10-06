import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { resolveTokenColor } from "../scripts/resolve-tokens.js";

/**
 * Storybook's manager is rendered outside the preview's stylesheet, so
 * `.storybook/zabi-theme.ts` has to copy its colours as hex values instead of
 * reading tokens. A copy can drift: the ramps were regenerated in 8.0.0 and a
 * hand-written colour page kept documenting the old ones. This fails when a
 * colour in the Storybook theme is no longer a value the stylesheet defines.
 */

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const themeSource = fs.readFileSync(
    path.join(root, ".storybook/zabi-theme.ts"),
    "utf-8",
);
const appCss = fs.readFileSync(path.join(root, "src/app.css"), "utf-8");

const hexPattern = /#[0-9a-fA-F]{6}\b/g;

/** Comments name tokens and may cite values; only the code is checked. */
const themeCode = themeSource
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/.*$/gm, "");

const themeColours = [...new Set(themeCode.match(hexPattern) ?? [])].map(
    (hex) => hex.toLowerCase(),
);

const literalColours = [
    ...appCss.matchAll(/--[\w-]+\s*:\s*(#[0-9a-fA-F]{6})\s*;/g),
].map(([, hex]) => hex.toLowerCase());

describe("Storybook theme", () => {
    it("has colours to check", () => {
        expect(themeColours.length).toBeGreaterThan(10);
        expect(stylesheetColours.size).toBeGreaterThan(50);
    });

    it.each(themeColours)("%s is a value defined in src/app.css", (hex) => {
        expect(stylesheetColours.has(hex)).toBe(true);
    });
});

/**
 * The check above only asks whether a colour exists somewhere in the
 * stylesheet. That let `appBg` stay at `#f4f4f5` after the page surface moved
 * to `#ececee`: the old value is still a ramp step, just no longer the page.
 *
 * So where a line's comment names the token it mirrors (`// dark
 * --color-surface-base`), the value has to be what that token resolves to in
 * that theme.
 */
function declarations(block: string): Record<string, string> {
    const map: Record<string, string> = {};
    for (const [, name, value] of block.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
        map[name] = value.replace(/\/\*[\s\S]*?\*\//g, "").trim();
    }
    return map;
}

const lightTokens = declarations(/@theme\s*\{([\s\S]*?)\n\}/.exec(appCss)?.[1] ?? "");
const darkTokens = {
    ...lightTokens,
    ...declarations(/\n\.dark\s*\{([\s\S]*?)\n\}/.exec(appCss)?.[1] ?? ""),
};

/**
 * The colour a token computes to. The dark surface levels are `color-mix()`
 * over the neutral ramp rather than hex literals, so they are evaluated the
 * way the browser would, not read off the declaration.
 */
function resolveToken(map: Record<string, string>, token: string): string | undefined {
    return resolveTokenColor(map, token) ?? undefined;
}

/** Every literal in the stylesheet, plus every colour a token resolves to. */
const stylesheetColours = new Set<string>(literalColours);
for (const map of [lightTokens, darkTokens]) {
    for (const token of Object.keys(map)) {
        const colour = resolveToken(map, token);
        if (colour) stylesheetColours.add(colour);
    }
}

/** [theme, property, hex, token] for every annotated line of one `create({ … })` call. */
function annotated(theme: "light" | "dark"): [string, string, string, string][] {
    const body = new RegExp(`export const ${theme} = create\\(\\{([\\s\\S]*?)\\n\\}\\);`).exec(themeSource)?.[1] ?? "";
    return [...body.matchAll(/(\w+):\s*'(#[0-9a-fA-F]{6})',?\s*\/\/[^\n]*?(--color-[\w-]+)/g)].map(
        ([, property, hex, token]) => [theme, property, hex.toLowerCase(), token],
    );
}

describe("Storybook theme values that name their token", () => {
    const cases = [...annotated("light"), ...annotated("dark")];

    it("has annotated values in both themes", () => {
        expect(cases.filter(([theme]) => theme === "light").length).toBeGreaterThan(5);
        expect(cases.filter(([theme]) => theme === "dark").length).toBeGreaterThan(3);
    });

    it.each(cases)("%s %s %s is what %s resolves to", (theme, _property, hex, token) => {
        expect(resolveToken(theme === "dark" ? darkTokens : lightTokens, token)).toBe(hex);
    });
});
