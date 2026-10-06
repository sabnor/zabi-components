/**
 * Finds imports from the `@lucide/svelte` barrel.
 *
 * `import { X } from "@lucide/svelte"` looks harmless and tree-shakes out of
 * the final bundle, but a bundler has to read the barrel to know that, and
 * the barrel re-exports every icon: about 1,700 Svelte files, each compiled.
 * An app that rendered one Button from this library transformed 3,800 modules
 * for it. `@lucide/svelte/icons/<name>` is one file.
 *
 * `@lucide/svelte/icons` (no name) is the same barrel under another path.
 *
 * Used by scripts/check-component-imports.js on the source and by
 * scripts/verify-build.js on what is packaged.
 */

import fs from 'fs';
import path from 'path';

/** A module specifier that is the barrel, in `from "..."`, `import "..."` or `import("...")`. */
export const LUCIDE_BARREL_RE = /(?:from|import)\s*\(?\s*['"]@lucide\/svelte(?:\/icons)?['"]/;

/** Line by line, so a message can say where. Comments are skipped: prose may quote the import. */
export function lucideBarrelLines(text) {
    const found = [];
    const lines = text.split('\n');
    for (let index = 0; index < lines.length; index += 1) {
        const line = lines[index];
        if (/^\s*(?:\/\/|\/\*|\*)/.test(line)) continue;
        if (LUCIDE_BARREL_RE.test(line)) found.push(index + 1);
    }
    // An import whose braces span lines ends in `} from "@lucide/svelte"`,
    // which the line test above already matches.
    return found;
}

/** Every `file:line` under `dir` (files with one of `extensions`) that imports the barrel. */
export function findLucideBarrelImports(dir, extensions, relativeTo = dir) {
    const found = [];
    const walk = (current) => {
        if (!fs.existsSync(current)) return;
        for (const name of fs.readdirSync(current)) {
            const full = path.join(current, name);
            if (fs.statSync(full).isDirectory()) {
                if (name !== 'node_modules') walk(full);
            } else if (extensions.some((extension) => name.endsWith(extension))) {
                for (const line of lucideBarrelLines(fs.readFileSync(full, 'utf8'))) {
                    found.push(`${path.relative(relativeTo, full)}:${line}`);
                }
            }
        }
    };
    walk(dir);
    return found;
}
