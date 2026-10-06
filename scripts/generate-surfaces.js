/**
 * Regenerates the dark-mode surface roles in src/app.css from
 * tokens/surface-ladder.js.
 *
 * Only the `.dark` block is touched: the light levels are white and base-100.
 *
 * What is written is `var(--zabi-base-N)`, a step of the neutral ramp, not hex,
 * so hue and chroma are the ramp's own and the surfaces follow an app's
 * neutral override. The hex in the log below is what those resolve to with
 * the default greys.
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
    generateSurfaceLadderCss,
    SURFACE_STEP,
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

    for (const [name, value] of Object.entries(generateSurfaceLadderCss())) {
        const pattern = new RegExp(`(--color-${name}:\\s*)[^;]+(;)`, 'g');
        const found = (dark.match(pattern) || []).length;
        if (found !== 1) {
            throw new Error(`Expected one --color-${name} declaration in .dark, found ${found}`);
        }
        dark = dark.replace(pattern, `$1${value}$2`);
        rewritten += found;
    }

    fs.writeFileSync(appCssPath, css.slice(0, darkStart) + dark + css.slice(darkEnd), 'utf8');

    console.log(`generate-surfaces: rewrote ${rewritten} dark surface roles (steps of --zabi-base-*)`);
    const page = lightness(levels['surface-base']);
    for (const [name, hex] of Object.entries(levels)) {
        const l = lightness(hex);
        const above = `  ${l - page >= 0 ? '+' : ''}${(l - page).toFixed(1)} L over the page`;
        console.log(`  ${name.padEnd(22)} ${hex}  L ${String(l).padStart(5)}  --zabi-base-${SURFACE_STEP[name]}${above}`);
    }
}

run();
