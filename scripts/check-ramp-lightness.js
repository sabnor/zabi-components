/**
 * Fails when a colour ramp drifts off the shared lightness curve.
 *
 * Two things are checked, and each corresponds to a real defect this system
 * shipped with:
 *
 *   1. ABSOLUTE — every `<ramp>-<step>` must sit within LIGHTNESS_TOLERANCE of
 *      TARGET_LIGHTNESS[step]. Without this, `<ramp>-600` means a different
 *      lightness in each ramp, and the semantic family (success / warning /
 *      error / info / energetic) reads as six unrelated colours. The ramps
 *      previously spanned L* 34.6 to 75.0 at step 500 — a 40-point spread.
 *
 *   2. CONTINUITY — no two adjacent steps may differ by more than
 *      MAX_STEP_DELTA. Without this a ramp can develop a cliff: pine used to
 *      fall 29.8 points between 400 and 500, which made half the ramp
 *      unusable because 500–950 were all crowded together at the dark end.
 *
 * Run: node scripts/check-ramp-lightness.js
 * Wired into `npm run build:css` via scripts/validate-theme.js.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
    RAMP_STEPS,
    TARGET_LIGHTNESS,
    LIGHTNESS_TOLERANCE,
    MAX_STEP_DELTA,
    RAMP_SEEDS,
    measureLightness,
} from '../tokens/chromatic-scales.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appCssPath = path.join(__dirname, '../src/app.css');

function readRampFromCss(css, name) {
    const ramp = {};
    for (const step of RAMP_STEPS) {
        const m = css.match(new RegExp(`--zabi-${name}-${step}:\\s*(#[0-9a-fA-F]{3,8});`));
        if (m) ramp[step] = m[1];
    }
    return ramp;
}

function main() {
    const css = fs.readFileSync(appCssPath, 'utf8');
    const failures = [];
    const rampNames = Object.keys(RAMP_SEEDS);

    console.log('🔍 Validating ramp lightness against the shared curve...');
    console.log('  step    ' + RAMP_STEPS.map((s) => String(s).padStart(7)).join(''));
    console.log('  target  ' + RAMP_STEPS.map((s) => String(TARGET_LIGHTNESS[s]).padStart(7)).join(''));

    for (const name of rampNames) {
        const ramp = readRampFromCss(css, name);
        const missing = RAMP_STEPS.filter((s) => !ramp[s]);
        if (missing.length) {
            failures.push(`${name}: missing steps ${missing.join(', ')} in src/app.css`);
            continue;
        }

        const measured = RAMP_STEPS.map((s) => measureLightness(ramp[s]));
        console.log('  ' + name.padEnd(8) + measured.map((l) => String(l).padStart(7)).join(''));

        RAMP_STEPS.forEach((step, i) => {
            const drift = Math.abs(measured[i] - TARGET_LIGHTNESS[step]);
            if (drift > LIGHTNESS_TOLERANCE) {
                failures.push(
                    `${name}-${step} is L* ${measured[i]}, target ${TARGET_LIGHTNESS[step]} ` +
                    `(off by ${drift.toFixed(1)}, tolerance ${LIGHTNESS_TOLERANCE})`,
                );
            }
        });

        for (let i = 0; i < measured.length - 1; i += 1) {
            const delta = Math.abs(measured[i] - measured[i + 1]);
            if (delta > MAX_STEP_DELTA) {
                failures.push(
                    `${name}: L* jumps ${delta.toFixed(1)} between step ${RAMP_STEPS[i]} and ` +
                    `${RAMP_STEPS[i + 1]} (max ${MAX_STEP_DELTA}) — that is a cliff, not a ramp`,
                );
            }
        }
    }

    if (failures.length) {
        console.error('\n❌ Ramp lightness check failed:\n');
        failures.forEach((f) => console.error('  • ' + f));
        console.error('\n  Fix by editing tokens/chromatic-scales.js and running:');
        console.error('    node scripts/generate-ramps.js\n');
        process.exit(1);
    }

    console.log('✓ All ramps on the shared lightness curve\n');
}

main();
