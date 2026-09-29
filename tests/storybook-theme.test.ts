import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

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

const stylesheetColours = new Set(
    [...appCss.matchAll(/--[\w-]+\s*:\s*(#[0-9a-fA-F]{6})\s*;/g)].map(
        ([, hex]) => hex.toLowerCase(),
    ),
);

describe("Storybook theme", () => {
    it("has colours to check", () => {
        expect(themeColours.length).toBeGreaterThan(10);
        expect(stylesheetColours.size).toBeGreaterThan(50);
    });

    it.each(themeColours)("%s is a value defined in src/app.css", (hex) => {
        expect(stylesheetColours.has(hex)).toBe(true);
    });
});
