#!/usr/bin/env node

/**
 * Post-build: normalize any stray `from '.../routes/lib/...'` in packaged **.svelte**
 * under dist/{atoms,molecules,organisms}. Source components import shared helpers from
 * `../util/*` (resolved to dist/util); this script only fixes legacy or mis-emitted
 * `routes/lib` specifiers so they match the correct depth to `dist/routes/lib/`.
 *
 * If the script reports "already normalized", no action was needed. Do not reintroduce
 * `routes/lib` imports in src/components—use `../util/` for SSR/focus helpers.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, '..', 'dist');
const subdirs = ['atoms', 'molecules', 'organisms'];

/** `from '../'` repeated `depth` times — `depth` = number of path segments under dist/. */
function routesLibImportPrefix(filePath) {
    const dir = path.dirname(filePath);
    const rel = path.relative(distDir, dir);
    const depth = rel.split(path.sep).filter(Boolean).length;
    return '../'.repeat(Math.max(1, depth));
}

/**
 * Normalize any `from '.../routes/lib/…'` (any number of erroneous `../`) to the
 * correct relative path from this file to `dist/routes/lib/`.
 */
function rewriteRoutesLibImports(content, filePath) {
    const prefix = routesLibImportPrefix(filePath);
    return content.replace(
        /from(\s+)(['"])((?:\.\.\/)+)(routes\/lib\/[^'"]+)\2/g,
        (_m, ws, quote, _oldDots, routesRest) =>
            `from${ws}${quote}${prefix}${routesRest}${quote}`,
    );
}

function walkSvelteFiles(dir, out = []) {
    if (!fs.existsSync(dir)) return out;
    for (const name of fs.readdirSync(dir)) {
        const full = path.join(dir, name);
        const st = fs.statSync(full);
        if (st.isDirectory()) {
            walkSvelteFiles(full, out);
        } else if (name.endsWith('.svelte')) {
            out.push(full);
        }
    }
    return out;
}

let totalFiles = 0;

for (const sub of subdirs) {
    const root = path.join(distDir, sub);
    for (const filePath of walkSvelteFiles(root)) {
        const original = fs.readFileSync(filePath, 'utf-8');
        const next = rewriteRoutesLibImports(original, filePath);
        if (next !== original) {
            fs.writeFileSync(filePath, next, 'utf-8');
            totalFiles += 1;
            console.log(`✓ Fixed routes/lib imports in ${path.relative(distDir, filePath)}`);
        }
    }
}

if (totalFiles === 0) {
    console.log('✓ Package routes/lib import paths already normalized');
} else {
    console.log(`✓ Normalized routes/lib imports in ${totalFiles} file(s)`);
}
