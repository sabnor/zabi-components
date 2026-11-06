import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import postcss from "postcss";
// @ts-expect-error plain JS build scripts
import { readThemeMaps } from "../scripts/resolve-tokens.js";
// @ts-expect-error plain JS build scripts
import { themeScopeCss } from "../scripts/theme-scope.js";

const root = process.cwd();
const maps = readThemeMaps(readFileSync(join(root, "src/app.css"), "utf8"));
const generated = themeScopeCss(maps);

/** The declarations of every rule whose selector list holds `selector`, merged. */
function declarationsFor(css: string, selector: string, within?: string): Record<string, string> {
    const out: Record<string, string> = {};
    postcss.parse(css).walkRules((rule) => {
        const inMedia = rule.parent?.type === "atrule" ? (rule.parent as postcss.AtRule).params : undefined;
        if (inMedia !== within) return;
        if (!rule.selectors.map((s) => s.trim().replace(/\s+/g, " ")).includes(selector)) return;
        rule.each((node) => {
            if (node.type === "decl") out[node.prop] = node.value;
        });
    });
    return out;
}

const RESTATED = [
    "--color-action-primary",
    "--color-action-primary-hover",
    "--color-action-primary-active",
    "--color-focus-ring",
    "--color-link",
    "--color-on-brand",
    "--color-action-primary-subtle",
];

describe(".zabi-theme-scope, generated", () => {
    it("restates the primary action, focus ring, link, on-brand and primary-subtle aliases, light", () => {
        const light = declarationsFor(generated.light, ".zabi-theme-scope");
        for (const token of RESTATED) expect(light[token], token).toMatch(/^var\(/);
    });

    it("restates only what a var() or the other theme replaces", () => {
        const light = declarationsFor(generated.light, ".zabi-theme-scope");
        for (const [prop, value] of Object.entries(light)) {
            expect(value.includes("var(") || prop in maps.darkOnly, prop).toBe(true);
        }
    });

    it("a dark scope: [data-theme=dark] and .dark on the scope, and the page's mode under :where", () => {
        const selector = '.zabi-theme-scope[data-theme="dark"]';
        const dark = declarationsFor(generated.dark, selector);
        expect(dark["--color-brand-600"]).toBe("var(--zabi-brand-400)");
        for (const token of RESTATED) expect(dark[token], token).toBeDefined();
        expect(declarationsFor(generated.dark, ".zabi-theme-scope.dark")["--color-brand-600"]).toBe("var(--zabi-brand-400)");
        expect(
            declarationsFor(generated.dark, ':where(.dark, [data-theme="dark"]) .zabi-theme-scope')["--color-brand-600"],
        ).toBe("var(--zabi-brand-400)");
        expect(declarationsFor(generated.dark, selector)["color-scheme"]).toBe("dark");
    });

    it("light inside a dark page: data-theme=light sets the light scheme and text, at higher specificity than the page's mode", () => {
        const light = declarationsFor(generated.light, '.zabi-theme-scope[data-theme="light"]');
        expect(light["color-scheme"]).toBe("light");
        expect(light.color).toBe("var(--color-body)");
        // It carries the light values of what dark replaces, so a dark page's value does not leak in.
        const all = declarationsFor(generated.light, '.zabi-theme-scope[data-theme="light"]');
        expect(Object.keys(all)).toContain("color-scheme");
        const restated = declarationsFor(generated.light, ".zabi-theme-scope");
        expect(restated["--color-surface-raised"]).toBe(maps.light["--color-surface-raised"]);
    });

    it("auto follows the system: light by default, dark under prefers-color-scheme", () => {
        expect(declarationsFor(generated.light, '.zabi-theme-scope[data-theme="auto"]')["color-scheme"]).toBe("light dark");
        const media = "(prefers-color-scheme: dark)";
        expect(declarationsFor(generated.dark, '.zabi-theme-scope[data-theme="auto"]', media)["--color-brand-600"]).toBe(
            "var(--zabi-brand-400)",
        );
        expect(declarationsFor(generated.dark, '.zabi-theme-scope[data-theme="auto"]', media)["color-scheme"]).toBe("dark");
    });
});

const FILES: [string, "light" | "dark" | "both"][] = [
    ["dist/zabi-components-theme.css", "light"],
    ["dist/zabi-components-theme-only.css", "light"],
    ["dist/zabi-components-colors.css", "both"],
    ["dist/zabi-components-theme-dark.css", "dark"],
    ["dist/zabi-components-theme-dark-only.css", "dark"],
    ["dist/zabi-components.css", "both"],
];

describe.skipIf(!FILES.every(([file]) => existsSync(join(root, file))))(".zabi-theme-scope, built", () => {
    for (const [file, halves] of FILES) {
        it(`${file} carries the ${halves} half`, () => {
            const css = readFileSync(join(root, file), "utf8");
            if (halves !== "dark") {
                const light = declarationsFor(css, ".zabi-theme-scope");
                for (const token of RESTATED) expect(light[token], token).toMatch(/^var\(/);
                expect(declarationsFor(css, '.zabi-theme-scope[data-theme="light"]')["color-scheme"]).toBe("light");
            } else {
                expect(declarationsFor(css, ".zabi-theme-scope")["--color-action-primary"]).toBeUndefined();
            }
            if (halves !== "light") {
                const dark = declarationsFor(css, '.zabi-theme-scope[data-theme="dark"]');
                for (const token of RESTATED) expect(dark[token], token).toBeDefined();
                expect(dark["color-scheme"]).toBe("dark");
            } else {
                expect(declarationsFor(css, '.zabi-theme-scope[data-theme="dark"]')["color-scheme"]).toBeUndefined();
            }
        });
    }

    it("the dark half comes after the light half in the prebuilt css, so the page's mode wins at equal specificity", () => {
        const css = readFileSync(join(root, "dist/zabi-components.css"), "utf8");
        expect(css.indexOf(".zabi-theme-scope,")).toBeLessThan(css.indexOf(':where(.dark, [data-theme="dark"]) .zabi-theme-scope'));
    });
});
