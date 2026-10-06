import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { resolveTokenColor } from "../scripts/resolve-tokens.js";

import {
    ACCENTS,
    IRIS,
    applyAccent,
    generatedTheme,
    tokensFor,
} from "../src/lib/marketing/brand-accents";

const appCss = fs.readFileSync(
    path.join(
        path.dirname(fileURLToPath(import.meta.url)),
        "../src/app.css",
    ),
    "utf-8",
);

/** `@theme` holds the light values; `.dark` restates only what changes. */
function declaredValue(token: string, dark: boolean): string | undefined {
    const themeStart = appCss.indexOf("@theme");
    const darkStart = appCss.indexOf("\n.dark");
    const block = dark
        ? appCss.slice(darkStart)
        : appCss.slice(themeStart, darkStart);
    const match = new RegExp(
        `${token.replace(/[-]/g, "\\-")}:\\s*([^;]+);`,
    ).exec(block);
    return match ? match[1].split(/\s+/).join(" ") : undefined;
}

describe("the Iris map", () => {
    /**
     * Iris is written out rather than left empty, so the RebrandDemo can scope a
     * card back to the default theme even while the switcher has put another
     * accent on `:root`. That only works while these match the stylesheet.
     */
    it.each(Object.entries(IRIS.light))(
        "%s matches the light value in app.css",
        (token, value) => {
            expect(declaredValue(token, false)).toBe(value);
        },
    );

    it.each(Object.entries(IRIS.dark))(
        "%s matches the dark value in app.css",
        (token, value) => {
            expect(declaredValue(token, true)).toBe(value);
        },
    );

    it("resolves to a full set of tokens in both themes", () => {
        for (const dark of [false, true]) {
            const tokens = tokensFor("iris", dark);
            expect(Object.keys(tokens).length).toBe(
                Object.keys(IRIS.light).length,
            );
            expect(tokens["--color-action-primary"]).toBeTruthy();
        }
    });

    it("scopes an accent without inheriting the document's", () => {
        // The bug this exists for: Iris used to be an empty map, so a card
        // scoped to Iris showed whatever the switcher had put on the root.
        const root = document.documentElement;
        applyAccent(root, "pine", false);
        expect(root.style.getPropertyValue("--color-action-primary")).not.toBe(
            "",
        );

        expect(tokensFor("iris", false)["--color-action-primary"]).toBe(
            IRIS.light["--color-action-primary"],
        );

        applyAccent(root, "iris", false);
        // Back to Iris means the stylesheet decides again, not a third blend.
        expect(root.style.getPropertyValue("--color-action-primary")).toBe("");
    });
});

/**
 * Contrast for every accent, in both themes.
 *
 * Only the Iris map used to be checked, and only for matching the stylesheet.
 * Pine and Citron were tuned by eye in dark mode and shipped a light focus
 * ring at 2.08:1. The values are resolved the way the browser would: the
 * stylesheet's tokens for the theme, with the accent's overrides on top.
 */
function declarations(block: string): Record<string, string> {
    const map: Record<string, string> = {};
    for (const [, name, value] of block.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
        map[name] = value.replace(/\/\*[\s\S]*?\*\//g, "").trim();
    }
    return map;
}

const themeBlock = /@theme\s*\{([\s\S]*?)\n\}/.exec(appCss)?.[1] ?? "";
const darkBlock = /\n\.dark\s*\{([\s\S]*?)\n\}/.exec(appCss)?.[1] ?? "";
const lightTokens = declarations(themeBlock);
const darkTokens = { ...lightTokens, ...declarations(darkBlock) };

/**
 * Still throws on anything that is not one flat colour. The dark surface
 * levels are an opaque `color-mix()` of two neutral steps, which the shared
 * resolver evaluates to the hex the browser paints.
 */
function resolve(map: Record<string, string>, token: string): string {
    const colour = resolveTokenColor(map, token);
    if (!colour) {
        throw new Error(`${token} (${map[token]}) does not resolve to a flat colour`);
    }
    return colour;
}

function luminance(hex: string): number {
    const [r, g, b] = [1, 3, 5].map((i) => {
        const v = parseInt(hex.slice(i, i + 2), 16) / 255;
        return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
    const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
    return (hi + 0.05) / (lo + 0.05);
}

/** [name, foreground token, background token, minimum ratio] */
const PAIRS: [string, string, string, number][] = [
    ["button label on the primary fill", "--color-action-primary-text", "--color-action-primary", 4.5],
    ["button label on the hover fill", "--color-action-primary-text", "--color-action-primary-hover", 4.5],
    ["button label on the active fill", "--color-action-primary-text", "--color-action-primary-active", 4.5],
    ["primary fill against the page", "--color-action-primary", "--color-surface-base", 3],
    ["primary fill against a card", "--color-action-primary", "--color-surface-raised", 3],
    ["focus ring on the page", "--color-focus-ring", "--color-surface-base", 3],
    ["focus ring on a card", "--color-focus-ring", "--color-surface-raised", 3],
    ["link on the page", "--color-link", "--color-surface-base", 4.5],
    ["link on a card", "--color-link", "--color-surface-raised", 4.5],
];

describe.each(ACCENTS.map((accent) => accent.id))("%s accent contrast", (id) => {
    describe.each([
        ["light", false],
        ["dark", true],
    ] as const)("%s", (_theme, dark) => {
        const map = { ...(dark ? darkTokens : lightTokens), ...tokensFor(id, dark) };

        it.each(PAIRS)("%s", (_name, foreground, background, minimum) => {
            const ratio = contrast(resolve(map, foreground), resolve(map, background));
            expect(Math.round(ratio * 100) / 100).toBeGreaterThanOrEqual(minimum);
        });
    });
});

/**
 * Amber is a generated brand: the site applies whatever `createTheme` returns
 * for the inputs in brand-inputs.ts. The contrast block above already runs
 * over it; this holds it to being a clean result of the generator.
 */
describe("the generated Amber brand", () => {
    const amber = generatedTheme("amber");

    it("comes from createTheme with no warnings", () => {
        expect(amber).toBeDefined();
        expect(amber!.warnings).toEqual([]);
        expect(amber!.options.brand).toBe("#C17B00");
    });

    it("overrides the physical ramps, not the roles", () => {
        const names = Object.keys(tokensFor("amber", false));
        expect(names).toContain("--zabi-brand-600");
        expect(names).toContain("--zabi-base-900");
        expect(names.filter((name) => name.startsWith("--color-"))).toEqual([]);
    });

    it("is one map for light and dark", () => {
        expect(tokensFor("amber", true)).toEqual(tokensFor("amber", false));
    });

    it("clears back to the stylesheet", () => {
        const root = document.documentElement;
        applyAccent(root, "amber", false);
        expect(root.style.getPropertyValue("--zabi-brand-600")).toBe(
            amber!.tokens["--zabi-brand-600"],
        );
        applyAccent(root, "iris", false);
        expect(root.style.getPropertyValue("--zabi-brand-600")).toBe("");
        expect(root.style.getPropertyValue("--zabi-base-900")).toBe("");
    });
});
