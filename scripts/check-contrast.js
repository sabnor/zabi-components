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
import { resolveTokenColor, resolveTokenValue, resolveTokenPaint, compositeOver, dimBackdrop, backdropBrightness } from './resolve-tokens.js';
import { BLOCKS, BLOCK_ROLES, SURFACE_CLASS, behindToken, buildPairs } from './contrast-pairs.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Optional path, so the guard can be run against another revision of the stylesheet.
const appCssPath = process.argv[2]
    ? path.resolve(process.argv[2])
    : path.join(__dirname, '../src/app.css');


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

/**
 * A token as one flat colour, or null. `var()` chains are followed and an
 * opaque `color-mix()` is evaluated — the pressed field and the control fills are
 * mixes of two neutral steps, and returning null for them would skip every pair
 * measured against them instead of checking it.
 */
function resolve(map, token) {
    return resolveTokenColor(map, token); // null: rgba() or a mix with transparent; see resolveOver()
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
function resolveRaw(map, token) {
    return resolveTokenValue(map, token);
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
    // Pressed has to be a step past hover too, or holding a hovered field shows nothing.
    { name: 'input :active', fill: '--color-input-active', on: '--color-input' },
    { name: 'input :active vs :hover', fill: '--color-input-active', on: '--color-input-hover' },
    // And short of the border, or the pressed field loses its edge.
    { name: 'input :active vs its border', fill: '--color-input-active', on: '--color-input-border' },
    { name: 'secondary action', fill: '--color-action-secondary-subtle', on: '--color-card' },
];

for (const family of ['success', 'warning', 'error', 'info', 'energetic', 'neutral', 'accent']) {
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

/* ---------- every focus-ring variant reads a colour the pairs hold ---------- */

/**
 * `.focus-ring--muted` set `--zabi-focus-ring-color: var(--color-base-500)`: a
 * raw ramp step, in no pair, so the ring was 2.49:1 on the dark elevated
 * surface and every check passed. The pair list can only hold tokens it knows
 * about, so this reads the stylesheet the other way round: whatever a rule
 * hands to `--zabi-focus-ring-color` has to be a flat colour in both themes
 * and has to be measured against the surfaces in contrast-pairs.js. A new
 * variant, or one re-pointed at a ramp step, fails here until it is listed.
 */
function checkFocusRingSources(css, themes, pairs) {
    const failures = [];
    const sources = new Set();
    const re = /--zabi-focus-ring-color\s*:\s*([^;]+);/g;
    let m;
    while ((m = re.exec(css))) {
        const value = m[1].trim();
        // `var(--role)` or `var(--role, <fallback>)`. The role is what the
        // library's own theme paints; a fallback only serves an app whose
        // theme file lacks the role, which the flat-colour check below rules
        // out here.
        const token = value.match(/^var\(\s*(--[\w-]+)\s*(?:,[\s\S]*)?\)$/);
        if (!token) {
            failures.push(`--zabi-focus-ring-color: ${value} is not a token, so no pair can measure it`);
            continue;
        }
        sources.add(token[1]);
    }
    if (sources.size === 0) failures.push('no --zabi-focus-ring-color declaration found: the focus-ring rules have moved');

    const SURFACES = ['base', 'raised', 'inset', 'elevated', 'overlay'].map((s) => `--color-surface-${s}`);
    for (const token of sources) {
        const missing = SURFACES.filter((bg) => !pairs.some((p) => p.fg === token && p.bg === bg && p.min >= 3));
        if (missing.length) {
            failures.push(
                `focus ring colour ${token} is not held to 3:1 on ${missing.join(', ')}: ` +
                    'add it to UI_PARTS in scripts/contrast-pairs.js',
            );
        }
        for (const themeName of ['light', 'dark']) {
            if (!resolve(themes[themeName], token)) {
                failures.push(`${themeName} · focus ring colour ${token} is not a flat colour, so its pairs would be skipped`);
            }
        }
    }
    return { failures, checked: sources.size };
}

/**
 * `.on-fill`: the block for a fill the app chooses. Its label is
 * `--zabi-on-fill`, set on the block, so no pair of its own can be held;
 * the rule is only checked for re-pointing and restoring the same roles.
 */
const ON_FILL = { name: 'custom fill', selector: '.on-fill', runtime: true, on: 'var(--zabi-on-fill, currentColor)' };

/**
 * Controls inside a brand or accent block.
 *
 * `.on-brand` and `.on-accent` re-point the roles a control writes with when
 * it has no fill of its own (scripts/contrast-pairs.js, BLOCK_ROLES). The
 * pair list measures a role where the theme declares it, on the root; what a
 * block does to it is in a rule of the stylesheet, so that rule is read here:
 *
 *  1. Every such role is re-pointed in each block, at a flat colour that
 *     reads against the block's fill, in both themes.
 *  2. Whatever a block re-points can be given back: the role as it is
 *     outside the block is kept as `--zabi-theme-<role>`, on the block's
 *     parent, and a rule for surfaces inside a block restores it. A role re-pointed and not restored would put the block's
 *     label colour on every card inside it (white on white, in light).
 *  3. Every surface fill a component uses is in the selector of that rule.
 */
function checkBlocks(css, themes, componentsDir) {
    const failures = [];
    let checked = 0;
    const declarations = (body) => {
        const map = {};
        const re = /(--[\w-]+|color)\s*:\s*([^;]+);/g;
        let m;
        while ((m = re.exec(body))) map[m[1]] = m[2].trim();
        return map;
    };
    const ruleBody = (selector) => {
        const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const match = css.match(new RegExp(`\\n\\s*${escaped}\\s*\\{([^}]*)\\}`));
        return match ? declarations(match[1]) : null;
    };

    // The roles as they are outside the block, kept under another name on the block's parent.
    const kept = css.match(/\n\s*([^{}\n]*:has\([^{}]*)\{([^{}]*--zabi-theme-[\w-]+\s*:[^{}]*)\}/);
    if (!kept) {
        return { failures: ['the rule that keeps the theme values (--zabi-theme-*) on the parent of a block was not found'], checked };
    }
    const copies = declarations(kept[2]);
    for (const block of [...BLOCKS, ON_FILL]) {
        // Written on a block, or inside one, a kept value would be the block's own colour.
        for (const selector of [`> ${block.selector}`, `${block.selector} *`, `${block.selector},`]) {
            if (!kept[1].includes(selector)) {
                failures.push(`the rule that keeps the theme values must hold "${selector.replace(/,$/, '')}" in its selector: ${kept[1].trim()}`);
            }
        }
    }

    // The two rules that give them back: on a surface inside a block, and on what is inside that surface.
    const resets = [...css.matchAll(/:where\(\.on-brand, \.on-accent, \.on-fill\)\s*:where\(([^)]*)\)(\s*>\s*:where\(\*\))?\s*\{([^}]*)\}/g)];
    const restored = {};
    const surfaces = new Set();
    for (const reset of resets) {
        Object.assign(restored, declarations(reset[3]));
        for (const name of reset[1].split(',')) surfaces.add(name.trim());
    }
    if (resets.length < 2) failures.push('the rules that restore the theme values on a surface inside a block were not found');

    for (const block of [...BLOCKS, ON_FILL]) {
        const own = ruleBody(block.selector);
        if (!own) {
            failures.push(`${block.selector} was not found in the stylesheet`);
            continue;
        }
        for (const [role, min] of BLOCK_ROLES) {
            const value = own[role];
            if (block.runtime) {
                // The label is a colour the app sets at run time, so there is no ratio to measure here:
                // only that every role is re-pointed at it, like the two blocks above.
                if (value !== block.on) {
                    failures.push(`${block.selector} must re-point ${role} at ${block.on}: on the block it is the page's colour`);
                }
                continue;
            }
            const token = value?.match(/^var\(\s*(--[\w-]+)\s*\)$/)?.[1];
            if (!token) {
                failures.push(`${block.selector} does not re-point ${role} at a token: on the block it is the page's colour`);
                continue;
            }
            for (const themeName of ['light', 'dark']) {
                const map = themes[themeName];
                const fill = resolve(map, block.fill);
                const colour = resolve(map, token);
                if (!fill || !colour) {
                    failures.push(`${themeName} · ${role} in the ${block.name} block: ${!fill ? block.fill : token} is not a flat colour`);
                    continue;
                }
                const ratio = contrast(fill, colour);
                checked += 1;
                if (ratio < min) {
                    failures.push(`${themeName} · ${role} in the ${block.name} block: ${colour} on ${fill} = ${ratio}:1 (needs ${min}:1)`);
                }
            }
        }
        for (const role of Object.keys(own)) {
            if (role === 'color') continue;
            const copy = `--zabi-theme-${role.replace(/^--color-/, '')}`;
            if (!copies[copy]?.startsWith(`var(${role}`)) {
                failures.push(`${block.selector} re-points ${role}, but its theme value is not kept as ${copy}`);
            } else if (restored[role] !== `var(${copy})`) {
                failures.push(`${block.selector} re-points ${role}, but no rule gives it back on a surface inside the block`);
            }
        }
    }

    // Every surface fill a component paints at rest (no variant in front of the class).
    const used = new Set();
    const walk = (dir) => {
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
            const full = path.join(dir, entry.name);
            if (entry.isDirectory()) walk(full);
            else if (/\.(svelte|ts)$/.test(entry.name)) {
                for (const m of fs.readFileSync(full, 'utf8').matchAll(/(?:^|["'`\s])bg-([a-z0-9-]+)(?=["'`\s]|$)/gm)) used.add(m[1]);
            }
        }
    };
    if (fs.existsSync(componentsDir)) walk(componentsDir);
    let surfaceFills = 0;
    for (const name of used) {
        if (!SURFACE_CLASS.test(name) || !(`--color-${name}` in themes.light)) continue;
        // A translucent fill is the block showing through, not a surface.
        if (!resolve(themes.light, `--color-${name}`)) continue;
        surfaceFills += 1;
        if (!surfaces.has(`.bg-${name}`)) {
            failures.push(
                `bg-${name} is a surface a component paints, but it is not in the rule that restores the theme's text ` +
                    'on a surface inside a brand or accent block (src/app.css, below .on-accent)',
            );
        }
    }
    return { failures, checked, surfaceFills };
}

/* ---------- the pairs components actually render ---------- */


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
            const behind = behindToken(pair, themeName);
            // A token that is not declared at all is a renamed or deleted role,
            // not an alpha value: skipping it would drop its pairs silently.
            const undeclared = [pair.bg, pair.fg, ...(pair.orFg ? [pair.orFg] : []), ...(behind ? [behind] : [])].find((token) => !(token in map));
            if (undeclared) {
                failures.push(`${themeName} · ${pair.name}: ${undeclared} is not declared, so the pair cannot be checked`);
                continue;
            }
            let bg = resolve(map, pair.bg);
            if (behind) {
                // A material is a paint with an alpha: what the text sits on is the paint over its backdrop.
                const paint = resolveTokenPaint(map, pair.bg);
                const flat = resolve(map, behind);
                // A material's filter dims what is behind it (D137); other `behind` pairs are not filtered.
                const backdrop = flat && pair.material ? dimBackdrop(flat, backdropBrightness(map)) : flat;
                if (!paint || !backdrop) {
                    failures.push(`${themeName} · ${pair.name}: ${!paint ? pair.bg : behind} cannot be resolved to a colour, so the material cannot be composited`);
                    continue;
                }
                bg = backdrop;
                // `layers`: the same paint stacked, each laid over the last (nested translucent cards).
                for (let layer = 0; layer < (pair.layers ?? 1); layer += 1) bg = compositeOver(paint, bg);
            }
            const fg = resolve(map, pair.fg);
            if (!bg || !fg) {
                skipped.push(`${themeName} · ${pair.name} (${!bg ? pair.bg : pair.fg} is not a flat colour)`);
                continue;
            }
            const ratio = contrast(bg, fg);
            // `orFg`: a second foreground that may carry the pair instead.
            const other = pair.orFg ? resolve(map, pair.orFg) : null;
            const otherRatio = other ? contrast(bg, other) : 0;
            if (Math.max(ratio, otherRatio) < pair.min) {
                failures.push(
                    `${themeName} · ${pair.name}: ${fg} on ${bg} = ${ratio}:1` +
                        (other ? ` and ${other} on ${bg} = ${otherRatio}:1` : '') +
                        ` (needs ${pair.min}:1)`,
                );
            }
        }
    }

    // Components paint the label with --color-action-primary-text; apps set it
    // through --color-on-brand (--zabi-on-brand / --zabi-on-brand-dark). If the
    // two ever come apart, the documented knob stops reaching the button.
    for (const themeName of ['light', 'dark']) {
        const label = resolve(themes[themeName], '--color-action-primary-text');
        const onBrand = resolve(themes[themeName], '--color-on-brand');
        if (!label || label !== onBrand) {
            failures.push(
                `${themeName} · --color-action-primary-text (${label}) must follow --color-on-brand (${onBrand})`,
            );
        }
    }

    if (skipped.length) {
        console.log(`  (${skipped.length} pairs skipped — alpha or color-mix values cannot be checked statically)`);
    }

    const fills = checkInteractionFills(themes);
    failures.push(...fills.failures);

    const tints = checkAlphaTints(themes);
    failures.push(...tints.failures);

    const rings = checkFocusRingSources(css, themes, pairs);
    failures.push(...rings.failures);

    const blocks = checkBlocks(css, themes, path.join(path.dirname(appCssPath), 'components'));
    failures.push(...blocks.failures);

    if (failures.length) {
        console.error('\n❌ Contrast check failed:\n');
        failures.forEach((f) => console.error('  • ' + f));
        console.error('');
        process.exit(1);
    }

    console.log(`✓ ${pairs.length * 2 - skipped.length} colour pairs pass WCAG AA in both themes`);
    console.log(`✓ ${fills.checked} interaction fills are distinguishable from the surface they sit on`);
    console.log(`✓ ${tints.checked} alpha tints read at ${MIN_TINT_CONTRAST}:1 or more over the surface they land on`);
    console.log(`✓ ${rings.checked} focus-ring colours are each measured against the surfaces a control lands on`);
    console.log(
        `✓ ${blocks.checked} role colours inside a brand or accent block read against its fill, and ${blocks.surfaceFills} surface fills get the theme's back\n`,
    );
}

main();
