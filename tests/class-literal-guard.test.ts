import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Tailwind generates only the classes it finds as text in the source, in the
 * library's stylesheet and in a consumer's. A class put together from a run-time
 * value (`max-sm:${clip}`, `w-[${px}px]`, `duration-${n}`) is in no stylesheet,
 * so it does nothing, and a test in jsdom cannot see that: the class is on the
 * element, the rule is not in the page (Z-105: the snackbar slid in over the tab
 * bar). Write each class out whole; to vary a value, set a CSS variable in
 * `style` and read it in a class written out whole.
 *
 * Ids (`${uid}-bars`), inline `style` strings and a whole class held in a
 * variable (`${veil}bg-x`, `${className}`) are not matched: only a variant
 * prefix or a utility name or an arbitrary value with an interpolation glued
 * into it.
 */
const SRC = join(__dirname, "..", "src", "components");

const UTILITY =
    "(?:w|h|min-w|max-w|min-h|max-h|size|top|bottom|left|right|start|end|inset(?:-[xy])?|p[xytblrse]?|m[xytblrse]?|gap(?:-[xy])?|space-[xy]|translate-[xy]|z|duration|delay|ease|grid-cols|grid-rows|col-span|row-span|basis|opacity|leading|tracking|text|bg|border|ring|rounded|shadow|order|flex|grow|shrink|scale|rotate)";
const VARIANT =
    "(?:max-)?(?:sm|md|lg|xl|2xl|hover|focus|focus-visible|focus-within|active|disabled|dark|group-hover|peer-[a-z-]+|motion-reduce|motion-safe|pointer-coarse|pointer-fine|data-\\[[^\\]]*\\]|aria-[a-z-]+|has-\\[[^\\]]*\\])";
const START = "(?:^|[\\s`\"'])";

export const PATTERNS: Array<[string, RegExp]> = [
    ["a variant prefix with an interpolation", new RegExp(`${START}(?:[a-z0-9-]+:)*${VARIANT}:\\$\\{`, "m")],
    ["a utility name with an interpolation", new RegExp(`${START}(?:[a-z0-9-]+:)*-?${UTILITY}-\\$\\{`, "m")],
    ["an arbitrary value with an interpolation", new RegExp(`${START}(?:[a-z0-9-]+:)*-?[a-z-]+-\\[[^\\]\\s\`"']*\\$\\{`, "m")],
    ["an interpolation inside a class's brackets", new RegExp(`${START}(?:[a-z0-9-]+:)*\\[[a-z-]+:[^\\]\\s\`"']*\\$\\{`, "m")],
];

/** Lines that are comment text only, or an id that only looks like a class (`p-0` as a section key). */
const isComment = (line: string) => /^\s*(?:\/\/|\*|\/\*|<!--)/.test(line) || /\b(?:sectionKey|key|id)=/.test(line);

export function findRuntimeClasses(source: string): string[] {
    const found: string[] = [];
    for (const line of source.split("\n")) {
        if (isComment(line) || !line.includes("${")) continue;
        for (const [what, pattern] of PATTERNS) {
            if (pattern.test(line)) found.push(`${what}: ${line.trim()}`);
        }
    }
    return found;
}

function files(dir: string): string[] {
    return readdirSync(dir).flatMap((name) => {
        const path = join(dir, name);
        if (statSync(path).isDirectory()) return files(path);
        return /\.(svelte|ts)$/.test(name) ? [path] : [];
    });
}

describe("class names are written out whole", () => {
    it("recognises the shapes it is there to stop", () => {
        for (const bad of [
            "const c = `max-sm:${clip}`;",
            'class={`w-[${px}px]`}',
            'class={`bottom-[${offset}] fixed`}',
            "const d = `duration-${ms}`;",
            "const m = `mt-${gap}`;",
            "const v = `[clip-path:${shape}]`;",
            "const h = `hover:${tone}`;",
        ]) {
            expect(findRuntimeClasses(bad), bad).not.toEqual([]);
        }
    });

    it("leaves ids, styles and whole classes held in variables alone", () => {
        for (const fine of [
            "const clipId = `${uid}-bars`;",
            "style:transform={`translate3d(${x}px, ${y}px, 0)`}",
            "return `${veil}bg-action-danger text-action-danger-text`;",
            "cn(`flex w-full ${className}`)",
            "const labelId = `${fieldId}-label`;",
            "// `max-sm:${clip}` was the Z-105 mistake",
        ]) {
            expect(findRuntimeClasses(fine), fine).toEqual([]);
        }
    });

    it("finds no class in src/components that is put together at run time", () => {
        const found = files(SRC).flatMap((file) =>
            findRuntimeClasses(readFileSync(file, "utf8")).map((hit) => `${file.slice(SRC.length + 1)}: ${hit}`),
        );
        expect(found).toEqual([]);
    });

    it("has the Toaster's clip written out for both modes", () => {
        const source = readFileSync(join(SRC, "molecules", "Toaster.svelte"), "utf8");
        expect(source).toContain('"[clip-path:inset(-100vh_-100vw_0_-100vw)]"');
        expect(source).toContain('"max-sm:[clip-path:inset(-100vh_-100vw_0_-100vw)]"');
    });
});
