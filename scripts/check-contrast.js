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

    if (failures.length) {
        console.error('\n❌ Contrast check failed:\n');
        failures.forEach((f) => console.error('  • ' + f));
        console.error('');
        process.exit(1);
    }

    console.log(`✓ ${pairs.length * 2 - skipped.length} colour pairs pass WCAG AA in both themes\n`);
}

main();
