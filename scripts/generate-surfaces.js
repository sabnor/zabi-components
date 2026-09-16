/**
 * Regenerates the dark-mode surface levels in src/app.css from
 * tokens/surface-ladder.js.
 *
 * Only the `.dark` block is touched: the light levels are white and base-100,
 * which are not washes of anything.
 *
 * Run via `npm run sync:tokens`, which `npm run build:css` calls.
 * Verify with `node scripts/check-surface-elevation.js`.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { converter } from 'culori';
import {
    generateSurfaceLadder,
    SURFACE_ALPHA,
    DARK_BASE,
    WASH,
} from '../tokens/surface-ladder.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appCssPath = path.join(__dirname, '../src/app.css');
const oklch = converter('oklch');

const lightness = (hex) => Math.round(oklch(hex).l * 1000) / 10;

function run() {
    const levels = generateSurfaceLadder();
    const css = fs.readFileSync(appCssPath, 'utf8');

    const darkStart = css.indexOf('\n.dark {');
    if (darkStart === -1) throw new Error('No .dark block found in src/app.css');
    const darkEnd = css.indexOf('\n}', darkStart);
    if (darkEnd === -1) throw new Error('Unterminated .dark block in src/app.css');

    let dark = css.slice(darkStart, darkEnd);
    let rewritten = 0;

    for (const [name, hex] of Object.entries(levels)) {
        const pattern = new RegExp(`(--color-${name}:\\s*)#[0-9a-fA-F]{3,8}(;)`, 'g');
        const before = dark;
        dark = dark.replace(pattern, `$1${hex}$2`);
        if (before !== dark) rewritten += (before.match(pattern) || []).length;
    }

    fs.writeFileSync(appCssPath, css.slice(0, darkStart) + dark + css.slice(darkEnd), 'utf8');

    console.log(
        `generate-surfaces: rewrote ${rewritten} dark surface levels ` +
            `(${WASH} over ${DARK_BASE})`,
    );
    let previous = null;
    for (const [name, hex] of Object.entries(levels)) {
        const l = lightness(hex);
        const alpha = SURFACE_ALPHA[name];
        const step = previous === null ? '' : `  +${(l - previous).toFixed(1)} L`;
        console.log(
            `  ${name.padEnd(17)} ${hex}  L ${String(l).padStart(5)}` +
                `${alpha ? `  wash ${(alpha * 100).toFixed(1)}%` : '  (page)'}${step}`,
        );
        previous = l;
    }
}

run();
