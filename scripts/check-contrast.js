/**
 * Fails when any fill/foreground pair the components can produce falls below
 * WCAG AA, in either theme.
 *
 * The pairs below are the ones a component actually renders — a badge fill and
 * its label, a button and its text, message text on a page surface. Each is
 * resolved through the same token chain the CSS uses, so the check breaks if a
 * token is re-pointed at a step that no longer contrasts.
 *
 * This exists because the failures were not obvious by eye in both themes at
 * once: solid badges passed in dark (4.0–7.7) and failed in light (warning
 * 2.15, energetic 1.97), because the label colour was bound to the surface
 * token rather than chosen per fill.
 *
 * Run: node scripts/check-contrast.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appCssPath = path.join(__dirname, '../src/app.css');

const AA_NORMAL = 4.5;
const AA_LARGE = 3.0;

/* ---------- colour maths ---------- */

function channel(c) {
    const v = c / 255;
    return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
    const h = hex.replace('#', '');
    const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
    const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
    return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrast(a, b) {
    const la = luminance(a);
    const lb = luminance(b);
    const hi = Math.max(la, lb);
    const lo = Math.min(la, lb);
    return Math.round(((hi + 0.05) / (lo + 0.05)) * 100) / 100;
}

/**
 * CIELAB ΔE*ab. Luminance contrast is blind to hue: a green `success-subtle`
 * tint and a neutral grey page can sit at 1.06:1 and still be obviously
 * different colours, while two identical greys also sit near 1:1. Only a
 * perceptual distance tells those two cases apart.
 */
function lab(hex) {
    const h = hex.replace('#', '');
    const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
    const [r, g, b] = [0, 2, 4].map((i) => channel(parseInt(full.slice(i, i + 2), 16)));

    // Linear sRGB → XYZ (D65), then XYZ → Lab.
    const x = (0.4124 * r + 0.3576 * g + 0.1805 * b) / 0.95047;
    const y = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const z = (0.0193 * r + 0.1192 * g + 0.9505 * b) / 1.08883;

    const f = (t) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
    const [fx, fy, fz] = [f(x), f(y), f(z)];
    return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
}

function deltaE(a, b) {
    const [l1, a1, b1] = lab(a);
    const [l2, a2, b2] = lab(b);
    return Math.round(Math.hypot(l1 - l2, a1 - a2, b1 - b2) * 100) / 100;
}

/* ---------- token resolution ---------- */

/**
 * Parse the `@theme` block (light) and the `.dark` block into flat maps, then
 * follow `var(--x)` chains to a literal hex.
 */
function parseTheme(css) {
    const themeMatch = css.match(/@theme\s*\{([\s\S]*?)\n\}/);
    const darkMatch = css.match(/\n\.dark\s*\{([\s\S]*?)\n\}/);
    if (!themeMatch) throw new Error('No @theme block found in src/app.css');
    if (!darkMatch) throw new Error('No .dark block found in src/app.css');

    const read = (block) => {
        const map = {};
        const re = /(--[\w-]+)\s*:\s*([^;]+);/g;
        let m;
        while ((m = re.exec(block))) map[m[1]] = m[2].trim();
        return map;
    };

    const light = read(themeMatch[1]);
    const dark = { ...light, ...read(darkMatch[1]) };
    return { light, dark };
}

function resolve(map, token, depth = 0) {
    if (depth > 20) return null;
    let value = map[token];
    if (!value) return null;
    value = value.replace(/\/\*[\s\S]*?\*\//g, '').trim();
    if (value.startsWith('#')) return value;
    const varMatch = value.match(/^var\((--[\w-]+)\)$/);
    if (varMatch) return resolve(map, varMatch[1], depth + 1);
    return null; // rgba()/color-mix() — not a flat colour, skipped by design
}

/* ---------- interaction fills must differ from what they sit on ---------- */

/**
 * A fill that resolves to exactly the surface behind it is invisible, and no
 * contrast pair catches it because both sides of the pair are "correct".
 *
 * `--color-nav-menu-hover` and `--color-neutral-subtle` both pointed at
 * `base-100`, which IS `--color-surface-base` in BOTH themes — so sidebar row
 * hover did nothing at all, and the count badge on a nav item measured 1.00:1
 * against the sidebar, reading as bare text.
 *
 * check-token-violations.js cannot see this: its rule matches `hover:bg-base-*`
 * in component source, and these route through a semantic token that merely
 * happens to resolve to a fixed ramp step.
 *
 * Each entry names the surface the fill actually replaces, not "any surface" —
 * `--color-card-active` legitimately equals `--color-surface-overlay` in dark,
 * because a card sits on `raised`, never on `overlay`.
 *
 * Measured as CIELAB ΔE*ab, not contrast ratio, so a tint that differs by hue
 * rather than lightness still counts as visible. The floor is just above the
 * ~2.3 just-noticeable-difference: below that the fill is not subtle, it is
 * absent.
 */
const MIN_FILL_DELTA_E = 3;

const INTERACTION_FILLS = [
    { name: 'sidebar row :hover', fill: '--color-nav-menu-hover', on: '--color-background' },
    { name: 'sidebar row active', fill: '--color-nav-menu-active', on: '--color-background' },
    { name: 'card :hover', fill: '--color-card-hover', on: '--color-card' },
    { name: 'card :active', fill: '--color-card-active', on: '--color-card' },
    { name: 'overlay row :hover', fill: '--color-surface-overlay-hover', on: '--color-surface-overlay' },
    { name: 'input :hover', fill: '--color-input-hover', on: '--color-input' },
    { name: 'secondary action', fill: '--color-action-secondary-subtle', on: '--color-card' },
];

for (const family of ['success', 'warning', 'error', 'info', 'energetic', 'neutral']) {
    // A subtle badge/alert fill sits on a card or on the page itself.
    INTERACTION_FILLS.push(
        { name: `${family} subtle fill · on card`, fill: `--color-${family}-subtle`, on: '--color-card' },
        { name: `${family} subtle fill · on elevated card`, fill: `--color-${family}-subtle`, on: '--color-card-elevated' },
        { name: `${family} subtle fill · on page`, fill: `--color-${family}-subtle`, on: '--color-surface-base' },
    );
}

function checkInteractionFills(themes) {
    const failures = [];
    let checked = 0;

    for (const themeName of ['light', 'dark']) {
        const map = themes[themeName];
        for (const entry of INTERACTION_FILLS) {
            const fill = resolve(map, entry.fill);
            const on = resolve(map, entry.on);
            // Alpha tints are surface-relative by construction — always visible.
            if (!fill || !on) continue;
            checked += 1;
            const distance = deltaE(fill, on);
            if (distance < MIN_FILL_DELTA_E) {
                failures.push(
                    `${themeName} · ${entry.name}: ${entry.fill} ${fill} is ΔE ${distance} from ` +
                        `${entry.on} ${on} (needs ${MIN_FILL_DELTA_E})`,
                );
            }
        }
    }

    return { failures, checked };
}

/* ---------- the pairs components actually render ---------- */

const FAMILIES = ['success', 'warning', 'error', 'info', 'energetic', 'neutral'];

function buildPairs() {
    const pairs = [];

    for (const family of FAMILIES) {
        // Badge / solid emphasis: family fill + the card surface as label.
        pairs.push({
            name: `badge solid · ${family}`,
            bg: `--color-${family}`,
            fg: '--color-card',
            min: AA_NORMAL,
        });
        // Badge / subtle emphasis and Alert: tinted fill + the -text step.
        pairs.push({
            name: `badge subtle · ${family}`,
            bg: `--color-${family}-subtle`,
            fg: `--color-${family}-text`,
            min: AA_NORMAL,
        });
        // Alert body copy sits on the same tinted fill.
        pairs.push({
            name: `alert body · ${family}`,
            bg: `--color-${family}-subtle`,
            fg: '--color-body',
            min: AA_NORMAL,
        });
        // Validation message text on the page surface.
        pairs.push({
            name: `message text · ${family}`,
            bg: '--color-surface-base',
            fg: `--color-${family}-text`,
            min: AA_NORMAL,
        });
    }

    pairs.push(
        { name: 'button primary', bg: '--color-action-primary', fg: '--color-action-primary-text', min: AA_NORMAL },
        { name: 'button primary :hover', bg: '--color-action-primary-hover', fg: '--color-action-primary-text', min: AA_NORMAL },
        { name: 'button primary :active', bg: '--color-action-primary-active', fg: '--color-action-primary-text', min: AA_NORMAL },
        { name: 'button danger', bg: '--color-action-danger', fg: '--color-action-danger-text', min: AA_NORMAL },
        { name: 'button danger :hover', bg: '--color-action-danger-hover', fg: '--color-action-danger-text', min: AA_NORMAL },
        { name: 'button danger :active', bg: '--color-action-danger-active', fg: '--color-action-danger-text', min: AA_NORMAL },
        { name: 'body text on page', bg: '--color-surface-base', fg: '--color-body', min: AA_NORMAL },
        { name: 'body text on card', bg: '--color-surface-raised', fg: '--color-body', min: AA_NORMAL },
        { name: 'description on page', bg: '--color-surface-base', fg: '--color-description', min: AA_NORMAL },
        { name: 'description on overlay', bg: '--color-surface-overlay', fg: '--color-description', min: AA_NORMAL },
        { name: 'caption on card', bg: '--color-surface-raised', fg: '--color-caption', min: AA_NORMAL },
        { name: 'label on page', bg: '--color-surface-base', fg: '--color-label', min: AA_NORMAL },
        { name: 'link on page', bg: '--color-surface-base', fg: '--color-link', min: AA_NORMAL },
        { name: 'link on card', bg: '--color-surface-raised', fg: '--color-link', min: AA_NORMAL },
        { name: 'input value', bg: '--color-input', fg: '--color-body', min: AA_NORMAL },
        // Placeholders are decorative-ish, but must stay readable — large-text bar.
        { name: 'input placeholder', bg: '--color-input', fg: '--color-input-placeholder', min: AA_LARGE },
        { name: 'tooltip', bg: '--color-tooltip-bg', fg: '--color-tooltip-fg', min: AA_NORMAL },
        // Disabled controls are exempt from WCAG, but should still be legible.
        { name: 'disabled control', bg: '--color-action-disabled', fg: '--color-action-disabled-text', min: 3.0 },
    );

    return pairs;
}

function main() {
    const css = fs.readFileSync(appCssPath, 'utf8');
    const themes = parseTheme(css);
    const pairs = buildPairs();
    const failures = [];
    const skipped = [];

    console.log('🔍 Validating contrast for every rendered fill/foreground pair...');

    for (const themeName of ['light', 'dark']) {
        const map = themes[themeName];
        for (const pair of pairs) {
            const bg = resolve(map, pair.bg);
            const fg = resolve(map, pair.fg);
            if (!bg || !fg) {
                skipped.push(`${themeName} · ${pair.name} (${!bg ? pair.bg : pair.fg} is not a flat colour)`);
                continue;
            }
            const ratio = contrast(bg, fg);
            if (ratio < pair.min) {
                failures.push(
                    `${themeName} · ${pair.name}: ${fg} on ${bg} = ${ratio}:1 (needs ${pair.min}:1)`,
                );
            }
        }
    }

    if (skipped.length) {
        console.log(`  (${skipped.length} pairs skipped — alpha or color-mix values cannot be checked statically)`);
    }

    const fills = checkInteractionFills(themes);
    failures.push(...fills.failures);

    if (failures.length) {
        console.error('\n❌ Contrast check failed:\n');
        failures.forEach((f) => console.error('  • ' + f));
        console.error('');
        process.exit(1);
    }

    console.log(`✓ ${pairs.length * 2 - skipped.length} colour pairs pass WCAG AA in both themes`);
    console.log(`✓ ${fills.checked} interaction fills are distinguishable from the surface they sit on\n`);
}

main();
