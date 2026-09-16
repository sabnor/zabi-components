/**
 * Regenerates the chromatic ramps in src/app.css from tokens/chromatic-scales.js.
 *
 * Every `--zabi-<ramp>-<step>: <hex>;` declaration is rewritten in place, in both
 * the `@theme` block and the `.dark` mirror block (they must stay byte-identical
 * — the dark block exists so `zabi-components/theme-dark-only` can be imported
 * standalone).
 *
 * Run via `npm run sync:tokens`, which `npm run build:css` calls.
 * Verify with `node scripts/check-ramp-lightness.js`.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateAllRamps, RAMP_STEPS, measureLightness, TARGET_LIGHTNESS } from '../tokens/chromatic-scales.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appCssPath = path.join(__dirname, '../src/app.css');

function run() {
    const ramps = generateAllRamps();
    let css = fs.readFileSync(appCssPath, 'utf8');
    let rewritten = 0;

    for (const [name, ramp] of Object.entries(ramps)) {
        for (const step of RAMP_STEPS) {
            const pattern = new RegExp(`(--zabi-${name}-${step}:\\s*)#[0-9a-fA-F]{3,8}(;)`, 'g');
            const before = css;
            css = css.replace(pattern, `$1${ramp[step]}$2`);
            if (before !== css) rewritten += (before.match(pattern) || []).length;
        }
    }

    fs.writeFileSync(appCssPath, css, 'utf8');

    const names = Object.keys(ramps);
    console.log(`generate-ramps: rewrote ${rewritten} declarations across ${names.length} ramps`);
    console.log('  step    ' + RAMP_STEPS.map((s) => String(s).padStart(8)).join(''));
    console.log('  target  ' + RAMP_STEPS.map((s) => String(TARGET_LIGHTNESS[s]).padStart(8)).join(''));
    for (const [name, ramp] of Object.entries(ramps)) {
        const measured = RAMP_STEPS.map((s) => String(measureLightness(ramp[s])).padStart(8)).join('');
        console.log('  ' + name.padEnd(8) + measured);
    }
}

run();
