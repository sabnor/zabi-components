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
// Optional path, so the guard can be run against another revision of the stylesheet.
const appCssPath = process.argv[2]
    ? path.resolve(process.argv[2])
    : path.join(__dirname, '../src/app.css');

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
    return null; // rgba()/color-mix() — not a flat colour; see resolveOver()
}

function toHex(channels) {
    return '#' + channels.map((c) => Math.round(c).toString(16).padStart(2, '0')).join('');
}

function parseHex(hex) {
    const h = hex.replace('#', '');
    const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
    return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
}

/** Follow `var()` chains to the literal value, whatever form it takes. */
function resolveRaw(map, token, depth = 0) {
    if (depth > 20) return null;
    let value = map[token];
    if (!value) return null;
    value = value.replace(/\/\*[\s\S]*?\*\//g, '').trim();
    const varMatch = value.match(/^var\((--[\w-]+)\)$/);
    return varMatch ? resolveRaw(map, varMatch[1], depth + 1) : value;
}

/**
 * The colour a token paints when laid over `surfaceToken`: a flat token is
 * returned as it is, an `rgba()` tint is composited source-over onto the
 * surface, and `transparent` is the surface itself.
 *
 * The alpha tokens are the hover, pressed and secondary-button fills. They
 * used to be skipped as "always visible by construction", which is true of
 * their direction and says nothing about their strength: light hover was 6%
 * ink, 1.14:1 on a card, and nothing here noticed.
 */
function resolveOver(map, token, surfaceToken) {
    const surface = resolve(map, surfaceToken);
    const raw = resolveRaw(map, token);
    if (!surface || !raw) return null;
    if (raw.startsWith('#')) return raw;
    if (raw === 'transparent') return surface;
    const m = raw.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:[\s,/]+([\d.]+))?\s*\)$/);
    if (!m) return null;
    const alpha = m[4] === undefined ? 1 : Number(m[4]);
    const tint = [m[1], m[2], m[3]].map(Number);
    return toHex(parseHex(surface).map((c, i) => c * (1 - alpha) + tint[i] * alpha));
}

function contrastExact(a, b) {
    const la = luminance(a);
    const lb = luminance(b);
    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
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
    // The card sits on the page, so its hover fill must not BE the page either.
    // Light card-hover and the light page were both base-100: a hovered card
    // kept its shadow and lost its fill. The floor is lower than for the fill
    // it replaces because the shadow still draws the card's outline.
    { name: 'card :hover vs the page', fill: '--color-card-hover', on: '--color-surface-base', min: 2.5 },
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
            const floor = entry.min ?? MIN_FILL_DELTA_E;
            if (distance < floor) {
                failures.push(
                    `${themeName} · ${entry.name}: ${entry.fill} ${fill} is ΔE ${distance} from ` +
                        `${entry.on} ${on} (needs ${floor})`,
                );
            }
        }
    }

    return { failures, checked };
}

/* ---------- alpha tints, composited over the surface they land on ---------- */

/**
 * A hover or secondary fill has to be strong enough to see, not merely
 * different. 1.2:1 is where dark mode already sat (1.24–1.32) and where a
 * tint starts to read as a control rather than as noise.
 */
const MIN_TINT_CONTRAST = 1.2;
/** Each state must also be a visible step past the one before it. */
const MIN_STATE_STEP = 1.08;

const TINT_SURFACES = ['--color-surface-base', '--color-surface-raised', '--color-surface-elevated', '--color-surface-overlay'];

/** [name, resting tint, then each stronger state in order] */
const TINT_LADDERS = [
    ['quiet control', '--color-surface-hover', '--color-surface-active'],
    ['secondary button', '--color-action-secondary', '--color-action-secondary-hover', '--color-action-secondary-active'],
];

function checkAlphaTints(themes) {
    const failures = [];
    let checked = 0;

    for (const themeName of ['light', 'dark']) {
        const map = themes[themeName];
        for (const surface of TINT_SURFACES) {
            const under = resolve(map, surface);
            for (const [name, ...states] of TINT_LADDERS) {
                let previous = under;
                states.forEach((token, i) => {
                    const painted = resolveOver(map, token, surface);
                    if (!painted || !under) {
                        failures.push(`${themeName} · ${name}: ${token} over ${surface} cannot be resolved`);
                        return;
                    }
                    checked += 1;
                    const ratio = contrastExact(painted, under);
                    if (i === 0 && ratio < MIN_TINT_CONTRAST) {
                        failures.push(
                            `${themeName} · ${name}: ${token} over ${surface} paints ${painted} on ${under} = ` +
                                `${ratio.toFixed(2)}:1 (needs ${MIN_TINT_CONTRAST}:1)`,
                        );
                    }
                    const step = contrastExact(painted, previous);
                    if (i > 0 && step < MIN_STATE_STEP) {
                        failures.push(
                            `${themeName} · ${name}: ${token} over ${surface} paints ${painted}, only ` +
                                `${step.toFixed(2)}:1 past the state before it (needs ${MIN_STATE_STEP}:1)`,
                        );
                    }
                    previous = painted;
                });
            }
        }

        // The overlay edge is drawn on the overlay's own fill and has to show
        // against it: a white menu over a white card has no other outline.
        const edge = resolveOver(map, '--color-border-overlay', '--color-surface-overlay');
        const overlay = resolve(map, '--color-surface-overlay');
        if (!edge || !overlay) {
            failures.push(`${themeName} · overlay edge: --color-border-overlay cannot be resolved`);
        } else {
            checked += 1;
            const ratio = contrastExact(edge, overlay);
            if (ratio < MIN_TINT_CONTRAST) {
                failures.push(
                    `${themeName} · overlay edge: --color-border-overlay paints ${edge} on ${overlay} = ` +
                        `${ratio.toFixed(2)}:1 (needs ${MIN_TINT_CONTRAST}:1)`,
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
        // WCAG 1.4.11: a focus indicator needs 3:1 against what it is drawn
        // next to. Light brand-500 was 2.99:1 on the page and nothing checked it.
        { name: 'focus ring on page', bg: '--color-surface-base', fg: '--color-focus-ring', min: AA_LARGE },
        { name: 'focus ring on card', bg: '--color-surface-raised', fg: '--color-focus-ring', min: AA_LARGE },
        { name: 'nav focus ring on page', bg: '--color-surface-base', fg: '--color-nav-menu-focus', min: AA_LARGE },
        { name: 'nav focus ring on card', bg: '--color-surface-raised', fg: '--color-nav-menu-focus', min: AA_LARGE },
        // The ring may equal the primary fill (it does in light), so on a
        // primary button it is the 2px offset gap that separates the two.
        { name: 'focus offset gap on primary button', bg: '--color-action-primary', fg: '--color-focus-ring-offset', min: AA_LARGE },
        { name: 'focus ring against its offset gap', bg: '--color-focus-ring-offset', fg: '--color-focus-ring', min: AA_LARGE },
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

    const tints = checkAlphaTints(themes);
    failures.push(...tints.failures);

    if (failures.length) {
        console.error('\n❌ Contrast check failed:\n');
        failures.forEach((f) => console.error('  • ' + f));
        console.error('');
        process.exit(1);
    }

    console.log(`✓ ${pairs.length * 2 - skipped.length} colour pairs pass WCAG AA in both themes`);
    console.log(`✓ ${fills.checked} interaction fills are distinguishable from the surface they sit on`);
    console.log(`✓ ${tints.checked} alpha tints read at ${MIN_TINT_CONTRAST}:1 or more over the surface they land on\n`);
}

main();
