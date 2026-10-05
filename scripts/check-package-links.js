#!/usr/bin/env node
/**
 * A link in a published document must lead somewhere in the package.
 *
 * The README linked `./CHANGELOG.md` and `./RELEASING.md`, and the tarball had
 * neither: on npm, and in an app's node_modules, both links were dead. Nothing
 * noticed, because in the repository every file is there.
 *
 * So each Markdown file that ships is read for relative links, and each target
 * has to be covered by `files` in package.json (or be one of the files npm
 * always packs) and has to exist. A link to something that is only in the
 * repository has to be written as a link to the repository.
 *
 * Run: node scripts/check-package-links.js
 * Also run by scripts/verify-build.js (`npm run build:lib`) and by
 * tests/package-links.test.ts (`npm test`).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const defaultRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

/** npm packs these whatever `files` says. */
const ALWAYS_PACKED = /^(package\.json|readme(\.[^/]*)?|licen[cs]e(\.[^/]*)?)$/i;

/**
 * @param {string} projectRoot
 * @param {{ files?: string[], read?: (relative: string) => string | null }} [overrides]
 *   For tests: another `files` list, or other document contents.
 */
export function findDeadPackageLinks(projectRoot = defaultRoot, overrides = {}) {
    const manifest = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8'));
    const entries = (overrides.files ?? manifest.files ?? []).map((entry) => entry.replace(/^\.\//, '').replace(/\/$/, ''));
    const packed = (relative) =>
        ALWAYS_PACKED.test(relative) || entries.some((entry) => relative === entry || relative.startsWith(`${entry}/`));
    const read = (relative) => {
        const given = overrides.read?.(relative);
        if (given !== undefined && given !== null) return given;
        const absolute = path.join(projectRoot, relative);
        return fs.existsSync(absolute) && fs.statSync(absolute).isFile() ? fs.readFileSync(absolute, 'utf8') : null;
    };

    const documents = [...new Set(['README.md', ...entries])].filter(
        (entry) => entry.toLowerCase().endsWith('.md') && read(entry) !== null,
    );

    const dead = [];
    for (const document of documents) {
        // A fenced block is an example, not a link in the page.
        const text = read(document).replace(/```[\s\S]*?```/g, '');
        for (const match of text.matchAll(/\]\(\s*<?([^)\s>]+)>?(?:\s+"[^"]*")?\s*\)/g)) {
            const target = match[1];
            // A URL, or a heading in the same file.
            if (/^([a-z][a-z0-9+.-]*:|\/\/|#)/i.test(target)) continue;
            const file = target.split('#')[0].split('?')[0];
            if (!file) continue;
            const relative = path.posix.normalize(path.posix.join(path.posix.dirname(document), file));
            if (relative.startsWith('..')) {
                dead.push(`${document}: ${target} points outside the package`);
            } else if (!packed(relative)) {
                dead.push(`${document}: ${target} (${relative} is not in "files" of package.json)`);
            } else if (!fs.existsSync(path.join(projectRoot, relative))) {
                dead.push(`${document}: ${target} (${relative} does not exist)`);
            }
        }
    }
    return { dead, documents };
}

const invokedDirectly = import.meta.url === pathToFileURL(process.argv[1] ?? '').href;
if (invokedDirectly) {
    const { dead, documents } = findDeadPackageLinks();
    if (dead.length > 0) {
        console.error('❌ A published document links to a file that is not in the package:');
        dead.forEach((where) => console.error(`   - ${where}`));
        console.error('   Add the file to "files" in package.json, or link to it in the repository.');
        process.exit(1);
    }
    console.log(`✓ Relative links in ${documents.join(', ')} all lead to packaged files`);
}
