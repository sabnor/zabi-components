import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

/**
 * A `focus-ring--muted`, `--nav` or `--danger` modifier only sets the ring's
 * colour. The ring itself, and `outline: none`, come from `focus-ring`. Alone,
 * the modifier does nothing: the Alert close button had `focus-ring--muted`
 * without `focus-ring` and showed the browser's default ring, and nothing
 * failed, because both are just class names.
 *
 * Two readings of the source, neither needing a browser:
 *   - a file that uses a modifier must use the base class somewhere;
 *   - a `class="…"` attribute written out in markup must hold the base class
 *     beside the modifier. (Strings joined in script, where the base is in one
 *     string and the modifier in another, are seen whole only at run time:
 *     playwright/focus-ring.spec.ts checks every rendered element.)
 */

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const MODIFIER = /(?<![\w-])focus-ring--[a-z]+/g;
const BASE = /(?<![\w-])focus-ring(?![\w-])/;

function sourceFiles(directory: string): string[] {
    return readdirSync(directory).flatMap((name) => {
        const path = join(directory, name);
        if (statSync(path).isDirectory()) return sourceFiles(path);
        return /\.(svelte|ts|js)$/.test(name) ? [path] : [];
    });
}

/** The value of every `class="…"` attribute, with `{expressions}` left in place. */
function classAttributes(source: string): string[] {
    return [...source.matchAll(/\bclass="([^"]*)"/g)].map((match) => match[1]);
}

export function modifiersWithoutBase(source: string): string[] {
    const problems: string[] = [];
    const modifiers = source.match(MODIFIER) ?? [];
    if (modifiers.length > 0 && !BASE.test(source)) {
        problems.push(`uses ${[...new Set(modifiers)].join(", ")} and never focus-ring`);
    }
    for (const value of classAttributes(source)) {
        const inAttribute = value.match(MODIFIER);
        if (inAttribute && !BASE.test(value)) {
            problems.push(`class="${value.slice(0, 60)}…" has ${inAttribute[0]} without focus-ring`);
        }
    }
    return problems;
}

describe("a focus-ring modifier never appears without focus-ring", () => {
    const files = sourceFiles(join(root, "src"));

    it("finds the modifiers", () => {
        const using = files.filter((file) => (readFileSync(file, "utf8").match(MODIFIER) ?? []).length > 0);
        expect(using.length).toBeGreaterThan(10);
    });

    it("every file and every written-out class attribute has the base class too", () => {
        const problems = files.flatMap((file) =>
            modifiersWithoutBase(readFileSync(file, "utf8")).map((problem) => `${relative(root, file)}: ${problem}`),
        );
        expect(problems).toEqual([]);
    });

    it("sees the defect it is for", () => {
        // The Alert close button as it shipped.
        expect(
            modifiersWithoutBase('<button class="absolute right-2 top-2 focus-ring--muted {TOUCH_HIT_AREA}">'),
        ).toHaveLength(2);
        expect(modifiersWithoutBase('<button class="focus-ring focus-ring--muted">')).toEqual([]);
        // The base in one string and the modifier in another is one element at run time.
        expect(modifiersWithoutBase('const a = "focus-ring"; const b = "bg-transparent focus-ring--danger";')).toEqual([]);
        // A modifier is not the base class.
        expect(modifiersWithoutBase('const b = "focus-ring--nav";')).toHaveLength(1);
    });
});
